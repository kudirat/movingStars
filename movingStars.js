function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = -25;

    function draw() {
	canvas.width = canvas.width;
	var tParam = slider1.value*0.01;
	
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}

//function used to draw a star object      
function drawStar(cx, cy, spikes, outerRadius, innerRadius, outlineClr, fillClr, Tx) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    context.strokeSyle = outlineClr;
    context.beginPath();
    moveToTx(cx, cy - outerRadius, Tx)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        lineToTx([x, y], Tx)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        lineToTx([x, y], Tx);
        rot += step
    }
    lineToTx([cx, cy - outerRadius], Tx)
    context.closePath();
    context.lineWidth=5;
    context.strokeStyle=outlineClr;
    context.stroke();
    context.fillStyle=fillClr;
    context.fill();

}


	var Rstart = 50.0;
	var Rslope = 25.0;
	var spiral = function(t) {
	    var R = Rslope * t + Rstart;
	    var x = R * Math.cos(2.0 * Math.PI * t);
	    var y = R * Math.sin(2.0 * Math.PI * t);
	    return [x,y];
	}
    
function planet(color, outlineClr){
var X = canvas.width / 2;
var Y = canvas.height / 2;
var R = 40;
context.beginPath();
context.arc(X, Y, R, 0, 2 * Math.PI, false);
context.lineWidth = 7;
context.strokeStyle = outlineClr;
context.stroke();
context.fillStyle = color;
context.fill();
}
  

	function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
            moveToTx(C(t_begin),Tx);
            for(var i=1;i<=intervals;i++){
		var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
		lineToTx(C(t),Tx);
            }
            context.stroke();
	}

	
	var Tblue_to_canvas = mat3.create();
	mat3.fromTranslation(Tblue_to_canvas,[150,150]);
	mat3.scale(Tblue_to_canvas,Tblue_to_canvas,[1,-1]);
	
	
	drawTrajectory(0.0,3.0,100,spiral,Tblue_to_canvas,"#0c164f");
	var Tgreen_to_blue = mat3.create();
	mat3.fromTranslation(Tgreen_to_blue,spiral(tParam));
	var Tgreen_to_canvas = mat3.create();
	mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
	//drawObject("green",Tgreen_to_canvas);
    drawStar(10, 0, 5, 30, 15, "orange", "yellow", Tgreen_to_canvas);
    
      
    var gldStr = mat3.create();
    drawStar(29, 220, 5, 0, 15, "#ffcf40", "#3c1c31", gldStr);
    drawStar(29, 20, 5, 0, 15, "#ffbf00", "#3c1c31", gldStr);
    drawStar(250, 250, 5, 0, 15, "#ffbf00", "#3c1c31", gldStr);
    drawStar(279, 50, 5, 0, 15, "#bf9b30", "#3c1c31", gldStr);
    drawStar(70, 140, 5, 0, 15, "yellow", "#3c1c31", gldStr);
    
    //center stars
    drawStar(110, 220, 5, 0, 15, "#bf9b30", "#3c1c31", gldStr);
    drawStar(140, 130, 5, 0, 15, "yellow", "#3c1c31", gldStr);
    drawStar(110, 170, 5, 0, 15, "#ffdc73", "#3c1c31", gldStr);
    drawStar(160, 170, 5, 0, 15, "#ffcf40", "#3c1c31", gldStr);
    
   // planet(color, outlineClr)
    
    
    
    }
    
    
  
    slider1.addEventListener("input",draw);
    draw();
}
window.onload = setup;
