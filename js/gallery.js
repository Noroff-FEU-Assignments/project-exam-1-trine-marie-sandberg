export function getGallery() {
    const galleryUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/media";
    const gallerySlideshowContainer = document.querySelector(".gallery-slideshow-container");

    async function getImages() {

        try {
            let singleImgUrl;
            let imageName;
            const response = await fetch(galleryUrl);
            const json = await response.json();
            console.log(json);
            let urlArray = [];
            let matchPattern;
            for(let i = 0; i < json.length; i++) {
                
                singleImgUrl = json[i].source_url;
                function searchForGallery(url){
                    const regExUrl = /gallery/;
                    matchPattern = regExUrl.test(url)
                    
                    console.log(regExUrl)
                
                    if(matchPattern === true) {
                        urlArray.push(url);
                    }
                }
                console.log(matchPattern)
                
                searchForGallery(singleImgUrl)
                imageName = json[i].title.rendered;

                
                console.log(urlArray);

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

        }

        } catch(error) {

            console.log(error);
        };
    };

    getImages();
};