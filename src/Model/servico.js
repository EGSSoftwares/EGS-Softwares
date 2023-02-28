const sequelize = require('sequelize');
const cliente = require('../../src/Model/cliente'); 
const pet = require('../../src/Model/cliente'); 
const db = require('../Persistence/db'); //importando a persistencia
const servico = db.define('Servico', {
    idServico: { 
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
    try{
        await db.sync();
        servico.create({
            //data: result.ano+'-'+result.mes+'-'+result.dia+'-'+' '+result.hora+':'+result.min+":00",
            data: result.dataServico,
            hora: result.horaServico,
            CPF: result.CPF,
            idPet: await pet.findAll({where: { CPF: result.CPF, nomePet: result.nomePet, Existente: true}})[0].idPet,
            valorCobrado: result.valorCobrado,
        })
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
        let serv = await servico.findAll({where: { data: result.data, hora: result.hora}})
        serv.data = result.data;
        serv.hora = result.hora;
        await serv.save();
        retorno = true;
    }catch(erro){

    }
    return retorno;
}

module.exports={servico, addServico, attServico, deleteServico};