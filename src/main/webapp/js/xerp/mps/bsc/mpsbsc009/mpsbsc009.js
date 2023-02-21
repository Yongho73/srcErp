/**
 *    프로그램       : 연봉계약관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.11
 *    사용테이블      : MPS_PAYMENT
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
    cf_InitParamMpsbsc009();
    cf_SetComponentsMpsbsc009();
    cf_SetEventListenerMpsbsc009();
    cf_InitFormMpsbsc009();
    cf_SetBindingMpsbsc009();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc009 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsbsc009").validate({ errorElement: 'div', ignore: '' });
    
    //사업장
	gf_MakeComboBasic('divComboBplcKorNm', 'searchComboStmBizplc', 'sel', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '');
	//재직구분 	: divId, selectId(지정ID),  selectName(지정명), placeHolder(=search or add), codekindCode, exceptCode(=코드), selectStyle, selectClass, sortOrder, required
	gf_ComboCode('divComboHffsSe', 'searchComboHffsSe', 'searchComboHffsSe', 'search', 'C278', '' , '', '', 'asc', '');
	
};

var dhxGridMpsbsc009;
var dhxGridDate;  //달력 sample


var cf_SetComponentsMpsbsc009 = function() {

	var dhxGridMpsbsc009MasterHeaderInfo = [];
	dhxGridMpsbsc009MasterHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로
	dhxGridMpsbsc009MasterHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titApplcYy') */
	dhxGridMpsbsc009MasterHeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titApplcYy') */
	dhxGridMpsbsc009MasterHeaderInfo.push(gf_MakeDhxGridHeader('부서', '*', 'left', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titApplcYy') */
	dhxGridMpsbsc009MasterHeaderInfo.push(gf_MakeDhxGridHeader('직급', '80', 'center', 'str', 'ro', false, 'clsfNm', '', '')); /* gf_LocaleTrans('default', 'titApplcYy') */	
	dhxGridMpsbsc009Master = gf_MakeDhxGrid('dataListMpsbsc009Master', dhxGridMpsbsc009MasterHeaderInfo, true, false, false);
    dhxGridMpsbsc009Master.enableAutoWidth(false);
    dhxGridMpsbsc009Master.setEditable(true);
    
    dhxGridMpsbsc009Master.setColumnMinWidth(100, 2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스    

    var dhxGridMpsbsc009HeaderInfo = [];
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
   dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc009" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('계약 번호', '100', 'center', 'str', 'ro', true, 'cntrctNo', '', '')); /* gf_LocaleTrans('default', 'titCntrctNo') */
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ed', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */    
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchImgButton',false,'searchEmpButton','',''));
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('계약일', '80', 'center', 'date', 'dhxCalendarA', false, 'cntrctDe', '', '')); /* gf_LocaleTrans('default', 'titCntrctDe') */
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'20','center','str','datePickerButtonC',false,'datePickerButtonC','',''));
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('계약시작일자', '80', 'center', 'date', 'dhxCalendarA', false, 'cntrctSdt', '', '')); /* gf_LocaleTrans('default', 'titCntrctSdt') */
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'20','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('계약종료일자', '80', 'center', 'date', 'dhxCalendarA', false, 'cntrctEdt', '', '')); /* gf_LocaleTrans('default', 'titCntrctEdt') */
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'20','center','str','datePickerButtonE',false,'datePickerButtonE','',''));
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('계약여부', '80', 'center', 'str', 'ch', false, 'cntrctAt', '', '')); /* gf_LocaleTrans('default', 'titCntrctAt') */
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('기본연봉', '*', 'right', 'int', 'edn', false, 'bassAmt', '', '')); /* gf_LocaleTrans('default', 'titBassAmt') */
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('직무급', '*', 'right', 'int', 'edn', false, 'dtyAmt', '', '')); /* gf_LocaleTrans('default', 'titDtyAmt') */
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('연봉월액', '*', 'right', 'int', 'edn', false, 'anslryAmt', '', '')); /* gf_LocaleTrans('default', 'titAnslryAmt') */
    dhxGridMpsbsc009HeaderInfo.push(gf_MakeDhxGridHeader('기본월액', '*', 'right', 'int', 'edn', false, 'mtamtAmt', '', '')); /* gf_LocaleTrans('default', 'titMtamtAmt') */    
    dhxGridMpsbsc009 = gf_MakeDhxGrid('dataListMpsbsc009', dhxGridMpsbsc009HeaderInfo, true, false, false);
    dhxGridMpsbsc009.enableAutoWidth(false);
    dhxGridMpsbsc009.setEditable(true);
    dhxGridMpsbsc009.setDateFormat("%Y-%m-%d");
    
    dhxGridMpsbsc009.setNumberFormat("0,000", dhxGridMpsbsc009.getColIndexById("bassAmt"), ".", ",");
    dhxGridMpsbsc009.setNumberFormat("0,000", dhxGridMpsbsc009.getColIndexById("dtyAmt"), ".", ",");
    dhxGridMpsbsc009.setNumberFormat("0,000", dhxGridMpsbsc009.getColIndexById("anslryAmt"), ".", ",");
    dhxGridMpsbsc009.setNumberFormat("0,000", dhxGridMpsbsc009.getColIndexById("mtamtAmt"), ".", ",");
    
    
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsbsc009 = new dataProcessor(gv_ContextPath+'/mpsbsc009/saveMpsbsc009'); //lock feed url
    dhxDataProcessorMpsbsc009.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsbsc009.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsbsc009.init(dhxGridMpsbsc009); //link dataprocessor to the grid
    dhxDataProcessorMpsbsc009.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsbsc009.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsbsc009.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsbsc009Master();
                    fn_SearchMpsbsc009();
                    $("#checkAllMpsbsc009").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
    
    dhxGridMpsbsc009.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
};

var eventIdMpsbsc009 = [];
var eventIdMpsbsc009Master = [];
var previousRowIdMaster;
var previousRowId;

var cf_SetEventListenerMpsbsc009 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsbsc009 = gf_GridDetachEvent(dhxGridMpsbsc009, eventIdMpsbsc009);
    eventId = dhxGridMpsbsc009.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsbsc009();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsbsc009.getColumnsNum();
            var rowNum = dhxGridMpsbsc009.getRowsNum();
            var selectedId = dhxGridMpsbsc009.getSelectedRowId();
            var ind        = dhxGridMpsbsc009.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc009.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc009.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsbsc009.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsbsc009.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsbsc009.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc009.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsbsc009.getSelectedRowId();
            var ind        = dhxGridMpsbsc009.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc009.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc009.getColType(ind);
            dhxGridMpsbsc009.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc009.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsbsc009.getSelectedRowId();
            var ind        = dhxGridMpsbsc009.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc009.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc009.getColType(ind);
            dhxGridMpsbsc009.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc009.editCell();
            }
        }
        else return true;
    });
    eventIdMpsbsc009.push(eventId);
    var calendarEventIds = [];
    eventId = dhxGridMpsbsc009.attachEvent('onRowSelect', function(rid, cind) {
    	if(cind == gf_GetDhxGridColumId(dhxGridMpsbsc009, 'searchEmpButton')) { 
    		fn_gridSearchEmpButton( rid );
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMpsbsc009, 'datePickerButtonS')) { // calendar
    		//alert('this')
    		var strGridDate = gf_DhxGetValue(dhxGridMpsbsc009, rid, 'cntrctSdt', 'grid');    		
    		if(gf_IsNull(strGridDate)){
    			strGridDate = gf_Date2StrDisplayFormat(new Date());
    		}
    	    	
    		var pos = dhxGridMpsbsc009.getPosition(this.cell);    		
    		dhxGridMpsbsc009._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMpsbsc009._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMpsbsc009._grid_calendarA.setDate(strGridDate);
    		dhxGridMpsbsc009._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMpsbsc009._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridMpsbsc009._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( rid, dhxGridMpsbsc009._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	}
    	else if(cind == gf_GetDhxGridColumId(dhxGridMpsbsc009, 'datePickerButtonE')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMpsbsc009, rid, 'cntrctEdt', 'grid');
    		var strGridDateSt = gf_DhxGetValue(dhxGridMpsbsc009, rid, 'cntrctSdt', 'grid');
    		if(gf_IsNull(strGridDate)){
    			if(gf_IsNull(strGridDateSt)){
        			strGridDate = gf_Date2StrDisplayFormat(new Date());
        		}
    			else{
    				strGridDate = strGridDateSt;
    			}
    		}
    		var pos = dhxGridMpsbsc009.getPosition(this.cell);    		
    		dhxGridMpsbsc009._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMpsbsc009._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMpsbsc009._grid_calendarA.setDate(strGridDate);
    		dhxGridMpsbsc009._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMpsbsc009._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridMpsbsc009._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateE( rid, dhxGridMpsbsc009._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	}
    	else if(cind == gf_GetDhxGridColumId(dhxGridMpsbsc009, 'datePickerButtonC')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMpsbsc009, rid, 'cntrctDe', 'grid');
    		var strGridDateSt = gf_DhxGetValue(dhxGridMpsbsc009, rid, 'cntrctDe', 'grid');
    		if(gf_IsNull(strGridDate)){
    			if(gf_IsNull(strGridDateSt)){
        			strGridDate = gf_Date2StrDisplayFormat(new Date());
        		}
    			else{
    				strGridDate = strGridDateSt;
    			}
    		}
    		var pos = dhxGridMpsbsc009.getPosition(this.cell);    		
    		dhxGridMpsbsc009._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMpsbsc009._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMpsbsc009._grid_calendarA.setDate(strGridDate);
    		dhxGridMpsbsc009._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMpsbsc009._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridMpsbsc009._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateC( rid, dhxGridMpsbsc009._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	}
    });
    eventIdMpsbsc009.push(eventId);
    
    eventId = dhxGridMpsbsc009.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsbsc009SortGridList(ind, type, direction); 
    });
    eventIdMpsbsc009.push(eventId);
    eventId = dhxGridMpsbsc009.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsbsc009.push(eventId);
    eventId = dhxGridMpsbsc009.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpsbsc009.push(eventId);
    eventId = dhxGridMpsbsc009.attachEvent("onEditCell", function(stage, id, ind, nValue, oValue){
    
    	if(ind == 13 || ind == 14) {
		    	var bassAmt 	= dhxGridMpsbsc009.cells(dhxGridMpsbsc009.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc009,'bassAmt')).getValue(); 
		    	var dtyAmt   	= dhxGridMpsbsc009.cells(dhxGridMpsbsc009.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc009,'dtyAmt')).getValue();
		    	var iBaseAmt = 0;
		    	var iDtyamt = 0;
		    	if(bassAmt == "") iBaseAmt 	=  0; 
		    	else  iBaseAmt = parseInt(bassAmt);
		        if(dtyAmt == "")    iDtyamt 	= 0;
		        else    	iDtyamt = parseInt(dtyAmt);
		        
		        var iTot = iBaseAmt + iDtyamt;
		        var anslryAmt = 0;
		        var mtamtAmt = 0;
		        var temp = 0;
		        //연봉월액계산  연봉월액 = (기본연봉  + 직무급) / 12 -- 천원이하 무조건 올림
		        if(iTot != 0){
		        	anslryAmt = Math.round(parseInt( iTot /12) / 1000) * 1000;
		        }
		        //기본월액계산  기본월액 = (기본연봉 / 12) -- 천원이하 무조건 올림
		        if(iBaseAmt != 0){
		        	mtamtAmt = Math.round(parseInt(iBaseAmt/12) /1000) * 1000 ;
		        }
				gf_DhxSetValue(dhxGridMpsbsc009, dhxGridMpsbsc009.getSelectedRowId(), 'anslryAmt', anslryAmt, 'grid');  //연봉월액
				gf_DhxSetValue(dhxGridMpsbsc009, dhxGridMpsbsc009.getSelectedRowId(), 'mtamtAmt', mtamtAmt, 'grid'); //기본월액
		       //console.log("anslryAmt  :" + anslryAmt);
		       //console.log("mtamtAmt : " + mtamtAmt);       
			   //console.log("ind : " + ind);
    	}
        return true;
    });    
    eventIdMpsbsc009.push(eventId);
    
    eventIdMaster = dhxGridMpsbsc009Master.attachEvent("onRowSelect", function(rId, cInd){
    	if(previousRowIdMaster==rId){
    		return false;
    	} else {
    		var isUpdated;
    		dhxGridMpsbsc009.forEachRow(function(rowId) {	
    			if(!gf_IsNull(dhxDataProcessorMpsbsc009.getState(rowId))) {
    				isUpdated = true;
    				return false;
    			}
    		});
    		if(isUpdated)
	    		gf_DivMsgConfirm('행을 변경하면 연봉계약내역이 초기화 됩니다.', 
						function(){ previousRowIdMaster = rId; fn_SearchMpsbsc009(); },
						function(){ dhxGridMpsbsc009Master.selectRowById(previousRowIdMaster); });
    		else {
    			previousRowIdMaster = rId; 
    			fn_SearchMpsbsc009();
    		}
    	}
    });
    eventIdMpsbsc009Master.push(eventId);
    
    
    // 버튼 이벤트 ==========================================================================================
    
    //사원팝업
	$('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMpsbsc009","empno","empNm", gf_FormGetValue('searchFormMpsbsc009', 'searchComboStmBizplc', 'combo'), "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
			
	    }
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
    });
    
    $('#btnAddMpsbsc009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsbsc009()
    });
    $('#btnSaveMpsbsc009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsbsc009();
    });
    $('#btnRemoveMpsbsc009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsbsc009();
    });
    $('#btnExcelMpsbsc009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsbsc009();
    });
    $('#btnSearchMpsbsc009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        dhxGridMpsbsc009Master.clearSelection();
        fn_SearchMpsbsc009Master();
        fn_SearchMpsbsc009('');
    });
    $('#btnResetMpsbsc009').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsbsc009();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpsbsc009').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpsbsc009, $('#checkAllMpsbsc009').prop('checked'), 'chk');
    });
    $('#cntrctNoSearchFormMpsbsc009').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpsbsc009').click(); event.preventDefault(); }
    });
    $('#empnoSearchFormMpsbsc009').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpsbsc009').click(); event.preventDefault(); }
    });
    $('#cntrctDeSearchFormMpsbsc009').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpsbsc009').click(); event.preventDefault(); }
    });
    $('#saveFormMpsbsc009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMpsbsc009 = function() {
    $('#searchFormMpsbsc009').resetForm();
    $("#applcYy1").val(gv_ComYear);
    $("#applcYy2").val(gv_ComYear);
};

var cf_SetBindingMpsbsc009 = function() {
	fn_SearchMpsbsc009Master();
	fn_SearchMpsbsc009('');    
};
var fn_gridPickerButtonSetDateC = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMpsbsc009, rid, 'cntrctDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMpsbsc009.setUpdated(rid, true, 'updated');
	}	
}

var fn_gridPickerButtonSetDateS = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMpsbsc009, rid, 'cntrctSdt', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMpsbsc009.setUpdated(rid, true, 'updated');
	}	
}

var fn_gridPickerButtonSetDateE = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMpsbsc009, rid, 'cntrctEdt', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMpsbsc009.setUpdated(rid, true, 'updated');
	}	
}




/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/

/**
 * 조회
 */
var fn_SearchMpsbsc009Master = function(userId) {
	
    var jsonParameter = {
        applcYm : gf_FormGetValue('searchFormMpsbsc009', 'applcYy', 'text'),
        bplcCode   : gf_FormGetValue('searchFormMpsbsc009', 'searchComboStmBizplc', 'combo'),        
        hffsSe         : gf_FormGetValue('searchFormMpsbsc009', 'searchComboHffsSe', 'combo'),
        empno        : gf_FormGetValue('searchFormMpsbsc009', 'empno', 'text'),
        applcYy1 : gf_FormGetValue('searchFormMpsbsc009', 'applcYy1', 'text'),
        applcYy2 : gf_FormGetValue('searchFormMpsbsc009', 'applcYy2', 'text')
        //clsfCode : gf_FormGetValue('searchFormMpsbsc007', 'clsfCode', 'text')
    };    
    gf_Transaction(userId, 'mpsbsc009/searchMpsbsc009Master', jsonParameter, 'fn_CallbackSearchMpsbsc009Master', false, 'GET');
};

/**
 * 조회
 */
var fn_SearchMpsbsc009 = function(userId) {
	
	var rowId  = dhxGridMpsbsc009Master.getSelectedRowId();
	var empno = gf_FormGetValue('searchFormMpsbsc009', 'empno', 'text');
	if(rowId == null);
	else {
		empno =  gf_DhxGetValue(dhxGridMpsbsc009Master, rowId, 'empno', 'grid');		
	}
	
	
    var jsonParameter = {
        cntrctNo : gf_FormGetValue('searchFormMpsbsc009', 'cntrctNo', 'text'),
        empno   : empno,
        cntrctDe : gf_FormGetValue('searchFormMpsbsc009', 'cntrctDe', 'text'),
        bplcCode   : gf_FormGetValue('searchFormMpsbsc009', 'searchComboStmBizplc', 'combo'),
        hffsSe   : gf_FormGetValue('searchFormMpsbsc009', 'searchComboHffsSe', 'combo'),
        applcYy1 : gf_FormGetValue('searchFormMpsbsc009', 'applcYy1', 'text'),
        applcYy2 : gf_FormGetValue('searchFormMpsbsc009', 'applcYy2', 'text')

    };
    gf_Transaction(userId, 'mpsbsc009/searchMpsbsc009', jsonParameter, 'fn_CallbackSearchMpsbsc009', false, 'GET');
};


var fn_CallbackSearchMpsbsc009 = function(strSvcID, targetID, data) {
    dhxGridMpsbsc009.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc009');
        dhxGridMpsbsc009.parse(data.data.records, 'js');
       
        dhxGridMpsbsc009.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc009');
    }
    
    $("#spanCntSearchFormMpsbsc009Detail").text(data.data.records.length);
    cf_SetEventListenerMpsbsc009();
};

var fn_CallbackSearchMpsbsc009Master = function(strSvcID, targetID, data) {
    dhxGridMpsbsc009Master.clearAll();    
    
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc009Master');
        dhxGridMpsbsc009Master.parse(data.data.records, 'js');        
        // 그리드입력 데이터프로세스 정의        
        //dhxGridMpsbsc007Master.selectRow(0);      
        //previousRowIdMaster = dhxGridMpsbsc007Master.getSelectedRowId();        
        //fn_SearchMpsbsc007();
        
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc009Master');
        gf_NoFoundDataOnGridMsg('dataListMpsbsc009');
    }    
    $('#spanCntSearchFormMpsbsc009').text(gf_NumberWithCommas(data.data.records.length));
   // cf_SetEventListenerMpsbsc007();
};

/**
 * 추가(신규) 
 */
var fn_AddMpsbsc009 = function() {
    dhxGridMpsbsc009.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //cntrctNo
    initValueArr.push(''); //empno
    initValueArr.push(''); //searchEmpButton
    initValueArr.push(''); //kornm
    initValueArr.push(''); //cntrctDe
    initValueArr.push(''); //cntrctSdt
    initValueArr.push(''); //cntrctSdt
    initValueArr.push(''); //cntrctEdt
    initValueArr.push(''); //cntrctEdt
    initValueArr.push(''); //cntrctAt
    initValueArr.push(''); //bassAmt
    initValueArr.push(''); //dtyAmt
    initValueArr.push(''); //mtamtAmt
    initValueArr.push(''); //anslryAmt
    dhxGridMpsbsc009.addRow(dhxGridMpsbsc009.uid(), initValueArr, 0);
    dhxGridMpsbsc009.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc009');
    $('#btnPopEmpSearchMpsbsc009').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsbsc009SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsbsc009, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsbsc009', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsbsc009', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsbsc009, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsbsc009.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsbsc009', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsbsc009', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc009, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsbsc009.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsbsc009', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsbsc009', 'sortColumId', '', 'text'); 
            dhxGridMpsbsc009.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsbsc009.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsbsc009', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsbsc009', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc009, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsbsc009 = function() {
  
	var edCnt = 0;
    dhxGridMpsbsc009.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsbsc009.getState(rowId))) {
            edCnt++;
        }
    });    
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        gf_DivMsgConfirm(gv_QueSave, 'fn_SaveMpsbsc009_Send()', '');
    }
}
var fn_SaveMpsbsc009_Send = function() {
   if(fn_GridValidation(dhxGridMpsbsc009, dhxDataProcessorMpsbsc009)){
        dhxDataProcessorMpsbsc009.sendData();
   }
}
/**
 * 삭제
 */
var fn_RemoveMpsbsc009 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsbsc009, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 행을 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpsbsc009.forEachRow(function(rowId) {
            state = dhxDataProcessorMpsbsc009.getState(rowId);
            if(dhxGridMpsbsc009.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsbsc009, 'chk')).isChecked()){
                if(state == 'inserted') dhxGridMpsbsc009.deleteRow(rowId);
                else dhxDataProcessorMpsbsc009.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc009 = function () {
    var titMpsbsc009 = '연봉계약관리'; /* gf_LocaleTrans('default', 'titMpsbsc009') */
    var jsonParameter = {
        cntrctNo : gf_FormGetValue('searchFormMpsbsc009', 'cntrctNo', 'text'),
        empno : gf_FormGetValue('searchFormMpsbsc009', 'empno', 'text'),
        cntrctDe : gf_FormGetValue('searchFormMpsbsc009', 'cntrctDe', 'text')
    };
    var header = [[
        '계약 번호' /* gf_LocaleTrans('default', 'titCntrctNo') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '성명' /* gf_LocaleTrans('default', 'titEmpno') */,
        '계약일' /* gf_LocaleTrans('default', 'titCntrctDe') */,
        '계약시작일자' /* gf_LocaleTrans('default', 'titCntrctSdt') */,
        '계약종료일자' /* gf_LocaleTrans('default', 'titCntrctEdt') */,
        '계약여부' /* gf_LocaleTrans('default', 'titCntrctAt') */,
        '기본급' /* gf_LocaleTrans('default', 'titBassAmt') */,
        '직무급' /* gf_LocaleTrans('default', 'titDtyAmt') */,
        '연봉월액' /* gf_LocaleTrans('default', 'titAnslryAmt') */,
        '기본월액' /* gf_LocaleTrans('default', 'titMtamtAmt') */
    ]];
    var dataId = [[ 'cntrctNo', 'empno',  'korNm', 'cntrctDe', 'cntrctSdt', 'cntrctEdt', 'cntrctAt', 'bassAmt', 'dtyAmt', 'mtamtAmt', 'anslryAmt' ]];
    var dataAlign = [[ 'center', 'center', 'center','center', 'center', 'center', 'center', 'right ', 'right', 'right', 'right' ]];
    var sheetNm = [[ titMpsbsc009 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc009;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc009/excelMpsbsc009', jsonParameter);
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
    $('#saveFormMpsbsc009 #cntrctNoSaveFormMpsbsc009').parent().append(
    '<div class="error" id="cntrctNoSaveFormMpsbsc009-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsbsc009 #empnoSaveFormMpsbsc009').parent().append(
    '<div class="error" id="empnoSaveFormMpsbsc009-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsbsc009 #cntrctDeSaveFormMpsbsc009').parent().append(
    '<div class="error" id="cntrctDeSaveFormMpsbsc009-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsbsc009 = function(cntrctNo, empno, cntrctDe){
    if(!gf_IsNull(cntrctNo) && !gf_IsNull(empno) && !gf_IsNull(cntrctDe)) {
        var jsonParameter = {
            cntrctNo : cntrctNo,
            empno : empno,
            cntrctDe : cntrctDe
        };
        var dataSource = gf_NoAsyncTransaction('mpsbsc009/findMpsbsc009', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.cntrctNo) && gf_IsNull(data.empno) && gf_IsNull(data.cntrctDe)) {
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
    var checkCntrctNo;
    var checkEmpno;
    var checkCntrctDe;
    
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);        
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {            	
                //if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'cntrctNo', 'grid') )){
                //    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cntrctNo');
                //    valid = false;
                //}
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'cntrctDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cntrctDe');
                    valid = false;
                }
                if(state == 'inserted') {
                    checkCntrctNo = gf_DhxGetValue(dhxGridObjet, rowId, 'cntrctNo', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    checkCntrctDe = gf_DhxGetValue(dhxGridObjet, rowId, 'cntrctDe', 'grid');
                    
                    if(!gf_IsNull(checkCntrctNo, checkEmpno, checkCntrctDe)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var cntrctNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'cntrctNo', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var cntrctDe = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'cntrctDe', 'grid');
                            if(((cntrctNo == checkCntrctNo) && (empno == checkEmpno) && (cntrctDe == checkCntrctDe)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cntrctNo');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cntrctDe');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpsbsc009( checkCntrctNo, checkEmpno, checkCntrctDe )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cntrctNo');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cntrctDe');
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
        dhxGridMpsbsc009.selectRowById(validFalseFistRowId);
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

//////////////////검색바

//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormMpsbsc009', 'empno', 'text'),
		    korNm : gf_FormGetValue('searchFormMpsbsc009', 'empNm', 'text'),
		    bplcCode : gf_FormGetValue('searchFormMpsbsc009', 'searchComboStmBizplc', 'combo') //사업장
	};
	
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
	
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
		gf_FormSetValue('searchFormMpsbsc009', 'empno', data.empno, 'text');
		gf_FormSetValue('searchFormMpsbsc009', 'empNm', data.korNm, 'text');
	} else {
	  	//Popup 호출d
		gf_EmpPopup("searchFormMpsbsc009","empno","empNm", gf_FormGetValue('searchFormMpsbsc009', 'searchComboStmBizplc', 'combo'), "Y", null);
	}
	
}


var fn_gridSearchEmpButton = function( rid ) {	
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButton', rid);
};
var fn_CallbackGridSearchEmpButton = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridMpsbsc009, rid, 'empno', data.empno, 'grid');
		gf_DhxSetValue(dhxGridMpsbsc009, rid, 'korNm', data.korNm, 'grid');
	}
};

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
var fn_gridPickerButtonSetDateC = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMpsbsc009, rid, 'cntrctDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMpsbsc009.setUpdated(rid, true, 'updated');
	}	
}

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
var fn_gridPickerButtonSetDateS = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMpsbsc009, rid, 'cntrctSdt', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMpsbsc009.setUpdated(rid, true, 'updated');
	}	
}

var eXcell_datePickerButtonE = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButtonE.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateE = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMpsbsc009, rid, 'cntrctEdt', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMpsbsc009.setUpdated(rid, true, 'updated');
	}	
}