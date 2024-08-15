const { isPremium } = require("../middleware/authenticate");
const Expence = require("../models/expence");
const User = require("../models/user");
const sequelize = require("../utils/database");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
// const AWS = require("aws-sdk");
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const Url = require("../models/urls");

exports.addExpence = async (req, res) => {
  try {
    const transaction = await sequelize.transaction();

    const { expence, description, category } = req.body;

    await Expence.create({ expence, description, category, UserId: req.user.id }, { transaction: transaction });

    await User.update({ totalExpence: req.user.totalExpence + Number(expence) }, { where: { id: req.user.id }, transaction: transaction });

    await transaction.commit();
    res.json("expence added successfully");

  } catch (error) {
    await transaction.rollback();
    console.log(error);
  }
}

exports.getExpences = async (req, res) => {
  try {
    const query = { page: req.query.page, rows: Number(req.query.rows) }
    const expences = await Expence.findAll({ where: { UserId: req.user.id } });
    console.log(req.query);
    const totalPage = expences.length;
    const pages = Math.ceil(totalPage / query.rows);
    let start = 0;
    let end = 0;

    if (query.page > 0 && query.page < pages) {
      start = (query.page - 1) * query.rows;
      end = Number(query.page) * query.rows;
    }
    else if (query.page == pages) {
      start = (query.page - 1) * query.rows;
      end = expences.length;
    }

    const pageData = [];

    for (let i = start; i < end; i++) {
      pageData.push(expences[i]);
    }
    console.log(pageData, start, end);
    res.json({
      expences: pageData,
      isPremiumUser: req.premium,
      totalPages: pages,
      currPage: query.page
    })

  } catch (error) {
    console.log(error);
  }
}

exports.deleteExpence = async (req, res) => {
  try {
    const transaction = await sequelize.transaction();
    const { id } = req.params;
    const expence = await Expence.findOne({ where: { id: id }, transaction: transaction });

    await User.update({ totalExpence: req.user.totalExpence - expence.expence }, { where: { id: req.user.id }, transaction: transaction });

    await Expence.destroy({ where: { id: id }, transaction: transaction });

    await transaction.commit();
    res.json("expence deleted successfully");
  } catch (error) {

    await transaction.rollback();
    console.log(error);
  }
}

exports.getLeaderboard = async (req, res) => {
  try {
    const results = await User.findAll({});
    res.json({
      data: results
    });
  } catch (error) {
    console.log(error);
  }
}


exports.getMontlyReport = async (req, res) => {
  try {
    const result = await Expence.findAll({ order: [['createdAt', "DESC"]] });

    res.json({
      data: result
    })

  } catch (error) {
    console.log(error);
  }
}

exports.getYearlyReport = async (req, res) => {
  try {
    const result = await Expence.findAll({
      attributes: [
        [Sequelize.fn('YEAR', Sequelize.col('createdAt')), 'year'],
        [Sequelize.fn('SUM', Sequelize.col('expence')), 'total_expence']
      ],
      group: [Sequelize.fn('YEAR', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('YEAR', Sequelize.col('createdAt')), 'DESC']]
    })

    res.json({
      data: result
    })

  } catch (error) {
    console.log(error);
  }
}

exports.downloadFile = async (req, res) => {
  const expences = await Expence.findAll({ where: { UserId: req.user.id } });

  const stringform = JSON.stringify(expences);
  const fileName = `expences${req.user.id}/${new Date()}.txt`
  const url = await uploadFile(stringform, fileName);
  await Url.create({url, UserId: req.user.id});
  
  res.json({ url, success: true });
}

const uploadFile = async (data, fileName) => {
  // const BUCKET_NAME = process.env.BUCKET_NAME;
  // const IAM_USER_KEY = process.env.IAM_USER_KEY;
  // const IAM_SECRET_KEY = process.env.IAM_SECRET_KEY;

  // const s3bucket = new AWS.S3({
  //   accessKeyId: IAM_USER_KEY,
  //   secretAccessKey: IAM_SECRET_KEY,
  //   Bucket: BUCKET_NAME
  // })


  // var params = {
  //   Bucket: BUCKET_NAME,
  //   Key: fileName,
  //   Body: data,
  //   ACL: "public-read"
  // }

  
  // return new Promise((res, rej)=>{
  //   s3bucket.upload(params, async (err, s3response) => {
  //     if (err) {
  //       rej(err);
  //     }
  //     else {
  //       const url = await s3response.Location;
  //       res(url);
  //     }
  //   })
  // })


// Load environment variables
const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_SECRET_KEY = process.env.IAM_SECRET_KEY;

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-west-2', // specify your region here if not set in environment
  credentials: {
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_SECRET_KEY
  }
});


  // Define the upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: "public-read"
  };

  // Return a promise to handle the upload process
  return new Promise((res, rej) => {
    // Use the Upload class from @aws-sdk/lib-storage for uploading files
    const upload = new Upload({
      client: s3Client,
      params: params
    })
    
  });


}