var payMethod;
function goBack(){
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function init() {
    $('#goBack').on('touchend', goBack);
}

function updateCost(cost){
	document.getElementById("Cost").innerHTML = cost + " $";
}

function confirm(){
	$('#goConfirm').on('touchend', test);
}

function test(){
	console.log("fddfdffdf");
}

function getPaymentMethod(){
	plus.webview.show("paypal", "pop-in");
//  if (document.getElementById('1').checked) {
//  	payMethod=document.getElementById('1').value;
//	} else if (document.getElementById('2').checked){
//		payMethod=document.getElementById('2').value;
//		alert("Paypal Selected");
//		
//	} else if (document.getElementById('3').checked){
//		payMethod=document.getElementById('3').value;
//	}else if (document.getElementById('4').checked){
//		payMethod=document.getElementById('4').value;
//	}
}


