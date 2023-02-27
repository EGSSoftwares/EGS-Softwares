const express = require('express');
const servicocrtl = require("../Controller/PetController");
const router=express.Router();

router.get("/controle_servico.html", servicocrtl.telaControle);
router.get("/cadastra_servico.html", servico.sendCadastro);
router.post("addServico", servico.addServico);

module.exports=router;

