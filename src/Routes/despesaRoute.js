const express = require('express');
const despCtrl = require("../Controller/DespesaController");


const router=express.Router();

router.get('/style.css', despCtrl.sendcss)
router.get('/imagens/logo.jpg', despCtrl.sendlogo)


router.get("/data_despesa.html", despCtrl.sendTelaDataDespesa)

router.get("/exibirDespesa", despCtrl.exibirDespesa)