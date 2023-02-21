<!-- 
 *    프로그램       : 유지보수요청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.06
 *    사용테이블      : PJT_MNTNCE_REQUST
 * sourceGen version : 2020.07.16.01 (2020.08.06)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
<style>
	.apiButton {
		height: 24px;
		line-height: 24px;
		background: #fff;
		color: #1e5ca0;
		font-size: 9pt;
		font-weight: 600;
		letter-spacing: -0.3px;
		border: 1px solid #1e5ca0;
		padding: 0px 4px;
		border-radius: 2px;
		/*margin-bottom: -2px;*/
		transition: background-color 0.15s ease-in-out 0s;
		text-align: center;
	}
	.apiButton:hover {
	    background-color:#1e5ca0;
	    color:#fff;
	}
</style>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/mta/pjtmta001/pjtmta001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddPjtmta001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnExcelPjtmta001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormPjtmta001">
	        <div class="consearch_div">
	            <div class="consearch_input">
	                    <input type="hidden" name="sortDirection"/>
	                    <input type="hidden" name="sortColumId"/>
	                    <input type="hidden" name="selectedPageNum"/>
	                    <ul class="consearchinput_list">
	                        <li><span class="span">거래처</span>
	                            <input type="text" name="compNm" id="compNm" style="width:181px;"/>
	                            <button type="button" id="btnCompNmSearch" class="btn_common03">
	                            <span class="glyphicon  glyphicon glyphicon-search"></span></button>
	                        </li>
	                        <li><span class="span">진행상태</span>
	                            <select id="comptAt" name="comptAt" style='width:67px'>
	                                    <option value="">전체</option>
	                                    <option value="0">진행</option>
	                                    <option value="2">보류</option> 
	                                    <option value="1">완료</option>                                    
	                            </select>
	                        </li>
	                        <li><span class="span">요청내용</span>
	                        	<input type="text" name="requstCn" id="requstCn" style="width:200px;"/>
	                        </li>
	                    </ul>
	            </div>
	        </div>
	        <div class="consearch_div">
	            <div class="consearch_input">
	                    <input type="hidden" name="sortDirection"/>
	                    <input type="hidden" name="sortColumId"/>
	                    <input type="hidden" name="selectedPageNum"/>
	                    <ul class="consearchinput_list">
	                        <li><span class="span">요청일자</span>
	                            <input type="text" name="bgnRequstDe" id="bgnRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> 
	                            ~ <input type="text" name="endRequstDe" id="endRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
	                            <div id="date2_cal" style="position:absolute; top:25px;"></div></li>
	                        <li><span class="span">요청상태</span><div id="divComboSttusSe" style="display:inline-block"></div></li>
	                        <li><span class="span">승인여부</span>
	                            <select id="comptConfmAtSearchForm" name="comptConfmAt">
	                                    <option value="">전체</option>
	                                    <option value="0">미승인</option>
	                                    <option value="1">승인</option>                                    
	                            </select>
	                        </li>
	                    </ul>
	            </div>
	            <div class="consearchbt_div">
	                <ul class="consearchbt_list">
	                    <li><a href="#none" id="btnSearchPjtmta001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
	                    <li><a href="#none" id="btnResetPjtmta001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
	                </ul>
	            </div>
	        </div>
        </form>
        <div class="flex">
            <div class="item3">
                <div class="div_title">
                	<span class="table_sumnum" id="spanCntSearchFormPjtmta001Pjt">0</span>
                </div>
                <div class="mt5 outer_line_grid" style="height:calc(100vh - 130px) !important;">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListPjtmta001Pjt" style="height:calc(100vh - 130px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="item3">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormPjtmta001">0</span>
                </div>
                <div class="mt5 outer_line_grid" style="height:calc(100vh - 130px) !important;">
                <div class="dhtml_line">
                    <div class="dhtml_grid" id="dataListPjtmta001" style="height:calc(100vh - 130px);"></div>
                </div>
                </div>       
            </div>
        </div>
    </div>

</body>
