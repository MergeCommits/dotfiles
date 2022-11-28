// Parsing out view count in related videos.
setInterval(function () {
    const list = document.querySelectorAll(".ytp-videowall-still-info-author");
    const array = [...list];
    array.forEach((element) => {
        element.innerHTML = element.innerHTML.replace(/\s•.*/, "");
    });
}, 1000);

// Replace "X years ago" upload date with the actual date.
setInterval(function () {
    const tooltip = document.querySelector("#info-container + tp-yt-paper-tooltip #tooltip");
    const text = tooltip.innerText.replace(/.*•\s/, "");

    const viewCount = document.querySelector("#info-container #info > span:nth-child(3)");

    if (viewCount.innerText.indexOf(",") === -1 && viewCount.innerText.innerText("streaming") === -1) {
        viewCount.innerHTML = `${text} (${viewCount.innerText})`;
        console.log(viewCount);
    }
}, 1000);
