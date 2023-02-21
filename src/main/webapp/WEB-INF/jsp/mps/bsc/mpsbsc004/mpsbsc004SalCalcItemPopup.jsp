<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<style>
    .calc_table{background:#e3e4e6;}
    .calc_table tr{background:transparent;}
    .calc_table td{background:transparent;}
    .calc_btn1{width:40px;height:27px; font-weight:bold;background:#fafafa;margin-bottom:6px;}
    .calc_btn2{width:40px;height:27px; font-weight:bold;font-size:18px; background:#f0f0f0;margin-bottom:6px;}
    .calc_btn3{width:95px;height:27px; font-weight:bold; background:#f0f0f0;margin-bottom:6px;}
</style>
<body>

    <script>
   
    var dhxGridCalcMpsbsc004Pop;  //pop그리드
    var calcItem = {};
    
    var cf_InitParamPopup = function (){
       //gf_ComboCode('divComboSearchPopSalarytyCode', 'searchSalarytyCode', 'searchSalarytyCode', 'search', 'C062', '' , '', '', 'ordr', '','',''); //급여유형 
       //gf_MakeComboBasic('divComboSearchPopSalaryitemCode','searchSalaryitemCode','search','width:100px','mpsbsc002/combo/searchComboMpsbsc002List',''); //급여항목 리스트 
       //gf_ComboCode('divComboSearchPopPymntddcSe', 'searchPymntddcSe', 'searchPymntddcSe', 'search', 'C064', '' , '', '', 'ordr', '','',''); //지급공제구분       
    };    
    
    var cf_SetComponentsMpsbsc004Popup = function() {
        
        var dhxGridCalcMpsbsc004PopHeaderInfo = [];
        dhxGridCalcMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); 
        dhxGridCalcMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '100', 'center', 'str', 'ro', false, 'salarytyCodeNm', '', ''));
        dhxGridCalcMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader('급여항목코드', '100', 'center', 'str', 'ro', false, 'salaryitemCode', '', ''));
        dhxGridCalcMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '*', 'center', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
        dhxGridCalcMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader('지급공제', '80', 'center', 'str', 'ro', false, 'pymntddcSeNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
        dhxGridCalcMpsbsc004PopHeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '0', 'center', 'str', 'ro', true, 'salarytyCode', '', ''));
        
        dhxGridCalcMpsbsc004Pop = gf_MakeDhxGrid('dataListCalcMpsbsc004Pop', dhxGridCalcMpsbsc004PopHeaderInfo, true, false, false);
        dhxGridCalcMpsbsc004Pop.enableAutoWidth(true);
        
            
    }
    var eventPopIds = [];
    var cf_SetEventListenerMpsbsc004Popup = function (){
        /*
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
        */
        
        //버튼 적용       
        $('#btnApplySubmit').unbind('click').bind('click', function() {
            var selectedId = dhxGridCalcMpsbsc004Pop.getSelectedRowId();           
            if (selectedId < 1 ){
                gf_DivMsgAlert('급여 항목을 선택해 주세요.');
                return false;
            }
        
            if( gf_IsNull($("#calcAmt").val()) ){
                gf_DivMsgAlert('급여 계산 수식을 입력하세요.');
                return false;               
            }

            var salaryitemCode   = dhxGridCalcMpsbsc004Pop.cells(selectedId, dhxGridCalcMpsbsc004Pop.getColIndexById("salaryitemCode")).getValue(); 
            var salarytyCode     = dhxGridCalcMpsbsc004Pop.cells(selectedId, dhxGridCalcMpsbsc004Pop.getColIndexById("salarytyCode")).getValue(); 
            
           
             var rId = dhxGridMpsbsc004.getSelectedRowId();     
             
             var calcDtl = $("#calcAmt").val();
             
             for(var key in calcItem){
                 calcDtl = calcDtl.replaceAll(key, calcItem[key]);
             }
             console.log("rId" + rId);
             console.log("calDtl" + calcDtl);
             console.log("calDtl" + $("#calcAmt").val());
             dhxGridMpsbsc004.cells(rId, dhxGridMpsbsc004.getColIndexById("calcNomfrm")).setValue(calcDtl);
             dhxGridMpsbsc004.cells(rId, dhxGridMpsbsc004.getColIndexById("calcNomfrmDtls")).setValue($("#calcAmt").val());
//              dhxGridCalcMpsbsc004.cells(rId, dhxGridCalcMpsbsc004.getColIndexById("salaryitemCode")).setValue(salaryitemCode); //급여항목코드
//              dhxGridCalcMpsbsc004.cells(rId, dhxGridCalcMpsbsc004.getColIndexById("salarytyCode")).setValue(salarytyCode); //급여항목코드
             if(gf_IsNull(dhxDataProcessorMpsbsc004.getState(dhxGridMpsbsc004.getSelectedRowId()))) 
                 dhxDataProcessorMpsbsc004.setUpdated(dhxGridMpsbsc004.getSelectedRowId(), true, '');        
             $('#bpopupCalcMpsbsc004 .b-close').click();
        });
        
        //계산버튼 클릭
        $('.calc_btn1, .calc_btn2').unbind('click').bind('click', function() {        	
        	var val = $(this).text();
        	var calcAmt          = $("#calcAmt").val();
            var calcAmtDesc = $("#calcAmtDesc").val();
            var lastChar = "";
            var temp = 0;
            var iLen = calcAmt.length;
            lastChar = calcAmt.charAt(calcAmt.length-1);
            
            if(val ==".") {
            	for(var i=calcAmt.length+1 ; i >=0 ; i--){
                    //console.log(">>" +  calcAmt.charAt(i));
                    if(cf_isNumber(calcAmt.charAt(i))) {
                    	iLen = i;
                    	break;
                    }
               }
            	temp = calcAmt.substring( iLen-1, calcAmt.length);
          //  	console.log("temp" + temp);
            	lastChar = temp.charAt(temp.length-1);
            	// . 입력후 입력전문자열이 숫자인지 여부를 체크하여 숫자가 아닌경우는 return
            	if(!cf_isNumber(lastChar))   return false;
            	//var temp = calcAmt + $(this).text() ;
            	//if(!cf_isNumber(temp)) return false;
            }
            else  if(val== "＋" || val== "－" || val== "×" || val== "÷"  ||  val== ")" ) {
            	// +,-, x, /는 입력전 숫자가 아닌경우는 오류            	          
                var s_chBrace = 0;
                var e_chBrace = 0;
            	var s = calcAmt;
            	if(val==")") {
            		 for (var i=0; i<s.length; i++){
            			    if(s[i]=="(")            			    	s_chBrace++;
            			    else if(s[i]==")")                     e_chBrace++;
            		 }
            		 if(s_chBrace== 0) return false;
            		 if(s_chBrace != (e_chBrace+1)) return false;          			    	            	 
            	}
            	   
            	if(lastChar =="]" || lastChar ==")" ||  cf_isNumber(lastChar));
            	 else       return false;             	 
            	
            }else  if(val== "(") {
            	 if(lastChar == ")") return false;            		
            	 if(cf_isNumber(calcAmt.charAt(iLen-1)))  return false;            	
            }else {
            	 if(lastChar == ")" || lastChar == "]") return false;
            }

        	$("#calcAmt").val(calcAmt + $(this).text());
        	$("#calcAmtDesc").val(calcAmtDesc + $(this).text());
        	//cf_isNumber
        });
        //Backspace 클릭
        $('.calc_btn3').unbind('click').bind('click', function() {          
            var calcAmt = $("#calcAmt").val();
            var calcAmtDesc = $("#calcAmtDesc").val();
            var strArray = "";
            if(calcAmt =="") return;
            
            if(calcAmt.charAt(calcAmt.length-1) == ']'){            	
            	var sIndex     = calcAmt.indexOf("[");
            	var eIndex     = calcAmt.indexOf("]");
            	var sIndex2   = calcAmtDesc.indexOf("[");
            	var eIndex2   = calcAmtDesc.indexOf("]");            
            	var t_calcAmt          = calcAmt.substring(sIndex, eIndex+1);
            	var t_calcAmtDesc = calcAmtDesc.substring(sIndex2,eIndex2+1);
            	calcAmt = calcAmt.replace( t_calcAmt, '' );
            	calcAmtDesc = calcAmt.replace( t_calcAmtDesc, '' );
            }
            else {
            	calcAmt = calcAmt.substring(0, calcAmt.length-1);
            	calcAmtDesc = calcAmtDesc.substring(0, calcAmtDesc.length-1);
            }
            $("#calcAmt").val(calcAmt)
            $("#calcAmtDesc").val(calcAmtDesc);           
        });

        $('#btnPopupClose').unbind('click').bind('click', function() {
            $('#bpopupCalcMpsbsc004 .b-close').click();
        });
        
        dhxGridCalcMpsbsc004Pop.attachEvent("onRowSelect", function(rId,cInd){
            fn_SelectedCalcItem(rId);
        }); 
        /*
        dhxGridCalcMpsbsc004Pop.attachEvent("onRowDblClicked", function(rId,cInd){
            fn_SelectedCalcItem(rId);
        });        
      */
    };
    
    function cf_isNumber(s) {
    	  s += ''; // 문자열로 변환
    	  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
    	  if (s == '' || isNaN(s)) return false;
    	  return true;
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
        gf_Transaction(jsonParameter, 'mpsbsc004/searchCalcMpsbsc004PopList', jsonParameter, 'fn_CallbackSearchMpsbsc004Pop', false, 'GET');
    };

    var fn_CallbackSearchMpsbsc004Pop = function(strSvcID, targetID, data) {
        dhxGridCalcMpsbsc004Pop.clearAll();
       
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListCalcMpsbsc004Pop');
            dhxGridCalcMpsbsc004Pop.parse(data.data.records, 'js');
            dhxGridCalcMpsbsc004Pop.selectRow(0);
        } else {
            gf_NoFoundDataOnGridMsg('dataListCalcMpsbsc004Pop');
        }
        $('#spanCntMpsbsc004Pop').text(data.data.records.length);
        cf_SetEventListenerMpsbsc004();
    };    
    
    //값 선택 
    var fn_SelectedCalcItem =function (rId){        
        //var obj = new Object();
        var salaryitemCode       = dhxGridCalcMpsbsc004Pop.cells(rId, dhxGridCalcMpsbsc004Pop.getColIndexById("salaryitemCode")).getValue();
        var salaryitemNm         = dhxGridCalcMpsbsc004Pop.cells(rId, dhxGridCalcMpsbsc004Pop.getColIndexById("salaryitemNm")).getValue(); 
        
        var calcAmt        = $("#calcAmt").val();    
        var calcAmtDesc    = $("#calcAmtDesc").val();
        
        if(calcAmt.indexOf("[") >= 0) return false;
        
        calcItem[salaryitemCode] = salaryitemNm;
        
        calcAmt        += "[" + salaryitemCode + "]";
        calcAmtDesc    += "[" + salaryitemNm + "]";

        $("#calcAmt").val(calcAmt);
        $("#calcAmtDesc").val(calcAmtDesc);
        
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
<!--                             <table style="border: none; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
                                <tr style="border: none;">
    
                                    <th><label for="docmT">급여유형<taglibs:transText progrmId="default" key="titSalarytyCode"/></th>
                                    <td><div id="divComboSearchPopSalarytyCode"></div></td>
                                    <th><label for="docmT">급여항목<taglibs:transText progrmId="default" key="titSalaryitemCode"/></th>
                                    <td><div id="divComboSearchPopSalaryitemCode"></div></td>
                                    <th><label for="docmT">지급구분<taglibs:transText progrmId="default" key="titSalaryitemCode"/></th>
                                    <td><div id="divComboSearchPopPymntddcSe"></div></td>
                                    
                                </tr>
                            </table> -->
                        </form>
                    </td>
                    <td style="border: none;">
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
                <div id="dataListCalcMpsbsc004Pop" style="width: 100%; height: 300px;"></div>

                <div class="popup_footer_box">
                    <form id="dataForm" name="dataForm" >
                        <table>
                            <tr>
                                <td align="center">
                                    <input type="text" name="calcAmtDesc" id="calcAmtDesc" style="width:340px"/>
                                    <input type="hidden" name="calcAmt" id="calcAmt" style="width: 100px"/>
                                     <button type="button" id="btnApplySubmit" name="btnApplySubmit">
                                        <span class="glyphicon glyphicon-ok f15 mr5"></span>적용
                                     </button>                                   
                                     
                                      <button type="button" id="btnRefresh" name="btnRefresh">
                                          <span class="glyphicon glyphicon-refresh f15 mr5"></span>초기화
                                     </button>
                                  
                                     <button type="button" id="btnPopupClose" name="btnPopupClose">
                                          <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                                     </button>
                                     
                                                                             
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>                              
                
            </div>

            <div class="flex p10">
                    <div class="item5">
                        <span class="f_blue2 f12">※ 적용기준구분</span>
                            <ul class="f12">
                                <li>1.목록에서 급여항목을 클릭합니다. 
                                <li>2.선택된 급여항목에 계산식을 적용합니다. 
                                <li>선택된 급여항목 계산식 적용
                                <li>통상임금 기준 : 209시간(월)  
                                <li>곱합기 : *
                                <li>나누기 : /
                                <li>예) : [통상임금]*1/209*8
                            </ul>  
                        </span>
                    </div>
                    <div class="item5">
                        <table class="calc_table">
                            <caption>입력버튼</caption>
                            <colgroup>
                                <col style="width:20%" />
                                <col style="width:20%" />
                                <col style="width:20%" />
                                <col style="width:20%" />
                                <col style="width:20%" />
                            </colgroup>
                            <tr>
                                <td class="pt10" colspan="5"></td>
                            </tr>
                            <tr>
                                <td class="ac"><button class="calc_btn1">7</button></td>
                                <td class="ac"><button class="calc_btn1">8</button></td>
                                <td class="ac"><button class="calc_btn1">9</button></td>
                                <td class="ac"><button class="calc_btn2">(</button></td>
                                <td class="ac"><button class="calc_btn2">)</button></td>
                            </tr>
                             <tr>
                                <td class="ac"><button class="calc_btn1">4</button></td>
                                <td class="ac"><button class="calc_btn1">5</button></td>
                                <td class="ac"><button class="calc_btn1">6</button></td>
                                <td class="ac"><button class="calc_btn2">＋</button></td>
                                <td class="ac"><button class="calc_btn2">－</button></td>
                            </tr>
                             <tr>
                                <td class="ac"><button class="calc_btn1">1</button></td>
                                <td class="ac"><button class="calc_btn1">2</button></td>
                                <td class="ac"><button class="calc_btn1">3</button></td>
                                <td class="ac"><button class="calc_btn2">×</button></td>
                                <td class="ac"><button class="calc_btn2">÷</button></td>
                            </tr>
                             <tr>
                                <td class="ac"><button class="calc_btn2">&nbsp;</button></td>
                                <td class="ac"><button class="calc_btn1">0</button></td>
                                <td class="ac"><button class="calc_btn2">.</button></td>
                                <td class="ac" colspan="2"><button class="calc_btn3">Backspace</button></td>                                
                            </tr>
                            
                        </table>
                    </div>
                        
                </div>
        </div>
    </div>
</body>
