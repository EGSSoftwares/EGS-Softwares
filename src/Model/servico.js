const sequelize = require('sequelize');
const cliente = require('../../src/Model/cliente'); 
const pet = require('../../src/Model/pet'); 
const db = require('../Persistence/db'); //importando a persistencia
const servico = db.define('Servico', {
    idServico: { 
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }, 
    tipoServico:{
        type: sequelize.STRING,
        allowNull: true
    },
    data: {
        type: sequelize.DATEONLY,
        allowNull: false,
    },
    hora: {
        type: sequelize.TIME,
        allowNull: false
    },
    valorCobrado: {
        type: sequelize.DOUBLE,
        allowNull: true,
    },
    despeza: {
        type: sequelize.DOUBLE,
        allowNull: true
    }
})
servico.belongsTo(cliente.cliente, {
    foreignKey: "CPF", 
    targetKey: "CPF"
});
servico.belongsTo(pet.pet, {
    foreignKey: "idPet",
    targetKey: "idPet"
});

async function addServico( result){     //cria servico
    retorno = false;
    console.log("entrou no add servico do servico.js");
    console.log(result);
    try{
        await db.sync();
        await servico.create({
            tipoServico: result.tipoServico,
            //data: result.ano+'-'+result.mes+'-'+result.dia+'-'+' '+result.hora+':'+result.min+":00",
            data: result.data,
            hora: result.hora,
            CPF: result.CPF,
            //idPet: await pet.findAll({where: { CPF: result.CPF, nomePet: result.nomePet, Existente: true}})[0].idPet,
            idPet: result.idPet,
            valorCobrado: result.valorCobrado,
            despeza: result.despeza
        });
        retorno= true;
    }catch(erro){

    }
    return retorno;
}
async function deleteServico(result){   //deleta servico numa data
    retorno = false;
    try{
        await db.sync();
        await servico.destroy( { where: { data: result.data, hora: result.hora}});
        retorno = true;
    }catch(err){

    }
    return retorno;
}
async function attServico (result){ //atualiza servico pra outra data
    retorno = false;
    try{
        await db.sync();
        let serv = await servico.findOne({where: { data: result.reqdata, hora: result.reqhora}})
        serv.data = result.data;
        serv.hora = result.hora;
        await serv.save();
        retorno = true;
    }catch(erro){

    }
    return retorno;
}

module.exports={servico, addServico, attServico, deleteServico};