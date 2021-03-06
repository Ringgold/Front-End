//User Field Booking Info
var bookings = [];//Sync
var bookingsTemp = [];//Async

var playerName = "Default";
var playerPhoto = "Default";
var playerPosition = "Default";


function personalMainInit() {
	$('#person').on('touchend', function () {
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
    
//  $('#setting').on('touchend', function () {
//      plus.webview.show("personalSetting", "pop-in");
//  });

    $('#updateFile').on('touchend', function () {
        plus.webview.show("playerUpdate", "pop-in");
    });
    
    $('.sidebar_menu').on('touchend', function () {
        mui('.mui-off-canvas-wrap').offCanvas('show');
    });
    
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006,
        indicators: false
    });
    
    $('#p3').on('touchend', function(){
    		plus.nativeUI.showWaiting();
    		plus.webview.getWebviewById('personalMain').evalJS("showTeams();");
    		setTimeout(function(){plus.nativeUI.closeWaiting();},100);
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
    goTeamDetail(myTeams);
}


function updateInfo(info){
	
}

function changePlayerInfo(playerInfo) {
	// change order status from number to content
    var photo = $("#i-photo");
    var name = $("#i-name");
    var position = $("#i-position");
    
    var playerTemp = JSON.parse(playerInfo);
    
    playerPhoto = playerTemp.avatar;
    playerName = playerTemp.name;
    playerPosition = playerTemp.position;
    
    $(photo).attr("src",playerPhoto);
    $(name).text(playerName);
    $(position).text(playerPosition);
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
		    		myTeams = JSON.parse(data);
	        }
        },
        error: function (xhr, type) {
            alert(type);
        }
	});
	return myTeams;
}

function goTeamDetail(myteams) {
	var UserID = localStorage.getItem("User_ID");
	var moved = false;
	var teams = $(".rows");
	for(var i=0; i<teams.length; i++) {
		teams[i].addEventListener("touchend",function(index){
			return function (){
				if(moved){
					moved = false;
					return;
				}
				var detail = getTeamDetail(myteams[index], UserID);
				plus.webview.getWebviewById('teamMain').evalJS("showTemplate('"+detail.replace(/'/g, "\\'")+"');");
				plus.webview.show("teamMain", "pop-in");
			}
		}(i), true);
		teams[i].addEventListener("touchmove", function(){
			moved = true;
		}, false);
	}
}

function getTeamDetail(team, playerID) {
	var teamID = team.id;
	var playerTeam = {};
	mui.ajax("https://socceredge.info/api/team/player_team/get_player_team_by_id/" + playerID + "/" + teamID, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
	        if(data != "EMPTY"){
		    		playerTeam = JSON.parse(data);
	        }
        },
        error: function (xhr, type) {
            alert(type);
        }
	});
	var members = [];
	mui.ajax("https://socceredge.info/api/team/player/get_players_in_team/" + teamID, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
	        if(data != "EMPTY"){
		    		members = JSON.parse(data);
	        }
        },
        error: function (xhr, type) {
            alert(type);
        }
	});
	var detail = $.extend({}, team, playerTeam);
	detail.members = members;
	return JSON.stringify(detail);
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