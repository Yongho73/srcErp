var cnt = 0;
var locale = gv_Locale;
var nowZoom = 100;

$(function() {	
	cf_InitParam();
	cf_SetComponents();
	cf_SetEventListener();
	cf_SetBinding();
	cf_InitForm();
});

var cf_InitParam = function(){		
	
	
	zoomReset();
	// 결재탭
	$("#tab-cnt div").hide(); // Initially hide all content
	$("#tabmenu li:first").attr("id","current"); // Activate first tab
	$("#tab-cnt div:first").fadeIn(); // Show first tab content
    
    $('#tabmenu a').click(function(e) {
       	e.preventDefault();        
       	$("#tab-cnt div").hide(); //Hide all content
       	$("#tabmenu li").attr("id",""); //Reset id's
       	$(this).parent().attr("id","current"); // Activate this
       	$('#' + $(this).attr('title')).fadeIn(); // Show content for current tab
    });	
    
    $('#korBtn').removeClass("on");
    $('#engBtn').removeClass("on");
    
    if(locale === 'kor') {
		$('#korBtn').addClass("on");
	} else
	if(locale === 'third') {
		$('#korBtn').addClass("on");
	} else {
		$('#engBtn').addClass("on");
	}    
};

var cf_SetComponents = function(){
	
	$(".ipBox").text(remotAddr); 
	
	var dataSource = gf_NoAsyncTransaction('stmcmm001/findUser', '', 'GET');	
	if(dataSource.code === '000') {
		var userData = dataSource.data;						
		$('.user_box .myinfo .nm').text(userData.userNm);	
		
		//gf_RemoveLocalStorageData("user");
		//gf_SetLocalStorageData("user", userData, true);
		
		var userTopMenu	= userData.userTopMenu;
		var topMenuArr = [];		
		var menuString;

		userTopMenu.forEach(function(item) {		
			
			if(locale === 'kor') {
				menuString = item.menuNm;
			} else
			if(locale === 'third') {
				menuString = item.third;
			} else {
				menuString = item.eng;
			}
			
			topMenuArr.push('<li id="M_'+item.menuId+'"><a href="'+ gv_ServerApiUrl +'/stmcmm002/sub/view?upMenuId='+item.menuId+'">'+menuString+'</a>');
			//topMenuArr.push('<div class="smenu">');
			//topMenuArr.push('<ul class="sub_lnb">');
			//item.subMenu.forEach(function(subMenu) {
			//	topMenuArr.push('<li><a href="'+ gv_ServerApiUrl +'/stmcmm002/sub/view?upMenuId='+subMenu.parentId+'&subMenuId='+subMenu.id+'">'+subMenu.text+'</a></li>');
			//});
			//topMenuArr.push('</ul>');
			//topMenuArr.push('</div>');								 
		});

		$('.gnb > ul').html(topMenuArr.join(""));
	}
};

var cf_SetEventListener = function(){
	
	//$(".gnb").mouseover(function(){
	//		$(".smenu_area").show();
	//		$(".smenu").show();
	//}); 
	//$(".header").mouseleave(function(){
	//		$(".smenu_area").hide();
	//		$(".smenu").hide();
	//}); 
	$('.gnb li').mouseover(function(){
		cnt = $(this).index();
		$('.sub_lnb').removeClass('on').eq(cnt).addClass('on');
		$('.gnb > li > a').removeClass('on').eq(cnt).addClass('on');
	});
	
	$('.header').mouseleave(function(){
		$('.sub_lnb').removeClass('on');
		$('.gnb > li > a').removeClass('on');
	});

	$('.sub_lnb').mouseover(function(){
		$('.sub_lnb').each(function(){
			$(this).removeClass('on');
		})
		$(this).addClass('on')
	});
	$('.logout').click(function() {
		var dataSource = gf_NoAsyncTransaction('stmcmm001/logout', '', 'GET');
		if(dataSource.code === '000') {
			gf_RemoveLocalStorageData("user");
			gf_RemoveLocalStorageData("userId");
			window.location.href = gv_ContextPath + "/";
		}  
	});
		
	$('#engBtn').unbind("click").bind("click",function(event){		
		var dataSource = gf_NoAsyncTransaction('locale/modifyLocale', {locale:'eng'} , 'GET');
		if(dataSource.code === '000') {			 
			window.location.href = self.location.href;
		}
	});
	$('#korBtn').unbind("click").bind("click",function(event){
		var dataSource = gf_NoAsyncTransaction('locale/modifyLocale', {locale:'kor'} , 'GET');
		if(dataSource.code === '000') {			 
			window.location.href = self.location.href;
		}
	});
	$('#btnZoomIn').unbind('click').bind('click', function(event){
    	zoomIn();
    });
    $('#btnZoomOut').unbind('click').bind('click', function(event){
    	zoomOut();
    });
};

var cf_SetBinding = function(){
	
	//gf_Trace("cf_SetBinding");
};

var cf_InitForm = function(){
	
	//gf_Trace("cf_InitForm");
};

var zooms  = function (){
	//document.body.style.zoom = nowZoom + '%'; 
	document.body.style.zoom = nowZoom + '%';
	parent.document.body.style.zoom = nowZoom + '%';
	
	$("#spanFontSize").text(nowZoom);
	if(nowZoom == 70){ 
		alert('70% 축소 되었습니다 더이상 축소 할 수 없습니다.');		
	}
	if(nowZoom == 200){
		alert('200% 확대 되었습니다 더이상 확대할 수 없습니다.');		
	}
};
var zoomOut = function() {
	nowZoom = nowZoom   - 5;
	if(nowZoom <= 50) nowZoom = 50;
	zooms();
}
var zoomIn = function() {
	nowZoom = nowZoom  + 5;
	if(nowZoom >= 300) nowZoom = 300;
	zooms();
}
var zoomReset  = function() {
	nowZoom = 100;
	zooms();
}