<!-- 
 *    프로그램       : 급여 지급일자  팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.17
 *    사용테이블      : MFS_ACNT_TITLE
 *    WEB-INF/jsp/lib/pymntDe.jsp
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
var dataSalarytyCode = {};

$(function() {  
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
    
    //cf_InitdatePymntDe();
    //cf_InitFormPymntDe();
});

function cf_InitParamPopupMenu(){
    var jsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"ordr" };
    
    gf_ComboCode('divComboSearchearnerSeCode', 'incomeKindCode', 'incomeKindCode', 'search', 'C046', '' , '', '', 'ordr', '');//결재구분

}

function cf_SetComponentsPopupMenu(){

    var dhxGridPymntDeListInfo = [];
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('소득자번호', '0', 'center', 'str', 'ro', true, 'earnerNo', '', '')); /* gf_LocaleTrans('default', 'titEarnerNo') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('사업장코드', '0', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('소득자구분', '*', 'center', 'str', 'coro', false, 'earnerSeCode', '', '')); /* gf_LocaleTrans('default', 'titEarnerSeCode') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('소득유형코드 C060', '0', 'center', 'str', 'ro', true, 'earnerTyCode', '', '')); /* gf_LocaleTrans('default', 'titEarnerTyCode') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('소득자성명', '0', 'center', 'str', 'ro', true, 'earnerNm', '', '')); /* gf_LocaleTrans('default', 'titEarnerNm') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('소득자주민번호(외국인번호)', '0', 'center', 'str', 'ro', true, 'ihidnum', '', '')); /* gf_LocaleTrans('default', 'titIhidnum') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('소득자사업자번호(사업소득자경우)', '0', 'center', 'str', 'ro', true, 'bizrno', '', '')); /* gf_LocaleTrans('default', 'titBizrno') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('내외국인여부', '0', 'center', 'str', 'coro', true, 'frgnrAt', '', '')); /* gf_LocaleTrans('default', 'titFrgnrAt') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('거주지국코드C122', '0', 'center', 'str', 'coro', true, 'nltyCode', '', '')); /* gf_LocaleTrans('default', 'titNltyCode') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('거주여부C031', '0', 'center', 'str', 'coro', true, 'liveSeCode', '', '')); /* gf_LocaleTrans('default', 'titLiveSeCode') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('우편번호', '0', 'center', 'str', 'ro', true, 'postCode', '', '')); /* gf_LocaleTrans('default', 'titPostCode') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('기본 주소', '0', 'center', 'str', 'ro', true, 'bassAdres', '', '')); /* gf_LocaleTrans('default', 'titBassAdres') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('상세 주소', '0', 'center', 'str', 'ro', true, 'detailAdres', '', '')); /* gf_LocaleTrans('default', 'titDetailAdres') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('은행명', '150', 'center', 'str', 'coro', false, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('예금주', '120', 'center', 'str', 'ro', false, 'dpstrNm', '', '')); /* gf_LocaleTrans('default', 'titDpstrNm') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('계좌번호', '250', 'center', 'str', 'ro', false, 'acnutNo', '', '')); /* gf_LocaleTrans('default', 'titAcnutNo') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('거래처', '0', 'center', 'str', 'ro', true, 'bcncNm', '', '')); /* gf_LocaleTrans('default', 'titBcncNm') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('직위명', '0', 'center', 'str', 'ro', true, 'ofcpsNm', '', '')); /* gf_LocaleTrans('default', 'titOfcpsNm') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('직종', '0', 'center', 'str', 'ro', true, 'jssfc', '', '')); /* gf_LocaleTrans('default', 'titJssfc') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('연락처', '0', 'center', 'str', 'ro', true, 'cttpc', '', '')); /* gf_LocaleTrans('default', 'titCttpc') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('휴대폰번호', '0', 'center', 'str', 'ro', true, 'mbtlnum', '', '')); /* gf_LocaleTrans('default', 'titMbtlnum') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('비고', '0', 'center', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridPymntDeListInfo, true, false, false);
    dhxGridPopup.enableAutoWidth(false);
    
    //거래처구분
    var earnerjsonParameter = {codekindCode : "C046",exceptCode :"",sortOrder :"asc" };
    var earnerdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', earnerjsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("earnerSeCode"), earnerdataSource.data, "sel");
    //은행구분
    var bankjsonParameter = {codekindCode : "C010",exceptCode :"",sortOrder :"asc" };
    var bankdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', bankjsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("bankCode"), bankdataSource.data, "sel");
    //내,외국인구분
    var frgnrAtjsonParameter = {codekindCode : "C011",exceptCode :"",sortOrder :"asc" };
    var frgnrAtdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', frgnrAtjsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("frgnrAt"), frgnrAtdataSource.data, "sel");
    //거주구분
    var livejsonParameter = {codekindCode : "C031",exceptCode :"",sortOrder :"asc" };
    var livedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', livejsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("liveSeCode"), livedataSource.data, "sel");
    //거주지구분
    var nltyjsonParameter = {codekindCode : "C122",exceptCode :"",sortOrder :"asc" };
    var nltydataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', nltyjsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("nltyCode"), nltydataSource.data, "sel");
    
}

function cf_SetEventListenerPopupMenu(){
    
    $('#incomeKind').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13)  {
            $('#incomeKind').focus();
        }
    });
    $('#btnIncomeKindPupupSearch').unbind('click').bind('click', function() {
        fn_SearchPopupIncomeKind();
    });
    
    $('#btnIncomeKindPupupInit').unbind('click').bind('click', function() {
        gf_FormSetValue('searchForm', 'incomeKind', '', 'text');
        fn_SearchPopupPymntDe();
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
        $('#incomeKindPopup .b-close').click();
    });
    

    $('#btnPopupOk').unbind('click').bind('click', function() {
        var selectedId = dhxGridPopup.getSelectedRowId();
        fn_SearchIncomeKindOk(selectedId);
    });
    
    dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
        fn_SearchIncomeKindOk(rId);
    });
}

function cf_SetBindingPopupMenu(){
    setTimeout(function() { 
        fn_SearchPopupIncomeKind();
    }, 500);
}


function fn_SearchPopupIncomeKind(pageNum, key){
    var pageingCnt = gf_FormGetValue('pageingFormPymntDe', 'pageRowSize', 'combo');
    var page = pageNum;
    if(gf_IsNull(pageingCnt)) pageingCnt = 20;
    if(gf_IsNull(page)) page = 1;
    gf_FormSetValue('searchForm', 'selectedPageNum', page, 'text');
    
    var jsonParameter = {
            pageingCnt : pageingCnt,
            pageNum : page,
            earnerSeCode : gf_FormGetValue('searchForm', 'incomeKindCode', 'combo')
    };
    gf_Transaction(key, 'mtxbsc002/searchMtxbsc002', jsonParameter, 'fn_CallbackAcntCdPopup', false, 'GET');
      
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

function fn_SearchIncomeKindOk(rId){

    obj = eval("$incomeKindInfo");
     if(!gf_IsNull(rId)){  
        obj.earnerNo         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("earnerNo")).getValue(); 
        obj.bplcCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bplcCode")).getValue(); 
        obj.earnerSeCode  = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("earnerSeCode")).getValue(); 
        obj.earnerTyCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("earnerTyCode")).getValue(); 
        obj.earnerNm       = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("earnerNm")).getValue(); 
        obj.ihidnum          = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("ihidnum")).getValue(); 
        obj.bizrno         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bizrno")).getValue(); 
        obj.frgnrAt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("frgnrAt")).getValue();
        obj.nltyCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("nltyCode")).getValue();
        obj.liveSeCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("liveSeCode")).getValue();
        obj.postCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("postCode")).getValue();
        obj.bassAdres         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bassAdres")).getValue();
        obj.detailAdres         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("detailAdres")).getValue();
        obj.acnutNo         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("acnutNo")).getValue();
        obj.bankCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bankCode")).getValue();
        obj.dpstrNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("dpstrNm")).getValue();
        obj.bcncNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bcncNm")).getValue();
        obj.ofcpsNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("ofcpsNm")).getValue();
        obj.jssfc         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("jssfc")).getValue();
        obj.cttpc         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("cttpc")).getValue();
        obj.mbtlnum         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("mbtlnum")).getValue();
     }   
    $('#incomeKindPopup .b-close').click();
};
</script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
<div class="pop-content">
   
        <div class="path_div"></div>
        <div class="consearch_div_in">
            <div class="consearch_input">
                <form id="searchForm">
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span">소득구분</span>
                            <div id="divComboSearchearnerSeCode" class="div_combo"></div>
                        </li>
                        <!-- <li><span class="span">dfsf일자</span></li> -->
                    </ul>
                </form>  
            </div>
        
            <div class="consearchbt_div" >
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnIncomeKindPupupSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnIncomeKindPupupInit"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        
        
        <div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCntPopup"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div class="div_liner" id="dataGridList" style="width: 100%; height: 350px;"></div>
            
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
