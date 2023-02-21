/**
 *    프로그램       : 금액기준등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.05
 *    사용테이블      : MPS_APPLCS_STDR
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
var keyDuplication = false;

var gBplcCode ;
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsbsc004();
    cf_SetComponentsMpsbsc004();
    cf_SetEventListenerMpsbsc004();
    cf_InitFormMpsbsc004();
    cf_SetBindingMpsbsc004();    
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc004 = function() {
    gf_SetMenuPath();

    gf_ComboCode('divComboSearchSalarytyCode', 'searchSalarytyCode', 'searchSalarytyCode', 'search', 'C062', '' , '', '', 'ordr', '','',''); //급여유형 
    
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');

    gBplcCode =userInfo.data.bplcCode;
    
};

var dhxGridMpsbsc004;
var dhxGridStdMpsbsc004;
var dhxGridCalcMpsbsc004;


//급여항목
var cf_SetComponentsMpsbsc004 = function() {
    var dhxGridMpsbsc004HeaderInfo = [];
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); 
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '100', 'center', 'str', 'ro', false, 'salarytyCodeNm', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '120', 'center', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('지급공제', '80', 'center', 'str', 'ro', false, 'pymntddcSeNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '80', 'center', 'str', 'ro', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '0', 'center', 'str', 'ro', true, 'salarytyCode', '', ''));
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '0', 'center', 'str', 'ro', true, 'salaryitemCode', '', ''));
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '0', 'center', 'str', 'ro', true, 'applcStdrSn', '', ''));
    
    dhxGridMpsbsc004 = gf_MakeDhxGrid('dataListMpsbsc004', dhxGridMpsbsc004HeaderInfo, true, false, false);
    dhxGridMpsbsc004.enableAutoWidth(true);
    
    
  //항목적용유형 
    var dhxGridStdMpsbsc004HeaderInfo = [];
    dhxGridStdMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); 
    dhxGridStdMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('선택', '40', 'center', 'str', 'ra', false, 'raStr', '', ''));
    dhxGridStdMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('사원구분', '140', 'center', 'str', 'coro', false, 'emplSeCode', '', ''));
    dhxGridStdMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준구분', '160', 'center', 'str', 'coro', false, 'applcStdrSe', '', '')); 
    dhxGridStdMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('순서', '50', 'center', 'str', 'edn', false, 'calcOrdr',  '', '')); 
    dhxGridStdMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '0', 'center', 'str', 'ro', true, 'salarytyCode', '', '')); 
    dhxGridStdMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '0', 'center', 'str', 'ro', true, 'salaryitemCode', '', ''));
    dhxGridStdMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준순번', '0', 'center', 'str', 'ro', true, 'applcStdrSn', '', ''));  


    dhxGridStdMpsbsc004 = gf_MakeDhxGrid('dataListStdMpsbsc004', dhxGridStdMpsbsc004HeaderInfo, true, false, false);
    dhxGridStdMpsbsc004.enableAutoWidth(true);
    dhxGridStdMpsbsc004.enableEditEvents(true,false,false); //원클릭, 더블클릭, F2key 
    //dhxGridStdMpsbsc004.setEditable (false);
    
    
    //직원구분
    var jsonParameter = {codekindCode : "C068",exceptCode :"",sortOrder :"ordr" };  
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridStdMpsbsc004, dhxGridStdMpsbsc004.getColIndexById("emplSeCode"), dataSource.data); /* 그리드콤보*/
        
    //적용기준구분
    var jsonParameter = {codekindCode : "C118",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridStdMpsbsc004, dhxGridStdMpsbsc004.getColIndexById("applcStdrSe"), dataSource.data); /* 그리드콤보*/
    
    
    //적용기준구분 
    var dhxGridCalcMpsbsc004HeaderInfo = [];
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); 
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용코드', '100', 'center', 'str', 'ro', false, 'applcCode', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('코드명', '100', 'center', 'str', 'ro', false, 'applyNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산구분', '80', 'center', 'str', 'coro', false, 'calcSe', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산수식', '150', 'left', 'str', 'edn', false, 'calcNomfrmDtls', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산수식설명', '*', 'left', 'str', 'ro', false, 'calcNomfrmDc', '', ''));
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '0', 'center', 'str', 'ro', true, 'salarytyCode', '', ''));
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '0', 'center', 'str', 'ro', true, 'salaryitemCode', '', ''));      
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('고유번호', '0', 'center', 'str', 'ro', true, 'applcStdrSn', '', ''));   
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('고유번호', '0', 'center', 'str', 'ro', true, 'calcStdrSn', '', ''));   
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용구분1', '0', 'center', 'str', 'ro', true, 'applcStdrSe', '', '')); 
    dhxGridCalcMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용구분2', '0', 'center', 'str', 'ro', true, 'applcSe', '', '')); 
    
    dhxGridCalcMpsbsc004 = gf_MakeDhxGrid('dataListCalcMpsbsc004', dhxGridCalcMpsbsc004HeaderInfo, true, false, false);
    dhxGridCalcMpsbsc004.enableAutoWidth(true);
    dhxGridCalcMpsbsc004.enableEditEvents(true,false,false); //원클릭, 더블클릭, F2key 
    dhxGridCalcMpsbsc004.setEditable (true);
    
    
    //계산구분 
    var jsonParameter = {codekindCode : "C430",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridCalcMpsbsc004, dhxGridCalcMpsbsc004.getColIndexById("calcSe"), dataSource.data); /* 그리드콤보*/
    
    
	//1번재 그리드 
    dhxDataProcessor = new dataProcessor("/xerp/mpsbsc004/saveMpsbsc004");  
   
    dhxDataProcessor.setUpdateMode("off"); //기본은 그리드를 변경할때마낟 데이터가 서버로 전송됨 , 자동업데이트 모드 비활성화 
    dhxDataProcessor.setTransactionMode('POST',true);   //GET|POST|REST|JSON, true (한번에 전송 )
    //dhxDataProcessor.enableDataNames(true);  //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessor.init(dhxGridMpsbsc004);
    dhxDataProcessor.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};  
   

    //2번째 그리드 계산식  dp
    dhxDataProcessor2 = new dataProcessor("/xerp/mpsbsc004/saveMpsbsc004ApplyType");  
    
    dhxDataProcessor2.setUpdateMode("off"); //기본은 그리드를 변경할때마낟 데이터가 서버로 전송됨 , 자동업데이트 모드 비활성화 
    dhxDataProcessor2.setTransactionMode('POST',true);   
    dhxDataProcessor2.init(dhxGridStdMpsbsc004);
    dhxDataProcessor2.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	}; 
        
    
    
    //3번째 그리드 계산식  dp
    dhxDataProcessor3 = new dataProcessor("/xerp/mpsbsc004/saveMpsbsc004CalcItem");  
    
    dhxDataProcessor3.setUpdateMode("off"); //기본은 그리드를 변경할때마낟 데이터가 서버로 전송됨 , 자동업데이트 모드 비활성화 
    dhxDataProcessor3.setTransactionMode('POST',true);   
    dhxDataProcessor3.init(dhxGridCalcMpsbsc004);
    dhxDataProcessor3.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	}; 
    
};


var eventIds = [];
var cf_SetEventListenerMpsbsc004 = function() {
    // grid event
    var eventId;
    var eventId1;
    var eventId2;
    
    eventIds = gf_GridDetachEvent(dhxGridMpsbsc004, eventIds);

    eventId = dhxGridMpsbsc004.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
    	fn_FindMpsbsc004();
    });
    eventIds.push(eventId);
    
   //항목적용유형 더블클릭시  적용기준 데이터 조회 
  
    eventId1 = dhxGridStdMpsbsc004.attachEvent('onRowDblClicked', function(rId,cInd) {
    	if( cInd ==1){ 
    		//gf_Trace(cInd);
    		dhxGridStdMpsbsc004.setEditable(true);
    		//dhxGridStdMpsbsc004.selectCell(rId,cInd);
    		//dhxGridStdMpsbsc004.editCell();    	    	
    		fn_FindCalcMpsbsc004();	
    	}else{
    		dhxGridStdMpsbsc004.setEditable (false);
    	}
    	dhxGridStdMpsbsc004.detachEvent(eventId1);
    });
    
    eventId2 = dhxGridCalcMpsbsc004.attachEvent('onRowDblClicked', function(rId,cInd) {
    	//항목적용유형에서 적용기준값에 따라 
    	var applcStdrSe 	= dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'applcStdrSe')).getValue();  //적용기준 (C118)
    	
    	if( applcStdrSe =='002' && (cInd ==1 || cInd ==2 ) ){ //직급별
    		fn_PopUpWindows('002');
    	}else if( applcStdrSe =='003' && (cInd ==1 || cInd ==2 )){  //사원별
    		fn_PopUpWindows('003');
    	}else if( applcStdrSe =='004' && (cInd ==1 || cInd ==2 )){  //부서별 
    		fn_PopUpWindows('004');
    	}else if( applcStdrSe =='005' && (cInd ==1 || cInd ==2 )){ //코드별 
    		//fn_PopUpWindows('005');
    		//gf_Trace("사용중이 아닙니다");
    	}
    	
    	if( dhxGridCalcMpsbsc004.cells(rId,dhxGridCalcMpsbsc004.getColIndexById("calcSe")).getValue() =="001" && cInd ==4){  // 급여계산식 선택했을때 
    		fn_SalaryCalcItem ('form2'); // 급여항목 팝업 
    	}else{
    		//dhxGridCalcMpsbsc004.editCell();
    	}   
    	dhxGridCalcMpsbsc004.detachEvent(eventId2);
    });
    
    
    //저장버튼 
    $('#btnSaveMpsbsc004').unbind('click').bind('click', function() {
    	
    	var ids1 = dhxGridMpsbsc004.getChangedRows(true);  	 //변경된 행의 ID리스트를 가져옵니다
    	var ids2 = dhxGridStdMpsbsc004.getChangedRows(true);
    	var ids3 = dhxGridCalcMpsbsc004.getChangedRows(true); 

    	var count1 = dhxGridMpsbsc004.getRowsNum();
    	var count2 = dhxGridStdMpsbsc004.getRowsNum();
    	var count3 = dhxGridCalcMpsbsc004.getRowsNum();
    	
    	if (count1 <=0 && ids1 == "" || ids1 ==null  ){
    		gf_DivMsgAlert("급여항목을 추가해 주세요.");
    		return false;   		
    	}
    	
    	if (count2 <=0 && (ids2 == "" || ids2 ==null)){
    		gf_DivMsgAlert("항목적용유형에 추가된 행이 없습니다");
    		return false;   		
    	}
 
    	if (count2 <=0 && (ids3 == "" || ids3 ==null) ){
    		gf_DivMsgAlert("항목적용유형에 추가된 행이 없습니다");
    		return false;   		
    	}    	
    	
    });

    
    $('#btnSearchMpsbsc004').unbind('click').bind('click', function(event){
        fn_SearchMpsbsc004();
    });
    
    $('#btnResetMpsbsc004').unbind('click').bind('click',function() {
        cf_InitFormMpsbsc004();
    });
    
    //1.급여항목추가  
    $('#btnAddItem').unbind('click').bind('click',function() {
    	fn_SalaryItem ('form1'); // 급여항목 팝업 
    });   
    
    //1.급여항목 삭제 
    $('#btnRemoveItem').unbind('click').bind('click',function() {
    	var selectedId = dhxGridMpsbsc004.getSelectedRowId();
    	
    	if (selectedId<=0){
    		gf_DivMsgAlert('삭제할 코드를 선택해 주세요.');
            return false;		
    	}else{
    		
    		var applcStdrSn = dhxGridMpsbsc004.cells(selectedId, dhxGridMpsbsc004.getColIndexById("applcStdrSn")).getValue() ; 
    		
    		if( gf_IsNull(applcStdrSn)) {
    			dhxGridMpsbsc004.deleteRow(selectedId);
    			dhxGridStdMpsbsc004.clearAll();
    			dhxGridCalcMpsbsc004.clearAll();
    			fn_SearchMpsbsc004();
    		}else{
    			dhxDataProcessor.setUpdated(selectedId, true, "deleted");
    			gf_DivMsgConfirm('연관된 급여의 관련항목도 삭제됩니다', 'fn_RemoveMpsbsc004All()', '');
    		}
    	}
    });   
    
    //2.항목적용유형  추가
    $('#btnAddApplyType').unbind('click').bind('click',function() {
    	
    	var salarytyCode = dhxGridMpsbsc004.cells(dhxGridMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004,'salarytyCode')).getValue();
    	var salaryitemCode = dhxGridMpsbsc004.cells(dhxGridMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004,'salaryitemCode')).getValue();
    	
    	dhxGridStdMpsbsc004.clearSelection();
    	dhxGridStdMpsbsc004.addRow(dhxGridStdMpsbsc004.uid(),['','','001','001','1',salarytyCode,salaryitemCode,''],0); //정규직, 전체 default 
    	    	
    	dhxGridStdMpsbsc004.selectRow(0);
        dhxGridStdMpsbsc004.setEditable (true);
        
        dhxGridCalcMpsbsc004.clearAll(); //3번째 GRID 계산식 항목 초기화 
        //dhxGridCalcMpsbsc004.addRow(dhxGridCalcMpsbsc004.uid(),[],0); //첫번째 행  
    	
    });   
    
    //2.항목적용 삭제 
    $('#btnRemoveApplyType').unbind('click').bind('click',function() {
    	
    	var rowInd 		= dhxGridStdMpsbsc004.getSelectedRowId();
    	
    	if (rowInd<=0){
    		gf_DivMsgAlert('삭제할 행을 선택해 주세요.');
            return false;		
    	}else{
    		var applcStdrSn = dhxGridStdMpsbsc004.cells(rowInd, dhxGridStdMpsbsc004.getColIndexById("applcStdrSn")).getValue() ; 
    		
    		if( gf_IsNull(applcStdrSn)) {
    			dhxGridStdMpsbsc004.deleteRow(rowInd);
    		}else{
    			gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMpsbsc004ApplcStdr()', '');
    		}
    	}		
    }); 
    
    //3.적용기준 추가  
    $('#btnAddCalcItem').unbind('click').bind('click',function() {
    	
    	if (dhxGridStdMpsbsc004.getRowsNum() <=0){
            gf_DivMsgAlert('항목적용 유형을 먼저 추가해 주세요'); 
            return false;    		
    	}
    	
    	var salarytyCode = dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'salarytyCode')).getValue();
    	var salaryitemCode = dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'salaryitemCode')).getValue();
    	var applcStdrSn = dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'applcStdrSn')).getValue();
    	
    	var applcStdrSe = dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'applcStdrSe')).getValue();
    	
    	if (applcStdrSe =='001' && dhxGridCalcMpsbsc004.getRowsNum() > 0) { //전체 옵션일 경우  1개의 행만 추가할수 있음 
    		 gf_DivMsgAlert('항목적용 기준구분이 전체인 경우<br/>수식은 한건만 등록 가능합니다.'); 
    		 return false;
    	}
   	
    	if (applcStdrSe =='002') { ///직급별인 경우 직급리스트 출력 
    	    var jsonParameter = {};
	        gf_Transaction(jsonParameter, 'mpsbsc004/searchMhshClsfCode', jsonParameter, 'fn_CallbackClsfCode', false, 'GET');    		
    	}else{
	    	dhxGridCalcMpsbsc004.clearSelection();
	    	dhxGridCalcMpsbsc004.addRow(Number(dhxGridCalcMpsbsc004.getRowsNum()+1),['','','','002','0','',salarytyCode,salaryitemCode,applcStdrSn,'','',applcStdrSe]); //마지막행  
	    	dhxGridCalcMpsbsc004.selectRow(0);
	    	
	    	if (applcStdrSe =='001') { 
	    		dhxGridCalcMpsbsc004.cells(dhxGridCalcMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridCalcMpsbsc004,'applyNm')).setValue("전체");
	    	}
	    	//dhxGridCalcMpsbsc004.selectRow(0);
    	}
    }); 
    
//    2.번그리드 저장
    $('#btnSaveApplyType').unbind('click').bind('click',function() {
    	//if(fn_GridValidation2()) dhxDataProcessor2.sendData(); //유효성검사 
    	 dhxDataProcessor2.sendData();

    	 dhxDataProcessor2.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){                                                                         
 		   gf_DivMsgAlert(gv_MsgSave);
 		  fn_SearchMpsbsc004();
 		   fn_FindMpsbsc004();
 	       return true;                                                                 
    	 });    	 
    	 
    });      
    
    
    //적용기준 저장  
    $('#btnSaveCalcItem').unbind('click').bind('click',function() {
    	//if(fn_GridValidation3()) dhxDataProcessor3.sendData(); //유효성검사 해라 
    	 dhxDataProcessor3.sendData();
    	 dhxDataProcessor3.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){                                                                         
     		gf_DivMsgAlert(gv_MsgSave);   
     		fn_FindCalcMpsbsc004();
     	    return true;
    	 });   
    });   
    
    
    //적용기준 삭제 
    $('#btnRemoveCalcItem').unbind('click').bind('click',function() {
    	
    	var rowInd = dhxGridCalcMpsbsc004.getSelectedRowId();
    	
    	if (rowInd<=0){
    		gf_DivMsgAlert('삭제할 행을 선택해 주세요.');
            return false;		
    	}else{
    		var calcStdrSn = dhxGridCalcMpsbsc004.cells(rowInd, gf_GetDhxGridColumId(dhxGridCalcMpsbsc004,'calcStdrSn')).getValue(); 
    		
    		if( gf_IsNull(calcStdrSn)) {
    			dhxGridCalcMpsbsc004.deleteRow(rowInd);
    		}else{
    			gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveCalcItem()', '');
    		}
    	}
    }); 
};

var cf_InitFormMpsbsc004 = function() {
    $('#searchFormMpsbsc004').resetForm();
};

var cf_SetBindingMpsbsc004 = function() {
    fn_SearchMpsbsc004();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsbsc004 = function() {
    var jsonParameter = {
    	salarytyCode : gf_FormGetValue('searchFormMpsbsc004', 'searchSalarytyCode', 'combo'),
        salaryitemCode : gf_FormGetValue('searchFormMpsbsc004', 'salaryitemCode', 'text'),
    };
    gf_Transaction(jsonParameter, 'mpsbsc004/searchMpsbsc004', jsonParameter, 'fn_CallbackSearchMpsbsc004', false, 'GET');
};

var fn_CallbackSearchMpsbsc004 = function(strSvcID, targetID, data) {
    dhxGridMpsbsc004.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc004');
        dhxGridMpsbsc004.parse(data.data.records, 'js');
        dhxGridMpsbsc004.selectRow(0);
        fn_FindMpsbsc004();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc004');
        //$('#btnAddMpsbsc004').click();
    }
    $('#spanCntMpsbsc004').text(data.data.records.length);
    cf_SetEventListenerMpsbsc004();
};
/**
 * 항목적용유형 리스트 
 */
var fn_FindMpsbsc004 = function() {
    var salarytyCode = dhxGridMpsbsc004.cells(dhxGridMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004,'salarytyCode')).getValue();  //급여유형
    var salaryitemCode = dhxGridMpsbsc004.cells(dhxGridMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004,'salaryitemCode')).getValue(); //급여항목 

    if (!gf_IsNull(salarytyCode) && !gf_IsNull(salaryitemCode) ) {
        var jsonParameter = {
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode,
        };
        gf_Transaction(jsonParameter, 'mpsbsc004/searchMpsApplcsStdList', jsonParameter, 'fn_CallbackSearchApplyStrMpsbsc004', false, 'GET');              
    }
};

var fn_CallbackSearchApplyStrMpsbsc004 = function(strSvcID, targetID, data) {

	dhxGridStdMpsbsc004.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListStdMpsbsc004');
        dhxGridStdMpsbsc004.parse(data.data.records, 'js');
        dhxGridStdMpsbsc004.selectRow(0);
        
        fn_FindCalcMpsbsc004();
    } else {
        gf_NoFoundDataOnGridMsg('dataListStdMpsbsc004');
        //$('#btnAddMpsbsc004').click();
    }
    cf_SetEventListenerMpsbsc004();
};

//적용기준 조회 
var fn_FindCalcMpsbsc004 = function() {

	var salarytyCode 	= dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'salarytyCode')).getValue();  //급여유형
    var salaryitemCode 	= dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'salaryitemCode')).getValue(); //급여항목 
    var applcStdrSn 	= dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'applcStdrSn')).getValue(); //급여항목  applcStdrSn

    if (!gf_IsNull(salarytyCode) && !gf_IsNull(salaryitemCode) && !gf_IsNull(applcStdrSn) ) {
        var jsonParameter = {
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode,
            applcStdrSn : applcStdrSn,
        };
        gf_Transaction(jsonParameter, 'mpsbsc004/searchMpsCalcStdrList', jsonParameter, 'fn_CallbackSearchCalcMpsbsc004', false, 'GET');              
    }
};

var fn_CallbackSearchCalcMpsbsc004 = function(strSvcID, targetID, data) {

	dhxGridCalcMpsbsc004.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListCalcMpsbsc004');
        dhxGridCalcMpsbsc004.parse(data.data.records, 'js');
        dhxGridCalcMpsbsc004.selectRow(0);

    } else {
        gf_NoFoundDataOnGridMsg('dataListCalcMpsbsc004');
    }
    cf_SetEventListenerMpsbsc004();
};


/**
 * 데이터 중복 체크
 */
var fn_CheckDupMpsbsc004 = function(){
    var salarytyCode = gf_FormGetValue('saveFormMpsbsc004', 'salarytyCode', 'text');
    var salaryitemCode = gf_FormGetValue('saveFormMpsbsc004', 'salaryitemCode', 'text');
    var applcStdrSn = gf_FormGetValue('saveFormMpsbsc004', 'applcStdrSn', 'text');
    if(gf_IsNull(salarytyCode) && gf_IsNull(salaryitemCode) && gf_IsNull(applcStdrSn)) {
        gf_DivMsgAlert('급여유형코드를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titsalarytyCode') */
        gf_DivMsgAlert('급여항목 코드를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titsalaryitemCode') */
        gf_DivMsgAlert('적용 기준 순번를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titapplcStdrSn') */
        return false;
    }
    var jsonParameter = {
        salarytyCode : salarytyCode,
        salaryitemCode : salaryitemCode,
        applcStdrSn : applcStdrSn
    };
    var dataSource = gf_NoAsyncTransaction('mpsbsc004/findMpsbsc004', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.salarytyCode) && gf_IsNull(data.salaryitemCode) && gf_IsNull(data.applcStdrSn)) {
            keyDuplication = false;
            return true;
        } else {
            gf_DivMsgAlert('급여유형코드가 존재합니다.'); /* gf_LocaleTrans('default', 'titsalarytyCode') */
            gf_DivMsgAlert('급여항목 코드가 존재합니다.'); /* gf_LocaleTrans('default', 'titsalaryitemCode') */
            gf_DivMsgAlert('적용 기준 순번가 존재합니다.'); /* gf_LocaleTrans('default', 'titapplcStdrSn') */
            keyDuplication = true;
            return false;
        }
    } else {
        gf_DivMsgAlert('중복확인이 되지 않습니다.');
        return false;
    }    
};


//1번 적용항목 바로 삭제 
var fn_RemoveMpsbsc004All = function() {

	var salarytyCode 	= dhxGridMpsbsc004.cells(dhxGridMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004,'salarytyCode')).getValue(); 
	var salaryitemCode	= dhxGridMpsbsc004.cells(dhxGridMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004,'salaryitemCode')).getValue(); 
    var jsonParameter = {
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode,
            applcStdrSn	:''
    };
    var dataSource = gf_NoAsyncTransaction('mpsbsc004/removeMpsbsc004ApplcStdr', jsonParameter, 'POST');
    if(dataSource.code === '000') {
		 dhxGridStdMpsbsc004.clearAll();
		 dhxGridCalcMpsbsc004.clearAll();    	
    	 fn_SearchMpsbsc004();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};



//2번 적용항목 바로 삭제 
var fn_RemoveMpsbsc004ApplcStdr = function() {
	var salarytyCode 	= dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'salarytyCode')).getValue(); 
	var salaryitemCode	= dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'salaryitemCode')).getValue(); 
	var applcStdrSn 	= dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'applcStdrSn')).getValue(); 
    var jsonParameter = {
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode,
            applcStdrSn : applcStdrSn,
    };
    var dataSource = gf_NoAsyncTransaction('mpsbsc004/removeMpsbsc004ApplcStdr', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_FindMpsbsc004();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

//3번째 계산식 항목 바로 삭제 
var fn_RemoveCalcItem  =function() {
	
	var salarytyCode 	= dhxGridCalcMpsbsc004.cells(dhxGridCalcMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridCalcMpsbsc004,'salarytyCode')).getValue(); 
	var salaryitemCode	= dhxGridCalcMpsbsc004.cells(dhxGridCalcMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridCalcMpsbsc004,'salaryitemCode')).getValue(); 
	var applcStdrSn 	= dhxGridCalcMpsbsc004.cells(dhxGridCalcMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridCalcMpsbsc004,'applcStdrSn')).getValue(); 
	var calcStdrSn 		= dhxGridCalcMpsbsc004.cells(dhxGridCalcMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridCalcMpsbsc004,'calcStdrSn')).getValue(); 
	
    var jsonParameter = {
        salarytyCode : salarytyCode,
        salaryitemCode : salaryitemCode,
        applcStdrSn : applcStdrSn,
        calcStdrSn : calcStdrSn,
    };
   
    var dataSource = gf_NoAsyncTransaction('mpsbsc004/removeMpsbsc004MpsCalcStdr', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_FindCalcMpsbsc004();	 
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

//급여항목 
var fn_SalaryItem= function (formId ) {
	
	var title  = "급여항목";

	var dhxWindowObj;
	var dhxWindows;
	if($('body').find("div[id='bpopupMpsbsc004']").size() <= 0) {
		$('body').append("<div id='bpopupMpsbsc004' formid='" + formId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupMpsbsc004').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			var id 		= 'bpopupMpsbsc004';
			var ajaxUrl = gv_ContextPath+'/mpsbsc004/popup/findMpsbsc004SalItemList/view';
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 650;
			
			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupMpsbsc004 .b-close').click();
			});
		},
		onClose:function(){						
			dhxWindows.unload();
			$('body').find("div[id='bpopupMpsbsc004']").remove();			
		}
	},function(){});

	return dhxWindowObj;
}

var fn_SalaryCalcItem= function (formId ) {
	
	var title  = "급여계산항목";

	var dhxWindowObj;
	var dhxWindows;
	if($('body').find("div[id='bpopupCalcMpsbsc004']").size() <= 0) {
		$('body').append("<div id='bpopupCalcMpsbsc004' formid='" + formId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupCalcMpsbsc004').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			var id 		= 'bpopupCalcMpsbsc004';
			var ajaxUrl = gv_ContextPath+'/mpsbsc004/popup/findMpsbsc004SalCalcItemList/view';
			var left	= 200;
			var top		= 300;
			var width	= 600;
			var height	= 650;
			
			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupCalcMpsbsc004 .b-close').click();
			});
		},
		onClose:function(){						
			dhxWindows.unload();
			$('body').find("div[id='bpopupCalcMpsbsc004']").remove();			
		}
	},function(){});

	return dhxWindowObj;
}

var fn_PopUpWindows =function (applcStdrSe){
	
	if (applcStdrSe =="003") { //사원별 
		gf_EmpPopup("","","", gBplcCode, "Y", fn_CallbackPopEmp);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
	}	
	if (applcStdrSe =="004") { //부서별 
		gf_DeptPopup("","","", gBplcCode, "Y", "fn_CallbackPopDept"); 
	}	
}

//직급정보가져오기 
var fn_CallbackClsfCode = function(strSvcID, targetID, data) {
	//dhxGridCalcMpsbsc004.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListCalcMpsbsc004');
        dhxGridCalcMpsbsc004.parse(data.data.records, 'js');
        //dhxGridCalcMpsbsc004.selectRow(0);
        
    	var salarytyCode 	= dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'salarytyCode')).getValue(); 
    	var salaryitemCode	= dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'salaryitemCode')).getValue(); 
    	var applcStdrSn 	= dhxGridStdMpsbsc004.cells(dhxGridStdMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStdMpsbsc004,'applcStdrSn')).getValue();         
        var status;
        
        dhxGridCalcMpsbsc004.forEachRow(function(id){
        	dhxGridCalcMpsbsc004.cells(id,dhxGridCalcMpsbsc004.getColIndexById("salarytyCode")).setValue(salarytyCode);
        	dhxGridCalcMpsbsc004.cells(id,dhxGridCalcMpsbsc004.getColIndexById("salaryitemCode")).setValue(salaryitemCode);
        	dhxGridCalcMpsbsc004.cells(id,dhxGridCalcMpsbsc004.getColIndexById("applcStdrSn")).setValue(applcStdrSn);
        	dhxGridCalcMpsbsc004.cells(id,dhxGridCalcMpsbsc004.getColIndexById("applcSe")).setValue("002"); //직급
        	
        	//dhxDataProcessor3.setUpdated(id, true,"updated");
        	dhxDataProcessor3.setUpdated(id, true);
//        	status = dhxDataProcessor3.getState(id);
//        	gf_Trace("status:::"+status);
        	
		});  
    } else {
        gf_NoFoundDataOnGridMsg('dataListCalcMpsbsc004');
    }
    cf_SetEventListenerMpsbsc004();
};

var fn_CallbackPopEmp = function(data) {
	
	dhxGridCalcMpsbsc004.cells(dhxGridCalcMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridCalcMpsbsc004,'applcCode')).setValue(data.empno);
	dhxGridCalcMpsbsc004.cells(dhxGridCalcMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridCalcMpsbsc004,'applyNm')).setValue(data.korNm);
};

var fn_CallbackPopDept = function(data) {
	//console.log(JSON.stringify(data));
	dhxGridCalcMpsbsc004.cells(dhxGridCalcMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridCalcMpsbsc004,'applcCode')).setValue(data.deptCode);
	dhxGridCalcMpsbsc004.cells(dhxGridCalcMpsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridCalcMpsbsc004,'applyNm')).setValue(data.deptKorNm);
};

