const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database/database");

const filesPDF = sequelize.define("FilesPDF", {
  Id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  Titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Filepath: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = filesPDF;
