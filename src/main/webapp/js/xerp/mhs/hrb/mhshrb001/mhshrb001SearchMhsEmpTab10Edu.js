/**
 * 프로그램 : 인사기본 화면 중 Tab10(교육) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.04.23
 * 사용테이블 : MHS_EDU
 **/

var tab10_empno = '';

var titMhsEdu = gf_LocaleTrans('default','titMhsEdu');

var g_Tab10SearchValue = new Object();  // 정보 최초 조회 값

var dhxGridMhsEmpEdu;  //GRID

$(function() {
    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();
});

var cf_InitParam = function (){
	//
};


var cf_SetComponents = function (){

    var dhxGridMhsEmpEduListInfo = [];
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); /* ��ȣ */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육과정명', '150', 'left', 'str', 'ro', false, 'educourseNm', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육예정\n시작일', '90', 'center', 'str', 'ro', false, 'eduBeginPrearngeDe', '', '')); /* gf_LocaleTrans('default', 'titEduBeginPrearngeDe') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육예정\n종료일', '90', 'center', 'str', 'ro', false, 'eduEndPrearngeDe', '', '')); /* gf_LocaleTrans('default', 'titEduEndPrearngeDe') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육시작일', '90', 'center', 'str', 'ro', false, 'eduBeginDe', '', '')); /* gf_LocaleTrans('default', 'titEduBeginDe') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육종료일', '90', 'center', 'str', 'ro', false, 'eduEndDe', '', '')); /* gf_LocaleTrans('default', 'titEduEndDe') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육내용', '200', 'left', 'str', 'ro', false, 'eduNm', '', '')); /* gf_LocaleTrans('default', 'titEduNm') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육기관', '150', 'center', 'str', 'ro', false, 'eduInsttNm', '', '')); /* gf_LocaleTrans('default', 'titEduInsttNm') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육비용', '100', 'center', 'str', 'ro', false, 'toteduCt', '', '')); /* gf_LocaleTrans('default', 'titToteduCt') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육비\n(노동부)', '100', 'right', 'int', 'ro', false, 'extrlSbsidyAmt', '', '')); /* gf_LocaleTrans('default', 'titExtrlSbsidyAmt') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육비\n(회사)', '100', 'right', 'int', 'ro', false, 'sportAmt', '', '')); /* gf_LocaleTrans('default', 'titSportAmt') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육근거', '100', 'left', 'str', 'ro', false, 'eduBasisDtls', '', '')); /* gf_LocaleTrans('default', 'titEduBasisDtls') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('국외여부.', '80', 'center', 'str', 'ch', false, 'dmstcAt', '', '')); /* gf_LocaleTrans('default', 'titDmstcAt') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('국가', '10', 'center', 'str', 'ro', true, 'nationCode', '', '')); /* gf_LocaleTrans('default', 'titNationCode') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('전표를번호', '10', 'center', 'str', 'ro', true, 'slipNo', '', '')); /* gf_LocaleTrans('default', 'titSlipNo') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('전표순', '10', 'center', 'str', 'ro', true, 'slipSn', '', '')); /* gf_LocaleTrans('default', 'titSlipSn') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('사원번호', '10', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhsEmpEduListInfo.push(gf_MakeDhxGridHeader('교육과정코드', '100', 'center', 'str', 'ro', true, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    
    dhxGridMhsEmpEdu = gf_MakeDhxGrid('MhsEmpEduDataList', dhxGridMhsEmpEduListInfo, true, false, false, false);  //(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr)
    
    dhxGridMhsEmpEdu.enableAutoWidth(true);
    dhxGridMhsEmpEdu.enableEditEvents(false,false,false);  //(boolean click,boolean dblclick,boolean f2Key)
    dhxGridMhsEmpEdu.setDateFormat("%Y-%m-%d");
    
    //dhxGridMhsEmpEdu.setColSorting("na,na,na,na,na,na,na,na,na,na,na,na,na,na,na");
    //dhxGridMhsEmpEdu.setNumberFormat("0,000", 2, ".", ",");  //(string mask,number cInd,string p_sep,string d_sep)
    
    $("#saveFormEmp_Tab10_Edu").validate({
        errorElement: 'div'
    });
};

var eventIdsMhsEmpEdu = [];
var cf_SetEventListener = function (){

	var eventId;
	eventIdsMhsEmpEdu = gf_GridDetachEvent(dhxGridMhsEmpEdu, eventIdsMhsEmpEdu);
    
	eventId = dhxGridMhsEmpEdu.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬
    	fn_Mhshrm001EduSortGridList(ind, type, direction);
    });
    eventIdsMhsEmpEdu.push(eventId);
    
    eventId = dhxGridMhsEmpEdu.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhsEmpEdu, 'dmstcAt')) return false;		  
		return true;
    }); 
    eventIdsMhsEmpEdu.push(eventId);
    
    // other event

};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab10();
};

var cf_InitForm = function (){
	//
};

var cf_InitInputForm = function (){
    /*그리드라서 재조회 함*/
    fn_SearchMhshrb001Tab10();
};
//조회
var fn_SearchMhshrb001Tab10 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab10_Edu', 'empno', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab10_empno = empno;
	g_Tab10SearchValue.empno = empno;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab10_Edu', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpTab10Edu', jsonParameter, 'fn_CallbackSearchMhshrb001Tab10', false, 'GET');
};


var fn_CallbackSearchMhshrb001Tab10 = function (strSvcID, targetID, data){
	dhxGridMhsEmpEdu.clearAll();
	
	if(!gf_IsNull(data.data.records)){
		dhxGridMhsEmpEdu.parse(data.data.records, 'js');
    	
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpEduDataList');
    	
    	dhxGridMhsEmpEdu.selectCell(0,2);
    } else {
    	gf_NoFoundDataOnGridMsg('MhsEmpEduDataList');
    }
	$('#spanMhsEmpEduCnt').text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListener();
};

//메인 그리드 정렬변경(헤더클릭) 시 정렬변경
var fn_Mhshrm001EduSortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridMhsEmpEdu, 'num')){
	  	var sortOrder = gf_FormGetValue('saveFormEmp_Tab10_Edu', 'sortDirection', 'text');
	  	var sortColumId = gf_FormGetValue('saveFormEmp_Tab10_Edu', 'sortColumId', 'text');
	  	var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsEmpEdu, ind);
	  	// 정렬 컬럼이 바뀌면 정렬방식 초기화
	  	if(sortColumId != nowSortColumId) sortOrder = '';	    	
	  	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
	  	if(sortOrder == 'desc' ) {
	  		dhxGridMhsEmpEdu.setSortImgState(true, ind, 'asc');
	  		gf_FormSetValue('saveFormEmp_Tab10_Edu', 'sortDirection', 'asc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab10_Edu', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpEdu, ind), 'text');
	  	}  else if(sortColumId != nowSortColumId && sortOrder == 'asc' ) {
	  		dhxGridMhsEmpEdu.setSortImgState(true, ind, 'desc');
	  		gf_FormSetValue('saveFormEmp_Tab10_Edu', 'sortDirection', 'desc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab10_Edu', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpEdu, ind), 'text');
	  	}
	  	else {
	  		dhxGridMhsEmpEdu.setSortImgState(false);
	  		gf_FormSetValue('saveFormEmp_Tab10_Edu', 'sortDirection', '', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab10_Edu', 'sortColumId', '', 'text');
	  	}
	}
}

var fn_ExcelMhshrb001Crqfs = function () {
    var titMhshrb999 = '인사기본-교육'; /* gf_LocaleTrans('default', 'titMhshrb999') */
    var jsonParameter = {
        empno : gf_FormGetValue('saveFormEmp_Tab10_Edu', 'empno', 'text')
    };

    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '교육과정코드' /* gf_LocaleTrans('default', 'titEducourseCode') */,
        '교육과정명',
        '교육예정시작일' /* gf_LocaleTrans('default', 'titEduBeginPrearngeDe') */,
        '교육예정종료일' /* gf_LocaleTrans('default', 'titEduEndPrearngeDe') */,
        '교육시작일' /* gf_LocaleTrans('default', 'titEduBeginDe') */,
        '교육종료일' /* gf_LocaleTrans('default', 'titEduEndDe') */,
        '교육내용' /* gf_LocaleTrans('default', 'titEduNm') */,
        '교육기관' /* gf_LocaleTrans('default', 'titEduInsttNm') */,
        '교육비용' /* gf_LocaleTrans('default', 'titToteduCt') */,
        '교육비중\n(노동부)' /* gf_LocaleTrans('default', 'titExtrlSbsidyAmt') */,
        '교육비중 \n(회사)' /* gf_LocaleTrans('default', 'titSportAmt') */,
        '교육근거' /* gf_LocaleTrans('default', 'titEduBasisDtls') */,
        '국외여부' /* gf_LocaleTrans('default', 'titDmstcAt') */,
        '국가' /* gf_LocaleTrans('default', 'titNationCode') */,
        '전표번호' /* gf_LocaleTrans('default', 'titSlipNo') */,
        '전표순번' /* gf_LocaleTrans('default', 'titSlipSn') */
    ]];
    var dataId = [[ 'empno', 'educourseCode', 'educourseNm', 'eduBeginPrearngeDe', 'eduEndPrearngeDe', 'eduBeginDe', 'eduEndDe', 'eduNm', 'eduInsttNm', 'toteduCt', 'extrlSbsidyAmt', 'sportAmt', 'eduBasisDtls', 'dmstcAt', 'nationCode', 'slipNo', 'slipSn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsEdu ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsEdu;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb001/searchMhsEmpTab10Edu', jsonParameter);
};


