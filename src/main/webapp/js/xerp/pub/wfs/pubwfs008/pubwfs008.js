/**
 *    프로그램       : 자녀학비보조금신청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.27
 *    사용테이블      : MHS_SCHXPN_REQST
 * sourceGen version : 2020.07.16.01 (2020.07.27)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubwfs008 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubwfs008 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubwfs008 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubwfs008 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubwfs008 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubwfs008 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubwfs008 = 0;  //그리드 삭제 수량 
var dhxGridPubwfs008;  //그리드 객체
var eventIdPubwfs008 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPubwfs008;  //DataProcessor 객체
var uploadedFileKeysPrg3 = []; // db 저장용 (키만 파이프라인으로 구분)
var uploadedFileInfoPrg3 = []; // 화면에 저장된 정보 표시용 (삭제 기능)
var nowDate = "";

var totalAmt = 1500000;

var totaloperSportAmt = 0; // 운영 지원금액 합계
var totaltutfeeAmt = 0; // 수업료 금액 합계
var SumAmt = 0; // 운영지원금액 + 수업료금액 합계
var RemainAmt = 0; // totalAmt - SumAmt =  나머지 금액
var previousRowId;
var gBplcCode = "";

var userNm;
var userNo;
var userDeptNm;
var userDeptNo;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPubwfs008();
    if(cf_SetComponentsPubwfs008()){
       cf_SetEventListenerPubwfs008();
       cf_InitFormPubwfs008();
       cf_SetBindingPubwfs008();
       fn_FileUploadPrgEvent();	 //파일첨부
       cf_InitdatePubwfs008();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubwfs008 = function() {
    gf_SetMenuPath();
    $("#saveFormPubwfs008").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboSearchElctsctSttusCode', 'searchFormPubwfs008', 'searchFormPubwfs008', 'search', 'EA004', '' , '', '', 'ordr', '');//결재구분
    // 콤보박스로 가져올때 SQL 에서 FNC_COMCODENM 쿼리 사용할시  폼에서 find 에서 select 에러 남. 
    gf_ComboCode('divComboqu','qu','qu', 'sel', 'C058', '' , '', '', 'ordr', 'required','',''); //분기
    gf_ComboCode('divComboelctsctSttusCode','confmSttusCode','confmSttusCode', 'sel', 'C197', '' , '', '', 'ordr', 'required','',''); //분기
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;   
    
    $("#tutfeeAmtSaveFormPubwfs008").number(true);
    $("#operSportAmtSaveFormPubwfs008").number(true);
    $("#totalAmtSaveFormPubwfs008").number(true);
    $("#SumAmtSaveFormPubwfs008").number(true);
};

var cf_SetComponentsPubwfs008 = function() {
    var dhxGridPubwfs008HeaderInfo = [];
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPubwfs008" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('신청번호', '0', 'left', 'str', 'ro', true, 'reqstNo', '', '')); /* gf_LocaleTrans('default', 'titReqstNo') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('사원명', '80', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('발생 년도', '0', 'left', 'str', 'ro', true, 'occrrncYy', '', '')); /* gf_LocaleTrans('default', 'titOccrrncYy') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('자녀 명', '80', 'center', 'str', 'ro', false, 'chldrnNm', '', '')); /* gf_LocaleTrans('default', 'titChldrnNm') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('분기', '50', 'center', 'int', 'coro', false, 'qu', '', '')); /* gf_LocaleTrans('default', 'titQu') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('학교 명', '0', 'left', 'str', 'ro', true, 'schulNm', '', '')); /* gf_LocaleTrans('default', 'titSchulNm') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('학년', '0', 'right', 'int', 'ro', true, 'grade', '', '')); /* gf_LocaleTrans('default', 'titGrade') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('수업료 금액', '100', 'right', 'int', 'edn', false, 'tutfeeAmt', '', '')); /* gf_LocaleTrans('default', 'titTutfeeAmt') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('운영 지원 금액', '100', 'right', 'int', 'edn', false, 'operSportAmt', '', '')); /* gf_LocaleTrans('default', 'titOperSportAmt') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '100', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('지급일자', '100', 'center', 'str', 'ro', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titPymntDe') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('회계전표를 유일하게 식별할 수 있는 번호를 기록하는 항목', '0', 'left', 'str', 'ro', true, 'slipNo', '', '')); /* gf_LocaleTrans('default', 'titSlipNo') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '0', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호', '0', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드', '0', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '0', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('비고 항목', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '0', 'right', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '', '')); /* gf_LocaleTrans('default', 'titpymntSn') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('승인여부', '60', 'center', 'str', 'coro', false, 'confmSttusCode', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('승인일자', '0', 'center', 'str', 'ro', true, 'confmDe', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('승인자사원번호', '0', 'center', 'str', 'ro', true, 'confmerEmpno', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridPubwfs008HeaderInfo.push(gf_MakeDhxGridHeader('반려사유', '0', 'center', 'str', 'ro', true, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    
    dhxGridPubwfs008 = gf_MakeDhxGrid('dataListPubwfs008', dhxGridPubwfs008HeaderInfo, true, false, false);
    dhxGridPubwfs008.enableAutoWidth(false);
    dhxGridPubwfs008.setEditable(true);

    dhxGridPubwfs008.setColumnMinWidth(60,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    //분기
    var qujsonParameter = {codekindCode : "C058",exceptCode :"",sortOrder :"asc" };
    var qudataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', qujsonParameter, '');
    gf_ComboDataSet(dhxGridPubwfs008, dhxGridPubwfs008.getColIndexById("qu"), qudataSource.data, "sel");
    
    //승인신청상태
    var confmSttusCodejsonParameter = {codekindCode : "C197",exceptCode :"",sortOrder :"asc" };
    var confmSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', confmSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridPubwfs008, dhxGridPubwfs008.getColIndexById("confmSttusCode"), confmSttusCodedataSource.data, "sel");
    
    dhxGridPubwfs008.setNumberFormat("0,000", dhxGridPubwfs008.getColIndexById("tutfeeAmt"), ".", ",");
    dhxGridPubwfs008.setNumberFormat("0,000", dhxGridPubwfs008.getColIndexById("operSportAmt"), ".", ",");
    //C080 학교
    
    return true; 
};

var cf_SetEventListenerPubwfs008 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubwfs008 = gf_GridDetachEvent(dhxGridPubwfs008, eventIdPubwfs008);
    eventId = dhxGridPubwfs008.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubwfs008();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubwfs008.getColumnsNum();
            var rowNum = dhxGridPubwfs008.getRowsNum();
            var selectedId = dhxGridPubwfs008.getSelectedRowId();
            var ind        = dhxGridPubwfs008.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwfs008.getRowIndex(selectedId);
            var type       = dhxGridPubwfs008.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubwfs008.selectRow(0);
                    //fn_FindPubwfs008();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubwfs008.selectRow(rowIndex + 1);
                    fn_FindPubwfs008();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubwfs008.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwfs008.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubwfs008.getSelectedRowId();
            var ind        = dhxGridPubwfs008.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwfs008.getRowIndex(selectedId);
            var type       = dhxGridPubwfs008.getColType(ind);
            dhxGridPubwfs008.selectCell(rowIndex+1, ind);
            fn_FindPubwfs008();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwfs008.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubwfs008.getSelectedRowId();
            var ind        = dhxGridPubwfs008.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwfs008.getRowIndex(selectedId);
            var type       = dhxGridPubwfs008.getColType(ind);
            dhxGridPubwfs008.selectCell(rowIndex-1, ind);
            fn_FindPubwfs008();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwfs008.editCell();
            }
        }
        else return true;
    });
    eventIdPubwfs008.push(eventId);
    eventId = dhxGridPubwfs008.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubwfs008SortGridList(ind, type, direction); 
    });
    eventIdPubwfs008.push(eventId);
    eventId = dhxGridPubwfs008.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubwfs008.push(eventId);
    eventId = dhxGridPubwfs008.attachEvent("onRowSelect", function(rId, cInd){
    	dhxGridPubwfs008.editCell();
        if(previousRowId==rId){
    		return false;
    	} else {
    		var isCalcUpdated;
    		dhxGridPubwfs008.forEachRow(function(rowId) {	
    			if(!gf_IsNull(dhxDataProcessorPubwfs008.getState(rowId))) {
    				isCalcUpdated = true;
    				return false;
    			}
    		});
    		if(isCalcUpdated) 
    			// alert 보여주기
	    		gf_DivMsgConfirm('행을 변경하면 초기화 됩니다.',
	    				
				function(){ 
	    			// 확인버튼 클릭시 오는 함수
	    			previousRowId = rId;
	    			fn_SearchPubwfs008();
	    		},
				function(){ 
	    			// 취소 버튼 클릭시 오는 함수 
	    			previousRowId = rId; 
	    			dhxGridPubwfs008.selectRowById(previousRowId);
	    			});
    		else {
    			previousRowId = rId; 
    			fn_FindPubwfs008();
    		}
		}
    });
    eventIdPubwfs008.push(eventId);
    eventId = dhxGridPubwfs008.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdPubwfs008.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubwfs008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();


        fn_AddPubwfs008();
    });
    $('#btnSavePubwfs008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var pymntDe = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'pymntDe')).getValue();
    	if(!gf_IsNull(pymntDe)){
    		gf_DivMsgAlert("지급되어있는 항목은 수정이 불가능합니다.");
			return false;
		}
        // 수업료 입력한 금액을 가져온다
        var tutfeeAmt = Number(gf_FormGetValue('saveFormPubwfs008', 'tutfeeAmt', 'text'));
        // 운영지원금 입력한 금액을 가져온다
        var operSportAmt = Number(gf_FormGetValue('saveFormPubwfs008', 'operSportAmt', 'text'));
        // 두개의 금액의 합계를 구한다.
        var TotalSumAmt = tutfeeAmt+operSportAmt;
        // 만약 두개의 합계의 금액이 total금액보다 크다면 alert창 보여준다
        if((TotalSumAmt + SumAmt) > totalAmt){
        	gf_DivMsgAlert('남은 잔액은' + RemainAmt + '입니다. <br/> 다시 확인해주세요.');
        	return false;
        }else if((TotalSumAmt + SumAmt) < totalAmt){// 그게 아니라면 저장
           fn_SavePubwfs008();
        }
    });
    $('#btnRemovePubwfs008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
    	var pymntDe = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'pymntDe')).getValue();
    	if(!gf_IsNull(pymntDe)){
    		gf_DivMsgAlert("지급되어있는 항목은 수정이 불가능합니다.");
			return false;
		} else{
			fn_RemovePubwfs008();
		}
    });
    $('#btnExcelPubwfs008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubwfs008();
    });
    $('#btnSearchPubwfs008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubwfs008('');
    });
    $('#btnResetPubwfs008').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubwfs008();
    });
    $('#btnBugtAdd').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubwfs008, 'chk');
        if(gf_IsNull(rowIds)){
    		gf_DivMsgAlert("승인요청할 항목을 선택해 주세요.");
			return false;
		}
        //var confmSttusCode = gf_FormSetValue("saveFormPubwfs008", "confmSttusCode", gf_DhxGetValue(dhxGridPubwfs008, rId, 'confmSttusCode',  'grid'), 'combo');
        var confmSttusCode = gf_FormGetValue('saveFormPubwfs008', 'confmSttusCode', 'combo');
        var pymntDe = dhxGridPubwfs008.cells(rowIds, gf_GetDhxGridColumId(dhxGridPubwfs008,'pymntDe')).getValue();
        //var confmSttusCode = dhxGridPubwfs008.cells(rowIds, gf_GetDhxGridColumId(dhxGridPubwfs008,'confmSttusCode')).getValue();
    	if(!gf_IsNull(pymntDe)){
    		gf_DivMsgAlert("지급되어있는 항목은 수정이 불가능합니다.");
			return false;
		} else if((confmSttusCode == "003")||(confmSttusCode == "002")||(confmSttusCode == "001")){
			gf_DivMsgAlert("반려, 승인신청 상태일때는 <br/>승인요청 할수 없습니다.");
			return false;
		} else{
			fn_BugtAdd();
		}
        
    });
    $('#btnBugtcopy').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        
        var rowId = dhxGridPubwfs008.getSelectedRowId(); // 복사할 항목을 가져온다.
        //var state = dhxDataProcessorPubwfs008.getState(rowId);
        
//    	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubwfs008, 'chk');
//    	if(gf_IsNull(rowIds)){
//    		gf_DivMsgAlert("복사할 항목을 선택해 주세요.");
//			return false;
//		}
    	var confmSttusCode = gf_FormGetValue('saveFormPubwfs008', 'confmSttusCode', 'combo');
    	var pymntDe = dhxGridPubwfs008.cells(rowId, gf_GetDhxGridColumId(dhxGridPubwfs008,'pymntDe')).getValue();
    	if(!gf_IsNull(pymntDe)){
    		gf_DivMsgAlert("지급되어있는 항목은 수정이 불가능합니다.");
			return false;
		} else if(confmSttusCode != "003"){
			gf_DivMsgAlert("반려 상태만 복사가 가능합니다.");
		} else if(confmSttusCode == "003"){
				gf_DivMsgConfirm("복사하시겠습니까? <br/> 기존에 입력사항은 삭제 됩니다.", 'fn_CopyData()', '');
		}
    });
    
    //사용자 찾기 
    $('#btnUseEmpSearch').unbind('click').bind('click', function(event){
    	// form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    	gf_EmpPopup("saveFormPubwfs008","empnoSaveFormPubwfs008","korNmSaveFormPubwfs008", gBplcCode, "N", "");  //
    });
    
    // 사원, 부서 pop 이벤트 ===========================================================================================
    //사원 선택 검색
	$('#searchFormPubwfs008 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormPubwfs008","empNmSearchFormPubwfs008","empCodeNmSearchFormPubwfs008", gBplcCode, "Y", "fn_CallbackSearchPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//사원 입력 후 Enter 이벤트
	$('#empNmSearchFormPubwfs008').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#empCodeNmSearchFormPubwfs008').focus();
	    }
    });
	$('#empCodeNmSearchFormPubwfs008').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("1");
	    }
    });
	//사원 선택 Popup
    $('#searchFormPubwfs008 #btnempnoSearchSearchFormPubwfs008').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormPubwfs008","empno","korNm", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
    //부서 선택 Popup
	$('#searchFormPubwfs008 #btnDeptCodeSearchSearchFormPubwfs008').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormPubwfs008","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#korNm').focus();
	    }
    });
	$('#empCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("1");
	    }
    });
	
	//부서 입력 후 Enter 이벤트
	$('#deptCodeSearchFormMpscal022').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }
    });
	$('#deptCodeNmSearchFormMpscal022').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }
    });
	
    // 기타 이벤트 ==========================================================================================
    $('#checkAllPubwfs008').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridPubwfs008, $('#checkAllPubwfs008').prop('checked'), 'chk');
    });
    $('#searchFormPubwfs008 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPubwfs008').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwfs008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormPubwfs008 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPubwfs008",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwfs008 input[name="reqstNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'reqstNo', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="korNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'korNm', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'empno', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="occrrncYy"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'occrrncYy', $(this).val());
    });
    
    
    $('#saveFormPubwfs008 select[name="qu"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'qu', $(this).val());
    });
//    $('#saveFormPubwfs008 select[name="confmSttusCode"]').unbind('click blur').bind('click blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'confmSttusCode', $(this).val());
//    });
    $('#saveFormPubwfs008 input[name="chldrnNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'chldrnNm', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="schulNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'schulNm', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="grade"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'grade', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="tutfeeAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'tutfeeAmt', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="operSportAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'operSportAmt', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="reqstDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'reqstDe', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="pymntDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'pymntDe', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="slipNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'slipNo', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'atchmnflNo', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="elctsctDocNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'elctsctDocNo', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="elctsctSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'elctsctSttusCode', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="elctsctEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'elctsctEmpno', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'rm', $(this).val());
    });
    $('#saveFormPubwfs008 input[name="elctsctSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'elctsctSeSn', $(this).val());
    });
    $('#saveFormPubwfs008 select[name="confmSttusCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwfs008, dhxDataProcessorPubwfs008, 'confmSttusCode', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitdatePubwfs008 = function(){
	if(init()){   // 초기화
		init1();  // 일반달력 초기화
		init4();
	}
};

function init(){
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
$('#saveFormPubwfs008 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
	dateChk($(this));
});
//금일 조회
var today = new Date();
nowDate = dateFormat(today);
return(nowDate);
}

//일반달력
function init1(){
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"reqstDeSaveFormPubwfs008", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	//금일 날짜표시 billIsuDe
	$('#reqstDeSaveFormPubwfs008').val(nowDate);
}

function init4(){
	//달력 생성  : yearpicker 사용
	//금일 날짜표시
	var today = new Date();
	nowDate = dateFormat(today);
	$('#applcYySearchFormPubwfs008').val(nowDate.substring(0,4));

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#applcYySearchFormPubwfs008').yearpicker({
        year: currentYear,
        startYear: startYear,
        endYear: endYear
      });
    
    $('#applcYySearchFormPubwfs008').yearpicker({
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

var cf_InitFormPubwfs008 = function() {
    $('#searchFormPubwfs008').resetForm();
    
    
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    console.log(userInfo)
    gf_FormSetValue("searchFormPubwfs008", "empno", userInfo.data.userEmpNo, 'text');
	gf_FormSetValue("searchFormPubwfs008", "korNm", userInfo.data.userNm, 'text');
	gf_FormSetValue("searchFormPubwfs008", "deptCodeNm", userInfo.data.userDeptNm, 'text');
	gf_FormSetValue("searchFormPubwfs008", "deptCode", userInfo.data.userDeptCode, 'text');
    $('#deptCode').prop('disabled', true);
    $('#deptCodeNm').prop('disabled', true);
    $('#empno').prop('disabled', true);
    $('#korNm').prop('disabled', true);
    $("#btnDeptCodeSearchSearchFormPubwfs008").attr('disabled',true);
    $("#btnempnoSearchSearchFormPubwfs008").attr('disabled',true);
    
};

var cf_SetBindingPubwfs008 = function() {
    fn_FormDisabled(false);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchPubwfs008('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchPubwfs008 = function(userId) {
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormPubwfs008', 'empno', 'text'),
        deptCode : gf_FormGetValue('searchFormPubwfs008', 'deptCode', 'text'),
        applcYy : gf_FormGetValue('searchFormPubwfs008', 'applcYy', 'text')
        
    };
    gf_Transaction(userId, 'pubwfs008/searchPubwfs008', jsonParameter, 'fn_CallbackSearchPubwfs008', false, 'GET');
};

var fn_CallbackSearchPubwfs008 = function(strSvcID, targetID, data) {
    //dhxGridPubwfs008.clearAll();
    dhxGridPubwfs008.destructor();
    if(cf_SetComponentsPubwfs008()){ 
        fn_DhxDataProcessorPubwfs008(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPubwfs008');
            dhxGridPubwfs008.parse(data.data.records, 'js');
 
            dhxGridPubwfs008.forEachRow(function(rowId) {
    			var reqstDe = gf_DhxGetValue(dhxGridPubwfs008, rowId, 'reqstDe', 'grid');
    			var confmSttusCode = dhxGridPubwfs008.cells(rowId, gf_GetDhxGridColumId(dhxGridPubwfs008,'confmSttusCode')).getValue();
    			if (!gf_IsNull(reqstDe)){
    				dhxGridPubwfs008.cells(rowId,7).setDisabled(true);
    				dhxGridPubwfs008.cells(rowId,10).setDisabled(true);
    				dhxGridPubwfs008.cells(rowId,11).setDisabled(true);
    				dhxGridPubwfs008.cells(rowId,23).setDisabled(true);
    			}
    	    });

            if(save_Row_Num_Pubwfs008 == 0 && save_All_Sta_Pubwfs008 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPubwfs008.selectRow(0); 
            } else if(save_Row_Sta_Pubwfs008 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPubwfs008.selectRow(0);
            } else if(save_All_Sta_Pubwfs008 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPubwfs008.selectRow(save_Row_Num_Pubwfs008); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPubwfs008.selectRow(save_Row_Num_Pubwfs008);   //개발자 수정 필요  
                //var findCell = dhxGridPubwfs008.findCell(save_Row_Ids_Pubwfs008, gf_GetDhxGridColumId(dhxGridPubwfs008,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPubwfs008.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPubwfs008.selectRow(0);
                //} 
            } 
 
            fn_FindPubwfs008();
        } else {
            gf_NoFoundDataOnGridMsg('dataListPubwfs008');
            fn_InitInputFormPubwfs008();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormPubwfs008").text(data.data.records.length);
        cf_SetEventListenerPubwfs008();
    } 
};
var fn_DhxDataProcessorPubwfs008 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubwfs008 = new dataProcessor(gv_ContextPath+'/pubwfs008/savePubwfs008'); //lock feed url
    dhxDataProcessorPubwfs008.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubwfs008.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubwfs008.init(dhxGridPubwfs008); //link dataprocessor to the grid
    dhxDataProcessorPubwfs008.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubwfs008.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubwfs008.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPubwfs008();
                    $("#checkAllPubwfs008").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 상세조회
 */
var fn_FindPubwfs008 = function() {
    var rId = dhxGridPubwfs008.getSelectedRowId();
    var status = dhxDataProcessorPubwfs008.getState(rId);
    
    fn_FormDisabled(false);

    gf_FormSetValue("saveFormPubwfs008", "reqstNo", gf_DhxGetValue(dhxGridPubwfs008, rId, 'reqstNo',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "empno", gf_DhxGetValue(dhxGridPubwfs008, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "korNm", gf_DhxGetValue(dhxGridPubwfs008, rId, 'korNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "occrrncYy", gf_DhxGetValue(dhxGridPubwfs008, rId, 'occrrncYy',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "qu", gf_DhxGetValue(dhxGridPubwfs008, rId, 'qu',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubwfs008", "chldrnNm", gf_DhxGetValue(dhxGridPubwfs008, rId, 'chldrnNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "schulNm", gf_DhxGetValue(dhxGridPubwfs008, rId, 'schulNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "grade", gf_DhxGetValue(dhxGridPubwfs008, rId, 'grade',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "tutfeeAmt", gf_DhxGetValue(dhxGridPubwfs008, rId, 'tutfeeAmt',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "operSportAmt", gf_DhxGetValue(dhxGridPubwfs008, rId, 'operSportAmt',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "reqstDe", gf_DhxGetValue(dhxGridPubwfs008, rId, 'reqstDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "pymntDe", gf_DhxGetValue(dhxGridPubwfs008, rId, 'pymntDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "slipNo", gf_DhxGetValue(dhxGridPubwfs008, rId, 'slipNo',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "atchmnflNo", gf_DhxGetValue(dhxGridPubwfs008, rId, 'atchmnflNo',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "elctsctDocNo", gf_DhxGetValue(dhxGridPubwfs008, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "elctsctSttusCode", gf_DhxGetValue(dhxGridPubwfs008, rId, 'elctsctSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "elctsctEmpno", gf_DhxGetValue(dhxGridPubwfs008, rId, 'elctsctEmpno',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "rm", gf_DhxGetValue(dhxGridPubwfs008, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "elctsctSeSn", gf_DhxGetValue(dhxGridPubwfs008, rId, 'elctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "pymntSn", gf_DhxGetValue(dhxGridPubwfs008, rId, 'pymntSn',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "applcYm", gf_DhxGetValue(dhxGridPubwfs008, rId, 'applcYm',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "returnResn", gf_DhxGetValue(dhxGridPubwfs008, rId, 'returnResn',  'grid'), '');
    gf_FormSetValue("saveFormPubwfs008", "confmSttusCode", gf_DhxGetValue(dhxGridPubwfs008, rId, 'confmSttusCode',  'grid'), 'combo');
    
    gf_FormSetValue('saveFormPubwfs008', 'atchmnfl', gf_DhxGetValue(dhxGridPubwfs008, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormPubwfs008', 'atchmnflList', gf_DhxGetValue(dhxGridPubwfs008, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일
    var jsonParameter = { atchFiles : gf_DhxGetValue(dhxGridPubwfs008, rId, 'atchmnflNo',  'grid') };
	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
	
    var empno = gf_FormGetValue('saveFormPubwfs008', 'empno', 'text');
    var chldrnNm = gf_FormGetValue('saveFormPubwfs008', 'chldrnNm', 'text');
    var qu = gf_FormGetValue('saveFormPubwfs008', 'qu', 'combo');
    
    var jsonParameter = {
            empno : empno,
            chldrnNm : chldrnNm,
            qu : qu
        };
    gf_Transaction('', 'pubwfs008/searchPubwfsChldrn', jsonParameter, 'fn_CallbackSearchPubwfsChldrn', false, 'GET');
    
    // 그리드 반복문을 돌린다.
    dhxGridPubwfs008.forEachRow(function(rowId) {
    	// 승인여부의 값을 가져온다.
		var confmSttusCode = dhxGridPubwfs008.cells(rowId, gf_GetDhxGridColumId(dhxGridPubwfs008,'confmSttusCode')).getValue();
		// 승인여부의 값이 null 이 아닐경우 disabled == true (체크박스)
			if(!gf_IsNull(confmSttusCode)){
				dhxGridPubwfs008.cells(rowId,1).setDisabled(true);
			}
    });
    
    // 그리드와 맵핑되어있는 승인여부의 값을 가져온다.
    var confmSttusCode = gf_FormGetValue('saveFormPubwfs008', 'confmSttusCode', 'combo');
    // 만약 001 / 002/ 003 이 아닐경우 form 에 Disabled = ture 
    if((confmSttusCode == '001') || (confmSttusCode == '002') || (confmSttusCode == '003')){
    	 fn_FormDisabled(true);
    }else{
        // 아니라면 form 에 Disabled = false
    	 fn_FormDisabled(false);
    }
	
    if(status == 'inserted') {
        $('#saveFormPubwfs008 input[name="reqstNo"]').prop('disabled', false);
        $('#saveFormPubwfs008 input[name="empno"]').prop('disabled', false);
    } else {
        $('#saveFormPubwfs008 input[name="reqstNo"]').prop('disabled', true);
        $('#saveFormPubwfs008 input[name="empno"]').prop('disabled', true);
    }
};
var fn_CallbackSearchPubwfsChldrn = function(strSvcID, targetID, data) {
	if(!gf_IsNull(data.data.records)){
		data.data.records.forEach(function(row) {
			// operSportAmt 운영 지원금액 
			// tutfeeAmt 수업료 금액
			// var totalAmt = 1500000; 총 금액
			if(row.tut == "수업료합계"){
				totaltutfeeAmt = Number(row.totalTut);
			}
			if(row.oper == "운영금액합계"){
				totaloperSportAmt = Number(row.totalOper);
			}
		});
		
		SumAmt = totaloperSportAmt + totaltutfeeAmt;
		RemainAmt  = totalAmt - SumAmt;
		gf_FormSetValue("saveFormPubwfs008", "SumAmt", SumAmt, 'text');
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormPubwfs008 = function() {
//    $('#saveFormPubwfs008 input[name="reqstNo"]').prop('disabled', false);
//    $('#saveFormPubwfs008 input[name="empno"]').prop('disabled', false);
    $('#saveFormPubwfs008').resetForm();
    $('#reqstDeSaveFormPubwfs008').val(nowDate);
    
    //$("#filePubwfs008").attr('style', "display:none;");//hidden 초기화 
    //$("#atchmnfl").val("");  //hidden 초기화
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormPubwfs008 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddPubwfs008 = function() {
    dhxGridPubwfs008.clearSelection();
    fn_InitInputFormPubwfs008();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //reqstNo
    initValueArr.push(''); //empno
    initValueArr.push(''); //occrrncYy
    initValueArr.push(''); //qu
    initValueArr.push(''); //chldrnNm
    initValueArr.push(''); //schulNm
    initValueArr.push(''); //grade
    initValueArr.push(''); //tutfeeAmt
    initValueArr.push(''); //operSportAmt
    initValueArr.push(''); //reqstDe
    initValueArr.push(nowDate); //pymntDe
    initValueArr.push(''); //slipNo
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //elctsctDocNo
    initValueArr.push(''); //elctsctSttusCode
    initValueArr.push(''); //elctsctEmpno
    initValueArr.push(''); //rm
    initValueArr.push(''); //elctsctSeSn
    dhxGridPubwfs008.addRow(dhxGridPubwfs008.uid(), initValueArr, 0);
    dhxGridPubwfs008.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPubwfs008');
    $('#btnPopEmpSearchPubwfs008').show();
    fn_FormDisabled(false);

}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pubwfs008SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubwfs008, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubwfs008', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubwfs008', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubwfs008, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubwfs008.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubwfs008', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubwfs008', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwfs008, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubwfs008.setSortImgState(false); 
            gf_FormSetValue('searchFormPubwfs008', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubwfs008', 'sortColumId', '', 'text'); 
            dhxGridPubwfs008.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPubwfs008.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubwfs008', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubwfs008', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwfs008, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
var fn_BugtAdd = function() {
	// 체크된 항목을 가져온다
	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubwfs008, 'chk');
        // 체크된 항목 반복문
		$(rowIds).each(function(index, rowId){
			// 선택된 값마다 해당 지급일자 Set 해준다.
			dhxGridPubwfs008.cells(rowId, gf_GetDhxGridColumId(dhxGridPubwfs008, 'confmSttusCode')).setValue("001");
			// Set이 된 이후 그리드 업데이트 실행 해준다.
			dhxDataProcessorPubwfs008.setUpdated(rowId, true, 'updated');
		});
		dhxDataProcessorPubwfs008.sendData();
}

/**
 * 입력데이터 서버 전송
 */
var fn_SavePubwfs008 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pubwfs008 = 0; 
    save_Edt_Cnt_Pubwfs008 = 0; 
    save_Del_Cnt_Pubwfs008 = 0; 
    dhxGridPubwfs008.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPubwfs008.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPubwfs008.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pubwfs008 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pubwfs008 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pubwfs008 += 1; 
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
        save_All_Sta_Pubwfs008 = 0; 
        if(save_Add_Cnt_Pubwfs008 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Pubwfs008 + "건";
            save_All_Sta_Pubwfs008 = 1; 
        } 
        if(save_Edt_Cnt_Pubwfs008 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Pubwfs008 + "건"; 
        } 
        if(save_Del_Cnt_Pubwfs008 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Pubwfs008 + "건"; 
            save_All_Sta_Pubwfs008 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalPubwfs008(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPubwfs008(confirmMsg)){  //여기는 안옴 
        
        
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalPubwfs008 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubwfs008_Send();
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubwfs008_Send = function() {
    if(fn_GridValidation(dhxGridPubwfs008, dhxDataProcessorPubwfs008)) {
        dhxDataProcessorPubwfs008.sendData();
    }
//	if(fn_GridValidation(dhxGridPubwfs008, dhxDataProcessorPubwfs008)) {
//      dhxDataProcessorPubwfs008.sendData();
//	}
    
}
/**
 * 삭제
 */
var fn_RemovePubwfs008 = function() {
    var rowId = dhxGridPubwfs008.getSelectedRowId();
    var state = dhxDataProcessorPubwfs008.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridPubwfs008.getRowIndex(rowId);
        dhxGridPubwfs008.deleteRow(rowId);
        dhxGridPubwfs008.selectRow(rowNum);
        fn_FindPubwfs008();
    }
    else dhxDataProcessorPubwfs008.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPubwfs008 = function () {
    var titPubwfs008 = '자녀학비보조금신청'; /* gf_LocaleTrans('default', 'titPubwfs008') */
    var jsonParameter = {
        reqstNo : gf_FormGetValue('searchFormPubwfs008', 'reqstNo', 'text'),
        empno : gf_FormGetValue('searchFormPubwfs008', 'empno', 'text')
    };
    var header = [[
        '신청번호' /* gf_LocaleTrans('default', 'titReqstNo') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '분기' /* gf_LocaleTrans('default', 'titQu') */,
        '자녀 명' /* gf_LocaleTrans('default', 'titChldrnNm') */,
        '학교 명' /* gf_LocaleTrans('default', 'titSchulNm') */,
        '학년' /* gf_LocaleTrans('default', 'titGrade') */,
        '수업료 금액' /* gf_LocaleTrans('default', 'titTutfeeAmt') */,
        '운영 지원 금액' /* gf_LocaleTrans('default', 'titOperSportAmt') */,
        '신청일자' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '지급일자' /* gf_LocaleTrans('default', 'titPymntDe') */,
        '비고 항목' /* gf_LocaleTrans('default', 'titRm') */,
    ]];
    var dataId = [[ 'reqstNo', 'empno', 'qu', 'chldrnNm', 'schulNm', 'grade', 'tutfeeAmt', 'operSportAmt', 'reqstDe', 'pymntDe','rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
    var sheetNm = [[ titPubwfs008 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubwfs008;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubwfs008/excelPubwfs008', jsonParameter);
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
    $('#saveFormPubwfs008 #schulNmSaveFormPubwfs008').parent().append(
    	    '<div class="error" id="quSaveFormPubwfs008-error" onclick="$(this).remove()">동일한 분기가 존재합니다. <br/> 확인해주세요.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubwfs008 = function(qu, chldrnNm, korNm){
    if(!gf_IsNull(qu) && !gf_IsNull(chldrnNm) && !gf_IsNull(korNm)) {
    	 //&& !gf_IsNull(empno)
        var jsonParameter = {
        	korNm : korNm,
            chldrnNm : chldrnNm,
            qu : qu
        };
        var dataSource = gf_NoAsyncTransaction('pubwfs008/findPubwfs008', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.qu) && gf_IsNull(data.chldrnNm) && gf_IsNull(data.korNm)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}
/**
 * 폼데이터 db 체크
 */
var fn_FormValidation =  function(rowId){
    var state = dhxDataProcessorPubwfs008.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormPubwfs008').validate().form()){
                if(state == 'inserted') {
                    var qu = gf_FormGetValue('saveFormPubwfs008', 'qu', 'text');
                    if(fn_CheckDupPubwfs008(qu)) return true;
                    else return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else {
        return true;
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
    var checkQu;
    var checkKorNm;
    var checkchldrnNm;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Pubwfs008 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Pubwfs008 == 'deleted') {
        save_Row_Num_Pubwfs008 = 0;
        save_Row_Ids_Pubwfs008 = "";
    } else if(save_Row_Sta_Pubwfs008 == 'inserted') {
        save_Row_Num_Pubwfs008 = rowNum;
        save_Row_Ids_Pubwfs008 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubwfs008 = rowNum;
        save_Row_Ids_Pubwfs008 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'qu', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qu');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'tutfeeAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'tutfeeAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'operSportAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'operSportAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'korNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'korNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'chldrnNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'chldrnNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'atchmnflNo', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'atchmnflNo');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    //checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    checkQu = gf_DhxGetValue(dhxGridObjet, rowId, 'qu', 'grid');
                    checkchldrnNm = gf_DhxGetValue(dhxGridObjet, rowId, 'chldrnNm', 'grid');
                    checkKorNm = gf_DhxGetValue(dhxGridObjet, rowId, 'korNm', 'grid');
                    if(!gf_IsNull(checkQu,checkchldrnNm,checkKorNm)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var qu = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'qu', 'grid');
                            var chldrnNm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'chldrnNm', 'grid');
                            var korNm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'korNm', 'grid');
                            if(((qu == checkQu) && (chldrnNm == checkchldrnNm) && (korNm == checkKorNm)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qu');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'chldrnNm');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'korNm');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
//                        if(!fn_CheckDupPubwfs008(qu)){
//                            validFalseDuplicationKey = true;
//                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qu');
//                            valid = false;
//                        }
                        // 그리드 중복된 처음 추가된 row 체크
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                        	gf_DivMsgAlert("이미 등록되어있는 항목과 중복됩니다.");
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
        dhxGridPubwfs008.selectRowById(validFalseFistRowId);
        fn_FindPubwfs008();
        fn_FormValidation(validFalseFistRowId);
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

//첨부파일 영역 
var fn_FileUploadPrgEvent = function(){
	
	$(".file_box").css('height','75px'); //높이 줄이기
	
	$('#fileUpload3').unbind("click").bind("click",function(event){
		gf_FileUploadPopup(
				'fn_FileUploadPrgEvent', 
				'btnUploadedFiledelete3', 
				'fileList3', 
				'atchmnfl', 
				 uploadedFileKeysPrg3, 
				 uploadedFileInfoPrg3,
				 0,
				'all',
		        'fn_CallBackPrgFileUpload');
	});
	
	$('.btnUploadedFiledelete3').unbind("click").bind("click",function(event){			
		 
		uploadedFileKeysPrg3.splice($(this).attr('idx'), 1);
		uploadedFileInfoPrg3.splice($(this).attr('idx'), 1);
		
		$('#fileList3 .file_box table tr').remove();
		
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		
		$.each( uploadedFileInfoPrg3, function( key, value ) {
			
			fileInfos = uploadedFileInfoPrg3[key].split('|^|');
			
			atchFileList.push('<tr>');
			atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
			atchFileList.push('<td class="ar">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
			atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
			atchFileList.push('</tr>');

			idx++;
		});								
		
		$('#fileList3 .file_box table').append(atchFileList.join(""));
		$('#atchmnfl').val(uploadedFileKeysPrg3.join("|"));
		
		fn_FileUploadPrgEvent();
		
	});
}
	
var fn_SearchPrgFileList = function (strSvcID, targetID, data){
	$('#fileList3 .file_box table tr').remove();
	uploadedFileKeysPrg3 = [];
	uploadedFileInfoPrg3 = [];

	var atchFileList = [];
	var idx = 0;
	$.each( data.data, function( key, value ) {
		uploadedFileKeysPrg3.push(value.atchFileId);				
		uploadedFileInfoPrg3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
		
		atchFileList.push('<tr style=\"border:0\">');
		atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ar">'+gf_FileSizeExpression(value.fileSize)+'</td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');
		
		idx++;
	});

	if(gf_IsNull(atchFileList)) {				
		atchFileList.push('<tr>');
		atchFileList.push('<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>');				
		atchFileList.push('</tr>');								
	}
	
	$('#fileList3 .file_box table').append(atchFileList.join(""));
	$('#atchFileIds3').val(uploadedFileKeysPrg3.join("|"));
	fn_FileUploadPrgEvent();
};	

 
var fn_CallBackPrgFileUpload = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	if(!gf_IsNull(data)){
		
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		keyArr  = [];  //기존파일들 배열 초기화
		infoArr = [];
		
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
		});
		
		$('#'+viewDivId+' .file_box table tr').remove();
		$('#'+dataDivId).val("");
		$.each( infoArr, function( key, value ) {
			
			fileInfos = infoArr[key].split('|^|');

			atchFileList.push('<tr>');
			atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
			atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
			atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del '+deleteBtnClassNm+'"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
			atchFileList.push('</tr>');
				 
			idx++;
		});								
					
		$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
		$('#'+dataDivId).val(keyArr.join("|"));
		gf_FormSetValue('saveFormPubwfs008', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormPubwfs008', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
      callbacks.fire();
	}
};

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormPubwfs008', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormPubwfs008', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormPubwfs008', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormPubwfs008', 'korNm', 'text');
	}
	else if(gubun == "2"){
		empno = gf_FormGetValue('searchFormPubwfs008', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormPubwfs008', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormPubwfs008', 'agentEmpno', 'text');
		korNm = gf_FormGetValue('searchFormPubwfs008', 'agentEmpNm', 'text');
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
	 		gf_FormSetValue('searchFormPubwfs008', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormPubwfs008', 'empCodeNm', data.korNm, 'text');
	  	}
	  	else if(strSvcID == "2"){
	  		gf_FormSetValue('searchFormPubwfs008', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormPubwfs008', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormPubwfs008', 'deptCodeNm', data.deptCodeNm, 'text');
	  	}
	  	else {
	 		gf_FormSetValue('searchFormPubwfs008', 'agentEmpno', data.empno, 'hidden');
	 		gf_FormSetValue('searchFormPubwfs008', 'agentEmpNm', data.korNm, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormPubwfs008","empNo","empCodeNm", gBplcCode, "Y");
	  	}
	  	else if(strSvcID == "2"){
	  		gf_EmpPopup("searchFormPubwfs008","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormPubwfs008","agentEmpno","agentEmpNm", gBplcCode, "Y");
	  	}
  	}
	
}
//전년도 데이터 복사
var fn_CopyData = function() {
	
	
	var empno = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'empno')).getValue();
	var chldrnNm = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'chldrnNm')).getValue();
	var qu = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'qu')).getValue();
	var occrrncYy = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'occrrncYy')).getValue();
	var schulNm = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'schulNm')).getValue();
	var grade = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'grade')).getValue();
	var tutfeeAmt = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'tutfeeAmt')).getValue();
	var operSportAmt = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'operSportAmt')).getValue();
	var reqstDe = nowDate;
	var slipNo = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'slipNo')).getValue();
	var atchmnflNo = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'atchmnflNo')).getValue();
	var elctsctDocNo = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'elctsctDocNo')).getValue();
	var elctsctSttusCode = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'elctsctSttusCode')).getValue();
	var elctsctEmpno = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'elctsctEmpno')).getValue();
	var rm = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'rm')).getValue();
	var elctsctSeSn = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'elctsctSeSn')).getValue();
	
	//var confmSttusCode = dhxGridPubwfs008.cells(dhxGridPubwfs008.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubwfs008,'confmSttusCode')).getValue();
	
	var jsonParameter = {
		empno : empno,
		chldrnNm : chldrnNm,
		qu : qu,
		occrrncYy : occrrncYy,
		schulNm : schulNm,
		grade : grade,
		tutfeeAmt : tutfeeAmt, 
		operSportAmt : operSportAmt,
		reqstDe : reqstDe,
		slipNo : slipNo,
		atchmnflNo : atchmnflNo,
		elctsctDocNo : elctsctDocNo,
		elctsctSttusCode : elctsctSttusCode,
		elctsctEmpno : elctsctEmpno,
		rm : rm,
		elctsctSeSn : elctsctSeSn
	}

	var dataSource = gf_NoAsyncTransaction('pubwfs008/saveCopyPubwfs', jsonParameter, 'POST');

	if (dataSource.code === '000') {
		gf_DivMsgAlert(gf_LocaleTrans('default', 'mgsProcess')); // "정상처리
																	// 되었습니다
		cf_InitParamPubwfs008();
		fn_SearchPubwfs008();
	}
}


