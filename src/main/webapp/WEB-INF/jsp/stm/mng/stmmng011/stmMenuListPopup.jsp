<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxGridMenuListInfo;
var dhxGridMenuList;

var gformIdPopupMenuList;
var gcodeIdPopupMenuList;
var gcodeNmIdPopupMenuList;
var checkId;
var eventIdPops = [];

//초기화 
function cf_InitParamPopupMenu(){
	var jobClsCode = $("#bpopupMenuList").attr("jobClsCode");  
}

var cf_SetComponentsMenuList = function (){
	var dhxGridMenuListInfo = [];	
	dhxGridMenuListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '')); // 일련번호
    dhxGridMenuListInfo.push(gf_MakeDhxGridHeader('메뉴ID', '150', 'center', 'str', 'ro', false, 'menuId', ''));
    dhxGridMenuListInfo.push(gf_MakeDhxGridHeader('메뉴명', '*', 'left', 'str', 'ro', false, 'menuNm', ''));
    
    dhxGridMenuList = gf_MakeDhxGrid('gridPopupMenuList', dhxGridMenuListInfo, true, false, false);

    dhxGridMenuList.enableAutoHeight(false);

};

function cf_SetEventListenerPopupMenu(){
		
    $('#menuListFormPopup #menuNmPop').unbind('keydown').bind('keydown', function(event){
        if(event.charCode == 13) {
        	fn_SearchPopupMenuList(1); 
        }
    });
	//조회
	$('#btnMenuListPopupSearch').unbind('click').bind('click', function() {
    	fn_SearchPopupMenuList();
    });
	
	//초기화
    $('#btnMenuListPupupInit').unbind('click').bind('click', function() {
    	gf_FormSetValue('menuListFormPopup', 'menuNmPop', '', 'text');
    });
	
    //닫기
    $('#btnMenuListPupupClose').unbind('click').bind('click', function() {
    	$('#bpopupMenuList .b-close').click();
    });

    $('#bntSeletedPupup').unbind('click').bind('click', function() {
    	var selectedId = dhxGridMenuList.getSelectedRowId();
    	fn_SelectedMenuIdOK(selectedId);
    });
	
    dhxGridMenuList.attachEvent("onRowDblClicked", function(rId,cInd){
		fn_SelectedMenuIdOK(rId);
	});
}

function cf_SetBindingPopupMenu(){
	setTimeout(function() { 
		fn_SearchPopupMenuList();
	}, 500);
}

function cf_InitFormPopupMenu(){}

function fn_SearchPopupMenuList(){

	var jsonParameter = {
			menuNm     :  gf_FormGetValue('menuListFormPopup', 'menuNmPop', 'text'),
			jobClsCode : $("#bpopupMenuList").attr("jobClsCode")

	};
	gf_Transaction('gridPopupMenuList', 'stmmng002/searchStmMenu', jsonParameter, 'fn_CallbackSearchGridListMenuList', false, 'GET');
}

function fn_CallbackSearchGridListMenuList (strSvcID, targetID, data){
	dhxGridMenuList.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridMenuList.parse(data.data.records, 'js');
    	gf_NoFoundDataOnGridMsgRemove('gridPopupMenuList');
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
    	gf_NoFoundDataOnGridMsg('gridPopupMenuList'); 
    }
    $("#spanCntMenuList").text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListenerPopupMenu();
}



function fn_SelectedMenuIdOK(rId){
	obj = eval("$menuInfo");
	if(!gf_IsNull(rId)){  
        obj.menuId = dhxGridMenuList.cells(rId, dhxGridMenuList.getColIndexById("menuId")).getValue(); 
        obj.menuNm = dhxGridMenuList.cells(rId, dhxGridMenuList.getColIndexById("menuNm")).getValue(); 
	}
   	//$("#saveFormStmPrgRequst #progrmId").val(dhxGridMenuList.cells(rId, dhxGridMenuList.getColIndexById("menuId")).getValue());
   	//$("#saveFormStmPrgRequst #progrmNm").val(dhxGridMenuList.cells(rId, dhxGridMenuList.getColIndexById("menuNm")).getValue());
	
   	$('#bpopupMenuList .b-close').click();
}


$(function() {	
	
    cf_InitParamPopupMenu();
    cf_SetComponentsMenuList();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
    cf_InitFormPopupMenu();
    
    //fn_SearchPopupMenuList();
});


</script>
 
<div class="pop-content">
	<div>
    <div class="path_div">
    </div>
        <div class="consearch_div" style="min-width : 0px;">
		<div class="consearch_input" id="searchFormPopupEmp">
			<form id="menuListFormPopup">
			<ul class="consearchinput_list"> 
                <li><span class="span">메뉴명</span><input type="text" id="menuNmPop" name="menuNmPop" class="w390 ml5" maxlength="15" /></li>
            </ul>
			</form>
		</div>
        <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnMenuListPopupSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnMenuListPopupInit"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
            </div>
		
		<div>
			<div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntMenuList"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div>
				<div class="div_liner" id="gridPopupMenuList" style="width: 100%; height: 325px"></div>
			</div>
			
            <div class="popup_footer_box" style="margin-top: 10px;">
            	<button type="button" id="bntSeletedPupup" name="bntSeletedPupup">
                      <span class="glyphicon glyphicon-ok f15 mr5"></span><taglibs:transText progrmId="default" key="btnSelect" /><!-- 선택 -->
                </button>
                <button type="button" id="btnMenuListPupupClose" name="btnMenuListPupupClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
			</div>
		</div>
	</div>
</div>
</body>
