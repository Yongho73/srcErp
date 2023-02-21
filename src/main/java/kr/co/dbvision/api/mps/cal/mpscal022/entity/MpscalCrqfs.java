package kr.co.dbvision.api.mps.cal.mpscal022.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 급여관리_자격관리에 관한 엔티티 클래스
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

public class MpscalCrqfs extends CommonVO {

    /* 사원번호 */
    private String empno;
    /* 사원별 자격증의 순번을 기록 */
    private String crqfsSn;
    /* 자격증코드번호 */
    private String crqfsCodeNo;
    /* 면허를 취득한 일자 */
    private String acqsDe;
    /* 유효일자 */
    private String validDe;
    /* 자격증 구분 */
    private String crqfsSe;
    /* 국가공인자격여부 */
    private String nationathriQualfAt;
    /* 면허의 고유 번호 */
    private String crqfsNo;
    /* 발급기관 */
    private String issuInsttNm;
    /* 국내외구분 */
    private String dmstcAt;
    /* 수당지급여부 */
    private String allwncPymntAt;
    /* 자격수당금액 */
    private String qualfAllwncAmt;
    /* 인사평가 반영 여부 */
    private String evlApplyAt;
    /* 인정점수 */
    private String recogScore;
    /* 비고 항목 */
    private String rm;
    /* 등록일자 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일자 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 첨부파일번호 */
    private String atchmnflno;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public MpscalCrqfs() {
        //
    }

    public MpscalCrqfs(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.crqfsSn = StringExpression.nullConvert(egovMap.get("crqfsSn"));
            this.crqfsCodeNo = StringExpression.nullConvert(egovMap.get("crqfsCodeNo"));
            this.acqsDe = StringExpression.nullConvert(egovMap.get("acqsDe"));
            this.validDe = StringExpression.nullConvert(egovMap.get("validDe"));
            this.crqfsSe = StringExpression.nullConvert(egovMap.get("crqfsSe"));
            this.nationathriQualfAt = StringExpression.nullConvert(egovMap.get("nationathriQualfAt"));
            this.crqfsNo = StringExpression.nullConvert(egovMap.get("crqfsNo"));
            this.issuInsttNm = StringExpression.nullConvert(egovMap.get("issuInsttNm"));
            this.dmstcAt = StringExpression.nullConvert(egovMap.get("dmstcAt"));
            this.allwncPymntAt = StringExpression.nullConvert(egovMap.get("allwncPymntAt"));
            this.qualfAllwncAmt = StringExpression.nullConvert(egovMap.get("qualfAllwncAmt"));
            this.evlApplyAt = StringExpression.nullConvert(egovMap.get("evlApplyAt"));
            this.recogScore = StringExpression.nullConvert(egovMap.get("recogScore"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.atchmnflno = StringExpression.nullConvert(egovMap.get("atchmnflno"));
        }
    }

    public MpscalCrqfs(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.crqfsSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsSn")));
            this.crqfsCodeNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsCodeNo")));
            this.acqsDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acqsDe")));
            this.validDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_validDe")));
            this.crqfsSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsSe")));
            this.nationathriQualfAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nationathriQualfAt")));
            this.crqfsNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsNo")));
            this.issuInsttNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issuInsttNm")));
            this.dmstcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dmstcAt")));
            this.allwncPymntAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_allwncPymntAt")));
            this.qualfAllwncAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qualfAllwncAmt")));
            this.evlApplyAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_evlApplyAt")));
            this.recogScore = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_recogScore")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.atchmnflno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflno")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getCrqfsSn() {
        return crqfsSn;
    }
    public void setCrqfsSn(String crqfsSn) {
        this.crqfsSn = crqfsSn;
    }

    public String getCrqfsCodeNo() {
        return crqfsCodeNo;
    }
    public void setCrqfsCodeNo(String crqfsCodeNo) {
        this.crqfsCodeNo = crqfsCodeNo;
    }

    public String getAcqsDe() {
        return acqsDe;
    }
    public void setAcqsDe(String acqsDe) {
        this.acqsDe = acqsDe;
    }

    public String getValidDe() {
        return validDe;
    }
    public void setValidDe(String validDe) {
        this.validDe = validDe;
    }

    public String getCrqfsSe() {
        return crqfsSe;
    }
    public void setCrqfsSe(String crqfsSe) {
        this.crqfsSe = crqfsSe;
    }

    public String getNationathriQualfAt() {
        return nationathriQualfAt;
    }
    public void setNationathriQualfAt(String nationathriQualfAt) {
        this.nationathriQualfAt = nationathriQualfAt;
    }

    public String getCrqfsNo() {
        return crqfsNo;
    }
    public void setCrqfsNo(String crqfsNo) {
        this.crqfsNo = crqfsNo;
    }

    public String getIssuInsttNm() {
        return issuInsttNm;
    }
    public void setIssuInsttNm(String issuInsttNm) {
        this.issuInsttNm = issuInsttNm;
    }

    public String getDmstcAt() {
        return dmstcAt;
    }
    public void setDmstcAt(String dmstcAt) {
        this.dmstcAt = dmstcAt;
    }

    public String getAllwncPymntAt() {
        return allwncPymntAt;
    }
    public void setAllwncPymntAt(String allwncPymntAt) {
        this.allwncPymntAt = allwncPymntAt;
    }

    public String getQualfAllwncAmt() {
        return qualfAllwncAmt;
    }
    public void setQualfAllwncAmt(String qualfAllwncAmt) {
        this.qualfAllwncAmt = qualfAllwncAmt;
    }

    public String getEvlApplyAt() {
        return evlApplyAt;
    }
    public void setEvlApplyAt(String evlApplyAt) {
        this.evlApplyAt = evlApplyAt;
    }

    public String getRecogScore() {
        return recogScore;
    }
    public void setRecogScore(String recogScore) {
        this.recogScore = recogScore;
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

    public String getAtchmnflno() {
        return atchmnflno;
    }
    public void setAtchmnflno(String atchmnflno) {
        this.atchmnflno = atchmnflno;
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
