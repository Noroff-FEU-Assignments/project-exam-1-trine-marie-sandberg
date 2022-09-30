import { gallerySlideShow } from "/js/gallery-slide-show.js";
import { postCards } from "/js/post-cards.js";
gallerySlideShow();

const postUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?_embed";
const postContainer = document.querySelector(".post-card-container");
postContainer.innerHTML = "Loading . . .";

const nextButton = document.querySelector(".round-next-btn");
const previousButton = document.querySelector(".round-previous-btn");

let postCardObject;
let cardArray = [];

async function getPosts() {

    try {

    const response = await fetch(postUrl);
    const json = await response.json();
    postContainer.innerHTML = "";

    for(let i = 0; i < json.length; i++) {

        try {
            postCardObject = { title: json[i].title.rendered,
                               postId: json[i].id,
                               imgUrl: json[i]._embedded['wp:featuredmedia'][0].source_url
                            };

            cardArray.push(postCardObject);
            
        } catch(error) {
            console.log(error);
        };
    };
    
    console.log(cardArray)
      
    let indexFrom = 0;
    let indexTo = 4;

    for(let i = indexFrom; i < indexTo; i++) {

        postCards(cardArray[i]);
    };    

    function loopCards() {
        postContainer.innerHTML = "";
        for(let i = indexFrom; i < indexTo; i++) {

            postCards(cardArray[i]);
        };
    };

    let clickNumber = 0;

    function nextPage() {
        clickNumber++
        console.log(clickNumber)
        switchNumbers()
        console.log("from: " + indexFrom + " to: " + indexTo)
        loopCards()
    };

nextButton.addEventListener("click", nextPage);

function previousPage() {
    clickNumber--
    console.log(clickNumber)
    switchNumbers()
    console.log("from: " + indexFrom + " to: " + indexTo)
    loopCards()
};

previousButton.addEventListener("click", previousPage);

function switchNumbers() {

    if(clickNumber === 1) {
        indexFrom = 4;
        indexTo = 8;
    } if(clickNumber === 2) {
        indexFrom = 8;
        indexTo = 10;
    } if(clickNumber === 3) {
        indexFrom = 0;
        indexTo = 4;
        clickNumber = 0;

        //________________
    } 
    if(clickNumber === -1) {
        indexFrom = 8;
        indexTo = 10;
    } if(clickNumber === -2) {
        indexFrom = 4;
        indexTo = 8;
    } if(clickNumber === -3) {
        indexFrom = 8;
        indexTo = 10;
        clickNumber = 0;
    } if(clickNumber === 0) {
        indexFrom = 0;
        indexTo = 4;
    }
};
    
    //displayPosts();
    
    

    

    } catch(error) {
        console.log(error);
    };
};

getPosts();

//DISPLAY POST CARDS
// function displayPosts() {

//     try {
        
//         let index = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]];
//         let arrayNumber = 0;
//         console.log(index)
//         function postCardButtons() {
//             const btn1 = document.querySelector(".round-btn1");
//             const btn2 = document.querySelector(".round-btn2");
//             const btn3 = document.querySelector(".round-btn3");
//             const roundNextBtn = document.querySelector(".round-next-btn");

//             for(let i = 0; i < index[0].length; i++) {
//             postContainer.innerHTML += `<a href="single-post.html?id=${cardArray[index[0][i]].postId}">
//                                         <div class="post-card">
//                                         <img src="${cardArray[index[0][i]].imgUrl}" class="card-img">
//                                         <h3>${cardArray[index[0][i]].title}</h3>
//                                         </div>
//                                         </a>`
//                                     };

//             roundNextBtn.onclick = function() {

//                 arrayNumber ++
                
//                 if(arrayNumber === 3) {
//                    arrayNumber = 0;}
                
//                 postContainer.innerHTML = "";

//                 for(let i = 0; i < index[arrayNumber].slice(-1); i++) {

//                     createPostCards(i);
//                     if(i === 3) { 
//                         console.log("i === 3: ")
//                         postContainer.innerHTML = ""
//                 }
//                 }

//                 function createPostCards(input) {
//                     console.log("i = " + input)
//                     postContainer.innerHTML += `<a href="single-post.html?id=${cardArray[input].postId}">
//                                                 <div class="post-card">
//                                                 <img src="${cardArray[input].imgUrl}" class="card-img">
//                                                 <h3>${cardArray[input].title}</h3>
//                                                 </div>
//                                                 </a>`                          
//                 };
//                 console.log(`Array number ${arrayNumber} :` + index[arrayNumber])
//             };       
//         };

//         postCardButtons();

// } catch(error) {

//     postContainer.innerHTML = `<div>Sorry, we could not load content. Please try to refresh the page or try again later.</div>
//                                <button>Refresh</button>
//                                <div>Type of error: ${error}</div>`;
    
//     console.log(error);
//   };
// };