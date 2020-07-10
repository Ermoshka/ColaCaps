const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const News = Sequelize.define("new", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: DataTypes.JSONB,
        allowNull: false
    }
})

module.exports = News