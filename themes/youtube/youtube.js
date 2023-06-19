document.addEventListener('DOMContentLoaded', function () {
    // Hides the "third recommended video" from the related videos section.
    // Just detects when there's a video with the "New" label that has less than 10K views.
    // Could be edge cases when watching low viewcount videos but it's good enough.
    // NOTE: This also removes livestreams with less than 1K views.
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

        const getVideoBadgeText = (element) => {
            const badge = element.querySelector(".secondary-metadata > ytd-badge-supported-renderer .badge span");
            if (!badge) {
                return false;
            }

            return badge.innerText.trim().toLowerCase();
        }

        const getViewCount = (element) => {
            const viewCountElement = element.querySelector("#metadata-line span.ytd-video-meta-block:first-of-type");
            if (!viewCountElement) {
                return 0;
            }

            const viewCountText = viewCountElement.innerText;
            const parsedNumber = parseFloat(viewCountText);
            if (isNaN(parsedNumber)) {
                console.log(`Got NaN trying to parse view count "${viewCountText}"`);
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
        const LIVESTREAM_VIEW_COUNT_THRESHOLD = 999;
        const list = document.querySelectorAll("ytd-watch-next-secondary-results-renderer ytd-compact-video-renderer");
        const array = Array.from(list);

        array
            .filter((element) => !isVideoHidden(element) && !videoWasChecked(element))
            .forEach((element) => {
                const viewCount = getViewCount(element);

                if (viewCount <= VIEW_COUNT_THRESHOLD) {
                    const videoBadgeText = getVideoBadgeText(element);
                    
                    if (videoBadgeText === "new") {
                        console.log(`New video found. Removing at ${viewCount} view(s).`);
                        hideVideo(element);
                    } else if (videoBadgeText === "live") {
                        if (viewCount <= LIVESTREAM_VIEW_COUNT_THRESHOLD) {
                            console.log(`Live video found. Removing at ${viewCount} view(s).`);
                            hideVideo(element);
                        } else {
                            console.log(`Live video found. Keeping at ${viewCount} view(s).`);
                            element.setAttribute("data-view-count", viewCount);
                        }
                    } else if (videoBadgeText !== false) {
                        console.log(`Video with badge text "${videoBadgeText}" found. Logging element and keeping.`)
                        console.log(element);
                        element.setAttribute("data-view-count", viewCount);
                    } else if (videoBadgeText === false) {
                        console.log(`Video with no badge text found. Keeping at ${viewCount} view(s).`);
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
});
