<!-- 
 *    프로그램       : 설문관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.04
 *    사용테이블      : STM_QESTNAR
 * sourceGen version : 2020.08.06.01 (2020.09.04)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/qes/stmqes001/stmqes001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmqes001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveStmqes001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmqes001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelStmqes001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmqes001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span">설문조사명<!-- <taglibs:transText progrmId="default" key="titQestnarCode"/> --></span>
                            <input name="qestnarNm" id="qestnarNmSearchFormStmqes001">
                        </li>
                        <li id="searchDate"><span class="span">휴직기간<!-- <taglibs:transText progrmId="default" key="titLayoffNo"/> --></span>
                            <input type="text" class="w90 input_calen al" maxlength="10" name="SearchqestnarSdt" id="SearchqestnarSdt">~
                            <input type="text" class="w90 input_calen al" maxlength="10" name="SearchqestnarEdt" id="SearchqestnarEdt">
                            <div id="searchDate_cal" style="position:absolute; top:25px;"></div>
                        </li>
                        <li>
                            <span class="span">사용여부<!-- <taglibs:transText progrmId="default" key="titQestnarCode"/> --></span>
                            <select name="useAt">
                                <option value="">전체</option>
                                <option value="1">사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmqes001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmqes001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormStmqes001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListStmqes001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingStmqes001">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item3">
             <div class="div_title">
                <div class="left">
                   <div class="project_tit_div" style="line-height:34px;">
                        <ul class="project_tit_ul">
                            <li class="project_tit_li" name="projectNmTit" id="projectNmTit"></li>
                            <li id="chargerNmTit" name="chargerNmTit" ><span class="ml5"></span><span class="ml5"></span></li>
                        </ul>    
                    </div>
                </div>
            </div>
     <div  class="mt5 outer_line_form" id="tabbarObj" style="min-height:calc(100vh - 120px);">
      <div class="tabl_box">
          <div id="a1" name="기본1">
                <form id="saveFormStmqes001">
                    <div class="detail_type01">
                        <table>
                                <caption>교육결과보고<!-- <taglibs:transText progrmId="default" key="titMhsedu003"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="200">
                                    <col width="100">
                                    <col width="200">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">설문조사코드<!-- <taglibs:transText progrmId="default" key="titQestnarCode"/> --></th>
                                    <td>
                                        <input type="text" name="qestnarCode" id="qestnarCode" maxlength="20" style="width: 50%" readonly/>
                                    </td>
                                    <th class="essential_icon">설문조사명<!-- <taglibs:transText progrmId="default" key="titQestnarNm칭"/> --></th>
                                    <td>
                                        <input required="true" type="text" name="qestnarNm" id="qestnarNmSaveFormStmqes001" maxlength="100" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">설문조사기간<!-- <taglibs:transText progrmId="default" key="titQestnarSdt"/> --></th>
                                    <td>
                                        <div id="date2">  <!-- absolute는 position: static 속성을 가지고 있지 않은 부모를 기준으로 움직입니다. 만약 부모 중에 포지션이 relative, absolute, fixed인 태그가 없다면 가장 위의 태그(body)가 기준이 됩니다. -->
                                             <input type="text" name="qestnarSdt" id="qestnarSdt" class="input_calen" required="true"> ~ 
                                             <input type="text" name="qestnarEdt" id="qestnarEdt" class="input_calen" required="true">
                                         <div id="saveDate_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td colspan="3"><input type="text" name="rm" id="rmSaveFormStmqes001" maxlength="1000" style="width: 99%; height:300px;"/></td>
                                </tr>
                                <tr>
                                    <th>사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="useAt" id="useAtSaveFormStmqes001" maxlength="1"/>
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                    <th>수정가능여부<!-- <taglibs:transText progrmId="default" key="titUpdtPosblAt"/> --></th>
                                    <td>
                                       <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="updtPosblAt" id="updtPosblAtSaveFormStmqes001" maxlength="1"/>
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                    
                                </tr>
                            </table>
                </div><!--//baseForm-->
                </div>
                </form>
            
                <div id="a2" name="Tab 2"></div>
                <div id="a3" name="Tab 3"></div>
                            
                </div>
                </div>
            
                <!-- //tabl-2 -->
                </div>
                <!--//tabl_box-->

        </div>
    </div>
</body>

