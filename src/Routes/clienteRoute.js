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

router.get("/cadastrar_clientes.html", clientecrtl.sendTelaCadCliente)
router.get('/controle_cliente.html', clientecrtl.sendTelaCrtlCliente)


router.post('/addCliente', clientecrtl.addCliente)

router.get('/excluir_cliente.html', clientecrtl.sendTelaExcluir)

router.post('/excluirClientePorCpf', clientecrtl.sendTelaExcluir2)

router.post('/deleteCliente', clientecrtl.deleteCliente)  

router.get('/pagina_buscar_cliente.html', clientecrtl.sendTelaBuscarCliente)

router.post('/exibirCliente', clientecrtl.mostrarClientes)

router.get('/inicio', clientecrtl.sendInicio)


router.get('/solicitar_cpf.html', clientecrtl.solicitarCpf)

router.post('/atualizar_cliente.ejs', clientecrtl.formattCliente)

router.post('/attcliente', clientecrtl.attCliente )



module.exports = router;
