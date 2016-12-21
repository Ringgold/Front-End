


function drawCourt(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle="#FFFFFF";
    ctx.lineWidth = 1;
    ctx.strokeRect(70,0,60,25);
    ctx.strokeRect(40,0,120,55);

    ctx.beginPath();
    ctx.arc(100, 55, 20, 0, Math.PI, false);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(100, 140, 30, 0, 2*Math.PI, false);
    ctx.closePath();
    ctx.stroke();
}

function moveElement(){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 90,0,20,20);
    };
    img.src = "../resource/personalMain/picture.png";

    var canvasOffset=$("#myCanvas").offset();
    var offsetX=canvasOffset.left;
    var offsetY=canvasOffset.top;
    var canvasWidth=canvas.width;
    var canvasHeight=canvas.height;
    var isDragging=false;

    function handleMouseDown(e){
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // set the drag flag
        isDragging=true;
    }

    function handleMouseUp(e){
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // clear the drag flag
        isDragging=false;
    }

    function handleMouseOut(e){
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // user has left the canvas, so clear the drag flag
        //isDragging=false;
    }

    function handleMouseMove(e){
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // if the drag flag is set, clear the canvas and draw the image
        if(isDragging){
            ctx.clearRect(0,0,canvasWidth,canvasHeight);
            drawCourt();
            ctx.drawImage(img,canMouseX-128/2,canMouseY-120/2,20,20);
        }
    }


    $("#myCanvas").mousedown(function(e){handleMouseDown(e);});
    $("#myCanvas").mousemove(function(e){handleMouseMove(e);});
    $("#myCanvas").mouseup(function(e){handleMouseUp(e);});
    $("#myCanvas").mouseout(function(e){handleMouseOut(e);});

}

var dragElement;
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    dragElement = document.getElementById(ev.target.id);

}

function drop(ev) {
    ev.preventDefault();
    console.log(dragElement.id);
    var canvas = document.getElementById(ev.target.id);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(dragElement,0,0,20,20);
}

function matchDataInit() { //为了随时reload小界面
    var matchData = window.JST.matchData();

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
