function init() {
    $('#create').on('touchend', getImage);
}

function getImage(){
	var file = $("#avatar_input")[0].files[0];
	var blobImage = new Blob([file]);
	console.log("Your blobImage.size is: "+blobImage.size);
	var fileReader = new FileReader();
	fileReader.onload = function(e) {dataURL = fileReader.result; addAP()};
	fileReader.readAsDataURL(blobImage);
}


function addAP(){
	var player_id		 = localStorage.getItem('User_ID');
	var player_name 	 = $("#p-name").val();
	var player_position  = $("#p-position").val();
	var player_number	 = $("#p-number").val();
	
	var info =
	{
		id: player_id,
		number: player_number,
		position: player_position,
		avatar : dataURL,
		name : player_name
	};

	var playerInfo = JSON.stringify(info);
	console.log(playerInfo);
	Url = 'https://socceredge.info/api/team/player/upload/';
	mui.ajax(Url, {
		type: "post",
		timeout: 10000,
		data: playerInfo,
		async: false,
        success: function (data) {
        	alert(data);
        	if (data == "SUCCESS") {
//      		var webview = plus.webview.currentWebview();
//  			webview.hide("pop-out");
				plus.webview.getWebviewById('personalMain').evalJS("showTeams();");
				plus.webview.getWebviewById('personalMain').evalJS("changePlayerInfo('"+playerInfo+"');");
    			plus.webview.show("personalMain", "pop-in");
        	}
        },
        error: function (xhr, type) {
        	alert(type);
        }
	});
	
}