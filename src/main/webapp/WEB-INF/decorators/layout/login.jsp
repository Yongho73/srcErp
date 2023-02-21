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
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css">

<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/login.css">

</head>
<body>

<!-- header -->
<page:applyDecorator name="default_header" />
	
<decorator:body />
		 
</body>
</html>
