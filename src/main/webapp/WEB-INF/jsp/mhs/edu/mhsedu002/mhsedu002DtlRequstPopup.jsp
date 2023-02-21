<!-- 
 *    프로그램       : 국내출장신청 상세 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.29
 *    사용테이블      : MHS_BSRP_DETAIL
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
    <script>
    var param = "&confmSeSn=" + paramConfmSeSn + "&empno=" + paramEmpno + "&edureqstSn=" + paramEdureqstSn ;
    
    
    var paramEmpno = '${empno}';    // 사원번호
    var paramEdureqstSn = '${edureqstSn}'; // 교육신청순번
    var paramConfmSeSn = '${confmSeSn}'; // 승인신청구분
    
    var dhxDtlPopupGrid;
    
    var cf_SetEventListenerPopup = function(){
        //저장 
        $('#btnPopFormPrgSave').unbind('click').bind('click', function() {
        	var returnResn = gf_FormGetValue('saveFormMhsedu002', 'returnResn', 'text');
        	if(gf_IsNull(returnResn)){
        		gf_DivMsgAlert('반려사항을 입력해주세요.');
        	}else{
                gf_DivMsgConfirm("반려하시겠습니까?", "fn_SavePopupMhsedu002()", '');	
        	}
        });
        
        
    };
    var fn_SavePopupMhsedu002 = function(){
    	var rowId = dhxGridMhsedu002.getSelectedRowId();
    	var korNm = gf_DhxGetValue(dhxGridMhsedu002 , rowId, 'korNm', 'grid');
    	var reqstDe = gf_DhxGetValue(dhxGridMhsedu002 , rowId, 'reqstDe', 'grid');
    	var educourseNm = gf_DhxGetValue(dhxGridMhsedu002 , rowId, 'educourseNm', 'grid');
    	
            var jsonParameter = {
            	returnResn : gf_FormGetValue('saveFormMhsedu002', 'returnResn', 'text'),
            	empno : paramEmpno,
            	edureqstSn : paramEdureqstSn,
            	confmSeSn : paramConfmSeSn,
            	educourseNm : educourseNm,
            	reqstDe : reqstDe,
            	korNm : korNm,
            	confmSttusCode : "003"
            };
            var url = "mhsedu002/saveMhseduResn";
            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000'){
            	$('#popupDtlRequst .b-close').click();
            	fn_SearchMhsedu002(''); //부모창 새로고침   
            }
        
    }
    
    //팝업창 닫기
    $('#btnPopupPrgClose').unbind('click').bind('click', function() {
        $('#popupDtlRequst .b-close').click();
    });
    
        $(function() {
//           cf_SetComponentsPopup();
//           cf_InitParamPopup();
          cf_SetEventListenerPopup();
     });
    </script>
        <div class="pop-content">
        <div id="saveForm">
                <div class="detail_type01">
                    <form id="saveFormMhsedu002" autocomplete=”off”>
                        <table>
                            <colgroup>
                                <col width="100">
                                <col width="">
                            </colgroup>
                            <tr>  
                                <th>반려내용<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                <td>
                                    <input type="text" name="returnResn" id="returnResnSaveFormMhsedu002" style="width: 99%;height: 300px;"/>
                                </td>
                                
                            </tr>
                        </table>                                 
                    </form>
            </div>
        </div>
        <div class="popup_footer_box">
                <button type="button" id="btnPopFormPrgSave" name="btnPopFormPrgSave">
                      <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span><taglibs:transText progrmId="default" key="btnSave" />
                </button>              
                <button type="button" id="btnPopupPrgClose" name="btnPopupPrgClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
            </div>
        </div>
</body>