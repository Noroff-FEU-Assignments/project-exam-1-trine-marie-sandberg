export function postCardButtons() {

    const btn1 = document.querySelector(".round-btn1");
    const btn2 = document.querySelector(".round-btn2");
    const btn3 = document.querySelector(".round-btn3");
    const roundNextBtn = document.querySelector(".round-next-btn");

    roundNextBtn.onclick = function() {
        index ++;
        console.log(index)
    }
};