package kr.co.dbvision.api.ets.bst.etsbst001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 전결규정관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2021.03.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.22          디비비전              최초 생성
 * </pre>
 */

public class Etsbst001 extends CommonVO {

    /* 전결 번호 */
    private String dcrbNo;
    /* 업무명 */
    private String jobnm;
    /* 결재 레벨 */
    private String sanctnLvl;
    /* 업무 설명 */
    private String jobDc;
    /* 규정 조항 */
    private String regltnArtcl;
    /* 상세 단위 과제 */
    private String detailUnitAssgmnt;
    /* 사용 여부 */
    private String useAt;
    /* 등록 ID */
    private String regId;
    /* 등록 일시 */
    private String regDt;
    /* 수정 ID */
    private String uptId;
    /* 수정 일시 */
    private String uptDt;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Etsbst001() {
        //
    }

    public Etsbst001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.dcrbNo = StringExpression.nullConvert(egovMap.get("dcrbNo"));
            this.jobnm = StringExpression.nullConvert(egovMap.get("jobnm"));
            this.sanctnLvl = StringExpression.nullConvert(egovMap.get("sanctnLvl"));
            this.jobDc = StringExpression.nullConvert(egovMap.get("jobDc"));
            this.regltnArtcl = StringExpression.nullConvert(egovMap.get("regltnArtcl"));
            this.detailUnitAssgmnt = StringExpression.nullConvert(egovMap.get("detailUnitAssgmnt"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
        }
    }

    public Etsbst001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.dcrbNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dcrbNo")));
            this.jobnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jobnm")));
            this.sanctnLvl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sanctnLvl")));
            this.jobDc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jobDc")));
            this.regltnArtcl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regltnArtcl")));
            this.detailUnitAssgmnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_detailUnitAssgmnt")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getDcrbNo() {
        return dcrbNo;
    }
    public void setDcrbNo(String dcrbNo) {
        this.dcrbNo = dcrbNo;
    }

    public String getJobnm() {
        return jobnm;
    }
    public void setJobnm(String jobnm) {
        this.jobnm = jobnm;
    }

    public String getSanctnLvl() {
        return sanctnLvl;
    }
    public void setSanctnLvl(String sanctnLvl) {
        this.sanctnLvl = sanctnLvl;
    }

    public String getJobDc() {
        return jobDc;
    }
    public void setJobDc(String jobDc) {
        this.jobDc = jobDc;
    }

    public String getRegltnArtcl() {
        return regltnArtcl;
    }
    public void setRegltnArtcl(String regltnArtcl) {
        this.regltnArtcl = regltnArtcl;
    }

    public String getDetailUnitAssgmnt() {
        return detailUnitAssgmnt;
    }
    public void setDetailUnitAssgmnt(String detailUnitAssgmnt) {
        this.detailUnitAssgmnt = detailUnitAssgmnt;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getRegId() {
        return regId;
    }
    public void setRegId(String regId) {
        this.regId = regId;
    }

    public String getRegDt() {
        return regDt;
    }
    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getUptId() {
        return uptId;
    }
    public void setUptId(String uptId) {
        this.uptId = uptId;
    }

    public String getUptDt() {
        return uptDt;
    }
    public void setUptDt(String uptDt) {
        this.uptDt = uptDt;
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
