const postUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/posts";
const postContainer = document.querySelector(".post-container");
postContainer.innerHTML = "Loading . . .";

async function getPosts() {

    try {
    const response = await fetch(postUrl);
    const json = await response.json();
    console.log(json)

    let singlePostUrl = "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/?"

    postContainer.innerHTML = "";

    for(let i = 0; i < json.length; i++) {
        postId = json[i].id;
        console.log(singlePostUrl);
        //${json[i].content.rendered}
        postContainer.innerHTML += `<div class="post">${json[i].excerpt.rendered}<div>
                                    <div>${json[i].title.rendered}</div>
                                    <div>${json[i].title.rendered}</div>
                                    <p>${singlePostUrl + postId}</p>`;
    };
    
    } catch(error) {
        postContainer.innerHTML = `<div>Sorry, we could not load content. Please try to refresh the page or try again later.</div>
                                   <button>Refresh</button>
                                   <div>Type of error: ${error}</div>`;
        console.log(error);
    };
}

getPosts();