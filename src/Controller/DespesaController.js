
const { redirect } = require("express/lib/response");
const db = require('../../src/Persistence/db');
const despesa = require("../../src/Persistence/despesa");
const { Sequelize } = require("sequelize");



function sendcss(req, res) {
    res.sendFile('/src/view/css/style.css', { root: '..' });
}

function sendlogo(req, res) {
    res.sendFile('/src/view/imagens/logo.jpg', { root: '..' });
}

function sendTelaDataDespesa(req, res){
    res.sendFile('/src/view/Despesa/despesas.html', { root: '..' });
    console.log("Despesa OK");
}

async function exibirDespesa(req, res) {
    await db.sync();
    console.log("Entrou no exibirDespesa");
    //onsole.log(req.body);
    const procura = await despesa.relatorio(req);
    console.log(procura);
    let valor = 0, lucro =0, gastos=0;
    if(procura!=[] && procura!=undefined)
        for(let i=0; i<procura.length; i++){
            valor+=procura[i].valorCobrado;
            gastos+= procura[i].despesa;
        }
    lucro= valor -gastos;
    const relatorio= {
        dataini: req.body.dataini,
        datafim: req.body.datafim,
        valor: valor,
        despesa: gastos,
        lucro: lucro
    }
    res.render("../view/Despesa/despesas.ejs", { relatorio: relatorio});
}

module.exports= {
    sendcss, sendlogo, sendTelaDataDespesa, exibirDespesa
}
