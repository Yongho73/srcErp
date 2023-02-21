<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc013/mpsbscTap2Tariff.js"></script>
    <form id="saveFormMpsbscTap2">
        <input type="hidden" name="applcYy" id="applcYy" value="${applcYy}" />
        <input type="hidden" name="changeDe" id="changeDe" value="${changeDe}" />
        <div class="div_title">
            <div class="left ml5"><span class="s_tit"><i class="axi axi-chevron-right"></i>국민연금보험료</span></div>
            <div class="right mr5">
                <ul class="btn">
                    <li><button type="button" id="btnSaveMpsbscTap2" class="btn_common01_new"><taglibs:transText progrmId="default" key="btnSave" /></button></li>
                </ul>
            </div>
        </div>
        <div class="mt5">
            <div class="detail_type01">
                <table>
                    <caption>국민연금보험료<!-- <taglibs:transText progrmId="default" key="titMpsbsc013"/> --></caption>
                    <colgroup>
                        <col width="120">
                        <col width="*">
                        <col width="120">
                        <col width="*">
                        <col width="120">
                        <col width="*">
                        <col width="120">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">근로자 비율<!-- <taglibs:transText progrmId="default" key="titNpnLabrrRt"/> --></th>
                        <td><input required="true" type="text" name="npnLabrrRt" id="npnLabrrRtSaveFormMpsbsc013" maxlength="22" style="width: 70%" class="ar"/>%</td>
                        <th class="essential_icon">사업자 비율<!-- <taglibs:transText progrmId="default" key="titNpnBsnmRt"/> --></th>
                        <td><input required="true" type="text" name="npnBsnmRt" id="npnBsnmRtSaveFormMpsbsc013" maxlength="22" style="width: 70%" class="ar"/>%</td>
                        <th>하한 금액<!-- <taglibs:transText progrmId="default" key="titNpnLwltAmt"/> --></th>
                        <td><input type="text" name="npnLwltAmt" id="npnLwltAmtSaveFormMpsbsc013" maxlength="22" style="width: 70%" class="ar"/>원</td>
                        <th>상한 금액<!-- <taglibs:transText progrmId="default" key="titNpnUplmtAmt"/> --></th>
                        <td><input type="text" name="npnUplmtAmt" id="npnUplmtAmtSaveFormMpsbsc013" maxlength="22" style="width: 70%" class="ar"/>원</td>
                    </tr>
                </table>
            </div>
        </div>
                                    
        <div class="div_title">
            <div class="left ml5"><span class="s_tit"><i class="axi axi-chevron-right"></i>건강보험료</span></div>
            <div class="right mr5"></div>
        </div>
        <div class="mt5">
            <div class="detail_type01">
                <table>
                    <caption>건강보험료<!-- <taglibs:transText progrmId="default" key="titMpsbsc013"/> --></caption>
                    <colgroup>
                        <col width="120">
                        <col width="*">
                        <col width="120">
                        <col width="*">
                        <col width="120">
                        <col width="*">
                        <col width="120">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">근로자 비율<!-- <taglibs:transText progrmId="default" key="titHlthinsLabrrRt"/> --></th>
                        <td><input required="true" type="text" name="hlthinsLabrrRt" id="hlthinsLabrrRtSaveFormMpsbsc013" maxlength="22" style="width: 70%" class="ar"/>%</td>
                        <th class="essential_icon">사업자 비율<!-- <taglibs:transText progrmId="default" key="titHlthinsBsnmRt"/> --></th>
                        <td><input required="true" type="text" name="hlthinsBsnmRt" id="hlthinsBsnmRtSaveFormMpsbsc013" maxlength="22" style="width: 70%" class="ar"/>%</td>                                
                        <th>하한 금액<!-- <taglibs:transText progrmId="default" key="titHlthinsLwltAmt"/> --></th>
                        <td><input type="text" name="hlthinsLwltAmt" id="hlthinsLwltAmtSaveFormMpsbsc013" maxlength="22" style="width: 70%" class="ar"/>원</td>
                        <th>상한 금액<!-- <taglibs:transText progrmId="default" key="titHlthinsUplmtAmt"/> --></th>
                        <td><input type="text" name="hlthinsUplmtAmt" id="hlthinsUplmtAmtSaveFormMpsbsc013" maxlength="22" style="width: 70%" class="ar"/>원</td>
                    </tr>
                </table>
            </div>
        </div>
                                    
        <div class="div_title">
            <div class="left ml5"><span class="s_tit"><i class="axi axi-chevron-right"></i>장기요양보험료</span></div>
            <div class="right mr5"></div>
        </div>
        <div class="mt5">
            <div class="detail_type01">
                <table>
                    <caption>장기요양보험료<!-- <taglibs:transText progrmId="default" key="titMpsbsc013"/> --></caption>
                    <colgroup>
                        <col width="120">
                        <col width="*">
                        <col width="120">
                        <col width="*">
                        <col width="120">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">근로자 비율<!-- <taglibs:transText progrmId="default" key="titLtciLabrrRt"/> --></th>
                        <td><input required="true" type="text" name="ltciLabrrRt" id="ltciLabrrRtSaveFormMpsbsc013" maxlength="22" style="width: 50%" class="ar"/>%</td>
                        <th class="essential_icon">사업자 비율<!-- <taglibs:transText progrmId="default" key="titLtciBsnmRt"/> --></th>
                        <td><input required="true" type="text" name="ltciBsnmRt" id="ltciBsnmRtSaveFormMpsbsc013" maxlength="22" style="width: 50%" class="ar"/>%</td>                                
                        <th>건강보험 비율<!-- <taglibs:transText progrmId="default" key="titLtciHlthinsRt"/> --></th>
                        <td><input type="text" name="ltciHlthinsRt" id="ltciHlthinsRtSaveFormMpsbsc013" maxlength="22" style="width: 50%" class="ar"/>%</td>                                 
                    </tr>
                </table>
            </div>
        </div>
                                    
        <div class="div_title">
            <div class="left ml5"><span class="s_tit"><i class="axi axi-chevron-right"></i>고용보험</span></div>
            <div class="right mr5"></div>
        </div>
        <div class="mt5">
            <div class="detail_type01">
                <table>
                    <caption>고용보험<!-- <taglibs:transText progrmId="default" key="titMpsbsc013"/> --></caption>
                    <colgroup>
                        <col width="120">
                        <col width="*">
                        <col width="120">
                        <col width="*">
                        <col width="120">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">근로자 비율<!-- <taglibs:transText progrmId="default" key="titEpisLabrrRt"/> --></th>
                        <td><input required="true" type="text" name="episLabrrRt" id="episLabrrRtSaveFormMpsbsc013" maxlength="22" style="width: 50%" class="ar"/>%</td>
                        <th class="essential_icon">사업자 비율<!-- <taglibs:transText progrmId="default" key="titEpisBsnmRt"/> --></th>
                        <td><input required="true" type="text" name="episBsnmRt" id="episBsnmRtSaveFormMpsbsc013" maxlength="22" style="width: 50%" class="ar"/>%</td>                             
                        <th>고용보험 부담금<!-- <taglibs:transText progrmId="default" key="titEpisAlotm"/> --></th>
                        <td><input type="text" name="episAlotm" id="episAlotmSaveFormMpsbsc013" maxlength="22" style="width: 50%" class="ar"/>원</td>                                    
                    </tr>
                </table>
            </div>
        </div>
                                    
        <div class="div_title">
            <div class="left ml5"><span class="s_tit"><i class="axi axi-chevron-right"></i>산재보험</span></div>
            <div class="right mr5"></div>
        </div>
        <div class="mt5">
            <div class="detail_type01">
                <table>
                    <caption>산재보험<!-- <taglibs:transText progrmId="default" key="titMpsbsc013"/> --></caption>
                    <colgroup>
                        <col width="120">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th>산재보험 요율<!-- <taglibs:transText progrmId="default" key="titIaciTariff"/> --></th>
                        <td><input type="text" name="iaciTariff" id="iaciTariffSaveFormMpsbsc013" maxlength="22" style="width: 20%" class="ar"/>%</td>                                        
                    </tr>
                </table>
            </div>
        </div>
    </form>
</body>