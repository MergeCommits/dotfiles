const getAllPostsArray = () => {
    const allPosts = document.querySelector('[data-scroller-first]').parentNode.children;
    return allPosts;
}

const detectPromotedPosts = (postTextContent) => {
    return postTextContent.includes('•promoted');
}

setInterval(() => {
    let allPosts = getAllPostsArray();
    for (let post of allPosts) {
        if (detectPromotedPosts(post.textContent)) {
            post.remove();
        }
    }
}, 1000);
