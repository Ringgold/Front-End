function personalMainInit() { //为了随时reload小界面
	var personalMain = window.JST.personalMain();
	
    $('#p1').on('touchend', function () {
        $('#personalMain').reload();
        mui('.mui-off-canvas-wrap').offCanvas('close');
    });

    $('#p2').on('touchend', function () {
		$('#personalMain').reload();
        mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    
    $('#p2').on('touchend', function () {
		$('#personalMain').reload();
        mui('.mui-off-canvas-wrap').offCanvas('close');
    });
    
}