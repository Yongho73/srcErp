/**
 *    프로그램       : 결재문서 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2021.03.23
 *    사용테이블      : SGN_SANCTN_DOC
 * sourceGen version : 2021.02.18.01 (2021.03.23)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Etspbx002 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Etspbx002 = 0;  //그리드 위치 상태 
var save_All_Sta_Etspbx002 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Etspbx002 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Row_Values_Etspbx002 = "";  //그리드에서 저장하는 위치의 key 값, 개발자에 의해 수정 필요 
var save_Add_Cnt_Etspbx002 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Etspbx002 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Etspbx002 = 0;  //그리드 삭제 수량 
var dhxGridEtspbx002;  //그리드 객체
var eventIdEtspbx002 = [];  //그리드 이벤트 객체 
var dhxDataProcessorEtspbx002;  //DataProcessor 객체

//달력
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var dhxCCalendarDrftDe; // 기간 달력(From ~ To)
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamEtspbx002();
    if(cf_SetComponentsEtspbx002()){
       cf_SetEventListenerEtspbx002();
       cf_InitFormEtspbx002();
       cf_SetBindingEtspbx002();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamEtspbx002 = function() {
    gf_SetMenuPath();
    $("#saveFormEtspbx002").validate({ errorElement: 'div', ignore: '' });
	fn_Calendar();
};

var cf_SetComponentsEtspbx002 = function() {
    var dhxGridEtspbx002HeaderInfo = [];
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('문서번호', '120', 'center', 'str', 'ro', false, 'docNo', '', '')); /* gf_LocaleTrans('default', 'titDocNo') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('양식명', '130', 'left', 'str', 'ro', false, 'raisnm', '', '')); /* gf_LocaleTrans('default', 'titRaisNo') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('제목', '*', 'left', 'str', 'ro', false, 'docTit', '', '')); /* gf_LocaleTrans('default', 'titDocTit') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('기안일시', '180', 'center', 'str', 'ro', false, 'drftDe', '', '')); /* gf_LocaleTrans('default', 'titDrftDe') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('결재선', '250', 'left', 'str', 'ro', false, 'apln', '', '')); /* gf_LocaleTrans('default', 'titDrftDe') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('결재종류', '120', 'center', 'str', 'ro', false, 'sanctnTyCodeNm', '', '')); /* gf_LocaleTrans('default', 'titSanctnTyCode') */

    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '100', 'center', 'str', 'ro', true, 'docSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titDocSttusCode') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('결재 번호', '100', 'right', 'int', 'ro', true, 'sanctnNo', '', '')); /* gf_LocaleTrans('default', 'titSanctnNo') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('양식 번호', '100', 'left', 'str', 'ro', true, 'raisNo', '', '')); /* gf_LocaleTrans('default', 'titRaisNo') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('기안자 사원번호', '80', 'center', 'str', 'ro', true, 'drafterEmpno', '', '')); /* gf_LocaleTrans('default', 'titDrafterEmpno') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('기안요청일시', '180', 'center', 'str', 'ro', true, 'drftRequstdt', '', '')); /* gf_LocaleTrans('default', 'titDrftDe') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('결재 완료일시', '100', 'left', 'str', 'ro', true, 'sanctnComptdt', '', '')); /* gf_LocaleTrans('default', 'titSanctnComptdt') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('긴급 결재 여부', '100', 'center', 'str', 'ro', true, 'emrgncySanctnAt', '', '')); /* gf_LocaleTrans('default', 'titEmrgncySanctnAt') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('결재 요약', '100', 'left', 'str', 'ro', true, 'sanctnSumry', '', '')); /* gf_LocaleTrans('default', 'titSanctnSumry') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일', '100', 'left', 'str', 'ro', true, 'atchmnfl', '', '')); /* gf_LocaleTrans('default', 'titAtchmnfl') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('문서 상태 코드', '100', 'center', 'str', 'ro', true, 'docSttusCode', '', '')); /* gf_LocaleTrans('default', 'titDocSttusCode') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('공개 구분 코드', '100', 'center', 'str', 'ro', true, 'othbcSeCode', '', '')); /* gf_LocaleTrans('default', 'titOthbcSeCode') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('문서함 번호', '100', 'right', 'int', 'ro', true, 'dbxNo', '', '')); /* gf_LocaleTrans('default', 'titDbxNo') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('기안자 부서 코드', '100', 'center', 'str', 'ro', true, 'drafterDeptCode', '', '')); /* gf_LocaleTrans('default', 'titDrafterDeptCode') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('결재 유형 코드', '100', 'center', 'str', 'ro', true, 'sanctnTyCode', '', '')); /* gf_LocaleTrans('default', 'titSanctnTyCode') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('비공개 사유 코드', '100', 'center', 'str', 'ro', true, 'ctothbcResnCode', '', '')); /* gf_LocaleTrans('default', 'titCtothbcResnCode') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('기록물철 코드', '100', 'center', 'str', 'ro', true, 'dcmnCode', '', '')); /* gf_LocaleTrans('default', 'titDcmnCode') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('열람 권한 코드', '100', 'center', 'str', 'ro', true, 'readngAuthorCode', '', '')); /* gf_LocaleTrans('default', 'titReadngAuthorCode') */
    dhxGridEtspbx002HeaderInfo.push(gf_MakeDhxGridHeader('문서 보존 기한 코드', '100', 'center', 'str', 'ro', true, 'docPrsrvTmlmtCode', '', '')); /* gf_LocaleTrans('default', 'titDocPrsrvTmlmtCode') */
    dhxGridEtspbx002 = gf_MakeDhxGrid('dataListEtspbx002', dhxGridEtspbx002HeaderInfo, true, false, false);
    dhxGridEtspbx002.enableAutoWidth(false);
    dhxGridEtspbx002.setEditable(true);

    dhxGridEtspbx002.setColumnMinWidth(40,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerEtspbx002 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdEtspbx002 = gf_GridDetachEvent(dhxGridEtspbx002, eventIdEtspbx002);
    eventId = dhxGridEtspbx002.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelEtspbx002();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridEtspbx002.getColumnsNum();
            var rowNum = dhxGridEtspbx002.getRowsNum();
            var selectedId = dhxGridEtspbx002.getSelectedRowId();
            var ind        = dhxGridEtspbx002.getSelectedCellIndex();
            var rowIndex   = dhxGridEtspbx002.getRowIndex(selectedId);
            var type       = dhxGridEtspbx002.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridEtspbx002.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridEtspbx002.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridEtspbx002.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtspbx002.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridEtspbx002.getSelectedRowId();
            var ind        = dhxGridEtspbx002.getSelectedCellIndex();
            var rowIndex   = dhxGridEtspbx002.getRowIndex(selectedId);
            var type       = dhxGridEtspbx002.getColType(ind);
            dhxGridEtspbx002.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtspbx002.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridEtspbx002.getSelectedRowId();
            var ind        = dhxGridEtspbx002.getSelectedCellIndex();
            var rowIndex   = dhxGridEtspbx002.getRowIndex(selectedId);
            var type       = dhxGridEtspbx002.getColType(ind);
            dhxGridEtspbx002.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtspbx002.editCell();
            }
        }
        else return true;
    });
    eventIdEtspbx002.push(eventId);
    eventId = dhxGridEtspbx002.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Etspbx002SortGridList(ind, type, direction); 
    });
    eventIdEtspbx002.push(eventId);
    eventId = dhxGridEtspbx002.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdEtspbx002.push(eventId);
    eventId = dhxGridEtspbx002.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdEtspbx002.push(eventId);
    eventId = dhxGridEtspbx002.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdEtspbx002.push(eventId);
	eventId = dhxGridEtspbx002.attachEvent("onRowDblClicked", function(rId,cInd){
		if(gf_GetDhxGridColumId(dhxGridEtspbx002, 'docNo') == cInd){
			alert('문서번호:'+gf_DhxGetValue(dhxGridEtspbx002, rId, 'docNo', 'grid') );
		}
	    return true;
	});
    eventIdEtspbx002.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnSaveEtspbx002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveEtspbx002();
    });
    $('#btnExcelEtspbx002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelEtspbx002();
    });
    $('#btnSearchEtspbx002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchEtspbx002('');
    });
    $('#btnResetEtspbx002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormEtspbx002();
    });
	$('#searchFormEtspbx002 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormEtspbx002","drafterEmpnoSearchFormEtspbx002","drafterEmpnmSearchFormEtspbx002", "1000", "Y", "");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormEtspbx002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
//			if(this.id != "drafterEmpnoSearchFormEtspbx002" && this.id!="drafterEmpnmSearchFormEtspbx002"){
//				$('#btnSearchEtspbx002').click(); event.preventDefault(); 
//			}
			$('#btnSearchEtspbx002').click(); event.preventDefault(); 
			return true; 
		} //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormEtspbx002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#searchFormEtspbx002 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    
	//기간달력 이벤트 추가
    $('#searchFormEtspbx002 #drftDeDiv').unbind('click').bind('click', function(event){
    	//dhxCCalendarDrftDe.setPosition("bottom"); // "bottom"
    	//$('#drftDeDiv').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxCCalendarDrftDe.show();
    });
	
	
//	//사원 입력 후 Enter 이벤트
//	$('#drafterEmpnoSearchFormEtspbx002').unbind('keydown').bind('keydown',function(event) {
//		if (event.keyCode == 13)  {
//			fn_SearchEmpCode();
//	    }
//    });
//	$('#drafterEmpnmSearchFormEtspbx002').unbind('keydown').bind('keydown',function(event) {
//		if (event.keyCode == 13)  {
//			fn_SearchEmpCode();
//	    }
//    });
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};

var cf_InitFormEtspbx002 = function() {
    $('#searchFormEtspbx002').resetForm();

//	var lastDay = ( new Date( (new Date()).format('YYYY'), (new Date()).format('MM'), 0) ).getDate();
	$('input[name=drftStrDeSearch]').val( (new Date()).format('YYYY-MM-01') );
	$('input[name=drftEndDeSearch]').val( ((new Date()).format('YYYY-MM-DD')));
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxCCalendarDrftDe.leftCalendar.setDate(gf_FormGetValue('searchFormEtspbx002', 'drftStrDeSearch', 'text'));
	dhxCCalendarDrftDe.rightCalendar.setDate(gf_FormGetValue('searchFormEtspbx002', 'drftEndDeSearch', 'text'));	
//    gf_SetDataAuthorSe();
};

var cf_SetBindingEtspbx002 = function() {
    fn_SearchEtspbx002('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchEtspbx002 = function(userId) {
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    var jsonParameter = {
        docNo : gf_FormGetValue('searchFormEtspbx002', 'docNoSearch', 'text'),
        raisNm : gf_FormGetValue('searchFormEtspbx002', 'raisNmSearch', 'text'),
        docTit : gf_FormGetValue('searchFormEtspbx002', 'docTitSearch', 'text'),
        drftStrDe : gf_FormGetValue('searchFormEtspbx002', 'drftStrDeSearch', 'text'),
        drftEndDe : gf_FormGetValue('searchFormEtspbx002', 'drftEndDeSearch', 'text'),
        drafterEmpno : gf_FormGetValue('searchFormEtspbx002', 'drafterEmpnoSearch', 'text'),
        drafterEmpnm : gf_FormGetValue('searchFormEtspbx002', 'drafterEmpnmSearch', 'text'),

		empno : userInfo.data.userEmpNo
    };
    gf_Transaction(userId, 'etspbx002/searchEtspbx002', jsonParameter, 'fn_CallbackSearchEtspbx002', false, 'GET');
};

var fn_CallbackSearchEtspbx002 = function(strSvcID, targetID, data) {
    //dhxGridEtspbx002.clearAll();
    dhxGridEtspbx002.destructor();
    if(cf_SetComponentsEtspbx002()){ 
        fn_DhxDataProcessorEtspbx002(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListEtspbx002');
            dhxGridEtspbx002.parse(data.data.records, 'js');
 
            if(save_Row_Num_Etspbx002 == 0 && save_All_Sta_Etspbx002 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridEtspbx002.selectRow(0); 
            } else if(save_Row_Sta_Etspbx002 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridEtspbx002.selectRow(0);
            } else if(save_All_Sta_Etspbx002 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridEtspbx002.selectRow(save_Row_Num_Etspbx002); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridEtspbx002.selectRow(save_Row_Num_Etspbx002);   //개발자 수정 필요  
                //var findCell = dhxGridEtspbx002.findCell(save_Row_Values_Etspbx002, gf_GetDhxGridColumId(dhxGridEtspbx002,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridEtspbx002.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridEtspbx002.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListEtspbx002');
        }
        $("#spanCntSearchFormEtspbx002").text(data.data.records.length);
        cf_SetEventListenerEtspbx002();
    } 
};
var fn_DhxDataProcessorEtspbx002 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorEtspbx002 = new dataProcessor(gv_ContextPath+'/etspbx002/saveEtspbx002'); //lock feed url
    dhxDataProcessorEtspbx002.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorEtspbx002.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorEtspbx002.init(dhxGridEtspbx002); //link dataprocessor to the grid
    dhxDataProcessorEtspbx002.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorEtspbx002.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorEtspbx002.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchEtspbx002();
                    $("#checkAllEtspbx002").prop('checked', false); //상단 체크박스 해제
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
var fn_AddEtspbx002 = function() {
    dhxGridEtspbx002.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //sanctnNo
    initValueArr.push(''); //raisNo
    initValueArr.push(''); //docTit
    initValueArr.push(''); //drafterEmpno
    initValueArr.push(''); //drftRequstdt
    initValueArr.push(''); //docNo
    initValueArr.push(''); //drftDe
    initValueArr.push(''); //sanctnComptdt
    initValueArr.push(''); //emrgncySanctnAt
    initValueArr.push(''); //sanctnSumry
    initValueArr.push(''); //atchmnfl
    initValueArr.push(''); //docSttusCode
    initValueArr.push(''); //othbcSeCode
    initValueArr.push(''); //dbxNo
    initValueArr.push(''); //drafterDeptCode
    initValueArr.push(''); //sanctnTyCode
    initValueArr.push(''); //ctothbcResnCode
    initValueArr.push(''); //dcmnCode
    initValueArr.push(''); //readngAuthorCode
    initValueArr.push(''); //docPrsrvTmlmtCode
    dhxGridEtspbx002.addRow(dhxGridEtspbx002.uid(), initValueArr, 0);
    dhxGridEtspbx002.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListEtspbx002');
    $('#btnPopEmpSearchEtspbx002').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Etspbx002SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridEtspbx002, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormEtspbx002', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormEtspbx002', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridEtspbx002, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridEtspbx002.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormEtspbx002', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormEtspbx002', 'sortColumId', gf_GetDhxGridColum(dhxGridEtspbx002, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridEtspbx002.setSortImgState(false); 
            gf_FormSetValue('searchFormEtspbx002', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormEtspbx002', 'sortColumId', '', 'text'); 
            dhxGridEtspbx002.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridEtspbx002.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormEtspbx002', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormEtspbx002', 'sortColumId', gf_GetDhxGridColum(dhxGridEtspbx002, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveEtspbx002 = function() {
    var edCnt = 0;
    save_Add_Cnt_Etspbx002 = 0; 
    save_Edt_Cnt_Etspbx002 = 0; 
    save_Del_Cnt_Etspbx002 = 0; 
    dhxGridEtspbx002.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorEtspbx002.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorEtspbx002.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Etspbx002 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Etspbx002 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Etspbx002 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        if(fn_GridValidation(dhxGridEtspbx002, dhxDataProcessorEtspbx002)) {
            var confirmMsg  = ""; 
            var confirmMsg1 = ""; 
            var confirmMsg2 = ""; 
            var confirmMsg3 = ""; 
            save_All_Sta_Etspbx002 = 0; 
            if(save_Add_Cnt_Etspbx002 > 0){
                confirmMsg1 = "신규 " + save_Add_Cnt_Etspbx002 + "건";
                save_All_Sta_Etspbx002 = 1; 
            } 
            if(save_Edt_Cnt_Etspbx002 > 0){ 
                confirmMsg2 = "수정 " + save_Edt_Cnt_Etspbx002 + "건"; 
            } 
            if(save_Del_Cnt_Etspbx002 > 0){ 
                confirmMsg3 = "삭제 " + save_Del_Cnt_Etspbx002 + "건"; 
                save_All_Sta_Etspbx002 = 1; 
            } 
            if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
                confirmMsg1 = confirmMsg1 + ", ";
            }
            if(confirmMsg2 != "" && confirmMsg3 != ""){
                confirmMsg2 = confirmMsg2 + ", ";
            }
            confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
            
            //if(confirmModalEtspbx002(gv_QueSave)){  //여기는 안옴 
            if(confirmModalEtspbx002(confirmMsg)){  //여기는 안옴 
            } else { 
                return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
            } 
        } 
    }
}
var confirmModalEtspbx002 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveEtspbx002_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveEtspbx002_Send = function() {
    //if(fn_GridValidation(dhxGridEtspbx002, dhxDataProcessorEtspbx002)) {
        dhxDataProcessorEtspbx002.sendData();
    //}
}
/**
 * 삭제
 */
var fn_RemoveEtspbx002 = function() {
    var rowId = dhxGridEtspbx002.getSelectedRowId();
    var state = dhxDataProcessorEtspbx002.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridEtspbx002.getRowIndex(rowId);
        dhxGridEtspbx002.deleteRow(rowId);
        dhxGridEtspbx002.selectRow(rowNum);
    }
    else dhxDataProcessorEtspbx002.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelEtspbx002 = function () {
    var titEtspbx002 = '결재문서'; /* gf_LocaleTrans('default', 'titEtspbx002') */
    var jsonParameter = {
        sanctnNo : gf_FormGetValue('searchFormEtspbx002', 'sanctnNo', 'text')
    };
    var header = [[
        '결재 번호' /* gf_LocaleTrans('default', 'titSanctnNo') */,
        '양식 번호' /* gf_LocaleTrans('default', 'titRaisNo') */,
        '문서 제목' /* gf_LocaleTrans('default', 'titDocTit') */,
        '기안자 사원번호' /* gf_LocaleTrans('default', 'titDrafterEmpno') */,
        '기안 요청일시' /* gf_LocaleTrans('default', 'titDrftRequstdt') */,
        '문서 번호' /* gf_LocaleTrans('default', 'titDocNo') */,
        '기안 일자' /* gf_LocaleTrans('default', 'titDrftDe') */,
        '결재 완료일시' /* gf_LocaleTrans('default', 'titSanctnComptdt') */,
        '긴급 결재 여부' /* gf_LocaleTrans('default', 'titEmrgncySanctnAt') */,
        '결재 요약' /* gf_LocaleTrans('default', 'titSanctnSumry') */,
        '첨부파일' /* gf_LocaleTrans('default', 'titAtchmnfl') */,
        '문서 상태 코드' /* gf_LocaleTrans('default', 'titDocSttusCode') */,
        '공개 구분 코드' /* gf_LocaleTrans('default', 'titOthbcSeCode') */,
        '문서함 번호' /* gf_LocaleTrans('default', 'titDbxNo') */,
        '기안자 부서 코드' /* gf_LocaleTrans('default', 'titDrafterDeptCode') */,
        '결재 유형 코드' /* gf_LocaleTrans('default', 'titSanctnTyCode') */,
        '비공개 사유 코드' /* gf_LocaleTrans('default', 'titCtothbcResnCode') */,
        '기록물철 코드' /* gf_LocaleTrans('default', 'titDcmnCode') */,
        '열람 권한 코드' /* gf_LocaleTrans('default', 'titReadngAuthorCode') */,
        '문서 보존 기한 코드' /* gf_LocaleTrans('default', 'titDocPrsrvTmlmtCode') */
    ]];
    var dataId = [[ 'sanctnNo', 'raisNo', 'docTit', 'drafterEmpno', 'drftRequstdt', 'docNo', 'drftDe', 'sanctnComptdt', 'emrgncySanctnAt', 'sanctnSumry', 'atchmnfl', 'docSttusCode', 'othbcSeCode', 'dbxNo', 'drafterDeptCode', 'sanctnTyCode', 'ctothbcResnCode', 'dcmnCode', 'readngAuthorCode', 'docPrsrvTmlmtCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titEtspbx002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titEtspbx002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('etspbx002/excelEtspbx002', jsonParameter);
};

//기간달력 이벤트
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="drftDe_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="drftDe_cal" || e.target.id =="drftStrDeSearch" || e.target.id =="drftEndDeSearch") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDrftDe.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

//기간달력
function fn_Calendar(){
	//달력 생성
	dhxCCalendarDrftDe = new dhtmlXDoubleCalendar("drftDe_cal");
	
    dhxCCalendarDrftDe.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#drftStrDeSearch').val(dateFormat(dhxCCalendarDrftDe.leftCalendar.getDate()));
        	$('#drftEndDeSearch').val(dateFormat(dhxCCalendarDrftDe.rightCalendar.getDate()));
        	dhxCCalendarDrftDe.hide();
        }
    });
	
	dhxCCalendarDrftDe.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDrftDe.rightCalendar.loadUserLanguage("ko");
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

//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var jsonParameter = {
			empno     : gf_FormGetValue('searchFormEtspbx002', 'drafterEmpnoSearch', 'text'),
			korNm     : gf_FormGetValue('searchFormEtspbx002', 'drafterEmpnmSearch', 'text')
	};
	gf_Transaction(gubun, 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	  	gf_FormSetValue('searchFormEtspbx002', 'drafterEmpnoSearch', data.empno, 'text');
	 	gf_FormSetValue('searchFormEtspbx002', 'drafterEmpnmSearch', data.korNm, 'text');
 	}
  	else {
	  	gf_EmpPopup("searchFormEtspbx002","drafterEmpnoSearchFormEtspbx002","drafterEmpnmSearchFormEtspbx002", gBplcCode, "Y");
  	}
}

/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormEtspbx002 #sanctnNoSaveFormEtspbx002').parent().append(
    '<div class="error" id="sanctnNoSaveFormEtspbx002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupEtspbx002 = function(sanctnNo){
    if(!gf_IsNull(sanctnNo)) {
        var jsonParameter = {
            sanctnNo : sanctnNo
        };
        var dataSource = gf_NoAsyncTransaction('etspbx002/findEtspbx002', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.sanctnNo)) {
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
    var checkSanctnNo;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Etspbx002 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Etspbx002 = 0;
        save_Row_Ids_Etspbx002 = "";
        save_Row_Values_Etspbx002 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Etspbx002 = rowNum;
        save_Row_Ids_Etspbx002 = "";  
        save_Row_Values_Etspbx002 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Etspbx002 = rowNum;
        save_Row_Ids_Etspbx002 = rowIds; 
        save_Row_Values_Etspbx002 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'sanctnNo', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sanctnNo');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkSanctnNo = gf_DhxGetValue(dhxGridObjet, rowId, 'sanctnNo', 'grid');
                    if(!gf_IsNull(checkSanctnNo)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var sanctnNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'sanctnNo', 'grid');
                            if(((sanctnNo == checkSanctnNo)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sanctnNo');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupEtspbx002( checkSanctnNo )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sanctnNo');
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
        dhxGridEtspbx002.selectRowById(validFalseFistRowId);
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
