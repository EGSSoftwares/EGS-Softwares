const sequelize = require('sequelize');
const db = require('../Persistence/db'); //importando a persistencia

const despesa = db.define('Despesa' , (
    {
        dia: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        mes: {
            type: sequelize.STRING,
            allowNull: false,
        },
        ano: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        custo: {
            type: sequelize.DOUBLE,
            allowNull: false
        },

}));