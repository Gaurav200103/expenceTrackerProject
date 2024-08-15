const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app =express();
const sequelize = require("./utils/database");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const Expence = require("./models/expence");
const User= require("./models/user");
const Premium = require("./models/premium");
const userRouter= require("./routers/user.router");
const expenceRouter = require("./routers/expence.router");
const Password = require("./models/password");
const Url = require("./models/urls");
const path= require("path");
app.use(userRouter);
app.use(expenceRouter);

app.use((req, res)=>{
  console.log(req.url);
  res.sendFile(path.join(__dirname, `public/${req.url}`));
})

User.hasMany(Expence);
Expence.belongsTo(User);
User.hasOne(Premium);
Premium.belongsTo(User);
User.hasMany(Password);
Password.belongsTo(User);
User.hasMany(Url);
Url.belongsTo(User);

sequelize.sync().then(()=>{
  app.listen(process.env.PORT);
  console.log("database connected successfully");
})

//my new comment