<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%> 
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
																
<body>															
	
<script>
	
	$(function() {
		cf_InitParam();
		cf_SetComponents();
		fn_FileUploadBtnEvent();		
	});

	var cf_InitParam = function() {
	    //gf_SetMenuPath();
	};

	var dhxGrid;
	var cf_SetComponents = function() {
	    var dhxGridHeaderInfo = [];
	    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('근무유형코드', '100', 'center', 'str', 'ro', false, 'workTyCode', '', ''));
	    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('근무유형명', '*', 'center', 'str', 'ro', false, 'workTyCodeNm', '', ''));
	    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ch', false, 'useAt', '', ''));
	    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('기본유형여부', '100', 'center', 'str', 'ch', false, 'bassTyAt', '', ''));
	    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('산정기간', '100', 'center', 'str', 'ro', true, 'calcPd', '', ''));
	    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('CORE TIME 적용여부', '100', 'center', 'str', 'ro', true, 'coreTimeApplcAt', '', ''));
	    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('출근확인여부', '100', 'center', 'str', 'ro', true, 'attendConfirmAt', '', ''));
	    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('1일 인정 근무시간', '100', 'center', 'str', 'ro', true, 'dayRecogWorktime', '', '')); 
	    dhxGrid = gf_MakeDhxGrid('dataList', dhxGridHeaderInfo, true, false, false);
	    dhxGrid.enableAutoWidth(true);
	    
	    fn_Search('');
	    
	    $('#btnExcel').unbind('click').bind('click', function() {
	        fn_Excel();
	    });
	};
	
	var fn_FileUploadBtnEvent = function(){
		
		$('#fileUpload1').unbind("click").bind("click",function(event){
		    /*
			*  startRowNum : 엑셀파일에서 잃어들일 첫번째 라인의 번호
			 * maxRowNum : 엑셀파일에서 잃어들일 최대 라인의 번호, 0,null 입력 시 99999 으로 설정 됨
			 * colTitle : 리턴받을 컬럼ID 지정, 엑셀 다운로드한 그리드의 ID = 그리드 생성에 사용된 컬럼 ID를 구분자 "|"로 구분하여 순서대로 입역
			 *    ex:) "workTyCode|workTyCodeNm|useAt|bassTyAt|calcPd|coreTimeApplcAt|attendConfirmAt|dayRecogWorktime"
			 * dhxGrid : 엑셀파일 업로드 결과를 보여줄 그리드 ID, 그리드 자체를 넘겨야 함
			 * strCallbackFunc : callback 함수 이름
			 ****** dhxGrid 또는 callback 중 하나는 입력 되어야 함
			 ****** 업로드 받은 결과의 정합성은 각 프로그램별로 검증 해야 함 : 컬럼 수가 요청한 컬럼수보다 많으면 무조건 업로드 처리 하므로 다른 파일이 업로드 되도 성공으로 처리 함
			 */
			var startRowNum = 2;
		    var maxRowNum = 1000;
		    var colTitle = "workTyCode|workTyCodeNm|useAt|bassTyAt|calcPd|coreTimeApplcAt|attendConfirmAt|dayRecogWorktime";
		    var strCallbackFunc = "fn_CallbackExcelUpload";
			gf_ExcelUpload (startRowNum, maxRowNum, colTitle, dhxGrid, strCallbackFunc);
		});
	};
	var fn_CallbackExcelUpload = function (dataSource){
		if(!gf_IsNull(dataSource.data)){
			  dataSource.data.forEach(function(item){  
				   console.log(item.workTyCode + " : " + item.workTyCodeNm);
			  });
		}
	};

	var fn_Search = function(userId) {
	    var jsonParameter = {
	        workTyCode : '',
	        useAt :    ''
	    };
	    gf_Transaction(userId, 'mhsflx001/searchMhsflx001', jsonParameter, 'fn_CallbackSearch', false, 'GET');
	};
	
	var fn_CallbackSearch = function(strSvcID, targetID, data) {
		dhxGrid.clearAll();
	    if(!gf_IsNull(data.data.records)){
	    	dhxGrid.parse(data.data.records, 'js');
	    	dhxGrid.selectRow(0);
	    };
	};
	
	var fn_Excel = function () {
	    var titMhsflx001 = '근무유형관리'; /* gf_LocaleTrans('default', 'titMhsflx001') */
	    var jsonParameter = {
	        workTyCode : ''
	    };
	    var header = [[
	        '근무유형코드' /* gf_LocaleTrans('default', 'titWorkTyCode') */,
	        '근무유형명' /* gf_LocaleTrans('default', 'titWorkTyCodeNm') */,
	        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
	        '기본유형여부' /* gf_LocaleTrans('default', 'titBassTyAt') */,
	        '산정기간' /* gf_LocaleTrans('default', 'titCalcPd') */,
	        '(선택적근로시간제)CORE TIME적용여부' /* gf_LocaleTrans('default', 'titCoreTimeApplcAt') */,
	        '(재량 근로시간제)출근확인여부' /* gf_LocaleTrans('default', 'titAttendConfirmAt') */,
	        '(재량 근로시간제)1일인정근무시간' /* gf_LocaleTrans('default', 'titDayRecogWorktime') */
	    ]];
	    var dataId = [[ 'workTyCode', 'workTyCodeNm', 'useAt', 'bassTyAt', 'calcPd', 'coreTimeApplcAt', 'attendConfirmAt', 'dayRecogWorktime' ]];
	    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
	    var sheetNm = [[ titMhsflx001 ]];
	    var param = [[ $.param( jsonParameter ) ]];
	    var fileNm = titMhsflx001;
	    jsonParameter = {
	        headers : header,
	        dataIds : dataId,
	        dataAligns : dataAlign,
	        sheetNms : sheetNm,
	        fileNm : fileNm,
	        params : param
	    };
	    gf_ExcelDown('mhsflx001/excelMhsflx001', jsonParameter);
	};

</script>

<div class="dhxwin_hdr">Excel 업로드</div>
<div class="pop-content">
	<table class="li_type02">
		<colgroup>
			<col width="300" />
			<col width="" />
		</colgroup>
		<tr>
			<td class="ar">
                <button type="button" class="btn_common02" id="fileUpload1"><span class="glyphicon glyphicon-paperclip"></span>Excel Upload</button>
                <button type="button" class="btn_common02" id="btnExcel"><span class="glyphicon glyphicon-paperclip"></span>Excel Download</button>
            </td>
            <td class="ar"> </td>
        </tr>
	</table>
    <div class="div_line" id="dataList" style="height:calc(100vh - 120px); position:relative; width:inherit !important">
    </div>
	
</div>														
 																			   
</body>																														   