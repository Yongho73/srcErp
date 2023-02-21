<!-- 
 *    프로그램       : 국내출장신청 상세 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.29
 *    사용테이블      : MHS_BSRP_DETAIL
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
    <script>
    var paramBsrpNo = '${paramBsrpNo}';    // 신규 작성 , 상세 조회 구분 하기 위한 출장번호
    var paramElctsctSttusCode = '${paramElctsctSttusCode}'; // 전자결재상태 코드
    var paramElctsctSeSn = '${paramElctsctSeSn}'; // 전자결재구분순번
    var paramCopyFlag = '${paramCopyFlag}';
    var formBsrpLeftCalender; //출장시작일자 폼(입력) 달력
    var formBsrpRightCalender; //출장종료일자 폼(입력) 달력
    var dhxDtlPopupGrid;
    var amtArray = []; // 페이지 실행 시 출장비 구분 코드 세팅
    var dbAmtArray = []; // 상세 조회 출장구분코드 수정시 금액 변경 대비 배열 (테이블에서 가져온 기존의 금액)
    var oldBsrpSeCode;  // 상세 조회시 출장구분코드
    
    var cf_InitParamPopup = function() {
        fn_Calender();
        fn_FindBsrpSeCodeKindAmt(); // 출장구분 및 직책에 맞는 금액
    };
    
    var cf_SetComponentsPopup = function() {
        var dhxDtlGridPubwks016HeaderInfo = [];
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('전자결재구분순번', '*', 'center', 'str', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'center', 'str', 'ro', false, 'bsrpEmpno', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('부서', '80', 'center', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('직급', '80', 'center', 'str', 'ro', false, 'clsfCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
      
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('직급코드', '80', 'center', 'str', 'ro', true, 'clsfCode', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('사업장코드', '*', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장번호', '*', 'center', 'str', 'ro', true, 'bsrpNo', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장방문처', '*', 'center', 'str', 'ro', true, 'visitOfficNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('방문내용', '*', 'center', 'str', 'ro', true, 'visitCn', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('일비용', '*', 'right', 'str', 'edn', false, 'dayAmt', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('식대', '*', 'right', 'str', 'edn', false, 'cgffdAmt', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('숙박료', '*', 'right', 'str', 'edn', false, 'stayngAmt', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('교통비', '*', 'right', 'str', 'edn', false, 'trnsportAmt', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('현지교통비(일비)', '*', 'right', 'str', 'ro', true, 'localTrnsportAmt', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('직무대행사원번호', '*', 'center', 'str', 'ro', true, 'dtyVrscEmpno', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
               
        dhxDtlPopupGrid =  gf_MakeDhxGrid('dataDtlListPubwks016', dhxDtlGridPubwks016HeaderInfo, true, false, false);
        dhxDtlPopupGrid.enableAutoWidth(false);
        if(!gf_IsNull(paramElctsctSttusCode) && paramElctsctSttusCode != '40'){
            dhxDtlPopupGrid.setEditable(false);
        }else{
            dhxDtlPopupGrid.setEditable(true);
        }
        
        //숫자 콤마부여하기 
        dhxDtlPopupGrid.setNumberFormat("0,000", dhxDtlPopupGrid.getColIndexById("dayAmt"), ".", ",");
        dhxDtlPopupGrid.setNumberFormat("0,000", dhxDtlPopupGrid.getColIndexById("cgffdAmt"), ".", ",");
        dhxDtlPopupGrid.setNumberFormat("0,000", dhxDtlPopupGrid.getColIndexById("stayngAmt"), ".", ",");
        dhxDtlPopupGrid.setNumberFormat("0,000", dhxDtlPopupGrid.getColIndexById("trnsportAmt"), ".", ",");
        
        dhxDtlPopupGrid.setColumnMinWidth(100,4); //넓이가 * 인 컬럼의 최소 넓이값 설정

        gf_ComboCode('bsrpSeCodeSaveFormPubwks016', 'SavebsrpSeCode', 'saveBsrpSeCode', 'sel', 'C024', '' , '', '', 'ordr', 'required','',''); //출장구분
        gf_ComboCode('trnsportSeCodeSaveFormPubwks016', 'SavetrnsportSeCode', 'saveTrnsportSeCode', 'sel', 'C059', '' , '', '', 'ordr', 'required','',''); //출장구분
        
        // 신청일자 , 신청자 비활성화
        $('#saveFormPubwks016 #reqstEmpNmSaveFormPubwks016').prop('disabled', true);
        $('#saveFormPubwks016 #reqstDeSaveFormPubwks016').prop('disabled', true);
        
        // 신규일 시 삭제 버튼 숨김
        if(gf_IsNull(paramBsrpNo)){
        	$('#btnPopupPrgDelete').hide();
        }
        
        //필수항목 체크 
        $("#saveFormPubwks016").validate({ errorElement: 'div', ignore: '' });   
        
        if(paramElctsctSttusCode == '20' && paramCopyFlag <= 0){
            $("#btnPopFormPrgCopy").show();             
        }
        else{
        	$("#btnPopFormPrgCopy").hide();
        }
     
    };
    
    var cf_SetEventListenerPopup = function(){
        //저장 
        $('#btnPopFormPrgSave').unbind('click').bind('click', function() {
        	gf_DivMsgConfirm(gv_QueSave, "fn_SavePopupPubwks016()", '');
        });
        
        $('#btnPopupPrgDelete').unbind('click').bind('click', function() {
            fn_RemovePubwks016();
        });
        
        $("#btnPopFormPrgCopy").unbind('click').bind('click' , function(){
        	if(paramElctsctSttusCode == '20' && paramCopyFlag <= 0){
            	fn_SaveCopyPopupPubwks016();	        		
        	}
        	else{
        	    gf_DivMsgAlert("이미 등록된 데이터가 존재합니다.");
        	}
        });
        //폼 입력 출장일자
        $('#saveFormPubwks016 .input_calen').unbind('keyup').bind('keyup', function(event){
            dateChk($(this));
            if((event.keyCode == 13 || event.keyCode == 9) && !gf_IsNull(gf_FormGetValue('saveFormPubwks016', 'bsrpEdt', 'text'))){
                var bDay = gf_FormGetValue('saveFormPubwks016', 'bsrpSdt', 'text');
                var aDay = gf_FormGetValue('saveFormPubwks016', 'bsrpEdt', 'text');
                
               gf_FormSetValue("saveFormPubwks016", "stayng" , fn_DateMinus(bDay , aDay) , '');
               gf_FormSetValue("saveFormPubwks016", "stayngDaycnt" , fn_DateMinus(bDay , aDay) + 1 , '');
            }
        });
        $('#saveFormPubwks016 #bsrpSdtSaveFormPubwks016').unbind('change blur').bind('change blur',function(event){
            var tmp = gf_FormGetValue('saveFormPubwks016', 'bsrpSdt', 'text');
            var Sdate = new Date(tmp);
            Sdate.setDate(Sdate.getDate() - 1);
            formBsrpRightCalender.setInsensitiveRange(null , Sdate);	
        });
        $('#saveFormPubwks016 #bsrpEdtSaveFormPubwks016').unbind('change blur').bind('change blur',function(event){
            var tmp = gf_FormGetValue('saveFormPubwks016', 'bsrpEdt', 'text');
            var Edate = new Date(tmp);
            Edate.setDate(Edate.getDate() + 1);
            formBsrpLeftCalender.setInsensitiveRange(Edate , null);    
        });        

        $('#saveFormPubwks016 #bsrpShrSaveFormPubwks016').unbind('keyup').bind('keyup', function(event){
//             timeChk($(this));
        });

        $('#saveFormPubwks016 #bsrpEhrSaveFormPubwks016').unbind('keyup').bind('keyup', function(event){
//             timeChk($(this));
        });
        
        $('#saveFormPubwks016 #bsrpSdtSaveFormPubwks016').unbind('click').bind('click', function(event){
            formBsrpLeftCalender.show();
        });
        
        $('#saveFormPubwks016 #bsrpEdtSaveFormPubwks016').unbind('click').bind('click', function(event){
            formBsrpRightCalender.show();
        });
        //사원팝업
        $('#searchFormMhsEmp #btnEmpSearch').unbind('click').bind('click', function(event){
        	gf_MultiEmpPopup("dataDtlListPubwks016","empNo","korNm", "" , "N", "fn_CallbackSearchEmpCode");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
        });
        //출장자 삭제
        $('#searchFormMhsEmp #btnEmpRemove').unbind('click').bind('click', function(event){
            var rowId = dhxDtlPopupGrid.getSelectedRowId();
            if(gf_IsNull(rowId)) {
                gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
                return false;
            } else {
                var state;
                state = dhxDataProcessorDtlPopProc.getState(rowId);
                if(state == 'inserted') {
                    var rowNum = dhxDtlPopupGrid.getRowIndex(rowId);
                    dhxDtlPopupGrid.deleteRow(rowId);
                    dhxDtlPopupGrid.selectRow(rowNum);
                }
                else {
                   dhxDataProcessorDtlPopProc.setUpdated(rowId, true, 'deleted');
                }
            }            
        });
        
        //출장구분코드 수정 
        $('#SavebsrpSeCode').unbind('change').bind('change', function() {           
            fn_BsrpSeCodeKindAmt(); // 출장구분코드 별 출장자들의 금액 값 변경
                                    // 국내출장 - 출장비기준코드 (1) 의 금액
                                    // 시내출장 - 0원으로 세팅
        });    
        
        $('#saveFormPubwks016').attr("autocomplete" , "off");
    };
    
    var cf_SetBindingPubwks016 = function(){
    	fn_DataProcessor();
    };
    
    var fn_SaveCopyPopupPubwks016 = function(){
    	var jsonParameterForCopy = {
    		bsrpNo : paramBsrpNo,
    	    elctsctSeSn : paramElctsctSeSn
    	}
    	var dataSource = gf_NoAsyncTransaction('pubwks016/saveCopyPubwks016' ,jsonParameterForCopy , 'GET');
        if(dataSource.data.code == '000'){
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            $('#popupDtlRequst .b-close').click();
            fn_SearchPubwks016('');
        }
        else{
            gf_DivMsgAlert("이미 등록된 데이터가 존재합니다.");
        }
    }
    
    var fn_SearchInput = function(){
        if(gf_IsNull(paramBsrpNo)){         // 신규 작성
            gf_FormSetValue("saveFormPubwks016", "reqstDe", new Date().format('YYYY-MM-DD') , '');
            gf_FormSetValue("saveFormPubwks016", "reqstEmpNm", gf_FormGetValue('searchFormPubwks016', 'searchEmpCodeNm', 'text') , '');   

            gf_FormSetValue("saveFormPubwks016", "bsrpShr", "09:00" , '');
            gf_FormSetValue("saveFormPubwks016", "bsrpEhr", "18:00" , '');

            //신청자 대상자 현황 추가
            var jsonParameter = {
                empno : gf_FormGetValue('searchFormPubwks016', 'searchEmpNo', 'text')
            };
            var dataSource = gf_NoAsyncTransaction('emp/searchEmp', jsonParameter, 'GET');
            var data = dataSource.data.records;

            var initValueArr = [];
            initValueArr.push('');
            initValueArr.push(paramElctsctSeSn);          // 전자결재구분순번
            initValueArr.push(data[0].empno);          // 사원번호
            initValueArr.push(data[0].korNm);          // 성명
            initValueArr.push(data[0].deptCodeNm);     // 부서 이름
            initValueArr.push(data[0].clsfCodeNm);     // 직급 이름
            
            initValueArr.push(data[0].clsfCode);       // 직급코드
            initValueArr.push(data[0].bplcCode);       // 사업장 코드
            initValueArr.push('');       // 출장번호
            initValueArr.push('');       // 출장 방문처
            initValueArr.push('');       // 방문 내용
            initValueArr.push('0');       // 일비용
            initValueArr.push('0');       // 식대
            initValueArr.push('0');       // 숙박료
            initValueArr.push('0');       // 교통비
            initValueArr.push('0');       // 현지 교통비(일비)
            initValueArr.push('');       // 직무 대행 사원번호
            
            dhxDtlPopupGrid.addRow(dhxDtlPopupGrid.uid(), initValueArr , 0);
            dhxDtlPopupGrid.selectRow(0);
            
        }
        else if(!gf_IsNull(paramBsrpNo)){                               // 상세 조회
            var jsonParameter = {
                bsrpNo : paramBsrpNo,
                elctsctSeSn : paramElctsctSeSn
            };
            var dataSource = gf_NoAsyncTransaction('pubwks016/findPubwks016' ,jsonParameter , 'GET');
            var data = dataSource.data;
            gf_FormSetValue('saveFormPubwks016' , 'reqstDe' , data.reqstDe , '');
            gf_FormSetValue('saveFormPubwks016' , 'reqstEmpNm' , data.reqstEmpNm , '');
            gf_FormSetValue('saveFormPubwks016' , 'saveBsrpSeCode' , data.bsrpSeCode , 'combo');
            gf_FormSetValue('saveFormPubwks016' , 'saveTrnsportSeCode' , data.trnsportSeCode , 'combo');
            gf_FormSetValue('saveFormPubwks016' , 'bsrpNm' , data.bsrpNm , '');
            gf_FormSetValue('saveFormPubwks016' , 'bsrpPurps' , data.bsrpPurps , 'textarea');
            gf_FormSetValue('saveFormPubwks016' , 'bsrpCity' , data.bsrpCity , '');
            gf_FormSetValue('saveFormPubwks016' , 'bsrpSdt' , data.bsrpSdt , '');
            gf_FormSetValue('saveFormPubwks016' , 'bsrpEdt' , data.bsrpEdt , '');
            gf_FormSetValue('saveFormPubwks016' , 'bsrpShr' , data.bsrpShr , '');
            gf_FormSetValue('saveFormPubwks016' , 'bsrpEhr' , data.bsrpEhr , '');
            gf_FormSetValue('saveFormPubwks016' , 'stayng' , data.stayng , '');
            gf_FormSetValue('saveFormPubwks016' , 'stayngDaycnt' , data.stayngDaycnt , '');
            
            var jsonParameter = {
                    bsrpNo : paramBsrpNo,
                    elctsctSeSn : paramElctsctSeSn
                };
            gf_Transaction( '', 'pubwks016/findDtlPubwks016', jsonParameter, 'fn_CallbackSearchDtlListPop', false, 'GET');

            oldBsrpSeCode = gf_FormGetValue('saveFormPubwks016', 'saveBsrpSeCode', 'combo'); // 상세 조회시 기존의 출장구분코드 
            
            if(!gf_IsNull(paramElctsctSttusCode) && paramElctsctSttusCode != '40'){
                $("#SavebsrpSeCode").attr("style", "width: 223px"); 
                $("#SavetrnsportSeCode").attr("style", "width: 223px");
            	$("#SavebsrpSeCode").attr("disabled", true); 
                $("#SavetrnsportSeCode").attr("disabled", true);
                $("#bsrpNmSaveFormPubwks016").attr("disabled", true);
                $("#bsrpPurpsSaveFormPubwks016").attr("readonly", true);
                $("#bsrpPurpsSaveFormPubwks016").attr("style", "width:96%; height: 25px");
                $("#visitOfficNmSaveFormPubwks016").attr("disabled", true);
                $("#bsrpSdtSaveFormPubwks016").attr("disabled", true);
                $("#bsrpShrSaveFormPubwks016").attr("disabled", true);
                $("#bsrpEdtSaveFormPubwks016").attr("disabled", true);
                $("#bsrpEhrSaveFormPubwks016").attr("disabled", true);
                $("#stayngSaveFormPubwks016").attr("disabled", true);
                $("#stayngDaycntSaveFormPubwks016").attr("disabled", true);
                $("#btnEmpSearch").hide();
                $("#btnEmpRemove").hide();
                $("#btnPopFormPrgSave").hide();
           }
        }
    };
    var fn_CallbackSearchDtlListPop = function(strSvcID, targetID, data) {
    	dhxDtlPopupGrid.clearAll();
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dhxDtlPopupGrid');
            dhxDtlPopupGrid.parse(data.data.records, 'js');
            dbAmtArray = data.data.records;    // 출장구분코드 수정시 금액 변경 대비 배열
        } else {
            gf_NoFoundDataOnGridMsg('dhxDtlPopupGrid');
        }
    }; 
    
    var fn_SavePopupPubwks016 = function(){
    	var gridCnt = 0;
    	dhxDtlPopupGrid.forEachRow(function(row){
    		state = dhxDataProcessorDtlPopProc.getState(row);
    		if(state != 'deleted'){
    		   gridCnt += 1;  			
    		}
    	});
        var timeVal1 = gf_FormGetValue('saveFormPubwks016', 'bsrpShr', '');
        var timeVal2 = gf_FormGetValue('saveFormPubwks016', 'bsrpEhr', '');
        var time1 = timeVal1.split(":");
        var time2 = timeVal2.split(":");

        if(time1[0] > 24 || time1[1] > 60 || gf_IsNull(time1[0]) || gf_IsNull(time1[1])){
            gf_DivMsgAlert("출장 시작 시간을 확인하여 주세요.");
            return;
        }
        else if(time2[0] > 24 || time2[1] > 60 || gf_IsNull(time2[0]) || gf_IsNull(time2[1])){
            gf_DivMsgAlert("출장 졸료 시간을 확인하여 주세요.");
            return;
        }
        else if(gridCnt <= 0){
            gf_DivMsgAlert("출장 대상자를 추가하여 주세요.");
            return;
        }
        else if($('#saveFormPubwks016').validate().form()){
            var jsonParameter = {
                bsrpNo : paramBsrpNo,
                elctsctSeSn : paramElctsctSeSn,
                reqstDe : gf_FormGetValue('saveFormPubwks016', 'reqstDe', 'text'),
                reqstEmpno : gf_FormGetValue('searchFormPubwks016', 'searchEmpNo', 'text'),
                bplcCode : gf_FormGetValue('searchFormPubwks016', 'searchBplcCode', 'text'),
                bsrpSeCode : gf_FormGetValue('saveFormPubwks016', 'saveBsrpSeCode', 'combo'),
                trnsportSeCode : gf_FormGetValue('saveFormPubwks016', 'saveTrnsportSeCode', 'combo'),
                bsrpNm : gf_FormGetValue('saveFormPubwks016', 'bsrpNm', 'text'),
                bsrpPurps : gf_FormGetValue('saveFormPubwks016', 'bsrpPurps', 'textarea'),
                bsrpCity : gf_FormGetValue('saveFormPubwks016', 'bsrpCity', 'text'),
                bsrpSdt : gf_FormGetValue('saveFormPubwks016', 'bsrpSdt', 'text').replaceAll('-',''),
                bsrpEdt : gf_FormGetValue('saveFormPubwks016', 'bsrpEdt', 'text').replaceAll('-',''),
                bsrpShr : gf_FormGetValue('saveFormPubwks016', 'bsrpShr', 'text').replaceAll(':',''),
                bsrpEhr : gf_FormGetValue('saveFormPubwks016', 'bsrpEhr', 'text').replaceAll(':',''),
                stayng : gf_FormGetValue('saveFormPubwks016', 'stayng', 'text'),
                stayngDaycnt : gf_FormGetValue('saveFormPubwks016', 'stayngDaycnt', 'text')
                
            };
            var url = "pubwks016/savePubwks016";
            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000'){
                if(gf_IsNull(paramBsrpNo)){
                	dhxDtlPopupGrid.forEachRow(function(row){
                		gf_DhxSetValue(dhxDtlPopupGrid, row, 'elctsctSeSn', '1' , 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'bsrpNo', dataSource.data.newBsrpNo , 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'visitOfficNm', gf_FormGetValue('saveFormPubwks016', 'bsrpCity', 'text') , 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'visitCn', gf_FormGetValue('saveFormPubwks016', 'bsrpPurps', 'textarea') , 'grid');
                    });
                }
                else{
                    dhxDtlPopupGrid.forEachRow(function(row){
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'visitOfficNm', gf_FormGetValue('saveFormPubwks016', 'bsrpCity', 'text') , 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'visitCn', gf_FormGetValue('saveFormPubwks016', 'bsrpPurps', 'textarea') , 'grid');
                        dhxDataProcessorDtlPopProc.setUpdated(row, true, 'updated');
                    });
                }
                dhxDataProcessorDtlPopProc.sendData();
            }
        }
    }
    
    
    var fn_DataProcessor = function() {
        // 그리드입력 데이터프로세스 정의
        dhxDataProcessorDtlPopProc = new dataProcessor(gv_ContextPath+'/pubwks016/saveDtlPubwks016'); //lock feed url
        dhxDataProcessorDtlPopProc.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
        dhxDataProcessorDtlPopProc.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
        dhxDataProcessorDtlPopProc.init(dhxDtlPopupGrid); //link dataprocessor to the grid
        dhxDataProcessorDtlPopProc.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
        dhxDataProcessorDtlPopProc.styles = {
                        updated:        "font-weight:normal;text-decoration:none;",
                        inserted:       "font-weight:bold; color:green;",
                        deleted:        "color:orange; text-decoration:line-through;",
                        invalid:        "color:green; text-decoration:underline;",
                        error:          "color:blue; text-decoration:underline;",
                        clear:          "font-weight:normal;text-decoration:none;"
        };
        dhxDataProcessorDtlPopProc.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
                if (dataSource.code == "000" || dataSource.data.code !== "000"){
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                        $('#popupDtlRequst .b-close').click();
                        fn_SearchPubwks016(''); //부모창 새로고침   
                        return true;
                } else {
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                        return false;
                }
        });
    }
    
    var fn_CallbackSearchEmpCode = function(data){
    	var kind = gf_FormGetValue('saveFormPubwks016', 'saveBsrpSeCode', 'combo');
        dhxDtlPopupGrid.forEachRow(function(index){
            for(row in data){
                if(gf_DhxGetValue(dhxDtlPopupGrid, index, 'bsrpEmpno', 'grid') == data[row].empno){
                    delete data[row];
                }        	
            }
        });
    	for(row in data){
    		var gridDayAmt = "0";
            var gridCgffdAmt = "0";
            var gridStayngAmt = "0";
            var gridTrnsportAmt = "0";
            for(var index=0 ; index < amtArray.length ; index++){
            	if(data[row].clsfCode == amtArray[index].clsfCode && kind == amtArray[index].bsrpSeCode){
            		gridDayAmt = amtArray[index].dayctAmt;
                    gridCgffdAmt = amtArray[index].cgffdAmt;
                    gridStayngAmt = amtArray[index].stayngctAmt;
                    gridTrnsportAmt = amtArray[index].trnsportctAmt;
            	}
            }
            var initValueArr = [];
            initValueArr.push('');
            initValueArr.push(paramElctsctSeSn);          // 전자결재구분순번
            initValueArr.push(data[row].empno);          // 사원번호
            initValueArr.push(data[row].korNm);          // 성명
            initValueArr.push(data[row].deptCodeNm);     // 부서 이름
            initValueArr.push(data[row].clsfCodeNm);     // 직급 이름
            
            initValueArr.push(data[row].clsfCode);       // 직급 코드
            initValueArr.push(data[row].bplcCode);       // 사업장 코드
            initValueArr.push(paramBsrpNo);       // 출장번호
            initValueArr.push('');       // 출장 방문처
            initValueArr.push('');       // 방문 내용
            
            initValueArr.push(gridDayAmt);       // 일비용
            initValueArr.push(gridCgffdAmt);       // 식대
            initValueArr.push(gridStayngAmt);       // 숙박료
            initValueArr.push(gridTrnsportAmt);       // 교통비
            initValueArr.push('0');       // 현지 교통비(일비)
            initValueArr.push('');       // 직무 대행 사원번호
            
            dhxDtlPopupGrid.addRow(dhxDtlPopupGrid.uid(), initValueArr , 0);
            dhxDtlPopupGrid.selectRow(0);
            
    	}
    }
    var fn_BsrpSeCodeKindAmt = function(){ // 출장 구분별 금액 세팅
    	var kind = gf_FormGetValue('saveFormPubwks016', 'saveBsrpSeCode', 'combo');
        if(!gf_IsNull(paramBsrpNo)){ 
            if(kind == oldBsrpSeCode){ // 출장구분코드 변경 시 기존 구분과 같으면 원래의 금액 세팅
                dhxDtlPopupGrid.forEachRow(function(row){
                	var gridEmpno = gf_DhxGetValue(dhxDtlPopupGrid, row, 'bsrpEmpno', 'grid');
                	var gridClsfCode = gf_DhxGetValue(dhxDtlPopupGrid, row, 'clsfCode', 'grid');
                	if(dbAmtArray[row-1] != null){
                    	var arrBsrpEmpno = dbAmtArray[row-1].bsrpEmpno;
                	}
                	if((gridEmpno == arrBsrpEmpno) && arrBsrpEmpno != null){
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'dayAmt', dbAmtArray[row-1].dayAmt , 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'cgffdAmt', dbAmtArray[row-1].cgffdAmt , 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'stayngAmt', dbAmtArray[row-1].stayngAmt , 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'trnsportAmt', dbAmtArray[row-1].trnsportAmt , 'grid');
                	}
                	else{
                		for(var index=0; index<amtArray.length; i++){
                			if(gridClsfCode == amtArray[index].clsfCode){
                                gf_DhxSetValue(dhxDtlPopupGrid, row, 'dayAmt', amtArray[index].dayctAmt , 'grid');
                                gf_DhxSetValue(dhxDtlPopupGrid, row, 'cgffdAmt', amtArray[index].cgffdAmt , 'grid');
                                gf_DhxSetValue(dhxDtlPopupGrid, row, 'stayngAmt', amtArray[index].stayngctAmt , 'grid');
                                gf_DhxSetValue(dhxDtlPopupGrid, row, 'trnsportAmt', amtArray[index].trnsportctAmt , 'grid');
                			}
                		}
                	}
                });
            }
            else{
                dhxDtlPopupGrid.forEachRow(function(row){
                    var gridClsfCode = gf_DhxGetValue(dhxDtlPopupGrid, row, 'clsfCode', 'grid');
                	for(var index=0; index<amtArray.length; index++){
                        if(gridClsfCode == amtArray[index].clsfCode && kind == amtArray[index].bsrpSeCode){
                            gf_DhxSetValue(dhxDtlPopupGrid, row, 'dayAmt', amtArray[index].dayctAmt, 'grid');
                            gf_DhxSetValue(dhxDtlPopupGrid, row, 'cgffdAmt',amtArray[index].cgffdAmt, 'grid');
                            gf_DhxSetValue(dhxDtlPopupGrid, row, 'stayngAmt',amtArray[index].stayngctAmt, 'grid');
                            gf_DhxSetValue(dhxDtlPopupGrid, row, 'trnsportAmt',amtArray[index].trnsportctAmt, 'grid');
                        }
                        else if(kind == '3'){   // 출장비기준코드 시내출장 0원 작성이 되지 않아 0원 하드코딩
                            gf_DhxSetValue(dhxDtlPopupGrid, row, 'dayAmt', '0', 'grid');
                            gf_DhxSetValue(dhxDtlPopupGrid, row, 'cgffdAmt','0', 'grid');
                            gf_DhxSetValue(dhxDtlPopupGrid, row, 'stayngAmt','0', 'grid');
                            gf_DhxSetValue(dhxDtlPopupGrid, row, 'trnsportAmt','0', 'grid');
                        }
                	}
                });             
            }
        }
        else{
            dhxDtlPopupGrid.forEachRow(function(row){
                var gridClsfCode = gf_DhxGetValue(dhxDtlPopupGrid, row, 'clsfCode', 'grid');
                for(var index = 0 ; index < amtArray.length ; index++){
                	if(gridClsfCode == amtArray[index].clsfCode && kind == amtArray[index].bsrpSeCode){
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'dayAmt', amtArray[index].dayctAmt, 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'cgffdAmt',amtArray[index].cgffdAmt, 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'stayngAmt',amtArray[index].stayngctAmt, 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'trnsportAmt',amtArray[index].trnsportctAmt, 'grid');
                    }
                	else if(kind == '3'){   // 출장비기준코드 시내출장 0원 작성이 되지 않아 0원 하드코딩
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'dayAmt', '0', 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'cgffdAmt','0', 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'stayngAmt','0', 'grid');
                        gf_DhxSetValue(dhxDtlPopupGrid, row, 'trnsportAmt','0', 'grid');
                    }
                }
            });
        }
    }
    
    
    var fn_Calender = function(){
    	//상세 폼 출장기간 달력 생성
//         formBsrpLeftCalender = new dhtmlXDoubleCalendar("saveBsrpTime_cal");
        formBsrpLeftCalender = new dhtmlXCalendarObject({input:"bsrpSdtSaveFormPubwks016"});
        formBsrpRightCalender = new dhtmlXCalendarObject({input:"bsrpEdtSaveFormPubwks016"});
        
        formBsrpLeftCalender.attachEvent("onClick" , function(side , date){
        	var strTime = formBsrpLeftCalender.getDate().toString();
        	var time = strTime.substring(16,21);
            gf_FormSetValue("saveFormPubwks016", "bsrpShr", time , '');

            if(!gf_IsNull(gf_FormGetValue('saveFormPubwks016', 'bsrpEdt', 'text'))){
                var bDay = gf_FormGetValue('saveFormPubwks016', 'bsrpSdt', 'text');
                var aDay = gf_FormGetValue('saveFormPubwks016', 'bsrpEdt', 'text');
                
               gf_FormSetValue("saveFormPubwks016", "stayng" , fn_DateMinus(bDay , aDay) , '');
               gf_FormSetValue("saveFormPubwks016", "stayngDaycnt" , fn_DateMinus(bDay , aDay) + 1 , '');
            }
        });

        formBsrpRightCalender.attachEvent("onClick" , function(side , date){
            var strTime = formBsrpRightCalender.getDate().toString();
            var time = strTime.substring(16,21);
            gf_FormSetValue("saveFormPubwks016", "bsrpEhr", time , '');

            var bDay = gf_FormGetValue('saveFormPubwks016', 'bsrpSdt', 'text');
            var aDay = gf_FormGetValue('saveFormPubwks016', 'bsrpEdt', 'text');
            
           gf_FormSetValue("saveFormPubwks016", "stayng" , fn_DateMinus(bDay , aDay) , '');
           gf_FormSetValue("saveFormPubwks016", "stayngDaycnt" , fn_DateMinus(bDay , aDay) + 1 , '');
        });        
        
        var now = dateFormat(new Date());
//        formBsrpRightCalender.loadUserLanguage("ko"); 

        formBsrpLeftCalender.setDateFormat("%y-%m-%d %H:%i")
        formBsrpLeftCalender.setDate(now + " 09:00");

        formBsrpRightCalender.setDateFormat("%y-%m-%d %H:%i")
        formBsrpRightCalender.setDate(now + " 18:00");

        
        //달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
        formBsrpLeftCalender.loadUserLanguage("ko"); 
        formBsrpRightCalender.loadUserLanguage("ko"); 
        
    }
    var fn_DateMinus = function(toDate , fromDate){
        var sDt = new Date(toDate);
        var eDt = new Date(fromDate);
        
        return Math.ceil((eDt.getTime() - sDt.getTime())/(1000 * 3600 * 24));
    };
    
    var fn_FindBsrpSeCodeKindAmt = function(){
    	var url = "mhshrm010/searchMhshrm010";
        var dataSource = gf_NoAsyncTransaction(url, '', 'GET');
        amtArray = dataSource.data.records;
    }
    
  //날짜 포멧 처리
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
    }
    //입력 내용을 날짜 포멧으로
    function dateChk(objDate){
    	var RegNotNum = /[^0-9]/g;  //숫자 정규식
        var date = objDate.val();
        date = date.replace(RegNotNum, '');

        if (date == "" || date == null || date.length < 5) {
          objDate.val(date);
          return;
        }

        var DataFormat;
        var RegPhonNum;

        // 날짜 포맷(yyyy-mm-dd) 만들기 
        if (date.length <= 6) {
          DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
          RegPhonNum = /([0-9]{4})([0-9]+)/;
        } else if (date.length <= 8) {
          DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
          RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
        }

        while (RegPhonNum.test(date)) {
          date = date.replace(RegPhonNum, DataFormat);
        }

        objDate.val(date);

        // 모두 입력됐을 경우 날짜 유효성 확인
        if (date.length == 10) {
            var isVaild = true;
        
            if (isNaN(Date.parse(date))) {
                // 유효 날짜 확인 여부
                isVaild = false;
            } else {
                // 년, 월, 일 0 이상 여부 확인
                var date_sp = date.split("-");
                date_sp.forEach(function(sp) {
                  if (parseInt(sp) == 0) {
                    isVaild = false;
                  }
                });
            
                // 마지막 일 확인
                var last = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0);
                if (last.getDate() < parseInt(date_sp[2])) {
                    isVaild = false;
                }
            }
            
            if (!isVaild) {
              alert("잘못된 날짜입니다. \n다시 입력하세요.");
              objDate.val("");
              objDate.focus();
              return;
            }
        }
    }

    function timeChk(objTime){
        var time = objTime.val();
        var TimeFormat;
        var RegPhonNum;
        var isValid = true;
        if (time.length >= 1) {
        	DataFormat = "$1:$2"; // 포맷을 바꾸려면 이곳을 변경
            RegPhonNum = /([0-9]{2})([0-9]+)/;
            while (RegPhonNum.test(time)) {
            	time = time.replace(RegPhonNum , DataFormat);
            }
            objTime.val(time);
        }
        
        var time_chk = time.split(":");
        if((time_chk[0] > 23 || time_chk[1] > 59) && time_chk.length >= 1 ){
            isValid = false;
        }
        
        if(!isValid){
        	objTime.val("");        	
        	objTime.focus();
            gf_DivMsgAlert("잘못된 시간입니다. \n다시 입력하세요.");
            return;
        }
        

    }
    
    //팝업창 닫기
    $('#btnPopupPrgClose').unbind('click').bind('click', function() {
        $('#popupDtlRequst .b-close').click();
    });
    
        $(function() {
          cf_SetComponentsPopup();
          cf_InitParamPopup();
          cf_SetEventListenerPopup();
    //      cf_InitFormPubwks016();
          cf_SetBindingPubwks016();
          fn_SearchInput();
     });
    </script>
        <div class="pop-content">
        <div id="saveForm">
                <div class="detail_type01">
                    <form id="saveFormPubwks016" autocomplete=”off”>
                        <input type="hidden" name="bsrpNo" id="reqstBsrpNoSaveFormPubwks016">
                        <table>
                            <colgroup>
                                <col width="100">
                                <col width="">
                                <col width="100">
                                <col width="">
                            </colgroup>
                            <tr>  
                                <th>신청일자<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                <td><input type="text" name="reqstDe" id="reqstDeSaveFormPubwks016" style="width: 218px;"/></td>
                                <th>신청자<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                <td><input type="text" name="reqstEmpNm" id="reqstEmpNmSaveFormPubwks016" style="width: 218px;"/>
                                <input type="hidden" name="reqstEmpno" id="reqstEmpnoSaveFormPubwks016"/></td>
                            </tr>
                            <tr>
                                <th>출장구분코드<!-- <taglibs:transText progrmId="default" key="titBsrpSeCode"/> --></th>
                                <td colspan='1'><div id="bsrpSeCodeSaveFormPubwks016" class="div_combo" style="width: 218px;"></div></td>
                                <th>교통구분코드<!-- <taglibs:transText progrmId="default" key="titBsrpSeCode"/> --></th>
                                <td colspan='1'><div id="trnsportSeCodeSaveFormPubwks016" class="div_combo" style="width: 218px;"></div></td>
                                
                            </tr>
                            <tr>
                                <th>출장명<!-- <taglibs:transText progrmId="default" key="titBsrpNm"/> --></th>
                                <td colspan='3'><input type="text" name="bsrpNm" id="bsrpNmSaveFormPubwks016" maxlength="50" style="width:99%;" required/></td>
                            </tr>
                            <tr>
                                <th>출장목적<!-- <taglibs:transText progrmId="default" key="titBsrpPurps"/> --></th>
                                <td colspan='3'><textarea rows="3"  name="bsrpPurps" id="bsrpPurpsSaveFormPubwks016" style="width:99%;height:30px;" maxlength="1000" required></textarea></td>
                            </tr>
                            <tr>
                                <th>출장장소<!-- <taglibs:transText progrmId="default" key="titBsrpNo"/> --></th>
                                <td colspan='3'><input type="text" name="bsrpCity" id="visitOfficNmSaveFormPubwks016" required style="width:99%" maxlength="50"/></td>
<!--                                 </tr> -->
                            <tr>
                                <th>출장기간<!-- <taglibs:transText progrmId="default" key="titBsrpNo"/> --></th>
                                <td id="saveBsrpDt" colspan='3'>
                                    <input type="text" name="bsrpSdt" id="bsrpSdtSaveFormPubwks016"  class="input_calen" maxlength="10" required/>
                                    <input type="time" name="bsrpShr" id="bsrpShrSaveFormPubwks016"/>
                                     ~ 
                                    <input type="text" name="bsrpEdt" id="bsrpEdtSaveFormPubwks016"  class="input_calen" maxlength="10" required/>
                                    <input type="time" name="bsrpEhr" id="bsrpEhrSaveFormPubwks016"/>
                                </td>
                            </tr>
                            <tr>
                                <th> 숙박기간 </th>
                                <td colspan="3">
                                    <input type="text" name="stayng" id="stayngSaveFormPubwks016" style="width: 30px; text-align:right;" maxlength="2"/>박
                                    <input type="text" name="stayngDaycnt" id="stayngDaycntSaveFormPubwks016" style="width: 30px; text-align:right;" maxlength="2"/>일
                                </td>
                            </tr>
                        </table>                                 
                    </form>
            </div>
        </div>
            <div class="div_title">
                <div class="left ml5"><span class="s_tit"><i class="axi axi-chevron-right"></i>출장자 현황</span></div>
                <div class="right mr5" id="searchFormMhsEmp">
                    <button type="button" id="btnEmpSearch" class="btn_common01_new">대상추가</button>
                    <button type="button" id="btnEmpRemove" class="btn_common01_new">대상삭제</button>
                </div>
            </div>
            <div>
                <div id="dataDtlListPubwks016" style="width: 100%; height: 220px" class="div_liner">
                </div>
            </div>
            <div class="popup_footer_box">
                <button type="button" id="btnPopFormPrgCopy" name="btnPopFormPrgCopy">
                      <span class="glyphicon glyphicon-send f15 mr5"></span>복사
                </button>
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
        </div>
</body>