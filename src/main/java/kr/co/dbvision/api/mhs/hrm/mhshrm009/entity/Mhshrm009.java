package kr.co.dbvision.api.mhs.hrm.mhshrm009.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 자격증코드관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.03          디비비전              최초 생성
 * </pre>
 */

public class Mhshrm009 extends CommonVO {

    /* 자격증코드번호 */
    private String crqfsCodeNo;
    /* 자격증 구분(C138) */
    private String crqfsSe;
    /* 자격증 */
    private String crqfsNm;
    /* 사용시작일자 */
    private String useBeginDe;
    /* 사용종료일자( 사용여부가 N이 입력될경우
종료일자가 들어가야함 */
    private String useEndDe;
    /* 사용여부 */
    private String useAt;
    private String useAtNm;
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
    /* 사용여부 체크 */
    private String useCheck;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrm009() {
        //
    }

    public Mhshrm009(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.crqfsCodeNo = StringExpression.nullConvert(egovMap.get("crqfsCodeNo"));
            this.crqfsSe = StringExpression.nullConvert(egovMap.get("crqfsSe"));
            this.crqfsNm = StringExpression.nullConvert(egovMap.get("crqfsNm"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.useAtNm = StringExpression.nullConvert(egovMap.get("useAtNm"));
            this.allwncPymntAt = StringExpression.nullConvert(egovMap.get("allwncPymntAt"));
            this.qualfAllwncAmt = StringExpression.nullConvert(egovMap.get("qualfAllwncAmt"));
            this.evlApplyAt = StringExpression.nullConvert(egovMap.get("evlApplyAt"));
            this.recogScore = StringExpression.nullConvert(egovMap.get("recogScore"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.useCheck = StringExpression.nullConvert(egovMap.get("useCheck"));
        }
    }

    public Mhshrm009(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.crqfsCodeNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsCodeNo")));
            this.crqfsSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsSe")));
            this.crqfsNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsNm")));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useBeginDe")));
            this.useEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useEndDe")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.allwncPymntAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_allwncPymntAt")));
            this.qualfAllwncAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qualfAllwncAmt")));
            this.evlApplyAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_evlApplyAt")));
            this.recogScore = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_recogScore")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.useCheck = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useCheck")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getCrqfsCodeNo() {
        return crqfsCodeNo;
    }
    public void setCrqfsCodeNo(String crqfsCodeNo) {
        this.crqfsCodeNo = crqfsCodeNo;
    }

    public String getCrqfsSe() {
        return crqfsSe;
    }
    public void setCrqfsSe(String crqfsSe) {
        this.crqfsSe = crqfsSe;
    }

    public String getCrqfsNm() {
        return crqfsNm;
    }
    public void setCrqfsNm(String crqfsNm) {
        this.crqfsNm = crqfsNm;
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

    public String getUseCheck() {
        return useCheck;
    }
    public void setUseCheck(String useCheck) {
        this.useCheck = useCheck;
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
