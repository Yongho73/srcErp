<!-- 
 *    프로그램       : 프로젝트예산집행현황 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.04.21
 *    사용테이블      : PJT_BUGT_ACMSLT
 * sourceGen version : 2021.02.18.01 (2021.04.21)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg006/pjtpmg006.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnExcelPjtpmg006"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPjtpmg006">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">기준년도</span><input type="text" name="applcYy" id="applcYy" class="input_calen" size="4" maxlength="4" autocomplete="off"/>&nbsp;&nbsp;</li></li>
                        <li><span class="span">상태</span>
							<select id="comptAt" name="comptAt" style="width:100px;" >
									<option value="">전체</option>
                                    <option value="3">작성</option>
                                    <option value="4">계획승인요청</option>
                                    <option value="0">진행</option>
                                    <option value="6">완료승인요청</option> 
                                    <option value="1">완료</option>   
                                    <option value="2">보류</option>       
							</select>
						</li>
                        <li><span class="span">프로젝트</span>
							<input readonly type="text" name="projectSn" id="projectSn" style="width: 100px;"/>
                            <input readonly type="text" name="projectNm" id="projectNm" style="width: 200px;"/>
                            <button type="button" id="btnProjectSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
						</li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchPjtpmg006"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetPjtpmg006"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item">
            
           	 <div class="div_title"> <!-- 높이만 잡고 싶은 경우 빈 div_title만 남기고 안쪽은 지워준다 -->
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">
                        <span class="table_sumnum ml5" id="spanCntSearchFormPjtpmg006">0</span>
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right pr5">
                            <button type="button" class="btn_icon-svg" title="Gird로 보기">
                            	<svg viewBox="0 0 46 46" class="icon-svg svg-grid">
		                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#grid" class="suite-component__icon-use">
		                                <svg id="grid" viewBox="0 0 46 46">
									        <path d="M40,43H6a4,4,0,0,1-4-4V5A4,4,0,0,1,6,1H40a4,4,0,0,1,4,4V39A4,4,0,0,1,40,43ZM24,23v8h8V23H24Zm8-2V13H24v8h8ZM24,33v8h8V33H24ZM14,41h8V33H14v8Zm0-10h8V23H14v8Zm0-10h8V13H14v8ZM4,39a2,2,0,0,0,2,2h6V33H4v6Zm0-8h8V23H4v8ZM4,21h8V13H4v8ZM42,5a2,2,0,0,0-2-2H6A2,2,0,0,0,4,5v6H42V5Zm0,8H34v8h8V13Zm0,10H34v8h8V23Zm0,10H34v8h6a2,2,0,0,0,2-2V33Z" transform="translate(0 1)"></path>
									    </svg>
		                            </use>
		                        </svg>Gird
                            </button>
                            <button type="button" class="btn_icon-svg" title="Tree Gird로 보기">
                            	<svg viewBox="0 0 46 46" class="icon-svg svg-treegrid">
							        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#treegrid" class="suite-component__icon-use">
							
							            <svg id="treegrid" viewBox="0 0 46 46">
							                <path d="M40,44H22a4,4,0,0,1-4-4V26H6V10H4A2,2,0,0,1,2,8V4A2,2,0,0,1,4,2h6a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H8v1H18V10a2,2,0,0,1,2-2h6a2,2,0,0,1,2,2v4a2,2,0,0,1-2,2H20a2,2,0,0,1-2-2V13H8V24H18V22a4,4,0,0,1,4-4H40a4,4,0,0,1,4,4V40A4,4,0,0,1,40,44ZM10,8V4H4V8h6Zm10,6h6V10H20v4ZM32,42h4V38H32v4Zm0-6h4V32H32v4Zm0-6h4V26H32v4ZM26,42h4V38H26v4Zm0-6h4V32H26v4Zm0-6h4V26H26v4ZM20,40a2,2,0,0,0,2,2h2V38H20v2Zm0-4h4V32H20v4Zm0-6h4V26H20v4Zm22-8a2,2,0,0,0-2-2H22a2,2,0,0,0-2,2v2H42V22Zm0,4H38v4h4V26Zm0,6H38v4h4V32Zm0,6H38v4h2a2,2,0,0,0,2-2V38Z"></path>
							            </svg>
							
							        </use>
							    </svg>Tree Gird
                            </button>
                            <button type="button" class="btn_icon-svg" title="Pivot으로 보기">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350.56 350.56"  class="icon-svg svg-pivot">
										<path d="M350.56 350.56H0V0h350.56v350.56zM19 331.56h312.56V19H19v312.56z"/>
										<path d="M350.56 350.56H102.15V0h248.41v350.56zm-229.41-19h210.41V19H121.15v312.56z"/>
										<path d="M350.56 92.78H0V0h350.56v92.78zM19 73.78h312.56V19H19v54.78z"/>
										<path d="M258.79 240.28v-78.22h-91.87v90.65h79.44c6.85-.01 12.43-5.58 12.43-12.43z" fill="none"/>
										<path d="M258.79 240.28c0 6.85-5.57 12.43-12.43 12.43h-79.44v19h79.44c17.33 0 31.43-14.1 31.43-31.43v-78.22h-19v78.22z"/>
										<path d="M226.96 175.44l41.52-41.52 41.53 41.52zM191.31 305.02l-41.53-41.53 41.53-41.52z"/>
								  </svg> Pivot
                            </button>
                            
                            <button type="button" class="btn_icon-svg" title="Chart로 보기">
	                            <svg viewBox="0 0 46 46" class="icon-svg svg-chart">
		                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chart">
		                                <svg id="chart" viewBox="0 0 46 46">
									        <path d="M40,44H6a4,4,0,0,1-4-4V6A4,4,0,0,1,6,2H40a4,4,0,0,1,4,4V40A4,4,0,0,1,40,44ZM42,6a2,2,0,0,0-2-2H6A2,2,0,0,0,4,6V40a2,2,0,0,0,2,2H40a2,2,0,0,0,2-2V6ZM34,38H32a2,2,0,0,1-2-2V24a2,2,0,0,1,2-2h2a2,2,0,0,1,2,2V36A2,2,0,0,1,34,38Zm0-13a1,1,0,1,0-2,0V35a1,1,0,1,0,2,0V25ZM24,38H22a2,2,0,0,1-2-2V8a2,2,0,0,1,2-2h2a2,2,0,0,1,2,2V36A2,2,0,0,1,24,38ZM24,9a1,1,0,0,0-2,0V35a1,1,0,1,0,2,0V9ZM14,38H12a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h2a2,2,0,0,1,2,2V36A2,2,0,0,1,14,38Zm0-20a1,1,0,0,0-2,0V35a1,1,0,1,0,2,0V18Z"></path>
									    <title>chart</title>
									    </svg>
		                            </use>
		                        </svg>Chart
							</button>
                    </div>
                </div>
                
                <div class="mt5 outer_line_grid" id="div1_dataListPjtpmg006">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListPjtpmg006" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPjtpmg006">
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</body>
