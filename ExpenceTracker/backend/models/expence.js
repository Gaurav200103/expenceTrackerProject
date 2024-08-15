const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Expence = sequelize.define("Expence", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  expence: Sequelize.INTEGER,
  description: Sequelize.STRING,
  category: Sequelize.STRING
})

module.exports = Expence;