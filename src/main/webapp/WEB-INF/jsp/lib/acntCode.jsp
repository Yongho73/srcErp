<!-- 
 *    프로그램       : 계정과목 팝업화면 
 *    위치             : 회계관리>기본정보>계정과목관리>상위계정코드
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.21
 *    사용테이블      : MFS_ACNT_TITLE
 *    WEB-INF/jsp/lib/anctCode.jsp
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxGridPopup;

var gformIdPopup;
var gformIdPopup;
var gcodeNmIdPopup;
var gdeptInfoPopup;

$(function() {	
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
});

function cf_InitParamPopupMenu(){
	$('#acntNm').focus();
}

function cf_SetComponentsPopupMenu(){

    var dhxGridAcntCodeListInfo = [];
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('계정코드', '100', 'center', 'str', 'ro', false, 'acntCode', '', '')); /* gf_LocaleTrans('default', 'titAcntCode') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('계정명', '*', 'left', 'str', 'ro', false, 'acntNm', '', '')); /* gf_LocaleTrans('default', 'titAcntNm') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('기표여부', '70', 'center', 'str', 'ro', false, 'slipBaltAt', '', '')); /* gf_LocaleTrans('default', 'titSlipBaltAt') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('레벨', '0', 'right', 'int', 'ro', true, 'treeLvl', '', '')); /* gf_LocaleTrans('default', 'titTreeLvl') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('계정구분', '0', 'center', 'str', 'ro', true, 'acntSeCode', '', '')); /* gf_LocaleTrans('default', 'titAcntSeCode') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('좌우구분', '0', 'center', 'str', 'ro', true, 'lrSeCode', '', '')); /* gf_LocaleTrans('default', 'titLrSeCode') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('잔액표기 ', '0', 'center', 'str', 'ro', true, 'balanceMarklcSe', '', '')); /* gf_LocaleTrans('default', 'titBalanceMarklcSe') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('사업장코드', '0', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridAcntCodeListInfo, true, false, false);

    dhxGridPopup.enableAutoWidth(true);
	
}

function cf_SetEventListenerPopupMenu(){
    $('#searchForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnAcntPupupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
	
	$('#btnAcntPupupSearch').unbind('click').bind('click', function() {
    	fn_SearchPopupAcntCd();
    });
	
    $('#btnAcntPupupInit').unbind('click').bind('click', function() {
    	$('#searchForm').resetForm();
    	cf_InitParamPopupMenu()
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
    	$('#acntCodePopup .b-close').click();
    });
    

    $('#btnPopupOk').unbind('click').bind('click', function() {
    	var selectedId = dhxGridPopup.getSelectedRowId();
    	fn_SearchAcntCodeOk(selectedId);
    });
    
    dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
    	fn_SearchAcntCodeOk(rId);
	});
}

function cf_SetBindingPopupMenu(){
	setTimeout(function() { 
		fn_SearchPopupAcntCd();
	}, 500);
}


function fn_SearchPopupAcntCd(){
    var jsonParameter = {
            acntCode : gf_FormGetValue('searchForm', 'acntCode', 'text'),
            acntNm   : gf_FormGetValue('searchForm', 'acntNm', 'text'),
    };
    gf_Transaction('dataGridList', 'mfsbsc001/searchMfsbsc001', jsonParameter, 'fn_CallbackAcntCdPopup', false, 'GET');
      
}

function fn_CallbackAcntCdPopup (strSvcID, targetID, data){
	
   dhxGridPopup.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridPopup.parse(data.data.records, 'js');
        gf_NoFoundDataOnGridMsgRemove('dataGridList');
    } else {
        gf_NoFoundDataOnGridMsg('dataGridList'); 
    }
    $("#spanCntPopup").text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListenerPopupMenu();

};

function fn_SearchAcntCodeOk(rId){

	obj = eval("$acntCodeInfo");
	 if(!gf_IsNull(rId)){  
        obj.acntCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("acntCode")).getValue(); 
        obj.acntNm           = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("acntNm")).getValue(); 
        obj.slipBaltAt       = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("slipBaltAt")).getValue(); 
        obj.treeLvl          = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("treeLvl")).getValue(); 
        obj.acntSeCode       = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("acntSeCode")).getValue(); 
        obj.lrSeCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("lrSeCode")).getValue(); 
        obj.balanceMarklcSe  = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("balanceMarklcSe")).getValue(); 
        obj.bplcCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bplcCode")).getValue(); 
	 }   
	$('#acntCodePopup .b-close').click();
};
</script>
 
    <div class="pop-content">	
        <div class="path_div">
        </div>
        <div class="consearch_div_in">
            <div class="consearch_input">
                <form id="searchForm">
                    <ul class="consearchinput_list">
                        <li><span class="span">계정코드</span><input name="acntCode" id="acntCode" class="w80"></li>
                        <li><span class="span">계정명</span><input name="acntNm" id="acntNm" class="w120"></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnAcntPupupSearch"><span
                                class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnAcntPupupInit"><span
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
            <div>
				<div class="div_liner" id="dataGridList" style="width: 100%; height: 335px"></div>
			</div>
			
            <div class="popup_footer_box">
            	<button type="button" id="btnPopupOk" name="btnPopupOk">
                      <span class="glyphicon glyphicon-ok f15 mr5"></span>확인<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                </button>
                <button type="button" id="btnPupupClose" name="btnPupupClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
			</div>
		</div>
	</div>
</div>
</body>
