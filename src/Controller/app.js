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

console.log("Server inicializado");
app.listen(5000, () => console.log("teste 5000"));
