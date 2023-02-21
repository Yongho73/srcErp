<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng010/stmmng010SearchStmDevStat.js"></script>
    <script src="http://malsup.github.com/jquery.form.js"></script>

	<!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
        </div>
        <!--//path_info-->      
        <ul class="btn" id="btnArea">                        

            <li><button type="button" id="btnSave" class="btn_common02_new">
                <span class="icon_save"></span>
                저장</button>
            </li>
            <li><button type="button" id="btnExcel" class="btn_common02_new">
                <span class="icon_excel"></span>
                엑셀</button>
            </li>
        </ul>
    </div>
	<!--//title_box-->


    <!-- search_box -->
     <form id='searchForm1'>
     <div id="searchStmDevStat" class="search_box" style="clear:none">
     
        <table style="width:100%; height:20px; padding-top:-2px; padding-bottom:-2px; margin-top:-2px; margin-bottom:-2px;">
       	<tr>
       		<td>
           <table style="border:none; padding-top:-2px; padding-bottom:-2px; margin-top:-2px; margin-bottom:-2px;">
	            <tr style="border:none;"> 
					<th><label for="divComboSysSe" class="label">업무분류</label></th>
					<td><div id="divComboSysSe"></div></td>	                 	
	                <th><label for="progrsSttus" class="label">진행상태</label></th>
	                <td><div id="divComboProgrsSttus" class="div_combo"></div></td>
               		<th><label for="menuNm" class="label"><taglibs:transText progrmId="default" key="titMenuNm" /></label></th>
               		<td><input type="hidden"/><input type="text" name="menuNm" id="menuNm"></td>	                 
	                <th><label for="chargerNm" class="label">담당자</label></th>
	                <td><div id="divComboChargerNm"></div></td>	                  
	                  
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
    </form>
    <!--//search_box-->
    
    <!--//tabl_box-->
    <div class="tabl_box" >
        <!-- //tabl-1 -->
        <div class="tdl-1" style="width:100%">
            <div class="list_type01" >
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titStmDevStat" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view ">
                        <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCnt"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                </div>
                <!--//list_top-->
                <div>
                    <div id="dataList" style="width: 100%; height: 600px"></div>
                </div>
            </div>
            <!--//list_type01-->
        </div>
        <!-- //tabl-1 -->

    </div>
    <!--//tabl_box-->
</body>
