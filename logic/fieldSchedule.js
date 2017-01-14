var field_info = [[],[],[]];
var field_type = [0,0,0];	//
var Tables = [];
var checkBox;
var timeline, timefirst, timelast, timelen;
var typebar3, typebar7, typebar11;
var currentType3, currentType7, currentType11;
var timebox_moved = false;
var table_moved = false;
var months = [];
var days = [];
var daysOfWeek = [];

function goBack() {
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function goConfirm() {
	var orders = getOrder();
	plus.webview.getWebviewById('fieldConfirm').evalJS("showOrders('"+ orders +"');");
    plus.webview.show("fieldConfirm", "pop-in");
}

function pulldownRefresh() {
	setTimeout(function(){
		getTime();
		mui("#pullrefresh").pullRefresh().endPulldownToRefresh();
	},1000);
}

function goCheckBox(e){
	if(table_moved){
		table_moved = false;
		return;
	}
	var sender = (window.event && window.event.srcElement) || e.target;
	var row = $(sender).parent().parent().index()-1;
	var column = $(sender).parent().index()-1;
	var timeindex = localStorage.getItem("timebox_index");
	if(column == 0) {
		var typeindex = currentType3;
	} else if(column == 1) {
		var typeindex = currentType7;
	} else if(column == 2) {
		var typeindex = currentType11;}
	// color change and Tables update
	if (sender.style.backgroundColor == 'rgb(143, 195, 31)'){	//green
		sender.style.backgroundColor = 'rgb(255, 255, 255)';		//white
		Tables[column][typeindex][timeindex][row] = 0;
	}
	else if(sender.style.backgroundColor == 'rgb(255, 255, 255)'){	//white
		sender.style.backgroundColor = 'rgb(143, 195, 31)';			//green
		Tables[column][typeindex][timeindex][row] = -1;
	}
	// price update
	setPrice();
//	var price = field_info[column][typeindex].PriceInfo[0].PRICE;
//	var currentPrice = parseInt($("#price").text());
//	if (sender.style.backgroundColor == 'rgb(143, 195, 31)') {
//		$("#price").text((currentPrice+price).toString());
//	} else if(sender.style.backgroundColor == 'rgb(255, 255, 255)') {
//		$("#price").text((currentPrice-price).toString());
//	}
}
function timeboxHandlers() {
	var items = $(".os-time-box");
    for (i=0; i<items.length; i++) {
    		items[i].addEventListener("touchend", touchEnd, false);
        items[i].addEventListener("touchmove", setMove, false);
    }
}
function touchEnd(e) {
	if(timebox_moved){
		timebox_moved = false;
		return;
	}
	// touchHandlers
	var sender = (window.event && window.event.srcElement) || e.target;
	var items = $(".os-time-box");
    for (i = 0; i < items.length; i++) {
        items[i].style.borderWidth = "0px";
        items[i].style.color = "gray";
	}
	sender.style.borderWidth = "thin";
    sender.style.color = "white";
    for(i = 0; i < items.length; i++) {
    		if(items[i].style.color == "white") {
    			localStorage.setItem("timebox_index",i+"");}
    }
    // refresh tables
	var timeindex = localStorage.getItem("timebox_index");
	setTable(3,currentType3,timeindex);
   	setTable(7,currentType7,timeindex);
   	setTable(11,currentType11,timeindex);
   	setPrice();
}
function setMove() {
	timebox_moved = true;
}

function setData_TypeBar(type) {
	var index = parseInt(Math.sqrt(type))-1;
	var temp = [];
	if(field_info[index].length == 0) {
		var obj = {value: '0', text: 'Null'};
		temp.push(obj);
	} else {
		for(var i=0; i<field_info[index].length; i++) {
			if(index == 0){
				var obj = {value: i.toString(), text: '3v3 '+(i+1)};	
			} else if(index == 1){
				var obj = {value: i.toString(), text: '7v7 '+(i+1)};
			} else if(index == 2){
				var obj = {value: i.toString(), text: '11v11 '+(i+1)};
			}
			temp.push(obj);
		}
	}
	return temp;
}
function buildTypeBar(column3, column7, column11) {
	var timeindex = localStorage.getItem("timebox_index");
	// 3v3
	column3.setData(setData_TypeBar(3));
	$('#type3').on('touchend', function(){
		column3.show(function(items){
			currentType3 = parseInt(items[0].value);
			setTable(3,currentType3,timeindex);
			setPrice();
		});
	});
	// 7v7
	column7.setData(setData_TypeBar(7));
	$('#type7').on('touchend', function(){
		column7.show(function(items){
			currentType7 = parseInt(items[0].value);
			setTable(7,currentType7,timeindex);
			setPrice();
		});
	});
	// 11v11
	column11.setData(setData_TypeBar(11));
	$('#type11').on('touchend', function(){
		column11.show(function(items){
			currentType11 = parseInt(items[0].value);
			setTable(11,currentType11,timeindex);
			setPrice();
		});
	});
}

function init_week_table() {
	var table = [];
	for(x=0; x<7; x++) {
		var column = [];
		for(y=0; y<timelen; y++) {column.push(0);}
		table.push(column);
	}
	return table;
}

function randomString(len) {
	var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
	var max = chars.length;
	var str = "";
	for (i=0; i<len; i++) {
		str += chars.charAt(Math.floor(Math.random() * max));
	}
	return str;
}

function initTable(site_id) {
	// setup variables
	checkBox = $(".fieldSchedule_timebox");
	for (i=0; i<checkBox.length; i++) {
    		checkBox[i].addEventListener("touchend", goCheckBox, false);
        checkBox[i].addEventListener("touchmove", function(){table_moved = true;}, false);
        checkBox[i].style.backgroundColor = "gray";
	}
	timeline = $("span");
	timefirst = timeline[0].innerHTML.split(":");
	timelast = timeline[timeline.length-1].innerHTML.split(":");
	timelen = (timelast[0]-timefirst[0])*2 + parseInt((timelast[1]-timefirst[1])/30);
    currentType3 = 0, currentType7 = 0, currentType11 = 0;
    timeboxHandlers();
	// initialize field info
	field_info = [[],[],[]];
	field_type = [0,0,0];
	var Url = "http://159.203.4.199:8080/field/field/get_fields_by_site_id/" + site_id.toString();
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
        		data = JSON.parse(data);
        		for(i=0; i<data.length; i++) {
        			// convert 3,7,11 to 0,1,2
				var index = parseInt(Math.sqrt(data[i].TYPE))-1;
				field_info[index].push(data[i]);
				field_type[index] += 1;
			}
        },
        	error: function (xhr, type) {
            alert(type);
        }
	});
	for (var j=0;j<3;j++) {
		for (var k=0;k<field_info[j].length;k++) {
			var priceUrl = "http://159.203.4.199:8080/field/price/get_prices_by_field_id/" + field_info[j][k].ID.toString();
			mui.ajax(priceUrl, {
				type: "get",
				timeout: 10000,
				async: false,
		        success: function (data) {
			        	if (data != 'EMPTY') {
			        		field_info[j][k].PriceInfo = JSON.parse(data);
			        	}
		        },
		        	error: function (xhr, type) {
		            alert(type);
		        }	
			});
		}
	}

	//  initialize table with available field type
	for(i=0; i<field_type.length; i++) {
		if(field_type[i] > 0) {
			for(j=0; j<timelen; j++) {checkBox[(field_type.length)*j+i].style.backgroundColor = 'rgb(255, 255, 255)';}
		}
	}
	
	buildTypeBar(typebar3, typebar7, typebar11);
}

// Tables: [type][typebar][week][time]
function getTime() {
	var d = new Date();
	var table_3 = [], table_7 = [], table_11 = [];
	Tables = [];
	// init tables
	for(i=0; i<field_type.length; i++) {
		for(j=0; j<field_type[i]; j++) {
			if(i==0){
				table_3.push(init_week_table());}
			else if(i==1){
				table_7.push(init_week_table());}
			else if(i==2){
				table_11.push(init_week_table());}
		}
	}
	plus.nativeUI.showWaiting();
	for(var h=0; h<field_info.length; h++) {
		for(var l=0; l<field_info[h].length; l++) {
			var Url = "http://159.203.4.199:8080/field/field/get_bookings_by_field_id/" + field_info[h][l].ID.toString();
			var hasparent = field_info[h][l].hasOwnProperty("PARENT_ID");
			mui.ajax(Url, {
				type: "get",
				timeout: 10000,
				async: false,
		        success: function (data) {
		        	if(data != "EMPTY"){
		        		data = JSON.parse(data);
			        	for (var k=0 ;k<7; k++) {
			        		var Date = d.getFullYear() + "-" + months[k] + "-" + days[k];
						for(var i=0; i<data.length; i++) {
							if(data[i].START_TIME.indexOf(Date) > -1) {
								var timeStart = data[i].START_TIME.split("-");	// 0:year 1:month 2:day 3:hour 4:minute
								var timeEnd = data[i].END_TIME.split("-");
								var start_index = (timeStart[3]-timefirst[0])*2 + parseInt((timeStart[4]-timefirst[1])/30);
								var end_index = (timeEnd[3]-timefirst[0])*2 + parseInt((timeEnd[4]-timefirst[1])/30);
								if((start_index>=0) && (end_index>0) && (start_index<timelen) && (end_index<=timelen)) {
									for(j=start_index; j<end_index; j++) {
										if(h==0) {
											table_3[l][k][j] += 1;
										} else if(h==1) {
											table_7[l][k][j] += 1;
											if(hasparent) {
												var parentid = field_info[h][l].PARENT_ID;
												var index = field_info[2].map(function(x){return x.ID;}).indexOf(parentid);
												table_11[index][k][j] += 0.5;
											}
										} else if(h==2) {
											table_11[l][k][j] += 1;
										}
									}
								}
							}
						}
			        }
				}
		        	},
		        	error: function (xhr, type) {
		            alert(type);
		        },
			});
		}
	}
	Tables.push(table_3);
	Tables.push(table_7);
	Tables.push(table_11);
//	plus.nativeUI.closeWaiting();
	setTimeout(function(){plus.nativeUI.closeWaiting();},500);
}

function getOrder() {
	var Orders = [];
	var FIELD_SITE_ID = localStorage.getItem("fieldDetail_id");
	var USER_ID = localStorage.getItem("User_ID");
	var BOOKING_STATUS = 0;
	
	for(var i=0; i<field_info.length; i++) {
		for(var j=0; j<field_info[i].length; j++) {
			for(var k=0; k<7; k++) {
				var blocks = [];
				var selected = [];
				var START_TIME, END_TIME, TOTAL_COST;
				var hasparent, PARENT_ID;
				var FIELD_ID = field_info[i][j].ID;
				// set weekdays
				var d = new Date();
				d.setDate(d.getDate()+k);
				var weekday = d.getDay();
				if(weekday == 0) {weekday = 7;}
				// collect choosen boxes per column
				for(l=0; l<timelen; l++) {
					if(Tables[i][j][k][l] == -1) {selected.push(l);}
				}
				
				if(selected.length > 0) {
					// divide time periods
					var block = [];
					while(selected.length > 0) {
						block.push(selected[0]);
						if((selected[1]-selected[0]) > 1 || selected.length == 1) {
							blocks.push(block);
							block = [];
						}
						selected.shift();
					}
					for(var s=0; s<blocks.length; s++) {
						var order = {};
						var start = blocks[s][0];
						var end = blocks[s][blocks[s].length-1];
						var start_time = timeline[start].innerHTML.split(":");
						var end_time = timeline[end+1].innerHTML.split(":");
						START_TIME = d.getFullYear()+"-"+months[k]+"-"+days[k]+"-" + start_time[0] + "-" + start_time[1];
						END_TIME = d.getFullYear()+"-"+months[k]+"-"+days[k]+"-" + end_time[0] + "-" + end_time[1];
						TOTAL_COST = parseFloat(getPrice(i,j,weekday)) * blocks[s].length;
						order.ID = randomString(32);
						order.FIELD_ID = FIELD_ID;
						order.START_TIME = START_TIME;
						order.END_TIME = END_TIME;
						order.USER_ID = USER_ID; 
						order.TOTAL_COST = TOTAL_COST;
						order.BOOKING_STATUS = BOOKING_STATUS;			
						Orders.push(order);
						if (hasparent) {
							var secondorder = $.extend({}, order);
							secondorder.FIELD_ID = PARENT_ID;
							Orders.push(secondorder);	
						}
					}
				}
			}
		}
	}	
	console.log(JSON.stringify(Orders));
	return JSON.stringify(Orders);

}

function init() {
    $('#goBack').on("touchend", goBack);
    $('#goConfirm').on("touchend", goConfirm);
    typebar3 = new mui.PopPicker();
	typebar7 = new mui.PopPicker();
	typebar11 = new mui.PopPicker();
}

function setTable(type,typeindex,timeindex) {
	var t = parseInt(Math.sqrt(type))-1;
	if(Tables[t].length > 0) {
		// change checkbox back to white
		for(i=0; i<timelen; i++) {
			checkBox[(field_type.length)*i+t].style.backgroundColor = 'rgb(255, 255, 255)';}
		// fill up the table
		for(j=0; j<timelen; j++) {
			if(Tables[t][typeindex][timeindex][j] > 0) {
				checkBox[(field_type.length)*j+t].style.backgroundColor = 'rgb(255, 204, 0)'; //orange
			} else if(Tables[t][typeindex][timeindex][j] == -1) {
				checkBox[(field_type.length)*j+t].style.backgroundColor = 'rgb(143, 195, 31)'; //green
			}
		}
	}
}

function getPrice(j,k,weekday) {
	if(field_info[j][k].hasOwnProperty("PriceInfo")) {
		var priceinfo = field_info[j][k].PriceInfo;
		for(var l=0; l<priceinfo.length; l++) {
			if(priceinfo[l].DAYS_OF_WEEK.indexOf(weekday) > -1) {
				return priceinfo[l].PRICE;
			}
		}
	}
	return 0;
}
function setPrice() {
	var price = 0;
	var timeindex = localStorage.getItem("timebox_index");
	var D = new Date();
	D.setDate(D.getDate()+parseInt(timeindex));
	var weekday = D.getDay();
	if(weekday == 0) {weekday = 7;}
	
	for(i=0; i<checkBox.length; i++) {
		if(checkBox[i].style.backgroundColor == 'rgb(143, 195, 31)') {
			if(i%3 == 0) {
				price += getPrice(0,currentType3,weekday);
			} else if(i%3 == 1) {
				price += getPrice(1,currentType7,weekday);
			} else if(i%3 == 2) {
				price += getPrice(2,currentType11,weekday);
			}
		}
	}
	$("#price").text(price);
}

function setdate(index) {
	var d = new Date();
    var dd;
    var mon_display = [];
    var dow = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    for (i = 0; i < 7; i++) { //10 will be the number of date boxes in the page
        var mm = d.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm;
        }
        months[i] = mm;
        mon_display[i] = mon[d.getMonth()];
        dd = d.getDate();
        if (dd < 10) {
            dd = '0' + dd;
        }
        days[i] = dd;
        daysOfWeek[i] = dow[d.getDay()];
        d.setDate(d.getDate() + 1);
    } 
    
    var timebox = $(".os-time-box");
    for(var i=0; i<7; i++) {
    		timebox[i].style.borderWidth = "0px";
        timebox[i].style.color = "gray";
		timebox[i].innerHTML = daysOfWeek[i] + "<br>" + mon_display[i] + " " + days[i];
    }
    timebox[index].style.borderWidth = "thin";
    timebox[index].style.color = "white";
   	timebox[index].scrollIntoView(false);
   	
   	getTime();
   	setTable(3,0,index);
   	setTable(7,0,index);
   	setTable(11,0,index);
   	$("#price").text(0);
}
