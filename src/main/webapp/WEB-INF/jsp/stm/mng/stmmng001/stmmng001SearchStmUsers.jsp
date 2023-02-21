<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>


<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng001/stmmng001SearchStmUsers.js"></script>

<!-- /////////////////////////////////////결의서 관리 시작/////////////////////////////////////////////////////////////////////// 
 <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">                 
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmUsers"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>                    
                    <li><a href="#none" id="btnRemoveStmUsers"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmUsers"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelStmUsers"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">            
            <div class="consearch_input">
                <form id="searchFormStmUsers">
                    <ul class="consearchinput_list">
                        <li><span class="span">부서</span><div id="deptNmSearchFormStmUsersCombo" style="display:inline-block"></div></li>
                        <li><span class="span">사용자ID</span><input name="userId" id="userIdSearchFormStmUsers"></li>
                        <li><span class="span">사용자명</span><input name="userNm" id="userNmSearchFormStmUsers"></li>                    
                        <li><span class="span">사원여부</span>
                            <select id="empAtSearchFormStmUsers" name="empAt">
                                <option value="">전체</option>
                                <option value="1">사원</option>
                                <option value="0">비사원</option>
                            </select>
                        </li>
                        <li><span class="span">사용여부</span>
                            <select id="useAtSearchFormStmUsers" name="useAt">
                                <option value="">전체</option>
                                <option value="1">사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>
                    </ul>
                </form>  
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmUsers"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmUsers"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>            
        </div>
        <div class="wrapper" style="min-height:0px">    
            <div class="div" style="width:calc(45% - 5px);">
                <div class="div_title">
                   <span class="s_tit"><i class="axi axi-chevron-right"></i>기본정보</span>
                </div>
                <div style="width:100%">
                    <div class="div_line" style="height:50%; position:relative; width:inherit !important;">
                        
                        <div class="detail_type01">                        
                        <table style="height:100%;">
                            <tr>
                                <th class="ac brnavy">결의번호</th>
                                <td class="ac">D201809011234</td>
                                <th class="ac brnavy">본지정</th>
                                <td class="ac">조합본부</td>
                                <th class="ac brnavy">작성부서</th>
                                <td class="ac">회계팀</td>
                                <th class="ac brnavy">작성자</th>
                                <td class="ac">홍길동</td>
                            </tr>
                            <tr>
                                <th class="ac brnavy">회계년도</th>
                                <td class="ac">2018</td>
                                <th class="ac brnavy">결의일자</th>
                                <td class="ac">2018.09.01</td>
                                <th class="ac brnavy">결의금액</th>
                                <td class="ac">48,000,000</td>
                                <th class="ac brnavy">상태</th>
                                <td class="ac">회계승인완료</td>
                            </tr>
                            <tr>
                                <th class="ac brnavy">결의제목</th>
                                <td colspan="7" class="pl10">보통예금시재관리</td>
                            </tr>
                            <tr>
                                <th class="ac brnavy">결의내역</th>
                                <td colspan="7" class="pl10">대전지점에서 본부로 송금</td>
                            </tr>
                            <tr>
                                <th class="ac brnavy">첨부파일</th>
                                <td colspan="7" class="pl10"><p><a href="#">1.첨부파일.pdf</a></p>
                                    <p><a href="#">2.첨부파일</a></p>
                                </td>
                            </tr>   
                        </table>
                    </div>
                    </div>
                </div>
            </div>   



            
            <div class="div_divine"></div>   
            
            <div class="div" style="width:calc(55% - 5px)">
                                
                    <span class="hide">★증빙 / 복사 결의서 탭은  [프로젝트 현황]에서 사용한 탭 그대로 사용</span>
                    
                    <div class="list_top02">
                        <ul class="fm033_ul">
                            <li class="active"><a href="#">매입세금계산서(<span class="num">0</span>)</a></li>
                            <li><a href="#">매입계산서(<span class="num">0</span>)</a></li>
                            <li><a href="#">법인카드매입(<span class="num">0</span>)</a></li>
                            <li><a href="#">현금영수증매입(<span class="num">0</span>)</a></li>
                            <li><a href="#">기타증빙매입(<span class="num">0</span>)</a></li>
                            <li><a href="#">개인카드사용(<span class="num">0</span>)</a></li>
                            <li><a href="#">매출세금계산서(<span class="num">0</span>)</a></li>
                            <li><a href="#">매출계산서(<span class="num">0</span>)</a></li>
                            <li><a href="#">법인카드매출(<span class="num">0</span>)</a></li>
                            <li><a href="#">현금영수증매출(<span class="num">0</span>)</a></li>
                            <li><a href="#">현금매출(<span class="num">0</span>)</a></li>
                            <li><a href="#">기타소득(<span class="num">0</span>)</a></li>
                            <li><a href="#">사업소득(<span class="num">0</span>)</a></li>
                            <li><a href="#">이자소득(<span class="num">0</span>)</a></li>
                            <li><a href="#">배당소득(<span class="num">0</span>)</a></li>
                        </ul>
                    </div>
                    
                    <div style="width:100%; display:block;clear:both;"></div>
                    
                    <div class="div_title">
                        <span class="table_sumnum" id="spanCntSearchFormStmUsers">0</span>
                        <div style="float:right" class="detail_type024">
                            <ul class="btn" style="margin-bottom:8px;">
                                <button class="btn_common01_new" type="button">선택</button>
                                <button class="btn_common01_new" type="button">신규등록</button>
                            </ul>
                        </div>
                    </div>
                    
                <div style="width:100%; display:block;clear:both;"></div>
                
                <div class="div_line">
                    <div class="detail_type024">
                        <table>
                            <tr>
                                <th class="ac brnavy">순번</th>
                                <th class="ac brnavy"></th>
                                <th class="ac brnavy">발행일자</th>
                                <th class="ac brnavy">공급가액</th>
                                <th class="ac brnavy">부가세</th>
                                <th class="ac brnavy">공제구분</th>
                                <th class="ac brnavy">계산서승인번호</th>
                                <th class="ac brnavy">거래처</th>
                                <th class="ac brnavy">사업자번호</th>
                                <th class="ac brnavy">대표자</th>
                                <th class="ac brnavy">업종</th>
                                <th class="ac brnavy">업태</th>
                            </tr>
                            <tr>
                                <td class="ac">순번</td>
                                <td class="ac"></td>
                                <td class="ac">발행일자</td>
                                <td class="ar">공급가액</td>
                                <td class="ar">부가세</td>
                                <td class="ac">공제구분</td>
                                <td class="ac">계산서승인번호</td>
                                <td class="ac">거래처</td>
                                <td class="ac">사업자번호</td>
                                <td class="ac">대표자</td>
                                <td class="ac">업종</td>
                                <td class="ac">업태</td>
                            </tr>
                            <tr>
                                <td class="ac">순번</td>
                                <td class="ac"></td>
                                <td class="ac">발행일자</td>
                                <td class="ar">공급가액</td>
                                <td class="ar">부가세</td>
                                <td class="ac">공제구분</td>
                                <td class="ac">계산서승인번호</td>
                                <td class="ac">거래처</td>
                                <td class="ac">사업자번호</td>
                                <td class="ac">대표자</td>
                                <td class="ac">업종</td>
                                <td class="ac">업태</td>
                            </tr>
                            <tr>
                                <td class="ac">순번</td>
                                <td class="ac"></td>
                                <td class="ac">발행일자</td>
                                <td class="ar">공급가액</td>
                                <td class="ar">부가세</td>
                                <td class="ac">공제구분</td>
                                <td class="ac">계산서승인번호</td>
                                <td class="ac">거래처</td>
                                <td class="ac">사업자번호</td>
                                <td class="ac">대표자</td>
                                <td class="ac">업종</td>
                                <td class="ac">업태</td>
                            </tr>
                            <tr>
                                <td class="ac">순번</td>
                                <td class="ac"></td>
                                <td class="ac">발행일자</td>
                                <td class="ar">공급가액</td>
                                <td class="ar">부가세</td>
                                <td class="ac">공제구분</td>
                                <td class="ac">계산서승인번호</td>
                                <td class="ac">거래처</td>
                                <td class="ac">사업자번호</td>
                                <td class="ac">대표자</td>
                                <td class="ac">업종</td>
                                <td class="ac">업태</td>
                            </tr>
                            <tr>
                                <td class="ac">순번</td>
                                <td class="ac"></td>
                                <td class="ac">발행일자</td>
                                <td class="ar">공급가액</td>
                                <td class="ar">부가세</td>
                                <td class="ac">공제구분</td>
                                <td class="ac">계산서승인번호</td>
                                <td class="ac">거래처</td>
                                <td class="ac">사업자번호</td>
                                <td class="ac">대표자</td>
                                <td class="ac">업종</td>
                                <td class="ac">업태</td>
                            </tr>
                            <tr>
                                <td class="ac">순번</td>
                                <td class="ac"></td>
                                <td class="ac">발행일자</td>
                                <td class="ar">공급가액</td>
                                <td class="ar">부가세</td>
                                <td class="ac">공제구분</td>
                                <td class="ac">계산서승인번호</td>
                                <td class="ac">거래처</td>
                                <td class="ac">사업자번호</td>
                                <td class="ac">대표자</td>
                                <td class="ac">업종</td>
                                <td class="ac">업태</td>
                            </tr>
                            <tr>
                                <td class="ac">순번</td>
                                <td class="ac"></td>
                                <td class="ac">발행일자</td>
                                <td class="ar">공급가액</td>
                                <td class="ar">부가세</td>
                                <td class="ac">공제구분</td>
                                <td class="ac">계산서승인번호</td>
                                <td class="ac">거래처</td>
                                <td class="ac">사업자번호</td>
                                <td class="ac">대표자</td>
                                <td class="ac">업종</td>
                                <td class="ac">업태</td>
                            </tr>
                            <tr>
                                <td class="ac">순번</td>
                                <td class="ac"></td>
                                <td class="ac">발행일자</td>
                                <td class="ar">공급가액</td>
                                <td class="ar">부가세</td>
                                <td class="ac">공제구분</td>
                                <td class="ac">계산서승인번호</td>
                                <td class="ac">거래처</td>
                                <td class="ac">사업자번호</td>
                                <td class="ac">대표자</td>
                                <td class="ac">업종</td>
                                <td class="ac">업태</td>
                            </tr>
                        </table>
                                            </div>
                </div>
            </div>
        </div>
         <div class="wrapper" style="min-height:0px">
            <div class="div" style="width:calc(100%);">
                <div class="div_title">
                    <span class="s_tit"><i class="axi axi-chevron-right"></i>분개정보</span>
                </div>
                <div style="width:100%">
                    <div class="div_line" style="height:50%; position:relative; width:inherit !important">
                        <div class="detail_type02">
                        <table>
                            <tr>
                                <th class="ac brnavy">행번</th>
                                <th class="ac brnavy">사업구분</th>
                                <th class="ac brnavy">계정코드</th>
                                <th class="ac brnavy">차변</th>
                                <th class="ac brnavy">대변</th>
                                <th class="ac brnavy">거래처</th>
                                <th class="ac brnavy">예산명</th>
                                <th class="ac brnavy">배정금액</th>
                                <th class="ac brnavy">기집행금액</th>
                                <th class="ac brnavy">결의누계액</th>
                                <th class="ac brnavy">잔액</th>
                                <th class="ac brnavy">관리항목</th>
                                <th class="ac brnavy">증빙</th>
                                <th class="ac brnavy">증빙번호</th>
                                <th class="ac brnavy">증빙일자</th>
                                <th class="ac brnavy">거래처</th>
                            </tr>
                            
                            <tr>
                                <td class="ac">행번</td>
                                <td class="ac">사업구분</td>
                                <td class="ac">계정코드</td>
                                <td class="ar">차변</td>
                                <td class="ar">대변</td>
                                <td class="ac">거래처</td>
                                <td class="ac">예산명</td>
                                <td class="ac">배정금액</td>
                                <td class="ac">기집행금액</td>
                                <td class="ac">결의누계액</td>
                                <td class="ac">잔액</td>
                                <td class="ac">Q</td>
                                <td class="ac">증빙</td>
                                <td class="ac">증빙번호</td>
                                <td class="ac">증빙일자</td>
                                <td class="ac">거래처</td>
                            </tr>
                        </table>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        
                        
           ///////////////////////////결의서 관리 끝 /////////////////////////////////////////////////////////////////////-->             
                        
                        
    <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">                 
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmUsers"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>                    
                    <li><a href="#none" id="btnRemoveStmUsers"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmUsers"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelStmUsers"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">            
            <div class="consearch_input">
                <form id="searchFormStmUsers">
                    <ul class="consearchinput_list">
                        <li><span class="span">부서</span><div id="deptNmSearchFormStmUsersCombo" style="display:inline-block"></div></li>
                        <li><span class="span">사용자ID</span><input name="userId" id="userIdSearchFormStmUsers"></li>
                        <li><span class="span">사용자명</span><input name="userNm" id="userNmSearchFormStmUsers"></li>                    
                        <li><span class="span">사원여부</span>
                            <select id="empAtSearchFormStmUsers" name="empAt">
                                <option value="">전체</option>
                                <option value="1">사원</option>
                                <option value="0">비사원</option>
                            </select>
                        </li>
                        <li><span class="span">사용여부</span>
                            <select id="useAtSearchFormStmUsers" name="useAt">
                                <option value="">전체</option>
                                <option value="1">사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>
                    </ul>
                </form>  
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmUsers"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmUsers"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>            
        </div>
        <div class="wrapper">    
            <div class="div" style="width:calc(60% - 4px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormStmUsers">0</span>
                </div>
                <div style="width:100%">
                    <div class="div_line" id="dataListStmUsers" style="height:calc(100vh - 120px); position:relative; width:inherit !important"> 
                    </div>
                </div>
            </div>        
            <div class="div_divine"></div>        
            <div class="div" style="width:calc(40% - 3px)">
                <div class="div_line_pd7" style="min-height:calc(100vh - 118px); margin-top:23px;">                
                    <div class="detail_type01">
                        <form id="saveFormStmUsers">
                                        
                            <input type="hidden" name="passwordUpdt"/>
                            <input type="hidden" name="origPassword"/>
                            <input type="hidden" name="deptNm"/>

                            <table>
                                <caption>
                                    <taglibs:transText progrmId="default" key="titStmUsers"/>
                                    <!-- 사용자등록 -->
                                </caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">
                                        <taglibs:transText progrmId="default" key="titEmpno"/>
                                        <!-- 사원번호 -->
                                    </th>
                                    <td>
                                        <input required="true" readonly type="text" name="empno" id="empnoSaveFormStmUsers" maxlength="15" style="width: 50%"/>
                                        <button type="button" id="btnPopEmpSearchStmUsers" class="btn_common01">
                                            <span class="glyphicon glyphicon glyphicon-search"></span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">
                                        <taglibs:transText progrmId="default" key="titUserNm" />
                                        <!-- 사용자명 -->
                                    </th>
                                    <td>
                                        <input required="true" type="text" name="userNm" id="userNmSaveFormStmUsers" maxlength="20" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">
                                        <taglibs:transText progrmId="default" key="titUserId" />
                                        <!-- 사용자ID -->
                                    </th>
                                    <td>
                                        <input required="true" type="text" name="userId" id="userIdSaveFormStmUsers" maxlength="30" style="width: 50%"/>                            
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">
                                        <taglibs:transText progrmId="default" key="titUserPassword" />
                                        <!-- 패스워드 -->
                                    </th>
                                    <td>
                                        <input required="true" type="password" name="userPassword" id="userPasswordSaveFormStmUsers" maxlength="30" style="width: 50%"/>                            
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">
                                        <taglibs:transText progrmId="default" key="titUserIp" />
                                        <!-- 사용자IP -->
                                    </th>
                                    <td>
                                        <input required="true" type="text" name="userIp" id="userIpSaveFormStmUsers" maxlength="100" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <taglibs:transText progrmId="default" key="titEmplAt" />
                                        <!-- 사원여부 -->
                                    </th>
                                    <td>
                                        <div class="checkbox">
                                            <label> 
                                                <input type="checkbox" name="emplAt" id="emplAtSaveFormStmUsers">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <taglibs:transText progrmId="default" key="titUseAt" />
                                        <!-- 사용여부 -->
                                    </th>
                                    <td>
                                        <div class="checkbox">
                                            <label> 
                                                <input type="checkbox" name="useAt" id="useAtSaveFormStmUsers">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">권한부여방식</th>
                                    <td>
                                        <select required="true" name="roleOption" id="roleOptionSaveFormStmUsers" >
                                            <option value="UG">사용자권한+그룹권한</option>
                                            <option value="U">사용자권한</option>
                                            <option value="G">그룹권한</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>사용자그룹권한</th>
                                    <td>
                                        <input type="hidden" type="text" name="roleCode" id="roleCodeSaveFormStmUsers">
                                        <div id="userRoleCodeSaveFormStmUsersCombo"></div>
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
