const validador = require("../../src/Model/validadorCpf.js");
const service= require('../../src/Service/service_cliente');

function validaAdd(result) {
    if (result.nomePet != "" && result.nomePet != undefined && result.nomePet != null) {
        if (result.especiePet != "" && result.especiePet != undefined && result.especiePet != null) {
            if (result.pesoPet > 0 && result.pesoPet != undefined && result.pesoPet != null && result.pesoPet != "") {
                if (result.racaPet != "" && result.racaPet != undefined && result.racaPet != null) {
                    if (result.CPF != "" && result.CPF != null && result.CPF != undefined && validador.validaCpf(result.CPF)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
function validaExcluir(result){
    console.log("valdaExcluir");
    console.log(result);
    if (result.CPF != "" && result.CPF != null && result.CPF != undefined && validador.validaCpf(result.CPF)) {
        if (result.nomePet != "" && result.nomePet != undefined && result.nomePet != null) {
            return true;
        }
    }
    return false;
}

function validaAtt(result) {
    console.log("Entrou validaAtt");
    console.log(result);
    if (result.nomePet != "" && result.nomePet != undefined && result.nomePet != null) {
        console.log("entrou nome");
        if (result.especie != "" && result.especie != undefined && result.especie != null) {
            console.log("entrou especie");
            if (result.peso > 0 && result.peso != undefined && result.peso != null && result.peso != "") {
                console.log("passou peso");
                if (result.raca != "" && result.raca != undefined && result.raca != null) {
                    console.log("passou raca");
                    return true;
                }
            }
        }
    }
    return false;
}

module.exports={
    validaAdd, validaExcluir, validaAtt
}