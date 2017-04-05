//User Field Booking Info
var bookings = [];//Sync
var bookingsTemp = [];//Async


function init() {
	$('#person').on('touchend', function () {
    		plus.webview.getWebviewById('personalMain').evalJS("showTeams();");
    		plus.webview.show("personalMain", "pop-in");
        mui('.mui-off-canvas-wrap').offCanvas('close');
	});
	$('#list').on('touchend', function () {
        plus.webview.show("fieldList", "pop-in");
        mui('.mui-off-canvas-wrap').offCanvas('close');
   	});
    $('#showTeams').on('touchend', function () {
		plus.webview.show("Teams", "pop-in");
    		mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    $('#order').on('touchend', function () {
    		plus.webview.getWebviewById('Orders').evalJS("showOrders();");
		plus.webview.show("Orders", "pop-in");
    		mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    
    $('.sidebar_menu').on('touchend', function () {
        mui('.mui-off-canvas-wrap').offCanvas('show');
    });
    
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006,
        indicators: false
    });
}

function showOrders() {
	getBookings();
	var list = window.JST.orders({
		orders: bookings
	});
	var container = $('#Orders');
    container.empty();
    container.append($(list));
	changeStatus();
}

function getBookings(){
	var UserID = localStorage.getItem("User_ID");
	var Url = "https://socceredge.info/api/field/field_booking/getBookingByUserId/" + UserID;
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
	        if(data != "FAIL"){
		        	console.log("Personal Booking Acquired " + data);     		        	
		        	var orders = JSON.parse(data);
		        	var ordersTemp = [];
				//Save the Orders
	            for (var i = 0; i < orders.length; i++) {
	                var order = {};
	                order.id = orders[i].ID;
	                order.field = orders[i].FIELD_ID;
	                order.start = orders[i].START_TIME;
	                order.end = orders[i].END_TIME;
	                order.user = orders[i].USER_ID;
	                order.cost = orders[i].TOTAL_COST;
	                order.status = orders[i].BOOKING_STATUS;
	                ordersTemp.push(order);
	            }
	            //TODO
	            //fieldID -> fieldName
	            //start and end data&time -> data and start/end
	            bookings = ordersTemp;
	            bookingsTemp = ordersTemp;
	        } else {
	        		alert(data);//Fail Alert
	        }
        },
        error: function (xhr, type) {
            alert(type);
        }
	});
}

function pulldownRefresh() {
	setTimeout(function(){
		showOrders();
		mui("#pullrefresh").pullRefresh().endPulldownToRefresh();
	},1000);	
}

function changeStatus() {
	// change order status from number to content
    var status = $(".orderstatus");
	for(var i=0; i<status.length; i++){
		if($(status[i]).text() == "0") {
			$(status[i]).text("Not Paid");
			$(status[i]).css({'color':'red'});
		} else if($(status[i]).text() == "1") {
			$(status[i]).text("Paid");
			$(status[i]).css({'color':'green'});
		}
	}
}