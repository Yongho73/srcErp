/**
 *    프로그램       : 급여지급일자등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.13
 *    사용테이블      : MPS_PYMNTDE
 * sourceGen version : 2020.06.29.01 (2020.07.13)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsbsc006 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsbsc006 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsbsc006 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsbsc006 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsbsc006 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsbsc006 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsbsc006 = 0;  //그리드 삭제 수량

var save_Row_Num_MpsbscItem = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_MpsbscItem = 0;  //그리드 위치 상태 
var save_All_Sta_MpsbscItem = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_MpsbscItem = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_MpsbscItem = 0;  //그리드 추가 수량 
var save_Edt_Cnt_MpsbscItem = 0;  //그리드 저장 수량 
var save_Del_Cnt_MpsbscItem = 0;  //그리드 삭제 수량 
var keyDuplication = false;
var dataSalarytyCode = {};

//금일 조회
var today = new Date();
nowDate = dateFormat(today);

function init4(){
	//달력 생성  : yearpicker 사용
	//금일 날짜표시
	var today = new Date();
	nowDate = dateFormat(today);
	$('#applcYySearchFormMpsbsc006').val(nowDate.substring(0,4));

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#applcYySearchFormMpsbsc006').yearpicker({
        year: currentYear,
        startYear: startYear,
        endYear: endYear
      });
    
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
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsbsc006();
    cf_SetComponentsMpsbsc006();
    cf_SetEventListenerMpsbsc006();
    cf_InitFormMpsbsc006();
    cf_SetBindingMpsbsc006();
    gf_IframeHeightResize(true);
    init4();  // 년  달력 초기화
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc006 = function() {
    gf_SetMenuPath();
//  gf_MakeComboBasic('divComboApplcYySearchFormMpsbsc006','applcYySearchFormMpsbsc006','','width:140px','mpsbsc006/combo/searchComboYeayMpsbsc006','','key','value', gv_ComYear); //
//    gf_FormSetValue('searchFormMpsbsc006', 'applcYy', gv_ComYear, 'combo');
    var jsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"ordr" };
    var dataComCode = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); // 기존 코드조회 쿼리 사용
    
    dataComCode.data.forEach(function(sal){
    	dataSalarytyCode[sal.code] = sal.codeNm;
    });
    
  //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
};

var dhxGridMpsbsc006;
var cf_SetComponentsMpsbsc006 = function() {
	//년월
    var dhxGridMonthMpsbsc006HeaderInfo = [];
    dhxGridMonthMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('적용월', '100', 'center', 'str', 'ro', false, 'belongMm', '', '')); 
    dhxGridMonthMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('적용년', '0', 'center', 'str', 'ro', true, 'belongYy', '', '')); 
    dhxGridMonthMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ro', true, 'belongYm', '', '')); 
    dhxGridMonthMpsbsc006 = gf_MakeDhxGridP('dataListMonthMpsbsc006', dhxGridMonthMpsbsc006HeaderInfo, true, false, false);
    dhxGridMonthMpsbsc006.enableAutoWidth(false);
    
    //지급등록 
    var dhxGridMpsbsc006HeaderInfo = [];     
    dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '10', 'center', 'str', 'cntr', false, 'num', '', '')); 
    dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('기준일자', '14', 'center', 'date', 'dhxCalendarA', false, 'stddDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
	dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'4','center','str','datePickerButtonS',false,'datePickerButtonP','',''));
	dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('지급일자', '14', 'center', 'date', 'dhxCalendarA', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
	dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'4','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '10', 'center', 'str', 'ro', false, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
	dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('직종', '10', 'center', 'str', 'coro', false, 'jssfcCode', '', ''));
    dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('급여유형명', '10', 'center', 'str', 'coro', false, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titPymntDtls') */
    dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('계좌구분', '10', 'center', 'str', 'coro', false, 'acnutSeCode', '', ''));
    dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'ed', false, 'pymntDtls', '', '')); /* gf_LocaleTrans('default', 'titPymntDtls') */
    dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '', '')); 
    dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('마감여부', '0', 'center', 'str', 'ch', true, 'closAt', '', ''));
    dhxGridMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('공개여부', '0', 'center', 'str', 'ch', true, 'othbcAt', '', ''));
    dhxGridMpsbsc006 = gf_MakeDhxGridP('dataListMpsbsc006', dhxGridMpsbsc006HeaderInfo, true, false, false);
    dhxGridMpsbsc006.enableAutoWidth(false);
    dhxGridMpsbsc006.enableEditEvents(true,false,false);
    dhxGridMpsbsc006.setDateFormat("%Y-%m-%d");
    
    // 계좌구분코드
    var acnutSeCodejsonParameter = {codekindCode : "C471",exceptCode :"",sortOrder :"asc" };
    var acnutSeCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', acnutSeCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpsbsc006, dhxGridMpsbsc006.getColIndexById("acnutSeCode"), acnutSeCodedataSource.data, "sel");
    // 급여유형
    var salarytyCodejsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"asc" };
    var salarytyCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', salarytyCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpsbsc006, dhxGridMpsbsc006.getColIndexById("salarytyCode"), salarytyCodedataSource.data, "sel");
    // 직종
    var jssfcCodejsonParameter = {codekindCode : "C148",exceptCode :"",sortOrder :"asc" };
    var jssfcCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jssfcCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpsbsc006, dhxGridMpsbsc006.getColIndexById("jssfcCode"), jssfcCodedataSource.data, "sel");
    
    
    //급여항목
    var dhxGridItemMpsbsc006HeaderInfo = [];
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '10', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbscItem" />', '10', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('급여코드', '10', 'center', 'str', 'ed', false, 'salaryitemCode', '', ''));
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '0', 'center', 'str', 'ro', true, 'salarytyCodeNm', '', '')); /* gf_LocaleTrans('default', 'titPymntDe') */
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('지급', '*', 'left', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '0', 'center', 'na', 'ch', true, 'pymntAt', '', ''));     
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('급여유형명', '0', 'center', 'str', 'ed', true, 'salarytyCode', '', '')); 
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ed', true, 'applcYm', '', '')); 
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ed', true, 'pymntSn', '', ''));
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbscItem2" />', '10', 'center', 'na', 'ch', false, 'ch2', '', ''));
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('급여코드', '10', 'center', 'str', 'ro', false, 'salaryitemCode2', '', '')); /* gf_LocaleTrans('default', 'titPymntDe') */
    dhxGridItemMpsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('공제', '25', 'left', 'str', 'ro', false, 'salaryitemNm2', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
    dhxGridItemMpsbsc006 = gf_MakeDhxGridP('dataListItemMpsbsc006', dhxGridItemMpsbsc006HeaderInfo, true, false, false);
    
    dhxGridItemMpsbsc006.enableAutoWidth(false);

    //dhxGridMpsbsc006.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
};
var eventIdsFst = [];
var eventIdsSec = [];
var calendarEventIds = [];

var previousRowIdMonth;
var previousRowIdType;

var cf_SetEventListenerMpsbsc006 = function() {
    var eventId;
    var eventId1;
    var eventId2;
    
    eventIdsFst = gf_GridDetachEvent(dhxGridMonthMpsbsc006, eventIdsFst);
    eventIdsSec = gf_GridDetachEvent(dhxGridMpsbsc006, eventIdsSec);
    
    eventId = dhxGridMonthMpsbsc006.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        fn_FindMpsbsc006();
    });
    eventIdsFst.push(eventId);

    eventId2 = dhxGridMpsbsc006.attachEvent('onRowSelect', function(rId,cInd) {
    	if(previousRowIdType==rId){
    		return false;
    	} else {
    		var isUpdated;
    		dhxGridMpsbsc006.forEachRow(function(rowId) {	
    			if(!gf_IsNull(dhxDataProcessor2.getState(rowId))) {
    				isUpdated = true;
    				return false;
    			}
    		});
    		if(isUpdated)
	    		gf_DivMsgConfirm('행을 변경하면 초기화 됩니다.', 
				function(){ previousRowIdType = rId; fn_FindMpsbsc006();},
				function(){ dhxGridMpsbsc006.selectRowById(previousRowIdType);});
    		else {
    			previousRowIdType = rId; 
    			fn_SearchPayItemMpsbsc006();
    		}
    	}
    	
    });    
    eventIdsSec.push(eventId2);

    eventId1 = dhxGridMpsbsc006.attachEvent('onRowSelect', function(rId,cInd) {
    	
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpsbsc006, 'datePickerButtonS')) { // calendar
    		var strGridDate = gf_DhxGetValue(dhxGridMpsbsc006, rId, 'pymntDe', 'grid');
    		var pos = dhxGridMpsbsc006.getPosition(this.cell);    		
    		dhxGridMpsbsc006._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMpsbsc006._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMpsbsc006._grid_calendarA.setDate(strGridDate);
    		dhxGridMpsbsc006._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMpsbsc006._grid_calendarA, calendarEventIds);    		
    		eventId1 = dhxGridMpsbsc006._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( rId, dhxGridMpsbsc006._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId1);    		
    	}
		if(cInd == gf_GetDhxGridColumId(dhxGridMpsbsc006, 'datePickerButtonP')) { // calendar
    		var strGridDate = gf_DhxGetValue(dhxGridMpsbsc006, rId, 'stddDe', 'grid');
    		var pos = dhxGridMpsbsc006.getPosition(this.cell);    		
    		dhxGridMpsbsc006._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMpsbsc006._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMpsbsc006._grid_calendarA.setDate(strGridDate);
    		dhxGridMpsbsc006._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMpsbsc006._grid_calendarA, calendarEventIds);    		
    		eventId1 = dhxGridMpsbsc006._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateP( rId, dhxGridMpsbsc006._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId1);    		
    	}
    	
    });
    eventIdsSec.push(eventId1);
    eventId1 = dhxGridItemMpsbsc006.attachEvent("onCheckbox", function(rId,cInd,state){
    	if(state == false){
    		dhxDataProcessor3.setUpdated(rId, true, 'updated');
    	}else if(state == true){
    		dhxDataProcessor3.setUpdated(rId, true, 'updated');
    	}
    });
    eventIdsSec.push(eventId1);
    
    $('#btnSaveCalcItem').unbind('click').bind('click', function() {
        fn_SaveMpsbsc006Item();
    });
    $('#checkAllMpsbscItem').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridItemMpsbsc006, $('#checkAllMpsbscItem').prop('checked'), 'chk');
		// 체크된 항목을 가져온다
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridItemMpsbsc006, 'chk');
		// 상태값 객체 생성
		var state;
		dhxGridItemMpsbsc006.forEachRow(function(rowId) {
            state = dhxDataProcessor3.getState(rowId);
            // 체크된 값들은 가져온다.
            dhxGridItemMpsbsc006.cells(rowId, gf_GetDhxGridColumId(dhxGridItemMpsbsc006,'chk')).getValue();
            dhxDataProcessor3.setUpdated(rowId, true, 'updated');
//            // 체크가 1 이라면 inserted 로 상태 변경
//            if(check == '1'){
//            	dhxDataProcessor3.setUpdated(rowId, true, 'inserted');
//            }else if(check == '0'){
//            	// 체크가 0 이라면 deleted 로 상태 변경
//            	dhxDataProcessor3.setUpdated(rowId, true, 'deleted');
//            }
        });
    });
    $('#checkAllMpsbscItem2').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridItemMpsbsc006, $('#checkAllMpsbscItem2').prop('checked'), 'ch2');
        
		// 체크된 항목을 가져온다
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridItemMpsbsc006, 'ch2');
		var state;
		dhxGridItemMpsbsc006.forEachRow(function(rowId) {
            state = dhxDataProcessor3.getState(rowId);
            // 체크된 값들은 가져온다.
            dhxGridItemMpsbsc006.cells(rowId, gf_GetDhxGridColumId(dhxGridItemMpsbsc006,'ch2')).getValue();
            dhxDataProcessor3.setUpdated(rowId, true, 'updated');
		});
    });
    
  //2.지급등록  추가
    $('#btnAddApplyType').unbind('click').bind('click', function(event){
    	if (dhxGridMonthMpsbsc006.getSelectedRowId() < 1){
    		gf_DivMsgAlert('적용월을 선택해 주세요.');
            return false; 		
    	}
    	fn_AddApplyType();
    });
    $('#btnSaveApplyType').unbind('click').bind('click', function() {
        dhxGridMpsbsc006.forEachRow(function(rowId) {
        	state = dhxDataProcessor2.getState(rowId);
        	if(state == 'inserted'){
        		var rowId = dhxGridMpsbsc006.getSelectedRowId();
            	var salarytyCode = gf_DhxGetValue(dhxGridMpsbsc006, rowId, 'salarytyCode',  'grid');
                if(salarytyCode == '001'){
                	gf_DivMsgConfirm("전월과 동일한 급여 정보를 복사 하시겠습니까?", 'fn_SavesalarytyCode()' ,'fn_SaveMpsbsc006()');
                }
        	} else if(state == 'updated'){
        		fn_SaveMpsbsc006();
    		} else if(state == ''){
    			gf_DivMsgAlert('수정사항이 없습니다');
    		}
    	});
    	dhxGridItemMpsbsc006.forEachRow(function(rowId) {
    	state = dhxDataProcessor3.getState(rowId);
//    	if(state == 'inserted' || state == 'deleted'){
//    		fn_SaveMpsbsc006Item();
//    		}
    	if(state == 'updated'){
    		fn_SaveMpsbsc006Item();
    	}
    	});
    });
    $('#btnRemoveApplyType').unbind('click').bind('click', function() {
    	var checkAt = gf_GetCheckedGridRowIdArr(dhxGridItemMpsbsc006, 'chk');
    	if(!gf_IsNull(checkAt)){
    		gf_DivMsgAlert("지급항목이 등록되어있어 삭제가 불가능 합니다.");
    		return false;
    	}else{
    		fn_RemoveMpsbsc006();
    	}
    });
    $('#btnRemoveCalcItem').unbind('click').bind('click', function() {
    	fn_RemoveMpsbsc006Item();
    });
    $('#btnExcelMpsbsc006').unbind('click').bind('click', function() {
        fn_ExcelMpsbsc006();
    });
    $('#btnSearchMpsbsc006').unbind('click').bind('click', function(event){
        fn_SearchMpsbsc006();
    });
    $('#btnResetMpsbsc006').unbind('click').bind('click',function() {
    	fn_SearchMpsbsc006();
        //cf_InitFormMpsbsc006();
    });
    
//    $('#applcYySearchFormMpsbsc006').unbind('change').bind('change', function(event){
//        $('#btnSearchMpsbsc006').click(); event.preventDefault();
//    });

};
var fn_SavesalarytyCode = function(){
//	var salarytyCode = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'salarytyCode')).getValue();
//	var jsonParameter = {
//			salarytyCode : salarytyCode
//		}
//		var dataSource = gf_NoAsyncTransaction('mpsbsc006/searchMpsbsc006', jsonParameter, 'POST');
	
	gf_PymntDePopup('','','','', gBplcCode, "N", "fn_CallbackPopComp");  
}
var fn_SavesalarytyCode2 = function(){

	//지급일자 저장 
	//if(fn_GridValidation2()) dhxDataProcessor2.sendData(); //유효성검사
			
			var applcYm = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'applcYm')).getValue();
			var pymntSn = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'pymntSn')).getValue();
			//var pymntDe = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'pymntDe')).getValue();
			var jssfcCode = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'jssfcCode')).getValue();
			var salarytyCode = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'salarytyCode')).getValuve();
			var pymntDe = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'pymntDe')).getValue();
			var jsonParameter = {
					applcYm : applcYm,
					pymntSn : pymntSn,
					jssfcCode : jssfcCode,
					salarytyCode : salarytyCode
					//pymntDe : pymntDe,
				}
				
				var dataSource = gf_NoAsyncTransaction('mpsbsc006/saveCopyApplcYy', jsonParameter, 'POST');

				if (dataSource.code === '000') {
					
					
					gf_DivMsgAlert(gf_LocaleTrans('default', 'mgsProcess')); // "정상처리
																				// 되었습니다
					cf_InitParamMpsbsc006();
					fn_FindMpsbsc006();
				}
 	
		    return true;      			 
	
	//fn_SaveMpsbsc006_Send();
	
}

var cf_InitFormMpsbsc006 = function() {
    $('#searchFormMpsbsc006').clearForm();
	//gf_DateYm("applcYmSearchFormMpsbsc006"); //해당년도
};

var cf_SetBindingMpsbsc006 = function() {
	gf_FormSetValue('searchFormMpsbsc006', 'applcYy', gv_ComYear, 'text');
    fn_SearchMpsbsc006();
};

/*var cf_InitFormMpsbsc006 = function() {
    $('#SearchFormMpsbsc006').resetForm();
    gf_DateYm("applcYmSearchFormMpsbsc006"); //해당년도
};*/
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsbsc006 = function(key) {
    var jsonParameter = {
    		belongYy : gf_FormGetValue('searchFormMpsbsc006', 'applcYy', 'text')
    		
    };
    gf_Transaction(key, 'mpsbsc006/searchMpsbsc006MonthList', jsonParameter, 'fn_CallbackSearchMpsbsc006', false, 'GET');
    
};

var fn_CallbackSearchMpsbsc006 = function(strSvcID, targetID, data) {
	dhxGridMonthMpsbsc006.clearAll();
	if(!gf_IsNull(data.data.records)){
	    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc006');
	    dhxGridMonthMpsbsc006.parse(data.data.records, 'js');
	    if(!gf_IsNull(strSvcID)) {
	        var findCell = dhxGridMonthMpsbsc006.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMonthMpsbsc006,'belogYy'), true);
	        if(!gf_IsNull(findCell)) {
	        	dhxGridMonthMpsbsc006.selectRowById(findCell[0]);
	        } else {
	        	dhxGridMonthMpsbsc006.selectRow(0);
	        }
	    } else {
	    	dhxGridMonthMpsbsc006.selectRow(0);
	    }	
	    previousRowIdMonth = dhxGridMonthMpsbsc006.getSelectedRowId();
	    fn_FindMpsbsc006();//지급등록 그리드화면 
	} else {
	    gf_NoFoundDataOnGridMsg('dataListMonthMpsbsc006');
	}

	cf_SetEventListenerMpsbsc006();

};


/**
 * 2번째 그리드 조회(월별 급여일자 리스트)
 */
var fn_FindMpsbsc006 = function() {
    var belongYm = dhxGridMonthMpsbsc006.cells(dhxGridMonthMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMonthMpsbsc006,'belongYm')).getValue();
    if (!gf_IsNull(belongYm) ) {
        var jsonParameter = {
        		belongYm : belongYm
        };
        
        gf_Transaction(jsonParameter, 'mpsbsc006/searchMpsbsc006', jsonParameter, 'fn_CallbackSearchPayDayMpsbsc006', false, 'GET');   
    }
    dhxDataProcessor2 = new dataProcessor("/xerp/mpsbsc006/saveMpsbsc006");
    
    dhxDataProcessor2.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessor2.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessor2.enableDataNames(true);
    dhxDataProcessor2.init(dhxGridMpsbsc006); //link dataprocessor to the grid
    dhxDataProcessor2.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};   
    dhxDataProcessor2.defineAction("invalid",function(response){
        alert(response.firstChild.nodeValue);
        return true;
    }); 
      
};


var fn_CallbackSearchPayDayMpsbsc006 = function(strSvcID, targetID, data) {
	dhxGridMpsbsc006.clearAll();
	if(!gf_IsNull(data.data.records)){
	    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc006');
	    
	    data.data.records.forEach(function(sal){
	    	sal.salarytyCodeNm = sal.salarytyCode;
	    	var salarytyCodeArr = sal.salarytyCode.split(',');
	    	salarytyCodeArr.forEach(function(code){
	    		sal.salarytyCodeNm = sal.salarytyCodeNm.replaceAll(code, dataSalarytyCode[code]);
	    	});
	    });
	    
	    dhxGridMpsbsc006.parse(data.data.records, 'js');
	    dhxGridMpsbsc006.forEachRow(function(rowId) {
			var pymntDe = gf_DhxGetValue(dhxGridMpsbsc006, rowId, 'pymntDe', 'grid');
			if (!gf_IsNull(pymntDe)){
				dhxGridMpsbsc006.cells(rowId,1).setDisabled(true);
				//dhxGridMpsbsc006.cells(rowId,2)._grid_calendarA._hidden();
				//dhxGridMpsbsc006.cells(rowId,2).setDisabled(true);
				dhxGridMpsbsc006.cells(rowId,4).setDisabled(true);
				dhxGridMpsbsc006.cells(rowId,5).setDisabled(true);	
			}
	    });
	    if(save_Row_Ids_Mpsbsc006 == 0 && save_All_Sta_Mpsbsc006 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpsbsc006.selectRow(0); 
        } else if(save_Row_Sta_Mpsbsc006 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpsbsc006.selectRow(0);
        } else if(save_All_Sta_Mpsbsc006 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpsbsc006.selectRow(save_Row_Num_Mpsbsc006); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpsbsc006.selectRow(save_Row_Num_Mpsbsc006);   //개발자 수정 필요  
            //var findCell = dhxGridMpscal013.findCell(save_Row_Ids_Mpscal013, gf_GetDhxGridColumId(dhxGridMpscal013,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscal013.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscal013.selectRow(0);
            //} 
        } 
	    
	    if(!gf_IsNull(strSvcID)) {
	        var findCell = dhxGridMpsbsc006.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMpsbsc006,'pymntDe'), true);
	        
//	        if(!gf_IsNull(findCell)) {
//	        	dhxGridMpsbsc006.selectRowById(findCell[0]);
//	        } else {
//	        	dhxGridMpsbsc006.selectRow(0);
//	        }
//	    } else {
//	    	dhxGridMpsbsc006.selectRow(0);
	    }	  
	    previousRowIdType = dhxGridMpsbsc006.getSelectedRowId();
	    fn_SearchPayItemMpsbsc006(); 
	} else {
	    gf_NoFoundDataOnGridMsg('dataListMpsbsc006');
	    dhxGridItemMpsbsc006.clearAll();
	    gf_NoFoundDataOnGridMsg('dataListItemMpsbsc006');
	}

	cf_SetEventListenerMpsbsc006();

};

//지급일자별 급여항목리스트 
var fn_SearchPayItemMpsbsc006 = function() {
	var rowId = dhxGridMpsbsc006.getSelectedRowId();
	var salarytyCode = gf_DhxGetValue(dhxGridMpsbsc006, rowId, 'salarytyCode',  'grid');
	var applcYm = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'applcYm')).getValue();
	var pymntSn = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'pymntSn')).getValue();
	
	if (!gf_IsNull(applcYm) ||  gf_IsNull(pymntSn)){
		var jsonParameter = {
			salarytyCode : salarytyCode,
			pymntSn : pymntSn,
			applcYm : applcYm
		};
	}
	gf_Transaction('', 'mpsbsc006/searchListMpsbscItem', jsonParameter, 'fn_CallbackSearchItemListMpsbsc006', false, 'GET');
    
    //3번째 그리드 계산식  dp
    dhxDataProcessor3 = new dataProcessor("/xerp/mpsbsc006/saveSalaryItemMpsbsc006");  
    
    dhxDataProcessor3.setUpdateMode("off"); //기본은 그리드를 변경할때마낟 데이터가 서버로 전송됨 , 자동업데이트 모드 비활성화 
    dhxDataProcessor3.setTransactionMode('POST',true);   
    dhxDataProcessor3.enableDataNames(true);
    dhxDataProcessor3.init(dhxGridItemMpsbsc006);
    dhxDataProcessor3.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	}; 
    
};

var fn_CallbackSearchItemListMpsbsc006 = function(strSvcID, targetID, data) {

	var applcYm = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'applcYm')).getValue();
	
	dhxGridItemMpsbsc006.clearAll();
	if(!gf_IsNull(data.data.records)){
	    gf_NoFoundDataOnGridMsgRemove('dataListItemMpsbsc006');
	    dhxGridItemMpsbsc006.parse(data.data.records, 'js');
	    var rowId = dhxGridItemMpsbsc006.getSelectedRowId();
	    
	} else {
	    gf_NoFoundDataOnGridMsg('dataListItemMpsbsc006');
	}

	cf_SetEventListenerMpsbsc006();

};

/**
 * 데이터 중복 체크
 */
var fn_CheckDupMpsbsc006 = function(){
    var applcYm = gf_FormGetValue('saveFormMpsbsc006', 'applcYm', 'text');
    var pymntSn = gf_FormGetValue('saveFormMpsbsc006', 'pymntSn', 'text');
    if(gf_IsNull(applcYm) && gf_IsNull(pymntSn)) {
        gf_DivMsgAlert('적용 년월를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titapplcYm') */
        gf_DivMsgAlert('지급 순번를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titpymntSn') */
        return false;
    }
    var jsonParameter = {
        applcYm : applcYm,
        pymntSn : pymntSn
    };
    var dataSource = gf_NoAsyncTransaction('mpsbsc006/findMpsbsc006', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.applcYm) && gf_IsNull(data.pymntSn)) {
            keyDuplication = false;
            return true;
        } else {
            gf_DivMsgAlert('적용 년월가 존재합니다.'); /* gf_LocaleTrans('default', 'titapplcYm') */
            gf_DivMsgAlert('지급 순번가 존재합니다.'); /* gf_LocaleTrans('default', 'titpymntSn') */
            keyDuplication = true;
            return false;
        }
    } else {
        gf_DivMsgAlert('중복확인이 되지 않습니다.');
        return false;
    }    
};

var fn_AddApplyType = function(){
	dhxGridMpsbsc006.clearSelection();
	//gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc006');
	var applcYm = dhxGridMonthMpsbsc006.cells(dhxGridMonthMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMonthMpsbsc006,'belongYm')).getValue(); //귀속월
	var initValueArr = [];
    initValueArr.push(''); //no
	initValueArr.push(gf_GetNowDate().format('YYYYMMDD'));
	initValueArr.push('');
    initValueArr.push(gf_GetNowDate().format('YYYYMMDD')); //checkbox
    initValueArr.push(''); //empno
    initValueArr.push(applcYm); //crqfsSn
	initValueArr.push('001'); //crqfsCodeNo
    initValueArr.push('001'); //acqsDe
    initValueArr.push('001'); //validDe
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
    dhxGridMpsbsc006.addRow(dhxGridMpsbsc006.uid(), initValueArr, 0);
    dhxGridMpsbsc006.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscalCrqfs');
    dhxGridMpsbsc006.setEditable (true);
    //$('#btnPopEmpSearchMpscalCrqfs').show();
	previousRowIdType = dhxGridMpsbsc006.getSelectedRowId();
	dhxGridItemMpsbsc006.clearAll(); //3번째 GRID 초기화

}

//급여항목저장 
var fn_SaveMpsbsc006 = function() {   
	var edCnt = 0;
    save_Add_Cnt_Mpsbsc006 = 0; 
    save_Edt_Cnt_Mpsbsc006 = 0; 
    save_Del_Cnt_Mpsbsc006 = 0; 
	
    dhxGridMpsbsc006.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessor2.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessor2.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsbsc006 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsbsc006 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsbsc006 += 1; 
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
        save_All_Sta_Mpsbsc006 = 0; 
        if(save_Add_Cnt_Mpsbsc006 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsbsc006 + "건";
            save_All_Sta_Mpsbsc006 = 1; 
        } 
        if(save_Edt_Cnt_Mpsbsc006 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsbsc006 + "건"; 
        } 
        if(save_Del_Cnt_Mpsbsc006 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsbsc006 + "건"; 
            save_All_Sta_Mpsbsc006 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsbsc006(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsbsc006(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}

var confirmModalMpsbsc006 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true 
            	fn_SaveMpsbsc006_Send();
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 

var fn_SaveMpsbsc006_Send = function() {

	dhxDataProcessor2.defineAction("error",function(response){
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
        return false;
    });
	
	
	if(fn_GridValidation2(dhxGridMpsbsc006, dhxDataProcessor2)) {
		dhxDataProcessor2.sendData();
    }
	//지급일자 저장 
	//if(fn_GridValidation2()) dhxDataProcessor2.sendData(); //유효성검사
	
	dhxDataProcessor2.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){                                                                         
		   
		 if (dataSource.code == "000"){
			  
			gf_DivMsgAlert(gv_MsgSave);
			fn_FindMpsbsc006();
 	
		    return true;      			 
		 }else{
		 	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
		 	return false;			 
		 }
	 }); 
}
	
	

var fn_SaveMpsbsc006Item = function() {    
	var edCnt = 0;
    save_Add_Cnt_MpsbscItem = 0; 
    save_Edt_Cnt_MpsbscItem = 0; 
    save_Del_Cnt_MpsbscItem = 0; 
	
    dhxGridItemMpsbsc006.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessor3.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessor3.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_MpsbscItem += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_MpsbscItem += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_MpsbscItem += 1; 
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
        save_All_Sta_MpsbscItem = 0; 
        if(save_Add_Cnt_MpsbscItem > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_MpsbscItem + "건";
            save_All_Sta_MpsbscItem = 1; 
        } 
        if(save_Edt_Cnt_MpsbscItem > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_MpsbscItem + "건"; 
        } 
        if(save_Del_Cnt_MpsbscItem > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_MpsbscItem + "건"; 
            save_All_Sta_MpsbscItem = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsbscItem(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsbscItem(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}

var confirmModalMpsbscItem = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsbscItem_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 

var fn_SaveMpsbscItem_Send = function() {
	
	// 체크되어있는 값을 가져온다.
	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridItemMpsbsc006, 'chk');	
	dhxDataProcessor3.sendData();
	dhxDataProcessor3.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){                                                                         
		 if (dataSource.code == "000"){
			gf_DivMsgAlert("등록되었습니다.")
			fn_FindMpsbsc006();
		    return true;      			 
		 }else{
		 	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
		 	return false;			 
		 }
	 }); 
}

/**
 * 삭제
 */
var fn_RemoveMpsbsc006 = function() {
	var selectedId = dhxGridMpsbsc006.getSelectedRowId();

	if (selectedId<=0){
        gf_DivMsgAlert('삭제할 유형을 선택해 주세요.');  /* gf_LocaleTrans('default', 'titpymntSn') */
        return false;
//    } else if(){
    	
    }else{
    	var pymntSn = dhxGridMpsbsc006.cells(selectedId, dhxGridMpsbsc006.getColIndexById("pymntSn")).getValue() ;
    	
    	if( gf_IsNull(pymntSn)) {
    		dhxGridMpsbsc006.deleteRow(selectedId);
    		//var rowNum = dhxGridMpsbsc006.getRowIndex(rowId);
    		//dhxGridMpsbsc006.selectRow(rowNum);
    		//dhxGridMpscal005.deleteRow(rowId);
		}
    	//else dhxDataProcessor2.setUpdated(selectedId, true, 'deleted');
    	else{
			gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMpsbsc006Send()', '');
    	}
    }
};

var fn_RemoveMpsbsc006Send = function() {
	var applcYm = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'applcYm')).getValue();
    var pymntSn = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'pymntSn')).getValue();
    var jsonParameter = {
		applcYm : applcYm,
		pymntSn : pymntSn
    };
    var dataSource = gf_NoAsyncTransaction('mpsbsc006/removeMpsbsc006', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_FindMpsbsc006();
    } else {
    	gf_DivMsgAlert("지급대상자에 등록되어 있어 삭제가 불가능 합니다.");
    }
};

/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc006 = function () {
    var titMpsbsc006 = '급여지급일자등록'; /* gf_LocaleTrans('default', 'titMpsbsc006') */
    var jsonParameter = {
        applcYm : gf_FormGetValue('searchFormMpsbsc006', 'applcYm', 'text'),
        pymntSn : gf_FormGetValue('searchFormMpsbsc006', 'pymntSn', 'text')
    };
    var header = [[
        '적용 년월' /* gf_LocaleTrans('default', 'titApplcYm') */,
        '지급 순번' /* gf_LocaleTrans('default', 'titPymntSn') */,
        '지급 일자' /* gf_LocaleTrans('default', 'titPymntDe') */,
        '지급 내역' /* gf_LocaleTrans('default', 'titPymntDtls') */,
        '마감 여부' /* gf_LocaleTrans('default', 'titClosAt') */,
        '공개 여부' /* gf_LocaleTrans('default', 'titOthbcAt') */,
        '공개 일시' /* gf_LocaleTrans('default', 'titOthbcDt') */
    ]];
    var dataId = [[ 'applcYm', 'pymntSn', 'pymntDe', 'pymntDtls', 'closAt', 'othbcAt', 'othbcDt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsbsc006 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc006;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc006/excelMpsbsc006', jsonParameter);
};

//달력아이콘 함수들
var eXcell_datePickerButtonS = function(cell){ //the eXcell name is defined here
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

eXcell_datePickerButtonS.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateS = function (rId, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMpsbsc006, rId, 'pymntDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessor2.setUpdated(rId, true, 'updated');
	}	
}

var eXcell_datePickerButtonP = function(cell){ //the eXcell name is defined here
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

eXcell_datePickerButtonP.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateP = function (rId, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMpsbsc006, rId, 'stddDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessor2.setUpdated(rId, true, 'updated');
	}	
}

var fn_GridValidation2 = function(dhxGridObjet, dhxDataProcessor){
	var state;
	var valid = true;
	var checkCode;
	var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
	var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
	save_Row_Sta_Mpsbsc006 = dhxDataProcessor2.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpsbsc006 = 0;
        save_Row_Ids_Mpsbsc006 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpsbsc006 = rowNum;
        save_Row_Ids_Mpsbsc006 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsbsc006 = rowNum;
        save_Row_Ids_Mpsbsc006 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
	dhxGridMpsbsc006.forEachRow(function(rowId) {
		valid = true;
        state = dhxDataProcessor2.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	
            	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMpsbsc006, rowId, 'pymntDe', 'grid') )){
    				fn_GridValidationSelectCell(dhxGridMpsbsc006, rowId, 'pymntDe',dhxDataProcessor2);
    				valid = false;
    			}
    			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMpsbsc006, rowId, 'jssfcCode', 'grid') )){
    				fn_GridValidationSelectCell(dhxGridMpsbsc006, rowId, 'jssfcCode',dhxDataProcessor2);
    				valid = false;
    			}
    			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMpsbsc006, rowId, 'salarytyCode', 'grid') )){
    				fn_GridValidationSelectCell(dhxGridMpsbsc006, rowId, 'salarytyCode',dhxDataProcessor2);
    				valid = false;
    			}
    			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMpsbsc006, rowId, 'acnutSeCode', 'grid') )){
    				fn_GridValidationSelectCell(dhxGridMpsbsc006, rowId, 'acnutSeCode',dhxDataProcessor2);
    				valid = false;
    			}
            }				
			
		}
    });
	return valid;	 
}

var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd,dp){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dp.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}

var fn_CallbackPopComp = function(data) {
	if(!gf_IsNull(data.pymntDe)) {
		//fn_SavesalarytyCode2();
		dhxDataProcessor2.sendData();
		dhxDataProcessor2.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){                                                                         
			 if (dataSource.code == "000"){
				 var applcYm = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'applcYm')).getValue();
	                applcYy = data.applcYm,
	      			pymntDe = data.pymntDe;
	                pymntSn = data.pymntSn;
	      			jssfcCode = data.jssfcCode;
	      			salarytyCode = data.salarytyCode;
	      			var jsonParameter = {
	      				applcYm : applcYm,
	      				applcYy : applcYy,
	      				pymntDe : pymntDe,
	      				pymntSn : pymntSn,
	      				jssfcCode : jssfcCode,
	      				salarytyCode : salarytyCode
	      			}
	      			
	      			var dataSource = gf_NoAsyncTransaction('mpsbsc006/saveCopyApplcYy', jsonParameter, 'POST');
	      			if (dataSource.code === '000') {
	      				cf_InitParamMpsbsc006();
	      				fn_FindMpsbsc006();
	      			}
			    return true;      			 
			 }else{
			 	gf_DivMsgAlert("지급대상자에 등록되어 있어 삭제가 불가능 합니다.");
			 	return false;			 
			 }
		 }); 
	}
};

