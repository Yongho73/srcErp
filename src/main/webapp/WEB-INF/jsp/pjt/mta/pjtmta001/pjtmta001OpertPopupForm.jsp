<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	/* 작업결과 입력, 조회 */
	
	$(document).click(function(e){ //문서 body를 클릭했을때
	    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
	    if(e.target.id =="date3_cal" || e.target.id =="opertBeginDtOpert" || e.target.id =="opertEndDtOpert") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
	    dhxCCalendarDate3.hide();  //그리드 달력 컴포넌트 객체 숨기기.
	});
	
	var cf_InitParamPopupOpert = function (){
		$('#saveFormPjtMtaRequst').resetForm();
		
		var projectSn = '${projectSn}';   
        var requstSn = '${requstSn}';   
        var opertSn = '${opertSn}';  
        var comptDe = '${comptDe}';
        var bcncNm = decodeURI('${bcncNm}');
        var opertorEmpno = '${opertorEmpno}';
        var opertorNm = decodeURI('${opertorNm}');
		
		$('#bcncNmOpert').val(bcncNm);
		$('#projectSnOpert').val(projectSn);
		$('#requstSnOpert').val(requstSn);
		$('#opertSnOpert').val(opertSn);
		$('#opertorEmpno').val(opertorEmpno);
		$('#opertorNm').val(opertorNm);
	   	
	  //기간달력 이벤트 추가
	    $('#saveFormOpert #opertBeginDtOpert').unbind('click').bind('click', function(event){
	        dhxCCalendarDate3.show();
	    });
	    $('#saveFormOpert #opertEndDtOpert').unbind('click').bind('click', function(event){
	        dhxCCalendarDate3.show();
	    });
	    
	    dhxCCalendarDate3 = new dhtmlXDoubleCalendar("date3_cal");  
	    dhxCCalendarDate3.attachEvent("onClick", function(side, date){
	        if(side == "right"){
	        	$('#opertBeginDtOpert').val(dateFormat(dhxCCalendarDate3.leftCalendar.getDate()));
	            $('#opertEndDtOpert').val(dateFormat(dhxCCalendarDate3.rightCalendar.getDate()));
	            dhxCCalendarDate3.hide();
	        }
	    });
	    //dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormPjtProject', 'date22', 'text'));
	    dhxCCalendarDate3.leftCalendar.loadUserLanguage("ko");
	    dhxCCalendarDate3.rightCalendar.loadUserLanguage("ko"); 
	    
	    $('#opertBeginDtOpert').val(gv_Curdate);
	    $('#opertEndDtOpert').val(gv_Curdate);
	   	
	   	//필수항목 체크 
 		$("#saveFormOpert").validate({ errorElement: 'div', ignore: '' });	   	
	};
	
	var cf_SetComponentsPopupOpert = function (){ };
	
	var cf_SetEventListenerPopupOpert = function (){
	    $('#btnopertorEmpSearch').unbind('click').bind('click', function() {
	    	gf_EmpPopup('saveFormOpert', 'opertorEmpno', 'opertorNm', '1000', 'Y', null);
        });

		//저장 
	    $('#btnPopFormPrgSaveOpert').unbind('click').bind('click', function() {
	    	var msg = "저장하시겠습니까?";
	    	if($('#saveFormOpert').validate().form()){
	        	fn_DivMsgConfirm2(msg, function(confirm){ 
	                if(confirm){ 
	                	var comptDe = Number('${comptDe}'.replaceAll('-',''));
	        	        var opertEndDtOpert = Number(gf_FormGetValue('saveFormOpert', 'opertEndDtOpert', 'text').replaceAll('-',''));
	        	        var requstStep = '';
	        	        
        	            var jsonParameter = {
        	            		projectSn : gf_FormGetValue('saveFormOpert', 'projectSnOpert', 'text'),
        	            		requstSn : gf_FormGetValue('saveFormOpert', 'requstSnOpert', 'text'),
        	            		opertSn : gf_FormGetValue('saveFormOpert', 'opertSnOpert', 'text'),
        	            		opertorEmpno : gf_FormGetValue('saveFormOpert', 'opertorEmpno', 'text'),
        	            		opertBeginDt : gf_FormGetValue('saveFormOpert', 'opertBeginDtOpert', 'text') .replaceAll('-',''),	
        	            		opertEndDt : gf_FormGetValue('saveFormOpert', 'opertEndDtOpert', 'text') .replaceAll('-',''),
        	            		opertCn : gf_FormGetValue('saveFormOpert', 'opertCnOpert', 'textarea'),
        	            		comptDe : comptDe<opertEndDtOpert?opertEndDtOpert:'${comptDe}'
        	            };

        	            var url;
        	            var  opertSn  = gf_FormGetValue('saveFormOpert', 'opertSnOpert', 'text');
        	            
        	            if( !gf_IsNull(opertSn) ) {
        	                url = "pjtmta001/modifyPjtMtaOpert";
        	            } else {
        	                url = "pjtmta001/savePjtMtaOpert";
        	            }

        	            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
        	            if(dataSource.code === '000') {

        	                if(!gf_IsNull(opertSn)) {
        	                    gf_DivMsgAlert(gv_MsgUpdate);
        	                    $('#bpopupOpert .b-close').click();
        	                } else {
        	                    gf_DivMsgAlert(gv_MsgRegist);
        	                    $('#bpopupOpert .b-close').click();
        	                    $('#bpopupMtaSearch .b-close').click();
        	                }            
        	            }

	        	        $('#saveFormStmPrgRequst div.error').unbind("click").bind("click",function() {
	        	            $(this).remove();
	        	        });
	                } else {
	                	return false;
	                }
	            });
	    	}
	    	
	    });		
		
	    $('#btnPopupPrgDeleteOpert').unbind('click').bind('click', function() {
	    	var opertSn =gf_FormGetValue('saveFormOpert', 'opertSnOpert', 'text');
	        if( gf_IsNull(opertSn) ) {
	             gf_DivMsgConfirm2("입력된 내용이 삭제됩니다.", function(confirm){ 
	                 if(confirm){ 
	                	 $('#bpopupOpert .b-close').click();
	                 }else{ 
	                     return false; 
	                 } 
	             }); 
	             return false;
	        } else {
	            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveOpert()', '');
	        }
	    });
		
		//메뉴찾기 
	    $('#btnProgramSearch').unbind('click').bind('click', function() {
	    	fn_ProjectList('formPop1','','', '',fn_CallbackProjectPopup);
	    });	    
		
	    $('#btnProjectSearch').unbind('click').bind('click', function() {
            fn_ProjectList('formPop1','','', '',fn_CallbackProjectPopup);
        }); 
		
	    //팝업창 닫기
	    $('#btnPopupPrgCloseOpert').unbind('click').bind('click', function() {
	    	$('#bpopupOpert .b-close').click();
	    });
	    
	    //첩부파일
	    $('#btnFileUploadSaveFormStmPrgRequst').unbind('click').bind('click', function() {
	        gf_FileUploadPopup(
	                '',     /* eventFunction */
	                '',     /* deleteBtnClassNm */
	                'saveFormPjtMtaRequst',     /* viewDivId */
	                'atchmnflSaveFormStmPrgRequst',     /* dataDivId */
	                [],     /* keyArr */
	                [],     /* infoArr */
	                0,
	                'all',
	                'fn_CallbackFileUploadSaveFormStmPrgRequst');
	    }); 
		
	};
	
	//달력셋팅 
	var cf_calendarInitPopupOpert = function(){
		
		
	    $('#saveFormOpert .input_calen').unbind('keyup').bind('keyup', function(event){
	    	//날짜 유효성체크 
	    	dateValidateChkPopup($(this));
	    }); 
		
	}

	function dateValidateChkPopup(objDate){
		
		var date = objDate.val();
		
		if (date.length == 10) {
			if (!gf_IsDate(date)) {
				  gf_DivMsgAlert("잘못된 날짜입니다. <br/>다시 입력하세요.");
				  objDate.val("");
				  objDate.focus();
				  return;
			}		
		}
	}	
	
	//상세정보 		
	var fn_SearchInputOpert = function (){

    	var projectSn = '${projectSn}';
    	var requstSn = '${requstSn}';
    	var opertSn = '${opertSn}';
    	
    	console.log(opertSn);
    	
	    if( !gf_IsNull(opertSn) ) {
	        var jsonParameter = {
	            projectSn : projectSn,
	            requstSn : requstSn,
	            opertSn : opertSn
	        };

	        var dataSource = gf_NoAsyncTransaction('pjtmta001/findPjtmta001Opert', jsonParameter, 'GET');
	        var data = dataSource.data;

	        gf_FormSetValue('saveFormOpert', 'opertorEmpno', data.opertorEmpno, 'text');
	        gf_FormSetValue('saveFormOpert', 'opertorNm', data.opertorNm, 'text');
	        gf_FormSetValue('saveFormOpert', 'opertBeginDtOpert', data.opertBeginDt, 'text');
	        gf_FormSetValue('saveFormOpert', 'opertEndDtOpert', data.opertEndDt, 'text');
	        gf_FormSetValue('saveFormOpert', 'opertCnOpert', data.opertCn, 'textarea'); 
	        
	    	$('#btnPopupPrgDeleteOpert').show();
	    } else {
	    	$('#btnPopupPrgDeleteOpert').hide();
	    }
	    
	   if(gf_IsNull(gf_FormGetValue('saveFormOpert', 'opertorNm', 'text'))){
		   gf_FormSetValue('saveFormOpert', 'opertorEmpno', '${opertorEmpno}', 'text');
	       gf_FormSetValue('saveFormOpert', 'opertorNm', decodeURI('${opertorNm}'), 'text');
	   }
	};
	
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
	
	
	//초기화 함수 
	var cf_InitInputFormOpert = function (){

	};	
	
	var fn_RemoveOpert = function (){
	        var projectSn = gf_FormGetValue('saveFormOpert', 'projectSnOpert', 'text');
	        var requstSn = gf_FormGetValue('saveFormOpert', 'requstSnOpert', 'text');
	        var opertSn = gf_FormGetValue('saveFormOpert', 'opertSnOpert', 'text');

	        var jsonParameter = {
	            projectSn : projectSn,
	            requstSn : requstSn,
	            opertSn : opertSn
	        };

	        var dataSource = gf_NoAsyncTransaction('pjtmta001/removePjtMtaOpert', jsonParameter, 'POST');
	        if(dataSource.code === '000') {
	            gf_DivMsgAlert(gv_MsgDelete);
	            $('#bpopupOpert .b-close').click();          
	        }   
	};
	
    $(function() {
        cf_InitParamPopupOpert();
        cf_SetComponentsPopupOpert();    
        cf_SetEventListenerPopupOpert();    
        fn_SearchInputOpert(); //상세정보            
        if(gf_IsNull('${imprvmrequstSn}')) {
            $('#requstDe').val(gv_Curdate); //오늘날짜 셋팅 
        }           
    });
	
    </script>
		<div id="saveForm" style="margin: 10px 10px 10px 10px">
        <form id="saveFormOpert">
				<div class="detail_type01">
				        <input type="hidden" name="projectSnOpert" id="projectSnOpert"  /> 
                        <input type="hidden" name="requstSnOpert" id="requstSnOpert"  />
                        <input type="hidden" name="opertSnOpert" id="opertSnOpert"  />
						<table>
							<colgroup>								 
								<col width="20%"/>
								<col width="80%"/>
							</colgroup>
							<tr>
								<th>거래처</th>
								<td><input readonly type="text" name="bcncNmOpert" id="bcncNmOpert"  class="w150" /></td>
							</tr>
                            <tr>
                                <th class="essential_icon">작업자</th>
                                <td><input type="hidden" name="opertorEmpno" id="opertorEmpno" style="width: 60px;" maxlength="15"> 
                                    <input required type="text" name="opertorNm" id="opertorNm" maxlength="15" readonly>
                                    <button type="button" id="btnopertorEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
                            </tr>
							<tr>
								<th class="essential_icon">작업기간</th>
								<td><input required type="text" name="opertBeginDtOpert" id="opertBeginDtOpert" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> 
                                ~ <input required type="text" name="opertEndDtOpert" id="opertEndDtOpert" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
                                <div id="date3_cal" style="position:absolute; top:25px;"></div></td>
							</tr>
							
							<tr>
								<th class="essential_icon">작업내용</th>
								<td><textarea required name="opertCnOpert" id="opertCnOpert" style="width:99%; height:200px"></textarea></td>
							</tr>
						</table>								 
					
			</div>

            </form>
		<div>
			
            <div class="popup_footer_box" style = "margin-top: 20px;">
            	<button type="button" id="btnPopFormPrgSaveOpert" name="btnPopFormPrgSaveOpert">
                      <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span>저장
                </button>
                <button type="button" id="btnPopupPrgDeleteOpert" name="btnPopupPrgDeleteOpert">
                      <span class="glyphicon glyphicon-remove f15 mr5"></span>삭제
                </button>                
                <button type="button" id="btnPopupPrgCloseOpert" name="btnPopupPrgCloseOpert">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span>닫기
                </button>
			</div>
		</div>
	</div>
</body>
