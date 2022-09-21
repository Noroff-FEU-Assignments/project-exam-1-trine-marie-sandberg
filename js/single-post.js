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

        try {
            singlePostContainer.innerHTML += `<img src="${postJson._embedded['wp:featuredmedia'][0].source_url}" alt="${postJson._embedded['wp:featuredmedia'][0].alt_text}" class="auto-img">
                                              `;
        } catch(error) {
            singlePostContainer.innerHTML += `<div class="featured-img-placeholder">
                                                 <img src="/img/missing-img.jpg" class="auto-img" alt="abstract image of shattered pieces in soft pastell colours">
                                                 <h2 class="featured-img-placeholder-text header-special">missing image</h2>
                                              </div>`;
        };

        aboutAuthorContainer.innerHTML = `<div class="flex-wrap">
                                             <p>${postJson.date}</p>
                                             <div class="author-name-img-wrap">
                                                 <image src="/img/profile-img.png" class="profile-img">
                                                 <h2>${postJson._embedded.author[0].name}</h2>
                                             </div>
                                          </div>
                                          <p>${postJson.excerpt.rendered}</p>`;

        postContentContainer.innerHTML = `<h1>${postJson.title.rendered}</h1>
                                          <div>${postJson.content.rendered}</div>`;

        const removeEmojis = document.querySelector(".booster-reactions-block");
        removeEmojis.style.display ="none";
        const adjustImages = document.querySelector(`.wp-image-${postJson.featured_media}`);
        console.log(adjustImages)

        const targetImgContainer = document.querySelector(".wp-block-image");
        //targetImgContainer.style.margin = "50px 50px 0 0";
        targetImgContainer.style.display = "flex";
        //targetImgContainer.style.backgroundColor = "#F9F9F9";

        const targetReadtime = document.querySelector(".twp-read-time");

    } catch(error) {
        console.log(error)
    }
    

    

    // for(let i = 0; i < postJson.length; i++) {
    //     console.log(singlePostUrl)
    // };
};

getSinglePost();