<!-- 
 *    프로그램       : 수신문서 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.03.24
 *    사용테이블      : SGN_SANCTN_DOC
 * sourceGen version : 2021.02.18.01 (2021.03.24)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/ets/pbx/etspbx004/etspbx004.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnExcelEtspbx004"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormEtspbx004">
	        <div class="consearch_div">
	            <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li style='width:279px;'><span class="span">문서번호</span><input name="docNoSearch" id="docNoSearchFormEtspbx004" style="width: 197px;"></li>
                        <li><span class="span">양식명</span><input name="raisNmSearch" id="sanctnNoSearchFormEtspbx004" style="width: 200px;"></li>
                        <li><span class="span">제목</span><input name="docTitSearch" id="sanctnNoSearchFormEtspbx004" style='width:350px'></li>
                    </ul>
	            </div>
	        </div>
	        <div class="consearch_div">
	            <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li  id="drftDeDiv"><span class="span">기안일자</span>
							<input type="text" name="drftStrDeSearch" id="drftStrDeSearch" class="input_calen"> ~ <input type="text" name="drftEndDeSearch" id="drftEndDeSearch" class="input_calen">
							<div id="drftDe_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
						</li>
                        <li><span class="span">기안자</span>
							<input type="text" name="empno" id="empnoSearchFormEtspbx004" maxlength="15" style="width: 80px;"/>
		               		<input type="text" name="empNm" id="empNmSearchFormEtspbx004" style="width: 80px;">
			                <button type="button" id="btnEmpCodeSearch" class="btn_common03">
			                	<span class="glyphicon  glyphicon glyphicon-search"> </span>
			                </button>
						</li>
                        <li><span class="span">기안부서</span>
							<input type="text" name="deptCode" id="deptCodeSearchFormEtspbx004" maxlength="15" style="width: 80px;"/>
		               		<input type="text" name="deptNm" id="deptCodeNmSearchFormEtspbx004" style="width: 120px;">
			                <button type="button" id="btnDeptCodeSearch" class="btn_common03">
			                	<span class="glyphicon  glyphicon glyphicon-search"> </span>
			                </button>
						</li>
                    </ul>
	            </div>
	            <div class="consearchbt_div">
	                <ul class="consearchbt_list">
	                    <li><a href="#none" id="btnSearchEtspbx004"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
	                    <li><a href="#none" id="btnResetEtspbx004"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
	                </ul>
	            </div>
	        </div>
        </form>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormEtspbx004">0</span>
                </div>
                <div class="mt5 outer_line_grid" id="div1_dataListEtspbx004" style="height:calc(100vh - 167px) !important;">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListEtspbx004" style="height:calc(100vh - 167px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingEtspbx004">
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</body>
