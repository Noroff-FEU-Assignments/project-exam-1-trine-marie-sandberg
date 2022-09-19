const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");
const postsUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts/";
const singlePostContainer = document.querySelector(".single-post-container");
console.log(postsUrl)

async function getSinglePost() {
    const getPost = await fetch(postsUrl);
    const postJson = await getPost.json();
    
    for(let i = 0; i < postJson.length; i++) {
        singlePostContainer.innerHTML = `<div class="single-post-content">${postJson.guid.rendered}</div>`;
    };
};