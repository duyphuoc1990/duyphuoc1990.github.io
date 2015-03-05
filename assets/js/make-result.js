function makeNewWord(result) {
	var txt = "";
	var allItem = JSON.parse(result);
	var searchWord = $("#word-box").val();
	if (allItem.length > 0) {
		for (var i = 0; i < allItem.length; i++) {
			var item = allItem[i];
			txt += '<div class ="result-box">';
			txt += '<p class="word">【' + searchWord + '】</p>';
			var keb = item.keb.split(";");
			if (keb.length > 1) {
				var comma = false;
				txt += '<p class="keb">';
				for (var j = 0; j < keb.length; j++) {
					if (keb[j].length > 0) {
						if (comma) {
							txt += '、';
							comma = false;
						}
						txt += keb[j];
						comma = true;
					}
				}
				txt += '</p>';
			}
			var reb = item.reb.split(";");
			if (reb.length > 1) {
				var comma = false;
				txt += '<p class="reb">「';
				for (var j = 0; j < reb.length; j++) {
					if (reb[j].length > 0) {
						if (comma) {
							txt += '、';
							comma = false;
						}
						txt += reb[j];
						comma = true;
					}
				}
				txt += '」</p>';
			}
			var pos = item.pos.split(";");
			if (pos.length > 1) {
				var comma = false;
				txt += '<p class="pos">(';
				for (var j = 0; j < pos.length; j++) {
					if (pos[j].length > 0) {
						if (comma) {
							txt += ', ';
							comma = false;
						}
						txt += pos[j];
						comma = true;
					}
				}
				txt += ')</p>';
			}

			var field = item.field.split(";");
			if (field.length > 1) {
				var comma = false;
				txt += '<p class="field">(';
				for (var j = 0; j < field.length; j++) {
					if (field[j].length > 0) {
						if (comma) {
							txt += ', ';
							comma = false;
						}
						txt += field[j];
						comma = true;
					}
				}
				txt += ')</p>';
			}

			var dial = item.dial.split(";");
			if (dial.length > 1) {
				var comma = false;
				txt += '<p class="dial">(';
				for (var j = 0; j < dial.length; j++) {
					if (dial[j].length > 0) {
						if (comma) {
							txt += ', ';
							comma = false;
						}
						txt += dial[j];
						comma = true;
					}
				}
				txt += ')</p>';
			}

			var gloss = item.gloss.split(";");
			if (gloss.length > 1) {
				comma = false;
				txt += '<p class="gloss">';
				for (var j = 0; j < gloss.length; j++) {
					if (gloss[j].length > 0) {
						if (comma) {
							txt += ', ';
							comma = false;
						}
						txt += gloss[j];
						comma = true;
					}
				}
				txt += '</p>';
			}

			var re_restr = item.re_restr.split(";");
			if (re_restr.length > 1) {
				var comma = false;
				var title = true;
				for (var j = 0; j < re_restr.length; j++) {
					if (re_restr[j].length > 0) {
						if (comma) {
							txt += ', ';
							comma = false;
						}
						if (title) {
							txt += "<p class='re_restr-title'>Related words:</p>";
							txt += '<p class="re_restr">';
							title = false;
						}
						txt += re_restr[j];
						comma = true;
					}
				}
				txt += '</p>';
			}

			var xref = item.xref.split(";");
			if (xref.length > 1) {
				var comma = false;
				var title = true;
				for (var j = 0; j < xref.length; j++) {
					if (xref[j].length > 0) {
						if (comma) {
							txt += ', ';
							comma = false;
						}
						if (title) {
							txt += "<p class='xref-title'>Synonyms:</p>";
							txt += '<p class="xref">';
							title = false;
						}
						txt += xref[j];
						comma = true;
					}
				}
				txt += '</p>';
			}

			var ant = item.ant.split(";");
			if (ant.length > 1) {
				var comma = false;
				var title = true;
				for (var j = 0; j < ant.length; j++) {

					if (ant[j].length > 0) {
						if (comma) {
							txt += ', ';
							comma = false;
						}
						if (title) {
							txt += "<p class='ant-title'>Antonyms:</p>";
							txt += '<p class="ant">';
							title = false;
						}
						txt += ant[j];
						comma = true;
					}
				}
				txt += '</p>';
			}

			s_inf = item.s_inf.split(";");
			if (s_inf.length > 1) {
				var comma = false;
				var title = true;
				txt += '<p class="s_inf">';
				for (var j = 0; j < s_inf.length; j++) {
					if (s_inf[j].length > 0) {
						if (comma) {
							txt += ', ';
							comma = false;
						}
						if (title) {
							txt += "※";
							title = false;
						}
						txt += s_inf[j];
						comma = true;
					}
				}
				txt += '</p>';
			}
			txt += '</div>';
		}
		return txt;
	} else {
		return "<div class='no-result'>no results :(</div>";
	}
}
function makeJaViOld(result) {
	var txt = "";
	var allItem = JSON.parse(result);
	if (allItem.length > 0) {
		for (var i = 0; i < allItem.length; i++) {
			var item = allItem[i];
			txt += '<div class ="result-box">';
			txt += '<p class="word">【' + item.word + '】</p>';
			item.content = item.content.replace('∴「', '<p class="reb">「');
			item.content = item.content.replace(/∴「/g, '<br/><p class="reb">「');
			item.content = item.content.replace(/」/g, '」</p>');
			item.content = item.content.replace(/☆/g, '<p class="field">☆');
			item.content = item.content.replace(/◆/g, '</p><p class="ja-mean">◆');
			item.content = item.content.replace(/※/g, '</p><p class="ja-example">※');
			item.content = item.content.replace(/:/g, '</p><p class="ja-trans">');
			txt += item.content + '</p>';
		}
		return txt;
	} else {
		return "<div class='no-result'>no results :(</div>";
	}
}

function makeJaVi(data) {
	var txt = "";
    for (var i = 0; i < data.length; i++) {
        if (cur_new_word != data[i].word)
            continue;
        txt += '<div class ="result-box">';
        txt += '<p class="word">【'+data[i].word+'】</p>';
        txt += '<p class="reb">'+data[i].phonetic+'</p>';
        txt += '<br/>';
        for (var j = 0; j < data[i].means.length; j++) {
        	txt += '<p class="field">☆'+data[i].means[j].kind+'</p>';
        	txt += '<p class="ja-mean">◆'+data[i].means[j].mean+'</p>';
            for (var k = 0; k < data[i].means[j].examples.length; k++) {
            	txt += '<p class="ja-example">※'+data[i].means[j].examples[k].content+'</p>';
            	txt += '<p class="ja-trans">'+data[i].means[j].examples[k].mean+'</p>';
            }
        }
        txt +='</div>';
    }
    return txt;
}
function makeKanjiOld(result) {
	var txt = "";
	var allItem = JSON.parse(result);
	if (allItem.length > 0) {
		for (var i = 0; i < allItem.length; i++) {
			var item = allItem[i];
			txt += '<div class ="result-box">';
			txt += '<p class="word">【' + item.word + '】</p>';
			txt += '<p class="mean"><b>Nghĩa: '  + item.mean + '</b></p><br/>';
			txt += '<p class="comp">' + item.comp + '</p>';
			txt += '<p class="level">Level: '  + item.level + '</p><br/>';
			txt += '<p class="stroke_count">Stroke Count: '  + item.stroke_count + '</p><br/>';
			txt += '<p class="on">Onyomi: ' + item.on.replace(/ /g, "　") + '</p><br/>';
			txt += '<p class="kun">Kunyomi: ' + item.kun.replace(/ /g, "　") + '</p><br/>';
			txt += '<p class="detail">. ' + item.detail.replace(/##/g, "<br/>. ") + '</p></div>';
		}
		return txt;
	} else {
		return "<div class='no-result'>no results :(</div>";
	}
}
function makeKanji(data) {
	var txt = "";
    for (var i = 0; i < data.length; i++) {
    	var item = data[i];
    	txt += '<div class ="result-box">';
		txt += '<p class="word">【' + item.kanji + '】</p>';
		txt += '<p class="mean"><b>Nghĩa: '  + item.mean + '</b></p><br/>';
		txt += '<p class="comp">';
	       for (var j = 0; data[i].compDetail!=null&&j < data[i].compDetail.length; j++) {
	            txt += data[i].compDetail[j].w;
	            txt += '( '+ data[i].compDetail[j].h+')';
	        }
	       txt +='</p>';
		txt += '<p class="level">Level: '  + item.level + '</p><br/>';
		txt += '<p class="stroke_count">Stroke Count: '  + item.stroke_count + '</p><br/>';
		txt += '<p class="on">Onyomi: ' + item.on.replace(/ /g, "　") + '</p><br/>';
		txt += '<p class="kun">Kunyomi: ' + item.kun.replace(/ /g, "　") + '</p><br/>';
		txt += '<p class="detail">. ' + item.detail.replace(/##/g, "<br/>. ") + '</p></div>';
 
       txt +='</div>';
    }
    return txt;
}