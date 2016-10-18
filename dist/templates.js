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