let searchBar = document.querySelector("#search");
const allPostsUrl = `https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/posts?per_page=22`;
let filterArray = [];
let postArray = [];
const searchListContainer = document.querySelector(".search-list-container");
searchBar.addEventListener("keyup", search);

function search(event) {
    const searchString = event.target.value;

            let filteredPosts = postArray.filter(post => {
                return post.title.rendered.includes(searchString)
        });
        searchListContainer.style.display = "block"
        postList(filteredPosts)
        console.log(filteredPosts)
};

    async function getPosts() {

    try {

        const getPosts = await fetch(allPostsUrl);
        postArray = await getPosts.json();
           
       console.log(postArray)

    } catch(error) {
        console.log(error)
    }};
    
    getPosts();

       const postList = (postArray) => {
           const htmlString = postArray.map((post) => {
               return `<a href="single-post.html?id=${post.id}">
                          <li>
                             <h2>${post.title.rendered}</h2>
                             <p>${post.slug}</p>
                          </li>
                        <a>`;
           })
           .join("");
           searchListContainer.innerHTML = htmlString;
       };    