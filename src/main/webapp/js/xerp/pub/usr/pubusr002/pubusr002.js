/**
 *    프로그램       : 개인정보변경신청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2021.06.07
 *    사용테이블      : MHS_EMP_CHANGE
 * sourceGen version :  2021.06.07 (2021.06.07)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubusr002 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubusr002 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubusr002 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubusr002 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubusr002 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubusr002 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubusr002 = 0;  //그리드 삭제 수량 
var dhxGridPubusr002;  //그리드 객체
var eventIdPubusr002 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPubusr002;  //DataProcessor 객체
var uploadedFileKeys = [];
var uploadedFileInfo = [];
var gBplcCode = "1000";  //사업장 코드 , Sample 에서는 1000으로 고정, 실제 프로그램에서는 화면에서 받아서 사용
var g_empno;
var g_empNm;
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var tabbarPubusr002;
var dhxCCalendarTab1MrrgDe; 
var addRowCheck = 0;
var tab_empno;
var tab_changeReqstSn;
var tab_reqstDe;
var tab_confmSttusCode;
var tabId='a1';
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
	cf_InitParamPubusr002();
    if(cf_SetComponentsPubusr002()){
       cf_SetEventListenerPubusr002();
       cf_InitFormPubusr002();
       cf_SetBindingPubusr002();
       cf_CheckButtonAuth();
    }
});

$(window).resize(function() {
	tabbarPubusr002.setSizes();
});

/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_CheckButtonAuth = function(){				// 공통 함수 커스터마이징 (일괄 등록 및 상태 수정 버튼)
	var menuId = null;
	if(typeof top.dhxMenuTabbars != "undefined"){
		menuId = top.dhxMenuTabbars.getActiveTab();
		if(!gf_IsNull(menuId)) {
			var userMenu = gf_GetLocalStorageData('userMenu', true);
			var menuItem;
			userMenu.some(function(item) { 
				if(item.id == menuId) {
					menuItem = item;
					return true;
				}
			});
//			console.log(menuItem);
			// 삭제
			if(menuItem.topMenuId != 'PUBMNG000') {
				$('#liAddPubusr002').remove();
				$('#liRemovePubusr002').remove();
				$('#liSavePubusr002').remove();
				$('#btnChangePwPubusr002').remove();
				$('#btnChangeSavePubusr002').remove();
			}
		}
	}
}
var cf_InitParamPubusr002 = function() {
    gf_SetMenuPath();
    $("#saveFormPubusr002Tab1").validate({ errorElement: 'div', ignore: '' });
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno = userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm;   
	
	gf_FormSetValue('searchFormPubusr002', 'empNumber', userno, 'text');
	gf_FormSetValue('searchFormPubusr002', 'empName', userNm, 'text');
    // 사용자 정보
	/*g_empno = gf_GetLocalStorageData('empno', false);
	g_empNm = gf_GetLocalStorageData('userNm', false);
	gf_FormSetValue('searchFormPubusr002', 'empno', g_empno, 'text');
	gf_FormSetValue('searchFormPubusr002', 'empNm', g_empNm, 'text');*/
	gf_MakeComboBasic('divComboBplcKorNm', 'searchComboStmBizplc', '', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '1000');
	
	fn_SetTabbar();
	fn_Calendar();
	fn_FileUploadBtnEvent();
};

var cf_SetComponentsPubusr002 = function() {
	var dhxGridPubusr002HeaderInfo = [];
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPubusr002" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('성명', '60', 'center', 'str', 'ro', false, 'empNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('신청일', '80', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('변경구분', '80', 'center', 'str', 'ro', false, 'changeSeNm', '', '')); /* gf_LocaleTrans('default', 'titChangeSe') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('승인여부', '80', 'center', 'str', 'ro', false, 'confmSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titConfmSttusCode') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('승인 일자', '80', 'left', 'str', 'ro', false, 'confmDe', '', '')); /* gf_LocaleTrans('default', 'titConfmDe') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('반려 사유', '*', 'left', 'str', 'ro', false, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('변경 신청 순번', '100', 'left', 'str', 'ro', true, 'changeReqstSn', '', '')); /* gf_LocaleTrans('default', 'titChangeReqstSn') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '100', 'left', 'str', 'ro', true, 'atchmnflNoEdit', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '100', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('승인 사원번호', '100', 'center', 'str', 'ro', true, 'confmEmpno', '', '')); /* gf_LocaleTrans('default', 'titConfmEmpno') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('변경구분', '80', 'center', 'str', 'ro', true, 'changeSe', '', '')); /* gf_LocaleTrans('default', 'titChangeSe') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('승인여부', '80', 'center', 'str', 'ro', true, 'confmSttusCode', '', '')); /* gf_LocaleTrans('default', 'titConfmSttusCode') */
    dhxGridPubusr002HeaderInfo.push(gf_MakeDhxGridHeader('CHK', '80', 'center', 'str', 'ro', true, 'regId', '', '')); /* gf_LocaleTrans('default', 'titConfmSttusCode') */
    dhxGridPubusr002 = gf_MakeDhxGrid('dataListPubusr002', dhxGridPubusr002HeaderInfo, true, false, false);
    dhxGridPubusr002.enableAutoWidth(false);
    dhxGridPubusr002.setEditable(true);

    dhxGridPubusr002.setColumnMinWidth(80,8); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    //양력여부
    gf_ComboCode('bfslrcldAtPubusr002', 'bfSlrcldAt', 'bfSlrcldAt', 'sel', 'C013', '' , '', '', 'asc', '');	//변경전
    gf_ComboCode('slrcldAtPubusr002', 'slrcldAt', 'slrcldAt', 'add', 'C013', '' , '', '', 'asc', '');		//변경후
  	//결혼여부
    gf_ComboCode('divComboBfMrrgAt', 'bfMrrgAt', 'bfMrrgAt', 'sel', 'C288', '' , '', '', 'asc', '');	//변경전
    gf_ComboCode('divComboMrrgAt', 'mrrgAt', 'mrrgAt', 'sel', 'C288', '' , '', '', 'asc', '');			//변경후
    
	/*var nowDate = gf_Date2StrDisplayFormat(new Date());
    //결혼일자
    dhxCCalendarTab1MrrgDe = new dhtmlXCalendarObject({input:"mrrgDe", button:"startDateIcon"});
    dhxCCalendarTab1MrrgDe.loadUserLanguage("ko");
    dhxCCalendarTab1MrrgDe.hideTime();
    dhxCCalendarTab1MrrgDe.setDate(nowDate);*/
    return true; 
};



var cf_SetEventListenerPubusr002 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubusr002 = gf_GridDetachEvent(dhxGridPubusr002, eventIdPubusr002);
    eventId = dhxGridPubusr002.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubusr002();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubusr002.getColumnsNum();
            var rowNum = dhxGridPubusr002.getRowsNum();
            var selectedId = dhxGridPubusr002.getSelectedRowId();
            var ind        = dhxGridPubusr002.getSelectedCellIndex();
            var rowIndex   = dhxGridPubusr002.getRowIndex(selectedId);
            var type       = dhxGridPubusr002.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubusr002.selectRow(0);
                    //fn_FindPubusr002();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubusr002.selectRow(rowIndex + 1);
                    fn_FirstFind();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubusr002.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubusr002.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubusr002.getSelectedRowId();
            var ind        = dhxGridPubusr002.getSelectedCellIndex();
            var rowIndex   = dhxGridPubusr002.getRowIndex(selectedId);
            var type       = dhxGridPubusr002.getColType(ind);
            dhxGridPubusr002.selectCell(rowIndex+1, ind);
            fn_FirstFind();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubusr002.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubusr002.getSelectedRowId();
            var ind        = dhxGridPubusr002.getSelectedCellIndex();
            var rowIndex   = dhxGridPubusr002.getRowIndex(selectedId);
            var type       = dhxGridPubusr002.getColType(ind);
            dhxGridPubusr002.selectCell(rowIndex-1, ind);
            fn_FirstFind();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubusr002.editCell();
            }
        }
        else return true;
    });
    eventIdPubusr002.push(eventId);
    eventId = dhxGridPubusr002.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubusr002SortGridList(ind, type, direction); 
    });
    eventIdPubusr002.push(eventId);
    eventId = dhxGridPubusr002.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubusr002.push(eventId);
    eventId = dhxGridPubusr002.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FirstFind();
        
    });
    eventIdPubusr002.push(eventId);
    eventId = dhxGridPubusr002.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridPubusr002, 'chk')){
    		var checkbox = dhxGridPubusr002.cells(rId, cInd);
    		checkbox.isChecked() ? checkbox.setChecked(false) : checkbox.setChecked(true);
    		return false;
    	}    	
        return true;
    });
    eventIdPubusr002.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    /*$('#btnAddPubusr002').unbind('click').bind('click', function(event){
		alert('aaaaaa');
		var rId = dhxGridPubusr002.getSelectedRowId();
		var confmSttusCode = gf_DhxGetValue(dhxGridPubusr002, rId, 'confmSttusCode',  'grid');
		alert(confmSttusCode);
		if(confmSttusCode != '001'){
    		gf_errorMsgClear();
        	if(addRowCheck > 0){
        		gf_DivMsgAlert('개인정보 변경 신청은 한 행씩 추가할 수 있습니다.');
       		} else {
        		tabbarPubusr002.tabs("a1").setActive();
        		fn_AddRowPubusr002();
       		 }
		} else {
			gf_DivMsgAlert('승인신청 중에는 신규를 작성할 수 없습니다.');
			return false;
		}
    });*/
	$('#btnAddPubusr002').unbind('click').bind('click', function(event){
    	
		gf_errorMsgClear();
		if(addRowCheck > 0){
        	gf_DivMsgAlert('개인정보 변경 신청은 한 행씩 추가할 수 있습니다.');
        } else {
        	tabbarPubusr002.tabs("a1").setActive();
			var rId = dhxGridPubusr002.getSelectedRowId();
			if(rId == null){
				fn_AddRowPubusr002();
			} else {
				rId = '1'
				var confmSttusCode = gf_DhxGetValue(dhxGridPubusr002, rId, 'confmSttusCode',  'grid');
				var changeSe = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeSe',  'grid');
				if(rId == '1' && (confmSttusCode == '001' || confmSttusCode == '004' || confmSttusCode == '')){
					gf_DivMsgAlert('이미 신규등록되었습니다.');
					return false;	
				} //else if(rId != '1' && (confmSttusCode == '002' || confmSttusCode == '003')){
					//gf_DivMsgAlert('이미 신규등록되었습니다.');
					//return false;
				//}
				else {
					fn_AddRowPubusr002();
				}
			}
        	
        }
		//var rId = dhxGridPubusr002.getSelectedRowId();
		//var confmSttusCode = gf_DhxGetValue(dhxGridPubusr002, rId, 'confmSttusCode',  'grid');
		//alert(confmSttusCode);
		//if(confmSttusCode == '001'){
		//	gf_DivMsgAlert('승인신청 시 신규등록이 불가합니다.');
		//	return false;
		//}
    });
    $('#btnSavePubusr002').unbind('click').bind('click', function() {
		var rId = dhxGridPubusr002.getSelectedRowId();
		var confmSttusCode = gf_DhxGetValue(dhxGridPubusr002, rId, 'confmSttusCode',  'grid');
		//alert(confmSttusCode);
		if(confmSttusCode != '004'){
        	gf_errorMsgClear();
        	var iframeObj =  null;
        	setTimeout(function(){
				if(tabId == "a1"){
	        		fn_SavePubusr002();
					
				}
				/*else if(tabId == "a2"){
					iframeObj = tabbarPubusr002.tabs("a2").getAttachedObject();
				}
				else if(tabId == "a3"){
					iframeObj = tabbarPubusr002.tabs("a3").getAttachedObject();
				}
				else if(tabId == "a4"){
					iframeObj = tabbarPubusr002.tabs("a4").getAttachedObject();
				}
				else if(tabId == "a5"){
					iframeObj = tabbarPubusr002.tabs("a5").getAttachedObject();
				}
				else if(tabId == "a6"){
					iframeObj = tabbarPubusr002.tabs("a6").getAttachedObject();
				}
				else if(tabId == "a7"){
					iframeObj = tabbarPubusr002.tabs("a7").getAttachedObject();
				}
				else if(tabId == "a8"){
					iframeObj = tabbarPubusr002.tabs("a8").getAttachedObject();
				}*/
				if(iframeObj != null){
					iframeObj.contentWindow.fn_SavePubusr002();
				}
       		} , 1);
		} else {
			gf_DivMsgAlert('접수 중에는 저장할 수 없습니다.');
			return false;
		}
    });
    $('#btnRemovePubusr002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubusr002();
    });
    $('#btnExcelPubusr002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubusr002();
    });
    $('#btnSearchPubusr002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubusr002('');
    });
    $('#btnResetPubusr002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubusr002();
    });
    $('#searchFormPubusr002 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
        gf_EmpPopup("searchFormPubusr002","empnoSearchFormPubusr002","empNmSearchFormPubusr002", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    $('#btnChangePwPubusr002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        var param = "empno=" + g_empno;
    	fn_ChangePwPopup('form1','','', param);
    });
    $('#btnChangeSavePubusr002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        var rId = dhxGridPubusr002.getSelectedRowId();
        if(gf_IsNull(rId)){
        	gf_DivMsgAlert("행을 선택하여 주세요.");
        	return;
        }
        else{
        	var empno = gf_DhxGetValue(dhxGridPubusr002, rId, 'empno',  'grid');
        	var empNm = gf_DhxGetValue(dhxGridPubusr002, rId, 'empNm',  'grid');
        	var changeReqstSn = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeReqstSn',  'grid');
        	var changeSe = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeSe',  'grid');
        	var changeSeNm = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeSeNm',  'grid');
        	var reqstDe = gf_DhxGetValue(dhxGridPubusr002, rId, 'reqstDe',  'grid');
        	var confmSttusCode = gf_DhxGetValue(dhxGridPubusr002, rId, 'confmSttusCode',  'grid');
        	if(gf_IsNull(changeReqstSn) || gf_IsNull(empno) || gf_IsNull(changeSe)){
        		gf_DivMsgAlert("재조회 후 신청하여 주세요.");
        		return;
        	} else if(confmSttusCode == '004'){
        		gf_DivMsgAlert("접수되었습니다.");
        		return;
			} else if(!gf_IsNull(confmSttusCode)){
        		gf_DivMsgAlert("이미 승인여부가 존재합니다.");
        		return;
        	}
        	else{
        		gf_DivMsgConfirm2('해당 정보로 개인정보 변경을 신청합니다.', function(confirm){ 
        			if(confirm){
        				var jsonParameter = {
        						empno : empno,
        						empNm : empNm,
        						changeReqstSn : changeReqstSn,
        						changeSeNm : changeSeNm,
        						reqstDe : reqstDe
        				};
        				gf_Transaction('', 'pubusr002/applyPubusr002', jsonParameter, 'fn_CallbackApplyPubusr002', false, 'POST');
        			}else{ 
        				return; 
        			} 
        		}); 
        	}
        }
    });
    //주소 선택 Popup : 다음 DAUM
    $('#saveFormPubusr002Tab1 #btnZipSearch').unbind('click').bind('click', function(event){
        //execDaumPostcode("saveFormPubusr002Tab1","ownhomZipSaveFormPubusr001", "ownhomAdresSaveFormPubusr001", "ownhomDetailAdresSaveFormPubusr001");
        gf_ZipPopup("saveFormPubusr002Tab1","ownhomZipSaveFormPubusr002","ownhomAdresSaveFormPubusr002", "ownhomDetailAdresSaveFormPubusr002", "fn_CallBackZipPopup");  // form ID, 우편번호가 들어갈 tag의 ID, 주소가 들어갈 tag의 ID, 상세주소가 들어갈 tag의 ID, 콜백
		//fn_CompPopup("sampleForm","zip_Daum","addr_Daum", "addrInfo", "Y");  // form ID, 우편번호가 들어갈 tag의 ID, 주소가 들어갈 tag의 ID, 주소정보가 들어갈 변수의 ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllPubusr002').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridPubusr002, $('#checkAllPubusr002').prop('checked'), 'chk');
    });
    $('#searchFormPubusr002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "empnoSearchFormPubusr002" || this.id == "empNmSearchFormPubusr002"){
        		//fn_SearchEmpCode();
        	}
        	$('#btnSearchPubusr002').click(); event.preventDefault(); return true; 
        }
        else return true; 
    }); 
    $('#saveFormPubusr002Tab1').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#saveFormPubusr002Tab1 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormPubusr002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPubusr002",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubusr002Tab1 select[name="mrrgAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != '1'){
        	gf_FormSetValue('saveFormPubusr002Tab1', 'mrrgDe', '', 'text');
        	$('#saveFormPubusr002Tab1 input[name="mrrgDe"]').prop('disabled', true);
        } else {
        	$('#saveFormPubusr002Tab1 input[name="mrrgDe"]').prop('disabled', false);
        }
    });
    //사원팝업
	/*$('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormPubusr002","empno","empNm",'', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			//gf_FormSetValue('searchFormPubusr002', 'empNm', '', 'text');
		}
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			//gf_FormSetValue('searchFormPubusr002', 'empno', '', 'text');
		}
    });*/
    // 폼 이벤트 end ============================================================================================
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
};


//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){gf_errorMsgClear();
        if(addRowCheck > 0){
        	gf_DivMsgAlert('개인정보 변경 신청은 한 행씩 추가할 수 있습니다.');
        } else {
        	tabbarPubusr002.tabs("a1").setActive();
        	fn_AddRowPubusr002();
        }
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormPubusr002', 'empno', 'text'),
		    korNm : gf_FormGetValue('searchFormPubusr002', 'empNm', 'text'),
		    bplcCode : gf_FormGetValue('searchFormPubusr002', 'searchBplcCode', 'combo') //사업장
	};
	
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
	
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno = userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm;   
	
	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
		gf_FormSetValue('searchFormPubusr002', 'empno', userno, 'text');
		gf_FormSetValue('searchFormPubusr002', 'empName', userNm, 'text');
	} else {
	  	//Popup 호출
		gf_EmpPopup("searchFormPubusr002","empno","empNm", '' , "Y", null);
	}
}

var cf_InitFormPubusr002 = function() {
    //$('#searchFormPubusr002').resetForm();
	//권한에 따른
	gf_SetDataAuthorSe();
};

var cf_SetBindingPubusr002 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchPubusr002('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/


var fn_SetTabbar = function (){

    tabbarPubusr002 = new dhtmlXTabBar({
        parent:         "tabbarObj",
        close_button:   false,
        arrows_mode :   "auto", 
        tabs: [
        	{id:"a1",  text: "기본" },     //기본
    	    /*{id:"a2",  text: "신상정보"},                                   //신상정보
            {id:"a3",  text: "가족"},
		    {id:"a4",  text: "학력"},
		    {id:"a8",  text: "경력"},
		    {id:"a5",  text: "자격사항"},
		    {id:"a6",  text: "계좌번호"},
		    {id:"a7",  text: "어학"}*/
		    ]
    });
    

    tabbarPubusr002.tabs("a1").attachObject("a1");
    /*tabbarPubusr002.tabs("a2").attachObject("a2");
    tabbarPubusr002.tabs("a3").attachObject("a3");
    tabbarPubusr002.tabs("a4").attachObject("a4");
    tabbarPubusr002.tabs("a5").attachObject("a5");
    tabbarPubusr002.tabs("a6").attachObject("a6");
    tabbarPubusr002.tabs("a7").attachObject("a7");
    tabbarPubusr002.tabs("a8").attachObject("a8");*/
    
    

    tabbarPubusr002.attachEvent("onSelect", function(id, lastId){
    	if(id=="a2") {
    		tabId = 'a2';
        	gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSeNm', '신상정보');
        	gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSe', '002');
        	gf_FormSetValue("searchFormPubusr002", "tabNumber", "002", "");
    		tabbarPubusr002.tabs("a2").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab2/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a3") {
    		tabId = 'a3';
        	gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSeNm', '가족');
        	gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSe', '003');
        	gf_FormSetValue("searchFormPubusr002", "tabNumber", "003", "");
    		tabbarPubusr002.tabs("a3").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab3/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a4") {
    		tabId = 'a4';
    		gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSeNm', '학력');
        	gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSe', '004');
        	gf_FormSetValue("searchFormPubusr002", "tabNumber", "004", "");
    		tabbarPubusr002.tabs("a4").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab4/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a5") {
    		tabId = 'a5';
    		gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSeNm', '자격사항');
        	gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSe', '005');
        	gf_FormSetValue("searchFormPubusr002", "tabNumber", "005", "");
    		tabbarPubusr002.tabs("a5").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab5/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a6") {
    		tabId = 'a6';
    		gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSeNm', '계좌번호');
        	gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSe', '006');
        	gf_FormSetValue("searchFormPubusr002", "tabNumber", "006", "");
    		tabbarPubusr002.tabs("a6").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab6/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a7") {
    		tabId = 'a7';
    		gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSeNm', '어학');
        	gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSe', '007');
        	gf_FormSetValue("searchFormPubusr002", "tabNumber", "007", "");
    		tabbarPubusr002.tabs("a7").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab7/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    	}
    	if(id=="a8") {
    		tabId = 'a8';
    		gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSeNm', '경력');
        	gf_DhxGridCellMapping(dhxGridPubusr002, dhxDataProcessorPubusr002, 'changeSe', '008');
        	gf_FormSetValue("searchFormPubusr002", "tabNumber", "008", "");
    		tabbarPubusr002.tabs("a8").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab8/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    	}    	
    	return true;
    });
    
    tabbarPubusr002.tabs("a1").setActive();
    
};
//Tap 비활성화
var fn_TabOnOff = function (OnOff){
	var ids = tabbarPubusr002.getAllTabs();
	if(OnOff == "N"){
		for (var q=0; q<ids.length; q++) {
			tabbarPubusr002.tabs(ids[q]).disable();
		}
//		$("#tabbarObj").find("input, select, button, textarea").prop("disabled",true);
	}
	else {
		for (var q=0; q<ids.length; q++) {
			tabbarPubusr002.tabs(ids[q]).enable();
		}
//		$("#tabbarObj").find("input, select, button, textarea").prop("disabled",false);
	}
}
/**
 * 조회
 */
var fn_SearchPubusr002 = function(userId) {
	addRowCheck = 0;
    tabbarPubusr002.tabs("a1").setActive();
	var deptAuth = gf_GetDataAuthorSe();         //부서권한 : 엑티브 TAB의 권한 
	var exempno = gf_GetLocalStorageData('empno', false);  //사원번로
	
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno = userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm;   
    var jsonParameter = {
        changeReqstSn : gf_FormGetValue('searchFormPubusr002', 'changeReqstSn', 'text'),
    	  empno : gf_FormGetValue('searchFormPubusr002', 'empNumber', 'text'),
    	  empNm : gf_FormGetValue('searchFormPubusr002', 'empName', 'text'),
    	  deptAuth : deptAuth,
    	  exempno : exempno
    };
    gf_Transaction(userId, 'pubusr002/searchPubusr002', jsonParameter, 'fn_CallbackSearchPubusr002', false, 'GET');
};

var fn_CallbackSearchPubusr002 = function(strSvcID, targetID, data) {
    //dhxGridPubusr002.clearAll();
    dhxGridPubusr002.destructor();
    if(cf_SetComponentsPubusr002()){ 
        fn_DhxDataProcessorPubusr002(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPubusr002');
            dhxGridPubusr002.parse(data.data.records, 'js');
 
            if(save_Row_Num_Pubusr002 == 0 && save_All_Sta_Pubusr002 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPubusr002.selectRow(0); 
				//alert("#######");
            } else if(save_Row_Sta_Pubusr002 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPubusr002.selectRow(0);
            } else if(save_All_Sta_Pubusr002 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPubusr002.selectRow(save_Row_Num_Pubusr002); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPubusr002.selectRow(save_Row_Num_Pubusr002);   //개발자 수정 필요  
                //var findCell = dhxGridPubusr002.findCell(save_Row_Ids_Pubusr002, gf_GetDhxGridColumId(dhxGridPubusr002,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPubusr002.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPubusr002.selectRow(0);
                //} 
            } 
 
            fn_FirstFind();
        } else {
            gf_NoFoundDataOnGridMsg('dataListPubusr002');
            fn_InitInputFormPubusr002();
            fn_TabOnOff("N");
			//alert("######");
            fn_FormDisabled(true); 
        }
        dhxGridPubusr002.forEachRow(function(rowId) {
        	fn_GridFileNumber(dhxGridPubusr002, rowId);
        });
        $("#spanCntSearchFormPubusr002").text(data.data.records.length);
        cf_SetEventListenerPubusr002();
    } 
};
var fn_DhxDataProcessorPubusr002 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubusr002 = new dataProcessor(gv_ContextPath+'/pubusr002/savePubusr002'); //lock feed url
    dhxDataProcessorPubusr002.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubusr002.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubusr002.init(dhxGridPubusr002); //link dataprocessor to the grid
    dhxDataProcessorPubusr002.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubusr002.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubusr002.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    if(dataSource.data.state == "inserted"){
                      fn_SavePubusr002_FormSend(dataSource.data.changeReqstSn);
                    } else {
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                        fn_SearchPubusr002('');
                    }
                    $("#checkAllPubusr002").prop('checked', false); //상단 체크박스 해제
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
var fn_FirstFind = function(){
	var rId = dhxGridPubusr002.getSelectedRowId();
	tab_empno = gf_DhxGetValue(dhxGridPubusr002, rId, 'empno',  'grid');
	tab_changeReqstSn = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeReqstSn',  'grid');
	tab_confmSttusCode = gf_DhxGetValue(dhxGridPubusr002, rId, 'confmSttusCode',  'grid');
	tab_reqstDe = gf_DhxGetValue(dhxGridPubusr002, rId, 'reqstDe',  'grid');
	var changeSe = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeSe',  'grid');
	//var confmSttusCode = gf_DhxGetValue(dhxGridPubusr002, rId, 'confmSttusCode',  'grid');
	//alert(changeSe);
	//alert(tab_confmSttusCode);
	
    if(changeSe == "001"){
    	tabbarPubusr002.tabs("a1").setActive();
        fn_FindPubusr002();
    } else if(changeSe == ""){
		fn_FindPubusr002();
	} else if(changeSe == "002"){
    	tabbarPubusr002.tabs("a2").setActive();
		tabbarPubusr002.tabs("a2").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab2/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    } else if(changeSe == "003"){
    	tabbarPubusr002.tabs("a3").setActive();
    	tabbarPubusr002.tabs("a3").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab3/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    } else if(changeSe == "004"){
    	tabbarPubusr002.tabs("a4").setActive();
    	tabbarPubusr002.tabs("a4").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab4/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    } else if(changeSe == "005"){
    	tabbarPubusr002.tabs("a5").setActive();
    	tabbarPubusr002.tabs("a5").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab5/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    } else if(changeSe == "006"){	
    	tabbarPubusr002.tabs("a6").setActive();
    	tabbarPubusr002.tabs("a6").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab6/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    }else if(changeSe == "007"){  
    	tabbarPubusr002.tabs("a7").setActive();
    	tabbarPubusr002.tabs("a7").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab7/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    }else if(changeSe == "008"){  
    	tabbarPubusr002.tabs("a8").setActive();
    	tabbarPubusr002.tabs("a8").attachURL("/xerp_2021/pubusr002/searchPubusr002Tab8/view?empno="+tab_empno + "&changeReqstSn=" +tab_changeReqstSn+"&confmSttusCode="+tab_confmSttusCode+"&reqstDe="+tab_reqstDe);
    }
    
    if(gf_DhxGetValue(dhxGridPubusr002, rId, 'changeReqstSn',  'grid') == "자동채번"||gf_DhxGetValue(dhxGridPubusr002, rId, 'changeReqstSn',  'grid') == ""){
    	fn_TabOnOff('Y');
    } else {
    	fn_TabOnOff('N');
    }
}
var fn_FindPubusr002 = function() {
    var rId = dhxGridPubusr002.getSelectedRowId();
    var status = dhxDataProcessorPubusr002.getState(rId);
    var changeReqstSn = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeReqstSn',  'grid');
    
    if(gf_IsNull(changeReqstSn) || changeReqstSn == "자동채번"){
    	return fn_AddPubusr002();
    }
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno = userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm;   
    var jsonParameter = {
    		empno : userno,
    		changeReqstSn : changeReqstSn
	    };
	var dataSource = gf_NoAsyncTransaction('pubusr002/searchPubusr002Tab1', jsonParameter, 'GET');
    var data = dataSource.data;

    //fn_FormDisabled(false);
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfPhotoAtchmnflNo', data.bfPhotoAtchmnflNo, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfChcrtNm', data.bfChcrtNm, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfEngNm', data.bfEngNm, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfBrthdy', data.bfBrthdy, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfSlrcldAt', data.bfSlrcldAt, 'combo');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomZip', data.bfOwnhomZip, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomAdres', data.bfOwnhomAdres, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomDetailAdres', data.bfOwnhomDetailAdres, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomTelno', data.bfOwnhomTelno, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfMbtlnum', data.bfMbtlnum, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfLxtnTelno', data.bfLxtnTelno, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfEmail', data.bfEmail, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfIndvdlEmail', data.bfIndvdlEmail, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfMrrgAt', data.bfMrrgAt, 'combo');
    gf_FormSetValue('saveFormPubusr002Tab1', 'bfMrrgDe', data.bfMrrgDe, 'text');

    gf_FormSetValue('saveFormPubusr002Tab1', 'photoAtchmnflNo', data.photoAtchmnflNo, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'chcrtNm', data.chcrtNm, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'engNm', data.engNm, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'brthdy', data.brthdy, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'slrcldAt', data.slrcldAt, 'combo');
    gf_FormSetValue('saveFormPubusr002Tab1', 'ownhomZip', data.ownhomZip, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'ownhomAdres', data.ownhomAdres, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'ownhomDetailAdres', data.ownhomDetailAdres, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'ownhomTelno', data.ownhomTelno, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'mbtlnum', data.mbtlnum, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'lxtnTelno', data.lxtnTelno, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'email', data.email, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'indvdlEmail', data.indvdlEmail, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'mrrgAt', data.mrrgAt, 'combo');
    gf_FormSetValue('saveFormPubusr002Tab1', 'mrrgDe', data.mrrgDe, 'text');
    
    var empNo = g_empno;
    var empNm = g_empNm;
    if(data.bfPhotoAtchmnflNo != "" && data.bfPhotoAtchmnflNo != null){
    	$('#bfEmpPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+data.bfPhotoAtchmnflNo+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + empNm + ' (' + empNo + ')" title="' + empNm + ' (' + empNo + ')">');
    }
    else {
    	$('#bfEmpPhoto').html("");
    }
    
    if(data.photoAtchmnflNo != "" && data.photoAtchmnflNo != null){
    	$('#empPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+data.photoAtchmnflNo+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + empNm + ' (' + empNo + ')" title="' + empNm + ' (' + empNo + ')">');
    }
    else {
    	$('#empPhoto').html("");
    }
	
    $('#saveFormPubusr002Tab1 input[name="bfChcrtNm"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfEngNm"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfBrthdy"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 select[name="bfSlrcldAt"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfOwnhomZip"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfOwnhomAdres"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfOwnhomDetailAdres"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfOwnhomTelno"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfMbtlnum"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfLxtnTelno"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfEmail"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfIndvdlEmail"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 select[name="bfMrrgAt"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfMrrgDe"]').prop('disabled', true);
	
    if(status != "inserted"){
    	fn_TabOnOff("N");
    }
    
    if(!gf_IsNull(gf_DhxGetValue(dhxGridPubusr002, rId, 'confmSttusCode',  'grid'))){
    	fn_FormDisabled(true); 
		//tabbarPubusr002.tabs("a1").setActive();
    }

	/////새로추가
	var rId = dhxGridPubusr002.getSelectedRowId();
	var changeSe = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeSe',  'grid');
	var confmSttusCode = gf_DhxGetValue(dhxGridPubusr002, rId, 'confmSttusCode',  'grid');
	//alert(confmSttusCode);
	//alert(changeSe);
	if(rId == '1' && changeSe == '001' && confmSttusCode =='') {
		$('#saveFormPubusr002Tab1 button[name="btnZipSearch"]').prop('disabled', false);
		$('#saveFormPubusr002Tab1 input[name="chcrtNm"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="engNm"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="brthdy"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 select[name="slrcldAt"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="ownhomZip"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="ownhomAdres"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="ownhomDetailAdres"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="ownhomTelno"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="mbtlnum"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="lxtnTelno"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="email"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="indvdlEmail"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 select[name="mrrgAt"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="mrrgDe"]').prop('disabled', false);
	} else if(rId == '1' && changeSe == '001' && confmSttusCode =='001'){
		$('#saveFormPubusr002Tab1 button[name="btnZipSearch"]').prop('disabled', false);
		$('#saveFormPubusr002Tab1 input[name="chcrtNm"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="engNm"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="brthdy"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 select[name="slrcldAt"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="ownhomZip"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="ownhomAdres"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="ownhomDetailAdres"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="ownhomTelno"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="mbtlnum"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="lxtnTelno"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="email"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="indvdlEmail"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 select[name="mrrgAt"]').prop('disabled', false);
    	$('#saveFormPubusr002Tab1 input[name="mrrgDe"]').prop('disabled', false);
	}
	
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormPubusr002 = function() {
    $('#saveFormPubusr002Tab1 input[name="empno"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="changeReqstSn"]').prop('disabled', false);
    //$('#saveFormPubusr002Tab1').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormPubusr002Tab1 *').prop('disabled', status); 
};
/**
 * 추가(신규) 
 */
var fn_AddRowPubusr002 = function() {

	fn_TabOnOff("Y")
	//tab_empno = g_empno;
	tab_changeReqstSn = '';
	tab_confmSttusCode = '';
	tab_reqstDe = nowDate;
	tabId = "a1";
	addRowCheck++;
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno = userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm;   
	
    dhxGridPubusr002.clearSelection();
    fn_InitInputFormPubusr002();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(userno); //empno
    initValueArr.push(userNm); //empNm
    initValueArr.push(nowDate); //reqstDe
    initValueArr.push('기본정보');
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push('자동채번');
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    dhxGridPubusr002.addRow(dhxGridPubusr002.uid(), initValueArr, 0);
    dhxGridPubusr002.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPubusr002');
   
    fn_InitInputFormPubusr002();
    fn_FirstFind();
    fn_AddPubusr002();
}
var fn_AddPubusr002 = function() {
	var empNo = g_empno;
    var empNm = g_empNm;
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno = userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm; 
	var jsonParameter = {
	        empno : userno
	    };
	var dataSource = gf_NoAsyncTransaction('pubusr002/nowUserInfo', jsonParameter, 'GET');
    var data = dataSource.data;

	if(data.bfPhotoAtchmnflNo == '' && data.bfChcrtNm == '' && data.bfEngNm == '' && data.bfBrthdy == '' && data.bfSlrcldAt == ''
	&& data.bfOwnhomZip == ''&& data.bfOwnhomAdres=='' && data.bfOwnhomDetailAdres == ''&& data.bfOwnhomTelno == ''&& data.bfMbtlnum == ''
	&& data.bfLxtnTelno == ''&& data.bfEmail == '' && data.bfIndvdlEmail == '' && data.bfMrrgAt == '' && data.bfMrrgDe == ''){ 
		gf_FormSetValue('saveFormPubusr002Tab1', 'bfPhotoAtchmnflNo', data.photoAtchmnflNo, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfChcrtNm', data.chcrtNm, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfEngNm', data.engNm, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfBrthdy', data.brthdy, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfSlrcldAt', data.slrcldAt, 'combo');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomZip', data.zip, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomAdres', data.ownhomAdres, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomDetailAdres', data.ownhomDetailAdres, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomTelno', data.ownhomTelno, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfMbtlnum', data.mbtlnum, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfLxtnTelno', data.lxtnTelno, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfEmail', data.email, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfIndvdlEmail', data.indvdlEmail, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfMrrgAt', data.mrrgAt, 'combo');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfMrrgDe', data.mrrgDe, 'text');
    	var empNo = g_empno;
    	var empNm = g_empNm;
    	if(data.photoAtchmnflNo != "" && data.photoAtchmnflNo != null){
    		$('#bfEmpPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+data.photoAtchmnflNo+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + empNm + ' (' + empNo + ')" title="' + empNm + ' (' + empNo + ')">');
    	}
    	else {
    		$('#bfEmpPhoto').html("");
   		}

	}else {   	
		gf_FormSetValue('saveFormPubusr002Tab1', 'bfPhotoAtchmnflNo', data.bfPhotoAtchmnflNo, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfChcrtNm', data.bfChcrtNm, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfEngNm', data.bfEngNm, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfBrthdy', data.bfBrthdy, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfSlrcldAt', data.bfSlrcldAt, 'combo');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomZip', data.bfOwnhomZip, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomAdres', data.bfOwnhomAdres, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomDetailAdres', data.bfOwnhomDetailAdres, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfOwnhomTelno', data.bfOwnhomTelno, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfMbtlnum', data.bfMbtlnum, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfLxtnTelno', data.bfLxtnTelno, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfEmail', data.bfEmail, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfIndvdlEmail', data.bfIndvdlEmail, 'text');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfMrrgAt', data.bfMrrgAt, 'combo');
    	gf_FormSetValue('saveFormPubusr002Tab1', 'bfMrrgDe', data.bfMrrgDe, 'text');
		var empNo = g_empno;
    	var empNm = g_empNm;
    	if(data.bfPhotoAtchmnflNo != "" && data.bfPhotoAtchmnflNo != null){
    		$('#bfEmpPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+data.bfPhotoAtchmnflNo+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + empNm + ' (' + empNo + ')" title="' + empNm + ' (' + empNo + ')">');
    	}
    	else {
    		$('#bfEmpPhoto').html("");
   		}
    
    	
	}

	gf_FormSetValue('saveFormPubusr002Tab1', 'photoAtchmnflNo', data.photoAtchmnflNo, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'chcrtNm', data.chcrtNm, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'engNm', data.engNm, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'brthdy', data.brthdy, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'slrcldAt', data.slrcldAt, 'combo');
    gf_FormSetValue('saveFormPubusr002Tab1', 'ownhomZip', data.zip, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'ownhomAdres', data.ownhomAdres, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'ownhomDetailAdres', data.ownhomDetailAdres, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'ownhomTelno', data.ownhomTelno, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'mbtlnum', data.mbtlnum, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'lxtnTelno', data.lxtnTelno, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'email', data.email, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'indvdlEmail', data.indvdlEmail, 'text');
    gf_FormSetValue('saveFormPubusr002Tab1', 'mrrgAt', data.mrrgAt, 'combo');
    gf_FormSetValue('saveFormPubusr002Tab1', 'mrrgDe', data.mrrgDe, 'text');

	if(data.photoAtchmnflNo != "" && data.photoAtchmnflNo != null){
		$('#empPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+data.photoAtchmnflNo+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + empNm + ' (' + empNo + ')" title="' + empNm + ' (' + empNo + ')">');
	}
	else {
		$('#empPhoto').html("");
	}
     
	fn_FormDisabled(false);

   	$('#saveFormPubusr002Tab1 input[name="bfChcrtNm"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfEngNm"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfBrthdy"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 select[name="bfSlrcldAt"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfOwnhomZip"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfOwnhomAdres"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfOwnhomDetailAdres"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfOwnhomTelno"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfMbtlnum"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfLxtnTelno"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfEmail"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfIndvdlEmail"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 select[name="bfMrrgAt"]').prop('disabled', true);
    $('#saveFormPubusr002Tab1 input[name="bfMrrgDe"]').prop('disabled', true);
	
	
	$('#saveFormPubusr002Tab1 input[name="chcrtNm"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="engNm"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="brthdy"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 select[name="slrcldAt"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="ownhomZip"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="ownhomAdres"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="ownhomDetailAdres"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="ownhomTelno"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="mbtlnum"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="lxtnTelno"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="email"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 input[name="indvdlEmail"]').prop('disabled', false);
    $('#saveFormPubusr002Tab1 select[name="mrrgAt"]').prop('disabled', false);
   	$('#saveFormPubusr002Tab1 input[name="mrrgDe"]').prop('disabled', false);
	
	
	var nowDate = gf_Date2StrDisplayFormat(new Date());
    //결혼일자
    dhxCCalendarTab1MrrgDe = new dhtmlXCalendarObject({input:"mrrgDe", button:"startDateIcon"});
    dhxCCalendarTab1MrrgDe.loadUserLanguage("ko");
    dhxCCalendarTab1MrrgDe.hideTime();
    dhxCCalendarTab1MrrgDe.setDate(nowDate);
	
    /////////////////////////////////
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno = userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm; 
    var empNo = g_empno;
    var empNm = g_empNm;
    	//if(data.bfPhotoAtchmnflNo != "" && data.bfPhotoAtchmnflNo != null){
    	//	$('#bfEmpPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+data.bfPhotoAtchmnflNo+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + empNm + ' (' + empNo + ')" title="' + empNm + ' (' + empNo + ')">');
    	//}
    	//else {
    	//	$('#bfEmpPhoto').html("");
   		//}
    
    	if(data.photoAtchmnflNo != "" && data.photoAtchmnflNo != null){
    		$('#empPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+data.photoAtchmnflNo+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + empNm + ' (' + empNo + ')" title="' + empNm + ' (' + empNo + ')">');
    	}
    	else {
    		$('#empPhoto').html("");
    	}
    
    if(data.mrrgAt != '1'){
    	$('#saveFormPubusr002Tab1 input[name="mrrgDe"]').prop('disabled', false);
    } else {
    	$('#saveFormPubusr002Tab1 input[name="mrrgDe"]').prop('disabled', false);
    }
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pubusr002SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubusr002, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubusr002', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubusr002', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubusr002, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubusr002.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubusr002', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubusr002', 'sortColumId', gf_GetDhxGridColum(dhxGridPubusr002, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubusr002.setSortImgState(false); 
            gf_FormSetValue('searchFormPubusr002', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubusr002', 'sortColumId', '', 'text'); 
            dhxGridPubusr002.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPubusr002.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubusr002', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubusr002', 'sortColumId', gf_GetDhxGridColum(dhxGridPubusr002, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePubusr002 = function() {
    var edCnt = 0;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfPhotoAtchmnflNo', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'photoAtchmnflNo', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfChcrtNm', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'chcrtNm', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfEngNm', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'engNm', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfBrthdy', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'brthdy', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfSlrcldAt', 'combo') != gf_FormGetValue('saveFormPubusr002Tab1', 'slrcldAt', 'combo')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfOwnhomZip', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'ownhomZip', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfOwnhomAdres', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'ownhomAdres', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfOwnhomDetailAdres', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'ownhomDetailAdres', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfOwnhomTelno', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'ownhomTelno', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfMbtlnum', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'mbtlnum', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfLxtnTelno', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'lxtnTelno', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfEmail', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'email', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfIndvdlEmail', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'indvdlEmail', 'text')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfMrrgAt', 'combo') != gf_FormGetValue('saveFormPubusr002Tab1', 'mrrgAt', 'combo')) edCnt++;
    if(gf_FormGetValue('saveFormPubusr002Tab1', 'bfMrrgDe', 'text') != gf_FormGetValue('saveFormPubusr002Tab1', 'mrrgDe', 'text')) edCnt++;
    
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        var confirmMsg  = "";
        save_All_Sta_Pubusr002 = 0; 
        confirmMsg = "저장하시겠습니까?";
        //if(confirmModalPubusr002(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPubusr002(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}

var confirmModalPubusr002 = function (msg) { 
    var result = false; 
	var rowIds = dhxGridPubusr002.getSelectedRowId();
    var state = dhxDataProcessorPubusr002.getState(rowIds);
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            if(state != 'inserted'){
            	fn_SavePubusr002_FormSend(gf_DhxGetValue(dhxGridPubusr002, rowIds, 'changeReqstSn',  'grid'));
				fn_SearchPubusr002('');
            } else {
            	fn_SavePubusr002_FormSend();
				fn_SearchPubusr002('');
            }
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubusr002_Send = function() {
	fn_SavePubusr002_FormSend();
	fn_SearchPubusr002('');
}

var fn_SavePubusr002_FormSend = function() {
	var rowIds = dhxGridPubusr002.getSelectedRowId();
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno = userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm; 
	//var mrrgAt11 = gf_FormGetValue('saveFormPubusr002Tab1', 'mrrgAt', 'combo');
	//alert(mrrgAt11);
	var jsonParameter = {
			empno : userno,
			changeSe : '001',
			changeReqstSn : gf_DhxGetValue(dhxGridPubusr002, rowIds, 'changeReqstSn', 'grid'),
			reqstDe : gf_DhxGetValue(dhxGridPubusr002, rowIds, 'reqstDe', 'grid'),
			
			bfPhotoAtchmnflNo : gf_FormGetValue('saveFormPubusr002Tab1', 'bfPhotoAtchmnflNo', 'text'),
			bfChcrtNm : gf_FormGetValue('saveFormPubusr002Tab1', 'bfChcrtNm', 'text'),
			bfEngNm : gf_FormGetValue('saveFormPubusr002Tab1', 'bfEngNm', 'text'),
			bfBrthdy : gf_FormGetValue('saveFormPubusr002Tab1', 'bfBrthdy', 'text'),
			bfSlrcldAt : gf_FormGetValue('saveFormPubusr002Tab1', 'bfSlrcldAt', 'combo'),
			bfOwnhomZip : gf_FormGetValue('saveFormPubusr002Tab1', 'bfOwnhomZip', 'text'),
			bfOwnhomAdres : gf_FormGetValue('saveFormPubusr002Tab1', 'bfOwnhomAdres', 'text'),
			bfOwnhomDetailAdres : gf_FormGetValue('saveFormPubusr002Tab1', 'bfOwnhomDetailAdres', 'text'),
			bfOwnhomTelno : gf_FormGetValue('saveFormPubusr002Tab1', 'bfOwnhomTelno', 'text'),
			bfMbtlnum : gf_FormGetValue('saveFormPubusr002Tab1', 'bfMbtlnum', 'text'),
			bfLxtnTelno : gf_FormGetValue('saveFormPubusr002Tab1', 'bfLxtnTelno', 'text'),
			bfEmail : gf_FormGetValue('saveFormPubusr002Tab1', 'bfEmail', 'text'),
			bfIndvdlEmail : gf_FormGetValue('saveFormPubusr002Tab1', 'bfIndvdlEmail', 'text'),
			bfMrrgAt : gf_FormGetValue('saveFormPubusr002Tab1', 'bfMrrgAt', 'combo'),
			bfMrrgDe : gf_FormGetValue('saveFormPubusr002Tab1', 'bfMrrgDe', 'text'),
			
			photoAtchmnflNo : gf_FormGetValue('saveFormPubusr002Tab1', 'photoAtchmnflNo', 'text'),
			chcrtNm : gf_FormGetValue('saveFormPubusr002Tab1', 'chcrtNm', 'text'),
			engNm : gf_FormGetValue('saveFormPubusr002Tab1', 'engNm', 'text'),
			brthdy : gf_FormGetValue('saveFormPubusr002Tab1', 'brthdy', 'text'),
			slrcldAt : gf_FormGetValue('saveFormPubusr002Tab1', 'slrcldAt', 'combo'),
			ownhomZip : gf_FormGetValue('saveFormPubusr002Tab1', 'ownhomZip', 'text'),
			ownhomAdres : gf_FormGetValue('saveFormPubusr002Tab1', 'ownhomAdres', 'text'),
			ownhomDetailAdres : gf_FormGetValue('saveFormPubusr002Tab1', 'ownhomDetailAdres', 'text'),
			ownhomTelno : gf_FormGetValue('saveFormPubusr002Tab1', 'ownhomTelno', 'text'),
			mbtlnum : gf_FormGetValue('saveFormPubusr002Tab1', 'mbtlnum', 'text'),
			lxtnTelno : gf_FormGetValue('saveFormPubusr002Tab1', 'lxtnTelno', 'text'),
			email : gf_FormGetValue('saveFormPubusr002Tab1', 'email', 'text'),
			indvdlEmail : gf_FormGetValue('saveFormPubusr002Tab1', 'indvdlEmail', 'text'),
			mrrgAt : gf_FormGetValue('saveFormPubusr002Tab1', 'mrrgAt', 'combo'),
			mrrgDe : gf_FormGetValue('saveFormPubusr002Tab1', 'mrrgDe', 'text')
	    };
	gf_Transaction(jsonParameter, 'pubusr002/savePubusr002Tab1', jsonParameter, 'fn_CallbackSavePubusr002Tab1', false, 'POST');
};

var fn_CallbackSavePubusr002Tab1 = function(strSvcID, targetID, data) {
	//fn_SearchPubusr002('');
	//alert("001");
	if(data.code === '000') {
		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
		//alert("002");
        //fn_SearchPubusr002(''); //프로그레스바 지움
        $("#checkAllPubusr002").prop('checked', false); //상단 체크박스 해제
	} else {
	    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	}
	fn_SearchPubusr002('');
};
var fn_CallbackApplyPubusr002 = function(strSvcID, targetID, data) {
//	console.log(data);
	if(data.code != "000"){
		gf_DivMsgAlert("데이터 반환 에러");
	}
	else if(!gf_IsNull(data.data) || data.code == "000"){
		var obj = data.data;
		if(obj.code == "000"){
			gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
	        //fn_SearchPubusr002('');
	        $("#checkAllPubusr002").prop('checked', false); //상단 체크박스 해제			
		}
		else{
			gf_DivMsgAlert(obj.message);	
			//fn_SearchPubusr002('');		
		}
	}
	fn_SearchPubusr002('');
};
/**
 * 삭제
 */
var fn_RemovePubusr002 = function() {
	var rowId = dhxGridPubusr002.getSelectedRowId();
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubusr002, 'chk');
	var confmSttusCodeNm = dhxGridPubusr002.cells(rowId, dhxGridPubusr002.getColIndexById("confmSttusCodeNm")).getValue();
    if(gf_IsNull(confmSttusCodeNm)){
		dhxGridPubusr002.deleteRow(rowId);
		fn_SearchPubusr002('');
	}else if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
    	var confirmMsg = "선택된 로우들을 삭제하시겠습니까?";
    	gf_DivMsgConfirm(confirmMsg, 'fn_RemoveStmPrgRequst()', '');
    }
}
var fn_RemoveStmPrgRequst = function(){
    var state;
    dhxGridPubusr002.forEachRow(function(rowId) {
        state = dhxDataProcessorPubusr002.getState(rowId);
        if(dhxGridPubusr002.cells(rowId, gf_GetDhxGridColumId(dhxGridPubusr002, 'chk')).isChecked()){
			var confmSttusCode = gf_DhxGetValue(dhxGridPubusr002, rowId, 'confmSttusCode', 'grid')
			//alert(confmSttusCode);
        	if(!gf_IsNull(gf_DhxGetValue(dhxGridPubusr002, rowId, 'confmSttusCode', 'grid')) && confmSttusCode != '001'){
        		gf_DivMsgAlert('처리된 신청건은 삭제할 수 없습니다.');
        		return false;
        	}
            if(state == 'inserted') {
            	addRowCheck = 0;
                var rowNum = dhxGridPubusr002.getRowIndex(rowId);
                dhxGridPubusr002.deleteRow(rowId);
                dhxGridPubusr002.selectRow(rowNum);
                fn_FirstFind();
            }
            else {
            	dhxDataProcessorPubusr002.setUpdated(rowId, true, 'deleted');
            }
        }
    });
	dhxDataProcessorPubusr002.sendData();
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPubusr002 = function () {
    var titPubusr002 = '개인정보변경신청'; /* gf_LocaleTrans('default', 'titPubusr002') */

    var jsonParameter = {
      	  empno : gf_FormGetValue('searchFormPubusr002', 'empNumber', 'text'),
      	  empNm : gf_FormGetValue('searchFormPubusr002', 'empName', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '성명' /* gf_LocaleTrans('default', 'titEmpno') */,
        '신청일' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '변경구분' /* gf_LocaleTrans('default', 'titChangeSe') */,
        '승인여부' /* gf_LocaleTrans('default', 'titConfmSttusCode') */,
        '승인일자' /* gf_LocaleTrans('default', 'titConfmDe') */,
        '반려 사유' /* gf_LocaleTrans('default', 'titReturnResn') */
    ]];
    var dataId = [[ 'empno', 'empNm', 'reqstDe', 'changeSeNm', 'confmSttusCodeNm', 'confmDe', 'returnResn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titPubusr002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubusr002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubusr002/excelPubusr002', jsonParameter);
};

var fn_CallbackPopEmp = function(data){
	console.log(data.empno + " : " + data.korNm);
	fn_SearchPubusr002('');
}

function fn_GridFileNumber(dhxGridObjet, rowId){
	var grdtnFileno = gf_DhxGetValue(dhxGridObjet, rowId, 'atchmnflNo', 'grid');
	var atchSize = gf_IsNull(grdtnFileno)?'0':((grdtnFileno).split('|')).length;
	

	var atchSizeStr= "<span style=\"color:red; font-weight:bold\">"+atchSize+"</span>";
	var rtnFileKey = '<span class=\"glyphicon glyphicon glyphicon-floppy-disk\"></span>&nbsp;('+atchSizeStr+')</a>';
	gf_DhxSetValue(dhxGridObjet, rowId, 'atchmnflNoEdit', rtnFileKey, 'grid');
}

function fn_SearchEmpCode(){

    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno = userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm;   

    var jsonParameter = {
            empno     : userno,
            korNm     : userNm,
            bplcCode  : gBplcCode
    };
    gf_Transaction('', 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
    var totCnt = data.data.records.length;
    //alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
        //단건
        var data = data.data.records[0];
        gf_FormSetValue('searchFormPubusr002', 'empno', data.empno, 'text');
        gf_FormSetValue('searchFormPubusr002', 'empNm', data.korNm, 'text');
    	fn_SearchPubusr002('');
    }
    else {
    	gf_EmpPopup("searchFormPubusr002","empnoSearchFormPubusr002","empNmSearchFormPubusr002", gBplcCode, "Y", "fn_CallbackPopEmp"); 
    }
}
/**
 * 우편번호 검색
 */
var fn_CallBackZipPopup = function(data){
	if(!gf_IsNull(data)){
		console.log(data.zipno + " : " + data.roadAddr1 + " " + (data.roadAddrDetail + " " + data.roadAddr2).trim());
		gf_FormSetValue('searchFormPubusr002', 'ownhomZip', data.zipno, 'text');  
		gf_FormSetValue('searchFormPubusr002', 'ownhomAdres', data.roadAddr1, 'text');
		gf_FormSetValue('searchFormPubusr002', 'ownhomDetailAdres',(data.roadAddrDetail + " " + data.roadAddr2).trim(), 'text');
	}
}

var fn_Calendar = function(){
	var brithDayCalendar = new dhtmlXCalendarObject({input:"brthdySaveFormPubusr001", button:"startDateIcon"});
	brithDayCalendar.loadUserLanguage("ko");
	brithDayCalendar.setDateFormat("%Y-%m-%d");
	
	var weddingCalendar = new dhtmlXCalendarObject({input:"mrrgDeSaveFormPubusr001", button:"startDateIcon"});
	weddingCalendar.loadUserLanguage("ko");
	brithDayCalendar.setDateFormat("%Y-%m-%d");
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
//입력 내용을 날짜 포멧으로
function dateChk(objDate){
	var date = objDate.val();
	date = date.replace(RegNotNum, '');

	if (date == "" || date == null || date.length < 5) {
	  objDate.val(date);
	  return;
	}

	var DataFormat;
	var RegPhonNum;

	// 날짜 포맷(yyyy-mm-dd) 만들기 
	if (date.length <= 6) {
	  DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]+)/;
	} else if (date.length <= 8) {
	  DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
	}

	while (RegPhonNum.test(date)) {
	  date = date.replace(RegPhonNum, DataFormat);
	}

	objDate.val(date);

	// 모두 입력됐을 경우 날짜 유효성 확인
	if (date.length == 10) {
		var isVaild = true;
	
		if (isNaN(Date.parse(date))) {
			// 유효 날짜 확인 여부
			isVaild = false;
		} else {
			// 년, 월, 일 0 이상 여부 확인
			var date_sp = date.split("-");
			date_sp.forEach(function(sp) {
			  if (parseInt(sp) == 0) {
			    isVaild = false;
			  }
			});
		
			// 마지막 일 확인
			var last = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0);
			if (last.getDate() < parseInt(date_sp[2])) {
			 	isVaild = false;
			}
		}
		
		if (!isVaild) {
		  alert("잘못된 날짜입니다. \n다시 입력하세요.");
		  objDate.val("");
		  objDate.focus();
		  return;
		}
	}
}

//사진 업로드
var fn_FileUploadBtnEvent = function(){
	//등록버튼
	$('#btnPhotoRec').unbind("click").bind("click",function(event){
		uploadedFileKeys2  = [];
		uploadedFileInfo2  = [];
		//File 업로드
		gf_FileUploadPopup(
			'fn_FileUploadBtnEvent', 
			'btnUploadedFiledelete2', 
			'fileList2', 
			'atchFileIds2', 
			 uploadedFileKeys2, 
			 uploadedFileInfo2, 
			 1,
		    'image',
	        'fn_FileUpLoadAfter');
    });
	
	//다운로드 버튼
	$('#btnPhotoDown').unbind("click").bind("click",function(event){
		var strimg = gf_FormGetValue('saveFormPubusr002Tab1', 'photoAtchmnflNo', 'text');
		var strSrc = gv_ServerApiUrl + "/file/down?atchFileId=" + strimg;
		$("a#photoDownload").attr({
			"href": strSrc
		}).get(0).click();
	});
	
	//다운로드 버튼
	$('#btnBfPhotoDown').unbind("click").bind("click",function(event){
		var strimg = gf_FormGetValue('saveFormPubusr002Tab1', 'bfPhotoAtchmnflNo', 'text');
		var strSrc = gv_ServerApiUrl + "/file/down?atchFileId=" + strimg;
		$("a#photoDownload").attr({
			"href": strSrc
		}).get(0).click();
	});
	
	//삭제버튼
	$('#btnPhotoDel').unbind("click").bind("click",function(event){
		$('#empPhoto').html("");
		gf_FormSetValue('saveFormPubusr002Tab1', 'photoAtchmnflNo', "", 'text');
    });
};

var fn_FileUpLoadAfter = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){

	if(!gf_IsNull(data)){
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
		});
		
		var empNo = g_empno
		var empNm = g_empNm;
		
		gf_FormSetValue('saveFormPubusr002Tab1', 'photoAtchmnflNo', keyArr[0], 'text');
		
		$('#empPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+keyArr[0]+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + empNm + ' (' + empNo + ')" title="' + empNm + ' (' + empNo + ')">');
	}
};

/* 패스워드 변경 팝업 */
var fn_ChangePwPopup = function(formId, codeId, codeNmId, param) {
	var userId = ""; 
	var title  = "패스워드 변경";
	//저장팝업
	var dhxWindowObj;
	var popupDtlRequst;
	if($('body').find("div[id='popupDtlRequst']").size() <= 0) {
		$('body').append("<div id='popupDtlRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#popupDtlRequst').bPopup({
		onOpen:function(){
			
			popupDtlRequst = new dhtmlXWindows();
			var id 		= 'popupDtlRequest';
			var ajaxUrl = gv_ContextPath+'/pubusr002/popup/changePwPopup/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 400;
			var height	= 300;
			
			dhxWindowObj = popupDtlRequst.createWindow(id, left, top, width, height);
			popupDtlRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#popupDtlRequst .b-close').click();
			});
		},
		onClose:function(){
			popupDtlRequst.unload();
			$('body').find("div[id='popupDtlRequst']").remove();			
		}
	},function(){});
	return dhxWindowObj;
}

//탭에서 자격증 조회
var fn_tabGridSearchCrqfsButton = function(atchmnfl, rowId, tabNo){
	if(gf_IsNull(tabNo)){
		gf_DivMsgAlert("Tab번호가 불확실합니다.");
		return false;
	}
	g_TabNo = tabNo;
	g_TabRowId = rowId;
	
	var stmBizplcCode = "1000";
	
	gf_CrqfsPopup ("", "", "", stmBizplcCode, "Y", "fn_CallbacktabGridSearchCrqfsButton");
}
var fn_CallbacktabGridSearchCrqfsButton = function(){
	var iframeObj =  null;
	
	if(g_TabNo == 9){
		iframeObj = tabbarPubusr002.tabs("a5").getAttachedObject();
	}
	
	iframeObj.contentWindow.fn_CallbackGridSearchCrqfsButtonReturn(g_TabRowId, $crqfsInfo);
}

//공통코드
var fn_tabGridSearchComCodeButton = function(atchmnfl, rowId, tabNo, codeKind){
	if(gf_IsNull(tabNo)){
		gf_DivMsgAlert("Tab번호가 불확실합니다.");
		return false;
	}
	g_TabNo = tabNo;
	g_TabRowId = rowId;
	
	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
	var stmBizplcCode = "1000";

	gf_ComCodePopup ("", codeKind, "", "", stmBizplcCode, "Y", "fn_CallbacktabGridSearchComCodeButton");
}
var fn_CallbacktabGridSearchComCodeButton = function(){
	var iframeObj =  null;
	
	if(g_TabNo == 11){
		iframeObj = tabbarPubusr002.tabs("a6").getAttachedObject();
	}
	
	iframeObj.contentWindow.fn_CallbackGridSearchComCodeButtonReturn(g_TabRowId, $comCodeInfo);
}

var g_TabNo = null;
var g_TabRowId = null;
//첨부파일 : 학력탭
var fn_FileUploadPopUpIframeOutputs = function(atchmnfl, rowId, tabNo){
	//var atchmnfl = gf_DhxGetValue(dhxGridMhsEmpRward, rowId, 'atchmnflNo', 'grid');
	var outputsFileKeyArr = gf_IsNull(atchmnfl) ? [] : atchmnfl.split('|');
	var viewFlag = "";
	
	if(gf_IsNull(tabNo)){
		gf_DivMsgAlert("Tab번호가 불확실합니다.");
		return false;
	}
	var confmSttusCode = gf_DhxGetValue(dhxGridPubusr002, rowId, 'confmSttusCode', 'grid');
	if(gf_IsNull(confmSttusCode)){}
	else{ viewFlag = "view"}
	
	g_TabNo = tabNo;
	
	gf_FileUploadPopup(
			 '', 
			 '', 
			 '', 
			 rowId, 
			 outputsFileKeyArr, 
			 [], 
			 0,
			 'all',
	         'gf_CallbackFileUploadIframe',
	         viewFlag);
};
var gf_CallbackFileUploadIframe = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){

	if(!gf_IsNull(data)){
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		var rtnFileKey = "";
		
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);
			if(gf_IsNull(rtnFileKey)){
				rtnFileKey = fileInfos[0];
			}
			else {
				rtnFileKey = rtnFileKey + "|" + fileInfos[0];
			}
		});
		
		var iframeObj =  null;
		
		if(g_TabNo == 3){
			(tabbarPubusr002.tabs("a3").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 4){
			(tabbarPubusr002.tabs("a4").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 4.1){
			(tabbarPubusr002.tabs("a4").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturnBefore(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 5){
			(tabbarPubusr002.tabs("a5").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 5.1){
			(tabbarPubusr002.tabs("a5").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturnBefore(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 6){
			(tabbarPubusr002.tabs("a6").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 6.1){
			(tabbarPubusr002.tabs("a6").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturnBefore(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 7){
			(tabbarPubusr002.tabs("a7").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		} 
		else if(g_TabNo == 7.1){
			(tabbarPubusr002.tabs("a7").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturnBefore(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 8){
			(tabbarPubusr002.tabs("a8").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
		}
		else if(g_TabNo == 8.1){
			(tabbarPubusr002.tabs("a8").getAttachedObject()).contentWindow.fn_FileUploadPopUpTabReturnBefore(dataDivId, rtnFileKey);
		}
	}
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
    $('#saveFormPubusr002 #empnoSaveFormPubusr002').parent().append(
    '<div class="error" id="empnoSaveFormPubusr002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormPubusr002 #changeReqstSnSaveFormPubusr002').parent().append(
    '<div class="error" id="changeReqstSnSaveFormPubusr002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubusr002 = function(empno, changeReqstSn){
    if(!gf_IsNull(empno) && !gf_IsNull(changeReqstSn)) {
        var jsonParameter = {
            empno : empno,
            changeReqstSn : changeReqstSn
        };
        var dataSource = gf_NoAsyncTransaction('pubusr002/findPubusr002', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno) && gf_IsNull(data.changeReqstSn)) {
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
    var state = dhxDataProcessorPubusr002.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormPubusr002').validate().form()){
                if(state == 'inserted') {
                    var empno = gf_FormGetValue('saveFormPubusr002', 'empno', 'text');
                    var changeReqstSn = gf_FormGetValue('saveFormPubusr002', 'changeReqstSn', 'text');
                    if(fn_CheckDupPubusr002(empno, changeReqstSn)) return true;
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
    var checkNull;
    var checkNull;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Pubusr002 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Pubusr002 == 'deleted') {
        save_Row_Num_Pubusr002 = 0;
        save_Row_Ids_Pubusr002 = "";
    } else if(save_Row_Sta_Pubusr002 == 'inserted') {
        save_Row_Num_Pubusr002 = rowNum;
        save_Row_Ids_Pubusr002 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubusr002 = rowNum;
        save_Row_Ids_Pubusr002 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'null');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'null');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkNull = gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid');
                    checkNull = gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid');
                    if(!gf_IsNull(checkEmpno, checkChangeReqstSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var changeReqstSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'changeReqstSn', 'grid');
                            if(((empno == checkEmpno) && (changeReqstSn == checkChangeReqstSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'changeReqstSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupPubusr002( checkEmpno, checkChangeReqstSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'changeReqstSn');
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
        dhxGridPubusr002.selectRowById(validFalseFistRowId);
        fn_FirstFind();
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
/**********************************************************파일 핸들링 시작**************************************************************/
var fn_CallbackFileUploadSaveFormStmPrgRequst = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	var rId = dhxGridPubusr002.getSelectedRowId();
	var changeSe = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeSe',  'grid');
	if(!gf_IsNull(data)){               
        uploadedFileKeys = [];
        uploadedFileInfo = [];
		if(changeSe == "002"){
			(tabbarPubusr002.tabs("a2").getAttachedObject()).contentWindow.fn_CallbackFileUploadSaveForm(viewDivId);
		}
        fn_LoadFileUploadSaveFormStmPrgRequst(data, viewDivId, dataDivId);
    }
};

var fn_SearchFileUploadSaveFormStmPrgRequst = function(atchFiles, viewDivId, dataDivId) {
	var rId = dhxGridPubusr002.getSelectedRowId();
	var changeSe = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeSe',  'grid');
    var jsonParameter = { atchFiles : atchFiles };
    var dataSource = gf_NoAsyncTransaction('file/searchFiles', jsonParameter, 'POST'); 
    if(!gf_IsNull(dataSource.data)) {
        uploadedFileKeys = [];
        uploadedFileInfo = [];
        $.each( dataSource.data, function( key, value ) {           
            uploadedFileKeys.push(value.atchFileId);                
            uploadedFileInfo.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);   
        });     
		if(changeSe == "002"){
			(tabbarPubusr002.tabs("a2").getAttachedObject()).contentWindow.fn_SearchFileUploadSaveForm(viewDivId);
		}
        fn_LoadFileUploadSaveFormStmPrgRequst(uploadedFileInfo, viewDivId, dataDivId);  
    }
    else {
    	fn_ClearFileUploadSaveFormStmPrgRequst(viewDivId , dataDivId);
    }
};

var fn_RemoveFileUploadSaveFormStmPrgRequst = function(obj, viewDivId, dataDivId) {
	var rId = dhxGridPubusr002.getSelectedRowId();
	var changeSe = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeSe',  'grid');
	if(!gf_IsNull( gf_DhxGetValue(dhxGridPubusr002, rId, 'confmSttusCode', 'grid')) ){
		gf_DivMsgAlert('처리된 신청건은 삭제할 수 없습니다.');
		return false;
	}
	else{
		uploadedFileKeys.splice($(obj).attr('idx'), 1);
		uploadedFileInfo.splice($(obj).attr('idx'), 1); 
		if(changeSe == "002"){
			(tabbarPubusr002.tabs("a2").getAttachedObject()).contentWindow.fn_SearchFileUploadSaveForm(viewDivId);
		}
		fn_LoadFileUploadSaveFormStmPrgRequst(uploadedFileInfo, viewDivId, dataDivId);
	}
};

var fn_LoadFileUploadSaveFormStmPrgRequst = function(data, viewDivId, dataDivId) {   
	var rId = dhxGridPubusr002.getSelectedRowId();
	var changeSe = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeSe',  'grid');
    var atchFileList = [];
    var fileInfos = [];
    var idx = 0;
    var arrayEmpty = false;
    if(gf_IsNull(uploadedFileKeys) && gf_IsNull(uploadedFileInfo)) arrayEmpty = true;
    $.each( data, function( key, value ) {
        fileInfos = value.split('|^|');
        if(arrayEmpty) {
            uploadedFileKeys.push(fileInfos[0]);                
            uploadedFileInfo.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);   
        }       
        atchFileList.push('<tr>');
        atchFileList.push('<td style="border:0px"><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
        atchFileList.push('<td style="border:0px">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
        atchFileList.push('<td style="border:0px"><button type="button" idx="'+idx+'" class="btn_del" onclick="parent.fn_RemoveFileUploadSaveFormStmPrgRequst(this,\''+viewDivId+'\',\''+dataDivId+'\')"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
        atchFileList.push('</tr>');     
        idx++;
    }); 
    if(idx === 0) {
        atchFileList.push('<tr>');
        atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');      
        atchFileList.push('</tr>');
    }
	if(changeSe == "002"){
		(tabbarPubusr002.tabs("a2").getAttachedObject()).contentWindow.fn_LoadFileUploadSaveForm(viewDivId , dataDivId , atchFileList.join("") , uploadedFileKeys.join("|"));
	}
}

var fn_ClearFileUploadSaveFormStmPrgRequst = function(viewDivId, dataDivId){
	var rId = dhxGridPubusr002.getSelectedRowId();
	var changeSe = gf_DhxGetValue(dhxGridPubusr002, rId, 'changeSe',  'grid');
//    $('#'+viewDivId+' .file_box table tr').remove();
	if(changeSe == "002"){
		(tabbarPubusr002.tabs("a2").getAttachedObject()).contentWindow.fn_SearchFileUploadSaveForm(viewDivId);
	}
    var atchFileList = [];
    atchFileList.push('<tr>');
    atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');      
    atchFileList.push('</tr>');
	if(changeSe == "002"){
		(tabbarPubusr002.tabs("a2").getAttachedObject()).contentWindow.fn_ClearFileUploadSaveForm(viewDivId , dataDivId , atchFileList.join(""));
	}
};
/**********************************************************파일 핸들링 끝**************************************************************/
