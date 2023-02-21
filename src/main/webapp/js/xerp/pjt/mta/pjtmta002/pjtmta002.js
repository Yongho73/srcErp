/**
 *    프로그램       : 유지보수요청요약 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.14
 *    사용테이블      : PJT_MNTNCE_REQUST
 * sourceGen version : 2020.07.16.01 (2020.08.14)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pjtmta002 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pjtmta002 = 0;  //그리드 위치 상태 
var save_All_Sta_Pjtmta002 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pjtmta002 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pjtmta002 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pjtmta002 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pjtmta002 = 0;  //그리드 삭제 수량 
var dhxGridPjtmta002;  //그리드 객체
var eventIdPjtmta002 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPjtmta002;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPjtmta002();
    if(cf_SetComponentsPjtmta002()){
       cf_SetEventListenerPjtmta002();
       cf_InitFormPjtmta002();
       cf_SetBindingPjtmta002();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPjtmta002 = function() {
    gf_SetMenuPath();
    
    
  //기간달력 이벤트 추가
    $('#searchFormPjtmta002 #bgnRequstDe').unbind('click').bind('click', function(event){
        dhxCCalendarDate2.show();
    });
    $('#searchFormPjtmta002 #endRequstDe').unbind('click').bind('click', function(event){
        dhxCCalendarDate2.show();
    });
    
    dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");  
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
        if(side == "right"){
            $('#bgnRequstDe').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate())); 
            $('#endRequstDe').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
            dhxCCalendarDate2.hide();
        }
    });
    //dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormPjtProject', 'date22', 'text'));
    dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
    dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko"); 
    
    $("#saveFormPjtmta002").validate({ errorElement: 'div', ignore: '' });
};

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="bgnRequstDe" || e.target.id =="endRequstDe") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate2.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

var cf_SetComponentsPjtmta002 = function() {
    var dhxGridPjtmta002HeaderInfo = [];
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '80', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('거래처', '200', 'left', 'str', 'ro', false, 'bcncNm', '', '')); /* gf_LocaleTrans('default', 'titProjectSn') */
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('프로젝트명', '350', 'left', 'str', 'ro', false, 'projectNm', '', '')); /* gf_LocaleTrans('default', 'titProjectSn') */
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('요청', '95', 'left', 'str', 'ro', false, 'reqCnt', '', '')); /* gf_LocaleTrans('default', 'titRequstSn') */
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('해결', '95', 'left', 'str', 'ro', false, 'clearCnt', '', '')); /* gf_LocaleTrans('default', 'titRequstStep') */
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('미해결', '95', 'left', 'str', 'ro', false, 'unclearCnt', '', '')); /* gf_LocaleTrans('default', 'titRequstDt') */
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('승인', '95', 'left', 'str', 'ro', false, 'compCnt', '', '')); /* gf_LocaleTrans('default', 'titRqesterDept') */
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('진척율', '100', 'left', 'str', 'ro', false, 'prgsRt', '', '')); /* gf_LocaleTrans('default', 'titRqesterTelno') */
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('납기준수(완료일기준)', '150', 'left', 'str', 'ro', false, 'payperiodRtCompt', '', '')); /* gf_LocaleTrans('default', 'titRqesterEmail') */
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('납기준수(승인일기준)', '150', 'left', 'str', 'ro', false, 'payperiodRtConfm', '', '')); /* gf_LocaleTrans('default', 'titComptRequstDt') */
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('평균소요(완료일기준)', '150', 'left', 'str', 'ro', false, 'avgComp', '', '')); /* gf_LocaleTrans('default', 'titRequstCn') */
    dhxGridPjtmta002HeaderInfo.push(gf_MakeDhxGridHeader('평균소요(승인일기준)', '*', 'left', 'str', 'ro', false, 'avgConfm', '', '')); /* gf_LocaleTrans('default', 'titPriorRank') */
    dhxGridPjtmta002 = gf_MakeDhxGrid('dataListPjtmta002', dhxGridPjtmta002HeaderInfo, true, false, false);
    
    dhxGridPjtmta002.setEditable(true);

	dhxGridPjtmta002.enableAutoWidth(false);
	dhxGridPjtmta002.setColumnMinWidth(150,11); /* 크기, index값 : 앞에 컬럼 수넣음 */
	dhxGridPjtmta002.adjustColumnSize(0);	

 
    return true; 
};

var cf_SetEventListenerPjtmta002 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPjtmta002 = gf_GridDetachEvent(dhxGridPjtmta002, eventIdPjtmta002);
    eventId = dhxGridPjtmta002.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPjtmta002();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPjtmta002.getColumnsNum();
            var rowNum = dhxGridPjtmta002.getRowsNum();
            var selectedId = dhxGridPjtmta002.getSelectedRowId();
            var ind        = dhxGridPjtmta002.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtmta002.getRowIndex(selectedId);
            var type       = dhxGridPjtmta002.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPjtmta002.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPjtmta002.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPjtmta002.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtmta002.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPjtmta002.getSelectedRowId();
            var ind        = dhxGridPjtmta002.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtmta002.getRowIndex(selectedId);
            var type       = dhxGridPjtmta002.getColType(ind);
            dhxGridPjtmta002.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtmta002.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPjtmta002.getSelectedRowId();
            var ind        = dhxGridPjtmta002.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtmta002.getRowIndex(selectedId);
            var type       = dhxGridPjtmta002.getColType(ind);
            dhxGridPjtmta002.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtmta002.editCell();
            }
        }
        else return true;
    });
    eventIdPjtmta002.push(eventId);
    eventId = dhxGridPjtmta002.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pjtmta002SortGridList(ind, type, direction); 
    });
    eventIdPjtmta002.push(eventId);
    eventId = dhxGridPjtmta002.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPjtmta002.push(eventId);
    eventId = dhxGridPjtmta002.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdPjtmta002.push(eventId);
    eventId = dhxGridPjtmta002.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdPjtmta002.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnExcelPjtmta002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPjtmta002();
    });
    $('#btnSearchPjtmta002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPjtmta002('');
    });
    $('#btnResetPjtmta002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPjtmta002();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormPjtmta002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPjtmta002').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPjtmta002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#btnCompNmSearch').unbind('click').bind('click', function(event){
    	gf_CustomerPopup("searchFormPjtmta001","compCd","compNm", '1000', "Y", null);
    });
};

var cf_InitFormPjtmta002 = function() {
    $('#searchFormPjtmta002').resetForm();
    $('#comptAt').val('0');
};

var cf_SetBindingPjtmta002 = function() {
    fn_SearchPjtmta002('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchPjtmta002 = function(userId) {
    var jsonParameter = {
        bcncNm : gf_FormGetValue('searchFormPjtmta002', 'bcncNm', 'text'),
        sRegDt : gf_FormGetValue('searchFormPjtmta002', 'bgnRequstDe', 'text').replaceAll('-',''),
        eRegDt : gf_FormGetValue('searchFormPjtmta002', 'endRequstDe', 'text').replaceAll('-',''),
        comptAt : gf_FormGetValue('searchFormPjtmta002', 'comptAt', 'combo'),
    };
    gf_Transaction(userId, 'pjtmta002/searchPjtmta002', jsonParameter, 'fn_CallbackSearchPjtmta002', false, 'GET');
};

var fn_CallbackSearchPjtmta002 = function(strSvcID, targetID, data) {
    //dhxGridPjtmta002.clearAll();
    dhxGridPjtmta002.destructor();
    if(cf_SetComponentsPjtmta002()){ -
        fn_DhxDataProcessorPjtmta002(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPjtmta002');
            dhxGridPjtmta002.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Pjtmta002 == 0 && save_All_Sta_Pjtmta002 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPjtmta002.selectRow(0); 
            } else if(save_Row_Sta_Pjtmta002 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPjtmta002.selectRow(0);
            } else if(save_All_Sta_Pjtmta002 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPjtmta002.selectRow(save_Row_Num_Pjtmta002); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPjtmta002.selectRow(save_Row_Num_Pjtmta002);   //개발자 수정 필요  
                //var findCell = dhxGridPjtmta002.findCell(save_Row_Ids_Pjtmta002, gf_GetDhxGridColumId(dhxGridPjtmta002,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPjtmta002.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPjtmta002.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListPjtmta002');
        }
        $("#spanCntSearchFormPjtmta002").text(data.data.records.length);
        cf_SetEventListenerPjtmta002();
    } 
};
var fn_DhxDataProcessorPjtmta002 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPjtmta002 = new dataProcessor(gv_ContextPath+'/pjtmta002/savePjtmta002'); //lock feed url
    dhxDataProcessorPjtmta002.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPjtmta002.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPjtmta002.init(dhxGridPjtmta002); //link dataprocessor to the grid
    dhxDataProcessorPjtmta002.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPjtmta002.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPjtmta002.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPjtmta002();
                    $("#checkAllPjtmta002").prop('checked', false); //상단 체크박스 해제
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
var fn_AddPjtmta002 = function() {
    dhxGridPjtmta002.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //projectSn
    initValueArr.push(''); //requstSn
    initValueArr.push(''); //requstStep
    initValueArr.push(''); //requstDt
    initValueArr.push(''); //rqesterDept
    initValueArr.push(''); //rqesterTelno
    initValueArr.push(''); //rqesterEmail
    initValueArr.push(''); //comptRequstDt
    initValueArr.push(''); //requstCn
    initValueArr.push(''); //priorRank
    initValueArr.push(''); //requstTy
    initValueArr.push(''); //drctrEmpno
    initValueArr.push(''); //drctCn
    initValueArr.push(''); //atchmnflSn
    initValueArr.push(''); //opertorEmpno
    initValueArr.push(''); //opertTy
    initValueArr.push(''); //confmerNm
    initValueArr.push(''); //comptConfmDt
    initValueArr.push(''); //confmOpn
    initValueArr.push(''); //stsfdgCode
    initValueArr.push(''); //comptConfmAt
    initValueArr.push(''); //rqester
    dhxGridPjtmta002.addRow(dhxGridPjtmta002.uid(), initValueArr, 0);
    dhxGridPjtmta002.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPjtmta002');
    $('#btnPopEmpSearchPjtmta002').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pjtmta002SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPjtmta002, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPjtmta002', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPjtmta002', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPjtmta002, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPjtmta002.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPjtmta002', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPjtmta002', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtmta002, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPjtmta002.setSortImgState(false); 
            gf_FormSetValue('searchFormPjtmta002', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPjtmta002', 'sortColumId', '', 'text'); 
            dhxGridPjtmta002.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPjtmta002.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPjtmta002', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPjtmta002', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtmta002, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePjtmta002 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pjtmta002 = 0; 
    save_Edt_Cnt_Pjtmta002 = 0; 
    save_Del_Cnt_Pjtmta002 = 0; 
    dhxGridPjtmta002.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPjtmta002.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPjtmta002.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pjtmta002 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pjtmta002 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pjtmta002 += 1; 
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
        save_All_Sta_Pjtmta002 = 0; 
        if(save_Add_Cnt_Pjtmta002 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Pjtmta002 + "건";
            save_All_Sta_Pjtmta002 = 1; 
        } 
        if(save_Edt_Cnt_Pjtmta002 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Pjtmta002 + "건"; 
        } 
        if(save_Del_Cnt_Pjtmta002 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Pjtmta002 + "건"; 
            save_All_Sta_Pjtmta002 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalPjtmta002(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPjtmta002(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalPjtmta002 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePjtmta002_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePjtmta002_Send = function() {
    if(fn_GridValidation(dhxGridPjtmta002, dhxDataProcessorPjtmta002)) {
        dhxDataProcessorPjtmta002.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemovePjtmta002 = function() {
    var rowId = dhxGridPjtmta002.getSelectedRowId();
    var state = dhxDataProcessorPjtmta002.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridPjtmta002.getRowIndex(rowId);
        dhxGridPjtmta002.deleteRow(rowId);
        dhxGridPjtmta002.selectRow(rowNum);
    }
    else dhxDataProcessorPjtmta002.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPjtmta002 = function () {
    var titPjtmta002 = '유지보수요청요약'; /* gf_LocaleTrans('default', 'titPjtmta002') */
    var jsonParameter = {
    		bcncNm : gf_FormGetValue('searchFormPjtmta002', 'bcncNm', 'text'),
            sRegDt : gf_FormGetValue('searchFormPjtmta002', 'bgnRequstDe', 'text').replaceAll('-',''),
            eRegDt : gf_FormGetValue('searchFormPjtmta002', 'endRequstDe', 'text').replaceAll('-',''),
            comptAt : gf_FormGetValue('searchFormPjtmta002', 'comptAt', 'combo')
    };
    var header = [[
        '프로젝트 순번' /* gf_LocaleTrans('default', 'titProjectSn') */,
        '거래처',
        '프로젝트명',
        '요청',
        '해결',
        '미해결',
        '승인',
        '진척율',
        '납기준수(완료일기준)',
        '납기준수(승인일기준)',
        '평균소요(완료일기준)',
        '평균소요(승인일기준)'
    ]];
    var dataId = [[ 'projectSn', 'bcncNm', 'projectNm', 'reqCnt', 'clearCnt', 'unclearCnt', 'compCnt', 'prgsRt', 'payperiodRtCompt', 'payperiodRtConfm', 'avgComp', 'avgConfm' ]];
    var dataAlign = [[ 'center', 'left', 'left',  'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right' ]];
    var sheetNm = [[ titPjtmta002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPjtmta002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pjtmta002/excelPjtmta002', jsonParameter);
};

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
}; 

var gf_CustomerPopup = function (formId, codeId, codeNmId, bcncSe, searchFlag, strCallbackFunc) {

	var userId = ""; 
	var title  = "거래처 조회";
	var customerInfo = "customerInfo";
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

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof bcncSe == "undefined" || bcncSe == null){
		bcncSe = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='contractCompanyPopup']").size() <= 0) {
		$('body').append("<div id='contractCompanyPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' bcncSe='" + bcncSe + "' customerInfo='" + customerInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#contractCompanyPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'contractCompanyPopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/searchPjtCustomer/view';
			var left	= 0;
			var top		= 0;
			var width	= 760;
			var height	= 730;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#contractCompanyPopup .b-close').click();
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
			$('body').find("div[id='contractCompanyPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};
