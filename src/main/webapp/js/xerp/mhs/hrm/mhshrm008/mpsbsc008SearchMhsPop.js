
//부서 팝업
var fn_DeptPopup = function (formId, codeId, codeNmId) {
	
	var userId = ""; 
	var title  = "부서 조회";
	
	
	
	//저장팝업
	var dhxWindowObj;
	if($('body').find("div[id='bpopup']").size() <= 0) {
		$('body').append("<div id='bpopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'deptPopup';
			//var ajaxUrl = gv_ContextPath+'/mhshrm008/pop/searchMhsDept/view';
			var ajaxUrl = gv_ContextPath+'/pop/dept/view';
			
			var left	= 0;
			var top		= 0;
			var width	= 500;
			var height	= 500;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('.b-close').click();
			});
		},
		onClose:function(){
			$('.dhxwin_active').remove();
			$('body').find("div[id='bpopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//직급 팝업
var fn_ClsfPopup = function (formId, codeId, codeNmId) {
	
	var userId = ""; 
	var title  = "직급 조회";
	
	//저장팝업
	var dhxWindowObj;
	if($('body').find("div[id='bpopup']").size() <= 0) {
		$('body').append("<div id='bpopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'deptPopup';
			var ajaxUrl = gv_ContextPath+'/mhshrm008/pop/searchMhsClsf/view';
			var left	= 0;
			var top		= 0;
			var width	= 500;
			var height	= 500;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('.b-close').click();
			});
		},
		onClose:function(){
			$('.dhxwin_active').remove();
			$('body').find("div[id='bpopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//사원조회 팝업
var fn_EmpPopup = function (formId, codeId, codeNmId) {
	
	var userId = ""; 
	var title  = "사원 조회";
	
	//저장팝업
	var dhxWindowObj;
	if($('body').find("div[id='bpopup']").size() <= 0) {
		$('body').append("<div id='bpopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'deptPopup';
			var ajaxUrl = gv_ContextPath+'/mhshrm008/pop/searchMhsClsf/view';
			var left	= 0;
			var top		= 0;
			var width	= 500;
			var height	= 500;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('.b-close').click();
			});
		},
		onClose:function(){
			$('.dhxwin_active').remove();
			$('body').find("div[id='bpopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};