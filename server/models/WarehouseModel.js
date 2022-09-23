const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Warehouse = sequelize.define('warehouse', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quant: { type: DataTypes.INTEGER, allowNull: false },
    typename: { type: DataTypes.STRING, unique: true, allowNull: false },
    img_main: { type: DataTypes.STRING, allowNull: true },
    img_sec: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.INTEGER, allowNull: false },

}, { freezeTableName: true, timestamps: false })

const ProductionInfo = sequelize.define('wh_prod_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER, allowNull: false },
    dateReady: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
}, { freezeTableName: true, timestamps: false })

Warehouse.hasMany(ProductionInfo, { as: 'prod_info' })
ProductionInfo.belongsTo(Warehouse)

module.exports = { Warehouse, ProductionInfo }