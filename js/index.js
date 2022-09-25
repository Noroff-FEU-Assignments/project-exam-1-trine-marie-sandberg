import { gallerySlideShow } from "/js/gallery-slide-show.js";
gallerySlideShow();

const postUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?_embed";
const postContainer = document.querySelector(".post-card-container");
postContainer.innerHTML = "Loading . . .";

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

    displayPosts();

    } catch(error) {
        console.log(error);
    };
};

getPosts();

//DISPLAY POST CARDS
function displayPosts() {

    try {
        
        let index = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]];
        let indexIndex = 0;
        console.log(index)
        function postCardButtons() {
            const btn1 = document.querySelector(".round-btn1");
            const btn2 = document.querySelector(".round-btn2");
            const btn3 = document.querySelector(".round-btn3");
            const roundNextBtn = document.querySelector(".round-next-btn");

            for(let i = 0; i < index[indexIndex].length; i++) {
            postContainer.innerHTML += `<a href="single-post.html?id=${cardArray[index[indexIndex][i]].postId}">
                                        <div class="post-card">
                                        <img src="${cardArray[index[indexIndex][i]].imgUrl}" class="card-img">
                                        <h3>${cardArray[index[indexIndex][i]].title}</h3>
                                        </div>
                                        </a>`
                                    };

            roundNextBtn.onclick = function() {

                indexIndex ++
                
                if(indexIndex === 3) {
                   indexIndex = 0;}
                
                postContainer.innerHTML = "";

                for(let i = 0; i < index[indexIndex].slice(-1); i++) {

                    createPostCards(i);
                    if(i == 4) { postContainer.innerHTML = ""}
                }

                function createPostCards(input) {
                    console.log("i = " + input)
                    postContainer.innerHTML += `<a href="single-post.html?id=${cardArray[input].postId}">
                                                <div class="post-card">
                                                <img src="${cardArray[input].imgUrl}" class="card-img">
                                                <h3>${cardArray[input].title}</h3>
                                                </div>
                                                </a>`                          
                };
                console.log("index[indexIndex]: " + index[indexIndex])
            };       
        };

        postCardButtons();

} catch(error) {

    postContainer.innerHTML = `<div>Sorry, we could not load content. Please try to refresh the page or try again later.</div>
                               <button>Refresh</button>
                               <div>Type of error: ${error}</div>`;
    
    console.log(error);
  };
};