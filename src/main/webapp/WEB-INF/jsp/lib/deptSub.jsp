<!-- 
 *    프로그램       : 부서 팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.16
 *    사용테이블      : MHS_DEPT
 *    WEB-INF/jsp/lib/dept.jsp
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>

var gformIdPopupDept;
var gcodeIdPopupDept;
var gcodeNmIdPopupDept;
var gdeptInfoPopupDept;


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
    $("#searchForm").validate({ errorElement: 'div', ignore: '' });
}

function cf_SetComponentsPopupMenu(){
    var formId        = $("#deptPopup").attr("formId");
    var codeId        = $("#deptPopup").attr("codeId");
    var codeNmId      = $("#deptPopup").attr("codeNmId");
    var deptInfo      = $("#deptPopup").attr("deptInfo");
    var searchFlag    = $("#deptPopup").attr("searchFlag");
    var obj = "";
    
    if(typeof searchFlag != "undefined" && typeof codeId != "undefined" && searchFlag == "Y" && codeId != ""){
        obj = '#' + formId + " #" + codeId;
        gf_FormSetValue('searchForm', 'popupDeptCode', $.trim($(obj).val()), 'text');
    }
    else {
        gf_FormSetValue('searchForm', 'popupDeptCode', '', 'text');
    }
    
    if(typeof searchFlag != "undefined" && typeof codeNmId != "undefined" && searchFlag == "Y" && codeNmId != ""){
        obj = '#' + formId + " #" + codeNmId;
        gf_FormSetValue('searchForm', 'popupDeptKorNm', $.trim($(obj).val()), 'text');
    }
    else {
        gf_FormSetValue('searchForm', 'popupDeptKorNm', '', 'text');
    }
    
    gformIdPopupDept = formId;
    gcodeIdPopupDept = codeId;
    gcodeNmIdPopupDept = codeNmId;
    gdeptInfoPopupDept = deptInfo;

    var dhxGridMhsDeptListInfo = [];
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서코드', '200', 'center', 'str', 'ro', false, 'deptCode', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서명', '*', 'left', 'str', 'ro', false, 'deptKorNm', '', '')); /* gf_LocaleTrans('default', 'titDeptKorNm') */
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'deptEngNm', '')); // 부서 영문 명
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'deptAbrv', '')); // 부서 약어
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'bplcCode', '')); // 사업장 코드 
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'bplcNm', '')); // 사업장 명 
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'upperDeptCode', '')); // 상위 부서 코드
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'upperDeptNm', '')); // 상위 부서 명
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'deptLvl', '')); // 부서 레벨
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'orgnztLvl', '')); // 조직 레벨
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'deptTelno', '')); // 부서 전화번호
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'deptFaxTelno', '')); // 부서 FAX 전화번호
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'useBeginDe', '')); // 사용 시작 일자
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'useAt', '')); // 사용 여부
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'deptSe', '')); // 부서 구분
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'sortOrdr', '')); // 출력 순서 
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'upperDeptAt', '')); // 상위부서 존재 여부
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'upperDeptEngNm', '')); // 상위 부서 영문명
    dhxGridPopupMenu = gf_MakeDhxGrid('gridPopupMenuDept', dhxGridMhsDeptListInfo, true, false, false);
    dhxGridPopupMenu.enableAutoWidth(true);
    
    return true;
}

function cf_SetEventListenerPopupMenu(){
	// 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPopupMenu = gf_GridDetachEvent(dhxGridPopupMenu, eventIdPopupMenu);
    eventId = dhxGridPopupMenu.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
        }else if(keyCode == 13)  {   //ENTER  
            
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPopupMenu.getSelectedRowId();
            var ind        = dhxGridPopupMenu.getSelectedCellIndex();
            var rowIndex   = dhxGridPopupMenu.getRowIndex(selectedId);
            var type       = dhxGridPopupMenu.getColType(ind);
            dhxGridPopupMenu.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPopupMenu.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPopupMenu.getSelectedRowId();
            var ind        = dhxGridPopupMenu.getSelectedCellIndex();
            var rowIndex   = dhxGridPopupMenu.getRowIndex(selectedId);
            var type       = dhxGridPopupMenu.getColType(ind);
            dhxGridPopupMenu.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPopupMenu.editCell();
            }
        }
        else return true;
    });
    dhxGridPopupMenu.attachEvent("onRowDblClicked", function(rId,cInd){
        fn_SearchDeptOk(rId);
    });
    //버튼 이벤트 ==========================================================================================
    $('#btnPopupSearch').unbind('click').bind('click', function() {
        fn_SearchPopupDept();
    });
    $('#btnPopupInit').unbind('click').bind('click', function() {
        $('#searchForm').resetForm();
        gf_FormSetValue("searchForm", "searchComboRdUseAtDeptPopup", '1', 'combo');
    	cf_InitFormPopupMenu()
    });
    
    $('#btnDeptPupupClose').unbind('click').bind('click', function() {
        $('#deptPopup .b-close').click();
    });
    $('#btnDeptPopupOk').unbind('click').bind('click', function() {
        var selectedId = dhxGridPopupMenu.getSelectedRowId();
        fn_SearchDeptOk(selectedId);
    });
    // 기타 이벤트 ==========================================================================================
	$('#searchForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnPopupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    
}

function cf_InitFormPopupMenu(){
	$('#popupDeptKorNm').focus();
}

function cf_SetBindingPopupMenu(){
    fn_SearchPopupDept();
}

function fn_SearchPopupDept(){
    var jsonParameter = {
            deptCode : gf_FormGetValue('searchForm', 'popupDeptCode', 'text'),
            deptKorNm : gf_FormGetValue('searchForm', 'popupDeptKorNm', 'text'),
            useAt : gf_FormGetValue('searchForm', 'useAtSearch', 'combo'),
            bplcCode : gBplcCode
    };
    gf_Transaction('gridPopupMenuDept', 'dept/searchDept', jsonParameter, 'fn_CallbackSearchGridListDeptPopup', false, 'GET');
}

function fn_CallbackSearchGridListDeptPopup (strSvcID, targetID, data){
    dhxGridPopupMenu.clearAll();
    var totCnt = data.data.records.length;
    if(!gf_IsNull(data.data.records) && totCnt > 0){
        gf_NoFoundDataOnGridMsgRemove('gridPopupMenuDept');
        dhxGridPopupMenu.parse(data.data.records, 'js');
        dhxGridPopupMenu.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('gridPopupMenuDept');
    }
    $('#spanCntPopupDept').text(gf_NumberWithCommas(totCnt));
    cf_SetEventListenerPopupMenu();
};

function fn_SearchDeptOk(rId){
    var obj = "";
    if(gformIdPopupDept != "" && gcodeIdPopupDept != ""){
     obj = '#' + gformIdPopupDept + " #" + gcodeIdPopupDept;
     $(obj).val(dhxGridPopupMenu.cells(rId, 1).getValue());   //부서코드
    } 
    if(gformIdPopupDept != "" && gcodeNmIdPopupDept != ""){
     obj = '#' + gformIdPopupDept + " #" + gcodeNmIdPopupDept;
     $(obj).val(dhxGridPopupMenu.cells(rId, 2).getValue());   //부서명
   }

    /*
    console.log("부서코드 : " + dhxGridPopupMenu.cells(rId, 1).getValue());
    console.log("부서 한글 명 : " + dhxGridPopupMenu.cells(rId, 2).getValue());
    console.log("부서 영문 명 : " + dhxGridPopupMenu.cells(rId, 3).getValue());
    console.log("부서 약어 : " + dhxGridPopupMenu.cells(rId, 4).getValue());
    console.log("사업장 코드 : " + dhxGridPopupMenu.cells(rId, 5).getValue());
    console.log("사업장 명 : " + dhxGridPopupMenu.cells(rId, 6).getValue());
    console.log("상위 부서 코드 : " + dhxGridPopupMenu.cells(rId, 7).getValue());
    console.log("상위 부서 명 : " + dhxGridPopupMenu.cells(rId, 8).getValue());
    console.log("부서 레벨 : " + dhxGridPopupMenu.cells(rId, 9).getValue());
    console.log("조직 레벨 : " + dhxGridPopupMenu.cells(rId, 10).getValue());
    console.log("부서 전화번호 : " + dhxGridPopupMenu.cells(rId, 11).getValue());
    console.log("부서 FAX 전화번호 : " + dhxGridPopupMenu.cells(rId, 12).getValue());
    console.log("사용 시작 일자 : " + dhxGridPopupMenu.cells(rId, 13).getValue());
    console.log("사용 여부 : " + dhxGridPopupMenu.cells(rId, 14).getValue());
    console.log("부서 구분 : " + dhxGridPopupMenu.cells(rId, 15).getValue());
    console.log("출력 순서 : " + dhxGridPopupMenu.cells(rId, 16).getValue());
    console.log("상위부서 존재 여부 : " + dhxGridPopupMenu.cells(rId, 17).getValue());
    console.log("상위 부서 영문 명 : " + dhxGridPopupMenu.cells(rId, 18).getValue());
    */
         
    if(gdeptInfoPopupDept != ""){
        obj = eval("$" + gdeptInfoPopupDept);
        if(typeof obj == "object"){
            obj.deptCode      = dhxGridPopupMenu.cells(rId, 1).getValue();   //부서코드
            obj.deptKorNm     = dhxGridPopupMenu.cells(rId, 2).getValue();   //부서 한글 명
            obj.deptEngNm     = dhxGridPopupMenu.cells(rId, 3).getValue();   //부서 영문 명
            obj.deptAbrv      = dhxGridPopupMenu.cells(rId, 4).getValue();   //부서 약어
            obj.bplcCode      = dhxGridPopupMenu.cells(rId, 5).getValue();   //사업장 코드
            obj.bplcNm        = dhxGridPopupMenu.cells(rId, 6).getValue();   //사업장 명
            obj.upperDeptCode = dhxGridPopupMenu.cells(rId, 7).getValue();   //상위 부서 코드
            obj.upperDeptNm   = dhxGridPopupMenu.cells(rId, 8).getValue();   //상위 부서 명
            obj.deptLvl       = dhxGridPopupMenu.cells(rId, 9).getValue();   //부서 레벨
            obj.orgnztLvl     = dhxGridPopupMenu.cells(rId, 10).getValue();   //조직 레벨
            obj.deptTelno     = dhxGridPopupMenu.cells(rId, 11).getValue();   //부서 전화번호
            obj.deptFaxTelno  = dhxGridPopupMenu.cells(rId, 12).getValue();   //부서 FAX 전화번호
            obj.useBeginDe    = dhxGridPopupMenu.cells(rId, 13).getValue();   //사용 시작 일자
            obj.useAt         = dhxGridPopupMenu.cells(rId, 14).getValue();   //사용 여부
            obj.deptSe        = dhxGridPopupMenu.cells(rId, 15).getValue();   //부서 구분
            obj.sortOrdr      = dhxGridPopupMenu.cells(rId, 16).getValue();   //출력 순서
            obj.upperDeptAt   = dhxGridPopupMenu.cells(rId, 17).getValue();   //상위부서 존재 여부
            obj.upperDeptEngNm   = dhxGridPopupMenu.cells(rId, 18).getValue();   //상위 부서 영문 명
        }
    }
    
    $('#deptPopup .b-close').click();
};
</script>
 
<div class="pop-content">    
    <div class="path_div">
    </div>
    <form id="searchForm">
        <div class="consearch_div_in">
            <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li><span class="span">부서코드</span><input name="popupDeptCode" id="popupDeptCode" class="w60"></li>
                        <li><span class="span">부서명</span><input name="popupDeptKorNm" id="popupDeptKorNm" class="w90"></li>
                    </ul>
            </div>
        </div>
        <div class="consearch_div_in">
            <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li><span class="span"><label for="docmT">사용여부</span>
                                <select id="useAtSearch" name="useAtSearch">
                                    <option value="">전체</option>
                                    <option value="1" selected>사용</option>
                                    <option value="0">미사용</option>
                                </select>                            
                           </li>
                     </ul>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnPopupSearch"><span
                                class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnPopupInit"><span
                                class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
    </form>
        <div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntPopupDept"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div>
                <div class="div_liner" id="gridPopupMenuDept" style="width: 100%; height: 335px"></div>
            </div>
            
            <div class="popup_footer_box">
                <button type="button" id="btnDeptPopupOk" name="btnDeptPopupOk">
                      <span class="glyphicon glyphicon-ok f15 mr5"></span>확인<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                </button>
                <button type="button" id="btnDeptPupupClose" name="btnDeptPupupClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
            </div>
        </div>
    </div>
</div>
</body>
