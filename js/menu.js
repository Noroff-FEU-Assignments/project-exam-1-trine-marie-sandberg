const hamburger = document.querySelector(".hamburger-icon");
const cancelMenuX = document.querySelector(".cancel-menu");
const topNav = document.querySelector(".top-nav");

//OPEN HAMBURGER MENU
function mobileMenu() {

    cancelMenuX.style.display = "block";
    hamburger.style.display = "none";
    topNav.style.display = "block";

};

hamburger.addEventListener("click", mobileMenu);

//CLOSE HAMBURGER MENU
function cancelMenu() {

    cancelMenuX.style.display = "none";
    hamburger.style.display = "block";
    topNav.style.display = "none";
};

cancelMenuX.addEventListener("click", cancelMenu);

//CURRENT PAGE INDICATOR (underline)
const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a");
const underline = document.querySelector(".nav-underline");

navLinks.forEach(link => {

    if(link.href.includes(`${currentPage}`)) {
        
        link.classList.add("nav-underline");
    };
    
});