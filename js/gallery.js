import { imageModal } from "/js/img-modal.js";

const galleryUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/media?per_page=21&_embed";
const miniImages = document.querySelector(".mini-images-container");
miniImages.innerHTML = `<div class="loader"></div>`;

//GET IMAGES
async function getImages() {
    const response = await fetch(galleryUrl);
    const imgJson = await response.json();

    try {

        miniImages.innerHTML = "";
        for(let i = 0; i < imgJson.length; i++) {
            
            miniImages.innerHTML += `<img class="mini-img" src="${imgJson[i].source_url}" alt="${imgJson[i].alt_text}">`;
            };

            //IMPORT imageModal
            let targetImages = document.querySelectorAll(".mini-images-container > img");
            imageModal(targetImages);

    } catch(error) {

        console.log(error);
        miniImages.innerHTML += "Sorry, could not load content";
    };
};

getImages();