package kr.co.dbvision.api.mhs.hrm.mhshrm010.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 출장비기준코드관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.04.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.22          디비비전              최초 생성
 * </pre>
 */

public class Mhshrm010 extends CommonVO {

    /* 출장 구분코드 */
    private String bsrpSeCode;
    /* 직급코드 */
    private String clsfCode;
    /* 일비 금액 */
    private String dayctAmt;
    /* 숙박비 금액 */
    private String stayngctAmt;
    /* 교통비 금액 */
    private String trnsportctAmt;
    /* 식대 금액 */
    private String cgffdAmt;
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

    public Mhshrm010() {
        //
    }

    public Mhshrm010(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.bsrpSeCode = StringExpression.nullConvert(egovMap.get("bsrpSeCode"));
            this.clsfCode = StringExpression.nullConvert(egovMap.get("clsfCode"));
            this.dayctAmt = StringExpression.nullConvert(egovMap.get("dayctAmt"));
            this.stayngctAmt = StringExpression.nullConvert(egovMap.get("stayngctAmt"));
            this.trnsportctAmt = StringExpression.nullConvert(egovMap.get("trnsportctAmt"));
            this.cgffdAmt = StringExpression.nullConvert(egovMap.get("cgffdAmt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mhshrm010(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.bsrpSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpSeCode")));
            this.clsfCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfCode")));
            this.dayctAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dayctAmt")));
            this.stayngctAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stayngctAmt")));
            this.trnsportctAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_trnsportctAmt")));
            this.cgffdAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cgffdAmt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getBsrpSeCode() {
        return bsrpSeCode;
    }
    public void setBsrpSeCode(String bsrpSeCode) {
        this.bsrpSeCode = bsrpSeCode;
    }

    public String getClsfCode() {
        return clsfCode;
    }
    public void setClsfCode(String clsfCode) {
        this.clsfCode = clsfCode;
    }

    public String getDayctAmt() {
        return dayctAmt;
    }
    public void setDayctAmt(String dayctAmt) {
        this.dayctAmt = dayctAmt;
    }

    public String getStayngctAmt() {
        return stayngctAmt;
    }
    public void setStayngctAmt(String stayngctAmt) {
        this.stayngctAmt = stayngctAmt;
    }

    public String getTrnsportctAmt() {
        return trnsportctAmt;
    }
    public void setTrnsportctAmt(String trnsportctAmt) {
        this.trnsportctAmt = trnsportctAmt;
    }

    public String getCgffdAmt() {
        return cgffdAmt;
    }
    public void setCgffdAmt(String cgffdAmt) {
        this.cgffdAmt = cgffdAmt;
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
