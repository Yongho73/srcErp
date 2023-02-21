<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxTreeMenuPopupComp;

var gformIdPopupComp;
var gcodeIdPopupComp;
var gcodeNmIdPopupComp;
var gcustomerInfo;
var gsearchFlagPopupComp;
var gobjPopupComp = "";

var eventIdsPopupComp = [];

$(function() {	
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupConpMenu();
    cf_SetBindingPopupMenu();
    cf_InitFormPopupMenu();
});

function cf_InitParamPopupMenu(){
	// 페이징 환경설정 적용
	gf_SettingPgngUnit('pageingFormPopupComp'); 
	
	   var stmBizplcCode = $("#contractCompanyPopup").attr("bcncSe");
	
}

function cf_SetComponentsPopupMenu(){
	
	var formId       = $("#contractCompanyPopup").attr("formId");
    var codeId       = $("#contractCompanyPopup").attr("codeId");
    var codeNmId     = $("#contractCompanyPopup").attr("codeNmId");
    var customerInfo = $("#contractCompanyPopup").attr("customerInfo");
    var searchFlag   = $("#contractCompanyPopup").attr("searchFlag");
    var obj = "";
    
    if(typeof searchFlag != "undefined" && searchFlag == "Y" && (codeId != "" || codeNmId != "")){
    	obj = '#' + formId + " #" + codeNmId;
    	gf_FormSetValue('searchFormPopupComp', 'popupCompNm', $.trim($(obj).val()), 'text');
    	//gf_FormSetValue('searchFormPopupComp', 'popupBizrNo', "", 'text');
    }
    else {
    	gf_FormSetValue('searchFormPopupComp', 'popupCompNm', "", 'text');
    	//gf_FormSetValue('searchFormPopupComp', 'popupBizrNo', "", 'text');
    }
    
	gformIdPopupComp       = formId;
    gcodeIdPopupComp       = codeId;
    gcodeNmIdPopupComp     = codeNmId;
    gcustomerInfo = customerInfo;
    gsearchFlagPopupComp   = searchFlag;
    gobjPopupComp          = obj;
    
	var dhxGridTreeMenuInfo = [];
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   '50', 'center', 'int', 'edn', false, 'num', '')); // 번호
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('구분',   '90', 'center', 'str', 'ro', false, 'bcncSe', '')); // 번호
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("거래처명",    '*', 'center', 'str', 'ro', false, 'bcncNm', '')); //거래처명
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('지역',    '100', 'center', 'str', 'ro', false, 'areaNm', '')); //대표자
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('담당자',    '100', 'center', 'str', 'ro', false, 'chargerNm', '')); //대표자
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('직위',    '100', 'center', 'str', 'ro', false, 'chargerOfcps', '')); //직위
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ro', true, 'bcncCode', '')); //거래처 코드
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ro', true, 'chargerTelno', '')); //
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ro', true, 'chargerEmail', '')); //
	
	dhxTreeMenuPopupComp = gf_MakeDhxGrid('gridPopupMenuComp', dhxGridTreeMenuInfo, false, false, false);	
	
	
}


function cf_SetEventListenerPopupConpMenu(){
	
	$('#searchFormPopupComp').unbind('keypress').bind('keypress',function(event) {
		if(event.charCode == 13) { $('#btnCompPupupSearch').click(); event.preventDefault(); }
    });
	
    $('#btnCompPupupSearch').unbind('click').bind('click', function() {
    	fn_SearchPopupComp(1);
    });
	
    $('#btnCompPupupInit').unbind('click').bind('click', function() {
    	$('#searchFormPopupComp').resetForm();
    	//gf_FormSetValue('searchFormPopupComp', 'popupCompNm', '', 'text');
    	//gf_FormSetValue('searchFormPopupComp', 'popupBizrNo', '', 'text');
    	//$("#searchComboRdUseAtEmp1 option:eq(0)").prop("selected", true);
    });
    

 	// 그리드 이벤트 모두 삭제
 	if(eventIdsPopupComp.length > 0){
		gf_GridDetachEvent(dhxTreeMenuPopupComp, eventIdsPopupComp);   //그리드 이벤트 해제 (중복실행방지를 위해)
 	}

	var eventId = '';
    eventId = dhxTreeMenuPopupComp.attachEvent("onRowDblClicked", function(rId,cInd){
		fn_SearchPopupOk(rId);
	});
    eventIdsPopupComp.push(eventId);
    
    eventId = dhxTreeMenuPopupComp.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬
    	fn_PopupCompSortGridList(ind, type, direction);
    });
    eventIdsPopupComp.push(eventId);
	
    $('#btnCompPupupOk').unbind('click').bind('click', function() {
    	var selectedId = dhxTreeMenuPopupComp.getSelectedRowId();
    	fn_SearchPopupOk(selectedId);
    });

    $('#btnCompPupupClose').unbind('click').bind('click', function() {
    	$('#contractCompanyPopup .b-close').click();
    });
    
    //페이징 수량 변경 시
    $('#pageRowSizePopupComp').unbind('change').bind('change', function() {
    	fn_SearchPopupComp(1);
    });
}

function cf_SetBindingPopupMenu(){
	setTimeout(function() { 
		fn_SearchPopupComp(1);
	}, 500);
}

function cf_InitFormPopupMenu(){
	var stmBizplcCode = $("#contractCompanyPopup").attr("bcncSe");
	gf_FormSetValue("searchFormPopupComp", "bcncSe", stmBizplcCode, "combo"); 
}

function fn_SearchPopupComp(pageNum){

	var pageingCnt = gf_FormGetValue('pageingFormPopupComp', 'pageRowSize', 'combo');
	var page = pageNum;
	if(gf_IsNull(pageingCnt)) pageingCnt = 20;
	if(gf_IsNull(page)) page = 1;
	gf_FormSetValue('searchFormPopupComp', 'selectedPageNum', page, 'text');
	var jsonParameter = {
			bcncNm   : gf_FormGetValue('searchFormPopupComp', 'popupCompNm', 'text'),
			//bizrNo   : gf_FormGetValue('searchFormPopupComp', 'popupBizrNo', 'text'),
			bcncSe   : gf_FormGetValue('searchFormPopupComp', 'bcncSe', 'combo'),
	    	
	    	sortDirection	: gf_FormGetValue('searchFormPopupComp', 'sortDirection', 'text'),
			sortColumId		: gf_FormGetValue('searchFormPopupComp', 'sortColumId', 'text'),
	        pageingCnt 		: pageingCnt,
	        pageNum 		: page
	};
	gf_Transaction('gridPopupMenuComp', 'pjtpmg001/searchPjtProjectCustomerList', jsonParameter, 'fn_CallbackSearchPopupCompGridList', false, 'GET');
}

var fn_CallbackSearchPopupCompGridList = function (strSvcID, targetID, data){
	dhxTreeMenuPopupComp.clearAll();
   
    if(!gf_IsNull(data.data.records)){
    	dhxTreeMenuPopupComp.parse(data.data.records, 'js');
    	
        // 정렬 컬럼이 있으면 정렬 상태 유지
    	var sortOrder = gf_FormGetValue('searchFormPopupComp', 'sortDirection','text');
    	var sortColumId = gf_FormGetValue('searchFormPopupComp', 'sortColumId','text');
    	if(!gf_IsNull(sortOrder) && !gf_IsNull(sortColumId)) {
    		dhxTreeMenuPopupComp.setSortImgState(true, gf_GetDhxGridColumId(dhxTreeMenuPopupComp, sortColumId), sortOrder);    		 
    	}

    	gf_NoFoundDataOnGridMsgRemove('gridPopupMenuComp'); 
    } else {
    	gf_NoFoundDataOnGridMsg('gridPopupMenuComp'); 
    }
    $('#spanCntPopupComp').text(gf_NumberWithCommas(data.data.totalRecordCount));
    
    // 페이징 버튼 생성
    var pageingCnt = gf_FormGetValue('pageingFormPopupComp', 'pageRowSize', 'combo');
	if(gf_IsNull(pageingCnt)) pageingCnt = 20;
	
    //if(parseInt(data.data.totalRecordCount) > parseInt(pageingCnt)){
		gf_PageNate(data.data,'.paging','fn_SearchPopupComp');
    //}
    
	cf_SetEventListenerPopupConpMenu();
};

//메인 그리드 정렬변경(헤더클릭) 시 정렬변경
var fn_PopupCompSortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxTreeMenuPopupComp, 'num')){
	  	var sortOrder = gf_FormGetValue('searchFormPopupComp', 'sortDirection', 'text');
	  	var sortColumId = gf_FormGetValue('searchFormPopupComp', 'sortColumId', 'text');
	  	var nowSortColumId = gf_GetDhxGridColum(dhxTreeMenuPopupComp, ind);
	  	// 정렬 컬럼이 바뀌면 정렬방식 초기화
	  	if(sortColumId != nowSortColumId) sortOrder = '';	    	
	  	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
	  	if(sortOrder == 'desc' ) {
	  		dhxTreeMenuPopupComp.setSortImgState(true, ind, 'asc');
	  		gf_FormSetValue('searchFormPopupComp', 'sortDirection', 'asc', 'text');
	  		gf_FormSetValue('searchFormPopupComp', 'sortColumId', gf_GetDhxGridColum(dhxTreeMenuPopupComp, ind), 'text');
	  	}  else if(sortColumId != nowSortColumId && sortOrder == 'asc' ) {
	  		dhxTreeMenuPopupComp.setSortImgState(true, ind, 'desc');
	  		gf_FormSetValue('searchFormPopupComp', 'sortDirection', 'desc', 'text');
	  		gf_FormSetValue('searchFormPopupComp', 'sortColumId', gf_GetDhxGridColum(dhxTreeMenuPopupComp, ind), 'text');
	  	}
	  	else {
	  		dhxTreeMenuPopupComp.setSortImgState(false);
	  		gf_FormSetValue('searchFormPopupComp', 'sortDirection', '', 'text');
	  		gf_FormSetValue('searchFormPopupComp', 'sortColumId', '', 'text');
	  	}
	  	fn_SearchPopupComp(gf_FormGetValue('searchFormPopupComp', 'selectedPageNum', 'text'));
	}
}

function fn_SearchPopupOk(rId){
	
	 if(gformIdPopupComp != "" && gcodeIdPopupComp != ""){
    	 gobjPopupComp = '#' + gformIdPopupComp + " #" + gcodeIdPopupComp;
    	 $(gobjPopupComp).val(dhxTreeMenuPopupComp.cells(rId, dhxTreeMenuPopupComp.getColIndexById("bcncCode")).getValue());   //거래처코드
     }
     if(gformIdPopupComp != "" && gcodeNmIdPopupComp != ""){
    	 gobjPopupComp = '#' + gformIdPopupComp + " #" + gcodeNmIdPopupComp;
    	 $(gobjPopupComp).val(dhxTreeMenuPopupComp.cells(rId, dhxTreeMenuPopupComp.getColIndexById("bcncNm")).getValue());   //거래처명
    }
     
     if(gcustomerInfo != ""){
    	 var obj = eval("$" + gcustomerInfo);
    	 if(typeof obj == "object"){
	    	 obj.bcncCode        = dhxTreeMenuPopupComp.cells(rId, dhxTreeMenuPopupComp.getColIndexById("bcncCode")).getValue();   //거래처코드
	    	 obj.bcncNm 	     = dhxTreeMenuPopupComp.cells(rId, dhxTreeMenuPopupComp.getColIndexById("bcncNm")).getValue();   //거래처명
	    	 obj.chargerNm 	     = dhxTreeMenuPopupComp.cells(rId, dhxTreeMenuPopupComp.getColIndexById("chargerNm")).getValue();   //담당자
	    	 obj.chargerOfcps 	 = dhxTreeMenuPopupComp.cells(rId, dhxTreeMenuPopupComp.getColIndexById("chargerOfcps")).getValue();   //직위 
	    	 obj.chargerTelno 	 = dhxTreeMenuPopupComp.cells(rId, dhxTreeMenuPopupComp.getColIndexById("chargerTelno")).getValue();   //직위 
    	 }
    }
	$('#contractCompanyPopup .b-close').click();
}
</script>
 
<div class="pop-content">	 
	<div>
    <div class="path_div">
    </div>
     <div class="consearch_div" style="min-width: 500px;">
		<div class="consearch_input" id="searchFormPopupMenu">
			<form id="searchFormPopupComp">

	        <input type="hidden" name="sortDirection"/>
	        <input type="hidden" name="sortColumId"/>
	        <input type="hidden" name="selectedPageNum"/>
            
            <ul class="consearchinput_list"> 
	           <li><span class="span">구분</span>
                    <select id="bcncSeSearch" name="bcncSe">
                        <option value="">전체</option>
                        <option value="01">고객사</option>
                        <option value="02">구매처</option>
                        <option value="03">기타</option>
                        <option value="04">영업대상</option>
                        <option value="05">협력사</option>
                    </select>
               </li>
               <li><span class="span">거래처명</span>
                   <input type="text" id="popupCompNm" name="popupCompNm" style="width: 120px;" />
                </li>
            </ul>
                    </form>
        </div>
            
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnCompPupupSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnCompPupupInit"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
            </div>
	
		
		<div style="margin-top: 20px;">
			<div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntPopupComp"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
                <!-- data count for paging -->
                <div class="div_combo fr">
                    <form id="pageingFormPopupComp"></form>
                </div>
            </div>
            <div>
				<div id="gridPopupMenuComp" style="width: 100%; height: 360px;"></div>
			</div>
			<!-- stmcodekind grid paging -->
            <div style="margin-top:10px;">
                <div id="divPagingPopupComp" class="ac paging"></div>
            </div>
            <div class="popup_footer_box">
            	<button type="button" id="btnCompPupupOk" name="btnCompPupupOk">
                      <span class="glyphicon glyphicon-ok f15 mr5"></span>확인<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                </button>
                <button type="button" id="btnCompPupupClose" name="btnCompPupupClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
			</div>
		</div>
	</div>
</div>
</body>
