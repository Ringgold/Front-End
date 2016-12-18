function goBack() {
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function init() {
    $('#goBack').on('touchend', goBack);
}
