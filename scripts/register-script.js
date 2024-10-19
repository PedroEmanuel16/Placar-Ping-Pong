let form = document.querySelector('#registerForm');

if(localStorage.getItem('authenticate') == 'true'){
    window.location.replace('../Home/index.html');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.removeItem('opponents');
    localStorage.removeItem('matches');
    localStorage.removeItem('currentMatch');

    let userName = (((document.querySelector('#name')).value).trim()).toLowerCase();
    let userPassword = (((document.querySelector('#password')).value).trim()).toLowerCase();
    userName = (userName.split(' '))[0];

    let dataUser = [userName, userPassword];

    localStorage.setItem('dataUser', dataUser);

    login((userName).charAt(0).toUpperCase() + (userName).slice(1))

    window.location.replace('/Pages/Home/index.html');
})
