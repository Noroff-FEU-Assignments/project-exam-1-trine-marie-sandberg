const hamburger = document.querySelector(".hamburger-icon");
const cancelMenuX = document.querySelector(".cancel-menu");
const topNav = document.querySelector(".top-nav");

//OPEN HAMBURGER MENU
function mobileMenu() {
    console.log("click")
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