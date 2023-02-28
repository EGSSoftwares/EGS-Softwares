const { redirect } = require("express/lib/response");
const pet = require("../../src/Model/pet");
const db = require('../../src/Persistence/db');
const cliente = require("../../src/Model/cliente");
const { Sequelize } = require("sequelize");
const servico = require("../../src/Model/servico");

function telaControle(req, res){
    res.sendFile('/src/view/Serviço/controle_serviço.html', {root: '..'})
}
function sendCadastro(req, res){
    res.sendFile('/src/view/Serviço/cadastra_servico.html', {root: '..'})
}
async function addServico(req, res){
    const dono = await cliente.cliente.findAll({where: { CPF: req.body.CPF, Existente: true}});
    if(dono!=undefined){
        console.log(dono);
        const bicho = await pet.pet.findAll({ where: { nomePet: req.body.nomePet, Existente: true, CPF: req.body.CPF}});
        if(bicho!=undefined){
            console.log(req.body);
            console.log(bicho[0]);
            if(await servico.addServico(
                {
                    tipoServico: req.body.tipoServico,
                    data: req.body.dataServico,
                    hora: req.body.horaServico,
                    CPF: req.body.CPF,
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

function sendExcluir(req, res){
    res.sendFile('/src/view/Serviço/excluir_servico_pela_data.html', {root: '..'})
}
function sendExcluirejs(req,res){
    
}

function sendVisualizar(req, res){
    res.sendFile('/src/view/Serviço/visualizar_servico1.html', {root: '..'});
}
async function sendVisualizarejs(req, res){
    const serv = await servico.servico.findAll( { where: { data: req.data, hora: req.hora}});
    if (serv!= undefined){
        const bicho = await pet.pet.findByPk(serv.idPet);
        var dono = await cliente.cliente.findAll({where: { CPF: serv.CPF}});
        dono= dono[0];
        res.render("/Serviço/visualizar_serviço2.ejs", 
        { servico: {
            tipo: serv.tipoServico,
            hora: serv.hora,
            data: serv.data,
            nomePet: bicho.nomePet,
            valor: serv.valorCobrado
        }})
    }else{
        res.redirect("/view/tela_erro.html");
    }
}
function sendAlterar(req, res){
    res.sendFile('/src/view/Serviço/alterar_servico.html', {root: '..'});
}
async function sendAlterarejs(req, res){
    
}
module.exports={telaControle, sendCadastro, addServico, sendExcluir, sendExcluirejs, sendVisualizar, sendVisualizarejs,
                sendAlterar
                }

