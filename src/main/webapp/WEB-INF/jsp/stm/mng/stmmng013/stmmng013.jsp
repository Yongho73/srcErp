<!-- 
 *    프로그램       : 명함관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.31
 *    사용테이블      : STM_CUST
 * sourceGen version : 2020.07.16.01 (2020.07.31)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng013/stmmng013.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmmng013"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveStmmng013"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmmng013"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelStmmng013"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmmng013">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">고객명<!-- <taglibs:transText progrmId="default" key="titCustNm"/> --></span><input type="text" name="custNm" id="custNmSearchFormStmmng013"></li>
                        <li><span class="span">거래처<!-- <taglibs:transText progrmId="default" key="titBcncCodeNm"/> --></span><input type="text" name="bcncCodeNm" id="bcncCodeNmSearchFormStmmng013"></li>
                        <li><span class="span">거래처여부<!-- <taglibs:transText progrmId="default" key="titCustNo"/> --></span>
                           <!-- <label class="checkbox"> 
                               <input class="checkbox" type="checkbox" name="bcncAt" id="bcncAtSearchFormStmmng013" >
                               <i class="input-helper"></i>
                           </label> -->
                            <select name = "bcncAt" id = "bcncAtSearchFormStmmng013">
                                <option value = "">전체</option>
                                <option value = "1">있음</option>
                                <option value = "2">없음</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmmng013"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmmng013"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item6">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormStmmng013">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListStmmng013" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingStmmng013">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item6">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    -->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormStmmng013">
                            <table>
                                <caption>명함관리<!-- <taglibs:transText progrmId="default" key="titStmmng013"/> --></caption>
                                <colgroup>
                                    <col width="150">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">고객 번호<!-- <taglibs:transText progrmId="default" key="titCustNo"/> --></th>
                                    <td><input required="true" type="text" name="custNo" id="custNoSaveFormStmmng013" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">고객명<!-- <taglibs:transText progrmId="default" key="titCustNm"/> --></th>
                                    <td><input type="text" name="custNm" id="custNmSaveFormStmmng013" maxlength="30" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>직급<!-- <taglibs:transText progrmId="default" key="titClsf"/> --></th>
                                    <td><input type="text" name="clsf" id="clsfSaveFormStmmng013" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처명<!-- <taglibs:transText progrmId="default" key="titBcncCode"/> --></th>
                                    <td>
                                        <input type="hidden" name="oldBcncCode" id="oldBcncCode" maxlength="10" style="width: 100px" readonly/>
                                        <input type="hidden" name="bcncCode" id="bcncCodeSaveFormStmmng013" maxlength="10" style="width: 50%" readonly/>
                                        <input type="text" name="bcncCodeNm" id="bcncCodeNmSaveFormStmmng013" maxlength="10" style="width: 50%" readonly/>
                                        <button type="button" id="btnBcncSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>회사 부서<!-- <taglibs:transText progrmId="default" key="titCmpnyDept"/> --></th>
                                    <td><input type="text" name="cmpnyDept" id="cmpnyDeptSaveFormStmmng013" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>회사 전화 번호<!-- <taglibs:transText progrmId="default" key="titCmpnyTelno"/> --></th>
                                    <td><input type="text" name="cmpnyTelno" id="cmpnyTelnoSaveFormStmmng013" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>휴대폰 번호<!-- <taglibs:transText progrmId="default" key="titMbtlnum"/> --></th>
                                    <td><input type="text" name="mbtlnum" id="mbtlnumSaveFormStmmng013" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>집 전화 번호<!-- <taglibs:transText progrmId="default" key="titHomeTelno"/> --></th>
                                    <td><input type="text" name="homeTelno" id="homeTelnoSaveFormStmmng013" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>이메일<!-- <taglibs:transText progrmId="default" key="titEmail"/> --></th>
                                    <td><input type="text" name="email" id="emailSaveFormStmmng013" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>우편번호<!-- <taglibs:transText progrmId="default" key="titZip"/> --></th>
                                    <td><input type="text" name="zip" id="zipSaveFormStmmng013" maxlength="6" style="width: 100px" readonly/>
                                        <button type="button" id="btnZipSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>기본주소<!-- <taglibs:transText progrmId="default" key="titBassAdres"/> --></th>
                                    <td><input type="text" name="bassAdres" id="bassAdresSaveFormStmmng013" maxlength="100" style="width: 90%"/></td>
                                </tr>
                                <tr>
                                    <th>상세주소<!-- <taglibs:transText progrmId="default" key="titDetailAdres"/> --></th>
                                    <td><input type="text" name="detailAdres" id="detailAdresSaveFormStmmng013" maxlength="100" style="width: 90%"/></td>
                                </tr>
                                <tr>
                                    <th>등록자<!-- <taglibs:transText progrmId="default" key="titBcncChargerAt"/> --></th>
                                    <td><input type="text" name="regNm" id="regNmSaveFormStmmng013" maxlength="1" style="width: 50%" readonly/></td>
                                </tr>
                                <tr>
                                    <th>등록일<!-- <taglibs:transText progrmId="default" key="titBcncChargerAt"/> --></th>
                                    <td><input type="text" name="regDt" id="regDtSaveFormStmmng013" maxlength="1" style="width: 50%" readonly/></td>
                                </tr>
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td><input type="text" name="rm" id="rmSaveFormStmmng013" maxlength="200" style="width: 90%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처 담당자 지정<!-- <taglibs:transText progrmId="default" key="titBcncChargerAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label> 
                                               <input type="checkbox" name="bcncChargerAt" id="bcncChargerAtSaveFormStmmng013" >
                                                <i class="input-helper"></i>
                                            </label>
                                        </div> 
                                        ※  거래처의 주 담당자로 지정됩니다.
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>  <!--//detail_type01--> 
                    <!-- 폼이 두개인 경우 아래 추가 
                    <div>
                        <div class="div_title">
                            <div class="left ml5"></div>
                            <div class="right mr5"></div>
                        </div>
                        <div class="mt5">
                            <div class="detail_type01">
                            </div>
                        </div>
                    </div>
                    폼이 두개인 경우 여기까지 추가 --> 
                </div>  <!--// outer_line_form -->
            </div><!-- //오른쪽 영역 item4 end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item4으로 변경후 사용 
            <div class="item4"></div>
             --> 
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->

</body>
