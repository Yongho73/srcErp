<!-- 
 *    프로그램       : 승급대상자 조회 팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.24
 *    사용테이블      : MHS_EMP
 *    WEB-INF/jsp/mhs/hra/mhshra001/advanEmp.jsp
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxGridAdvanEmpPopup;

var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var dhxCCalendarDate2; // 기간 달력(From ~ To)

$(function() { 
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
});

function cf_InitParamPopupMenu(){
	fn_SetCalendar();
}

function cf_SetComponentsPopupMenu(){

    var dhxGridAdvanEmpListInfo = [];
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllAdvanEmp" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('부서명', '*', 'center', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('사원명', '*', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('호봉', '*', 'center', 'str', 'ro', false, 'srclsCodeNm', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('입사일', '*', 'center', 'str', 'ro', false, 'ecnyDe', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('승급예정일', '*', 'center', 'str', 'ro', false, 'nxttrmPromtDe', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('부서코드', '*', 'center', 'str', 'ro', true, 'deptCode', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('호봉코드', '*', 'center', 'str', 'ro', true, 'srclsCode', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('직급코드', '*', 'center', 'str', 'ro', true, 'clsfCode', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('직위코드', '*', 'center', 'str', 'ro', true, 'ofcpsCode', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('직종코드', '*', 'center', 'str', 'ro', true, 'jssfcCode', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('직책코드', '*', 'center', 'str', 'ro', true, 'rspofCode', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('직렬코드', '*', 'center', 'str', 'ro', true, 'jblnCode', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('발령구분', '*', 'center', 'str', 'ro', true, 'gnfdCode', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    dhxGridAdvanEmpListInfo.push(gf_MakeDhxGridHeader('발령구분이름', '*', 'center', 'str', 'ro', true, 'gnfdCodeNm', '', '')); /* gf_LocaleTrans('default', 'titdeptKorNm') */
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridAdvanEmpListInfo, true, false, false);

    dhxGridPopup.enableAutoWidth(true);

    gf_ComboCode('divHffsSeCode', 'searchHffsSeCode', 'searchHffsSeCode', 'search', 'C278', '' , 'width:92px', '', 'asc', ''); //전호봉
}

function cf_SetEventListenerPopupMenu(){
// 	$('#date21').unbind('keydown').bind('keydown',function(event) {
//         if (event.keyCode == 13)  {
//             $('#date22').focus();
//         }
//     });
// 	$('#date22').unbind('keydown').bind('keydown',function(event) {
//         if (event.keyCode == 13)  {
//             $('#searchHffsSeCode').focus();
//         }
//     });
//     $('#searchHffsSeCode').unbind('keydown').bind('keydown',function(event) {
//         if (event.keyCode == 13)  {
//         	fn_SearchPopupAdvanEmp();
//         }
//     });
    $('#searchForm input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnAdvanEmpPupupSearch').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
	
	
	$('#checkAllAdvanEmp').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridPopup, $('#checkAllAdvanEmp').prop('checked'), 'chk');
    });
    
    $('#btnAdvanEmpPupupSearch').unbind('click').bind('click', function() {
        fn_SearchPopupAdvanEmp();
    });
    
    $('#btnAdvanEmpPupupInit').unbind('click').bind('click', function() {
        gf_FormSetValue('searchForm', 'date21', gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-01'), 'text');
        gf_FormSetValue('searchForm', 'date22', (new Date()).format('YYYY-MM-30'), 'text');
        dhxCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchForm', 'date21', 'text'));
        dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchForm', 'date22', 'text'));   
        gf_FormSetValue('searchForm', 'searchHffsSeCode', '', 'combo');
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
        $('#advanEmpPopup .b-close').click();
    });
    

    $('#btnPopupOk').unbind('click').bind('click', function() {
        fn_SearchCardNoOk();
    });
    
    //날짜 선택
    $('#searchForm .input_calen').unbind('keyup').bind('keyup', function(event){
        //숫자
        dateChk($(this));
    });
    
    //기간달력 이벤트 추가
    $('#searchForm #date2').unbind('click').bind('click', function(event){
        //dhxCCalendarDate2.setPosition("bottom"); // "bottom"
        //$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
        dhxCCalendarDate2.show();
    });
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
}

function cf_SetBindingPopupMenu(){
    setTimeout(function() { 
        fn_SearchPopupAdvanEmp();
    }, 500);
}


function fn_SearchPopupAdvanEmp(pageNum, key){
    var pageingCnt = gf_FormGetValue('pageingFormMhshra001', 'pageRowSize', 'combo');
    var page = pageNum;
    if(gf_IsNull(pageingCnt)) pageingCnt = 20;
    if(gf_IsNull(page)) page = 1;
    gf_FormSetValue('searchForm', 'selectedPageNum', page, 'text');
    
    var jsonParameter = {
    		beginPromtDe : gf_FormGetValue('searchForm', 'date21', 'text'),
    		endPromtDe : gf_FormGetValue('searchForm', 'date22', 'text'),
    		hffsSe : gf_FormGetValue('searchForm', 'searchHffsSeCode', 'combo'),
            pageingCnt : pageingCnt,
            pageNum : page
    };
    gf_Transaction(key, 'mhshra001/searchAdvanEmpMhshra001', jsonParameter, 'fn_CallbackAcntCdPopup', false, 'GET');
      
}

function fn_CallbackAcntCdPopup (strSvcID, targetID, data){
    
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

function fn_SearchCardNoOk(){

	var obj_Main = eval("$advanEmpInfo_Main");
    if(typeof obj_Main == "object"){
    	var selectRow = "";
        var test=0;
        var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPopup, 'chk');
        if(gf_IsNull(rowIds)) {
            gf_DivMsgAlert('로우를 선택해 주세요.');
            return false;
        } else {
             if(!gf_IsNull(rowIds)){
            	 var cnt = 0;
                 rowIds.forEach(function(rowId) {
                	 var $advanEmpInfo_Sub = {};
                	 $advanEmpInfo_Sub.deptNm         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("deptNm")).getValue(); 
                	 $advanEmpInfo_Sub.empno         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("empno")).getValue(); 
                	 $advanEmpInfo_Sub.korNm         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("korNm")).getValue(); 
                	 $advanEmpInfo_Sub.srclsCodeNm         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("srclsCodeNm")).getValue(); 
                	 $advanEmpInfo_Sub.ecnyDe         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("ecnyDe")).getValue(); 
                	 $advanEmpInfo_Sub.nxttrmPromtDe         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("nxttrmPromtDe")).getValue(); 
                	 
                     $advanEmpInfo_Sub.deptCode         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("deptCode")).getValue(); 
                     $advanEmpInfo_Sub.srclsCode         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("srclsCode")).getValue(); 
                     $advanEmpInfo_Sub.clsfCode         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("clsfCode")).getValue(); 
                     $advanEmpInfo_Sub.ofcpsCode         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("ofcpsCode")).getValue(); 
                     $advanEmpInfo_Sub.jssfcCode         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("jssfcCode")).getValue(); 
                     $advanEmpInfo_Sub.rspofCode         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("rspofCode")).getValue(); 
                     $advanEmpInfo_Sub.jblnCode         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("jblnCode")).getValue(); 
                     $advanEmpInfo_Sub.gnfdCode         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("gnfdCode")).getValue(); 
                     $advanEmpInfo_Sub.gnfdCodeNm         = dhxGridPopup.cells(rowId, dhxGridPopup.getColIndexById("gnfdCodeNm")).getValue(); 
                     
                     //obj_Main[cnt] = $advanEmpInfo_Sub;
                     obj_Main[cnt] = $advanEmpInfo_Sub;
                     cnt++;
                 });
             }
            $('#advanEmpPopup .b-close').click();
        }
    }
};

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="date21" || e.target.id =="date22") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate2.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

//기간달력
function fn_SetCalendar(){
    //달력 생성
    dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");
    
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
            $('#date21').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
            $('#date22').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
            dhxCCalendarDate2.hide();
        }
    });
    
    //금일 날짜표시
    $('input[name=date21]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-01') );
    $('input[name=date22]').val( (new Date()).format('YYYY-MM-30') );
    
    
//     gf_SetDateIntervalRadio('date21', 'date22', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
    
    //달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
    dhxCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchForm', 'date21', 'text'));
    dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchForm', 'date22', 'text'));   
    dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
    dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");
}

function dateFormat(date){
	  var dd = date.getDate();
	  var mm = date.getMonth()+1; //January is 0!
	  var yyyy = date.getFullYear();

	  if(dd<10) {
	      dd='0'+dd
	  } 

	  if(mm<10) {
	      mm='0'+mm
	  } 

	  var nDate = yyyy+'-'+mm+'-'+dd;
	  return(nDate);
	}
	//입력 내용을 날짜 포멧으로
	function dateChk(objDate){
	    var date = objDate.val();
	    date = date.replace(RegNotNum, '');

	    if (date == "" || date == null || date.length < 5) {
	      objDate.val(date);
	      return;
	    }

	    var DataFormat;
	    var RegPhonNum;

	    // 날짜 포맷(yyyy-mm-dd) 만들기 
	    if (date.length <= 6) {
	      DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
	      RegPhonNum = /([0-9]{4})([0-9]+)/;
	    } else if (date.length <= 8) {
	      DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
	      RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
	    }

	    while (RegPhonNum.test(date)) {
	      date = date.replace(RegPhonNum, DataFormat);
	    }

	    objDate.val(date);

	    // 모두 입력됐을 경우 날짜 유효성 확인
	    if (date.length == 10) {
	        var isVaild = true;
	    
	        if (isNaN(Date.parse(date))) {
	            // 유효 날짜 확인 여부
	            isVaild = false;
	        } else {
	            // 년, 월, 일 0 이상 여부 확인
	            var date_sp = date.split("-");
	            date_sp.forEach(function(sp) {
	              if (parseInt(sp) == 0) {
	                isVaild = false;
	              }
	            });
	        
	            // 마지막 일 확인
	            var last = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0);
	            if (last.getDate() < parseInt(date_sp[2])) {
	                isVaild = false;
	            }
	        }
	        
	        if (!isVaild) {
	          alert("잘못된 날짜입니다. \n다시 입력하세요.");
	          objDate.val("");
	          objDate.focus();
	          return;
	        }
	    }
	}
</script>
 
<div class="pop-content">
        <div class="consearch_div_in">
            <div class="consearch_input" id="searchFormAdvanEmpPopup">
                <form id="searchForm">
                    <ul class="consearchinput_list">
                        <li id="date2"><span class="span">승급예정일<!-- <taglibs:transText progrmId="default" key="titLayoffNo"/> --></span>
                            <input type="text" class="w90 input_calen al" maxlength="10" name="date21" id="date21">~
                            <input type="text" class="w90 input_calen al" maxlength="10" name="date22" id="date22">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>
                        <li><span class="span">재직구분</span><div id="divHffsSeCode" class="div_combo"></div></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnAdvanEmpPupupSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnAdvanEmpPupupInit"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        
        <div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntPopup"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div class="div_combo fr">
                    <form id="pageingFormMhshra001"></form>
                </div> 
            <div>
                <div class="div_liner" id="dataGridList" style="width: 100%; height: 390px"></div>
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
