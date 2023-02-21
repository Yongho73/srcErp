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
    cf_InitParamStmsysTab();
    cf_SetComponentsStmsysTab();
    cf_SetEventListenerStmsysTab();
    cf_InitFormStmsysTab();
    cf_SetBindingStmsysTab();
    gf_IframeHeightResize(true);       
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamStmsysTab = function() {
	
	gf_SetMenuPath();
	
	var systemSettingTabbar = new dhtmlXTabBar("systemSettingTabbar");
	// add tab
	systemSettingTabbar.addTab("sys", "시스템");
	systemSettingTabbar.addTab("ets", "전자결재");
	// attachURL   
	systemSettingTabbar.tabs("sys").attachURL(gv_ContextPath+'/stmsys001/sys/view');
	systemSettingTabbar.tabs("ets").attachURL(gv_ContextPath+'/stmsys001/ets/view');	
	// initial active tab
	systemSettingTabbar.tabs("sys").setActive();	
};

var cf_SetComponentsStmsysTab = function() {};
var cf_SetEventListenerStmsysTab = function() {};
var cf_InitFormStmsysTab = function() {};
var cf_SetBindingStmsysTab = function() {};
