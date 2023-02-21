/**
 * 프로그램 : 프로젝트관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.15
 * 사용테이블 : PJT_PROJECT
 **/

var dhxGridPjtProject;
var dhxGridPjtProjectListInfo;
var projectSn = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titPjtProject = gf_LocaleTrans('default','titPjtProject');

var myTabbar;

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("PJTPMG003");
 
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();
    
    var dataSource = gf_NoAsyncTransaction('stmcmm001/findUser', '', 'GET');
    var data = dataSource.data;
    gf_FormSetValue('saveFormPjtProject', 'userNm', data.userNm, 'text');
    gf_FormSetValue('saveFormPjtProject', 'empno', data.empno, 'text');
    
    dhxInputFormProjectSeCodeCombo = gf_MakeDhxCombo(
    	    'divInputFormComboProjectSeCodeBox',
    	    'saveFormPjtProject',
    	    80,
    	    'combo/searchStmCode?codekindCode=C200',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    
    dhxInputFormProjectAreaCodeCombo = gf_MakeDhxCombo(
    	    'divInputFormComboProjectAreaCodeBox',
    	    'saveFormPjtProject',
    	    150,
    	    'combo/searchStmCode?codekindCode=C079',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    
    dhxInputFormCntrctTyCodeCombo = gf_MakeDhxCombo(
    	    'divInputFormComboCntrctTyCodeBox',
    	    'saveFormPjtProject',
    	    120,
    	    'combo/searchStmCode?codekindCode=C203',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    
    dhxInputFormComptAtCodeCombo = gf_MakeDhxCombo(
    	    'divInputFormComboComptAtCodeBox',
    	    'saveFormPjtProject',
    	    80,
    	    'combo/searchStmCode?codekindCode=C201',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    
    dhxInputFormProjectSeCodeCombo.attachEvent("onChange", function(value, text){
    	
    	if(value == '200') {
    		$("#divInputFormComboCntrctTyCodeBox").show();
    		$(".cont_type").show();
    	}
    	else {
    		$("#divInputFormComboCntrctTyCodeBox").hide();
    		$(".cont_type").hide();
    		$("#entrpsId").val("");
    		$("#entrpsPassword").val("");
    	}
    });
    
    dhxInputFormCntrctTyCodeCombo.attachEvent("onChange", function(value, text){
    	
    	if(value !== '400') {
    		$(".cont_type").show();
    	}
    	else {
    		$(".cont_type").hide();
    		$("#entrpsId").val("");
    		$("#entrpsPassword").val("");
    	}
    });
    
    $("#divInputFormComboCntrctTyCodeBox").hide();
    $(".cont_type").hide();

};


var cf_SetComponents = function (){

    myTabbar = new dhtmlXTabBar({
        parent:         "tabbarObj",
        close_button:   false,
        arrows_mode :   "auto", 
        tabs: [
    	    {id:"a1",  text: '기본사항' }, 
		    {id:"a2",  text: '인력'},   
            {id:"a3",  text: '예산'},		         
		    {id:"a4",  text: '협력계약'},		         
		    {id:"a5",  text: '이슈위험'},	        
		    {id:"a6",  text: '산출물'},		          
		    ]
    });
   
    myTabbar.tabs("a1").attachObject("a1");
    myTabbar.tabs("a2").attachObject("a2");
    myTabbar.tabs("a3").attachObject("a3");
    myTabbar.tabs("a4").attachObject("a4");
    myTabbar.tabs("a5").attachObject("a5");
    myTabbar.tabs("a6").attachObject("a6");

    
   /* myTabbar.attachEvent("onSelect", function(id, lastId){
    	//alert(empno);
        if(id=="a2") myTabbar.tabs("a2").attachURL("");
    	return true;
    });*/
    myTabbar.tabs("a1").setActive();
};

var cf_SetEventListener = function (){

    
};

var cf_SetBinding = function (){
    
};

var cf_InitForm = function (){};

var cf_InitInputForm = function (){

    
};

var fn_SearchGridList = function (){

};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
   
};

var fn_SavePjtProject = function (rId, cInd) {
   
};

var fn_CheckPjtProject = function (col){
   
};

var fn_RemoveOne = function(){
    
};

var fn_RemoveAll = function(){
    
};

var fn_RemovePjtProject = function ( projectSns ){
    
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormPjtProject', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormPjtProject', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormPjtProject', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titProjectSn'),
                    gf_LocaleTrans('default', 'titProjectNm'),
                    gf_LocaleTrans('default', 'titProjectCn'),
                    gf_LocaleTrans('default', 'titProjectScope'),
                    gf_LocaleTrans('default', 'titProjectEnvrn'),
                    gf_LocaleTrans('default', 'titProjectArea'),
                    gf_LocaleTrans('default', 'titProjectPmEmpno'),
                    gf_LocaleTrans('default', 'titProjectPmNm'),
                    gf_LocaleTrans('default', 'titBcncCode'),
                    gf_LocaleTrans('default', 'titBcncChargerCode'),
                    gf_LocaleTrans('default', 'titProjectBeginDe'),
                    gf_LocaleTrans('default', 'titProjectEndDe'),
                    gf_LocaleTrans('default', 'titRealBeginDe'),
                    gf_LocaleTrans('default', 'titRealEndDe'),
                    gf_LocaleTrans('default', 'titCntrctAmt'),
                    gf_LocaleTrans('default', 'titVatInclsAt'),
                    gf_LocaleTrans('default', 'titGrtsMntnceMcnt'),
                    gf_LocaleTrans('default', 'titGrtsMntnceCn'),
                    gf_LocaleTrans('default', 'titProjectSe'),
                    gf_LocaleTrans('default', 'titComptAt'),
                    gf_LocaleTrans('default', 'titComptDe'),
                    gf_LocaleTrans('default', 'titEntrpsId'),
                    gf_LocaleTrans('default', 'titEntrpsPassword'),
                    gf_LocaleTrans('default', 'titCntrctTy'),
                    gf_LocaleTrans('default', 'titRegistEmpno'),
    ]];
    var dataId = [[ 'projectSn', 'projectNm', 'projectCn', 'projectScope', 'projectEnvrn', 'projectArea', 'projectPmEmpno', 'projectPmNm', 'bcncCode', 'bcncChargerCode', 'projectBeginDe', 'projectEndDe', 'realBeginDe', 'realEndDe', 'cntrctAmt', 'vatInclsAt', 'grtsMntnceMcnt', 'grtsMntnceCn', 'projectSe', 'comptAt', 'comptDe', 'entrpsId', 'entrpsPassword', 'cntrctTy', 'registEmpno' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titPjtProject ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPjtProject;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('pjtpmg003/excelPjtProject', jsonParameter);
};

var fn_SearchInputPjtProject = function (){

   
};
