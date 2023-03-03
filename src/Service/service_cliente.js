
const { redirect } = require("express/lib/response");
const db = require('../../src/Persistence/db');
const cliente = require("../../src/Model/cliente");





async function addCliente(result) {
    console.log("entrou add cliente Service");
    console.log(result)
    if (result.nomePessoa!=null) {
        if(result.CPF != null && result.CPF>0){
            if(result.tel > 0 ){
                if(result.bairro!= null){
                    if(result.num>0){
                        if(result.rua!= null){
                            if(result.cid!= null){
                                return true
                                var add=false;
                                add= await cliente.addCliente(result);
                                console.log(add)
                                
                            }
                        }
                    }
                }
            }
        }
    }
        return false;
}

module.exports = { addCliente};