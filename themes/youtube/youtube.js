function convertToNumber(str) {
    if (str.includes('M')) {
        return parseFloat(str) * 1000000;
    } else if (str.includes('K')) {
        return parseFloat(str) * 1000;
    } else {
        return parseFloat(str);
    }
}

setInterval(function () {
    const list = document.querySelectorAll("ytd-watch-next-secondary-results-renderer ytd-compact-video-renderer");
    const array = Array.from(list);
    
    array.forEach((element) => {
        const viewCountElement = element.querySelector("#metadata-line span.ytd-video-meta-block:first-of-type");
        const viewCount = viewCountElement.innerText;
        const viewCountNumber = convertToNumber(viewCount);
        
        if (viewCountNumber < 1000) {
            const badge = element.querySelector(".badge span");
            if (badge && badge.innerText.trim() === "New") {
               element.style.display = "none";
            }
        }
    });
}, 1000);

// Replace "X years ago" upload date with the actual date.
setInterval(function () {
    const expandedDescriptionElement = document.querySelector("#info-strings > :nth-child(2)");
    const expandedDescriptionText = expandedDescriptionElement.innerText.trim();
    
    if (!expandedDescriptionText.includes(",")) {
    	return;
    }

    const collapsedDescriptionElement = document.querySelector("#info-container #info > span:nth-child(3)");
    const collapsedDescriptionText = collapsedDescriptionElement.innerText.trim();
    
    if (!collapsedDescriptionText.includes(expandedDescriptionText)) {
        collapsedDescriptionElement.innerHTML = `${expandedDescriptionText} (${collapsedDescriptionElement.innerText})`;
    }
}, 1000);
