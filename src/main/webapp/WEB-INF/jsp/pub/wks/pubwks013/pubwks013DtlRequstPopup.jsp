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
    var paramBsrpNo = '${paramBsrpNo}';    // 출장번호 (상세 조회)
    var paramElctsctSeSn = '${paramElctsctSeSn}'; // 전자결제구분순번
    var paramExcclcSn = '${paramExcclcSn}'; // 정산 전자결재 구분 순번
    var paramExcclcElctsctSttusCode = '${paramExcclcElctsctSttusCode}'; // 정산 전자결재 상태 코드
    var paramExcclcElctsctSttusCodeNm = '${paramExcclcElctsctSttusCodeNm}';
    var paramCopyFlag = '${paramCopyFlag}';
    var dhxDtlPopupGrid;                   // 출장비 상세내역
    var dhxDtl2PopupGrid;                  // 출장지 상세내역
    var uploadedFileKeys = []; // db 저장용 (키만 파이프라인으로 구분)
    var uploadedFileInfo = []; // 화면에 저장된 정보 표시용 (삭제 기능) 
    
    var cf_InitParamPopup = function() {

    };
    
    var cf_SetComponentsPopup = function() {
        var dhxDtlGridPubwks013HeaderInfo = [];
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'center', 'str', 'ro', false, 'bsrpEmpno', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('부서', '80', 'center', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('직급', '80', 'center', 'str', 'ro', false, 'clsfCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
      
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('직급코드', '80', 'center', 'str', 'ro', true, 'clsfCode', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('사업장코드', '*', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장번호', '*', 'center', 'str', 'ro', true, 'bsrpNo', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장방문처', '*', 'center', 'str', 'ro', true, 'visitOfficNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('방문내용', '*', 'center', 'str', 'ro', true, 'visitCn', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('일비용', '*', 'right', 'str', 'edn', false, 'dayAmt', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('식대', '*', 'right', 'str', 'edn', false, 'cgffdAmt', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('숙박료', '*', 'right', 'str', 'edn', false, 'stayngAmt', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('교통비', '*', 'right', 'str', 'edn', false, 'trnsportAmt', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('현지교통비(일비)', '*', 'right', 'str', 'ro', false, 'localTrnsportAmt', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxDtlGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('직무대행사원번호', '*', 'center', 'str', 'ro', true, 'dtyVrscEmpno', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        
        dhxDtlPopupGrid =  gf_MakeDhxGrid('dataDtlListPubwks013', dhxDtlGridPubwks013HeaderInfo, true, false, false);
        dhxDtlPopupGrid.enableAutoWidth(false);
        dhxDtlPopupGrid.setEditable(false);
        
        //숫자 콤마부여하기 
        dhxDtlPopupGrid.setNumberFormat("0,000", dhxDtlPopupGrid.getColIndexById("dayAmt"), ".", ",");
        dhxDtlPopupGrid.setNumberFormat("0,000", dhxDtlPopupGrid.getColIndexById("cgffdAmt"), ".", ",");
        dhxDtlPopupGrid.setNumberFormat("0,000", dhxDtlPopupGrid.getColIndexById("stayngAmt"), ".", ",");
        dhxDtlPopupGrid.setNumberFormat("0,000", dhxDtlPopupGrid.getColIndexById("trnsportAmt"), ".", ",");
        
        dhxDtlPopupGrid.setColumnMinWidth(100,4); //넓이가 * 인 컬럼의 최소 넓이값 설정

        var dhxDtl2GridPubwks013HeaderInfo = [];
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'center', 'str', 'ro', true, 'bsrpEmplNo', '', ''));
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장정산순번', '*', 'center', 'str', 'ro', true, 'bsrpExcclcSn', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('정산결재순번', '*', 'center', 'str', 'ro', true, 'excclcSn', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('전자결재구분순번', '*', 'center', 'str', 'ro', true, 'elctsctSeSn', '', ''));
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'bsrpEmpnm', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장일자', '80', 'center', 'str', 'ro', false, 'bsrpDe', '', '')); 

        
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출발지', '80', 'center', 'str', 'edn', false, 'startCity', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('목적지', '80', 'center', 'str', 'edn', false, 'purpsCity', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('교통편', '80', 'center', 'str', 'coro', false, 'trnsportCode', '', ''));
        
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('직급코드', '80', 'center', 'str', 'ro', true, 'clsfCode', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장번호', '*', 'center', 'str', 'ro', true, 'bsrpNo', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('방문내용', '*', 'center', 'str', 'edn', false, 'visitCn', '', ''));
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('일비용', '*', 'right', 'str', 'edn', false, 'dayAmt', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('식대', '*', 'right', 'str', 'edn', false, 'cgffdAmt', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('숙박료', '*', 'right', 'str', 'edn', false, 'stayngAmt', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('교통비', '*', 'right', 'str', 'edn', false, 'trnsportAmt', '', '')); 
        dhxDtl2GridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('현지교통비(일비)', '105', 'right', 'str', 'edn', false, 'localTrnsportAmt', '', '')); 

        
        dhxDtl2PopupGrid =  gf_MakeDhxGrid('dataExcclcListPubwks013', dhxDtl2GridPubwks013HeaderInfo, true, false, false);
        dhxDtl2PopupGrid.enableAutoWidth(false);
        
        if(!gf_IsNull(paramExcclcElctsctSttusCode) && paramExcclcElctsctSttusCode != '40'){
        	dhxDtl2PopupGrid.setEditable(false);
        	$("#saveFormPubwks013 #btnFileUploadSaveFormStmPrgRequst").attr("disabled", true);
        }
        else{
            dhxDtl2PopupGrid.setEditable(true);
            $("#saveFormPubwks013 #btnFileUploadSaveFormStmPrgRequst").attr("disabled", false);
        }
        
        if(paramExcclcElctsctSttusCode == '20' && paramCopyFlag <= 0){
        	$("#btnPopFormPrgCopy").show();
            $("#btnPopFormPrgSave").hide();
        }
        else{
        	$("#btnPopFormPrgCopy").hide();
        	$("#btnPopFormPrgSave").show();
        }
        
        dhxDtl2PopupGrid.attachFooter("#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,합계,#stat_total,#stat_total,#stat_total,#stat_total,#stat_total",
        		                     [,,,,,,,,,,,,"text-align:right;","text-align:right;","text-align:right;","text-align:right;","text-align:right;","text-align:right;"]);

        //숫자 콤마부여하기 
        dhxDtl2PopupGrid.setNumberFormat("0,000", dhxDtl2PopupGrid.getColIndexById("dayAmt"), ".", ",");
        dhxDtl2PopupGrid.setNumberFormat("0,000", dhxDtl2PopupGrid.getColIndexById("cgffdAmt"), ".", ",");
        dhxDtl2PopupGrid.setNumberFormat("0,000", dhxDtl2PopupGrid.getColIndexById("stayngAmt"), ".", ",");
        dhxDtl2PopupGrid.setNumberFormat("0,000", dhxDtl2PopupGrid.getColIndexById("trnsportAmt"), ".", ",");
        dhxDtl2PopupGrid.setNumberFormat("0,000", dhxDtl2PopupGrid.getColIndexById("localTrnsportAmt"), ".", ",");
        
        //교통편
        var jsonParameter = {codekindCode : "C059",exceptCode :"",sortOrder :"ordr" };  
        var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
        gf_ComboDataSet(dhxDtl2PopupGrid, dhxDtl2PopupGrid.getColIndexById("trnsportCode"), dataSource.data); /* 그리드콤보*/


        
        //필수항목 체크 
        $("#saveFormPubwks013").validate({ errorElement: 'div', ignore: '' });   
        
        
        fn_DataProcessor();
    };
    
    var cf_SetEventListenerPopup = function(){
        //저장 
        $('#btnPopFormPrgSave').unbind('click').bind('click', function() {
        	if(gf_IsNull(paramExcclcElctsctSttusCode) || paramExcclcElctsctSttusCode == '40'){
            	gf_DivMsgConfirm(gv_QueSave, 'fn_ExcclcSavePubwks013()', '');
        	}
        	else{
        		gf_DivMsgAlert(paramExcclcElctsctSttusCodeNm + ' 상태는 저장하실 수 없습니다.');
        	}
        });
        
        $('#btnPopupPrgDelete').unbind('click').bind('click', function() {
            fn_RemovePubwks013();
        });

        //사원팝업
        $('#searchFormMhsEmp #btnEmpSearch').unbind('click').bind('click', function(event){
        	gf_MultiEmpPopup("dataDtlListPubwks013","empNo","korNm", "" , "N", "");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
        });

        $('#saveFormPubwks013').attr("autocomplete" , "off");
        
        //출장자 전체 동일이동
        $('#sameConFlag').unbind('click').bind('click', function(event){
		   fn_Dtl2GridSet(); // 출장자 전체 동일 이동 체크 시   
        });
        
        //첩부파일
        $('#btnFileUploadSaveFormStmPrgRequst').unbind('click').bind('click', function() {
            gf_FileUploadPopup(
                    '',     /* eventFunction */
                    '',     /* deleteBtnClassNm */
                    'saveFormPubwks013',     /* viewDivId */
                    'atchmnflSaveFormStmPrgRequst',     /* dataDivId */
                    uploadedFileKeys,     /* keyArr */
                    uploadedFileInfo,     /* infoArr */
                    0,
                    'all',
                    'fn_CallbackFileUploadSaveFormStmPrgRequst');
        });
        
        //복사 버튼
        $("#btnPopFormPrgCopy").unbind('click').bind('click' , function(){
            fn_SaveCopyPopupPubwks013();             
        });
    };
    
    var fn_SaveCopyPopupPubwks013 = function(){
        var jsonParameterForCopy = {
        	   bsrpNo : paramBsrpNo,
        	   elctsctSeSn : paramElctsctSeSn,
        	   excclcSn : paramExcclcSn
        }
        var dataSource = gf_NoAsyncTransaction('pubwks013/saveCopyPubwks013' ,jsonParameterForCopy , 'GET');
//         console.log(dataSource);
        if(dataSource.data.code == '000'){
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            $('#popupDtlRequst .b-close').click();
            fn_SearchPubwks013('');
        }
        else{
            gf_DivMsgAlert("이미 등록된 데이터가 존재합니다.");
        }
    }
    
    var fn_Dtl2GridSet = function(){
        if($("input:checkbox[name=sameConFlag]").is(":checked") == true) {  // 출장자 전체 동일 이동 시 줄장신청시의 금액 ,출장 장소, 방문내용 ,교통 구분 세팅
            dhxDtl2PopupGrid.forEachRow(function(row2){        // 출장지 상세 내역
                dhxDtlPopupGrid.forEachRow(function(row1){     // 출장비 상세 내역
                    var dtlEmpno = gf_DhxGetValue(dhxDtlPopupGrid, row1, 'bsrpEmpno', 'grid'); 
                    var dtl2Empno = gf_DhxGetValue(dhxDtl2PopupGrid, row2, 'bsrpEmplNo', 'grid'); 
                    if(dtlEmpno == dtl2Empno){                  
                        gf_DhxSetValue(dhxDtl2PopupGrid, row2, 'dayAmt', gf_DhxGetValue(dhxDtlPopupGrid, row1, 'dayAmt', 'grid')  , 'grid');
                        gf_DhxSetValue(dhxDtl2PopupGrid, row2, 'cgffdAmt', gf_DhxGetValue(dhxDtlPopupGrid, row1, 'cgffdAmt', 'grid') , 'grid');
                        gf_DhxSetValue(dhxDtl2PopupGrid, row2, 'stayngAmt', gf_DhxGetValue(dhxDtlPopupGrid, row1, 'stayngAmt', 'grid') , 'grid');
                        gf_DhxSetValue(dhxDtl2PopupGrid, row2, 'trnsportAmt', gf_DhxGetValue(dhxDtlPopupGrid, row1, 'trnsportAmt', 'grid') , 'grid');
                    }   
                });
                gf_DhxSetValue(dhxDtl2PopupGrid, row2, 'purpsCity', gf_FormGetValue('saveFormPubwks013', 'bsrpCity', 'text') , 'grid');
                gf_DhxSetValue(dhxDtl2PopupGrid, row2, 'trnsportCode', gf_FormGetValue('saveFormPubwks013', 'trnsportSeCode', 'text') , 'grid');
                gf_DhxSetValue(dhxDtl2PopupGrid, row2, 'visitCn', gf_FormGetValue('saveFormPubwks013', 'bsrpPurps', 'textarea') , 'grid');
            });
        }
//         else{
//             dhxDtl2PopupGrid.forEachRow(function(row){
                
//             });          
//        }
    	
//     	var cntBsrpDay = gf_FormGetValue('saveFormPubwks013', 'stayng', 'text');   // 숙박일수
//     	var bsrpNo = gf_FormGetValue('saveFormPubwks013', 'bsrpNo', 'text');   // 출장순번
//         if($("input:checkbox[name=sameConFlag]").is(":checked") == true) {  // 출장자 전체 동일 이동 시 줄장신청시의 금액 ,출장 장소, 방문내용 ,교통 구분 세팅
//            dhxDtlPopupGrid.forEachRow(function(row1){
//         	   for(var i = 0 ; i < cntBsrpDay ; i++){
//         		   var date = new Date(gf_FormGetValue('saveFormPubwks013', 'bsrpSdt', 'text'));
//         		   date.setDate(date.getDate() + i);
//         		   var initValueArr = [];
//         		   initValueArr.push(''); // no
//                    initValueArr.push(gf_DhxGetValue(dhxDtlPopupGrid, row1, 'bsrpEmpno', 'grid')); // empno
//                    initValueArr.push(''); // bsrpExcclcSn
//                    initValueArr.push(''); // elctsctSeSn
//                    initValueArr.push(gf_DhxGetValue(dhxDtlPopupGrid, row1, 'korNm', 'grid')); // bsrpEmpnm
//                    initValueArr.push(dateFormat(date)); // bsrpDe
//                    initValueArr.push(''); // startCity
//                    initValueArr.push(gf_FormGetValue('saveFormPubwks013', 'bsrpCity', 'text')); // purpsCity
//                    initValueArr.push(gf_FormGetValue('saveFormPubwks013', 'trnsportSeCode', 'text')); // trnsportCode
//                    initValueArr.push(''); // clsfCode
//                    initValueArr.push(gf_FormGetValue('saveFormPubwks013', 'bsrpNo', 'text')); // bsrpNo
//                    initValueArr.push(gf_FormGetValue('saveFormPubwks013', 'bsrpPurps', 'textarea')); // visitCn
//                    initValueArr.push(gf_DhxGetValue(dhxDtlPopupGrid, row1, 'dayAmt', 'grid')); // dayAmt
//                    initValueArr.push(gf_DhxGetValue(dhxDtlPopupGrid, row1, 'cgffdAmt', 'grid')); // cgffdAmt
//                    initValueArr.push(gf_DhxGetValue(dhxDtlPopupGrid, row1, 'stayngAmt', 'grid')); // stayngAmt
//                    initValueArr.push(gf_DhxGetValue(dhxDtlPopupGrid, row1, 'trnsportAmt', 'grid')); // trnsportAmt
//                    initValueArr.push('0'); // localTrnsportAmt
//                    dhxDtl2PopupGrid.addRow(dhxDtl2PopupGrid.uid() , initValueArr);
//         	   }
//            });
//         }
//         else{
//             dhxDtl2PopupGrid.forEachRow(function(row){
                
//             });        	
//        }
    }
    
    var cf_SetBindingPopup = function(){
    	fn_DataProcessor();
    };
    
    var fn_SearchInput = function(){
        var jsonParameter = {
            bsrpNo : paramBsrpNo ,
            elctsctSeSn : paramElctsctSeSn,
            excclcSn : paramExcclcSn
        };
        var dataSource = gf_NoAsyncTransaction('pubwks013/findPubwks013' ,jsonParameter , 'GET');
        var data = dataSource.data;
//         console.log(data);
        gf_FormSetValue('saveFormPubwks013' , 'reqstDe' , data.reqstDe , '');
        gf_FormSetValue('saveFormPubwks013' , 'reqstEmpNm' , data.reqstEmpNm , '');
        gf_FormSetValue('saveFormPubwks013' , 'bsrpSeNm' , data.bsrpSeNm , '');
        gf_FormSetValue('saveFormPubwks013' , 'trnsportSeCode' , data.trnsportSeCode , '');
        gf_FormSetValue('saveFormPubwks013' , 'trnsportSeCodeNm' , data.trnsportSeCodeNm , '');
        gf_FormSetValue('saveFormPubwks013' , 'bsrpNm' , data.bsrpNm , '');
        gf_FormSetValue('saveFormPubwks013' , 'bsrpPurps' , data.bsrpPurps , 'textarea');
        gf_FormSetValue('saveFormPubwks013' , 'bsrpCity' , data.bsrpCity , '');
        gf_FormSetValue('saveFormPubwks013' , 'bsrpSdt' , data.bsrpSdt , '');
        gf_FormSetValue('saveFormPubwks013' , 'bsrpEdt' , data.bsrpEdt , '');
        gf_FormSetValue('saveFormPubwks013' , 'bsrpShr' , data.bsrpShr , '');
        gf_FormSetValue('saveFormPubwks013' , 'bsrpEhr' , data.bsrpEhr , '');
        gf_FormSetValue('saveFormPubwks013' , 'stayng' , data.stayng , '');
        gf_FormSetValue('saveFormPubwks013' , 'stayngDaycnt' , data.stayngDaycnt , '');
        gf_FormSetValue('saveFormPubwks013' , 'excclcElctsctSttusCodeNm' , data.excclcElctsctSttusCodeNm , '');
        fn_SearchFileUploadSaveFormStmPrgRequst(data.atchmnflNo, 'saveFormPubwks013', 'atchmnflSaveFormStmPrgRequst');
        var jsonParameter = {
                bsrpNo : paramBsrpNo,
                elctsctSeSn : paramElctsctSeSn,
                excclcSn : paramExcclcSn
            };
        gf_Transaction( '', 'pubwks013/findDtlPubwks013', jsonParameter, 'fn_CallbackSearchDtlListPop', false, 'GET');

    };
    var fn_CallbackSearchDtlListPop = function(strSvcID, targetID, data) {
    	dhxDtlPopupGrid.clearAll();
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dhxDtlPopupGrid');
            dhxDtlPopupGrid.parse(data.data.records, 'js');
            var jsonParameter = {
                    bsrpNo : paramBsrpNo,
                    elctsctSeSn : paramElctsctSeSn,
                    excclcSn : paramExcclcSn
                };
            gf_Transaction( '', 'pubwks013/findDtl2Pubwks013', jsonParameter, 'fn_CallbackSearchDtl2ListPop', false, 'GET');
        } else {
            gf_NoFoundDataOnGridMsg('dhxDtlPopupGrid');
        }
    }; 

    var fn_CallbackSearchDtl2ListPop = function(strSvcID, targetID, data) {
    	dhxDtl2PopupGrid.clearAll();
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dhxDtl2PopupGrid');
            dhxDtl2PopupGrid.parse(data.data.records, 'js');
        } else {
            gf_NoFoundDataOnGridMsg('dhxDtl2PopupGrid');
        }
    }; 

    
    
    var fn_ExcclcSavePubwks013 = function(){
    	var jsonParameter = {
        	atchmnflNo : gf_FormGetValue('saveFormPubwks013', 'atchmnfl', 'text'), //첨부파일
            bsrpNo : paramBsrpNo,
            elctsctSeSn : paramElctsctSeSn
    	}
    	var url = "pubwks013/updateAtchflNoPubwks013";
    	var dataSource =  gf_NoAsyncTransaction(url, jsonParameter, 'POST');
    	if(dataSource.code === '000'){
            dhxDtl2PopupGrid.forEachRow(function(row){
            	dhxDataProcessorDtlPopProc.setUpdated(row, true, 'updated');
            });
        	dhxDataProcessorDtlPopProc.sendData();
    		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    	}
    	else{
    		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    	}
    }
    
    
    var fn_DataProcessor = function() {
        // 그리드입력 데이터프로세스 정의
        dhxDataProcessorDtlPopProc = new dataProcessor(gv_ContextPath+'/pubwks013/saveDtl2Pubwks013'); //lock feed url
        dhxDataProcessorDtlPopProc.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
        dhxDataProcessorDtlPopProc.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
        dhxDataProcessorDtlPopProc.init(dhxDtl2PopupGrid); //link dataprocessor to the grid
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
                        fn_SearchPubwks013('');
                        return true;
                } else {
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                        return false;
                }
        });
    }

    //팝업창 닫기
    $('#btnPopupPrgClose').unbind('click').bind('click', function() {
        $('#popupDtlRequst .b-close').click();
    });
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
    /**********************************************************파일 핸들링 시작**************************************************************/
    var uploadedFileKeys = [];
    var uploadedFileInfo = [];
    var fn_CallbackFileUploadSaveFormStmPrgRequst = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
        if(!gf_IsNull(data)){               
            uploadedFileKeys = [];
            uploadedFileInfo = [];
            $('#'+viewDivId+' .file_box table tr').remove();
            fn_LoadFileUploadSaveFormStmPrgRequst(data, viewDivId, dataDivId);
        }
    };

    var fn_SearchFileUploadSaveFormStmPrgRequst = function(atchFiles, viewDivId, dataDivId) {   
        var jsonParameter = { atchFiles : atchFiles };
        var dataSource = gf_NoAsyncTransaction('file/searchFiles', jsonParameter, 'POST');   
        if(!gf_IsNull(dataSource.data)) {
            uploadedFileKeys = [];
            uploadedFileInfo = [];
            $.each( dataSource.data, function( key, value ) {           
                uploadedFileKeys.push(value.atchFileId);                
                uploadedFileInfo.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);   
            });     
            $('#'+viewDivId+' .file_box table tr').remove();
            fn_LoadFileUploadSaveFormStmPrgRequst(uploadedFileInfo, viewDivId, dataDivId);  
        }
    };

    var fn_RemoveFileUploadSaveFormStmPrgRequst = function(obj, viewDivId, dataDivId) {
        uploadedFileKeys.splice($(obj).attr('idx'), 1);
        uploadedFileInfo.splice($(obj).attr('idx'), 1); 
        $('#'+viewDivId+' .file_box table tr').remove();
        fn_LoadFileUploadSaveFormStmPrgRequst(uploadedFileInfo, viewDivId, dataDivId);
    };

    var fn_LoadFileUploadSaveFormStmPrgRequst = function(data, viewDivId, dataDivId) {      
        var atchFileList = [];
        var fileInfos = [];
        var idx = 0;
        var arrayEmpty = false;
        if(gf_IsNull(uploadedFileKeys) && gf_IsNull(uploadedFileInfo)) arrayEmpty = true;
        $.each( data, function( key, value ) {
            fileInfos = value.split('|^|');
            if(arrayEmpty) {
                uploadedFileKeys.push(fileInfos[0]);                
                uploadedFileInfo.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);   
            }       
            atchFileList.push('<tr>');
            atchFileList.push('<td style="border:0px"><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
            atchFileList.push('<td style="border:0px">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
            atchFileList.push('<td style="border:0px"><button type="button" idx="'+idx+'" class="btn_del" onclick="fn_RemoveFileUploadSaveFormStmPrgRequst(this,\''+viewDivId+'\',\''+dataDivId+'\')"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
            atchFileList.push('</tr>');     
            idx++;
        }); 
        if(idx === 0) {
            atchFileList.push('<tr>');
            atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');      
            atchFileList.push('</tr>');
        }
        $('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
        $('#'+dataDivId).val(uploadedFileKeys.join("|"));
    }

    var fn_ClearFileUploadSaveFormStmPrgRequst = function(viewDivId, dataDivId){
        $('#'+viewDivId+' .file_box table tr').remove();
        var atchFileList = [];
        atchFileList.push('<tr>');
        atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');      
        atchFileList.push('</tr>');
        $('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
        $('#'+dataDivId).val('');   
    };
    /**********************************************************파일 핸들링 끝**************************************************************/
    
        $(function() {
          cf_SetComponentsPopup();
          cf_InitParamPopup();
          cf_SetEventListenerPopup();
    //      cf_InitFormPubwks013();
    //      cf_SetBindingPopup();
          fn_SearchInput();
     });
    </script>
        <div class="pop-content">
        <div id="saveForm" style="margin: 10px 10px 10px 10px;">
                <div class="detail_type01">
                    <form id="saveFormPubwks013" autocomplete=”off”>
                        <table>
                            <colgroup>
                                <col width="100">
                                <col width="">
                                <col width="100">
                                <col width="">
                                <col width="100">
                                <col width="">
                                <col width="100">
                                <col width="">
                                
                            </colgroup>
                            <tr>  
                                <th>신청일자<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                <td colspan='1'><input type="text" name="reqstDe" id="reqstDeSaveFormPubwks013" style="width: 155px;" disabled/></td>
                                <th>신청자<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                <td colspan='1'><input type="text" name="reqstEmpNm" id="reqstEmpNmSaveFormPubwks013" style="width: 155px;" disabled/>
                                <th>출장구분<!-- <taglibs:transText progrmId="default" key="titBsrpSeCode"/> --></th>
                                <td colspan='1'>
                                    <input type="text" name="bsrpSeNm" id="bsrpSeNmSaveFormPubwks013" style="width: 155px;" disabled/> 
                                </td>
                                <th>교통구분<!-- <taglibs:transText progrmId="default" key="titBsrpSeCode"/> --></th>
                                <td colspan='1'>
                                    <input type="text" name="trnsportSeCodeNm" id="trnsportSeCodeNmSaveFormPubwks013" style="width: 155px;" disabled/> 
                                </td>
                            </tr>
                            <tr>
                                <th>출장명<!-- <taglibs:transText progrmId="default" key="titBsrpNm"/> --></th>
                                <td colspan='3'><input type="text" name="bsrpNm" id="bsrpNmSaveFormPubwks013" style="width: 423.7px;" maxlength="50" disabled/></td>
                                <th>출장장소<!-- <taglibs:transText progrmId="default" key="titBsrpNo"/> --></th>
                                <td colspan='1'><input type="text" name="bsrpCity" id="bsrpCitySaveFormPubwks013" style="width: 155px;" disabled/></td>
                                <th>결재상태<!-- <taglibs:transText progrmId="default" key="titBsrpNo"/> --></th>
                                <td colspan='1'><input type="text" name="excclcElctsctSttusCodeNm" id="excclcElctsctSttusCodeNmSaveFormPubwks013" style="width: 155px;" disabled/></td>
                            </tr>
                            <tr>
                                <th>출장목적<!-- <taglibs:transText progrmId="default" key="titBsrpPurps"/> --></th>
                                <td colspan='8'><textarea rows="2"  name="bsrpPurps" id="bsrpPurpsSaveFormPubwks013" style="width:97.5%;height:30px;" disabled></textarea></td>
                            </tr>
                            <tr>
                                <th>출장기간<!-- <taglibs:transText progrmId="default" key="titBsrpNo"/> --></th>
                                <td id="saveBsrpDt" colspan='3'>
                                    <input type="text" name="bsrpSdt" id="bsrpSdtSaveFormPubwks013" style="width: 65px" disabled/>
                                    <input type="text" name="bsrpShr" id="bsrpShrSaveFormPubwks013" style="width: 30px" disabled/>
                                     ~ 
                                    <input type="text" name="bsrpEdt" id="bsrpEdtSaveFormPubwks013" style="width: 65px" disabled/>
                                    <input type="text" name="bsrpEhr" id="bsrpEhrSaveFormPubwks013" style="width: 30px" disabled/>
                                </td>
                                <th> 숙박기간 </th>
                                <td colspan='3'>
                                    <input type="text" name="stayng" id="stayngSaveFormPubwks013" style="width: 30px; text-align: right;" maxlength="2" disabled/>박
                                    <input type="text" name="stayngDaycnt" id="stayngDaycntSaveFormPubwks013" style="width: 30px; text-align: right;" maxlength="2" disabled/>일
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <button type="button" class="btn_common02" id="btnFileUploadSaveFormStmPrgRequst">
                                    <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                    </button>
                                </th>
                                <td colspan="3">
                                    <input type="hidden" name="atchmnfl" id="atchmnflSaveFormStmPrgRequst"/>
                                    <div class="file_box" style="height:60px">
                                        <table style="border:0px">
                                            <tr>
                                            <td style="text-align:center; border:0px; padding-top:25px">첨부파일이 없습니다.</td>
                                            </tr>                   
                                        </table>
                                    </div>
                                </td>
                                <td colspan="4">
                                </td>                                 
                            </tr>
                        <input type="hidden" name="trnsportSeCode" id="trnsportSeCodeSaveFormPubwks013"/>
                        <input type="hidden" name="reqstEmpno" id="reqstEmpnoSaveFormPubwks013"/></td>
                        <input type="hidden" name="bsrpNo" id="reqstBsrpNoSaveFormPubwks013">
                        </table>                                 
                    </form>
            </div>
        </div>
            <div class="div_title">
                <div class="left ml5"><span class="s_tit"><i class="axi axi-chevron-right"></i>출장비 상세내역</span></div>
            </div>
            <div>
                <div id="dataDtlListPubwks013" style="width: 100%; height: 150px" class="div_liner">
                </div>
            </div>
            <div class="div_title">
                <div class="left ml5"><span class="s_tit"><i class="axi axi-chevron-right"></i>출장지 상세내역</span></div>
                <div class="right ml5">
                        <label><input type="checkbox" name="sameConFlag" id="sameConFlag">출장자 전체 동일 이동</label>
                </div>
            </div>
            <div>
                <div id="dataExcclcListPubwks013" style="width: 100%; height: 250px" class="div_liner">
                </div>
            </div>
            <div class="popup_footer_box">
                <button type="button" id="btnPopFormPrgCopy" name="btnPopFormPrgCopy">
                      <span class="glyphicon glyphicon-send f15 mr5"></span>복사
                </button>
                <button type="button" id="btnPopFormPrgSave" name="btnPopFormPrgSave">
                      <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span><taglibs:transText progrmId="default" key="btnSave" />
                </button>
<!--                 <button type="button" id="btnPopupPrgDelete" name="btnPopupPrgDelete"> -->
<%--                       <span class="glyphicon glyphicon-remove f15 mr5"></span><taglibs:transText progrmId="default" key="btnDelete" /> --%>
<!--                 </button>                 -->
                <button type="button" id="btnPopupPrgClose" name="btnPopupPrgClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
            </div>
        </div>
</body>