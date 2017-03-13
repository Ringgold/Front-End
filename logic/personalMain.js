//User Field Booking Info
var bookings = [];//Sync
var bookingsTemp = [];//Async

function personalMainInit() {
	$('#person').on('touchend', function () {
    		plus.webview.getWebviewById('personalMain').evalJS("showOrders();");
    		plus.webview.show("personalMain", "pop-in");
        mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    $('#team').on('touchend', function () {
    		plus.webview.getWebviewById('teamMain').evalJS("showTemplate();");
    		plus.webview.show("teamMain", "pop-in");
        mui('.mui-off-canvas-wrap').offCanvas('close');
    });
	$('#list').on('touchend', function () {
        plus.webview.show("fieldList", "pop-in");
        mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    
    $('#menu').on('touchend', function () {
        mui('.mui-off-canvas-wrap').offCanvas('show');
    });
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006,
        indicators: false
    });
    
    drawChart(13, 11, 4);
	drawChart2(11, 12, 2, 32, 15, 4, 10);
}

function showOrders() {
	getBookings();
	var personalMain = window.JST.personalMain({
		orders: bookings
	});
	$('#Orders').append($(personalMain));
	changeStatus();
}

function getBookings(){
	var UserID = localStorage.getItem("User_ID");
	var Url = "https://socceredge.info/api/field/field_booking/getBookingByUserId/" + UserID;
	console.log(Url);
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
//	         	reloadBookings(bookings);
	        } else {
	        		alert(data);//Fail Alert
	        }
        },
        error: function (xhr, type) {
            alert(type);
        }
	});
}

function reloadBookings(bookings){
	var list = window.JST.personalMain({
        orders: bookings
    });
    var container = $('#personalMain');
    container.empty();
    container.append($(list));
}

function pullDownRefreshBookings() {
	setTimeout(function(){
		getBookings();
		changeStatus();
		mui("#pulldownrefreshbookings").pullRefresh().endPulldownToRefresh();
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

function drawChart(win, lose, tie) {
    var myChart = echarts.init(document.getElementById('main'));

    //This value should be equal to the total number of matches played
    var totalNumber = win + lose + tie;

    //Persentage of each value
    var winP = parseInt(win / totalNumber * 100) + "%";
    var loseP = parseInt(lose / totalNumber * 100) + "%";
    var tieP = parseInt(tie / totalNumber * 100) + "%";

    // 指定图表的配置项和数据
    var option = {
        title: {
            show: true,
            subtext: totalNumber + "",
            subtextStyle: {
                color: '#ffffff',
                fontFamily: 'arial',
                fontWeight: 'normal',
                fontSize: 35

            },

            text: "Total Matches",
            textStyle: {
                color: '#ffffff',
                fontFamily: 'arial',
                fontWeight: 'normal',
                fontSize: 15
            },

            x: 'center',
            y: '32%'
        },

        series: [
            {
                name: 'Personal Data',
                type: 'pie',
                radius: ['75%', '100%'],
                avoidLabelOverlap: true,
                hoverAnimation: false,
                silent: true,
                label: {
                    normal: {
                        show: false,
                        position: 'outside',
                        textStyle: {
                            color: 'rgba(255, 255, 255, 1)',
                            fontSize: '20'
                        }
                    }

                },

                labelLine: {
                    normal: {
                        show: false,
                        smooth: false,
                        lineStyle: {
                            color: '#ffffff',
                            width: 2
                        }
                    }
                },

                data: [
                    {
                        value: win, name: '胜利\n' + winP,
                        itemStyle: {
                            normal: {
                                // 设置扇形的颜色
                                color: '#fdcb1d'
                            }
                        }

                    },

                    {
                        value: tie, name: '平局\n' + tieP,
                        itemStyle: {
                            normal: {
                                // 设置扇形的颜色
                                color: '#595757'
                            }
                        }
                    },

                    {
                        value: lose, name: '败北\n' + loseP,
                        itemStyle: {
                            normal: {
                                // 设置扇形的颜色
                                color: '#b5b5b6'
                            }
                        }
                    }
                ]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function drawChart2(jan, feb, mar, apr, may, jun, jul){
    var myChart = echarts.init(document.getElementById('chart2'));
    var option = {
        title : {
            show: true,
            text: 'Monthly Games',
            x: 'left',
            y: '13%',
            textStyle:{
                color: '#fdcb1d',
                fontStyle: 'normal',
                fontWeight: 'bolder',
                fontFamilty: 'arial',
                fontSize: 15
            }
        },
        color: ['#fdcb1d'],
        tooltip : {
            show: false
        },
        grid: {
            show: false,
            left: '3%',
            right: '2%',
            bottom: '3%',
            containLabel: true //是否显示xy轴label的开关
        },
        xAxis : [
            {
                position: 'bottom',
                type : 'category',
                data : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#595757'
                    }
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#ffffff"
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                interval : 10,
                minInterval: 1,
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#ffffff"
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#595757']
                    }
                }
            }
        ],
        series : [
            {
                name:'Monthly Games',
                type:'bar',
                legendHoverLink: false,
                barWidth: '60%',
                data:[jan, feb, mar, apr, may, jun, jul]

            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}