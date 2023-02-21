
/**                                        
 *    프로그램        :                           
 *    작성자          :                           
 *    작성일자        : 2019.04.29      
 *    사용테이블      : MHS_SCHOOLCD      
 *    첨부파일        :                          
 **/                                        
                                            
var dhxGrid;                                
var dhxCalendarStartDate;                   
var dhxCalendarEndDate;                     
var dhxPaymentddtClsCombo;                  
var dhxInputFormPaymentddtClsCombo;         
var dhxGridBoxMhsSchoolcdListInfo;  
var schoolCd= ""; 						 
											 
$(function() {								 
    cf_InitParam();						 
    cf_SetComponents();					 
    cf_SetEventListener();					 
    cf_SetBinding();						 
    cf_InitForm();							 
    										 
    cf_InitParamInputForm();				 
    cf_SetComponentsInputForm();			 
    cf_SetBindingInputForm();				 
    cf_InitInputForm();					 
});										 
											 
											 
var cf_InitParam = function (){			 
											 
	dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
	dhxCCalendarEndDate  = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});	
	dhxCalendarStartDate.loadUserLanguage("ko");														
    dhxCCalendarEndDate.loadUserLanguage("ko");	
    
    // 시스템 환경설정 검색 기간 설정
    gf_SettingDateInterval('searchSregDt', 'searchEregDt');
    
   	/*																						
    dhxPaymentddtClsCombo = gf_MakeDhxCombo(															
			'divPaymentddtClsComboBox', 																
			'searchForm',																				
			150, 						 																
			'combo/searchStmCode?codeclsCd=C064', 														
			true, 																						
			'code', 																					
			'codeNm',																					
			'',																							
			''); */																						
};																										
																										
var cf_SetComponents = function (){																	
																										
	var dhxGridBoxMhsSchoolcdListInfo = [8]; 							
	/*																									
	 * @param header																					
	 * @param width																						
	 * @param align																						
	 * @param sort																						
	 * @param type	=	dyn, ed : editablel, txt, price, ch : checkbox, coro : combo? read only?, ra, ro : read-only            
	 * @param hidden																											
	 * @param id																												
	 * @param attach																											
	 */																															
	//type	=	dyn, ed : editablel, txt, price, ch : checkbox, coro : combo? read only?, ra, ro : read-only					
	dhxGridBoxMhsSchoolcdListInfo[0]  = gf_MakeDhxGridHeader('선택',        '20',   'center',  'na', 'ch', false, 'selYn', '');	
	dhxGridBoxMhsSchoolcdListInfo[1]  = gf_MakeDhxGridHeader('번호',        '20',   'center',  'str', 'ro', false, 'rnum', '');	
	dhxGridBoxMhsSchoolcdListInfo[2]  = gf_MakeDhxGridHeader('학교 코드',   '50',   'center','  str','ro',false,'schoolCd','');			
	dhxGridBoxMhsSchoolcdListInfo[3]  = gf_MakeDhxGridHeader('학교 명',   '50',   'center','  str','ro',false,'schoolNm','');			
	dhxGridBoxMhsSchoolcdListInfo[4]  = gf_MakeDhxGridHeader('지역 코드',   '50',   'center','  str','ro',false,'areaCd','');			
	dhxGridBoxMhsSchoolcdListInfo[5]  = gf_MakeDhxGridHeader('학교 구분',   '50',   'center','  str','ro',false,'schoolCls','');			
	dhxGridBoxMhsSchoolcdListInfo[6]  = gf_MakeDhxGridHeader('우편 코드',   '50',   'center','  str','ro',false,'postCd','');			
	dhxGridBoxMhsSchoolcdListInfo[7]  = gf_MakeDhxGridHeader('주소',   '50',   'center','  str','ro',false,'addr','');			
	dhxGridBoxMhsSchoolcdListInfo[8]  = gf_MakeDhxGridHeader('전화번호',   '50',   'center','  str','ro',false,'tel','');			
	dhxGridBoxMhsSchoolcdListInfo[9]  = gf_MakeDhxGridHeader('팩스 전화번호',   '50',   'center','  str','ro',false,'faxTel','');			
																																
																																
	dhxGrid = gf_MakeDhxGrid('dataList', dhxGridBoxMhsSchoolcdListInfo, true, false, false);								
	dhxGrid.enableAutoWidth(true);																								
																																
	//grid key입력시																												
	dhxGrid.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){												
		//F2버튼 클릭시 엑셀내려받기																									
		if(keyCode == 113) fn_ExcelDown();																						
	});																															
																																
}																																
																																
var cf_SetEventListener = function (){																							
																																
	$('#btnSearch').unbind("click").bind("click",function(event){															
		fn_InitSortParameter();																									
		fn_SearchBtn();																											
    });																														
																																
	$('.txtDate').unbind("keyup").bind("keyup",function(event){																
		gf_AutoDate(event, this);																								
	});																															
	$('.txtDate').unbind("keypress").bind("keypress",function(event){														
		gf_AutoDate(event, this);																								
	});																															
																																
																																
	//																															
	$('#btnAdd').unbind("click").bind("click",function(event){																
		cf_InitInputForm();																										
    });																														
																																
	$('#btnRemove').unbind("click").bind("click",function() {																
																																
		 var schoolCds = fn_CheckMhsSchoolcd();																	
		 if(gf_IsNull(schoolCds)) {																						
			 gf_DivMsgAlert('삭제할 학교코드관리KEY를 체크해 주세요.');															
			 return false;																										
		 } else {																												
			 if(confirm("정말로 삭제하시겠습니까?")) {																				
				 fn_RemoveMhsSchoolcd(schoolCds);																
			 }																													
		 }																														
	});																															
	$('#btnFormDel').unbind("click").bind("click",function() {																
		if(confirm("정말로 삭제하시겠습니까?")) {																					
			fn_DelMhsSchoolcd(schoolCd);																		
		}																														
	});																															
    //엑셀다운로드(F2)																												
	$('#btnExcel').click(function() {																							
		//dhxGrid.toExcel("https://dhtmlxgrid.appspot.com/export/excel");														
		fn_ExcelDown();																											
	});																															
																																
	$('#btnClose').click(function() {																							
        gf_CloseParentActiveTab();																								
    });																														
																																
    $('#userId').unbind("keypress").bind("keypress",function(event){														
        if(event.charCode == 13) {																								
            $('#btnSearch').click();																							
        }																														
    });																														
																																
    $('#userNm').unbind("keypress").bind("keypress",function(event){														
        if(event.charCode == 13) {																								
            $('#btnSearch').click();																							
        }																														
    });																														
																																
	$('#btnFormSave').unbind("click").bind("click",function() {																 
																																			 
  		if($("#saveForm").validate().form()){																								 
  																																			 
  			var url = "";																													 
  			var jsonParameter = {																											 
			schoolCd    		: $('#saveForm input[name="schoolCd"]').val(),
			schoolNm    		: $('#saveForm input[name="schoolNm"]').val(),
			areaCd    		: $('#saveForm input[name="areaCd"]').val(),
			schoolCls    		: $('#saveForm input[name="schoolCls"]').val(),
			postCd    		: $('#saveForm input[name="postCd"]').val(),
			addr    		: $('#saveForm input[name="addr"]').val(),
			tel    		: $('#saveForm input[name="tel"]').val(),
			faxTel    		: $('#saveForm input[name="faxTel"]').val()
  			};																																 
  																																			 
  			if(!gf_IsNull(schoolCd)) {																								 
  				url = "mhsmng003/modifyMhsSchoolcd";																		 
  			} else {																														 
  				url = "mhsmng003/saveMhsSchoolcd";																	     
  			}																																 
  																																			 
  			var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');  															 
  																																			 
  			if(dataSource.code === '000') {																									 
  				$('.b-close').click();																										 
  				if(!gf_IsNull(schoolCd)) gf_DivMsgAlert('저장 되었습니다.'); 															 
  				else                     gf_DivMsgAlert('등록 되었습니다.');																		 
  				fn_SearchGridList();																										 
  																																			 
  			} else {																														 
  				var errMessage = dataSource.message;																						 
  				if(errMessage.indexOf("ORA-00001") >= 0){																					 
  					gf_DivMsgAlert('이미 등록된 데이타입니다');																				 
  					return;																													 
  				}																															 
  				else gf_DivMsgAlert('저장 되지 않았습니다.' + errMessage);																		 
  			}																																 
    	}																																	 
  																																			 
  		$('div.error').unbind("click").bind("click",function() {			 															 
			$(this).remove();																												 
		});																																	 
  																																			 
    });																																	 
	$('#btnFormReset').unbind("click").bind("click",function() {
		cf_InitInputForm();																													 
	});																																		 
																																
    dhxGrid.attachEvent('onRowSelect', fn_SaveMhsSchoolcd);     														
};																																
																																
var cf_SetBinding = function (){																								
	fn_SearchGridList();																										
};																																
																																
var cf_InitForm = function (){};																								
																																
var fn_SearchBtn = function (){																								
	fn_SearchGridList();																										
}																																
																																
var fn_SearchGridList = function (){																							
	var jsonParameter = {																										
		schoolCd 		: gf_FormGetValue('searchForm', 'schoolCd', '')											
   	};																														
																																
		 schoolCd ='';																                                    
	gf_Transaction('gridList', 'mhsmng003/searchMhsSchoolcd', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');		
};																																
																																
var fn_CallbackSearchGridList = function (strSvcID, targetID, data){															
																																
	if(!gf_IsNull(data.data.records)){																							
		dhxGrid.clearAll();																										
		dhxGrid.parse(data.data.records, 'js');																					
		//gf_PageNate(data,'.paginateDataList','fn_SearchGridListPage');														
																																
	}else{																														
		gf_DivMsgAlert('조회되는 데이터가 없습니다.');																					
	}																															
	cf_InitInputForm();																											
};																																
																																
var fn_SearchGridListPage = function (pageIndex){																				
	fn_SearchGridList();																										
};																																
																																
var fn_SaveMhsSchoolcd = function (rId, cInd) {																			
																																
	schoolCd = ""; 																									
	var title  = "학교코드관리등록";																						
																																
	//선택된 row가 없을 경우 0																											
	if (rId > 0) {																												
		schoolCd = dhxGrid.cells(rId, 2).getValue();																	
		title = "학교코드관리수정";																							
	}																															
	cf_SetBindingInputForm();																									
																																
};																																
																																
var fn_CheckMhsSchoolcd = function (){																					
	var schoolCds = [];																									
	dhxGrid.forEachRow(function(rowId) {																						
		if(dhxGrid.cells(rowId,0).isChecked()){																					
			schoolCds.push( dhxGrid.cells(rowId,2).getValue() );														
		}																														
	});																															
	return schoolCds;																									
};																																
																																
var fn_RemoveMhsSchoolcd = function (schoolCds){																
	var jsonParameter = {																										
		schoolCds: schoolCds.join(',')																			
	};																															
																																
	var dataSource = gf_NoAsyncTransaction('mhsmng003/removeMhsSchoolcd', jsonParameter, 'POST');			
	if(dataSource.code === '000') {																								
		gf_DivMsgAlert('삭제 되었습니다.');																							
		fn_SearchGridList();																									
	} else {																													
		gf_DivMsgAlert('삭제 되지 않았습니다.');																						
	}																															
};																																
																																
var fn_DelMhsSchoolcd = function (schoolCd){																		
																																
	var jsonParameter = {																										
		schoolCds: schoolCd																						
	};																															
																																
	var dataSource = gf_NoAsyncTransaction('mhsmng003/removeMhsSchoolcd', jsonParameter, 'POST');				
	if(dataSource.code === '000') {																								
		gf_DivMsgAlert('삭제 되었습니다.');																							
		fn_SearchGridList();																									
	} else {																													
		gf_DivMsgAlert('삭제 되지 않았습니다.');																						
	}																															
};																																
																																
var fn_InitSortParameter = function (){																						
																																
};																																
//엑셀다운로드 																												    
var fn_ExcelDown = function () {																								
																																
	var jsonParameter = {																										
		schoolCd 		: gf_FormGetValue('searchForm', 'schoolCd', '')											
	};																															
																																
    var header =    [ [ '학교 코드', '학교 명', '지역 코드', '학교 구분', '우편 코드', '주소', '전화번호', '팩스 전화번호']];
    var dataId =    [ [ 'schoolCd', 'schoolNm', 'areaCd', 'schoolCls', 'postCd', 'addr', 'tel', 'faxTel']];
    //left는 공백('')이어도 상관없다.																												 
    var dataAlign = [ [  'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
    var sheetNm =   [ [ '학교코드' ] ];																									 
    var param 	=   [ [ $.param( jsonParameter ) ]];																						 
    var fileNm = '학교코드';																												 
																																			 
    var jsonParameter = {																													 
        headers : header,																													 
        dataIds : dataId, 																													 
        dataAligns : dataAlign,																											 
        sheetNms : sheetNm,																												 
        fileNm : fileNm,																													 
        params : param																														 
    };																																		 
																																			 
    gf_ExcelDown('mhsmng003/excelMhsSchoolcd', jsonParameter);																				 
};																																			 
																																			 
																																			 
																																			 
var cf_InitParamInputForm = function (){																									 
	//																																		 
	dhxCalendarUseSdt = new dhtmlXCalendarObject({input:"useSdt", button:"useSdtIcon"});												 
	dhxCalendarUseSdt.loadUserLanguage("ko");																								 
	dhxInputFormPaymentddtClsCombo = gf_MakeDhxCombo(																						 
			'divInputFormPaymentddtClsComboBox', 																							 
			'saveForm', 																													 
			150, 																															 
			'combo/searchStmCode?codeclsCd=C064', 																							 
			false, 																															 
			'code', 																														 
			'codeNm',																														 
			'',																																 
			'');																															 
};																																			 
																																			 
var cf_SetComponentsInputForm = function (){																								 
	$("#saveForm").validate({																												 
        errorElement: 'div'																												 
    });																																	 
};																																			 
																																			 
																																			 
var cf_SetBindingInputForm = function (){																									 
	fn_SearchInputMhsSchoolcd();																											 
};																																			 
																																			 
var cf_InitInputForm = function (){																										 
	$('#saveForm input[name="schoolCd"]').removeAttr("disabled");																		 
	$('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>저장');												 
																																			 
	//INPUT TEXT																															 
	gf_FormSetValue("saveForm", "schoolCd",        "", "");
	gf_FormSetValue("saveForm", "schoolNm",        "", "");
	gf_FormSetValue("saveForm", "areaCd",        "", "");
	gf_FormSetValue("saveForm", "schoolCls",        "", "");
	gf_FormSetValue("saveForm", "postCd",        "", "");
	gf_FormSetValue("saveForm", "addr",        "", "");
	gf_FormSetValue("saveForm", "tel",        "", "");
	gf_FormSetValue("saveForm", "faxTel",        "", "");
	//INPUT CHECKBOX																														 
	//gf_FormSetValue("saveForm", "retireamtobjYn",  false, "chkbox");																 
	$('#saveForm input[name="schoolCd"]').focus();																						 
	$('#spanDel').hide();																													 
	$('#spanReset').show();																													 
};																																			 
																																			 
var fn_SearchInputMhsSchoolcd = function (){																									 
																																			 
	if (!gf_IsNull(schoolCd)) {																												 
																																			 
		var jsonParameter = {																												 
				schoolCd: schoolCd																											 
		};																																	 
		var dataSource = gf_NoAsyncTransaction('mhsmng003/findMhsSchoolcd', jsonParameter, 'GET');											 
																																			 
		var data = dataSource.data;																											 
																																			 
		//INPUT TEXT																														 
		gf_FormSetValue("saveForm", "schoolCd",     data.schoolCd, "");													 
		gf_FormSetValue("saveForm", "schoolNm",     data.schoolNm, "");													 
		gf_FormSetValue("saveForm", "areaCd",       data.areaCd, "");													 
		gf_FormSetValue("saveForm", "schoolCls",    data.schoolCls, "");													 
		gf_FormSetValue("saveForm", "postCd",       data.postCd, "");													 
		gf_FormSetValue("saveForm", "addr",         data.addr, "");													 
		gf_FormSetValue("saveForm", "tel",          data.tel, "");													 
		gf_FormSetValue("saveForm", "faxTel",       data.faxTel, "");													 
		gf_FormSetValue("saveForm", "regDt",        data.regDt, "");													 
		gf_FormSetValue("saveForm", "regId",        data.regId, "");													 
		gf_FormSetValue("saveForm", "uptDt",        data.uptDt, "");													 
		gf_FormSetValue("saveForm", "uptId",        data.uptId, "");													 
																																			 
		//INPUT CHECKBOX																													 
		gf_FormSetValue("saveForm", "retireamtobjYn",  ((data.retireamtobjYn  == 'Y') ? true : false), "chkbox");						 
																																			 
		// gf_DhxGetValue(dhxPaymentddtClsCombo, id, data.paymentddtCls, "combo")															 
		//gf_DhxSetValue(dhxInputFormPaymentddtClsCombo, "combo",  data.paymentddtCls, '', '');												 
																																			 
		$('#saveForm input[name="schoolCd"]').attr('disabled', 'disabled');																 
		$('#spanDel').show();																												 
		$('#spanReset').hide();																												 
		$('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>수정');										        	 
																																			 
																																			 
	} else {																																 
		$('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>저장');											 
		$('#spanDel').hide();																												 
		$('#spanReset').show();																												 
	}																																		 
};																																			 