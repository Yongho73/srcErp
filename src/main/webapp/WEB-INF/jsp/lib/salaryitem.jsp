<!-- 
 *    프로그램       : 카드번호 팝업화면 
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
    cf_InitFormPopupMenu();
});

function cf_InitParamPopupMenu(){
}

function cf_SetComponentsPopupMenu(){

    var dhxGridSalaryitemListInfo = [];
    dhxGridSalaryitemListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    //dhxGridSalaryitemListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc006Pop" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridSalaryitemListInfo.push(gf_MakeDhxGridHeader('급여유형', '100', 'center', 'str', 'ro', false, 'salarytyCodeNm', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridSalaryitemListInfo.push(gf_MakeDhxGridHeader('급여항목', '100', 'left', 'str', 'ro', false, 'salaryitemCode', '', ''));
    dhxGridSalaryitemListInfo.push(gf_MakeDhxGridHeader('급여항목', '*', 'center', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridSalaryitemListInfo.push(gf_MakeDhxGridHeader('지급공제', '80', 'center', 'str', 'ro', false, 'pymntddcSeNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridSalaryitemListInfo.push(gf_MakeDhxGridHeader('급여유형', '0', 'center', 'str', 'ro', true, 'salarytyCode', '', ''));
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridSalaryitemListInfo, true, false, false);

    dhxGridPopup.enableAutoWidth(true);
    
}

function cf_SetEventListenerPopupMenu(){
    
//     $('#dashSalaryitem').unbind('keydown').bind('keydown',function(event) {
//         if (event.keyCode == 13)  {
//             $('#ownEmpnm').focus();
//         }
//     });
    
//     $('#ownEmpnm').unbind('keydown').bind('keydown',function(event) {
//         if (event.keyCode == 13)  {
//         	fn_SearchPopupSalaryitem();
//         }
//     });

    $('#searchForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSalaryitemPupupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    
    $('#btnSalaryitemPupupSearch').unbind('click').bind('click', function() {
    	fn_SearchPopupSalaryitem();
    });
    
    $('#btnSalaryitemPupupInit').unbind('click').bind('click', function() {
    	$('#searchForm').resetForm();
    	cf_InitFormPopupMenu();
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
        $('#salaryitemPopup .b-close').click();
    });
    

    $('#btnPopupOk').unbind('click').bind('click', function() {
        var selectedId = dhxGridPopup.getSelectedRowId();
        fn_SearchSalaryitemOk(selectedId);
    });
    
    dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
        fn_SearchSalaryitemOk(rId);
    });
}

function cf_SetBindingPopupMenu(){
    setTimeout(function() { 
        fn_SearchPopupSalaryitem();
    }, 500);
}


function fn_SearchPopupSalaryitem(pageNum, key){
    var pageingCnt = gf_FormGetValue('pageingFormMtxevd003', 'pageRowSize', 'combo');
    var page = pageNum;
    if(gf_IsNull(pageingCnt)) pageingCnt = 20;
    if(gf_IsNull(page)) page = 1;
    gf_FormSetValue('searchForm', 'selectedPageNum', page, 'text');
    
    var jsonParameter = {
    		salaryitemNm : gf_FormGetValue('searchForm', 'salaryitemNm', 'text'),
    		salaryitemCode : gf_FormGetValue('searchForm', 'salaryitemCode', 'text')
            //ownEmpno   : gf_FormGetValue('searchFormCardNoPopup', 'ownEmpno', 'text')
    };
    gf_Transaction(key, 'mpscal016/searchMpscal016PopList', jsonParameter, 'fn_CallbackAcntCdPopup', false, 'GET');
      
}

function cf_InitFormPopupMenu(){
    $('#salaryitemNm').focus();
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

function fn_SearchSalaryitemOk(rId){

    obj = eval("$salaryitemInfo");
     if(!gf_IsNull(rId)){  
        obj.salaryitemNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("salaryitemNm")).getValue();
        obj.pymntddcSeNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("pymntddcSeNm")).getValue();
        obj.salarytyCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("salarytyCode")).getValue();
        obj.salarytyCodeNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("salarytyCodeNm")).getValue();
        obj.salaryitemCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("salaryitemCode")).getValue();
     }   
    $('#salaryitemPopup .b-close').click();
};
</script>
 
<div class="pop-content"> 
<div class="path_div">
</div>   
    <div class="consearch_div_in">
            <div class="consearch_input">
                <form id="searchForm">
                    <ul class="consearchinput_list">
                        <li><span class="span">급여항목코드</span><input name="salaryitemCode" id="salaryitemCode"></li>
                        <li><span class="span">급여항목</span><input name="salaryitemNm" id="salaryitemNm"></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSalaryitemPupupSearch"><span
                                class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnSalaryitemPupupInit"><span
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
<!--             <div class="div_combo fr"> -->
<!--                     <form id="pageingFormMtxevd003"></form> -->
<!--                 </div>  -->
<!--             <div> -->
                <div class="div_liner" id="dataGridList" style="width: 100%; height: 455px"></div>
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
