var orderlist = [];
function goBack() {
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function goPay() {
    plus.webview.show("payPage", "pop-in");
}

function init() {
	
    $('#goBack').on("touchend", goBack);
    $('#confirm').on("touchend", submit);
}

function showOrders(orders) {
	var orderlist = JSON.parse(orders);
//	var orderTemp = reformat(orderlist);
	console.log(orderlist);
//  var OrderList = window.JST.fieldConfirm({
//      orders: orderTemp
//  });
//  $('#AllOrderList').empty();
//  $('#AllOrderList').append($(OrderList));
}

//format infos of the order into visual content
function reformat(orderList){
	var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var d = new Date();
	//buffer initialization
	var Orders = [];//array
	var order = {};//object
	
	for (var i=0; i<orderList.length; i++){
		var timeStart = orderList[i].START_TIME.split("-");	// 0:year 1:month 2:day 3:hour 4:minute
		var timeEnd = orderList[i].END_TIME.split("-");
		
		var timeStartVisual = timeStart[3]+":"+timestart[4];
		var timeEndVisual = timeEnd[3]+":"+timeEnd[4];
		var dateVisual = mon[timeStart[1]+1]+" "+timeStart[1]+", "+timeStart[0]//date
		var costVisual = orderList[i].TOTAL_COST;
		
		order.startTime = timeStartVisual;
		order.endTime = timeEndVisual;
		order.date = dateVisual;
		order.cost = costVisual;
		
		//d.setDate(timeStart[2]+0);//get order's data
		//order.weekday = weekday[d.getDay()];
		Orders.push(order);
	}
	
	return Orders;
}



function submit() {
	var Url = "http://159.203.4.199:8080/field/field_booking/create_booking"; // Server Address
	//var Url = "http://142.157.164.145:8080/field/field_booking/create_booking"; //David Liu's Address
	//for (var i; i<orderlist.length; i++){
		var order = JSON.stringify(orderlist[0]);
		console.log(order);
		mui.ajax(Url, {
		type: "post",
		timeout: 10000,
		async: false,
		data: order,
        success: function (data) {
	        console.log(data);
	        
        },
        error: function (xhr, type) {
            alert(type);
        }
		});
	//}
}
