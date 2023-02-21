<!-- 
 *    프로그램       : 급여 지급일자  팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.17
 *    사용테이블      : MFS_ACNT_TITLE
 *    WEB-INF/jsp/lib/PopupDtlRequest.jsp
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
    
    //cf_InitdatePopupDtlRequest();
    //cf_InitFormPopupDtlRequest();
});

function cf_InitParamPopupMenu(){
    var jsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"ordr" };
    var dataComCode = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); // 기존 코드조회 쿼리 사용
}


function cf_SetComponentsPopupMenu(){

    var dhxGridPopupDtlRequestListInfo = [];
    dhxGridPopupDtlRequestListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridPopupDtlRequestListInfo.push(gf_MakeDhxGridHeader('그룹권한명', '*', 'left', 'str', 'ro', false, 'roleNm', ''));
    dhxGridPopupDtlRequestListInfo.push(gf_MakeDhxGridHeader('그룸권한코드', '0', 'center', 'str', 'ro', true, 'roleCode', ''));
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridPopupDtlRequestListInfo, true, false, false);
    dhxGridPopup.enableAutoWidth(true);
    
}

function cf_SetEventListenerPopupMenu(){
    
    $('#popupDtlRequest').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13)  {
            $('#popupDtlRequest').focus();
        }
    });
    $('#btnPopupDtlRequestPupupSearch').unbind('click').bind('click', function() {
        fn_SearchPopupPopupDtlRequest();
    });
    
    $('#btnPopupDtlRequestPupupInit').unbind('click').bind('click', function() {
        gf_FormSetValue('searchForm', 'popupDtlRequest', '', 'text');
        fn_SearchPopupPopupDtlRequest();
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
        $('#popupDtlRequestPopup .b-close').click();
    });
    

    $('#btnPopupOk').unbind('click').bind('click', function() {
        var selectedId = dhxGridPopup.getSelectedRowId();
        fn_SearchPopupDtlRequestOk(selectedId);
    });
    
    dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
        fn_SearchPopupDtlRequestOk(rId);
    });
}

function cf_SetBindingPopupMenu(){
    setTimeout(function() { 
        fn_SearchPopupPopupDtlRequest();
    }, 500);
}


function fn_SearchPopupPopupDtlRequest(pageNum, key){
    
    var jsonParameter = {
            
    };
    gf_Transaction('', 'stmmng004/search/role', jsonParameter, 'fn_CallbackAcntCdPopup', false, 'GET');
      
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

function fn_SearchPopupDtlRequestOk(rId){

    obj = eval("$popupDtlRequestInfo");
     if(!gf_IsNull(rId)){  
    	 obj.roleNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("roleNm")).getValue();
    	 obj.roleCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("roleCode")).getValue();
     }   
    $('#popupDtlRequestPopup .b-close').click();
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
