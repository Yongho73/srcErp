/**
 *    프로그램       : 그룹권한관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2019.05.16
 *    사용테이블      : STM_ROLEMENU
 * sourceGen version : 2020.07.16.01 (2020.07.20)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmmng004 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmmng004 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmmng004 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmmng004 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmmng004 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmmng004 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmmng004 = 0;  //그리드 삭제 수량 
//var dhxGridRole;  //그리드 객체
var dhxGridRole;		//사용자
var dhxGridRoleMenu;	//사용자 권한
var eventIdStmmng004 = [];  //그리드 이벤트 객체 
var dhxDataProcessorStmmng004;  //DataProcessor 객체

 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmng004();
    if(cf_SetComponentsStmmng004()){
       cf_SetEventListenerStmmng004();
       cf_InitFormStmmng004();
       cf_SetBindingStmmng004();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmmng004 = function() {
    gf_SetMenuPath();
    $("#saveFormStmmng004").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsStmmng004 = function() {
	
	var dhxGridRoleHeader = [];
	dhxGridRoleHeader.push(gf_MakeDhxGridHeader('No', '50', 'center', 'str', 'cntr', false, 'num', ''));
	dhxGridRoleHeader.push(gf_MakeDhxGridHeader('그룹권한명', '*', 'left', 'str', 'ro', false, 'roleNm', ''));
	dhxGridRoleHeader.push(gf_MakeDhxGridHeader('그룸권한코드', '50', 'center', 'str', 'ro', true, 'roleCode', ''));
	dhxGridRole = gf_MakeDhxGrid('roleList', dhxGridRoleHeader, false, false, false);  
    
    var dataAuthorSeCheckAll = [];
    dataAuthorSeCheckAll.push('<select id="dataAuthorSeCheckAll">');
    dataAuthorSeCheckAll.push('<option value="">선택</option>');
    dataAuthorSeCheckAll.push('<option value="0">권한없음</option>');
    dataAuthorSeCheckAll.push('<option value="1">부서권한</option>');
    dataAuthorSeCheckAll.push('<option value="2">전체권한</option>');
    dataAuthorSeCheckAll.push('</select>');
    
    var dhxGridRoleMenuHeader = [];
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('<input type="checkbox" id="menuCheckAll"/>', '30', 'center', 'na', 'ch', false, 'menuCheckAll', ''));
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('메뉴명', '*', 'left', 'str', 'tree', false, 'menuNm', ''));   
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('조회<br/><input type="checkbox" id="inqireAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'inqireAuthorAt', ''));
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('등록<br/><input type="checkbox" id="registAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'registAuthorAt', ''));
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('수정<br/><input type="checkbox" id="updtAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'updtAuthorAt', ''));
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('삭제<br/><input type="checkbox" id="deleteAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'deleteAuthorAt', ''));
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('출력<br/><input type="checkbox" id="prntngAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'prntngAuthorAt', ''));
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('엑셀<br/><input type="checkbox" id="excelAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'excelAuthorAt', ''));
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader(dataAuthorSeCheckAll.join(""), '70', 'center', 'na', 'coro', false, 'dataAuthorSe', ''));
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('roleCode', '0', 'center', 'str', 'ro', true, 'roleCode', ''));
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('menuId', '0', 'center', 'str', 'ro', true, 'menuId', ''));
    dhxGridRoleMenuHeader.push(gf_MakeDhxGridHeader('menuAt', '0', 'center', 'na', 'ch', true, 'menuAt', ''));
    dhxGridRoleMenu = gf_MakeDhxGrid('roleMenuList', dhxGridRoleMenuHeader, false, false, false); 
    
    var gridComboboxAuth = dhxGridRoleMenu.getCombo(gf_GetDhxGridColumId(dhxGridRoleMenu,'dataAuthorSe'));
    gridComboboxAuth.put('0','권한없음');
    gridComboboxAuth.put('1','부서권한');
    gridComboboxAuth.put('2','전체권한');
    
    return true; 
};

var cf_SetEventListenerStmmng004 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmmng004 = gf_GridDetachEvent(dhxGridRole, eventIdStmmng004);
    eventId = dhxGridRole.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmmng004();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridRole.getColumnsNum();
            var rowNum = dhxGridRole.getRowsNum();
            var selectedId = dhxGridRole.getSelectedRowId();
            var ind        = dhxGridRole.getSelectedCellIndex();
            var rowIndex   = dhxGridRole.getRowIndex(selectedId);
            var type       = dhxGridRole.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridRole.selectRow(0);
                    //fn_FindStmmng004();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridRole.selectRow(rowIndex + 1);
//                    fn_FindStmmng004();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridRole.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridRole.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridRole.getSelectedRowId();
            var ind        = dhxGridRole.getSelectedCellIndex();
            var rowIndex   = dhxGridRole.getRowIndex(selectedId);
            var type       = dhxGridRole.getColType(ind);
            dhxGridRole.selectCell(rowIndex+1, ind);
//            fn_FindStmmng004();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridRole.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridRole.getSelectedRowId();
            var ind        = dhxGridRole.getSelectedCellIndex();
            var rowIndex   = dhxGridRole.getRowIndex(selectedId);
            var type       = dhxGridRole.getColType(ind);
            dhxGridRole.selectCell(rowIndex-1, ind);
//            fn_FindStmmng004();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridRole.editCell();
            }
        }
        else return true;
    });
    eventIdStmmng004.push(eventId);
    eventId = dhxGridRole.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmmng004SortGridList(ind, type, direction); 
    });
    eventIdStmmng004.push(eventId);
    eventId = dhxGridRole.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmmng004.push(eventId);
    eventId = dhxGridRole.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        var roleCode = dhxGridRole.cells(id, gf_GetDhxGridColumId(dhxGridRole,'roleCode')).getValue();
        fn_SearchRoleMenu(roleCode);
//        fn_FindStmmng004();
    });
    eventIdStmmng004.push(eventId);
    eventId = dhxGridRole.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmmng004.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnSaveStmmng004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmmng004();
    });
    $('#btnExcelStmmng004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        if(!dhxGridRole.getRowsNum()){
    		gf_DivMsgAlert('조회된 사용자가 없습니다.');
            return false;
    	}
        fn_ExcelStmmng004();
    });
    $('#btnSearchStmmng004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmmng004('');
    });
    $('#btnResetStmmng004').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmmng004();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormStmmng004 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmmng004').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //체크박스 이벤트
    $('#menuCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'menuCheckAll'), $(this).is(":checked")); });
    $('#inqireAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'inqireAuthorAt'), $(this).is(":checked")); });
    $('#registAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'registAuthorAt'), $(this).is(":checked")); });
    $('#updtAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'updtAuthorAt'), $(this).is(":checked")); });
    $('#deleteAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'deleteAuthorAt'), $(this).is(":checked")); });
    $('#prntngAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'prntngAuthorAt'), $(this).is(":checked")); });
    $('#excelAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'excelAuthorAt'), $(this).is(":checked")); });
    $('#dataAuthorSeCheckAll').unbind('change').bind('change',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'dataAuthorSe'), $(this).val()); });    
    
    dhxGridRoleMenu.attachEvent("onCheck", function(rId, cInd, state){    	
    	fn_MenuCheckAllOnDhxGridUserMenu(rId, cInd, state);
    	// 전체선택 체크박스 클릭시
    	if(cInd === gf_GetDhxGridColumId(dhxGridRoleMenu,'menuCheckAll')) {
    		var inqireAuthorAtCind = gf_GetDhxGridColumId(dhxGridRoleMenu,'inqireAuthorAt');
    		var registAuthorAt = gf_GetDhxGridColumId(dhxGridRoleMenu,'registAuthorAt');
    		var updtAuthorAt = gf_GetDhxGridColumId(dhxGridRoleMenu,'updtAuthorAt');
    		var deleteAuthorAt = gf_GetDhxGridColumId(dhxGridRoleMenu,'deleteAuthorAt');
    		var prntngAuthorAt = gf_GetDhxGridColumId(dhxGridRoleMenu,'prntngAuthorAt');
    		var excelAuthorAt = gf_GetDhxGridColumId(dhxGridRoleMenu,'excelAuthorAt');
    		
    		dhxGridRoleMenu.cells(rId, inqireAuthorAtCind).setChecked(state);
    		dhxGridRoleMenu.cells(rId, registAuthorAt).setChecked(state);
    		dhxGridRoleMenu.cells(rId, updtAuthorAt).setChecked(state);
    		dhxGridRoleMenu.cells(rId, deleteAuthorAt).setChecked(state);
    		dhxGridRoleMenu.cells(rId, prntngAuthorAt).setChecked(state);
    		dhxGridRoleMenu.cells(rId, excelAuthorAt).setChecked(state);
    		
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, inqireAuthorAtCind, state);
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, registAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, updtAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, deleteAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, prntngAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, excelAuthorAt, state);
    	}    	
    });
};

var cf_InitFormStmmng004 = function() {
    $('#searchFormStmmng004').resetForm();
};

var cf_SetBindingStmmng004 = function() {
    fn_SearchStmmng004('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmmng004 = function(userId) {
    var jsonParameter = {
    		roleNm : gf_FormGetValue('searchFormStmmng004', 'roleNm', 'text')
    };
    gf_Transaction(userId, 'stmmng004/search/role', jsonParameter, 'fn_CallbackSearchStmmng004', false, 'GET');
};

var fn_CallbackSearchStmmng004 = function(strSvcID, targetID, data) {
	var role = data.data.records;
    //dhxGridRole.clearAll();
    dhxGridRole.destructor();
    if(cf_SetComponentsStmmng004()){ 
        fn_DhxDataProcessorStmmng004(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmmng004');
            dhxGridRole.parse(data.data.records, 'js');
 
            if(save_Row_Num_Stmmng004 == 0 && save_All_Sta_Stmmng004 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridRole.selectRow(0); 
            } else if(save_Row_Sta_Stmmng004 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridRole.selectRow(0);
            } else if(save_All_Sta_Stmmng004 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridRole.selectRow(save_Row_Num_Stmmng004); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridRole.selectRow(save_Row_Num_Stmmng004);   //개발자 수정 필요  
                //var findCell = dhxGridRole.findCell(save_Row_Ids_Stmmng004, gf_GetDhxGridColumId(dhxGridRole,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridRole.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridRole.selectRow(0);
                //} 
            }
            fn_SearchRoleMenu(dhxGridRole.cells(dhxGridRole.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridRole,'roleCode')).getValue());
            
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmmng004');
            fn_InitInputFormStmmng004();
            fn_FormDisabled(true);
        }
        $("#spanCntUser").text(data.data.records.length);
        cf_SetEventListenerStmmng004();
    } 
};
var rootMenuId = 'CHF000000';
var fn_SearchRoleMenu = function(role){
    fn_UserMenuDetachEvent();// dhtmlxgrid event unbind
    var jsonParameter = { roleCode : role };
    gf_Transaction(jsonParameter, 'stmmng004/search/roleMenu', jsonParameter, 'fn_CallbackSearchRoleMenuList', false, 'GET');
};
var fn_CallbackSearchRoleMenuList = function (strSvcID, targetID, data){															
	var roleMenu = data.data.records;
	$("#spanCntRoleMenu").text(roleMenu.length);
	if(!gf_IsNull(roleMenu)){
		var menuList = [];
		var menuObj = {};
		var count = 0;
		roleMenu.forEach(function(menu) {
			menuObj = {};
			menuObj.id = menu.menuId;
			menuObj.parentId = menu.upperMenuId;
			menuObj.inqireAuthorAt = menu.inqireAuthorAt;
			menuObj.registAuthorAt = menu.registAuthorAt;
			menuObj.updtAuthorAt = menu.updtAuthorAt;
			menuObj.deleteAuthorAt = menu.deleteAuthorAt;
			menuObj.prntngAuthorAt = menu.prntngAuthorAt;
			menuObj.excelAuthorAt = menu.excelAuthorAt;
			menuObj.dataAuthorSe = menu.dataAuthorSe;
			menuObj.menuId = menu.menuId;
			menuObj.roleCode = menu.roleCode;
			if(menu.menuSe == 'M' || menu.menuSe == 'S') {
				menuObj.menuNm = {
					value: menu.menuNm,
					image: 'folder.gif'
				};
			} else {
				menuObj.menuNm = menu.menuNm;
			}

			menuList[count] = menuObj;
			count++;
		});
		var menuTree = gf_TreeModel(menuList, rootMenuId);
		gf_NoFoundDataOnGridMsgRemove('roleMenuList');
		dhxGridRoleMenu.clearAll();
		dhxGridRoleMenu.parse(JSON.stringify(menuTree),'js');
		dhxGridRoleMenu.openItem(rootMenuId);		
    } else {
    	dhxGridRoleMenu.clearAll();
    	gf_NoFoundDataOnGridMsg('roleMenuList');
    }
    $("#spanCntUserMenu").text(data.data.records.length);
};

var fn_DhxDataProcessorStmmng004 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmmng004 = new dataProcessor(gv_ContextPath+'/stmmng004/saveStmmng004'); //lock feed url
    dhxDataProcessorStmmng004.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmmng004.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmmng004.init(dhxGridRoleMenu); //link dataprocessor to the grid
    dhxDataProcessorStmmng004.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmmng004.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmmng004.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmmng004();
                    $("#checkAllStmmng004").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
var fn_UserMenuDetachEvent = function(){	
	$('#menuCheckAll').prop("checked", false);
    $('#inqireAuthorAtCheckAll').prop("checked", false);
    $('#registAuthorAtCheckAll').prop("checked", false);
    $('#updtAuthorAtCheckAll').prop("checked", false);
    $('#deleteAuthorAtCheckAll').prop("checked", false);
    $('#prntngAuthorAtCheckAll').prop("checked", false);
    $('#excelAuthorAtCheckAll').prop("checked", false);
    $('#dataAuthorSeCheckAll').val('');
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmmng004 = function() {
    $('#saveFormStmmng004 input[name="userId"]').prop('disabled', false);
    $('#saveFormStmmng004').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmmng004 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddStmmng004 = function() {
    dhxGridRole.clearSelection();
    fn_InitInputFormStmmng004();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //userId
    initValueArr.push(''); //empno
    initValueArr.push(''); //userPassword
    initValueArr.push(''); //userNm
    initValueArr.push(''); //emplAt
    initValueArr.push(''); //useAt
    initValueArr.push(''); //authorSetting
    initValueArr.push(''); //passwordUpdt
    initValueArr.push(''); //userIp
    dhxGridRole.addRow(dhxGridRole.uid(), initValueArr, 0);
    dhxGridRole.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmmng004');
    $('#btnPopEmpSearchStmmng004').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmmng004SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridRole, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmmng004', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmmng004', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridRole, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridRole.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmmng004', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmmng004', 'sortColumId', gf_GetDhxGridColum(dhxGridRole, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridRole.setSortImgState(false); 
            gf_FormSetValue('searchFormStmmng004', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmmng004', 'sortColumId', '', 'text'); 
            dhxGridRole.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridRole.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmmng004', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmmng004', 'sortColumId', gf_GetDhxGridColum(dhxGridRole, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmmng004 = function(){	
	var roleCode = dhxGridRole.cells(dhxGridRole.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridRole,'roleCode')).getValue();
	var menus = fn_CheckedRoleMenu();
	var jsonParameter = { menuIds: menus.join("|#|"), roleCode:roleCode };	
	gf_Transaction(jsonParameter, 'stmmng004/modify/roleMenu', jsonParameter, 'fn_CallbackModifyRoleMenus', false, 'POST');
};
var fn_CallbackModifyRoleMenus = function (strSvcID, targetID, data){															
	if(data.code === '000') {
		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
		fn_SearchRoleMenu(strSvcID.roleCode);
	} else {
		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	}
};
function fn_CheckedRoleMenu(){	
	var menus = [];
	var menu = [];
	menus.push(fn_SetRootMenu()); 
	dhxGridRoleMenu.forEachRow(function(rowId) {				
		menu = [];		
		menu.push( dhxGridRoleMenu.cells(rowId,2).getValue() );
		menu.push( dhxGridRoleMenu.cells(rowId,3).getValue() );
		menu.push( dhxGridRoleMenu.cells(rowId,4).getValue() );
		menu.push( dhxGridRoleMenu.cells(rowId,5).getValue() );
		menu.push( dhxGridRoleMenu.cells(rowId,6).getValue() );
		menu.push( dhxGridRoleMenu.cells(rowId,7).getValue() );
		menu.push( dhxGridRoleMenu.cells(rowId,8).getValue() );
		menu.push( dhxGridRoleMenu.cells(rowId,9).getValue() );
		menu.push( dhxGridRoleMenu.cells(rowId,10).getValue() );		
		menus.push(menu.join("|"));				
	});
	return menus;
}

var fn_SetRootMenu = function(){ 
	var menu = [];
    var roleCode = dhxGridRole.cells(dhxGridRole.getSelectedRowId(),gf_GetDhxGridColumId(dhxGridRole,'roleCode')).getValue();
    menu.push( '0' ); // inqireAuthorAt
    menu.push( '0' ); // registAuthorAt
    menu.push( '0' ); // updtAuthorAt
    menu.push( '0' ); // deleteAuthorAt
    menu.push( '0' ); // prntngAuthorAt
    menu.push( '0' ); // excelAuthorAt
    menu.push( '0' ); // dataAuthorSe
    menu.push( roleCode );
    menu.push( rootMenuId );
    return menu.join("|");
};

var confirmModalStmmng004 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmmng004_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmmng004_Send = function() {
    if(fn_GridValidation(dhxGridRole, dhxDataProcessorStmmng004)) {
        dhxDataProcessorStmmng004.sendData();
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmmng004 = function () {
//    var titStmmng004 = '개인정보조회'; /* gf_LocaleTrans('default', 'titStmmng004') */
//    var jsonParameter = {
//        userId : gf_FormGetValue('searchFormStmmng004', 'userId', 'text')
//    };
//    var header = [[
//        '사용자ID' /* gf_LocaleTrans('default', 'titUserId') */,
//        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
//        '사용자패스워드' /* gf_LocaleTrans('default', 'titUserPassword') */,
//        '사용자명' /* gf_LocaleTrans('default', 'titUserNm') */,
//        '사원여부' /* gf_LocaleTrans('default', 'titEmplAt') */,
//        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
//        '권한설정' /* gf_LocaleTrans('default', 'titAuthorSetting') */,
//        '패스워드 변경일자' /* gf_LocaleTrans('default', 'titPasswordUpdt') */,
//        '사용자IP' /* gf_LocaleTrans('default', 'titUserIp') */
//    ]];
//    var dataId = [[ 'userId', 'empno', 'userPassword', 'userNm', 'emplAt', 'useAt', 'authorSetting', 'passwordUpdt', 'userIp' ]];
//    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
//    var sheetNm = [[ titStmmng004 ]];
//    var param = [[ $.param( jsonParameter ) ]];
//    var fileNm = titStmmng004;
//    jsonParameter = {
//        headers : header,
//        dataIds : dataId,
//        dataAligns : dataAlign,
//        sheetNms : sheetNm,
//        fileNm : fileNm,
//        params : param
//    };
//    gf_ExcelDown('stmmng004/excelStmmng004', jsonParameter);
	var userId = dhxGridRole.cells(dhxGridRole.getSelectedRowId(),gf_GetDhxGridColumId(dhxGridRole,'userId')).getValue();
    var jsonParameterMenu = { userId: userId };
    var header = [['사용자명', '메뉴명', '조회', '등록', '수정', '삭제', '출력', '엑셀', '권한']];
    var dataId = [['userNm', 'menuNm', 'inqireAuthorAt', 'registAuthorAt', 'updtAuthorAt', 'deleteAuthorAt', 'prntngAuthorAt', 'excelAuthorAt', 'dataAuthorSe']];
    var sheetNm = [['권한메뉴']];
    var param = [[$.param( jsonParameterMenu )]];
    var fileNm = '사용자권한메뉴';
    var dataAlign = [['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
    var jsonParameter = {
        headers: header,
        dataIds: dataId,
        dataAligns : dataAlign,
        sheetNms: sheetNm,
        fileNm: fileNm,
        params: param
    };
    gf_ExcelDown('stmmng004/excel/roleMenu', jsonParameter);
};
/**
 * 체크박스
 */
var fn_CheckedRoleMenuCheckAll = function(columId, rowValue){	
	if(!gf_IsNull(rowValue)) {
		// 전체선택 체크박스 클릭시
		if(columId == gf_GetDhxGridColumId(dhxGridRoleMenu,'menuCheckAll')) {
			$('#inqireAuthorAtCheckAll').click();
			$('#registAuthorAtCheckAll').click();
			$('#updtAuthorAtCheckAll').click();
			$('#deleteAuthorAtCheckAll').click();
			$('#prntngAuthorAtCheckAll').click();
			$('#excelAuthorAtCheckAll').click();
		}
		dhxGridRoleMenu.forEachRow(function(rowId) { dhxGridRoleMenu.cells(rowId,columId).setValue(rowValue); });
	} else {
		dhxGridRoleMenu.forEachRow(function(rowId) { dhxGridRoleMenu.cells(rowId,columId).setValue(rowValue); });
	}
};
var fn_MenuCheckAllOnDhxGridUserMenu = function(rId, cInd, state){
	fn_ParentMenuChecked(rId, cInd, state);
	fn_SubMenuChecked(rId, cInd, state);
};
var fn_ParentMenuChecked = function(rId, cInd, state) {
    var loop = true;
    var cell;
    var parentId = rId;
    var isChecked;
    var parentIdSubItems;
    while(loop) {
        parentId = dhxGridRoleMenu.getParentId(parentId)
        if(parentId === null || parentId === 0 || parentId == rootMenuId) {
            loop = false;
        } else {
            isChecked = false;
            parentIdSubItems = dhxGridRoleMenu.getSubItems(parentId);
            if(!gf_IsNull(parentIdSubItems)) {
                parentIdSubItemsArr = parentIdSubItems.split(',');
                parentIdSubItemsArr.forEach(function(item) {
                    if(dhxGridRoleMenu.cells(item,cInd).isChecked()) {
                        isChecked = true;
                    }
                });                 
                if(isChecked) {
                    dhxGridRoleMenu.cells(parentId,cInd).setChecked(true);                    
                } else {
                    dhxGridRoleMenu.cells(parentId,cInd).setChecked(false);                    
                }                
            }
        }
    }
};
var fn_SubMenuChecked = function(rId, cInd, state){	
	var subItems = dhxGridRoleMenu.getSubItems(rId);    
    if(!gf_IsNull(subItems)) {
        var subItemArr = subItems.split(',');
        subItemArr.forEach(function(item) {
            dhxGridRoleMenu.cells(item,cInd).setChecked(state);
            fn_SubMenuChecked(item, cInd, state);
        });
    }
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
    $('#saveFormStmmng004 #userIdSaveFormStmmng004').parent().append(
    '<div class="error" id="userIdSaveFormStmmng004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmmng004 = function(userId){
    if(!gf_IsNull(userId)) {
        var jsonParameter = {
            userId : userId
        };
        var dataSource = gf_NoAsyncTransaction('stmmng004/findStmmng004', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.userId)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}
/**
 * 폼데이터 db 체크
 */
var fn_FormValidation =  function(rowId){
    var state = dhxDataProcessorStmmng004.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormStmmng004').validate().form()){
                if(state == 'inserted') {
                    var userId = gf_FormGetValue('saveFormStmmng004', 'userId', 'text');
                    if(fn_CheckDupStmmng004(userId)) return true;
                    else return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else {
        return true;
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
    var checkUserId;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmmng004 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Stmmng004 == 'deleted') {
        save_Row_Num_Stmmng004 = 0;
        save_Row_Ids_Stmmng004 = "";
    } else if(save_Row_Sta_Stmmng004 == 'inserted') {
        save_Row_Num_Stmmng004 = rowNum;
        save_Row_Ids_Stmmng004 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmmng004 = rowNum;
        save_Row_Ids_Stmmng004 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'userId', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userId');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkUserId = gf_DhxGetValue(dhxGridObjet, rowId, 'userId', 'grid');
                    if(!gf_IsNull(checkUserId)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var userId = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'userId', 'grid');
                            if(((userId == checkUserId)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userId');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmmng004( checkUserId )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'userId');
                            valid = false;
                        }
                        // 그리드 중복된 처음 추가된 row 체크
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    } else {
                        // 신규로 등록된 마지막 로우를 설정
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    }
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridRole.selectRowById(validFalseFistRowId);
//        fn_FindStmmng004();
        fn_FormValidation(validFalseFistRowId);
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
