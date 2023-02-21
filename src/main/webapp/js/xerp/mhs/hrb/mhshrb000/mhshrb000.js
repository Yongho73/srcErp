/**
 *    프로그램       : 인사탭 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.09
 *    사용테이블      : STM_CUSTOMER
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrb000();
    cf_SetComponentsMhshrb000();
    cf_SetEventListenerMhshrb000();
    cf_InitFormMhshrb000();
    cf_SetBindingMhshrb000();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrb000 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrb000").validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMhshrb000;
var cf_SetComponentsMhshrb000 = function() {
    var dhxGridMhshrb000HeaderInfo = [];
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '*', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrb000" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처코드', '100', 'center', 'str', 'ro', false, 'bcncCode', '', '')); /* gf_LocaleTrans('default', 'titBcncCode') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('사업자등록번호', '100', 'center', 'str', 'ro', false, 'bizrno', '', '')); /* gf_LocaleTrans('default', 'titBizrno') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('사업장구분코드 기본 자리수는 4자리', '100', 'center', 'str', 'ro', false, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처명', '100', 'center', 'str', 'ro', false, 'bcncNm', '', '')); /* gf_LocaleTrans('default', 'titBcncNm') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('대표자명', '100', 'center', 'str', 'ro', false, 'reprsntNm', '', '')); /* gf_LocaleTrans('default', 'titReprsntNm') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('업종(종목)', '100', 'center', 'str', 'ro', false, 'induty', '', '')); /* gf_LocaleTrans('default', 'titInduty') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('업태', '100', 'center', 'str', 'ro', false, 'bizcnd', '', '')); /* gf_LocaleTrans('default', 'titBizcnd') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처 구분(C004)', '100', 'center', 'str', 'ro', false, 'bcncSe', '', '')); /* gf_LocaleTrans('default', 'titBcncSe') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('법인구분 (법인/개인 )C005', '100', 'center', 'str', 'ro', false, 'cprSe', '', '')); /* gf_LocaleTrans('default', 'titCprSe') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('국적코드', '100', 'center', 'str', 'ro', false, 'nltyCode', '', '')); /* gf_LocaleTrans('default', 'titNltyCode') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처규모', '100', 'center', 'str', 'ro', false, 'bcncscaleSe', '', '')); /* gf_LocaleTrans('default', 'titBcncscaleSe') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('과세유형[과세||면세||영세]  C009', '100', 'center', 'str', 'ro', false, 'taxtSe', '', '')); /* gf_LocaleTrans('default', 'titTaxtSe') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('표준통화코드', '100', 'center', 'str', 'ro', false, 'crncyCode', '', '')); /* gf_LocaleTrans('default', 'titCrncyCode') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('은행코드(C010)', '100', 'center', 'str', 'ro', false, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('지역코드', '100', 'center', 'str', 'ro', false, 'areaCode', '', '')); /* gf_LocaleTrans('default', 'titAreaCode') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('지역코드를 나타내는 항목.', '100', 'center', 'str', 'ro', false, 'areaNm', '', '')); /* gf_LocaleTrans('default', 'titAreaNm') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('우편번호', '100', 'center', 'str', 'ro', false, 'postCode', '', '')); /* gf_LocaleTrans('default', 'titPostCode') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처의 법인등록시 기재된 주소를 나타내는 항목', '100', 'center', 'str', 'ro', false, 'adres', '', '')); /* gf_LocaleTrans('default', 'titAdres') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('기본주소', '100', 'center', 'str', 'ro', false, 'addr2', '', '')); /* gf_LocaleTrans('default', 'titAddr2') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처의 대표전화 번호를 나타내는 항목', '100', 'center', 'str', 'ro', false, 'telno', '', '')); /* gf_LocaleTrans('default', 'titTelno') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처의 팩스번호를 나타내는 항목', '100', 'center', 'str', 'ro', false, 'faxNo', '', '')); /* gf_LocaleTrans('default', 'titFaxNo') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '100', 'center', 'str', 'ro', false, 'acnutNo', '', '')); /* gf_LocaleTrans('default', 'titAcnutNo') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('예금주명', '100', 'center', 'str', 'ro', false, 'dpstrNm', '', '')); /* gf_LocaleTrans('default', 'titDpstrNm') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('HomePage', '100', 'center', 'str', 'ro', false, 'homepage', '', '')); /* gf_LocaleTrans('default', 'titHomepage') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('매입여부', '100', 'center', 'str', 'ro', false, 'purchsAt', '', '')); /* gf_LocaleTrans('default', 'titPurchsAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('매출여부', '100', 'center', 'str', 'ro', false, 'saleofficAt', '', '')); /* gf_LocaleTrans('default', 'titSaleofficAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처정보에 대해 기입하는 항목.', '100', 'center', 'str', 'ro', false, 'bcncCn', '', '')); /* gf_LocaleTrans('default', 'titBcncCn') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처 설립일자 기입하는 항목.', '100', 'center', 'str', 'ro', false, 'fondDe', '', '')); /* gf_LocaleTrans('default', 'titFondDe') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처 자본금 기입하는 항목.', '100', 'right', 'int', 'ro', false, 'capitalAmt', '', '')); /* gf_LocaleTrans('default', 'titCapitalAmt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처 년매출액 기입하는 항목.', '100', 'right', 'int', 'ro', false, 'yySaleAmt', '', '')); /* gf_LocaleTrans('default', 'titYySaleAmt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('거래처 직원수 기입하는 항목.', '100', 'center', 'str', 'ro', false, 'emplCo', '', '')); /* gf_LocaleTrans('default', 'titEmplCo') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('무역업등록번호', '100', 'center', 'str', 'ro', false, 'tradeNo', '', '')); /* gf_LocaleTrans('default', 'titTradeNo') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ro', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '100', 'center', 'str', 'ro', false, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('담당자명', '100', 'center', 'str', 'ro', false, 'chargerNm', '', '')); /* gf_LocaleTrans('default', 'titChargerNm') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('담당자이메일', '100', 'center', 'str', 'ro', false, 'chargerEmail', '', '')); /* gf_LocaleTrans('default', 'titChargerEmail') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('담당자 전화번호', '100', 'center', 'str', 'ro', false, 'chargerTelno', '', '')); /* gf_LocaleTrans('default', 'titChargerTelno') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('담당자부서', '100', 'center', 'str', 'ro', false, 'chargerDept', '', '')); /* gf_LocaleTrans('default', 'titChargerDept') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('담당자 직위', '100', 'center', 'str', 'ro', false, 'chargerOfcps', '', '')); /* gf_LocaleTrans('default', 'titChargerOfcps') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('중소기업우선구매대상 여부', '100', 'center', 'str', 'ro', false, 'priorPurchsAt', '', '')); /* gf_LocaleTrans('default', 'titPriorPurchsAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('장애인기업여부', '100', 'center', 'str', 'ro', false, 'dsrprAt', '', '')); /* gf_LocaleTrans('default', 'titDsrprAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('여성대표기업여부', '100', 'center', 'str', 'ro', false, 'womanAt', '', '')); /* gf_LocaleTrans('default', 'titWomanAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('외자기업구분', '100', 'center', 'str', 'ro', false, 'foreignAt', '', '')); /* gf_LocaleTrans('default', 'titForeignAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('중증장애인기업구분', '100', 'center', 'str', 'ro', false, 'serhandicapAt', '', '')); /* gf_LocaleTrans('default', 'titSerhandicapAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('사회적기업구분', '100', 'center', 'str', 'ro', false, 'socialentrprsAt', '', '')); /* gf_LocaleTrans('default', 'titSocialentrprsAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('장애인표준사업장', '100', 'center', 'str', 'ro', false, 'dspsnStdAt', '', '')); /* gf_LocaleTrans('default', 'titDspsnStdAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('녹색제품', '100', 'center', 'str', 'ro', false, 'greenAt', '', '')); /* gf_LocaleTrans('default', 'titGreenAt') */
    dhxGridMhshrb000HeaderInfo.push(gf_MakeDhxGridHeader('기술개발제품', '100', 'center', 'str', 'ro', false, 'technologyAt', '', '')); /* gf_LocaleTrans('default', 'titTechnologyAt') */
    dhxGridMhshrb000 = gf_MakeDhxGrid('dataListMhshrb000', dhxGridMhshrb000HeaderInfo, true, false, false);
    dhxGridMhshrb000.enableAutoWidth(false);
    dhxGridMhshrb000.setEditable(true);

    dhxGridMhshrb000.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
};

var eventIdMhshrb000 = [];
var cf_SetEventListenerMhshrb000 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrb000 = gf_GridDetachEvent(dhxGridMhshrb000, eventIdMhshrb000);
    eventId = dhxGridMhshrb000.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrb000();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrb000.getColumnsNum();
            var rowNum = dhxGridMhshrb000.getRowsNum();
            var selectedId = dhxGridMhshrb000.getSelectedRowId();
            var ind        = dhxGridMhshrb000.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrb000.getRowIndex(selectedId);
            var type       = dhxGridMhshrb000.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrb000.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrb000.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrb000.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrb000.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrb000.getSelectedRowId();
            var ind        = dhxGridMhshrb000.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrb000.getRowIndex(selectedId);
            var type       = dhxGridMhshrb000.getColType(ind);
            dhxGridMhshrb000.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrb000.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrb000.getSelectedRowId();
            var ind        = dhxGridMhshrb000.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrb000.getRowIndex(selectedId);
            var type       = dhxGridMhshrb000.getColType(ind);
            dhxGridMhshrb000.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrb000.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrb000.push(eventId);
    eventId = dhxGridMhshrb000.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrb000SortGridList(ind, type, direction); 
    });
    eventIdMhshrb000.push(eventId);
    eventId = dhxGridMhshrb000.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrb000.push(eventId);
    eventId = dhxGridMhshrb000.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhshrb000();
    });
    eventIdMhshrb000.push(eventId);
    eventId = dhxGridMhshrb000.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMhshrb000.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrb000').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrb000()
    });
    $('#btnSaveMhshrb000').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrb000();
    });
    $('#btnRemoveMhshrb000').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrb000();
    });
    $('#btnExcelMhshrb000').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrb000();
    });
    $('#btnSearchMhshrb000').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrb000('');
    });
    $('#btnResetMhshrb000').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrb000();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrb000').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrb000, $('#checkAllMhshrb000').prop('checked'), 'chk');
    });
    $('#bcncCodeSearchFormMhshrb000').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMhshrb000').click(); event.preventDefault(); }
    });
    $('#saveFormMhshrb000').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhshrb000 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhshrb000",this); } 
        else return true; 
    }); 
    $('#saveFormMhshrb000 input[name="bcncCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'bcncCode', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="bizrno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'bizrno', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="bplcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'bplcCode', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="bcncNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'bcncNm', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="reprsntNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'reprsntNm', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="induty"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'induty', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="bizcnd"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'bizcnd', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="bcncSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'bcncSe', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="cprSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'cprSe', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="nltyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'nltyCode', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="bcncscaleSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'bcncscaleSe', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="taxtSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'taxtSe', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="crncyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'crncyCode', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="bankCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'bankCode', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="areaCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'areaCode', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="areaNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'areaNm', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="postCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'postCode', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="adres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'adres', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="addr2"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'addr2', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="telno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'telno', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="faxNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'faxNo', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="acnutNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'acnutNo', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="dpstrNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'dpstrNm', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="homepage"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'homepage', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="purchsAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'purchsAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="saleofficAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'saleofficAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="bcncCn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'bcncCn', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="fondDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'fondDe', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="capitalAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'capitalAmt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="yySaleAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'yySaleAmt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="emplCo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'emplCo', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="tradeNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'tradeNo', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'useAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="atchmnflNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'atchmnflNo', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="chargerNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'chargerNm', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="chargerEmail"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'chargerEmail', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="chargerTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'chargerTelno', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="chargerDept"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'chargerDept', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="chargerOfcps"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'chargerOfcps', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="priorPurchsAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'priorPurchsAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="dsrprAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'dsrprAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="womanAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'womanAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="foreignAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'foreignAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="serhandicapAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'serhandicapAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="socialentrprsAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'socialentrprsAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="dspsnStdAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'dspsnStdAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="greenAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'greenAt', $(this).val());
    });
    $('#saveFormMhshrb000 input[name="technologyAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrb000, dhxDataProcessorMhshrb000, 'technologyAt', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhshrb000 = function() {
    $('#searchFormMhshrb000').resetForm();
};

var cf_SetBindingMhshrb000 = function() {
    fn_FormDisabled(true);
    fn_SearchMhshrb000('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrb000 = function(userId) {
    var jsonParameter = {
        bcncCode : gf_FormGetValue('searchFormMhshrb000', 'bcncCode', 'text')
    };
    gf_Transaction(userId, 'mhshrb000/searchMhshrb000', jsonParameter, 'fn_CallbackSearchMhshrb000', false, 'GET');
};

var dhxDataProcessorMhshrb000;
var fn_CallbackSearchMhshrb000 = function(strSvcID, targetID, data) {
    dhxGridMhshrb000.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMhshrb000');
        dhxGridMhshrb000.parse(data.data.records, 'js');
        // 그리드입력 데이터프로세스 정의
        dhxDataProcessorMhshrb000 = new dataProcessor(gv_ContextPath+'/mhshrb000/saveMhshrb000'); //lock feed url
        dhxDataProcessorMhshrb000.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
        dhxDataProcessorMhshrb000.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
        dhxDataProcessorMhshrb000.init(dhxGridMhshrb000); //link dataprocessor to the grid
        dhxDataProcessorMhshrb000.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
        dhxDataProcessorMhshrb000.styles = {
                        updated:        "font-weight:normal;text-decoration:none;",
                        inserted:       "font-weight:bold; color:green;",
                        deleted:        "color:orange; text-decoration:line-through;",
                        invalid:        "color:green; text-decoration:underline;",
                        error:          "color:blue; text-decoration:underline;",
                        clear:          "font-weight:normal;text-decoration:none;"
        };
        dhxDataProcessorMhshrb000.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
                if (dataSource.code == "000" || dataSource.data.code !== "000"){
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                        fn_SearchMhshrb000();
                        $("#checkAllMhshrb000").prop('checked', false); //상단 체크박스 해제
                        return true;
                } else {
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                        return false;
                }
        });
        dhxGridMhshrb000.selectRow(0);
        fn_FindMhshrb000();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMhshrb000');
        fn_InitInputFormMhshrb000();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMhshrb000").text(data.data.records.length);
    cf_SetEventListenerMhshrb000();
};
/**
 * 상세조회
 */
var fn_FindMhshrb000 = function() {
    var rId = dhxGridMhshrb000.getSelectedRowId();
    var status = dhxDataProcessorMhshrb000.getState(rId);

    gf_FormSetValue("saveFormMhshrb000", "bcncCode", gf_DhxGetValue(dhxGridMhshrb000, rId, 'bcncCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "bizrno", gf_DhxGetValue(dhxGridMhshrb000, rId, 'bizrno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "bplcCode", gf_DhxGetValue(dhxGridMhshrb000, rId, 'bplcCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "bcncNm", gf_DhxGetValue(dhxGridMhshrb000, rId, 'bcncNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "reprsntNm", gf_DhxGetValue(dhxGridMhshrb000, rId, 'reprsntNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "induty", gf_DhxGetValue(dhxGridMhshrb000, rId, 'induty',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "bizcnd", gf_DhxGetValue(dhxGridMhshrb000, rId, 'bizcnd',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "bcncSe", gf_DhxGetValue(dhxGridMhshrb000, rId, 'bcncSe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "cprSe", gf_DhxGetValue(dhxGridMhshrb000, rId, 'cprSe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "nltyCode", gf_DhxGetValue(dhxGridMhshrb000, rId, 'nltyCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "bcncscaleSe", gf_DhxGetValue(dhxGridMhshrb000, rId, 'bcncscaleSe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "taxtSe", gf_DhxGetValue(dhxGridMhshrb000, rId, 'taxtSe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "crncyCode", gf_DhxGetValue(dhxGridMhshrb000, rId, 'crncyCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "bankCode", gf_DhxGetValue(dhxGridMhshrb000, rId, 'bankCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "areaCode", gf_DhxGetValue(dhxGridMhshrb000, rId, 'areaCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "areaNm", gf_DhxGetValue(dhxGridMhshrb000, rId, 'areaNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "postCode", gf_DhxGetValue(dhxGridMhshrb000, rId, 'postCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "adres", gf_DhxGetValue(dhxGridMhshrb000, rId, 'adres',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "addr2", gf_DhxGetValue(dhxGridMhshrb000, rId, 'addr2',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "telno", gf_DhxGetValue(dhxGridMhshrb000, rId, 'telno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "faxNo", gf_DhxGetValue(dhxGridMhshrb000, rId, 'faxNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "acnutNo", gf_DhxGetValue(dhxGridMhshrb000, rId, 'acnutNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "dpstrNm", gf_DhxGetValue(dhxGridMhshrb000, rId, 'dpstrNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "homepage", gf_DhxGetValue(dhxGridMhshrb000, rId, 'homepage',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "purchsAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'purchsAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "saleofficAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'saleofficAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "bcncCn", gf_DhxGetValue(dhxGridMhshrb000, rId, 'bcncCn',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "fondDe", gf_DhxGetValue(dhxGridMhshrb000, rId, 'fondDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "capitalAmt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'capitalAmt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "yySaleAmt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'yySaleAmt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "emplCo", gf_DhxGetValue(dhxGridMhshrb000, rId, 'emplCo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "tradeNo", gf_DhxGetValue(dhxGridMhshrb000, rId, 'tradeNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "useAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'useAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "atchmnflNo", gf_DhxGetValue(dhxGridMhshrb000, rId, 'atchmnflNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "chargerNm", gf_DhxGetValue(dhxGridMhshrb000, rId, 'chargerNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "chargerEmail", gf_DhxGetValue(dhxGridMhshrb000, rId, 'chargerEmail',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "chargerTelno", gf_DhxGetValue(dhxGridMhshrb000, rId, 'chargerTelno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "chargerDept", gf_DhxGetValue(dhxGridMhshrb000, rId, 'chargerDept',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "chargerOfcps", gf_DhxGetValue(dhxGridMhshrb000, rId, 'chargerOfcps',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "priorPurchsAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'priorPurchsAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "dsrprAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'dsrprAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "womanAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'womanAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "foreignAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'foreignAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "serhandicapAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'serhandicapAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "socialentrprsAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'socialentrprsAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "dspsnStdAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'dspsnStdAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "greenAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'greenAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrb000", "technologyAt", gf_DhxGetValue(dhxGridMhshrb000, rId, 'technologyAt',  'grid'), '');

    fn_FormDisabled(false);

    if(status == 'inserted') {
        $('#saveFormMhshrb000 input[name="bcncCode"]').prop('disabled', false);
    } else {
        $('#saveFormMhshrb000 input[name="bcncCode"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhshrb000 = function() {
    $('#saveFormMhshrb000 input[name="bcncCode"]').prop('disabled', false);
    $('#saveFormMhshrb000').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhshrb000 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMhshrb000 = function() {
    dhxGridMhshrb000.clearSelection();
    fn_InitInputFormMhshrb000();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //bcncCode
    initValueArr.push(''); //bizrno
    initValueArr.push(''); //bplcCode
    initValueArr.push(''); //bcncNm
    initValueArr.push(''); //reprsntNm
    initValueArr.push(''); //induty
    initValueArr.push(''); //bizcnd
    initValueArr.push(''); //bcncSe
    initValueArr.push(''); //cprSe
    initValueArr.push(''); //nltyCode
    initValueArr.push(''); //bcncscaleSe
    initValueArr.push(''); //taxtSe
    initValueArr.push(''); //crncyCode
    initValueArr.push(''); //bankCode
    initValueArr.push(''); //areaCode
    initValueArr.push(''); //areaNm
    initValueArr.push(''); //postCode
    initValueArr.push(''); //adres
    initValueArr.push(''); //addr2
    initValueArr.push(''); //telno
    initValueArr.push(''); //faxNo
    initValueArr.push(''); //acnutNo
    initValueArr.push(''); //dpstrNm
    initValueArr.push(''); //homepage
    initValueArr.push(''); //purchsAt
    initValueArr.push(''); //saleofficAt
    initValueArr.push(''); //bcncCn
    initValueArr.push(''); //fondDe
    initValueArr.push(''); //capitalAmt
    initValueArr.push(''); //yySaleAmt
    initValueArr.push(''); //emplCo
    initValueArr.push(''); //tradeNo
    initValueArr.push(''); //useAt
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //chargerNm
    initValueArr.push(''); //chargerEmail
    initValueArr.push(''); //chargerTelno
    initValueArr.push(''); //chargerDept
    initValueArr.push(''); //chargerOfcps
    initValueArr.push(''); //priorPurchsAt
    initValueArr.push(''); //dsrprAt
    initValueArr.push(''); //womanAt
    initValueArr.push(''); //foreignAt
    initValueArr.push(''); //serhandicapAt
    initValueArr.push(''); //socialentrprsAt
    initValueArr.push(''); //dspsnStdAt
    initValueArr.push(''); //greenAt
    initValueArr.push(''); //technologyAt
    dhxGridMhshrb000.addRow(dhxGridMhshrb000.uid(), initValueArr, 0);
    dhxGridMhshrb000.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrb000');
    $('#btnPopEmpSearchMhshrb000').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrb000SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrb000, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrb000', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrb000', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrb000, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrb000.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrb000', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrb000', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrb000, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrb000.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrb000', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrb000', 'sortColumId', '', 'text'); 
            dhxGridMhshrb000.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrb000.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrb000', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrb000', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrb000, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrb000 = function() {
    var edCnt = 0;
    dhxGridMhshrb000.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrb000.getState(rowId))) {
            edCnt++;
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        gf_DivMsgConfirm(gv_QueSave, 'fn_SaveMhshrb000_Send()', '');
    }
}
var fn_SaveMhshrb000_Send = function() {
    if(fn_GridValidation(dhxGridMhshrb000, dhxDataProcessorMhshrb000)) {
        dhxDataProcessorMhshrb000.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrb000 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrb000, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrb000.forEachRow(function(rowId) {
            state = dhxDataProcessorMhshrb000.getState(rowId);
            if(dhxGridMhshrb000.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrb000, 'chk')).isChecked()){
                if(state == 'inserted') dhxGridMhshrb000.deleteRow(rowId);
                else dhxDataProcessorMhshrb000.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrb000 = function () {
    var titMhshrb000 = '인사탭'; /* gf_LocaleTrans('default', 'titMhshrb000') */
    var jsonParameter = {
        bcncCode : gf_FormGetValue('searchFormMhshrb000', 'bcncCode', 'text')
    };
    var header = [[
        '거래처코드' /* gf_LocaleTrans('default', 'titBcncCode') */,
        '사업자등록번호' /* gf_LocaleTrans('default', 'titBizrno') */,
        '사업장구분코드 기본 자리수는 4자리' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '거래처명' /* gf_LocaleTrans('default', 'titBcncNm') */,
        '대표자명' /* gf_LocaleTrans('default', 'titReprsntNm') */,
        '업종(종목)' /* gf_LocaleTrans('default', 'titInduty') */,
        '업태' /* gf_LocaleTrans('default', 'titBizcnd') */,
        '거래처 구분(C004)' /* gf_LocaleTrans('default', 'titBcncSe') */,
        '법인구분 (법인/개인 )C005' /* gf_LocaleTrans('default', 'titCprSe') */,
        '국적코드' /* gf_LocaleTrans('default', 'titNltyCode') */,
        '거래처규모' /* gf_LocaleTrans('default', 'titBcncscaleSe') */,
        '과세유형[과세||면세||영세]  C009' /* gf_LocaleTrans('default', 'titTaxtSe') */,
        '표준통화코드' /* gf_LocaleTrans('default', 'titCrncyCode') */,
        '은행코드(C010)' /* gf_LocaleTrans('default', 'titBankCode') */,
        '지역코드' /* gf_LocaleTrans('default', 'titAreaCode') */,
        '지역코드를 나타내는 항목.' /* gf_LocaleTrans('default', 'titAreaNm') */,
        '우편번호' /* gf_LocaleTrans('default', 'titPostCode') */,
        '거래처의 법인등록시 기재된 주소를 나타내는 항목' /* gf_LocaleTrans('default', 'titAdres') */,
        '기본주소' /* gf_LocaleTrans('default', 'titAddr2') */,
        '거래처의 대표전화 번호를 나타내는 항목' /* gf_LocaleTrans('default', 'titTelno') */,
        '거래처의 팩스번호를 나타내는 항목' /* gf_LocaleTrans('default', 'titFaxNo') */,
        '계좌번호' /* gf_LocaleTrans('default', 'titAcnutNo') */,
        '예금주명' /* gf_LocaleTrans('default', 'titDpstrNm') */,
        'HomePage' /* gf_LocaleTrans('default', 'titHomepage') */,
        '매입여부' /* gf_LocaleTrans('default', 'titPurchsAt') */,
        '매출여부' /* gf_LocaleTrans('default', 'titSaleofficAt') */,
        '거래처정보에 대해 기입하는 항목.' /* gf_LocaleTrans('default', 'titBcncCn') */,
        '거래처 설립일자 기입하는 항목.' /* gf_LocaleTrans('default', 'titFondDe') */,
        '거래처 자본금 기입하는 항목.' /* gf_LocaleTrans('default', 'titCapitalAmt') */,
        '거래처 년매출액 기입하는 항목.' /* gf_LocaleTrans('default', 'titYySaleAmt') */,
        '거래처 직원수 기입하는 항목.' /* gf_LocaleTrans('default', 'titEmplCo') */,
        '무역업등록번호' /* gf_LocaleTrans('default', 'titTradeNo') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '첨부파일번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        '담당자명' /* gf_LocaleTrans('default', 'titChargerNm') */,
        '담당자이메일' /* gf_LocaleTrans('default', 'titChargerEmail') */,
        '담당자 전화번호' /* gf_LocaleTrans('default', 'titChargerTelno') */,
        '담당자부서' /* gf_LocaleTrans('default', 'titChargerDept') */,
        '담당자 직위' /* gf_LocaleTrans('default', 'titChargerOfcps') */,
        '중소기업우선구매대상 여부' /* gf_LocaleTrans('default', 'titPriorPurchsAt') */,
        '장애인기업여부' /* gf_LocaleTrans('default', 'titDsrprAt') */,
        '여성대표기업여부' /* gf_LocaleTrans('default', 'titWomanAt') */,
        '외자기업구분' /* gf_LocaleTrans('default', 'titForeignAt') */,
        '중증장애인기업구분' /* gf_LocaleTrans('default', 'titSerhandicapAt') */,
        '사회적기업구분' /* gf_LocaleTrans('default', 'titSocialentrprsAt') */,
        '장애인표준사업장' /* gf_LocaleTrans('default', 'titDspsnStdAt') */,
        '녹색제품' /* gf_LocaleTrans('default', 'titGreenAt') */,
        '기술개발제품' /* gf_LocaleTrans('default', 'titTechnologyAt') */
    ]];
    var dataId = [[ 'bcncCode', 'bizrno', 'bplcCode', 'bcncNm', 'reprsntNm', 'induty', 'bizcnd', 'bcncSe', 'cprSe', 'nltyCode', 'bcncscaleSe', 'taxtSe', 'crncyCode', 'bankCode', 'areaCode', 'areaNm', 'postCode', 'adres', 'addr2', 'telno', 'faxNo', 'acnutNo', 'dpstrNm', 'homepage', 'purchsAt', 'saleofficAt', 'bcncCn', 'fondDe', 'capitalAmt', 'yySaleAmt', 'emplCo', 'tradeNo', 'useAt', 'atchmnflNo', 'chargerNm', 'chargerEmail', 'chargerTelno', 'chargerDept', 'chargerOfcps', 'priorPurchsAt', 'dsrprAt', 'womanAt', 'foreignAt', 'serhandicapAt', 'socialentrprsAt', 'dspsnStdAt', 'greenAt', 'technologyAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrb000 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrb000;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb000/excelMhshrb000', jsonParameter);
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
    $('#saveFormMhshrb000 #bcncCodeSaveFormMhshrb000').parent().append(
    '<div class="error" id="bcncCodeSaveFormMhshrb000-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrb000 = function(bcncCode){
    if(!gf_IsNull(bcncCode)) {
        var jsonParameter = {
            bcncCode : bcncCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrb000/findMhshrb000', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.bcncCode)) {
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
    var state = dhxDataProcessorMhshrb000.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhshrb000').validate().form()){
                if(state == 'inserted') {
                    var bcncCode = gf_FormGetValue('saveFormMhshrb000', 'bcncCode', 'text');
                    if(fn_CheckDupMhshrb000(bcncCode)) return true;
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
    var checkBcncCode;
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'bcncCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bcncCode');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkBcncCode = gf_DhxGetValue(dhxGridObjet, rowId, 'bcncCode', 'grid');
                    if(!gf_IsNull(checkBcncCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var bcncCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'bcncCode', 'grid');
                            if(((bcncCode == checkBcncCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bcncCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrb000( checkBcncCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bcncCode');
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
        dhxGridMhshrb000.selectRowById(validFalseFistRowId);
        fn_FindMhshrb000();
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
