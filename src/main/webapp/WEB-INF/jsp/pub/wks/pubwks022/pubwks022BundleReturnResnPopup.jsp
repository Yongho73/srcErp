<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>

    <script>
    var type = '${type}';
    var cf_SetComponentsPopup = function(){
    	
    }
    
    var cf_InitParamPopup = function(){
    	$("#saveReturnResnPopPubwks022").validate({ errorElement: 'div', ignore: '' });
    }
    
    var cf_SetEventListenerReturnResn = function(){
	   $('#btnReturnResnPopFormPrgSave').unbind('click').bind('click', function(event){
           if($("#saveReturnResnPopPubwks022").validate().form()){
        	   if(fn_EmpGridSttusValidation("003")){
            	   var returnResn = gf_FormGetValue('saveReturnResnPopPubwks022', 'returnResn', 'text');
            	   $('#returnResn .b-close').click();
            	   fn_BundelSttusRequest("return" , returnResn);
        	   }
           }
	   });
       $('#btnReturnResnPopupPrgClose').unbind('click').bind('click', function(event){
    	   $('#returnResn .b-close').click();
       });
       $('#saveReturnResnPopPubwks022 div.error').unbind("click").bind("click",function() {
           $(this).remove();
       });
    }
    
    $(function() {
        cf_SetComponentsPopup();
        cf_InitParamPopup();
        cf_SetEventListenerReturnResn();
    });
    </script>
    <div class="pop-content">
    <div>
        <div class="detail_type01">
            <form id="saveReturnResnPopPubwks022" autocomplete="off">
                <table>
                    <colgroup>
                        <col width="80">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">반려 사유</th>
                        <td colspan="1"><input type="text" name="returnResn" id="returnResnSavePopPubwks022" maxlength="500" style="width: 99%" required/></td>
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