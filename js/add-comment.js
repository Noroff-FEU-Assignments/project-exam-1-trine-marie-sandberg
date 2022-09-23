//Creates comment data from form and sends it to https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/comments
export function addComment() {

    const addCommentBtn = document.querySelector(".add-comment-btn");
    const commentsContainer = document.querySelector(".comments-container");

    if (addCommentBtn) {

        addCommentBtn.addEventListener("click", function(event) {

            event.preventDefault();

            const queryString = document.location.search;
            const param = new URLSearchParams(queryString);
            const id = param.get("id");

            //COMMENT DATA
            let commentData = {
                "author_name": document.querySelector(".comment-author").value,
                "author_email": document.querySelector(".comment-email").value, 
                "content": document.querySelector(".comment-content").value,
                "post": `${id}`,
            };

            let createComment = new XMLHttpRequest();
            createComment.open("POST", "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/comments");
            createComment.setRequestHeader("content-type", "application/json;charset=UTF-8");
            createComment.send(JSON.stringify(commentData));
            console.log(commentData)

            //ERROR HANDLING
            createComment.onreadystatechange = function() {

                if (createComment.readyState == 4) {
                    if(createComment.status == 201) {
                        alert("success!");
                    } else {alert("Error, please try again")}
                };
            };
        });

        //DISPLAY COMMENTS
        async function displayComments() {

            try {

                let getComment = await fetch("https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/comments");
                let comments = await getComment.json();

                for(let i = 0; i < comments.length; i++) {

                    //console.log(comments[i])
                    commentsContainer.innerHTML += `<p>${comments[i].content.rendered}</p>`;
                }

            } catch(error) {

                console.log(error)
            }
        };

        displayComments();
         
    };
};