<!-- 
 *    프로그램       : 계좌 조회 팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.24
 *    사용테이블      : MHS_EMP
 *    WEB-INF/jsp/mps/cal/mpscal013/acunt.jsp
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxGridAcnutPopup;
var dhxGridPopup;


$(function() { 
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
});

function cf_InitParamPopupMenu(){
	gf_ComboCode('bankCodeSaveFormMtxbsc002', 'bankCode', 'bankCode', 'sel', 'C010', '' , '', '', 'ordr', 'required','','');  // 은행 구분
}

function cf_SetComponentsPopupMenu(){

    var dhxGridAcuntListInfo = [];
    dhxGridAcuntListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    //dhxGridAcuntListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllAcnut" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridAcuntListInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAcuntListInfo.push(gf_MakeDhxGridHeader('계좌순번', '0', 'center', 'str', 'ro', true, 'acnutSn', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAcuntListInfo.push(gf_MakeDhxGridHeader('계좌구분', '*', 'center', 'str', 'coro', false, 'acnutSeCode', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAcuntListInfo.push(gf_MakeDhxGridHeader('은행명', '*', 'center', 'str', 'coro', false, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAcuntListInfo.push(gf_MakeDhxGridHeader('은행명', '0', 'center', 'str', 'ro', true, 'bankNm', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAcuntListInfo.push(gf_MakeDhxGridHeader('계좌번호', '*', 'center', 'str', 'ro', false, 'acnutno', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAcuntListInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAcuntListInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridAcuntListInfo, true, false, false);

    dhxGridPopup.enableAutoWidth(false);
    
    // 계좌구분코드
    var acnutSeCodejsonParameter = {codekindCode : "C471",exceptCode :"",sortOrder :"asc" };
    var acnutSeCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', acnutSeCodejsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("acnutSeCode"), acnutSeCodedataSource.data, "sel");
    
    // 은행코드
    var bankCodejsonParameter = {codekindCode : "C010",exceptCode :"",sortOrder :"asc" };
    var bankCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', bankCodejsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("bankCode"), bankCodedataSource.data, "sel");
}

function cf_SetEventListenerPopupMenu(){

//     $('#searchForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
//         if(event.charCode == 13) { $('#btnAcnutPupupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
//         else return true; 
//     }); 
    
    $('#checkAllAcnut').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridPopup, $('#checkAllAcnut').prop('checked'), 'chk');
    });
    
    $('#btnAcnutPupupSearch').unbind('click').bind('click', function() {
        fn_SearchPopupAcnut();
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
        $('#acnutPopup .b-close').click();
    });
    

    $('#btnPopupOk').unbind('click').bind('click', function() {
    	 var selectedId = dhxGridPopup.getSelectedRowId();
    	 fn_SearchAcnutOk(selectedId);
    });
    
    dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
    	fn_SearchAcnutOk(rId);
    });
}

function cf_SetBindingPopupMenu(){
    setTimeout(function() { 
        fn_SearchPopupAcnut();
    }, 500);
}


function fn_SearchPopupAcnut(key){
    
	var empno = dhxGridMpscal013.cells(dhxGridMpscal013.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal013,'empno')).getValue();
	var applcYm = dhxGridMpscal013.cells(dhxGridMpscal013.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal013,'applcYm')).getValue();
	//var bankCode = gf_FormGetValue('searchForm', 'bankCode', 'combo');
	
    var jsonParameter = {
    		empno : empno,
    		applcYm : applcYm
    		//acnutSeCode : acnutSeCode,
    		//bankCode : bankCode
    };
    
    gf_Transaction(key, 'mpscal013/searchAcnutMpscal013', jsonParameter, 'fn_CallbackAcntPopup', false, 'GET');
}

function fn_CallbackAcntPopup (strSvcID, targetID, data){
    
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

function fn_SearchAcnutOk(rId){

    obj = eval("$acnutInfo");
    if(!gf_IsNull(rId)){
    	obj.empno         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("empno")).getValue();
    	obj.acnutSn         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("acnutSn")).getValue();
    	obj.acnutSeCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("acnutSeCode")).getValue();
    	obj.bankCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bankCode")).getValue();
    	obj.bankNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("bankNm")).getValue();
    	obj.acnutno         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("acnutno")).getValue();
    	obj.applcYm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("applcYm")).getValue();
    	obj.pymntSn         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("pymntSn")).getValue();
     }
    $('#acnutPopup .b-close').click();

};
</script>
 
<div class="pop-content">
<!--         <div class="consearch_div_in"> -->
<!--             <div class="consearch_input" id="searchFormAcnutPopup"> -->
<!--                 <form id="searchForm"> -->
<!--                     <ul class="consearchinput_list"> -->
<!--                         <li> -->
<!--                             <div id="bankCodeSaveFormMtxbsc002" name="bankCode" maxlength="3" style="width: 50%"></div> -->
<!--                         </li> -->
<!--                     </ul> -->
<!--                 </form> -->
<!--             </div> -->
<!--             <div class="consearchbt_div"> -->
<!--                 <ul class="consearchbt_list"> -->
<!--                     <li><a href="#none" id="btnAcnutPupupSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li> -->
<!--                     <li><a href="#none" id="btnAcnutPupupInit"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li> -->
<!--                 </ul> -->
<!--             </div> -->
<!--         </div> -->
        
        <div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntPopup"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
<!--             <div class="div_combo fr"> -->
<!--                     <form id="pageingFormMhshra001"></form> -->
<!--                 </div>  -->
<!--             <div> -->
                <div class="div_liner" id="dataGridList" style="width: 100%; height: 400px;"></div>
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
