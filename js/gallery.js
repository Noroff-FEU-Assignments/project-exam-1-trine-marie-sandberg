export function getGallery() {
    const galleryUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/media";
    const gallerySlideshowContainer = document.querySelector(".gallery-slideshow-container");

    async function getImages() {

        try {

            const response = await fetch(galleryUrl);
            const json = await response.json();
            console.log(json)

            for(let i = 0; i < json.length; i++) {

                gallerySlideshowContainer.style.backgroundImage = `url("${json[2].source_url}")`;

                if(json[i].alt_text === "gallery") {

                    gallerySlideshowContainer.style.backgroundImage = `url("${json[i].source_url}")`;

                    const slideShowNextBtn = document.querySelector(".slideshow-next-btn");
                    const slideShowPreveiousBtn = document.querySelector(".slideshow-previous-btn");

                    slideShowNextBtn.onclick = function nextImg() {
                        
                        gallerySlideshowContainer.style.backgroundImage = `url("${json[3].source_url}")`;
                    };

                    slideShowPreveiousBtn.onclick = function preveiousImg() {
                        console.log("clicked")
                        gallerySlideshowContainer.style.backgroundImage = `url("${json[2].source_url}")`;
                    }
                };
            };

        } catch(error) {

            console.log(error);
        };
    };

    getImages();
};