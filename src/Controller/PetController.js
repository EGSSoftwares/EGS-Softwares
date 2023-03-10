const { redirect } = require("express/lib/response");
const pet = require("../../src/Persistence/pet");
const db = require('../../src/Persistence/db');
const cliente = require("../Persistence/cliente");
const { Sequelize } = require("sequelize");
const service= require('../../src/Service/service_pet');
function sendcss(req, res) {
    res.sendFile('/src/view/style.css', { root: '..' });
}
function sendlogo(req, res) {
    res.sendFile('/src/view/imagens/logo.jpg', { root: '..' });
}

function sendTelaSucesso(req, res) {      //tela de sucesso
    res.sendFile('/src/view/tela_sucesso.html', { root: '..' });
}

function sendTelacrtlPet(req, res){
    res.sendFile('/src/view/Pet/controle_pet.html', { root: '..'});
}

function sendTelaPet(req, res){
    res.sendFile('/src/view/Pet/cadastrar_pet.html', {root: '..'});
}

async function addPet(req, res){
    console.log("entrou no add pet, petcrtl.js");
    console.log(req.body);
    let redirect ='/view/tela_erro.html';
    if(service.validaAdd(req.body)){
        const dono = await cliente.cliente.findAll( { where : {CPF: req.body.CPF, Existente: true } } );
        console.log(dono[0]);
        if(dono.length!=0 && await pet.addPet(req.body)){
            redirect ='/view/tela_sucesso.html';
        }
    }
    res.redirect(redirect);
}

function sendTelaExcluir(req, res){
    res.sendFile('/src/view/Pet/excluir_pet.html', {root: '..'});
}
var idpet = -1;
async function sendTelaExcluir2(req, res){
    if(service.validaExcluir(req.body)){
        const dono = await cliente.cliente.findAll( { where : { CPF: req.body.CPF }});
        if(dono.length!=0){
            const bicho = await pet.pet.findAll( { where : { CPF: dono[0].CPF, nomePet: req.body.nomePet, Existente: true}});
            if(bicho.length!=0){
                idpet = bicho[0].idPet;
                res.render("../view/pet/excluir_pet22", { pets: bicho, pessoa: dono});
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
async function deletePet(req, res){
    let redirect ='/view/tela_erro.html';
    if(idpet>0){
        if( await pet.excluirPet(idpet)){
            idpet=-1;
            redirect = '/view/tela_sucesso.html';
        }
    }
    res.redirect(redirect);
}
function sendTelaBuscarPet(req, res){
    res.sendFile('/src/view/Pet/visualizar_pet.html', {root: '..'});
}

async function exibirPet(req, res){
    console.log("entrou no exibir pet");
    if(service.validaExcluir(req.body)){
        const dono = await cliente.cliente.findAll( { where : { CPF: req.body.CPF }});
        if(dono.length!=0){
            console.log("entrou dono");
            const bicho = await pet.pet.findAll( { where : { CPF: req.body.CPF, nomePet: req.body.nomePet, Existente:true}});
            if(bicho.length!=0){
                console.log("entrou pet");
                res.render("../view/pet/informacoes_pet2.ejs", { pets: bicho, pessoa: dono});
            }else{
                res.redirect("/src/view/tela_erro.html");
            }
        }else{
            res.redirect("/view/tela_erro.html");
        }
    }
}

function  solicitarCpfENome(req, res){
    res.sendFile('/src/view/Pet/atualizar_pet_pagina_busca.html', {root: '..'});
}
async function formattPet(req, res){
    console.log(req.body.CPF);
    if(service.validaExcluir(req.body)){
        const CPF= req.body.CPF
        const dono = await cliente.cliente.findAll( { where : { CPF: req.body.CPF }});
        if(dono.length!=0){
            const bicho = await pet.pet.findAll( { where : { CPF: req.body.CPF, nomePet: req.body.nomePet, Existente: true}});
            console.log(bicho)
            if(bicho.length!=0){
                console.log("entrou bicho");
                idpet = bicho[0].idPet;
                res.render("../view/pet/atualizar_pet.ejs", { pet: bicho[0] });
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
async function attPet (req, res){
    console.log("entrou no att pet, petcrtl.js");
    let redirect ='/view/tela_erro.html';
    console.log(service.validaAtt(req.body));
    if(service.validaAtt(req.body)){
        console.log("passou service");
        console.log(idpet);
        if(idpet > 0 && await pet.attPet(idpet, req) ){
            redirect = '/view/tela_sucesso.html';
        }
    }
    res.redirect(redirect);
}

module.exports= {sendlogo, sendcss, sendTelacrtlPet, sendTelaPet, addPet, sendTelaExcluir, sendTelaExcluir2,
                deletePet, sendTelaBuscarPet, exibirPet, solicitarCpfENome, formattPet, attPet
}