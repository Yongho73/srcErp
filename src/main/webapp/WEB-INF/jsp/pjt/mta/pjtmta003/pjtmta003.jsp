<!-- 
 *    프로그램       : 유지보수요청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.01.22
 *    사용테이블      : PJT_MNTNCE_REPORT
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/mta/pjtmta003/pjtmta003.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path"></div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddPjtmta003"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnSavePrintRequest"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormPjtmta003">
	        <div class="consearch_div">
	            <div class="consearch_input">
                	<input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">프로젝트</span>
                            <input type="text" name="projectNm" id="projectNm" style="width:200px;"/>
                        </li>
                        <li><span class="span">거래처</span>
                            <input type="text" name="compNm" id="compNm" style="width:180px;"/>
                            <button type="button" id="btnCompNmSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"></span></button>
                        </li>
                        <li><span class="span">진행상태</span>
                            <select id="comptAt" name="comptAt">
                                    <option value="">전체</option>
                                    <option value="0" selected>진행</option>
                                    <option value="2">보류</option> 
                                    <option value="1">완료</option>                                    
                            </select>
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
                        <li><span class="span">요청내용</span>
                            <input type="text" name="requstCn" id="requstCn" style="width:200px;"/>
                        </li>
                        <li><span class="span">완료일자</span>
                            <input type="text" name="bgnRequstDe" id="bgnRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> 
                            ~ <input type="text" name="endRequstDe" id="endRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div></li>
                        <li><span class="span">승인여부</span>
                            <select id="comptConfmAt" name="comptConfmAt">
                                    <option value="">전체</option>
                                    <option value="0">미승인</option>
                                    <option value="1">승인</option>                                    
                            </select>
                        </li>
                    </ul>
	            </div>
	            <div class="consearchbt_div">
	                <ul class="consearchbt_list">
	                    <li><a href="#none" id="btnSearchPjtmta003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
	                    <li><a href="#none" id="btnResetPjtmta003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
	                </ul>
	            </div>
        	</div>
	    </form>
        
        
        <div class="flex2">
            <div class="item4">
            	<div>
	                <div class="div_title">
	                	<span class="table_sumnum" id="spanCntSearchFormPjtmta003Pjt">0</span>
	                </div>
	                <div class="mt5 outer_line_grid" style="height:200px !important;">
	                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
	                        <div class="dhtml_grid" id="dataListPjtmta003Pjt"> 그리드 영역
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div>
	                <div class="div_title">
	                	<span class="table_sumnum" id="spanCntSearchFormPjtmta003Report">0</span>
	                </div>
	                <div class="mt5 outer_line_grid" style="height:calc(100vh - 411px) !important;">
	                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
	                        <div class="dhtml_grid" id="dataListPjtmta003Report"> <!-- 그리드 영역 -->
	                        </div>
	                    </div>
	                </div>
	            </div>
            </div>
            <div class="item4">
                <div class="div_title" style="width:98%">
                	<div class="left">
                		<span class="table_sumnum" id="spanCntSearchFormPjtmta003">0</span>
                	</div>
<!--                 	<div class="right"> -->
<!--                 		<button class="btn_common01_new" id="btnSavePrintRequest">출력여부저장</button> -->
<!--                 	</div> -->
                </div>
                <div class="mt5 outer_line_grid" style="height:calc(100vh - 168px) !important;">
                <div class="dhtml_line">
                    <div class="dhtml_grid" id="dataListPjtmta003""></div>
                </div>
                </div>       
            </div>
        </div>
    </div>

</body>
