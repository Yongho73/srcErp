<!-- 
 *    프로그램       : 급여 지급일자  팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.17
 *    사용테이블      : MFS_ACNT_TITLE
 *    WEB-INF/jsp/lib/PopupQest.jsp
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
    
    //cf_InitdatePopupQest();
    //cf_InitFormPopupQest();
});

function cf_InitParamPopupMenu(){
    var jsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"ordr" };
    var dataComCode = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); // 기존 코드조회 쿼리 사용
}


function cf_SetComponentsPopupMenu(){

    var dhxGridPopupQestListInfo = [];
    dhxGridPopupQestListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridPopupQestListInfo.push(gf_MakeDhxGridHeader('설문조사코드', '*', 'center', 'str', 'ro', false, 'qestnarCode', '', '')); /* gf_LocaleTrans('default', 'titQestnarCode') */
    dhxGridPopupQestListInfo.push(gf_MakeDhxGridHeader('설문조사명칭', '320', 'left', 'str', 'ro', false, 'qestnarNm', '', '')); /* gf_LocaleTrans('default', 'titQestnarNm') */
    dhxGridPopupQestListInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridPopupQestListInfo.push(gf_MakeDhxGridHeader('설문조사 시작일자', '0', 'left', 'str', 'ro', true, 'qestnarSdt', '', '')); /* gf_LocaleTrans('default', 'titQestnarSdt') */
    dhxGridPopupQestListInfo.push(gf_MakeDhxGridHeader('설문조사 종료일자', '0', 'left', 'str', 'ro', true, 'qestnarEdt', '', '')); /* gf_LocaleTrans('default', 'titQestnarEdt') */
    dhxGridPopupQestListInfo.push(gf_MakeDhxGridHeader('비고', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridPopupQestListInfo.push(gf_MakeDhxGridHeader('수정 가능 여부 : 1=수정불', '0', 'center', 'str', 'ch', true, 'updtPosblAt', '', '')); /* gf_LocaleTrans('default', 'titUpdtPosblAt') */
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridPopupQestListInfo, true, false, false);
    dhxGridPopup.enableAutoWidth(true);
    
}

function cf_SetEventListenerPopupMenu(){
    
    $('#popupQest').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13)  {
            $('#popupQest').focus();
        }
    });
    $('#btnPopupQestPupupSearch').unbind('click').bind('click', function() {
        fn_SearchPopupPopupQest();
    });
    
    $('#btnPopupQestPupupInit').unbind('click').bind('click', function() {
        gf_FormSetValue('searchForm', 'popupQest', '', 'text');
        fn_SearchPopupPopupQest();
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
        $('#popupQestPopup .b-close').click();
    });
   
    dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
        fn_SearchPopupQestOk(rId);
    });
}

function cf_SetBindingPopupMenu(){
    setTimeout(function() { 
        fn_SearchPopupPopupQest();
    }, 500);
}


function fn_SearchPopupPopupQest(){
    
    var jsonParameter = {
            
    };
    gf_Transaction('', 'stmqes001/searchStmqes001', jsonParameter, 'fn_CallbackAcntCdPopup', false, 'GET');
      
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

function fn_SearchPopupQestOk(rId){

    obj = eval("$popupQestInfo");
     if(!gf_IsNull(rId)){  
         obj.qestnarCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("qestnarCode")).getValue();
         obj.qestnarNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("qestnarNm")).getValue();
         obj.useAt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("useAt")).getValue();
         obj.qestnarSdt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("qestnarSdt")).getValue();
         obj.qestnarEdt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("qestnarEdt")).getValue();
         obj.rm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("rm")).getValue();
         obj.updtPosblAt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("updtPosblAt")).getValue();
         
     }   
    $('#popupQestPopup .b-close').click();
};
</script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
<div class="pop-content">
        
        
        <div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCntPopup"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div class="div_liner" id="dataGridList" style="width: 100%; height: 300px;"></div>
        </div>
    
</div>
</body>
