const postsContainer = document.querySelector(".posts-container");

export function postsButtons() {
    //NEXT BUTTON
const nextBtn = document.querySelector(".round-next-btn");
let page = 1;

nextBtn.onclick = function nextPage() {
    page++

    if(page > 3) {
        page = 1;
    };

    async function nextPage() {
        console.log(page)

        try {
            
            let nextUrl = `https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?page=${page}&_embed`;
            let nextResponse = await fetch(nextUrl);
            let nextJson = await nextResponse.json();
            console.log(nextJson);

            postsContainer.innerHTML = "";
            for(let i = 0; i < nextJson.length; i++) {
                postsContainer.innerHTML += `<a href="single-post.html?id=${nextJson[i].id}">
                <div class="flex-wrap post-cover">
                    <img src="${nextJson[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${nextJson[i]._embedded['wp:featuredmedia'][0].alt_text}" class="post-cover-img">
                    <div class="post-cover-text">
                        <h2 class="post-cover-h2">${nextJson[i].title.rendered}</h2>
                        <p class="post-cover-prev">${nextJson[i].excerpt.rendered}</p>
                    </div>
                </div>
             </a>`;
            };

        } catch(error) {
            console.log(error);
        };
    };

    nextPage()
};

//PREVIOUS BUTTON
const previousBtn = document.querySelector(".round-previous-btn");

previousBtn.onclick = function nextPage() {

    page--
 
    if(page < 1) {
        page = 3
    };

    async function nextPage() {
        console.log(page)

        try {
            
            let nextUrl = `https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?page=${page}&_embed`;
            let nextResponse = await fetch(nextUrl);
            let nextJson = await nextResponse.json();
            console.log(nextJson);

            postsContainer.innerHTML = "";
            for(let i = 0; i < nextJson.length; i++) {
                postsContainer.innerHTML += `<a href="single-post.html?id=${nextJson[i].id}">
                <div class="flex-wrap post-cover">
                    <img src="${nextJson[i]._embedded['wp:featuredmedia'][0].source_url}" alt="${nextJson[i]._embedded['wp:featuredmedia'][0].alt_text}" class="post-cover-img">
                    <div class="post-cover-text">
                        <h2 class="post-cover-h2">${nextJson[i].title.rendered}</h2>
                        <p class="post-cover-prev">${nextJson[i].excerpt.rendered}</p>
                    </div>
                </div>
             </a>`;
            };
            
            
        } catch(error) {
            console.log(error);
        };
    };

    nextPage()
};
};