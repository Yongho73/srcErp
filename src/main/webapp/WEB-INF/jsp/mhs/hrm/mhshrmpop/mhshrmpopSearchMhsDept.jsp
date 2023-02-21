<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script>
    var dhxGridMhsDept;
    var dhxGridMhsDeptListInfo;
    var cf_InitParamMhsDept = function (){};
    var cf_SetComponentsMhsDept = function (){

        var dhxGridMhsDeptListInfo = [];
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCode'), '150', 'center', 'str', 'ro', false, 'deptCode', '')); // 부서 코드
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptKorNm'), '150', 'center', 'str', 'ro', false, 'deptKorNm', '')); // 부서 한글 명
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptEngNm'), '150', 'center', 'str', 'ro', false, 'deptEngNm', '')); // 부서 영문 명
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptAbrv'), '150', 'center', 'str', 'ro', false, 'deptAbrv', '')); // 부서 약어
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBplcCode'), '150', 'center', 'str', 'ro', false, 'bplcCode', '')); // 사업장 코드
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUpperDeptCode'), '150', 'center', 'str', 'ro', false, 'upperDeptCode', '')); // 상위 부서 코드
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptLvl'), '150', 'center', 'str', 'ro', false, 'deptLvl', '')); // 부서 레벨
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOrgnztLvl'), '150', 'center', 'str', 'ro', false, 'orgnztLvl', '')); // 조직 레벨
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptTelno'), '150', 'center', 'str', 'ro', false, 'deptTelno', '')); // 부서 전화번호
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptFaxTelno'), '150', 'center', 'str', 'ro', false, 'deptFaxTelno', '')); // 부서 FAX 전화번호
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseBeginDe'), '150', 'center', 'str', 'ro', false, 'useBeginDe', '')); // 사용 시작 일자
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseAt'), '150', 'center', 'na', 'ch', false, 'useAt', '')); // 사용 여부
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptSe'), '150', 'center', 'str', 'ro', false, 'deptSe', '')); // 부서 구분
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOutptOrdr'), '150', 'center', 'str', 'ro', false, 'outptOrdr', '')); // 출력 순서
        dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

        dhxGridMhsDept = gf_MakeDhxGrid('dataListMhsDept', dhxGridMhsDeptListInfo, true, false, false);
        dhxGridMhsDept.enableAutoWidth(true);
        dhxGridMhsDept.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
            if(cInd == 0) return true;
            else return false;
        });

        dhxGridMhsDept.attachEvent('onRowSelect', fn_SelectMhsDept);    
    };

    var cf_SetEventListenerMhsDept = function (){};
    var cf_SetBindingMhsDept = function (){
        fn_SearchGridMhsDeptList();
    };

    var cf_InitFormMhsDept = function (){};


    var fn_SearchGridMhsDeptList = function (){

        var jsonParameter = {                 
        };
        
        gf_Transaction('gridList', 'mhshrmpop/searchMhsDept', jsonParameter, 'fn_CallbackSearchGridMhsDeptList', false, 'GET');
    };

    var fn_CallbackSearchGridMhsDeptList = function (strSvcID, targetID, data){
        
    	dhxGridMhsDept.clearAll();
        
    	if(!gf_IsNull(data.data.records)){
            dhxGridMhsDept.parse(data.data.records, 'js');
        } else {
            gf_DivMsgAlert(gv_MsgNoData);
        }
        
    	$("#spanCntMhsDept").text(data.data.records.length);
    	cf_SetEventListenerMhsDept();
    };

    var fn_SelectMhsDept = function (rId, cInd) {

        if (rId > 0) {
        	
        	deptCode = dhxGridMhsDept.cells(rId, gf_GetDhxGridColumId(dhxGridMhsDept,"deptCode")).getValue();
            
        	alert(deptCode);
        }    
    };

    var fn_CheckMhsDept = function (col){
        var resArr = [];
        var colIdx = gf_GetDhxGridColumId(dhxGridMhsDept, col);
        dhxGridMhsDept.forEachRow(function(rowId) {
            if(dhxGridMhsDept.cells(rowId,0).isChecked()){
                resArr.push( dhxGridMhsDept.cells(rowId,colIdx).getValue() );
            }
        });
        return resArr;
    };
    
	$(function() {
    	
        cf_InitParamMhsDept();
        cf_SetComponentsMhsDept();
        cf_SetEventListenerMhsDept();
        cf_SetBindingMhsDept();
        cf_InitFormMhsDept();
    });

    </script>
    
    <div class="pop-content" id="searchFormPopupDept">	 
		<div>
			<div class="search_t mb10"></div>
			<div class="search_box">
				<ul>
					<li class="block">					 
						<label for="docmT">부서명</label>
						<input type="text" id="searchDeptNm" name="searchDeptNm" class="w390 ml5" />
					</li>
				</ul>
			</div>
			
			<br/>
			
			<div>
				<div id="dataListMhsDept" style="width: 100%; height: 320px"></div>							 
			</div>
		</div>
	</div>

</body>
