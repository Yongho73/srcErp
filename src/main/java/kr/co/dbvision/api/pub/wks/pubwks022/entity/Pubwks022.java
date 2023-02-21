package kr.co.dbvision.api.pub.wks.pubwks022.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 개인휴무신청관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.09.02
 * @version 1.0
 * @sourceGen version 2020.09.02.01 (2020.09.02)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.02          디비비전              최초 생성
 * </pre>
 */

public class Pubwks022 extends CommonVO {

    /* 휴 일자 */
    private String hvofDe;
    /* 사원번호 */
    private String empno;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 휴무 년월 */
    private String hvofYm;
    /* 요일 코드 (C127) */
    private String wdayCode;
    /* 전자결재 문서 번호 */
    private String elctsctDocNo;
    /* 전자결재 상태 코드 (EA004) */
    private String elctsctSttusCode;
    /* 전자결재 사원번호 */
    private String elctsctEmpno;
    /* 반려 시유 */
    private String returnResn;
    /* 등록 일시 */
    private String regDt;
    /* 등록 ID */
    private String regId;
    /* 수정 일시 */
    private String uptDt;
    /* 수정 ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Pubwks022() {
        //
    }

    public Pubwks022(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.hvofDe = StringExpression.nullConvert(egovMap.get("hvofDe"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.hvofYm = StringExpression.nullConvert(egovMap.get("hvofYm"));
            this.wdayCode = StringExpression.nullConvert(egovMap.get("wdayCode"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.returnResn = StringExpression.nullConvert(egovMap.get("returnResn"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Pubwks022(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.hvofDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hvofDe")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.hvofYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hvofYm")));
            this.wdayCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wdayCode")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.returnResn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_returnResn")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getHvofDe() {
        return hvofDe;
    }
    public void setHvofDe(String hvofDe) {
        this.hvofDe = hvofDe;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getElctsctSeSn() {
        return elctsctSeSn;
    }
    public void setElctsctSeSn(String elctsctSeSn) {
        this.elctsctSeSn = elctsctSeSn;
    }

    public String getHvofYm() {
        return hvofYm;
    }
    public void setHvofYm(String hvofYm) {
        this.hvofYm = hvofYm;
    }

    public String getWdayCode() {
        return wdayCode;
    }
    public void setWdayCode(String wdayCode) {
        this.wdayCode = wdayCode;
    }

    public String getElctsctDocNo() {
        return elctsctDocNo;
    }
    public void setElctsctDocNo(String elctsctDocNo) {
        this.elctsctDocNo = elctsctDocNo;
    }

    public String getElctsctSttusCode() {
        return elctsctSttusCode;
    }
    public void setElctsctSttusCode(String elctsctSttusCode) {
        this.elctsctSttusCode = elctsctSttusCode;
    }

    public String getElctsctEmpno() {
        return elctsctEmpno;
    }
    public void setElctsctEmpno(String elctsctEmpno) {
        this.elctsctEmpno = elctsctEmpno;
    }

    public String getReturnResn() {
        return returnResn;
    }
    public void setReturnResn(String returnResn) {
        this.returnResn = returnResn;
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

    @Override
    public String toString() {
        return "Pubwks022 [hvofDe=" + hvofDe + ", empno=" + empno + ", elctsctSeSn=" + elctsctSeSn + ", hvofYm="
                + hvofYm + ", wdayCode=" + wdayCode + ", elctsctDocNo=" + elctsctDocNo + ", elctsctSttusCode="
                + elctsctSttusCode + ", elctsctEmpno=" + elctsctEmpno + ", returnResn=" + returnResn + ", regDt="
                + regDt + ", regId=" + regId + ", uptDt=" + uptDt + ", uptId=" + uptId + ", nativeeditorStatus="
                + nativeeditorStatus + ", records=" + records + "]";
    }
    
}
