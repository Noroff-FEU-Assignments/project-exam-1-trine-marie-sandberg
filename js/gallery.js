export function getGallery() {
    const galleryUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/media";
    const gallerySlideshowContainer = document.querySelector(".gallery-slideshow-container");

    async function getImages() {

        try {
            let imgIndex = 0;

            const response = await fetch(galleryUrl);
            const json = await response.json();
            console.log(json)

            //LOOP IMAGES
            for(let i = 0; i < json.length; i++) {

                let imageUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-content/uploads/2022/09/gallery/" + `${json[i].title.rendered}` + ".jpg";
                console.log(imageUrl)
                    
                imgSlideshowDisplay()
                if(!gallerySlideshowContainer.style.backgroundImage) { continue }

                function imgSlideshowDisplay() {
                
                    //let imgIndex = 0;
                    //gallerySlideshowContainer.style.backgroundImage += `url("${json[2].source_url}")`;
                    gallerySlideshowContainer.style.backgroundImage += `url("${imageUrl}")`;
                    const slideShowNextBtn = document.querySelector(".slideshow-next-btn");
                    const slideShowPreveiousBtn = document.querySelector(".slideshow-previous-btn");

                    //NEXT BUTTON
                    slideShowNextBtn.onclick = function nextImg() {
                        if(imgIndex >= json.length) {
                        //console.log("im  too big")
                        imgIndex = 0;
                        //gallerySlideshowContainer.style.backgroundImage = `url("${json[imgIndex ++].source_url}")`;
                        gallerySlideshowContainer.style.backgroundImage = `url("http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-content/uploads/2022/09/gallery/${json[imgIndex ++].title.rendered}.jpg")`;

                        } else{
                        
                        //gallerySlideshowContainer.style.backgroundImage = `url("${json[imgIndex ++].source_url}")`;
                        gallerySlideshowContainer.style.backgroundImage = `url("http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-content/uploads/2022/09/gallery/${json[imgIndex ++].title.rendered}.jpg")`;
                        };
                    };
                    
                    //PREVIOUS BUTTON
                    slideShowPreveiousBtn.onclick = function preveiousImg() {

                    if(imgIndex < 1) {
                        //console.log("im  too small")
                        imgIndex = json.length - 1;
                        //gallerySlideshowContainer.style.backgroundImage = `url("${json[imgIndex --].source_url}")`;
                        gallerySlideshowContainer.style.backgroundImage = `url("http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-content/uploads/2022/09/gallery/${json[imgIndex --].title.rendered}.jpg")`;

                    } else{

                        gallerySlideshowContainer.style.backgroundImage = `url("http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-content/uploads/2022/09/gallery/${json[imgIndex --].title.rendered}.jpg")`;
                    };
                };
            };
//imgSlideshowDisplay()
                   
            };

        } catch(error) {

            console.log(error);
        };
    };

    getImages();
};