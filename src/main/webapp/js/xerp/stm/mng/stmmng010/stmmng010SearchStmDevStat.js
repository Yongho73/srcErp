/**
 * 프로그램 : 프로그램 개발현황 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.23
 * 사용테이블 : STM_DEV_STAT
 **/

var dhxGridStmDevStat;
var dhxGridStmDevStatListInfo;
var menuId = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titStmDevStat = gf_LocaleTrans('default','titStmDevStat');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();

    gf_IframeHeightResize(true);
    
});


var cf_InitParam = function (){

    fn_SetMenuPath("STMMNG010");
    
    gf_ComboCode('divComboSysSe', 'searchComboSysSe', 'searchComboSysSe', 'search', 'C001', '' , '', '', 'asc', ''); //업무구분 
    gf_ComboCode('divComboProgrsSttus', 'searchComboProgrsSttus', 'searchComboProgrsSttus', 'search', 'C201', '' , '', '', 'asc', ''); //작업진행상태 
    gf_MakeComboBasic('divComboChargerNm','comboChargerNm','search','width:150px','stmmng010/combo/searchStmDevStatchargerNmList'); //담당자리스트 

};


var cf_SetComponents = function (){
	//header, width, align, sort, type, hidden, id, attach
    var dhxGridStmDevStatListInfo = [];
    dhxGridStmDevStatListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '')); // 일련번호
    dhxGridStmDevStatListInfo.push(gf_MakeDhxGridHeader("경로", '300', 'left', 'str', 'ro', false, 'menuPath', '')); // 메뉴경로
    dhxGridStmDevStatListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMenuNm'), '150', 'center', 'str', 'ro', false, 'menuNm', '')); // 메뉴명
    dhxGridStmDevStatListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMenuId'), '150', 'center', 'str', 'ro', false, 'menuId', '')); // 메뉴ID
    dhxGridStmDevStatListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBeginDe'), '150', 'center', 'str', 'dhxCalendarA', false, 'beginDe', '')); // 시작 일자
    dhxGridStmDevStatListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEndDe'), '150', 'center', 'str', 'dhxCalendarA', false, 'endDe', '')); // 종료 일자
    dhxGridStmDevStatListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titChargerNm'), '150', 'center', 'str', 'edn', false, 'chargerNm', '')); // 담당자 명
    dhxGridStmDevStatListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titProgrsSttus'), '150', 'center', 'str', 'coro', false, 'progrsSttus', '')); // 진행 상태
    dhxGridStmDevStatListInfo.push(gf_MakeDhxGridHeader('PM확인', '150', 'center', 'str', 'coro', false, 'pmConfirm', '')); // PM확인(C020)
    dhxGridStmDevStatListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRm'), '*', 'left', 'str', 'ed', false, 'rm', '')); // 비고
    
    dhxGridStmDevStat = gf_MakeDhxGrid('dataList', dhxGridStmDevStatListInfo, true, false, false);
   
    dhxGridStmDevStat.enableEditEvents(true,true,true); //원클릭, 더블클릭, F2key 
    dhxGridStmDevStat.setEditable (true);  //그리드 편집모드 
    dhxGridStmDevStat.attachEvent("onCalendarShow", function(myCal,rId,colInd){ myCal.hideTime(); myCal.hideToday(); myCal.loadUserLanguage("ko");});
    dhxGridStmDevStat.setDateFormat("%Y-%m-%d","%Y%m%d");  //날짜 포맷 
         
    dhxGridStmDevStat.enableAutoWidth(true);
    
    //진행여부 
    var jsonParameter = {codekindCode : "C201",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridStmDevStat, dhxGridStmDevStat.getColIndexById("progrsSttus"), dataSource.data); /* 그리드콤보*/    
    
    //확인여부 
    var jsonParameter = {codekindCode : "C020",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridStmDevStat, dhxGridStmDevStat.getColIndexById("pmConfirm"), dataSource.data); /* 그리드콤보*/
    
    
};

var cf_SetEventListener = function (){

    $('#searchStmDevStat #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('#searchStmDevStat').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearch').click(); event.preventDefault(); }
    });
    
    //검색조건 초기화 
    $('#btnFormReset').unbind('click').bind('click', function(event){
    	$('#searchForm1').resetForm();
    });    
    
    
    $('#btnExcel').unbind('click').bind('click', function() {
        fn_ExcelDown();
    });

    $('#btnClose').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });

    
    $('#btnSave').unbind('click').bind('click', function() {
    	var ids = dhxGridStmDevStat.getChangedRows(true);  //변경된 행의 ID리스트를 가져옵니다
    	if (ids == "" || ids ==null ){
    		gf_DivMsgAlert("변경된 행이 없습니다");
    		return false;
    	}
        
    	if(fn_GridValidation()) dhxDataProcessor.sendData();
    	//dhxDataProcessor.sendData();     
    	
    	dhxDataProcessor.getSyncState();  // 업데이트 상태 확인 
    	    	
    	//저장후 메시지 처리                                                                     
    	
    	dhxDataProcessor.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){                                                                         
    		   gf_DivMsgAlert(gv_MsgSave);   
    		   fn_SearchGridList();
    	       return true;                                                                 
                                                                    
    	 });
    	
    });    
};

var cf_SetBinding = function (){
    fn_SearchGridList();
};


var fn_SearchGridList = function (){
	
    var jsonParameter = {
    	comboSysSe  : gf_FormGetValue('searchStmDevStat', 'searchComboSysSe', 'combo'),
    	progrsSttus : gf_FormGetValue('searchStmDevStat', 'searchComboProgrsSttus', 'combo'),
        chargerNm   : gf_FormGetValue('searchStmDevStat', 'comboChargerNm', 'combo'),
        menuNm      : gf_FormGetValue('searchStmDevStat', 'menuNm', 'text'),
    };

    gf_Transaction('gridList', 'stmmng010/searchStmDevStat', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
    

    
    
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridStmDevStat.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridStmDevStat.parse(data.data.records, 'js');
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
        gf_NoFoundDataOnGridMsg(gv_MsgNoData);
    }

    
	//객체 생성 
    dhxDataProcessor = new dataProcessor("/xerp/stmmng010/modifyStmDevStat");  
   
    dhxDataProcessor.setUpdateMode("off"); //기본은 그리드를 변경할때마낟 데이터가 서버로 전송됨 , 자동업데이트 모드 비활성화 
    dhxDataProcessor.setTransactionMode('POST',true);   //GET|POST|REST|JSON, true (한번에 전송 )
    dhxDataProcessor.enableDataNames(true);  //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessor.init(dhxGridStmDevStat);
    
	//유효성 검증 
    dhxDataProcessor.setVerificator(gf_GetDhxGridColumId(dhxGridStmDevStat,'beginDe'),fn_NotEmpty);
    dhxDataProcessor.setVerificator(gf_GetDhxGridColumId(dhxGridStmDevStat,'chargerNm'),fn_NotEmpty);
    dhxDataProcessor.setVerificator(gf_GetDhxGridColumId(dhxGridStmDevStat,'progrsSttus'),fn_NotEmpty);
    
    dhxDataProcessor.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};    
    
    dhxDataProcessor.attachEvent("onValidationError",function(id,messages){
		gf_DivMsgAlert(messages.join("<br>"));      
		return false;
	});
    
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};


var fn_ExcelDown = function () {

    var jsonParameter = {
        	comboSysSe  : gf_FormGetValue('searchStmDevStat', 'searchComboSysSe', 'combo'),
        	progrsSttus : gf_FormGetValue('searchStmDevStat', 'searchComboProgrsSttus', 'combo'),
            chargerNm   : gf_FormGetValue('searchStmDevStat', 'comboChargerNm', 'combo'),
            menuNm      : gf_FormGetValue('searchStmDevStat', 'menuNm', 'text'),
        };
    
    var header = [[
                    gf_LocaleTrans('default', 'titMenuNm'),
                    gf_LocaleTrans('default', 'titMenuId'),
                    gf_LocaleTrans('default', 'titBeginDe'),
                    gf_LocaleTrans('default', 'titEndDe'),
                    gf_LocaleTrans('default', 'titChargerNm'),
                    gf_LocaleTrans('default', 'titProgrsSttus'),
                    'PM확인',
                    gf_LocaleTrans('default', 'titRm'),
    ]];
    var dataId = [[ 'menuNm', 'menuId', 'beginDe', 'endDe', 'chargerNm', 'progrsSttusNm', 'pmConfirmNm', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmDevStat ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmDevStat;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('stmmng010/excelStmDevStat', jsonParameter);
};

var fn_SearchInputStmDevStat = function (){

};

var fn_NotEmpty =function (value,id,ind){
	if (value=="")
		return " ("+id+"행, "+ind+"열의)  값은 공백일 수 없습니다.";
	return true;
}

var fn_GridValidation = function(){
	var valid = true;
	var beginDe ="" ;
	var endDe ="";
	dhxGridStmDevStat.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {

			beginDe = gf_DhxGetValue(dhxGridStmDevStat, rowId, 'beginDe', 'grid');
			endDe 	= gf_DhxGetValue(dhxGridStmDevStat, rowId, 'endDe', 'grid');
			
			if (!gf_IsNull(beginDe) &&  !gf_IsNull(endDe) ){
				
				if (beginDe > endDe){
					gf_DivMsgAlert("시작일과 종료일에 이상이 있습니다");
					fn_GridValidationSelectCell(dhxGridStmDevStat, rowId, 'endDe');
					valid = false;
				}
			}
			
		}
    });
	return valid;	 
};

var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}

