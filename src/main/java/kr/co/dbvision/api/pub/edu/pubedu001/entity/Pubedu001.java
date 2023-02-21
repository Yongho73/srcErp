package kr.co.dbvision.api.pub.edu.pubedu001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 교육조회및신청관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.09.01
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.01)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.01          디비비전              최초 생성
 * </pre>
 */

public class Pubedu001 extends CommonVO {
    /* 신청 일자 */
    private String reqstDe;
    /* 신규 과정 여부 : 신규 교육과정 신청이면 1 */
    private String newCrseAt;
    /* 교육과정코드 : 선택 시에는 승인된 교육만 신청 가능, 선택 시에는 아래 내용 입력 불필요(기존에 등록되지 않은 교육 일수도 있으므로 null 가능 ) */
    private String educourseCode;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 교육과정 명 */
    private String educourseNm;
    /* 교육 일수 */
    private String eduDaycnt;
    /* 교육 목적 */
    private String eduPurps;
    /* 교육 분류 (C206) */
    private String eduCls;
    /* 교육 종류 (C114) */
    private String eduKind;
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
    /* 개인 교육비 */
    private String indvdlEducost;
    /* 고용 보험 환급액 */
    private String episRetunamt;
    /* 수료증 발행 여부 */
    private String cochrgedocumentIsuAt;
    /* 첨부파일 번호 */
    private String atchmnflNo;
    /* 승인 상태 코드(C197) */
    private String confmSttusCode;
    /* 승인 일자 */
    private String confmDe;
    /* 승인 사원번호 */
    private String confmEmpno;
    /* 반려 사유 */
    private String returnResn;
    /* 사원번호 */
    private String empno;
    /* 교육신청 순번 */
    private String edureqstSn;
    /* 승인 구분 순번 */
    private String confmSeSn;
    /* 순번  - 예비용(본인만 신청 가능하므로 1번이 끝,추후 다른 직원 추가 가능하다고 하면 수언 증가하여 사용) */
    private String sn;
    /* 교육 시작일자 */
    private String eduSdt;
    /* 교육 시작시간 */
    private String eduShr;
    /* 교육 종료일자 */
    private String eduEdt;
    /* 교육 종료시간 */
    private String eduEhr;
    /* 비고(교육내용) */
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

    public Pubedu001() {
        //
    }

    public Pubedu001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.edureqstSn = StringExpression.nullConvert(egovMap.get("edureqstSn"));
            this.confmSeSn = StringExpression.nullConvert(egovMap.get("confmSeSn"));
            this.reqstDe = StringExpression.nullConvert(egovMap.get("reqstDe"));
            this.newCrseAt = StringExpression.nullConvert(egovMap.get("newCrseAt"));
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
            this.eduAmtBurdenSe = StringExpression.nullConvert(egovMap.get("eduAmtBurdenSe"));
            this.innerExtrlEduSe = StringExpression.nullConvert(egovMap.get("innerExtrlEduSe"));
            this.eduZone = StringExpression.nullConvert(egovMap.get("eduZone"));
            this.chrgInstructorEmplAt = StringExpression.nullConvert(egovMap.get("chrgInstructorEmplAt"));
            this.chrgInstructor = StringExpression.nullConvert(egovMap.get("chrgInstructor"));
            this.chrgInstructorNm = StringExpression.nullConvert(egovMap.get("chrgInstructorNm"));
            this.eduInstt = StringExpression.nullConvert(egovMap.get("eduInstt"));
            this.eduInsttAdres = StringExpression.nullConvert(egovMap.get("eduInsttAdres"));
            this.indvdlEducost = StringExpression.nullConvert(egovMap.get("indvdlEducost"));
            this.episRetunamt = StringExpression.nullConvert(egovMap.get("episRetunamt"));
            this.cochrgedocumentIsuAt = StringExpression.nullConvert(egovMap.get("cochrgedocumentIsuAt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.confmSttusCode = StringExpression.nullConvert(egovMap.get("confmSttusCode"));
            this.confmDe = StringExpression.nullConvert(egovMap.get("confmDe"));
            this.confmEmpno = StringExpression.nullConvert(egovMap.get("confmEmpno"));
            this.returnResn = StringExpression.nullConvert(egovMap.get("returnResn"));
            this.sn = StringExpression.nullConvert(egovMap.get("sn"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Pubedu001(EgovMapForNull egovMap, String dhxGridrowIds,String gubun) {
        super(egovMap);
        if(egovMap != null && gubun == "1") {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
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
            this.returnResn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_returnResn")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
        else if (gubun == "2") {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.edureqstSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_edureqstSn")));
            this.confmSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmSeSn")));
            this.sn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sn")));
            this.eduSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduSdt")));
            this.eduShr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduShr")));
            this.eduEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduEdt")));
            this.eduEhr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eduEhr")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getReqstDe() {
        return reqstDe;
    }

    public void setReqstDe(String reqstDe) {
        this.reqstDe = reqstDe;
    }

    public String getNewCrseAt() {
        return newCrseAt;
    }

    public void setNewCrseAt(String newCrseAt) {
        this.newCrseAt = newCrseAt;
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

    public String getAtchmnflNo() {
        return atchmnflNo;
    }

    public void setAtchmnflNo(String atchmnflNo) {
        this.atchmnflNo = atchmnflNo;
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

    public String getConfmEmpno() {
        return confmEmpno;
    }

    public void setConfmEmpno(String confmEmpno) {
        this.confmEmpno = confmEmpno;
    }

    public String getReturnResn() {
        return returnResn;
    }

    public void setReturnResn(String returnResn) {
        this.returnResn = returnResn;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getEdureqstSn() {
        return edureqstSn;
    }
    public void setEdureqstSn(String edureqstSn) {
        this.edureqstSn = edureqstSn;
    }

    public String getConfmSeSn() {
        return confmSeSn;
    }
    public void setConfmSeSn(String confmSeSn) {
        this.confmSeSn = confmSeSn;
    }

    public String getSn() {
        return sn;
    }
    public void setSn(String sn) {
        this.sn = sn;
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
