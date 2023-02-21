package kr.co.dbvision.api.mtx.bsc.mtxbsc001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 소득세율관리관리에 관한 엔티티 클래스
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

public class Mtxbsc001 extends CommonVO {

    /* 적용연도 */
    private String applcYy;
    /* 소득구분코드 : C054 */
    private String incomeSeCode;
    /* 거주 구분 코드: C031 */
    private String liveSeCode;
    /* 소득 명 */
    private String incomeNm;
    /* 필요 경비 금액 */
    private String needExpensAmt;
    /* 소득 세율 */
    private String incomeRate;
    /* 사용 여부 */
    private String useAt;
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

    public Mtxbsc001() {
        //
    }

    public Mtxbsc001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYy = StringExpression.nullConvert(egovMap.get("applcYy"));
            this.incomeSeCode = StringExpression.nullConvert(egovMap.get("incomeSeCode"));
            this.liveSeCode = StringExpression.nullConvert(egovMap.get("liveSeCode"));
            this.incomeNm = StringExpression.nullConvert(egovMap.get("incomeNm"));
            this.needExpensAmt = StringExpression.nullConvert(egovMap.get("needExpensAmt"));
            this.incomeRate = StringExpression.nullConvert(egovMap.get("incomeRate"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mtxbsc001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYy")));
            this.incomeSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incomeSeCode")));
            this.liveSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_liveSeCode")));
            this.incomeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incomeNm")));
            this.needExpensAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_needExpensAmt")));
            this.incomeRate = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incomeRate")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getApplcYy() {
        return applcYy;
    }
    public void setApplcYy(String applcYy) {
        this.applcYy = applcYy;
    }

    public String getIncomeSeCode() {
        return incomeSeCode;
    }
    public void setIncomeSeCode(String incomeSeCode) {
        this.incomeSeCode = incomeSeCode;
    }

    public String getLiveSeCode() {
        return liveSeCode;
    }
    public void setLiveSeCode(String liveSeCode) {
        this.liveSeCode = liveSeCode;
    }

    public String getIncomeNm() {
        return incomeNm;
    }
    public void setIncomeNm(String incomeNm) {
        this.incomeNm = incomeNm;
    }

    public String getNeedExpensAmt() {
        return needExpensAmt;
    }
    public void setNeedExpensAmt(String needExpensAmt) {
        this.needExpensAmt = needExpensAmt;
    }

    public String getIncomeRate() {
        return incomeRate;
    }
    public void setIncomeRate(String incomeRate) {
        this.incomeRate = incomeRate;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
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
