/**
 * 프로그램 : 그룹권한등록 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.16
 * 사용테이블 : STM_ROLE
 **/

var dhxGridStmRole;
var dhxGridStmRoleListInfo;
var roleCode = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var keyDuplication = true;
var titStmRole = gf_LocaleTrans('default','titStmRole');

var divComboRoleCode;

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("STMMNG005");
 
    divComboRoleCode = gf_MakeDhxCombo( //그룹권한코드 
    	    'divComboRoleCode',
    	    'saveFormStmRole',
    	    150,
    	    'combo/searchStmCode?codekindCode=C008',
    	     true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');  
    

};


var cf_SetComponents = function (){

    var dhxGridStmRoleListInfo = [];
    dhxGridStmRoleListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'rnum', '')); // 번호
    dhxGridStmRoleListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRoleCode'), '250', 'center', 'str', 'ro', false, 'roleCode', '')); // 역할 코드
    dhxGridStmRoleListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRoleNm'), '250', 'center', 'str', 'ro', false, 'roleNm', '')); // 역할 명
    dhxGridStmRoleListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseAt'), '*', 'center', 'na', 'ch', false, 'useAt', '')); // 사용 여부

    dhxGridStmRole = gf_MakeDhxGrid('dataList', dhxGridStmRoleListInfo, true, false, false);

    dhxGridStmRole.enableAutoWidth(true);
    dhxGridStmRole.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });

    dhxGridStmRole.attachEvent('onRowSelect', fn_SaveStmRole);

    $("#saveFormStmRole").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

	//검색조건_사용자id
    $('#roleNm').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) {
            $('#searchFormStmRole #btnSearch').click();
        }
    });

    $('#searchFormStmRole #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('#btnAdd').unbind('click').bind('click', function(event){
          dhxGridStmRole.clearSelection();
          if(!fadeRegs) {
              $('#saveForm').fadeOut(gv_FadeTime, function() {
                  cf_InitInputForm();
                  fadeRegs = true;
                  fadeMode = false;
                  keyDuplication = true;
                  $('.checkDupBtn').show();
              });
              $('#saveForm').fadeIn(gv_FadeTime, function() {});
          } else {
              cf_InitInputForm();
          }
    });

    $('#btnRemove').unbind('click').bind('click', function() {
       // var roleCodes = fn_CheckStmRole('roleCode');
        var roleCodes = divComboRoleCode.getSelectedValue();
        if( gf_IsNull(roleCodes) ) {
             gf_DivMsgAlert(gv_MsgDelKey);
             return false;
        } else {
            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveAll()', '');
        }
    });


    $('#btnClose').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });

    $('#btnSave').unbind('click').bind('click', function() {
    	
    	if(keyDuplication) {
    		gf_DivMsgAlert('중복확인을 해주세요.');
    		return false;
    	}
    		
        if($('#saveFormStmRole').validate().form()){

            var jsonParameter = {
            		roleCode : divComboRoleCode.getSelectedValue(),
            		roleNm : gf_FormGetValue('saveFormStmRole', 'roleNm', 'text'),
            		useAt : gf_FormGetValue('saveFormStmRole', 'useAt', 'chkboxYN')
                
            };

            var url;

            if( !gf_IsNull(roleCode) ) {
                url = "stmmng005/modifyStmRole";
            } else {
                url = "stmmng005/saveStmRole";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(roleCode)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormStmRole div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });


    $('#btnFormReset').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
    
    $('#btnCheckDup').unbind("click").bind("click",function() {
    	fn_FindSameKey();
    }); 
};

var cf_SetBinding = function (){
    fn_SearchGridList();
};

var cf_InitForm = function (){};

var cf_InitInputForm = function (){

    roleCode = '';

    $("#h4_pr_title").text(titStmRole + ' ' + gv_TitRegist);
    $('#saveFormStmRole input[name="roleCode"]').removeAttr("disabled");
    //$('.tdl-2 #btnSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    divComboRoleCode.unSelectOption();

    gf_FormSetValue('saveFormStmRole', 'roleNm', '', 'text');
    gf_FormSetValue('saveFormStmRole', 'useAt', true, 'chkbox');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
    	roleNm : gf_FormGetValue('searchFormStmRole', 'roleNm', 'text'),       
    };

    gf_Transaction('gridList', 'stmmng005/searchStmRole', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridStmRole.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridStmRole.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveStmRole = function (rId, cInd) {
    roleCode = '';
    var title = titStmRole + ' ' + gv_TitRegist;

    if (rId > 0) {
    roleCode = '';
    roleCode = dhxGridStmRole.cells(rId, 1).getValue();
        title = titStmRole  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputStmRole();
            fadeMode = true;
            fadeRegs = false;
            keyDuplication = false;
            $('.checkDupBtn').hide();
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputStmRole();
     }
};

var fn_CheckStmRole = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridStmRole, col);
    dhxGridStmRole.forEachRow(function(rowId) {
        if(dhxGridStmRole.cells(rowId,0).isChecked()){
            resArr.push( dhxGridStmRole.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var roleCodes = [];
    roleCodes.push( roleCode );
    fn_RemoveStmRole( roleCodes );
};

var fn_RemoveAll = function(){
    //var roleCodes = fn_CheckStmRole('roleCode');
    var roleCodes = divComboRoleCode.getSelectedValue();
    fn_RemoveStmRole( roleCodes );
};

var fn_RemoveStmRole = function ( roleCodes ){
    var jsonParameter = {
       // roleCodes : roleCodes.join(',')
        roleCodes : roleCodes
    };

    var dataSource = gf_NoAsyncTransaction('stmmng005/removeStmRole', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};


var fn_SearchInputStmRole = function (){

    if( !gf_IsNull(roleCode) ) {

        var jsonParameter = {
            roleCode : roleCode 
        };

        var dataSource = gf_NoAsyncTransaction('stmmng005/findStmRole', jsonParameter, 'GET');
        var data = dataSource.data;
                
        gf_FormSetValue('saveFormStmRole', 'roleNm', data.roleNm, 'text');
        gf_FormSetValue('saveFormStmRole', 'useAt', (( data.useAt == '1') ? true : false), 'chkbox');

        gf_DhxSetValue(divComboRoleCode,"combox",data.roleCode,'','');
        
        $('#saveFormStmRole input[name="roleCode"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        //$('#btnSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        //$('#btnSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};


var fn_FindSameKey = function(){
	
	var key = divComboRoleCode.getSelectedValue();

	if(gf_IsNull(key)) {
		gf_DivMsgAlert('역활 코드를 입력해 주세요.');		 
		$('#saveFormStmRole #roleCode').focus();
		return false;
	}
	var jsonParameter = {
		roleCode: key
	};	
	var dataSource = gf_NoAsyncTransaction('stmmng005/findStmRole', jsonParameter, 'GET');  			
	var data = dataSource.data;
	
	if(dataSource.code === '000') {
 
		if(gf_IsNull(data.roleCode)) {
			gf_DivMsgAlert('등록 가능한 KEY입니다.');
			keyDuplication = false;
			return true;
		} else {
			gf_DivMsgAlert('동일한 KEY가 존재합니다.');
			keyDuplication = true;
			return false;
		}
	} else {
		gf_DivMsgAlert('중복확인이 되지 않습니다.');
		return false;
	}
}
