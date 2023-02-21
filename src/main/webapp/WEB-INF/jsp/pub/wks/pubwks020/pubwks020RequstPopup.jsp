<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script>
    var paramDate = "${paramDate}";
    var day = paramDate.substr(6,2);
    if(day < 10){
    	day = day.substr(1,1);
    }
    
    var rId = dhxGridPubwks020.getSelectedRowId();
    var dtlEmpno = gf_DhxGetValue(dhxGridPubwks020 , rId, 'empno', 'grid');
//     var dtlWorkDay = $("#workDay" + day).val();
    var dtlWorkDay = paramDate;
    var dtlWrkplcNm = $("#wrkplcNm" + day).val();
    var dtlRecogTime = $("#recogTime" + day).val();
    var dtlShiftWorkAt = $("#shiftWorkAt" + day).val();
    var dtlWorkTime = $("#workTime" + day).val().split('~');
    var dtlWorkBeginTime = '';
    var dtlWorkEndTime = '';
    if(!gf_IsNull(dtlWorkTime)){
        dtlWorkBeginTime = dtlWorkTime[0].trim();
        dtlWorkEndTime = dtlWorkTime[1].trim();
    }
    var dtlConfmSeSn = $("#confmSeSn"+ day).val();
    var dtlConfmSttusCode = $("#confmSttusCode"+ day).val();
    var dtlConfmSttusCodeNm = $("#confmSttusCodeNm" + day).val();
    var dtlConfmDe = $("#confmDe" + day).val();
    var dtlConfmerEmpno = $("#confmerEmpno" + day).val();
    var dtlConfmerEmpnm = $("#confmerEmpnm" + day).val();
    var dtlRegId = $("#regId" + day).val();
    var dtlReturnResn = $("#returnResn" + day).val();
//     console.log(dtlWorkTime);
//     console.log(dtlRegId);
//     console.log(sessionUserEmpno);
//     console.log(gv_SecondLvlMenuId);
//     console.log(gv_FourthLvlMenuId);

    var dhxGridPubwks020Popup;
    var cf_SetComponentsPubwks020Popup = function(){
    	var dhxGridPubwks020PopupHeaderInfo = [];
    	dhxGridPubwks020PopupHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '40', 'left', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    	dhxGridPubwks020PopupHeaderInfo.push(gf_MakeDhxGridHeader('순번', '40', 'center', 'str', 'ro', false, 'confmSeSn', '', '')); /* gf_LocaleTrans('default', 'titBsrpNo') */
    	dhxGridPubwks020PopupHeaderInfo.push(gf_MakeDhxGridHeader('근무 일', '80', 'center', 'str', 'ro', true, 'workDay', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
    	dhxGridPubwks020PopupHeaderInfo.push(gf_MakeDhxGridHeader('시작 시간', '70', 'center', 'str', 'ro', false, 'workBeginTime', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    	dhxGridPubwks020PopupHeaderInfo.push(gf_MakeDhxGridHeader('종료 시간', '70', 'center', 'str', 'ro', false, 'workEndTime', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    	dhxGridPubwks020PopupHeaderInfo.push(gf_MakeDhxGridHeader('근무지 명', '100', 'left', 'str', 'ro', false, 'wrkplcNm', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    	dhxGridPubwks020PopupHeaderInfo.push(gf_MakeDhxGridHeader('승인 상태', '80', 'center', 'str', 'ro', false, 'confmSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxGridPubwks020PopupHeaderInfo.push(gf_MakeDhxGridHeader('승인 일자', '80', 'center', 'str', 'ro', false, 'confmDe', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxGridPubwks020PopupHeaderInfo.push(gf_MakeDhxGridHeader('승인자', '80', 'center', 'str', 'ro', false, 'confmerEmpnm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
    	dhxGridPubwks020PopupHeaderInfo.push(gf_MakeDhxGridHeader('반려 사유', '100', 'left', 'str', 'ro', false, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titBsrpPurps') */
    
        dhxGridPubwks020Popup = gf_MakeDhxGrid('dataListPubwks020Popup', dhxGridPubwks020PopupHeaderInfo, true, false, false);
        dhxGridPubwks020Popup.enableAutoWidth(false);
        dhxGridPubwks020Popup.setEditable(false);
        dhxGridPubwks020Popup.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    }    
    var cf_InitParamPopup = function (){
        if(gf_IsNull(dtlWorkBeginTime)){
            gf_FormSetValue('savePopPubwks020', 'workBeginTime', "09:00" , '');
        }
        else{
            gf_FormSetValue('savePopPubwks020', 'workBeginTime', dtlWorkBeginTime , '');
        }
        
        if(gf_IsNull(dtlWorkEndTime)){
            gf_FormSetValue('savePopPubwks020', 'workEndTime', "18:00" , '');
        }
        else{
            gf_FormSetValue('savePopPubwks020', 'workEndTime', dtlWorkEndTime , '');
        }

        if(gf_IsNull(dtlConfmSeSn)){
        	$("#btnPopupPrgDelete").hide();
        }
        

        if(dtlShiftWorkAt == '1'){
            gf_FormSetValue('savePopPubwks020' , 'shiftWorkAt' , dtlShiftWorkAt , 'chkbox');
        }
        
        gf_FormSetValue('savePopPubwks020' , 'empno' , dtlEmpno , 'text');
        gf_FormSetValue('savePopPubwks020' , 'workDay' , paramDate.substr(0,4) + '-' + paramDate.substr(4,2) + '-' + paramDate.substr(6,2) , 'text');
        gf_FormSetValue('savePopPubwks020' , 'recogTime' , dtlRecogTime , 'text');
        gf_FormSetValue('savePopPubwks020' , 'wrkplcNm' , dtlWrkplcNm , 'text');
        
        gf_FormSetValue('savePopPubwks020' , 'confmSeSn' , dtlConfmSeSn , 'text');
        gf_FormSetValue('savePopPubwks020' , 'confmSttusCode' , dtlConfmSttusCode , 'text');
        gf_FormSetValue('savePopPubwks020' , 'confmSttusCodeNm' , dtlConfmSttusCodeNm , 'text');
        
        if((!gf_IsNull(dtlRegId) && dtlRegId != sessionUserEmpno && "MHSMNG000" == gv_SecondLvlMenuId) || (!gf_IsNull(dtlConfmSttusCode))){  // 등록자와 접속자 아이디가 다르고 관리자 페이지일 때나 승인상태일 때 비활성화
        	$("#savePopTablePubwks020 *").attr("disabled" , true);
        	$("#btnPopFormPrgSave").hide();
        	$("#btnPopupPrgDelete").hide();
        }
        
        if("MHSMNG000" != gv_SecondLvlMenuId){
        	$("#popReturnBtn").hide();
        	$("#popApprovalBtn").hide();
        }
        
        if(dtlConfmSttusCode == '003'){
        	$("#popCopyBtn").show();
        }
        else{
        	$("#popCopyBtn").hide();
        }
        
        if(!gf_IsNull(dtlConfmSttusCode)){
        	$("#popApprovalRequestBtn").hide();
        }
        else{
        	$("#popApprovalRequestBtn").show();
        }
        
        $("#savePopPubwks020").validate({ errorElement: 'div', ignore: '' });
        
        $("#confmSttusCodeNmSaveFormPubwks020").attr("disabled" , true);
        
        fn_SearchHistory();
    };
    
    var cf_SetEventListenerMpsbsc006Popup = function (){
        $('#btnPopFormPrgSave').unbind('click').bind('click', function(event){
            gf_errorMsgClear();
            gf_DivMsgConfirm(gv_QueSave, 'fn_SavePubwks020()', '');
        });
        $('#btnPopupPrgDelete').unbind('click').bind('click', function(event){
            gf_errorMsgClear();
            if("002" == dtlConfmSttusCode){
                gf_DivMsgAlert("승인 건은 삭제하실 수 없습니다.");            	
            }
            else{
                gf_DivMsgConfirm(gv_QueDelete, 'fn_DeletePubwks020()', '');
            }
        });
        $('#btnPopupPrgClose').unbind('click').bind('click', function(event){
        	gf_errorMsgClear();
        	$('#popupDtlRequst .b-close').click();
        });
        $('#popApprovalRequestBtn').unbind('click').bind('click', function(event){
        	gf_errorMsgClear();
            if("002" == dtlConfmSttusCode){
            	gf_DivMsgAlert("승인 건은 승인요청 하실 수 없습니다.");
            }
            else if("001" == dtlConfmSttusCode){
            	gf_DivMsgAlert("이미 승인신청 상태 입니다.");
            }
            else{
            	if($("#savePopPubwks020").validate().form()){
                	fn_ConfmSttusUpdate("approvalRequest", "single");
            	}
            }
        });
        $('#popReturnBtn').unbind('click').bind('click', function(event){
        	gf_errorMsgClear();
        	if("002" == dtlConfmSttusCode){
        		gf_DivMsgAlert("승인 건은 반려 하실 수 없습니다.");
        	}
        	else if(gf_IsNull(dtlConfmSttusCode) || "003" == dtlConfmSttusCode){
        		gf_DivMsgAlert("승인신청을 먼저 하여 주세요.");
        	}
        	else{
        		fn_ReturnResnPopup("single");
//             	fn_ConfmSttusUpdate("return", "single");
        	}
        });
        
        $('#popApprovalBtn').unbind('click').bind('click', function(event){
        	gf_errorMsgClear();
        	if(gf_IsNull(dtlConfmSttusCode) || "003" == dtlConfmSttusCode){
        		gf_DivMsgAlert("승인신청을 먼저 하여 주세요.");
        	}
        	else if("002" == dtlConfmSttusCode){
        	    gf_DivMsgAlert("이미 승인 상태 입니다.")
        	}
        	else{
            	fn_ConfmSttusUpdate("approval", "single");
        	}
        });
        
        $('#savePopPubwks020 div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
        
        $("#popCopyBtn").unbind('click').bind('click', function(event){
        	gf_errorMsgClear();
        	fn_CopyPubwks020Popup();
        });
        	
        $('#savePopPubwks020').attr("autocomplete" , "off");
    };
    
    
    var fn_SavePubwks020 = function(){
    	var shiftWorkAtYn ;

    	if(gf_FormGetValue('savePopPubwks020', 'shiftWorkAt', 'chkbox') == 'on'){
    		shiftWorkAtYn = '1';
    	}
    	else {
    		shiftWorkAtYn = '0';
    	}
        if($('#savePopPubwks020').validate().form()){
            var jsonParameter = {
            	    empno : gf_FormGetValue('savePopPubwks020', 'empno', 'text'),
            	    workDay : gf_FormGetValue('savePopPubwks020', 'workDay', 'text').replaceAll('-',''),
            	    workBeginTime : gf_FormGetValue('savePopPubwks020', 'workBeginTime', '').replaceAll(':',''),
            	    workEndTime : gf_FormGetValue('savePopPubwks020', 'workEndTime', '').replaceAll(':',''),
            	    wrkplcNm : gf_FormGetValue('savePopPubwks020' , 'wrkplcNm' , 'text'),
            	    recogTime : gf_FormGetValue('savePopPubwks020', 'recogTime', 'text'),
            	    confmSeSn : gf_FormGetValue('savePopPubwks020', 'confmSeSn', 'text'),
            	    confmSttusCode : gf_FormGetValue('savePopPubwks020', 'confmSttusCode', 'text'),
            	    shiftWorkAt : shiftWorkAtYn
            }
    //         console.log(jsonParameter);
            var url = "pubwks020/savePubwks020";
            var dataSource =  gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000'){
                gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                $('#popupDtlRequst .b-close').click();
                fn_MakeCalendar();
            }
            else{
                gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
            }
        }
    }
    var fn_DeletePubwks020 = function(){
        var jsonParameter = {
        		empno : dtlEmpno,
        		workDay : dtlWorkDay,
        		confmSeSn : dtlConfmSeSn
        }
        var url = "pubwks020/deletePubwks020";
        var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'GET');
        if(dataSource.code === '000'){
            gf_DivMsgAlert(gf_LocaleTrans('default','msgDelete'));
            $('#popupDtlRequst .b-close').click();
            fn_MakeCalendar();
        }
        else{
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
        }    }
    //값 선택 
    var fn_SelectedItem =function (){

    }
    var fn_SearchHistory = function(){
    	var jsonParameter = {
    		empno : dtlEmpno,
    		workDay : dtlWorkDay,
    		confmSeSn : dtlConfmSeSn
    	}
        gf_Transaction('', 'pubwks020/searchHistoryPubwks020', jsonParameter, 'fn_CallbackSearchHistory', false, 'GET');
    }
    var fn_CallbackSearchHistory = function(strSvcID, targetID, data){
//      console.log(data);
        dhxGridPubwks020Popup.clearAll();
        if(!gf_IsNull(data.data.records)){
        	dhxGridPubwks020Popup.parse(data.data.records, 'js');
        	dhxGridPubwks020Popup.selectRow(0);
            gf_NoFoundDataOnGridMsgRemove('dataListPubwks020Popup');
//             fn_MakeCalendar();
        } 
        else {
//            gf_DivMsgAlert(gv_MsgNoData);
            gf_NoFoundDataOnGridMsg('dataListPubwks020Popup'); 
        }
//         $("#spanCntSearchFormPubwks020").text(data.data.records.length);
//        cf_SetEventListenerPopupMenu();
    }
    
    var fn_CopyPubwks020Popup = function(){
    	var confmSttusCode = gf_FormGetValue('savePopPubwks020', 'confmSttusCode', 'text').trim();
        var shiftWorkAtYn ;

        if(gf_FormGetValue('savePopPubwks020', 'shiftWorkAt', 'chkbox') == 'on'){
            shiftWorkAtYn = '1';
        }
        else {
        	shiftWorkAtYn = '0';
        }
        
    	if(confmSttusCode == '003'){
        	var jsonParameterForCopy = {
                    empno : gf_FormGetValue('savePopPubwks020', 'empno', 'text'),
                    workDay : gf_FormGetValue('savePopPubwks020', 'workDay', 'text').replaceAll('-',''),
                    confmSeSn : gf_FormGetValue('savePopPubwks020', 'confmSeSn', 'text')
        	}
            var dataSource = gf_NoAsyncTransaction('pubwks020/copyPubwks020', jsonParameterForCopy , 'POST'); 
            var data = dataSource.data;
            if(data.code == '000'){
                gf_DivMsgAlert(gv_MsgSave);
                $('#popupDtlRequst .b-close').click();
                fn_MakeCalendar();
            }
            else{
            	gf_DivMsgAlert(gv_MsgFail);
            }
    	}
    	else{
    		gf_DivMsgAlert("반려 상태만 복사 하실 수 있습니다.")
    	}
    }
 
    $(function() {
        cf_InitParamPopup();
        cf_SetComponentsPubwks020Popup();
        cf_SetEventListenerMpsbsc006Popup();
    });
    
 
    
    
    </script>
    <div class="pop-content">
    <div>
        <div class="detail_type01">
            <form id="savePopPubwks020" autocomplete="off">
                <input type="hidden" name="empno" id="empnoSavePopPubwks020"/>
                <input type="hidden" name="workDay" id="workDaySaveFormPubwks020"/>
                <input type="hidden" name="recogTime" id="recogTimeSaveFormPubwks020"/>
                <input type="hidden" name="confmerEmpno" id="confmerEmpnoSaveFormPubwks020"/>
                <input type="hidden" name="confmSttusCode" id="confmerSttusCodeSaveFormPubwks020"/>
                <input type="hidden" name="confmSeSn" id="confmerSeSnSaveFormPubwks020"/>
                
                <table id="savePopTablePubwks020">
                    <colgroup>
                        <col width="80">
                        <col width="110">
                        <col width="80">
                        <col width="110">
                    </colgroup>
                    <tr>
                        <th>근무일<!-- <taglibs:transText progrmId="default" key="titWorkDay"/> --></th>
                        <td colspan="1"><input type="text" name="workDay" id="workDaySavePopPubwks020" maxlength="10" style="width: 96%" readonly/></td>
                        <th class="essential_icon">근무지 명<!-- <taglibs:transText progrmId="default" key="titWrkplcNm"/> --></th>
                        <td colspan="1"><input type="text" name="wrkplcNm" id="wrkplcNmSaveFormPubwks020" maxlength="100" style="width: 96%" required/></td>
                    </tr>
                    <tr>
                        <tr>
                            <th>근무 시간<!-- <taglibs:transText progrmId="default" key="titWorkBeginTime"/> --></th>
                            <td colspan="3">
                                <input type="time" name="workBeginTime" id="workBeginTimeSaveFormPubwks020"/>
                                &nbsp; ~ &nbsp;
                                <input type="time" name="workEndTime" id="workEndTimeSaveFormPubwks020"/>
                            </td>
                        </tr>
                        <tr>
                            <th>교대 근무 여부<!-- <taglibs:transText progrmId="default" key="titShiftWorkAt"/> --></th>
                            <td colspan="1">
                                <div class="checkbox">
                                    <label><input type="checkbox" name="shiftWorkAt" id="shiftWorkAtSaveFormPubwks020" maxlength="1"/><i class="input-helper"></i></label>
                                </div>
                            </td>
                            <th>승인 상태</th>
                            <td>
                                <input type="text" name="confmSttusCodeNm" id="confmSttusCodeNmSaveFormPubwks020" style="width: 96%"/>
                            </td>
                        </tr>
                    </tr>
                </table>
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <div class="left ml5"><span class="s_tit"><i class="axi axi-chevron-right"></i>이력</span></div>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
            </div>            
                <div>
                    <div id="dataListPubwks020Popup" style="width: 100%; height: 240px;" class="div_liner"> <!-- 그리드 영역 -->
                    </div>
                </div>
                <div class="popup_footer_box">
                    <div style="float:left; display:inline;">
                        <button type="button" id="popApprovalRequestBtn">승인신청</button>
                        <button type="button" id="popCopyBtn">복사</button>
                        <button type="button" id="popReturnBtn">반려</button>
                        <button type="button" id="popApprovalBtn">승인</button>
                    </div>  
                    <button type="button" id="btnPopFormPrgSave" name="btnPopFormPrgSave">
                          <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span><taglibs:transText progrmId="default" key="btnSave" />
                    </button>
                    <button type="button" id="btnPopupPrgDelete" name="btnPopupPrgDelete">
                          <span class="glyphicon glyphicon-remove f15 mr5"></span><taglibs:transText progrmId="default" key="btnDelete" />
                    </button>                
                    <button type="button" id="btnPopupPrgClose" name="btnPopupPrgClose">
                          <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                    </button>
                </div>
            </form>                
        </div>
        </div>
    </div>
</body>