const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("resortsDb", "", "", {
  dialect: "sqlite",
  storage: path.join(__dirname, "resortsDb.sqlite"),
});

module.exports = {
  sequelize,
};
