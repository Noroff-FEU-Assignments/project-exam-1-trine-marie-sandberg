export function getGallery() {
    const galleryUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/media";
    const gallerySlideshowContainer = document.querySelector(".gallery-slideshow-container");

    async function getImages() {

        try {
            
            let imageName;
            const response = await fetch(galleryUrl);
            const json = await response.json();
            console.log(json);
            let urlArray = [];
            //LOOP IMAGES
            for(let i = 0; i < json.length; i++) {

                imageName = json[i].title.rendered;
                urlArray.push(json[i].source_url)
                console.log(urlArray)

//imgSlideshowDisplay()
            };
            
            gallerySlideshowContainer.style.backgroundImage = `url("https://gamehub-wp-api.one/mhpb-blogg-content/wp-content/uploads/2022/09/gallery/stone-road.jpg")`;

            for(let imgIndex = 0; imgIndex < urlArray.length; imgIndex++) {

                function imgSlideshowDisplay() {
                
                    gallerySlideshowContainer.style.backgroundImage += `url("${urlArray[imgIndex]}")`;
                    const slideShowNextBtn = document.querySelector(".slideshow-next-btn");
                    const slideShowPreveiousBtn = document.querySelector(".slideshow-previous-btn");

                    //NEXT BUTTON
                    slideShowNextBtn.onclick = function nextImg() {
                        gallerySlideshowContainer.style.backgroundImage += `url("")`;
                        if(imgIndex >= json.length) {
                        //console.log("im  too big")
                        imgIndex = 0;
                        gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[imgIndex ++]}")`;

                        } else{
                        
                        gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[imgIndex ++]}")`;
                        };
                    };
                    
                    //PREVIOUS BUTTON
                    slideShowPreveiousBtn.onclick = function preveiousImg() {
                        gallerySlideshowContainer.style.backgroundImage += `url("")`;

                    if(imgIndex < 1) {
                        //console.log("im  too small")
                        imgIndex = json.length - 1;
                        gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[imgIndex --]}")`;

                    } else{

                        gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[imgIndex --]}")`;
                    };
                };
            };
            imgSlideshowDisplay()
            //CHECK IF IMAGE IS IN GALLERY
            //let imageName = `${json[i].title.rendered}`;
            //HOW TO CHECK THE ACTUAL URLS??
            let checkUrl = ["localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-content/uploads/2022/09/", "gallery/", `${imageName}`, ".jpg"];
            
            console.log(checkUrl)
            let urlChecked = false;

                if(checkUrl.includes("gallery/") === true) {
                    urlChecked = true;
                    console.log("TEST value : " + checkUrl.includes("gallery/TEST"))
                    
                } if(urlChecked === true) {
                    console.log("passed: " + urlArray)
                    //imgSlideshowDisplay() 
                    console.log(json[imgIndex ++].source_url)

                } else if(urlChecked === false) {
                console.log("skipped: " + urlArray)
                continue;
            }
            }

        } catch(error) {

            console.log(error);
        };
    };

    getImages();
};