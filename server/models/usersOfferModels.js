const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const { Production, User } = require('./ProdModels')

const Offer = sequelize.define('offer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
},
    { timestamps: true, freezeTableName: false })

const BPM = sequelize.define('bpm', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
},
    { timestamps: false, freezeTableName: true })

const Client = sequelize.define('client', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fio: { type: DataTypes.STRING, allowNull: false },
    tel: { type: DataTypes.STRING, allowNull: true }
},
    { timestamps: false, freezeTableName: false })

const ClientAdress = sequelize.define('adresses', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    adress: { type: DataTypes.STRING, allowNull: false }
},
    { timestamps: false, freezeTableName: true });

const ProductionTask = sequelize.define('prodTask', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})



Offer.hasOne(BPM)
BPM.belongsTo(Offer)

Offer.hasOne(Client)
Client.belongsTo(Offer)

Client.hasMany(ClientAdress)
ClientAdress.belongsTo(Client)

Client.hasMany(BPM)
BPM.belongsTo(Client)

User.hasMany(Offer)
Offer.belongsTo(User)

// Offer.belongsToMany(Production, { through: { ProductionTask } })
// Production.belongsToMany(Offer, { through: { ProductionTask } })





module.exports = { Offer, BPM, Client, ClientAdress, ProductionTask }