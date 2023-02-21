<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
<script>
var dhxTreeMenuPopup;
var dhxTreeMenuCheckAllStatus = false; 

$(function() {	
    cf_InitParamPopupMenu();
    cf_SetComponentsPopupMenu();
    cf_SetEventListenerPopupMenu();
    cf_SetBindingPopupMenu();
    cf_InitFormPopupMenu();
});

function cf_InitParamPopupMenu(){}
function cf_SetComponentsPopupMenu(){
	
	var dhxGridTreeMenuInfo = [3];	
	dhxGridTreeMenuInfo[0] = gf_MakeDhxGridHeader('부서코드', '150', 'center', 'str', 'ro', false, 'deptCode', '');	
	dhxGridTreeMenuInfo[1] = gf_MakeDhxGridHeader('부서명',   '250','left','na', 'ro', false, 'deptKorNm', '');
	dhxGridTreeMenuInfo[2] = gf_MakeDhxGridHeader('','*','center','str', 'ro', false, '', '');
	dhxTreeMenuPopup = gf_MakeDhxGrid('gridPopupMenu', dhxGridTreeMenuInfo, false, false, false);	
	dhxTreeMenuPopup.attachEvent("onRowDblClicked", function(rId,cInd){
	     var formId   = $("#bpopup").attr("formId");
	     var codeId   = $("#bpopup").attr("codeId");
	     var codeNmId = $("#bpopup").attr("codeNmId");
	     var obj = "";
	     if(formId != "" && codeId != ""){
	    	 obj = '#' + formId + " #" + codeId;
	    	 $(obj).val(dhxTreeMenuPopup.cells(rId, 0).getValue());   //부서코드
	     } 
	     if(formId != "" && codeNmId != ""){
	    	 obj = '#' + formId + " #" + codeNmId;
	    	 $(obj).val(dhxTreeMenuPopup.cells(rId, 1).getValue());   //부서코드
	    } 
		$('.b-close').click();
	});
}

function cf_SetEventListenerPopupMenu(){
 	
	$('#deptKorNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode ===13)  {
			fn_SearchPopupDept();
	    }
    });
}

function cf_SetBindingPopupMenu(){
	fn_SearchPopupDept();   	 
}

function cf_InitFormPopupMenu(){}

function fn_SearchPopupDept(){    	
	var jsonParameter = {
			deptKorNm : $('#searchFormPopupMenu input[name="deptKorNm"]').val(),
			useAt     : gf_FormGetValue('searchFormPopupMenu', 'useAt', 'radio')
	};
	var dataSource = gf_NoAsyncTransaction('mhshrm008/searchMhsDept', jsonParameter, 'GET');
	dhxTreeMenuPopup.clearAll();
    if(!gf_IsNull(dataSource.data.records)){	
		dhxTreeMenuPopup.parse(dataSource.data.records, 'js');	
    }
}
</script>
</script>
 
<div class="pop-content">	 
	<div>
		
		<div class="search_box" id="searchFormPopupMenu">
			<table>
			<tr>
				<th><label for="docmT">부서코드 또는 부서명</label>
				</th>
				<td><input type="text" id="deptKorNm" name="deptKorNm" class="w390 ml5" />
				</td>
				<td><div class="switch-field">
			                <input type="radio" id="switch_3_center" name="useAt" value="1" checked>
			                <label for="switch_3_center">사용</label>
			                <input type="radio"  id="switch_3_right" name="useAt" value="0">
			                <label for="switch_3_right">미사용</label>
			        </div>
				</td>
			</table>    
		</div>
		
		<div>
			<div id="gridPopupMenu" style="width: 100%; height: 350px"></div>
		</div>
	</div>
</div>
</body>
