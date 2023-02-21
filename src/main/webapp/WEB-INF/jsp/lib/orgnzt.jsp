<!-- 
 *    프로그램       : 조직코드 팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.21
 *    사용테이블      : MHS_ORGNZT
 *    WEB-INF/jsp/lib/orgnzt.jsp
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxTreeMenuPopupOrgnzt;

var gformIdPopupOrgnzt;
var gcodeIdPopupOrgnzt;
var gcodeNmIdPopupOrgnzt;
var gorgnztInfoPopupOrgnzt;

$(function() {	
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
    cf_InitFormPopupMenu();
});

function cf_InitParamPopupMenu(){
	
	//사업장
    var stmBizplcCode = $("#orgnztPopup").attr("stmBizplcCode");
    var searchFlag    = $("#orgnztPopup").attr("searchFlag");
  	//사용여부
    // divId, selectId(지정ID),  selectName(지정명), placeHolder(=search or add), codekindCode, exceptCode(=코드), selectStyle, selectClass, sortOrder, required
	//gf_ComboCode('divPopupRdUseAtComboOrgnzt', 'searchComboRdUseAtOrgnztPopup', 'searchComboRdUseAtOrgnztPopup', 'search', 'C025', '' , '', '', 'asc', '');
	gf_FormSetValue("searchOrgnztPopupForm", "useAt", "1", "combo"); 
}

function cf_SetComponentsPopupMenu(){
    var formId        = $("#orgnztPopup").attr("formId");
    var codeId        = $("#orgnztPopup").attr("codeId");
    var codeNmId      = $("#orgnztPopup").attr("codeNmId");
    var orgnztInfo    = $("#orgnztPopup").attr("orgnztInfo");
    var searchFlag    = $("#orgnztPopup").attr("searchFlag");
    var obj = "";
    
    if(typeof searchFlag != "undefined" && typeof codeId != "undefined" && searchFlag == "Y" && codeId != ""){
    	obj = '#' + formId + " #" + codeId;
    	gf_FormSetValue('searchOrgnztPopupFormPopupMenu', 'popupOrgnztCode', $.trim($(obj).val()), 'text');
    }
    else {
    	gf_FormSetValue('searchOrgnztPopupFormPopupMenu', 'popupOrgnztCode', '', 'text');
    }
    
    if(typeof searchFlag != "undefined" && typeof codeNmId != "undefined" && searchFlag == "Y" && codeNmId != ""){
    	obj = '#' + formId + " #" + codeNmId;
    	gf_FormSetValue('searchOrgnztPopupFormPopupMenu', 'popupOrgnztNm', $.trim($(obj).val()), 'text');
    }
    else {
    	gf_FormSetValue('searchOrgnztPopupFormPopupMenu', 'popupOrgnztNm', '', 'text');
    }
    
    gformIdPopupOrgnzt = formId;
    gcodeIdPopupOrgnzt = codeId;
    gcodeNmIdPopupOrgnzt = codeNmId;
    gorgnztInfoPopupOrgnzt = orgnztInfo;

    var dhxGridMhsOrgnztListInfo = [];
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); // 번호
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('조직코드', '80', 'center', 'str', 'ro', false, 'orgnztCode', '', '')); /* gf_LocaleTrans('default', 'titOrgnztCode') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('조직명', '*', 'left', 'str', 'tree', false, 'orgnztNm', '', '')); /* gf_LocaleTrans('default', 'titOrgnztNm') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('조직구분', '100', 'center', 'str', 'coro', false, 'orgnztSeCode', '', '')); /* gf_LocaleTrans('default', 'titOrgnztSeCode') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('사용여부', '70', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('상위조직코드', '10', 'center', 'str', 'ro', true, 'upOrgnztCode', '', '')); /* gf_LocaleTrans('default', 'titUpOrgnztCode') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('조직레벨', '10', 'center', 'int', 'ro', true, 'orgnztLvl', '', '')); /* gf_LocaleTrans('default', 'titOrgnztLvl') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('사용시작일자', '10', 'center', 'str', 'ro', true, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('사용종료일자', '10', 'center', 'str', 'ro', true, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('1급정원', '10', 'center', 'int', 'ro', true, 'grad1Psncpa', '', '')); /* gf_LocaleTrans('default', 'titGrad1Psncpa') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('2급정원', '10', 'center', 'int', 'ro', true, 'grad2Psncpa', '', '')); /* gf_LocaleTrans('default', 'titGrad2Psncpa') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('3급정원', '10', 'center', 'int', 'ro', true, 'grad3Psncpa', '', '')); /* gf_LocaleTrans('default', 'titGrad3Psncpa') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('4급정원', '10', 'center', 'int', 'ro', true, 'grad4Psncpa', '', '')); /* gf_LocaleTrans('default', 'titGrad4Psncpa') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('5급정원', '10', 'center', 'int', 'ro', true, 'grad5Psncpa', '', '')); /* gf_LocaleTrans('default', 'titGrad5Psncpa') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('6급정원', '10', 'center', 'int', 'ro', true, 'grad6Psncpa', '', '')); /* gf_LocaleTrans('default', 'titGrad6Psncpa') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('7급정원', '10', 'center', 'int', 'ro', true, 'grad7Psncpa', '', '')); /* gf_LocaleTrans('default', 'titGrad7Psncpa') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('8급정원', '10', 'center', 'int', 'ro', true, 'grad8Psncpa', '', '')); /* gf_LocaleTrans('default', 'titGrad8Psncpa') */
    dhxGridMhsOrgnztListInfo.push(gf_MakeDhxGridHeader('9급정원', '10', 'center', 'int', 'ro', true, 'grad9Psncpa', '', '')); /* gf_LocaleTrans('default', 'titGrad9Psncpa') */

    dhxTreeMenuPopupOrgnzt = gf_MakeDhxGrid('gridPopupMenuOrgnzt', dhxGridMhsOrgnztListInfo, true, false, false);

    dhxTreeMenuPopupOrgnzt.enableAutoWidth(true);
    //dhxTreeMenuPopupOrgnzt.attachEvent('onRowSelect', fn_SaveMhsDept);
    
    var jsonParameter = {codekindCode : "C097",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxTreeMenuPopupOrgnzt, dhxTreeMenuPopupOrgnzt.getColIndexById("orgnztSeCode"), dataSource.data); /* 그리드콤보*/
	
	$("input:radio[name=rdUseAt]").css('display','inline');
}

var eventIds = [];
function cf_SetEventListenerPopupMenu(){
 	
	var eventId;
    eventIds = gf_GridDetachEvent(dhxTreeMenuPopupOrgnzt, eventIds);
    
 
    eventId = dhxTreeMenuPopupOrgnzt.attachEvent("onRowDblClicked", function(rId,cInd){
    	fn_SearchOrgnztOk(rId);
	});
    eventIds.push(eventId);
    
    eventId = dhxTreeMenuPopupOrgnzt.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
		if(cInd == gf_GetDhxGridColumId(dhxTreeMenuPopupOrgnzt, 'orgnztNm') || cInd == gf_GetDhxGridColumId(dhxTreeMenuPopupOrgnzt, 'orgnztSeCode') || cInd == gf_GetDhxGridColumId(dhxTreeMenuPopupOrgnzt, 'useAt')) { return false; }	
		return true;		
	});
    eventIds.push(eventId);
    
    $('#searchOrgnztPopupForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnDeptPupupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    });
	
	$('#btnDeptPupupSearch').unbind('click').bind('click', function() {
    	fn_SearchPopupOrgnzt();
    });
	
    $('#btnDeptPupupInit').unbind('click').bind('click', function() {
    	gf_FormSetValue('searchOrgnztPopupForm', 'popupOrgnztCode', '', 'text');
    	gf_FormSetValue('searchOrgnztPopupForm', 'popupOrgnztNm', '', 'text');
    	//$("#searchComboRdUseAtOrgnztPopup option:eq(0)").prop("selected", true);
    	gf_FormSetValue("searchOrgnztPopupForm", "useAt", "1", "combo"); 
    	$("#searchComboStmBizplcOrgnzt").val("1000").prop("selected", true);
    	cf_InitFormPopupMenu();
    });
    
    $('#btnDeptPupupClose').unbind('click').bind('click', function() {
    	$('#orgnztPopup .b-close').click();
    });
    
    $('#searchComboStmBizplcOrgnzt').unbind('change').bind('change', function() {
    	fn_SearchPopupOrgnzt();
    });
	
    $('#btnDeptPopupOk').unbind('click').bind('click', function() {
    	var selectedId = dhxTreeMenuPopupOrgnzt.getSelectedRowId();
    	fn_SearchOrgnztOk(selectedId);
    });
    

}

function cf_SetBindingPopupMenu(){
	setTimeout(function() { 
		fn_SearchPopupOrgnzt();
	}, 500);
}

function cf_InitFormPopupMenu(){
	$('#popupOrgnztNm').focus();
}

function fn_SearchPopupOrgnzt(){

	var jsonParameter = {
			orgnztCode : gf_FormGetValue('searchOrgnztPopupForm', 'popupOrgnztCode', 'text'),
			orgnztNm : gf_FormGetValue('searchOrgnztPopupForm', 'popupOrgnztNm', 'text'),
	    	useAt :   gf_FormGetValue('searchOrgnztPopupForm', 'useAt', 'combo')
	};

	//var dataSource = gf_NoAsyncTransaction('dept/searchDept', jsonParameter, 'GET');
	//gf_Transaction('gridPopupMenuOrgnzt', 'mhshrm002/searchMhsDept', jsonParameter, 'fn_CallbackSearchGridListOrgnztPopup', false, 'GET');
	gf_Transaction('gridPopupMenuOrgnzt', 'mhshrm003/searchMhshrm003', jsonParameter, 'fn_CallbackSearchGridListOrgnztPopup', false, 'GET');
}

var rootMenuId = '00000';
function fn_CallbackSearchGridListOrgnztPopup (strSvcID, targetID, data){
	
	dhxTreeMenuPopupOrgnzt.clearAll();
	var totCnt = data.data.records.length;
	//console.log(" totCnt : " + totCnt);
    if(!gf_IsNull(data.data.records) && totCnt > 0){
    	
    	var menus = data.data.records;
    	var menuList = [];
    	var menuObj = {};
    	var count = 0;
    	
    	/*
    	//menus.forEach(function(menu) {
    	for (var menu of menus) {
    		//console.log(" forEach count : " + count);
    		//console.log(" menu : " + menu);
    		//console.log(" menu.deptLvl : " + menu.deptLvl);
    		//console.log(" menu.upperDeptCode : " + menu.upperDeptCode);
    		console.log(" menu.deptCode : " + menu.deptCode);
    		console.log(" menu.deptKor : " + menu.deptKorNm);
    		if(menu.deptLvl == "1" && menu.upperDeptCode != ""){
    			rootStr = menu.upperDeptCode;
    		}
    		menuObj = {};
    		menuObj.id = menu.deptCode;
			menuObj.parentId = menu.upperDeptCode;
		    menuObj.deptCode = menu.deptCode;
    		menuObj.deptKorNm = menu.deptKorNm;
			menuObj.deptEngNm = menu.deptEngNm;
			menuObj.deptAbrv = menu.deptAbrv;
			menuObj.bplcCode = menu.bplcCode;
			menuObj.bplcNm = menu.bplcNm;
			menuObj.upperDeptCode = menu.upperDeptCode;
			menuObj.upperDeptNm = menu.upperDeptNm;
			menuObj.deptLvl = menu.deptLvl;
			menuObj.orgnztLvl = menu.orgnztLvl;
			menuObj.deptTelno = menu.deptTelno;
			menuObj.deptFaxTelno = menu.deptFaxTelno;
			menuObj.useBeginDe = menu.useBeginDe;
			menuObj.useAt = menu.useAt;
			menuObj.deptSe = menu.deptSe;
			menuObj.sortOrdr = menu.sortOrdr;
			menuObj.upperDeptAt  = menu.upperDeptAt;
			menuObj.upperDeptEngNm  = menu.upperDeptEngNm;

			if(menu.upperDeptAt = '1') {
				menuObj.deptKorNm = {
					value: menu.deptKorNm,
					image: 'folder.gif'
				};
			} else {
				menuObj.deptKorNm = menu.deptKorNm;
			}
	
			menuList[count] = menuObj;
			count++;
			
			if(count == totCnt){
				break;
			}
		//});
    	}
    	*/

    	for (var i=0; i < totCnt; i++) {
    		var menu = menus[i];
    		//console.log(" menu.deptCode : " + menu.deptCode);
    		//console.log(" menu.deptKor : " + menu.deptKorNm);
    		
    		menuObj = {};
    		menuObj.id = menu.orgnztCode;
            menuObj.parentId = menu.upOrgnztCode;

            menuObj.orgnztCode = menu.orgnztCode;
            menuObj.upOrgnztCode = menu.upOrgnztCode;
            menuObj.orgnztNm = menu.orgnztNm;
            
            menuObj.orgnztSeCode = menu.orgnztSeCode;
            menuObj.orgnztLvl = menu.orgnztLvl;
            menuObj.useBeginDe = menu.useBeginDe;
            menuObj.useEndDe = menu.useEndDe;
            menuObj.datePickerButtonS = "";
            menuObj.datePickerButtonE = "";
            menuObj.grad1Psncpa = menu.grad1Psncpa;
            menuObj.grad2Psncpa = menu.grad2Psncpa;
            menuObj.grad3Psncpa = menu.grad3Psncpa;
            menuObj.grad4Psncpa = menu.grad4Psncpa;
            menuObj.grad5Psncpa = menu.grad5Psncpa;
            menuObj.grad6Psncpa = menu.grad6Psncpa;
            menuObj.grad7Psncpa = menu.grad7Psncpa;
            menuObj.grad8Psncpa = menu.grad8Psncpa;
            menuObj.grad9Psncpa = menu.grad9Psncpa;
            menuObj.useAt = menu.useAt;
            menuObj.regId = menu.regId;
            
            if(menu.orgnztLvl == 0 || menu.orgnztLvl == 1) {
                menuObj.orgnztNm = {
                    value: menu.orgnztNm,
                    image: 'folder.gif'
                };
            } else {
                menuObj.orgnztNm = menu.orgnztNm;
            }
	
			menuList[i] = menuObj;
    	}
    	
    	//console.log(" ** rootStr : " + rootStr);
    	
   	    var menuTree = gf_TreeModel(menuList, rootMenuId);
   	    dhxTreeMenuPopupOrgnzt.parse(JSON.stringify(menuTree),'js');
   	    //fn_roleMenuDisabledAll();
   	 	dhxTreeMenuPopupOrgnzt.expandAll();
   	 	gf_NoFoundDataOnGridMsgRemove('gridPopupMenuOrgnzt');
    	
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
        gf_NoFoundDataOnGridMsg('gridPopupMenuOrgnzt');
    }
    $("#spanCntPopupDept").text(gf_NumberWithCommas(totCnt));
    cf_SetEventListenerPopupMenu();
};

function fn_SearchOrgnztOk(rId){

    var obj = "";
    if(gformIdPopupOrgnzt != "" && gcodeIdPopupOrgnzt != ""){
   	 obj = '#' + gformIdPopupOrgnzt + " #" + gcodeIdPopupOrgnzt;
   	 $(obj).val(dhxTreeMenuPopupOrgnzt.cells(rId, 1).getValue());   //조직코드
    } 
    if(gformIdPopupOrgnzt != "" && gcodeNmIdPopupOrgnzt != ""){
   	 obj = '#' + gformIdPopupOrgnzt + " #" + gcodeNmIdPopupOrgnzt;
   	 $(obj).val(dhxTreeMenuPopupOrgnzt.cells(rId, 2).getValue());   //조직명
   }

	
	if(gorgnztInfoPopupOrgnzt != ""){
		obj = eval("$" + gorgnztInfoPopupOrgnzt);
		if(typeof obj == "object"){
			obj.orgnztCode    = dhxTreeMenuPopupOrgnzt.cells(rId, 1).getValue();   //조직코드
			obj.orgnztNm 	  = dhxTreeMenuPopupOrgnzt.cells(rId, 2).getValue();   //조직명
			obj.orgnztSeCode  = dhxTreeMenuPopupOrgnzt.cells(rId, 3).getValue();   //조직구분
			obj.useAt 	      = dhxTreeMenuPopupOrgnzt.cells(rId, 4).getValue();   //사용 여부
			obj.upOrgnztCode  = dhxTreeMenuPopupOrgnzt.cells(rId, 5).getValue();   //상위조직코드
			obj.orgnztLvl 	  = dhxTreeMenuPopupOrgnzt.cells(rId, 6).getValue();   //조직 레벨
			obj.useBeginDe 	  = dhxTreeMenuPopupOrgnzt.cells(rId, 7).getValue();   //사용시작일자
			obj.useEndDe 	  = dhxTreeMenuPopupOrgnzt.cells(rId, 8).getValue();   //사용종료일자
			obj.grad1Psncpa   = dhxTreeMenuPopupOrgnzt.cells(rId, 9).getValue();   //1급정원
			obj.grad2Psncpa   = dhxTreeMenuPopupOrgnzt.cells(rId, 10).getValue();   //2급정원
			obj.grad3Psncpa   = dhxTreeMenuPopupOrgnzt.cells(rId, 11).getValue();   //3급정원
			obj.grad4Psncpa   = dhxTreeMenuPopupOrgnzt.cells(rId, 12).getValue();   //4급정원
			obj.grad5Psncpa   = dhxTreeMenuPopupOrgnzt.cells(rId, 13).getValue();   //5급정원
			obj.grad6Psncpa   = dhxTreeMenuPopupOrgnzt.cells(rId, 14).getValue();   //6급정원
			obj.grad7Psncpa   = dhxTreeMenuPopupOrgnzt.cells(rId, 15).getValue();   //7급정원
			obj.grad8Psncpa   = dhxTreeMenuPopupOrgnzt.cells(rId, 16).getValue();   //8급정원
			obj.grad9Psncpa   = dhxTreeMenuPopupOrgnzt.cells(rId, 17).getValue();   //9급정원
		}
	}
    
	$('#orgnztPopup .b-close').click();
};
</script>
 
    <div class="pop-content">	
    <div class="path_div">
    </div>
        <form id="searchOrgnztPopupForm">
        <div class="consearch_div_in">
            <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li><span class="span">조직코드</span><input name="popupOrgnztCode" id="popupOrgnztCode" class="w70"></li>
                        <li><span class="span">조직명</span><input name="popupOrgnztNm" id="popupOrgnztNm" class="w110"></li>
                    </ul>
            </div>
        </div>
        <div class="consearch_div_in">
            <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li><span class="span">사용여부</span>
                            <select id="useAtSearchFormPopupOrgnzt" name="useAt" class="w70">
                                <option value="">전체</option>
                                <option value="1">사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>
                    </ul>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnDeptPupupSearch"><span
                                class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnDeptPupupInit"><span
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
				<div class="div_liner" id="gridPopupMenuOrgnzt" style="width: 100%; height: 335px"></div>
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
</body>
