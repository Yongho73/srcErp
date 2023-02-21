<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script>
    var dhxGridMfsbsc007Pop;  //pop그리드
    var dataInfo ;
    
    var cf_InitParamPopup = function (){
       
    };
    
    var cf_SetComponentsMfsbsc007Popup = function() {
    	
        var dhxGridMfsbsc007PopHeaderInfo = [];
        dhxGridMfsbsc007PopHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'rnum', '', '')); /* 번호 */
        dhxGridMfsbsc007PopHeaderInfo.push(gf_MakeDhxGridHeader('관리항목번호', '100', 'center', 'str', 'ro', false, 'mgrtItemSn', '', '')); /* gf_LocaleTrans('default', 'titMgrtItemSn') */
        dhxGridMfsbsc007PopHeaderInfo.push(gf_MakeDhxGridHeader('관리항목명', '*', 'center', 'str', 'ro', false, 'mgrtItemNm', '', '')); /* gf_LocaleTrans('default', 'titMgrtItemNm') */
        dhxGridMfsbsc007PopHeaderInfo.push(gf_MakeDhxGridHeader('입력구분', '100', 'center', 'str', 'coro', false, 'inputSeCode', '', '')); /* gf_LocaleTrans('default', 'titInputSeCode') */
        
        dhxGridMfsbsc007Pop = gf_MakeDhxGrid('dataListMfsbsc007Pop', dhxGridMfsbsc007PopHeaderInfo, true, false, false);
        dhxGridMfsbsc007Pop.enableAutoWidth(true);
        dhxGridMfsbsc007Pop.setEditable (false);
        
        //입력방식 
        var jsonParameter = {codekindCode : "C168",exceptCode :"",sortOrder :"ordr" };  
        var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
        gf_ComboDataSet(dhxGridMfsbsc007Pop, dhxGridMfsbsc007Pop.getColIndexById("inputSeCode"), dataSource.data); /* 그리드콤보*/
        
    }
    var eventPopIds = [];
    var cf_SetEventListenerMfsbsc007Popup = function (){
        
        $('#searchFormMfsbsc007Popup').unbind('keypress').bind('keypress', function(event){
            if(event.charCode == 13) { $('#btnSearchMfsbsc007Popup').click(); event.preventDefault(); }
        });
        
        $('#btnResetMfsbsc007Popup').unbind('click').bind('click',function() {
            cf_InitFormMfsbsc007Popup();
        });
        
        $('#btnSearchMfsbsc007Popup').unbind('click').bind('click', function(event){
        	fn_SearchMfsbsc007Pop();
        });
        
        $('#btnPopupOk').unbind('click').bind('click', function() {
            var selectedId = dhxGridMfsbsc007Pop.getSelectedRowId();
            fn_SelectedItem(selectedId);
        });

        $('#btnPopupClose').unbind('click').bind('click', function() {
            $('#bpopupMfsbsc007 .b-close').click();
        });
        
        dhxGridMfsbsc007Pop.attachEvent("onRowDblClicked", function(rId,cInd){
        	fn_SelectedItem(rId);
        });        
      
    };

    var cf_SetBindingMfsbsc007Pop = function() {
    	fn_SearchMfsbsc007Pop();
    };

    
    
    //초기화 함수 
    var cf_InitFormMfsbsc007Popup = function (){
       $("#searchFormMfsbsc007Popup")[0].reset();
    };      
    

    var fn_SearchMfsbsc007Pop = function() {
        var jsonParameter = {
        		mgrtItemNm : gf_FormGetValue('searchFormMfsbsc007Popup', 'mgrtItemNm', 'text'),
        	    useAt : '1',
                pageingCnt :10,
                pageNum : 10
                
        };
        gf_Transaction(jsonParameter, 'mfsbsc006/searchAllMfsbsc006', jsonParameter, 'fn_CallbackSearchMfsbsc007Pop', false, 'GET');
    };

    var fn_CallbackSearchMfsbsc007Pop = function(strSvcID, targetID, data) {
        dhxGridMfsbsc007Pop.clearAll();
       
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMfsbsc007Pop');
            dhxGridMfsbsc007Pop.parse(data.data.records, 'js');
            dhxGridMfsbsc007Pop.selectRow(0);
        } else {
            gf_NoFoundDataOnGridMsg('dataListMfsbsc007Pop');
        }
        $('#spanCntMfsbsc007Pop').text(data.data.records.length);
        cf_SetEventListenerMfsbsc007();
    };    
    
    
    //값 선택 
    var fn_SelectedItem =function (rId){
    	
    	 if(!gf_IsNull(rId)){
        	var obj = new Object();
            obj.mgrtItemSn         = dhxGridMfsbsc007Pop.cells(rId, dhxGridMfsbsc007Pop.getColIndexById("mgrtItemSn")).getValue(); 
            obj.mgrtItemNm         = dhxGridMfsbsc007Pop.cells(rId, dhxGridMfsbsc007Pop.getColIndexById("mgrtItemNm")).getValue(); 
        	obj.inputSeCode        = dhxGridMfsbsc007Pop.cells(rId, dhxGridMfsbsc007Pop.getColIndexById("inputSeCode")).getValue(); 
        	
        	dhxGridMfsbsc007sub.cells(dhxGridMfsbsc007sub.getSelectedRowId(),dhxGridMfsbsc007sub.getColIndexById("mgrtItemSn")).setValue(obj.mgrtItemSn);
        	dhxGridMfsbsc007sub.cells(dhxGridMfsbsc007sub.getSelectedRowId(),dhxGridMfsbsc007sub.getColIndexById("mgrtItemNm")).setValue(obj.mgrtItemNm);
        	dhxGridMfsbsc007sub.cells(dhxGridMfsbsc007sub.getSelectedRowId(),dhxGridMfsbsc007sub.getColIndexById("inputSeCode")).setValue(obj.inputSeCode);
            
    	 }
        $('#bpopupMfsbsc007 .b-close').click();
    	
    }
    
    $(function() {
        cf_InitParamPopup();
        cf_SetComponentsMfsbsc007Popup();
        cf_SetEventListenerMfsbsc007Popup();
        cf_SetBindingMfsbsc007Pop();
        cf_InitFormMfsbsc007Popup();
        
        
    });
    
    
    </script>
    
<div class="pop-content">    
    <div>
        <div class="search_box" id="searchFormMfsbsc007Popup1">
            <form id="searchFormMfsbsc007Popup">
            <table>
            <tr>
                <th><label for="docmT">관리항목명</label>
                </th>
                <td>
                <input hidden="hidden" />
                <input type="text" id="mgrtItemNm" name="mgrtItemNm" class="w390 ml5" maxlength="20" style="width: 125px;"/>
                </td>
                </td>
                <td>
                    <div class="btn" style="text-align:right;float:right;top:5px;right:0;">
                        <button type="button" id="searchFormMfsbsc007Popup" name="searchFormMfsbsc007Popup">
                            <span class="glyphicon glyphicon-search f15 mr5"></span><taglibs:transText progrmId="default" key="btnSearch" />
                         </button>
                         <button type="button" id="btnResetMfsbsc007Popup" name="btnResetMfsbsc007Popup">
                            <span class="glyphicon glyphicon-refresh f15 mr5"></span><taglibs:transText progrmId="default" key="btnInit" />
                         </button>
                    </div>
                </td>
                
            </tr>
            
            </table>
            </form>  
        </div>
        
        <div>
            <div class="list_top">
                <span class="view ">
                    <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCntPopup"></span>
                    <taglibs:transText progrmId="default" key="titSearchCnt" />
                </span>
            </div>
            <div>
                <div id="dataListMfsbsc007Pop" style="width: 100%; height: 335px"></div>
            </div>
            
            <div class="popup_footer_box">
                <button type="button" id="btnPopupOk" name="btnPopupOk">
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
   