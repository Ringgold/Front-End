function goBack(){
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function init() {
    $('#goBack').on('touchend', goBack);
    $('#create').on('touchend', getImage);
}

//Translate imageURL into Blob type
//function dataURLtoBlob(dataurl) {
//  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//  while(n--){
//      u8arr[n] = bstr.charCodeAt(n);
//  }
//  return new Blob([u8arr], {type:mime});
//}

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
		assistantPlayer: '44444444444444444444444444444444',
		goalPlayer: '44444444444444444444444444444444'
	};

	var team = JSON.stringify(info);
//		console.log(team);
	alert(team);
	Url = 'https://socceredge.info/api/team/team/insert';
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