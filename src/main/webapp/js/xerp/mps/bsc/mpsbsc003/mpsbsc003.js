/**
 *    프로그램       : 월급여항목적용등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.03
 *    사용테이블      : MPS_APPLY_MONTH
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
var keyDuplication = false;
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsbsc003();
    cf_SetComponentsMpsbsc003();
    cf_SetEventListenerMpsbsc003();
    cf_InitFormMpsbsc003();
    cf_SetBindingMpsbsc003();    
    gf_IframeHeightResize(true);
    
    
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc003 = function() {
    gf_SetMenuPath();
    
    gf_MakeComboBasic('divComboYearYear','applcYy','','width:140px','mpsbsc003/combo/searchComboYeayMpsbsc003'); // 
    gf_ComboCode('divComboSearchPymntddcSe', 'searchPymntddcSe', 'searchPymntddcSe', 'search', 'C064', '' , '', '', 'ordr', '', '', ''); //지급공제구분검색
    gf_ComboCode('divComboSearchSalarytyCode', 'searchSalarytyCode', 'searchSalarytyCode', 'search', 'C062', '' , '', '', 'ordr', '','',''); //급여유형 
    

};

var dhxGridMpsbsc003;
var cf_SetComponentsMpsbsc003 = function() {
    var dhxGridMpsbsc003HeaderInfo = [];
    dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); 
    dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('급여유형 코드', '100', 'center', 'str', 'ro', false, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '100', 'center', 'str', 'ro', false, 'salarytyCodeNm', '', '')); 
    dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('지급공제', '100', 'center', 'str', 'ro', false, 'pymntddcSeNm', '', ''));    
    dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('급여항목 코드', '100', 'center', 'str', 'ro', false, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '*', '', 'str', 'ro', false, 'salaryitemNm', '', ''));
    dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('1' + gf_LocaleTrans('default', 'titMon'),    '80',    'center',  'na', 'ch', false, 'pymnt1At', '', '')); //지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('2' + gf_LocaleTrans('default', 'titMon'),    '80',    'center',  'na', 'ch', false, 'pymnt2At', '', ''));//지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('3' + gf_LocaleTrans('default', 'titMon'),    '80',    'center',  'na', 'ch', false, 'pymnt3At', '', '')); //지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('4' + gf_LocaleTrans('default', 'titMon'),    '80',    'center',  'na', 'ch', false, 'pymnt4At', '', '')); //지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('5' + gf_LocaleTrans('default', 'titMon'),    '80',    'center',  'na', 'ch', false, 'pymnt5At', '', '')); //지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('6' + gf_LocaleTrans('default', 'titMon'),    '80',    'center',  'na', 'ch', false, 'pymnt6At', '', '')); //지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('7' + gf_LocaleTrans('default', 'titMon'),    '80',    'center',  'na', 'ch', false, 'pymnt7At', '', '')); //지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('8' + gf_LocaleTrans('default', 'titMon'),    '80',    'center',  'na', 'ch', false, 'pymnt8At', '', '')); //지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('9' + gf_LocaleTrans('default', 'titMon'),    '80',    'center',  'na', 'ch', false, 'pymnt9At', '', '')); //지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('10' + gf_LocaleTrans('default', 'titMon'),   '80',    'center',  'na', 'ch', false, 'pymnt10At', '', '')); //지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('11' + gf_LocaleTrans('default', 'titMon'),   '80',    'center',  'na', 'ch', false, 'pymnt11At', '', '')); //지급 여부
	dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('12' + gf_LocaleTrans('default', 'titMon'),   '80',    'center',  'na', 'ch', false, 'pymnt12At', '', '')); //지급 여부    
    dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titApplcYy'),      '80',   'center',   'str','ro',true, 'applcYy', '', ''));
    //dhxGridMpsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('적용 년월', '100', 'center', 'str', 'ro', false, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */

    
    dhxGridMpsbsc003 = gf_MakeDhxGrid('dataListMpsbsc003', dhxGridMpsbsc003HeaderInfo, true, false, false);
    dhxGridMpsbsc003.enableAutoWidth(true);
};

var eventIds = [];
var cf_SetEventListenerMpsbsc003 = function() {
    // grid event
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridMpsbsc003, eventIds);
    eventId = dhxGridMpsbsc003.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) fn_ExcelMpsbsc003();
    });
    eventIds.push(eventId);
    eventId =dhxGridMpsbsc003.attachEvent("onRowSelect", function(rId,cInd){ 
    });
    eventIds.push(eventId);
    
    //체크박스 
    eventId =dhxGridMpsbsc003.attachEvent("onCheck", function(rId,cInd,state){
    	 dhxGridMpsbsc003.setCellTextStyle(rId, cInd, 'border-bottom: 1px solid red');
    });
    eventIds.push(eventId);
    
   //GRID 저장 
    $('#btnSaveMpsbsc003').unbind('click').bind('click', function() {
        fn_SaveMpsbsc003();        
    });

    $('#btnExcelMpsbsc003').unbind('click').bind('click', function() {
        fn_ExcelMpsbsc003();
    });
    $('#btnSearchMpsbsc003').unbind('click').bind('click', function(event){
        fn_SearchMpsbsc003();
    });
    $('#btnResetMpsbsc003').unbind('click').bind('click',function() {
        cf_InitFormMpsbsc003();
    });
    $('#searchFormMpsbsc003').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchMpsbsc003').click(); event.preventDefault(); }
    });

    
    //데이터 카피 
    $('#btnCopy').unbind('click').bind('click', function() {
    	  var comboYear = gf_FormGetValue('searchFormMpsbsc003', 'applcYy', 'combo')
        
        if( comboYear ==null || comboYear =="" ) {
             gf_DivMsgAlert("기준년도를 선택해 주세요");
             return false;
        } else {
            gf_DivMsgConfirm(comboYear+"기준으로 다음년도로 데이터를 <br/>복사하시겠습니까?", 'fn_CopyData()', '');
        }
        
        
    });    
    
   
};

var cf_InitFormMpsbsc003 = function() {
    $('#searchFormMpsbsc003').resetForm();
};

var cf_SetBindingMpsbsc003 = function() {
    fn_SearchMpsbsc003();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsbsc003 = function() {

    var jsonParameter = {
    		applcYy : gf_FormGetValue('searchFormMpsbsc003', 'applcYy', 'combo'),
    		salarytyCode : gf_FormGetValue('searchFormMpsbsc003', 'searchSalarytyCode', 'combo'),
    		pymntddcSe : gf_FormGetValue('searchFormMpsbsc003', 'searchPymntddcSe', 'combo'),
    };
    gf_Transaction(jsonParameter, 'mpsbsc003/searchMpsbsc003', jsonParameter, 'fn_CallbackSearchMpsbsc003', false, 'GET');
    
    

    dhxDataProcessor = new dataProcessor("/xerp/mpsbsc003/saveMpsbsc003");  
   
    dhxDataProcessor.init(dhxGridMpsbsc003);
    dhxDataProcessor.setUpdateMode("off"); //기본은 그리드를 변경할때마낟 데이터가 서버로 전송됨 , 자동업데이트 모드 비활성화 
    dhxDataProcessor.setTransactionMode('POST',true);   //GET|POST|REST|JSON, true (한번에 전송 )
    
};

var fn_CallbackSearchMpsbsc003 = function(strSvcID, targetID, data) {
    dhxGridMpsbsc003.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc003');
        dhxGridMpsbsc003.parse(data.data.records, 'js');
        dhxGridMpsbsc003.selectRow(0);

    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc003');
        $('#btnAddMpsbsc003').click();
    }
    $('#spanCntMpsbsc003').text(data.data.records.length);
    cf_SetEventListenerMpsbsc003();
};


//그리드 저장 
var fn_SaveMpsbsc003 = function() {    
       
		var ids = dhxGridMpsbsc003.getChangedRows(true);  //변경된 행의 ID리스트를 가져옵니다
		var ids_arr = ids.split(",");
		var i = 0;
		var j = 0;   	
	
		if (ids == "" || ids ==null ){
			gf_DivMsgAlert("변경된 행이 없습니다");
			return false;
		}	
	
    	dhxDataProcessor.sendData();                                                         
    	//저장후 메시지 처리                                                                     
    	dhxDataProcessor.attachEvent("onAfterUpdate", function(id,action,tid,dataSource){   
	    	if (dataSource.code !== "000"){                                                 
	            gf_DivMsgAlert(dataSource.message);                               
	    	}                                                                               
	    	else {                                                                          
	    		gf_DivMsgAlert(gv_MsgSave);  
	    		 fn_SearchMpsbsc003();                                                               
	    	 }                                                                                
    	 }); 
    	
        
};

var fn_CallbackSaveMpsbsc003 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        fn_SearchMpsbsc003();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc003 = function () {
    var titMpsbsc003 = '월급여항목적용등록'; /* gf_LocaleTrans('default', 'titMpsbsc003') */
    var jsonParameter = {
    		applcYy : gf_FormGetValue('searchFormMpsbsc003', 'applcYy', 'combo'),
    		salarytyCode : gf_FormGetValue('searchFormMpsbsc003', 'searchSalarytyCode', 'combo'),
    		pymntddcSe : gf_FormGetValue('searchFormMpsbsc003', 'searchPymntddcSe', 'combo'),
    };
    var header = [[
        '급여유형 코드' /* gf_LocaleTrans('default', 'titSalarytyCode') */,
        '급여유형' /* gf_LocaleTrans('default', 'titSalaryitemCode') */,
        '지급공제' /* gf_LocaleTrans('default', 'titApplcYm') */,
        '급여항목코드' /* gf_LocaleTrans('default', 'titPymntAt') */,
        '급여항목',
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
    ]];
    var dataId = [[ 'salarytyCode',  'salarytyCodeNm','pymntddcSeNm','salaryitemCode', 'salaryitemNm','pymnt1At', 'pymnt2At' , 'pymnt3At', 'pymnt4At', 'pymnt5At', 'pymnt6At', 'pymnt7At', 'pymnt8At', 'pymnt9At', 'pymnt10At', 'pymnt11At', 'pymnt12At']];
    var dataAlign = [[ 'center', 'center', 'center', 'center','center', 'center', 'center', 'center' ,'center', 'center', 'center', 'center', 'center']];
    var sheetNm = [[ titMpsbsc003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc003/excelMpsbsc003', jsonParameter);
};


//대상복사 
var fn_CopyData =function (){
    var jsonParameter = {
    	applcYy : gf_FormGetValue('searchFormMpsbsc003', 'applcYy', 'combo'),
    	nextYy :  parseInt(gf_FormGetValue('searchFormMpsbsc003', 'applcYy', 'combo'))+1,
    }
    var dataSource = gf_NoAsyncTransaction("mpsbsc003/saveCopyApplyMonth", jsonParameter, 'POST');
    if(dataSource.code === '000') {
       gf_DivMsgAlert(gf_LocaleTrans('default','mgsProcess')); // "정상처리 되었습니다
       cf_InitParamMpsbsc003();
       fn_SearchMpsbsc003();
    }
	
}


