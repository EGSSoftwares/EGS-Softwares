const express = require('express');
const clientecrtl = require("../Controller/ClienteController");


const router=express.Router();

router.get('/css/style.css', clientecrtl.sendcss)
router.get('/imagens/logo.jpg', clientecrtl.sendlogo)
// CLIENTES
router.get('/view/tela_sucesso.html', clientecrtl.sendTelaSucesso)

router.get("/view/tela_erro.html", clientecrtl.sendTelaErro)

router.get('/view/cliente/controle_cliente.html', clientecrtl.sendTelaCrtlCliente)
router.get('/', clientecrtl.sendTelaCrtlCliente)
//router.post('/view/controle_cliente.html', clientecrtl.sendTelaCrtlCliente)

router.get("/cliente/cadastrar_clientes.html", clientecrtl.sendTelaCadCliente)

router.post('/cliente/ddCliente', clientecrtl.addCliente)

router.get('/cliente/excluir_cliente.html', clientecrtl.sendTelaExcluir)

router.post('/cliente/excluirClientePorCpf', clientecrtl.sendTelaExcluir2)

router.post('/cliente/deleteCliente', clientecrtl.deleteCliente)  

router.get('/cliente/pagina_buscar_cliente.html', clientecrtl.sendTelaBuscarCliente)

router.post('/cliente/exibirCliente', clientecrtl.mostrarClientes)


router.get('/cliente/solicitar_cpf.html', clientecrtl.solicitarCpf)

router.post('/cliente/atualizar_cliente.ejs', clientecrtl.formattCliente)

router.post('/cliente/attCliente', clientecrtl.attCliente )

module.exports = router;
