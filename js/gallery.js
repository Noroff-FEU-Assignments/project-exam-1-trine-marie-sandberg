export function getGallery() {
    const galleryUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/media";
    const gallerySlideshowContainer = document.querySelector(".gallery-slideshow-container");
    gallerySlideshowContainer.innerHTML = "Loading . . .";

    async function callGallery() {

        try {

            const response = await fetch(galleryUrl);
            const json = await response.json();
            console.log(json)

            gallerySlideshowContainer.innerHTML = "";

            for(let i = 0; i < json.length; i++) {

                if(json[i].alt_text === "gallery") {

                    console.log(json[i].source_url);
                    gallerySlideshowContainer.innerHTML += `<img src="${json[i].source_url}" class="auto-img">`;
                };
            };

        } catch(error) {

            console.log(error);
        };
    };

    callGallery();
};