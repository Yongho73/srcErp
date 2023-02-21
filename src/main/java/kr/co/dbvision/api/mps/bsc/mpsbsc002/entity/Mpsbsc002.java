package kr.co.dbvision.api.mps.bsc.mpsbsc002.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 급여항목기준관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.07          디비비전              최초 생성
 * </pre>
 */

public class Mpsbsc002 extends CommonVO {

    /* 급여유형코드(급여/상여/특별성과) */
    private String salarytyCode;
    /* 급여항목코드 */
    private String salaryitemCode;
    /* 한도 금액 */
    private String lmtAmt;
    /* 금액지정을 선택했을시 적용할 기준금액 항목 */
    private String stdrAmt;
    /* 과세대상 항목 여부[Y|N] 항목 */
    private String taxtAt;
    /* 귀속 년도 */
    private String rversYy;
    /* 비과세 코드(국세청코드) */
    private String taxeCode;
    /* 사용시작일 */
    private String useBeginDe;
    /* 사용종료일 */
    private String useEndDe;
    /* 사용여부 */
    private String useAt;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 금액기준등록 대상여부 */
    private String amtStdrRegistTrgetAt;
    /* 적용 구분 */
    private String applcSe;
    /* 계산 구분  */
    private String calcSe;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbsc002() {
        //
    }

    public Mpsbsc002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.salarytyCode = StringExpression.nullConvert(egovMap.get("salarytyCode"));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get("salaryitemCode"));
            this.lmtAmt = StringExpression.nullConvert(egovMap.get("lmtAmt"));
            this.stdrAmt = StringExpression.nullConvert(egovMap.get("stdrAmt"));
            this.taxtAt = StringExpression.nullConvert(egovMap.get("taxtAt"));
            this.rversYy = StringExpression.nullConvert(egovMap.get("rversYy"));
            this.taxeCode = StringExpression.nullConvert(egovMap.get("taxeCode"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.amtStdrRegistTrgetAt = StringExpression.nullConvert(egovMap.get("amtStdrRegistTrgetAt"));
            this.applcSe = StringExpression.nullConvert(egovMap.get("applcSe"));
            this.calcSe = StringExpression.nullConvert(egovMap.get("calcSe"));
        }
    }

    public Mpsbsc002(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.salarytyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarytyCode")));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemCode")));
            this.lmtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lmtAmt")));
            this.stdrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stdrAmt")));
            this.taxtAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxtAt")));
            this.rversYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rversYy")));
            this.taxeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxeCode")));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useBeginDe")));
            this.useEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useEndDe")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.amtStdrRegistTrgetAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_amtStdrRegistTrgetAt")));
            this.applcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcSe")));
            this.calcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcSe")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getSalarytyCode() {
        return salarytyCode;
    }
    public void setSalarytyCode(String salarytyCode) {
        this.salarytyCode = salarytyCode;
    }

    public String getSalaryitemCode() {
        return salaryitemCode;
    }
    public void setSalaryitemCode(String salaryitemCode) {
        this.salaryitemCode = salaryitemCode;
    }

    public String getLmtAmt() {
        return lmtAmt;
    }
    public void setLmtAmt(String lmtAmt) {
        this.lmtAmt = lmtAmt;
    }

    public String getStdrAmt() {
        return stdrAmt;
    }
    public void setStdrAmt(String stdrAmt) {
        this.stdrAmt = stdrAmt;
    }

    public String getTaxtAt() {
        return taxtAt;
    }
    public void setTaxtAt(String taxtAt) {
        this.taxtAt = taxtAt;
    }

    public String getRversYy() {
        return rversYy;
    }
    public void setRversYy(String rversYy) {
        this.rversYy = rversYy;
    }

    public String getTaxeCode() {
        return taxeCode;
    }
    public void setTaxeCode(String taxeCode) {
        this.taxeCode = taxeCode;
    }

    public String getUseBeginDe() {
        return useBeginDe;
    }
    public void setUseBeginDe(String useBeginDe) {
        this.useBeginDe = useBeginDe;
    }

    public String getUseEndDe() {
        return useEndDe;
    }
    public void setUseEndDe(String useEndDe) {
        this.useEndDe = useEndDe;
    }
    
    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
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

    public String getAmtStdrRegistTrgetAt() {
        return amtStdrRegistTrgetAt;
    }
    public void setAmtStdrRegistTrgetAt(String amtStdrRegistTrgetAt) {
        this.amtStdrRegistTrgetAt = amtStdrRegistTrgetAt;
    }

    public String getApplcSe() {
        return applcSe;
    }
    public void setApplcSe(String applcSe) {
        this.applcSe = applcSe;
    }

    public String getCalcSe() {
        return calcSe;
    }
    public void setCalcSe(String calcSe) {
        this.calcSe = calcSe;
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
