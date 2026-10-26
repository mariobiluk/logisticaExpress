const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Carga = db.define('carga', {
    codCarga: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peso: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    volume: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    codRastreio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idMotorista: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codMotorista',
            model: 'motoristas'
        }
    },
}, {
    timestamps: false,
    tableName: 'cargas'
})

module.exports = Carga