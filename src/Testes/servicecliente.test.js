const service = require('../Service/service_cliente');
test('testa campos validos', ()=>{
    const result = {
        nomePessoa: "Teste",
        tel: "123456789",
        bairro: "Dona odete",
        num: 25,
        rua:"maria da gloria",
        cid: "Lavras",
        CPF: "12101178605"
    }
    expect(service.addCliente(result)).toBe(true);
});
