/**
 * 프로그램 : 메뉴관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.16
 * 사용테이블 : STM_MENU
 **/

var dhxGridStmMenu;
var menuId = '';
var fadeRegs = false;
var fadeMode = false;
var checkAll = true;
var keyDuplication = true;
var titStmMenu = gf_LocaleTrans('default','titStmMenu');
var rootMenuId = 'CHF000000';
var rootMenuUpperMenuId = 'CHF000000';



$(function() {
    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();
    gf_IframeHeightResize(true);
});

var cf_InitParam = function (){
    gf_SetMenuPath();
    gf_FormSetValue('saveFormStmMenu', 'upperMenuId', rootMenuUpperMenuId, 'text');
    $('#saveFormStmMenu input[name="upperMenuId"]').attr("disabled", true);
};

var cf_SetComponents = function (){
	
	//gf_MakeComboBasic('progrmIdComboBox','comboProgrmId','add','width:140px','stmmng002/searchProgm', true, 'key', 'value,key');  
	gf_MakeComboBasic('progrmIdComboBox','comboProgrmId','add','width:140px','stmmng002/searchProgm', false, 'progKey', 'value,progKey');
	
	var dhxGridStmMenuListInfo = [];	
	dhxGridStmMenuListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAll" />', '40', 'center', 'na', 'ch', false, 'selYn', ''));
    dhxGridStmMenuListInfo.push(gf_MakeDhxGridHeader('메뉴명', '*', 'left', 'str', 'tree', false, 'menuNm', ''));
    dhxGridStmMenuListInfo.push(gf_MakeDhxGridHeader('사용여부', '80', 'center', 'str', 'ro', false, 'menuUseAtNm', ''));
    dhxGridStmMenuListInfo.push(gf_MakeDhxGridHeader('하위메뉴(프로그램)생성','200','center','str','ro',true,'makeBtn',''));
    dhxGridStmMenuListInfo.push(gf_MakeDhxGridHeader('menuId', '0', 'center', 'str', 'ro', true, 'menuId', ''));
    dhxGridStmMenuListInfo.push(gf_MakeDhxGridHeader('upperMenuId', '0', 'center', 'str', 'ro', true, 'upperMenuId', '')); 
    dhxGridStmMenuListInfo.push(gf_MakeDhxGridHeader('ordr', '0', 'center', 'str', 'ro', true, 'ordr', ''));
    dhxGridStmMenuListInfo.push(gf_MakeDhxGridHeader('사용여부', '0', 'center', 'str', 'ro', true, 'menuUseAt', ''));
       
    dhxGridStmMenu = gf_MakeDhxGrid('dataList', dhxGridStmMenuListInfo, true, false, false);
    dhxGridStmMenu.enableDragAndDrop(true);
    dhxGridStmMenu.enableDragOrder(true);
    dhxGridStmMenu.enableOrderSaving();
    dhxGridStmMenu.setDragBehavior('complex'); 
    dhxGridStmMenu.enableAutoWidth(true);

    $("#saveFormStmMenu").validate({
        errorElement: 'div'
    });
};

var eventIds = [];
var cf_SetEventListener = function (){
	var eventId = '';
	fn_DhtmlxGridDetachEvent();
	
	$('#btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });    
    
	eventId = dhxGridStmMenu.attachEvent("onCheck", function(rId, cInd, state){
		if(cInd === 0) fn_SubMenuChecked(rId, cInd, state);		 
	});
    eventIds.push(eventId);
    eventId = dhxGridStmMenu.attachEvent("onDrop", function(sId, tId, dId, sObj, tObj, sCol, tCol){
		fn_GridMenuRowRender();
		var menuIds = [];
		var menus = [];
		dhxGridStmMenu.forEachRow(function(rowId) {				
			var rowIndex = dhxGridStmMenu.getRowIndex(rowId);
			if(rowIndex != -1) {
				menus = [];
				menus.push(dhxGridStmMenu.cells(rowId,4).getValue());
				menus.push(dhxGridStmMenu.getRowIndex(rowId));
				menuIds.push(menus.join('|'));
			}			
		});		
		var jsonParameter = {
			upperMenuId: (dhxGridStmMenu.getParentId(dId) === 0)? rootMenuId : dhxGridStmMenu.getParentId(dId),	
			targetMenuId: tId,
			movedMenuId: dId,
			menuIds: menuIds.join('|#|')	
		};		
		fn_ModifyMenuOrder(jsonParameter);
	});
    eventIds.push(eventId);
    eventId = dhxGridStmMenu.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    eventIds.push(eventId);
    eventId = dhxGridStmMenu.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    eventIds.push(eventId);
    eventId = dhxGridStmMenu.attachEvent('onRowSelect', fn_SaveStmMenu);
    $('#btnAdd').unbind('click').bind('click', function(event){
          dhxGridStmMenu.clearSelection();
          if(!fadeRegs) {
              $('#saveForm').fadeOut(gv_FadeTime, function() {
                  cf_InitInputForm();
                  fadeRegs = true;
                  fadeMode = false;                   
                  gf_FormSetValue('saveFormStmMenu', 'comboProgrmId', '', 'combo');                  
                  keyDuplication = true;
                  $('.checkDupBtn').show();
              });
              $('#saveForm').fadeIn(gv_FadeTime, function() {});
          } else {
              cf_InitInputForm();
          }
    });
    eventIds.push(eventId);
    
    $('#btnRemove').unbind('click').bind('click', function() {
        var menuIds = fn_CheckStmMenu('menuId');
        if( gf_IsNull(menuIds) ) {
             gf_DivMsgAlert(gv_MsgDelKey);
             return false;
        } else {
            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveAll()', '');
        }
    });
    
    $('#btnExcel').unbind('click').bind('click', function() {
        fn_ExcelDown();
    });
    $('#btncloseTab').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });
    $('#btnSaveStmmng002').unbind('click').bind('click', function() {    	
    	if(keyDuplication) {
    		gf_DivMsgAlert('중복확인을 해주세요.');
    		return false;
    	}    
        if($('#saveFormStmMenu').validate().form()){        	
        	var menuOrdr = gf_FormGetValue('saveFormStmMenu', 'ordr', 'text');
        	var menuSe = gf_FormGetValue('saveFormStmMenu', 'menuSe', 'radio');
        	var progrmId = gf_FormGetValue('saveFormStmMenu', 'comboProgrmId', 'combo');
        	if(menuSe == "P" && gf_IsNull(progrmId)){
        		gf_DivMsgAlert('메뉴구분이 메뉴인 경우 프로그램ID는 필수입니다.');
        		return false;
        	}
            var jsonParameter = {
                menuId : gf_FormGetValue('saveFormStmMenu', 'menuId', 'text'),
                upperMenuId : gf_FormGetValue('saveFormStmMenu', 'upperMenuId', 'text'),
                menuNm : gf_FormGetValue('saveFormStmMenu', 'menuNm', 'text'),
                ordr : gf_IsNull(menuOrdr) ? '1' : menuOrdr,
                menuSe : gf_FormGetValue('saveFormStmMenu', 'menuSe', 'radio'),
                menuDc : gf_FormGetValue('saveFormStmMenu', 'menuDc', 'text'),
                menuUseAt : gf_FormGetValue('saveFormStmMenu', 'menuUseAt', 'chkboxYN'),
                pckageNm : gf_FormGetValue('saveFormStmMenu', 'pckageNm', 'text'),
                subPackageId : gf_FormGetValue('saveFormStmMenu', 'subPackageId', 'text'),
                progrmId : gf_FormGetValue('saveFormStmMenu', 'comboProgrmId', 'combo'),
                relTableName : gf_FormGetValue('saveFormStmMenu', 'relTableName', 'text')
            };
            var url;
            if( !gf_IsNull(menuId) ) {
                url = "stmmng002/modifyStmMenu";
            } else {
                url = "stmmng002/saveStmMenu";
            }
            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            
            if(!gf_IsNull(dataSource.data.code) && dataSource.data.code === '888') {        
            	//gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            	gf_DivMsgAlert("상위 메뉴 ID의 메뉴 구분은 메뉴만 가능합니다. \r\n 지정하신 상위 메뉴 ID의 메뉴 구분을 확인하시기 바랍니다.");
            }
            else if(dataSource.code === '000') {
            	gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            	fn_SearchGridList();
            } else {
            	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
            }
        }
        $('#saveFormStmMenu div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });
    
    $('#useAtSearchFormStmmng002').unbind('change').bind('change',function() {
    	fn_SearchGridList(); 
    });

    $('#btnSearchStmmng002').unbind('click').bind('click', function(event){
    	fn_SearchGridList();
    });
    $('#btnResetStmmng002').unbind('click').bind('click',function() {
    	gf_FormSetValue("searchFormStmmng002", "useAtSearchFormStmmng002", "1", "combo");
    	$('#useAtSearchFormStmmng002').focus();
    });
    
    $('#btnResetMhshrm006').unbind('click').bind('click',function() {
        cf_InitFormMhshrm006();
    });
    
    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridStmMenu.forEachRow(function(rowId) {
            dhxGridStmMenu.cells(rowId,0).setChecked(checkAll);
        });
    });
    $('#btnFormReset').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });   
    $('#btnCheckDup').unbind("click").bind("click",function() {
    	fn_FindSameKey();
    }); 
    $('#checkAll').unbind("click").bind("click",function() { fn_CheckAllGrid(dhxGridStmMenu, $("#checkAll").prop("checked"), 'selYn'); });
};

var cf_SetBinding = function (){
	gf_FormSetValue("searchFormStmmng002", "useAtSearchFormStmmng002", "1", "combo"); 
	fn_SearchGridList();
	/*
    dhxProgrmCombo = gf_MakeDhxCombo(
			'progrmIdComboBox', 
			'saveFormStmMenu', 
			 150, 
			'stmmng002/searchProgm.do', 
			 false, 
			'progrmId', 
			'progrmNm',
			'',
			'');	//기본값 : ROLE_GNR (일반사용자)
	*/
};

var cf_InitForm = function (){
	$('#useAtSearchFormStmmng002').focus();
};
var cf_InitInputForm = function (){
    menuId = '';
    $("#h4_pr_title").text(titStmMenu + ' ' + gv_TitRegist);
    $('#saveFormStmMenu input[name="menuId"]').removeAttr("disabled");
    $('#saveFormStmMenu input[name="upperMenuId"]').removeAttr("disabled");
    //$('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);
    gf_FormSetValue('saveFormStmMenu', 'menuId', '', 'text');
    gf_FormSetValue('saveFormStmMenu', 'upperMenuId', rootMenuUpperMenuId, 'text');
    gf_FormSetValue('saveFormStmMenu', 'menuNm', '', 'text');
    gf_FormSetValue('saveFormStmMenu', 'ordr', '1', 'text');
    gf_FormSetValue('saveFormStmMenu', 'menuSe', 'P', 'radio');
    gf_FormSetValue('saveFormStmMenu', 'menuDc', '', 'text');
    gf_FormSetValue('saveFormStmMenu', 'menuUseAt', false, 'chkbox');
    gf_FormSetValue('saveFormStmMenu', 'pckageNm', '', 'text');
    gf_FormSetValue('saveFormStmMenu', 'subPackageId', '', 'text');
    gf_FormSetValue('saveFormStmMenu', 'progrmId', '', 'text');
    gf_FormSetValue('saveFormStmMenu', 'relTableName', '', 'text');    
    //$('#saveFormStmMenu input[name="upperMenuId"]').attr("disabled", true);
    $('#saveFormStmMenu input[name="menuSe"]').removeAttr("disabled");
    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){
	var jsonParameter = {
    	menuUseAt  : gf_FormGetValue('searchFormStmmng002', 'useAtSearchFormStmmng002', 'combo')
    };
    gf_Transaction('gridList', 'stmmng002/searchStmMenu', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridStmMenu.clearAll();
    if(!gf_IsNull(data.data.records)){
       
    	var menus = data.data.records;    	 
		var menuList = [];
		var menuObj = {};
		var count = 0;
		menus.forEach(function(menu) {

			menuObj = {};
			menuObj.id = menu.menuId;
			menuObj.parentId = menu.upperMenuId;
			menuObj.pckageNm = menu.pckageNm;
			menuObj.subPackageId = menu.subPackageId;
			menuObj.progrmId = menu.progrmId;			
			menuObj.menuId = menu.menuId;
			menuObj.upperMenuId = menu.upperMenuId;
			menuObj.menuUseAt = menu.menuUseAt;
			menuObj.menuUseAtNm = menu.menuUseAtNm;
			menuObj.ordr = menu.ordr;

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
		// 트리구조 만들때 반드시 최상위 메뉴의 최상의 메뉴 id도 있어야 무한루프에 안빠진다.
		var menuTree = gf_TreeModel(menuList, rootMenuUpperMenuId);
		dhxGridStmMenu.clearAll();
		dhxGridStmMenu.parse(JSON.stringify(menuTree),'js');		
		fn_GridMenuRowRender();
		dhxGridStmMenu.openItem(rootMenuId);
		dhxGridStmMenu.selectRow(0);
		fn_SaveStmMenu('PUBMNG000');	
 
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);    
};

var fn_SaveStmMenu = function (rId, cInd) {
    menuId = '';
    var title = titStmMenu + ' ' + gv_TitRegist;

    if (!gf_IsNull(rId)) {
    	menuId = '';
    	menuId = rId;
        title = titStmMenu  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputStmMenu();
            fadeMode = true;
            fadeRegs = false;
            keyDuplication = false;
            $('.checkDupBtn').hide();
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputStmMenu();
     }
};

var fn_CheckStmMenu = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridStmMenu, col);
    dhxGridStmMenu.forEachRow(function(rowId) {
        if(dhxGridStmMenu.cells(rowId,0).isChecked()){
            resArr.push( dhxGridStmMenu.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var menuIds = [];
    menuIds.push( menuId );
    fn_RemoveStmMenu( menuIds );
};

var fn_RemoveAll = function(){
    var menuIds = fn_CheckStmMenu('menuId');
    fn_RemoveStmMenu( menuIds );
};

var fn_RemoveStmMenu = function ( menuIds ){
    var jsonParameter = {
        menuIds : menuIds.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('stmmng002/removeStmMenu', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        //gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        //sRegDt : gf_FormGetValue('searchFormStmMenu', 'searchSregDt', 'text'),
        //eRegDt : gf_FormGetValue('searchFormStmMenu', 'searchEregDt', 'text'),
        useAt  : ''
    };

    var header = [[
                    gf_LocaleTrans('default', 'titMenuId'),
                    gf_LocaleTrans('default', 'titUpperMenuId'),
                    gf_LocaleTrans('default', 'titMenuNm'),
                    gf_LocaleTrans('default', 'titOrdr'),
                    gf_LocaleTrans('default', 'titMenuSe'),
                    gf_LocaleTrans('default', 'titMenuDc'),
                    gf_LocaleTrans('default', 'titMenuUseAt'),
                    gf_LocaleTrans('default', 'titPckageNm'),
                    gf_LocaleTrans('default', 'titSubPackageId'),
                    gf_LocaleTrans('default', 'titProgrmId'),
                    gf_LocaleTrans('default', 'titRelTableName'),
    ]];
    var dataId = [[ 'menuId', 'upperMenuId', 'menuNm', 'ordr', 'menuSe', 'menuDc', 'menuUseAtNm', 'pckageNm', 'subPackageId', 'progrmId', 'relTableName' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmMenu ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmMenu;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('stmmng002/excelStmMenu', jsonParameter);
};

var fn_SearchInputStmMenu = function (){

    if( !gf_IsNull(menuId) ) {

        var jsonParameter = {
            menuId : menuId 
        };

        var dataSource = gf_NoAsyncTransaction('stmmng002/findStmMenu', jsonParameter, 'GET');
        var data = dataSource.data;
        
        gf_FormSetValue('saveFormStmMenu', 'menuId', data.menuId, 'text');
        gf_FormSetValue('saveFormStmMenu', 'upperMenuId', data.upperMenuId, 'text');
        gf_FormSetValue('saveFormStmMenu', 'menuNm', data.menuNm, 'text');
        gf_FormSetValue('saveFormStmMenu', 'ordr', data.ordr, 'text');    
        gf_FormSetValue('saveFormStmMenu', 'menuSe', data.menuSe, 'radio');
        if(data.menuSe == "M"){
        	$('#saveFormStmMenu input[name="menuSe"]').attr("disabled", true);
    	}
        else {
        	$('#saveFormStmMenu input[name="menuSe"]').removeAttr("disabled");
        }
        gf_FormSetValue('saveFormStmMenu', 'menuDc', data.menuDc, 'text');
        gf_FormSetValue('saveFormStmMenu', 'menuUseAt', (( data.menuUseAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormStmMenu', 'pckageNm', data.pckageNm, 'text');
        gf_FormSetValue('saveFormStmMenu', 'subPackageId', data.subPackageId, 'text');
        //gf_FormSetValue('saveFormStmMenu', 'progrmId', data.progrmId, 'text');
        gf_FormSetValue('saveFormStmMenu', 'relTableName', data.relTableName, 'text');
        gf_FormSetValue('saveFormStmMenu', 'comboProgrmId', data.progrmId, 'combo');

        $('#saveFormStmMenu input[name="upperMenuId"]').attr("disabled", true);
        $('#saveFormStmMenu input[name="menuId"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        //$('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {

        //$('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};


var fn_GridMenuRowRender = function(){
	dhxGridStmMenu.forEachRow(function(rowId) {		
		dhxGridStmMenu.cells(rowId,2).setDisabled(true);
		//dhxGridStmMenu.openItem(rowId);
		//dhxGridStmMenu.cells(rowId,3).setValue('<button>하위메뉴(프로그램)생성</button>');
	});
};

var fn_CheckedMenu = function(){
	var menus = [];
	dhxGridStmMenu.forEachRow(function(rowId) {				
		if(dhxGridStmMenu.cells(rowId,0).isChecked()){		
			menus.push( dhxGridStmMenu.cells(rowId,4).getValue() );				
		}		
	});
	return menus;
};

var fn_SubMenuChecked = function(rId, cInd, state){	
	var subItems = dhxGridStmMenu.getSubItems(rId);   	
	if(!gf_IsNull(subItems)) {
   		var subItemArr = subItems.split(',');
   		subItemArr.forEach(function(item) {   			
   			dhxGridStmMenu.cells(item,cInd).setChecked(state);   			   		
   			fn_SubMenuChecked(item, cInd, state);
	   	});
   	}
};

var fn_ModifyMenuOrder = function(jsonParameter){
	gf_NoAsyncTransaction('stmmng002/modifyOrder', jsonParameter, 'POST');
};


var fn_FindSameKey = function(){
	
	var key = gf_FormGetValue('saveFormStmMenu', 'menuId', 'text');

	if(gf_IsNull(key)) {
		gf_DivMsgAlert('메뉴 ID를 입력해 주세요.');		 
		$('#saveFormStmBtn #btnId').focus();
		return false;
	}
	var jsonParameter = {
			menuId: key
	};	
	var dataSource = gf_NoAsyncTransaction('stmmng002/findStmMenu', jsonParameter, 'GET');  			
	var data = dataSource.data;
	
	if(dataSource.code === '000') {
 
		if(gf_IsNull(data.menuId)) {
			gf_DivMsgAlert('등록 가능한 메뉴 ID 입니다.');
			keyDuplication = false;
			return true;
		} else {
			gf_DivMsgAlert('동일한 메뉴 ID가 존재합니다.');
			keyDuplication = true;
			return false;
		}
	} else {
		gf_DivMsgAlert('중복확인이 되지 않습니다.');
		return false;
	}
}

var fn_DhtmlxGridDetachEvent = function(){
	for (var i=0;i<eventIds.length;i++) { dhxGridStmMenu.detachEvent(eventIds[i]); }
	eventIds = [];
};

var fn_CheckAllGrid = function (dhxGrid, status, cid){
	dhxGrid.forEachRow(function(rowId) {
		dhxGrid.cells(rowId, gf_GetDhxGridColumId(dhxGrid, cid)).setChecked(status);
    });
};
