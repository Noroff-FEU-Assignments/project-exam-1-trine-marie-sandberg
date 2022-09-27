//VALIDATE LENGTH OF INPUT VALUE
export function inputLengthValidation(inputLength, numberRequirement, selectedElement) {
    
    return inputLength.value.trim().length > numberRequirement ? selectedElement.style.display = "none" : selectedElement.style.display = "block";
};

//VALIDATE E-MAIL
export function emailValidation(email) {

    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
};