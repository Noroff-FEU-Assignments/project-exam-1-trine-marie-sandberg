//MAKE API CALL TO ...WP/V2/POSTS AND CREATE HTML FOR DISPLAYING POST CARDS
export function getPostCards() {

const postUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/posts";
const postContainer = document.querySelector(".post-container");
postContainer.innerHTML = "Loading . . .";

let postCardObject;
let authorCardObject;
let cardArray = [];
let autorUrl;

async function getPosts() {

    try {

    const response = await fetch(postUrl);
    const json = await response.json();

    let singlePostUrl;
    postContainer.innerHTML = "";

    for(let i = 0; i < json.length; i++) {

        //STORE URL FOR EACH POST
        singlePostUrl = json[i].guid.rendered;

        //STORE POSTDETAILS
        postCardObject = { postUrl: json[i].guid.rendered,
                           title: json[i].title.rendered,
                           postPreview: json[i].excerpt.rendered
                         };

        cardArray.push(postCardObject);

        //AUTHOR DETAILS LINK
        autorUrl = json[i]._links.author[0].href;
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

        let autorResponse = await fetch(autorUrl);
        let autorJson = await autorResponse.json();

        authorCardObject = { image: autorJson.avatar_urls[48],
                             name: autorJson.name
                           };

    for(let i = 0; i < cardArray.length; i++) {

        postContainer.innerHTML += `<a href="${cardArray[i].postUrl}">
                                      <div class="post-card">
                                          <div class="author-wrap">
                                             <image src="${authorCardObject.image}" class="profile-img">
                                             <p>${authorCardObject.name}</p>
                                          </div>
                                          <div>
                                             <h3>${cardArray[i].title}</h3>
                                             <p>${cardArray[i].postPreview}</p>
                                          </div>
                                       </div>
                                    </a>`;

} } catch(error) {

    postContainer.innerHTML = `<div>Sorry, we could not load content. Please try to refresh the page or try again later.</div>
                               <button>Refresh</button>
                               <div>Type of error: ${error}</div>`
    
    console.log(error);
  };
};
};