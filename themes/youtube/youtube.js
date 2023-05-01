function convertToNumber(str) {
    const parsedNumber = parseFloat(str);
    if (isNaN(parsedNumber)) {
        return 0;
    }

    if (str.includes('M')) {
        return parsedNumber * 1000000;
    } else if (str.includes('K')) {
        return parsedNumber * 1000;
    } else {
        return parsedNumber;
    }
}

// Hides the "third recommended video" from the related videos section.
// Just detects when there's a video with the "New" label that has less than 1K views.
// Could be edge cases when watching low viewcount videos but it's good enough.
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
