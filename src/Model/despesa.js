const sequelize = require('sequelize');
const db = require('../Persistence/db'); //importando a persistencia
const servico = require('../../src/Model/servico');
const { Op } = require("sequelize");
async function relatorio(req) {
    //console.log(req);
    return await servico.servico.findAll({
        where: {
            data: {
                [Op.between]: [req.body.dataini, req.body.datafim]
            }
        }
    });
}


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
module.exports = {relatorio, despesa};
