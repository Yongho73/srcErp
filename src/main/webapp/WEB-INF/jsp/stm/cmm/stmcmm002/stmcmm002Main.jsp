<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@page import="kr.co.dbvision.lib.Token"%>
<%@include file="/WEB-INF/decorators/default/resource.jsp"%>
<%
	String remotAddr = request.getRemoteHost(); //접속자 IP 주소
	
	if(request.getAttribute("TOKEN_KEY") == null){
		Token.set(request);
	}
%>
<body>

<script>
let remotAddr = '<%=remotAddr%>';
</script>
<script src="${pageContext.request.contextPath}/js/xerp/stm/cmm/stmcmm002/stmcmm002Main.js"></script>

<!-- skip nav -->
<ul id="skip">
	<li><a href="#gnb" tabindex="0">주메뉴 바로가기</a></li>
	<li><a href="#menuTabbars">본문 바로가기</a></li>
</ul>
<!-- //skip nav -->

<div class="main_bg">
	<div class="header">
		<div class="header_wrap">
			<h1 class="logo"></h1>
			<div class="gnb">
				<ul>
				</ul>
			</div><!--//gnb-->
			
			<div class="zoom-box">
				<!-- <button type="button" class="btn_bookmark" id="engBtn" name=""><span class="glyphicon glyphicon-globe"></span>ENG</button>
				<button type="button" class="btn_bookmark" id="korBtn" name=""><span class="glyphicon glyphicon-ok"></span>KOR</button> 
				<span class="zoom-btn">
					<span><taglibs:transText progrmId="default" key="titFontSize"/></span> <span id="spanFontSize">100</span>%
		             <button type="button" id="btnZoomOut" title="Zoom Out">
		            	<span class="glyphicon glyphicon-minus"></span>
		            </button>
		            <button type="button" id="btnZoomIn" title="Zoom In">
		            	<span class="glyphicon glyphicon-plus"></span>
		            </button>
	            </span>
	            -->
			</div><!-- //zoom-box -->
			
			<div class="top_search">
				<ul class="info_book">
					<li><button type="button" class="logout" title="로그아웃" style="margin-top:-15px"><i class="axi axi-ion-log-out" style="font-size:20px"></i>
					</li>
				</ul>			
			</div>
			<!--<div class="top_search"><a href="${pageContext.request.contextPath}/sample/view">샘플페이지</a></div>-->

		</div><!--//header_wrap-->
		<div class="smenu_area">&nbsp;</div>
	</div><!--header-->


	<div id="main_container">

		<div class="quickmenu">
			<h3 class="title">Quick Menu</h3>
			<ul>
				<li><a href="#n"></a></li>
				<li><a href="#n"></a></li>
				<li><a href="#n"></a></li>
				<li><a href="#n"></a></li>
			</ul>
		</div>

		<div class="main_cnt01">

			<div class="user_box">
				<div class="photo"></div>
				<ul class="myinfo">
					<li>정보통신팀 <li>
					<li><span class="nm">홍길동</span>님</li>
					<li class="set"><button type="button" class="btn_set">나의정보 설정</button></li>
				</ul>
				<div class="info">
					<ul>
						<li><span class="bullet01 width">접속한 IP 주소</span> <font class="ipBox">123.12.123.12</font></li>
						<li><span class="bullet01 width">최근 로그인</span> 2018.11.20</li>
						<li><span class="bullet01 width">권 한</span> 일반사용자</li>
					</ul>
				</div>
			</div><!--//user_box-->

			<div class="appro_box">
				<ul id="tabmenu">
					<li>
						<a href="#" title="tab01">결재대기(5)</a>	
					</li>
					<li>
						<a href="#" title="tab02">결재진행(2)</a>
					</li>
					<li>
						<a href="#" title="tab03">진행사업(0)</a>
					</li>
					<li><button type="button" class="btn_more" title="더보기"></button></li>
				</ul>

				<div id="tab-cnt">
					<div id="tab01">
						<p class="img_icon01">&nbsp;</p>
						<ul class="appro_list">
							<li><a href="#n">
								[DDA-해결결과작성] Design Specification for reactor System Specification for reactor System"</a>

								<img src="${pageContext.request.contextPath}/img/common/icon_new.png" alt="new" />
								<span class="date">2018-11-20</span>
							</li>
							<li><a href="#n">
								[IOC-발송승인] Design Specification for reactor System"</a>

								<img src="${pageContext.request.contextPath}/img/common/icon_new.png" alt="new" />
								<span class="date">2018-11-10</span>
							</li>
							<li><a href="#n">
								[PM MEMO 발신-반려] Design Specification for reactor System"</a>
								<span class="date">2018-10-28</span>
							</li>
							<li><a href="#n">
								[설계문서-독립검토] Design Specification for reactor System"</a>
								<span class="date">2018-10-16</span>
							</li>
						</ul>
					</div><!--//tab01-->

					<div id="tab02">
						<p class="img_icon02">&nbsp;</p>
						<ul class="appro_list">
							<li><a href="#n">
								[설계문서-최종승인] Design Specification for reactor System"</a>

								<img src="${pageContext.request.contextPath}/img/common/icon_new.png" alt="new" />
								<span class="date">2018-11-20</span>
							</li>
							<li><a href="#n">
								[IOC-발송승인] Design Specification for reactor System"</a>

								<img src="${pageContext.request.contextPath}/img/common/icon_new.png" alt="new" />
								<span class="date">2018-11-10</span>
							</li>
							<li><a href="#n">
								[PM MEMO 발신-반려] Design Specification for reactor System"</a>
								<span class="date">2018-10-28</span>
							</li>
							<li><a href="#n">
								[설계문서-독립검토] Design Specification for reactor System"</a>
								<span class="date">2018-10-16</span>
							</li>
						</ul>
					</div><!--//tab02-->

					<div id="tab03">
						<p class="img_icon03">&nbsp;</p>
						<ul class="appro_list">
							<li><a href="#n">
								[설계문서] Design Specification for reactor System"</a>

								<img src="${pageContext.request.contextPath}/img/common/icon_new.png" alt="new" />
								<span class="date">2018-11-20</span>
							</li>
							<li><a href="#n">
								[IOC] Design Specification for reactor System"</a>

								<img src="${pageContext.request.contextPath}/img/common/icon_new.png" alt="new" />
								<span class="date">2018-11-10</span>
							</li>
							<li><a href="#n">
								[발신-반려] Design Specification for reactor System"</a>
								<span class="date">2018-10-28</span>
							</li>
							<li><a href="#n">
								[독립검토] Design Specification for reactor System"</a>
								<span class="date">2018-10-16</span>
							</li>
						</ul>
					</div><!--//tab03-->

				</div><!--//tab-cnt-->

			</div><!--//approval_box -->


		</div><!--//main_cnt01-->



		<div class="main_cnt02">
			<div class="board_list">
				<h3 class="title">
					<span class="icon"></span>게시판
					<button type="button" class="btn_more" title="더보기"></button>
				</h3>
				<ul>
					<li>
						<a href="#n">원자력연구원, 재난대응 위한 훈련 원자력연구원, 재난대응 위한 훈련</a>
						<img src="${pageContext.request.contextPath}/img/common/icon_new.png" alt="new" />
						<span class="date">2018-12-10</span>
					</li>
					<li>
						<a href="#n">원자력연구원, 재난대응 위한 훈련 원자력연구원, 재난대응 위한 훈련</a>
						<span class="date">2018-12-10</span>
					</li>
					<li>
						<a href="#n">원자력연구원, 재난대응 위한 훈련</a>
						<span class="date">2018-12-10</span>
					</li>
					<li>
						<a href="#n">원자력연구원, 재난대응 위한 훈련</a>
						<span class="date">2018-12-10</span>
					</li>
				</ul>
			</div><!--//board_list-->

			<div class="notice_list">
				<h3 class="title">
					<span class="icon"></span>공지사항
					<button type="button" class="btn_more" title="더보기"></button>
				</h3>
				<ul>
					<li>
						<a href="#n">한국원자력의학원 감사 초빙 공고</a>
						<img src="${pageContext.request.contextPath}/img/common/icon_new.png" alt="new" />
						<span class="date">2018-12-10</span>
					</li>
					<li>
						<a href="#n">한국원자력의학원 감사 초빙 공고</a>
						<span class="date">2018-12-10</span>
					</li>
					<li>
						<a href="#n">한국원자력의학원 감사 초빙 공고</a>
						<span class="date">2018-12-10</span>
					</li>
					<li>
						<a href="#n">국가과학기술연구회 개방형 직위</a>
						<span class="date">2018-12-10</span>
					</li>
				</ul>
			</div><!--//notice_list-->

			<div class="refer_list">
				<h3 class="title">
					<span class="icon"></span>자료실
					<button type="button" class="btn_more" title="더보기"></button>
				</h3>
				<ul>
					<li>
						<a href="#n">한국원자력의학원 감사 초빙 공고</a>
						<img src="${pageContext.request.contextPath}/img/common/icon_new.png" alt="new" />
						<span class="date">2018-12-10</span>
					</li>
					<li>
						<a href="#n">한국원자력의학원 감사 초빙 공고</a>
						<span class="date">2018-12-10</span>
					</li>
					<li>
						<a href="#n">한국원자력의학원 감사 초빙 공고</a>
						<span class="date">2018-12-10</span>
					</li>
					<li>
						<a href="#n">국가과학기술연구회 개방형 직위</a>
						<span class="date">2018-12-10</span>
					</li>
				</ul>
			</div><!--//notice_list-->

		</div><!--//main_cnt02-->



		<div class="main_cnt03">

			<div class="indiv_list">
				<h3 class="title"><span class="icon"></span>개인별 업무 진행현황</h3>
				<div class="list">
					<table>
						<colgroup>
							<col width="20%"/>
							<col width="20%"/>
							<col width="30%"/>
							<col width="30%"/>
						</colgroup>
						<tr>
							<th>DDA</th>
							<th>IOC</th>
							<th>PM MEMO 발신</th>
							<th>PM MEMO 수신</th>
						</tr>
						<tr>
							<td>2건</td>
							<td>1건</td>
							<td>3건</td>
							<td>5건</td>
						</tr>
					</table>
					<br />
					<table>
						<colgroup>
							<col width="20%"/>
							<col width="20%"/>
							<col width="30%"/>
							<col width="30%"/>
						</colgroup>
						<tr>
							<th>설계문서</th>
							<th>설계도면</th>
							<th>설계변경사항 검토서</th>
							<th>설계변경 통보서</th>
						</tr>
						<tr>
							<td>20건</td>
							<td>10건</td>
							<td>13건</td>
							<td>5건</td>
						</tr>
					</table>
				</div><!--//list-->
			</div><!--//indvi_list-->


			<div class="team_list">
				<h3 class="title"><span class="icon"></span>팀별 업무 진행현황</h3>

				<div class="list">
					<table>
						<colgroup>
							<col width="20%"/>
							<col width="20%"/>
							<col width="30%"/>
							<col width="30%"/>
						</colgroup>
						<tr>
							<th>DDA</th>
							<th>IOC</th>
							<th>PM MEMO 발신</th>
							<th>PM MEMO 수신</th>
						</tr>
						<tr>
							<td>2건</td>
							<td>1건</td>
							<td>3건</td>
							<td>5건</td>
						</tr>
					</table>
					<br />
					<table>
						<colgroup>
							<col width="20%"/>
							<col width="20%"/>
							<col width="30%"/>
							<col width="30%"/>
						</colgroup>
						<tr>
							<th>설계문서</th>
							<th>설계도면</th>
							<th>설계변경사항 검토서</th>
							<th>설계변경 통보서</th>
						</tr>
						<tr>
							<td>20건</td>
							<td>10건</td>
							<td>13건</td>
							<td>5건</td>
						</tr>
					</table>
				</div><!--//list-->
			</div><!--//team_list-->
		</div><!--//main_cnt03-->

	</div><!--//main_container-->
</div><!--//main_bg-->



<div id="footer">
	<div class="footer_box">
		<p class="logo"></p>
		<address>
			서울특별시 금천구 디지털로 9길 68 대륭포스트타워5차 809호 <br />
			<span class="eng">
				<p>Tel : 02-3272-9737　Fax : 02-3272-9027</p>
				<p>Copyright(C) DBVISION. All Right Reserved.</p>
			</span>
		</address>	
	</div><!--//footer_box-->
</div><!--//footer-->	
	
</body>
