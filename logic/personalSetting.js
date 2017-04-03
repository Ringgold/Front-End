
function personalSettingInit(){
	$("#goBack").on('touchend', goBack);
}


function goBack() {
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}