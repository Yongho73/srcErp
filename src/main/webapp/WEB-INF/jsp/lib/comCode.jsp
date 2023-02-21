<!-- 
 *    프로그램       : 공통코드 팝업  
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.21
 *    사용테이블      : STM_CODE
 *    WEB-INF/jsp/lib/comCode.jsp
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxGridStmCodeKind;
var dhxGridStmCode;

$(function() {	
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
});

function cf_InitParamPopupMenu(){
    gf_FormSetValue('searchForm', 'codekindNm', '', 'text');
    gf_FormSetValue('searchForm', 'sysSe', '', 'combo');
	$('#codekindNm').focus();
}


function cf_SetComponentsPopupMenu(){
    gf_ComboCode('divComboSysSe', 'sysSe', 'sysSe', 'search', 'C001', '' , '', '', 'ordr', '', '','');

    //코드종류 그리드
    var dhxGridStmCodeKindListInfo = [];
    dhxGridStmCodeKindListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),           '40', 'center', 'str', 'cntr', false, 'rnum', '')); // 번호
    dhxGridStmCodeKindListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodekindCode'),  '110', 'center', 'str', 'ro', false, 'codekindCode', '')); // 코드종류 코드
    dhxGridStmCodeKindListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodekindNm'),    '*', 'left', 'str', 'ro', false, 'codekindNm', '')); // 코드종류 한글명

    dhxGridStmCodeKind = gf_MakeDhxGrid('dataGridList', dhxGridStmCodeKindListInfo, true, false, false);
    dhxGridStmCodeKind.enableAutoWidth(true);
    dhxGridStmCodeKind.setEditable (false);
    
    // 공통코드 그리드
    
    var dhxGridStmCodeListInfo = [];
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),           '40', 'center', 'ro', 'cntr', false, 'num', '', '')); // 번호
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCode'),          '50', 'center', 'str', 'ro', false, 'code', '', '')); // 코드
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodeKorNm'),     '*', 'left', 'str', 'ro', false, 'codeKorNm', '', '')); // 코드 한글 명
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseAt'),         '100', 'center', 'na', 'ch', false, 'useAt', '', '')); // 사용 여부
    dhxGridStmCode = gf_MakeDhxGrid('dataGridListsub', dhxGridStmCodeListInfo, true, false, false);
    dhxGridStmCode.enableAutoWidth(true);
    dhxGridStmCode.setEditable (false);
   
}
var eventIds = [];
function cf_SetEventListenerPopupMenu(){
	
    var eventId;    
    
    eventId = dhxGridStmCodeKind.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        fn_SelectedCoodekind();
    });
    eventIds.push(eventId);
	
	$('#searchForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnPopupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
		
	$('#btnPopupSearch').unbind('click').bind('click', function() {
    	fn_SearchGridListStmCodeKind();
    });
	
    $('#btnPopupInit').unbind('click').bind('click', function() {
    	cf_InitParamPopupMenu();
    });
    
    $('#btnPopupClose').unbind('click').bind('click', function() {
    	$('#codePopup .b-close').click();
    });

    $('#btnPopupOk').unbind('click').bind('click', function() {
    	var selectedId = dhxGridStmCodeKind.getSelectedRowId();
    	fn_SearchItemOk(selectedId);
    });
    
    dhxGridStmCodeKind.attachEvent("onRowDblClicked", function(rId,cInd){
    	fn_SearchItemOk(rId);
	});
}

function cf_SetBindingPopupMenu(){
	setTimeout(function() { 
		fn_SearchGridListStmCodeKind();
	}, 500);
}

var fn_SearchGridListStmCodeKind = function (key){
	dhxGridStmCodeKind.clearAll();
	var sysSe =gf_FormGetValue('searchForm', 'sysSe', 'combo');
	
	 if(gf_IsNull(sysSe)){
		 sysSe ="MFS";
	 }
	 
    var jsonParameter = {
    	codeKorNm  : gf_FormGetValue('searchForm', 'codekindNm', 'text'),
   	    sysSe      : sysSe
   	    //sysSe      : gf_FormGetValue('searchForm', 'sysSe', 'combo'),
    };
    gf_Transaction(key, 'stmmng003/searchStmCodeKindListAll', jsonParameter, 'fn_CallbackSearchKindGridList', false, 'GET');
};


function fn_CallbackSearchKindGridList (strSvcID, targetID, data){
    dhxGridStmCodeKind.clearAll();
    
    if(!gf_IsNull(data.data.records)){
    	dhxGridStmCodeKind.parse(data.data.records, 'js');
        gf_NoFoundDataOnGridMsgRemove('dataGridList');
        dhxGridStmCodeKind.selectRow(0);
        fn_SelectedCoodekind();
    } else {
        gf_NoFoundDataOnGridMsg('dataGridList'); 
    	fn_CallbackSearchGridListStmCode();
    }
    $("#spanCntPopup").text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListenerPopupMenu();

};

function fn_SelectedCoodekind (){
     var codekindCode = dhxGridStmCodeKind.cells(dhxGridStmCodeKind.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStmCodeKind,'codekindCode')).getValue();

     if(!gf_IsNull(codekindCode)){
           var jsonParameter = { codekindCode  : codekindCode };
           gf_Transaction('gridList', 'stmmng003/searchStmCodeListAll', jsonParameter, 'fn_CallbackSearchGridListStmCode', false, 'GET');
     }  
	  
};
var fn_CallbackSearchGridListStmCode = function (strSvcID, targetID, data){
    dhxGridStmCode.clearAll();
    var nRecCnt = 0;
    if(!gf_IsNull(data)){
        if(!gf_IsNull(data.data.records)){
            dhxGridStmCode.parse(data.data.records, 'js');
            gf_NoFoundDataOnGridMsgRemove('dataGridListsub');
        } else {
            gf_NoFoundDataOnGridMsg('dataGridListsub');
        }
    } else {
    	gf_NoFoundDataOnGridMsg('dataGridListsub');
    }
};


function fn_SearchItemOk(rId){
	
    obj = eval("$codeInfo");
    if(!gf_IsNull(rId)){		   
        obj.codekindCode   = dhxGridStmCodeKind.cells(rId, dhxGridStmCodeKind.getColIndexById("codekindCode")).getValue(); 
        obj.codekindNm     = dhxGridStmCodeKind.cells(rId, dhxGridStmCodeKind.getColIndexById("codekindNm")).getValue();
    }     
	$('#codePopup .b-close').click();
};
</script>
 
<div class="pop-content">
    <div class="path_div">
    </div>	
    <div class="consearch_div_in">
            <div class="consearch_input">
                <form id="searchForm">
                    <ul class="consearchinput_list">
                        <li><span class="span">시스템 구분</span><div id="divComboSysSe" class="div_combo"></div></li>
                        <li><span class="span">코드명</span><input name="codekindNm" id="codekindNm"></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnPopupSearch"><span
                                class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnPopupInit"><span
                                class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
		
		<div>
			<div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntPopup"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div style="width: 45%;float: left;">
				<div class="div_liner" id="dataGridList" style=" height: 335px"></div>
			</div>
            <div style="width:10px;"></div>
            <div style="width: 54%;float: right;">
            	<div class="div_liner" id="dataGridListsub" style=" height: 335px"></div>
			</div>
			
            <div class="popup_footer_box">
            	<button type="button" id="btnPopupOk" name="btnPopupOk">
                      <span class="glyphicon glyphicon-ok f15 mr5"></span>확인<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                </button>
                <button type="button" id="btnPopupClose" name="btnPopupClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
			</div>
		</div>
</div>
</body>
