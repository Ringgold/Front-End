
function init() {
	
	rows = $(".rows");
	for(var i=0; i<rows.length; i++) {
		var h = $(rows[i]).width()/4;
		$(rows[i]).css({'height':h+'px'});
	}
	info = $(".w3-row");
	for(var i=0; i<info.length; i++) {
		var h = ($(rows[0]).width()/4 - 27)/2;
		$(info[i]).css({'line-height':h+'px', 'height':h+'px'});
	}
	
}

function pulldownRefresh() {
	setTimeout(function(){
		
		mui("#pullrefresh").pullRefresh().endPulldownToRefresh();
	},1000);
}
