I generally dislike seeing social comments and stats (views, sub count, vote counts, trending bars, ect.) because I find that it influences my mood and also my likelihood to watch/subscribe to certain content.

These scripts hide most of those elements on the social media platforms I use.

I use [User Javascript and CSS](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?hl=en) to apply these styles (and sometimes scripts).

## Why is the Javascript run in `setInterval()` functions?

A lot of elements are loaded dynamically, so I have to wait for them to load before I can hide them.

On top of that, pages sometimes aren't re-loaded even when they may look like it. For instance, clicking on a video on the youtube home page isn't the same as manually going to that video via the url bar, the former doesn't "load" a new page.

I use setInterval to check for the elements repeatedly. Note that the code run has to be idempotent.
