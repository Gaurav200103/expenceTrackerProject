const sequelize = require("../utils/database");
const{ DataTypes }= require("sequelize");
const Sequelize= require("sequelize");

const Password = sequelize.define("Password",{
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  isActive: {
    type:DataTypes.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Password;