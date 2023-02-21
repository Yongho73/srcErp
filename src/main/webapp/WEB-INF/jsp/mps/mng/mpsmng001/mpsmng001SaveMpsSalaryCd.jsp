<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

<script>
var dhxPopupPaymentddtClsCombo;
var salaryCd = '${salaryCd}';

var cf_InitParamPopupRole = function (){
	//
};

var cf_SetComponentsPopupRole = function (){
	$("#saveForm").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListenerPopupRole = function (){
	$('#btnPopupUserSave').unbind("click").bind("click",function() {

  		if($("#saveForm").validate().form()){
  			
  			var url = "";
  			var jsonParameter = {
				salaryCd    		: $('#saveForm input[name="salaryCd"]').val(),
				salaryNm    		: $('#saveForm input[name="salaryNm"]').val(),
				salaryDesc  		: $('#saveForm input[name="salaryDesc"]').val(),
				useSdt      		: $('#saveForm input[name="useSdt"]').val().replaceAll('-',''),
				dspOdr      		: $('#saveForm input[name="dspOdr"]').val(),
				accountNo   		: $('#saveForm input[name="accountNo"]').val(),
				retireamtobjYn		: (gf_FormGetValue('saveForm', 'retireamtobjYn',  'chkboxYN') === 'Y') ? 'Y':'N',
				basewageinclsYn		: (gf_FormGetValue('saveForm', 'basewageinclsYn', 'chkboxYN') === 'Y') ? 'Y':'N',
				avewageinclsYn		: (gf_FormGetValue('saveForm', 'avewageinclsYn',  'chkboxYN') === 'Y') ? 'Y':'N',
				ojtapplyYn			: (gf_FormGetValue('saveForm', 'ojtapplyYn',      'chkboxYN') === 'Y') ? 'Y':'N',
				dhalfCalcYn			: (gf_FormGetValue('saveForm', 'dhalfCalcYn',     'chkboxYN') === 'Y') ? 'Y':'N',
				useYn		    	: (gf_FormGetValue('saveForm', 'useYn',           'chkboxYN') === 'Y') ? 'Y':'N',
				bugtMkYn			: (gf_FormGetValue('saveForm', 'bugtMkYn',        'chkboxYN') === 'Y') ? 'Y':'N',			
	  			paymentddtCls		: dhxPopupPaymentddtClsCombo.getSelectedValue()
  			};
  			
  			if(!gf_IsNull(salaryCd)) {
  				url = "mpsmng001/modifyMpsSalaryCd";
  			} else {
  				url = "mpsmng001/saveMpsSalaryCd";
  			}
  			
  			var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');  	
  			
  			if(dataSource.code === '000') {
  				$('.b-close').click();
  				fn_SearchGridList();
  				if(!gf_IsNull(salaryCd)) gf_DivMsgAlert('저장 되었습니다.'); 
  				else                     gf_DivMsgAlert('등록 되었습니다.');
  			} else {
  				var errMessage = dataSource.message;
  				if(errMessage.indexOf("ORA-00001") >= 0){
  					gf_DivMsgAlert('이미 등록된 급여항목코드입니다');
  					return;
  				}
  				else gf_DivMsgAlert('저장 되지 않았습니다.' + errMessage);
  			}
    	}
  		
  		$('div.error').unbind("click").bind("click",function() {			 
			$(this).remove();
		});
    });
};

var cf_SetBindingPopupRole = function (){
	fn_SearchPopupUser();
};

var cf_InitFormPopupRole = function (){};

var fn_SearchPopupUser = function (){
	
	if (!gf_IsNull(salaryCd)) {
		
		var jsonParameter = {
				salaryCd: salaryCd
		};
		var dataSource = gf_NoAsyncTransaction('mpsmng001/findMpsSalaryCd', jsonParameter, 'GET');
		
		var data = dataSource.data;

		//INPUT TEXT
		gf_FormSetValue("saveForm", "salaryCd",        data.salaryCd, "");
		gf_FormSetValue("saveForm", "salaryNm",        data.salaryNm, "");
		gf_FormSetValue("saveForm", "salaryDesc",      data.salaryDesc, "");
		gf_FormSetValue("saveForm", "useSdt",          data.useSdt, "");
		gf_FormSetValue("saveForm", "dspOdr",          data.dspOdr, "");
		gf_FormSetValue("saveForm", "accountNo",       data.accountNo, "");
	
		//INPUT CHECKBOX
		gf_FormSetValue("saveForm", "retireamtobjYn",  ((data.retireamtobjYn  == 'Y') ? true : false), "chkbox");
		gf_FormSetValue("saveForm", "basewageinclsYn", ((data.basewageinclsYn == 'Y') ? true : false), "chkbox");
		gf_FormSetValue("saveForm", "avewageinclsYn",  ((data.avewageinclsYn  == 'Y') ? true : false), "chkbox");
		gf_FormSetValue("saveForm", "ojtapplyYn",      ((data.ojtapplyYn      == 'Y') ? true : false), "chkbox");
		gf_FormSetValue("saveForm", "dhalfCalcYn",     ((data.dhalfCalcYn     == 'Y') ? true : false), "chkbox");
		gf_FormSetValue("saveForm", "useYn",           ((data.useYn           == 'Y') ? true : false), "chkbox");
		gf_FormSetValue("saveForm", "bugtMkYn",        ((data.bugtMkYn        == 'Y') ? true : false), "chkbox");
		
		dhxPopupPaymentddtClsCombo = gf_MakeDhxCombo(
				'popupPaymentddtClsComboBox', 
				'saveForm',
				150, 
				'combo/searchStmCode?codeclsCd=C064', 
				false, 
				'code', 
				'codeNm',
				'',
				data.paymentddtCls);
		
		$('#saveForm input[name="salaryCd"]').attr('disabled', 'disabled');
		$('#btnPopupUserSave').html('<span class="glyphicon glyphicon-pencil mr5"></span>수정');
		
	} else {
		dhxPopupPaymentddtClsCombo = gf_MakeDhxCombo(
				'popupPaymentddtClsComboBox', 
				'saveForm', 
				150, 
				'combo/searchStmCode?codeclsCd=C064', 
				false, 
				'code', 
				'codeNm',
				'',
				'');
				
		$('#btnPopupUserSave').html('<span class="glyphicon glyphicon-save mr5"></span>저장');
	}
};

$(function() {	
    cf_InitParamPopupRole();
    cf_SetComponentsPopupRole();
    cf_SetEventListenerPopupRole();
    cf_SetBindingPopupRole();
    cf_InitFormPopupRole();
});
</script>

<div class="pop-content">
	<div class="pop_wrap">
	 	<div class="tabl_box mt10">
		 	<div class="detail_type01">
				<form id="saveForm">
					<table>
			          <caption>급여항목 코드 등록/수정</caption>
			          <colgroup>
				          <col width="150">
				          <col width="">
				          <col width="150">
				          <col width="">
			          </colgroup>
			          <tr>
			            <th><span class="glyphicon glyphicon-asterisk mr5"></span>급여항목코드</th>
			            <td colspan="3"><input  type="text" name="salaryCd" id="salaryCd" ></td>
			          </tr>
			          <tr>
			            <th><span class="glyphicon glyphicon-asterisk mr5"></span>급여항목명</th>
			            <td colspan="3"><input class="w98p" type="text" name="salaryNm" id="salaryNm" ></td>
			          </tr>
			          <tr>
			            <th><span class="glyphicon glyphicon-asterisk mr5"></span>지급공제구분</th>
			            <td colspan="3"><!-- <input class="w98p" type="text" name="paymentddtCls" id="paymentddtCls" required> -->
			            <div id="popupPaymentddtClsComboBox"></div></td>
			          </tr>
			          <tr>
			            <th><span class="glyphicon glyphicon-asterisk mr5"></span>급여항목내역</th>
			            <td colspan="3"><input class="w98p" type="text" name="salaryDesc" id="salaryDesc" ></td>
			          </tr>
			          <tr>
			            <th><span class="glyphicon glyphicon-asterisk mr5"></span>사용시작일</th>
			            <td colspan="3"><input class="w98p" type="text" name="useSdt" id="useSdt"  ></td>
			          </tr>
			          <tr>
			            <th><span class="glyphicon glyphicon-asterisk mr5"></span>정렬순서</th>
			            <td colspan="3"><input class="w98p" type="text" name="dspOdr" id="dspOdr" ></td>
			          </tr>
			          <tr>
			            <th><span class="glyphicon glyphicon-asterisk mr5"></span>사용여부</th>
			            <td><input type="checkbox" name="useYn" id="useYn"></td>
			             <th><span class="glyphicon glyphicon-asterisk mr5"></span>일할계산여부</th>
			            <td><input type="checkbox" name="dhalfCalcYn" id="dhalfCalcYn" ></td>
			          </tr>
			          
			          <tr>
			            <th><span class="glyphicon glyphicon-asterisk mr5"></span>통상임금포함여부</th>
			            <td><input type="checkbox" name="basewageinclsYn" id="basewageinclsYn" ></td>
			             <th><span class="glyphicon glyphicon-asterisk mr5"></span>수습적용여부</th>
			            <td><input type="checkbox" name="ojtapplyYn" id="ojtapplyYn" ></td>
			          </tr>
			       
			          <tr>
			            <th><span class="glyphicon glyphicon-asterisk mr5"></span>퇴직금대상여부</th>
			            <td><input type="checkbox" name="retireamtobjYn" id="retireamtobjYn" ></td>
			              <th><span class="glyphicon glyphicon-asterisk mr5"></span>예산배정대상여부</th>
			            <td><input type="checkbox" name="bugtMkYn" id="bugtMkYn"></td>
			          </tr>
			          <tr>
			            <th><span class="glyphicon  mr5"></span>계좌번호</th>
			            <td colspan="3"><input class="w98p" type="text" name="accountNo" id="accountNo" ></td>
			          </tr>
			         
			        </table>
				</form>
			</div>
		</div>
		
		<div class="ac vb block mt15 w100p fl">
	   		<button id="btnPopupUserSave" name="btnPopupUserSave" class="btn_common"><span class="glyphicon glyphicon-save mr5"></span></button>
	    </div>
	    
	</div>
</div>
</body>
