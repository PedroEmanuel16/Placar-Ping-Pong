let form = document.querySelector('#loginForm');

if(localStorage.getItem('authenticate') == 'true'){
    window.location.replace('Pages/Home/index.html');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let userName = ((document.querySelector('#name')).value).trim();
    let userPassword = ((document.querySelector('#password')).value).trim();
    userName = (userName.split(' '))[0];

    if((userName).toLowerCase() + "," + (userPassword).toLowerCase() == localStorage.getItem('dataUser')){
        login((userName).charAt(0).toUpperCase() + (userName).slice(1));

        window.location.replace('Pages/Home/index.html');
    } else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: "<h1 class='fs-3'>Dados incorretos!</h1>",
          });
    }
})