<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	var nowDate = "";
	var RegNotNum = /[^0-9]/g;  //숫자 정규식
	var dhxCCalendarDate2Popup; // 기간 달력(From ~ To)
	
	var cf_InitParamPopupOpert = function (){
	   	//필수항목 체크 
 		$("#saveFormReport").validate({ errorElement: 'div', ignore: '' });	  
	};
	
	var cf_SetEventListenerPopupOpert = function (){
		//저장 
	    $('#btnPopFormPrgSaveOpert').unbind('click').bind('click', function() {
			var reportStrDtPopup = gf_FormGetValue('saveFormReport', 'reportStrDtPopup', 'text').replaceAll('-','');
			var reportEndDtPopup = gf_FormGetValue('saveFormReport', 'reportEndDtPopup', 'text').replaceAll('-','');
			if(!gf_IsNull(reportStrDtPopup)&&!gf_IsNull(reportEndDtPopup)){
				if(Number(reportEndDtPopup)<Number(reportStrDtPopup)){
					gf_DivMsgAlert('종료일이 시작일보다 앞설 수 없습니다.', '#reportStrDtPopup');
					return false;
				}
			}
			var msg = "저장하시겠습니까?";
	    	if($('#saveFormReport').validate().form()){
	        	fn_DivMsgConfirm2(msg, function(confirm){ 
	                if(confirm){ 
	        	    	fn_saveReport();
	                }else{ 
	                	return false; 
	                } 
	            });
	    	}
	    });		
	    $('#btnPopFormPrgModifyOpert').unbind('click').bind('click', function() {
			var reportStrDtPopup = gf_FormGetValue('saveFormReport', 'reportStrDtPopup', 'text').replaceAll('-','');
			var reportEndDtPopup = gf_FormGetValue('saveFormReport', 'reportEndDtPopup', 'text').replaceAll('-','');
			if(!gf_IsNull(reportStrDtPopup)&&!gf_IsNull(reportEndDtPopup)){
				if(Number(reportEndDtPopup)<Number(reportStrDtPopup)){
					gf_DivMsgAlert('종료일이 시작일보다 앞설 수 없습니다.', '#reportStrDtPopup');
					return false;
				}
			}

			var msg = "저장하시겠습니까?";
	    	if($('#saveFormReport').validate().form()){
	        	fn_DivMsgConfirm2(msg, function(confirm){ 
	                if(confirm){ 
	        	    	fn_saveReport();
	                }else{ 
	                	return false; 
	                } 
	            });
	    	}
	    });		
        
        $('#btnEmpSearch').unbind('click').bind('click', function() {
	    	gf_EmpPopup('saveFormReport', 'empno', 'empNm', '1000', 'Y', null);
        });
		
	    //팝업창 닫기
	    $('#btnPopupPrgCloseOpert').unbind('click').bind('click', function() {
	    	$('#bpopupOpert .b-close').click();
	    });
	    
	    $('#btnProjectSearchPopup').unbind('click').bind('click', function() {
            fn_ProjectList('formPop1','','', '',fn_CallbackProjectPopup);
        }); 
	   	
 		//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
 	    $('#saveFormReport .input_calen').unbind('keyup').bind('keyup', function(event){
 	    	dateChk($(this));
 	    });
 	    
 		//기간달력 이벤트 추가
 	    $('#saveFormReport #date2Popup').unbind('click').bind('click', function(event){
 	    	dhxCCalendarDate2Popup.show();
 	    });
 	    
 	    //금일 조회
 	    var today = new Date();
 	    nowDate = dateFormat(today);
 	    return(nowDate);
	};

	var cf_InitFormReportPopup = function() {
	    $('#saveFormReport').resetForm();
	};

	var cf_SetBindingReportPopup = function() {
		fn_CalendarInit();
	    fn_SearchReportPopup();
	};
	
	//상세정보 		
	var fn_SearchReportPopup = function (){
	    //세션정보 
		var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
	    var userData = userInfo.data;
		
		var check = '${check}'; //신규구분 flase=신규, true=조회	
		var projectSn = '${projectSn}';	
		var reportYm = '${reportYm}'.replace('-', '');
		var newCheck = '${newCheck}';
		if(!gf_IsNull(projectSn)){
			if(!gf_IsNull(reportYm) && check != 'flase'){
				var jsonParameter = {
		    	      	projectSn : projectSn,
		    	       	reportYm : reportYm 
		    	    };
		    	
		    	var dataSource = gf_NoAsyncTransaction('pjtmta003/findPjtmta003', jsonParameter, 'GET');
			    var data = dataSource.data;
				if(data!=null){
					gf_FormSetValue('saveFormReport', 'projectSn', data.projectSn, 'text');
				    gf_FormSetValue('saveFormReport', 'projectNm', data.projectNm, 'text');
				    gf_FormSetValue('saveFormReport', 'bcncNm', data.bcncNm, 'text');
				    gf_FormSetValue('saveFormReport', 'empno', data.empno, 'text');
				    gf_FormSetValue('saveFormReport', 'empNm', data.empNm, 'text');
			    	gf_FormSetValue('saveFormReport', 'reportYm', data.reportYm, 'text');
				    gf_FormSetValue('saveFormReport', 'writeDt', data.writeDt, 'text');
			    	gf_FormSetValue('saveFormReport', 'reportStrDtPopup', data.reportStrDt, 'text');
			    	gf_FormSetValue('saveFormReport', 'reportEndDtPopup', data.reportEndDt, 'text');
				    gf_FormSetValue('saveFormReport', 'nextMtReport', data.nextMtReport, 'textarea');
				    gf_FormSetValue('saveFormReport', 'issueDesc', data.issueDesc, 'textarea');
				    gf_FormSetValue('saveFormReport', 'nonsolutDesc', data.nonsolutDesc, 'textarea');
				}
				
				dhxCCalendarDate2Popup.leftCalendar.setDate(gf_FormGetValue('saveFormReport', 'reportStrDtPopup', 'text'));
				dhxCCalendarDate2Popup.rightCalendar.setDate(gf_FormGetValue('saveFormReport', 'reportEndDtPopup', 'text'));	
			} else {
				var jsonParameter = {
		    	      	projectSn : projectSn,
		    	};
		    	var dataSource = gf_NoAsyncTransaction('pjtmta003/popupPjtmta003', jsonParameter, 'GET');
			    var data = dataSource.data;
			    
			    gf_FormSetValue('saveFormReport', 'bcncNm', data.bcncNm, 'text');
				gf_FormSetValue('saveFormReport', 'projectSn', data.projectSn, 'text');
			    gf_FormSetValue('saveFormReport', 'projectNm', data.projectNm, 'text');
			    if(!gf_IsNull(data.reportYm)){
				    var reportYm = data.reportYm.split('-');
				    if(gf_IsNull(data.reportYm)){
				    	gf_FormSetValue('saveFormReport', 'reportYm', dateFormatMonth(new Date()), 'text');
				    }
				    if(Number(reportYm[1]) > 12){
					    gf_FormSetValue('saveFormReport', 'reportYm', (Number(reportYm[0])+1)+'-01', 'text');
				    } else {
				    	gf_FormSetValue('saveFormReport', 'reportYm', data.reportYm, 'text');
				    }
			    } else {
			    	gf_FormSetValue('saveFormReport', 'reportYm', dateFormatMonth(new Date()), 'text');
			    }
			}
		}
	    if(check != "false"){
	    	$("#btnProjectSearchPopup").hide();
		    $("#btnPopFormPrgModifyOpert").show();
	    	$("#btnPopFormPrgSaveOpert").hide();
	    	$("#reportYm").attr("disabled", true);
	    } else {
		    $("#btnProjectSearchPopup").show();
	    	$("#btnPopFormPrgModifyOpert").hide();
		    $("#btnPopFormPrgSaveOpert").show();
	    	$("#reportYm").attr("disabled", false);
	    	gf_FormSetValue('saveFormReport', 'empno', userData.userEmpNo, 'text');
	    	gf_FormSetValue('saveFormReport', 'empNm', userData.userNm, 'text');
	    	
	    	$('#writeDt').val(nowDate);
	    }
	    
	};
	
	/* 데이터 저장 */
	var fn_saveReport = function(){
		
   		var check = '${check}'; //신규구분 flase=신규, true=조회	
   		var dupCheck = "true";
   		if(check == 'false'){
   			var projectSn = gf_FormGetValue('saveFormReport', 'projectSn', 'text');
            var reportYm = gf_FormGetValue('saveFormReport', 'reportYm', 'text');
            dupCheck = fn_CheckDupPjtmta003Report(projectSn, reportYm);
   		}
   		
   		if(dupCheck == 'true'){
   			var jsonParameter = {
    	          	projectSn : gf_FormGetValue('saveFormReport', 'projectSn', 'text'),
    	            reportYm : gf_FormGetValue('saveFormReport', 'reportYm', 'text'),
    	            writeDt : gf_FormGetValue('saveFormReport', 'writeDt', 'text'),
    	            reportStrDt : gf_FormGetValue('saveFormReport', 'reportStrDtPopup', 'text'),
    	            reportEndDt : gf_FormGetValue('saveFormReport', 'reportEndDtPopup', 'text'),
    	            writer : gf_FormGetValue('saveFormReport', 'empno', 'text'),
    	            nextMtReport : gf_FormGetValue('saveFormReport', 'nextMtReport', 'textarea'),
    	            issueDesc : gf_FormGetValue('saveFormReport', 'issueDesc', 'textarea'),
    	            nonsolutDesc : gf_FormGetValue('saveFormReport', 'nonsolutDesc', 'textarea'),
    	            newCheck : check=='true'?'search':'newReport'
    	    };
        	
            var dataSource = gf_NoAsyncTransaction("pjtmta003/savePjtMtaReport", jsonParameter, 'POST');
            if(dataSource.code === '000') {
            	dhxGridPjtmta003.forEachRow(function(rowId) {
            		if(gf_DhxGetValue(dhxGridPjtmta003, rowId, 'printChk', 'grid') == '1'){
            			dhxDataProcessorPjtmta003.setUpdated(rowId, true, 'updated');
            		}
                });
            	fn_SavePjtmta003_Send(); 
                $('#bpopupOpert .b-close').click();
            }
   		}

       $('#saveFormStmPrgRequst div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
	}
	
	/**
	 * 중복데이터 db 체크
	 */
	var fn_CheckDupPjtmta003Report = function(projectSn, reportYm){
	    if(!gf_IsNull(projectSn, reportYm)) {
	        var jsonParameter = {
        		projectSn : projectSn,
        		reportYm : reportYm
	        };
	        var dataSource = gf_NoAsyncTransaction('pjtmta003/findPjtmta003Report', jsonParameter, 'GET');
	        var data = dataSource.data;
	        if(dataSource.code === '000') {
	            if(gf_IsNull(data.projectNm)) {
	                return "true";
	            } else {
	            	 gf_DivMsgAlert("등록된 보고년월입니다.<br>보고년월을 수정해주세요.");
	                return "false";
	            }
	        }
	    }
	}
	
	//프로젝트 조회
	var $projectInfo = {};  //공통코드 
	var fn_ProjectList = function (formId, codeId, codeNmId, param,strCallbackFunc) {
		
		var title  = "프로젝트조회";
		
		$projectInfo = {};
		
		var dhxWindowObj;
		var dhxWindowsProjectList;
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
		if($('body').find("div[id='bpopupProjectList']").size() <= 0) {
			$('body').append("<div id='bpopupProjectList' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
		}
		
		$('#bpopupProjectList').bPopup({
			onOpen:function(){
				
				dhxWindowsProjectList = new dhtmlXWindows();
				var id 		= 'bpopupProjectList';
				var ajaxUrl = gv_ContextPath+'/pjtmta001/popup/pjtmta001ProjectListPopup/view?'+param;
				var left	= 500;
				var top		= 500;
				var width	= 750;
				var height	= 550;
				
				dhxWindowObj = dhxWindowsProjectList.createWindow(id, left, top, width, height);
				dhxWindowsProjectList.window(id).centerOnScreen();
				dhxWindowObj.setText(title);
				dhxWindowObj.attachURL(ajaxUrl, true, true);
				dhxWindowObj.detachObject(true);
				dhxWindowObj.attachEvent("onClose", function(win){
					$('#bpopupProjectList .b-close').click();
				});
			},
			onClose:function(){
				if ( !gf_IsNull(callFunction) ) {
	                callbacks.empty();
	                callbacks.add(callFunction);
	                callbacks.fire($projectInfo);
	            }
				dhxWindowsProjectList.unload();
				$('body').find("div[id='bpopupProjectList']").remove();			
			}
		},function(){});
		return dhxWindowObj;
	};
	var fn_CallbackProjectPopup = function(data) {
		if(!gf_IsNull(data.projectSn)){
			gf_FormSetValue('saveFormReport', 'bcncNm', data.bcncNm, 'text');
		    gf_FormSetValue('saveFormReport', 'projectNm', data.projectNm, 'text');
		    gf_FormSetValue('saveFormReport', 'projectSn', data.projectSn, 'text');
		    gf_FormSetValue('saveFormReport', 'reportYm', data.nextReportYm, 'text');
		}
	};
	
	$(document).click(function(e){ //문서 body를 클릭했을때
	    //if(e.target.className =="date2Popup_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
	    if(e.target.id =="date2Popup_cal" || e.target.id =="reportStrDtPopup" || e.target.id =="reportEndDtPopup") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
	    dhxCCalendarDate2Popup.hide();  //그리드 달력 컴포넌트 객체 숨기기.
	});
	
	var fn_CalendarInit = function(){
		//달력 생성
		var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"writeDt", button:"startDateIcon"});
		dhxCCalendarDate1.loadUserLanguage("ko");
		//dhxCCalendarDate1.hideTime();
		dhxCCalendarDate1.setDateFormat("%Y-%m-%d");
		
		//기간달력
		dhxCCalendarDate2Popup = new dhtmlXDoubleCalendar("date2Popup_cal");
	    dhxCCalendarDate2Popup.attachEvent("onClick", function(side, date){
	        //alert(side + " + " + date);
	        if(side == "right"){
	        	$('#reportStrDtPopup').val(dateFormat(dhxCCalendarDate2Popup.leftCalendar.getDate()));
	        	$('#reportEndDtPopup').val(dateFormat(dhxCCalendarDate2Popup.rightCalendar.getDate()));
	        	dhxCCalendarDate2Popup.hide();
	        }
	    });
		//금일 날짜표시
// 		gf_SetDateIntervalRadio('reportStrDtPopup', 'reportEndDtPopup', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
		
		//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
		dhxCCalendarDate2Popup.leftCalendar.setDate(nowDate);
		dhxCCalendarDate2Popup.rightCalendar.setDate(nowDate);	
		dhxCCalendarDate2Popup.leftCalendar.loadUserLanguage("ko");
		dhxCCalendarDate2Popup.rightCalendar.loadUserLanguage("ko");
		
		
		//년월달력
		$('#reportYm').val('${reportYm}'.substring(0,7));
		var currentYear = (new Date()).getFullYear();
	    var startYear = currentYear-10;
	    var options = {
	            startYear: startYear,
	            finalYear: currentYear,
	            pattern: 'yyyy-mm',
	            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
	    };
	    $('#reportYm').monthpicker(options);
	    $('#saveFormReport .input_calen').unbind('keyup').bind('keyup', function(event){
	    	dateChk($(this));
	    }); 
	}
	
	function dateValidateChkPopup(objDate){
		
		var date = objDate.val();
		
		if (date.length == 7) {
			if (!gf_IsDate(date)) {
				  gf_DivMsgAlert("잘못된 날짜입니다. <br/>다시 입력하세요.");
				  objDate.val("");
				  objDate.focus();
				  return;
			}		
		}
	}
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
	function dateFormatMonth(date){
		  var mm = date.getMonth()+1; //January is 0!
		  var yyyy = date.getFullYear();

		  if(mm<10) {
		      mm='0'+mm
		  } 

		  var nDate = yyyy+'-'+mm;
		  return(nDate);
	};
	
	var fn_DivMsgConfirm2 = function(message, callback){
		
		if($('body').find("div[id='message']").size() <= 0) {
			$('body').append('<div id="message"></div>');
		}
		
		var str ="<div id='wrap_notice' style='width:300px;'>"
			   + "<div id='header_notice'>"
			   + "<h2 class='ac'>알 림</h2>"
			   + "</div>"
			   + "<hr>"
			   + "<div id='content_notice'>"
			   + "<p class='ac'>" + message + "</p>"
			   + "<p class='ac mt10'><button class='btn_confirm' id='btnYesConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackTrue== 'string' ? callBackTrue : '' ) +"'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button>&nbsp;&nbsp;"
			   + "<button class='btn_confirm' id='btnNoConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackFalse== 'string' ? callBackFalse : '' ) +"'><span class='glyphicon glyphicon-ban-circle'></span>&nbsp;취소</button></p>"
			   + "</div>"
			   + "</div>";
		$("#message").html(str);
		$("#content_notice .btn_cancel").focus();
		
		if(typeof callback == 'function') {
			$("#btnYesConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
				gf_DivMsgAlertClose();
				callback(true);
		    });
	
			$("#btnNoConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
				gf_DivMsgAlertClose();
				callback(false);
		    });
		}	
	};
	
    $(function() {      
    	cf_InitParamPopupOpert();
    	cf_SetEventListenerPopupOpert();
    	cf_InitFormReportPopup();    
    	cf_SetBindingReportPopup();     
    });
	
    </script>
		<div id="saveForm" style="margin: 10px 10px 10px 10px">
        <form id="saveFormReport">
				<div class="detail_type01">
						<input type="hidden" name="projectSn" id="projectSn"/>
						<table>
							<colgroup>								 
								<col width="125px"/>
								<col width="250px"/>				 
								<col width="125px"/>
								<col width="250px"/>
							</colgroup>
							<tr>
								<th class="essential_icon">거래처</th>
								<td colspan='3'><input required readonly type="text" name="bcncNm" id="bcncNm"  class="w75p" />
								</td>
							</tr>
                            <tr>
                                <th class="essential_icon">프로젝트명</th>
                                <td colspan='3'><input required readonly type="text" name="projectNm" id="projectNm"  class="w75p" />
								<button type="button" id="btnProjectSearchPopup" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button></td>
                            </tr>
							<tr>
								<th class="essential_icon">보고년월</th>
								<td><input required type="text" name="reportYm" id="reportYm" class="input_calen" size="7" maxlength="7">
								</td>
								<th class="essential_icon">작성일(보고일)</th>
								<td>
									<input required type="text" name="writeDt" id="writeDt" class="input_calen" maxlength=10;>
								</td>
							</tr>
							<tr>
								<th>기간</th>
								<td>
									<div id="date2Popup" style="width:220px;">  <!-- absolute는 position: static 속성을 가지고 있지 않은 부모를 기준으로 움직입니다. 만약 부모 중에 포지션이 relative, absolute, fixed인 태그가 없다면 가장 위의 태그(body)가 기준이 됩니다. -->
										<input type="text" name="reportStrDtPopup" id="reportStrDtPopup" class="input_calen" maxlength=10;> ~ <input type="text" name="reportEndDtPopup" id="reportEndDtPopup" class="input_calen" maxlength=10;>
										<div id="date2Popup_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
									</div>
								</td>
								<th class="essential_icon">작성자</th>
								<td>
									<input required type="hidden" name="empno" id="empno" />
									<input required type="text" name="empNm" id="empNm" class="w100" readonly />
									<button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
								</td>
							</tr>
							<tr>
								<th class="essential_icon">차월계획</th>
								<td colspan='3'><textarea required name="nextMtReport" id="nextMtReport" style="width:99%; height:120px" maxlength="2000"></textarea></td>
							</tr>
							<tr>
								<th>미결업무 및 대책</th>
								<td colspan='3'><textarea name="nonsolutDesc" id="nonsolutDesc" style="width:99%; height:60px" maxlength="2000"></textarea></td>
							</tr>
							<tr>
								<th>이슈사항</th>
								<td colspan='3'><textarea name="issueDesc" id="issueDesc" style="width:99%; height:60px" maxlength="2000"></textarea></td>
							</tr>
						</table>								 
					
			</div>

            </form>
		<div>
			
            <div class="popup_footer_box" style = "margin-top: 10px;">
            	<button type="button" id="btnPopFormPrgSaveOpert" name="btnPopFormPrgSaveOpert">
                      <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span>저장
                </button>
                <button type="button" id="btnPopFormPrgModifyOpert" name="btnPopFormPrgModifyOpert">
                      <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span>수정
                </button>
                <button type="button" id="btnPopupPrgCloseOpert" name="btnPopupPrgCloseOpert">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span>닫기
                </button>
			</div>
		</div>
	</div>
</body>
