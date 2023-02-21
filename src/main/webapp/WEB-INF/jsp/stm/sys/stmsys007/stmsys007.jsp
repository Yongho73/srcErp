                 <!-- 
 *    프로그램       : 전자결재환경관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.29
 *    사용테이블      : STM_ENV_SETTING
 * sourceGen version : 2020.07.16.01 (2020.07.29)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/sys/stmsys007/stmsys007.js"></script>

   <div class="wrapper_con" >
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnSaveStmsys007"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item">
                <div class="mt5 outer_line_form" style="height:calc(100vh - 69px) !important;">
                    <div class="detail_type01">
                        <form id="saveFormStmsys007">
                            <table>
                                <caption>전자결재환경<!-- <taglibs:transText progrmId="default" key="titStmsys007"/> --></caption>
                                <colgroup>
                                    <col width="200">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">사업장명<!-- <taglibs:transText progrmId="default" key="titBplcCode"/> --></th>
                                    <td><div name="bplcCode" id="divComboBplcCode" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th>결재예정인 결재정보 사전 열람</th>
                                    <td>
                                        <input type="radio" id="etsPreViewSaveFormStmsys0071" name="etsPreView" value="1" /> 
                                        <label for="etsPreViewSaveFormStmsys0071"><span></span>적용</label>
                                        &nbsp;
                                        <input type="radio" id="etsPreViewSaveFormStmsys0070" name="etsPreView" value="0" /> 
                                        <label for="etsPreViewSaveFormStmsys0070"><span></span>미적용</label>
                                        <p class="mt5">* 적   용 : (결재진행) 메뉴에 결재예정인 받을 결재문서를 포함하여 목록 제공</p>
                                        <p>* 미적용 : (결재진행) 메뉴에 로그인 사용자가 결재처리한 경우에만 목록 제공</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th>직인 이미지 등록</th>
                                    <td>
                                        <input type="hidden" name="atchmnfl" id="atchmnflSaveFormStmsys007" />
                                        <!-- <div class="file_box" style="float:left; width:51%; height:25px">
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
                                        </div>       -->                              
                                        <div class="btn" style="float:left; margin-left:5px">                         
                                            <button type="button" id="btnFileUploadSaveFormStmsys007" class="btn_common01_new">
                                                                 직인이미지파일 업로드
                                            </button>
                                        </div>
                                        <div style="clear:both;"></div>
                                        <div style="margin-left:5px">
                                            <br/>
                                            <img id="previewSealImgSaveFormStmsys007" src="${pageContext.request.contextPath}/img/dummySeal.jpg" style="width:150px"/>        
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>서명 표기방식</th>
                                    <td>
                                        <input type="radio" id="signTypeSaveFormStmsys007LIST" name="signType" value="LIST" /> 
                                        <label for="signTypeSaveFormStmsys007LIST"><span></span>결재자 표기 방식 (나열식)</label>
                                        <br/>
                                        <img src="${pageContext.request.contextPath}/img/sub/signseting_listtype.jpg" alt="결재자 표 형식 표기 예시">
                                        <br/>
                                        <br/>                                
                                        <input type="radio" id="signTypeSaveFormStmsys007TABLE" name="signType" value="TABLE" /> 
                                        <label for="signTypeSaveFormStmsys007TABLE"><span></span>결재자 표기 방식 (표 형식)</label>
                                        <br/>
                                        <img src="${pageContext.request.contextPath}/img/sub/signseting_tabletype.jpg" alt="결재자 표 형식 표기 예시">
                                        <br>
                                        * 서명표기방식은 결재자가 서명(승인/반려)한 경우 웹기안기에 제공되는 서명란의 표기방식
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