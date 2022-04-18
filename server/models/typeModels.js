// const sequelize = require('../db')
// const { DataTypes } = require('sequelize')
// const { SKLAD } = require('./ProdModel')

// const User = sequelize.define('user', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     email: { type: DataTypes.STRING, unique: true, },
//     password: { type: DataTypes.STRING },
//     role: { type: DataTypes.STRING, defaultValue: "USER" },
// })

// const Basket = sequelize.define('basket', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })

// const BasketOkType = sequelize.define('basket_oktype', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })

// const OkType = sequelize.define('type', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, unique: true, allowNull: false },
//     img: { type: DataTypes.STRING, allowNull: true, defaultValue: "No Image" },
// })

// const OkTypeInfo = sequelize.define('oktype_info', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     title: { type: DataTypes.STRING, allowNull: false, defaultValue: "No Title" },
//     desc: { type: DataTypes.STRING, allowNull: false, defaultValue: "No Description" },
// })

// const Shop = sequelize.define('shop', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     price: { type: DataTypes.INTEGER, allowNull: true },
//     title: { type: DataTypes.STRING, allowNull: true },
// })

// User.hasOne(Basket)
// Basket.belongsTo(User)

// Basket.hasMany(BasketOkType)
// BasketOkType.belongsTo(Basket)

// OkType.hasMany(OkTypeInfo, { as: 'info' })
// OkTypeInfo.belongsTo(OkType)

// OkType.hasMany(BasketOkType)
// BasketOkType.belongsTo(OkType)

// OkType.hasMany(Shop, { as: 'shop_type' })
// Shop.belongsTo(OkType)

// Shop.hasOne(SKLAD)
// SKLAD.belongsTo(Shop, { as: 'sklad_pos' })









// module.exports = {
//     User, Basket, OkType, OkTypeInfo, BasketOkType, Shop, SKLAD
// }