package kr.co.dbvision.api.mhs.edu.mhsedu003.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 교육결과보고관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.09.09
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.09)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.09          디비비전              최초 생성
 * </pre>
 */

public class Mhsedu003 extends CommonVO {

    /* 교육과정코드 */
    private String educourseCode;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 사원번호 */
    private String empno;
    /* 결과 전자결재 구분 순번 */
    private String resultElctsctSeSn;
    /* 교육 시작일자 */
    private String eduSdt;
    /* 교육 시작시간 */
    private String eduShr;
    /* 교육 종료일자 */
    private String eduEdt;
    /* 교육 종료시간 */
    private String eduEhr;
    /* 총 이수 시간(인정 이수 시간) */
    private String totFinishTime;
    /* 총 교육비 */
    private String totEducost;
    /* 고용보험 환급액 */
    private String episRetunamt;
    /* 개인 교육비 */
    private String indvdlEducost;
    /* 수료 여부 */
    private String cochrgeAt;
    /* 만족도 코드 (C926) */
    private String stsfdgCode;
    /* 교육 기관 */
    private String eduInstt;
    /* 교육 기관 주소(장소) */
    private String eduInsttAdres;
    /* 교육 내용 */
    private String eduCn;
    /* 업무 적용 계획 */
    private String jobApplcPlan;
    /* 요청(건의) 사항 */
    private String requstDesc;
    /* 설문조사 코드 */
    private String qestnarCode;
    /* 설문조사 결과 순번 */
    private String qestnarResultSn;
    /* 교통비 */
    private String trnsportct;
    /* 일비 */
    private String dayct;
    /* 식대 비용 */
    private String cgffdAmt;
    /* 숙박비 */
    private String stayngct;
    /* 비고(교육내용) */
    private String rm;
    /* 첨부파일 번호 */
    private String atchmnflNo;
    /* 전자결재 문서 번호 (전자결재 문서 번호 또는 승인 일자) */
    private String elctsctDocNo;
    /* 전자결재 상태 코드 ( EA004 또는 승인 여부 (승인 신청 상태 C197)) */
    private String elctsctSttusCode;
    /* 전자결재 사원번호  (전자결재 사원번호 또는승인자 사원번호) */
    private String elctsctEmpno;
    /* 반려 사유 */
    private String returnResn;
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

    public Mhsedu003() {
        //
    }

    public Mhsedu003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.educourseCode = StringExpression.nullConvert(egovMap.get("educourseCode"));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.resultElctsctSeSn = StringExpression.nullConvert(egovMap.get("resultElctsctSeSn"));
            this.eduSdt = StringExpression.nullConvert(egovMap.get("eduSdt"));
            this.eduShr = StringExpression.nullConvert(egovMap.get("eduShr"));
            this.eduEdt = StringExpression.nullConvert(egovMap.get("eduEdt"));
            this.eduEhr = StringExpression.nullConvert(egovMap.get("eduEhr"));
            this.totFinishTime = StringExpression.nullConvert(egovMap.get("totFinishTime"));
            this.totEducost = StringExpression.nullConvert(egovMap.get("totEducost"));
            this.episRetunamt = StringExpression.nullConvert(egovMap.get("episRetunamt"));
            this.indvdlEducost = StringExpression.nullConvert(egovMap.get("indvdlEducost"));
            this.cochrgeAt = StringExpression.nullConvert(egovMap.get("cochrgeAt"));
            this.stsfdgCode = StringExpression.nullConvert(egovMap.get("stsfdgCode"));
            this.eduInstt = StringExpression.nullConvert(egovMap.get("eduInstt"));
            this.eduInsttAdres = StringExpression.nullConvert(egovMap.get("eduInsttAdres"));
            this.eduCn = StringExpression.nullConvert(egovMap.get("eduCn"));
            this.jobApplcPlan = StringExpression.nullConvert(egovMap.get("jobApplcPlan"));
            this.requstDesc = StringExpression.nullConvert(egovMap.get("requstDesc"));
            this.qestnarCode = StringExpression.nullConvert(egovMap.get("qestnarCode"));
            this.qestnarResultSn = StringExpression.nullConvert(egovMap.get("qestnarResultSn"));
            this.trnsportct = StringExpression.nullConvert(egovMap.get("trnsportct"));
            this.dayct = StringExpression.nullConvert(egovMap.get("dayct"));
            this.cgffdAmt = StringExpression.nullConvert(egovMap.get("cgffdAmt"));
            this.stayngct = StringExpression.nullConvert(egovMap.get("stayngct"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.returnResn = StringExpression.nullConvert(egovMap.get("returnResn"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mhsedu003(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.educourseCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_educourseCode")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.resultElctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_resultElctsctSeSn")));
            this.eduSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduSdt")));
            this.eduShr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduShr")));
            this.eduEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduEdt")));
            this.eduEhr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduEhr")));
            this.totFinishTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_totFinishTime")));
            this.totEducost = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_totEducost")));
            this.episRetunamt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episRetunamt")));
            this.indvdlEducost = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdlEducost")));
            this.cochrgeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cochrgeAt")));
            this.stsfdgCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stsfdgCode")));
            this.eduInstt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduInstt")));
            this.eduInsttAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduInsttAdres")));
            this.eduCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduCn")));
            this.jobApplcPlan = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jobApplcPlan")));
            this.requstDesc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstDesc")));
            this.qestnarCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarCode")));
            this.qestnarResultSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarResultSn")));
            this.trnsportct = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_trnsportct")));
            this.dayct = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dayct")));
            this.cgffdAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cgffdAmt")));
            this.stayngct = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stayngct")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.returnResn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_returnResn")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getEducourseCode() {
        return educourseCode;
    }
    public void setEducourseCode(String educourseCode) {
        this.educourseCode = educourseCode;
    }

    public String getElctsctSeSn() {
        return elctsctSeSn;
    }
    public void setElctsctSeSn(String elctsctSeSn) {
        this.elctsctSeSn = elctsctSeSn;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getResultElctsctSeSn() {
        return resultElctsctSeSn;
    }
    public void setResultElctsctSeSn(String resultElctsctSeSn) {
        this.resultElctsctSeSn = resultElctsctSeSn;
    }

    public String getEduSdt() {
        return eduSdt;
    }
    public void setEduSdt(String eduSdt) {
        this.eduSdt = eduSdt;
    }

    public String getEduShr() {
        return eduShr;
    }
    public void setEduShr(String eduShr) {
        this.eduShr = eduShr;
    }

    public String getEduEdt() {
        return eduEdt;
    }
    public void setEduEdt(String eduEdt) {
        this.eduEdt = eduEdt;
    }

    public String getEduEhr() {
        return eduEhr;
    }
    public void setEduEhr(String eduEhr) {
        this.eduEhr = eduEhr;
    }

    public String getTotFinishTime() {
        return totFinishTime;
    }
    public void setTotFinishTime(String totFinishTime) {
        this.totFinishTime = totFinishTime;
    }

    public String getTotEducost() {
        return totEducost;
    }
    public void setTotEducost(String totEducost) {
        this.totEducost = totEducost;
    }

    public String getEpisRetunamt() {
        return episRetunamt;
    }
    public void setEpisRetunamt(String episRetunamt) {
        this.episRetunamt = episRetunamt;
    }

    public String getIndvdlEducost() {
        return indvdlEducost;
    }
    public void setIndvdlEducost(String indvdlEducost) {
        this.indvdlEducost = indvdlEducost;
    }

    public String getCochrgeAt() {
        return cochrgeAt;
    }
    public void setCochrgeAt(String cochrgeAt) {
        this.cochrgeAt = cochrgeAt;
    }

    public String getStsfdgCode() {
        return stsfdgCode;
    }
    public void setStsfdgCode(String stsfdgCode) {
        this.stsfdgCode = stsfdgCode;
    }

    public String getEduInstt() {
        return eduInstt;
    }
    public void setEduInstt(String eduInstt) {
        this.eduInstt = eduInstt;
    }

    public String getEduInsttAdres() {
        return eduInsttAdres;
    }
    public void setEduInsttAdres(String eduInsttAdres) {
        this.eduInsttAdres = eduInsttAdres;
    }

    public String getEduCn() {
        return eduCn;
    }
    public void setEduCn(String eduCn) {
        this.eduCn = eduCn;
    }

    public String getJobApplcPlan() {
        return jobApplcPlan;
    }
    public void setJobApplcPlan(String jobApplcPlan) {
        this.jobApplcPlan = jobApplcPlan;
    }

    public String getRequstDesc() {
        return requstDesc;
    }
    public void setRequstDesc(String requstDesc) {
        this.requstDesc = requstDesc;
    }

    public String getQestnarCode() {
        return qestnarCode;
    }
    public void setQestnarCode(String qestnarCode) {
        this.qestnarCode = qestnarCode;
    }

    public String getQestnarResultSn() {
        return qestnarResultSn;
    }
    public void setQestnarResultSn(String qestnarResultSn) {
        this.qestnarResultSn = qestnarResultSn;
    }

    public String getTrnsportct() {
        return trnsportct;
    }
    public void setTrnsportct(String trnsportct) {
        this.trnsportct = trnsportct;
    }

    public String getDayct() {
        return dayct;
    }
    public void setDayct(String dayct) {
        this.dayct = dayct;
    }

    public String getCgffdAmt() {
        return cgffdAmt;
    }
    public void setCgffdAmt(String cgffdAmt) {
        this.cgffdAmt = cgffdAmt;
    }

    public String getStayngct() {
        return stayngct;
    }
    public void setStayngct(String stayngct) {
        this.stayngct = stayngct;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
    }

    public String getAtchmnflNo() {
        return atchmnflNo;
    }
    public void setAtchmnflNo(String atchmnflNo) {
        this.atchmnflNo = atchmnflNo;
    }

    public String getElctsctDocNo() {
        return elctsctDocNo;
    }
    public void setElctsctDocNo(String elctsctDocNo) {
        this.elctsctDocNo = elctsctDocNo;
    }

    public String getElctsctSttusCode() {
        return elctsctSttusCode;
    }
    public void setElctsctSttusCode(String elctsctSttusCode) {
        this.elctsctSttusCode = elctsctSttusCode;
    }

    public String getElctsctEmpno() {
        return elctsctEmpno;
    }
    public void setElctsctEmpno(String elctsctEmpno) {
        this.elctsctEmpno = elctsctEmpno;
    }

    public String getReturnResn() {
        return returnResn;
    }
    public void setReturnResn(String returnResn) {
        this.returnResn = returnResn;
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
