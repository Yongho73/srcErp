/**
 * 프로그램 : 인사기본 화면 중 Tab3(가족) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.03.03
 * 사용테이블 : MHS_INDVDLINFO 및 MHS_MLTPWR
 **/

var tab3_empno = '';

var titMhsFamily = gf_LocaleTrans('default','titMhsFamily');

var g_Tab3SearchValue = new Object();  // 정보 최초 조회 값

var dhxGridMhsEmpFamily;  //GRID
var dhxDataProcessorMhsEmpFamily;  //DataProcessor

$(function() {
    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();
});

var cf_InitParam = function (){
	//
};


var cf_SetComponents = function (){

    var dhxGridMhsEmpFamilyListInfo = [];
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'cntr', false, '', '','')); // 번호  //(header, width, align, sort, type, hidden, id, attach, valid)
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrb001Family" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); 
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('관계', '100', 'center', 'str', 'coro', false, 'familyCode', '','NotEmpty')); // 관계(select box)
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmplNm'), '100', 'center', 'str', 'ed', false, 'familyNm', '','NotEmpty')); // 성명 
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titIhidnum'), '120', 'center', 'str', 'ed', false, 'ihidnum', '','')); // 주민등록번호
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('연락처', '100', 'center', 'str', 'ed', false, 'mbtlnum', '', '')); // 연락처
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('동거여부', '70', 'center', 'na', 'ch', false, 'livtgtAt', '', '')); // 동거여부(check box)
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('가족수당\n여부', '70', 'center', 'na', 'ch', false, 'allwncTrgetAt', '', '')); // 가족수당여부(check box)
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('장애인\n여부', '70', 'center', 'na', 'ch', false, 'dspsnAt', '', '')); // 장애인여부(check box)
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('장애구분', '120', 'center', 'str', 'coro', false, 'dspsnSeCode', '', '')); // 장애구분(select box)
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('직업', '150', 'center', 'str', 'ed', false, 'occpNm', '', '')); // 직업
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('직장', '200', 'center', 'str', 'ed', false, 'wrcNm', '', '')); // 직장
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOfcpsNm'), '100', 'center', 'str', 'ed', false, 'ofcpsNm', '', '')); // 직위
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('연말정산\n대상여부', '90', 'center', 'na', 'ch', false, 'yndexcclcTrgetAt', '', '')); // 연말정산대상여부(check box)
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('인적공제\n구분', '150', 'center', 'str', 'coro', false, 'yndexcclcRelateCode', '', '')); // 인적공제구분(select box)
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'empno', '', '')); // 원 사원번호
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'familySn', '', '')); // 원 가족순번
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'suportAt', '', '')); // 갑근세계산여부
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'lscholSeCode', '', '')); // 최종학력코드
    dhxGridMhsEmpFamilyListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'ihidnumOl', '', '')); // 원 주민등록번호
    
    dhxGridMhsEmpFamily = gf_MakeDhxGrid('MhsEmpFamilyDataList', dhxGridMhsEmpFamilyListInfo, true, false, false, false);  //(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr)

    //관계
    //var jsonParameter1 = {codekindCode : "C019",exceptCode :"",sortOrder :"asc" };
    //var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, ''); //기존 코드조회 쿼리 사용 
    //gf_ComboDataSet(dhxGridMhsEmpFamily, dhxGridMhsEmpFamily.getColIndexById("familyCode"), dataSource1.data, "sel"); /* 그리드콤보*/
    var comboFamilyCode = dhxGridMhsEmpFamily.getCombo(2);
	gf_MakeComboGrid(comboFamilyCode, 'sel', 'mhshrm006/searchMhshrm006Code', 'familyCode', 'familyRelateNm', '');
    
    //장애구분
	var jsonParameter2 = {codekindCode : "C152",exceptCode :"",sortOrder :"asc" };
    var dataSource2 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter2, '');
    gf_ComboDataSet(dhxGridMhsEmpFamily, dhxGridMhsEmpFamily.getColIndexById("dspsnSeCode"), dataSource2.data, "sel");
	
    //인적공제구분
	var jsonParameter2 = {codekindCode : "C084",exceptCode :"",sortOrder :"asc" };
    var dataSource2 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter2, '');
    gf_ComboDataSet(dhxGridMhsEmpFamily, dhxGridMhsEmpFamily.getColIndexById("yndexcclcRelateCode"), dataSource2.data, "sel");
	
    dhxGridMhsEmpFamily.setColSorting(",na,,,,,,,,,,,,,,");
    //dhxGridMhsEmpFamily.setNumberFormat("0,000", 2, ".", ",");  //(string mask,number cInd,string p_sep,string d_sep)
    //dhxGridMhsEmpFamily.enableAutoWidth(true);
    dhxGridMhsEmpFamily.enableEditEvents(true,false,true);  //(boolean click,boolean dblclick,boolean f2Key)
    
    $("#saveFormEmp_Tab3_Family").validate({
        errorElement: 'div'
    });
};


var eventIdsMhsEmpFamily = [];
var cf_SetEventListener = function (){

	var eventId;
	eventIdsMhsEmpFamily = gf_GridDetachEvent(dhxGridMhsEmpFamily, eventIdsMhsEmpFamily);
    eventId = dhxGridMhsEmpFamily.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        //fn_SelectedMhshrb999();
    });
    eventIdsMhsEmpFamily.push(eventId);
    eventId = dhxGridMhsEmpFamily.attachEvent("onKeyPress", function(keyCode, ctrl, shift, event_object) {
    	if(keyCode == 113) { fn_ExcelMhshrb001Family(); //F2
    	} else 
    	if(keyCode == 13)  {   //ENTER
    		var selectedId = dhxGridMhsEmpFamily.getSelectedRowId();
    		var ind        = dhxGridMhsEmpFamily.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpFamily.getRowIndex(selectedId);
    		dhxGridMhsEmpFamily.selectCell(rowIndex, ind+1);
    		dhxGridMhsEmpFamily.editCell();
    	} else 
    	if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridMhsEmpFamily.getSelectedRowId();
    		var ind        = dhxGridMhsEmpFamily.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpFamily.getRowIndex(selectedId);
    		dhxGridMhsEmpFamily.selectCell(rowIndex+1, ind);
    		dhxGridMhsEmpFamily.editCell();
    	} else 
    	if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridMhsEmpFamily.getSelectedRowId();
    		var ind        = dhxGridMhsEmpFamily.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpFamily.getRowIndex(selectedId);
    		dhxGridMhsEmpFamily.selectCell(rowIndex-1, ind);
    		dhxGridMhsEmpFamily.editCell();
    	}
        else return true;
    });
    eventIdsMhsEmpFamily.push(eventId);
    
    // other event
    $('#checkAllMhshrb001Family').unbind('click').bind('click',function() {
        gf_DhxCheckAllGridHeader(dhxGridMhsEmpFamily, $('#checkAllMhshrb001Family').prop('checked'), 'selYn');
    });
    

    //행추가
    $('#btnAdd_Tab3').unbind("click").bind("click",function() {
        fn_Mhshrb001Tab3_Add();
    });
    //행삭제
    $('#btnRemove_Tab3').unbind("click").bind("click",function() {
        fn_Mhshrb001Tab3_Remove();
    });

    //저장
    $('#btnSave_Tab3').unbind('click').bind('click', function() {
    	if(dhxDataProcessorMhsEmpFamily.getSyncState()){
    		alert("수정된 정보가 없습니다.");
			return false;
    	} else {
	    	if(fn_GridValidationTab3()) {
	    		dhxDataProcessorMhsEmpFamily.sendData();
	    	}
    	}

        $('#saveFormEmp_Tab3_Family div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    //초기화
    $('#btnInit_Tab3').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab3();
};

var cf_InitForm = function (){
	//
};

var cf_InitInputForm = function (){

    tab3_empno = gf_FormGetValue('saveFormEmp_Tab3_Family', 'empno', 'text');

    /*그리드라서 재조회 함*/ 
    fn_SearchMhshrb001Tab3();
};

var fn_SearchMhshrb001Tab3 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab3_Family', 'empno', 'text');
	//var bplcCode = gf_FormGetValue('saveFormEmp_Tab3_Family', 'bplcCode', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab3_empno = empno;
	g_Tab3SearchValue.empno = empno;
    g_Tab3SearchValue.bplcCode = bplcCode;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab3_Family', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpFamily', jsonParameter, 'fn_CallbackSearchMhshrb001Tab3', false, 'GET');

    dhxDataProcessorMhsEmpFamily = new dataProcessor("/xerp/mhshrb001/saveMhsEmpFamily"); //lock feed url
	dhxDataProcessorMhsEmpFamily.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
	dhxDataProcessorMhsEmpFamily.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhsEmpFamily.setVerificator(gf_GetDhxGridColumId(dhxGridMhsEmpFamily,'familyCode'), fn_DPValidation_NotEmpty);
    dhxDataProcessorMhsEmpFamily.setVerificator(gf_GetDhxGridColumId(dhxGridMhsEmpFamily,'familyNm'), fn_DPValidation_Length10);
    dhxDataProcessorMhsEmpFamily.setVerificator(gf_GetDhxGridColumId(dhxGridMhsEmpFamily,'ihidnum'), fn_DPValidation_Ihidnum);
    dhxDataProcessorMhsEmpFamily.init(dhxGridMhsEmpFamily); //link dataprocessor to the grid
    dhxDataProcessorMhsEmpFamily.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};
    dhxDataProcessorMhsEmpFamily.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
    	if (dataSource.code == "000" || dataSource.data.code !== "000"){
    		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    		fn_SearchMhshrb001Tab3();
    		return true;
	 	} else {
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	 		return false;
	 	}
    });
};

// 그리드 입력값 필수 여부 검증
function fn_DPValidation_NotEmpty(value, id, ind){
	var strMsg = "";
	var nId = dhxGridMhsEmpFamily.getRowIndex(id) + 1;
	if (gf_IsNull(value)){
		strMsg = " (" + nId + "행, " + (ind+1) + "열) 값을 입력하세요.";
	
		var strColId = dhxGridMhsEmpFamily.getColumnId(ind);
		fn_GridValidationSelectCellTab3(dhxGridMhsEmpFamily, id, strColId);
		alert(strMsg);
		return false;
	}
	return true;
}
//그리드 입력값 필수 여부 및 최대 길이 검증
function fn_DPValidation_Length10(value, id, ind){
	var strMsg = "";
	var chk = false;
	var nId = dhxGridMhsEmpFamily.getRowIndex(id) + 1;
	if (gf_IsNull(value)){
		chk = true;
		strMsg = " (" + nId + "행, " + (ind+1) + "열) 값을 입력하세요.";
	}
	else if(value.length > 10){
		chk = true;
		strMsg = " (" + nId + "행, " + (ind+1) + "열) 10자리 이하로 입력하세요.";
	}
	
	if(chk){
		var strColId = dhxGridMhsEmpFamily.getColumnId(ind);
		fn_GridValidationSelectCellTab3(dhxGridMhsEmpFamily, id, strColId);
		alert(strMsg);
		return false;
	}
	return true;
}
//그리드 입력값 주민번호 검증
function fn_DPValidation_Ihidnum(value, id, ind){
	var strMsg = "";
	var chk = false;
	var nId = dhxGridMhsEmpFamily.getRowIndex(id) + 1;
	if (!gf_IsNull(value)){
		
		var chkIhidnum = gf_DhxGetValue(dhxGridMhsEmpFamily, id, 'ihidnumOl', 'grid');
		if(value == chkIhidnum){
			return true;
		}
		
		if(value.length > 14){
			chk = true;
			strMsg = " (" + nId + "행, " + (ind+1) + "열) 주민번호는 14자리 이하로 입력하세요.";
		}
		else {
			if (value.indexOf("*") != -1) {
				gf_DhxSetValue(dhxGridMhsEmpFamily, id, 'ihidnum', chkIhidnum, 'grid');
				return true;
			}
			
			var rJnum = "";
			var jnum = value.replace(/[^0-9]/g,"");  // 숫자만 남김
			
			if(jnum.length != 13){
				chk = true;
				strMsg = " (" + nId + "행, " + (ind+1) + "열) 주민번호를 정확하게 입력하세요.";
			}
			else {
				//if(jnum.length >= 6){
					rJnum = jnum.substring(0,6) + "-" + jnum.substring(6,13);
				//}
				//else rJnum = jnum;
				
				gf_DhxSetValue(dhxGridMhsEmpFamily, id, 'ihidnum', rJnum, 'grid');
			}
		}
	}
	
	if(chk){
		var strColId = dhxGridMhsEmpFamily.getColumnId(ind);
		fn_GridValidationSelectCellTab3(dhxGridMhsEmpFamily, id, strColId);
		alert(strMsg);
		return false;
	}
	return true;
}

var fn_CallbackSearchMhshrb001Tab3 = function (strSvcID, targetID, data){
	dhxGridMhsEmpFamily.clearAll();
	
	if(!gf_IsNull(data.data.records)){
		dhxGridMhsEmpFamily.parse(data.data.records, 'js');
    	
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpFamilyDataList');
    	
    	dhxGridMhsEmpFamily.selectCell(0,2);
        
    } else {
    	gf_NoFoundDataOnGridMsg('MhsEmpFamilyDataList'); 
    }
    //$('#spanMhsEmpFamilyCnt').text(gf_NumberWithCommas(data.data.totalRecordCount));
	$('#spanMhsEmpFamilyCnt').text(gf_NumberWithCommas(data.data.records.length));
    
	/*
    if(!gf_IsNull(data.data)){
        //dhxGridMhsAcdmcr.parse(data.data.records, 'js');
    	g_Tab3SearchValue.familyCode = gf_SetNullInit(data.data.familyCode,"");
    	g_Tab3SearchValue.familyNm = gf_SetNullInit(data.data.familyNm,"");
    	g_Tab3SearchValue.ihidnum = gf_SetNullInit(data.data.ihidnum,"");
    	g_Tab3SearchValue.mbtlnum = gf_SetNullInit(data.data.mbtlnum,"");
    	g_Tab3SearchValue.livtgtAt = gf_SetNullInit(data.data.livtgtAt,"");
    	g_Tab3SearchValue.allwncTrgetAt = gf_SetNullInit(data.data.allwncTrgetAt,"");
    	g_Tab3SearchValue.dspsnAt = gf_SetNullInit(data.data.dspsnAt,"");
    	g_Tab3SearchValue.dspsnSeCode = gf_SetNullInit(data.data.dspsnSeCode,"");
    	g_Tab3SearchValue.occpNm = gf_SetNullInit(data.data.occpNm,"");
    	g_Tab3SearchValue.wrcNm = gf_SetNullInit(data.data.wrcNm,"");
    	g_Tab3SearchValue.ofcpsNm = gf_SetNullInit(data.data.ofcpsNm,"");
    	g_Tab3SearchValue.yndexcclcTrgetAt = gf_SetNullInit(data.data.yndexcclcTrgetAt,"");
    	g_Tab3SearchValue.yndexcclcRelateCode = gf_SetNullInit(data.data.yndexcclcRelateCode,"");
    	g_Tab3SearchValue.empno = gf_SetNullInit(data.data.empno,"");
    	g_Tab3SearchValue.familySn = gf_SetNullInit(data.data.familySn,"");
    	g_Tab3SearchValue.suportAt = gf_SetNullInit(data.data.suportAt,"");
    	g_Tab3SearchValue.lscholSeCode = gf_SetNullInit(data.data.lscholSeCode,"0");
    	g_Tab3SearchValue.ihidnumOl = gf_SetNullInit(data.data.ihidnumOl,"");
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
    }
    */
    cf_SetEventListener();
};

//행추가
var fn_Mhshrb001Tab3_Add = function (){
	gf_NoFoundDataOnGridMsgRemove('MhsEmpFamilyDataList');
	dhxGridMhsEmpFamily.addRow('newRow_'+dhxGridMhsEmpFamily.uid(),[0,'','','','','','','','','','','','','','',tab3_empno,'','',''],0);
	dhxGridMhsEmpFamily.selectCell(0,2);
	//dhxGridMhsEmpFamily.editCell();
};

/**
 * 삭제
 */
//행삭제
var fn_Mhshrb001Tab3_Remove = function (){
	var selectedId = dhxGridMhsEmpFamily.getSelectedRowId();
	//체크 박스 확인
	var familyIds = gf_GetCheckedGridValueArr(dhxGridMhsEmpFamily, 'selYn', 'familySn');
    if(gf_IsNull(familyIds)) {
        gf_DivMsgAlert('삭제할 정보를 선택해 주세요.');
        return false;
    } else {
    	dhxGridMhsEmpFamily.forEachRow(function(rowId) {
			if(dhxGridMhsEmpFamily.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsEmpFamily, 'selYn')).isChecked()){
				dhxDataProcessorMhsEmpFamily.setUpdated(rowId, true, "deleted");
			}
			/*
			status = dhxDataProcessorMhsEmpFamily.getState(rowId);
			gf_Trace("selectedId = " + rowId + ", status : " + status);
			*/
		});
        //gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMhsEmpFamilysSend()', '');
    }
};
var fn_RemoveMhsEmpFamilysSend = function() {
    var familyIds = gf_GetCheckedGridValueArr(dhxGridMhsEmpFamily, 'selYn', 'familySn');
    var jsonParameter = {
    		empno : tab3_empno,
    		familyIds : familyIds.join(',') 
    	};
    var dataSource = gf_NoAsyncTransaction('stmmng001/removeMhsEmpFamily', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchMhshrb001Tab3();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

var fn_GridValidationTab3 = function(){
	var valid = true; 
	var checkCode;
	var nRowNum = dhxGridMhsEmpFamily.getRowsNum();
	if(nRowNum == 0){
		valid = false;
		gf_DivMsgAlert("저장 할 정보가 없습니다.");
	}
	else {
		dhxGridMhsEmpFamily.forEachRow(function(rowId) {
			if(!gf_IsNull(dhxDataProcessorMhsEmpFamily.getState(rowId))) {
				ihidnum = gf_DhxGetValue(dhxGridMhsEmpFamily, rowId, 'ihidnum', 'grid');
				var code;
				dhxGridMhsEmpFamily.forEachRow(function(rowIdForCheck) {
					var chkIhidnum = gf_DhxGetValue(dhxGridMhsEmpFamily, rowIdForCheck, 'ihidnumOl', 'grid');
					if(!gf_IsNull(ihidnum) && (chkIhidnum == ihidnum) && (rowId != rowIdForCheck)) {
						gf_DivMsgAlert("중복된 주민번호가 있습니다.");
						fn_GridValidationSelectCellTab3(dhxGridMhsEmpFamily, rowId, 'ihidnum');
						valid = false;
						return valid;
					}
				});
				// 성명은 DataProcessor 의 setVerificator 로 처리 (사용자 정의 함수)
				/*
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpFamily, rowId, 'ordr', 'grid') )){
					gf_DivMsgAlert("순서는  필수항목 입니다.");
					fn_GridValidationSelectCellTab3(dhxGridMhsEmpFamily, rowId, 'ordr');
					valid = false;
				}
				if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridMhsEmpFamily, rowId, 'ordr', 'grid') )){
					gf_DivMsgAlert("순서는 숫자만 입력 가능합니다.");
					gf_DhxSetValue(dhxGridMhsEmpFamily, rowId, 'ordr', '', 'grid');
					fn_GridValidationSelectCellTab3(dhxGridMhsEmpFamily, rowId, 'ordr');
					valid = false;
				}*/
			}
	    });
	}
	return valid;	 
}

var fn_GridValidationSelectCellTab3 = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhsEmpFamily.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}

var fn_ExcelMhshrb001Family = function () {
    var titMhshrb999 = '인사기본-가족'; /* gf_LocaleTrans('default', 'titMhshrb999') */
    var jsonParameter = {
        empno : gf_FormGetValue('saveFormEmp_Tab3_Family', 'empno', 'text')
        //,familySn : gf_FormGetValue('searchFormMhshrb999', 'familySn', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '가족순번' /* gf_LocaleTrans('default', 'titFamilySn') */,
        '가족코드(공통코드:C019)' /* gf_LocaleTrans('default', 'titFamilyCode') */,
        '연말정산 관계 코드 (C084)' /* gf_LocaleTrans('default', 'titYndexcclcRelateCode') */,
        '연말정산 대상 여부' /* gf_LocaleTrans('default', 'titYndexcclcTrgetAt') */,
        '가족구성원의 이름을 기록하는 항목' /* gf_LocaleTrans('default', 'titFamilyNm') */,
        '가족구성원의 주민등록번호를 기록하는 항목' /* gf_LocaleTrans('default', 'titIhidnum') */,
        '가족의 실제 생년월일' /* gf_LocaleTrans('default', 'titBrthdy') */,
        '동거여부' /* gf_LocaleTrans('default', 'titLivtgtAt') */,
        '갑근세계산여부' /* gf_LocaleTrans('default', 'titSuportAt') */,
        '수당지급여부' /* gf_LocaleTrans('default', 'titAllwncTrgetAt') */,
        '최종학력코드 (C016)' /* gf_LocaleTrans('default', 'titLscholSeCode') */,
        '직업' /* gf_LocaleTrans('default', 'titOccpNm') */,
        '직위 명' /* gf_LocaleTrans('default', 'titOfcpsNm') */,
        '휴대전화' /* gf_LocaleTrans('default', 'titMbtlnum') */,
        '장애인 여부' /* gf_LocaleTrans('default', 'titDspsnAt') */,
        '장애인 번호' /* gf_LocaleTrans('default', 'titDspsnNo') */,
        '장애인구분 1: 장애인복지법, 2:국가유공자, 3:중증장애인( C152)' /* gf_LocaleTrans('default', 'titDspsnSeCode') */,
        '중증 여부' /* gf_LocaleTrans('default', 'titSrsillAt') */,
        '직장명' /* gf_LocaleTrans('default', 'titWrcNm') */
    ]];
    var dataId = [[ 'empno', 'familySn', 'familyCode', 'yndexcclcRelateCode', 'yndexcclcTrgetAt', 'familyNm', 'ihidnum', 'brthdy', 'livtgtAt', 'suportAt', 'allwncTrgetAt', 'lscholSeCode', 'occpNm', 'ofcpsNm', 'mbtlnum', 'dspsnAt', 'dspsnNo', 'dspsnSeCode', 'srsillAt', 'wrcNm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsFamily ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsFamily;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb001/excelMhsEmpFamily', jsonParameter);
};
