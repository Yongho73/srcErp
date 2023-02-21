<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mbs/exc/mbsexc008/mbsexc008SearchMbsBugtcd.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
            <a href="#n" class="btn_help"><span class="blind"><taglibs:transText progrmId="default" key="titHelp" /></span></a>
        </div>
        <!--//path_info-->

         <ul class="btn">
         	<li><button type="button" id="btnSearch" class="btn_common01">
          			<span class="glyphicon glyphicon-search"></span>&nbsp;<taglibs:transText progrmId="default" key="btnSearch" />
         		</button>
         	</li>
         </ul>
   
    </div>
    <!--//title_box-->

    <!-- search_box -->
    <div class="search_box" id="searchFormMbsBugtcd">
   		<table>
       		<tr>
          		<th><label for="bplcKorNm" class="label"><taglibs:transText progrmId="default" key="titStmBizplc" /></label></th>
              	<td><div id=divComboBplcKorNm  class="div_combo"></div></td>       
           		<th><label for="bugtCode" class="label"><taglibs:transText progrmId="default" key="titApplcYy" /></label></th> 	
		   		<td>
			   		<button type="button" id="btnPrevMm" class="btn_common03"><span class="glyphicon glyphicon-menu-left"></span></button>		   		
			   		<input type="text" name="applcYm" class="ac">			   		   
			   		<button type="button" id="btnNextMm" class="btn_common03"><span class="glyphicon glyphicon-menu-right"></span></button>
		   		</td>
		   		<th><label for="acctSe" class="label"><taglibs:transText progrmId="default" key="titAcctSe" /></label></th>
		   		<td>
		   			<div class="switch-field">
		                <input type="radio" id="switch_3_center" name="bugtLv" value="1" checked>
		                <label for="switch_3_center"><taglibs:transText progrmId="default" key="btnArticle" /></label>
		                <input type="radio"  id="switch_3_right1" name="bugtLv" value="2">
		                <label for="switch_3_right1"><taglibs:transText progrmId="default" key="btnClause" /></label>
		                <input type="radio"  id="switch_3_right2" name="bugtLv" value="3">
		                <label for="switch_3_right2"><taglibs:transText progrmId="default" key="btnDetailedClause" /></label>
		                <input type="radio"  id="switch_3_right3" name="bugtLv" value="4">
		                <label for="switch_3_right3"><taglibs:transText progrmId="default" key="btnItem" /></label>
		                <input type="radio"  id="switch_3_right4" name="bugtLv" value="5">
		                <label for="switch_3_right4"><taglibs:transText progrmId="default" key="btnDetailedItem" /></label>
		       		</div>
				</td>
           	</tr>
       	</table>
   	</div>
   	<!--//search_box-->

    <!--//tabl_box-->
    <div class="tabl_box">
        <!-- //tabl-1 -->
        <div style="width:100%;">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titMbsBugtcd" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view">
                        <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCnt"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                    <%-- <div class="btn">
                        <button type="button" id="btnCheckAll" class="btn_common02">
                            <span class="glyphicon glyphicon-check mr2"></span>
                            <taglibs:transText progrmId="default" key="btnSelectAll" />
                        </button>
                        <button type="button" id="btnExcel" class="btn_common02">
                            <span class="excel"></span>
                            <taglibs:transText progrmId="default" key="btnDown" />
                        </button>
                        <button type="button" id="btnAdd" class="btn_common02">
                            <span class="glyphicon glyphicon-pencil mr5"></span>
                            <taglibs:transText progrmId="default" key="titRegist" />
                        </button>
                        <button type="button" id="btnRemove" class="btn_common02">
                            <span class="glyphicon glyphicon-trash mr5"></span>
                            <taglibs:transText progrmId="default" key="btnDelete" />
                        </button>
                    </div> --%>
                </div>
                <!--//list_top-->
                
                <div id="dataList" style="width: 100%; height: 600px"></div>
                
            </div>
            <!--//list_type01-->
        </div>
        <!-- //tabl-1 -->
    </div>
    <!--//tabl_box-->
</body>
