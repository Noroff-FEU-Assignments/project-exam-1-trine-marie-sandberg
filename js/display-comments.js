//Display comments from https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/comments
const commentsContainer = document.querySelector(".comments-container");
const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const postId = param.get("id");
export async function displayComments() {
    
    try {
        
        let getComment = await fetch("https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/comments");
        let comments = await getComment.json();
        
        for(let i = 0; i < comments.length; i++) {

            if(comments[i].post == postId) {
                commentsContainer.innerHTML += `<div class="comment-section-content">
                                                   <div class="flex-wrap">
                                                      <p>${comments[i].author_name}</p>
                                                      <p>${comments[i].date}</p>
                                                   </div>
                                                   <p>${comments[i].content.rendered}</p>
                                                </div>`;
            };
        };

    } catch(error) {

        console.log(error)
    };
};