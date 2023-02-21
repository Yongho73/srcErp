<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>

    <script>
    var bundlePopEmpno = '${paramEmpno}';
    var bundlePopHvofYm = '${paramHvofYm}';
    var deSeCodeArr = [];
    var cf_SetComponentsPopup = function(){
    	
    }
    
    var cf_InitParamPopup = function(){
    	$("#saveBundleReqstPopPubwks022").validate({ errorElement: 'div', ignore: '' });
    }
    
    var cf_SetEventListenerMpsbsc006Popup = function(){
	   $('#btnBundleReqstPopFormPrgSave').unbind('click').bind('click', function(event){
		    if($("#monday").is(":checked")) deSeCodeArr.push("1");
		    if($("#tuesday").is(":checked")) deSeCodeArr.push("2");
		    if($("#wednesday").is(":checked")) deSeCodeArr.push("3");
		    if($("#thursday").is(":checked")) deSeCodeArr.push("4");
		    if($("#friday").is(":checked")) deSeCodeArr.push("5");
		    if($("#saturday").is(":checked")) deSeCodeArr.push("6");
		    if($("#sunday").is(":checked")) deSeCodeArr.push("0");
		    var jsonParameterForBundle = {
		    		empno : bundlePopEmpno,
		    		hvofYm : bundlePopHvofYm,
		    		deSeCodeArr : deSeCodeArr 
		    }
		    var dataSource = gf_NoAsyncTransaction("pubwks022/saveBundlePubwks022", jsonParameterForBundle, 'GET');
// 		    console.log(dataSource);
            if(dataSource.code == "000"){
            	fn_MakeCalendar();
            	$('#popupDtlRequst .b-close').click();
            }
            else{
    		    deSeCodeArr.clear();
    		    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
            }
	   });
       $('#btnBundleReqstPopupPrgClose').unbind('click').bind('click', function(event){
    	   $('#popupDtlRequst .b-close').click();
       });
       $('#saveBundleReqstPopPubwks022 div.error').unbind("click").bind("click",function() {
           $(this).remove();
       });
    }
    
    $(function() {
        cf_SetComponentsPopup();
        cf_InitParamPopup();
        cf_SetEventListenerMpsbsc006Popup();
    });
    </script>
    <div class="pop-content">
    <div>
        <div class="detail_type01">
            <form id="saveBundleReqstPopPubwks022" autocomplete="off">
                <div style="font-weight:bold; height:35px; align:center; padding-top:15px; padding-left:142px;">
                    <div class='checkbox'style="float:left;">
                    <label><input type='checkbox' name='monday' id='monday'/><i class='input-helper'></i>월요일</label>
                    </div>
                    <div class='checkbox'style="float:left;">
                    <label><input type='checkbox' name='tuesday' id='tuesday'/><i class='input-helper'></i>화요일</label>
                    </div>
                    <div class='checkbox'style="float:left;">
                    <label><input type='checkbox' name='wednesday' id='wednesday'/><i class='input-helper'></i>수요일</label>
                    </div>
                    <div class='checkbox'style="float:left;">
                    <label><input type='checkbox' name='thursday' id='thursday'/><i class='input-helper'></i>목요일</label>
                    </div>
                    <div class='checkbox'style="float:left;">
                    <label><input type='checkbox' name='friday' id='friday'/><i class='input-helper'></i>금요일</label>
                    </div>
                    <div class='checkbox'style="float:left;">
                    <label><input type='checkbox' name='saturday' id='saturday'/><i class='input-helper'></i>토요일</label>
                    </div>
                    <div class='checkbox'style="float:left;">
                    <label><input type='checkbox' name='sunday' id='sunday'/><i class='input-helper'></i>일요일</label>
                    </div>
                </div>
                <div class="popup_footer_box">
                    <button type="button" id="btnBundleReqstPopFormPrgSave" name="btnPopFormPrgSave">
                          <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span><taglibs:transText progrmId="default" key="btnSave" />
                    </button>
                    <button type="button" id="btnBundleReqstPopupPrgClose" name="btnPopupPrgClose">
                          <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                    </button>
                </div>
            </form>                
        </div>
        </div>
    </div>
</body>