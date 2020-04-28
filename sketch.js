var canvas = (this.__canvas = new fabric.Canvas('c'));
canvas.setHeight(606.4);
canvas.setWidth(600);

var strokeColor = 'red';

function changeStrokeColor(e) {
	strokeColor = e.value;
}

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'blue';
fabric.Object.prototype.cornerStyle = 'circle';

//Add a background image
document.getElementById('file').addEventListener('change', function(e) {
	var file = e.target.files[0];
	var reader = new FileReader();
	reader.onload = function(f) {
		var data = f.target.result;
		fabric.Image.fromURL(data, function(img) {
			// add background image
			canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
				scaleX: canvas.width / img.width,
				scaleY: canvas.height / img.height
			});
		});
	};
	reader.readAsDataURL(file);
});

//Add Rectangle
function Add() {
	var rect = new fabric.Rect({
		left: Math.floor(Math.random() * 200),
		top: Math.floor(Math.random() * 500),
		fill: null,
		width: 100,
		height: 50,
		objectCaching: false,
		stroke: strokeColor,
		strokeWidth: 0.9
	});

	canvas.add(rect);
	canvas.setActiveObject(rect);
}
//Delete Rectangle
function deleteObject(e) {
	if (canvas.getActiveObject()) {
		canvas.remove(canvas.getActiveObject());
	}
}
let imageData = [];
//Save
function save() {
	const jsonData = JSON.stringify(canvas);
	imageData.unshift({ jsonData, imgURL: canvas.toDataURL() });
	console.log(imageData);

	//Display saved on the other box
	imageData.forEach((save, index) => {
		document.getElementById(`${index}`).src = save.imgURL;
	});
}

//Restoring image
window.addEventListener('click', (e) => {
	// console.log(e.target);
	// console.log(e.target.id);

	if (e.target.closest('.right')) {
		const { id } = e.target;
		if (parseInt(id) <= imageData.length) {
			canvas.clear;
			var json = imageData[id].jsonData;
			canvas.loadFromJSON(json);
		}
	}
});

//Download Image
function download() {
	window.open(canvas.toDataURL('png'));
}

//Render
function renderIcon(ctx, left, top, styleOverride, fabricObject) {
	var size = this.cornerSize;
	ctx.save();
	ctx.translate(left, top);
	ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
	ctx.drawImage(img, -size / 2, -size / 2, size, size);
	ctx.restore();
}
