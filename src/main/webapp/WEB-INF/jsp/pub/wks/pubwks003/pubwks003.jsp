<!-- 
 *    프로그램       : 휴가신청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.04
 *    사용테이블      : MHS_WRYC
 -->
<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pub/wks/pubwks003/pubwks003.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <!-- <li><a href="#none" id="btnAddPubwks003"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemovePubwks003"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                    <li><a href="#none" id="btnSavePubwks003"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelPubwks003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div>
        	<form id="searchFormPubwks003">
        	<div class="consearch_div">
            	<div class="consearch_input">
            		<input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li id='searchApplyTime'><span class="span">신청일자</span>
                             <input type="text" name="searchApplyBeginTime" id="searchApplyBeginTimePubwks003"  class="input_calen"/> ~ 
                             <input type="text" name="searchApplyEndTime" id="searchApplyEndTimePubwks003"  class="input_calen"/>
                             <div id="searchTime_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                         </li> 
                         <li><span class="span">사원</span>
                            <input type="text" readonly="readonly" name="searchEmpNo" id="searchEmpCodePubwks003" class="w50"/>
                            <input type="text" readonly="readonly" name="searchEmpCodeNm" id="searchEmpNmPubwks003" class="w90"/>
                            <button type="button" readonly="readonly"  id="btnSearchEmpCode" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                         </li>
                         <li><span class="span">부서</span>
                            <input type="text" readonly="readonly" name="searchDeptNo" id="searchDeptNoPubwks003" class="w50"/>
                            <input type="text" readonly="readonly" name="searchDeptNm" id="searchDeptNmPubwks003" class="w90"/>
                            <button type="button" readonly="readonly"  id="btnSearchDeptCode" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                         </li>
                   </ul>
                   </div>
                   </div>
                   <div class="consearch_div">
            	   <div class="consearch_input">
            			<input type="hidden" name="sortDirection"/>
                    	<input type="hidden" name="sortColumId"/>
                    	<input type="hidden" name="selectedPageNum"/>
                    	<ul class="consearchinput_list">
                       		<li id='searchWryTime'><span class="span">휴가일자</span>
                           		<input type="text" name="searchWryBeginTime" id="searchWryBeginTimePubwks003"  class="input_calen"/> ~  
                           		<input type="text" name="searchWryEndTime" id="searchWryEndTimePubwks003"  class="input_calen"/>
                           		<div id="searchWryTime_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                       		</li>  
                       		<li><span class="span">휴가구분</span><div id="divComboSearchWrycSeCode" class="div_combo"></div></li>
                       		<!-- <li><span class="span">결재상태</span><div id="divComboSearchElctsctSttusCode"  class="div_combo"></div></li> -->
                   		</ul>
                   	</div>
                   	<div class="consearchbt_div">
               		 	<ul class="consearchbt_list">
                    		<li><a href="#none" id="btnSearchPubwks003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    		<li><a href="#none" id="btnResetPubwks003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                		</ul>
            		</div>
               	</form>
           </div>
        <div class="flex">
            <div class="item6">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormPubwks003">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListPubwks003" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPubwks003">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="right"></div>
                    -->
                    <div class="left ml5"><span class="s_tit" id="userLayoff"><i class="axi axi-chevron-right"></i></span></div>
                </div>
                <div class="mt5 outer_line_form" style="height:calc(100vh - 120px)">
                    <div class="detail_type01">
                        <form id="saveUserFormPubwks003">
                            <table>
                                <caption>연차사용일수<!-- <taglibs:transText progrmId="default" key="titPubwks003"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="200">
                                    <col width="200">
                                    <col width="200">
                                </colgroup>
                                <tr>
                                    <th style="text-align:center;">구분</th>
                                    <th style="text-align:center;">일수</th>
                                    <th style="text-align:center;">사용일수</th>
                                    <th style="text-align:center;">잔여일수</th>
                                </tr>
                                <tr>
                                    <th style="text-align:center;">연차</th>
                                    <td class="ac"><input class = "w90p ac" type="text" readonly="readonly" name="wrycDaycnt" id="wrycDaycntSaveFormPubwks003"/></td>
                                    <td class="ac"><input class = "w90p ac" type="text" readonly="readonly" name="usingDaycnt" id="usingDaycntSaveFormPubwks003"/></td>
                                    <td class="ac"><input class = "w90p ac" type="text" readonly="readonly" name="remainderDaycnt" id="remainderDaycntSaveFormPubwks003"/></td>
                                </tr>
                                <tr>
                                    <th style="text-align:center;">기타</th>
                                    <td class="ac"><input class = "w90p ac" type="text" readonly="readonly" name="otherWrycDaycnt" id="otherWrycDaycntSaveFormPubwks003"/></td>
                                    <td class="ac"><input class = "w90p ac" type="text" readonly="readonly" name="otherUsingDaycnt" id="otherUsingDaycntSaveFormPubwks003"/></td>
                                    <td class="ac"><input class = "w90p ac" type="text" readonly="readonly" name="otherRemainderDaycnt" id="otherRemainderDaycntSaveFormPubwks003"/></td>
                                </tr>
                            </table>
                        </form>
                    </div>  <!--//detail_type01--> 
                    <div>
                        <div class="div_title">
                            <div class="left ml5"><span class="s_tit"><i class="axi axi-chevron-right"></i>휴가신청</span></div>
                            <div class="right mr5"></div>
                        </div>
                        <div class="">
                            <div class="detail_type01">
                            <form id="saveFormPubwks003">
                            <table>
                                <caption>휴가신청<!-- <taglibs:transText progrmId="default" key="titPubwks003"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">신청일자<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                    <td ><input type="text" readonly="readonly" name="reqstDe" id="reqstDeSaveFormPubwks003" style="widht:97%;"/></td>
                                    <th class="essential_icon">신청자<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></th>
                                    <td id="saveEmpPubwks003" colspan="3">
                                        <input required="true" type="text" readonly="readonly" name="empNm" id="empNmSaveFormPubwks003" style="widht:97%;"/>
                                        <input required="true" type="hidden" readonly="readonly" name="deptNm" id="deptNmSaveFormPubwks003"/>
                                        <input required="true" type="hidden" readonly="readonly" name="empno" id="empCodeSaveFormPubwks003"/>
                                    </td>
                                </tr>
<!--                                 <tr> -->
<!--                                     <th class="essential_icon">등록일자</th> -->
<!--                                     <td ><input type="text" readonly="readonly" name="regDe" id="regDeSaveFormPubwks003" style="widht:97%;"/></td> -->
<!--                                     <th class="essential_icon">등록자<taglibs:transText progrmId="default" key="titReqstDe"/></th> -->
<!--                                     <td colspan="3"><input type="text" readonly="readonly" name="regNm" id="regNmSaveFormPubwks003" style="widht:97%;"/> -->
<!--                                 </tr> -->
                                <tr>
                                    <th class="essential_icon">휴가구분<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                    <td><div id="divComboSaveWrycSeCode"></div></td>
                                    <th class="essential_icon">비상연락처<!-- <taglibs:transText progrmId="default" key="titEmgncTelno"/> --></th>
                                    <td><input type="text" readonly="readonly" name="emgncTelno" id="emgncTelnoSaveFormPubwks003" style="widht:97%;" placeholder="ex(010-0000-0000)" required/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">휴가기간<!-- <taglibs:transText progrmId="default" key="titWrycBeginTime"/> --></th>
                                        <td colspan='3'>
                                            <input type="text" readonly="readonly" name="wrycBeginTime" id="wrycBeginTimeSaveFormPubwks003"  class="input_calen"/> 
                                            <!-- <select name="wrycFromTime" class="select2" id="wrycFromTimeSaveFormPubwks003">
                                                    <option value="00" selected>00</option>
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="03">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                </select>
                                            시 -->~ 
                                            <input type="text" readonly="readonly" name="wrycEndTime" id="wrycEndTimeSaveFormPubwks003"  class="input_calen" />
                                            <!-- <select name="wrycToTime" class="select2" id="wrycToTimeSaveFormPubwks003">
                                                    <option value="00" selected>00</option>
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="03">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                </select> 시 -->
                                                <div id="save_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 --></div>
                                        </td>
                                    </tr>
                                </tr>
                                <tr>
                                    <th>신청사유<!-- <taglibs:transText progrmId="default" key="titReqstDtls"/> --></th>
                                    <td colspan='3'><input name="reqstDtls" id="reqstDtlsSaveFormPubwks003" rows="3" style="width: 96%;"></input></td>
                                </tr>
                                <tr>
                                   <!--  <th>직무대행자<taglibs:transText progrmId="default" key="titEmpno"/></th>
                                    <td colspan="3"> 
                                        <input type="text" readonly="readonly" name="agentEmpno" id="agentEmpnoSaveFormPubwks003" class="w30p"/>
                                        <input  type="text" readonly="readonly" name="agentEmpNm" id="agentEmpNmSaveFormPubwks003" class="w30p"/>
                                        <button type="button" id="btnAgentEmpCodeSave" class="btn_common03">
                                        <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
                                    </td> -->
                                </tr>
                                <tr>
                                    <th>결재상태<!-- <taglibs:transText progrmId="default" key="titHdadptAt"/> --></th>
                                    <td colspan='3'><input readonly="readonly" type="text" id="elctsctSttusCodeNmPubwks003" name = "elctsctSttusCodeNm" style="widht:97%;"/></td>
                                    <!-- <th>결재사원</th>
                                    <td><input readonly="readonly" type="text" id="elctsctEmpnmPubwks003" name = "elctsctEmpnm" style="widht:97%;"/></td> -->
                                </tr>
                                <tr>
                                    <!-- <th>대체휴무</th>
                                    <td> 
                                        <input type="text" readonly="readonly" name="altHvofUseAt" id="altHvofUseAtSaveFormPubwks003" style="width: 70%;"/>
                                        <button type="button" id="btnAltHvofDeSearchPopup" class="btn_common03">
                                        <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
                                    </td>
                                    <th>보상휴가<taglibs:transText progrmId="default" key="titRewardHvofUseAt"/></th> 
                                    <td>
                                        <div class="checkbox" style="display:inline-block;">
                                            <label><input type="checkbox" readonly="readonly" name="rewardHvofUseAt" id="rewardHvofUseAtSaveFormPubwks003" maxlength="1"/><i class="input-helper"></i></label>
                                        </div>
                                        <button type="button" id="btnRewardHvofDeSearchPopup" class="btn_common01_new">보상휴가내역</button>
                                    </td>  -->
                                </tr>
                                <tr>
                                    <!-- <th>철회여부</th>
                                    <td>
                                        <div class="checkbox" style="display:inline-block;">
                                            <label><input type="checkbox" readonly="readonly" name="wthdrawAt" id="wthdrawAtSaveFormPubwks003" maxlength="1"/><i class="input-helper"></i></label>
                                        </div>
                                        <button type="button" id="wthdrawRequestBtn" class="btn_common01_new">철회신청</button>
                                    </td>
                                    <th>철회신청상태</th>
                                    <td>
                                        <input type="text" readonly="readonly" name="wthdrawElctsctSttusCodeNm" id="wthdrawElctsctSttusCodeNmSaveFormPubwks003" style="width:97%; text-align: center;"/>
                                    </td> -->
                                </tr>
                                <tr>
                                   <!--  <th>철회사유</th>
                                    <td colspan="3"><input type="text" readonly="readonly" name="wthdrawRm" id="wthdrawRmSaveFormPubwks003" maxlength="200" style="width: 98.5%"/></td> -->
                                </tr>    
                            </table>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>  <!--// outer_line_form -->
            </div><!-- //오른쪽 영역 item4 end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item4으로 변경후 사용 
            <div class="item4"></div>
             --> 
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->
</body>
