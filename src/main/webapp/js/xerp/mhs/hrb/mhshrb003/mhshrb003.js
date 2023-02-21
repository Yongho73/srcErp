/**
 *    프로그램       : 개인정보변경승인 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2021.06.09
 *    사용테이블      : MHS_EMP_CHANCE
 * sourceGen version : 2021.02.18.01 (2021.06.09)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrb003 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrb003 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrb003 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrb003 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrb003 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrb003 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrb003 = 0;  //그리드 삭제 수량 
var dhxGridMhshrb003;  //그리드 객체
var eventIdMhshrb003 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrb003;  //DataProcessor 객체

var gBplcCode = "1000";  //사업장 코드 , Sample 에서는 1000으로 고정, 실제 프로그램에서는 화면에서 받아서 사용
var g_empno;
var g_empNm;
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식

var tabbarMhshrb003;

var addRowCheck = 0;
var tab_empno;
var tab_changeReqstSn;
var tab_reqstDe;
var tab_confmSttusCode;
var tabId='a1';
var g_TabNo;

/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
	cf_InitParamMhshrb003();
    if(cf_SetComponentsMhshrb003()){
       cf_SetEventListenerMhshrb003();
       cf_InitFormMhshrb003();
       cf_SetBindingMhshrb003();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrb003 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrb003Tab1").validate({ errorElement: 'div', ignore: '' });
	gf_ComboCode('confmSttusCode', 'confmSttusCode', 'confmSttusCode', 'search', 'C197', '' , '', '', 'asc','');
    // 사용자 정보
	g_empno = gf_GetLocalStorageData('empno', false);
	g_empNm = gf_GetLocalStorageData('userNm', false);
	gf_FormSetValue('searchFormMhshrb003', 'empno', g_empno, 'text');
	gf_FormSetValue('searchFormMhshrb003', 'empNm', g_empNm, 'text');
	
	fn_SetTabbar();
};

var cf_SetComponentsMhshrb003 = function() {
	var dhxGridMhshrb003HeaderInfo = [];
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrb003" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('성명', '60', 'center', 'str', 'ro', false, 'empNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('신청일', '80', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('변경구분', '80', 'center', 'str', 'ro', false, 'changeSeNm', '', '')); /* gf_LocaleTrans('default', 'titChangeSe') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('승인여부', '80', 'center', 'str', 'ro', false, 'confmSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titConfmSttusCode') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('승인 일자', '80', 'left', 'str', 'ro', false, 'confmDe', '', '')); /* gf_LocaleTrans('default', 'titConfmDe') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('반려 사유', '*', 'left', 'str', 'ro', false, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('변경 신청 순번', '100', 'left', 'str', 'ro', true, 'changeReqstSn', '', '')); /* gf_LocaleTrans('default', 'titChangeReqstSn') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '100', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('승인 사원번호', '100', 'center', 'str', 'ro', true, 'confmEmpno', '', '')); /* gf_LocaleTrans('default', 'titConfmEmpno') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('변경구분', '80', 'center', 'str', 'ro', true, 'changeSe', '', '')); /* gf_LocaleTrans('default', 'titChangeSe') */
    dhxGridMhshrb003HeaderInfo.push(gf_MakeDhxGridHeader('승인여부', '80', 'center', 'str', 'ro', true, 'confmSttusCode', '', '')); /* gf_LocaleTrans('default', 'titConfmSttusCode') */
    dhxGridMhshrb003 = gf_MakeDhxGrid('dataListMhshrb003', dhxGridMhshrb003HeaderInfo, true, false, false);
    dhxGridMhshrb003.enableAutoWidth(false);
    dhxGridMhshrb003.setEditable(true);

    dhxGridMhshrb003.setColumnMinWidth(80,8); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    //양력여부
    gf_ComboCode('divComboBfSlrcldAtMhshrb003', 'bfSlrcldAt', 'bfSlrcldAt', 'sel', 'C013', '' , '', '', 'asc', '');	//변경전
    gf_ComboCode('divComboSlrcldAtMhshrb003', 'slrcldAt', 'slrcldAt', 'add', 'C013', '' , '', '', 'asc', '');		//변경후
  	//결혼여부
    gf_ComboCode('divComboBfMrrgAt', 'bfMrrgAt', 'bfMrrgAt', 'sel', 'C288', '' , '', '', 'asc', '');	//변경전
    gf_ComboCode('divComboMrrgAt', 'mrrgAt', 'mrrgAt', 'add', 'C288', '' , '', '', 'asc', '');			//변경후
    
	
    return true; 
};

var cf_SetEventListenerMhshrb003 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrb003 = gf_GridDetachEvent(dhxGridMhshrb003, eventIdMhshrb003);
    eventId = dhxGridMhshrb003.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrb003();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrb003.getColumnsNum();
            var rowNum = dhxGridMhshrb003.getRowsNum();
            var selectedId = dhxGridMhshrb003.getSelectedRowId();
            var ind        = dhxGridMhshrb003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrb003.getRowIndex(selectedId);
            var type       = dhxGridMhshrb003.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrb003.selectRow(0);
                    //fn_FindMhshrb003();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrb003.selectRow(rowIndex + 1);
                    fn_FindMhshrb003();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrb003.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrb003.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrb003.getSelectedRowId();
            var ind        = dhxGridMhshrb003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrb003.getRowIndex(selectedId);
            var type       = dhxGridMhshrb003.getColType(ind);
            dhxGridMhshrb003.selectCell(rowIndex+1, ind);
            fn_FindMhshrb003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrb003.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrb003.getSelectedRowId();
            var ind        = dhxGridMhshrb003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrb003.getRowIndex(selectedId);
            var type       = dhxGridMhshrb003.getColType(ind);
            dhxGridMhshrb003.selectCell(rowIndex-1, ind);
            fn_FindMhshrb003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrb003.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrb003.push(eventId);
    eventId = dhxGridMhshrb003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrb003SortGridList(ind, type, direction); 
    });
    eventIdMhshrb003.push(eventId);
    eventId = dhxGridMhshrb003.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrb003.push(eventId);
    eventId = dhxGridMhshrb003.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        
    	tab_empno = gf_DhxGetValue(dhxGridMhshrb003, id, 'empno',  'grid');
    	tab_changeReqstSn = gf_DhxGetValue(dhxGridMhshrb003, id, 'changeReqstSn',  'grid');
    	tab_reqstDe = gf_DhxGetValue(dhxGridMhshrb003, id, 'reqstDe',  'grid');
    	tab_confmSttusCode = gf_DhxGetValue(dhxGridMhshrb003, id, 'confmSttusCode',  'grid');
        
        if(gf_DhxGetValue(dhxGridMhshrb003, id, 'changeSe',  'grid') == "001"){
        	tabbarMhshrb003.tabs("a1").setActive();
            tabbarMhshrb003.tabs("a1").attachObject("a1");
            fn_FindMhshrb003();
        } else if(gf_DhxGetValue(dhxGridMhshrb003, id, 'changeSe',  'grid') == "002"){
        	tabbarMhshrb003.tabs("a2").setActive();
        	tabbarMhshrb003.tabs("a2").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab2/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe+"&confmSttusCode="+tab_confmSttusCode);
        } else if(gf_DhxGetValue(dhxGridMhshrb003, id, 'changeSe',  'grid') == "003"){
        	tabbarMhshrb003.tabs("a3").setActive();
        	tabbarMhshrb003.tabs("a3").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab3/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe+"&confmSttusCode="+tab_confmSttusCode);
        } else if(gf_DhxGetValue(dhxGridMhshrb003, id, 'changeSe',  'grid') == "004"){
        	tabbarMhshrb003.tabs("a4").setActive();
        	tabbarMhshrb003.tabs("a4").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab4/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe+"&confmSttusCode="+tab_confmSttusCode);
        } else if(gf_DhxGetValue(dhxGridMhshrb003, id, 'changeSe',  'grid') == "005"){
        	tabbarMhshrb003.tabs("a5").setActive();
        	tabbarMhshrb003.tabs("a5").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab5/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe+"&confmSttusCode="+tab_confmSttusCode);
        } else if(gf_DhxGetValue(dhxGridMhshrb003, id, 'changeSe',  'grid') == "006"){	
        	tabbarMhshrb003.tabs("a6").setActive();
        	tabbarMhshrb003.tabs("a6").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab6/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe+"&confmSttusCode="+tab_confmSttusCode);    
        } else if(gf_DhxGetValue(dhxGridMhshrb003, id, 'changeSe',  'grid') == "007"){    
        	tabbarMhshrb003.tabs("a7").setActive();
        	tabbarMhshrb003.tabs("a7").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab7/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe+"&confmSttusCode="+tab_confmSttusCode);    
        } else if(gf_DhxGetValue(dhxGridMhshrb003, id, 'changeSe',  'grid') == "008"){    
        	tabbarMhshrb003.tabs("a8").setActive();
        	tabbarMhshrb003.tabs("a8").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab8/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe+"&confmSttusCode="+tab_confmSttusCode);    
        }
        
    });
    eventIdMhshrb003.push(eventId);
    eventId = dhxGridMhshrb003.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdMhshrb003.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnSaveMhshrb003').unbind('click').bind('click', function() {
		gf_errorMsgClear();
//        gf_DivMsgConfirm("선택된 정보를 반영합니다.", 'fn_SaveMhshrb003()', '');

		var rowIds1 = gf_GetCheckedGridRowIdArr(dhxGridMhshrb003, 'chk');
		
		if(gf_IsNull(rowIds1)) { // 체크박스없이 승인
			var rowIds = dhxGridMhshrb003.getSelectedRowId();
			var confmSttusCode1 = gf_DhxGetValue(dhxGridMhshrb003, rowIds, 'confmSttusCode',  'grid');
	    	//alert(confmSttusCode1);
			if(confmSttusCode1 == "002" || confmSttusCode1 == "003"){
				gf_DivMsgAlert('이미 처리되었습니다.');
				return false;
			} else{
        		fn_SaveMsg();
			} 
		}else { //체크박스 있고 승인
			//alert(rowIds1);
			rowIds1 = rowIds1.toString();
			var str = rowIds1.split(',');
        	for (var i=0; i<=str.length; i++){
				var confmSttusCode1 = gf_DhxGetValue(dhxGridMhshrb003, str[i], 'confmSttusCode',  'grid');
				//alert(confmSttusCode1);
				if(confmSttusCode1 == "002" || confmSttusCode1 == "003"){
					gf_DivMsgAlert('이미 처리된 건이 선택되었습니다.');
					return false;
				}else if(confmSttusCode1 == "001"){//접수된 건만 업데이트
					gf_DivMsgAlert('접수 후 가능합니다.');
					return false;
				}else {
					fn_Save2Mhshrb003();
					//alert(confmSttusCode1);
				}
			}
		}
		
		
    });
	$('#btnReceiptMhshrb003').unbind('click').bind('click', function() {
        //location.reload();
		gf_errorMsgClear();
        var rId = dhxGridMhshrb003.getSelectedRowId();
        if(gf_IsNull(rId)){
        	gf_DivMsgAlert("행을 선택하여 주세요.");
        	return;
        }
        else{
        	var empno = gf_DhxGetValue(dhxGridMhshrb003, rId, 'empno',  'grid');
        	var empNm = gf_DhxGetValue(dhxGridMhshrb003, rId, 'empNm',  'grid');
        	var changeReqstSn = gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeReqstSn',  'grid');
        	var changeSe = gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeSe',  'grid');
        	var changeSeNm = gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeSeNm',  'grid');
        	var reqstDe = gf_DhxGetValue(dhxGridMhshrb003, rId, 'reqstDe',  'grid');
        	var confmSttusCode = gf_DhxGetValue(dhxGridMhshrb003, rId, 'confmSttusCode',  'grid');
        	if(gf_IsNull(changeReqstSn) || gf_IsNull(empno) || gf_IsNull(changeSe)){
        		gf_DivMsgAlert("재조회 후 접수하여 주세요.");
        		return;
        	}else if(confmSttusCode!='001'){
        		gf_DivMsgAlert("재조회 후 접수하여 주세요.");
        		return;
        	}else{
        		gf_DivMsgConfirm2('해당 정보로 접수합니다.', function(confirm){ 
        			if(confirm){
        				var jsonParameter = {
        						empno : empno,
        						empNm : empNm,
        						changeReqstSn : changeReqstSn,
        						changeSeNm : changeSeNm,
        						reqstDe : reqstDe
        				};
        				gf_Transaction('', 'mhshrb003/receiptMhshrb003', jsonParameter, 'fn_CallbackApplyMhshrb003', false, 'POST');
					}else{ 
        				return; 
        			} 
        		});
        	}
        }
    });
    $('#btnExcelMhshrb003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrb003();
    });
    $('#btnSearchMhshrb003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrb003('');
    });
    $('#btnResetMhshrb003').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrb003();
    });
    $('#searchFormMhshrb003 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
        gf_EmpPopup("searchFormMhshrb003","empno","empNm", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    $('#btnFalseMhshrb003').unbind('click').bind('click', function(event){
		var rowIds = dhxGridMhshrb003.getSelectedRowId();
		var confmSttusCode1 = gf_DhxGetValue(dhxGridMhshrb003, rowIds, 'confmSttusCode',  'grid');
		if(confmSttusCode1 == "002" || confmSttusCode1 == "003"){
			gf_DivMsgAlert('이미 처리되었습니다.');
			return false;
		} else{
    		fn_ReturnResnPopup();
		}
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrb003').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrb003, $('#checkAllMhshrb003').prop('checked'), 'chk');
    });
    $('#searchFormMhshrb003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "empno" || this.id == "empNm"){
        		fn_SearchEmpCode();
        	}
        	$('#btnSearchMhshrb003').click(); event.preventDefault(); return true; 
        }
        if(event.charCode != 13 && event.charCode != 9){
        	if(this.id == "empno"){
        		gf_FormSetValue('searchFormMhshrb003', 'empNm', '', 'text');
        	} else if (this.id == "empNm"){
        		gf_FormSetValue('searchFormMhshrb003', 'empno', '', 'text');
        	}
        }
        else return true; 
    }); 
    $('#saveFormMhshrb003Tab1').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#saveFormMhshrb003Tab1 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhshrb003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhshrb003",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrb003Tab1 select[name="mrrgAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != '1'){
        	gf_FormSetValue('saveFormMhshrb003Tab1', 'mrrgDe', '', 'text');
        	$('#saveFormMhshrb003Tab1 input[name="mrrgDe"]').prop('disabled', true);
        } else {
        	$('#saveFormMhshrb003Tab1 input[name="mrrgDe"]').prop('disabled', false);
        }
    });
    // 폼 이벤트 end ============================================================================================
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
};

var cf_InitFormMhshrb003 = function() {
    $('#searchFormMhshrb003').resetForm();
};

var cf_SetBindingMhshrb003 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhshrb003('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/


var fn_SetTabbar = function (){

    tabbarMhshrb003 = new dhtmlXTabBar({
        parent:         "tabbarObj",
        close_button:   false,
        arrows_mode :   "auto", 
        tabs: [
        	{id:"a1",  text: "기본" },     //기본
    	   /* {id:"a2",  text: "신상정보"},                                   //신상정보
            {id:"a3",  text: "가족"},
		    {id:"a4",  text: "학력"},
		    {id:"a8",  text: "경력"},
		    {id:"a5",  text: "자격사항"},
		    {id:"a6",  text: "계좌번호"},
		    {id:"a7",  text: "어학"}*/
		    ]
    });
    

    tabbarMhshrb003.tabs("a1").attachObject("a1");
  /*  tabbarMhshrb003.tabs("a2").attachObject("a2");
    tabbarMhshrb003.tabs("a3").attachObject("a3");
    tabbarMhshrb003.tabs("a4").attachObject("a4");
    tabbarMhshrb003.tabs("a5").attachObject("a5");
    tabbarMhshrb003.tabs("a6").attachObject("a6");
    tabbarMhshrb003.tabs("a7").attachObject("a7");
    tabbarMhshrb003.tabs("a8").attachObject("a8");*/
    

    tabbarMhshrb003.attachEvent("onSelect", function(id, lastId){
    	if(id=="a2") {
    		tabId = 'a2';
        	gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSeNm', '신상정보');
        	gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSe', '002');
        	gf_FormSetValue("searchFormMhshrb003", "tabNumber", "002", "");
    		tabbarMhshrb003.tabs("a2").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab2/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a3") {
    		tabId = 'a3';
        	gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSeNm', '가족');
        	gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSe', '003');
        	gf_FormSetValue("searchFormMhshrb003", "tabNumber", "003", "");
    		tabbarMhshrb003.tabs("a3").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab3/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a4") {
    		tabId = 'a4';
    		gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSeNm', '학력');
        	gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSe', '004');
        	gf_FormSetValue("searchFormMhshrb003", "tabNumber", "004", "");
    		tabbarMhshrb003.tabs("a4").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab4/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a5") {
    		tabId = 'a5';
    		gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSeNm', '자격사항');
        	gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSe', '005');
        	gf_FormSetValue("searchFormMhshrb003", "tabNumber", "005", "");
    		tabbarMhshrb003.tabs("a5").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab5/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a6") {
    		tabId = 'a6';
    		gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSeNm', '계좌번호');
        	gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSe', '006');
        	gf_FormSetValue("searchFormMhshrb003", "tabNumber", "006", "");
    		tabbarMhshrb003.tabs("a6").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab6/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a7") {
    		tabId = 'a7';
    		gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSeNm', '어학');
        	gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSe', '007');
        	gf_FormSetValue("searchFormMhshrb003", "tabNumber", "007", "");
    		tabbarMhshrb003.tabs("a7").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab7/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a8") {
    		tabId = 'a8';
    		gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSeNm', '경력');
        	gf_DhxGridCellMapping(dhxGridMhshrb003, dhxDataProcessorMhshrb003, 'changeSe', '008');
        	gf_FormSetValue("searchFormMhshrb003", "tabNumber", "008", "");
    		tabbarMhshrb003.tabs("a7").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab7/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&reqstDe="+tab_reqstDe);
    	}
    	return true;
    });
    
    tabbarMhshrb003.tabs("a1").setActive();
    
};
//Tap 비활성화
var fn_TabOnOff = function (OnOff){
	var ids = tabbarMhshrb003.getAllTabs();
	if(OnOff == "N"){
		for (var q=0; q<ids.length; q++) {
			tabbarMhshrb003.tabs(ids[q]).disable();
		}
//		$("#tabbarObj").find("input, select, button, textarea").prop("disabled",true);
	}
	else {
		for (var q=0; q<ids.length; q++) {
			tabbarMhshrb003.tabs(ids[q]).enable();
		}
//		$("#tabbarObj").find("input, select, button, textarea").prop("disabled",false);
	}
}
/**
 * 조회
 */
var fn_SearchMhshrb003 = function(userId) {
	//$('#bfEmpPhoto').clearFields();
	//$('#empPhoto').clearFields();
	$('#bfEmpPhoto').html("");
	$('#empPhoto').html("");
	addRowCheck = 0;
	var empno = gf_FormGetValue('searchFormMhshrb003', 'empno', 'text');
	var empNm = gf_FormGetValue('searchFormMhshrb003', 'empNm', 'text');
	var confmSttusCode = gf_FormGetValue('searchFormMhshrb003', 'confmSttusCode', 'combo');
    var jsonParameter = {
        empno : empno,
        empNm : empNm,
		confmSttusCode : confmSttusCode
    };
    gf_Transaction(userId, 'mhshrb003/searchMhshrb003', jsonParameter, 'fn_CallbackSearchMhshrb003', false, 'GET');
};

var fn_CallbackSearchMhshrb003 = function(strSvcID, targetID, data) {
    //dhxGridMhshrb003.clearAll();
    dhxGridMhshrb003.destructor();
    if(cf_SetComponentsMhshrb003()){ 
        fn_DhxDataProcessorMhshrb003(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrb003');
            dhxGridMhshrb003.parse(data.data.records, 'js');
			//for(var idcnt=0; idcnt < 400; idcnt++){ // 다중 셀렉트바 disabled에러로 승인로직에 반영
 			//	dhxGridMhshrb003.forEachRow(function(idcnt){
			//		dhxGridMhshrb003.cellById(idcnt,1).setDisabled(true);
			//	})
			//}
            if(save_Row_Num_Mhshrb003 == 0 && save_All_Sta_Mhshrb003 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrb003.selectRow(0); 
            } else if(save_Row_Sta_Mhshrb003 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrb003.selectRow(0);
            } else if(save_All_Sta_Mhshrb003 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrb003.selectRow(save_Row_Num_Mhshrb003); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrb003.selectRow(save_Row_Num_Mhshrb003);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrb003.findCell(save_Row_Ids_Mhshrb003, gf_GetDhxGridColumId(dhxGridMhshrb003,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrb003.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrb003.selectRow(0);
                //} 
            } 
 
            fn_FirstFind();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrb003');
            fn_InitInputFormMhshrb003();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhshrb003").text(data.data.records.length);
        cf_SetEventListenerMhshrb003();
    } 
};
var fn_CallbackApplyMhshrb003 = function(strSvcID, targetID, data) {
//	console.log(data);
	//alert(data);
	if(data.code != "000"){
		gf_DivMsgAlert("데이터 반환 에러");
	}
	else if(!gf_IsNull(data.data) || data.code == "000"){
		var obj = data.data;
		if(obj.code == "000"){
			gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
	        $("#checkAllMhshrb003").prop('checked', false); //상단 체크박스 해제			
		}
		else{
			gf_DivMsgAlert(obj.message);	
			//fn_SearchMhshrb003();	
		}
	}
	fn_SearchMhshrb003('');		
};
var fn_DhxDataProcessorMhshrb003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrb003 = new dataProcessor(gv_ContextPath+'/mhshrb003/saveMhshrb003'); //lock feed url
    dhxDataProcessorMhshrb003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrb003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrb003.init(dhxGridMhshrb003); //link dataprocessor to the grid
    dhxDataProcessorMhshrb003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrb003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrb003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrb003();
                    $("#checkAllMhshrb003").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
var fn_FirstFind = function(){
	var rId = dhxGridMhshrb003.getSelectedRowId();
    
	tab_empno = gf_DhxGetValue(dhxGridMhshrb003, rId, 'empno',  'grid');
	tab_changeReqstSn = gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeReqstSn',  'grid');
	tab_confmSttusCode = gf_DhxGetValue(dhxGridMhshrb003, rId, 'confmSttusCode',  'grid');
	tab_reqstDe = gf_DhxGetValue(dhxGridMhshrb003, rId, 'reqstDe',  'grid');
	var changeSe = gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeSe',  'grid');
	
	
    if(changeSe == "001"){
    	tabbarMhshrb003.tabs("a1").setActive();
    	fn_FindMhshrb003();
    } /*else if(changeSe == "002"){
    	tabbarMhshrb003.tabs("a2").setActive();
		tabbarMhshrb003.tabs("a2").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab2/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    } else if(changeSe == "003"){
    	tabbarMhshrb003.tabs("a3").setActive();
    	tabbarMhshrb003.tabs("a3").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab3/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    } else if(changeSe == "004"){
    	tabbarMhshrb003.tabs("a4").setActive();
    	tabbarMhshrb003.tabs("a4").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab4/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    } else if(changeSe == "005"){
    	tabbarMhshrb003.tabs("a5").setActive();
    	tabbarMhshrb003.tabs("a5").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab5/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    } else if(changeSe == "006"){	
    	tabbarMhshrb003.tabs("a6").setActive();
    	tabbarMhshrb003.tabs("a6").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab6/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    }else if(changeSe == "007"){  
    	tabbarMhshrb003.tabs("a7").setActive();
    	tabbarMhshrb003.tabs("a7").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab7/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    }else if(changeSe == "008"){  
    	tabbarMhshrb003.tabs("a8").setActive();
    	tabbarMhshrb003.tabs("a8").attachURL("/xerp_2021/mhshrb003/searchMhshrb003Tab8/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    }*/
    if(gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeReqstSn',  'grid') == "자동채번"||gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeReqstSn',  'grid') == ""){
    	fn_TabOnOff('Y');
    } else {
    	fn_TabOnOff('N');
    }
}
/**
 * 상세조회
 */
var fn_FindMhshrb003 = function() {
    var rId = dhxGridMhshrb003.getSelectedRowId();
    var status = dhxDataProcessorMhshrb003.getState(rId);
	//alert(tab_confmSttusCode);
    if(tab_confmSttusCode == '001'){
		$('#btnReceiptMhshrb003').show();
    	$('#btnSaveMhshrb003').hide();
    	$('#btnFalseMhshrb003').hide();
    }else if(tab_confmSttusCode == '004'){
    	$('#btnReceiptMhshrb003').hide();
		$('#btnSaveMhshrb003').show();
    	$('#btnFalseMhshrb003').show();
    }else if(tab_confmSttusCode == '002' || tab_confmSttusCode =='003'){
		$('#btnSaveMhshrb003').hide();
    	$('#btnFalseMhshrb003').hide();
		$('#btnReceiptMhshrb003').hide();
	}
	
	
    var jsonParameter = {
    		empno : gf_DhxGetValue(dhxGridMhshrb003, rId, 'empno',  'grid'),
    		changeReqstSn : gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeReqstSn',  'grid')
	    };
	var dataSource = gf_NoAsyncTransaction('mhshrb003/searchMhshrb003Tab1', jsonParameter, 'GET');
    var data = dataSource.data;
	
    fn_FormDisabled(false);
	//alert(data.bfPhotoAtchmnflNo);
	//alert(data.photoAtchmnflNo);
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfPhotoAtchmnflNo', data.bfPhotoAtchmnflNo, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfChcrtNm', data.bfChcrtNm, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfEngNm', data.bfEngNm, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfBrthdy', data.bfBrthdy, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfSlrcldAt', data.bfSlrcldAt, 'combo');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfOwnhomZip', data.bfOwnhomZip, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfOwnhomAdres', data.bfOwnhomAdres, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfOwnhomDetailAdres', data.bfOwnhomDetailAdres, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfOwnhomTelno', data.bfOwnhomTelno, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfMbtlnum', data.bfMbtlnum, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfLxtnTelno', data.bfLxtnTelno, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfEmail', data.bfEmail, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfIndvdlEmail', data.bfIndvdlEmail, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfMrrgAt', data.bfMrrgAt, 'combo');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'bfMrrgDe', data.bfMrrgDe, 'text');
    
    gf_FormSetValue('saveFormMhshrb003Tab1', 'photoAtchmnflNo', data.photoAtchmnflNo, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'chcrtNm', data.chcrtNm, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'engNm', data.engNm, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'brthdy', data.brthdy, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'slrcldAt', data.slrcldAt, 'combo');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'ownhomZip', data.ownhomZip, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'ownhomAdres', data.ownhomAdres, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'ownhomDetailAdres', data.ownhomDetailAdres, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'ownhomTelno', data.ownhomTelno, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'mbtlnum', data.mbtlnum, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'lxtnTelno', data.lxtnTelno, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'email', data.email, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'indvdlEmail', data.indvdlEmail, 'text');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'mrrgAt', data.mrrgAt, 'combo');
    gf_FormSetValue('saveFormMhshrb003Tab1', 'mrrgDe', data.mrrgDe, 'text');
    
	var empNo = g_empno;
    var empNm = g_empNm;
    if(data.bfPhotoAtchmnflNo != "" && data.bfPhotoAtchmnflNo != null){
    	$('#bfEmpPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+data.bfPhotoAtchmnflNo+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'">');
    }
    else {
    	$('#bfEmpPhoto').html("");
    }
    
    if(data.photoAtchmnflNo != "" && data.photoAtchmnflNo != null){
    	$('#empPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+data.photoAtchmnflNo+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'">');
    }else {
    	$('#empPhoto').html("");
    }
	
    if(status != "inserted"){
    	fn_TabOnOff("N");
    }
    fn_FormDisabled(true);
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhshrb003 = function() {
    $('#saveFormMhshrb003Tab1 input[name="empno"]').prop('disabled', false);
    $('#saveFormMhshrb003Tab1 input[name="changeReqstSn"]').prop('disabled', false);
    $('#saveFormMhshrb003Tab1').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhshrb003Tab1 *').prop('disabled', status);
};
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrb003SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrb003, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrb003', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrb003', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrb003, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrb003.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrb003', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrb003', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrb003, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrb003.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrb003', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrb003', 'sortColumId', '', 'text'); 
            dhxGridMhshrb003.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrb003.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrb003', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrb003', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrb003, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 승인 데이터 저장
 */
var fn_SaveMsg = function(){
	gf_DivMsgConfirm2("해당 정보를 반영합니다." , function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrb003();
        }else{ 
            result = false; 
        } 
    });
}

var fn_SaveMhshrb003 = function(returnResn) {
	$('#returnResn .b-close').click();
	var rowIds = dhxGridMhshrb003.getSelectedRowId();
	var confmSttusCode = gf_IsNull(returnResn)?'002':'003';
	var confmSttusCodeNm = gf_IsNull(returnResn)?'승인':'반려';
	
	var jsonParameter = {
			empno : gf_DhxGetValue(dhxGridMhshrb003, rowIds, 'empno', 'grid'),
			empNm : gf_DhxGetValue(dhxGridMhshrb003, rowIds, 'empNm', 'grid'),
			changeSe : gf_DhxGetValue(dhxGridMhshrb003, rowIds, 'changeSe', 'grid'),
			changeSeNm : gf_DhxGetValue(dhxGridMhshrb003, rowIds, 'changeSeNm', 'grid'),
			changeReqstSn : gf_DhxGetValue(dhxGridMhshrb003, rowIds, 'changeReqstSn', 'grid'),
			reqstDe : gf_DhxGetValue(dhxGridMhshrb003, rowIds, 'reqstDe', 'grid'),
			confmSttusCode : confmSttusCode,
			returnResn : returnResn
	    };
//	console.log(jsonParameter);
	gf_Transaction(jsonParameter, 'mhshrb003/saveMhshrb003', jsonParameter, 'fn_CallbackSaveMhshrb003Tab1', false, 'POST');
};
var fn_SaveMsg2 = function(){
	gf_DivMsgConfirm2("해당 정보를 반영합니다." , function(confirm){ 
        if(confirm){ 
            result = true;
            fn_Save2Mhshrb003();
        }else{ 
            result = false; 
        } 
    });
}

var fn_Save2Mhshrb003 = function(returnResn) {
	$('#returnResn .b-close').click();
	var rowIds1 = gf_GetCheckedGridRowIdArr(dhxGridMhshrb003, 'chk');
	rowIds1 = rowIds1.toString();
	var str = rowIds1.split(',');
	//var rowIds = dhxGridMhshrb003.getSelectedRowId();
	var confmSttusCode = '002';
	//var confmSttusCodeNm = gf_IsNull(returnResn)?'승인':'반려';
	//alert(rowIds1);
    for (var i=0; i<=str.length; i++){
		var jsonParameter = {
			empno : gf_DhxGetValue(dhxGridMhshrb003, str[i], 'empno', 'grid'),
			empNm : gf_DhxGetValue(dhxGridMhshrb003, str[i], 'empNm', 'grid'),
			changeSe : gf_DhxGetValue(dhxGridMhshrb003, str[i], 'changeSe', 'grid'),
			changeSeNm : gf_DhxGetValue(dhxGridMhshrb003, str[i], 'changeSeNm', 'grid'),
			changeReqstSn : gf_DhxGetValue(dhxGridMhshrb003, str[i], 'changeReqstSn', 'grid'),
			reqstDe : gf_DhxGetValue(dhxGridMhshrb003, str[i], 'reqstDe', 'grid'),
			confmSttusCode : confmSttusCode,
			returnResn : returnResn
	    };
//	console.log(jsonParameter);
		gf_Transaction(jsonParameter, 'mhshrb003/saveMhshrb003', jsonParameter, 'fn_CallbackSaveMhshrb003Tab1', false, 'POST');
	}
};

var fn_CallbackSaveMhshrb003Tab1 = function(strSvcID, targetID, data) {
	if(data.code != '000') {
		gf_DivMsgAlert("데이터 반환 에러"); // 컨트롤러 반환 오류
	}
	else if(!gf_IsNull(data.data) || data.code == "000"){
		var obj = data.data;
		if(obj.code == "000"){
			gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
			fn_SearchMhshrb003();
			$("#checkAllMhshrb003").prop('checked', false); //상단 체크박스 해제
		}
		else{
			fn_SearchMhshrb003();
			//gf_DivMsgAlert(obj.message);
		}
	}
};
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrb003 = function () {
    var titMhshrb003 = '개인정보변경승인'; /* gf_LocaleTrans('default', 'titMhshrb003') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMhshrb003', 'empno', 'text'),
        empNm : gf_FormGetValue('searchFormMhshrb003', 'empNm', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '성명' /* gf_LocaleTrans('default', 'titEmpno') */,
        '신청일' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '변경구분' /* gf_LocaleTrans('default', 'titChangeSe') */,
        '승인여부' /* gf_LocaleTrans('default', 'titConfmSttusCode') */,
        '승인일자' /* gf_LocaleTrans('default', 'titConfmDe') */,
        '반려 사유' /* gf_LocaleTrans('default', 'titReturnResn') */
    ]];
    var dataId = [[ 'empno', 'empNm', 'reqstDe', 'changeSeNm', 'confmSttusCodeNm', 'confmDe', 'returnResn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrb003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrb003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb003/excelMhshrb003', jsonParameter);
};

var fn_CallbackPopEmp = function(data){
	console.log(data.empno + " : " + data.korNm);
	fn_SearchMhshrb003('');
}

function fn_SearchEmpCode(){
    var empno = "";
    var korNm = "";
    
    empno = gf_FormGetValue('searchFormMhshrb003', 'empno', 'text');
    korNm = gf_FormGetValue('searchFormMhshrb003', 'empNm', 'text');
    
    var jsonParameter = {
            empno     : empno,
            korNm     : korNm,
            bplcCode  : gBplcCode
    };
    gf_Transaction('', 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}
function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
    var totCnt = data.data.records.length;
    //alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
        //단건
        var data = data.data.records[0];
        gf_FormSetValue('searchFormMhshrb003', 'empno', data.empno, 'text');
        gf_FormSetValue('searchFormMhshrb003', 'empNm', data.korNm, 'text');
    	fn_SearchMhshrb003('');
    }
    else {
    	gf_EmpPopup("searchFormMhshrb003","empno","empNm", gBplcCode, "Y", "fn_CallbackPopEmp"); 
    }
}
//날짜 포멧 처리
function dateFormat(date){
  var dd = date.getDate();
  var mm = date.getMonth()+1; //January is 0!
  var yyyy = date.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  var nDate = yyyy+'-'+mm+'-'+dd;
  return(nDate);
}
//입력 내용을 날짜 포멧으로
function dateChk(objDate){
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
		  alert("잘못된 날짜입니다. \n다시 입력하세요.");
		  objDate.val("");
		  objDate.focus();
		  return;
		}
	}
}

//사진 업로드
var fn_FileUploadBtnEvent = function(){
	//등록버튼
	$('#btnPhotoRec').unbind("click").bind("click",function(event){
		uploadedFileKeys2  = [];
		uploadedFileInfo2  = [];
		//File 업로드
		gf_FileUploadPopup(
			'fn_FileUploadBtnEvent', 
			'btnUploadedFiledelete2', 
			'fileList2', 
			'atchFileIds2', 
			 uploadedFileKeys2, 
			 uploadedFileInfo2, 
			 1,
		    'image',
	        'fn_FileUpLoadAfter');
    });
	
	//다운로드 버튼
	$('#btnPhotoDown').unbind("click").bind("click",function(event){
		var strimg = gf_FormGetValue('saveFormMhshrb003Tab1', 'photoAtchmnflNo', 'text');
		var strSrc = gv_ServerApiUrl + "/file/down?atchFileId=" + strimg;
		$("a#photoDownload").attr({
			"href": strSrc
		}).get(0).click();
	});
	
	//다운로드 버튼
	$('#btnBfPhotoDown').unbind("click").bind("click",function(event){
		var strimg = gf_FormGetValue('saveFormMhshrb003Tab1', 'bfPhotoAtchmnflNo', 'text');
		var strSrc = gv_ServerApiUrl + "/file/down?atchFileId=" + strimg;
		$("a#photoDownload").attr({
			"href": strSrc
		}).get(0).click();
	});
	
	//삭제버튼
	$('#btnPhotoDel').unbind("click").bind("click",function(event){
		$('#empPhoto').html("");
		gf_FormSetValue('saveFormMhshrb003Tab1', 'photoAtchmnflNo', "", 'text');
    });
};

var fn_FileUpLoadAfter = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){

	if(!gf_IsNull(data)){
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
		});
		
		var empNo = g_empno
		var empNm = g_empNm;
		
		gf_FormSetValue('saveFormMhshrb003Tab1', 'photoAtchmnflNo', keyArr[0], 'text');
		
		$('#empPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+keyArr[0]+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + empNm + ' (' + empNo + ')" title="' + empNm + ' (' + empNo + ')">');
	}
};

/* 패스워드 변경 팝업 */
var fn_ChangePwPopup = function(formId, codeId, codeNmId, param) {
	var userId = ""; 
	var title  = "패스워드 변경";
	//저장팝업
	var dhxWindowObj;
	var popupDtlRequst;
	if($('body').find("div[id='popupDtlRequst']").size() <= 0) {
		$('body').append("<div id='popupDtlRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#popupDtlRequst').bPopup({
		onOpen:function(){
			
			popupDtlRequst = new dhtmlXWindows();
			var id 		= 'popupDtlRequest';
			var ajaxUrl = gv_ContextPath+'/mhshrb003/popup/changePwPopup/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 400;
			var height	= 300;
			
			dhxWindowObj = popupDtlRequst.createWindow(id, left, top, width, height);
			popupDtlRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#popupDtlRequst .b-close').click();
			});
		},
		onClose:function(){
			popupDtlRequst.unload();
			$('body').find("div[id='popupDtlRequst']").remove();			
		}
	},function(){});
	return dhxWindowObj;
}
/**
 * 반려사유
 */
var fn_ReturnResnPopup = function(type){	// type : 일괄 , 개별 구분 용도
	var userId = ""; 
	var title  = "반려사유";
	//저장팝업
	var dhxWindowObj;
	var returnResn;
	if($('body').find("div[id='returnResn']").size() <= 0) {
		$('body').append("<div id='returnResn'><div class='b-close' style='display:none'></div></div>");
	}
	$('#returnResn').bPopup({
		onOpen:function(){
			
			returnResn = new dhtmlXWindows();
			var id 		= 'returnResn';
			var ajaxUrl = gv_ContextPath+'/mhshrb003/popup/returnResn/view?type=' + type;
			var left	= 0;
			var top		= 0;
			var width	= 600;
			var height	= 170;
			
			dhxWindowObj = returnResn.createWindow(id, left, top, width, height);
			returnResn.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#returnResn .b-close').click();
			});
		},
		onClose:function(){
			returnResn.unload();
			$('body').find("div[id='returnResn']").remove();			
		}
	},function(){});
	return dhxWindowObj;
}
var fn_FileUploadPopUpIframeOutputs = function(atchmnfl, rowId, tabNo){
	//var atchmnfl = gf_DhxGetValue(dhxGridMhsEmpRward, rowId, 'atchmnflNo', 'grid');
	var outputsFileKeyArr = gf_IsNull(atchmnfl) ? [] : atchmnfl.split('|');
	
	if(gf_IsNull(tabNo)){
		gf_DivMsgAlert("Tab번호가 불확실합니다.");
		return false;
	}
	g_TabNo = tabNo;

	gf_FileUploadPopup(
			 '', 
			 '', 
			 '', 
			 rowId, 
			 outputsFileKeyArr, 
			 [], 
			 0,
			 'all',
	         'gf_CallbackFileUploadIframe',
	         '');
};
var gf_CallbackFileUploadIframe = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){

	if(!gf_IsNull(data)){
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		var rtnFileKey = "";
		
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);
			if(gf_IsNull(rtnFileKey)){
				rtnFileKey = fileInfos[0];
			}
			else {
				rtnFileKey = rtnFileKey + "|" + fileInfos[0];
			}
		});
		
		var iframeObj =  null;
		
		if(g_TabNo == 3){
			(tabbarMhshrb003.tabs("a3").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 4){
			(tabbarMhshrb003.tabs("a4").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 5){
			(tabbarMhshrb003.tabs("a5").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 6){
			(tabbarMhshrb003.tabs("a6").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 7){
			(tabbarMhshrb003.tabs("a7").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 8){
			(tabbarMhshrb003.tabs("a8").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
	}
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
    $('#saveFormMhshrb003 #empnoSaveFormMhshrb003').parent().append(
    '<div class="error" id="empnoSaveFormMhshrb003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhshrb003 #changeReqstSnSaveFormMhshrb003').parent().append(
    '<div class="error" id="changeReqstSnSaveFormMhshrb003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrb003 = function(empno, changeReqstSn){
    if(!gf_IsNull(empno) && !gf_IsNull(changeReqstSn)) {
        var jsonParameter = {
            empno : empno,
            changeReqstSn : changeReqstSn
        };
        var dataSource = gf_NoAsyncTransaction('mhshrb003/findMhshrb003', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno) && gf_IsNull(data.changeReqstSn)) {
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
    var state = dhxDataProcessorMhshrb003.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhshrb003').validate().form()){
                if(state == 'inserted') {
                    var empno = gf_FormGetValue('saveFormMhshrb003', 'empno', 'text');
                    var changeReqstSn = gf_FormGetValue('saveFormMhshrb003', 'changeReqstSn', 'text');
                    if(fn_CheckDupMhshrb003(empno, changeReqstSn)) return true;
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
    var checkNull;
    var checkNull;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrb003 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhshrb003 == 'deleted') {
        save_Row_Num_Mhshrb003 = 0;
        save_Row_Ids_Mhshrb003 = "";
    } else if(save_Row_Sta_Mhshrb003 == 'inserted') {
        save_Row_Num_Mhshrb003 = rowNum;
        save_Row_Ids_Mhshrb003 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrb003 = rowNum;
        save_Row_Ids_Mhshrb003 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'null');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'null');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkNull = gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid');
                    checkNull = gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid');
                    if(!gf_IsNull(checkEmpno, checkChangeReqstSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var changeReqstSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'changeReqstSn', 'grid');
                            if(((empno == checkEmpno) && (changeReqstSn == checkChangeReqstSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'changeReqstSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrb003( checkEmpno, checkChangeReqstSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'changeReqstSn');
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
        dhxGridMhshrb003.selectRowById(validFalseFistRowId);
        fn_FindMhshrb003();
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
/**********************************************************파일 핸들링 시작**************************************************************/
var fn_SearchFileUploadSaveFormStmPrgRequst = function(atchFiles, viewDivId, dataDivId) {
	var rId = dhxGridMhshrb003.getSelectedRowId();
	var changeSe = gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeSe',  'grid');
    var jsonParameter = { atchFiles : atchFiles };
    var dataSource = gf_NoAsyncTransaction('file/searchFiles', jsonParameter, 'POST'); 
    if(!gf_IsNull(dataSource.data)) {
        uploadedFileKeys = [];
        uploadedFileInfo = [];
        $.each( dataSource.data, function( key, value ) {           
            uploadedFileKeys.push(value.atchFileId);                
            uploadedFileInfo.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);   
        });     
		if(changeSe == "002"){
			(tabbarMhshrb003.tabs("a2").getAttachedObject()).contentWindow.fn_SearchFileUploadSaveForm(viewDivId);
		}
        fn_LoadFileUploadSaveFormStmPrgRequst(uploadedFileInfo, viewDivId, dataDivId);  
    }
    else {
    	fn_ClearFileUploadSaveFormStmPrgRequst(viewDivId , dataDivId);
    }
};

var fn_LoadFileUploadSaveFormStmPrgRequst = function(data, viewDivId, dataDivId) {   
	var rId = dhxGridMhshrb003.getSelectedRowId();
	var changeSe = gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeSe',  'grid');
    var atchFileList = [];
    var fileInfos = [];
    var idx = 0;
    var arrayEmpty = false;
    if(gf_IsNull(uploadedFileKeys) && gf_IsNull(uploadedFileInfo)) arrayEmpty = true;
    $.each( data, function( key, value ) {
        fileInfos = value.split('|^|');
        if(arrayEmpty) {
            uploadedFileKeys.push(fileInfos[0]);                
            uploadedFileInfo.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);   
        }       
        atchFileList.push('<tr>');
        atchFileList.push('<td style="border:0px"><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
        atchFileList.push('<td style="border:0px">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
        atchFileList.push('<td style="border:0px"></td>');
        atchFileList.push('</tr>');     
        idx++;
    }); 
    if(idx === 0) {
        atchFileList.push('<tr>');
        atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');      
        atchFileList.push('</tr>');
    }
	if(changeSe == "002"){
		(tabbarMhshrb003.tabs("a2").getAttachedObject()).contentWindow.fn_LoadFileUploadSaveForm(viewDivId , dataDivId , atchFileList.join("") , uploadedFileKeys.join("|"));
	}
}
var fn_ClearFileUploadSaveFormStmPrgRequst = function(viewDivId, dataDivId){
	var rId = dhxGridMhshrb003.getSelectedRowId();
	var changeSe = gf_DhxGetValue(dhxGridMhshrb003, rId, 'changeSe',  'grid');
//    $('#'+viewDivId+' .file_box table tr').remove();
	if(changeSe == "002"){
		(tabbarMhshrb003.tabs("a2").getAttachedObject()).contentWindow.fn_SearchFileUploadSaveForm(viewDivId);
	}
    var atchFileList = [];
    atchFileList.push('<tr>');
    atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');      
    atchFileList.push('</tr>');
	if(changeSe == "002"){
		(tabbarMhshrb003.tabs("a2").getAttachedObject()).contentWindow.fn_ClearFileUploadSaveForm(viewDivId , dataDivId , atchFileList.join(""));
	}
};