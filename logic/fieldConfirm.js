var orderlist = [];
var displayedCost = 0; //The variable to record the total cost for the order
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
	displayedCost = 0;//Clear Previous Record
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
		displayedCost = displayedCost + costVisual;//Calculate the Total Cost
		
		var d = new Date(Date.UTC(timeStart[0],timeStart[1]-1,timeStart[2]));
//		console.log(d.getFullYear());
		order.weekday = weekday[(d.getDay()+1)%7];
		Orders.push(order);
	}
	document.getElementById("totalCost").innerHTML = displayedCost + " $";
	plus.webview.getWebviewById('paypage').evalJS("updateCost('"+ displayedCost +"');");
	return Orders;
}


//Submit the order and send it to the backend server to book the field
function submit() {
	var Url = "https://socceredge.info/api/field/field_booking/create_booking";
	for (var i=0; i<orderlist.length; i++){
		var order = JSON.stringify(orderlist[i]);
//		console.log(order);
		mui.ajax(Url, {
			type: "post",
			timeout: 10000,
			async: false,
			data: order,
	        success: function (data) {
	        	//Notice: Maybe there is also a different response like NETWORKERROR?
		        if(data != "FAIL"){
		        	console.log(data);//Display the booking ID for this order
		        	//plus.webview.getWebviewById('personalMain').evalJS("addBooking('"+ orderlist[i] +"');");//update the bookings in personal Page  
		        	plus.webview.getWebviewById('paypal').evalJS("setBookingID('"+ data +"');");        	
					//plus.webview.getWebviewById('paypal').evalJS("updatePaypalCost('"+ displayedCost +"');");
					plus.webview.show("paypage", "pop-in");
		        } else {
		        	alert(data);//Fail Alert
		        }
	        },
	        error: function (xhr, type) {
	            alert(type);
	        }
		});
	}
}
