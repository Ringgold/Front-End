function main() {
	$('#register').on('touchend', register);
}

function register() {
	var username = $('#name').val();
	var password = $('#password').val();
	var re_password = $('#re_password').val();
	if (!validateEmail(username)) {
		mui.alert("Please Enter a Correct Email Address");
		return;
	}
	if (!validatePassword(password)) {
		mui.alert("Password Length: 8-20 letters");
		return;
	}
	if (password !== re_password) {
		mui.alert("Passwords Don't Match");
		return;
	}
	var user = {
		USER_NAME: username,
		USER_PASSWORD: password,
		id: '0'
	};
	plus.nativeUI.showWaiting();
	$.post("https://socceredge.info/api/user_account/new_user", JSON.stringify(user), function (data) {
        if (data === 'SUCCESS') {
            mui.alert("Please Check Your Email Inbox");
        } else if (data === 'THE_USER_NAME_ALREADY_EXISTED') {
            mui.alert("User Existed");
        } else if (data === 'FAIL') {
            mui.alert("Register Fail");
        }
        plus.nativeUI.closeWaiting();
    }).error(function () {
        mui.alert('Please Check Your Network');
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
