package kr.co.dbvision.api.stm.mng.stmmng010.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 프로그램 개발현황관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.10
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.10          디비비전              최초 생성
 * </pre>
 */

public class Stmmng010 extends CommonVO {

    /* 프로그램ID */
    private String progrmId;
    /* 예정시작일자 */
    private String prearngeBeginDe;
    /* 예정종료일자 */
    private String prearngeEndDe;
    /* 담당자사원번호 */
    private String chargerEmpno;
    /* 실제 시작 일자 */
    private String realBeginDe;
    /* 실제 종료 일자 */
    private String realEndDe;
    /* 진행상태(C189) */
    private String progrsSttus;
    /* PL 사원번호 */
    private String plEmpno;
    /* PL확인일자 */
    private String plConfirmDe;
    /* PM 사원번호 */
    private String pmEmpno;
    /* PM확인일자 */
    private String pmConfirmDe;
    /* TEST 1차 사원번호 */
    private String pmoEmpno;
    /* TEST 2차 사원번호 */
    private String tftEmpno;
    /* TEST 1차 확인 일자 */
    private String pmoConfirmDe;
    /* TEST 2차 확인 일자 */
    private String tftConfirmDe;
    
    private String plConfirmResult;
    
    private String pmConfirmResult;
    
    private String pmoConfirmResult;
    
    private String tftConfirmResult;
    /* 비고 */
    private String rm;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmmng010() {
        //
    }

    public Stmmng010(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.progrmId = StringExpression.nullConvert(egovMap.get("progrmId"));
            this.prearngeBeginDe = StringExpression.nullConvert(egovMap.get("prearngeBeginDe"));
            this.prearngeEndDe = StringExpression.nullConvert(egovMap.get("prearngeEndDe"));
            this.chargerEmpno = StringExpression.nullConvert(egovMap.get("chargerEmpno"));
            this.realBeginDe = StringExpression.nullConvert(egovMap.get("realBeginDe"));
            this.realEndDe = StringExpression.nullConvert(egovMap.get("realEndDe"));
            this.progrsSttus = StringExpression.nullConvert(egovMap.get("progrsSttus"));
            this.plEmpno = StringExpression.nullConvert(egovMap.get("plEmpno"));
            this.plConfirmDe = StringExpression.nullConvert(egovMap.get("plConfirmDe"));
            this.pmEmpno = StringExpression.nullConvert(egovMap.get("pmEmpno"));
            this.pmConfirmDe = StringExpression.nullConvert(egovMap.get("pmConfirmDe"));
            this.pmoEmpno = StringExpression.nullConvert(egovMap.get("pmoEmpno"));
            this.tftEmpno = StringExpression.nullConvert(egovMap.get("tftEmpno"));
            this.pmoConfirmDe = StringExpression.nullConvert(egovMap.get("pmoConfirmDe"));
            this.tftConfirmDe = StringExpression.nullConvert(egovMap.get("tftConfirmDe"));
            this.plConfirmResult = StringExpression.nullConvert(egovMap.get("plConfirmResult"));
            this.pmConfirmResult = StringExpression.nullConvert(egovMap.get("pmConfirmResult"));
            this.pmoConfirmResult = StringExpression.nullConvert(egovMap.get("pmoConfirmResult"));
            this.tftConfirmResult = StringExpression.nullConvert(egovMap.get("tftConfirmResult"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Stmmng010(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.progrmId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_progrmId")));
            this.prearngeBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prearngeBeginDe")));
            this.prearngeEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prearngeEndDe")));
            this.chargerEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerEmpno")));
            this.realBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realBeginDe")));
            this.realEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realEndDe")));
            this.progrsSttus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_progrsSttus")));
            this.plEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_plEmpno")));
            this.plConfirmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_plConfirmDe")));
            this.pmEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pmEmpno")));
            this.pmConfirmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pmConfirmDe")));
            this.pmoEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pmoEmpno")));
            this.tftEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_tftEmpno")));
            this.pmoConfirmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pmoConfirmDe")));
            this.tftConfirmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_tftConfirmDe")));
            this.plConfirmResult = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_plConfirmResult")));
            this.pmConfirmResult = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pmConfirmResult")));
            this.pmoConfirmResult = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pmoConfirmResult")));
            this.tftConfirmResult = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_tftConfirmResult")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getProgrmId() {
        return progrmId;
    }
    public void setProgrmId(String progrmId) {
        this.progrmId = progrmId;
    }

    public String getPrearngeBeginDe() {
        return prearngeBeginDe;
    }
    public void setPrearngeBeginDe(String prearngeBeginDe) {
        this.prearngeBeginDe = prearngeBeginDe;
    }

    public String getPrearngeEndDe() {
        return prearngeEndDe;
    }
    public void setPrearngeEndDe(String prearngeEndDe) {
        this.prearngeEndDe = prearngeEndDe;
    }

    public String getChargerEmpno() {
        return chargerEmpno;
    }
    public void setChargerEmpno(String chargerEmpno) {
        this.chargerEmpno = chargerEmpno;
    }

    public String getRealBeginDe() {
        return realBeginDe;
    }
    public void setRealBeginDe(String realBeginDe) {
        this.realBeginDe = realBeginDe;
    }

    public String getRealEndDe() {
        return realEndDe;
    }
    public void setRealEndDe(String realEndDe) {
        this.realEndDe = realEndDe;
    }

    public String getProgrsSttus() {
        return progrsSttus;
    }
    public void setProgrsSttus(String progrsSttus) {
        this.progrsSttus = progrsSttus;
    }

    public String getPlEmpno() {
        return plEmpno;
    }
    public void setPlEmpno(String plEmpno) {
        this.plEmpno = plEmpno;
    }

    public String getPlConfirmDe() {
        return plConfirmDe;
    }
    public void setPlConfirmDe(String plConfirmDe) {
        this.plConfirmDe = plConfirmDe;
    }

    public String getPmEmpno() {
        return pmEmpno;
    }
    public void setPmEmpno(String pmEmpno) {
        this.pmEmpno = pmEmpno;
    }

    public String getPmConfirmDe() {
        return pmConfirmDe;
    }
    public void setPmConfirmDe(String pmConfirmDe) {
        this.pmConfirmDe = pmConfirmDe;
    }

    public String getPmoEmpno() {
        return pmoEmpno;
    }
    public void setPmoEmpno(String pmoEmpno) {
        this.pmoEmpno = pmoEmpno;
    }

    public String getTftEmpno() {
        return tftEmpno;
    }
    public void setTftEmpno(String tftEmpno) {
        this.tftEmpno = tftEmpno;
    }

    public String getPmoConfirmDe() {
        return pmoConfirmDe;
    }
    public void setPmoConfirmDe(String pmoConfirmDe) {
        this.pmoConfirmDe = pmoConfirmDe;
    }

    public String getTftConfirmDe() {
        return tftConfirmDe;
    }
    public void setTftConfirmDe(String tftConfirmDe) {
        this.tftConfirmDe = tftConfirmDe;
    }

    public String getPlConfirmResult() {
        return plConfirmResult;
    }

    public void setPlConfirmResult(String plConfirmResult) {
        this.plConfirmResult = plConfirmResult;
    }

    public String getPmConfirmResult() {
        return pmConfirmResult;
    }

    public void setPmConfirmResult(String pmConfirmResult) {
        this.pmConfirmResult = pmConfirmResult;
    }

    public String getPmoConfirmResult() {
        return pmoConfirmResult;
    }

    public void setPmoConfirmResult(String pmoConfirmResult) {
        this.pmoConfirmResult = pmoConfirmResult;
    }

    public String getTftConfirmResult() {
        return tftConfirmResult;
    }

    public void setTftConfirmResult(String tftConfirmResult) {
        this.tftConfirmResult = tftConfirmResult;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
    }

    public String getRegDt() {
        return regDt;
    }
    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getRegId() {
        return regId;
    }
    public void setRegId(String regId) {
        this.regId = regId;
    }

    public String getUptDt() {
        return uptDt;
    }
    public void setUptDt(String uptDt) {
        this.uptDt = uptDt;
    }

    public String getUptId() {
        return uptId;
    }
    public void setUptId(String uptId) {
        this.uptId = uptId;
    }

    public String getNativeeditorStatus() {
        return nativeeditorStatus;
    }

    public void setNativeeditorStatus(String nativeeditorStatus) {
        this.nativeeditorStatus = nativeeditorStatus;
    }
    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
