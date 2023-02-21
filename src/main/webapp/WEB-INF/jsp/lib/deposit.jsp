<!-- 
 *    프로그램       : 계좌번호 팝업화면 
 *      위치      : 회계관리>기본정보>법인카드관리>결재계좌번호 
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.23
 *    사용테이블      : MFS_DEPOSIT
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
    cf_InitFormPopupMenu();
    cf_SetBindingPopupMenu();
});

function cf_InitParamPopupMenu(){
}

function cf_SetComponentsPopupMenu(){

    var dhxGridAcntCodeListInfo = [];
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('거래은행', '100', 'left', 'str', 'ro', false, 'bankNm', '', '')); /* gf_LocaleTrans('default', 'titBankNm') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('지점', '100', 'left', 'str', 'ro', false, 'estblBhf', '', '')); /* gf_LocaleTrans('default', 'titEstblBhf') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('계좌번호', '*', 'left', 'str', 'ro', false, 'acnutNo', '', '')); /* gf_LocaleTrans('default', 'titAcnutNo') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('주거래여부', '90', 'center', 'str', 'ch', false, 'bassBnkbAt', '', '')); /* gf_LocaleTrans('default', 'titBassBnkbAt') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('은행코드', '100', 'center', 'str', 'ro', true, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridAcntCodeListInfo.push(gf_MakeDhxGridHeader('사업장 코드', '100', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridAcntCodeListInfo, true, false, false);

    dhxGridPopup.enableAutoWidth(true);
    dhxGridPopup.setEditable(false); //읽기전용 
}

function cf_SetEventListenerPopupMenu(){

	$('#searchForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnPopupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
	
	$('#btnPopupSearch').unbind('click').bind('click', function() {
    	fn_SearchPopupDeposit();
    });
	
    $('#btnPopupInit').unbind('click').bind('click', function() {
    	cf_InitFormPopupMenu();
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
    	$('#acnutNoPopup .b-close').click();
    });
    

    $('#btnPopupOk').unbind('click').bind('click', function() {
    	var selectedId = dhxGridPopup.getSelectedRowId();
    	fn_SearchAcntCodeOk(selectedId);
    });
    
    dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
    	fn_SearchAcntCodeOk(rId);
	});
}

function cf_InitFormPopupMenu(){
	$('#searchForm').resetForm();
    $('#acnutNo').focus();
}

function cf_SetBindingPopupMenu(){
	setTimeout(function() { 
		fn_SearchPopupDeposit();
	}, 500);
}


function fn_SearchPopupDeposit(key){
 
    var jsonParameter = {
            acnutNo : gf_FormGetValue('searchForm', 'acnutNo', 'text'),
            useAt : '1',
        };
        gf_Transaction('dataGridList', 'mfsbsc003/searchMfsbsc003', jsonParameter, 'fn_CallbackDepositPopup', false, 'GET');
        
}


function fn_CallbackDepositPopup (strSvcID, targetID, data){
	
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

	obj = eval("$depositInfo");
	 if(!gf_IsNull(rId)){  
		    obj.bankCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bankCode")).getValue(); 
		    obj.acnutNo          = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("acnutNo")).getValue(); 
		    obj.bplcCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bplcCode")).getValue(); 
	 }    
	$('#acnutNoPopup .b-close').click();
};
</script>
 
    <div class="pop-content">
    <div class="path_div">
    </div>
        <div class="consearch_div_in">
            <div class="consearch_input">
                <form id="searchForm">
                    <ul class="consearchinput_list">
                        <li><span class="span">계좌번호</span><input name="acnutNo" id="acnutNo"></li>
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
</body>
