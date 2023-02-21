/**
 *    프로그램       : 아웃소싱 인력현황 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2021.06.24
 *    사용테이블      : PJT_OUTSRC_HR
 * sourceGen version : 2021.02.18.01 (2021.06.24)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pjtosc001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pjtosc001 = 0;  //그리드 위치 상태 
var save_All_Sta_Pjtosc001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pjtosc001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Row_Values_Pjtosc001 = "";  //그리드에서 저장하는 위치의 key 값, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pjtosc001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pjtosc001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pjtosc001 = 0;  //그리드 삭제 수량 
var dhxGridPjtosc001;  //그리드 객체
var eventIdPjtosc001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPjtosc001;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPjtosc001();
    if(cf_SetComponentsPjtosc001()){
       cf_SetEventListenerPjtosc001();
       cf_InitFormPjtosc001();
       cf_SetBindingPjtosc001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPjtosc001 = function() {
    gf_SetMenuPath();
    $("#saveFormPjtosc001").validate({ errorElement: 'div', ignore: '' });
//	gf_ComboCode('crqfsSesaveFormPjtosc001', 'crqfsSe', 'crqfsSe', 'search', 'C138', '' , '', '', 'asc', '');	//공통코드추가 
};

var cf_SetComponentsPjtosc001 = function() {
    var dhxGridPjtosc001HeaderInfo = [];
//    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '*', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
//    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPjtosc001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
//    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('아웃소싱 사원번호', '100', 'center', 'str', 'ro', false, 'outsrcEmpno', '', '')); /* gf_LocaleTrans('default', 'titOutsrcEmpno') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('이름', '100', 'center', 'str', 'ro', false, 'nm', '', '')); /* gf_LocaleTrans('default', 'titNm') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('소속', '100', 'center', 'str', 'ro', false, 'deptCode', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('연령', '100', 'center', 'str', 'ro', false, 'age', '', '')); /* gf_LocaleTrans('default', 'titIhidnum') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('계약시작일자', '100', 'center', 'str', 'ro', false, 'cntrctBgnde', '', '')); /* gf_LocaleTrans('default', 'titAge') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('직종', '100', 'center', 'str', 'ro', false, 'jssfcCode', '', '')); /* gf_LocaleTrans('default', 'titSexdstnSe') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('투입가능', '100', 'center', 'str', 'ro', false, 'inptPosblAt', '', '')); /* gf_LocaleTrans('default', 'titJssfcCode') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('경력', '100', 'center', 'int', 'ro', false, 'careerYcnt', '', '')); /* gf_LocaleTrans('default', 'titInptPosblAt') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('계약종료일자', '100', 'center', 'str', 'ro', false, 'cntrctEndde', '', '')); /* gf_LocaleTrans('default', 'titCareerYcnt') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('금액', '100', 'center', 'str', 'ro', false, 'cntrctAmt', '', '')); /* gf_LocaleTrans('default', 'titCareerMcnt') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('전문기술', '100', 'center', 'str', 'ro', false, 'tchnlgyGradCode', '', '')); /* gf_LocaleTrans('default', 'titTchnlgyGradCode') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('자격증', '100', 'center', 'str', 'ro', false, 'crqfsAt', '', '')); /* gf_LocaleTrans('default', 'titCrqfsAt') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('역할', '100', 'center', 'str', 'ro', false, 'roleCode', '', '')); /* gf_LocaleTrans('default', 'titRoleCode') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('성별', '100', 'center', 'str', 'ro', false, 'sexdstnSe', '', '')); /* gf_LocaleTrans('default', 'titLastAcdmcrCode') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('최종학력', '100', 'center', 'str', 'ro', false, 'lastAcdmcrCode', '', '')); /* gf_LocaleTrans('default', 'titHopeAreaCode') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('선호지역', '100', 'center', 'str', 'ro', false, 'hopeAreaCode', '', '')); /* gf_LocaleTrans('default', 'titImgSeCode') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('이메일', '100', 'left', 'str', 'ro', false, 'email', '', '')); /* gf_LocaleTrans('default', 'titEmail') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('연락처', '100', 'left', 'str', 'ro', false, 'telno', '', '')); /* gf_LocaleTrans('default', 'titTelno') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('연락처', '100', 'left', 'str', 'ro', false, 'hpNo', '', '')); /* gf_LocaleTrans('default', 'titHpNo') */
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('주소', '100', 'left', 'str', 'ro', false, 'adres', '', '')); /* gf_LocaleTrans('default', 'titZip') */
	dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('상세주소', '100', 'left', 'str', 'ro', false, 'detailAdres', '', ''));
    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'left', 'str', 'ro', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titAdres') */
//    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('상세 주소', '100', 'left', 'str', 'ro', false, 'detailAdres', '', '')); /* gf_LocaleTrans('default', 'titDetailAdres') */
//    dhxGridPjtosc001HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'left', 'str', 'ro', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */ 
    dhxGridPjtosc001 = gf_MakeDhxGrid('dataListPjtosc001', dhxGridPjtosc001HeaderInfo, true, false, false);
    dhxGridPjtosc001.enableAutoWidth(false);
    dhxGridPjtosc001.setEditable(true);

    dhxGridPjtosc001.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerPjtosc001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPjtosc001 = gf_GridDetachEvent(dhxGridPjtosc001, eventIdPjtosc001);
    eventId = dhxGridPjtosc001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPjtosc001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPjtosc001.getColumnsNum();
            var rowNum = dhxGridPjtosc001.getRowsNum();
            var selectedId = dhxGridPjtosc001.getSelectedRowId();
            var ind        = dhxGridPjtosc001.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtosc001.getRowIndex(selectedId);
            var type       = dhxGridPjtosc001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPjtosc001.selectRow(0);
                    //fn_FindPjtosc001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPjtosc001.selectRow(rowIndex + 1);
                    fn_FindPjtosc001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPjtosc001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtosc001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPjtosc001.getSelectedRowId();
            var ind        = dhxGridPjtosc001.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtosc001.getRowIndex(selectedId);
            var type       = dhxGridPjtosc001.getColType(ind);
            dhxGridPjtosc001.selectCell(rowIndex+1, ind);
            fn_FindPjtosc001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtosc001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPjtosc001.getSelectedRowId();
            var ind        = dhxGridPjtosc001.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtosc001.getRowIndex(selectedId);
            var type       = dhxGridPjtosc001.getColType(ind);
            dhxGridPjtosc001.selectCell(rowIndex-1, ind);
            fn_FindPjtosc001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtosc001.editCell();
            }
        }
        else return true;
    });
    eventIdPjtosc001.push(eventId);
    eventId = dhxGridPjtosc001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pjtosc001SortGridList(ind, type, direction); 
    });
    eventIdPjtosc001.push(eventId);
    eventId = dhxGridPjtosc001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPjtosc001.push(eventId);
    eventId = dhxGridPjtosc001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindPjtosc001();
    });
    eventIdPjtosc001.push(eventId);
    eventId = dhxGridPjtosc001.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdPjtosc001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPjtosc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddPjtosc001()
    });
    $('#btnSavePjtosc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePjtosc001();
    });
    $('#btnRemovePjtosc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePjtosc001();
    });
    $('#btnExcelPjtosc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPjtosc001();
    });
    $('#btnSearchPjtosc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPjtosc001('');
    });
    $('#btnResetPjtosc001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPjtosc001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllPjtosc001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var nRows =dhxGridPjtosc001.getRowsNum();
        for(var i = 0; i <nRows; i++) {
            dhxGridPjtosc001.selectRow(i);
        }
        gf_DhxCheckAllGridHeader(dhxGridPjtosc001, $('#checkAllPjtosc001').prop('checked'), 'chk');
    });
    $('#searchFormPjtosc001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPjtosc001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPjtosc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormPjtosc001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPjtosc001",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
//    $('#saveFormPjtosc001 input[name="outsrcEmpno"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'outsrcEmpno', $(this).val());
//    });
    $('#saveFormPjtosc001 input[name="nm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'nm', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="deptCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'deptCode', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="ihidnum"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'ihidnum', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="age"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'age', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="sexdstnSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'sexdstnSe', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="jssfcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'jssfcCode', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="inptPosblAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'inptPosblAt', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="careerYcnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'careerYcnt', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="careerMcnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'careerMcnt', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="tchnlgyGradCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'tchnlgyGradCode', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="crqfsAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'crqfsAt', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="roleCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'roleCode', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="lastAcdmcrCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'lastAcdmcrCode', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="hopeAreaCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'hopeAreaCode', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="imgSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'imgSeCode', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="email"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'email', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="telno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'telno', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="hpNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'hpNo', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="zip"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'zip', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="adres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'adres', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="detailAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'detailAdres', $(this).val());
    });
    $('#saveFormPjtosc001 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPjtosc001, dhxDataProcessorPjtosc001, 'rm', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormPjtosc001 = function() {
    $('#searchFormPjtosc001').resetForm();
    gf_SetDataAuthorSe();
};

var cf_SetBindingPjtosc001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchPjtosc001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchPjtosc001 = function(userId) {
    var jsonParameter = {
        outsrcEmpno : gf_FormGetValue('searchFormPjtosc001', 'outsrcEmpno', 'text')
    };
    gf_Transaction(userId, 'pjtosc001/searchPjtosc001', jsonParameter, 'fn_CallbackSearchPjtosc001', false, 'GET');
};

var fn_CallbackSearchPjtosc001 = function(strSvcID, targetID, data) {
    //dhxGridPjtosc001.clearAll();
    dhxGridPjtosc001.destructor();
    if(cf_SetComponentsPjtosc001()){ 
        fn_DhxDataProcessorPjtosc001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPjtosc001');
            dhxGridPjtosc001.parse(data.data.records, 'js');
 //console.log(data.data.records);
            if(save_Row_Num_Pjtosc001 == 0 && save_All_Sta_Pjtosc001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPjtosc001.selectRow(0); 
            } else if(save_Row_Sta_Pjtosc001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPjtosc001.selectRow(0);
            } else if(save_All_Sta_Pjtosc001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPjtosc001.selectRow(save_Row_Num_Pjtosc001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPjtosc001.selectRow(save_Row_Num_Pjtosc001);   //개발자 수정 필요  
                //var findCell = dhxGridPjtosc001.findCell(save_Row_Values_Pjtosc001, gf_GetDhxGridColumId(dhxGridPjtosc001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPjtosc001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPjtosc001.selectRow(0);
                //} 
            } 
 
            fn_FindPjtosc001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListPjtosc001');
            fn_InitInputFormPjtosc001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormPjtosc001").text(data.data.records.length);
        cf_SetEventListenerPjtosc001();
    } 
};
var fn_DhxDataProcessorPjtosc001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPjtosc001 = new dataProcessor(gv_ContextPath+'/pjtosc001/savePjtosc001'); //lock feed url
    dhxDataProcessorPjtosc001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPjtosc001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPjtosc001.init(dhxGridPjtosc001); //link dataprocessor to the grid
    dhxDataProcessorPjtosc001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPjtosc001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPjtosc001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPjtosc001();
                    $("#checkAllPjtosc001").prop('checked', false); //상단 체크박스 해제
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
var fn_FindPjtosc001 = function() {
    var rId = dhxGridPjtosc001.getSelectedRowId();
    var status = dhxDataProcessorPjtosc001.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormPjtosc001", "nm", gf_DhxGetValue(dhxGridPjtosc001, rId, 'nm',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "deptCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'deptCode',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "age", gf_DhxGetValue(dhxGridPjtosc001, rId, 'age',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "cntrctBgnde", gf_DhxGetValue(dhxGridPjtosc001, rId, 'cntrctBgnde',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "jssfcCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'jssfcCode',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "inptPosblAt", gf_DhxGetValue(dhxGridPjtosc001, rId, 'inptPosblAt',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "careerYcnt", gf_DhxGetValue(dhxGridPjtosc001, rId, 'careerYcnt',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "cntrctEndde", gf_DhxGetValue(dhxGridPjtosc001, rId, 'cntrctEndde',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "cntrctAmt", gf_DhxGetValue(dhxGridPjtosc001, rId, 'cntrctAmt',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "tchnlgyGradCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'tchnlgyGradCode',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "crqfsAt", gf_DhxGetValue(dhxGridPjtosc001, rId, 'crqfsAt',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "roleCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'roleCode',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "sexdstnSe", gf_DhxGetValue(dhxGridPjtosc001, rId, 'sexdstnSe',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "lastAcdmcrCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'lastAcdmcrCode',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "hopeAreaCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'hopeAreaCode',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "email", gf_DhxGetValue(dhxGridPjtosc001, rId, 'email',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "telno", gf_DhxGetValue(dhxGridPjtosc001, rId, 'telno',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "hpNo", gf_DhxGetValue(dhxGridPjtosc001, rId, 'hpNo',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "adres", gf_DhxGetValue(dhxGridPjtosc001, rId, 'adres',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "detailAdres", gf_DhxGetValue(dhxGridPjtosc001, rId, 'detailAdres',  'grid'), '');
	gf_FormSetValue("saveFormPjtosc001", "rm", gf_DhxGetValue(dhxGridPjtosc001, rId, 'rm',  'grid'), '');
	
	/*gf_FormSetValue("saveFormPjtosc001", "nm", gf_DhxGetValue(dhxGridPjtosc001, rId, 'nm',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "deptCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'deptCode',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "ihidnum", gf_DhxGetValue(dhxGridPjtosc001, rId, 'ihidnum',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "age", gf_DhxGetValue(dhxGridPjtosc001, rId, 'age',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "sexdstnSe", gf_DhxGetValue(dhxGridPjtosc001, rId, 'sexdstnSe',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "jssfcCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'jssfcCode',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "inptPosblAt", gf_DhxGetValue(dhxGridPjtosc001, rId, 'inptPosblAt',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "careerYcnt", gf_DhxGetValue(dhxGridPjtosc001, rId, 'careerYcnt',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "careerMcnt", gf_DhxGetValue(dhxGridPjtosc001, rId, 'careerMcnt',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "tchnlgyGradCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'tchnlgyGradCode',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "crqfsAt", gf_DhxGetValue(dhxGridPjtosc001, rId, 'crqfsAt',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "roleCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'roleCode',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "lastAcdmcrCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'lastAcdmcrCode',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "hopeAreaCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'hopeAreaCode',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "imgSeCode", gf_DhxGetValue(dhxGridPjtosc001, rId, 'imgSeCode',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "email", gf_DhxGetValue(dhxGridPjtosc001, rId, 'email',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "telno", gf_DhxGetValue(dhxGridPjtosc001, rId, 'telno',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "hpNo", gf_DhxGetValue(dhxGridPjtosc001, rId, 'hpNo',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "zip", gf_DhxGetValue(dhxGridPjtosc001, rId, 'zip',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "adres", gf_DhxGetValue(dhxGridPjtosc001, rId, 'adres',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "detailAdres", gf_DhxGetValue(dhxGridPjtosc001, rId, 'detailAdres',  'grid'), '');
    gf_FormSetValue("saveFormPjtosc001", "rm", gf_DhxGetValue(dhxGridPjtosc001, rId, 'rm',  'grid'), '');*/

    if(status == 'inserted') {
        $('#saveFormPjtosc001 input[name="outsrcEmpno"]').prop('disabled', false);
    } else {
        $('#saveFormPjtosc001 input[name="outsrcEmpno"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormPjtosc001 = function() {
    $('#saveFormPjtosc001 input[name="outsrcEmpno"]').prop('disabled', false);
    $('#saveFormPjtosc001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormPjtosc001 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddPjtosc001 = function() {
    dhxGridPjtosc001.clearSelection();
    fn_InitInputFormPjtosc001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //outsrcEmpno
    initValueArr.push(''); //nm
    initValueArr.push(''); //deptCode
    initValueArr.push(''); //ihidnum
    initValueArr.push(''); //age
    initValueArr.push(''); //sexdstnSe
    initValueArr.push(''); //jssfcCode
    initValueArr.push(''); //inptPosblAt
    initValueArr.push(''); //careerYcnt
    initValueArr.push(''); //careerMcnt
    initValueArr.push(''); //tchnlgyGradCode
    initValueArr.push(''); //crqfsAt
    initValueArr.push(''); //roleCode
    initValueArr.push(''); //lastAcdmcrCode
    initValueArr.push(''); //hopeAreaCode
    initValueArr.push(''); //imgSeCode
    initValueArr.push(''); //email
    initValueArr.push(''); //telno
    initValueArr.push(''); //hpNo
    initValueArr.push(''); //zip
    initValueArr.push(''); //adres
    initValueArr.push(''); //detailAdres
    initValueArr.push(''); //rm
    dhxGridPjtosc001.addRow(dhxGridPjtosc001.uid(), initValueArr, 0);
    dhxGridPjtosc001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPjtosc001');
    $('#btnPopEmpSearchPjtosc001').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pjtosc001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPjtosc001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPjtosc001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPjtosc001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPjtosc001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPjtosc001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPjtosc001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPjtosc001', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtosc001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPjtosc001.setSortImgState(false); 
            gf_FormSetValue('searchFormPjtosc001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPjtosc001', 'sortColumId', '', 'text'); 
            dhxGridPjtosc001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPjtosc001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPjtosc001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPjtosc001', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtosc001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePjtosc001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pjtosc001 = 0; 
    save_Edt_Cnt_Pjtosc001 = 0; 
    save_Del_Cnt_Pjtosc001 = 0; 
    dhxGridPjtosc001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPjtosc001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPjtosc001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pjtosc001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pjtosc001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pjtosc001 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        if(fn_GridValidation(dhxGridPjtosc001, dhxDataProcessorPjtosc001)) {
            var confirmMsg  = ""; 
            var confirmMsg1 = ""; 
            var confirmMsg2 = ""; 
            var confirmMsg3 = ""; 
            save_All_Sta_Pjtosc001 = 0; 
            if(save_Add_Cnt_Pjtosc001 > 0){
                confirmMsg1 = "신규 " + save_Add_Cnt_Pjtosc001 + "건";
                save_All_Sta_Pjtosc001 = 1; 
            } 
            if(save_Edt_Cnt_Pjtosc001 > 0){ 
                confirmMsg2 = "수정 " + save_Edt_Cnt_Pjtosc001 + "건"; 
            } 
            if(save_Del_Cnt_Pjtosc001 > 0){ 
                confirmMsg3 = "삭제 " + save_Del_Cnt_Pjtosc001 + "건"; 
                save_All_Sta_Pjtosc001 = 1; 
            } 
            if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
                confirmMsg1 = confirmMsg1 + ", ";
            }
            if(confirmMsg2 != "" && confirmMsg3 != ""){
                confirmMsg2 = confirmMsg2 + ", ";
            }
            confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
            
            //if(confirmModalPjtosc001(gv_QueSave)){  //여기는 안옴 
            if(confirmModalPjtosc001(confirmMsg)){  //여기는 안옴 
            } else { 
                return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
            } 
        } 
    }
}
var confirmModalPjtosc001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePjtosc001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePjtosc001_Send = function() {
    //if(fn_GridValidation(dhxGridPjtosc001, dhxDataProcessorPjtosc001)) {
        dhxDataProcessorPjtosc001.sendData();
    //}
}
/**
 * 삭제
 */
var fn_RemovePjtosc001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPjtosc001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridPjtosc001.forEachRow(function(rowId) {
            state = dhxDataProcessorPjtosc001.getState(rowId);
            if(dhxGridPjtosc001.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtosc001, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridPjtosc001.getRowIndex(rowId);
                    dhxGridPjtosc001.deleteRow(rowId);
                    dhxGridPjtosc001.selectRow(rowNum);
                    fn_FindPjtosc001();
                }
                else dhxDataProcessorPjtosc001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPjtosc001 = function () {
    var titPjtosc001 = '아웃소싱 인력현황'; /* gf_LocaleTrans('default', 'titPjtosc001') */
    var jsonParameter = {
        outsrcEmpno : gf_FormGetValue('searchFormPjtosc001', 'outsrcEmpno', 'text')
    };
    var header = [[
        '아웃소싱 사원번호' /* gf_LocaleTrans('default', 'titOutsrcEmpno') */,
        '성명' /* gf_LocaleTrans('default', 'titNm') */,
        '소속' /* gf_LocaleTrans('default', 'titDeptCode') */,
        '주민등록번호' /* gf_LocaleTrans('default', 'titIhidnum') */,
        '나이' /* gf_LocaleTrans('default', 'titAge') */,
        '성별구분 (공통코드:C286)' /* gf_LocaleTrans('default', 'titSexdstnSe') */,
        '직종 코드' /* gf_LocaleTrans('default', 'titJssfcCode') */,
        '투입 가능 여부' /* gf_LocaleTrans('default', 'titInptPosblAt') */,
        '경력 년수' /* gf_LocaleTrans('default', 'titCareerYcnt') */,
        '경력 월수' /* gf_LocaleTrans('default', 'titCareerMcnt') */,
        '기술 등급 코드' /* gf_LocaleTrans('default', 'titTchnlgyGradCode') */,
        '자격증 취득  여부' /* gf_LocaleTrans('default', 'titCrqfsAt') */,
        '역할 코드' /* gf_LocaleTrans('default', 'titRoleCode') */,
        '최종 학력 코드' /* gf_LocaleTrans('default', 'titLastAcdmcrCode') */,
        '희망 지역 코드' /* gf_LocaleTrans('default', 'titHopeAreaCode') */,
        '이미지 구분 코드(평판)' /* gf_LocaleTrans('default', 'titImgSeCode') */,
        '이메일' /* gf_LocaleTrans('default', 'titEmail') */,
        '전화번호' /* gf_LocaleTrans('default', 'titTelno') */,
        '휴대폰 번호' /* gf_LocaleTrans('default', 'titHpNo') */,
        '우편번호' /* gf_LocaleTrans('default', 'titZip') */,
        '주소' /* gf_LocaleTrans('default', 'titAdres') */,
        '상세 주소' /* gf_LocaleTrans('default', 'titDetailAdres') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'outsrcEmpno', 'nm', 'deptCode', 'ihidnum', 'age', 'sexdstnSe', 'jssfcCode', 'inptPosblAt', 'careerYcnt', 'careerMcnt', 'tchnlgyGradCode', 'crqfsAt', 'roleCode', 'lastAcdmcrCode', 'hopeAreaCode', 'imgSeCode', 'email', 'telno', 'hpNo', 'zip', 'adres', 'detailAdres', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titPjtosc001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPjtosc001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pjtosc001/excelPjtosc001', jsonParameter);
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
    $('#saveFormPjtosc001 #outsrcEmpnoSaveFormPjtosc001').parent().append(
    '<div class="error" id="outsrcEmpnoSaveFormPjtosc001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPjtosc001 = function(outsrcEmpno){
    if(!gf_IsNull(outsrcEmpno)) {
        var jsonParameter = {
            outsrcEmpno : outsrcEmpno
        };
        var dataSource = gf_NoAsyncTransaction('pjtosc001/findPjtosc001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.outsrcEmpno)) {
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
    var state = dhxDataProcessorPjtosc001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormPjtosc001').validate().form()){
                if(state == 'inserted') {
                    var outsrcEmpno = gf_FormGetValue('saveFormPjtosc001', 'outsrcEmpno', 'text');
                    if(fn_CheckDupPjtosc001(outsrcEmpno)) return true;
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
    var checkOutsrcEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Pjtosc001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Pjtosc001 == 'deleted') {
        save_Row_Num_Pjtosc001 = 0;
        save_Row_Ids_Pjtosc001 = "";
        save_Row_Values_Pjtosc001 = "";
    } else if(save_Row_Sta_Pjtosc001 == 'inserted') {
        save_Row_Num_Pjtosc001 = rowNum;
        save_Row_Ids_Pjtosc001 = ""; 
        save_Row_Values_Pjtosc001 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pjtosc001 = rowNum;
        save_Row_Ids_Pjtosc001 = rowIds; 
        save_Row_Values_Pjtosc001 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid')  
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'outsrcEmpno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'outsrcEmpno');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkOutsrcEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'outsrcEmpno', 'grid');
                    if(!gf_IsNull(checkOutsrcEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var outsrcEmpno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'outsrcEmpno', 'grid');
                            if(((outsrcEmpno == checkOutsrcEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'outsrcEmpno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupPjtosc001( checkOutsrcEmpno )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'outsrcEmpno');
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
        dhxGridPjtosc001.selectRowById(validFalseFistRowId);
        fn_FindPjtosc001();
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
