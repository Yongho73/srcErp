<!-- 
 *    프로그램       : 메뉴 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.06
 *    사용테이블      : STM_MENU
 * sourceGen version : 2020.08.06.01 (2020.08.06)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng002/stmmng002SearchStmMenu.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAdd"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemove"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmmng002"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcel"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmmng002">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span"><label for="docmT">사용여부</span>
                            <select id="useAtSearchFormStmmng002" name="useAtSearchFormStmmng002">
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
                    <li><a href="#none" id="btnSearchStmmng002"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmmng002"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        
        <div class="flex">
            <div class="item6">
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCnt">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataList" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrb000">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item6 end -->

            <div class="item6">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01" id="saveForm">
                        <form id="saveFormStmMenu">
                            <input type="hidden" name="ordr" id="ordr" />
                            <input type="hidden" name="pckageNm" id="pckageNm" />
                            <input type="hidden" name="subPackageId" id="subPackageId" />
                            <input type="hidden" name="relTableName" id="relTableName" />
                            
                            <table>
                                <caption><taglibs:transText progrmId="default" key="titStmMenu" /></caption>
                                <colgroup>
                                    <col width="150">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon"><taglibs:transText progrmId="default" key="titUpperMenuId" /></th>
                                    <td><input required type="text" name="upperMenuId" id="upperMenuId" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon"><taglibs:transText progrmId="default" key="titMenuId" /></th>
                                    <td><input required type="text" name="menuId" id="menuId" maxlength="20" style="width: 50%"/>
                                    <div class="btn_common04 w70 checkDupBtn">
                                            <span class="glyphicon glyphicon-duplicate"></span>
                                            <input type="button" id="btnCheckDup" class="btn_input w60" value="중복확인">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon"><taglibs:transText progrmId="default" key="titMenuNm" /></th>
                                    <td><input required type="text" name="menuNm" id="menuNm" maxlength="50" style="width: 50%"/></td>
                                </tr>                    
                                <tr>
                                    <th class="essential_icon"><taglibs:transText progrmId="default" key="titMenuSe" /></th>
                                    <td>                             
                                        <input type="radio" id="menuSeP" name="menuSe" value="P" checked/>
                                        <label for="menuSeP"><span></span>프로그램</label>
                                        <input type="radio" id="menuSeM" name="menuSe" value="M">                               
                                        <label for="menuSeM"><span></span>메뉴</label>                      
                                    </td>       
                                </tr>
                                <tr>
                                    <th class="essential_icon"><taglibs:transText progrmId="default" key="titMenuDc" /></th>
                                    <td><input required type="text" name="menuDc" id="menuDc" maxlength="200" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th><taglibs:transText progrmId="default" key="titMenuUseAt" /></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox" id="menuUseAt" name="menuUseAt">
                                              <i class="input-helper"></i>                                
                                            </label>
                                         </div>    
                                        
                                                         
                                    </td>
                                </tr>
                                <tr>
                                    <th><taglibs:transText progrmId="default" key="titProgrmId" /></th>
                                    <td><div id="progrmIdComboBox"></div></td>
                                </tr>                    
                            </table>
                        </form>
                    </div>
                </div>  <!--// outer_line_form -->
            </div>  <!-- //오른쪽 영역 item6 end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item4으로 변경후 사용 
            <div class="item4"></div>
             --> 
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->    
</body>
