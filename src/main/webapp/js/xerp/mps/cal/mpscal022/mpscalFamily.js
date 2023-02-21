/**
 *    프로그램       : 급여관리_가족 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.08
 *    사용테이블      : MHS_FAMILY
 * sourceGen version : 2020.06.29.01 (2020.07.08)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_MpscalFamily = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_MpscalFamily = 0;  //그리드 위치 상태 
var save_All_Sta_MpscalFamily = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_MpscalFamily = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_MpscalFamily = 0;  //그리드 추가 수량 
var save_Edt_Cnt_MpscalFamily = 0;  //그리드 저장 수량 
var save_Del_Cnt_MpscalFamily = 0;  //그리드 삭제 수량 

var titMhsFamily = gf_LocaleTrans('default','titMhsFamily');
var g_FamilySearchValue = new Object();  // 정보 최초 조회 값
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscalFamily();
    cf_SetComponentsMpscalFamily();
    cf_SetEventListenerMpscalFamily();
    cf_InitFormMpscalFamily();
    cf_SetBindingMpscalFamily();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscalFamily = function() {
    //gf_SetMenuPath();
    //$("#saveFormMpscalFamily").validate({ errorElement: 'div', ignore: '' });
	
};

var dhxGridMpscalFamily;
var cf_SetComponentsMpscalFamily = function() {
    var dhxGridMpscalFamilyHeaderInfo = [];
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscalFamily" />', '0', 'center', 'na', 'ch', true, 'chk', '', ''));
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '0', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('가족 순번', '0', 'right', 'int', 'ro', true, 'familySn', '', '')); /* gf_LocaleTrans('default', 'titFamilySn') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('연말정산', '*', 'center', 'str', 'coro', false, 'yndexcclcRelateCode', '', '')); /* gf_LocaleTrans('default', 'titYndexcclcRelateCode') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('연말정산 <br/> 대상여부', '80', 'center', 'str', 'ch', false, 'yndexcclcTrgetAt', '', '')); /* gf_LocaleTrans('default', 'titYndexcclcTrgetAt') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('관계', '0', 'center', 'str', 'coro', true, 'familyCode', '','')); // 관계(select box)
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('관계', '100', 'center', 'str', 'ro', false, 'familyRelateNm', '','')); // 관계(select box)
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmplNm'), '80', 'center', 'str', 'ro', false, 'familyNm', '', 'NotEmpty')); /* gf_LocaleTrans('default', 'titFamilyNm') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('가족구성원의 주민등록번호를 기록하는 항목', '0', 'left', 'str', 'ro', true, 'ihidnum', '', '')); /* gf_LocaleTrans('default', 'titIhidnum') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('생년월일', '100', 'left', 'str', 'ro', false, 'brthdy', '', '')); /* gf_LocaleTrans('default', 'titBrthdy') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('동거여부', '80', 'center', 'str', 'ch', false, 'livtgtAt', '', '')); /* gf_LocaleTrans('default', 'titLivtgtAt') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('부양여부 <br/>갑근세계산여부', '100', 'center', 'str', 'ch', false, 'suportAt', '', '')); /* gf_LocaleTrans('default', 'titSuportAt') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('수당지급', '80', 'center', 'str', 'ch', false, 'allwncTrgetAt', '', '')); /* gf_LocaleTrans('default', 'titAllwncTrgetAt') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('최종학력코드 ', '0', 'center', 'str', 'ro', true, 'lscholSeCode', '', '')); /* gf_LocaleTrans('default', 'titLscholSeCode') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('직장', '0', 'left', 'str', 'ro', true, 'wrcNm', '', '')); /* gf_LocaleTrans('default', 'titWrcNm') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('직업', '0', 'left', 'str', 'ro', true, 'occpNm', '', '')); /* gf_LocaleTrans('default', 'titOccpNm') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('직위 명', '0', 'left', 'str', 'ro', true, 'ofcpsNm', '', '')); /* gf_LocaleTrans('default', 'titOfcpsNm') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('휴대전화', '0', 'left', 'str', 'ro', true, 'mbtlnum', '', '')); /* gf_LocaleTrans('default', 'titMbtlnum') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('장애인여부', '80', 'center', 'str', 'ch', false, 'dspsnAt', '', '')); /* gf_LocaleTrans('default', 'titDspsnAt') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('장애인번호', '0', 'left', 'str', 'ro', true, 'dspsnNo', '', '')); /* gf_LocaleTrans('default', 'titDspsnNo') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('장애인번호', '80', 'center', 'str', 'ro', false, 'dspsnNoNm', '', '')); /* gf_LocaleTrans('default', 'titDspsnNo') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('장애인구분', '0', 'center', 'str', 'ro', true, 'dspsnSeCode', '', '')); /* gf_LocaleTrans('default', 'titDspsnSeCode') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('장애인구분', '100', 'center', 'str', 'ro', false, 'dspsnSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titDspsnSeCode') */
    dhxGridMpscalFamilyHeaderInfo.push(gf_MakeDhxGridHeader('중증여부', '60', 'center', 'str', 'ch', false, 'srsillAt', '', '')); /* gf_LocaleTrans('default', 'titSrsillAt') */
    dhxGridMpscalFamily = gf_MakeDhxGrid('dataListMpscalFamily', dhxGridMpscalFamilyHeaderInfo, true, false, false, false);
    dhxGridMpscalFamily.enableAutoWidth(false);
    dhxGridMpscalFamily.setEditable(true);

    dhxGridMpscalFamily.setColumnMinWidth(100,5); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    dhxGridMpscalFamily.enableEditEvents(true, false, false); // 원클릭, 더블클릭, F2key
    
    // 연말정산 관계 코드
    var yndexcclcRelateCodejsonParameter = {codekindCode : "C084",exceptCode :"",sortOrder :"asc" };
    var yndexcclcRelateCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', yndexcclcRelateCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscalFamily, dhxGridMpscalFamily.getColIndexById("yndexcclcRelateCode"), yndexcclcRelateCodedataSource.data, "sel");
    
//    var comboFamilyCode = dhxGridMpscalFamily.getCombo(6);
//	gf_MakeComboGrid(comboFamilyCode, 'sel', 'mhshrm006/searchMhshrm006Code', 'familyCode', 'familyRelateNm', '');
	
    // 가족코드
//    var familyCodejsonParameter = {codekindCode : "C019",exceptCode :"",sortOrder :"asc" };
//    var familyCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', familyCodejsonParameter, '');
//    gf_ComboDataSet(dhxGridMpscalFamily, dhxGridMpscalFamily.getColIndexById("familyCode"), familyCodedataSource.data, "sel");
    // 장애인코드
//    var dspsnSeCodejsonParameter = {codekindCode : "C152",exceptCode :"",sortOrder :"asc" };
//    var dspsnSeCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', dspsnSeCodejsonParameter, '');
//    gf_ComboDataSet(dhxGridMpscalFamily, dhxGridMpscalFamily.getColIndexById("dspsnSeCode"), dspsnSeCodedataSource.data, "sel");
//    // 장애인구분
//    var dspsnNojsonParameter = {codekindCode : "C290",exceptCode :"",sortOrder :"asc" };
//    var dspsnNodataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', dspsnNojsonParameter, '');
//    gf_ComboDataSet(dhxGridMpscalFamily, dhxGridMpscalFamily.getColIndexById("dspsnNo"), dspsnNodataSource.data, "sel");
};

var eventIdMpscalFamily = [];
var cf_SetEventListenerMpscalFamily = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscalFamily = gf_GridDetachEvent(dhxGridMpscalFamily, eventIdMpscalFamily);
    eventId = dhxGridMpscalFamily.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscalFamily();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscalFamily.getColumnsNum();
            var rowNum = dhxGridMpscalFamily.getRowsNum();
            var selectedId = dhxGridMpscalFamily.getSelectedRowId();
            var ind        = dhxGridMpscalFamily.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalFamily.getRowIndex(selectedId);
            var type       = dhxGridMpscalFamily.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscalFamily.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscalFamily.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscalFamily.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalFamily.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscalFamily.getSelectedRowId();
            var ind        = dhxGridMpscalFamily.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalFamily.getRowIndex(selectedId);
            var type       = dhxGridMpscalFamily.getColType(ind);
            dhxGridMpscalFamily.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalFamily.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscalFamily.getSelectedRowId();
            var ind        = dhxGridMpscalFamily.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalFamily.getRowIndex(selectedId);
            var type       = dhxGridMpscalFamily.getColType(ind);
            dhxGridMpscalFamily.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalFamily.editCell();
            }
        }
        else return true;
    });
    eventIdMpscalFamily.push(eventId);
    eventId = dhxGridMpscalFamily.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_MpscalFamilySortGridList(ind, type, direction); 
    });
    eventIdMpscalFamily.push(eventId);
    eventId = dhxGridMpscalFamily.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscalFamily.push(eventId);
    eventId = dhxGridMpscalFamily.attachEvent("onRowSelect", function(rId, cInd){
    	
    });
    eventIdMpscalFamily.push(eventId);
    eventId = dhxGridMpscalFamily.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscalFamily.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscalFamily').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscalFamily()
    });
    $('#btnSaveMpscalFamily').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var yndexcclcRelateCode = dhxGridMpscalFamily.cells(dhxGridMpscalFamily.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalFamily,'yndexcclcRelateCode')).getValue();
        var yndexcclcTrgetAt = dhxGridMpscalFamily.cells(dhxGridMpscalFamily.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalFamily,'yndexcclcTrgetAt')).getValue();
        var srsillAt = dhxGridMpscalFamily.cells(dhxGridMpscalFamily.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalFamily,'srsillAt')).getValue();
        
        if(gf_IsNull(yndexcclcRelateCode)){
        	gf_DivMsgAlert("연말정산을 선택해주세요.");
        	return false;
        }else{
        	fn_SaveMpscalFamily();
        }
    });
    $('#btnRemoveMpscalFamily').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscalFamily();
    });
    $('#btnExcelMpscalFamily').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscalFamily();
    });
    $('#btnSearchMpscalFamily').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscalFamily('');
    });
    $('#btnResetMpscalFamily').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscalFamily();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpscalFamily').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscalFamily, $('#checkAllMpscalFamily').prop('checked'), 'chk');
    });
    $('#searchFormMpscalFamily input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpscalFamily').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrbFamily") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpscalFamily').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMpscalFamily = function() {
    $('#searchFormMpscalFamily').resetForm();
    
    family_empno = gf_FormGetValue('searchFormMpscalFamily', 'empno', 'text');
    fn_SearchMpscalFamily();
};

var cf_SetBindingMpscalFamily = function() {
    fn_SearchMpscalFamily();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscalFamily = function(userId) {
	var empno = gf_FormGetValue('searchFormMpscalFamily', 'empno', 'text');

	family_empno = empno;	
	g_FamilySearchValue.empno = empno;
	g_FamilySearchValue.bplcCode = bplcCode;
	
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpscalFamily', 'empno', 'text'),
        familySn : gf_FormGetValue('searchFormMpscalFamily', 'familySn', 'text')
    };
    gf_Transaction(userId, 'mpscal022/searchMpscalFamily', jsonParameter, 'fn_CallbackSearchMpscalFamily', false, 'GET');
};

var dhxDataProcessorMpscalFamily;
var fn_CallbackSearchMpscalFamily = function(strSvcID, targetID, data) {
    dhxGridMpscalFamily.clearAll();
    fn_DhxDataProcessorMpscalFamily(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscalFamily');
        dhxGridMpscalFamily.parse(data.data.records, 'js');
 
        if(save_Row_Ids_MpscalFamily == 0 && save_All_Sta_MpscalFamily == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscalFamily.selectRow(0); 
        } else if(save_Row_Sta_MpscalFamily == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpscalFamily.selectRow(0);
        } else if(save_All_Sta_MpscalFamily == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpscalFamily.selectRow(save_Row_Num_MpscalFamily); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpscalFamily.selectRow(save_Row_Num_MpscalFamily);   //개발자 수정 필요  
            //var findCell = dhxGridMpscalFamily.findCell(save_Row_Ids_MpscalFamily, gf_GetDhxGridColumId(dhxGridMpscalFamily,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscalFamily.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscalFamily.selectRow(0);
            //} 
        } 
        dhxGridMpscalFamily.forEachRow(function(rowId) {
			var familySn = gf_DhxGetValue(dhxGridMpscalFamily, rowId, 'familySn', 'grid');
			if (!gf_IsNull(familySn)){
				dhxGridMpscalFamily.cells(rowId,11).setDisabled(true);
				dhxGridMpscalFamily.cells(rowId,12).setDisabled(true);
				dhxGridMpscalFamily.cells(rowId,13).setDisabled(true);
				dhxGridMpscalFamily.cells(rowId,19).setDisabled(true);
				
			}
        });
    }else {
        gf_NoFoundDataOnGridMsg('dataListMpscalFamily');
    }
    $("#spanCntSearchFormMpscalFamily").text(data.data.records.length);
    cf_SetEventListenerMpscalFamily();
};
var fn_DhxDataProcessorMpscalFamily = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpscalFamily = new dataProcessor(gv_ContextPath+'/mpscal022/saveMpscalFamily'); //lock feed url
    dhxDataProcessorMpscalFamily.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscalFamily.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscalFamily.init(dhxGridMpscalFamily); //link dataprocessor to the grid
    dhxDataProcessorMpscalFamily.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscalFamily.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscalFamily.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpscalFamily();
                    $("#checkAllMpscalFamily").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMpscalFamily = function() {
    dhxGridMpscalFamily.clearSelection();
    var empno = gf_FormGetValue('searchFormMpscalFamily', 'empno', 'text');
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(empno); //empno
    initValueArr.push(''); //familySn
    initValueArr.push(''); //yndexcclcRelateCode
    initValueArr.push(''); //yndexcclcTrgetAt
    initValueArr.push(''); //familyCode
    initValueArr.push(''); //familyNm
    initValueArr.push(''); //ihidnum
    initValueArr.push(''); //brthdy
    initValueArr.push(''); //livtgtAt
    initValueArr.push(''); //suportAt
    initValueArr.push(''); //allwncTrgetAt
    initValueArr.push(''); //lscholSeCode
    initValueArr.push(''); //wrcNm
    initValueArr.push(''); //occpNm
    initValueArr.push(''); //ofcpsNm
    initValueArr.push(''); //mbtlnum
    initValueArr.push(''); //dspsnAt
    initValueArr.push(''); //dspsnNo
    initValueArr.push(''); //dspsnSeCode
    initValueArr.push(''); //srsillAt
    dhxGridMpscalFamily.addRow(dhxGridMpscalFamily.uid(), initValueArr, 0);
    dhxGridMpscalFamily.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscalFamily');
    $('#btnPopEmpSearchMpscalFamily').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_MpscalFamilySortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscalFamily, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscalFamily', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscalFamily', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscalFamily, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscalFamily.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscalFamily', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscalFamily', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscalFamily, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscalFamily.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscalFamily', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscalFamily', 'sortColumId', '', 'text'); 
            dhxGridMpscalFamily.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscalFamily.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscalFamily', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscalFamily', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscalFamily, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscalFamily = function() {
    var edCnt = 0;
    save_Add_Cnt_MpscalFamily = 0; 
    save_Edt_Cnt_MpscalFamily = 0; 
    save_Del_Cnt_MpscalFamily = 0; 
    dhxGridMpscalFamily.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscalFamily.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscalFamily.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_MpscalFamily += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_MpscalFamily += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_MpscalFamily += 1; 
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
        save_All_Sta_MpscalFamily = 0; 
        if(save_Add_Cnt_MpscalFamily > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_MpscalFamily + "건";
            save_All_Sta_MpscalFamily = 1; 
        } 
        if(save_Edt_Cnt_MpscalFamily > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_MpscalFamily + "건"; 
        } 
        if(save_Del_Cnt_MpscalFamily > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_MpscalFamily + "건"; 
            save_All_Sta_MpscalFamily = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscalFamily(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscalFamily(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscalFamily = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscalFamily_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscalFamily_Send = function() {
        dhxDataProcessorMpscalFamily.sendData();
}
/**
 * 삭제
 */
var fn_RemoveMpscalFamily = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscalFamily, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscalFamily.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscalFamily.getState(rowId);
            if(dhxGridMpscalFamily.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscalFamily, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscalFamily.getRowIndex(rowId);
                    dhxGridMpscalFamily.deleteRow(rowId);
                    dhxGridMpscalFamily.selectRow(rowNum);
                }
                else dhxDataProcessorMpscalFamily.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscalFamily = function () {
    var titMpscalFamily = '급여관리_가족'; /* gf_LocaleTrans('default', 'titMpscalFamily') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpscalFamily', 'empno', 'text'),
        familySn : gf_FormGetValue('searchFormMpscalFamily', 'familySn', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '가족 순번' /* gf_LocaleTrans('default', 'titFamilySn') */,
        '연말정산 관계 코드 (C084)' /* gf_LocaleTrans('default', 'titYndexcclcRelateCode') */,
        '연말정산 대상 여부' /* gf_LocaleTrans('default', 'titYndexcclcTrgetAt') */,
        '가족코드' /* gf_LocaleTrans('default', 'titFamilyCode') */,
        '가족구성원의 이름을 기록하는 항목' /* gf_LocaleTrans('default', 'titFamilyNm') */,
        '가족구성원의 주민등록번호를 기록하는 항목' /* gf_LocaleTrans('default', 'titIhidnum') */,
        '가족의 실제 생년월일' /* gf_LocaleTrans('default', 'titBrthdy') */,
        '동거여부' /* gf_LocaleTrans('default', 'titLivtgtAt') */,
        '부양여부 갑근세계산여부' /* gf_LocaleTrans('default', 'titSuportAt') */,
        '수당지급여부' /* gf_LocaleTrans('default', 'titAllwncTrgetAt') */,
        '최종학력코드 (C016)' /* gf_LocaleTrans('default', 'titLscholSeCode') */,
        '직장' /* gf_LocaleTrans('default', 'titWrcNm') */,
        '직업' /* gf_LocaleTrans('default', 'titOccpNm') */,
        '직위 명' /* gf_LocaleTrans('default', 'titOfcpsNm') */,
        '휴대전화' /* gf_LocaleTrans('default', 'titMbtlnum') */,
        '장애인 여부' /* gf_LocaleTrans('default', 'titDspsnAt') */,
        '장애인 번호' /* gf_LocaleTrans('default', 'titDspsnNo') */,
        '장애인구분 1: 장애인복지법, 2:국가유공자, 3:중증장애인( C152)' /* gf_LocaleTrans('default', 'titDspsnSeCode') */,
        '중증 여부' /* gf_LocaleTrans('default', 'titSrsillAt') */
    ]];
    var dataId = [[ 'empno', 'familySn', 'yndexcclcRelateCode', 'yndexcclcTrgetAt', 'familyCode', 'familyNm', 'ihidnum', 'brthdy', 'livtgtAt', 'suportAt', 'allwncTrgetAt', 'lscholSeCode', 'wrcNm', 'occpNm', 'ofcpsNm', 'mbtlnum', 'dspsnAt', 'dspsnNo', 'dspsnSeCode', 'srsillAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpscalFamily ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscalFamily;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscalFamily/excelMpscalFamily', jsonParameter);
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
    $('#saveFormMpscalFamily #empnoSaveFormMpscalFamily').parent().append(
    '<div class="error" id="empnoSaveFormMpscalFamily-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscalFamily #familySnSaveFormMpscalFamily').parent().append(
    '<div class="error" id="familySnSaveFormMpscalFamily-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscalFamily = function(empno, familySn){
    if(!gf_IsNull(empno) && !gf_IsNull(familySn)) {
        var jsonParameter = {
            empno : empno,
            familySn : familySn
        };
        var dataSource = gf_NoAsyncTransaction('mpscalFamily/findMpscalFamily', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno) && gf_IsNull(data.familySn)) {
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
    var checkFamilySn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_MpscalFamily = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_MpscalFamily = 0;
        save_Row_Ids_MpscalFamily = "";
    } else if(state == 'inserted') {
        save_Row_Num_MpscalFamily = rowNum;
        save_Row_Ids_MpscalFamily = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_MpscalFamily = rowNum;
        save_Row_Ids_MpscalFamily = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'familySn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'familySn');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    checkFamilySn = gf_DhxGetValue(dhxGridObjet, rowId, 'familySn', 'grid');
                    if(!gf_IsNull(checkEmpno, checkFamilySn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var familySn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'familySn', 'grid');
                            if(((empno == checkEmpno) && (familySn == checkFamilySn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'familySn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscalFamily( checkEmpno, checkFamilySn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'familySn');
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
        dhxGridMpscalFamily.selectRowById(validFalseFistRowId);
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
