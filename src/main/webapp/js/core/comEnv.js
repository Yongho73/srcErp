/*----------------------------------------------------------------------------------
 * session , 쿠키 , 다국어 , 메시지 등 기본 실행 환경과 관련된 부분
----------------------------------------------------------------------------------*/

/**
 * 세션체크
 */
var gf_SessionCheck = function() { 
	gf_Transaction('', 'stmcmm001/checkSession', '', 'gf_CallbackSessionCheck', false);
}

/**
 * 세션체크
 * @param strSvcID
 * @param targetID
 * @param data
 * @returns
 */
var gf_CallbackSessionCheck = function(strSvcID, targetID, data){
	if (data.data == false) {
		$('.content').empty();
		alert("일정시간 동안 사용하지 않아 로그아웃 되었습니다.");
		fn_RedirectLogin();
	}
};

/**
 * 세션이 끊어질 경우 메인으로 이동
 * @returns
 */
var fn_RedirectLogin = function(){
	localStorage.removeItem("user");
	localStorage.removeItem("userId");
	window.location.href = gv_ContextPath;
};

/**
 * 설명 : Cookie에 name-value 쌍으로 값을 저장
 * @param name : 쿠키 명칭
 * @param value : 쿠키값
 * @param expDays : 쿠키 만료기간(일수)
 * @author HUNTER BYUN
 * @since 2013-03-04
 * @version 1.0
 */
var gf_SetCookie = function(name, value, expDays) {
    expDays = typeof(expDays) == "undefined"? 30 : expDays;
    var expires = new Date();
    // DEFAULT 30일 유지 
    expires.setTime(expires.getTime() + 1000*60*60*24*expDays); 
    document.cookie = name + '=' + escape(value) + '; path=/; expires='+ expires.toGMTString()+'; ';
};

/**
 * 설명 : 쿠키정보를 리턴한다.
 * @param name : 쿠키 명칭
 * @returns 쿠키 값
 * @author HUNTER BYUN
 * @since 2013-03-04
 * @version 1.0
 */
var gf_GetCookie = function(name){
    var nameOfCookie = name + "=";
    var x=0;
    while(x<= document.cookie.length){
        var y= (x+nameOfCookie.length);
        if(document.cookie.substring(x,y) == nameOfCookie){
            if((endOfCookie= document.cookie.indexOf(";",y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y,endOfCookie));
        }
        x= document.cookie.indexOf(" ",x)+1;
        if(x==0)
        break;
    }

    if ( name == "loclCd") {
        gf_SetCookie("loclCd", "ko_KR");
        return "ko_KR";
    }
};

/**
 * 설명 : 현재 시간을 조회한다. -- KPS 내에서는 DATEGAP 은 의미가 없다. 
 * @returns 서버 날짜
 * @author HUNTER BYUN
 * @since 2011-10-01
 * @version 1.0
 */
var gf_GetServerDate = function() {
    if(gf_IsNull(gv_DateGap)) return new Date();

    return new Date( (new Date).getTime() + gv_DateGap );
};

/**
 * 서버 날짜의 문자열 표현
 * @returns 서버 날짜의 문자열 표현
 * @author HUNTER BYUN
 * @since 2011-10-01
 * @version 1.0
 */
var gf_Today = function() {
    var date = gf_GetServerDate();
    return date.format(Date.__SAVE_FORMAT__);
};


/**
 * 서버의 현재시각(시분)을 가져온다.
 * @returns 서버의 현재시각(시분) 문자열 표현
 * @author HUNTER BYUN
 * @since 2011-10-01
 * @version 1.0
 */
var gf_Time = function(){
    var date = gf_GetServerDate();
    return date.format('HHmm');
};


/**
 * 설명 : 입력된 key에 해당하는 다국어를 찾는 함수
 * @param strKey : 다국어 key값
 * @param loclCd : 자바 로케일 코드 if loclCd is null then using session loclCd
 * @returns  입력된 key에 해당하는 다국어
 * @author Jun.
 * @since 2013-03-13
 * @version 1.0
 */
 var gf_FindLang = function(strKey, loclCd) {
    if ( gf_IsNull(loclCd) ) {
        loclCd = gf_GetCookie("loclCd");
    }
    if ( gf_IsNull(loclCd) )
        loclCd = "en_US";

    var findLang = "";
    try {
        findLang = jquery_lang_js.prototype.lang[loclCd][strKey];
    }
    catch (e) {
        gf_Trace(e.message);
    }

    if ( gf_IsNull(findLang) ) {
        findLang = strKey;
    }
    return findLang.toString().replaceAll("\\\\n", "\n");
};


/**
 * 설명 : 메세지 코드에 따른 메세지 리턴
 * @param code : 메세지 코드
 * @returns  코드에 해당하는 메시지 , 없다면 코드를 그대로 리턴
 * @author Jun.
 * @since 2013-03-13
 * @version 1.0
 */
var ezMessage = function(code) {
    // json 변수에서 메세지 코드값찾는다
    // 코드값 업승면 꽝
    var loclCd = gf_GetCookie("loclCd");
    try{

        code = code.simpleReplace(".", "_");

        if ( gf_IsNull( gv_HvcComm.msg[loclCd][code] )) {

            return code.simpleReplace("_", ".");;
        }
        var msgValue = gv_HvcComm.msg[loclCd][code].message;
        if (gf_IsNull(msgValue)) {
            return code;
        }
    }catch(e){
        msgValue = code;
    }
    return msgValue.toString();
};

/**
 * 로컬스토리지 가져오기
 * @param id
 * @param jsonYn
 * @returns
 */
var gf_GetLocalStorageData = function(id, jsonYn){
	if(!gf_IsNull(localStorage.getItem(id))){	
		if(jsonYn) return JSON.parse(localStorage.getItem(id));
		else return localStorage.getItem(id);
	} else {
		return false;
	}
};

/**
 * 로컬스토리지 저장
 * @param id
 * @param value
 * @param jsonYn
 * @returns
 */
var gf_SetLocalStorageData = function(id, value, jsonYn){
	if(!gf_IsNull(value)){
		if(jsonYn) localStorage.setItem(id,JSON.stringify(value));
		else localStorage.setItem(id,value);
	} else {
		return false;
	}	
};

/**
 * 로컬스토리지 가져오기
 * @param id
 * @param jsonYn
 * @returns
 */
var gf_GetLocalStorageDataDecrypt = function(id, jsonYn){ 
	if(!gf_IsNull(localStorage.getItem(id))){	
		if(jsonYn) {
			return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem(id), gv_Passphrase).toString(CryptoJS.enc.Utf8));
		} else {
			return CryptoJS.AES.decrypt(localStorage.getItem(id), gv_Passphrase).toString(CryptoJS.enc.Utf8);
		}
	} else {
		return false;
	}
};

/**
 * 로컬스토리지 저장
 * @param id
 * @param value
 * @param jsonYn
 * @returns
 */
var gf_SetLocalStorageDataEncrypt = function(id, value, jsonYn){		 
	if(!gf_IsNull(value)){
		if(jsonYn) {
			localStorage.setItem(id, CryptoJS.AES.encrypt(JSON.stringify(value), gv_Passphrase));
		} else {
			localStorage.setItem(id, CryptoJS.AES.encrypt(value, gv_Passphrase));
		}
	} else {
		return false;
	}
};

/**
 * 로컬스토리지 삭제
 * @param id
 * @returns
 */
var gf_RemoveLocalStorageData = function(id){
	localStorage.removeItem(id);
};

var gf_SetMenuPath = function (){
	//var menuId = parent.$('#sub_content .ui-tabs-active').attr('aria-controls');
	var menuId = parent.dhxMenuTabbars.getActiveTab();
	if(gf_IsNull(menuId)) location.href = gv_ContextPath;
	fn_SetMenuPathNew(menuId);
};

//해당페이지의 PATH 정보
var fn_SetMenuPath = function (menuId){
	
	if(!gf_IsNull(menuId)) {
	
		var jsonParameter = {				
			menuId: menuId	
		};
		
		var res = gf_NoAsyncTransaction('stmcmm002/searchMenuInfo', jsonParameter, 'POST');
		
		if(!gf_IsNull(res.data)){
			
			var locale = gf_GetSysConfig("langSeCode");
			var jbString;
			if(locale === 'kor') {
				jbString = res.data.path;
			} else
			if(locale === 'third') {
				jbString = res.data.pathThird;
			} else {
				jbString = res.data.pathEng;
			}
			//var jbString = res.data;
			var sMenuPath = "<li><button onclick='#n;return false();' class='home'></button></li>";
			var jbSplit = jbString.split('>');
			var length = jbSplit.length;
			for ( var i = 1; i < length; i++ ) {
				if(i == (length-1)) {
					sMenuPath += '<li><a href="#">' +  jbSplit[i] + '</a> <button id="btn_help" onclick=\"gv_helpPopup(\''+menuId+'\')\" type="button" title="도움말"><span class="glyphicon glyphicon-question-sign"></span></button>';
					sMenuPath += '&nbsp;&nbsp;&nbsp;<button id="btn_improve_request" onclick=\"gv_PrgRequstPopup(\''+menuId+'\')\" type="button" title="프로그램개선요청"><span style="vlalign:top" class="glyphicon glyphicon-user"></span></button></li>';
				} else {
					sMenuPath += "<li><a href='#'>" +  jbSplit[i] + "</a></li>";
				}
			}	
			
			$("#menu_path").html(sMenuPath);
		}
	} else {
		$("#menu_path").html('');
	} 
};

//> LEVEL1 > LEVEL2 > LEVEL3 > LEVEL4
//해당페이지의 PATH 정보
var gv_SecondLvlMenuId;	
var gv_FourthLvlMenuId;
var fn_SetMenuPathNew = function (menuId){
	
	if(!gf_IsNull(menuId)) {
		var res = gf_NoAsyncTransaction('stmcmm002/searchMenuInfo', {menuId: menuId}, 'POST');		
		var menuPath = res.data.menuPath;
		var menuPathArr = menuPath.split('>');
		gv_SecondLvlMenuId = menuPathArr[2].trim();
		if(menuPathArr.length > 5) {
			gv_FourthLvlMenuId = menuPathArr[5].trim();
		}
		else if(menuPathArr.length > 4) {
			gv_FourthLvlMenuId = menuPathArr[4].trim();
		}
		else {
			gv_FourthLvlMenuId = "";
		}
		if(!gf_IsNull(res.data)){			
			var locale = gf_GetSysConfig("langSeCode");
			var jbString;
			if(locale === 'kor') {
				jbString = res.data.path;
			} else
			if(locale === 'third') {
				jbString = res.data.pathThird;
			} else {
				jbString = res.data.pathEng;
			}
			
			var sMenuPath = [];			
			sMenuPath.push('<span class="path_star" style="display:inline-block;"></span>');
			sMenuPath.push('<ul class="path_list" style="display:inline-block;">');
			
			var jbSplit = jbString.split('>');
			var length = jbSplit.length;
			for ( var i = 1; i < length; i++ ) {
				if(i == (length-1)) {
					sMenuPath.push('<li><a href="#" style="margin-left:5px">' +  jbSplit[i] + '</a></li>');
				} else {
					sMenuPath.push('<li><span>' +  jbSplit[i] + '</span></li>');
				}
			}	

			sMenuPath.push('</ul>');
			sMenuPath.push('<ul class="btn_type1">');
			sMenuPath.push('    <li><button title="도움말" class="mr5" href="#none" onclick="gv_helpPopup(\''+menuId+'\');return false;"><i class="axi axi-json-undefined5"></i></button></li>');
			sMenuPath.push('    <li><button title="프로그램개선요청" href="#none" onclick="gv_PrgRequstPopup(\''+menuId+'\');return false;"><i class="axi axi-ion-wrench"></i></button></li>');
			sMenuPath.push('</ul>');
 
			$("#menu_path").html(sMenuPath.join(''));
		}
	} else {
		$("#menu_path").html('');
	} 
};

//프로그램 개선요청 팝업 (2020.02.27 add By KLEE)
var gv_PrgRequstPopup = function (menuId){

	var formId  	= "formId";
	var codeId  	= "codeId";
	var codeNmId  	= "codeNmId";
	var title    	= "프로그램개선요청";
	var param  		= "imprvmrequstSn=&progrmId=" + menuId;
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindowsPrgRequst;
	if($('body').find("div[id='bpopupPrgRequst']").size() <= 0) {
		$('body').append("<div id='bpopupPrgRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupPrgRequst').bPopup({
		onOpen:function(){
			
			dhxWindowsPrgRequst = new dhtmlXWindows();
			var id 		= 'bpopupPrgRequst';
			var ajaxUrl = gv_ContextPath+'/stmmng011/popup/findStmPrgRequst/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 1000;
			var height	= 490;
			
			dhxWindowObj = dhxWindowsPrgRequst.createWindow(id, left, top, width, height);
			dhxWindowsPrgRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupPrgRequst .b-close').click();
			});
		},
		onClose:function(){
			dhxWindowsPrgRequst.unload();
			$('body').find("div[id='bpopupPrgRequst']").remove();			
		}
	},function(){});
	return dhxWindowObj;	
	
}

var gv_helpPopup = function (menuId){
	gf_DivMsgAlert("빠른시일내에 준비하도록 하겠습니다");
}


// 버튼 권한
var gf_CheckButtonAuth = function(){
	var menuId = parent.$('#sub_content .ui-tabs-active').attr('aria-controls');	
	if(!gf_IsNull(menuId)) {
		
		var userMenu = gf_GetLocalStorageData('userMenu', true);
		var menuItem;
		
		userMenu.some(function(item) { 
			if(item.id == menuId) {
				menuItem = item;
				return true;
			}
		});	
		// 조회
		if(menuItem.inqireAuthorAt == '0') {
			$('button[id*="btnSearch"]').parent().remove();
			$('button[id*="btnReset"]').parent().remove();
		}
		// 등록
		if(menuItem.registAuthorAt == '0') {
			$('button[id*="btnAdd"]').parent().remove();
			$('button[id*="btnCreate"]').parent().remove();
			$('button[id*="btnSave"]').parent().remove();		
		}
		// 수정
		if(menuItem.updtAuthorAt == '0') {
			$('button[id*="btnModify"]').parent().remove();
		}
		// 삭제
		if(menuItem.deleteAuthorAt == '0') {
			$('button[id*="btnRemove"]').parent().remove();
		}
		// 출력
		if(menuItem.prntngAuthorAt == '0') {
			$('button[id*="btnPrint"]').parent().remove();
		}
		// 엑셀
		if(menuItem.excelAuthorAt == '0') {
			$('button[id*="btnExcel"]').parent().remove();
		}
		// 화면 접속 권한
		if(menuItem.deleteAt == '1') {
			location.href = gv_ContextPath;
			alert('접속 권한이 없습니다.')
		}
	}
}

var gf_GetDataAuthorSe = function(){
	var menuId = parent.$('#sub_content .ui-tabs-active').attr('aria-controls');
	var userMenu = gf_GetLocalStorageData('userMenu', true);
	var menuItem;
	userMenu.some(function(item) { 
		if(item.id == menuId) {
			menuItem = item;
			return true;
		}
	});	
	if(gf_IsNull(menuItem)) return '';
	else return menuItem.dataAuthorSe;
}

//부서 권한에 따른 화면 세팅 : 소스제너레이터에서 사용하는 이름 == 함수 이름 수정 불가
var gf_SetDataAuthorSe = function(){
	//부서 권한 확인
	//debugger;
    var deptAuth = gf_GetDataAuthorSe();
    //console.log(deptAuth);
    //0 = 권한없음 , 1=조직권한, 2=부서권한, 3=전체권한
    if(deptAuth == "0" || deptAuth == ""){ //0 = 권한없음
    	//부서 Popup 맊고, 직원 Popup도 맊음
    	//자기 정보 체우고 
    	//화면 기능 맊음
    	var empButton = $("#btnEmpSearch");
    	var empNoText = $("#empno");
    	var empNmText = $("#empNm");
    	var empNoText2 = $("#searchEmpno");
    	var empNmText2 = $("#searchEmpNm");
    	
    	var deptButton = $("#btnDeptSearch");
    	var deptCodeText = $("#deptCode");
    	var deptCodeNmText = $("#deptCodeNm");
    	var deptNmText = $("#deptNm");
    	
    	if(empButton.length > 0){
    		empButton.prop("disabled", true);
    	}
    	if(empNoText.length > 0){
    		empNoText.val(gf_GetLocalStorageData('userId', false));
    		empNoText.prop("disabled", true);
    	}
    	if(empNmText.length > 0){
    		empNmText.val(gf_GetLocalStorageData('userNm', false));
    		empNmText.prop("disabled", true);
    	}
    	if(empNoText2.length > 0){
    		empNoText2.val(gf_GetLocalStorageData('userId', false));
    		empNoText2.prop("disabled", true);
    	}
    	if(empNmText2.length > 0){
    		empNmText2.val(gf_GetLocalStorageData('userNm', false));
    		empNmText2.prop("disabled", true);
    	}
    	
    	if(deptButton.length > 0){
    		deptButton.prop("disabled", true);
    	}
    	if(deptCodeText.length > 0){
    		deptCodeText.val(gf_GetLocalStorageData('deptCode', false));
    		deptCodeText.prop("disabled", true);
    	}
    	if(deptCodeNmText.length > 0){
    		deptCodeNmText.val(gf_GetLocalStorageData('deptCodeNm', false));
    		deptCodeNmText.prop("disabled", true);
    	}
    	if(deptNmText.length > 0){
    		deptNmText.val(gf_GetLocalStorageData('deptCodeNm', false));
    		deptNmText.prop("disabled", true);
    	}
    } else if(deptAuth == "1"){ //1=부서권한
    	//부서 Popup 되지만 자기 부서 및 하위 부서만 조회 가능,  직원 Popup도 되지만  자기 부서 및 하위 부서 직원만 조회 가능
    	//Popup 및 조회 에서만 적용
    	//var empButton = $("#btnEmpSearch");
    	var empNoText = $("#empno");
    	var empNmText = $("#empNm");
    	var empNoText2 = $("#searchEmpno");
    	var empNmText2 = $("#searchEmpNm");
    	
    	//var deptButton = $("#btnDeptSearch");
    	var deptCodeText = $("#deptCode");
    	var deptCodeNmText = $("#deptCodeNm");
    	var deptNmText = $("#deptNm");
    	
    	if(empNoText.length > 0){
    		empNoText.val(gf_GetLocalStorageData('userId', false));
    	}
    	if(empNmText.length > 0){
    		empNmText.val(gf_GetLocalStorageData('userNm', false));
    	}
    	if(empNoText2.length > 0){
    		empNoText2.val(gf_GetLocalStorageData('userId', false));
    	}
    	if(empNmText2.length > 0){
    		empNmText2.val(gf_GetLocalStorageData('userNm', false));
    	}
    	
    	if(deptCodeText.length > 0){
    		deptCodeText.val(gf_GetLocalStorageData('deptCode', false));
    	}
    	if(deptCodeNmText.length > 0){
    		deptCodeNmText.val(gf_GetLocalStorageData('deptCodeNm', false));
    	}
    	if(deptNmText.length > 0){
    		deptNmText.val(gf_GetLocalStorageData('deptCodeNm', false));
    	}
    } else if(deptAuth == "2"){ //2=전체권한
    	//부서 Popup 되고,  직원 Popup도  가능
    	//특별히 할게 없음
    }
}

//사번,부서 입력 input 공통 css 적용
var gf_SetEmpDeptSearchBox = function(){
	
	$('input[name*="empno"]').addClass("empno_search_box");
	$('input[name*="empNm"]').addClass("empnm_search_box");
	$('input[name*="deptCode"]').addClass("deptcode_search_box");
	$('input[name*="deptCodeNm"]').addClass("deptname_search_box");
	$('input[name*="deptNm"]').addClass("deptname_search_box");
	
	$('input[name*="empno"]').attr("maxlength","7");
	$('input[name="deptCode"]').attr("maxlength","4");

	/*
	var empNoText = $("#empno");
	var empNmText = $("#empNm");
	
	var deptCodeText = $("#deptCode");
	var deptCodeNmText = $("#deptCodeNm");
	
	if(empNoText.length > 0){
		empNoText.addClass("empno_search_box");
	}
	if(empNmText.length > 0){
		empNmText.addClass("empnm_search_box");
	}
	
	if(deptCodeText.length > 0){
		deptCodeText.addClass("deptcode_search_box");
	}
	if(deptCodeNmText.length > 0){
		deptCodeNmText.addClass("deptname_search_box");
	}
	*/
}