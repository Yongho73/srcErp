<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>

    <script>
    var paramEmpno = '${empno}';
    var paramEmpnm = '${empnm}';
    var paramFullBeginYear = '${beginYear}';
    var paramBeginYear = paramFullBeginYear.split('-');
    var dhxGridAltHvofPopupPubwks003;
//     console.log(paramBeginYear);    
//     console.log(paramEmpno);
//     console.log(paramEmpnm);
    var cf_SetComponentsAltHvofDePopup = function(){
        var dhxGridAltHvofPopupPubwks003HeaderInfo = [];
        dhxGridAltHvofPopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', '')); 
        dhxGridAltHvofPopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('휴가순번', '*', 'center', 'str', 'ro', false, 'vacSn', '', ''));
        dhxGridAltHvofPopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('발생일자', '100', 'center', 'str', 'ro', false, 'vacOccrrncDe', '', ''));
        dhxGridAltHvofPopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('시간', '100', 'center', 'str', 'ro', false, '', '', ''));
        dhxGridAltHvofPopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ro', false, 'vacSttusNm', '', ''));
		
        dhxGridAltHvofPopupPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ro', true, 'vacSttus', '', ''));

        dhxGridAltHvofPopupPubwks003 = gf_MakeDhxGrid('dataListAltHvofPopupPubwks003', dhxGridAltHvofPopupPubwks003HeaderInfo, true, false, false);
        dhxGridAltHvofPopupPubwks003.enableAutoWidth(false);
        dhxGridAltHvofPopupPubwks003.setEditable(false);

//         dhxGridAltHvofPopupPubwks003.setColumnMinWidth(60,10); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
        //검색
        gf_ComboCode('divAltHvofVacSttus', 'searchAltHvofVacSttus', 'searchAltHvofVacSttus', 'search', 'C217', '' , '', '', 'ordr', '');//휴직구분
    }
    
    var cf_InitParamAltHvofDePopup = function(){
    	gf_FormSetValue('searchFormAltHvofDePopup', 'altHvofEmpno', paramEmpno , 'text');
    	gf_FormSetValue('searchFormAltHvofDePopup', 'altHvofEmpnm', paramEmpnm , 'text');
    	gf_FormSetValue('searchFormAltHvofDePopup', 'altHvofYear', paramBeginYear[0] , 'text');
    }
    
    var cf_SetEventListenerAltHvofDePopup = function(){
	   $('#btnAltHvofDePopupApply').unbind('click').bind('click', function(event){
		   
	   });
       $('#btnAltHvofDePopupClose').unbind('click').bind('click', function(event){
    	   $('#altHvofDePop .b-close').click();
       });
       $('#btnAltHvofDePopupSearch').unbind('click').bind('click', function(event){
    	   fn_SearchAltHvofDe();
       });
    }
    
    var fn_SearchAltHvofDe = function(){
    	if(gf_IsNull(paramEmpno) || gf_IsNull(paramEmpnm) || gf_IsNull(paramBeginYear[0]) ){
    		gf_DivMsgAlert("팝업 매개변수 확인 필요");
    	}
    	else{
    		var jsonParameterForSearchHvofDe = {
    			empno : paramEmpno,
    			vacOccrrncYy : paramBeginYear[0],
    			vacSttus : gf_FormGetValue('searchFormAltHvofDePopup', 'searchAltHvofVacSttus', 'combo')
    		}
    		gf_Transaction('', 'pubwks003/searchAltRewardHvofDePubwks003', jsonParameterForSearchHvofDe, 'fn_CallbackSearchGridListAltHvof', false, 'GET'); 
    	}
    }
    
    var fn_CallbackSearchGridListAltHvof = function(strSvcID, targetID, data){
    	dhxGridAltHvofPopupPubwks003.clearAll();
        if(!gf_IsNull(data.data.records)){
        	dhxGridAltHvofPopupPubwks003.parse(data.data.records, 'js');
            gf_NoFoundDataOnGridMsgRemove('dataListAltHvofPopupPubwks003');
        } else {
            //gf_DivMsgAlert(gv_MsgNoData);
            gf_NoFoundDataOnGridMsg('dataListAltHvofPopupPubwks003'); 
        }
        $("#spanCntEmp").text(gf_NumberWithCommas(data.data.records.length));
    }
    
    $(function() {
        cf_SetComponentsAltHvofDePopup();
        cf_InitParamAltHvofDePopup();
        cf_SetEventListenerAltHvofDePopup();
        fn_SearchAltHvofDe();
    });
    </script>
    <div class="pop-content">
        <div class="path_div">
        </div>
        <form id="searchFormAltHvofDePopup">
            <div class="consearch_div_in">
                <div class="consearch_input">
                        <ul class="consearchinput_list">
                            <li><span class="span">사원번호</span><input disabled="disabled" name="altHvofEmpno" id="altHvofEmpnoPubwks003" class="w70"></li>
                            <li><span class="span">성명</span><input disabled="disabled" name="altHvofEmpnm" id="altHvofEmpnmPubwks003" class="w70"></li>
                            <li><span class="span">년도</span><input disabled="disabled" name="altHvofYear" id="altHvofYearPubwks003" class="w70"></li>
                        </ul>
                </div>
            </div>
            <div class="consearch_div_in">
                <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span">사용구분</span><div id="divAltHvofVacSttus" class="div_combo"></div>
                        </li>
                    </ul>
                </div>
                <div class="consearchbt_div_in">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnAltHvofDePopupSearch"><span
                                    class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    </ul>
                </div>
            </div>
        </form>
        <div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntEmp"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div>
                <div class="div_liner" id="dataListAltHvofPopupPubwks003" style="width: 100%; height: 260px;"></div>
            </div>
            <div class="popup_footer_box">
                <button type="button" id="btnAltHvofDePopupApply" name="btnAltHvofDePopupApply">
                    <span class="glyphicon glyphicon-ok f15 mr5"></span>적용<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                </button>
                <button type="button" id="btnAltHvofDePopupClose" name="btnAltHvofDePopupClose">
                    <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
            </div>
        </div>
    </div>
</body>