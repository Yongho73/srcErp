<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script>
   
    var dhxGridMpsbsc004Pop;  //pop그리드
    var dataInfo ;
    
    
    var cf_InitParamPopup = function (){
    	gf_CheckCode('divSalarytyCode', 'salarytyCode', 'C062',  '', 'ordr', ''); // 모듈
    };
    
    var cf_SetEventListenerMpsbsc006Popup = function (){
        
        //확인
        $('#btnPopupConfirm').unbind('click').bind('click', function() {
            if($("input[name=salarytyCode]").is(":checked") == false) {
            	gf_DivMsgAlert("급여유형을 선택하세요.");
                return false;
            } 
            fn_SelectedItem();
        });

        //닫기
        $('#btnPopupClose').unbind('click').bind('click', function() {
            $('#bpopupSalaryTypeMpsbsc006 .b-close').click();
        });
    };
    
    //값 선택 
    var fn_SelectedItem =function (){
        var salaryArray = $("input:checkbox:checked").map(function(){
            return $(this).val();
        }).get().join();
        
        var salaryArrayText = $("input:checkbox:checked").map(function(){
            return $(this).next().text();
        }).get().join();
        
        dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'salarytyCode')).setValue(salaryArray);
        dhxGridMpsbsc006.cells(dhxGridMpsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc006,'salarytyCodeNm')).setValue(salaryArrayText);

        
        fn_SearchNewPayItemMpsbsc006(); //급여항목조회
        
        $('#bpopupSalaryTypeMpsbsc006 .b-close').click();
    }
    
    $(function() {
        cf_InitParamPopup();
        cf_SetEventListenerMpsbsc006Popup();
    });
    
    
    </script>
    <div class="pop-content">
    <div>
        <!-- search_box -->
        <div class="search_box" style="clear: none">
            <table style="width: 100%; height: 20px; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
                <tr>
                    <td>
                    </td>
                </tr>
            </table>
        </div>
        <!-- //search_box -->
        
            <div class="list_type01">
                <table style="width: 100%; height: 20px; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
                    <tr>
                        <th>급여유형</th>
                        <td><div id="divSalarytyCode"></div></td>                    
                    </tr>
                </table>            
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