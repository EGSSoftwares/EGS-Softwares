const express = require('express'); //importando modulos necesarios
const bp = require('body-parser');
const morgan = require('morgan');
const seq = require('sequelize');
const path = require('path');
const ejs = require('ejs');
console.log("req bd");
const db = require('../src/Persistence/db');
const cliente = require('./Persistence/cliente'); 
const res = require('express/lib/response');
const clienteRoute = require('../src/Routes/clienteRoute');
const petRoute = require('../src/Routes/petRoute');
const servicoRoute = require('../src/Routes/servicoRoute');
const despesaRoute = require('../src/Routes/despesaRoute');

var user = null;

// criar serviço
const app = express();      //instancia srver
app.set("views", path.join(__dirname, 'view'));    //para usarr o ejs
app.set('view engine', 'ejs');

//configurando morgan
app.use(morgan('dev'));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());


//enviando arquivos
app.get('/styleLogin.css', (req, res) => {
    res.sendFile('/src/View/CSS/styleLogin.css', { root: '..' });
})
app.get('/style.css', (req, res) => {
    res.sendFile('/src/View/CSS/style.css', { root: '..' });
})
app.get('/src/View/CSS/style.css', (req, res) => {
    res.sendFile('/src/View/CSS/style.css', { root: '..' });
})

app.get('/imagens/logo.jpg', (req, res) => {
    res.sendFile('/src/view/imagens/logo.jpg', { root: '..' });
})
app.get('/view/imagens/logo.jpg', (req, res) => {
    res.sendFile('/src/view/imagens/logo.jpg', { root: '..' });
})

//começa na tela de login
app.get('/', (req, res) => {        //inicia login
    console.log("Enviando login.");
    res.sendFile('/src/view/login.html', { root: '..' });
})

app.get('/inicio', (req, res) => {
    if(user=='admin'){         //tela principal
        res.sendFile('/src/view/gerenciamento.html', { root: '..' });
    }else{
        res.sendFile('/src/view/gerenciamento2.html', { root: '..' });

    }
})

//faz verificacao de usuario
app.post('/login', (req, res) => {
    console.log("entrou login");
    const result = req.body;
    console.log(result);
    if (result.login == 'admin' && result.senha == 'admin') {   //user aadmin admin
        user = 'admin';
        res.redirect('/view/gerenciamento.html');
    }else if(result.login == 'func' && result.senha=='func'){
        user = 'func';
        res.redirect('/view/gerenciamento.html');
    }
    else {
        res.send("Usuario nao cadastrado");
    }
})

app.get('/view/gerenciamento.html', (req, res) => {
    console.log(user)
    if(user=='admin'){         //tela principal
        res.sendFile('/src/view/gerenciamento.html', { root: '..' });
    }else{

        res.sendFile('/src/view/gerenciamento2.html', { root: '..' });

    }
})

app.get('/view/tela_sucesso.html', (req, res)=> {      //tela de sucesso
    res.sendFile('/src/view/tela_sucesso.html', { root: '..' });
})
app.get('/view/tela_erro.html', (req, res)=> {      //tela de sucesso
    res.sendFile('/src/view/tela_erro.html', { root: '..' });
})

app.use("/cliente", clienteRoute)
app.use("/pet", petRoute)
app.use("/servico", servicoRoute)
app.use("/despesa", despesaRoute)
console.log("Server inicializado");
app.listen(5000, () => console.log("ouvindo porta 5000"));
