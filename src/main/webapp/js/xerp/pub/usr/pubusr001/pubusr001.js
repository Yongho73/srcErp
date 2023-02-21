/**
 *    프로그램       : 개인정보조회 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2021.05.28
 *    사용테이블      : MHS_EMP
 * sourceGen version : 2021.02.18.01 (2021.05.28)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubusr001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubusr001 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubusr001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubusr001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Row_Values_Pubusr001 = "";  //그리드에서 저장하는 위치의 key 값, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubusr001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubusr001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubusr001 = 0;  //그리드 삭제 수량 
var dhxGridPubusr001;  //그리드 객체
var eventIdPubusr001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPubusr001;  //DataProcessor 객체

var tabbarPubUsr001;
var g_MainSearchValue = new Object(); 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPubusr001();
    if(cf_SetComponentsPubusr001()){
       cf_SetEventListenerPubusr001();
       cf_InitFormPubusr001();
       cf_SetBindingPubusr001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubusr001 = function() {
    gf_SetMenuPath();
    $("#saveFormPubusr001").validate({ errorElement: 'div', ignore: '' });
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno =userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm;   
	
	gf_FormSetValue("searchFormPubusr001", "searchEmpNo", userno, '');
	gf_FormSetValue("searchFormPubusr001", "searchEmpCodeNm", userNm, '');
	fn_SearchPubusr001();
};

var cf_SetComponentsPubusr001 = function() {
    $("#saveFormEmp_Tab1").validate({
        errorElement: 'div'
    });

tabbarPubUsr001 = new dhtmlXTabBar({
        parent:         "tabbarObj",
        close_button:   false,
        arrows_mode :   "auto", 
        tabs: [
    	    {id:"a1",  text: gf_LocaleTrans('default', 'titBasic') },     //기본
		    /*{id:"a2",  text: gf_LocaleTrans('default', 'titPaly')},       //신상정보 
    	    {id:"a2",  text: "신상정보"},                                   //신상정보
            {id:"a3",  text: gf_LocaleTrans('default', 'titFamily')},	  //가족 
		    {id:"a4",  text: gf_LocaleTrans('default', 'titPaly')},		  //발령 
		    {id:"a5",  text: gf_LocaleTrans('default', 'titReward')},	  //포상 
		    {id:"a6",  text: gf_LocaleTrans('default', 'titMhsDscpl')},	  //징계 
		    {id:"a7",  text: gf_LocaleTrans('default', 'titSchool')},	  //학력 
		    {id:"a8",  text: gf_LocaleTrans('default', 'titCareer')},     //경력 
		    {id:"a9",  text: gf_LocaleTrans('default', 'titMhsCrqfs')},   //자격 
		    {id:"a10", text: gf_LocaleTrans('default', 'titEdu')},		  //교육 
		    {id:"a11", text: gf_LocaleTrans('default', 'titAcnutNo')},	  //계좌 
		    {id:"a12", text: gf_LocaleTrans('default', 'titLang')},	      //어학  titLang
		    /*
		    {id:"a13", text: gf_LocaleTrans('default', 'titForEdu')},	  //(해외)연수
		    {id:"a14", text: "자소서"},               	                  //자소서
		    {id:"a15", text: "면담"},               	                      //면담
		    {id:"a16", text: gf_LocaleTrans('default', 'titOther')}		  //기타*/
		    
        ]
    });
   
    tabbarPubUsr001.tabs("a1").attachObject("tab1");
    /*tabbarPubUsr001.tabs("a2").attachObject("tab2");
    tabbarPubUsr001.tabs("a3").attachObject("tab3");
    tabbarPubUsr001.tabs("a4").attachObject("tab4");
    tabbarPubUsr001.tabs("a5").attachObject("tab5");
    tabbarPubUsr001.tabs("a6").attachObject("tab6");
    tabbarPubUsr001.tabs("a7").attachObject("tab7");
    tabbarPubUsr001.tabs("a8").attachObject("tab8");
    tabbarPubUsr001.tabs("a9").attachObject("tab9");
    tabbarPubUsr001.tabs("a10").attachObject("tab10");
    tabbarPubUsr001.tabs("a11").attachObject("tab11");
    tabbarPubUsr001.tabs("a12").attachObject("tab12");*/

	tabbarPubUsr001.tabs("a1").setActive();
};

var cf_SetEventListenerPubusr001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubusr001 = gf_GridDetachEvent(dhxGridPubusr001, eventIdPubusr001);
    eventId = dhxGridPubusr001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubusr001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubusr001.getColumnsNum();
            var rowNum = dhxGridPubusr001.getRowsNum();
            var selectedId = dhxGridPubusr001.getSelectedRowId();
            var ind        = dhxGridPubusr001.getSelectedCellIndex();
            var rowIndex   = dhxGridPubusr001.getRowIndex(selectedId);
            var type       = dhxGridPubusr001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubusr001.selectRow(0);
                    //fn_FindPubusr001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubusr001.selectRow(rowIndex + 1);
                    fn_FindPubusr001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubusr001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubusr001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubusr001.getSelectedRowId();
            var ind        = dhxGridPubusr001.getSelectedCellIndex();
            var rowIndex   = dhxGridPubusr001.getRowIndex(selectedId);
            var type       = dhxGridPubusr001.getColType(ind);
            dhxGridPubusr001.selectCell(rowIndex+1, ind);
            fn_FindPubusr001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubusr001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubusr001.getSelectedRowId();
            var ind        = dhxGridPubusr001.getSelectedCellIndex();
            var rowIndex   = dhxGridPubusr001.getRowIndex(selectedId);
            var type       = dhxGridPubusr001.getColType(ind);
            dhxGridPubusr001.selectCell(rowIndex-1, ind);
            fn_FindPubusr001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubusr001.editCell();
            }
        }
        else return true;
    });
    eventIdPubusr001.push(eventId);
    eventId = dhxGridPubusr001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubusr001SortGridList(ind, type, direction); 
    });
    eventIdPubusr001.push(eventId);
    eventId = dhxGridPubusr001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubusr001.push(eventId);
    eventId = dhxGridPubusr001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindPubusr001();
    });
    eventIdPubusr001.push(eventId);
    eventId = dhxGridPubusr001.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdPubusr001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubusr001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddPubusr001()
    });
    $('#btnSavePubusr001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePubusr001();
    });
    $('#btnRemovePubusr001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubusr001();
    });
    $('#btnExcelPubusr001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubusr001();
    });
    $('#btnSearchPubusr001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubusr001('');
    });
    $('#btnResetPubusr001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubusr001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormPubusr001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPubusr001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubusr001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormPubusr001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPubusr001",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubusr001 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'empno', $(this).val());
    });
    $('#saveFormPubusr001 input[name="bplcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'bplcCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="korNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'korNm', $(this).val());
    });
    $('#saveFormPubusr001 input[name="engNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'engNm', $(this).val());
    });
    $('#saveFormPubusr001 input[name="chcrtNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'chcrtNm', $(this).val());
    });
    $('#saveFormPubusr001 input[name="emplSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'emplSe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="ecnySeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'ecnySeCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="deptCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'deptCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="hffsSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'hffsSe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="ecnyDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'ecnyDe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="ihidnum"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'ihidnum', $(this).val());
    });
    $('#saveFormPubusr001 input[name="sexdstnSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'sexdstnSe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="natvfrgnSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'natvfrgnSeCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="nltyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'nltyCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="srclsCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'srclsCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="clsfCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'clsfCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="ofcpsCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'ofcpsCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="jssfcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'jssfcCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="dtyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'dtyCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="rspofcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'rspofcCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="jblnCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'jblnCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="zip"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'zip', $(this).val());
    });
    $('#saveFormPubusr001 input[name="ownhomAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'ownhomAdres', $(this).val());
    });
    $('#saveFormPubusr001 input[name="ownhomDetailAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'ownhomDetailAdres', $(this).val());
    });
    $('#saveFormPubusr001 input[name="ownhomEngAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'ownhomEngAdres', $(this).val());
    });
    $('#saveFormPubusr001 input[name="ownhomTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'ownhomTelno', $(this).val());
    });
    $('#saveFormPubusr001 input[name="lxtnTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'lxtnTelno', $(this).val());
    });
    $('#saveFormPubusr001 input[name="mbtlnum"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'mbtlnum', $(this).val());
    });
    $('#saveFormPubusr001 input[name="emgncTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'emgncTelno', $(this).val());
    });
    $('#saveFormPubusr001 input[name="email"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'email', $(this).val());
    });
    $('#saveFormPubusr001 input[name="indvdlEmail"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'indvdlEmail', $(this).val());
    });
    $('#saveFormPubusr001 input[name="brthdy"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'brthdy', $(this).val());
    });
    $('#saveFormPubusr001 input[name="slrcldAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'slrcldAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="mrrgAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'mrrgAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="retireDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'retireDe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="retireSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'retireSe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="layoffSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'layoffSeCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="photoAtchmnflNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'photoAtchmnflNo', $(this).val());
    });
    $('#saveFormPubusr001 input[name="signAtchmnflNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'signAtchmnflNo', $(this).val());
    });
    $('#saveFormPubusr001 input[name="cashierAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'cashierAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="hdadptAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'hdadptAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="hdadptDeptCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'hdadptDeptCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="dispDeptCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'dispDeptCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="dprlrAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'dprlrAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="lbunSbscrbAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'lbunSbscrbAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="mutaidSbscrbAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'mutaidSbscrbAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="dispWorkAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'dispWorkAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="flexbizAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'flexbizAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="babyShrtenWorkAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'babyShrtenWorkAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="salpeakAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'salpeakAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="salaryAprpCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'salaryAprpCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="ansalsysAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'ansalsysAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="apntcSdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'apntcSdt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="apntcEdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'apntcEdt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="incmtaxrtCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'incmtaxrtCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="salaryPymntAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'salaryPymntAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="retireAnntyKindCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'retireAnntyKindCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="nxttrmPromtDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'nxttrmPromtDe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="retireAnntySbscrbDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'retireAnntySbscrbDe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="retireAnntyDpstnm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'retireAnntyDpstnm', $(this).val());
    });
    $('#saveFormPubusr001 input[name="retireAnntyBankCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'retireAnntyBankCode', $(this).val());
    });
    $('#saveFormPubusr001 input[name="retireAnntyAcnutno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'retireAnntyAcnutno', $(this).val());
    });
    $('#saveFormPubusr001 input[name="layoffAltHnfAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'layoffAltHnfAt', $(this).val());
    });
    $('#saveFormPubusr001 input[name="nonTmlmtCntrctChangeDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'nonTmlmtCntrctChangeDe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="curClsfEmplmnday"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'curClsfEmplmnday', $(this).val());
    });
    $('#saveFormPubusr001 input[name="seniorSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'seniorSe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="retireAnntyDcSbscrbDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'retireAnntyDcSbscrbDe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="lastPromtDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'lastPromtDe', $(this).val());
    });
    $('#saveFormPubusr001 input[name="nonTmlmtCnttkChangeDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubusr001, dhxDataProcessorPubusr001, 'nonTmlmtCnttkChangeDe', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormPubusr001 = function() {
    $('#searchFormPubusr001').resetForm();
    gf_SetDataAuthorSe();
};

var cf_SetBindingPubusr001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchPubusr001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchPubusr001 = function(userId) {
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno =userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm;
    var jsonParameter = {
        empno : userno,
		empNm : userNm,
    };
	
	console.log("test");
	
    gf_Transaction(userno, 'pubusr001/searchPubusr001', jsonParameter, 'fn_CallbackSearchPubusr0012', false, 'GET');
	gf_FormSetValue("detailTopForm", "empno", userno,'');
	gf_FormSetValue("detailTopForm", "korNm", userNm,'');
	
};

var fn_CallbackSearchPubusr0012 = function(strSvcID, targetID, data) {
        if(!gf_IsNull(data.data.records)){
			console.log(data.data.records[0]);
			//alert(data.data.records[0].tab1MrrgDe);
			g_MainSearchValue.g_empPhoto = "";
       		g_MainSearchValue.g_empno = "";
        	g_MainSearchValue.g_korNm = "";
			$("#engNm").val(data.data.records[0].engNm);
			$("#chcrtNm").val(data.data.records[0].chcrtNm);
			$("#ihidnum").val(data.data.records[0].ihidnum);
			$("#brthdy").val(data.data.records[0].brthdy);
			$("#emplSe").val(data.data.records[0].emplSe);
			$("#dtyCode").val(data.data.records[0].dtyCode);
			$("#ofcpsCode").val(data.data.records[0].ofcpsCode);
			$("#clsfCode").val(data.data.records[0].clsfCode);
			$("#srclsCode").val(data.data.records[0].srclsCode);
			$("#jssfcCode").val(data.data.records[0].jssfcCode);
			$("#rspofcCode").val(data.data.records[0].rspofcCode);
			$("#slrcldAt").val(data.data.records[0].slrcldAt);
			$("#hffsSe").val(data.data.records[0].hffsSe);
			$("#emplSe").val(data.data.records[0].emplSe);
			$("#sexdstnSe").val(data.data.records[0].sexdstnSe);
			$("#deptCodeNm").val(data.data.records[0].deptCode);
			$("#curClsfEmplmnday").val(data.data.records[0].curClsfEmplmnday);
			$("#ecnyDe").val(data.data.records[0].ecnyDe);
			$("#hdadptDeptCodeNm").val(data.data.records[0].hdadptDeptCode);
			$("#dispDeptCodeNm").val(data.data.records[0].dispDeptCode);
			$("#retireDe").val(data.data.records[0].retireDe);
			$("#retireSe").val(data.data.records[0].retireSe);
			$("#tab1lxtnTelno").val(data.data.records[0].lxtnTelno);
			$("#tab1Mbtlnum").val(data.data.records[0].mbtlnum);
			$("#tab1Email").val(data.data.records[0].email);
			$("#tab1IndvdlEmail").val(data.data.records[0].indvdlEmail);
			$("#mrrgDe").val(data.data.records[0].mrrgDe);
			$("#tab1EmgncTelno").val(data.data.records[0].tab1EmgncTelno);
			$("#tab1LastSchulNm").val(data.data.records[0].tab1LastSchulNm);
			$("#tab1LastPromtDe").val(data.data.records[0].tab1LastPromtDe);
			$("#tab1LastSalclsupDe").val(data.data.records[0].tab1LastSalclsupDe);
			$("#salaryPymntAt").val(data.data.records[0].salaryPymntAt);
			$("#zip").val(data.data.records[0].zip);
			$("#ownhomAdres").val(data.data.records[0].ownhomAdres);
			$("#ownhomDetailAdres").val(data.data.records[0].ownhomDetailAdres);
			$("#tab1RetireExcclcDe").val(data.data.records[0].tab1RetireExcclcDe);
			$("#bornZip").val(data.data.records[0].bornZip);
			$("#bornAdres").val(data.data.records[0].bornAdres);
			$("#bornDetailAdres").val(data.data.records[0].bornDetailAdres);
			$("#retireAnntyKindCode").val(data.data.records[0].retireAnntyKindCode);
			$("#incmtaxrtCode").val(data.data.records[0].incmtaxrtCode);
			$("#salaryAprpCode").val(data.data.records[0].salaryAprpCode);
			$("#photoAtchmnflNo").val(data.data.records[0].photoAtchmnflNo);
			$("#mrrgAt").val(data.data.records[0].mrrgAt);
			$("#tab1EmgncTelno").val(data.data.records[0].emgncTelno);
			$("#tab1OwnhomTelno").val(data.data.records[0].ownhomTelno);
			//$("#tab1BabyShrtenWorkAt").val(data.data.records[0].babyShrtenWorkAt);
			//$("#tab1LbunSbscrbAt").val(data.data.records[0].lbunSbscrbAt);
			//$("#tab1MutaidSbscrbAt").val(data.data.records[0].mutaidSbscrbAt);
			if(data.data.records[0].babyShrtenWorkAt == "1") {
        		$("#tab1BabyShrtenWorkAt").prop("checked", true);  // 육아단축근무여부
      		} else {
        		$("#tab1BabyShrtenWorkAt").prop("checked", false);
        	}

			if(data.data.records[0].lbunSbscrbAt == "1") {
        		$("#tab1LbunSbscrbAt").prop("checked", true);  // 육아단축근무여부
      		} else {
        		$("#tab1LbunSbscrbAt").prop("checked", false);
        	}
			if(data.data.records[0].mutaidSbscrbAt == "1") {
        		$("#tab1MutaidSbscrbAt").prop("checked", true);  // 육아단축근무여부
      		} else {
        		$("#tab1MutaidSbscrbAt").prop("checked", false);
        	}
			if(data.data.records[0].cashierAt == "1") {
        		$("#tab1CashierAt").prop("checked", true);  // 육아단축근무여부
      		} else {
        		$("#tab1CashierAt").prop("checked", false);
        	}

			g_MainSearchValue.g_empPhoto = gf_SetNullInit(data.data.records[0].photoAtchmnflNo,"");
        	g_MainSearchValue.g_empno = gf_SetNullInit(data.data.records[0].empno,"");
        	g_MainSearchValue.g_korNm = gf_SetNullInit(data.data.records[0].korNm,"");

			if(data.photoAtchmnflNo != ""){
        		$('#empPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+g_MainSearchValue.g_empPhoto+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + g_MainSearchValue.g_korNm + ' (' + g_MainSearchValue.g_empno + ')" title="' + g_MainSearchValue.g_korNm + ' (' + g_MainSearchValue.g_empno + ')">');
        	}
       		 else {
        		$('#empPhoto').html("");
       		 }
        } /*else {
            gf_NoFoundDataOnGridMsg('dataListPubusr001');
            fn_InitInputFormPubusr001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormPubusr001").text(data.data.records.length);
        cf_SetEventListenerPubusr001();*/
};

var fn_CallbackSearchPubusr001 = function(strSvcID, targetID, data) {
    //dhxGridPubusr001.clearAll();
//    dhxGridPubusr001.destructor();
console.log(data);
//    if(cf_SetComponentsPubusr001()){ 
//        fn_DhxDataProcessorPubusr001(); 
        if(!gf_IsNull(data.data.records)){
			console.log(data);
            gf_NoFoundDataOnGridMsgRemove('dataListPubusr001');
            dhxGridPubusr001.parse(data.data.records, 'js');
 
            if(save_Row_Num_Pubusr001 == 0 && save_All_Sta_Pubusr001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPubusr001.selectRow(0); 
            } else if(save_Row_Sta_Pubusr001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPubusr001.selectRow(0);
            } else if(save_All_Sta_Pubusr001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPubusr001.selectRow(save_Row_Num_Pubusr001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPubusr001.selectRow(save_Row_Num_Pubusr001);   //개발자 수정 필요  
                //var findCell = dhxGridPubusr001.findCell(save_Row_Values_Pubusr001, gf_GetDhxGridColumId(dhxGridPubusr001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPubusr001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPubusr001.selectRow(0);
                //} 
            } 
 
            fn_FindPubusr001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListPubusr001');
            fn_InitInputFormPubusr001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormPubusr001").text(data.data.records.length);
        cf_SetEventListenerPubusr001();
//    } 
};
var fn_DhxDataProcessorPubusr001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubusr001 = new dataProcessor(gv_ContextPath+'/pubusr001/savePubusr001'); //lock feed url
    dhxDataProcessorPubusr001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubusr001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubusr001.init(dhxGridPubusr001); //link dataprocessor to the grid
    dhxDataProcessorPubusr001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubusr001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubusr001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPubusr001();
                    $("#checkAllPubusr001").prop('checked', false); //상단 체크박스 해제
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
var fn_FindPubusr001 = function() {
    var rId = dhxGridPubusr001.getSelectedRowId();
    var status = dhxDataProcessorPubusr001.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormPubusr001", "empno", gf_DhxGetValue(dhxGridPubusr001, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "bplcCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'bplcCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "korNm", gf_DhxGetValue(dhxGridPubusr001, rId, 'korNm',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "engNm", gf_DhxGetValue(dhxGridPubusr001, rId, 'engNm',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "chcrtNm", gf_DhxGetValue(dhxGridPubusr001, rId, 'chcrtNm',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "emplSe", gf_DhxGetValue(dhxGridPubusr001, rId, 'emplSe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "ecnySeCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'ecnySeCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "deptCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'deptCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "hffsSe", gf_DhxGetValue(dhxGridPubusr001, rId, 'hffsSe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "ecnyDe", gf_DhxGetValue(dhxGridPubusr001, rId, 'ecnyDe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "ihidnum", gf_DhxGetValue(dhxGridPubusr001, rId, 'ihidnum',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "sexdstnSe", gf_DhxGetValue(dhxGridPubusr001, rId, 'sexdstnSe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "natvfrgnSeCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'natvfrgnSeCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "nltyCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'nltyCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "srclsCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'srclsCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "clsfCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'clsfCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "ofcpsCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'ofcpsCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "jssfcCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'jssfcCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "dtyCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'dtyCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "rspofcCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'rspofcCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "jblnCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'jblnCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "zip", gf_DhxGetValue(dhxGridPubusr001, rId, 'zip',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "ownhomAdres", gf_DhxGetValue(dhxGridPubusr001, rId, 'ownhomAdres',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "ownhomDetailAdres", gf_DhxGetValue(dhxGridPubusr001, rId, 'ownhomDetailAdres',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "ownhomEngAdres", gf_DhxGetValue(dhxGridPubusr001, rId, 'ownhomEngAdres',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "ownhomTelno", gf_DhxGetValue(dhxGridPubusr001, rId, 'ownhomTelno',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "lxtnTelno", gf_DhxGetValue(dhxGridPubusr001, rId, 'lxtnTelno',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "mbtlnum", gf_DhxGetValue(dhxGridPubusr001, rId, 'mbtlnum',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "emgncTelno", gf_DhxGetValue(dhxGridPubusr001, rId, 'emgncTelno',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "email", gf_DhxGetValue(dhxGridPubusr001, rId, 'email',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "indvdlEmail", gf_DhxGetValue(dhxGridPubusr001, rId, 'indvdlEmail',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "brthdy", gf_DhxGetValue(dhxGridPubusr001, rId, 'brthdy',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "slrcldAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'slrcldAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "mrrgAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'mrrgAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "retireDe", gf_DhxGetValue(dhxGridPubusr001, rId, 'retireDe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "retireSe", gf_DhxGetValue(dhxGridPubusr001, rId, 'retireSe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "layoffSeCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'layoffSeCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "photoAtchmnflNo", gf_DhxGetValue(dhxGridPubusr001, rId, 'photoAtchmnflNo',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "signAtchmnflNo", gf_DhxGetValue(dhxGridPubusr001, rId, 'signAtchmnflNo',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "cashierAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'cashierAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "hdadptAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'hdadptAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "hdadptDeptCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'hdadptDeptCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "dispDeptCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'dispDeptCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "dprlrAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'dprlrAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "lbunSbscrbAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'lbunSbscrbAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "mutaidSbscrbAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'mutaidSbscrbAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "dispWorkAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'dispWorkAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "flexbizAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'flexbizAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "babyShrtenWorkAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'babyShrtenWorkAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "salpeakAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'salpeakAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "salaryAprpCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'salaryAprpCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "ansalsysAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'ansalsysAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "apntcSdt", gf_DhxGetValue(dhxGridPubusr001, rId, 'apntcSdt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "apntcEdt", gf_DhxGetValue(dhxGridPubusr001, rId, 'apntcEdt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "incmtaxrtCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'incmtaxrtCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "salaryPymntAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'salaryPymntAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "retireAnntyKindCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'retireAnntyKindCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "nxttrmPromtDe", gf_DhxGetValue(dhxGridPubusr001, rId, 'nxttrmPromtDe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "retireAnntySbscrbDe", gf_DhxGetValue(dhxGridPubusr001, rId, 'retireAnntySbscrbDe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "retireAnntyDpstnm", gf_DhxGetValue(dhxGridPubusr001, rId, 'retireAnntyDpstnm',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "retireAnntyBankCode", gf_DhxGetValue(dhxGridPubusr001, rId, 'retireAnntyBankCode',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "retireAnntyAcnutno", gf_DhxGetValue(dhxGridPubusr001, rId, 'retireAnntyAcnutno',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "layoffAltHnfAt", gf_DhxGetValue(dhxGridPubusr001, rId, 'layoffAltHnfAt',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "nonTmlmtCntrctChangeDe", gf_DhxGetValue(dhxGridPubusr001, rId, 'nonTmlmtCntrctChangeDe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "curClsfEmplmnday", gf_DhxGetValue(dhxGridPubusr001, rId, 'curClsfEmplmnday',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "seniorSe", gf_DhxGetValue(dhxGridPubusr001, rId, 'seniorSe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "retireAnntyDcSbscrbDe", gf_DhxGetValue(dhxGridPubusr001, rId, 'retireAnntyDcSbscrbDe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "lastPromtDe", gf_DhxGetValue(dhxGridPubusr001, rId, 'lastPromtDe',  'grid'), '');
    gf_FormSetValue("saveFormPubusr001", "nonTmlmtCnttkChangeDe", gf_DhxGetValue(dhxGridPubusr001, rId, 'nonTmlmtCnttkChangeDe',  'grid'), '');

    if(status == 'inserted') {
        $('#saveFormPubusr001 input[name="empno"]').prop('disabled', false);
    } else {
        $('#saveFormPubusr001 input[name="empno"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormPubusr001 = function() {
    $('#saveFormPubusr001 input[name="empno"]').prop('disabled', false);
    $('#saveFormPubusr001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormPubusr001 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddPubusr001 = function() {
    dhxGridPubusr001.clearSelection();
    fn_InitInputFormPubusr001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //empno
    initValueArr.push(''); //bplcCode
    initValueArr.push(''); //korNm
    initValueArr.push(''); //engNm
    initValueArr.push(''); //chcrtNm
    initValueArr.push(''); //emplSe
    initValueArr.push(''); //ecnySeCode
    initValueArr.push(''); //deptCode
    initValueArr.push(''); //hffsSe
    initValueArr.push(''); //ecnyDe
    initValueArr.push(''); //ihidnum
    initValueArr.push(''); //sexdstnSe
    initValueArr.push(''); //natvfrgnSeCode
    initValueArr.push(''); //nltyCode
    initValueArr.push(''); //srclsCode
    initValueArr.push(''); //clsfCode
    initValueArr.push(''); //ofcpsCode
    initValueArr.push(''); //jssfcCode
    initValueArr.push(''); //dtyCode
    initValueArr.push(''); //rspofcCode
    initValueArr.push(''); //jblnCode
    initValueArr.push(''); //zip
    initValueArr.push(''); //ownhomAdres
    initValueArr.push(''); //ownhomDetailAdres
    initValueArr.push(''); //ownhomEngAdres
    initValueArr.push(''); //ownhomTelno
    initValueArr.push(''); //lxtnTelno
    initValueArr.push(''); //mbtlnum
    initValueArr.push(''); //emgncTelno
    initValueArr.push(''); //email
    initValueArr.push(''); //indvdlEmail
    initValueArr.push(''); //brthdy
    initValueArr.push(''); //slrcldAt
    initValueArr.push(''); //mrrgAt
    initValueArr.push(''); //retireDe
    initValueArr.push(''); //retireSe
    initValueArr.push(''); //layoffSeCode
    initValueArr.push(''); //photoAtchmnflNo
    initValueArr.push(''); //signAtchmnflNo
    initValueArr.push(''); //cashierAt
    initValueArr.push(''); //hdadptAt
    initValueArr.push(''); //hdadptDeptCode
    initValueArr.push(''); //dispDeptCode
    initValueArr.push(''); //dprlrAt
    initValueArr.push(''); //lbunSbscrbAt
    initValueArr.push(''); //mutaidSbscrbAt
    initValueArr.push(''); //dispWorkAt
    initValueArr.push(''); //flexbizAt
    initValueArr.push(''); //babyShrtenWorkAt
    initValueArr.push(''); //salpeakAt
    initValueArr.push(''); //salaryAprpCode
    initValueArr.push(''); //ansalsysAt
    initValueArr.push(''); //apntcSdt
    initValueArr.push(''); //apntcEdt
    initValueArr.push(''); //incmtaxrtCode
    initValueArr.push(''); //salaryPymntAt
    initValueArr.push(''); //retireAnntyKindCode
    initValueArr.push(''); //nxttrmPromtDe
    initValueArr.push(''); //retireAnntySbscrbDe
    initValueArr.push(''); //retireAnntyDpstnm
    initValueArr.push(''); //retireAnntyBankCode
    initValueArr.push(''); //retireAnntyAcnutno
    initValueArr.push(''); //layoffAltHnfAt
    initValueArr.push(''); //nonTmlmtCntrctChangeDe
    initValueArr.push(''); //curClsfEmplmnday
    initValueArr.push(''); //seniorSe
    initValueArr.push(''); //retireAnntyDcSbscrbDe
    initValueArr.push(''); //lastPromtDe
    initValueArr.push(''); //nonTmlmtCnttkChangeDe
    dhxGridPubusr001.addRow(dhxGridPubusr001.uid(), initValueArr, 0);
    dhxGridPubusr001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPubusr001');
    $('#btnPopEmpSearchPubusr001').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pubusr001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubusr001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubusr001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubusr001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubusr001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubusr001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubusr001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubusr001', 'sortColumId', gf_GetDhxGridColum(dhxGridPubusr001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubusr001.setSortImgState(false); 
            gf_FormSetValue('searchFormPubusr001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubusr001', 'sortColumId', '', 'text'); 
            dhxGridPubusr001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPubusr001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubusr001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubusr001', 'sortColumId', gf_GetDhxGridColum(dhxGridPubusr001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePubusr001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pubusr001 = 0; 
    save_Edt_Cnt_Pubusr001 = 0; 
    save_Del_Cnt_Pubusr001 = 0; 
    dhxGridPubusr001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPubusr001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPubusr001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pubusr001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pubusr001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pubusr001 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        if(fn_GridValidation(dhxGridPubusr001, dhxDataProcessorPubusr001)) {
            var confirmMsg  = ""; 
            var confirmMsg1 = ""; 
            var confirmMsg2 = ""; 
            var confirmMsg3 = ""; 
            save_All_Sta_Pubusr001 = 0; 
            if(save_Add_Cnt_Pubusr001 > 0){
                confirmMsg1 = "신규 " + save_Add_Cnt_Pubusr001 + "건";
                save_All_Sta_Pubusr001 = 1; 
            } 
            if(save_Edt_Cnt_Pubusr001 > 0){ 
                confirmMsg2 = "수정 " + save_Edt_Cnt_Pubusr001 + "건"; 
            } 
            if(save_Del_Cnt_Pubusr001 > 0){ 
                confirmMsg3 = "삭제 " + save_Del_Cnt_Pubusr001 + "건"; 
                save_All_Sta_Pubusr001 = 1; 
            } 
            if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
                confirmMsg1 = confirmMsg1 + ", ";
            }
            if(confirmMsg2 != "" && confirmMsg3 != ""){
                confirmMsg2 = confirmMsg2 + ", ";
            }
            confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
            
            //if(confirmModalPubusr001(gv_QueSave)){  //여기는 안옴 
            if(confirmModalPubusr001(confirmMsg)){  //여기는 안옴 
            } else { 
                return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
            } 
        } 
    }
}
var confirmModalPubusr001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubusr001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubusr001_Send = function() {
    //if(fn_GridValidation(dhxGridPubusr001, dhxDataProcessorPubusr001)) {
        dhxDataProcessorPubusr001.sendData();
    //}
}
/**
 * 삭제
 */
var fn_RemovePubusr001 = function() {
    var rowId = dhxGridPubusr001.getSelectedRowId();
    var state = dhxDataProcessorPubusr001.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridPubusr001.getRowIndex(rowId);
        dhxGridPubusr001.deleteRow(rowId);
        dhxGridPubusr001.selectRow(rowNum);
        fn_FindPubusr001();
    }
    else dhxDataProcessorPubusr001.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPubusr001 = function () {
    var titPubusr001 = '개인정보조회'; /* gf_LocaleTrans('default', 'titPubusr001') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormPubusr001', 'empno', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '사업장구분코드 기본 자리수는 4자리' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '한글성명' /* gf_LocaleTrans('default', 'titKorNm') */,
        '영문명' /* gf_LocaleTrans('default', 'titEngNm') */,
        '한자명을 기록하는 항목' /* gf_LocaleTrans('default', 'titChcrtNm') */,
        '직원구분(공통코드:C068) 정규직/무기계약직/계약직/인턴/파견' /* gf_LocaleTrans('default', 'titEmplSe') */,
        '입사구분 코드(C014)' /* gf_LocaleTrans('default', 'titEcnySeCode') */,
        '부서코드' /* gf_LocaleTrans('default', 'titDeptCode') */,
        '직원의 재직생태(공통코드 C278) 재직/퇴직' /* gf_LocaleTrans('default', 'titHffsSe') */,
        '직원의 최초 입사일자를 기록하는 항목' /* gf_LocaleTrans('default', 'titEcnyDe') */,
        '주민번호 (암호화 적용될경우 길이 더 늘어날수 있음)' /* gf_LocaleTrans('default', 'titIhidnum') */,
        '성별구분 (공통코드:C286)' /* gf_LocaleTrans('default', 'titSexdstnSe') */,
        '내외국인 1: 내국인, 9 외국인(C011)' /* gf_LocaleTrans('default', 'titNatvfrgnSeCode') */,
        '국적코드(공통코드C122)' /* gf_LocaleTrans('default', 'titNltyCode') */,
        '호봉코드(숫자이면서 공통코드 C285)' /* gf_LocaleTrans('default', 'titSrclsCode') */,
        '직급코드(MHS_CLSF_CODE)' /* gf_LocaleTrans('default', 'titClsfCode') */,
        '직위코드' /* gf_LocaleTrans('default', 'titOfcpsCode') */,
        '직종코드 (MHS_JSSFC)' /* gf_LocaleTrans('default', 'titJssfcCode') */,
        '직무코드' /* gf_LocaleTrans('default', 'titDtyCode') */,
        '직책코드' /* gf_LocaleTrans('default', 'titRspofcCode') */,
        '직렬코드(C090)' /* gf_LocaleTrans('default', 'titJblnCode') */,
        '사원 주소지의 우편번호' /* gf_LocaleTrans('default', 'titZip') */,
        '직원이 현재 거주하고 있는 주소지' /* gf_LocaleTrans('default', 'titOwnhomAdres') */,
        '직원이 현재 거주하고 있는 주소지의 상세' /* gf_LocaleTrans('default', 'titOwnhomDetailAdres') */,
        '현주소영문' /* gf_LocaleTrans('default', 'titOwnhomEngAdres') */,
        '집전화번호를 기록하는 항목.' /* gf_LocaleTrans('default', 'titOwnhomTelno') */,
        '내선번호' /* gf_LocaleTrans('default', 'titLxtnTelno') */,
        '휴대폰번호' /* gf_LocaleTrans('default', 'titMbtlnum') */,
        '비상전화번호' /* gf_LocaleTrans('default', 'titEmgncTelno') */,
        'e-메일주소' /* gf_LocaleTrans('default', 'titEmail') */,
        '개인이메일주소' /* gf_LocaleTrans('default', 'titIndvdlEmail') */,
        '생년월일 (YYYYMMDD)' /* gf_LocaleTrans('default', 'titBrthdy') */,
        '생일의 음양구 항목 C013' /* gf_LocaleTrans('default', 'titSlrcldAt') */,
        '결혼여부' /* gf_LocaleTrans('default', 'titMrrgAt') */,
        '퇴직일자' /* gf_LocaleTrans('default', 'titRetireDe') */,
        '직원의 퇴직 사유(C154)' /* gf_LocaleTrans('default', 'titRetireSe') */,
        '휴직구분코드(C190)' /* gf_LocaleTrans('default', 'titLayoffSeCode') */,
        '사진첨부파일번호' /* gf_LocaleTrans('default', 'titPhotoAtchmnflNo') */,
        '서명첨부파일번호' /* gf_LocaleTrans('default', 'titSignAtchmnflNo') */,
        '출납담당 여부(출납수당과 연관됨)' /* gf_LocaleTrans('default', 'titCashierAt') */,
        '겸임여부' /* gf_LocaleTrans('default', 'titHdadptAt') */,
        '직원의 겸임 부서' /* gf_LocaleTrans('default', 'titHdadptDeptCode') */,
        '파견부서코드' /* gf_LocaleTrans('default', 'titDispDeptCode') */,
        '부서장 여부' /* gf_LocaleTrans('default', 'titDprlrAt') */,
        '노조가입여부' /* gf_LocaleTrans('default', 'titLbunSbscrbAt') */,
        '상조가입여부' /* gf_LocaleTrans('default', 'titMutaidSbscrbAt') */,
        '파견근무여부' /* gf_LocaleTrans('default', 'titDispWorkAt') */,
        '유연근무제여부' /* gf_LocaleTrans('default', 'titFlexbizAt') */,
        '육아기간 단축근무 여부' /* gf_LocaleTrans('default', 'titBabyShrtenWorkAt') */,
        '임금피크제 여부' /* gf_LocaleTrans('default', 'titSalpeakAt') */,
        '급여 책정 코드 (C067)' /* gf_LocaleTrans('default', 'titSalaryAprpCode') */,
        '연봉제여부' /* gf_LocaleTrans('default', 'titAnsalsysAt') */,
        '수습시작일자' /* gf_LocaleTrans('default', 'titApntcSdt') */,
        '수습종료일자' /* gf_LocaleTrans('default', 'titApntcEdt') */,
        '소득세율코드(80, 100,120)' /* gf_LocaleTrans('default', 'titIncmtaxrtCode') */,
        '급여지급여부' /* gf_LocaleTrans('default', 'titSalaryPymntAt') */,
        '퇴직연금종류코드' /* gf_LocaleTrans('default', 'titRetireAnntyKindCode') */,
        '차기 승급 일자' /* gf_LocaleTrans('default', 'titNxttrmPromtDe') */,
        '퇴직연금 가입일자' /* gf_LocaleTrans('default', 'titRetireAnntySbscrbDe') */,
        '퇴직 연금 예금명' /* gf_LocaleTrans('default', 'titRetireAnntyDpstnm') */,
        '퇴직 연금 은행 코드(C010)' /* gf_LocaleTrans('default', 'titRetireAnntyBankCode') */,
        '퇴직 연금 계좌번호' /* gf_LocaleTrans('default', 'titRetireAnntyAcnutno') */,
        '휴직 대체 인력 여부' /* gf_LocaleTrans('default', 'titLayoffAltHnfAt') */,
        '무기계약직 전환 일자 : 계약직인 경우' /* gf_LocaleTrans('default', 'titNonTmlmtCntrctChangeDe') */,
        '현직급임용일' /* gf_LocaleTrans('default', 'titCurClsfEmplmnday') */,
        '선임구분(C223)' /* gf_LocaleTrans('default', 'titSeniorSe') */,
        '퇴직 연금 DC 가입 일자' /* gf_LocaleTrans('default', 'titRetireAnntyDcSbscrbDe') */,
        '최종승급일자' /* gf_LocaleTrans('default', 'titLastPromtDe') */,
        'NON 기한 계약 변경 일자' /* gf_LocaleTrans('default', 'titNonTmlmtCnttkChangeDe') */
    ]];
    var dataId = [[ 'empno', 'bplcCode', 'korNm', 'engNm', 'chcrtNm', 'emplSe', 'ecnySeCode', 'deptCode', 'hffsSe', 'ecnyDe', 'ihidnum', 'sexdstnSe', 'natvfrgnSeCode', 'nltyCode', 'srclsCode', 'clsfCode', 'ofcpsCode', 'jssfcCode', 'dtyCode', 'rspofcCode', 'jblnCode', 'zip', 'ownhomAdres', 'ownhomDetailAdres', 'ownhomEngAdres', 'ownhomTelno', 'lxtnTelno', 'mbtlnum', 'emgncTelno', 'email', 'indvdlEmail', 'brthdy', 'slrcldAt', 'mrrgAt', 'retireDe', 'retireSe', 'layoffSeCode', 'photoAtchmnflNo', 'signAtchmnflNo', 'cashierAt', 'hdadptAt', 'hdadptDeptCode', 'dispDeptCode', 'dprlrAt', 'lbunSbscrbAt', 'mutaidSbscrbAt', 'dispWorkAt', 'flexbizAt', 'babyShrtenWorkAt', 'salpeakAt', 'salaryAprpCode', 'ansalsysAt', 'apntcSdt', 'apntcEdt', 'incmtaxrtCode', 'salaryPymntAt', 'retireAnntyKindCode', 'nxttrmPromtDe', 'retireAnntySbscrbDe', 'retireAnntyDpstnm', 'retireAnntyBankCode', 'retireAnntyAcnutno', 'layoffAltHnfAt', 'nonTmlmtCntrctChangeDe', 'curClsfEmplmnday', 'seniorSe', 'retireAnntyDcSbscrbDe', 'lastPromtDe', 'nonTmlmtCnttkChangeDe' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titPubusr001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubusr001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubusr001/excelPubusr001', jsonParameter);
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
    $('#saveFormPubusr001 #empnoSaveFormPubusr001').parent().append(
    '<div class="error" id="empnoSaveFormPubusr001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubusr001 = function(empno){
    if(!gf_IsNull(empno)) {
        var jsonParameter = {
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('pubusr001/findPubusr001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno)) {
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
    var state = dhxDataProcessorPubusr001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormPubusr001').validate().form()){
                if(state == 'inserted') {
                    var empno = gf_FormGetValue('saveFormPubusr001', 'empno', 'text');
                    if(fn_CheckDupPubusr001(empno)) return true;
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
    var checkEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Pubusr001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Pubusr001 == 'deleted') {
        save_Row_Num_Pubusr001 = 0;
        save_Row_Ids_Pubusr001 = "";
        save_Row_Values_Pubusr001 = "";
    } else if(save_Row_Sta_Pubusr001 == 'inserted') {
        save_Row_Num_Pubusr001 = rowNum;
        save_Row_Ids_Pubusr001 = ""; 
        save_Row_Values_Pubusr001 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubusr001 = rowNum;
        save_Row_Ids_Pubusr001 = rowIds; 
        save_Row_Values_Pubusr001 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid')  
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
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupPubusr001( checkEmpno )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
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
        dhxGridPubusr001.selectRowById(validFalseFistRowId);
        fn_FindPubusr001();
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
