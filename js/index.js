const postUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/posts";
const postContainer = document.querySelector(".post-container");
postContainer.innerHTML = "Loading . . .";

let autorUrl
const authorContainer = document.querySelector(".author-container");
authorContainer.innerHTML = "<p>Loading . . .</p>"

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

        //get autor details
        autorUrl = json[i]._links.author[0].href;
        console.log("AUTOR URL: " + autorUrl);
        //${json[i].content.rendered}
        postContainer.innerHTML += `<div class="post">${json[i].excerpt.rendered}<div>
                                    <div>${json[i].title.rendered}</div>
                                    <a href="${json[i].guid.rendered}"><div>${json[i].guid.rendered}</div></a>`;

                                    getAutorInfo()
    };
    
    } catch(error) {
        postContainer.innerHTML = `<div>Sorry, we could not load content. Please try to refresh the page or try again later.</div>
                                   <button>Refresh</button>
                                   <div>Type of error: ${error}</div>`;
        console.log(error);
    };
}

getPosts();

//Use inside post api call, inside loop to get autor info
async function getAutorInfo() {

    try {
        let autorResponse = await fetch(autorUrl);
        let autorJson = await autorResponse.json();
        console.log("AUTORJSON: " + autorJson.name);

        authorContainer.innerHTML = `<div>${autorJson.name}</div>
                                     <div>${autorJson.name}</div>
                                     <img src="${autorJson.avatar_urls[48]}"></img>`;

    } catch(error) {
        console.log(error);
        authorContainer.innerHTML = "<p>Failed to load author information</p>"
    }
}