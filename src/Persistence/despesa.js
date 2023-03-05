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


module.exports = {relatorio, despesa};
