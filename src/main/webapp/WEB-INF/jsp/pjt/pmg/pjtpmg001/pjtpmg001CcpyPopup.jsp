<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	
	  var cf_InitParamPjtCcpyPop = function (){
	    var dhtmlXCalendar = new dhtmlXCalendarObject([{input:"cntrctDe", button:"startDateIcon"}]);
	    dhtmlXCalendar.loadUserLanguage("ko");
	    dhtmlXCalendar.hideTime(); 
	    
	     $('#saveFormPjtCcpyPop .input_calen').unbind('keyup').bind('keyup', function(event){
	            //숫자
	            dateChk($(this));
	     });
	     
	     $("#cntrctAmt").number(true);
	        
	    //기간달력 이벤트 추가
	     $('#saveFormPjtCcpyPop #cntrctBeginDe').unbind('click').bind('click', function(event){
	         dhxCCalendarDate3.show();
	     });
	     
	     $('#saveFormPjtCcpyPop #cntrctEndDe').unbind('click').bind('click', function(event){
	         dhxCCalendarDate3.show();
	     });
	     
	     dhxCCalendarDate3 = new dhtmlXDoubleCalendar("date3_cal");
	        
	     dhxCCalendarDate3.attachEvent("onClick", function(side, date){
	         if(side == "right"){
	            $('#cntrctBeginDe').val(dateFormat(dhxCCalendarDate3.leftCalendar.getDate()));
	            $('#cntrctEndDe').val(dateFormat(dhxCCalendarDate3.rightCalendar.getDate()));
	            dhxCCalendarDate3.hide();
	         }
	     });

	     dhxCCalendarDate3.leftCalendar.loadUserLanguage("ko");
	     dhxCCalendarDate3.rightCalendar.loadUserLanguage("ko");
	     
	    
	};
	
	$(document).click(function(e){ //문서 body를 클릭했을때
	    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
	    if(e.target.id =="date3_cal" || e.target.id =="cntrctBeginDe" || e.target.id =="cntrctEndDe") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
	    dhxCCalendarDate3.hide();  //그리드 달력 컴포넌트 객체 숨기기.
	});

	var cf_SetComponentsPjtCcpyPop = function (){
		
		var projectSn = $("#ccpyPopup").attr("projectSn");
		var ccpySn = $("#ccpyPopup").attr("ccpySn");

	};
	
	var cf_SetEventListenerPjtCcpyPop = function (){
	    
	    // button event ========--------  
	     $('#btnFormSave').unbind('click').bind('click', function(){
	    	 fn_SavePjtCcpy();
         });
	     
	     $('#btnAddPjtCcpy').unbind('click').bind('click', function(event){
	        fn_CcpyPopup();
	     });
	    
	     $('#btnRemovePjtCcpy').unbind('click').bind('click', function(event){      
	         gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePjtCcpy()', '');
	     });
	     
	     $('#vatInclsAtOrg').unbind("click").bind("click",function() {
	            if($(this).prop('checked')) $('#vatInclsAt').val('1');
	            else $('#vatInclsAt').val('0');
	     });
	     
	     $('#saveFormPjtCcpyPop #btnBcncPop').unbind('click').bind('click', function(event){
	    	 gf_CustomerPopup("saveFormPjtCcpyPop","bcncCode","bcncNm", "05", "N", "fn_CallbackCompPop");
	     });
	     
	     $('#btnCcpyPupupClose').unbind('click').bind('click', function() {
	         $('#ccpyPopup .b-close').click();
	     });
	     
	     $('#btnFormRemove').unbind('click').bind('click', function() {
	    	 gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePjtCcpy()', '');
         });
	};
	
	var fn_CallbackCompPop = function(data) {
		if(!gf_IsNull(data.chargerNm)){
			 gf_FormSetValue('saveFormPjtCcpyPop', 'chargerNm', data.chargerNm, 'text');
	         gf_FormSetValue('saveFormPjtCcpyPop', 'chargerOfcps', data.chargerOfcps, 'text');
	         gf_FormSetValue('saveFormPjtCcpyPop', 'chargerTelno', data.chargerTelno, 'text');
	         gf_FormSetValue('saveFormPjtCcpyPop', 'chargerEmail', data.chargerEmail, 'text');
		}
	};

	var cf_SetBindingPjtCcpyPop = function (){
		
	};

	var cf_InitFormPjtCcpyPop = function (){
	    $('#saveFormPjtCcpyPop').resetForm();
	};
	
	var fn_SearchGridListPjtCcpyPop = function() {
 
         var projectSn = $("#ccpyPopup").attr("projectSn");
         var ccpySn = $("#ccpyPopup").attr("ccpySn");
         
         var jsonParameter = {
                 projectSn : projectSn,
                 ccpySn : ccpySn
             };

         gf_Transaction('list', 'pjtpmg001/findPjtCcpy', jsonParameter, 'fn_CallbackSearchGridListPjtCcpyPop', false, 'GET');
 };
 
 var fn_CallbackSearchGridListPjtCcpyPop = function(strSvcID, targetID, data) {
     
     var data = data.data;
     
      gf_FormSetValue('saveFormPjtCcpyPop','cntrctDe',data.cntrctDe,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','projectSn',data.projectSn,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','ccpySn',data.ccpySn,'text');      
      gf_FormSetValue('saveFormPjtCcpyPop','bcncCode',data.bcncCode,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','bcncNm',data.bcncNm,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','chargerNm',data.chargerNm,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','chargerOfcps',data.chargerOfcps,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','chargerMbtlnum',data.chargerMbtlnum,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','chargerTelno',data.chargerTelno,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','chargerEmail',data.chargerEmail,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','cntrctAmt',data.cntrctAmt,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','cntrctCn',data.cntrctCn,'textarea');
      gf_FormSetValue('saveFormPjtCcpyPop','cntrctBeginDe',data.cntrctBeginDe,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','cntrctEndDe',data.cntrctEndDe,'text');
      gf_FormSetValue('saveFormPjtCcpyPop','vatInclsAt', data.vatInclsAt, 'text');
      gf_FormSetValue('saveFormPjtCcpyPop','vatInclsAtOrg', (( data.vatInclsAt  == '1') ? true : false), 'chkbox');
      
      if (!gf_IsNull(data.ccpySn)){
    	  $('#btnCcpyPupupClose').hide();
          $('#btnFormRemove').show();
      }
      
     
 };

	$(function() {
	    cf_InitParamPjtCcpyPop();
	    cf_SetComponentsPjtCcpyPop();
	    cf_SetEventListenerPjtCcpyPop();
	    cf_SetBindingPjtCcpyPop();
	    cf_InitFormPjtCcpyPop();
	    
	    fn_SearchGridListPjtCcpyPop();
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
    
    var fn_SavePjtCcpy = function(){
        	var projectSn = $("#ccpyPopup").attr("projectSn");
        	var ccpySn = $("#ccpyPopup").attr("ccpySn");
        	if (gf_IsNull(ccpySn)) {
        		gf_FormSetValue('saveFormPjtCcpyPop','ccpySn', '','text');
        	} else{
        		gf_FormSetValue('saveFormPjtCcpyPop','ccpySn', ccpySn,'text');
        	}

            gf_FormSetValue('saveFormPjtCcpyPop','projectSn', projectSn,'text');  
            
            gf_Transaction('save', 'pjtpmg001/savePjtCcpy', $('#saveFormPjtCcpyPop').serialize(), 'fn_CallbackSavePjtCcpy', false, 'POST');
    };

    var fn_CallbackSavePjtCcpy = function (strSvcID, targetID, data){
        if(data.code === '000') {        
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            $('#ccpyPopup .b-close').click();
        } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
        }    
    };
    
    var fn_RemovePjtCcpy = function(){      
    	var projectSn = $("#ccpyPopup").attr("projectSn");
        var ccpySn = $("#ccpyPopup").attr("ccpySn");
        var jsonParameter = { projectSn : projectSn, ccpySn : ccpySn };
        gf_Transaction(jsonParameter, 'pjtpmg001/removePjtCcpy', jsonParameter, 'fn_CallbackRemovePjtCcpy', false, 'POST'); 
    };

    var fn_CallbackRemovePjtCcpy = function (strSvcID, targetID, data){                                                         
        if(data.code === '000') {
        	$('#ccpyPopup .b-close').click();
        } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
        }    
    };



    </script>
    
    <div class="tabl_box">
        <div class="detail_type01">
            <form id="saveFormPjtCcpyPop"> 
                <input type="hidden" name="projectSn" id="projectSn"/>
                <input type="hidden" name="ccpySn" id="ccpySn"/>
                                              
                <table style="overflow:auto;">
                    <colgroup>
                        <col width="100">
                        <col width="200">
                        <col width="100">
                        <col width="200">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">계약사명</th>
                        <td>
                            <input type="hidden" name="bcncCode" id="bcncCode"/>
                            <input readonly type="text" name="bcncNm" id="bcncNm" style="width: 80%" required/>
                            <button type="button" id="btnBcncPop" class="btn_common01">
                                <span class="glyphicon glyphicon glyphicon-search"></span>
                            </button>
                        </td>
                        <th class="essential_icon">계약일자</th>
                        <td><input type="text" name="cntrctDe" id="cntrctDe" class="input_calen" maxlength="10" required>
                        </td>
                   </tr>
                   <tr>
                        <th>계약기간</th>
                        <td colspan="3">
                            <input type="text" name="cntrctBeginDe" id="cntrctBeginDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
                            ~ &nbsp;
                            <input type="text" name="cntrctEndDe" id="cntrctEndDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
                            <div id="date3_cal" style="position:absolute;z-index:999; top:25px; overflow:visible"></div>
                         </td>     
                   </tr>
                   <tr>
                        <th class="essential_icon">계약금액</th>
                        <td colspan="3"><input maxlength="15" required type="text" name="cntrctAmt" id="cntrctAmt" style="width: 40%;"/>
                            <input type="hidden" name="vatInclsAt" id="vatInclsAt"/>  
                            <div class="checkbox">
                                <label> 
                                    <input type="checkbox" name="vatInclsAtOrg" id="vatInclsAtOrg">
                                    <i class="input-helper"></i>
                                    <span>부가세포함여부 </span>
                                </label>

                            </div>                                 
                        </td> 
                   </tr>
                    <tr>
                        <th>담당자명</th>
                        <td><input type="text" name="chargerNm" id="chargerNm" style="width: 60%"></input></td>    
                        <th>직위</th>
                        <td><input type="text" name="chargerOfcps" id="chargerOfcps" style="width: 60%"/></td>  
                    </tr>
                    <tr>           
                        <th>연락처</th>
                        <td colspan="3"><input type="text" name="chargerTelno" id="chargerTelno" style="width: 30%"/></td> 
                   </tr>
                    <tr>
                    <th>이메일</th>
                        <td colspan="3"><input type="text" name="chargerEmail" id="chargerEmail" style="width: 60%"/></td>               
                    </tr>   
                    <tr>
                        <th style="height:30px;">계약내용</th>
                        <td colspan="3">
                            <textarea id="cntrctCn" name="cntrctCn" title="내용" style="width:98%;height:50px;"></textarea>
                        </td>
                    </tr>   
                </table>
            
            <div class="popup_footer_box">
                <button type="button" id="btnFormSave" class="btn_common01">
                      <span class="glyphicon glyphicon-ok f15 mr5"></span>저장<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                </button>
                <button type="button" id="btnCcpyPupupClose" name="btnCompPupupClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
                <button type="button" id="btnFormRemove" class="btn_common01" style="display: none;">
                      <span class="glyphicon glyphicon-trash f15 mr5"></span><taglibs:transText progrmId="default" key="btnDelete" />
                </button>
            </div>
            </form>
		</div>
	</div>
</body>
