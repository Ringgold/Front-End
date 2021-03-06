var UserID = "";

function main() {
	$('#register').on("touchstart", goRegister);
	$('#log_in').on('touchstart', login);
}

function goRegister() {
	plus.webview.show("register", "pop-in");
}

function login() {
	nextPage = '';
    $('input').blur();
    var user_account = {};
    user_account.USER_ID = '0';
    user_account.USER_NAME = $('#user_name').val();
    user_account.USER_PASSWORD = $('#user_password').val();
    if (!validateEmail(user_account.USER_NAME)) {
        mui.alert("Please Enter A Correct Email Address");
        return;
    }
    if (!validatePassword(user_account.USER_PASSWORD)) {
        mui.alert("Please Enter a Password of Length 8-20 letters");
        return;
    }
    plus.nativeUI.showWaiting();
    $.post("https://socceredge.info/api/user_account/log_in", JSON.stringify(user_account), function (data) {
        if (data === 'FAIL') {
            mui.alert("Login Fail");
        } else if (data === 'NO_SUCH_USER') {
            mui.alert("User Not Existing");
        } else if (data === 'WRONG_PASSWORD') {
            mui.alert("Wrong Password");
        } else {
        	UserID = data;
      		console.log(UserID);
      		//Setup User ID in different pages
        	localStorage.setItem("User_ID", UserID);
            //mui.alert("Login Success!");
            getPlayerById(UserID);
        }
        plus.nativeUI.closeWaiting();
    }).error(function () {
        mui.alert("Please Check Your Network Connection");
        plus.nativeUI.closeWaiting();
    });
}

function validateEmail(email) {
    // First check if any value was actually set
    if (email.length == 0) return false;
    // Now validate the email format using Regex
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(email);
}

function validatePassword(password) {
    if (password.length < 8 || password.length > 20) {
        return false;
    }
    return true;
}

function getPlayerById(playerID){
	var UserID = localStorage.getItem("User_ID");
	var Url = "https://socceredge.info/api/team/player/get_player_by_id/" + UserID;
	var myTeams = [];
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
	        if(data == "FAIL"){
	        	//First Time Login need to create a player file
		    	plus.webview.show("playerCreate", "pop-in");
	        } else {
	        	plus.nativeUI.showWaiting();
	        	plus.webview.getWebviewById('personalMain').evalJS("changePlayerInfo('"+data+"');");
	        	setTimeout(function(){plus.nativeUI.closeWaiting();},100);
	        	plus.webview.show("personalMain", "pop-in");
	        }
        },
        error: function (xhr, type) {
            alert(type);
        }
	});
}