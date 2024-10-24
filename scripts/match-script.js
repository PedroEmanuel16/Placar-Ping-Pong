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
let matches = localStorage.getItem('matches');
let flipedPlayer = false;
let flipedOpponent = false;

let dataMatch = localStorage.getItem('currentMatch');
dataMatch = dataMatch.split(',');

let username = localStorage.getItem('currentUser');

player.textContent = username;
opponent.textContent = dataMatch[0];
pointsPlayerNumber.textContent = dataMatch[3];
pointsOpponentNumber.textContent = dataMatch[4];

btnCancel.addEventListener('click', function () {
    localStorage.removeItem('currentMatch');
    localStorage.setItem('partyCanceled', 'true');

    window.location.replace('../Home/index.html');
});

btnMarkPointPlayer.addEventListener('click', function () {
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