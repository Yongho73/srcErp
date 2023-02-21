package kr.co.dbvision.api.mhs.hrd.mhshrd010.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 초과근무조회관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.30
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.30)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.30          디비비전              최초 생성
 * </pre>
 */

public class Mhshrd010 extends CommonVO {

    /* 시간외 근무 순번 */
    private String ovtimeWorkSn;
    /* 사원번호 */
    private String empno;
    /* 사원이름 */
    private String empnm;
    /* 시간외 구분 코드 */
    private String ovtimeSeCode;
    /* 시간외 코드 */
    private String ovtimeSeCodeNm;
    /* 신청 일자 */
    private String reqstDe;
    /* 신청 시작 시간 */
    private String reqstBeginTime;
    /* 신청 종료 시간 */
    private String reqstEndTime;
    /* 실제 근무 일자 */
    private String realWorkDe;
    /* 실제 시작 시간 */
    private String realBeginTime;
    /* 실제 종료 시간 */
    private String realEndTime;
    /* 실제 근무 시간 */
    private String realWorkTime;
    /* 매식 여부 */
    private String mealAt;
    /* 근무 내용 */
    private String workCn;
    /* 주간 인정 시간 */
    private String dayRecogTime;
    /* 야간 인정 시간 */
    private String nightRecogTime;
    /* 대체 휴무 사용 여부 */
    private String altHvofUseAt;
    /* 대체 휴무 일 */
    private String altHvofDe;
    /* 전자결재 상태 코드 */
    private String elctsctSttusCode;
    /* 전자결재 상태 */
    private String elctsctSttusCodeNm;
    /* 전자결재 문서 번호 */
    private String elctsctDocNo;
    /* 전자결재 사원 번호 */
    private String elctsctEmpno;
    /* 전자결재 사원 이름 */
    private String elctsctEmpnm;
    /* 철회 전자결재 순번 */
    private String wthdrawElctsctSeSn;
    /* 철회 여부 */
    private String wthdrawAt;
    /* 보상 휴무 사용 여부 */
    private String rewardHvofUseAt;
    /* 보상 휴무 잔여 시간 */
    private String rewardHvofRemainderTime;
    /* 휴가 신청 번호 */
    private String vacReqstNo;
    /* 비고 */
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

    public Mhshrd010() {
        //
    }

    public Mhshrd010(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.ovtimeWorkSn = StringExpression.nullConvert(egovMap.get("ovtimeWorkSn"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.empnm = StringExpression.nullConvert(egovMap.get("empnm"));
            this.ovtimeSeCode = StringExpression.nullConvert(egovMap.get("ovtimeSeCode"));
            this.ovtimeSeCodeNm = StringExpression.nullConvert(egovMap.get("ovtimeSeCodeNm"));
            this.reqstDe = StringExpression.nullConvert(egovMap.get("reqstDe"));
            this.reqstBeginTime = StringExpression.nullConvert(egovMap.get("reqstBeginTime"));
            this.reqstEndTime = StringExpression.nullConvert(egovMap.get("reqstEndTime"));
            this.realWorkDe = StringExpression.nullConvert(egovMap.get("realWorkDe"));
            this.realBeginTime = StringExpression.nullConvert(egovMap.get("realBeginTime"));
            this.realEndTime = StringExpression.nullConvert(egovMap.get("realEndTime"));
            this.realWorkTime = StringExpression.nullConvert(egovMap.get("realWorkTime"));
            this.mealAt = StringExpression.nullConvert(egovMap.get("mealAt"));
            this.workCn = StringExpression.nullConvert(egovMap.get("workCn"));
            this.dayRecogTime = StringExpression.nullConvert(egovMap.get("dayRecogTime"));
            this.nightRecogTime = StringExpression.nullConvert(egovMap.get("nightRecogTime"));
            this.altHvofUseAt = StringExpression.nullConvert(egovMap.get("altHvofUseAt"));
            this.altHvofDe = StringExpression.nullConvert(egovMap.get("altHvofDe"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get("elctsctSttusCodeNm"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.elctsctEmpnm = StringExpression.nullConvert(egovMap.get("elctsctEmpnm"));
            this.wthdrawElctsctSeSn = StringExpression.nullConvert(egovMap.get("wthdrawElctsctSeSn"));
            this.wthdrawAt = StringExpression.nullConvert(egovMap.get("wthdrawAt"));
            this.rewardHvofUseAt = StringExpression.nullConvert(egovMap.get("rewardHvofUseAt"));
            this.rewardHvofRemainderTime = StringExpression.nullConvert(egovMap.get("rewardHvofRemainderTime"));
            this.vacReqstNo = StringExpression.nullConvert(egovMap.get("vacReqstNo"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mhshrd010(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.ovtimeWorkSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ovtimeWorkSn")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.empnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empnm")));
            this.ovtimeSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ovtimeSeCode")));
            this.ovtimeSeCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ovtimeSeCodeNm")));
            this.reqstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstDe")));
            this.reqstBeginTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstBeginTime")));
            this.reqstEndTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstEndTime")));
            this.realWorkDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realWorkDe")));
            this.realBeginTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realBeginTime")));
            this.realEndTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realEndTime")));
            this.realWorkTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realWorkTime")));
            this.mealAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mealAt")));
            this.workCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workCn")));
            this.dayRecogTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dayRecogTime")));
            this.nightRecogTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nightRecogTime")));
            this.altHvofUseAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_altHvofUseAt")));
            this.altHvofDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_altHvofDe")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.elctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCodeNm")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.elctsctEmpnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpnm")));
            this.wthdrawElctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wthdrawElctsctSeSn")));
            this.wthdrawAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wthdrawAt")));
            this.rewardHvofUseAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rewardHvofUseAt")));
            this.rewardHvofRemainderTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rewardHvofRemainderTime")));
            this.vacReqstNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_vacReqstNo")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getOvtimeWorkSn() {
        return ovtimeWorkSn;
    }
    public void setOvtimeWorkSn(String ovtimeWorkSn) {
        this.ovtimeWorkSn = ovtimeWorkSn;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getOvtimeSeCode() {
        return ovtimeSeCode;
    }
    public void setOvtimeSeCode(String ovtimeSeCode) {
        this.ovtimeSeCode = ovtimeSeCode;
    }

    public String getReqstDe() {
        return reqstDe;
    }
    public void setReqstDe(String reqstDe) {
        this.reqstDe = reqstDe;
    }

    public String getReqstBeginTime() {
        return reqstBeginTime;
    }
    public void setReqstBeginTime(String reqstBeginTime) {
        this.reqstBeginTime = reqstBeginTime;
    }

    public String getReqstEndTime() {
        return reqstEndTime;
    }
    public void setReqstEndTime(String reqstEndTime) {
        this.reqstEndTime = reqstEndTime;
    }

    public String getRealWorkDe() {
        return realWorkDe;
    }
    public void setRealWorkDe(String realWorkDe) {
        this.realWorkDe = realWorkDe;
    }

    public String getRealBeginTime() {
        return realBeginTime;
    }
    public void setRealBeginTime(String realBeginTime) {
        this.realBeginTime = realBeginTime;
    }

    public String getRealEndTime() {
        return realEndTime;
    }
    public void setRealEndTime(String realEndTime) {
        this.realEndTime = realEndTime;
    }

    public String getRealWorkTime() {
        return realWorkTime;
    }
    public void setRealWorkTime(String realWorkTime) {
        this.realWorkTime = realWorkTime;
    }

    public String getMealAt() {
        return mealAt;
    }
    public void setMealAt(String mealAt) {
        this.mealAt = mealAt;
    }

    public String getWorkCn() {
        return workCn;
    }
    public void setWorkCn(String workCn) {
        this.workCn = workCn;
    }

    public String getDayRecogTime() {
        return dayRecogTime;
    }
    public void setDayRecogTime(String dayRecogTime) {
        this.dayRecogTime = dayRecogTime;
    }

    public String getNightRecogTime() {
        return nightRecogTime;
    }
    public void setNightRecogTime(String nightRecogTime) {
        this.nightRecogTime = nightRecogTime;
    }

    public String getAltHvofUseAt() {
        return altHvofUseAt;
    }
    public void setAltHvofUseAt(String altHvofUseAt) {
        this.altHvofUseAt = altHvofUseAt;
    }

    public String getAltHvofDe() {
        return altHvofDe;
    }
    public void setAltHvofDe(String altHvofDe) {
        this.altHvofDe = altHvofDe;
    }

    public String getElctsctSttusCode() {
        return elctsctSttusCode;
    }
    public void setElctsctSttusCode(String elctsctSttusCode) {
        this.elctsctSttusCode = elctsctSttusCode;
    }

    public String getElctsctDocNo() {
        return elctsctDocNo;
    }
    public void setElctsctDocNo(String elctsctDocNo) {
        this.elctsctDocNo = elctsctDocNo;
    }

    public String getWthdrawAt() {
        return wthdrawAt;
    }
    public void setWthdrawAt(String wthdrawAt) {
        this.wthdrawAt = wthdrawAt;
    }

    public String getRewardHvofUseAt() {
        return rewardHvofUseAt;
    }
    public void setRewardHvofUseAt(String rewardHvofUseAt) {
        this.rewardHvofUseAt = rewardHvofUseAt;
    }

    public String getRewardHvofRemainderTime() {
        return rewardHvofRemainderTime;
    }
    public void setRewardHvofRemainderTime(String rewardHvofRemainderTime) {
        this.rewardHvofRemainderTime = rewardHvofRemainderTime;
    }

    public String getVacReqstNo() {
        return vacReqstNo;
    }
    public void setVacReqstNo(String vacReqstNo) {
        this.vacReqstNo = vacReqstNo;
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

    public String getOvtimeSeCodeNm() {
        return ovtimeSeCodeNm;
    }

    public void setOvtimeSeCodeNm(String ovtimeSeCodeNm) {
        this.ovtimeSeCodeNm = ovtimeSeCodeNm;
    }

    public String getElctsctSttusCodeNm() {
        return elctsctSttusCodeNm;
    }

    public void setElctsctSttusCodeNm(String elctsctSttusCodeNm) {
        this.elctsctSttusCodeNm = elctsctSttusCodeNm;
    }

    public String getEmpnm() {
        return empnm;
    }

    public void setEmpnm(String empnm) {
        this.empnm = empnm;
    }

    public String getElctsctEmpno() {
        return elctsctEmpno;
    }

    public void setElctsctEmpno(String elctsctEmpno) {
        this.elctsctEmpno = elctsctEmpno;
    }

    public String getElctsctEmpnm() {
        return elctsctEmpnm;
    }

    public void setElctsctEmpnm(String elctsctEmpnm) {
        this.elctsctEmpnm = elctsctEmpnm;
    }

    public String getWthdrawElctsctSeSn() {
        return wthdrawElctsctSeSn;
    }

    public void setWthdrawElctsctSeSn(String wthdrawElctsctSeSn) {
        this.wthdrawElctsctSeSn = wthdrawElctsctSeSn;
    }
    
}
