var fieldInfo = [];
var currentRegionPicker, currentTypePicker, currentSortPicker, fieldInfoTmp, currentTimePicker,changeTimeList;

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


    $('#list').on('touchend', function () {
        $('#fieldList').show();
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

    var typePicker = new mui.PopPicker();
    typePicker.setData([
        {
            value: 'all',
            text: 'All'
        },
        {
            value: '3',
            text: '3-Palyer Field'
        },
        {
            value: '5',
            text: '5-Palyer Field'
        },
        {
            value: '7',
            text: '7-Palyer Field'
        },
        {
            value: '11',
            text: '11-Palyer Field'
        }
    ]);
    

    var sortPicker = new mui.PopPicker();
    sortPicker.setData([
        {
            value: 'default',
            text: 'All'
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
            text: 'Price From High to Low'
        },
        {
            value: 'low',
            text: 'Price From Low to High'
        }
    ]);
 
}

function dayTimeChange() {//日场夜场切换
    var sun = $('.sun');
    var moon = $('.moon');

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
        $('#searchInput').show();
        $('.mui-control-item').hide();
        $('.mui-backdrop').show();
        //mask.show();
    });

    $('.mui-backdrop').on('touchend', function () {
        $('.mui-backdrop').hide();
        $('#searchInput').hide();
        $('.mui-control-item').show();
        $('input').blur();
    });
}

//gets fieldlist information from the server and then sets the
//global var fieldInfo
function getFieldSite() {
    mui.ajax("http://159.203.4.199:8080/field/field_site/all_site", {
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
