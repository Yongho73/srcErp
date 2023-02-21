<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg004/pjtpmg004SearchPjtHnfAcmslt.js"></script>
	
	<div class="wrapper_con">
		<div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
              <!--       <li><a href="#none" id="btnAddPjtpmg005"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemovePjtpmg005"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSavePjtpmg005"><i class="axi axi-save mr5"></i><span>저장</span></a></li>-->
                    <li><a href="#none" id="btnExcelPjtpmg004"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> 
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPjtHnfAcmslt">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">기준년도</span>
                            <input type="text" name="baseYear" id="baseYear" class="input_calen" size="4" maxlength="4" autocomplete="off"/>&nbsp;&nbsp;</li>
                        </li>
                        <li><span class="span">상태</span>
                            <select id="useAtSearchFormStmUsers" name="comptAt" style="width:100px;" >
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
                    <li><a href="#none" id="btnSearchPjtpmg004"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetPjtpmg004"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCnt">0</span>
                </div>
                <div class="mt5 outer_line_grid" id="div1_dataListPjtpmg005">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataList" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPjtpmg005">
                    </div> -->
                </div>
            </div>
        </div>
<%-- 
    <!--//tabl_box-->
    <div class="tabl_box">
        <!-- //tabl-1 -->
        <div style="width: 100%;">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titPjtHnfAcmslt" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view ">
                        <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCnt"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                    
                </div>
                <!--//list_top-->
                <div>
                    <div id="dataList" style="width: 100%; height: 600px"></div>
                </div>
            </div>
            <!--//list_type01-->
        </div>

    </div> --%>
    
    </div>
    
</body>
