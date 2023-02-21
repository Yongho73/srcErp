/**
 *    프로그램       : 연차수당관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.19
 *    사용테이블      : MHS_WRYC_DAYCNT
 * sourceGen version : 2020.06.29.01 (2020.08.19)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpscal023 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpscal023 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpscal023 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpscal023 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpscal023 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpscal023 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpscal023 = 0;  //그리드 삭제 수량 

var pymntDeGubun = "Search";  //지급일자선택구분_검색
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscal023();
    cf_SetComponentsMpscal023();
    cf_SetEventListenerMpscal023();
    cf_InitFormMpscal023();
    cf_SetBindingMpscal023();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscal023 = function() {
    gf_SetMenuPath();
    $("#saveFormMpscal023").validate({ errorElement: 'div', ignore: '' });
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    gf_ComboCode('divComboSearchJssfcCode', 'searchJssfcCode', 'searchJssfcCode', 'search', 'C148', '' , '', '', 'ordr', '','',''); //직종분류
};

var dhxGridMpscal023;
var cf_SetComponentsMpscal023 = function() {
    var dhxGridMpscal023HeaderInfo = [];
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscal023" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('해당년도', '0', 'left', 'str', 'ro', true, 'applcYy', '', '')); /* gf_LocaleTrans('default', 'titApplcYy') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('부서', '100', 'left', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('지급일자', '100', 'center', 'str', 'ro', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titTwyrbfWrycUseDaycnt') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('시작일', '100', 'center', 'str', 'ro', false, 'applcBeginDe', '', '')); /* gf_LocaleTrans('default', 'titApplcBeginDe') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('종료일', '100', 'center', 'str', 'ro', false, 'applcEndDe', '', '')); /* gf_LocaleTrans('default', 'titApplcEndDe') */    
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('연차일수', '80', 'right', 'int', 'ro', false, 'wrycDaycnt', '', '')); /* gf_LocaleTrans('default', 'titWrycDaycnt') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('사용일수', '80', 'right', 'int', 'ro', false, 'useDaycnt', '', '')); /* gf_LocaleTrans('default', 'titUseDaycnt') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('잔여일수', '80', 'right', 'int', 'ro', false, 'remainderDaycnt', '', '')); /* gf_LocaleTrans('default', 'titRemainderDaycnt') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('정산일수', '80', 'right', 'int', 'edn', false, 'excclcDaycnt', '', '')); /* gf_LocaleTrans('default', 'titExcclcDaycnt') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('통상임금', '100', 'right', 'int', 'edn', false, 'odysgAmt', '', '')); /* gf_LocaleTrans('default', 'titExcclcDaycnt') */        
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('일통상임금', '100', 'right', 'int', 'edn', false, 'dayOdysgAmt', '', '')); /* gf_LocaleTrans('default', 'titExcclcDaycnt') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('연차수당 금액', '100', 'right', 'int', 'edn', false, 'wrycAllwncAmt', '', '')); /* gf_LocaleTrans('default', 'titExcclcDaycnt') */    
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('가감 일수', '80', 'right', 'int', 'ro', false, 'adsbtrDaycnt', '', '')); /* gf_LocaleTrans('default', 'titAdsbtrDaycnt') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('가감 사유', '*', 'left', 'str', 'ro', false, 'adsbtrResn', '', '')); /* gf_LocaleTrans('default', 'titAdsbtrResn') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('1년전 사용일수', '100', 'right', 'int', 'ro', false, 'onyrbfWrycUseDaycnt', '', '')); /* gf_LocaleTrans('default', 'titOnyrbfWrycUseDaycnt') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('2년전 사용일수', '100', 'right', 'int', 'ro', false, 'twyrbfWrycUseDaycnt', '', '')); /* gf_LocaleTrans('default', 'titTwyrbfWrycUseDaycnt') */

    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '100', 'right', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titTwyrbfWrycUseDaycnt') */
    dhxGridMpscal023HeaderInfo.push(gf_MakeDhxGridHeader('지급순번', '100', 'right', 'str', 'ro', true, 'pymntSn', '', '')); /* gf_LocaleTrans('default', 'titTwyrbfWrycUseDaycnt') */


    dhxGridMpscal023 = gf_MakeDhxGrid('dataListMpscal023', dhxGridMpscal023HeaderInfo, true, false, false);
    dhxGridMpscal023.enableAutoWidth(false);
    dhxGridMpscal023.setEditable(true);
    
    dhxGridMpscal023.setNumberFormat("0,000", 13, ".", ",");
    dhxGridMpscal023.setNumberFormat("0,000", 14, ".", ",");
    dhxGridMpscal023.setNumberFormat("0,000", 15, ".", ",");
    
    

    dhxGridMpscal023.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    //dhxGridMpscal023.attachFooter(" , , , , ,  , , , ,,,,,,<div style='text-align:right;'>합계</div> ," +
    dhxGridMpscal023.attachFooter("<div style='text-align:right;'>합계</div>,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan," +
    		"<div style='text-align:right;'>{#stat_total}</div>",["text-align:right;"]);   // 컬럼 수량만큼 정의, 합계가 필요한 컬럼 부분에 <div>추가하고 ID 부여

};

var eventIdMpscal023 = [];
var cf_SetEventListenerMpscal023 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscal023 = gf_GridDetachEvent(dhxGridMpscal023, eventIdMpscal023);
    eventId = dhxGridMpscal023.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscal023();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscal023.getColumnsNum();
            var rowNum = dhxGridMpscal023.getRowsNum();
            var selectedId = dhxGridMpscal023.getSelectedRowId();
            var ind        = dhxGridMpscal023.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal023.getRowIndex(selectedId);
            var type       = dhxGridMpscal023.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscal023.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscal023.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscal023.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal023.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscal023.getSelectedRowId();
            var ind        = dhxGridMpscal023.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal023.getRowIndex(selectedId);
            var type       = dhxGridMpscal023.getColType(ind);
            dhxGridMpscal023.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal023.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscal023.getSelectedRowId();
            var ind        = dhxGridMpscal023.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal023.getRowIndex(selectedId);
            var type       = dhxGridMpscal023.getColType(ind);
            dhxGridMpscal023.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal023.editCell();
            }
        }
        else return true;
    });
    eventIdMpscal023.push(eventId);
    eventId = dhxGridMpscal023.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpscal023SortGridList(ind, type, direction); 
    });
    eventIdMpscal023.push(eventId);
    eventId = dhxGridMpscal023.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscal023.push(eventId);
    eventId = dhxGridMpscal023.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpscal023.push(eventId);
    eventId = dhxGridMpscal023.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
    	var dayOdysgAmt  = 0;
    	var excclcDaycnt =  0;
    	var wrycAllwncAmt = dhxGridMpscal023.cells(rId, 15).getValue(); //연차수당 금액
    	
    	//정산일수 변경시 연차수당 재계산     	
    	if(cInd == 12) {
    		excclcDaycnt   = parseInt(dhxGridMpscal023.cells(rId, 12).getValue()); //정산일수
    		dayOdysgAmt =  parseInt(dhxGridMpscal023.cells(rId, 14).getValue()); //일통상임
    		dayOdysgAmt = dayOdysgAmt * excclcDaycnt;
    		gf_DhxSetValue(dhxGridMpscal023, rId,"wrycAllwncAmt", '' + dayOdysgAmt, 'grid'); // 연차수당금액    		
    		if(wrycAllwncAmt != dayOdysgAmt)
    			gf_DhxSetValue(dhxGridMpscal023, rId,"chk", '1', 'grid'); // 연차수당금액
    	}
        return true;
    });
    eventIdMpscal023.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscal023').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscal023()
    });
    $('#btnSaveMpscal023').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpscal023();
    });
    $('#btnRemoveMpscal023').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscal023();
    });
    $('#btnExcelMpscal023').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscal023();
    });
   //조회
    $('#btnSearchMpscal023').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscal023('');
    });
    //연차수당 재계산
    $('#btnSearchMpscal023ReCalc').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscal023ReCalc('');
    });


    $('#btnResetMpscal023').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscal023();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpscal023').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscal023, $('#checkAllMpscal023').prop('checked'), 'chk');
    });
    $('#searchFormMpscal023 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpscal023').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    });
    $('#searchFormMpscal023 input[name="payGubun"]').unbind('click').bind('click',function() {    	
    	var val = $(this).val();    	
    	if(val =="payed") {
    		$("#liPaymentDe").show();
    	}
    	else {
    		$("#liPaymentDe").hide();
    		$("#pymntSnSaveFormMpscal023").val("");
    		$("#closAtSaveFormMpscal023").val("");
    		$("#applcYmSaveFormMpscal023").val("");
    		$("#pymntDeSaveFormMpscal023").val("");
    		$("#salarytyCodeNmSaveFormMpscal023").val("");
    		$("#pymntDtlsNmSaveFormMpscal023").val("");   		    		
    	}
    });
    
    $('#saveFormMpscal023').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //지급일자검색 팝업_조회
    $('#btnPymntDeSearch').unbind('click').bind('click', function(event){
    	gf_errorMsgClear();
    	pymntDeGubun = "Search"; //검색
    	gf_PymntDeClosAtPopup('','','','', gBplcCode, "N", "fn_CallbackPopComp");
    });

    //지급일자 선택
    $('#btnPaymentDeSelect').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        pymntDeGubun = "Select"; //지급일자 선택
        var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal023, 'chk');
        if(gf_IsNull(rowIds)){
    		gf_DivMsgAlert("연차수당을 지급할 사원을 선택하세요.");
    		return false;
        }
        var pymntDe;
    	// 체크된 항목을 가져온다
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal023, 'chk');
		$(rowIds).each(function(index, rowId){
    		// 그리드에 체크된 컬럼 값들을 체크 한다 
			pymntDe = gf_DhxGetValue(dhxGridMpscal023, rowId, 'pymntDe',  'grid');
			if(!gf_IsNull(pymntDe)){
				gf_DivMsgAlert("지급일자가 등록되어 있습니다.<br/> 확인해주세요.");
				return false;
			}
    	});        
        gf_PymntDeClosAtPopup('','','','', gBplcCode, "N", "fn_CallbackPopComp");
    	
    });

    
    
    // 사원, 부서 pop 이벤트 ===========================================================================================
       //사원 선택 검색
   	$('#searchFormMpscal023 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
   		gf_EmpPopup("searchFormMpscal023","empNmSearchFormMpscal023","empCodeNmSearchFormMpscal023", gBplcCode, "Y", "fn_CallbackSearchPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
       });
   	//사원 입력 후 Enter 이벤트
   	$('#empNmSearchFormMpscal023').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			$('#empCodeNmSearchFormMpscal023').focus();
   	    }
       });
   	$('#empCodeNmSearchFormMpscal023').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			fn_SearchEmpCode("1");
   	    }
       });
   	//사원 선택 Popup
       $('#searchFormMpscal023 #btnempnoSearchSearchFormMpscal023').unbind('click').bind('click', function(event){
   		gf_EmpPopup("searchFormMpscal023","empno","korNm", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
       });
       
       //부서 선택 Popup
   	$('#searchFormMpscal023 #btnDeptCodeSearchSearchFormMpscal023').unbind('click').bind('click', function(event){
   		gf_DeptPopup("searchFormMpscal023","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
       });
   	
   	//사원 입력 후 Enter 이벤트
   	$('#empno').unbind('keydown').bind('keydown',function(event) {   		
   		if (event.keyCode == 13)  {
   			//$('#empNm').focus();
   			fn_SearchEmpCode();
   	    } else if (event.keyCode != 13 && event.keyCode != 9) {
   	    	gf_FormSetValue('searchFormMpscal023', 'korNm', '', 'text');
   	    }
       });
   	$('#korNm').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			fn_SearchEmpCode();
   	    } else if (event.keyCode != 13 && event.keyCode != 9) {
   	    	gf_FormSetValue('searchFormMpscal023', 'empno', '', 'text');
   	    }
   		
       });
   	
   	//부서 입력 후 Enter 이벤트
   	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			//$('#empNm').focus();
   			fn_SearchMhsEmpDeptCode();
   	    } else if (event.keyCode != 13 && event.keyCode != 9) {
   	    	gf_FormSetValue('searchFormMpscal023', 'deptCodeNm', '', 'text');
   	    }
       });
   	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			//$('#empNm').focus();
   			fn_SearchMhsEmpDeptCode();
   	    } else if (event.keyCode != 13 && event.keyCode != 9) {
   	    	gf_FormSetValue('searchFormMpscal023', 'deptCode', '', 'text');
   	    }
       });
};

var cf_InitFormMpscal023 = function() {
    $('#searchFormMpscal023').resetForm();
    gf_DateYm("applcYySearchFormMpscal023"); //해당년도
    $("#pymntSnSaveFormMpscal023").val("");
	$("#closAtSaveFormMpscal023").val("");
	$("#applcYmSaveFormMpscal023").val("");
	$("#pymntDeSaveFormMpscal023").val("");
	$("#salarytyCodeNmSaveFormMpscal023").val("");
	$("#pymntDtlsNmSaveFormMpscal023").val("");
    $("#liPaymentDe").hide();
};

var cf_SetBindingMpscal023 = function() {
    fn_SearchMpscal023('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscal023 = function(userId) {
    var jsonParameter = {
        applcYy : gf_FormGetValue('searchFormMpscal023', 'applcYy', 'text').substr(0,4),
        applcYm : gf_FormGetValue('searchFormMpscal023', 'applcYy', 'text'),
        empno : gf_FormGetValue('searchFormMpscal023', 'empno', 'text'),
        deptCode : gf_FormGetValue('searchFormMpscal023', 'deptCode', 'text'),
        jssfcCode : gf_FormGetValue('searchFormMpscal023', 'searchJssfcCode', 'combo'),
        payApplcYm : gf_FormGetValue('searchFormMpscal023', 'applcYm', 'text').replaceAll('-',''),
        pymntSn : gf_FormGetValue('searchFormMpscal023', 'pymntSn', 'text'),
        payGubun :gf_FormGetValue('searchFormMpscal023', 'payGubun', 'radio')
    };
    gf_Transaction(userId, 'mpscal023/searchMpscal023', jsonParameter, 'fn_CallbackSearchMpscal023', false, 'GET');
};
/**
 * 연차수당 재계산
 */
var fn_SearchMpscal023ReCalc = function(userId) {
	
	var applcYm = gf_FormGetValue('searchFormMpscal023', 'applcYy', 'text');
	var msg = "기준년월 : [ " + applcYm +  " ]  <br>연차수당 재계산을 하시겠습니까?";
	var jsonParameter = {
	        applcYy    : gf_FormGetValue('searchFormMpscal023', 'applcYy', 'text').substr(0,4),
	        applcYm   : gf_FormGetValue('searchFormMpscal023', 'applcYy', 'text').replaceAll("-",''),
	        empno      : gf_FormGetValue('searchFormMpscal023', 'empno', 'text'),
	        deptCode : gf_FormGetValue('searchFormMpscal023', 'deptCode', 'text'),
	        jssfcCode : gf_FormGetValue('searchFormMpscal023', 'searchJssfcCode', 'combo'),
	        payGubun : gf_FormGetValue('searchFormMpscal023', 'payGubun', 'radio')
	    };	    	    
    gf_DivMsgConfirm2(msg, function(confirm){ 
	        if(confirm){ 
	            result = true;
	            gf_Transaction(userId, 'mpscal023/searchMpscal023ReCalc', jsonParameter, 'fn_CallbackSearchMpscal023', false, 'GET'); 
	        } 
	}); 
};


var dhxDataProcessorMpscal023;
var fn_CallbackSearchMpscal023 = function(strSvcID, targetID, data) {
    dhxGridMpscal023.clearAll();
    
    $(".ftr").show();  //합계 보여주기
    
    fn_DhxDataProcessorMpscal023(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscal023');
        dhxGridMpscal023.parse(data.data.records, 'js');
 
        if(save_Row_Ids_Mpscal023 == 0 && save_All_Sta_Mpscal023 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscal023.selectRow(0); 
        } else if(save_Row_Sta_Mpscal023 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpscal023.selectRow(0);
        } else if(save_All_Sta_Mpscal023 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpscal023.selectRow(save_Row_Num_Mpscal023); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpscal023.selectRow(save_Row_Num_Mpscal023);   //개발자 수정 필요  
            //var findCell = dhxGridMpscal023.findCell(save_Row_Ids_Mpscal023, gf_GetDhxGridColumId(dhxGridMpscal023,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscal023.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscal023.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscal023');
        //dhxGridMpscal023.attachFooter("");
        $(".ftr").hide();          //합계 숨기기
    }
    $("#spanCntSearchFormMpscal023").text(data.data.records.length);
    cf_SetEventListenerMpscal023();
};

var fn_DhxDataProcessorMpscal023 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpscal023 = new dataProcessor(gv_ContextPath+'/mpscal023/saveMpscal023'); //lock feed url
    dhxDataProcessorMpscal023.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscal023.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscal023.init(dhxGridMpscal023); //link dataprocessor to the grid
    dhxDataProcessorMpscal023.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscal023.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscal023.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpscal023();
                    $("#checkAllMpscal023").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMpscal023 = function() {
    dhxGridMpscal023.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //applcYy
    initValueArr.push(''); //empno
    initValueArr.push(''); //applcBeginDe
    initValueArr.push(''); //applcEndDe
    initValueArr.push(''); //wrycDaycnt
    initValueArr.push(''); //useDaycnt
    initValueArr.push(''); //remainderDaycnt
    initValueArr.push(''); //recmndDaycnt
    initValueArr.push(''); //excclcDaycnt
    initValueArr.push(''); //nwmbOccrrncDaycnt
    initValueArr.push(''); //nwmbUseDaycnt
    initValueArr.push(''); //nwmbRemainderDaycnt
    initValueArr.push(''); //nwmbExcclcDaycnt
    initValueArr.push(''); //adsbtrDaycnt
    initValueArr.push(''); //adsbtrResn
    initValueArr.push(''); //cnwkYcnt
    initValueArr.push(''); //cnwkMcnt
    initValueArr.push(''); //cnwkDcnt
    initValueArr.push(''); //onyrbfWrycUseDaycnt
    initValueArr.push(''); //twyrbfWrycUseDaycnt
    dhxGridMpscal023.addRow(dhxGridMpscal023.uid(), initValueArr, 0);
    dhxGridMpscal023.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscal023');
    $('#btnPopEmpSearchMpscal023').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpscal023SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscal023, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscal023', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscal023', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscal023, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscal023.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscal023', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscal023', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal023, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscal023.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscal023', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscal023', 'sortColumId', '', 'text'); 
            dhxGridMpscal023.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscal023.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscal023', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscal023', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal023, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscal023 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpscal023 = 0; 
    save_Edt_Cnt_Mpscal023 = 0; 
    save_Del_Cnt_Mpscal023 = 0; 
    dhxGridMpscal023.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscal023.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscal023.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpscal023 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpscal023 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpscal023 += 1; 
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
        save_All_Sta_Mpscal023 = 0; 
        if(save_Add_Cnt_Mpscal023 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpscal023 + "건";
            save_All_Sta_Mpscal023 = 1; 
        } 
        if(save_Edt_Cnt_Mpscal023 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpscal023 + "건"; 
        } 
        if(save_Del_Cnt_Mpscal023 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpscal023 + "건"; 
            save_All_Sta_Mpscal023 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscal023(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscal023(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscal023 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscal023_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscal023_Send = function() {
    if(fn_GridValidation(dhxGridMpscal023, dhxDataProcessorMpscal023)) {
        dhxDataProcessorMpscal023.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscal023 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal023, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscal023.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscal023.getState(rowId);
            if(dhxGridMpscal023.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal023, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscal023.getRowIndex(rowId);
                    dhxGridMpscal023.deleteRow(rowId);
                    dhxGridMpscal023.selectRow(rowNum);
                }
                else dhxDataProcessorMpscal023.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscal023 = function () {
    var titMpscal023 = '연차수당관리'; /* gf_LocaleTrans('default', 'titMpscal023') */
    var jsonParameter = {
        applcYy : gf_FormGetValue('searchFormMpscal023', 'applcYy', 'text'),
        empno : gf_FormGetValue('searchFormMpscal023', 'empno', 'text')
    };
    var header = [
    [
    //    '해당년도' /* gf_LocaleTrans('default', 'titApplcYy') */,
        '해당년도' /* gf_LocaleTrans('default', 'titEmpno') */,
        '연차적용시작일' /* gf_LocaleTrans('default', 'titApplcBeginDe') */,
        '연차적용시작일' /* gf_LocaleTrans('default', 'titApplcEndDe') */,
        '연차적용시작일' /* gf_LocaleTrans('default', 'titRemainderDaycnt') */,
        '연차적용시작일' /* gf_LocaleTrans('default', 'titRemainderDaycnt') */,
        '연차적용시작일' /* gf_LocaleTrans('default', 'titRemainderDaycnt') */,
        '연차적용시작일' /* gf_LocaleTrans('default', 'titRemainderDaycnt') */,
        '권장일수' /* gf_LocaleTrans('default', 'titRecmndDaycnt') */,
        '정산일수' /* gf_LocaleTrans('default', 'titExcclcDaycnt') */,
        '신입발생일수' /* gf_LocaleTrans('default', 'titNwmbOccrrncDaycnt') */,
        '신입사용일수' /* gf_LocaleTrans('default', 'titNwmbUseDaycnt') */,
        '신입잔여일수' /* gf_LocaleTrans('default', 'titNwmbRemainderDaycnt') */,
        '신입정산일수' /* gf_LocaleTrans('default', 'titNwmbExcclcDaycnt') */,
        '가감 일수' /* gf_LocaleTrans('default', 'titAdsbtrDaycnt') */,
        '가감 사유' /* gf_LocaleTrans('default', 'titAdsbtrResn') */,
        '근속 년수' /* gf_LocaleTrans('default', 'titCnwkYcnt') */,
        '근속 월수' /* gf_LocaleTrans('default', 'titCnwkMcnt') */,
        '근속 일수' /* gf_LocaleTrans('default', 'titCnwkDcnt') */,
        '1년전 연차 사용일수' /* gf_LocaleTrans('default', 'titOnyrbfWrycUseDaycnt') */,
        '2년전 연차 사용일수' /* gf_LocaleTrans('default', 'titTwyrbfWrycUseDaycnt') */
    ],
    [
        //   '해당년도' /* gf_LocaleTrans('default', 'titApplcYy') */,
           '해당년도' /* gf_LocaleTrans('default', 'titEmpno') */,
           '연차적용시작일3' /* gf_LocaleTrans('default', 'titApplcBeginDe') */,
           '연차적용시작일3' /* gf_LocaleTrans('default', 'titApplcEndDe') */,
           '연차적용시작일4' /* gf_LocaleTrans('default', 'titApplcEndDe') */,
           '연차적용시작일4' /* gf_LocaleTrans('default', 'titRemainderDaycnt') */,
           '연차적용시작일5' /* gf_LocaleTrans('default', 'titRemainderDaycnt') */,
           '연차적용시작일5' /* gf_LocaleTrans('default', 'titRemainderDaycnt') */,
           '권장일수' /* gf_LocaleTrans('default', 'titRecmndDaycnt') */,
           '정산일수' /* gf_LocaleTrans('default', 'titExcclcDaycnt') */,
           '신입발생일수' /* gf_LocaleTrans('default', 'titNwmbOccrrncDaycnt') */,
           '신입사용일수' /* gf_LocaleTrans('default', 'titNwmbUseDaycnt') */,
           '신입잔여일수' /* gf_LocaleTrans('default', 'titNwmbRemainderDaycnt') */,
           '신입정산일수' /* gf_LocaleTrans('default', 'titNwmbExcclcDaycnt') */,
           '가감 일수' /* gf_LocaleTrans('default', 'titAdsbtrDaycnt') */,
           '가감 사유' /* gf_LocaleTrans('default', 'titAdsbtrResn') */,
           '근속 년수' /* gf_LocaleTrans('default', 'titCnwkYcnt') */,
           '근속 월수' /* gf_LocaleTrans('default', 'titCnwkMcnt') */,
           '근속 일수' /* gf_LocaleTrans('default', 'titCnwkDcnt') */,
           '1년전 연차 사용일수' /* gf_LocaleTrans('default', 'titOnyrbfWrycUseDaycnt') */,
           '2년전 연차 사용일수' /* gf_LocaleTrans('default', 'titTwyrbfWrycUseDaycnt') */
       ],
    [
        //    '해당년도' /* gf_LocaleTrans('default', 'titApplcYy') */,
            '해당년도' /* gf_LocaleTrans('default', 'titEmpno') */,
            '남' /* gf_LocaleTrans('default', 'titApplcBeginDe') */,
            '여' /* gf_LocaleTrans('default', 'titApplcEndDe') */,
            '남' /* gf_LocaleTrans('default', 'titRemainderDaycnt') */,
            '여' /* gf_LocaleTrans('default', 'titRemainderDaycnt') */,
            '남' /* gf_LocaleTrans('default', 'titApplcBeginDe') */,
            '여' /* gf_LocaleTrans('default', 'titApplcEndDe') */,
            '권장일수' /* gf_LocaleTrans('default', 'titRecmndDaycnt') */,
            '정산일수' /* gf_LocaleTrans('default', 'titExcclcDaycnt') */,
            '신입발생일수' /* gf_LocaleTrans('default', 'titNwmbOccrrncDaycnt') */,
            '신입사용일수' /* gf_LocaleTrans('default', 'titNwmbUseDaycnt') */,
            '신입잔여일수' /* gf_LocaleTrans('default', 'titNwmbRemainderDaycnt') */,
            '신입정산일수' /* gf_LocaleTrans('default', 'titNwmbExcclcDaycnt') */,
            '가감 일수' /* gf_LocaleTrans('default', 'titAdsbtrDaycnt') */,
            '가감 사유' /* gf_LocaleTrans('default', 'titAdsbtrResn') */,
            '근속 년수' /* gf_LocaleTrans('default', 'titCnwkYcnt') */,
            '근속 월수' /* gf_LocaleTrans('default', 'titCnwkMcnt') */,
            '근속 일수' /* gf_LocaleTrans('default', 'titCnwkDcnt') */,
            '1년전 연차 사용일수' /* gf_LocaleTrans('default', 'titOnyrbfWrycUseDaycnt') */,
            '2년전 연차 사용일수' /* gf_LocaleTrans('default', 'titTwyrbfWrycUseDaycnt') */
        ]
    ];
    var dataId = [[ 'applcYy', 'empno', 'applcBeginDe', 'applcEndDe', 'wrycDaycnt', 'useDaycnt', 'remainderDaycnt', 'recmndDaycnt', 'excclcDaycnt', 'nwmbOccrrncDaycnt', 'nwmbUseDaycnt', 'nwmbRemainderDaycnt', 'nwmbExcclcDaycnt', 'adsbtrDaycnt', 'adsbtrResn', 'cnwkYcnt', 'cnwkMcnt', 'cnwkDcnt', 'onyrbfWrycUseDaycnt', 'twyrbfWrycUseDaycnt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpscal023 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscal023;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscal023/excelMpscal023', jsonParameter);
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
    $('#saveFormMpscal023 #applcYySaveFormMpscal023').parent().append(
    '<div class="error" id="applcYySaveFormMpscal023-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal023 #empnoSaveFormMpscal023').parent().append(
    '<div class="error" id="empnoSaveFormMpscal023-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscal023 = function(applcYy, empno){
    if(!gf_IsNull(applcYy) && !gf_IsNull(empno)) {
        var jsonParameter = {
            applcYy : applcYy,
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mpscal023/findMpscal023', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYy) && gf_IsNull(data.empno)) {
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
    var checkApplcYy;
    var checkEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpscal023 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpscal023 = 0;
        save_Row_Ids_Mpscal023 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpscal023 = rowNum;
        save_Row_Ids_Mpscal023 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpscal023 = rowNum;
        save_Row_Ids_Mpscal023 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'applcYy', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYy');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkApplcYy = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYy', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkApplcYy, checkEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcYy = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYy', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((applcYy == checkApplcYy) && (empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYy');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscal023( checkApplcYy, checkEmpno )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYy');
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
        dhxGridMpscal023.selectRowById(validFalseFistRowId);
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

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpscal023', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpscal023', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMpscal023', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal023', 'korNm', 'text');
	}
	else if(gubun == "2"){
		empno = gf_FormGetValue('searchFormMpscal023', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal023', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMpscal023', 'agentEmpno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal023', 'agentEmpNm', 'text');
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
	 		gf_FormSetValue('searchFormMpscal023', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal023', 'empCodeNm', data.korNm, 'text');
	  	}
	  	else if(strSvcID == "2"){
	  		gf_FormSetValue('searchFormMpscal023', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal023', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMpscal023', 'deptCodeNm', data.deptCodeNm, 'text');
	  	}
	  	else {
	 		gf_FormSetValue('searchFormMpscal023', 'agentEmpno', data.empno, 'hidden');
	 		gf_FormSetValue('searchFormMpscal023', 'agentEmpNm', data.korNm, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMpscal023","empNo","empCodeNm", gBplcCode, "Y");
	  	}
	  	else if(strSvcID == "2"){
	  		gf_EmpPopup("searchFormMpscal023","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMpscal023","agentEmpno","agentEmpNm", gBplcCode, "Y");
	  	}
  	}
	
}


var fn_CallbackPopComp = function(data) {
	if(!gf_IsNull(data.pymntDe)) {
		//검색인 경우 
		if(pymntDeGubun=="Search"){	
		  gf_FormSetValue('searchFormMpscal023', 'pymntDe', data.pymntDe, 'text');
		  gf_FormSetValue('searchFormMpscal023', 'salarytyCodeNm', data.salarytyCodeNm, 'text');
		  gf_FormSetValue('searchFormMpscal023', 'pymntSn', data.pymntSn, 'hidden');
		  gf_FormSetValue('searchFormMpscal023', 'pymntDtls', data.pymntDtls, 'text');
		  gf_FormSetValue('searchFormMpscal023', 'closAt', data.closAt, 'text');
		  gf_FormSetValue('searchFormMpscal023', 'applcYm', data.applcYm, 'text');
	    }
		else {
			// 체크된 항목을 가져온다
			var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal023, 'chk');
			// 체크된 항목 반복문
			$(rowIds).each(function(index, rowId){
				// 선택된 값마다 해당 지급일자 Set 해준다.
				dhxGridMpscal023.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal023, 'pymntDe')).setValue( fn_DateToStr(data.pymntDe) );
				dhxGridMpscal023.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal023, 'pymntSn')).setValue( data.pymntSn );
				dhxGridMpscal023.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal023, 'applcYm')).setValue( data.applcYm );
				// Set이 된 이후 그리드 업데이트 실행 해준다.
				dhxDataProcessorMpscal023.setUpdated(rowId, true, 'updated');
				//dhxGridMpscal012.cells(dhxGridMpscal012.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal012, 'pymntDe')).setValue(data.pymntDe);
			});
		}
		
	}
};
//날짜를 yyyy-mm-dd타입으로 변경
var fn_DateToStr = function(data) {
	var retStr = data;
	if(data.length==8) {
		retStr = data.substr(0,4) + "-" + data.substr(4,2) + "-" +data.substr(6,2); 
	}
	return retStr;
};
