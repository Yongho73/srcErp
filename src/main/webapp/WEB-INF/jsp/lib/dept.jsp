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
var rootOrgnztCode = '0000';
var rootMenuUpperOrgnztCode = '0000';

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
}

function cf_SetComponentsPopupMenu(){

    var dhxGridMhsDeptListInfo = [];
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직코드', '100', 'center', 'str', 'ro', false, 'orgnztCode', '', '')); /* gf_LocaleTrans('default', 'titOrgnztCode') */
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직명', '*', 'left', 'str', 'tree', false, 'orgnztName', '', '')); /* gf_LocaleTrans('default', 'titOrgnztNm') */
    
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서코드', '0', 'left', 'str', 'ro', true, 'deptCode', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('상위조직코드', '0', 'left', 'str', 'ro', true, 'upperOrgnztCode', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직관리자번호', '0', 'left', 'str', 'ro', true, 'orgnztMngrEmpno', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직관리자이름', '0', 'left', 'str', 'ro', true, 'orgnztMngrEmpNm', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직구분코드', '0', 'left', 'str', 'ro', true, 'orgnztSeCode', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직구분명', '0', 'left', 'str', 'ro', true, 'orgnztSeCodeNm', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직계위', '0', 'left', 'str', 'ro', true, 'orgnztLvl', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직사용시작일자', '0', 'left', 'str', 'ro', true, 'useBeginDe', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직사용종료일자', '0', 'left', 'str', 'ro', true, 'useEndDe', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직사용여부', '0', 'left', 'str', 'ro', true, 'useAt', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직부서종류코드', '0', 'left', 'str', 'ro', true, 'deptKindCode', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직부서한글명', '0', 'left', 'str', 'ro', true, 'deptKorNm', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직부서영문명', '0', 'left', 'str', 'ro', true, 'deptEngNm', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서약어', '0', 'left', 'str', 'ro', true, 'deptAbrv', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서정렬순서', '0', 'left', 'str', 'ro', true, 'sortOrdr', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서전화번호', '0', 'left', 'str', 'ro', true, 'deptTelno', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서팩스번호', '0', 'left', 'str', 'ro', true, 'deptFaxTelno', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서이메일', '0', 'left', 'str', 'ro', true, 'deptEmail', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서장사번', '0', 'left', 'str', 'ro', true, 'dprlrEmpno', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서장이름', '0', 'left', 'str', 'ro', true, 'dprlrEmpNm', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('예산사용부서', '0', 'left', 'str', 'ro', true, 'bugtUseDept', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서사용시작일자', '0', 'left', 'str', 'ro', true, 'deptUseBeginDe', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서사용종료일자', '0', 'left', 'str', 'ro', true, 'deptUseEndDe', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('부서사용여부', '0', 'left', 'str', 'ro', true, 'deptUseAt', '', ''));
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('조직명', '0', 'left', 'str', 'ro', true, 'orgnztNm', '', '')); /* gf_LocaleTrans('default', 'titOrgnztNm') */
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
    //enter이벤트 구분 이유 : (#searchForm input, select, button, textarea)의 경우 팝업이 닫힌 뒤 textarea의 엔터키가 안되는 오류 발생
	$('#popupDeptCode').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13) {
        	fn_SearchPopupDept();
        }
    });
	$('#popupDeptKorNm').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13) {
        	fn_SearchPopupDept();
        }
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
    		orgnztCode : gf_FormGetValue('searchForm', 'popupDeptCode', 'text'),
    		orgnztNm : gf_FormGetValue('searchForm', 'popupDeptKorNm', 'text'),
            useAt : gf_FormGetValue('searchForm', 'useAtSearch', 'combo'),
            bplcCode : gBplcCode
    };
    gf_Transaction('gridPopupMenuDept', 'dept/searchTreeDept', jsonParameter, 'fn_CallbackSearchGridListDeptPopup', false, 'GET');
}

function fn_CallbackSearchGridListDeptPopup (strSvcID, targetID, data){
    dhxGridPopupMenu.clearAll();
    if(cf_SetComponentsPopupMenu()){ 
        if(!gf_IsNull(data.data.records)){
            if(!gf_IsNull(data.data.records)){
                var menus = data.data.records;       
                var menuList = [];
                var menuObj = {};
                var count = 0;
                menus.forEach(function(menu) {
                    menuObj = {};
                    menuObj.num = menu.num;
                    menuObj.id = menu.orgnztCode;
                    menuObj.orgnztCode = menu.orgnztCode;
                    menuObj.deptCode = menu.deptCode;
                    menuObj.deptKorNm = menu.deptKorNm;
                    menuObj.deptEngNm = menu.deptEngNm;
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
                    if(menu.upperOrgnztCode == '0000') {
                        menuObj.orgnztName = {
                            value: menu.orgnztNm,
                            image: 'folder.gif'
                        };
                    } else {
                        menuObj.orgnztName = menu.orgnztNm;
                    }  
                    menuList[count] = menuObj;
                    count++;
                });
                // 트리구조 만들때 반드시 최상위 메뉴의 최상의 메뉴 id도 있어야 무한루프에 안빠진다.
                var menuTree = gf_TreeModel(menuList, '0000');
                dhxGridPopupMenu.clearAll();
    
                gf_NoFoundDataOnGridMsgRemove('gridPopupMenuDept');
                dhxGridPopupMenu.parse(JSON.stringify(menuTree),'js');
                dhxGridPopupMenu.openItem(rootOrgnztCode);
         } else {
             gf_NoFoundDataOnGridMsg('gridPopupMenuDept');
         }
         $("#spanCntSearchFormMhshrm003").text(data.data.records.length);
         cf_SetEventListenerPopupMenu();
        }
    }
};

function fn_SearchDeptOk(rId){
    var obj = "";
    if(gformIdPopupDept != "" && gcodeIdPopupDept != ""){
     obj = '#' + gformIdPopupDept + " #" + gcodeIdPopupDept;
//      $(obj).val(dhxGridPopupMenu.cells(rId, 1).getValue());   //부서코드
     $(obj).val(dhxGridPopupMenu.cells(rId, 1).getValue()).change(); 
    } 
    if(gformIdPopupDept != "" && gcodeNmIdPopupDept != ""){
     obj = '#' + gformIdPopupDept + " #" + gcodeNmIdPopupDept;
      $(obj).val(dhxGridPopupMenu.cells(rId, 2).getValue());   //부서명
     //$(obj).val(dhxGridPopupMenu.cells(rId, 1).getValue()).change(); 
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
            obj.inputCodeId     = '#' + gformIdPopupDept + " #" + gcodeIdPopupDept; // 입력 코드
            obj.inputCodeNm     = '#' + gformIdPopupDept + " #" + gcodeNmIdPopupDept; // 입력 코드명
        	obj.orgnztCode      = dhxGridPopupMenu.cells(rId, 1).getValue();   //조직코드
            obj.orgnztNm        = dhxGridPopupMenu.cells(rId, 2).getValue();   //조직명
            obj.deptCode        = dhxGridPopupMenu.cells(rId, 3).getValue();   //부서코드
            obj.upperOrgnztCode = dhxGridPopupMenu.cells(rId, 4).getValue();   //상위조직코드
            obj.orgnztMngrEmpno = dhxGridPopupMenu.cells(rId, 5).getValue();   //조직관리자사번
            obj.orgnztMngrEmpNm = dhxGridPopupMenu.cells(rId, 6).getValue();   //조직관리자이름
            obj.orgnztSeCode    = dhxGridPopupMenu.cells(rId, 7).getValue();   //조직구분코드
            obj.orgnztSeCodeNm  = dhxGridPopupMenu.cells(rId, 8).getValue();   //조직구분명
            obj.orgnztLvl       = dhxGridPopupMenu.cells(rId, 9).getValue();   //조직계위
            obj.useBeginDe      = dhxGridPopupMenu.cells(rId, 10).getValue();   //조직사용시작일자
            obj.useEndDe        = dhxGridPopupMenu.cells(rId, 11).getValue();   //조직사용종료일자
            obj.useAt           = dhxGridPopupMenu.cells(rId, 12).getValue();   //조직사용여부
            obj.deptKindCode    = dhxGridPopupMenu.cells(rId, 13).getValue();   //조직부서종류코드
            obj.deptKorNm       = dhxGridPopupMenu.cells(rId, 14).getValue();   //조직부서한글명
            obj.deptEngNm       = dhxGridPopupMenu.cells(rId, 15).getValue();   //조직부서영문명
            obj.deptAbrv        = dhxGridPopupMenu.cells(rId, 16).getValue();   //부서약어
            obj.sortOrdr        = dhxGridPopupMenu.cells(rId, 17).getValue();   //부서정렬순서
            obj.deptTelno       = dhxGridPopupMenu.cells(rId, 18).getValue();   //부서전화번호
            obj.deptFaxTelno    = dhxGridPopupMenu.cells(rId, 19).getValue();   //부서팩스번호
            obj.deptEmail       = dhxGridPopupMenu.cells(rId, 20).getValue();   //부서이메일
            obj.dprlrEmpno      = dhxGridPopupMenu.cells(rId, 21).getValue();   //부서장사번
            obj.dprlrEmpNm      = dhxGridPopupMenu.cells(rId, 22).getValue();   //부서장이름
            obj.bugtUseDept     = dhxGridPopupMenu.cells(rId, 23).getValue();   //예산사용부서
            obj.deptUseBeginDe  = dhxGridPopupMenu.cells(rId, 24).getValue();   //부서사용시작일자
            obj.deptUseEndDe    = dhxGridPopupMenu.cells(rId, 25).getValue();   //부서사용종료일자
            obj.deptUseAt       = dhxGridPopupMenu.cells(rId, 26).getValue();   //부서사용여부
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
                        <li><span class="span">조직코드</span><input name="popupDeptCode" id="popupDeptCode" class="w60"></li>
                        <li><span class="span">조직명</span><input name="popupDeptKorNm" id="popupDeptKorNm" class="w90"></li>
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
