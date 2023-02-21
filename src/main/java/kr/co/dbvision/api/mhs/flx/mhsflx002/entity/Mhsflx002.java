package kr.co.dbvision.api.mhs.flx.mhsflx002.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 개인별근무유형선택관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.13
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 * </pre>
 */

public class Mhsflx002 extends CommonVO {

    /* 사원번호 */
    private String empno;
    /* 사원이름*/
    private String empnm;
    /* 사원이름 */
    private String korNm;
    /* 부서코드*/
    private String deptCode;
    /* 순번 */
    private String sn;
    /* 근무 유형 코드 */
    private String workTyCode;
    /* 근무 유형 이름 */
    private String workTyCodeNm;
    /* 반려 사유 */
    private String returnResn;
    /* 사용 시작 일자 */
    private String useBeginDe;
    /* 사용 종료 일자 */
    private String useEndDe;
    /* 근무 시작 시간 */
    private String workBeginTime;
    /* 근무 시작 시간(시) */
    private String workBeginTimeHr;
    /* 근무 시작 시간(분) */
    private String workBeginTimeMin;
    /* 근무 종료 시간 */
    private String workEndTime;
    /* 근무 종료 시간(시) */
    private String workEndTimeHr;
    /* 근무 종료 시간(분)*/
    private String workEndTimeMin;

    /* 비고 */
    private String rm;
    /* 승인 여부 코드 */
    private String confmSttusCode;
    /* 승인 여부 */
    private String confmSttusCodeNm;
    /* 승인 일자 */
    private String confmDe;
    /* 승인자 사원번호 */
    private String confmerEmpno;
    /* 승인자 사원이름 */
    private String confmerEmpnm;
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

    /* 유연근무제에 따른 근무 유형 정의 */
    
    /* 근무 유형 코드 */
    private String code;
    /* 근무 유형  */
    private String codeNm;
    /* 기본 유형 여부 */
    private String bassTyAt;
    /* 산정 기간 */
    private String calcPd;
    /* 선택적 근로시간제 */
    private String coreTimeApplcAt;
    /* 재량 근로시간제 - 출근 확인 여부 */
    private String attendConfirmAt;
    /* 재량 근로시간제 - 1일 인정 근무시간 */
    private String dayRecogWorktime;
    
    /* 근무 일자 체크 후 중복시 담아줄 메세지*/
    private String valCheckMsg;
    
    
    
    public Mhsflx002() {
        //
    }

    public Mhsflx002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.empnm = StringExpression.nullConvert(egovMap.get("empnm"));
            this.korNm = StringExpression.nullConvert(egovMap.get("korNm"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.sn = StringExpression.nullConvert(egovMap.get("sn"));
            this.workTyCode = StringExpression.nullConvert(egovMap.get("workTyCode"));
            this.workTyCodeNm = StringExpression.nullConvert(egovMap.get("workTyCodeNm"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.workBeginTime = StringExpression.nullConvert(egovMap.get("workBeginTime"));
            this.workBeginTimeHr = StringExpression.nullConvert(egovMap.get("workBeginTimeHr"));
            this.workBeginTimeMin = StringExpression.nullConvert(egovMap.get("workBeginTimeMin"));
            this.workEndTime = StringExpression.nullConvert(egovMap.get("workEndTime"));
            this.workEndTimeHr = StringExpression.nullConvert(egovMap.get("workEndTimeHr"));
            this.workEndTimeMin = StringExpression.nullConvert(egovMap.get("workEndTimeMin"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.confmSttusCode = StringExpression.nullConvert(egovMap.get("confmSttusCode"));
            this.confmSttusCodeNm = StringExpression.nullConvert(egovMap.get("confmSttusCodeNm"));
            this.returnResn = StringExpression.nullConvert(egovMap.get("returnResn"));
            this.confmDe = StringExpression.nullConvert(egovMap.get("confmDe"));
            this.confmerEmpno = StringExpression.nullConvert(egovMap.get("confmerEmpno"));
            this.confmerEmpnm = StringExpression.nullConvert(egovMap.get("confmerEmpnm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.code = StringExpression.nullConvert(egovMap.get("code"));
            this.codeNm = StringExpression.nullConvert(egovMap.get("codeNm"));
            this.bassTyAt = StringExpression.nullConvert(egovMap.get("bassTyAt"));
            this.calcPd = StringExpression.nullConvert(egovMap.get("calcPd"));
            this.coreTimeApplcAt = StringExpression.nullConvert(egovMap.get("coreTimeApplcAt"));
            this.attendConfirmAt = StringExpression.nullConvert(egovMap.get("attendConfirmAt"));
            this.dayRecogWorktime = StringExpression.nullConvert(egovMap.get("dayRecogWorktime"));
            this.valCheckMsg = StringExpression.nullConvert(egovMap.get("valCheckMsg"));

        }
    }

    public Mhsflx002(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.empnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empnm")));
            this.korNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_korNm")));
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode")));
            this.sn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sn")));
            this.workTyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workTyCode")));
            this.workTyCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workTyCodeNm")));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useBeginDe")));
            this.useEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useEndDe")));
            this.workBeginTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workBeginTime")));
            this.workBeginTimeHr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workBeginTimeHr")));
            this.workBeginTimeMin = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workBeginTimeMin")));
            this.workEndTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workEndTime")));
            this.workEndTimeHr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workEndTimeHr")));
            this.workEndTimeMin = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workEndTimeMin")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.confmSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmSttusCode")));
            this.confmSttusCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmSttusCodeNm")));
            this.returnResn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_returnResn")));
            this.confmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmDe")));
            this.confmerEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmerEmpno")));
            this.confmerEmpnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmerEmpnm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.code = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_code")));
            this.codeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codeNm")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            this.bassTyAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bassTyAt")));
            this.calcPd = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcPd")));
            this.coreTimeApplcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_coreTimeApplcAt")));
            this.attendConfirmAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_attendConfirmAt")));
            this.dayRecogWorktime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dayRecogWorktime")));
            this.valCheckMsg = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_valCheckMsg")));

        }
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getSn() {
        return sn;
    }
    public void setSn(String sn) {
        this.sn = sn;
    }

    public String getWorkTyCode() {
        return workTyCode;
    }
    public void setWorkTyCode(String workTyCode) {
        this.workTyCode = workTyCode;
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

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
    }

    public String getConfmDe() {
        return confmDe;
    }
    public void setConfmDe(String confmDe) {
        this.confmDe = confmDe;
    }

    public String getConfmerEmpno() {
        return confmerEmpno;
    }
    public void setConfmerEmpno(String confmerEmpno) {
        this.confmerEmpno = confmerEmpno;
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

    public String getWorkTyCodeNm() {
        return workTyCodeNm;
    }

    public void setWorkTyCodeNm(String workTyCodeNm) {
        this.workTyCodeNm = workTyCodeNm;
    }

    public String getWorkBeginTimeHr() {
        return workBeginTimeHr;
    }

    public void setWorkBeginTimeHr(String workBeginTimeHr) {
        this.workBeginTimeHr = workBeginTimeHr;
    }

    public String getWorkBeginTimeMin() {
        return workBeginTimeMin;
    }

    public void setWorkBeginTimeMin(String workBeginTimeMin) {
        this.workBeginTimeMin = workBeginTimeMin;
    }

    public String getWorkEndTimeHr() {
        return workEndTimeHr;
    }

    public void setWorkEndTimeHr(String workEndTimeHr) {
        this.workEndTimeHr = workEndTimeHr;
    }

    public String getWorkEndTimeMin() {
        return workEndTimeMin;
    }

    public void setWorkEndTimeMin(String workEndTimeMin) {
        this.workEndTimeMin = workEndTimeMin;
    }

    public String getEmpnm() {
        return empnm;
    }

    public void setEmpnm(String empnm) {
        this.empnm = empnm;
    }

    public String getBassTyAt() {
        return bassTyAt;
    }

    public void setBassTyAt(String bassTyAt) {
        this.bassTyAt = bassTyAt;
    }

    public String getCalcPd() {
        return calcPd;
    }

    public void setCalcPd(String calcPd) {
        this.calcPd = calcPd;
    }

    public String getCoreTimeApplcAt() {
        return coreTimeApplcAt;
    }

    public void setCoreTimeApplcAt(String coreTimeApplcAt) {
        this.coreTimeApplcAt = coreTimeApplcAt;
    }

    public String getAttendConfirmAt() {
        return attendConfirmAt;
    }

    public void setAttendConfirmAt(String attendConfirmAt) {
        this.attendConfirmAt = attendConfirmAt;
    }

    public String getDayRecogWorktime() {
        return dayRecogWorktime;
    }

    public void setDayRecogWorktime(String dayRecogWorktime) {
        this.dayRecogWorktime = dayRecogWorktime;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCodeNm() {
        return codeNm;
    }

    public void setCodeNm(String codeNm) {
        this.codeNm = codeNm;
    }

    public String getDeptCode() {
        return deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getKorNm() {
        return korNm;
    }

    public void setKorNm(String korNm) {
        this.korNm = korNm;
    }

    public String getValCheckMsg() {
        return valCheckMsg;
    }

    public void setValCheckMsg(String valCheckMsg) {
        this.valCheckMsg = valCheckMsg;
    }

    public String getConfmerEmpnm() {
        return confmerEmpnm;
    }

    public void setConfmerEmpnm(String confmerEmpnm) {
        this.confmerEmpnm = confmerEmpnm;
    }

    public String getConfmSttusCode() {
        return confmSttusCode;
    }

    public void setConfmSttusCode(String confmSttusCode) {
        this.confmSttusCode = confmSttusCode;
    }

    public String getConfmSttusCodeNm() {
        return confmSttusCodeNm;
    }

    public void setConfmSttusCodeNm(String confmSttusCodeNm) {
        this.confmSttusCodeNm = confmSttusCodeNm;
    }

    public String getReturnResn() {
        return returnResn;
    }

    public void setReturnResn(String returnResn) {
        this.returnResn = returnResn;
    }

    @Override
    public String toString() {
        return "Mhsflx002 [empno=" + empno + ", empnm=" + empnm + ", korNm=" + korNm + ", deptCode=" + deptCode
                + ", sn=" + sn + ", workTyCode=" + workTyCode + ", workTyCodeNm=" + workTyCodeNm + ", returnResn="
                + returnResn + ", useBeginDe=" + useBeginDe + ", useEndDe=" + useEndDe + ", workBeginTime="
                + workBeginTime + ", workBeginTimeHr=" + workBeginTimeHr + ", workBeginTimeMin=" + workBeginTimeMin
                + ", workEndTime=" + workEndTime + ", workEndTimeHr=" + workEndTimeHr + ", workEndTimeMin="
                + workEndTimeMin + ", rm=" + rm + ", confmSttusCode=" + confmSttusCode + ", confmSttusCodeNm="
                + confmSttusCodeNm + ", confmDe=" + confmDe + ", confmerEmpno=" + confmerEmpno + ", confmerEmpnm="
                + confmerEmpnm + ", regDt=" + regDt + ", regId=" + regId + ", uptDt=" + uptDt + ", uptId=" + uptId
                + ", nativeeditorStatus=" + nativeeditorStatus + ", records=" + records + ", code=" + code + ", codeNm="
                + codeNm + ", bassTyAt=" + bassTyAt + ", calcPd=" + calcPd + ", coreTimeApplcAt=" + coreTimeApplcAt
                + ", attendConfirmAt=" + attendConfirmAt + ", dayRecogWorktime=" + dayRecogWorktime + ", valCheckMsg="
                + valCheckMsg + "]";
    }
    
}
