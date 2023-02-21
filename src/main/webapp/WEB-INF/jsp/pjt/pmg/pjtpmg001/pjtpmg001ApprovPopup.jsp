<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	
	var projectNm = "";
	
	var cf_InitParamPjtCcpyPop = function (){
		
		var jsonParameter = {
	            projectSn : $("#approvPopup").attr("projectSn")
	        };

	        var dataSource = gf_NoAsyncTransaction('pjtpmg001/findPjtProject', jsonParameter, 'GET');
	        var data = dataSource.data;
	        
	        $("#projectNmPop").text(data.projectNm + " (" + data.bcncNm+") 계획승인요청"); 
	        projectNm = data.projectNm;
	    
	};
	var cf_SetComponentsPjtCcpyPop = function (){
		
		var projectSn = $("#approvPopup").attr("projectSn");

	};
	
	var cf_SetEventListenerPjtCcpyPop = function (){
	    
	    // button event ========--------  
	     $('#btnApprovPopupClose').unbind('click').bind('click', function(){
	    	 $('#approvPopup .b-close').click();
         });
	    
	     $('#btnFormSavePopup').unbind('click').bind('click', function(){
             fn_saveNewApprovPopup();
         });
	     
	    $('#saveFormPjtApprovPop #btnEmpSearch1').unbind('click').bind('click', function(event){
	         gf_EmpPopup("saveFormPjtApprovPop","newApprvEmpno1","apprvNm1", '1000', "N",'fn_empnoPopCollback');
	     });
	    $('#saveFormPjtApprovPop #btnEmpSearch2').unbind('click').bind('click', function(event){
            gf_EmpPopup("saveFormPjtApprovPop","newApprvEmpno2","apprvNm2", '1000', "N",'fn_empnoPopCollback2');
        });
	};
	
	var fn_empnoPopCollback = function(data){
		console.log(data);
		$("#apprvNm1").text(data.korNm);
		$("#apprvClsf1").text(data.rspofcCodeNm);
		$("#fromMail1").val(data.email);
		
	};
	
	var fn_empnoPopCollback2 = function(data){
        $("#apprvNm2").text(data.korNm);
        $("#apprvClsf2").text(data.rspofcCodeNm);
		$("#fromMail2").val(data.email);
        
    };
    
    var fn_saveNewApprovPopup = function(){
    	if(gf_IsNull(gf_FormGetValue('saveFormPjtApprovPop', 'newApprvEmpno1', 'text'))){
    		gf_DivMsgAlert("순번1을 등록해주세요.");
    	} else {
    		if(!gf_IsNull(gf_FormGetValue('saveFormPjtApprovPop', 'newApprvEmpno2', 'text'))){
    			var jsonParameter = {
                        projectSn : $("#approvPopup").attr("projectSn"),
                        newApprvEmpno1 : gf_FormGetValue('saveFormPjtApprovPop', 'newApprvEmpno1', 'text'),
                        newApprvEmpno2 : gf_FormGetValue('saveFormPjtApprovPop', 'newApprvEmpno2', 'text'),
                        fromMail : gf_FormGetValue('saveFormPjtApprovPop', 'fromMail1', 'text'),
                        projectNm :  projectNm,
                        apprvNm1 : $("#apprvNm1").text(),
                        comptAt : '4'
                };
    		} else {
    			var jsonParameter = {
                        projectSn : $("#approvPopup").attr("projectSn"),
                        newApprvEmpno1 : gf_FormGetValue('saveFormPjtApprovPop', 'newApprvEmpno1', 'text'),
                        newApprvEmpno2 : '',   
                        comptAt : '4',
                        fromMail : gf_FormGetValue('saveFormPjtApprovPop', 'fromMail1', 'text'),
                        projectNm :  projectNm,
                        apprvNm1 : $("#apprvNm1").text()
                };
    		}
 
             var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectNewApprov", jsonParameter, 'POST');
             if(dataSource.code === '000') {      
                 gf_DivMsgAlert("승인요청이 완료되었습니다.");
                 $('#approvPopup .b-close').click();
            } else {
                 gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
            }    
    	}
    	
    };

	var cf_SetBindingPjtCcpyPop = function (){
		
	};

	var cf_InitFormPjtCcpyPop = function (){
	    
	};
 
	$(function() {
	    cf_InitParamPjtCcpyPop();
	    cf_SetComponentsPjtCcpyPop();
	    cf_SetEventListenerPjtCcpyPop();
	    cf_SetBindingPjtCcpyPop();
	    cf_InitFormPjtCcpyPop();
	});

    </script>
    
    <div class="tabl_box">
        <div class="detail_type01">
            <form id="saveFormPjtApprovPop"> 
                <input type="hidden" name="projectSn" id="projectSn"/>                
                <h2 style="margin-left: 70px; margin-top: 30px;"><span id="projectNmPop"></span></h2>
                                              
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
                        <th style="text-align: center;"></th>    
                   </tr>
                   <tr style="height: 45px;">
                        <td style="text-align: center;">1</td> 
                        <td style="text-align: center;border-left:solid 1px #ddd;"><span id="apprvNm1"></span><input type="hidden" name="newApprvEmpno1" id="newApprvEmpno1"/></td>
                        <td style="text-align: center;border-left:solid 1px #ddd;"><span id="apprvClsf1"></span>
                        <input type="hidden" id="fromMail1" name="fromMail1"/>
                        <td style="text-align: center;border-left:solid 1px #ddd;"><button class="btn_common03" id="btnEmpSearch1" type="button">
                        <span class="glyphicon  glyphicon glyphicon-search"> </span>
                        </button></td>      
                   </tr>
                   <tr style="height: 45px;">
                        <td style="text-align: center;">2</td> 
                        <td style="text-align: center;border-left:solid 1px #ddd;"><span id="apprvNm2"></span><input type="hidden" name="newApprvEmpno2" id="newApprvEmpno2"/></td>
                        <td style="text-align: center;border-left:solid 1px #ddd;"><span id="apprvClsf2"></span>
                        <input type="hidden" id="fromMail2" name="fromMail2"/>
                        <td style="text-align: center;border-left:solid 1px #ddd;"><button class="btn_common03" id="btnEmpSearch2" type="button">
                        <span class="glyphicon  glyphicon glyphicon-search"> </span>
                        </button></td>      
                   </tr> 
                </table>
            
            <div class="popup_footer_box" style="margin-top: 50px;">
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
