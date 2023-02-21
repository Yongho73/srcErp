/**
 *    프로그램       : 사업장관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.10
 *    사용테이블      : STM_BIZPLC
 * sourceGen version : 2020.06.29.01 (2020.07.10)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm001 = 0;  //그리드 삭제 수량 

var dhxGridMhshrm001;
var eventIdMhshrm001 = [];
var dhxDataProcessorMhshrm001;

var gBplcCode = "1000";
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var bplcAreaErr = false;
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm001();
    if(cf_SetComponentsMhshrm001()){
	    cf_SetEventListenerMhshrm001();
	    cf_InitFormMhshrm001();
	    cf_SetBindingMhshrm001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm001 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrm001").validate({ errorElement: 'div', ignore: '' });

    $("#capitalAmtSaveFormMhshrm001").number(true);	//폼에서  숫자 콤마처리 (자본금액)
    $("#bplcAreaSaveFormMhshrm001").number(true);	//폼에서  숫자 콤마처리 (사업장면적)
};

var cf_SetComponentsMhshrm001 = function() {
    var dhxGridMhshrm001HeaderInfo = [];
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('사업장코드', '100', 'center', 'str', 'ro', false, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('사업장명', '200', 'left', 'str', 'ro', false, 'bplcKorNm', '', '')); /* gf_LocaleTrans('default', 'titBplcKorNm') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('사업자등록번호', '*', 'left', 'str', 'ro', false, 'bizrno', '', '')); /* gf_LocaleTrans('default', 'titBizrno') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('법인의 영문명을 기록하는 항목', '100', 'left', 'str', 'ro', true, 'bplcEngNm', '', '')); /* gf_LocaleTrans('default', 'titBplcEngNm') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('법인등록번호', '100', 'left', 'str', 'ro', true, 'jurirno', '', '')); /* gf_LocaleTrans('default', 'titJurirno') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('우편번호', '100', 'left', 'str', 'ro', true, 'zip', '', '')); /* gf_LocaleTrans('default', 'titZip') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('주소1', '100', 'left', 'str', 'ro', true, 'adres', '', '')); /* gf_LocaleTrans('default', 'titAdres') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('주소2', '100', 'left', 'str', 'ro', true, 'detailAdres', '', '')); /* gf_LocaleTrans('default', 'titDetailAdres') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('법정동코드 ', '100', 'center', 'str', 'ro', true, 'dongCode', '', '')); /* gf_LocaleTrans('default', 'titDongCode') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('자본금 ', '100', 'right', 'int', 'ro', true, 'capitalAmt', '', '')); /* gf_LocaleTrans('default', 'titCapitalAmt') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('사업장의 설립일자를 기록하는 항목', '100', 'left', 'str', 'ro', true, 'fondDe', '', '')); /* gf_LocaleTrans('default', 'titFondDe') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('대표자명', '100', 'left', 'str', 'ro', true, 'reprsntNm', '', '')); /* gf_LocaleTrans('default', 'titReprsntNm') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('업종', '100', 'left', 'str', 'ro', true, 'induty', '', '')); /* gf_LocaleTrans('default', 'titInduty') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('종목/업태 ', '100', 'left', 'str', 'ro', true, 'bizcnd', '', '')); /* gf_LocaleTrans('default', 'titBizcnd') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('대표전화번호', '100', 'left', 'str', 'ro', true, 'telno', '', '')); /* gf_LocaleTrans('default', 'titTelno') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('팩스번호', '100', 'left', 'str', 'ro', true, 'faxNo', '', '')); /* gf_LocaleTrans('default', 'titFaxNo') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('회계시작일자', '100', 'left', 'str', 'ro', true, 'accnutBeginDe', '', '')); /* gf_LocaleTrans('default', 'titAccnutBeginDe') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('사업장의 관할 세무서명을 기록하는 항목', '100', 'left', 'str', 'ro', true, 'taxofcNm', '', '')); /* gf_LocaleTrans('default', 'titTaxofcNm') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('세무서코드', '100', 'center', 'str', 'ro', true, 'taxofcCode', '', '')); /* gf_LocaleTrans('default', 'titTaxofcCode') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('홈택스_은행코드', '100', 'center', 'str', 'ro', true, 'htaxBankCode', '', '')); /* gf_LocaleTrans('default', 'titHtaxBankCode') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('일반', '100', 'center', 'str', 'ro', true, 'taxtSe', '', '')); /* gf_LocaleTrans('default', 'titTaxtSe') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('관할기관명', '100', 'left', 'str', 'ro', true, 'lcltytaxCmptinst', '', '')); /* gf_LocaleTrans('default', 'titLcltytaxCmptinst') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('지방세 납부 관할기관 명', '100', 'left', 'str', 'ro', true, 'lcltytaxCmptinstNm', '', '')); /* gf_LocaleTrans('default', 'titLcltytaxCmptinstNm') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('사업장 연면적 ', '100', 'right', 'int', 'ro', true, 'bplcArea', '', '')); /* gf_LocaleTrans('default', 'titBplcArea') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('홈택스 아이디', '100', 'left', 'str', 'ro', true, 'htaxId', '', '')); /* gf_LocaleTrans('default', 'titHtaxId') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('암호화 key를 기입하는 항목.', '100', 'left', 'str', 'ro', true, 'htaxPassword', '', '')); /* gf_LocaleTrans('default', 'titHtaxPassword') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('홈택스_계좌번호', '100', 'left', 'str', 'ro', true, 'htaxAcnutNo', '', '')); /* gf_LocaleTrans('default', 'titHtaxAcnutNo') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('홈택스담당자', '100', 'left', 'str', 'ro', true, 'htaxCharger', '', '')); /* gf_LocaleTrans('default', 'titHtaxCharger') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('홈택스담당자이름', '100', 'left', 'str', 'ro', true, 'htaxChargerNm', '', '')); /* gf_LocaleTrans('default', 'titHtaxChargerNm') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('홈텍스 이메일', '100', 'left', 'str', 'ro', true, 'htaxEmail', '', '')); /* gf_LocaleTrans('default', 'titHtaxEmail') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('홈택스_핸드폰번호', '100', 'left', 'str', 'ro', true, 'htaxMbtlnum', '', '')); /* gf_LocaleTrans('default', 'titHtaxMbtlnum') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('총괄납부번', '100', 'left', 'str', 'ro', true, 'smrizePayNo', '', '')); /* gf_LocaleTrans('default', 'titSmrizePayNo') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('총괄납부여부', '100', 'center', 'str', 'ro', true, 'smrizePayAt', '', '')); /* gf_LocaleTrans('default', 'titSmrizePayAt') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('사업자단위 과세여부', '100', 'center', 'str', 'ro', true, 'bsnmUnitTaxtAt', '', '')); /* gf_LocaleTrans('default', 'titBsnmUnitTaxtAt') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('결산월', '100', 'left', 'str', 'ro', true, 'stacntMt', '', '')); /* gf_LocaleTrans('default', 'titStacntMt') */
    dhxGridMhshrm001HeaderInfo.push(gf_MakeDhxGridHeader('사용여부를 check하는 항목.', '100', 'center', 'str', 'ro', true, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm001 = gf_MakeDhxGrid('dataListMhshrm001', dhxGridMhshrm001HeaderInfo, true, false, false);
    dhxGridMhshrm001.enableAutoWidth(false);
    dhxGridMhshrm001.setEditable(true);

    dhxGridMhshrm001.setColumnMinWidth(40,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    

    dhxGridMhshrm001.setNumberFormat("0,000", dhxGridMhshrm001.getColIndexById("stdrAmt"), ".", ",");
    dhxGridMhshrm001.setNumberFormat("0,000", dhxGridMhshrm001.getColIndexById("capitalAmt"), ".", ",");
    

    gf_ComboCode('divComboTaxofcCode', 'ComboTaxofcCode', 'ComboTaxofcCode', 'add', 'C204', '' , 'width:165%', '', '', 'required');	//세무서 코드
    gf_ComboCode('divComboBankCode', 'ComboBankCode', 'ComboBankCode', 'add', 'C010', '' , 'width: 123%', '', '', ''); //은행코드
    gf_ComboCode('divComboTaxtSe', 'ComboTaxSe', 'ComboTaxSe', 'add', 'C017', '' , 'width: 141%', '', '', ''); //과세구분

    return true;
};

var cf_SetEventListenerMhshrm001 = function() {
	// 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm001 = gf_GridDetachEvent(dhxGridMhshrm001, eventIdMhshrm001);
    eventId = dhxGridMhshrm001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm001.getColumnsNum();
            var rowNum = dhxGridMhshrm001.getRowsNum();
            var selectedId = dhxGridMhshrm001.getSelectedRowId();
            var ind        = dhxGridMhshrm001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm001.getRowIndex(selectedId);
            var type       = dhxGridMhshrm001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm001.selectRow(0);
                    //fn_FindMhshrm001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm001.selectRow(rowIndex + 1);
                    fn_FindMhshrm001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm001.getSelectedRowId();
            var ind        = dhxGridMhshrm001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm001.getRowIndex(selectedId);
            var type       = dhxGridMhshrm001.getColType(ind);
            dhxGridMhshrm001.selectCell(rowIndex+1, ind);
            fn_FindMhshrm001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm001.getSelectedRowId();
            var ind        = dhxGridMhshrm001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm001.getRowIndex(selectedId);
            var type       = dhxGridMhshrm001.getColType(ind);
            dhxGridMhshrm001.selectCell(rowIndex-1, ind);
            fn_FindMhshrm001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm001.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrm001.push(eventId);
    eventId = dhxGridMhshrm001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm001SortGridList(ind, type, direction); 
    });
    eventIdMhshrm001.push(eventId);
    eventId = dhxGridMhshrm001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm001.push(eventId);
    eventId = dhxGridMhshrm001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhshrm001();
    });
    eventIdMhshrm001.push(eventId);
    eventId = dhxGridMhshrm001.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMhshrm001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrm001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrm001()
    });
    $('#btnSaveMhshrm001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrm001();
    });
    $('#btnRemoveMhshrm001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm001();
    });
    $('#btnExcelMhshrm001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm001();
    });
    $('#btnSearchMhshrm001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm001('');
    });
    $('#btnResetMhshrm001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhshrm001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrm001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //우편번호 찾기 
    $('#btnZipSearch').unbind('click').bind('click', function(event){
    	gf_ZipPopup("saveFormMhshrm001","zip","adres", "detailAdres", "fn_CallBackZipPopup"); 
    }); 
    //달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#saveFormMhshrm001 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    //사원찾기 
    $('#saveFormMhshrm001 #btnEmpSearch').unbind('click').bind('click', function(event){
    	// form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
        gf_EmpPopup("saveFormMhshrm001","htaxCharger","htaxChargerNm", gBplcCode, "N", "fn_CallbackPopEmp");  
	});
	$('#saveFormMhshrm001 #bizrnoSaveFormMhshrm001').unbind('keyup').bind('keyup', function(event){
		var jnum = $('#saveFormMhshrm001 #bizrnoSaveFormMhshrm001').val();
		var rJnum = "";
		
		jnum = jnum.replace(/[^0-9]/g,"");  // 숫자만 남김
		if(jnum.length >= 4 && jnum.length < 6){
			rJnum = jnum.substring(0,3) + "-" + jnum.substring(3,5)
		} else if(jnum.length >= 6){
			rJnum = jnum.substring(0,3) + "-" + jnum.substring(3,5) + "-" + jnum.substring(5,10)
		}
		else rJnum = jnum;
		$('#saveFormMhshrm001 #bizrnoSaveFormMhshrm001').val(rJnum);
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhshrm001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhshrm001",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm001 input[name="bplcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'bplcCode', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="bplcKorNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'bplcKorNm', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="bizrno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'bizrno', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="bplcKorNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'bplcKorNm', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="bplcEngNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'bplcEngNm', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="jurirno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'jurirno', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="zip"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'zip', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="adres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'adres', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="detailAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'detailAdres', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="dongCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'dongCode', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="capitalAmt"]').unbind('change blur').bind('change blur',function() {
    	console.log("ttt");
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'capitalAmt', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="reprsntNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'reprsntNm', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="induty"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'induty', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="bizcnd"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'bizcnd', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="telno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'telno', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="faxNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'faxNo', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="accnutBeginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'accnutBeginDe', $(this).val());
    });
    $('#saveFormMhshrm001 select[name="ComboTaxofcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'taxofcCode', $(this).val());
    });
    $('#saveFormMhshrm001 select[name="ComboBankCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'htaxBankCode', $(this).val());
    });
    $('#saveFormMhshrm001 select[name="ComboTaxSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'taxtSe', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="lcltytaxCmptinst"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'lcltytaxCmptinst', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="bplcArea"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'bplcArea', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="htaxId"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'htaxId', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="htaxPassword"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'htaxPassword', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="htaxAcnutNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'htaxAcnutNo', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="htaxCharger"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'htaxCharger', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="htaxChargerNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'htaxChargerNm', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="htaxEmail"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'htaxEmail', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="htaxMbtlnum"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'htaxMbtlnum', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="smrizePayNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'smrizePayNo', $(this).val());
    });
    $('#saveFormMhshrm001 input[name="smrizePayAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($('input[name="smrizePayAt"]').is(":checked") == true){
        	gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'smrizePayAt', '1');
        } else {
        	gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'smrizePayAt', '0');
        }
    });
    $('#saveFormMhshrm001 input[name="bsnmUnitTaxtAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($('input[name="bsnmUnitTaxtAt"]').is(":checked") == true){
        	gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'bsnmUnitTaxtAt', '1');
        } else {
        	gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'bsnmUnitTaxtAt', '0');
        }
    });
    $('#saveFormMhshrm001 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($('input[name="useAt"]').is(":checked") == true){
        	gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'useAt', '1');
        } else {
        	gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'useAt', '0');
        }
    });
//    $('#saveFormMhshrm001 input[name="fondDe"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'fondDe', $(this).val());
//    });
//    $('#saveFormMhshrm001 input[name="taxofcNm"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'taxofcNm', $(this).val());
//    });//세무서명
//    $('#saveFormMhshrm001 input[name="lcltytaxCmptinstNm"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'lcltytaxCmptinstNm', $(this).val());
//    });//지방세 납부 관할기관 명
//    $('#saveFormMhshrm001 input[name="stacntMt"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhshrm001, dhxDataProcessorMhshrm001, 'stacntMt', $(this).val());
//    });//결산월

    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhshrm001 = function() {
    $('#searchFormMhshrm001').resetForm();
    $('#searchBplcKorNmSearchFormMhshrm001').focus();
};

var cf_SetBindingMhshrm001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhshrm001('');
    fn_Calendar();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm001 = function(userId) {
    var jsonParameter = {
    		bplcKorNm : gf_FormGetValue('searchFormMhshrm001', 'searchBplcKorNm', 'text')
    };
    gf_Transaction(userId, 'mhshrm001/searchMhshrm001', jsonParameter, 'fn_CallbackSearchMhshrm001', false, 'GET');
};

var fn_CallbackSearchMhshrm001 = function(strSvcID, targetID, data) {
    //dhxGridMhshrm001.clearAll();
    dhxGridMhshrm001.destructor();
    if(cf_SetComponentsMhshrm001()){ 
        fn_DhxDataProcessorMhshrm001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrm001');
            dhxGridMhshrm001.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrm001 == 0 && save_All_Sta_Mhshrm001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrm001.selectRow(0); 
            } else if(save_Row_Sta_Mhshrm001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrm001.selectRow(0);
            } else if(save_All_Sta_Mhshrm001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrm001.selectRow(save_Row_Num_Mhshrm001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrm001.selectRow(save_Row_Num_Mhshrm001);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrm001.findCell(save_Row_Ids_Mhshrm001, gf_GetDhxGridColumId(dhxGridMhshrm001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrm001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrm001.selectRow(0);
                //} 
            } 
 
            fn_FindMhshrm001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrm001');
            fn_InitInputFormMhshrm001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhshrm001").text(data.data.records.length);
        cf_SetEventListenerMhshrm001();
    } 
};
var fn_DhxDataProcessorMhshrm001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm001 = new dataProcessor(gv_ContextPath+'/mhshrm001/saveMhshrm001'); //lock feed url
    dhxDataProcessorMhshrm001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm001.init(dhxGridMhshrm001); //link dataprocessor to the grid
    dhxDataProcessorMhshrm001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm001();
                    $("#checkAllMhshrm001").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMhshrm001 = function() {
    var rId = dhxGridMhshrm001.getSelectedRowId();
    var status = dhxDataProcessorMhshrm001.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMhshrm001", "bplcCode", gf_DhxGetValue(dhxGridMhshrm001, rId, 'bplcCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "bplcKorNm", gf_DhxGetValue(dhxGridMhshrm001, rId, 'bplcKorNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "bplcEngNm", gf_DhxGetValue(dhxGridMhshrm001, rId, 'bplcEngNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "bizrno", gf_DhxGetValue(dhxGridMhshrm001, rId, 'bizrno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "jurirno", gf_DhxGetValue(dhxGridMhshrm001, rId, 'jurirno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "zip", gf_DhxGetValue(dhxGridMhshrm001, rId, 'zip',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "adres", gf_DhxGetValue(dhxGridMhshrm001, rId, 'adres',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "detailAdres", gf_DhxGetValue(dhxGridMhshrm001, rId, 'detailAdres',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "dongCode", gf_DhxGetValue(dhxGridMhshrm001, rId, 'dongCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "capitalAmt", gf_DhxGetValue(dhxGridMhshrm001, rId, 'capitalAmt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "fondDe", gf_DhxGetValue(dhxGridMhshrm001, rId, 'fondDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "reprsntNm", gf_DhxGetValue(dhxGridMhshrm001, rId, 'reprsntNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "induty", gf_DhxGetValue(dhxGridMhshrm001, rId, 'induty',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "bizcnd", gf_DhxGetValue(dhxGridMhshrm001, rId, 'bizcnd',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "telno", gf_DhxGetValue(dhxGridMhshrm001, rId, 'telno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "faxNo", gf_DhxGetValue(dhxGridMhshrm001, rId, 'faxNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "accnutBeginDe", gf_DhxGetValue(dhxGridMhshrm001, rId, 'accnutBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "taxofcNm", gf_DhxGetValue(dhxGridMhshrm001, rId, 'taxofcNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "htaxBankCode", gf_DhxGetValue(dhxGridMhshrm001, rId, 'htaxBankCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "taxtSe", gf_DhxGetValue(dhxGridMhshrm001, rId, 'taxtSe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "lcltytaxCmptinst", gf_DhxGetValue(dhxGridMhshrm001, rId, 'lcltytaxCmptinst',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "lcltytaxCmptinstNm", gf_DhxGetValue(dhxGridMhshrm001, rId, 'lcltytaxCmptinstNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "bplcArea", gf_DhxGetValue(dhxGridMhshrm001, rId, 'bplcArea',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "htaxId", gf_DhxGetValue(dhxGridMhshrm001, rId, 'htaxId',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "htaxPassword", gf_DhxGetValue(dhxGridMhshrm001, rId, 'htaxPassword',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "htaxAcnutNo", gf_DhxGetValue(dhxGridMhshrm001, rId, 'htaxAcnutNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "htaxCharger", gf_DhxGetValue(dhxGridMhshrm001, rId, 'htaxCharger',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "htaxChargerNm", gf_DhxGetValue(dhxGridMhshrm001, rId, 'htaxChargerNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "htaxEmail", gf_DhxGetValue(dhxGridMhshrm001, rId, 'htaxEmail',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "htaxMbtlnum", gf_DhxGetValue(dhxGridMhshrm001, rId, 'htaxMbtlnum',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "smrizePayNo", gf_DhxGetValue(dhxGridMhshrm001, rId, 'smrizePayNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm001", "stacntMt", gf_DhxGetValue(dhxGridMhshrm001, rId, 'stacntMt',  'grid'), '');
    
    gf_FormSetValue("saveFormMhshrm001", "ComboTaxofcCode", gf_DhxGetValue(dhxGridMhshrm001, rId, 'taxofcCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshrm001", "ComboBankCode", gf_DhxGetValue(dhxGridMhshrm001, rId, 'htaxBankCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshrm001", "ComboTaxSe", gf_DhxGetValue(dhxGridMhshrm001, rId, 'taxtSe',  'grid'), 'combo');
    
    gf_FormSetValue('saveFormMhshrm001', 'smrizePayAt', (( gf_DhxGetValue(dhxGridMhshrm001, rId, 'smrizePayAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue('saveFormMhshrm001', 'bsnmUnitTaxtAt', (( gf_DhxGetValue(dhxGridMhshrm001, rId, 'bsnmUnitTaxtAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue('saveFormMhshrm001', 'useAt', (( gf_DhxGetValue(dhxGridMhshrm001, rId, 'useAt',  'grid') == '1') ? true : false), 'chkbox');

    if(status == 'inserted') {
        $('#saveFormMhshrm001 input[name="bplcCode"]').prop('disabled', false);
    } else {
        $('#saveFormMhshrm001 input[name="bplcCode"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhshrm001 = function() {
    $('#saveFormMhshrm001 input[name="bplcCode"]').prop('disabled', false);
    $('#saveFormMhshrm001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhshrm001 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMhshrm001 = function() {
    dhxGridMhshrm001.clearSelection();
    fn_InitInputFormMhshrm001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //bplcCode
    initValueArr.push(''); //bplcKorNm
    initValueArr.push(''); //bplcEngNm
    initValueArr.push(''); //bizrno
    initValueArr.push(''); //jurirno
    initValueArr.push(''); //zip
    initValueArr.push(''); //adres
    initValueArr.push(''); //detailAdres
    initValueArr.push(''); //dongCode
    initValueArr.push(''); //capitalAmt
    initValueArr.push(''); //fondDe
    initValueArr.push(''); //reprsntNm
    initValueArr.push(''); //induty
    initValueArr.push(''); //bizcnd
    initValueArr.push(''); //telno
    initValueArr.push(''); //faxNo
    initValueArr.push(''); //accnutBeginDe
    initValueArr.push(''); //taxofcNm
    initValueArr.push(''); //taxofcCode
    initValueArr.push(''); //htaxBankCode
    initValueArr.push(''); //taxtSe
    initValueArr.push(''); //lcltytaxCmptinst
    initValueArr.push(''); //lcltytaxCmptinstNm
    initValueArr.push(''); //bplcArea
    initValueArr.push(''); //htaxId
    initValueArr.push(''); //htaxPassword
    initValueArr.push(''); //htaxAcnutNo
    initValueArr.push(''); //htaxCharger
    initValueArr.push(''); //htaxEmail
    initValueArr.push(''); //htaxMbtlnum
    initValueArr.push(''); //smrizePayNo
    initValueArr.push(''); //smrizePayAt
    initValueArr.push(''); //bsnmUnitTaxtAt
    initValueArr.push(''); //stacntMt
    initValueArr.push(''); //useAt
    dhxGridMhshrm001.addRow(dhxGridMhshrm001.uid(), initValueArr, 0);
    dhxGridMhshrm001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm001');
    $('#btnPopEmpSearchMhshrm001').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm001.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm001', 'sortColumId', '', 'text'); 
            dhxGridMhshrm001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrm001 = 0; 
    save_Edt_Cnt_Mhshrm001 = 0; 
    save_Del_Cnt_Mhshrm001 = 0; 
    dhxGridMhshrm001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrm001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrm001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrm001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrm001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrm001 += 1; 
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
        save_All_Sta_Mhshrm001 = 0; 
        if(save_Add_Cnt_Mhshrm001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrm001 + "건";
            save_All_Sta_Mhshrm001 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrm001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrm001 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrm001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrm001 + "건"; 
            save_All_Sta_Mhshrm001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrm001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrm001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrm001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrm001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrm001_Send = function() {
    if(fn_GridValidation(dhxGridMhshrm001, dhxDataProcessorMhshrm001)) {
        dhxDataProcessorMhshrm001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm001 = function() {
    var rowId = dhxGridMhshrm001.getSelectedRowId();
    var state = dhxDataProcessorMhshrm001.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMhshrm001.getRowIndex(rowId);
        dhxGridMhshrm001.deleteRow(rowId);
        dhxGridMhshrm001.selectRow(rowNum);
        fn_FindMhshrm001();
    }
    else dhxDataProcessorMhshrm001.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrm001 = function () {
    var titMhshrm001 = '개인정보변경신청'; /* gf_LocaleTrans('default', 'titMhshrm001') */
    var jsonParameter = {
        bplcCode : gf_FormGetValue('searchFormMhshrm001', 'bplcCode', 'text')
    };
    var header = [[
        '사업장구분코드 기본 자리수는 4자리' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '법인의 한글명을 기록하는 항목' /* gf_LocaleTrans('default', 'titBplcKorNm') */,
        '법인의 영문명을 기록하는 항목' /* gf_LocaleTrans('default', 'titBplcEngNm') */,
        '사업자등록번호' /* gf_LocaleTrans('default', 'titBizrno') */,
        '법인등록번호' /* gf_LocaleTrans('default', 'titJurirno') */,
        '우편번호' /* gf_LocaleTrans('default', 'titZip') */,
        '주소1' /* gf_LocaleTrans('default', 'titAdres') */,
        '주소2' /* gf_LocaleTrans('default', 'titDetailAdres') */,
        '법정동코드 (법인세 신고시 필요함)' /* gf_LocaleTrans('default', 'titDongCode') */,
        '자본금 (법인세 신고시 필요)' /* gf_LocaleTrans('default', 'titCapitalAmt') */,
        '사업장의 설립일자를 기록하는 항목' /* gf_LocaleTrans('default', 'titFondDe') */,
        '대표자명' /* gf_LocaleTrans('default', 'titReprsntNm') */,
        '업종' /* gf_LocaleTrans('default', 'titInduty') */,
        '종목/업태 ' /* gf_LocaleTrans('default', 'titBizcnd') */,
        '대표전화번호' /* gf_LocaleTrans('default', 'titTelno') */,
        '팩스번호' /* gf_LocaleTrans('default', 'titFaxNo') */,
        '회계시작일자' /* gf_LocaleTrans('default', 'titAccnutBeginDe') */,
        '사업장의 관할 세무서명을 기록하는 항목' /* gf_LocaleTrans('default', 'titTaxofcNm') */,
        '세무서코드(C204)' /* gf_LocaleTrans('default', 'titTaxofcCode') */,
        '홈택스_은행코드(C010)' /* gf_LocaleTrans('default', 'titHtaxBankCode') */,
        '일반, 면세, 영세' /* gf_LocaleTrans('default', 'titTaxtSe') */,
        '관할기관명(시/구청명)' /* gf_LocaleTrans('default', 'titLcltytaxCmptinst') */,
        '지방세 납부 관할기관 명' /* gf_LocaleTrans('default', 'titLcltytaxCmptinstNm') */,
        '사업장 연면적 (제곱미터)-  지방소득세 재산세 계산시 사용' /* gf_LocaleTrans('default', 'titBplcArea') */,
        '홈택스 아이디' /* gf_LocaleTrans('default', 'titHtaxId') */,
        '암호화 key를 기입하는 항목.' /* gf_LocaleTrans('default', 'titHtaxPassword') */,
        '홈택스_계좌번호' /* gf_LocaleTrans('default', 'titHtaxAcnutNo') */,
        '홈택스담당자' /* gf_LocaleTrans('default', 'titHtaxCharger') */,
        '홈텍스 이메일' /* gf_LocaleTrans('default', 'titHtaxEmail') */,
        '홈택스_핸드폰번호' /* gf_LocaleTrans('default', 'titHtaxMbtlnum') */,
        '총괄납부번' /* gf_LocaleTrans('default', 'titSmrizePayNo') */,
        '총괄납부여부' /* gf_LocaleTrans('default', 'titSmrizePayAt') */,
        '사업자단위 과세여부' /* gf_LocaleTrans('default', 'titBsnmUnitTaxtAt') */,
        '결산월' /* gf_LocaleTrans('default', 'titStacntMt') */,
        '사용여부를 check하는 항목.' /* gf_LocaleTrans('default', 'titUseAt') */
    ]];
    var dataId = [[ 'bplcCode', 'bplcKorNm', 'bplcEngNm', 'bizrno', 'jurirno', 'zip', 'adres', 'detailAdres', 'dongCode', 'capitalAmt', 'fondDe', 'reprsntNm', 'induty', 'bizcnd', 'telno', 'faxNo', 'accnutBeginDe', 'taxofcNm', 'taxofcCode', 'htaxBankCode', 'taxtSe', 'lcltytaxCmptinst', 'lcltytaxCmptinstNm', 'bplcArea', 'htaxId', 'htaxPassword', 'htaxAcnutNo', 'htaxCharger', 'htaxEmail', 'htaxMbtlnum', 'smrizePayNo', 'smrizePayAt', 'bsnmUnitTaxtAt', 'stacntMt', 'useAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm001/excelMhshrm001', jsonParameter);
};
/**
 * 우편번호 검색
 */
var fn_CallBackZipPopup = function(data){
	if(!gf_IsNull(data)){
		console.log(data.zipno + " : " + data.roadAddr1 + " " + (data.roadAddrDetail + " " + data.roadAddr2).trim());
		gf_FormSetValue('saveFormMhshrm001', 'zip', data.zipno, 'text');  
		gf_FormSetValue('saveFormMhshrm001', 'adres', data.roadAddr1, 'text');
		gf_FormSetValue('saveFormMhshrm001', 'detailAdres',(data.roadAddrDetail + " " + data.roadAddr2).trim(), 'text');
	}
}
/**
 * 사원 검색
 */
function fn_CallbackPopEmp(data){
	console.log(data.empno + " : " + data.korNm);
	gf_FormSetValue('saveFormMhshrm001', 'htaxCharger', data.empno, 'text');  
	gf_FormSetValue('saveFormMhshrm001', 'htaxChargerNm', data.korNm, 'text');  
}
/**
 * 단일 달력
 */
//일반달력
function fn_Calendar(){
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"accnutBeginDeSaveFormMhshrm001", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	//금일 날짜표시
	$('#accnutBeginDeSaveFormMhshrm001').val(nowDate);
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
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormMhshrm001 #bplcCodeSaveFormMhshrm001').parent().append(
    '<div class="error" id="bplcCodeSaveFormMhshrm001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrm001 = function(bplcCode){
    if(!gf_IsNull(bplcCode)) {
        var jsonParameter = {
            bplcCode : bplcCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm001/findMhshrm001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.bplcCode)) {
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
    var state = dhxDataProcessorMhshrm001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhshrm001').validate().form()){
                if(state == 'inserted') {
                    var bplcCode = gf_FormGetValue('saveFormMhshrm001', 'bplcCode', 'text');
                    if(fn_CheckDupMhshrm001(bplcCode)) return true;
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
    var checkBplcCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrm001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhshrm001 == 'deleted') {
        save_Row_Num_Mhshrm001 = 0;
        save_Row_Ids_Mhshrm001 = "";
    } else if(save_Row_Sta_Mhshrm001 == 'inserted') {
        save_Row_Num_Mhshrm001 = rowNum;
        save_Row_Ids_Mhshrm001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrm001 = rowNum;
        save_Row_Ids_Mhshrm001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'bplcCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bplcCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'jurirno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'jurirno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'bplcKorNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bplcKorNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'bizrno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bizrno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'reprsntNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reprsntNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'induty', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'induty');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'bizcnd', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bizcnd');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'zip', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'zip');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'adres', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'adres');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'telno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'telno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'taxofcCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'taxofcCode');
                    valid = false;
                }    
                if(Number(gf_DhxGetValue(dhxGridObjet, rowId, 'bplcArea', 'grid')) > 99.999){
                	bplcAreaErr = true;
                    
                    valid = false;
                } else {
                	bplcAreaErr = false;
                }               
                
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkBplcCode = gf_DhxGetValue(dhxGridObjet, rowId, 'bplcCode', 'grid');
                    if(!gf_IsNull(checkBplcCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var bplcCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'bplcCode', 'grid');
                            if(((bplcCode == checkBplcCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bplcCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrm001( checkBplcCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bplcCode');
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
        dhxGridMhshrm001.selectRowById(validFalseFistRowId);
        fn_FindMhshrm001();
        fn_FormValidation(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }

    
    if(bplcAreaErr){
    	$('#saveFormMhshrm001 #bplcAreaSaveFormMhshrm001').parent().append(
        	'<div class="error" id="bplcAreaSaveFormMhshrm001-error" onclick="$(this).remove()">값이 너무 큽니다.</div>'
        );
    	return false;
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
