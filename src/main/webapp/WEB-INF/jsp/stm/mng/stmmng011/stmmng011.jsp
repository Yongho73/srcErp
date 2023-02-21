<!-- 
 *    프로그램       : 프로그램개선요청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.03
 *    사용테이블      : STM_PRG_REQUST
 * sourceGen version : 2020.07.16.01 (2020.08.03)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng011/stmmng011.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmmng011"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
   
                    <li><a href="#none" id="btnExcelStmmng011"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
         <form id="searchFormStmmng011">
        <div class="consearch_div">
            <div class="consearch_input">
  
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/> 
                    <ul class="consearchinput_list">
                        <li><span class="span">요청자</span>
                            <input type="text" name="requestPersonId" id="requestPersonId" style="width: 60px;" autocomplete="off" maxlength="15"> 
                            <input type="text" name="requestPersonName" id="requestPersonName" autocomplete="off" maxlength="15">
                            <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
                        </li>
                        <li><span class="span">메뉴</span>
                            <input type="text" name="requestMenuId" id="requestMenuId" style="width: 80px;" autocomplete="off" maxlength="15"> 
                            <input type="text" name="requestMenuName" id="requestMenuName" autocomplete="off" maxlength="15"> 
                            <button type="button" id="btnMenuSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
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
                        <li><span class="span">업무분류</span><div id="divComboSysSe" style="display:inline-block"></div></li>
                        <li><span class="span">진행상태</span><div id="divComboSttusSe" style="display:inline-block"></div></li>
                        <li><span class="span">요청일자</span>
                            <input type="text" name="bgnRequstDe" id="bgnRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> 
                            ~ <input type="text" name="endRequstDe" id="endRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>
                    </ul>
              
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmmng011"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmmng011"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
          </form>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <div class="left">
                    <span class="table_sumnum" id="spanCntSearchFormStmmng011">0</span>
                </div>
                </div>
                <div class="mt5 outer_line_grid" style="height:calc(100vh - 160px) !important;">
                    <div class="dhtml_line">
                        <div class="dhtml_grid" id="dataListStmmng011" style="height:calc(100vh - 160px) !important; position:relative; ">
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>

</body>
