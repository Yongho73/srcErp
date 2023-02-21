<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxGridMultiEmpPopup;

var gformIdPopupEmp;
var gcodeIdPopupEmp;
var gcodeNmIdPopupEmp;
var gempInfo;


$(function() {  
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
    cf_InitFormPopupMenu();
});

function cf_InitParamPopupMenu(){
    //재직구분
                // divId, selectId(지정ID),  selectName(지정명), placeHolder(=search or add), codekindCode, exceptCode(=코드), selectStyle, selectClass, sortOrder, required
    gf_ComboCode('divPopupHffsSeComboEmp1', 'searchComboC278Emp1', 'searchComboC278Emp1', 'search', 'C278', '' , '', '', 'asc', '');
    
    
    //사업장
    var stmBizplcCode = $("#empPopup").attr("stmBizplcCode");
    var searchFlag    = $("#empPopup").attr("searchFlag");
    if(typeof searchFlag != "undefined" && typeof stmBizplcCode != "undefined" && searchFlag == "Y" && stmBizplcCode != ""){
        //사업장
        gf_MakeComboBasic('divPopupStmBizplcComboEmp1', 'searchComboStmBizplcEmp1', '', 'width:0px', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', stmBizplcCode);
    }
    else {
        //사업장
        gf_MakeComboBasic('divPopupStmBizplcComboEmp1', 'searchComboStmBizplcEmp1', '', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '1000');
    }

    if($("#searchComboC278Emp1").val() != "J01"){
        // value 값으로 선택
        $("#searchComboC278Emp1").val("J01").prop("selected", true); //재직구분 - 재직
    }
}
function cf_SetComponentsPopupMenu(){
    var formId     = $("#empPopup").attr("formId");
    var codeId     = $("#empPopup").attr("codeId");
    var codeNmId   = $("#empPopup").attr("codeNmId");
    var empInfo    = $("#empPopup").attr("empInfo");
    var searchFlag = $("#empPopup").attr("searchFlag");
    
    var obj = "";
    
    if(typeof searchFlag != "undefined" && typeof codeId != "undefined" && searchFlag == "Y" && codeId != ""){
        obj = '#' + formId + " #" + codeId;
        gf_FormSetValue('searchFormEmpPopup', 'popupEmpNo', $.trim($(obj).val()), 'text');
    }
    else {
        gf_FormSetValue('searchFormEmpPopup', 'popupEmpNo', '', 'text');
    }
    
    if(typeof searchFlag != "undefined" && typeof codeNmId != "undefined" && searchFlag == "Y" && codeNmId != ""){
        obj = '#' + formId + " #" + codeNmId;
        gf_FormSetValue('searchFormEmpPopup', 'popupKorNm', $.trim($(obj).val()), 'text');
    }
    else {
        gf_FormSetValue('searchFormEmpPopup', 'popupKorNm', '', 'text');
    }
    
    gformIdPopupEmp = formId;
    gcodeIdPopupEmp = codeId;
    gcodeNmIdPopupEmp = codeNmId;
    gempInfo = empInfo;
        
    var dhxGridTreeMenuInfo = [];
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   '50', 'center', 'int', 'edn', false, 'num', '')); // 번호
    //dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNo'), '80', 'center', 'str', 'ro', false ,'empno', '')); // 사원번호
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllEmp" />', '40', 'center', 'na', 'ch', false, 'selYn', ''));
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("사원번호", '80', 'center', 'str', 'ro', false ,'empno', '')); // 사원번호
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNm'), '150', 'center', 'str', 'ro', false ,'korNm', '')); // 성명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPositionCode'), '100', 'center', 'str', 'ro', false ,'rspofcCodeNm', '')); // 직책
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCd'), '80', 'center', 'str', 'ro', false ,'deptCode', '')); // 부서 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMhsDept'), '*', 'center', 'str', 'ro', false ,'deptCodeNm', '')); // 부서 명 
    
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'engNm', '')); // 영문 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'chcrtNm', '')); // 한자 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ecnyDe', '')); // 입사 일자 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'retireDe', '')); // 퇴직 일자
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ihidnum', '')); // 주민등록번호 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'nltyCode', '')); // 국적 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'nltyCodeNm', '')); // 국적 코드 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'jssfcCode', '')); // 직종 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'jssfcCodeNm', '')); // 직종 코드 명 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'srclsCode', '')); // 호봉 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'clsfCode', '')); // 직급 코드 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'clsfCodeNm', '')); // 직급 코드 명 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ofcpsCode', '')); // 직위 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ofcpsCodeNm', '')); // 직위 코드 명 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'rspofcCode', '')); // 직책 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'zip', '')); // 우편번호
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ownhomAdres', '')); // 자택 주소 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ownhomDetailAdres', '')); // 자택 상세 주소
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ownhomEngAdres', '')); // 자택 영문 주소 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ownhomTelno', '')); // 자택 전화번호
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'lxtnTelno', '')); // 내선 전화번호 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'mbtlnum', '')); // 휴대폰번호 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'email', '')); // 이메일 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'brthdy', '')); // 생년월일 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'slrcldAt', '')); // 양력 여부
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'mrrgAt', '')); // 결혼 여부 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'mrrgAtNm', '')); // 결혼 여부 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'hdadptDeptCode', '')); // 겸임 부서 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'emplSe', '')); // 사원 구분
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'emplSeNm', '')); // 사원 구분 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'hffsSe', '')); // 재직 구분
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'hffsSeNm', '')); // 재직 구분 명 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'retireSe', '')); // 퇴직 구분
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'retireSeNm', '')); // 퇴직 구분 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'sexdstnSe', '')); // 성별 구분
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'sexdstnSeNm', '')); // 성별 구분 명
//  dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'empnmSe', '')); // 채용 구분-삭제 
//  dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'empnmSeNm', '')); // 채용 구분 명-삭제
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'cashierAt', '')); // 출납담당 여부
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'hdadptAt', '')); // 겸임 여부
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'dprlrAt', '')); // 부서장 여부
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'lbunSbscrbAt', '')); // 노조 가입 여부
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'lbunSbscrbAtNm', '')); // 노조 가입 여부 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'mutaidSbscrbAt', '')); // 상조 가입 여부
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'dispWorkbAt', '')); // 파견 근무 여부 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'natvfrgnSeCode', '')); // 내외국인 구분 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'natvfrgnSeCodeNm', '')); // 내외국인 구분 코드 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ecnySeCode', '')); // 입사 구분 코드 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ecnySeCodeNm', '')); // 입사 구분 코드 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'bplcCode', '')); // 사업장코드 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'bplcCodeNm', '')); // 사업장코드 명 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'salpeakAt', '')); // 임금피크제 여부
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'flexbizAt', '')); // 유연근무제 여부
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'ansalsysAt', '')); // 연봉제 여부
    
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'deptEngNm', '')); // 부서 영문 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'deptAbrv', '')); // 부서 약어
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'upperDeptCode', '')); // 상위 부서 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'upperDeptNm', '')); // 상위 부서 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'deptLvl', '')); // 부서 레벨
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'orgnztLvl', '')); // 조직 레벨
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'deptTelno', '')); // 부서 전화번호
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'deptFaxTelno', '')); // 부서 FAX 전화번호
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'useBeginDe', '')); // 사용 시작 일자
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'useAt', '')); // 사용 여부
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'deptSe', '')); // 부서 구분
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'sortOrdr', '')); // 출력 순서 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'upperDeptAt', '')); // 상위부서 존재 여부

    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'jblnCode', '')); // 직렬 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'jblnCodeNm', '')); // 직렬 코드 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'dtyCode', '')); // 직무 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'dtyCodeNm', '')); // 직무 코드 명 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'emgncTelno', '')); // 비상전화번호
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'indvdlEmail', '')); // 개인 이메일
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'hdadptDeptCodeNm', '')); // 겸임 부서 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'dispDeptCode', '')); // 파견 부서 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'dispDeptCodeNm', '')); // 파견 부서 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'babyShrtenWorkAt', '')); // 육아 단축 근무 여부
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'salaryAprpCode', '')); // 급여 책정 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'salaryAprpCodeNm', '')); // 급여 책정 코드 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'apntcSdt', '')); // 수습 시작일자
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'apntcEdt', '')); // 수습 종료일자
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'incmtaxrtCode', '')); // 소득세율 코드
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'incmtaxrtCodeNm', '')); // 소득세율 코드 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'userId', '')); // USER ID
    
    
    dhxGridMultiEmpPopup = gf_MakeDhxGrid('gridPopupMenuEmp', dhxGridTreeMenuInfo, false, false, false);    
    
    dhxGridMultiEmpPopup.enableAutoHeight(false);
}

function cf_SetEventListenerPopupMenu(){
    // 체크 박스
    $('#checkAllEmp').unbind('click').bind('click',function() {
        gf_DhxCheckAllGridHeader(dhxGridMultiEmpPopup, $('#checkAllEmp').prop('checked'), 'selYn');
    });
    
    //부서 선택 Popup
    $('#searchFormEmpPopup #btnDeptCodeSearch2').unbind('click').bind('click', function(event){
        var stmBizplcSelect = document.getElementById("searchComboStmBizplcEmp1");
        var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
        gf_DeptPopup("searchFormEmpPopup","deptCodeEmpPopup","deptCodeNmEmpPopup", stmBizplcCode, "Y");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부
    });
    
    $('#popupEmpNo').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13)  {
            fn_SearchPopupEmp();
        }
    });
    
    $('#popupKorNm').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13)  {
            //$('#deptCodeNmEmpPopup').focus();
            fn_SearchPopupEmp();
        }
    });
    
    $('#divPopupHffsSeComboEmp1').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13)  {
            fn_SearchPopupEmp();
        }
    });
    
    $('#deptCodeEmpPopup').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13)  {
//             $('#deptCodeNmEmpPopup').focus();
            fn_SearchPopupEmp();
        }
    });
    $('#deptCodeNmEmpPopup').unbind('keydown').bind('keydown',function(event) {
        var deptCd = gf_FormGetValue('searchFormEmpPopup', 'deptCodeEmpPopup', 'text');
        var deptNm = gf_FormGetValue('searchFormEmpPopup', 'deptCodeNmEmpPopup', 'text');
        if(deptCd == "" && deptNm == ""){
            var stmBizplcSelect = document.getElementById("searchComboStmBizplcEmp1");
            var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
            gf_DeptPopup("searchFormEmpPopup","deptCodeEmpPopup","deptCodeNmEmpPopup", stmBizplcCode, "Y");
        }
        else if (event.keyCode == 13)  {
            //fn_SearchPopupEmp();
            fn_SearchDeptCodeEmpPopup();
        }
    });
    
    //조회
    $('#btnEmpPopupSearch').unbind('click').bind('click', function() {
        fn_SearchPopupEmp();
    });
    //초기화
    $('#btnEmpPupupInit').unbind('click').bind('click', function() {
        gf_FormSetValue('searchFormEmpPopup', 'popupEmpNo', '', 'text');
        gf_FormSetValue('searchFormEmpPopup', 'popupKorNm', '', 'text');
        // value 값으로 선택
        $("#searchComboStmBizplcEmp1").val("1000").prop("selected", true);
        // OR option 순서값으로 선택
        $("#searchComboC278Emp1 option:eq(0)").prop("selected", true);
        gf_FormSetValue('searchFormEmpPopup', 'deptCodeEmpPopup', '', 'text');
        gf_FormSetValue('searchFormEmpPopup', 'deptCodeNmEmpPopup', '', 'text');
        cf_InitFormPopupMenu();
    });
    //닫기
    $('#btnEmpPupupClose').unbind('click').bind('click', function() {
        $('#empPopup .b-close').click();
    });

    
    $('#searchComboStmBizplcEmp1').unbind('change').bind('change', function() {
        fn_SearchPopupEmp();
    });
    
    $('#btnEmpPupupOk').unbind('click').bind('click', function() {
        var selectedId = gf_GetCheckedGridValueArr(dhxGridMultiEmpPopup, 'selYn', 'num');
        fn_SearchEmpOk(selectedId); 
    });
    
//  dhxGridMultiEmpPopup.attachEvent("onRowDblClicked", function(rId,cInd){
//      fn_SearchEmpOk(rId);
//  });
}

function cf_SetBindingPopupMenu(){
    setTimeout(function() { 
        fn_SearchPopupEmp();
    }, 500);
}

function cf_InitFormPopupMenu(){
    gf_FormSetValue('searchFormEmpPopup', 'searchComboC278Emp1', 'J01', 'combo');
	$('#popupKorNm').focus();
}

function fn_SearchPopupEmp(){
    var stmBizplcSelect = document.getElementById("searchComboStmBizplcEmp1");
    var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
    var stmBizplcCodeNm   = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].text;
    if(stmBizplcCode == "" || $.trim(stmBizplcCodeNm) == ""){
        alert("사업장은 필수 검색 조건입니다");
        return false;
    }
    var stmCodeC278Select = document.getElementById("searchComboC278Emp1");
    var stmCodeC278Code = stmCodeC278Select.options[stmCodeC278Select.selectedIndex].value;
    var jsonParameter = {
            empno     : $('#searchFormEmpPopup input[name="popupEmpNo"]').val(),
            korNm     : $('#searchFormEmpPopup input[name="popupKorNm"]').val(),
            hffsSe    : stmCodeC278Code,
            deptCode  : $('#searchFormEmpPopup input[name="deptCodeEmpPopup"]').val(),
            deptNm    : $('#searchFormEmpPopup input[name="deptCodeNmEmpPopup"]').val(),
            bplcCode  : stmBizplcCode
    };
    gf_Transaction('gridPopupMenuEmp', 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchGridListEmp', false, 'GET');
}

function fn_CallbackSearchGridListEmp (strSvcID, targetID, data){
    dhxGridMultiEmpPopup.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMultiEmpPopup.parse(data.data.records, 'js');
        gf_NoFoundDataOnGridMsgRemove('gridPopupMenuEmp');
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
        gf_NoFoundDataOnGridMsg('gridPopupMenuEmp'); 
    }
    $("#spanCntEmp").text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListenerPopupMenu();
}

//--부서 입력 후 Enter 이벤트
function fn_SearchDeptCodeEmpPopup(){
    var deptCode = gf_FormGetValue('searchFormEmpPopup', 'deptCodeEmpPopup', 'text');
    var deptKorNm = gf_FormGetValue('searchFormEmpPopup', 'deptCodeNmEmpPopup', 'text');
    
    var stmBizplcSelect = document.getElementById("searchComboStmBizplcEmp1");
    var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
    
    var jsonParameter = {
            deptCode : deptCode,
            deptKorNm : deptKorNm,
            useAt : '1',
            bplcCode : stmBizplcCode
    };
    gf_Transaction('title_box', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchDeptCodeEmpPopup', false, 'GET');
}
function fn_CallbackSearchDeptCodeEmpPopup (strSvcID, targetID, data){
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
        var stmBizplcSelect = document.getElementById("searchComboStmBizplcEmp1");
        var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
        gf_DeptPopup("searchFormEmpPopup","deptCodeEmpPopup","deptCodeNmEmpPopup", stmBizplcCode, "Y");
    }
}

function fn_SearchEmpOk(rId){
//      if(gformIdPopupEmp != "" && gcodeIdPopupEmp != ""){
//           obj = '#' + gformIdPopupEmp + " #" + gcodeIdPopupEmp;
//           $(obj).val(dhxGridMultiEmpPopup.cells(rId, 1).getValue()).change();   //사원번호
//          } 
//          if(gformIdPopupEmp != "" && gcodeNmIdPopupEmp != ""){
//           obj = '#' + gformIdPopupEmp + " #" + gcodeNmIdPopupEmp;
//           $(obj).val(dhxGridMultiEmpPopup.cells(rId, 2).getValue()).change();   //사원명
//         }
         
    if(gempInfo != ""){
        var obj_Main = eval("$" + gempInfo);
        if(typeof obj_Main == "object"){
            if(gf_IsNull(rId)){
                gf_DivMsgAlert('로우를 선택하여 주세요.');
                return false;
            }
            else{
                rId.forEach(function(rowId){
                    var $obj_Sub = {};
                    $obj_Sub.empno             = dhxGridMultiEmpPopup.cells(rowId, 2).getValue();    //사원번호
                    $obj_Sub.korNm             = dhxGridMultiEmpPopup.cells(rowId, 3).getValue();    //성명
                    $obj_Sub.rspofcCodeNm      = dhxGridMultiEmpPopup.cells(rowId, 4).getValue();    //직책
                    $obj_Sub.deptCode          = dhxGridMultiEmpPopup.cells(rowId, 5).getValue();    //부서 코드 
                    $obj_Sub.deptCodeNm        = dhxGridMultiEmpPopup.cells(rowId, 6).getValue();    //부서 명
                
                    $obj_Sub.engNm             = dhxGridMultiEmpPopup.cells(rowId, 7).getValue();    //영문 명
                    $obj_Sub.chcrtNm           = dhxGridMultiEmpPopup.cells(rowId, 8).getValue();    //한자 명
                    $obj_Sub.ecnyDe            = dhxGridMultiEmpPopup.cells(rowId, 9).getValue();    //입사 일자
                    $obj_Sub.retireDe          = dhxGridMultiEmpPopup.cells(rowId, 10).getValue();    //퇴직 일자
                    $obj_Sub.ihidnum           = dhxGridMultiEmpPopup.cells(rowId, 11).getValue();   //주민등록번호
                    $obj_Sub.nltyCode          = dhxGridMultiEmpPopup.cells(rowId, 12).getValue();   //국적 코드
                    $obj_Sub.nltyCodeNm        = dhxGridMultiEmpPopup.cells(rowId, 13).getValue();   //국적 코드 명
                    $obj_Sub.jssfcCode         = dhxGridMultiEmpPopup.cells(rowId, 14).getValue();   //직종 코드
                    $obj_Sub.jssfcCodeNm       = dhxGridMultiEmpPopup.cells(rowId, 15).getValue();   //직종 코드 명
                    $obj_Sub.srclsCode         = dhxGridMultiEmpPopup.cells(rowId, 16).getValue();   //호봉 코드
                    $obj_Sub.clsfCode          = dhxGridMultiEmpPopup.cells(rowId, 17).getValue();   //직급 코드
                    $obj_Sub.clsfCodeNm        = dhxGridMultiEmpPopup.cells(rowId, 18).getValue();   //직급 코드 명
                    $obj_Sub.ofcpsCode         = dhxGridMultiEmpPopup.cells(rowId, 19).getValue();   //직위 코드
                    $obj_Sub.ofcpsCodeNm       = dhxGridMultiEmpPopup.cells(rowId, 20).getValue();   //직위 코드 명
                    $obj_Sub.rspofcCode        = dhxGridMultiEmpPopup.cells(rowId, 21).getValue();   //직책 코드
                    $obj_Sub.zip               = dhxGridMultiEmpPopup.cells(rowId, 22).getValue();   //우편번호
                    $obj_Sub.ownhomAdres       = dhxGridMultiEmpPopup.cells(rowId, 23).getValue();   //자택 주소
                    $obj_Sub.ownhomDetailAdres = dhxGridMultiEmpPopup.cells(rowId, 24).getValue();   //자택 상세 주소
                    $obj_Sub.ownhomEngAdres    = dhxGridMultiEmpPopup.cells(rowId, 25).getValue();   //자택 영문 주소
                    $obj_Sub.ownhomTelno       = dhxGridMultiEmpPopup.cells(rowId, 26).getValue();   //자택 전화번호
                    $obj_Sub.lxtnTelno         = dhxGridMultiEmpPopup.cells(rowId, 27).getValue();   //내선 전화번호
                    $obj_Sub.mbtlnum           = dhxGridMultiEmpPopup.cells(rowId, 28).getValue();   //휴대폰번호
                    $obj_Sub.email             = dhxGridMultiEmpPopup.cells(rowId, 29).getValue();   //이메일
                    $obj_Sub.brthdy            = dhxGridMultiEmpPopup.cells(rowId, 30).getValue();   //생년월일
                    $obj_Sub.slrcldAt          = dhxGridMultiEmpPopup.cells(rowId, 31).getValue();   //양력 여부
                    $obj_Sub.mrrgAt            = dhxGridMultiEmpPopup.cells(rowId, 32).getValue();   //결혼 여부
                    $obj_Sub.mrrgAtNm          = dhxGridMultiEmpPopup.cells(rowId, 33).getValue();   //결혼 여부 명
                    $obj_Sub.hdadptDeptCode    = dhxGridMultiEmpPopup.cells(rowId, 34).getValue();   //겸임 부서 코드
                    $obj_Sub.emplSe            = dhxGridMultiEmpPopup.cells(rowId, 35).getValue();   //사원 구분
                    $obj_Sub.emplSeNm          = dhxGridMultiEmpPopup.cells(rowId, 36).getValue();   //사원 구분 명
                    $obj_Sub.hffsSe            = dhxGridMultiEmpPopup.cells(rowId, 37).getValue();   //재직 구분
                    $obj_Sub.hffsSeNm          = dhxGridMultiEmpPopup.cells(rowId, 38).getValue();   //재직 구분 명
                    $obj_Sub.retireSe          = dhxGridMultiEmpPopup.cells(rowId, 39).getValue();   //퇴직 구분
                    $obj_Sub.retireSeNm        = dhxGridMultiEmpPopup.cells(rowId, 40).getValue();   //퇴직 구분 명
                    $obj_Sub.sexdstnSe         = dhxGridMultiEmpPopup.cells(rowId, 41).getValue();   //성별 구분
                    $obj_Sub.sexdstnSeNm       = dhxGridMultiEmpPopup.cells(rowId, 42).getValue();   //성별 구분 명
                    //empnmSe           = dhxGridMultiEmpPopup.cells(rowId, 42).getValue();   //채용 구분
                    //empnmSeNm         = dhxGridMultiEmpPopup.cells(rowId, 43).getValue();   //채용 구분 명
                    $obj_Sub.cashierAt         = dhxGridMultiEmpPopup.cells(rowId, 43).getValue();   //출납담당 여부
                    $obj_Sub.hdadptAt          = dhxGridMultiEmpPopup.cells(rowId, 44).getValue();   //겸임 여부
                    $obj_Sub.dprlrAt           = dhxGridMultiEmpPopup.cells(rowId, 45).getValue();   //부서장 여부
                    $obj_Sub.lbunSbscrbAt      = dhxGridMultiEmpPopup.cells(rowId, 46).getValue();   //노조 가입 여부
                    $obj_Sub.lbunSbscrbAtNm    = dhxGridMultiEmpPopup.cells(rowId, 47).getValue();   //노조 가입 여부 명
                    $obj_Sub.mutaidSbscrbAt    = dhxGridMultiEmpPopup.cells(rowId, 48).getValue();   //상조 가입 여부
                    $obj_Sub.dispWorkbAt       = dhxGridMultiEmpPopup.cells(rowId, 49).getValue();   //파견 근무 여부
                    $obj_Sub.natvfrgnSeCode    = dhxGridMultiEmpPopup.cells(rowId, 50).getValue();   //내외국인 구분 코드
                    $obj_Sub.natvfrgnSeCodeNm  = dhxGridMultiEmpPopup.cells(rowId, 51).getValue();   //내외국인 구분 코드 명
                    $obj_Sub.ecnySeCode        = dhxGridMultiEmpPopup.cells(rowId, 52).getValue();   //입사 구분 코드
                    $obj_Sub.ecnySeCodeNm      = dhxGridMultiEmpPopup.cells(rowId, 53).getValue();   //입사 구분 코드 명
                    $obj_Sub.bplcCode          = dhxGridMultiEmpPopup.cells(rowId, 54).getValue();   //사업장코드
                    $obj_Sub.bplcCodeNm        = dhxGridMultiEmpPopup.cells(rowId, 55).getValue();   //사업장코드 명
                    $obj_Sub.salpeakAt         = dhxGridMultiEmpPopup.cells(rowId, 56).getValue();   //임금피크제 여부
                    $obj_Sub.flexbizAt         = dhxGridMultiEmpPopup.cells(rowId, 57).getValue();   //유연근무제 여부
                    $obj_Sub.ansalsysAt        = dhxGridMultiEmpPopup.cells(rowId, 58).getValue();   //연봉제 여부
                   
                    $obj_Sub.deptEngNm         = dhxGridMultiEmpPopup.cells(rowId, 59).getValue();   //부서 영문 명
                    $obj_Sub.deptAbrv          = dhxGridMultiEmpPopup.cells(rowId, 60).getValue();   //부서 약어
                    $obj_Sub.upperDeptCode     = dhxGridMultiEmpPopup.cells(rowId, 61).getValue();   //상위 부서 코드
                    $obj_Sub.upperDeptNm       = dhxGridMultiEmpPopup.cells(rowId, 62).getValue();   //상위 부서 명
                    $obj_Sub.deptLvl           = dhxGridMultiEmpPopup.cells(rowId, 63).getValue();   //부서 레벨
                    $obj_Sub.orgnztLvl         = dhxGridMultiEmpPopup.cells(rowId, 64).getValue();   //조직 레벨
                    $obj_Sub.deptTelno         = dhxGridMultiEmpPopup.cells(rowId, 65).getValue();   //부서 전화번호
                    $obj_Sub.deptFaxTelno      = dhxGridMultiEmpPopup.cells(rowId, 66).getValue();   //부서 FAX 전화번호
                    $obj_Sub.useBeginDe        = dhxGridMultiEmpPopup.cells(rowId, 67).getValue();   //사용 시작 일자
                    $obj_Sub.useAt             = dhxGridMultiEmpPopup.cells(rowId, 68).getValue();   //사용 여부
                    $obj_Sub.deptSe            = dhxGridMultiEmpPopup.cells(rowId, 69).getValue();   //부서 구분
                    $obj_Sub.sortOrdr          = dhxGridMultiEmpPopup.cells(rowId, 70).getValue();   //출력 순서
                    $obj_Sub.upperDeptAt       = dhxGridMultiEmpPopup.cells(rowId, 71).getValue();   //상위부서 존재 여부
           
                    $obj_Sub.jblnCode          = dhxGridMultiEmpPopup.cells(rowId, 72).getValue();   // 직렬 코드
                    $obj_Sub.jblnCodeNm        = dhxGridMultiEmpPopup.cells(rowId, 73).getValue();   // 직렬 코드 명 
                    $obj_Sub.dtyCode           = dhxGridMultiEmpPopup.cells(rowId, 74).getValue();   // 직무 코드
                    $obj_Sub.dtyCodeNm         = dhxGridMultiEmpPopup.cells(rowId, 75).getValue();   // 직무 코드 명
                    $obj_Sub.emgncTelno        = dhxGridMultiEmpPopup.cells(rowId, 76).getValue();   // 비상전화번호
                    $obj_Sub.indvdlEmail       = dhxGridMultiEmpPopup.cells(rowId, 77).getValue();   // 개인 이메일
                    $obj_Sub.hdadptDeptCodeNm  = dhxGridMultiEmpPopup.cells(rowId, 78).getValue();   // 겸임 부서 명
                    $obj_Sub.dispDeptCode      = dhxGridMultiEmpPopup.cells(rowId, 79).getValue();   // 파견 부서 코드
                    $obj_Sub.dispDeptCodeNm    = dhxGridMultiEmpPopup.cells(rowId, 80).getValue();   // 파견 부서 명
                    $obj_Sub.babyShrtenWorkAt  = dhxGridMultiEmpPopup.cells(rowId, 81).getValue();   // 육아 단축 근무 여부
                    $obj_Sub.salaryAprpCode    = dhxGridMultiEmpPopup.cells(rowId, 82).getValue();   // 급여 책정 코드
                    $obj_Sub.salaryAprpCodeNm  = dhxGridMultiEmpPopup.cells(rowId, 83).getValue();   // 급여 책정 코드 명
                    $obj_Sub.apntcSdt          = dhxGridMultiEmpPopup.cells(rowId, 84).getValue();   // 수습 시작일자
                    $obj_Sub.apntcEdt          = dhxGridMultiEmpPopup.cells(rowId, 85).getValue();   // 수습 종료일자
                    $obj_Sub.incmtaxrtCode     = dhxGridMultiEmpPopup.cells(rowId, 86).getValue();   // 소득세율 코드
                    $obj_Sub.incmtaxrtCodeNm   = dhxGridMultiEmpPopup.cells(rowId, 87).getValue();   // 소득세율 코드 명
                    $obj_Sub.userId   = dhxGridMultiEmpPopup.cells(rowId, 88).getValue();   // USER ID
                    
                     obj_Main[rowId] = $obj_Sub;
                    });
                };
        }
    }
    //console.log(obj_Main);
    $('#empPopup .b-close').click();
    /*
    console.log("사원번호 : " + dhxGridMultiEmpPopup.cells(rId, 1).getValue());
    console.log("성명 : " + dhxGridMultiEmpPopup.cells(rId, 2).getValue());
    console.log("직책 : " + dhxGridMultiEmpPopup.cells(rId, 3).getValue());
    console.log("부서코드 : " + dhxGridMultiEmpPopup.cells(rId, 4).getValue());
    console.log("부서 한글 명 : " + dhxGridMultiEmpPopup.cells(rId, 5).getValue());
    console.log("영문 명 : " + dhxGridMultiEmpPopup.cells(rId, 6).getValue());
    console.log("한자 명 : " + dhxGridMultiEmpPopup.cells(rId, 7).getValue());
    console.log("입사 일자  : " + dhxGridMultiEmpPopup.cells(rId, 8).getValue());
    console.log("퇴직 일자  : " + dhxGridMultiEmpPopup.cells(rId, 9).getValue());
    console.log("주민등록번호   : " + dhxGridMultiEmpPopup.cells(rId, 10).getValue());
    console.log("국적 코드   : " + dhxGridMultiEmpPopup.cells(rId, 11).getValue());
    console.log("국적 코드 명   : " + dhxGridMultiEmpPopup.cells(rId, 12).getValue());
    console.log("직종 코드   : " + dhxGridMultiEmpPopup.cells(rId, 13).getValue());
    console.log("직종 코드 명   : " + dhxGridMultiEmpPopup.cells(rId, 14).getValue());
    console.log("호봉 코드   : " + dhxGridMultiEmpPopup.cells(rId, 15).getValue());
    console.log("직급 코드   : " + dhxGridMultiEmpPopup.cells(rId, 16).getValue());
    console.log("직급 코드 명   : " + dhxGridMultiEmpPopup.cells(rId, 17).getValue());
    console.log("직위 코드   : " + dhxGridMultiEmpPopup.cells(rId, 18).getValue());
    console.log("직위 코드 명   : " + dhxGridMultiEmpPopup.cells(rId, 19).getValue());
    console.log("직책 코드   : " + dhxGridMultiEmpPopup.cells(rId, 20).getValue());
    console.log("우편번호   : " + dhxGridMultiEmpPopup.cells(rId, 21).getValue());
    console.log("자택 주소   : " + dhxGridMultiEmpPopup.cells(rId, 22).getValue());
    console.log("자택 상세 주소  : " + dhxGridMultiEmpPopup.cells(rId, 23).getValue());
    console.log("자택 영문 주소  : " + dhxGridMultiEmpPopup.cells(rId, 24).getValue());
    console.log("자택 전화번호   : " + dhxGridMultiEmpPopup.cells(rId, 25).getValue());
    console.log("내선 전화번호   : " + dhxGridMultiEmpPopup.cells(rId, 26).getValue());
    console.log("휴대폰번호   : " + dhxGridMultiEmpPopup.cells(rId, 27).getValue());
    console.log("이메일   : " + dhxGridMultiEmpPopup.cells(rId, 28).getValue());
    console.log("생년월일   : " + dhxGridMultiEmpPopup.cells(rId, 29).getValue());
    console.log("양력 여부   : " + dhxGridMultiEmpPopup.cells(rId, 30).getValue());
    console.log("결혼 여부   : " + dhxGridMultiEmpPopup.cells(rId, 31).getValue());
    console.log("결혼 여부 명   : " + dhxGridMultiEmpPopup.cells(rId, 32).getValue());
    console.log("겸임 부서 코드   : " + dhxGridMultiEmpPopup.cells(rId, 33).getValue());
    console.log("사원 구분   : " + dhxGridMultiEmpPopup.cells(rId, 34).getValue());
    console.log("사원 구분 명   : " + dhxGridMultiEmpPopup.cells(rId, 35).getValue());
    console.log("재직 구분   : " + dhxGridMultiEmpPopup.cells(rId, 36).getValue());
    console.log("재직 구분 명   : " + dhxGridMultiEmpPopup.cells(rId, 37).getValue());
    console.log("퇴직 구분   : " + dhxGridMultiEmpPopup.cells(rId, 38).getValue());
    console.log("퇴직 구분 명   : " + dhxGridMultiEmpPopup.cells(rId, 39).getValue());
    console.log("성별 구분   : " + dhxGridMultiEmpPopup.cells(rId, 40).getValue());
    console.log("성별 구분 명   : " + dhxGridMultiEmpPopup.cells(rId, 41).getValue());
    //console.log("채용 구분   : " + dhxGridMultiEmpPopup.cells(rId, 42).getValue());
    //console.log("채용 구분 명   : " + dhxGridMultiEmpPopup.cells(rId, 43).getValue());
    console.log("출납담당 여부   : " + dhxGridMultiEmpPopup.cells(rId, 44).getValue());
    console.log("겸임 여부   : " + dhxGridMultiEmpPopup.cells(rId, 45).getValue());
    console.log("부서장 여부   : " + dhxGridMultiEmpPopup.cells(rId, 46).getValue());
    console.log("노조 가입 여부   : " + dhxGridMultiEmpPopup.cells(rId, 47).getValue());
    console.log("노조 가입 여부 명   : " + dhxGridMultiEmpPopup.cells(rId, 48).getValue());
    console.log("상조 가입 여부   : " + dhxGridMultiEmpPopup.cells(rId, 49).getValue());
    console.log("파견 근무 여부   : " + dhxGridMultiEmpPopup.cells(rId, 50).getValue());
    console.log("내외국인 구분 코드   : " + dhxGridMultiEmpPopup.cells(rId, 51).getValue());
    console.log("내외국인 구분 코드 명   : " + dhxGridMultiEmpPopup.cells(rId, 52).getValue());
    console.log("입사 구분 코드   : " + dhxGridMultiEmpPopup.cells(rId, 53).getValue());
    console.log("입사 구분 코드 명   : " + dhxGridMultiEmpPopup.cells(rId, 54).getValue());
    console.log("사업장코드   : " + dhxGridMultiEmpPopup.cells(rId, 55).getValue());
    console.log("사업장코드 명   : " + dhxGridMultiEmpPopup.cells(rId, 56).getValue());
    console.log("임금피크제 여부   : " + dhxGridMultiEmpPopup.cells(rId, 57).getValue());
    console.log("유연근무제 여부   : " + dhxGridMultiEmpPopup.cells(rId, 58).getValue());
    console.log("연봉제 여부   : " + dhxGridMultiEmpPopup.cells(rId, 59).getValue());
    
    console.log("부서 영문 명 : " + dhxGridMultiEmpPopup.cells(rId, 60).getValue());
    console.log("부서 약어 : " + dhxGridMultiEmpPopup.cells(rId, 61).getValue());
    console.log("상위 부서 코드 : " + dhxGridMultiEmpPopup.cells(rId, 62).getValue());
    console.log("상위 부서 명 : " + dhxGridMultiEmpPopup.cells(rId, 63).getValue());
    console.log("부서 레벨 : " + dhxGridMultiEmpPopup.cells(rId, 64).getValue());
    console.log("조직 레벨 : " + dhxGridMultiEmpPopup.cells(rId, 65).getValue());
    console.log("부서 전화번호 : " + dhxGridMultiEmpPopup.cells(rId, 66).getValue());
    console.log("부서 FAX 전화번호 : " + dhxGridMultiEmpPopup.cells(rId, 67).getValue());
    console.log("사용 시작 일자 : " + dhxGridMultiEmpPopup.cells(rId, 68).getValue());
    console.log("사용 여부 : " + dhxGridMultiEmpPopup.cells(rId, 69).getValue());
    console.log("부서 구분 : " + dhxGridMultiEmpPopup.cells(rId, 70).getValue());
    console.log("출력 순서 : " + dhxGridMultiEmpPopup.cells(rId, 71).getValue());
    console.log("상위부서 존재 여부 : " + dhxGridMultiEmpPopup.cells(rId, 72).getValue());
    
    console.log("직렬 코드 : " + dhxGridMultiEmpPopup.cells(rId, 73).getValue());
    console.log("직렬 코드 명 : " + dhxGridMultiEmpPopup.cells(rId, 74).getValue());
    console.log("직무 코드 : " + dhxGridMultiEmpPopup.cells(rId, 75).getValue());
    console.log("직무 코드 명 : " + dhxGridMultiEmpPopup.cells(rId, 76).getValue());
    console.log("비상전화번호 : " + dhxGridMultiEmpPopup.cells(rId, 77).getValue());
    console.log("개인 이메일 : " + dhxGridMultiEmpPopup.cells(rId, 78).getValue());
    console.log("겸임 부서 명 : " + dhxGridMultiEmpPopup.cells(rId, 79).getValue());
    console.log("파견 부서 코드 : " + dhxGridMultiEmpPopup.cells(rId, 80).getValue());
    console.log("파견 부서 명 : " + dhxGridMultiEmpPopup.cells(rId, 81).getValue());
    console.log("육아 단축 근무 여부 : " + dhxGridMultiEmpPopup.cells(rId, 82).getValue());
    console.log("급여 책정 코드 : " + dhxGridMultiEmpPopup.cells(rId, 83).getValue());
    console.log("급여 책정 코드 명 : " + dhxGridMultiEmpPopup.cells(rId, 84).getValue());
    console.log("수습 시작일자 : " + dhxGridMultiEmpPopup.cells(rId, 85).getValue());
    console.log("수습 종료일자 : " + dhxGridMultiEmpPopup.cells(rId, 86).getValue());
    console.log("소득세율 코드 : " + dhxGridMultiEmpPopup.cells(rId, 87).getValue());
    console.log("소득세율 코드 명 : " + dhxGridMultiEmpPopup.cells(rId, 88).getValue());
    */
}

</script>
 
<div class="pop-content">
    <div class="path_div">
    </div>
    <form id="searchFormEmpPopup">
        <div class="consearch_div_in">
            <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li><span class="span"><taglibs:transText progrmId="default" key="titEmpno" /></span><input name="popupEmpNo" id="popupEmpNo" class="w70"></li>
                        <li><span class="span">&nbsp;&nbsp;&nbsp;성명</span><input name="popupKorNm" id="popupKorNm" class="w120"></li>
                        
                        <li><span class="span">재직구분</span><div id="divPopupHffsSeComboEmp1" class="div_combo"></div></li>
                    </ul>
            </div>
        </div>
        <div class="consearch_div_in">
            <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li><span class="span">부서코드</span><input name="deptCodeEmpPopup" id="deptCodeEmpPopup" class="w70"></li>
                        <li><span class="span">부서명</span><input type="text" id="deptCodeNmEmpPopup" name="deptCodeNmEmpPopup" class="w90"/>
                            <button type="button" id="btnDeptCodeSearch2" class="btn_common03">
                                <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button><div style="visibility:hidden" id="divPopupStmBizplcComboEmp1" name="divPopupStmBizplcComboEmp1"  class="div_combo"></div></li>
                    </ul>
            </div>
            <div class="consearchbt_div">
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
