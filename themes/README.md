I generally dislike seeing social comments and stats (views, sub count, vote counts, trending bars, ect.) because I find that it influences my mood and also my likelihood to watch/subscribe to certain content.

These scripts hide most of those elements on the social media platforms I use.

I use [Stylus](https://github.com/openstyles/stylus) to apply CSS and [Tampermonkey](https://www.tampermonkey.net/) for scripts.

## Why is the Javascript run in `setInterval()` functions?
There's a few occasions where the DOM is updated dynamically so I use setInterval to check for the elements repeatedly. Note that the code run has to be idempotent.
