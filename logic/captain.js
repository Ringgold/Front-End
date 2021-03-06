var teamID = '';
var noPending = true;
var pendingList =[];//the place to hold all the pending players
var playerInfo = {};
var playerTeamRelation = {};
var captainID;
var addCondition;
// call checkCaptain() before entering this page

function captainInit() {  //加载场地信息的图片,名称和评分
//	getPendings();
	console.log("In Captain Page");
	$('#goBackToPersonal').on('touchend', function(event) {
        var webview = plus.webview.currentWebview();
    	webview.hide("pop-out");
    });
//  $('.accept').on("touchend", function(event) {
//      accept(event.target.id);
//  });
//  $('.reject').on("touchend", function(event) {
//      reject(event.target.id);
//  });
}

function updateTeamID(){
	teamID = localStorage.getItem("Captain_TeamID");
	getPendings();
}

function updateCaptainID(){
	captainID = localStorage.getItem("User_ID");
}

function accept(id){
	var pendingID = id;
	acceptJoin(id);
	if ( addCondition != "SUCCESS") {
		alert("Failed to Add this player");
	} else {
		alert("Your Added this player!!");
		$('#b'+id).remove();
	}
}

function reject(id){
	var pendingID = id;
	deleteJoin(id);
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
		        	var pendings = JSON.parse(data); //parsed pending array ID
		        	var pendingsTemp = [];
					//Save the Pending List
					
		            for (var i = 0; i < pendings.length; i++) {
		                var pending = {};
		                pending.id = pendings[i];
		    			getPlayerByID(pending.id); //get player's full info save to playerInfo
		    			
		                pending.name = playerInfo.name;
		                pending.position = playerInfo.position;
		                pending.number = playerInfo.number;
		                pending.avatar = playerInfo.avatar;
		                pendingsTemp.push(pending);
		            }

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

function acceptJoin(playerID){
	var Url = "https://socceredge.info/api/team/team/accept_join/" + captainID + "/" + playerID + "/" + teamID;
	console.log(Url);
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
	        if(data != "FAIL"){
	        	if (data == "EMPTY"){
	        		alert("Failed to accept: EMPTY");
	        		addCondition = data;
	        	} else {	
	        		//SUCCESS
	        		addCondition = data;
	        	}
	        } else {
	        		alert("Failed to accept: ERROR");//Fail Alert
	        		addCondition = data;
	        }
        },
        error: function (xhr, type) {
            alert(type);
        }
	});
}

function getPlayerByID(playerID){
	var Url = "https://socceredge.info/api/team/player/get_player_by_id/" + playerID;
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
	        if(data != "FAIL"){
	        	if (data == "EMPTY"){
	        		
	        	} else {	
	        		
		        	var player = JSON.parse(data); //parsed player Object
	                var pendingPlayer = {};
	                pendingPlayer.id = player.id;
	                pendingPlayer.name = player.name;
	                pendingPlayer.position = player.position;
	                pendingPlayer.number = player.number;
	                pendingPlayer.avatar = player.avatar;

		            playerInfo = pendingPlayer;
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

//Check if you are the captain, if not, pop out of this page
function checkCaptain(){
	var tempCaptainID = localStorage.getItem("User_ID");
	var Url = "https://socceredge.info/api/team/player_team/get_player_team_by_id/" + tempCaptainID + "/" + teamID;
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
	        if(data != "FAIL"){
	        	if (data == "EMPTY"){

	        	} else {
 		        	console.log("Your team role in" + teamID + " is " + data); 
		        	var relation = JSON.parse(data);
					
					var info = {};
					info.player_id  = relation.player_id;
					info.team_id  = relation.team_id;
					info.role = relation.role;
					info.status = relation.status;
					
		            playerTeamRelation = info;
	        	}
	        } else {
	        	alert(data);//Fail Alert
	        }
        },
        error: function (xhr, type) {
            alert(type);
        }
	});
	
	if (playerTeamRelation.role != "captain"){
		console.log("Your Player Role is: "+playerTeamRelation.role);
		alert("Your Player Role is not Captain, you are not allowed to proceed in this page!");
		
		plus.webview.show("personalMain", "pop-in");
	} else {
		captainID = localStorage.getItem("User_ID"); // Update the captainID
		alert("Your Player Role is Captain");
	}
}

function deleteJoin(playerID){
	//TODO
}


function reloadPendings(pendings){
	var list = window.JST.captain({
        pendings: pendingList
    });
    var container = $('#pendingList');
    container.empty();
    container.append($(list));
    $('.accept').on("touchend", function(event) {
    	
        accept(event.target.id);
    });
    $('.reject').on("touchend", function(event) {
        reject(event.target.id);
    });
}

function pullDownRefreshPendings() {
	setTimeout(function(){
		getPendings();
		mui("#pulldownrefreshpendings").pullRefresh().endPulldownToRefresh();
	},1000);
}
