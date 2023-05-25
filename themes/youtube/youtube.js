// Hides the "third recommended video" from the related videos section.
// Just detects when there's a video with the "New" label that has less than 1K views.
// Could be edge cases when watching low viewcount videos but it's good enough.
setInterval(function () {
    const hideVideo = (element) => {
        element.style.display = "none";
    }
    const isVideoHidden = (element) => {
        return element.style.display === "none";
    }
    const videoWasChecked = (element) => {
        return element.hasAttribute("data-view-count");
    }

    const videoIsSus = (element) => {
        const badge = element.querySelector("ytd-badge-supported-renderer .badge span");
        if (!badge) {
            return false;
        }

        const badgeText = badge.innerText.trim().toLowerCase();

        if (badgeText === "new") {
            console.log("New video found.");
            return true;
        }

        if (badgeText === "live") {
            console.log("Live video found.");
            return true;
        }

        console.log("Video with badge " + badgeText + " found.")
        return false;
    }

    const getViewCount = (element) => {
        const viewCountElement = element.querySelector("#metadata-line span.ytd-video-meta-block:first-of-type");
        if (!viewCountElement) {
            console.log("We got no viewcount on " + element);
            return 0;
        }

        const viewCountText = viewCountElement.innerText;
        const parsedNumber = parseFloat(viewCountText);
        if (isNaN(parsedNumber)) {
            console.log("We got NaN viewcount on " + element);
            return 0;
        }

        if (viewCountText.includes('M')) {
            return parsedNumber * 1000000;
        } else if (viewCountText.includes('K')) {
            return parsedNumber * 1000;
        } else {
            return parsedNumber;
        }
    }

    const VIEW_COUNT_THRESHOLD = 9999;
    const list = document.querySelectorAll("ytd-watch-next-secondary-results-renderer ytd-compact-video-renderer");
    const array = Array.from(list);

    array
        .filter((element) => !isVideoHidden(element) && !videoWasChecked(element))
        .forEach((element) => {
            const viewCount = getViewCount(element);

            if (viewCount <= VIEW_COUNT_THRESHOLD) {
                if (videoIsSus(element)) {
                    console.log("Element with " + viewCount + " view(s) removed.");
                    hideVideo(element);
                } else {
                    console.log("Element with " + viewCount + " view(s) kept.");
                    element.setAttribute("data-view-count", viewCount);
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
