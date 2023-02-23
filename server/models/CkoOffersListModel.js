const sequelize = require('../db')
const { DataTypes } = require('sequelize')


const GlobalOffersList = sequelize.define('cko_offers', {
    pgID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    id: { type: DataTypes.STRING, unique: true, allowNull: false },
    offerId: { type: DataTypes.STRING, unique: true, allowNull: false },
    companyName: { type: DataTypes.STRING, unique: false, allowNull: false },
    companyTag: { type: DataTypes.STRING, unique: false, allowNull: false },
    dateReady: { type: DataTypes.STRING, unique: false, allowNull: false },
    status: { type: DataTypes.STRING, unique: false, allowNull: true },
    desc: { type: DataTypes.STRING, unique: false, allowNull: true },
    isDocSigned: { type: DataTypes.BOOLEAN, unique: false, allowNull: true },
    isDocRequested: { type: DataTypes.BOOLEAN, unique: false, allowNull: true },


}, { freezeTableName: true, timestamps: false })

module.exports = GlobalOffersList 