const express = require('express');
const servicocrtl = require("../Controller/servicoController");
const router=express.Router();

router.get("/", servicocrtl.telaControle);
router.get("/cadastrar_servico.html", servicocrtl.sendCadastro);
router.post("/addServico", servicocrtl.addServico);
router.get('/excluir', servicocrtl.sendExcluir);
router.post("excluir_servico.ejs", servicocrtl.sendExcluirejs);
router.get("/visualizar", servicocrtl.sendVisualizar);
router.post("atualizar_servico.ejs", servicocrtl.sendVisualizarejs );
router.get("/alterar", servicocrtl.sendAlterar);
router.post("/attServico", servicocrtl.attServico);
module.exports=router;

