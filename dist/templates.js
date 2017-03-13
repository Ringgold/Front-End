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

window["JST"]["fieldConfirm"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += ' ';
_.each(orders, function (order) {;
__p += '\n <div class="mui-content-padded" style="background: rgba(0, 0, 0, 0.3)">\n    <br>\n    <div class="mui-content-padded my-transparent-simple w3-center">\n        <div class="w3-text-white my-border-bottom">\n            <span class="w3-large">' +
((__t = (order.date)) == null ? '' : __t) +
'</span>\n            <span class="w3-large"><br>' +
((__t = (order.weekday)) == null ? '' : __t) +
'<br></span>\n            <span>' +
((__t = (order.startTime)) == null ? '' : __t) +
' -- ' +
((__t = (order.endTime)) == null ? '' : __t) +
'<br><br></span>\n            <!--<span>Field Number 1 (3-Man Field)<br><br></span>-->\n        </div>\n        <div align=\'right\' class="w3-text-yellow w3-large">$' +
((__t = (order.cost)) == null ? '' : __t) +
'</div>\n    </div>\n</div>\n';
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
__p += '\n	</div>\n</div>\n<div class="os-main-content w3-text-white">\n	<h4 style="margin-top:20px">\n        <div class="mui-inline">\n            ' +
((__t = (field.fieldName)) == null ? '' : __t) +
'\n        </div>\n        <div class="mui-icon mui-icon-compose mui-inline">\n\n        </div>\n        <div class="mui-icon mui-icon-upload mui-inline" style="float: right;">\n\n        </div>\n    </h4>\n\n	<p>\n		<div class="mui-icon mui-icon-location mui-inline">\n\n		</div>\n		<label class="mui-inline">\n        ' +
((__t = (field.address)) == null ? '' : __t) +
'\n    </label>\n	</p>\n\n	<p>\n		<div class="mui-icon mui-icon-phone mui-inline">\n\n		</div>\n		<div class="os-detail-text mui-inline">\n			' +
((__t = (field.phone)) == null ? '' : __t) +
'\n		</div>\n	</p>\n\n	<hr>\n	<div>\n		Field Booking\n	</div>\n\n	<div id="goSchedule" class="os-time-slider-container">\n		';
for(var i=0;i<field.days.length;i++){;
__p += '\n			<div class="os-time-box" id="os-timebox">\n				' +
((__t = (field.daysofweek[i])) == null ? '' : __t) +
'\n				<br>\n				' +
((__t = (field.months[i])) == null ? '' : __t) +
'&nbsp;\n				' +
((__t = (field.days[i])) == null ? '' : __t) +
'<br>\n			</div>\n		';
};
__p += '	\n	</div>\n\n	<hr>\n	<div class="">\n		Comments\n		<div id="goComment" style="display: inline;float: right;">\n			All Comments>\n		</div>\n	</div>\n	<div class="">\n		<div class="w3-col w3-center" style="width:60px;padding-top:10px;">\n			<img class="w3-circle" src=' +
__e(field.userProfile) +
' style="width:100%" />\n			<br>\n			<div class="mui-text-center">\n				' +
((__t = (field.userName)) == null ? '' : __t) +
'\n			</div>\n\n		</div>\n		<div class="w3-rest" style="padding-left:5px">\n			';
for (var i=0;i < field.userStar; i++) {;
__p += '\n			<img src="../resource/comment-template/star.png" style="width:15px">\n			';
};
__p += '\n			<br>\n			<p class="w3-small" style="color: white;">\n				' +
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
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["personalMain"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!--个人主页-->\n<!--订单-->\n';
_.each(orders, function (order) {;
__p += '\n    <div class="my-card2">\n        <div class="my-card-content">\n            <div class="w3-row">\n                <div class="w3-col s4 w3-center">\n                    <img src="../resource/personalMain/field_ordered.png" width="72%">\n                </div>\n                <div class="w3-col s5 w3-center">\n                    <label style="font-size: 10px;" class="mui-pull-left">' +
((__t = (order.id)) == null ? '' : __t) +
'</label>\n                    <br>\n                    <label style="font-size: 11px;" class="mui-pull-left">From ' +
((__t = (order.start)) == null ? '' : __t) +
'</label>\n                    <br>\n                    <label style="font-size: 11px;" class="mui-pull-left">To ' +
((__t = (order.end)) == null ? '' : __t) +
'</label>\n                    <br>\n                    <label style="font-size: 13px;" class="mui-pull-left orderstatus">' +
((__t = (order.status)) == null ? '' : __t) +
'</label>\n                    <label style="font-size: 13px;" class="mui-pull-left">&nbsp;$' +
((__t = (order.cost)) == null ? '' : __t) +
'</label>\n                </div>\n                <div class="w3-col s3 w3-center">\n                    <label style="font-size: 13px;" class="mui-pull-right">Details</label>\n                    <br>\n                    <br>\n                    <br>\n                    <label style="font-size: 14px; color: #fdcb1d;" class="mui-pull-right">Rate it!</label>\n                </div>\n            </div>\n        </div>\n        <hr style="border-top:1px solid #595757; margin-top: 8px; margin-bottom: 0px;" />\n    </div>\n';
});;
__p += '\n\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["teamMain"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '\n<!--Team Pages-->\n	<div class="mui-scroll">\n		<!--Records-->\n		<div id="item4" class="mui-control-content mui-active">\n			<div style="background-image: url(../resource/common/background-dark-down-part.png); background-size:100%; padding: 20px 0px;">\n				<div class="mui-content-padded w3-center my-simple">\n					<div class="w3-row">\n						<div class="w3-col s4 w3-center">\n							<img src="../resource/teamMain/TeamLogo.png" width="70%">\n						</div>\n						<div class="w3-col s4 w3-center" style="font-size: 14px;">\n							<br>\n							<label style="font-size: 18px">Delimonge<br></label>\n							<label style="color: #888888">Role:</label>\n							<label style="color: #888888">Tourist</label>\n							<div style="margin: 5px 14px;">\n								<button class="mui-btn mui-btn-block mui-btn-yellow" style="padding: 0px 0px;">Join In</button>\n							</div>\n						</div>\n						<div class="w3-col s4 w3-center">\n							<br>\n							<div class="mui-icon mui-icon-upload" style="float: right; padding-top: 10px;">\n								\n    						</div>\n						</div>\n					</div>\n				</div>\n			</div>\n			\n			<div class="grey-back">\n				<div class="w3-row" style="margin-left: 45px;">\n						<div class="w3-col s6 w3-center">\n							<div class="mui-content-padded">\n								<div id="mainT" style="height: 170px; margin-left: 0px;">\n									\n								</div>\n							</div>\n						</div>\n						\n						<div class="w3-col s6 w3-center">\n							<div class="mui-content-padded">\n								<div class="my-record-padding2">\n									<label class="w3-small" style="color: #fdcb1d">Games Won<br></label>\n									<label class="w3-large" style="color: #fdcb1d">15</label>\n								</div>\n								<div class="my-record-padding2">\n									<label class="w3-small" style="color: #b5b5b6">Games Lost<br></label>\n									<label class="w3-large" style="color: #b5b5b6">12</label>\n								</div>\n								<div class="my-record-padding2">\n									<label class="w3-small" style="color: #595757">Games Tie<br></label>\n									<label class="w3-large" style="color: #595757">3</label>\n								</div>\n							</div>\n						</div>\n						<!--Another Layout Template-->\n						<!--<div class="w3-col s3 w3-center" style="font-size: x-large">\n							<div class="my-record-padding">\n								<label style="color: #fdcb1d;">Wins</label>\n							</div>\n							<div class="my-record-padding">\n								<label style="color: #b5b5b6;">Losts</label>\n							</div>\n							<div class="my-record-padding">\n								<label style="color: #595757;">Ties</label>\n							</div>\n						</div>\n						<div class="w3-col s3 w3-center" style="font-size: x-large">\n							<div class="my-record-padding">\n								<label style="color: #fdcb1d;">15</label>\n							</div>\n							<div class="my-record-padding">\n								<label style="color: #b5b5b6;">12</label>\n							</div>\n							<div class="my-record-padding">\n								<label style="color: #595757;">3</label>\n							</div>\n						</div>-->\n				</div>\n				\n				<!--Goal Chart-->\n				<div>\n					<div id="chart3T" style="height: 45px; padding: 7px 0px; margin-bottom: 6px;">\n									\n					</div>\n				</div>\n				\n			</div>\n\n			<!--MVPs-->\n			<div class="grey-back" style="margin-bottom: -3px;">\n				<p class="my-simple" style="font-size: large; padding-left: 5%;">\n					Most Valuable Player(s)\n				</p>\n				<div class="mui-content-padded my-simple">\n					<div class="w3-row">\n						<!--Goals MVP-->\n						<div class="w3-col s6 w3-center">\n							<div class="my-pentagon" style="background-color:#fdcb1d;">\n								<div class="my-pentagon-inner" style="background-image: url(../resource/teamMain/MVP1.png); Top: 5px; ">\n								</div>\n							</div>\n							<label >Ringgold<br></label>\n							<label class="my-yellow" style="font-size: 18px;">Goals </label>\n							<label style="font-size: 18px;">35</label>\n						</div>\n\n						<img src="../resource/personalMain/line.png" style="position: absolute;" width="0.82%">\n\n						<!--Assist MVP-->\n						<div class="w3-col s6 w3-center">\n							<div class="my-pentagon" style="background-color:#fdcb1d;">\n								<div class="my-pentagon-inner" style="background-image: url(../resource/teamMain/MVP2.png); Top: 5px; ">\n								</div>\n							</div>\n							<label >Well<br></label>\n							<label class="my-yellow" style="font-size: 18px;">Team\'s Election</label>\n							<label style="font-size: 18px;"></label>\n						</div>\n					</div>\n				</div>\n			</div>\n			\n\n			<div class="grey-back">\n				<div id="chart2T" style="height: 200px"></div>\n			</div>\n		</div>\n	\n		<!--Topics-->\n		<div id="item5" class="mui-control-content my-simple grey-back" style="margin-top: -2px; padding-top: 10px;">\n			<!--订单1-->\n			<div class="my-card2" style="padding-left: 15px; padding-bottom: 5px; margin-right: -5px;">\n				<div class="my-card-content">\n					<div class="w3-row">						\n						<div class="w3-col s8">\n							<label style="font-size: 16px; color: #E2E2E2;">Quite a nice experience, but it would be much better if the field is lighter.</label>\n							<br>\n							<br>\n							<div class="w3-row">						\n								<div class="w3-col s1 w3-center">\n									<img src="../resource/teamMain/replay.png" width="110%">\n								</div>\n								<div class="w3-col s1 w3-center">\n									<label style="font-size: 15px; color: #E2E2E2;">11</label>\n								</div>\n								<div class="w3-col s1 w3-center">\n									<img src="../resource/teamMain/thumb.png" width="110%">\n								</div>\n								<div class="w3-col s1 w3-center">\n									<label style="font-size: 15px; color: #E2E2E2;">5</label>\n								</div>\n							</div>\n						</div>\n						<div class="w3-col s4 w3-center">\n							<img src="../resource/teamMain/Player1.png" width="72%">\n							<label style="font-size: 12px; color: #b7b7b7">Ringgold</label>\n							<br>\n							<label style="font-size: 12px; color: #b7b7b7">7 Mins Ago</label>\n						</div>\n					</div>\n				</div>\n			</div>\n			<hr style="border-top:1px solid #595757; margin-top: 0px; margin-bottom: 0px;" />\n\n			<!--订单2-->\n			<div class="my-card2" style="padding-left: 15px; padding-bottom: 5px; margin-right: -5px;">\n				<div class="my-card-content">\n					<div class="w3-row">						\n						<div class="w3-col s8">\n							<label style="font-size: 16px; color: #E2E2E2;">In the last match, I think we should have tried harder!</label>\n							<br>\n							<br>\n							<div class="w3-row">						\n								<div class="w3-col s1 w3-center">\n									<img src="../resource/teamMain/replay.png" width="110%">\n								</div>\n								<div class="w3-col s1 w3-center">\n									<label style="font-size: 15px; color: #E2E2E2;">2</label>\n								</div>\n								<div class="w3-col s1 w3-center">\n									<img src="../resource/teamMain/thumb.png" width="110%">\n								</div>\n								<div class="w3-col s1 w3-center">\n									<label style="font-size: 15px; color: #E2E2E2;">3</label>\n								</div>\n							</div>\n						</div>\n						<div class="w3-col s4 w3-center">\n							<img src="../resource/teamMain/Player2.png" width="72%">\n							<label style="font-size: 12px; color: #b7b7b7">Linarg</label>\n							<br>\n							<label style="font-size: 12px; color: #b7b7b7">30 Mins Ago</label>\n						</div>\n					</div>\n				</div>\n			</div>\n			<hr style="border-top:1px solid #595757; margin-top: 0px; margin-bottom: 0px;" />\n		</div>\n\n		<!--Matches-->\n		<div id="item6" class="mui-control-content my-simple">\n			<!--球赛1-->\n			<div class="my-card">\n				<div class="mui-card-content">\n					<div class="mui-card-content-inner">\n						<div class="w3-row">\n							<div class="w3-col s12 w3-center">\n								<div class="w3-row">\n									<div class="w3-col s4 w3-center">\n										<img src="../resource/personalMain/team1.png" width="45%">\n										<br>\n										<label class="w3-tiny">CAC</label>\n									</div>\n									<div class="w3-col s4 w3-center">\n										<label style="font-size: 27px;">5</label>\n										<label style="font-size: 27px;">:</label>\n										<label style="font-size: 27px;">4<br></label>\n										<label class="w3-tiny">July 6</label>\n									</div>\n									<div class="w3-col s4 w3-center">\n										<img src="../resource/personalMain/team3.png" width="45%">\n										<br>\n										<label class="w3-tiny">CFC</label>\n									</div>\n									<a><span class="mui-icon mui-icon-arrowright" style="position: absolute; right: -11px; top: 35px"></span></a>\n								</div>\n							</div>\n						</div>\n					</div>\n				</div>\n			</div>\n\n			<!--球赛2-->\n			<div class="my-card">\n				<div class="mui-card-content">\n					<div class="mui-card-content-inner">\n						<div class="w3-row">\n							<div class="w3-col s12 w3-center">\n								<div class="w3-row">\n									<div class="w3-col s4 w3-center">\n										<img src="../resource/personalMain/team3.png" width="45%">\n										<br>\n										<label class="w3-tiny">CAC</label>\n									</div>\n									<div class="w3-col s4 w3-center">\n										<label style="font-size: 27px;">3</label>\n										<label style="font-size: 27px;">:</label>\n										<label style="font-size: 27px;">0<br></label>\n										<label class="w3-tiny">August 7</label>\n									</div>\n									<div class="w3-col s4 w3-center">\n										<img src="../resource/personalMain/team1.png" width="45%">\n										<br>\n										<label class="w3-tiny">CFC</label>\n									</div>\n									<a><span class="mui-icon mui-icon-arrowright" style="position: absolute; right: -11px; top: 35px"></span></a>\n								</div>\n							</div>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n		<!--Members-->\n		<div id="item7" class="mui-control-content my-simple">\n			<input id="avatar_input" type="file" name="picture" accept="image/png, image/jpeg" class="mui-btn mui-btn-block mui-btn-yellow"/>\n		    <div class="mui-content-padded">\n		    <span id="Cost" style="color: #FDCB1D;float:right"></span>	\n		        <button id="goUpload" class="mui-btn mui-btn-block mui-btn-yellow">Upload Yourself</button>\n		        	\n		        <br>\n		    </div>\n			\n		</div>\n		<!--Photos-->\n		<div id="item8" class="mui-control-content my-simple">\n		</div>\n	</div>\n	';

}
return __p
}})();