/**
 *    프로그램       : 호봉테이블등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.09
 *    사용테이블      : MPS_SRCLSTBLDETAIL
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var dhxDataProcessorMpsbsc007Master;
var dhxGridMpsbsc007HeaderInfo = [];


/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsbsc007();
    cf_SetComponentsMpsbsc007();
    cf_SetEventListenerMpsbsc007();
    cf_InitFormMpsbsc007();
    cf_SetBindingMpsbsc007();
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/


var gridTitleHeader ="";
var gridTitleDataId ="";
var gridTitleDataAlign = "";
var gridTitleClsfCode = "";

var addCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
//모든 콤마 제거
var removeCommas = function(x) {
    if(!x || x.length == 0) return "";
    else return x.split(",").join("");
};

var cf_InitParamMpsbsc007 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsbsc007").validate({ errorElement: 'div', ignore: '' });
    
    $(".numType").on("keyup", function() {
    	 $(this).val($(this).val().replace(/[^0-9]/g,""));    	 
    });    
    $(".moneyType").on("keyup", function() {
        $(this).val(addCommas($(this).val().replace(/[^0-9]/g,"")));
    });
    $(".numOutType").on("focus", function() {
        var x = $(this).val();
        x = removeCommas(x);
        $(this).val(x);
    	}).on("focusout", function() {
        var x = $(this).val();
        if(x && x.length > 0) {
            if(!$.isNumeric(x)) {
                x = x.replace(/[^0-9]/g,"");
            }
            x = addCommas(x);
            $(this).val(x);
        	}
    	}).on("keyup", function() {
        $(this).val($(this).val().replace(/[^0-9]/g,""));
   });
};


var dhxGridDate;  //달력 sample


var dhxGridMpsbsc007;
var cf_SetComponentsMpsbsc007 = function() {
	
	var dhxGridMpsbsc007MasterHeaderInfo = [];
	dhxGridMpsbsc007MasterHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로
	dhxGridMpsbsc007MasterHeaderInfo.push(gf_MakeDhxGridHeader('적용시작년월', '100', 'center', 'date', 'dhxCalendarA', false, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */	
	dhxGridMpsbsc007MasterHeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
	dhxGridMpsbsc007MasterHeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', '', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
	dhxGridMpsbsc007MasterHeaderInfo.push(gf_MakeDhxGridHeader('MAX적용시작년월', '', '', 'str', 'ed', true, 'maxApplcYm', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
	dhxGridMpsbsc007Master = gf_MakeDhxGrid('dataListMpsbsc007Master', dhxGridMpsbsc007MasterHeaderInfo, true, false, false);
    dhxGridMpsbsc007Master.enableAutoWidth(false);
    dhxGridMpsbsc007Master.setEditable(true);
    dhxGridMpsbsc007Master.setDateFormat("%Y-%m");
    
    dhxGridMpsbsc007Master.setColumnMinWidth(100, 2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스    
    
    //dhxGridMpsbsc007HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('적용 년월', '0', 'center', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMpsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('호봉', '*', 'center', 'str', 'ro', false, 'srclsCode', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMpsbsc007 = gf_MakeDhxGrid('dataListMpsbsc007', dhxGridMpsbsc007HeaderInfo, true, false, false);
    dhxGridMpsbsc007.enableAutoWidth(false);
    dhxGridMpsbsc007.setEditable(true);
    dhxGridMpsbsc007.setColumnMinWidth(200, 2); //넓이가 * 인 컬럼의 최소 넓이값 설정
    
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsbsc007 = new dataProcessor(gv_ContextPath+'/mpsbsc007/saveMpsbsc007'); //lock feed url
    dhxDataProcessorMpsbsc007.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsbsc007.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsbsc007.init(dhxGridMpsbsc007); //link dataprocessor to the grid
    dhxDataProcessorMpsbsc007.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsbsc007.styles = {
                        updated:        "font-weight:normal;text-decoration:none;",
                        inserted:       "font-weight:bold; color:green;",
                        deleted:        "color:orange; text-decoration:line-through;",
                        invalid:        "color:green; text-decoration:underline;",
                        error:          "color:blue; text-decoration:underline;",
                        clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsbsc007.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsbsc007();
                    $("#checkAllMpsbsc007").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
    dhxGridMpsbsc007.setColumnMinWidth(100, 3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스       
};

var eventIdMpsbsc007Master = [];
var eventIdMpsbsc007 = [];

var previousRowIdMaster;
var previousRowId;

var cf_SetEventListenerMpsbsc007 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    var eventIdMaster;
    
    eventIdMpsbsc007 = gf_GridDetachEvent(dhxGridMpsbsc007, eventIdMpsbsc007);
    eventId = dhxGridMpsbsc007.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsbsc007();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsbsc007.getColumnsNum();
            var rowNum = dhxGridMpsbsc007.getRowsNum();
            var selectedId = dhxGridMpsbsc007.getSelectedRowId();
            var ind        = dhxGridMpsbsc007.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc007.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc007.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsbsc007.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsbsc007.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsbsc007.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc007.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsbsc007.getSelectedRowId();
            var ind        = dhxGridMpsbsc007.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc007.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc007.getColType(ind);
            dhxGridMpsbsc007.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc007.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsbsc007.getSelectedRowId();
            var ind        = dhxGridMpsbsc007.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc007.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc007.getColType(ind);
            dhxGridMpsbsc007.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc007.editCell();
            }
        }
        else return true;
    });
    eventIdMpsbsc007.push(eventId);
    eventId = dhxGridMpsbsc007.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsbsc007SortGridList(ind, type, direction); 
    });
    eventIdMpsbsc007.push(eventId);
    eventId = dhxGridMpsbsc007.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsbsc007.push(eventId);
    eventId = dhxGridMpsbsc007.attachEvent("onRowSelect", function(id, ind){
    	
        return true;
    });
    eventIdMpsbsc007.push(eventId);
    eventId = dhxGridMpsbsc007.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpsbsc007.push(eventId);
    
    var calendarEventIds = [];
    eventIdMaster = dhxGridMpsbsc007Master.attachEvent("onRowSelect", function(rId, cInd){
    	if(previousRowIdMaster==rId){
    		return false;
    	}
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpsbsc007Master, 'datePickerButtonS')) { // calendar    		
    		var state = dhxDataProcessorMpsbsc007Master.getState(rId);    		
    		if(state=="") return false
    		
    		var strGridDate = gf_DhxGetValue(dhxGridMpsbsc007Master, rId, 'applcYm', 'grid');  
    		
    		if(gf_IsNull(strGridDate)){
    			strGridDate = gf_Date2StrDisplayFormat(new Date());
    		}
    
    		var pos = dhxGridMpsbsc007Master.getPosition(this.cell);    		
    		dhxGridMpsbsc007Master._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMpsbsc007Master._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMpsbsc007Master._grid_calendarA.setDate(strGridDate);
    		dhxGridMpsbsc007Master._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMpsbsc007Master._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridMpsbsc007Master._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( rId, dhxGridMpsbsc007Master._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	} else {
    		var isUpdated;
    		dhxGridMpsbsc007.forEachRow(function(rowId) {	
    			if(!gf_IsNull(dhxDataProcessorMpsbsc007.getState(rowId))) {
    				isUpdated = true;
    				return false;
    			}
    		});
    		if(isUpdated)
	    		gf_DivMsgConfirm('행을 변경하면 호봉테이블이 초기화 됩니다.', 
						function(){ previousRowIdMaster = rId; fn_SearchMpsbsc007(); },
						function(){ dhxGridMpsbsc007Master.selectRowById(previousRowIdMaster); });
    		else {
    			previousRowIdMaster = rId; 
    			fn_SearchMpsbsc007();
    		}
    	}
    });
    eventIdMpsbsc007Master.push(eventId);
    
    // 버튼 이벤트 ==========================================================================================       
    $('#btnAddMpsbsc007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        gf_DivMsgAlert('새로운 적용시작년월 등록시에 <br> 마지막 적용시작년월의 호봉내역이 복사됩니다.');
        fn_AddMpsbsc007Master();
    });
    $('#btnSaveMpsbsc007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsbsc007Master();
    });
    /*
    $('#btnSaveMpsbsc007Detail').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsbsc007();
    });*/
    // 호봉인상
    $('#btnHobRasieMpsbsc007Detail').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
		var stmBizplcCode = '';
		gf_HobRasisePopup("detailTopForm","dispDeptCode","dispDeptCodeNm", stmBizplcCode, "N", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
        //alert('호봉인상팝업');
        //fn_SaveMpsbsc007();
    });
    
    $('#btnRemoveMpsbsc007').unbind('click').bind('click', function() {
        gf_errorMsgClear();        
        var selectedId = dhxGridMpsbsc007Master.getSelectedRowId();
       
        if (selectedId<=0){
              gf_DivMsgAlert('삭제할 행을 선택해 주세요.');
              return false;
          } else {
              var state = dhxDataProcessorMpsbsc007Master.getState(selectedId);
              if(state == 'inserted') dhxGridMpsbsc007Master.deleteRow(selectedId);
              else {
            	  var applcYm 	= dhxGridMpsbsc007Master.cells(dhxGridMpsbsc007Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc007Master,'applcYm')).getValue().replace('-','');
            	  var maxApplcYm 	= dhxGridMpsbsc007Master.cells(dhxGridMpsbsc007Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc007Master,'maxApplcYm')).getValue().replace('-','');            	  
            	  if(applcYm != maxApplcYm){
            		  gf_DivMsgAlert('마지막으로 등록된 데이터만 삭제할 수 있습니다.');
                      return false;
            	  }
            	  else    gf_DivMsgConfirm('연관된 호봉테이블도 삭제됩니다.<br> 그래도 삭제하시겠습니까?', 'fn_RemoveMpsbsc007Master()', '');
              }
          }
    });
    $('#btnExcelMpsbsc007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsbsc007();
    });
    $('#btnSearchMpsbsc007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsbsc007Master('');
    });
    //초기화
    $('#btnResetMpsbsc007').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsbsc007();
    });

    $('#applcYmSearchFormMpsbsc007').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpsbsc007').click(); event.preventDefault(); }
    });
    $('#clsfCodeSearchFormMpsbsc007').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpsbsc007').click(); event.preventDefault(); }
    });
    $('#saveFormMpsbsc007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMpsbsc007 = function() {
    $('#searchFormMpsbsc007').resetForm();
    $("#applcYmSearchFormMpsbsc007").val(gv_ComYear);
};

var cf_SetBindingMpsbsc007 = function() {
    fn_SearchMpsbsc007Master('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/


/**
 * 추가(신규) 
 */
var fn_AddMpsbsc007Master = function() {
    dhxGridMpsbsc007Master.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //applcYm
    initValueArr.push(''); //calendar
    initValueArr.push(''); //rm
    dhxGridMpsbsc007Master.addRow(dhxGridMpsbsc007Master.uid(), initValueArr, 0);
    dhxGridMpsbsc007Master.selectRow(0);
    previousRowIdMaster = dhxGridMpsbsc007Master.getSelectedRowId();
    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc007Master');
    
    dhxGridMpsbsc007.clearAll(); //2번째 GRID 초기화 
}


/**
 * 조회
 */
var fn_SearchMpsbsc007Master = function(userId) {
	
    var jsonParameter = {
        applcYm : gf_FormGetValue('searchFormMpsbsc007', 'applcYm', 'text')
        //clsfCode : gf_FormGetValue('searchFormMpsbsc007', 'clsfCode', 'text')
    };
    
    gf_Transaction(userId, 'mpsbsc007/searchMpsbsc007Master', jsonParameter, 'fn_CallbackSearchMpsbsc007Master', false, 'GET');
    
    dhxDataProcessorMpsbsc007Master = new dataProcessor(gv_ContextPath+'/mpsbsc007/saveMpsbsc007Master'); //lock feed url
    dhxDataProcessorMpsbsc007Master.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsbsc007Master.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsbsc007Master.init(dhxGridMpsbsc007Master); //link dataprocessor to the grid
    dhxDataProcessorMpsbsc007Master.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsbsc007Master.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsbsc007Master.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsbsc007Master();
                    $("#checkAllMpsbsc007").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    }); 
    
};

var fn_CallbackSearchMpsbsc007Master = function(strSvcID, targetID, data) {
	
    dhxGridMpsbsc007Master.clearAll();    
    
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc007Master');
        dhxGridMpsbsc007Master.parse(data.data.records, 'js');        
        // 그리드입력 데이터프로세스 정의
        dhxGridMpsbsc007Master.selectRow(0);      
        previousRowIdMaster = dhxGridMpsbsc007Master.getSelectedRowId();        
        fn_SearchMpsbsc007();
        
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc007Master');
        gf_NoFoundDataOnGridMsg('dataListMpsbsc007');
    }    
    $('#spanCntSearchFormMpsbsc007').text(gf_NumberWithCommas(data.data.records.length));
   // cf_SetEventListenerMpsbsc007();
};


/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsbsc007Master = function() {
    var edCntMaster = 0;
    var edCntDetail = 0;
    
    dhxGridMpsbsc007Master.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsbsc007Master.getState(rowId))) {
        	edCntMaster++;
        }
    });
    
    dhxGridMpsbsc007.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsbsc007.getState(rowId))) {
        	edCntDetail++;
        }
    });    
    
    if((edCntMaster + edCntDetail )== 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        gf_DivMsgConfirm(gv_QueSave, 'fn_SaveMpsbsc007Master_Send()', '');
    }
}
var fn_SaveMpsbsc007Master_Send = function() {	
    if(fn_GridValidationMaster(dhxGridMpsbsc007Master, dhxDataProcessorMpsbsc007Master)) {    	
        dhxDataProcessorMpsbsc007Master.sendData();
    }
    //if(fn_GridValidation(dhxGridMpsbsc007, dhxDataProcessorMpsbsc007)) {
    	dhxDataProcessorMpsbsc007.sendData();
    //}
}
/**
 * 삭제
 */
var fn_RemoveMpsbsc007Master = function() {
	var applcYm 	= dhxGridMpsbsc007Master.cells(dhxGridMpsbsc007Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc007Master,'applcYm')).getValue().replace('-',''); 
    var jsonParameter = {
		applcYm : applcYm
    };
    var dataSource = gf_NoAsyncTransaction('mpsbsc007/removeMpsbsc007Master', jsonParameter, 'POST');
    if(dataSource.code === '000') {
		dhxGridMpsbsc007Master.clearAll();
		dhxGridMpsbsc007.clearAll();    	
    	fn_SearchMpsbsc007Master();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
}

/**
 * 조회
 */
var fn_SearchMpsbsc007 = function(userId) {		
	
	var applcYm = dhxGridMpsbsc007Master.cells(dhxGridMpsbsc007Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc007Master,'applcYm')).getValue();
	applcYm = applcYm.replace('-','');	
	
	  var jsonParameter = {
		      applcYm : applcYm
	  };	  	 
	  
	  gf_Transaction(userId, 'mpsbsc007/selectMpsbsc007ClsfCode', jsonParameter, 'fn_CallbackSearchMpsbsc007ClsfCode', false, 'GET');
};

var dhxDataProcessorMpsbsc007;
var fn_CallbackSearchMpsbsc007 = function(strSvcID, targetID, data) {
	
    dhxGridMpsbsc007.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc007');
        dhxGridMpsbsc007.parse(data.data.records, 'js');
        
        dhxGridMpsbsc007.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc007');
    }
    $("#spanCntSearchFormMpsbsc007Detail").text(data.data.records.length);
    //cf_SetEventListenerMpsbsc007();
};


var fn_CallbackSearchMpsbsc007ClsfCode = function(strSvcID, targetID, data) {	
	
    dhxGridMpsbsc007.clearAll();    
    dhxGridMpsbsc007HeaderInfo = []; 
    dhxGridMpsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('적용 년도', '0', 'center', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMpsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('호봉', '*', 'center', 'str', 'ro', false, 'srclsCode', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
        
    var clsfCode = "";
    //직급코드_타이틀 출력    
    gridTitleHeader    = "[['적용년월','호봉'";
    gridTitleDataAlign = "[['center','center'";
    gridTitleDataId = "[['applcYm','srclsCode'";
    for(var i=0; i < data.data.length; i++){    
    	if(i == 0)  clsfCode = "'" +  data.data[i].clsfCode  +"' " ; // + data.data[i].clsfCode  ;
    	else         clsfCode = clsfCode + ",'" +  data.data[i].clsfCode  +"'  " ; // + data.data[i].clsfCode   ;
    	gridTitleHeader = gridTitleHeader + ", '" + data.data[i].clsfNm + "'";
    	gridTitleDataId  =  gridTitleDataId  + ",  '\\'" + data.data[i].clsfCode + "\\''"; 
    //	  gridTitleDataId= [['applcYm','srclsCode', '\'001\'',  '\'002\'', '\'003\'']];
    	
    	gridTitleDataAlign = gridTitleDataAlign + ", 'right' ";
    	//console.log("C" +  data.data[i].clsfCode);
    	dhxGridMpsbsc007HeaderInfo.push(gf_MakeDhxGridHeader(data.data[i].clsfNm , '120', 'right', 'int', 'edn', false,   "'" +  data.data[i].clsfCode+ "'" , '', '')); 
   	//dhxGridMpsbsc007HeaderInfo.push(gf_MakeDhxGridHeader(data.data[i].clsfNm , '120', 'right', 'int', 'edn', false,   "C" +  data.data[i].clsfCode , '', '')); /* gf_LocaleTrans('default', 'titGrad1') */    
    }
    gridTitleHeader = gridTitleHeader + "]];"
    gridTitleDataId = gridTitleDataId + "]];"
    gridTitleDataAlign = gridTitleDataAlign + "]];" ;
    gridTitleClsfCode  = clsfCode;
    
    dhxGridMpsbsc007 = gf_MakeDhxGrid('dataListMpsbsc007', dhxGridMpsbsc007HeaderInfo, true, false, false);
    dhxGridMpsbsc007.enableAutoWidth(false);
    dhxGridMpsbsc007.setEditable(true);
    dhxGridMpsbsc007.setColumnMinWidth(120,  2); //넓이가 * 인 컬럼의 최소 넓이값 설정
    //
    for(var i=0; i < data.data.length; i++){    	
    	dhxGridMpsbsc007.setNumberFormat("0,000", i+2, ".", ",");        
    }
    
	var applcYm = dhxGridMpsbsc007Master.cells(dhxGridMpsbsc007Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc007Master,'applcYm')).getValue();
	applcYm = applcYm.replace('-','');	
	
    var jsonParameter = {
            applcYm : applcYm,
            clsfCode : clsfCode
    };            
    gf_Transaction('', 'mpsbsc007/searchMpsbsc007', jsonParameter, 'fn_CallbackSearchMpsbsc007', false, 'GET');
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsbsc007 = new dataProcessor(gv_ContextPath+'/mpsbsc007/saveMpsbsc007'); //lock feed url
    dhxDataProcessorMpsbsc007.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsbsc007.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsbsc007.init(dhxGridMpsbsc007); //link dataprocessor to the grid
    dhxDataProcessorMpsbsc007.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsbsc007.styles = {
                        updated:        "font-weight:normal;text-decoration:none;",
                        inserted:       "font-weight:bold; color:green;",
                        deleted:        "color:orange; text-decoration:line-through;",
                        invalid:        "color:green; text-decoration:underline;",
                        error:          "color:blue; text-decoration:underline;",
                        clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsbsc007.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsbsc007();
                    $("#checkAllMpsbsc007").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
    
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc007');
        dhxGridMpsbsc007.parse(data.data.records, 'js');        
        dhxGridMpsbsc007.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc007');
    }    
    //$("#spanCntSearchFormMpsbsc007Detail").text(data.data.records.length);
    
    cf_SetEventListenerMpsbsc007();
};

/**
 * 추가(신규) 
 */
var fn_AddMpsbsc007 = function() {
	
	var rowId 		= dhxGridMpsbsc007Master.getSelectedRowId();
	
	if (!gf_IsNull(rowId) && (dhxDataProcessorMpsbsc007Master.getState(rowId) != '')){
        gf_DivMsgAlert('적용년도를 먼저 저장해 주세요'); 
        return false;    		
	}
	
	var applcYm = dhxGridMpsbsc007Master.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsbsc007Master,'applcYm')).getValue();
	
    dhxGridMpsbsc007.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(applcYm); //applcYm
    initValueArr.push(''); //clsfCode
    initValueArr.push(''); //grad1
    initValueArr.push(''); //grad2
    initValueArr.push(''); //grad3
    initValueArr.push(''); //grad4
    initValueArr.push(''); //grad5
    initValueArr.push(''); //grad6
    initValueArr.push(''); //grad7
    initValueArr.push(''); //grad8
    initValueArr.push(''); //grad9
    initValueArr.push(''); //grad10
    initValueArr.push(''); //grad11
    initValueArr.push(''); //grad12
    initValueArr.push(''); //grad13
    initValueArr.push(''); //grad14
    initValueArr.push(''); //grad15
    initValueArr.push(''); //grad16
    initValueArr.push(''); //grad17
    initValueArr.push(''); //grad18
    initValueArr.push(''); //grad19
    initValueArr.push(''); //grad20
    initValueArr.push(''); //grad21
    initValueArr.push(''); //grad22
    initValueArr.push(''); //grad23
    initValueArr.push(''); //grad24
    initValueArr.push(''); //grad25
    initValueArr.push(''); //grad26
    initValueArr.push(''); //grad27
    initValueArr.push(''); //grad28
    initValueArr.push(''); //grad29
    initValueArr.push(''); //grad30
    dhxGridMpsbsc007.addRow(dhxGridMpsbsc007.uid(), initValueArr, 0);
    dhxGridMpsbsc007.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc007');
//    $('#btnPopEmpSearchMpsbsc007').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsbsc007SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsbsc007, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsbsc007', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsbsc007', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsbsc007, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsbsc007.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsbsc007', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsbsc007', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc007, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsbsc007.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsbsc007', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsbsc007', 'sortColumId', '', 'text'); 
            dhxGridMpsbsc007.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsbsc007.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsbsc007', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsbsc007', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc007, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsbsc007 = function() {
    var edCnt = 0;
    dhxGridMpsbsc007.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsbsc007.getState(rowId))) {
            edCnt++;
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        gf_DivMsgConfirm(gv_QueSave, 'fn_SaveMpsbsc007_Send()', '');
    }
}
var fn_SaveMpsbsc007_Send = function() {  
    //if(fn_GridValidation(dhxGridMpsbsc007, dhxDataProcessorMpsbsc007)) {
        dhxDataProcessorMpsbsc007.sendData();
    //}
}
/**
 * 삭제
 */
var fn_RemoveMpsbsc007 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsbsc007, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 행을 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpsbsc007.forEachRow(function(rowId) {
            state = dhxDataProcessorMpsbsc007.getState(rowId);
            if(dhxGridMpsbsc007.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsbsc007, 'chk')).isChecked()){
                if(state == 'inserted') dhxGridMpsbsc007.deleteRow(rowId);
                else dhxDataProcessorMpsbsc007.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc007 = function () {
    var titMpsbsc007 = '호봉테이블등록'; /* gf_LocaleTrans('default', 'titMpsbsc007') */
    var applcYm 	= dhxGridMpsbsc007Master.cells(dhxGridMpsbsc007Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc007Master,'applcYm')).getValue();
    applcYm = applcYm.replace('-','');	
    var jsonParameter = {
        applcYm : applcYm,
        clsfCode : gridTitleClsfCode
    };
  
  //gridTitleDataId= [['applcYm','srclsCode', '\'001\'',  '\'002\'', '\'003\'']];
    var header = eval(gridTitleHeader);
    var dataId =  eval(gridTitleDataId);
    var dataAlign = eval(gridTitleDataAlign);
    
    var sheetNm = [[ titMpsbsc007 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc007;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc007/excelMpsbsc007', jsonParameter);
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
    $('#saveFormMpsbsc007 #applcYmSaveFormMpsbsc007').parent().append(
    '<div class="error" id="applcYmSaveFormMpsbsc007-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsbsc007 #clsfCodeSaveFormMpsbsc007').parent().append(
    '<div class="error" id="clsfCodeSaveFormMpsbsc007-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsbsc007Master = function(applcYm){
    if(!gf_IsNull(applcYm)) {
        var jsonParameter = {
            applcYm : applcYm
        };
        var dataSource = gf_NoAsyncTransaction('mpsbsc007/findMpsbsc007Master', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYm)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}

/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsbsc007 = function(applcYm, clsfCode){
    if(!gf_IsNull(applcYm) && !gf_IsNull(clsfCode)) {
        var jsonParameter = {
            applcYm : applcYm,
            clsfCode : clsfCode
        };
        var dataSource = gf_NoAsyncTransaction('mpsbsc007/findMpsbsc007', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYm) && gf_IsNull(data.clsfCode)) {
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
var fn_GridValidationMaster = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkapplcYm;
    var checkClsfCode;
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                    valid = false;
                }
                if(state == 'inserted') {
                    checkapplcYm = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid');
                    if(!gf_IsNull(checkapplcYm)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcYm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYm', 'grid');
                            if((applcYm == checkapplcYm) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpsbsc007Master( checkapplcYm )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
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
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMpsbsc007Master.selectRowById(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}

/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkapplcYm;
    var checkClsfCode;
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'clsfCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfCode');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkapplcYm = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid');
                    checkClsfCode = gf_DhxGetValue(dhxGridObjet, rowId, 'clsfCode', 'grid');
                    if(!gf_IsNull(checkapplcYm, checkClsfCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcYm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYm', 'grid');
                            var clsfCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'clsfCode', 'grid');
                            if(((applcYm == checkapplcYm) && (clsfCode == checkClsfCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpsbsc007( checkapplcYm, checkClsfCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfCode');
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
        dhxGridMpsbsc007.selectRowById(validFalseFistRowId);
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
		gf_DhxSetValue(dhxGridMpsbsc007Master, rid, 'applcYm', strDate.format('YYYY-MM'), 'grid');
		dhxDataProcessorMpsbsc007Master.setUpdated(rid, true, 'updated');
	}	
}



//부서 팝업
var $deptInfo = {};  //부서 선택용 변수
var gf_HobRasisePopup = function (formId, codeId, codeNmId, stmBizplcCode, searchFlag, strCallbackFunc) {

	
	var userId = ""; 
	var title  = "호봉인상 조회";
	var deptInfo = "deptInfo";
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	if ( !gf_IsNull(strCallbackFunc) ) {
  	if(typeof(strCallbackFunc) == "string"){
	    	callFunction = eval(strCallbackFunc);
	    	if ( typeof callFunction != "function" ) {
	    		gf_DivMsgAlert("call back function "+ strCallbackFunc +" 이 구현되지 않습니다.!!");
	          	return false;
	        }
  	}else{
	    	callFunction = strCallbackFunc;
  	}
  }	

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof stmBizplcCode == "undefined" || stmBizplcCode == null){
		stmBizplcCode = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$deptInfo = {};
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindows;
	if($('body').find("div[id='deptPopup']").size() <= 0) {
		$('body').append("<div id='deptPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' stmBizplcCode='" + stmBizplcCode + "' deptInfo='" + deptInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#deptPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'deptPopup';
			var ajaxUrl = gv_ContextPath+'/pop/dept/view';
			alert(ajaxUrl);
			var left	= 0;
			var top		= 0;
			var width	= 570;
			var height	= 560;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#deptPopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($deptInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='deptPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};