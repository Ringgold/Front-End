var payMethod;
function goBack(){
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function init() {
    $('#goBack').on('touchend', goBack);
    $('#goConfirm').on('touchend', getPaymentMethod);
}

function updateCost(cost){
	document.getElementById("Cost").innerHTML = cost + " $";
}

function getPaymentMethod(){
    if (document.getElementById('1').checked) {
	} else if (document.getElementById('2').checked){
		plus.webview.show("paypal", "pop-in");
		console.log("Paypal Selected");
		
	} else if (document.getElementById('3').checked){
		
	} else if (document.getElementById('4').checked){
		
	}
}
