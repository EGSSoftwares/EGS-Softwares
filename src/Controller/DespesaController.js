
const { redirect } = require("express/lib/response");
const db = require('../../src/Persistence/db');
const despesa = require("../../src/Model/despesa");
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
    var procura = null;
    await db.sync();
    console.log("Entrou no exibirDespesa");
    console.log(req.body);
    const procura = await despesa.relatorio(req);
    console.log(procura);
    let valor = 0, lucro =0, despesa=0;
    for(let i=0; i<procura.length; i++){
        valor+=procura[i].valorCobrado;
        despesa= procura[i].despesa
    }
    lucro= valor-despesa;
    const relatorio= {
        dataini: req.body.dataini,
        datafim: req.body.fim,
        valor: valor,
        despesa: despesa,
        lucro: lucro
    }
    res.render("../view/cliente/informacoes_cliente.ejs", { relatorio: relatorio});
}

module.exports= {
    sendcss, sendlogo, sendTelaDataDespesa, exibirDespesa
}
