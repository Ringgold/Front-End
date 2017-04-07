var allTeams;
function teamsiInit() {
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
    
    getAllTeams();
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
	goTeamDetail(AllTeams);
}

function getAllTeams() {
    mui.ajax("https://socceredge.info/api/team/team/all_teams", {
        type: "get",
        timeout: 20000,
        success: function (data) {
	        	if(data != "EMPTY"){
	        		console.log("Get Teams Success!");
	            var teams = JSON.parse(data);
	            var teams_temp = [];
	            for (var i = 0; i < teams.length; i++) {
	                var team = teams[i];
	                teams_temp.push(team);
	            }
	            allTeams = teams_temp;
	            reloadAllTeams(teams_temp);
	        	}
        },
        error: function (xhr, type) {
            alert(type);
        }
    });
    
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
}