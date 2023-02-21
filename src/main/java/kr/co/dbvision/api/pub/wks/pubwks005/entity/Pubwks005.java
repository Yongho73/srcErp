package kr.co.dbvision.api.pub.wks.pubwks005.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 초과근무신청관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.24
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.24          디비비전              최초 생성
 * </pre>
 */

public class Pubwks005 extends CommonVO {
    /* 부서 코드 */
    private String deptCode;
    /* 시간외 근무 순번 */
    private String ovtimeWorkSn;
    /* 사원번호 */
    private String empno;
    /* 사원이름 */
    private String empnm;
    /* 시간외 구분 코드 */
    private String ovtimeSeCode;
    /* 시간외 구분 코드 이름*/
    private String ovtimeSeCodeNm;
    /* 신청 일자 */
    private String reqstDe;
    /* 신청 일자 이전 달 */
    private String beforeReqstMonth;
    /* 신청 일자 기준 달 */
    private String stanReqstMonth;
    /* 신청 일자 이후 달 */
    private String afterReqstMonth;
    /* 신청 시작 시간 */
    private String reqstBeginTime;
    /* 신청 시작 시간 - 시 */
    private String reqstBeginTimeHr;
    /* 신청 시작 시간 - 분 */
    private String reqstBeginTimeMin;
    /* 신청 종료 시간 */
    private String reqstEndTime;
    /* 신청 종료 시간 - 시 */
    private String reqstEndTimeHr;
    /* 신청 종료 시간 - 분 */
    private String reqstEndTimeMin;    
    /* 실제 근무 일자 */
    private String realWorkDe;
    /* 실제 근무 시작 일자 */
    private String realWorkSdt;
    /* 실제 근무 종료 일자 */
    private String realWorkEdt;
    /* 실제 시작 시간 */
    private String realBeginTime;
    /* 실제 시작 시간 - 시 */
    private String realBeginTimeHr;
    /* 실제 시작 시간 - 분 */
    private String realBeginTimeMin;
    /* 실제 종료 시간 */
    private String realEndTime;
    /* 실제 종료 시간 - 시*/
    private String realEndTimeHr;
    /* 실제 종료 시간 - 분*/
    private String realEndTimeMin;
    /* 실제 근무 시간 */
    private String realWorkTime;
    /* 근무 시작 시간(시차근무관리) */
    private String workBeginTime;
    /* 근무 종료 시간(시차근무관리) */
    private String workEndTime;
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
    /* 철회 전자결재 문서 번호 */
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
    /* 개인별 근무 유형 데이터 */
    private List<EgovMapForNull> indvdRecords = new ArrayList<EgovMapForNull>();
    /* 개인별 근무 유형 코드 */
    private String indvdWorkTyCode;
    /* 개인별 근무 유형 시작일자 */
    private String indvdUseBeginDe;
    /* 개인별 근무 유형 종료일자 */
    private String indvdUseEndDe;
    /* 개인별 근무 유형 시작시간 */
    private String indvdWorkBeginTime;
    /* 개인별 근무 유형 종료시간 */
    private String indvdWorkEndTime;
    /* 개인별 근무 유형 승인여부 */
    private String indvdConfmSttusCode;

    /* 정상 근무 시간 */
    private EgovMapForNull stanWorkTimeRecords = new EgovMapForNull();
    
    public Pubwks005() {
        //
    }

    public Pubwks005(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.setDeptCode(StringExpression.nullConvert(egovMap.get("deptCode")));
            this.ovtimeWorkSn = StringExpression.nullConvert(egovMap.get("ovtimeWorkSn"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.empnm = StringExpression.nullConvert(egovMap.get("empnm"));
            this.ovtimeSeCode = StringExpression.nullConvert(egovMap.get("ovtimeSeCode"));
            this.ovtimeSeCodeNm = StringExpression.nullConvert(egovMap.get("ovtimeSeCodeNm"));
            this.reqstDe = StringExpression.nullConvert(egovMap.get("reqstDe"));
            this.beforeReqstMonth = StringExpression.nullConvert(egovMap.get("beforeReqstMonth"));
            this.stanReqstMonth = StringExpression.nullConvert(egovMap.get("stanReqstMonth"));
            this.afterReqstMonth = StringExpression.nullConvert(egovMap.get("afterReqstMonth"));
            this.reqstBeginTime = StringExpression.nullConvert(egovMap.get("reqstBeginTime"));
            this.reqstBeginTimeHr = StringExpression.nullConvert(egovMap.get("reqstBeginTimeHr"));
            this.reqstBeginTimeMin = StringExpression.nullConvert(egovMap.get("reqstBeginTimeMin"));
            this.reqstEndTime = StringExpression.nullConvert(egovMap.get("reqstEndTime"));
            this.reqstEndTimeHr = StringExpression.nullConvert(egovMap.get("reqstEndTimeHr"));
            this.reqstEndTimeMin = StringExpression.nullConvert(egovMap.get("reqstEndTimeMin"));
            this.realWorkDe = StringExpression.nullConvert(egovMap.get("realWorkDe"));
            this.realWorkSdt = StringExpression.nullConvert(egovMap.get("realWorkSdt"));
            this.realWorkEdt = StringExpression.nullConvert(egovMap.get("realWorkEdt"));
            this.realBeginTime = StringExpression.nullConvert(egovMap.get("realBeginTime"));
            this.realBeginTimeHr = StringExpression.nullConvert(egovMap.get("realBeginTimeHr"));
            this.realBeginTimeMin = StringExpression.nullConvert(egovMap.get("realBeginTimeMin"));
            this.realEndTime = StringExpression.nullConvert(egovMap.get("realEndTime"));
            this.realEndTimeHr = StringExpression.nullConvert(egovMap.get("realEndTimeHr"));
            this.realEndTimeMin = StringExpression.nullConvert(egovMap.get("realEndTimeMin"));
            this.realWorkTime = StringExpression.nullConvert(egovMap.get("realWorkTime"));
            this.workBeginTime = StringExpression.nullConvert(egovMap.get("workBeginTime"));
            this.workEndTime = StringExpression.nullConvert(egovMap.get("workEndTime"));
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
            
            this.indvdWorkTyCode = StringExpression.nullConvert(egovMap.get("indvdWorkTyCode"));
            this.indvdUseBeginDe = StringExpression.nullConvert(egovMap.get("indvdUseBeginDe"));
            this.indvdUseEndDe = StringExpression.nullConvert(egovMap.get("indvdUseEndDe"));
            this.indvdWorkBeginTime = StringExpression.nullConvert(egovMap.get("indvdWorkBeginTime"));
            this.indvdWorkEndTime = StringExpression.nullConvert(egovMap.get("indvdWorkEndTime"));
            this.indvdConfmSttusCode = StringExpression.nullConvert(egovMap.get("indvdConfmSttusCode"));
            
        }
    }

    public Pubwks005(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.setDeptCode(StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode"))));
            this.ovtimeWorkSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ovtimeWorkSn")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.empnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empnm")));
            this.ovtimeSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ovtimeSeCode")));
            this.ovtimeSeCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ovtimeSeCodeNm")));
            this.reqstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstDe")));
            this.beforeReqstMonth = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_beforeReqstMonth")));
            this.stanReqstMonth = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stanReqstMonth")));
            this.afterReqstMonth = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_afterReqstMonth")));
            this.reqstBeginTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstBeginTime")));
            this.reqstEndTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstEndTime")));
            this.realWorkDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realWorkDe")));
            this.realWorkSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realWorkSdt")));
            this.realWorkEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realWorkEdt")));
            this.realBeginTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realBeginTime")));
            this.realEndTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realEndTime")));
            this.realWorkTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realWorkTime")));
            this.workBeginTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workBeginTime")));
            this.workEndTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workEndTime")));
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

            this.indvdWorkTyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdWorkTyCode")));
            this.indvdUseBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdUseBeginDe")));
            this.indvdUseEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdUseEndDe")));
            this.indvdWorkBeginTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdWorkBeginTime")));
            this.indvdWorkEndTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdWorkEndTime")));
            this.indvdConfmSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdConfmSttusCode")));
        
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

    public String getEmpnm() {
        return empnm;
    }

    public void setEmpnm(String empnm) {
        this.empnm = empnm;
    }

    public String getElctsctSttusCodeNm() {
        return elctsctSttusCodeNm;
    }

    public void setElctsctSttusCodeNm(String elctsctSttusCodeNm) {
        this.elctsctSttusCodeNm = elctsctSttusCodeNm;
    }

    public String getDeptCode() {
        return deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getRealWorkSdt() {
        return realWorkSdt;
    }

    public void setRealWorkSdt(String realWorkSdt) {
        this.realWorkSdt = realWorkSdt;
    }

    public String getRealWorkEdt() {
        return realWorkEdt;
    }

    public void setRealWorkEdt(String realWorkEdt) {
        this.realWorkEdt = realWorkEdt;
    }

    public String getOvtimeSeCodeNm() {
        return ovtimeSeCodeNm;
    }

    public void setOvtimeSeCodeNm(String ovtimeSeCodeNm) {
        this.ovtimeSeCodeNm = ovtimeSeCodeNm;
    }

    public String getReqstBeginTimeHr() {
        return reqstBeginTimeHr;
    }

    public void setReqstBeginTimeHr(String reqstBeginTimeHr) {
        this.reqstBeginTimeHr = reqstBeginTimeHr;
    }

    public String getReqstBeginTimeMin() {
        return reqstBeginTimeMin;
    }

    public void setReqstBeginTimeMin(String reqstBeginTimeMin) {
        this.reqstBeginTimeMin = reqstBeginTimeMin;
    }

    public String getReqstEndTimeHr() {
        return reqstEndTimeHr;
    }

    public void setReqstEndTimeHr(String reqstEndTimeHr) {
        this.reqstEndTimeHr = reqstEndTimeHr;
    }

    public String getReqstEndTimeMin() {
        return reqstEndTimeMin;
    }

    public void setReqstEndTimeMin(String reqstEndTimeMin) {
        this.reqstEndTimeMin = reqstEndTimeMin;
    }

    public String getRealBeginTimeHr() {
        return realBeginTimeHr;
    }

    public void setRealBeginTimeHr(String realBeginTimeHr) {
        this.realBeginTimeHr = realBeginTimeHr;
    }

    public String getRealBeginTimeMin() {
        return realBeginTimeMin;
    }

    public void setRealBeginTimeMin(String realBeginTimeMin) {
        this.realBeginTimeMin = realBeginTimeMin;
    }

    public String getRealEndTimeHr() {
        return realEndTimeHr;
    }

    public void setRealEndTimeHr(String realEndTimeHr) {
        this.realEndTimeHr = realEndTimeHr;
    }

    public String getRealEndTimeMin() {
        return realEndTimeMin;
    }

    public void setRealEndTimeMin(String realEndTimeMin) {
        this.realEndTimeMin = realEndTimeMin;
    }

    public String getBeforeReqstMonth() {
        return beforeReqstMonth;
    }

    public void setBeforeReqstMonth(String beforeReqstMonth) {
        this.beforeReqstMonth = beforeReqstMonth;
    }

    public String getAfterReqstMonth() {
        return afterReqstMonth;
    }

    public void setAfterReqstMonth(String afterReqstMonth) {
        this.afterReqstMonth = afterReqstMonth;
    }

    public String getWorkBeginTime() {
        return workBeginTime;
    }

    public void setWorkBeginTime(String workBeginTime) {
        this.workBeginTime = workBeginTime;
    }

    public String getWorkEndTime() {
        return workEndTime;
    }

    public void setWorkEndTime(String workEndTime) {
        this.workEndTime = workEndTime;
    }

    public String getIndvdWorkTyCode() {
        return indvdWorkTyCode;
    }

    public void setIndvdWorkTyCode(String indvdWorkTyCode) {
        this.indvdWorkTyCode = indvdWorkTyCode;
    }

    public String getIndvdUseBeginDe() {
        return indvdUseBeginDe;
    }

    public void setIndvdUseBeginDe(String indvdUseBeginDe) {
        this.indvdUseBeginDe = indvdUseBeginDe;
    }

    public String getIndvdUseEndDe() {
        return indvdUseEndDe;
    }

    public void setIndvdUseEndDe(String indvdUseEndDe) {
        this.indvdUseEndDe = indvdUseEndDe;
    }

    public String getIndvdWorkBeginTime() {
        return indvdWorkBeginTime;
    }

    public void setIndvdWorkBeginTime(String indvdWorkBeginTime) {
        this.indvdWorkBeginTime = indvdWorkBeginTime;
    }

    public String getIndvdWorkEndTime() {
        return indvdWorkEndTime;
    }

    public void setIndvdWorkEndTime(String indvdWorkEndTime) {
        this.indvdWorkEndTime = indvdWorkEndTime;
    }

    public String getIndvdConfmSttusCode() {
        return indvdConfmSttusCode;
    }

    public void setIndvdConfmSttusCode(String indvdConfmSttusCode) {
        this.indvdConfmSttusCode = indvdConfmSttusCode;
    }

    public List<EgovMapForNull> getIndvdRecords() {
        return indvdRecords;
    }

    public void setIndvdRecords(List<EgovMapForNull> indvdRecords) {
        this.indvdRecords = indvdRecords;
    }

    public String getStanReqstMonth() {
        return stanReqstMonth;
    }

    public void setStanReqstMonth(String stanReqstMonth) {
        this.stanReqstMonth = stanReqstMonth;
    }

    public EgovMapForNull getStanWorkTimeRecords() {
        return stanWorkTimeRecords;
    }

    public void setStanWorkTimeRecords(EgovMapForNull stanWorkTimeRecords) {
        this.stanWorkTimeRecords = stanWorkTimeRecords;
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

    @Override
    public String toString() {
        return "Pubwks005 [deptCode=" + deptCode + ", ovtimeWorkSn=" + ovtimeWorkSn + ", empno=" + empno + ", empnm="
                + empnm + ", ovtimeSeCode=" + ovtimeSeCode + ", ovtimeSeCodeNm=" + ovtimeSeCodeNm + ", reqstDe="
                + reqstDe + ", beforeReqstMonth=" + beforeReqstMonth + ", stanReqstMonth=" + stanReqstMonth
                + ", afterReqstMonth=" + afterReqstMonth + ", reqstBeginTime=" + reqstBeginTime + ", reqstBeginTimeHr="
                + reqstBeginTimeHr + ", reqstBeginTimeMin=" + reqstBeginTimeMin + ", reqstEndTime=" + reqstEndTime
                + ", reqstEndTimeHr=" + reqstEndTimeHr + ", reqstEndTimeMin=" + reqstEndTimeMin + ", realWorkDe="
                + realWorkDe + ", realWorkSdt=" + realWorkSdt + ", realWorkEdt=" + realWorkEdt + ", realBeginTime="
                + realBeginTime + ", realBeginTimeHr=" + realBeginTimeHr + ", realBeginTimeMin=" + realBeginTimeMin
                + ", realEndTime=" + realEndTime + ", realEndTimeHr=" + realEndTimeHr + ", realEndTimeMin="
                + realEndTimeMin + ", realWorkTime=" + realWorkTime + ", workBeginTime=" + workBeginTime
                + ", workEndTime=" + workEndTime + ", mealAt=" + mealAt + ", workCn=" + workCn + ", dayRecogTime="
                + dayRecogTime + ", nightRecogTime=" + nightRecogTime + ", altHvofUseAt=" + altHvofUseAt
                + ", altHvofDe=" + altHvofDe + ", elctsctSttusCode=" + elctsctSttusCode + ", elctsctSttusCodeNm="
                + elctsctSttusCodeNm + ", elctsctDocNo=" + elctsctDocNo + ", elctsctEmpno=" + elctsctEmpno
                + ", elctsctEmpnm=" + elctsctEmpnm + ", wthdrawElctsctSeSn=" + wthdrawElctsctSeSn + ", wthdrawAt="
                + wthdrawAt + ", rewardHvofUseAt=" + rewardHvofUseAt + ", rewardHvofRemainderTime="
                + rewardHvofRemainderTime + ", vacReqstNo=" + vacReqstNo + ", rm=" + rm + ", regDt=" + regDt
                + ", regId=" + regId + ", uptDt=" + uptDt + ", uptId=" + uptId + ", nativeeditorStatus="
                + nativeeditorStatus + ", records=" + records + ", indvdRecords=" + indvdRecords + ", indvdWorkTyCode="
                + indvdWorkTyCode + ", indvdUseBeginDe=" + indvdUseBeginDe + ", indvdUseEndDe=" + indvdUseEndDe
                + ", indvdWorkBeginTime=" + indvdWorkBeginTime + ", indvdWorkEndTime=" + indvdWorkEndTime
                + ", indvdConfmSttusCode=" + indvdConfmSttusCode + ", stanWorkTimeRecords=" + stanWorkTimeRecords
                + ", getOvtimeWorkSn()=" + getOvtimeWorkSn() + ", getEmpno()=" + getEmpno() + ", getOvtimeSeCode()="
                + getOvtimeSeCode() + ", getReqstDe()=" + getReqstDe() + ", getReqstBeginTime()=" + getReqstBeginTime()
                + ", getReqstEndTime()=" + getReqstEndTime() + ", getRealWorkDe()=" + getRealWorkDe()
                + ", getRealBeginTime()=" + getRealBeginTime() + ", getRealEndTime()=" + getRealEndTime()
                + ", getRealWorkTime()=" + getRealWorkTime() + ", getMealAt()=" + getMealAt() + ", getWorkCn()="
                + getWorkCn() + ", getDayRecogTime()=" + getDayRecogTime() + ", getNightRecogTime()="
                + getNightRecogTime() + ", getAltHvofUseAt()=" + getAltHvofUseAt() + ", getAltHvofDe()="
                + getAltHvofDe() + ", getElctsctSttusCode()=" + getElctsctSttusCode() + ", getElctsctDocNo()="
                + getElctsctDocNo() + ", getWthdrawAt()=" + getWthdrawAt() + ", getRewardHvofUseAt()="
                + getRewardHvofUseAt() + ", getRewardHvofRemainderTime()=" + getRewardHvofRemainderTime()
                + ", getVacReqstNo()=" + getVacReqstNo() + ", getRm()=" + getRm() + ", getRegDt()=" + getRegDt()
                + ", getRegId()=" + getRegId() + ", getUptDt()=" + getUptDt() + ", getUptId()=" + getUptId()
                + ", getNativeeditorStatus()=" + getNativeeditorStatus() + ", getRecords()=" + getRecords()
                + ", getEmpnm()=" + getEmpnm() + ", getElctsctSttusCodeNm()=" + getElctsctSttusCodeNm()
                + ", getDeptCode()=" + getDeptCode() + ", getRealWorkSdt()=" + getRealWorkSdt() + ", getRealWorkEdt()="
                + getRealWorkEdt() + ", getOvtimeSeCodeNm()=" + getOvtimeSeCodeNm() + ", getReqstBeginTimeHr()="
                + getReqstBeginTimeHr() + ", getReqstBeginTimeMin()=" + getReqstBeginTimeMin()
                + ", getReqstEndTimeHr()=" + getReqstEndTimeHr() + ", getReqstEndTimeMin()=" + getReqstEndTimeMin()
                + ", getRealBeginTimeHr()=" + getRealBeginTimeHr() + ", getRealBeginTimeMin()=" + getRealBeginTimeMin()
                + ", getRealEndTimeHr()=" + getRealEndTimeHr() + ", getRealEndTimeMin()=" + getRealEndTimeMin()
                + ", getBeforeReqstMonth()=" + getBeforeReqstMonth() + ", getAfterReqstMonth()=" + getAfterReqstMonth()
                + ", getWorkBeginTime()=" + getWorkBeginTime() + ", getWorkEndTime()=" + getWorkEndTime()
                + ", getIndvdWorkTyCode()=" + getIndvdWorkTyCode() + ", getIndvdUseBeginDe()=" + getIndvdUseBeginDe()
                + ", getIndvdUseEndDe()=" + getIndvdUseEndDe() + ", getIndvdWorkBeginTime()=" + getIndvdWorkBeginTime()
                + ", getIndvdWorkEndTime()=" + getIndvdWorkEndTime() + ", getIndvdConfmSttusCode()="
                + getIndvdConfmSttusCode() + ", getIndvdRecords()=" + getIndvdRecords() + ", getStanReqstMonth()="
                + getStanReqstMonth() + ", getStanWorkTimeRecords()=" + getStanWorkTimeRecords()
                + ", getElctsctEmpno()=" + getElctsctEmpno() + ", getElctsctEmpnm()=" + getElctsctEmpnm()
                + ", getWthdrawElctsctSeSn()=" + getWthdrawElctsctSeSn() + ", getRnum()=" + getRnum() + ", getMode()="
                + getMode() + ", getsRegDt()=" + getsRegDt() + ", geteRegDt()=" + geteRegDt() + ", getSortOrder()="
                + getSortOrder() + ", getSortId()=" + getSortId() + ", getRegNm()=" + getRegNm() + ", getUptNm()="
                + getUptNm() + ", getListPageIndex()=" + getListPageIndex() + ", getFirstIndex()=" + getFirstIndex()
                + ", getLastIndex()=" + getLastIndex() + ", getTotalPageCount()=" + getTotalPageCount()
                + ", getFirstPageNo()=" + getFirstPageNo() + ", getLastPageNo()=" + getLastPageNo()
                + ", getCurrentPageNo()=" + getCurrentPageNo() + ", getPageSize()=" + getPageSize()
                + ", getFirstPageNoOnPageList()=" + getFirstPageNoOnPageList() + ", getFirstRecordIndex()="
                + getFirstRecordIndex() + ", getLastPageNoOnPageList()=" + getLastPageNoOnPageList()
                + ", getLastRecordIndex()=" + getLastRecordIndex() + ", getRecordCountPerPage()="
                + getRecordCountPerPage() + ", getTotalRecordCount()=" + getTotalRecordCount() + ", getClass()="
                + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
    }

    

}
