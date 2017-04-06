function goBack(){
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function init() {
	$('#goback').on('touchend', goBack);
    $('#update').on('touchend', getImage);
}

function getImage(){
	var file = $("#avatar_input")[0].files[0];
	var blobImage = new Blob([file]);
	console.log("Your blobImage.size is: "+blobImage.size);
	var fileReader = new FileReader();
	fileReader.onload = function(e) {dataURL = fileReader.result; updateAP()};
	fileReader.readAsDataURL(blobImage);
}


function updateAP(){
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
	Url = 'https://socceredge.info/api/team/player/update_player/';
	mui.ajax(Url, {
		type: "post",
		timeout: 10000,
		data: playerInfo,
		async: false,
        success: function (data) {
        	alert(data);
        	if (data == "SUCCESS") {
        		alert("Your file is updated.");
        		plus.webview.getWebviewById('personalMain').evalJS("changePlayerInfo('"+playerInfo+"');");
        		var webview = plus.webview.currentWebview();
    			webview.hide("pop-out");
        	}
        },
        error: function (xhr, type) {
        	alert(type);
        }
	});
	
}