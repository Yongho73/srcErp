<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	
	var comptAt = '';
	var projectNm = "";
	
	var cf_InitParamPjtApprovalPop = function (){
		
		var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
	    var gBplcCode =userInfo.data.bplcCode;      
	    var userEmpNo =userInfo.data.userEmpNo;
		
		var jsonParameter = {
	            projectSn : $("#approvalPopup").attr("projectSn")
	        };

        var dataSource = gf_NoAsyncTransaction('pjtpmg001/findPjtProject', jsonParameter, 'GET');
        var data = dataSource.data;
        
        comptAt = data.comptAt;
        
        var jsonParameters = {
                projectSn : $("#approvalPopup").attr("projectSn")
        };

        var dataSources = gf_NoAsyncTransaction('pjtpmg001/findNewApprov', jsonParameters, 'GET');
        var datas = dataSources.data;
        
        var newApprvEmpno1 = datas.newApprvEmpno1;
        var newApprvDe1 = datas.newApprvDe1;
        var newApprvEmpno2 = datas.newApprvEmpno2;
        var newApprvDe2 = datas.newApprvDe2;
        var endApprvEmpno1 = datas.endApprvEmpno1;
        var endApprvDe1 = datas.endApprvDe1;
        var endApprvEmpno2 = datas.endApprvEmpno2;
        var endApprvDe2 = datas.endApprvDe2;
        
        projectNm = data.projectNm;
        
        if(data.comptAt == 4){
        	$("#projectNmPop").text(data.projectNm + " (" + data.bcncNm+")"); 
        	$("#approvSe").text("계획승인"); 

        	if(!gf_IsNull(newApprvEmpno1) && gf_IsNull(newApprvDe1)){
                if(userEmpNo == newApprvEmpno1){
                    $('#apprvAt2').attr("disabled", true);
                } else{
                    $('#apprvAt1').attr("disabled", true);
                    $('#apprvAt2').attr("disabled", true);
                    $('#btnFormSavePopup').hide();
                }
            } else if(!gf_IsNull(newApprvDe1) && gf_IsNull(newApprvDe2)){
                if(userEmpNo == newApprvEmpno2){
                    if($("#apprvAt1").val() == "on"){
                        $('#apprvAt1').attr("disabled", true);
                    } else {
                        $('#apprvAt1').attr("disabled", true);
                        $('#apprvAt2').attr("disabled", true);
                        $('#btnFormSavePopup').hide();
                    }
                } else {
                    $('#apprvAt1').attr("disabled", true);
                    $('#apprvAt2').attr("disabled", true);
                    $('#btnFormSavePopup').hide();
                }
            } else {
                $('#apprvAt1').attr("disabled", true);
                $('#apprvAt2').attr("disabled", true);
                $('#btnFormSavePopup').hide();
            }
        } else if(data.comptAt == 6) {
        	$("#projectNmPop").text(data.projectNm + " (" + data.bcncNm+")"); 
            $("#approvSe").text("완료승인"); 
        	
        	if(!gf_IsNull(endApprvEmpno1) && gf_IsNull(endApprvDe1)){
                if(userEmpNo == endApprvEmpno1){
                	$('#apprvAt2').attr("disabled", true);
                } else{
                	$('#apprvAt1').attr("disabled", true);
                	$('#apprvAt2').attr("disabled", true);
                	$('#btnFormSavePopup').hide();
                }
            } else if(!gf_IsNull(endApprvDe1) && gf_IsNull(endApprvDe2)){
                if(userEmpNo == endApprvEmpno2){
                    if($("#apprvAt1").val() == "on"){
                    	$('#apprvAt1').attr("disabled", true);
                    } else {
                    	$('#apprvAt1').attr("disabled", true);
                        $('#apprvAt2').attr("disabled", true);
                        $('#btnFormSavePopup').hide();
                    }
                } else {
                	$('#apprvAt1').attr("disabled", true);
                    $('#apprvAt2').attr("disabled", true);
                    $('#btnFormSavePopup').hide();
                }
            } else {
            	$('#apprvAt1').attr("disabled", true);
                $('#apprvAt2').attr("disabled", true);
                $('#btnFormSavePopup').hide();
            }    
        }  
	};
	var cf_SetComponentsPjtApprovalPop = function (){
		
		var projectSn = $("#approvPopup").attr("projectSn");

	};
	
	var cf_SetEventListenerPjtApprovalPop = function (){
	    // button event ========--------  
	     $('#btnApprovPopupClose').unbind('click').bind('click', function(){
	    	 $('#approvalPopup .b-close').click(); 
         });
	    
	    $('#btnFormSavePopup').unbind('click').bind('click', function(){
             fn_saveNewApprovPopup();
         });
	    
	};

	var cf_SetBindingPjtApprovalPop = function (){
		
	};

	var cf_InitFormPjtApprovalPop = function (){
	    
	};
	
	var fn_SearchGridListPjtApprovalPop = function() {
		 
        var projectSn = $("#approvalPopup").attr("projectSn");
         if(!gf_IsNull(projectSn)){
        
            var jsonParameter = {
                    projectSn : projectSn,
                };
   
            gf_Transaction('list', 'pjtpmg001/findNewApprov', jsonParameter, 'fn_CallbackSearchGridListPjtApprovalPop', false, 'GET');
        } 
    };
    
    var fn_CallbackSearchGridListPjtApprovalPop = function(strSvcID, targetID, data) {
        
        var data = data.data;
        
        if(comptAt == 4){
        	$("#apprvNm1").text(data.newApprvNm1);
        	$("#apprvNm2").text(data.newApprvNm2);
        	$("#apprvClsf1").text(data.newApprvRspofc1);
        	$("#apprvClsf2").text(data.newApprvRspofc2);
        	$("#fromMail1").val(data.newApprvMail1);
        	$("#fromMail2").val(data.newApprvMail2);
        	gf_FormSetValue('saveFormPjtApprovalPop','apprvAt1', (( data.newApprvAt1  == '1') ? true : false), 'chkbox');
        	gf_FormSetValue('saveFormPjtApprovalPop','apprvAt2', (( data.newApprvAt2  == '1') ? true : false), 'chkbox');
        	
        } else if(comptAt == 6){
        	console.log(data);
        	$("#apprvNm1").text(data.endApprvNm1);
        	$("#apprvNm2").text(data.endApprvNm2);
        	$("#apprvClsf1").text(data.endApprvRspofc1);
            $("#apprvClsf2").text(data.endApprvRspofc2);
            $("#fromMail1").val(data.endApprvMail1);
        	$("#fromMail2").val(data.endApprvMail2);
            gf_FormSetValue('saveFormPjtApprovalPop','apprvAt1', (( data.endApprvAt1  == '1') ? true : false), 'chkbox');
            gf_FormSetValue('saveFormPjtApprovalPop','apprvAt2', (( data.endApprvAt2  == '1') ? true : false), 'chkbox');
        }
    };
    
    var fn_saveNewApprovPopup = function(){
    	var jsonParameters = {
                projectSn : $("#approvalPopup").attr("projectSn")
        };

        var dataSources = gf_NoAsyncTransaction('pjtpmg001/findNewApprov', jsonParameters, 'GET');
        var datas = dataSources.data;
        
        var newApprvEmpno1 = datas.newApprvEmpno1;
        var newApprvDe1 = datas.newApprvDe1;
        var newApprvEmpno2 = datas.newApprvEmpno2;
        var newApprvDe2 = datas.newApprvDe2;
        var endApprvEmpno1 = datas.endApprvEmpno1;
        var endApprvDe1 = datas.endApprvDe1;
        var endApprvEmpno2 = datas.endApprvEmpno2;
        var endApprvDe2 = datas.endApprvDe2;
        
        
        
    	if(comptAt == 4){
    		if(!gf_IsNull(newApprvEmpno1) && gf_IsNull(newApprvDe1)&& !gf_IsNull(newApprvEmpno2)){
                // 1번 업데이트
                gf_DivMsgConfirm("계획승인 하시겠습니까?", 'fn_newApprovDe1Save()', '');
            } else if(!gf_IsNull(newApprvEmpno1) && gf_IsNull(newApprvDe1) && gf_IsNull(newApprvEmpno2)){
                // 1번 업데이트 및 진행상태 변경
                gf_DivMsgConfirm("계획승인 하시겠습니까?", 'fn_newApprovDe1SaveAt()', '');
            } else if(!gf_IsNull(newApprvDe1) && gf_IsNull(newApprvDe2)){
                // 2번 업데이트 및 진행상태 변경
                gf_DivMsgConfirm("계획승인 하시겠습니까?", 'fn_newApprovDe2Save()', '');
            }
        } else if(comptAt == 6) {    
        	if(!gf_IsNull(endApprvEmpno1) && gf_IsNull(endApprvDe1)&& !gf_IsNull(endApprvEmpno2)){
                // 1번 업데이트
                gf_DivMsgConfirm("완료승인 하시겠습니까?", 'fn_endApprovDe1Save()', '');
            } else if(!gf_IsNull(endApprvEmpno1) && gf_IsNull(endApprvDe1) && gf_IsNull(endApprvEmpno2)){
                // 1번 업데이트 및 진행상태 변경
                gf_DivMsgConfirm("완료승인 하시겠습니까?", 'fn_endApprovDe1SaveAt()', '');
            } else if(!gf_IsNull(endApprvDe1) && gf_IsNull(endApprvDe2)){
                // 2번 업데이트 및 진행상태 변경
                gf_DivMsgConfirm("완료승인 하시겠습니까?", 'fn_endApprovDe2Save()', '');
            }
        }  
    };
    
    var fn_newApprovDe1Save = function(){
        var jsonParameter = {
                projectSn : $("#approvalPopup").attr("projectSn"),
                newApprvDe1 : "1",
                newApprvAt1 : "1",
                comptAt : "4",
                projectNm : projectNm,
                fromMail : $("#fromMail2").val(),
                apprvNm2 : $("#apprvNm2").text() 
        };

        var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectNewApprovDe", jsonParameter, 'POST');
        if(dataSource.code === '000') {
            $('#approvalPopup .b-close').click(); 
       } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
       }   
    };

    var fn_newApprovDe1SaveAt = function(){
        var jsonParameter = {
                projectSn : $("#approvalPopup").attr("projectSn"),
                newApprvDe1 : "1",
                newApprvAt1 : "1",
                comptAt : "0"
        };

        var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectNewApprovDe", jsonParameter, 'POST');
        if(dataSource.code === '000') {
            $('#approvalPopup .b-close').click(); 
       } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
       }   
    };

    var fn_newApprovDe2Save = function(){
        var jsonParameter = {
                projectSn : $("#approvalPopup").attr("projectSn"),
                newApprvDe2 : "2",
                newApprvAt2 : "1",
                comptAt : "0"
        };

        var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectNewApprovDe", jsonParameter, 'POST');
        if(dataSource.code === '000') {
            $('#approvalPopup .b-close').click(); 
       } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
       }   
    };
    
    var fn_endApprovDe1Save = function(){
        var jsonParameter = {
                projectSn : $("#approvalPopup").attr("projectSn"),
                endApprvDe1 : "1",
                endApprvAt1 : "1",
                comptAt : "6",
               	projectNm : projectNm,
                fromMail : $("#fromMail2").val(),
                apprvNm2 : $("#apprvNm2").text() 
        };

        var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectEndApprovDe", jsonParameter, 'POST');
        if(dataSource.code === '000') {
            $('#approvalPopup .b-close').click(); 
       } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
       }   
    };

    var fn_endApprovDe1SaveAt = function(){
        var jsonParameter = {
                projectSn : $("#approvalPopup").attr("projectSn"),
                endApprvDe1 : "1",
                endApprvAt1 : "1",
                comptAt : "1"
        };

        var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectEndApprovDe", jsonParameter, 'POST');
        if(dataSource.code === '000') {
            $('#approvalPopup .b-close').click(); 
       } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
       }   
    };

    var fn_endApprovDe2Save = function(){
        var jsonParameter = {
                projectSn : $("#approvalPopup").attr("projectSn"),
                endApprvDe2 : "2",
                endApprvAt2 : "1",
                comptAt : "1"
        };

        var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectEndApprovDe", jsonParameter, 'POST');
        if(dataSource.code === '000') {
            $('#approvalPopup .b-close').click(); 
       } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
       }   
    };
    
    

	$(function() {
	    cf_InitParamPjtApprovalPop();
	    cf_SetComponentsPjtApprovalPop();
	    cf_SetEventListenerPjtApprovalPop();
	    cf_SetBindingPjtApprovalPop();
	    cf_InitFormPjtApprovalPop();
	    
	    fn_SearchGridListPjtApprovalPop();
	});

    </script>
    
    <div class="tabl_box">
        <div class="detail_type01">
            <form id="saveFormPjtApprovalPop"> 
                <input type="hidden" name="projectSn" id="projectSn"/>
                
                <h2 style="margin-left: 70px; margin-top: 30px;"><span id="projectNmPop" style="font-size:13px;"></span><br/><span id="approvSe" style="text-align: center;font-size:15px;color:#1e5ca0;"></span></h2>
                                              
                <table style="width:80%; margin-left: 70px; margin-top:20px;">
                    <colgroup>
                        <col width="50">
                        <col width="120">
                        <col width="100">
                        <col width="50">
                    </colgroup>
                    <tr style="height: 40px;">
                        <th style="text-align: center;">순번</th>
                        <th style="text-align: center;">성명</th>
                        <th style="text-align: center;">직책</th>
                        <th style="text-align: center;">승인</th>    
                   </tr>
                   <tr style="height: 45px;">
                        <td style="text-align: center;">1</td> 
                        <td style="text-align: center; border-left:solid 1px #ddd;"><span id="apprvNm1"></span></td>
                        <td style="text-align: center; border-left:solid 1px #ddd;"><span id="apprvClsf1"></span><input type="hidden" id="fromMail1" name="fromMail1"/></td> 
                        <td style="text-align: center; border-left:solid 1px #ddd;">
	                        <div class="checkbox" style="left: 30px;">
							    <label>
							      <input type="checkbox"  id="apprvAt1" name="apprvAt1" />
							      <i class="input-helper"></i>
							    </label>
							</div>
						</td>  
                   </tr>
                   <tr style="height: 45px;">
                        <td style="text-align: center;">2</td> 
                        <td style="text-align: center; border-left:solid 1px #ddd;"><span id="apprvNm2"></span></td>
                        <td style="text-align: center; border-left:solid 1px #ddd;"><span id="apprvClsf2"></span></td> 
                        <input type="hidden" id="fromMail2" name="fromMail2"/>
                        <td style="text-align: center; border-left:solid 1px #ddd;">
                        	 <div class="checkbox" style="left: 30px;">
							    <label>
							      <input type="checkbox"  id="apprvAt2" name="apprvAt2" />
							      <i class="input-helper"></i>
							    </label>
							</div>
                        </td>         
                   </tr> 
                </table>
            
            <div class="popup_footer_box" style="margin-top: 30px;">
                <button type="button" id="btnFormSavePopup" class="btn_common01">
                      <span class="glyphicon glyphicon-ok f15 mr5"></span>저장
                </button>
                <button type="button" id="btnApprovPopupClose" name="btnApprovPopupClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
            </div>
            </form>
		</div>
	</div>
</body>
