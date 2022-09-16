export function getGallery() {
    
    const galleryUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/media";
    const gallerySlideshowContainer = document.querySelector(".gallery-slideshow-container");
    gallerySlideshowContainer.style.backgroundImage = `url("https://gamehub-wp-api.one/mhpb-blogg-content/wp-content/uploads/2022/09/gallery/stone-road.jpg")`;

    async function getImages() {

        try {

            let imageName;
            const response = await fetch(galleryUrl);
            const json = await response.json();
            console.log(json);
            let urlArray = [];
            let matchPattern;

            for(let i = 0; i < json.length; i++) {
                
                let singleImgUrl = json[i].source_url;
                console.log(json[i].source_url)
                function searchForGallery(url) {
                    const regExUrl = /gallery/;
                    matchPattern = regExUrl.test(url)
                
                    if(matchPattern === true) {
                        urlArray.push(url);
                    };
                };

                console.log(matchPattern)
                searchForGallery(singleImgUrl)
                imageName = json[i].title.rendered;      
            };

            console.log(urlArray);

                    const slideShowNextBtn = document.querySelector(".slideshow-next-btn");
                    const slideShowPreveiousBtn = document.querySelector(".slideshow-previous-btn");
                    
                    let imgIndex = 0;

                    //NEXT BUTTON
                    slideShowNextBtn.onclick = function nextImg() {

                        imgIndex ++;
                        console.log(imgIndex);
                        if(imgIndex > urlArray.length - 1) {
                            imgIndex = 0;
                            console.log("imgIndex > : " + urlArray.length)
                            gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[0]}")`;
                        }; 

                        
                        

                        gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[imgIndex]}")`;
                    };
                    
                    //PREVIOUS BUTTON
                    slideShowPreveiousBtn.onclick = function preveiousImg() {
                        
                        //gallerySlideshowContainer.style.backgroundImage += `url("${urlArray[urlArray.length - 1]}")`;
                        
                        if(imgIndex < 1) {
                            
                            imgIndex = urlArray.length - 1;
                            console.log("LENGTH: " + urlArray.length)
                        };
                        
                        imgIndex --;
                        console.log(imgIndex)
                        
                        gallerySlideshowContainer.style.backgroundImage = `url("${urlArray[imgIndex]}")`;
                };

        } catch(error) {

            console.log(error);
        };
    };

    getImages();
};