
// Setup canvas
var canvas = new fabric.Canvas('canvas', {
	// selection:false,
	backgroundColor: 'white'
});
var width = document.getElementById('canvasContainer').offsetWidth
canvas.setHeight(500);
canvas.setWidth(width);

// Event listeners
canvas.on('mouse:down', function(options) {
	$("#cx").empty().append(options.e.clientX);
	$("#cy").empty().append(options.e.clientY);
    if (options.target) {
    	$("#cobj").empty().append(options.target.type);
    	$("#objx").empty().append(options.e.clientX);
    	$("#objy").empty().append(options.e.clientY);

    }
});
canvas.on('mouse:up', function(options) {
  console.log('mouse:up ', options.e.clientX, options.e.clientY);
});
canvas.on('after:render', function(options) {
  console.log('after:render');
});
canvas.on('object:modified', function(options) {
  console.log('object:modified');
});
canvas.on('object:selected', function(options) {
  console.log('object:selected');
});
canvas.on('object:moving', function(options) {
  console.log('object:moving');
});
canvas.on('object:scaling', function(options) {
  console.log('object:scaling');
});
canvas.on('object:rotating', function(options) {
  console.log('object:rotating');
});
canvas.on('object:added', function(options) {
  console.log('object:added');
});
canvas.on('object:removed', function(options) {
  console.log('object:removed');
});
canvas.on('mouse:move', function(options) {
	$("#posx").empty().append(options.e.clientX);
	$("#posy").empty().append(options.e.clientY);
});

// Canvas functions
function addOverlay(){
	canvas.setOverlayImage('assets/images/ButtersStotch.png', canvas.renderAll.bind(canvas));
}

function removeOverlay(){
	canvas.setOverlayImage(null, canvas.renderAll.bind(canvas));
	console.log('test');
}

document.getElementById('uploadedImg').onchange = function handleImage(e) {
	var reader = new FileReader();
    reader.onload = function (event){
	    var imgObj = new Image();
	    imgObj.src = event.target.result;
	    imgObj.onload = function () {
	        var image = new fabric.Image(imgObj);
	        image.set({
	            angle: 0,
	            padding: 10,
	            cornersize:10,
	        });
	        var scale = canvas.width / image.width;
	        image.scale(scale);
	        canvas.centerObject(image);
	        canvas.add(image);
	        canvas.renderAll();
	    }
    }
    reader.readAsDataURL(e.target.files[0]);
}

function addCircle(){
	console.log('addCircle');
	var myCircle = new fabric.Circle({
		radius: 250,
		fill: 'red',
		stroke: 'blue',
		opacity: 0.2,
	});

	canvas.add(myCircle)
		.bringToFront(myCircle)
		.renderAll();
}

function addSquare(){
	console.log('addSquare');
	var myRect = new fabric.Rect({
		width:100,
		height: 100,
		fill: 'black',
	});

	canvas.add(myRect).setActiveObject(myRect).renderAll();
}

function addTriangle(){
	console.log('addTriangle');
	var myTriangle = new fabric.Triangle({
		width: 150,
		height: 150,
	});

	canvas.add(myTriangle).setActiveObject(myTriangle).renderAll();
}

function removeSelected(){
	console.log('removeSelected');
	var object = canvas.getActiveObject();
	(object) ? canvas.remove(object): false;
}

function removeNewest(){
	console.log('remove newest object');
	var objects = canvas.getObjects();
	(objects) ? canvas.remove(objects[objects.length-1]): false;
}

function clearCanvas(){
	console.log('clearCanvas');
	canvas.clear();
}

function addPath(){
	console.log('addPath');
	var myPath = new fabric.Path('M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41\
		c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,\
		0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32\
		c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87\
		-2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,\
		12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4\
		-20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z');
	canvas.add(myPath).setActiveObject(myPath).renderAll();
}

function animateRotate(){
	console.log('animateRotate');
	var object = canvas.getActiveObject();
	object.animate('angle', '+=45', {onChange: canvas.renderAll.bind(canvas)});
}

function animateMove(){
	console.log('animateMove');
	var object = canvas.getActiveObject();
	object.animate('left', '+=100', {onChange: canvas.renderAll.bind(canvas)});
}

function gradient(){
	console.log('test: Gradient');

	var object = canvas.getActiveObject();

	object.setGradient('fill', {
	    x1: 0,
	    y1: 0,
	    x2: object.width,
	    y2: object.height,
	    colorStops: {
		    0: '#000',
		    1: '#fff'
	    }
	});

	canvas.renderAll();
}

function addText(){
	var content = document.getElementById("addText").value;
	console.log('addText: ' + content);
	var myText = new fabric.Text(content, {
		left: 100,
		top: 100,
		fontFamily: 'Delicious',
		fontSize: 40
	});

	(content) ? canvas.add(myText).setActiveObject(myText).renderAll(): false;
}

function addBoldText(){
	var content = document.getElementById("addText").value;
	console.log('addBoldText: ' + content);
	var myText = new fabric.Text(content, {
		left: 100,
		top: 100,
		fontFamily: 'Comic Sans',
		fontSize: 40,
		fontWeight: 'bold'
	});

	(content) ? canvas.add(myText).setActiveObject(myText).renderAll(): false;
}

function addTextBox(){
	var content = document.getElementById("addText").value;
	console.log('addTextBox: ' + content);
	var myText = new fabric.Textbox(content, {
		left: 100,
		top: 100,
		fontSize: 40,
	});

	(content) ? canvas.add(myText).setActiveObject(myText).renderAll(): false;
}

function test(){
	console.log('test: Gradient');

	var object = canvas.getActiveObject();

	object.setGradient('fill', {
	    x1: 0,
	    y1: 0,
	    x2: object.width,
	    y2: object.height,
	    colorStops: {
		    0: '#000',
		    1: '#fff'
	    }
	});

	canvas.renderAll();
}