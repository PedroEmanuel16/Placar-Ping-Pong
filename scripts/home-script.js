verifyLogin('../../index.html');

btnSair('../../index.html'); 

let formInit = document.querySelector('#iniciarForm');
let adversarios = localStorage.getItem('opponents');
let btnIniciar = document.querySelector('#btnIniciar');

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

    if(localStorage.getItem('matches') !== null){
        let matchesPrevious = localStorage.getItem('matches');

        localStorage.setItem('matches', matchesPrevious + "." + currentMatch);
    } else {
        localStorage.setItem('matches', currentMatch);
    }

    window.location.replace('../Match/index.html');
})

let formAdd = document.querySelector('#adicionarForm')

formAdd.addEventListener('submit', (e) => {
    e.preventDefault();

    let opponent = document.querySelector('#opponentRegister');

    if(localStorage.getItem('opponents') !== null){
        let opponentsPrevious = localStorage.getItem('opponents');

        localStorage.setItem('opponents', opponentsPrevious + "," + opponent.value);
    } else {
        localStorage.setItem('opponents', opponent.value);
    }

    window.location.reload();
})