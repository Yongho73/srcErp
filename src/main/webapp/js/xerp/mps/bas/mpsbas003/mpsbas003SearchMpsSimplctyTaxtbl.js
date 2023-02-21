/**
 * 프로그램 : 근로소득 간이세액표 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.11
 * 사용테이블 : MPS_SIMPLCTY_TAXTBL
 **/

var dhxGridMpsSimplctyTaxtbl;
var dhxGridMpsSimplctyTaxtblListInfo;
var applcBeginYm = '';
var lwltAmt = '';
var uplmtAmt = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMpsSimplctyTaxtbl = gf_LocaleTrans('default','titMpsSimplctyTaxtbl');

var uploadedFileKeys2 = []; // db 저장용 (키만 파이프라인으로 구분)
var uploadedFileInfo2 = []; // 화면에 저장된 정보 표시용 (삭제 기능) 


var dhxDataProcessor;

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
    fn_FileUploadBtnEvent();
});

var cf_InitParam = function (){

    fn_SetMenuPath("MPSBAS003");
    gf_FormSetValue("searchFormMpsSimplctyTaxtbl", "applcYm",    gv_CurYymm, "");
    $(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
};

var fn_FileUploadBtnEvent = function(){
	/*
	두번째 첨부파일
	- 파일업로드 버튼 이벤트 파라메터 -> 이벤트 함수명, 삭제버튼클래스명, 업로드한 파일목록 화면, 업로드한 파일 db 입력용, db저장 배열, 화면표시 배열
	- 삭제버튼 이벤트 파라메터 ->  이벤트 함수명, 삭제할 배열의 인덱스, 삭제버튼클래스명, 업로드한 파일목록 화면, 업로드한 파일 db 입력용, db저장 배열, 화면표시 배열
	*/
	$('#btnUp').unbind("click").bind("click",function(event){
		uploadedFileKeys2  = [];
		uploadedFileInfo2  = [];
		//File 업로드
		gf_FileUploadPopup(
					'fn_FileUploadBtnEvent', 
					'btnUploadedFiledelete2', 
					'fileList2', 
					'atchFileIds2', 
					 uploadedFileKeys2, 
					 uploadedFileInfo2, 
					 1,
				    'excel',
			        'fn_FileUpLoadAfter');
	});
	$('#btnUp2').unbind("click").bind("click",function(event){
		uploadedFileKeys2  = [];
		uploadedFileInfo2  = [];
		//File 업로드
		gf_FileUploadPopup(
					'fn_FileUploadBtnEvent', 
					'btnUploadedFiledelete2', 
					'fileList2', 
					'atchFileIds2', 
					 uploadedFileKeys2, 
					 uploadedFileInfo2, 
					 1,
				    'excel',
			        'fn_FileUpLoadAfter2');
	});
	//업로드된 파일 삭제
	$('.btnUploadedFiledelete2').unbind("click").bind("click",function(event){			
		//업로드된 파일 삭제
		gf_DeleteAtachFile(
				'fn_FileUploadBtnEvent', 
				 $(this).attr('idx'), 
				'btnUploadedFiledelete2', 
				'fileList2', 
				'atchFileIds2', 
				 uploadedFileKeys2, 
				 uploadedFileInfo2);
	});
	
};
//파일업로드
var fn_FileUpLoadAfter = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	
	if(!gf_IsNull(data)){		
		
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		$('#'+dataDivId).val("");
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
		});
		$('#'+dataDivId).val(keyArr.join("|"));
		
		var callbacks = $.Callbacks();
	    var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
        callbacks.fire();
        
        var atchFileId =  keyArr.join("|");
        
        if(atchFileId != ""){
   			var jsonParameter = {
   					atchFileId       :  atchFileId
   			};
   			
   		 	var url = "mpsbas003/excelUploadMpsSimplctyTaxtbl";
            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
           
            gf_DivMsgAlert(gv_MsgUpdate);
              
            fn_SearchGridList();
     	}
        
	}
};
//파일업로드
var fn_FileUpLoadAfter2 = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	if(!gf_IsNull(data)){		
		
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		$('#'+dataDivId).val("");
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
		});
		$('#'+dataDivId).val(keyArr.join("|"));
		
		var callbacks = $.Callbacks();
	    var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
        callbacks.fire();
        
        var atchFileId =  keyArr.join("|");
        
        if(atchFileId != ""){
   			var jsonParameter = {
   					atchFileId       :  atchFileId
   			};
   			
   		 	var url = "mpsbas003/excelUploadMpsSimplctyTaxtbl2";
            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
           
            gf_DivMsgAlert(gv_MsgUpdate);
              
            fn_SearchGridList();
     	}
        
	}
};


var cf_SetComponents = function (){
	
	var dhxGridMpsSimplctyTaxtblListInfo = [];

    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMtsalaryamt'), '130', 'center', 'str', 'ron', false, 'applcBeginYm', '')); //월급여액[비과세 및 학자금 제외] 적용 시작 년월
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'right', 'edn', 'ron', false, 'lwltAmt', '')); // 하한 금액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'right', 'edn', 'ron', false, 'uplmtAmt', '')); // 상한 금액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '130', 'center', 'str', 'ro', false, 'applcEndYm', '')); // 적용 종료 년월
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDdctrgetFamilyCo'), '90', 'right', 'int', 'edn', false, 'family1Tax', '')); // 가족1 세액 titDdctrgetFamilyCo 공제대상 가족의 수
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'int', 'edn', false, 'family2Tax', '')); // 가족2 세액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'int', 'edn', false, 'family3Tax', '')); // 가족3 세액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'int', 'edn', false, 'family4Tax', '')); // 가족4 세액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'int', 'edn', false, 'family5Tax', '')); // 가족5 세액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'int', 'edn', false, 'family6Tax', '')); // 가족6 세액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'int', 'edn', false, 'family7Tax', '')); // 가족7 세액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'int', 'edn', false, 'family8Tax', '')); // 가족8 세액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'int', 'edn', false, 'family9Tax', '')); // 가족9 세액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'int', 'edn', false, 'family10Tax', '')); // 가족10 세액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'int', 'edn', false, 'family11Tax', '')); // 가족11 세액
    dhxGridMpsSimplctyTaxtblListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 가족11 세액

    
	var attachHeaderArr = [];
	attachHeaderArr.push([gf_LocaleTrans('default', 'titApplcBeginYm'),
		                  gf_LocaleTrans('default', 'titLwltAmt'),
		                  gf_LocaleTrans('default', 'titUplmtAmt'),
		                  gf_LocaleTrans('default', 'titApplcEndYm'),
		                   "1", "2", "3", "4", "5","6","7","8","9","10","11","#rspan"]);
	
	dhxGridMpsSimplctyTaxtbl = gf_MakeDhxGrid('dataList', dhxGridMpsSimplctyTaxtblListInfo, false, true, false, attachHeaderArr);	// divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr
	 
	dhxGridMpsSimplctyTaxtbl.setNumberFormat("0,000", 1, ".", ",");
	dhxGridMpsSimplctyTaxtbl.setNumberFormat("0,000", 2, ".", ",");
	 
	for(var i = 4; i < 15; i++){
		 dhxGridMpsSimplctyTaxtbl.setNumberFormat("0,000", i, ".", ",");
	}

    dhxGridMpsSimplctyTaxtbl.enableAutoWidth(true);
    dhxGridMpsSimplctyTaxtbl.enableEditEvents(true,false,true);
    
    dhxGridMpsSimplctyTaxtbl.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
    	if(keyCode == 113) fn_ExcelDown();     
    	//if(keyCode == 40)
    });
    
    $("#saveFormMpsSimplctyTaxtbl").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormMpsSimplctyTaxtbl input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMpsSimplctyTaxtbl .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMpsSimplctyTaxtbl .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMpsSimplctyTaxtbl #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });
    //이전달
    $('#searchFormMpsSimplctyTaxtbl #btnPrevMm').unbind('click').bind('click', function(event){
    	 var applcYm = gf_FormGetValue('searchFormMpsSimplctyTaxtbl', 'applcYm', '').replaceAll("-","");
    	 gf_FormSetValue('searchFormMpsSimplctyTaxtbl', 'applcYm', gf_PrevYyMm(applcYm), 'text');
    });
    //다음달
    $('#searchFormMpsSimplctyTaxtbl #btnNextMm').unbind('click').bind('click', function(event){
    	 var applcYm = gf_FormGetValue('searchFormMpsSimplctyTaxtbl', 'applcYm', '').replaceAll("-","");
    	 gf_FormSetValue('searchFormMpsSimplctyTaxtbl', 'applcYm', gf_NextYyMm(applcYm), 'text');
    });
    
    
    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMpsSimplctyTaxtbl.clearSelection();
          if(!fadeRegs) {
              $('#saveForm').fadeOut(gv_FadeTime, function() {
                  cf_InitInputForm();
                  fadeRegs = true;
                  fadeMode = false;
              });
              $('#saveForm').fadeIn(gv_FadeTime, function() {});
          } else {
              cf_InitInputForm();
          }
    });

    $('.tdl-1 #btnRemove').unbind('click').bind('click', function() {
        var applcBeginYms = fn_CheckMpsSimplctyTaxtbl('applcBeginYm');
        var lwltAmts = fn_CheckMpsSimplctyTaxtbl('lwltAmt');
        var uplmtAmts = fn_CheckMpsSimplctyTaxtbl('uplmtAmt');
        if( gf_IsNull(applcBeginYms) && gf_IsNull(lwltAmts) && gf_IsNull(uplmtAmts) ) {
             gf_DivMsgAlert(gv_MsgDelKey);
             return false;
        } else {
            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveAll()', '');
        }
    });

    $('.tdl-2 #btnFormRemove').unbind('click').bind('click', function() {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveOne()', '');
    });

    $('#btnExcel').unbind('click').bind('click', function() {
        fn_ExcelDown();
    });

    $('#btnClose').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });

    $('#btnSave').unbind('click').bind('click', function() {

    	for(var i = 2; i < 8; i++){
    		//validation Check
    		dhxDataProcessor.setVerificator(i, fn_NumCheck); // ValidInteger , fn_NumCheck   
    	}                                                                                   
    	dhxDataProcessor.sendData();                                                         
    	//저장후 메시지 처리                                                                     
    	dhxDataProcessor.attachEvent("onAfterUpdate", function(id,action,tid,dataSource){   
    	 	if (dataSource.code !== "000"){                                                 
    		   gf_DivMsgAlert(dataSource.message);                                          
    		   if(dataSource.message.indexOf("ORA-01722")>=0) {                             
    			   gf_DivMsgAlert("ROW " + id + ": 숫자를 정확히 입력해 주세요");                   
    			   return;                                                                  
    		   }                                                                            
    		   else  gf_DivMsgAlert(dataSource.message);                                    
    	 	}                                                                               
    	    else {                                                                          
    		   gf_DivMsgAlert(gv_MsgSave);                                                  
    	       return true;                                                                 
    	   }                                                                                
    	 });                                                                                
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMpsSimplctyTaxtbl.forEachRow(function(rowId) {
            dhxGridMpsSimplctyTaxtbl.cells(rowId,0).setChecked(checkAll);
        });
    });

    $('#btnFormReset').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchGridList();
};

var cf_InitForm = function (){};

var cf_InitInputForm = function (){

    applcBeginYm = '';
    lwltAmt = '';
    uplmtAmt = '';

    $("#h4_pr_title").text(titMpsSimplctyTaxtbl + ' ' + gv_TitRegist);
    $('#saveFormMpsSimplctyTaxtbl input[name="applcBeginYm"]').removeAttr("disabled");
    $('#saveFormMpsSimplctyTaxtbl input[name="lwltAmt"]').removeAttr("disabled");
    $('#saveFormMpsSimplctyTaxtbl input[name="uplmtAmt"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'applcBeginYm', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'lwltAmt', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'uplmtAmt', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'applcEndYm', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family1Tax', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family2Tax', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family3Tax', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family4Tax', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family5Tax', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family6Tax', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family7Tax', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family8Tax', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family9Tax', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family10Tax', '', 'text');
    gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family11Tax', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

	var jsonParameter = {
    	applcYm       :  gf_FormGetValue('searchFormMpsSimplctyTaxtbl', 'applcYm', '').replaceAll("-", "")
    };
	
    gf_Transaction('gridList', 'mpsbas003/searchMpsSimplctyTaxtbl', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
    dhxDataProcessor = new dataProcessor("/xerp/mpsbas003/modifyMpsSimplctyTaxtbl"); //lock feed url
    dhxDataProcessor.setTransactionMode('POST',false);
    dhxDataProcessor.setUpdateMode("off"); 
    dhxDataProcessor.init(dhxGridMpsSimplctyTaxtbl); //link dataprocessor to the grid
   
};
var  fn_NumCheck = function(value,id,ind) {
	if(value == ""|| value == "0") return true;
	if (parseFloat(value)<0 || parseFloat(value) == NaN){ 
		dhxGridMpsSimplctyTaxtbl.setCellTextStyle(id, ind,"background-color:yellow;");
	}
	return parseFloat(value)>0;
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
	
    dhxGridMpsSimplctyTaxtbl.clearAll();
    
    
    if(!gf_IsNull(data.data.records)){
        dhxGridMpsSimplctyTaxtbl.parse(data.data.records, 'js');
        //dhxGrid.setColSorting("str,str,str,int,int,str,int,int,int,int,int,int,int,int,int,int,int");
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    
    $("#spanCnt").text(data.data.records.length);
    
    cf_SetEventListener();
};

var fn_SaveMpsSimplctyTaxtbl = function (rId, cInd) {
    applcBeginYm = '';
    lwltAmt = '';
    uplmtAmt = '';
    var title = titMpsSimplctyTaxtbl + ' ' + gv_TitRegist;

    if (rId > 0) {
    applcBeginYm = '';
    applcBeginYm = dhxGridMpsSimplctyTaxtbl.cells(rId, 2).getValue();
    lwltAmt = '';
    lwltAmt = dhxGridMpsSimplctyTaxtbl.cells(rId, 3).getValue();
    uplmtAmt = '';
    uplmtAmt = dhxGridMpsSimplctyTaxtbl.cells(rId, 4).getValue();
        title = titMpsSimplctyTaxtbl  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMpsSimplctyTaxtbl();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMpsSimplctyTaxtbl();
     }
};

var fn_CheckMpsSimplctyTaxtbl = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMpsSimplctyTaxtbl, col);
    dhxGridMpsSimplctyTaxtbl.forEachRow(function(rowId) {
        if(dhxGridMpsSimplctyTaxtbl.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMpsSimplctyTaxtbl.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var applcBeginYms = [];
    applcBeginYms.push( applcBeginYm );
    var lwltAmts = [];
    lwltAmts.push( lwltAmt );
    var uplmtAmts = [];
    uplmtAmts.push( uplmtAmt );
    fn_RemoveMpsSimplctyTaxtbl( applcBeginYms, lwltAmts, uplmtAmts );
};

var fn_RemoveAll = function(){
    var applcBeginYms = fn_CheckMpsSimplctyTaxtbl('applcBeginYm');
    var lwltAmts = fn_CheckMpsSimplctyTaxtbl('lwltAmt');
    var uplmtAmts = fn_CheckMpsSimplctyTaxtbl('uplmtAmt');
    fn_RemoveMpsSimplctyTaxtbl( applcBeginYms, lwltAmts, uplmtAmts );
};

var fn_RemoveMpsSimplctyTaxtbl = function ( applcBeginYms, lwltAmts, uplmtAmts ){
    var jsonParameter = {
        applcBeginYms : applcBeginYms.join(','),
        lwltAmts : lwltAmts.join(','),
        uplmtAmts : uplmtAmts.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mpsbas003/removeMpsSimplctyTaxtbl', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {
	$.blockUI();

    var jsonParameter = {
    		applcYm       :  gf_FormGetValue('searchFormMpsSimplctyTaxtbl', 'applcYm', '').replaceAll("-","")
    };
    var header = [[		gf_LocaleTrans('default', 'titApplcBeginYm'),
	                    gf_LocaleTrans('default', 'titLwltAmt'),
	                    gf_LocaleTrans('default', 'titUplmtAmt'),
	                    gf_LocaleTrans('default', 'titApplcEndYm'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo'),
	                    gf_LocaleTrans('default', 'titDdctrgetFamilyCo')],
                      [ gf_LocaleTrans('default', 'titApplcBeginYm'),
                        gf_LocaleTrans('default', 'titLwltAmt'),
                        gf_LocaleTrans('default', 'titUplmtAmt'),
                        gf_LocaleTrans('default', 'titApplcEndYm'),
                        gf_LocaleTrans('default', 'titFamily1Tax'),
                        gf_LocaleTrans('default', 'titFamily2Tax'),
                        gf_LocaleTrans('default', 'titFamily3Tax'),
                        gf_LocaleTrans('default', 'titFamily4Tax'),
                        gf_LocaleTrans('default', 'titFamily5Tax'),
                        gf_LocaleTrans('default', 'titFamily6Tax'),
                        gf_LocaleTrans('default', 'titFamily7Tax'),
                        gf_LocaleTrans('default', 'titFamily8Tax'),
                        gf_LocaleTrans('default', 'titFamily9Tax'),
                        gf_LocaleTrans('default', 'titFamily10Tax'),
                        gf_LocaleTrans('default', 'titFamily11Tax')
                    ]
    			];
    var dataId = [[ 'applcBeginYm', 'lwltAmt', 'uplmtAmt', 'applcEndYm', 'family1Tax', 'family2Tax', 'family3Tax', 'family4Tax', 'family5Tax', 'family6Tax', 'family7Tax', 'family8Tax', 'family9Tax', 'family10Tax', 'family11Tax' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsSimplctyTaxtbl ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsSimplctyTaxtbl;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mpsbas003/excelMpsSimplctyTaxtbl', jsonParameter);
};

var fn_SearchInputMpsSimplctyTaxtbl = function (){

    if( !gf_IsNull(applcBeginYm) && !gf_IsNull(lwltAmt) && !gf_IsNull(uplmtAmt) ) {

        var jsonParameter = {
            applcBeginYm : applcBeginYm ,
            lwltAmt : lwltAmt ,
            uplmtAmt : uplmtAmt 
        };

        var dataSource = gf_NoAsyncTransaction('mpsbas003/findMpsSimplctyTaxtbl', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'applcBeginYm', data.applcBeginYm, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'lwltAmt', data.lwltAmt, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'uplmtAmt', data.uplmtAmt, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'applcEndYm', data.applcEndYm, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family1Tax', data.family1Tax, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family2Tax', data.family2Tax, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family3Tax', data.family3Tax, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family4Tax', data.family4Tax, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family5Tax', data.family5Tax, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family6Tax', data.family6Tax, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family7Tax', data.family7Tax, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family8Tax', data.family8Tax, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family9Tax', data.family9Tax, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family10Tax', data.family10Tax, 'text');
        gf_FormSetValue('saveFormMpsSimplctyTaxtbl', 'family11Tax', data.family11Tax, 'text');

        $('#saveFormMpsSimplctyTaxtbl input[name="applcBeginYm"]').attr("disabled", true);
        $('#saveFormMpsSimplctyTaxtbl input[name="lwltAmt"]').attr("disabled", true);
        $('#saveFormMpsSimplctyTaxtbl input[name="uplmtAmt"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
