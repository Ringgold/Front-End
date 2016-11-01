var field_id = "";//designed to store fieldID, use getFieldID() before using it
var field_name = "";
var field_address = "";
var field_phone = "";
var field_image = "";
var fieldDetail_moved = false;
var comments = [];


function goComment() {
	var newcomments = refreshComments(field_id);	// refreshComments() is in comment.js
	plus.webview.getWebviewById('comment').evalJS("load('"+ newcomments +"');");
    plus.webview.show("comment", "pop-in");
}

function goSchedule() {
	plus.webview.getWebviewById('fieldSchedule').evalJS("initTable('"+ localStorage.getItem("fieldDetail_id") +"');");
	plus.webview.getWebviewById('fieldSchedule').evalJS("setdate('"+ localStorage.getItem("timebox_index") +"');");
    plus.webview.show("fieldSchedule", "pop-in");
}

function goBack() {
    var webview = plus.webview.currentWebview();
    webview.hide("pop-out");
}

function addHandlers() {
    var items = $(".os-time-box");
    for (i = 0; i < items.length; i++) {
        items[i].addEventListener("touchend", touchHandler, false);
//      items[i].addEventListener("touchstart", setSelected, false);
        items[i].addEventListener("touchmove", setMoved, false);
    }
}

function getFieldID() {
    field_id = localStorage.getItem('fieldDetail_id');
    field_name = localStorage.getItem('fieldDetail_name');
    field_address = localStorage.getItem('fieldDetail_address');
    field_phone = localStorage.getItem('fieldDetail_phone');
    field_image = localStorage.getItem('fieldDetail_image');
}

function setSelected(e){
	var sender = (window.event && window.event.srcElement) || e.target;
    var items = $(".os-time-box");
    for (i = 0; i < items.length; i++) {
        items[i].style.borderWidth = "0px";
        items[i].style.color = "gray";
        var innerText = items[i].innerHTML;
        if (innerText.includes("<br>Reserve") == true) {
            var html = items[i].innerHTML;
            var replaceHtml = html.replace("<br>Reserve", "");
            items[i].innerHTML = replaceHtml;
        }
    }
    sender.style.borderWidth = "thin";
    var innerText = sender.innerHTML;
    sender.style.color = "white";
    if (innerText.includes("<br>Reserve") == false) {
        sender.innerHTML = sender.innerHTML + "<br>Reserve";
    }

    for(i = 0; i < items.length; i++) {
    		if(items[i].style.color == "white") {
    			localStorage.setItem("timebox_index",i+"");}
    }
}

function setMoved(e){
	//e.preventDefault();
	fieldDetail_moved = true;
	//alert("touch moved handler");
}

function touchHandler(e) {

	if(fieldDetail_moved){
		fieldDetail_moved = false;
		return;
	}
    var css = $(this).css('color');
    if (css.indexOf("255") !== -1) {
        goSchedule();
    }
    setSelected(e);
}


function initPage(){
	$('#goBack').on('touchend', goBack);
}

function focusBox() {
    document.getElementById("os-timebox").style.borderWidth = "2px";
}


function oscar() {
    var d = new Date();
    var months = [];
    var days = [];
    var daysOfWeek = [];
    var dd;
    var dow = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    for (i = 0; i < 7; i++) { //10 will be the number of date boxes in the page
        months[i] = mon[d.getMonth()]; //stores the month into an array
        dd = d.getDate();
        if (dd < 10) {
            dd = '0' + dd;
        }
        days[i] = dd; //stores the day to write in an array
        daysOfWeek[i] = dow[d.getDay()]; //stores the day of the week into array
        d.setDate(d.getDate() + 1);
    }
    getFieldID();
//    .replace(""",""),
	comments = JSON.parse(getComments(field_id));	// getComments() is in comment.js
	
    var fields = [
        {
            fieldName: field_name,
            address: field_address,
            phone: field_phone,
            images: [
                field_image
            ],
            userProfile: comments[0].profile,
            userName: comments[0].name,
            userDescription: comments[0].description, 
            userStar: comments[0].star,
            userImages: comments[0].images,
            months: months,
            days: days,
            daysofweek: daysOfWeek
        }
    ];
    var fieldDetail = window.JST.fieldDetail({
        fields: fields
    });
    $('#container').empty();
    $('#container').append($(fieldDetail));
    addHandlers();
    $('#goComment').on("touchend", goComment);
}
