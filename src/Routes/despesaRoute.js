const express = require('express');
const despCtrl = require("../Controller/DespesaController");

const router=express.Router();
// ROTAS DESPESA
router.get('/style.css', despCtrl.sendcss)
router.get('/imagens/logo.jpg', despCtrl.sendlogo)

router.get('/', despCtrl.sendTelaDataDespesa)
router.get("/despesa", despCtrl.sendTelaDataDespesa)
router.post("/exibirDespesa.ejs", despCtrl.exibirDespesa)

module.exports = router
