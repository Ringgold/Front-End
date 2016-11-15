var field_info = [[],[],[]];
var field_type = [0,0,0];
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
	if (sender.style.backgroundColor == 'rgb(143, 195, 31)'){ //green
		sender.style.backgroundColor = 'rgb(255, 255, 255)'; //white
	}
	else if(sender.style.backgroundColor == 'rgb(255, 255, 255)'){
		sender.style.backgroundColor = 'rgb(143, 195, 31)'; //green
	}
	//
	var click = e.originalEvent.changedTouches[0].clientX;
	var left3 = checkBox[0].getBoundingClientRect().left;
	var right3 = checkBox[0].getBoundingClientRect().right;
	var left7 = checkBox[1].getBoundingClientRect().left;
	var right7 = checkBox[1].getBoundingClientRect().right;
	var left11 = checkBox[2].getBoundingClientRect().left;
	var right11 = checkBox[2].getBoundingClientRect().right;
	if(click>left3 && click<right3) {
//		if (sender.style.backgroundColor == 'rgb(143, 195, 31)') {
//			$("#price").innerHTML = "$" + 10;
//		} else if(sender.style.backgroundColor == 'rgb(255, 255, 255)') {
//			$("#price").innerHTML = "$" + 3;
//		}
	} else if(click>left7 && click<right7) {
		
	} else if(click>left11 && click<right11) {
		
	}
//	console.log(click);
//	console.log(left3);
}
function Handlers() {
	var items = $(".os-time-box");
    for (i = 0; i < items.length; i++) {
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
	setTable(3,0,timeindex);
   	setTable(7,0,timeindex);
   	setTable(11,0,timeindex);
}
function setMove() {
	timebox_moved = true;
}

function buildTypeBar(column3, column7, column11) {
	var timeindex = localStorage.getItem("timebox_index");
	//
	var temp3 = [];
	if(field_info[0].length == 0) {
		var obj3 = {value: '0', text: 'Null'};
		temp3.push(obj3);
	} else {
		for(var i=0; i<field_info[0].length; i++) {
			var obj3 = {value: i.toString(), text: 'Three '+(i+1)};
			temp3.push(obj3);
		}
	}	
	column3.setData(temp3);
	$('#type3').on('touchend', function(){
		column3.show(function(items){
			currentType3 = parseInt(items[0].value);
			setTable(3,currentType3,timeindex);
		});
	});
	//
	var temp7 = [];
	if(field_info[1].length == 0) {
		var obj7 = {value: '0', text: 'Null'};
		temp7.push(obj7);
	} else {
		for(var i=0; i<field_info[1].length; i++) {
			var obj7 = {value: i.toString(), text: 'Seven '+(i+1)};
			temp7.push(obj7);
		}
	}
	column7.setData(temp7);
	$('#type7').on('touchend', function(){
		column7.show(function(items){
			currentType7 = parseInt(items[0].value);
			setTable(7,currentType7,timeindex);
		});
	});
	//
	var temp11 = [];
	if(field_info[2].length == 0) {
		var obj11 = {value: '0', text: 'Null'};
		temp11.push(obj11);
	} else {
		for(var i=0; i<field_info[2].length; i++) {
			var obj11 = {value: i.toString(), text: 'Eleven '+(i+1)};
			temp11.push(obj11);
		}
	}
	column11.setData(temp11);
	$('#type11').on('touchend', function(){
		column11.show(function(items){
			currentType11 = parseInt(items[0].value);
			setTable(11,currentType11,timeindex);
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
	var Url = "http://159.203.4.199:8080/field/field/get_fields_by_site_id/" + site_id.toString();
	for(i=0; i<checkBox.length; i++) {checkBox[i].style.backgroundColor = "gray";}
	field_info = [[],[],[]];
	field_type = [0,0,0];
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
        		data = JSON.parse(data);
        		for(i=0; i<data.length; i++) {
				var index = parseInt(Math.sqrt(data[i].TYPE))-1;
				field_info[index].push(data[i]);
				field_type[index] += 1;
			}
        },
        	error: function (xhr, type) {
            alert(type);
        }
	});
	
//	var priceUrl = "http://159.203.4.199:8080/field/field_price/get_prices_by_field_id/" + field_info[h][l].ID.toString();
//	mui.ajax(priceUrl, {
//		type: "get",
//		timeout: 10000,
//		async: false,
//      success: function (data) {
//      		data = JSON.parse(data);
//      },
//      	error: function (xhr, type) {
//          alert(type);
//      }	
//	});

	//  initialize table with available field type
	for(i=0; i<field_type.length; i++) {
		if(field_type[i] > 0) {
			for(j=0; j<timelen; j++) {checkBox[(field_type.length)*j+i].style.backgroundColor = 'rgb(255, 255, 255)';}
		}
	}
	buildTypeBar(typebar3, typebar7, typebar11);
}

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
	for(var h=0; h<field_info.length; h++) {			// loop #field_type
		for(var l=0; l<field_info[h].length; l++) {
			var Url = "http://159.203.4.199:8080/field/field/get_bookings_by_field_id/" + field_info[h][l].ID.toString();
			var hasparent = field_info[h][l].hasOwnProperty("PARENT_ID");
			mui.ajax(Url, {
				type: "get",
				timeout: 10000,
				async: false,
//				dataType: 'json',
		        success: function (data) {
		        	if(data != "EMPTY"){
		        		data = JSON.parse(data);
			        	for (var k=0 ;k<7; k++) {
//			        		var Date = d.getFullYear() + "-" + months[k] + "-" + days[k];
						var Date = d.getFullYear() + "-09-12";
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
//											var leftid = field_info[h][l].LEFT_ID;
//											var rightid = field_info[h][l].RIGHT_ID;
//											var lindex = field_info[1].map(function(x){return x.ID;}).indexOf(leftid);
//											var rindex = field_info[1].map(function(x){return x.ID;}).indexOf(rightid);
//											table_7[lindex][k][j] += 1;
//											table_7[rindex][k][j] += 1;
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
	var d = new Date();
	var time_index = localStorage.getItem("timebox_index");
	var FIELD_SITE_ID = localStorage.getItem("fieldDetail_id");
	var USER_ID = "5ecb0e4b074044459895fd48057df046";
	var BOOKING_STATUS = 1;
	for(var i=0; i<field_type.length; i++) {
		if(field_type[i] > 0) {
			var blocks = [];
			var selected = [];
			var START_TIME, END_TIME, TOTAL_COST, FIELD_ID;
			var hasparent, PARENT_ID;
			var index = 0;
			// allocate FIELD ID
			if (i==0) {
				index = currentType3;
			}else if (i==1) {
				index = currentType7;
			}else if (i==2) {
				index = currentType11;
			}
			FIELD_ID = field_info[i][index].ID;
			// collect choosen boxes (green)
			for(var j=0; j<timelen; j++) {
				if(checkBox[(field_type.length)*j+i].style.backgroundColor == 'rgb(143, 195, 31)') {selected.push(j);}
			}
			var halfhours = selected.length;
			if(halfhours > 0) {
				var block = [];
				// divide time periods
				while(selected.length > 0) {
					block.push(selected[0]);
					if((selected[1]-selected[0]) > 1 || selected.length == 1) {
						blocks.push(block);
						block = [];
					}
					selected.shift();
				}
				for (k=0; k<blocks.length; k++) {
					var order = {};
					var start = blocks[k][0];
					var end = blocks[k][blocks[k].length-1];
					var start_time = timeline[start].innerHTML.split(":");
					var end_time = timeline[end+1].innerHTML.split(":");
					START_TIME = d.getFullYear()+"-"+months[time_index]+"-"+days[time_index]+"-" + start_time[0] + "-" + start_time[1];
					END_TIME = d.getFullYear()+"-"+months[time_index]+"-"+days[time_index]+"-" + end_time[0] + "-" + end_time[1];
					TOTAL_COST = parseFloat(field_info[i][index].PRICE) * halfhours;
					order.ID = randomString(32);
					order.FIELD_SITE_ID = FIELD_SITE_ID;
					order.FIELD_ID = FIELD_ID;
					order.START_TIME = START_TIME;
					order.END_TIME = END_TIME;
					order.TOTAL_COST = TOTAL_COST;
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
	console.log(JSON.stringify(Orders));
	localStorage.setItem("order_detail", JSON.stringify(Orders));
	return JSON.stringify(Orders);
}

function init() {
    $('#goBack').on("touchend", goBack);
    $('#goConfirm').on("touchend", goConfirm);
    $('.fieldSchedule_timebox').on("touchmove", function(){table_moved = true;});
    $('.fieldSchedule_timebox').on("touchend", goCheckBox);
    
    checkBox = $(".fieldSchedule_timebox");
	timeline = $("span");
	timefirst = timeline[0].innerHTML.split(":");
	timelast = timeline[timeline.length-1].innerHTML.split(":");
	timelen = (timelast[0]-timefirst[0])*2 + parseInt((timelast[1]-timefirst[1])/30);
	typebar3 = new mui.PopPicker();
	typebar7 = new mui.PopPicker();
	typebar11 = new mui.PopPicker();
    currentType3 = 0, currentType7 = 0, currentType11 = 0;
    Handlers();
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
			}
		}
	}
}



function setdate(index) {
	var d = new Date();
    var dd;
    var dow = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    for (i = 0; i < 7; i++) { //10 will be the number of date boxes in the page
        months[i] = mon[d.getMonth()]; //stores the month into an array
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
		timebox[i].innerHTML = daysOfWeek[i] + "<br>" + months[i] + " " + days[i];
    }
    timebox[index].style.borderWidth = "thin";
    timebox[index].style.color = "white";
   	timebox[index].scrollIntoView(false);
   	
   	getTime();
   	setTable(3,0,index);
   	setTable(7,0,index);
   	setTable(11,0,index);
}
