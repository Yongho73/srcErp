<!-- 
 *    프로그램       : 양식관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.03.18
 *    사용테이블      : SGN_DOC_RAIS
 * sourceGen version : 2021.02.18.01 (2021.03.18)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
   
   <script src="${pageContext.request.contextPath}/js/xerp/ets/fmg/etsfmg000/estfmg000SubItem.js"></script>
   <script src="${pageContext.request.contextPath}/js/xerp/ets/fmg/etsfmg000/estfmg000Item.js"></script>
   <script src="${pageContext.request.contextPath}/js/xerp/ets/fmg/etsfmg000/etsfmg000.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddEtsfmg000"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveEtsfmg000"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveEtsfmg000"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelEtsfmg000"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormEtsfmg000">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">양식번호<!-- <taglibs:transText progrmId="default" key="titRaisNo"/> --></span><input name="raisNo" id="raisNoSearchFormEtsfmg000"></li>
                        <li><span class="span">양식명<!-- <taglibs:transText progrmId="default" key="titRaisNo"/> --></span><input name="raisnm" id="raisNmSearchFormEtsfmg000"></li>
                    </ul>
                </form>                
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchEtsfmg000"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetEtsfmg000"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormEtsfmg000">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListEtsfmg000" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingEtsfmg000">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    -->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormEtsfmg000">
                            <table>
                                <caption>양식<!-- <taglibs:transText progrmId="default" key="titEtsfmg000"/> --></caption>
                                <colgroup>
                                    <col width="12%">
				                    <col width="18%">
				                    <col width="10%">
				                    <col width="20%">
				                    <col width="10%">
				                    <col width="30%">
                                </colgroup>                                
                                <tr>
				                    <th class="essential_icon">문서 분류<!-- <taglibs:transText progrmId="default" key="titDocClsCode"/> --></th>
				                    <td><div id="divDocClsCodeSaveFormEtsfmg000"></div></td>						                     
				                    <th class="essential_icon">기안기 구분<!-- <taglibs:transText progrmId="default" key="titWebDrftAt"/> --></th>
				                    <td>                             
				                        <input type="radio" id="webDrftAtSaveFormEtsfmg000W" name="webDrftAt" value="1" checked/>
				                        <label for="webDrftAtSaveFormEtsfmg000W"><span></span>웹 기안기</label>
				                        <input type="radio" id="webDrftAtSaveFormEtsfmg000H" name="webDrftAt" value="0">                               
				                        <label for="webDrftAtSaveFormEtsfmg000H"><span></span>한글 기안기</label>
				                    </td>						                	 
				                    <th class="essential_icon" rowspan="4">양식 HTML<!-- <taglibs:transText progrmId="default" key="titRaisHtml"/> --></th>
				                    <td rowspan="4">
				                        <textarea required="true" name="raisHtml" id="raisHtmlSaveFormEtsfmg000" style="width:100%; height:150px; float:left"></textarea>
				                        <br/>
				                        <div class="btn" style="float:left; margin-top:5px">                         
				                            <button type="button" id="btnPreViewRaisHtmlSaveFormEtsfmg000" class="btn_common01_new">미리보기</button>
				                        </div>                            
				                    </td>
				                </tr>
				                <tr>
				                    <th class="essential_icon">양식명<!-- <taglibs:transText progrmId="default" key="titRaisnm"/> --></th>
				                    <td colspan="3"><input required="true" type="text" name="raisnm" id="raisnmSaveFormEtsfmg000" maxlength="100" style="width:90%"/></td>						                     
				                </tr>						                 
				                <tr>
				                    <th class="essential_icon">한글양식파일</th>
				                    <td colspan="3">
				                    	<input required="true" type="hidden" name="atchmnfl" id="atchmnflSaveFormEtsfmg000"/>						                        
				                        <div class="file_box" style="float:left; border:0px; font-size:12px">
				                        	
				                            <table style="border:0px;width:100%">
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
				                        <div class="btn" style="float:left; margin-top:5px"><button type="button" id="btnFileUploadSaveFormEtsfmg000" class="btn_common01_new">한글양식파일첨부</button></div>						                        
				                    </td>                     
				                </tr>
				                <tr>
				                    <th class="essential_icon">보존 기간<!-- <taglibs:transText progrmId="default" key="titDocClsCode"/> --></th>
				                    <td><div id="divPrsrvTmlmtCodeSaveFormEtsfmg000"></div></td>
				                    <th>사용 여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></th>
				                    <td>
				                        <div class="checkbox">
				                            <label>
				                              <input type="checkbox" name="useAt" id="useAtSaveFormEtsfmg000">
				                              <i class="input-helper"></i>                                
				                            </label>
				                        </div>
				                    </td>
				                </tr> 
                                <tr>
                                    <th>양식항목<!-- <taglibs:transText progrmId="default" key="titReadngAuthorCode"/> --></th>
                                    <td colspan="5">
                                    	<!-- 타이틀영역 -->
				                        <div class="div_title">
				                            <!-- <div class="left ml5"><span class="table_sumnum" id="spanCntCodeSearchFormStmmng003">0</span></div> -->
				                            <!-- 타이틀영역(우측) -->
				                            <div class="right mr5">
				                                <button class="div_title_btn" type="button" id="btnAddEtsfmg000Item">행추가</button>
				                                <button class="div_title_btn" type="button" id="btnRemoveEtsfmg000Item">행삭제</button>				                                 
				                            </div>
				                        </div>
				                        <!--// 타이틀영역 -->	                                   
	                                    <div id="dataListEtsfmg000Item" style="width: 100%; height: 200px;"></div>
	                              	</td>
                                </tr>
                                <tr>
                                    <th>선택항목<!-- <taglibs:transText progrmId="default" key="titReadngAuthorCode"/> --></th>
                                    <td colspan="5">
                                    	<!-- 타이틀영역 -->
				                        <div class="div_title">
				                            <!-- <div class="left ml5"><span class="table_sumnum" id="spanCntCodeSearchFormStmmng003">0</span></div> -->
				                            <!-- 타이틀영역(우측) -->
				                            <div class="right mr5">
				                                <button class="div_title_btn" type="button" id="btnAddEtsfmg000SubItem">행추가</button>
				                                <button class="div_title_btn" type="button" id="btnRemoveEtsfmg000SubItem">행삭제</button>				                                 
				                            </div>
				                        </div>
				                        <!--// 타이틀영역 -->	                                    
	                                    <div id="dataListEtsfmg000SubItem" style="height: 200px;"></div>
	                              	</td>
                                </tr>
                            </table>
                        </form>
                        <form id="searchFormEtsfmg000Item">
                    		<input type="hidden" name="sortDirection"/>
                    		<input type="hidden" name="sortColumId"/>			                     
               			</form>
               			<form id="searchFormEtsfmg000SubItem">
                    		<input type="hidden" name="sortDirection"/>
                    		<input type="hidden" name="sortColumId"/>			                     
               			</form>
                    </div>  <!--//detail_type01-->                       
                </div>  <!--// outer_line_form -->
            </div><!-- //오른쪽 영역 item4 end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item4으로 변경후 사용 
            <div class="item4"></div>
             --> 
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->

</body>
