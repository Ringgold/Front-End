function goBack(){
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function init() {
    $('#goBack').on('touchend', goBack);
    $('#create').on('touchend', getImage);
}

function getImage(){
	var file = $("#avatar_input")[0].files[0];
	var blobImage = new Blob([file]);
	console.log("Your blobImage.size is: "+blobImage.size);
	var fileReader = new FileReader();
	fileReader.onload = function(e) {dataURL = fileReader.result; addAT()};
	fileReader.readAsDataURL(blobImage);
}


function addAT(){
	var team_name 	 = $("#t-name").val();
	var team_city 	 = $("#t-city").val();
	var team_field	 = $("#t-field").val();
	var team_captain = $("#t-captain").val();
	var team_brief	 = $("#t-brief").val();
	
	var info =
	{
		id: 'dfdf',
		name : team_name,
		logo : dataURL,
		topic: team_field,
		brief: team_brief,
		assistantPlayer: '',
		goalPlayer: ''
	};

	var team = JSON.stringify(info);
//		console.log(team);
	alert(team);
	Url = 'https://socceredge.info/api/team/team/insert/' + localStorage.getItem('User_ID');
	mui.ajax(Url, {
		type: "post",
		timeout: 10000,
		data: team,
		async: false,
        success: function (data) {
        	alert(data);
        	if (data == "SUCCESS") {
        		var webview = plus.webview.currentWebview();
    			webview.hide("pop-out");
        	}
        },
        error: function (xhr, type) {
        	alert(type);
        }
	});
	
}