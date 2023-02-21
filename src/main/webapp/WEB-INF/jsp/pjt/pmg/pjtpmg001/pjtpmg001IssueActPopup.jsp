<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	
	  var cf_InitParamPjtIssuePop = function (){
		  
		  var dhtmlXCalendar = new dhtmlXCalendarObject([{input:"actDe", button:"startDateIcon"}]);
	        dhtmlXCalendar.loadUserLanguage("ko");
	        dhtmlXCalendar.hideTime(); 
	};

	var cf_SetComponentsPjtIssuePop = function (){
		
		var projectSn = $("#issuePopup").attr("projectSn");
		var issueSn = $("#issuePopup").attr("issueSn");
		var actSn = $("#issuePopup").attr("actSn");

	};
	
	var cf_SetEventListenerPjtIssuePop = function (){
	    
	    // button event ========--------  
	     $('#btnFormSave').unbind('click').bind('click', function(){
	    	 fn_SavePjtIssue();
         });
	     
	     $('#btnAddPjtCcpy').unbind('click').bind('click', function(event){
	        fn_CcpyPopup();
	     });
	    
	     $('#btnFormRemove').unbind('click').bind('click', function(event){      
	         gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePjtCcpy()', '');
	     });
	     
	     $('#btnPopEmpSaveFormPjtIssueAct').unbind('click').bind('click', function(){
	    	 fn_PopEmpSaveFormPjtIssueAct();
         });

	};

	var cf_SetBindingPjtIssuePop = function (){
		
	};

	var cf_InitFormPjtIssuePop = function (){
	    $('#saveFormPjtIssuePop').resetForm();
	};
	
	var fn_SearchGridListPjtIssuePop = function() {
 
         var projectSn = $("#issuePopup").attr("projectSn");
         var issueSn = $("#issuePopup").attr("issueSn");
         var actSn = $("#issuePopup").attr("actSn");
         if(!gf_IsNull(actSn)){
         
             var jsonParameter = {
                     projectSn : projectSn,
                     issueSn : issueSn,
                     actSn : actSn
                 };
    
             gf_Transaction('list', 'pjtpmg001/findPjtIssueAct', jsonParameter, 'fn_CallbackSearchGridListPjtIssuePop', false, 'GET');
         }
 };
 
 var fn_CallbackSearchGridListPjtIssuePop = function(strSvcID, targetID, data) {
     
     var data = data.data;
     
      gf_FormSetValue('saveFormPjtIssuePop','projectSn',data.projectSn,'text');
      gf_FormSetValue('saveFormPjtIssuePop','actSn',data.actSn,'text');
      gf_FormSetValue('saveFormPjtIssuePop','issueSn',data.issueSn,'text');
      gf_FormSetValue('saveFormPjtIssuePop','actDe',data.actDe,'text');
      gf_FormSetValue('saveFormPjtIssuePop','actor',data.actor,'text');
      gf_FormSetValue('saveFormPjtIssuePop','actorNm',data.actorNm,'text');
      gf_FormSetValue('saveFormPjtIssuePop','actCn',data.actCn,'textarea');      
     
 };
	

	
	$(function() {
	    cf_InitParamPjtIssuePop();
	    cf_SetComponentsPjtIssuePop();
	    cf_SetEventListenerPjtIssuePop();
	    cf_SetBindingPjtIssuePop();
	    cf_InitFormPjtIssuePop();
	    
	    fn_SearchGridListPjtIssuePop();
	});
	
	
    var fn_SavePjtIssue = function(){
        if($('#saveFormPjtIssuePop').validate().form()){ 
        	var projectSn = $("#issuePopup").attr("projectSn");
        	var issueSn = $("#issuePopup").attr("issueSn");

            gf_FormSetValue('saveFormPjtIssuePop','projectSn', projectSn,'text');   
            gf_FormSetValue('saveFormPjtIssuePop','issueSn', issueSn,'text'); 
            
            gf_Transaction('save', 'pjtpmg001/savePjtIssueAct', $('#saveFormPjtIssuePop').serialize(), 'fn_CallbackSavePjtIssue', false, 'POST');
        }
    };

    var fn_CallbackSavePjtIssue = function (strSvcID, targetID, data){
        if(data.code === '000') {        
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            $('#issuePopup .b-close').click();
        } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
        }    
    };
    
    var fn_PopEmpSaveFormPjtIssueAct = function() {
        gf_EmpPopup('saveFormPjtIssuePop', 'actor', 'actorNm', '1000', 'N', 'fn_CallbackPopEmpSaveFormPjtIssueAct');
    };
    
    var fn_CallbackPopEmpSaveFormPjtIssueAct = function(data) {
        
    };
    
    var fn_RemovePjtCcpy = function(){      
    	var projectSn = $("#issuePopup").attr("projectSn");
        var issueSn = $("#issuePopup").attr("issueSn");
        var actSn = $("#issuePopup").attr("actSn");
        
        var jsonParameter = { issueSn : issueSn, actSn : actSn, projectSn : projectSn };
        gf_Transaction('', 'pjtpmg001/removePjtIssueAct', jsonParameter, 'fn_CallbackRemovePjtIssueAct', false, 'POST'); 
    };
    
    var fn_CallbackRemovePjtIssueAct = function(data) {
    	$('#issuePopup .b-close').click();
    };



    </script>
    
    <div class="tabl_box">
        <div class="detail_type01">
            <form id="saveFormPjtIssuePop"> 
                 <input type="hidden" name="projectSn" id="projectSn" value="${projectSn}" />
                 <input type="hidden" name="issueSn" id="issueSn"/>
                 <input type="hidden" name="actSn" id="actSn"/>
                 
                 <table>
                    <colgroup>
                        <col width="20%"/>
                        <col width="80%"/>
                    </colgroup>
                    <tr>
                        <th style="height:30px;">활동일시</th>
                        <td><input required type="text" name="actDe" id="actDe" class="input_calen" maxlength="10"></td>                                 
                    </tr>
                    <tr>
                        <th style="height:30px;">활동자</th>
                        <td><input type="hidden" name="actor" id="actor"/>
                            <input required readonly type="text" name="actorNm" id="actorNm" maxlength="15" style="width: 50%"/>
                            <button type="button" id="btnPopEmpSaveFormPjtIssueAct" class="btn_common01">
                                <span class="glyphicon glyphicon glyphicon-search"></span>
                            </button>
                       </td>                                 
                    </tr>
                    <tr>
                        <th>활동내용</th>
                        <td><textarea id="sactCnSaveFormPjtIssuePop" name="actCn" title="내용" maxlength="1000" style="width:95%;height:150px;"></textarea></td>                                 
                    </tr>
                </table>
                <div class="popup_footer_box" style="margin-top: 30px;">
                    <button type="button" id="btnFormSave" class="btn_common01">
                          <span class="glyphicon glyphicon-ok f15 mr5"></span>저장<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                    </button>
                    <button type="button" id="btnFormRemove" name="btnFormRemove">
                          <span class="glyphicon glyphicon-folder-close f15 mr5"></span>삭제
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
