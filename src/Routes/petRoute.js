const express = require('express');
const petcrtl = require("../Controller/PetController");


const router=express.Router();

router.get('/style.css', petcrtl.sendcss)
router.get('/imagens/logo.jpg', petcrtl.sendlogo)
// pets rroutes
//router.get('/view/tela_sucesso.html', petcrtl.sendTelaSucesso)

//router.get("/view/tela_erro.html", petcrtl.sendTelaErro)

router.get('/', petcrtl.sendTelacrtlPet)
//router.post('/view/controle_cliente.html', clientecrtl.sendTelaCrtlCliente)

router.get('/controle_pet.html', petcrtl.sendTelacrtlPet)


router.get("/cadastrar_pet.html", petcrtl.sendTelaPet)

router.post('/addpet', petcrtl.addPet)

router.get('/excluir_pet.html', petcrtl.sendTelaExcluir)

router.post('/excluipetPorCpf', petcrtl.sendTelaExcluir2)

router.post('/deletePet', petcrtl.deletePet)  

router.get('/visualizar_pet.html', petcrtl.sendTelaBuscarPet)

router.post('/exibirPet', petcrtl.exibirPet)


router.get('/atualizar_pet_pagina_busca.html', petcrtl.solicitarCpfENome)

router.post('/atualizar_pet.ejs', petcrtl.formattPet)

router.post('/attPet', petcrtl.attPet )

module.exports = router