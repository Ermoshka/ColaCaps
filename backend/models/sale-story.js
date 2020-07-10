const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const SaleStory = Sequelize.define("salestory", {
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
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productImage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productPrice: {
        type: DataTypes.STRING
    }
})

module.exports = SaleStory