package kr.co.dbvision.api.mps.cal.mpscal005.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 급여계산/조정관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.03
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.03          디비비전              최초 생성
 * </pre>
 */

public class Mpscal005 extends CommonVO {

    /* 적용 년월 */
    private String applcYm;
    /* 지급순번 */
    private String pymntSn;
    /* 사원번호 */
    private String empno;
    /* 급여유형 코드 */
    private String salarytyCode;
    /* 급여항목 코드 */
    private String salaryitemCode;
    /* 총 급여 금액 */
    private String totSalaryAmt;
    /* 과세 금액 */
    private String taxtAmt;
    /* 비과세 신고 금액 */
    private String taxeSttemntAmt;
    /* 비과세 신고제외 금액(사용안함) */
    private String taxeStmtExclAmt;
    /* 급여 계좌 구분 코드C471 */
    private String acnutSeCode;
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
    
    private String asreturnCode;
    private String asreturnstring;
    
    
    
    public String getAsreturnCode() {
        return asreturnCode;
    }

    public void setAsreturnCode(String asreturnCode) {
        this.asreturnCode = asreturnCode;
    }

    public String getAsreturnstring() {
        return asreturnstring;
    }

    public void setAsreturnstring(String asreturnstring) {
        this.asreturnstring = asreturnstring;
    }

    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpscal005() {
        //
    }

    public Mpscal005(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYm = StringExpression.nullConvert(egovMap.get("applcYm"));
            this.pymntSn = StringExpression.nullConvert(egovMap.get("pymntSn"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.salarytyCode = StringExpression.nullConvert(egovMap.get("salarytyCode"));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get("salaryitemCode"));
            this.totSalaryAmt = StringExpression.nullConvert(egovMap.get("totSalaryAmt"));
            this.taxtAmt = StringExpression.nullConvert(egovMap.get("taxtAmt"));
            this.taxeSttemntAmt = StringExpression.nullConvert(egovMap.get("taxeSttemntAmt"));
            this.taxeStmtExclAmt = StringExpression.nullConvert(egovMap.get("taxeStmtExclAmt"));
            this.acnutSeCode = StringExpression.nullConvert(egovMap.get("acnutSeCode"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mpscal005(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYm")));
            this.pymntSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntSn")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.salarytyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarytyCode")));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemCode")));
            this.totSalaryAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_totSalaryAmt")));
            this.taxtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxtAmt")));
            this.taxeSttemntAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxeSttemntAmt")));
            this.taxeStmtExclAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxeStmtExclAmt")));
            this.acnutSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutSeCode")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getApplcYm() {
        return applcYm;
    }
    public void setApplcYm(String applcYm) {
        this.applcYm = applcYm;
    }

    public String getPymntSn() {
        return pymntSn;
    }
    public void setPymntSn(String pymntSn) {
        this.pymntSn = pymntSn;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
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

    public String getTotSalaryAmt() {
        return totSalaryAmt;
    }
    public void setTotSalaryAmt(String totSalaryAmt) {
        this.totSalaryAmt = totSalaryAmt;
    }

    public String getTaxtAmt() {
        return taxtAmt;
    }
    public void setTaxtAmt(String taxtAmt) {
        this.taxtAmt = taxtAmt;
    }

    public String getTaxeSttemntAmt() {
        return taxeSttemntAmt;
    }
    public void setTaxeSttemntAmt(String taxeSttemntAmt) {
        this.taxeSttemntAmt = taxeSttemntAmt;
    }

    public String getTaxeStmtExclAmt() {
        return taxeStmtExclAmt;
    }
    public void setTaxeStmtExclAmt(String taxeStmtExclAmt) {
        this.taxeStmtExclAmt = taxeStmtExclAmt;
    }

    public String getAcnutSeCode() {
        return acnutSeCode;
    }
    public void setAcnutSeCode(String acnutSeCode) {
        this.acnutSeCode = acnutSeCode;
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

