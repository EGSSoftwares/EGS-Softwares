
const { redirect } = require("express/lib/response");
const cliente = require("../Persistence/cliente");
const db = require('../../src/Persistence/db');
const service= require('../../src/Service/service_cliente');

function sendcss(req, res) {
    res.sendFile('/src/view/css/style.css', { root: '..' });
}
function sendlogo(req, res) {
    res.sendFile('/src/view/imagens/logo.jpg', { root: '..' });
}

function sendTelaSucesso(req, res) {      //tela de sucesso
    res.sendFile('/src/view/cliente/tela_sucesso.html', { root: '..' });
}
function sendTelaErro(req, res) {        //tela de erro
    res.sendFile('/src/view/cliente/tela_erro.html', { root: '..' });
}

function sendTelaCrtlCliente(req, res) {     //tela do crud de cliente
    res.sendFile('/src/view/cliente/controle_cliente.html', { root: '..' });
    console.log("entrou controle");
}

function sendTelaCadCliente(req, res) {   //cadastrando clientes
    res.sendFile('/src/view/cliente/cadastrar_clientes.html', { root: '..' });  //envia formulario
    console.log("entrou cadastrar_cliente");
}

function sendInicio(req, res){
    res.sendFile('/src/view/gerenciamento.html');
}
async function addCliente(req, res, next) {
    console.log("entrou add cliente");
    const result = req.body;
    console.log(result);
    var redirect = '/view/tela_erro.html';
    console.log(redirect);
    if (service.addCliente(result)) {
        console.log("Entrou if antes")
        var add=false;
        add= await cliente.addCliente(result);
        console.log(add);
        if(add==false){            
            console.log("entrou no add=false");
            redirect = '/view/tela_erro.html';
        }else{
            redirect ='/view/tela_sucesso.html';
        }
    }
    console.log(redirect);
    res.redirect(redirect);
}

function sendTelaExcluir(req, res) {
    res.sendFile('/src/view/cliente/excluir_cliente.html', { root: '..' });
    console.log("entrou no excluir cliente");
}
function sendTelaControle(req,res){
    res.sendFile('/src/view/cliente/controle_cliente.html', { root: '..' });
    console.log("entrou no controle cliente");

}

var lastpkpessoa = -1;
async function sendTelaExcluir2(req, res) {
    const result= req.body
    if(service.verificaBusca(result)){
        clientefordelete = await cliente.cliente.findAll({ where: { CPF: req.body.CPF } });
        console.log("resultado ?? " + clientefordelete);
        if(clientefordelete.length!=0 && clientefordelete!=undefined){
            lastpkpessoa = clientefordelete.idPessoa;
            res.render('../view/cliente/mostrar_cliente.ejs', { cliente: clientefordelete[0] });
        }else{
            res.redirect("/view/tela_erro.html");
        }
    }else{
        res.redirect("/view/tela_erro.html")
    }
}

async function deleteCliente(req, res) {
    if(await cliente.excluirCliente(req.body.pkpessoa)){
        lastpkpessoa = -1;
        res.redirect("/view/tela_sucesso.html");
    }else{
        res.redirect("/view/tela_erro.html");
    }
}

function sendTelaBuscarCliente(req, res) {
    res.sendFile('/src/view/cliente/pagina_buscar_cliente.html', { root: '..' });  //pega nome de cliente no form
}

async function mostrarClientes(req, res) {
    await db.sync;
    console.log("Entrou no exibirCliente");
    console.log(req.body);
    const result= req.body;
    if(service.verificaBuscaNome(result)){
        var procura = null;
        procura = await cliente.cliente.findAll({ where: { nomePessoa: req.body.nomePessoa, Existente: true} }); //faz select
        console.log(procura);
        if (procura.length !=0 && procura!=undefined) {
            res.render("../view/cliente/informacoes_cliente.ejs", { pessoas: procura }); //exibe clientes com o nome
        }else{
            res.redirect('/view/tela_erro.html');
        }
    }else{
        res.redirect('/view/tela_erro.html')
    }
    
}

function solicitarCpf(req, res) {
    res.sendFile('/src/view/cliente/solicitar_cpf.html', { root: '..' })  //solicita cpf
}

async function formattCliente(req, res) {
    const result= req.body;
    if(service.verificaBusca(result)){
        const procura = await cliente.cliente.findAll({ where: { CPF: req.body.CPF } });
        console.log(procura);
        if(procura.length!=0 && procura!=undefined){
            const pessoa = {
                nomePessoa: procura[0].nomePessoa,
                num: procura[0].Numero,
                tel: procura[0].Telefone,
                bai: procura[0].Bairro,
                log: procura[0].Logradouro,
                cpf: procura[0].CPF,
                cid: procura[0].Cidade
            }
            lastpkpessoa = procura[0].idPessoa;
            res.render("../view/cliente/atualizar_cliente", { pessoa: pessoa });//gera formulario preenchido
        }else{
            res.redirect('/view/tela_erro.html');
        }
    }else{
        res.redirect('/view/tela_erro.html');
    }
}

async function attCliente(req, res) {
    const result= req.body;
    var redirect ="/view/tela_erro.html";
    if(service.addCliente(result)){
        console.log("entrou if att")
        if(await cliente.attCliente (lastpkpessoa, req)){
            console.log("entrou if 2 att")
            redirect="/view/tela_sucesso.html";
        }else{
            redirect= "/view/tela_erro.html";
        }
    }else{
        redirect = "/view/tela_erro.html";
    }
    res.redirect(redirect);
}

module.exports = { attCliente, formattCliente, solicitarCpf, mostrarClientes, sendTelaBuscarCliente, deleteCliente,
    sendTelaExcluir2, addCliente, sendTelaExcluir, sendTelaCadCliente, sendTelaCrtlCliente, sendTelaErro,
    sendTelaSucesso, sendcss, sendlogo, sendInicio }
