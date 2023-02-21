<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script>
   
    var dhxGridMpsbsc004Pop;  //pop그리드
    var dataInfo ;
    
    
    var cf_InitParamPopup = function (){
       gf_ComboCode('divComboSearchPopSalarytyCode', 'searchSalarytyCode', 'searchSalarytyCode', 'search', 'C062', '' , '', '', 'ordr', '','',''); //급여유형 
       gf_MakeComboBasic('divComboSearchPopSalaryitemCode','searchSalaryitemCode','search','width:100px','mpsbsc002/combo/searchComboMpsbsc002List',''); //급여항목 리스트 
       gf_ComboCode('divComboSearchPopPymntddcSe', 'searchPymntddcSe', 'searchPymntddcSe', 'search', 'C064', '' , '', '', 'ordr', '','',''); //지급공제구분 
       
    };
    
    
    var cf_SetComponentsMpsbsc004Popup = function() {
    	
        var dhxGridMpsbsc004PopHeaderInfo = [];
        dhxGridMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); 
        dhxGridMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '100', 'center', 'str', 'ro', false, 'salarytyCodeNm', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
        dhxGridMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '100', 'center', 'str', 'ro', false, 'salaryitemCode', '', ''));
        dhxGridMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '*', 'center', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
        dhxGridMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader('지급공제', '80', 'center', 'str', 'ro', false, 'pymntddcSeNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
        dhxGridMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '0', 'center', 'str', 'ro', true, 'salarytyCode', '', ''));
        
        
        dhxGridMpsbsc004Pop = gf_MakeDhxGrid('dataListMpsbsc004Pop', dhxGridMpsbsc004PopHeaderInfo, true, false, false);
        dhxGridMpsbsc004Pop.enableAutoWidth(true);
        
          	
    }
    var eventPopIds = [];
    var cf_SetEventListenerMpsbsc004Popup = function (){
        
        $('#searchFormMpsbsc004Popup').unbind('keypress').bind('keypress', function(event){
            if(event.charCode == 13) { $('#btnSearchMpsbsc004Popup').click(); event.preventDefault(); }
        });
        $('#searchFormMpsbsc004Popup').unbind('keypress').bind('keypress', function(event){
            if(event.charCode == 13) { $('#btnSearchMpsbsc004Popup').click(); event.preventDefault(); }
        });
        
        $('#btnResetMpsbsc004Popup').unbind('click').bind('click',function() {
            cf_InitFormMpsbsc004Popup();
        });
        
        $('#btnSearchMpsbsc004Popup').unbind('click').bind('click', function(event){
        	fn_SearchMpsbsc004Pop();
        });
        
        $('#btnPopupConfirm').unbind('click').bind('click', function() {
            var selectedId = dhxGridMpsbsc004Pop.getSelectedRowId();
            fn_SelectedItem(selectedId);
        });

        $('#btnPopupClose').unbind('click').bind('click', function() {
            $('#bpopupMpsbsc004 .b-close').click();
        });
        
        dhxGridMpsbsc004Pop.attachEvent("onRowDblClicked", function(rId,cInd){
        	fn_SelectedItem(rId);
        });        
      
    };

    var cf_SetBindingMpsbsc004Pop = function() {
    	fn_SearchMpsbsc004Pop();
    };

    
    
    //초기화 함수 
    var cf_InitFormMpsbsc004Popup = function (){
       $("#searchFormMpsbsc004Popup")[0].reset();
    };      
    

    var fn_SearchMpsbsc004Pop = function() {
        var jsonParameter = {
            salarytyCode : gf_FormGetValue('searchFormMpsbsc004Popup', 'searchSalarytyCode', 'combo'),
            salaryitemCode : gf_FormGetValue('searchFormMpsbsc004Popup', 'searchSalaryitemCode', 'combo'),
            pymntddcSe : gf_FormGetValue('searchFormMpsbsc004Popup', 'searchPymntddcSe', 'combo'),
        };
        gf_Transaction(jsonParameter, 'mpsbsc004/searchMpsbsc004PopList', jsonParameter, 'fn_CallbackSearchMpsbsc004Pop', false, 'GET');
    };

    var fn_CallbackSearchMpsbsc004Pop = function(strSvcID, targetID, data) {
        dhxGridMpsbsc004Pop.clearAll();
       
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc004Pop');
            dhxGridMpsbsc004Pop.parse(data.data.records, 'js');
            dhxGridMpsbsc004Pop.selectRow(0);
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsbsc004Pop');
        }
        $('#spanCntMpsbsc004Pop').text(data.data.records.length);
        cf_SetEventListenerMpsbsc004();
    };    
    
    
    //값 선택 
    var fn_SelectedItem =function (rId){
    	
    	var obj = new Object();
        obj.salaryitemNm         = dhxGridMpsbsc004Pop.cells(rId, dhxGridMpsbsc004Pop.getColIndexById("salaryitemNm")).getValue(); 
        obj.pymntddcSeNm         = dhxGridMpsbsc004Pop.cells(rId, dhxGridMpsbsc004Pop.getColIndexById("pymntddcSeNm")).getValue(); 
    	obj.salarytyCode         = dhxGridMpsbsc004Pop.cells(rId, dhxGridMpsbsc004Pop.getColIndexById("salarytyCode")).getValue(); 
    	obj.salarytyCodeNm       = dhxGridMpsbsc004Pop.cells(rId, dhxGridMpsbsc004Pop.getColIndexById("salarytyCodeNm")).getValue(); 
    	obj.salaryitemCode       = dhxGridMpsbsc004Pop.cells(rId, dhxGridMpsbsc004Pop.getColIndexById("salaryitemCode")).getValue(); 
    	    	
    	dhxGridMpsbsc004.clearSelection();
    	
        dhxGridMpsbsc004.addRow(dhxGridMpsbsc004.uid(),['', obj.salarytyCodeNm,obj.salaryitemNm,obj.pymntddcSeNm,'Y',obj.salarytyCode,obj.salaryitemCode],0); //첫번째 행 축 
        dhxGridMpsbsc004.selectRow(0);
        
        dhxGridStdMpsbsc004.clearAll();
        
//         dhxGridStdMpsbsc004.addRow(dhxGridStdMpsbsc004.uid(),['','001','001','1',obj.salarytyCode,obj.salaryitemCode],0); //정규직, 전체 default 
//         dhxGridStdMpsbsc004.selectRow(0);
//         dhxGridStdMpsbsc004.setEditable (true);
        
        
        dhxGridCalcMpsbsc004.clearAll();
        
        $('#bpopupMpsbsc004 .b-close').click();
    	
    }
    
    $(function() {
        cf_InitParamPopup();
        cf_SetComponentsMpsbsc004Popup();
        cf_SetEventListenerMpsbsc004Popup();
        cf_SetBindingMpsbsc004Pop();
        cf_InitFormMpsbsc004Popup();
        
        
    });
    
    
    </script>
    <div class="pop-content">
    <div>
        <!-- search_box -->
        <div class="search_box" style="clear: none">
            <table style="width: 100%; height: 20px; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
                <tr>
                    <td>
                        <form id="searchFormMpsbsc004Popup">
                            <table style="border: none; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
                                <tr style="border: none;">
    
                                    <th><label for="docmT">급여유형<!-- <taglibs:transText progrmId="default" key="titSalarytyCode"/> --></th>
                                    <td><div id="divComboSearchPopSalarytyCode"></div></td>
                                    <th><label for="docmT">급여항목<!-- <taglibs:transText progrmId="default" key="titSalaryitemCode"/> --></th>
                                    <td><div id="divComboSearchPopSalaryitemCode"></div></td>
                                    <th><label for="docmT">지급구분<!-- <taglibs:transText progrmId="default" key="titSalaryitemCode"/> --></th>
                                    <td><div id="divComboSearchPopPymntddcSe"></div></td>
                                    
                                </tr>
                            </table>
                        </form>
                    </td>
                    <td style="border: none;">
                        <div class="btn" style="text-align: right; float: right; top: 6px; position: absolute; right: 0;">
                            <button type="button" id="btnSearchMpsbsc004Popup">
                                <span class="glyphicon glyphicon-search f15 mr5"></span>
                                                     조회<!-- <taglibs:transText progrmId="default" key="btnSearch"/> -->
                            </button>
                            <button type="button" id="btnResetMpsbsc004Popup">
                                <span class="glyphicon glyphicon-refresh f15 mr5"></span>
                                                     초기화<!-- <taglibs:transText progrmId="default" key="btnInit"/> -->
                            </button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <!-- //search_box -->
        
            <div class="list_type01">
                <div class="list_top">
                    <span class="view"> 
                                총<!-- <taglibs:transText progrmId="default" key="titRdcnt"/> -->&nbsp;<span id="spanCntMpsbsc004Pop"></span>&nbsp;건<!-- <taglibs:transText progrmId="default" key="titSearchCnt"/> -->
                    </span>
                </div>
                <div id="dataListMpsbsc004Pop" style="width: 100%; height: 690px;"></div>
                <div class="popup_footer_box">
                    <button type="button" id="btnPopupConfirm" name="btnPopupConfirm">
                          <span class="glyphicon glyphicon-ok f15 mr5"></span>확인<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                    </button>
                    <button type="button" id="btnPopupClose" name="btnPopupClose">
                          <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                    </button>
                </div>                
        </div>
        </div>
    </div>
</body>