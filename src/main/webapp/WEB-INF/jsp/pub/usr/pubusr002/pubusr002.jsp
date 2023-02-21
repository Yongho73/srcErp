<!-- 
 *    프로그램       : 개인정보변경신청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.06.01
 *    사용테이블      : MHS_EMP
 * sourceGen version : 2021.02.18.01 (2021.06.01)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
    <script src="${pageContext.request.contextPath}/js/xerp/pub/usr/pubusr002/pubusr002.js"></script>
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
                    <li><a href="#none" id="btnAddPubusr002"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemovePubusr002"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSavePubusr002"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelPubusr002"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPubusr002">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <input type="hidden" name="tabNumber" id="tabNumber"/>
                    <div id="divComboBplcKorNm"  class="div_combo" style="display:none;"></div>
                    <ul class="consearchinput_list">
                        <li><span class="span">사원</span>
                            <input type="text" name="empNumber" id="empNumber" autocomplete="off" style="width: 80px;" readonly disabled/>
                            <input type="text" name="empName" id="empName" maxlength="15" style="width: 120px;" autocomplete="off" readonly disabled/>
                            <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchPubusr002"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <!-- <li><a href="#none" id="btnResetPubusr002"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li> -->
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
                        <span class="table_sumnum" id="spanCntSearchFormPubusr002">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListPubusr002" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPubusr002">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item5">
                <div class="div_title">
                    <div class="left"></div>
                    <div class="right">
                    	<!-- <button type="button" class="btn_common02" id="btnChangePwPubusr002"><span class="glyphicon glyphicon-paperclip"></span>패스워드 변경</button> -->
                        <button type="button" class="btn_common02" id="btnChangeSavePubusr002"><span class="glyphicon glyphicon-paperclip"></span>승인신청</button>
                    </div>
                </div>
                <div class="mt5 outer_line_form project_tabdiv">
                   <div id="tabbarObj" style="height:100% !important;min-height:700px !important;">

                        <div id="a1" name="기본" class="detail_type01">
                            <form id="saveFormPubusr002Tab1">
                                    <table>
                                        <caption>개인정보변경신청-기본<!-- <taglibs:transText progrmId="default" key="titPubusr002"/> --></caption>
                                        <colgroup>
                                            <col width="200">
                                            <col width="400">
                                            <col width="400">
                                        </colgroup>
                                        <tbody>
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
                                                        <td id="bfEmpPhoto" name="bfEmpPhoto" style="width:100%;height:125px; display: block; margin:0px; padding:0px; background-image: url(/xerp/img/common/myphoto_default.png); background-repeat:no-repeat; background-position:top center; vertical-align: middle; align:center; border: 0; text-align: center;"></td>
                                                        <input type="hidden" name="bfPhotoAtchmnflNo" id="bfPhotoAtchmnflNoSaveFormPubusr002" />
                                                        <!-- <td style="text-align:center; padding:0;margin:0;border: 0;">
                                                             <button type="button" id="btnBfPhotoDown" class="btn_common01">다운로드</button>
                                                        </td> -->
                                                    </tr>
                                                    <tr>
                                                    	<td style="text-align:center; padding:0;margin:0;border: 0;position:relative;">
                                                    		<a style="width:94px; height:20px;display:block;margin:0 auto;position:relative;left:-2px;"></a>
                                                    		<a style="margin-top:4px;"></a>
                                                    		<a style="margin-top:4px;"></a>
                                                    	</td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td style=" border: 1px solid #ddd;">
                                                <table style="text-align:center;">
                                                    <tr style="text-align:center; padding:0;margin:0;border: 0;">
                                                        <td id="empPhoto" name="empPhoto" style="width:100%;height:125px; display: block; margin:0px; padding:0px; background-image: url(/xerp/img/common/myphoto_default.png); background-repeat:no-repeat; background-position:top center; vertical-align: middle; align:center; border: 0; text-align: center;"></td>
                                                        <input type="hidden" name="photoAtchmnflNo" id="photoAtchmnflNoSaveFormPubusr002" />
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align:center; padding:0;margin:0;border: 0;position:relative;">
                                                            <button type="button" id="btnPhotoRec" class="btn_common01" style="width:94px;display:block;margin:0 auto;position:relative;left:-2px;">등록</button>
                                                            <button type="button" id="btnPhotoDown" class="btn_common01" style="margin-top:4px;">다운로드</button>
                                                            <button type="button" id="btnPhotoDel" class="btn_common01" style="margin-top:4px;">삭제</button>
                                                            <a id="photoDownload" download="" href=""></a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>한자 명<!-- <taglibs:transText progrmId="default" key="titChcrtNm"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfChcrtNm" id="bfChcrtNmSaveFormPubusr002" maxlength="20" style="width: 50%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="chcrtNm" id="chcrtNmSaveFormPubusr002" maxlength="20" style="width: 50%"/></td>
                                        </tr>
                                        <tr>
                                            <th>영문 명<!-- <taglibs:transText progrmId="default" key="titEngNm"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfEngNm" id="bfEngNmSaveFormPubusr002" maxlength="20" style="width: 50%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="engNm" id="engNmSaveFormPubusr002" maxlength="20" style="width: 50%"/></td>
                                        </tr>
                                        <tr>
                                            <th>생년월일<!-- <taglibs:transText progrmId="default" key="titBrthdy"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfBrthdy" id="bfBrthdySaveFormPubusr002" maxlength="10"/>
                                            &nbsp<div class="div_combo" id="bfslrcldAtPubusr002" readonly disabled></div></td>
                                            <!-- <div class="div_combo" id="divComboBfSlrcldAtPubusr002"></div></td> -->
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="brthdy" id="brthdySaveFormPubusr002" maxlength="10"  class="input_calen"/>
                                            <div class="div_combo" id="slrcldAtPubusr002"></div></td>
                                        </tr>
                                        <tr>
                                            <th>우편번호<!-- <taglibs:transText progrmId="default" key="titOwnhomZip"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfOwnhomZip" id="bfOwnhomZipSaveFormPubusr002" maxlength="10" style="width: 30%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="ownhomZip" id="ownhomZipSaveFormPubusr002" maxlength="10" style="width: 30%"/>
                                                <button type="button" name="btnZipSearch" id="btnZipSearch" class="btn_common03">
                                                    <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>주소<!-- <taglibs:transText progrmId="default" key="titOwnhomAdres"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfOwnhomAdres" id="bfOwnhomAdresSaveFormPubusr002" maxlength="100" style="width: 90%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="ownhomAdres" id="ownhomAdresSaveFormPubusr002" maxlength="100" style="width: 90%"/></td>
                                        </tr>
                                        <tr>
                                            <th>상세 주소<!-- <taglibs:transText progrmId="default" key="titOwnhomDetailAdres"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfOwnhomDetailAdres" id="bfOwnhomDetailAdresSaveFormPubusr002" maxlength="100" style="width: 90%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="ownhomDetailAdres" id="ownhomDetailAdresSaveFormPubusr002" maxlength="100" style="width: 90%"/></td>
                                        </tr>
                                        <tr>
                                            <th>전화번호<!-- <taglibs:transText progrmId="default" key="titOwnhomTelno"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfOwnhomTelno" id="bfOwnhomTelnoSaveFormPubusr002" maxlength="20" style="width: 50%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="ownhomTelno" id="ownhomTelnoSaveFormPubusr002" maxlength="20" style="width: 50%"/></td>
                                        </tr>
                                        <tr>
                                            <th>휴대전화<!-- <taglibs:transText progrmId="default" key="titMbtlnum"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfMbtlnum" id="bfMbtlnumSaveFormPubusr002" maxlength="20" style="width: 50%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="mbtlnum" id="mbtlnumSaveFormPubusr002" maxlength="20" style="width: 50%"/></td>
                                        </tr>
                                        <tr>
                                            <th>구내전화<!-- <taglibs:transText progrmId="default" key="titLxtnTelno"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfLxtnTelno" id="bfLxtnTelnoSaveFormPubusr002" maxlength="20" style="width: 50%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="lxtnTelno" id="lxtnTelnoSaveFormPubusr002" maxlength="20" style="width: 50%"/></td>
                                        </tr>
                                        <tr>
                                            <th>이메일(사내)<!-- <taglibs:transText progrmId="default" key="titEmail"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfEmail" id="bfEmailSaveFormPubusr002" maxlength="50" style="width: 70%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="email" id="emailSaveFormPubusr002" maxlength="50" style="width: 70%"/></td>
                                        </tr>
                                        <tr>
                                            <th>이메일(개인)<!-- <taglibs:transText progrmId="default" key="titEmail"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="bfIndvdlEmail" id="bfIndvdlEmailSaveFormPubusr002" maxlength="50" style="width: 70%"/></td>
                                            <td style=" border: 1px solid #ddd;"><input type="text" name="indvdlEmail" id="indvdlEmailSaveFormPubusr002" maxlength="50" style="width: 70%"/></td>
                                        </tr>
                                        <tr>
                                            <th>결혼<!-- <taglibs:transText progrmId="default" key="titMrrgAt"/> --></th>
                                            <td style=" border: 1px solid #ddd;"><div class="div_combo" id="divComboBfMrrgAt"></div>&nbsp;&nbsp;<input type="text" name="bfMrrgDe" id="bfMrrgDe" maxlength="10" autocomplete="off"/></td>
                                            <td style=" border: 1px solid #ddd;"><div class="div_combo" id="divComboMrrgAt"></div>&nbsp;&nbsp;<input type="text" class="input_calen" name="mrrgDe" id="mrrgDe" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off"/></td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </form>
                    </div>
                	</div>
                </div>
            </div> 
        </div>
    </div>
</body>
