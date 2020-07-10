const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const UserCaps = Sequelize.define("usercap", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    // capId: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // capsCollected: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     defaultValue: 0
    // }
})

module.exports = UserCaps