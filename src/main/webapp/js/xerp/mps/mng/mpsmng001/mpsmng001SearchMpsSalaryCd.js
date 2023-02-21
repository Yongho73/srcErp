/**
 *	프로그램	  : 
 *	작성자	  : gho
 *	작성일자	  :	2019.04.06
 *	사용테이블 : C_SALARYCD
 *	첨부파일	:	
 **/

var dhxGrid;
var dhxCalendarStartDate;
var dhxCalendarEndDate;
var dhxPaymentddtClsCombo;

$(function() {
    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();
});

var cf_InitParam = function (){

	dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
	dhxCCalendarEndDate  = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
	dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.loadUserLanguage("ko");
    // 시스템 환경설정 검색 기간 설정
    gf_SettingDateInterval('searchSregDt', 'searchEregDt'); 
   
    dhxPaymentddtClsCombo = gf_MakeDhxCombo(
			'divPaymentddtClsComboBox', 
			'searchForm',
			150, 
			'combo/searchStmCode?codeclsCd=C064', 
			true, 
			'code', 
			'codeNm',
			'',
			'');
};

var cf_SetComponents = function (){

	var dhxGridBoxUserListInfo = [11]; 
	/*
	 *  @param header
	 * @param width
	 * @param align
	 * @param sort
	 * @param type	=	dyn, ed : editablel, txt, price, ch : checkbox, coro : combo? read only?, ra, ro : read-only
	 * @param hidden
	 * @param id
	 * @param attach
	 */
	//type	=	dyn, ed : editablel, txt, price, ch : checkbox, coro : combo? read only?, ra, ro : read-only
	dhxGridBoxUserListInfo[0]  = gf_MakeDhxGridHeader('번호',        '20',   'center',  'str', 'ro', false, 'rnum', '');
	dhxGridBoxUserListInfo[1]  = gf_MakeDhxGridHeader('선택',       '30',    'center',  'na', 'ch', false, 'selYn', '');
	dhxGridBoxUserListInfo[2]  = gf_MakeDhxGridHeader('급여항목코드',  '50',   'center','  str','ro',false,'salaryCd','');
	dhxGridBoxUserListInfo[3]  = gf_MakeDhxGridHeader('급여항목명',   '50',   'left','   str','ro',false,'salaryNm','');
	dhxGridBoxUserListInfo[4]  = gf_MakeDhxGridHeader('정렬순서',     '40',   'center',  'str','ro',false,'dspOdr','');
	dhxGridBoxUserListInfo[5]  = gf_MakeDhxGridHeader('지급/공제구분', '40',   'center',   'str','ro',false,'paymentddtClsNm','');
	dhxGridBoxUserListInfo[6]  = gf_MakeDhxGridHeader('사용시작일',    '80',   'center',  'str','ro',false,'useSdt','');
	dhxGridBoxUserListInfo[7]  = gf_MakeDhxGridHeader('급여항목내역',  '200',  'left',    'na', 'ro', false, 'salaryDesc', '');
	dhxGridBoxUserListInfo[8]  = gf_MakeDhxGridHeader('사용여부',     '50',   'center',  'na', 'ch', false, 'useYn', 'Y');
	dhxGridBoxUserListInfo[9]  = gf_MakeDhxGridHeader('일할계산여부',  '50',  'center',  'na', 'ch', false, 'dhalfCalcYn', '');
	dhxGridBoxUserListInfo[10] = gf_MakeDhxGridHeader('퇴직금대상여부', '50',  'center',  'na', 'ch', false, 'retireamtobjYn', '');
	
	
	dhxGrid = gf_MakeDhxGrid('dataList', dhxGridBoxUserListInfo, true, false, false);
	dhxGrid.enableAutoWidth(true);
	// block the edit operation return true; // allow the edit of the cell
	dhxGrid.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){ if(cInd==8||cInd==9||cInd==10) return false; });

	
	$("#userModifyForm").validate({
        errorElement: 'div'
    });
	
}

var cf_SetEventListener = function (){

	$('#btnSearch').unbind("click").bind("click",function(event){
		fn_InitSortParameter();
		fn_SearchBtn();
    });
	
	$('.txtDate').unbind("keyup").bind("keyup",function(event){
		gf_AutoDate(event, this);
	});
	$('.txtDate').unbind("keypress").bind("keypress",function(event){
		gf_AutoDate(event, this);
	});
	
	$('#btnSave').unbind("click").bind("click",function(event){
		fn_SaveSalaryCdPopup(0, 0);
    });
	
	$('#btnRemove').unbind("click").bind("click",function() {
		
		 var salaryCds = fn_CheckedSalaryCd();	
		 
		 if(gf_IsNull(salaryCds)) {
			 gf_DivMsgAlert('삭제할 급여항목코드를 체크해 주세요.');
			 return false;
		 } else {
			 if(confirm("정말로 삭제하시겠습니까?")) {
				 fn_RemoveSalaryCd(salaryCds);
			 }
		 }
	});

	$('#btnExcel').click(function() {
		fn_ExcelDown();
	});

	$('#btnClose').click(function() {
        gf_CloseParentActiveTab();
    });

    $('#userId').unbind("keypress").bind("keypress",function(event){
        if(event.charCode == 13) {
            $('#btnSearch').click();
        }
    });

    $('#userNm').unbind("keypress").bind("keypress",function(event){
        if(event.charCode == 13) {
            $('#btnSearch').click();
        }
    });

   	var sortDirection;
    var sortColumId;

    dhxGrid.attachEvent("onBeforeSorting", function(ind, type, direction){

    	if(gf_IsNull(sortDirection)) sortDirection = direction;
    	if(sortColumId != ind) sortDirection = direction;

    	if(sortDirection === 'desc' ) {
    		dhxGrid.setSortImgState(true, ind, 'asc');
    		sortDirection = 'asc';
    		sortColumId = ind;
    	}  else {
    		dhxGrid.setSortImgState(true, ind, 'desc');
    		sortDirection = 'desc';
    		sortColumId = ind;
    	}

    	if(ind === gf_GetDhxGridColumId(dhxGrid, 'rnum')){

    		dhxGrid.setSortImgState(false);
    		fn_InitSortParameter();

    	} else {

        	$('#paramForm input[name=sortOrder]').val(sortDirection);
        	$('#paramForm input[name=sortId]').val(gf_GetDhxGridColum(dhxGrid, sortColumId));

        	fn_SearchGridList();
    	}
    });

    dhxGrid.attachEvent('onRowDblClicked', fn_SaveSalaryCdPopup);
};

var cf_SetBinding = function (){
	fn_SearchGridList();
};

var cf_InitForm = function (){};

var fn_SearchBtn = function (){
	fn_SearchGridList();
}

var fn_SearchGridList = function (){
	var jsonParameter = {
		salaryCd		: gf_FormGetValue('searchForm', 'salaryCd', ''),
		salaryNm		: gf_FormGetValue('searchForm', 'salaryNm', ''),
		useYn			: gf_FormGetValue('searchForm', 'useYn', 'radio'),
		paymentddtCls	: dhxPaymentddtClsCombo.getSelectedValue()
   	};

	gf_Transaction('gridList', 'mpsmng001/searchMpsSalaryCd', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
	if(!gf_IsNull(data.data.records)){

		dhxGrid.clearAll();
		dhxGrid.parse(data.data.records, 'js');

		gf_PageNate(data.data,'.paginateDataList','fn_SearchGridListPage');

		var sortDirection = $('#paramForm input[name=sortOrder]').val();
		var sortColumId = $('#paramForm input[name=sortId]').val();

		if(!gf_IsNull(sortDirection) && !gf_IsNull(sortColumId)){
			dhxGrid.setSortImgState(true,gf_GetDhxGridColumId(dhxGrid, sortColumId), sortDirection);
		}

	}else{
		gf_DivMsgAlert('조회되는 데이터가 없습니다.');
	}
};

var fn_SearchGridListPage = function (pageIndex){
	$('#paramForm input[name=listPageIndex]').val(pageIndex);
	fn_SearchGridList();
};

var fn_SaveSalaryCdPopup = function (rId, cInd) {
	
	var salaryCd = ""; 
	var title  = "급여항목코드 등록";
	
	//선택된 row가 없을 경우 0
	if (rId > 0) {
		salaryCd = dhxGrid.cells(rId, 2).getValue();
		title = "급여항목코드 수정";
	}
	
	//저장팝업
	var dhxWindowObj;
	if($('body').find("div[id='bpopup']").size() <= 0) {
		$('body').append('<div id="bpopup"><div class="b-close" style="display:none"></div></div>');
	}
	$('#bpopup').bPopup({
		onOpen:function(){
			dhxWindows = dhxDeptPopupWindow = null;
			dhxWindows = new dhtmlXWindows();

			var id 		= 'userSavePopup';
			var ajaxUrl = gv_ContextPath+'/mpsmng001/popup/saveMpsSalaryCd/view?salaryCd='+salaryCd;

			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 500;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('.b-close').click();
			});
		},
		onClose:function(){
			$('.dhxwin_active').remove();
			$('body').find("div[id='bpopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

var fn_CheckedSalaryCd = function (){
	var salaryCds = [];
	dhxGrid.forEachRow(function(rowId) {				
		if(dhxGrid.cells(rowId,0).isChecked()){		
			salaryCds.push( dhxGrid.cells(rowId,2).getValue() );				
		}		
	});
	return salaryCds;
};
/*
var fn_ModifyUser = function (){
	if($("#userModifyForm").validate().form()){
		var jsonParameter = {
			userId		: $('#userModifyForm input[name="userId"]').val(),
			empno		: $('#userModifyForm input[name="empno"]').val(),
			userPassword: $('#userModifyForm input[name="userPassword"]').val(),
			userNm		: $('#userModifyForm input[name="userNm"]').val(),
			userIp		: $('#userModifyForm input[name="userIp"]').val(),
			emplAt		: (gf_FormGetValue('userModifyForm', 'emplAt', 'chkboxYN') === 'Y') ? '1':'0',
			useAt		: (gf_FormGetValue('userModifyForm', 'useAt', 'chkboxYN') === 'Y') ? '1':'0'
			//roleCode	: dhxUserRoleCombo.getSelectedValue()
		};
		var dataSource = gf_NoAsyncTransaction('stmmng001/modifyStmUsers', jsonParameter, 'POST');  			
		if(dataSource.code === '000') {
			gf_DivMsgAlert('수정 되었습니다.');
			fn_SearchGridList();
			cf_InitForm();
		} else {
			gf_DivMsgAlert('수정 되지 않았습니다.');
		}
	}
}; */

var fn_RemoveSalaryCd = function (salaryCds){
	
	var jsonParameter = {
		salaryCds: salaryCds.join(',')
	};	
	
	var dataSource = gf_NoAsyncTransaction('mpsmng001/removeMpsSalaryCd', jsonParameter, 'POST');
	if(dataSource.code === '000') {
		gf_DivMsgAlert('삭제 되었습니다.');
		fn_SearchGridList();
		cf_InitForm();
	} else {
		gf_DivMsgAlert('삭제 되지 않았습니다.');
	}
};

var fn_InitSortParameter = function (){
	$('#paramForm input[name=listPageIndex]').val('1');
	$('#paramForm input[name=sortDirection]').val('');
	$('#paramForm input[name=sortColumId]').val('');
};

var fn_ExcelDown = function () {
	
	var jsonParameter = {
			salaryCd		: gf_FormGetValue('searchForm', 'salaryCd', ''),
			salaryNm		: gf_FormGetValue('searchForm', 'salaryNm', ''),
			paymentddtCls	: dhxPaymentddtClsCombo.getSelectedValue()
	};
	
    var header =    [ [ '급여항목코드','급여항목명','정렬순서','지급/공제구분','사용시작일','급여항목내역','사용여부','일할계산여부','퇴직금대상여부' ] ];
    var dataId =    [ [ 'salaryCd','salaryNm','dspOdr','paymentddtClsNm','useSdt','salaryDesc','useYn', 'dhalfCalcYn','retireamtobjYn' ] ];
    //left는 공백('') 해도 상관없다.
    var dataAlign = [ [ 'center','left','center','center','center','','center', 'center','center' ] ];
    var sheetNm =   [ [ '급여항목코드' ] ];
    var param 	=   [ [ $.param( jsonParameter ) ]];
    var fileNm = '급여항목코드';

    var jsonParameter = {
        headers : header,
        dataIds : dataId, 
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mpsmng001/excelMpsSalaryCd', jsonParameter);
};
