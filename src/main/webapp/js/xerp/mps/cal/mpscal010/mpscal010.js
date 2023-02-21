/**
 *    프로그램       : 초과근무수당 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.18
 *    사용테이블      : MPS_OVTIME_ALLWNC
 * sourceGen version : 2020.06.29.01 (2020.08.18)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpscal010 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpscal010 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpscal010 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpscal010 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpscal010 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpscal010 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpscal010 = 0;  //그리드 삭제 수량
var pymntDeGubun = "Search";  //지급일자선택구분_검색
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscal010();
    cf_SetComponentsMpscal010();
    cf_SetEventListenerMpscal010();
    cf_InitFormMpscal010();
    cf_SetBindingMpscal010();    
});

/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscal010 = function() {
    gf_SetMenuPath();
    $("#saveFormMpscal010").validate({ errorElement: 'div', ignore: '' });
   
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    gf_ComboCode('divComboSearchJssfcCode', 'searchJssfcCode', 'searchJssfcCode', 'search', 'C148', '' , '', '', 'ordr', '','',''); //직종분류
};

var dhxGridMpscal010;
var cf_SetComponentsMpscal010 = function() {
    var dhxGridMpscal010HeaderInfo = [];
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscal010" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('부서', '100', 'left', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('근무년월', '80', 'left', 'str', 'ro', true, 'workYm', '', '')); /* gf_LocaleTrans('default', 'titWorkYm') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */    
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('직급', '80', 'center', 'str', 'ro', false, 'clsfNm', '', '')); /* gf_LocaleTrans('default', 'titClsfCode') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('지급 일자', '80', 'center', 'str', 'ro', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titOvtimeTotAmt') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('통상임금', '100', 'right', 'int', 'edn', false, 'odysgAmt', '', '')); /* gf_LocaleTrans('default', 'titClsfCode') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('생활임금\n보전수당', '100', 'right', 'int', 'edn', false, 'lvwageAmt', '', '')); /* gf_LocaleTrans('default', 'titClsfCode') */
    
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('시간', '60', 'right', 'int', 'ro', false, 'ovtimeworkTime', '', '')); /* gf_LocaleTrans('default', 'titOvtimeworkTime') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '60', 'right', 'int', 'ro', false, 'hvofWorkTime', '', '')); /* gf_LocaleTrans('default', 'titHvofWorkTime') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '60', 'right', 'int', 'ro', false, 'nightWorkTime', '', '')); /* gf_LocaleTrans('default', 'titNightWorkTime') */    
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('시간외 수당', '100', 'right', 'int', 'edn', false, 'ovtimeworkAllwnc', '', '')); /* gf_LocaleTrans('default', 'titOvtimeworkAllwnc') */       
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'edn', false, 'hvofAllwnc', '', '')); /* gf_LocaleTrans('default', 'titHvofAllwnc') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'edn', false, 'nightWorkAllwnc', '', '')); /* gf_LocaleTrans('default', 'titLvwageOvtimeworkAllwnc') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '*', 'right', 'int', 'edn', false, 'ovtimeTotAmt', '', '')); /* gf_LocaleTrans('default', 'titOvtimeTotAmt') */
    
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('생활보전(시간외)', '100', 'right', 'int', 'edn', false, 'lvwageOvtimeworkAllwnc', '', '')); /* gf_LocaleTrans('default', 'titNightWorkAllwnc') */    
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'edn', false, 'lvwageHvofAllwnc', '', '')); /* gf_LocaleTrans('default', 'titLvwageHvofAllwnc') */    
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'edn', false, 'lvwageNightWorkAllwnc', '', '')); /* gf_LocaleTrans('default', 'titLvwageNightWorkAllwnc') */
    //dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('대체휴무<br>일수', '60', 'right', 'int', 'ro', false, 'altHvofdayCo', '', '')); /* gf_LocaleTrans('default', 'titAltHvofdayCo') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '*', 'right', 'int', 'edn', false, 'lvwageOvtimeTotAmt', '', '')); /* gf_LocaleTrans('default', 'titOvtimeTotAmt') */
    
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('적용 년월', '100', 'left', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
    dhxGridMpscal010HeaderInfo.push(gf_MakeDhxGridHeader('지급 순번', '100', 'right', 'int', 'ro', true, 'pymntSn', '', '')); /* gf_LocaleTrans('default', 'titPymntSn') */
    
	
    var attachHeaderArr = [];
	attachHeaderArr.push(["#rspan","#rspan",  "#rspan","#rspan", "#rspan", "#rspan", "#rspan", "#rspan", "#rspan","#rspan",
		                  "초과", "휴일", "야간",  
		                  "초과", "휴일", "야간", '총금액',
		                  "초과", "휴일", "야간", '총금액',
						   "#rspan", "#rspan"]);
     
    //dhxGridStmmng010 = gf_MakeDhxGrid('dataListStmmng010', dhxGridStmmng010HeaderInfo, false, true, false, attachHeaderArr);
    
    dhxGridMpscal010 = gf_MakeDhxGrid('dataListMpscal010', dhxGridMpscal010HeaderInfo, false, true, false, attachHeaderArr);
    dhxGridMpscal010.enableAutoWidth(false);
    dhxGridMpscal010.setEditable(true);
    
    
    dhxGridMpscal010.setNumberFormat("0,000", 8, ".", ",");
    dhxGridMpscal010.setNumberFormat("0,000", 9, ".", ",");
    
    dhxGridMpscal010.setNumberFormat("0,000", 13, ".", ",");
    dhxGridMpscal010.setNumberFormat("0,000", 14, ".", ",");
    dhxGridMpscal010.setNumberFormat("0,000", 15, ".", ",");    
    dhxGridMpscal010.setNumberFormat("0,000", 16, ".", ",");
    dhxGridMpscal010.setNumberFormat("0,000", 17, ".", ",");
    dhxGridMpscal010.setNumberFormat("0,000", 18, ".", ",");
    dhxGridMpscal010.setNumberFormat("0,000", 19, ".", ",");
    dhxGridMpscal010.setNumberFormat("0,000", 20, ".", ",");
    dhxGridMpscal010.setNumberFormat("0,000", 21, ".", ",");


    dhxGridMpscal010.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    //dhxGridMpscal010.attachFooter("#stat_total,,#stat_total,#stat_total");

    dhxGridMpscal010.attachFooter("<div style='text-align:right;'>합계</div>,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan," +
    		"<div style='text-align:right;'>{#stat_total}</div>,<div style='text-align:right;'>{#stat_total}</div>," +
    		"<div style='text-align:right;'>{#stat_total}시간</div>,<div style='text-align:right;'>{#stat_total}시간</div>," +
    		"<div style='text-align:right;'>{#stat_total}시간</div>,<div style='text-align:right;'>{#stat_total}</div>," +
    		"<div style='text-align:right;'>{#stat_total}</div>,<div style='text-align:right;'>{#stat_total}</div>," +
    		"<div style='text-align:right;'>{#stat_total}</div>,<div style='text-align:right;'>{#stat_total}</div>," +
    		"<div style='text-align:right;'>{#stat_total}</div>,<div style='text-align:right;'>{#stat_total}</div>," + 
    		"<div style='text-align:right;'>{#stat_total}</div>",["text-align:right;"]);   // 컬럼 수량만큼 정의, 합계가 필요한 컬럼 부분에 <div>추가하고 ID 부여
};

var eventIdMpscal010 = [];
var cf_SetEventListenerMpscal010 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscal010 = gf_GridDetachEvent(dhxGridMpscal010, eventIdMpscal010);
    eventId = dhxGridMpscal010.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscal010();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscal010.getColumnsNum();
            var rowNum = dhxGridMpscal010.getRowsNum();
            var selectedId = dhxGridMpscal010.getSelectedRowId();
            var ind        = dhxGridMpscal010.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal010.getRowIndex(selectedId);
            var type       = dhxGridMpscal010.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscal010.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscal010.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscal010.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal010.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscal010.getSelectedRowId();
            var ind        = dhxGridMpscal010.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal010.getRowIndex(selectedId);
            var type       = dhxGridMpscal010.getColType(ind);
            dhxGridMpscal010.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal010.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscal010.getSelectedRowId();
            var ind        = dhxGridMpscal010.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal010.getRowIndex(selectedId);
            var type       = dhxGridMpscal010.getColType(ind);
            dhxGridMpscal010.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal010.editCell();
            }
        }
        else return true;
    });
    eventIdMpscal010.push(eventId);
    eventId = dhxGridMpscal010.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpscal010SortGridList(ind, type, direction); 
    });
    eventIdMpscal010.push(eventId);
    eventId = dhxGridMpscal010.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscal010.push(eventId);
    eventId = dhxGridMpscal010.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpscal010.push(eventId);
    eventId = dhxGridMpscal010.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscal010.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscal010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscal010()
    });
    $('#btnSaveMpscal010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpscal010();
    });
    $('#btnRemoveMpscal010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscal010();
    });
    $('#btnExcelMpscal010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscal010();
    });
    //조회
    $('#btnSearchMpscal010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscal010('');
    });
    //초과근무수당 재계산
    $('#btnSearchMpscal010ReCalc').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscal010ReCalc('');
    });

    $('#btnResetMpscal010').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscal010();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpscal010').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscal010, $('#checkAllMpscal010').prop('checked'), 'chk');
    });
    $('#searchFormMpscal010 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpscal010').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpscal010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //지급일자선택 팝업
    $('#btnPymntDeSearch').unbind('click').bind('click', function(event){
    	gf_PymntDeClosAtPopup('','','','', gBplcCode, "N", "fn_CallbackPopComp");
    	return;
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
    
    //지급일자 선택
    $('#btnPaymentDeSelect').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        pymntDeGubun = "Select"; //지급일자 선택
        var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal010, 'chk');
        if(gf_IsNull(rowIds)){
    		gf_DivMsgAlert("초과근무수당 지급할 사원을 선택하세요.");
    		return false;
        }
        var pymntDe;
    	// 체크된 항목을 가져온다
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal010, 'chk');
		$(rowIds).each(function(index, rowId){
    		// 그리드에 체크된 컬럼 값들을 체크 한다 
			pymntDe = gf_DhxGetValue(dhxGridMpscal010, rowId, 'pymntDe',  'grid');
			if(!gf_IsNull(pymntDe)){
				gf_DivMsgAlert("지급일자가 등록되어 있습니다.<br/> 확인해주세요.");
				return false;
			}
    	});        
        gf_PymntDeClosAtPopup('','','','', gBplcCode, "N", "fn_CallbackPopComp");
    	
    });
    
    
    // 사원, 부서 pop 이벤트 ===========================================================================================
       //사원 선택 검색
   	$('#searchFormMpscal010 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
   		gf_EmpPopup("searchFormMpscal010","empNmSearchFormMpscal010","empCodeNmSearchFormMpscal010", gBplcCode, "Y", "fn_CallbackSearchPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
       });
   	//사원 입력 후 Enter 이벤트
   	$('#empNmSearchFormMpscal010').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			$('#empCodeNmSearchFormMpscal010').focus();
   	    }
       });
   	$('#empCodeNmSearchFormMpscal010').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			fn_SearchEmpCode("1");
   	    }
       });
   	//사원 선택 Popup
       $('#searchFormMpscal010 #btnempnoSearchSearchFormMpscal010').unbind('click').bind('click', function(event){
   		gf_EmpPopup("searchFormMpscal010","empno","korNm", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
       });
       
       //부서 선택 Popup
   	$('#searchFormMpscal010 #btnDeptCodeSearchSearchFormMpscal010').unbind('click').bind('click', function(event){
   		gf_DeptPopup("searchFormMpscal010","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
       });
   	
   	//사원 입력 후 Enter 이벤트
   	$('#empno').unbind('keydown').bind('keydown',function(event) {   		
   		if (event.keyCode == 13)  {
   			//$('#empNm').focus();
   			fn_SearchEmpCode();
   	    } else if (event.keyCode != 13 && event.keyCode != 9) {
   	    	gf_FormSetValue('searchFormMpscal010', 'korNm', '', 'text');
   	    }
       });
   	$('#korNm').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			fn_SearchEmpCode();
   	    } else if (event.keyCode != 13 && event.keyCode != 9) {
   	    	gf_FormSetValue('searchFormMpscal010', 'empno', '', 'text');
   	    }
   		
       });
   	
   	//부서 입력 후 Enter 이벤트
   	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			//$('#empNm').focus();
   			fn_SearchMhsEmpDeptCode();
   	    } else if (event.keyCode != 13 && event.keyCode != 9) {
   	    	gf_FormSetValue('searchFormMpscal010', 'deptCodeNm', '', 'text');
   	    }
       });
   	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			//$('#empNm').focus();
   			fn_SearchMhsEmpDeptCode();
   	    } else if (event.keyCode != 13 && event.keyCode != 9) {
   	    	gf_FormSetValue('searchFormMpscal010', 'deptCode', '', 'text');
   	    }
       });
    
    
};

var cf_InitFormMpscal010 = function() {
    $('#searchFormMpscal010').resetForm();
    gf_DateYm("workYmSearchFormMpscal010");
    $("#pymntSnSaveFormMpscal010").val("");
	$("#closAtSaveFormMpscal010").val("");
	$("#applcYmSaveFormMpscal010").val("");
	$("#pymntDeSaveFormMpscal010").val("");
	$("#salarytyCodeNmSaveFormMpscal010").val("");
	$("#pymntDtlsNmSaveFormMpscal010").val("");
};

var cf_SetBindingMpscal010 = function() {
    fn_SearchMpscal010('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscal010 = function(userId) {
		
    var jsonParameter = {
        workYm : gf_FormGetValue('searchFormMpscal010', 'workYm', 'text').replaceAll("-",""),
        empno : gf_FormGetValue('searchFormMpscal010', 'empno', 'text'),
        deptCode : gf_FormGetValue('searchFormMpscal010', 'deptCode', 'text'),
        jssfcCode : gf_FormGetValue('searchFormMpscal010', 'searchJssfcCode', 'combo'),
        applyYm : gf_FormGetValue('searchFormMpscal010', 'applyYm', 'text').replaceAll("-",""),
        pymntSn : gf_FormGetValue('searchFormMpscal010', 'pymntSn', 'text'),
    };
    gf_Transaction(userId, 'mpscal010/searchMpscal010', jsonParameter, 'fn_CallbackSearchMpscal010', false, 'GET');
};

/**
 * 초과근무수당 재계산
 */
var fn_SearchMpscal010ReCalc = function(userId) {
	
	var applcYm = gf_FormGetValue('searchFormMpscal010', 'workYm', 'text');
	var msg = "기준년월 : [ " + applcYm +  " ]  <br>초과근무수당 재계산을 하시겠습니까?";
	var jsonParameter = {	        
	        applcYm   : gf_FormGetValue('searchFormMpscal010', 'workYm', 'text').replaceAll("-",''),
	        empno      : ''
	    };	    	    
    gf_DivMsgConfirm2(msg, function(confirm){ 
	        if(confirm){ 
	            result = true;
	            gf_Transaction(userId, 'mpscal010/searchMpscal010ReCalc', jsonParameter, 'fn_CallbackSearchMpscal010ReCalc', false, 'GET'); 
	        } 
	}); 
};
var fn_CallbackSearchMpscal010ReCalc = function(strSvcID, targetID, data) {
	gf_DivMsgAlert("초과근무수당 계산이 완료되었습니다.");
	setTimeout(function(){    	fn_SearchMpscal010();     }, 1); //초과근무수당 재조회  
}


var dhxDataProcessorMpscal010;
var fn_CallbackSearchMpscal010 = function(strSvcID, targetID, data) {
    dhxGridMpscal010.clearAll();
    fn_DhxDataProcessorMpscal010(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscal010');
        dhxGridMpscal010.parse(data.data.records, 'js');
 
        if(save_Row_Ids_Mpscal010 == 0 && save_All_Sta_Mpscal010 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscal010.selectRow(0); 
        } else if(save_Row_Sta_Mpscal010 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpscal010.selectRow(0);
        } else if(save_All_Sta_Mpscal010 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpscal010.selectRow(save_Row_Num_Mpscal010); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpscal010.selectRow(save_Row_Num_Mpscal010);   //개발자 수정 필요  
            //var findCell = dhxGridMpscal010.findCell(save_Row_Ids_Mpscal010, gf_GetDhxGridColumId(dhxGridMpscal010,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscal010.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscal010.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscal010');
    }
    $("#spanCntSearchFormMpscal010").text(data.data.records.length);
    cf_SetEventListenerMpscal010();
};
var fn_DhxDataProcessorMpscal010 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpscal010 = new dataProcessor(gv_ContextPath+'/mpscal010/saveMpscal010'); //lock feed url
    dhxDataProcessorMpscal010.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscal010.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscal010.init(dhxGridMpscal010); //link dataprocessor to the grid
    dhxDataProcessorMpscal010.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscal010.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscal010.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpscal010();
                    $("#checkAllMpscal010").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMpscal010 = function() {
    dhxGridMpscal010.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //workYm
    initValueArr.push(''); //empno
    initValueArr.push(''); //deptCode
    initValueArr.push(''); //clsfCode
    initValueArr.push(''); //ovtimeworkTime
    initValueArr.push(''); //ovtimeworkAllwnc
    initValueArr.push(''); //lvwageOvtimeworkAllwnc
    initValueArr.push(''); //hvofWorkTime
    initValueArr.push(''); //hvofAllwnc
    initValueArr.push(''); //lvwageHvofAllwnc
    initValueArr.push(''); //nightWorkTime
    initValueArr.push(''); //nightWorkAllwnc
    initValueArr.push(''); //lvwageNightWorkAllwnc
    initValueArr.push(''); //altHvofdayCo
    initValueArr.push(''); //ovtimeTotAmt
    initValueArr.push(''); //applcYm
    initValueArr.push(''); //pymntSn
    dhxGridMpscal010.addRow(dhxGridMpscal010.uid(), initValueArr, 0);
    dhxGridMpscal010.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscal010');
    $('#btnPopEmpSearchMpscal010').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpscal010SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscal010, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscal010', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscal010', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscal010, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscal010.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscal010', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscal010', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal010, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscal010.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscal010', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscal010', 'sortColumId', '', 'text'); 
            dhxGridMpscal010.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscal010.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscal010', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscal010', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal010, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscal010 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpscal010 = 0; 
    save_Edt_Cnt_Mpscal010 = 0; 
    save_Del_Cnt_Mpscal010 = 0; 
    dhxGridMpscal010.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscal010.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscal010.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpscal010 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpscal010 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpscal010 += 1; 
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
        save_All_Sta_Mpscal010 = 0; 
        if(save_Add_Cnt_Mpscal010 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpscal010 + "건";
            save_All_Sta_Mpscal010 = 1; 
        } 
        if(save_Edt_Cnt_Mpscal010 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpscal010 + "건"; 
        } 
        if(save_Del_Cnt_Mpscal010 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpscal010 + "건"; 
            save_All_Sta_Mpscal010 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscal010(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscal010(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscal010 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscal010_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscal010_Send = function() {
    if(fn_GridValidation(dhxGridMpscal010, dhxDataProcessorMpscal010)) {
        dhxDataProcessorMpscal010.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscal010 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal010, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscal010.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscal010.getState(rowId);
            if(dhxGridMpscal010.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal010, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscal010.getRowIndex(rowId);
                    dhxGridMpscal010.deleteRow(rowId);
                    dhxGridMpscal010.selectRow(rowNum);
                }
                else dhxDataProcessorMpscal010.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscal010 = function () {
    var titMpscal010 = '초과근무수당'; /* gf_LocaleTrans('default', 'titMpscal010') */
    var jsonParameter = {
        workYm : gf_FormGetValue('searchFormMpscal010', 'workYm', 'text'),
        empno : gf_FormGetValue('searchFormMpscal010', 'empno', 'text')
    };
    var header = [[
        '근무년월' /* gf_LocaleTrans('default', 'titWorkYm') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '부서코드' /* gf_LocaleTrans('default', 'titDeptCode') */,
        '직급코드' /* gf_LocaleTrans('default', 'titClsfCode') */,
        '시간외근무 시간' /* gf_LocaleTrans('default', 'titOvtimeworkTime') */,
        '시간외근무수당' /* gf_LocaleTrans('default', 'titOvtimeworkAllwnc') */,
        '생활임금시간외근무수당' /* gf_LocaleTrans('default', 'titLvwageOvtimeworkAllwnc') */,
        '휴일근무 시간' /* gf_LocaleTrans('default', 'titHvofWorkTime') */,
        '휴무 수당' /* gf_LocaleTrans('default', 'titHvofAllwnc') */,
        '생활임금 휴무 수당' /* gf_LocaleTrans('default', 'titLvwageHvofAllwnc') */,
        '야간 근무 시간' /* gf_LocaleTrans('default', 'titNightWorkTime') */,
        '야간 근무 수당' /* gf_LocaleTrans('default', 'titNightWorkAllwnc') */,
        '생활임금 야간 근무 수당' /* gf_LocaleTrans('default', 'titLvwageNightWorkAllwnc') */,
        '대체휴무일수' /* gf_LocaleTrans('default', 'titAltHvofdayCo') */,
        '시간외 총금액' /* gf_LocaleTrans('default', 'titOvtimeTotAmt') */,
        '적용 년월' /* gf_LocaleTrans('default', 'titApplcYm') */,
        '지급 순번' /* gf_LocaleTrans('default', 'titPymntSn') */
    ]
    ];
    var dataId = [[ 'workYm', 'empno', 'deptCode', 'clsfCode', 'ovtimeworkTime', 'ovtimeworkAllwnc', 'lvwageOvtimeworkAllwnc', 'hvofWorkTime', 'hvofAllwnc', 'lvwageHvofAllwnc', 'nightWorkTime', 'nightWorkAllwnc', 'lvwageNightWorkAllwnc', 'altHvofdayCo', 'ovtimeTotAmt', 'applcYm', 'pymntSn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpscal010 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscal010;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscal010/excelMpscal010', jsonParameter);
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
    $('#saveFormMpscal010 #workYmSaveFormMpscal010').parent().append(
    '<div class="error" id="workYmSaveFormMpscal010-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal010 #empnoSaveFormMpscal010').parent().append(
    '<div class="error" id="empnoSaveFormMpscal010-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscal010 = function(workYm, empno){
    if(!gf_IsNull(workYm) && !gf_IsNull(empno)) {
        var jsonParameter = {
            workYm : workYm,
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mpscal010/findMpscal010', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.workYm) && gf_IsNull(data.empno)) {
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
    var checkWorkYm;
    var checkEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpscal010 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpscal010 = 0;
        save_Row_Ids_Mpscal010 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpscal010 = rowNum;
        save_Row_Ids_Mpscal010 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpscal010 = rowNum;
        save_Row_Ids_Mpscal010 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'workYm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'workYm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkWorkYm = gf_DhxGetValue(dhxGridObjet, rowId, 'workYm', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkWorkYm, checkEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var workYm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'workYm', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((workYm == checkWorkYm) && (empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'workYm');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscal010( checkWorkYm, checkEmpno )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'workYm');
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
        dhxGridMpscal010.selectRowById(validFalseFistRowId);
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
	gf_FormSetValue('searchFormMpscal010', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpscal010', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMpscal010', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal010', 'korNm', 'text');
	}
	else if(gubun == "2"){
		empno = gf_FormGetValue('searchFormMpscal010', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal010', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMpscal010', 'agentEmpno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal010', 'agentEmpNm', 'text');
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
	 		gf_FormSetValue('searchFormMpscal010', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal010', 'empCodeNm', data.korNm, 'text');
	  	}
	  	else if(strSvcID == "2"){
	  		gf_FormSetValue('searchFormMpscal010', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal010', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMpscal010', 'deptCodeNm', data.deptCodeNm, 'text');
	  	}
	  	else {
	 		gf_FormSetValue('searchFormMpscal010', 'agentEmpno', data.empno, 'hidden');
	 		gf_FormSetValue('searchFormMpscal010', 'agentEmpNm', data.korNm, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMpscal010","empNo","empCodeNm", gBplcCode, "Y");
	  	}
	  	else if(strSvcID == "2"){
	  		gf_EmpPopup("searchFormMpscal010","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMpscal010","agentEmpno","agentEmpNm", gBplcCode, "Y");
	  	}
  	}
	
}


var fn_CallbackPopComp = function(data) {
	if(!gf_IsNull(data.pymntDe)) {
		//검색인 경우 
		if(pymntDeGubun=="Search"){	
			gf_FormSetValue('searchFormMpscal010', 'pymntDe', data.pymntDe, 'text');
			gf_FormSetValue('searchFormMpscal010', 'salarytyCodeNm', data.salarytyCodeNm, 'text');
			gf_FormSetValue('searchFormMpscal010', 'pymntSn', data.pymntSn, 'hidden');
			gf_FormSetValue('searchFormMpscal010', 'pymntDtls', data.pymntDtls, 'text');
			gf_FormSetValue('searchFormMpscal010', 'closAt', data.closAt, 'text');
			gf_FormSetValue('searchFormMpscal010', 'applcYm', data.applcYm, 'text');
		
			return;
		}
		else  {
			// 체크된 항목을 가져온다
			var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal010, 'chk');
			// 체크된 항목 반복문
			$(rowIds).each(function(index, rowId){
				// 선택된 값마다 해당 지급일자 Set 해준다.
				dhxGridMpscal010.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal010, 'pymntDe')).setValue(fn_DateToStr(data.pymntDe));
				dhxGridMpscal010.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal010, 'pymntSn')).setValue(data.pymntSn);
				dhxGridMpscal010.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal010, 'applcYm')).setValue(data.applcYm);
				// Set이 된 이후 그리드 업데이트 실행 해준다.
				dhxDataProcessorMpscal010.setUpdated(rowId, true, 'updated');
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
