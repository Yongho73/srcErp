<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	
	var prtcpntEmpnoPop = '';
	var acmsltStdrDePop = '';
	var prtcpntNmPop = '';
	var monthDePop = '';
	var dhxGridPjtpmg005Popup;  //그리드 객체
	
	var cf_InitParamPjtHnfPop = function (){
		
		prtcpntEmpnoPop = $("#hnfProjectPopup").attr("prtcpntEmpno");
		prtcpntNmPop = $("#hnfProjectPopup").attr("prtcpntNm");
        acmsltStdrDePop = $("#hnfProjectPopup").attr("acmsltStdrDe");
        monthDePop = $("#hnfProjectPopup").attr("monthDe");

        fn_SearchPjtpmg005Popup();
		
	};
	var cf_SetComponentsPjtHnfPop = function (){
		var dhxGridPjtpmg005HeaderInfoPopup = [];
		dhxGridPjtpmg005HeaderInfoPopup.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
		dhxGridPjtpmg005HeaderInfoPopup.push(gf_MakeDhxGridHeader('프로젝트명', '*', 'left', 'str', 'ro', false, 'projectNm', '', ''));
		dhxGridPjtpmg005HeaderInfoPopup.push(gf_MakeDhxGridHeader('투입M/M', '80', 'center', 'str', 'ro', false, 'partcptnManMonth', '', ''));
		dhxGridPjtpmg005HeaderInfoPopup.push(gf_MakeDhxGridHeader('투입월', '200', 'left', 'str', 'ro', false, 'acmsltStdrDe', '', ''));
		dhxGridPjtpmg005HeaderInfoPopup.push(gf_MakeDhxGridHeader('직책', '200', 'left', 'str', 'ro', true, 'prtcpntClsf', '', ''));
	    dhxGridPjtpmg005Popup = gf_MakeDhxGrid('dataListPjtpmg005Popup', dhxGridPjtpmg005HeaderInfoPopup, true, false, false);
	    dhxGridPjtpmg005Popup.enableAutoWidth(true);
	    dhxGridPjtpmg005Popup.setEditable(false); 

	    dhxGridPjtpmg005Popup.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
	    return true;
	};
	
	var cf_SetEventListenerPjtHnfPop = function (){
	    
	    // button event ========--------  
	     $('#btnApprovPopupClose').unbind('click').bind('click', function(){
	    	 $('#hnfProjectPopup .b-close').click(); 
         });
	};

	var cf_SetBindingPjtHnfPop = function (){
		
	};

	var cf_InitFormPjtHnfPop = function (){
	    
	};
	
	/**
     * 조회
     */
    var fn_SearchPjtpmg005Popup = function(userId) {
        var jsonParameter = {
                prtcpntEmpno : prtcpntEmpnoPop,
                acmsltStdrDe : acmsltStdrDePop,
                monthDe : monthDePop
        };
        gf_Transaction(userId, 'pjtpmg005/findPjtpmg005', jsonParameter, 'fn_CallbackSearchPjtpmg005Popup', false, 'GET');
    };

    var fn_CallbackSearchPjtpmg005Popup = function(strSvcID, targetID, data) {
        dhxGridPjtpmg005Popup.clearAll(); 
           
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPjtpmg005Popup');
            dhxGridPjtpmg005Popup.parse(data.data.records, 'js');
            dhxGridPjtpmg005Popup.selectRow(0);
            
            var clsf =  dhxGridPjtpmg005Popup.cells(1,dhxGridPjtpmg005Popup.getColIndexById("prtcpntClsf")).getValue()
            
            if(!gf_IsNull(monthDePop)){
            	$("#titleEmpnm").text(prtcpntNmPop + " " + clsf + " (" + prtcpntEmpnoPop + ") / " + acmsltStdrDePop + "년 " + monthDePop + "월");
            } else{
            	$("#titleEmpnm").text(prtcpntNmPop + " " + clsf + " (" + prtcpntEmpnoPop + ")");
            }
            
            
        } else {
            gf_NoFoundDataOnGridMsg('dataListPjtpmg005Popup');
        }
        //$('#spanCntMfsbsc007Pop').text(data.data.records.length);
        cf_SetEventListenerPjtHnfPop();
    };
 
	$(function() {
	    cf_InitParamPjtHnfPop();
	    cf_SetComponentsPjtHnfPop();
	    cf_SetEventListenerPjtHnfPop();
	    cf_SetBindingPjtHnfPop();
	    cf_InitFormPjtHnfPop();
	});	

    </script>
    
    <div class="pop-content">  
        <div>        
        
        <h2 style="margin-left: 2px; margin-top: 5px;">
            <span id="titleEmpnm" style="text-align: center;font-size:23px;color:#1e5ca0;"></span>
        </h2>

            
        <div style="margin-top: 20px;">
    
            <div>
                <div id="dataListPjtpmg005Popup" style="width: 100%; height: 200px;"></div>
            </div>

            <div class="popup_footer_box">
                <button type="button" id="btnApprovPopupClose" name="btnApprovPopupClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
            </div>
        </div>
        </div>
	</div>
</body>
