var canvas, context;
var data;
var lastPoint;
var lastLine;
var tool;
var curInkTxt;
var full_screen = false;
var pad_top =104;
var pad_left =334;
var pad_width =615;
var pad_height =445;


function initData(top, left, width, height) {
	data = [];
	lastPoint;
	lastLine;
	tool = new Pencil();
	curInkTxt = "";
	$("#draw-pad").offset({
		top : top,
		left : left
	})
	$("#draw-pad").css("zIndex", 10001)
	$("#draw-pad").width(width);
	$("#draw-pad").height(height);
	$("#kanji-draw").width(width);
	$("#kanji-draw").height(height - 45);
	canvas = document.getElementById('kanji-draw');
	canvas.width = $("#kanji-draw").width();
	canvas.height = $("#kanji-draw").height();
	context = canvas.getContext('2d');
	context.lineWidth = 6;
	context.lineJoin = context.lineCap = 'round';
	context.clearRect(0, 0, canvas.width, canvas.height);
}
function toogleDrawpad() {
	$("#draw-pad").toggleClass("draw-pad");
	if ($("#draw-pad").css('visibility') !== 'hidden') {
		initData(pad_top, pad_left, pad_width, pad_height);
		full_screen = false;
		canvas.addEventListener('mousedown', ev_canvas, false);
		canvas.addEventListener('mousemove', ev_canvas, false);
		canvas.addEventListener('mouseup', ev_canvas, false);
	}
}

function ev_canvas(ev) {
	if (ev.offsetX || ev.offsetX == 0) { // Opera
		ev._x = ev.offsetX;
		ev._y = ev.offsetY;
	}
	else if (ev.layerX || ev.layerX == 0) { // Firefox
		ev._x = ev.layerX;
		ev._y = ev.layerY;
	} 
	tool[ev.type](ev);
}

Pencil = function() {
	var tool = this;
	this.started = false;
	this.mousedown = function(ev) {
		context.beginPath();
		context.moveTo(ev._x, ev._y);
		lastLine = [];
		lastPoint = [];
		lastPoint[0] = ev._x;
		lastPoint[1] = ev._y;
		lastLine.push(lastPoint);
		tool.started = true;
	};

	this.mousemove = function(ev) {
		if (tool.started) {
			context.lineTo(ev._x, ev._y);
			context.stroke();
			lastPoint = [];
			lastPoint[0] = ev._x;
			lastPoint[1] = ev._y;
			lastLine.push(lastPoint);
		}
	};

	this.mouseup = function(ev) {
		if (tool.started) {
			tool.mousemove(ev);
			tool.started = false;
			data.push(lastLine);
			makeInkTxt();
			postToGoogle();
		}
	};
};
function makeLinetext(line) {
	var i;
	lineText = "[[";
	for (i = 0; i < line.length; i++) {
		lineText += line[i][0];
		if (i < line.length - 1)
			lineText += ",";
	}
	lineText += "],[";
	for (i = 0; i < line.length; i++) {
		lineText += line[i][1];
		if (i < line.length - 1)
			lineText += ",";
	}
	lineText += "]]";
	return lineText;
}
function makeInkTxt() {
	if (curInkTxt.length == 0)
		curInkTxt += makeLinetext(lastLine);
	else
		curInkTxt += "," + makeLinetext(lastLine);
}
function postToGoogle() {
	inkTxt = '"ink":[' + curInkTxt + ']';
	jsonTxt = '{"api_level":"537.36","app_version":0.4,"input_type":0,"options":"enable_pre_space","requests":[{"max_completions":0,"max_num_results":10,"pre_context":"","writing_guide":{"writing_area_height":'
			+ $("#kanji-draw").height()
			+ ',"writing_area_width":'
			+ $("#kanji-draw").width() + '},' + inkTxt + '}]}';
	$.ajax({
			type : "POST",
			url : "https://inputtools.google.com/request?itc=ja-t-i0-handwrit&app=translate",
			crossDomain : true,
			dataType : "json",
			data : jsonTxt,
			contentType : "application/json; charset=utf-8",
			success : function(msg) {
				$("#kanji-result").html(makeResulTxt(msg[1][0][1]));
			}
		});

}
function makeResulTxt(array){
	text='';
	for(var i= 0; i< array.length;i++){
		text+='<div class ="kanji-item" onclick="addKanjiToSearch(\''+array[i]+'\')">';
		text+=array[i];
		text+='</div>';
	}
	return text;
}
function addKanjiToSearch(kanji){
	$("#word-box").val($("#word-box").val()+kanji);
	toogleDrawpad();
}
function clearCanvas() {
	if (full_screen)
		kanjiFullPad();
	else
		initData(pad_top, pad_left, pad_width, pad_height);
	$("#kanji-result").html("");
}

function backCanvas() {
	var i, j;
	data.pop();
	curInkTxt = "";
	canvas.width = $("#kanji-draw").width();
	canvas.height = $("#kanji-draw").height();
	context = canvas.getContext('2d');
	context.lineWidth = 6;
	context.lineJoin = context.lineCap = 'round';
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (i = 0; i < data.length; i++) {
		curInkTxt += makeLinetext(data[i]);
		if (i < data.length - 1)
			curInkTxt += ",";
	}
	postToGoogle();
	reDrawpad();
}
function reDrawpad() {
	var i, j;
	for (i = 0; i < data.length; i++) {
		context.moveTo(data[i][0][0], data[i][0][1]);
		for (j = 0; data[i].length > 1 && j < data[i].length - 1; j++) {
			context.lineTo(data[i][j + 1][0], data[i][j + 1][1]);
			context.stroke();
		}
	}
}
function kanjiFullPad() {
	var height = window.innerHeight || document.documentElement.clientHeight
			|| document.body.clientHeight;
	var width = window.innerWidth || document.documentElement.clientWidth
			|| document.body.clientWidth;

	initData(0, 0, width, height);
	document.getElementById("full-pad-btn").onclick = kanjiSmallPad;
	$("#full-pad-btn").children("i").removeClass("icon-resize-full-alt");
	$("#full-pad-btn").children("i").addClass("icon-resize-small-alt");
	full_screen = true;
}
function kanjiSmallPad() {
	initData(pad_top, pad_left, pad_width, pad_height);
	document.getElementById("full-pad-btn").onclick = kanjiFullPad;
	$("#full-pad-btn").children("i").removeClass("icon-resize-small-alt");
	$("#full-pad-btn").children("i").addClass("icon-resize-full-alt");
	full_screen = false;
}
