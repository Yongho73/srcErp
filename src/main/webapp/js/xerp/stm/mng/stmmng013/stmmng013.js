/**
 *    프로그램       : 명함관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.31
 *    사용테이블      : STM_CUST
 * sourceGen version : 2020.07.16.01 (2020.07.31)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmmng013 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmmng013 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmmng013 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmmng013 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmmng013 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmmng013 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmmng013 = 0;  //그리드 삭제 수량 
var dhxGridStmmng013;  //그리드 객체
var eventIdStmmng013 = [];  //그리드 이벤트 객체 
var dhxDataProcessorStmmng013;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmng013();
    if(cf_SetComponentsStmmng013()){
       cf_SetEventListenerStmmng013();
       cf_InitFormStmmng013();
       cf_SetBindingStmmng013();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmmng013 = function() {
    gf_SetMenuPath();
    $("#saveFormStmmng013").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsStmmng013 = function() {
    var dhxGridStmmng013HeaderInfo = [];
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmmng013" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('고객명', '80', 'center', 'str', 'ro', false, 'custNm', '', '')); /* gf_LocaleTrans('default', 'titCustNm') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('직급', '120', 'left', 'str', 'ro', false, 'clsf', '', '')); /* gf_LocaleTrans('default', 'titClsf') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('거래처', '*', 'left', 'str', 'ro', false, 'bcncCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBcncCode') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('부서', '150', 'left', 'str', 'ro', false, 'cmpnyDept', '', '')); /* gf_LocaleTrans('default', 'titCmpnyDept') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('전화번호', '120', 'left', 'str', 'ro', false, 'cmpnyTelno', '', '')); /* gf_LocaleTrans('default', 'titCmpnyTelno') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('휴대폰번호', '120', 'left', 'str', 'ro', false, 'mbtlnum', '', '')); /* gf_LocaleTrans('default', 'titMbtlnum') */
    
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('거래처코드', '100', 'center', 'str', 'ro', true, 'bcncCode', '', '')); /* gf_LocaleTrans('default', 'titBcncCode') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('집전화번호', '120', 'left', 'str', 'ro', true, 'homeTelno', '', '')); /* gf_LocaleTrans('default', 'titMbtlnum') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('고객번호', '100', 'left', 'str', 'ro', true, 'custNo', '', '')); /* gf_LocaleTrans('default', 'titCustNo') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('이메일', '100', 'left', 'str', 'ro', true, 'email', '', '')); /* gf_LocaleTrans('default', 'titEmail') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('우편번호', '100', 'left', 'str', 'ro', true, 'zip', '', '')); /* gf_LocaleTrans('default', 'titZip') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('기본주소', '100', 'left', 'str', 'ro', true, 'bassAdres', '', '')); /* gf_LocaleTrans('default', 'titBassAdres') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('상세주소', '100', 'left', 'str', 'ro', true, 'detailAdres', '', '')); /* gf_LocaleTrans('default', 'titDetailAdres') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('거래처 주 담당자 여부', '100', 'center', 'str', 'ro', true, 'bcncChargerAt', '', '')); /* gf_LocaleTrans('default', 'titBcncChargerAt') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('등록자', '100', 'left', 'str', 'ro', true, 'regNm', '', '')); /* gf_LocaleTrans('default', 'titDetailAdres') */
    dhxGridStmmng013HeaderInfo.push(gf_MakeDhxGridHeader('등록일', '100', 'left', 'str', 'ro', true, 'regDt', '', '')); /* gf_LocaleTrans('default', 'titDetailAdres') */
    dhxGridStmmng013 = gf_MakeDhxGrid('dataListStmmng013', dhxGridStmmng013HeaderInfo, true, false, false);
    dhxGridStmmng013.enableAutoWidth(false);
    dhxGridStmmng013.setEditable(true);

    dhxGridStmmng013.setColumnMinWidth(40,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerStmmng013 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmmng013 = gf_GridDetachEvent(dhxGridStmmng013, eventIdStmmng013);
    eventId = dhxGridStmmng013.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmmng013();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmmng013.getColumnsNum();
            var rowNum = dhxGridStmmng013.getRowsNum();
            var selectedId = dhxGridStmmng013.getSelectedRowId();
            var ind        = dhxGridStmmng013.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng013.getRowIndex(selectedId);
            var type       = dhxGridStmmng013.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmmng013.selectRow(0);
                    //fn_FindStmmng013();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmmng013.selectRow(rowIndex + 1);
                    fn_FindStmmng013();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmmng013.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng013.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmmng013.getSelectedRowId();
            var ind        = dhxGridStmmng013.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng013.getRowIndex(selectedId);
            var type       = dhxGridStmmng013.getColType(ind);
            dhxGridStmmng013.selectCell(rowIndex+1, ind);
            fn_FindStmmng013();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng013.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmmng013.getSelectedRowId();
            var ind        = dhxGridStmmng013.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng013.getRowIndex(selectedId);
            var type       = dhxGridStmmng013.getColType(ind);
            dhxGridStmmng013.selectCell(rowIndex-1, ind);
            fn_FindStmmng013();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng013.editCell();
            }
        }
        else return true;
    });
    eventIdStmmng013.push(eventId);
    eventId = dhxGridStmmng013.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmmng013SortGridList(ind, type, direction); 
    });
    eventIdStmmng013.push(eventId);
    eventId = dhxGridStmmng013.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmmng013.push(eventId);
    eventId = dhxGridStmmng013.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindStmmng013();
    });
    eventIdStmmng013.push(eventId);
    eventId = dhxGridStmmng013.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmmng013.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmmng013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddStmmng013()
    });
    $('#btnSaveStmmng013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmmng013();
    });
    $('#btnRemoveStmmng013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmmng013();
    });
    $('#btnExcelStmmng013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmmng013();
    });
    $('#btnSearchStmmng013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmmng013('');
    });
    $('#btnResetStmmng013').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmmng013();
    });
    //거래처 선택 Popup
	$('#btnBcncSearch').unbind('click').bind('click', function(event){
		gf_CompPopup("saveFormStmmng013","bcncCode","bcncNm", '1000', "N", "fn_CallbackPopComp");  // form ID, 거래처코드가 들어갈 tag의 ID, 거래처명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//주소찾기 
	$('#btnZipSearch').unbind('click').bind('click', function(event){
		gf_ZipPopup("saveFormStmmng013","","", "", "fn_CallBackZipPopup");  // form ID, 우편번호가 들어갈 tag의 ID, 주소가 들어갈 tag의 ID, 상세주소가 들어갈 tag의 ID, 콜백
    }); 
    // 기타 이벤트 ==========================================================================================
    $('#checkAllStmmng013').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridStmmng013, $('#checkAllStmmng013').prop('checked'), 'chk');
    });
    $('#searchFormStmmng013 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmmng013').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmmng013 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormStmmng013",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng013 input[name="custNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'custNo', $(this).val());
    });
    $('#saveFormStmmng013 input[name="custNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'custNm', $(this).val());
    });
    $('#saveFormStmmng013 input[name="clsf"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'clsf', $(this).val());
    });
    $('#saveFormStmmng013 input[name="cmpnyDept"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'cmpnyDept', $(this).val());
    });
    $('#saveFormStmmng013 input[name="homeTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'homeTelno', $(this).val());
    });
    $('#saveFormStmmng013 input[name="cmpnyTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'cmpnyTelno', $(this).val());
    });
    $('#saveFormStmmng013 input[name="mbtlnum"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'mbtlnum', $(this).val());
    });
    $('#saveFormStmmng013 input[name="email"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'email', $(this).val());
    });
    $('#saveFormStmmng013 input[name="zip"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'zip', $(this).val());
    });
    $('#saveFormStmmng013 input[name="bassAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'bassAdres', $(this).val());
    });
    $('#saveFormStmmng013 input[name="detailAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'detailAdres', $(this).val());
    });
    $('#saveFormStmmng013 input[name="bcncCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'bcncCode', $(this).val());
    });
    $('#saveFormStmmng013 input[name="bcncCodeNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'bcncCodeNm', $(this).val());
    });
    $('#saveFormStmmng013 input[name="bcncChargerAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($('input[name="bcncChargerAt"]').is(":checked") == true){
        	gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'bcncChargerAt', '1');
        } else {
        	gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'bcncChargerAt', '0');
        }
    });
    $('#saveFormStmmng013 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng013, dhxDataProcessorStmmng013, 'rm', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormStmmng013 = function() {
    $('#searchFormStmmng013').resetForm();
};

var cf_SetBindingStmmng013 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchStmmng013('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmmng013 = function(userId) {
    var jsonParameter = {
        custNm : gf_FormGetValue('searchFormStmmng013', 'custNm', 'text'),
        bcncCodeNm : gf_FormGetValue('searchFormStmmng013', 'bcncCodeNm', 'text'),
        bcncAt : gf_FormGetValue('searchFormStmmng013', 'bcncAt', 'combo'),
    };
    console.log(jsonParameter);
    gf_Transaction(userId, 'stmmng013/searchStmmng013', jsonParameter, 'fn_CallbackSearchStmmng013', false, 'GET');
};

var fn_CallbackSearchStmmng013 = function(strSvcID, targetID, data) {
    //dhxGridStmmng013.clearAll();
    dhxGridStmmng013.destructor();
    if(cf_SetComponentsStmmng013()){ 
        fn_DhxDataProcessorStmmng013(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmmng013');
            dhxGridStmmng013.parse(data.data.records, 'js');
 
            if(save_Row_Num_Stmmng013 == 0 && save_All_Sta_Stmmng013 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridStmmng013.selectRow(0); 
            } else if(save_Row_Sta_Stmmng013 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridStmmng013.selectRow(0);
            } else if(save_All_Sta_Stmmng013 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridStmmng013.selectRow(save_Row_Num_Stmmng013); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridStmmng013.selectRow(save_Row_Num_Stmmng013);   //개발자 수정 필요  
                //var findCell = dhxGridStmmng013.findCell(save_Row_Ids_Stmmng013, gf_GetDhxGridColumId(dhxGridStmmng013,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmmng013.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmmng013.selectRow(0);
                //} 
            } 
 
            fn_FindStmmng013();
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmmng013');
            fn_InitInputFormStmmng013();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormStmmng013").text(data.data.records.length);
        cf_SetEventListenerStmmng013();
    } 
};
var fn_DhxDataProcessorStmmng013 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmmng013 = new dataProcessor(gv_ContextPath+'/stmmng013/saveStmmng013'); //lock feed url
    dhxDataProcessorStmmng013.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmmng013.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmmng013.init(dhxGridStmmng013); //link dataprocessor to the grid
    dhxDataProcessorStmmng013.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmmng013.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmmng013.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmmng013();
                    $("#checkAllStmmng013").prop('checked', false); //상단 체크박스 해제
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
var fn_FindStmmng013 = function() {
    var rId = dhxGridStmmng013.getSelectedRowId();
    var status = dhxDataProcessorStmmng013.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormStmmng013", "custNo", gf_DhxGetValue(dhxGridStmmng013, rId, 'custNo',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "custNm", gf_DhxGetValue(dhxGridStmmng013, rId, 'custNm',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "clsf", gf_DhxGetValue(dhxGridStmmng013, rId, 'clsf',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "cmpnyDept", gf_DhxGetValue(dhxGridStmmng013, rId, 'cmpnyDept',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "homeTelno", gf_DhxGetValue(dhxGridStmmng013, rId, 'homeTelno',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "cmpnyTelno", gf_DhxGetValue(dhxGridStmmng013, rId, 'cmpnyTelno',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "mbtlnum", gf_DhxGetValue(dhxGridStmmng013, rId, 'mbtlnum',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "email", gf_DhxGetValue(dhxGridStmmng013, rId, 'email',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "zip", gf_DhxGetValue(dhxGridStmmng013, rId, 'zip',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "bassAdres", gf_DhxGetValue(dhxGridStmmng013, rId, 'bassAdres',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "detailAdres", gf_DhxGetValue(dhxGridStmmng013, rId, 'detailAdres',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "bcncCode", gf_DhxGetValue(dhxGridStmmng013, rId, 'bcncCode',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "bcncCodeNm", gf_DhxGetValue(dhxGridStmmng013, rId, 'bcncCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "regNm", gf_DhxGetValue(dhxGridStmmng013, rId, 'regNm',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "regDt", gf_DhxGetValue(dhxGridStmmng013, rId, 'regDt',  'grid'), '');
    gf_FormSetValue("saveFormStmmng013", "rm", gf_DhxGetValue(dhxGridStmmng013, rId, 'rm',  'grid'), '');
    gf_FormSetValue('saveFormStmmng013', 'bcncChargerAt', (( gf_DhxGetValue(dhxGridStmmng013, rId, 'bcncChargerAt',  'grid') == '1') ? true : false), 'chkbox');

    if(status == 'inserted') {
        $('#saveFormStmmng013 input[name="custNo"]').prop('disabled', true);
    } else {
        $('#saveFormStmmng013 input[name="custNo"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmmng013 = function() {
    $('#saveFormStmmng013 input[name="custNo"]').prop('disabled', false);
    $('#saveFormStmmng013').resetForm();
    gf_FormSetValue('saveFormStmmng013', 'bcncCode', '', 'text');
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmmng013 *').prop('disabled', status);
    $('#saveFormStmmng013 input[name="custNo"]').prop('disabled', true);
};
/**
 * 추가(신규) 
 */
var fn_AddStmmng013 = function() {
    dhxGridStmmng013.clearSelection();
    fn_InitInputFormStmmng013();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //custNo
    initValueArr.push(''); //custNm
    initValueArr.push(''); //clsf
    initValueArr.push(''); //cmpnyDept
    initValueArr.push(''); //homeTelno
    initValueArr.push(''); //cmpnyTelno
    initValueArr.push(''); //mbtlnum
    initValueArr.push(''); //email
    initValueArr.push(''); //zip
    initValueArr.push(''); //bassAdres
    initValueArr.push(''); //detailAdres
    initValueArr.push(''); //bcncCode
    initValueArr.push(''); //bcncChargerAt
    initValueArr.push(''); //rm
    dhxGridStmmng013.addRow(dhxGridStmmng013.uid(), initValueArr, 0);
    dhxGridStmmng013.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmmng013');
    $('#btnPopEmpSearchStmmng013').show();
    fn_FormDisabled(false);
    gf_FormSetValue('saveFormStmmng013', 'custNo', '자동채번', 'text');
    $('#saveFormStmmng013 input[name="custNo"]').prop('disabled', true);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmmng013SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmmng013, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmmng013', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmmng013', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmmng013, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmmng013.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmmng013', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmmng013', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng013, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmmng013.setSortImgState(false); 
            gf_FormSetValue('searchFormStmmng013', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmmng013', 'sortColumId', '', 'text'); 
            dhxGridStmmng013.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmmng013.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmmng013', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmmng013', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng013, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmmng013 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmmng013 = 0; 
    save_Edt_Cnt_Stmmng013 = 0; 
    save_Del_Cnt_Stmmng013 = 0; 
    dhxGridStmmng013.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmmng013.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmmng013.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmmng013 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmmng013 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmmng013 += 1; 
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
        save_All_Sta_Stmmng013 = 0; 
        if(save_Add_Cnt_Stmmng013 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmmng013 + "건";
            save_All_Sta_Stmmng013 = 1; 
        } 
        if(save_Edt_Cnt_Stmmng013 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmmng013 + "건"; 
        } 
        if(save_Del_Cnt_Stmmng013 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmmng013 + "건"; 
            save_All_Sta_Stmmng013 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmmng013(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmmng013(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmmng013 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmmng013_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmmng013_Send = function() {
    if(fn_GridValidation(dhxGridStmmng013, dhxDataProcessorStmmng013)) {
        dhxDataProcessorStmmng013.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmmng013 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmmng013, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridStmmng013.forEachRow(function(rowId) {
            state = dhxDataProcessorStmmng013.getState(rowId);
            if(dhxGridStmmng013.cells(rowId, gf_GetDhxGridColumId(dhxGridStmmng013, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridStmmng013.getRowIndex(rowId);
                    dhxGridStmmng013.deleteRow(rowId);
                    dhxGridStmmng013.selectRow(rowNum);
                    fn_FindStmmng013();
                }
                else dhxDataProcessorStmmng013.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmmng013 = function () {
    var titStmmng013 = '승급대상자조회'; /* gf_LocaleTrans('default', 'titStmmng013') */
    var jsonParameter = {
        custNo : gf_FormGetValue('searchFormStmmng013', 'custNo', 'text')
    };
    var header = [[
        '고객번호' /* gf_LocaleTrans('default', 'titCustNo') */,
        '고객성명' /* gf_LocaleTrans('default', 'titCustNm') */,
        '직급' /* gf_LocaleTrans('default', 'titClsf') */,
        '회사부서' /* gf_LocaleTrans('default', 'titCmpnyDept') */,
        '집전화번호' /* gf_LocaleTrans('default', 'titHomeTelno') */,
        '회사전화번호' /* gf_LocaleTrans('default', 'titCmpnyTelno') */,
        '휴대폰번호' /* gf_LocaleTrans('default', 'titMbtlnum') */,
        '이메일' /* gf_LocaleTrans('default', 'titEmail') */,
        '우편번호' /* gf_LocaleTrans('default', 'titZip') */,
        '기본주소' /* gf_LocaleTrans('default', 'titBassAdres') */,
        '상세주소' /* gf_LocaleTrans('default', 'titDetailAdres') */,
        '거래처코드' /* gf_LocaleTrans('default', 'titBcncCode') */,
        '거래처 주 담당자 여부' /* gf_LocaleTrans('default', 'titBcncChargerAt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'custNo', 'custNm', 'clsf', 'cmpnyDept', 'homeTelno', 'cmpnyTelno', 'mbtlnum', 'email', 'zip', 'bassAdres', 'detailAdres', 'bcncCode', 'bcncChargerAt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmmng013 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmmng013;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmmng013/excelStmmng013', jsonParameter);
};
/**
 * 거래처 검색 팝업
 */
var fn_CallbackPopComp = function(data) {
	 //console.log(" Callback : " + JSON.stringify(data));
	 gf_FormSetValue('saveFormStmmng013', 'bcncCode', data.bcncCode, 'text');
	 gf_FormSetValue('saveFormStmmng013', 'bcncCodeNm', data.bcncNm, 'text');
};	
/**
 * 우편번호 검색
 */
var fn_CallBackZipPopup = function(data){
	if(!gf_IsNull(data)){
		console.log(data.zipno + " : " + data.roadAddr1 + " " + (data.roadAddrDetail + " " + data.roadAddr2).trim());
		gf_FormSetValue('saveFormStmmng013', 'zip', data.zipno, 'text');  
		gf_FormSetValue('saveFormStmmng013', 'bassAdres', data.roadAddr1, 'text');
		gf_FormSetValue('saveFormStmmng013', 'detailAdres',(data.roadAddrDetail + " " + data.roadAddr2).trim(), 'text');
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
    $('#saveFormStmmng013 #custNoSaveFormStmmng013').parent().append(
    '<div class="error" id="custNoSaveFormStmmng013-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmmng013 = function(custNo){
    if(!gf_IsNull(custNo)) {
        var jsonParameter = {
            custNo : custNo
        };
        var dataSource = gf_NoAsyncTransaction('stmmng013/findStmmng013', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.custNo)) {
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
    var state = dhxDataProcessorStmmng013.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormStmmng013').validate().form()){
                if(state == 'inserted') {
                    var custNo = gf_FormGetValue('saveFormStmmng013', 'custNo', 'text');
                    if(fn_CheckDupStmmng013(custNo)) return true;
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
    var checkCustNo;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmmng013 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Stmmng013 == 'deleted') {
        save_Row_Num_Stmmng013 = 0;
        save_Row_Ids_Stmmng013 = "";
    } else if(save_Row_Sta_Stmmng013 == 'inserted') {
        save_Row_Num_Stmmng013 = rowNum;
        save_Row_Ids_Stmmng013 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmmng013 = rowNum;
        save_Row_Ids_Stmmng013 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'custNo', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'custNo');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'custNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'custNm');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkCustNo = gf_DhxGetValue(dhxGridObjet, rowId, 'custNo', 'grid');
                    if(!gf_IsNull(checkCustNo)) {
                        // 신규입력 key 그리드 중복 체크
//                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
//                            var custNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'custNo', 'grid');
//                            if(((custNo == checkCustNo)) && (rowId != rowIdForCheck)) {
//                                validFalseDuplicationKey = true;
//                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'custNo');
//                                valid = false;
//                            }
//                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmmng013( checkCustNo )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'custNo');
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
        dhxGridStmmng013.selectRowById(validFalseFistRowId);
        fn_FindStmmng013();
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
