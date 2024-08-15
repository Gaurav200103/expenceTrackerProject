const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Url = sequelize.define("Url", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  url: Sequelize.STRING
})

module.exports = Url;