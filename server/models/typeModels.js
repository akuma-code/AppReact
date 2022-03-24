const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketOkType = sequelize.define('basket_oktype', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const OkType = sequelize.define('oktype', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: true, defaultValue: "No Image" },
})

const OkTypeInfo = sequelize.define('oktype_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

const WareHouse_db = sequelize.define('warehouse', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    current: { type: DataTypes.INTEGER },
    total: { type: DataTypes.INTEGER, defaultValue: 5 },
})
const Production_db = sequelize.define('production', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    count: { type: DataTypes.INTEGER },
    dateStart: { type: DataTypes.DATE, allowNull: true },
    dateReady: { type: DataTypes.DATE, allowNull: true },
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketOkType)
BasketOkType.belongsTo(Basket)

OkType.hasMany(OkTypeInfo, { as: 'info' })
OkTypeInfo.belongsTo(OkType)

OkType.hasMany(BasketOkType)
BasketOkType.belongsTo(OkType)

WareHouse_db.hasMany(OkType)
OkType.belongsTo(WareHouse_db)

WareHouse_db.hasOne(Production_db)
Production_db.belongsTo(WareHouse_db)

module.exports = {
    User, Basket, OkType, OkTypeInfo, WareHouse_db, Production_db, BasketOkType
}