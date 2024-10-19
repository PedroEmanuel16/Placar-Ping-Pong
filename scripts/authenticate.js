function login(user){
    localStorage.setItem('authenticate', 'true');
    localStorage.setItem('currentUser', user);
}

function logout(){
    localStorage.setItem('authenticate', 'false');
    localStorage.removeItem('currentUser');
}

function verifyLogin($caminhoLogin){
    if (localStorage.getItem('authenticate') == 'false'){
        window.location.replace($caminhoLogin);
    }
}