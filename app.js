let numeroLimite = 0;
let numeroSecreto = 0;
let listaDeNumerosSorteados = [];
let tentativas = 1;
let campos = document.getElementById('ctnCampos');
campos.style.display = "none";
function visualizacaoDificuldade(){
    let dificuldade = document.getElementById("ctnDificuldade");
    
    let display = dificuldade.style.display;
    if(display == "none"){
        dificuldade.style.display = "inline";
        campos.style.display = "none";
    }
    else{
        dificuldade.style.display = "none";
        campos.style.display = "block";
    }
}
function iniciarJogo(){
    document.getElementById('btnChute').removeAttribute('disabled');
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
    visualizacaoDificuldade();
}

function escolheDificuldade(){
    let dificuldade = document.querySelector('input[name=radioDificuldade]:checked').value;
    if(dificuldade == "facil"){
        numeroLimite = 10;
    }
    else if (dificuldade == "medio"){
        numeroLimite = 100;
    }
    else{
        numeroLimite = 1000;
    }
    iniciarJogo();
    //reiniciarJogo();
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    let numeroNoTexto = numeroLimite > 0 ? numeroLimite: "...";
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroNoTexto}`);
}

function verificarChute() {
    let chute = document.getElementById('txtChute').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.getElementById('txtChute');
    chute.value = '';
}

function reiniciarJogo() {
    //numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    visualizacaoDificuldade();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}