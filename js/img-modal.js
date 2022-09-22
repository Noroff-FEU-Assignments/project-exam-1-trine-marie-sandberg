export function imageModal() {

    const targetPostImages = document.querySelectorAll("figure > img");
    
    const imgModalContainer = document.querySelector(".image-modal-container");

    targetPostImages.forEach( img => 
        img.addEventListener("click", imgModal));

        function imgModal() {
            imgModalContainer.getElementsByClassName.display="block";
            console.log("click");

            try {

                let clickedImage = this
                console.log(clickedImage)

                let targetPostImagesUrl = clickedImage.getAttribute("src");
                console.log(targetPostImagesUrl)

                imgModalContainer.innerHTML = `<img src="${targetPostImagesUrl}">`;
                console.log(targetPostImagesUrl)

            } catch(error) {
                console.log(error)
                imgModalContainer.innerHTML = "cant load img"
            }
        }
};