<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>

    <script>
    var paramEmpno = '${empno}';
    var paramEmpnm = '${empnm}';
    var paramFullBeginYear = '${beginYear}';
    var paramBeginYear = paramFullBeginYear.split('-');
    var dhxGridRewardHvofPopupPubwks003;
    var dhxGridRewardHvofUsePopupPubwks003;
    var cf_SetComponentsRewardHvofDePopup = function(){
        var dhxGridRewardHvofPopupPubwks003HeaderInfo = [];
        dhxGridRewardHvofPopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', '')); 
        dhxGridRewardHvofPopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('발생일자', '*', 'center', 'str', 'ro', false, 'vacOccrrncDe', '', ''));
        dhxGridRewardHvofPopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('시간', '100', 'center', 'str', 'ro', false, 'RewardvacTime', '', ''));
        dhxGridRewardHvofPopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('근태구분', '130', 'center', 'str', 'ro', false, '', '', ''));

        dhxGridRewardHvofPopupPubwks003 = gf_MakeDhxGrid('dataListRewardHvofPopupPubwks003', dhxGridRewardHvofPopupPubwks003HeaderInfo, true, false, false);
        dhxGridRewardHvofPopupPubwks003.enableAutoWidth(false);
        dhxGridRewardHvofPopupPubwks003.setEditable(false);
        dhxGridRewardHvofPopupPubwks003.attachFooter("합계,,#stat_total,");
        
        var dhxGridRewardHvofUsePopupPubwks003HeaderInfo = [];
        dhxGridRewardHvofUsePopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', '')); 
        dhxGridRewardHvofUsePopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('사용일자', '*', 'center', 'str', 'ro', false, 'vacOccrrncDe', '', ''));
        dhxGridRewardHvofUsePopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('사용시간', '100', 'center', 'str', 'ro', false, 'RewardvacTime', '', ''));
        dhxGridRewardHvofUsePopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('잔여시간', '130', 'center', 'str', 'ro', false, '', '', ''));

        dhxGridRewardHvofUsePopupPubwks003 = gf_MakeDhxGrid('dataListRewardHvofUsePopupPubwks003', dhxGridRewardHvofUsePopupPubwks003HeaderInfo, true, false, false);
        dhxGridRewardHvofUsePopupPubwks003.enableAutoWidth(false);
        dhxGridRewardHvofUsePopupPubwks003.setEditable(false);
        dhxGridRewardHvofUsePopupPubwks003.attachFooter("합계,,#stat_total,#stat_total");
    }
    
    var cf_InitParamRewardHvofDePopup = function(){
        gf_FormSetValue('searchFormRewardHvofDePopup', 'rewardHvofEmpno', paramEmpno , 'text');
        gf_FormSetValue('searchFormRewardHvofDePopup', 'rewardHvofEmpnm', paramEmpnm , 'text');
        gf_FormSetValue('searchFormRewardHvofDePopup', 'rewardHvofYear', paramBeginYear[0] , 'text');
    }
    
    var cf_SetEventListenerRewardHvofDePopup = function(){
       $('#btnRewardHvofDePopupClose').unbind('click').bind('click', function(event){
    	   $('#rewardHvofDePop .b-close').click();
       });

    }
    
    $(function() {
        cf_SetComponentsRewardHvofDePopup();
        cf_InitParamRewardHvofDePopup();
        cf_SetEventListenerRewardHvofDePopup();
    });
    </script>
    <div class="pop-content">
        <div class="path_div">
        </div>
        <form id="searchFormRewardHvofDePopup">
            <div class="consearch_div_in">
                <div class="consearch_input">
                        <ul class="consearchinput_list">
                            <li><span class="span">사원번호</span><input disabled="disabled" name="rewardHvofEmpno" id="rewardHvofEmpnoPubwks003" class="w70"></li>
                            <li><span class="span">성명</span><input disabled="disabled" name="rewardHvofEmpnm" id="rewardHvofEmpnmPubwks003" class="w70"></li>
                            <li><span class="span">년도</span><input disabled="disabled" name="rewardHvofYear" id="rewardHvofYearPubwks003" class="w70"></li>
                        </ul>
                </div>
            </div>
            <div class="consearch_div_in">
                <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span">근태구분</span><div id="divRewardHvofVacSttus" class="div_combo"></div>
                        </li>
                    </ul>
                </div>
                <div class="consearchbt_div_in">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnRewardHvofDePopupSearch"><span
                                    class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    </ul>
                </div>
            </div>
        </form>
        <div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCnt"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div>
                <div class="div_liner" id="dataListRewardHvofPopupPubwks003" style="width: 100%; height: 100px;"></div>
            </div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanUseCnt"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div>
                <div class="div_liner" id="dataListRewardHvofUsePopupPubwks003" style="width: 100%; height: 100px;"></div>
            </div>
            <div class="popup_footer_box">
                <button type="button" id="btnRewardHvofDePopupClose" name="btnRewardHvofDePopupClose">
                    <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
            </div>
        </div>
    </div>
</body>