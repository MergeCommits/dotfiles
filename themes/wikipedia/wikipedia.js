document.querySelectorAll("td").forEach(function (row) {
    if (row.innerText.indexOf("Nominated") > -1) {
        row.style.backgroundColor = "rgb(46,28,31)";
        row.style.color = "var(--text-color)";
    } else if (row.innerText.indexOf("Won") > -1) {
        row.style.backgroundColor = "rgb(24,38,31)";
        row.style.color = "var(--text-color)";
    }
});
