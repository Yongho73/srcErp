<!-- 
 *    프로그램       : 교육신청조회  팝업화면 
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.17
 *    사용테이블      : MFS_ACNT_TITLE
 *    WEB-INF/jsp/lib/educourseCode.jsp
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
    
    //cf_InitdateEducourseCode();
    //cf_InitFormEducourseCode();
});

function cf_InitParamPopupMenu(){
    var jsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"ordr" };
    var dataComCode = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); // 기존 코드조회 쿼리 사용
    gf_FormSetValue('searchForm', 'eduSdt', nowDate, 'text');
    if(init()){   // 초기화
        init1();  // 년월달력 초기화
     }
}

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
//일반달력
function init1(){
    //달력 생성
    var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"searchFormeduSdt", button:"startDateIcon"});
    dhxCCalendarDate1.loadUserLanguage("ko");
    dhxCCalendarDate1.hideTime();
    
    //금일 날짜표시 billIsuDe
//     $('#searchFormeduEdt').val(nowDate);
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

    var dhxGridEducourseCodeListInfo = [];
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육과정코드', '0', 'center', 'str', 'ro', true, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('순번', '0', 'center', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육과정명', '200', 'left', 'str', 'ro', false, 'educourseNm', '', '')); /* gf_LocaleTrans('default', 'titEducourseNm') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육시작일자', '100', 'center', 'str', 'ro', false, 'eduSdt', '', '')); /* gf_LocaleTrans('default', 'titEduSdt') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육시작시간', '100', 'center', 'str', 'ro', false, 'eduShr', '', '')); /* gf_LocaleTrans('default', 'titEduShr') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육종료일자', '100', 'center', 'str', 'ro', false, 'eduEdt', '', '')); /* gf_LocaleTrans('default', 'titEduEdt') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육종료시간', '100', 'center', 'str', 'ro', false, 'eduEhr', '', '')); /* gf_LocaleTrans('default', 'titEduEhr') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육일수', '80', 'center', 'int', 'ro', false, 'eduDaycnt', '', '')); /* gf_LocaleTrans('default', 'titEduDaycnt') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육 목적', '0', 'left', 'str', 'ro', true, 'eduPurps', '', '')); /* gf_LocaleTrans('default', 'titEduPurps') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육 분류 ', '0', 'left', 'str', 'ro', true, 'eduCls', '', '')); /* gf_LocaleTrans('default', 'titEduCls') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육 종류 ', '0', 'left', 'str', 'ro', true, 'eduKind', '', '')); /* gf_LocaleTrans('default', 'titEduKind') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육 필수 여부 ', '0', 'center', 'str', 'ro', true, 'eduMustAt', '', '')); /* gf_LocaleTrans('default', 'titEduMustAt') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육 비용 부담 구분', '0', 'right', 'int', 'ro', true, 'eduAmtBurdenSe', '', '')); /* gf_LocaleTrans('default', 'titEduAmtBurdenSe') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('내외부 교육 구분', '0', 'center', 'str', 'ro', true, 'innerExtrlEduSe', '', '')); /* gf_LocaleTrans('default', 'titInnerExtrlEduSe') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육 장소', '80', 'left', 'str', 'ro', false, 'eduZone', '', '')); /* gf_LocaleTrans('default', 'titEduZone') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('담당 강사 사원 여부', '0', 'center', 'str', 'ch', true, 'chrgInstructorEmplAt', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructorEmplAt') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('담당 강사 ', '0', 'left', 'str', 'ro', true, 'chrgInstructor', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructor') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('담당강사명 ', '80', 'center', 'str', 'ro', false, 'chrgInstructorNm', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructorNm') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육 기관', '0', 'left', 'str', 'ro', true, 'eduInstt', '', '')); /* gf_LocaleTrans('default', 'titEduInstt') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('교육기관주소', '0', 'left', 'str', 'ro', true, 'eduInsttAdres', '', '')); /* gf_LocaleTrans('default', 'titEduInsttAdres') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('총 이수 학점', '0', 'left', 'str', 'ro', true, 'totFinishPnt', '', '')); /* gf_LocaleTrans('default', 'titTotFinishPnt') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('대상인원', '80', 'center', 'int', 'ro', false, 'trgetCnt', '', '')); /* gf_LocaleTrans('default', 'titTrgetCnt') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('개인 교육비', '0', 'left', 'str', 'edn', true, 'indvdlEducost', '', '')); /* gf_LocaleTrans('default', 'titIndvdlEducost') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('고용 보험 환급액', '0', 'right', 'int', 'edn', true, 'episRetunamt', '', '')); /* gf_LocaleTrans('default', 'titEpisRetunamt') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('수료증 발행 여부', '0', 'center', 'str', 'ch', true, 'cochrgedocumentIsuAt', '', '')); /* gf_LocaleTrans('default', 'titCochrgedocumentIsuAt') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('외래 강사 수당', '0', 'right', 'int', 'edn', true, 'extrlInstructorAllwnc', '', '')); /* gf_LocaleTrans('default', 'titExtrlInstructorAllwnc') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('비고', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '0', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호 ', '0', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드 ', '0', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호  ', '0', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('반려 사유', '0', 'left', 'str', 'ro', true, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('복사여부', '0', 'center', 'str', 'ro', true, 'copyFlag', '', ''));
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('본인신청여부', '0', 'center', 'str', 'ro', true, 'selfReqstAt', '', ''));
    dhxGridEducourseCodeListInfo.push(gf_MakeDhxGridHeader('설문조사코드', '0', 'center', 'str', 'ro', true, 'qestnarCode', '', ''));
    
    
    dhxGridPopup = gf_MakeDhxGrid('dataGridList', dhxGridEducourseCodeListInfo, true, false, false);
    dhxGridPopup.enableAutoWidth(true);
    
 // 교육분류
    var eduClsjsonParameter = {codekindCode : "C206",exceptCode :"",sortOrder :"asc" };
    var eduClsdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduClsjsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("eduCls"), eduClsdataSource.data, "sel");
    
    // 교육종류
    var eduKindjsonParameter = {codekindCode : "C114",exceptCode :"",sortOrder :"asc" };
    var eduKinddataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduKindjsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("eduKind"), eduKinddataSource.data, "sel");
    
    // 교육필수여부
    var eduMustAtjsonParameter = {codekindCode : "C112",exceptCode :"",sortOrder :"asc" };
    var eduMustAtdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduMustAtjsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("eduMustAt"), eduMustAtdataSource.data, "sel");

    // 교육 비용 부담 구분
    var eduAmtBurdenSejsonParameter = {codekindCode : "C111",exceptCode :"",sortOrder :"asc" };
    var eduAmtBurdenSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduAmtBurdenSejsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("eduAmtBurdenSe"), eduAmtBurdenSedataSource.data, "sel");
    
    // 내외부 교육 구분
    var innerExtrlEduSejsonParameter = {codekindCode : "C208",exceptCode :"",sortOrder :"asc" };
    var innerExtrlEduSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', innerExtrlEduSejsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("innerExtrlEduSe"), innerExtrlEduSedataSource.data, "sel");
    
    // 처리상태
    var elctsctSttusCodejsonParameter = {codekindCode : "EA004",exceptCode :"",sortOrder :"asc" };
    var elctsctSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', elctsctSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridPopup, dhxGridPopup.getColIndexById("elctsctSttusCode"), elctsctSttusCodedataSource.data, "sel");
    
}

function cf_SetEventListenerPopupMenu(){
    
    $('#educourseCode').unbind('keydown').bind('keydown',function(event) {
        if (event.keyCode == 13)  {
            $('#educourseCode').focus();
        }
    });
    $('#btnEducourseCodePupupSearch').unbind('click').bind('click', function() {
        fn_SearchPopupEducourseCode();
    });
    
    $('#btnEducourseCodePupupInit').unbind('click').bind('click', function() {
        gf_FormSetValue('searchForm', 'educourseCode', '', 'text');
        fn_SearchPopupEducourseCode();
    });
    
    $('#btnPupupClose').unbind('click').bind('click', function() {
        $('#educourseCodePopup .b-close').click();
    });
    

    $('#btnPopupOk').unbind('click').bind('click', function() {
        var selectedId = dhxGridPopup.getSelectedRowId();
        fn_SearchEducourseCodeOk(selectedId);
    });
    
    dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
        fn_SearchEducourseCodeOk(rId);
    });
}

function cf_SetBindingPopupMenu(){
    setTimeout(function() { 
        fn_SearchPopupEducourseCode();
    }, 500);
}


function fn_SearchPopupEducourseCode(pageNum, key){
	var eduSdt = gf_FormGetValue('searchForm', 'eduSdt', 'text');
	if(eduSdt < nowDate){
		gf_DivMsgAlert("지난 교육은 조회 할 수 없습니다.");
		return false;
	}
    var jsonParameter = {
    		eduSdt : gf_FormGetValue('searchForm', 'eduSdt', 'text')
    };
    gf_Transaction(key, 'mhsedu001/searchMhseduPopList', jsonParameter, 'fn_CallbackAcntCdPopup', false, 'GET');
      
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

function fn_SearchEducourseCodeOk(rId){

    obj = eval("$educourseCodeInfo");
     if(!gf_IsNull(rId)){  
        obj.educourseCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("educourseCode")).getValue();
        obj.elctsctSeSn         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("elctsctSeSn")).getValue();
        obj.educourseNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("educourseNm")).getValue();
        obj.eduSdt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduSdt")).getValue();
        obj.eduShr         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduShr")).getValue();
        obj.eduEdt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduEdt")).getValue();
        obj.eduEhr         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduEhr")).getValue();
        obj.eduDaycnt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduDaycnt")).getValue();
        obj.eduPurps         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduPurps")).getValue();
        obj.eduCls         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduCls")).getValue();
        obj.eduKind         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduKind")).getValue();
        obj.eduMustAt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduMustAt")).getValue();
        obj.eduAmtBurdenSe         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduAmtBurdenSe")).getValue();
        obj.innerExtrlEduSe         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("innerExtrlEduSe")).getValue();
        obj.eduZone         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduZone")).getValue();
        obj.chrgInstructorEmplAt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("chrgInstructorEmplAt")).getValue();
        obj.chrgInstructor         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("chrgInstructor")).getValue();
        obj.chrgInstructorNm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("chrgInstructorNm")).getValue();
        obj.eduInstt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduInstt")).getValue();
        obj.eduInsttAdres         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("eduInsttAdres")).getValue();
        obj.totFinishPnt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("totFinishPnt")).getValue();
        obj.trgetCnt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("trgetCnt")).getValue();
        obj.indvdlEducost         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("indvdlEducost")).getValue();
        obj.episRetunamt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("episRetunamt")).getValue();
        obj.cochrgedocumentIsuAt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("cochrgedocumentIsuAt")).getValue();
        obj.extrlInstructorAllwnc         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("extrlInstructorAllwnc")).getValue();
        obj.rm         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("rm")).getValue();
        obj.atchmnflNo         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("atchmnflNo")).getValue();
        obj.elctsctDocNo         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("elctsctDocNo")).getValue();
        obj.elctsctSttusCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("elctsctSttusCode")).getValue();
        obj.elctsctEmpno         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("elctsctEmpno")).getValue();
        obj.elctsctSttusCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("elctsctSttusCode")).getValue();
        obj.returnResn         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("returnResn")).getValue();
        obj.copyFlag         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("copyFlag")).getValue();
        obj.selfReqstAt         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("selfReqstAt")).getValue();
        obj.qestnarCode         = dhxGridPopup.cells(rId, dhxGridPopup.getColIndexById("qestnarCode")).getValue();

     }   
    $('#educourseCodePopup .b-close').click();
};
</script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
<div class="pop-content">
   
        <div class="path_div"></div>
        <div class="consearch_div_in">
            <div class="consearch_input">
                <form id="searchForm">
                    <ul class="consearchinput_list">
                        <li><span class="span"><label for="docmT">교육일자</span>
                            <input type="text" name="eduSdt" id="searchFormeduSdt" class="input_calen" maxlength=10;">
                        </li>
                        <!-- <li><span class="span">dfsf일자</span></li> -->
                    </ul>
                </form>  
            </div>
        
            <div class="consearchbt_div" >
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnEducourseCodePupupSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnEducourseCodePupupInit"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
