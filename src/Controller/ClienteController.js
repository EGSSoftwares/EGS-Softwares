
function sendcss(req, res){
    res.sendFile('/src/view/style.css', {root: '..'});
}
function sendlogo (req, res){
    res.sendFile('/src/view/logo.jpg', {root: '..'});
}

function sendTelaSucesso (req, res)  {      //tela de sucesso
    res.sendFile('/src/view/tela_sucesso.html', { root: '..' });
}
function sendTelaErro (req, res)  {        //tela de erro
    res.sendFile('/src/view/tela_erro.html', { root: '..' });
}

function sendTelaCrtlCliente (req, res)  {     //tela do crud de cliente
    res.sendFile('/src/view/controle_cliente.html', { root: '..' });
    console.log("entrou controle");
}

function sendTelaCadCliente (req, res) {   //cadastrando clientes
    res.sendFile('/src/view/cadastrar_clientes.html', { root: '..' });  //envia formulario
    console.log("entrou cadastrar_cliente");
}

async function addCliente (req, res) {
    console.log("entrou add cliente");
    const result = req.body;
    console.log(result);
    if (result != null) {
        try{
            cliente.addCliente(result);
        }catch(erro){
            console.log("entrou no catch add cliente app.js");
            res.redirect('/src/view/tela_erro.html'); 
        }
        res.redirect('/src/view/tela_sucesso.html'); 
    }
}

function sendTelaExcluir (req, res) {
    res.sendFile('/src/view/excluir_cliente.html', { root: '..' });
    console.log("entrou no excluir cliente");
}

var lastpkpessoa=-1;
async function sendTelaExcluir2 (req, res)  {

    clientefordelete= await cliente.cliente.findAll( { where: {CPF: req.body.CPF }});
    lastpkpessoa= clientefordelete.idPessoa;
    res.render('../../view/mostrar_cliente', {cliente: clientefordelete[0] });
}

async function deleteCliente (req, res) {
    try {
        cliente.excluirCliente(req.body.pkpessoa);
        lastpkpessoa=-1;
        res.redirect("/view/tela_sucesso.html");
    } catch (error) {
        res.redirect("/view/tela_erro.html");
    }
}

function sendTelaBuscarCliente (req, res)  {
    res.sendFile('/src/view/pagina_buscar_cliente.html', { root: '..' });  //pega nome de cliente no form
}

async function mostrarClientes (req, res) {
    var procura = null;
    try {
        await db.sync;
        console.log("Entrou no exibirCliente");
        procura = await cliente.cliente.findAll({ where: { nomePessoa: req.body.nomePessoa } }); //faz select
    } catch (err) {
        res.redirect('/view/tela_erro.html');
    }
    console.log(procura);
    if (procura != null) {
        res.render("../../view/informacoes_cliente", { pessoas: procura }); //exibe clientes com o nome
    }
}

function solicitarCpf  (req, res)  {
    res.sendFile('/src/view/solicitar_cpf.html', { root: '..' })  //solicita cpf
}

async function formattCliente (req, res)  {
    const procura = await cliente.cliente.findAll({ where: { CPF: req.body.CPF } });
    console.log(procura);
    const pessoa = {
        nomePessoa: procura[0].nomePessoa,
        num: procura[0].Numero,
        tel: procura[0].Telefone,
        bai: procura[0].Bairro,
        log: procura[0].Logradouro,
        cpf: procura[0].CPF,
        cid: procura[0].Cidade
    }
    lastpkpessoa = procura[0].idPessoa;
    res.render("../../view/atualizar_cliente", { pessoa: pessoa });//gera formulario preenchido
}
 async function attCliente (req, res) {
    try {
        cliente.attCliente(lastpkpessoa, req);
        res.redirect("view/tela_sucesso.html");
    } catch (error) {
        res.redirect("view/tela_erro.html");
    }
        
}

module.exports = { attCliente, formattCliente,  solicitarCpf, mostrarClientes, sendTelaBuscarCliente, deleteCliente,
    sendTelaExcluir2, addCliente, sendTelaExcluir, sendTelaCadCliente, sendTelaCrtlCliente, sendTelaErro,
    sendTelaSucesso, sendcss, sendlogo}