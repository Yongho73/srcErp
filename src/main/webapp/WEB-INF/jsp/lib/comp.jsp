<!-- 
 *    프로그램       : 거래처 팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.16
 *    사용테이블      : 
 *    WEB-INF/jsp/lib/comp.jsp
 -->

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
	/*
	//사업장
	var stmBizplcCode = $("#contractCompanyPopup").attr("stmBizplcCode");
    var searchFlag    = $("#contractCompanyPopup").attr("searchFlag");
    if(typeof searchFlag != "undefined" && typeof stmBizplcCode != "undefined" && searchFlag == "Y" && stmBizplcCode != ""){
    	//사업장
    	gf_MakeComboBasic('divPopupStmBizplcComboComp', 'searchComboStmBizplcComp', '', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', stmBizplcCode);
    }
    else {
    	//사업장
    	gf_MakeComboBasic('divPopupStmBizplcComboComp', 'searchComboStmBizplcComp', '', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '1000');
    }
    */
    
	//사용여부
     // divId, selectId(지정ID),  selectName(지정명), placeHolder(=search or add), codekindCode, exceptCode(=코드), selectStyle, selectClass, sortOrder, required
	gf_ComboCode('divPopupRdUseAtComboEmp1', 'searchComboRdUseAtEmp1', 'searchComboRdUseAtEmp1', 'search', 'C025', '' , '', '', 'asc', '');
	gf_SettingPgngUnit('pageingFormPopupComp');
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
    	//obj = '#' + formId + " #" + codeId;
    	//gf_FormSetValue('searchFormPopupComp', 'popupBizrNo', $.trim($(obj).val()), 'text');
    	gf_FormSetValue('searchFormPopupComp', 'popupBizrNo', "", 'text');
    }
    else {
    	gf_FormSetValue('searchFormPopupComp', 'popupCompNm', "", 'text');
    	gf_FormSetValue('searchFormPopupComp', 'popupBizrNo', "", 'text');
    }
    
	gformIdPopupComp       = formId;
    gcodeIdPopupComp       = codeId;
    gcodeNmIdPopupComp     = codeNmId;
    gcustomerInfo = customerInfo;
    gsearchFlagPopupComp   = searchFlag;
    gobjPopupComp          = obj;
    
	var dhxGridTreeMenuInfo = [];
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   '50', 'left', 'int', 'edn', false, 'num', '')); // 번호
	//dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBcncNm'),    '170', 'center', 'str', 'ed', false, 'bcncNm', '')); //거래처명
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("거래처명",    '170', 'center', 'str', 'ed', false, 'bcncNm', '')); //거래처명
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBizrno'),    '100', 'center', 'str', 'ed', false, 'bizrno', '')); //사업자번호
	//dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titReprsntNm'),    '100', 'center', 'str', 'ed', false, 'ceoNm', '')); //대표자
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titReprsntNm'),    '100', 'center', 'str', 'ed', false, 'reprsntNm', '')); //대표자
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titInduty'),    '110', 'left', 'str', 'ed', false, 'induty', '')); //업종
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBizcnd'),    '100', 'left', 'str', 'ed', false, 'bizcnd', '')); //업태
	//dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBankCode'),    '100', 'center', 'str', 'ed', false, 'bankNm', '')); //은행
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("은행",    '100', 'left', 'str', 'ed', false, 'bankNm', '')); //은행
	//dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAcnutNo'),    '100', 'center', 'str', 'ed', false, 'acnutNo', '')); //계좌번호
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("계좌번호",    '100', 'left', 'str', 'ed', false, 'acnutNo', '')); //계좌번호
	//dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDpstrNm'),    '100', 'center', 'str', 'ed', false, 'dpstrNm', '')); //예금주
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("예금주",    '100', 'center', 'str', 'ed', false, 'dpstrNm', '')); //예금주
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'bcncCode', '')); //거래처 코드
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'bplcCode', '')); //사업장 코드 순번 10
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'bcncSe', '')); //거래처 구분
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'cprSe', '')); //법인 구분
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'nltyCode', '')); //국적 코드
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'areaNm', '')); //지역 명
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'postCode', '')); //우편 코드
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'adres', '')); //주소
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'addr2', '')); //주소상세
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'telno', '')); //전화번호
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'faxNo', '')); //팩스 번호
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'bankCode', '')); //은행 코드
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'homepage', '')); //HOMEPAGE
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'purchsAt', '')); //매입 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'saleofficAt', '')); //매출처 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'bcncscaleSe', '')); //거래처규모 구분
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'taxtSe', '')); //과세 구분
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'bcncCn', '')); //거래처 내용
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'fondDe', '')); //설립 일자
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'capitalAmt', '')); //자본 금액
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'yySaleAmt', '')); //년 매출 금액
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'emplCo', '')); //사원 수
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'tradeNo', '')); //무역업등록 번호
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'crncyCode', '')); //통화 코드
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'useAt', '')); //사용 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'dsrprAt', '')); //장애인기업 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'womanAt', '')); //여성대표기업 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'foreignAt', '')); //외자기업 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'serhandicapAt', '')); //중증장애인기업 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'socialentrprsAt', '')); //사회적기업 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'dspsnStdAt', '')); //장애자 표준 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'greenAt', '')); //녹색제품 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'technologyAt', '')); //기술개발제품 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'chargerNm', '')); //기술개발제품 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'chargerEmail', '')); //기술개발제품 여부
	dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("",    '0', 'center', 'str', 'ed', true, 'chargerTelno', '')); //기술개발제품 여부
	
	dhxTreeMenuPopupComp = gf_MakeDhxGrid('gridPopupMenuComp', dhxGridTreeMenuInfo, false, false, false);	
}


function cf_SetEventListenerPopupConpMenu(){
	$('#searchFormPopupComp input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnCompPupupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
	
    $('#btnCompPupupSearch').unbind('click').bind('click', function() {
    	fn_SearchPopupComp();
    });
	
    $('#btnCompPupupInit').unbind('click').bind('click', function() {
    	 $('#searchFormPopupComp').resetForm();
         gf_FormSetValue('searchFormPopupComp', 'searchComboRdUseAtEmp1', '1', 'combo');
    });
    
    /*$('#searchComboStmBizplcComp').unbind('change').bind('change', function() {
    	fn_SearchPopupComp();
    });*/

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

function cf_InitFormPopupMenu(){}

function fn_SearchPopupComp(pageNum){
	/*var stmBizplcSelect = document.getElementById("searchComboStmBizplcComp");
	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
	var stmBizplcCodeNm   = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].text;
	if(stmBizplcCode == "" || $.trim(stmBizplcCodeNm) == ""){
		alert("사업장은 필수 검색 조건입니다");
		return false;
	}*/
	var pageingCnt = gf_FormGetValue('pageingFormPopupComp', 'pageRowSize', 'combo');
	var page = pageNum;
	if(gf_IsNull(pageingCnt)) pageingCnt = 20;
	if(gf_IsNull(page)) page = 1;
	gf_FormSetValue('searchFormPopupComp', 'selectedPageNum', page, 'text');
	
	var stmCodeRdUseAtelect = document.getElementById("searchComboRdUseAtEmp1");
	var stmCodeRdUseAtCode = stmCodeRdUseAtelect.options[stmCodeRdUseAtelect.selectedIndex].value;
	var jsonParameter = {
			bcncNm   : gf_FormGetValue('searchFormPopupComp', 'popupCompNm', 'text'),
			bizrNo   : gf_FormGetValue('searchFormPopupComp', 'popupBizrNo', 'text'),
			useAt    : stmCodeRdUseAtCode,
			//bplcCode : stmBizplcCode
	    	
	    	sortDirection	: gf_FormGetValue('searchFormPopupComp', 'sortDirection', 'text'),
			sortColumId		: gf_FormGetValue('searchFormPopupComp', 'sortColumId', 'text'),
	        pageingCnt 		: pageingCnt,
	        pageNum 		: page
	};
	gf_Transaction('gridPopupMenuComp', 'comp/searchComp', jsonParameter, 'fn_CallbackSearchPopupCompGridList', false, 'GET');
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
	/*
	console.log("사업장 코드 : " + dhxTreeMenuPopupComp.cells(rId, 10).getValue());
	console.log("거래처 구분 : " + dhxTreeMenuPopupComp.cells(rId, 11).getValue());
	console.log("사업자번호 : " + dhxTreeMenuPopupComp.cells(rId, 2).getValue());
	console.log("대표자 : " + dhxTreeMenuPopupComp.cells(rId, 3).getValue());
	console.log("업종 : " + dhxTreeMenuPopupComp.cells(rId, 4).getValue());
	console.log("업태 : " + dhxTreeMenuPopupComp.cells(rId, 5).getValue());
	console.log("은행 : " + dhxTreeMenuPopupComp.cells(rId, 6).getValue());
	console.log("계좌번호 : " + dhxTreeMenuPopupComp.cells(rId, 7).getValue());
	console.log("예금주 : " + dhxTreeMenuPopupComp.cells(rId, 8).getValue());
	console.log("법인 구분 : " + dhxTreeMenuPopupComp.cells(rId, 12).getValue());
	console.log("국적 코드 : " + dhxTreeMenuPopupComp.cells(rId, 13).getValue());
	console.log("지역 명 : " + dhxTreeMenuPopupComp.cells(rId, 14).getValue());
	console.log("우편 코드 : " + dhxTreeMenuPopupComp.cells(rId, 15).getValue());
	console.log("주소 : " + dhxTreeMenuPopupComp.cells(rId, 16).getValue());
	console.log("주소상세 : " + dhxTreeMenuPopupComp.cells(rId, 17).getValue());
	console.log("전화번호 : " + dhxTreeMenuPopupComp.cells(rId, 18).getValue());
	console.log("팩스 번호 : " + dhxTreeMenuPopupComp.cells(rId, 19).getValue());
	console.log("은행 코드 : " + dhxTreeMenuPopupComp.cells(rId, 20).getValue());
	console.log("HOMEPAGE : " + dhxTreeMenuPopupComp.cells(rId, 21).getValue());
	console.log("매입 여부 : " + dhxTreeMenuPopupComp.cells(rId, 22).getValue());
	console.log("매출처 여부 : " + dhxTreeMenuPopupComp.cells(rId, 23).getValue());
	console.log("거래처규모 구분 : " + dhxTreeMenuPopupComp.cells(rId, 24).getValue());
	console.log("과세 구분 : " + dhxTreeMenuPopupComp.cells(rId, 25).getValue());
	console.log("거래처 내용 : " + dhxTreeMenuPopupComp.cells(rId, 26).getValue());
	console.log("설립 일자 : " + dhxTreeMenuPopupComp.cells(rId, 27).getValue());
	console.log("자본 금액 : " + dhxTreeMenuPopupComp.cells(rId, 28).getValue());
	console.log("년 매출 금액 : " + dhxTreeMenuPopupComp.cells(rId, 29).getValue());
	console.log("사원 수 : " + dhxTreeMenuPopupComp.cells(rId, 30).getValue());
	console.log("무역업등록 번호 : " + dhxTreeMenuPopupComp.cells(rId, 31).getValue());
	console.log("통화 코드 : " + dhxTreeMenuPopupComp.cells(rId, 32).getValue());
	console.log("사용 여부 : " + dhxTreeMenuPopupComp.cells(rId, 33).getValue());
	console.log("장애인기업 여부 : " + dhxTreeMenuPopupComp.cells(rId, 34).getValue());
	console.log("여성대표기업 여부 : " + dhxTreeMenuPopupComp.cells(rId, 35).getValue());
	console.log("외자기업 여부 : " + dhxTreeMenuPopupComp.cells(rId, 36).getValue());
	console.log("중증장애인기업 여부 : " + dhxTreeMenuPopupComp.cells(rId, 37).getValue());
	console.log("사회적기업 여부 : " + dhxTreeMenuPopupComp.cells(rId, 38).getValue());
	console.log("장애자 표준 여부 : " + dhxTreeMenuPopupComp.cells(rId, 39).getValue());
	console.log("녹색제품 여부 : " + dhxTreeMenuPopupComp.cells(rId, 40).getValue());
	console.log("기술개발제품 여부 : " + dhxTreeMenuPopupComp.cells(rId, 41).getValue());
	*/
	
	 if(gformIdPopupComp != "" && gcodeIdPopupComp != ""){
    	 gobjPopupComp = '#' + gformIdPopupComp + " #" + gcodeIdPopupComp;
    	 $(gobjPopupComp).val(dhxTreeMenuPopupComp.cells(rId, 9).getValue());   //거래처코드
     }
     if(gformIdPopupComp != "" && gcodeNmIdPopupComp != ""){
    	 gobjPopupComp = '#' + gformIdPopupComp + " #" + gcodeNmIdPopupComp;
    	 $(gobjPopupComp).val(dhxTreeMenuPopupComp.cells(rId, 1).getValue());   //거래처명
    }
     
     if(gcustomerInfo != ""){
    	 var obj = eval("$" + gcustomerInfo);
    	 if(typeof obj == "object"){
	    	 obj.bcncCode        = dhxTreeMenuPopupComp.cells(rId, 9).getValue();   //거래처코드
	    	 obj.bcncNm 	     = dhxTreeMenuPopupComp.cells(rId, 1).getValue();   //거래처명
	    	 obj.bplcCode 	     = dhxTreeMenuPopupComp.cells(rId, 10).getValue();  //사업장 코드
	    	 obj.bcncSe 	     = dhxTreeMenuPopupComp.cells(rId, 11).getValue();  //거래처 구분
	    	 obj.bizrno 	     = dhxTreeMenuPopupComp.cells(rId, 2).getValue();   //사업자번호
	    	 obj.reprsntNm   	     = dhxTreeMenuPopupComp.cells(rId, 3).getValue();   //대표자
	    	 obj.induty 	     = dhxTreeMenuPopupComp.cells(rId, 4).getValue();   //업종
	    	 obj.bizcnd 	     = dhxTreeMenuPopupComp.cells(rId, 5).getValue();   //업태
	    	 obj.bankCode 	     = dhxTreeMenuPopupComp.cells(rId, 20).getValue();  //은행 코드
	    	 obj.bankNm 	     = dhxTreeMenuPopupComp.cells(rId, 6).getValue();   //은행명
	    	 obj.acnutNo 	     = dhxTreeMenuPopupComp.cells(rId, 7).getValue();   //계좌번호
	    	 obj.dpstrNm 	     = dhxTreeMenuPopupComp.cells(rId, 8).getValue();   //예금주
	    	 obj.cprSe 	         = dhxTreeMenuPopupComp.cells(rId, 12).getValue();  //법인 구분
	    	 obj.nltyCode        = dhxTreeMenuPopupComp.cells(rId, 13).getValue();  //국적 코드
	    	 obj.areaNm          = dhxTreeMenuPopupComp.cells(rId, 14).getValue();  //지역 명
	    	 obj.postCode        = dhxTreeMenuPopupComp.cells(rId, 15).getValue();  //우편 코드
	    	 obj.adres           = dhxTreeMenuPopupComp.cells(rId, 16).getValue();  //주소
	    	 obj.addr2           = dhxTreeMenuPopupComp.cells(rId, 17).getValue();  //주소상세
	    	 obj.telno           = dhxTreeMenuPopupComp.cells(rId, 18).getValue();  //전화번호
	    	 obj.faxNo           = dhxTreeMenuPopupComp.cells(rId, 19).getValue();  //팩스 번호
	    	 obj.homepage        = dhxTreeMenuPopupComp.cells(rId, 21).getValue();  //HOMEPAGE
	    	 obj.purchsAt        = dhxTreeMenuPopupComp.cells(rId, 22).getValue();  //매입 여부
	    	 obj.saleofficAt     = dhxTreeMenuPopupComp.cells(rId, 23).getValue();  //매출처 여부
	    	 obj.bcncscaleSe     = dhxTreeMenuPopupComp.cells(rId, 24).getValue();  //거래처규모 구분
	    	 obj.taxtSe          = dhxTreeMenuPopupComp.cells(rId, 25).getValue();  //과세 구분
	    	 obj.bcncCn          = dhxTreeMenuPopupComp.cells(rId, 26).getValue();  //거래처 내용
	    	 obj.fondDe          = dhxTreeMenuPopupComp.cells(rId, 27).getValue();  //설립 일자
	    	 obj.capitalAmt      = dhxTreeMenuPopupComp.cells(rId, 28).getValue();  //자본 금액
	    	 obj.yySaleAmt       = dhxTreeMenuPopupComp.cells(rId, 29).getValue();  //년 매출 금액
	    	 obj.emplCo          = dhxTreeMenuPopupComp.cells(rId, 30).getValue();  //사원 수
	    	 obj.tradeNo         = dhxTreeMenuPopupComp.cells(rId, 31).getValue();  //무역업등록 번호
	    	 obj.crncyCode       = dhxTreeMenuPopupComp.cells(rId, 32).getValue();  //통화 코드
	    	 obj.useAt           = dhxTreeMenuPopupComp.cells(rId, 33).getValue();  //사용 여부
	    	 obj.dsrprAt         = dhxTreeMenuPopupComp.cells(rId, 34).getValue();  //장애인기업 여부
	    	 obj.womanAt         = dhxTreeMenuPopupComp.cells(rId, 35).getValue();  //여성대표기업 여부
	    	 obj.foreignAt       = dhxTreeMenuPopupComp.cells(rId, 36).getValue();  //외자기업 여부
	    	 obj.serhandicapAt   = dhxTreeMenuPopupComp.cells(rId, 37).getValue();  //중증장애인기업 여부
	    	 obj.socialentrprsAt = dhxTreeMenuPopupComp.cells(rId, 38).getValue();  //사회적기업 여부
	    	 obj.dspsnStdAt      = dhxTreeMenuPopupComp.cells(rId, 39).getValue();  //장애자 표준 여부
	    	 obj.greenAt         = dhxTreeMenuPopupComp.cells(rId, 40).getValue();  //녹색제품 여부
	    	 obj.technologyAt    = dhxTreeMenuPopupComp.cells(rId, 41).getValue();  //기술개발제품 여부
	    	 obj.chargerNm       = dhxTreeMenuPopupComp.cells(rId, 42).getValue();  //장애자 표준 여부
             obj.chargerEmail    = dhxTreeMenuPopupComp.cells(rId, 43).getValue();  //녹색제품 여부
             obj.chargerTelno    = dhxTreeMenuPopupComp.cells(rId, 44).getValue();  //기술개발제품 여부
    	 }
    }
	$('#contractCompanyPopup .b-close').click();
}
</script>
 
<div class="pop-content">	 
    <div class="path_div">
    </div>
    <div class="consearch_div_in">
            <div class="consearch_input">
                <form id="searchFormPopupComp">
                    <ul class="consearchinput_list">
                        <li><span class="span">거래처명</span><input name="popupCompNm" id="popupCompNm"></li>
                        <li><span class="span">사업자등록번호</span><input name="popupBizrNo" id="popupBizrNo"></li>
                        <li><span class="span">사용유무</span><div id="divPopupRdUseAtComboEmp1" name="divPopupRdUseAtComboEmp1"  class="div_combo"></div></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnCompPupupSearch"><span
                                class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnCompPupupInit"><span
                                class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
				<div class="div_liner" id="gridPopupMenuComp" style="width: 100%; height: 430px;"></div>
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
</body>
