const  validaCpf = require('../Model/validadorCpf');
test('testa cpf valido', ()=>{
    expect(validaCpf.validaCpf("12101178605")).toBe(true);
});

test('testa cpf valido', ()=>{
    expect(validaCpf.validaCpf("12345678911")).toBe(false);
});

test('testa vetor vazio', ()=>{
    expect(validaCpf.validaCpf("[]")).toBe(false);
});

test('testa falso', ()=>{
    expect(validaCpf.validaCpf(false)).toBe(false);
});

test('testa true', ()=>{
    expect(validaCpf.validaCpf(true)).toBe(false);
});

test('testa string vazia', ()=>{
    expect(validaCpf.validaCpf("")).toBe(false);
});


test('testa undefined', ()=>{
    expect(validaCpf.validaCpf(undefined)).toBe(false);
});

