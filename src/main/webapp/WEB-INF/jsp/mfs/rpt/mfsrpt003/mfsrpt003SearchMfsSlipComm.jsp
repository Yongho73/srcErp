<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mfs/rpt/mfsrpt003/mfsrpt003SearchMfsSlipComm.js"></script>

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
    <div class="search_box" id="searchFormMfsSlipComm">
        <table>
            <tr>
                <th><label for="BizplcCd" class="label"><taglibs:transText progrmId="default" key="titBizplcCd" /></label></th>
                <td><div id=dixComboBizplcCd  class="div_combo"></div></td>   
                <th><label for="dateS" class="label"><taglibs:transText progrmId="default" key="titSearchPeriod"/></label></th>
                <td>
                    <input type="text" name="searchSregDt" id="searchSregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> ~
                    <input type="text" name="searchEregDt" id="searchEregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">                  
                </td>
                <th><label for="docmN"><taglibs:transText progrmId="default" key="titSummaryDesc"  /></label></th>
                <td>
                   <input type="text" name="summaryDesc" id="summaryDesc" style="width:200px;" >
               </td>
               <th><label for="docmN"><taglibs:transText progrmId="default" key="titSignCd" /></label></th>
               <td><div id="divSignCdCombo"></div></td>
               
               <th><label for="docmN"><taglibs:transText progrmId="default" key="titAcctSlipNo" /></label></th>
                <td>
                   <input type="text" name="acctSlipNo" id="acctSlipNo" style="width:140px;" >
               </td>
              
            </tr>
        </table>
    </div>
    <!--//search_box-->

    <!--//tabl_box-->
    <div class="tabl_box">
        <!-- //tabl-1 -->
        <div class="tdl-mfs-1">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titMfsSlipComm" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view">
                        <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCnt"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                    <div class="btn">
                  <!--        <button type="button" id="btnCheckAll" class="btn_common02">
                            <span class="glyphicon glyphicon-check mr2"></span>
                            <taglibs:transText progrmId="default" key="btnSelectAll" />
                        </button>-->
                        <button type="button" id="btnExcel" class="btn_common01_new">
                            <taglibs:transText progrmId="default" key="btnDown" />
                        </button>
                        <button type="button" id="btnAdd" class="btn_common01_new">
                            <taglibs:transText progrmId="default" key="titRegist" />
                        </button>
                        <!-- <button type="button" id="btnRemove" class="btn_common02">
                            <span class="glyphicon glyphicon-trash"></span>
                            <taglibs:transText progrmId="default" key="btnDelete" />
                        </button> -->
                    </div>
                </div>
                <!--//list_top-->
               
               <div id="dataList" style="width: 100%; height: 680px"></div>
              
            </div>
            <!--//list_type01-->
        </div>
        <!-- //tabl-1 -->

        <!-- //tdl-2 -->
        <div class="tdl-mfs-2" id="saveForm">
            <div class="list_top02">
                <h4 class="title03" id="h4_pr_title">
                    <taglibs:transText progrmId="default" key="titMfsSlipComm" />&nbsp;<taglibs:transText progrmId="default" key="titRegist" />
                </h4>
            </div>
            <div class="detail_type01">
                <form id="saveFormMfsSlipComm">
                <table>
                    <caption><taglibs:transText progrmId="default" key="titMfsSlipComm" /></caption>
                    <colgroup>
                        <col width="200">
                        <col width="">
                        <col width="200">
                        <col width="">
                        <col width="200">
                        <col width="">
                        <col width="200">
                        <col width="">
                        
                    </colgroup>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titAcctSlipNo" /></th>
                        <td><input required type="text" name="acctSlipNo" id="acctSlipNo" maxlength="20" ></td>
                   		 <th><taglibs:transText progrmId="default" key="titSlipDt" /></th>
                        <td><input required type="text" name="slipmakeDt" id="slipmakeDt" maxlength="8" ></td>
                        <th><taglibs:transText progrmId="default" key="titBplcKorNm" /></th>
                        <td><div id="dixComboBizplcCd2"></div></td>
                   		<th><taglibs:transText progrmId="default" key="titSignCd" /></th>
                        <td><input required type="text" name="signCd" id="signCd" maxlength="20" readOnly class="disabled"></td>
                       
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titBugtItem" /></th>
                        <td colspan="3"><input required type="text" name="bugtCd" id="bugtCd" maxlength="15" style="width:80%"></td>
                        <th><taglibs:transText progrmId="default" key="titBugtTot" /></th>
                        <td colspan="3"><input required type="text" name="bugtAmt" id="bugtAmt" class="ar" maxlength="20" style="width:60%" ></td>
                    </tr>
                     <tr>
                        <th><taglibs:transText progrmId="default" key="titPymntAmt" /></th>
                        <td colspan="3"><input required type="text" name="amt" id="amt" class="ar" maxlength="15" style="width:80%"></td>
                        <th><taglibs:transText progrmId="default" key="titBugtBalance" /></th>
                        <td colspan="3"><input required type="text" name="balanceAmt" id="balanceAmt"  class="ar" maxlength="20"  style="width:60%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titBookDebit" /></th>
                        <td colspan="3"><input required type="text" name="drAcctCd" id="drAcctCd" maxlength="15" style="width:15%"><input required type="text" name="drAcctNm" id="drAcctNm" maxlength="15" style="width:63%"></td>
                        <th><taglibs:transText progrmId="default" key="titBookCredit" /></th>
                        <td colspan="3"><input required type="text" name="crAcctCd" id="crAcctCd" maxlength="15" style="width:15%"><input required type="text" name="crAcctNm" id="crAcctNm" maxlength="20"  style="width:43%"></td>
                    </tr>
                    <tr>
                    <th><taglibs:transText progrmId="default" key="titSummaryDesc" /></th>
                        <td colspan="7"><input required type="text" name="summaryDesc" id="summaryDesc"  style="width:80%"  maxlength="4000" ></td>
                   </tr>
                   <tr>
                    <th><taglibs:transText progrmId="default" key="titBigo" /></th>
                        <td colspan="7"><input required type="text" name="bigo" id="bigo" maxlength="4000"  style="width:80%"></td>
                   </tr>
                   <!-- 
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titMakeEmpNo" /></th>
                        <td><input required type="text" name="makeEmpNo" id="makeEmpNo" maxlength="15" ></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titSlipmakeDt" /></th>
                        <td><input required type="text" name="slipmakeDt" id="slipmakeDt" maxlength="8" ></td>
                    
                        
                        <th><taglibs:transText progrmId="default" key="titAmt" /></th>
                        <td><input required type="text" name="amt" id="amt" maxlength="22" ></td>
                    
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titSlipApprDt" /></th>
                        <td><input required type="text" name="slipApprDt" id="slipApprDt" maxlength="8" ></td>
                   
                        <th><taglibs:transText progrmId="default" key="titSlipFixDt" /></th>
                        <td><input required type="text" name="slipFixDt" id="slipFixDt" maxlength="8" ></td>
                   
                        
                        <th><taglibs:transText progrmId="default" key="titSlipAutoCd" /></th>
                        <td><input required type="text" name="slipAutoCd" id="slipAutoCd" maxlength="8" ></td>
                    </tr>
                    
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titAccsignCd" /></th>
                        <td><input required type="text" name="accsignCd" id="accsignCd" maxlength="20" ></td>
                    
                        <th><taglibs:transText progrmId="default" key="titAccsignDate" /></th>
                        <td><input required type="text" name="accsignDate" id="accsignDate" maxlength="7" ></td>
                    
                        <th><taglibs:transText progrmId="default" key="titAccsignEmpNo" /></th>
                        <td><input required type="text" name="accsignEmpNo" id="accsignEmpNo" maxlength="15" ></td>
                    
                        <th><taglibs:transText progrmId="default" key="titAccsignNo" /></th>
                        <td><input required type="text" name="accsignNo" id="accsignNo" maxlength="50" ></td>
                    </tr>
                   
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titCauseactsignNo" /></th>
                        <td><input required type="text" name="causeactsignNo" id="causeactsignNo" maxlength="50" ></td>
                    
                        <th><taglibs:transText progrmId="default" key="titAccSlipSignCd" /></th>
                        <td><input required type="text" name="accSlipSignCd" id="accSlipSignCd" maxlength="20" ></td>
                    
                        <th><taglibs:transText progrmId="default" key="titAccSlipSignNo" /></th>
                        <td><input required type="text" name="accSlipSignNo" id="accSlipSignNo" maxlength="50" ></td>
                    
                        <th><taglibs:transText progrmId="default" key="titAccSlipSignDate" /></th>
                        <td><input required type="text" name="accSlipSignDate" id="accSlipSignDate" maxlength="7" ></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titAccfixDt" /></th>
                        <td><input required type="text" name="accfixDt" id="accfixDt" maxlength="8" ></td>
                   
                        <th><taglibs:transText progrmId="default" key="titAccfixNo" /></th>
                        <td><input required type="text" name="accfixNo" id="accfixNo" maxlength="20" ></td>
                    
                        <th><taglibs:transText progrmId="default" key="titAccfixEmpNo" /></th>
                        <td><input required type="text" name="accfixEmpNo" id="accfixEmpNo" maxlength="15" ></td>
                    
                        <th><taglibs:transText progrmId="default" key="titBigo" /></th>
                        <td><input required type="text" name="bigo" id="bigo" maxlength="4000" ></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titPaymentCls" /></th>
                        <td><input required type="text" name="paymentCls" id="paymentCls" maxlength="3" ></td>
                    
                        <th><taglibs:transText progrmId="default" key="titDescription" /></th>
                        <td><input required type="text" name="description" id="description" maxlength="4000" ></td>
                    
                        
                        
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titRegCls" /></th>
                        <td><input required type="text" name="regCls" id="regCls" maxlength="1" ></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titBugtAmt" /></th>
                        <td><input required type="text" name="bugtAmt" id="bugtAmt" maxlength="22" ></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titBalanceAmt" /></th>
                        <td><input required type="text" name="balanceAmt" id="balanceAmt" maxlength="22" ></td>
                    </tr>
                     -->
                </table>
               
                </form>
            </div>
            <div  class="search_box">
	            <table>
	            <tr>
	                <th><label for="BizplcCd" class="label"><taglibs:transText progrmId="default" key="titDeptCd" /></label></th>
	                <td><input type="text" name="acctSlipNo" id="acctSlipNo" style="width:80px;" >
	                	<button type="button" id="btnCodeSearch" class="btn_common03">
                    		<span class="glyphicon  glyphicon glyphicon-search"> </span>
                		</button>
	                </td>   
	                <th><label for="docmN"><taglibs:transText progrmId="default" key="titEmpNm"  /></label></th>
	                <td>
	                   <input type="text" name="summaryDesc" id="summaryDesc" style="width:60px;" >
	               		<button type="button" id="btnCodeSearch" class="btn_common03">
                    		<span class="glyphicon  glyphicon glyphicon-search"> </span>
                		</button>
	               </td>
	               <th><label for="docmN"><taglibs:transText progrmId="default" key="titChikcCd"  /></label></th>
	                <td>
	                   <div id="divInputFormChikcCodeCombo"></div>
	               </td>
	               <th><label for="docmN"><taglibs:transText progrmId="default" key="titBsrpSe"  /></label></th>
	                <td>
	                   <div id="divBizTripCombo"></div>
	               </td>
	                <th><label for="dateS" class="label" alt="출장기간"><taglibs:transText progrmId="default" key="titBiztripPeriod"  /></label></th>
	                <td>
	                    <input type="text" name="biztripSdt" id="biztripSdt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> ~
	                    <input type="text" name="biztripEdt" id="biztripEdt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">                  
	                </td>
	               <td>
	                    <button type="button" id="btnCodeSearch" class="btn_common03">
                    		<span class="glyphicon  glyphicon glyphicon-search"> </span>
                		</button>  
	                </td>
	            </tr>
	        </table>
	        </div>
            <!--//detail_type01
            <div class="ac mt10">
                <button type="button" id="btnFormSave" class="btn_common01">
                    <span class="glyphicon glyphicon-save mr5"> </span>
                    <taglibs:transText progrmId="default" key="btnSave" />
                </button>
                <span id="spanReset">
                    <button type="button" id="btnFormReset" class="btn_common01">
                        <span class="glyphicon glyphicon-refresh mr5"> </span>
                        <taglibs:transText progrmId="default" key="btnReset" />
                    </button>
                </span> <span id="spanDel" style="display: none">
                    <button type="button" id="btnFormRemove" class="btn_common01">
                        <span class="glyphicon glyphicon-trash mr5"> </span>
                        <taglibs:transText progrmId="default" key="btnDelete" />
                    </button>
                </span>
            </div>-->
            
           
           <div id="dataList2" style="width: 100%; height:395px"></div>
            
           
        </div>
        <!-- //tabl-2 -->
    </div>
    <!--//tabl_box-->
</body>
