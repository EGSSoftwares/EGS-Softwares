
const { redirect } = require("express/lib/response");
const db = require('../../src/Persistence/db');
const cliente = require("../Persistence/cliente");
const validador = require("../../src/Model/validadorCpf.js");






async function addCliente(result) {
    console.log("entrou add cliente Service");
    console.log(result)
    if(result==[] || result==undefined || result==null){
        return false;
    }
    if (result.nomePessoa!=null && result.nomePessoa!=undefined) {
        if( result.CPF != null &&validador.validaCpf(result.CPF)){
            if(result.tel > 0 && result.tel !=undefined ){
                console.log("Testou telefone")
                if(result.bairro != null && result.bairro!=undefined){
                    console.log("Testou bairro")
                    console.log(result.num)
                    if(result.num > 0 && result.num !=undefined){
                        console.log("testou numero")
                        if(result.rua!= null && result.rua!=undefined){
                            console.log("testou rua")
                            if(result.cid!= null && result.cid!=undefined){
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
    console.log(result);
    if (validador.validaCpf(result.CPF)) {
        return true; 
    }else{
        return false;
    }
}

async function verificaBuscaNome(result) {
    console.log("entrou verifica nome cliente Service");
    console.log(result)
    if (result.nomePessoa!= null && result.nomePessoa!=undefined) {
        return true; 
    }else{
        return false;
    }
}

module.exports = { addCliente, verificaBusca, verificaBuscaNome};