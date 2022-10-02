//Creates comment data from form and sends it to https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/comments
export function addComment() {

    const addCommentBtn = document.querySelector(".add-comment-btn");
    

    if (addCommentBtn) {

        addCommentBtn.addEventListener("click", function(event) {

            event.preventDefault();

            const queryString = document.location.search;
            const param = new URLSearchParams(queryString);
            const id = param.get("id");

            //COMMENT DATA
            let commentData = {
                "author_name": document.querySelector(".name").value,
                "author_email": document.querySelector(".email").value, 
                "content": document.querySelector(".message").value,
                "post": `${id}`,
            };

            //CREATE HEADER AND SEND COMMENTDATA
            let createComment = new XMLHttpRequest();
            createComment.open("POST", "https://gamehub-wp-api.one/mhpb-blogg-content/wp-json/wp/v2/comments");
            createComment.setRequestHeader("content-type", "application/json;charset=UTF-8");
            createComment.send(JSON.stringify(commentData));

            //ERROR HANDLING
            const errorMessage = document.querySelector(".error-message");
            const success = document.querySelector(".success-message");
            createComment.onreadystatechange = function() {

                if (createComment.readyState == 4) {

                    if(createComment.status == 201) {

                        success.style.display = "flex";
                        errorMessage.style.display = "none";

                    } else {

                        errorMessage.style.display = "block";
                        errorMessage.innerHTML = `<p class="error-text">Your comment was not sent. All fields are required.</p>`;

                    } if(createComment.status == 409) {

                        errorMessage.innerHTML = `<p class="error-text">
                                                     Sorry! Looks like you already submitted this comment.
                                                     Due to spam prevention, you cannot leave duplicate messages.
                                                  </p>`;
                    };
                };
            };
        });
        
        const successBtn = document.querySelector(".coment-success-btn");

        successBtn.addEventListener("click", function() {
            
            location.reload();
        });
    };
};