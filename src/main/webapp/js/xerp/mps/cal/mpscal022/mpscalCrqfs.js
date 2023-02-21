/**
 *    프로그램       : 급여관리_자격 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.10
 *    사용테이블      : MHS_CRQFS
 * sourceGen version : 2020.06.29.01 (2020.07.10)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_MpscalCrqfs = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_MpscalCrqfs = 0;  //그리드 위치 상태 
var save_All_Sta_MpscalCrqfs = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_MpscalCrqfs = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_MpscalCrqfs = 0;  //그리드 추가 수량 
var save_Edt_Cnt_MpscalCrqfs = 0;  //그리드 저장 수량 
var save_Del_Cnt_MpscalCrqfs = 0;  //그리드 삭제 수량 
 
var titMhsCrqfs = gf_LocaleTrans('default', 'titMhsCrqfs');
var g_FamilySearchValue = new Object();  // 정보 최초 조회 값
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscalCrqfs();
    cf_SetComponentsMpscalCrqfs();
    cf_SetEventListenerMpscalCrqfs();
    cf_InitFormMpscalCrqfs();
    cf_SetBindingMpscalCrqfs();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscalCrqfs = function() {
//    gf_SetMenuPath();
//    $("#saveFormMpscalCrqfs").validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMpscalCrqfs;
var cf_SetComponentsMpscalCrqfs = function() {
    var dhxGridMpscalCrqfsHeaderInfo = [];
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscalCrqfs" />', '0', 'center', 'na', 'ch', true, 'chk', '', ''));
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '0', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('사원별 자격증의 순번을 기록', '0', 'right', 'int', 'ro', true, 'crqfsSn', '', '')); /* gf_LocaleTrans('default', 'titCrqfsSn') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('자격증코드번호', '0', 'left', 'str', 'ro', true, 'crqfsCodeNo', '', '')); /* gf_LocaleTrans('default', 'titCrqfsCodeNo') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('자격증코드번호', '*', 'center', 'str', 'ro', false, 'crqfsNm', '', '')); /* gf_LocaleTrans('default', 'titCrqfsCodeNo') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('취득일자', '200', 'center', 'str', 'ro', false, 'acqsDe', '', '')); /* gf_LocaleTrans('default', 'titAcqsDe') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('유효일자', '200', 'center', 'str', 'ro', false, 'validDe', '', '')); /* gf_LocaleTrans('default', 'titValidDe') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('자격증 구분', '0', 'center', 'str', 'ro', true, 'crqfsSe', '', '')); /* gf_LocaleTrans('default', 'titCrqfsSe') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('국가공인자격여부', '0', 'center', 'str', 'ro', true, 'nationathriQualfAt', '', '')); /* gf_LocaleTrans('default', 'titNationathriQualfAt') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('면허의 고유 번호', '0', 'left', 'str', 'ro', true, 'crqfsNo', '', '')); /* gf_LocaleTrans('default', 'titCrqfsNo') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('발급기관', '0', 'left', 'str', 'ro', true, 'issuInsttNm', '', '')); /* gf_LocaleTrans('default', 'titIssuInsttNm') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('국내외구분', '0', 'center', 'str', 'ro', true, 'dmstcAt', '', '')); /* gf_LocaleTrans('default', 'titDmstcAt') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('수당지급여부', '200', 'center', 'str', 'ch', false, 'allwncPymntAt', '', '')); /* gf_LocaleTrans('default', 'titAllwncPymntAt') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('자격수당금액', '200', 'right', 'int', 'edn', false, 'qualfAllwncAmt', '', '')); /* gf_LocaleTrans('default', 'titQualfAllwncAmt') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('인사평가 반영 여부', '0', 'center', 'str', 'ro', true, 'evlApplyAt', '', '')); /* gf_LocaleTrans('default', 'titEvlApplyAt') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('인정점수', '0', 'right', 'int', 'ro', true, 'recogScore', '', '')); /* gf_LocaleTrans('default', 'titRecogScore') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('비고 항목', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMpscalCrqfsHeaderInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '0', 'left', 'str', 'ro', true, 'atchmnflno', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflno') */
    dhxGridMpscalCrqfs = gf_MakeDhxGrid('dataListMpscalCrqfs', dhxGridMpscalCrqfsHeaderInfo, true, false, false);
    dhxGridMpscalCrqfs.enableAutoWidth(false);
    dhxGridMpscalCrqfs.setEditable(true);

    dhxGridMpscalCrqfs.setColumnMinWidth(200,5); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
};

var eventIdMpscalCrqfs = [];
var cf_SetEventListenerMpscalCrqfs = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscalCrqfs = gf_GridDetachEvent(dhxGridMpscalCrqfs, eventIdMpscalCrqfs);
    eventId = dhxGridMpscalCrqfs.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscalCrqfs();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscalCrqfs.getColumnsNum();
            var rowNum = dhxGridMpscalCrqfs.getRowsNum();
            var selectedId = dhxGridMpscalCrqfs.getSelectedRowId();
            var ind        = dhxGridMpscalCrqfs.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalCrqfs.getRowIndex(selectedId);
            var type       = dhxGridMpscalCrqfs.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscalCrqfs.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscalCrqfs.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscalCrqfs.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalCrqfs.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscalCrqfs.getSelectedRowId();
            var ind        = dhxGridMpscalCrqfs.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalCrqfs.getRowIndex(selectedId);
            var type       = dhxGridMpscalCrqfs.getColType(ind);
            dhxGridMpscalCrqfs.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalCrqfs.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscalCrqfs.getSelectedRowId();
            var ind        = dhxGridMpscalCrqfs.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalCrqfs.getRowIndex(selectedId);
            var type       = dhxGridMpscalCrqfs.getColType(ind);
            dhxGridMpscalCrqfs.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalCrqfs.editCell();
            }
        }
        else return true;
    });
    eventIdMpscalCrqfs.push(eventId);
    eventId = dhxGridMpscalCrqfs.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_MpscalCrqfsSortGridList(ind, type, direction); 
    });
    eventIdMpscalCrqfs.push(eventId);
    eventId = dhxGridMpscalCrqfs.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscalCrqfs.push(eventId);
    eventId = dhxGridMpscalCrqfs.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpscalCrqfs.push(eventId);
    eventId = dhxGridMpscalCrqfs.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscalCrqfs.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscalCrqfs').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscalCrqfs()
    });
    $('#btnSaveMpscalCrqfs').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var allwncPymntAt = dhxGridMpscalCrqfs.cells(dhxGridMpscalCrqfs.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalCrqfs,'allwncPymntAt')).getValue();
        var qualfAllwncAmt = dhxGridMpscalCrqfs.cells(dhxGridMpscalCrqfs.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalCrqfs,'qualfAllwncAmt')).getValue();
        if((allwncPymntAt == '0') && (!gf_IsNull(qualfAllwncAmt))){
        	gf_DivMsgAlert("수당지급여부를 선택해주세요.");
        	return false;
        }else if ((allwncPymntAt == '1') && (gf_IsNull(qualfAllwncAmt))){
            gf_DivMsgAlert("자격수당금액을 입력해주세요.");
            return false;
        }else {
        	fn_SaveMpscalCrqfs();	
        }
    });
    $('#btnRemoveMpscalCrqfs').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscalCrqfs();
    });
    $('#btnExcelMpscalCrqfs').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscalCrqfs();
    });
    $('#btnSearchMpscalCrqfs').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscalCrqfs('');
    });
    $('#btnResetMpscalCrqfs').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscalCrqfs();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpscalCrqfs').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscalCrqfs, $('#checkAllMpscalCrqfs').prop('checked'), 'chk');
    });
    $('#searchFormMpscalCrqfs input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpscalCrqfs').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrbCrqfs") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpscalCrqfs').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMpscalCrqfs = function() {
    $('#searchFormMpscalCrqfs').resetForm();
};

var cf_SetBindingMpscalCrqfs = function() {
    fn_SearchMpscalCrqfs('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscalCrqfs = function(userId) {
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpscalCrqfs', 'empno', 'text'),
        crqfsSn : gf_FormGetValue('searchFormMpscalCrqfs', 'crqfsSn', 'text')
    };
    gf_Transaction(userId, 'mpscal022/searchMpscalCrqfs', jsonParameter, 'fn_CallbackSearchMpscalCrqfs', false, 'GET');
};

var dhxDataProcessorMpscalCrqfs;
var fn_CallbackSearchMpscalCrqfs = function(strSvcID, targetID, data) {
    dhxGridMpscalCrqfs.clearAll();
    fn_DhxDataProcessorMpscalCrqfs(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscalCrqfs');
        dhxGridMpscalCrqfs.parse(data.data.records, 'js');
 
        if(save_Row_Ids_MpscalCrqfs == 0 && save_All_Sta_MpscalCrqfs == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscalCrqfs.selectRow(0); 
        } else if(save_Row_Sta_MpscalCrqfs == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpscalCrqfs.selectRow(0);
        } else if(save_All_Sta_MpscalCrqfs == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpscalCrqfs.selectRow(save_Row_Num_MpscalCrqfs); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpscalCrqfs.selectRow(save_Row_Num_MpscalCrqfs);   //개발자 수정 필요  
            //var findCell = dhxGridMpscalCrqfs.findCell(save_Row_Ids_MpscalCrqfs, gf_GetDhxGridColumId(dhxGridMpscalCrqfs,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscalCrqfs.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscalCrqfs.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscalCrqfs');
    }
    $("#spanCntSearchFormMpscalCrqfs").text(data.data.records.length);
    cf_SetEventListenerMpscalCrqfs();
};
var fn_DhxDataProcessorMpscalCrqfs = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpscalCrqfs = new dataProcessor(gv_ContextPath+'/mpscal022/saveMpscalCrqfs'); //lock feed url
    dhxDataProcessorMpscalCrqfs.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscalCrqfs.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscalCrqfs.init(dhxGridMpscalCrqfs); //link dataprocessor to the grid
    dhxDataProcessorMpscalCrqfs.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscalCrqfs.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscalCrqfs.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpscalCrqfs();
                    $("#checkAllMpscalCrqfs").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMpscalCrqfs = function() {
    dhxGridMpscalCrqfs.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //empno
    initValueArr.push(''); //crqfsSn
    initValueArr.push(''); //crqfsCodeNo
    initValueArr.push(''); //acqsDe
    initValueArr.push(''); //validDe
    initValueArr.push(''); //crqfsSe
    initValueArr.push(''); //nationathriQualfAt
    initValueArr.push(''); //crqfsNo
    initValueArr.push(''); //issuInsttNm
    initValueArr.push(''); //dmstcAt
    initValueArr.push(''); //allwncPymntAt
    initValueArr.push(''); //qualfAllwncAmt
    initValueArr.push(''); //evlApplyAt
    initValueArr.push(''); //recogScore
    initValueArr.push(''); //rm
    initValueArr.push(''); //atchmnflno
    dhxGridMpscalCrqfs.addRow(dhxGridMpscalCrqfs.uid(), initValueArr, 0);
    dhxGridMpscalCrqfs.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscalCrqfs');
    $('#btnPopEmpSearchMpscalCrqfs').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_MpscalCrqfsSortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscalCrqfs, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscalCrqfs', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscalCrqfs', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscalCrqfs, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscalCrqfs.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscalCrqfs', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscalCrqfs', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscalCrqfs, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscalCrqfs.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscalCrqfs', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscalCrqfs', 'sortColumId', '', 'text'); 
            dhxGridMpscalCrqfs.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscalCrqfs.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscalCrqfs', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscalCrqfs', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscalCrqfs, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscalCrqfs = function() {
    var edCnt = 0;
    save_Add_Cnt_MpscalCrqfs = 0; 
    save_Edt_Cnt_MpscalCrqfs = 0; 
    save_Del_Cnt_MpscalCrqfs = 0; 
    dhxGridMpscalCrqfs.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscalCrqfs.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscalCrqfs.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_MpscalCrqfs += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_MpscalCrqfs += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_MpscalCrqfs += 1; 
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
        save_All_Sta_MpscalCrqfs = 0; 
        if(save_Add_Cnt_MpscalCrqfs > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_MpscalCrqfs + "건";
            save_All_Sta_MpscalCrqfs = 1; 
        } 
        if(save_Edt_Cnt_MpscalCrqfs > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_MpscalCrqfs + "건"; 
        } 
        if(save_Del_Cnt_MpscalCrqfs > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_MpscalCrqfs + "건"; 
            save_All_Sta_MpscalCrqfs = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscalCrqfs(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscalCrqfs(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscalCrqfs = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscalCrqfs_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscalCrqfs_Send = function() {
    if(fn_GridValidation(dhxGridMpscalCrqfs, dhxDataProcessorMpscalCrqfs)) {
        dhxDataProcessorMpscalCrqfs.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscalCrqfs = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscalCrqfs, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscalCrqfs.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscalCrqfs.getState(rowId);
            if(dhxGridMpscalCrqfs.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscalCrqfs, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscalCrqfs.getRowIndex(rowId);
                    dhxGridMpscalCrqfs.deleteRow(rowId);
                    dhxGridMpscalCrqfs.selectRow(rowNum);
                }
                else dhxDataProcessorMpscalCrqfs.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscalCrqfs = function () {
    var titMpscalCrqfs = '급여관리_자격'; /* gf_LocaleTrans('default', 'titMpscalCrqfs') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpscalCrqfs', 'empno', 'text'),
        crqfsSn : gf_FormGetValue('searchFormMpscalCrqfs', 'crqfsSn', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '사원별 자격증의 순번을 기록' /* gf_LocaleTrans('default', 'titCrqfsSn') */,
        '자격증코드번호' /* gf_LocaleTrans('default', 'titCrqfsCodeNo') */,
        '면허를 취득한 일자' /* gf_LocaleTrans('default', 'titAcqsDe') */,
        '유효일자' /* gf_LocaleTrans('default', 'titValidDe') */,
        '자격증 구분' /* gf_LocaleTrans('default', 'titCrqfsSe') */,
        '국가공인자격여부' /* gf_LocaleTrans('default', 'titNationathriQualfAt') */,
        '면허의 고유 번호' /* gf_LocaleTrans('default', 'titCrqfsNo') */,
        '발급기관' /* gf_LocaleTrans('default', 'titIssuInsttNm') */,
        '국내외구분' /* gf_LocaleTrans('default', 'titDmstcAt') */,
        '수당지급여부' /* gf_LocaleTrans('default', 'titAllwncPymntAt') */,
        '자격수당금액' /* gf_LocaleTrans('default', 'titQualfAllwncAmt') */,
        '인사평가 반영 여부' /* gf_LocaleTrans('default', 'titEvlApplyAt') */,
        '인정점수' /* gf_LocaleTrans('default', 'titRecogScore') */,
        '비고 항목' /* gf_LocaleTrans('default', 'titRm') */,
        '첨부파일번호' /* gf_LocaleTrans('default', 'titAtchmnflno') */
    ]];
    var dataId = [[ 'empno', 'crqfsSn', 'crqfsCodeNo', 'acqsDe', 'validDe', 'crqfsSe', 'nationathriQualfAt', 'crqfsNo', 'issuInsttNm', 'dmstcAt', 'allwncPymntAt', 'qualfAllwncAmt', 'evlApplyAt', 'recogScore', 'rm', 'atchmnflno' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpscalCrqfs ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscalCrqfs;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscalCrqfs/excelMpscalCrqfs', jsonParameter);
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
    $('#saveFormMpscalCrqfs #empnoSaveFormMpscalCrqfs').parent().append(
    '<div class="error" id="empnoSaveFormMpscalCrqfs-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscalCrqfs #crqfsSnSaveFormMpscalCrqfs').parent().append(
    '<div class="error" id="crqfsSnSaveFormMpscalCrqfs-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscalCrqfs = function(empno, crqfsSn){
    if(!gf_IsNull(empno) && !gf_IsNull(crqfsSn)) {
        var jsonParameter = {
            empno : empno,
            crqfsSn : crqfsSn
        };
        var dataSource = gf_NoAsyncTransaction('mpscal022/findMpscalCrqfs', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno) && gf_IsNull(data.crqfsSn)) {
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
    var checkEmpno;
    var checkCrqfsSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_MpscalCrqfs = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_MpscalCrqfs = 0;
        save_Row_Ids_MpscalCrqfs = "";
    } else if(state == 'inserted') {
        save_Row_Num_MpscalCrqfs = rowNum;
        save_Row_Ids_MpscalCrqfs = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_MpscalCrqfs = rowNum;
        save_Row_Ids_MpscalCrqfs = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'crqfsSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crqfsSn');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'allwncPymntAt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'allwncPymntAt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'qualfAllwncAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qualfAllwncAmt');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    checkCrqfsSn = gf_DhxGetValue(dhxGridObjet, rowId, 'crqfsSn', 'grid');
                    if(!gf_IsNull(checkEmpno, checkCrqfsSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var crqfsSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'crqfsSn', 'grid');
                            if(((empno == checkEmpno) && (crqfsSn == checkCrqfsSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crqfsSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscalCrqfs( checkEmpno, checkCrqfsSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crqfsSn');
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
        dhxGridMpscalCrqfs.selectRowById(validFalseFistRowId);
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
