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
module.exports = {relatorio};