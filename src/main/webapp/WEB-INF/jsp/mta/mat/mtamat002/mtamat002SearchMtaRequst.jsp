<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script
		src="${pageContext.request.contextPath}/js/xerp/mta/mat/mtamat002/mtamat002SearchMtaRequst.js"></script>

	<!-- title_box -->
	<div class="title_box">
		<div class="path_info">
			<ul id="menu_path"></ul>
			<a href="#n" class="btn_help"><span class="blind"><taglibs:transText
						progrmId="default" key="titHelp" /></span></a>
		</div>
		<!--//path_info-->
	</div>
	<!--//title_box-->

	<!-- search_box -->
	<div class="search_box" id="searchFormMtaRequst">
		<table>
			<tr>
			<th><label for="compNm" class="label"><taglibs:transText progrmId="default" key="titCompany" /></th>
               <td> 
               	   <input type="text" name="compNm" id="compNm">
	               <button type="button" id="btnCompNmSearch" class="btn_common03">
	                	<span class="glyphicon  glyphicon glyphicon-search"> </span>
	               </button>
	           </td>
	           <th><label for="dateS" class="label"><taglibs:transText progrmId="default" key="titPeriod" /></label></th>     
               <td>
					<input type="text" name="searchSregDt" id="searchSregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> ~ 
					<input type="text" name="searchEregDt" id="searchEregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
			   </td>       
				<td>
					<div class="btn" >
						<button type="button" id="btnSearch">
							<span class="glyphicon glyphicon-search f15 mr5"></span>
							<taglibs:transText progrmId="default" key="btnSearch" />
						</button>
					</div>
				</td>
				<td>
                 <div class="btn" >
                     <button type="button" id="btnFormReset">
                     	<span class="glyphicon glyphicon-refresh f15 mr5"></span>초기화
                     </button>
                    </div>
                </td>
			</tr>
		</table>
	</div>
	<!--//search_box-->

	<!--//tabl_box-->
	<div class="tabl_box">
		<div style="width:100%;">
				<div class="list_type01">
					<div class="list_top">
						<span class="view "><p>총 <span id="spanCnt"></span>건</p><taglibs:transText
								progrmId="default" key="titSearchCnt" />
						</span>
						<div class="btn"></div>
					</div>
					<!--//list_top-->
					<div>
						<div id="dataList" style="width: 100%; height: 600px"></div>
					</div>
				</div>
			</div>
			<!--//list_type01-->
		<!-- //tabl-1 -->

		<!-- //tabl-2 -->
	</div>
	<!--//tabl_box-->
</body>
