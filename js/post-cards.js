//MAKE API CALL TO ...WP/V2/POSTS AND CREATE HTML FOR DISPLAYING POST CARDS
export function getPostCards() {

const postUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?_embed";
const postContainer = document.querySelector(".post-card-container");
postContainer.innerHTML = "Loading . . .";

let postCardObject;
let cardArray = [];
//let featuredImgUrl = [];

async function getPosts() {

    try {

    const response = await fetch(postUrl);
    const json = await response.json();
    postContainer.innerHTML = "";

    for(let i = 0; i < json.length; i++) {

        //console.log(json[i]._links['wp:featuredmedia'][0].href)
        console.log(json[i])
        //STORE POSTDETAILS
        

        
        try {
            postCardObject = { postUrl: json[i].guid.rendered,
                           title: json[i].title.rendered,
                           postPreview: json[i].excerpt.rendered,
                           postId: json[i].id,
                           imgUrl: json[i]._embedded['wp:featuredmedia'][0].source_url
                         };
                         cardArray.push(postCardObject);

        } catch(error) {
            console.log(error);
        }
        

        
    };

    displayPosts();

    } catch(error) {
        console.log(error);
    };
};

getPosts();

//DISPLAY POST CARDS
async function displayPosts() {

    try {

    for(let i = 0; i < cardArray.length; i++) {

        if(postCardObject.imgUrl == undefined) {

            Object.keys(postCardObject).forEach(imgUrl => {
                postCardObject[imgUrl] ="/img/cofee.jpg"
            })
            console.log(postCardObject)
        }

        postContainer.innerHTML += `<a href="single-post.html?id=${cardArray[i].postId}">
                                        <div class="post-card">
                                          <img src="${cardArray[i].imgUrl}" class="card-img">
                                          <h3>${cardArray[i].title}</h3>
                                        </div>
                                    </a>`;

} } catch(error) {

    postContainer.innerHTML = `<div>Sorry, we could not load content. Please try to refresh the page or try again later.</div>
                               <button>Refresh</button>
                               <div>Type of error: ${error}</div>`;
    
    console.log(error);
  };
};
};