<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%> 
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

<!-- 다음(DAUM) 주소 POPUP용 -->
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>

<script>

var gBplcCode = "1000";  //사업장 코드 , Sample 에서는 1000으로 고정, 실제 프로그램에서는 화면에서 받아서 사용

$(function() {
	if(init()){   // 초기화
		//
	}
});

function init(){
	//사원 선택 Popup(1)
	$('#sampleForm #btnEmpCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("sampleForm","empCode","empCodeNm", gBplcCode, "Y", "fn_CallbackPopEmp1");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//사원 입력 후 Enter 이벤트
	$('#empCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#empCodeNm').focus();
	    }
    });
	$('#empCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("1");
	    }
    });
	
	//사원 선택 Popup(2)
	$('#sampleForm #btnEmpCodeSearch2').unbind('click').bind('click', function(event){
		gf_Emp2Popup("sampleForm","empCode2","empCodeNm2", gBplcCode, "Y", "fn_CallbackPopEmp2");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//사원2 입력 후 Enter 이벤트
	$('#empCode2').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#empCodeNm2').focus();
	    }
    });
	$('#empCodeNm2').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("2");
	    }
    });
	
	//부서 선택 Popup
	$('#sampleForm #btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("sampleForm","deptCode","deptCodeNm", gBplcCode, "Y", "fn_CallbackPopDept");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#deptCodeNm').focus();
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchDeptCode();
	    }
    });
	
	//거래처 선택 Popup
	$('#sampleForm #btnBcncCodeSearch').unbind('click').bind('click', function(event){
		gf_CompPopup("sampleForm","bcncCode","bcncNm", gBplcCode, "Y", "fn_CallbackPopComp");  // form ID, 거래처코드가 들어갈 tag의 ID, 거래처명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//거래처 입력 후 Enter 이벤트
	$('#bcncCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#bcncNm').focus();
	    }
    });
	$('#bcncNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchBcncCode();
			//alert($('#bcncNm').val());
	    }
    });
	
	//주소 선택 Popup : 다음 DAUM
	$('#sampleForm #btnAddrSearch_Daum').unbind('click').bind('click', function(event){
		execDaumPostcode("sampleForm","zip", "adres", "detailAdres");
		//fn_CompPopup("sampleForm","zip_Daum","addr_Daum", "addrInfo", "Y");  // form ID, 우편번호가 들어갈 tag의 ID, 주소가 들어갈 tag의 ID, 주소정보가 들어갈 변수의 ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부
    });
	//주소 선택 Popup : 행안부 - juso.go.kr
	$('#sampleForm #btnAddrSearch').unbind('click').bind('click', function(event){
		gf_ZipPopup("sampleForm","zip01","adres01", "detailAdres01", "fn_CallbackPopAddr");  // form ID, 우편번호가 들어갈 tag의 ID, 주소가 들어갈 tag의 ID, 상세주소가 들어갈 tag의 ID, 콜백
    });
}

//사원
function value1(){
	alert($empInfo.empno + " : " + $empInfo.korNm);
	/*
	$empInfo.empno             = 사원번호
	$empInfo.korNm 	          = 성명
	$empInfo.rspofcCodeNm 	  = 직책
	$empInfo.engNm 	          = 영문 명
	$empInfo.deptCode          = 부서 코드 
	$empInfo.deptCodeNm        = 부서 명
	$empInfo.chcrtNm           = 한자 명
	$empInfo.ecnyDe 	          = 입사 일자
	$empInfo.retireDe          = 퇴직 일자
	$empInfo.ihidnum 	      = 주민등록번호
	$empInfo.nltyCode 	      = 국적 코드
	$empInfo.nltyCodeNm        = 국적 코드 명
	$empInfo.jssfcCode         = 직종 코드
	$empInfo.jssfcCodeNm       = 직종 코드 명
	$empInfo.srclsCode         = 호봉 코드
	$empInfo.clsfCode          = 직급 코드
	$empInfo.clsfCodeNm        = 직급 코드 명
	$empInfo.ofcpsCode         = 직위 코드
	$empInfo.ofcpsCodeNm       = 직위 코드 명
	$empInfo.rspofcCode        = 직책 코드
	$empInfo.zip 	          = 우편번호
	$empInfo.ownhomAdres       = 자택 주소
	$empInfo.ownhomDetailAdres = 자택 상세 주소
	$empInfo.ownhomEngAdres    = 자택 영문 주소
	$empInfo.ownhomTelno       = 자택 전화번호
	$empInfo.lxtnTelno         = 내선 전화번호
	$empInfo.mbtlnum           = 휴대폰번호
	$empInfo.email	          = 이메일
	$empInfo.brthdy 	          = 생년월일
	$empInfo.slrcldAt          = 양력 여부
	$empInfo.mrrgAt 	          = 결혼 여부
	$empInfo.mrrgAtNm          = 결혼 여부 명
	$empInfo.hdadptDeptCode    = 겸임 부서 코드
	$empInfo.emplSe 	          = 사원 구분
	$empInfo.emplSeNm          = 사원 구분 명
	$empInfo.hffsSe 	          = 재직 구분
	$empInfo.hffsSeNm 	      = 재직 구분 명
	$empInfo.retireSe          = 퇴직 구분
	$empInfo.retireSeNm        = 퇴직 구분 명
	$empInfo.sexdstnSe         = 성별 구분
	$empInfo.sexdstnSeNm       = 성별 구분 명
	//$empInfo.empnmSe           = 채용 구분
	//$empInfo.empnmSeNm         = 채용 구분 명
	$empInfo.cashierAt         = 출납담당 여부
	$empInfo.hdadptAt          = 겸임 여부
	$empInfo.dprlrAt           = 부서장 여부
	$empInfo.lbunSbscrbAt      = 노조 가입 여부
	$empInfo.lbunSbscrbAtNm    = 노조 가입 여부 명
	$empInfo.mutaidSbscrbAt    = 상조 가입 여부
	$empInfo.dispWorkbAt       = 파견 근무 여부
	$empInfo.natvfrgnSeCode    = 내외국인 구분 코드
	$empInfo.natvfrgnSeCodeNm  = 내외국인 구분 코드 명
	$empInfo.ecnySeCode        = 입사 구분 코드
	$empInfo.ecnySeCodeNm      = 입사 구분 코드 명
	$empInfo.bplcCode          = 사업장코드
	$empInfo.bplcCodeNm        = 사업장코드 명
	$empInfo.salpeakAt         = 임금피크제 여부
	$empInfo.flexbizAt         = 유연근무제 여부
	$empInfo.ansalsysAt        = 연봉제 여부
	$empInfo.deptEngNm 	      = 부서 영문 명
	$empInfo.deptAbrv 	      = 부서 약어
	$empInfo.upperDeptCode     = 상위 부서 코드
	$empInfo.upperDeptNm       = 상위 부서 명
	$empInfo.deptLvl 	      = 부서 레벨
	$empInfo.orgnztLvl 	      = 조직 레벨
	$empInfo.deptTelno 	      = 부서 전화번호
	$empInfo.deptFaxTelno      = 부서 FAX 전화번호
	$empInfo.useBeginDe 	      = 사용 시작 일자
	$empInfo.useAt 	          = 사용 여부
	$empInfo.deptSe 	          = 부서 구분
	$empInfo.sortOrdr 	      = 출력 순서
	$empInfo.upperDeptAt       = 상위부서 존재 여부
	*/
}

function value1_1(){
	gf_FormSetValue('sampleForm', 'empCode', '', 'text');
	gf_FormSetValue('sampleForm', 'empCodeNm', '', 'text');
	gf_FormSetValue('sampleForm', 'empCode2', '', 'text');
	gf_FormSetValue('sampleForm', 'empCodeNm2', '', 'text');
	$empInfo = {};
}

function fn_CallbackPopEmp1(data){
	console.log(data.empno + " : " + data.korNm);
	/*
	data.empno             = 사원번호
	data.korNm 	          = 성명
	data.rspofcCodeNm 	  = 직책
	data.engNm 	          = 영문 명
	data.deptCode          = 부서 코드 
	data.deptCodeNm        = 부서 명
	data.chcrtNm           = 한자 명
	data.ecnyDe 	          = 입사 일자
	data.retireDe          = 퇴직 일자
	data.ihidnum 	      = 주민등록번호
	data.nltyCode 	      = 국적 코드
	data.nltyCodeNm        = 국적 코드 명
	data.jssfcCode         = 직종 코드
	data.jssfcCodeNm       = 직종 코드 명
	data.srclsCode         = 호봉 코드
	data.clsfCode          = 직급 코드
	data.clsfCodeNm        = 직급 코드 명
	data.ofcpsCode         = 직위 코드
	data.ofcpsCodeNm       = 직위 코드 명
	data.rspofcCode        = 직책 코드
	data.zip 	          = 우편번호
	data.ownhomAdres       = 자택 주소
	data.ownhomDetailAdres = 자택 상세 주소
	data.ownhomEngAdres    = 자택 영문 주소
	data.ownhomTelno       = 자택 전화번호
	data.lxtnTelno         = 내선 전화번호
	data.mbtlnum           = 휴대폰번호
	data.email	          = 이메일
	data.brthdy 	          = 생년월일
	data.slrcldAt          = 양력 여부
	data.mrrgAt 	          = 결혼 여부
	data.mrrgAtNm          = 결혼 여부 명
	data.hdadptDeptCode    = 겸임 부서 코드
	data.emplSe 	          = 사원 구분
	data.emplSeNm          = 사원 구분 명
	data.hffsSe 	          = 재직 구분
	data.hffsSeNm 	      = 재직 구분 명
	data.retireSe          = 퇴직 구분
	data.retireSeNm        = 퇴직 구분 명
	data.sexdstnSe         = 성별 구분
	data.sexdstnSeNm       = 성별 구분 명
	//data.empnmSe           = 채용 구분
	//data.empnmSeNm         = 채용 구분 명
	data.cashierAt         = 출납담당 여부
	data.hdadptAt          = 겸임 여부
	data.dprlrAt           = 부서장 여부
	data.lbunSbscrbAt      = 노조 가입 여부
	data.lbunSbscrbAtNm    = 노조 가입 여부 명
	data.mutaidSbscrbAt    = 상조 가입 여부
	data.dispWorkbAt       = 파견 근무 여부
	data.natvfrgnSeCode    = 내외국인 구분 코드
	data.natvfrgnSeCodeNm  = 내외국인 구분 코드 명
	data.ecnySeCode        = 입사 구분 코드
	data.ecnySeCodeNm      = 입사 구분 코드 명
	data.bplcCode          = 사업장코드
	data.bplcCodeNm        = 사업장코드 명
	data.salpeakAt         = 임금피크제 여부
	data.flexbizAt         = 유연근무제 여부
	data.ansalsysAt        = 연봉제 여부
	data.deptEngNm 	      = 부서 영문 명
	data.deptAbrv 	      = 부서 약어
	data.upperDeptCode     = 상위 부서 코드
	data.upperDeptNm       = 상위 부서 명
	data.deptLvl 	      = 부서 레벨
	data.orgnztLvl 	      = 조직 레벨
	data.deptTelno 	      = 부서 전화번호
	data.deptFaxTelno      = 부서 FAX 전화번호
	data.useBeginDe 	      = 사용 시작 일자
	data.useAt 	          = 사용 여부
	data.deptSe 	          = 부서 구분
	data.sortOrdr 	      = 출력 순서
	data.upperDeptAt       = 상위부서 존재 여부

	data.jblnCode          = 직렬 코드
	data.jblnCodeNm        = 직렬 코드 명 
	data.dtyCode           = 직무 코드
	data.dtyCodeNm         = 직무 코드 명
	data.emgncTelno        = 비상전화번호
	data.indvdlEmail       = 개인 이메일
	data.hdadptDeptCodeNm  = 겸임 부서 명
	data.dispDeptCode      = 파견 부서 코드
	data.dispDeptCodeNm    = 파견 부서 명
	data.babyShrtenWorkAt  = 육아 단축 근무 여부
	data.salaryAprpCode    = 급여 책정 코드
	data.salaryAprpCodeNm  = 급여 책정 코드 명
	data.apntcSdt          = 수습 시작일자
	data.apntcEdt          = 수습 종료일자
	data.incmtaxrtCode     = 소득세율 코드
	data.incmtaxrtCodeNm   = 소득세율 코드 명
	*/
}

//사원(2)
function value12(){
	alert($empInfo.empno + " : " + $empInfo.korNm);
	/*
	$empInfo.empno             = 사원번호
	$empInfo.korNm 	          = 성명
	$empInfo.rspofcCodeNm 	  = 직책
	$empInfo.engNm 	          = 영문 명
	$empInfo.deptCode          = 부서 코드 
	$empInfo.deptCodeNm        = 부서 명
	$empInfo.chcrtNm           = 한자 명
	$empInfo.ecnyDe 	          = 입사 일자
	$empInfo.retireDe          = 퇴직 일자
	$empInfo.ihidnum 	      = 주민등록번호
	$empInfo.nltyCode 	      = 국적 코드
	$empInfo.nltyCodeNm        = 국적 코드 명
	$empInfo.jssfcCode         = 직종 코드
	$empInfo.jssfcCodeNm       = 직종 코드 명
	$empInfo.srclsCode         = 호봉 코드
	$empInfo.clsfCode          = 직급 코드
	$empInfo.clsfCodeNm        = 직급 코드 명
	$empInfo.ofcpsCode         = 직위 코드
	$empInfo.ofcpsCodeNm       = 직위 코드 명
	$empInfo.rspofcCode        = 직책 코드
	$empInfo.zip 	          = 우편번호
	$empInfo.ownhomAdres       = 자택 주소
	$empInfo.ownhomDetailAdres = 자택 상세 주소
	$empInfo.ownhomEngAdres    = 자택 영문 주소
	$empInfo.ownhomTelno       = 자택 전화번호
	$empInfo.lxtnTelno         = 내선 전화번호
	$empInfo.mbtlnum           = 휴대폰번호
	$empInfo.email	          = 이메일
	$empInfo.brthdy 	          = 생년월일
	$empInfo.slrcldAt          = 양력 여부
	$empInfo.mrrgAt 	          = 결혼 여부
	$empInfo.mrrgAtNm          = 결혼 여부 명
	$empInfo.hdadptDeptCode    = 겸임 부서 코드
	$empInfo.emplSe 	          = 사원 구분
	$empInfo.emplSeNm          = 사원 구분 명
	$empInfo.hffsSe 	          = 재직 구분
	$empInfo.hffsSeNm 	      = 재직 구분 명
	$empInfo.retireSe          = 퇴직 구분
	$empInfo.retireSeNm        = 퇴직 구분 명
	$empInfo.sexdstnSe         = 성별 구분
	$empInfo.sexdstnSeNm       = 성별 구분 명
	//$empInfo.empnmSe           = 채용 구분
	//$empInfo.empnmSeNm         = 채용 구분 명
	$empInfo.cashierAt         = 출납담당 여부
	$empInfo.hdadptAt          = 겸임 여부
	$empInfo.dprlrAt           = 부서장 여부
	$empInfo.lbunSbscrbAt      = 노조 가입 여부
	$empInfo.lbunSbscrbAtNm    = 노조 가입 여부 명
	$empInfo.mutaidSbscrbAt    = 상조 가입 여부
	$empInfo.dispWorkbAt       = 파견 근무 여부
	$empInfo.natvfrgnSeCode    = 내외국인 구분 코드
	$empInfo.natvfrgnSeCodeNm  = 내외국인 구분 코드 명
	$empInfo.ecnySeCode        = 입사 구분 코드
	$empInfo.ecnySeCodeNm      = 입사 구분 코드 명
	$empInfo.bplcCode          = 사업장코드
	$empInfo.bplcCodeNm        = 사업장코드 명
	$empInfo.salpeakAt         = 임금피크제 여부
	$empInfo.flexbizAt         = 유연근무제 여부
	$empInfo.ansalsysAt        = 연봉제 여부
	$empInfo.deptEngNm 	      = 부서 영문 명
	$empInfo.deptAbrv 	      = 부서 약어
	$empInfo.upperDeptCode     = 상위 부서 코드
	$empInfo.upperDeptNm       = 상위 부서 명
	$empInfo.deptLvl 	      = 부서 레벨
	$empInfo.orgnztLvl 	      = 조직 레벨
	$empInfo.deptTelno 	      = 부서 전화번호
	$empInfo.deptFaxTelno      = 부서 FAX 전화번호
	$empInfo.useBeginDe 	      = 사용 시작 일자
	$empInfo.useAt 	          = 사용 여부
	$empInfo.deptSe 	          = 부서 구분
	$empInfo.sortOrdr 	      = 출력 순서
	$empInfo.upperDeptAt       = 상위부서 존재 여부

	$empInfo.jblnCode          = 직렬 코드
	$empInfo.jblnCodeNm        = 직렬 코드 명 
	$empInfo.dtyCode           = 직무 코드
	$empInfo.dtyCodeNm         = 직무 코드 명
	$empInfo.emgncTelno        = 비상전화번호
	$empInfo.indvdlEmail       = 개인 이메일
	$empInfo.hdadptDeptCodeNm  = 겸임 부서 명
	$empInfo.dispDeptCode      = 파견 부서 코드
	$empInfo.dispDeptCodeNm    = 파견 부서 명
	$empInfo.babyShrtenWorkAt  = 육아 단축 근무 여부
	$empInfo.salaryAprpCode    = 급여 책정 코드
	$empInfo.salaryAprpCodeNm  = 급여 책정 코드 명
	$empInfo.apntcSdt          = 수습 시작일자
	$empInfo.apntcEdt          = 수습 종료일자
	$empInfo.incmtaxrtCode     = 소득세율 코드
	$empInfo.incmtaxrtCodeNm   = 소득세율 코드 명
	*/
}

function value1_2(){
	gf_FormSetValue('sampleForm', 'empCode', '', 'text');
	gf_FormSetValue('sampleForm', 'empCodeNm', '', 'text');
	gf_FormSetValue('sampleForm', 'empCode2', '', 'text');
	gf_FormSetValue('sampleForm', 'empCodeNm2', '', 'text');
	$empInfo = {};
}

function fn_CallbackPopEmp2(data){
	console.log(data.empno + " : " + data.korNm);
	/*
	data.empno             = 사원번호
	data.korNm 	          = 성명
	data.rspofcCodeNm 	  = 직책
	data.engNm 	          = 영문 명
	data.deptCode          = 부서 코드 
	data.deptCodeNm        = 부서 명
	data.chcrtNm           = 한자 명
	data.ecnyDe 	          = 입사 일자
	data.retireDe          = 퇴직 일자
	data.ihidnum 	      = 주민등록번호
	data.nltyCode 	      = 국적 코드
	data.nltyCodeNm        = 국적 코드 명
	data.jssfcCode         = 직종 코드
	data.jssfcCodeNm       = 직종 코드 명
	data.srclsCode         = 호봉 코드
	data.clsfCode          = 직급 코드
	data.clsfCodeNm        = 직급 코드 명
	data.ofcpsCode         = 직위 코드
	data.ofcpsCodeNm       = 직위 코드 명
	data.rspofcCode        = 직책 코드
	data.zip 	          = 우편번호
	data.ownhomAdres       = 자택 주소
	data.ownhomDetailAdres = 자택 상세 주소
	data.ownhomEngAdres    = 자택 영문 주소
	data.ownhomTelno       = 자택 전화번호
	data.lxtnTelno         = 내선 전화번호
	data.mbtlnum           = 휴대폰번호
	data.email	          = 이메일
	data.brthdy 	          = 생년월일
	data.slrcldAt          = 양력 여부
	data.mrrgAt 	          = 결혼 여부
	data.mrrgAtNm          = 결혼 여부 명
	data.hdadptDeptCode    = 겸임 부서 코드
	data.emplSe 	          = 사원 구분
	data.emplSeNm          = 사원 구분 명
	data.hffsSe 	          = 재직 구분
	data.hffsSeNm 	      = 재직 구분 명
	data.retireSe          = 퇴직 구분
	data.retireSeNm        = 퇴직 구분 명
	data.sexdstnSe         = 성별 구분
	data.sexdstnSeNm       = 성별 구분 명
	//data.empnmSe           = 채용 구분
	//data.empnmSeNm         = 채용 구분 명
	data.cashierAt         = 출납담당 여부
	data.hdadptAt          = 겸임 여부
	data.dprlrAt           = 부서장 여부
	data.lbunSbscrbAt      = 노조 가입 여부
	data.lbunSbscrbAtNm    = 노조 가입 여부 명
	data.mutaidSbscrbAt    = 상조 가입 여부
	data.dispWorkbAt       = 파견 근무 여부
	data.natvfrgnSeCode    = 내외국인 구분 코드
	data.natvfrgnSeCodeNm  = 내외국인 구분 코드 명
	data.ecnySeCode        = 입사 구분 코드
	data.ecnySeCodeNm      = 입사 구분 코드 명
	data.bplcCode          = 사업장코드
	data.bplcCodeNm        = 사업장코드 명
	data.salpeakAt         = 임금피크제 여부
	data.flexbizAt         = 유연근무제 여부
	data.ansalsysAt        = 연봉제 여부
	data.deptEngNm 	      = 부서 영문 명
	data.deptAbrv 	      = 부서 약어
	data.upperDeptCode     = 상위 부서 코드
	data.upperDeptNm       = 상위 부서 명
	data.deptLvl 	      = 부서 레벨
	data.orgnztLvl 	      = 조직 레벨
	data.deptTelno 	      = 부서 전화번호
	data.deptFaxTelno      = 부서 FAX 전화번호
	data.useBeginDe 	      = 사용 시작 일자
	data.useAt 	          = 사용 여부
	data.deptSe 	          = 부서 구분
	data.sortOrdr 	      = 출력 순서
	data.upperDeptAt       = 상위부서 존재 여부

	data.jblnCode          = 직렬 코드
	data.jblnCodeNm        = 직렬 코드 명 
	data.dtyCode           = 직무 코드
	data.dtyCodeNm         = 직무 코드 명
	data.emgncTelno        = 비상전화번호
	data.indvdlEmail       = 개인 이메일
	data.hdadptDeptCodeNm  = 겸임 부서 명
	data.dispDeptCode      = 파견 부서 코드
	data.dispDeptCodeNm    = 파견 부서 명
	data.babyShrtenWorkAt  = 육아 단축 근무 여부
	data.salaryAprpCode    = 급여 책정 코드
	data.salaryAprpCodeNm  = 급여 책정 코드 명
	data.apntcSdt          = 수습 시작일자
	data.apntcEdt          = 수습 종료일자
	data.incmtaxrtCode     = 소득세율 코드
	data.incmtaxrtCodeNm   = 소득세율 코드 명
	*/
}

//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('sampleForm', 'empCode', 'text');
		korNm = gf_FormGetValue('sampleForm', 'empCodeNm', 'text');
	}
	else {
		empno = gf_FormGetValue('sampleForm', 'empCode2', 'text');
		korNm = gf_FormGetValue('sampleForm', 'empCodeNm2', 'text');
	}
	
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : gBplcCode
	};
	gf_Transaction(gubun, 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}
function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	  	if(strSvcID == "1"){
	 		gf_FormSetValue('sampleForm', 'empCode', data.empno, 'text');
	 		gf_FormSetValue('sampleForm', 'empCodeNm', data.korNm, 'text');
	  	}
	  	else {
	 		gf_FormSetValue('sampleForm', 'empCode2', data.empno, 'text');
	 		gf_FormSetValue('sampleForm', 'empCodeNm2', data.korNm, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("sampleForm","empCode","empCodeNm", gBplcCode, "Y");
	  	} else {
	  		gf_Emp2Popup("sampleForm","empCode2","empCodeNm2", gBplcCode, "Y");
	  	}
  	}
}

//부서
function value2(){
	alert($deptInfo.deptCode + " : " + $deptInfo.deptKorNm);
	/*
	$deptInfo.deptCode      = 부서코드
	$deptInfo.deptKorNm 	= 부서 한글 명
	$deptInfo.deptEngNm 	= 부서 영문 명
	$deptInfo.deptAbrv 	    = 부서 약어
	$deptInfo.bplcCode 	    = 사업장 코드
	$deptInfo.bplcNm 	    = 사업장 명
	$deptInfo.upperDeptCode = 상위 부서 코드
	$deptInfo.upperDeptNm   = 상위 부서 명
	$deptInfo.deptLvl 	    = 부서 레벨
	$deptInfo.orgnztLvl 	= 조직 레벨
	$deptInfo.deptTelno 	= 부서 전화번호
	$deptInfo.deptFaxTelno  = 부서 FAX 전화번호
	$deptInfo.useBeginDe    = 사용 시작 일자
	$deptInfo.useAt 	    = 사용 여부
	$deptInfo.deptSe 	    = 부서 구분
	$deptInfo.sortOrdr 	    = 출력 순서
	$deptInfo.upperDeptAt   = 상위부서 존재 여부
	*/
}

function value2_1(){
	gf_FormSetValue('sampleForm', 'deptCode', '', 'text');
	gf_FormSetValue('sampleForm', 'deptCodeNm', '', 'text');
	$deptInfo = {};
}

function fn_CallbackPopDept(data){
	console.log(data.deptCode + " : " + data.deptKorNm);
	/*
	data.deptCode      = 부서코드
	data.deptKorNm 	= 부서 한글 명
	data.deptEngNm 	= 부서 영문 명
	data.deptAbrv 	    = 부서 약어
	data.bplcCode 	    = 사업장 코드
	data.bplcNm 	    = 사업장 명
	data.upperDeptCode = 상위 부서 코드
	data.upperDeptNm   = 상위 부서 명
	data.deptLvl 	    = 부서 레벨
	data.orgnztLvl 	= 조직 레벨
	data.deptTelno 	= 부서 전화번호
	data.deptFaxTelno  = 부서 FAX 전화번호
	data.useBeginDe    = 사용 시작 일자
	data.useAt 	    = 사용 여부
	data.deptSe 	    = 부서 구분
	data.sortOrdr 	    = 출력 순서
	data.upperDeptAt   = 상위부서 존재 여부
	*/
}

//--부서 입력 후 Enter 이벤트
function fn_SearchDeptCode(){
	var deptCode = gf_FormGetValue('sampleForm', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('sampleForm', 'deptCodeNm', 'text');
	var jsonParameter = {
			orgnztCode : deptCode,
			orgnztNm : deptKorNm,
			useAt : '1',
			bplcCode : gBplcCode
	};
	gf_Transaction('list_type01', 'dept/searchDept', jsonParameter, 'fn_CallbackSearchDeptCode', false, 'GET');
}
function fn_CallbackSearchDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('sampleForm', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('sampleForm', 'deptCodeNm', data.deptKorNm, 'text');

    } 
    else {
    	//Popup 호출
    	gf_DeptPopup("sampleForm","deptCode","deptCodeNm", gBplcCode, "Y"); 
    }
}

//거래처
function value3(){
	//거래처 선택 결과
	alert($customerInfo.bcncCode + " : " + $customerInfo.bcncNm);
	/*
	 $customerInfo.bcncCode        = 거래처코드
   	 $customerInfo.bcncNm 	       = 거래처명
   	 $customerInfo.bplcCode 	   = 사업장 코드
   	 $customerInfo.bcncSe 	       = 거래처 구분
   	 $customerInfo.bizrno 	       = 사업자번호
   	 $customerInfo.ceoNm 	       = 대표자
   	 $customerInfo.induty 	       = 업종
   	 $customerInfo.bizcnd 	       = 업태
   	 $customerInfo.bankCode 	   = 은행 코드
   	 $customerInfo.bankNm 	       = 은행명
   	 $customerInfo.acnutNo 	       = 계좌번호
   	 $customerInfo.dpstrNm 	       = 예금주
   	 $customerInfo.cprSe 	       = 법인 구분
   	 $customerInfo.nltyCode        = 국적 코드
   	 $customerInfo.areaNm          = 지역 명
   	 $customerInfo.postCode        = 우편 코드
   	 $customerInfo.adres           = 주소
   	 $customerInfo.addr2           = 주소상세
   	 $customerInfo.telno           = 전화번호
   	 $customerInfo.faxNo           = 팩스 번호
   	 $customerInfo.homepage        = HOMEPAGE
   	 $customerInfo.purchsAt        = 매입 여부
   	 $customerInfo.saleofficAt     = 매출처 여부
   	 $customerInfo.bcncscaleSe     = 거래처규모 구분
   	 $customerInfo.taxtSe          = 과세 구분
   	 $customerInfo.bcncCn          = 거래처 내용
   	 $customerInfo.fondDe          = 설립 일자
   	 $customerInfo.capitalAmt      = 자본 금액
   	 $customerInfo.yySaleAmt       = 년 매출 금액
   	 $customerInfo.emplCo          = 사원 수
   	 $customerInfo.tradeNo         = 무역업등록 번호
   	 $customerInfo.crncyCode       = 통화 코드
   	 $customerInfo.useAt           = 사용 여부
   	 $customerInfo.dsrprAt         = 장애인기업 여부
   	 $customerInfo.womanAt         = 여성대표기업 여부
   	 $customerInfo.foreignAt       = 외자기업 여부
   	 $customerInfo.serhandicapAt   = 중증장애인기업 여부
   	 $customerInfo.socialentrprsAt = 사회적기업 여부
   	 $customerInfo.dspsnStdAt      = 장애자 표준 여부
   	 $customerInfo.greenAt         = 녹색제품 여부
   	 $customerInfo.technologyAt    = 기술개발제품 여부
	*/
}

function value3_1(){
	gf_FormSetValue('sampleForm', 'bcncCode', '', 'text');
	gf_FormSetValue('sampleForm', 'bcncNm', '', 'text');
	$customerInfo = {};
}

var fn_CallbackPopComp = function(data) {
	console.log(" Callback : " + data.bcncCode + " , " + data.bcncNm);
    /*
	 data.bcncCode        = 거래처코드
 	 data.bcncNm 	       = 거래처명
 	 data.bplcCode 	   = 사업장 코드
 	 data.bcncSe 	       = 거래처 구분
 	 data.bizrno 	       = 사업자번호
 	 data.ceoNm 	       = 대표자
 	 data.induty 	       = 업종
 	 data.bizcnd 	       = 업태
 	 data.bankCode 	   = 은행 코드
 	 data.bankNm 	       = 은행명
 	 data.acnutNo 	       = 계좌번호
 	 data.dpstrNm 	       = 예금주
 	 data.cprSe 	       = 법인 구분
 	 data.nltyCode        = 국적 코드
 	 data.areaNm          = 지역 명
 	 data.postCode        = 우편 코드
 	 data.adres           = 주소
 	 data.addr2           = 주소상세
 	 data.telno           = 전화번호
 	 data.faxNo           = 팩스 번호
 	 data.homepage        = HOMEPAGE
 	 data.purchsAt        = 매입 여부
 	 data.saleofficAt     = 매출처 여부
 	 data.bcncscaleSe     = 거래처규모 구분
 	 data.taxtSe          = 과세 구분
 	 data.bcncCn          = 거래처 내용
 	 data.fondDe          = 설립 일자
 	 data.capitalAmt      = 자본 금액
 	 data.yySaleAmt       = 년 매출 금액
 	 data.emplCo          = 사원 수
 	 data.tradeNo         = 무역업등록 번호
 	 data.crncyCode       = 통화 코드
 	 data.useAt           = 사용 여부
 	 data.dsrprAt         = 장애인기업 여부
 	 data.womanAt         = 여성대표기업 여부
 	 data.foreignAt       = 외자기업 여부
 	 data.serhandicapAt   = 중증장애인기업 여부
 	 data.socialentrprsAt = 사회적기업 여부
 	 data.dspsnStdAt      = 장애자 표준 여부
 	 data.greenAt         = 녹색제품 여부
 	 data.technologyAt    = 기술개발제품 여부
	*/
};

//--거래처 입력 후 Enter 이벤트
function fn_SearchBcncCode(){
	var bcncCode = gf_FormGetValue('sampleForm', 'bcncCode', 'text');
	var bcncNm = gf_FormGetValue('sampleForm', 'bcncNm', 'text');
	var jsonParameter = {
			bcncCode : bcncCode,
			bcncNm   : bcncNm,
			useAt    : 'Y',
			bplcCode : gBplcCode
	};
	gf_Transaction('list_type01', 'comp/searchComp', jsonParameter, 'fn_CallbackSearchBcncCode', false, 'GET');
}
function fn_CallbackSearchBcncCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('sampleForm', 'bcncCode', data.bcncCode, 'text');
   		gf_FormSetValue('sampleForm', 'bcncNm', data.bcncNm, 'text');

    } 
    else {
    	//Popup 호출
    	gf_CompPopup("sampleForm","bcncCode","bcncNm", gBplcCode, "Y");
    }
    /*else if(!gf_IsNull(data.data.records) && totCnt > 1){
    	//여러건 = Popup 호출
    	fn_CompPopup("sampleForm","bcncCode","bcncNm", gBplcCode, "Y");
    } else {
    	//데이터 없음
    	gf_FormSetValue('sampleForm', 'bcncCode', '', 'text');
   		gf_FormSetValue('sampleForm', 'bcncNm', '', 'text');
        gf_DivMsgAlert(gv_MsgNoData);
    }*/
}



//주소 : 다음 DAUM
function value4(){
	alert(gf_FormGetValue('sampleForm', 'zip', 'text') + " : " + gf_FormGetValue('sampleForm', 'adres', 'text') + " : " + gf_FormGetValue('sampleForm', 'detailAdres', 'text'));
}

function value4_1(){
	gf_FormSetValue('sampleForm', 'zip', '', 'text');
	gf_FormSetValue('sampleForm', 'adres', '', 'text');
	gf_FormSetValue('sampleForm', 'detailAdres', '', 'text');
}

//주소 : 행안부 - juso.go.kr
function value5(){
	alert($addrInfo.zipno + " : " + $addrInfo.roadAddr1 + " : " + $addrInfo.roadAddr2 + " : " + $addrInfo.roadAddrDetail);
	/*
	$addrInfo.zipno          = 우편번호
	$addrInfo.FullAddr       = 도로명주소(전체)
	$addrInfo.roadAddr1      = 도로명주소1
	$addrInfo.roadAddr2      = 도로명주소2
	$addrInfo.roadAddrDetail = 도로명 상세주소
	$addrInfo.engAddr        = 영문주소
	$addrInfo.jibunAddr      = 지번주소
	$addrInfo.admCd          = 행정구역코드
	$addrInfo.rnMgtSn        = 도로명코드
	$addrInfo.bdMgtSn        = 건물관리번호
	$addrInfo.detBdNmList    = 상세건물명
	$addrInfo.bdNm           = 건물명
	$addrInfo.bdKdcd         = 공동주택여부(1 : 공동주택, 0 : 비공동주택)
	$addrInfo.siNm           = 시도명
	$addrInfo.sggNm          = 시군구명
	$addrInfo.emdNm          = 읍면동명
	$addrInfo.liNm           = 법정리명
	$addrInfo.rn             = 도로명
	$addrInfo.udrtYn         = 지하여부(0 : 지상, 1 : 지하)
	$addrInfo.buldMnnm       = 건물본번
	$addrInfo.buldSlno       = 건물부번
	$addrInfo.mtYn           = 산여부(0 : 대지, 1 : 산)
	$addrInfo.lnbrMnnm       = 지번본번(번지)
	$addrInfo.lnbrSlno       = 지번부번(호)
	$addrInfo.emdNo          = 읍면동일련번호
	*/
}

function value5_1(){
	gf_FormSetValue('sampleForm', 'zip01', '', 'text');
	gf_FormSetValue('sampleForm', 'adres01', '', 'text');
	gf_FormSetValue('sampleForm', 'detailAdres01', '', 'text');
	$addrInfo = {};
}

function fn_CallbackPopAddr(data){
	console.log(data.zipno + " : " + data.roadAddr1 + " : " + data.roadAddr2 + " : " + data.roadAddrDetail);
	/*
	data.zipno          = 우편번호
	data.FullAddr       = 도로명주소(전체)
	data.roadAddr1      = 도로명주소1
	data.roadAddr2      = 도로명주소2
	data.roadAddrDetail = 도로명 상세주소
	data.engAddr        = 영문주소
	data.jibunAddr      = 지번주소
	data.admCd          = 행정구역코드
	data.rnMgtSn        = 도로명코드
	data.bdMgtSn        = 건물관리번호
	data.detBdNmList    = 상세건물명
	data.bdNm           = 건물명
	data.bdKdcd         = 공동주택여부(1 : 공동주택, 0 : 비공동주택)
	data.siNm           = 시도명
	data.sggNm          = 시군구명
	data.emdNm          = 읍면동명
	data.liNm           = 법정리명
	data.rn             = 도로명
	data.udrtYn         = 지하여부(0 : 지상, 1 : 지하)
	data.buldMnnm       = 건물본번
	data.buldSlno       = 건물부번
	data.mtYn           = 산여부(0 : 대지, 1 : 산)
	data.lnbrMnnm       = 지번본번(번지)
	data.lnbrSlno       = 지번부번(호)
	data.emdNo          = 읍면동일련번호
	*/
}
</script>

<div class="dhxwin_hdr">Popup 샘플</div>
<div class="list_type01">
	<form id="sampleForm">
		<br/>
		<table style="vertical-align: middle; width:950px;">
			<colgroup>
				<col width="200">
				<col width="10">
				<col width="590">
				<col width="150">
			</colgroup>
			<tr>
				<th>사원 Popp(1)</th>
				<td></td>
				<td>
					<input type="text" name="empCode" id="empCode" maxlength="15" style="width: 80px;"/>
               		<input type="text" name="empCodeNm" id="empCodeNm" style="width: 250px;">
	                <button type="button" id="btnEmpCodeSearch" class="btn_common03">
	                <span class="glyphicon  glyphicon glyphicon-search"> </span>
	                </button>
				</td>
				<td><a href="javascript:value1();">[확인]</a> <a href="javascript:value1_1();">[변수초기화]</a></td>
			</tr>
			<tr>
				<th>사원 Popp(2)</th>
				<td></td>
				<td>
					<input type="text" name="empCode2" id="empCode2" maxlength="15" style="width: 80px;"/>
               		<input type="text" name="empCodeNm2" id="empCodeNm2" style="width: 250px;">
	                <button type="button" id="btnEmpCodeSearch2" class="btn_common03">
	                <span class="glyphicon  glyphicon glyphicon-search"> </span>
	                </button>
				</td>
				<td><a href="javascript:value12();">[확인]</a> <a href="javascript:value1_2();">[변수초기화]</a></td>
			</tr>
			<tr>
				<th>부서 Popp</th>
				<td></td>
				<td>
					<input type="text" name="deptCode" id="deptCode" maxlength="15" style="width: 80px;"/>
               		<input type="text" name="deptCodeNm" id="deptCodeNm" style="width: 250px;">
	                <button type="button" id="btnDeptCodeSearch" class="btn_common03">
	                <span class="glyphicon  glyphicon glyphicon-search"> </span>
	                </button>
				</td>
				<td><a href="javascript:value2();">[확인]</a> <a href="javascript:value2_1();">[변수초기화]</a></td>
			</tr>
			<tr>
				<th>거래처 Popp</th>
				<td></td>
				<td>
					<input type="text" name="bcncCode" id="bcncCode" maxlength="15" style="width: 80px;"/>
               		<input type="text" name="bcncNm" id="bcncNm" style="width: 250px;">
	                <button type="button" id="btnBcncCodeSearch" class="btn_common03">
	                <span class="glyphicon  glyphicon glyphicon-search"> </span>
	                </button>
				</td>
				<td><a href="javascript:value3();">[확인]</a> <a href="javascript:value3_1();">[변수초기화]</a></td>
			</tr>
			<tr>
				<th>주소 Popp (DAUM)</th>
				<td></td>
				<td>
					<input type="text" name="zip" id="zip" maxlength="10" style="width: 80px;" readOnly/>
               		<input type="text" name="adres" id="adres" style="width: 250px;">
               		<input type="text" name="detailAdres" id="detailAdres" style="width: 185px;">
	                <button type="button" id="btnAddrSearch_Daum" class="btn_common03">
	                <span class="glyphicon  glyphicon glyphicon-search"> </span>
	                </button>
				</td>
				<td><a href="javascript:value4();">[확인]</a> <a href="javascript:value4_1();">[변수초기화]</a></td>
			</tr>
			<tr>
				<th>주소 Popp (JUSO)</th>
				<td></td>
				<td>
					<input type="text" name="zip01" id="zip01" maxlength="10" style="width: 80px;" readOnly/>
               		<input type="text" name="adres01" id="adres01" style="width: 250px;">
               		<input type="text" name="detailAdres01" id="detailAdres01" style="width: 185px;">
	                <button type="button" id="btnAddrSearch" class="btn_common03">
	                <span class="glyphicon  glyphicon glyphicon-search"> </span>
	                </button>
				</td>
				<td><a href="javascript:value5();">[확인]</a> <a href="javascript:value5_1();">[변수초기화]</a></td>
			</tr>
	</form>
</div>														
</body>																														   