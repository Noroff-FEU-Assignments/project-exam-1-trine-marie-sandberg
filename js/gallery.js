export function getGallery() {
    const galleryUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/media";

    async function callGallery() {

        try {

            const response = await fetch(galleryUrl);
            const json = await response.json();
            console.log(json)

            for(let i = 0; i < json.length; i++) {

                if(json[i].alt_text === "gallery") {

                    console.log(json[i].alt_text);
                };
            };

        } catch(error) {

            console.log(error);
        };
    };

    callGallery();
};