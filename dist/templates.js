(function() {
window["JST"] = window["JST"] || {};

window["JST"]["comment"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul class="mui-table-view my-transparent-simple">\n	';
_.each(users, function (user) {;
__p += '\n	<li class="comment-remove-list-background mui-table-view-cell">\n		<div class="w3-row">\n			<div class="w3-col w3-center" style="width:60px;padding-top:10px">\n				<img class="w3-circle" src=' +
__e(user.profile) +
' style="width:80%" />\n				<br>\n				<div class="mui-text-center w3-small">\n					' +
((__t = (user.name)) == null ? '' : __t) +
'\n				</div>\n			</div>\n			<div class="w3-rest" style="padding-left:15px">\n				<br>\n				';
for (var i=0;i < user.star; i++) {;
__p += '\n					<img src="../resource/comment-template/star.png" style="width:15px">\n				';
};
__p += '\n				<br>\n				<br>\n				<p class="w3-small w3-text-white">' +
((__t = (user.description)) == null ? '' : __t) +
'</p>\n				';
_.each(user.images, function(image) {;
__p += '\n					<img class="w3-round w3-padding-top" src=' +
__e(image) +
' style="width:60px;height:45px" />\n				';
});;
__p += '\n			</div>\n		</div>\n		<hr style="margin-bottom: 0px">\n	</li>\n	';
});;
__p += '\n</ul>';

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
__p += '\n\n<div id="slider" class="mui-slider my-transparent-simple">\n	<div class="mui-slider-group">\n		';
_.each(field.images, function(image){;
__p += '\n		<div class="mui-slider-item">\n			<a href="#">\n				<img src=' +
((__t = (image)) == null ? '' : __t) +
' width="100%">\n			</a>\n		</div>\n		';
});;
__p += '\n	</div>\n	<div class="mui-slider-indicator">\n		';
_.each(field.images, function(image){;
__p += '\n		<div class="mui-indicator"></div>\n		';
});;
__p += '\n	</div>\n</div>\n<div class="os-main-content w3-text-white" style="font-family: \'simple\';">\n	<h4 style="margin-top:20px">\n        <div class="mui-inline" style="font-family: \'lanting\'; letter-spacing: 5px;">\n            ' +
((__t = (field.fieldName)) == null ? '' : __t) +
'\n        </div>\n        <div class="mui-icon mui-icon-compose mui-inline">\n\n        </div>\n        <div class="mui-icon mui-icon-upload mui-inline" style="float: right;">\n\n        </div>\n    </h4>\n\n	<p>\n		<div class="mui-icon mui-icon-location mui-inline">\n\n		</div>\n		<label class="mui-inline" style="letter-spacing: 4px;">\n        ' +
((__t = (field.address)) == null ? '' : __t) +
'\n    </label>\n	</p>\n\n	<p>\n		<div class="mui-icon mui-icon-phone mui-inline">\n\n		</div>\n		<div class="os-detail-text mui-inline" style="letter-spacing: 4px;">\n			' +
((__t = (field.phone)) == null ? '' : __t) +
'\n		</div>\n	</p>\n\n	<hr>\n	<div style="letter-spacing: 2px;">\n		Field Booking\n	</div>\n\n	<div id="goSchedule" class="os-time-slider-container">\n		';
for(var i=0;i<field.days.length;i++){;
__p += '\n			<div class="os-time-box" id="os-timebox">\n				' +
((__t = (field.daysofweek[i])) == null ? '' : __t) +
'\n				<br>\n				' +
((__t = (field.months[i])) == null ? '' : __t) +
'&nbsp;\n				' +
((__t = (field.days[i])) == null ? '' : __t) +
'<br>\n			</div>\n		';
};
__p += '	\n	</div>\n\n	<hr>\n	<div class="" style="letter-spacing: 2px;">\n		Comments\n		<div id="goComment" style="display: inline;float: right;">\n			All Comments>\n		</div>\n	</div>\n	<div class="">\n		<div class="w3-col w3-center" style="width:60px;padding-top:10px;">\n			<img class="w3-circle" src=' +
__e(field.userProfile) +
' style="width:100%" />\n			<br>\n			<div class="mui-text-center">\n				' +
((__t = (field.userName)) == null ? '' : __t) +
'\n			</div>\n\n		</div>\n		<div class="w3-rest" style="padding-left:15px">\n			';
for (var i=0;i < field.userStar; i++) {;
__p += '\n			<img src="../resource/comment-template/star.png" style="width:15px">\n			';
};
__p += '\n			<br>\n			<p class="w3-small" style="color: white; margin-top:5px">\n				' +
((__t = (field.userDescription)) == null ? '' : __t) +
'\n			</p>\n			';
_.each(field.userImages, function(image) {;
__p += '\n			<img class="w3-round w3-padding-top" src=' +
__e(image) +
' style="width:60px;height:45px" />\n			';
});;
__p += '\n		</div>\n	</div>\n</div>\n';
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
__p += '<div class="mui-content-padded my-transparent-simple">\n    ';
_.each(fields, function (field) {;
__p += '\n    <div class="current-field">\n        <p>\n            <img src=' +
__e(field.image) +
' width="100%">\n        </p>\n        <div class="mui-content-padded">\n            <span class="rating" style="float: right">Rating: ' +
((__t = (field.rating)) == null ? '' : __t) +
'/5</span>\n            <span class="name" id="' +
((__t = (field.id)) == null ? '' : __t) +
'" style="font-weight: bold; font-size: 16px;">' +
((__t = (field.name)) == null ? '' : __t) +
'<br></span>\n            <span class="w3-small">' +
((__t = (field.address)) == null ? '' : __t) +
'</span>\n        </div>\n    </div>\n    ';
});;
__p += '\n</div>';

}
return __p
}})();