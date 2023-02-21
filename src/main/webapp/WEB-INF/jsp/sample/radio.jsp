<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%> 
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

<script>

$(function() {   
    cf_SetComponents();      
});                                      

var cf_SetComponents = function (){ 

	gf_MakeCheckBasic('userRoleCodeCheckSaveAreaTd','checkRoleCodeSaveArea','','','stmmng001/check/role'); // 그룹권한 커스텀 콤보
	gf_MakeRadioBasic('userRoleCodeRadioSaveAreaTd','checkRoleCodeSaveArea','','','stmmng001/check/role'); // 그룹권한 커스텀 콤보
    
};


</script>

커스텀 체크박스

<div id="userRoleCodeCheckSaveAreaTd"></div>

<br/>

 커스텀 라디오버튼

<div id="userRoleCodeRadioSaveAreaTd"></div>

<br/>

        
</body>                     													   