
function init() {
    $('#goBack').on("touchend", goBack);
}

function goBack() {
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function setupPage() {
	var paylink = getLink();
	var subpage = plus.webview.getWebviewById('paylink');
	subpage.loadURL(paylink);
}

function getLink() {
	var plink = "";
	Url = 'https://socceredge.info/api/paypal/payment/getPayUrlTest/1';
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
        		plink = data;},
        	error: function (xhr, type) {
            alert(type);}
	});
	console.log(plink);
	return plink;
}

function getFeedback() {
	
}
