let searchBar = document.querySelector("#search");
const allPostsUrl = `https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?per_page=22&_embed`;
let filterArray = [];
let postArray = [];

const searchListContainer = document.querySelector(".search-list-container");
searchBar.addEventListener("keyup", search);

//FILTER POSTARRAY AFTER SEARCHBAR VALUE
function search(event) {

    const searchString = event.target.value;

            let filteredPosts = postArray.filter(post => {
                return post.title.rendered.includes(searchString);
        });

        searchListContainer.style.display = "block";
        postList(filteredPosts);
};

//CLOSE SEARCH WHEN CLICK OUTSIDE
window.addEventListener('mouseup',function(event) {

    if(event.target != searchBar && event.target.parentNode != searchBar){

        searchListContainer.style.display = 'none';
    };
});

//GET ALL POSTS
async function getPosts() {
    
    try {
        
        const getPosts = await fetch(allPostsUrl);
        postArray = await getPosts.json();

    } catch(error) {

        console.log(error);
    }};
    
getPosts();

//DISPLAY SEARCHRESULT
const postList = (postArray) => {
        
    const htmlString = postArray.map((post) => {

        let title = post.title.rendered;
        title.toLowerCase();
        
        return `<a href="single-post.html?id=${post.id}">
                   <div class="search-results-container">
                       <li>
                           <h2>${title}</h2>
                           <image src="${post._embedded['wp:featuredmedia'][0].source_url}" alt="" class="auto-img">
                       </li>
                    </div>
                <a>`;
           })
           .join("");

           searchListContainer.innerHTML = htmlString;
};    