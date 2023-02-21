<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
 <style>
  #custom-handle {
    width: 100px;
    height: 1.6em;
    top: 50%;
    margin-top: -.8em;
    text-align: center;
    line-height: 1.6em;
  }
  </style>
<body>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hra/mhshra001/mhshra001SearchMhsGnfd.js"></script>
    

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
            <a href="#n" class="btn_help"><span class="blind"><taglibs:transText progrmId="default" key="titHelp" /></span></a>
        </div>
        <!--//path_info-->
        
        <ul class="btn">
        	<li>
        		<button type="button" id="btnSearch" class="btn_common02_new">
              		<taglibs:transText progrmId="default" key="btnSearch" />
               	</button>
        	</li>
        	<li><button type="button" id="btnExcel" class="btn_common02_new">
                    <taglibs:transText progrmId="default" key="btnDown" />
                </button>
            </li>
            <li><button type="button" id="btnAdd" class="btn_common02_new">
                    <taglibs:transText progrmId="default" key="titRegist" />
                </button>
            </li>
            <li><button type="button" id="btnRemove" class="btn_common02_new">
                    <taglibs:transText progrmId="default" key="btnDelete" />
                </button>
             </li>
              <!-- <button type="button" id="btnCheckAll" class="btn_common01">
                  <span class="glyphicon glyphicon-check mr2"></span>
                  <taglibs:transText progrmId="default" key="btnSelectAll" />
              </button> -->
        </ul>
    </div>
    <!--//title_box-->

	 
<!-- 
	<div id="slider">
	  <div id="custom-handle" class="ui-slider-handle"></div>
	</div>-->

    <!-- search_box -->
    <div class="search_box" id="searchFormMhsGnfd">
        <table>
            <tr>
             
	       		<th><label for="bplcKorNm" class="label"><taglibs:transText progrmId="default" key="titStmBizplc" /></label></th>
	       		<td><div id=divComboBplcKorNm  class="div_combo"></div></td>       
	       		<th><label for="empNm" class="label"><taglibs:transText progrmId="default" key="titEmplNm" /></th>
	       		<td><input type="text" name="empNm" id="empNm" maxlength="15" />
	                <button type="button" id="btnEmpSearch" class="btn_common03">
	             		<span class="glyphicon  glyphicon glyphicon-search"> </span>
               		</button>
              	</td>
           		<th><label for="clsfCode" class="label"><taglibs:transText progrmId="default" key="titClsfCode" /></label></th>
           		<td><div id=divComboClsfCode  class="div_combo"></div></td>
           		<th><label for="gnfdSe" class="label"><taglibs:transText progrmId="default" key="titGnfdSe" /></label></th>
				<td><div id="divComboGnfdSe"  class="div_combo"></div></td>
	             		<th><label for="dateS" class="label"><taglibs:transText progrmId="default" key="titGnfdDe" /></label></th>
				<td>
					<input type="text" name="searchSregDt" id="searchSregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> ~ 
					<input type="text" name="searchEregDt" id="searchEregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
				</td>
			
                
                <!--     <button type="button" id="btnZoomIn">
                   	<span class="glyphicon glyphicon-search f15 mr5"></span>Zoom In
                   </button>
                     <button type="button" id="btnZoomOut">
                   	<span class="glyphicon glyphicon-search f15 mr5"></span>Zoom Out
                   </button> -->
              
            </tr>
        </table>
    </div>
    <!--//search_box-->

    <!--//tabl_box-->
    <div class="tabl_box">
        <!-- //tabl-1 -->
        <div class="tdl-mhshra-1">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titMhsGnfd" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
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

        <!-- //tdl-2 -->
        <div class="tdl-mhshra-2" id="saveForm">
            <div class="list_top">
                <h4 class="title03 fl" id="h4_pr_title">
                    <taglibs:transText progrmId="default" key="titMhsGnfd" />&nbsp;<taglibs:transText progrmId="default" key="titRegist" />
                </h4>
	            <div class="btn">
	                <button type="button" id="btnFormSave" class="btn_common02">
	                    <span class="glyphicon glyphicon-save"> </span>
	                    <taglibs:transText progrmId="default" key="btnSave" />
	                </button>
	                <span id="spanReset">
	                    <button type="button" id="btnFormReset" class="btn_common02">
	                        <span class="glyphicon glyphicon-refresh"> </span>
	                        <taglibs:transText progrmId="default" key="btnReset" />
	                    </button>
	                </span> <span id="spanDel" style="display: none">
	                    <button type="button" id="btnFormRemove" class="btn_common02">
	                        <span class="glyphicon glyphicon-trash"> </span>
	                        <taglibs:transText progrmId="default" key="btnDelete" />
	                    </button>
	                </span>
	            </div><!-- //btn --> 
            </div><!-- //list_top --> 
            <div class="detail_type01">
                <form id="saveFormMhsGnfd">
                <input required type="hidden" name="gnfdSn" id="gnfdSn" maxlength="15" />
                <input type="hidden" name="gnfdNo" id="gnfdNo" maxlength="20" style="width: 50%"/>
                <table>
                    <caption><taglibs:transText progrmId="default" key="titMhsGnfd" /></caption>
                    <colgroup>
                        <col width="150">
                        <col width="*">
                        <col width="150">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th scope="row"><taglibs:transText progrmId="default" key="titEmplNm" /></th>
                        <td colspan="3">
                        <input required type="text" name="empno" id="empno" maxlength="15" />
                        <input type="text" name="empNm" id="empNm" maxlength="15" />
                         <button type="button" id="btnEmpSearch" class="btn_common03">
	                    		<span class="glyphicon  glyphicon glyphicon-search"> </span>
	                	</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><taglibs:transText progrmId="default" key="titGnfdDe" /></th>
                        <td><input required type="text" name="gnfdDe" id="gnfdDe" maxlength="15" class="input_calen"></td>
                   
                    <%-- <tr> 
                        <th><taglibs:transText progrmId="default" key="titGnfdSn" /></th> //발령순번
                        <td colspan="3"><input required type="text" name="gnfdSn" id="gnfdSn" maxlength="20" style="width: 50%"/></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titGnfdNo" /></th> // 발령번호
                        <td colspan="3"><input required type="text" name="gnfdNo" id="gnfdNo" maxlength="20" style="width: 50%"/></td>
                    </tr> --%>
                  
                        <th scope="row"><taglibs:transText progrmId="default" key="titGnfdSe" /></th>
                        <td><div id="divInputFormComboGnfdSeBox"  class= 'div_combo'></div></td>
                    </tr>
                     <tr>
                        <th scope="row" ><taglibs:transText progrmId="default" key="titGnfdBeginDe" /></th>
                        <td><input required type="text" name="gnfdBeginDe" id="gnfdBeginDe" maxlength="10" class="input_calen"></td>
                        <th scope="row" ><taglibs:transText progrmId="default" key="titGnfdEndDe" /></th>
                        <td><input  type="text" name="gnfdEndDe" id="gnfdEndDe"  maxlength="10" class="input_calen"></td>
                    </tr>
                    <%-- <tr>
                        <th><taglibs:transText progrmId="default" key="titProcessAt" /></th>
                        <td><input type="checkbox" name="processAt" id="processAt"/></td>
                    </tr> --%>
                    <tr>
                    	<th><taglibs:transText progrmId="default" key="titStmBizplc" /></th> 
                        <td colspan="3"><div id="divInputFormComboBfchgBplcBox" class= 'div_combo'></div>▶<div id="divInputFormComboAfchgBplcBox" class= 'div_combo'></div></td>
                   
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titClsfCode" /></th>
                        <td colspan="3"><div id="divInputFormComboBfchgClsfCodeBox" class= 'div_combo'></div>▶<div id="divInputFormComboAfchgClsfCodeBox" class= 'div_combo'></div>
                        </td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titSrclsCode" /></th>
                        <td colspan="3"><div id="divInputFormComboBfchgSrclsCodeBox" class= 'div_combo'></div>▶  <div id="divInputFormComboAfchgSrclsCodeBox" class= 'div_combo'></div></td>
                    </tr>  
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titOfcpsNm" /></th>
                        <td colspan="3"><div id="divInputFormComboBfchgOfcpsCodeBox" class= 'div_combo'></div>▶ <div id="divInputFormComboAfchgOfcpsCodeBox" class= 'div_combo'></div></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titJssfcCode" /></th>
                        <td colspan="3"><div id="divInputFormComboBfchgJssfcCodeBox" class= 'div_combo'></div>▶ <div id="divInputFormComboAfchgJssfcCodeBox" class= 'div_combo'></div></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDutyCode" /></th>
                        <td colspan="3">
                         <div id="divInputFormComboBfchgDutyCodeBox" class= 'div_combo'></div>▶ <div id="divInputFormComboAfchgDutyCodeBox" class= 'div_combo'>
                        </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDeptCode" /></th>
                        <td colspan="3">
	                        <input  type="text" name="bfchgDeptCode" id="bfchgDeptCode" maxlength="4">
	                        <input type="text" name="bfchgDeptNm" id="bfchgDeptNm">
	                        <button type="button" id="btnBfDeptCodeSearch" class="btn_common03">
	                    		<span class="glyphicon  glyphicon glyphicon-search"> </span>
	                		</button>▶ 
	                		<input  required type="text" name="afchgDeptCode" id="afchgDeptCode" maxlength="4">
	                        <input  type="text" name="afchgDeptNm"   id="afchgDeptNm">
	                        <button type="button" id="btnAfDeptCodeSearch" class="btn_common03">
	                    		<span class="glyphicon  glyphicon glyphicon-search"> </span>
	                		</button>
                		</td>
                       <!--  <input required type="text" name="bfchgDeptCode" id="bfchgDeptCode" maxlength="8" style="width: 40%"/>▶ <input required type="text" name="afchgDeptCode" id="afchgDeptCode" maxlength="8" style="width: 40%"/></td>
                    	 -->
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titHdadptDeptCode" /></th>
                        <td colspan="3">
                        	<input required  type="text" name="hdadptDeptCode" id="hdadptDeptCode" maxlength="4">
	                        <input  type="text" name="hdadptDeptNm"   id="hdadptDeptNm">
	                        <button type="button" id="btnHdadptDeptCodeSearch" class="btn_common03">
	                    		<span class="glyphicon  glyphicon glyphicon-search"> </span>
	                		</button>
                		
                      	</td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titHdadptAt" /></th>
                        <td colspan="3"><input type="checkbox" name="hdadptAt" id="hdadptAt" class="chk-type01"/></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titGnfdDtls" /></th>
                        <td colspan="3">
                        	<textarea name="gnfdDtls" id="gnfdDtls" rows="3" cols="100"></textarea> 
                       </td>
                    </tr>
                    <%-- <tr>
                        <th><taglibs:transText progrmId="default" key="titSanctnCode" /></th>
                        <td><input required type="text" name="sanctnCode" id="sanctnCode" maxlength="20" style="width: 50%"/></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titSanctnNo" /></th>
                        <td><input required type="text" name="sanctnNo" id="sanctnNo" maxlength="18" style="width: 50%"/></td>
                    </tr> --%>
                </table>
                </form>
            </div>
            <!--//detail_type01-->
            
        </div>
        <!-- //tabl-2 -->
    </div>
    <!--//tabl_box-->
</body>
