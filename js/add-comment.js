export function addComment() {
    const addCommentBtn = document.querySelector(".add-comment-btn");
    const commentsContainer = document.querySelector(".comments-container");

    if (addCommentBtn) {
        addCommentBtn.addEventListener("click", function(event) {
            event.preventDefault();
            let quickPostData = {
                "author_name": document.querySelector(".quick-post-title").value, 
                "content": {"rendered": document.querySelector(".quick-post-content").value},
            }

            let createComment = new XMLHttpRequest();
            createComment.open("POST", "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/comments");
            createComment.setRequestHeader("content-type", "application/json;charset=UTF-8");
            //createComment.setRequestHeader("X-WP-Nonce", userData.nonce)
            createComment.send(JSON.stringify(quickPostData));
        })

        async function displayComments() {
            try {
                let getComment = await fetch("http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/comments");
                let comments = await getComment.json();

                for(let i = 0; i < comments.length; i++) {
                    //console.log(comments[i])
                    commentsContainer.innerHTML += `<p>${comments[i].content.rendered}</p>`;
                }
            } catch(error) {
                console.log(error)
            }
        }
        displayComments()
         
    }
}