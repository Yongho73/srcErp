<!-- 
 *    프로그램       : 국내출장신청 상세 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.29
 *    사용테이블      : MHS_BSRP_DETAIL
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
 <style>
.research_wrap{background:#fff;padding:10px;}
.research_div{border:1px solid #d9e0ea;width:98%;margin:0 auto;}

.research_listtopic{display:block;background:#f9faff;font-weight:bold;text-align:left;margin:7px 7px 10px 7px;padding:10px;border:1px solid #d9e0ea;font-size:13px;}

.research_listtit{display:block;background:#f9faff;font-weight:bold;text-align:left;padding:10px;border-bottom:1px solid #d9e0ea;font-size:13px;}
.research_list{}
.research_list li{border-bottom:1px solid #d9e0ea;text-indent:10px;padding:5px 0;}

.research_wrap .checkbox {
  position: relative;
  top:1px;
  left:10px;
}

.research_wrap .checkbox label {
  padding-left: 4px;
  display: block;
}

.research_wrap .checkbox input {
  top: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
  opacity: 0;
  position: relative;
  width: 13px;
  height: 13px;
}

.research_wrap .checkbox .input-helper:before,
.research_wrap .checkbox .input-helper:after {
  position: absolute;
  content: "";
  transition: all 200ms;
}

.research_wrap .checkbox .input-helper:before {
  left: 0;
  border: 1px solid #ced4da;
}

.research_wrap .checkbox input:checked + .input-helper:before {
  background-color: #1e5ca0;
}

.research_wrap .checkbox input:checked + .input-helper:after {
  transform: scale(1);
  opacity: 1;
}

.research_wrap .checkbox .input-helper:before {
  top: 0;
  width: 13px;
  height: 13px;
  color: #fff;
}

.research_wrap .checkbox .input-helper:after {
  content: '\2713';
  font-size: 13px;
  left: -8px;
  color: #fff;
  transform: scale(0);
  opacity: 0;
}


.research_wrap .checkbox span{
    position:relative;
    top:-2px;
    left:-11px;
}

</style>

    <script>
    var paramQestnarCode = '${qestnarCode}';    // 설문조사 코드
    
    var dhxGridPopup;
    var gformIdPopup;
    var gformIdPopup;
    var gcodeNmIdPopup;
    var gdeptInfoPopup;

    $(function() {  
        cf_InitParamPopupMenu();
//         cf_SetComponentsPopupMenu();
        cf_SetEventListenerPopupMenu();
        cf_SetBindingPopupMenu();
        cf_InitFormPopupQest();
    });
    
    function cf_InitParamPopupMenu(){
        var jsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"ordr" };
        var dataComCode = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); // 기존 코드조회 쿼리 사용
    }
    	
    function cf_InitFormPopupQest() {
    	gf_FormSetValue('saveFormMhsedu003', 'qestnarCode', paramQestnarCode, 'text');
    };
    
    function cf_SetEventListenerPopupMenu(){
      //팝업창 닫기
        $('#btnPopupPrgClose').unbind('click').bind('click', function() {
            $('#popupDtlRequst .b-close').click();
        });
      
//         dhxGridPopup.attachEvent("onRowDblClicked", function(rId,cInd){
//             fn_SearchPopupQestOk(rId);
//         });
    }
    function cf_SetBindingPopupMenu(){
        fn_SearchPopupPopupQest();
    }
    
    function fn_SearchPopupPopupQest(){
        
        var jsonParameter = {
                qestnarCode : paramQestnarCode
        };
        gf_Transaction('', 'stmqes001/searchStmqestrnarCn', jsonParameter, 'fn_CallbackAcntCdPopup', false, 'GET');
          
    }
    
    function fn_CallbackAcntCdPopup (strSvcID, targetID, data){
    	if(!gf_IsNull(data.data.records)){
    		var list=[];
    		   $(data.data.records).each(function (idx, item){
    			   var jsonParameter = {
    					   qestnarCode : item.qestnarCode,
    					   qestnarCnSn : item.qestnarCnSn
    					   }; // jsonParameter 끝
    			    var url = "stmqes001/searchStmqesR";
    			    var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'GET');
    			    var subitem = dataSource.data.records;
    			    var aswperTy = item.aswperTy;
    			    console.log(aswperTy) 
                if(aswperTy == 'R'){ // RADIO
                              list.push('<span class="research_listtit pl10 al">' + item.qestnarCn + '</span>');
                              list.push('<ul class="research_list">');
                	    $(subitem).each(function (idx, item2){
                	    	  list.push('<li>');
                	    	  list.push('<input type="radio"> ');
                	    	  list.push('<label for="open_some">');
                	    	  list.push('<span></span>' + item2.aswperChrctr);
                	    	  list.push('</label>');
                	    	  list.push('</li>');
                	    	  }); // 반복문 끝
                	    	  list.push('</ul>');
                } else if (aswperTy == 'S'){ // COMBO
                	          list.push('<span class="research_listtit pl10 al">' + item.qestnarCn + '</span>');
                	          list.push('<ul class="research_list">');
                         $(subitem).each(function (idx, item2){
                        	  list.push('<li>');
                        	  list.push('<select>');
                        	  list.push('<option value="0" selected>선택</option>');
                        	  list.push('<option value="">'+ item2.aswperChrctr +'</option>');
                        	  list.push('</select>');
                        	  list.push('</li>');
                        }); // 반복문 끝
                        	  list.push('</ul>');
                } else if (aswperTy == 'C'){ // CHECK
                	          list.push('<span class="research_listtit pl10 al">' + item.qestnarCn + '</span>');
                	          list.push('<ul class="research_list">');
                    $(subitem).each(function (idx, item2){
                    	list.push('<li>');
                        list.push('<div class="checkbox" checked>');
                        list.push('<label>');
                        list.push('<input type="checkbox" />');
                        list.push('<i class="input-helper"></i>');
                        list.push('<span>'+ item2.aswperChrctr +'</span>');
                        list.push('</label>');
                        list.push('</div>');
                        list.push('</li>');
                     }); // 반복문 끝
                         list.push('</ul>');
                } else if (aswperTy == 'T'){ // 단답형
                	           list.push('<span class="research_listtit pl10 al">' + item.qestnarCn + '</span>');
                	           list.push('<ul class="research_list">');
                    $(subitem).each(function (idx, item2){
                         list.push('<li>');
                         list.push('<textarea rows="2" cols="10" class="w90p"></textarea>');
                         list.push('</li>');
                     }); // 반복문 끝
                         list.push('</ul>');
                }  else if (aswperTy == 'M'){ // 서술형
                	     list.push('<span class="research_listtit pl10 al">' + item.qestnarCn + '</span>');
                	     list.push('<ul class="research_list">');
                    $(subitem).each(function (idx, item2){
                         list.push('<li>');
                         list.push('<textarea rows="2" cols="10" class="w90p" style="height:80px;">'+ +'</textarea>');
                         list.push('</li>');
                     }); // 반복문 끝
                         list.push('</ul>');
                }// else if 문 끝
    	    }); // item if 문 끝
    	    
    	    $('.research_div').empty();
            $('.research_div').append(list.join(''));
    	} // data.data.records Null if 문 끝
    }; // 함수 끝
    
        
    </script>
   
    <div class="pop-content">
        <div class="research_wrap">   
         <span class="research_listtopic">설문은 교육 이수 직원 여러분의 만족도와 요구를 파악하여 향후 교육과정 개선과 보완의 자료로 활용하고자 실시하는 것이니 성의껏 작성을 부탁드립니다.</span>
        <div class="research_div">
                
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