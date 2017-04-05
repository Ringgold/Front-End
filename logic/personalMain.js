//User Field Booking Info
var bookings = [];//Sync
var bookingsTemp = [];//Async

function personalMainInit() {
	$('#person').on('touchend', function () {
    		plus.webview.getWebviewById('personalMain').evalJS("showTeams();");
    		plus.webview.show("personalMain", "pop-in");
        mui('.mui-off-canvas-wrap').offCanvas('close');
	});
	$('#list').on('touchend', function () {
        plus.webview.show("fieldList", "pop-in");
        mui('.mui-off-canvas-wrap').offCanvas('close');
   	});
    $('#team').on('touchend', function () {
		plus.webview.show("Teams", "pop-in");
    		mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    $('#order').on('touchend', function () {
    		plus.webview.getWebviewById('Orders').evalJS("showOrders();");
		plus.webview.show("Orders", "pop-in");
    		mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    
    $('#setting').on('touchend', function () {
        plus.webview.show("personalSetting", "pop-in");
    });
    
    $('.sidebar_menu').on('touchend', function () {
        mui('.mui-off-canvas-wrap').offCanvas('show');
    });
    
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006,
        indicators: false
    });
    
    drawChart(13, 11, 4);
	drawChart2(11, 12, 2, 32, 15, 4, 10);
}

function showTeams() {
	var myTeams = getPlayerTeams();
    var list = window.JST.personalMain({
    		teams: myTeams
	});
    var container = $('#Teams');
    container.empty();
    container.append($(list));
}

function getPlayerTeams() {
	var UserID = localStorage.getItem("User_ID");
	var Url = "https://socceredge.info/api/team/team/get_teams_by_player_id/" + UserID;
	var myTeams = [];
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
	        if(data != "EMPTY"){
		    		data = JSON.parse(data);
		    		for(var i=0; i<data.length; i++){
		    			var team = data[i];
		    			myTeams.push(team);
		    		}
	        }
        },
        error: function (xhr, type) {
            alert(type);
        }
	});
//	console.log("= ="+myTeams[0].name);
	return myTeams;
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