/**
 *    프로그램       : 소득자관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.06
 *    사용테이블      : MFS_INCOME_EARNER
 * sourceGen version : 2020.06.29.01 (2020.07.06)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mtxbsc002 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mtxbsc002 = 0;  //그리드 위치 상태 
var save_All_Sta_Mtxbsc002 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mtxbsc002 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mtxbsc002 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mtxbsc002 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mtxbsc002 = 0;  //그리드 삭제 수량 
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMtxbsc002();
    cf_SetComponentsMtxbsc002();
    cf_SetEventListenerMtxbsc002();
    cf_InitFormMtxbsc002();
    cf_SetBindingMtxbsc002();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMtxbsc002 = function() {
	gf_SetMenuPath();
    $("#saveFormMtxbsc002").validate({ errorElement: 'div', ignore: '' });
    
    // 콤보 가져오기
    gf_ComboCode('divComboearnerSe', 'earnerSeCode', 'earnerSeCode', 'sel', 'C046', '' , '', '', 'ordr', 'required','','');  // 소득자 구분
    gf_ComboCode('bankCodeSaveFormMtxbsc002', 'bankCode', 'bankCode', 'sel', 'C010', '' , '', '', 'ordr', 'required','','');  // 은행 구분
    gf_ComboCode('frgnrAtSaveFormMtxbsc002', 'frgnrAt', 'frgnrAt', 'sel', 'C011', '' , '', '', 'ordr', 'required','','');  // 내,외국인 구분
    gf_ComboCode('liveSeCodeSaveFormMtxbsc002', 'liveSeCode', 'liveSeCode', 'sel', 'C031', '' , '', '', 'ordr', 'required','','');  // 거주 구분
    gf_ComboCode('nltyCodeSaveFormMtxbsc002', 'nltyCode', 'nltyCode', 'sel', 'C122', '' , '', '', 'asc', 'required','','');  // 거주지구분
    gf_ComboCode('divComboearnerSeCode', 'earnerSeCodeSearch', 'earnerSeCodeSearch', 'search', 'C046', '' , '', '', 'asc', 'required','','');  // 거주지구분
    
    // 페이징 환경설정 적용
    gf_SettingPgngUnit('divPagingMtxbsc002');   
    
    $("#earnerNmSearchFormMtxbsc002").focus();
};

var dhxGridMtxbsc002;
var cf_SetComponentsMtxbsc002 = function() {
	var dhxGridMtxbsc002HeaderInfo = [];
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMtxbsc002" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('소득자번호', '0', 'center', 'str', 'ro', true, 'earnerNo', '', '')); /* gf_LocaleTrans('default', 'titEarnerNo') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('사업장코드', '0', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('소득자구분', '*', 'center', 'str', 'coro', false, 'earnerSeCode', '', '')); /* gf_LocaleTrans('default', 'titEarnerSeCode') */
    //dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('소득자구분', '*', 'center', 'str', 'ro', false, 'earnerSeConm', '', '')); /* gf_LocaleTrans('default', 'titEarnerSeCode') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('소득유형코드 C060', '0', 'center', 'str', 'ro', true, 'earnerTyCode', '', '')); /* gf_LocaleTrans('default', 'titEarnerTyCode') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('소득자성명', '290', 'center', 'str', 'ro', false, 'earnerNm', '', '')); /* gf_LocaleTrans('default', 'titEarnerNm') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('소득자주민번호(외국인번호)', '0', 'center', 'str', 'ro', true, 'ihidnum', '', '')); /* gf_LocaleTrans('default', 'titIhidnum') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('소득자사업자번호(사업소득자경우)', '0', 'center', 'str', 'ro', true, 'bizrno', '', '')); /* gf_LocaleTrans('default', 'titBizrno') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('내외국인여부', '0', 'center', 'str', 'coro', true, 'frgnrAt', '', '')); /* gf_LocaleTrans('default', 'titFrgnrAt') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('거주지국코드C122', '0', 'center', 'str', 'coro', true, 'nltyCode', '', '')); /* gf_LocaleTrans('default', 'titNltyCode') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('거주여부C031', '0', 'center', 'str', 'coro', true, 'liveSeCode', '', '')); /* gf_LocaleTrans('default', 'titLiveSeCode') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('우편번호', '0', 'center', 'str', 'ro', true, 'postCode', '', '')); /* gf_LocaleTrans('default', 'titPostCode') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('기본 주소', '0', 'center', 'str', 'ro', true, 'bassAdres', '', '')); /* gf_LocaleTrans('default', 'titBassAdres') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('상세 주소', '0', 'center', 'str', 'ro', true, 'detailAdres', '', '')); /* gf_LocaleTrans('default', 'titDetailAdres') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '0', 'center', 'str', 'ro', true, 'acnutNo', '', '')); /* gf_LocaleTrans('default', 'titAcnutNo') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('은행코드', '0', 'center', 'str', 'coro', true, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('예금주', '0', 'center', 'str', 'ro', true, 'dpstrNm', '', '')); /* gf_LocaleTrans('default', 'titDpstrNm') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('거래처', '0', 'center', 'str', 'ro', true, 'bcncNm', '', '')); /* gf_LocaleTrans('default', 'titBcncNm') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('직위명', '0', 'center', 'str', 'ro', true, 'ofcpsNm', '', '')); /* gf_LocaleTrans('default', 'titOfcpsNm') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('직종', '0', 'center', 'str', 'ro', true, 'jssfc', '', '')); /* gf_LocaleTrans('default', 'titJssfc') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('연락처', '0', 'center', 'str', 'ro', true, 'cttpc', '', '')); /* gf_LocaleTrans('default', 'titCttpc') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('휴대폰번호', '0', 'center', 'str', 'ro', true, 'mbtlnum', '', '')); /* gf_LocaleTrans('default', 'titMbtlnum') */
    dhxGridMtxbsc002HeaderInfo.push(gf_MakeDhxGridHeader('비고', '0', 'center', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMtxbsc002 = gf_MakeDhxGrid('dataListMtxbsc002', dhxGridMtxbsc002HeaderInfo, true, false, false);
    dhxGridMtxbsc002.enableAutoWidth(false);
    dhxGridMtxbsc002.setEditable(true);
    
    dhxGridMtxbsc002.setColumnMinWidth(290,4); //넓이가 * 인 컬럼의 최소 넓이값 설정
    
    //거래처구분
    var earnerjsonParameter = {codekindCode : "C046",exceptCode :"",sortOrder :"asc" };
    var earnerdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', earnerjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxbsc002, dhxGridMtxbsc002.getColIndexById("earnerSeCode"), earnerdataSource.data, "sel");
    //은행구분
    var bankjsonParameter = {codekindCode : "C010",exceptCode :"",sortOrder :"asc" };
    var bankdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', bankjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxbsc002, dhxGridMtxbsc002.getColIndexById("bankCode"), bankdataSource.data, "sel");
    //내,외국인구분
    var frgnrAtjsonParameter = {codekindCode : "C011",exceptCode :"",sortOrder :"asc" };
    var frgnrAtdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', frgnrAtjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxbsc002, dhxGridMtxbsc002.getColIndexById("frgnrAt"), frgnrAtdataSource.data, "sel");
    //거주구분
    var livejsonParameter = {codekindCode : "C031",exceptCode :"",sortOrder :"asc" };
    var livedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', livejsonParameter, '');
    gf_ComboDataSet(dhxGridMtxbsc002, dhxGridMtxbsc002.getColIndexById("liveSeCode"), livedataSource.data, "sel");
    //거주지구분
    var nltyjsonParameter = {codekindCode : "C122",exceptCode :"",sortOrder :"asc" };
    var nltydataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', nltyjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxbsc002, dhxGridMtxbsc002.getColIndexById("nltyCode"), nltydataSource.data, "sel");
    
//    dhxGridMtxbsc002.attachEvent("onCellChanged",function(rId, cInd, value){
//    	// 소득구분 combo 선택 시 값 변경 if
//    	 if(cInd === gf_GetDhxGridColumId(dhxGridMtxbsc002,'earnerSeCode')){
//    		 var incomeKindCode = gf_DhxGetValue(dhxGridMtxbsc002,rId,'earnerSeCode','grid'); // 소득구분 combo 가져오기
//    		 if(incomeKindCode == 100){
//    			 console.log('sdgsdgsd')
//    		 } else if (incomeKindCode == 200){
//    			 
//    		 }
//    	 } 
//    });
    
    
};

var eventIdMtxbsc002 = [];
var cf_SetEventListenerMtxbsc002 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMtxbsc002 = gf_GridDetachEvent(dhxGridMtxbsc002, eventIdMtxbsc002);
    eventId = dhxGridMtxbsc002.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMtxbsc002();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMtxbsc002.getColumnsNum();
            var rowNum = dhxGridMtxbsc002.getRowsNum();
            var selectedId = dhxGridMtxbsc002.getSelectedRowId();
            var ind        = dhxGridMtxbsc002.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxbsc002.getRowIndex(selectedId);
            var type       = dhxGridMtxbsc002.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMtxbsc002.selectRow(0);
                    //fn_FindMtxbsc002();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMtxbsc002.selectRow(rowIndex + 1);
                    fn_FindMtxbsc002();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMtxbsc002.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxbsc002.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMtxbsc002.getSelectedRowId();
            var ind        = dhxGridMtxbsc002.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxbsc002.getRowIndex(selectedId);
            var type       = dhxGridMtxbsc002.getColType(ind);
            dhxGridMtxbsc002.selectCell(rowIndex+1, ind);
            fn_FindMtxbsc002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxbsc002.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMtxbsc002.getSelectedRowId();
            var ind        = dhxGridMtxbsc002.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxbsc002.getRowIndex(selectedId);
            var type       = dhxGridMtxbsc002.getColType(ind);
            dhxGridMtxbsc002.selectCell(rowIndex-1, ind);
            fn_FindMtxbsc002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxbsc002.editCell();
            }
        }
        else return true;
    });
    eventIdMtxbsc002.push(eventId);
    eventId = dhxGridMtxbsc002.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mtxbsc002SortGridList(ind, type, direction); 
    });
    eventIdMtxbsc002.push(eventId);
    eventId = dhxGridMtxbsc002.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMtxbsc002.push(eventId);
    eventId = dhxGridMtxbsc002.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMtxbsc002();
    });
    eventIdMtxbsc002.push(eventId);
    eventId = dhxGridMtxbsc002.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMtxbsc002.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMtxbsc002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMtxbsc002()
    });
    $('#btnSaveMtxbsc002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMtxbsc002();
    });
    $('#btnRemoveMtxbsc002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMtxbsc002();
    });
    $('#btnExcelMtxbsc002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMtxbsc002();
    });
    $('#btnSearchMtxbsc002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMtxbsc002('');
    });
    $('#btnResetMtxbsc002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMtxbsc002();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMtxbsc002').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMtxbsc002, $('#checkAllMtxbsc002').prop('checked'), 'chk');
    });
    $('#searchFormMtxbsc002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMtxbsc002').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMtxbsc002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMtxbsc002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMtxbsc002",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMtxbsc002 input[name="earnerNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'earnerNo', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="bplcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'bplcCode', $(this).val());
    });
    $('#saveFormMtxbsc002 select[name="earnerSeCode"]').unbind('click blur').bind('click blur',function() {
    	
    	var earnerSeCode = gf_FormGetValue('saveFormMtxbsc002', 'earnerSeCode', 'combo');
    	if(earnerSeCode == 200){
    		$('#saveFormMtxbsc002 input[name="bizrno"]').prop('disabled', true);
    	}else{
    		$('#saveFormMtxbsc002 input[name="bizrno"]').prop('disabled', false);
    	}
    	
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'earnerSeCode', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="earnerTyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'earnerTyCode', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="earnerNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'earnerNm', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="ihidnum"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'ihidnum', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="bizrno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'bizrno', $(this).val());
    });
    $('#saveFormMtxbsc002 select[name="frgnrAt"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'frgnrAt', $(this).val());
    });
    $('#saveFormMtxbsc002 select[name="nltyCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'nltyCode', $(this).val());
    });
    $('#saveFormMtxbsc002 select[name="liveSeCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'liveSeCode', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="postCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'postCode', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="bassAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'bassAdres', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="detailAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'detailAdres', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="acnutNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'acnutNo', $(this).val());
    });
    $('#saveFormMtxbsc002 select[name="bankCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'bankCode', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="dpstrNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'dpstrNm', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="bcncNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'bcncNm', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="ofcpsNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'ofcpsNm', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="jssfc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'jssfc', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="cttpc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'cttpc', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="mbtlnum"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'mbtlnum', $(this).val());
    });
    $('#saveFormMtxbsc002 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002, 'rm', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
    
 // 주민등록번호 입력시 이벤트 처리
    $('#saveFormMtxbsc002 #ihidnumSaveFormMtxbsc002').unbind('keyup').bind('keyup', function(event){
		var jnum = $('#saveFormMtxbsc002 #ihidnumSaveFormMtxbsc002').val();
		var rJnum = "";
		
		jnum = jnum.replace(/[^0-9]/g,"");  // 숫자만 남김
		if(jnum.length >= 6){
			rJnum = jnum.substring(0,6) + "-" + jnum.substring(6,13);
		}
		else rJnum = jnum;
		$('#saveFormMtxbsc002 #ihidnumSaveFormMtxbsc002').val(rJnum);
		
		/*var ch = rJnum.slice(7,8);
		if(ch == '1' || ch == '3'){
            //('남자');
			$("#detailComboSexdstnSe").val("M").prop("selected", true);
		}
        else if(ch == '2' || ch == '4'){
        	$("#detailComboSexdstnSe").val("F").prop("selected", true);
        }
        else {
        	$("#detailComboSexdstnSe").val("").prop("selected", true);
        }*/
    });
    //우편번호 찾기 
    $('#btnpostCodeSearch').unbind('click').bind('click', function(event){
    	
    	// form ID, 우편번호가 들어갈 tag의 ID, 주소가 들어갈 tag의 ID, 상세주소가 들어갈 tag의 ID, 콜백
    	gf_ZipPopup("saveFormMtxbsc002","postCode","bassAdres", "detailAdres", "fn_CallBackZipPopup"); 
    });
    
};

var cf_InitFormMtxbsc002 = function() {
    $('#searchFormMtxbsc002').resetForm();
};

var cf_SetBindingMtxbsc002 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMtxbsc002('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMtxbsc002 = function(pageNum, key) {
	var pageingCnt = gf_FormGetValue('spanCntSearchFormMtxbsc002', 'pageRowSize', 'combo');
    var page = pageNum;
    if(gf_IsNull(pageingCnt)) pageingCnt = 20;
    if(gf_IsNull(page)) page = 1;
    gf_FormSetValue('searchFormMtxbsc002', 'selectedPageNum', page, 'text');
    
    var jsonParameter = {
        earnerNo : gf_FormGetValue('searchFormMtxbsc002', 'earnerNo', 'text'),
        earnerNm : gf_FormGetValue('searchFormMtxbsc002', 'earnerNm', 'text'),
        earnerSeCodeSearch : gf_FormGetValue('searchFormMtxbsc002', 'earnerSeCodeSearch', 'combo'),
        pageingCnt : pageingCnt,
        pageNum : page
    };
    gf_Transaction(key, 'mtxbsc002/searchMtxbsc002', jsonParameter, 'fn_CallbackSearchMtxbsc002', false, 'GET');
};

var dhxDataProcessorMtxbsc002;
var fn_CallbackSearchMtxbsc002 = function(strSvcID, targetID, data) {
    dhxGridMtxbsc002.clearAll();
    fn_DhxDataProcessorMtxbsc002(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMtxbsc002');
        dhxGridMtxbsc002.parse(data.data.records, 'js');
 
        if(save_Row_Num_Mtxbsc002 == 0 && save_All_Sta_Mtxbsc002 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMtxbsc002.selectRow(0); 
        } else if(save_Row_Sta_Mtxbsc002 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMtxbsc002.selectRow(0);
        } else if(save_All_Sta_Mtxbsc002 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMtxbsc002.selectRow(save_Row_Num_Mtxbsc002); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMtxbsc002.selectRow(save_Row_Num_Mtxbsc002);   //개발자 수정 필요  
            //var findCell = dhxGridMtxbsc002.findCell(save_Row_Ids_Mtxbsc002, gf_GetDhxGridColumId(dhxGridMtxbsc002,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMtxbsc002.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMtxbsc002.selectRow(0);
            //} 
        } 
 
        fn_FindMtxbsc002();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMtxbsc002');
        fn_InitInputFormMtxbsc002();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMtxbsc002").text(data.data.records.length);
    gf_PageNate(data.data,'.paging','fn_SearchMtxbsc002');
    cf_SetEventListenerMtxbsc002();
};
var fn_DhxDataProcessorMtxbsc002 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMtxbsc002 = new dataProcessor(gv_ContextPath+'/mtxbsc002/saveMtxbsc002'); //lock feed url
    dhxDataProcessorMtxbsc002.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMtxbsc002.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMtxbsc002.init(dhxGridMtxbsc002); //link dataprocessor to the grid
    dhxDataProcessorMtxbsc002.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMtxbsc002.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMtxbsc002.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMtxbsc002();
                    $("#checkAllMtxbsc002").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMtxbsc002 = function() {
	var rId = dhxGridMtxbsc002.getSelectedRowId();
    var status = dhxDataProcessorMtxbsc002.getState(rId);

    gf_FormSetValue("saveFormMtxbsc002", "earnerNo", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'earnerNo',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "bplcCode", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'bplcCode',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "earnerSeCode", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'earnerSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxbsc002", "earnerTyCode", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'earnerTyCode',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "earnerNm", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'earnerNm',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "ihidnum", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'ihidnum',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "bizrno", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'bizrno',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "frgnrAt", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'frgnrAt',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxbsc002", "nltyCode", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'nltyCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxbsc002", "liveSeCode", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'liveSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxbsc002", "postCode", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'postCode',  'grid'), 'text');
    gf_FormSetValue("saveFormMtxbsc002", "bassAdres", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'bassAdres',  'grid'), 'text');
    gf_FormSetValue("saveFormMtxbsc002", "detailAdres", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'detailAdres',  'grid'), 'text');
    gf_FormSetValue("saveFormMtxbsc002", "acnutNo", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'acnutNo',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "bankCode", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'bankCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxbsc002", "dpstrNm", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'dpstrNm',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "bcncNm", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'bcncNm',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "ofcpsNm", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'ofcpsNm',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "jssfc", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'jssfc',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "cttpc", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'cttpc',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "mbtlnum", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'mbtlnum',  'grid'), '');
    gf_FormSetValue("saveFormMtxbsc002", "rm", gf_DhxGetValue(dhxGridMtxbsc002, rId, 'rm',  'grid'), '');

    fn_FormDisabled(false);

    if(status == 'inserted') {
        $('#saveFormMtxbsc002 input[name="earnerNo"]').prop('disabled', false);
    } else {
        $('#saveFormMtxbsc002 input[name="earnerNo"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMtxbsc002 = function() {
	$('#saveFormMtxbsc002 input[name="earnerNo"]').prop('disabled', false);
    $('#saveFormMtxbsc002').resetForm();
    $('#saveFormMtxbsc002 input[name="earnerNo"]').val('');
    gf_FormSetValue('saveFormMtxbsc002', 'nltyCode', 'KR', 'combo');
    gf_FormSetValue('saveFormMtxbsc002', 'liveSeCode', '1', 'combo');
    gf_FormSetValue('saveFormMtxbsc002', 'frgnrAt', '1', 'combo')
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMtxbsc002 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMtxbsc002 = function() {
	dhxGridMtxbsc002.clearSelection();
    fn_InitInputFormMtxbsc002();
    var nlty = gf_FormGetValue('saveFormMtxbsc002', 'nltyCode', 'combo');
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //earnerNo
    initValueArr.push(''); //bplcCode
    initValueArr.push(''); //earnerSeCode
    initValueArr.push(''); //earnerTyCode
    initValueArr.push(''); //earnerNm
    initValueArr.push(''); //ihidnum
    initValueArr.push(''); //bizrno
    initValueArr.push(1); //frgnrAt
    initValueArr.push(nlty); //nltyCode
    initValueArr.push(1); //liveSeCode
    initValueArr.push(''); //postCode
    initValueArr.push(''); //bassAdres
    initValueArr.push(''); //detailAdres
    initValueArr.push(''); //acnutNo
    initValueArr.push(''); //bankCode
    initValueArr.push(''); //dpstrNm
    initValueArr.push(''); //bcncNm
    initValueArr.push(''); //ofcpsNm
    initValueArr.push(''); //jssfc
    initValueArr.push(''); //cttpc
    initValueArr.push(''); //mbtlnum
    initValueArr.push(''); //rm
    dhxGridMtxbsc002.addRow(dhxGridMtxbsc002.uid(), initValueArr, 0);
    dhxGridMtxbsc002.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMtxbsc002');
    $('#btnPopEmpSearchMtxbsc002').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mtxbsc002SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMtxbsc002, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMtxbsc002', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMtxbsc002', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMtxbsc002, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMtxbsc002.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMtxbsc002', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMtxbsc002', 'sortColumId', gf_GetDhxGridColum(dhxGridMtxbsc002, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMtxbsc002.setSortImgState(false); 
            gf_FormSetValue('searchFormMtxbsc002', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMtxbsc002', 'sortColumId', '', 'text'); 
            dhxGridMtxbsc002.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMtxbsc002.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMtxbsc002', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMtxbsc002', 'sortColumId', gf_GetDhxGridColum(dhxGridMtxbsc002, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMtxbsc002 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mtxbsc002 = 0; 
    save_Edt_Cnt_Mtxbsc002 = 0; 
    save_Del_Cnt_Mtxbsc002 = 0; 
    dhxGridMtxbsc002.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMtxbsc002.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMtxbsc002.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mtxbsc002 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mtxbsc002 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mtxbsc002 += 1; 
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
        save_All_Sta_Mtxbsc002 = 0; 
        if(save_Add_Cnt_Mtxbsc002 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mtxbsc002 + "건";
            save_All_Sta_Mtxbsc002 = 1; 
        } 
        if(save_Edt_Cnt_Mtxbsc002 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mtxbsc002 + "건"; 
        } 
        if(save_Del_Cnt_Mtxbsc002 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mtxbsc002 + "건"; 
            save_All_Sta_Mtxbsc002 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMtxbsc002(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMtxbsc002(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMtxbsc002 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMtxbsc002_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMtxbsc002_Send = function() {
    if(fn_GridValidation(dhxGridMtxbsc002, dhxDataProcessorMtxbsc002)) {
        dhxDataProcessorMtxbsc002.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMtxbsc002 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMtxbsc002, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMtxbsc002.forEachRow(function(rowId) {
            state = dhxDataProcessorMtxbsc002.getState(rowId);
            if(dhxGridMtxbsc002.cells(rowId, gf_GetDhxGridColumId(dhxGridMtxbsc002, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMtxbsc002.getRowIndex(rowId);
                    dhxGridMtxbsc002.deleteRow(rowId);
                    dhxGridMtxbsc002.selectRow(rowNum);
                    fn_FindMtxbsc002();
                }
                else dhxDataProcessorMtxbsc002.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMtxbsc002 = function () {
	var titMtxbsc002 = '소득자관리'; /* gf_LocaleTrans('default', 'titMtxbsc002') */
    var jsonParameter = {
        earnerNo : gf_FormGetValue('searchFormMtxbsc002', 'earnerNo', 'text')
    };
    var header = [[
        '소득자번호' /* gf_LocaleTrans('default', 'titEarnerNo') */,
        '사업장코드' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '소득자구분' /* gf_LocaleTrans('default', 'titEarnerSeCode') */,
        '소득유형코드 ' /* gf_LocaleTrans('default', 'titEarnerTyCode') */,
        '소득자성명' /* gf_LocaleTrans('default', 'titEarnerNm') */,
        '소득자주민번호' /* gf_LocaleTrans('default', 'titIhidnum') */,
        '소득자사업자번호' /* gf_LocaleTrans('default', 'titBizrno') */,
        '내외국인여부' /* gf_LocaleTrans('default', 'titFrgnrAt') */,
        '거주지국코드' /* gf_LocaleTrans('default', 'titNltyCode') */,
        '거주여부' /* gf_LocaleTrans('default', 'titLiveSeCode') */,
        '우편번호' /* gf_LocaleTrans('default', 'titPostCode') */,
        '기본 주소' /* gf_LocaleTrans('default', 'titBassAdres') */,
        '상세 주소' /* gf_LocaleTrans('default', 'titDetailAdres') */,
        '계좌번호' /* gf_LocaleTrans('default', 'titAcnutNo') */,
        '은행코드' /* gf_LocaleTrans('default', 'titBankCode') */,
        '예금주' /* gf_LocaleTrans('default', 'titDpstrNm') */,
        '거래처' /* gf_LocaleTrans('default', 'titBcncNm') */,
        '직위명' /* gf_LocaleTrans('default', 'titOfcpsNm') */,
        '직종' /* gf_LocaleTrans('default', 'titJssfc') */,
        '연락처' /* gf_LocaleTrans('default', 'titCttpc') */,
        '휴대폰번호' /* gf_LocaleTrans('default', 'titMbtlnum') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'earnerNo', 'bplcCode', 'earnerSeCode', 'earnerTyCode', 'earnerNm', 'ihidnum', 'bizrno', 'frgnrAt', 'nltyCode', 'liveSeCode', 'postCode', 'bassAdres', 'detailAdres', 'acnutNo', 'bankCode', 'dpstrNm', 'bcncNm', 'ofcpsNm', 'jssfc', 'cttpc', 'mbtlnum', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMtxbsc002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMtxbsc002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mtxbsc002/excelMtxbsc002', jsonParameter);
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
    $('#saveFormMtxbsc002 #earnerNoSaveFormMtxbsc002').parent().append(
    '<div class="error" id="earnerNoSaveFormMtxbsc002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMtxbsc002 = function(earnerNo){
    if(!gf_IsNull(earnerNo)) {
        var jsonParameter = {
            earnerNo : earnerNo
        };
        var dataSource = gf_NoAsyncTransaction('mtxbsc002/findMtxbsc002', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.earnerNo)) {
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
    var state = dhxDataProcessorMtxbsc002.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMtxbsc002').validate().form()){
                if(state == 'inserted') {
                    var earnerNo = gf_FormGetValue('saveFormMtxbsc002', 'earnerNo', 'text');
                    if(fn_CheckDupMtxbsc002(earnerNo)) return true;
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
    var checkEarnerNo;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mtxbsc002 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mtxbsc002 == 'deleted') {
        save_Row_Num_Mtxbsc002 = 0;
        save_Row_Ids_Mtxbsc002 = "";
    } else if(save_Row_Sta_Mtxbsc002 == 'inserted') {
        save_Row_Num_Mtxbsc002 = rowNum;
        save_Row_Ids_Mtxbsc002 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mtxbsc002 = rowNum;
        save_Row_Ids_Mtxbsc002 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	var earnerSeCode = gf_DhxGetValue(dhxGridObjet, rowId, 'earnerSeCode', 'grid');
        		var bizrno = gf_DhxGetValue(dhxGridObjet, rowId, 'bizrno', 'grid');
        		if(valid && !gv_ValidateMethods.required( earnerSeCode )){
        			gf_DivMsgAlert("소득자구분은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'earnerSeCode');
    				valid = false;
        		}
        		if(earnerSeCode == "100" && gf_IsNull(bizrno)) {
        		        gf_DivMsgAlert('사업 소득자인 경우 사업자 번호를 입력해 주세요.');
        		        valid = false;
        		}
        		var earnerNm = gf_DhxGetValue(dhxGridObjet, rowId, 'earnerNm', 'grid');
    			if(valid && !gv_ValidateMethods.required( earnerNm )){
    				gf_DivMsgAlert("성명은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'earnerNm');
    				valid = false;
    			}
    			var ihidnum = gf_DhxGetValue(dhxGridObjet, rowId, 'ihidnum', 'grid');
    			if(valid && !gv_ValidateMethods.required( ihidnum )){
    				gf_DivMsgAlert("주민번호는 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ihidnum');
    				valid = false;
    			}
    			var frgnrAt = gf_DhxGetValue(dhxGridObjet, rowId, 'frgnrAt', 'grid');
    			if(valid && !gv_ValidateMethods.required( frgnrAt )){
    				gf_DivMsgAlert("내외국인 구분은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'frgnrAt');
    				valid = false;
    			}
    			var nltyCode = gf_DhxGetValue(dhxGridObjet, rowId, 'nltyCode', 'grid');
    			if(valid && !gv_ValidateMethods.required( nltyCode )){
    				gf_DivMsgAlert("거주지국은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'nltyCode');
    				valid = false;
    			}
    			var liveSeCode = gf_DhxGetValue(dhxGridObjet, rowId, 'liveSeCode', 'grid');
    			if(valid && !gv_ValidateMethods.required( liveSeCode )){
    				gf_DivMsgAlert("거주여부는 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'liveSeCode');
    				valid = false;
    			}
    			var postCode = gf_DhxGetValue(dhxGridObjet, rowId, 'postCode', 'grid');
    			if(valid && !gv_ValidateMethods.required( postCode )){
    				gf_DivMsgAlert("주소입력은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'postCode');
    				valid = false;
    			}
    			var bankCode = gf_DhxGetValue(dhxGridObjet, rowId, 'bankCode', 'grid');
    			if(valid && !gv_ValidateMethods.required( bankCode )){
    				gf_DivMsgAlert("은행은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bankCode');
    				valid = false;
    			}
    			var acnutNo = gf_DhxGetValue(dhxGridObjet, rowId, 'acnutNo', 'grid');
    			if(valid && !gv_ValidateMethods.required( acnutNo )){
    				gf_DivMsgAlert("계좌번호는 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'acnutNo');
    				valid = false;
    			}
    			var dpstrNm = gf_DhxGetValue(dhxGridObjet, rowId, 'dpstrNm', 'grid');
    			if(valid && !gv_ValidateMethods.required( dpstrNm )){
    				gf_DivMsgAlert("예금주는 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dpstrNm');
    				valid = false;
    			}
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEarnerNo = gf_DhxGetValue(dhxGridObjet, rowId, 'earnerNo', 'grid');
                    if(!gf_IsNull(checkEarnerNo)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var earnerNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'earnerNo', 'grid');
                            if(((earnerNo == checkEarnerNo)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'earnerNo');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMtxbsc002( checkEarnerNo )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'earnerNo');
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
        dhxGridMtxbsc002.selectRowById(validFalseFistRowId);
        fn_FindMtxbsc002();
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
var fn_CallBackZipPopup = function(data){
	if(!gf_IsNull(data)){
		gf_FormSetValue('saveFormMtxbsc002', 'postCode', data.zipno, 'text');  
		gf_FormSetValue('saveFormMtxbsc002', 'bassAdres', data.roadAddr1, 'text');
		gf_FormSetValue('saveFormMtxbsc002', 'detailAdres',(data.roadAddrDetail + " " + data.roadAddr2).trim(), 'text');
	}
}

