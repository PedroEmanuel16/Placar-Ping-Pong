verifyLogin('../../index.html');

btnSair('../../index.html');

let btnVoltar = document.querySelector('#btnVoltar');
let aviso = document.querySelector('.aviso');
let partidasJogadas = document.querySelector('.partidasJogadas');
let partidasVencidas = document.querySelector('.partidasVencidas');
let partidasPerdidas = document.querySelector('.partidasPerdidas');
let matches = localStorage.getItem('matches');

btnVoltar.addEventListener('click', function(){
    window.history.back();
})

if(localStorage.getItem('matches') == null){
    aviso.textContent = 'Nenhuma partida jogada'
} else {
    matches = matches.split('.');
    matchesWin = matches.filter(match => match.includes("win")).length;
    matchesLose = matches.filter(match => match.includes("lose")).length;

    partidasJogadas.textContent = 'Você Jogou: ' + matches.length + (matches.length === 1 ? ' partida' : ' partidas');
    partidasVencidas.textContent = 'Você Ganhou: ' + matchesWin + (matchesWin === 1 ? ' partida' : ' partidas');
    partidasPerdidas.textContent = 'Você Perdeu: ' + matchesLose + (matchesLose === 1 ? ' partida' : ' partidas');
}