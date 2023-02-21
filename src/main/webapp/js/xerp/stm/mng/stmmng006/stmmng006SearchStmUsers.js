/**
 * 프로그램 : 사용자권한관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.14
 * 사용테이블 : STM_MENU, STM_USERMENU
 **/

$(function() {
    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();
    gf_IframeHeightResize(true);
});

var cf_InitParam = function(){ fn_SetMenuPath("STMMNG006"); };

var dhxGridUser;
var dhxGridUserMenu;
var cf_SetComponents = function(){
    var dhxGridUserHeader = [];
    dhxGridUserHeader.push(gf_MakeDhxGridHeader('NO', '50', 'center', 'str', 'cntr', false, '', ''));
    dhxGridUserHeader.push(gf_MakeDhxGridHeader('사용자ID', '100', 'center', 'str', 'ro', false, 'userId', ''));
    dhxGridUserHeader.push(gf_MakeDhxGridHeader('부서명', '100', 'left', 'str', 'ro', false, 'deptNm', ''));
    dhxGridUserHeader.push(gf_MakeDhxGridHeader('사용자명', '100', 'center', 'str', 'ro', false, 'userNm', ''));    
    dhxGridUserHeader.push(gf_MakeDhxGridHeader('그룹권한', '*', 'center', 'str', 'ro', false, 'roleNm', ''));

    dhxGridUser = gf_MakeDhxGrid('userList', dhxGridUserHeader, false, false, false);    

    var dhxGridUserMenuHeader = [];
    var dataAuthorSeCheckAll = [];
    dataAuthorSeCheckAll.push('<select id="dataAuthorSeCheckAll">');
    dataAuthorSeCheckAll.push('<option value="">선택</option>');
    dataAuthorSeCheckAll.push('<option value="0">권한없음</option>');
    dataAuthorSeCheckAll.push('<option value="1">부서권한</option>');
    dataAuthorSeCheckAll.push('<option value="2">전체권한</option>');
    dataAuthorSeCheckAll.push('</select>');
    
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('<input type="checkbox" id="menuCheckAll"/>', '30', 'center', 'na', 'ch', false, 'menuCheckAll', ''));
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('메뉴명', '*', 'left', 'str', 'tree', false, 'menuNm', ''));   
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('조회<br/><input type="checkbox" id="inqireAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'inqireAuthorAt', ''));
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('등록<br/><input type="checkbox" id="registAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'registAuthorAt', ''));
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('수정<br/><input type="checkbox" id="updtAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'updtAuthorAt', ''));
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('삭제<br/><input type="checkbox" id="deleteAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'deleteAuthorAt', ''));
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('출력<br/><input type="checkbox" id="prntngAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'prntngAuthorAt', ''));
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('엑셀<br/><input type="checkbox" id="excelAuthorAtCheckAll"/>', '100', 'center', 'na', 'ch', false, 'excelAuthorAt', ''));
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader(dataAuthorSeCheckAll.join(""), '70', 'center', 'na', 'coro', false, 'dataAuthorSe', ''));
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('userId', '0', 'center', 'str', 'ro', true, 'userId', ''));
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('menuId', '0', 'center', 'str', 'ro', true, 'menuId', ''));
    dhxGridUserMenuHeader.push(gf_MakeDhxGridHeader('menuAt', '0', 'center', 'na', 'ch', true, 'menuAt', ''));
    dhxGridUserMenu = gf_MakeDhxGrid('userMenuList', dhxGridUserMenuHeader, false, false, false);    

    var gridComboboxAuth = dhxGridUserMenu.getCombo(gf_GetDhxGridColumId(dhxGridUserMenu,'dataAuthorSe'));
    gridComboboxAuth.put('0','권한없음');
    gridComboboxAuth.put('1','부서권한');
    gridComboboxAuth.put('2','전체권한');
};

var eventGridUserMenuOnCheck = 0;
var eventGridUserMenuOnCellChanged = 0;
var eventIds = [];
var cf_SetEventListener = function(){
    $('#searchArea input[name="userId"]').keypress(function(event) {
        if(event.charCode == 13) { $('#btnSearch').click(); }
    });
    $('#searchArea input[name="userNm"]').keypress(function(event) {
        if(event.charCode == 13) { $('#btnSearch').click(); }
    });
    $('#btnSearch').unbind('click').bind('click',function() { fn_SearchUser(); });
    $('#btnAdd').unbind('click').bind('click',function() {
        var userId = dhxGridUser.cells(dhxGridUser.getSelectedRowId(),0).getValue();
        if(gf_IsNull(userId)){
            gf_DivMsgAlert('사용자가 선택 되지 않았습니다.<br/>사용자를 선택해 주세요');
            return false;
        }
        fn_MenuListPopup(userId);
    });
    $('#btnSave').unbind('click').bind('click',function() {
    	if(!dhxGridUser.getRowsNum()){
    		gf_DivMsgAlert('조회된 사용자가 없습니다.');
            return false;
    	}
    	var userId = dhxGridUser.cells(dhxGridUser.getSelectedRowId(),0).getValue();
        if(gf_IsNull(userId)){
            gf_DivMsgAlert('사용자가 선택 되지 않았습니다.<br/>사용자를 선택해 주세요');
            return false;
        }    	    	
        fn_ModifyUserMenus();
    });
    $('#btnRemove').unbind("click").bind("click",function() {
        var menus = fn_CheckedUserMenu();
        if(gf_IsNull(menus)) {
            gf_DivMsgAlert('삭제할 메뉴를 체크해 주세요.');
            return false;
        } else {
            fn_RemoveUserMenus(menus);
        }
    });
    $('#btnExcelUser').unbind('click').bind('click',function() { 
    	if(!dhxGridUser.getRowsNum()){
    		gf_DivMsgAlert('조회된 사용자가 없습니다.');
            return false;
    	}
    	fn_ExcelDownUser(); 
    });
    $('#btnExcelMenu').unbind('click').bind('click',function() { 
    	if(!dhxGridUser.getRowsNum()){
    		gf_DivMsgAlert('조회된 사용자가 없습니다.');
            return false;
    	}
    	var userId = dhxGridUser.cells(dhxGridUser.getSelectedRowId(),0).getValue();
        if(gf_IsNull(userId)){
            gf_DivMsgAlert('사용자가 선택 되지 않았습니다.<br/>사용자를 선택해 주세요');
            return false;
        }
    	fn_ExcelDownMenu(); 
    });
    $('#btncloseTab').unbind('click').bind('click',function() { gf_CloseParentActiveTab(); });
    $('#btnFormReset').unbind('click').bind('click',function() { cf_InitForm(); });
    
    dhxGridUser.attachEvent("onRowSelect", function(id,ind){
        var userId = dhxGridUser.cells(id, gf_GetDhxGridColumId(dhxGridUser,'userId')).getValue();
        fn_SearchUserMenu(userId);
    });
    dhxGridUser.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){ if(keyCode == 113) fn_ExcelDownUser(); });
        
    dhxGridUserMenu.attachEvent("onCheck", function(rId, cInd, state){    	
    	fn_MenuCheckAllOnDhxGridUserMenu(rId, cInd, state);
    	// 전체선택 체크박스 클릭시
    	if(cInd === gf_GetDhxGridColumId(dhxGridUserMenu,'menuCheckAll')) {
    		var inqireAuthorAtCind = gf_GetDhxGridColumId(dhxGridUserMenu,'inqireAuthorAt');
    		var registAuthorAt = gf_GetDhxGridColumId(dhxGridUserMenu,'registAuthorAt');
    		var updtAuthorAt = gf_GetDhxGridColumId(dhxGridUserMenu,'updtAuthorAt');
    		var deleteAuthorAt = gf_GetDhxGridColumId(dhxGridUserMenu,'deleteAuthorAt');
    		var prntngAuthorAt = gf_GetDhxGridColumId(dhxGridUserMenu,'prntngAuthorAt');
    		var excelAuthorAt = gf_GetDhxGridColumId(dhxGridUserMenu,'excelAuthorAt');
    		
    		dhxGridUserMenu.cells(rId, inqireAuthorAtCind).setChecked(state);
    		dhxGridUserMenu.cells(rId, registAuthorAt).setChecked(state);
    		dhxGridUserMenu.cells(rId, updtAuthorAt).setChecked(state);
    		dhxGridUserMenu.cells(rId, deleteAuthorAt).setChecked(state);
    		dhxGridUserMenu.cells(rId, prntngAuthorAt).setChecked(state);
    		dhxGridUserMenu.cells(rId, excelAuthorAt).setChecked(state);
    		
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, inqireAuthorAtCind, state);
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, registAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, updtAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, deleteAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, prntngAuthorAt, state); 
    		fn_MenuCheckAllOnDhxGridUserMenu(rId, excelAuthorAt, state);
    	}    	
    });
    
    dhxGridUserMenu.attachEvent("onCellChanged",function(rId, cInd, value){
        if(cInd === gf_GetDhxGridColumId(dhxGridUserMenu,'dataAuthorSe')) { fn_SubMenuChanged(rId, cInd, value); }
    })
     
    dhxGridUserMenu.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){ if(keyCode == 113) fn_ExcelDownMenu(); });
    
    $('#menuCheckAll').unbind('click').bind('click',function() { fn_CheckedUserMenuCheckAll(gf_GetDhxGridColumId(dhxGridUserMenu,'menuCheckAll'), $(this).is(":checked")); });
    $('#inqireAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedUserMenuCheckAll(gf_GetDhxGridColumId(dhxGridUserMenu,'inqireAuthorAt'), $(this).is(":checked")); });
    $('#registAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedUserMenuCheckAll(gf_GetDhxGridColumId(dhxGridUserMenu,'registAuthorAt'), $(this).is(":checked")); });
    $('#updtAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedUserMenuCheckAll(gf_GetDhxGridColumId(dhxGridUserMenu,'updtAuthorAt'), $(this).is(":checked")); });
    $('#deleteAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedUserMenuCheckAll(gf_GetDhxGridColumId(dhxGridUserMenu,'deleteAuthorAt'), $(this).is(":checked")); });
    $('#prntngAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedUserMenuCheckAll(gf_GetDhxGridColumId(dhxGridUserMenu,'prntngAuthorAt'), $(this).is(":checked")); });
    $('#excelAuthorAtCheckAll').unbind('click').bind('click',function() { fn_CheckedUserMenuCheckAll(gf_GetDhxGridColumId(dhxGridUserMenu,'excelAuthorAt'), $(this).is(":checked")); });
    $('#dataAuthorSeCheckAll').unbind('change').bind('change',function() { fn_CheckedUserMenuCheckAll(gf_GetDhxGridColumId(dhxGridUserMenu,'dataAuthorSe'), $(this).val()); });    
};

var cf_SetBinding = function(){
	fn_SearchUser();
};
var cf_InitForm = function(){
	$('#searchArea input[name="userId"]').val('');
	$('#searchArea input[name="userNm"]').val('');
};

var fn_MenuCheckAllOnDhxGridUserMenu = function(rId, cInd, state){
	fn_ParentMenuChecked(rId, cInd, state);
	fn_SubMenuChecked(rId, cInd, state);
};

var fn_SearchUser = function(){
    var jsonParameter = {
        userId: $('#searchArea input[name="userId"]').val(),
        userNm: $('#searchArea input[name="userNm"]').val()
    };
    gf_Transaction(jsonParameter, 'stmmng006/search/user', jsonParameter, 'fn_CallbackSearchUserList', false, 'GET');
};

var fn_CallbackSearchUserList = function (strSvcID, targetID, data){															
	var user = data.data.records;
    var userLength = user.length;
    $("#spanCntUser").text(userLength);
    if(userLength != 0){
    	gf_NoFoundDataOnGridMsgRemove('userList');
    	dhxGridUser.clearAll();
        dhxGridUser.parse(user,'js');
        dhxGridUser.selectRow(0);
        fn_SearchUserMenu(dhxGridUser.cells(dhxGridUser.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridUser,'userId')).getValue());
    }else{
        dhxGridUser.clearAll();
        dhxGridUserMenu.clearAll();
        gf_NoFoundDataOnGridMsg('userList');
        $("#spanCntUserMenu").text(0);
    	gf_NoFoundDataOnGridMsg('userMenuList');
    }
};

var rootMenuId = 'CHF000000';
var fn_SearchUserMenu = function(userId){
    fn_UserMenuDetachEvent();// dhtmlxgrid event unbind
    var jsonParameter = { userId: userId };
    gf_Transaction(jsonParameter, 'stmmng006/search/userMenu', jsonParameter, 'fn_CallbackSearchUserMenuList', false, 'GET');
};

var fn_CallbackSearchUserMenuList = function (strSvcID, targetID, data){															
	var userMenu = data.data.records;
    $("#spanCntUserMenu").text(userMenu.length);
    if(!gf_IsNull(userMenu)){
        var menuList = [];
        var menuObj = {};
        var count = 0;
        userMenu.forEach(function(menu) {
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
            menuObj.menuAt = menu.menuAt;
            menuObj.menuId = menu.menuId;
            menuObj.userId = menu.userId;
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
        // must be top menu level defined for infinit loop
        var menuTree = gf_TreeModel(menuList, rootMenuId);
        gf_NoFoundDataOnGridMsgRemove('userMenuList');
        dhxGridUserMenu.clearAll();
        dhxGridUserMenu.parse(JSON.stringify(menuTree),'js');
    } else {
        dhxGridUserMenu.clearAll();
        gf_NoFoundDataOnGridMsg('userMenuList');
    }
};

var fn_SubMenuChecked = function(rId, cInd, state){	
	var subItems = dhxGridUserMenu.getSubItems(rId);    
    if(!gf_IsNull(subItems)) {
        var subItemArr = subItems.split(',');
        subItemArr.forEach(function(item) {
            dhxGridUserMenu.cells(item,cInd).setChecked(state);
            fn_SubMenuChecked(item, cInd, state);
        });
    }
};

var fn_ParentMenuChecked = function(rId, cInd, state) {
    var loop = true;
    var cell;
    var parentId = rId;
    var isChecked;
    var parentIdSubItems;
    while(loop) {
        parentId = dhxGridUserMenu.getParentId(parentId)
        if(parentId === null || parentId === 0 || parentId == rootMenuId) {
            loop = false;
        } else {
            isChecked = false;
            parentIdSubItems = dhxGridUserMenu.getSubItems(parentId);
            if(!gf_IsNull(parentIdSubItems)) {
                parentIdSubItemsArr = parentIdSubItems.split(',');
                parentIdSubItemsArr.forEach(function(item) {
                    if(dhxGridUserMenu.cells(item,cInd).isChecked()) {
                        isChecked = true;
                    }
                });                 
                if(isChecked) {
                    dhxGridUserMenu.cells(parentId,cInd).setChecked(true);                    
                } else {
                    dhxGridUserMenu.cells(parentId,cInd).setChecked(false);                    
                }                
            }
        }
    }
};

var fn_SubMenuChanged = function(rId, cInd, value){
    var subItems = dhxGridUserMenu.getSubItems(rId);
    if(!gf_IsNull(subItems)) {
        var subItemArr = subItems.split(',');
        subItemArr.forEach(function(item) {
            if(!dhxGridUserMenu.cells(item,cInd).isDisabled()){
                dhxGridUserMenu.cells(item,cInd).setValue(value);
            }
            fn_SubMenuChanged(item, cInd, value);
        });
    }
};

var fn_UserMenuDisabledAll = function(){
    dhxGridUserMenu.forEachRow(function(rowId) {
        dhxGridUserMenu.cells(rowId,gf_GetDhxGridColumId(dhxGridUserMenu,'inqireAuthorAt')).setDisabled(true);
        dhxGridUserMenu.cells(rowId,gf_GetDhxGridColumId(dhxGridUserMenu,'registAuthorAt')).setDisabled(true);
        dhxGridUserMenu.cells(rowId,gf_GetDhxGridColumId(dhxGridUserMenu,'updtAuthorAt')).setDisabled(true);
        dhxGridUserMenu.cells(rowId,gf_GetDhxGridColumId(dhxGridUserMenu,'deleteAuthorAt')).setDisabled(true);
        dhxGridUserMenu.cells(rowId,gf_GetDhxGridColumId(dhxGridUserMenu,'prntngAuthorAt')).setDisabled(true);
        dhxGridUserMenu.cells(rowId,gf_GetDhxGridColumId(dhxGridUserMenu,'excelAuthorAt')).setDisabled(true);
        dhxGridUserMenu.cells(rowId,gf_GetDhxGridColumId(dhxGridUserMenu,'dataAuthorSe')).setDisabled(true);        
    });
};

var fn_UserMenuDisabled = function(rId, status){
    var enabled = true;
    if(status) enabled = false;
    dhxGridUserMenu.cells(rId,gf_GetDhxGridColumId(dhxGridUserMenu,'inqireAuthorAt')).setDisabled(enabled);
    dhxGridUserMenu.cells(rId,gf_GetDhxGridColumId(dhxGridUserMenu,'registAuthorAt')).setDisabled(enabled);
    dhxGridUserMenu.cells(rId,gf_GetDhxGridColumId(dhxGridUserMenu,'updtAuthorAt')).setDisabled(enabled);
    dhxGridUserMenu.cells(rId,gf_GetDhxGridColumId(dhxGridUserMenu,'deleteAuthorAt')).setDisabled(enabled);
    dhxGridUserMenu.cells(rId,gf_GetDhxGridColumId(dhxGridUserMenu,'prntngAuthorAt')).setDisabled(enabled);
    dhxGridUserMenu.cells(rId,gf_GetDhxGridColumId(dhxGridUserMenu,'excelAuthorAt')).setDisabled(enabled);
    dhxGridUserMenu.cells(rId,gf_GetDhxGridColumId(dhxGridUserMenu,'dataAuthorSe')).setDisabled(enabled);
};

var fn_CheckedUserMenu = function(){
    var menus = [];
    var menu = [];
    menus.push(fn_SetRootMenu());    
    dhxGridUserMenu.forEachRow(function(rowId) {
        menu = [];
        menu.push( dhxGridUserMenu.cells(rowId, gf_GetDhxGridColumId(dhxGridUserMenu,'inqireAuthorAt')).getValue() );
        menu.push( dhxGridUserMenu.cells(rowId, gf_GetDhxGridColumId(dhxGridUserMenu,'registAuthorAt')).getValue() );
        menu.push( dhxGridUserMenu.cells(rowId, gf_GetDhxGridColumId(dhxGridUserMenu,'updtAuthorAt')).getValue() );
        menu.push( dhxGridUserMenu.cells(rowId, gf_GetDhxGridColumId(dhxGridUserMenu,'deleteAuthorAt')).getValue() );
        menu.push( dhxGridUserMenu.cells(rowId, gf_GetDhxGridColumId(dhxGridUserMenu,'prntngAuthorAt')).getValue() );
        menu.push( dhxGridUserMenu.cells(rowId, gf_GetDhxGridColumId(dhxGridUserMenu,'excelAuthorAt')).getValue() );
        menu.push( dhxGridUserMenu.cells(rowId, gf_GetDhxGridColumId(dhxGridUserMenu,'dataAuthorSe')).getValue() );
        menu.push( dhxGridUserMenu.cells(rowId, gf_GetDhxGridColumId(dhxGridUserMenu,'userId')).getValue() );
        menu.push( dhxGridUserMenu.cells(rowId, gf_GetDhxGridColumId(dhxGridUserMenu,'menuId')).getValue() );
        menus.push(menu.join("|"));
    });
    return menus;
};

var fn_SetRootMenu = function(){ 
    var menu = [];
    var userId = dhxGridUser.cells(dhxGridUser.getSelectedRowId(),gf_GetDhxGridColumId(dhxGridUser,'userId')).getValue();
    menu.push( '0' ); // inqireAuthorAt
    menu.push( '0' ); // registAuthorAt
    menu.push( '0' ); // updtAuthorAt
    menu.push( '0' ); // deleteAuthorAt
    menu.push( '0' ); // prntngAuthorAt
    menu.push( '0' ); // excelAuthorAt
    menu.push( '0' ); // dataAuthorSe
    menu.push( userId );
    menu.push( rootMenuId );
    return menu.join("|");
};

var fn_CheckedUserMenuCheckAll = function(columId, rowValue){	
	if(!gf_IsNull(rowValue)) {
		// 전체선택 체크박스 클릭시
		if(columId == gf_GetDhxGridColumId(dhxGridUserMenu,'menuCheckAll')) {
			$('#inqireAuthorAtCheckAll').click();
			$('#registAuthorAtCheckAll').click();
			$('#updtAuthorAtCheckAll').click();
			$('#deleteAuthorAtCheckAll').click();
			$('#prntngAuthorAtCheckAll').click();
			$('#excelAuthorAtCheckAll').click();
		}
		dhxGridUserMenu.forEachRow(function(rowId) { dhxGridUserMenu.cells(rowId,columId).setValue(rowValue); });
	}
};

var fn_ModifyUserMenus = function(){	
	var userId = dhxGridUser.cells(dhxGridUser.getSelectedRowId(),gf_GetDhxGridColumId(dhxGridUser,'userId')).getValue();
	var menus = fn_CheckedUserMenu();
    var jsonParameter = { menuIds:menus.join("|#|"), userId:userId };     
    gf_Transaction(jsonParameter, 'stmmng006/modify/userMenu', jsonParameter, 'fn_CallbackModifyUserMenus', false, 'POST');    
};

var fn_CallbackModifyUserMenus = function (strSvcID, targetID, data){															
	if(data.code === '000') {        
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    	fn_SearchUserMenu(strSvcID.userId);
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }    
};

var fn_RemoveUserMenus = function(menus){
    var jsonParameter = { menuIds: menus.join("|#|") };
    var dataSource = gf_NoAsyncTransaction('stmmng006/remove/userMenu', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert('삭제 되었습니다.');
        fn_SearchUserMenu(dhxGridUser.cells(dhxGridUser.getSelectedRowId(),gf_GetDhxGridColumId(dhxGridUser,'userId')).getValue());
    } else {
        gf_DivMsgAlert('삭제 되지 않았습니다.');
    }
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
	for (var i=0;i<eventIds.length;i++) { dhxGridUserMenu.detachEvent(eventIds[i]); }
    eventIds = [];
};

var fn_ExcelDownUser = function(){
    var userId = dhxGridUser.cells(dhxGridUser.getSelectedRowId(),gf_GetDhxGridColumId(dhxGridUser,'userId')).getValue();
    var jsonParameterUser = {
        userId: $('#searchArea input[name="userId"]').val(),
        userNm: $('#searchArea input[name="userNm"]').val()
    };
    var header = [['사용자ID', '사용자명']];
    var dataId = [['userId', 'userNm']];
    var sheetNm = [['사용자']];
    var param = [[$.param( jsonParameterUser )]];
    var fileNm = '사용자';
    var dataAlign = [['center', 'left']];
    var jsonParameter = {
        headers: header,
        dataIds: dataId,
        dataAligns : dataAlign,
        sheetNms: sheetNm,
        fileNm: fileNm,
        params: param
    };
    gf_ExcelDown('stmmng006/excel/user', jsonParameter);
};

var fn_ExcelDownMenu = function(){
    var userId = dhxGridUser.cells(dhxGridUser.getSelectedRowId(),gf_GetDhxGridColumId(dhxGridUser,'userId')).getValue();
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
    gf_ExcelDown('stmmng006/excel/userMenu', jsonParameter);
};
