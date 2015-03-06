// da tuy chinh trong metro-bootstrap.min 
//.element-menu>li>.dropdown-menu,.metro .navbar .element-menu>li>.dropdown-menu{top:100%;left:0} -> right:0
JVDICT_HISTORY = "jvdict-history"
JVDICT_REMIND = "jvdict-jvremind";
HIS_TIME_SHOW = "jvdict-time-show";
HIS_TIME_DELAY = "jvdict-time-delay";
LOG_HISTORY_FLAG = "jvdict-history-flag";
RANDOM_SHOW_FLAG = "jvdict-random-flag";
SHOW_NOTIF_FLAG = "jvdict-notif-flag";
SOUND_REMIND_FLAG="jvdict-reminder-with-sound";
JV_MAX_REMIND="jvdict-max-remind";
JV_MAX_HISTORY="jvdict-max-history";

NEW_WORD_TAB = "newword";
KANJI_TAB = "kanji";
GRAMMAR_TAB = "grammar";
active_tab = NEW_WORD_TAB;
search = search_newword;
getResult = getResultJaVi;
cur_kanji = "";
cur_new_word = "";
cur_grammar = "";

jvhistory = [];
jvremind = [];
maxID = 0;
HEADER_HEIGHT = 120;
TIME_SHOW = 3;
TIME_DELAY = 60;
HISTORY_FLAG = false;
RANDOM_FLAG = false;
NOTIF_FLAG = false;
SOUND_REMIND=false;
MAX_REMIND=15;
MAX_HISTORY=100;
enter_enabled = true;

// TODO chuyen het ve dung jquery triet de!!!
function setHeight() {
	var height = window.innerHeight || document.documentElement.clientHeight
			|| document.body.clientHeight;
	
	//$("#div-history").css("height",(height - HEADER_HEIGHT));
	//$("#search-result").css("height",(height - HEADER_HEIGHT));
	
	$("#div-history").slimScroll({
		height : (height-HEADER_HEIGHT) + 'px',
		position : 'left',
		disableFadeOut : 'true'
	});
	$("#div-right").slimScroll({
		height : (height) + 'px',
		position : 'right',
		disableFadeOut : 'true'
	});
}

function findbyID(arr, id) {
	for ( var index in arr) {
		if (arr[index].id == id)
			return index;
	}
	return -1;
}

function findbyText(arr, word) {
	for ( var index in arr) {
		if (arr[index].word == word)
			return index;
	}
	return -1;
}

function loadWord(hisID, isRemind) {
	if (isRemind != true) {
		var index = findbyID(jvhistory, hisID);
		var word = jvhistory[index].word;
	} else {
		var index = findbyID(jvremind, hisID);
		var word = jvremind[index].word;
	}
	if (index >= 0) {
		$("#word-box").val(word);
		getResult(word, false);
	}
}

function delHistory(hisID) {
	var index = findbyID(jvhistory, hisID);
	if (index >= 0) {
		jvhistory.splice(index, 1);
		localStorage.setItem(JVDICT_HISTORY, JSON.stringify(jvhistory));
		$("#history-" + hisID).fadeOut('slow', function() {
			$(this).remove();
		});
		return true;
	}
	return false;
}
function addHistory(wordObj) {
	var index = findbyText(jvremind, wordObj.word);
	if (index >= 0) {
		delRemind(jvremind[index].id);
		jvremind.push(wordObj);
		localStorage.setItem(JVDICT_REMIND, JSON.stringify(jvremind));
		$("#remind-group").prepend($(makeHisItem(wordObj, true)).fadeIn('slow'));
		
		if (jvhistory.length > MAX_HISTORY) {
			delHistory(jvhistory[0].id)
		}
		return true;
	}

	index = findbyText(jvhistory, wordObj.word);
	if (index >= 0) {
		delHistory(jvhistory[index].id);
	}
	jvhistory.push(wordObj);
	localStorage.setItem(JVDICT_HISTORY, JSON.stringify(jvhistory));
	$("#history-group").prepend($(makeHisItem(wordObj)).fadeIn('slow'));
	
	if (jvhistory.length > MAX_HISTORY) {
		delHistory(jvhistory[0].id)
	}
	return true;
}

function addRemind(wordObj) {
	var index = findbyText(jvremind, wordObj.word);
	if (index >= 0) {
		delRemind(jvremind[index].id);
	}

	index = findbyText(jvhistory, wordObj.word);
	if (index >= 0) {
		delHistory(jvhistory[index].id);
	}
	jvremind.push(wordObj);
	localStorage.setItem(JVDICT_REMIND, JSON.stringify(jvremind));
	$("#remind-group").prepend($(makeHisItem(wordObj, true)).fadeIn('slow'));
	
	if (jvremind.length > MAX_REMIND) {
		delRemind(jvremind[0].id)
	}
	return true;
}
function addRemindByID(isID) {
	var index = findbyID(jvremind, isID);
	var wordObj;
	if (index >= 0) {
		wordObj = jvremind[index];
		delRemind(jvremind[index].id);
	}
	index = findbyID(jvhistory, isID);
	if (index >= 0) {
		wordObj = jvhistory[index];
		delHistory(jvhistory[index].id);
	}
	jvremind.push(wordObj);
	localStorage.setItem(JVDICT_REMIND, JSON.stringify(jvremind));
	$("#remind-group").prepend($(makeHisItem(wordObj, true)).fadeIn('slow'));

	if (jvremind.length > MAX_REMIND) {
		delRemind(jvremind[0].id)
	}
	return true;
}
function delRemind(hisID) {
	var index = findbyID(jvremind, hisID);
	if (index >= 0) {
		jvremind.splice(index, 1);
		localStorage.setItem(JVDICT_REMIND, JSON.stringify(jvremind));
		$("#history-" + hisID).fadeOut('slow', function() {
			$(this).remove();
		});
		return true;
	}
	return false;
}

function delAllRemind() {
	for ( var index in jvremind) {
		wordObj = jvreminde[index];
		delRemind(wordObj.id);
	}
}

function makeHisItem(obj, isRemind) {
	if (isRemind != true)
		remindBtnTxt = '<i id = "remindBtn-'
				+ obj.id
				+ '"  class="icon-bell icon-bell jv-inactive" onclick ="addRemindByID('
				+ obj.id + ')"></i>';
	else {
		remindBtnTxt = '<i id = "remindBtn-' + obj.id
				+ '"  class="icon-bell icon-bell" onclick ="delRemind('
				+ obj.id + ')"></i>';
	}
	if (isRemind != true)
		delBtnTxt = '<i class="icon-cancel icon-delete" onclick ="delHistory('
				+ obj.id + ')"></i>';
	else
		delBtnTxt = "";

	divText = '<div onclick = "loadWord(' + obj.id
			+ (isRemind == true ? ",true" : "")
			+ ')" class="history-item-text">' + obj.word + '</div>';

	return '<div id = "history-' + obj.id + '" class ="history-item">'
			+ divText + delBtnTxt + remindBtnTxt + '</div>';
}

function loadLocalStore() {
	if (typeof (Storage) == "undefined") {
		alert("Sorry, your browser does not support Web Storage...");
		document.location = "http://google.com";
	}
	// load time
	var timeShow = parseInt(localStorage.getItem(HIS_TIME_SHOW));
	var timeDelay = parseInt(localStorage.getItem(HIS_TIME_DELAY));
	if (!isNaN(timeShow) && timeShow > 0)
		TIME_SHOW = timeShow;
	if (!isNaN(timeDelay) && timeDelay > 0)
		TIME_DELAY = timeDelay;
	// load jvhistory
	jvhistory = JSON.parse(localStorage.getItem(JVDICT_HISTORY));
	if (jvhistory == null)
		jvhistory = [];

	for ( var index in jvhistory) {
		wordObj = jvhistory[index];
		$("#history-group").html(
				makeHisItem(wordObj) + $("#history-group").html());
		maxID = maxID > wordObj.id ? maxID : wordObj.id;
	}
	// load jvreminder
	jvremind = JSON.parse(localStorage.getItem(JVDICT_REMIND));
	if (jvremind == null)
		jvremind = [];

	for ( var index in jvremind) {
		wordObj = jvremind[index];
		$("#remind-group").html(
				makeHisItem(wordObj, true) + $("#remind-group").html());
		maxID = maxID > wordObj.id ? maxID : wordObj.id;
	}

	// load randomShow flag
	var flag = localStorage.getItem(LOG_HISTORY_FLAG);
	if (flag == null || flag == "on") {
		HISTORY_FLAG = true;
	}

	// load shownotiff flag
	var flag = localStorage.getItem(RANDOM_SHOW_FLAG);
	if (flag == null || flag == "on") {
		RANDOM_FLAG = true;
	}
	// load loghistory flag
	var flag = localStorage.getItem(SHOW_NOTIF_FLAG);
	if (flag == null || flag == "on") {
		NOTIF_FLAG = true;
	}
	// load sound flag
	var flag = localStorage.getItem(SOUND_REMIND_FLAG);
	if (flag == null || flag == "on") {
		SOUND_REMIND = true;
	}
	
	// load time
	var maxRemind = parseInt(localStorage.getItem(JV_MAX_REMIND));
	var maxHistory = parseInt(localStorage.getItem(JV_MAX_HISTORY));
	
	if (!isNaN(maxRemind) && maxRemind > 0)
		MAX_REMIND = maxRemind;
	if (!isNaN(maxHistory) && maxHistory > 0)
		MAX_HISTORY = maxHistory;

}
// khi click vao tu ben trai thi chua set vao cur-word nen bi loi
function search_newword() {
	inputText = $("#word-box").val();
	if (inputText.length <= 0 || inputText == cur_new_word)
		return;
	getResult(inputText, true);
}
function getResultJaVi(inputText, addRemind) {
	cur_new_word = inputText;
	$('body').addClass("loading-search");
	$.ajax({
		type : "GET",
		url : "http://mazii.net/api/search/" + inputText + "/10/1",
		success : function(result) {
			$('body').removeClass("loading-search");
			$("#new-word-ctn").html(makeJaVi(result.data));
			enter_enabled = true;
			if (HISTORY_FLAG && addRemind && result.found==true) {
				var wordObj = {
					id : ++maxID,
					word : inputText
				};
				addHistory(wordObj);
			}
		},
		error : function(result) {
			$('body').removeClass("loading-search");
			$("#new-word-ctn").html("<div class='no-result'>Error :(</div>");
			enter_enabled = true;
		}
	});
}
function search_kanji() {
	inputText = $("#word-box").val();
	if (inputText.length <= 0 || inputText == cur_kanji)
		return;
	getResult(inputText, true);
}
function getResultKanji(inputText, addRemind) {
	cur_kanji = inputText;
	if (getKanjiChara(inputText) == "")
		return;
	$("#div-main").addClass("loading-search");
	$.ajax({
		type : "GET",
		url : "http://mazii.net/api/mazii/" + inputText + "/10",
		success : function(e) {
			$("#div-main").removeClass("loading-search");
			$("#kanji-ctn").html(makeKanji(e.results));
			enter_enabled = true;
		},
		error : function(result) {
			$("#div-main").removeClass("loading-search");
			$("#kanji-ctn").html("<div class='no-result'>Error :(</div>");
			enter_enabled = true;
		}
	});
}
function search_grammar() {
	inputText = $("#word-box").val();
	if (inputText.length <= 0 || inputText == cur_grammar)
		return;
	cur_grammar = inputText;

}
function getResultGrammar(inputText, addRemind) {
	$("#div-main").addClass("loading-search");
	$.ajax({
		type : "POST",
		url : "search-grammar/" + inputText,
		data : {},
		success : function(result) {
			$("#new-word-ctn").html(result);
			$("#div-main").removeClass("loading-search");
			enter_enabled = true;
			if (HISTORY_FLAG && addRemind && result.indexOf("no results") < 0) {
				var wordObj = {
					id : ++maxID,
					word : inputText
				};
				addHistory(wordObj);
				$("#history-group").html(
						makeHisItem(wordObj) + $("#history-group").html());
			}
		}
	});
}
$('#word-box').keyup(function(e) {
	if (e.keyCode == 13) {
		if (enter_enabled) {
			search();
			enter_enabled = false;
		}
	}
});
function manualAddRemind() {
	string = $("#word-box").val();
	if (string.length == 0)
		return;
	var wordObj = {
		id : ++maxID,
		word : string
	};
	addRemind(wordObj);
	$("#word-box").val("");
}

$('.tab-control').tabcontrol().bind("tabcontrolchange", function(event, frame) {
	var id = $(frame).attr("id");
	if (id == "_page_1") {
		active_tab = NEW_WORD_TAB;
		search = search_newword;
		getResult = getResultJaVi;
		search();
	} else if (id == "_page_2") {
		active_tab = KANJI_TAB;
		search = search_kanji;
		getResult = getResultKanji;
		search();
	} else if (id == "_page_3") {
		active_tab = GRAMMAR_TAB;
		search = search_grammar;
		getResult = getResultGrammar;
		search();
	}
});
function getKanjiChara(e) {
	if (e == null)
		return "";
	var t = "", n = e.length;
	for (var r = 0; r < n; r++)
		isKanji(e.charAt(r)) && t.indexOf(e.charAt(r)) == -1
				&& (t += e.charAt(r));
	return t
}
function isRomanji(e) {
	var t = e.charCodeAt(0);
	return t >= 32 && t <= 126 ? !0 : !1
}
function isHiragana(e) {
	var t = e.charCodeAt(0);
	return t >= 12352 && t <= 12447 ? !0 : !1
}
function isKatakan(e) {
	var t = e.charCodeAt(0);
	return t >= 12448 && t <= 12543 ? !0 : !1
}
function isKanji(e) {
	if (e == "々")
		return !0;
	var t = e.charCodeAt(0);
	return t >= 19968 && t <= 40895 ? !0 : !1
}