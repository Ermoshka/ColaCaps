const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const CapTypes = Sequelize.define("captype", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    stickerUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    // capId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }s
} )

module.exports = CapTypes