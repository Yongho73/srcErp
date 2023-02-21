package kr.co.dbvision.api.stm.bsc.stmbsc004.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 영업일(공휴일관리)관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.03.16
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.15)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.16          디비비전              최초 생성
 * </pre>
 */

public class Stmbsc004 extends CommonVO {

    /* 업무일자 */
    private String jobDe;
    /* 일자구분코드(C127) */
    private String deSeCode;
    /* 휴무여부 휴무일: 1 */
    private String hvofAt;
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
    /* 달력일자 */
    private String calenderDt;
    /* 요일구분 */
    private String wdayCls;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmbsc004() {
        //
    }

    public Stmbsc004(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.jobDe = StringExpression.nullConvert(egovMap.get("jobDe"));
            this.deSeCode = StringExpression.nullConvert(egovMap.get("deSeCode"));
            this.hvofAt = StringExpression.nullConvert(egovMap.get("hvofAt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.calenderDt = StringExpression.nullConvert(egovMap.get("calenderDt"));
            this.wdayCls = StringExpression.nullConvert(egovMap.get("wdayCls"));
        }
    }

    public Stmbsc004(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.jobDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jobDe")));
            this.deSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deSeCode")));
            this.hvofAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hvofAt")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            this.calenderDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.wdayCls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c1")));
            }
    }

    public String getJobDe() {
        return jobDe;
    }
    public void setJobDe(String jobDe) {
        this.jobDe = jobDe;
    }

    public String getDeSeCode() {
        return deSeCode;
    }
    public void setDeSeCode(String deSeCode) {
        this.deSeCode = deSeCode;
    }

    public String getHvofAt() {
        return hvofAt;
    }
    public void setHvofAt(String hvofAt) {
        this.hvofAt = hvofAt;
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

    public String getCalenderDt() {
        return calenderDt;
    }
    public void setCalenderDt(String calenderDt) {
        this.calenderDt = calenderDt;
    }

    public String getWdayCls() {
        return wdayCls;
    }
    public void setWdayCls(String wdayCls) {
        this.wdayCls = wdayCls;
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
