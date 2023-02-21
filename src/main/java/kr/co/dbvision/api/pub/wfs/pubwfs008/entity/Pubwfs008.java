package kr.co.dbvision.api.pub.wfs.pubwfs008.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 자녀학비보조금신청관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.03          디비비전              최초 생성
 * </pre>
 */

public class Pubwfs008 extends CommonVO {

    /* 신청번호 */
    private String reqstNo;
    /* 사원번호 */
    private String empno;
    /* 발생 년도 */
    private String occrrncYy;
    /* 분기 */
    private String qu;
    /* 자녀 명 */
    private String chldrnNm;
    /* 학교 명 */
    private String schulNm;
    /* 학년 */
    private String grade;
    /* 수업료 금액 */
    private String tutfeeAmt;
    /* 운영 지원 금액 */
    private String operSportAmt;
    /* 신청일자 */
    private String reqstDe;
    /* 지급일자 */
    private String pymntDe;
    /* 회계전표를 유일하게 식별할 수 있는 번호를 기록하는 항목 */
    private String slipNo;
    /* 첨부파일번호 */
    private String atchmnflNo;
    /* 전자결재 문서 번호 */
    private String elctsctDocNo;
    /* 전자결재 상태 코드 */
    private String elctsctSttusCode;
    /* 전자결재 사원번호 */
    private String elctsctEmpno;
    /* 비고 항목 */
    private String rm;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 지급 순번 */
    private String pymntSn;
    /* 적용 년월 */
    private String applcYm;
    /* 승인 여부 */
    private String confmSttusCode;
    /* 승인일자 */
    private String confmDe;
    /* 승인자사원번호 */
    private String confmerEmpno;
    /* 반려사유 */
    private String returnResn;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Pubwfs008() {
        //
    }

    public Pubwfs008(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.reqstNo = StringExpression.nullConvert(egovMap.get("reqstNo"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.occrrncYy = StringExpression.nullConvert(egovMap.get("occrrncYy"));
            this.qu = StringExpression.nullConvert(egovMap.get("qu"));
            this.chldrnNm = StringExpression.nullConvert(egovMap.get("chldrnNm"));
            this.schulNm = StringExpression.nullConvert(egovMap.get("schulNm"));
            this.grade = StringExpression.nullConvert(egovMap.get("grade"));
            this.tutfeeAmt = StringExpression.nullConvert(egovMap.get("tutfeeAmt"));
            this.operSportAmt = StringExpression.nullConvert(egovMap.get("operSportAmt"));
            this.reqstDe = StringExpression.nullConvert(egovMap.get("reqstDe"));
            this.pymntDe = StringExpression.nullConvert(egovMap.get("pymntDe"));
            this.slipNo = StringExpression.nullConvert(egovMap.get("slipNo"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.pymntSn = StringExpression.nullConvert(egovMap.get("pymntSn"));
            this.applcYm = StringExpression.nullConvert(egovMap.get("applcYm"));
            this.confmSttusCode = StringExpression.nullConvert(egovMap.get("confmSttusCode"));
            this.confmDe = StringExpression.nullConvert(egovMap.get("confmDe"));
            this.confmerEmpno = StringExpression.nullConvert(egovMap.get("confmerEmpno"));
            this.returnResn = StringExpression.nullConvert(egovMap.get("returnResn"));
        }
    }

    public Pubwfs008(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.reqstNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstNo")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.occrrncYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_occrrncYy")));
            this.qu = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qu")));
            this.chldrnNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chldrnNm")));
            this.schulNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_schulNm")));
            this.grade = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_grade")));
            this.tutfeeAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_tutfeeAmt")));
            this.operSportAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_operSportAmt")));
            this.reqstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstDe")));
            this.pymntDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntDe")));
            this.slipNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_slipNo")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.pymntSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntSn")));
            this.applcYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYm")));
            this.confmSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmSttusCode")));
            this.confmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmDe")));
            this.confmerEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmerEmpno")));
            this.returnResn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_returnResn")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getReqstNo() {
        return reqstNo;
    }
    public void setReqstNo(String reqstNo) {
        this.reqstNo = reqstNo;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getOccrrncYy() {
        return occrrncYy;
    }
    public void setOccrrncYy(String occrrncYy) {
        this.occrrncYy = occrrncYy;
    }

    public String getQu() {
        return qu;
    }
    public void setQu(String qu) {
        this.qu = qu;
    }

    public String getChldrnNm() {
        return chldrnNm;
    }
    public void setChldrnNm(String chldrnNm) {
        this.chldrnNm = chldrnNm;
    }

    public String getSchulNm() {
        return schulNm;
    }
    public void setSchulNm(String schulNm) {
        this.schulNm = schulNm;
    }

    public String getGrade() {
        return grade;
    }
    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getTutfeeAmt() {
        return tutfeeAmt;
    }
    public void setTutfeeAmt(String tutfeeAmt) {
        this.tutfeeAmt = tutfeeAmt;
    }

    public String getOperSportAmt() {
        return operSportAmt;
    }
    public void setOperSportAmt(String operSportAmt) {
        this.operSportAmt = operSportAmt;
    }

    public String getReqstDe() {
        return reqstDe;
    }
    public void setReqstDe(String reqstDe) {
        this.reqstDe = reqstDe;
    }

    public String getPymntDe() {
        return pymntDe;
    }
    public void setPymntDe(String pymntDe) {
        this.pymntDe = pymntDe;
    }

    public String getSlipNo() {
        return slipNo;
    }
    public void setSlipNo(String slipNo) {
        this.slipNo = slipNo;
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

    public String getElctsctSeSn() {
        return elctsctSeSn;
    }
    public void setElctsctSeSn(String elctsctSeSn) {
        this.elctsctSeSn = elctsctSeSn;
    }

    public String getPymntSn() {
        return pymntSn;
    }
    public void setPymntSn(String pymntSn) {
        this.pymntSn = pymntSn;
    }

    public String getApplcYm() {
        return applcYm;
    }
    public void setApplcYm(String applcYm) {
        this.applcYm = applcYm;
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

    public String getReturnResn() {
        return returnResn;
    }
    public void setReturnResn(String returnResn) {
        this.returnResn = returnResn;
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
