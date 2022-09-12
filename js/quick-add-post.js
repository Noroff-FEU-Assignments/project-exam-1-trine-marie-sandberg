export function addPost() {
    const quickPostButton = document.querySelector(".quick-post-button");
    const quickPostInputTitle = document.querySelector(".quick-post-title");
    const quickPostInputContent = document.querySelector(".quick-post-content");

    if (quickPostButton) {
        quickPostButton.addEventListener("click", function() {
            event.preventDefault();
            let quickPostData = {
                "title": document.querySelector(".quick-post-title").value, 
                "content": document.querySelector(".quick-post-content").value,
                "status": "publish"
            }

            let createPost = new XMLHttpRequest();
            createPost.open("POST", "http://localhost/mhpb-blogg-content/wordpress-6.0.2/wordpress/wp-json/wp/v2/posts");
            createPost.setRequestHeader("content-type", "application/json;charset=UTF-8");
            //createPost.setRequestHeader("X-WP-Nonce", userData.nonce)
            createPost.send(JSON.stringify(quickPostData));
        })
    }
}