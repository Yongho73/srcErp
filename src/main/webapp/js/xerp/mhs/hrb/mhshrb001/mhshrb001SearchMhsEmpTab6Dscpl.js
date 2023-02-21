/**
 * 프로그램 : 인사기본 화면 중 Tab6(징계) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.04.23
 * 사용테이블 : MHS_DSCPL
 **/

var tab6_empno = '';

var titMhsDscpl = gf_LocaleTrans('default','titMhsDscpl');

var g_Tab6SearchValue = new Object();  // 정보 최초 조회 값

var dhxGridMhsEmpDscpl;  //GRID

$(function() {
    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();
});

var cf_InitParam = function (){
	//
};


var cf_SetComponents = function (){

    var dhxGridMhsEmpDscplListInfo = [];
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'cntr', false, 'num', '','')); // 번호  //(header, width, align, sort, type, hidden, id, attach, valid)
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader('징계코드', '80', 'center', 'str', 'coro', false, 'rwdsCode', '', '')); /* gf_LocaleTrans('default', 'titRwdsCode') */
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader('징계내용', '250', 'left', 'str', 'ro', false, 'dscplDtls', '', '')); /* gf_LocaleTrans('default', 'titDscplDtls') */
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader('징계일자', '80', 'center', 'date', 'ro', false, 'dscplDe', '', '')); /* gf_LocaleTrans('default', 'titDscplDe') */
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader('징계시작일자', '90', 'center', 'date', 'ro', false, 'dscplBeginDe', '', '')); /* gf_LocaleTrans('default', 'titDscplBeginDe') */
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader('징계종료일자', '90', 'center', 'date', 'ro', false, 'dscplEndDe', '', '')); /* gf_LocaleTrans('default', 'titDscplEndDe') */
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader('승진제한\n시작일자', '90', 'center', 'date', 'ro', false, 'prmotLmttSdt', '', '')); /* gf_LocaleTrans('default', 'titPrmotLmttSdt') */
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader('승진제한\n종료일자', '90', 'center', 'date', 'ro', false, 'prmotLmttEdt', '', '')); /* gf_LocaleTrans('default', 'titPrmotLmttEdt') */
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'ro', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */    
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader('파일번호', '70', 'center', 'str', 'button1', false, 'fileNo', '', '')); /* gf_LocaleTrans('default', 'titFileNo') */
    dhxGridMhsEmpDscplListInfo.push(gf_MakeDhxGridHeader('사원별 징계의 순번', '100', 'center', 'str', 'ro', true, 'dscplSn', '', '')); /* gf_LocaleTrans('default', 'titDscplSn') */
    
    dhxGridMhsEmpDscpl = gf_MakeDhxGrid('MhsEmpDscplDataList', dhxGridMhsEmpDscplListInfo, true, false, false, false);  //(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr)
    
    dhxGridMhsEmpDscpl.enableMultiline(true);
    dhxGridMhsEmpDscpl.enableAutoWidth(true);
    dhxGridMhsEmpDscpl.setDateFormat("%Y-%m-%d");
    
    var comboDscplCode = dhxGridMhsEmpDscpl.getCombo(1);  //상벌 코드
	gf_MakeComboGrid(comboDscplCode, 'sel', 'mhshrm012/searchMhshrm012CodeCombo', 'rwdsCode', 'rwdsCodeNm', '');
	
	//상벌구분
	//var jsonParameter1 = {codekindCode : "C023",exceptCode :"",sortOrder :"asc" };
    //var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, ''); //기존 코드조회 쿼리 사용 
    //gf_ComboDataSet(dhxGridMhsEmpDscpl, dhxGridMhsEmpDscpl.getColIndexById("rwdsSeCode"), dataSource1.data, "sel"); /* 그리드콤보*/
	
    //dhxGridMhsEmpDscpl.setColSorting("na,na,na,na,na,na,na,na,na,na,na,na,na,na,na");
    //dhxGridMhsEmpDscpl.setNumberFormat("0,000", 2, ".", ",");  //(string mask,number cInd,string p_sep,string d_sep)
    //dhxGridMhsEmpDscpl.enableAutoWidth(true);
    dhxGridMhsEmpDscpl.enableEditEvents(true,false,true);  //(boolean click,boolean dblclick,boolean f2Key)
    
    $("#saveFormEmp_Tab6_Dscpl").validate({
        errorElement: 'div'
    });
};



var eventIdsMhsEmpDscpl = [];
var cf_SetEventListener = function (){

	var eventId;
	eventIdsMhsEmpDscpl = gf_GridDetachEvent(dhxGridMhsEmpDscpl, eventIdsMhsEmpDscpl);
    
    eventId = dhxGridMhsEmpDscpl.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
		//if(cInd == 2 || cInd == 4) {
		//	return false;
		//}
        //else return true;
    	return false;
    }); 
    eventIdsMhsEmpDscpl.push(eventId);
    
    eventId = dhxGridMhsEmpDscpl.attachEvent('onRowSelect', function(rid, cind) {
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpDscpl, 'button1')) {
    		//fn_FileUploadPopUpPjtOutputs( rid );
    	}
    });
    eventIdsMhsEmpDscpl.push(eventId);
    
    // other event

    //초기화
    $('#btnInit_Tab6').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab6();
};

var cf_InitForm = function (){
	//
};

var cf_InitInputForm = function (){

    tab6_empno = gf_FormGetValue('saveFormEmp_Tab6_Dscpl', 'empno', 'text');

    /*그리드라서 재조회 함*/
    fn_SearchMhshrb001Tab6();
};

var fn_SearchMhshrb001Tab6 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab6_Dscpl', 'empno', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab6_empno = empno;
	g_Tab6SearchValue.empno = empno;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab6_Dscpl', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpTab6Dscpl', jsonParameter, 'fn_CallbackSearchMhshrb001Tab6', false, 'GET');
};


var fn_CallbackSearchMhshrb001Tab6 = function (strSvcID, targetID, data){
	dhxGridMhsEmpDscpl.clearAll();
	
	if(!gf_IsNull(data.data.records)){
		dhxGridMhsEmpDscpl.parse(data.data.records, 'js');
    	
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpDscplDataList');
    	
    	dhxGridMhsEmpDscpl.selectCell(0,2);
    } else {
    	gf_NoFoundDataOnGridMsg('MhsEmpDscplDataList'); 
    }
	$('#spanMhsEmpDscplCnt').text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListener();
};


//사용자정의 그리드 타입
function eXcell_button1(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue=function(val){
    	if(!gf_IsNull(val)){
    		var row_id=this.cell.parentNode.idd;
    		this.setCValue('<span class="glyphicon glyphicon glyphicon-download" style="cursor: pointer;" onclick="parent.fn_FileUploadPopUpRward(\'' + val + '\')"></span>');
    	}
    }
}
eXcell_button1.prototype = new eXcell;// nests all other methods from the base class



var fn_ExcelMhshrb001Dscpl = function () {
    var titMhshrb999 = '인사기본-징계'; /* gf_LocaleTrans('default', 'titMhshrb999') */
    var jsonParameter = {
        empno : gf_FormGetValue('saveFormEmp_Tab6_Dscpl', 'empno', 'text')
    };

    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '징계순번' /* gf_LocaleTrans('default', 'titDscplSn') */,
        '징계코드' /* gf_LocaleTrans('default', 'titRwdsCode') */,
        '징계일자' /* gf_LocaleTrans('default', 'titDscplDe') */,
        '징계내용' /* gf_LocaleTrans('default', 'titDscplDtls') */,
        '파일번호' /* gf_LocaleTrans('default', 'titFileNo') */,
        '징계시작일자' /* gf_LocaleTrans('default', 'titDscplBeginDe') */,
        '징계종료일자' /* gf_LocaleTrans('default', 'titDscplEndDe') */,
        '승진제한시작일자' /* gf_LocaleTrans('default', 'titPrmotLmttSdt') */,
        '승진제한종료일자' /* gf_LocaleTrans('default', 'titPrmotLmttEdt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'empno', 'dscplSn', 'rwdsCode', 'dscplDe', 'dscplDtls', 'fileNo', 'dscplBeginDe', 'dscplEndDe', 'prmotLmttSdt', 'prmotLmttEdt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsDscpl ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsDscpl;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb001/searchMhsEmpTab6Dscpl', jsonParameter);
};
