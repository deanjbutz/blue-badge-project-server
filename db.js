const {Sequelize} = require("sequelize")

const db = new Sequelize(`postgres://postgres:${process.env.PG_PWORD}@localhost:5432/Blue-Project`)

module.exports = db

