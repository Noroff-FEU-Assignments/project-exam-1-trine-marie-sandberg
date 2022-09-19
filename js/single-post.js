const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");
//const postsUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts/";
const singlePostContainer = document.querySelector(".single-post-container");
//console.log(postsUrl)
let singlePostUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts/" + id + "?_embed";

async function getSinglePost() {

    try {

        const getPost = await fetch(singlePostUrl);
        const postJson = await getPost.json();
        console.log(postJson)
        singlePostContainer.innerHTML = `<div class="single-post-content">
                                     <h2>${postJson.title.rendered}</h2>
                                     <p>${postJson.date}</p>
                                     <p>${postJson.title.rendered}</p>
                                     
                                     </div>`;

        if(!postJson._embedded['wp:featuredmedia'][0].source_url) {};
        if(postJson._embedded['wp:featuredmedia'][0].source_url) {
            singlePostContainer.innerHTML += `<img src="${postJson._embedded['wp:featuredmedia'][0].source_url}" alt="${postJson._embedded['wp:featuredmedia'][0].alt_text}">`
        };

    } catch(error) {
        console.log(error)
    }
    

    

    // for(let i = 0; i < postJson.length; i++) {
    //     console.log(singlePostUrl)
    // };
};

getSinglePost();