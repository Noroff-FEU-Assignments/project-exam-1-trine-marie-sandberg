import { imageModal } from "/js/img-modal.js";
const galleryUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/media";

let miniImages = document.querySelector(".mini-images-container");
miniImages.innerHTML = "<p>Loading . . .</p>";
const imgPopupModal = document.querySelector(".image-popup");

async function getImages() {
    const response = await fetch(galleryUrl);
    const imgJson = await response.json();

    try {

        miniImages.innerHTML = "";
        for(let i = 0; i < imgJson.length; i++) {
            
            miniImages.innerHTML += `<img class="mini-img" src="${imgJson[i].source_url}">`;
            };

            let targetImages = document.querySelectorAll(".mini-images-container > img");
            console.log(targetImages)
        imageModal(targetImages);

    } catch(error) {

        console.log(error)
    };
};

getImages();

// function imageModal() {

//     const imgPopup = document.querySelector(".image-popup");

//     targetPostImages.forEach( img => 
//         img.addEventListener("click", imgModal));

//         function imgModal() {

//             imgPopup.style.display="block";

//             try {

//                 //OPEN MODAL
//                 let clickedImage = this;
//                 console.log(this)
//                 console.log(clickedImage)

//                 let targetPostImagesUrl = clickedImage.getAttribute("src");
//                 let targetPostImageAltText = clickedImage.getAttribute("alt");

//                 imgPopupModal.innerHTML = `<i class="fa-solid fa-x cansel-x"></i>
//                                                <img src="${targetPostImagesUrl}" class="auto-img modal-img" alt="${targetPostImageAltText}">`;

//                 //CLOSE MODAL (with button)
//                 const canselX = document.querySelector(".cansel-x");

//                 function closeModal() {
                    
//                     imgPopupModal.style.display = "none";
//                 };

//                 canselX.addEventListener("click", closeModal);

//                 //CLOSE MODAL (click outside of div)
//                 window.addEventListener('mouseup',function(event){

//                     if(event.target != imgPopupModal && event.target.parentNode != imgPopupModal){
//                         imgPopupModal.style.display = 'none';
//                     }
//               }); 

//             } catch(error) {
//                 console.log(error);
//                 imgModalContainer.innerHTML = "cant load img";
//             };
//         };                
// };