const sequelize = require('sequelize');

const db = require('../persist/db'); //importando a persistencia

const cliente = db.define('Cliente', (  //definindo cliente de acordo com os requisitoss
    {
        idPessoa: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nomePessoa: {
            type: sequelize.STRING,
            allowNull: false
        },
        CPF: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        Telefone: {
            type: sequelize.STRING,
            allowNull: false
        },
        Bairro: {
            type: sequelize.STRING,
            allowNull: false
        },
        Numero: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        Logradouro: {
            type: sequelize.STRING,
            allowNull: false
        },
        Cidade: {
            type: sequelize.STRING,
            allowNull: false
        },
        tipoFuncionario: {
            type: sequelize.TINYINT,
            allowNull: false
        },
        tipoCliente: {
            type: sequelize.TINYINT,
            allowNull: false
        }
    }
));

module.exports = cliente;