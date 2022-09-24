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
        
        let index = [0, 1, 2, 3];

        function postCardButtons() {
            const btn1 = document.querySelector(".round-btn1");
            const btn2 = document.querySelector(".round-btn2");
            const btn3 = document.querySelector(".round-btn3");
            const roundNextBtn = document.querySelector(".round-next-btn");

            roundNextBtn.onclick = function() {
                index = [4, 5, 6, 7];
                postContainer.innerHTML = ""
                for(let i = 0; i < index.length; i++) {

                    postContainer.innerHTML += `<a href="single-post.html?id=${cardArray[index[i]].postId}">
                                                    <div class="post-card">
                                                      <img src="${cardArray[index[i]].imgUrl}" class="card-img">
                                                      <h3>${cardArray[index[i]].title}</h3>
                                                    </div>
                                                </a>`; 
            };
            index = [8, 9, 10, 11];
            
            }
        };

        postCardButtons();

        
    for(let i = 0; i < index.length; i++) {

        postContainer.innerHTML += `<a href="single-post.html?id=${cardArray[index[i]].postId}">
                                        <div class="post-card">
                                          <img src="${cardArray[index[i]].imgUrl}" class="card-img">
                                          <h3>${cardArray[index[i]].title}</h3>
                                        </div>
                                    </a>`; 
};

} catch(error) {

    postContainer.innerHTML = `<div>Sorry, we could not load content. Please try to refresh the page or try again later.</div>
                               <button>Refresh</button>
                               <div>Type of error: ${error}</div>`;
    
    console.log(error);
  };
};