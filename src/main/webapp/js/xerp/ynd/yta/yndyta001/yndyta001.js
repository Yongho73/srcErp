/**
 *    프로그램       : 연말정산자료초기화 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.02.29
 *    사용테이블      : YND_PAY_BASIC
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
var keyDuplication = false;
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamYndyta001();
    cf_SetEventListenerYndyta001();  
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamYndyta001 = function() {
    gf_SetMenuPath();
    $('#saveFormYndyta001').validate({ errorElement: 'div', ignore: '' });
    gf_MakeComboBasic('divComboBelongYear','comboBelongYy','','width:140px','yndyta001/combo/selectBelongYearList'); // 
    
};


var cf_SetEventListenerYndyta001 = function() {

    // button event
    $('#btnSaveYndyta001').unbind('click').bind('click', function() {
        fn_SaveYndyta001();
    });
    $('#btnRemoveYndyta001').unbind('click').bind('click', function() {
        fn_RemoveYndyta001();
    });
   
    $('#btnExcelUploadYndyta001').unbind('click').bind('click', function() {
    	gf_DivMsgAlert("향후 업그레이드 버전입니다.")
    });    

    $('#btnExcelYndyta001').unbind('click').bind('click', function() {
        fn_ExcelYndyta001();
    });
    
};

/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/

var fn_SaveYndyta001 = function() {   
	    var jsonParameter = {
            belongYy : gf_FormGetValue('saveFormYndyta001', 'comboBelongYy', 'combo'),
            person : gf_FormGetValue('saveFormYndyta001', 'person', 'radio'),
        };
        gf_Transaction(jsonParameter, 'yndyta001/saveYndyta001', jsonParameter, 'fn_CallbackSaveYndyta001', false, 'POST');
};

var fn_CallbackSaveYndyta001 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

/**
 * 대상자 초기화 
 */
var fn_RemoveYndyta001 = function() {
    var belongYy = gf_FormGetValue('saveFormYndyta001', 'comboBelongYy', 'combo')
    if(gf_IsNull(belongYy) ) {
        gf_DivMsgAlert('초기화할 귀속년도를 선택해 주세요.');  
        return false;
    } else {
        gf_DivMsgConfirm("초기화 하시겠습니까?", 'fn_RemoveYndyta001Send()', '');
    }
};

var fn_RemoveYndyta001Send = function() {
	
    var belongYy =  gf_FormGetValue('saveFormYndyta001', 'comboBelongYy', 'combo');
    var calcYm   =  gf_FormGetValue('saveFormYndyta001', 'comboBelongYy', 'combo')+ "13";
    var jsonParameter = {
        belongYy : belongYy,
        calcYm : calcYm,
    };
	//연말정산 여부 체크 
	var checkCnt = gf_NoAsyncTransaction('yndyta001/findChekCntYndyta001', jsonParameter, 'GET');	   
	if (checkCnt.data.cnt >0 ){
		 gf_DivMsgAlert("대상자 중에 이미 연말정산 실행하여 <br/>초기화가 불가능합니다.<br/>시스템 담당자에게 문의하세요");
		 return false;
	}
    var dataSource = gf_NoAsyncTransaction('yndyta001/removeAllYndyta001', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	gf_DivMsgAlert(gf_LocaleTrans('default','mgsProcess')); //정상처리되었습니다.
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail')); //실패하였습니다 
    }
    
};
/**
 * 엑셀다운로드
 */
var fn_ExcelYndyta001 = function () {
    var titYndyta001 = '연말정산자료초기화'; /* gf_LocaleTrans('default', 'titYndyta001') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormYndyta001', 'empno', 'text'),
        belongYy : gf_FormGetValue('searchFormYndyta001', 'belongYy', 'text'),
        calcYm : gf_FormGetValue('searchFormYndyta001', 'calcYm', 'text')
    };
    var header = [[
        '직원의 개인번호를 관리하기위한 항목' /* gf_LocaleTrans('default', 'titEmpno') */,
        '귀속년도' /* gf_LocaleTrans('default', 'titBelongYy') */,
        '정산년월 13월이면 연말정산이고, 그외 월은 중도퇴사 연말정산' /* gf_LocaleTrans('default', 'titCalcYm') */,
        '성명' /* gf_LocaleTrans('default', 'titKorNm') */,
        '주민등록번호' /* gf_LocaleTrans('default', 'titIhidnum') */,
        '근무 시작일자' /* gf_LocaleTrans('default', 'titWorkSdt') */,
        '근로소득 발생기간으로 귀속종료일 항목' /* gf_LocaleTrans('default', 'titWorkEdt') */,
        '인적공제 변동 여부 Y:전년과 동일 N: 변동' /* gf_LocaleTrans('default', 'titHumanddcChangeAt') */,
        '사업장 코드' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '감면 시작일' /* gf_LocaleTrans('default', 'titRdcxptBgnde') */,
        '감면 종료일' /* gf_LocaleTrans('default', 'titRdcxptEndde') */,
        '공무원연금금액(32 공적연금 보험료)' /* gf_LocaleTrans('default', 'titPubpensionAmt') */,
        '군인연금금액(32 공적연금 보험료)' /* gf_LocaleTrans('default', 'titSopensionAmt') */,
        '사립학교교직원연금금액(32 공적연금 보험료)' /* gf_LocaleTrans('default', 'titPspensionAmt') */,
        '별정우체국연금금액(32 공적연금 보험료)' /* gf_LocaleTrans('default', 'titPopensionAmt') */,
        '기본 급여 금액' /* gf_LocaleTrans('default', 'titBassSalaryAmt') */,
        '상여금' /* gf_LocaleTrans('default', 'titBnsAmt') */,
        '인정상여 금액' /* gf_LocaleTrans('default', 'titConstBnsAmt') */,
        '국민연금 금액' /* gf_LocaleTrans('default', 'titNpnAmt') */,
        '고용보험 금액' /* gf_LocaleTrans('default', 'titEmplyminsrncAmt') */,
        '건강보험 금액' /* gf_LocaleTrans('default', 'titHlthinsAmt') */,
        '소득세' /* gf_LocaleTrans('default', 'titIncmtax') */,
        '지방소득세' /* gf_LocaleTrans('default', 'titLcltyincmtax') */,
        '농특세' /* gf_LocaleTrans('default', 'titAgsptax') */,
        '국외 근로 수당' /* gf_LocaleTrans('default', 'titOutnatnLaborAllwnc') */,
        '야간 근로 수당' /* gf_LocaleTrans('default', 'titNightLaborAllwnc') */,
        '출산보육 수당' /* gf_LocaleTrans('default', 'titChldbrthAllwnc') */,
        '연구 비' /* gf_LocaleTrans('default', 'titResearchCt') */,
        '비과세 학자금 금액' /* gf_LocaleTrans('default', 'titTaxxmptSchxpnAmt') */,
        '취재 수당' /* gf_LocaleTrans('default', 'titSbjslctAllwnc') */,
        '벽지 수당' /* gf_LocaleTrans('default', 'titBsecludedAllwnc') */,
        '이주 수당' /* gf_LocaleTrans('default', 'titMovingAllwnc') */,
        '식대 금액' /* gf_LocaleTrans('default', 'titCgffdAmt') */,
        '위원 수당' /* gf_LocaleTrans('default', 'titCmitAllwnc') */,
        '일숙직 비' /* gf_LocaleTrans('default', 'titDaynhtcCt') */,
        '자가운전보조금' /* gf_LocaleTrans('default', 'titPvtcarsbsidy') */,
        '우리사주조합 인출금' /* gf_LocaleTrans('default', 'titEswrsDrtAmt') */,
        '임원퇴직소득한도초과액' /* gf_LocaleTrans('default', 'titExctvRetireIncomeLmt') */,
        '기관별로 과세가 부여되는 수당금액)' /* gf_LocaleTrans('default', 'titEtcAllwncAmt') */,
        '주식매수선택권 행사이익' /* gf_LocaleTrans('default', 'titStockOptionPrft') */,
        '직무발명:  보상금 한도 300만원' /* gf_LocaleTrans('default', 'titInthRwmny') */,
        '육아휴직급여, 선전후 휴가 급여, 공무원의 유악휴직수당,육아기근로시간 단축급여' /* gf_LocaleTrans('default', 'titBabylayoffAllwnc') */,
        '처우 개선비' /* gf_LocaleTrans('default', 'titTretImprvmct') */
    ]];
    var dataId = [[ 'empno', 'belongYy', 'calcYm', 'korNm', 'ihidnum', 'workSdt', 'workEdt', 'humanddcChangeAt', 'bplcCode', 'rdcxptBgnde', 'rdcxptEndde', 'pubpensionAmt', 'sopensionAmt', 'pspensionAmt', 'popensionAmt', 'bassSalaryAmt', 'bnsAmt', 'constBnsAmt', 'npnAmt', 'emplyminsrncAmt', 'hlthinsAmt', 'incmtax', 'lcltyincmtax', 'agsptax', 'outnatnLaborAllwnc', 'nightLaborAllwnc', 'chldbrthAllwnc', 'researchCt', 'taxxmptSchxpnAmt', 'sbjslctAllwnc', 'bsecludedAllwnc', 'movingAllwnc', 'cgffdAmt', 'cmitAllwnc', 'daynhtcCt', 'pvtcarsbsidy', 'eswrsDrtAmt', 'exctvRetireIncomeLmt', 'etcAllwncAmt', 'stockOptionPrft', 'inthRwmny', 'babylayoffAllwnc', 'tretImprvmct' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titYndyta001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titYndyta001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('yndyta001/excelYndyta001', jsonParameter);
};
