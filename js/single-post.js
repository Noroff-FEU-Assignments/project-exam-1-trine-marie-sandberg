const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");
//const postsUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts/";

const singlePostContainer = document.querySelector(".single-post-container");
const aboutAuthorContainer = document.querySelector(".about-author");
const postContentContainer = document.querySelector(".single-post-content-container");

//console.log(postsUrl)
let singlePostUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts/" + id + "?_embed";

async function getSinglePost() {

    try {

        const getPost = await fetch(singlePostUrl);
        const postJson = await getPost.json();
        console.log(postJson)
        singlePostContainer.innerHTML = `<div class="single-post-content flex-wrap">
                                     <h2>${postJson.title.rendered}</h2>
                                     <p>${postJson.date}</p>
                                     </div>`;

        //if(!postJson._embedded['wp:featuredmedia'][0].source_url) {};
        try {
            singlePostContainer.innerHTML += `<img src="${postJson._embedded['wp:featuredmedia'][0].source_url}" alt="${postJson._embedded['wp:featuredmedia'][0].alt_text}" class="auto-img">`;
        } catch(error) {
            console.log(error);
            singlePostContainer.innerHTML += `<img>`;
        };

        aboutAuthorContainer.innerHTML = `<div class="flex-wrap">
                                             <h2>Description</h2>
                                             <div class="author-name-img-wrap">
                                                 <image src="/img/profile-img.png" class="profile-img">
                                                 <h2>${postJson._embedded.author[0].name}</h2>
                                             </div>
                                          </div>
                                          <p>Reading time</p>
                                          <p>${postJson.excerpt.rendered}</p>`;

        postContentContainer.innerHTML = `${postJson.guid.rendered}`

    } catch(error) {
        console.log(error)
    }
    

    

    // for(let i = 0; i < postJson.length; i++) {
    //     console.log(singlePostUrl)
    // };
};

getSinglePost();