//import { gallerySlideShow } from "/js/gallery-slide-show.js";
//gallerySlideShow();
const galleryUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/media";

let miniImages = document.querySelector(".mini-images-container");
miniImages.innerHTML = "<p>Loading . . .</p>";

async function getImages() {
    const response = await fetch(galleryUrl);
    const imgJson = await response.json();
    console.log(imgJson)

    try {
        miniImages.innerHTML = "";
        for(let i = 0; i < imgJson.length; i++) {
            
            miniImages.innerHTML += `<img class="mini-img" src="${imgJson[i].source_url}">`
        }
    } catch(error) {
        console.log(error)
    }
}
getImages();