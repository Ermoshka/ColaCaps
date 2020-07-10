const Sequelize = require('sequelize')

const sequelize = new Sequelize("colacaps", "ermoshka", "ekings007", {
    dialect: "postgres",
    host: "localhost"
})

module.exports = sequelize