<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/qes/stmqes001/stmqestnarCn.js"></script>
        
         <div class="item3">
            <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                
                <div class="mt5 outer_line_form" style="height: calc(100vh - 13px) !important;">
                    <div class="detail_type01">
                        <form id="saveFormStmqestnarCn">
                            <table>
                                <caption>교육과정등록<!-- <taglibs:transText progrmId="default" key="titMhsedu001"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="200">
                                    <col width="100">
                                    <col width="200">
                                </colgroup>
                                
                                <tr>
                                    <th>설문조사코드</th>
                                    <td>
                                        <input type="text" name="qestnarCode" id="qestnarCode" value="${qestnarCode}" readonly/>
                                    </td>
                                    <th>설무조사명</th>
                                    <td>
                                        <input type="text" name="qestnarNm" id="qestnarNm" value="${qestnarNm}" readonly/>
                                    </td>        
                                </tr>
                                <tr>
                                    <td colspan="4" style="height:30px;">
                                        <div class="div_title">
                                            <div class="left"> <!-- 타이틀영역(좌측) //-->
                                                <span class="table_sumnum" id="spanCntSearchFormStmqestnarCn">0</span>                        
                                            </div>
                                            <div class="right">
                                                <button class="div_title_btn" id="btnAddStmqestnarCn" type="button">행추가</button>
                                                <button class="div_title_btn" id="btnRemoveStmqestnarCn" type="button">행삭제</button>
                                                <button class="div_title_btn" id="btnSaveStmqestnarCn" type="button">저장</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td colspan="4">
                                        <div class="mt5 outer_line_grid" style="width: 1090px; height:calc(100vh - 522px) !important;">
                                                <div class="dhtml_grid" id="dataListStmqestnarCn"> <!-- 그리드 영역 -->
                                                </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>질의내용</th>
                                    <td colspan="3">
                                        <input type="text" name="qestnarCn" id="qestnarCnSaveFormStmqestnarCn" maxlength="22" style="width: 99%;" height="90px;"/>
                                        <input type="hidden" name="qestnarCnSn"> 
                                    </td>
                                </tr>
                                <tr>
                                    <th>응답필수여부</th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="mustAswperAt" id="mustAswperAtSaveFormStmqestnarCn" maxlength="1"/>
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                    <th>선택이유확인여부</th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="selResnConfirmAt" id=selResnConfirmAtSaveFormStmqestnarCn" maxlength="1"/>
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>답안유형</th>
                                    <td>
                                        <div id="divComboaswperTy" class="div_combo"></div>
                                    </td>
                                        
                                    <th>답안수량</th>
                                    <td>
                                        <input type="text" name="aswperQty" id="aswperQtySaveFormStmqestnarCn" maxlength="1" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>답안내용</th>
                                    <td colspan="3">
                                        <div class="mt5 outer_line_grid" style="width: 907px; height:calc(100vh - 420px) !important;">
                                                <div class="dhtml_grid" id="dataListStmqesR"> <!-- 그리드 영역 -->
                                                </div>
                                        </div>
                                    </td>
                                </tr>
                                
                            </table>
                        </form>
                    </div>
                </div>
            </div><!-- //오른쪽 영역 item4 end -->
            
</body>


