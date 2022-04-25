const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const SkladMain = sequelize.define('sklad', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quant: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
},
    { timestamps: false, freezeTableName: true }
)

const Production = sequelize.define('prod', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    dateReady: { type: DataTypes.STRING, allowNull: false },
    isReady: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, { freezeTableName: true })

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
},
    { timestamps: false }
)


const OkType = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false, defaultValue: "noimage" },
},
    { timestamps: false })

const Shop = sequelize.define('shop', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    price: { type: DataTypes.INTEGER, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: true },
},
    { timestamps: false, freezeTableName: true })


const ProdQuery = sequelize.define('prodQuery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, { freezeTableName: true })


const OkTypeInfo = sequelize.define('type_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    desc: { type: DataTypes.STRING, allowNull: false, defaultValue: "No Description" },
},
    { timestamps: false, freezeTableName: true });


const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})


OkType.hasOne(SkladMain)
SkladMain.belongsTo(OkType)
// OkType.belongsTo(Shop)
// Shop.belongsTo(OkType)

SkladMain.hasOne(Shop)
Shop.belongsTo(SkladMain)


OkType.hasMany(OkTypeInfo, { as: 'info' })
OkTypeInfo.belongsTo(OkType)

SkladMain.belongsToMany(Production, { through: ProdQuery });
Production.belongsToMany(SkladMain, { through: ProdQuery });



User.hasOne(Basket)
Basket.belongsTo(User)


module.exports = { Production, ProdQuery, SkladMain, OkType, OkTypeInfo, Shop, User }