<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script>
    var bundleUseBeginDate;
    var bundleUseEndDate;
    var cf_SetComponentsPopup = function() {
        var dhxPopupGridPubwks020HeaderInfo = [];
        dhxPopupGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));
        dhxPopupGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '147', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxPopupGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader('성명', '120', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
        dhxPopupGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader('부서', '120', 'center', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
        dhxPopupGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader('직급', '120', 'center', 'str', 'ro', false, 'clsfCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
      
        dhxPopupGrid =  gf_MakeDhxGrid('dataPopupPubwks020', dhxPopupGridPubwks020HeaderInfo, true, false, false);
        dhxPopupGrid.enableAutoWidth(false);
        
        dhxPopupGrid.setColumnMinWidth(100,4); //넓이가 * 인 컬럼의 최소 넓이값 설정

        $("#savePopPubwks020").validate({ errorElement: 'div', ignore: '' });
    };

    
    var cf_InitParamPopup = function (){

    };
    
    var cf_SetEventListenerMpsbsc006Popup = function (){
        $('#btnPopFormPrgSave').unbind('click').bind('click', function(event){
            gf_errorMsgClear();
            gf_DivMsgConfirm(gv_QueSave, 'fn_SaveBundlePubwks020()', '');
        });
        $('#btnPopupPrgDelete').unbind('click').bind('click', function(event){
            gf_errorMsgClear();
            gf_DivMsgConfirm(gv_QueDelete, 'fn_DeleteBundlePubwks020()', '');
        });
        $('#btnPopupPrgClose').unbind('click').bind('click', function(event){
            $('#bundleRequest .b-close').click();
        });
        
        //사원팝업
        $('#searchFormMhsEmp #btnEmpSearch').unbind('click').bind('click', function(event){
            gf_MultiEmpPopup("dhxPopupGrid","empNo","korNm", "" , "N", "fn_CallbackSearchMultiEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
        });
        //출장자 삭제
        $('#searchFormMhsEmp #btnEmpRemove').unbind('click').bind('click', function(event){
            var rowId = dhxPopupGrid.getSelectedRowId();
            if(gf_IsNull(rowId)) {
                gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
                return false;
            } else {
                var rowNum = dhxPopupGrid.getRowIndex(rowId);
                dhxPopupGrid.deleteRow(rowId);
                dhxPopupGrid.selectRow(rowNum);
                }
        });
        
        $('#savePopPubwks020 #useBeginDeSavePopFormPubwks020').unbind('change blur').bind('change blur',function(event){
            var tmp = gf_FormGetValue('savePopPubwks020', 'useBeginDe', 'text');
            var Sdate = new Date(tmp);
            Sdate.setDate(Sdate.getDate() - 1);
            bundleUseEndDate.setInsensitiveRange(null , Sdate);    
        }); 
        $('#savePopPubwks020 #useEndDeSavePopFormPubwks020').unbind('change blur').bind('change blur',function(event){
            var tmp = gf_FormGetValue('savePopPubwks020', 'useEndDe', 'text');
            var Edate = new Date(tmp);
            Edate.setDate(Edate.getDate() + 1);
            bundleUseBeginDate.setInsensitiveRange(Edate , null);    
        }); 
        
        $('#savePopPubwks020 div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
        
        $('#savePopPubwks020').attr("autocomplete" , "off");
    };
    var fn_CallbackSearchMultiEmp = function(data){
    	dhxPopupGrid.forEachRow(function(index){
            for(row in data){
                if(gf_DhxGetValue(dhxPopupGrid, index, 'empno', 'grid') == data[row].empno){
                    delete data[row];
                }           
            }
        });
        for(row in data){
        	var valueArr = [];
        	valueArr.push('');
        	valueArr.push(data[row].empno);
        	valueArr.push(data[row].korNm);          // 성명
        	valueArr.push(data[row].deptCodeNm);     // 부서 이름
        	valueArr.push(data[row].clsfCodeNm);     // 직급 이름
        	
        	dhxPopupGrid.addRow(dhxPopupGrid.uid(), valueArr , 0);
        	dhxPopupGrid.selectRow(0);
        }
    }
    
    var fn_SaveBundlePubwks020 = function(){
    	var shiftWorkAtYn ;
    	var holiWorkAtYn ;
    	var multiEmpno = '';
    	var gridChk;
        var checkBeginDe = gf_FormGetValue('savePopPubwks020' , 'useBeginDe' , 'text').replaceAll('-','');
        var checkEndDe = gf_FormGetValue('savePopPubwks020' , 'useEndDe' , 'text').replaceAll('-','');

    	
    	if(gf_FormGetValue('savePopPubwks020', 'shiftWorkAt', 'chkbox') == 'on'){
    		shiftWorkAtYn = '1';
    	}
    	else {
    		shiftWorkAtYn = '0';
    	}
    	
        if(gf_FormGetValue('savePopPubwks020', 'holiWorkAt', 'chkbox') == 'on'){
        	holiWorkAtYn = '1';
        }
        else {
        	holiWorkAtYn = '0';
        }   
        dhxPopupGrid.forEachRow(function(row){
        	var noValue = gf_DhxGetValue(dhxPopupGrid, row , 'empno', 'grid');
        	var nmValue = gf_DhxGetValue(dhxPopupGrid, row , 'korNm', 'grid');
        	if(!gf_IsNull(noValue)){
            	multiEmpno += noValue + "|";
        	}
        	gridChk = row;
        });
        if(gf_IsNull(gridChk)){
        	gf_DivMsgAlert("대상자를 추가하여 주세요.");
        	return;
        }
        if($('#savePopPubwks020').validate().form()){
            var jsonParameter = {
             		multiEmpno : multiEmpno,
            	    useBeginDe : checkBeginDe,
            	    useEndDe : checkEndDe,
            		workBeginTime : gf_FormGetValue('savePopPubwks020', 'workBeginTime', '').replaceAll(':',''),
            	    workEndTime : gf_FormGetValue('savePopPubwks020', 'workEndTime', '').replaceAll(':',''),
            	    wrkplcNm : gf_FormGetValue('savePopPubwks020' , 'wrkplcNm' , 'text'),
            	    recogTime : gf_FormGetValue('savePopPubwks020', 'recogTime', 'text'),
            	    shiftWorkAt : shiftWorkAtYn,
            	    holiWorkAt : holiWorkAtYn
            }
    //         console.log(jsonParameter);
            var url = "pubwks020/saveMultiPubwks020";
            var dataSource =  gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000'){
                gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                $('#bundleRequest .b-close').click();
                fn_MakeCalendar();
            }
            else{
                gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
            }
        }
        
    }
    var fn_DeleteBundlePubwks020 = function(){
    	var checkBeginDe = gf_FormGetValue('savePopPubwks020' , 'useBeginDe' , 'text').replaceAll('-','');
    	var checkEndDe = gf_FormGetValue('savePopPubwks020' , 'useEndDe' , 'text').replaceAll('-','');
    	var multiEmpno = '';
        dhxPopupGrid.forEachRow(function(row){
            var noValue = gf_DhxGetValue(dhxPopupGrid, row , 'empno', 'grid');
            var nmValue = gf_DhxGetValue(dhxPopupGrid, row , 'korNm', 'grid');
            if(!gf_IsNull(noValue)){
                multiEmpno += noValue + "|";
            }
            gridChk = row;
        });
        if(gf_IsNull(gridChk)){
            gf_DivMsgAlert("대상자를 추가하여 주세요.");
            return;
        }
        else if(gf_IsNull(checkBeginDe) || gf_IsNull(checkEndDe)){
        	gf_DivMsgAlert("근무 일자를 선택하여 주세요.");
        	return;
        }
        var jsonParameter = {
                multiEmpno : multiEmpno,
                useBeginDe : checkBeginDe,
                useEndDe : checkEndDe,
        }
//         console.log(jsonParameter);
        var url = "pubwks020/deleteMultiPubwks020";
        var dataSource =  gf_NoAsyncTransaction(url, jsonParameter, 'GET');
        if(dataSource.code === '000'){
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            $('#bundleRequest .b-close').click();
            fn_MakeCalendar();
        }
        else{
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
        }    }
    //값 선택 
    var fn_SelectedItem =function (){

    }
    var fn_Calendar = function(){
    	bundleUseBeginDate = new dhtmlXCalendarObject({input:"useBeginDeSavePopFormPubwks020"});
    	bundleUseEndDate = new dhtmlXCalendarObject({input:"useEndDeSavePopFormPubwks020"});

    	bundleUseBeginDate.hideTime();
    	bundleUseBeginDate.loadUserLanguage("ko"); 
    	bundleUseEndDate.hideTime();
    	bundleUseEndDate.loadUserLanguage("ko"); 
    }
    
    var fn_AccessKind = function(){
    	if("PUBMNG000" == gv_SecondLvlMenuId){
    		$('#searchFormMhsEmp').hide();
    		
    	    var initValueArr = [];
    	    initValueArr.push('');
    	    initValueArr.push(sessionUserEmpno);
    	    initValueArr.push(sessionUserEmpnm);
    	    initValueArr.push(sessionUserDeptNm);
    	    initValueArr.push('');
            dhxPopupGrid.addRow(dhxPopupGrid.uid(), initValueArr , 0);
            dhxPopupGrid.selectRow(0);
    	}
    }
    
    $(function() {
    	cf_SetComponentsPopup();
        cf_InitParamPopup();
        cf_SetEventListenerMpsbsc006Popup();
        fn_AccessKind();
        fn_Calendar();
    });
    
    
    </script>
    <div class="pop-content">
    <div>
        <div class="detail_type01">
            <form id="savePopPubwks020" autocomplete="off">
                <table>
                    <colgroup>
                        <col width="80">
                        <col width="110">
                        <col width="80">
                        <col width="110">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">근무지 명<!-- <taglibs:transText progrmId="default" key="titWrkplcNm"/> --></th>
                        <td colspan="3"><input type="text" name="wrkplcNm" id="wrkplcNmSavePopFormPubwks020" maxlength="100" style="width: 99%" required/></td>
                    </tr>
                    <tr>
                        <th class="essential_icon">근무 일자<!-- <taglibs:transText progrmId="default" key="titUseBeginDe"/> -->
                        </th>
                        <td id="saveUseSdt" colspan="3">
                             <input type="text" name="useBeginDe" id="useBeginDeSavePopFormPubwks020"  class="input_calen" maxlength="10" required/>&nbsp; ~ &nbsp; 
                             <input type="text" name="useEndDe" id="useEndDeSavePopFormPubwks020"  class="input_calen" maxlength="10" required/>
                        </td>
                    </tr>
                    <tr>
                        <tr>
                            <th class="essential_icon">근무 시간<!-- <taglibs:transText progrmId="default" key="titWorkBeginTime"/> --></th>
                            <td colspan="3">
                                <input type="time" value="09:00" name="workBeginTime" id="workBeginTimeSavePopFormPubwks020" >
                                &nbsp; ~ &nbsp;
                                <input type="time" value="18:00" name="workEndTime" id="workEndTimeSavePopFormPubwks020" >
                            </td>
                        </tr>
                    </tr>
                    <tr>
                        <th>교대 근무 여부<!-- <taglibs:transText progrmId="default" key="titShiftWorkAt"/> --></th>
                        <td colspan="1">
                            <div class="checkbox">
                                <label><input type="checkbox" name="shiftWorkAt" id="shiftWorkAtSavePopFormPubwks020" maxlength="1"/><i class="input-helper"></i></label>
                            </div>
                        </td>
                        <th>휴일 포함 여부</th>
                        <td colspan="1">
                            <div class="checkbox">
                                <label><input type="checkbox" name="holiWorkAt" id="holiWorkAtSavePopFormPubwks020" maxlength="1"/><i class="input-helper"></i></label>
                            </div>
                        </td>
                    </tr>
                </table>            
                <div class="div_title">
                    <div class="left"><span class="s_tit"><i class="axi axi-chevron-right"></i>시차근무등록대상자</span></div>
                        <div class="right" id="searchFormMhsEmp">
                            <button type="button" id="btnEmpSearch" class="btn_common01_new">대상추가</button>
                            <button type="button" id="btnEmpRemove" class="btn_common01_new">대상삭제</button>
                        </div>
                    </div>
                <div>
                    <div id="dataPopupPubwks020" style="width: 100%; height: 220px" class="div_liner">
                    </div>
                </div>
                <div class="popup_footer_box">
                    <button type="button" id="btnPopFormPrgSave" name="btnPopFormPrgSave">
                          <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span><taglibs:transText progrmId="default" key="btnSave" />
                    </button>
                    <button type="button" id="btnPopupPrgDelete" name="btnPopupPrgDelete">
                          <span class="glyphicon glyphicon-remove f15 mr5"></span><taglibs:transText progrmId="default" key="btnDelete" />
                    </button>                
                    <button type="button" id="btnPopupPrgClose" name="btnPopupPrgClose">
                          <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                    </button>
                </div>
            </form>                
        </div>
        </div>
    </div>
</body>