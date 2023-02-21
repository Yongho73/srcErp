/**
 *    프로그램       : 소득지급등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.12
 *    사용테이블      : MFS_WHTAX_PYMNT
 * sourceGen version : 2020.07.16.01 (2020.08.12)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsern006 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsern006 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsern006 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsern006 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsern006 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsern006 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsern006 = 0;  //그리드 삭제 수량 
var dhxGridMpsern006;  //그리드 객체
var eventIdMpsern006 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMpsern006;  //DataProcessor 객체

var ApplcYyData; // 소득세율관리 Data 변수

/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsern006();
    if(cf_SetComponentsMpsern006()){
       cf_SetEventListenerMpsern006();
       cf_InitFormMpsern006();
       cf_SetBindingMpsern006();
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
	$('#applcYyStMpsern006').val(gv_ComPreMonYyyy + "-" + gv_ComPreMonMm);
	$('#applcYyEnMpsern006').val(gv_CurYymm);
    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-10;
	
    var options = {
            startYear: startYear,
            finalYear: currentYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };
    
    $('#applcYyStMpsern006').monthpicker(options);
    $('#applcYyEnMpsern006').monthpicker(options);
  
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
var cf_InitParamMpsern006 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsern006").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboSearchincomeKindCode', 'incomeKindCode', 'incomeKindCode', 'search', 'C046', '' , '', '', 'ordr', '');//결재구분
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
    $("#earnerNm").focus();
    
};

var cf_SetComponentsMpsern006 = function() {
    var dhxGridMpsern006HeaderInfo = [];
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsern006" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('증빙번호', '0', 'left', 'str', 'ro', true, 'evidSn', '', '')); /* gf_LocaleTrans('default', 'titEvidSn') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('전자결재순번', '0', 'left', 'str', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titEvidSn') */    
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('귀속년월', '80', 'center', 'str', 'ro', false, 'pymntYm', '', '')); /* gf_LocaleTrans('default', 'titPymntYm') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('지급일자', '*', 'center', 'str', 'dhxCalendarA', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titPymntDe') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonA',false,'datePickerButtonA',''));
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('소득자구분', '110', 'center', 'str', 'coro', false, 'incomeKindCode', '', '')); /* gf_LocaleTrans('default', 'titIncomeKindCode') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('소득자성명', '80', 'center', 'str', 'ro', false, 'earnerNm', '', '')); /* gf_LocaleTrans('default', 'titPymntYm') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('지급금액', '80', 'right', 'int', 'edn', false, 'pymntAmt', '', '')); /* gf_LocaleTrans('default', 'titPymntAmt') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('필요세율', '60', 'right', 'int', 'edn', false, 'needRate', '', '')); /* gf_LocaleTrans('default', 'titNeedRate') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('필요경비', '100', 'right', 'int', 'edn', false, 'needExpens', '', '')); /* gf_LocaleTrans('default', 'titNeedExpens') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('소득금액', '100', 'right', 'int', 'edn', false, 'incomeAmt', '', '')); /* gf_LocaleTrans('default', 'titIncomeAmt') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('소득세율', '100', 'right', 'int', 'edn', false, 'incmtaxRt', '', '')); /* gf_LocaleTrans('default', 'titIncmtaxRt') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('소득세', '100', 'right', 'int', 'edn', false, 'incmtax', '', '')); /* gf_LocaleTrans('default', 'titIncmtax') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('주민세', '100', 'right', 'int', 'edn', false, 'residenttax', '', '')); /* gf_LocaleTrans('default', 'titResidenttax') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('실제지급금액', '100', 'right', 'int', 'edn', false, 'realPymntAmt', '', '')); /* gf_LocaleTrans('default', 'titRealPymntAmt') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('은행명', '100', 'center', 'str', 'coro', false, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('예금주명', '100', 'center', 'str', 'ed', false, 'dpstrnm', '', '')); /* gf_LocaleTrans('default', 'titDpstrnm') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '200', 'left', 'str', 'edn', false, 'acnutNo', '', '')); /* gf_LocaleTrans('default', 'titAcnutNo') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('지급여부', '0', 'center', 'str', 'ch', true, 'sttemntAt', '', '')); /* gf_LocaleTrans('default', 'titClosAt') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('마감여부', '40', 'center', 'str', 'ch', false, 'closAt', '', '')); /* gf_LocaleTrans('default', 'titClosAt') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('전자결재상태코드', '0', 'center', 'str', 'ro', true, 'elctsctSttuscode', '', '')); /* gf_LocaleTrans('default', 'titClosAt') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('전자결재문서번호', '0', 'center', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titClosAt') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('전자결재사원번호', '0', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titClosAt') */
    dhxGridMpsern006HeaderInfo.push(gf_MakeDhxGridHeader('소득자번호', '0', 'center', 'str', 'ro', true, 'earnerNo', '', '')); /* gf_LocaleTrans('default', 'titClosAt') */
    dhxGridMpsern006 = gf_MakeDhxGrid('dataListMpsern006', dhxGridMpsern006HeaderInfo, true, false, false);
    dhxGridMpsern006.enableAutoWidth(false);
    dhxGridMpsern006.setEditable(true);
    dhxGridMpsern006.setDateFormat("%Y-%m-%d");

    dhxGridMpsern006.setColumnMinWidth(100,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    dhxGridMpsern006.setNumberFormat("0,000", dhxGridMpsern006.getColIndexById("pymntAmt"), ".", ",");
    dhxGridMpsern006.setNumberFormat("0,000", dhxGridMpsern006.getColIndexById("needExpens"), ".", ",");
    dhxGridMpsern006.setNumberFormat("0,000", dhxGridMpsern006.getColIndexById("incomeAmt"), ".", ",");
    dhxGridMpsern006.setNumberFormat("0,000", dhxGridMpsern006.getColIndexById("incmtax"), ".", ",");
    dhxGridMpsern006.setNumberFormat("0,000", dhxGridMpsern006.getColIndexById("residenttax"), ".", ",");
    dhxGridMpsern006.setNumberFormat("0,000", dhxGridMpsern006.getColIndexById("realPymntAmt"), ".", ",");

    // 소득자구분
    var incomeKindCodejsonParameter = {codekindCode : "C046",exceptCode :"",sortOrder :"asc" };
    var incomeKindCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', incomeKindCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpsern006, dhxGridMpsern006.getColIndexById("incomeKindCode"), incomeKindCodedataSource.data, "sel");
    
    // 은행코드
    var bankCodejsonParameter = {codekindCode : "C010",exceptCode :"",sortOrder :"asc" };
    var bankCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', bankCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpsern006, dhxGridMpsern006.getColIndexById("bankCode"), bankCodedataSource.data, "sel");
    
    return true;
};

var cf_SetEventListenerMpsern006 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsern006 = gf_GridDetachEvent(dhxGridMpsern006, eventIdMpsern006);
    eventId = dhxGridMpsern006.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsern006();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsern006.getColumnsNum();
            var rowNum = dhxGridMpsern006.getRowsNum();
            var selectedId = dhxGridMpsern006.getSelectedRowId();
            var ind        = dhxGridMpsern006.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsern006.getRowIndex(selectedId);
            var type       = dhxGridMpsern006.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsern006.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsern006.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsern006.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsern006.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsern006.getSelectedRowId();
            var ind        = dhxGridMpsern006.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsern006.getRowIndex(selectedId);
            var type       = dhxGridMpsern006.getColType(ind);
            dhxGridMpsern006.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsern006.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsern006.getSelectedRowId();
            var ind        = dhxGridMpsern006.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsern006.getRowIndex(selectedId);
            var type       = dhxGridMpsern006.getColType(ind);
            dhxGridMpsern006.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsern006.editCell();
            }
        }
        else return true;
    });
    eventIdMpsern006.push(eventId);
    eventId = dhxGridMpsern006.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsern006SortGridList(ind, type, direction); 
    });
    eventIdMpsern006.push(eventId);
    eventId = dhxGridMpsern006.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsern006.push(eventId);
    var calendarEventIds = [];
    eventId = dhxGridMpsern006.attachEvent('onRowSelect', function(rId,cInd) {
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpsern006, 'datePickerButtonA')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMpsern006, rId, 'pymntDe', 'grid');	
    		var pos = dhxGridMpsern006.getPosition(this.cell);    		
    		dhxGridMpsern006._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMpsern006._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMpsern006._grid_calendarA.setDate(strGridDate);
    		dhxGridMpsern006._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMpsern006._grid_calendarA, calendarEventIds);    		
    		eventId1 = dhxGridMpsern006._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateA( rId, dhxGridMpsern006._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId1);    		
    	}
    	if((cInd == 7)||(cInd == 8)){
    		var closAt = gf_DhxGetValue(dhxGridMpsern006, rId, 'closAt', 'grid');
    		if(closAt == 1) {
    			gf_DivMsgAlert('마감되어 수정하실수 없습니다.')
    			return false;
    		} else{
    			gf_IncomeKindPopup('','','','', gBplcCode, "N", "fn_CallbackPopComp"); 
    		}
    	}
    });
    eventIdMpsern006.push(eventId);
    eventId = dhxGridMpsern006.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	var pymntAmt = gf_DhxGetValue(dhxGridMpsern006,rId,'pymntAmt','grid'); // 지급금액 가져오기
        var needRate = gf_DhxGetValue(dhxGridMpsern006,rId,'needRate','grid'); // 필요세율 가져오기
        var incmtaxRt = gf_DhxGetValue(dhxGridMpsern006,rId,'incmtaxRt','grid'); // 소득세율 가져오기
        if(!gf_IsNull(pymntAmt)){
             gf_DhxSetValue(dhxGridMpsern006,rId,'needExpens',pymntAmt*(needRate/100),'grid'); // 필요 경비 값 계산
             var needExpens = gf_DhxGetValue(dhxGridMpsern006,rId,'needExpens','grid'); // 필요경비 계산 값 가져오기
             gf_DhxSetValue(dhxGridMpsern006,rId,'incomeAmt',pymntAmt-needExpens,'grid'); // 소득금액 계산
             var incomeAmt = gf_DhxGetValue(dhxGridMpsern006,rId,'incomeAmt','grid'); // 소득금액 계산 값 가져오기
             gf_DhxSetValue(dhxGridMpsern006,rId,'incmtax',incomeAmt*(incmtaxRt/100),'grid'); // 소득세 계산
             var incmtax = gf_DhxGetValue(dhxGridMpsern006,rId,'incmtax','grid'); // 소득세 계산 값 가져오기
             gf_DhxSetValue(dhxGridMpsern006,rId,'residenttax',incmtax/10,'grid'); // 주민세 계산
             
             var residenttax = gf_DhxGetValue(dhxGridMpsern006,rId,'residenttax','grid'); // 주민세 계산 값 가져오기
             gf_DhxSetValue(dhxGridMpsern006,rId,'realPymntAmt',pymntAmt-(Number(incmtax)+Number(residenttax)),'grid'); // 실제지급금액 
        }
        
        var closAt = gf_DhxGetValue(dhxGridMpsern006,rId,'closAt','grid'); // 지급금액 가져오기
        
        if(closAt == 1){
        	gf_DhxSetValue(dhxGridMpsern006,rId,'sttemntAt',1,'grid'); // 필요 경비 값 계산
        }else{
        	gf_DhxSetValue(dhxGridMpsern006,rId,'sttemntAt',0,'grid'); // 필요 경비 값 계산
        }

        return true;
    });
    eventIdMpsern006.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsern006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsern006()
    });
    $('#btnSaveMpsern006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        
        var rowId = dhxGridMpsern006.getSelectedRowId();
        var closAt = gf_DhxGetValue(dhxGridMpsern006, rowId, 'closAt', 'grid'); // 마감여부
        var pymntDe = gf_DhxGetValue(dhxGridMpsern006, rowId, 'pymntDe', 'grid'); // 지급일자
        if(gf_IsNull(pymntDe) && (closAt == 1)){
        	gf_DivMsgAlert('지급일자 없이 마감하실수 없습니다.');
        	return false;
        }
        fn_SaveMpsern006();
    });
    $('#btnRemoveMpsern006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsern006();
    });
    $('#btnExcelMpsern006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsern006();
    });
    $('#btnSearchMpsern006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsern006('');
    });
    $('#btnResetMpsern006').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsern006();
    });
    $('#btnAddCode').unbind("click").bind("click",function() {
        gf_errorMsgClear();
     // 체크된 항목을 가져온다
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsern006, 'chk');
		if(gf_IsNull(rowIds)){
			gf_DivMsgAlert("마감할 항목을 선택해 주세요.");
			return false;
		} else{
	        // 체크된 항목 반복문
			$(rowIds).each(function(index, rowId){
				// 선택된 값마다 해당 지급일자 Set 해준다.
				dhxGridMpsern006.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsern006, 'closAt')).setValue("1");
				// Set이 된 이후 그리드 업데이트 실행 해준다.
				dhxDataProcessorMpsern006.setUpdated(rowId, true, 'updated');
			});
			gf_DivMsgConfirm("선택한 항목 마감 하시겠습니까?", 'fn_SaveMpsern006_Send()', 'fn_Reset()');
		}
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMpsern006 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpsern006').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
 // 기타 이벤트 ==========================================================================================
    $('#checkAllMpsern006').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpsern006, $('#checkAllMpsern006').prop('checked'), 'chk');
    });
    $('#saveFormMpsern006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMpsern006 = function() {
    $('#searchFormMpsern006').resetForm();
};

var cf_SetBindingMpsern006 = function() {
    fn_SearchMpsern006();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsern006 = function(userId) {
	var applcYySt = gf_FormGetValue('searchFormMpsern006', 'applcYySt', 'text');
    var applcYyEn = gf_FormGetValue('searchFormMpsern006', 'applcYyEn', 'text');
    if(applcYySt > applcYyEn){
    	gf_DivMsgAlert("날짜를 다시 선택해 주세요.");
    	return false;
    }
    
    var jsonParameter = {
    	applcYySt : gf_FormGetValue('searchFormMpsern006', 'applcYySt', 'text'),
        applcYyEn : gf_FormGetValue('searchFormMpsern006', 'applcYyEn', 'text'),
        incomeKindCode : gf_FormGetValue('searchFormMpsern006', 'incomeKindCode', 'combo'),
        earnerNm : gf_FormGetValue('searchFormMpsern006', 'earnerNm', 'text')
    };
    gf_Transaction(userId, 'mpsern006/searchMpsern006', jsonParameter, 'fn_CallbackSearchMpsern006', false, 'GET');
    // 현재 년도를 구한다.
    var applcYy = gv_ComYear;
    // jsonparameter 로 넘긴다.
    var jsonParameterApplcYy = {
            applcYy : applcYy
        };
    // 소득세율관리 로직에 대한 값을 구한다.
    gf_Transaction('', 'mtxbsc001/searchMtxbsc001', jsonParameterApplcYy, 'fn_CallMtxbsc001', false, 'GET');
};

var fn_CallMtxbsc001 = function(strSvcID, targetID, data) {
	ApplcYyData = data.data.records;
}

var fn_CallbackSearchMpsern006 = function(strSvcID, targetID, data) {
    //dhxGridMpsern006.clearAll();
    dhxGridMpsern006.destructor();
    if(cf_SetComponentsMpsern006()){ 
        fn_DhxDataProcessorMpsern006(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsern006');
            dhxGridMpsern006.parse(data.data.records, 'js');
            
            dhxGridMpsern006.forEachRow(function(rowId) {
    			var closAt = gf_DhxGetValue(dhxGridMpsern006, rowId, 'closAt', 'grid');
    			if (closAt == 1){
    				dhxGridMpsern006.cells(rowId,1).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,3).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,4).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,5).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,6).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,7).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,8).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,9).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,10).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,11).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,12).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,13).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,14).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,15).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,16).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,17).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,18).setDisabled(true);
    				dhxGridMpsern006.cells(rowId,21).setDisabled(true);
    			}
    	    });
            if(save_Row_Ids_Mpsern006 == 0 && save_All_Sta_Mpsern006 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpsern006.selectRow(0); 
            } else if(save_Row_Sta_Mpsern006 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpsern006.selectRow(0);
            } else if(save_All_Sta_Mpsern006 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpsern006.selectRow(save_Row_Num_Mpsern006); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpsern006.selectRow(save_Row_Num_Mpsern006);   //개발자 수정 필요  
                //var findCell = dhxGridMpsern006.findCell(save_Row_Ids_Mpsern006, gf_GetDhxGridColumId(dhxGridMpsern006,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpsern006.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpsern006.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsern006');
        }
        $("#spanCntSearchFormMpsern006").text(data.data.records.length);
        cf_SetEventListenerMpsern006();
    } 
};
var fn_DhxDataProcessorMpsern006 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsern006 = new dataProcessor(gv_ContextPath+'/mpsern006/saveMpsern006'); //lock feed url
    dhxDataProcessorMpsern006.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsern006.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsern006.init(dhxGridMpsern006); //link dataprocessor to the grid
    dhxDataProcessorMpsern006.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsern006.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsern006.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    //cf_InitFormMpsern006();
                    fn_SearchMpsern006();
                    $("#checkAllMpsern006").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMpsern006 = function() {
    dhxGridMpsern006.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(gv_CurYymm); 
    initValueArr.push(gv_ComYear + "-" + gv_ComMon + "-" + gv_ComDay); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push('0'); 
    initValueArr.push(''); 
    initValueArr.push('0'); 
    initValueArr.push('0'); 
    initValueArr.push(''); 
    initValueArr.push('0'); 
    initValueArr.push('0'); 
    initValueArr.push('0'); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    dhxGridMpsern006.addRow(dhxGridMpsern006.uid(), initValueArr, 0);
    dhxGridMpsern006.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsern006');
    $('#btnPopEmpSearchMpsern006').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsern006SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsern006, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsern006', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsern006', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsern006, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsern006.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsern006', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsern006', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsern006, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsern006.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsern006', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsern006', 'sortColumId', '', 'text'); 
            dhxGridMpsern006.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsern006.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsern006', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsern006', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsern006, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsern006 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpsern006 = 0; 
    save_Edt_Cnt_Mpsern006 = 0; 
    save_Del_Cnt_Mpsern006 = 0; 
    dhxGridMpsern006.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsern006.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpsern006.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsern006 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsern006 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsern006 += 1; 
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
        save_All_Sta_Mpsern006 = 0; 
        if(save_Add_Cnt_Mpsern006 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsern006 + "건";
            save_All_Sta_Mpsern006 = 1; 
        } 
        if(save_Edt_Cnt_Mpsern006 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsern006 + "건"; 
        } 
        if(save_Del_Cnt_Mpsern006 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsern006 + "건"; 
            save_All_Sta_Mpsern006 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsern006(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsern006(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpsern006 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsern006_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsern006_Send = function() {
    if(fn_GridValidation(dhxGridMpsern006, dhxDataProcessorMpsern006)) {
        dhxDataProcessorMpsern006.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpsern006 = function() {
	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsern006, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 항목을 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpsern006.forEachRow(function(rowId) {
            state = dhxDataProcessorMpsern006.getState(rowId);
            if(dhxGridMpsern006.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsern006, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpsern006.getRowIndex(rowId);
                    dhxGridMpsern006.deleteRow(rowId);
                    dhxGridMpsern006.selectRow(rowNum);
                    //fn_FindMpsern006();
                }
                else dhxDataProcessorMpsern006.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsern006 = function () {
    var titMpsern006 = '소득지급등록'; /* gf_LocaleTrans('default', 'titMpsern006') */
    var jsonParameter = {
        evidSn : gf_FormGetValue('searchFormMpsern006', 'evidSn', 'text')
    };
    var header = [[
        '증빙번호' /* gf_LocaleTrans('default', 'titEvidSn') */,
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
        '신고여부' /* gf_LocaleTrans('default', 'titSttemntAt') */
    ]];
    var dataId = [[ 'evidSn', 'earnerNo', 'pymntYm', 'attrNo', 'incomeKindCode', 'pymntAmt', 'needRate', 'needExpens', 'incomeAmt', 'incmtaxRt', 'incmtax', 'residenttax', 'cprtax', 'agsptax', 'realPymntAmt', 'pymntDe', 'pymntResnCn', 'incomeSdt', 'incomeEdt', 'acnutNo', 'bankCode', 'dpstrnm', 'closAt', 'sttemntAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsern006 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsern006;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsern006/excelMpsern006', jsonParameter);
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
    $('#saveFormMpsern006 #evidSnSaveFormMpsern006').parent().append(
    '<div class="error" id="evidSnSaveFormMpsern006-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsern006 = function(evidSn){
    if(!gf_IsNull(evidSn)) {
        var jsonParameter = {
            evidSn : evidSn
        };
        var dataSource = gf_NoAsyncTransaction('mpsern006/findMpsern006', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.evidSn)) {
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
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpsern006 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpsern006 = 0;
        save_Row_Ids_Mpsern006 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpsern006 = rowNum;
        save_Row_Ids_Mpsern006 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsern006 = rowNum;
        save_Row_Ids_Mpsern006 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'pymntYm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntYm');
                    valid = false;
                }
            	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'pymntAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'incomeKindCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'incomeKindCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'dpstrnm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dpstrnm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'bankCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bankCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'acnutNo', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'acnutNo');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEvidSn = gf_DhxGetValue(dhxGridObjet, rowId, 'evidSn', 'grid');
                    if(!gf_IsNull(checkEvidSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var evidSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'evidSn', 'grid');
                            if(((evidSn == checkEvidSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'evidSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpsern006( checkEvidSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'evidSn');
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
        dhxGridMpsern006.selectRowById(validFalseFistRowId);
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

//달력아이콘 함수들
var eXcell_datePickerButtonA = function(cell){ //the eXcell name is defined here
  if (cell){                // the default pattern, just copy it
      this.cell = cell;
      this.grid = this.cell.parentNode.grid;
  }
  this.edit = function(){}  //read-only cell doesn't have edit method
  // the cell is read-only, so it's always in the disabled state
  this.isDisabled = function(){ return true; }
  this.setValue = function(val){
      this.setCValue("<div id=''></div><img alt='' src='/xerp/img/sub/icon_calen.png' style='cursor:pointer'>");                                      
  }
}

eXcell_datePickerButtonA.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateA = function (rId, strDate) {
	if(!gf_IsNull(strDate)){	
		gf_DhxSetValue(dhxGridMpsern006, rId, 'pymntDe', strDate.format('YYYY-MM-DD'), 'grid');
		//gf_DhxSetValue(dhxGridMpsern006, rId, 'pymntYm', strDate.format('YYYYMM'), 'grid');
		dhxDataProcessorMpsern006.setUpdated(rId, true, 'updated');
	}	
}
var fn_CallbackPopComp = function(data) {
	if(!gf_IsNull(data.earnerNo)) {
		dhxGridMpsern006.cells(dhxGridMpsern006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsern006,'incomeKindCode')).setValue(data.earnerSeCode);
		dhxGridMpsern006.cells(dhxGridMpsern006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsern006,'earnerNo')).setValue(data.earnerNo);
		dhxGridMpsern006.cells(dhxGridMpsern006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsern006,'dpstrnm')).setValue(data.dpstrNm);
		dhxGridMpsern006.cells(dhxGridMpsern006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsern006,'bankCode')).setValue(data.bankCode);
		dhxGridMpsern006.cells(dhxGridMpsern006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsern006,'acnutNo')).setValue(data.acnutNo);
		dhxGridMpsern006.cells(dhxGridMpsern006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsern006,'earnerNm')).setValue(data.earnerNm);
		
		var rowId = dhxGridMpsern006.getSelectedRowId();
		var incomeKindCode = gf_DhxGetValue(dhxGridMpsern006,rowId,'incomeKindCode','grid');
		if(incomeKindCode == 100){
            gf_DhxSetValue(dhxGridMpsern006,rowId,'needRate',0,'grid'); // 필요세율
            gf_DhxSetValue(dhxGridMpsern006,rowId,'incmtaxRt',3,'grid'); // 소득세율
       } else if (incomeKindCode == 200){
            gf_DhxSetValue(dhxGridMpsern006,rowId,'needRate',60,'grid'); // 필요세율
            gf_DhxSetValue(dhxGridMpsern006,rowId,'incmtaxRt',20,'grid'); // 소득세율
       } 
	}
};
var fn_Reset = function(){
	// 체크된 항목을 가져온다
	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsern006, 'chk');
        // 체크된 항목 반복문
		$(rowIds).each(function(index, rowId){
			// 선택된 값마다 해당 지급일자 Set 해준다.
			dhxGridMpsern006.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsern006, 'closAt')).setValue("0");
			// Set이 된 이후 그리드 업데이트 실행 해준다.
			dhxDataProcessorMpsern006.setUpdated(rowId, true, 'clear');
		});
	gf_DivMsgAlert("취소되었습니다.");
}

