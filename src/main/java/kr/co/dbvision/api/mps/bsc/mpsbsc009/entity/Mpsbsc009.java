package kr.co.dbvision.api.mps.bsc.mpsbsc009.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 연봉계약관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.06.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.11          디비비전              최초 생성
 * </pre>
 */

public class Mpsbsc009 extends CommonVO {

    /* 계약 번호 */
    private String cntrctNo;
    /* 사원번 */
    private String empno;
    /* 계약일 */
    private String cntrctDe;
    /* 계약시작일자 */
    private String cntrctSdt;
    /* 계약종일자 */
    private String cntrctEdt;
    /* 계약여부 */
    private String cntrctAt;
    /* 기본금 */
    private String bassAmt;
    /* 직문금 */
    private String dtyAmt;
    /* 월액금 */
    private String mtamtAmt;
    /* 연봉금 */
    private String anslryAmt;
    /* 등록일 */
    private String regDt;
    /* 등록ID */
    private String regId;
    /* 정일시 */
    private String uptDt;
    /* 수정ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbsc009() {
        //
    }

    public Mpsbsc009(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.cntrctNo = StringExpression.nullConvert(egovMap.get("cntrctNo"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.cntrctDe = StringExpression.nullConvert(egovMap.get("cntrctDe"));
            this.cntrctSdt = StringExpression.nullConvert(egovMap.get("cntrctSdt"));
            this.cntrctEdt = StringExpression.nullConvert(egovMap.get("cntrctEdt"));
            this.cntrctAt = StringExpression.nullConvert(egovMap.get("cntrctAt"));
            this.bassAmt = StringExpression.nullConvert(egovMap.get("bassAmt"));
            this.dtyAmt = StringExpression.nullConvert(egovMap.get("dtyAmt"));
            this.mtamtAmt = StringExpression.nullConvert(egovMap.get("mtamtAmt"));
            this.anslryAmt = StringExpression.nullConvert(egovMap.get("anslryAmt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mpsbsc009(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.cntrctNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cntrctNo")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.cntrctDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cntrctDe")));
            this.cntrctSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cntrctSdt")));
            this.cntrctEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cntrctEdt")));
            this.cntrctAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cntrctAt")));
            this.bassAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bassAmt")));
            this.dtyAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dtyAmt")));
            this.mtamtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mtamtAmt")));
            this.anslryAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_anslryAmt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getCntrctNo() {
        return cntrctNo;
    }
    public void setCntrctNo(String cntrctNo) {
        this.cntrctNo = cntrctNo;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getCntrctDe() {
        return cntrctDe;
    }
    public void setCntrctDe(String cntrctDe) {
        this.cntrctDe = cntrctDe;
    }

    public String getCntrctSdt() {
        return cntrctSdt;
    }
    public void setCntrctSdt(String cntrctSdt) {
        this.cntrctSdt = cntrctSdt;
    }

    public String getCntrctEdt() {
        return cntrctEdt;
    }
    public void setCntrctEdt(String cntrctEdt) {
        this.cntrctEdt = cntrctEdt;
    }

    public String getCntrctAt() {
        return cntrctAt;
    }
    public void setCntrctAt(String cntrctAt) {
        this.cntrctAt = cntrctAt;
    }

    public String getBassAmt() {
        return bassAmt;
    }
    public void setBassAmt(String bassAmt) {
        this.bassAmt = bassAmt;
    }

    public String getDtyAmt() {
        return dtyAmt;
    }
    public void setDtyAmt(String dtyAmt) {
        this.dtyAmt = dtyAmt;
    }

    public String getMtamtAmt() {
        return mtamtAmt;
    }
    public void setMtamtAmt(String mtamtAmt) {
        this.mtamtAmt = mtamtAmt;
    }

    public String getAnslryAmt() {
        return anslryAmt;
    }
    public void setAnslryAmt(String anslryAmt) {
        this.anslryAmt = anslryAmt;
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
