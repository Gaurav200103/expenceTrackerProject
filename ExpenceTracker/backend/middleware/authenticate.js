const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Premium = require("../models/premium");

exports.authenticate = async (req, res, next)=>{
  const headers = req.headers;
  console.log(headers.authorization);
  const jwtData = await jwt.verify(headers.authorization, "mySecretKey");

  const {id} = jwtData;
  const user =await User.findByPk(id);
  req.user = user.dataValues;
  next();
}

exports.isPremium = async (req, res, next)=>{

  const isPremiumUser = await Premium.findOne({where : {UserId : req.user.id}});

  req.premium = isPremiumUser == null ? false : true;


  next();
}