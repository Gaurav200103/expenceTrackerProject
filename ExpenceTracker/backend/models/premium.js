const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Premium = sequelize.define("Premium", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
})

module.exports = Premium;