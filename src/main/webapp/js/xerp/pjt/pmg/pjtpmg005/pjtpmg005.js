/**
 *    프로그램       : 개인별투입현황 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2021.02.22
 *    사용테이블      : PJT_HNF_ACMSLT
 * sourceGen version : 2021.02.18.01 (2021.02.22)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pjtpmg005 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pjtpmg005 = 0;  //그리드 위치 상태 
var save_All_Sta_Pjtpmg005 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pjtpmg005 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Row_Values_Pjtpmg005 = "";  //그리드에서 저장하는 위치의 key 값, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pjtpmg005 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pjtpmg005 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pjtpmg005 = 0;  //그리드 삭제 수량 
var dhxGridPjtpmg005;  //그리드 객체
var eventIdPjtpmg005 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPjtpmg005;  //DataProcessor 객체

var nowDate = "";
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPjtpmg005();
    if(cf_SetComponentsPjtpmg005()){
       cf_SetEventListenerPjtpmg005();
       cf_InitFormPjtpmg005();
       cf_SetBindingPjtpmg005();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPjtpmg005 = function() {
    gf_SetMenuPath();
    $("#saveFormPjtpmg005").validate({ errorElement: 'div', ignore: '' });
    
   //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    
    fn_Calendar();
    
    gf_ComboCode('divComboTchnlgyGrad','searchComboTchnlgyGrad','searchComboTchnlgyGrad', 'search', 'C021', '' , '', '', 'ordr', '');
};

var cf_SetComponentsPjtpmg005 = function() {
	
	
	
    var dhxGridPjtpmg005HeaderInfo = [];
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('기준년도', '100', 'center', 'str', 'ro', false, 'acmsltStdrDe', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('사원명', '120', 'center', 'str', 'ro', false, 'prtcpntNm', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('등급', '80', 'center', 'str', 'ro', false, 'tchnlgyGrad', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('구분', '100', 'center', 'str', 'ro', false, 'extrlServcAt', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('총투입M/M', '100', 'right', 'str', 'ro', false, 'totalMm', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('1월', '90', 'right', 'str', 'ro', false, 'c1', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('2월', '90', 'right', 'str', 'ro', false, 'c2', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('3월', '90', 'right', 'str', 'ro', false, 'c3', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('4월', '90', 'right', 'str', 'ro', false, 'c4', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('5월', '90', 'right', 'str', 'ro', false, 'c5', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('6월', '90', 'right', 'str', 'ro', false, 'c6', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('7월', '90', 'right', 'str', 'ro', false, 'c7', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('8월', '90', 'right', 'str', 'ro', false, 'c8', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('9월', '90', 'right', 'str', 'ro', false, 'c9', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('10월', '90', 'right', 'str', 'ro', false, 'c10', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('11월', '90', 'right', 'str', 'ro', false, 'c11', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('12월', '90', 'right', 'str', 'ro', false, 'c12', '', ''));
    dhxGridPjtpmg005HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'right', 'str', 'ro', true, 'prtcpntEmpno', '', ''));
    dhxGridPjtpmg005 = gf_MakeDhxGrid('dataListPjtpmg005', dhxGridPjtpmg005HeaderInfo, true, false, false);
    
    dhxGridPjtpmg005.setEditable(true);	
    dhxGridPjtpmg005.enableSmartRendering(false);   
    dhxGridPjtpmg005.enableColSpan(true);	  // 있어야함 없으면 안됨
    dhxGridPjtpmg005.setColSorting("na,na,na,na,na,na,na,na,na,na,na,na,na,na,na,na,na,na");
    
	dhxGridPjtpmg005.enableAutoWidth(false);
	dhxGridPjtpmg005.setColumnMinWidth(100,5); /* 크기, index값 : 앞에 컬럼 수넣음 */
	dhxGridPjtpmg005.adjustColumnSize(0);	


    return true; 
};

var cf_SetEventListenerPjtpmg005 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPjtpmg005 = gf_GridDetachEvent(dhxGridPjtpmg005, eventIdPjtpmg005);
    eventId = dhxGridPjtpmg005.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPjtpmg005();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPjtpmg005.getColumnsNum();
            var rowNum = dhxGridPjtpmg005.getRowsNum();
            var selectedId = dhxGridPjtpmg005.getSelectedRowId();
            var ind        = dhxGridPjtpmg005.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtpmg005.getRowIndex(selectedId);
            var type       = dhxGridPjtpmg005.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPjtpmg005.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPjtpmg005.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPjtpmg005.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtpmg005.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPjtpmg005.getSelectedRowId();
            var ind        = dhxGridPjtpmg005.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtpmg005.getRowIndex(selectedId);
            var type       = dhxGridPjtpmg005.getColType(ind);
            dhxGridPjtpmg005.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtpmg005.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPjtpmg005.getSelectedRowId();
            var ind        = dhxGridPjtpmg005.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtpmg005.getRowIndex(selectedId);
            var type       = dhxGridPjtpmg005.getColType(ind);
            dhxGridPjtpmg005.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtpmg005.editCell();
            }
        }
        else return true;
    });
    eventIdPjtpmg005.push(eventId);
    eventId = dhxGridPjtpmg005.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pjtpmg005SortGridList(ind, type, direction); 
    });
    eventIdPjtpmg005.push(eventId);
    eventId = dhxGridPjtpmg005.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPjtpmg005.push(eventId);
    eventId = dhxGridPjtpmg005.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdPjtpmg005.push(eventId);
    eventId = dhxGridPjtpmg005.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdPjtpmg005.push(eventId);
    eventId = dhxGridPjtpmg005.attachEvent('onRowDblClicked',function(id, ind) {
    	var rowId = dhxGridPjtpmg005.getSelectedRowId();	
    	var colLabel = dhxGridPjtpmg005.getColLabel(ind);
    	colLabel = colLabel.replace('월','');
    	
    	if(dhxGridPjtpmg005.cells(rowId,dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue() == "프리랜서"){
    		return;
    	} else if(dhxGridPjtpmg005.cells(rowId,dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue() == "정규직"){
    		return
    	} else if(dhxGridPjtpmg005.cells(rowId,dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue() == "투입공수(총계)"){
    		return;
    	} else if(dhxGridPjtpmg005.cells(rowId,dhxGridPjtpmg005.getColIndexById("extrlServcAt")).getValue() == "프리랜서"){
    		gf_DivMsgAlert("프리랜서의 경우 투입공수 팝업을 사용할 수 없습니다.");
    	} else if(!gf_IsNull(gf_FormGetValue('searchFormPjtpmg005', 'projectSn', 'text'))){
    		gf_DivMsgAlert("프로젝트로 검색한 경우 투입공수 팝업을 사용할 수 없습니다.");
    	} else {
    		if(ind > 5){
    			var prtcpntEmpno = dhxGridPjtpmg005.cells(rowId, dhxGridPjtpmg005.getColIndexById("prtcpntEmpno")).getValue();
            	var acmsltStdrDe = dhxGridPjtpmg005.cells(rowId, dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue();
            	var prtcpntNm = dhxGridPjtpmg005.cells(rowId, dhxGridPjtpmg005.getColIndexById("prtcpntNm")).getValue();
            	fn_HnfProjectPopup(prtcpntEmpno, acmsltStdrDe, prtcpntNm, colLabel);
    		} else {
    			var prtcpntEmpno = dhxGridPjtpmg005.cells(rowId, dhxGridPjtpmg005.getColIndexById("prtcpntEmpno")).getValue();
            	var acmsltStdrDe = dhxGridPjtpmg005.cells(rowId, dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue();
            	var prtcpntNm = dhxGridPjtpmg005.cells(rowId, dhxGridPjtpmg005.getColIndexById("prtcpntNm")).getValue();
            	var colLabel = '';
            	fn_HnfProjectPopup(prtcpntEmpno, acmsltStdrDe, prtcpntNm,colLabel);
    		}
    		
    	}
    	
    	if(dhxGridPjtpmg005.cells(rowId,dhxGridPjtpmg005.getColIndexById("extrlServcAt")).getValue() == "프리랜서"){
    		gf_DivMsgAlert("프리랜서의 경우 투입공수 팝업을 사용할 수 없습니다.");
    	}
    	
	});
    eventIdPjtpmg005.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPjtpmg005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddPjtpmg005()
    });
    $('#btnSavePjtpmg005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePjtpmg005();
    });
    $('#btnRemovePjtpmg005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePjtpmg005();
    });
    $('#btnExcelPjtpmg005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPjtpmg005();
    });
    $('#btnSearchPjtpmg005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPjtpmg005('');
    });
    $('#btnResetPjtpmg005').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPjtpmg005();
    });
    $('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormPjtpmg005","empno","empNm",'', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
  //사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPjtpmg005', 'empNm', '', 'text');
		}
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPjtpmg005', 'empno', '', 'text');
		}
    });
	$('#btnProjectSearch').unbind('click').bind('click', function() {
        fn_ProjectList('formPop1','','', '',fn_CallbackProjectPopup);
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllPjtpmg005').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var nRows =dhxGridPjtpmg005.getRowsNum();
        for(var i = 0; i <nRows; i++) {
            dhxGridPjtpmg005.selectRow(i);
        }
        gf_DhxCheckAllGridHeader(dhxGridPjtpmg005, $('#checkAllPjtpmg005').prop('checked'), 'chk');
    });
    $('#searchFormPjtpmg005 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "empno"){
        		fn_SearchMhsEmpEmpCode();
        		return false;
        	}
        	if(this.id == "empNm"){
        		fn_SearchMhsEmpEmpCode();
        		return false;
        	}
        	$('#btnSearchPjtpmg005').click(); event.preventDefault(); return true; 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPjtpmg005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    
    
};

var cf_InitFormPjtpmg005 = function() {
    $('#searchFormPjtpmg005').resetForm();
    $('#applcYy').val(nowDate.substring(0,4));
   // gf_SetDataAuthorSe();
};

var cf_SetBindingPjtpmg005 = function() {
    fn_SearchPjtpmg005('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchPjtpmg005 = function(userId) {
    var jsonParameter = {
    		applcYy : gf_FormGetValue('searchFormPjtpmg005', 'applcYy', 'text'),
    		prtcpntNm : gf_FormGetValue('searchFormPjtpmg005', 'empNm', 'text'),
    		tchnlgyGrad : gf_FormGetValue('searchFormPjtpmg005', 'searchComboTchnlgyGrad', 'combo'),
    		extrlServcAt : gf_FormGetValue('searchFormPjtpmg005', 'extrlServcAt', 'combo'),
    		projectSn : gf_FormGetValue('searchFormPjtpmg005', 'projectSn', 'text')
    };
    gf_Transaction(userId, 'pjtpmg005/searchPjtpmg005', jsonParameter, 'fn_CallbackSearchPjtpmg005', false, 'GET');
};

var fn_CallbackSearchPjtpmg005 = function(strSvcID, targetID, data) {
	var cnt = data.data.records.length;
    //dhxGridPjtpmg005.clearAll();
    dhxGridPjtpmg005.destructor();
    if(cf_SetComponentsPjtpmg005()){ 
        fn_DhxDataProcessorPjtpmg005(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPjtpmg005');
            dhxGridPjtpmg005.parse(data.data.records, 'js');
 
            if(save_Row_Num_Pjtpmg005 == 0 && save_All_Sta_Pjtpmg005 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPjtpmg005.selectRow(0); 
            } else if(save_Row_Sta_Pjtpmg005 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPjtpmg005.selectRow(0);
            } else if(save_All_Sta_Pjtpmg005 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPjtpmg005.selectRow(save_Row_Num_Pjtpmg005); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPjtpmg005.selectRow(save_Row_Num_Pjtpmg005);   //개발자 수정 필요  
                //var findCell = dhxGridPjtpmg005.findCell(save_Row_Values_Pjtpmg005, gf_GetDhxGridColumId(dhxGridPjtpmg005,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPjtpmg005.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPjtpmg005.selectRow(0);
                //} 
            } 
            
            dhxGridPjtpmg005.forEachRow(function(id){
            var row='';
            if(id == 1 && dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue() == "정규직"){
                dhxGridPjtpmg005.setColspan(1,1,4);
                row = 3;
            }
            if(id == 1 && dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue() == "프리랜서"){
                dhxGridPjtpmg005.setColspan(1,1,4);
                row = 3;
            }
            if(id == 2 && dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue() == "프리랜서"){
                dhxGridPjtpmg005.setColspan(2,1,4);
                row = 4;
            }
            if(id == 3 && dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue() == "투입공수(총계)"){
                dhxGridPjtpmg005.setColspan(3,1,4);
                row = 4;
                cnt = cnt-3;
            }
            if(id == 2 && dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue() == "투입공수(총계)"){
                dhxGridPjtpmg005.setColspan(2,1,4);
                row = 3;
                cnt = cnt-2;
            }
            if(id >= row) {            
    			if( dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c1")).getValue() > 1 ){ 
    				dhxGridPjtpmg005.setCellTextStyle(id,6,"color:RED;");	   
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c2")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,7,"color:RED;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c3")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,8,"color:RED;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c4")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,9,"color:RED;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c5")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,10,"color:RED;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c6")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,11,"color:RED;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c7")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,12,"color:RED;");	
    			}
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c8")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,13,"color:RED;");	
    			}
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c9")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,14,"color:RED;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c10")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,15,"color:RED;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c11")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,16,"color:RED;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c12")).getValue() > 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,17,"color:RED;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c1")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,6,"color:BLUE;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c2")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,7,"color:BLUE;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c3")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,8,"color:BLUE;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c4")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,9,"color:BLUE;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c5")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,10,"color:BLUE;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c6")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,11,"color:BLUE;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c7")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,12,"color:BLUE;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c8")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,13,"color:BLUE;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c9")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,14,"color:BLUE;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c10")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,15,"color:BLUE;");	
    			}
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c11")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,16,"color:BLUE;");	
    			} 
    			if(dhxGridPjtpmg005.cells(id,dhxGridPjtpmg005.getColIndexById("c12")).getValue() < 1){
    				dhxGridPjtpmg005.setCellTextStyle(id,17,"color:BLUE;");	
    			}
            }
    		});
            
            if(data.data.records.length == 1 && dhxGridPjtpmg005.cells(1,dhxGridPjtpmg005.getColIndexById("acmsltStdrDe")).getValue() == "투입공수(총계)"){
            	dhxGridPjtpmg005.clearAll();
            	gf_NoFoundDataOnGridMsg('dataListPjtpmg005');
            }
            
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListPjtpmg005');
        }
        $("#spanCntSearchFormPjtpmg005").text(cnt);
        cf_SetEventListenerPjtpmg005();
    } 
};

var fn_DhxDataProcessorPjtpmg005 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPjtpmg005 = new dataProcessor(gv_ContextPath+'/pjtpmg005/savePjtpmg005'); //lock feed url
    dhxDataProcessorPjtpmg005.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPjtpmg005.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPjtpmg005.init(dhxGridPjtpmg005); //link dataprocessor to the grid
    dhxDataProcessorPjtpmg005.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPjtpmg005.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPjtpmg005.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPjtpmg005();
                    $("#checkAllPjtpmg005").prop('checked', false); //상단 체크박스 해제
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
var fn_AddPjtpmg005 = function() {
    dhxGridPjtpmg005.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    dhxGridPjtpmg005.addRow(dhxGridPjtpmg005.uid(), initValueArr, 0);
    dhxGridPjtpmg005.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPjtpmg005');
    $('#btnPopEmpSearchPjtpmg005').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pjtpmg005SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPjtpmg005, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPjtpmg005', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPjtpmg005', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPjtpmg005, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPjtpmg005.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPjtpmg005', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPjtpmg005', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtpmg005, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPjtpmg005.setSortImgState(false); 
            gf_FormSetValue('searchFormPjtpmg005', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPjtpmg005', 'sortColumId', '', 'text'); 
            dhxGridPjtpmg005.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPjtpmg005.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPjtpmg005', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPjtpmg005', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtpmg005, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePjtpmg005 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pjtpmg005 = 0; 
    save_Edt_Cnt_Pjtpmg005 = 0; 
    save_Del_Cnt_Pjtpmg005 = 0; 
    dhxGridPjtpmg005.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPjtpmg005.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPjtpmg005.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pjtpmg005 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pjtpmg005 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pjtpmg005 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        if(fn_GridValidation(dhxGridPjtpmg005, dhxDataProcessorPjtpmg005)) {
            var confirmMsg  = ""; 
            var confirmMsg1 = ""; 
            var confirmMsg2 = ""; 
            var confirmMsg3 = ""; 
            save_All_Sta_Pjtpmg005 = 0; 
            if(save_Add_Cnt_Pjtpmg005 > 0){
                confirmMsg1 = "신규 " + save_Add_Cnt_Pjtpmg005 + "건";
                save_All_Sta_Pjtpmg005 = 1; 
            } 
            if(save_Edt_Cnt_Pjtpmg005 > 0){ 
                confirmMsg2 = "수정 " + save_Edt_Cnt_Pjtpmg005 + "건"; 
            } 
            if(save_Del_Cnt_Pjtpmg005 > 0){ 
                confirmMsg3 = "삭제 " + save_Del_Cnt_Pjtpmg005 + "건"; 
                save_All_Sta_Pjtpmg005 = 1; 
            } 
            if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
                confirmMsg1 = confirmMsg1 + ", ";
            }
            if(confirmMsg2 != "" && confirmMsg3 != ""){
                confirmMsg2 = confirmMsg2 + ", ";
            }
            confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
            
            //if(confirmModalPjtpmg005(gv_QueSave)){  //여기는 안옴 
            if(confirmModalPjtpmg005(confirmMsg)){  //여기는 안옴 
            } else { 
                return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
            } 
        } 
    }
}
var confirmModalPjtpmg005 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePjtpmg005_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePjtpmg005_Send = function() {
    //if(fn_GridValidation(dhxGridPjtpmg005, dhxDataProcessorPjtpmg005)) {
        dhxDataProcessorPjtpmg005.sendData();
    //}
}
/**
 * 삭제
 */
var fn_RemovePjtpmg005 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPjtpmg005, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridPjtpmg005.forEachRow(function(rowId) {
            state = dhxDataProcessorPjtpmg005.getState(rowId);
            if(dhxGridPjtpmg005.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtpmg005, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridPjtpmg005.getRowIndex(rowId);
                    dhxGridPjtpmg005.deleteRow(rowId);
                    dhxGridPjtpmg005.selectRow(rowNum);
                }
                else dhxDataProcessorPjtpmg005.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPjtpmg005 = function () {
    var titPjtpmg005 = '개인별투입현황'; /* gf_LocaleTrans('default', 'titPjtpmg005') */
    var jsonParameter = {
		applcYy : gf_FormGetValue('searchFormPjtpmg005', 'applcYy', 'text'),
		prtcpntNm : gf_FormGetValue('searchFormPjtpmg005', 'empNm', 'text'),
		tchnlgyGrad : gf_FormGetValue('searchFormPjtpmg005', 'searchComboTchnlgyGrad', 'combo'),
		extrlServcAt : gf_FormGetValue('searchFormPjtpmg005', 'extrlServcAt', 'combo'),
		projectSn : gf_FormGetValue('searchFormPjtpmg005', 'projectSn', 'text')
    };
    var header = [[
		'기준년도',
        '사원명',
        '등급',
        '구분',
        '총투입M/M',
        '1월',
        '2월',
        '3월',
        '4월',
		'5월',
		'6월',
		'7월',
		'8월',
		'9월',
		'10월',
		'11월',
		'12월'
    ]];
    var dataId = [[ 
		'acmsltStdrDe',
		'prtcpntNm',
		'tchnlgyGrad',
		'extrlServcAt',
		'totalMm',
		'c1',
		'c2',
		'c3',
		'c4',
		'c5',
		'c6',
		'c7',
		'c8',
		'c9',
		'c10',
		'c11',
		'c12'
 	]];
    var dataAlign = [[ 'center','center','center','center','right','right','right','right','right','right','right','right','right','right','right','right','right', ]];
    var sheetNm = [[ titPjtpmg005 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPjtpmg005;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pjtpmg005/excelPjtpmg005', jsonParameter);
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
}
/**
 * 중복데이터 db 체크
 */
/*var fn_CheckDupPjtpmg005 = function(){
    if() {
        var jsonParameter = {

        };
        var dataSource = gf_NoAsyncTransaction('pjtpmg005/findPjtpmg005', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if() {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}*/
/**
 * 그리드 validation
 */
/*var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Pjtpmg005 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Pjtpmg005 = 0;
        save_Row_Ids_Pjtpmg005 = "";
        save_Row_Values_Pjtpmg005 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Pjtpmg005 = rowNum;
        save_Row_Ids_Pjtpmg005 = "";  
        save_Row_Values_Pjtpmg005 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pjtpmg005 = rowNum;
        save_Row_Ids_Pjtpmg005 = rowIds; 
        save_Row_Values_Pjtpmg005 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    if(!gf_IsNull()) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            if(() && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupPjtpmg005(  )){
                            validFalseDuplicationKey = true;
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
        dhxGridPjtpmg005.selectRowById(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}*/
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

var fn_Calendar = function(){

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#applcYy').yearpicker({
        year: currentYear,
        startYear: startYear,
        endYear: endYear
      });
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

//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormPjtpmg005', 'empno', 'text'),
		    korNm : gf_FormGetValue('searchFormPjtpmg005', 'empNm', 'text'),
		    bplcCode : gf_FormGetValue('searchFormPjtpmg005', 'searchComboStmBizplc', 'combo'), //사업장
	};
	
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
	
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormPjtpmg005', 'empno', data.empno, 'text');
 		gf_FormSetValue('searchFormPjtpmg005', 'empNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormPjtpmg005","empno","empNm", '' , "Y", null);
  	}
}

//선택인력 상세팝업
var fn_HnfProjectPopup = function (prtcpntEmpno, acmsltStdrDe, prtcpntNm, monthDe) {

	var userId = ""; 
	var title  = "투입공수";
	var customerInfo = "customerInfo";
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	if(typeof prtcpntEmpno == "undefined" || prtcpntEmpno == null){
		prtcpntEmpno = "";
    }
	if(typeof acmsltStdrDe == "undefined" || acmsltStdrDe == null){
		acmsltStdrDe = "";
    }
	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='hnfProjectPopup']").size() <= 0) {
		$('body').append("<div id='hnfProjectPopup' prtcpntEmpno='" + prtcpntEmpno + "' acmsltStdrDe='"+ acmsltStdrDe +"' prtcpntNm='"+ prtcpntNm +"' monthDe='"+ monthDe + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#hnfProjectPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'hnfProjectPopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg005/popup/pjtpmg005Popup/view';
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 380;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#hnfProjectPopup .b-close').click();
				cf_SetEventListenerPjtpmg005();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($customerInfo);
			}
			
			contractCompanyDhxWindows.unload();
			$('body').find("div[id='hnfProjectPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//메뉴 팝업창 
var $projectInfo = {};  //공통코드 
var fn_ProjectList = function (formId, codeId, codeNmId, param,strCallbackFunc) {
	
	var title  = "프로젝트조회";
	
	$projectInfo = {};
	
	var dhxWindowObj;
	var dhxWindowsProjectList;
	var callbacks = $.Callbacks();
    var callFunction = null;
    
    if ( !gf_IsNull(strCallbackFunc) ) {
        if(typeof(strCallbackFunc) == "string"){
                callFunction = eval(strCallbackFunc);
                if ( typeof callFunction != "function" ) {
                    gf_DivMsgAlert("call back function "+ strCallbackFunc +" 이 구현되지 않습니다.!!");
                    return false;
                }
        }else{
                callFunction = strCallbackFunc;
        }
    }   
	if($('body').find("div[id='bpopupProjectList']").size() <= 0) {
		$('body').append("<div id='bpopupProjectList' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	
	$('#bpopupProjectList').bPopup({
		onOpen:function(){
			
			dhxWindowsProjectList = new dhtmlXWindows();
			var id 		= 'bpopupProjectList';
			var ajaxUrl = gv_ContextPath+'/pjtpmg005/popup/pjtpmg005ProjectListPopup/view?'+param;
			var left	= 500;
			var top		= 500;
			var width	= 750;
			var height	= 550;
			
			dhxWindowObj = dhxWindowsProjectList.createWindow(id, left, top, width, height);
			dhxWindowsProjectList.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupProjectList .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
                callbacks.empty();
                callbacks.add(callFunction);
                callbacks.fire($projectInfo);
            }
			dhxWindowsProjectList.unload();
			$('body').find("div[id='bpopupProjectList']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};

var fn_CallbackProjectPopup = function(data) {
    gf_FormSetValue('searchFormPjtpmg005', 'projectNm', data.projectNm, 'text');
    gf_FormSetValue('searchFormPjtpmg005', 'projectSn', data.projectSn, 'text');
};
