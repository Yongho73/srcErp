<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	/*유지보수 상세조회*/
	var dhxGridOpertList;
	
	var cf_InitParamPopup = function (){

	    gf_ComboCode('divComboRequstTyPopup', 'requstTy', 'requstTy', 'reg', 'C922', '' , '', '', 'asc', '');   			//장애유형
	    gf_ComboCode('divComboPriorRankPopup', 'priorRank', 'priorRank', 'reg', 'C923', '' , '', '', 'asc', 'required');  	//우선순위
	    gf_ComboCode('divComboOpertTyPopup', 'opertTy', 'opertTy', 'reg', 'C924', '' , '', '', 'asc', ''); 					//작업유형
	    gf_ComboCode('divComboRequstStepPopup', 'requstStep', 'requstStep', 'reg', 'C205', '' , '', '', 'asc', 'required'); //진행상태
	    gf_ComboCode('divComboStsfdgCodePopup', 'stsfdgCode', 'stsfdgCode', 'reg', 'C926', '' , '', '', 'asc', '');			//만족도
	    
	   	//필수항목 체크 
 		$("#saveFormPjtMtaSearch").validate({ errorElement: 'div', ignore: '' });	   	
	};
    
	
	var cf_SetComponentsPopup = function (){
		
		var dhxGridOpertListInfo = [];  
		dhxGridOpertListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '')); // 일련번호
		dhxGridOpertListInfo.push(gf_MakeDhxGridHeader('성명', '150', 'center', 'str', 'ro', false, 'opertorNm', ''));
		dhxGridOpertListInfo.push(gf_MakeDhxGridHeader('시작일자', '150', 'center', 'str', 'ro', false, 'opertBeginDt', ''));
		dhxGridOpertListInfo.push(gf_MakeDhxGridHeader('종료일자', '150', 'center', 'str', 'ro', false, 'opertEndDt', ''));
		dhxGridOpertListInfo.push(gf_MakeDhxGridHeader('내용', '*', 'left', 'str', 'ro', false, 'opertCn', ''));
		dhxGridOpertListInfo.push(gf_MakeDhxGridHeader('프로젝트번호', '50', 'left', 'str', 'ro', true, 'projectSn', ''));
		dhxGridOpertListInfo.push(gf_MakeDhxGridHeader('작업결과번호', '50', 'left', 'str', 'ro', true, 'opertSn', ''));
		dhxGridOpertListInfo.push(gf_MakeDhxGridHeader('유지보수번호', '50', 'left', 'str', 'ro', true, 'requstSn', ''));
	    
		dhxGridOpertList = gf_MakeDhxGrid('gridPopupOpertList', dhxGridOpertListInfo, true, false, false);

		dhxGridOpertList.enableAutoHeight(false);
	};
	

	var cf_SetEventListenerPopup = function (){
		//작업단계, 완료일자 입력값에 따라 값 설정
	    $('#saveFormPjtMtaSearch select[name="requstStep"]').unbind('change blur').bind('change blur',function() {
			if('300' == gf_FormGetValue('saveFormPjtMtaSearch', 'requstStep', 'combo') && gf_IsNull(gf_FormGetValue('saveFormPjtMtaSearch', 'comptDe', 'text'))){
				gf_FormSetValue('saveFormPjtMtaSearch', 'comptDe', dateFormat(new Date()), 'text')
			} else if('300' != gf_FormGetValue('saveFormPjtMtaSearch', 'requstStep', 'combo') && '500' != gf_FormGetValue('saveFormPjtMtaSearch', 'requstStep', 'combo')){
				gf_FormSetValue('saveFormPjtMtaSearch', 'comptDe', '', 'text')
			}
	    });
	    $('#saveFormPjtMtaRequst input[name="comptDe"]').unbind('change blur').bind('change blur',function() {
			if(!gf_IsNull(gf_FormGetValue('saveFormPjtMtaRequst', 'comptDe', 'text'))){
				gf_FormSetValue('saveFormPjtMtaRequst', 'requstStep', '300', 'combo');
			} else {
				gf_FormSetValue('saveFormPjtMtaRequst', 'requstStep', '100', 'combo');
			}
	    });
		//승인여부에 따라 승인일 설정
	    $('#saveFormPjtMtaSearch input[name="comptConfmAtOrg"]').unbind('change blur').bind('change blur',function() {
			if('1' == gf_FormGetValue('saveFormPjtMtaSearch','comptConfmAtOrg','chkboxYN')){
            	gf_FormSetValue('saveFormPjtMtaSearch', 'requstStep', '500', 'combo');
				if(gf_IsNull(gf_FormGetValue('saveFormPjtMtaSearch', 'comptConfmDt', 'text'))){
					gf_FormSetValue('saveFormPjtMtaSearch', 'comptConfmDt', dateFormat(new Date()), 'text')
				}
				if(gf_IsNull(gf_FormGetValue('saveFormPjtMtaSearch', 'confmerNm', 'text'))){
					var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
					gf_FormSetValue('saveFormPjtMtaSearch', 'confmerNm', userInfo.data.userNm, 'text')
				}
			} else  if('1' != gf_FormGetValue('saveFormPjtMtaSearch','comptConfmAtOrg','chkboxYN')){
				gf_FormSetValue('saveFormPjtMtaSearch', 'confmerNm', '', 'text')
				gf_FormSetValue('saveFormPjtMtaSearch', 'comptConfmDt', '', 'text');
				gf_FormSetValue('saveFormPjtMtaRequst', 'requstStep', '100', 'combo');
			}
	    });

		//저장 
	    $('#btnPopFormPrgSave').unbind('click').bind('click', function() {
	    	if('300' == gf_FormGetValue('saveFormPjtMtaSearch', 'requstStep', 'combo') && gf_IsNull(gf_FormGetValue('saveFormPjtMtaSearch', 'comptDe', 'text'))){
	    		gf_DivMsgAlert('완료일자를 입력해주세요.');
    			$('#comptDe').focus();
    			return false;
	    	} else if(gf_FormGetValue('saveFormPjtMtaSearch','comptConfmAtOrg','chkboxYN') == '1' && gf_IsNull(gf_FormGetValue('saveFormPjtMtaSearch', 'comptDe', 'text'))){
    			gf_DivMsgAlert('완료일자를 입력해주세요.');
    			$('#comptDe').focus();
    			return false; 
	    	}
	    	if('1' == gf_FormGetValue('saveFormPjtMtaSearch','comptConfmAtOrg','chkboxYN') && gf_IsNull(gf_FormGetValue('saveFormPjtMtaSearch', 'stsfdgCode', 'combo'))){
	    		gf_DivMsgAlert('만족도를 선택해주세요.');
    			$('#stsfdgCode').focus();
    			return false;
	    	}

	        if($('#saveFormPjtMtaSearch').validate().form()){
	        	var msg = "저장하시겠습니까?";
	        	fn_DivMsgConfirm2(msg, function(confirm){ 
	                if(confirm){ 
	                	fn_SavePjtmta001RequstPopup();
	                }else{ 
	                	return false; 
	                } 
	            });
	        }
	    });		
		
		//삭제
	    $('#btnPopupPrgDelete').unbind('click').bind('click', function() {
	    	var requstSn =gf_FormGetValue('saveFormPjtMtaSearch', 'requstSn', 'text');
	    	var projectSn =gf_FormGetValue('saveFormPjtMtaSearch', 'projectSn', 'text');
	    	
	        if( gf_IsNull(projectSn) &&  gf_IsNull(requstSn)) {
	             gf_DivMsgAlert(gv_MsgDelKey);
	             return false;
	        } else if (!gf_IsNull(projectSn) &&  !gf_IsNull(requstSn)) {
	            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMtaRequst()', '');
	        }
	    });   
		
	    //팝업창 닫기
	    $('#btnPopupPrgClose').unbind('click').bind('click', function() {
	    	$('#bpopupMtaSearch .b-close').click();
	    });
	 	//지시자 조회
	    $('#btnDrctrEmpSearch').unbind('click').bind('click', function() {
	    	gf_EmpPopup('saveFormPjtMtaSearch', 'drctrEmpno', 'drctrNm', '1000', 'Y', null);
        });
	  	//작업자 조회
	    $('#btnOpertorEmpSearch').unbind('click').bind('click', function() {
	    	gf_EmpPopup('saveFormPjtMtaSearch', 'opertorEmpno', 'opertorNm', '1000', 'Y', null);
        });
	    
// 	    $('#comptConfmAtOrg').unbind("click").bind("click",function() {
//             if($(this).prop('checked')) {
//             	$('#comptConfmAt').val('1');
//             }else $('#comptConfmAt').val('0');
//         });
	    //작업결과 등록
	    $('#btnOpertAdd').unbind('click').bind('click', function(event){
	    	var requstSn = gf_FormGetValue('saveFormPjtMtaSearch', 'requstSn', 'text');
            var projectSn = gf_FormGetValue('saveFormPjtMtaSearch', 'projectSn', 'text');
            var bcncNm = gf_FormGetValue('saveFormPjtMtaSearch', 'bcncNm', 'text');
            var comptDe = gf_FormGetValue('saveFormPjtMtaSearch', 'comptDe', 'text');
            var opertorEmpno = gf_FormGetValue('saveFormPjtMtaSearch', 'opertorEmpno', 'text');
            var opertorNm = gf_FormGetValue('saveFormPjtMtaSearch', 'opertorNm', 'text');
	        
	        var param = "projectSn="+projectSn+"&requstSn="+requstSn+"&comptDe="+comptDe+"&bcncNm="+encodeURI(bcncNm)+"&opertorEmpno="+opertorEmpno+"&opertorNm="+encodeURI(opertorNm);
	        fn_OpertPopup('form1','','', param);
	    });
	    //작업결과 보기
	    dhxGridOpertList.attachEvent("onRowDblClicked", function(rId,cInd){
            var projectSn  = dhxGridOpertList.cells(rId, dhxGridOpertList.getColIndexById("projectSn")).getValue();
            var requstSn   = dhxGridOpertList.cells(rId, dhxGridOpertList.getColIndexById("requstSn")).getValue();
            var opertSn    = dhxGridOpertList.cells(rId, dhxGridOpertList.getColIndexById("opertSn")).getValue();
            var bcncNm     = gf_FormGetValue('saveFormPjtMtaSearch', 'bcncNm', 'text');
            var comptDe = gf_FormGetValue('saveFormPjtMtaSearch', 'comptDe', 'text');
            
            var param = "projectSn=" + projectSn + "&requstSn=" + requstSn  + "&comptDe=" + comptDe + "&opertSn=" + opertSn + "&bcncNm=" + encodeURI(bcncNm);
          
            fn_OpertPopup('form1','','', param);
        });   
		
	};

	//초기화 함수 
	var cf_InitInputForm = function (){
	};	
	
	//달력셋팅 
	var cf_calendarInitPopup = function(){
	    $('#saveFormPjtMtaSearch .input_calen').unbind('keyup').bind('keyup', function(event){
	    	dateChk($(this));
	    }); 
	    
		//요청일자
		var dhxCCalendarDatePop1 = new dhtmlXCalendarObject({input:"requstDt", button:"startDateIcon"});
		dhxCCalendarDatePop1.loadUserLanguage("ko");
		dhxCCalendarDatePop1.hideTime();

		//완료요구일
		var dhxCCalendarDatePop2 = new dhtmlXCalendarObject({input:"comptRequstDt", button:"startDateIcon"});
		dhxCCalendarDatePop2.loadUserLanguage("ko");
		dhxCCalendarDatePop2.hideTime();
		
		var dhxCCalendarDatePop3 = new dhtmlXCalendarObject({input:"comptDe", button:"startDateIcon"});
        dhxCCalendarDatePop3.loadUserLanguage("ko");
        dhxCCalendarDatePop3.hideTime();
		
		var dhxCCalendarDatePop4 = new dhtmlXCalendarObject({input:"comptConfmDt", button:"startDateIcon"});
		dhxCCalendarDatePop4.loadUserLanguage("ko");
		dhxCCalendarDatePop4.hideTime();
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
	}
	//입력 내용을 날짜 포멧으로
	function dateChk(objDate){
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
	
	//유지보수 요청내용 조회 		
	var fn_SearchInputPjtMtaSearch = function (){

    	var projectSn = '${projectSn}';
    	var requstSn = '${requstSn}';
    	
	    if( !gf_IsNull(projectSn) && !gf_IsNull(requstSn) ) {

	        var jsonParameter = {
	        	projectSn : projectSn,
	        	requstSn : requstSn 
	        };

	        var dataSource = gf_NoAsyncTransaction('pjtmta001/findPjtmta001', jsonParameter, 'GET');
	        var data = dataSource.data;

	        gf_FormSetValue('saveFormPjtMtaSearch', 'projectSn', data.projectSn, 'text'); 
	        gf_FormSetValue('saveFormPjtMtaSearch', 'requstSn', data.requstSn, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'bcncNm', data.bcncNm, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'projectNm', data.projectNm, 'text'); 
	        gf_FormSetValue('saveFormPjtMtaSearch', 'rqester', data.rqester, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'rqesterTelno', data.rqesterTelno, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'rqesterEmail', data.rqesterEmail, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'requstTy', data.requstTy, 'combo');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'requstDt', data.requstDt, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'priorRank', data.priorRank, 'combo');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'comptRequstDt', data.comptRequstDt, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'opertTy', data.opertTy, 'combo');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'requstMenu', data.requstMenu, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'requstCn', data.requstCn, 'textarea');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'drctrEmpno', data.drctrEmpno, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'drctrNm', data.drctrNm, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'opertorEmpno', data.opertorEmpno, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'opertorNm', data.opertorNm, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'requstStep', data.requstStep, 'combo');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'drctCn', data.drctCn, 'textarea');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'comptDe', data.comptDe, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'confmerNm', data.confmerNm, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch','comptConfmAtOrg', (( data.comptConfmAt  == '1') ? true : false), 'chkbox');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'comptConfmDt', data.comptConfmDt, 'text');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'stsfdgCode', data.stsfdgCode, 'combo');
	        gf_FormSetValue('saveFormPjtMtaSearch', 'confmOpn', data.confmOpn, 'textarea');
	        fn_SearchFileUploadSaveFormStmPrgRequst(data.atchmnflSn, 'saveFormPjtMtaSearch', 'atchmnflSaveFormStmPrgRequst');
	        
	        if(gf_IsNull(data.drctrEmpno)||gf_IsNull(data.opertorEmpno)){
				var jsonParameter = {
		    	      	projectSn : projectSn,
			        	requstSn : requstSn 
		    	};
		    	var dataSourceHnf = gf_NoAsyncTransaction('pjtmta001/searchPjtHnf', jsonParameter, 'GET');
		    	var dataHnf = dataSourceHnf.data
				
		    	if(gf_IsNull(data.drctrEmpno)){
					gf_FormSetValue('saveFormPjtMtaSearch', 'drctrEmpno', dataHnf.projectPmEmpno, 'text');
					gf_FormSetValue('saveFormPjtMtaSearch', 'drctrNm', dataHnf.projectPmNm, 'text');
		    	}
		    	if(gf_IsNull(data.opertorEmpno)){
					gf_FormSetValue('saveFormPjtMtaSearch', 'opertorEmpno', dataHnf.prtcpntEmpno, 'text');
					gf_FormSetValue('saveFormPjtMtaSearch', 'opertorNm', dataHnf.prtcpntNm, 'text');
		    	}
	        }
	        
	    } 
	};
	
	//저장
	var fn_SavePjtmta001RequstPopup = function(){
        var jsonParameter = {
            projectSn : gf_FormGetValue('saveFormPjtMtaSearch', 'projectSn', 'text'),
            requstSn : gf_FormGetValue('saveFormPjtMtaSearch', 'requstSn', 'text'),
            rqester : gf_FormGetValue('saveFormPjtMtaSearch', 'rqester', 'text'),
            rqesterTelno : gf_FormGetValue('saveFormPjtMtaSearch', 'rqesterTelno', 'text'),
            rqesterEmail : gf_FormGetValue('saveFormPjtMtaSearch', 'rqesterEmail', 'text'),
            requstTy : gf_FormGetValue('saveFormPjtMtaSearch', 'requstTy', 'combo'),
            requstDt : gf_FormGetValue('saveFormPjtMtaSearch', 'requstDt', 'text') .replaceAll('-',''),
            priorRank : gf_FormGetValue('saveFormPjtMtaSearch', 'priorRank', 'combo'),
            comptRequstDt : gf_FormGetValue('saveFormPjtMtaSearch', 'comptRequstDt', 'text') .replaceAll('-',''),
            opertTy : gf_FormGetValue('saveFormPjtMtaSearch', 'opertTy', 'combo'),
            requstMenu : gf_FormGetValue('saveFormPjtMtaSearch', 'requstMenu', 'text'),
            requstCn : gf_FormGetValue('saveFormPjtMtaSearch', 'requstCn', 'textarea'),
            drctrEmpno : gf_FormGetValue('saveFormPjtMtaSearch', 'drctrEmpno', 'text'), 
            opertorEmpno : gf_FormGetValue('saveFormPjtMtaSearch', 'opertorEmpno', 'text'), 
            requstStep : gf_FormGetValue('saveFormPjtMtaSearch', 'requstStep', 'combo'),
            drctCn : gf_FormGetValue('saveFormPjtMtaSearch', 'drctCn', 'textarea'),
            comptDe : gf_FormGetValue('saveFormPjtMtaSearch', 'comptDe', 'text') .replaceAll('-',''),	//완료일자
            confmerNm : gf_FormGetValue('saveFormPjtMtaSearch', 'confmerNm', 'text'),
            comptConfmDt : gf_FormGetValue('saveFormPjtMtaSearch', 'comptConfmDt', 'text') .replaceAll('-',''),
            stsfdgCode : gf_FormGetValue('saveFormPjtMtaSearch', 'stsfdgCode', 'combo'),
            confmOpn : gf_FormGetValue('saveFormPjtMtaSearch', 'confmOpn', 'textarea'),
            comptConfmAt : gf_FormGetValue('saveFormPjtMtaSearch','comptConfmAtOrg','chkboxYN'),
            

            atchmnflSn : gf_FormGetValue('saveFormPjtMtaSearch', 'atchmnfl', 'text'), //첨부파일 
        };

        var url;
        var  requstSn  = gf_FormGetValue('saveFormPjtMtaSearch', 'requstSn', 'text');
        
        if( !gf_IsNull(requstSn) ) {
            url = "pjtmta001/modifyPjtMtaRequst";
        } else {
            url = "pjtmta001/savePjtMtaRequst";
        }

        var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
        if(dataSource.code === '000') {

            if(!gf_IsNull(requstSn)) {
                gf_DivMsgAlert(gv_MsgUpdate);
                $('#bpopupMtaSearch .b-close').click();
            } else {
                gf_DivMsgAlert(gv_MsgRegist);
                $('#bpopupMtaSearch .b-close').click();
            }              
        }
        $('#saveFormStmPrgRequst div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
	}
	
	//삭제
	var fn_RemoveMtaRequst = function (){
		var projectSn = gf_FormGetValue('saveFormPjtMtaSearch', 'projectSn', 'text');
		var requstSn = gf_FormGetValue('saveFormPjtMtaSearch', 'requstSn', 'text');

		var jsonParameter = {
	        projectSn : projectSn,
	        requstSn : requstSn
	    };

	    var dataSource = gf_NoAsyncTransaction('pjtmta001/removePjtMtaRequst', jsonParameter, 'POST');
	    if(dataSource.code === '000') {
	    	gf_DivMsgAlert(gv_MsgDelete);
	    	$('#bpopupMtaSearch .b-close').click();
	    }	   
	};
	
	//작업결과 조회
	var fn_SearchOpertList = function(userId) {
		
		var projectSn = gf_FormGetValue('saveFormPjtMtaSearch', 'projectSn', 'text');
		var requstSn = gf_FormGetValue('saveFormPjtMtaSearch', 'requstSn', 'text');
		
	    var jsonParameter = {
	    		
	            projectSn : projectSn,
	            requstSn : requstSn
	    };
	    gf_Transaction(userId, 'pjtmta001/searchPjtmta001Opert', jsonParameter, 'fn_CallbackSearchOpertList', false, 'GET');
	};
	var fn_CallbackSearchOpertList = function(strSvcID, targetID, data) {
		dhxGridOpertList.clearAll();
	        if(!gf_IsNull(data.data.records)){
	            gf_NoFoundDataOnGridMsgRemove('gridPopupOpertList');
	            dhxGridOpertList.parse(data.data.records, 'js');
	            dhxGridOpertList.selectRow(0);
	 
	        } else {
	            gf_NoFoundDataOnGridMsg('gridPopupOpertList');
	        }
	        $("#spanCntSearchFormOpert").text(data.data.records.length);
	};
	
	//작업결과 등록 팝업
	var fn_OpertPopup = function (formId, codeId, codeNmId, param) {
	    
	    var userId = ""; 
	    var title  = "작업결과";
	    
	    //저장팝업
	    var dhxWindowObj;
	    var dhxWindowsOpert;
	    if($('body').find("div[id='bpopupOpert']").size() <= 0) {
	        $('body').append("<div id='bpopupOpert' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	    }
	    $('#bpopupOpert').bPopup({
	        onOpen:function(){
	            
	        	dhxWindowsOpert = new dhtmlXWindows();
	            var id      = 'bpopupOpert';
	            var ajaxUrl = gv_ContextPath+'/pjtmta001/popup/pjtmta001OpertListPopup/view?'+param;
	            var left    = 0;
	            var top     = 0;
	            var width   = 670;
	            var height  = 450;
	            
	            dhxWindowObj = dhxWindowsOpert.createWindow(id, left, top, width, height);
	            dhxWindowsOpert.window(id).centerOnScreen();
	            dhxWindowObj.setText(title);
	            dhxWindowObj.attachURL(ajaxUrl, true, true);
	            dhxWindowObj.detachObject(true);
	            dhxWindowObj.attachEvent("onClose", function(win){
	                $('#bpopupOpert .b-close').click();
	                fn_SearchOpertList();
	                fn_SearchInputPjtMtaSearch();
	            });
	        },
	        onClose:function(){
	        	dhxWindowsOpert.unload();
	            $('body').find("div[id='bpopupOpert']").remove();           
	        }
	    },function(){});
	    return dhxWindowObj;
	};
	
	/**********************************************************파일 핸들링 시작**************************************************************/
	var uploadedFileKeys = [];
	var uploadedFileInfo = [];
	
	var fn_FileUploadBtnEvent = function(){
		$('#fileUpload1').unbind("click").bind("click",function(event){
			gf_FileUploadPopup(
					'fn_FileUploadBtnEvent', 
					'btnUploadedFiledelete1', 
					'fileList', 
					'atchmnfl', 
					uploadedFileKeys, 
					uploadedFileInfo, 
					 1,
					'all',
					'');
		});
		
		$('.btnUploadedFiledelete1').unbind("click").bind("click",function(event){			
			gf_DeleteAtachFile(
					'fn_FileUploadBtnEvent', 
					 $(this).attr('idx'), 
					'btnUploadedFiledelete1', 
					'fileList', 
					'atchmnfl', 
					uploadedFileKeys, 
					 uploadedFileInfo);
		});
	}

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
	        atchFileList.push('<td style="border:0px"><a href="http://www.dbvision.co.kr/homepage/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
	        atchFileList.push('<td style="border:0px">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
	        //atchFileList.push('<td style="border:0px"><button type="button" idx="'+idx+'" class="btn_del" onclick="fn_RemoveFileUploadSaveFormStmPrgRequst(this,\''+viewDivId+'\',\''+dataDivId+'\')"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
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
        cf_InitParamPopup();
        cf_calendarInitPopup();  
        cf_SetComponentsPopup();    
        cf_SetEventListenerPopup();    
        fn_SearchInputPjtMtaSearch(); //상세정보     
        fn_SearchOpertList('');
        if(gf_IsNull('${imprvmrequstSn}')) {
            $('#requstDe').val(gv_Curdate); //오늘날짜 셋팅 
        }           
        fn_FileUploadBtnEvent();//파일 이벤트
    });
	
    </script>
		<div id="saveForm" style="margin: 10px 10px 10px 10px">
        <form id="saveFormPjtMtaSearch">
				<div class="detail_type01">
					
				        <input type="hidden" name="projectSn" id="projectSn"  /> 
                        <input type="hidden" name="requstSn" id="requstSn"  />
						<table>
							<colgroup>								 
								<col width="11%"/>
								<col width="25%"/>
								<col width="10%"/>
								<col width="25%"/>
								<col width="10%"/>
								<col width="25%"/>
							</colgroup>
							<tr>
								<th class="essential_icon">거래처</th>
								<td><input required readonly type="text" name="bcncNm" id="bcncNm"  class="w150" />
                                </td>
								<th class="essential_icon">프로젝트명</th>
								<td colspan="3"><input required readonly type="text" name="projectNm" id="projectNm" style="width: 425px;"/>
								</td>
							</tr>
                            <tr>
                                <th class="essential_icon">요청자</th>
                                <td><input required type="text" name="rqester" id="rqester"  class="w150" />
                                </td>
                                <th>연락처</th>
                                <td><input type="text" name="rqesterTelno" id="rqesterTelno"  class="w150" />
                                </td>
                                <th>이메일</th>
                                <td><input type="text" name="rqesterEmail" id="rqesterEmail"  class="w150" />
                                </td>
                            </tr>
							<tr>
								<th>장애유형</th>
								<td><div id="divComboRequstTyPopup"></div></td> 
                                <th>요청일</th>
                                <td><input type="text" name="requstDt" id="requstDt" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
								<th class="essential_icon">우선순위</th>
								<td><div id="divComboPriorRankPopup"></div></td>	
							</tr>
							<tr>
    						    <th class="essential_icon">완료요구일</th>
								<td><input required type="text" name="comptRequstDt" id="comptRequstDt" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
								<th>작업유형</th>
								<td colspan="3"><div id="divComboOpertTyPopup"></div></td>
							</tr>					
							<tr>
								<th class="essential_icon">요청메뉴</th>
								<td colspan="5"><input required type="text" name="requstMenu" id="requstMenu" style="width:50%;"/></td>
							</tr>							
							<tr>
								<th class="essential_icon">요청내용</th>
								<td colspan="5"><textarea required name="requstCn" id="requstCn" style="width:99%; height:100px"></textarea></td>
							</tr>
                            <tr>
                                <th class="ar"><button type="button" class="btn_common02" id="fileUpload1"><span class="glyphicon glyphicon-paperclip"></span>첨부파일</button></th>
                                <td colspan="5">
                                    <input type="hidden" name="atchmnfl" id="atchmnflSaveFormStmPrgRequst"/>
                                    <div class="file_box" style="width:100%; height:40px">
                                        <table style="border:0px">
                                            <colgroup>
                                                <col width="*" />
                                                <col width="80" />
                                                <col width="63" />
                                            </colgroup> 
                                            <tr>
                                            <td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>
                                            </tr>                   
                                        </table>
                                    </div>
                                </td>                                 
                            </tr>		
						</table>								 
					
			</div>
               

                    <div class="detail_type01" style="margin-top: 20px;">
                            <table>
                            <colgroup>                               
                                <col width="11%"/>
                                <col width="25%"/>
                                <col width="10%"/>
                                <col width="25%"/>
                                <col width="10%"/>
                                <col width="25%"/>
                            </colgroup>
                            <tr>
                                <th>지시자</th>
                                <td><input type="hidden" name="drctrEmpno" id="drctrEmpno" style="width: 60px;" autocomplete="off" maxlength="15"> 
                                    <input type="text" name="drctrNm" id="drctrNm" autocomplete="off" maxlength="15" readonly>
                                    <button type="button" id="btnDrctrEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
                                </td>
                                <th>작업자</th>
                                <td><input type="hidden" name="opertorEmpno" id="opertorEmpno" style="width: 60px;" autocomplete="off" maxlength="15"> 
                                    <input type="text" name="opertorNm" id="opertorNm" autocomplete="off" maxlength="15" readonly>
                                    <button type="button" id="btnOpertorEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
                                </td>
                                <th>작업단계</th>
                                <td><div id="divComboRequstStepPopup"></div></td>
                            </tr>
                            <tr>
                                <th>지시내용</th>
                                <td colspan="3"><textarea name="drctCn" id="drctCn" style="width:98%;"></textarea></td>
                                <th>완료일자</th>
                                <td><input type="text" name="comptDe" id="comptDe" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
                            </tr>           
                        </table>
                        </div>    
                        
                          
            <div class="detail_type01" style="margin-top: 20px;">
                            <table>
                            <colgroup>                               
                                <col width="11%"/>
                                <col width="25%"/>
                                <col width="10%"/>
                                <col width="25%"/>
                                <col width="10%"/>
                                <col width="25%"/>
                            </colgroup>
                            <tr>
                                <th>승인자</th>
                                <td><input type="text" name="confmerNm" id="confmerNm" autocomplete="off" maxlength="15" style="width: 100px;">   
                                <input type="hidden" name="comptConfmAt" id="comptConfmAt"/> 
                                <div class="checkbox" style="float: right; margin-right: 50px;"><label> 
                                <input type="checkbox" name="comptConfmAtOrg" id="comptConfmAtOrg"><i class="input-helper"></i>
                                <span>완료승인</span>
                                </label></div>
                                </td>
                                <th>승인일</th>
                                <td><input type="text" name="comptConfmDt" id="comptConfmDt" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
                                <th>만족도</th>
                                <td><div id="divComboStsfdgCodePopup"></div></td>
                            </tr>
                            <tr>
                                <th>승인의견</th>
                                <td colspan="5"><textarea name="confmOpn" id="confmOpn" style="width:99%; height:50px"></textarea></td>
                            </tr>           
                        </table>
                        </div>
            </form>
		<div>	
            <div class="popup_footer_box">
            	<button type="button" id="btnPopFormPrgSave" name="btnPopFormPrgSave">
                      <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span>저장
                </button>
                <button type="button" id="btnPopupPrgDelete" name="btnPopupPrgDelete">
                      <span class="glyphicon glyphicon-remove f15 mr5"></span>삭제
                </button>                
                <button type="button" id="btnPopupPrgClose" name="btnPopupPrgClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span>닫기
                </button>
			</div>
		</div>
        
        <div class="div_title">
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>작업결과</span>
                        <span class="table_sumnum ml5" id="spanCntSearchFormOpert">0</span>
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right">
                         <button class="div_title_btn" type="button" id="btnOpertAdd">등록</button>
             <!--             <button class="div_title_btn" id="btnOpertRemove" type="button">삭제</button> -->
                    </div>
                </div>
        
        <div>               
            <div class="div_liner" id="gridPopupOpertList" style="width: 100%; height: 120px;"></div>
        </div>
        
	</div>
</body>
