var sendInfo = [];

function init() {
    $('#goBack').on("touchend", goBack);
    $('#goOrders').on("touchend", checkOrder)
}

//Call the function in FieldList to update the personal bookings
function checkOrder(){
	plus.webview.getWebviewById('fieldList').evalJS("getBookings();");
	plus.webview.show("personalMain", "pop-in");
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

function setBookingID(data){
	sendInfo.push(
		{payment_id: "", booking_id: data}
		);
	console.log('Booking ID updated as: ' + data);
}

function getLink() {
	var plink = "";
	Url = 'https://socceredge.info/api/paypal/payment/getPayUrl/';
	mui.ajax(Url, {
		type: "post",
		timeout: 10000,
		async: false,
		data: JSON.stringify(sendInfo),
        success: function (data) {
        	plink = data;
        },
        error: function (xhr, type) {
        	alert(type);
        }
	});
	console.log(plink);
	return plink;
}

function getFeedback() {
	
}
