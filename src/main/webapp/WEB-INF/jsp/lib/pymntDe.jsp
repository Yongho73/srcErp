<!-- 
 *    프로그램       : 급여 지급일자  팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.17
 *    사용테이블      : MFS_ACNT_TITLE
 *    WEB-INF/jsp/lib/pymntDe.jsp
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>



<script>
var dhxGridPopup;
var gformIdPopup;
var gformIdPopup;
var gcodeNmIdPopup;
var gdeptInfoPopup;
var dataSalarytyCode = {};

$(function() {  
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
    
    //cf_InitdatePymntDe();
    //cf_InitFormPymntDe();
});

function cf_InitParamPopupMenu(){
	var jsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"ordr" };
    var dataComCode = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); // 기존 코드조회 쿼리 사용
    
    if(init()){   // 초기화
        init3();  // 년월달력 초기화
     }
    
    dataComCode.data.forEach(function(sal){
        dataSalarytyCode[sal.code] = sal.codeNm;
    });
}
// var cf_InitdatePymntDe = function(){
// 	   init()   // 초기화
//        init3();  // 년월달력 초기화
// };
// $(function() {
//     if(init()){   // 초기화
//         init3();  // 년월달력 초기화
//     }
// });

function init(){
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#searchForm .input_calen').unbind('keyup').bind('keyup', function(event){
        //숫자
        dateChk($(this));
    });
	  
	  //금일 조회
	  var today = new Date();
	  nowDate = dateFormat(today);
	  return(nowDate);
}

//년월달력 : 
function init3(){
    //달력 생성  : jquery의 datepicker 사용
    //금일 날짜표시
    $('#date_month').val(nowDate.substring(0,7));

  var currentYear = (new Date()).getFullYear();
  var startYear = currentYear-10;
  var options = {
          startYear: startYear,
          finalYear: currentYear,
          pattern: 'yyyy-mm',
          monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
  };
  $('#date_month').monthpicker(options);
}
//날짜 포멧 처리
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


function cf_SetComponentsPopupMenu(){

    var dhxGridPymntDeListInfo = [];
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('지급일자', '100', 'center', 'str', 'ro', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('급여유형', '0', 'center', 'str', 'coro', true, 'salarytyCodeNm', '', '')); /* gf_LocaleTrans('default', 'titPymntDtls') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('급여항목', '80', 'center', 'str', 'coro', false, 'salarytyCode', '', ''));
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('직종', '80', 'center', 'str', 'coro', false, 'jssfcCode', '', ''));
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('지급내역', '*', 'left', 'str', 'ro', false, 'pymntDtls', '', '')); /* gf_LocaleTrans('default', 'titPymntDtls') */
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '', ''));
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('마감여부', '40', 'center', 'str', 'ch', false, 'closAt', '', ''));
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('공개여부', '0', 'center', 'str', 'ro', true, 'othbcAt', '', ''));
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('공개일시', '0', 'center', 'str', 'ro', true, 'othbcDt', '', ''));
    dhxGridPymntDeListInfo.push(gf_MakeDhxGridHeader('계좌구분코드', '0', 'center', 'str', 'coro', true, 'acnutSeCode', '', ''));
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridPymntDeListInfo, true, false, false);
    dhxGridPopup.enableAutoWidth(true);
    
    // 계좌구분코드
    var acnutSeCodejsonParameter = {codekindCode : "C471",exceptCode :"",sortOrder :"asc" };
    var acnutSeCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', acnutSeCodejsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("acnutSeCode"), acnutSeCodedataSource.data, "sel");
    // 급여유형
    var salarytyCodejsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"asc" };
    var salarytyCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', salarytyCodejsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("salarytyCode"), salarytyCodedataSource.data, "sel");
    // 직종
    var jssfcCodejsonParameter = {codekindCode : "C148",exceptCode :"",sortOrder :"asc" };
    var jssfcCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jssfcCodejsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("jssfcCode"), jssfcCodedataSource.data, "sel");
    
}

function cf_SetEventListenerPopupMenu(){
    
    $('#pymntDe').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13)  {
            $('#pymntDe').focus();
        }
    });
    $('#btnPymntDePupupSearch').unbind('click').bind('click', function() {
        fn_SearchPopupPymntDe();
    });
    
    $('#btnPymntDePupupInit').unbind('click').bind('click', function() {
        gf_FormSetValue('searchForm', 'pymntDe', '', 'text');
        fn_SearchPopupPymntDe();
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
        $('#pymntDePopup .b-close').click();
    });
    

    $('#btnPopupOk').unbind('click').bind('click', function() {
        var selectedId = dhxGridPopup.getSelectedRowId();
        fn_SearchPymntDeOk(selectedId);
    });
    
    dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
        fn_SearchPymntDeOk(rId);
    });
}

function cf_SetBindingPopupMenu(){
    setTimeout(function() { 
        fn_SearchPopupPymntDe();
    }, 500);
}


function fn_SearchPopupPymntDe(pageNum, key){
    var pageingCnt = gf_FormGetValue('pageingFormPymntDe', 'pageRowSize', 'combo');
    var page = pageNum;
    if(gf_IsNull(pageingCnt)) pageingCnt = 20;
    if(gf_IsNull(page)) page = 1;
    gf_FormSetValue('searchFormPymntDePopup', 'selectedPageNum', page, 'text');
    
    var jsonParameter = {
    		applcYm : gf_FormGetValue('searchFormPymntDePopup', 'applcYm', 'text'),
    		//pymntDe : gf_FormGetValue('searchFormPymntDePopup', 'pymntDe', 'text'),
            //applcYm : gf_FormGetValue('searchFormPymntDePopup', 'applcYm', 'text'),
            pageingCnt : pageingCnt,
            pageNum : page
            //salarytyCodeNm   : gf_FormGetValue('searchFormPymntDePopup', 'salarytyCodeNm', 'text')
    };
    gf_Transaction(key, 'mpsbsc006/searchMpsbsc006', jsonParameter, 'fn_CallbackAcntCdPopup', false, 'GET');
      
}

function fn_CallbackAcntCdPopup (strSvcID, targetID, data){
    
   dhxGridPopup.clearAll();
    if(!gf_IsNull(data.data.records)){
    	data.data.records.forEach(function(sal){
            sal.salarytyCodeNm = sal.salarytyCode;
            var salarytyCodeArr = sal.salarytyCode.split(',');
            salarytyCodeArr.forEach(function(code){
                sal.salarytyCodeNm = sal.salarytyCodeNm.replaceAll(code, dataSalarytyCode[code]);
            });
        });
        dhxGridPopup.parse(data.data.records, 'js');
        
        dhxGridPopup.forEachRow(function(rowId) {
            var pymntDe = gf_DhxGetValue(dhxGridPopup, rowId, 'pymntDe', 'grid');
            if (!gf_IsNull(pymntDe)){
            	dhxGridPopup.cells(rowId,8).setDisabled(true);  
            }
        });
        
        
        gf_NoFoundDataOnGridMsgRemove('dataGridList');
    } else {
        gf_NoFoundDataOnGridMsg('dataGridList'); 
    }
    $("#spanCntPopup").text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListenerPopupMenu();
    
    dhxGridPopup.forEachRow(function(rowId) {
        var closAt = gf_DhxGetValue(dhxGridPopup, rowId, 'closAt', 'grid');
        if (closAt == '1' || closAt == '0'){
            dhxGridPopup.cells(rowId,5).setDisabled(true);
        }
        });

};

function fn_SearchPymntDeOk(rId){

    obj = eval("$pymntDeInfo");
     if(!gf_IsNull(rId)){  
        obj.pymntDe         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("pymntDe")).getValue(); 
        obj.applcYm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("applcYm")).getValue(); 
        obj.salarytyCodeNm  = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("salarytyCodeNm")).getValue(); 
        obj.pymntSn         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("pymntSn")).getValue(); 
        obj.pymntDtls       = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("pymntDtls")).getValue(); 
        obj.closAt          = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("closAt")).getValue(); 
        obj.othbcAt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("othbcAt")).getValue(); 
        obj.othbcDt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("othbcDt")).getValue();
        obj.jssfcCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("jssfcCode")).getValue();
        obj.acnutSeCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("acnutSeCode")).getValue();
        obj.salarytyCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("salarytyCode")).getValue();
     }   
    $('#pymntDePopup .b-close').click();
};
</script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
<div class="pop-content">
   
        <div class="path_div"></div>
        <div class="consearch_div_in" id="searchFormPymntDePopup">
            <div class="consearch_input">
                <form id="searchForm">
                    <ul class="consearchinput_list">
                        <li><span class="span"><label for="docmT">귀속년월</span>
                            <input type="text" name="applcYm" id="date_month" class="input_calen" size="7" maxlength="7">
                        </li>
                        <!-- <li><span class="span">dfsf일자</span></li> -->
                    </ul>
                </form>  
            </div>
        
            <div class="consearchbt_div" >
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnPymntDePupupSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnPymntDePupupInit"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        
        
        <div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCntPopup"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div class="div_liner" id="dataGridList" style="width: 100%; height: 350px;"></div>
            
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
</body>
