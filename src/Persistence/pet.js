const sequelize = require('sequelize');
const cliente = require('../../src/Persistence/cliente'); 

const db = require('../Persistence/db'); //importando a persistencia

const pet = db.define('Pet', {
    idPet: { 
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }, 
    nomePet: {
        type: sequelize.STRING,
        allowNull: false
    },
    Especie: {
        type: sequelize.STRING,
        allowNull: false,
    },
    Raca: {
        type: sequelize.STRING,
        allowNull: true
    },
    Peso: {
        type: sequelize.DOUBLE,
        allowNull: true
    },
    Existente: {
        type: sequelize.BOOLEAN,
        allowNull:false
    }
})
pet.belongsTo(cliente.cliente, {
    foreignKey: "CPF", 
    targetKey: "CPF"
});

async function addPet (result) {
    await db.sync();
    console.log("Entrou no add cliente de cliente.js");
    var retorno=false;
    //const pessoa = cliente.cliente.findAll( { where: { CPF: result.CPF }})[0];
    console.log(result);
    await pet.create({
        nomePet: result.nomePet,  //cria novo cliente com informacoes do fomulario
        Especie: result.especiePet,
        Peso: result.pesoPet,
        Raca: result.racaPet,
        Existente: true,
        CPF: result.CPF,
    }).then(retorno = true )
    .catch( function (erro){ 
            console.log("Entrou no catch addpet pet.js");
            retorno =  false;
            console.log(retorno);
            return retorno;
    });
    console.log("retorno no final é " +retorno);
    return retorno;
}
 async function excluirPet(idPet) {
    var retorno = false;
    await db.sync();
    try {
        let procura = await pet.findByPk(idPet);
        procura.Existente=false;
        await procura.save();
        retorno = true;
    } catch (erro) {
        throw new Error("erro");
    }
    return retorno;
};
async function attPet(pkpet, req) {
    retorno = false;
    console.log("entrou att pet pet.js");
    try{
        await db.sync;
        var procura = await pet.findByPk(pkpet);
        console.log(procura);
        procura.nomePet= req.body.nomePet,  //cria novo cliente com informacoes do fomulario
        procura.Especie= req.body.especie,
        procura.Peso= req.body.peso,
        procura.Raca= req.body.raca,
        console.log(procura);
        await procura.save();
        return true;
    }catch(erro){
    }
    return retorno;
};

module.exports={ attPet, excluirPet, addPet, pet};