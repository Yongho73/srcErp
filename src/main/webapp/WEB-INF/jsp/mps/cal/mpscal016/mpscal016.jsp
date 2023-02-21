<!-- 
 *    프로그램       : 급여일괄등록 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.07
 *    사용테이블      : MPS_SALARY_BNDE_REGIST
 * sourceGen version : 2020.07.16.01 (2020.08.07)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal016/mpscal016.js"></script>
    <script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
    
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMpscal016"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpscal016"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMpscal016"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpscal016"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormMpscal016">
            <div class="consearch_div">
                <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">지급일자</span>
                            <input type="text" name=pymntSn id="pymntSnSaveFormMpscal013" style="width: 50px;" readonly/>
                            <input type="hidden" name=closAt id="closAtSaveFormMpscal013"/>
                            <input type="hidden" name=applcYm id="applcYmSaveFormMpscal013"/>
                            <input type="text" name=pymntDe id="pymntDeSaveFormMpscal013" maxlength="20" style="width: 100px;" readonly/>
                            <input type="text" name=salarytyCodeNm id="salarytyCodeNmSaveFormMpscal013" maxlength="20" style="width: 50px;" readonly/>
                            <input type="text" name=pymntDtls id="pymntDtlsNmSaveFormMpscal013" maxlength="20" style="width: 150px;" readonly/>
                            <button type="button" id="btnPymntDeSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                        </li>
                         <li>
                            <span class="span"><taglibs:transText progrmId="default" key="titHffsSe" /></span>
                            <div id=divComboHffsSe  class="div_combo"></div>
                        </li>
                    </ul>
                 </div>
              </div>
              <div class="consearch_div">
                 <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id="deptCode" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;
                        </li>
                        <li>
                            <span class="span">사원</span>
                            <input type="text" name="empno" id="empno" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input type="text" name="korNm" id="korNm" maxlength="15" autocomplete="off"/>
                            <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;
                        </li>
                    </ul>
                 </div>
                    <div class="consearchbt_div">
                        <ul class="consearchbt_list">
                            <li><a href="#none" id="btnSearchMpscal016"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                            <li><a href="#none" id="btnResetMpscal016"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                        </ul>
                    </div>                    
                </div>
            </form>
        <div class="flex">
            <div class="item">
                <div class="div_title">
                    <div class="left">
                        <span class="table_sumnum" id="spanCntSearchFormMpscal016">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                        <button type="button" class="btn_common02" id="btnExcelDownload"><span class="glyphicon glyphicon-paperclip"></span>엑셀 양식 다운</button>
                        <button type="button" class="btn_common02" id="btnFileUpload1"><span class="glyphicon glyphicon-paperclip"></span>엑셀 업로드</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid"style="height: calc(100vh - 160px) !important;">
                    <div class="dhtml_line">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->
                        <div class="dhtml_grid" id="dataListMpscal016" style="height:calc(100vh - 140px); width:100%; position:relative;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>