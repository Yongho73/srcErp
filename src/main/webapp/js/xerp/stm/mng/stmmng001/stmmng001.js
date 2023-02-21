/**
 *    프로그램       : 사용자등록(관리) 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.16
 *    사용테이블      : STM_USERS
 * sourceGen version : 2020.07.16.01 (2020.07.16)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmmng001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmmng001 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmmng001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmmng001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmmng001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmmng001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmmng001 = 0;  //그리드 삭제 수량 
var dhxGridStmmng001;  //그리드 객체
var eventIdStmmng001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorStmmng001;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmng001();
    if(cf_SetComponentsStmmng001()){
       cf_SetEventListenerStmmng001();
       cf_InitFormStmmng001();
       cf_SetBindingStmmng001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmmng001 = function() {
    gf_SetMenuPath();
    $("#saveFormStmmng001").validate({ errorElement: 'div', ignore: '' });

    gf_MakeComboBasic('divComboDeptNm','deptNmSearch','search','width:140px','stmmng001/combo/dept'); // 부서 커스텀 조회용 콤보박스
    gf_MakeCheckBasic('userRoleCodeSaveFormStmUsersCombo','userRoleCodeSaveFormStmUsers','','','stmmng001/check/role'); // 그룹권한 커스텀 체크박스
};

var cf_SetComponentsStmmng001 = function() {
	var dhxGridStmmng001HeaderInfo = [];
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmmng001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('부서', '100', 'left', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titUserId') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('사용자명', '100', 'center', 'str', 'ro', false, 'userNm', '', '')); /* gf_LocaleTrans('default', 'titUserNm') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('사용자ID', '100', 'left', 'str', 'ro', false, 'userId', '', '')); /* gf_LocaleTrans('default', 'titUserId') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('사용자IP', '100', 'left', 'str', 'ro', false, 'userIp', '', '')); /* gf_LocaleTrans('default', 'titUserIp') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('사원여부', '80', 'center', 'str', 'ro', false, 'emplAtNm', '', '')); /* gf_LocaleTrans('default', 'titEmplAt') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '80', 'center', 'str', 'ro', false, 'useAtNm', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('권한', '*', 'left', 'str', 'ro', false, 'roleNm', '', '')); /* gf_LocaleTrans('default', 'titAuthorSetting') */
    
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('등록일자', '150', 'center', 'str', 'ro', true, 'regDt', '', '')); /* gf_LocaleTrans('default', 'titEmplAt') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('사원여부', '100', 'center', 'str', 'ro', true, 'emplAt', '', '')); /* gf_LocaleTrans('default', 'titEmplAt') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ro', true, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('사용자패스워드', '100', 'left', 'str', 'ro', true, 'userPassword', '', '')); /* gf_LocaleTrans('default', 'titUserPassword') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('권한설정', '100', 'left', 'str', 'ro', true, 'authorSetting', '', '')); /* gf_LocaleTrans('default', 'titAuthorSetting') */
    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('권한코드', '*', 'left', 'str', 'ro', true, 'roleCode', '', '')); /* gf_LocaleTrans('default', 'titAuthorSetting') */
//    dhxGridStmmng001HeaderInfo.push(gf_MakeDhxGridHeader('패스워드 변경일자', '100', 'left', 'str', 'ro', true, 'passwordUpdt', '', '')); /* gf_LocaleTrans('default', 'titPasswordUpdt') */
    dhxGridStmmng001 = gf_MakeDhxGrid('dataListStmmng001', dhxGridStmmng001HeaderInfo, true, false, false);
    dhxGridStmmng001.enableAutoWidth(false);
    dhxGridStmmng001.setEditable(true);

    dhxGridStmmng001.setColumnMinWidth(100,9); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerStmmng001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmmng001 = gf_GridDetachEvent(dhxGridStmmng001, eventIdStmmng001);
    eventId = dhxGridStmmng001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmmng001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmmng001.getColumnsNum();
            var rowNum = dhxGridStmmng001.getRowsNum();
            var selectedId = dhxGridStmmng001.getSelectedRowId();
            var ind        = dhxGridStmmng001.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng001.getRowIndex(selectedId);
            var type       = dhxGridStmmng001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmmng001.selectRow(0);
                    //fn_FindStmmng001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmmng001.selectRow(rowIndex + 1);
                    fn_FindStmmng001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmmng001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmmng001.getSelectedRowId();
            var ind        = dhxGridStmmng001.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng001.getRowIndex(selectedId);
            var type       = dhxGridStmmng001.getColType(ind);
            dhxGridStmmng001.selectCell(rowIndex+1, ind);
            fn_FindStmmng001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmmng001.getSelectedRowId();
            var ind        = dhxGridStmmng001.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng001.getRowIndex(selectedId);
            var type       = dhxGridStmmng001.getColType(ind);
            dhxGridStmmng001.selectCell(rowIndex-1, ind);
            fn_FindStmmng001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng001.editCell();
            }
        }
        else return true;
    });
    eventIdStmmng001.push(eventId);
    eventId = dhxGridStmmng001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmmng001SortGridList(ind, type, direction); 
    });
    eventIdStmmng001.push(eventId);
    eventId = dhxGridStmmng001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmmng001.push(eventId);
    eventId = dhxGridStmmng001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindStmmng001();
    });
    eventIdStmmng001.push(eventId);
    eventId = dhxGridStmmng001.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmmng001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmmng001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddStmmng001()
    });
    $('#btnSaveStmmng001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmmng001();
    });
    $('#btnRemoveStmmng001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmmng001();
    });
    $('#btnExcelStmmng001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmmng001();
    });
    $('#btnSearchStmmng001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmmng001('');
    });
    $('#btnResetStmmng001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmmng001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllStmmng001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridStmmng001, $('#checkAllStmmng001').prop('checked'), 'chk');
    });
    $('#searchFormStmmng001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmmng001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#btnPopEmpSearchStmmng001').unbind('click').bind('click', function(event){
    	gf_errorMsgClear();
    	gf_EmpPopup('saveFormStmmng001', 'empnoSaveFormStmmng001', 'userNmSaveFormStmmng001', '1000', 'Y', 'fn_CallbackPopEmp');
    });
    $('#empnoSaveFormStmmng001').unbind('click').bind('click',function() {
    	gf_errorMsgClear();
    	gf_EmpPopup('saveFormStmmng001', 'empnoSaveFormStmmng001', 'userNmSaveFormStmmng001', '1000', 'Y', 'fn_CallbackPopEmp');
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmmng001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "userNmSaveFormStmmng001"){
        		fn_SearchEmpCode('1');
        	} else {
        		return gf_saveForm_NextEle("saveFormStmmng001",this);
        	}
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng001 input[name="deptNm"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'deptNm', $(this).val());
    });  
    $('#saveFormStmmng001 input[name="empno"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'empno', $(this).val());
    });    
    $('#saveFormStmmng001 input[name="userNm"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'userNm', $(this).val());
    });
    $('#saveFormStmmng001 input[name="userId"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'userId', $(this).val()); 
    });
    $('#saveFormStmmng001 input[name="userPassword"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'userPassword', $(this).val());
    });
    $('#saveFormStmmng001 input[name="userIp"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'userIp', $(this).val());
    });
    $('#saveFormStmmng001 input[name="emplAt"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	var val = gf_IsNull(gf_FormGetValue('saveFormStmmng001', 'emplAt', 'chkbox'))? '0' : '1';
    	var valNm = gf_IsNull(gf_FormGetValue('saveFormStmmng001', 'emplAt', 'chkbox'))? '비사원' : '사원';
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'emplAt', val);    	
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'emplAtNm', valNm);
    });
    $('#saveFormStmmng001 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	var val = gf_IsNull(gf_FormGetValue('saveFormStmmng001', 'useAt', 'chkbox'))? '0' : '1';
    	var valNm = gf_IsNull(gf_FormGetValue('saveFormStmmng001', 'useAt', 'chkbox'))? '미사용' : '사용';    	 
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'useAt', val);
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'useAtNm', valNm);
    });
    $('#saveFormStmmng001 select[name="roleOption"]').unbind('change click').bind('change click',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'authorSetting', gf_FormGetValue('saveFormStmmng001', 'roleOption', 'combo'));
    });
    $('#saveFormStmmng001 input[name="userRoleCodeSaveFormStmUsers"]').unbind('change click').bind('change click',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'roleCode', fn_CheckRoleCtrl('get'));
    	gf_DhxGridCellMapping(dhxGridStmmng001, dhxDataProcessorStmmng001, 'roleNm', fn_CheckRoleCtrl('getNm'));
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormStmmng001 = function() {
    $('#searchFormStmmng001').resetForm();
    $('#userNmSearchFormStmmng001').focus();
};

var cf_SetBindingStmmng001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchStmmng001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmmng001 = function(userId) {
    var jsonParameter = {
    		deptCode : gf_FormGetValue('searchFormStmmng001', 'deptNmSearch', 'combo'),
            userId : gf_FormGetValue('searchFormStmmng001', 'userId', 'text'),
            userNm : gf_FormGetValue('searchFormStmmng001', 'userNm', 'text'),
            emplAt : gf_FormGetValue('searchFormStmmng001', 'empAt', 'combo'),
            useAt : gf_FormGetValue('searchFormStmmng001', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'stmmng001/searchStmUsers', jsonParameter, 'fn_CallbackSearchStmmng001', false, 'GET');
};

var fn_CallbackSearchStmmng001 = function(strSvcID, targetID, data) {
    //dhxGridStmmng001.clearAll();
    dhxGridStmmng001.destructor();
    if(cf_SetComponentsStmmng001()){ 
        fn_DhxDataProcessorStmmng001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmmng001');
            dhxGridStmmng001.parse(data.data.records, 'js');
 
            if(save_Row_Num_Stmmng001 == 0 && save_All_Sta_Stmmng001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridStmmng001.selectRow(0); 
            } else if(save_Row_Sta_Stmmng001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridStmmng001.selectRow(0);
            } else if(save_All_Sta_Stmmng001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridStmmng001.selectRow(save_Row_Num_Stmmng001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridStmmng001.selectRow(save_Row_Num_Stmmng001);   //개발자 수정 필요  
                //var findCell = dhxGridStmmng001.findCell(save_Row_Ids_Stmmng001, gf_GetDhxGridColumId(dhxGridStmmng001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmmng001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmmng001.selectRow(0);
                //} 
            } 
 
            fn_FindStmmng001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmmng001');
            fn_InitInputFormStmmng001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormStmmng001").text(data.data.records.length);
        cf_SetEventListenerStmmng001();
    } 
};
var fn_DhxDataProcessorStmmng001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmmng001 = new dataProcessor(gv_ContextPath+'/stmmng001/saveStmUsers'); //lock feed url
    dhxDataProcessorStmmng001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmmng001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmmng001.init(dhxGridStmmng001); //link dataprocessor to the grid
    dhxDataProcessorStmmng001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmmng001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmmng001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmmng001();
                    $("#checkAllStmmng001").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 상세조회
 */
var fn_FindStmmng001 = function() {
    var rId = dhxGridStmmng001.getSelectedRowId();
    var status = dhxDataProcessorStmmng001.getState(rId);

    fn_FormDisabled(false);

//    gf_FormSetValue("saveFormStmmng001", "passwordUpdt", gf_DhxGetValue(dhxGridStmmng001, rId, 'passwordUpdt',  'grid'), '');
	gf_FormSetValue("saveFormStmmng001", "userPassword", gf_DhxGetValue(dhxGridStmmng001, rId, 'userPassword',  'grid'), '');
	gf_FormSetValue("saveFormStmmng001", "deptNm",       gf_DhxGetValue(dhxGridStmmng001, rId, 'deptNm',        'grid'), '');
	gf_FormSetValue("saveFormStmmng001", "empno",        gf_DhxGetValue(dhxGridStmmng001, rId, 'empno',         'grid'), '');
	gf_FormSetValue("saveFormStmmng001", "userNm",       gf_DhxGetValue(dhxGridStmmng001, rId, 'userNm',        'grid'), '');
	gf_FormSetValue("saveFormStmmng001", "userId",       gf_DhxGetValue(dhxGridStmmng001, rId, 'userId',        'grid'), '');
	gf_FormSetValue("saveFormStmmng001", "userIp",       gf_DhxGetValue(dhxGridStmmng001, rId, 'userIp',        'grid'), '');	
	gf_FormSetValue("saveFormStmmng001", "emplAt",     ((gf_DhxGetValue(dhxGridStmmng001, rId, 'emplAt',        'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmmng001", "useAt",      ((gf_DhxGetValue(dhxGridStmmng001, rId, 'useAt',         'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmmng001", "roleOption",   gf_DhxGetValue(dhxGridStmmng001, rId, 'authorSetting', 'grid'), 'combo');
    console.log(gf_DhxGetValue(dhxGridStmmng001, rId, 'regDt', 		'grid'));
    gf_FormSetValue("saveFormStmmng001", "regDt", 		 gf_DhxGetValue(dhxGridStmmng001, rId, 'regDt', 		'grid'), '');
    fn_CheckRoleCtrl('set', gf_DhxGetValue(dhxGridStmmng001, rId, 'roleCode', 'grid'));
    
    
    if(status == 'inserted') {
    	$('#saveFormStmmng001 input[name="userId"]').prop('disabled', false);
        $('#saveFormStmmng001 input[name="empno"]').prop('disabled', false);
    	$('#btnPopEmpSearchStmmng001').show();
    } else {
    	$('#saveFormStmmng001 input[name="userId"]').prop('disabled', true);
        $('#saveFormStmmng001 input[name="empno"]').prop('disabled', true);           
        $('#btnPopEmpSearchStmmng001').hide();
    }
	$('#saveFormStmmng001 input[name="regDt"]').prop('disabled', true);
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmmng001 = function() {
    $('#saveFormStmmng001').resetForm();
    $('#btnPopEmpSearchStmmng001').show();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmmng001 *').prop('disabled', status);
	$('#saveFormStmmng001 input[name="regDt"]').prop('disabled', true);
};
/**
 * 추가(신규) 
 */
var fn_AddStmmng001 = function() {
    dhxGridStmmng001.clearSelection();
    fn_InitInputFormStmmng001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //deptNm : 부서
    initValueArr.push(''); //empno : 사원번호
    initValueArr.push(''); //userNm : 사용자명
    initValueArr.push(''); //userID : 사용자ID
    initValueArr.push(''); //userIp : 사용자IP
    initValueArr.push('사원'); //emplAtNm : 사원여부
    initValueArr.push('사용'); //useAtNm : 사용여부
    initValueArr.push('일반사용자'); //roleNm : 권한
    initValueArr.push(''); //regDt : 등록일자
    initValueArr.push('1'); //emplAt : 사원여부
    initValueArr.push('1'); //useAt : 사용여부
    initValueArr.push(''); //userPassword : 사용자패스워드
    initValueArr.push('UG'); //authorSetting : 권한설정
    initValueArr.push('ROLE_GNR'); //roleCode : 권한코드
//    initValueArr.push(''); //passwordUpdt : 패스워드 변경일자
    dhxGridStmmng001.addRow(dhxGridStmmng001.uid(), initValueArr, 0);
    dhxGridStmmng001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmmng001');
    $('#btnPopEmpSearchStmmng001').show();
    $('#saveFormStmmng001').resetForm();
    $('#saveFormStmmng001 input[name="empno"]').removeAttr('disabled');
    $('#saveFormStmmng001 input[name="userId"]').removeAttr('disabled');
    gf_FormSetValue('saveFormStmmng001', 'deptNm', '', '');
    gf_FormSetValue('saveFormStmmng001', 'emplAt', true, 'chkbox');
    gf_FormSetValue('saveFormStmmng001', 'useAt', true, 'chkbox');
    gf_FormSetValue('saveFormStmmng001', 'roleOption', 'UG', 'combo');
    fn_CheckRoleCtrl('', 'ROLE_GNR');
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmmng001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmmng001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmmng001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmmng001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmmng001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmmng001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmmng001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmmng001', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmmng001.setSortImgState(false); 
            gf_FormSetValue('searchFormStmmng001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmmng001', 'sortColumId', '', 'text'); 
            dhxGridStmmng001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmmng001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmmng001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmmng001', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmmng001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmmng001 = 0; 
    save_Edt_Cnt_Stmmng001 = 0; 
    save_Del_Cnt_Stmmng001 = 0; 
    dhxGridStmmng001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmmng001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmmng001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmmng001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmmng001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmmng001 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        var confirmMsg  = ""; 
        var confirmMsg1 = ""; 
        var confirmMsg2 = ""; 
        var confirmMsg3 = ""; 
        save_All_Sta_Stmmng001 = 0; 
        if(save_Add_Cnt_Stmmng001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmmng001 + "건";
            save_All_Sta_Stmmng001 = 1; 
        } 
        if(save_Edt_Cnt_Stmmng001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmmng001 + "건"; 
        } 
        if(save_Del_Cnt_Stmmng001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmmng001 + "건"; 
            save_All_Sta_Stmmng001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmmng001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmmng001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmmng001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmmng001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmmng001_Send = function() {
    if(fn_GridValidation(dhxGridStmmng001, dhxDataProcessorStmmng001)) {
        dhxDataProcessorStmmng001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmmng001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmmng001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridStmmng001.forEachRow(function(rowId) {
            state = dhxDataProcessorStmmng001.getState(rowId);
            if(dhxGridStmmng001.cells(rowId, gf_GetDhxGridColumId(dhxGridStmmng001, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridStmmng001.getRowIndex(rowId);
                    dhxGridStmmng001.deleteRow(rowId);
                    dhxGridStmmng001.selectRow(rowNum);
                    fn_FindStmmng001();
                }
                else dhxDataProcessorStmmng001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmmng001 = function () {
    var titStmmng001 = '사용자등록(관리)'; /* gf_LocaleTrans('default', 'titStmmng001') */
    var jsonParameter = {
        deptCode : gf_FormGetValue('searchFormStmmng001', 'deptNmSearch', 'combo'),
        userId : gf_FormGetValue('searchFormStmmng001', 'userId', 'text'),
        userNm : gf_FormGetValue('searchFormStmmng001', 'userNm', 'text'),
        emplAt : gf_FormGetValue('searchFormStmmng001', 'emplAt', 'combo'),
        useAt : gf_FormGetValue('searchFormStmmng001', 'useAt', 'combo')
    };
    var header = [[
        '부서' /* gf_LocaleTrans('default', 'titUserId') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '사용자명' /* gf_LocaleTrans('default', 'titUserNm') */,
        '사용자ID' /* gf_LocaleTrans('default', 'titUserId') */,
        '사용자패스워드' /* gf_LocaleTrans('default', 'titUserPassword') */,
        '사원여부' /* gf_LocaleTrans('default', 'titEmplAt') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '권한설정' /* gf_LocaleTrans('default', 'titAuthorSetting') */,
        '사용자IP' /* gf_LocaleTrans('default', 'titUserIp') */
    ]];
    var dataId = [[ 'deptNm', 'empno', 'userNm', 'userId', 'userPassword', 'emplAtNm', 'useAtNm', 'authorSetting', 'userIp' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmmng001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmmng001;
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
/**
 * 사용자 그룹권한 체크
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
 * 사원 조회
 */
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('saveFormStmmng001', 'empno', 'text');
		korNm = gf_FormGetValue('saveFormStmmng001', 'userNm', 'text');
	}
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : gBplcCode
	};
	gf_Transaction(gubun, 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}


function fn_CallbackPopEmp(data){
	console.log(data.empno + " : " + data.korNm);
	gf_FormSetValue('saveFormStmmng001', 'deptNm', data.deptCodeNm, 'text');
	gf_FormSetValue('saveFormStmmng001', 'userId', data.empno, 'text');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	  	if(strSvcID == "1"){
	 		gf_FormSetValue('saveFormStmmng001', 'empno', data.empno, 'text');
	 		gf_FormSetValue('saveFormStmmng001', 'empNm', data.korNm, 'text');
	 		gf_FormSetValue('saveFormStmmng001', 'deptNm', data.deptCodeNm, 'text');
	  	}
 	} else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("saveFormStmmng001","empno","empNm", "1000", "Y");
	  	}
  	}
}
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormStmmng001 #userIdSaveFormStmmng001').parent().append(
    '<div class="error" id="userIdSaveFormStmmng001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmmng001 = function(userId){
    if(!gf_IsNull(userId)) {
        var jsonParameter = {
            userId : userId
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
 * 폼데이터 db 체크
 */
var fn_FormValidation =  function(rowId){
    var state = dhxDataProcessorStmmng001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormStmmng001').validate().form()){
                if(state == 'inserted') {
                    var userId = gf_FormGetValue('saveFormStmmng001', 'userId', 'text');
                    if(fn_CheckDupStmmng001(userId)) return true;
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
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmmng001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Stmmng001 == 'deleted') {
        save_Row_Num_Stmmng001 = 0;
        save_Row_Ids_Stmmng001 = "";
    } else if(save_Row_Sta_Stmmng001 == 'inserted') {
        save_Row_Num_Stmmng001 = rowNum;
        save_Row_Ids_Stmmng001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmmng001 = rowNum;
        save_Row_Ids_Stmmng001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'deptNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'deptNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'userId', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userId');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'userNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userNm');
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
                            if(((userId == checkUserId)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userId');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmmng001( checkUserId )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userId');
                            valid = false;
                        }
                        // 그리드 중복된 처음 추가된 row 체크
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    } else {
                        // 신규로 등록된 마지막 로우를 설정
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    }
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridStmmng001.selectRowById(validFalseFistRowId);
        fn_FindStmmng001();
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
