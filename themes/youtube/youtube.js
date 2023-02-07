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
