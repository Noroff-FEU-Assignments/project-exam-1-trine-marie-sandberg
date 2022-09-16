export function gallerySlideShow() {
    
    const galleryUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/media";
    const gallerySlideshowContainer = document.querySelector(".gallery-slideshow-container");
    gallerySlideshowContainer.style.backgroundImage = `url("https://gamehub-wp-api.one/mhpb-blogg-content/wp-content/uploads/2022/09/gallery/stone-road.jpg")`;

    async function getImages() {

        try {

            //let imageName;
            const response = await fetch(galleryUrl);
            const json = await response.json();
            let urlArray = [];
            let matchPattern;

            for(let i = 0; i < json.length; i++) {
                
                let singleImgUrl = json[i].source_url;

                function searchForGallery(url) {
                    const regExUrl = /gallery/;
                    matchPattern = regExUrl.test(url)
                
                    if(matchPattern === true) {
                        urlArray.push(url);
                    };
                };

                searchForGallery(singleImgUrl)
                //imageName = json[i].title.rendered;      
            };

                    const slideShowNextBtn = document.querySelector(".slideshow-next-btn");
                    const slideShowPreveiousBtn = document.querySelector(".slideshow-previous-btn");
                    
                    let imgIndex = 0;

                    function autoSlideshow() {
                           
                                imgIndex ++;
                                gallerySlideshowContainer.style.transition="2s ease-in";
                                gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[imgIndex]}")`;

                             if(imgIndex > urlArray.length - 1 ) {

                                imgIndex = 0;
                                gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[imgIndex]}")`;
                            };
                    };

                    let myTimer = setInterval(autoSlideshow, 7000);

                    //NEXT btn
                    slideShowNextBtn.onclick = function nextImg() {

                        clearInterval(myTimer);
                        imgIndex ++;

                        if(imgIndex > urlArray.length - 1) {

                            imgIndex = 0;
                        }; 

                        gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[imgIndex]}")`;
                    };
                    
                    //PREVIOUS btn
                    slideShowPreveiousBtn.onclick = function preveiousImg() {

                        clearInterval(myTimer);
                        
                        if(imgIndex < 1) {
                            
                            imgIndex = urlArray.length - 1;
                        };
                        
                        imgIndex --;
                        
                        gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[imgIndex]}")`;
                    };

        } catch(error) {

            console.log(error);
        };
    };

    getImages();
};