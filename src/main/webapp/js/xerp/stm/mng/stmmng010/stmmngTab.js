/**
 *    프로그램       : 시스템환경관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.16
 *    사용테이블      : STM_ENV_SETTING
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/

/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmngTab();
    cf_SetComponentsStmmngTab();
    cf_SetEventListenerStmmngTab();
    cf_InitFormStmmngTab();
    cf_SetBindingStmmngTab();
    gf_IframeHeightResize(true);       
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamStmmngTab = function() {
	
	gf_SetMenuPath();
	
	var systemSettingTabbar = new dhtmlXTabBar("systemSettingTabbar");
	// add tab
	systemSettingTabbar.addTab("pds", "개발현황");
	systemSettingTabbar.addTab("day", "집계현황");
	systemSettingTabbar.addTab("week", "주간현황");
	// attachURL   
	systemSettingTabbar.tabs("pds").attachURL(gv_ContextPath+'/stmmng010/pds/view');
	systemSettingTabbar.tabs("day").attachURL(gv_ContextPath+'/stmmng010/day/view');	
	systemSettingTabbar.tabs("week").attachURL(gv_ContextPath+'/stmmng010/week/view');
	// initial active tab
	systemSettingTabbar.tabs("pds").setActive();	
};

var cf_SetComponentsStmmngTab = function() {};
var cf_SetEventListenerStmmngTab = function() {};
var cf_InitFormStmmngTab = function() {};
var cf_SetBindingStmmngTab = function() {};
