verifyLogin('../../index.html');

btnSair('../../index.html');

let btnVoltar = document.querySelector('#btnVoltar');
let aviso = document.querySelector('.aviso');
let partidasJogadas = document.querySelector('.partidasJogadas');
let partidasVencidas = document.querySelector('.partidasVencidas');
let partidasPerdidas = document.querySelector('.partidasPerdidas');
let taxaVitoria = document.querySelector('.taxaDeVitoria');
let fraseMotivacionalh2 = document.querySelector('.fraseMotivacional');
let corpoTabela = document.querySelector('.corpo-tabela');
let matches = localStorage.getItem('matches');
let matchesWin = 0;
let matchesLose = 0;
let percentualVitorias = 0;

btnVoltar.addEventListener('click', function(){
    window.history.back();
})

if(localStorage.getItem('matches') == null){
    aviso.textContent = 'Nenhuma partida jogada'
} else {
    matches = matches.split('.');
    matchesWin = matches.filter(match => match.includes("win")).length;
    matchesLose = matches.filter(match => match.includes("lose")).length;
    percentualVitorias = ((matchesWin / matches.length) * 100).toFixed(2);
    let fraseMotivacional = '';
    if (percentualVitorias == 100){
        fraseMotivacional = 'Não fez mais que sua obrigação'
    } else if(percentualVitorias == 0){
        fraseMotivacional = 'Campeão das Derrotas!';
    } else if(percentualVitorias <= 50){
        fraseMotivacional = 'Vitórias? Um dia chegaremos lá!';
    } else if(percentualVitorias <= 75){
        fraseMotivacional = 'Não fique triste, já vi piores';
    } else if(percentualVitorias <= 99){
        fraseMotivacional = 'O que é derrota? Não conheço!';
    }

    partidasJogadas.innerHTML = 'Você <span class="text-secondary">Jogou</span>: ' + matches.length + (matches.length === 1 ? ' partida' : ' partidas');
    partidasVencidas.innerHTML = '<span class="text-success">Ganhou:</span> ' + matchesWin + (matchesWin === 1 ? ' partida' : ' partidas');
    partidasPerdidas.innerHTML = '<span class="text-danger">Perdeu:</span> ' + matchesLose + (matchesLose === 1 ? ' partida' : ' partidas');
    taxaVitoria.innerHTML = '<span class="text-info">Percentual de Vitórias:</span> ' + percentualVitorias + '%';
    fraseMotivacionalh2.innerHTML = '<span class="text-warning">' + fraseMotivacional + '</span>';

    matches.forEach(match => {
        match = match.split(',');
        let novaLinha = document.createElement('tr');

        let celulaOponente = document.createElement('td');
        celulaOponente.textContent = match[0];
        let celulaPlacar = document.createElement('td');
        celulaPlacar.textContent = match[3] + ' - '+ match[4];
        let celulaEstado = document.createElement('td');
        celulaEstado.innerHTML = match[2] == 'win' ? '<span class="text-success">Vitória</span>' : '<span class="text-danger">Derrota</span>';
        let celulaPontosGanhar = document.createElement('td');
        celulaPontosGanhar.textContent = match[1];

        novaLinha.appendChild(celulaOponente);
        novaLinha.appendChild(celulaPlacar);
        novaLinha.appendChild(celulaEstado);
        novaLinha.appendChild(celulaPontosGanhar);

        corpoTabela.appendChild(novaLinha);
    });
}