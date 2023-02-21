<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/sys/stmsys001/stmsysets.js"></script>

    <!-- search_box -->
    <div class="search_box" style="clear: none; margin:7px">
        <table style="width: 100%; height: 20px; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
            <tr>
                <td>
                    <form id="searchFormStmsys001">
                        <table style="border: none; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
                            <tr style="border: none;">
                                <th><label for="docmT">사업장<!-- <taglibs:transText progrmId="default" key="titBplcCode"/> --></th>
                                <td>
                                <div id="comboBplcCode"  class="div_combo"></div></td>
                            </tr>
                        </table>
                    </form>
                </td>
                <td style="border: none;">
                    <div class="btn" style="text-align: right; float: right; top: 6px; position: absolute; right: 0;">
                        <button type="button" id="btnSearchStmsys001">
                            <span class="glyphicon glyphicon-search f15 mr5"></span>
                                                 조회<!-- <taglibs:transText progrmId="default" key="btnSearch"/> -->
                        </button>
                        <button type="button" id="btnResetStmsys001">
                            <span class="glyphicon glyphicon-refresh f15 mr5"></span>
                                                 초기화<!-- <taglibs:transText progrmId="default" key="btnInit"/> -->
                        </button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- //search_box -->

    <!-- tdl-2 -->
    <div class="tdl-2" style="width:60%">
        <div class="list_top">
            <ul class="btn">
                <li>                        
                    <button type="button" id="btnAddStmsys001" class="btn_common01_new">신규</button>
                    <button type="button" id="btnSaveStmsys001" class="btn_common01_new">저장</button>
                </li>
            </ul>
        </div>
        <div class="detail_type01">
            <form id="saveFormStmsys001">
                <table>
                    <caption>버튼</caption>
                    <colgroup>
                       <col width="220">
                        <col width="">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th class="essential_icon">
                                              사업장코드<!-- <taglibs:transText progrmId="default" key="titBplcCode"/> -->
                            </th>
                            <td>
                                <input required="true" type="text" name="bplcCode" id="bplcCodeSaveFormStmsys001" maxlength="4" style="width: 50%"/>
                            </td>
                        </tr>
                        <tr>
                            <th>결재예정인 결재정보 사전 열람</th>
                            <td>
                                <input type="radio" id="etsPreViewSaveFormStmsys0011" name="etsPreView" value="1" /> 
                                <label for="etsPreViewSaveFormStmsys0011"><span></span>적용</label>
                                &nbsp;
                                <input type="radio" id="etsPreViewSaveFormStmsys0010" name="etsPreView" value="0" /> 
                                <label for="etsPreViewSaveFormStmsys0010"><span></span>미적용</label>
                                <p class="mt5">* 적   용 : (결재진행) 메뉴에 결재예정인 받을 결재문서를 포함하여 목록 제공</p>
                                <p>* 미적용 : (결재진행) 메뉴에 로그인 사용자가 결재처리한 경우에만 목록 제공</p>
                            </td>
                        </tr>
                        <tr>
                            <th>직인 이미지 등록</th>
                            <td>
                                <input type="hidden" name="atchmnfl" id="atchmnflSaveFormStmsys001" />
                                <div class="file_box" style="float:left; width:51%; height:25px">
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
                                <div class="btn" style="float:left; margin-left:5px">                         
                                    <button type="button" id="btnFileUploadSaveFormStmsys001" class="btn_common01_new">
                                                         직인이미지파일 업로드
                                    </button>
                                </div>
                                <div style="clear:both;"></div>
                                <div style="margin-left:5px">
                                    <br/>
                                    <img id="previewSealImgSaveFormStmsys001" src="${pageContext.request.contextPath}/img/dummySeal.jpg" style="width:150px"/>        
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>서명 표기방식</th>
                            <td>
                                <input type="radio" id="signTypeSaveFormStmsys001LIST" name="signType" value="LIST" /> 
                                <label for="signTypeSaveFormStmsys001LIST"><span></span>결재자 표기 방식 (나열식)</label>
                                <br/>
                                <img src="${pageContext.request.contextPath}/img/sub/signseting_listtype.jpg" alt="결재자 표 형식 표기 예시">
                                <br/>
                                <br/>                                
                                <input type="radio" id="signTypeSaveFormStmsys001TABLE" name="signType" value="TABLE" /> 
                                <label for="signTypeSaveFormStmsys001TABLE"><span></span>결재자 표기 방식 (표 형식)</label>
                                <br/>
                                <img src="${pageContext.request.contextPath}/img/sub/signseting_tabletype.jpg" alt="결재자 표 형식 표기 예시">
                                <br>
                                * 서명표기방식은 결재자가 서명(승인/반려)한 경우 웹기안기에 제공되는 서명란의 표기방식
                            </td>
                        </tr>                        
                    </tbody>
                </table>
            </form>
        </div>
    </div>
    <!-- //tabl-2 -->
</body>
