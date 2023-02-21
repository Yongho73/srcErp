<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

<script type="text/javascript">
var menuId = '${menuId}';
var upMenuId = '${upMenuId}';
var subMenuId = '${subMenuId}';
</script>


<script src="${pageContext.request.contextPath}/js/xerp/stm/cmm/stmcmm002/stmcmm002Sub.js"></script>

<!-- skip nav -->
<ul id="skip">
    <li><a href="#h_nav" tabindex="0">주메뉴 바로가기</a></li>
</ul>

<div class="wrap">
    <div class="header">
        <div class="h_top">
            <div class="h_left" style="">
                <h1><a href="${pageContext.request.contextPath}/stmcmm002/sub/view">X-ERP</a></h1>
            </div>
            <div class="h_nav gnb" id="h_nav">
                <ul class="nav_list">
                </ul>
            </div>
            <div class="user_div">
               <span class="username_icon"></span><span class="username_txt userNameTagArea"></span>
               <ul class="tempbt_ul">                   
                    <li><button title="레드마인 바로가기" id="btnRedmine" type="button"><img alt="레드마인 바로가기" src="${pageContext.request.contextPath}/img/redmine.png"></button></li>
                    <li><button title="샘플페이지 바로가기" class="setting" id="btnSamplePage" type="button"><span class="glyphicon glyphicon-sunglasses"></span></button></li>
                </ul>
            </div>
        </div>
        
    </div>
    
    <div class="h_bottom">
    
        <div class="leftMnu" id="leftMnu">
            <div class="menusearch_div">
                <ul class="menusearch_ul">
                    <li class="favorit_btn"><span class="star" id="favMenu" style="cursor: pointer;"></span></li>
                    <li class="menusearch_input"><input name="search" id="search_left" type="text" placeholder="메뉴검색" title="메뉴검색창"></li>
                    <li class="menusearch_btn"><div class="btn_search btn" title="메뉴검색버튼" onclick="clickBtn();"><i class="glyphicon glyphicon-search"></i></div></li>
                </ul>
            </div>
            <div class="l_navtitle">
                <span class="lnav_tit">사용자</span>
                <button class="lnav_btn" id="sidebar-toggle" type="button"><i class="axi axi-bars"></i></button>
            </div>
            <div class="lnav_div">
                <div class="lnav lnbmenu" id="subMenuList"></div>
            </div>
        </div> 
    
    
        <div class="tab_div">
            <div id="menuTabbars" style="width:100%; height:100%; overflow:auto; margin:0; padding:0;border:0px;display:none;">
            </div>
            <div id="menuTabbars_main" style="width:100%; height:100%; overflow:auto; margin:0; padding:0;border:0px;display:block;">
                <div style="width:100%; height:30px; margin:0; padding:0;border:0px; background:#fbfbfb;"></div>
                <center><br><br>여기에 메인 페이지 디자인</center> 
            </div>
            
            <div id="menuTabbars_btn" class="h_bt" style="display:block;">
                <ul class="topbt_ul">                   
                    <li title="로그아웃"><button title="로그아웃" class="logout" type="button"><i class="axi axi-ion-log-out" title="로그아웃" style="line-height:25px"></i><!--로그아웃--></button></li>
                    <li title="전체 탭 닫기"><button title="전체 탭 닫기" class="close" id="allClose" type="button"><i title="전체 탭 닫기" class="allclose_icon"></i></button></li>
                </ul>
            </div>
        </div>
    </div>

    
</div>

</body>
<!-- 
<script>
$(function() {
    $.fn.extend({
        left: function(){
            var ts = $(this);
            $.each(ts, function(i,o){
                $("button",o).on("click",faqHanddler);
                function faqHanddler(){
                     if($('.left').hasClass('left')){
                         $('.left').addClass('left_small');
                         $('.tab_div').addClass('tab_div_small');
                         $('.dhxtabbar_tabs_top').addClass('dhxtabbar_tabs_top_small');
                         //top.document.mhshrm001.location.reload();                                 
                      }else{
                    	  $('.tab_div').removeClass('tab_div_small');
                    	  $('.dhxtabbar_tabs_top').removeClass('dhxtabbar_tabs_top_small');
                    	  $('.left').removeClass('left_small');
                          //top.document.mhshrm001.location.reload();
                    }//if종료
                }//function faqHanddler 종료
            }); // each 종료
        } //function faq 종료
    }); //extend 종료
    $(".left").left();
});
</script>

 -->