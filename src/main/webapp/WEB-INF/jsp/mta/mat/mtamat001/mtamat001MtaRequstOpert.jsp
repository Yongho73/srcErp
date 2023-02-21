<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
    var dhxGridRequstOpert;
    var dhxGridListInfoRequstOpert;

    var cf_InitParamRequstOpert = function (){

    	 var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"opertBeginDt", button:"startDateIcon"});
    	     dhxCCalendarEndDate.loadUserLanguage("ko");
    	     dhxCCalendarEndDate.hideTime();
    	    
    	 var dhxCCalendarEndDate2 = new dhtmlXCalendarObject({input:"opertEndDt", button:"startDateIcon"});
    	     dhxCCalendarEndDate2.loadUserLanguage("ko");
    	     dhxCCalendarEndDate2.hideTime(); 
    	     
    	  // 시스템 환경설정 검색 기간 설정
    	  gf_SettingDateInterval('opertBeginDt', 'opertEndDt');      
    	     
    };
    var cf_SetComponentsRequstOpert = function (){

    };

    var cf_SetEventListenerRequstOpert = function (){ 
    	
    	$('#saveFormMtaRequstOpert #btnKorNmSearch').unbind('click').bind('click', function(event){
    		fn_RequestEmpPopup("saveFormMtaRequstOpert","opertorEmpno","opertorEmpNm");
    	});
    	
    	$('#btnFormSaveOpert').unbind('click').bind('click', function() {

    	        if($('#saveFormMtaRequstOpert').validate().form()){

    	            var jsonParameter = {
    	                projectNo : gf_FormGetValue('saveFormMtaRequstOpert', 'projectNo', 'text'),
    	                requstNo : gf_FormGetValue('saveFormMtaRequstOpert', 'requstNo', 'text'),
    	                opertSn : gf_FormGetValue('saveFormMtaRequstOpert', 'opertSn', 'text'),
    	                opertorEmpno : gf_FormGetValue('saveFormMtaRequstOpert', 'opertorEmpno', 'text'),
    	                opertBeginDt : gf_FormGetValue('saveFormMtaRequstOpert', 'opertBeginDt', 'text'),
    	                opertEndDt : gf_FormGetValue('saveFormMtaRequstOpert', 'opertEndDt', 'text'),
    	                opertCn : gf_FormGetValue('saveFormMtaRequstOpert', 'opertCn', 'textarea'),
    	            };

    	            var url;
    	            
    	            var opertSn = gf_FormGetValue('saveFormMtaRequstOpert', 'opertSn', 'text');
    	            var requstNo = gf_FormGetValue('saveFormMtaRequstOpert', 'requstNo', 'text');

    	            if( !gf_IsNull(opertSn) && !gf_IsNull(requstNo) ) {
    	                url = "mtamat001/modifyMtaRequstOpert";
    	            } else {
    	                url = "mtamat001/saveMtaRequstOpert";
    	            }

    	            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
    	            if(dataSource.code === '000') {

    	                if(!gf_IsNull(opertSn) && !gf_IsNull(requstNo)) {
    	                    gf_DivMsgAlert(gv_MsgUpdate);
    	                } else {
    	                	gf_DivMsgAlert(gv_MsgRegist);
    	                }
    	            }
    	        }

    	        $('#saveFormMtaRequstOpert div.error').unbind("click").bind("click",function() {
    	            $(this).remove();
    	        });
    	        
    	  });
    	
    	 $('#btnFormResetOpert').unbind("click").bind("click",function() {
    	        cf_InitInputFormRequstOpert();
    	    });
    };
   
    var cf_SetBindingRequstOpert = function (){};

    var cf_InitFormRequstOpert = function (){};

    var fn_SearchGridListRequstOpert = function (){};

    var fn_CallbackSearchGridListRequstOpert = function (strSvcID, targetID, data){};

    var fn_SelectRequstOpert = function (rId, cInd) {};

    var fn_CheckRequstOpert = function (col){};    

    var cf_InitInputFormRequstOpert = function (){

        gf_FormSetValue('saveFormMtaRequstOpert', 'opertorEmpNm', '', 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'opertBeginDt', '', 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'opertEndDt', '', 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'opertCn', '', 'textarea');
        
    };
    
var fn_findRequestOpert = function() {
    	
    	var projectNo = '${projectNo}';
    	var requstNo = '${requstNo}'; 
    	
        if( !gf_IsNull(projectNo) && !gf_IsNull(requstNo) ) {
        	
        	var jsonParameter = {
                    projectNo : projectNo,
                    requstNo : requstNo 
            };
        	
        	gf_Transaction( projectNo, 'mtamat001/findMtaRequstOpert', jsonParameter, 'fn_SearchInputMtaOpert', false );
        	
        } else {
            //$('#btnFormSaveOpert').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
        }
    }
    
    var fn_SearchInputMtaOpert = function (strSvcID, targetID, data){

		var data = data.data;

        gf_FormSetValue('saveFormMtaRequstOpert', 'projectNo', data.projectNo, 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'requstNo', data.requstNo, 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'compNm', data.compNm, 'text');
        
        $('#saveFormMtaRequstOpert input[name="projectNo"]').attr("disabled", true);
        $('#saveFormMtaRequstOpert input[name="requstNo"]').attr("disabled", true);
        $('#spanDelOpert').show();
        $('#spanResetOpert').hide();
        //$('#btnFormSaveOpert').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    };
    
var fn_RequestOpertDetail = function() {
    	
    	var requstNo = '${requstNo}';
    	var opertSn = '${opertSn}';
    	
        if( !gf_IsNull(opertSn) && !gf_IsNull(requstNo) ) {
        	
        	var jsonParameter = {
        			opertSn : opertSn,
                    requstNo : requstNo 
            };
        	
        	gf_Transaction( projectNo, 'mtamat001/MtaRequstOpertDetail', jsonParameter, 'fn_SearchInputMtaOpertDetail', false );
        	
        } else {
            $('#btnFormSaveOpert').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
        }
    }
    
    var fn_SearchInputMtaOpertDetail = function (strSvcID, targetID, data){

		var data = data.data;

        gf_FormSetValue('saveFormMtaRequstOpert', 'projectNo', data.projectNo, 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'requstNo', data.requstNo, 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'opertSn', data.opertSn, 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'compNm', data.compNm, 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'opertorEmpNm', data.opertorEmpNm, 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'opertorEmpno', data.opertorEmpno, 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'opertBeginDt', data.opertBeginDt, 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'opertEndDt', data.opertEndDt, 'text');
        gf_FormSetValue('saveFormMtaRequstOpert', 'opertCn', data.opertCn, 'textarea');
        
        $('#saveFormMtaRequstOpert input[name="opertSn"]').attr("disabled", true);
        $('#saveFormMtaRequstOpert input[name="requstNo"]').attr("disabled", true);
        $('#spanDelOpert').show();
        $('#spanResetOpert').hide();
        $('#btnFormSaveOpert').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    };
   
    
	$(function() {
    	
        cf_InitParamRequstOpert();
        cf_SetComponentsRequstOpert();
        cf_SetEventListenerRequstOpert();
        cf_SetBindingRequstOpert();
        cf_InitFormRequstOpert();
        
        fn_findRequestOpert();
        fn_RequestOpertDetail();
    });
    


    </script>

	<div id="saveForm" style="margin: 15px;">
		<div class="list_top01" id="tabbarObj"
			style="width: 95%; height: 200px;">
			<div>
				<div class="detail_type02">
					<form id="saveFormMtaRequstOpert">
						<table>
							<colgroup>
								<col width="90">
								<col width="*">
							</colgroup>

							<tr>
								<th>거래처</th>
								<input type="hidden" name="requstNo" id="requstNo" maxlength="15" /> 
								<input type="hidden" name="projectNo" id="projectNo" maxlength="15" /> 
								<input type="hidden" name="opertSn" id="opertSn" maxlength="15" /> 
								<td><input required type="text" name="compNm" id="compNm" maxlength="100" style="width: 200px" readOnly>
							</tr>
							<tr>
								<th>작업자</th>
								<input type="hidden" name="opertorEmpno" id="opertorEmpno" maxlength="15" />
								<td><input type="text" name="opertorEmpNm" id="opertorEmpNm" maxlength="5"/>
									<button type="button" id="btnKorNmSearch" class="btn_common03">
										<span class="glyphicon  glyphicon glyphicon-search"></span>
									</button></td>
							</tr>
							<tr>
								<th>작업기간</th>
								<td>
					<input type="text" name="opertBeginDt" id="opertBeginDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> ~ 
					<input type="text" name="opertEndDt" id="opertEndDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
			   </td>
							</tr>
							<tr>
								<th>작업내용</th>
								<td><textarea required name="opertCn" id="opertCn"
										rows="2" cols="70"></textarea></td>
							
							</tr>

						</table>
					</form>
				</div>
				<!--//detail_type01-->
				<div class="ac mt10">
					<button type="button" id="btnFormSaveOpert" class="btn_common01">
						<span class="glyphicon glyphicon-save mr5"> </span>
						<taglibs:transText progrmId="default" key="btnSave" />
					</button>
					<span id="spanReset">
						<button type="button" id="btnFormResetOpert" class="btn_common01">
							<span class="glyphicon glyphicon-refresh mr5"> </span>
							<taglibs:transText progrmId="default" key="btnReset" />
						</button>
					</span> <span id="spanDel" style="display: none">
						<button type="button" id="btnFormRemoveOpert" class="btn_common01">
							<span class="glyphicon glyphicon-trash mr5"> </span>
							<taglibs:transText progrmId="default" key="btnDelete" />
						</button>
					</span>
				</div>
			</div>
		</div>
		<!-- a1_end -->

	</div>


</body>
