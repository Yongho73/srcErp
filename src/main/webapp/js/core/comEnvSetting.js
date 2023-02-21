/**
var bplcOde = gf_GetSysConfig('bplcOde');                      		/ 사업장코드 - ? /
var prductUseItem = gf_GetSysConfig('prductUseItem');              	/ 제품 사용 항목 - ? /
var moduleUseItem = gf_GetSysConfig('moduleUseItem');              	/ 모듈 사용 항목 - ? /
var pgngUnit = gf_GetSysConfig('pgngUnit');                     	/ 페이징단위 (c133) /
var maskMthCode = gf_GetSysConfig('maskMthCode');                  	/ 마스킹방법코드 /
var empnoEntMth = gf_GetSysConfig('empnoEntMth');                  	/ 사원번호생성방법 (c129) /
var langSeCode = gf_GetSysConfig('langSeCode');                   	/ 언어구분코드 c131 /
var searchPdSettingCode = gf_GetSysConfig('searchPdSettingCode');   / 검색기간설정코드 c132 /
var multiLoginPermAt = gf_GetSysConfig('multiLoginPermAt');         / 다중로그인허용여부 (0|1) /
var salaryDcmlpointProcessMth = gf_GetSysConfig('salaryDcmlpointProcessMth');    / 급여소수점처리방법 c032 /
var dcmlpointProcessMth = gf_GetSysConfig('dcmlpointProcessMth');   / 소수점 처리 방법 c032 /
var passwordSettingMth = gf_GetSysConfig('passwordSettingMth');   	/ 비밀번호설정방법 (c136) /
var passwordChangeCycle = gf_GetSysConfig('passwordChangeCycle'); 	/ 비밀번호변경주기 (c135) /
var nextChangeAt = gf_GetSysConfig('nextChangeAt');                	/ 비밀번호 다음변경 허용 여부 (0|1) /
var selfAuthMth = gf_GetSysConfig('selfAuthMth');                  	/ 개인정보인증 방법 (예를 들어 급여명세서 확인시 주민번호앞자리|뒷자리) /
var sknSeCode = gf_GetSysConfig('sknSeCode');                    	/ 화면 스킨 구분 코드 /
*/
/**
 * 환경설정 : 페이징 단위
 * 
 * 사용법)
 * 
 *  jsp :
 *	<div class="div_combo fr">
 *	    <form id="pageingFormStmCodeKind"></form>
 *	</div>
 *
 *  js :
 *  gf_SettingPgngUnit('pageingFormStmCodeKind'); 
 */
var gf_SettingPgngUnit = function(divId){
	
	var pgngUnit = gf_GetSysConfig('pgngUnit');
	var jsonParameter = {codekindCode : "C133",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); // 기존 코드조회 쿼리 사용
    
    //gf_Trace('gf_SettingPgngUnit==---s');	
    //gf_Trace(dataSource);
    //gf_Trace('gf_SettingPgngUnit==---e');
    
    var shape = [];
    var selected;
    shape.push('<select name="pageRowSize">');
    dataSource.data.forEach(function(item){    	
    	selected = '';    	
    	if(item.code == pgngUnit) selected = 'selected'; 
		shape.push("<option value=\""+item.code+'" '+selected+">"+item.codeNm+"</option>");	     
	});		
	shape.push("</select>");
	
	$('#'+divId).html(shape.join(''));
}

/**
 * 환경설정 : 검색기간 설정
 * 
 * 사용법)
 * 
 *  jsp :
 *  <input type="text" name="searchSregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" style="display:inline-block;float:left;">
 *	<span style="float:left;"> ~ &nbsp; </span>
 *	<input type="text" name="searchEregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" style="display:inline-block;float:left;">
 *
 *  js :
 *  gf_SettingDateInterval('searchSregDt', 'searchEregDt', '일수'); 
 */
var gf_SettingDateInterval = function(startInputNm, endInputNm, dayCount) {
	
	var searchPdSettingCode = gf_GetSysConfig('searchPdSettingCode');
	
	if(gf_IsNull(dayCount)) {
		
		if(searchPdSettingCode === '001') { // 1일
			$('input[name='+startInputNm+']').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -1)).format('YYYY-MM-DD') );
			$('input[name='+endInputNm+']').val( (new Date()).format('YYYY-MM-DD') );		
		} else
		if(searchPdSettingCode === '002') { // 1주일
			$('input[name='+startInputNm+']').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -7)).format('YYYY-MM-DD') );
			$('input[name='+endInputNm+']').val( (new Date()).format('YYYY-MM-DD') );
		} else
		if(searchPdSettingCode === '003') { // 1개월
			$('input[name='+startInputNm+']').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-DD') );
			$('input[name='+endInputNm+']').val( (new Date()).format('YYYY-MM-DD') );		
		} else
		if(searchPdSettingCode === '004') { // 6개월
			$('input[name='+startInputNm+']').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -(30*6))).format('YYYY-MM-DD') );
			$('input[name='+endInputNm+']').val( (new Date()).format('YYYY-MM-DD') );		
		}
	
	} else {
		
		$('input[name='+startInputNm+']').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), dayCount)).format('YYYY-MM-DD') );
		$('input[name='+endInputNm+']').val( (new Date()).format('YYYY-MM-DD') );		
	}
}

/**
 * 환경설정 : 주민번호 마스킹
 * 
 * 사용법)
 *
 *  js :
 *  gf_SettingJuminMask('4568831283344'); // 하이픈 잆이 숫자만 13자리 인자 전달 
 */
var gf_SettingJuminMask = function(data) {

	var juminNumber = data;
	var ninArray = juminNumber.match(/\d{13}/gi);
	var maskMthCode = gf_GetSysConfig('maskMthCode'); //001: 뒷7자리모두 마스킹, 002:뒷자리 성별표시, 003:모두 표시
    
    if(!gf_IsNull(ninArray)) {        	
    	// 성별 표시
    	if(maskMthCode == '002') {
    		juminNumber = ninArray[0].replace(/([0-9]{6})$/gi,'******');        	
    	// 뒷자리 모두
        } else 
        if(maskMthCode == '001') {
        	juminNumber = ninArray[0].replace(/([0-9]{7})$/gi,'*******');            
        // 모두표시
        } else {        	        	
    	   juminNumber = ninArray[0];
        }        	
    	juminNumber = juminNumber.substr(0, 6) +'-'+ juminNumber.substr(6);
    }

    return juminNumber;
}

/**
 * 환경설정 : 비밀번호 체크
 * 
 * 사용법)
 *
 *  js :
 *  gf_SettingPassword('admin','!1q2w3e4r@'); // 아이디, 패스워드
 */
var gf_SettingPassword = function(userId, userPwd){

	var checkId = userId; // 체크할 id 값 입력
	var checkPwd = userPwd; // 체크할 pw 입력
	
	var checkNumber = /[0-9]/.test(checkPwd);   // 숫자
	var checkAlphabet = /[a-zA-Z]/.test(checkPwd);  // 영문
	var checkSpecialCharacters = /[~!@\#$%<>^&*]/.test(checkPwd);  // 특수문자
	var checkSpace = checkPwd.match(/\s/g) ? true : false;  // 특수문자
	var checkLength = (checkPwd.length < 10)? false : true; // 길이
	var passwordSettingMth = gf_GetSysConfig('passwordSettingMth'); //001: 복잡, 002:중간, 003:쉬움

	//alert('checkLength=['+checkLength+'],checkNumber=['+checkNumber+'],checkAlphabet=['+checkAlphabet+'],checkSpecialCharacters=['+checkSpecialCharacters+'],checkSpace=['+checkSpace+']');
	
	if(checkSpace) {
		gf_DivMsgAlert("공백이 포함되어 있습니다.");
		return false;
	}
	
	// 중간
	if( passwordSettingMth == "002" ) {	
		// 10자리이상. 숫자,특수문자 하나만 포함		
		if(!(checkLength && (checkNumber || checkSpecialCharacters))){
			gf_DivMsgAlert("사용할 수 없은 패스워드 조합입니다.<br/>10자리 이상 적어도 숫자, 특수문자를<br/>포함해야 합니다.");
			return false;
		}
	// 복잡
	} else
	if( passwordSettingMth == "001" ) {
		// 10자리이상. 10자리이상. 숫자, 특수문자 둘다포함
		if(!(checkLength && (checkNumber && checkSpecialCharacters))){
			gf_DivMsgAlert("사용할 수 없은 패스워드 조합입니다.<br/>10자리 이상  숫자, 특수문자 둘다<br/>포함해야 합니다.");
			return false;
		}
	// 쉬움
	} else {
		
	}

	/*
	if(/(\w)\1\1/.test(checkPwd)){
		alert('같은 문자를 3번 이상 사용하실 수 없습니다.\n패스워드 설정안내를 확인해 주세요.');
		//return false;
	}

	if(checkPwd.search(checkId)>-1){
		alert("비밀번호에 아이디가 포함되었습니다.\n패스워드 설정안내를 확인해 주세요.");
		//return false;
	}
	*/

	return true;
}

/**
 * 환경설정 : 비밀번호 변경주기
 * 
 * 사용법)
 *
 *  js :
 *  gf_SettingPasswordChangeCycle('20120724','fn_Login(1);','return false;'); // 비밀번호 등록일자
 */
var gf_SettingPasswordChangeCycle = function(changeDate, trueFunction, falseFunction){

	var passwordChangeCycle = gf_GetSysConfig('passwordChangeCycle'); // 3: 3개월, 6:6개월, 9:개월
	var nextChangeAt = gf_GetSysConfig('nextChangeAt'); // 비밀번호 다음변경 허용 여부 (0|1)
	var cycleDate;
	var nowDate = (new Date()).format('YYYYMMDD');
	
	if(nextChangeAt == '1') {
		
		if(passwordChangeCycle == '3') {
			cycleDate = gf_Str2Date(gf_GetDate((changeDate.toDate('YYYYMMDD')).format('YYYYMMDD'), (30*3))).format('YYYYMMDD')
		} else
		if(passwordChangeCycle == '6') {
			cycleDate = gf_Str2Date(gf_GetDate((changeDate.toDate('YYYYMMDD')).format('YYYYMMDD'), (30*6))).format('YYYYMMDD')
		} else {
			cycleDate = gf_Str2Date(gf_GetDate((changeDate.toDate('YYYYMMDD')).format('YYYYMMDD'), (30*9))).format('YYYYMMDD')
		}
		
		//alert('nowDate=['+nowDate+'], passwordChangeCycle=['+passwordChangeCycle+'], nextChangeAt=['+nextChangeAt+'], cycleDate=['+cycleDate+'], changeDate=['+changeDate+']');
		
		if(cycleDate < nowDate) {
			gf_DivMsgConfirm('비밀번호 변경시기가 지났습니다.<br/>비밀번호를 변경하시겠습니까?', trueFunction, falseFunction);
			return false;
		}
	} 

	return true;
}

























