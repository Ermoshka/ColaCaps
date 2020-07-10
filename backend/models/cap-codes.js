const Sequelize = require('../utils/database')
const { DataTypes } = require('sequelize')

const CapCodes = Sequelize.define("capcode", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    // price: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    secretCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    // capTypeId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
    // amount: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // sticker: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
}, {timestamps: false})

module.exports = CapCodes