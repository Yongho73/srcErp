<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>

    <script>
    var type = '${type}';
    var cf_SetComponentsPopup = function(){
    	
    }
    
    var cf_InitParamPopup = function(){
    	$("#saveReturnResnPopPubwks020").validate({ errorElement: 'div', ignore: '' });
    }
    
    var cf_SetEventListenerReturnResn = function(){
	   $('#btnReturnResnPopFormPrgSave').unbind('click').bind('click', function(event){
		    if($("#saveReturnResnPopPubwks020").validate().form()){
		    	if(gf_IsNull(type)){                             // 일괄 반려
    		    	fn_ConfmSttusUpdate('return' , '' , gf_FormGetValue('saveReturnResnPopPubwks020', 'returnResn', 'text'));
		    	}
		    	else if(type == "single" && !gf_IsNull(type)){   // 개별 반려
		    		fn_ConfmSttusUpdate('return' , 'single' , gf_FormGetValue('saveReturnResnPopPubwks020', 'returnResn', 'text'));
		    	}
		    }
	   });
       $('#btnReturnResnPopupPrgClose').unbind('click').bind('click', function(event){
    	   $('#returnResn .b-close').click();
       });
       $('#saveReturnResnPopPubwks020 div.error').unbind("click").bind("click",function() {
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
            <form id="saveReturnResnPopPubwks020" autocomplete="off">
                <table>
                    <colgroup>
                        <col width="80">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">반려 사유</th>
                        <td colspan="1"><input type="text" name="returnResn" id="returnResnSavePopPubwks020" maxlength="500" style="width: 99%" required/></td>
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