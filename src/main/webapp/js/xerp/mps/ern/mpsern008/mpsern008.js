/**
 *    프로그램       : 소득자별소득현황 관리 화면 javascript
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
var save_Row_Num_Mpsern008 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsern008 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsern008 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsern008 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsern008 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsern008 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsern008 = 0;  //그리드 삭제 수량 
var dhxGridMpsern008;  //그리드 객체
var eventIdMpsern008 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMpsern008;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsern008();
    if(cf_SetComponentsMpsern008()){
       cf_SetEventListenerMpsern008();
       cf_InitFormMpsern008();
       cf_SetBindingMpsern008();
       
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
	$('#applcYyStMpsern008').val(gv_ComPreMonYyyy + "-" + gv_ComPreMonMm);
	$('#applcYyEnMpsern008').val(gv_CurYymm);
    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-10;
	
    var options = {
            startYear: startYear,
            finalYear: currentYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };
    
    $('#applcYyStMpsern008').monthpicker(options);
    $('#applcYyEnMpsern008').monthpicker(options);
  
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
var cf_InitParamMpsern008 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsern008").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboSearchincomeKindCode', 'incomeKindCode', 'incomeKindCode', 'search', 'C046', '' , '', '', 'ordr', '');//결재구분
    
    $("#earnerNm").focus();
};

var cf_SetComponentsMpsern008 = function() {
    var dhxGridMpsern008HeaderInfo = [];
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('귀속년월', '60', 'center', 'str', 'ro', false, 'pymntYm', '', '')); /* gf_LocaleTrans('default', 'titPymntYm') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('지급일자', '100', 'center', 'str', 'ro', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titPymntDe') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('증빙번호', '0', 'left', 'str', 'ro', true, 'evidSn', '', '')); /* gf_LocaleTrans('default', 'titEvidSn') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '0', 'right', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('소득자번호', '80', 'center', 'str', 'ro', false, 'earnerNo', '', '')); /* gf_LocaleTrans('default', 'titEarnerNo') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('소득자구분', '100', 'center', 'str', 'coro', false, 'incomeKindCode', '', '')); /* gf_LocaleTrans('default', 'titIncomeKindCode') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('소득자성명', '*', 'center', 'str', 'ro', false, 'earnerNm', '', '')); /* gf_LocaleTrans('default', 'titPymntYm') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('결의 번호', '0', 'left', 'str', 'ro', true, 'attrNo', '', '')); /* gf_LocaleTrans('default', 'titAttrNo') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('지급금액', '100', 'right', 'int', 'edn', false, 'pymntAmt', '', '')); /* gf_LocaleTrans('default', 'titPymntAmt') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('필요세율', '80', 'right', 'int', 'edn', false, 'needRate', '', '')); /* gf_LocaleTrans('default', 'titNeedRate') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('필요경비', '100', 'right', 'int', 'edn', false, 'needExpens', '', '')); /* gf_LocaleTrans('default', 'titNeedExpens') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('소득금액', '100', 'right', 'int', 'edn', false, 'incomeAmt', '', '')); /* gf_LocaleTrans('default', 'titIncomeAmt') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('소득세율', '80', 'right', 'int', 'edn', false, 'incmtaxRt', '', '')); /* gf_LocaleTrans('default', 'titIncmtaxRt') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('소득세', '100', 'right', 'int', 'edn', false, 'incmtax', '', '')); /* gf_LocaleTrans('default', 'titIncmtax') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('주민세', '100', 'right', 'int', 'edn', false, 'residenttax', '', '')); /* gf_LocaleTrans('default', 'titResidenttax') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('공제합계', '80', 'right', 'int', 'edn', false, 'totalTax', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('법인세', '0', 'right', 'int', 'edn', true, 'cprtax', '', '')); /* gf_LocaleTrans('default', 'titCprtax') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('농특세', '0', 'right', 'int', 'edn', true, 'agsptax', '', '')); /* gf_LocaleTrans('default', 'titAgsptax') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('실제지급금액', '100', 'right', 'int', 'edn', false, 'realPymntAmt', '', '')); /* gf_LocaleTrans('default', 'titRealPymntAmt') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('지급사유내용', '0', 'left', 'str', 'ro', true, 'pymntResnCn', '', '')); /* gf_LocaleTrans('default', 'titPymntResnCn') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('소득시작일자', '0', 'left', 'str', 'ro', true, 'incomeSdt', '', '')); /* gf_LocaleTrans('default', 'titIncomeSdt') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('소득종료일자', '0', 'left', 'str', 'ro', true, 'incomeEdt', '', '')); /* gf_LocaleTrans('default', 'titIncomeEdt') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('은행명', '100', 'center', 'str', 'coro', false, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('예금주명', '80', 'center', 'str', 'ro', false, 'dpstrnm', '', '')); /* gf_LocaleTrans('default', 'titDpstrnm') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '160', 'left', 'str', 'ro', false, 'acnutNo', '', '')); /* gf_LocaleTrans('default', 'titAcnutNo') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('마감여부', '0', 'center', 'str', 'ch', true, 'closAt', '', '')); /* gf_LocaleTrans('default', 'titClosAt') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('신고여부', '0', 'center', 'str', 'ro', true, 'sttemntAt', '', '')); /* gf_LocaleTrans('default', 'titSttemntAt') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태코드', '0', 'left', 'str', 'ro', true, 'elctsctSttuscode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttuscode') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서번호', '0', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMpsern008HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '0', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMpsern008 = gf_MakeDhxGrid('dataListMpsern008', dhxGridMpsern008HeaderInfo, true, false, false);
    dhxGridMpsern008.enableAutoWidth(false);
    dhxGridMpsern008.setEditable(false);

    dhxGridMpsern008.setColumnMinWidth(100,7); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    dhxGridMpsern008.setNumberFormat("0,000", dhxGridMpsern008.getColIndexById("pymntAmt"), ".", ",");
    dhxGridMpsern008.setNumberFormat("0,000", dhxGridMpsern008.getColIndexById("needExpens"), ".", ",");
    dhxGridMpsern008.setNumberFormat("0,000", dhxGridMpsern008.getColIndexById("incomeAmt"), ".", ",");
    dhxGridMpsern008.setNumberFormat("0,000", dhxGridMpsern008.getColIndexById("incmtax"), ".", ",");
    dhxGridMpsern008.setNumberFormat("0,000", dhxGridMpsern008.getColIndexById("residenttax"), ".", ",");
    dhxGridMpsern008.setNumberFormat("0,000", dhxGridMpsern008.getColIndexById("realPymntAmt"), ".", ",");
    dhxGridMpsern008.setNumberFormat("0,000", dhxGridMpsern008.getColIndexById("totalTax"), ".", ",");
    
    // 소득자구분
    var incomeKindCodejsonParameter = {codekindCode : "C046",exceptCode :"",sortOrder :"asc" };
    var incomeKindCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', incomeKindCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpsern008, dhxGridMpsern008.getColIndexById("incomeKindCode"), incomeKindCodedataSource.data, "sel");
    
    // 은행코드
    var bankCodejsonParameter = {codekindCode : "C010",exceptCode :"",sortOrder :"asc" };
    var bankCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', bankCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpsern008, dhxGridMpsern008.getColIndexById("bankCode"), bankCodedataSource.data, "sel");
    
    // 그리드 합계 구하기 <div id='realPymnt_tot' style='text-align:right;'>0</div>
    dhxGridMpsern008.attachFooter("#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,<div style='text-align:right;'>합계</div>,#rspan," +
    		"<div id='pymnt_tot' style='text-align:right;'>0</div>,#rspan, , " +
    		"<div id='needExpens_tot' style='text-align:right;'>0</div>, ," +
    		"<div id='income_tot' style='text-align:right;'>0</div>," +
    		"<div id='residenttax_tot' style='text-align:right;'>0</div>," +
    		"<div id='txt_tot' style='text-align:right;'>0</div>, , ," +
    		"<div id='realPymnt_tot' style='text-align:right;'>0</div>," +
    		"#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan, ", ["text-align:right;"]);   // 컬럼 수량만큼 정의, 합계가 필요한 컬럼 부분에 <div>추가하고 ID 부여
    dhxGridMpsern008.attachEvent("onEditCell",calculateFooterValues);  //수정 시 자동 계산
    dhxGridMpsern008.attachEvent("onDataReady",function(){
    	calculateFooterValues();
    });
    
    return true; 
};

function calculateFooterValues(stage){
	//alert(stage);
	if(stage && stage!=2)
		return true;
	var nrQ = document.getElementById("pymnt_tot"); // 지급금액 합계
		nrQ.innerHTML = gf_NumberWithCommas(sumColumn1());
		
	var nrQ = document.getElementById("needExpens_tot"); // 소득금액 합계
		nrQ.innerHTML = gf_NumberWithCommas(sumColumn2());
		
	var nrQ = document.getElementById("income_tot"); // 소득세 합계
		nrQ.innerHTML = gf_NumberWithCommas(sumColumn3()); 

	var nrQ = document.getElementById("residenttax_tot"); // 주민세 합계
		nrQ.innerHTML = gf_NumberWithCommas(sumColumn4());
		
	var nrQ = document.getElementById("realPymnt_tot"); // 실제지급 합계 
		nrQ.innerHTML = gf_NumberWithCommas(sumColumn5());
		
	var nrQ = document.getElementById("txt_tot"); // 공제 합계
		nrQ.innerHTML = gf_NumberWithCommas(sumColumn6());
	return true;
}
function sumColumn1(){
	var out = 0;
	for(var i = 0; i < dhxGridMpsern008.getRowsNum(); i++){
		out+= parseFloat(dhxGridMpsern008.cells2(i,9).getValue())
	}
	return out;
}
function sumColumn2(){
	var out = 0;
	for(var i = 0; i < dhxGridMpsern008.getRowsNum(); i++){
		out+= parseFloat(dhxGridMpsern008.cells2(i,12).getValue())
	}
	return out;
}
function sumColumn3(){
	var out = 0;
	for(var i = 0; i < dhxGridMpsern008.getRowsNum(); i++){
		out+= parseFloat(dhxGridMpsern008.cells2(i,14).getValue())
	}
	return out;
}
function sumColumn4(){
	var out = 0;
	for(var i = 0; i < dhxGridMpsern008.getRowsNum(); i++){
		out+= parseFloat(dhxGridMpsern008.cells2(i,15).getValue())
	}
	return out;
}
function sumColumn5(){
	var out = 0;
	for(var i = 0; i < dhxGridMpsern008.getRowsNum(); i++){
		out+= parseFloat(dhxGridMpsern008.cells2(i,19).getValue())
	}
	return out;
}
function sumColumn6(){
	var out = 0;
	for(var i = 0; i < dhxGridMpsern008.getRowsNum(); i++){
		out+= parseFloat(dhxGridMpsern008.cells2(i,16).getValue())
	}
	return out;
}


var cf_SetEventListenerMpsern008 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsern008 = gf_GridDetachEvent(dhxGridMpsern008, eventIdMpsern008);
    eventId = dhxGridMpsern008.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsern008();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsern008.getColumnsNum();
            var rowNum = dhxGridMpsern008.getRowsNum();
            var selectedId = dhxGridMpsern008.getSelectedRowId();
            var ind        = dhxGridMpsern008.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsern008.getRowIndex(selectedId);
            var type       = dhxGridMpsern008.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsern008.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsern008.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsern008.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsern008.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsern008.getSelectedRowId();
            var ind        = dhxGridMpsern008.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsern008.getRowIndex(selectedId);
            var type       = dhxGridMpsern008.getColType(ind);
            dhxGridMpsern008.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsern008.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsern008.getSelectedRowId();
            var ind        = dhxGridMpsern008.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsern008.getRowIndex(selectedId);
            var type       = dhxGridMpsern008.getColType(ind);
            dhxGridMpsern008.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsern008.editCell();
            }
        }
        else return true;
    });
    eventIdMpsern008.push(eventId);
    eventId = dhxGridMpsern008.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsern008SortGridList(ind, type, direction); 
    });
    eventIdMpsern008.push(eventId);
    eventId = dhxGridMpsern008.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsern008.push(eventId);
    eventId = dhxGridMpsern008.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpsern008.push(eventId);
    eventId = dhxGridMpsern008.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpsern008.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsern008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsern008()
    });
    $('#btnSaveMpsern008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsern008();
    });
    $('#btnRemoveMpsern008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsern008();
    });
    $('#btnExcelMpsern008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsern008();
    });
    $('#btnSearchMpsern008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsern008('');
    });
    $('#btnResetMpsern008').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsern008();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMpsern008 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpsern008').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsern008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMpsern008 = function() {
    $('#searchFormMpsern008').resetForm();
};

var cf_SetBindingMpsern008 = function() {
    fn_SearchMpsern008('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsern008 = function(userId) {
	
	var applcYySt = gf_FormGetValue('searchFormMpsern008', 'applcYySt', 'text');
    var applcYyEn = gf_FormGetValue('searchFormMpsern008', 'applcYyEn', 'text');
    if(applcYySt > applcYyEn){
    	gf_DivMsgAlert("날짜를 다시 선택해 주세요.");
    	return false;
    }
    
    var jsonParameter = {
    		applcYySt : gf_FormGetValue('searchFormMpsern008', 'applcYySt', 'text'),
    		applcYyEn : gf_FormGetValue('searchFormMpsern008', 'applcYyEn', 'text'),
    		incomeKindCode : gf_FormGetValue('searchFormMpsern008', 'incomeKindCode', 'combo'),
    		earnerNm : gf_FormGetValue('searchFormMpsern008', 'earnerNm', 'text')
    };
    gf_Transaction(userId, 'mpsern008/searchMpsern008', jsonParameter, 'fn_CallbackSearchMpsern008', false, 'GET');
};

var fn_CallbackSearchMpsern008 = function(strSvcID, targetID, data) {
    //dhxGridMpsern008.clearAll();
    dhxGridMpsern008.destructor();
    if(cf_SetComponentsMpsern008()){ 
        fn_DhxDataProcessorMpsern008(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsern008');
            dhxGridMpsern008.parse(data.data.records, 'js');
            
            if(save_Row_Ids_Mpsern008 == 0 && save_All_Sta_Mpsern008 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpsern008.selectRow(0); 
            } else if(save_Row_Sta_Mpsern008 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpsern008.selectRow(0);
            } else if(save_All_Sta_Mpsern008 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpsern008.selectRow(save_Row_Num_Mpsern008); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpsern008.selectRow(save_Row_Num_Mpsern008);   //개발자 수정 필요  
                //var findCell = dhxGridMpsern008.findCell(save_Row_Ids_Mpsern008, gf_GetDhxGridColumId(dhxGridMpsern008,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpsern008.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpsern008.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsern008');
        }
        $("#spanCntSearchFormMpsern008").text(data.data.records.length);
        cf_SetEventListenerMpsern008();
    } 
};
var fn_DhxDataProcessorMpsern008 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsern008 = new dataProcessor(gv_ContextPath+'/mpsern008/saveMpsern008'); //lock feed url
    dhxDataProcessorMpsern008.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsern008.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsern008.init(dhxGridMpsern008); //link dataprocessor to the grid
    dhxDataProcessorMpsern008.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsern008.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsern008.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsern008();
                    $("#checkAllMpsern008").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMpsern008 = function() {
    dhxGridMpsern008.clearSelection();
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
    dhxGridMpsern008.addRow(dhxGridMpsern008.uid(), initValueArr, 0);
    dhxGridMpsern008.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsern008');
    $('#btnPopEmpSearchMpsern008').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsern008SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsern008, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsern008', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsern008', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsern008, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsern008.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsern008', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsern008', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsern008, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsern008.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsern008', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsern008', 'sortColumId', '', 'text'); 
            dhxGridMpsern008.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsern008.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsern008', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsern008', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsern008, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsern008 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpsern008 = 0; 
    save_Edt_Cnt_Mpsern008 = 0; 
    save_Del_Cnt_Mpsern008 = 0; 
    dhxGridMpsern008.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsern008.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpsern008.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsern008 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsern008 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsern008 += 1; 
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
        save_All_Sta_Mpsern008 = 0; 
        if(save_Add_Cnt_Mpsern008 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsern008 + "건";
            save_All_Sta_Mpsern008 = 1; 
        } 
        if(save_Edt_Cnt_Mpsern008 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsern008 + "건"; 
        } 
        if(save_Del_Cnt_Mpsern008 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsern008 + "건"; 
            save_All_Sta_Mpsern008 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsern008(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsern008(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpsern008 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsern008_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsern008_Send = function() {
    if(fn_GridValidation(dhxGridMpsern008, dhxDataProcessorMpsern008)) {
        dhxDataProcessorMpsern008.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpsern008 = function() {
    var rowId = dhxGridMpsern008.getSelectedRowId();
    var state = dhxDataProcessorMpsern008.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMpsern008.getRowIndex(rowId);
        dhxGridMpsern008.deleteRow(rowId);
        dhxGridMpsern008.selectRow(rowNum);
    }
    else dhxDataProcessorMpsern008.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsern008 = function () {
    var titMpsern008 = '소득자별소득현황'; /* gf_LocaleTrans('default', 'titMpsern008') */
    var jsonParameter = {
        evidSn : gf_FormGetValue('searchFormMpsern008', 'evidSn', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormMpsern008', 'elctsctSeSn', 'text')
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
    var sheetNm = [[ titMpsern008 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsern008;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsern008/excelMpsern008', jsonParameter);
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
    $('#saveFormMpsern008 #evidSnSaveFormMpsern008').parent().append(
    '<div class="error" id="evidSnSaveFormMpsern008-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsern008 #elctsctSeSnSaveFormMpsern008').parent().append(
    '<div class="error" id="elctsctSeSnSaveFormMpsern008-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsern008 = function(evidSn, elctsctSeSn){
    if(!gf_IsNull(evidSn) && !gf_IsNull(elctsctSeSn)) {
        var jsonParameter = {
            evidSn : evidSn,
            elctsctSeSn : elctsctSeSn
        };
        var dataSource = gf_NoAsyncTransaction('mpsern008/findMpsern008', jsonParameter, 'GET');
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
    save_Row_Sta_Mpsern008 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpsern008 = 0;
        save_Row_Ids_Mpsern008 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpsern008 = rowNum;
        save_Row_Ids_Mpsern008 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsern008 = rowNum;
        save_Row_Ids_Mpsern008 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                        if(!fn_CheckDupMpsern008( checkEvidSn, checkElctsctSeSn )){
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
        dhxGridMpsern008.selectRowById(validFalseFistRowId);
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
