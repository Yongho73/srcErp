/**
 *    프로그램   	: 사용자관리
 *    작성자     	: 디비비전
 *    작성일자   	: 2019.05.09
 *    사용테이블  	: STM_USERS
 *    첨부파일   	:
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!                                                     
 ******************************************************************************************************************************/
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!                                                  
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmUsers();
    cf_SetComponentsStmUsers();
    cf_SetEventListenerStmUsers();
    cf_InitFormStmUsers();
    cf_SetBindingStmUsers();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!                                                   
 ******************************************************************************************************************************/
var cf_InitParamStmUsers = function() {
	gf_SetMenuPath();
    $("#saveFormStmUsers").validate({ errorElement: 'div', ignore: '' });
};

var dhxGridStmUsers;
var cf_SetComponentsStmUsers = function() {
    gf_MakeComboBasic('deptNmSearchFormStmUsersCombo','deptNmSearchFormStmUsers','search','width:140px','stmmng001/combo/dept'); // 부서 커스텀 조회용 콤보박스
    gf_MakeCheckBasic('userRoleCodeSaveFormStmUsersCombo','userRoleCodeSaveFormStmUsers','','','stmmng001/check/role'); // 그룹권한 커스텀 체크박스
    var dhxGridStmUsersListInfo = [];
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '')); //번호
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmUsers" />', '40', 'center', 'na', 'ch', false, 'chk', '')); // 선택
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptNm'), '100', 'center', 'str', 'ro', false, 'deptNm', '')); // 부서명
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpno'), '100', 'center', 'str', 'ro', false, 'empno', '')); // 사원번호
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUserNm'), '100', 'center', 'str', 'ro', false, 'userNm', '')); // 사용자명
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUserId'), '100', 'center', 'str', 'ro', false, 'userId', '')); // 사용자ID    
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUserIp'), '100', 'center', 'str', 'ro', false, 'userIp', '')); // 사용자IP
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmplAt'), '80', 'center', 'str', 'ro', false, 'emplAtNm', '')); // 사원여부
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseAt'), '80', 'center', 'str', 'ro', false, 'useAtNm', '')); // 사용여부
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader('권한', '100', 'center', 'str', 'ro', false, 'roleNm', '')); // 권한    
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRegDt'), '*', 'center', 'str', 'ro', false, 'regDt', '')); // 등록일자
    // 그리드 숨김 컬럼
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader('패스워드', '100', 'center', 'str', 'ro', true, 'userPassword', '')); // 패스워드
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader('패스워드', '100', 'center', 'str', 'ro', true, 'origPassword', '')); // 이전패스워드
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader('패스워드업데이트일', '100', 'center', 'str', 'ro', true, 'passwordUpdt', '')); // 패스워드업데이트일
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader('권한부여방식', '100', 'center', 'str', 'ro', true, 'authorSetting', '')); // 권한설정
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader('직원여부', '100', 'center', 'str', 'ro', true, 'emplAt', '')); // 직원여부
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader('사원여부', '100', 'center', 'str', 'ro', true, 'useAt', '')); // 사원여부
    dhxGridStmUsersListInfo.push(gf_MakeDhxGridHeader('그룹권한', '100', 'center', 'str', 'ro', true, 'roleCode', '')); // 권한        
    dhxGridStmUsers = gf_MakeDhxGrid('dataListStmUsers', dhxGridStmUsersListInfo, true, false, false);
    dhxGridStmUsers.enableAutoWidth(true);        
};

var eventIds = [];
var cf_SetEventListenerStmUsers = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridStmUsers, eventIds);
    eventId = dhxGridStmUsers.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
    	gf_errorMsgClear();
    	if(keyCode == 113) fn_ExcelStmUsers(); 
    });
    eventIds.push(eventId);
    eventId = dhxGridStmUsers.attachEvent("onRowSelect", function(id, ind){
    	gf_errorMsgClear();
    	fn_FindStmUsers();   	
    });
    eventIds.push(eventId);    
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmUsers').unbind('click').bind('click', function(event){
    	gf_errorMsgClear();
    	fn_AddStmUsers()
    });
    $('#btnSaveStmUsers').unbind('click').bind('click', function() {
    	gf_errorMsgClear();
        fn_SaveStmUsers();
    });
    $('#btnRemoveStmUsers').unbind('click').bind('click', function() {
    	gf_errorMsgClear();
        fn_RemoveStemUsers();
    });
    $('#btnExcelStmUsers').unbind('click').bind('click', function() {
    	gf_errorMsgClear();
    	fn_ExcelStemUsers();
    });
    $('#btnSearchStmUsers').unbind('click').bind('click', function(event){
    	gf_errorMsgClear();
        fn_SearchStmUsers('');
    });
    $('#btnResetStmUsers').unbind("click").bind("click",function() {
    	gf_errorMsgClear();
        cf_InitFormStmUsers();
    });
    $('#btnPopEmpSearchStmUsers').unbind('click').bind('click', function(event){
    	gf_errorMsgClear();
    	fn_PopEmpSearchStmUsers();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllStmUsers').unbind('click').bind('click',function() {
    	gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridStmUsers, $('#checkAllStmUsers').prop('checked'), 'chk');
    });
    $('#userIdSearchFormStmUsers').unbind('keypress').bind('keypress', function(event){
    	gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchStmUsers').click(); }
    });
    $('#userNmSearchFormStmUsers').unbind('keypress').bind('keypress', function(event){
    	gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchStmUsers').click(); }
    });
    $('#empnoSaveFormStmUsers').unbind('click').bind('click',function() {
    	gf_errorMsgClear();
        fn_PopEmpSearchStmUsers();
    });
    $('#saveFormStmUsers').unbind('click').bind('click', function(event){    	
    	gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmUsers input[name="deptNm"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'deptNm', $(this).val());
    });  
    $('#saveFormStmUsers input[name="empno"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'empno', $(this).val());
    });    
    $('#saveFormStmUsers input[name="userNm"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'userNm', $(this).val());
    });
    $('#saveFormStmUsers input[name="userId"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'userId', $(this).val()); 
    });
    $('#saveFormStmUsers input[name="userPassword"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'userPassword', $(this).val());
    });
    $('#saveFormStmUsers input[name="userIp"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'userIp', $(this).val());
    });
    $('#saveFormStmUsers input[name="emplAt"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	var val = gf_IsNull(gf_FormGetValue('saveFormStmUsers', 'emplAt', 'chkbox'))? '0' : '1';
    	var valNm = gf_IsNull(gf_FormGetValue('saveFormStmUsers', 'emplAt', 'chkbox'))? '비사원' : '사원';
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'emplAt', val);    	
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'emplAtNm', valNm);
    });
    $('#saveFormStmUsers input[name="useAt"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	var val = gf_IsNull(gf_FormGetValue('saveFormStmUsers', 'useAt', 'chkbox'))? '0' : '1';
    	var valNm = gf_IsNull(gf_FormGetValue('saveFormStmUsers', 'useAt', 'chkbox'))? '미사용' : '사용';    	 
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'useAt', val);
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'useAtNm', valNm);
    });
    $('#saveFormStmUsers select[name="roleOption"]').unbind('change click').bind('change click',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'authorSetting', gf_FormGetValue('saveFormStmUsers', 'roleOption', 'combo'));
    });
    $('#saveFormStmUsers input[name="userRoleCodeSaveFormStmUsers"]').unbind('change click').bind('change click',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'roleCode', fn_CheckRoleCtrl('get'));
    	gf_DhxGridCellMapping(dhxGridStmUsers, dhxDataProcessorStmUsers, 'roleNm', fn_CheckRoleCtrl('getNm'));
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormStmUsers = function() {
    $('#searchFormStmUsers').resetForm();
};

var cf_SetBindingStmUsers = function() {
	fn_FormDisabled(true);
    fn_SearchStmUsers('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 사원검색팝업
 */
var fn_PopEmpSearchStmUsers = function() {
    gf_EmpPopup('saveFormStmUsers', 'empnoSaveFormStmUsers', 'userNmSaveFormStmUsers', '1000', 'Y', 'fn_CallbackPopEmpSearchStmUsers');
};

var fn_CallbackPopEmpSearchStmUsers = function(data) {
    gf_FormSetValue('saveFormStmUsers', 'userId', data.empno, 'text');
    gf_FormSetValue('saveFormStmUsers', 'deptNm', data.deptCodeNm, 'text');
};
/**
 * 권한 체크박스
 */
var fn_CheckRoleCtrl = function(gb, roleCode) {
    var checkVal = [];
    $('input[name="userRoleCodeSaveFormStmUsers"]').each(function(index, item){
        if(gb === 'init') {
            $(this).prop("checked", false);
        } else
        if(gb === 'get') {
            if($(this).is(":checked")) checkVal.push($(this).val())
        } else
        if(gb === 'getNm') {
            if($(this).is(":checked")) checkVal.push($(this).parent().find('span').text())                 
        } else {
            if(roleCode.indexOf($(this).val()) > -1) $(this).prop("checked", true);
            else $(this).prop("checked", false);
        }
    });
    if(gb === 'get' || gb === 'getNm') return checkVal.join(',');
}
/**
 * 조회
 */
var fn_SearchStmUsers = function(userId) {
    var jsonParameter = {
        deptCode : gf_FormGetValue('searchFormStmUsers', 'deptNmSearchFormStmUsers', 'combo'),
          userId : gf_FormGetValue('searchFormStmUsers', 'userId', 'text'),
          userNm : gf_FormGetValue('searchFormStmUsers', 'userNm', 'text'),
          emplAt : gf_FormGetValue('searchFormStmUsers', 'empAt', 'combo'),
           useAt : gf_FormGetValue('searchFormStmUsers', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'stmmng001/searchStmUsers', jsonParameter, 'fn_CallbackSearchStmUsers', false, 'GET');
};

var dhxDataProcessorStmUsers;
var fn_CallbackSearchStmUsers = function(strSvcID, targetID, data) {
    dhxGridStmUsers.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListStmUsers');
        dhxGridStmUsers.parse(data.data.records, 'js');
        // 그리드입력 데이터프로세스 정의
        dhxDataProcessorStmUsers = new dataProcessor(gv_ContextPath+'/stmmng001/saveStmUsers'); //lock feed url
    	dhxDataProcessorStmUsers.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    	dhxDataProcessorStmUsers.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다        
        dhxDataProcessorStmUsers.init(dhxGridStmUsers); //link dataprocessor to the grid
        dhxDataProcessorStmUsers.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경 
        dhxDataProcessorStmUsers.styles = {
    			updated:	"font-weight:normal;text-decoration:none;",
    			inserted:	"font-weight:bold; color:green;",
    			deleted:	"color:orange; text-decoration:line-through;",
    			invalid:	"color:green; text-decoration:underline;",
    			error:		"color:blue; text-decoration:underline;",
    			clear:		"font-weight:normal;text-decoration:none;"
    	};
        dhxDataProcessorStmUsers.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
        	if (dataSource.code == "000" || dataSource.data.code !== "000"){
        		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        		fn_SearchStmUsers();
        		$("#checkAllStmUsers").prop('checked', false); //상단 체크박스 해제
        		return true;
    	 	} else {
    	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    	 		return false;
    	 	}        	            
        });        
        dhxGridStmUsers.selectRow(0);
        fn_FindStmUsers();
    } else {
        gf_NoFoundDataOnGridMsg('dataListStmUsers');
        fn_InitInputFormStmUsers();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormStmUsers").text(data.data.records.length);
    cf_SetEventListenerStmUsers();
};
/**
 * 상세조회
 */
var fn_FindStmUsers = function() {	
	var rId = dhxGridStmUsers.getSelectedRowId();
	var status = dhxDataProcessorStmUsers.getState(rId);
	
	gf_FormSetValue("saveFormStmUsers", "passwordUpdt", gf_DhxGetValue(dhxGridStmUsers, rId, 'passwordUpdt',  'grid'), '');
	gf_FormSetValue("saveFormStmUsers", "origPassword", gf_DhxGetValue(dhxGridStmUsers, rId, 'origPassword',  'grid'), '');
	gf_FormSetValue("saveFormStmUsers", "userPassword", gf_DhxGetValue(dhxGridStmUsers, rId, 'userPassword',  'grid'), '');
	gf_FormSetValue("saveFormStmUsers", "deptNm",       gf_DhxGetValue(dhxGridStmUsers, rId, 'deptNm',        'grid'), '');
	gf_FormSetValue("saveFormStmUsers", "empno",        gf_DhxGetValue(dhxGridStmUsers, rId, 'empno',         'grid'), '');
	gf_FormSetValue("saveFormStmUsers", "userNm",       gf_DhxGetValue(dhxGridStmUsers, rId, 'userNm',        'grid'), '');
	gf_FormSetValue("saveFormStmUsers", "userId",       gf_DhxGetValue(dhxGridStmUsers, rId, 'userId',        'grid'), '');
	gf_FormSetValue("saveFormStmUsers", "userIp",       gf_DhxGetValue(dhxGridStmUsers, rId, 'userIp',        'grid'), '');	
	gf_FormSetValue("saveFormStmUsers", "deptNm",       gf_DhxGetValue(dhxGridStmUsers, rId, 'deptNm',        'grid'), '');
	gf_FormSetValue("saveFormStmUsers", "emplAt",     ((gf_DhxGetValue(dhxGridStmUsers, rId, 'emplAt',        'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmUsers", "useAt",      ((gf_DhxGetValue(dhxGridStmUsers, rId, 'useAt',         'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmUsers", "roleOption",   gf_DhxGetValue(dhxGridStmUsers, rId, 'authorSetting', 'grid'), 'combo');
    fn_CheckRoleCtrl('set', gf_DhxGetValue(dhxGridStmUsers, rId, 'roleCode', 'grid'));

    fn_FormDisabled(false);

    if(status == 'inserted') {
    	$('#saveFormStmUsers input[name="userId"]').prop('disabled', false);
        $('#saveFormStmUsers input[name="empno"]').prop('disabled', false);
    	$('#btnPopEmpSearchStmUsers').show();
    } else {
    	$('#saveFormStmUsers input[name="userId"]').prop('disabled', true);
        $('#saveFormStmUsers input[name="empno"]').prop('disabled', true);              
        $('#btnPopEmpSearchStmUsers').hide();    	
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmUsers = function() {
    $('#saveFormStmUsers input[name="empno"]').removeAttr('disabled');
    $('#saveFormStmUsers input[name="userId"]').removeAttr('disabled');
    gf_FormSetValue('saveFormStmUsers', 'userId', '', '');
    gf_FormSetValue('saveFormStmUsers', 'empno', '', '');
    gf_FormSetValue('saveFormStmUsers', 'userPassword', '', '');
    gf_FormSetValue('saveFormStmUsers', 'userNm', '', '');
    gf_FormSetValue('saveFormStmUsers', 'userIp', '', '');
    gf_FormSetValue('saveFormStmUsers', 'emplAt', true, 'chkbox');
    gf_FormSetValue('saveFormStmUsers', 'useAt', true, 'chkbox');
    gf_FormSetValue('saveFormStmUsers', 'roleOption', 'UG', 'combo');
    fn_CheckRoleCtrl('', 'ROLE_GNR');
    $('#btnPopEmpSearchStmUsers').show();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
	$('#saveFormStmUsers *').prop('disabled', status);
};
/**
 * 저장 (입력, 수정)
 */
var fn_AddStmUsers = function() {
	dhxGridStmUsers.clearSelection();
	fn_InitInputFormStmUsers();
	var initValueArr = [];
	initValueArr.push(''); //num
	initValueArr.push(''); //chk
	initValueArr.push(''); //deptNm
	initValueArr.push(''); //empno
	initValueArr.push(''); //userNm
	initValueArr.push(''); //userId
	initValueArr.push(''); //userIp
	initValueArr.push('사원'); //emplAtNm
	initValueArr.push('사용'); //useAtNm
	initValueArr.push(''); //roleNm
	initValueArr.push(''); //regDt
	initValueArr.push(''); //userPassword
	initValueArr.push(''); //origPassword
	initValueArr.push(''); //passwordUpdt
	initValueArr.push('UG'); //authorSettingj
	initValueArr.push('1'); //emplAt
	initValueArr.push('1'); //useAt
	initValueArr.push('ROLE_GNR'); //roleCode		
	dhxGridStmUsers.addRow(dhxGridStmUsers.uid(), initValueArr, 0);
	dhxGridStmUsers.selectRow(0);
	gf_NoFoundDataOnGridMsgRemove('dataListStmUsers');
	$('#btnPopEmpSearchStmUsers').show();
	fn_FormDisabled(false);		
}
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmUsers = function() {
	if(fn_GridValidation(dhxGridStmUsers, dhxDataProcessorStmUsers)) {		
		dhxDataProcessorStmUsers.sendData();
	}
}
/**
 * 삭제
 */
var fn_RemoveStemUsers = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmUsers, 'chk');    
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 사용자를 선택해 주세요.');
        return false;
    } else {
    	var state;
    	dhxGridStmUsers.forEachRow(function(rowId) {
    		state = dhxDataProcessorStmUsers.getState(rowId);    		
			if(dhxGridStmUsers.cells(rowId, gf_GetDhxGridColumId(dhxGridStmUsers, 'chk')).isChecked()){
				if(state == 'inserted') dhxGridStmUsers.deleteRow(rowId);
				else dhxDataProcessorStmUsers.setUpdated(rowId, true, 'deleted');
			}
		});
    	
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStemUsers = function() {
    var pageTite = gf_LocaleTrans('default','titStmUsers');
    var jsonParameter = {
        userId : gf_FormGetValue('searchForm', 'userId', 'text'),
        userNm : gf_FormGetValue('searchForm', 'userNm', 'text'),
        useAt  : gf_FormGetValue('searchForm', 'useAt', 'radio')
    };
    var header = [[ gf_LocaleTrans('default', 'titUserId'),
                    gf_LocaleTrans('default', 'titEmpno'),
                    gf_LocaleTrans('default', 'titUserPassword'),
                    gf_LocaleTrans('default', 'titUserNm'),
                    gf_LocaleTrans('default', 'titUserIp'),
                    gf_LocaleTrans('default', 'titEmplAt'),
                    gf_LocaleTrans('default', 'titUseAt'),
                    gf_LocaleTrans('default', 'titRegDt')]];
    var dataId =    [[ 'userId', 'empno', 'userPassword', 'userNm', 'userIp', 'emplAtNm', 'useAtNm', 'regDt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm =   [[ pageTite ]];
    var param   =   [[ $.param( jsonParameter ) ]];
    var fileNm = pageTite;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmmng001/excelStmUsers', jsonParameter);
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){	 
	$('#saveFormStmUsers #userIdSaveFormStmUsers').parent().append(
	'<div class="error" id="useridSaveFormStmUsers-error" onclick="$(this).remove()" style="width:150px">동일한 사용자 ID가 존재합니다.</div>'
	);
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmUsers = function(userId){    
    if(!gf_IsNull(userId)) {         
	    var jsonParameter = {
	        userId:userId
	    };
	    var dataSource = gf_NoAsyncTransaction('stmmng001/findStmUsers', jsonParameter, 'GET');
	    var data = dataSource.data;
	    if(dataSource.code === '000') {
	        if(gf_IsNull(data.userId)) {            	        	
	        	return true;
	        } else {	        	
	        	fn_JqueryValidationToolTipForDuplicationKey();
	        	return false;
	        }
	    } 
    }
}
/**
 * 중복데이터 db 체크
 */
var fn_FormValidation =  function(rowId){
	var state = dhxDataProcessorStmUsers.getState(rowId);
	if(!gf_IsNull(rowId)) {
		if(state != 'deleted') {
			if($('#saveFormStmUsers').validate().form()){
				if(state == 'inserted') {
					var userId = gf_FormGetValue('saveFormStmUsers', 'userId', 'text');
					if(fn_CheckDupStmUsers(userId)) return true;
					else return false;
				} else {
					return true;
				}
			} else {
				return false;
			}
		}
	} else {
		return true;
	}
}
/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){	
	var state;
	var valid;
	var validFalseFistRowId;
	var validFalseDuplicationKey;
	var checkUserId;
	dhxGridObjet.forEachRow(function(rowId) {
		valid = true;
		state = dhxDataProcessor.getState(rowId);
		if(!gf_IsNull(state)) {			
			if(state != 'deleted') {				
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){	 
					fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
					valid = false;
				}			 
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'userNm', 'grid') )){
					fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userNm');
					valid = false;
				}			 
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'userId', 'grid') )){
					fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userId');
					valid = false;
				}
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'userPassword', 'grid') )){
					fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userPassword');
					valid = false;
				}
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'userIp', 'grid') )){
					fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userIp');
					valid = false;
				}
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'authorSetting', 'grid') )){
					fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'authorSetting');
					valid = false;
				}				
				//gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');								 
				if(state == 'inserted') {					
					checkUserId = gf_DhxGetValue(dhxGridObjet, rowId, 'userId', 'grid');					
					if(!gf_IsNull(checkUserId)) {
						// 신규입력 key 그리드 중복 체크
						dhxGridObjet.forEachRow(function(rowIdForCheck) {
							var userId = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'userId', 'grid');
							if((userId == checkUserId) && (rowId != rowIdForCheck)) {
								validFalseDuplicationKey = true;
								fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userId');
								valid = false;
							}
						});					
						// 신규입력 key db 중복 체크
						if(!fn_CheckDupStmUsers( checkUserId )){
							validFalseDuplicationKey = true;
							fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userId');							
							valid = false;						
						}
						// 그리드 중복된 처음 추가된 row 체크
						if(!valid) validFalseFistRowId = rowId;						
					} else {			 		
						// 신규로 등록된 마지막 로우를 설정
						if(!valid) validFalseFistRowId = rowId;
					}
				}				
		    	if(!valid && gf_IsNull(validFalseFistRowId)) {	    		
		    		validFalseFistRowId = rowId;	    		
		    	}
			}
		}
    });	
	//gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');	
	// selected validation check row 
	if(!gf_IsNull(validFalseFistRowId)) {
		dhxGridStmUsers.selectRowById(validFalseFistRowId);
		fn_FindStmUsers();
		fn_FormValidation(validFalseFistRowId);
		if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
	}
	if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
	else return false;	  
}
/**
 * 그리드 validation 빨간색 언더바
 */
var fn_GridValidationSelectCell = function(dhxGrid, dhxDataProcessor, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}
