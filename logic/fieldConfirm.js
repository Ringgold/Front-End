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
	orderlist = JSON.parse(orders);
	var orderTemp = reformat(orderlist);
	//console.log("value saved "+JSON.stringify(orderlist));
    var OrderList = window.JST.fieldConfirm({
        orders: orderTemp
    });
    $('#AllOrderList').empty();
    $('#AllOrderList').append($(OrderList));
}

//format infos of the order into visual content
function reformat(orderList){
	var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var Orders = [];
	
	for (var i=0; i<orderList.length; i++){
		var order = {};
		var timeStart = orderList[i].START_TIME.split("-");	// 0:year 1:month 2:day 3:hour 4:minute
		var timeEnd = orderList[i].END_TIME.split("-");
		var timeStartVisual = timeStart[3]+":"+timeStart[4];
		var timeEndVisual = timeEnd[3]+":"+timeEnd[4];
		var dateVisual = mon[timeStart[1]-1]+" "+timeStart[2]+", "+timeStart[0]//date
		var costVisual = orderList[i].TOTAL_COST;
		
		order.startTime = timeStartVisual;
		order.endTime = timeEndVisual;
		order.date = dateVisual;
		order.cost = costVisual;
		
		var d = new Date(timeStart[0]+"/"+timeStart[1]+"/"+timeStart[2]);
		console.log(d.getDate()+","+d.getDay());
		order.weekday = weekday[d.getDay()-1];
		Orders.push(order);
	}
	
	return Orders;
}



function submit() {
	var Url = "http://159.203.4.199:8080/field/field_booking/create_booking";
	for (var i=0; i<orderlist.length; i++){
		var order = JSON.stringify(orderlist[i]);
		console.log(order);
		mui.ajax(Url, {
			type: "post",
			timeout: 10000,
			async: false,
			data: order,
	        success: function (data) {
		        alert(data);
		        if(data == "SUCCESS"){
		        		plus.webview.show("fieldList", "pop-in");
		        }
	        },
	        error: function (xhr, type) {
	            alert(type);
	        }
		});
	}
}
