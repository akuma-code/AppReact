const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Warehouse = sequelize.define('warehouse', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    typeId: { type: DataTypes.INTEGER, allowNull: true },
    shopId: { type: DataTypes.INTEGER, allowNull: true },
    quant: { type: DataTypes.INTEGER, allowNull: false },
    typename: { type: DataTypes.STRING, unique: true, allowNull: false },
    img_main: { type: DataTypes.STRING, allowNull: true },
    img_sec: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.INTEGER, allowNull: false },

}, { freezeTableName: true, timestamps: false })


module.exports = { Warehouse }