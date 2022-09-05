export function getGallery() {
    const galleryUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/media";
    const gallerySlideshowContainer = document.querySelector(".gallery-slideshow-container");

    async function getImages() {

        try {

            const response = await fetch(galleryUrl);
            const json = await response.json();
            console.log(json)

            for(let i = 0; i < json.length; i++) {
                console.log(json[i])
                let counter = 0;
                gallerySlideshowContainer.style.backgroundImage += `url("${json[i].source_url}")`;

                gallerySlideshowContainer.style.backgroundImage = `url("${json[i].source_url}")`;

                    const slideShowNextBtn = document.querySelector(".slideshow-next-btn");
                    const slideShowPreveiousBtn = document.querySelector(".slideshow-previous-btn");

                    if(json[i].alt_text !== "gallery") {
                        continue
                    };

                    slideShowNextBtn.onclick = function nextImg() {

                        if(counter >= json.length){
                        console.log("im  too big")
                        counter = 0;
                        console.log(counter)

                        } else{
                        
                        console.log(json[i].source_url)
                        gallerySlideshowContainer.style.backgroundImage = `url("${json[counter ++].source_url}")`;
                        console.log(counter)
                        }
                    };

                    slideShowPreveiousBtn.onclick = function preveiousImg() {

                        if(counter < 1){

                            console.log("im  too small")
                            counter = 7;
                            console.log(counter)

                            } else{
                        gallerySlideshowContainer.style.backgroundImage = `url("${json[counter --].source_url}")`;
                        console.log(counter)
                        }
                    }
                };
            } catch(error) {
                console.log(error);
            };
        };

    getImages();
};