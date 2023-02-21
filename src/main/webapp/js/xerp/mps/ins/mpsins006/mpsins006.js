/**
 *    프로그램       : 사회보험보수월액 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.21
 *    사용테이블      : MPS_MT_SNLRCCHRGE
 * sourceGen version : 2020.06.29.01 (2020.07.21)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsins006 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsins006 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsins006 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsins006 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsins006 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsins006 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsins006 = 0;  //그리드 삭제 수량 

// 해당 년도 사회보험요율관리
var npnBsnmRt = 0; // 국민연금 근로자 비율
var npnLabrrRt = 0; // 국민연금 사업자 비율
var npnUplmtAmt = 0; // 국민연금 상한 금액
var npnLwltAmt = 0; // 국민연금 하한 금액

var hlthinsBsnmRt = 0; // 건강보험 사업자 비율
var hlthinsLabrrRt = 0; //건강보험 근로자 비율
var hlthinsLwltAmt = 0; //건강보험 하한 금액
var hlthinsUplmtAmt = 0; //건강보험 상한 금액

var ltciHlthinsRt = 0; // 장기요양보험 건강보험 비율
var ltciBsnmRt = 0; // 장기요양보험 사업자 비율
var ltciLabrrRt = 0; //장기요양보험 근로자 비율

var episAlotm = 0; // 고용보험 금액
var episLabrrRt = 0; // 고용보험 근로자 비율
var episBsnmRt = 0; // 고용보험 사업자 비율

var iaciTariff = 0; // 산재보험 요율
 
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
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsins006();
    cf_SetComponentsMpsins006();
    cf_SetEventListenerMpsins006();
    cf_InitFormMpsins006();
    cf_SetBindingMpsins006();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsins006 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsins006").validate({ errorElement: 'div', ignore: '' });
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
    //재직구분
    gf_ComboCode('divComboHffsSeBox', 'hffsSe', 'hffsSe', 'search', 'C278', '' , '', '', 'asc', '');
    
    $("#totalLabrrAmt").number(true);
    $("#totalBprprrAmt").number(true);

    // 액셀업로드버튼이벤트
    fn_FileUploadBtnEvent();
    
    $("#deptCodeNm").focus();
    
};

var dhxGridMpsins006;
var cf_SetComponentsMpsins006 = function() {
    var dhxGridMpsins006HeaderInfo = [];
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '*', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titApplcYy') */
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titFam1Tax') */
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('부서', '80', 'center', 'str', 'ro', false, 'deptCodeNm', '', '')); /* gf_LocaleTrans('default', 'titFam1Tax') */
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('직종', '80', 'center', 'str', 'coro', false, 'jssfcCode', '', '')); /* gf_LocaleTrans('default', 'titFam1Tax') */
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('국민연금', '75', 'center', 'date', 'dhxCalendarA', false, 'npnAcqsDe', '', ''));//취득일자
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonA',false,'datePickerButtonA',''));
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '70 ', 'right', 'int', 'edn', false, 'npnLabrrAmt', '', ''));//근로자 부담감
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '70', 'right', 'int', 'edn', false, 'npnBprprrAmt', '', ''));// 사업주 부담감
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '75', 'right', 'int', 'edn', false, 'marmNpnAmt', '', ''));//국민연금 보수월액
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('건강보험', '75', 'center', 'date', 'dhxCalendarA', false, 'hlthinsAcqsDe', '', ''));//취득일자
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonB',false,'datePickerButtonB',''));
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'right', 'int', 'edn', false, 'healthLabrrAmt', '', ''));//건강근로자부담금
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '75', 'right', 'int', 'edn', false, 'healthBprprrAmt', '', ''));//건강사업주부담금
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '55', 'center', 'str', 'ch', false, 'ltciRdcxptAt', '', ''));//장기요양감면
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '75', 'right', 'int', 'edn', false, 'rcperLabrrAmt', '', ''));//요양근로자부담금
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '75', 'right', 'int', 'edn', false, 'rcperBprprrAmt', '', ''));//요양사업주부담금
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '75', 'right', 'int', 'edn', false, 'marmHisrAmt', '', ''));//건강보험보수월액
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('고용보험', '80', 'center', 'date', 'dhxCalendarA', false, 'episAcqsDe', '', ''));//취득일자
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonC',false,'datePickerButtonC',''));
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'right', 'int', 'edn', false, 'laborLabrrAmt', '', ''));//고용근로자부담금
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '75', 'right', 'int', 'edn', false, 'laborBprprrAmt', '', ''));//고용사업주부담금
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '85', 'right', 'int', 'edn', false, 'iaciBprprrAmt', '', ''));//산재사업주부담금
    dhxGridMpsins006HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'right', 'int', 'edn', false, 'marmEpisAmt', '', ''));//고용보험보수월액
    
    
    
    var attachHeaderArr = [];
    attachHeaderArr.push(["#rspan","#rspan","#rspan","#rspan","#rspan", // 사원 / 성명 / 부서 / 직종    ----우리은행 IPS 
    	"취득일자","#cspan","근로자<br/>부담감","사업주<br/>부담금","보수월액",//국민연금
    	"취득일자","#cspan","건강근로자<br/>부담금","건강사업주<br/>부담금","장기<br/>요양<br/>감면","요양근로자<br/>부담금","요양사업주<br/>부담금","보수월액", // 건강보험
    	"취득일자","#cspan","고용근로자<br/>부담금","고용사업주<br/>부담금","산재사업주<br/>부담금","보수월액"]); // 고용보험
    
    dhxGridMpsins006 = gf_MakeDhxGrid('dataListMpsins006', dhxGridMpsins006HeaderInfo, false, true, false , attachHeaderArr);
    dhxGridMpsins006.enableAutoWidth(true);
    dhxGridMpsins006.setEditable(true);
    dhxGridMpsins006.setDateFormat("%Y-%m-%d", "%Y%m%d");
	
    dhxGridMpsins006.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("npnLabrrAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("npnBprprrAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("marmNpnAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("healthLabrrAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("healthBprprrAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("rcperLabrrAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("rcperBprprrAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("marmHisrAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("laborLabrrAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("laborBprprrAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("iaciBprprrAmt"), ".", ",");
    dhxGridMpsins006.setNumberFormat("0,000", dhxGridMpsins006.getColIndexById("marmEpisAmt"), ".", ",");
	
    // 직종
    var jssfcCodejsonParameter = {codekindCode : "C148",exceptCode :"",sortOrder :"asc" };
    var jssfcCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jssfcCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpsins006, dhxGridMpsins006.getColIndexById("jssfcCode"), jssfcCodedataSource.data, "sel");
    
};

var eventIdMpsins006 = [];
var cf_SetEventListenerMpsins006 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsins006 = gf_GridDetachEvent(dhxGridMpsins006, eventIdMpsins006);
    eventId = dhxGridMpsins006.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsins006();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsins006.getColumnsNum();
            var rowNum = dhxGridMpsins006.getRowsNum();
            var selectedId = dhxGridMpsins006.getSelectedRowId();
            var ind        = dhxGridMpsins006.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsins006.getRowIndex(selectedId);
            var type       = dhxGridMpsins006.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsins006.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsins006.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsins006.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsins006.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsins006.getSelectedRowId();
            var ind        = dhxGridMpsins006.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsins006.getRowIndex(selectedId);
            var type       = dhxGridMpsins006.getColType(ind);
            dhxGridMpsins006.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsins006.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsins006.getSelectedRowId();
            var ind        = dhxGridMpsins006.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsins006.getRowIndex(selectedId);
            var type       = dhxGridMpsins006.getColType(ind);
            dhxGridMpsins006.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsins006.editCell();
            }
        }
        else return true;
    });
    eventIdMpsins006.push(eventId);
    eventId = dhxGridMpsins006.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsins006SortGridList(ind, type, direction); 
    });
    eventIdMpsins006.push(eventId);
    eventId = dhxGridMpsins006.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsins006.push(eventId);
    eventId = dhxGridMpsins006.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpsins006.push(eventId);
    eventId = dhxGridMpsins006.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    
    var calendarEventIds = [];
    eventId1 = dhxGridMpsins006.attachEvent('onRowSelect', function(rId,cInd) {
    	
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpsins006, 'datePickerButtonA')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMpsins006, rId, 'npnAcqsDe', 'grid');	
    		var pos = dhxGridMpsins006.getPosition(this.cell);    		
    		dhxGridMpsins006._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMpsins006._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMpsins006._grid_calendarA.setDate(strGridDate);
    		dhxGridMpsins006._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMpsins006._grid_calendarA, calendarEventIds);    		
    		eventId1 = dhxGridMpsins006._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateA( rId, dhxGridMpsins006._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId1);    		
    	}
   		if(cInd == gf_GetDhxGridColumId(dhxGridMpsins006, 'datePickerButtonB')) { // calendar    		
   			var strGridDate2 = gf_DhxGetValue(dhxGridMpsins006, rId, 'hlthinsAcqsDe', 'grid');	
   			var pos = dhxGridMpsins006.getPosition(this.cell);    		
   			dhxGridMpsins006._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
   			dhxGridMpsins006._grid_calendarA.loadUserLanguage("ko");
   			dhxGridMpsins006._grid_calendarA.setDate(strGridDate2);
   			dhxGridMpsins006._grid_calendarA._show();    		
   			calendarEventIds = gf_GridDetachEvent(dhxGridMpsins006._grid_calendarA, calendarEventIds);    		
   			eventId1 = dhxGridMpsins006._grid_calendarA.attachEvent('onClick', function(date) { 
   				fn_gridPickerButtonSetDateB( rId, dhxGridMpsins006._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId1);    		
    		}
   	    if(cInd == gf_GetDhxGridColumId(dhxGridMpsins006, 'datePickerButtonC')) { // calendar    		
   	    	var strGridDate = gf_DhxGetValue(dhxGridMpsins006, rId, 'episAcqsDe', 'grid');	
   	    	var pos = dhxGridMpsins006.getPosition(this.cell);    		
   	    	dhxGridMpsins006._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
   	    	dhxGridMpsins006._grid_calendarA.loadUserLanguage("ko");
   	    	dhxGridMpsins006._grid_calendarA.setDate(strGridDate);
   	    	dhxGridMpsins006._grid_calendarA._show();    		
   	    	calendarEventIds = gf_GridDetachEvent(dhxGridMpsins006._grid_calendarA, calendarEventIds);    		
   	    	eventId1 = dhxGridMpsins006._grid_calendarA.attachEvent('onClick', function(date) { 
   	    		fn_gridPickerButtonSetDateC( rId, dhxGridMpsins006._grid_calendarA.getDate() );
   	    	});
   	    	calendarEventIds.push(eventId1);    		
   	    }    		  
    });
    
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsins006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsins006()
    });
    $('#btnSaveMpsins006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsins006();
    });
    $('#btnRemoveMpsins006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsins006();
    });
    $('#btnExcelMpsins006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsins006();
    });
    $('#btnSearchMpsins006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsins006('');
    });
    $('#btnResetMpsins006').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsins006();
    });
    // 액셀 양식 다운로드
    $('#btnExcelDownload').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelSampleMpsins006();
    });
    
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMpsins006 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "deptCode"){
        		return fn_SearchMhsEmpDeptCode();
        	} else if(this.id == "deptCodeNm"){
        		return fn_SearchMhsEmpDeptCode();
        	} else if(this.id == "empno"){
        		fn_SearchEmpCode("1");
        	} else if(this.id == "korNm"){
        		fn_SearchEmpCode("1");
        		return false;
        	} else{
        		$('#btnSearchMpsins006').click(); event.preventDefault(); return true;
        	} 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsins006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 사원, 부서 pop 이벤트 ===========================================================================================
	//사원 선택 Popup
    $('#searchFormMpsins006 #btnempnoSearchSearchFormMpsins006').unbind('click').bind('click', function(event){
    	gf_EmpPopup("searchFormMpsins006","empno","korNm", '1000', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpsins006', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpsins006', 'empno', '', 'text');
	    }
		
    });
    //부서 선택 Popup
	$('#searchFormMpsins006 #btnDeptCodeSearchSearchFormMpsins006').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMpsins006","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpsins006', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpsins006', 'deptCode', '', 'text');
	    }
    });
	
};

var cf_InitFormMpsins006 = function() {
    $('#searchFormMpsins006').resetForm();
    gf_FormSetValue('searchFormMpsins006', 'hffsSe','J01', 'combo') //재직구분을 첫 화면 표시할때 '재직'으로 기본 설정
};

var cf_SetBindingMpsins006 = function() {
    fn_SearchMpsins006('');
    fn_SearchapplcYy();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsins006 = function(userId) {
	
    var jsonParameter = {
    	deptCode : gf_FormGetValue('searchFormMpsins006', 'deptCode', 'text'),
        empno : gf_FormGetValue('searchFormMpsins006', 'empno', 'text'),
        hffsSe : gf_FormGetValue('searchFormMpsins006', 'hffsSe', 'combo') //재직구분
    };
    gf_Transaction(userId, 'mpsins006/searchMpsins006', jsonParameter, 'fn_CallbackSearchMpsins006', false, 'GET');
};
var fn_SearchapplcYy = function(userId) {
	//현재 년도를 가져온다
	var applcYy = gv_ComYear;
	var jsonParameter = {
        applcYy : applcYy
	};
	// 해당 년도로 사회보험요율 조회 
	gf_Transaction('', 'mpsbsc013/searchMpsbsc013', jsonParameter, 'fn_CallbackSearchapplcYy', false, 'GET');
}
var fn_CallbackSum = function(strSvcID, targetID, data) {
	data.data.records.forEach(function(row) {
		if(row.labrr == "근로자 부담금"){
			gf_FormSetValue('saveFormItem', 'totalLabrrAmt', row.totalLabrr, '');
		}
		if(row.bprprr =="사업자 부담금"){
			gf_FormSetValue('saveFormItem', 'totalBprprrAmt', row.totalBprprr, '');
		}
	});
}

var dhxDataProcessorMpsins006;
var fn_CallbackSearchMpsins006 = function(strSvcID, targetID, data) {
    dhxGridMpsins006.clearAll();
    fn_DhxDataProcessorMpsins006(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsins006');
        dhxGridMpsins006.parse(data.data.records, 'js');
        
        dhxGridMpsins006.forEachRow(function(rowId) {
			var empno = gf_DhxGetValue(dhxGridMpsins006, rowId, 'empno', 'grid');
			if (!gf_IsNull(empno)){
				dhxGridMpsins006.cells(rowId,4).setDisabled(true);
			}
	    });
        
        gf_Transaction('', 'mpsins006/findMpsinsSum', '', 'fn_CallbackSum', false, 'GET');
        
        if(save_Row_Ids_Mpsins006 == 0 && save_All_Sta_Mpsins006 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpsins006.selectRow(0); 
        } else if(save_Row_Sta_Mpsins006 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpsins006.selectRow(0);
        } else if(save_All_Sta_Mpsins006 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpsins006.selectRow(save_Row_Num_Mpsins006); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpsins006.selectRow(save_Row_Num_Mpsins006);   //개발자 수정 필요  
            //var findCell = dhxGridMpsins006.findCell(save_Row_Ids_Mpsins006, gf_GetDhxGridColumId(dhxGridMpsins006,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpsins006.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpsins006.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsins006');
    }
    $("#spanCntSearchFormMpsins006").text(data.data.records.length);
    cf_SetEventListenerMpsins006();
};
var fn_CallbackSearchapplcYy = function(strSvcID, targetID, data) {
    if(!gf_IsNull(data.data.records)){
    	
    	// 사회보험요율 data를 가져와서 반복문을 통해 전역변수에 선언한 값에 추가
    	data.data.records.forEach(function(row) {
    		npnBsnmRt = Number(row.npnBsnmRt); // 국민연금 근로자 비율
    		npnLabrrRt = Number(row.npnLabrrRt); // 국민연금 사업자 비율
    		npnUplmtAmt = Number(row.npnUplmtAmt); // 국민연금 상한 금액
    		npnLwltAmt = Number(row.npnLwltAmt); // 국민연금 하한 금액

    		hlthinsBsnmRt = Number(row.hlthinsBsnmRt); // 건강보험 사업자 비율
    		hlthinsLabrrRt = Number(row.hlthinsLabrrRt); //건강보험 근로자 비율
    		hlthinsLwltAmt = Number(row.hlthinsLwltAmt); //건강보험 하한 금액
    		hlthinsUplmtAmt = Number(row.hlthinsUplmtAmt); //건강보험 상한 금액

    		ltciHlthinsRt = Number(row.ltciHlthinsRt); // 장기요양보험 건강보험 비율
    		ltciBsnmRt = Number(row.ltciBsnmRt); // 장기요양보험 사업자 비율
    		ltciLabrrRt = Number(row.ltciLabrrRt); //장기요양보험 근로자 비율

    		
    		episBsnmRt = Number(row.episBsnmRt); // 고용보험 사업자 비율
    		episLabrrRt = Number(row.episLabrrRt); // 고용보험 근로자 비율
    		episAlotm = Number(row.episAlotm); // 고용보험 금액
    		
    		iaciTariff = Number(row.iaciTariff); // 산재보험 요율
    	});
    	
    	dhxGridMpsins006.attachEvent("onCellChanged",function(rId, cInd, value){
        	 if((cInd === gf_GetDhxGridColumId(dhxGridMpsins006,'marmNpnAmt')) || (cInd === gf_GetDhxGridColumId(dhxGridMpsins006,'marmHisrAmt')) || (cInd === gf_GetDhxGridColumId(dhxGridMpsins006,'marmEpisAmt'))){
        		 
        			 var marmNpnAmt = gf_DhxGetValue(dhxGridMpsins006,rId,'marmNpnAmt','grid'); // 국민보수월액 가져오기
            		 var npnLabrrAmt = gf_DhxGetValue(dhxGridMpsins006,rId,'npnLabrrAmt','grid'); // 근로자 부담감 가져오기
            		 
            			 if(marmNpnAmt < npnLwltAmt){
            				 gf_DivMsgAlert("국민연금 금액을 확인해 주세요. <br/> 하한 금액은&nbsp;"+npnLwltAmt +"&nbsp;입니다.");
//            				 gf_DhxSetValue(dhxGridMpsins006,rId,'npnLabrrAmt','0','grid'); // 국민연금 근로자부담금
//                    		 gf_DhxSetValue(dhxGridMpsins006,rId,'npnBprprrAmt','0','grid'); // 국민연금 사업주부담금
                    		 gf_DhxSetValue(dhxGridMpsins006,rId,'marmNpnAmt',npnLwltAmt,'grid');
                    		 var rowId = dhxGridMpsins006.getSelectedRowId();
                    		 var state = dhxDataProcessorMpsins006.getState(rowId);
                    		 dhxDataProcessorMpsins006.setUpdated(rowId, true, 'updated');
            		 	}else if(marmNpnAmt > npnUplmtAmt){
            		 		gf_DivMsgAlert("국민연금 금액을 확인해 주세요. <br/> 상한 금액은"+ npnUplmtAmt +"입니다.");
            		 		gf_DhxSetValue(dhxGridMpsins006,rId,'marmNpnAmt',npnUplmtAmt,'grid');
            		 		var rowId = dhxGridMpsins006.getSelectedRowId();
            		 		var state = dhxDataProcessorMpsins006.getState(rowId);
            		 		dhxDataProcessorMpsins006.setUpdated(rowId, true, 'updated');
            		 	}else{
            		 	// 가져온 값들을 그리드 Set으로 값 변경하기 
                   		 gf_DhxSetValue(dhxGridMpsins006,rId,'npnLabrrAmt',marmNpnAmt*(npnBsnmRt/100),'grid'); // 국민연금 근로자부담금
                   		 gf_DhxSetValue(dhxGridMpsins006,rId,'npnBprprrAmt',marmNpnAmt*(npnLabrrRt/100),'grid'); // 국민연금 사업주부담금
                   		 
                   		//Math.round(npnBprprrAmt); 반올림
            		 	}
            			 
            		 var marmHisrAmt = gf_DhxGetValue(dhxGridMpsins006,rId,'marmHisrAmt','grid'); // 건강보험 보수월액 가져오기
            		 if(marmHisrAmt < hlthinsLwltAmt){
            			 gf_DivMsgAlert("건강보험 금액을 확인해 주세요. <br/> 하한 금액은&nbsp;"+hlthinsLwltAmt +"&nbsp;입니다.");
            			 gf_DhxSetValue(dhxGridMpsins006,rId,'marmHisrAmt',hlthinsLwltAmt,'grid');
            			 var rowId = dhxGridMpsins006.getSelectedRowId();
                		 var state = dhxDataProcessorMpsins006.getState(rowId);
                		 dhxDataProcessorMpsins006.setUpdated(rowId, true, 'updated');
            		 }else if(marmHisrAmt > hlthinsUplmtAmt){
            			 gf_DivMsgAlert("건강보험 금액을 확인해 주세요. <br/> 하한 금액은&nbsp;"+hlthinsUplmtAmt +"&nbsp;입니다.");
            			 gf_DhxSetValue(dhxGridMpsins006,rId,'marmHisrAmt',hlthinsUplmtAmt,'grid');
            			 var rowId = dhxGridMpsins006.getSelectedRowId();
                		 var state = dhxDataProcessorMpsins006.getState(rowId);
                		 dhxDataProcessorMpsins006.setUpdated(rowId, true, 'updated');
            		 }else{
            			 gf_DhxSetValue(dhxGridMpsins006,rId,'healthLabrrAmt',marmHisrAmt*(hlthinsBsnmRt/100),'grid'); // 건강보험 사업주부담금
            			 gf_DhxSetValue(dhxGridMpsins006,rId,'healthBprprrAmt',marmHisrAmt*(hlthinsLabrrRt/100),'grid'); // 건강보험 근로자부담금
            			 gf_DhxSetValue(dhxGridMpsins006,rId,'rcperLabrrAmt',(marmHisrAmt*ltciHlthinsRt/100)/ltciLabrrRt,'grid'); // 장기요양 근로자부담금
            			 gf_DhxSetValue(dhxGridMpsins006,rId,'rcperBprprrAmt',(marmHisrAmt*ltciHlthinsRt/100)/ltciBsnmRt,'grid'); // 장기요양 근로자부담금
            		 }
            		 
            		 var marmEpisAmt = gf_DhxGetValue(dhxGridMpsins006,rId,'marmEpisAmt','grid'); // 고용보험 보수월액 가져오기
            		 if(marmEpisAmt < episAlotm){
            			 gf_DivMsgAlert("고용보험 금액을 확인해 주세요. <br/> 기본 금액은&nbsp;"+episAlotm +"&nbsp;입니다.");
            			 gf_DhxSetValue(dhxGridMpsins006,rId,'marmEpisAmt',episAlotm,'grid');
            			 var rowId = dhxGridMpsins006.getSelectedRowId();
                		 var state = dhxDataProcessorMpsins006.getState(rowId);
                		 dhxDataProcessorMpsins006.setUpdated(rowId, true, 'updated');
            		 }else {
            			 gf_DhxSetValue(dhxGridMpsins006,rId,'laborLabrrAmt',Math.round(marmEpisAmt*(episBsnmRt/100)),'grid'); // 고용보험 사업주부담금
            			 gf_DhxSetValue(dhxGridMpsins006,rId,'laborBprprrAmt',marmEpisAmt*(episLabrrRt/100),'grid'); // 고용보험 근로자부담금
            			 gf_DhxSetValue(dhxGridMpsins006,rId,'iaciBprprrAmt',marmEpisAmt*(iaciTariff/100),'grid'); // 고용보험 근로자부담금
            		 }
        	 	} 
        	});
    } 
    	
};
var fn_DhxDataProcessorMpsins006 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsins006 = new dataProcessor(gv_ContextPath+'/mpsins006/saveMpsins006'); //lock feed url
    dhxDataProcessorMpsins006.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsins006.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsins006.init(dhxGridMpsins006); //link dataprocessor to the grid
    dhxDataProcessorMpsins006.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsins006.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsins006.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsins006();
                    $("#checkAllMpsins006").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsins006SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsins006, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsins006', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsins006', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsins006, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsins006.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsins006', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsins006', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsins006, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsins006.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsins006', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsins006', 'sortColumId', '', 'text'); 
            dhxGridMpsins006.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsins006.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsins006', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsins006', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsins006, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsins006 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpsins006 = 0; 
    save_Edt_Cnt_Mpsins006 = 0; 
    save_Del_Cnt_Mpsins006 = 0; 
    dhxGridMpsins006.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsins006.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpsins006.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsins006 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsins006 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsins006 += 1; 
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
        save_All_Sta_Mpsins006 = 0; 
        if(save_Add_Cnt_Mpsins006 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsins006 + "건";
            save_All_Sta_Mpsins006 = 1; 
        } 
        if(save_Edt_Cnt_Mpsins006 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsins006 + "건"; 
        } 
        if(save_Del_Cnt_Mpsins006 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsins006 + "건"; 
            save_All_Sta_Mpsins006 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsins006(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsins006(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpsins006 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsins006_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsins006_Send = function() {
//    if(fn_GridValidation(dhxGridMpsins006, dhxDataProcessorMpsins006)) {
//        dhxDataProcessorMpsins006.sendData();
//    }
    dhxDataProcessorMpsins006.sendData();
}
/**
 * 삭제
 */
var fn_RemoveMpsins006 = function() {
    var rowId = dhxGridMpsins006.getSelectedRowId();
    var state = dhxDataProcessorMpsins006.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMpsins006.getRowIndex(rowId);
        dhxGridMpsins006.deleteRow(rowId);
        dhxGridMpsins006.selectRow(rowNum);
    }
    else dhxDataProcessorMpsins006.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsins006 = function () {
    var titMpsins006 = '사회보험보수월액'; /* gf_LocaleTrans('default', 'titMpsins006') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpsins006', 'empno', 'text')
    };
    var header = [[
        '적용년월' /* gf_LocaleTrans('default', 'titApplcYm') */,
        '보험번호' /* gf_LocaleTrans('default', 'titInsrncNo') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '공제일자' /* gf_LocaleTrans('default', 'titDdcDe') */,
        '국민연금 액' /* gf_LocaleTrans('default', 'titNpnAmt') */,
        '건강보험액' /* gf_LocaleTrans('default', 'titHlthinsAmt') */,
        '건강보험정산액' /* gf_LocaleTrans('default', 'titHlthinsExcclcAmt') */,
        '장기요약보험액' /* gf_LocaleTrans('default', 'titLtciAmt') */,
        '장기요약보험 정산금액' /* gf_LocaleTrans('default', 'titLtciExcclcAmt') */,
        '고용보험금액' /* gf_LocaleTrans('default', 'titEpisAmt') */,
        '산재보험금액' /* gf_LocaleTrans('default', 'titIaciAmt') */
    ]];
    var dataId = [[ 'applcYm', 'insrncNo', 'empno', 'ddcDe', 'npnAmt', 'hlthinsAmt', 'hlthinsExcclcAmt', 'ltciAmt', 'ltciExcclcAmt', 'episAmt', 'iaciAmt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsins006 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsins006;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsins006/excelMpsins006', jsonParameter);
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
    $('#saveFormMpsins006 #applcYmSaveFormMpsins006').parent().append(
    '<div class="error" id="applcYmSaveFormMpsins006-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsins006 #insrncNoSaveFormMpsins006').parent().append(
    '<div class="error" id="insrncNoSaveFormMpsins006-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsins006 #empnoSaveFormMpsins006').parent().append(
    '<div class="error" id="empnoSaveFormMpsins006-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsins006 = function(applcYm, insrncNo, empno){
    if(!gf_IsNull(applcYm) && !gf_IsNull(insrncNo) && !gf_IsNull(empno)) {
        var jsonParameter = {
            applcYm : applcYm,
            insrncNo : insrncNo,
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mpsins006/findMpsins006', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYm) && gf_IsNull(data.insrncNo) && gf_IsNull(data.empno)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMpsins006', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMpsins006', 'deptCodeNm', 'text');
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : gBplcCode
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}
function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
  if(!gf_IsNull(data.data.records) && totCnt == 1){
  	//단건
  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMpsins006', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMpsins006', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMpsins006","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpsins006', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpsins006', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMpsins006', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpsins006', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMpsins006', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpsins006', 'korNm', 'text');
	}
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : gBplcCode
	};
	gf_Transaction(gubun, 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}
function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	  	if(strSvcID == "1"){
	 		gf_FormSetValue('searchFormMpsins006', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpsins006', 'korNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMpsins006', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpsins006', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMpsins006', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMpsins006', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMpsins006","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMpsins006","empno","korNm", gBplcCode, "Y");
	  	}
  	}
	
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
		gf_DhxSetValue(dhxGridMpsins006, rId, 'npnAcqsDe', strDate.format('YYYYMMDD'), 'grid');
		dhxDataProcessorMpsins006.setUpdated(rId, true, 'updated');
	}	
}
//달력아이콘 함수들
var eXcell_datePickerButtonB = function(cell){ //the eXcell name is defined here
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

eXcell_datePickerButtonB.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateB = function (rId, strDate) {
	if(!gf_IsNull(strDate)){	
		gf_DhxSetValue(dhxGridMpsins006, rId, 'hlthinsAcqsDe', strDate.format('YYYYMMDD'), 'grid');
		dhxDataProcessorMpsins006.setUpdated(rId, true, 'updated');
	}	
}
//달력아이콘 함수들
var eXcell_datePickerButtonC = function(cell){ //the eXcell name is defined here
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

eXcell_datePickerButtonC.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateC = function (rId, strDate) {
	if(!gf_IsNull(strDate)){	
		gf_DhxSetValue(dhxGridMpsins006, rId, 'episAcqsDe', strDate.format('YYYYMMDD'), 'grid');
		dhxDataProcessorMpsins006.setUpdated(rId, true, 'updated');
	}	
}

/**
 * 엑셀 업로드
 */
//엑셀 업로드 양식
var fn_ExcelSampleMpsins006 = function () {
    var titMpsins006 = '사회보험보수월액양식'; /* gf_LocaleTrans('default', 'titMhshra001') */
    var jsonParameter = {
        empno : '999999'
    };
    var header = [[
    	'사원번호',
//    	'성명',
//    	'부서번호',
//        '직종',
        '국민연금 취득일자',
        '국민연금 근로자부담금',
        '국민연금 사업주부담금',
        '국민연금 보수월액',
        '건강보험 취득일자',
        '건강보험 건강근로자부담금',
        '건강보험 건강사업주부담금',
        '건강보험 장기요양감면',
        '건강보험 요양근로자부담금',
        '건강보험 요양사업주부담금',
        '건강보험 보수월액',
        '고용보험 취득일자',
        '고용보험 고용근로자부담금',
        '고용보험 고용사업주부담금',
        '고용보험 산재근로자부담금',
        '고용보험 보수월액'
    ]];
    var dataId = [[ 'empno', // 사원번호
    	'npnAcqsDe', 'npnLabrrAmt', 'npnBprprrAmt','marmNpnAmt',// 국민연금 입력란
    	'hlthinsAcqsDe', 'healthLabrrAmt', 'healthBprprrAmt','ltciRdcxptAt','rcperLabrrAmt','rcperBprprrAmt','marmHisrAmt',// 건강보험 입력란
    	'episAcqsDe','laborLabrrAmt','laborBprprrAmt','iaciBprprrAmt','marmEpisAmt'// 고용보험 입력란
    	]];
    var dataAlign = [[ 'center', // 사원번호
    	'center', 'center', 'center', 'center', // 국민연금 입력란 
    	'center', 'center', 'center','center','center','center','center', // 건강보험 입력란
    	'center','center','center','center','center', // 고용보험 입력란
    	]];
    var sheetNm = [[ titMpsins006 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsins006;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsins006/excelMpsins006', jsonParameter);
};
//엑셀 데이터 확인
var fn_FileUploadBtnEvent = function(){
	
	$('#btnFileUpload1').unbind("click").bind("click",function(event){
	    /*
		*  startRowNum : 엑셀파일에서 잃어들일 첫번째 라인의 번호
		 * maxRowNum : 엑셀파일에서 잃어들일 최대 라인의 번호, 0,null 입력 시 99999 으로 설정 됨
		 * colTitle : 리턴받을 컬럼ID 지정, 엑셀 다운로드한 그리드의 ID = 그리드 생성에 사용된 컬럼 ID를 구분자 "|"로 구분하여 순서대로 입역
		 *    ex:) "workTyCode|workTyCodeNm|useAt|bassTyAt|calcPd|coreTimeApplcAt|attendConfirmAt|dayRecogWorktime"
		 * dhxGrid : 엑셀파일 업로드 결과를 보여줄 그리드 ID, 그리드 자체를 넘겨야 함
		 * strCallbackFunc : callback 함수 이름
		 ****** dhxGrid 또는 callback 중 하나는 입력 되어야 함
		 ****** 업로드 받은 결과의 정합성은 각 프로그램별로 검증 해야 함 : 컬럼 수가 요청한 컬럼수보다 많으면 무조건 업로드 처리 하므로 다른 파일이 업로드 되도 성공으로 처리 함
		 */
		var startRowNum = 2;
	    var maxRowNum = null;
	    var colTitle = "empno|"+ // 사원번호
	    "npnAcqsDe|npnLabrrAmt|npnBprprrAmt|marmNpnAmt"+ // 국민연금 입력란
	    "|hlthinsAcqsDe|healthLabrrAmt|healthBprprrAmt|ltciRdcxptAt|rcperLabrrAmt|rcperBprprrAmt|marmHisrAmt"+ // 건강보험 입력란
	    "|episAcqsDe|laborLabrrAmt|laborBprprrAmt|iaciBprprrAmt|marmEpisAmt"; // 고용보험 입력란
	    //var dhxGrid = dhxGridMpscal016;
	    var strCallbackFunc = "fn_CallbackExcelUpload";
		gf_ExcelUpload (startRowNum, maxRowNum, colTitle, dhxGridMpsins006, strCallbackFunc);
	});
};

var fn_CallbackExcelUpload = function(data) {
	if(!gf_IsNull(data.data)){
		var str_req = "";
		for(var j=0; j<data.data.length; j++){
			var empno = data.data[j]["empno"];
			var npnAcqsDe = data.data[j]["npnAcqsDe"];
			var npnLabrrAmt = data.data[j]["npnLabrrAmt"];
			var npnBprprrAmt = data.data[j]["npnBprprrAmt"];
			var marmNpnAmt = data.data[j]["marmNpnAmt"];
			var hlthinsAcqsDe = data.data[j]["hlthinsAcqsDe"];
			var healthLabrrAmt = data.data[j]["healthLabrrAmt"];
			var healthBprprrAmt = data.data[j]["healthBprprrAmt"];
			var ltciRdcxptAt = data.data[j]["ltciRdcxptAt"];
			var rcperLabrrAmt = data.data[j]["rcperLabrrAmt"];
			var rcperBprprrAmt = data.data[j]["rcperBprprrAmt"];
			var marmHisrAmt = data.data[j]["marmHisrAmt"];
			var episAcqsDe = data.data[j]["episAcqsDe"];
			var laborLabrrAmt = data.data[j]["laborLabrrAmt"];
			var laborBprprrAmt = data.data[j]["laborBprprrAmt"];
			var iaciBprprrAmt = data.data[j]["iaciBprprrAmt"];
			var marmEpisAmt = data.data[j]["marmEpisAmt"];
			
			str_req +=  empno+","+npnAcqsDe+ ", " +npnLabrrAmt+ ", " +npnBprprrAmt+ ", "+marmNpnAmt+", " 
			+hlthinsAcqsDe+ ", " +healthLabrrAmt+ ", " +healthBprprrAmt+", "+ltciRdcxptAt+"," +rcperLabrrAmt+", " +rcperBprprrAmt+", " +marmHisrAmt+", " 
			+episAcqsDe+", " +laborLabrrAmt+", " +laborBprprrAmt+", " +iaciBprprrAmt+", " +marmEpisAmt+"|";
		
		
			var jsonParameter = {
					str_req : str_req
		    };
			var dataTest = gf_NoAsyncTransaction('mpsins006/checkDataMpsins006', jsonParameter, 'POST');
				
			//테스트처리
			if (dataTest.code == "000" || dataTest.data.code !== "000"){
                    gf_DivMsgAlert("성공하였습니다.");
                    gf_NoFoundDataOnGridMsgRemove('dataListMpsins006');
                    return true;
            } else {
                    gf_DivMsgAlert("실패하였습니다. <br/>액셀 양식을 확인해주세요. ");
                    gf_NoFoundDataOnGridMsgRemove('dataListMpsins006');
                    return false;
            }
		}

		    	dhxGridMpsins006.forEachRow(function (rId){
		        	dhxDataProcessorMpsins006.setUpdated(rId, true, 'inserted');
		    		state = dhxDataProcessorMpsins006.getState(rId);
		        });

		}
}


