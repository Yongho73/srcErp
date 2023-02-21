/**
 *    프로그램       : 프로그램ID  관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.02.22
 *    사용테이블      : STM_PROGRM
 *    첨부파일       :
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!                                                     
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
var keyDuplication = false;

var save_Row_Num_StmProgrm = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_StmProgrm = 0;  //그리드 위치 상태 
var save_All_Sta_StmProgrm = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_StmProgrm = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_StmProgrm = 0;  //그리드 추가 수량 
var save_Edt_Cnt_StmProgrm = 0;  //그리드 저장 수량 
var save_Del_Cnt_StmProgrm = 0;  //그리드 삭제 수량 

var eventIds = [];
var dhxGridStmProgrm;
var dhxDataProcessorStmProgrm;  //DataProcessor 객체
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmProgrm();
    if(cf_SetComponentsStmProgrm()){
	    cf_SetEventListenerStmProgrm();
	    cf_InitFormStmProgrm();
	    cf_SetBindingStmProgrm();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamStmProgrm = function() {
    gf_SetMenuPath();
    $('#saveFormStmProgrm').validate({ errorElement: 'div', ignore: '' });
    // 페이징 환경설정 적용
    gf_SettingPgngUnit('pageingFormStmProgrm'); 
    
    gf_ComboCode('divComboSubjectNm', 'subjectNm', 'subjectNm', 'search', 'C001', '' , '', '', 'ordr', '','',''); //업무구분 
    gf_ComboCode('divComboPckageNmSaveFormStmProgrm', 'pckageNmSaveFormStmProgrm', 'pckageNmSaveFormStmProgrm', 'add', 'C001', '' , '', '', 'asc', 'required');
    
};

var cf_SetComponentsStmProgrm = function() {
    var dhxGridStmProgrmHeaderInfo = [];
    dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'rnum', '', '')); /* 번호 */
    dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmProgrm" />', '50', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* 선택  */
    dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('프로그램ID', '110', 'center', 'str', 'ro', false, 'progrmId', '', '')); /* gf_LocaleTrans('default', 'titProgrmId') */
    dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('프로그램명', '*', 'left', 'str', 'ro', false, 'progrmNm', '', '')); /* gf_LocaleTrans('default', 'titProgrmNm') */
    dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('설명', '150', 'left', 'str', 'ro', false, 'progrmDc', '', '')); /* gf_LocaleTrans('default', 'titProgrmDc') */
    //dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('메뉴코드', '100', 'left', 'str', 'ro', false, 'menuId', '', '')); /* gf_LocaleTrans('default', 'titMenuId') */
    //dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('경로', '100', 'left', 'str', 'ro', false, 'url', '', '')); /* gf_LocaleTrans('default', 'titUrl') */
    //dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('파일명', '100', 'left', 'str', 'ro', false, 'fileNm', '', '')); /* gf_LocaleTrans('default', 'titFileNm') */
    dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('패키지', '80', 'center', 'str', 'coro', false, 'pckageNm', '', '')); /* gf_LocaleTrans('default', 'titPckageNm') */
    dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('서브 패키지', '100', 'center', 'str', 'ro', false, 'subPckageId', '', '')); /* gf_LocaleTrans('default', 'titSubPckageId') */
    dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('관련테이블', '150', 'left', 'str', 'ro', false, 'relTblNm', '', '')); /* gf_LocaleTrans('default', 'titRelTblNm') */
    dhxGridStmProgrmHeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '80', 'left', 'na', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titRelTblNm') */
    dhxGridStmProgrm = gf_MakeDhxGrid('dataListStmProgrm', dhxGridStmProgrmHeaderInfo, true, false, false); 
    dhxGridStmProgrm.enableAutoWidth(false);
    dhxGridStmProgrm.setEditable(true);
    
    dhxGridStmProgrm.setColumnMinWidth(100,3);
    
    var jsonParameter = {codekindCode : "C001",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridStmProgrm, dhxGridStmProgrm.getColIndexById("pckageNm"), dataSource.data); /* 그리드콤보*/
    return true; 
};

var cf_SetEventListenerStmProgrm = function() {
    // 그리드 이벤트
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridStmProgrm, eventIds);    
    
    eventId = dhxGridStmProgrm.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
        	fn_ExcelStmProgrm
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmProgrm.getColumnsNum();
            var rowNum = dhxGridStmProgrm.getRowsNum();
            var selectedId = dhxGridStmProgrm.getSelectedRowId();
            var ind        = dhxGridStmProgrm.getSelectedCellIndex();
            var rowIndex   = dhxGridStmProgrm.getRowIndex(selectedId);
            var type       = dhxGridStmProgrm.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmProgrm.selectRow(0);
                    //fn_FindStmProgrm();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmProgrm.selectRow(rowIndex + 1);
                    fn_FindStmProgrm();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmProgrm.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmProgrm.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmProgrm.getSelectedRowId();
            var ind        = dhxGridStmProgrm.getSelectedCellIndex();
            var rowIndex   = dhxGridStmProgrm.getRowIndex(selectedId);
            var type       = dhxGridStmProgrm.getColType(ind);
            dhxGridStmProgrm.selectCell(rowIndex+1, ind);
            fn_FindStmProgrm();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmProgrm.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmProgrm.getSelectedRowId();
            var ind        = dhxGridStmProgrm.getSelectedCellIndex();
            var rowIndex   = dhxGridStmProgrm.getRowIndex(selectedId);
            var type       = dhxGridStmProgrm.getColType(ind);
            dhxGridStmProgrm.selectCell(rowIndex-1, ind);
            fn_FindStmProgrm();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmProgrm.editCell();
            }
        }
        else return true;
    });
    eventIds.push(eventId);
    
    // 그리드 sorting
    eventId = dhxGridStmProgrm.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬 
        gf_errorMsgClear();   	    	
    	return fn_SortGridList(ind, type, direction);
    });
    eventIds.push(eventId);    

    eventId = dhxGridStmProgrm.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        gf_errorMsgClear();
        fn_FindStmProgrm();
    });
    eventIds.push(eventId);
    eventId = dhxGridStmProgrm.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	if(cInd == 1) return true;
        else return false;
    });
    eventIds.push(eventId);
    // 버튼 이벤트
    $('#btnAddStmProgrm').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddStmProgrm()
    });
    $('#btnSaveStmProgrm').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmProgrm();
    });
    $('#btnRemoveStmProgrm').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmProgrm();
    });
    $('#btnExcelStmProgrm').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmProgrm();
    });
    $('#btnSearchStmProgrm').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    	// 재조회시 정렬 초기화
    	fn_InitGridSort();
    	fn_SearchStmProgrm('1', '');
    });
    $('#btnResetStmProgrm').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        cf_InitFormStmProgrm();
    });
    // 기타 이벤트
    $('#searchFormStmProgrm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmProgrm').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    });
    $('#saveFormStmProgrm').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    
    $('#saveFormStmProgrm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormStmProgrm",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    
    $('#checkAllStmProgrm').unbind('click').bind('click',function() {
        gf_DhxCheckAllGridHeader(dhxGridStmProgrm, $('#checkAllStmProgrm').prop('checked'), 'selYn');
    });

    $('#pageingFormStmProgrm select[name="pageRowSize"]').unbind('change').bind('change', function() {
    	$('#btnSearchStmProgrm').click();
    });
    
    $('#saveFormStmProgrm input[name="progrmId"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmProgrm, dhxDataProcessorStmProgrm, 'progrmId', $(this).val());
    });
    $('#saveFormStmProgrm input[name="progrmNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmProgrm, dhxDataProcessorStmProgrm, 'progrmNm', $(this).val());
    });
    $('#saveFormStmProgrm input[name="progrmDc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmProgrm, dhxDataProcessorStmProgrm, 'progrmDc', $(this).val());
    });
    
    $('#saveFormStmProgrm select[name="pckageNmSaveFormStmProgrm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmProgrm, dhxDataProcessorStmProgrm, 'pckageNm', $(this).val());
    });

    $('#saveFormStmProgrm input[name="subPckageId"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmProgrm, dhxDataProcessorStmProgrm, 'subPckageId', $(this).val());
    });
    $('#saveFormStmProgrm input[name="relTblNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmProgrm, dhxDataProcessorStmProgrm, 'relTblNm', $(this).val());
    });
    
    $('#saveFormStmProgrm input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var useAt = gf_IsNull(gf_FormGetValue('saveFormStmProgrm', 'useAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridStmProgrm, dhxDataProcessorStmProgrm, 'useAt', useAt);
    });
};

var cf_InitFormStmProgrm = function() {    
	$('#searchFormStmProgrm').clearForm();
	gf_FormSetValue('searchFormStmProgrm', 'useAtSearch', 1, 'combo');
	gf_FormSetValue('searchFormStmProgrm', 'subjectNm', "", 'combo');
};

var cf_SetBindingStmProgrm = function() {
    fn_SearchStmProgrm('1', '');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmProgrm = function(pageNum, progrmId) {
    
	var pageingCnt = gf_FormGetValue('pageingFormStmProgrm', 'pageRowSize', 'combo');
	var page = pageNum;
	if(gf_IsNull(pageingCnt)) pageingCnt = 20;
	if(gf_IsNull(page)) page = 1;
	gf_FormSetValue('searchFormStmProgrm', 'selectedPageNum', page, 'text');
	
	var jsonParameter = {
        progrmId : gf_FormGetValue('searchFormStmProgrm', 'progrmId', 'text'),
        progrmNm : gf_FormGetValue('searchFormStmProgrm', 'progrmNm', 'text'),
        sortDirection : gf_FormGetValue('searchFormStmProgrm', 'sortDirection', 'text'),
		sortColumId : gf_FormGetValue('searchFormStmProgrm', 'sortColumId', 'text'),
		subjectNm : gf_FormGetValue('searchFormStmProgrm', 'subjectNm', 'combo'), 
        useAt : gf_FormGetValue('searchFormStmProgrm', 'useAtSearch', 'combo'),
        pageingCnt : pageingCnt,
        pageNum : page
    };
    gf_Transaction(progrmId, 'stmmng007/searchStmProgrm', jsonParameter, 'fn_CallbackSearchStmProgrm', false, 'GET');
};

var fn_CallbackSearchStmProgrm = function(strSvcID, targetID, data) {
    
	//dhxGridStmProgrm.clearAll();
	dhxGridStmProgrm.destructor();
	if(cf_SetComponentsStmProgrm()){
		fn_DhxDataProcessorStmProgrm();
	    if(!gf_IsNull(data.data.records)){
	        gf_NoFoundDataOnGridMsgRemove('dataListStmProgrm');
	        dhxGridStmProgrm.parse(data.data.records, 'js');
	         
	        if(!gf_IsNull(strSvcID)) {     
	        	var findCell = dhxGridStmProgrm.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridStmProgrm,'progrmId'), true);         	
	        	if(!gf_IsNull(findCell)) {
	        		dhxGridStmProgrm.selectRowById(findCell[0][0]);        	
	        	} else {
	        		dhxGridStmProgrm.selectRow(0);
	        	}
	        } else {
	        	dhxGridStmProgrm.selectRow(0);	
	        }
	
	        fn_FindStmProgrm();
	        
	        // 정렬 컬럼이 있으면 정렬 상태 유지
	    	var sortOrder = gf_FormGetValue('searchFormStmProgrm', 'sortDirection','text');
	    	var sortColumId = gf_FormGetValue('searchFormStmProgrm', 'sortColumId','text');
	    	
	    	if(!gf_IsNull(sortOrder) && !gf_IsNull(sortColumId)) {
	    		dhxGridStmProgrm.setSortImgState(true, gf_GetDhxGridColumId(dhxGridStmProgrm, sortColumId), sortOrder);    		 
	    	}
	 
	    } else {
	        gf_NoFoundDataOnGridMsg('dataListStmProgrm');
	        $('#btnAddStmProgrm').click();
	    }
	    $('#spanCntStmProgrm').text(gf_NumberWithCommas(data.data.totalRecordCount));
	    
	    // 페이징 버튼 생성
		gf_PageNate(data.data,'.paging','fn_SearchStmProgrm');
	    cf_SetEventListenerStmProgrm();
	}
};
var fn_DhxDataProcessorStmProgrm = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmProgrm = new dataProcessor(gv_ContextPath+'/stmmng007/saveStmProgrmNew'); //lock feed url
    dhxDataProcessorStmProgrm.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmProgrm.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmProgrm.init(dhxGridStmProgrm); //link dataprocessor to the grid
    dhxDataProcessorStmProgrm.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmProgrm.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmProgrm.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if( (dataSource.code == "999" && !gf_IsNull(dataSource.message)) || (dataSource.data.code == "999" && !gf_IsNull(dataSource.data.message))){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                	if(!gf_IsNull(dataSource.data.message)){ 
                		gf_DivMsgAlert(dataSource.data.message);
                	} else {
                		gf_DivMsgAlert(dataSource.message);
                	}
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmProgrm(gf_FormGetValue('searchFormStmProgrm', 'selectedPageNum', 'text'), '');
                    $("#checkAllStmProgrm").prop('checked', false); //상단 체크박스 해제
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
/*
var fn_SelectedStmProgrm = function () {
    if(!fadeMode) {
        $('#saveFormStmProgrm').fadeOut(gv_FadeTime, function() {
            fn_FindStmProgrm();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveFormStmProgrm').fadeIn(gv_FadeTime, function() {});
     } else {
         fn_FindStmProgrm();
     }
};*/

var fn_FindStmProgrm = function() {
	var rId = dhxGridStmProgrm.getSelectedRowId();
    var status = dhxDataProcessorStmProgrm.getState(rId);
    /*
    var progrmId = dhxGridStmProgrm.cells(rId, gf_GetDhxGridColumId(dhxGridStmProgrm,'progrmId')).getValue();
    if (!gf_IsNull(progrmId)) {
        var jsonParameter = {
            progrmId : progrmId
        };
        var dataSource = gf_NoAsyncTransaction('stmmng007/findStmProgrm', jsonParameter, 'GET');
        var data = dataSource.data;
        gf_FormSetValue('saveFormStmProgrm', 'progrmId', data.progrmId, 'text');
        gf_FormSetValue('saveFormStmProgrm', 'progrmNm', data.progrmNm, 'text');
        gf_FormSetValue('saveFormStmProgrm', 'progrmDc', data.progrmDc, 'text');
        gf_FormSetValue('saveFormStmProgrm', 'menuId', data.menuId, 'text');
        gf_FormSetValue('saveFormStmProgrm', 'url', data.url, 'text');
        gf_FormSetValue('saveFormStmProgrm', 'fileNm', data.fileNm, 'text');
        
        //gf_FormSetValue('saveFormStmProgrm', 'pckageNm', data.pckageNm, 'text');
        gf_FormSetValue("saveFormStmProgrm", "pckageNmSaveFormStmProgrm", data.pckageNm, 'combo');
        
        gf_FormSetValue('saveFormStmProgrm', 'subPckageId', data.subPckageId, 'text');
        gf_FormSetValue('saveFormStmProgrm', 'relTblNm', data.relTblNm, 'text');
        gf_FormSetValue('saveFormStmProgrm', 'useAt', (( data.useAt == '1') ? true : false), 'chkbox');
        $('#saveFormStmProgrm input[name="progrmId"]').attr('disabled', 'disabled');
        // 수정시 그리드 정보 업데이트 
        gf_DhxSetValue(dhxGridStmProgrm, rId, 'progrmId', data.progrmId, 'grid');
        gf_DhxSetValue(dhxGridStmProgrm, rId, 'progrmNm', data.progrmNm, 'grid');
        gf_DhxSetValue(dhxGridStmProgrm, rId, 'url', data.url, 'grid');
        gf_DhxSetValue(dhxGridStmProgrm, rId, 'pckageNm', data.pckageNm, 'grid');
        gf_DhxSetValue(dhxGridStmProgrm, rId, 'subPckageId', data.subPckageId, 'grid');
        gf_DhxSetValue(dhxGridStmProgrm, rId, 'relTblNm', data.relTblNm, 'grid');
    }
    modifyAt = true;
    keyDuplication = false;
    */
    
    gf_FormSetValue("saveFormStmProgrm", "progrmId", gf_DhxGetValue(dhxGridStmProgrm, rId, 'progrmId',  'grid'), '');
    gf_FormSetValue("saveFormStmProgrm", "progrmNm", gf_DhxGetValue(dhxGridStmProgrm, rId, 'progrmNm',  'grid'), '');
    gf_FormSetValue("saveFormStmProgrm", "progrmDc", gf_DhxGetValue(dhxGridStmProgrm, rId, 'progrmDc',  'grid'), '');
    gf_FormSetValue("saveFormStmProgrm", "pckageNmSaveFormStmProgrm", gf_DhxGetValue(dhxGridStmProgrm, rId, 'pckageNm',  'grid'), 'combo');
    gf_FormSetValue("saveFormStmProgrm", "subPckageId", gf_DhxGetValue(dhxGridStmProgrm, rId, 'subPckageId',  'grid'), '');
    gf_FormSetValue("saveFormStmProgrm", "relTblNm", gf_DhxGetValue(dhxGridStmProgrm, rId, 'relTblNm',  'grid'), '');
    gf_FormSetValue('saveFormStmProgrm', 'useAt', (( gf_DhxGetValue(dhxGridStmProgrm, rId, 'useAt',  'grid') == '1') ? true : false), 'chkbox');
    
    if(status == 'inserted') {
        $('#saveFormStmProgrm input[name="progrmId"]').prop('disabled', false);
    } else {
        $('#saveFormStmProgrm input[name="progrmId"]').prop('disabled', true);
    }
};

/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmProgrm = function() {
    modifyAt = false;    
    $('#saveFormStmProgrm').clearForm();
    gf_FormSetValue("saveFormStmProgrm", "pckageNmSaveFormStmProgrm", "", 'combo');
    gf_FormSetValue("saveFormStmProgrm", "useAt", "1", 'chkbox');
    $('#saveFormStmProgrm input[name="progrmId"]').removeAttr('disabled');
};

/**
 * 데이터 중복 체크
 */
var fn_CheckDupStmProgrm = function(){
    var progrmId = gf_FormGetValue('saveFormStmProgrm', 'progrmId', 'text');
    if(gf_IsNull(progrmId)) {
        gf_DivMsgAlert('프로그램ID를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titprogrmId') */
        return false;
    }
    var jsonParameter = {
        progrmId : progrmId
    };
    var dataSource = gf_NoAsyncTransaction('stmmng007/findStmProgrm', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.progrmId)) {
            keyDuplication = false;
            return true;
        } else {
            gf_DivMsgAlert('프로그램ID가 존재합니다.'); /* gf_LocaleTrans('default', 'titprogrmId') */
            keyDuplication = true;
            return false;
        }
    } else {
        gf_DivMsgAlert('중복확인이 되지 않습니다.');
        return false;
    }    
};

var fn_CheckDupStmProgrmNew = function(progrmId){
    if(gf_IsNull(progrmId)) {
        gf_DivMsgAlert('프로그램ID를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titprogrmId') */
        return false;
    }
    var jsonParameter = {
        progrmId : progrmId
    };
    var dataSource = gf_NoAsyncTransaction('stmmng007/findStmProgrm', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.progrmId)) {
            keyDuplication = false;
            return true;
        } else {
            gf_DivMsgAlert('프로그램ID가 존재합니다.'); /* gf_LocaleTrans('default', 'titprogrmId') */
            keyDuplication = true;
            return false;
        }
    } else {
        gf_DivMsgAlert('중복확인이 되지 않습니다.');
        return false;
    }    
};

/**
 * 저장 (입력, 수정)
 */
var fn_AddStmProgrm = function() {
	dhxGridStmProgrm.clearSelection();
	/*
    if(!fadeRegs) {
        $('#saveFormStmProgrm').fadeOut(gv_FadeTime, function() {
            fn_InitInputFormStmProgrm();
            fadeRegs = true;
            fadeMode = false;
            keyDuplication = true;
            $('#btnPopEmpSearchStmProgrm').show();
        });
        $('#saveFormStmProgrm').fadeIn(gv_FadeTime, function() {});
    } else {
        fn_InitInputFormStmProgrm();
    }
    */
	fn_InitInputFormStmProgrm();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //progrmId
    initValueArr.push(''); //progrmNm
    initValueArr.push(''); //progrmDc
    initValueArr.push(''); //pckageNm
    initValueArr.push(''); //subPckageId
    initValueArr.push(''); //relTblNm
    initValueArr.push('1'); //useAt
    dhxGridStmProgrm.addRow(dhxGridStmProgrm.uid(), initValueArr, 0);
    dhxGridStmProgrm.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmProgrm');
}

/*
var fn_SaveStmProgrm = function() {    
    if($('#saveFormStmProgrm').validate().form()){
        if(keyDuplication && !fn_CheckDupStmProgrm()) return false;
        var jsonParameter = {
            progrmId : gf_FormGetValue('saveFormStmProgrm', 'progrmId', 'text'),
            progrmNm : gf_FormGetValue('saveFormStmProgrm', 'progrmNm', 'text'),
            progrmDc : gf_FormGetValue('saveFormStmProgrm', 'progrmDc', 'text'),
            menuId : gf_FormGetValue('saveFormStmProgrm', 'menuId', 'text'),
            url : gf_FormGetValue('saveFormStmProgrm', 'url', 'text'),
            fileNm : gf_FormGetValue('saveFormStmProgrm', 'fileNm', 'text'),
            pckageNm : gf_FormGetValue('saveFormStmProgrm', 'pckageNm', 'text'),
            subPckageId : gf_FormGetValue('saveFormStmProgrm', 'subPckageId', 'text'),
            relTblNm : gf_FormGetValue('saveFormStmProgrm', 'relTblNm', 'text'),
            useAt : gf_FormGetValue('saveFormStmProgrm', 'useAt', 'chkboxYN'),
            pageingCnt : gf_FormGetValue('pageingFormStmProgrm', 'pageRowSize', 'combo')
        };
        gf_Transaction(jsonParameter, 'stmmng007/saveStmProgrm', jsonParameter, 'fn_CallbackSaveStmProgrm', false, 'POST');
    }
};

var fn_CallbackSaveStmProgrm = function(strSvcID, targetID, data) {
    if(data.code === '000') {

        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));         
        
        if(modifyAt) {
        	fn_FindStmProgrm();
        } else {
        	cf_InitFormStmProgrm();
        	fn_SearchStmProgrm( (data.data.page == 0) ? '1' : data.data.page, strSvcID.progrmId );
        }

    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
*/
var fn_SaveStmProgrm = function() {
    var edCnt = 0;
    save_Add_Cnt_StmProgrm = 0; 
    save_Edt_Cnt_StmProgrm = 0; 
    save_Del_Cnt_StmProgrm = 0; 
    dhxGridStmProgrm.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmProgrm.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmProgrm.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_StmProgrm += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_StmProgrm += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_StmProgrm += 1; 
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
        save_All_Sta_StmProgrm = 0; 
        if(save_Add_Cnt_StmProgrm > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_StmProgrm + "건";
            save_All_Sta_StmProgrm = 1; 
        } 
        if(save_Edt_Cnt_StmProgrm > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_StmProgrm + "건"; 
        } 
        if(save_Del_Cnt_StmProgrm > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_StmProgrm + "건"; 
            save_All_Sta_StmProgrm = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrb000(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmProgrm(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmProgrm = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmProgrm_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmProgrm_Send = function() {
    if(fn_GridValidation(dhxGridStmProgrm, dhxDataProcessorStmProgrm)) {
        dhxDataProcessorStmProgrm.sendData();
    }
}


/**
 * 삭제
 */
var fn_RemoveStmProgrm = function() {
	/*
    var progrmIds = gf_GetCheckedGridValueArr(dhxGridStmProgrm, 'selYn', 'progrmId');
    if(gf_IsNull(progrmIds)) {
        gf_DivMsgAlert('삭제할 프로그램ID를 선택해 주세요.');
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveStmProgrmSend()', '');
    }*/
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmProgrm, 'selYn');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridStmProgrm.forEachRow(function(rowId) {
            state = dhxDataProcessorStmProgrm.getState(rowId);
            if(dhxGridStmProgrm.cells(rowId, gf_GetDhxGridColumId(dhxGridStmProgrm, 'selYn')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridStmProgrm.getRowIndex(rowId);
                    dhxGridStmProgrm.deleteRow(rowId);
                    dhxGridStmProgrm.selectRow(rowNum);
                    fn_FindStmProgrm();
                }
                else dhxDataProcessorStmProgrm.setUpdated(rowId, true, 'deleted');
            }
        });
    }
};
/*
var fn_RemoveStmProgrmSend = function() {
    var progrmIds = gf_GetCheckedGridValueArr(dhxGridStmProgrm, 'selYn', 'progrmId');
    var jsonParameter = {
        progrmIds : progrmIds.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('stmmng007/removeStmProgrm', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        fn_SearchStmProgrm('1', '');
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
*/
/**
 * 엑셀다운로드
 */
var fn_ExcelStmProgrm = function () {
    var titStmProgrm = '프로그램ID  관리'; /* gf_LocaleTrans('default', 'titStmProgrm') */
    var jsonParameter = {
        progrmId : gf_FormGetValue('searchFormStmProgrm', 'progrmId', 'text'),
        progrmNm : gf_FormGetValue('searchFormStmProgrm', 'progrmNm', 'text'),
        subjectNm : gf_FormGetValue('searchFormStmProgrm', 'subjectNm', 'combo'),
        useAt : gf_FormGetValue('searchFormStmProgrm', 'useAtSearch', 'combo'),
        searchType : 'excel'
    };
    var header = [[
        '프로그램ID' /* gf_LocaleTrans('default', 'titProgrmId') */,
        '프로그명' /* gf_LocaleTrans('default', 'titProgrmNm') */,
        '설명' /* gf_LocaleTrans('default', 'titProgrmDc') */,
        '메뉴코드' /* gf_LocaleTrans('default', 'titMenuId') */,
        '경로' /* gf_LocaleTrans('default', 'titUrl') */,
        '파일명' /* gf_LocaleTrans('default', 'titFileNm') */,
        '패키지' /* gf_LocaleTrans('default', 'titPckageNm') */,
        '서브 패키지' /* gf_LocaleTrans('default', 'titSubPckageId') */,
        '관련테이블' /* gf_LocaleTrans('default', 'titRelTblNm') */,
        '사용여부' /* gf_LocaleTrans('default', 'titRelTblNm') */
    ]];
    var dataId = [[ 'progrmId', 'progrmNm', 'progrmDc', 'menuId', 'url', 'fileNm', 'pckageNm', 'subPckageId', 'relTblNm', 'useAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmProgrm ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmProgrm;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmmng007/excelStmProgrm', jsonParameter);
};

/**
 * 그리드정렬
 */
var fn_SortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridStmProgrm, 'rnum')){    		
    	
		var sortOrder = gf_FormGetValue('searchFormStmProgrm', 'sortDirection', 'text');
    	var sortColumId = gf_FormGetValue('searchFormStmProgrm', 'sortColumId', 'text');
    	var nowSortColumId = gf_GetDhxGridColum(dhxGridStmProgrm, ind);
    	
    	/*
    	// 정렬 컬럼이 바뀌면 정렬방식 초기화
    	if(sortColumId != nowSortColumId) sortOrder = '';	    	
    	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;

    	dhxGridStmProgrm.setSortImgState(true, ind, sortOrder);
		gf_FormSetValue('searchFormStmProgrm', 'sortDirection', sortOrder, 'text');
		gf_FormSetValue('searchFormStmProgrm', 'sortColumId', gf_GetDhxGridColum(dhxGridStmProgrm, ind), 'text');
    	
    	fn_SearchStmProgrm(gf_FormGetValue('searchFormStmProgrm', 'selectedPageNum', 'text'), '');
    	*/
    	console.log(direction);
    	console.log(sortColumId);
    	console.log(nowSortColumId);
    	// 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
        	dhxGridStmProgrm.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmProgrm', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmProgrm', 'sortColumId', gf_GetDhxGridColum(dhxGridStmProgrm, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
        	dhxGridStmProgrm.setSortImgState(false); 
            gf_FormSetValue('searchFormStmProgrm', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmProgrm', 'sortColumId', '', 'text'); 
            dhxGridStmProgrm.sortRows(0,"int","desc");  //번호로 강제 정렬 
            return false; 
        } else { 
        	dhxGridStmProgrm.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmProgrm', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmProgrm', 'sortColumId', gf_GetDhxGridColum(dhxGridStmProgrm, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
    	return true; 
	}
    return false; 
}

var fn_InitGridSort = function(){
	dhxGridStmProgrm.setSortImgState(false);
	gf_FormSetValue('searchFormStmProgrm', 'sortDirection', '', 'text');
    gf_FormSetValue('searchFormStmProgrm', 'sortColumId', '', 'text');
}

/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkBcncCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_StmProgrm = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_StmProgrm == 'deleted') {
        save_Row_Num_StmProgrm = 0;
        save_Row_Ids_StmProgrm = "";
    } else if(save_Row_Sta_StmProgrm == 'inserted') {
        save_Row_Num_StmProgrm = rowNum;
        save_Row_Ids_StmProgrm = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_StmProgrm = rowNum;
        save_Row_Ids_StmProgrm = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'progrmId', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'progrmNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'pckageNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pckageNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'subPckageId', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'subPckageId');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkBcncCode = gf_DhxGetValue(dhxGridObjet, rowId, 'progrmId', 'grid');
                    if(!gf_IsNull(checkBcncCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var bcncCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'progrmId', 'grid');
                            if(((bcncCode == checkBcncCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmProgrmNew( checkBcncCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
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
        dhxGridStmProgrm.selectRowById(validFalseFistRowId);
        fn_FindStmProgrm();
        //fn_FormValidation(validFalseFistRowId);
        if($('#saveFormStmProgrm').validate().form()){
            //if(!fn_CheckDupStmProgrm()) return false;
            
            //if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();  // 중복데이터 얼럿
        }
        else {
        	return false;
        }
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
