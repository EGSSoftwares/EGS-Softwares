const { redirect } = require("express/lib/response");
const pet = require("../../src/Model/pet");
const db = require('../../src/Persistence/db');
const cliente = require("../../src/Model/cliente");
const { Sequelize } = require("sequelize");
const servico = require("../../src/Model/servico");

function telaControle(req, res){
    res.sendFile('/src/view/Servico/controle_servico.html', {root: '..'})
}
function sendCadastro(req, res){
    res.sendFile('/src/view/Servico/cadastra_servico.html', {root: '..'})
}
function addServico(req, res){
    const dono = cliente.cliente.findAll({where: { nomePessoa: req.body.nomePessoa, Existente: true}});
    if(dono!=null){
        const bicho = pet.pet.findAll({ where: { nomePet: req.body.nomePet, Existente: true, CPF: dono.CPF}});
        if(bicho!=null){
            if(pet.addServico(
                {
                    data: req.body.dataServico.value+req.body.horaServico,
                    CPF: dono.CPF,
                    idPet: bicho[0].idPet,
                    valorCobrado: req.body.valor,
                    despeza: 0
                })){
                res.redirect("/view/tela_sucesso");
            }else{
                res.redirect("/view/tela_erro.html");
            }
        }else{
            res.redirect("/view/tela_erro.html");
        }
    }else{
        res.redirect("/view/tela_erro.html");
    }
}
module.exports={telaControle, sendCadastro, addServico}

