const Sequelize = require('sequelize');

const sequelize = new Sequelize(`postgres://postgres:${process.env.PG_PWORD}@localhost:5432/Blue-Project`);

module.exports = sequelize;
