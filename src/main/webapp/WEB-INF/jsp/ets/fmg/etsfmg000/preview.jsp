<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>    

<script>
$(function() {	
	$('#divPreViewHtmlEtsfmg000Popup').html(gf_FormGetValue('saveFormEtsfmg000', 'raisHtml', 'textarea'));
});
</script> 

<div id="divPreViewHtmlEtsfmg000Popup"></div>
 
</body>
