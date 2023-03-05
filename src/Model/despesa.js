const sequelize = require('sequelize');
const db = require('../Persistence/db'); //importando a persistencia
const servico = require('../../src/Model/servico');

async function relatorio(req) {
    console.log(req);
    return await servico.servico.findAll({
        where: {
            data: {
                $between: [req.body.dataInicial, req.body.dataFinal]
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
module.exports = {relatorio};
