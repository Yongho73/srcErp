<!-- 
 *    프로그램       : 개인정보변경승인 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.06.09
 *    사용테이블      : MHS_EMP_CHANCE
 * sourceGen version : 2021.02.18.01 (2021.06.09)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrb/mhshrb003/mhshrb003.js"></script>
<style>


@media all and (max-width:1248px) and (max-height : 1044px) {
	.project_tabdiv #tabbarObj .dhxtabbar_cont{padding-bottom:200px;}
}


</style>
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnExcelMhshrb003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrb003">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <input type="hidden" name="tabNumber" id="tabNumber"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" maxlength="15" style="width: 80px;"/>
                            <input type="text" name="empNm" id="empNm" style="width: 120px;">
                            <button type="button" id="btnEmpCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                            <span class="span">승인여부</span><div id="confmSttusCode" class="div_combo"></div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrb003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrb003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item5">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormMhshrb003">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshrb003" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrb003">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item5">
                <div class="div_title">
                </div>
                <div class="mt5 outer_line_form">
                 <div id="tabbarObj" style="height:100% !important;min-height:700px !important;">
                    <div class="tabl_box">
                        <div id="a1" name="기본" style="width:100%;">
                            <div style="float: right; margin-top:5px;" class="mb5">
                            	<button class="btn_common01_new" id="btnReceiptMhshrb003" type="button">접수</button>
                                <button class="btn_common01_new" id="btnSaveMhshrb003" type="button">승인</button>
                                <button class="btn_common01_new" id="btnFalseMhshrb003" type="button">반려</button>
                            </div>
                            <form id="saveFormMhshrb003Tab1">
                                <div class="detail_type01">
                                    <table>
                                        <caption>개인정보변경신청-기본<!-- <taglibs:transText progrmId="default" key="titMhshrb003"/> --></caption>
                                        <colgroup>
                                            <col width="200">
                                            <col width="400">
                                            <col width="400">
                                        </colgroup>
                                        <tr>
                                            <th></th>
                                            <th style="text-align : center;">변경전</th>
                                            <th style="text-align : center;">변경후</th>
                                        </tr>
                                        <tr>
                                            <th>사진<!-- <taglibs:transText progrmId="default" key="titPhotoAtchmnflNo"/> --></th>
                                            <td style=" border: 1px solid #ddd;">
                                                <table style="text-align:center;">
                                                    <tr style="text-align:center; padding:0;margin:0;border: 0;">
                                                        <td id="bfEmpPhoto" name="bfEmpPhoto" style="width:100%;;height:120px; display: block; margin:0px; padding:0px; background-image: url(/xerp/img/common/myphoto_default.png); background-repeat:no-repeat; background-position: center; vertical-align: middle; align:center; border: 0; text-align: center;"></td>
                                                        <input type="hidden" name="bfPhotoAtchmnflNo" id="bfPhotoAtchmnflNoSaveFormMhshrb003" />
                                                    </tr>
                                                </table>
                                            </td>
                                            <td style=" border: 1px solid #ddd;">
                                                <table style="text-align:center;">
                                                    <tr style="text-align:center; padding:0;margin:0;border: 0;">
                                                        <td id="empPhoto" name="empPhoto" style="image-align:center; width:100%;height:120px; display: block; margin:0px; padding:0px; background-image: url(/xerp/img/common/myphoto_default.png); background-repeat:no-repeat; background-position: center; vertical-align: middle; align:center; border: 0; text-align: center;"></td>
                                                        <input type="hidden" name="photoAtchmnflNo" id="photoAtchmnflNoSaveFormMhshrb003" />
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>한자 명<!-- <taglibs:transText progrmId="default" key="titChcrtNm"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfChcrtNm" id="bfChcrtNmSaveFormMhshrb003" maxlength="20" style="width: 50%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="chcrtNm" id="chcrtNmSaveFormMhshrb003" maxlength="20" style="width: 50%"/></td>
                                        </tr>
                                        <tr>
                                            <th>영문 명<!-- <taglibs:transText progrmId="default" key="titEngNm"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfEngNm" id="bfEngNmSaveFormMhshrb003" maxlength="20" style="width: 50%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="engNm" id="engNmSaveFormMhshrb003" maxlength="20" style="width: 50%"/></td>
                                        </tr>
                                        <tr>
                                            <th>생년월일<!-- <taglibs:transText progrmId="default" key="titBrthdy"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfBrthdy" id="bfBrthdySaveFormMhshrb003" maxlength="10"/>
                                            <div class="div_combo" id="divComboBfSlrcldAtPubusr001"></div></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="brthdy" id="brthdySaveFormMhshrb003" maxlength="10"/>
                                            <div class="div_combo" id="divComboSlrcldAtPubusr001"></div></td>
                                        </tr>
                                        <tr>
                                            <th>우편번호<!-- <taglibs:transText progrmId="default" key="titOwnhomZip"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfOwnhomZip" id="bfOwnhomZipSaveFormMhshrb003" maxlength="10" style="width: 30%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="ownhomZip" id="ownhomZipSaveFormMhshrb003" maxlength="10" style="width: 30%"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>주소<!-- <taglibs:transText progrmId="default" key="titOwnhomAdres"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfOwnhomAdres" id="bfOwnhomAdresSaveFormMhshrb003" maxlength="100" style="width: 90%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="ownhomAdres" id="ownhomAdresSaveFormMhshrb003" maxlength="100" style="width: 90%"/></td>
                                        </tr>
                                        <tr>
                                            <th>상세 주소<!-- <taglibs:transText progrmId="default" key="titOwnhomDetailAdres"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfOwnhomDetailAdres" id="bfOwnhomDetailAdresSaveFormMhshrb003" maxlength="100" style="width: 90%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="ownhomDetailAdres" id="ownhomDetailAdresSaveFormMhshrb003" maxlength="100" style="width: 90%"/></td>
                                        </tr>
                                        <tr>
                                            <th>전화번호<!-- <taglibs:transText progrmId="default" key="titOwnhomTelno"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfOwnhomTelno" id="bfOwnhomTelnoSaveFormMhshrb003" maxlength="20" style="width: 50%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="ownhomTelno" id="ownhomTelnoSaveFormMhshrb003" maxlength="20" style="width: 50%"/></td>
                                        </tr>
                                        <tr>
                                            <th>휴대전화<!-- <taglibs:transText progrmId="default" key="titMbtlnum"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfMbtlnum" id="bfMbtlnumSaveFormMhshrb003" maxlength="20" style="width: 50%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="mbtlnum" id="mbtlnumSaveFormMhshrb003" maxlength="20" style="width: 50%"/></td>
                                        </tr>
                                        <tr>
                                            <th>구내전화<!-- <taglibs:transText progrmId="default" key="titLxtnTelno"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfLxtnTelno" id="bfLxtnTelnoSaveFormMhshrb003" maxlength="20" style="width: 50%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="lxtnTelno" id="lxtnTelnoSaveFormMhshrb003" maxlength="20" style="width: 50%"/></td>
                                        </tr>
                                        <tr>
                                            <th>이메일(사내)<!-- <taglibs:transText progrmId="default" key="titEmail"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfEmail" id="bfEmailSaveFormMhshrb003" maxlength="50" style="width: 70%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="email" id="emailSaveFormMhshrb003" maxlength="50" style="width: 70%"/></td>
                                        </tr>
                                        <tr>
                                            <th>이메일(개인)<!-- <taglibs:transText progrmId="default" key="titEmail"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfIndvdlEmail" id="bfIndvdlEmailSaveFormMhshrb003" maxlength="50" style="width: 70%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="indvdlEmail" id="indvdlEmailSaveFormMhshrb003" maxlength="50" style="width: 70%"/></td>
                                        </tr>
                                        <tr>
                                            <th>결혼<!-- <taglibs:transText progrmId="default" key="titMrrgAt"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><div class="div_combo" id="divComboBfMrrgAt"></div>&nbsp;&nbsp;<input type="text" name="bfMrrgDe" id="bfMrrgDeSaveFormPubusr001" maxlength="10"/></td>
                                            <td style=" border: 1px solid #ddd;"><div class="div_combo" id="divComboMrrgAt"></div>&nbsp;&nbsp;<input type="text" name="mrrgDe" id="mrrgDeSaveFormPubusr001" maxlength="10"/></td>
                                        </tr>
                                    </table>
                                </div><!--//baseForm-->
                            </div>
                        </form>
            
                        <div id="a2" name="신상정보"></div>
                        <div id="a3" name="가족"></div>
                        <div id="a4" name="학력"></div>
                        <div id="a5" name="자격사항"></div>
                        <div id="a6" name="게좌번호"></div>
                        <div id="a7" name="어학"></div>
                        <div id="a8" name="경력"></div>    
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</body>

