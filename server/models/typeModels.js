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
    desc: { type: DataTypes.STRING, allowNull: false },
})


const Production_db = sequelize.define('production', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    count: { type: DataTypes.INTEGER },
    dateStart: { type: DataTypes.DATE, allowNull: true },
    dateReady: { type: DataTypes.DATE, allowNull: true },
})

const SKLAD = sequelize.define('SKLAD', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false },
})


const Amount = sequelize.define('amount', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false },
    count: { type: DataTypes.INTEGER, defaultValue: 5 },
})



User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketOkType)
BasketOkType.belongsTo(Basket)

OkType.hasMany(OkTypeInfo, { as: 'info' })
OkTypeInfo.belongsTo(OkType)

OkType.hasMany(BasketOkType)
BasketOkType.belongsTo(OkType)

SKLAD.hasOne(Amount)
Amount.belongsTo(SKLAD)

SKLAD.hasOne(Production_db)
Production_db.belongsTo(SKLAD)

// SKLAD.hasMany(OkType)
// OkType.belongsTo(SKLAD)

// Production_db.hasMany(OkType)
// OkType.belongsTo(Production_db)



module.exports = {
    User, Basket, OkType, OkTypeInfo, SKLAD, Production_db, BasketOkType, Amount
}