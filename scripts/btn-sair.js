function btnSair(url){
    let btnSair = document.querySelector('#sair');

    btnSair.addEventListener('click', function(){
        logout();
    
        window.location.replace(url);
    })
}