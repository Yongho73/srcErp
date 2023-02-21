<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng009/stmmng009SearchStmDicary.js"></script>
    
    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
        </div>
        <!--//path_info-->      
        <ul class="btn">                        
            <li><button type="button" id="btnAddStmDicary" class="btn_common02_new">
                <span class="icon_renew"></span>
                신규</button>
            </li>
            <li><button type="button" id="btnSaveStmDicary" class="btn_common02_new">
                <span class="icon_save"></span>
                저장</button>
            </li>
            <li><button type="button" id="btnRemoveStmDicary" class="btn_common02_new">
                <span class="icon_del"></span>
                <taglibs:transText progrmId="default" key="btnDelete" /></button>
            </li>
            <li><button type="button" id="btnExcelStmDicary" class="btn_common02_new">
                <span class="icon_excel"></span>
                <!-- <span class="glyphicon glyphicon-download-alt"></span> -->
                엑셀</button>
            </li>           
            <li>
            <%-- <button class="btn_commo<!-- n02_new" type="button">
                <span class="glyphicon glyphicon-print"></span>
                         출력</button>
            </li> --%>
        </ul>
    </div>
    <!--//title_box-->

    <!-- search_box -->
     <div id="searchFormStmDicary" class="search_box" style="clear:none">
        <table style="width:100%; height:20px; padding-top:-2px; padding-bottom:-2px; margin-top:-2px; margin-bottom:-2px;">
        <tr>
            <td>
           <table style="border:none; padding-top:-2px; padding-bottom:-2px; margin-top:-2px; margin-bottom:-2px;">
                <tr style="border:none;">       
                    <th><label for="docmT">사전 ID</th>
	               <td><input type="text" name="dicaryId" id="dicaryId"></td>           
	               <th><label for="writer">영어</label></th>
	               <td><input type="text" name="eng" id="eng"></td>
	               <th><label for="writer">한글</label></th>
	               <td><input type="text" name="kor" id="kor"></td>
	               <th><label for="writer">제3국</label></th>
	               <td><input type="text" name="third" id="third"></td>
                </tr style="border:none;">
            </table>
            </td>
            <td style="border:none;">
               <div class="btn" style="text-align:right;float:right;top:6px;position:absolute;right:0;">
                 <button type="button" id="btnSearchStmDicary">
                    <span class="glyphicon glyphicon-search f15 mr5"></span><taglibs:transText progrmId="default" key="btnSearch" />
                 </button>
                 <button type="button" id="btnInitStmDicary">
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
        <div class="tdl-1">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titStmDicary" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view ">
                        <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCnt"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                    <div class="btn">                         
                        <button type="button" id="btnMemUpt" class="btn_common01_new">
                            <!-- <span class="glyphicon glyphicon-refresh mr2"></span>-->
                            <taglibs:transText progrmId="default" key="btnMemUpt" />
                        </button>
                    </div>
                </div>
                <!--//list_top-->
                <div>
                    <div id="dataList" style="width: 100%; height: 690px"></div>
                </div>
            </div>
            <!--//list_type01-->
        </div>
        <!-- //tabl-1 -->

        <!-- //tdl-2 -->
        <div class="tdl-2" id="saveForm">
             
             <div class="list_top">
                <h4 class="title03 fl" id="h4_pr_title">
                    <taglibs:transText progrmId="default" key="titStmProgrm" />&nbsp;<taglibs:transText progrmId="default" key="titRegist" />
                </h4>
                <div class="btn">
<%--                    <button type="button" id="btnFormSave" class="btn_common02">
                        <span class="glyphicon glyphicon-save"></span>
                        <taglibs:transText progrmId="default" key="btnSave" />
                    </button> --%>
                     
<%--                    <span id="spanDel" style="display: none">
                        <button type="button" id="btnFormRemove" class="btn_common02">
                            <span class="glyphicon glyphicon-trash"></span>
                            <taglibs:transText progrmId="default" key="btnDelete" />
                        </button>
                    </span> --%>
                </div><!-- //btn -->
            </div>
            <div class="detail_type01">
                <form id="saveFormStmDicary">
                <table>
                    <caption><taglibs:transText progrmId="default" key="titStmDicary" /></caption>
                    <colgroup>
                        <col width="150">
                        <col width="">
                    </colgroup>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDicaryId" /></th>
                        <td>
                        	<input required type="text" name="dicaryId" id="dicaryId" maxlength="30" style="width: 50%"/>
                        	<div class="btn_common04 w70 checkDupBtn">
                        		<span class="glyphicon glyphicon-duplicate"></span>
                        		<input type="button" id="btnCheckDupStmDicary" class="btn_input w60" value="중복확인">
                        	</div>
                        </td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titProgrmId" /></th>
                        <td><input required type="text" name="progrmId" id="progrmId" maxlength="20" style="width: 50%"/></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titEng" /></th>
                        <td><input type="text" name="eng" id="eng" maxlength="200" style="width: 50%"/></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titLabl" /></th>
                        <td><input type="text" name="labl" id="labl" maxlength="20" style="width: 50%"/></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titKor" /></th>
                        <td><input required type="text" name="kor" id="kor" maxlength="200" style="width: 50%"/></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titThird" /></th>
                        <td><input type="text" name="third" id="third" maxlength="200" style="width: 50%"/></td>
                    </tr>
                </table>
                </form>
            </div>
            <!--//detail_type01-->
           
            <!-- //ac -->
        </div>
        <!-- //tabl-2 -->
    </div>
    <!--//tabl_box-->
</body>
