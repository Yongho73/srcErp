package kr.co.dbvision.api.pub.wks.pubwks020.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 시차근무관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.14
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.14)
 * @see
 *
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.14          디비비전              최초 생성
 *      </pre>
 */

public class Pubwks020 extends CommonVO {

    /* 사원번호 */
    private String empno;
    /* 승인 구분 순번 */
    private String confmSeSn;
    /* 사원번호 배열*/
    private List<String> empnoArr;
    /* 사원이름 */
    private String empnm;
    /* 근무일 */
    private String workDay;
    /* 근무 시작 시간 */
    private String workBeginTime;
    /* 근무 종료 시간 */
    private String workEndTime;
    /* 근무지 명 */
    private String wrkplcNm;
    /* 인정 시간 */
    private String recogTime;
    /* 교대 근무 여부 */
    private String shiftWorkAt;
    /* 등록 일시 */
    private String regDt;
    /* 등록자 ID */
    private String regId;
    /* 수정 일시 */
    private String uptDt;
    /* 수정자 ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    /* 영업일 공휴일 달력 */

    /* 업무일자 */
    private String jobDe;
    /* 일자구분코드 */
    private String deSeCode;
    /* 일자구분이름 */
    private String deSeCodeNm;
    /* 휴무여부 */
    private String hvofAt;

    /* 개인별 근무 유형 */

    /* 순번 */
    private String sn;
    /* 근무유형코드 */
    private String workTyCode;
    /* 사용 시작일자 */
    private String useBeginDe;
    /* 사용 종료일자 */
    private String useEndDe;
    /* 비고 */
    private String rm;
    /* 승인 상태 코드 */
    private String confmSttusCode;
    /* 승인 상태  */
    private String confmSttusCodeNm;
    /* 승인일자 */
    private String confmDe;
    /* 승인자 사원번호 */
    private String confmerEmpno;
    /* 승인자 사원이름 */
    private String confmerEmpnm;
    /* 반려 사유 */
    private String returnResn;
    /* 사용자, 관리자 구분  */
    private String flag;
    /* 일괄 등록 사원 */
    private String multiEmpno;
    /* 휴일 포함 여부 */
    private String holiWorkAt;
    /* 일괄 등록 시 근무 시작일 부터 근무 종료일까지 */
    private List<Pubwks020> bundleWorkday;

    public Pubwks020() {
        //
    }

    public Pubwks020(EgovMapForNull egovMap) {
        super(egovMap);
        if (egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.confmSeSn = StringExpression.nullConvert(egovMap.get("confmSeSn"));
            this.empnm = StringExpression.nullConvert(egovMap.get("empnm"));
            this.workDay = StringExpression.nullConvert(egovMap.get("workDay"));
            this.workBeginTime = StringExpression.nullConvert(egovMap.get("workBeginTime"));
            this.workEndTime = StringExpression.nullConvert(egovMap.get("workEndTime"));
            this.wrkplcNm = StringExpression.nullConvert(egovMap.get("wrkplcNm"));
            this.recogTime = StringExpression.nullConvert(egovMap.get("recogTime"));
            this.shiftWorkAt = StringExpression.nullConvert(egovMap.get("shiftWorkAt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));

            this.jobDe = StringExpression.nullConvert(egovMap.get("jobDe"));
            this.deSeCode = StringExpression.nullConvert(egovMap.get("deSeCode"));
            this.deSeCodeNm = StringExpression.nullConvert(egovMap.get("deSeCodeNm"));
            this.hvofAt = StringExpression.nullConvert(egovMap.get("hvofAt"));

            this.sn = StringExpression.nullConvert(egovMap.get("sn"));
            this.workTyCode = StringExpression.nullConvert(egovMap.get("workTyCode"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.confmSttusCode = StringExpression.nullConvert(egovMap.get("confmSttusCode"));
            this.confmSttusCodeNm = StringExpression.nullConvert(egovMap.get("confmSttusCodeNm"));
            this.confmDe = StringExpression.nullConvert(egovMap.get("confmDe"));
            this.confmerEmpno = StringExpression.nullConvert(egovMap.get("confmerEmpno"));
            this.confmerEmpnm = StringExpression.nullConvert(egovMap.get("confmerEmpnm"));
            this.returnResn = StringExpression.nullConvert(egovMap.get("returnResn"));
            this.flag = StringExpression.nullConvert(egovMap.get("flag"));
            
            this.multiEmpno = StringExpression.nullConvert(egovMap.get("multiEmpno"));
            this.holiWorkAt = StringExpression.nullConvert(egovMap.get("holiWorkAt"));
//            this.empnoArr = (List<String>) egovMap.get("empnoArr");
        }
    }

    public Pubwks020(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if (egovMap != null) {
            this.empno = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_empno")));
            this.confmSeSn = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_confmSeSn")));
            this.empnm = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_empnm")));
            this.workDay = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_workDay")));
            this.workBeginTime = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_workBeginTime")));
            this.workEndTime = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_workEndTime")));
            this.wrkplcNm = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_wrkplcNm")));
            this.recogTime = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_recogTime")));
            this.shiftWorkAt = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_shiftWorkAt")));
            this.regDt = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_regDt")));
            this.regId = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_regId")));
            this.uptDt = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_uptDt")));
            this.uptId = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_uptId")));
            this.nativeeditorStatus = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_!nativeeditor_status")));

            this.jobDe = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_jobDe")));
            this.deSeCode = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_deSeCode")));
            this.deSeCodeNm = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_deSeCodeNm")));
            this.hvofAt = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_hvofAt")));

            this.sn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_sn")));
            this.workTyCode = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_workTyCode")));
            this.useBeginDe = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_useBeginDe")));
            this.useEndDe = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_useEndDe")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_rm")));
            this.confmSttusCode = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_confmSttusCode")));
            this.confmSttusCodeNm = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_confmSttusCodeNm")));
            this.confmDe = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_confmDe")));
            this.confmerEmpno = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_confmerEmpno")));
            this.confmerEmpnm = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_confmerEmpnm")));
            this.returnResn = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_returnResn")));
            this.flag = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_flag")));
            this.holiWorkAt = StringExpression
                    .nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds + "_holiWorkAt")));
        }
    }

    public String getEmpno() {
        return empno;
    }

    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getWorkDay() {
        return workDay;
    }

    public void setWorkDay(String workDay) {
        this.workDay = workDay;
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

    public String getWrkplcNm() {
        return wrkplcNm;
    }

    public void setWrkplcNm(String wrkplcNm) {
        this.wrkplcNm = wrkplcNm;
    }

    public String getRecogTime() {
        return recogTime;
    }

    public void setRecogTime(String recogTime) {
        this.recogTime = recogTime;
    }

    public String getShiftWorkAt() {
        return shiftWorkAt;
    }

    public void setShiftWorkAt(String shiftWorkAt) {
        this.shiftWorkAt = shiftWorkAt;
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

    public String getEmpnm() {
        return empnm;
    }

    public void setEmpnm(String empnm) {
        this.empnm = empnm;
    }

    public String getDeSeCodeNm() {
        return deSeCodeNm;
    }

    public void setDeSeCodeNm(String deSeCodeNm) {
        this.deSeCodeNm = deSeCodeNm;
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

    public String getRm() {
        return rm;
    }

    public void setRm(String rm) {
        this.rm = rm;
    }


    public String getConfmSttusCode() {
        return confmSttusCode;
    }

    public void setConfmSttusCode(String confmSttusCode) {
        this.confmSttusCode = confmSttusCode;
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

    public String getMultiEmpno() {
        return multiEmpno;
    }

    public void setMultiEmpno(String multiEmpno) {
        this.multiEmpno = multiEmpno;
    }

    public String getHoliWorkAt() {
        return holiWorkAt;
    }

    public void setHoliWorkAt(String holiWorkAt) {
        this.holiWorkAt = holiWorkAt;
    }

    public List<Pubwks020> getBundleWorkday() {
        return bundleWorkday;
    }

    public void setBundleWorkday(List<Pubwks020> bundleWorkday) {
        this.bundleWorkday = bundleWorkday;
    }

    public String getConfmSttusCodeNm() {
        return confmSttusCodeNm;
    }

    public void setConfmSttusCodeNm(String confmSttusCodeNm) {
        this.confmSttusCodeNm = confmSttusCodeNm;
    }

    public String getConfmerEmpnm() {
        return confmerEmpnm;
    }

    public void setConfmerEmpnm(String confmerEmpnm) {
        this.confmerEmpnm = confmerEmpnm;
    }

    public List<String> getEmpnoArr() {
        return empnoArr;
    }

    public void setEmpnoArr(List<String> empnoArr) {
        this.empnoArr = empnoArr;
    }

    public String getReturnResn() {
        return returnResn;
    }

    public void setReturnResn(String returnResn) {
        this.returnResn = returnResn;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getConfmSeSn() {
        return confmSeSn;
    }

    public void setConfmSeSn(String confmSeSn) {
        this.confmSeSn = confmSeSn;
    }

    @Override
    public String toString() {
        return "Pubwks020 [" + "empno=" + empno + ", confmSeSn=" + confmSeSn + ", empnoArr="
                + empnoArr + ", empnm=" + empnm + ", workDay=" + workDay + ", workBeginTime=" + workBeginTime
                + ", workEndTime=" + workEndTime + ", wrkplcNm=" + wrkplcNm + ", recogTime=" + recogTime
                + ", shiftWorkAt=" + shiftWorkAt + ", regDt=" + regDt + ", regId=" + regId + ", uptDt=" + uptDt
                + ", uptId=" + uptId + ", nativeeditorStatus=" + nativeeditorStatus + ", records=" + records
                + ", jobDe=" + jobDe + ", deSeCode=" + deSeCode + ", deSeCodeNm=" + deSeCodeNm + ", hvofAt=" + hvofAt
                + ", sn=" + sn + ", workTyCode=" + workTyCode + ", useBeginDe=" + useBeginDe + ", useEndDe=" + useEndDe
                + ", rm=" + rm + ", confmSttusCode=" + confmSttusCode + ", confmSttusCodeNm=" + confmSttusCodeNm
                + ", confmDe=" + confmDe + ", confmerEmpno=" + confmerEmpno + ", confmerEmpnm=" + confmerEmpnm
                + ", returnResn=" + returnResn + ", flag=" + flag + ", multiEmpno=" + multiEmpno + ", holiWorkAt="
                + holiWorkAt + ", bundleWorkday=" + bundleWorkday + "]";
    }

    
    
}
