const express = require('express');
const servicocrtl = require("../Controller/servicoController");
const router=express.Router();

router.get("/", servicocrtl.telaControle);
router.get("/cadastrar_servico.html", servicocrtl.sendCadastro);
router.post("/addServico", servicocrtl.addServico);
router.get('/excluir_servico_pela_data.html', servicocrtl.sendExcluir);
router.post("/excluir_servico.ejs", servicocrtl.sendExcluirejs);
router.get("/visualizar_servico1.html", servicocrtl.sendVisualizar);
router.post("/visualizar_servico2.ejs", servicocrtl.sendVisualizarejs);
//router.get("/gerenciamento.html", servicoctrl.sendGerenciamento);

router.post("atualizar_servico.ejs", servicocrtl.sendVisualizarejs );
router.get("/alterar_servico_pela_data.html", servicocrtl.sendAlterar);
//router.post("/attServico", servicocrtl.attServico);
module.exports=router;

