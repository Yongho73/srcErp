<!-- 
 *    프로그램       : 초과근무수당 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.18
 *    사용테이블      : MPS_OVTIME_ALLWNC
 * sourceGen version : 2020.06.29.01 (2020.08.18)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>           
    <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal010/mpscal010.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                   <!--  <li><a href="#none" id="btnAddMpscal010"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpscal010"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                    <li><a href="#none" id="btnSaveMpscal010"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpscal010"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpscal010">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">근무년월<!-- <taglibs:transText progrmId="default" key="titWorkYm"/> --></span>
                        <input name="workYm"  id="workYmSearchFormMpscal010"  class="input_calen" size="7" maxlength="7">
                        </li>
                         <li><span class="span" style="width: 45px;">직종</span>
                            <div id="divComboSearchJssfcCode" style="display:inline-block"></div>                            
                        </li> 
                        <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id="deptCode" autocomplete="off" style="width:60px;">
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off" style="width:80px;">
                            <button type="button" id="btnDeptCodeSearchSearchFormMpscal010" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>    
                            </button>                    
                        </li> 
                         <li><span class="span">사원번호</span>
                            <input type="text" name="empno" id="empno" style="width: 60px;"/>
                            <input type="text" name="korNm" id="korNm" style="width: 80px;"/>                                
                            <button type="button" id="btnempnoSearchSearchFormMpscal010" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                         <li><span class="span">지급일자</span>
                            <input type="hidden" name=pymntSn id="pymntSnSaveFormMpscal010" style="width: 50px;" readonly/>
                            <input type="hidden" name=closAt id="closAtSaveFormMpscal010"/>
                            <input type="hidden" name=applcYm id="applcYmSaveFormMpscal010"/>
                            <input type="text" name=pymntDe id="pymntDeSaveFormMpscal010" maxlength="20" style="width: 60px;" readonly/>
                            <input type="text" name=salarytyCodeNm id="salarytyCodeNmSaveFormMpscal010" maxlength="20" style="width: 80px;" readonly/>
                            <input type="hidden" name=pymntDtls id="pymntDtlsNmSaveFormMpscal010" maxlength="20" readonly/>
                            <button type="button" id="btnPymntDeSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpscal010"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpscal010"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                    <div class="left">
                        <span class="table_sumnum" id="spanCntSearchFormMpscal010">0</span>
                    </div>
                    <div class="right">
                        <button type="button" class="btn_common02" id="btnSearchMpscal010ReCalc"><span class="glyphicon glyphicon-paperclip"></span> 초과근무수당 재계산</button>                     
                        <button type="button" class="btn_common02" id="btnPaymentDeSelect"><span class="glyphicon glyphicon-paperclip"></span> 지급일자 선택</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid" id="dataListMpscal010" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>
            </div>
        </div>
    </div>

</body>
