/**
 * 프로그램 : 인사기본 화면 중 Tab5(포상) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.04.23
 * 사용테이블 : MHS_RWARD
 **/

var tab5_empno = '';

var titMhsRward = gf_LocaleTrans('default','titMhsRward');

var g_Tab5SearchValue = new Object();  // 정보 최초 조회 값

var dhxGridMhsEmpRward;  //GRID
var dhxDataProcessorMhsEmpRward;  //DataProcessor

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

    var dhxGridMhsEmpRwardListInfo = [];
    dhxGridMhsEmpRwardListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'cntr', false, 'num', '','')); // 번호  //(header, width, align, sort, type, hidden, id, attach, valid)
    dhxGridMhsEmpRwardListInfo.push(gf_MakeDhxGridHeader('포상코드', '100', 'center', 'str', 'coro', false, 'rwdsCode', '', '')); /* gf_LocaleTrans('default', 'titRwdsCode') */
    dhxGridMhsEmpRwardListInfo.push(gf_MakeDhxGridHeader('포상명', '*', 'left', 'str', 'ro', false, 'rwardNm', '', '')); /* gf_LocaleTrans('default', 'titRwardNm') */
    //dhxGridMhsEmpRwardListInfo.push(gf_MakeDhxGridHeader('상벌구분', '100', 'center', 'str', 'coro', false, 'rwdsSeCode', '', '')); /* gf_LocaleTrans('default', 'titRwardNm') */
    dhxGridMhsEmpRwardListInfo.push(gf_MakeDhxGridHeader('포상일자', '100', 'center', 'date', 'ro', false, 'rwardDe', '', '')); /* gf_LocaleTrans('default', 'titRwardDe') */
    dhxGridMhsEmpRwardListInfo.push(gf_MakeDhxGridHeader('포상기관명', '100', 'center', 'str', 'ro', false, 'rwardInsttNm', '', '')); /* gf_LocaleTrans('default', 'titRwardInsttNm') */
    dhxGridMhsEmpRwardListInfo.push(gf_MakeDhxGridHeader('포상금액', '100', 'right', 'int', 'ro', false, 'rwardAmt', '', '')); /* gf_LocaleTrans('default', 'titRwardAmt') */
    dhxGridMhsEmpRwardListInfo.push(gf_MakeDhxGridHeader('포상내역', '100', 'left', 'str', 'ro', false, 'rwardDtls', '', '')); /* gf_LocaleTrans('default', 'titRwardDtls') */
    dhxGridMhsEmpRwardListInfo.push(gf_MakeDhxGridHeader("첨부파일",'60','center','str','button1',false,'atchmnflNoEdit',''));
    dhxGridMhsEmpRwardListInfo.push(gf_MakeDhxGridHeader('', '20', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    
    dhxGridMhsEmpRward = gf_MakeDhxGrid('MhsEmpRwardDataList', dhxGridMhsEmpRwardListInfo, true, false, false, false);  //(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr)
    
    dhxGridMhsEmpRward.enableMultiline(true);
    dhxGridMhsEmpRward.enableAutoWidth(true);
    dhxGridMhsEmpRward.setDateFormat("%Y-%m-%d");
    
    var comboRwdsCode = dhxGridMhsEmpRward.getCombo(1);  //상벌 코드
	gf_MakeComboGrid(comboRwdsCode, 'sel', 'mhshrm012/searchMhshrm012CodeCombo', 'rwdsCode', 'rwdsCodeNm', '');
	
	//상벌구분
	//var jsonParameter1 = {codekindCode : "C023",exceptCode :"",sortOrder :"asc" };
    //var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, ''); //기존 코드조회 쿼리 사용 
    //gf_ComboDataSet(dhxGridMhsEmpRward, dhxGridMhsEmpRward.getColIndexById("rwdsSeCode"), dataSource1.data, "sel"); /* 그리드콤보*/
	
    //dhxGridMhsEmpRward.setColSorting("na,na,na,na,na,na,na,na,na,na,na,na,na,na,na");
    //dhxGridMhsEmpRward.setNumberFormat("0,000", 2, ".", ",");  //(string mask,number cInd,string p_sep,string d_sep)
    //dhxGridMhsEmpRward.enableAutoWidth(true);
    dhxGridMhsEmpRward.enableEditEvents(true,false,true);  //(boolean click,boolean dblclick,boolean f2Key)
    
    $("#saveFormEmp_Tab5_Rward").validate({
        errorElement: 'div'
    });
};



var eventIdsMhsEmpRward = [];
var cf_SetEventListener = function (){

	var eventId;
	eventIdsMhsEmpRward = gf_GridDetachEvent(dhxGridMhsEmpRward, eventIdsMhsEmpRward);
    
    eventId = dhxGridMhsEmpRward.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
		//if(cInd == 2 || cInd == 4) {
		//	return false;
		//}
        //else return true;
    	return false;
    }); 
    eventIdsMhsEmpRward.push(eventId);
    
    eventId = dhxGridMhsEmpRward.attachEvent('onRowSelect', function(rid, cind) {
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpRward, 'button1')) {
    		//fn_FileUploadPopUpPjtOutputs( rid );
    	}
    });
    eventIdsMhsEmpRward.push(eventId);
    
    // other event

    //초기화
    $('#btnInit_Tab4').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab5();
};

var cf_InitForm = function (){
	//
};

var cf_InitInputForm = function (){

    tab5_empno = gf_FormGetValue('saveFormEmp_Tab5_Rward', 'empno', 'text');

    /*그리드라서 재조회 함*/
    fn_SearchMhshrb001Tab5();
};

var fn_SearchMhshrb001Tab5 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab5_Rward', 'empno', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab5_empno = empno;
	g_Tab5SearchValue.empno = empno;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab5_Rward', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpTab5Rward', jsonParameter, 'fn_CallbackSearchMhshrb001Tab5', false, 'GET');
};


var fn_CallbackSearchMhshrb001Tab5 = function (strSvcID, targetID, data){
	dhxGridMhsEmpRward.clearAll();
	
	if(!gf_IsNull(data.data.records)){
		dhxGridMhsEmpRward.parse(data.data.records, 'js');
    	
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpRwardDataList');
    	
    	dhxGridMhsEmpRward.selectCell(0,2);
    } else {
    	gf_NoFoundDataOnGridMsg('MhsEmpRwardDataList'); 
    }
	$('#spanMhsEmpRwardCnt').text(gf_NumberWithCommas(data.data.records.length));
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



var fn_ExcelMhshrb001Rward = function () {
    var titMhshrb999 = '인사기본-포상'; /* gf_LocaleTrans('default', 'titMhshrb999') */
    var jsonParameter = {
        empno : gf_FormGetValue('saveFormEmp_Tab5_Rward', 'empno', 'text')
    };

    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '포상순번' /* gf_LocaleTrans('default', 'titRwardSn') */,
        '상벌코드' /* gf_LocaleTrans('default', 'titRwdsCode') */,
        '포상명' /* gf_LocaleTrans('default', 'titRwardNm') */,
        '포상일자' /* gf_LocaleTrans('default', 'titRwardDe') */,
        '포상기관' /* gf_LocaleTrans('default', 'titRwardInsttNm') */,
        '포상금액' /* gf_LocaleTrans('default', 'titRwardAmt') */,
        '포상내역' /* gf_LocaleTrans('default', 'titRwardDtls') */
    ]];
    var dataId = [[ 'empno', 'rwardSn', 'rwdsCode', 'rwardNm', 'rwardDe', 'rwardInsttNm', 'rwardAmt', 'rwardDtls' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsRward ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsRward;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb001/searchMhsEmpTab5Rward', jsonParameter);
};
