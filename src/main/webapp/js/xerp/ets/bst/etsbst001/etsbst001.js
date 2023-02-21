/**
 *    프로그램       : 전결규정 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2021.03.22
 *    사용테이블      : SGN_DCRB_REGLTN
 * sourceGen version : 2021.02.18.01 (2021.03.22)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Etsbst001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Etsbst001 = 0;  //그리드 위치 상태 
var save_All_Sta_Etsbst001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Etsbst001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Row_Values_Etsbst001 = "";  //그리드에서 저장하는 위치의 key 값, 개발자에 의해 수정 필요 
var save_Add_Cnt_Etsbst001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Etsbst001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Etsbst001 = 0;  //그리드 삭제 수량 
var dhxGridEtsbst001;  //그리드 객체
var eventIdEtsbst001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorEtsbst001;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamEtsbst001();
    if(cf_SetComponentsEtsbst001()){
       cf_SetEventListenerEtsbst001();
       cf_InitFormEtsbst001();
       cf_SetBindingEtsbst001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamEtsbst001 = function() {
    gf_SetMenuPath();
    $("#saveFormEtsbst001").validate({ errorElement: 'div', ignore: '' });

	gf_MakeRadioBasic('sanctnLvlSaveFormEtsbst001','sanctnLvlSaveFormEtsbst001','10','','etsbst001/searchSanctnLvl'); // 그룹권한 커스텀 콤보
	gf_FormSetValue("saveFormEtsbst001", "sanctnLvlSaveFormEtsbst001", '10', 'radio');
	gf_FormSetValue("saveFormEtsbst001", "useAt", true, 'chkbox');
};

var cf_SetComponentsEtsbst001 = function() {
    var dhxGridEtsbst001HeaderInfo = [];
    dhxGridEtsbst001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridEtsbst001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllEtsbst001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridEtsbst001HeaderInfo.push(gf_MakeDhxGridHeader('업무명', '100', 'left', 'str', 'ro', false, 'jobnm', '', '')); /* gf_LocaleTrans('default', 'titJobnm') */
    dhxGridEtsbst001HeaderInfo.push(gf_MakeDhxGridHeader('상세 단위 과제', '*', 'left', 'str', 'ro', false, 'detailUnitAssgmnt', '', '')); /* gf_LocaleTrans('default', 'titDetailUnitAssgmnt') */
    dhxGridEtsbst001HeaderInfo.push(gf_MakeDhxGridHeader('사용 여부', '100', 'center', 'str', 'useAtro', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridEtsbst001HeaderInfo.push(gf_MakeDhxGridHeader('전결 번호', '100', 'left', 'str', 'ro', true, 'dcrbNo', '', '')); /* gf_LocaleTrans('default', 'titDcrbNo') */
    dhxGridEtsbst001HeaderInfo.push(gf_MakeDhxGridHeader('결재 레벨', '100', 'left', 'str', 'ro', true, 'sanctnLvl', '', '')); /* gf_LocaleTrans('default', 'titSanctnLvl') */
    dhxGridEtsbst001HeaderInfo.push(gf_MakeDhxGridHeader('업무 설명', '100', 'left', 'str', 'ro', true, 'jobDc', '', '')); /* gf_LocaleTrans('default', 'titJobDc') */
    dhxGridEtsbst001HeaderInfo.push(gf_MakeDhxGridHeader('규정 조항', '100', 'left', 'str', 'ro', true, 'regltnArtcl', '', '')); /* gf_LocaleTrans('default', 'titRegltnArtcl') */
    dhxGridEtsbst001 = gf_MakeDhxGrid('dataListEtsbst001', dhxGridEtsbst001HeaderInfo, true, false, false);
    dhxGridEtsbst001.enableAutoWidth(false);
    dhxGridEtsbst001.setEditable(true);

    dhxGridEtsbst001.setColumnMinWidth(40,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerEtsbst001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdEtsbst001 = gf_GridDetachEvent(dhxGridEtsbst001, eventIdEtsbst001);
    eventId = dhxGridEtsbst001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelEtsbst001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridEtsbst001.getColumnsNum();
            var rowNum = dhxGridEtsbst001.getRowsNum();
            var selectedId = dhxGridEtsbst001.getSelectedRowId();
            var ind        = dhxGridEtsbst001.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsbst001.getRowIndex(selectedId);
            var type       = dhxGridEtsbst001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridEtsbst001.selectRow(0);
                    //fn_FindEtsbst001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridEtsbst001.selectRow(rowIndex + 1);
                    fn_FindEtsbst001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridEtsbst001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsbst001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridEtsbst001.getSelectedRowId();
            var ind        = dhxGridEtsbst001.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsbst001.getRowIndex(selectedId);
            var type       = dhxGridEtsbst001.getColType(ind);
            dhxGridEtsbst001.selectCell(rowIndex+1, ind);
            fn_FindEtsbst001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsbst001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridEtsbst001.getSelectedRowId();
            var ind        = dhxGridEtsbst001.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsbst001.getRowIndex(selectedId);
            var type       = dhxGridEtsbst001.getColType(ind);
            dhxGridEtsbst001.selectCell(rowIndex-1, ind);
            fn_FindEtsbst001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsbst001.editCell();
            }
        }
        else return true;
    });
    eventIdEtsbst001.push(eventId);
    eventId = dhxGridEtsbst001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Etsbst001SortGridList(ind, type, direction); 
    });
    eventIdEtsbst001.push(eventId);
    eventId = dhxGridEtsbst001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdEtsbst001.push(eventId);
    eventId = dhxGridEtsbst001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindEtsbst001();
    });
    eventIdEtsbst001.push(eventId);
    eventId = dhxGridEtsbst001.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdEtsbst001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddEtsbst001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddEtsbst001()
    });
    $('#btnSaveEtsbst001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveEtsbst001();
    });
    $('#btnRemoveEtsbst001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveEtsbst001();
    });
    $('#btnExcelEtsbst001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelEtsbst001();
    });
    $('#btnSearchEtsbst001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchEtsbst001('');
    });
    $('#btnResetEtsbst001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormEtsbst001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllEtsbst001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var nRows =dhxGridEtsbst001.getRowsNum();
        for(var i = 0; i <nRows; i++) {
            dhxGridEtsbst001.selectRow(i);
        }
        gf_DhxCheckAllGridHeader(dhxGridEtsbst001, $('#checkAllEtsbst001').prop('checked'), 'chk');
    });
    $('#searchFormEtsbst001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchEtsbst001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormEtsbst001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormEtsbst001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
			if(this.id != "jobDcSaveFormEtsbst001"){
				return gf_saveForm_NextEle("saveFormEtsbst001",this);
			} 
		} //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormEtsbst001 input[name="jobnm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridEtsbst001, dhxDataProcessorEtsbst001, 'jobnm', $(this).val());
    });
    $('#saveFormEtsbst001 input[name="detailUnitAssgmnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridEtsbst001, dhxDataProcessorEtsbst001, 'detailUnitAssgmnt', $(this).val());
    });
    $('#saveFormEtsbst001 textarea[name="jobDc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridEtsbst001, dhxDataProcessorEtsbst001, 'jobDc', $(this).val());
    });
    $('#saveFormEtsbst001 input:radio[name="sanctnLvlSaveFormEtsbst001"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridEtsbst001, dhxDataProcessorEtsbst001, 'sanctnLvl', $(this).val());
    });
    $('#saveFormEtsbst001 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($('input[name="useAt"]').is(":checked") == true){
        	gf_DhxGridCellMapping(dhxGridEtsbst001, dhxDataProcessorEtsbst001, 'useAt', '1');
        } else {
        	gf_DhxGridCellMapping(dhxGridEtsbst001, dhxDataProcessorEtsbst001, 'useAt', '0');
        }
    });
    $('#saveFormEtsbst001 input[name="dcrbNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridEtsbst001, dhxDataProcessorEtsbst001, 'dcrbNo', $(this).val());
    });
    $('#saveFormEtsbst001 input[name="regltnArtcl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridEtsbst001, dhxDataProcessorEtsbst001, 'regltnArtcl', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormEtsbst001 = function() {
    $('#searchFormEtsbst001').resetForm();
//    gf_SetDataAuthorSe();
};

var cf_SetBindingEtsbst001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchEtsbst001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchEtsbst001 = function(userId) {
    var jsonParameter = {
        jobnm : gf_FormGetValue('searchFormEtsbst001', 'jobnmSearch', 'text'),
        jobDc : gf_FormGetValue('searchFormEtsbst001', 'jobDcSearch', 'text'),
        useAt : gf_FormGetValue('searchFormEtsbst001', 'useAtSearch', 'combo')
    };
    gf_Transaction(userId, 'etsbst001/searchEtsbst001', jsonParameter, 'fn_CallbackSearchEtsbst001', false, 'GET');
};

var fn_CallbackSearchEtsbst001 = function(strSvcID, targetID, data) {
    //dhxGridEtsbst001.clearAll();
    dhxGridEtsbst001.destructor();
    if(cf_SetComponentsEtsbst001()){ 
        fn_DhxDataProcessorEtsbst001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListEtsbst001');
            dhxGridEtsbst001.parse(data.data.records, 'js');
 
            if(save_Row_Num_Etsbst001 == 0 && save_All_Sta_Etsbst001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridEtsbst001.selectRow(0); 
            } else if(save_Row_Sta_Etsbst001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridEtsbst001.selectRow(0);
            } else if(save_All_Sta_Etsbst001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridEtsbst001.selectRow(save_Row_Num_Etsbst001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridEtsbst001.selectRow(save_Row_Num_Etsbst001);   //개발자 수정 필요  
                //var findCell = dhxGridEtsbst001.findCell(save_Row_Values_Etsbst001, gf_GetDhxGridColumId(dhxGridEtsbst001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridEtsbst001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridEtsbst001.selectRow(0);
                //} 
            } 
 
            fn_FindEtsbst001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListEtsbst001');
            fn_InitInputFormEtsbst001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormEtsbst001").text(data.data.records.length);
        cf_SetEventListenerEtsbst001();
    } 
};
var fn_DhxDataProcessorEtsbst001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorEtsbst001 = new dataProcessor(gv_ContextPath+'/etsbst001/saveEtsbst001'); //lock feed url
    dhxDataProcessorEtsbst001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorEtsbst001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorEtsbst001.init(dhxGridEtsbst001); //link dataprocessor to the grid
    dhxDataProcessorEtsbst001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorEtsbst001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorEtsbst001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchEtsbst001();
                    $("#checkAllEtsbst001").prop('checked', false); //상단 체크박스 해제
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
var fn_FindEtsbst001 = function() {
    var rId = dhxGridEtsbst001.getSelectedRowId();
    var status = dhxDataProcessorEtsbst001.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormEtsbst001", "dcrbNo", gf_DhxGetValue(dhxGridEtsbst001, rId, 'dcrbNo',  'grid'), '');
    gf_FormSetValue("saveFormEtsbst001", "jobnm", gf_DhxGetValue(dhxGridEtsbst001, rId, 'jobnm',  'grid'), '');
    gf_FormSetValue("saveFormEtsbst001", "sanctnLvlSaveFormEtsbst001", gf_DhxGetValue(dhxGridEtsbst001, rId, 'sanctnLvl',  'grid'), 'radio');
    gf_FormSetValue("saveFormEtsbst001", "jobDc", gf_DhxGetValue(dhxGridEtsbst001, rId, 'jobDc',  'grid'), 'textarea');
    gf_FormSetValue("saveFormEtsbst001", "regltnArtcl", gf_DhxGetValue(dhxGridEtsbst001, rId, 'regltnArtcl',  'grid'), '');
    gf_FormSetValue("saveFormEtsbst001", "detailUnitAssgmnt", gf_DhxGetValue(dhxGridEtsbst001, rId, 'detailUnitAssgmnt',  'grid'), '');
    gf_FormSetValue("saveFormEtsbst001", "useAt", gf_DhxGetValue(dhxGridEtsbst001, rId, 'useAt',  'grid')==1?true:false, 'chkbox');

    if(status == 'inserted') {
        $('#saveFormEtsbst001 input[name="dcrbNo"]').prop('disabled', false);
    } else {
        $('#saveFormEtsbst001 input[name="dcrbNo"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormEtsbst001 = function() {
    $('#saveFormEtsbst001 input[name="dcrbNo"]').prop('disabled', false);
    $('#saveFormEtsbst001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormEtsbst001 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddEtsbst001 = function() {
    dhxGridEtsbst001.clearSelection();
    fn_InitInputFormEtsbst001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //jobnm
    initValueArr.push(''); //detailUnitAssgmnt
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //dcrbNo
    initValueArr.push(''); //sanctnLvl
    initValueArr.push(''); //jobDc
    initValueArr.push(''); //regltnArtcl
    dhxGridEtsbst001.addRow(dhxGridEtsbst001.uid(), initValueArr, 0);
    dhxGridEtsbst001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListEtsbst001');
    $('#btnPopEmpSearchEtsbst001').show();
    fn_FormDisabled(false);
	gf_FormSetValue("saveFormEtsbst001", "sanctnLvlSaveFormEtsbst001", '10', 'radio');
	gf_FormSetValue("saveFormEtsbst001", "useAt", true, 'chkbox');
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Etsbst001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridEtsbst001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormEtsbst001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormEtsbst001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridEtsbst001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridEtsbst001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormEtsbst001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormEtsbst001', 'sortColumId', gf_GetDhxGridColum(dhxGridEtsbst001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridEtsbst001.setSortImgState(false); 
            gf_FormSetValue('searchFormEtsbst001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormEtsbst001', 'sortColumId', '', 'text'); 
            dhxGridEtsbst001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridEtsbst001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormEtsbst001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormEtsbst001', 'sortColumId', gf_GetDhxGridColum(dhxGridEtsbst001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveEtsbst001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Etsbst001 = 0; 
    save_Edt_Cnt_Etsbst001 = 0; 
    save_Del_Cnt_Etsbst001 = 0; 
    dhxGridEtsbst001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorEtsbst001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorEtsbst001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Etsbst001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Etsbst001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Etsbst001 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        if(fn_GridValidation(dhxGridEtsbst001, dhxDataProcessorEtsbst001)) {
            var confirmMsg  = ""; 
            var confirmMsg1 = ""; 
            var confirmMsg2 = ""; 
            var confirmMsg3 = ""; 
            save_All_Sta_Etsbst001 = 0; 
            if(save_Add_Cnt_Etsbst001 > 0){
                confirmMsg1 = "신규 " + save_Add_Cnt_Etsbst001 + "건";
                save_All_Sta_Etsbst001 = 1; 
            } 
            if(save_Edt_Cnt_Etsbst001 > 0){ 
                confirmMsg2 = "수정 " + save_Edt_Cnt_Etsbst001 + "건"; 
            } 
            if(save_Del_Cnt_Etsbst001 > 0){ 
                confirmMsg3 = "삭제 " + save_Del_Cnt_Etsbst001 + "건"; 
                save_All_Sta_Etsbst001 = 1; 
            } 
            if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
                confirmMsg1 = confirmMsg1 + ", ";
            }
            if(confirmMsg2 != "" && confirmMsg3 != ""){
                confirmMsg2 = confirmMsg2 + ", ";
            }
            confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
            
            //if(confirmModalEtsbst001(gv_QueSave)){  //여기는 안옴 
            if(confirmModalEtsbst001(confirmMsg)){  //여기는 안옴 
            } else { 
                return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
            } 
        } 
    }
}
var confirmModalEtsbst001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveEtsbst001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveEtsbst001_Send = function() {
    //if(fn_GridValidation(dhxGridEtsbst001, dhxDataProcessorEtsbst001)) {
        dhxDataProcessorEtsbst001.sendData();
    //}
}
/**
 * 삭제
 */
var fn_RemoveEtsbst001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridEtsbst001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridEtsbst001.forEachRow(function(rowId) {
            state = dhxDataProcessorEtsbst001.getState(rowId);
            if(dhxGridEtsbst001.cells(rowId, gf_GetDhxGridColumId(dhxGridEtsbst001, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridEtsbst001.getRowIndex(rowId);
                    dhxGridEtsbst001.deleteRow(rowId);
                    dhxGridEtsbst001.selectRow(rowNum);
                    fn_FindEtsbst001();
                }
                else dhxDataProcessorEtsbst001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelEtsbst001 = function () {
    var titEtsbst001 = '위임전결규정'; /* gf_LocaleTrans('default', 'titEtsbst001') */
    var jsonParameter = {
        jobnm : gf_FormGetValue('searchFormEtsbst001', 'jobnmSearch', 'text'),
        jobDc : gf_FormGetValue('searchFormEtsbst001', 'jobDcSearch', 'text'),
        useAt : gf_FormGetValue('searchFormEtsbst001', 'useAtSearch', 'combo')
    };

    var header = [[
        '전결 번호' /* gf_LocaleTrans('default', 'titDcrbNo') */,
        '업무명' /* gf_LocaleTrans('default', 'titJobnm') */,
        '상세 단위과제' /* gf_LocaleTrans('default', 'titSanctnLvl') */,
        '업무내용' /* gf_LocaleTrans('default', 'titJobDc') */,
        '결재 레벨' /* gf_LocaleTrans('default', 'titRegltnArtcl') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titDetailUnitAssgmnt') */
    ]];
    var dataId = [[ 'dcrbNo', 'jobnm', 'detailUnitAssgmnt', 'jobDc', 'sanctnLvlNm', 'useAtNm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titEtsbst001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titEtsbst001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('etsbst001/excelEtsbst001', jsonParameter);
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
    $('#saveFormEtsbst001 #jobnmSaveFormEtsbst001').parent().append(
    '<div class="error" id="jobnmSaveFormEtsbst001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupEtsbst001 = function(jobnm){
    if(!gf_IsNull(jobnm)) {
        var jsonParameter = {
            jobnm : jobnm
        };
        var dataSource = gf_NoAsyncTransaction('etsbst001/findEtsbst001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.dcrbNo)) {
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
    var state = dhxDataProcessorEtsbst001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormEtsbst001').validate().form()){
                if(state == 'inserted') {
                    var jobnm = gf_FormGetValue('saveFormEtsbst001', 'jobnm', 'text');
                    if(fn_CheckDupEtsbst001(jobnm)) return true;
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
    var checkJobnm;
    var checkDetailUnitAssgmnt;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Etsbst001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Etsbst001 == 'deleted') {
        save_Row_Num_Etsbst001 = 0;
        save_Row_Ids_Etsbst001 = "";
        save_Row_Values_Etsbst001 = "";
    } else if(save_Row_Sta_Etsbst001 == 'inserted') {
        save_Row_Num_Etsbst001 = rowNum;
        save_Row_Ids_Etsbst001 = ""; 
        save_Row_Values_Etsbst001 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Etsbst001 = rowNum;
        save_Row_Ids_Etsbst001 = rowIds; 
        save_Row_Values_Etsbst001 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid')  
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'jobnm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'jobnm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'detailUnitAssgmnt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'detailUnitAssgmnt');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkJobnm = gf_DhxGetValue(dhxGridObjet, rowId, 'jobnm', 'grid');	//업무명
                    checkDetailUnitAssgmnt = gf_DhxGetValue(dhxGridObjet, rowId, 'detailUnitAssgmnt', 'grid');	//상세 단위 과제
                    if(!gf_IsNull(checkJobnm) && !gf_IsNull(checkDetailUnitAssgmnt)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var jobnm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'jobnm', 'grid');
                            if(((jobnm == checkJobnm)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'jobnm');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupEtsbst001( checkJobnm )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'jobnm');
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
        dhxGridEtsbst001.selectRowById(validFalseFistRowId);
        fn_FindEtsbst001();
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
