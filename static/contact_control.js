var menu = document.querySelector(".menu");
var login_btn = document.getElementById("login");


// for getting back our login button opacity
menu.addEventListener('animationend',animation_end);
function animation_end(){
    login_btn.style.opacity = 1;
}
