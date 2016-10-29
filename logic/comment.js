var CommentList = [];

function goFieldDetail() {
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function pulldownRefresh() {
	setTimeout(function(){
		var newcomments = refreshComments(JSON.stringify(CommentList), localStorage.getItem('fieldDetail_id'));
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
			dataType: 'json',
	        success: function (data) {
				for(var i = 0;i < data.length;i++){
					comments.push(get_com_obj(data[i]));
				}
				// store comments for one field site, key is fieldsite id
				localStorage.setItem(site_id, JSON.stringify(comments));
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

// update comments in database
function refreshComments(comments, site_id) {
	var newcomments = JSON.parse(comments);
	var Url = "http://159.203.4.199:8080/field/field_comment/get_comments/" + site_id.toString();
	mui.ajax(Url, {
		type: "get",
		timeout: 10000,
		async: true,
		dataType: 'json',
        success: function (data) {
	        	var comment_id_list = newcomments.map(function(x){return x.id;});
			var data_id_list = data.map(function(x){return x.ID;});
        		for(var i = 0;i < data.length;i++){			// add new comments
				var existnew = $.inArray(data[i].ID, comment_id_list);
				if(existnew == -1){
					newcomments.push(get_com_obj(data[i]));
				}
			}
			for(var i = 0;i < newcomments.length;i++){		// delete comments not in database
				var existdelete = $.inArray(newcomments[i].id, data_id_list);
				if(existdelete == -1){
					newcomments.splice(i, 1);
				}
			}
			localStorage.setItem(site_id, JSON.stringify(newcomments));
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
	var Url = "http://159.203.4.199:8080/field/field_comment/get_comments/" + site_id.toString();
	mui.ajax(Url, {
		type: "post",
		timeout: 10000,
		async: false,
		dataType: 'json',
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
	CommentList = JSON.parse(allcomments);
    var comments = window.JST.comment({
        users: CommentList
    });
    $('#allcomments').empty();
    $('#allcomments').append($(comments));
}
