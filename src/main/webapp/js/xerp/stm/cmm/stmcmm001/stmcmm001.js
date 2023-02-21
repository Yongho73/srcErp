/**
 *	프로그램	  : 사용자로그인
 *	작성자	  : yhpark
 *	작성일자	  :	2019.04.20
 *	사용테이블   : STM_USERS	
 **/
var cf_InitParam = function(){	
	if(	vRemotAddr === '0:0:0:0:0:0:0:1' ){	   	
		$('#userId').val('729026');
	    $('#userKey').val('1');
	    
	    /*
	    setTimeout(function(){
	    	$('#btnLogin').click();
	    }, 4000);
	    */
	}		
	var dataSource = gf_NoAsyncTransaction('stmcmm001/logout', '', 'GET');	    
	$("#formLogin").validate({
        errorElement: 'div'
    });	
};

var cf_SetComponents = function(){};

var cf_SetEventListener = function(){
	
    $('#btnLogin').unbind('click').bind('click', function(event){
    	fn_Login(0);
    });    
    $(document).keypress(function(event) {
        if(event.charCode == 13) {
            fn_Login(0);
        }
    });
};

var cf_SetBinding = function(){};
var cf_InitForm = function(){};

var fn_Login = function(otherSessionCloseAt) {	
	
	var closeAt = gf_IsNull(otherSessionCloseAt) ? '0' : otherSessionCloseAt;
	
	if($("#formLogin").validate().form()){		
	    var jsonParameter = {
	                        userId: $('#userId').val(),
	                        userKey: $('#userKey').val(),
	                        otherSessionCloseAt: closeAt
	                        };	
	    gf_Transaction( $('#userId').val(), 'stmcmm001/checkLogin', jsonParameter, 'fn_Callback', false );
	}
};

var fn_Callback = function(strSvcID, targetID, data){
    if (data.data == false) {        
    	gf_DivMsgAlert('아이디, 비밀번호가 일치하지 않습니다.',  '#formLogin #userId');
        return;        
    } else {       	
    	if(data.data == 'already') {
    		gf_DivMsgConfirm('이미 접속중 입니다.<br/>기존의 접속을 종료하시겠습니까?', 'fn_Login(1);', 'return false;');
    		return;
    	}
    	if(gf_SettingPasswordChangeCycle(data.passwordUpdt, 'fn_RedirectChangePassword("'+data.redirect+'");', 'fn_RedirectMain("'+data.redirect+'");')) {
    	
    		window.location.href = gv_ServerApiUrl + "/" + data.redirect ;
	    	//window.location.href = gv_ServerApiUrl + "/stmcmm002/sub/view";
	       	//window.location.href = gv_ServerApiUrl + "/stmcmm002/main/view"; // 메인페이지로 리다이렉트
	       	//window.location.href = gv_ServerApiUrl + "/stmcmm002/sub/view?upMenuId=MHSMNG000"; // 특정페이지로 리다이렉트
    	}
    }
};

var fn_RedirectChangePassword = function(redirectUrl) {
	window.location.href = gv_ServerApiUrl + "/" + redirectUrl ;
}

var fn_RedirectMain = function(redirectUrl) {
	window.location.href = gv_ServerApiUrl + "/" + redirectUrl ;
}

$(function() {

	cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

});
