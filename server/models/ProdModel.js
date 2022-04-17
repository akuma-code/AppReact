const sequelize = require('../db')
const { DataTypes } = require('sequelize')



const Production_db = sequelize.define('Prod', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    dateReady: { type: DataTypes.STRING, allowNull: false },
    isComplete: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
})

const SKLAD = sequelize.define('Sklad', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // shopId: { type: DataTypes.STRING, allowNull: true },
    // typeId: { type: DataTypes.STRING, allowNull: true },
    total: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 5 },
    // current: { type: DataTypes.INTEGER, allowNull: true },
})

const ProdQuery = sequelize.define('prodQuery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})


SKLAD.belongsToMany(Production_db, { through: ProdQuery });
Production_db.belongsToMany(SKLAD, { through: ProdQuery });









module.exports = { Production_db, ProdQuery, SKLAD }