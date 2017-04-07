(function() {
window["JST"] = window["JST"] || {};

window["JST"]["captain"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

_.each(pendings, function (pending) {;
__p += '\r\n<div class="my-card2 my-simple" id=\'b' +
((__t = (pending.id)) == null ? '' : __t) +
'\'>\r\n    <div class="my-card-content">\r\n        <div class="w3-row">\r\n            <div class="w3-col s3 w3-center">\r\n                <img src="' +
((__t = (pending.avatar)) == null ? '' : __t) +
'" width="70%">\r\n            </div>\r\n            <div class="w3-col s5 w3-center">\r\n                <label style="font-size: 18px;" class="mui-pull-left">' +
((__t = (pending.name)) == null ? '' : __t) +
'</label>\r\n                <br>\r\n                <br>\r\n                <label style="font-size: 17px; color: #b5b5b6" class="mui-pull-left">Position: ' +
((__t = (pending.position)) == null ? '' : __t) +
'</label>\r\n            </div>\r\n            <div class="w3-col s4 w3-center">\r\n            	<div class="accept">\r\n            		<div style="margin: 4px 14px;">\r\n						<button class="mui-btn mui-btn-block mui-btn-yellow" id=\'' +
((__t = (pending.id)) == null ? '' : __t) +
'\' style="padding: 0px 1px;">Accept</button>\r\n					</div>\r\n            	</div>\r\n            	<div class="reject">\r\n            		<div style="margin: 4px 14px;">\r\n						<button class="mui-btn mui-btn-block mui-btn-yellow" id=\'' +
((__t = (pending.id)) == null ? '' : __t) +
'\' style="padding: 0px 1px; background-color: red; border-color: red;">Reject</button>\r\n					</div>\r\n            	</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr style="border-top:1px solid #595757; margin-top:0px; margin-bottom: 0px;" />\r\n</div>\r\n';
});;


}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["comment"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul class="mui-table-view my-transparent-simple">\r\n	';
_.each(users, function (user) {;
__p += '\r\n	<li class="comment-remove-list-background mui-table-view-cell">\r\n		<div class="w3-row">\r\n			<div class="w3-col w3-center" style="width:60px;padding-top:10px">\r\n				<img class="w3-circle" src=' +
__e(user.profile) +
' style="width:80%" />\r\n				<br>\r\n				<div class="mui-text-center w3-small">\r\n					' +
((__t = (user.name)) == null ? '' : __t) +
'\r\n				</div>\r\n			</div>\r\n			<div class="w3-rest" style="padding-left:15px">\r\n				<br>\r\n				';
for (var i=0;i < user.star; i++) {;
__p += '\r\n					<img src="../resource/comment-template/star.png" style="width:15px">\r\n				';
};
__p += '\r\n				<br>\r\n				<br>\r\n				<p class="w3-small w3-text-white">' +
((__t = (user.description)) == null ? '' : __t) +
'</p>\r\n				';
_.each(user.images, function(image) {;
__p += '\r\n					<img class="w3-round w3-padding-top" src=' +
__e(image) +
' style="width:60px;height:45px" />\r\n				';
});;
__p += '\r\n			</div>\r\n		</div>\r\n		<hr style="margin-bottom: 0px">\r\n	</li>\r\n	';
});;
__p += '\r\n</ul>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["fieldConfirm"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += ' ';
_.each(orders, function (order) {;
__p += '\r\n <div class="mui-content-padded" style="background: rgba(0, 0, 0, 0.3)">\r\n    <br>\r\n    <div class="mui-content-padded my-transparent-simple w3-center">\r\n        <div class="w3-text-white my-border-bottom">\r\n            <span class="w3-large">' +
((__t = (order.date)) == null ? '' : __t) +
'</span>\r\n            <span class="w3-large"><br>' +
((__t = (order.weekday)) == null ? '' : __t) +
'<br></span>\r\n            <span>' +
((__t = (order.startTime)) == null ? '' : __t) +
' -- ' +
((__t = (order.endTime)) == null ? '' : __t) +
'<br><br></span>\r\n            <!--<span>Field Number 1 (3-Man Field)<br><br></span>-->\r\n        </div>\r\n        <div align=\'right\' class="w3-text-yellow w3-large">$' +
((__t = (order.cost)) == null ? '' : __t) +
'</div>\r\n    </div>\r\n</div>\r\n';
});;


}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["fieldDetail"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

_.each(fields, function (field) {;
__p += '\r\n\r\n<div id="slider" class="mui-slider my-transparent-simple">\r\n	<div class="mui-slider-group">\r\n		';
_.each(field.images, function(image){;
__p += '\r\n		<div class="mui-slider-item">\r\n			<a href="#">\r\n				<img src=' +
((__t = (image)) == null ? '' : __t) +
' width="100%">\r\n			</a>\r\n		</div>\r\n		';
});;
__p += '\r\n	</div>\r\n	<div class="mui-slider-indicator">\r\n		';
_.each(field.images, function(image){;
__p += '\r\n		<div class="mui-indicator"></div>\r\n		';
});;
__p += '\r\n	</div>\r\n</div>\r\n<div class="os-main-content w3-text-white">\r\n	<h4 style="margin-top:20px">\r\n        <div class="mui-inline">\r\n            ' +
((__t = (field.fieldName)) == null ? '' : __t) +
'\r\n        </div>\r\n        <div class="mui-icon mui-icon-compose mui-inline">\r\n\r\n        </div>\r\n        <div class="mui-icon mui-icon-upload mui-inline" style="float: right;">\r\n\r\n        </div>\r\n    </h4>\r\n\r\n	<p>\r\n		<div class="mui-icon mui-icon-location mui-inline">\r\n\r\n		</div>\r\n		<label class="mui-inline">\r\n        ' +
((__t = (field.address)) == null ? '' : __t) +
'\r\n    </label>\r\n	</p>\r\n\r\n	<p>\r\n		<div class="mui-icon mui-icon-phone mui-inline">\r\n\r\n		</div>\r\n		<div class="os-detail-text mui-inline">\r\n			' +
((__t = (field.phone)) == null ? '' : __t) +
'\r\n		</div>\r\n	</p>\r\n\r\n	<hr>\r\n	<div>\r\n		Field Booking\r\n	</div>\r\n\r\n	<div id="goSchedule" class="os-time-slider-container">\r\n		';
for(var i=0;i<field.days.length;i++){;
__p += '\r\n			<div class="os-time-box" id="os-timebox">\r\n				' +
((__t = (field.daysofweek[i])) == null ? '' : __t) +
'\r\n				<br>\r\n				' +
((__t = (field.months[i])) == null ? '' : __t) +
'&nbsp;\r\n				' +
((__t = (field.days[i])) == null ? '' : __t) +
'<br>\r\n			</div>\r\n		';
};
__p += '	\r\n	</div>\r\n\r\n	<hr>\r\n	<div class="">\r\n		Comments\r\n		<div id="goComment" style="display: inline;float: right;">\r\n			All Comments>\r\n		</div>\r\n	</div>\r\n	<div class="">\r\n		<div class="w3-col w3-center" style="width:60px;padding-top:10px;">\r\n			<img class="w3-circle" src=' +
__e(field.userProfile) +
' style="width:100%" />\r\n			<br>\r\n			<div class="mui-text-center">\r\n				' +
((__t = (field.userName)) == null ? '' : __t) +
'\r\n			</div>\r\n\r\n		</div>\r\n		<div class="w3-rest" style="padding-left:5px">\r\n			';
for (var i=0;i < field.userStar; i++) {;
__p += '\r\n			<img src="../resource/comment-template/star.png" style="width:15px">\r\n			';
};
__p += '\r\n			<br>\r\n			<p class="w3-small" style="color: white;">\r\n				' +
((__t = (field.userDescription)) == null ? '' : __t) +
'\r\n			</p>\r\n			';
_.each(field.userImages, function(image) {;
__p += '\r\n			<img class="w3-round w3-padding-top" src=' +
__e(image) +
' style="width:60px;height:45px" />\r\n			';
});;
__p += '\r\n		</div>\r\n	</div>\r\n</div>\r\n';
});;


}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["fieldList"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="mui-content-padded my-transparent-simple">\r\n    ';
_.each(fields, function (field) {;
__p += '\r\n    <div class="current-field">\r\n        <p>\r\n            <img src=' +
__e(field.image) +
' width="100%">\r\n        </p>\r\n        <div class="mui-content-padded">\r\n            <span class="rating" style="float: right">Rating: ' +
((__t = (field.rating)) == null ? '' : __t) +
'/5</span>\r\n            <span class="name" id="' +
((__t = (field.id)) == null ? '' : __t) +
'" style="font-weight: bold; font-size: 16px;">' +
((__t = (field.name)) == null ? '' : __t) +
'<br></span>\r\n            <span class="w3-small">' +
((__t = (field.address)) == null ? '' : __t) +
'</span>\r\n        </div>\r\n    </div>\r\n    ';
});;
__p += '\r\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["orders"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!--订单-->\r\n';
_.each(orders, function (order) {;
__p += '\r\n    <div class="my-card2">\r\n        <div class="my-card-content">\r\n            <div class="w3-row">\r\n                <div class="w3-col s4 w3-center">\r\n                    <img src="../resource/personalMain/field_ordered.png" width="72%">\r\n                </div>\r\n                <div class="w3-col s5 w3-center">\r\n                    <label style="font-size: 10px;" class="mui-pull-left">' +
((__t = (order.id)) == null ? '' : __t) +
'</label>\r\n                    <br>\r\n                    <label style="font-size: 11px;" class="mui-pull-left">From ' +
((__t = (order.start)) == null ? '' : __t) +
'</label>\r\n                    <br>\r\n                    <label style="font-size: 11px;" class="mui-pull-left">To ' +
((__t = (order.end)) == null ? '' : __t) +
'</label>\r\n                    <br>\r\n                    <label style="font-size: 13px;" class="mui-pull-left orderstatus">' +
((__t = (order.status)) == null ? '' : __t) +
'</label>\r\n                    <label style="font-size: 13px;" class="mui-pull-left">&nbsp;$' +
((__t = (order.cost)) == null ? '' : __t) +
'</label>\r\n                </div>\r\n                <div class="w3-col s3 w3-center">\r\n                    <label style="font-size: 13px;" class="mui-pull-right">Details</label>\r\n                    <br>\r\n                    <br>\r\n                    <br>\r\n                    <label style="font-size: 14px; color: #fdcb1d;" class="mui-pull-right">Rate it!</label>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <hr style="border-top:1px solid #595757; margin-top: 8px; margin-bottom: 0px;" />\r\n    </div>\r\n';
});;
__p += '\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["personalMain"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!--个人主页-->\n<!--我的球队-->\n<div class="mui-content-padded my-simple" style="padding-left: 5%;">\n   	<p style="font-size: 18px; font-weight: bold;">Your Team(s)</p>\n</div>\n<hr style="border-top:1px solid #4b4b4b; margin: 8px 0px;"/>\n';
_.each(teams, function (team) {;
__p += '\r\n<div class="mui-control-content mui-active rows" style="height: 100px; padding-top: 0px;">\r\n	<div class="w3-col s3 w3-center" style="height: inherit;">\r\n		<img id="teamLogo" src="' +
((__t = (team.logo)) == null ? '' : __t) +
'" style="height: inherit; padding: 10%;"/>\r\n	</div>\r\n	<div class="w3-col s9" style="word-wrap: break-word; height: inherit; overflow: hidden;">\r\n		<div id="teamTitle" class="w3-large" style="font-weight: 600;">\r\n			<label>' +
((__t = (team.name)) == null ? '' : __t) +
'</label>\r\n		</div>\r\n		<div id="teamInfo" class="w3-col s8" style="padding-right: 2%;">\r\n			<label>' +
((__t = (team.brief)) == null ? '' : __t) +
'</label>\r\n		</div>\r\n		<div class="w3-col s4 w3-center" style="border-left: 1px solid #4b4b4b; padding-left: 2%;">\r\n			<div id="teamMatch" class="w3-row" style="line-height: 30px; height: 30px;">\r\n				<img src="../resource/personalPage/ball.png" class="w3-col s2" style="height: inherit; padding: 11% 1px;"/>\r\n				<label class="w3-col s5" style="font-size: 10px;">Match</label>\r\n				<label class="w3-col s4" style="">0</label>\r\n			</div>\r\n			<div id="teamMember" class="w3-row" style="line-height: 30px; height: 30px;">\r\n				<img src="../resource/personalPage/friends.png" class="w3-col s2" style="height:inherit; padding: 11% 1px;"/>\r\n				<label class="w3-col s5" style="font-size: 10px;">Memb</label>\r\n				<label class="w3-col s4" style="">0</label>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\n<hr style="border-top:1px solid #4b4b4b; margin: 8px 0px;"/>\r\n';
});;
__p += '\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["teamMain"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!--Table bar-->\r\n<div class="w3-row" style="border-bottom: 1px solid #393939; padding-top: 2%; ">\r\n	<div class="w3-col s3 w3-center">\r\n		<p>Player</p>\r\n	</div>\r\n	<div class="w3-col s4 w3-center">  \r\n		<p>Name</p>\r\n	</div>\r\n	<div class="w3-col s3 w3-center">  \r\n		<p>Position</p>\r\n	</div>\r\n	<div class="w3-col s2 w3-center">  \r\n		<p>Number</p>\r\n	</div>\r\n</div>\r\n\r\n<!--Actual Player List-->\r\n ';
_.each(allPlayers, function (player) {;
__p += '\r\n<a>\r\n	<div class="w3-row" style="border-bottom: 1px solid #393939; padding-top: 2%;">\r\n		<div class="w3-col s3 w3-center">\r\n			<p><img src="' +
((__t = (player.avatar)) == null ? '' : __t) +
'" width="50%"></p>\r\n		</div>\r\n		<div class="w3-col s4 w3-center" >\r\n			<p style="color: white; font-size: 15px; padding-top: 8%;">' +
((__t = (player.name)) == null ? '' : __t) +
'</p>\r\n		</div>\r\n		<div class="w3-col s3 w3-center">\r\n			<p style="color: white; font-size: 15px; padding-top: 12%;">' +
((__t = (player.position)) == null ? '' : __t) +
'</p>\r\n		</div>\r\n		<div class="w3-col s2 w3-center">\r\n			<p style="color: white; font-size: 15px; padding-top: 16%;">' +
((__t = (player.number)) == null ? '' : __t) +
'</p>\r\n		</div>\r\n	</div>\r\n</a>\r\n';
});;


}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["Teams"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += ' ';
_.each(teams, function (team) {;
__p += '\r\n<hr style="border-top:1px solid #4b4b4b; margin: 8px 0px;"/>\r\n<div class="mui-control-content mui-active rows" style="height: 100px;">\r\n	<div class="w3-col s3 w3-center" style="height: inherit;">\r\n		<img id="teamLogo" src="' +
((__t = (team.logo)) == null ? '' : __t) +
'" style="height: inherit; padding: 10%;"/>\r\n	</div>\r\n	<div class="w3-col s9" style="word-wrap: break-word; height: inherit; overflow: hidden;">\r\n		<div id="teamTitle" class="w3-large" style="font-weight: 600;">\r\n			<label>' +
((__t = (team.name)) == null ? '' : __t) +
'</label>\r\n		</div>\r\n		<div id="teamInfo" class="w3-col s8" style="padding-right: 2%;">\r\n			<label>' +
((__t = (team.brief)) == null ? '' : __t) +
'</label>\r\n		</div>\r\n		<div class="w3-col s4 w3-center" style="border-left: 1px solid #4b4b4b; padding-left: 2%;">\r\n			<div id="teamMatch" class="w3-row" style="line-height: 30px; height: 30px;">\r\n				<img src="../resource/personalPage/ball.png" class="w3-col s2" style="height: inherit; padding: 11% 1px;"/>\r\n				<label class="w3-col s5" style="font-size: 10px;">Match</label>\r\n				<label class="w3-col s4" style="">0</label>\r\n			</div>\r\n			<div id="teamMember" class="w3-row" style="line-height: 30px; height: 30px;">\r\n				<img src="../resource/personalPage/friends.png" class="w3-col s2" style="height:inherit; padding: 11% 1px;"/>\r\n				<label class="w3-col s5" style="font-size: 10px;">Memb</label>\r\n				<label class="w3-col s4" style="">0</label>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n';
});;


}
return __p
}})();