/**
 * 프로그램 : 그룹권한관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.16
 * 사용테이블 : STM_ROLEMENU
 **/
 
$(function() {
	cf_InitParam();
	cf_SetComponents();
	cf_SetEventListener();
	cf_SetBinding();
	cf_InitForm();
    gf_IframeHeightResize(true);
});

function cf_InitParam(){ fn_SetMenuPath("STMMNG004"); }

var dhxGridRole;
var dhxGridRoleMenu;
function cf_SetComponents(){
	var dhxGridRoleHeader = [3];	
	dhxGridRoleHeader[0] = gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'ro', 'cntr', false, 'num', '');
	dhxGridRoleHeader[1] = gf_MakeDhxGridHeader('그룹권한명', '*', 'left', 'str', 'ro', false, 'roleNm', '');
	dhxGridRoleHeader[2] = gf_MakeDhxGridHeader('그룸권한코드', '100', 'center', 'str', 'ro', true, 'roleCode', '');	
	dhxGridRole = gf_MakeDhxGrid('roleList', dhxGridRoleHeader, false, false, false);

    var dataAuthorSeCheckAll = [];
    dataAuthorSeCheckAll.push('<select id="dataAuthorSeCheckAll">');
    dataAuthorSeCheckAll.push('<option value="">선택</option>');
    dataAuthorSeCheckAll.push('<option value="0">권한없음</option>');
    dataAuthorSeCheckAll.push('<option value="1">부서권한</option>');
    dataAuthorSeCheckAll.push('<option value="2">전체권한</option>');
    dataAuthorSeCheckAll.push('</select>');

	var dhxGridRoleMenuHeader  = [12];
	dhxGridRoleMenuHeader[0] = gf_MakeDhxGridHeader('<input type="checkbox" id="menuCheckAll"/>', '30', 'center', 'na', 'ch', false, 'menuCheckAll', '');
	dhxGridRoleMenuHeader[1] = gf_MakeDhxGridHeader('메뉴명', '*', 'left', 'str', 'tree', false, 'menuNm', '');
	dhxGridRoleMenuHeader[2] = gf_MakeDhxGridHeader('조회<br/><input type="checkbox" id="inqireAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'inqireAuthorAt', '');
	dhxGridRoleMenuHeader[3] = gf_MakeDhxGridHeader('등록<br/><input type="checkbox" id="registAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'registAuthorAt', '');
	dhxGridRoleMenuHeader[4] = gf_MakeDhxGridHeader('수정<br/><input type="checkbox" id="updtAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'updtAuthorAt', '');
	dhxGridRoleMenuHeader[5] = gf_MakeDhxGridHeader('삭제<br/><input type="checkbox" id="deleteAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'deleteAuthorAt', '');
	dhxGridRoleMenuHeader[6] = gf_MakeDhxGridHeader('출력<br/><input type="checkbox" id="prntngAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'prntngAuthorAt', '');
	dhxGridRoleMenuHeader[7] = gf_MakeDhxGridHeader('엑셀<br/><input type="checkbox" id="excelAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'excelAuthorAt', '');
	dhxGridRoleMenuHeader[8] = gf_MakeDhxGridHeader(dataAuthorSeCheckAll.join(""), '100', 'center', 'na', 'coro', false, 'dataAuthorSe', '');
	dhxGridRoleMenuHeader[9] = gf_MakeDhxGridHeader('roleCode', '0', 'center', 'str', 'ro', true, 'roleCode', '');
	dhxGridRoleMenuHeader[10] = gf_MakeDhxGridHeader('menuId', '0', 'center', 'str', 'ro', true, 'menuId', '');
	dhxGridRoleMenuHeader[11] = gf_MakeDhxGridHeader('menuAt', '0', 'center', 'na', 'ch', true, 'menuAt', '');
	dhxGridRoleMenu = gf_MakeDhxGrid('roleMenuList', dhxGridRoleMenuHeader, true, false, false);

    var gridComboboxAuth = dhxGridRoleMenu.getCombo(8);
    gridComboboxAuth.put("0","권한없음");
    gridComboboxAuth.put("1","부서권한");
    gridComboboxAuth.put("2","전체권한");
}

var eventGridRoleMenuOnCheck = 0;
var eventGridRoleMenuOnCellChanged = 0;
var eventIds = [];
function cf_SetEventListener(){	
	$('#searchForm input[name="roleNm"]').keypress(function(event) {
      	if(event.charCode == 13) { $('#btnSearch').click(); }
    });    
	$('#btnSearch').unbind("click").bind("click",function() {
    	fn_SearchRole();
    });     
	$('#btnAdd').unbind("click").bind("click",function() {
		var roleCode = dhxGridRole.cells(dhxGridRole.getSelectedRowId(),1).getValue();
		if(gf_IsNull(roleCode)){
			gf_DivMsgAlert('그룹권한명이 선택 되지 않았습니다.<br/>그룹권한명을 선택해 주세요');
			return false;
		}
		fn_MenuListPopup(roleCode);
    });	
    $('#btnSave').unbind("click").bind("click",function() {
    	if(!dhxGridRole.getRowsNum()){
    		gf_DivMsgAlert('조회된 그룹권한이 없습니다.');
            return false;
    	}
    	var roleCode = dhxGridRole.cells(dhxGridRole.getSelectedRowId(),0).getValue();
        if(gf_IsNull(roleCode)){
            gf_DivMsgAlert('그룹권한이 선택 되지 않았습니다.<br/>그룹권한을 선택해 주세요');
            return false;
        }    	    	
        fn_ModifyRoleMenus(); 
    });    
    $('#btnRemove').unbind("click").bind("click",function() {
    	var menus = fn_CheckedRoleMenu();		
		if(gf_IsNull(menus)) {
			gf_DivMsgAlert('삭제할 메뉴를 체크해 주세요.');
			return false;
		} else {
			fn_RemoveRoleMenus(menus);
		}
    });
    $('#btncloseTab').unbind('click').bind('click',function() { gf_CloseParentActiveTab(); });
    $('#btnExcelRole').unbind("click").bind("click",function() { fn_ExcelDownRole(); });    
    $('#btnExcelRoleMenu').unbind("click").bind("click",function() { fn_ExcelDownRoleMenu(); });
    $('#btnClose').unbind("click").bind("click",function() { gf_CloseParentActiveTab(); });
    $('#btnFormReset').unbind('click').bind('click',function() { cf_InitForm(); });

	dhxGridRole.attachEvent("onRowSelect", function(id,ind){
		var roleCode = dhxGridRole.cells(id,gf_GetDhxGridColumId(dhxGridRole,'roleCode')).getValue();
		fn_SearchRoleMenu(roleCode);
	});
	//dhxGridRole.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){ if(keyCode == 113) fn_ExcelDownRole(); });	
	dhxGridRoleMenu.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){ if(keyCode == 113) fn_ExcelDownRoleMenu(); });
	dhxGridRoleMenu.attachEvent("onCheck", function(rId, cInd, state){    	
		fn_MenuCheckAllOnDhxGridRoleMenu(rId, cInd, state);
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
    		
    		fn_MenuCheckAllOnDhxGridRoleMenu(rId, inqireAuthorAtCind, state);
    		fn_MenuCheckAllOnDhxGridRoleMenu(rId, registAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridRoleMenu(rId, updtAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridRoleMenu(rId, deleteAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridRoleMenu(rId, prntngAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridRoleMenu(rId, excelAuthorAt, state);
    	}    	
    });
    
	dhxGridRoleMenu.attachEvent("onCellChanged",function(rId, cInd, value){
        if(cInd === gf_GetDhxGridColumId(dhxGridRoleMenu,'dataAuthorSe')) { fn_SubMenuChanged(rId, cInd, value); }
    })
        
    $('#menuCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'menuCheckAll'), $(this).is(":checked")); });
    $('#inqireAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'inqireAuthorAt'), $(this).is(":checked")); });
    $('#registAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'registAuthorAt'), $(this).is(":checked")); });
    $('#updtAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'updtAuthorAt'), $(this).is(":checked")); });
    $('#deleteAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'deleteAuthorAt'), $(this).is(":checked")); });
    $('#prntngAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'prntngAuthorAt'), $(this).is(":checked")); });
    $('#excelAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'excelAuthorAt'), $(this).is(":checked")); });
    $('#dataAuthorSeCheckAll').unbind('change').bind('change',function() { fn_CheckedRoleMenuCheckAll(gf_GetDhxGridColumId(dhxGridRoleMenu,'dataAuthorSe'), $(this).val()); });    	
};

function cf_SetBinding(){
	fn_SearchRole();
};

function cf_InitForm(){
	$('#searchForm input[name="roleNm"]').val('');
};

var fn_MenuCheckAllOnDhxGridRoleMenu = function(rId, cInd, state){
	fn_ParentMenuChecked(rId, cInd, state);
	fn_SubMenuChecked(rId, cInd, state);
};

function fn_SearchRole(){
	var jsonParameter = {
		roleNm: $('#searchForm input[name="roleNm"]').val()			
	};
	gf_Transaction(jsonParameter, 'stmmng004/search/role', jsonParameter, 'fn_CallbackSearchRoleList', false, 'GET');
}

var fn_CallbackSearchRoleList = function (strSvcID, targetID, data){															
	var role = data.data.records;
	$("#spanCntRole").text(role.length);
	if(!gf_IsNull(role)){
		gf_NoFoundDataOnGridMsgRemove('roleList');
    	dhxGridRole.clearAll();
    	dhxGridRole.parse(role,'js');
    	dhxGridRole.selectRow(0);
    	fn_SearchRoleMenu(dhxGridRole.cells(dhxGridRole.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridRole,'roleCode')).getValue());
    }else{
    	dhxGridRole.clearAll();
    	dhxGridRoleMenu.clearAll();
    	gf_NoFoundDataOnGridMsg('roleList');
    	$("#spanCntRoleMenu").text(0);
    	gf_NoFoundDataOnGridMsg('roleMenuList');
    }
};

var rootMenuId = 'CHF000000';
function fn_SearchRoleMenu(role){	
	fn_RoleMenuDetachEvent();	
	var jsonParameter = { roleCode:role };
	gf_Transaction(jsonParameter, 'stmmng004/search/roleMenu', jsonParameter, 'fn_CallbackSearchRoleMenuList', false, 'GET');
}

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
};

function fn_SubMenuChecked(rId, cInd, state){	
	var subItems = dhxGridRoleMenu.getSubItems(rId);   	
	if(!gf_IsNull(subItems)) {
   		var subItemArr = subItems.split(',');
   		subItemArr.forEach(function(item) {   			
   			dhxGridRoleMenu.cells(item,cInd).setChecked(state);   						
   			fn_SubMenuChecked(item, cInd, state);
	   	});
   	}
}

function fn_ParentMenuChecked(rId, cInd, state) {
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
}

function fn_SubMenuChanged(rId, cInd, value){
	var subItems = dhxGridRoleMenu.getSubItems(rId);
   	if(!gf_IsNull(subItems)) {
   		var subItemArr = subItems.split(',');
   		subItemArr.forEach(function(item) {
   			if(!dhxGridRoleMenu.cells(item,cInd).isDisabled()){
   				dhxGridRoleMenu.cells(item,cInd).setValue(value);
   			}
   			fn_SubMenuChanged(item, cInd, value);
	   	});
   	}
}

function fn_roleMenuDisabledAll(){
	dhxGridRoleMenu.forEachRow(function(rowId) {		
		dhxGridRoleMenu.cells(rowId,2).setDisabled(true);
		dhxGridRoleMenu.cells(rowId,3).setDisabled(true);
		dhxGridRoleMenu.cells(rowId,4).setDisabled(true);
		dhxGridRoleMenu.cells(rowId,5).setDisabled(true);
		dhxGridRoleMenu.cells(rowId,6).setDisabled(true);
		dhxGridRoleMenu.cells(rowId,7).setDisabled(true);
		dhxGridRoleMenu.cells(rowId,8).setDisabled(true);
	});	
}

function fn_roleMenuDisabled(rId, status){	
	var enabled = true;
	if(status) enabled = false;  		
	dhxGridRoleMenu.cells(rId,2).setDisabled(enabled);
	dhxGridRoleMenu.cells(rId,3).setDisabled(enabled);
	dhxGridRoleMenu.cells(rId,4).setDisabled(enabled);
	dhxGridRoleMenu.cells(rId,5).setDisabled(enabled);
	dhxGridRoleMenu.cells(rId,6).setDisabled(enabled);
	dhxGridRoleMenu.cells(rId,7).setDisabled(enabled);
	dhxGridRoleMenu.cells(rId,8).setDisabled(enabled);
}

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
	}
};

function fn_ModifyRoleMenus(menus){	 
	var roleCode = dhxGridRole.cells(dhxGridRole.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridRole,'roleCode')).getValue();
	var menus = fn_CheckedRoleMenu();
	var jsonParameter = { menuIds: menus.join("|#|"), roleCode:roleCode };	
	gf_Transaction(jsonParameter, 'stmmng004/modify/roleMenu', jsonParameter, 'fn_CallbackModifyRoleMenus', false, 'POST');
}

var fn_CallbackModifyRoleMenus = function (strSvcID, targetID, data){															
	if(data.code === '000') {
		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
		fn_SearchRoleMenu(strSvcID.roleCode);
	} else {
		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	}
};

function fn_RemoveRoleMenus(menus){	 
	var jsonParameter = {
		menuIds: menus.join("|#|")
	};	
	var dataSource = gf_NoAsyncTransaction('stmmng004/remove/roleMenu', jsonParameter, 'POST');	
	if(dataSource.code === '000') {
		//gf_DivMsgAlert('삭제 되었습니다.');
		fn_SearchRoleMenu(dhxGridRole.cells(dhxGridRole.getSelectedRowId(),1).getValue());
	} else {
		gf_DivMsgAlert('삭제 되지 않았습니다.');
	}
}

function fn_RoleMenuDetachEvent(){
	$('#menuCheckAll').prop("checked", false);
    $('#inqireAuthorAtCheckAll').prop("checked", false);
    $('#registAuthorAtCheckAll').prop("checked", false);
    $('#updtAuthorAtCheckAll').prop("checked", false);
    $('#deleteAuthorAtCheckAll').prop("checked", false);
    $('#prntngAuthorAtCheckAll').prop("checked", false);
    $('#excelAuthorAtCheckAll').prop("checked", false);
    $('#dataAuthorSeCheckAll').val('');
	for (var i=0;i<eventIds.length;i++) { dhxGridRoleMenu.detachEvent(eventIds[i]); }
	eventIds = [];
}

function fn_ExcelDownRole(){ 
	
	var jsonParameterRole = {
		roleNm: $('#searchForm input[name="roleNm"]').val()			
	};	
	
	var header  = [
		['그룹ID', '그룹명']
	]; // 엑셀 헤더(배열로 복수가능)    
    var dataId  = [
    	['roleCode', 'roleNm']
    ]; // 엑셀 맵핑 데이터(배열로 복수가능)    
    var sheetNm = [
    	['그릅권한']
    ]; // 엑셀시트명(배열로 복수가능)
    var param 	= [
    	[$.param( jsonParameterRole )]
    ]; // 조회 파라메터(배열로 복수가능)    
    var fileNm  = '그룹권한'; // 엑셀 파일명
    var dataAlign = [[ 'center',  'left']];

    var jsonParameter = {
        headers: header,
        dataIds: dataId,
        dataAligns : dataAlign,
        sheetNms: sheetNm,
        fileNm: fileNm,         
        params: param
    };    
    gf_ExcelDown('stmmng004/excel/role', jsonParameter);
}


function fn_ExcelDownRoleMenu(){ 
	
	var roleCode = dhxGridRole.cells(dhxGridRole.getSelectedRowId(),1).getValue();
 
	var jsonParameterMenu = {
		roleCode: roleCode,
		roleMenuIn:'Y'
	};
	var header  = [		
		['그룹명', '메뉴명', '조회', '등록', '수정', '삭제', '출력', '엑셀', '권한']
	]; // 엑셀 헤더(배열로 복수가능)    
    var dataId  = [  
    	['roleNm', 'menuNm', 'inqireAuthorAt', 'registAuthorAt', 'updtAuthorAt', 'deleteAuthorAt', 'prntngAuthorAt', 'excelAuthorAt', 'dataAuthorSe']
    ]; // 엑셀 맵핑 데이터(배열로 복수가능)    
    var sheetNm = [    	
    	['권한메뉴']
    ]; // 엑셀시트명(배열로 복수가능)
    var param 	= [    	
    	[$.param( jsonParameterMenu )]
    ]; // 조회 파라메터(배열로 복수가능)    
    var fileNm  = '그룹권한'; // 엑셀 파일명
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];

    var jsonParameter = {
        headers: header,
        dataIds: dataId,
        dataAligns : dataAlign,
        sheetNms: sheetNm,
        fileNm: fileNm,         
        params: param
    };    
    gf_ExcelDown('stmmng004/excel/roleMenu', jsonParameter);
}
