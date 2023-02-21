<!-- 
 *    프로그램       : 호봉테이블등록 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.09
 *    사용테이블      : MPS_SRCLSTBLDETAIL
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<body>
    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc007/mpsbsc007.js"></script>
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                     <li><a href="#none" id="btnAddMpsbsc007"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li> 
                     <li><a href="#none" id="btnRemoveMpsbsc007"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> 
                     <li><a href="#none" id="btnSaveMpsbsc007"><i class="axi axi-save mr5"></i><span>저장</span></a></li> 
                     <li><a href="#none" id="btnExcelMpsbsc007"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> 
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsbsc007">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                         <li><span class="span">적용년도<!--<taglibs:transText progrmId="default" key="titApplcYy" />--></span>
                         <input name="applcYm" id="applcYmSearchFormMpsbsc007"  class="numType" maxlength="10">
                         <input type="hidden" name="applcYy" id=""  class="moneyType" maxlength="10">
                         <input type="hidden" name="applcYy" id=""  class="numOutType" maxlength="10">
                         
                         </li>
<!--                         <li><span class="span">직급 코드<taglibs:transText progrmId="default" key="titClsfCode"/></span><input name="clsfCode" id="clsfCodeSearchFormMpsbsc007"></li> -->
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpsbsc007"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsbsc007"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>                
        
         <div class="flex">
            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">                        
                        <span class="table_sumnum" id="spanCntSearchFormMpsbsc007">0</span>                         
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right">                        
                    </div>
                </div>
                <!--// 타이틀영역 -->
                 <div class="mt5 outer_line_grid">
                    <div class="dhtml_line">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->

                      <div  class="dhtml_grid"   id="dataListMpsbsc007Master" ></div>                      
                    </div>
                </div>                
            </div><!-- //왼쪽 영역 item end -->

            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title"> <!-- 높이만 잡고 싶은 경우 빈 div_title만 남기고 안쪽은 지워준다 -->
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">                        
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>호봉내역</span>
                        <span class="table_sumnum" id="spanCntSearchFormMpsbsc007Detail">0</span>                        
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right">                    
                        <div class="right ml7">
                            <button type="button" id="btnHobRasieMpsbsc007Detail" class="div_title_btn"> 호봉인상<!--<taglibs:transText progrmId="default" key="btnSave" /> --></button>
                        </div>                             
                    </div>               
                </div>
                <!--// 타이틀영역 -->                
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->

                        <div id="dataListMpsbsc007" class="dhtml_grid"></div>
                    </div>
                </div>               
             </div><!--  item3-->             
        </div>
    </div>
</body>
