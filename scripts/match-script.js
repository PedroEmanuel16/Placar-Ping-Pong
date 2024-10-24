verifyLogin('../../index.html');

btnSair('../../index.html');

let btnCancel = document.querySelector('#cancelMatch');
let btnMarkPointPlayer = document.querySelector('#markPointPlayer');
let btnMarkPointOpponent = document.querySelector('#markPointOpponent');
let pointsPlayer = document.querySelector('#pointsPlayer');
let pointsOpponent = document.querySelector('#pointsOpponent');
let pointsPlayerNumber = document.querySelector('#pointsPlayerNumber');
let pointsOpponentNumber = document.querySelector('#pointsOpponentNumber');
let player = document.querySelector('#player');
let opponent = document.querySelector('#opponent');
let audioPoint = document.querySelector('.audioPoint');
let btnVoltar = document.querySelector('#btnVoltar');
let matches = localStorage.getItem('matches');
let textoFala = '';
let flipedPlayer = false;
let flipedOpponent = false;

let dataMatch = localStorage.getItem('currentMatch');
dataMatch = dataMatch.split(',');

setInterval(() => {
    let lastPoint = localStorage.getItem('lastPoint');
    dataMatch1 = localStorage.getItem('currentMatch')

    if(lastPoint != null){
        if(lastPoint == 'player' && (Number(dataMatch[3]) <= 0 )){
            btnVoltar.disabled = false;
        } else if (lastPoint == 'opponent' && (Number(dataMatch[4]) <= 0)){
            btnVoltar.disabled = false;
        }
        btnVoltar.disabled = false;
    }
}, 1000);

let username = localStorage.getItem('currentUser');

player.textContent = username;
opponent.textContent = dataMatch[0];
pointsPlayerNumber.textContent = dataMatch[3];
pointsOpponentNumber.textContent = dataMatch[4];

function voltarPonto(){
    let lastPoint = localStorage.getItem('lastPoint');

    if (lastPoint == 'player'){
        dataMatch[3] = dataMatch[3] - 1;
        localStorage.setItem('currentMatch', dataMatch);

        if (!flipedPlayer) {
            pointsPlayer.style.transform = 'rotate3d(10, 1, 0, 180deg)';
            setTimeout(() => {
                pointsPlayerNumber.textContent = dataMatch[3];
                pointsPlayerNumber.style.transform = 'rotateY(180deg)';
                pointsPlayerNumber.style.transform = 'rotateX(180deg)';
            }, 300)
        } else {
            pointsPlayer.style.transform = 'rotate3d(5, 1, 0, 360deg)';
            setTimeout(() => {
                pointsPlayerNumber.textContent = dataMatch[3];
                pointsPlayerNumber.style.transform = 'rotateX(0deg)';
            }, 300)
        }
        flipedPlayer = !flipedPlayer;
    } else {
        dataMatch[4] = dataMatch[4] - 1;
        localStorage.setItem('currentMatch', dataMatch);

        if (!flipedOpponent) {
            pointsOpponent.style.transform = 'rotate3d(10, 1, 0, 180deg)';
            setTimeout(() => {
                pointsOpponentNumber.textContent = dataMatch[4];
                pointsOpponentNumber.style.transform = 'rotateY(180deg)';
                pointsOpponentNumber.style.transform = 'rotateX(180deg)';
            }, 300)
        } else {
            pointsOpponent.style.transform = 'rotate3d(5, 1, 0, 360deg)';
            setTimeout(() => {
                pointsOpponentNumber.textContent = dataMatch[4];
                pointsOpponentNumber.style.transform = 'rotateX(0deg)';
            }, 300)
        }

        flipedOpponent = !flipedOpponent;
    }
}

function init() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    speech = new SpeechRecognition();
    speech.interimResults = false; // Mude para false para evitar resultados intermediários
    speech.lang = 'pt-BR';

    speech.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        if (e.results[e.resultIndex].isFinal) { // Verifica se o resultado é final
            if((transcript.includes('voltar ponto'))){
                voltarPonto();
                textoFala = ''
            }

            textoFala += transcript + ', ';
        }
    });

    speech.addEventListener('end', init); // Reinicia o reconhecimento quando ele termina
    speech.start();
}

init();

btnCancel.addEventListener('click', function () {
    localStorage.removeItem('currentMatch');
    localStorage.removeItem('lastPoint');
    localStorage.setItem('partyCanceled', 'true');

    window.location.replace('../Home/index.html');
});

btnVoltar.addEventListener('click', voltarPonto)

btnMarkPointPlayer.addEventListener('click', function () {
    localStorage.setItem('lastPoint', 'player');
    audioPoint.play();
    dataMatch[3] = Number(dataMatch[3]) + 1;
    localStorage.setItem('currentMatch', dataMatch);

    if ((dataMatch[3] >= dataMatch[1] && dataMatch[3] - 1 != dataMatch[4] && dataMatch[4] - 1 != dataMatch[3] && dataMatch[3] != dataMatch[4]) || (dataMatch[4] >= dataMatch[1] && dataMatch[4] - 1 != dataMatch[3] && dataMatch[3] - 1 != dataMatch[4] && dataMatch[3] != dataMatch[4])) {
        dataMatch[2] = 'win';

        if (matches) {
            matches = matches.split('.');

                matches[matches.length] = dataMatch;
                matches = matches.join('.');    

        } else {
            matches = dataMatch;
        }

        localStorage.setItem('matches', matches);
        localStorage.setItem('statusMatch', 'win');
        localStorage.removeItem('lastPoint');
        localStorage.removeItem('currentMatch');

        window.location.replace('finished.html');
    }

    if (!flipedPlayer) {
        pointsPlayer.style.transform = 'rotate3d(10, 1, 0, 180deg)';
        setTimeout(() => {
            pointsPlayerNumber.textContent = dataMatch[3];
            pointsPlayerNumber.style.transform = 'rotateY(180deg)';
            pointsPlayerNumber.style.transform = 'rotateX(180deg)';
        }, 300)
    } else {
        pointsPlayer.style.transform = 'rotate3d(5, 1, 0, 360deg)';
        setTimeout(() => {
            pointsPlayerNumber.textContent = dataMatch[3];
            pointsPlayerNumber.style.transform = 'rotateX(0deg)';
        }, 300)
    }

    flipedPlayer = !flipedPlayer;

})

btnMarkPointOpponent.addEventListener('click', function () {
    localStorage.setItem('lastPoint', 'opponent');

    audioPoint.play();
    dataMatch[4] = Number(dataMatch[4]) + 1;
    localStorage.setItem('currentMatch', dataMatch);

    if ((dataMatch[3] >= dataMatch[1] && dataMatch[3] - 1 != dataMatch[4] && dataMatch[4] - 1 != dataMatch[3] && dataMatch[3] != dataMatch[4]) || (dataMatch[4] >= dataMatch[1] && dataMatch[4] - 1 != dataMatch[3] && dataMatch[3] - 1 != dataMatch[4] && dataMatch[3] != dataMatch[4])) {
        dataMatch[2] = 'lose';

        if (matches) {
            matches = matches.split('.');


                matches[matches.length] = dataMatch;
                matches = matches.join('.');    


        } else {
            matches = dataMatch;
        }

        localStorage.setItem('matches', matches);
        localStorage.setItem('statusMatch', 'lose');
        localStorage.removeItem('currentMatch');
        localStorage.removeItem('lastPoint');

        window.location.replace('finished.html')
    }

    if (!flipedOpponent) {
        pointsOpponent.style.transform = 'rotate3d(10, 1, 0, 180deg)';
        setTimeout(() => {
            pointsOpponentNumber.textContent = dataMatch[4];
            pointsOpponentNumber.style.transform = 'rotateY(180deg)';
            pointsOpponentNumber.style.transform = 'rotateX(180deg)';
        }, 300)
    } else {
        pointsOpponent.style.transform = 'rotate3d(5, 1, 0, 360deg)';
        setTimeout(() => {
            pointsOpponentNumber.textContent = dataMatch[4];
            pointsOpponentNumber.style.transform = 'rotateX(0deg)';
        }, 300)
    }

    flipedOpponent = !flipedOpponent;
})