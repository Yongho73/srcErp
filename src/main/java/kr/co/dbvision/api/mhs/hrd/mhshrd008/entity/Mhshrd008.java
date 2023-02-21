package kr.co.dbvision.api.mhs.hrd.mhshrd008.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 근태시간코드관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.06.08
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.08          디비비전              최초 생성
 * </pre>
 */

public class Mhshrd008 extends CommonVO {

    /* 근로 시간 구분 코드 , 공통코드 C199 */
    private String laborTimeSeCode;
    /* 근로 시간 구분 순번 */
    private String sn;
    /* 시작 시간 시간 */
    private String beginHour;
    /* 시작 시간 분 */
    private String beginMinute;
    /* 종료 시간  시간*/
    private String endHour;
    /* 종료 시간 분 */
    private String endMinute;

    /* 시작 시간 분 */
    private String beginTime;
    /* 종료 시간  시간*/
    private String endTime;
    
    /* 사용 여부 */
    private String useAt;
    /* 비 */
    private String rm;
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

    public Mhshrd008() {
        //
    }

    public Mhshrd008(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.laborTimeSeCode = StringExpression.nullConvert(egovMap.get("laborTimeSeCode"));
            this.sn = StringExpression.nullConvert(egovMap.get("sn"));
            this.beginHour = StringExpression.nullConvert(egovMap.get("beginHour"));
            this.beginMinute = StringExpression.nullConvert(egovMap.get("beginMinute"));
            this.endHour = StringExpression.nullConvert(egovMap.get("endHour"));
            this.endMinute = StringExpression.nullConvert(egovMap.get("endMinute"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mhshrd008(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.laborTimeSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_laborTimeSeCode")));
            this.sn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sn")));
            this.beginHour = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_beginHour")));
            this.beginMinute = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_beginMinute")));
            this.endHour = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_endHour")));
            this.endMinute = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_endMinute")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getLaborTimeSeCode() {
        return laborTimeSeCode;
    }
    public void setLaborTimeSeCode(String laborTimeSeCode) {
        this.laborTimeSeCode = laborTimeSeCode;
    }

    public String getSn() {
        return sn;
    }
    public void setSn(String sn) {
        this.sn = sn;
    }

    public String getBeginHour() {
        return beginHour;
    }
    public void setBeginHour(String beginHour) {
        this.beginHour = beginHour;
    }

    public String getBeginMinute() {
        return beginMinute;
    }
    public void setBeginMinute(String beginMinute) {
        this.beginMinute = beginMinute;
    }

    public String getEndHour() {
        return endHour;
    }
    public void setEndHour(String endHour) {
        this.endHour = endHour;
    }

    public String getEndMinute() {
        return endMinute;
    }
    public void setEndMinute(String endMinute) {
        this.endMinute = endMinute;
    }

    public String getBeginTime() {
        return beginTime;
    }
    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return endTime;
    }
    public void setEndTime(String endTime) {
        this.endTime = endTime;
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
