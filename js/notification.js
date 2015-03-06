var imageURL = "./images/logo.png";
instance = null;
var index = 0;

function notifyStart() {
	index = nextIndex(index);
	if (NOTIF_FLAG && jvremind[index] != null) {
		loadSound(jvremind[index].word);
	}
	setTimeout("notifyStart()", TIME_DELAY * 1000);
}

function nextIndex(index) {
	if (jvremind.length == 0)
		return -1;
	if (RANDOM_FLAG)
		return Math.floor(Math.random() * jvremind.length);
	if (index < jvremind.length - 1) {
		return (index + 1);
	}
	return 0;
}
function loadSound(notifTxt) {
	if (SOUND_REMIND) {
		soundURL = 'http://www.ispeech.org/p/generic/getaudio?text=' + notifTxt
				+ '&voice=jpjapanesefemale&speed=-2&action=convert';
		$("#sound-remind").attr("src", soundURL);
		$("#sound-control").trigger('load');
	}
	setTimeout("notifyMe('" + notifTxt + "')", 3000);
}
function notifyMe(notifTxt) {
	if (!("Notification" in window)) {
		alert("Trình duyệt này không hỗ trợ nhắc từ, hãy dùng phiên bản mới nhất của Chrome, Firefox!");
		//delAllRemind();
		NOTIF_FLAG=FALSE;
	} else if (Notification.permission === "granted") {
		instance = new Notification("JaViDict", {
			icon : imageURL,
			body : notifTxt
		});

	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function(permission) {
			if (permission === "granted") {
				instance = new Notification(notifTxt, {
					icon : imageURL
				});
			}
		});
	}
	if (instance != null)
		setTimeout("instance.close()", TIME_SHOW * 1000);

	instance.onclick = function() {
	};
	instance.onerror = function() {
	};
	instance.onclose = function() {
	};
	instance.onshow = function() {
		if (SOUND_REMIND) {
			$("#sound-control").trigger('play');
		}
	};
}
