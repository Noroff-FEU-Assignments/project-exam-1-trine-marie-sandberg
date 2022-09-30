export function postCards(cardObject) {

    const postContainer = document.querySelector(".post-card-container");

    postContainer.innerHTML += `<a href="single-post.html?id=${cardObject.postId}">
    <div class="post-card">
    <img src="${cardObject.imgUrl}" class="card-img">
    <h3>${cardObject.title}</h3>
    </div>
    </a>`
};