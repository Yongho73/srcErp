<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng006/stmmng006SearchStmUsers.js"></script>
    
    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
        </div>
        <!--//path_info-->      
        <ul class="btn">                        
            
            <li><button type="button" id="btnSave" class="btn_common02_new">
                <span class="icon_save"></span>
                저장</button>
            </li>
            
            <li><button type="button" id="btnExcelMenu" class="btn_common02_new">
                <span class="icon_excel"></span>
                <!-- <span class="glyphicon glyphicon-download-alt"></span> -->
                엑셀</button>
            </li>           
            
        </ul>
    </div>
    <!--//title_box-->
 
    <!-- search_box -->
     <div id="searchArea" class="search_box" style="clear:none">
        <table style="width:100%; height:20px; padding-top:-2px; padding-bottom:-2px; margin-top:-2px; margin-bottom:-2px;">
       	<tr>
       		<td>
           <table style="border:none; padding-top:-2px; padding-bottom:-2px; margin-top:-2px; margin-bottom:-2px;">
	            <tr style="border:none;">      	
	             	<th style="text-align:left;"><label for="docmT"><taglibs:transText progrmId="default" key="titUserId" /></th>
					<td style="text-align:left;"><input type="text" name="userId" id="userId" style="text-align:left;"></td>			
					<th style="text-align:left;"><label for="writer"><taglibs:transText progrmId="default" key="titUserNm" /></label></th>
					<td style="text-align:left;"><input type="text" name="userNm" id="userNm" style="text-align:left;"></td>
				</tr style="border:none;">
			</table>
			</td>
			<td style="border:none;">
               <div class="btn" style="text-align:right;float:right;top:6px;position:absolute;right:0;">
                 <button type="button" id="btnSearch">
                 	<span class="glyphicon glyphicon-search f15 mr5"></span><taglibs:transText progrmId="default" key="btnSearch" />
                 </button>
                 <button type="button" id="btnFormReset">
                 	<span class="glyphicon glyphicon-refresh f15 mr5"></span><taglibs:transText progrmId="default" key="btnInit" />
                 </button>
               </div>
              </td style="border:none;">
           </tr>
        </table>
    </div>
    <!--//search_box-->

    <!--//tabl_box-->
    <div id="gridArea" class="tabl_box">
        <!-- //tabl-1 -->
        <div class="tdl-3">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titStmUsers" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view">
                        <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCntUser">0</span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                </div>
                <!--//list_top-->
               
                <div id="userList" style="width: 100%; height: 690px"></div>
               
            </div>
            <!--//list_type01-->
        </div>
        <!-- //tabl-1 -->

        <!-- //tdl-2 -->
        <div class="tdl-4">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titStmMenu" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view ">
                        <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCntUserMenu">0</span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>

                </div>
                <!--//list_top-->
                
                <div id="userMenuList" style="width: 100%; height: 690px"></div>
                
            </div>
            <!-- //ac -->
        </div>
        <!-- //tabl-2 -->
    </div>
    <!--//tabl_box-->
</body>
