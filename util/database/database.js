const Sequelize = require("sequelize");
const path = require("path");

//SQLITE in memory
const sequelize = new Sequelize("sqlite::memory", {
  dialect: "sqlite",
  storage: path.join(
    path.dirname(require.main.filename),
    "util/database",
    "TestApp.sqlite"
  ),
});

module.exports = sequelize;
