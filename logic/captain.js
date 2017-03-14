var teamID = 'a01a11acf8b34af5a4e08985c05b2602';
var noPending = true;
var pendingList =[];//the place to hold all the pending players

function captainInit() {  //加载场地信息的图片,名称和评分
	getPendings();
	$('#goBackToPersonal').on('touchend', function(event) {
        var webview = plus.webview.currentWebview();
    	webview.hide("pop-out");
    });
    $('.accept').on("touchend", function(event) {
        accept(event.target.id);
    });
    $('.reject').on("touchend", function(event) {
        reject(event.target.id);
    });
}

function accept(id){
	var pendingID = id;
	$('#b'+id).remove();
}

function reject(id){
	var pendingID = id;
	$('#b'+id).remove();
}


function getPendings(){
//	var teamID = localStorage.getItem("User_ID");
	var Url = "https://socceredge.info/api/team/team/get_pending_players/" + teamID;
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
	        if(data != "FAIL"){
	        	if (data == "EMPTY"){
	        		noPending = true;
	        		$('#noPend').show();
	        	} else {
	        		noPending = false;
	        		$('#noPend').hide();
	        		console.log("Team Pending List Acquired " + data);     		        	
		        	var pendings = JSON.parse(data);
		        	var pendingsTemp = [];
					//Save the Pending List
					
					var pending = {};
					pending.id = pendings;
					pendingsTemp.push(pending);
					
//		            for (var i = 0; i < pendings.length; i++) {
//		                var pending = {};
//		                pending.id = pendings[i];
//		                pending.name = pendings[i].name;
//		                pending.position = pendings[i].position;
//		                pending.number = pendings[i].number;
//		                pending.avatar = pendings[i].avatar;
//		                pendingsTemp.push(pending);
//		            }
		            pendingList = pendingsTemp;
		         	reloadPendings(pendingList);
	        	}
	        } else {
	        		alert(data);//Fail Alert
	        }
        },
        error: function (xhr, type) {
            alert(type);
        }
	});
}

function reloadPendings(pendings){
	var list = window.JST.captain({
        pendings: pendingList
    });
    var container = $('#pendingList');
    container.empty();
    container.append($(list));
}

function pullDownRefreshPendings() {
	setTimeout(function(){
		getPendings();
		mui("#pulldownrefreshpendings").pullRefresh().endPulldownToRefresh();
	},1000);
}
