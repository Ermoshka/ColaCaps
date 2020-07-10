const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const Product = Sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'EXPO, astana hub'
    }
})

module.exports = Product