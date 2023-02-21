/**
 *    프로그램       : 소득자별원천징수영수증 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.18
 *    사용테이블      : MFS_WHTAX_PYMNT
 * sourceGen version : 2020.07.16.01 (2020.08.18)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsern009 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsern009 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsern009 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsern009 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsern009 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsern009 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsern009 = 0;  //그리드 삭제 수량 
var dhxGridMpsern009;  //그리드 객체
var eventIdMpsern009 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMpsern009;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsern009();
    if(cf_SetComponentsMpsern009()){
       cf_SetEventListenerMpsern009();
       cf_InitFormMpsern009();
       cf_SetBindingMpsern009();
       if(init()){   // 초기화
    	   init3();  // 일반달력 초기화
        }
       }
});
function init(){
   	//금일 조회
	    var today = new Date();
	    nowDate = dateFormat(today);
	    return(nowDate);
}

function init3(){
	$('#applcYyStMpsern009').val(gv_ComPreMonYyyy + "-" + gv_ComPreMonMm);
	$('#applcYyEnMpsern009').val(gv_CurYymm);
    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-10;
	
    var options = {
            startYear: startYear,
            finalYear: currentYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };
    
    $('#applcYyStMpsern009').monthpicker(options);
    $('#applcYyEnMpsern009').monthpicker(options);
  
}
//금일 조회
var today = new Date();
nowDate = dateFormat(today);

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

/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsern009 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsern009").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboSearchincomeKindCode', 'incomeKindCode', 'incomeKindCode', 'search', 'C046', '' , '', '', 'ordr', '');//결재구분
    
    $("#earnerNm").focus();
};

var cf_SetComponentsMpsern009 = function() {
    var dhxGridMpsern009HeaderInfo = [];
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('증빙번호', '0', 'left', 'str', 'ro', true, 'evidSn', '', '')); /* gf_LocaleTrans('default', 'titEvidSn') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '0', 'right', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('귀속년월', '100', 'center', 'str', 'ro', false, 'pymntYm', '', '')); /* gf_LocaleTrans('default', 'titPymntYm') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('지급일자', '100', 'center', 'str', 'ro', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titPymntDe') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('소득자번호', '100', 'center', 'str', 'ro', false, 'earnerNo', '', '')); /* gf_LocaleTrans('default', 'titEarnerNo') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('소득자구분', '100', 'center', 'str', 'coro', false, 'incomeKindCode', '', '')); /* gf_LocaleTrans('default', 'titIncomeKindCode') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('소득자성명', '*', 'center', 'str', 'ro', false, 'earnerNm', '', '')); /* gf_LocaleTrans('default', 'titPymntYm') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('결의 번호', '0', 'left', 'str', 'ro', true, 'attrNo', '', '')); /* gf_LocaleTrans('default', 'titAttrNo') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('지급금액', '120', 'right', 'int', 'edn', false, 'pymntAmt', '', '')); /* gf_LocaleTrans('default', 'titPymntAmt') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('필요세율', '120', 'right', 'int', 'edn', false, 'needRate', '', '')); /* gf_LocaleTrans('default', 'titNeedRate') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('필요경비', '120', 'right', 'int', 'edn', false, 'needExpens', '', '')); /* gf_LocaleTrans('default', 'titNeedExpens') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('소득금액', '120', 'right', 'int', 'edn', false, 'incomeAmt', '', '')); /* gf_LocaleTrans('default', 'titIncomeAmt') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('소득세율', '100', 'right', 'int', 'edn', false, 'incmtaxRt', '', '')); /* gf_LocaleTrans('default', 'titIncmtaxRt') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('소득세', '120', 'right', 'int', 'edn', false, 'incmtax', '', '')); /* gf_LocaleTrans('default', 'titIncmtax') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('주민세', '120', 'right', 'int', 'edn', false, 'residenttax', '', '')); /* gf_LocaleTrans('default', 'titResidenttax') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('공제합계', '120', 'right', 'int', 'edn', false, 'totalTax', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('법인세', '0', 'right', 'int', 'ro', true, 'cprtax', '', '')); /* gf_LocaleTrans('default', 'titCprtax') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('농특세', '0', 'right', 'int', 'ro', true, 'agsptax', '', '')); /* gf_LocaleTrans('default', 'titAgsptax') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('실제지급금액', '120', 'right', 'int', 'edn', false, 'realPymntAmt', '', '')); /* gf_LocaleTrans('default', 'titRealPymntAmt') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('지급사유내용', '0', 'left', 'str', 'ro', true, 'pymntResnCn', '', '')); /* gf_LocaleTrans('default', 'titPymntResnCn') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('소득시작일자', '0', 'left', 'str', 'ro', true, 'incomeSdt', '', '')); /* gf_LocaleTrans('default', 'titIncomeSdt') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('소득종료일자', '0', 'left', 'str', 'ro', true, 'incomeEdt', '', '')); /* gf_LocaleTrans('default', 'titIncomeEdt') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '0', 'left', 'str', 'ro', true, 'acnutNo', '', '')); /* gf_LocaleTrans('default', 'titAcnutNo') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('은행코드', '0', 'center', 'str', 'ro', true, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('예금주명', '0', 'left', 'str', 'ro', true, 'dpstrnm', '', '')); /* gf_LocaleTrans('default', 'titDpstrnm') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('마감여부', '0', 'center', 'str', 'ro', true, 'closAt', '', '')); /* gf_LocaleTrans('default', 'titClosAt') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('신고여부', '0', 'center', 'str', 'ro', true, 'sttemntAt', '', '')); /* gf_LocaleTrans('default', 'titSttemntAt') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태코드', '0', 'left', 'str', 'ro', true, 'elctsctSttuscode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttuscode') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서번호', '0', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMpsern009HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '0', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMpsern009 = gf_MakeDhxGrid('dataListMpsern009', dhxGridMpsern009HeaderInfo, true, false, false);
    dhxGridMpsern009.enableAutoWidth(false);
    dhxGridMpsern009.setEditable(true);

    dhxGridMpsern009.setColumnMinWidth(40,7); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    dhxGridMpsern009.setNumberFormat("0,000", dhxGridMpsern009.getColIndexById("pymntAmt"), ".", ",");
    dhxGridMpsern009.setNumberFormat("0,000", dhxGridMpsern009.getColIndexById("needExpens"), ".", ",");
    dhxGridMpsern009.setNumberFormat("0,000", dhxGridMpsern009.getColIndexById("incomeAmt"), ".", ",");
    dhxGridMpsern009.setNumberFormat("0,000", dhxGridMpsern009.getColIndexById("incmtax"), ".", ",");
    dhxGridMpsern009.setNumberFormat("0,000", dhxGridMpsern009.getColIndexById("residenttax"), ".", ",");
    dhxGridMpsern009.setNumberFormat("0,000", dhxGridMpsern009.getColIndexById("realPymntAmt"), ".", ",");
    dhxGridMpsern009.setNumberFormat("0,000", dhxGridMpsern009.getColIndexById("totalTax"), ".", ",");
    
    // 소득자구분
    var incomeKindCodejsonParameter = {codekindCode : "C046",exceptCode :"",sortOrder :"asc" };
    var incomeKindCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', incomeKindCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpsern009, dhxGridMpsern009.getColIndexById("incomeKindCode"), incomeKindCodedataSource.data, "sel");
    
    return true; 
};

var cf_SetEventListenerMpsern009 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsern009 = gf_GridDetachEvent(dhxGridMpsern009, eventIdMpsern009);
    eventId = dhxGridMpsern009.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsern009();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsern009.getColumnsNum();
            var rowNum = dhxGridMpsern009.getRowsNum();
            var selectedId = dhxGridMpsern009.getSelectedRowId();
            var ind        = dhxGridMpsern009.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsern009.getRowIndex(selectedId);
            var type       = dhxGridMpsern009.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsern009.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsern009.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsern009.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsern009.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsern009.getSelectedRowId();
            var ind        = dhxGridMpsern009.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsern009.getRowIndex(selectedId);
            var type       = dhxGridMpsern009.getColType(ind);
            dhxGridMpsern009.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsern009.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsern009.getSelectedRowId();
            var ind        = dhxGridMpsern009.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsern009.getRowIndex(selectedId);
            var type       = dhxGridMpsern009.getColType(ind);
            dhxGridMpsern009.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsern009.editCell();
            }
        }
        else return true;
    });
    eventIdMpsern009.push(eventId);
    eventId = dhxGridMpsern009.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsern009SortGridList(ind, type, direction); 
    });
    eventIdMpsern009.push(eventId);
    eventId = dhxGridMpsern009.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsern009.push(eventId);
    eventId = dhxGridMpsern009.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpsern009.push(eventId);
    eventId = dhxGridMpsern009.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpsern009.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsern009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsern009()
    });
    $('#btnSaveMpsern009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsern009();
    });
    $('#btnRemoveMpsern009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsern009();
    });
    $('#btnExcelMpsern009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsern009();
    });
    $('#btnSearchMpsern009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsern009('');
    });
    $('#btnResetMpsern009').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsern009();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMpsern009 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpsern009').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsern009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMpsern009 = function() {
    $('#searchFormMpsern009').resetForm();
};

var cf_SetBindingMpsern009 = function() {
    fn_SearchMpsern009('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsern009 = function(userId) {
	
	var applcYySt = gf_FormGetValue('searchFormMpsern009', 'applcYySt', 'text');
    var applcYyEn = gf_FormGetValue('searchFormMpsern009', 'applcYyEn', 'text');
    if(applcYySt > applcYyEn){
    	gf_DivMsgAlert("날짜를 다시 선택해 주세요.");
    	return false;
    }
    
    var jsonParameter = {
    		applcYySt : gf_FormGetValue('searchFormMpsern009', 'applcYySt', 'text'),
    		applcYyEn : gf_FormGetValue('searchFormMpsern009', 'applcYyEn', 'text'),
    		incomeKindCode : gf_FormGetValue('searchFormMpsern009', 'incomeKindCode', 'combo'),
    		earnerNm : gf_FormGetValue('searchFormMpsern009', 'earnerNm', 'text')
    };
    gf_Transaction(userId, 'mpsern009/searchMpsern009', jsonParameter, 'fn_CallbackSearchMpsern009', false, 'GET');
};

var fn_CallbackSearchMpsern009 = function(strSvcID, targetID, data) {
    //dhxGridMpsern009.clearAll();
    dhxGridMpsern009.destructor();
    if(cf_SetComponentsMpsern009()){ 
        fn_DhxDataProcessorMpsern009(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsern009');
            dhxGridMpsern009.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Mpsern009 == 0 && save_All_Sta_Mpsern009 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpsern009.selectRow(0); 
            } else if(save_Row_Sta_Mpsern009 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpsern009.selectRow(0);
            } else if(save_All_Sta_Mpsern009 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpsern009.selectRow(save_Row_Num_Mpsern009); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpsern009.selectRow(save_Row_Num_Mpsern009);   //개발자 수정 필요  
                //var findCell = dhxGridMpsern009.findCell(save_Row_Ids_Mpsern009, gf_GetDhxGridColumId(dhxGridMpsern009,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpsern009.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpsern009.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsern009');
        }
        $("#spanCntSearchFormMpsern009").text(data.data.records.length);
        cf_SetEventListenerMpsern009();
    } 
};
var fn_DhxDataProcessorMpsern009 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsern009 = new dataProcessor(gv_ContextPath+'/mpsern009/saveMpsern009'); //lock feed url
    dhxDataProcessorMpsern009.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsern009.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsern009.init(dhxGridMpsern009); //link dataprocessor to the grid
    dhxDataProcessorMpsern009.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsern009.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsern009.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsern009();
                    $("#checkAllMpsern009").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMpsern009 = function() {
    dhxGridMpsern009.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //evidSn
    initValueArr.push(''); //elctsctSeSn
    initValueArr.push(''); //earnerNo
    initValueArr.push(''); //pymntYm
    initValueArr.push(''); //attrNo
    initValueArr.push(''); //incomeKindCode
    initValueArr.push(''); //pymntAmt
    initValueArr.push(''); //needRate
    initValueArr.push(''); //needExpens
    initValueArr.push(''); //incomeAmt
    initValueArr.push(''); //incmtaxRt
    initValueArr.push(''); //incmtax
    initValueArr.push(''); //residenttax
    initValueArr.push(''); //cprtax
    initValueArr.push(''); //agsptax
    initValueArr.push(''); //realPymntAmt
    initValueArr.push(''); //pymntDe
    initValueArr.push(''); //pymntResnCn
    initValueArr.push(''); //incomeSdt
    initValueArr.push(''); //incomeEdt
    initValueArr.push(''); //acnutNo
    initValueArr.push(''); //bankCode
    initValueArr.push(''); //dpstrnm
    initValueArr.push(''); //closAt
    initValueArr.push(''); //sttemntAt
    initValueArr.push(''); //elctsctSttuscode
    initValueArr.push(''); //elctsctDocNo
    initValueArr.push(''); //elctsctEmpno
    dhxGridMpsern009.addRow(dhxGridMpsern009.uid(), initValueArr, 0);
    dhxGridMpsern009.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsern009');
    $('#btnPopEmpSearchMpsern009').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsern009SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsern009, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsern009', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsern009', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsern009, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsern009.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsern009', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsern009', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsern009, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsern009.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsern009', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsern009', 'sortColumId', '', 'text'); 
            dhxGridMpsern009.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsern009.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsern009', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsern009', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsern009, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsern009 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpsern009 = 0; 
    save_Edt_Cnt_Mpsern009 = 0; 
    save_Del_Cnt_Mpsern009 = 0; 
    dhxGridMpsern009.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsern009.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpsern009.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsern009 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsern009 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsern009 += 1; 
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
        save_All_Sta_Mpsern009 = 0; 
        if(save_Add_Cnt_Mpsern009 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsern009 + "건";
            save_All_Sta_Mpsern009 = 1; 
        } 
        if(save_Edt_Cnt_Mpsern009 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsern009 + "건"; 
        } 
        if(save_Del_Cnt_Mpsern009 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsern009 + "건"; 
            save_All_Sta_Mpsern009 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsern009(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsern009(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpsern009 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsern009_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsern009_Send = function() {
    if(fn_GridValidation(dhxGridMpsern009, dhxDataProcessorMpsern009)) {
        dhxDataProcessorMpsern009.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpsern009 = function() {
    var rowId = dhxGridMpsern009.getSelectedRowId();
    var state = dhxDataProcessorMpsern009.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMpsern009.getRowIndex(rowId);
        dhxGridMpsern009.deleteRow(rowId);
        dhxGridMpsern009.selectRow(rowNum);
    }
    else dhxDataProcessorMpsern009.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsern009 = function () {
    var titMpsern009 = '소득자별원천징수영수증'; /* gf_LocaleTrans('default', 'titMpsern009') */
    var jsonParameter = {
        evidSn : gf_FormGetValue('searchFormMpsern009', 'evidSn', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormMpsern009', 'elctsctSeSn', 'text')
    };
    var header = [[
        '증빙번호' /* gf_LocaleTrans('default', 'titEvidSn') */,
        '전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        '소득자 번호' /* gf_LocaleTrans('default', 'titEarnerNo') */,
        '지급년월' /* gf_LocaleTrans('default', 'titPymntYm') */,
        '결의 번호' /* gf_LocaleTrans('default', 'titAttrNo') */,
        '소득 종류코드' /* gf_LocaleTrans('default', 'titIncomeKindCode') */,
        '지급 금액' /* gf_LocaleTrans('default', 'titPymntAmt') */,
        '필요 세율' /* gf_LocaleTrans('default', 'titNeedRate') */,
        '필요 경비' /* gf_LocaleTrans('default', 'titNeedExpens') */,
        '소득 금액' /* gf_LocaleTrans('default', 'titIncomeAmt') */,
        '소득세 율' /* gf_LocaleTrans('default', 'titIncmtaxRt') */,
        '소득세' /* gf_LocaleTrans('default', 'titIncmtax') */,
        '주민세' /* gf_LocaleTrans('default', 'titResidenttax') */,
        '법인세' /* gf_LocaleTrans('default', 'titCprtax') */,
        '농특세' /* gf_LocaleTrans('default', 'titAgsptax') */,
        '실제지급금액' /* gf_LocaleTrans('default', 'titRealPymntAmt') */,
        '지급일자' /* gf_LocaleTrans('default', 'titPymntDe') */,
        '지급사유내용' /* gf_LocaleTrans('default', 'titPymntResnCn') */,
        '소득시작일자' /* gf_LocaleTrans('default', 'titIncomeSdt') */,
        '소득종료일자' /* gf_LocaleTrans('default', 'titIncomeEdt') */,
        '계좌번호' /* gf_LocaleTrans('default', 'titAcnutNo') */,
        '은행코드' /* gf_LocaleTrans('default', 'titBankCode') */,
        '예금주명' /* gf_LocaleTrans('default', 'titDpstrnm') */,
        '마감여부' /* gf_LocaleTrans('default', 'titClosAt') */,
        '신고여부' /* gf_LocaleTrans('default', 'titSttemntAt') */,
        '전자결재 상태코드' /* gf_LocaleTrans('default', 'titElctsctSttuscode') */,
        '전자결재 문서번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '전자결재 사원번호' /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    ]];
    var dataId = [[ 'evidSn', 'elctsctSeSn', 'earnerNo', 'pymntYm', 'attrNo', 'incomeKindCode', 'pymntAmt', 'needRate', 'needExpens', 'incomeAmt', 'incmtaxRt', 'incmtax', 'residenttax', 'cprtax', 'agsptax', 'realPymntAmt', 'pymntDe', 'pymntResnCn', 'incomeSdt', 'incomeEdt', 'acnutNo', 'bankCode', 'dpstrnm', 'closAt', 'sttemntAt', 'elctsctSttuscode', 'elctsctDocNo', 'elctsctEmpno' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsern009 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsern009;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsern009/excelMpsern009', jsonParameter);
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
    $('#saveFormMpsern009 #evidSnSaveFormMpsern009').parent().append(
    '<div class="error" id="evidSnSaveFormMpsern009-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsern009 #elctsctSeSnSaveFormMpsern009').parent().append(
    '<div class="error" id="elctsctSeSnSaveFormMpsern009-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsern009 = function(evidSn, elctsctSeSn){
    if(!gf_IsNull(evidSn) && !gf_IsNull(elctsctSeSn)) {
        var jsonParameter = {
            evidSn : evidSn,
            elctsctSeSn : elctsctSeSn
        };
        var dataSource = gf_NoAsyncTransaction('mpsern009/findMpsern009', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.evidSn) && gf_IsNull(data.elctsctSeSn)) {
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
    var checkEvidSn;
    var checkElctsctSeSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpsern009 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpsern009 = 0;
        save_Row_Ids_Mpsern009 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpsern009 = rowNum;
        save_Row_Ids_Mpsern009 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsern009 = rowNum;
        save_Row_Ids_Mpsern009 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'evidSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'evidSn');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'elctsctSeSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEvidSn = gf_DhxGetValue(dhxGridObjet, rowId, 'evidSn', 'grid');
                    checkElctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowId, 'elctsctSeSn', 'grid');
                    if(!gf_IsNull(checkEvidSn, checkElctsctSeSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var evidSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'evidSn', 'grid');
                            var elctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'elctsctSeSn', 'grid');
                            if(((evidSn == checkEvidSn) && (elctsctSeSn == checkElctsctSeSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'evidSn');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpsern009( checkEvidSn, checkElctsctSeSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'evidSn');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
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
        dhxGridMpsern009.selectRowById(validFalseFistRowId);
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
