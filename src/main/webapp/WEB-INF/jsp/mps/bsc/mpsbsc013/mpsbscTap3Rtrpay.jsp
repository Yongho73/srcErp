<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc013/mpsbscTap3Rtrpay.js"></script>
    <form id="saveFormMpsbscTap3">
        <input type="hidden" name="applcYy" id="applcYy" value="${applcYy}" />
        <input type="hidden" name="changeDe" id="changeDe" value="${changeDe}" />
        <div class="div_title" >
            <div class="left mr5"><span class="s_tit"><i class="axi axi-chevron-right"></i>퇴직금기초설정</span></div>
            <div class="right mr5">
                <ul class="btn">
                    <li><button type="button" id="btnSaveMpsbscTap3" class="btn_common01_new"><taglibs:transText progrmId="default" key="btnSave" /></button></li>
                </ul>
            </div>
        </div>
        <div class="mt5">
            <div class="detail_type01" >
                <table>
                    <caption>퇴직금기초설정<!-- <taglibs:transText progrmId="default" key="titMpsbsc013"/> --></caption>
                    <colgroup>
                        <col width="150">
                        <col width="39%">
                        <col width="150">
                        <col width="">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">퇴사일 포함 여부<!-- <taglibs:transText progrmId="default" key="titEpisLabrrRt"/> --></th>
                        <td>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="retiredayInclsAt" id="retiredayInclsAtSaveFormMpsbsc013">
                                    <i class="input-helper"></i>
                                </label>
                            </div>
                        </td>
                        <th> 한달 기준일 <!-- <taglibs:transText progrmId="default" key="titEpisLabrrRt"/> --></th>
                        <td><input required="true" type="text" name="mtStdrDaycnt" id="mtStdrDaycntSaveFormMpsbsc013" maxlength="22" style="width: 50%" class="ar"/> 일</td>
                    </tr>
                    <tr>
                        <th class="essential_icon">평균임금 계산식 <!-- <taglibs:transText progrmId="default" key="titEpisLabrrRt"/> --></th>
                        <td  colspan="3">
                            <input type="radio" name="avrgwagecalcSeCode" value="002" id="002avrgwagecalcSeCodeSaveFormMpsbsc013" checked> <label for="002avrgwagecalcSeCodeSaveFormMpsbsc013"><span></span>일할계산</label>
                            <input type="text" name="a"  value="(3개월 급여 + 3개월 상여 + 3개월 연차) / 3개월 근무일수)" size="60" style="background-color:#EAEAEA" readonly/>
                            <input type="radio" name="avrgwagecalcSeCode" value="003" id="003avrgwagecalcSeCodeSaveFormMpsbsc013"/> <label for="003avrgwagecalcSeCodeSaveFormMpsbsc013"><span></span>월할계산</label>
                            <input type="text" name="b"  value="(3개월 급여 + 3개월 상여 + 3개월 연차) / 3"  style="background-color:#EAEAEA" size="40" readonly/>                                    
                        </td>
                    </tr>
                    <tr>
                        <th class="essential_icon">상여 / 연차 계산 <!-- <taglibs:transText progrmId="default" key="titEpisLabrrRt"/> --></th>
                        <td  colspan="3">
                            <input type="radio" name="bnscalcSeCode" value="002" id="002bnscalcSeCodeSaveFormMpsbsc013" checked> <label for="002bnscalcSeCodeSaveFormMpsbsc013"><span></span>일할계산</label>
                            <input type="text" name="a"  value="1년 상여, 연차 * 근무일수 / 365 " size="60" style="background-color:#EAEAEA" readonly/>
                            <input type="radio" name="bnscalcSeCode" value="003" id="003bnscalcSeCodeSaveFormMpsbsc013"/> <label for="003bnscalcSeCodeSaveFormMpsbsc013"><span></span>월할계산</label>
                            <input type="text" name="b"  value="1년 상여, 연차 * 3 / 12  "  style="background-color:#EAEAEA" size="40" readonly />                               
                        </td>
                    </tr>
                    <tr>
                        <th class="essential_icon">퇴직금 계산 <!-- <taglibs:transText progrmId="default" key="titEpisLabrrRt"/> --></th>
                        <td   colspan="3">
                            <input type="radio" name="retirecalcSeCode" value="002" id="002retirecalcSeCodeSaveFormMpsbsc013" checked> <label for="002retirecalcSeCodeSaveFormMpsbsc013"><span></span>일할계산</label>
                            <input type="text" name="a"  value="(평균임금 * 30 * 근무일수) / 365  " size="60" style="background-color:#EAEAEA" readonly/>
                            <input type="radio" name="retirecalcSeCode" value="003" id="003retirecalcSeCodeSaveFormMpsbsc013"/> <label for="003retirecalcSeCodeSaveFormMpsbsc013"><span></span>월할계산</label>
                            <input type="text" name="b"  value="평균임금 * (근무일수 / 365)   "  style="background-color:#EAEAEA" size="40" readonly />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </form>
</body>