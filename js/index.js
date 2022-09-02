const postUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/posts";
const postContainer = document.querySelector(".post-container");
postContainer.innerHTML = "Loading . . .";

let postCardObject;
let cardArray = [];
let autorUrl
const authorContainer = document.querySelector(".author-container");

async function getPosts() {

    try {
    const response = await fetch(postUrl);
    const json = await response.json();
    console.log(json)

    let singlePostUrl;

    postContainer.innerHTML = "";

    for(let i = 0; i < json.length; i++) {
        //get single post url
        singlePostUrl = json[i].guid.rendered;
        console.log("SINGLE POST URL: " + singlePostUrl);

        postCardObject = { postUrl: json[i].guid.rendered,
                           title: json[i].title.rendered,
                           postPreview: json[i].excerpt.rendered
                         };
        cardArray.push(postCardObject);

        console.log("postCardObject: " + postCardObject);

        //AUTHOR DETAILS LINK
        autorUrl = json[i]._links.author[0].href;
        console.log("AUTOR URL: " + autorUrl);

        
    };

    displayPosts();

    } catch(error) {
        postContainer.innerHTML = `<div>Sorry, we could not load content. Please try to refresh the page or try again later.</div>
                                   <button>Refresh</button>
                                   <div>Type of error: ${error}</div>`;
        console.log(error);
    };
}


getPosts();

//Use inside post api call, inside loop to get autor info
async function displayPosts() {

    try {
        console.log("CARDARRAY " + cardArray)
        let autorResponse = await fetch(autorUrl);
        let autorJson = await autorResponse.json();
        console.log("AUTORJSON: " + autorJson.name);

        let authorCardObject = { image: autorJson.avatar_urls[48],
            name: autorJson.name
           };
           console.log("authorCardObject: " + authorCardObject);
    for(i = 0; i < cardArray.length; i++) {

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
}
    } catch(error) {
        console.log(error);
    }
}