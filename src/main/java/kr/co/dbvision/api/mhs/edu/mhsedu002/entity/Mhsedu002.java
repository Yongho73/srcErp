package kr.co.dbvision.api.mhs.edu.mhsedu002.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 교육신청관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.09.02
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.02)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.02          디비비전              최초 생성
 * </pre>
 */

public class Mhsedu002 extends CommonVO {

    /* 교육과정코드 */
    private String educourseCode;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 교육과정명 */
    private String educourseNm;
    /* 교육 시작일자 */
    private String eduSdt;
    /* 교육 시작시간 */
    private String eduShr;
    /* 교육 종료일자 */
    private String eduEdt;
    /* 교육 종료시간 */
    private String eduEhr;
    /* 교육 일수 */
    private String eduDaycnt;
    /* 교육 목적 */
    private String eduPurps;
    /* 교육 분류 (C206) */
    private String eduCls;
    /* 교육 종류 (C114) */
    private String eduKind;
    /* 교육 필수 여부 (C112) */
    private String eduMustAt;
    /* 교육 비용 부담 구분(C111) */
    private String eduAmtBurdenSe;
    /* 내외부 교육 구분(C208) */
    private String innerExtrlEduSe;
    /* 교육 장소 */
    private String eduZone;
    /* 담당 강사 사원 여부 */
    private String chrgInstructorEmplAt;
    /* 담당 강사 (기타/사업소득자 코드, 기타는 입력 안함) */
    private String chrgInstructor;
    /* 담당 강사 명 (기타/사업소득자는 저장 안함, 기타는 입력) */
    private String chrgInstructorNm;
    /* 교육 기관 */
    private String eduInstt;
    /* 교육기관주소 */
    private String eduInsttAdres;
    /* 총 이수 학점 */
    private String totFinishPnt;
    /* 대상 인원 */
    private String trgetCnt;
    /* 개인 교육비 */
    private String indvdlEducost;
    /* 고용 보험 환급액 */
    private String episRetunamt;
    /* 수료증 발행 여부 */
    private String cochrgedocumentIsuAt;
    /* 외래 강사 수당 */
    private String extrlInstructorAllwnc;
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
    
    private String totFinishTime;
    
    private String qestnarCode;
    
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
    
    // 교육 이수 시간
    private String mustFinishEduSe;
    private String finishTime;
    private String confmDe;
    private String confmEmpno;
    private String confmSeSn;
    private String confmSttusCode;
    private String newCrseAt;
    private String edureqstSn;
    private String reqstDe;
    private String korNm;
    // 교육 대상자 
    /* 사원번호 */
    private String empno;
    /* 이수 학점 */
    private String finishPnt;
    /* 총 교육비 */
    private String totEducost;
    /* 교통비 */
    private String trnsportct;
    /* 일비 */
    private String dayct;
    /* 식대 비용 */
    private String cgffdAmt;
    /* 숙박비 */
    private String stayngct;
    /* 수료 여부 */
    private String cochrgeAt;
    /* 본인 신청 여부(1=신청, 아니면 교육담당장에 위한 지정 교육(대상자)) */
    private String selfReqstAt;
    /* 결과 보고 순번 */
    private String resultReportSn;
            
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhsedu002() {
        //
    }

    public Mhsedu002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.educourseCode = StringExpression.nullConvert(egovMap.get("educourseCode"));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.educourseNm = StringExpression.nullConvert(egovMap.get("educourseNm"));
            this.eduSdt = StringExpression.nullConvert(egovMap.get("eduSdt"));
            this.eduShr = StringExpression.nullConvert(egovMap.get("eduShr"));
            this.eduEdt = StringExpression.nullConvert(egovMap.get("eduEdt"));
            this.eduEhr = StringExpression.nullConvert(egovMap.get("eduEhr"));
            this.eduDaycnt = StringExpression.nullConvert(egovMap.get("eduDaycnt"));
            this.eduPurps = StringExpression.nullConvert(egovMap.get("eduPurps"));
            this.eduCls = StringExpression.nullConvert(egovMap.get("eduCls"));
            this.eduKind = StringExpression.nullConvert(egovMap.get("eduKind"));
            this.eduMustAt = StringExpression.nullConvert(egovMap.get("eduMustAt"));
            this.eduAmtBurdenSe = StringExpression.nullConvert(egovMap.get("eduAmtBurdenSe"));
            this.innerExtrlEduSe = StringExpression.nullConvert(egovMap.get("innerExtrlEduSe"));
            this.eduZone = StringExpression.nullConvert(egovMap.get("eduZone"));
            this.chrgInstructorEmplAt = StringExpression.nullConvert(egovMap.get("chrgInstructorEmplAt"));
            this.chrgInstructor = StringExpression.nullConvert(egovMap.get("chrgInstructor"));
            this.chrgInstructorNm = StringExpression.nullConvert(egovMap.get("chrgInstructorNm"));
            this.eduInstt = StringExpression.nullConvert(egovMap.get("eduInstt"));
            this.eduInsttAdres = StringExpression.nullConvert(egovMap.get("eduInsttAdres"));
            this.totFinishPnt = StringExpression.nullConvert(egovMap.get("totFinishPnt"));
            this.trgetCnt = StringExpression.nullConvert(egovMap.get("trgetCnt"));
            this.indvdlEducost = StringExpression.nullConvert(egovMap.get("indvdlEducost"));
            this.episRetunamt = StringExpression.nullConvert(egovMap.get("episRetunamt"));
            this.cochrgedocumentIsuAt = StringExpression.nullConvert(egovMap.get("cochrgedocumentIsuAt"));
            this.extrlInstructorAllwnc = StringExpression.nullConvert(egovMap.get("extrlInstructorAllwnc"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.returnResn = StringExpression.nullConvert(egovMap.get("returnResn"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            
            this.mustFinishEduSe = StringExpression.nullConvert(egovMap.get("mustFinishEduSe"));
            this.finishTime = StringExpression.nullConvert(egovMap.get("finishTime"));
            this.totFinishTime = StringExpression.nullConvert(egovMap.get("totFinishTime"));
            this.qestnarCode = StringExpression.nullConvert(egovMap.get(""));
            
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.finishPnt = StringExpression.nullConvert(egovMap.get("finishPnt"));
            this.totEducost = StringExpression.nullConvert(egovMap.get("totEducost"));
            this.trnsportct = StringExpression.nullConvert(egovMap.get("trnsportct"));
            this.dayct = StringExpression.nullConvert(egovMap.get("dayct"));
            this.cgffdAmt = StringExpression.nullConvert(egovMap.get("cgffdAmt"));
            this.stayngct = StringExpression.nullConvert(egovMap.get("stayngct"));
            this.cochrgeAt = StringExpression.nullConvert(egovMap.get("cochrgeAt"));
            this.selfReqstAt = StringExpression.nullConvert(egovMap.get("selfReqstAt"));
            this.resultReportSn = StringExpression.nullConvert(egovMap.get("resultReportSn"));
            this.confmDe = StringExpression.nullConvert(egovMap.get("confmDe"));
            this.confmEmpno = StringExpression.nullConvert(egovMap.get("confmEmpno"));
            this.confmSeSn = StringExpression.nullConvert(egovMap.get("confmSeSn"));
            this.confmSttusCode = StringExpression.nullConvert(egovMap.get("confmSttusCode"));
            this.newCrseAt = StringExpression.nullConvert(egovMap.get("newCrseAt"));
            this.edureqstSn = StringExpression.nullConvert(egovMap.get("edureqstSn"));
            this.reqstDe = StringExpression.nullConvert(egovMap.get("reqstDe"));
        }
    }

    public Mhsedu002(EgovMapForNull egovMap, String dhxGridrowIds  ,String gubun) {
        super(egovMap);
        if(egovMap != null && gubun == "1") {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.korNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_korNm")));
            this.edureqstSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_edureqstSn")));
            this.confmSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmSeSn")));
            this.reqstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstDe")));
            this.newCrseAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_newCrseAt")));
            this.educourseCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_educourseCode")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.educourseNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_educourseNm")));
            this.eduSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduSdt")));
            this.eduShr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduShr")));
            this.eduEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduEdt")));
            this.eduEhr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduEhr")));
            this.eduDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduDaycnt")));
            this.eduPurps = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduPurps")));
            this.eduCls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduCls")));
            this.eduKind = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduKind")));
            this.eduAmtBurdenSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduAmtBurdenSe")));
            this.innerExtrlEduSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_innerExtrlEduSe")));
            this.eduZone = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduZone")));
            this.chrgInstructorEmplAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chrgInstructorEmplAt")));
            this.chrgInstructor = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chrgInstructor")));
            this.chrgInstructorNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chrgInstructorNm")));
            this.eduInstt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduInstt")));
            this.eduInsttAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduInsttAdres")));
            this.indvdlEducost = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdlEducost")));
            this.episRetunamt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episRetunamt")));
            this.cochrgedocumentIsuAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cochrgedocumentIsuAt")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.confmSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmSttusCode")));
            this.confmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmDe")));
            this.confmEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmEmpno")));
            this.returnResn = StringExpression.nullConvert(egovMap.get("returnResn"));
            this.eduMustAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduMustAt")));
            this.totFinishPnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_totFinishPnt")));
            this.totFinishTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_totFinishTime")));
            this.qestnarCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarCode")));
            this.trgetCnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_trgetCnt")));
            this.extrlInstructorAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_extrlInstructorAllwnc")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.selfReqstAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_selfReqstAt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            
            
        } 
        else if (gubun == "2") {
            this.educourseCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_educourseCode")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.mustFinishEduSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mustFinishEduSe")));
            this.finishTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_finishTime")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        } else if(gubun == "3") {
            this.educourseCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_educourseCode")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
//            this.educourseCode = StringExpression.nullConvert(egovMap.get("educourseCode"));
//            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.eduSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduSdt")));
            this.eduShr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduShr")));
            this.eduEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduEdt")));
            this.eduEhr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduEhr")));
            this.finishPnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_finishPnt")));
            this.totEducost = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_totEducost")));
            this.episRetunamt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episRetunamt")));
            this.indvdlEducost = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdlEducost")));
            this.trnsportct = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_trnsportct")));
            this.dayct = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dayct")));
            this.cgffdAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cgffdAmt")));
            this.stayngct = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stayngct")));
            this.cochrgeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cochrgeAt")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.returnResn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_returnResn")));
            this.selfReqstAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_selfReqstAt")));
            this.resultReportSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_resultReportSn")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            
        } else if(gubun == "4") {
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.returnResn = StringExpression.nullConvert(egovMap.get("returnResn"));
            this.edureqstSn = StringExpression.nullConvert(egovMap.get("edureqstSn"));
            this.confmSeSn = StringExpression.nullConvert(egovMap.get("confmSeSn"));
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

    public String getEducourseNm() {
        return educourseNm;
    }
    public void setEducourseNm(String educourseNm) {
        this.educourseNm = educourseNm;
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

    public String getEduDaycnt() {
        return eduDaycnt;
    }
    public void setEduDaycnt(String eduDaycnt) {
        this.eduDaycnt = eduDaycnt;
    }

    public String getEduPurps() {
        return eduPurps;
    }
    public void setEduPurps(String eduPurps) {
        this.eduPurps = eduPurps;
    }

    public String getEduCls() {
        return eduCls;
    }
    public void setEduCls(String eduCls) {
        this.eduCls = eduCls;
    }

    public String getEduKind() {
        return eduKind;
    }
    public void setEduKind(String eduKind) {
        this.eduKind = eduKind;
    }

    public String getEduMustAt() {
        return eduMustAt;
    }
    public void setEduMustAt(String eduMustAt) {
        this.eduMustAt = eduMustAt;
    }

    public String getEduAmtBurdenSe() {
        return eduAmtBurdenSe;
    }
    public void setEduAmtBurdenSe(String eduAmtBurdenSe) {
        this.eduAmtBurdenSe = eduAmtBurdenSe;
    }

    public String getInnerExtrlEduSe() {
        return innerExtrlEduSe;
    }
    public void setInnerExtrlEduSe(String innerExtrlEduSe) {
        this.innerExtrlEduSe = innerExtrlEduSe;
    }

    public String getEduZone() {
        return eduZone;
    }
    public void setEduZone(String eduZone) {
        this.eduZone = eduZone;
    }

    public String getChrgInstructorEmplAt() {
        return chrgInstructorEmplAt;
    }
    public void setChrgInstructorEmplAt(String chrgInstructorEmplAt) {
        this.chrgInstructorEmplAt = chrgInstructorEmplAt;
    }

    public String getChrgInstructor() {
        return chrgInstructor;
    }
    public void setChrgInstructor(String chrgInstructor) {
        this.chrgInstructor = chrgInstructor;
    }

    public String getChrgInstructorNm() {
        return chrgInstructorNm;
    }
    public void setChrgInstructorNm(String chrgInstructorNm) {
        this.chrgInstructorNm = chrgInstructorNm;
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

    public String getTotFinishPnt() {
        return totFinishPnt;
    }
    public void setTotFinishPnt(String totFinishPnt) {
        this.totFinishPnt = totFinishPnt;
    }

    public String getTrgetCnt() {
        return trgetCnt;
    }
    public void setTrgetCnt(String trgetCnt) {
        this.trgetCnt = trgetCnt;
    }

    public String getIndvdlEducost() {
        return indvdlEducost;
    }
    public void setIndvdlEducost(String indvdlEducost) {
        this.indvdlEducost = indvdlEducost;
    }

    public String getEpisRetunamt() {
        return episRetunamt;
    }
    public void setEpisRetunamt(String episRetunamt) {
        this.episRetunamt = episRetunamt;
    }

    public String getCochrgedocumentIsuAt() {
        return cochrgedocumentIsuAt;
    }
    public void setCochrgedocumentIsuAt(String cochrgedocumentIsuAt) {
        this.cochrgedocumentIsuAt = cochrgedocumentIsuAt;
    }

    public String getExtrlInstructorAllwnc() {
        return extrlInstructorAllwnc;
    }
    public void setExtrlInstructorAllwnc(String extrlInstructorAllwnc) {
        this.extrlInstructorAllwnc = extrlInstructorAllwnc;
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

    public String getMustFinishEduSe() {
        return mustFinishEduSe;
    }

    public void setMustFinishEduSe(String mustFinishEduSe) {
        this.mustFinishEduSe = mustFinishEduSe;
    }

    public String getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(String finishTime) {
        this.finishTime = finishTime;
    }

    public void setNativeeditorStatus(String nativeeditorStatus) {
        this.nativeeditorStatus = nativeeditorStatus;
    }
    
    public String getEmpno() {
        return empno;
    }

    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getFinishPnt() {
        return finishPnt;
    }

    public void setFinishPnt(String finishPnt) {
        this.finishPnt = finishPnt;
    }

    public String getTotEducost() {
        return totEducost;
    }

    public void setTotEducost(String totEducost) {
        this.totEducost = totEducost;
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

    public String getCochrgeAt() {
        return cochrgeAt;
    }

    public void setCochrgeAt(String cochrgeAt) {
        this.cochrgeAt = cochrgeAt;
    }

    public String getSelfReqstAt() {
        return selfReqstAt;
    }

    public void setSelfReqstAt(String selfReqstAt) {
        this.selfReqstAt = selfReqstAt;
    }

    public String getConfmDe() {
        return confmDe;
    }

    public void setConfmDe(String confmDe) {
        this.confmDe = confmDe;
    }
    

    public String getConfmEmpno() {
        return confmEmpno;
    }

    public void setConfmEmpno(String confmEmpno) {
        this.confmEmpno = confmEmpno;
    }

    public String getConfmSeSn() {
        return confmSeSn;
    }

    public void setConfmSeSn(String confmSeSn) {
        this.confmSeSn = confmSeSn;
    }

    public String getConfmSttusCode() {
        return confmSttusCode;
    }

    public void setConfmSttusCode(String confmSttusCode) {
        this.confmSttusCode = confmSttusCode;
    }

    public String getEdureqstSn() {
        return edureqstSn;
    }


    public String getNewCrseAt() {
        return newCrseAt;
    }

    public void setNewCrseAt(String newCrseAt) {
        this.newCrseAt = newCrseAt;
    }

    public void setEdureqstSn(String edureqstSn) {
        this.edureqstSn = edureqstSn;
    }

    public String getReqstDe() {
        return reqstDe;
    }

    public void setReqstDe(String reqstDe) {
        this.reqstDe = reqstDe;
    }

    public String getResultReportSn() {
        return resultReportSn;
    }

    public void setResultReportSn(String resultReportSn) {
        this.resultReportSn = resultReportSn;
    }

    public String getTotFinishTime() {
        return totFinishTime;
    }

    public void setTotFinishTime(String totFinishTime) {
        this.totFinishTime = totFinishTime;
    }

    public String getQestnarCode() {
        return qestnarCode;
    }

    public void setQestnarCode(String qestnarCode) {
        this.qestnarCode = qestnarCode;
    }
    
    public String getKorNm() {
        return korNm;
    }

    public void setKorNm(String korNm) {
        this.korNm = korNm;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
