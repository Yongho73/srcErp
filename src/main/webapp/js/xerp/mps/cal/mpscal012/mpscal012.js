/**
 *    프로그램       : 자녀학비보조금 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.29
 *    사용테이블      : MHS_SCHXPN_REQST
 * sourceGen version : 2020.07.16.01 (2020.07.29)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpscal012 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpscal012 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpscal012 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpscal012 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpscal012 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpscal012 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpscal012 = 0;  //그리드 삭제 수량 
var dhxGridMpscal012;  //그리드 객체
var eventIdMpscal012 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMpscal012;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscal012();
    if(cf_SetComponentsMpscal012()){
       cf_SetEventListenerMpscal012();
       cf_InitFormMpscal012();
       cf_SetBindingMpscal012();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscal012 = function() {
    gf_SetMenuPath();
    $("#saveFormMpscal012").validate({ errorElement: 'div', ignore: '' });
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
    $("#deptCodeNm").focus();
    
};

var cf_SetComponentsMpscal012 = function() {
    var dhxGridMpscal012HeaderInfo = [];
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscal012" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('사원명', '150', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('자녀명', '150', 'center', 'str', 'ro', false, 'chldrnNm', '', '')); /* gf_LocaleTrans('default', 'titChldrnNm') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('학교명', '150', 'left', 'str', 'ro', false, 'schulNm', '', '')); /* gf_LocaleTrans('default', 'titSchulNm') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('학년', '100', 'center', 'int', 'ro', false, 'grade', '', '')); /* gf_LocaleTrans('default', 'titGrade') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('분기', '100', 'center', 'int', 'coro', false, 'qu', '', '')); /* gf_LocaleTrans('default', 'titQu') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('수업료 금액', '200', 'right', 'int', 'edn', false, 'tutfeeAmt', '', '')); /* gf_LocaleTrans('default', 'titTutfeeAmt') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('운영 지원 금액', '200', 'right', 'int', 'edn', false, 'operSportAmt', '', '')); /* gf_LocaleTrans('default', 'titOperSportAmt') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '150', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('지급일자', '150', 'center', 'str', 'ro', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titPymntDe') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '', '')); /* gf_LocaleTrans('default', 'titpymntSn') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('승인여부', '100', 'center', 'str', 'coro', false, 'confmSttusCode', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMpscal012HeaderInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'reqstNo', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMpscal012 = gf_MakeDhxGrid('dataListMpscal012', dhxGridMpscal012HeaderInfo, true, false, false);
    dhxGridMpscal012.enableAutoWidth(false);
    dhxGridMpscal012.setEditable(true);

    dhxGridMpscal012.setColumnMinWidth(60,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    //분기
    var qujsonParameter = {codekindCode : "C058",exceptCode :"",sortOrder :"asc" };
    var qudataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', qujsonParameter, '');
    gf_ComboDataSet(dhxGridMpscal012, dhxGridMpscal012.getColIndexById("qu"), qudataSource.data, "sel");
    
    //승인신청상태
    var confmSttusCodejsonParameter = {codekindCode : "C197",exceptCode :"",sortOrder :"asc" };
    var confmSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', confmSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscal012, dhxGridMpscal012.getColIndexById("confmSttusCode"), confmSttusCodedataSource.data, "sel");
    
    dhxGridMpscal012.setNumberFormat("0,000", dhxGridMpscal012.getColIndexById("tutfeeAmt"), ".", ",");
    dhxGridMpscal012.setNumberFormat("0,000", dhxGridMpscal012.getColIndexById("operSportAmt"), ".", ",");
    
    return true; 
};

var cf_SetEventListenerMpscal012 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscal012 = gf_GridDetachEvent(dhxGridMpscal012, eventIdMpscal012);
    eventId = dhxGridMpscal012.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscal012();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscal012.getColumnsNum();
            var rowNum = dhxGridMpscal012.getRowsNum();
            var selectedId = dhxGridMpscal012.getSelectedRowId();
            var ind        = dhxGridMpscal012.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal012.getRowIndex(selectedId);
            var type       = dhxGridMpscal012.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscal012.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscal012.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscal012.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal012.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscal012.getSelectedRowId();
            var ind        = dhxGridMpscal012.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal012.getRowIndex(selectedId);
            var type       = dhxGridMpscal012.getColType(ind);
            dhxGridMpscal012.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal012.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscal012.getSelectedRowId();
            var ind        = dhxGridMpscal012.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal012.getRowIndex(selectedId);
            var type       = dhxGridMpscal012.getColType(ind);
            dhxGridMpscal012.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal012.editCell();
            }
        }
        else return true;
    });
    eventIdMpscal012.push(eventId);
    eventId = dhxGridMpscal012.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpscal012SortGridList(ind, type, direction); 
    });
    eventIdMpscal012.push(eventId);
    eventId = dhxGridMpscal012.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscal012.push(eventId);
    eventId = dhxGridMpscal012.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpscal012.push(eventId);
    eventId = dhxGridMpscal012.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscal012.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscal012').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscal012()
    });
    $('#btnSaveMpscal012').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal012, 'chk');
        var pymntSn = gf_FormGetValue('searchFormMpscal012', 'pymntSn', 'text');
        if(gf_IsNull(rowIds)){
    		gf_DivMsgAlert("지급할 사원을 선택해 주세요.");
    		return false;
    	}else if(gf_IsNull(pymntSn)){
    		gf_DivMsgAlert("지급일자를 선택해 주세요.");
    		return false;
		}else{
			fn_SaveMpscal012();
		}
    });
    $('#btnRemoveMpscal012').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscal012();
    });
    $('#btnExcelMpscal012').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscal012();
    });
    $('#btnSearchMpscal012').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscal012('');
    });
    $('#btnResetMpscal012').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscal012();
    });
    $('#btnPymntDeSearch').unbind('click').bind('click', function(event){
    	var pymntDe;
    	// 체크된 항목을 가져온다
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal012, 'chk');
		$(rowIds).each(function(index, rowId){
    		// 그리드에 체크된 컬럼 값들을 체크 한다 
			pymntDe = gf_DhxGetValue(dhxGridMpscal012, rowId, 'pymntDe',  'grid');
			if(!gf_IsNull(pymntDe)){
				gf_DivMsgAlert("지급일자가 등록되어 있습니다.<br/> 확인해주세요.");
				return false;
			}
    	});
    	if(gf_IsNull(rowIds)){
    		gf_DivMsgAlert("지급할 사원을 선택해 주세요.");
    		return false;
    	}else if(gf_IsNull(pymntDe) && !gf_IsNull(rowIds)){
			gf_PymntDeClosAtPopup('','','','', gBplcCode, "N", "fn_CallbackPopComp"); 
		}
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpscal012').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscal012, $('#checkAllMpscal012').prop('checked'), 'chk');
    });
    $('#searchFormMpscal012 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
    	if(event.charCode == 13) { 
        	if(this.id == "deptCode"){
        		return fn_SearchMhsEmpDeptCode();
        	} else if(this.id == "deptCodeNm"){
        		return fn_SearchMhsEmpDeptCode();
        	} else if(this.id == "empno"){
        		fn_SearchEmpCode("1");
        	} else if(this.id == "korNm"){
        		fn_SearchEmpCode("1");
        		return false;
        	} else{
        		$('#btnSearchMpscal012').click(); event.preventDefault(); return true;
        	} 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpscal012').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    
 // 사원, 부서 pop 이벤트 ===========================================================================================
    //사원 선택 검색
	$('#searchFormMpscal012 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMpscal012","empNmSearchFormMpscal012","empCodeNmSearchFormMpscal012", gBplcCode, "Y", "fn_CallbackSearchPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//사원 입력 후 Enter 이벤트
	$('#empNmSearchFormMpscal012').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#empCodeNmSearchFormMpscal012').focus();
	    }
    });
	$('#empCodeNmSearchFormMpscal012').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("1");
	    }
    });
	//사원 선택 Popup
    $('#searchFormMpscal012 #btnempnoSearchSearchFormMpscal012').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMpscal012","empno","korNm", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
    //부서 선택 Popup
	$('#searchFormMpscal012 #btnDeptCodeSearchSearchFormMpscal012').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMpscal012","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal012', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal012', 'empno', '', 'text');
	    }
		
    });
	
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal012', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal012', 'deptCode', '', 'text');
	    }
    });
	
};

var cf_InitFormMpscal012 = function() {
    $('#searchFormMpscal012').resetForm();
};

var cf_SetBindingMpscal012 = function() {
    fn_SearchMpscal012('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscal012 = function(userId) {
    var jsonParameter = {
        deptCode : gf_FormGetValue('searchFormMpscal012', 'deptCode', 'text'),
        empno : gf_FormGetValue('searchFormMpscal012', 'empno', 'text')
    };
    gf_Transaction(userId, 'mpscal012/searchMpscal012', jsonParameter, 'fn_CallbackSearchMpscal012', false, 'GET');
};

var fn_CallbackSearchMpscal012 = function(strSvcID, targetID, data) {
    //dhxGridMpscal012.clearAll();
    dhxGridMpscal012.destructor();
    if(cf_SetComponentsMpscal012()){ 
        fn_DhxDataProcessorMpscal012(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpscal012');
            dhxGridMpscal012.parse(data.data.records, 'js');
 
            dhxGridMpscal012.forEachRow(function(rowId) {
    			var reqstDe = gf_DhxGetValue(dhxGridMpscal012, rowId, 'reqstDe', 'grid');
    			if (!gf_IsNull(reqstDe)){
    				dhxGridMpscal012.cells(rowId,7).setDisabled(true);
    				dhxGridMpscal012.cells(rowId,8).setDisabled(true);
    				dhxGridMpscal012.cells(rowId,9).setDisabled(true);
    				dhxGridMpscal012.cells(rowId,14).setDisabled(true);
    			}
    	    });
            
            if(save_Row_Ids_Mpscal012 == 0 && save_All_Sta_Mpscal012 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpscal012.selectRow(0); 
            } else if(save_Row_Sta_Mpscal012 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpscal012.selectRow(0);
            } else if(save_All_Sta_Mpscal012 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpscal012.selectRow(save_Row_Num_Mpscal012); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpscal012.selectRow(save_Row_Num_Mpscal012);   //개발자 수정 필요  
                //var findCell = dhxGridMpscal012.findCell(save_Row_Ids_Mpscal012, gf_GetDhxGridColumId(dhxGridMpscal012,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpscal012.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpscal012.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpscal012');
        }
        $("#spanCntSearchFormMpscal012").text(data.data.records.length);
        cf_SetEventListenerMpscal012();
    } 
};
var fn_DhxDataProcessorMpscal012 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpscal012 = new dataProcessor(gv_ContextPath+'/mpscal012/saveMpscal012'); //lock feed url
    dhxDataProcessorMpscal012.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscal012.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscal012.init(dhxGridMpscal012); //link dataprocessor to the grid
    dhxDataProcessorMpscal012.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscal012.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscal012.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpscal012();
                    $("#checkAllMpscal012").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 추가(신규) 
 */
var fn_AddMpscal012 = function() {
    dhxGridMpscal012.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //reqstNo
    initValueArr.push(''); //empno
    initValueArr.push(''); //occrrncYy
    initValueArr.push(''); //qu
    initValueArr.push(''); //chldrnNm
    initValueArr.push(''); //schulNm
    initValueArr.push(''); //grade
    initValueArr.push(''); //tutfeeAmt
    initValueArr.push(''); //operSportAmt
    initValueArr.push(''); //reqstDe
    initValueArr.push(''); //pymntDe
    initValueArr.push(''); //slipNo
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //elctsctDocNo
    initValueArr.push(''); //elctsctSttusCode
    initValueArr.push(''); //elctsctEmpno
    initValueArr.push(''); //rm
    initValueArr.push(''); //elctsctSeSn
    initValueArr.push(''); //pymntSn
    initValueArr.push(''); //applcYm
    dhxGridMpscal012.addRow(dhxGridMpscal012.uid(), initValueArr, 0);
    dhxGridMpscal012.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscal012');
    $('#btnPopEmpSearchMpscal012').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpscal012SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscal012, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscal012', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscal012', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscal012, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscal012.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscal012', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscal012', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal012, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscal012.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscal012', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscal012', 'sortColumId', '', 'text'); 
            dhxGridMpscal012.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscal012.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscal012', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscal012', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal012, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscal012 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpscal012 = 0; 
    save_Edt_Cnt_Mpscal012 = 0; 
    save_Del_Cnt_Mpscal012 = 0; 
    dhxGridMpscal012.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscal012.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscal012.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpscal012 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpscal012 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpscal012 += 1; 
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
        save_All_Sta_Mpscal012 = 0; 
        if(save_Add_Cnt_Mpscal012 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpscal012 + "건";
            save_All_Sta_Mpscal012 = 1; 
        } 
        if(save_Edt_Cnt_Mpscal012 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpscal012 + "건"; 
        } 
        if(save_Del_Cnt_Mpscal012 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpscal012 + "건"; 
            save_All_Sta_Mpscal012 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscal012(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscal012(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscal012 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscal012_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscal012_Send = function() {
    if(fn_GridValidation(dhxGridMpscal012, dhxDataProcessorMpscal012)) {
        dhxDataProcessorMpscal012.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscal012 = function() {
    var rowId = dhxGridMpscal012.getSelectedRowId();
    var state = dhxDataProcessorMpscal012.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMpscal012.getRowIndex(rowId);
        dhxGridMpscal012.deleteRow(rowId);
        dhxGridMpscal012.selectRow(rowNum);
    }
    else dhxDataProcessorMpscal012.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscal012 = function () {
    var titMpscal012 = '자녀학비보조금'; /* gf_LocaleTrans('default', 'titMpscal012') */
    var jsonParameter = {
        reqstNo : gf_FormGetValue('searchFormMpscal012', 'reqstNo', 'text'),
        empno : gf_FormGetValue('searchFormMpscal012', 'empno', 'text')
    };
    var header = [[
        //'신청번호' /* gf_LocaleTrans('default', 'titReqstNo') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        //'발생 년도' /* gf_LocaleTrans('default', 'titOccrrncYy') */,
        '분기' /* gf_LocaleTrans('default', 'titQu') */,
        '자녀 명' /* gf_LocaleTrans('default', 'titChldrnNm') */,
        '학교 명' /* gf_LocaleTrans('default', 'titSchulNm') */,
        '학년' /* gf_LocaleTrans('default', 'titGrade') */,
        '수업료 금액' /* gf_LocaleTrans('default', 'titTutfeeAmt') */,
        '운영 지원 금액' /* gf_LocaleTrans('default', 'titOperSportAmt') */,
        '신청일자' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '지급일자' /* gf_LocaleTrans('default', 'titPymntDe') */,
        //'회계전표를 유일하게 식별할 수 있는 번호를 기록하는 항목' /* gf_LocaleTrans('default', 'titSlipNo') */,
        //'첨부파일번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
//        '전자결재 문서 번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
//        '전자결재 상태 코드' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
//        '전자결재 사원번호' /* gf_LocaleTrans('default', 'titElctsctEmpno') */,
        '비고 항목' /* gf_LocaleTrans('default', 'titRm') */,
        //'전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        //'지급일자 순번' /* gf_LocaleTrans('default', 'titPymntSn') */,
        //'적용 년월' /* gf_LocaleTrans('default', 'titApplcYm')  reqstNo*/
        '승인 여부'
    ]];
    var dataId = [[  'empno', 'qu', 'chldrnNm', 'schulNm', 'grade', 'tutfeeAmt', 'operSportAmt', 'reqstDe', 'pymntDe', 'rm', 'confmSttusCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center','center' ]];
    var sheetNm = [[ titMpscal012 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscal012;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscal012/excelMpscal012', jsonParameter);
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
    $('#saveFormMpscal012 #reqstNoSaveFormMpscal012').parent().append(
    '<div class="error" id="reqstNoSaveFormMpscal012-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal012 #empnoSaveFormMpscal012').parent().append(
    '<div class="error" id="empnoSaveFormMpscal012-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscal012 = function(reqstNo, empno){
    if(!gf_IsNull(reqstNo) && !gf_IsNull(empno)) {
        var jsonParameter = {
            reqstNo : reqstNo,
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mpscal012/findMpscal012', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.reqstNo) && gf_IsNull(data.empno)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
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
    var checkReqstNo;
    var checkEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpscal012 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpscal012 = 0;
        save_Row_Ids_Mpscal012 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpscal012 = rowNum;
        save_Row_Ids_Mpscal012 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpscal012 = rowNum;
        save_Row_Ids_Mpscal012 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'reqstNo', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reqstNo');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkReqstNo = gf_DhxGetValue(dhxGridObjet, rowId, 'reqstNo', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkReqstNo, checkEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var reqstNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'reqstNo', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((reqstNo == checkReqstNo) && (empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reqstNo');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscal012( checkReqstNo, checkEmpno )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reqstNo');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
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
        dhxGridMpscal012.selectRowById(validFalseFistRowId);
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
var fn_CallbackPopComp = function(data) {
	if(!gf_IsNull(data.pymntDe)) {
		gf_FormSetValue('searchFormMpscal012', 'pymntDe', data.pymntDe, 'text');
		gf_FormSetValue('searchFormMpscal012', 'salarytyCodeNm', data.salarytyCodeNm, 'text');
		gf_FormSetValue('searchFormMpscal012', 'pymntSn', data.pymntSn, 'hidden');
		gf_FormSetValue('searchFormMpscal012', 'pymntDtls', data.pymntDtls, 'text');
		gf_FormSetValue('searchFormMpscal012', 'closAt', data.closAt, 'text');
		gf_FormSetValue('searchFormMpscal012', 'applcYm', data.applcYm, 'text');

		// 체크된 항목을 가져온다
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal012, 'chk');
//		dhxGridMpscal012.forEachRow(function(rowId) {
//			console.log(rowId)
//			gf_DhxGetValue(dhxGridMpscal012, rowId, 'pymntDe',  'grid');
//			
//		});
		// 체크된 항목 반복문
		$(rowIds).each(function(index, rowId){
			// 선택된 값마다 해당 지급일자 Set 해준다.
			dhxGridMpscal012.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal012, 'pymntDe')).setValue(data.pymntDe);
			dhxGridMpscal012.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal012, 'pymntSn')).setValue(data.pymntSn);
			dhxGridMpscal012.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal012, 'applcYm')).setValue(data.applcYm);
			// Set이 된 이후 그리드 업데이트 실행 해준다.
			dhxDataProcessorMpscal012.setUpdated(rowId, true, 'updated');
			//dhxGridMpscal012.cells(dhxGridMpscal012.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal012, 'pymntDe')).setValue(data.pymntDe);
		});
		
	}
};
//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMpscal012', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMpscal012', 'deptCodeNm', 'text');
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : gBplcCode
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}
function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
  if(!gf_IsNull(data.data.records) && totCnt == 1){
  	//단건
  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMpscal012', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMpscal012', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMpscal012","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpscal012', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpscal012', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMpscal012', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal012', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMpscal012', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal012', 'korNm', 'text');
	}
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : gBplcCode
	};
	gf_Transaction(gubun, 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}
function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	  	if(strSvcID == "1"){
	 		gf_FormSetValue('searchFormMpscal012', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal012', 'korNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMpscal012', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal012', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMpscal012', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMpscal012', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMpscal012","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMpscal012","empno","korNm", gBplcCode, "Y");
	  	}
  	}
	
}
