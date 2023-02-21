<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!DOCTYPE html>
<html class="no-js" lang="ko">
<head>

<!-- meta -->
<page:applyDecorator name="default_meta" />
<!-- title -->
<page:applyDecorator name="default_title" />

<page:applyDecorator name="default_css" />
<!-- js -->
<page:applyDecorator name="default_js" />

<!-- css -->
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/axicon/axicon.min.css" />
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/table.css" />   
<LINK type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css" />
<LINK type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/iframe.css" />
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/contents.css" />

<script type="text/javascript">
<!--
$(function() {
    gf_CheckButtonAuth();
});
-->
</script>

</head>
<body>
<div class="body">
<!-- header -->
<page:applyDecorator name="default_header" />
	
<decorator:body />
</div>
</body>
</html>
