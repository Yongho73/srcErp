/**
 *    프로그램       : 프로그램 개발현황 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.10
 *    사용테이블      : STM_PROGRM_DEV_STAT
 * sourceGen version : 2020.06.29.01 (2020.07.10)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmmng010 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmmng010 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmmng010 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmmng010 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmmng010 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmmng010 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmmng010 = 0;  //그리드 삭제 수량 
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmng010();
    cf_SetComponentsStmmng010();
    cf_SetEventListenerStmmng010();
    cf_InitFormStmmng010();
    cf_SetBindingStmmng010();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmmng010 = function() {
    //gf_SetMenuPath(); 
    $("#saveFormStmmng010").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboSysSeSearchFormStmmng010', 'sysSeSearchFormStmmng010', 'sysSe', 'search', 'C192', '' , '', '', 'asc', '');
};

var dhxGridStmmng010;
var cf_SetComponentsStmmng010 = function() {
    var dhxGridStmmng010HeaderInfo = [];
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '*', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmmng010" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('프로그램ID', '90', 'left', 'str', 'ro', false, 'progrmId', '', '')); /* gf_LocaleTrans('default', 'titProgrmId') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('프로그램명', '150', 'left', 'str', 'ro', false, 'progrmNm', '', '')); /* gf_LocaleTrans('default', 'titProgrmId') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('경로', '280', 'left', 'str', 'ro', false, 'progrmPath', '', '')); /* gf_LocaleTrans('default', 'titProgrmId') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('진행상태', '60', 'center', 'str', 'coro', false, 'progrsSttus', '', '')); /* gf_LocaleTrans('default', 'titProgrsSttus') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('개발자', '70', 'center', 'str', 'ro', false, 'chargerNm', '', '')); /* gf_LocaleTrans('default', 'titChargerEmpno') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchEmpButton',false,'searchEmpButton','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('예정일자', '80', 'center', 'date', 'dhxCalendarA', false, 'prearngeBeginDe', '', '')); /* gf_LocaleTrans('default', 'titPrearngeBeginDe') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonPS',false,'datePickerButtonPS','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'str', 'ro', false, 'prearngeEndDe', '', '')); /* gf_LocaleTrans('default', 'titPrearngeEndDe') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonPE',false,'datePickerButtonPE','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('실적일자', '80', 'center', 'date', 'ro', false, 'realBeginDe', '', '')); /* gf_LocaleTrans('default', 'titRealBeginDe') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonRS',false,'datePickerButtonRS','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'date', 'ro', false, 'realEndDe', '', '')); /* gf_LocaleTrans('default', 'titRealEndDe') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonRE',false,'datePickerButtonRE','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('PL', '70', 'center', 'str', 'ro', false, 'plNm', '', '')); /* gf_LocaleTrans('default', 'titPlEmpno') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchEmpButton',false,'searchEmpButtonPL','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'str', 'ro', false, 'plConfirmDe', '', '')); /* gf_LocaleTrans('default', 'titPlConfirmDe') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonPL',false,'datePickerButtonPL','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'str', 'coro', false, 'plConfirmResult', '', ''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('PM', '70', 'center', 'str', 'ro', false, 'pmNm', '', '')); /* gf_LocaleTrans('default', 'titPmEmpno') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchEmpButton',false,'searchEmpButtonPM','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'str', 'ro', false, 'pmConfirmDe', '', '')); /* gf_LocaleTrans('default', 'titPmConfirmDe') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonPM',false,'datePickerButtonPM','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'str', 'coro', false, 'pmConfirmResult', '', ''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('PMO', '70', 'center', 'str', 'ro', false, 'pmoNm', '', '')); /* gf_LocaleTrans('default', 'titTestOdr1Empno') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchEmpButton',false,'searchEmpButtonT1','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'str', 'ro', false, 'pmoConfirmDe', '', '')); /* gf_LocaleTrans('default', 'titTestOdr1ConfirmDe') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonT1',false,'datePickerButtonT1','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'str', 'coro', false, 'pmoConfirmResult', '', ''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('TFT', '70', 'center', 'str', 'ro', false, 'tftNm', '', '')); /* gf_LocaleTrans('default', 'titTestOrd2Empno') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchEmpButton',false,'searchEmpButtonT2','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'str', 'ro', false, 'tftConfirmDe', '', '')); /* gf_LocaleTrans('default', 'titTestOrd2ConfirmDe') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonT2',false,'datePickerButtonT2','',''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'str', 'coro', false, 'tftConfirmResult', '', ''));
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('비고', '200', 'left', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('담당자사번', '100', 'center', 'str', 'ed', true, 'chargerEmpno', '', '')); /* gf_LocaleTrans('default', 'titChargerEmpno') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('PM사번', '100', 'center', 'str', 'ro', true, 'pmEmpno', '', '')); /* gf_LocaleTrans('default', 'titPmEmpno') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('PL사번', '100', 'center', 'str', 'ro', true, 'plEmpno', '', '')); /* gf_LocaleTrans('default', 'titPmEmpno') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('TEST1사번', '100', 'center', 'str', 'ro', true, 'pmoEmpno', '', '')); /* gf_LocaleTrans('default', 'titTestOdr1Empno') */
    dhxGridStmmng010HeaderInfo.push(gf_MakeDhxGridHeader('TEST2사번', '100', 'center', 'str', 'ro', true, 'tftEmpno', '', '')); /* gf_LocaleTrans('default', 'titTestOrd2Empno') */
    
	var attachHeaderArr = [];
	attachHeaderArr.push(["#rspan", "#rspan", "#rspan", "#rspan", "#rspan", "#rspan", "성명", "#cspan",
						  "시작일자", "#cspan",  "종료일자",  "#cspan", "시작일자", "#cspan",  "종료일자",  "#cspan", 
						  "성명", "#cspan", "확인일자", "#cspan", "테스트결과", "성명", "#cspan", "확인일자", "#cspan", "테스트결과",
						  "성명", "#cspan", "확인일자", "#cspan", "테스트결과", "성명", "#cspan", "확인일자", "#cspan", "테스트결과",
						  "#rspan", "#rspan", "#rspan", "#rspan", "#rspan", "#rspan"]);
     
    dhxGridStmmng010 = gf_MakeDhxGrid('dataListStmmng010', dhxGridStmmng010HeaderInfo, false, true, false, attachHeaderArr);
    dhxGridStmmng010.enableAutoWidth(false);
    dhxGridStmmng010.setEditable(true);
    dhxGridStmmng010.enableEditEvents(true, false, false);
 
    dhxGridStmmng010.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    dhxGridStmmng010.setDateFormat("%Y-%m-%d");
    
    //진행여부 
    var jsonParameter = {codekindCode : "C201",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridStmmng010, dhxGridStmmng010.getColIndexById("progrsSttus"), dataSource.data); /* 그리드콤보*/
    
    var jsonParameter = {codekindCode : "C293",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridStmmng010, dhxGridStmmng010.getColIndexById("plConfirmResult"), dataSource.data); /* 그리드콤보*/
    
    var jsonParameter = {codekindCode : "C293",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridStmmng010, dhxGridStmmng010.getColIndexById("pmConfirmResult"), dataSource.data); /* 그리드콤보*/
    
    var jsonParameter = {codekindCode : "C293",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridStmmng010, dhxGridStmmng010.getColIndexById("pmoConfirmResult"), dataSource.data); /* 그리드콤보*/
    
    var jsonParameter = {codekindCode : "C293",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridStmmng010, dhxGridStmmng010.getColIndexById("tftConfirmResult"), dataSource.data); /* 그리드콤보*/
};

var eventIdStmmng010 = [];
var cf_SetEventListenerStmmng010 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmmng010 = gf_GridDetachEvent(dhxGridStmmng010, eventIdStmmng010);
    eventId = dhxGridStmmng010.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmmng010();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmmng010.getColumnsNum();
            var rowNum = dhxGridStmmng010.getRowsNum();
            var selectedId = dhxGridStmmng010.getSelectedRowId();
            var ind        = dhxGridStmmng010.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng010.getRowIndex(selectedId);
            var type       = dhxGridStmmng010.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmmng010.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmmng010.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmmng010.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng010.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmmng010.getSelectedRowId();
            var ind        = dhxGridStmmng010.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng010.getRowIndex(selectedId);
            var type       = dhxGridStmmng010.getColType(ind);
            dhxGridStmmng010.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng010.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmmng010.getSelectedRowId();
            var ind        = dhxGridStmmng010.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng010.getRowIndex(selectedId);
            var type       = dhxGridStmmng010.getColType(ind);
            dhxGridStmmng010.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng010.editCell();
            }
        }
        else return true;
    });
    eventIdStmmng010.push(eventId);
    eventId = dhxGridStmmng010.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmmng010SortGridList(ind, type, direction); 
    });
    eventIdStmmng010.push(eventId);
    eventId = dhxGridStmmng010.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmmng010.push(eventId);
    var calendarEventIds = [];
    eventId = dhxGridStmmng010.attachEvent("onRowSelect", function(id, ind){
    	 gf_errorMsgClear();
         if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'searchEmpButton')) { 
     		fn_gridSearchEmpButton( id );
     	 }
         if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'searchEmpButtonPM')) { 
      		fn_gridSearchEmpButtonPM( id );
      	 }
         if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'searchEmpButtonPL')) { 
       		fn_gridSearchEmpButtonPL( id );
       	 }
         if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'searchEmpButtonT1')) { 
        		fn_gridSearchEmpButtonT1( id );
         }
         if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'searchEmpButtonT2')) { 
     		fn_gridSearchEmpButtonT2( id );
         }
         if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'datePickerButtonPS')) { // calendar    		
     		var strGridDate = gf_DhxGetValue(dhxGridStmmng010, id, 'prearngeBeginDe', 'grid');
     		if(gf_IsNull(strGridDate)){
     			strGridDate = gf_Date2StrDisplayFormat(new Date());
     		}
     		var pos = dhxGridStmmng010.getPosition(this.cell);    		
     		dhxGridStmmng010._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
     		dhxGridStmmng010._grid_calendarA.loadUserLanguage("ko");
     		dhxGridStmmng010._grid_calendarA.setDate(strGridDate);
     		dhxGridStmmng010._grid_calendarA._show();    		
     		calendarEventIds = gf_GridDetachEvent(dhxGridStmmng010._grid_calendarA, calendarEventIds);    		
     		eventId = dhxGridStmmng010._grid_calendarA.attachEvent('onClick', function(date) { 
     			fn_gridPickerButtonSetDatePS( id, dhxGridStmmng010._grid_calendarA.getDate() );
     		});
     		calendarEventIds.push(eventId);    		
     	 }
     	 if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'datePickerButtonPE')) { // calendar    		
     		var strGridDate = gf_DhxGetValue(dhxGridStmmng010, id, 'prearngeEndDe', 'grid');
     		if(gf_IsNull(strGridDate)){
         		strGridDate = gf_Date2StrDisplayFormat(new Date());
     		}
     		var pos = dhxGridStmmng010.getPosition(this.cell);    		
     		dhxGridStmmng010._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
     		dhxGridStmmng010._grid_calendarA.loadUserLanguage("ko");
     		dhxGridStmmng010._grid_calendarA.setDate(strGridDate);
     		dhxGridStmmng010._grid_calendarA._show();    		
     		calendarEventIds = gf_GridDetachEvent(dhxGridStmmng010._grid_calendarA, calendarEventIds);    		
     		eventId = dhxGridStmmng010._grid_calendarA.attachEvent('onClick', function(date) { 
     			fn_gridPickerButtonSetDatePE( id, dhxGridStmmng010._grid_calendarA.getDate() );
     		});
     		calendarEventIds.push(eventId);    		
     	 }
     	 if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'datePickerButtonRS')) { // calendar    		
       		var strGridDate = gf_DhxGetValue(dhxGridStmmng010, id, 'realBeginDe', 'grid');
       		if(gf_IsNull(strGridDate)){
       			strGridDate = gf_Date2StrDisplayFormat(new Date());
       		}
       		var pos = dhxGridStmmng010.getPosition(this.cell);    		
       		dhxGridStmmng010._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
       		dhxGridStmmng010._grid_calendarA.loadUserLanguage("ko");
       		dhxGridStmmng010._grid_calendarA.setDate(strGridDate);
       		dhxGridStmmng010._grid_calendarA._show();    		
       		calendarEventIds = gf_GridDetachEvent(dhxGridStmmng010._grid_calendarA, calendarEventIds);    		
       		eventId = dhxGridStmmng010._grid_calendarA.attachEvent('onClick', function(date) { 
       			fn_gridPickerButtonSetDateRS( id, dhxGridStmmng010._grid_calendarA.getDate() );
       		});
       		calendarEventIds.push(eventId);    		
       	 }
       	 if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'datePickerButtonRE')) { // calendar    		
       		var strGridDate = gf_DhxGetValue(dhxGridStmmng010, id, 'realEndDe', 'grid');
       		if(gf_IsNull(strGridDate)){
           		strGridDate = gf_Date2StrDisplayFormat(new Date());
       		}
       		var pos = dhxGridStmmng010.getPosition(this.cell);    		
       		dhxGridStmmng010._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
       		dhxGridStmmng010._grid_calendarA.loadUserLanguage("ko");
       		dhxGridStmmng010._grid_calendarA.setDate(strGridDate);
       		dhxGridStmmng010._grid_calendarA._show();    		
       		calendarEventIds = gf_GridDetachEvent(dhxGridStmmng010._grid_calendarA, calendarEventIds);    		
       		eventId = dhxGridStmmng010._grid_calendarA.attachEvent('onClick', function(date) { 
       			fn_gridPickerButtonSetDateRE( id, dhxGridStmmng010._grid_calendarA.getDate() );
       		});
       		calendarEventIds.push(eventId);    		
       	 }
       	 if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'datePickerButtonPM')) { // calendar    		
       		var strGridDate = gf_DhxGetValue(dhxGridStmmng010, id, 'pmConfirmDe', 'grid');
       		if(gf_IsNull(strGridDate)){
       			strGridDate = gf_Date2StrDisplayFormat(new Date());
       		}
       		var pos = dhxGridStmmng010.getPosition(this.cell);    		
       		dhxGridStmmng010._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
       		dhxGridStmmng010._grid_calendarA.loadUserLanguage("ko");
       		dhxGridStmmng010._grid_calendarA.setDate(strGridDate);
       		dhxGridStmmng010._grid_calendarA._show();    		
       		calendarEventIds = gf_GridDetachEvent(dhxGridStmmng010._grid_calendarA, calendarEventIds);    		
       		eventId = dhxGridStmmng010._grid_calendarA.attachEvent('onClick', function(date) { 
       			fn_gridPickerButtonSetDatePM( id, dhxGridStmmng010._grid_calendarA.getDate() );
       		});
       		calendarEventIds.push(eventId);    		
       	 }
       	 if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'datePickerButtonPL')) { // calendar    		
       		var strGridDate = gf_DhxGetValue(dhxGridStmmng010, id, 'plConfirmDe', 'grid');
       		if(gf_IsNull(strGridDate)){
       			strGridDate = gf_Date2StrDisplayFormat(new Date());
       		}
       		var pos = dhxGridStmmng010.getPosition(this.cell);    		
       		dhxGridStmmng010._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
       		dhxGridStmmng010._grid_calendarA.loadUserLanguage("ko");
       		dhxGridStmmng010._grid_calendarA.setDate(strGridDate);
       		dhxGridStmmng010._grid_calendarA._show();    		
       		calendarEventIds = gf_GridDetachEvent(dhxGridStmmng010._grid_calendarA, calendarEventIds);    		
       		eventId = dhxGridStmmng010._grid_calendarA.attachEvent('onClick', function(date) { 
       			fn_gridPickerButtonSetDatePL( id, dhxGridStmmng010._grid_calendarA.getDate() );
       		});
       		calendarEventIds.push(eventId);    		
       	 }
       	 if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'datePickerButtonT1')) { // calendar    		
       		var strGridDate = gf_DhxGetValue(dhxGridStmmng010, id, 'pmoConfirmDe', 'grid');
       		if(gf_IsNull(strGridDate)){
       			strGridDate = gf_Date2StrDisplayFormat(new Date());
       		}
       		var pos = dhxGridStmmng010.getPosition(this.cell);    		
       		dhxGridStmmng010._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
       		dhxGridStmmng010._grid_calendarA.loadUserLanguage("ko");
       		dhxGridStmmng010._grid_calendarA.setDate(strGridDate);
       		dhxGridStmmng010._grid_calendarA._show();    		
       		calendarEventIds = gf_GridDetachEvent(dhxGridStmmng010._grid_calendarA, calendarEventIds);    		
       		eventId = dhxGridStmmng010._grid_calendarA.attachEvent('onClick', function(date) { 
       			fn_gridPickerButtonSetDateT1( id, dhxGridStmmng010._grid_calendarA.getDate() );
       		});
       		calendarEventIds.push(eventId);    		
       	  }
       	  if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'datePickerButtonT2')) { // calendar    		
       		var strGridDate = gf_DhxGetValue(dhxGridStmmng010, id, 'tftConfirmDe', 'grid');
       		if(gf_IsNull(strGridDate)){
       			strGridDate = gf_Date2StrDisplayFormat(new Date());
       		}
       		var pos = dhxGridStmmng010.getPosition(this.cell);    		
       		dhxGridStmmng010._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
       		dhxGridStmmng010._grid_calendarA.loadUserLanguage("ko");
       		dhxGridStmmng010._grid_calendarA.setDate(strGridDate);
       		dhxGridStmmng010._grid_calendarA._show();    		
       		calendarEventIds = gf_GridDetachEvent(dhxGridStmmng010._grid_calendarA, calendarEventIds);    		
       		eventId = dhxGridStmmng010._grid_calendarA.attachEvent('onClick', function(date) { 
       			fn_gridPickerButtonSetDateT2( id, dhxGridStmmng010._grid_calendarA.getDate() );
       		});
       		calendarEventIds.push(eventId);    		
       	  }
    });
    eventIdStmmng010.push(eventId);
    eventId = dhxGridStmmng010.attachEvent("onEditCell", function(id, ind){
    	if(ind == gf_GetDhxGridColumId(dhxGridStmmng010, 'prearngeBeginDe')) return false;
        return true;
    });
    eventIdStmmng010.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmmng010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddStmmng010()
    });
    $('#btnSaveStmmng010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        
        fn_SaveStmmng010();
    });
    $('#btnRemoveStmmng010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmmng010();
    });
    $('#btnExcelStmmng010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmmng010();
    });
    $('#btnSearchStmmng010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmmng010('');
    });
    $('#btnResetStmmng010').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmmng010();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllStmmng010').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridStmmng010, $('#checkAllStmmng010').prop('checked'), 'chk');
    });
    $('#searchFormStmmng010 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id != "chargerEmpno"){
        		$('#btnSearchStmmng010').click(); event.preventDefault(); return true;
        	}
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //사원팝업
	$('#searchFormStmmng010 #btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup('searchFormStmmng010', 'chargerEmpno', 'chargerNm', '1000', 'Y', null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#chargerEmpno').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormStmmng010', 'chargerNm', '', 'text');
	    }
    });
	$('#chargerNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormStmmng010', 'chargerEmpno', '', 'text');
	    }
    });
};

var cf_InitFormStmmng010 = function() {
    $('#searchFormStmmng010').resetForm();
};

var cf_SetBindingStmmng010 = function() {
    fn_SearchStmmng010('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmmng010 = function(userId) {
    var jsonParameter = {
        progrmId : gf_FormGetValue('searchFormStmmng010', 'progrmId', 'text'),
        progrmNm : gf_FormGetValue('searchFormStmmng010', 'progrmNm', 'text'),
        chargerEmpno : gf_FormGetValue('searchFormStmmng010', 'chargerEmpno', 'text'),
        sysSe : gf_FormGetValue('searchFormStmmng010', 'sysSe', 'combo'),
        progrsSttus : gf_FormGetValue('searchFormStmmng010', 'progrsSttus', 'combo'),
    };
    gf_Transaction(userId, 'stmmng010/searchStmmng010', jsonParameter, 'fn_CallbackSearchStmmng010', false, 'GET');
};

var dhxDataProcessorStmmng010;
var fn_CallbackSearchStmmng010 = function(strSvcID, targetID, data) {
    dhxGridStmmng010.clearAll();
    fn_DhxDataProcessorStmmng010(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListStmmng010');
        dhxGridStmmng010.parse(data.data.records, 'js');
 
        if(save_Row_Ids_Stmmng010 == 0 && save_All_Sta_Stmmng010 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridStmmng010.selectRow(0); 
        } else if(save_Row_Sta_Stmmng010 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridStmmng010.selectRow(0);
        } else if(save_All_Sta_Stmmng010 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridStmmng010.selectRow(save_Row_Num_Stmmng010); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridStmmng010.selectRow(save_Row_Num_Stmmng010);   //개발자 수정 필요  
            //var findCell = dhxGridStmmng010.findCell(save_Row_Ids_Stmmng010, gf_GetDhxGridColumId(dhxGridStmmng010,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridStmmng010.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridStmmng010.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListStmmng010');
    }
    $("#spanCntSearchFormStmmng010").text(data.data.records.length);
    cf_SetEventListenerStmmng010();
};
var fn_DhxDataProcessorStmmng010 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmmng010 = new dataProcessor(gv_ContextPath+'/stmmng010/saveStmmng010'); //lock feed url
    dhxDataProcessorStmmng010.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmmng010.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmmng010.init(dhxGridStmmng010); //link dataprocessor to the grid
    dhxDataProcessorStmmng010.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmmng010.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmmng010.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmmng010();
                    $("#checkAllStmmng010").prop('checked', false); //상단 체크박스 해제
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
var fn_AddStmmng010 = function() {
    dhxGridStmmng010.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //progrmId
    initValueArr.push(''); //prearngeBeginDe
    initValueArr.push(''); //prearngeEndDe
    initValueArr.push(''); //chargerEmpno
    initValueArr.push(''); //realBeginDe
    initValueArr.push(''); //realEndDe
    initValueArr.push(''); //progrsSttus
    initValueArr.push(''); //plEmpno
    initValueArr.push(''); //plConfirmDe
    initValueArr.push(''); //pmEmpno
    initValueArr.push(''); //pmConfirmDe
    initValueArr.push(''); //testOdr1Empno
    initValueArr.push(''); //testOrd2Empno
    initValueArr.push(''); //testOdr1ConfirmDe
    initValueArr.push(''); //testOrd2ConfirmDe
    initValueArr.push(''); //rm
    dhxGridStmmng010.addRow(dhxGridStmmng010.uid(), initValueArr, 0);
    dhxGridStmmng010.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmmng010');
    $('#btnPopEmpSearchStmmng010').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmmng010SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmmng010, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmmng010', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmmng010', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmmng010, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmmng010.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmmng010', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmmng010', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng010, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmmng010.setSortImgState(false); 
            gf_FormSetValue('searchFormStmmng010', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmmng010', 'sortColumId', '', 'text'); 
            dhxGridStmmng010.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmmng010.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmmng010', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmmng010', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng010, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmmng010 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmmng010 = 0; 
    save_Edt_Cnt_Stmmng010 = 0; 
    save_Del_Cnt_Stmmng010 = 0; 
    dhxGridStmmng010.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmmng010.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmmng010.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmmng010 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmmng010 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmmng010 += 1; 
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
        save_All_Sta_Stmmng010 = 0; 
        if(save_Add_Cnt_Stmmng010 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmmng010 + "건";
            save_All_Sta_Stmmng010 = 1; 
        } 
        if(save_Edt_Cnt_Stmmng010 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmmng010 + "건"; 
        } 
        if(save_Del_Cnt_Stmmng010 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmmng010 + "건"; 
            save_All_Sta_Stmmng010 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmmng010(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmmng010(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmmng010 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmmng010_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmmng010_Send = function() {
    if(fn_GridValidation(dhxGridStmmng010, dhxDataProcessorStmmng010)) {
        dhxDataProcessorStmmng010.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmmng010 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmmng010, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridStmmng010.forEachRow(function(rowId) {
            state = dhxDataProcessorStmmng010.getState(rowId);
            if(dhxGridStmmng010.cells(rowId, gf_GetDhxGridColumId(dhxGridStmmng010, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridStmmng010.getRowIndex(rowId);
                    dhxGridStmmng010.deleteRow(rowId);
                    dhxGridStmmng010.selectRow(rowNum);
                }
                else dhxDataProcessorStmmng010.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmmng010 = function () {
    var titStmmng010 = '프로그램 개발현황'; /* gf_LocaleTrans('default', 'titStmmng010') */
    var jsonParameter = {
        progrmId : gf_FormGetValue('searchFormStmmng010', 'progrmId', 'text')
    };
    var header = [[
        '프로그램ID' /* gf_LocaleTrans('default', 'titProgrmId') */,
        '예정시작일자' /* gf_LocaleTrans('default', 'titPrearngeBeginDe') */,
        '예정종료일자' /* gf_LocaleTrans('default', 'titPrearngeEndDe') */,
        '담당자사원번호' /* gf_LocaleTrans('default', 'titChargerEmpno') */,
        '실제 시작 일자' /* gf_LocaleTrans('default', 'titRealBeginDe') */,
        '실제 종료 일자' /* gf_LocaleTrans('default', 'titRealEndDe') */,
        '진행상태(C189)' /* gf_LocaleTrans('default', 'titProgrsSttus') */,
        'PL 사원번호' /* gf_LocaleTrans('default', 'titPlEmpno') */,
        'PL확인일자' /* gf_LocaleTrans('default', 'titPlConfirmDe') */,
        'PM 사원번호' /* gf_LocaleTrans('default', 'titPmEmpno') */,
        'PM확인일자' /* gf_LocaleTrans('default', 'titPmConfirmDe') */,
        'TEST 1차 사원번호' /* gf_LocaleTrans('default', 'titTestOdr1Empno') */,
        'TEST 2차 사원번호' /* gf_LocaleTrans('default', 'titTestOrd2Empno') */,
        'TEST 1차 확인 일자' /* gf_LocaleTrans('default', 'titTestOdr1ConfirmDe') */,
        'TEST 2차 확인 일자' /* gf_LocaleTrans('default', 'titTestOrd2ConfirmDe') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'progrmId', 'prearngeBeginDe', 'prearngeEndDe', 'chargerEmpno', 'realBeginDe', 'realEndDe', 'progrsSttus', 'plEmpno', 'plConfirmDe', 'pmEmpno', 'pmConfirmDe', 'pmoEmpno', 'tftEmpno', 'pmoConfirmDe', 'tftConfirmDe', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmmng010 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmmng010;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmmng010/excelStmmng010', jsonParameter);
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
    $('#saveFormStmmng010 #progrmIdSaveFormStmmng010').parent().append(
    '<div class="error" id="progrmIdSaveFormStmmng010-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmmng010 = function(progrmId){
    if(!gf_IsNull(progrmId)) {
        var jsonParameter = {
            progrmId : progrmId
        };
        var dataSource = gf_NoAsyncTransaction('stmmng010/findStmmng010', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.progrmId)) {
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
    var checkProgrmId;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmmng010 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Stmmng010 = 0;
        save_Row_Ids_Stmmng010 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Stmmng010 = rowNum;
        save_Row_Ids_Stmmng010 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmmng010 = rowNum;
        save_Row_Ids_Stmmng010 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'progrmId', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
                    valid = false;
                }
                var endDate = gf_DhxGetValue(dhxGridObjet, rowId, 'prearngeEndDe', 'grid');
    			if(!gf_IsNull(endDate)){
    				var startDate = gf_DhxGetValue(dhxGridObjet, rowId, 'prearngeBeginDe', 'grid');
    				var startDateArr = startDate.split('-');
    				var endDateArr = endDate.split('-');
    	
    				var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
    				var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
    				         
    				if(startDateCompare.getTime() > endDateCompare.getTime()) {
    					if(valid){
    						gf_DivMsgAlert(rowId + "행의 예정종료일자가 예정시작일자보다 빠릅니다.");
    					}
    					fn_GridValidationSelectCell(dhxGridStmmng010, rowId, 'prearngeEndDe');
    					valid = false;
    				}
    			}
    			var endDate = gf_DhxGetValue(dhxGridObjet, rowId, 'realEndDe', 'grid');
    			if(!gf_IsNull(endDate)){
    				var startDate = gf_DhxGetValue(dhxGridObjet, rowId, 'realBeginDe', 'grid');
    				var startDateArr = startDate.split('-');
    				var endDateArr = endDate.split('-');
    	
    				var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
    				var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
    				         
    				if(startDateCompare.getTime() > endDateCompare.getTime()) {
    					if(valid){
    						gf_DivMsgAlert(rowId + "행 실적종료일자가 실적시작일자보다 빠릅니다.");
    					}
    					fn_GridValidationSelectCell(dhxGridStmmng010, rowId, 'realEndDe');
    					valid = false;
    				}
    			}
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkProgrmId = gf_DhxGetValue(dhxGridObjet, rowId, 'progrmId', 'grid');
                    if(!gf_IsNull(checkProgrmId)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var progrmId = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'progrmId', 'grid');
                            if(((progrmId == checkProgrmId)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmmng010( checkProgrmId )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
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
        dhxGridStmmng010.selectRowById(validFalseFistRowId);
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

var fn_gridSearchEmpButton = function( rid ) {	
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButton', rid);
};
var fn_CallbackGridSearchEmpButton = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridStmmng010, rid, 'chargerEmpno', data.empno, 'grid');
		gf_DhxSetValue(dhxGridStmmng010, rid, 'chargerNm', data.korNm, 'grid');
		dhxDataProcessorStmmng010.setUpdated(rid, true, 'updated');
	}
	
};

var fn_gridSearchEmpButtonPM = function( rid ) {	
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButtonPM', rid);
};
var fn_CallbackGridSearchEmpButtonPM = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridStmmng010, rid, 'pmEmpno', data.empno, 'grid');
		gf_DhxSetValue(dhxGridStmmng010, rid, 'pmNm', data.korNm, 'grid');
		dhxDataProcessorStmmng010.setUpdated(rid, true, 'updated');
	}
	
};

var fn_gridSearchEmpButtonPL = function( rid ) {	
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButtonPL', rid);
};
var fn_CallbackGridSearchEmpButtonPL = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridStmmng010, rid, 'plEmpno', data.empno, 'grid');
		gf_DhxSetValue(dhxGridStmmng010, rid, 'plNm', data.korNm, 'grid');
		dhxDataProcessorStmmng010.setUpdated(rid, true, 'updated');
	}
	
};

var fn_gridSearchEmpButtonT1 = function( rid ) {	
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButtonT1', rid);
};
var fn_CallbackGridSearchEmpButtonT1 = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridStmmng010, rid, 'pmoEmpno', data.empno, 'grid');
		gf_DhxSetValue(dhxGridStmmng010, rid, 'pmoNm', data.korNm, 'grid');
		dhxDataProcessorStmmng010.setUpdated(rid, true, 'updated');
	}
	
};

var fn_gridSearchEmpButtonT2 = function( rid ) {	
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButtonT2', rid);
};
var fn_CallbackGridSearchEmpButtonT2 = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridStmmng010, rid, 'tftEmpno', data.empno, 'grid');
		gf_DhxSetValue(dhxGridStmmng010, rid, 'tftNm', data.korNm, 'grid');
		dhxDataProcessorStmmng010.setUpdated(rid, true, 'updated');
	}
};

var eXcell_searchEmpButton = function(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue = function(val){
        this.setCValue("<div id=''></div><img alt='' src='/xerp/img/icon_search4.png' style='cursor:pointer'>");                                      
    }
}
eXcell_searchEmpButton.prototype = new eXcell;// nests all other methods from the base class

var eXcell_datePickerButtonPS = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButtonPS.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDatePS = function (id, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridStmmng010, id, 'prearngeBeginDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorStmmng010.setUpdated(id, true, 'updated');
	}	
}

var eXcell_datePickerButtonPE = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButtonPE.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDatePE = function (id, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridStmmng010, id, 'prearngeEndDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorStmmng010.setUpdated(id, true, 'updated');
	}
}

var eXcell_datePickerButtonRS = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButtonRS.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateRS = function (id, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridStmmng010, id, 'realBeginDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorStmmng010.setUpdated(id, true, 'updated');
	}	
}

var eXcell_datePickerButtonRE = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButtonRE.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateRE = function (id, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridStmmng010, id, 'realEndDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorStmmng010.setUpdated(id, true, 'updated');
	}
}

var eXcell_datePickerButtonPM = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButtonPM.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDatePM = function (id, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridStmmng010, id, 'pmConfirmDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorStmmng010.setUpdated(id, true, 'updated');
	}	
}

var eXcell_datePickerButtonPL = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButtonPL.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDatePL = function (id, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridStmmng010, id, 'plConfirmDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorStmmng010.setUpdated(id, true, 'updated');
	}	
}

var eXcell_datePickerButtonT1 = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButtonT1.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateT1 = function (id, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridStmmng010, id, 'pmoConfirmDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorStmmng010.setUpdated(id, true, 'updated');
	}	
}

var eXcell_datePickerButtonT2 = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButtonT2.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateT2 = function (id, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridStmmng010, id, 'tftConfirmDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorStmmng010.setUpdated(id, true, 'updated');
	}	
};

//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(){
	var empno = "";
	var korNm = "";
	
	empno = gf_FormGetValue('searchFormStmmng010', 'chargerEmpno', 'text');
	korNm = gf_FormGetValue('searchFormStmmng010', 'chargerNm', 'text');
	
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : "1000"
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormStmmng010', 'chargerEmpno', data.empno, 'text');
 		gf_FormSetValue('searchFormStmmng010', 'chargerNm', data.korNm, 'text');
 	}
  	else {
	  	//Popup 호출
  		gf_EmpPopup('searchFormStmmng010', 'chargerEmpno', 'chargerNm', '1000', 'Y', null);
  	}
}