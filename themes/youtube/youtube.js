'use strict';
// Hides the "third recommended video" from the related videos section.
// Just detects when there's a video with the "New" label and hides it.
// NOTE: This also removes livestreams.
const hideThirdRecommendedVideo = () => {
    const hideVideo = (element) => {
        element.style.display = "none";
    }
    const unhideVideo = (element) => {
        element.style.display = "block";
    }
    const isVideoHidden = (element) => {
        return element.style.display === "none";
    }
    const videoWasChecked = (element) => {
        return element.hasAttribute("data-view-count");
    }

    const getVideoBadgeText = (element) => {
        const badge = element.querySelector(".secondary-metadata > ytd-badge-supported-renderer .badge p");
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
    const list = document.querySelectorAll("ytd-watch-next-secondary-results-renderer ytd-compact-video-renderer");
    const array = Array.from(list);

    array
        .forEach((element) => {
        const viewCount = getViewCount(element);
        const videoBadgeText = getVideoBadgeText(element);

        if (videoBadgeText === "new" && !isVideoHidden(element)) {
            hideVideo(element);
            element.setAttribute("data-view-count", viewCount);

            console.log(`New video found. Removing at ${viewCount} view(s).`);
        } else if (videoBadgeText === "live" && !isVideoHidden(element)) {
            hideVideo(element);
            element.setAttribute("data-view-count", viewCount);

            console.log(`Live video found. Removing at ${viewCount} view(s).`);
        } else if (!videoWasChecked(element)) {
            if (videoBadgeText !== false) {
                console.log(`Video with badge text "${videoBadgeText}" found. Logging element and keeping.`)
                console.log(element);
            } else if (videoBadgeText === false) {
                console.log(`Video with no badge text found. Keeping at ${viewCount} view(s).`);
            }

            element.setAttribute("data-view-count", viewCount);
        } else if (videoWasChecked(element) && isVideoHidden(element) && videoBadgeText !== "new" && videoBadgeText !== "live") {
            unhideVideo(element);
            console.log(`Video with ${viewCount} view(s) found. Unhiding.`);
        }
    });
};

// Replace "X years ago" upload date with the actual date.
const replaceUploadDate = () => {
    const expandedDescriptionElement = document.querySelector("#info-strings > :nth-child(2)");
    const expandedDescriptionText = expandedDescriptionElement.innerText.trim();

    if (!expandedDescriptionText.includes(",")) {
        return;
    }

    const collapsedDescriptionElement = document.querySelector("#info-container #info > span:nth-child(3)");
    const collapsedDescriptionText = collapsedDescriptionElement.innerText.trim();

    if (!collapsedDescriptionText.includes(expandedDescriptionText)) {
        collapsedDescriptionElement.innerHTML = `${expandedDescriptionText} (${collapsedDescriptionText})`;
    }
};

const hideViewCounts = () => {
    const viewCountRegex = /(\d{1,3}(,\d{3})*|\d+)(\.\d+)?(M|K)? views/g;
    const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let currentNode;

    while (currentNode = allTextNodes.nextNode()) {
        textNodes.push(currentNode);
    }

    textNodes
        .filter((node) => {
            return viewCountRegex.test(node.nodeValue);
        })
        .forEach((node) => {
            node.parentNode.style.display = 'none';
        });
}

const hideSubscriberCount = () => {
    const subscriberCountRegex = /(\d{1,3}(,\d{3})*|\d+)(\.\d+)?(M|K)? subscribers/g;
    const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let currentNode;

    while (currentNode = allTextNodes.nextNode()) {
        textNodes.push(currentNode);
    }

    textNodes
        .filter((node) => {
            return subscriberCountRegex.test(node.nodeValue);
        })
        .forEach((node) => {
            node.parentNode.style.display = 'none';
        });
}

const targetNode = document.querySelector("ytd-page-manager");
const callback = () => {
    hideViewCounts();
    hideSubscriberCount();
    hideThirdRecommendedVideo();
    replaceUploadDate();
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, { childList: true, subtree: true });
