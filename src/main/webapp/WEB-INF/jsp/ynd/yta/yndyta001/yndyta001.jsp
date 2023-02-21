<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/ynd/yta/yndyta001/yndyta001.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
        </div>
<!--         <ul class="btn">
            <li>
                <button type="button" id="btnAddYndyta001" class="btn_common02_new">
                    <span class="icon_renew"></span>
                                   신규<taglibs:transText progrmId="default" key="btnAdd"/>
                </button>
            </li>

        </ul> -->
    </div>
    <!-- //title_box -->

    <!-- search_box -->
    <div class="search_box" style="clear: none">
        <table style="width: 100%; height: 20px; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
            <tr>
                <td>
                    <form id="searchFormYndyta001">

                    </form>
                </td>

            </tr>
        </table>
    </div>

	<div class="list_top" ></div>  
	<div class="basic_div" style="padding:10px; clear:both;margin:0 auto; width:580px;">
    	
    		
    	<div class="detail_type024_sub">
    	<form id="saveFormYndyta001">
			<table>
				<caption>인적공제</caption>
				
				<colgroup>
					<col style="width:30%;min-width:70px;" />
					<col style="width:70%;min-width:70px;" />
				</colgroup>
				
				<tbody>
					<tr>
						<th class="ar brddd">귀속년도</th>
						<td class="al">
							<div id="divComboBelongYear" class="div_combo"></div>
						</td>
					</tr>
					<tr>
						<th class="ar brddd">인적공제대상자 포함</th>
						<td class="al">
							<form>
								<fieldset>
									<legend>인적공제대상자 포함</legend>				                
										<input type="radio" name="person" id="personYes" value="Y" checked><label for="personYes"><span></span>포함</label>
										<input type="radio" name="person" id="personNo" value="N"><label for="personNo"><span></span>직접입력</label>                
								</fieldset>
							</form>
						</td>
					</tr>  					
				</tbody>
				</table>
		</form>		
		</div>
		    	<div style="margin:10px 0; text-align:center;border:none;"> 
						<button id="btnSaveYndyta001" class="btn_common01_new" type="button">급여 대상자선정</button>
						<button id="btnRemoveYndyta001" class="btn_common01_new" type="button">대상자 초기화</button>
						<button id="btnExcelUploadYndyta001" class="btn_common01_new" type="button">엑셀자료를 통한 업로드 </button>
						<button id="btnExcelYndyta001" class="btn_common01_new" type="button">양식다운로드 </button>						
				</div> 		

	</div>
				<div style="padding:10px; clear:both;margin:0 auto; width:580px;"> 
					<div><span class="f12 ">※ 급여 대상자선정 : 귀속년도에  급여가 지급된 대상자를 선정하여 연말정산 급여기초자료를 생성합니다. </span></div>
					<div><span class="f12 ">※ 대상자 초기화 : 연말정산 대상자를 삭제합니다. </span></div>
					<div><span class="f12 ">※ 인적공제대상자 포함 : 귀속자의 인적공제대상이 자동으로 설정됩니다. </span></div>
					<div><span class="f_blue2 f12 ">  (직접입력을 선택할  경우 귀속자 개인이 직접 인적공제를 입력해야 합니다.) </span></div>
				</div>	
</body>
