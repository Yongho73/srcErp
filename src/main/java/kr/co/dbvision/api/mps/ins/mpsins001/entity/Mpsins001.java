package kr.co.dbvision.api.mps.ins.mpsins001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 사회보험월별납부관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.11
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.11)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.11          디비비전              최초 생성
 * </pre>
 */

public class Mpsins001 extends CommonVO {

    /* 적용년월 */
    private String applcYm;
    /* 사원번호 */
    private String empno;
    /* 공제일자 */
    private String ddcDe;
    /* 국민연금 액 */
    private String npnAmt;
    /* 건강보험액 */
    private String hlthinsAmt;
    /* 건강보험정산액 */
    private String hlthinsExcclcAmt;
    /* 장기요약보험액 */
    private String ltciAmt;
    /* 장기요약보험 정산금액 */
    private String ltciExcclcAmt;
    /* 고용보험금액 */
    private String episAmt;
    /* 산재보험금액 */
    private String iaciAmt;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정 ID */
    private String uptId;
    /* 전년도 건강보험 정산액 */
    private String beyearHlthinsExcclcAmt;
    /* 전년도 장기용양 정산금액 */
    private String beyearLtciExcclcAmt;
    /* 고용보험 정산액 */
    private String episExcclcAmt;
    /* 전년도 고용보험 정산액 */
    private String beyearEpisExcclcAmt;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsins001() {
        //
    }

    public Mpsins001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYm = StringExpression.nullConvert(egovMap.get("applcYm"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.ddcDe = StringExpression.nullConvert(egovMap.get("ddcDe"));
            this.npnAmt = StringExpression.nullConvert(egovMap.get("npnAmt"));
            this.hlthinsAmt = StringExpression.nullConvert(egovMap.get("hlthinsAmt"));
            this.hlthinsExcclcAmt = StringExpression.nullConvert(egovMap.get("hlthinsExcclcAmt"));
            this.ltciAmt = StringExpression.nullConvert(egovMap.get("ltciAmt"));
            this.ltciExcclcAmt = StringExpression.nullConvert(egovMap.get("ltciExcclcAmt"));
            this.episAmt = StringExpression.nullConvert(egovMap.get("episAmt"));
            this.iaciAmt = StringExpression.nullConvert(egovMap.get("iaciAmt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.beyearHlthinsExcclcAmt = StringExpression.nullConvert(egovMap.get("beyearHlthinsExcclcAmt"));
            this.beyearLtciExcclcAmt = StringExpression.nullConvert(egovMap.get("beyearLtciExcclcAmt"));
            this.episExcclcAmt = StringExpression.nullConvert(egovMap.get("episExcclcAmt"));
            this.beyearEpisExcclcAmt = StringExpression.nullConvert(egovMap.get("beyearEpisExcclcAmt"));
        }
    }

    public Mpsins001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYm")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.ddcDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ddcDe")));
            this.npnAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnAmt")));
            this.hlthinsAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hlthinsAmt")));
            this.hlthinsExcclcAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hlthinsExcclcAmt")));
            this.ltciAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ltciAmt")));
            this.ltciExcclcAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ltciExcclcAmt")));
            this.episAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episAmt")));
            this.iaciAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_iaciAmt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.beyearHlthinsExcclcAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_beyearHlthinsExcclcAmt")));
            this.beyearLtciExcclcAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_beyearLtciExcclcAmt")));
            this.episExcclcAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episExcclcAmt")));
            this.beyearEpisExcclcAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_beyearEpisExcclcAmt")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getApplcYm() {
        return applcYm;
    }
    public void setApplcYm(String applcYm) {
        this.applcYm = applcYm;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getDdcDe() {
        return ddcDe;
    }
    public void setDdcDe(String ddcDe) {
        this.ddcDe = ddcDe;
    }

    public String getNpnAmt() {
        return npnAmt;
    }
    public void setNpnAmt(String npnAmt) {
        this.npnAmt = npnAmt;
    }

    public String getHlthinsAmt() {
        return hlthinsAmt;
    }
    public void setHlthinsAmt(String hlthinsAmt) {
        this.hlthinsAmt = hlthinsAmt;
    }

    public String getHlthinsExcclcAmt() {
        return hlthinsExcclcAmt;
    }
    public void setHlthinsExcclcAmt(String hlthinsExcclcAmt) {
        this.hlthinsExcclcAmt = hlthinsExcclcAmt;
    }

    public String getLtciAmt() {
        return ltciAmt;
    }
    public void setLtciAmt(String ltciAmt) {
        this.ltciAmt = ltciAmt;
    }

    public String getLtciExcclcAmt() {
        return ltciExcclcAmt;
    }
    public void setLtciExcclcAmt(String ltciExcclcAmt) {
        this.ltciExcclcAmt = ltciExcclcAmt;
    }

    public String getEpisAmt() {
        return episAmt;
    }
    public void setEpisAmt(String episAmt) {
        this.episAmt = episAmt;
    }

    public String getIaciAmt() {
        return iaciAmt;
    }
    public void setIaciAmt(String iaciAmt) {
        this.iaciAmt = iaciAmt;
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

    public String getBeyearHlthinsExcclcAmt() {
        return beyearHlthinsExcclcAmt;
    }
    public void setBeyearHlthinsExcclcAmt(String beyearHlthinsExcclcAmt) {
        this.beyearHlthinsExcclcAmt = beyearHlthinsExcclcAmt;
    }

    public String getBeyearLtciExcclcAmt() {
        return beyearLtciExcclcAmt;
    }
    public void setBeyearLtciExcclcAmt(String beyearLtciExcclcAmt) {
        this.beyearLtciExcclcAmt = beyearLtciExcclcAmt;
    }

    public String getEpisExcclcAmt() {
        return episExcclcAmt;
    }
    public void setEpisExcclcAmt(String episExcclcAmt) {
        this.episExcclcAmt = episExcclcAmt;
    }

    public String getBeyearEpisExcclcAmt() {
        return beyearEpisExcclcAmt;
    }
    public void setBeyearEpisExcclcAmt(String beyearEpisExcclcAmt) {
        this.beyearEpisExcclcAmt = beyearEpisExcclcAmt;
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
