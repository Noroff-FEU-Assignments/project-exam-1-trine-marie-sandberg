const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");
//const postsUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts/";
const singlePostContainer = document.querySelector(".single-post-container");
//console.log(postsUrl)
let singlePostUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts/" + id + "?_embed";

async function getSinglePost() {

    
    const getPost = await fetch(singlePostUrl);
    const postJson = await getPost.json();
    console.log(postJson)

    singlePostContainer.innerHTML = `<div class="single-post-content">
                                     <h2>${postJson.title.rendered}</h2>
                                     </div>`;

    // for(let i = 0; i < postJson.length; i++) {
    //     console.log(singlePostUrl)
    // };
};

getSinglePost();