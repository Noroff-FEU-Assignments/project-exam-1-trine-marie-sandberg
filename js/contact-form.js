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

const submitForm = document.querySelector(".contact-form");
const success = document.querySelector(".success-message");

//CONTACT FORM VALIDATION
function formValidation(submit) {
    
    submit.preventDefault();

    inputLengthValidation(name, 5, nameError);
    inputLengthValidation(subject, 15, subjectError);
    inputLengthValidation(message, 25, messageError);
    
    if (emailValidation(email.value) === true) {
        
        emailError.style.display = "none";
    } else {
        
        email.value.trim().length === 0 ? emailError.style.display = "none" : emailError.style.display = "block";

    } if (nameError.style.display === "none" && subjectError.style.display === "none" && emailError.style.display === "none") {
        
        success.style.display = "block";
        name.value = "";
        email.value = "";
        subject.value = "";
        message.value = "";
    };
};

submitForm.addEventListener("submit", formValidation);