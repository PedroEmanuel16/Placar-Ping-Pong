verifyLogin('../../index.html');

btnSair('../../index.html');

let audioWin = document.querySelector('.audioWin');
let audioLose = document.querySelector('.audioLose');

console.log(localStorage.getItem('statusMatch'))

if(localStorage.getItem('statusMatch') == 'win'){
    audioWin.play();
    localStorage.removeItem('statusMatch');
} else {
    audioLose.play();
    localStorage.removeItem('statusMatch');
}

let btnTelaInicial = document.querySelector('#btnTelaInicial');
let btnRecomecar = document.querySelector('#btnRecomecar')

btnTelaInicial.addEventListener('click', function(){
    window.location.replace('../Home/index.html');
});

btnRecomecar.addEventListener('click', function(){
    let matches = localStorage.getItem('matches');
    let matchesArray = matches.split('.');
    let lastMatch = matchesArray[matchesArray.length - 1];
    lastMatch = lastMatch.split(',');

    let currentMatch = [lastMatch[0], lastMatch[1], 'pending', '0', '0']

    localStorage.setItem('currentMatch', currentMatch);
    
    window.location.replace('index.html');
});