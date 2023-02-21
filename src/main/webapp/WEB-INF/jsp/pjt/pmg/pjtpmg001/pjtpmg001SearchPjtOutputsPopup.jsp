<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
<script>
var projectSn = '${projectSn}';
var ouputsType = '${ouputsType}';
var step = '${step}';

var cf_InitParamPjtOutputsPopup = function(){
	returnPjtOutputsArr = [];
};

var dhxGridPjtOutputsPopup;
var cf_SetComponentsPjtOutputsPopup = function(){
	var dhxGridHeader = [];
	dhxGridHeader.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPjtOutputsPopup"/>', '30', 'center', 'na', 'ch', false, 'pjtOutputsCheckAllPopup', ''));
	dhxGridHeader.push(gf_MakeDhxGridHeader('산출물', '*', 'left', 'str', 'tree', false, 'outputsNm', ''));
	dhxGridHeader.push(gf_MakeDhxGridHeader('id', '*', 'left', 'str', 'ro', true, 'id', ''));
	dhxGridHeader.push(gf_MakeDhxGridHeader('parentId', '*', 'left', 'str', 'ro', true, 'parentId', ''));
	dhxGridHeader.push(gf_MakeDhxGridHeader('outputsGb', '*', 'left', 'str', 'ro', true, 'outputsGb', ''));
	dhxGridPjtOutputsPopup = gf_MakeDhxGrid('treeGridListpjtOutputsPopup', dhxGridHeader, true, false, false);
	//dhxGridPjtOutputsPopup.setEditable(false);
};

var cf_SetEventListenerPjtOutputsPopup = function(){
	
    dhxGridPjtOutputsPopup.attachEvent("onCheck", function(rId, cInd, state){     
        fn_MenuCheckAllOnDhxGridPjtOutputsPopup(rId, cInd, state);         
    });
    
    dhxGridPjtOutputsPopup.attachEvent("onRowDblClicked", function(rId,cInd){
    	var returnArr = fn_DoubleClickPjtOutputsPopup(rId);
    	if(!gf_IsNull(returnArr)) {
            returnPjtOutputsArr = [];
    		returnPjtOutputsArr = fn_DoubleClickPjtOutputsPopup(rId);
    		$('#pjtOutputsPopup .b-close').click();
    	}
    });
    
    $('#checkAllPjtOutputsPopup').unbind('click').bind('click',function() { 
    	fn_CheckedCheckAllPjtOutputsPopup(gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'pjtOutputsCheckAllPopup'), $(this).is(":checked")); 
    });
    $('#btnComfirmPjtOutputsPopup').unbind('click').bind('click', function() {
    	returnPjtOutputsArr = [];
    	returnPjtOutputsArr = fn_CheckedPjtOutputsPopup();
    	$('#pjtOutputsPopup .b-close').click();
    });
    $('#btnClosePjtOutputsPopup').unbind('click').bind('click', function() {        
    	returnPjtOutputsArr = [];
    	$('#pjtOutputsPopup .b-close').click();
    });
};

var cf_SetBindingPjtOutputsPopup = function(){
	fn_SearchPjtOutputsPopup(ouputsType);
};

var cf_InitFormPjtOutputsPopup = function(){};
/*****************************************************조회***********************************************************************/
var fn_SearchPjtOutputsPopup = function(outputSe) {          
    var jsonParameter = { projectSn:projectSn, outputSe : outputSe };
    gf_Transaction(jsonParameter, 'pjtpmg001/popup/searchPjtOutputsTree', jsonParameter, 'fn_CallbackSearchPjtOutputsPopup', false, 'GET');
};

var rootOutputsId = 'ROOT';
var fn_CallbackSearchPjtOutputsPopup = function(strSvcID, targetID, data) {
    var pjtOutputs = data.data.records;
    //$("#spanCntPjtOutputsPopup").text(pjtOutputs.length);
    if(!gf_IsNull(pjtOutputs)){
        var dataList = [];
        var dataObj = {};    
        pjtOutputs.forEach(function(outputs) {
        	dataObj = {};
        	dataObj.id = outputs.id;
        	dataObj.parentId = outputs.parent;
        	dataObj.outputsGb = outputs.outputsGb;
        	dataObj.pjtOutputsCheckAllPopup = outputs.pjtOutputsCheckAllPopup;
            if(outputs.outputsGb == 'M') {
            	dataObj.outputsNm = {
                    value: outputs.outputsNm,
                    image: 'folder.gif'
                };
            } else {
            	dataObj.outputsNm = outputs.outputsNm;
            }
            dataList.push(dataObj);            
        });
        gf_NoFoundDataOnGridMsgRemove('treeGridListpjtOutputsPopup');        
        var outputsTree = gf_TreeModel(dataList, rootOutputsId);
        dhxGridPjtOutputsPopup.clearAll();
        dhxGridPjtOutputsPopup.parse(JSON.stringify(outputsTree),'js');
        dhxGridPjtOutputsPopup.openItem(rootOutputsId);
        //dhxGridPjtOutputsPopup.expandAll();
        fn_OpenItemPjtOutputsPopup(step);
        fn_CheckedDisabledPjtOutputsPopup();
    } else {
        dhxGridRoleMenu.clearAll();
        gf_NoFoundDataOnGridMsg('treeGridListpjtOutputsPopup');
    }
};
/*****************************************************체크박스 핸들러*****************************************************************/
var fn_MenuCheckAllOnDhxGridPjtOutputsPopup = function(rId, cInd, state){
	fn_ParentCheckedPjtOutputsPopup(rId, cInd, state);
    fn_SubCheckedPjtOutputsPopup(rId, cInd, state);
};

var fn_SubCheckedPjtOutputsPopup = function(rId, cInd, state){   
    var subItems = dhxGridPjtOutputsPopup.getSubItems(rId);    
    if(!gf_IsNull(subItems)) {
        var subItemArr = subItems.split(',');
        subItemArr.forEach(function(item) {        	
        	if(!dhxGridPjtOutputsPopup.cells(item, cInd).isDisabled()){        	
        		   dhxGridPjtOutputsPopup.cells(item, cInd).setChecked(state);                         
        		   fn_SubCheckedPjtOutputsPopup(item, cInd, state);
        	}
        });
    }
};

var fn_ParentCheckedPjtOutputsPopup = function(rId, cInd, state) {
    var loop = true;
    var cell;
    var parentId = rId;
    var isChecked;
    var parentIdSubItems;
    while(loop) {
        parentId = dhxGridPjtOutputsPopup.getParentId(parentId)
        if(parentId === null || parentId === 0 || parentId == rootOutputsId) {
            loop = false;
        } else {
            isChecked = false;
            parentIdSubItems = dhxGridPjtOutputsPopup.getSubItems(parentId);
            if(!gf_IsNull(parentIdSubItems)) {
                parentIdSubItemsArr = parentIdSubItems.split(',');
                parentIdSubItemsArr.forEach(function(item) {
                    if(dhxGridPjtOutputsPopup.cells(item,cInd).isChecked()) {
                        isChecked = true;
                    }
                });
                if(!dhxGridPjtOutputsPopup.cells(parentId, cInd).isDisabled()){
                    if(isChecked) {
                    	dhxGridPjtOutputsPopup.cells(parentId,cInd).setChecked(true);
                    } else {
                    	dhxGridPjtOutputsPopup.cells(parentId,cInd).setChecked(false);
                    }
                }
            }
        }
    }
};

var fn_CheckedCheckAllPjtOutputsPopup = function(columId, rowValue){   
    if(!gf_IsNull(rowValue)) {         
    	dhxGridPjtOutputsPopup.forEachRow(function(rowId) {
    		if(!dhxGridPjtOutputsPopup.cells(rowId,columId).isDisabled()) {
    		    dhxGridPjtOutputsPopup.cells(rowId,columId).setValue(rowValue); 
    		}
    	});
    }
};

var fn_CheckedPjtOutputsPopup = function(){  
    var outputsArr = [];
    var outputs = [];
    dhxGridPjtOutputsPopup.forEachRow(function(rowId) {                
    	outputs = [];
    	if(!dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'pjtOutputsCheckAllPopup')).isDisabled() &&
    	    dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'pjtOutputsCheckAllPopup')).isChecked()) {
        	if(dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'outputsGb')).getValue() == 'P') {
            	outputs.push(dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'parentId')).getValue());
            	outputs.push(dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'id')).getValue());
            	outputsArr.push(outputs.join('#'));
            }
        }
    });
    return outputsArr.join('|');
};

var fn_DoubleClickPjtOutputsPopup = function(rowId){  
    
	if(!dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'pjtOutputsCheckAllPopup')).isDisabled() &&
	    dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'outputsGb')).getValue() == 'P') {	
    	var outputsArr = [];
        var outputs = [];
        outputs.push(dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'parentId')).getValue());
        outputs.push(dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'id')).getValue());
        outputsArr.push(outputs.join('#'));
        return outputsArr.join('|');
	} else {
		return [];
	}
};

var fn_CheckedDisabledPjtOutputsPopup = function(){  
	dhxGridPjtOutputsPopup.forEachRow(function(rowId) { 
		if( dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'outputsNm')).getValue() != "기타"){
	        if( dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'pjtOutputsCheckAllPopup')).isChecked()) {
	        	dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'pjtOutputsCheckAllPopup')).setDisabled(true);
	        	dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'outputsNm')).setDisabled(true);
	        }
		} else {
			dhxGridPjtOutputsPopup.cells(rowId,gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'pjtOutputsCheckAllPopup')).setChecked(false);
		}
    }); 
}
/*****************************************************공통함수 호출*****************************************************************/
var fn_OpenItemPjtOutputsPopup = function(gb){      
    var id;
	dhxGridPjtOutputsPopup.forEachRow(function(rowId) {                
    	id = dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'id')).getValue();
    	if(id.indexOf(gb) > -1) {
            dhxGridPjtOutputsPopup.openItem(dhxGridPjtOutputsPopup.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputsPopup,'id')).getValue());
    	}
    });
}

$(function() {
    cf_InitParamPjtOutputsPopup();
    cf_SetComponentsPjtOutputsPopup();
    cf_SetEventListenerPjtOutputsPopup();
    cf_SetBindingPjtOutputsPopup();
    cf_InitFormPjtOutputsPopup();
});
</script>

<div class="pop-content">
 
    <div class="tabl_box">
        <div style="float: left; width: 100%">
            <div class="list_type01">                 
                <div>
                    <div id="treeGridListpjtOutputsPopup" style="width:100%; height:420px"></div>
                </div>
                <div class="popup_footer_box">
                    <button type="button" id="btnComfirmPjtOutputsPopup" name="btnEmpPupupOk">
                          <span class="glyphicon glyphicon-ok f15 mr5"></span>확인<!--<taglibs:transText progrmId="default" key="btnClose" /> --> 
                    </button>
                    <button type="button" id="btnClosePjtOutputsPopup" name="btnEmpPupupClose">
                          <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                    </button>
                </div>
            </div>
        </div>
    </div>
	
</div>

</body>
