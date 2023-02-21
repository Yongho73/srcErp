<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%> 
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

<script>

$(function() {   
    cf_SetComponents();      
});                                      

var cf_SetComponents = function (){ 

	// divId, selectId,  selectName, placeHolder, codekindCode, exceptCode, selectStyle, selectClass, sortOrder
    gf_ComboCode('divComboSysSe', 'searchComboSysSe', 'searchComboSysSe', 'search', 'C001', '' , '', '', 'asc', '');
    
	gf_ComboCode('divComboDetailSysSe', 'searchComboDetailSysSe', 'searchComboDetailSysSe', 'add', 'C001', 'MFS,MVS' , '', '', 'desc', 'required');
    	
	gf_MakeComboBasic('deptNmSearchAreaTd','comboDeptNmSearchArea','search','width:140px','stmmng001/combo/dept'); // 부서 커스텀 콤보
    
};


</script>

공통코드 콤보
<div id="divComboSysSe"></div>

<br/>

공통코드 콤보 (내림차순정렬, 코드제외, validation 옵션)
<div id="divComboDetailSysSe"></div>

<br/>

커스텀 콤보
<div id="deptNmSearchAreaTd"></div>

<br/>

		
</body>																														   