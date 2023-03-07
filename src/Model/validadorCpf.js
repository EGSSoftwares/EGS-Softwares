
function validaCpf( cpf){ // função para validar o cpf
    if(cpf!="" && cpf!=null && cpf!=undefined && cpf.length==11){
        let x= 0;
        let i, j;
        for(i=0, j= 10 ; i<9; i++, j-- ){
            x+=Number(cpf.charAt(i))*j;
        }
        let resto = (x*10)%11;
        if(resto == 10){
            resto=0;
        }
        sentinela = (Number(cpf.charAt(9))== resto);
        if(sentinela){
            x=0;
            for(let i=0, j=11; i<10; i++, j-- ){
                x+=Number(cpf.charAt(i))*j;
            }
            resto = (x*10)%11;
            if(resto==10){
                resto=0;
            }
            return resto == cpf.charAt(10);
        }
    }
    return false;
}
//console.log(validaCpf("23186525543"));
module.exports= { validaCpf}