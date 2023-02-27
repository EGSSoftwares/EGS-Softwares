
const { redirect } = require("express/lib/response");
const db = require('../../src/Persistence/db');
const servico = require("../../src/Model/servico");
const { Sequelize } = require("sequelize");



function sendcss(req, res) {
    res.sendFile('/src/view/css/style.css', { root: '..' });
}

function sendlogo(req, res) {
    res.sendFile('/src/view/imagens/logo.jpg', { root: '..' });
}

function sendTelaDataDespesa(res){

    res.sendFile('src/view/data_despesa.html', { root: '..' })
    console.log("Despesa OK")

}

async function exibirDespesa(req, res) {
    var procura = null;
    await db.sync;
    console.log("Entrou no exibirDespesa");
    console.log(req.body);
    procura = await despesa.despesa.findAll({ where: { nomePessoa: req.body.nomePessoa } });
}