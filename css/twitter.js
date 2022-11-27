setInterval(function () {
    $("div[data-testid=sidebarColumn]").hide();
    let primaryColumn = $("div[data-testid=primaryColumn]");
    primaryColumn.css("margin", 0);
    primaryColumn.css("width", "100%");
    primaryColumn.css("max-width", "100%");
}, 1000);
