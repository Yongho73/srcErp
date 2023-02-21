/**
 *    프로그램       : 통상임금관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.19
 *    사용테이블      : MPS_MT_ODYSG
 * sourceGen version : 2020.06.29.01 (2020.08.19)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpscal026 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpscal026 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpscal026 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpscal026 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpscal026 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpscal026 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpscal026 = 0;  //그리드 삭제 수량 

var gridTitleHeader ="";
var gridTitleDataId ="";
var gridTitleDataAlign = "";
var gridTitleDataFormat = "";
var salaryitemCode = "";
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscal026();
    cf_SetComponentsMpscal026();
    cf_SetEventListenerMpscal026();
    cf_InitFormMpscal026();
    cf_SetBindingMpscal026();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscal026 = function() {
    gf_SetMenuPath();
    $("#saveFormMpscal026").validate({ errorElement: 'div', ignore: '' });
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
};

var dhxGridMpscal026;
var cf_SetComponentsMpscal026 = function() {
    var dhxGridMpscal026HeaderInfo = [];
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    //dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscal026" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('적용 년월', '100', 'left', 'str', 'ro', false, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('부서', '100', 'left', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('성명', '100', 'center', 'str', 'ro', false, 'kornm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    //dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('급여항목 코드', '100', 'center', 'str', 'ro', false, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('기본급', '100', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('정근수당', '100', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('정근수당가산금', '100', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('특정업무수당', '100', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('사서수당', '100', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('기술수당', '100', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('전산수당', '100', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */    
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('직급보조비', '100', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('정액급식비', '100', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('직책급수행비', '100', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('관리업무보전수당', '120', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('통상임금', '*', 'right', 'int', 'ro', false, 'amt', '', '')); /* gf_LocaleTrans('default', 'titAmt') */
    $("#dataListMpscal026").css("width","100%");
    dhxGridMpscal026 = gf_MakeDhxGrid('dataListMpscal026', dhxGridMpscal026HeaderInfo, true, false, false);
    dhxGridMpscal026.enableAutoWidth(false);
    dhxGridMpscal026.setEditable(true);

    dhxGridMpscal026.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    

};

var eventIdMpscal026 = [];
var cf_SetEventListenerMpscal026 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscal026 = gf_GridDetachEvent(dhxGridMpscal026, eventIdMpscal026);
    eventId = dhxGridMpscal026.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscal026();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscal026.getColumnsNum();
            var rowNum = dhxGridMpscal026.getRowsNum();
            var selectedId = dhxGridMpscal026.getSelectedRowId();
            var ind        = dhxGridMpscal026.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal026.getRowIndex(selectedId);
            var type       = dhxGridMpscal026.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscal026.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscal026.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscal026.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal026.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscal026.getSelectedRowId();
            var ind        = dhxGridMpscal026.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal026.getRowIndex(selectedId);
            var type       = dhxGridMpscal026.getColType(ind);
            dhxGridMpscal026.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal026.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscal026.getSelectedRowId();
            var ind        = dhxGridMpscal026.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal026.getRowIndex(selectedId);
            var type       = dhxGridMpscal026.getColType(ind);
            dhxGridMpscal026.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal026.editCell();
            }
        }
        else return true;
    });
    eventIdMpscal026.push(eventId);
    eventId = dhxGridMpscal026.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpscal026SortGridList(ind, type, direction); 
    });
    eventIdMpscal026.push(eventId);
    eventId = dhxGridMpscal026.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscal026.push(eventId);
    eventId = dhxGridMpscal026.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpscal026.push(eventId);
    
    eventId = dhxGridMpscal026.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
    	var a_idx = gf_GetDhxGridColumId(dhxGridMpscal026,"'a00'"); //통상임금 
    	var odysgAmt = 0;
    	for(var i = 5; i < a_idx; i++){    		
    		odysgAmt = odysgAmt + parseInt(dhxGridMpscal026.cells(rId, i).getValue());
    	}
    	gf_DhxSetValue(dhxGridMpscal026, rId,"'a00'", '' + odysgAmt, 'grid'); // 통상임금 재계산    	
        return true;
    });
    eventIdMpscal026.push(eventId);  
    //eventId = dhxGridMpscal026.attachEvent("onCellChanged",function(rId, cInd, value){    	
    //    return true;
    //});    
    //eventIdMpscal026.push(eventId);
    
    // 버튼 이벤트 ==========================================================================================
    //저장
    $('#btnSaveMpscal026').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        setTimeout(function(){    	fn_SaveMpscal026();     }, 1);  
    	//fn_SaveMpscal026();   
    });
    //엑셀내려받기
    $('#btnExcelMpscal026').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscal026();        
    });
    //조회
    $('#btnSearchMpscal026').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscal026Title('');
    });
    //초기화
    $('#btnResetMpscal026').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscal026();
    });
    //통상임금 재계산
    $('#btnOdysgReCalcMpscal026').unbind("click").bind("click",function() {
    	 gf_errorMsgClear();
    	 fn_OdysgReCalcMpscal026();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpscal026').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscal026, $('#checkAllMpscal026').prop('checked'), 'chk');
    });
    $('#searchFormMpscal026 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        //if(event.charCode == 13) { $('#btnSearchMpscal026').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        //else return true; 
    
    	   if(event.charCode == 13) { 
           	if(this.id == "deptCode"){
           		return fn_SearchMhsEmpDeptCode();
           	} else if(this.id == "deptCodeNm"){
           		return fn_SearchMhsEmpDeptCode();
           	} else if(this.id == "empno"){                           		
           		fn_SearchEmpCode("1");
           		return false;
           	} else if(this.id == "korNm"){
           		fn_SearchEmpCode("1");
           		return false;
           	} else{           		
           		$('#searchFormMpscal026').click(); 
           		event.preventDefault(); return true;
           	} 
           } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
           else return true; 
    }); 

    $('#saveFormMpscal026').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    
    
    // 사원, 부서 pop 이벤트 ===========================================================================================
       //사원 선택 검색
   	$('#searchFormMpscal026 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
   		gf_EmpPopup("searchFormMpscal026","empNmSearchFormMpscal026","empCodeNmSearchFormMpscal026", gBplcCode, "Y", "fn_CallbackSearchPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
       });
   	//사원 입력 후 Enter 이벤트
   	$('#empNmSearchFormMpscal026').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			$('#empCodeNmSearchFormMpscal026').focus();
   	    }
       });
   	$('#empCodeNmSearchFormMpscal026').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			fn_SearchEmpCode("1");
   	    }
       });
   	//사원 선택 Popup
       $('#searchFormMpscal026 #btnempnoSearchSearchFormMpscal026').unbind('click').bind('click', function(event){
   		gf_EmpPopup("searchFormMpscal026","empno","korNm", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
       });
       
       //부서 선택 Popup
   	$('#searchFormMpscal026 #btnDeptCodeSearchSearchFormMpscal026').unbind('click').bind('click', function(event){
   		gf_DeptPopup("searchFormMpscal026","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
     });
   	
   	
    //사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();			
			//fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal026', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal026', 'empno', '', 'text');
	    }
		
    });
   	//부서 입력 후 Enter 이벤트
   	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			//$('#empNm').focus();
   			fn_SearchMhsEmpDeptCode();
   	    } else if (event.keyCode != 13 && event.keyCode != 9) {
   	    	gf_FormSetValue('searchFormMpscal026', 'deptCodeNm', '', 'text');
   	    }
       });
   	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
   		if (event.keyCode == 13)  {
   			//$('#empNm').focus();
   			fn_SearchMhsEmpDeptCode();
   	    } else if (event.keyCode != 13 && event.keyCode != 9) {
   	    	gf_FormSetValue('searchFormMpscal026', 'deptCode', '', 'text');
   	    }
       });    
};

var cf_InitFormMpscal026 = function() {
    $('#searchFormMpscal026').resetForm();
    gf_DateYm("applcYmSearchFormMpscal026"); //해당년도
};

var cf_SetBindingMpscal026 = function() {
//    fn_SearchMpscal026('');
    fn_SearchMpscal026Title('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/

/**
 * 조회
 */
var fn_SearchMpscal026Title = function(userId) {
    var jsonParameter = {
        applcYm : gf_FormGetValue('searchFormMpscal026', 'applcYm', 'text').replaceAll("-","")
    };
    gf_Transaction(userId, 'mpscal026/searchMpscal026Title', jsonParameter, 'fn_CallbackSearchMpscal026Title', false, 'GET');
    
};
/**
 * 조회
 */
var fn_SearchMpscal026 = function(userId) {
    var jsonParameter = {
        applcYm            : gf_FormGetValue('searchFormMpscal026', 'applcYm', 'text').replaceAll("-",""),
        empno               : gf_FormGetValue('searchFormMpscal026', 'empno', 'text'),
        salaryitemCode : salaryitemCode,
        deptCode          : gf_FormGetValue('searchFormMpscal026', 'deptCode', 'text')
    };
    gf_Transaction(userId, 'mpscal026/searchMpscal026', jsonParameter, 'fn_CallbackSearchMpscal026', false, 'GET');
    
};
var fn_CallbackSearchMpscal026Title= function(strSvcID, targetID, data) {
   
    if(!gf_IsNull(data.data.records)){
    
    	var dhxGridMpscal026HeaderInfo = [];
        dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로        
        dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('적용 년월', '100', 'left', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */        
        dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('부서', '120', 'left', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
        dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
        dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'kornm', '', '')); /* gf_LocaleTrans('default', 'titKornm') */
        
        
        gridTitleHeader    = "[['적용년월','부서', '사원번호','성명' ";
        gridTitleDataId     = "[['applcYm', 'deptNm','empno' ,'kornm' " ;
        gridTitleDataAlign = "[['center','left', 'center','left' ";
        gridTitleDataFormat = "[['yyyy-mm','', '','' ";
        
        var subTotalList = "";
        
        for(var i=0; i < data.data.records.length; i++){        	
        	dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader(data.data.records[i].salaryitemNm, '110', 'right', 'int', 'edn', false, "'" + data.data.records[i].salaryitemCode.toLowerCase() + "'"  , '', '')); /* gf_LocaleTrans('default', 'titAmt') */
         	gridTitleHeader = gridTitleHeader + ", '" + data.data.records[i].salaryitemNm + "'";
        	gridTitleDataId  =  gridTitleDataId  + ",  '\\'" +  data.data.records[i].salaryitemCode.toLowerCase() + "\\''";
        	gridTitleDataAlign = gridTitleDataAlign + ", 'right' ";        	
        	gridTitleDataFormat = gridTitleDataFormat + ", '#,##0' ";
        	subTotalList = subTotalList + ",<div style='text-align:right;'>{#stat_total}</div>";
        }
        dhxGridMpscal026HeaderInfo.push(gf_MakeDhxGridHeader('통상임금', '*', 'right', 'int', 'ron', false,"'a00'" , '', '')); /* gf_LocaleTrans('default', 'titAmt') */
        
        gridTitleHeader = gridTitleHeader + ", '통상임금' ]] ";        
        gridTitleDataId = gridTitleDataId + ",  '\\'a00\\'' ]]";       
        gridTitleDataAlign = gridTitleDataAlign + " , 'right' ]]";
        gridTitleDataFormat = gridTitleDataFormat + " , '#,##0' ]]";
        subTotalList = subTotalList + ",<div style='text-align:right;'>{#stat_total}</div>";

        $("#dataListMpscal026").css("width","100%");

        dhxGridMpscal026 = gf_MakeDhxGrid('dataListMpscal026', dhxGridMpscal026HeaderInfo, true, false, false);
        dhxGridMpscal026.enableAutoWidth(false);
        dhxGridMpscal026.setEditable(true);
        dhxGridMpscal026.setColumnMinWidth(120,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스

        dhxGridMpscal026.attachFooter("<div style='text-align:right;'>합계</div>,#cspan,#cspan,#cspan,#cspan" + subTotalList ,["text-align:right;"]);   // 컬럼 수량만큼 정의, 합계가 필요한 컬럼 부분에 <div>추가하고 ID 부여
        //
        for(var i=0; i < data.data.records.length+1 ; i++){
        	dhxGridMpscal026.setNumberFormat("0,000", i+5, ".", ",");       
        }
        
        
        for(var i=0; i < data.data.records.length; i++){    
        	if(i == 0)  salaryitemCode = "'" +   data.data.records[i].salaryitemCode  +"' " ; // 
        	else         salaryitemCode = salaryitemCode + ",'" +   data.data.records[i].salaryitemCode  +"'  " ; //
        }
        salaryitemCode = salaryitemCode + ",'A00'  " ; //
       // cf_SetEventListenerMpscal026();
        fn_SearchMpscal026('');
      
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscal026');
    }
};


var dhxDataProcessorMpscal026;

var fn_CallbackSearchMpscal026 = function(strSvcID, targetID, data) {
    dhxGridMpscal026.clearAll();
    fn_DhxDataProcessorMpscal026(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscal026');
        console.log("data.data.records" + JSON.stringify(data.data.records));
        dhxGridMpscal026.parse(data.data.records, 'js');
 
        if(save_Row_Ids_Mpscal026 == 0 && save_All_Sta_Mpscal026 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscal026.selectRow(0); 
        } else if(save_Row_Sta_Mpscal026 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpscal026.selectRow(0);
        } else if(save_All_Sta_Mpscal026 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpscal026.selectRow(save_Row_Num_Mpscal026); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpscal026.selectRow(save_Row_Num_Mpscal026);   //개발자 수정 필요  
            //var findCell = dhxGridMpscal026.findCell(save_Row_Ids_Mpscal026, gf_GetDhxGridColumId(dhxGridMpscal026,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscal026.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscal026.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscal026');
    }
    $("#spanCntSearchFormMpscal026").text(data.data.records.length);
    cf_SetEventListenerMpscal026();
};
var fn_DhxDataProcessorMpscal026 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpscal026 = new dataProcessor(gv_ContextPath+'/mpscal026/saveMpscal026'); //lock feed url
    dhxDataProcessorMpscal026.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscal026.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscal026.init(dhxGridMpscal026); //link dataprocessor to the grid
    dhxDataProcessorMpscal026.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscal026.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscal026.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    //fn_SearchMpscal026('');
                    fn_SearchMpscal026Title('');
                    $("#checkAllMpscal026").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 추가(신규) 
 */
var fn_AddMpscal026 = function() {
    dhxGridMpscal026.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //applcYm
    initValueArr.push(''); //empno
    initValueArr.push(''); //salaryitemCode
    initValueArr.push(''); //amt
    dhxGridMpscal026.addRow(dhxGridMpscal026.uid(), initValueArr, 0);
    dhxGridMpscal026.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscal026');
    $('#btnPopEmpSearchMpscal026').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpscal026SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscal026, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscal026', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscal026', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscal026, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscal026.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscal026', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscal026', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal026, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscal026.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscal026', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscal026', 'sortColumId', '', 'text'); 
            dhxGridMpscal026.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscal026.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscal026', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscal026', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal026, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscal026 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpscal026 = 0; 
    save_Edt_Cnt_Mpscal026 = 0; 
    save_Del_Cnt_Mpscal026 = 0;

    dhxGridMpscal026.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscal026.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscal026.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpscal026 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpscal026 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpscal026 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        var confirmMsg  = ""; 
        var confirmMsg1 = ""; 
        var confirmMsg2 = ""; 
        var confirmMsg3 = ""; 
        save_All_Sta_Mpscal026 = 0; 
        if(save_Add_Cnt_Mpscal026 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpscal026 + "건";
            save_All_Sta_Mpscal026 = 1; 
        } 
        if(save_Edt_Cnt_Mpscal026 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpscal026 + "건"; 
        } 
        if(save_Del_Cnt_Mpscal026 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpscal026 + "건"; 
            save_All_Sta_Mpscal026 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
         
        if(confirmModalMpscal026(confirmMsg)){  //여기는 안옴         
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        }
    }
}
var confirmModalMpscal026 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscal026_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscal026_Send = function() {
	
    if(fn_GridValidation(dhxGridMpscal026, dhxDataProcessorMpscal026)) {
        dhxDataProcessorMpscal026.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscal026 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal026, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscal026.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscal026.getState(rowId);
            if(dhxGridMpscal026.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal026, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscal026.getRowIndex(rowId);
                    dhxGridMpscal026.deleteRow(rowId);
                    dhxGridMpscal026.selectRow(rowNum);
                }
                else dhxDataProcessorMpscal026.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscal026 = function () {
    var titMpscal026 = '통상임금관리';  /* gf_LocaleTrans('default', 'titMpscal026') */
    
    var jsonParameter = {
        applcYm            : gf_FormGetValue('searchFormMpscal026', 'applcYm', 'text').replaceAll("-",""),
        empno               : gf_FormGetValue('searchFormMpscal026', 'empno', 'text'),
        deptCode          : gf_FormGetValue('searchFormMpscal026', 'deptCode', 'text'),
        salaryitemCode : salaryitemCode
    };    
    
    var header = eval(gridTitleHeader);
    var dataId =  eval(gridTitleDataId);
    var dataAlign = eval(gridTitleDataAlign);
    var dataFormat = eval(gridTitleDataFormat);
        
    var sheetNm = [[ titMpscal026 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscal026;
    
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        dataFormats : dataFormat,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscal026/excelMpscal026', jsonParameter);
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormMpscal026 #applcYmSaveFormMpscal026').parent().append(
    '<div class="error" id="applcYmSaveFormMpscal026-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal026 #empnoSaveFormMpscal026').parent().append(
    '<div class="error" id="empnoSaveFormMpscal026-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal026 #salaryitemCodeSaveFormMpscal026').parent().append(
    '<div class="error" id="salaryitemCodeSaveFormMpscal026-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscal026 = function(applcYm, empno, salaryitemCode){
    if(!gf_IsNull(applcYm) && !gf_IsNull(empno) && !gf_IsNull(salaryitemCode)) {
        var jsonParameter = {
            applcYm : applcYm,
            empno : empno,
            salaryitemCode : salaryitemCode
        };
        var dataSource = gf_NoAsyncTransaction('mpscal026/findMpscal026', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYm) && gf_IsNull(data.empno) && gf_IsNull(data.salaryitemCode)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}
/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){	    	
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkApplcYm;
    var checkEmpno;
    var checkSalaryitemCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpscal026 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpscal026 = 0;
        save_Row_Ids_Mpscal026 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpscal026 = rowNum;
        save_Row_Ids_Mpscal026 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpscal026 = rowNum;
        save_Row_Ids_Mpscal026 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                
                if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, "'p00'", 'grid') )){
    				//gf_DhxSetValue(dhxGridObjet, rowId, "'p00'", '', 'grid');
    				//fn_GridValidationSelectCell(dhxGridObjet, rowId, "'p00'");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, "'p00'");
                	//alert("금액은  숫자만 입력 가능합니다.");
    				//gf_DivMsgAlert("금액은  숫자만 입력 가능합니다.");    				
    				valid = false;
    			}
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMpscal026.selectRowById(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}
/**
 * 그리드 validation 빨간색 언더바
 */
var fn_GridValidationSelectCell = function(dhxGrid, dhxDataProcessor, rId, cInd){
    dhxGrid.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {
            dhxGrid.forEachCell(rowId, function(cellObj, ind){
                dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
            });
        }
    });
    setTimeout(function(){
        dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
    },1);
}


function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpscal026', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpscal026', 'empno', data.empno, 'text');
}

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMpscal026', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMpscal026', 'deptCodeNm', 'text');
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : gBplcCode
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}
function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
if(!gf_IsNull(data.data.records) && totCnt == 1){
	//단건
	var data = data.data.records[0];
		gf_FormSetValue('searchFormMpscal026', 'deptCode', data.deptCode, 'text');   		
		gf_FormSetValue('searchFormMpscal026', 'deptCodeNm', data.deptKorNm, 'text');
		//setDateFormat("%Y-%m-%d","%Y%m%d")
} 
else {
	//Popup 호출
	gf_DeptPopup("searchFormMpscal026","deptCode","deptCodeNm", gBplcCode, "Y", null);
}
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpscal026', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpscal026', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMpscal026', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal026', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMpscal026', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal026', 'korNm', 'text');
	}
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : gBplcCode
	};
	gf_Transaction(gubun, 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}
function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	  	if(strSvcID == "1"){
	 		gf_FormSetValue('searchFormMpscal026', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal026', 'korNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMpscal026', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal026', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMpscal026', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMpscal026', 'deptCode', data.deptCode, 'text');
	  	}
	}
	else {
	  	//Popup 호출
	    gf_EmpPopup("searchFormMpscal026","empno","korNm", gBplcCode, "Y");
	}	
}

//통상임금 재계산
var fn_OdysgReCalcMpscal026 = function () {
	var applcYm = gf_FormGetValue('searchFormMpscal026', 'applcYm', 'text');
	var msg = "기준년월 : [ " + applcYm +  " ]  <br>통상임금 재계산을 하시겠습니까?";
	var jsonParameter = {
	        applcYm : gf_FormGetValue('searchFormMpscal026', 'applcYm', 'text').replaceAll("-",""),
	        empno : ''
	    };	    	    
    gf_DivMsgConfirm2(msg, function(confirm){ 
	        if(confirm){ 
	            result = true;
	            gf_Transaction('', 'mpscal026/selectMpscal026OdysgCalc', jsonParameter, 'fn_CallbackSearchMpscal026OdysgCalc', false, 'GET'); 
	        } 
	}); 
};
var fn_CallbackSearchMpscal026OdysgCalc= function(strSvcID, targetID, data) {	
	gf_DivMsgAlert('통상임금 계산이 완료되었습니다.<br> 통상임금 변동시 초과근무수당 및 연차수당 재계산처리를 하시기 바랍니다.');
	
	fn_SearchMpscal026Title('');
};