<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bas/mpsbas003/mpsbas003SearchMpsSimplctyTaxtbl.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
            <a href="#n" class="btn_help"><span class="blind"><taglibs:transText progrmId="default" key="titHelp" /></span></a>
        </div>
        <!--//path_info-->
        <ul class="btn">
        	<li>
        		<button type="button" id="btnSearch" class="btn_common01_new">
                	 <!-- <span class="glyphicon glyphicon-search"></span>&nbsp; --><taglibs:transText progrmId="default" key="btnSearch" />
                </button>
        	</li>
        	<li><button type="button" id="btnUp2" class="btn_common01_new">
                   <!-- <span class="glyphicon glyphicon-upload"></span> -->
                   <taglibs:transText progrmId="default" key="btnUp" />
               </button>
            </li>
            <li><button type="button" id="btnExcel" class="btn_common01_new">
                  <!--  <span class="glyphicon glyphicon-download-alt"></span> -->
                  <taglibs:transText progrmId="default" key="btnDown" />
              </button>
           	</li>
            <li><button type="button" id="btnSave" class="btn_common01_new">
                  <!--   <span class="glyphicon glyphicon-save"></span> -->
                   <taglibs:transText progrmId="default" key="btnSave" />
               </button>
			</li>
        </ul>
    </div>
    <!--//title_box-->

    <!-- search_box -->
    <div class="search_box" id="searchFormMpsSimplctyTaxtbl">
        <table>
            <tr>
            	<th><label for="salarytyCode" class="label"><taglibs:transText progrmId="default" key="titApplcYm" /></label></th> 	
			   	<td>
			   		<button type="button" id="btnPrevMm" class="btn_common03"><span class="glyphicon glyphicon-menu-left"></span></button>		   		
			   		<input type="text" name="applcYm" class="ac">			   		   
			   		<button type="button" id="btnNextMm" class="btn_common03"><span class="glyphicon glyphicon-menu-right"></span></button>
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
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titMpsSimplctyTaxtbl" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view">
                        <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCnt"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                    
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
