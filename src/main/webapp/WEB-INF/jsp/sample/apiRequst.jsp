<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%> 
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>


<body>


<style>
.list_type_api  {clear:both; margin-top:10px; min-height:320px;overflow:hidden; margin-left:20px;}
.list_type_api table  {clear:both;width:70%; border-top:solid 1px #fff;border-left:0;border-right:0;border-bottom:none;border-collapse:separate; background:rgba(255,255,255,0.9); text-align:center;white-space:nowrap;table-layout:fixed;color:#848484;}
.list_type_api table th {padding:14px 9px 15px 9px;border-top:solid 1px #ccc;border-bottom:solid 1px #ccc;background:#f8f8f8;font-size:15px;font-weight:bold;color:#262626;text-align:center;letter-spacing:-.3px;}
.list_type_api table td {position:relative; padding:10px 9px 10px 9px; border-bottom:solid 1px #ccc; color:#848484;text-align:center;font-size:14px;line-height:27px;letter-spacing:-.3px;}

.ellipsis_w400 {display:inline-block;max-width:400px;width:auto;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;-ms-text-overflow:ellipsis; vertical-align:center;}

.api_title {font-size:25px; margin-bottom:10px; font-weight:bold;}
.api_contents {font-size:21px;letter-spacing:0.5px;margin-left:35px;margin-bottom:10px;}
.api_contents2 {font-size:19px;letter-spacing:0.5px;margin-left:60px;margin-bottom:13px;}
</style>
<script>
</script>
<div class="dhxwin_hdr" style='height:3rem;font-size:1.6rem;'>유지보수  요청 API</div>
<div style="float:right; width:98%">
<form id="apiRequst">
	<br/>
	<p class='api_title'>◾&nbsp;유지보수 요청 API</p>
	<p class='api_contents2' style='margin-left:35px;'> API링크를 통해 별도의 로그인 없이 설정된 프로젝트의 유지보수를 요청할 수 있습니다.</p>
	<br/><br/>
	<p class='api_title'>◾&nbsp;적용 대상 프로젝트</p>
	<p class='api_contents2' style='margin-left:35px;'>
		<span style='font-weight:bold;'>유지보수 프로젝트</span> 중 
		<span style='font-weight:bold;'>유상월정액계약</span>,
		<span style='font-weight:bold;'>무상유지보수</span>,
		<span style='font-weight:bold;'>유상건별계약</span> 으로 계약된 유지보수 프로젝트만 해당 API를 적용할 수 있습니다.
	</p>
	<br/><br/>
	<p class='api_title'>◾&nbsp;API 사용방법</p>
	<p class='api_contents' style='font-weight:bold;'>1)팝업 URL 복사</p>
	<p class='api_contents2'>- 프로젝트관리 > 프로젝트관리 > 프로젝트현황 메뉴에서 적용할 프로젝트 선택 후 기본 Tab 하단 ID/PW 항목의 [팝업URL복사] 버튼을 클릭하면<br/>&nbsp;&nbsp;자동으로 해당 프로젝트의
	유지보수 API주소가 복사됩니다. (암호화된 프로젝트코드, 거래처코드, 로그인아이디가 URL에 포함됩니다.)</p>
	<p class='api_contents2'>- 해당 URL은 홈페이지 유지보수 요청메뉴(리스트)로 링크되며, 자동 암호화/복호화가 적용되며 인증처리가 되어있습니다.</p>
	<p class='api_contents2'>- 유지보수 요청시 메뉴명과 요청자를 자동으로 설정하려면 "&menuNm=메뉴명&userNm=요청자이름"을 추가해주세요. 변수값이 한글일 경우<br/>&nbsp;&nbsp;인코딩된 값을 넣어주세요.</p>
	<p class='api_contents2' style='margin-bottom:5px;'>- 유지보수요청(등록) 화면으로 링크를 하려면 복사된 URL의 "/list"를 "/input"로 변경하고, "&inputDirect=direct"텍스트를 추가해주세요.</p>
	<p class='api_contents2'>
		&nbsp;&nbsp;&nbsp;&nbsp;예시)http://www.dbvision.co.kr/homepage/pjtmta/supportDirect<span style='color:red;'>/input</span>?projectSn=58c182b5989e181ca6a2f4c2ec9dc108
		<br/>&nbsp;&nbsp;&nbsp;&nbsp;&bcncCode=8e87f3d159444ae0&projectId=af56126b1370b968<span style='color:red;'>&inputDirect=direct</span>
	</p>
	<br/>
	<p class='api_contents' style='font-weight:bold;'>2)복사된 URL 링크</p>
	<p class='api_contents2'>- 유지보수 사이트내 자유롭게 적용할 수 있습니다.</p>
	<p class='api_contents2'>- 팝업사이즈 : (권고)1000 * 650</p>
	<p class='api_contents2'>- 예시화면</p>
	<div style='margin-left:80px; margin-top:-30px'>
		<img src="${pageContext.request.contextPath}/img/sample/api_sample.png" alt=" " width='480px'>
		<img src="${pageContext.request.contextPath}/img/sample/api_click.png" alt=" " width='80px' height='300px'>
		<img src="${pageContext.request.contextPath}/img/sample/api_list.png" alt=" " width='530px'>
	</div>
	<br/><br/>
	<p class='api_title'>◾&nbsp;[참고] 요청변수(Request Parameter)</p>
	<div class="list_type_api" style='margin-left:35px;'>
		<table>
			<caption>projectRequestAPI</caption>
			<colgroup> <!--전체 1050px-->
				<col width="200">
				<col width="100">
				<col width="700">
				<col width="300">
			</colgroup>
			<thead>
				<tr>
					<th scope="col">요청변수</th>
					<th scope="col">값</th>
					<th scope="col">설명</th>
					<th scope="col">비고</th>
				</tr>
				
			</thead>
			<tbody>
				<tr>
					<td>projectSn</td>
					<td>string(필수)</td>
					<td>암호화된 프로젝트 코드</td>
					<td>URL 복사시 암호화되어 적용</td>
				</tr>
				<tr>
					<td>bcncCode</td>
					<td>String(필수)</td>
					<td>암호화된 거래처 코드</td>
					<td>URL 복사시 암호화되어 적용</td>
				</tr>
				<tr>
					<td>projectId</td>
					<td>String(필수)</td>
					<td>암호화된 로그인 아이디</td>
					<td>URL 복사시 암호화되어 적용</td>
				</tr>
				<tr>
					<td>inputDirect</td>
					<td>String</td>
					<td>리스트로 돌아가는지 목록으로 돌아가는지 판단</td>
					<td></td>
				</tr>
				<tr>
					<td>menuNm</td>
					<td>String</td>
					<td>유지보수 요청시 해당 값을 메뉴명으로 자동 추가 / 한글값을 넘길경우 인코딩 필수<br/>인코딩방법(js기준) : encodeURI(메뉴명)</td>
					<td></td>
				</tr>
				<tr>
					<td>UserNm</td>
					<td>String</td>
					<td>유지보수 요청시 해당 값을 작성자로 자동 추가 / 한글값을 넘길경우 인코딩 필수<br/>인코딩방법(js기준) : encodeURI(사용자이름)</td>
					<td></td>
				</tr>
			</tbody>
		</table>
		<br/><br/>
	</div>
	<p class='api_title'>◾&nbsp;[참고] 암호화</p>
	<p class='api_contents2' style='margin-left:35px;margin-bottom:0px'> URL의 암호화 방식은 <a href='http://xerp.dbvision.co.kr/xerp/sample/crypto/view' style='color:red;margin-left:0px;' class='api_contents2'>[암복호화]</a>
		의 DESede암호화 방식을 적용하였습니다.
	</p>
	<p class='api_contents2' style='margin-left:35px;'>URL복사가 아닌 직접 변수를 입력할 경우 <a href='http://xerp.dbvision.co.kr/xerp/sample/crypto/view' style='color:red;margin-left:0px;' class='api_contents2'>[암복호화]</a> 에서 해당 변수값을 암호화하여 사용해주세요.</p>
	<br/><br/><br/>
</form>
</div>	



</body>