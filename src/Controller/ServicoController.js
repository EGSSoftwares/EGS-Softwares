const { redirect } = require("express/lib/response");
const pet = require("../../src/Persistence/pet");
const db = require('../../src/Persistence/db');
const cliente = require("../Persistence/cliente");
const { Sequelize } = require("sequelize");
const servico = require("../../src/Persistence/servico");

function telaControle(req, res) {
    res.sendFile('/src/view/Serviço/controle_serviço.html', { root: '..' })
}
function sendCadastro(req, res) {
    res.sendFile('/src/view/Serviço/cadastra_servico.html', { root: '..' })
}
function sendGerenciamento(req, res) {
    res.sendFile('/src/view/gerenciamento.html', { root: '..' })
}


async function addServico(req, res) {
    const dono = await cliente.cliente.findAll({ where: { CPF: req.body.CPF, Existente: true } });
    if (dono.length != 0) {
        console.log(dono);
        const bicho = await pet.pet.findAll({ where: { nomePet: req.body.nomePet, Existente: true, CPF: req.body.CPF } });
        if (bicho.length != 0) {
            console.log(req.body);
            console.log(bicho[0]);
            if (await servico.addServico(
                {
                    tipoServico: req.body.tipoServico,
                    data: req.body.dataServico,
                    hora: req.body.horaServico,
                    CPF: req.body.CPF,
                    idPet: bicho[0].idPet,
                    valorCobrado: req.body.valor,
                    despesa: req.body.valor * 0.45
                })) {
                res.redirect("/view/tela_sucesso.html");
            } else {
                res.redirect("/view/tela_erro.html");
            }
        } else {
            res.redirect("/view/tela_erro.html");
        }
    } else {
        res.redirect("/view/tela_erro.html");
    }
}

function sendExcluir(req, res) {
    res.sendFile('/src/view/Serviço/excluir_servico_pela_data.html', { root: '..' })
}
async function sendExcluirejs(req, res) {
    var procura = await servico.servico.findOne({ where: { data: req.body.data, hora: req.body.hora } });
    var bicho = await pet.pet.findByPk(procura.idPet);
    if (procura != null && bicho != null) {
        res.render('../view/serviço/excluir_servico1.ejs', { servico: procura, pet: bicho });
    } else {
        res.redirect("/view/tela_erro.html");
    }
}

function sendVisualizar(req, res) {
    res.sendFile('/src/view/Serviço/visualizar_servico1.html', { root: '..' });
}

async function sendResultVisualizar(req, res) {
    const procura = await servico.servico.findAll({ where: { hora: req.body.hora, data: req.body.data } });
    const bichos = [];
    for (let i = 0; i < procura.length; i++) {
        bichos[i] = await pet.pet.findByPk(procura[i].idPet);
    }
    if (procura.length!= 0) {
        res.render('../view/serviço/visualizar_servico2.ejs', { servico: procura, bicho: bichos });
    } else {
        res.redirect("/view/tela_erro.html");
    }
}

async function deleteServico(req, res) {
    if (await servico.deleteServico(req.body)) {
        res.redirect("/view/tela_sucesso.html");
    } else {
        res.redirect("/view/tela_erro.html");
    }
}

async function attServico(req, res) {
    if (await servico.attServico(req.body)) {
        res.redirect("/view/tela_sucesso.html")
    } else {
        res.redirect("/view/tela_erro.html");
    }
}

async function attejs(req, res) {
    data = req.body.data
    console.log(data)
    const serv = await servico.servico.findOne({ where: { data: req.body.data } });
    console.log(data)
    if (serv != null) {
        const bicho = await pet.pet.findByPk(serv.idPet);
        var dono = await cliente.cliente.findAll({ where: { CPF: serv.CPF } });
        dono = dono[0];
        res.render("../view/serviço/alterar_servico.ejs",
            {
                servico: {
                    nomePessoa: dono.nomePessoa,
                    tipo: serv.tipoServico,
                    hora: serv.hora,
                    data: serv.data,
                    nomePet: bicho.nomePet,
                    valor: serv.valorCobrado
                }
            })
    } else {
        res.redirect("/view/tela_erro.html");
    }
}



function sendBuscasAlterar(req, res) {
    res.sendFile('/src/view/Serviço/busca_att.html', { root: '..' });
}
function sendAlterar(req, res) {
    res.sendFile('/src/view/Serviço/alterar_servico.html', { root: '..' });
}
async function sendAlterarejs(req, res) {

}
module.exports = {
    telaControle, sendCadastro, addServico, sendExcluir, sendExcluirejs, sendVisualizar, attejs,
    sendAlterar, sendGerenciamento, deleteServico, sendResultVisualizar, sendBuscasAlterar, attServico
}

