const express = require("express");
const { addExpence, getExpences, deleteExpence, getLeaderboard, getMontlyReport, getYearlyReport, downloadFile } = require("../controller/expence.controller");
const { authenticate, isPremium } = require("../middleware/authenticate");
const router = express.Router();
const stripe = require("../utils/stripe");
const Premium = require("../models/premium");
const { forgotPassword } = require("../controller/user.controller");
const { where } = require("sequelize");
const Url = require("../models/urls");

router.post("/addExpence", authenticate, addExpence);

router.get("/getExpences", authenticate, isPremium, getExpences);

router.delete("/deleteExpence/:id", authenticate, deleteExpence);

router.post("/getPremium",authenticate, async (req, res) => {
  
  const session = await stripe.checkout.sessions.create({
    line_items:[
      {
        price_data:{
          currency:"INR",
          unit_amount:50 * 100,
          product_data:{
            name:"Premium Subscription"
          }
        },
        quantity:1
      }
    ],
    mode:"payment",
    success_url: `http://localhost:3000/complete/${req.user.id}`,
    cancel_url:"http://localhost:3000/cancel"
  })

  
  console.log(session);
  res.json({
    url: session.url
  })
})


router.get("/complete/:id",async (req, res)=>{
  const {id} = req.params;
  await Premium.create({UserId: id});

  res.send("this is premium user");
})


router.get("/getLeaderboard", getLeaderboard)

router.get("/monthlyReport", getMontlyReport);

router.get("/yearlyReport", getYearlyReport);

router.get("/downloadFile",authenticate, downloadFile);

router.get("/showDownloads",authenticate,async (req, res)=>{
  const data = await Url.findAll({where : {UserId : req.user.id}});

  res.json({
    data
  })
})

module.exports = router;