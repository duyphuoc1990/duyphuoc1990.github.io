function applySetting() {
	var timeShow = parseInt($('#time-show').val());
	var timeDelay = parseInt($('#time-delay').val());
	if (!isNaN(timeShow) && timeShow > 0)
		TIME_SHOW = timeShow;
	if (!isNaN(timeDelay) && timeDelay > 0) {
		if (timeDelay == null || timeDelay < timeShow)
			timeDelay = timeShow;
		TIME_DELAY = timeDelay;
	}
	if ($('#randomChk').is(':checked')) {
		localStorage.setItem(RANDOM_SHOW_FLAG, "on");
		RANDOM_FLAG = true;
	} else {
		localStorage.setItem(RANDOM_SHOW_FLAG, "off");
		RANDOM_FLAG = false;
	}

	if ($('#notifChk').is(':checked')) {
		localStorage.setItem(SHOW_NOTIF_FLAG, "on");
		NOTIF_FLAG = true;
	} else {
		localStorage.setItem(SHOW_NOTIF_FLAG, "off");
		NOTIF_FLAG = false;
	}
	if ($('#historyChk').is(':checked')) {
		localStorage.setItem(LOG_HISTORY_FLAG, "on");
		HISTORY_FLAG = true;
	} else {
		localStorage.setItem(LOG_HISTORY_FLAG, "off");
		HISTORY_FLAG = false;
	}
	if ($('#RemindSoundChk').is(':checked')) {
		localStorage.setItem(SOUND_REMIND_FLAG, "on");
		SOUND_REMIND = true;
	} else {
		localStorage.setItem(SOUND_REMIND_FLAG, "off");
		SOUND_REMIND = false;
	}
	localStorage.setItem(HIS_TIME_SHOW, TIME_SHOW);
	localStorage.setItem(HIS_TIME_DELAY, TIME_DELAY);

	var maxRemind = parseInt($('#max-remind').val());
	var maxHistory = parseInt($('#max-history').val());
	if (!isNaN(maxRemind) && maxRemind > 0)
		MAX_REMIND = maxRemind;
	if (!isNaN(maxHistory) && maxHistory > 0)
		MAX_HISTORY = maxHistory;

	localStorage.setItem(JV_MAX_REMIND, MAX_REMIND);
	localStorage.setItem(JV_MAX_HISTORY, MAX_HISTORY);
	$.Dialog.close();
}
function deleteAllHistory() {
	localStorage.removeItem(JVDICT_REMIND);
	localStorage.removeItem(JVDICT_HISTORY);
	location.reload();
}
function resetApp() {
	localStorage.clear();
	location.reload();
}
function settingPanelInit() {
	$('#time-show').val(TIME_SHOW);
	$('#time-delay').val(TIME_DELAY);
	if (RANDOM_FLAG)
		$('#randomChk').prop('checked', true);
	if (NOTIF_FLAG)
		$('#notifChk').prop('checked', true);
	if (HISTORY_FLAG)
		$('#historyChk').prop('checked', true);
	if (SOUND_REMIND)
		$('#RemindSoundChk').prop('checked', true);

	$('#max-remind').val(MAX_REMIND);
	$('#max-history').val(MAX_HISTORY);

}

function getSettingPanel() {
	createDialog(settingPanelTxt, "Setting Panel");
}

function getHelpPanel() {
	createDialog(helpPanelTxt, "Help Panel");
}

function createDialog(panelHtml, title) {
	$.Dialog({
		overlay : true,
		shadow : true,
		flat : true,
		icon : '<img src="./assets/image/logo.png">',
		title : 'Flat window',
		content : '',
		padding : 10,
		onShow : function(_dialog) {
			var content = panelHtml;
			$.Dialog.title(title);
			$.Dialog.content(content);
			$.Metro.initInputs();
			settingPanelInit();
		}
	});
}

window.onload = function() {
	document.getElementById("div-main").classList.remove("loading-start");
	loadLocalStore();
	notifyStart();
	setHeight();
};
window.addEventListener('resize', function(event) {
	setHeight();
});



var helpPanelTxt='<div class="help-div"><div><b>Giới thiệu chức năng cơ bản của từ điển:</b></div><div>&nbsp; 1.<span class="Apple-tab-span" style="white-space: pre"> </span>Nhập từ và nhấn nút search để tìm kết quả.</div><div>&nbsp; 2.<span class="Apple-tab-span" style="white-space: pre"> </span>Bật tắt các tùy chọn tìm kiếm từ, kanji, ngữ pháp.</div><div>&nbsp; 3.<span class="Apple-tab-span" style="white-space: pre"> </span>Click vào nút hình cái chuông trên panel History để nhắc từ muốn nhớ</div><div>&nbsp; &nbsp;&lt;chú ý: khi close tab thì nhắc từ sẽ tự động mất, dữ liệu reminder được lưu trên local nên chỉ mất khi xóa cache data&gt;</div><div>&nbsp; 4.<span class="Apple-tab-span" style="white-space: pre"> </span>Mở setting panel bên góc bên phải để setting thời gian hiện notification,bật tắt notification, log history, hay chọn chế độ nhắc từ theo ngẫu nhiên...</div><div>&nbsp; 5.<span class="Apple-tab-span" style="white-space: pre"> </span>Nhấnnút help để vào diễn đàn …</div><div><b>Hạn chế:</b></div><div>&nbsp; 1. ứng dụng này sử dụng tài nguyên miễn phí nên tốc độ khá chậm :(</div><div>&nbsp; 2. chưa có tiếng việt, từ điển kanji</div><div>&nbsp; (sẽ được cập nhật trong phiên bản tiếp theo)</div></div>';
var settingPanelTxt='<div class="setting-div"><div><span>Time To Show Notification(s):</span><input id="time-show" type="number"></div><div><span>Time To Delay Notification(s):</span><input id="time-delay" type="number"></div><div><span>Max Number Of Reminder Word:</span><input id="max-remind" type="number"></div><div><span>Max Number Of History Word:</span><input id="max-history" type="number"></div><div class="input-control switch jv-setting-switch" data-role="input-control"><label> Random Show <input id="randomChk" type="checkbox"> <span class="check jv-setting-check"></span></label> <label> Show Notification <input id="notifChk" type="checkbox"> <span class="check jv-setting-check"></span></label> <label> Log History<input id="historyChk" type="checkbox"> <span class="check jv-setting-check"></span></label> <label> Remind With Sound<input id="RemindSoundChk" type="checkbox"> <span class="check jv-setting-check"></span></label></div><div class="form-actions"><button class="button primary" onclick="applySetting()">Apply</button> <button class="button" type="button" onclick="$.Dialog.close()">Cancel</button> <button class="button del-button" onclick="deleteAllHistory()">Delete History</button> <button class="button del-button" onclick="resetApp()"><b>Reset All</b></button> </div></div>';