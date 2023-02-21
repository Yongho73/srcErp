<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng011/stmmng011SearchStmPrgRequst.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
        </div>
        <!--//path_info-->      
        <ul class="btn" id="btnArea">                        
            <li><button type="button" id="btnAdd" class="btn_common02_new">
                <span class="icon_renew"></span>
                신규</button>
            </li>
            <li><button type="button" id="btnExcel" class="btn_common02_new">
                <span class="icon_excel"></span>
                엑셀</button>
            </li>            
<!--             <li><button type="button" id="btnSave" class="btn_common02_new">
                <span class="icon_save"></span>
                저장</button>
            </li> -->
            <li><button type="button" id="btnRemove" class="btn_common02_new">
                <span class="icon_del"></span>
                <taglibs:transText progrmId="default" key="btnDelete" /></button>
            </li>
        </ul>
    </div>
    <!--//title_box-->

   
    <!-- search_box -->
    <form id="searchForm1">
     <div id="searchFormStmPrgRequst" class="search_box" style="clear:none">
        <table style="width:100%; height:20px; padding-top:-2px; padding-bottom:-2px; margin-top:-2px; margin-bottom:-2px;">
       	<tr>
       		<td>   
           <table style="border:none; padding-top:-2px; padding-bottom:-2px; margin-top:-2px; margin-bottom:-2px;">
	            <tr style="border:none;"> 
                    <th><label for="requestPerson" class="label">요청자</label></th>
                    <td>
                        <input type="text" name="requestPersonId" id="requestPersonId" style="width: 60px;" maxlength="15"> 
                        <input type="text" name="requestPersonName" id="requestPersonName" >
                         <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                    </td>
                    <th><label for="requestMenu" class="label">메뉴</label></th>
                    <td>
                        <input type="text" name="requestMenuId" id="requestMenuId" class="w100"> 
                        <input type="text" name="requestMenuName" id="requestMenuName" class="w100"> 
                        <button type="button" id="btnMenuSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                    </td>    	
					<th><label for="divComboSysSe" class="label">업무분류</label></th>
					<td><div id="divComboSysSe"></div></td>
					<th><label for="divComboReqSe" class="label">요청구분</label></th>
					<td><div id="divComboReqSe"></div></td>
					<th><label for="divComboSttusSe" class="label">진행상태</label></th>
					<td><div id="divComboSttusSe"></div></td>					
					<th><label for="requestDe" class="label">요청일자</label></th>
					<td>
						<input type="text" name="bgnRequstDe" id="bgnRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> 
						~ <input type="text" name="endRequstDe" id="endRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
						<div id="date2_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
					</td>
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
    <div class="tabl_box">
        <!-- //tabl-1 -->
         <div class="tdl-1" style="width:100%">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                    </h4>
                    <span class="view">
                    	<taglibs:transText progrmId="default" key="titTotalCount" />&nbsp;<span id="spanCnt"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>                
                </div>
                <!--//list_top-->
                <div>              
                    <div id="dataList" style="width: 100%; height: 600px; background-color:#FFF"> </div>
                </div>
            </div>
            <!--//list_type01-->
        </div>
        <!-- //tabl-1 -->

        
    </div>
    <!--//tabl_box-->
</body>
