const postsContainer = document.querySelector(".posts-container");
const postsCounter = document.querySelector(".posts-show-counter");

export function postsButtons() {

//NEXT BUTTON
const nextBtn = document.querySelector(".round-next-btn");
let page = 1;

nextBtn.onclick = function nextPage() {
    
    page++
    postsCounter.innerHTML = `<p>Page ${page}</p>`;

    if(page > 3) {

        page = 1;
        postsCounter.innerHTML = `<p>Page ${page}</p>`;
    };

    async function nextPage() {

        try {
            
            let nextUrl = `https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?page=${page}&_embed`;
            let nextResponse = await fetch(nextUrl);
            let nextJson = await nextResponse.json();

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
    postsCounter.innerHTML = `<p>Page ${page}</p>`;
 
    if(page < 1) {

        page = 3;
        postsCounter.innerHTML = `<p>Page ${page}</p>`;
    };

    async function nextPage() {

        try {
            
            let nextUrl = `https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?page=${page}&_embed`;
            let nextResponse = await fetch(nextUrl);
            let nextJson = await nextResponse.json();

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

//SHOW MORE
const showMoreBtn = document.querySelector(".show-more-btn");

showMoreBtn.onclick = async function showMore() {

    page ++;
    if(page > 3) {

        postsContainer.innerHTML += "<h2>You have come to the end of the post archive. New posts are added each week.</h2>";
    };

    try {
        
        let nextUrl = `https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?page=${page}&_embed`;
        let nextResponse = await fetch(nextUrl);
        let nextJson = await nextResponse.json();

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
};

//TO TOP
const toTop = document.querySelector(".to-top-btn");

toTop.onclick = function() {

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};