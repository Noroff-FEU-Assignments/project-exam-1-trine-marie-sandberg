const postsUrl = "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?_embed";
const postsContainer = document.querySelector(".posts-container");
postsContainer.innerHTML = "<p>Loading . . .</p>"

async function getPosts() {

    try {

        let response = await fetch(postsUrl);
        let postJson = await response.json();
        console.log(postJson);

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
                                         </a>`
        }

    } catch(error) {
        console.log(error);
    };
}

getPosts();