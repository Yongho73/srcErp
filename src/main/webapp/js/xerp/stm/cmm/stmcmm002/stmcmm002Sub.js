var locale = gv_Locale;
var upMenuId;
var subMenuId;
//--------------------------------------------------------------------------------- 로컬스토리지 삭제 (로컬스토리지 갱신)
gf_RemoveLocalStorageData('userId');
gf_RemoveLocalStorageData('userMenu');
gf_RemoveLocalStorageData('userTopMenu');
//--------------------------------------------------------------------------------- 기본 함수
$(function() {	
	cf_InitParam();
	cf_SetComponents();
	cf_SetEventListener();
	cf_SetBinding();
	cf_InitForm();
});
//--------------------------------------------------------------------------------- 기본 함수 구현
var dhxMenuTabbars;
var cf_InitParam = function(){			
	// 사용자 정보
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
	$('.userNameTagArea').html('<b>'+userInfo.data.userNm+'('+userInfo.data.userId+')</b> - '+userInfo.data.userDeptNm);
	// dhtmlx 메뉴탭
	dhxMenuTabbars = new dhtmlXTabBar("menuTabbars");
};

var cf_SetComponents = function(){	
	fn_SetUserMenu(upMenuId, subMenuId);
	if(gf_IsNull(subMenuId)) { fn_SetFirstMenuOpen(upMenuId); }
};

var gnbTopMenuIndex = 0;
var dhxLeftTreeView;
var favMenuYn = false;
var favOrMenuSearch = false;
var cf_SetEventListener = function(){

	$('.gnb li').mouseover(function(){
		gnbTopMenuIndex = $(this).index();
		$('.sub_lnb').removeClass('on').eq(gnbTopMenuIndex).addClass('on');
		$('.gnb > li > a').removeClass('on').eq(gnbTopMenuIndex).addClass('on');
	});
	
	$('.header').mouseleave(function(){
		$('.sub_lnb').removeClass('on');
		$('.gnb > li > a').removeClass('on');
	});

	$('.sub_lnb').mouseover(function(){
		$('.sub_lnb').each(function(){ $(this).removeClass('on'); });
		$(this).addClass('on');
	});
	
//
//	$('#sidebar-toggle').click(function() {        
//   		if(!$("#leftMnu").hasClass("close-sidebar")){
//            $(".leftMnu").addClass("close-sidebar");
//            $(".lnav_div").addClass("close-sidebar");
//            $(".tab_div").addClass("close-sidebar");
//            $(".dhxtabbar_tabs_top").addClass("close-sidebar");
//            $(".dhx_cell_cont_tabbar").addClass("close-sidebar");
//	  	}else{
//            $(".leftMnu").removeClass("close-sidebar");
//            $(".lnav_div").removeClass("close-sidebar");
//            $(".tab_div").removeClass("close-sidebar");
//            $(".dhxtabbar_tabs_top").removeClass("close-sidebar");
//            $(".dhx_cell_cont_tabbar").removeClass("close-sidebar");
//		}	   
//   	});
//		

	$(window).resize(function() {
		resizeContents();
	});
	
	$('#sidebar-toggle').click(function() {
		if(!$("#leftMnu").hasClass("close-sidebar")){   			
            $(".leftMnu").addClass("close-sidebar");
            $(".lnav_div").addClass("close-sidebar");
            $(".tab_div").addClass("close-sidebar");
            $(".dhxtabbar_tabs_top").addClass("close-sidebar");
            
            $(".dhx_cell_cont_tabbar").addClass("close-sidebar");          
            var  d_width = $(".dhxtabbar_cont").width();
            d_width = d_width + 220;
            $(".dhxtabbar_cont").css("width", d_width + "px");
            var  d_width2 = $(".dhx_cell_tabbar").width();
            d_width2 = d_width2 + 220;
            $(".dhx_cell_tabbar").css("width", d_width2 + "px");
            $(".lnav_btn").css("border-top-right-radius", "0");
	  	}else{	  		
            $(".leftMnu").removeClass("close-sidebar");
            $(".lnav_div").removeClass("close-sidebar");
            $(".tab_div").removeClass("close-sidebar");
            $(".dhxtabbar_tabs_top").removeClass("close-sidebar");
            $(".dhx_cell_cont_tabbar").removeClass("close-sidebar");
            $(".lnav_btn").css("border-top-right-radius", "inherit");
		} 
	});
	
	$('.btn_search').click(function() {        
   		if($("#leftMnu").hasClass("close-sidebar")){
   			$(".leftMnu").removeClass("close-sidebar");
            $(".lnav_div").removeClass("close-sidebar");
            $(".tab_div").removeClass("close-sidebar");
            $(".dhxtabbar_tabs_top").removeClass("close-sidebar");
            $(".dhx_cell_cont_tabbar").removeClass("close-sidebar");
            $("#search_left").focus();
	  	}else{$("#search_left").focus();}
   	});


//	$('#sidebar-toggle').click(function() {        
//   		if(!$(".Lmenu").hasClass("close-sidebar")){
//            $(".Lmenu").addClass("close-sidebar");
//			$(".lnb_box").addClass("close-sidebar");
//			$(".swipe_btn").addClass("close-sidebar");
//			$(".sub_content").addClass("close-sidebar");
//          $(".fix-top").addClass("close-sidebar");
//			$(".title_box").addClass("close-sidebar");
//            $(".lnbmenu").addClass("close-sidebar");
//	  	}else{
//            $(".Lmenu").removeClass("close-sidebar");
//			$(".lnb_box").removeClass("close-sidebar");
//			$(".swipe_btn").removeClass("close-sidebar");
//			$(".sub_content").removeClass("close-sidebar");
//			$(".fix-top").removeClass("close-sidebar");
//			$(".title_box").removeClass("close-sidebar");
//            $(".lnbmenu").removeClass("close-sidebar");
//		}	   
//   	});
		
	$('#search_left').unbind("keyup").bind("keyup",function(event){
		if(!gf_IsNull($(this).val())) {			
			var jsonParameter = { menuNm : $(this).val(), locale : locale };
			var dataSource = gf_NoAsyncTransaction('stmcmm002/searchMenuNm', jsonParameter, 'GET');						
			if(!gf_IsNull(dataSource.data)) {			
				var userMenu = dataSource.data;
				var menuLevel1;
				var menuArray1 = [];
				var menuCd = menuCls = menuNm = '';
				var i = 0;			
				for (var menu in userMenu) {
					if(!gf_IsNull(userMenu[menu].id)){			
			    		menuCd  = userMenu[menu].id;			    		
			    		if(locale === 'kor') {
			    			menuNm = userMenu[menu].text;
						} else
						if(locale === 'third') {
							menuNm = userMenu[menu].textThird;
						} else {
							menuNm = userMenu[menu].textEng;
						}			    		
			    		menuCls = userMenu[menu].menuSe; 			
			    		if(menuCls == "P"){
			    			menuLevel1 = {};
			    			menuLevel1.id = menuCd;
			    			menuLevel1.text = menuNm
			    			menuLevel1.open = 0;
			    			menuLevel1.makeAt = userMenu[menu].makeAt; //작성여부
			    			menuArray1[i] = menuLevel1;			    			
			    			i++;
			    		}
					}
				}				
				if(i > 0) {
					var strJsonRef = JSON.stringify(menuArray1);
					dhxLeftTreeView = new dhtmlXTreeView('subMenuList');
					dhxLeftTreeView.clearAll();
					dhxLeftTreeView.loadStruct(strJsonRef);					
					dhxLeftTreeView.attachEvent("onSelect", function(id, mode){
						if(mode){
							var findProgrmId = fn_GetProgramId(id); //gf_NoAsyncTransaction('stmcmm002/findProgrmId', {menuId : id}, 'GET');									
							var progrmId = gf_IsNull(findProgrmId) ? id : findProgrmId;
							if(gf_IsNull(dhxLeftTreeView.getSubItems(id))){
								fn_Menu(id, progrmId, dhxLeftTreeView.getItemText(id)); 
							}
						}
					});					
					$('.lnav_tit').text(gf_LocaleTrans('default','msgSearchResult'));					
					favOrMenuSearch = true;
				}				
			} else {
				$('#subMenuList').html('<div style="text-align:center; margin-top:10px; font-size:12px;">'+gf_LocaleTrans('default','msgNoSearchMenu')+'</div>');
			}
		} else {
			fn_SetUserMenu(upMenuId, subMenuId);
			favOrMenuSearch = false;
		}
	});
		
	$('#favMenu').unbind("click").bind("click",function(event){	 			
		favMenuYn = true;		
		var jsonParameter = {};
		var dataSource = gf_NoAsyncTransaction('stmcmm002/searchFavMenu', jsonParameter, 'GET');					
		if(!gf_IsNull(dataSource.data)) {
			var userMenu = dataSource.data;
			var menuLevel1;
			var menuArray1 = [];
			var menuCd = menuCls = menuNm = '';
			var i = 0;		
			for (var menu in userMenu) {
				if(!gf_IsNull(userMenu[menu].id)){		
		    		menuCd  = userMenu[menu].id;		    		
		    		if(locale === 'kor') { menuNm = userMenu[menu].text; } else
					if(locale === 'third') { menuNm = userMenu[menu].textThird; } else {
						menuNm = userMenu[menu].textEng;
					}		    		
		    		menuCls = userMenu[menu].menuSe; 		
		    		if(menuCls == "P"){
		    			menuLevel1 = {};
		    			menuLevel1.id = menuCd;
		    			menuLevel1.text = menuNm
		    			menuLevel1.open = 0;
		    			menuArray1[i]   = menuLevel1;
		    			i++;
		    		}
				}
			}			
			if(i > 0) {
				var strJsonRef = JSON.stringify(menuArray1);
				dhxLeftTreeView.clearAll();
				dhxLeftTreeView.loadStruct(strJsonRef);
				dhxLeftTreeView.attachEvent("onSelect", function(id, mode){
					if(mode){ 
						var findProgrmId = fn_GetProgramId(id); //gf_NoAsyncTransaction('stmcmm002/findProgrmId', {menuId : id}, 'GET');									
						var progrmId = gf_IsNull(findProgrmId) ? id : findProgrmId;
						if(gf_IsNull(dhxLeftTreeView.getSubItems(id))){ 
							fn_Menu(id, progrmId, dhxLeftTreeView.getItemText(id));
						}
					}
				});				
				$('.lnav_tit').text(gf_LocaleTrans('default','titFavorites'));
				favOrMenuSearch = true;
			}
		} else {
			gf_DivMsgAlert(gf_LocaleTrans('default','msgNoFavoritesMenu'));
		}
	});
	
	$('#addFavMenuBtn').unbind("click").bind("click",function(event){	 		
		var menuId = '';
		$('.ui-tabs .ui-tabs-nav li').each(function() {
			if($(this).hasClass("ui-tabs-active")){ menuId = $(this).attr("aria-controls"); }
		});		
		if(gf_IsNull(menuId)) {
			gf_DivMsgAlert(gf_LocaleTrans('default','msgSelectMenuTab'));
			return false;
		}		
		var jsonParameter = { menuId: menuId };		
		var res = gf_NoAsyncTransaction('stmcmm002/addFavMenu', jsonParameter, 'POST');		
		if(res.data === true) {
			gf_DivMsgAlert(gf_LocaleTrans('default','msgFavoritesMenuAdded'));
			if(favMenuYn) $('#favMenu').click();
		} else {
			gf_DivMsgAlert(gf_LocaleTrans('default','msgAlreadyFavoritesMenu'));	
		}
	});
	
	$('#removeFavMenuBtn').unbind("click").bind("click",function(event){	 		
		var menuId = '';
		$('.ui-tabs .ui-tabs-nav li').each(function() {
			if($(this).hasClass("ui-tabs-active")){ menuId = $(this).attr("aria-controls"); }
		});		
		if(gf_IsNull(menuId)) {
			gf_DivMsgAlert(gf_LocaleTrans('default','msgSelectRemoveFavoritesMenu'));
			return false;
		}		
		var jsonParameter = { menuId: menuId };		
		var res = gf_NoAsyncTransaction('stmcmm002/removeFavMenu', jsonParameter, 'POST');		
		if(res.data === true) {
			gf_DivMsgAlert(gf_LocaleTrans('default','msgRemovedFavoritesMenu'));
			if(favMenuYn) $('#favMenu').click();
		} else {
			gf_DivMsgAlert(gf_LocaleTrans('default','msgNoAddFavoritesMenu'));	
		}		
	});
	
	$('#allClose').unbind("click").bind("click",function(event){
		dhxMenuTabbars.clearAll();
		dhxLeftTreeView.unselectItem(dhxLeftTreeView.getSelectedId());
		
		//메뉴 선택 시 게시판 있는 메인 페이지 숨기기
		$('#menuTabbars').css("display", "none");
		$('#menuTabbars_main').css("display", "block");
	});
	
	dhxMenuTabbars.attachEvent("onTabClose", function(id){
		// _removeTab(id, 이전탭 활성화, 화살표 표시)
		this._removeTab(id, true, true);
		
		var ids = dhxMenuTabbars.getAllTabs();
		if(ids.length <= 0){  //열린 탭이 없을 경우 메인 페이지 보이도록
			$('#menuTabbars').css("display", "none");
			$('#menuTabbars_main').css("display", "block");
		}
	});
	
	$('.logout').click(function() {
		var dataSource = gf_NoAsyncTransaction('stmcmm001/logout', '', 'GET');
		if(dataSource.code === '000') {
			gf_RemoveLocalStorageData("user");
			gf_RemoveLocalStorageData("userId");
			gf_RemoveLocalStorageData('userMenu');
			gf_RemoveLocalStorageData('userTopMenu');
			window.location.href = gv_ContextPath + "/";
		}  
	});
	
	$('#engBtn').unbind("click").bind("click",function(event){		
		var dataSource = gf_NoAsyncTransaction('locale/modifyLocale', {locale:'eng'} , 'GET');
		if(dataSource.code === '000') { window.location.href = self.location.href; }
	});
	
	$('#korBtn').unbind("click").bind("click",function(event){
		var dataSource = gf_NoAsyncTransaction('locale/modifyLocale', {locale:'kor'} , 'GET');
		if(dataSource.code === '000') {			 
			window.location.href = self.location.href;
		}
	});
	
	$('#btnZoomIn').unbind('click').bind('click', function(event){ zoomIn(); });
	
    $('#btnZoomOut').unbind('click').bind('click', function(event){ zoomOut(); });
    
    //개발시 필요한 URL (프로젝트에서는 사용안함) 
	$('#btnRedmine').unbind("click").bind("click",function(event){ window.open('http://redmine.dbvision.co.kr/login','_blank'); });
	$('#btnSamplePage').unbind("click").bind("click",function(event){ window.open(gv_ContextPath+'/sample/view','_blank'); });
    
};

var cf_SetBinding = function(){};
var cf_InitForm = function(){};

// left menu
var fn_SetUserMenu = function(upMenu, subMenu){	
	
	var userMenus = gf_GetLocalStorageData('userMenu', true);
	var userTopMenu = gf_GetLocalStorageData('userTopMenu', true);
	upMenuId = gf_IsNull(upMenu) ? '' : upMenu;
	subMenuId = subMenu;

	/******************************************************************************************************************************************
	 * left menu object local storage save
	 ******************************************************************************************************************************************/
	if(gf_IsNull(userMenus)) {	
		var jsonParameter = { upMenuId : upMenuId };	
		var dataSource = gf_NoAsyncTransaction('stmcmm001/findUser', jsonParameter, 'GET');		
		gf_RemoveLocalStorageData('userMenu');
		gf_RemoveLocalStorageData('userTopMenu');
		gf_SetLocalStorageData('userMenu',fn_MakeLeftMenuAddTopMenuId(dataSource.data.userMenu),true);
		gf_SetLocalStorageData('userTopMenu',dataSource.data.userTopMenu,true);
		gf_SetLocalStorageData('userId', dataSource.data.userId, false);
		userMenus = gf_GetLocalStorageData('userMenu', true)
		userTopMenu = gf_GetLocalStorageData('userTopMenu', true)			
	}

	
	if(!gf_IsNull(userMenus)) {		
		 
		var topMenuArr = [];
		var locale = gv_Locale;
		var menuString;		
		userTopMenu.forEach(function(item) {								
			if(gf_IsNull(upMenuId)) upMenuId = item.id;			
			if(locale === 'kor') { menuString = item.text; } else
			if(locale === 'third') { menuString = item.textThird; } else {
				menuString = item.textEng;
			}			
			topMenuArr.push('<li id="M_'+item.id+'"><a href="javascript:fn_OpenMenu(\''+item.id+'\');">'+menuString+'</a>');
		});
		$('.gnb ul').html(topMenuArr.join(""));
		
		
		$('.nav_list a').unbind("click").bind("click",function(event){
	   		if($("#leftMnu").hasClass("close-sidebar")){
	   			$(".leftMnu").removeClass("close-sidebar");
	            $(".lnav_div").removeClass("close-sidebar");
	            $(".tab_div").removeClass("close-sidebar");
	            $(".dhxtabbar_tabs_top").removeClass("close-sidebar");
	            $(".dhx_cell_cont_tabbar").removeClass("close-sidebar");
		  	}  
	   	});
		
		dhxLeftTreeView = new dhtmlXTreeView('subMenuList');		
		var leftTreeArray = gf_TreeModelLeftMenu(fn_GetLeftMenu(userMenus, upMenuId), upMenuId, locale);
		
		// first menu open
		//var tmpObject = leftTreeArray[0];	
		//tmpObject.open = 0;		
		//leftTreeArray[0] = tmpObject
		
		// menu open and select check
		var checkUpperMenuIdForOpen;
		var isTreeMenuOpen = false;
		for (var menu in leftTreeArray) {

			if(!gf_IsNull(leftTreeArray[menu].items)) {
				leftTreeArray[menu].items.forEach(function(item){
					if(item.id == subMenuId) {
						isTreeMenuOpen = true;
					}
				})
			}
			
			if(isTreeMenuOpen) {			 
				checkUpperMenuIdForOpen = leftTreeArray[menu];
				checkUpperMenuIdForOpen.open = 1;				
				leftTreeArray[menu] = checkUpperMenuIdForOpen;	
				break;
			}
		}

		// menu list print					
		for (var menu in leftTreeArray) {			
			if(!gf_IsNull(leftTreeArray[menu].id)){    		
	    		if(locale === 'kor') { leftTreeArray[menu].text = leftTreeArray[menu].text; } else
				if(locale === 'third') { leftTreeArray[menu].text = leftTreeArray[menu].textThird; } else {
					leftTreeArray[menu].text = leftTreeArray[menu].textEng;
				}
			}			
		}	
		dhxLeftTreeView.clearAll();
		dhxLeftTreeView.loadStruct(JSON.stringify(leftTreeArray));
		dhxLeftTreeView.attachEvent("onClick", function(id){
			//이벤트 타지 않음
			//gf_Trace("onClick : " + id);
		});
		dhxLeftTreeView.attachEvent("onSelect", function(id, mode){

			//gf_Trace("id : " + id);
			//gf_Trace("mode : " + mode);
			/******************************************************************************************************************************************
			 * find program id mapping menu in local storage key userMenu
			 ******************************************************************************************************************************************/			
			if(mode){				
				//var findProgrmId = fn_GetProgramId(id); // localstorage
				var findProgrmId = gf_NoAsyncTransaction('stmcmm002/findProgrmId', {menuId : id}, 'GET').data;	
				var progrmId = gf_IsNull(findProgrmId) ? id : findProgrmId;	

				if(gf_IsNull(dhxLeftTreeView.getSubItems(id))) {
					subMenuId = id;
					
					fn_Menu(id, progrmId, dhxLeftTreeView.getItemText(id));
				}
			}
			
		});
		$('.gnb ul li#M_'+upMenuId).attr('class', 'topMenuBtnLi active');		 
		$('.lnav_tit').text($('.gnb ul li#M_'+upMenuId).find("a").text());		
		if(!gf_IsNull(subMenuId)){ 
			dhxLeftTreeView.selectItem(subMenuId);
		} else {
			dhxLeftTreeView.unselectItem(dhxLeftTreeView.getSelectedId());
		}
		// one click open close menu
		$('.lnbmenu .dhxtreeview_item_text').unbind("click").bind("click",function(){
			if($(this).find(".dhxtreeview_icon_folder_closed").index() != -1) { dhxLeftTreeView.openItem($(this).find("div.dhxtreeview_item_icon").eq(0).attr("menuId")); } else
			if($(this).find(".dhxtreeview_icon_folder_opened").index() != -1) { dhxLeftTreeView.closeItem($(this).find("div.dhxtreeview_item_icon").eq(0).attr("menuId")); } else {				
			}
		});
		// 권한이 없을 경우
		if(gf_IsNull(userTopMenu)) gf_DivMsgAlert("부여된 권한이 없습니다.");
		
	} else {		
		gf_SessionCheck();
	}		
}; 

var fn_Menu = function(id, programId, text){	
	/*
	id	        string|number	tab id
	text	    string	        tab text
	width	    number	        (optional) tab width, null by default, if not number - will be adjusted automatically
	position	number	        (optional) tab position, null by default (last tab)
	active	    boolean	        (optional) set to true to select the added tab, false by default
	close	    boolean	        (optional) set to true to render the Close button, false by default, overrides enableTabCloseButton()
	*/	
	gf_Trace('id=['+id+'], programId=['+programId+'], text=['+text+']');
	
	var ids = dhxMenuTabbars.getAllTabs();
	var isExist = false;
	for (var q=0; q<ids.length; q++) {
		if(id == ids[q]) isExist = true;		
	}
	
	//메뉴 선택 시 게시판 있는 메인 페이지 숨기기
	$('#menuTabbars').css("display", "block");
	$('#menuTabbars_main').css("display", "none");
	
	if(isExist) {
		dhxMenuTabbars.tabs(id).setActive();
	} else {
		dhxMenuTabbars.addTab(id, text, null, -1, true, true);	
		dhxMenuTabbars.tabs(id).attachURL(gv_ContextPath+'/'+programId.toLowerCase()+'/view');		
	} 
};

var fn_OpenMenu = function (upMenuId, subMenuId) {
	favOrMenuSearch = false;
	fn_SetUserMenu(upMenuId, subMenuId);
	favMenuYn = false;
};

var fn_GetTopMenuId = function (menuId) {	
	/*
	var topMenuId;
	var userMenu = gf_GetLocalStorageData('userMenu', true);
	userMenu.some(function(item) { 
		if(item.id == menuId) {			
			topMenuId = item.topMenuId;
			return true;
		}	
	});
	return topMenuId;
	*/	
	var jsonParameter = { menuId:menuId };	
	var res = gf_NoAsyncTransaction('stmcmm002/getTopMenuId', jsonParameter, 'POST');
	return res.data;	
}

var fn_GetTopMenuIdActive = function() {
	var activeTopMenuId = '';
	$('.gnb ul li').each(function(){
		if($(this).hasClass('topMenuBtnLi active')) activeTopMenuId = $(this).attr('id').replace('M_','');
	})
	return activeTopMenuId;
}

var fn_SetFirstMenuOpen = function (upMenuId){
	/*
	var firstMenuId;
	var userMenu = gf_GetLocalStorageData('userMenu', true);
	var leftMenu = fn_GetLeftMenu(userMenu, upMenuId)
	leftMenu.some(function(item) { 		
		if(item.menuSe == 'P') {
			firstMenuId = item.id;
			return true;
		}	
	});	
	if(!gf_IsNull(firstMenuId)){ dhxLeftTreeView.selectItem(firstMenuId); }
	*/
	
	//사용자의 첫번째 매뉴 선택
	//var jsonParameter = { upMenuId:upMenuId };	
	//var res = gf_NoAsyncTransaction('stmcmm002/findFirstProgramMenuId', jsonParameter, 'POST');
	//if(!gf_IsNull(res.data)){ dhxLeftTreeView.selectItem(res.data); }
	//2020.08.03 - 고정화면으로 변경
	//fn_Menu('STMSYS008', 'STMSYS008', 'ERP');
};

var fn_GetProgramId = function(menuId) {
	var userMenu = gf_GetLocalStorageData('userMenu', true);
	var programId;
	userMenu.some(function(item) { 
		if(item.id == menuId) {
			programId = item.progrmId;
			return true;
		}
	});	
	return programId;
}

var fn_GetLeftMenu = function(menuList, upMenuId){
	var menus = []; 
	menuList.forEach(function(item) {
		if(item.topMenuId == upMenuId && item.parentId != 'CHF000000') {
			menus.push(item);
        }
	});
	return menus;
}

var fn_MakeLeftMenuAddTopMenuId = function(menuList){
	var upperMenu;
	var menus = []; 
	menuList.forEach(function(item) {
		if(item.level == '1') {
            upperMenu = item.id;             
        }
		item.topMenuId = upperMenu;
		menus.push(item);
	});	
	return menus;
}

function resizeContents() {
    dhxMenuTabbars.setSizes();
}