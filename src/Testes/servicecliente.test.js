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

test('testa campos invalidos, cpf errado', ()=>{
    const result = {
        nomePessoa: "Teste",
        tel: "123456789",
        bairro: "Dona odete",
        num: 25,
        rua:"maria da gloria",
        cid: "Lavras",
        CPF: "12101178633S"
    }
    expect(service.addCliente(result)).toBe(false);
});

test('testa campos invalidos', ()=>{
    const result = {
        nomePessoa: "",
        tel: "",
        bairro: "",
        num: 25,
        rua:"maria da gloria",
        cid: "Lavras",
        CPF: "12101178633S"
    }
    expect(service.addCliente(result)).toBe(false);
    
});

test('testa campos invalidos 2', ()=>{
    const result = {
        nomePessoa: "",
        tel: "",
        bairro: "",
        num: 25,
        rua:"maria da gloria",
        cid: "Lavras",
        CPF: null
    }
    expect(service.addCliente(result)).toBe(false);
});

test('testa campos invalidos, cpf errado', ()=>{
    const result = {
        nomePessoa: "Teste",
        tel: "123456789",
        bairro: "Dona odete",
        num: -25,
        rua:"maria da gloria",
        cid: "Lavras",
        CPF: "12101178605"
    }
    expect(service.addCliente(result)).toBe(false);
});