<!-- 
 *    프로그램       : 카드번호 팝업화면 
 *    위치        : 세무회계>증빙관리>법인카드 증빙>카드번호조회(입력폼)
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.09
 *    사용테이블      : MFS_ACNT_TITLE
 *    WEB-INF/jsp/lib/cardNo.jsp
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
	$('#cardNo').focus();
}

function cf_SetComponentsPopupMenu(){

    var dhxGridCardNoListInfo = [];
    dhxGridCardNoListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'cntr', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridCardNoListInfo.push(gf_MakeDhxGridHeader('카드번호', '*', 'left', 'str', 'ro', false, 'dashCardNo', '', '')); /* gf_LocaleTrans('default', 'titDashCardNo') */
//     dhxGridCardNoListInfo.push(gf_MakeDhxGridHeader('부서코드', '100', 'center', 'str', 'ro', false, 'deptCode', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */ 
    dhxGridCardNoListInfo.push(gf_MakeDhxGridHeader('관리자', '100', 'center', 'str', 'ro', false, 'ownEmpnm', '', ''));//  gf_LocaleTrans('default', 'titOwnEmpno') 
    dhxGridCardNoListInfo.push(gf_MakeDhxGridHeader('카드번호', '0', 'left', 'str', 'ro', true, 'cardNo', '', '')); /* gf_LocaleTrans('default', 'titCardNo') */
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridCardNoListInfo, true, false, false);

    dhxGridPopup.enableAutoWidth(true);
    
}

function cf_SetEventListenerPopupMenu(){
	$('#searchForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnPupupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 

    $('#btnPupupSearch').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPopupCardNo('');
    });
    
    $('#btnPupupInit').unbind('click').bind('click', function() {
        $('#searchForm').resetForm();
        cf_InitParamPopupMenu()
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
        $('#cardNoPopup .b-close').click();
    });
    

    $('#btnPopupOk').unbind('click').bind('click', function() {
        var selectedId = dhxGridPopup.getSelectedRowId();
        fn_SearchCardNoOk(selectedId);
    });
    
    dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
        fn_SearchCardNoOk(rId);
    });
}

function cf_SetBindingPopupMenu(){
    setTimeout(function() { 
        fn_SearchPopupCardNo();
    }, 500);
}


function fn_SearchPopupCardNo(pageNum, key){
    var jsonParameter = {
            cardNo : gf_FormGetValue('searchForm', 'cardNo', 'text')
    };
    gf_Transaction(key, 'mfsbsc004/searchMfsbsc004', jsonParameter, 'fn_CallbackAcntCdPopup', false, 'GET');
      
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

function fn_SearchCardNoOk(rId){

    obj = eval("$cardNoInfo");
    console.log(obj)
     if(!gf_IsNull(rId)){  
        obj.cardNo         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("dashCardNo")).getValue(); 
        obj.ownEmpnm           = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("ownEmpnm")).getValue(); 
        /* obj.slipBaltAt       = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("slipBaltAt")).getValue(); 
        obj.treeLvl          = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("treeLvl")).getValue(); 
        obj.acntSeCode       = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("acntSeCode")).getValue(); 
        obj.lrSeCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("lrSeCode")).getValue(); 
        obj.balanceMarklcSe  = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("balanceMarklcSe")).getValue(); 
        obj.bplcCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bplcCode")).getValue();  */
     }   
    $('#cardNoPopup .b-close').click();
};
</script>
 
<div class="pop-content">    
    <div class="path_div">
    </div>
    <div class="consearch_div_in">
            <div class="consearch_input">
                <form id="searchForm">
                    <ul class="consearchinput_list">
                        <li><span class="span">카드명</span><input name="cardNo" id="cardNo"></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnPupupSearch"><span
                                class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnPupupInit"><span
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
            <div class="div_combo fr">
                    <form id="pageingFormMtxevd003"></form>
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
