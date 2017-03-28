var allTeams;
function init() {
	
	getAllTeams(); //get the teams' list
	
	rows = $(".rows");
	for(var i=0; i<rows.length; i++) {
		var h = $(rows[i]).width()/4;
		$(rows[i]).css({'height':h+'px'});
	}
	info = $(".w3-row");
	for(var i=0; i<info.length; i++) {
		var h = ($(rows[0]).width()/4 - 27)/2;
		$(info[i]).css({'line-height':h+'px', 'height':h+'px'});
	}
	
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
    
    $('#showTeams').on('touchend', function () {
//  		plus.webview.getWebviewById('showTeam').evalJS("showTemplate();");
		plus.webview.show("Teams", "pop-in");
    	mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    
	$('#menu').on('touchend', function () {
        mui('.mui-off-canvas-wrap').offCanvas('show');
    });
    
    $('.sidebar_menu').on('touchend', function () {
        mui('.mui-off-canvas-wrap').offCanvas('show');
    });
    
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006,
        indicators: false
    });
    
    $('#goCreate').on('touchend', function(){
    	plus.webview.show("createTeam", "pop-in");
    })
    
    
	
}

function pulldownRefresh() {
	setTimeout(function(){
		getAllTeams();
		mui("#pullrefresh").pullRefresh().endPulldownToRefresh();
	},1000);
}

function reloadAllTeams(AllTeams) {  //加载场地信息的图片,名称和评分
    var list = window.JST.Teams({
        teams: AllTeams
    });
    var container = $('#teamsDisplay');
    container.empty();
    container.append($(list));
//  $('.block').on("touchend", goTeamDetail);
}

function goTeamDetail(){
	//TODO
}

function getAllTeams() {
    mui.ajax("https://socceredge.info/api/team/team/all_teams", {
        type: "get",
        timeout: 10000,
        success: function (data) {
        	console.log("Get Teams Success!");
        	
            var teams = JSON.parse(data);
            var teams_temp = [];
            for (var i = 0; i < teams.length; i++) {
                var team = {};
                team.name = teams[i].name;
                team.id = teams[i].id;
                team.logo = teams[i].logo;
                team.assist = teams[i].assistantPlayer;
                team.goalPlayer = teams[i].goalPlayer;
                team.topic = teams[i].topic;
                team.brief = teams[i].brief;
                teams_temp.push(team);
            }
            allTeams = teams_temp;
            console.log(allTeams);
            reloadAllTeams(teams_temp);
        },
        error: function (xhr, type) {
            alert(type);
        }
    });
}