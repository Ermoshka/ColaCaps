const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')
const {hashSync, genSaltSync} = require('bcryptjs')

const User = Sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', hashSync(value, genSaltSync(10)))
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    capsBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'images/defaultAvatar.jpg'
    },
    isAdmin: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = User