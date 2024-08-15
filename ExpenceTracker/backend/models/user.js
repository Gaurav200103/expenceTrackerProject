const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING,
  totalExpence: Sequelize.INTEGER
})

module.exports = User;