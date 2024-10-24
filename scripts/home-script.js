verifyLogin('../../index.html');

btnSair('../../index.html'); 

let formInit = document.querySelector('#iniciarForm');
let adversarios = localStorage.getItem('opponents');
let btnIniciar = document.querySelector('#btnIniciar');
let btnEstatisticas = document.querySelector('#btnEstatisticas');
let textoFala = '';

if(localStorage.getItem('addedOpponent')){
    Swal.fire({
        icon: "success",
        title: "Adversário cadastrado com sucesso",
    });

    localStorage.removeItem('addedOpponent');
}

if(localStorage.getItem('partyCanceled')){
    Swal.fire({
        icon: "success",
        title: "Partida cancelada com sucesso",
    });

    localStorage.removeItem('partyCanceled');
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
            opponents = adversarios.split(',');

            opponents.forEach(opponent => {
                if((transcript.includes('iniciar com ' + opponent) || transcript.includes('iniciar partida com ' + opponent))){
                    alert('aeeeeeeeee');
                    textoFala = '';
                }
            });

            textoFala += transcript + ', ';
        }
    });
    

    speech.addEventListener('end', init); // Reinicia o reconhecimento quando ele termina
    speech.start();
}

init();

btnEstatisticas.addEventListener('click', function(){
    window.location.replace('../Statistics/index.html');
});

btnIniciar.addEventListener('click', function(){
    if(!adversarios){
        Swal.fire({
            icon: "error",
            title: "Nenhum adversário cadastrado",
            html: "<h1 class='fs-3'>Cadastre primeiro algum adversário!</h1>",
          });
    } else{
        btnIniciar.setAttribute('data-bs-target', '#iniciarPartida');
        btnIniciar.click();
    }
})

formInit.addEventListener('submit', (e) => {
    e.preventDefault();

    let opponent = document.querySelector('#opponent');
    let points = document.querySelector('#points');

    let currentMatch = [opponent.value, points.value, 'pending', '0', '0']

    localStorage.setItem('currentMatch', currentMatch);

    window.location.replace('../Match/index.html');
})

let formAdd = document.querySelector('#adicionarForm')

formAdd.addEventListener('submit', (e) => {
    e.preventDefault();

    let opponent = document.querySelector('#opponentRegister');

    if(localStorage.getItem('opponents') !== null){
        let opponentsPrevious = localStorage.getItem('opponents');

        localStorage.setItem('opponents', opponentsPrevious + "," + (opponent.value).trim());
    } else {
        localStorage.setItem('opponents', (opponent.value).trim());
    }

    window.location.reload();
    localStorage.setItem('addedOpponent', 'true');
})