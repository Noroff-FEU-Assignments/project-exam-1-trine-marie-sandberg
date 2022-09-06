export function getGallery() {
    const galleryUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/media";
    const gallerySlideshowContainer = document.querySelector(".gallery-slideshow-container");

    async function getImages() {

        try {

            const response = await fetch(galleryUrl);
            const json = await response.json();
            console.log(json)

            //LOOP IMAGES
            for(let i = 0; i < json.length; i++) {

                if(json[i].alt_text !== "gallery") {
                    console.log("skipped!")
                    continue;
                     
                } if(json[i].alt_text === "gallery") {

                    imgSlideshowDisplay()
                }
                    

                function imgSlideshowDisplay() {
                
                    let imgIndex = 0;
                    gallerySlideshowContainer.style.backgroundImage += `url("${json[2].source_url}")`;
                    const slideShowNextBtn = document.querySelector(".slideshow-next-btn");
                    const slideShowPreveiousBtn = document.querySelector(".slideshow-previous-btn");

                    //NEXT BUTTON
                    slideShowNextBtn.onclick = function nextImg() {
                        if(imgIndex >= json.length) {
                        //console.log("im  too big")
                        imgIndex = 0;
                        gallerySlideshowContainer.style.backgroundImage = `url("${json[imgIndex ++].source_url}")`;

                        } else{
                        
                        gallerySlideshowContainer.style.backgroundImage = `url("${json[imgIndex ++].source_url}")`;
                        };
                    };
                    
                    //PREVIOUS BUTTON
                    slideShowPreveiousBtn.onclick = function preveiousImg() {

                    if(imgIndex < 1) {
                        //console.log("im  too small")
                        imgIndex = json.length - 1;
                        gallerySlideshowContainer.style.backgroundImage = `url("${json[imgIndex --].source_url}")`;

                    } else{

                        gallerySlideshowContainer.style.backgroundImage = `url("${json[imgIndex --].source_url}")`;
                    };
                };
            };

                   
            };

        } catch(error) {

            console.log(error);
        };
    };

    getImages();
};