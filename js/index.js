import { gallerySlideShow } from "/js/gallery-slide-show.js";
import { postCards } from "/js/post-cards.js";

gallerySlideShow();

const postUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?per_page=12&_embed";
const postContainer = document.querySelector(".post-card-container");
postContainer.innerHTML = `<div class="loader"></div>`;

const nextButton = document.querySelector(".round-next-btn");
const previousButton = document.querySelector(".round-previous-btn");

//ASSIGN DATA FOR POSTCARDS
let postCardObject;
let cardArray = [];

async function getPosts() {

    try {
    //GET 12 LATEST POSTS
    const response = await fetch(postUrl);
    const json = await response.json();
    postContainer.innerHTML = "";

    for(let i = 0; i < json.length; i++) {

        try {

            postCardObject = { title: json[i].title.rendered,
                               postId: json[i].id,
                               imgUrl: json[i]._embedded['wp:featuredmedia'][0].source_url,
                               alt: json[i]._embedded['wp:featuredmedia'][0].alt_text
                            };

            cardArray.push(postCardObject);
            
        } catch(error) {
            
            console.log(error);
        };
    };

    //LOOP AND DISPLAY POSTCARDS -start
    let indexFrom = 0;
    let indexTo = 4;
    
    for(let i = indexFrom; i < indexTo; i++) {

        postCards(cardArray[i]);
    };    

    //LOOP AND DISPLAY POSTCARDS -on click
    function loopCards() {

        postContainer.innerHTML = "";

        for(let i = indexFrom; i < indexTo; i++) {

            postCards(cardArray[i]);
        };
    };

    //BUTTONS
    let clickNumber = 0;

    //FORWARD btn
    function nextPage() {

        clickNumber++
        switchNumbers();
        loopCards();
    };
    
    nextButton.addEventListener("click", nextPage);

    //BACK btn
    function previousPage() {

        clickNumber--;
        switchNumbers();
        loopCards();
    };

    previousButton.addEventListener("click", previousPage);
    
    function switchNumbers() {

        //POSITIVE CLICKNUMBERS
        if(clickNumber === 1) {
            indexFrom = 4;
            indexTo = 8;
        } if(clickNumber === 2) {
            indexFrom = 8;
            indexTo = 12;
        } if(clickNumber === 3) {
            indexFrom = 0;
            indexTo = 4;
            clickNumber = 0;
        };
        
        //NEGATIVE CLICKNUMBERS
        if(clickNumber === -1) {
            indexFrom = 8;
            indexTo = 12;
        } if(clickNumber === -2) {
            indexFrom = 4;
            indexTo = 8;
        } if(clickNumber === -3) {
            indexFrom = 8;
            indexTo = 12;
            clickNumber = 0;
        } if(clickNumber === 0) {
            indexFrom = 0;
            indexTo = 4;
        };
    };

} catch(error) {

    console.log(error);
};
};

getPosts();