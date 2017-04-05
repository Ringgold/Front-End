var fieldInfo = [];

//User Field Booking Info
var bookings = [];//Sync
var bookingsTemp = [];//Async

var currentRegionPicker, currentTypePicker, currentSortPicker, fieldInfoTmp, currentTimePicker,changeTimeList;

function goDetail(e) {
    plus.nativeUI.showWaiting();//加载loading界面
    var currentField = e.target.id;//得到点到的球场的id
    var index = fieldInfo.map(function (e) {
        return e.id;
    }).indexOf(currentField);//得到该球场id的在fieldInfo中的index
    var tempval = fieldInfo[index].name;
    localStorage.setItem('fieldDetail_name', tempval); //storing information into the appropriate key for access by fieldDetail page
    tempval = fieldInfo[index].id + "";
    localStorage.setItem('fieldDetail_id', tempval);
    tempval = fieldInfo[index].image + "";
    localStorage.setItem('fieldDetail_image', tempval);
    tempval = fieldInfo[index].address + "";
    localStorage.setItem('fieldDetail_address', tempval);
    tempval = fieldInfo[index].phone + "";
    localStorage.setItem('fieldDetail_phone', tempval);

    var wv = plus.webview.getWebviewById('fieldDetail');
    wv.evalJS("oscar();");
    plus.webview.show("fieldDetail", "pop-in");//转换至fieldDetail页面
    plus.nativeUI.closeWaiting();//结束loading界面
}

function reloadFieldList(fieldInfo) {  //加载场地信息的图片,名称和评分
    var list = window.JST.fieldList({
        fields: fieldInfo
    });
    var container = $('#fieldList');
    container.empty();
    container.append($(list));
    $('.name').on("touchend", goDetail);
}

function pulldownRefresh() {
	setTimeout(function(){
		getFieldSite();
		mui("#pullrefresh").pullRefresh().endPulldownToRefresh();
	},1000);
}

function fieldListInit() { //创建整个页面, 只需要调用一次, 更新场地直接调用reloadFieldList
    $('#person').on('touchend', function () {
    		plus.webview.getWebviewById('personalMain').evalJS("showOrders();");
    		plus.webview.show("personalMain", "pop-in");
        mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    
    $('#showTeams').on('touchend', function () {
    		plus.webview.show("Teams", "pop-in");
        mui('.mui-off-canvas-wrap').offCanvas('close');
    });

    $('#list').on('touchend', function () {
        $('#fieldList').show();
        $('#personalMain').hide();
        $('#teamMain').hide();
        $('#Teams').hide();
        mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    
    $('#order').on('touchend', function () {
    		plus.webview.getWebviewById('Orders').evalJS("showOrders();");
		plus.webview.show("Orders", "pop-in");
    		mui('.mui-off-canvas-wrap').offCanvas('close');
    });

    $('.sidebar_menu').on('touchend', function () {
        mui('.mui-off-canvas-wrap').offCanvas('show');
    });

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006,
        indicators: false
    });

    getFieldSite();

    dayTimeChange();
    buildSearchBar();
}

function search() {
	var inputs = $("#searchInput").val().toLowerCase();
	var target = $(".name");
	for(var i=0; i<target.length;i++) {
		var block = $(target[i]).parent().parent();
		if($(target[i]).text().toLowerCase().indexOf(inputs) > -1){
			block.removeAttr("style");
		} else {
			block.attr("style", "display: none;");
		}
	}
}

function buildTopBar() {
    var regionPicker = new mui.PopPicker();//地区过滤
    regionPicker.setData([
        {
            value: 'all',
            text: 'All'
        },
        {
            value: 'White Water',
            text: 'White Water'
        }, {
            value: 'Stad Mont',
            text: 'Stad Mont'
        }, {
            value: 'Cali Bridge',
            text: 'Cali Bridge'
        }
    ]);

    $('#region').on('touchend', function () {
        regionPicker.show(function (items) {
            var previousRegionPicker = currentRegionPicker;
            currentRegionPicker = items[0].value;
            if(currentRegionPicker !== previousRegionPicker){//如果地区选择改变

                if(previousRegionPicker !== undefined){//如果之前的过滤选择并非默认选择,过滤结果也许会变多所以重新过滤所有选择
                    fieldInfoTmp = fieldInfo;
                    if(currentTypePicker!== undefined && currentTypePicker!== 'all'){
                        fieldInfoTmp = typeFilter(currentTypePicker, fieldInfoTmp);
                    }
                    if(currentSortPicker !== undefined && currentSortPicker !== 'default'){
                        fieldInfoTmp = sortFilter(currentSortPicker, fieldInfoTmp);
                    }

                    fieldInfoTmp = regionFilter(currentRegionPicker,fieldInfoTmp);
                    if(currentTimePicker !== undefined && currentTimePicker !== 'day'){
                        changeTimeList = fieldInfoTmp;//save fieldInfo before filter day time,
                        // will be used when change night time back to day time
                        fieldInfoTmp = dayTimeFilter(currentTimePicker, fieldInfoTmp);
                    }
                    reloadFieldList(fieldInfoTmp);
                }else{//根据之前的过滤结果再叠加过滤
                    changeTimeList = regionFilter(currentRegionPicker,changeTimeList);
                    fieldInfoTmp = regionFilter(currentRegionPicker,fieldInfoTmp);
                    reloadFieldList(fieldInfoTmp);
                }
            }
        });
    });

    var typePicker = new mui.PopPicker();
    typePicker.setData([
        {
            value: 'all',
            text: 'All'
        },
        {
            value: '3',
            text: '3-Player Field'
        },
        {
            value: '5',
            text: '5-Player Field'
        },
        {
            value: '7',
            text: '7-Player Field'
        },
        {
            value: '11',
            text: '11-Player Field'
        }
    ]);
    $('#type').on('touchend', function () {
        typePicker.show(function (items) {
            var previousTypePicker = currentTypePicker;
            currentTypePicker = items[0].value;
            if(currentTypePicker !== previousTypePicker){

                if(previousTypePicker !== undefined){

                    fieldInfoTmp = fieldInfo;
                    if(currentRegionPicker!== undefined && currentRegionPicker!== 'all'){
                        fieldInfoTmp = regionFilter(currentRegionPicker, fieldInfoTmp);
                    }
                    if(currentSortPicker !== undefined && currentSortPicker !== 'default'){
                        fieldInfoTmp = sortFilter(currentSortPicker, fieldInfoTmp);
                    }

                    fieldInfoTmp = typeFilter(currentTypePicker,fieldInfoTmp);
                    if(currentTimePicker !== undefined && currentTimePicker !== 'day'){
                        changeTimeList = fieldInfoTmp;
                        fieldInfoTmp = dayTimeFilter(currentTimePicker, fieldInfoTmp);
                    }

                    reloadFieldList(fieldInfoTmp);
                }else{
                    changeTimeList = typeFilter(currentTypePicker,changeTimeList);
                    fieldInfoTmp = typeFilter(currentTypePicker,fieldInfoTmp);
                    reloadFieldList(fieldInfoTmp);
                }
            }
        })
    });

    var sortPicker = new mui.PopPicker();
    sortPicker.setData([
        {
            value: 'default',
            text: 'A-Z'
        },
        {
            value: 'rating',
            text: 'Rating'
        },
        {
            value: 'nearest',
            text: 'Nearest'
        },
        {
            value: 'usage',
            text: 'Usage'
        },
        {
            value: 'high',
            text: 'Price from High to Low'
        },
        {
            value: 'low',
            text: 'Price from Low to High'
        }
    ]);
    $('#sort').on('touchend', function () {
        sortPicker.show(function (items) {//默认排序为名字顺序
            var previousSortPicker = currentSortPicker;
            currentSortPicker = items[0].value;
            if(currentSortPicker !== previousSortPicker){
                if(previousSortPicker !== undefined){
                    fieldInfoTmp = fieldInfo;
                    if(currentRegionPicker!== undefined && currentRegionPicker!== 'all'){
                        fieldInfoTmp = regionFilter(currentRegionPicker, fieldInfoTmp);
                    }
                    if(currentTypePicker !== undefined && currentTypePicker !== 'all'){
                        fieldInfoTmp = typeFilter(currentTypePicker, fieldInfoTmp);
                    }

                    fieldInfoTmp = sortFilter(currentSortPicker,fieldInfoTmp);

                    if(currentTimePicker !== undefined && currentTimePicker !== 'day'){
                        changeTimeList = fieldInfoTmp;
                        fieldInfoTmp = dayTimeFilter(currentTimePicker, fieldInfoTmp);
                    }

                    reloadFieldList(fieldInfoTmp);
                }else{
                    changeTimeList = sortFilter(currentSortPicker,changeTimeList);
                    fieldInfoTmp = sortFilter(currentSortPicker,fieldInfoTmp);
                    reloadFieldList(fieldInfoTmp);
                }
            }
        })
    });
}

function dayTimeChange() {//日场夜场切换
    var sun = $('.sun');
    var moon = $('.moon');
    sun.on("touchend", function () {
        if (sun.hasClass('off')) {
            currentTimePicker = 'day';
            if(changeTimeList === undefined) {// should not get in here
                fieldInfoTmp = dayTimeFilter('sun', fieldInfoTmp);
                reloadFieldList(fieldInfoTmp);
            }else{
                fieldInfoTmp = changeTimeList;//changeTimeList is the field info in day time
                reloadFieldList(fieldInfoTmp);
            }

            sun.removeClass("off").addClass('on');
            sun.attr('src', "../resource/fieldDetail/sunOn.png");
            if (moon.hasClass('on')) {
                moon.removeClass("on").addClass('off');
                moon.attr('src', "../resource/fieldDetail/moonOff.png");
            }
        }
    });

    moon.on("touchend", function () {
        if (moon.hasClass('off')) {
            currentTimePicker = 'night';
            changeTimeList = fieldInfoTmp;
            fieldInfoTmp = dayTimeFilter('night',fieldInfoTmp);

            reloadFieldList(fieldInfoTmp);
            moon.removeClass("off").addClass('on');
            moon.attr('src', "../resource/fieldDetail/moonOn.png");
            if (sun.hasClass('on')) {
                sun.removeClass("on").addClass('off');
                sun.attr('src', "../resource/fieldDetail/sunOff.png");
            }
        }
    });

}

function dayTimeFilter(picker, fieldList){
    return fieldList.filter(function (field) {
        return field.dayTime === picker;
    });
}

function typeFilter(picker,fieldList){

    return fieldList.filter(function (field) {
        if(picker === 'all'){
            return fieldList;
        }
        return field.type === picker;
    });

}

function regionFilter(picker, fieldList){
    return fieldList.filter(function (field) {
        if(picker === 'all'){
            return fieldList;
        }
        return field.location === picker;
    });
}

function sortFilter(picker, fieldList){
    var sortedFields = fieldList;
    switch(picker) {
        case 'default':
            sortedFields.sort(function compareFunction(a,b){
                return a.name.localeCompare(b.name);  //根据名字排序
            });
            break;
        case 'rating':
            sortedFields.sort(function (a, b) {//根据评分从高到低来排序
                return b.rating - a.rating
            });
            break;
        case 'high':
            sortedFields.sort(function (a, b) {//根据价格从高到低来排序,此为默认排序
                return b.price - a.price
            });
            break;
        case 'low':
            sortedFields.sort(function (a, b) {//根据价格从低到高来排序
                return a.price - b.price
            });
            break;
        case 'usage': break;
        case 'nearest':break;
        default:break;
    }

    return sortedFields;
}

function buildSearchBar() {//建立搜索框
    $("#searchIcon").on('touchend', function () {
        $('#search').show();
        $('.mui-control-item').hide();
        $('.mui-backdrop').show();
        //mask.show();
    });

    $('.mui-backdrop').on('touchend', function () {
        $('.mui-backdrop').hide();
        $('#search').hide();
        $('.mui-control-item').show();
        $('input').blur();
    });
}

//gets fieldlist information from the server and then sets the
//global var fieldInfo
function getFieldSite() {
    mui.ajax("https://socceredge.info/api/field/field_site/all_site", {
        type: "get",
        timeout: 10000,
        success: function (data) {
            var sites = JSON.parse(data);
            var fields = [];
            for (var i = 0; i < sites.length; i++) {
                var field = {};
                field.name = sites[i].NAME;
                field.id = sites[i].ID;
                field.address = sites[i].ADDRESS;
                field.rating = sites[i].SCORE;
                field.location = sites[i].AREA;
                field.type = sites[i].TYPE;
                field.dayTime = sites[i].DAYTIME;
                field.image = sites[i].PIC_LINK1;
                field.phone = sites[i].PHONE;
                field.price = sites[i].PRICE;
                fields.push(field);
            }
            fieldInfo = fields;
            fieldInfoTmp = fieldInfo;
            changeTimeList = fieldInfo;
            reloadFieldList(fieldInfo);
        },
        error: function (xhr, type) {
            alert(type);
        }
    });
}
