import { inputLengthValidation, emailValidation } from "/js/form-functions.js";
//ERRORS
const nameError = document.querySelector(".name-error");
const emailError = document.querySelector(".email-error");
const subjectError = document.querySelector(".subject-error");
const messageError = document.querySelector(".message-error");
//INPUTS
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const subject = document.querySelector(".subject");
const message = document.querySelector(".message");

const submitBtn = document.querySelector(".submit-btn");

//CONTACT FORM VALIDATION
    // inputLengthValidation(name, 5, nameError);

    // if (emailValidation(email.value) === true) {

    //     emailError.style.display = "none";
    // }

    // else {

    //     email.value.trim().length === 0 ? emailError.style.display = "none" : emailError.style.display = "block";
    // } 
    function formValidation(event) {

        event.preventDefault();
    };
    formValidation()
    
    submitBtn.addEventListener("submit", formValidation);