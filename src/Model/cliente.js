const sequelize = require('sequelize');

const db = require('../Persistence/db'); //importando a persistencia

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

var addCliente = async function (result) {
    await db.sync();
    console.log("Entrou no add cliente de cliente.js");
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
    }).catch( function (erro){ 
                console.log("Entrou no catch addcliente cliente.js");
                throw new Error("teste")});
}
var excluirCliente = async function (idPessoa) {
    await db.sync();
    try {
        await cliente.destroy({
            where: { idPessoa: idPessoa }
        });
    } catch (erro) {
        throw new Error("erro");
    }
};
var attCliente = async function (lastpkpessoa, req) {
    await db.sync;
    const procura = await cliente.findByPk(lastpkpessoa);
    procura.nomePessoa = req.body.nomePessoa;
    procura.CPF = req.body.CPF;
    procura.Cidade = req.body.cid;
    procura.Telefone = req.body.tel;
    procura.Bairro = req.body.bairro;
    procura.Logradouro = req.body.rua;
    procura.Numero = req.body.num;
    try {
        await procura.save();
    } catch (erro) {
        throw new Error("erro");
    }
};
module.exports = { cliente, addCliente, excluirCliente, attCliente };