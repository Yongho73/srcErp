<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>

    <script>
    var cf_SetComponentsPopup = function(){
    	
    }
    
    var cf_InitParamPopup = function(){
    	$("#saveReturnResnPopMhshrb002").validate({ errorElement: 'div', ignore: '' });
    }
    
    var cf_SetEventListenerMhshrb002Popup = function(){
	   $('#btnReturnResnPopFormPrgSave').unbind('click').bind('click', function(event){
		    if($("#saveReturnResnPopMhshrb002").validate().form()){
		    	fn_SaveMhshrb003(gf_FormGetValue('saveReturnResnPopMhshrb002', 'returnResn', 'text'));
		    }
	   });
       $('#btnReturnResnPopupPrgClose').unbind('click').bind('click', function(event){
    	   $('#returnResn .b-close').click();
       });
       $('#saveReturnResnPopMhshrb002 div.error').unbind("click").bind("click",function() {
           $(this).remove();
       });
    }
    
    $(function() {
        cf_SetComponentsPopup();
        cf_InitParamPopup();
        cf_SetEventListenerMhshrb002Popup();
    });
    </script>
    <div class="pop-content">
    <div>
        <div class="detail_type01">
            <form id="saveReturnResnPopMhshrb002" autocomplete="off">
                <table>
                    <colgroup>
                        <col width="80">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">반려 사유</th>
                        <td colspan="1"><input type="text" name="returnResn" id="returnResnSavePopMhshrb002" maxlength="500" style="width: 99%" required/></td>
                    </tr>
                </table>
                <div class="popup_footer_box">
                    <button type="button" id="btnReturnResnPopFormPrgSave" name="btnPopFormPrgSave">
                          <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span><taglibs:transText progrmId="default" key="btnSave" />
                    </button>
                    <button type="button" id="btnReturnResnPopupPrgClose" name="btnPopupPrgClose">
                          <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                    </button>
                </div>
            </form>                
        </div>
        </div>
    </div>
</body>