//var CommentList = [];

function goFieldDetail() {
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function pulldownRefresh() {
	setTimeout(function(){
		var newcomments = refreshComments(localStorage.getItem('fieldDetail_id'));
		load(newcomments);
		mui("#pullrefresh").pullRefresh().endPulldownToRefresh();
	},1000);
}

function get_com_obj(data) {
	var temp = {};
	temp.id = data.ID;
	temp.profile = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1564533037,3918553373&fm=116&gp=0.jpg",
	temp.name = data.USER_NAME;
	temp.description = data.COMMENT;
	temp.star = data.SCORE;
	temp.images = [
    		"http://img5.imgtn.bdimg.com/it/u=3053211771,1825496490&fm=21&gp=0.jpg",
		"http://img1.imgtn.bdimg.com/it/u=3906485024,2655122367&fm=21&gp=0.jpg"
	];
	return temp;
}

function getComments(site_id) {
	plus.nativeUI.showWaiting();
	var comments = [];
	var Url = "http://159.203.4.199:8080/field/field_comment/get_comments/" + site_id.toString();
	if(localStorage.getItem(site_id) == null) {	
		mui.ajax(Url, {
			type: "get",
			timeout: 10000,
			async: false,
	        success: function (data) {
		        	if(data != "EMPTY"){
		        		data = JSON.parse(data);
					for(var i = 0;i < data.length;i++){
						comments.push(get_com_obj(data[i]));
					}
					// store comments for one field site, key is fieldsite id
					localStorage.setItem(site_id, JSON.stringify(comments));	
		        	}
	        },
	        	error: function (xhr, type) {
	            alert(type);
	        }
		});
	} else {
		comments = JSON.parse(localStorage.getItem(site_id));
	}
	plus.nativeUI.closeWaiting();
	return JSON.stringify(comments);
}

// update comments
function refreshComments(site_id) {
	var newcomments = [];
	var Url = "https://socceredge.info/api/field/field_comment/get_comments/" + site_id.toString();
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: false,
        success: function (data) {
        		if(data != "EMPTY"){
        			data = JSON.parse(data);
        			for(var i = 0;i < data.length;i++){
					newcomments.push(get_com_obj(data[i]));
				}
				// store comments for one field site, key is fieldsite id
				localStorage.setItem(site_id, JSON.stringify(newcomments));	
        		}
        },
        	error: function (xhr, type) {
            alert(type);
        }
	});
	return JSON.stringify(newcomments);
}

function postComments(site_id) {
	plus.nativeUI.showWaiting();
	var post = {};
	var Url = "https://socceredge.info/api/field/field_comment/get_comments/" + site_id.toString();
	mui.ajax(Url, {
		type: "post",
		timeout: 10000,
		async: false,
        success: function (data) {
	        	
        },
        	error: function (xhr, type) {
            alert(type);
        }
	});
	plus.nativeUI.closeWaiting();
}

function initload() {
	$('#back').on('touchend', goFieldDetail);
}

function load(allcomments) {	
	var shawn = JSON.parse(allcomments);
    var comments = window.JST.comment({
        users: shawn
    });
    $('#allcomments').empty();
    $('#allcomments').append($(comments));
}
