<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng005/stmmng005SearchStmRole.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
            <a href="#n" class="btn_help"><span class="blind"><taglibs:transText progrmId="default" key="titHelp" /></span></a>
        </div>
        <!--//path_info-->
        <ul class="btn">

            <li>
               <button type="button" id="btnAdd" class="btn_common02_new">
                   <span class="glyphicon glyphicon-pencil"></span>
                   <taglibs:transText progrmId="default" key="titRegist" />
               </button>
            
	                <button type="button" id="btnSave" class="btn_common02_new">
	                    <span class="glyphicon glyphicon-save"> </span>
	                    <taglibs:transText progrmId="default" key="btnSave" />
	                </button>              
            
                <button type="button" id="btnRemove" class="btn_common02_new">
                    <span class="glyphicon glyphicon-trash"></span>
                    <taglibs:transText progrmId="default" key="btnDelete" />
                </button>
             </li>                   
        </ul>
    </div>
    <!--//title_box-->

    <!-- search_box -->
    <div class="search_box" id="searchFormStmRole">
        <table>
            <tr>
            	<th><label for="docmT">역할 명</th>
				<td>
					<input type="text" name="roleNm" id="roleNm">
				</td>			
                <td>				               		
                    <div class="btn">
                     <button type="button" id="btnSearch">
                     	<span class="glyphicon glyphicon-search f15 mr5"></span><taglibs:transText progrmId="default" key="btnSearch" />
                     </button>
                     <button type="button" id="btnInit">
                     	<span class="glyphicon glyphicon-refresh f15 mr5"></span><taglibs:transText progrmId="default" key="btnInit" />
                     </button>                     
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!--//search_box-->



    <div class="tabl_box">

        <div class="tdl-1">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titStmRole" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view">
                        <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCnt"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span> 
                </div><!--//list_top-->
              
               	<div id="dataList" style="width: 100%; height: 600px"></div>
                
            </div><!--//list_type01-->
        </div><!-- //tabl-1 -->


        <div class="tdl-2" id="saveForm">
            <div class="list_top">
                <h4 class="title03 fl" id="h4_pr_title">
                    <taglibs:transText progrmId="default" key="titStmRole" />&nbsp;<taglibs:transText progrmId="default" key="titRegist" />
                </h4>
                
            </div><!-- //list_top -->
            
            <div class="detail_type01">
                <form id="saveFormStmRole">
                <table>
                    <caption><taglibs:transText progrmId="default" key="titStmRole" /></caption>
                    <colgroup>
                        <col width="150">
                        <col width="">
                    </colgroup>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titRoleCode" /></th>
                        <td>
                        	<div id="divComboRoleCode" class="div_combo"></div>
                        	<!-- <input required type="text" name="roleCode" id="roleCode" maxlength="20" style="width: 50%"/> -->
                        	<div class="btn_common04 w70 checkDupBtn">
                        		<span class="glyphicon glyphicon-duplicate"></span>
                        		<input type="button" id="btnCheckDup" class="btn_input w60" value="중복확인">
                        	</div>
                        	
                        </td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titRoleNm" /></th>
                        <td><input required type="text" name="roleNm" id="roleNm" maxlength="50" style="width: 50%"/></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titUseAt" /></th>
                        <td><input type="checkbox" name="useAt" id="useAt"/></td>
                    </tr>
                </table>
                </form>
            </div>
            <!--//detail_type01-->
           
        </div>
        <!-- //tabl-2 -->
    </div>
    <!--//tabl_box-->
</body>
