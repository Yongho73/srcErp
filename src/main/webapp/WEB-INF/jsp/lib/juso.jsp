<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>주소검색</title>
<% 
	//request.setCharacterEncoding("UTF-8");  //한글깨지면 주석제거
	//request.setCharacterEncoding("EUC-KR");  //해당시스템의 인코딩타입이 EUC-KR일경우에
	String inputYn = request.getParameter("inputYn"); 
	String roadFullAddr = request.getParameter("roadFullAddr"); 
	String roadAddrPart1 = request.getParameter("roadAddrPart1"); 
	String roadAddrPart2 = request.getParameter("roadAddrPart2"); 
	String engAddr = request.getParameter("engAddr"); 
	String jibunAddr = request.getParameter("jibunAddr"); 
	String zipNo = request.getParameter("zipNo"); 
	String addrDetail = request.getParameter("addrDetail"); 
	String admCd    = request.getParameter("admCd");
	String rnMgtSn = request.getParameter("rnMgtSn");
	String bdMgtSn  = request.getParameter("bdMgtSn");
	String detBdNmList  = request.getParameter("detBdNmList");	
	/** 2017년 2월 추가제공 **/
	String bdNm  = request.getParameter("bdNm");
	String bdKdcd  = request.getParameter("bdKdcd");
	String siNm  = request.getParameter("siNm");
	String sggNm  = request.getParameter("sggNm");
	String emdNm  = request.getParameter("emdNm");
	String liNm  = request.getParameter("liNm");
	String rn  = request.getParameter("rn");
	String udrtYn  = request.getParameter("udrtYn");
	String buldMnnm  = request.getParameter("buldMnnm");
	String buldSlno  = request.getParameter("buldSlno");
	String mtYn  = request.getParameter("mtYn");
	String lnbrMnnm  = request.getParameter("lnbrMnnm");
	String lnbrSlno  = request.getParameter("lnbrSlno");
	/** 2017년 3월 추가제공 **/
	String emdNo  = request.getParameter("emdNo");
	//2020.02.21 사용자 콜백함수 추가
	String strCallbackFunc  = request.getParameter("strCallbackFunc");

%>

<script>
var gv_ServerApiUrl = "<%=kr.co.dbvision.lib.GlobalProperties.getProperty("Globals.ServerApiUrl")%>";
var gv_FadeTime = "<%=kr.co.dbvision.lib.GlobalProperties.getProperty("Globals.FadeTime")%>";
var gv_Passphrase = "<%=kr.co.dbvision.lib.GlobalProperties.getProperty("crypto.hashed.password")%>";
var gv_JusoApiKey = "<%=kr.co.dbvision.lib.GlobalProperties.getProperty("Globals.jusoApiKey")%>";
var gv_ContextPath = "${pageContext.request.contextPath}";
</script>

<!-- jquery -->
<script src="${pageContext.request.contextPath}/js/jquery-1.11.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery-ui-custom.min.js"></script>
<!-- bpopup -->
<script src="${pageContext.request.contextPath}/js/jquery.bpopup.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery.blockUI.js"></script>
<!-- multi file upload -->
<script src="${pageContext.request.contextPath}/js/jquery.fileupload.js"></script>
<!-- websocket -->
<script src="${pageContext.request.contextPath}/js/sockjs-0.3.4.js"></script>
<!-- validation -->
<script src="${pageContext.request.contextPath}/js/validation/jquery.validate.js"></script>
<script src="${pageContext.request.contextPath}/js/validation/localization/messages_ko.js"></script>
<!-- number -->
<script src="${pageContext.request.contextPath}/js/jquery.number.js"></script>
<!-- jquery.form.js -->
<script src="${pageContext.request.contextPath}/js/jquery.form.js"></script>

<!-- CryptoJS v3.1.2 -->
<script src="${pageContext.request.contextPath}/js/CryptoJSv3.1.2/rollups/aes.js"></script>
<script src="${pageContext.request.contextPath}/js/CryptoJSv3.1.2/rollups/sha256.js"></script>

<!-- dhtmlxtree -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/dhtmlx/codebase/dhtmlxtree.css"/>
<script src="${pageContext.request.contextPath}/js/dhtmlx/codebase/dhtmlxtree.js"></script>
<!-- dhtmlxtreeview -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/dhtmlx/codebase/dhtmlxtreeview.css"/>
<script src="${pageContext.request.contextPath}/js/dhtmlx/codebase/dhtmlxtreeview.js"></script>
<!-- dhtmlx grid -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/dhtmlx/codebase/dhtmlxgrid.css"/>
<script src="${pageContext.request.contextPath}/js/dhtmlx/codebase/dhtmlxgrid.js"></script>
<!-- dhtmlxwindows -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/dhtmlx/codebase/dhtmlxwindows.css"/>
<script src="${pageContext.request.contextPath}/js/dhtmlx/codebase/dhtmlxwindows.js"></script>
<!-- dhtmlxcombo -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/dhtmlx/codebase/dhtmlxcombo.css"/>
<script src="${pageContext.request.contextPath}/js/dhtmlx/codebase/dhtmlxcombo.js"></script>
<!-- dhtmlxtreegrid -->
<script src="${pageContext.request.contextPath}/js/dhtmlx/codebase/dhtmlxtreegrid.js"></script>
<!-- dhtmlxcalender -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/dhtmlx/codebase/dhtmlxcalendar.css"/>
<script src="${pageContext.request.contextPath}/js/dhtmlx/codebase/dhtmlxcalendar.js"></script>
<!-- dhtmlxchart -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/dhtmlx/codebase/dhtmlxchart.css"/>
<script src="${pageContext.request.contextPath}/js/dhtmlx/codebase/dhtmlxchart.js"></script>
<!-- dhtmlxchart -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/dhtmlx/codebase/dhtmlxtabbar.css"/>
<script src="${pageContext.request.contextPath}/js/dhtmlx/codebase/dhtmlxtabbar.js"></script>

<!-- core js -->
<script src="${pageContext.request.contextPath}/js/core/comCore.js"></script>
<script src="${pageContext.request.contextPath}/js/core/comConvention.js"></script>
<script src="${pageContext.request.contextPath}/js/core/comTransaction.js"></script>
<script src="${pageContext.request.contextPath}/js/core/comEnv.js"></script>
<script src="${pageContext.request.contextPath}/js/core/comPopup.js"></script>
<script src="${pageContext.request.contextPath}/js/core/comDhtmlx.js"></script>
<script src="${pageContext.request.contextPath}/js/core/comEnvSetting.js"></script>


</head>

<body>

<script language="javascript">
$(function() {
	init();
});


//css : /xerp/css/juso_go_kr.css

// opener관련 오류가 발생하는 경우 아래 주석을 해지하고, 사용자의 도메인정보를 입력합니다. ("주소입력화면 소스"도 동일하게 적용시켜야 합니다.)
/* if (document.domain == "localhost"){
	//document.domain = "localhost:8080";
	document.domain = "localhost";
}
else if (document.domain == "dev.dbvision.co.kr"){
	//document.domain = "dev.dbvision.co.kr:8180";
	document.domain = "dev.dbvision.co.kr";
}
else {  //
	console.log("** domain : " + document.domain);
	document.domain = "dbvision.co.kr";
} */

/*
		모의 해킹 테스트 시 팝업API를 호출하시면 IP가 차단 될 수 있습니다. 
		주소팝업API를 제외하시고 테스트 하시기 바랍니다.
*/
function init(){
	var inputYn= "<%=inputYn%>";
	
	if(inputYn != "Y"){
		var url = location.href;
		//var confmKey = "devU01TX0FVVEgyMDIwMDkxMDE4MTE1NzExMDE2OTY=";  //http://localhost/ 용 , 2020-09-09 까지
		var confmKey = gv_JusoApiKey;  //http://dev.dbvision.co.kr 용 , 2020-09-06 까지
		var resultType = "4"; // 도로명주소 검색결과 화면 출력내용, 1 : 도로명, 2 : 도로명+지번, 3 : 도로명+상세건물명, 4 : 도로명+지번+상세건물명
		document.form.confmKey.value = confmKey;
		document.form.returnUrl.value = url;
		document.form.resultType.value = resultType;
		document.form.action="http://www.juso.go.kr/addrlink/addrLinkUrl.do"; //인터넷망
		//document.form.action="http://www.juso.go.kr/addrlink/addrMobileLinkUrl.do"; //모바일 웹인 경우, 인터넷망
		document.form.submit();
	}else{
		if (document.domain == "localhost"){
			//document.domain = "localhost:8080";
			document.domain = "localhost";
		} else 
		if (document.domain == "127.0.0.1"){
			//document.domain = "dev.dbvision.co.kr:8180";
			document.domain = "127.0.0.1";
		} else 
		if (document.domain == "dev.dbvision.co.kr"){
			//document.domain = "dev.dbvision.co.kr:8180";
			document.domain = "dev.dbvision.co.kr";
		} else 
		if (document.domain == "xerp.dbvision.co.kr"){
			//document.domain = "dev.dbvision.co.kr:8180";
			document.domain = "xerp.dbvision.co.kr";
		}
		else {  //
			console.log("** domain : " + document.domain);
			document.domain = "dbvision.co.kr";
		}
		//alert(document.domain);
		//alert(opener);
		//alert(opener.location.href);
		$(opener.location).attr('href', 'javascript:juso_go_kr_CallBack("<%=roadFullAddr%>","<%=roadAddrPart1%>","<%=addrDetail%>","<%=roadAddrPart2%>","<%=engAddr%>","<%=jibunAddr%>","<%=zipNo%>", "<%=admCd%>", "<%=rnMgtSn%>", "<%=bdMgtSn%>", "<%=detBdNmList%>", "<%=bdNm%>", "<%=bdKdcd%>", "<%=siNm%>", "<%=sggNm%>", "<%=emdNm%>", "<%=liNm%>", "<%=rn%>", "<%=udrtYn%>", "<%=buldMnnm%>", "<%=buldSlno%>", "<%=mtYn%>", "<%=lnbrMnnm%>", "<%=lnbrSlno%>", "<%=emdNo%>", "<%=strCallbackFunc%>")');
		window.close();
	}
}
</script>

	<form id="form" name="form" method="post">
		<input type="hidden" id="confmKey" name="confmKey" value=""/>
		<input type="hidden" id="returnUrl" name="returnUrl" value=""/>
		<input type="hidden" id="resultType" name="resultType" value=""/>
		<!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 START-->
		<!-- 
		<input type="hidden" id="encodingType" name="encodingType" value="EUC-KR"/>
		 -->
		<!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 END-->
	</form>
</body>
</html>