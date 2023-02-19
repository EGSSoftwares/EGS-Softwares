const express = require('express'); //importando modulos necesarios
const bp = require('body-parser');
const morgan = require('morgan');
const { or } = require('sequelize');
const path = require('path');
const ejs = require('ejs');
console.log("req bd")
const db = require('../Persistence/db');
const cliente = require('../Model/cliente');
const res = require('express/lib/response');

var user = null;

// criar serviço
const app = express();      //instancia srver
app.set("views", path.join(__dirname, 'views'));    //para usarr o ejs
app.set('view engine', 'ejs');

//configurando morgan
app.use(morgan('dev'));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json()); 

app.get('/styleLogin.css', (req, res) => {
    res.sendFile('/view/styleLogin.css', { root: '..' });
})
app.get('/style.css', (req, res) => {
    res.sendFile('/view/style.css', { root: '..' });
})
app.get('/view/style.css', (req, res) => {
    res.sendFile('/view/style.css', { root: '..' });
})

app.get('/imagens/logo.jpg', (req, res) => {
    res.sendFile('/view/imagens/logo.jpg', { root: '..' });
})
app.get('/view/imagens/logo.jpg', (req,res) => {
    res.sendFile('/view/imagens/logo.jpg', { root: '..' });
})

//começa na tela de login
app.get('/', (req, res) => {        //inicia login
    console.log("Enviando login.");
    res.sendFile('/view/login.html', { root: '..' });
})

//faz verificacao de usuario
app.post('/login', (req, res) => {
    console.log("entrou login");
    const result = req.body;
    console.log(result);
    if (result.login == 'admin' && result.senha == 'admin') {   //user aadmin admin
        user='admin';
        res.redirect('/view/Gerenciamento.html');
    } else {
        res.send("Usuario nao cadastrado");
    }
})

app.get('/view/Gerenciamento.html', (req, res) =>{         //tela principal
    res.sendFile('/view/Gerenciamento.html', {root : '..'});
})  

app.get('/view/tela_sucesso.html', (req, res) =>{      //tela de sucesso
    res.sendFile('/view/tela_sucesso.html', {root: '..'});
})
app.get("/view/tela_erro.html", (req, res) => {        //tela de erro
    res.sendFile('/view/tela_erro.html', { root:'..' });        
})
app.get('/view/controle_cliente.html', (req, res) => {     //tela do crud de cliente
    res.sendFile('/view/controle_cliente.html', { root: '..' });
    console.log("entrou controle");
})
app.get('/view/cadastrar_clientes.html', (req, res) => {   //cadastrando clientes
    res.sendFile('/view/cadastrar_clientes.html', { root: '..' });  //envia formulario
    console.log("entrou cadastrar_cliente");
})

app.post('/view/addCliente', async (req, res) => {
    console.log("entrou add cliente");
    //onst op = cliente.addCliente(req,res);
    const result = req.body;
    console.log(result);
    if (result != null) {
        await db.sync();
        await cliente.create({
            nomePessoa: result.nomePessoa,  //cria novo cliente com informacoes do fomulario
            CPF: result.CPF,
            Telefone: result.tel,
            Bairro: result.bairro,
            Numero: result.num,
            Logradouro: result.rua,
            Cidade: result.cid,
            tipoFuncionario: 0,
            tipoCliente: 1
        }).then(function () {
            //res.send(req.body.nome + req.body.cpf + "Cadastraddo");   
            console.log("Entrou no then");
            res.redirect('/view/tela_sucesso.html');  //se deu certo
        }).catch(function (erro) {
            res.redirect("/view/tela_erro.html");  //se deu erro
        });
    }
})


console.log("Server inicializado");
app.listen(5000, () => console.log("ouvindo porta 5000"));
