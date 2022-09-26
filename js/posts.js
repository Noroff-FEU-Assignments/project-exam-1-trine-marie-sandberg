import { postsButtons } from "/js/posts-buttons.js";
postsButtons();

const postsContainer = document.querySelector(".posts-container");
postsContainer.innerHTML = "<p>Loading . . .</p>";
let currentPage;

async function getPosts() {

    try {

        const postsUrl = `https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?page=1&_embed`;
        const response = await fetch(postsUrl);
        const postJson = await response.json();
        console.log(postJson);

        currentPage = response.headers.get("x-wp-totalpages");

        postsContainer.innerHTML = "";
        for(let i = 0; i < postJson.length; i++) {

            postsContainer.innerHTML += `<a href="single-post.html?id=${postJson[i].id}">
                                            <div class="flex-wrap post-cover">
                                                <img src="${postJson[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${postJson[i]._embedded['wp:featuredmedia'][0].alt_text}" class="post-cover-img">
                                                <div class="post-cover-text">
                                                    <h2 class="post-cover-h2">${postJson[i].title.rendered}</h2>
                                                    <p class="post-cover-prev">${postJson[i].excerpt.rendered}</p>
                                                </div>
                                            </div>
                                         </a>`;
        };

    } catch(error) {
        console.log(error);

        if(!postsContainer.innerHTML.indexOf("word") != -1) {
            postsContainer.innerHTML = `<p>Sorry, could not load content. Please refresh the page, or try again later.</p>
                                        <button class="refresh-btn">REFRESH</button>`;
                                        const refreshBtn = document.querySelector(".refresh-btn");
                                        refreshBtn.onclick = function() {
                                            location.reload();
                                        };
        };
    };
};

getPosts();