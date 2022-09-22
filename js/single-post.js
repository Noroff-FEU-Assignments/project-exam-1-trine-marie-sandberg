import { imageModal } from "/js/img-modal.js";


const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");

const singlePostContainer = document.querySelector(".single-post-container");
const aboutAuthorContainer = document.querySelector(".about-author");
const postContentContainer = document.querySelector(".single-post-content-container");

let singlePostUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts/" + id + "?_embed";

async function getSinglePost() {

    try {

        const getPost = await fetch(singlePostUrl);
        const postJson = await getPost.json();
        console.log(postJson)

        try {
            singlePostContainer.innerHTML += `<img src="${postJson._embedded['wp:featuredmedia'][0].source_url}" alt="${postJson._embedded['wp:featuredmedia'][0].alt_text}" class="featured-img">
                                              `;
        } catch(error) {
            singlePostContainer.innerHTML += `<div class="featured-img-placeholder">
                                                 <img src="/img/cofee.jpg" class="auto-img" alt="abstract image of shattered pieces in soft pastell colours">
                                                 <h2 class="featured-img-placeholder-text header-special">No featured image for this post</h2>
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

                                          //IMPORTING MODAL FOR BIGGER IMG
                                          imageModal();

        const removeEmojis = document.querySelector(".booster-reactions-block");
        removeEmojis.style.display ="none";

        const targetReadtime = document.querySelector(".twp-read-time");

    } catch(error) {
        console.log(error)
    }
};

getSinglePost();