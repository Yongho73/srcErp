/*----------------------------------------------------------------------------------
 * 개발 편의 사용 함수 신중히 추가 요망 
----------------------------------------------------------------------------------*/

/**
 * jquery function 추가
 * 화면의 중앙에 놓기
 * @returns this
 * @author 변형구
 * @since 2015-12-01
 * @version 1.0
 */
jQuery.fn.center = function() {
	this.css("position", "absolute");
	this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) /2 ) + $(window).scrollTop()) + "px" );  
	this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) /2 ) + $(window).scrollLeft()) + "px" );
	return this;
};

 
/**
 * 브라우져의 종류를 리턴하는 함수 
 * @returns {String}
 * @author 변형구
 * @since 2013-03-01
 * @version 1.0
 */
var gf_GetBrowserKind = function() {
	var word; 
	var version = "N/A"; 

	var agent = navigator.userAgent.toLowerCase(); 
	var name = navigator.appName; 
	
	if ( name == "Microsoft Internet Explorer" ) {
		word = "MSIE"; 
	}
	else { 
		// IE 11 
		if ( agent.search("trident") > -1 ) word = "MSIE"; 
		 // IE 12  ( Microsoft Edge ) 
		else if ( agent.search("edge/") > -1 ) word = "EDGE";
		else if ( agent.search("chrome") > -1 ) word = "CHROME";
		else if ( agent.search("safari") > -1 ) word = "SAFARI";
		else if ( agent.search("firefox") > -1 ) word = "FIREFOX";
		else if ( !!window.opera ) word = "OPERA";
	}
	return word;
};

/**
 * IE 의 경우 브라우져의버전을 가져온다.  
 * @returns 버전
 * @author 변형구
 * @since 2013-03-01
 * @version 1.0
 */
var gf_getBrowserVersion = function() { 

	 var word; 
	 var version = "N/A"; 

	 var agent = navigator.userAgent.toLowerCase(); 
	 var name = navigator.appName; 

	 // IE old version ( IE 10 or Lower ) 
	 if ( name == "Microsoft Internet Explorer" ) word = "msie "; 

	 else { 
		 // IE 11 
		 if ( agent.search("trident") > -1 ) word = "trident/.*rv:"; 

		 // IE 12  ( Microsoft Edge ) 
		 else if ( agent.search("edge/") > -1 ) word = "edge/"; 
	 } 

	 var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 

	 if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2; 

	 return version; 
}; 

/**
 * browser 의 종류와 버전을 가지는 전역 변수 
 */
var gf_Browser = {
    ie    	: gf_GetBrowserKind() == 'MSIE',
    edge  	: gf_GetBrowserKind() == 'EDGE',
    opera 	: gf_GetBrowserKind() == 'OPERA',
    safari 	: gf_GetBrowserKind() == 'SAFARI',
    chrome 	: gf_GetBrowserKind() == 'CHROME',
    firefox : gf_GetBrowserKind() == 'FIREFOX', 
    version : gf_getBrowserVersion()
};

/** 
 * 탭 페이지내 iframe 의 스크롤바 없애기 
 * @param frameId
 */
var gf_RemoveScrollTabIframe = function(frameId) {
	$(parent.document).find("#"+frameId +" iframe").attr("scrolling", "no");
};

/**
 * URL내 원하는 파라메터 값 가져오기
 * @param key
 * @returns
 */
var gf_GetUrlParam = function(key) {	
	var result = new RegExp(key + "=([^&]*)","i").exec(window.location.search);
	if(result) decodeURIComponent(result[1])||"";
	return $("[name='"+key+"'").val();
};
       
/**
 * 폼 항목별 값 가져오기
 * @param form
 * @param name
 * @param type
 * @returns
 */      
var gf_FormGetValue = function(form, name, type) {
	
	if(type=='radio') {
	    var str = $("#" + form + " input[name='" + name + "']:checked").val();
	    return gf_IsNull(str)? '' : str;
	} else 
	if(type=='combo') {
	    var str = $("#" + form + " select[name='" + name + "'] option:selected").val();
	    return gf_IsNull(str)? '' : str;
	} else 
	if(type=='chkbox') {
	    var str = $("#" + form + " input[name='" + name + "']:checked").val();
	    return gf_IsNull(str)? '' : str;
	} else 
	if(type=='chkboxYN') {
	    var str = $("#" + form + " input[name='" + name + "']").prop("checked");
        if(str) return '1';
	    else return '0';
    } else 
    if(type=='textarea') { 	
        var str = $("#" + form + " textarea[name='" + name + "']").val();
        return gf_IsNull(str)? '' : str;
    } else {
        var str = $("#" + form + " input[name='" + name + "']").val();
        return gf_IsNull(str)? '' : str;
	}
};

/**
 * 폼 항목별 값 세팅
 * @param form
 * @param name
 * @param value
 * @param type
 * @returns
 */
var gf_FormSetValue = function(form, name, value, type) {
	
	if(type=='radio') {
        $("#" + form + " input[name='" + name + "']:input[value='"+value+"']").prop("checked", true).change();
	} else 
	if(type=='combo') {
	    $("#" + form + " select[name='" + name + "']").val(value).change();
	} else 
	if(type=='chkbox') {
	    $("#" + form + " input[name='" + name + "']").prop("checked", value).change();
    } else 
    if(type=='textarea') {
        $("#" + form + " textarea[name='" + name + "']").val(value).change();
	} else {
	    $("#" + form + " input[name='" + name + "']").val(value).change();
	}
};

/**
 * 재귀호출 트리구조 만들기
 * @param arrayList
 * @param rootId
 * @returns
 */
var gf_TreeModel = function(arrayList, rootId) {
	
	//console.log(arrayList);
	
	var rootNodes = [];
	var list = arrayList;
	
	function traverse(nodes, item, index) {  			   		
		if (nodes instanceof Array) {
			return nodes.some(function (node) {
				if (node.id === item.parentId) {
					node.rows = node.rows || [];
					return node.rows.push(list.splice(index, 1)[0]);
				}
				return traverse(node.rows, item, index);
			});
		}
	};
	
	//console.log("list.length : " + list.length);

	var cnt = 0;
	while (list.length > 0) {
		list.some(function (item, index) {
			//console.log("list2.length : " + list.length);
			cnt++;
			if (item.parentId === rootId) {   
				//console.log("if : " + cnt); 				     				
				return rootNodes.push(list.splice(index, 1)[0]);
			}
			//console.log(cnt);
			//console.log(item);
			return traverse(rootNodes, item, index);
		});
	}
	
	//console.log("end");
	
	return rootNodes;
};

/**
 * 재귀호출 트리구조 만들기
 * @param arrayList
 * @param rootId
 * @returns
 */
var gf_TreeModelLeftMenu = function(arrayList, rootId, locale) {

	var rootNodes = [];
	var list = arrayList;
	var tmp;
	
	function traverse(nodes, item, index) {  			   		
		if (nodes instanceof Array) {
			return nodes.some(function (node) {
				if (node.id === item.parentId) {
					node.items = node.items || [];					
					tmp = list.splice(index, 1)[0];					
					tmp.icons = {file : "dhxtreeview_icon_file" }; 					 
					if(locale === 'kor') {
						tmp.text = tmp.text;
					} else
					if(locale === 'third') {
						tmp.text = tmp.textThird;
					} else {
						tmp.text = tmp.textEng;
					}
					
					/*개발 중 임시 : 개발 완료 여부 표시
					if(tmp.finishChk === "2"){
						tmp.text = "(OK)" + tmp.text;
					}
					else if(tmp.finishChk === "1"){
						tmp.text = "(DEV)" + tmp.text;
					}
					개발 중 임시 : 개발 완료 여부 표시*/
					return node.items.push(tmp);
				}
				item.icons = {file : "dhxtreeview_icon_file" }; 
				return traverse(node.items, item, index);
			});
		}
	};

	while (list.length > 0) {
		list.some(function (item, index) {
			
			// 트리 open, close 설정
			item.open = '0';
			
			if (item.parentId === rootId) {
				
				tmp = list.splice(index, 1)[0];
				item.icons = {file : "dhxtreeview_icon_file" }; 
				if(locale === 'kor') {
					tmp.text = tmp.text;
				} else
				if(locale === 'third') {
					tmp.text = tmp.textThird;
				} else {
					tmp.text = tmp.textEng;
				}
				
				return rootNodes.push(tmp);
			}

			return traverse(rootNodes, item, index);
		});
	}
	
	return rootNodes;
};

/**
 * validation 검증용 함수 집합 정의
 */
var gv_ValidateMethods = {
        dataCaseSetting : {
            fromFormat : "dd-M-yy",
            toFormat : "dd-M-yy"
        },
        /* 빈값인지 확인 빈값이면 false*/
        required: function( value) {
            return $.trim(value).length > 0;
        },
        /* email 형식에 어긋나면 false
        email: function( value) {
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
        },
        */
        /* URL 형식에 어긋나면 false*/
        url: function( value) {
            return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
        },
        /* URL 형식에 어긋나면 false*/
        date: function( value) {
            return !/Invalid|NaN/.test(new Date(value).toString());
        },
        /* dateISO 형식에 어긋나면 false*/
        dateISO: function( value) {
            return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
        },
        /* 숫자 형식에 어긋나면 false*/
        number: function( value ) {
            return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
        },
        /* 숫자 형식에 어긋나면 false*/
        digits: function( value ) {
            return /^\d+$/.test(value);
        },

        /* 체크할길이보다 문자길이가 길면 false*/
        minlength: function( value, param ) {
            var length = $.isArray( value ) ? value.length : $.trim(value).length;
            return length >= param;
        },

        /* 체크할길이보다 문자길이가 짧으면 false*/
        maxlength: function( value, param ) {
            var length = $.isArray( value ) ? value.length : $.trim(value).length;
            return length <= param;
        },

        /* 받은문자길이가 체크할범위를 벗어나면 false*/
        rangelength: function( value, param ) {
            var length = $.isArray( value ) ? value.length : $.trim(value).length;
            return ( length >= param[0] && length <= param[1] );
        },

        /* 체크할숫자보다 값이 작으면 false*/
        min: function( value, param ) {
            return value >= param;
        },

        /* 체크할숫자보다 값이 크면 false*/
        max: function( value, param ) {
            return value <= param;
        },

        /* 값이 체크할숫자범위를 벗어나면 false*/
        range: function( value, param, setting) {
            return ( value >= param[0] && value <= param[1] );
        },
        /* 시작날짜보다 마지막날짜가 크면 false
         * fromDateString,toDateString : "15-Jan-2014", "15-Jan-2014"
         * fromDateString,toDateString : "20140205", "20140206", {fromFormat: "yymmdd", toFormat: "yymmdd"}
         * fromDateNumber,toDateNumber : 1389750318127, 1392428723574
         * fromDate,toDate : Date, Date
         * */
        dateCase: function(fromDate, toDate, setting){
            if(fromDate instanceof Date){
                return fromDate <= (typeof(toDate) == "number"? new Date(toDate): toDate);
            }else if(typeof(fromDate) == "number"){
                return gv_ValidateMethods.dateCase.call(gv_ValidateMethods, new Date(fromDate), toDate);
            }else{
                setting = typeof(setting) == "undefined"? {}: setting;
                setting = $.extend(this.dataCaseSetting, setting);
                fromDate = $.datepicker.parseDate(setting.fromFormat, fromDate);
                toDate = $.datepicker.parseDate(setting.toFormat, toDate);
                return fromDate <= toDate;
            }
        },
        /* 시작날짜/시간보다 마지막날짜/시간이 크면 false
         * fromDateString,toDateString : "15-Jan-2014 01:05", "15-Jan-2014 01:06"
         * */
        dateTimeCase: function(fromDateTime, toDateTime){
            var fromDate = fromDateTime.split(" ");
            var fromTime = fromDate[1];
            var toDate = toDateTime.split(" ");
            var toTime = toDate[1];
            fromDate = $.datepicker.parseDate(this.dataCaseSetting.fromFormat, fromDate[0]);
            toDate = $.datepicker.parseDate(this.dataCaseSetting.toFormat, toDate[0]);

            if(gv_ValidateMethods.dateCase.call(gv_ValidateMethods, fromDate, toDate)){
                var fromHours = fromTime.split(":");
                var fromMinutes = Number(fromHours[1]);
                var toHours = toTime.split(":");
                var toMinutes = Number(toHours[1]);
                fromHours = Number(fromHours[0]);
                toHours = Number(toHours[0]);

                fromDate.setHours(fromHours);
                fromDate.setMinutes(fromMinutes);
                toDate.setHours(toHours);
                toDate.setMinutes(toMinutes);

                return fromDate <= toDate;
            }
            return false;
        },

        /* 위아래로 지정된 갯수의 연속된 숫자/문자가 있으면 false*/
        consecutive: function( value, param) {
            if(this._repeated(value, param, 1))
                return this._repeated(value, param, -1);
            return false;
        },

        /* 지정된 갯수의 반복된 숫자/문자가 있으면 false*/
        repeated: function( value, param) {
            return this._repeated(value, param, 0);
        },

        _repeated: function( value, param, addVal) {
            var tmp = 0;
            var cnt = 0;
            for(var i=0; i<value.length; i++){
                var val = value.charCodeAt(i);
                if( tmp == val ){
                    cnt++;
                }else{
                    cnt = 0;
                }
                tmp = val + addVal;

                if(cnt >= param - 1){
                    return false;
                }
            }
            return true;
        }
};

/**
 * value가 func 타입으로 valid한지를 검사한다.
 * @param func 검증 함수 지시자 "required" 과 같이 함수명을 문자열로 전달한다.
 * @param value 검증할 값
 * @param param 추가 파라메터 예를 들어 range 검사에는 param을 min,max 배열로 넘겨주어야 한다. ex) [0,100] 
 * @param setting param 외의 추가 옵션설정이다. 예를 들어 날짜의 format 같은 것을 들 수 있다.
 * @returns boolean valid 하면 true
 */
var gf_Validate = function(func, value, param, setting){
    return gv_ValidateMethods[func].call(gv_ValidateMethods, value, param, setting);
};

/**
 *  'email' 항목에 대한 validation을 수행한다.
 * @param value 검사 대상
 * @returns boolean 유효한 email 이면 true
 * @author 홍두희
 * @since 2011-10-01
 * @version 1.0
 */
var covEmailValidator_validate = function(value) {
    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    if (value.search(format) == -1) {
        this.message = gMsg.getMsg(ezMessage("co.err.noValid2"), [ "@" ]);
        return false;
    }
    this.validity = true;
    return true;
};

/**
 * 자동 닫기 메시지창
 * @param message	메시지 내용
 * @param times		자동으로 닫을 시간 4000 = 4초
 * @returns
 */
var gf_DivMsgAutoAlert = function(message, times){
	if($('body').find("div[id='message']").size() <= 0) {
		$('body').append('<div id="message"></div>');
	}

	var str ="<div id='wrap_notice' style='width:300px;'>"
		   + "<div id='header_notice'>"
		   + "<h2 class='ac'>알 림</h2>"
		   + "</div>"
		   + "<hr>"
		   + "<div id='content_notice'>"
		   + "<p class='ac'>" + message + "</p>"
		   + "<p class='ac mt10'><button class='btn_confirm' onclick='gf_DivMsgAlertClose();'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button></p>"
		   + "</div>"
		   + "</div>";
	$("#message").html(str);
	$("#content_notice .btn_confirm").focus();
	
//	setTimeout(function(){gf_DivMsgAlertClose();}, times);
	//로직 오류로 인해 주석처리함
	//추후 다시 확인 해야 됨.
};

/**
 * div 메지지+콜백
 * @param message
 * @param callBack
 */
var gf_DivMsgAlert = function(message,focusId){
	
	if($('body').find("div[id='message']").size() <= 0) {
		$('body').append('<div id="message"></div>');
	}
	
	var str ="<div id='wrap_notice' style='width:300px;'>"
		   + "<div id='header_notice'>"
		   + "<h2 class='ac'>알 림</h2>"
		   + "</div>"
		   + "<hr>"
		   + "<div id='content_notice'>"
		   + "<p class='ac'>" + message + "</p>"
		   + "<p class='ac mt10'><button type='button' class='btn_confirm' onclick='gf_DivMsgAlertClose(\""+focusId+"\");'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button></p>" 
		   + "</div>"
		   + "</div>";
	$("#message").html(str);		
	$('#content_notice .btn_confirm').focus();	
};

var gf_DivMsgCallbak = function(message,callBack){
	
	if($('body').find("div[id='message']").size() <= 0) {
		$('body').append('<div id="message"></div>');
	}
	
	var str ="<div id='wrap_notice' style='width:300px;'>"
		   + "<div id='header_notice'>"
		   + "<h2 class='ac'>알 림</h2>"
		   + "</div>"
		   + "<hr>"
		   + "<div id='content_notice'>"
		   + "<p class='ac'>" + message + "</p>"
		   + "<p class='ac mt10'><button class='btn_confirm' onclick='"+callBack+"'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button>&nbsp;&nbsp;"
		   + "</div>"
		   + "</div>";
	$("#message").html(str);
	$("#content_notice .btn_confirm").focus();
};

var gf_DivMsgConfirm = function(message, callBackTrue, callBackFalse){
	
	if($('body').find("div[id='message']").size() <= 0) {
		$('body').append('<div id="message"></div>');
	}
	
	var str ="<div id='wrap_notice' style='width:300px;'>"
		   + "<div id='header_notice'>"
		   + "<h2 class='ac'>알 림</h2>"
		   + "</div>"
		   + "<hr>"
		   + "<div id='content_notice'>"
		   + "<p class='ac'>" + message + "</p>"
		   + "<p class='ac mt10'><button class='btn_confirm' id='btnYesConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackTrue== 'string' ? callBackTrue : '' ) +"'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button>&nbsp;&nbsp;"
		   + "<button class='btn_confirm' id='btnNoConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackFalse== 'string' ? callBackFalse : '' ) +"'><span class='glyphicon glyphicon-ban-circle'></span>&nbsp;취소</button></p>"
		   + "</div>"
		   + "</div>";
	$("#message").html(str);
	$("#content_notice .btn_cancel").focus();
	
	if(typeof callBackTrue == 'function') {
		$("#btnYesConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			callBackTrue();
			gf_DivMsgAlertClose();
	    });
	}
	
	if(typeof callBackFalse == 'function') {
		$("#btnNoConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			callBackFalse();
			gf_DivMsgAlertClose();
	    });
	}
	
	
};



var gf_DivMsgConfirm2 = function(message, callback){
	
	if($('body').find("div[id='message']").size() <= 0) {
		$('body').append('<div id="message"></div>');
	}
	
	var str ="<div id='wrap_notice' style='width:300px;'>"
		   + "<div id='header_notice'>"
		   + "<h2 class='ac'>알 림</h2>"
		   + "</div>"
		   + "<hr>"
		   + "<div id='content_notice'>"
		   + "<p class='ac'>" + message + "</p>"
		   + "<p class='ac mt10'><button class='btn_confirm' id='btnYesConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackTrue== 'string' ? callBackTrue : '' ) +"'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button>&nbsp;&nbsp;"
		   + "<button class='btn_confirm' id='btnNoConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackFalse== 'string' ? callBackFalse : '' ) +"'><span class='glyphicon glyphicon-ban-circle'></span>&nbsp;취소</button></p>"
		   + "</div>"
		   + "</div>";
	$("#message").html(str);
	$("#content_notice .btn_cancel").focus();
	
	if(typeof callback == 'function') {
		$("#btnYesConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			callback(true);
			gf_DivMsgAlertClose();
	    });

		$("#btnNoConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			callback(false);
			gf_DivMsgAlertClose();
	    });
	}
};

/**
 * div 메시지 처리
 */
var gf_DivMsgAlertClose = function(focusId){
	$('body').find("div[id='message']").remove();
	$(focusId).focus();
};


var gf_AutoDate = function( e, oThis ){
    
    var num_arr = [ 
        97, 98, 99, 100, 101, 102, 103, 104, 105, 96,
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57
    ]
    
    var key_code = ( e.which ) ? e.which : e.keyCode;
    if( num_arr.indexOf( Number( key_code ) ) != -1 ){
    
        var len = oThis.value.length;
        if( len == 4 ) oThis.value += "-";
        if( len == 7 ) oThis.value += "-";
    
    }    
};

var gf_PageNate_old = function(pageInfo, divId, fnc){
	
	var firstIndex  			=  parseInt(pageInfo.firstIndex);
	var	lastIndex 				=  parseInt(pageInfo.lastIndex);
	var	totalPageCount 			=  parseInt(pageInfo.totalPageCount);
	var	firstPageNo 			=  parseInt(pageInfo.firstPageNo);
	var	lastPageNo 				=  parseInt(pageInfo.lastPageNo);
	var	currentPageNo 			=  parseInt(pageInfo.currentPageNo);
	var	pageSize 				=  parseInt(pageInfo.pageSize);
	var	firstPageNoOnPageList 	=  parseInt(pageInfo.firstPageNoOnPageList);
	var	lastPageNoOnPageList 	=  parseInt(pageInfo.lastPageNoOnPageList);		 
	var pagingHtml 				= [];
			 		
	pagingHtml.push('<span class="first" onclick="'+fnc+'('+firstPageNo+')"> << <span class="blind">First page</span></span>')
	
	if(firstPageNoOnPageList === 1) pagingHtml.push('<span class="prev"> <  <span class="blind">prev</span></span>')
	else pagingHtml.push('<span class="prev" onclick="'+fnc+'('+(firstPageNoOnPageList-pageSize)+')"> <  <span class="blind">prev</span></span>')
			
	for(firstPageNoOnPageList; firstPageNoOnPageList <= lastPageNoOnPageList; firstPageNoOnPageList++){
		if(firstPageNoOnPageList === currentPageNo) pagingHtml.push('<a href="#none" class="active">'+firstPageNoOnPageList+'</a>')
		else pagingHtml.push('<a href="javascript:'+fnc+'('+firstPageNoOnPageList+');">'+firstPageNoOnPageList+'</a>')
	}

	if(lastPageNoOnPageList === lastPageNo) pagingHtml.push('<span class="next"> > <span class="blind">next</span></span>');
	else pagingHtml.push('<span class="next" onclick="'+fnc+'('+(lastPageNoOnPageList+1)+')"> > <span class="blind">next</span></span>');
	
	pagingHtml.push('<span class="last" onclick="'+fnc+'('+lastPageNo+')"> >> <span class="blind">last page</span></span>');
	
	$(divId).html(pagingHtml.join(""));
};

var gf_PageNate = function(pageInfo, divId, fnc){
	
	var firstIndex  			=  parseInt(pageInfo.firstIndex);
	var	lastIndex 				=  parseInt(pageInfo.lastIndex);
	var	totalPageCount 			=  parseInt(pageInfo.totalPageCount);
	var	firstPageNo 			=  parseInt(pageInfo.firstPageNo);
	var	lastPageNo 				=  parseInt(pageInfo.lastPageNo);
	var	currentPageNo 			=  parseInt(pageInfo.currentPageNo);
	var	pageSize 				=  parseInt(pageInfo.pageSize);
	var	firstPageNoOnPageList 	=  parseInt(pageInfo.firstPageNoOnPageList);
	var	lastPageNoOnPageList 	=  parseInt(pageInfo.lastPageNoOnPageList);		 
	var pagingHtml 				= [];

	pagingHtml.push('<a href="#none" onclick="'+fnc+'('+firstPageNo+')"> << </a>')
	
	if(firstPageNoOnPageList === 1) pagingHtml.push('<a href="#none"> <  </a>')
	else pagingHtml.push('<a href="#none" onclick="'+fnc+'('+(firstPageNoOnPageList-pageSize)+')"> <  </a>')
			
	for(firstPageNoOnPageList; firstPageNoOnPageList <= lastPageNoOnPageList; firstPageNoOnPageList++){
		if(firstPageNoOnPageList === currentPageNo) pagingHtml.push('<a href="#none" class="active">'+firstPageNoOnPageList+'</a>')
		else pagingHtml.push('<a href="javascript:'+fnc+'('+firstPageNoOnPageList+');">'+firstPageNoOnPageList+'</a>')
	}

	if(lastPageNoOnPageList === lastPageNo) pagingHtml.push('<a href="#none" class="next"> > </a>');
	else pagingHtml.push('<a href="#none" onclick="'+fnc+'('+(lastPageNoOnPageList+1)+')"> > </a>');
	
	pagingHtml.push('<a href="#none" class="last" onclick="'+fnc+'('+lastPageNo+')"> >> </a>');
	
	$(divId).html(pagingHtml.join(""));
};

/**
 * JSON Object를 String로 반환
 * @param jsonData
 * @returns
 */
var gf_JsonToString = function(jsonData){
	return JSON.stringify(jsonData);
};

/**
 * 시작 문자열부터 끝 문자열까지 제거한다
 * @param str 대상 문자열
 * @param fromString 시작 문자열
 * @param toString 종료 문자열
 * @returns
 */
var gf_removeStringFromTo = function(str, fromString, toString) {
	if (str.indexOf(fromString) > -1)
		return str = str.replaceAll(str.substring(str.indexOf(fromString)).substring(0, str.substring(str.indexOf(fromString)).indexOf(toString) + 1), '');
	else
		return str;
};

var gf_SetDateIntervalRadio = function(sId, eId, idx) {
	
	if(idx === '1') {
		$('input[name='+sId+']').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-DD') );
		$('input[name='+eId+']').val( (new Date()).format('YYYY-MM-DD') );		
	} else
	if(idx === '3') {
		$('input[name='+sId+']').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-DD') );
		$('input[name='+eId+']').val( (new Date()).format('YYYY-MM-DD') );
	} else
	if(idx === '6') {
		$('input[name='+sId+']').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -180)).format('YYYY-MM-DD') );
		$('input[name='+eId+']').val( (new Date()).format('YYYY-MM-DD') );		
	}
};
/**
 * 기준년월의 이전년월을 리턴한다.
 * gf_PreMm('201905') ==> '201904'
 * 기준년월 6자리가 아니면 등록한 일자 return
 * @param str  : 기준일자(yyyymm) 
 * @returns    : 이전년월(yyyymm)
 */
var gf_PrevYyMm = function(str){
	
	var baseDate = str.replaceAll("-","");
	baseDate = baseDate.substr(0,6);
	
	if(baseDate.length !=  6) return str;
	
	var year = parseInt(baseDate.substr(0, 4)); //기준 년도
	var mon  = parseInt(baseDate.substr(4, 2)); //기준 월
	
	if(mon == 1) {
		year--;
		mon = 12;
	}
	else mon--;
	
	if(mon  < 10)
		baseDate = year + '-0' + mon;
	else 
		baseDate = year + '-' +  mon;
	
	return  baseDate;
};

/**
 * 기준년월의 다음년월을 리턴한다.
 * gf_NextYyMm('201904') ==> '201905'
 * @param str  : 기준일자(yyyymm) 
 * @returns    : 다음년월(yyyymm)
 */
var gf_NextYyMm = function(str){
	
	var baseDate = str.replaceAll("-","");
	baseDate = baseDate.substr(0,6);
	
	if(baseDate.length !=  6) return str;
	
	var year = parseInt(baseDate.substr(0, 4)); //기준 년도
	var mon  = parseInt(baseDate.substr(4, 2)); //기준 월
	
	if(mon == 12) {
		year++;
		mon = 1;
	}
	else mon++;
	
	if(mon  < 10)
		baseDate = year + '-0' + mon;
	else 
		baseDate = year + '-' +  mon;
	
	return  baseDate;
};

var gf_CloseParentActiveTab = function(){		
	var selectedId = parent.dhxLeftTreeView.getSelectedId();	
	var tabLength = parent.subMenuTabs.tabs('length');	
	if(tabLength == 1)  parent.dhxLeftTreeView.unselectItem(selectedId);	
	parent.subMenuTabs.tabs('remove',selectedId);	
}

var gf_MakeComboBasic = function(divId, id, placeHolder, style, src, reqirded, keyColumn, valueColumn, baseCode,param){
	var shape = [];
    var jsonParameter = {
    		paramNm : param
        };
	
	if(reqirded) shape.push('<select required class="'+id+'" id="'+id+'" name="'+id+'" style="'+style+'">');
	else shape.push('<select class="'+id+'" id="'+id+'" name="'+id+'" style="'+style+'">');
		
	if(!gf_IsNull(placeHolder)) {
		if(placeHolder === 'search') {
			shape.push('<option value="">전체</option>');
		}else if(placeHolder === 'sel') { 
			shape.push('<option value="">선택</option>');
		}
	}
	
	var strSelected = "";
	if(!gf_IsNull(src)) {
		var dataSource = gf_NoAsyncTransaction(src, jsonParameter, 'POST');
//		var dataSource = gf_NoAsyncTransaction(src, {}, 'POST');
		var keyData, valueData;
		var exData = null;
		if(dataSource.data.records){
			exData = dataSource.data.records;
		}
		else if(dataSource.data){
			exData = dataSource.data;
		}
		exData.forEach(function(item){
			keyData = [];
			valueData = [];
			if(!gf_IsNull(keyColumn)) {				
				keyColumn.split(/\s*,\s*/).forEach(function(keys) {
					keyData.push(eval('item.'+keys));
					
					if(baseCode == eval('item.'+keys)){
						strSelected = " selected";
					}
					else {
						strSelected = "";
					}
				});				
			} else {
				keyData.push(item.key);
				
				if(baseCode == item.key){
					strSelected = " selected";
				}
				else {
					strSelected = "";
				}
			}			
			if(!gf_IsNull(valueColumn)) {				
				valueColumn.split(/\s*,\s*/).forEach(function(values) {					
					valueData.push(eval('item.'+values));
				});				
			} else {
				valueData.push(item.value);
			}
			
			shape.push('<option value="' + keyData.join('_') + '"' + strSelected + '>'+valueData.join('-')+'</option>');
		});
	}	
	shape.push('</select>');
	$('#'+divId).html(shape.join(''));
}

var gf_MakeCheckBasic = function(divId, id, defaultCheck, style, src){
	var shape = [];
	if(!gf_IsNull(src)) {
		var dataSource = gf_NoAsyncTransaction(src, {}, 'POST');	
		dataSource.data.forEach(function(item){		
			shape.push('<div class="checkbox">');
			if(gf_IsNull(defaultCheck)) {
				shape.push('<label><input type="checkbox" id="checkbox_'+id+''+item.value+'" class="'+id+'" name="'+id+'" style="'+style+'" value="'+item.key+'"/><i class="input-helper"></i><span> '+item.value+'</span></label>');
			} else {
				if(defaultCheck === item.key) {
					shape.push('<label><input type="checkbox" checked="true" id="checkbox_'+id+''+item.value+'" class="'+id+'" name="'+id+'" style="'+style+'" value="'+item.key+'"/><i class="input-helper"></i><span> '+item.value+'</span></label>');
				} else {
					shape.push('<label><input type="checkbox" id="checkbox_'+id+''+item.value+'" class="'+id+'" name="'+id+'" style="'+style+'" value="'+item.key+'"/><i class="input-helper"></i><span> '+item.value+'</span></label>');
				}
			}
			shape.push('</div>')
		});
	}
	$('#'+divId).html(shape.join(''));
}


var gf_MakeRadioBasic = function(divId, id, defaultCheck, style, src){
	var shape = [];
	if(!gf_IsNull(src)) {
		var dataSource = gf_NoAsyncTransaction(src, {}, 'POST');	
		dataSource.data.forEach(function(item){		
			shape.push('<div class="radio">');
			if(gf_IsNull(defaultCheck)) {
				shape.push('<input type="radio" id="radio_'+id+''+item.value+'" class="'+id+'" name="'+id+'" style="'+style+'" value="'+item.key+'"/><label for="radio_'+id+''+item.value+'"><span></span>'+item.value+'</label>');
			} else {
				if(defaultCheck === item.key) {
					shape.push('<label><input type="radio" selected="true" id="radio_'+id+''+item.value+'" class="'+id+'" name="'+id+'" style="'+style+'" value="'+item.key+'"/><label for="radio_'+id+''+item.value+'"><span></span>'+item.value+'</label>');
				} else {
					shape.push('<label><input type="radio" id="radio_'+id+''+item.value+'" class="'+id+'" name="'+id+'" style="'+style+'" value="'+item.key+'"/><label for="radio_'+id+''+item.value+'"><span></span>'+item.value+'</label>');
				}
			}
			shape.push('</div>')
		});
	}
	$('#'+divId).html(shape.join(''));
}


//gf_MakeComboBasic('divInputFormComboOfcpsCodeBox', 'detailComboOfcpsCode', 'sel', '', 'mhshrm015/searchMhsOfcpsCode', '', 'ofcpsCode', 'ofcpsNm', '');
//gf_MakeGridCombo(comboDspsnSeCode, '', 'C152', '' , 'asc', '');
//strCombo, placeHolder, codekindCode, exceptCode, sortOrder, refer
var gf_MakeComboGrid = function(strCombo, placeHolder, src, keyColumn, valueColumn, param, method){
	
	var returnData;

	if(!gf_IsNull(src)) {
		var jsonParameter = param;
		
		var dataSource = gf_NoAsyncTransaction(src, jsonParameter, method||'POST');
		
		var keyData, valueData;
		var exData = null;
		
		if(!gf_IsNull(dataSource.data.records)){
			exData = dataSource.data.records;
		} else 
	 	if(!gf_IsNull(dataSource.data)){
			exData = dataSource.data;
		}
		
		var locale = gf_GetSysConfig("langSeCode");
		
		if(!gf_IsNull(placeHolder)) {
			if(placeHolder === 'search') strCombo.put('', '전체');
			else strCombo.put('', '선택');
		}
		
		exData.forEach(function(item){
			keyData = "";
			valueData = "";
			if(!gf_IsNull(keyColumn)) {				
				keyData = eval('item.'+keyColumn);
			} else {
				keyData = item.key;
			}
			
			if(!gf_IsNull(valueColumn)) {				
				valueData = eval('item.'+valueColumn);
			} else {
				valueData = item.value;
			}
			
			strCombo.put(keyData, valueData);
		});
	}
}


/**
 *  숫자에 콤마 넣기
 */
var gf_NumberWithCommas = function (num) {   //fn_numberWithCommas
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 *  글자 byte 수
 */
var gf_ByteCheck = function(el){
    var codeByte = 0;
    for (var idx = 0; idx < el.length; idx++) {
        var oneChar = escape(el.charAt(idx));
        if ( oneChar.length == 1 ) {
            codeByte ++;
        } else if (oneChar.indexOf("%u") != -1) {
            codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte ++;
        }
    }
    return codeByte;
};

/**
 *  날짜 키보드 입력 날짜 형식 맟추기
 */
var gf_DateCheck = function(objDate){
	var date = objDate.val();
	date = date.replace(RegNotNum, '');

	if (date == "" || date == null || date.length < 5) {
	  objDate.val(date);
	  return;
	}

	var DataFormat;
	var RegPhonNum;

	// 날짜 포맷(yyyy-mm-dd) 만들기 
	if (date.length <= 6) {
	  DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]+)/;
	} else if (date.length <= 8) {
	  DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
	}

	while (RegPhonNum.test(date)) {
	  date = date.replace(RegPhonNum, DataFormat);
	}

	objDate.val(date);

	// 모두 입력됐을 경우 날짜 유효성 확인
	if (date.length == 10) {
		var isVaild = true;
	
		if (isNaN(Date.parse(date))) {
			// 유효 날짜 확인 여부
			isVaild = false;
		} else {
			// 년, 월, 일 0 이상 여부 확인
			var date_sp = date.split("-");
			date_sp.forEach(function(sp) {
			  if (parseInt(sp) == 0) {
			    isVaild = false;
			  }
			});
		
			// 마지막 일 확인
			var last = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0);
			if (last.getDate() < parseInt(date_sp[2])) {
			 	isVaild = false;
			}
		}
		
		if (!isVaild) {
		  gf_DivMsgAlert("잘못된 날짜입니다.<br/>다시 입력하세요.");
		  objDate.val("");
		  objDate.focus();
		  return;
		}
	}
};

// 그리드 콤보박스 (2020-03-09 add By KLEE)
var gf_ComboDataSet =function (grid, ColunmNo, data, placeHolder) {	
	
	if(!gf_IsNull(placeHolder)) {
		if(placeHolder === 'search') grid.getCombo(ColunmNo).put("","전체");
		else grid.getCombo(ColunmNo).put("","선택");
	}
	
	for(var i=0; i<data.length; i++) {
		grid.getCombo(ColunmNo).put(data[i].code,data[i].codeNm);
	}
	
};

/**
 * 폼 리셋 jquery 함수 재정의 추가
 */
$.fn.clearForm = function() {
	return this.each(function() {		
		var type = this.type, tag = this.tagName.toLowerCase();	    	    
	    if ( tag === 'form' ) return $(':input', this).clearForm()	    
	    if ( type === 'text' || type === 'password' || type === 'hidden' || tag === 'textarea' ) {
	    	this.value = '';
	    } else if (type === "checkbox" || type === "radio") {
	    	this.checked = false
	    } else if (tag === "select") {
	    	this.selectedIndex = -1
	    }
	})
}


/**
* 입력폼 Enter 이벤트 시 Next Focus : 소스제너레이터에서 만드는 소스에 포함되는 함수 임
**/
var gf_saveForm_NextEle = function(s_TableName, Obj) {
    var inputs = $("#" + s_TableName).find('input,select,button,textarea').filter(':visible:not([readonly]):not([disabled])');
    var idx = inputs.index(Obj);
    if (idx == inputs.length - 1) {
        //inputs[0].focus();
        return true;
    } else {
        inputs[idx + 1].focus();
    }
    return false;
};

var gf_errorMsgClear = function(){
	$('[id$="-error"]').remove();
	document.body.blur();
};
