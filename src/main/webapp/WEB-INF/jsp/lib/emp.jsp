<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
    <script>
    var dhxGridPopupMenu;  //그리드 객체
    var eventIdPopupMenu = [];  //그리드 이벤트 객체 
    var gBplcCode = '1000'
    
    
    $(function() {
        cf_InitParamPopupMenu();
        if(cf_SetComponentsPopupMenu()){
           cf_SetEventListenerPopupMenu();
           cf_InitFormPopupMenu();
           cf_SetBindingPopupMenu();
        }
    });
    
    function cf_InitParamPopupMenu(){
        gf_ComboCode('divPopupHffsSeComboEmp1', 'searchComboHffsSe', 'searchComboHffsSe', 'search', 'C278', '' , '', '', 'asc', '');    //재직구분
        gf_FormSetValue('searchFormEmpPopup', 'searchComboHffsSe', 'J01', 'combo');
    }
    function cf_SetComponentsPopupMenu(){
    	//페이지에서 입력된 값을 팝업으로 가져와서 검색함
        var formId     = $("#empPopup").attr("formId");
        var codeId     = $("#empPopup").attr("codeId");
        var codeNmId   = $("#empPopup").attr("codeNmId");
        var empInfo    = $("#empPopup").attr("empInfo");
        var searchFlag = $("#empPopup").attr("searchFlag");
        
        
        
        var obj = "";
        
        if(typeof searchFlag != "undefined" && typeof codeId != "undefined" && searchFlag == "Y" && codeId != ""){
            obj = '#' + formId + " #" + codeId;
            gf_FormSetValue('searchFormEmpPopup', 'popupEmpNo', $.trim($(obj).val()), 'text');
        } else {
            gf_FormSetValue('searchFormEmpPopup', 'popupEmpNo', '', 'text');
        }
        
        if(typeof searchFlag != "undefined" && typeof codeNmId != "undefined" && searchFlag == "Y" && codeNmId != ""){
            obj = '#' + formId + " #" + codeNmId;
            gf_FormSetValue('searchFormEmpPopup', 'popupKorNm', $.trim($(obj).val()), 'text');
        } else {
            gf_FormSetValue('searchFormEmpPopup', 'popupKorNm', '', 'text');
        }
        
        gformIdPopupEmp = formId;
        gcodeIdPopupEmp = codeId;
        gcodeNmIdPopupEmp = codeNmId;
        gempInfo = empInfo;
            
        var dhxGridTreeMenuInfo = [];
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gv_TitNum,   '50', 'center', 'int', 'edn', false, 'num', '')); // 번호
        //dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNo'), '80', 'center', 'str', 'ro', false ,'empno', '')); // 사원번호
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNo'), '90', 'center', 'str', 'ro', false ,'empno', '')); // 사원번호
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNm'), '100', 'center', 'str', 'ro', false ,'korNm', '')); // 성명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPositionCode'), '120', 'center', 'str', 'ro', false ,'rspofcCodeNm', '')); // 직책
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCd'), '90', 'center', 'str', 'ro', false ,'deptCode', '')); // 부서 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMhsDept'), '*', 'left', 'str', 'ro', false ,'deptCodeNm', '')); // 부서 명 
        
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'engNm', '')); // 영문 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'chcrtNm', '')); // 한자 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ecnyDe', '')); // 입사 일자 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'retireDe', '')); // 퇴직 일자
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ihidnum', '')); // 주민등록번호 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'nltyCode', '')); // 국적 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'nltyCodeNm', '')); // 국적 코드 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'jssfcCode', '')); // 직종 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'jssfcCodeNm', '')); // 직종 코드 명 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'srclsCode', '')); // 호봉 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'clsfCode', '')); // 직급 코드 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'clsfCodeNm', '')); // 직급 코드 명 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ofcpsCode', '')); // 직위 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ofcpsCodeNm', '')); // 직위 코드 명 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'rspofcCode', '')); // 직책 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'zip', '')); // 우편번호
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ownhomAdres', '')); // 자택 주소 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ownhomDetailAdres', '')); // 자택 상세 주소
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ownhomEngAdres', '')); // 자택 영문 주소 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ownhomTelno', '')); // 자택 전화번호
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'lxtnTelno', '')); // 내선 전화번호 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'mbtlnum', '')); // 휴대폰번호 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'email', '')); // 이메일 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'brthdy', '')); // 생년월일 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'slrcldAt', '')); // 양력 여부
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'mrrgAt', '')); // 결혼 여부 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'mrrgAtNm', '')); // 결혼 여부 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'hdadptDeptCode', '')); // 겸임 부서 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'emplSe', '')); // 사원 구분
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'emplSeNm', '')); // 사원 구분 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'hffsSe', '')); // 재직 구분
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'hffsSeNm', '')); // 재직 구분 명 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'retireSe', '')); // 퇴직 구분
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'retireSeNm', '')); // 퇴직 구분 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'sexdstnSe', '')); // 성별 구분
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'sexdstnSeNm', '')); // 성별 구분 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'empnmSe', '')); // 채용 구분-삭제 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'empnmSeNm', '')); // 채용 구분 명-삭제
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'cashierAt', '')); // 출납담당 여부
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'hdadptAt', '')); // 겸임 여부
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'dprlrAt', '')); // 부서장 여부
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'lbunSbscrbAt', '')); // 노조 가입 여부
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'lbunSbscrbAtNm', '')); // 노조 가입 여부 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'mutaidSbscrbAt', '')); // 상조 가입 여부
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'dispWorkbAt', '')); // 파견 근무 여부 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'natvfrgnSeCode', '')); // 내외국인 구분 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'natvfrgnSeCodeNm', '')); // 내외국인 구분 코드 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ecnySeCode', '')); // 입사 구분 코드 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ecnySeCodeNm', '')); // 입사 구분 코드 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'bplcCode', '')); // 사업장코드 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'bplcCodeNm', '')); // 사업장코드 명 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'salpeakAt', '')); // 임금피크제 여부
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'flexbizAt', '')); // 유연근무제 여부
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true ,'ansalsysAt', '')); // 연봉제 여부
        
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'deptEngNm', '')); // 부서 영문 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'deptAbrv', '')); // 부서 약어
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'upperDeptCode', '')); // 상위 부서 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'upperDeptNm', '')); // 상위 부서 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'deptLvl', '')); // 부서 레벨
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'orgnztLvl', '')); // 조직 레벨
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'deptTelno', '')); // 부서 전화번호
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'deptFaxTelno', '')); // 부서 FAX 전화번호
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'useBeginDe', '')); // 사용 시작 일자
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'useAt', '')); // 사용 여부
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'deptSe', '')); // 부서 구분
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'sortOrdr', '')); // 출력 순서 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'upperDeptAt', '')); // 상위부서 존재 여부
    
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'jblnCode', '')); // 직렬 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'jblnCodeNm', '')); // 직렬 코드 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'dtyCode', '')); // 직무 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'dtyCodeNm', '')); // 직무 코드 명 
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'emgncTelno', '')); // 비상전화번호
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'indvdlEmail', '')); // 개인 이메일
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'hdadptDeptCodeNm', '')); // 겸임 부서 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'dispDeptCode', '')); // 파견 부서 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'dispDeptCodeNm', '')); // 파견 부서 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'babyShrtenWorkAt', '')); // 육아 단축 근무 여부
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'salaryAprpCode', '')); // 급여 책정 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'salaryAprpCodeNm', '')); // 급여 책정 코드 명
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'apntcSdt', '')); // 수습 시작일자
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'apntcEdt', '')); // 수습 종료일자
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'incmtaxrtCode', '')); // 소득세율 코드
        dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'incmtaxrtCodeNm', '')); // 소득세율 코드 명
        dhxGridEmpPopup = gf_MakeDhxGrid('gridPopupMenuEmp', dhxGridTreeMenuInfo, true, false, false);
        dhxGridEmpPopup.enableAutoHeight(false);
        
        return true;
    }
    
    function cf_SetEventListenerPopupMenu(){
        dhxGridEmpPopup.attachEvent("onRowDblClicked", function(rId,cInd){
            fn_SearchEmpOk(rId);
        });
        // 버튼 이벤트 ============================================================================================
        $('#btnEmpPopupSearch').unbind('click').bind('click', function() {
            gf_errorMsgClear();
            fn_SearchPopupEmp();
        });
        //초기화
        $('#btnEmpPupupInit').unbind('click').bind('click', function() {
            gf_errorMsgClear();
            $('#searchFormEmpPopup').resetForm();
            gf_FormSetValue('searchFormEmpPopup', 'searchComboHffsSe', 'J01', 'combo');
        });
        //닫기
        $('#btnEmpPupupClose').unbind('click').bind('click', function() {
            $('#empPopup .b-close').click();
        });
        $('#btnEmpPupupOk').unbind('click').bind('click', function() {
            var selectedId = dhxGridEmpPopup.getSelectedRowId();
            fn_SearchEmpOk(selectedId);
        });
        // 기타 이벤트 ============================================================================================
        //부서 선택 Popup
        $('#searchFormEmpPopup #btnDeptCodeSearch').unbind('click').bind('click', function(event){
            gf_DeptPopup("searchFormEmpPopup","deptCodeEmpPopup","deptCodeNmEmpPopup", gBplcCode, "Y", "");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
        });
        //부서 입력 후 Enter 이벤트
        $('#deptCodeEmpPopup').unbind('keydown').bind('keydown',function(event) {
            if (event.keyCode != 13 && event.keyCode != 9) {
                gf_FormSetValue('searchFormEmpPopup', 'deptCodeNmEmpPopup', '', 'text');
            }
        });
        $('#deptCodeNmEmpPopup').unbind('keydown').bind('keydown',function(event) {
            if (event.keyCode != 13 && event.keyCode != 9) {
                gf_FormSetValue('searchFormEmpPopup', 'deptCodeEmpPopup', '', 'text');
            }
        });

        //enter이벤트 구분 이유 : (#searchForm input, select, button, textarea)의 경우 팝업이 닫힌 뒤 textarea의 엔터키가 안되는 오류 발생
        $('#deptCodeEmpPopup').unbind('keydown').bind('keydown',function(event) {
            if (event.keyCode == 13) {
            	fn_SearchDeptCode();
            }
        });
        $('#deptCodeNmEmpPopup').unbind('keydown').bind('keydown',function(event) {
            if (event.keyCode == 13) {
            	fn_SearchDeptCode();
            }
        });
        $('#popupEmpNo').unbind('keydown').bind('keydown',function(event) {
            if (event.keyCode == 13) {
            	fn_SearchPopupEmp();
            }
        });
        $('#popupKorNm').unbind('keydown').bind('keydown',function(event) {
            if (event.keyCode == 13) {
            	fn_SearchPopupEmp();
            }
        });
    }
    
    function cf_SetBindingPopupMenu(){
        fn_SearchPopupEmp();
    }
    
    function cf_InitFormPopupMenu(){
    	$('#popupKorNm').focus();
    }
    /**
     * 조회
     */
    function fn_SearchPopupEmp(){
    	var jsonParameter = {
        		empno    : gf_FormGetValue('searchFormEmpPopup', 'popupEmpNo', 'text'),
    	   		korNm    : gf_FormGetValue('searchFormEmpPopup', 'popupKorNm', 'text'),
    	   		hffsSe   : gf_FormGetValue('searchFormEmpPopup', 'searchComboHffsSe', 'combo'),
    	   		deptCode : gf_FormGetValue('searchFormEmpPopup', 'deptCodeEmpPopup', 'text'),
    	   		deptNm   : gf_FormGetValue('searchFormEmpPopup', 'deptCodeNmEmpPopup', 'text'),
    	    	bplcCode : gBplcCode
    	};
    	gf_Transaction('gridPopupMenuEmp', 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchGridListEmp', false, 'GET');
    }
    
    function fn_CallbackSearchGridListEmp (strSvcID, targetID, data){
        dhxGridEmpPopup.clearAll();
        if(!gf_IsNull(data.data.records)){
            dhxGridEmpPopup.parse(data.data.records, 'js');
            gf_NoFoundDataOnGridMsgRemove('gridPopupMenuEmp');
        } else {
            //gf_DivMsgAlert(gv_MsgNoData);
            gf_NoFoundDataOnGridMsg('gridPopupMenuEmp'); 
        }
        $("#spanCntEmp").text(gf_NumberWithCommas(data.data.records.length));
        cf_SetEventListenerPopupMenu();
    }
    function fn_SearchEmpOk(rId){
        
        var obj = "";
         if(gformIdPopupEmp != "" && gcodeIdPopupEmp != ""){
             obj = '#' + gformIdPopupEmp + " #" + gcodeIdPopupEmp;
             $(obj).val(dhxGridEmpPopup.cells(rId, 1).getValue()).change();   //사원번호
         } 
         if(gformIdPopupEmp != "" && gcodeNmIdPopupEmp != ""){
             obj = '#' + gformIdPopupEmp + " #" + gcodeNmIdPopupEmp;
             $(obj).val(dhxGridEmpPopup.cells(rId, 2).getValue()).change();   //사원명
        }
         
         /*
        console.log("사원번호 : " + dhxGridEmpPopup.cells(rId, 1).getValue());
        console.log("성명 : " + dhxGridEmpPopup.cells(rId, 2).getValue());
        console.log("직책 : " + dhxGridEmpPopup.cells(rId, 3).getValue());
        console.log("부서코드 : " + dhxGridEmpPopup.cells(rId, 4).getValue());
        console.log("부서 한글 명 : " + dhxGridEmpPopup.cells(rId, 5).getValue());
        console.log("영문 명 : " + dhxGridEmpPopup.cells(rId, 6).getValue());
        console.log("한자 명 : " + dhxGridEmpPopup.cells(rId, 7).getValue());
        console.log("입사 일자  : " + dhxGridEmpPopup.cells(rId, 8).getValue());
        console.log("퇴직 일자  : " + dhxGridEmpPopup.cells(rId, 9).getValue());
        console.log("주민등록번호   : " + dhxGridEmpPopup.cells(rId, 10).getValue());
        console.log("국적 코드   : " + dhxGridEmpPopup.cells(rId, 11).getValue());
        console.log("국적 코드 명   : " + dhxGridEmpPopup.cells(rId, 12).getValue());
        console.log("직종 코드   : " + dhxGridEmpPopup.cells(rId, 13).getValue());
        console.log("직종 코드 명   : " + dhxGridEmpPopup.cells(rId, 14).getValue());
        console.log("호봉 코드   : " + dhxGridEmpPopup.cells(rId, 15).getValue());
        console.log("직급 코드   : " + dhxGridEmpPopup.cells(rId, 16).getValue());
        console.log("직급 코드 명   : " + dhxGridEmpPopup.cells(rId, 17).getValue());
        console.log("직위 코드   : " + dhxGridEmpPopup.cells(rId, 18).getValue());
        console.log("직위 코드 명   : " + dhxGridEmpPopup.cells(rId, 19).getValue());
        console.log("직책 코드   : " + dhxGridEmpPopup.cells(rId, 20).getValue());
        console.log("우편번호   : " + dhxGridEmpPopup.cells(rId, 21).getValue());
        console.log("자택 주소   : " + dhxGridEmpPopup.cells(rId, 22).getValue());
        console.log("자택 상세 주소  : " + dhxGridEmpPopup.cells(rId, 23).getValue());
        console.log("자택 영문 주소  : " + dhxGridEmpPopup.cells(rId, 24).getValue());
        console.log("자택 전화번호   : " + dhxGridEmpPopup.cells(rId, 25).getValue());
        console.log("내선 전화번호   : " + dhxGridEmpPopup.cells(rId, 26).getValue());
        console.log("휴대폰번호   : " + dhxGridEmpPopup.cells(rId, 27).getValue());
        console.log("이메일   : " + dhxGridEmpPopup.cells(rId, 28).getValue());
        console.log("생년월일   : " + dhxGridEmpPopup.cells(rId, 29).getValue());
        console.log("양력 여부   : " + dhxGridEmpPopup.cells(rId, 30).getValue());
        console.log("결혼 여부   : " + dhxGridEmpPopup.cells(rId, 31).getValue());
        console.log("결혼 여부 명   : " + dhxGridEmpPopup.cells(rId, 32).getValue());
        console.log("겸임 부서 코드   : " + dhxGridEmpPopup.cells(rId, 33).getValue());
        console.log("사원 구분   : " + dhxGridEmpPopup.cells(rId, 34).getValue());
        console.log("사원 구분 명   : " + dhxGridEmpPopup.cells(rId, 35).getValue());
        console.log("재직 구분   : " + dhxGridEmpPopup.cells(rId, 36).getValue());
        console.log("재직 구분 명   : " + dhxGridEmpPopup.cells(rId, 37).getValue());
        console.log("퇴직 구분   : " + dhxGridEmpPopup.cells(rId, 38).getValue());
        console.log("퇴직 구분 명   : " + dhxGridEmpPopup.cells(rId, 39).getValue());
        console.log("성별 구분   : " + dhxGridEmpPopup.cells(rId, 40).getValue());
        console.log("성별 구분 명   : " + dhxGridEmpPopup.cells(rId, 41).getValue());
        //console.log("채용 구분   : " + dhxGridEmpPopup.cells(rId, 42).getValue());
        //console.log("채용 구분 명   : " + dhxGridEmpPopup.cells(rId, 43).getValue());
        console.log("출납담당 여부   : " + dhxGridEmpPopup.cells(rId, 44).getValue());
        console.log("겸임 여부   : " + dhxGridEmpPopup.cells(rId, 45).getValue());
        console.log("부서장 여부   : " + dhxGridEmpPopup.cells(rId, 46).getValue());
        console.log("노조 가입 여부   : " + dhxGridEmpPopup.cells(rId, 47).getValue());
        console.log("노조 가입 여부 명   : " + dhxGridEmpPopup.cells(rId, 48).getValue());
        console.log("상조 가입 여부   : " + dhxGridEmpPopup.cells(rId, 49).getValue());
        console.log("파견 근무 여부   : " + dhxGridEmpPopup.cells(rId, 50).getValue());
        console.log("내외국인 구분 코드   : " + dhxGridEmpPopup.cells(rId, 51).getValue());
        console.log("내외국인 구분 코드 명   : " + dhxGridEmpPopup.cells(rId, 52).getValue());
        console.log("입사 구분 코드   : " + dhxGridEmpPopup.cells(rId, 53).getValue());
        console.log("입사 구분 코드 명   : " + dhxGridEmpPopup.cells(rId, 54).getValue());
        console.log("사업장코드   : " + dhxGridEmpPopup.cells(rId, 55).getValue());
        console.log("사업장코드 명   : " + dhxGridEmpPopup.cells(rId, 56).getValue());
        console.log("임금피크제 여부   : " + dhxGridEmpPopup.cells(rId, 57).getValue());
        console.log("유연근무제 여부   : " + dhxGridEmpPopup.cells(rId, 58).getValue());
        console.log("연봉제 여부   : " + dhxGridEmpPopup.cells(rId, 59).getValue());
        
        console.log("부서 영문 명 : " + dhxGridEmpPopup.cells(rId, 60).getValue());
        console.log("부서 약어 : " + dhxGridEmpPopup.cells(rId, 61).getValue());
        console.log("상위 부서 코드 : " + dhxGridEmpPopup.cells(rId, 62).getValue());
        console.log("상위 부서 명 : " + dhxGridEmpPopup.cells(rId, 63).getValue());
        console.log("부서 레벨 : " + dhxGridEmpPopup.cells(rId, 64).getValue());
        console.log("조직 레벨 : " + dhxGridEmpPopup.cells(rId, 65).getValue());
        console.log("부서 전화번호 : " + dhxGridEmpPopup.cells(rId, 66).getValue());
        console.log("부서 FAX 전화번호 : " + dhxGridEmpPopup.cells(rId, 67).getValue());
        console.log("사용 시작 일자 : " + dhxGridEmpPopup.cells(rId, 68).getValue());
        console.log("사용 여부 : " + dhxGridEmpPopup.cells(rId, 69).getValue());
        console.log("부서 구분 : " + dhxGridEmpPopup.cells(rId, 70).getValue());
        console.log("출력 순서 : " + dhxGridEmpPopup.cells(rId, 71).getValue());
        console.log("상위부서 존재 여부 : " + dhxGridEmpPopup.cells(rId, 72).getValue());
    
        console.log("직렬 코드 : " + dhxGridEmpPopup.cells(rId, 73).getValue());
        console.log("직렬 코드 명 : " + dhxGridEmpPopup.cells(rId, 74).getValue());
        console.log("직무 코드 : " + dhxGridEmpPopup.cells(rId, 75).getValue());
        console.log("직무 코드 명 : " + dhxGridEmpPopup.cells(rId, 76).getValue());
        console.log("비상전화번호 : " + dhxGridEmpPopup.cells(rId, 77).getValue());
        console.log("개인 이메일 : " + dhxGridEmpPopup.cells(rId, 78).getValue());
        console.log("겸임 부서 명 : " + dhxGridEmpPopup.cells(rId, 79).getValue());
        console.log("파견 부서 코드 : " + dhxGridEmpPopup.cells(rId, 80).getValue());
        console.log("파견 부서 명 : " + dhxGridEmpPopup.cells(rId, 81).getValue());
        console.log("육아 단축 근무 여부 : " + dhxGridEmpPopup.cells(rId, 82).getValue());
        console.log("급여 책정 코드 : " + dhxGridEmpPopup.cells(rId, 83).getValue());
        console.log("급여 책정 코드 명 : " + dhxGridEmpPopup.cells(rId, 84).getValue());
        console.log("수습 시작일자 : " + dhxGridEmpPopup.cells(rId, 85).getValue());
        console.log("수습 종료일자 : " + dhxGridEmpPopup.cells(rId, 86).getValue());
        console.log("소득세율 코드 : " + dhxGridEmpPopup.cells(rId, 87).getValue());
        console.log("소득세율 코드 명 : " + dhxGridEmpPopup.cells(rId, 88).getValue());
        */
             
        if(gempInfo != ""){
            obj = eval("$" + gempInfo);
            if(typeof obj == "object"){
                obj.empno             = dhxGridEmpPopup.cells(rId, 1).getValue();    //사원번호
                obj.korNm             = dhxGridEmpPopup.cells(rId, 2).getValue();    //성명
                obj.rspofcCodeNm      = dhxGridEmpPopup.cells(rId, 3).getValue();    //직책
                obj.deptCode          = dhxGridEmpPopup.cells(rId, 4).getValue();    //부서 코드 
                obj.deptCodeNm        = dhxGridEmpPopup.cells(rId, 5).getValue();    //부서 명
    
                obj.engNm             = dhxGridEmpPopup.cells(rId, 6).getValue();    //영문 명
                obj.chcrtNm           = dhxGridEmpPopup.cells(rId, 7).getValue();    //한자 명
                obj.ecnyDe            = dhxGridEmpPopup.cells(rId, 8).getValue();    //입사 일자
                obj.retireDe          = dhxGridEmpPopup.cells(rId, 9).getValue();    //퇴직 일자
                obj.ihidnum           = dhxGridEmpPopup.cells(rId, 10).getValue();   //주민등록번호
                obj.nltyCode          = dhxGridEmpPopup.cells(rId, 11).getValue();   //국적 코드
                obj.nltyCodeNm        = dhxGridEmpPopup.cells(rId, 12).getValue();   //국적 코드 명
                obj.jssfcCode         = dhxGridEmpPopup.cells(rId, 13).getValue();   //직종 코드
                obj.jssfcCodeNm       = dhxGridEmpPopup.cells(rId, 14).getValue();   //직종 코드 명
                obj.srclsCode         = dhxGridEmpPopup.cells(rId, 15).getValue();   //호봉 코드
                obj.clsfCode          = dhxGridEmpPopup.cells(rId, 16).getValue();   //직급 코드
                obj.clsfCodeNm        = dhxGridEmpPopup.cells(rId, 17).getValue();   //직급 코드 명
                obj.ofcpsCode         = dhxGridEmpPopup.cells(rId, 18).getValue();   //직위 코드
                obj.ofcpsCodeNm       = dhxGridEmpPopup.cells(rId, 19).getValue();   //직위 코드 명
                obj.rspofcCode        = dhxGridEmpPopup.cells(rId, 20).getValue();   //직책 코드
                obj.zip               = dhxGridEmpPopup.cells(rId, 21).getValue();   //우편번호
                obj.ownhomAdres       = dhxGridEmpPopup.cells(rId, 22).getValue();   //자택 주소
                obj.ownhomDetailAdres = dhxGridEmpPopup.cells(rId, 23).getValue();   //자택 상세 주소
                obj.ownhomEngAdres    = dhxGridEmpPopup.cells(rId, 24).getValue();   //자택 영문 주소
                obj.ownhomTelno       = dhxGridEmpPopup.cells(rId, 25).getValue();   //자택 전화번호
                obj.lxtnTelno         = dhxGridEmpPopup.cells(rId, 26).getValue();   //내선 전화번호
                obj.mbtlnum           = dhxGridEmpPopup.cells(rId, 27).getValue();   //휴대폰번호
                obj.email             = dhxGridEmpPopup.cells(rId, 28).getValue();   //이메일
                obj.brthdy            = dhxGridEmpPopup.cells(rId, 29).getValue();   //생년월일
                obj.slrcldAt          = dhxGridEmpPopup.cells(rId, 30).getValue();   //양력 여부
                obj.mrrgAt            = dhxGridEmpPopup.cells(rId, 31).getValue();   //결혼 여부
                obj.mrrgAtNm          = dhxGridEmpPopup.cells(rId, 32).getValue();   //결혼 여부 명
                obj.hdadptDeptCode    = dhxGridEmpPopup.cells(rId, 33).getValue();   //겸임 부서 코드
                obj.emplSe            = dhxGridEmpPopup.cells(rId, 34).getValue();   //사원 구분
                obj.emplSeNm          = dhxGridEmpPopup.cells(rId, 35).getValue();   //사원 구분 명
                obj.hffsSe            = dhxGridEmpPopup.cells(rId, 36).getValue();   //재직 구분
                obj.hffsSeNm          = dhxGridEmpPopup.cells(rId, 37).getValue();   //재직 구분 명
                obj.retireSe          = dhxGridEmpPopup.cells(rId, 38).getValue();   //퇴직 구분
                obj.retireSeNm        = dhxGridEmpPopup.cells(rId, 39).getValue();   //퇴직 구분 명
                obj.sexdstnSe         = dhxGridEmpPopup.cells(rId, 40).getValue();   //성별 구분
                obj.sexdstnSeNm       = dhxGridEmpPopup.cells(rId, 41).getValue();   //성별 구분 명
                //obj.empnmSe           = dhxGridEmpPopup.cells(rId, 42).getValue();   //채용 구분
                //obj.empnmSeNm         = dhxGridEmpPopup.cells(rId, 43).getValue();   //채용 구분 명
                obj.cashierAt         = dhxGridEmpPopup.cells(rId, 44).getValue();   //출납담당 여부
                obj.hdadptAt          = dhxGridEmpPopup.cells(rId, 45).getValue();   //겸임 여부
                obj.dprlrAt           = dhxGridEmpPopup.cells(rId, 46).getValue();   //부서장 여부
                obj.lbunSbscrbAt      = dhxGridEmpPopup.cells(rId, 47).getValue();   //노조 가입 여부
                obj.lbunSbscrbAtNm    = dhxGridEmpPopup.cells(rId, 48).getValue();   //노조 가입 여부 명
                obj.mutaidSbscrbAt    = dhxGridEmpPopup.cells(rId, 49).getValue();   //상조 가입 여부
                obj.dispWorkbAt       = dhxGridEmpPopup.cells(rId, 50).getValue();   //파견 근무 여부
                obj.natvfrgnSeCode    = dhxGridEmpPopup.cells(rId, 51).getValue();   //내외국인 구분 코드
                obj.natvfrgnSeCodeNm  = dhxGridEmpPopup.cells(rId, 52).getValue();   //내외국인 구분 코드 명
                obj.ecnySeCode        = dhxGridEmpPopup.cells(rId, 53).getValue();   //입사 구분 코드
                obj.ecnySeCodeNm      = dhxGridEmpPopup.cells(rId, 54).getValue();   //입사 구분 코드 명
                obj.bplcCode          = dhxGridEmpPopup.cells(rId, 55).getValue();   //사업장코드
                obj.bplcCodeNm        = dhxGridEmpPopup.cells(rId, 56).getValue();   //사업장코드 명
                obj.salpeakAt         = dhxGridEmpPopup.cells(rId, 57).getValue();   //임금피크제 여부
                obj.flexbizAt         = dhxGridEmpPopup.cells(rId, 58).getValue();   //유연근무제 여부
                obj.ansalsysAt        = dhxGridEmpPopup.cells(rId, 59).getValue();   //연봉제 여부
                
                obj.deptEngNm         = dhxGridEmpPopup.cells(rId, 60).getValue();   //부서 영문 명
                obj.deptAbrv          = dhxGridEmpPopup.cells(rId, 61).getValue();   //부서 약어
                obj.upperDeptCode     = dhxGridEmpPopup.cells(rId, 62).getValue();   //상위 부서 코드
                obj.upperDeptNm       = dhxGridEmpPopup.cells(rId, 63).getValue();   //상위 부서 명
                obj.deptLvl           = dhxGridEmpPopup.cells(rId, 64).getValue();   //부서 레벨
                obj.orgnztLvl         = dhxGridEmpPopup.cells(rId, 65).getValue();   //조직 레벨
                obj.deptTelno         = dhxGridEmpPopup.cells(rId, 66).getValue();   //부서 전화번호
                obj.deptFaxTelno      = dhxGridEmpPopup.cells(rId, 67).getValue();   //부서 FAX 전화번호
                obj.useBeginDe        = dhxGridEmpPopup.cells(rId, 68).getValue();   //사용 시작 일자
                obj.useAt             = dhxGridEmpPopup.cells(rId, 69).getValue();   //사용 여부
                obj.deptSe            = dhxGridEmpPopup.cells(rId, 70).getValue();   //부서 구분
                obj.sortOrdr          = dhxGridEmpPopup.cells(rId, 71).getValue();   //출력 순서
                obj.upperDeptAt       = dhxGridEmpPopup.cells(rId, 72).getValue();   //상위부서 존재 여부
    
                obj.jblnCode          = dhxGridEmpPopup.cells(rId, 73).getValue();   // 직렬 코드
                obj.jblnCodeNm        = dhxGridEmpPopup.cells(rId, 74).getValue();   // 직렬 코드 명 
                obj.dtyCode           = dhxGridEmpPopup.cells(rId, 75).getValue();   // 직무 코드
                obj.dtyCodeNm         = dhxGridEmpPopup.cells(rId, 76).getValue();   // 직무 코드 명
                obj.emgncTelno        = dhxGridEmpPopup.cells(rId, 77).getValue();   // 비상전화번호
                obj.indvdlEmail       = dhxGridEmpPopup.cells(rId, 78).getValue();   // 개인 이메일
                obj.hdadptDeptCodeNm  = dhxGridEmpPopup.cells(rId, 79).getValue();   // 겸임 부서 명
                obj.dispDeptCode      = dhxGridEmpPopup.cells(rId, 80).getValue();   // 파견 부서 코드
                obj.dispDeptCodeNm    = dhxGridEmpPopup.cells(rId, 81).getValue();   // 파견 부서 명
                obj.babyShrtenWorkAt  = dhxGridEmpPopup.cells(rId, 82).getValue();   // 육아 단축 근무 여부
                obj.salaryAprpCode    = dhxGridEmpPopup.cells(rId, 83).getValue();   // 급여 책정 코드
                obj.salaryAprpCodeNm  = dhxGridEmpPopup.cells(rId, 84).getValue();   // 급여 책정 코드 명
                obj.apntcSdt          = dhxGridEmpPopup.cells(rId, 85).getValue();   // 수습 시작일자
                obj.apntcEdt          = dhxGridEmpPopup.cells(rId, 86).getValue();   // 수습 종료일자
                obj.incmtaxrtCode     = dhxGridEmpPopup.cells(rId, 87).getValue();   // 소득세율 코드
                obj.incmtaxrtCodeNm   = dhxGridEmpPopup.cells(rId, 88).getValue();   // 소득세율 코드 명
            }
        }
        $('#empPopup .b-close').click();
    }
    
    //--부서 입력 후 Enter 이벤트
    function fn_SearchDeptCode(){
        var deptCode = gf_FormGetValue('searchFormEmpPopup', 'deptCodeEmpPopup', 'text');
        var deptKorNm = gf_FormGetValue('searchFormEmpPopup', 'deptCodeNmEmpPopup', 'text');
        var jsonParameter = {
                deptCode : deptCode,
                deptKorNm : deptKorNm,
                useAt : '1',
                bplcCode : gBplcCode
        };
        gf_Transaction('list_type01', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchDeptCode', false, 'GET');
    }
    function fn_CallbackSearchDeptCode (strSvcID, targetID, data){
        var totCnt = data.data.records.length;
        //alert(totCnt);
        if(!gf_IsNull(data.data.records) && totCnt == 1){
            //단건
            var data = data.data.records[0];
            gf_FormSetValue('searchFormEmpPopup', 'deptCodeEmpPopup', data.deptCode, 'text');
            gf_FormSetValue('searchFormEmpPopup', 'deptCodeNmEmpPopup', data.deptKorNm, 'text');
    
        } 
        else {
            //Popup 호출
           gf_DeptPopup("searchFormEmpPopup","deptCodeEmpPopup","deptCodeNmEmpPopup", gBplcCode, "Y"); 
        }
    }
    </script>
 
    <div class="pop-content">
        <div class="path_div">
        </div>
        <form id="searchFormEmpPopup">
            <div class="consearch_div_in">
                <div class="consearch_input">
                        <ul class="consearchinput_list">
                            <li><span class="span">사원번호</span><input name="popupEmpNo" id="popupEmpNo" class="w70"></li>
                            <li><span class="span">&nbsp;성명&nbsp;&nbsp;</span><input name="popupKorNm" id="popupKorNm" class="w120"></li>
                            
                            <li><span class="span">재직구분</span><div id="divPopupHffsSeComboEmp1" class="div_combo"></div></li>
                        </ul>
                </div>
            </div>
            <div class="consearch_div_in">
                <div class="consearch_input">
                        <ul class="consearchinput_list">
                            <li><span class="span">부서코드</span><input name="deptCodeEmpPopup" id="deptCodeEmpPopup" class="w70"></li>
                            <li><span class="span">부서명</span><input type="text" id="deptCodeNmEmpPopup" name="deptCodeNmEmpPopup" class="w90"/>
                                <button type="button" id="btnDeptCodeSearch" class="btn_common03">
                                    <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                </button><div style="visibility:hidden" id="divPopupStmBizplcComboEmp1" name="divPopupStmBizplcComboEmp1"  class="div_combo"></div></li>
                        </ul>
                </div>
                <div class="consearchbt_div_in">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnEmpPopupSearch"><span
                                    class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnEmpPupupInit"><span
                                    class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
        </form>
        <div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntEmp"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div>
                <div class="div_liner" id="gridPopupMenuEmp" style="width: 100%; height: 325px"></div>
            </div>
            <div class="popup_footer_box">
                <button type="button" id="btnEmpPupupOk" name="btnEmpPupupOk">
                    <span class="glyphicon glyphicon-ok f15 mr5"></span>확인<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                </button>
                <button type="button" id="btnEmpPupupClose" name="btnEmpPupupClose">
                    <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
            </div>
        </div>
    </div>
</body>
