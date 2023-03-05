
const { redirect } = require("express/lib/response");
const db = require('../../src/Persistence/db');
const cliente = require("../../src/Model/cliente");
const validador = require("../../src/Model/validadorCpf.js");






async function addCliente(result) {
    console.log("entrou add cliente Service");
    console.log(result)
    if (result.nomePessoa!=null) {
        if( validador.validaCpf(result.CPF)){
            if(result.tel > 0 ){
                if(result.bairro!= null){
                    if(result.num>0){
                        if(result.rua!= null){
                            if(result.cid!= null){
                                return true;
                                
                            }
                        }
                    }
                }
            }
        }
    }
        return false;
}

async function verificaBusca(result) {
    console.log("entrou verifica cliente Service");
    console.log(result)
    if (validador.validaCpf(result.CPF)) {
        return true; 
    }else{
        return false;
    }
}

async function verificaBuscaNome(result) {
    console.log("entrou verifica nome cliente Service");
    console.log(result)
    if (result.nomePessoa!= null) {
        return true; 
    }else{
        return false;
    }
}

module.exports = { addCliente, verificaBusca, verificaBuscaNome};