<!-- 
 *    프로그램       : 휴직신청관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.05.15
 *    사용테이블      : MHS_LAYOFF
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/wks/mhswks007/mhswks007.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhswks007"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhswks007"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhswks007"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhswks007"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhswks007">
                    <ul class="consearchinput_list">
                        <li id='searchLayoffDe'><span class="span">휴직기간</span>
                             <input type="text" name="searchlayoffBeginDeMhswks007" id="searchlayoffBeginDeMhswks007"  class="input_calen"/> ~  
                             <input type="text" name="searchlayoffEndDeMhswks007" id="searchlayoffEndDeMhswks007"  class="input_calen"/>
                             <div id="searchLayoffDe_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                         </li>
                        <li><span class="span">부서</span>
                            <input type="text" name="deptCodeSearchFormMhswks007" id="deptCodeSearchFormMhswks007" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input type="text" name="deptCodeNmSearchFormMhswks007" id="deptCodeNmSearchFormMhswks007" autocomplete="off">
                                <button type="button" id="btnDeptCodeSearch" class="btn_common03">
                                <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                </button>&nbsp;&nbsp;
                        </li>
                        <li><span class="span">사원</span>
                                <input type="text" name="empNmSearchFormMhswks007" id="empNmSearchFormMhswks007" maxlength="15" style="width: 80px;"/>
                                <input type="text" name="empCodeNmSearchFormMhswks007" id="empCodeNmSearchFormMhswks007" style="width: 25px;">
                                <button type="button" id="btnEmpCodeSearch" class="btn_common03">
                                <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                </button>
                        </li> 
                        <li><span class="span">휴직구분</span><div id=wrycReqstSnSearchFormMhswks007   class="div_combo"></div>&nbsp;&nbsp;</li>
                        <li><span class="span">결재상태</span><div id=sanctnCodeSearchFormMhswks007  class="div_combo"></div>&nbsp;&nbsp;</li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhswks007"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhswks007"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="wrapper">
            <div class="div" style="width:calc(60% - 5px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMhswks007">0</span>
                </div>
                <div style="width:100%">
                    <div class="div_line" id="dataListMhswks007" style="height:calc(100vh - 120px); position:relative; width:inherit !important">
                    </div>
                </div>
            </div>
            <div class="div_divine"></div>
            <div class="div" style="width:calc(40% - 5px)">
                <div class="div_line" style="min-height:calc(100vh - 120px); margin-top:23px;">
                    <div class="detail_type01">
                        <form id="saveFormMhswks007">
                            <table>
                                <caption>휴직신청<!-- <taglibs:transText progrmId="default" key="titMhswks007"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th>신청일자<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                    <td><input readonly="readonly" type="text" name="reqstDeSaveFormMhswks007" id="reqstDeSaveFormMhswks007" maxlength="8" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>작성자<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                    <td><input readonly="readonly" type="text" name="regIdSaveFormMhswks007" id="regIdSaveFormMhswks007" maxlength="8" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>사원</th>
                                    <td style="width: 95%">
                                        <input type="text" name="empnoSaveFormMhswks007" id="empnoSaveFormMhswks007" style="width: 80px;"/>
                                        <input type="text" name="korNmSaveFormMhswks007" id="korNmSaveFormMhswks007" style="width: 80px;"/>
                                        <input type="hidden" name=deptKorNmSaveFormMhswks007 id="deptKorNmSaveFormMhswks007" style="width: 80px;"/>
                                        <button type="button" id="btnEmpCodeSave" class="btn_common03">
                                        <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">휴가구분<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                    <td><div id="layoffSeCodeSaveFormMhswks007"></div></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">휴직기간 <!-- <taglibs:transText progrmId="default" key="titBeginDe"/> --></th>
                                    <td colspan='3'>
                                        <div id="layoffDeSave">  <!-- absolute는 position: static 속성을 가지고 있지 않은 부모를 기준으로 움직입니다. 만약 부모 중에 포지션이 relative, absolute, fixed인 태그가 없다면 가장 위의 태그(body)가 기준이 됩니다. -->
                                            <input type="text" name="layoffBeginDeSaveFormMhswks007" id="layoffBeginDeSaveFormMhswks007" class="input_calen"> ~ 
                                            <input type="text" name="layoffEndDeSaveFormMhswks007" id="layoffEndDeSaveFormMhswks007" class="input_calen">
                                        <div id="layoffDeSave_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">휴직사유<!-- <taglibs:transText progrmId="default" key="titLayoffNo"/> --></th>
                                    <td><textarea rows=20 cols=60 name="layoffDtlsSaveFormMhswks007" id="layoffDtlsSaveFormMhswks007" maxlength="4000" style="width: 90%"></textarea>
                                </tr>
                                <tr>
                                    <th>파일첨부<!-- <taglibs:transText progrmId="default" key="titAtchmnflNo"/> --></th>
                                    <td><input type="text" name="atchmnflNo" id="atchmnflNoSaveFormMhswks007" maxlength="1000" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>
                                        <button type="button" class="btn_common02" id="btnFileUploadSaveFormMhswks007">
                                            <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                        </button>
                                    </th>
                                <td>
                                    <input type="hidden" name="ciImgFile" id="ciImgFileSaveFormHmeexm001" /> 
                                        <div class="file_box" style="float:left; width:90%; height:25px">
                                            <table style="border:0px">
                                                <colgroup>
                                                    <col width="*" />
                                                    <col width="80" />
                                                    <col width="63" />
                                                </colgroup> 
                                                <tr>
                                                    <td colspan="3" style="text-align:center; border:0px; padding-top:5px">첨부파일이 없습니다.</td>
                                        </tr>                   
                                    </table>                                    
                                </div>                                
<!--                             <input type="text" name="atchmnflNo" id="atchmnflNoSaveFormHmesup004" maxlength="1000" style="width: 80%"/> -->
<!--                             <button type="button" id="btnFileUploadSaveFormHmesup004" class="btn_common01_new"> -->
<!--                                                            업로드 -->
<!--                                     </button> -->
                                </td>                                                              
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <div class="div_divine"></div>
        </div>
    </div>

</body>
