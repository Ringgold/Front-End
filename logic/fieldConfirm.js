function goBack() {
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function goPay() {
    plus.webview.show("payPage", "pop-in");
}

function init() {
    $('#goBack').on("touchend", goBack);
    $('#confirm').on("touchend", goPay);
}

function showOrders() {
	
}
