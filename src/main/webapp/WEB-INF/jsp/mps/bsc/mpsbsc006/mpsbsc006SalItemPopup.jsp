<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script>
   
    var dhxGridMpsbsc006Pop;  //pop그리드
    var dataInfo ;
    
    
    var cf_InitParamPopup = function (){
       gf_ComboCode('divComboSearchPopSalarytyCode', 'searchSalarytyCode', 'searchSalarytyCode', 'search', 'C062', '' , '', '', 'ordr', '','',''); //급여유형 
       gf_MakeComboBasic('divComboSearchPopSalaryitemCode','searchSalaryitemCode','search','width:100px','mpsbsc002/combo/searchComboMpsbsc002List',''); //급여항목 리스트 
       gf_ComboCode('divComboSearchPopPymntddcSe', 'searchPymntddcSe', 'searchPymntddcSe', 'search', 'C064', '' , '', '', 'ordr', '','',''); //지급공제구분 
       
    };
    
    
    var cf_SetComponentsMpsbsc006Popup = function() {
    	
        var dhxGridMpsbsc006PopHeaderInfo = [];
        dhxGridMpsbsc006PopHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
        dhxGridMpsbsc006PopHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc006Pop" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
        dhxGridMpsbsc006PopHeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '100', 'center', 'str', 'ro', false, 'salarytyCodeNm', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
        dhxGridMpsbsc006PopHeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '100', 'center', 'str', 'ro', false, 'salaryitemCode', '', ''));
        dhxGridMpsbsc006PopHeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '*', 'center', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
        dhxGridMpsbsc006PopHeaderInfo.push(gf_MakeDhxGridHeader('지급공제', '80', 'center', 'str', 'ro', false, 'pymntddcSeNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
        dhxGridMpsbsc006PopHeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '0', 'center', 'str', 'ro', true, 'salarytyCode', '', ''));
        
        
        dhxGridMpsbsc006Pop = gf_MakeDhxGrid('dataListMpsbsc006Pop', dhxGridMpsbsc006PopHeaderInfo, true, false, false);
        dhxGridMpsbsc006Pop.enableAutoWidth(true);
        
          	
    }
    var eventPopIds = [];
    var cf_SetEventListenerMpsbsc006Popup = function (){
    	
    	$('#checkAllMpsbsc006Pop').unbind('click').bind('click',function() {
            gf_errorMsgClear();
            gf_DhxCheckAllGridHeader(dhxGridMpsbsc006Pop, $('#checkAllMpsbsc006Pop').prop('checked'), 'chk');
        });
        
        $('#searchFormMpsbsc006Popup').unbind('keypress').bind('keypress', function(event){
            if(event.charCode == 13) { $('#btnSearchMpsbsc006Popup').click(); event.preventDefault(); }
        });
        $('#searchFormMpsbsc006Popup').unbind('keypress').bind('keypress', function(event){
            if(event.charCode == 13) { $('#btnSearchMpsbsc006Popup').click(); event.preventDefault(); }
        });
        
        $('#btnResetMpsbsc006Popup').unbind('click').bind('click',function() {
            cf_InitFormMpsbsc006Popup();
        });
        
        $('#btnSearchMpsbsc006Popup').unbind('click').bind('click', function(event){
        	fn_SearchMpsbsc006Pop();
        });
        
        $('#btnPopupConfirm').unbind('click').bind('click', function() {
            var selectedId = dhxGridMpsbsc006Pop.getSelectedRowId();
            fn_SelectedItem(selectedId);
        });

        $('#btnPopupClose').unbind('click').bind('click', function() {
            $('#bpopupMpsbsc006 .b-close').click();
        });
        
        dhxGridMpsbsc006Pop.attachEvent("onRowDblClicked", function(rId,cInd){
        	fn_SelectedItem(rId);
        });        
      
    };

    var cf_SetBindingMpsbsc006Pop = function() {
    	fn_SearchMpsbsc006Pop();
    };

    
    
    //초기화 함수 
    var cf_InitFormMpsbsc006Popup = function (){
//        $("#searchFormMpsbsc006Popup")[0].reset();
    };      
    
    var fn_SearchMpsbsc006Pop = function() {
    	var salarytyCodeList    = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'salarytyCode')).getValue();
        
        var jsonParameter = {
            salarytyCodeList : salarytyCodeList,
        };
        gf_Transaction(jsonParameter, 'mpsbsc006/searchNewItemListMpsbsc006', jsonParameter, 'fn_CallbackSearchMpsbsc006Pop', false, 'GET');
//         gf_Transaction(jsonParameter, 'mpsbsc006/searchMpsbsc006PopList', jsonParameter, 'fn_CallbackSearchMpsbsc006Pop', false, 'GET');
    };

    var fn_CallbackSearchMpsbsc006Pop = function(strSvcID, targetID, data) {
        dhxGridMpsbsc006Pop.clearAll();
       
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc006Pop');
            dhxGridMpsbsc006Pop.parse(data.data.records, 'js');
            dhxGridMpsbsc006Pop.selectRow(0);
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsbsc006Pop');
        }
        $('#spanCntMpsbsc006Pop').text(data.data.records.length);
        cf_SetEventListenerMpsbsc006();
    };    
    
    
    //값 선택 
    var fn_SelectedItem =function (){
    	
    	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsbsc006Pop, 'chk');
    	
    	if(gf_IsNull(rowIds)) {
            gf_DivMsgAlert('추가할 항목을 선택해 주세요.');
            return false;
        } else {
        	var obj = new Object();
			var exCnt = 0;
        	
        	dhxGridItemMpsbsc006.clearSelection();
        	dhxGridMpsbsc006Pop.forEachRow(function(rId) {
        		var cnt = 0;
        		if(dhxGridMpsbsc006Pop.cells(rId, gf_GetDhxGridColumId(dhxGridMpsbsc006Pop, 'chk')).isChecked()){
        			dhxGridItemMpsbsc006.forEachRow(function(id){
        				if(dhxGridMpsbsc006Pop.cells(rId, dhxGridMpsbsc006Pop.getColIndexById("salarytyCode")).getValue() 
						== dhxGridItemMpsbsc006.cells(id, dhxGridItemMpsbsc006.getColIndexById("salarytyCode")).getValue() 
    					  && dhxGridMpsbsc006Pop.cells(rId, dhxGridMpsbsc006Pop.getColIndexById("salaryitemCode")).getValue()
    					  == dhxGridItemMpsbsc006.cells(id, dhxGridItemMpsbsc006.getColIndexById("salaryitemCode")).getValue()){
        					cnt = 1;
        					return false;
        				}
        			});
        			
        			if(cnt > 0) exCnt += cnt;
    				else{
        				obj.salaryitemNm         = dhxGridMpsbsc006Pop.cells(rId, dhxGridMpsbsc006Pop.getColIndexById("salaryitemNm")).getValue(); 
                        obj.pymntddcSeNm         = dhxGridMpsbsc006Pop.cells(rId, dhxGridMpsbsc006Pop.getColIndexById("pymntddcSeNm")).getValue(); 
                        obj.salarytyCode         = dhxGridMpsbsc006Pop.cells(rId, dhxGridMpsbsc006Pop.getColIndexById("salarytyCode")).getValue(); 
                        obj.salarytyCodeNm       = dhxGridMpsbsc006Pop.cells(rId, dhxGridMpsbsc006Pop.getColIndexById("salarytyCodeNm")).getValue(); 
                        obj.salaryitemCode       = dhxGridMpsbsc006Pop.cells(rId, dhxGridMpsbsc006Pop.getColIndexById("salaryitemCode")).getValue();
                        obj.applcYm              = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), dhxGridMpsbsc006.getColIndexById('applcYm')).getValue();
                        obj.pymntSn              = dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), dhxGridMpsbsc006.getColIndexById('pymntSn')).getValue();
                        
                        dhxGridItemMpsbsc006.addRow(dhxGridItemMpsbsc006.uid(),['', obj.salarytyCodeNm,obj.salaryitemNm,'Y',obj.salaryitemCode,obj.salarytyCode,obj.applcYm,obj.pymntSn],0); //첫번째 행 축
        			}
        		}
            });
        	if(exCnt > 0) gf_DivMsgAlert('급여유형코드와 항목코드가 중복되는 '+exCnt+'개 항목은 제외되었습니다.');
//         	dhxGridItemMpsbsc006.selectRow(0);
        }
//         dhxGridStdMpsbsc006.addRow(dhxGridStdMpsbsc006.uid(),['','001','001','1',obj.salarytyCode,obj.salaryitemCode],0); //정규직, 전체 default 
//         dhxGridStdMpsbsc006.selectRow(0);
//         dhxGridStdMpsbsc006.setEditable (true);
        $('#bpopupMpsbsc006 .b-close').click();
    }
    
    $(function() {
        cf_InitParamPopup();
        cf_SetComponentsMpsbsc006Popup();
        cf_SetEventListenerMpsbsc006Popup();
        cf_SetBindingMpsbsc006Pop();
        cf_InitFormMpsbsc006Popup();
        
        
    });
    
    
    </script>
    <div class="pop-content">
    <div>
        <!-- search_box -->
<!--         <div class="search_box" style="clear: none"> -->
<!--             <table style="width: 100%; height: 20px; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;"> -->
<!--                 <tr> -->
<!--                     <td> -->
<!--                         <form id="searchFormMpsbsc006Popup"> -->
<!--                             <table style="border: none; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;"> -->
<!--                                 <tr style="border: none;"> -->
    
<!--                                     <th><label for="docmT">급여유형<taglibs:transText progrmId="default" key="titSalarytyCode"/></th> -->
<!--                                     <td><div id="divComboSearchPopSalarytyCode"></div></td> -->
<!--                                     <th><label for="docmT">급여항목<taglibs:transText progrmId="default" key="titSalaryitemCode"/></th> -->
<!--                                     <td><div id="divComboSearchPopSalaryitemCode"></div></td> -->
<!--                                     <th><label for="docmT">지급구분<taglibs:transText progrmId="default" key="titSalaryitemCode"/></th> -->
<!--                                     <td><div id="divComboSearchPopPymntddcSe"></div></td> -->
                                    
<!--                                 </tr> -->
<!--                             </table> -->
<!--                         </form> -->
<!--                     </td> -->
<!--                     <td style="border: none;"> -->
<!--                         <div class="btn" style="text-align: right; float: right; top: 6px; position: absolute; right: 0;"> -->
<!--                             <button type="button" id="btnSearchMpsbsc006Popup"> -->
<!--                                 <span class="glyphicon glyphicon-search f15 mr5"></span> -->
<!--                                                      조회<taglibs:transText progrmId="default" key="btnSearch"/> -->
<!--                             </button> -->
<!--                             <button type="button" id="btnResetMpsbsc006Popup"> -->
<!--                                 <span class="glyphicon glyphicon-refresh f15 mr5"></span> -->
<!--                                                      초기화<taglibs:transText progrmId="default" key="btnInit"/> -->
<!--                             </button> -->
<!--                         </div> -->
<!--                     </td> -->
<!--                 </tr> -->
<!--             </table> -->
<!--         </div> -->
        <!-- //search_box -->
        
            <div class="list_type01">
                <div class="list_top">
                    <span class="view"> 
                                총<!-- <taglibs:transText progrmId="default" key="titRdcnt"/> -->&nbsp;<span id="spanCntMpsbsc006Pop"></span>&nbsp;건<!-- <taglibs:transText progrmId="default" key="titSearchCnt"/> -->
                    </span>
                </div>
                <div id="dataListMpsbsc006Pop" style="width: 100%; height: 490px;"></div>
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