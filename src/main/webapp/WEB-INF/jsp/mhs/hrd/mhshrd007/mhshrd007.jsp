<!-- 
 *    프로그램       : 근태기준설정 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.28
 *    사용테이블      : MHS_DCLZBASSSETTING
 * sourceGen version : 2020.07.16.01 (2020.08.28)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrd/mhshrd007/mhshrd007.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhshrd007"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnSaveMhshrd007"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrd007">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">사용여부</span>
                            <select id="useAtSearchFormMhshrd007" name="useAt">
                                <option value="">전체</option>
                                <option value="1" selected>사용</option>
                                <option value="0">미사용</option>
                            </select>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrd007"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrd007"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>근태기간 설정</span>
                        <span class="table_sumnum" id="spanCntSearchFormMhshrd007">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshrd007" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrd007">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->
            
            <div class="item4">
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>근태발생 기준</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                        <button class="div_title_btn" type="button" name="formSave" id="formSaveMhshrd007">저장</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="detail_type01"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <form id="saveFormMhshrd007">
                            <table>
                                <caption>근태기준설정<!-- <taglibs:transText progrmId="default" key="titMhshrd007"/> --></caption>
                                <colgroup>
                                    <col class="w40">
                                    <col class="w120">
                                    <col class="w100">
                                    <col class="w100">
                                    <col width="*">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th style="text-align:center;">No<!-- <taglibs:transText progrmId="default" key="titLaborSe"/> --></th>
                                    <th style="text-align:center;">기준항목<!-- <taglibs:transText progrmId="default" key="titLaborSe"/> --></th>
                                    <th style="text-align:center;">항목명<!-- <taglibs:transText progrmId="default" key="titLaborSe"/> --></th>
                                    <th style="text-align:center;">추가항목<!-- <taglibs:transText progrmId="default" key="titLaborSe"/> --></th>
                                    <th style="text-align:center;">설명<!-- <taglibs:transText progrmId="default" key="titLaborSe"/> --></th>
                                </tr>
                                </thead>
                                <tbody id="mhshrd007List">
                                <tr>
                                    <td style="text-align:center;" id="sn0SaveFormMhshrd007"> </td>
                                    <td style="text-align:center;" id="stdrNm0SaveFormMhshrd007"> </td>
                                    <td style="text-align:center;">
                                        <select style="text-align:center;" name="itemCode0" id="itemCode0SaveFormMhshrd007">
                                            <option value="">미사용</option>
                                        </select>
                                        <select style="display:none; text-align:center;" name="hideItemCode0" id="hideItemCode0SaveFormMhshrd007">
                                            <option value="">미사용</option>
                                        </select>
                                    </td>
                                    <td style="text-align:center;">
                                        <input required="true" type="text" name="splitItem0" id="splitItem0SaveFormMhshrd007" maxlength="10" style="width: 90%; text-align:center;"/>
                                        <input required="true" type="hidden" name="hideSplitItem0" id="hideSplitItem0Item0SaveFormMhshrd007" style="width: 0px"/>
                                    </td>
                                    <td style="text-align:left; word-break:break-all;" id="rm0SaveFormMhshrd007"> </td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;" id="sn1SaveFormMhshrd007"> </td>
                                    <td style="text-align:center;" id="stdrNm1SaveFormMhshrd007"> </td>
                                    <td style="text-align:center;">
                                        <select style="text-align:center;" name="itemCode1" id="itemCode1SaveFormMhshrd007">
                                            <option value="" selected>선택</option>
                                            <option value="0">미사용</option>
                                            <option value="1">1년</option>
                                            <option value="2">2년</option>
                                            <option value="3">3년</option>
                                        </select>
                                        <select style="display:none; text-align:center;" name="hideItemCode1" id="hideItemCode1SaveFormMhshrd007">
                                            <option value="" selected>선택</option>
                                            <option value="0">미사용</option>
                                            <option value="1">1년</option>
                                            <option value="2">2년</option>
                                            <option value="3">3년</option>
                                        </select>
                                    </td>
                                    <td style="text-align:center;">
                                        <input required="true" type="text" name="splitItem1" id="splitItem1SaveFormMhshrd007" maxlength="10" style="width: 90%"; text-align:center;/>
                                        <input required="true" type="hidden" name="hideSplitItem1" id="hideSplitItem1SaveFormMhshrd007" maxlength="10" style="width: 95%"/>
                                    </td>
                                    <td style="text-align:left; word-break:break-all;" id="rm1SaveFormMhshrd007"> </td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;" id="sn2SaveFormMhshrd007"> </td>
                                    <td style="text-align:center;" id="stdrNm2SaveFormMhshrd007"> </td>
                                    <td style="text-align:center;">
                                        <select style="text-align:center;" name="itemCode2" id="itemCode2SaveFormMhshrd007">
                                            <option value="" selected>선택</option>
                                            <option value="1">년단위</option>
                                            <option value="2">월단위</option>
                                            <option value="3">귀속월</option>
                                        </select>
                                        <select style="display:none; text-align:center;" name="hideItemCode2" id="hideItemCode2SaveFormMhshrd007">
                                            <option value="" selected>선택</option>
                                            <option value="1">년단위</option>
                                            <option value="2">월단위</option>
                                            <option value="3">귀속월</option>
                                        </select>
                                    </td>
                                    <td style="text-align:center;">
                                        <input required="true" type="text" name="splitItem2" id="splitItem2SaveFormMhshrd007" maxlength="10" style="width: 90%; text-align:center;"/>
                                        <input required="true" type="hidden" name="hideSplitItem2" id="hideSplitItem2SaveFormMhshrd007" maxlength="10" style="width: 95%"/>
                                    </td>
                                    <td style="text-align:left; word-break:break-all;" id="rm2SaveFormMhshrd007"> </td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;" id="sn3SaveFormMhshrd007"> </td>
                                    <td style="text-align:center;" id="stdrNm3SaveFormMhshrd007"> </td> 
                                    <td style="text-align:center;">
                                        <select style="text-align:center;" name="itemCode3" id="itemCode3SaveFormMhshrd007">
                                            <option value="">미사용</option>
                                        </select>
                                        <select style="display:none; text-align:center;" name="hideItemCode3" id="hideItemCode3SaveFormMhshrd007">
                                            <option value="">미사용</option>
                                        </select>
                                    </td>
                                    <td style="text-align:center;">
                                        <input required="true" type="text" name="splitItem3" id="splitItem3SaveFormMhshrd007" maxlength="10" style="width: 90%; text-align:center;"/>
                                        <input required="true" type="hidden" name="hideSplitItem3" id="hideSplitItem3SaveFormMhshrd007" maxlength="10" style="width: 95%"/>
                                    </td>
                                    <td style="text-align:left; word-break:break-all;" id="rm3SaveFormMhshrd007"> </td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;" id="sn4SaveFormMhshrd007"> </td>
                                    <td style="text-align:center;" id="stdrNm4SaveFormMhshrd007"> </td> 
                                    <td style="text-align:center;">
                                        <select style="text-align:center;" name="itemCode4" id="itemCode4SaveFormMhshrd007">
                                            <option value="" selected>선택</option>
                                            <option value="1">휴직일수포함</option>
                                            <option value="2">휴직일수미포함</option>
                                        </select>
                                        <select style="display:none; text-align:center;" name="hideItemCode4" id="hideItemCode4SaveFormMhshrd007">
                                            <option value="" selected>선택</option>
                                            <option value="1">휴직일수포함</option>
                                            <option value="2">휴직일수미포함</option>
                                        </select>
                                    </td>
                                    <td style="text-align:center;">
                                        <input required="true" type="text" name="splitItem4" id="splitItem4SaveFormMhshrd007" maxlength="10" style="width: 90%; text-align:center;"/>
                                        <input required="true" type="hidden" name="hideSplitItem4" id="hideSplitItem4SaveFormMhshrd007" maxlength="10" style="width: 95%"/>
                                    </td>
                                    <td style="text-align:left; word-break:break-all;" id="rm4SaveFormMhshrd007"> </td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;" id="sn5SaveFormMhshrd007"> </td>
                                    <td style="text-align:center;" id="stdrNm5SaveFormMhshrd007"> </td> 
                                    <td style="text-align:center;">
                                        <select style="text-align:center;" name="itemCode5" id="itemCode5SaveFormMhshrd007">
                                            <option value="" selected>선택</option>
                                            <option value="0">미차감</option>
                                            <option value="1">차감</option>
                                        </select>
                                        <select style="display:none; text-align:center;" name="hideItemCode5" id="hideItemCode5SaveFormMhshrd007">
                                            <option value="" selected>선택</option>
                                            <option value="0">미차감</option>
                                            <option value="1">차감</option>
                                        </select>
                                    </td>
                                    <td style="text-align:center;">
                                        <input required="true" type="text" name="splitItem5" id="splitItem5SaveFormMhshrd007" maxlength="10" style="width: 90%; text-align:center;"/>
                                        <input required="true" type="hidden" name="hideSplitItem5" id="hideSplitItem5SaveFormMhshrd007" maxlength="10" style="width: 95%"/>
                                    </td>
                                    <td style="text-align:left; word-break:break-all;" id="rm5SaveFormMhshrd007"> </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div><!-- //왼쪽 영역 item4 end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item4으로 변경후 사용 
            <div class="item4"></div>
             --> 
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->

</body>
