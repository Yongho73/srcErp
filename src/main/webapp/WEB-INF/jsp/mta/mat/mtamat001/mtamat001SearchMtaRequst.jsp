<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mta/mat/mtamat001/mtamat001SearchMtaRequst.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
            <a href="#n" class="btn_help"><span class="blind"><taglibs:transText progrmId="default" key="titHelp" /></span></a>
        </div>
        
        <DIV class="btn" style="float:right;text-align:right; vertical-align:middle;" title="삭제">
			<BUTTON class="btn_common02_new" id="btn_help" type="button" title="도움말">
			        <SPAN class="glyphicon glyphicon-question-sign"></SPAN>
			</BUTTON>
			<BUTTON class="btn_common02_new" id="btnRemove" type="button" title="닫기">
			        <SPAN class="glyphicon glyphicon-remove"></SPAN>
			</BUTTON>
        </DIV>
        
        
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
              <th><label for="dateS" class="label">계약기간</label></th>   
				 <td>
					<input type="text" name="searchSregDt" id="searchSregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> ~ 
					<input type="text" name="searchEregDt" id="searchEregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
			   </td>
			    <th><label for="dateS" class="label">요청일</label></th>   
				 <td>
					<input type="text" name="searchSrequstDt" id="searchSrequstDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> ~ 
					<input type="text" name="searchErequstDt" id="searchErequstDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
			   </td>
			   </tr>
			   <tr>
             <th><label for="requstStep" class="label">진행상태</label></th>
				<td><div id="divComboRequstStep"  class="div_combo"></div></td>
				 <th><label for="requstStep" class="label">승인여부</label></th>
				 <td><div id="divComboComptConfmAt"  class="div_combo"></div></td>
				  
               <td>           
                    <div class="btn">
                     <button type="button" id="btnSearch">
                     	<span class="glyphicon glyphicon-search f15 mr5"></span><taglibs:transText progrmId="default" key="btnSearch" />
                     </button>
                    </div>
                </td>
                <td>
                 <div class="btn">
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
        <!-- //tabl-1 -->
        <div class="tdl-3">
            <div class="list_type01">
               <div class="list_top">
						<span class="view "> 총  <span id="spanCnt2"></span>건<taglibs:transText
								progrmId="default" key="titSearchCnt" />
						</span>
						<div class="btn"></div>
					</div>
                <!--//list_top-->
                <div>
                    <div id="companyList" style="width: 100%; height: 600px"></div>
                </div>
            </div>
            <!--//list_type01-->
        </div>
        <!-- //tabl-1 -->

        <!-- //tdl-2 -->
  
           <div class="tdl-4">
            <div class="list_type01">
                <div class="list_top">
                    <span class="view ">
                          	총 <span id="spanCnt"></span>건
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                    <div class="btn">
                         <button type="button" id="btnAdd" class="btn_common02_new">
                            <span class="glyphicon glyphicon-pencil mr5"></span>
                            <taglibs:transText progrmId="default" key="titRegist" />
                        </button>
                        <button type="button" id="btnRemove" class="btn_common02_new">
                            <span class="glyphicon glyphicon-trash mr5"></span>
                            <taglibs:transText progrmId="default" key="btnDelete" />
                        </button>
                        <button type="button" id="btnExcel" class="btn_common02_new">
                            <span class="glyphicon glyphicon-download-alt"></span>
                            <taglibs:transText progrmId="default" key="btnDown" />
                        </button>
                        <!-- 
                         <BUTTON class="btn_common02_new" id="btn_help" type="button" title="도움말">
						       <SPAN class="glyphicon glyphicon-question-sign"></SPAN>
						</BUTTON>
						<BUTTON class="btn_common02_new" id="btnClose" type="button" title="닫기">
						       <SPAN class="glyphicon glyphicon-remove"></SPAN>
						</BUTTON>
                        -->
                        
                    </div>
                </div>
                <!--//list_top-->
                <div>
                    <div id="requestList" style="width: 100%; height: 600px"></div>
                </div>
            </div>
            <!--//detail_type01-->
        
            <!-- //ac -->
        </div>
        <!-- //tabl-2 -->
    </div>

    <!--//tabl_box-->
</body>
