<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng004/stmmng004SearchStmRolemenu.js"></script>
	
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
            
            <li><button type="button" id="btnExcelRoleMenu" class="btn_common02_new">
                <span class="icon_excel"></span>
                <!-- <span class="glyphicon glyphicon-download-alt"></span> -->
                엑셀</button>
            </li>           
            
        </ul>
    </div>
    <!--//title_box-->
    
    <!-- search_box -->
     <div id="searchForm" class="search_box" style="clear:none">
        <table style="width:100%; height:20px; padding-top:-2px; padding-bottom:-2px; margin-top:-2px; margin-bottom:-2px;">
        <tr>
            <td>
           <table style="border:none; padding-top:-2px; padding-bottom:-2px; margin-top:-2px; margin-bottom:-2px;">
                <tr style="border:none;">       
                    <th style="text-align:left;"><label for="docmT">그룹권한명</th>
                    <td style="text-align:left;"><input type="text" name="roleNm" id="roleNm"/></td>                                 
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
    <div class="tabl_box">
        <!-- //tabl-1 -->
        <div class="tdl-3">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titStmRole" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view ">
                        <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCntRole"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                    <%-- <div class="btn">                        
                        <button type="button" id="btnExcelRole" class="btn_common01_new">
                            <!-- <span class="glyphicon glyphicon-download-alt"></span>-->
                            <taglibs:transText progrmId="default" key="btnDown" />
                        </button>                        
                    </div> --%>
                </div>
                <!--//list_top-->
               
                <div id="roleList" style="width: 100%; height: 690px"></div>
               
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
                        <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCntRoleMenu"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                    <div class="btn"> 
                   		<%-- <button id="btnAdd" type="button" class="btn_common01_new">
                   			<!-- <span class="glyphicon glyphicon-new-window"></span> -->
                   			메뉴조회
                   		</button>
	            		<button id="btnModify" type="button" class="btn_common01_new">
	            			<!-- <span class="glyphicon glyphicon-pencil"></span> -->
	            			수정
	            		</button>
	            		<button id="btnRemove" type="button" class="btn_common01_new">
	            			<!-- <span class="glyphicon glyphicon-trash"></span> -->
	            			삭제
	            		</button>            
	            		<button id="btnExcelRoleMenu" type="button" class="btn_common01_new">
	            			<!-- <span class="glyphicon glyphicon-download-alt"></span> -->
	            			<taglibs:transText progrmId="default" key="btnDown" />
	            		</button> --%>                   
                    </div>
                </div>
                <!--//list_top-->                
                <div id="roleMenuList" style="width: 100%; height: 690px"></div>                
            </div>
            <!-- //ac -->
        </div>
        <!-- //tabl-2 -->
    </div>
    <!--//tabl_box-->
</body>
