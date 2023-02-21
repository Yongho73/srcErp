/**
 *    프로그램       : 세금계산서(매입/매출) 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.06
 *    사용테이블      : MFS_TAX_COMM
 * sourceGen version : 2020.06.29.01 (2020.07.06)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mtxevd001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mtxevd001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mtxevd001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mtxevd001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mtxevd001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mtxevd001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mtxevd001 = 0;  //그리드 삭제 수량 
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var dhxCCalendarDate2; // 기간 달력(From ~ To)
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
	cf_InitParamMtxevd001();
    cf_SetComponentsMtxevd001();
    cf_SetComponentsMtxevdDetail001();
    cf_SetEventListenerMtxevd001();
    cf_InitFormMtxevd001();
    cf_SetBindingMtxevd001();
    cf_InitdateMtxevd001();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMtxevd001 = function() {
    gf_SetMenuPath();
    $("#saveFormMtxevd001").validate({ errorElement: 'div', ignore: '' });
    
    $("#splpcAmtSaveFormMtxevd001").number(true);	
    $("#vatAmtSaveFormMtxevd001").number(true);	
    $("#amtSuplAmtMtxevd001").number(true);
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
    // 콤보 가져오기 , jsp 수정
    gf_ComboCode('pursaleSeCodeSaveFormMtxevd001', 'pursaleSeCode', 'pursaleSeCode', 'sel', 'C035', '' , '', '', 'ordr', 'required','',''); 
    gf_ComboCode('sttemntSeCodeSaveFormMtxevd001', 'sttemntSeCode', 'sttemntSeCode', 'sel', 'C177', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('sttemntTyCodeSaveFormMtxevd001', 'sttemntTyCode', 'sttemntTyCode', 'sel', 'C044', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('evidSeCodeSaveFormMtxevd001', 'evidSeCode', 'evidSeCode', 'sel', 'C038', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('isuSeCodeSaveFormMtxevd001', 'isuSeCode', 'isuSeCode', 'sel', 'C174', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('ddcSeCodeSaveFormMtxevd001', 'ddcSeCode', 'ddcSeCode', 'sel', 'C036', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('exTaxDedCodeSaveFormMtxevd001', 'exTaxDedCode', 'exTaxDedCode', 'sel', 'C040', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('purchsTyCodeSaveFormMtxevd001', 'purchsTyCode', 'purchsTyCode', 'sel', 'C042', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('elctrnevidSeCodeSaveFormMtxevd001', 'elctrnevidSeCode', 'elctrnevidSeCode', 'sel', 'C041', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('confmSeCodeSaveFormMtxevd001', 'confmSeCode', 'confmSeCode', 'sel', 'C002', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('pymntSeCodeSaveFormMtxevd001', 'pymntSeCode', 'pymntSeCode', 'sel', 'C175', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('inputSeCodeSaveFormMtxevd001', 'inputSeCode', 'inputSeCode', 'sel', 'C179', '' , '', '', 'ordr', 'required','','');
    
    // 페이징 환경설정 적용
    gf_SettingPgngUnit('pageingFormMtxevd001'); 
    
};

var dhxGridMtxevd001;
var cf_SetComponentsMtxevd001 = function() {
	var dhxGridMtxevd001HeaderInfo = [];
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMtxevd001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('작성일자', '100', 'center', 'str', 'ro', false, 'billWriteDe', '', '')); /* gf_LocaleTrans('default', 'titBillWriteDe') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('증빙번호', '139', 'center', 'str', 'ro', false, 'taxbillNo', '', '')); /* gf_LocaleTrans('default', 'titTaxbillNo') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('사업자번호', '150', 'center', 'str', 'ro', false, 'bizrno', '', '')); /* gf_LocaleTrans('default', 'titBizrno') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('업체명', '200', 'center', 'str', 'ro', false, 'bcncNm', '', '')); /* gf_LocaleTrans('default', 'titBcncNm') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('사업장코드', '0', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('사업구분코드', '0', 'center', 'str', 'ro', true, 'bsnsSeCode', '', '')); /* gf_LocaleTrans('default', 'titBsnsSeCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('매입매출구분', '0', 'center', 'str', 'ro', true, 'pursaleSeCode', '', '')); /* gf_LocaleTrans('default', 'titPursaleSeCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('신고 구분', '0', 'center', 'str', 'ro', true, 'sttemntSeCode', '', '')); /* gf_LocaleTrans('default', 'titSttemntSeCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('신고유형코드 ', '0', 'center', 'str', 'ro', true, 'sttemntTyCode', '', '')); /* gf_LocaleTrans('default', 'titSttemntTyCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('증빙구분코드', '0', 'center', 'str', 'ro', true, 'evidSeCode', '', '')); /* gf_LocaleTrans('default', 'titEvidSeCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('발행구분', '0', 'center', 'str', 'ro', true, 'isuSeCode', '', '')); /* gf_LocaleTrans('default', 'titIsuSeCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('세액공제여부', '0', 'center', 'str', 'ro', true, 'taxDdcAt', '', '')); /* gf_LocaleTrans('default', 'titTaxDdcAt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('공제구분코드', '0', 'center', 'str', 'ro', true, 'ddcSeCode', '', '')); /* gf_LocaleTrans('default', 'titDdcSeCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('매입세액불공제사유', '0', 'right', 'int', 'ro', true, 'exTaxDedCode', '', '')); /* gf_LocaleTrans('default', 'titExTaxDedCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('매입구분', '0', 'center', 'str', 'ro', true, 'purchsTyCode', '', '')); /* gf_LocaleTrans('default', 'titPurchsTyCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('매출유형코드', '0', 'center', 'str', 'ro', true, 'saleTyCode', '', '')); /* gf_LocaleTrans('default', 'titSaleTyCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('전자증빙여부', '0', 'center', 'str', 'ro', true, 'elctrnevidSeCode', '', '')); /* gf_LocaleTrans('default', 'titElctrnevidSeCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('국세청발행번호', '0', 'right', 'int', 'ro', true, 'elctrnTaxbillNo', '', '')); /* gf_LocaleTrans('default', 'titElctrnTaxbillNo') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('계산서발행일자', '0', 'center', 'str', 'ro', true, 'billIsuDe', '', '')); /* gf_LocaleTrans('default', 'titBillIsuDe') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('국세청 전송일자', '0', 'center', 'str', 'ro', true, 'ntxTrnsmisDe', '', '')); /* gf_LocaleTrans('default', 'titNtxTrnsmisDe') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('계산서발행여부', '0', 'center', 'str', 'ro', true, 'billIsuAt', '', '')); /* gf_LocaleTrans('default', 'titBillIsuAt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('승인구분', '0', 'center', 'str', 'ro', true, 'confmSeCode', '', '')); /* gf_LocaleTrans('default', 'titConfmSeCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('공급금액', '0', 'right', 'int', 'ro', true, 'splpcAmt', '', '')); /* gf_LocaleTrans('default', 'titSplpcAmt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('부가세 금액', '0', 'right', 'int', 'ro', true, 'vatAmt', '', '')); /* gf_LocaleTrans('default', 'titVatAmt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('부가세 대급금', '0', 'center', 'str', 'ro', true, 'vatpa', '', '')); /* gf_LocaleTrans('default', 'titVatpa') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('부가세대급금 조정금액', '0', 'right', 'int', 'ro', true, 'vatpaMdatAmt', '', '')); /* gf_LocaleTrans('default', 'titVatpaMdatAmt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('공급대가', '0', 'right', 'int', 'ro', true, 'amtSuplAmt', '', '')); /* gf_LocaleTrans('default', 'titAmtSuplAmt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('기타금액', '0', 'right', 'int', 'ro', true, 'etcAmt', '', '')); /* gf_LocaleTrans('default', 'titEtcAmt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('할인율', '0', 'center', 'str', 'ro', true, 'dscntRt', '', '')); /* gf_LocaleTrans('default', 'titDscntRt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('안분율', '0', 'center', 'str', 'ro', true, 'prpdvsRt', '', '')); /* gf_LocaleTrans('default', 'titPrpdvsRt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('공란수', '0', 'center', 'str', 'ro', true, 'blankCo', '', '')); /* gf_LocaleTrans('default', 'titBlankCo') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('작성부서코드', '0', 'center', 'str', 'ro', true, 'writeDeptCode', '', '')); /* gf_LocaleTrans('default', 'titWriteDeptCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('작성자', '0', 'center', 'str', 'ro', true, 'writeEmpno', '', '')); /* gf_LocaleTrans('default', 'titWriteEmpno') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('거래처코드', '0', 'center', 'str', 'ro', true, 'bcncCode', '', '')); /* gf_LocaleTrans('default', 'titBcncCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('업종', '0', 'center', 'str', 'ro', true, 'induty', '', '')); /* gf_LocaleTrans('default', 'titInduty') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('업태', '0', 'center', 'str', 'ro', true, 'bizcnd', '', '')); /* gf_LocaleTrans('default', 'titBizcnd') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('주민등록번호', '0', 'center', 'str', 'ro', true, 'ihidnum', '', '')); /* gf_LocaleTrans('default', 'titIhidnum') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('지불구분코드   C175', '0', 'center', 'str', 'ro', true, 'pymntSeCode', '', '')); /* gf_LocaleTrans('default', 'titPymntSeCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('대표자명', '0', 'center', 'str', 'ro', true, 'reprsntNm', '', '')); /* gf_LocaleTrans('default', 'titReprsntNm') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('담당자명', '0', 'center', 'str', 'ro', true, 'chargerNm', '', '')); /* gf_LocaleTrans('default', 'titChargerNm') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('담당자이메일', '0', 'center', 'str', 'ro', true, 'chargerEmail', '', '')); /* gf_LocaleTrans('default', 'titChargerEmail') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('담당자 전화번호', '0', 'center', 'str', 'ro', true, 'chargerTelno', '', '')); /* gf_LocaleTrans('default', 'titChargerTelno') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('전자세금계산서 지연전송여부', '0', 'center', 'str', 'ro', true, 'delaytrnsmisAt', '', '')); /* gf_LocaleTrans('default', 'titDelaytrnsmisAt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('예정신고누락분여부', '0', 'center', 'str', 'ro', true, 'predRptMissAt', '', '')); /* gf_LocaleTrans('default', 'titPredRptMissAt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('주류세금계산서여부', '0', 'center', 'str', 'ro', true, 'liquorAt', '', '')); /* gf_LocaleTrans('default', 'titLiquorAt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('입력구분', '0', 'center', 'str', 'ro', true, 'inputSeCode', '', '')); /* gf_LocaleTrans('default', 'titInputSeCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('담당자확인여부', '0', 'center', 'str', 'ro', true, 'chargerConfirmAt', '', '')); /* gf_LocaleTrans('default', 'titChargerConfirmAt') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('발행상태값 국세청 발행상태값', '0', 'center', 'str', 'ro', true, 'isuSttusCode', '', '')); /* gf_LocaleTrans('default', 'titIsuSttusCode') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('발행내용', '0', 'center', 'str', 'ro', true, 'isuResultCn', '', '')); /* gf_LocaleTrans('default', 'titIsuResultCn') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('발급기관사업자번호', '0', 'center', 'str', 'ro', true, 'issuInsttBizrno', '', '')); /* gf_LocaleTrans('default', 'titIssuInsttBizrno') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('결의서 번호', '0', 'center', 'str', 'ro', true, 'anactNo', '', '')); /* gf_LocaleTrans('default', 'titAnactNo') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('결의서 순번', '0', 'center', 'str', 'ro', true, 'anactSn', '', '')); /* gf_LocaleTrans('default', 'titAnactSn') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('회계전표일자', '0', 'center', 'str', 'ro', true, 'anactDe', '', '')); /* gf_LocaleTrans('default', 'titAnactDe') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '0', 'center', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMtxevd001HeaderInfo.push(gf_MakeDhxGridHeader('비고', '0', 'center', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMtxevd001 = gf_MakeDhxGrid('dataListMtxevd001', dhxGridMtxevd001HeaderInfo, true, false, false);
    dhxGridMtxevd001.enableAutoWidth(false);
    dhxGridMtxevd001.setEditable(true);
    
    dhxGridMtxevd001.setColumnMinWidth(200,5); //넓이가 * 인 컬럼의 최소 넓이값 설정
    
    //거래처구분
    var pursalejsonParameter = {codekindCode : "C035",exceptCode :"",sortOrder :"asc" };
    var pursaledataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', pursalejsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("pursaleSeCode"), pursaledataSource.data, "sel");
    //은행구분
    var sttemntjsonParameter = {codekindCode : "C177",exceptCode :"",sortOrder :"asc" };
    var sttemntdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', sttemntjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("sttemntSeCode"), sttemntdataSource.data, "sel");
    //내,외국인구분
    var sttemntTyjsonParameter = {codekindCode : "C044",exceptCode :"",sortOrder :"asc" };
    var sttemntTydataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', sttemntTyjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("sttemntTyCode"), sttemntTydataSource.data, "sel");
    //거주구분
    var evidSejsonParameter = {codekindCode : "C038",exceptCode :"",sortOrder :"asc" };
    var evidSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', evidSejsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("evidSeCode"), evidSedataSource.data, "sel");
    //거주지구분
    var isuSejsonParameter = {codekindCode : "C174",exceptCode :"",sortOrder :"asc" };
    var isuSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', isuSejsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("isuSeCode"), isuSedataSource.data, "sel");
    //거래처구분
    var ddcSejsonParameter = {codekindCode : "C036",exceptCode :"",sortOrder :"asc" };
    var ddcSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', ddcSejsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("ddcSeCode"), ddcSedataSource.data, "sel");
    //은행구분
    var exTaxDedjsonParameter = {codekindCode : "C040",exceptCode :"",sortOrder :"asc" };
    var exTaxDeddataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', exTaxDedjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("exTaxDedCode"), exTaxDeddataSource.data, "sel");
    //내,외국인구분
    var purchsTyjsonParameter = {codekindCode : "C042",exceptCode :"",sortOrder :"asc" };
    var purchsTydataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', purchsTyjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("purchsTyCode"), purchsTydataSource.data, "sel");
    //거주구분
    var elctrnevidjsonParameter = {codekindCode : "C041",exceptCode :"",sortOrder :"asc" };
    var elctrneviddataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', elctrnevidjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("elctrnevidSeCode"), elctrneviddataSource.data, "sel");
    //거주지구분
    var confmSejsonParameter = {codekindCode : "C002",exceptCode :"",sortOrder :"asc" };
    var confmSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', confmSejsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("confmSeCode"), confmSedataSource.data, "sel");    
    //거주구분
    var pymntjsonParameter = {codekindCode : "C175",exceptCode :"",sortOrder :"asc" };
    var pymntdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', pymntjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("pymntSeCode"), pymntdataSource.data, "sel");
    //거주지구분
    var inputjsonParameter = {codekindCode : "C179",exceptCode :"",sortOrder :"asc" };
    var inputdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', inputjsonParameter, '');
    gf_ComboDataSet(dhxGridMtxevd001, dhxGridMtxevd001.getColIndexById("inputSeCode"), inputdataSource.data, "sel");
    
};

var cf_SetComponentsMtxevdDetail001 = function() {
	var billWriteDe = gf_FormGetValue('saveFormMtxevd001', 'billWriteDe', 'text');
	
	//품목정보 그리드 추가.
    var MtxevdDetail001HeaderInfo = [];
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMtxevdDetail001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('증빙번호', '0', 'center', 'str', 'ro', true, 'taxbillNo', '', '')); /* gf_LocaleTrans('default', 'titTaxbillNo') */
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('품목순번', '0', 'center', 'str', 'ro', true, 'itemSn', '', '')); /* gf_LocaleTrans('default', 'titItemSn') */
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('품명', '350', 'center', 'str', 'edn', false, 'prdnm', '', '')); /* gf_LocaleTrans('default', 'titPrdnm') */
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('규격', '130', 'center', 'str', 'edn', false, 'specNm', '', '')); /* gf_LocaleTrans('default', 'titSpecNm') */
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('수량', '100', 'right', 'str', 'edn', false, 'qty', '', '')); /* gf_LocaleTrans('default', 'titQty') */
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('단위구분코드', '0', 'right', 'str', 'edn', true, 'unitSeCode', '', '')); /* gf_LocaleTrans('default', 'titUnitSeCode') */
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('단가', '100', 'right', 'int', 'edn', false, 'unitPrice', '', '')); /* gf_LocaleTrans('default', 'titUnitPrice') */
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('공급가액', '100', 'right', 'int', 'edn', false, 'splpcAmt', '', '')); /* gf_LocaleTrans('default', 'titSplpcAmt') */
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('VAT', '120', 'right', 'int', 'edn', false, 'vatAmt', '', '')); /* gf_LocaleTrans('default', 'titVatAmt') */
    MtxevdDetail001HeaderInfo.push(gf_MakeDhxGridHeader('기타금액', '0', 'center', 'int', 'edn', true, 'etcAmt', '', '')); /* gf_LocaleTrans('default', 'titEtcAmt') */
    MtxevdDetail001 = gf_MakeDhxGrid('detail_type01', MtxevdDetail001HeaderInfo, true, false, false);
    MtxevdDetail001.enableAutoWidth(true);
    MtxevdDetail001.enableEditEvents(true, false, false); // 원클릭, 더블클릭, F2key
    
    // 그리드 폼에 컬럼값들 숫자  
    MtxevdDetail001.setNumberFormat("0,000", MtxevdDetail001.getColIndexById("qty"), ".", ",");
    MtxevdDetail001.setNumberFormat("0,000", MtxevdDetail001.getColIndexById("unitPrice"), ".", ",");
    MtxevdDetail001.setNumberFormat("0,000", MtxevdDetail001.getColIndexById("splpcAmt"), ".", ",");
    MtxevdDetail001.setNumberFormat("0,000", MtxevdDetail001.getColIndexById("vatAmt"), ".", ",");
    
    	MtxevdDetail001.attachEvent("onCellChanged",function(rId, cInd, value){
        	// 그리드에 컬럼id 를 가져오기 
        	 if((cInd === gf_GetDhxGridColumId(MtxevdDetail001,'qty')) || (cInd === gf_GetDhxGridColumId(MtxevdDetail001,'unitPrice'))){
        		 
        		 var evidSeCode = gf_FormGetValue('saveFormMtxevd001', 'evidSeCode', 'combo');
        		 if(evidSeCode == 1){
        			 var qty = gf_DhxGetValue(MtxevdDetail001,rId,'qty','grid'); // 수량 가져오기
            		 var unitPrice = gf_DhxGetValue(MtxevdDetail001,rId,'unitPrice','grid'); // 단위가격 가져오기
            		 
            		 // 가져온 값들을 그리드 Set으로 값 변경하기 
            		 gf_DhxSetValue(MtxevdDetail001,rId,'splpcAmt',(qty*unitPrice)/11*10,'grid'); // 공급가액
            		 gf_DhxSetValue(MtxevdDetail001,rId,'vatAmt',(qty*unitPrice)/11,'grid'); // VAT
            		 
            		 // 그리드에 RowId 가져오기
            		 var Left_rId = dhxGridMtxevd001.getSelectedRowId();
            		 // 공급가액의 합계 구하기
                     var splpcAmt = gf_DhxGetSumValue(MtxevdDetail001, gf_GetDhxGridColumId(MtxevdDetail001,'splpcAmt'));
                     if (!gf_IsNull(splpcAmt)){
                     // 입력 폼을 Set 으로 등록 된 값 넣기
                     gf_FormSetValue("saveFormMtxevd001", "splpcAmt", splpcAmt, 'text');
                     // 입력된 폼 값에 그리드 Set으로 값 넣기
                     gf_DhxSetValue(dhxGridMtxevd001,Left_rId,'splpcAmt',splpcAmt,'grid');
                     }
                     // 부가세 합계 구하기
                     var vatAmt = gf_DhxGetSumValue(MtxevdDetail001, gf_GetDhxGridColumId(MtxevdDetail001,'vatAmt'));
                     if (!gf_IsNull(splpcAmt) && (!gf_IsNull(vatAmt))){
                     gf_FormSetValue("saveFormMtxevd001", "vatAmt", vatAmt, 'text');
                     gf_DhxSetValue(dhxGridMtxevd001,Left_rId,'vatAmt',splpcAmt,'grid');
                     
                     }
                     // 입력폼에 Set으로 두개의 name값 합계 구해서 input에 넣기
                     gf_FormSetValue("saveFormMtxevd001", "amtSuplAmt", splpcAmt+vatAmt, 'text'); // 공급대가
                     return true;
        		 }else if (evidSeCode == 2){
        			 var qty = gf_DhxGetValue(MtxevdDetail001,rId,'qty','grid'); // 수량 가져오기
            		 var unitPrice = gf_DhxGetValue(MtxevdDetail001,rId,'unitPrice','grid'); // 단위가격 가져오기
            		 
            		 // 가져온 값들을 그리드 Set으로 값 변경하기 
            		 gf_DhxSetValue(MtxevdDetail001,rId,'splpcAmt',qty*unitPrice,'grid');
            		 
            		 // 공급가액의 합계 구하기
            		 var splpcAmt = gf_DhxGetSumValue(MtxevdDetail001, gf_GetDhxGridColumId(MtxevdDetail001,'splpcAmt'));
            		 gf_FormSetValue("saveFormMtxevd001", "splpcAmt", splpcAmt, 'text');
            		 
            		 gf_FormSetValue("saveFormMtxevd001", "amtSuplAmt", splpcAmt, 'text');
                     return true;
            		 
        		 }
        		 
        	 } 
        });
};


var eventIdMtxevd001 = [];
var cf_SetEventListenerMtxevd001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMtxevd001 = gf_GridDetachEvent(dhxGridMtxevd001, eventIdMtxevd001);
    eventId = dhxGridMtxevd001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMtxevd001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMtxevd001.getColumnsNum();
            var rowNum = dhxGridMtxevd001.getRowsNum();
            var selectedId = dhxGridMtxevd001.getSelectedRowId();
            var ind        = dhxGridMtxevd001.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxevd001.getRowIndex(selectedId);
            var type       = dhxGridMtxevd001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMtxevd001.selectRow(0);
                    //fn_FindMtxevd001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMtxevd001.selectRow(rowIndex + 1);
                    fn_FindMtxevd001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMtxevd001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxevd001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMtxevd001.getSelectedRowId();
            var ind        = dhxGridMtxevd001.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxevd001.getRowIndex(selectedId);
            var type       = dhxGridMtxevd001.getColType(ind);
            dhxGridMtxevd001.selectCell(rowIndex+1, ind);
            fn_FindMtxevd001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxevd001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMtxevd001.getSelectedRowId();
            var ind        = dhxGridMtxevd001.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxevd001.getRowIndex(selectedId);
            var type       = dhxGridMtxevd001.getColType(ind);
            dhxGridMtxevd001.selectCell(rowIndex-1, ind);
            fn_FindMtxevd001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxevd001.editCell();
            }
        }
        else return true;
    });
    eventIdMtxevd001.push(eventId);
    eventId = dhxGridMtxevd001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mtxevd001SortGridList(ind, type, direction); 
    });
    eventIdMtxevd001.push(eventId);
    eventId = dhxGridMtxevd001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMtxevd001.push(eventId);
    eventId = dhxGridMtxevd001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMtxevd001();
    });
    eventIdMtxevd001.push(eventId);
    eventId = dhxGridMtxevd001.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMtxevd001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMtxevd001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMtxevd001()
    });
    $('#btnSaveMtxevd001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMtxevd001();
    });
    $('#btnRemoveMtxevd001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMtxevd001();
        // 삭제 할때  현재 증빙번호로 값을 가져온다. 나중에 전표번호 기능 추가 후에 전표번호 입력된 값을 가져와서 수정한다.
        var anactNo = gf_FormGetValue('saveFormMtxevd001', 'anactNo', 'text');
        if (!gf_IsNull(anactNo)){
        	gf_DivMsgAlert('전표번호가 등록되어 있어 삭제 할수 없습니다.');        	
        	return false;
        }
    });
    $('#pageingFormMtxevd001 select[name="pageRowSize"]').unbind('change').bind('change', function() {
    	$('#btnSearchMtxevd001 ').click();
    });
    // 품목정보 Add 버튼 이벤트
    $('#btnAddStmCode').unbind("click").bind("click",function() {
    	gf_errorMsgClear();
        fn_AddMtxevdDetail001();
    });
    // 품목정보 Remove 버튼 이벤트
    $('#btnRemoveStmCode').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMtxevdDetail001();
    });
    // 품목정보 Save 버튼 이벤트
    $('#btnSaveStmCode').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMtxevdDetail001();
    });
    $('#btnExcelMtxevd001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMtxevd001();
    });
    $('#btnSearchMtxevd001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMtxevd001('');
    });
    $('#btnResetMtxevd001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMtxevd001();
    });
 // 증빙 구분을 선택했을때 이벤트 처리
    $('#evidSeCodeSaveFormMtxevd001').on('click', function(event){
    	// 증빙 구분 select 값을 가져온다.
    	var evidSeCode = $("#evidSeCodeSaveFormMtxevd001 option:selected").val();
    	//var c = gf_GetDhxGridColumId(MtxevdDetail001,'vatAmt');
    	//var abc = gf_DhxGetSumValue(MtxevdDetail001, gf_GetDhxGridColumId(MtxevdDetail001,'vatAmt'));
    	
    	// 증빙 구분 select 값이 2 일경우 (계산서) 
    	if (evidSeCode == '2'){
    		// 부가세 금액 입력 input 숨기기
    		$('#vatAmtSaveFormMtxevd001').attr("readonly",true);
    	}else if(evidSeCode == '1'){
    		// 부가세 금액 입력 input 보이기
    		$('#vatAmtSaveFormMtxevd001').attr("readonly",false);
    		// 이벤트 처리 그리드값을 입력했을때 원하는 컬럼에 계산 하여 등록
    	}
    });
    
    //거래처 선택 Popup
	$('#btnBcncSearch').unbind('click').bind('click', function(event){
		gf_CompPopup("saveFormMtxevd001","bizrnoSaveFormMtxevd001","bcncNmSaveFormMtxevd001", gBplcCode, "N", "fn_CallbackPopComp");  
		// form ID, 거래처코드가 들어갈 tag의 ID, 거래처명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    //거래처 선택 Popup
	$('#btnBcncSearchFormMtxevd001').unbind('click').bind('click', function(event){
		gf_CompPopup("searchFormMtxevd001","bcncCodeSearchFormMtxevd001","bcncNmSearchFormMtxevd001", gBplcCode, "N", "fn_CallbackPopComp");  
		// form ID, 거래처코드가 들어갈 tag의 ID, 거래처명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMtxevd001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMtxevd001, $('#checkAllMtxevd001').prop('checked'), 'chk');
    });
    $('#searchFormMtxevd001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMtxevd001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMtxevd001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMtxevd001 input[name="taxbillNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'taxbillNo', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="bplcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'bplcCode', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="bsnsSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'bsnsSeCode', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="pursaleSeCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'pursaleSeCode', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="sttemntSeCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'sttemntSeCode', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="sttemntTyCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'sttemntTyCode', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="evidSeCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'evidSeCode', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="isuSeCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'isuSeCode', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="taxDdcAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'taxDdcAt', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="ddcSeCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'ddcSeCode', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="exTaxDedCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'exTaxDedCode', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="purchsTyCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'purchsTyCode', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="saleTyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'saleTyCode', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="elctrnevidSeCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'elctrnevidSeCode', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="elctrnTaxbillNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'elctrnTaxbillNo', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="billWriteDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'billWriteDe', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="billIsuDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'billIsuDe', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="ntxTrnsmisDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'ntxTrnsmisDe', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="billIsuAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'billIsuAt', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="confmSeCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'confmSeCode', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="splpcAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'splpcAmt', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="vatAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'vatAmt', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="vatpa"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'vatpa', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="vatpaMdatAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'vatpaMdatAmt', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="amtSuplAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'amtSuplAmt', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="etcAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'etcAmt', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="dscntRt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'dscntRt', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="prpdvsRt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'prpdvsRt', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="blankCo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'blankCo', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="writeDeptCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'writeDeptCode', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="writeEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'writeEmpno', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="bcncCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'bcncCode', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="bcncNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'bcncNm', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="induty"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'induty', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="bizcnd"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'bizcnd', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="bizrno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'bizrno', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="ihidnum"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'ihidnum', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="pymntSeCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'pymntSeCode', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="reprsntNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'reprsntNm', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="chargerNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'chargerNm', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="chargerEmail"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'chargerEmail', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="chargerTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'chargerTelno', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="delaytrnsmisAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'delaytrnsmisAt', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="predRptMissAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'predRptMissAt', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="liquorAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'liquorAt', $(this).val());
    });
    $('#saveFormMtxevd001 select[name="inputSeCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'inputSeCode', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="chargerConfirmAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'chargerConfirmAt', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="isuSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'isuSttusCode', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="isuResultCn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'isuResultCn', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="issuInsttBizrno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'issuInsttBizrno', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="anactNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'anactNo', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="anactSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'anactSn', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="anactDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'anactDe', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="atchmnflNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'atchmnflNo', $(this).val());
    });
    $('#saveFormMtxevd001 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd001, dhxDataProcessorMtxevd001, 'rm', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMtxevd001 = function() {
    $('#searchFormMtxevd001').resetForm();
};

var cf_SetBindingMtxevd001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMtxevd001('');
};
/********************************************************************/

//기간달력
function init2(){
	//달력 생성
	dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");
	
dhxCCalendarDate2.attachEvent("onClick", function(side, date){
    //alert(side + " + " + date);
    if(side == "right"){
    	$('#stDate').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
    	$('#edDate').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
    	dhxCCalendarDate2.hide();
    }
});
	
	//금일 날짜표시
	gf_SetDateIntervalRadio('stDate', 'edDate', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormMtxevd001', 'stDate', 'text'));
	dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormMtxevd001', 'edDate', 'text'));	
	dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");
}

//var cf_InitFormMtxevd001 = function() {
//$('#searchFormMtxevd001').resetForm();
//init2();
//fn_SearchMtxevd001();
//};

var cf_SetBindingMtxevd001 = function() {
fn_FormDisabled(true);
fn_SearchMtxevd001();
};
var cf_InitdateMtxevd001 = function(){
	if(init()){   // 초기화
		init1();  // 일반달력 초기화
		init2(); 
	}
};
function init(){
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
$('#saveFormMtxevd001 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
	dateChk($(this));
});

//기간달력 이벤트 추가
$('#searchFormMtxevd001 #date2').unbind('click').bind('click', function(event){
	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
	dhxCCalendarDate2.show();
});

//금일 조회
var today = new Date();
nowDate = dateFormat(today);
return(nowDate);
}


//********************************************************************/

//일반달력
function init1(){
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"billWriteDeSaveFormMtxevd001", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	//금일 날짜표시 billIsuDe
	$('#billWriteDeSaveFormMtxevd001').val(nowDate);
	
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"billIsuDeSaveFormMtxevd001", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	//금일 날짜표시 billIsuDe
	$('#billIsuDeSaveFormMtxevd001').val(nowDate);
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

/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMtxevd001 = function(pageNum) {
	
	var pageingCnt = gf_FormGetValue('pageingFormMtxevd001', 'pageRowSize', 'combo');
	var page = pageNum;
	if(gf_IsNull(pageingCnt)) pageingCnt = 20;
	if(gf_IsNull(page)) page = 1;
	gf_FormSetValue('searchFormMtxevd001', 'selectedPageNum', page, 'text');
	
    var jsonParameter = {
    		taxbillNo : gf_FormGetValue('searchFormMtxevd001', 'taxbillNo', 'text'),
            pursaleSeCode : gf_FormGetValue('searchFormMtxevd001', 'pursaleSeCode', 'combo'),
            evidSeCode : gf_FormGetValue('searchFormMtxevd001', 'evidSeCode', 'combo'),
            elctrnevidSeCode : gf_FormGetValue('searchFormMtxevd001', 'elctrnevidSeCode', 'combo'),
            bcncCode : gf_FormGetValue('searchFormMtxevd001', 'bcncCode', 'text'),
            stDate : gf_FormGetValue('searchFormMtxevd001', 'stDate', 'text'),
            edDate : gf_FormGetValue('searchFormMtxevd001', 'edDate', 'text'),
            pageingCnt 		: pageingCnt,
            pageNum 		: page    
    };
    gf_Transaction(jsonParameter, 'mtxevd001/searchMtxevd001', jsonParameter, 'fn_CallbackSearchMtxevd001', false, 'GET');
};

var dhxDataProcessorMtxevd001;
var fn_CallbackSearchMtxevd001 = function(strSvcID, targetID, data) {
    dhxGridMtxevd001.clearAll();
    fn_DhxDataProcessorMtxevd001(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMtxevd001');
        dhxGridMtxevd001.parse(data.data.records, 'js');
 
        if(save_Row_Num_Mtxevd001 == 0 && save_All_Sta_Mtxevd001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMtxevd001.selectRow(0); 
        } else if(save_Row_Sta_Mtxevd001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMtxevd001.selectRow(0);
        } else if(save_All_Sta_Mtxevd001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMtxevd001.selectRow(save_Row_Num_Mtxevd001); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMtxevd001.selectRow(save_Row_Num_Mtxevd001);   //개발자 수정 필요  
            //var findCell = dhxGridMtxevd001.findCell(save_Row_Ids_Mtxevd001, gf_GetDhxGridColumId(dhxGridMtxevd001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMtxevd001.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMtxevd001.selectRow(0);
            //} 
        } 
 
        fn_FindMtxevd001();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMtxevd001');
        fn_InitInputFormMtxevd001();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMtxevd001").text(data.data.records.length);
    gf_PageNate(data.data,'.paging','fn_SearchMtxevd001');
    cf_SetEventListenerMtxevd001();
};
var fn_DhxDataProcessorMtxevd001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMtxevd001 = new dataProcessor(gv_ContextPath+'/mtxevd001/saveMtxevd001'); //lock feed url
    dhxDataProcessorMtxevd001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMtxevd001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMtxevd001.init(dhxGridMtxevd001); //link dataprocessor to the grid
    dhxDataProcessorMtxevd001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMtxevd001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMtxevd001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMtxevd001();
                    $("#checkAllMtxevd001").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 상세조회
 */
var fn_FindMtxevd001 = function() {
	var rId = dhxGridMtxevd001.getSelectedRowId();
    var status = dhxDataProcessorMtxevd001.getState(rId);

    gf_FormSetValue("saveFormMtxevd001", "taxbillNo", gf_DhxGetValue(dhxGridMtxevd001, rId, 'taxbillNo',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "bplcCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'bplcCode',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "bsnsSeCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'bsnsSeCode',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "pursaleSeCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'pursaleSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "sttemntSeCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'sttemntSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "sttemntTyCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'sttemntTyCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "evidSeCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'evidSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "isuSeCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'isuSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "taxDdcAt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'taxDdcAt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "ddcSeCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'ddcSeCode',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "exTaxDedCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'exTaxDedCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "purchsTyCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'purchsTyCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "saleTyCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'saleTyCode',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "elctrnevidSeCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'elctrnevidSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "elctrnTaxbillNo", gf_DhxGetValue(dhxGridMtxevd001, rId, 'elctrnTaxbillNo',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "billWriteDe", gf_DhxGetValue(dhxGridMtxevd001, rId, 'billWriteDe',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "billIsuDe", gf_DhxGetValue(dhxGridMtxevd001, rId, 'billIsuDe',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "ntxTrnsmisDe", gf_DhxGetValue(dhxGridMtxevd001, rId, 'ntxTrnsmisDe',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "billIsuAt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'billIsuAt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "confmSeCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'confmSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "splpcAmt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'splpcAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "vatAmt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'vatAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "vatpa", gf_DhxGetValue(dhxGridMtxevd001, rId, 'vatpa',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "vatpaMdatAmt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'vatpaMdatAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "amtSuplAmt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'amtSuplAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "etcAmt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'etcAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "dscntRt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'dscntRt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "prpdvsRt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'prpdvsRt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "blankCo", gf_DhxGetValue(dhxGridMtxevd001, rId, 'blankCo',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "writeDeptCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'writeDeptCode',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "writeEmpno", gf_DhxGetValue(dhxGridMtxevd001, rId, 'writeEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "bcncCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'bcncCode',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "bcncNm", gf_DhxGetValue(dhxGridMtxevd001, rId, 'bcncNm',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "induty", gf_DhxGetValue(dhxGridMtxevd001, rId, 'induty',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "bizcnd", gf_DhxGetValue(dhxGridMtxevd001, rId, 'bizcnd',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "bizrno", gf_DhxGetValue(dhxGridMtxevd001, rId, 'bizrno',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "ihidnum", gf_DhxGetValue(dhxGridMtxevd001, rId, 'ihidnum',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "pymntSeCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'pymntSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "reprsntNm", gf_DhxGetValue(dhxGridMtxevd001, rId, 'reprsntNm',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "chargerNm", gf_DhxGetValue(dhxGridMtxevd001, rId, 'chargerNm',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "chargerEmail", gf_DhxGetValue(dhxGridMtxevd001, rId, 'chargerEmail',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "chargerTelno", gf_DhxGetValue(dhxGridMtxevd001, rId, 'chargerTelno',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "delaytrnsmisAt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'delaytrnsmisAt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "predRptMissAt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'predRptMissAt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "liquorAt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'liquorAt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "inputSeCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'inputSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMtxevd001", "chargerConfirmAt", gf_DhxGetValue(dhxGridMtxevd001, rId, 'chargerConfirmAt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "isuSttusCode", gf_DhxGetValue(dhxGridMtxevd001, rId, 'isuSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "isuResultCn", gf_DhxGetValue(dhxGridMtxevd001, rId, 'isuResultCn',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "issuInsttBizrno", gf_DhxGetValue(dhxGridMtxevd001, rId, 'issuInsttBizrno',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "anactNo", gf_DhxGetValue(dhxGridMtxevd001, rId, 'anactNo',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "anactSn", gf_DhxGetValue(dhxGridMtxevd001, rId, 'anactSn',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "anactDe", gf_DhxGetValue(dhxGridMtxevd001, rId, 'anactDe',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "atchmnflNo", gf_DhxGetValue(dhxGridMtxevd001, rId, 'atchmnflNo',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd001", "rm", gf_DhxGetValue(dhxGridMtxevd001, rId, 'rm',  'grid'), '');

    // 증빙번호 값을 가져온다
    var taxbillNo = gf_DhxGetValue(dhxGridMtxevd001, rId, 'taxbillNo',  'grid');
    // 증빙번호 값이 Null 일 경우
    if (gf_IsNull(taxbillNo)){
    	fn_FormDisabled(false);
    	fn_InitInputFormMtxevd001();
    	MtxevdDetail001.clearAll();
    }else if(!gf_IsNull(taxbillNo)){
    	fn_FormDisabled(true);
    }
    var rowId = MtxevdDetail001.getSelectedRowId();
	if (gf_IsNull(rowId)){
		gf_FormSetValue("saveFormMtxevd001", "splpcAmt", '0', 'text');
		gf_FormSetValue("saveFormMtxevd001", "vatAmt", '0', 'text');
		gf_FormSetValue("saveFormMtxevd001", "amtSuplAmt", '0', 'text');
	}
    
    var evidSeCode = gf_DhxGetValue(dhxGridMtxevd001, rId, 'evidSeCode',  'grid');
    //var evidSeCode = $("#evidSeCodeSaveFormMtxevd001 option:selected").val();
	// 증빙 구분 select 값이 2 일경우 (계산서) 
	if (evidSeCode == '2'){
		// 부가세 금액 입력 input 숨기기
		$('#vatAmtSaveFormMtxevd001').attr("readonly",true);
	}else if(evidSeCode == '1'){
		// 부가세 금액 입력 input 보이기
		$('#vatAmtSaveFormMtxevd001').attr("readonly",false);
	}
	

    var taxbillNo = gf_FormGetValue('saveFormMtxevd001', 'taxbillNo', 'text');
    // 품목정보 가져오기
    if (!gf_IsNull(taxbillNo)){
    	var jsonParameter = {
            taxbillNo : taxbillNo
            //itemSn : gf_FormGetValue('searchFormMtxevdDetail001', 'itemSn', 'text')
        };
        gf_Transaction('', 'mtxevd001/searchMtxevdDetail001', jsonParameter, 'fn_CallbackSearchMtxevdDetail001', false, 'GET');
        }

    if(status == 'inserted') {
        $('#saveFormMtxevd001 input[name="taxbillNo"]').prop('disabled', false);
    } else {
        $('#saveFormMtxevd001 input[name="taxbillNo"]').prop('disabled', true);
    }
};
//품목정보 콜백함수
var dhxDataProcessorMtxevdDetail001;
var fn_CallbackSearchMtxevdDetail001 = function(strSvcID, targetID, data) {
	MtxevdDetail001.clearAll();
	fn_InitDataProcess();
    if(!gf_IsNull(data.data.records)){
    	gf_NoFoundDataOnGridMsgRemove('detail_type01');
    	MtxevdDetail001.parse(data.data.records, 'js');
		MtxevdDetail001.selectRow(0);
		if(save_Row_Num_Mtxevd001 == 0 && save_All_Sta_Mtxevd001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
			MtxevdDetail001.selectRow(0); 
        } else if(save_Row_Sta_Mtxevd001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
        	MtxevdDetail001.selectRow(0);
        } else if(save_All_Sta_Mtxevd001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
        	MtxevdDetail001.selectRow(save_Row_Num_Mtxevd001); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
        	MtxevdDetail001.selectRow(save_Row_Num_Mtxevd001);   //개발자 수정 필요  
            //var findCell = dhxGridMtxevd001.findCell(save_Row_Ids_Mtxevd001, gf_GetDhxGridColumId(dhxGridMtxevd001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMtxevd001.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMtxevd001.selectRow(0);
            //}
        } 
    }else{
    	gf_NoFoundDataOnGridMsg('detail_type01');
    }
    
};
var fn_InitDataProcess = function(){
	// 그리드입력 데이터프로세스 정의
	dhxDataProcessorMtxevdDetail001 = new dataProcessor('/xerp/mtxevd001/saveMtxevdDetail001'); //lock feed url
    //dhxDataProcessorMtxevdDetail001 = new dataProcessor(gv_ContextPath+'/mtxevd001/saveMtxevdDetail001'); //lock feed url
    dhxDataProcessorMtxevdDetail001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMtxevdDetail001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMtxevdDetail001.init(MtxevdDetail001); //link dataprocessor to the grid
    dhxDataProcessorMtxevdDetail001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMtxevdDetail001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMtxevdDetail001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
        if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
            if(!gf_IsNull(dataSource.methodNm)){ 
                gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
            } else { 
                gf_DivMsgAlert(dataSource.message); 
            } 
            return false;
       } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
           gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
           fn_SearchMtxevd001();
           $("#checkAllMtxevdDetail001").prop('checked', false); //상단 체크박스 해제
           return true;
       } else {
           gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
           return false;
       }
    });
}
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMtxevd001 = function() {
    $('#saveFormMtxevd001 input[name="taxbillNo"]').prop('disabled', false);
    $('#saveFormMtxevd001').resetForm();
    MtxevdDetail001.clearAll();
    
    // 폼 설정
    gf_FormSetValue('saveFormMtxevd001', 'pursaleSeCode', 'P','combo');
	gf_FormSetValue('saveFormMtxevd001', 'evidSeCode', '1','combo');
	gf_FormSetValue('saveFormMtxevd001', 'elctrnevidSeCode', '1','combo');
	gf_FormSetValue('saveFormMtxevd001', 'purchsTyCode', '2','combo');
	$('#billWriteDeSaveFormMtxevd001').val(nowDate);
	$('#billIsuDeSaveFormMtxevd001').val(nowDate);
	
	$('#amtSuplAmtMtxevd001').attr('readonly',true);
	$('#splpcAmtSaveFormMtxevd001').attr('readonly',true);
	$('#vatAmtSaveFormMtxevd001').attr('readonly',true);
	
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMtxevd001 *').prop('disabled', status);
    $('#purchsTyCodeSaveFormMtxevd001 *').prop('disabled', status);
    $('#elctrnevidSeCodeSaveFormMtxevd001 *').prop('disabled', status);
    $('#pursaleSeCodeSaveFormMtxevd001 *').prop('disabled', status);
    $('#evidSeCodeSaveFormMtxevd001 *').prop('disabled', status);
    $('#chargerNmSaveFormMtxevd001').attr('disabled', status);
    $('#chargerEmailSaveFormMtxevd001').attr('disabled',status);
    $('#amtSuplAmtMtxevd001').attr('disabled',status);
    $('#splpcAmtSaveFormMtxevd001').attr('disabled',status);
    $('#vatAmtSaveFormMtxevd001').attr('disabled',status);
    $('#anactNoSaveFormMtxevd001').attr('disabled',status);
};
/**
 * 추가(신규) 
 */
var fn_AddMtxevd001 = function() {
	dhxGridMtxevd001.clearSelection();
    fn_InitInputFormMtxevd001();
    var pursaleSe  = gf_FormGetValue('saveFormMtxevd001', 'pursaleSeCode','combo');
	var evidSe = gf_FormGetValue('saveFormMtxevd001', 'evidSeCode','combo');
	var elctrnevid = gf_FormGetValue('saveFormMtxevd001', 'elctrnevidSeCode','combo');
	var purchsTy = gf_FormGetValue('saveFormMtxevd001', 'purchsTyCode', 'combo');
    
    var curDate = gv_Curdate;
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(curDate); //taxbillNo
    initValueArr.push(''); //bplcCode
    initValueArr.push(''); //bsnsSeCode
    initValueArr.push(''); //pursaleSeCode
    initValueArr.push(''); //sttemntSeCode
    initValueArr.push(''); //sttemntTyCode
    initValueArr.push(pursaleSe); //evidSeCode
    initValueArr.push(''); //isuSeCode
    initValueArr.push(''); //taxDdcAt
    initValueArr.push(evidSe); //ddcSeCode
    initValueArr.push(''); //exTaxDedCode
    initValueArr.push(''); //purchsTyCode
    initValueArr.push(''); //saleTyCode
    initValueArr.push(''); //elctrnevidSeCode
    initValueArr.push(elctrnevid); //elctrnTaxbillNo
    initValueArr.push(''); //billWriteDe
    initValueArr.push(purchsTy); //billIsuDe
    initValueArr.push(''); //ntxTrnsmisDe
    initValueArr.push(curDate); //billIsuAt
    initValueArr.push(''); //confmSeCode
    initValueArr.push(''); //splpcAmt
    initValueArr.push(''); //vatAmt
    initValueArr.push(''); //vatpa
    initValueArr.push(''); //vatpaMdatAmt
    initValueArr.push(''); //amtSuplAmt
    initValueArr.push(''); //etcAmt
    initValueArr.push(''); //dscntRt
    initValueArr.push(''); //prpdvsRt
    initValueArr.push(''); //blankCo
    initValueArr.push(''); //writeDeptCode
    initValueArr.push(''); //writeEmpno
    initValueArr.push(''); //bcncCode
    initValueArr.push(''); //bcncNm
    initValueArr.push(''); //induty
    initValueArr.push(''); //bizcnd
    initValueArr.push(''); //bizrno
    initValueArr.push(''); //ihidnum
    initValueArr.push(''); //pymntSeCode
    initValueArr.push(''); //reprsntNm
    initValueArr.push(''); //chargerNm
    initValueArr.push(''); //chargerEmail
    initValueArr.push(''); //chargerTelno
    initValueArr.push(''); //delaytrnsmisAt
    initValueArr.push(''); //predRptMissAt
    initValueArr.push(''); //liquorAt
    initValueArr.push(''); //inputSeCode
    initValueArr.push(''); //chargerConfirmAt
    initValueArr.push(''); //isuSttusCode
    initValueArr.push(''); //isuResultCn
    initValueArr.push(''); //issuInsttBizrno
    initValueArr.push(''); //anactNo
    initValueArr.push(''); //anactSn
    initValueArr.push(''); //anactDe
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //rm
    dhxGridMtxevd001.addRow(dhxGridMtxevd001.uid(), initValueArr, 0);
    dhxGridMtxevd001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMtxevd001');
    $('#btnPopEmpSearchMtxevd001').show();
    fn_FormDisabled(false);
}

//픔목정보 Add ( 저장 / 입력,수정 ) 
var fn_AddMtxevdDetail001 = function() {
    MtxevdDetail001.clearSelection();
    var taxbillNo = gf_FormGetValue('saveFormMtxevd001', 'taxbillNo', 'text');
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(taxbillNo); //taxbillNo
    initValueArr.push(''); //itemSn
    initValueArr.push(''); //prdnm
    initValueArr.push(''); //specNm
    initValueArr.push('0'); //qty
    initValueArr.push(''); //unitSeCode
    initValueArr.push('0'); //unitPrice
    initValueArr.push('0'); //splpcAmt
    initValueArr.push('0'); //vatAmt
    initValueArr.push(''); //etcAmt
    initValueArr.push(''); //vatpa
    initValueArr.push(''); //vatpaMdatAmt
    initValueArr.push(''); //amtSuplAmt
    initValueArr.push(''); //dscntRt
    initValueArr.push(''); //incrsAmt
    initValueArr.push(''); //dcrsAmt
    initValueArr.push(''); //rm
    MtxevdDetail001.addRow(MtxevdDetail001.uid(), initValueArr, 0);
    MtxevdDetail001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('detail_type01');
}

/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mtxevd001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMtxevd001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMtxevd001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMtxevd001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMtxevd001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMtxevd001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMtxevd001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMtxevd001', 'sortColumId', gf_GetDhxGridColum(dhxGridMtxevd001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMtxevd001.setSortImgState(false); 
            gf_FormSetValue('searchFormMtxevd001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMtxevd001', 'sortColumId', '', 'text'); 
            dhxGridMtxevd001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMtxevd001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMtxevd001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMtxevd001', 'sortColumId', gf_GetDhxGridColum(dhxGridMtxevd001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 품목정보 입력데이터 서버 전송
 */
var fn_SaveMtxevdDetail001 = function() {

	if (fn_GridValidationDetail001(MtxevdDetail001,dhxDataProcessorMtxevdDetail001)){
		dhxDataProcessorMtxevdDetail001.sendData(); // 유효성검사
	}
}

/**
 * 입력데이터 서버 전송
 */
var fn_SaveMtxevd001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mtxevd001 = 0; 
    save_Edt_Cnt_Mtxevd001 = 0; 
    save_Del_Cnt_Mtxevd001 = 0; 
    dhxGridMtxevd001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMtxevd001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMtxevd001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mtxevd001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mtxevd001 += 1; 
            } else if(state == 'updated') {
            	// 수정 필요
            	//save_Edt_Cnt_Mtxevd001 += 1;
            	
            	
                save_Edt_Cnt_Mtxevd001 -= 1;
                
                
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        var confirmMsg  = ""; 
        var confirmMsg1 = ""; 
        var confirmMsg2 = ""; 
        var confirmMsg3 = ""; 
        save_All_Sta_Mtxevd001 = 0; 
        if(save_Add_Cnt_Mtxevd001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mtxevd001 + "건";
            save_All_Sta_Mtxevd001 = 1; 
        } 
        if(save_Edt_Cnt_Mtxevd001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mtxevd001 + "건"; 
        } 
        if(save_Del_Cnt_Mtxevd001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mtxevd001 + "건"; 
            save_All_Sta_Mtxevd001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMtxevd001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMtxevd001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMtxevd001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMtxevd001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMtxevd001_Send = function() {
    if(fn_GridValidation(dhxGridMtxevd001, dhxDataProcessorMtxevd001)) {
        dhxDataProcessorMtxevd001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMtxevd001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMtxevd001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 행을 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMtxevd001.forEachRow(function(rowId) {
            state = dhxDataProcessorMtxevd001.getState(rowId);
            if(dhxGridMtxevd001.cells(rowId, gf_GetDhxGridColumId(dhxGridMtxevd001, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMtxevd001.getRowIndex(rowId);
                    dhxGridMtxevd001.deleteRow(rowId);
                    dhxGridMtxevd001.selectRow(rowNum);
                    fn_FindMtxevd001();
                }
                else dhxDataProcessorMtxevd001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 삭제
 */
var fn_RemoveMtxevdDetail001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(MtxevdDetail001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 행을 선택해 주세요.');
        return false;
    } else {
        var state;
        MtxevdDetail001.forEachRow(function(rowId) {
            state = dhxDataProcessorMtxevdDetail001.getState(rowId);
            if(MtxevdDetail001.cells(rowId, gf_GetDhxGridColumId(MtxevdDetail001, 'chk')).isChecked()){
                if(state == 'inserted') MtxevdDetail001.deleteRow(rowId);
                else dhxDataProcessorMtxevdDetail001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}

/**
 * 엑셀다운로드
 */
var fn_ExcelMtxevd001 = function () {
	var titMtxevd001 = '세금계산서(매입/매출)'; /* gf_LocaleTrans('default', 'titMtxevd001') */
    var jsonParameter = {
        taxbillNo : gf_FormGetValue('searchFormMtxevd001', 'taxbillNo', 'text')
    };
    var header = [[
        '세금계산서번호' /* gf_LocaleTrans('default', 'titTaxbillNo') */,
        '사업장코드' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '사업구분코드' /* gf_LocaleTrans('default', 'titBsnsSeCode') */,
        '매입매출구분' /* gf_LocaleTrans('default', 'titPursaleSeCode') */,
        '신고 구분' /* gf_LocaleTrans('default', 'titSttemntSeCode') */,
        '신고유형코드 ' /* gf_LocaleTrans('default', 'titSttemntTyCode') */,
        '증빙구분코드 ' /* gf_LocaleTrans('default', 'titEvidSeCode') */,
        '발행구분 ' /* gf_LocaleTrans('default', 'titIsuSeCode') */,
        '세액공제여부' /* gf_LocaleTrans('default', 'titTaxDdcAt') */,
        '공제구분코드' /* gf_LocaleTrans('default', 'titDdcSeCode') */,
        '매입세액불공제사유' /* gf_LocaleTrans('default', 'titExTaxDedCode') */,
        '매입유형구분' /* gf_LocaleTrans('default', 'titPurchsTyCode') */,
        '매출유형코드' /* gf_LocaleTrans('default', 'titSaleTyCode') */,
        '전자증빙여부 ' /* gf_LocaleTrans('default', 'titElctrnevidSeCode') */,
        '전자세금계산서번호' /* gf_LocaleTrans('default', 'titElctrnTaxbillNo') */,
        '작성일자' /* gf_LocaleTrans('default', 'titBillWriteDe') */,
        '계산서발행일자' /* gf_LocaleTrans('default', 'titBillIsuDe') */,
        '국세청 전송일자' /* gf_LocaleTrans('default', 'titNtxTrnsmisDe') */,
        '계산서발행여부' /* gf_LocaleTrans('default', 'titBillIsuAt') */,
        '승인구분' /* gf_LocaleTrans('default', 'titConfmSeCode') */,
        '공급금액' /* gf_LocaleTrans('default', 'titSplpcAmt') */,
        '부가세 금액' /* gf_LocaleTrans('default', 'titVatAmt') */,
        '부가세 대급금' /* gf_LocaleTrans('default', 'titVatpa') */,
        '부가세대급금 조정금액' /* gf_LocaleTrans('default', 'titVatpaMdatAmt') */,
        '공급대가금액' /* gf_LocaleTrans('default', 'titAmtSuplAmt') */,
        '기타금액' /* gf_LocaleTrans('default', 'titEtcAmt') */,
        '할인율' /* gf_LocaleTrans('default', 'titDscntRt') */,
        '안분율' /* gf_LocaleTrans('default', 'titPrpdvsRt') */,
        '공란수' /* gf_LocaleTrans('default', 'titBlankCo') */,
        '작성부서코드' /* gf_LocaleTrans('default', 'titWriteDeptCode') */,
        '작성자' /* gf_LocaleTrans('default', 'titWriteEmpno') */,
        '거래처코드' /* gf_LocaleTrans('default', 'titBcncCode') */,
        '거래처명' /* gf_LocaleTrans('default', 'titBcncNm') */,
        '업종(종목)' /* gf_LocaleTrans('default', 'titInduty') */,
        '업태' /* gf_LocaleTrans('default', 'titBizcnd') */,
        '사업자등록번호' /* gf_LocaleTrans('default', 'titBizrno') */,
        '주민등록번호' /* gf_LocaleTrans('default', 'titIhidnum') */,
        '지불구분코드' /* gf_LocaleTrans('default', 'titPymntSeCode') */,
        '대표자명' /* gf_LocaleTrans('default', 'titReprsntNm') */,
        '담당자명' /* gf_LocaleTrans('default', 'titChargerNm') */,
        '담당자이메일' /* gf_LocaleTrans('default', 'titChargerEmail') */,
        '담당자 전화번호' /* gf_LocaleTrans('default', 'titChargerTelno') */,
        '전자세금계산서 지연전송여부' /* gf_LocaleTrans('default', 'titDelaytrnsmisAt') */,
        '예정신고누락분여부' /* gf_LocaleTrans('default', 'titPredRptMissAt') */,
        '주류세금계산서여부' /* gf_LocaleTrans('default', 'titLiquorAt') */,
        '입력구분' /* gf_LocaleTrans('default', 'titInputSeCode') */,
        '담당자확인여부' /* gf_LocaleTrans('default', 'titChargerConfirmAt') */,
        '발행상태값 국세청 발행상태값' /* gf_LocaleTrans('default', 'titIsuSttusCode') */,
        '발행내용' /* gf_LocaleTrans('default', 'titIsuResultCn') */,
        '발급기관사업자번호' /* gf_LocaleTrans('default', 'titIssuInsttBizrno') */,
        '결의서 번호' /* gf_LocaleTrans('default', 'titAnactNo') */,
        '결의서 순번' /* gf_LocaleTrans('default', 'titAnactSn') */,
        '회계전표일자' /* gf_LocaleTrans('default', 'titAnactDe') */,
        '첨부파일번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'taxbillNo', 'bplcCode', 'bsnsSeCode', 'pursaleSeCode', 'sttemntSeCode', 'sttemntTyCode', 'evidSeCode', 'isuSeCode', 'taxDdcAt', 'ddcSeCode', 'exTaxDedCode', 'purchsTyCode', 'saleTyCode', 'elctrnevidSeCode', 'elctrnTaxbillNo', 'billWriteDe', 'billIsuDe', 'ntxTrnsmisDe', 'billIsuAt', 'confmSeCode', 'splpcAmt', 'vatAmt', 'vatpa', 'vatpaMdatAmt', 'amtSuplAmt', 'etcAmt', 'dscntRt', 'prpdvsRt', 'blankCo', 'writeDeptCode', 'writeEmpno', 'bcncCode', 'bcncNm', 'induty', 'bizcnd', 'bizrno', 'ihidnum', 'pymntSeCode', 'reprsntNm', 'chargerNm', 'chargerEmail', 'chargerTelno', 'delaytrnsmisAt', 'predRptMissAt', 'liquorAt', 'inputSeCode', 'chargerConfirmAt', 'isuSttusCode', 'isuResultCn', 'issuInsttBizrno', 'anactNo', 'anactSn', 'anactDe', 'atchmnflNo', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMtxevd001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMtxevd001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mtxevd001/excelMtxevd001', jsonParameter);
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormMtxevd001 #taxbillNoSaveFormMtxevd001').parent().append(
    '<div class="error" id="taxbillNoSaveFormMtxevd001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMtxevd001 = function(taxbillNo){
    if(!gf_IsNull(taxbillNo)) {
        var jsonParameter = {
            taxbillNo : taxbillNo
        };
        var dataSource = gf_NoAsyncTransaction('mtxevd001/findMtxevd001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.taxbillNo)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}
/**
 * 폼데이터 db 체크
 */
var fn_FormValidation =  function(rowId){
    var state = dhxDataProcessorMtxevd001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMtxevd001').validate().form()){
                if(state == 'inserted') {
                    var taxbillNo = gf_FormGetValue('saveFormMtxevd001', 'taxbillNo', 'text');
                    if(fn_CheckDupMtxevd001(taxbillNo)) return true;
                    else return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else {
        return true;
    }
}
/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkTaxbillNo;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mtxevd001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mtxevd001 == 'deleted') {
        save_Row_Num_Mtxevd001 = 0;
        save_Row_Ids_Mtxevd001 = "";
    } else if(save_Row_Sta_Mtxevd001 == 'inserted') {
        save_Row_Num_Mtxevd001 = rowNum;
        save_Row_Ids_Mtxevd001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mtxevd001 = rowNum;
        save_Row_Ids_Mtxevd001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	var pursaleSeCode = gf_DhxGetValue(dhxGridObjet, rowId, 'pursaleSeCode', 'grid');
        		if(valid && !gv_ValidateMethods.required( pursaleSeCode )){
        			gf_DivMsgAlert("매입매출 구분은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pursaleSeCode');
    				valid = false;
        		}
        		var evidSeCode = gf_DhxGetValue(dhxGridObjet, rowId, 'evidSeCode', 'grid');
        		if(valid && !gv_ValidateMethods.required( evidSeCode )){
        			gf_DivMsgAlert("증빙구분은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'evidSeCode');
    				valid = false;
        		}
        		var purchsTyCode = gf_DhxGetValue(dhxGridObjet, rowId, 'purchsTyCode', 'grid');
        		if(valid && !gv_ValidateMethods.required( purchsTyCode )){
        			gf_DivMsgAlert("매입구분은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'purchsTyCode');
    				valid = false;
        		}
        		var elctrnevidSeCode = gf_DhxGetValue(dhxGridObjet, rowId, 'elctrnevidSeCode', 'grid');
        		if(valid && !gv_ValidateMethods.required( elctrnevidSeCode )){
        			gf_DivMsgAlert("전자증빙여부는 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctrnevidSeCode');
    				valid = false;
        		}
        		var bizrno = gf_DhxGetValue(dhxGridObjet, rowId, 'bizrno', 'grid');
        		if(valid && !gv_ValidateMethods.required( bizrno )){
        			gf_DivMsgAlert("사업자등록번호는 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bizrno');
    				valid = false;
        		}
        		var chargerNm = gf_DhxGetValue(dhxGridObjet, rowId, 'chargerNm', 'grid');
        		if(valid && !gv_ValidateMethods.required( chargerNm )){
        			gf_DivMsgAlert("담당자명은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'chargerNm');
    				valid = false;
        		}
        		var chargerEmail = gf_DhxGetValue(dhxGridObjet, rowId, 'chargerEmail', 'grid');
        		if(valid && !gv_ValidateMethods.required( chargerEmail )){
        			gf_DivMsgAlert("담당자이메일은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'chargerEmail');
    				valid = false;
        		}
        		var purchsTyCode = gf_DhxGetValue(dhxGridObjet, rowId, 'purchsTyCode', 'grid');
        		if(valid && !gv_ValidateMethods.required( purchsTyCode )){
        			gf_DivMsgAlert("매입구분은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'purchsTyCode');
    				valid = false;
        		}
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkTaxbillNo = gf_DhxGetValue(dhxGridObjet, rowId, 'taxbillNo', 'grid');
                    if(!gf_IsNull(checkTaxbillNo)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var taxbillNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'taxbillNo', 'grid');
                            if(((taxbillNo == checkTaxbillNo)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'taxbillNo');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMtxevd001( checkTaxbillNo )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'taxbillNo');
                            valid = false;
                        }
                        // 그리드 중복된 처음 추가된 row 체크
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    } else {
                        // 신규로 등록된 마지막 로우를 설정
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    }
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMtxevd001.selectRowById(validFalseFistRowId);
        fn_FindMtxevd001();
        fn_FormValidation(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}
/**
 * 그리드 validation
 */
var fn_GridValidationDetail001 = function(dhxGridObjet, dhxDataProcessor){
	var state;
	var valid = true;
	var validFalseFistRowId;
	var validFalseDuplicationKey;
	var checkApplcYy;
	var checkIncomeSeCode;
	var checkLiveSeCode;
	dhxGridObjet.forEachRow(function(rowId) {
    	if(!gf_IsNull(dhxDataProcessor.getState(rowId))){
    		var prdnm = gf_DhxGetValue(dhxGridObjet, rowId, 'prdnm', 'grid');
    		if(valid && !gv_ValidateMethods.required( prdnm )){
    			gf_DivMsgAlert("품명은 필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'chargerNm');
				valid = false;
    		}
    		var qty = gf_DhxGetValue(dhxGridObjet, rowId, 'qty', 'grid'); //vatAmt
    		if(valid && !gv_ValidateMethods.number( qty )){
    			gf_DivMsgAlert("수량은 숫자만 입력 가능합니다.");
				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qty');
				valid = false;
    		}
    		var unitPrice = gf_DhxGetValue(dhxGridObjet, rowId, 'unitPrice', 'grid');
    		if(valid && !gv_ValidateMethods.number( unitPrice )){
    			gf_DivMsgAlert("단가는 필수항목 숫자만 입력 가능합니다.");
				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'unitPrice');
				valid = false;
    		}
        }
    });
	return valid;
    
}
/**
 * 그리드 validation 빨간색 언더바
 */
var fn_GridValidationSelectCell = function(dhxGrid, dhxDataProcessor, rId, cInd){
    dhxGrid.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {
            dhxGrid.forEachCell(rowId, function(cellObj, ind){
                dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
            });
        }
    });
    setTimeout(function(){
        dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
    },1);
}
//거래처 코드 콜백
var fn_CallbackPopComp = function(data) {
	 gf_FormSetValue('saveFormMtxevd001', 'bcncCode', data.bcncCode, 'text');
	 gf_FormSetValue('saveFormMtxevd001', 'bizrno', data.bizrno, 'text');
	 if (gf_IsNull(data.bizrno) || data.bcncCode =='-'){
		 gf_LocaleTrans('default', gf_DivMsgAlert("거래처 관리에서 사업자 등록번호를 입력해주세요."));
		 fn_InitInputFormMtxevd001();
		 dhxGridMtxevd001.deleteRow(0);
		 return false;
	 }
	 
	 gf_FormSetValue('saveFormMtxevd001', 'bcncNm', data.bcncNm, 'text');
	 if (gf_IsNull(data.bcncNm)){
		 gf_LocaleTrans('default', gf_DivMsgAlert("거래처 관리에서 거래처명을 입력해주세요."));
		 fn_InitInputFormMtxevd001();
		 dhxGridMtxevd001.deleteRow(0);
		 return false;
	 }
	 
	 gf_FormSetValue('saveFormMtxevd001', 'bplcCode', data.bplcCode, 'text');
	 
	 gf_FormSetValue('saveFormMtxevd001', 'adres', data.adres, 'text');
	 if (gf_IsNull(data.adres)){
		 gf_LocaleTrans('default', gf_DivMsgAlert("거래처 관리에서 주소를 입력해주세요."));
		 fn_InitInputFormMtxevd001();
		 dhxGridMtxevd001.deleteRow(0);
		 return false;
	 }
	 
	 gf_FormSetValue('saveFormMtxevd001', 'customerchargerNm', data.chargerNm, 'text');
	 if (gf_IsNull(data.chargerNm)){
		 gf_LocaleTrans('default', gf_DivMsgAlert("거래처 관리에서 거래처 담당자를 입력해주세요."));
		 fn_InitInputFormMtxevd001();
		 dhxGridMtxevd001.deleteRow(0);
		 return false;
	 }
	 
	 gf_FormSetValue('saveFormMtxevd001', 'customerchargerEmail', data.chargerEmail, 'text');
	 if (gf_IsNull(data.chargerEmail)){
		 gf_LocaleTrans('default', gf_DivMsgAlert("거래처 관리에서 거래처 이메일을 입력해주세요."));
		 fn_InitInputFormMtxevd001();
		 dhxGridMtxevd001.deleteRow(0);
		 return false;
	 }
	 
	 gf_FormSetValue('saveFormMtxevd001', 'induty', data.induty, 'text');
	 if (gf_IsNull(data.induty)){
		 gf_LocaleTrans('default', gf_DivMsgAlert("거래처 관리에서 업종을 입력해주세요."));
		 fn_InitInputFormMtxevd001();
		 dhxGridMtxevd001.deleteRow(0);
		 return false;
	 }
	 
	 gf_FormSetValue('saveFormMtxevd001', 'bizcnd', data.bizcnd, 'text');
	 if (gf_IsNull(data.bizcnd)){
		 gf_LocaleTrans('default', gf_DivMsgAlert("거래처 관리에서 업태를 입력해주세요."));
		 fn_InitInputFormMtxevd001();
		 dhxGridMtxevd001.deleteRow(0);
		 return false;
	 }
	 
	 gf_FormSetValue('saveFormMtxevd001', 'reprsntNm', data.reprsntNm, 'text');
	 if (gf_IsNull(data.reprsntNm)){
		 gf_LocaleTrans('default', gf_DivMsgAlert("거래처 관리에서 대표자 명을 입력해주세요."));
		 fn_InitInputFormMtxevd001();
		 dhxGridMtxevd001.deleteRow(0);
		 //window.location.reload();
		 //window.location.href = gv_ServerApiUrl + "/mfsbsc002/view";
		 return false;
	 }
};

