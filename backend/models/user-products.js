const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const UserProducts = Sequelize.define("userproduct", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
})

module.exports = UserProducts