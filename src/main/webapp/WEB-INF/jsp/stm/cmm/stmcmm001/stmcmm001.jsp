<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@include file="/WEB-INF/decorators/default/resource.jsp"%>
<% String remotAddr = request.getRemoteHost(); %> 

<body>

<script type="text/javascript">
<!--
	if (top.location!= self.location) top.location = self.location.href;
	var vRemotAddr = '<%=remotAddr%>';
-->
</script>

<script src="${pageContext.request.contextPath}/js/xerp/stm/cmm/stmcmm001/stmcmm001.js"></script>

<!-- skip nav -->
<ul id="skip">
	<li><a href="#id">로그인 바로가기</a></li>
</ul>

<div class="login_bg">	
	<div id="login_wrap">	
		<div class="login_left">
			<h1 class="login_logo"><span class="blind">X-ERP</span></h1>
		</div>
		
		<div class="login_right">
			<h3><taglibs:transText progrmId="default" key="titLogin"/></h3>
			<form name="formLogin" id="formLogin">
			<ul class="loginForm login_box" id="login_box">
				<li><input required type="text" id="userId" name="id" class="input" placeholder="<taglibs:transText progrmId="default" key="idPlaceholderMsg"/>"></li>
				<li><input required type="password" id="userKey" name="pw" class="input" placeholder="<taglibs:transText progrmId="default" key="pwdPlaceholderMsg"/>" onKeyPress="if (event.keyCode==13){fn_login();}"></li>
				<li><button type="button" class="btn_login" id="btnLogin"><taglibs:transText progrmId="default" key="titLogin"/></button></li>
				<!-- <li class="ac">
					<span class="id_search line"><a href="#n" class="icon"><taglibs:transText progrmId="default" key="titFindId"/></a></span>
					<span class="id_search"><a href="#n" class="icon"><taglibs:transText progrmId="default" key="titFindPass"/></a></a></span>
				</li> -->
			</ul>
			</form>			
		</div><!--//login_right-->

	</div><!--//login_wrap-->
</div><!--//login_bg-->	

</body>
