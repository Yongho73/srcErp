<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxGridProjectListInfo;
var dhxGridProjectList;

var gformIdPopupProjectList;
var gcodeIdPopupProjectList;
var gcodeNmIdPopupProjectList;
var checkId;
var eventIdPops = [];

//초기화 
function cf_InitParamPopupProject(){
	gf_FormSetValue('proejectListFormPopup', 'comptAt', '0', 'combo');
}

var cf_SetComponentsProjectList = function (){
	var dhxGridProjectListInfo = [];	
	dhxGridProjectListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '')); // 일련번호
    dhxGridProjectListInfo.push(gf_MakeDhxGridHeader('거래처', '170', 'left', 'str', 'ro', false, 'bcncNm', ''));
    dhxGridProjectListInfo.push(gf_MakeDhxGridHeader('프로젝트명', '*', 'left', 'str', 'ro', false, 'projectNm', ''));
    dhxGridProjectListInfo.push(gf_MakeDhxGridHeader('프로젝트번호', '*', 'left', 'str', 'ro', true, 'projectSn', ''));
    dhxGridProjectListInfo.push(gf_MakeDhxGridHeader('프로젝트번호', '*', 'left', 'str', 'ro', true, 'bcncChargerNm', ''));
    dhxGridProjectListInfo.push(gf_MakeDhxGridHeader('프로젝트번호', '*', 'left', 'str', 'ro', true, 'chargerCttpc', ''));
    dhxGridProjectListInfo.push(gf_MakeDhxGridHeader('월간보고년월', '*', 'left', 'str', 'ro', true, 'nextReportYm', ''));
    
    dhxGridProjectList = gf_MakeDhxGrid('gridPopupProjectList', dhxGridProjectListInfo, true, false, false);

    dhxGridProjectList.enableAutoHeight(false);

};

function cf_SetEventListenerPopupProject(){
	$('#popupBcncNm').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13) {
        	fn_SearchPopupProjectList();
        }
    });
	$('#popupProjectNm').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13) {
        	fn_SearchPopupProjectList();
        }
    });
	//조회
	$('#btnprojectListPopupSearch').unbind('click').bind('click', function() {
    	fn_SearchPopupProjectList();
    });
	
	//초기화
    $('#btnProjectListPupupInit').unbind('click').bind('click', function() {
    	gf_FormSetValue('proejectListFormPopup', 'popupBcncNm', '', 'text');
    	gf_FormSetValue('proejectListFormPopup', 'popupProjectNm', '', 'text');
    	gf_FormSetValue('proejectListFormPopup', 'comptAt', '0', 'combo');
    });
	
    //닫기
    $('#btnProjectListPupupClose').unbind('click').bind('click', function() {
    	$('#bpopupProjectList .b-close').click(); 
    });

    $('#bntSeletedPupup').unbind('click').bind('click', function() {
    	var selectedId = dhxGridProjectList.getSelectedRowId();
    	fn_SearchEmpOk(selectedId);
    });
	
    dhxGridProjectList.attachEvent("onRowDblClicked", function(rId,cInd){
    	fn_SearchEmpOk(rId);
	});
}

function cf_SetBindingPopupProject(){
	setTimeout(function() { 
		fn_SearchPopupProjectList();
	}, 500);
}

function cf_InitFormPopupProject(){}

function fn_SearchPopupProjectList(){

	var jsonParameter = {
			bcncNm     :  gf_FormGetValue('proejectListFormPopup', 'popupBcncNm', 'text'),
			projectNm     :  gf_FormGetValue('proejectListFormPopup', 'popupProjectNm', 'text'),
			comptAt     :  gf_FormGetValue('proejectListFormPopup', 'comptAt', 'combo'),
	};
	gf_Transaction('gridPopupProjectList', 'pjtpmg005/searchPjtpmg005Project', jsonParameter, 'fn_CallbackSearchGridListProjectList', false, 'GET');
}

function fn_CallbackSearchGridListProjectList (strSvcID, targetID, data){
	dhxGridProjectList.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridProjectList.parse(data.data.records, 'js');
    	gf_NoFoundDataOnGridMsgRemove('gridPopupProjectList');
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
    	gf_NoFoundDataOnGridMsg('gridPopupProjectList'); 
    }
    $("#spanCntProjectList").text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListenerPopupProject();
}



function fn_SearchEmpOk(rId){
	obj = eval("$projectInfo");
	if(!gf_IsNull(rId)){  
        obj.bcncNm = dhxGridProjectList.cells(rId, dhxGridProjectList.getColIndexById("bcncNm")).getValue(); 
        obj.projectNm = dhxGridProjectList.cells(rId, dhxGridProjectList.getColIndexById("projectNm")).getValue(); 
        obj.projectSn = dhxGridProjectList.cells(rId, dhxGridProjectList.getColIndexById("projectSn")).getValue(); 
        obj.bcncChargerNm = dhxGridProjectList.cells(rId, dhxGridProjectList.getColIndexById("bcncChargerNm")).getValue(); 
        obj.chargerCttpc = dhxGridProjectList.cells(rId, dhxGridProjectList.getColIndexById("chargerCttpc")).getValue(); 
        obj.nextReportYm = dhxGridProjectList.cells(rId, dhxGridProjectList.getColIndexById("nextReportYm")).getValue(); 
	}
   	//$("#saveFormStmPrgRequst #progrmId").val(dhxGridMenuList.cells(rId, dhxGridMenuList.getColIndexById("menuId")).getValue());
   	//$("#saveFormStmPrgRequst #progrmNm").val(dhxGridMenuList.cells(rId, dhxGridMenuList.getColIndexById("menuNm")).getValue());
	
   	$('#bpopupProjectList .b-close').click();
} 


$(function() {	
	
    cf_InitParamPopupProject();
    cf_SetComponentsProjectList();
    cf_SetEventListenerPopupProject();
    //cf_SetBindingPopupMenu();
    cf_InitFormPopupProject();
    fn_SearchPopupProjectList();
});


</script>
 
<div class="pop-content">
	<div>
    <div class="path_div">
    </div>
        <div class="consearch_div" style="min-width : 0px;">
		<div class="consearch_input" id="searchFormPopupEmp">
			<form id="proejectListFormPopup">
			<ul class="consearchinput_list"> 
                <li><span class="span">거래처</span><input type="text" id="popupBcncNm" name="popupBcncNm" class="w120 ml5" maxlength="15" /></li>
                <li><span class="span">프로젝트명</span><input type="text" id="popupProjectNm" name="popupProjectNm" class="w130 ml5" maxlength="15" /></li>
                <li><span class="span">진행상태</span>
                    <select id="comptAt" name="comptAt">
                        <option value="">전체</option>
                        <option value="0">진행</option>
                        <option value="2">보류</option> 
                    	<option value="1">완료</option>                                    
                	</select>
                </li>
            </ul>
			</form>
		</div>
        <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnprojectListPopupSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnProjectListPupupInit"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
            </div>
		
		<div>
			<div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntProjectList"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div>
				<div class="div_liner" id="gridPopupProjectList" style="width: 100%; height: 325px"></div>
			</div>
			
            <div class="popup_footer_box" style="margin-top: 10px;">
            	<button type="button" id="bntSeletedPupup" name="bntSeletedPupup">
                      <span class="glyphicon glyphicon-ok f15 mr5"></span><taglibs:transText progrmId="default" key="btnSelect" /><!-- 선택 -->
                </button>
                <button type="button" id="btnProjectListPupupClose" name="btnProjectListPupupClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
			</div>
		</div>
	</div>
</div>
</body>
