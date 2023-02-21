<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxTreeMenuPopupEmp2;
var dhxGridEmpPopup2;
var chkStmBizplcCode; //사업장 변경 여부 체크
var evId_StmBizplc = 0; //사업장 변경 여부 체크
var eventIdEmpPopup = [];

var gformIdPopupEmp2;
var gcodeIdPopupEmp2;
var gcodeNmIdPopupEmp2;
var gempInfo2;

var gBplcCode = '1000'

$(function() {  
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
    cf_InitFormPopupMenu();
});


function cf_InitParamPopupMenu(){
    gf_ComboCode('divPopupHffsSeComboEmp2', 'searchComboHffsSe', 'searchComboHffsSe', 'search', 'C278', '' , '', '', 'asc', '');    //재직구분
    gf_FormSetValue('searchForm', 'searchComboHffsSe', 'J01', 'combo');
}

function cf_SetComponentsPopupMenu(){
    var formId     = $("#empPopup2").attr("formId");
    var codeId     = $("#empPopup2").attr("codeId");
    var codeNmId   = $("#empPopup2").attr("codeNmId");
    var empInfo    = $("#empPopup2").attr("empInfo");
    var searchFlag = $("#empPopup2").attr("searchFlag");
    
    var obj = "";
    
    if(typeof searchFlag != "undefined" && typeof codeId != "undefined" && searchFlag == "Y" && codeId != ""){
        obj = '#' + formId + " #" + codeId;
        gf_FormSetValue('searchForm', 'popupEmpNo', $.trim($(obj).val()), 'text');
    }
    else {
        gf_FormSetValue('searchForm', 'popupEmpNo', '', 'text');
    }
    
    if(typeof searchFlag != "undefined" && typeof codeNmId != "undefined" && searchFlag == "Y" && codeNmId != ""){
        obj = '#' + formId + " #" + codeNmId;
        gf_FormSetValue('searchForm', 'popupKorNm', $.trim($(obj).val()), 'text');
    }
    else {
        gf_FormSetValue('searchForm', 'popupKorNm', '', 'text');
    }
    
    gformIdPopupEmp2 = formId;
    gcodeIdPopupEmp2 = codeId;
    gcodeNmIdPopupEmp2 = codeNmId;
    gempInfo2 = empInfo;
    
    var dhxGridMhsDeptListInfo = [];
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCode'), '80', 'center', 'str', 'ro', false ,'deptCode', '')); // 부서 코드
    //dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptKorNm'), '270', 'left', 'str', 'tree', false, 'deptKorNm', '')); // 부서 한글 명
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader("부서명", '270', 'left', 'str', 'tree', false, 'deptKorNm', '')); // 부서 한글 명
    dhxTreeMenuPopupEmp2 = gf_MakeDhxGrid('gridPopupMenu', dhxGridMhsDeptListInfo, true, false, false);
    dhxTreeMenuPopupEmp2.enableAutoWidth(true);
    dhxTreeMenuPopupEmp2.attachEvent("onRowSelect", function(rId, cInd){
        //console.log("부서코드 : " + dhxTreeMenuPopupEmp2.cells(rId, 0).getValue());
        //console.log("부서명 : " + dhxTreeMenuPopupEmp2.cells(rId, 1).getValue());
        searchEmp (dhxTreeMenuPopupEmp2.cells(rId, 0).getValue());
    });
    
    var dhxGridTreeMenuInfo = [];
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   '50', 'center', 'int', 'edn', false, 'num', '')); // 번호
    //dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNo'), '80', 'center', 'str', 'ro', false ,'empno', '')); // 사원번호
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("사원번호", '80', 'center', 'str', 'ro', false ,'empno', '')); // 사원번호
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNm'), '150', 'center', 'str', 'ro', false ,'korNm', '')); // 성명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPositionCode'), '90', 'center', 'str', 'ro', false ,'rspofcCodeNm', '')); // 직책
    //dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptKorNm'), '*', 'center', 'str', 'ro', false ,'deptCodeNm', '')); // 부서 명 
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader("부서명", '*', 'center', 'str', 'ro', false ,'deptCodeNm', '')); // 부서명
    
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'engNm', '')); // 영문 명
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'deptCode', '')); // 부서 코드
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
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'empnmSe', '')); // 채용 구분 -삭제
    dhxGridTreeMenuInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false ,'empnmSeNm', '')); // 채용 구분 명-삭제
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
    
    dhxGridEmpPopup2 = gf_MakeDhxGrid('gridPopupMenuEmp', dhxGridTreeMenuInfo, false, false, false);
}

function cf_SetEventListenerPopupMenu(){
    var eventId;
    $('#searchForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnEmpPopupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    //조회
    $('#btnEmpPopupSearch').unbind('click').bind('click', function() {
        fn_SearchPopupEmp();
    });
    //초기화
    $('#btnEmpPupupInit').unbind('click').bind('click', function() {
        $('#searchForm').resetForm();
        gf_FormSetValue('searchForm', 'searchComboHffsSe', 'J01', 'combo');
        cf_InitFormPopupMenu()
    });
    //닫기
    $('#btnEmpPupupClose').unbind('click').bind('click', function() {
        $('#empPopup2 .b-close').click();
    });
    
    $('#searchComboStmBizplcEmp2').unbind('change').bind('change', function() {
        fn_SearchPopupDept();
    });
    
    $('#btnEmpPupupOk2').unbind('click').bind('click', function() {
        var selectedId = dhxGridEmpPopup2.getSelectedRowId();
        fn_SearchEmpOk2(selectedId);
    });
    
    dhxGridEmpPopup2.attachEvent("onRowDblClicked", function(rId,cInd){
        fn_SearchEmpOk2(rId);
    });
    eventId = dhxTreeMenuPopupEmp2.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        if(cInd == gf_GetDhxGridColumId(dhxTreeMenuPopupEmp2, 'deptKorNm')) { return false; }     
        return true;
    });
    eventIdEmpPopup.push(eventId);
}

function cf_SetBindingPopupMenu(){
    fn_SearchPopupDept();
}

function cf_InitFormPopupMenu(){
    $('#popupKorNm').focus();
}

function fn_SearchPopupDept(){
        var jsonParameter = {
                bplcCode  : gBplcCode
        };
        
        dhxTreeMenuPopupEmp2.clearAll();
        dhxGridEmpPopup2.clearAll();
        gf_NoFoundDataOnGridMsg('gridPopupMenuEmp');
        
        gf_Transaction('gridPopupMenu', 'dept/searchDept', jsonParameter, 'fn_CallbackSearchGridListDeptPopup', false, 'GET');
}

function fn_SearchPopupEmp(){
    var selectedId = dhxTreeMenuPopupEmp2.getSelectedRowId();
    var jsonParameter = {
            empno     : gf_FormGetValue('searchForm', 'popupEmpNo', 'text'),
            korNm     : gf_FormGetValue('searchForm', 'popupKorNm', 'text'),
            hffsSe    : gf_FormGetValue('searchForm', 'searchComboHffsSe', 'combo'),
            deptCode  : dhxTreeMenuPopupEmp2.cells(selectedId, 0).getValue(),
            bplcCode  : gBplcCode
    };
    gf_Transaction('gridPopupMenuEmp', 'emp/searchDeptEmp', jsonParameter, 'fn_CallbackSearchGridListEmp', false, 'GET');
}

function fn_CallbackSearchGridListDeptPopup (strSvcID, targetID, data){
    var totCnt = data.data.records.length;
    if(!gf_IsNull(data.data.records) && totCnt > 0){
        
        var menus = data.data.records;
        var menuList = [];
        var menuObj = {};
        var count = 0;
        menus.forEach(function(menu) {
            
            menuObj = {};
            menuObj.num = menu.num;
            menuObj.id = menu.deptCode;
            menuObj.deptCode = menu.deptCode;
            menuObj.parentId = menu.upperOrgnztCode;
            menuObj.upperOrgnztCode = menu.upperOrgnztCode;
            menuObj.orgnztMngrEmpno = menu.orgnztMngrEmpno; 
            menuObj.orgnztMngrEmpNm = menu.orgnztMngrEmpNm;         
            menuObj.orgnztSeCode = menu.orgnztSeCode;
            menuObj.orgnztLvl = menu.orgnztLvl;
            menuObj.useBeginDe = menu.useBeginDe;
            menuObj.useEndDe = menu.useEndDe;
            menuObj.useAt = menu.useAt;
            menuObj.useAtNm = menu.useAtNm;
            menuObj.regDt = menu.regDt;
            menuObj.regId = menu.regId;
            if(menu.orgnztLvl == '1') {
                menuObj.deptKorNm = {
                    value: menu.deptKorNm,
                    image: 'folder.gif'
                };
            } else {
                menuObj.deptKorNm = menu.deptKorNm;
            }  
            menuList[count] = menuObj;
            count++;
        });
        
        var menuTree = gf_TreeModel(menuList, '0000');
        gf_NoFoundDataOnGridMsgRemove('gridPopupMenu');
        dhxTreeMenuPopupEmp2.parse(JSON.stringify(menuTree),'js');   
        dhxTreeMenuPopupEmp2.openItem('0000');
        
//         dhxTreeMenuPopupEmp2.parse(JSON.stringify(menuTree),'js');
//         //fn_roleMenuDisabledAll();
//         dhxTreeMenuPopupEmp2.expandAll();
        dhxTreeMenuPopupEmp2.selectCell(0,1);
//         //searchEmp (dhxTreeMenuPopupEmp2.cells(0, 0).getValue());
//         gf_NoFoundDataOnGridMsgRemove('gridPopupMenu');
        fn_SearchPopupEmp();
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
        gf_NoFoundDataOnGridMsg('gridPopupMenu'); 
    }
    $("#spanCnt").text(totCnt);
    cf_SetEventListenerPopupMenu();
}

function searchEmp (deptCode) {
    console.log('tt')
    var jsonParameter = {
            empno     : gf_FormGetValue('searchForm', 'popupEmpNo', 'text'),
            korNm     : gf_FormGetValue('searchForm', 'popupKorNm', 'text'),
            hffsSe    : gf_FormGetValue('searchForm', 'searchComboHffsSe', 'combo'),
            deptCode  : deptCode,
            bplcCode  : gBplcCode
    };
    gf_Transaction('gridPopupMenuEmp', 'emp/searchDeptEmp', jsonParameter, 'fn_CallbackSearchGridListEmp', false, 'GET');
}

function fn_CallbackSearchGridListEmp (strSvcID, targetID, data){
    dhxGridEmpPopup2.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridEmpPopup2.parse(data.data.records, 'js');
        gf_NoFoundDataOnGridMsgRemove('gridPopupMenuEmp');
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
        gf_NoFoundDataOnGridMsg('gridPopupMenuEmp'); 
    }
    $("#spanCntEmp").text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListenerPopupMenu();
}

function fn_SearchEmpOk2(rId){
    
     var obj = "";
     if(gformIdPopupEmp2 != "" && gcodeIdPopupEmp2 != ""){
         obj = '#' + gformIdPopupEmp2 + " #" + gcodeIdPopupEmp2;
         $(obj).val(dhxGridEmpPopup2.cells(rId, 1).getValue()).change();   //사원번호
     } 
     if(gformIdPopupEmp2 != "" && gcodeNmIdPopupEmp2 != ""){
         obj = '#' + gformIdPopupEmp2 + " #" + gcodeNmIdPopupEmp2;
         $(obj).val(dhxGridEmpPopup2.cells(rId, 2).getValue()).change();   //사원명
    }
     
     /*
    console.log("사원번호 : " + dhxGridEmpPopup2.cells(rId, 1).getValue());
    console.log("성명 : " + dhxGridEmpPopup2.cells(rId, 2).getValue());
    console.log("직책 : " + dhxGridEmpPopup2.cells(rId, 3).getValue());
    console.log("부서 한글 명 : " + dhxGridEmpPopup2.cells(rId, 4).getValue());
    console.log("영문 명 : " + dhxGridEmpPopup2.cells(rId, 5).getValue());
    console.log("부서코드 : " + dhxGridEmpPopup2.cells(rId, 6).getValue());
    console.log("한자 명 : " + dhxGridEmpPopup2.cells(rId, 7).getValue());
    console.log("입사 일자  : " + dhxGridEmpPopup2.cells(rId, 8).getValue());
    console.log("퇴직 일자  : " + dhxGridEmpPopup2.cells(rId, 9).getValue());
    console.log("주민등록번호   : " + dhxGridEmpPopup2.cells(rId, 10).getValue());
    console.log("국적 코드   : " + dhxGridEmpPopup2.cells(rId, 11).getValue());
    console.log("국적 코드 명   : " + dhxGridEmpPopup2.cells(rId, 12).getValue());
    console.log("직종 코드   : " + dhxGridEmpPopup2.cells(rId, 13).getValue());
    console.log("직종 코드 명   : " + dhxGridEmpPopup2.cells(rId, 14).getValue());
    console.log("호봉 코드   : " + dhxGridEmpPopup2.cells(rId, 15).getValue());
    console.log("직급 코드   : " + dhxGridEmpPopup2.cells(rId, 16).getValue());
    console.log("직급 코드 명   : " + dhxGridEmpPopup2.cells(rId, 17).getValue());
    console.log("직위 코드   : " + dhxGridEmpPopup2.cells(rId, 18).getValue());
    console.log("직위 코드 명   : " + dhxGridEmpPopup2.cells(rId, 19).getValue());
    console.log("직책 코드   : " + dhxGridEmpPopup2.cells(rId, 20).getValue());
    console.log("우편번호   : " + dhxGridEmpPopup2.cells(rId, 21).getValue());
    console.log("자택 주소   : " + dhxGridEmpPopup2.cells(rId, 22).getValue());
    console.log("자택 상세 주소  : " + dhxGridEmpPopup2.cells(rId, 23).getValue());
    console.log("자택 영문 주소  : " + dhxGridEmpPopup2.cells(rId, 24).getValue());
    console.log("자택 전화번호   : " + dhxGridEmpPopup2.cells(rId, 25).getValue());
    console.log("내선 전화번호   : " + dhxGridEmpPopup2.cells(rId, 26).getValue());
    console.log("휴대폰번호   : " + dhxGridEmpPopup2.cells(rId, 27).getValue());
    console.log("이메일   : " + dhxGridEmpPopup2.cells(rId, 28).getValue());
    console.log("생년월일   : " + dhxGridEmpPopup2.cells(rId, 29).getValue());
    console.log("양력 여부   : " + dhxGridEmpPopup2.cells(rId, 30).getValue());
    console.log("결혼 여부   : " + dhxGridEmpPopup2.cells(rId, 31).getValue());
    console.log("결혼 여부 명   : " + dhxGridEmpPopup2.cells(rId, 32).getValue());
    console.log("겸임 부서 코드   : " + dhxGridEmpPopup2.cells(rId, 33).getValue());
    console.log("사원 구분   : " + dhxGridEmpPopup2.cells(rId, 34).getValue());
    console.log("사원 구분 명   : " + dhxGridEmpPopup2.cells(rId, 35).getValue());
    console.log("재직 구분   : " + dhxGridEmpPopup2.cells(rId, 36).getValue());
    console.log("재직 구분 명   : " + dhxGridEmpPopup2.cells(rId, 37).getValue());
    console.log("퇴직 구분   : " + dhxGridEmpPopup2.cells(rId, 38).getValue());
    console.log("퇴직 구분 명   : " + dhxGridEmpPopup2.cells(rId, 39).getValue());
    console.log("성별 구분   : " + dhxGridEmpPopup2.cells(rId, 40).getValue());
    console.log("성별 구분 명   : " + dhxGridEmpPopup2.cells(rId, 41).getValue());
    //console.log("채용 구분   : " + dhxGridEmpPopup2.cells(rId, 42).getValue());
    //console.log("채용 구분 명   : " + dhxGridEmpPopup2.cells(rId, 43).getValue());
    console.log("출납담당 여부   : " + dhxGridEmpPopup2.cells(rId, 44).getValue());
    console.log("겸임 여부   : " + dhxGridEmpPopup2.cells(rId, 45).getValue());
    console.log("부서장 여부   : " + dhxGridEmpPopup2.cells(rId, 46).getValue());
    console.log("노조 가입 여부   : " + dhxGridEmpPopup2.cells(rId, 47).getValue());
    console.log("노조 가입 여부 명   : " + dhxGridEmpPopup2.cells(rId, 48).getValue());
    console.log("상조 가입 여부   : " + dhxGridEmpPopup2.cells(rId, 49).getValue());
    console.log("파견 근무 여부   : " + dhxGridEmpPopup2.cells(rId, 50).getValue());
    console.log("내외국인 구분 코드   : " + dhxGridEmpPopup2.cells(rId, 51).getValue());
    console.log("내외국인 구분 코드 명   : " + dhxGridEmpPopup2.cells(rId, 52).getValue());
    console.log("입사 구분 코드   : " + dhxGridEmpPopup2.cells(rId, 53).getValue());
    console.log("입사 구분 코드 명   : " + dhxGridEmpPopup2.cells(rId, 54).getValue());
    console.log("사업장코드   : " + dhxGridEmpPopup2.cells(rId, 55).getValue());
    console.log("사업장코드 명   : " + dhxGridEmpPopup2.cells(rId, 56).getValue());
    console.log("임금피크제 여부   : " + dhxGridEmpPopup2.cells(rId, 57).getValue());
    console.log("유연근무제 여부   : " + dhxGridEmpPopup2.cells(rId, 58).getValue());
    console.log("연봉제 여부   : " + dhxGridEmpPopup2.cells(rId, 59).getValue());
    
    console.log("부서 영문 명 : " + dhxGridEmpPopup2.cells(rId, 60).getValue());
    console.log("부서 약어 : " + dhxGridEmpPopup2.cells(rId, 61).getValue());
    console.log("상위 부서 코드 : " + dhxGridEmpPopup2.cells(rId, 62).getValue());
    console.log("상위 부서 명 : " + dhxGridEmpPopup2.cells(rId, 63).getValue());
    console.log("부서 레벨 : " + dhxGridEmpPopup2.cells(rId, 64).getValue());
    console.log("조직 레벨 : " + dhxGridEmpPopup2.cells(rId, 65).getValue());
    console.log("부서 전화번호 : " + dhxGridEmpPopup2.cells(rId, 66).getValue());
    console.log("부서 FAX 전화번호 : " + dhxGridEmpPopup2.cells(rId, 67).getValue());
    console.log("사용 시작 일자 : " + dhxGridEmpPopup2.cells(rId, 68).getValue());
    console.log("사용 여부 : " + dhxGridEmpPopup2.cells(rId, 69).getValue());
    console.log("부서 구분 : " + dhxGridEmpPopup2.cells(rId, 70).getValue());
    console.log("출력 순서 : " + dhxGridEmpPopup2.cells(rId, 71).getValue());
    console.log("상위부서 존재 여부 : " + dhxGridEmpPopup2.cells(rId, 72).getValue());

    console.log("직렬 코드 : " + dhxGridEmpPopup2.cells(rId, 73).getValue());
    console.log("직렬 코드 명 : " + dhxGridEmpPopup2.cells(rId, 74).getValue());
    console.log("직무 코드 : " + dhxGridEmpPopup2.cells(rId, 75).getValue());
    console.log("직무 코드 명 : " + dhxGridEmpPopup2.cells(rId, 76).getValue());
    console.log("비상전화번호 : " + dhxGridEmpPopup2.cells(rId, 77).getValue());
    console.log("개인 이메일 : " + dhxGridEmpPopup2.cells(rId, 78).getValue());
    console.log("겸임 부서 명 : " + dhxGridEmpPopup2.cells(rId, 79).getValue());
    console.log("파견 부서 코드 : " + dhxGridEmpPopup2.cells(rId, 80).getValue());
    console.log("파견 부서 명 : " + dhxGridEmpPopup2.cells(rId, 81).getValue());
    console.log("육아 단축 근무 여부 : " + dhxGridEmpPopup2.cells(rId, 82).getValue());
    console.log("급여 책정 코드 : " + dhxGridEmpPopup2.cells(rId, 83).getValue());
    console.log("급여 책정 코드 명 : " + dhxGridEmpPopup2.cells(rId, 84).getValue());
    console.log("수습 시작일자 : " + dhxGridEmpPopup2.cells(rId, 85).getValue());
    console.log("수습 종료일자 : " + dhxGridEmpPopup2.cells(rId, 86).getValue());
    console.log("소득세율 코드 : " + dhxGridEmpPopup2.cells(rId, 87).getValue());
    console.log("소득세율 코드 명 : " + dhxGridEmpPopup2.cells(rId, 88).getValue());
    */
         
    if(gempInfo2 != ""){
        obj = eval("$" + gempInfo2);
        if(typeof obj == "object"){
            obj.empno             = dhxGridEmpPopup2.cells(rId, 1).getValue();    //사원번호
            obj.korNm             = dhxGridEmpPopup2.cells(rId, 2).getValue();    //성명
            obj.rspofcCodeNm      = dhxGridEmpPopup2.cells(rId, 3).getValue();    //직책
            obj.deptCodeNm        = dhxGridEmpPopup2.cells(rId, 4).getValue();    //부서 명
            
            obj.engNm             = dhxGridEmpPopup2.cells(rId, 5).getValue();    //영문 명
            obj.deptCode          = dhxGridEmpPopup2.cells(rId, 6).getValue();    //부서 코드 
            obj.chcrtNm           = dhxGridEmpPopup2.cells(rId, 7).getValue();    //한자 명
            obj.ecnyDe            = dhxGridEmpPopup2.cells(rId, 8).getValue();    //입사 일자
            obj.retireDe          = dhxGridEmpPopup2.cells(rId, 9).getValue();    //퇴직 일자
            obj.ihidnum           = dhxGridEmpPopup2.cells(rId, 10).getValue();   //주민등록번호
            obj.nltyCode          = dhxGridEmpPopup2.cells(rId, 11).getValue();   //국적 코드
            obj.nltyCodeNm        = dhxGridEmpPopup2.cells(rId, 12).getValue();   //국적 코드 명
            obj.jssfcCode         = dhxGridEmpPopup2.cells(rId, 13).getValue();   //직종 코드
            obj.jssfcCodeNm       = dhxGridEmpPopup2.cells(rId, 14).getValue();   //직종 코드 명
            obj.srclsCode         = dhxGridEmpPopup2.cells(rId, 15).getValue();   //호봉 코드
            obj.clsfCode          = dhxGridEmpPopup2.cells(rId, 16).getValue();   //직급 코드
            obj.clsfCodeNm        = dhxGridEmpPopup2.cells(rId, 17).getValue();   //직급 코드 명
            obj.ofcpsCode         = dhxGridEmpPopup2.cells(rId, 18).getValue();   //직위 코드
            obj.ofcpsCodeNm       = dhxGridEmpPopup2.cells(rId, 19).getValue();   //직위 코드 명
            obj.rspofcCode        = dhxGridEmpPopup2.cells(rId, 20).getValue();   //직책 코드
            obj.zip               = dhxGridEmpPopup2.cells(rId, 21).getValue();   //우편번호
            obj.ownhomAdres       = dhxGridEmpPopup2.cells(rId, 22).getValue();   //자택 주소
            obj.ownhomDetailAdres = dhxGridEmpPopup2.cells(rId, 23).getValue();   //자택 상세 주소
            obj.ownhomEngAdres    = dhxGridEmpPopup2.cells(rId, 24).getValue();   //자택 영문 주소
            obj.ownhomTelno       = dhxGridEmpPopup2.cells(rId, 25).getValue();   //자택 전화번호
            obj.lxtnTelno         = dhxGridEmpPopup2.cells(rId, 26).getValue();   //내선 전화번호
            obj.mbtlnum           = dhxGridEmpPopup2.cells(rId, 27).getValue();   //휴대폰번호
            obj.email             = dhxGridEmpPopup2.cells(rId, 28).getValue();   //이메일
            obj.brthdy            = dhxGridEmpPopup2.cells(rId, 29).getValue();   //생년월일
            obj.slrcldAt          = dhxGridEmpPopup2.cells(rId, 30).getValue();   //양력 여부
            obj.mrrgAt            = dhxGridEmpPopup2.cells(rId, 31).getValue();   //결혼 여부
            obj.mrrgAtNm          = dhxGridEmpPopup2.cells(rId, 32).getValue();   //결혼 여부 명
            obj.hdadptDeptCode    = dhxGridEmpPopup2.cells(rId, 33).getValue();   //겸임 부서 코드
            obj.emplSe            = dhxGridEmpPopup2.cells(rId, 34).getValue();   //사원 구분
            obj.emplSeNm          = dhxGridEmpPopup2.cells(rId, 35).getValue();   //사원 구분 명
            obj.hffsSe            = dhxGridEmpPopup2.cells(rId, 36).getValue();   //재직 구분
            obj.hffsSeNm          = dhxGridEmpPopup2.cells(rId, 37).getValue();   //재직 구분 명
            obj.retireSe          = dhxGridEmpPopup2.cells(rId, 38).getValue();   //퇴직 구분
            obj.retireSeNm        = dhxGridEmpPopup2.cells(rId, 39).getValue();   //퇴직 구분 명
            obj.sexdstnSe         = dhxGridEmpPopup2.cells(rId, 40).getValue();   //성별 구분
            obj.sexdstnSeNm       = dhxGridEmpPopup2.cells(rId, 41).getValue();   //성별 구분 명
            //obj.empnmSe           = dhxGridEmpPopup2.cells(rId, 42).getValue();   //채용 구분
            //obj.empnmSeNm         = dhxGridEmpPopup2.cells(rId, 43).getValue();   //채용 구분 명
            obj.cashierAt         = dhxGridEmpPopup2.cells(rId, 44).getValue();   //출납담당 여부
            obj.hdadptAt          = dhxGridEmpPopup2.cells(rId, 45).getValue();   //겸임 여부
            obj.dprlrAt           = dhxGridEmpPopup2.cells(rId, 46).getValue();   //부서장 여부
            obj.lbunSbscrbAt      = dhxGridEmpPopup2.cells(rId, 47).getValue();   //노조 가입 여부
            obj.lbunSbscrbAtNm    = dhxGridEmpPopup2.cells(rId, 48).getValue();   //노조 가입 여부 명
            obj.mutaidSbscrbAt    = dhxGridEmpPopup2.cells(rId, 49).getValue();   //상조 가입 여부
            obj.dispWorkbAt       = dhxGridEmpPopup2.cells(rId, 50).getValue();   //파견 근무 여부
            obj.natvfrgnSeCode    = dhxGridEmpPopup2.cells(rId, 51).getValue();   //내외국인 구분 코드
            obj.natvfrgnSeCodeNm  = dhxGridEmpPopup2.cells(rId, 52).getValue();   //내외국인 구분 코드 명
            obj.ecnySeCode        = dhxGridEmpPopup2.cells(rId, 53).getValue();   //입사 구분 코드
            obj.ecnySeCodeNm      = dhxGridEmpPopup2.cells(rId, 54).getValue();   //입사 구분 코드 명
            obj.bplcCode          = dhxGridEmpPopup2.cells(rId, 55).getValue();   //사업장코드
            obj.bplcCodeNm        = dhxGridEmpPopup2.cells(rId, 56).getValue();   //사업장코드 명
            obj.salpeakAt         = dhxGridEmpPopup2.cells(rId, 57).getValue();   //임금피크제 여부
            obj.flexbizAt         = dhxGridEmpPopup2.cells(rId, 58).getValue();   //유연근무제 여부
            obj.ansalsysAt        = dhxGridEmpPopup2.cells(rId, 59).getValue();   //연봉제 여부
            
            obj.deptEngNm         = dhxGridEmpPopup2.cells(rId, 60).getValue();   //부서 영문 명
            obj.deptAbrv          = dhxGridEmpPopup2.cells(rId, 61).getValue();   //부서 약어
            obj.upperDeptCode     = dhxGridEmpPopup2.cells(rId, 62).getValue();   //상위 부서 코드
            obj.upperDeptNm       = dhxGridEmpPopup2.cells(rId, 63).getValue();   //상위 부서 명
            obj.deptLvl           = dhxGridEmpPopup2.cells(rId, 64).getValue();   //부서 레벨
            obj.orgnztLvl         = dhxGridEmpPopup2.cells(rId, 65).getValue();   //조직 레벨
            obj.deptTelno         = dhxGridEmpPopup2.cells(rId, 66).getValue();   //부서 전화번호
            obj.deptFaxTelno      = dhxGridEmpPopup2.cells(rId, 67).getValue();   //부서 FAX 전화번호
            obj.useBeginDe        = dhxGridEmpPopup2.cells(rId, 68).getValue();   //사용 시작 일자
            obj.useAt             = dhxGridEmpPopup2.cells(rId, 69).getValue();   //사용 여부
            obj.deptSe            = dhxGridEmpPopup2.cells(rId, 70).getValue();   //부서 구분
            obj.sortOrdr          = dhxGridEmpPopup2.cells(rId, 71).getValue();   //출력 순서
            obj.upperDeptAt       = dhxGridEmpPopup2.cells(rId, 72).getValue();   //상위부서 존재 여부

            obj.jblnCode          = dhxGridEmpPopup2.cells(rId, 73).getValue();   // 직렬 코드
            obj.jblnCodeNm        = dhxGridEmpPopup2.cells(rId, 74).getValue();   // 직렬 코드 명 
            obj.dtyCode           = dhxGridEmpPopup2.cells(rId, 75).getValue();   // 직무 코드
            obj.dtyCodeNm         = dhxGridEmpPopup2.cells(rId, 76).getValue();   // 직무 코드 명
            obj.emgncTelno        = dhxGridEmpPopup2.cells(rId, 77).getValue();   // 비상전화번호
            obj.indvdlEmail       = dhxGridEmpPopup2.cells(rId, 78).getValue();   // 개인 이메일
            obj.hdadptDeptCodeNm  = dhxGridEmpPopup2.cells(rId, 79).getValue();   // 겸임 부서 명
            obj.dispDeptCode      = dhxGridEmpPopup2.cells(rId, 80).getValue();   // 파견 부서 코드
            obj.dispDeptCodeNm    = dhxGridEmpPopup2.cells(rId, 81).getValue();   // 파견 부서 명
            obj.babyShrtenWorkAt  = dhxGridEmpPopup2.cells(rId, 82).getValue();   // 육아 단축 근무 여부
            obj.salaryAprpCode    = dhxGridEmpPopup2.cells(rId, 83).getValue();   // 급여 책정 코드
            obj.salaryAprpCodeNm  = dhxGridEmpPopup2.cells(rId, 84).getValue();   // 급여 책정 코드 명
            obj.apntcSdt          = dhxGridEmpPopup2.cells(rId, 85).getValue();   // 수습 시작일자
            obj.apntcEdt          = dhxGridEmpPopup2.cells(rId, 86).getValue();   // 수습 종료일자
            obj.incmtaxrtCode     = dhxGridEmpPopup2.cells(rId, 87).getValue();   // 소득세율 코드
            obj.incmtaxrtCodeNm   = dhxGridEmpPopup2.cells(rId, 88).getValue();   // 소득세율 코드 명
        }
    }
    $('#empPopup2 .b-close').click();
}

</script>
 
<div class="pop-content">
    <div class="path_div">
    </div>
    <div class="consearch_div_in">
            <div class="consearch_input">
                <form id="searchForm">
                    <ul class="consearchinput_list">
                        <li><span class="span"><taglibs:transText progrmId="default" key="titEmpno" /></span><input name="popupEmpNo" id="popupEmpNo" class="w70"></li>
                        <li><span class="span"><taglibs:transText progrmId="default" key="titEmpNm" /></span><input name="popupKorNm" id="popupKorNm" class="w120"></li>
                        <li><span class="span">재직구분</span><div id="divPopupHffsSeComboEmp2" class="div_combo"></div>
                        <div id="divPopupStmBizplcComboEmp2" name="divPopupStmBizplcComboEmp2" class="div_combo" style="visibility:hidden"></div></li>
                    </ul>
                </form>
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
        
        <div style="float:left; width:350px;">
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCnt"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div>
                <div class="div_liner" id="gridPopupMenu" style="height: 360px"></div>
            </div>
        </div>
        
        <div style="float:right; width:500px;">
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntEmp"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div>
                <div class="div_liner" id="gridPopupMenuEmp" style="height: 360px"></div>
            </div>
        </div>
            
         <div class="popup_footer_box">
            <button type="button" id="btnEmpPupupOk2" name="btnEmpPupupOk2">
                   <span class="glyphicon glyphicon-ok f15 mr5"></span>확인<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
             </button>
             <button type="button" id="btnEmpPupupClose" name="btnEmpPupupClose">
                   <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
             </button>
        </div>
</div>
</body>
