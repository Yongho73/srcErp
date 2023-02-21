<!-- 
 *    프로그램       : 연차수당관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.19
 *    사용테이블      : MHS_WRYC_DAYCNT
 * sourceGen version : 2020.06.29.01 (2020.08.19)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>      
        <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal023/mpscal023.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <!-- <li><a href="#none" id="btnAddMpscal023"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpscal023"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>-->
                    <li><a href="#none" id="btnSaveMpscal023"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpscal023"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpscal023">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">적용 년월<!-- <taglibs:transText progrmId="default" key="titApplcYy"/> --></span>
                        <input name="applcYy" id="applcYySearchFormMpscal023" class="input_calen" size="4" maxlength="4"></li>
                        <li><span class="span" style="width: 45px;">직종</span>
                            <div id="divComboSearchJssfcCode" style="display:inline-block"></div>                            
                        </li> 
                        
                        <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id="deptCode" autocomplete="off" style="width:60px;">
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off" style="width:80px;">
                            <button type="button" id="btnDeptCodeSearchSearchFormMpscal023" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>                    
                        </li> 
                         <li><span class="span">사원번호</span>
                            <input type="text" name="empno" id="empno" style="width: 60px;"/>
                            <input type="text" name="korNm" id="korNm" style="width: 80px;"/>
                            <input type="hidden" name="deptCodeNm" id="deptCodeNm" />     
                            <button type="button" id="btnempnoSearchSearchFormMpscal023" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                        <li><span class="span">구분</span>
                        <input type="radio" name="payGubun" value="notPayed" id="notPayed" checked> <label for="notPayed"><span></span> 미지급대상분 </label>
                        <input type="radio" name="payGubun" value="payed" id="payed"/> <label for="payed"><span></span>기지급분</label>
                        </li>
                         <li id="liPaymentDe"><span class="span">지급일자</span>
                            <input type="hidden" name=pymntSn id="pymntSnSaveFormMpscal023" style="width: 50px;" readonly/>
                            <input type="hidden" name=closAt id="closAtSaveFormMpscal023"/>
                            <input type="hidden" name=applcYm id="applcYmSaveFormMpscal023"/>
                            <input type="text" name=pymntDe id="pymntDeSaveFormMpscal023" maxlength="20" style="width: 60px;" readonly/>
                            <input type="text" name=salarytyCodeNm id="salarytyCodeNmSaveFormMpscal023" maxlength="20" style="width: 80px;" readonly/>
                            <input type="hidden" name=pymntDtls id="pymntDtlsNmSaveFormMpscal023" maxlength="20" style="width: 150px;" readonly/>
                            <button type="button" id="btnPymntDeSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpscal023"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpscal023"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                  <div class="left">
                        <span class="table_sumnum" id="spanCntSearchFormMpscal023">0</span>
                    </div>
                    <div class="right">
                        <button type="button" class="btn_common02" id="btnSearchMpscal023ReCalc"><span class="glyphicon glyphicon-paperclip"></span> 연차수당 재계산</button>                     
                        <button type="button" class="btn_common02" id="btnPaymentDeSelect"><span class="glyphicon glyphicon-paperclip"></span> 지급일자 선택</button>
                    </div>
                </div>    
                <div class="mt5 outer_line_grid" id="dataListMpscal023" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>
            </div>
        </div>
    </div>

</body>
