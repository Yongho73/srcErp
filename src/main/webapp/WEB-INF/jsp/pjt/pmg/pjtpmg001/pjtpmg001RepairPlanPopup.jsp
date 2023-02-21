<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	
	var cf_InitParamPjtRepairPop = function (){
		var dhtmlXCalendar = new dhtmlXCalendarObject([{input:"cntrctDe", button:"startDateIcon"}]);
        dhtmlXCalendar.loadUserLanguage("ko");
        dhtmlXCalendar.hideTime(); 
        
         $('#saveFormPjtIssuePop .input_calen').unbind('keyup').bind('keyup', function(event){
                //숫자
                dateChk($(this));
         });
            
        //기간달력 이벤트 추가
         $('#saveFormPjtIssuePop #repairBeginDe').unbind('click').bind('click', function(event){
             dhxCCalendarDate3.show();
         });
         
         $('#saveFormPjtIssuePop #repairEndDe').unbind('click').bind('click', function(event){
             dhxCCalendarDate3.show();
         });
         
         dhxCCalendarDate3 = new dhtmlXDoubleCalendar("date3_cal");
            
         dhxCCalendarDate3.attachEvent("onClick", function(side, date){
             if(side == "right"){
                $('#repairBeginDe').val(dateFormat(dhxCCalendarDate3.leftCalendar.getDate()));
                $('#repairEndDe').val(dateFormat(dhxCCalendarDate3.rightCalendar.getDate()));
                dhxCCalendarDate3.hide();
             }
         });

         dhxCCalendarDate3.leftCalendar.loadUserLanguage("ko");
         dhxCCalendarDate3.rightCalendar.loadUserLanguage("ko");
         
         var repairSn = $("#repairPopup").attr("repairSn");
         if(!gf_IsNull(repairSn)) {
        	 fn_SearchGridListPjtRepairPop();
         }
	};

	var cf_SetComponentsPjtRepairPop = function (){
	};
	
	var cf_SetEventListenerPjtRepairPop = function (){
	    
	    // button event ========--------  
	     $('#btnFormSave').unbind('click').bind('click', function(){
	    	 fn_SavePjtRepair();
         });
	     
	     $('#btnAddPjtCcpy').unbind('click').bind('click', function(event){
	        fn_CcpyPopup();
	     });
	    
	     $('#btnFormRemove').unbind('click').bind('click', function(event){      
	         gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePjtRepair()', '');
	     });
	     
	     $('#btnPopEmpSaveFormPjtIssueAct').unbind('click').bind('click', function(){
	    	 fn_PopEmpSaveFormPjtIssueAct();
         });
	     
	     $('#btnBcncPop').unbind('click').bind('click', function(event){
             gf_CustomerPopup("saveFormPjtIssuePop","repairPsitn","repairPsitn", "05", "N", "");
         });
	     
	     $('#btnCcpyPupupClose').unbind('click').bind('click', function() {
             $('#repairPopup .b-close').click();
         });
	};

	var cf_SetBindingPjtRepairPop = function (){
		
	};

	var cf_InitFormPjtRepairPop = function (){
	    $('#saveFormPjtIssuePop').resetForm();
	};
	
	var fn_SearchGridListPjtRepairPop = function() {
 
         var projectSn = $("#repairPopup").attr("projectSn");
         var repairSn = $("#repairPopup").attr("repairSn");
          if(!gf_IsNull(projectSn)){
         
             var jsonParameter = {
            		 projectSnRepair : projectSn,
                     repairSn : repairSn,
                 };
    
             gf_Transaction('list', 'pjtpmg001/findPjtRepair', jsonParameter, 'fn_CallbackSearchGridListPjtRepairPop', false, 'GET');
         } 
 };
 
 var fn_CallbackSearchGridListPjtRepairPop = function(strSvcID, targetID, data) {
     
     var data = data.data;
     
      gf_FormSetValue('saveFormPjtIssuePop','projectSnRepair',data.projectSn,'text');
      gf_FormSetValue('saveFormPjtIssuePop','repairSn',data.repairSn,'text');
      gf_FormSetValue('saveFormPjtIssuePop','repairSe',data.repairSe,'text');
      gf_FormSetValue('saveFormPjtIssuePop','repairIem',data.repairIem,'text');
      gf_FormSetValue('saveFormPjtIssuePop','repairCn',data.repairCn,'textarea');
      gf_FormSetValue('saveFormPjtIssuePop','repairBeginDe',data.repairBeginDe,'text');
      gf_FormSetValue('saveFormPjtIssuePop','repairEndDe',data.repairEndDe,'text');  
      gf_FormSetValue('saveFormPjtIssuePop','repairPsitn',data.repairPsitn,'text');      
      gf_FormSetValue('saveFormPjtIssuePop','repairChargerNm',data.repairChargerNm,'text');  
      gf_FormSetValue('saveFormPjtIssuePop','repairChargerCttpc',data.repairChargerCttpc,'text');  
     
      if (!gf_IsNull(data.repairSn)){
          $('#btnCcpyPupupClose').hide();
          $('#btnFormRemove').show();
      }
 };
 
 var fn_SavePjtRepair = function(){
     var projectSnRepair = $("#repairPopup").attr("projectSn");
     var repairSn = $("#repairPopup").attr("repairSn");
     if (gf_IsNull(repairSn) && repairSn == '') {
         gf_FormSetValue('saveFormPjtIssuePop','repairSn', '','text');
     } else{
         gf_FormSetValue('saveFormPjtIssuePop','repairSn', repairSn,'text');
     }

     gf_FormSetValue('saveFormPjtIssuePop','projectSnRepair', projectSnRepair,'text');  
     
     gf_Transaction('save', 'pjtpmg001/savePjtRepair', $('#saveFormPjtIssuePop').serialize(), 'fn_CallbackSavePjtRepair', false, 'POST');
};

var fn_CallbackSavePjtRepair = function (strSvcID, targetID, data){
    if(data.code === '000') {        
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        $('#repairPopup .b-close').click();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }    
};

var fn_RemovePjtRepair = function(){      
    var projectSn = $("#repairPopup").attr("projectSn");
    var repairSn = $("#repairPopup").attr("repairSn");
    var jsonParameter = { projectSn : projectSn, repairSn : repairSn };
    gf_Transaction(jsonParameter, 'pjtpmg001/removePjtRepair', jsonParameter, 'fn_CallbackRemovePjtRepair', false, 'POST'); 
};

var fn_CallbackRemovePjtRepair = function (strSvcID, targetID, data){                                                         
    if(data.code === '000') {
        $('#repairPopup .b-close').click();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }    
};
	
	$(function() {
	    cf_InitParamPjtRepairPop();
	    cf_SetComponentsPjtRepairPop();
	    cf_SetEventListenerPjtRepairPop();
	    cf_SetBindingPjtRepairPop();
	    cf_InitFormPjtRepairPop();  	    
	});
	
	/**********************************************************거래처팝업**************************************************************/
    var $customerInfo = {};  //거래처 선택용 변수
    var gf_CustomerPopup = function (formId, codeId, codeNmId, bcncSe, searchFlag, strCallbackFunc) {

        var userId = ""; 
        var title  = "거래처 조회";
        var customerInfo = "customerInfo";
        var callbacks = $.Callbacks();
        var callFunction = null;
        
        if ( !gf_IsNull(strCallbackFunc) ) {
            if(typeof(strCallbackFunc) == "string"){
                callFunction = eval(strCallbackFunc);
                if ( typeof callFunction != "function" ) {
                    gf_DivMsgAlert("call back function "+ strCallbackFunc +" 이 구현되지 않습니다.!!");
                    return false;
                }
            }else{
                callFunction = strCallbackFunc;
            }
        }   

        if(typeof formId == "undefined" || formId == null){
            formId = "";
        }
        if(typeof codeId == "undefined" || codeId == null){
            codeId = "";
        }
        if(typeof codeNmId == "undefined" || codeNmId == null){
            codeNmId = "";
        }
        if(typeof bcncSe == "undefined" || bcncSe == null){
            bcncSe = "";
        }
        if(typeof searchFlag == "undefined" || searchFlag == null){
            searchFlag = "";
        }
        
        //저장팝업\
        $customerInfo = {};
        var contractCompanyDhxWindows;
        var dhxWindowObj;
        if($('body').find("div[id='contractCompanyPopup']").size() <= 0) {
            $('body').append("<div id='contractCompanyPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' bcncSe='" + bcncSe + "' customerInfo='" + customerInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
        }
        $('#contractCompanyPopup').bPopup({
            onOpen:function(){
                
                contractCompanyDhxWindows = new dhtmlXWindows();
                
                var id      = 'contractCompanyPopup';
                var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/searchPjtCustomer/view';
                var left    = 0;
                var top     = 0;
                var width   = 800;
                var height  = 750;

                dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
                contractCompanyDhxWindows.window(id).centerOnScreen();
                dhxWindowObj.setText(title);
                dhxWindowObj.attachURL(ajaxUrl, true, true);
                //dhxWindowObj.attachObject('btnSearch', true);
                dhxWindowObj.detachObject(true);
                dhxWindowObj.attachEvent("onClose", function(win){
                    $('#contractCompanyPopup .b-close').click();
                });
            },
            onClose:function(){
                
                // call callback function
                if ( !gf_IsNull(callFunction) ) {
                    callbacks.empty();
                    callbacks.add(callFunction);
                    callbacks.fire($customerInfo);
                }
                
                contractCompanyDhxWindows.unload();
                $('body').find("div[id='contractCompanyPopup']").remove();
            }
        },function(){});
        return dhxWindowObj;
    };
    
    /**********************************************************달력**************************************************************/
    function dateFormat(date){
          var dd = date.getDate();
          var mm = date.getMonth()+1; //January is 0!
          var yyyy = date.getFullYear();

          if(dd<10) {
              dd='0'+dd
          } 

          if(mm<10) {
              mm='0'+mm
          } 

          var nDate = yyyy+'-'+mm+'-'+dd;
          return(nDate);
    };

    </script>
    <div class="tabl_box">
        <div class="detail_type01">
            <form id="saveFormPjtIssuePop"> 
                 
                 <input type="hidden" name="projectSnRepair" id="projectSnRepair"/>
                 <input type="hidden" name="repairSn" id="repairSn"/>
                 
                 <table>
                    <colgroup>
                        <col width="20%"/>
                        <col width="80%"/>
                    </colgroup>
                    <tr>
                        <th class="essential_icon" style="height:30px;">구분</th>
                        <td><input type="text" name="repairSe" id="repairSe" maxlength="100" style="width: 95%" required/></td>                                 
                    </tr>
                    <tr>
                        <th style="height:30px;">항목</th>
                        <td>
                            <input type="text" name="repairIem" id="repairIem" maxlength="100" style="width: 95%"/>
                       </td>                                 
                    </tr>
                    <tr>
                        <th class="essential_icon">하자보수기간</th>
                        <td>
                            <input type="text" name="repairBeginDe" id="repairBeginDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" required />
                            ~ &nbsp;
                            <input type="text" name="repairEndDe" id="repairEndDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" required/>
                            <div id="date3_cal" style="position:absolute;z-index:999; top:25px; overflow:visible"></div>
                        </td>                                 
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td><textarea id="repairCn" name="repairCn" title="내용" maxlength="1000" style="width:95%;height:80px;"></textarea></td>                                 
                    </tr>
                    <tr>
                        <th class="essential_icon">소속</th>
                        <td>
                            <input type="text" name="repairPsitn" id="repairPsitn" style="width: 90%" required/>
                            <button type="button" id="btnBcncPop" class="btn_common01">
                                <span class="glyphicon glyphicon glyphicon-search"></span>
                            </button>
                        </td>                                 
                    </tr>
                    <tr>
                        <th>담당자</th>
                        <td><input type="text" name="repairChargerNm" id="repairChargerNm" maxlength="15" style="width: 50%"/></td>                                 
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td><input type="text" name="repairChargerCttpc" id="repairChargerCttpc" maxlength="15" style="width: 50%"/></td>                                 
                    </tr>
                </table>
                <div class="popup_footer_box" style="margin-top: 30px;">
                    <button type="button" id="btnFormSave" class="btn_common01">
                          <span class="glyphicon glyphicon-ok f15 mr5"></span>저장<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                    </button>
                    <button type="button" id="btnCcpyPupupClose" name="btnCompPupupClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
                    <button type="button" id="btnFormRemove" name="btnFormRemove" style="display: none;">
                          <span class="glyphicon glyphicon-folder-close f15 mr5"></span>삭제
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
