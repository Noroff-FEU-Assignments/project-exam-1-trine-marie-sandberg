const postUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/posts";
const postContainer = document.querySelector(".post-container");
postContainer.innerHTML = "Loading . . .";

async function getPosts() {

    try {
    const response = await fetch(postUrl);
    const json = await response.json();
    console.log(json)

    postContainer.innerHTML = "";

    for(let i = 0; i < json.length; i++) {
        postContainer.innerHTML += `<div>${json[i].content.rendered}<div>`;
    };
    
    } catch(error) {
        postContainer.innerHTML = `<div>${error}</div>`;
    };
}

getPosts();