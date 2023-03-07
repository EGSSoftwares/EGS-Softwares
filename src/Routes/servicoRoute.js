const express = require('express');
const servicocrtl = require("../Controller/servicoController");
const router=express.Router();

//ROTAS SERVIÇO
router.get("/", servicocrtl.telaControle);
router.get('/controle_serviço.html', servicocrtl.telaControle)

router.get("/cadastrar_servico.html", servicocrtl.sendCadastro);
router.post("/addServico", servicocrtl.addServico);
router.get('/excluir_servico_pela_data.html', servicocrtl.sendExcluir);
router.post("/excluir_servico.ejs", servicocrtl.sendExcluirejs);
router.get("/visualizar_servico1.html", servicocrtl.sendVisualizar);
router.post("/visualizar_servico2.ejs", servicocrtl.sendResultVisualizar);
//router.get("/gerenciamento.html", servicoctrl.sendGerenciamento);

router.post("/atualizar_servico.ejs", servicocrtl.attejs);
router.get("/alterar_servico_pela_data.html", servicocrtl.sendBuscasAlterar);
router.post("/deleteServico", servicocrtl.deleteServico);
router.post("/visualizarServico", servicocrtl.sendResultVisualizar);
router.post("/attServico", servicocrtl.attServico);
//router.post("/attServico", servicocrtl.attServico);
module.exports=router;

