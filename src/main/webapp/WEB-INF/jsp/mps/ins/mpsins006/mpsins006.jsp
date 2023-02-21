<!-- 
 *    프로그램       : 사회보험보수월액 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.22
 *    사용테이블      : MPS_SLNRC_STMT
 * sourceGen version : 2020.06.29.01 (2020.07.22)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/ins/mpsins006/mpsins006.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
<!--                     <li><a href="#none" id="btnAddMpsins006"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li> -->
<!--                     <li><a href="#none" id="btnRemoveMpsins006"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                    <li><a href="#none" id="btnSaveMpsins006"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
<!--                     <li><a href="#none" id="btnExcelMpsins006"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> -->
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsins006">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id="deptCode" autocomplete="off" style="width:60px;">
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearchSearchFormMpsins006" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>    
                            </button>                    
                        </li> 
                         <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" style="width: 60px;"/>
                            <input type="text" name="korNm" id="korNm" style="width: 60px;"/>
                            <input type="hidden" name="deptNm" id="deptNm" style="width: 50%"/>     
                            <button type="button" id="btnempnoSearchSearchFormMpsins006" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                        <li><span class="span">재직구분</span>
                            <div id="divComboHffsSeBox" class="div_combo"></div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpsins006"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsins006"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width: 100%; height: calc(100vh - 134px)!important;">
                <div class="div_title" >
                <div class="left">
                        <span class="table_sumnum" id="spanCntSearchFormMpsins006">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                        <button type="button" class="btn_common02" id="btnExcelDownload"><span class="glyphicon glyphicon-paperclip"></span>엑셀 양식 다운</button>
                        <button type="button" class="btn_common02" id="btnFileUpload1"><span class="glyphicon glyphicon-paperclip"></span>엑셀 업로드</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid" id="dataListMpsins006" style="width: 100%; height: calc(100vh - 134px)!important;">
                </div>
            </div>
        </div>
        
        <div class="flex" style="margin-top:10px"> 
            <div class="item">
                <div class="mt5 outer_line_2danform" style="height:35px !important;overflow:hidden !important;">
                    <div class="dhtml_line_2dan" style="height:100% !important;">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->
                        <div class="detail_type01">
                        <form id="saveFormItem" novalidate="novalidate">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>근로자 부담금</th>
                                        <td>
                                            <input type="text" name="totalLabrrAmt" id="totalLabrrAmt" class="w90p ar pr5" autocomplete="off" readonly>
                                        </td>
                                        <th>사업자 부담금</th>
                                        <td>
                                            <input type="text" name="totalBprprrAmt" id="totalBprprrAmt" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                        
                    </div>
            </div>            
        </div>
         
     </div><!-- //wrapper_con end -->
     
    </div>

</body>
