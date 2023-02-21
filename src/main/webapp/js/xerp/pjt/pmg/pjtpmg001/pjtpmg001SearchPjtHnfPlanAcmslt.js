/**
 * 프로그램 : 프로젝트현황 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.14
 * 사용테이블 : PJT_PROJECT
 **/

var dhxGridPjtHnfPlanAcmslt;
var dhxGridPjtHnfPlanAcmsltListInfo;

var dhxGridPjtHnfPlanAcmsltAdd;

var projectSn = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titPjtHnf = gf_LocaleTrans('default','titPjtHnf');

$(function() {

    cf_InitParamHnfPlan();
    cf_SetComponentsHnfPlan();
    cf_SetEventListenerHnfPlan();
    cf_SetBindingHnfPlan();
    cf_InitFormHnfPlan();
});


var cf_InitParamHnfPlan = function (){
	
	 fn_SetMenuPath("PJTPMG001");
	 
	 var v_CurDate = new Date();
	 v_CurDate.setDate(v_CurDate.getDate());
	 var curDate = v_CurDate.format('YYYY-MM-DD');
	 var curYyMm = curDate.substr(0,7).replaceAll('-','.');
	    
	 $("#spanBasisDt").text("(기준월 : " + curYyMm + ")");
	 $("#spanBasisDt2").text("(기준월 : " + curYyMm + ")");
	 
};

var cf_SetComponentsHnfPlan = function (){
	
	var dhxGridPjtHnfPlanAcmsltListInfo = [];
	dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'cntr', false, 'num', '', ''));
	dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('등급', '150', 'center', 'str', 'ro', false, 'tchnlgyGradNm', ''));
	dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('M/M(계획)', '150', 'center', 'str', 'ro', false, 'manpMm', ''));
	dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('M/M(전월실적)', '150', 'center', 'str', 'ro', false, 'prevManaMm', '')); 
	dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('M/M(누적실적)', '150', 'center', 'str', 'ro', false, 'manaMm', '')); 
	dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('M/M(잔여실적)', '*', 'center', 'str', 'ro', false, 'remainMm', '')); 
	
	dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('', '80', 'center', 'str', 'ro', true, 'tchnlgyGrad', '')); 

	dhxGridPjtHnfPlanAcmslt = gf_MakeDhxGrid('dataList', dhxGridPjtHnfPlanAcmsltListInfo, true, false, false);
	
	dhxGridPjtHnfPlanAcmslt.enableAutoWidth(false);
	dhxGridPjtHnfPlanAcmslt.setColumnMinWidth(150,5);
	dhxGridPjtHnfPlanAcmslt.adjustColumnSize(0);
	
	dhxGridPjtHnfPlanAcmslt.enableEditEvents(true,false,true);
	dhxGridPjtHnfPlanAcmslt.enableMultiline(true);
	dhxGridPjtHnfPlanAcmslt.enableValidation(true);
	dhxGridPjtHnfPlanAcmslt.enableKeyboardSupport(true);
	
	
	dhxGridPjtHnfPlanAcmslt.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
	dhxGridPjtHnfPlanAcmslt.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
	
	var dhxGridPjtHnfPlanAcmsltAddListInfo = [];
	dhxGridPjtHnfPlanAcmsltAddListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '30', 'center', 'str', 'cntr', false, 'num', '', ''));
	dhxGridPjtHnfPlanAcmsltAddListInfo.push(gf_MakeDhxGridHeader('등급', '80', 'center', 'str', 'ro', false, 'tchnlgyGradNm', ''));
	dhxGridPjtHnfPlanAcmsltAddListInfo.push(gf_MakeDhxGridHeader('M/M(계획)', '8', 'center', 'str', 'ro', false, 'manpMm', ''));
	dhxGridPjtHnfPlanAcmsltAddListInfo.push(gf_MakeDhxGridHeader('M/M(전월실적)', '200', 'center', 'str', 'ro', false, 'prevManaMm', '')); 
	dhxGridPjtHnfPlanAcmsltAddListInfo.push(gf_MakeDhxGridHeader('M/M(누적실적)', '200', 'center', 'str', 'ro', false, 'manaMm', '')); 
	dhxGridPjtHnfPlanAcmsltAddListInfo.push(gf_MakeDhxGridHeader('M/M(잔여실적)', '*', 'center', 'str', 'ro', false, 'remainMm', '')); 
	
	dhxGridPjtHnfPlanAcmsltAddListInfo.push(gf_MakeDhxGridHeader('*', '80', 'center', 'str', 'ro', true, 'tchnlgyGrad', '')); 

	dhxGridPjtHnfPlanAcmsltAdd = gf_MakeDhxGrid('dataHnfList', dhxGridPjtHnfPlanAcmsltAddListInfo, true, false, false);
	
	dhxGridPjtHnfPlanAcmsltAdd.enableAutoWidth(false);
	dhxGridPjtHnfPlanAcmsltAdd.setColumnMinWidth(30,6); /* 크기, index값 : 앞에 컬럼 수넣음 */
	dhxGridPjtHnfPlanAcmsltAdd.adjustColumnSize(0);	

	
	
	dhxGridPjtHnfPlanAcmsltAdd.enableEditEvents(true,false,true);
	dhxGridPjtHnfPlanAcmsltAdd.enableMultiline(true);
	dhxGridPjtHnfPlanAcmsltAdd.enableValidation(true);
	dhxGridPjtHnfPlanAcmsltAdd.enableKeyboardSupport(true);
	dhxGridPjtHnfPlanAcmsltAdd.enableAutoWidth(true);
   
};

var cf_SetEventListenerHnfPlan = function (){

	$('#hnfPlan').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtHnf/view?projectSn="+projectSn ;
    });
	
	$('#hnfMonth').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtHnfAcmslt/view?projectSn="+projectSn ;
    });
    	
   
};

var cf_SetBindingHnfPlan = function (){
	fn_SearchGridListHnfPlan();
	fn_SearchGridListHnfPlanAdd();
};

var cf_InitFormHnfPlan = function (){};

var cf_InitInputFormPlan = function (){
};

var fn_SearchGridListHnfPlan = function (){

	 var jsonParameter = {
	    		projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
	    };

	    gf_Transaction('gridList', 'pjtpmg001/searchPjtProjectHnfPlanAcmsltList', jsonParameter, 'fn_CallbackSearchGridListHnfPlan', false, 'GET');
};


var fn_CallbackSearchGridListHnfPlan = function (strSvcID, targetID, data){
	dhxGridPjtHnfPlanAcmslt.clearAll();
    if(!gf_IsNull(data.data.records)){
    
    	dhxGridPjtHnfPlanAcmslt.parse(data.data.records, 'js');
    	
    	dhxGridPjtHnfPlanAcmslt.forEachRow(function(id){
    		//합계 표시 
			if( dhxGridPjtHnfPlanAcmslt.cells(id,dhxGridPjtHnfPlanAcmslt.getColIndexById("tchnlgyGrad")).getValue() =="0"){
				
				dhxGridPjtHnfPlanAcmslt.cells(id,0).setValue('--');
				dhxGridPjtHnfPlanAcmslt.setRowColor(id,"#BFBFBF");
				dhxGridPjtHnfPlanAcmslt.setCellTextStyle(id,1,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfPlanAcmslt.setCellTextStyle(id,2,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfPlanAcmslt.setCellTextStyle(id,3,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfPlanAcmslt.setCellTextStyle(id,4,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfPlanAcmslt.setCellTextStyle(id,5,"color:#000;font-weight:bold;");				
			}
		});    	
    	
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    cf_SetEventListenerHnfPlan();
};

var fn_SearchGridListHnfPlanAdd = function (){

	 var jsonParameter = {
	    		projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
	    };

	    gf_Transaction('gridList', 'pjtpmg001/searchPjtProjectHnfPlanAcmsltAddList', jsonParameter, 'fn_CallbackSearchGridListHnfPlanAdd', false, 'GET');
};


var fn_CallbackSearchGridListHnfPlanAdd = function (strSvcID, targetID, data){
	dhxGridPjtHnfPlanAcmsltAdd.clearAll();
   if(!gf_IsNull(data.data.records)){
	   
	   if(data.data.records.length == 1){
		   $("#hnfAddDiv").hide();
	   } else {
		   $("#hnfAddDiv").show();
	   }
   
	   dhxGridPjtHnfPlanAcmsltAdd.parse(data.data.records, 'js');
   	
	   dhxGridPjtHnfPlanAcmsltAdd.forEachRow(function(id){
   		//합계 표시 
			if( dhxGridPjtHnfPlanAcmsltAdd.cells(id,dhxGridPjtHnfPlanAcmsltAdd.getColIndexById("tchnlgyGrad")).getValue() =="0"){
				
				dhxGridPjtHnfPlanAcmsltAdd.cells(id,0).setValue('--');
				dhxGridPjtHnfPlanAcmsltAdd.setRowColor(id,"#BFBFBF");
				dhxGridPjtHnfPlanAcmsltAdd.setCellTextStyle(id,1,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfPlanAcmsltAdd.setCellTextStyle(id,2,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfPlanAcmsltAdd.setCellTextStyle(id,3,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfPlanAcmsltAdd.setCellTextStyle(id,4,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfPlanAcmsltAdd.setCellTextStyle(id,5,"color:#000;font-weight:bold;");				
			}
		});    	
   	
   } else {
       gf_DivMsgAlert(gv_MsgNoData);
   }
   cf_SetEventListenerHnfPlan();
};

var fn_SavePjtProject = function (rId, cInd) {
   
};

var fn_CheckPjtProject = function (col){
   
};

var fn_RemoveOne = function(){
	
};

var fn_RemovePjtProject = function (projectSn){
   
};

var fn_RemoveBcnc = function(rId,cInd,state){
	
	
};

var fn_RemovePjtProjectBcnc = function (){
	
};

var fn_ExcelDown = function () {

    
};

var fn_SearchInputPjtProject = function (){

    
};


