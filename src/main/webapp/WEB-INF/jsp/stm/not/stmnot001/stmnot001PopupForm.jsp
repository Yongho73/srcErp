<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
	<script>
    var noticeId = '${paramNoticeId}';
    var writerNm;
    var writerId;
    var nowDate;
    
    var dhxGridStmnotPopup;
    var dhxDataProcessorPopup;  //DataProcessor 객체
    var eventIdStmnotPopup = [];  //그리드 이벤트 객체 
    
	
	var cf_InitParamPopup = function (){
        //세션정보 
        var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
        writerNm = userInfo.data.userNm;
        writerId = userInfo.data.userEmpNo;
        nowDate = new Date().format('YYYY-MM-DD');
        noticeId = '${paramNoticeId}';
        
        fn_FileUploadPrgEvent();
        
        $("#saveFormPjtMtaRequst").validate({ errorElement: 'div', ignore: '' });       
        
	    gf_ComboCode('divComboNoticeKindPopup', 'noticeKind', 'noticeKind', 'reg', 'C195', '' , '', '', 'ordr', 'required'); 
	    gf_ComboCode('divComboNoticeTrgetSePopup', 'noticeTrgetSe', 'noticeTrgetSe', 'reg', 'C198', '' , '', '', 'ordr', 'required');
	};
    
	var cf_SetComponentsPopup = function (){
		
		var dhxGridStmnotPopupHeaderInfo = [];
		dhxGridStmnotPopupHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
		dhxGridStmnotPopupHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmnotPopup" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
		dhxGridStmnotPopupHeaderInfo.push(gf_MakeDhxGridHeader('대상ID', '150', 'center', 'str', 'ro', false, 'noticeTrgetId', '', '')); /* gf_LocaleTrans('default', 'titNoticeTit') */
		dhxGridStmnotPopupHeaderInfo.push(gf_MakeDhxGridHeader('대상이름', '405', 'center', 'int', 'ro', false, 'noticeTrgetIdNm', '', '')); /* gf_LocaleTrans('default', 'titInqireCo') */
		dhxGridStmnotPopupHeaderInfo.push(gf_MakeDhxGridHeader('Id', '100', 'left', 'str', 'ro', true, 'noticeId', '', '')); /* gf_LocaleTrans('default', 'titWriterId') */
        dhxGridStmnotPopupHeaderInfo.push(gf_MakeDhxGridHeader('noticeTrgetSe', '100', 'left', 'str', 'ro', true, 'noticeTrgetSe', '', '')); /* gf_LocaleTrans('default', 'titWriterId') */
        dhxGridStmnotPopupHeaderInfo.push(gf_MakeDhxGridHeader('Sn', '100', 'left', 'str', 'ro', true, 'noticeIdSn', '', '')); /* gf_LocaleTrans('default', 'titWriterId') */
	    dhxGridStmnotPopup = gf_MakeDhxGrid('dataListStmnotPopup', dhxGridStmnotPopupHeaderInfo, true, false, false);
	    dhxGridStmnotPopup.enableAutoWidth(false);
	    dhxGridStmnotPopup.setEditable(true);

	    return true; 
	};

	var cf_SetEventListenerPopup = function (){
		var eventId;
	    eventIdStmnotPopup = gf_GridDetachEvent(dhxGridStmnotPopup, eventIdStmnotPopup);
	    eventId = dhxGridStmnotPopup.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
	        gf_errorMsgClear();
	        if(keyCode == 13)  {   //ENTER  
	            var colNum = dhxGridStmnotPopup.getColumnsNum();
	            var rowNum = dhxGridStmnotPopup.getRowsNum();
	            var selectedId = dhxGridStmnotPopup.getSelectedRowId();
	            var ind        = dhxGridStmnotPopup.getSelectedCellIndex();
	            var rowIndex   = dhxGridStmnotPopup.getRowIndex(selectedId);
	            var type       = dhxGridStmnotPopup.getColType(ind);
	            if(ind == (colNum-1)){ 
	                if(rowIndex == (rowNum-1)) { 
	                    //첫 행으로 가려면 주석 풀기
	                    //dhxGridStmnotPopup.selectRow(0);
	                    //fn_FindStmnotPopup();
	                    //rowIndex = 0;
	                    rStmnotPopupse;
	                } else {
	                    dhxGridStmnotPopup.selectRow(rowIndex + 1);
	                    rowIndex = rowIndex + 1;
	                }
	                ind = 0;
	            }
	            dhxGridStmnotPopup.selectCell(rowIndex, ind+1);
	            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
	                dhxGridStmnotPopup.editCell();
	            }
	        }else if(keyCode == 40)  {   // ARROW_DOWN
	            var selectedId = dhxGridStmnotPopup.getSelectedRowId();
	            var ind        = dhxGridStmnotPopup.getSelectedCellIndex();
	            var rowIndex   = dhxGridStmnotPopup.getRowIndex(selectedId);
	            var type       = dhxGridStmnotPopup.getColType(ind);
	            dhxGridStmnotPopup.selectCell(rowIndex+1, ind);
	            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
	                dhxGridStmnotPopup.editCell();
	            }
	        }else if(keyCode == 38)  {   // ARROW_UP
	            var selectedId = dhxGridStmnotPopup.getSelectedRowId();
	            var ind        = dhxGridStmnotPopup.getSelectedCellIndex();
	            var rowIndex   = dhxGridStmnotPopup.getRowIndex(selectedId);
	            var type       = dhxGridStmnotPopup.getColType(ind);
	            dhxGridStmnotPopup.selectCell(rowIndex-1, ind);
	            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
	                dhxGridStmnotPopup.editCell();
	            }
	        }
	        else return true;
	    });
	    eventIdStmnotPopup.push(eventId);
	    eventId = dhxGridStmnotPopup.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
	        return fn_StmnotPopupSortGridList(ind, type, direction); 
	    });
	    eventIdStmnotPopup.push(eventId);
		$('#checkAllStmnotPopup').unbind('click').bind('click',function() {
	        gf_errorMsgClear();
	        gf_DhxCheckAllGridHeader(dhxGridStmnotPopup, $('#checkAllStmnotPopup').prop('checked'), 'chk');
	    });
	    // 버튼 이벤트 ==========================================================================================
        $('#btnPopFormPrgSave').unbind('click').bind('click', function() {
        	gf_errorMsgClear();
        	gf_DivMsgConfirm(gv_QueSave, "fn_SaveStmnot001Popup()", '');
	    });		
        $('#btnPopupPrgDelete').unbind('click').bind('click', function() {
            gf_errorMsgClear();
        	var imprvmrequstSn =gf_FormGetValue('saveFormStmPrgRequst', 'imprvmrequstSn', 'text');
        	if( gf_IsNull(imprvmrequstSn) ) {
                gf_DivMsgAlert(gv_MsgDelKey);
                return false;
            } else {
               gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveStmPrgRequst()', '');
            }
        }); 
        //팝업창 닫기
        $('#btnPopupPrgClose').unbind('click').bind('click', function() {
            $('#bpopupStmnotReg .b-close').click();
        });
        //조회이력보기
        $('#searchInoqireCo').unbind('click').bind('click', function() {
        	gf_errorMsgClear();
            fn_InoqireCoStmnot001Pop();
        }); 
        $('#addRow').unbind('click').bind('click', function(event){
        	var trgetSe = gf_FormGetValue('saveFormPjtMtaRequst', 'noticeTrgetSe', 'combo');
            gf_errorMsgClear();
            if(trgetSe == '002'){
            	gf_MultiEmpPopup("dataListStmnotPopup","empNo","korNm", "" , "N", "fn_CallbackSearchEmpCode");
            } else if(trgetSe == '003'){
            	gf_DeptPopup("dataListStmnotPopup","deptCode","deptCodeNm", "", "N", "fn_SearchMhsEmpDeptCode");
            } else if(trgetSe == '004'){
            	gf_RequestPopup('dataListStmnotPopup','','','', '', "N", "fn_CallbackGridPopComp");
            } else if (trgetSe == '001'){
            	gf_DivMsgAlert('전체인 경우 추가를 하실 수 없습니다.'); 
            } else {
            	gf_DivMsgAlert('추가할 대상을 선택해 주세요.', '#noticeTrgetSe'); 
            }
        });
        $('#deleteRow').unbind('click').bind('click', function() {
            gf_errorMsgClear();
            var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmnotPopup, 'chk');
            if(gf_IsNull(rowIds)) {
                gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
                return false;
            } else {
                var state;
                dhxGridStmnotPopup.forEachRow(function(rowId) {
                    state = dhxDataProcessorPopup.getState(rowId);
                    if(dhxGridStmnotPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridStmnotPopup, 'chk')).isChecked()){
                        if(state == 'inserted') {
                            var rowNum = dhxGridStmnotPopup.getRowIndex(rowId);
                            dhxGridStmnotPopup.deleteRow(rowId);
                            dhxGridStmnotPopup.selectRow(rowNum);
                        }
                        else dhxDataProcessorPopup.setUpdated(rowId, true, 'deleted');
                    }
                });
            }
        });
        // 폼 이벤트 start ==========================================================================================
        $('#saveFormPjtMtaRequst input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
            if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPjtMtaRequst",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
            else return true; 
        }); 
        $('#saveFormPjtMtaRequst select[name="noticeTrgetSe"]').unbind('change').bind('change',function() {
            gf_errorMsgClear();
            var trgetSe = $(this).val();
        });
	};
	var cf_InitFormStmPrgRequst = function() {
	    $('#saveFormPjtMtaRequst').resetForm();
	};
	var cf_SetBindingStmPrgRequst = function() {
// 	    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
        
	    fn_SearchPopup();
	};
	/******************************************************************************************************************************
	*                                                     <함수 구현 부분>
	*  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
	*  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
	******************************************************************************************************************************/
	/**
	* 조회
	*/
	var fn_SearchPopup = function() {
	    if(gf_IsNull(noticeId)){
            fn_FormDisabled(false);
            
            gf_FormSetValue('saveFormPjtMtaRequst', 'writerNm', writerNm, 'text');
            gf_FormSetValue('saveFormPjtMtaRequst', 'writerId', writerId, 'text');
            gf_FormSetValue('saveFormPjtMtaRequst', 'regDt', nowDate, 'text');
            gf_FormSetValue('saveFormPjtMtaRequst', 'openAt', true, 'chkbox');
            gf_FormSetValue('saveFormPjtMtaRequst', 'noticeTrgetSe', '001', 'combo');
            $('#searchInoqireCo').hide();
		} else {
            fn_FormDisabled(false);
            var jsonParameter = {
                    noticeId : noticeId
                };
            var dataSource = gf_NoAsyncTransaction('stmnot001/findStmnot001' ,jsonParameter , 'GET');
            var data = dataSource.data;
            gf_FormSetValue('saveFormPjtMtaRequst' , 'regDt' , data.regDt, '');
            gf_FormSetValue('saveFormPjtMtaRequst' , 'writerNm' , data.writerNm, '');
            gf_FormSetValue('saveFormPjtMtaRequst' , 'writerId' , data.writerId, '');
            gf_FormSetValue('saveFormPjtMtaRequst' , 'noticeTit' , data.noticeTit, '');
            gf_FormSetValue('saveFormPjtMtaRequst' , 'noticeKind' , data.noticeKind, 'combo');
            gf_FormSetValue('saveFormPjtMtaRequst' , 'openAt' , (data.openAt == '1')? true:false, 'chkbox');
            gf_FormSetValue('saveFormPjtMtaRequst' , 'noticeCn' , data.noticeCn, 'textarea');
            gf_FormSetValue('saveFormPjtMtaRequst' , 'inqireCo' , data.inqireCo, '');
            gf_FormSetValue('saveFormPjtMtaRequst' , 'noticeTrgetSe' , data.noticeTrgetSe, 'combo');

            gf_FormSetValue('saveFormPjtMtaRequst', 'atchmnfl', data.atchmnflNo, 'text');  //첨부파일 
            gf_FormSetValue('saveFormPjtMtaRequst', 'atchmnflList', data.atchmnflNo, 'text');  //첨부파일 
            var jsonParameter = { atchFiles : data.atchmnflNo };
            gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
            
            if(Number(data.inqireCo) > 0 && gf_IsNull(data.inqireCo)){
            	fn_FormDisabled(true);
            }
            $('#saveFormPjtMtaRequst input[name="openAt"]').prop('disabled', false);
            $('#searchInoqireCo').show();
            
            jsonParameter = {
                    noticeId : data.noticeId
                };
            console.log(jsonParameter);
            gf_Transaction( '', 'stmnot001/gridStmnot001', jsonParameter, 'fn_CallbackSearchPopup', false, 'GET');
		 }
	 };
	 
	//사원대상
	var fn_CallbackSearchPopup = function(strSvcID, targetID, data) {
	    //dhxGridStmnotPopup.clearAll();
		dhxGridStmnotPopup.destructor();
		if(cf_SetComponentsPopup()){ 
		    fn_DhxDataProcessorPopup(); 
		    if(!gf_IsNull(data.data.records)){
		        gf_NoFoundDataOnGridMsgRemove('dhxGridStmnotPopup');
		        dhxGridStmnotPopup.parse(data.data.records, 'js');
		    } else {
		        gf_NoFoundDataOnGridMsg('dhxGridStmnotPopup');
		    }
		    cf_SetEventListenerPopup();
	    } 
    };
    var fn_DhxDataProcessorPopup = function(check) {
        // 그리드입력 데이터프로세스 정의
        dhxDataProcessorPopup = new dataProcessor(gv_ContextPath+'/stmnot001/saveStmnot001Popup'); //lock feed url
        dhxDataProcessorPopup.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
        dhxDataProcessorPopup.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
        dhxDataProcessorPopup.init(dhxGridStmnotPopup); //link dataprocessor to the grid
        dhxDataProcessorPopup.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
        dhxDataProcessorPopup.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
        };
        dhxDataProcessorPopup.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
            	var jsonParameter = { noticeId : noticeId }
            	gf_NoAsyncTransaction('stmnot001/deleteStmnot001', jsonParameter, 'POST');
            	
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                    return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                fn_SearchPopup();
                $("#checkAllStmnotPopup").prop('checked', false); //상단 체크박스 해제
                return true;
            } else {
                var jsonParameter = { noticeId : noticeId }
                gf_NoAsyncTransaction('stmnot001/deleteStmnot001', jsonParameter, 'POST');
                gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                return false;
            }
        });
    };
    
    var fn_FormDisabled = function(status) {
        $('#saveFormPjtMtaRequst *').prop('disabled', status);
    }
    
    /**
     * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
     */
    var fn_StmnotPopupSortGridList = function(ind, type, direction){ 
        if(ind != gf_GetDhxGridColumId(dhxGridStmnotPopup, 'num')){ 
            var sortOrder = gf_FormGetValue('saveFormPjtMtaRequst', 'sortDirection', 'text'); 
            var sortColumId = gf_FormGetValue('saveFormPjtMtaRequst', 'sortColumId', 'text');
            var nowSortColumId = gf_GetDhxGridColum(dhxGridStmnotPopup, ind);
            // 정렬 컬럼이 바뀌면 정렬방식 초기화 
            if(direction == "des"){ 
                dhxGridStmnotPopup.setSortImgState(true, ind, 'des'); 
                gf_FormSetValue('saveFormPjtMtaRequst', 'sortDirection', 'des', 'text');
                gf_FormSetValue('saveFormPjtMtaRequst', 'sortColumId', gf_GetDhxGridColum(dhxGridStmnotPopup, ind), 'text'); 
            } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
                dhxGridStmnotPopup.setSortImgState(false); 
                gf_FormSetValue('saveFormPjtMtaRequst', 'sortDirection', '', 'text');
                gf_FormSetValue('saveFormPjtMtaRequst', 'sortColumId', '', 'text'); 
                dhxGridStmnotPopup.sortRows(0,"int","asc");  //번호로 강제 정렬 
                return false; 
            } else { 
                dhxGridStmnotPopup.setSortImgState(true, ind, 'asc'); 
                gf_FormSetValue('saveFormPjtMtaRequst', 'sortDirection', 'asc', 'text');
                gf_FormSetValue('saveFormPjtMtaRequst', 'sortColumId', gf_GetDhxGridColum(dhxGridStmnotPopup, ind), 'text'); 
            } 
            //재조회 필요 화면에서는 조회 함수 호출 
            return true; 
        }
        return false; 
    };
	 
    /* 저장 */
    var fn_SaveStmnot001Popup = function(){
    	var result = false;
    	var gridCnt = 0;
    	var checkNoticeTrgetSe = gf_FormGetValue('saveFormPjtMtaRequst', 'noticeTrgetSe', 'combo');
    	
    	if($('#saveFormPjtMtaRequst').validate().form()){
    		if(gf_IsNull(checkNoticeTrgetSe)){
                gf_DivMsgAlert("공지 대상을 선택해 주세요.", '#noticeTrgetSe');
                result = true;
            }
            if(checkNoticeTrgetSe != '001' && checkNoticeTrgetSe != ''){
                dhxGridStmnotPopup.forEachRow(function(row){
                    state = dhxDataProcessorPopup.getState(row);
                    if(state != 'deleted'){
                       gridCnt += 1;            
                    }
                });
                if(gridCnt <= 0 && checkNoticeTrgetSe != '001' && checkNoticeTrgetSe != ''){
                    gf_DivMsgAlert("공지 대상을 추가하여 주세요.");
                    result = true;
                }
            }
            if(!result){
        		var jsonParameter = {
        				noticeId : noticeId,
    //     				regDt : gf_FormGetValue('saveFormPjtMtaRequst', 'regDt', 'text'),
        				writerNm : gf_FormGetValue('saveFormPjtMtaRequst', 'writerNm', 'text'),
        				writerId : gf_FormGetValue('saveFormPjtMtaRequst', 'writerId', 'text'),
        				noticeTit : gf_FormGetValue('saveFormPjtMtaRequst', 'noticeTit', 'text'),
        				noticeCn : gf_FormGetValue('saveFormPjtMtaRequst', 'noticeCn', 'textarea'),
        				openAt : gf_IsNull(gf_FormGetValue('saveFormPjtMtaRequst', 'openAt', 'chkbox'))?'0':'1',
        				noticeKind : gf_FormGetValue('saveFormPjtMtaRequst', 'noticeKind', 'combo'),
        				noticeTrgetSe : gf_FormGetValue('saveFormPjtMtaRequst', 'noticeTrgetSe', 'combo'),
        				atchmnflNo : gf_FormGetValue('saveFormPjtMtaRequst', 'atchmnflList', 'text'),
        				inqireCo : gf_FormGetValue('saveFormPjtMtaRequst', 'inqireCo', 'text')
        			    };
        	    var dataSource = gf_NoAsyncTransaction('stmnot001/saveStmnot001', jsonParameter, 'POST');
        	    if(dataSource.code === '000'){
        	    	dhxDataProcessorPopup.sendData();
                } else {
                    gf_DivMsgAlert('문제있다');
            	}
            }
        }
    }
    
    /* 사원선택 */
    var fn_CallbackSearchEmpCode = function(data){
    	dhxGridStmnotPopup.forEachRow(function(index){
            for(row in data){
                if(gf_DhxGetValue(dhxGridStmnotPopup, index, 'noticeTrgetIdNm', 'grid') == data[row].korNm){
                    delete data[row];
                }           
            }
        });
        for(row in data){
            var initValueArr = [];
            initValueArr.push(''); //no
            initValueArr.push(''); //checkbox
            initValueArr.push(data[row].empno); //Id
            initValueArr.push(data[row].korNm); //Nm
            initValueArr.push(noticeId); //noticeTrgetId
            initValueArr.push('002'); //noticeTrgetSe
            initValueArr.push('');
            dhxGridStmnotPopup.addRow(dhxGridStmnotPopup.uid(), initValueArr, 0);
        }
    }
    var fn_SearchMhsEmpDeptCode = function(data){
    	dhxGridStmnotPopup.forEachRow(function(index){
            for(row in data){
                if(gf_DhxGetValue(dhxGridStmnotPopup, index, 'noticeTrgetIdNm', 'grid') == data[row].orgnztNm){
                    delete data[row];
                }           
            }
        });
        
        if(!gf_IsNull(data.deptCode)) {
            var initValueArr = [];
            initValueArr.push('');  //no
            initValueArr.push('');  //checkbox
            initValueArr.push(data.orgnztCode);  //Id
            initValueArr.push(data.orgnztNm);   //Nm
            initValueArr.push(noticeId); //noticeTrgetId
            initValueArr.push('003');
            initValueArr.push('');
            dhxGridStmnotPopup.addRow(dhxGridStmnotPopup.uid(), initValueArr , 0);
        }
    }
    
    var fn_CallbackGridPopComp = function(data){
    	dhxGridStmnotPopup.forEachRow(function(index){
            for(row in data){
                if(gf_DhxGetValue(dhxGridStmnotPopup, index, 'noticeTrgetIdNm', 'grid') == data[row].roleNm){
                    delete data[row];
                }           
            }
        });
        console.log(data)
        if(!gf_IsNull(data.roleCode)) {
            var initValueArr = [];
            initValueArr.push('');
            initValueArr.push('');
            initValueArr.push(data.roleCode);
            initValueArr.push(data.roleNm);
            initValueArr.push(noticeId); //noticeTrgetId
            initValueArr.push('004');
            initValueArr.push('');
            dhxGridStmnotPopup.addRow(dhxGridStmnotPopup.uid(), initValueArr , 0);
        }
    }
	 
    var gf_RequestPopup = function(formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {

        var userId = ""; 
        var title  = "그룹권한구분";
        var codeInfo = "popupDtlRequestInfo";   
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

        if(typeof searchFlag == "undefined" || searchFlag == null){
            searchFlag = "";
        }
        
        $popupDtlRequestInfo = {};
        
        
        var dhxWindowObj;
        var dhxWindows;
        
        if($('body').find("div[id='popupDtlRequestPopup']").size() <= 0) {
            $('body').append("<div id='popupDtlRequestPopup' formid='" + formId + "' codeKindCode='" + codeKindCode + "' codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
        }
        $('#popupDtlRequestPopup').bPopup({
            onOpen:function(){
                
                dhxWindows = new dhtmlXWindows();
                
                var id      = 'popupDtlRequestPopup';
                var ajaxUrl = gv_ContextPath+'/stmqes001/pop/popupDtlRequest/view';
                var left    = 0;
                var top     = 0;
                var width   = 350;
                var height  = 480;

                dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
                dhxWindows.window(id).centerOnScreen();
                dhxWindowObj.setText(title);
                dhxWindowObj.attachURL(ajaxUrl, true, true);
                dhxWindowObj.detachObject(true);
                dhxWindowObj.attachEvent("onClose", function(win){
                    $('#popupDtlRequestPopup .b-close').click();
                });
            },
            onClose:function(){
                if ( !gf_IsNull(callFunction) ) {
                    callbacks.empty();
                    callbacks.add(callFunction);
                    callbacks.fire($popupDtlRequestInfo);
                }
                
                dhxWindows.unload();
                $('body').find("div[id='popupDtlRequestPopup']").remove();
            }
        });
        return dhxWindowObj;
    }
	
	/**********************************************************파일 핸들링 시작**************************************************************/
	var fn_FileUploadPrgEvent = function(){
    
    $(".file_box").css('height','75px'); //높이 줄이기
    
    $('#fileUpload3').unbind("click").bind("click",function(event){
        gf_FileUploadPopup(
                'fn_FileUploadPrgEvent', 
                'btnUploadedFiledelete3', 
                'fileList3', 
                'atchmnfl', 
                 uploadedFileKeysPrg3, 
                 uploadedFileInfoPrg3,
                 0,
                'all',
                'fn_CallBackPrgFileUpload');
    });
    
    $('.btnUploadedFiledelete3').unbind("click").bind("click",function(event){          
         
        uploadedFileKeysPrg3.splice($(this).attr('idx'), 1);
        uploadedFileInfoPrg3.splice($(this).attr('idx'), 1);
        
        $('#fileList3 .file_box table tr').remove();
        
        var idx = 0;
        var fileInfos = [];
        var atchFileList = [];
        
        $.each( uploadedFileInfoPrg3, function( key, value ) {
            
            fileInfos = uploadedFileInfoPrg3[key].split('|^|');
            
            atchFileList.push('<tr>');
            atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
            atchFileList.push('<td class="ar">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
            atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
            atchFileList.push('</tr>');

            idx++;
        });                             
        
        $('#fileList3 .file_box table').append(atchFileList.join(""));
        $('#atchmnfl').val(uploadedFileKeysPrg3.join("|"));
        
        fn_FileUploadPrgEvent();
        
    });
}
	var fn_SearchPrgFileList = function (strSvcID, targetID, data){
        $('#fileList3 .file_box table tr').remove();
        uploadedFileKeysPrg3 = [];
        uploadedFileInfoPrg3 = [];
    
        var atchFileList = [];
        var idx = 0;
        $.each( data.data, function( key, value ) {
            uploadedFileKeysPrg3.push(value.atchFileId);                
            uploadedFileInfoPrg3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);  
            
            atchFileList.push('<tr style=\"border:0\">');
            atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
            atchFileList.push('<td style=\"width: 15%;\" class="ar">'+gf_FileSizeExpression(value.fileSize)+'</td>');
            atchFileList.push('<td style=\"width: 15%;\" class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
            atchFileList.push('</tr>');
            
            idx++;
        });
    
        if(gf_IsNull(atchFileList)) {               
            atchFileList.push('<tr>');
            atchFileList.push('<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>');                
            atchFileList.push('</tr>');                             
        }
        
        $('#fileList3 .file_box table').append(atchFileList.join(""));
        $('#atchFileIds3').val(uploadedFileKeysPrg3.join("|"));
        fn_FileUploadPrgEvent();
    };  
    
       
    var fn_CallBackPrgFileUpload = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
        if(!gf_IsNull(data)){
            
            var idx = 0;
            var fileInfos = [];
            var atchFileList = [];
            keyArr  = [];  //기존파일들 배열 초기화
            infoArr = [];
            
            $.each( data, function( key, value ) {                      
                fileInfos = value.split('|^|');         
                keyArr.push(fileInfos[0]);
                infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);                                    
            });
            
            $('#'+viewDivId+' .file_box table tr').remove();
            $('#'+dataDivId).val("");
            $.each( infoArr, function( key, value ) {
                
                fileInfos = infoArr[key].split('|^|');
    
                atchFileList.push('<tr>');
                atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
                atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
                atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del '+deleteBtnClassNm+'"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
                atchFileList.push('</tr>');
                     
                idx++;
            });                             
                        
            $('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
            $('#'+dataDivId).val(keyArr.join("|"));
            gf_FormSetValue('saveFormPjtMtaRequst', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
            gf_FormSetValue('saveFormPjtMtaRequst', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
            
            var callbacks = $.Callbacks();
            var callFunction = eval(eventFunction);
            callbacks.empty();
            callbacks.add(callFunction);
            callbacks.fire();
        }
    };
    
    var fn_CallBackZipPopup = function(data){
        if(!gf_IsNull(data)){
            gf_FormSetValue('saveFormPjtMtaRequst', 'postCode', data.zipno, 'text');  
            gf_FormSetValue('saveFormPjtMtaRequst', 'adres', data.roadAddr1, 'text');
            gf_FormSetValue('saveFormPjtMtaRequst', 'addr2',(data.roadAddrDetail + " " + data.roadAddr2).trim(), 'text');
        }
    }
	/**********************************************************파일 핸들링 끝**************************************************************/
	
	
    
    $(function() {
        cf_InitParamPopup(); 
        cf_SetComponentsPopup();    
        cf_SetEventListenerPopup(); 
        cf_SetBindingStmPrgRequst();          
    });
	
    </script>
		<div id="saveForm" style="margin: 10px 10px 10px 10px">
        <form id="saveFormPjtMtaRequst">
				<div class="detail_type01">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
						<table>
							<colgroup>								 
								<col width="15%"/>
								<col width="35%"/>
								<col width="15%"/>
								<col width="35%"/>
					
							</colgroup>
							<tr>
								<th class="essential_icon">작성일자</th>
								<td><input required="true" readonly type="text" name="regDt" id="regDt" style="width:98%"/>                                
                                </td>
								<th class="essential_icon">작성자</th>
								<td><input readonly type="text" name="writerNm" id="writerNm" style="width:98%"/>
								<input required="true" readonly type="hidden" name="writerId" id="writerId" style="width:98%"/></td>
							</tr>
                            <tr>
                                <th class="essential_icon">공지제목</th>
                                <td colspan="3"><input required="true" type="text" name="noticeTit" id="noticeTit"  style="width:99%"/>
                                </td>
                            </tr>
							<tr>
								<th class="essential_icon">공지구분</th>
								<td><div id="divComboNoticeKindPopup"></div></td> 
                                <th>공개여부</th>
                                <td>
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name="openAt" id="openAt"/>
                                            <i class="input-helper"></i>
                                        </label>
                                    </div>
                                </td>
							</tr>			
							<tr>
								<th class="essential_icon">공지내용</th>
								<td colspan="3"><textarea required="true" name="noticeCn" id="noticeCn" style="width:99%; height:80px"></textarea></td>
							</tr>
                            <tr>
                                <th>
                                    <button type="button" class="btn_common02" id="fileUpload3">
                                    <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                    </button>
                                </th>
                                <td colspan="5" id="fileList3">         
                                    <input type="hidden" name="atchmnflList" id="atchmnflList" />
                                    <input type="hidden" name="atchmnfl" id="atchmnfl"/>  
                                    <div class="file_box" style="width:100%; height:50px">
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
                                    <span style="color:red"> 파일전송 후 반드시  "저장" 버튼을 클릭하여 파일정보를 저장해야 합니다.</span> 
                                </td>                                 
                            </tr>
                            <tr>
                                <th>조회수</th>
                                <td colspan="3"><input readonly type="text" name="inoqireCo" id="inoqireCo" style="width:13%"/>
                                <button type="button" id="searchInoqireCo" class="btn_common02">조회이력보기</button></td> 
                            </tr>	
                            <tr>
                                <th class="essential_icon">공지대상<br><div id="divComboNoticeTrgetSePopup"></div></th>
                                <td colspan="3">
                                    <div class="item" style="width:calc(100% - 1px);" id="empGridData">
                                        <div class="div_title">
                                            <!-- <div class="left">
                                                <span class="table_sumnum" id="spanCntSearchStmnotPopup">0</span>
                                            </div> -->
                                            <div class="right ml7">
                                                <button class="div_title_btn" type="button" id="addRow">행추가</button>
                                                <button class="div_title_btn" type="button" id="deleteRow">행삭제</button>
                                            </div>
                                        </div>
                                        <div class="mt5 outer_line_grid" style="width: 650px; height:calc(100vh - 500px) !important;">
                                            <div class="dhtml_grid" id="dataListStmnotPopup"> <!-- 그리드 영역 -->
                                            </div>
                                        </div>
                                    </div>
                                </td>   
                            </tr>   	
                        </table>
			         </div>
                 </form>
        	    <div>
                    <div class="popup_footer_box"">
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
        	</div>
        </body>
