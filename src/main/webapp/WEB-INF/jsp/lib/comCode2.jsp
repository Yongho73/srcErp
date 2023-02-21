<!-- 
 *    프로그램       : 은행코드 팝업  
 *      위치        : 인사관리>인사관리>인사기본>계좌번호>은행코드
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.21
 *    사용테이블      : STM_CODE
 *    WEB-INF/jsp/lib/comCode2.jsp
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxGridStmCode;

var gformIdPopupComCode2;
var gcodeKindIdPopupComCode2;
var gcodeIdPopupComCode2;
var gcodeNmIdPopupComCode2;
var gcomCodeInfoPopupComCode2;

var eventIdsComCode2 = [];

$(function() {	
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
});

function cf_InitParamPopupMenu(){
	//gf_ComboCode('divComboSysSe', 'sysSe', 'sysSe', 'search', 'C001', '' , '', '', 'ordr', '', '','');
    $('#searchFormComCode2').resetForm();
	//사용여부
    gf_FormSetValue("searchFormComCode2", "useAt", "1", "combo"); 
	$('#codeKorNmComCode2').focus();
}


function cf_SetComponentsPopupMenu(){

    var formId        = $("#comCodePopup").attr("formId");
    var codeKindCode  = $("#comCodePopup").attr("codeKindCode");
    var codeId        = $("#comCodePopup").attr("codeId");
    var codeNmId      = $("#comCodePopup").attr("codeNmId");
    var comCodeInfo   = $("#comCodePopup").attr("codeInfo");
    var searchFlag    = $("#comCodePopup").attr("searchFlag");

    gformIdPopupComCode2 = formId;
    gcodeKindIdPopupComCode2 = codeKindCode;
    gcodeIdPopupComCode2 = codeId;
    gcodeNmIdPopupComCode2 = codeNmId;
    gcomCodeInfoPopupComCode2 = comCodeInfo;
    
    
    // 은행코드 그리드
    var dhxGridStmCodeListInfo = [];
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),           '40', 'center', 'ro', 'cntr', false, 'num', '', '')); // 번호
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCode'),          '80', 'center', 'str', 'ro', false, 'code', '', '')); // 코드
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodeKorNm'),     '*', 'left', 'str', 'ro', false, 'codeKorNm', '', '')); // 코드 한글 명
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseAt'),         '70', 'center', 'str', 'ro', false, 'useAt', '', '')); // 사용 여부
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodekindCode'),         '10', 'center', 'str', 'ro', true, 'codekindCode', '', '')); // 사용 여부
    dhxGridStmCode = gf_MakeDhxGrid('dataGridListComCode2', dhxGridStmCodeListInfo, true, false, false);
    dhxGridStmCode.enableAutoWidth(true);
    dhxGridStmCode.setEditable (false);
   
}

function cf_SetEventListenerPopupMenu(){
	
	var eventId;
	dhxGridStmCode.detachEvent("onRowSelect");
	dhxGridStmCode.detachEvent("onRowDblClicked");
	dhxGridStmCode.detachEvent("onEditCell");
    
    eventId = dhxGridStmCode.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        //fn_SelectedCoode2();
    });
    //eventIdsComCode2.push(eventId);
    
    eventId = dhxGridStmCode.attachEvent("onRowDblClicked", function(rId,cInd){
    	fn_SearchItemOk(rId);
	});
    //eventIdsComCode2.push(eventId);
    
    eventId = dhxGridStmCode.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridStmCode, 'useAt')) return false;		  
		return true;
    }); 
    
    $('#searchFormComCode2 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnPopupSearchComCode2').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
		
	$('#btnPopupSearchComCode2').unbind('click').bind('click', function() {
		fn_SelectedCoode2();
    });
	
    $('#btnPopupInitComCode2').unbind('click').bind('click', function() {
        cf_InitParamPopupMenu();
    });
    
    $('#btnPopupClose').unbind('click').bind('click', function() {
    	$('#comCodePopup .b-close').click();
    });

    $('#btnPopupOk').unbind('click').bind('click', function() {
    	var selectedId = dhxGridStmCode.getSelectedRowId();
    	fn_SearchItemOk(selectedId);
    });
}

function cf_SetBindingPopupMenu(){
	setTimeout(function() { 
		fn_SelectedCoode2();
	}, 500);
}

function fn_SelectedCoode2 (){
     if(!gf_IsNull(gcodeKindIdPopupComCode2)){
           var jsonParameter = { 
        		   codekindCode  : gcodeKindIdPopupComCode2,
        		   codeKorNm : gf_FormGetValue('searchFormComCode2', 'codeKorNmComCode2', 'text'),
        		   useAt     : gf_FormGetValue('searchFormComCode2', 'useAt', 'combo')
        	};
           gf_Transaction('gridList', 'stmmng003/searchStmCodeListAll', jsonParameter, 'fn_CallbackSearchGridListStmCode', false, 'GET');
     }  
	  
};
var fn_CallbackSearchGridListStmCode = function (strSvcID, targetID, data){
    dhxGridStmCode.clearAll();
    var nRecCnt = 0;
    var totCnt = data.data.records.length;
    if(!gf_IsNull(data.data.records)){
        dhxGridStmCode.parse(data.data.records, 'js');
        gf_NoFoundDataOnGridMsgRemove('dataGridListComCode2');
    } else {
        gf_NoFoundDataOnGridMsg('dataGridListComCode2');
    }
    $("#spanCntPopupComCode2").text(gf_NumberWithCommas(totCnt));
    cf_SetEventListenerPopupMenu();
};


function fn_SearchItemOk(rId){
	
	var obj = "";
    if(gformIdPopupComCode2 != "" && gcodeIdPopupComCode2 != ""){
   	 obj = '#' + gformIdPopupComCode2 + " #" + gcodeIdPopupComCode2;
   	 $(obj).val(dhxGridStmCode.cells(rId, 1).getValue());   //조직코드
    } 
    if(gformIdPopupComCode2 != "" && gcodeNmIdPopupComCode2 != ""){
   	 obj = '#' + gformIdPopupComCode2 + " #" + gcodeNmIdPopupComCode2;
   	 $(obj).val(dhxGridStmCode.cells(rId, 2).getValue());   //조직명
   }

    if(gcomCodeInfoPopupComCode2 != ""){
    	obj = eval("$" + gcomCodeInfoPopupComCode2);
	    if(typeof obj == "object" && !gf_IsNull(rId)){
	        obj.code           = dhxGridStmCode.cells(rId, dhxGridStmCode.getColIndexById("code")).getValue();
	        obj.codeKorNm     = dhxGridStmCode.cells(rId, dhxGridStmCode.getColIndexById("codeKorNm")).getValue();
	        obj.codekindCode   = dhxGridStmCode.cells(rId, dhxGridStmCode.getColIndexById("codekindCode")).getValue(); 
	    }
    }
	$('#comCodePopup .b-close').click();
};
</script>
 
    <div class="pop-content">
        <div class="path_div">
        </div>
        <div class="consearch_div_in">
            <div class="consearch_input">
                <form id="searchFormComCode2">
                    <ul class="consearchinput_list">
                        <li><span class="span">한글명</span><input name="codeKorNmComCode2" id="codeKorNmComCode2" class="w100"></li>
                        <li><span class="span">사용여부</span>
                            <select id="useAtSearchFormPopupComCode2" name="useAt">
                                <option value="">전체</option>
                                <option value="1">사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnPopupSearchComCode2"><span
                                class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnPopupInitComCode2"><span
                                class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
    
		<div>
			<div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntPopupComCode2"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div style="width: 98%;float: left;">
				<div class="div_liner" id="dataGridListComCode2" style=" height: 335px"></div>
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
