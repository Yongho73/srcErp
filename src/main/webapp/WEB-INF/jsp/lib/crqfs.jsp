<!-- 
 *    프로그램       : 자격증조회 팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.22
 *    사용테이블      : MFS_ACNT_TITLE
 *    WEB-INF/jsp/lib/crqfs.jsp
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
//자격중조회 팝업
var dhxTreeMenuPopupCrqfs;

var gformIdPopupCrqfs;
var gcodeIdPopupCrqfs;
var gcodeNmIdPopupCrqfs;
var gcrqfsInfoPopupCrqfs;

var g_userEmpNo;
var g_stmBizplcCode;

$(function() {	
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
    cf_InitFormPopupMenu();
});

function cf_InitParamPopupMenu(){
	
	//세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    g_userEmpNo = userInfo.data.userEmpNo;
    g_stmBizplcCode = userInfo.data.bplcCode;
    //구분
    gf_ComboCode('divPopupCrqfsComboSe', 'searchComboCrqfsSe', 'searchComboCrqfsSe', 'search', 'C138', '' , '', '', 'asc', '');
}

function cf_SetComponentsPopupMenu(){
    var formId        = $("#crqfsPopup").attr("formId");
    var codeId        = $("#crqfsPopup").attr("codeId");
    var codeNmId      = $("#crqfsPopup").attr("codeNmId");
    var crqfsInfo      = $("#crqfsPopup").attr("crqfsInfo");
    var searchFlag    = $("#crqfsPopup").attr("searchFlag");
    var obj = "";
    
    if(typeof searchFlag != "undefined" && typeof codeId != "undefined" && searchFlag == "Y" && codeId != ""){
    	obj = '#' + formId + " #" + codeId;
    	gf_FormSetValue('searchCrqfsPopupForm', 'popupCrqfsCode', $.trim($(obj).val()), 'text');
    }
    else {
    	gf_FormSetValue('searchCrqfsPopupForm', 'popupCrqfsCode', '', 'text');
    }
    
    if(typeof searchFlag != "undefined" && typeof codeNmId != "undefined" && searchFlag == "Y" && codeNmId != ""){
    	obj = '#' + formId + " #" + codeNmId;
    	gf_FormSetValue('searchCrqfsPopupForm', 'popupCrqfsKorNm', $.trim($(obj).val()), 'text');
    }
    else {
    	gf_FormSetValue('searchCrqfsPopupForm', 'popupCrqfsKorNm', '', 'text');
    }
    
    gformIdPopupCrqfs = formId;
    gcodeIdPopupCrqfs = codeId;
    gcodeNmIdPopupCrqfs = codeNmId;
    gcrqfsInfoPopupCrqfs = crqfsInfo;

    var dhxGridMhsCrqfsListInfo = [];
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('구분', '120', 'center', 'str', 'coro', false, 'crqfsSe', '', '')); /* gf_LocaleTrans('default', 'titCrqfsSe') */
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('자격증명', '*', 'left', 'str', 'ro', false, 'crqfsNm', '', '')); /* gf_LocaleTrans('default', 'titCrqfsNm') */
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('사용여부', '80', 'center', 'str', 'ro', false, 'useAtNm', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('사용시작일자', '100', 'center', 'date', 'ro', true, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('사용종료일자', '100', 'center', 'date', 'ro', true, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('수당지급여부', '10', 'center', 'str', 'ro', true, 'allwncPymntAt', '', '')); /* gf_LocaleTrans('default', 'titAllwncPymntAt') */
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('자격수당금액', '10', 'right', 'int', 'ro', true, 'qualfAllwncAmt', '', '')); /* gf_LocaleTrans('default', 'titQualfAllwncAmt') */
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('인사평가반영여부', '10', 'center', 'str', 'ro', true, 'evlApplyAt', '', '')); /* gf_LocaleTrans('default', 'titEvlApplyAt') */
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('인정점수', '10', 'right', 'str', 'ro', true, 'recogScore', '', '')); /* gf_LocaleTrans('default', 'titRecogScore') */
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('비고', '10', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsCrqfsListInfo.push(gf_MakeDhxGridHeader('자격증등록번호', '10', 'center', 'str', 'ro', true, 'crqfsCodeNo', '', ''));

    dhxTreeMenuPopupCrqfs = gf_MakeDhxGrid('gridPopupMenuCrqfs', dhxGridMhsCrqfsListInfo, true, false, false);

    dhxTreeMenuPopupCrqfs.enableAutoWidth(true);
    dhxTreeMenuPopupCrqfs.setDateFormat("%Y-%m-%d");
	
    var jsonParameter = {codekindCode : "C138",exceptCode :"",sortOrder :"asc" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxTreeMenuPopupCrqfs, dhxTreeMenuPopupCrqfs.getColIndexById("crqfsSe"), dataSource.data, "sel"); /* 그리드콤보*/
    
	$("input:radio[name=rdUseAt]").css('display','inline');
}

//var eventIdsCrqfsPopup = [];

function cf_SetEventListenerPopupMenu(){

	//if(!gf_IsNull(eventIdsCrqfsPopup.length) && eventIdsCrqfsPopup.length > 0){
    //	eventIdsCrqfsPopup = gf_GridDetachEvent(dhxTreeMenuPopupCrqfs, eventIdsCrqfsPopup);
	//}
	dhxTreeMenuPopupCrqfs.detachEvent("onRowDblClicked");
	dhxTreeMenuPopupCrqfs.detachEvent("onEditCell");

	var eventId;
    eventId = dhxTreeMenuPopupCrqfs.attachEvent("onRowDblClicked", function(rId,cInd){
    	fn_SearchCrqfsOk(rId);
	});
    //eventIdsCrqfsPopup.push(eventId);
    
    eventId = dhxTreeMenuPopupCrqfs.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
		if(cInd == gf_GetDhxGridColumId(dhxTreeMenuPopupCrqfs, 'crqfsSe') || cInd == gf_GetDhxGridColumId(dhxTreeMenuPopupCrqfs, 'useAt')) { return false; }	
		return true;		
	});
    //eventIdsCrqfsPopup.push(eventId);

	$('#searchForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnPupupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
	
	$('#btnPupupSearch').unbind('click').bind('click', function() {
    	fn_SearchPopupCrqfs();
    });
	
    $('#btnPupupInit').unbind('click').bind('click', function() {
    	$('#searchForm').resetForm();
    	cf_InitFormPopupMenu();
    });
    
    $('#btnCrqfsPupupClose').unbind('click').bind('click', function() {
    	$('#crqfsPopup .b-close').click();
    });
    
    $('#searchComboStmBizplcCrqfs').unbind('change').bind('change', function() {
    	fn_SearchPopupCrqfs();
    });
	
    $('#btnCrqfsPopupOk').unbind('click').bind('click', function() {
    	var selectedId = dhxTreeMenuPopupCrqfs.getSelectedRowId();
    	fn_SearchCrqfsOk(selectedId);
    });
}

function cf_SetBindingPopupMenu(){
	setTimeout(function() { 
		fn_SearchPopupCrqfs();
	}, 500);
}

function cf_InitFormPopupMenu(){
    //사용여부
    gf_FormSetValue("searchForm", "useAt", "1", "combo"); 
    $('#popupCrqfsCode').focus();
    }

function fn_SearchPopupCrqfs(){
	var jsonParameter = {
			crqfsNm : gf_FormGetValue('searchForm', 'popupCrqfsCode', 'text'),
			crqfsSe : gf_FormGetValue('searchForm', 'searchComboCrqfsSe', 'combo'),
			useAt :   gf_FormGetValue('searchForm', 'useAt', 'combo')
	};
	
	gf_Transaction('gridPopupMenuCrqfs', 'mhshrm009/searchMhshrm009', jsonParameter, 'fn_CallbackSearchGridListCrqfsPopup', false, 'GET');
}
function fn_CallbackSearchGridListCrqfsPopup (strSvcID, targetID, data){
	
	dhxTreeMenuPopupCrqfs.clearAll();
	var totCnt = data.data.records.length;
	//console.log(" totCnt : " + totCnt);
    if(!gf_IsNull(data.data.records) && totCnt > 0){
        gf_NoFoundDataOnGridMsgRemove('gridPopupMenuCrqfs');
        dhxTreeMenuPopupCrqfs.parse(data.data.records, 'js');
        dhxTreeMenuPopupCrqfs.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('gridPopupMenuCrqfs');
    }
    $('#spanCntPopupCrqfs').text(gf_NumberWithCommas(totCnt));
    cf_SetEventListenerPopupMenu();
};

function fn_SearchCrqfsOk(rId){

    var obj = "";
    if(gformIdPopupCrqfs != "" && gcodeIdPopupCrqfs != ""){
   	 obj = '#' + gformIdPopupCrqfs + " #" + gcodeIdPopupCrqfs;
   	 $(obj).val(dhxTreeMenuPopupCrqfs.cells(rId, 11).getValue());   //자격증등록번호
    } 
    if(gformIdPopupCrqfs != "" && gcodeNmIdPopupCrqfs != ""){
   	 obj = '#' + gformIdPopupCrqfs + " #" + gcodeNmIdPopupCrqfs;
   	 $(obj).val(dhxTreeMenuPopupCrqfs.cells(rId, 2).getValue());   //자격증명
   }

	if(gcrqfsInfoPopupCrqfs != ""){
		obj = eval("$" + gcrqfsInfoPopupCrqfs);
		if(typeof obj == "object"){
			obj.crqfsSe        = dhxTreeMenuPopupCrqfs.cells(rId, 1).getValue();   //자격증구분
			obj.crqfsNm 	   = dhxTreeMenuPopupCrqfs.cells(rId, 2).getValue();   //자격증명
			obj.useAt 	       = dhxTreeMenuPopupCrqfs.cells(rId, 3).getValue();   //사용여부
			obj.useBeginDe     = dhxTreeMenuPopupCrqfs.cells(rId, 4).getValue();   //사용시작일자
			obj.useEndDe       = dhxTreeMenuPopupCrqfs.cells(rId, 5).getValue();   //사용종료일자
			obj.allwncPymntAt  = dhxTreeMenuPopupCrqfs.cells(rId, 6).getValue();   //수당지급여부
			obj.qualfAllwncAmt = dhxTreeMenuPopupCrqfs.cells(rId, 7).getValue();   //자격수당금액
			obj.evlApplyAt     = dhxTreeMenuPopupCrqfs.cells(rId, 8).getValue();   //인사평가반영여부
			obj.recogScore     = dhxTreeMenuPopupCrqfs.cells(rId, 9).getValue();   //인정점수
			obj.rm             = dhxTreeMenuPopupCrqfs.cells(rId, 10).getValue();   //비고
			obj.crqfsCodeNo    = dhxTreeMenuPopupCrqfs.cells(rId, 11).getValue();   //자격증등록번호
		}
	}
    
	$('#crqfsPopup .b-close').click();
};
</script>
 
<div class="pop-content">
    <div class="path_div">
    </div>
    <form id="searchForm">
        <div class="consearch_div_in">
            <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li><span class="span">자격증명</span><input name="popupCrqfsCode" id="popupCrqfsCode" class="w150"></li>
                        <li><span class="span">자격증구분</span><div id="divPopupCrqfsComboSe" name="divPopupCrqfsComboSe" class="div_combo"></div></li>
                    </ul>
            </div>
        </div>
        <div class="consearch_div_in">
            <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span">사용여부</span>
                            <select id="useAt" name="useAt">
                                <option value="">전체</option>
                                <option value="1">사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>
                    </ul>
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
    </form>
    <div>
        <div class="list_top">
            <span class="view ">
                <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntPopupCrqfs"></span>
                <taglibs:transText progrmId="default" key="titSearchCnt" />
            </span>
        </div>
        <div>
	       <div class="div_liner" id="gridPopupMenuCrqfs" style="width: 100%; height: 335px"></div>
		</div>
        <div class="popup_footer_box">
            <button type="button" id="btnCrqfsPopupOk" name="btnCrqfsPopupOk">
                  <span class="glyphicon glyphicon-ok f15 mr5"></span>확인<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
            </button>
            <button type="button" id="btnCrqfsPupupClose" name="btnCrqfsPupupClose">
                 <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
            </button>
	    </div>
	</div>
    </div>
</body>
