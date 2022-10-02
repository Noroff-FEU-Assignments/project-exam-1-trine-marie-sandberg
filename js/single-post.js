import { imageModal } from "/js/img-modal.js";
import { addComment } from "/js/add-comment.js";
import { displayComments } from "/js/display-comments.js";
import { inputLengthValidation, emailValidation } from "/js/form-functions.js";

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");

const singlePostContainer = document.querySelector(".single-post-container");
const aboutAuthorContainer = document.querySelector(".about-author");
const postContentContainer = document.querySelector(".single-post-content-container");
singlePostContainer.innerHTML = `<div class="loader"></div>`;

let singlePostUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts/" + id + "?_embed";

//DISPLAY POST
async function getSinglePost() {

    try {

        const getPost = await fetch(singlePostUrl);
        const postJson = await getPost.json();

        try {

            singlePostContainer.innerHTML = "";
            singlePostContainer.innerHTML += `<img src="${postJson._embedded['wp:featuredmedia'][0].source_url}" alt="${postJson._embedded['wp:featuredmedia'][0].alt_text}" class="featured-img">`;
            document.title = `${postJson.title.rendered} - Post`;

        } catch(error) {

            singlePostContainer.innerHTML += `<div class="featured-img-placeholder">
                                                 <img src="/img/cofee.jpg" class="auto-img" alt="abstract image of shattered pieces in soft pastell colours">
                                                 <h2 class="featured-img-placeholder-text header-special">Sorry, could not load content</h2>
                                              </div>`;
        };

        aboutAuthorContainer.innerHTML = `<div class="flex-wrap">
                                             <p>${postJson.date}</p>
                                             <p>Written by ${postJson._embedded.author[0].name}</p>
                                          </div>
                                          <h1>${postJson.title.rendered}</h1>
                                          <p>${postJson.excerpt.rendered}</p>`;

        postContentContainer.innerHTML = `<div>${postJson.content.rendered}</div>`;

        //IMPORTING MODAL FOR BIGGER IMG
        const targetModalImages = document.querySelectorAll("figure > img, .wp-block-cover > img");
        imageModal(targetModalImages);

        const removeEmojis = document.querySelector(".booster-reactions-block");
        removeEmojis.style.display ="none";

    } catch(error) {
        
        console.log(error)
    };
};

getSinglePost();

addComment();

//FORM VALIDATION
const submitForm = document.querySelector(".add-comment-btn");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const message = document.querySelector(".message");

const nameError = document.querySelector(".name-error");
const emailError = document.querySelector(".email-error");
const messageError = document.querySelector(".message-error");

function formValidation() {

    inputLengthValidation(name, 1, nameError);
    inputLengthValidation(message, 2, messageError);
    
    if (emailValidation(email.value) === true) {
        
        emailError.style.display = "none";

    } if(email.value.length === 0) {

        emailError.style.display = "block";

    } if (nameError.style.display === "none" && emailError.style.display === "none" && messageError.style.display === "none") {
        
        name.value = "";
        email.value = "";
        message.value = "";
    };
};

submitForm.addEventListener("click", formValidation);

displayComments();