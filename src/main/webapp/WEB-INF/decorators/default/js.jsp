<%@ page contentType="text/html; charset=UTF-8" %>

<script>
var gv_ServerApiUrl = "<%=kr.co.dbvision.lib.GlobalProperties.getProperty("Globals.ServerApiUrl")%>";
var gv_FadeTime = "<%=kr.co.dbvision.lib.GlobalProperties.getProperty("Globals.FadeTime")%>";
var gv_Passphrase = "<%=kr.co.dbvision.lib.GlobalProperties.getProperty("crypto.hashed.password")%>";
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

<!-- editor -->
<script src="${pageContext.request.contextPath}/editor/smartEditor/js/HuskyEZCreator.js"></script>

<!-- datepicker -->
<!-- 년월달력때문에 사용 --> 
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/common/jquery/yearpicker.css" />
<script src="${pageContext.request.contextPath}/js/xerp/yearpicker.js"></script>
<script src="${pageContext.request.contextPath}/js/xerp/jquery.mtz.monthpicker.js"></script>

<!-- global message -->
<script>
var gv_TitRegist    = gf_LocaleTrans('default','titRegist'); 		//등록
var gv_TitUpdate    = gf_LocaleTrans('default','titUpdate'); 		//수정
var gv_TitSelect    = gf_LocaleTrans('default','titSelect'); 		//선택
var gv_TitNum       = gf_LocaleTrans('default','titNum');   		//번호
var gv_MsgDelete    = gf_LocaleTrans('default','msgDelete');   		//삭제
var gv_MsgDeleteErr = gf_LocaleTrans('default','msgDeleteErr'); 	//삭제시오류
var gv_MsgNoData    = gf_LocaleTrans('default','msgNoData');    	//조회된데이타가 졶재하지 않습니다.
var gv_MsgSave      = gf_LocaleTrans('default','msgSave');      	//저장 되었습니다.
var gv_MsgRegist    = gf_LocaleTrans('default','msgRegist');    	//등록 되었습니다.
var gv_MsgUpdate 	= gf_LocaleTrans('default','msgUpdate');    	//수정 하였습니다.
var gv_BtnSave      = gf_LocaleTrans('default','btnSave');      	//저장
var gv_BtnUpdate    = gf_LocaleTrans('default','btnUpdate');    	//수정
var gv_QueDelete    = gf_LocaleTrans('default','queDelete');    	//삭제하시겠습니까? 
var gv_MsgDelKey    = gf_LocaleTrans('default','msgDelKey'); 		//삭제할 key를 선택해 주세요
var gv_QueCopy      = gf_LocaleTrans('default','queCopy');    	    //복사하시겠습니까? 
var gv_QueSave      = gf_LocaleTrans('default','queSave');          //저장 하시겠습니까? 
var gv_MsgExist     = gf_LocaleTrans('default','msgExist');         //이미 등록된 데이타가 존재합니다.

//날짜 생성
var gv_ComDate          = new Date();
var gv_ComYear          = gv_ComDate.getFullYear();
var gv_ComPreYear       = (gv_ComDate.getFullYear())-1; 						                //-1년 
var gv_ComMon           = ("00" + (gv_ComDate.getMonth() + 1)).slice(-2);
var gv_ComDay           = ("00" + gv_ComDate.getDate()).slice(-2);
var gv_ComPreMonDate    = new Date(gv_ComYear, gv_ComMon -2, gv_ComDay);
var gv_ComPreMonYyyy    = gv_ComPreMonDate.getFullYear();
var gv_ComPreMonMm      = ("00" + (gv_ComPreMonDate.getMonth() + 1)).slice(-2);
var gv_ComPreMonDd      = ("00" +  gv_ComPreMonDate.getDate()).slice(-2);
var gv_Preyeardate 	    = gv_ComPreYear + "-" + gv_ComMon + "-" + gv_ComDay;                     //작년
var gv_Firstdate        = gv_ComYear + "-01-01";  						                    //올해 1월1일
var gv_LastYeardate     = gv_ComYear + "-12-31";  						                    //올해 12월31일
var gv_Predate 		    = gv_ComPreMonYyyy + "-" + gv_ComPreMonMm + "-" + gv_ComPreMonDd;      //한달전
var gv_Curdate 		    = gv_ComYear + "-" + gv_ComMon + "-" + gv_ComDay;                   //오늘
var gv_Initdate         = gv_ComYear + "-" + gv_ComMon +"-01";  			                //매윌1일
var gv_Lastdate         = gv_ComYear + "-" + gv_ComMon + "-" + (new Date(gv_ComYear, gv_ComMon, 0)).getDate();	 //월말
var gv_DayOfWeek        = gv_ComDate.getUTCDay();							                   //첫 번째 요일
var gv_CurYymm      	= gv_ComYear + "-" + gv_ComMon;                                          //현재 년월
var gv_Locale           = gf_GetSysConfig("langSeCode");


//
// 화면에서 backspace로 이동되는 현상 막기
$(document).unbind('keydown').bind('keydown', function (event) {
	var doPrevent = false;
	if (event.keyCode === 8) 
	{
		var d = event.srcElement || event.target;
		if ((d.tagName.toUpperCase()   === 'INPUT' && 
			(d.type.toUpperCase()      === 'TEXT'     || 
			 d.type.toUpperCase()      === 'PASSWORD' || 
			 d.type.toUpperCase()      === 'FILE'     || 
			 d.type.toUpperCase()      === 'EMAIL' )) || 
			 d.tagName.toUpperCase()   === 'TEXTAREA') 
		{
			doPrevent = d.readOnly || d.disabled;
		}
		else 
		{
			doPrevent = true;
		}
	}
	if (doPrevent) {
		event.preventDefault();
	}
});
</script>
