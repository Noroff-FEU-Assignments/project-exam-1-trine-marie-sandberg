        //DISPLAY COMMENTS
        const commentsContainer = document.querySelector(".comments-container");
        export async function displayComments() {

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