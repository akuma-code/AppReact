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

const BasketOkno = sequelize.define('basket_okno', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Okno = sequelize.define('okno', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false, defaultValue: "No Image" },
})

const OknoInfo = sequelize.define('okno_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

const Ogo_SKLAD = sequelize.define('ogo_sklad', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    count: { type: DataTypes.INTEGER }
})


User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketOkno)
BasketOkno.belongsTo(Basket)

Okno.hasMany(OknoInfo, { as: 'info' })
OknoInfo.belongsTo(Okno)

Okno.hasMany(BasketOkno)
BasketOkno.belongsTo(Okno)

Ogo_SKLAD.hasMany(Okno)
Okno.belongsTo(Ogo_SKLAD)

module.exports = {
    User,
    Basket,
    BasketOkno,
    OknoInfo,
    Ogo_SKLAD,
    Okno
}