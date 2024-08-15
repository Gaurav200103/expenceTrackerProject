const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Premium = require("../models/premium");
const sequelize = require("../utils/database");
const nodemailer = require("nodemailer");
const Password = require("../models/password");
const {v4 : uuidv4} = require("uuid");
const path= require("path");

exports.addUser = async (req, res) => {
  try {
    const transaction = await sequelize.transaction();
    const { name, email, password } = req.body;

    const newPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ where: { email: email }, transaction: transaction })

    if (user) {
      return res.json({
        message: "User already exists",
        signup: false
      })
    }

    await User.create({ name, email, password: newPassword }, { transaction: transaction });

    await transaction.commit();
    res.json({
      message: "User singup successfully",
      signup: true
    })
  } catch (error) {
    await transaction.rollback();
    console.log(error);
  }
}


exports.loginUser = async (req, res) => {
  try {
    const transaction = await sequelize.transaction();
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email }, transaction: transaction });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        login: false
      })
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
      const token = await jwt.sign({ id: user.id }, "mySecretKey");

      const isPremiumUser = await Premium.findOne({ where: { UserId: user.id }, transaction: transaction });

      await transaction.commit();
      return res.status(200).json({
        message: "User logged in successfully",
        login: true,
        token,
        isPremiumUser: isPremiumUser == null ? false : true
      })
    }

    res.status(401).json({
      message: "User not authorized",
      login: false
    })

  } catch (error) {
    await transaction.rollback();
    console.log(error);
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const newId = uuidv4();
    const user = await User.findOne({where : {email : email}});

    if(user){
      await Password.create({
        id: newId,
        UserId : user.id
      })
    }
    else{
      res.send("account not found")
    }

    let testAccount = nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'casandra.mraz52@ethereal.email',
        pass: 'YwePgMRCG3eaqv1Tza'
      }
    });


    const info = await transporter.sendMail({
      from: '"gaurav pimplekar" <gpimplekar@gmail.email>', // sender address
      to: email, // list of receivers
      subject: "forgot password", // Subject line
      text: `this is user password recovery link http://localhost:3000/password/resetPassword/${newId}`, // plain text body
    })

    res.send();
  } catch (error) {
    console.log(error);
  }
}


exports.resetPassword = async (req, res)=>{
  try {

    const {uid} = req.params;

    const active = await Password.findOne({where : {id: uid}});

    

    if(active.dataValues.isActive == true){
      console.log(active);
      res.sendFile(path.join(__dirname, '../../frontend/resetpassword.html'))
    }

    res.send();
    
  } catch (error) {
    
  }
}