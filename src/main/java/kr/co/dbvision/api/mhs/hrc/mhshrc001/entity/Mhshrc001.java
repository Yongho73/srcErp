package kr.co.dbvision.api.mhs.hrc.mhshrc001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 증명서신청/출력관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */

public class Mhshrc001 extends CommonVO {

    /* 발급번호 : 증명서신청번호 자동 체번 사용 */
    private String issuno;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 사원번호 */
    private String empno;
    /* 사원이름 */
    private String empnm;
    /* 당시부서명 */
    private String ttmDeptNm;
    /* 당시 직급명 */
    private String ttmClsfNm;
    /* 증명서종류코드 */
    private String crtfKindCode;
    /* 증명서종류이름 */
    private String crtfKindCodeNm;
    /* 발급신청일자 */
    private String issuReqstDe;
    /* 발급일자 */
    private String issuDe;
    /* 발금매수 */
    private String issuCnt;
    /* 제증명용도구분:공통코드(MHS245) */
    private String issuUseprpsSeCode;
    /* 제증명용도구분:공통코드(MHS245) */
    private String issuUseprpsSeCodeNm;
    /* 발급용도 내용 */
    private String issuUseprpsCn;
    /* 제출위치 */
    private String submitLc;
    /* 현재 주소 */
    private String nowAdres;
    /* 주민등록번호 마스킹여부 */
    private String ihidnumMaskAt;
    /* 경력포함여부 */
    private String careerInclsAt;
    /* 신청상태코드 */
    private String reqstSttusCode;
    /* 신청상태코드 */
    private String reqstSttusCodeNm;
    /* 출력회수 */
    private String outptCnt;
    /* 출력 허용 매수 : 몇번까지 출력 가능한지 */
    private String outptPermCnt;
    /* 출력 허용 일자 : 언제까지 출력 가능한지 */
    private String outptPermDe;
    /* 전자결재 문서 번호 */
    private String elctsctDocNo;
    /* 전자결재 상태 코드 */
    private String elctsctSttusCode;
    /* 전자결재 상태 */
    private String elctsctSttusCodeNm;
    /* 전자결재 사원번호 */
    private String elctsctEmpno;
    /* 전자결재 사원 */
    private String elctsctEmpnm;
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

    public Mhshrc001() {
        //
    }

    public Mhshrc001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.issuno = StringExpression.nullConvert(egovMap.get("issuno"));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.ttmDeptNm = StringExpression.nullConvert(egovMap.get("ttmDeptNm"));
            this.ttmClsfNm = StringExpression.nullConvert(egovMap.get("ttmClsfNm"));
            this.crtfKindCode = StringExpression.nullConvert(egovMap.get("crtfKindCode"));
            this.issuReqstDe = StringExpression.nullConvert(egovMap.get("issuReqstDe"));
            this.issuDe = StringExpression.nullConvert(egovMap.get("issuDe"));
            this.issuCnt = StringExpression.nullConvert(egovMap.get("issuCnt"));
            this.issuUseprpsSeCode = StringExpression.nullConvert(egovMap.get("issuUseprpsSeCode"));
            this.issuUseprpsCn = StringExpression.nullConvert(egovMap.get("issuUseprpsCn"));
            this.submitLc = StringExpression.nullConvert(egovMap.get("submitLc"));
            this.nowAdres = StringExpression.nullConvert(egovMap.get("nowAdres"));
            this.ihidnumMaskAt = StringExpression.nullConvert(egovMap.get("ihidnumMaskAt"));
            this.careerInclsAt = StringExpression.nullConvert(egovMap.get("careerInclsAt"));
            this.reqstSttusCode = StringExpression.nullConvert(egovMap.get("reqstSttusCode"));
            this.outptCnt = StringExpression.nullConvert(egovMap.get("outptCnt"));
            this.outptPermCnt = StringExpression.nullConvert(egovMap.get("outptPermCnt"));
            this.outptPermDe = StringExpression.nullConvert(egovMap.get("outptPermDe"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mhshrc001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.issuno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issuno")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.ttmDeptNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ttmDeptNm")));
            this.ttmClsfNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ttmClsfNm")));
            this.crtfKindCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crtfKindCode")));
            this.issuReqstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issuReqstDe")));
            this.issuDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issuDe")));
            this.issuCnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issuCnt")));
            this.issuUseprpsSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issuUseprpsSeCode")));
            this.issuUseprpsCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issuUseprpsCn")));
            this.submitLc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_submitLc")));
            this.nowAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nowAdres")));
            this.ihidnumMaskAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ihidnumMaskAt")));
            this.careerInclsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerInclsAt")));
            this.reqstSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstSttusCode")));
            this.outptCnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_outptCnt")));
            this.outptPermCnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_outptPermCnt")));
            this.outptPermDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_outptPermDe")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getIssuno() {
        return issuno;
    }
    public void setIssuno(String issuno) {
        this.issuno = issuno;
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

    public String getTtmDeptNm() {
        return ttmDeptNm;
    }
    public void setTtmDeptNm(String ttmDeptNm) {
        this.ttmDeptNm = ttmDeptNm;
    }

    public String getTtmClsfNm() {
        return ttmClsfNm;
    }
    public void setTtmClsfNm(String ttmClsfNm) {
        this.ttmClsfNm = ttmClsfNm;
    }

    public String getCrtfKindCode() {
        return crtfKindCode;
    }
    public void setCrtfKindCode(String crtfKindCode) {
        this.crtfKindCode = crtfKindCode;
    }

    public String getIssuReqstDe() {
        return issuReqstDe;
    }
    public void setIssuReqstDe(String issuReqstDe) {
        this.issuReqstDe = issuReqstDe;
    }

    public String getIssuDe() {
        return issuDe;
    }
    public void setIssuDe(String issuDe) {
        this.issuDe = issuDe;
    }

    public String getIssuCnt() {
        return issuCnt;
    }
    public void setIssuCnt(String issuCnt) {
        this.issuCnt = issuCnt;
    }

    public String getIssuUseprpsSeCode() {
        return issuUseprpsSeCode;
    }
    public void setIssuUseprpsSeCode(String issuUseprpsSeCode) {
        this.issuUseprpsSeCode = issuUseprpsSeCode;
    }

    public String getIssuUseprpsCn() {
        return issuUseprpsCn;
    }
    public void setIssuUseprpsCn(String issuUseprpsCn) {
        this.issuUseprpsCn = issuUseprpsCn;
    }

    public String getSubmitLc() {
        return submitLc;
    }
    public void setSubmitLc(String submitLc) {
        this.submitLc = submitLc;
    }

    public String getNowAdres() {
        return nowAdres;
    }
    public void setNowAdres(String nowAdres) {
        this.nowAdres = nowAdres;
    }

    public String getIhidnumMaskAt() {
        return ihidnumMaskAt;
    }
    public void setIhidnumMaskAt(String ihidnumMaskAt) {
        this.ihidnumMaskAt = ihidnumMaskAt;
    }

    public String getCareerInclsAt() {
        return careerInclsAt;
    }
    public void setCareerInclsAt(String careerInclsAt) {
        this.careerInclsAt = careerInclsAt;
    }

    public String getReqstSttusCode() {
        return reqstSttusCode;
    }
    public void setReqstSttusCode(String reqstSttusCode) {
        this.reqstSttusCode = reqstSttusCode;
    }

    public String getOutptCnt() {
        return outptCnt;
    }
    public void setOutptCnt(String outptCnt) {
        this.outptCnt = outptCnt;
    }

    public String getOutptPermCnt() {
        return outptPermCnt;
    }
    public void setOutptPermCnt(String outptPermCnt) {
        this.outptPermCnt = outptPermCnt;
    }

    public String getOutptPermDe() {
        return outptPermDe;
    }
    public void setOutptPermDe(String outptPermDe) {
        this.outptPermDe = outptPermDe;
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

    public String getCrtfKindCodeNm() {
        return crtfKindCodeNm;
    }

    public void setCrtfKindCodeNm(String crtfKindCodeNm) {
        this.crtfKindCodeNm = crtfKindCodeNm;
    }

    public String getIssuUseprpsSeCodeNm() {
        return issuUseprpsSeCodeNm;
    }

    public void setIssuUseprpsSeCodeNm(String issuUseprpsSeCodeNm) {
        this.issuUseprpsSeCodeNm = issuUseprpsSeCodeNm;
    }

    public String getReqstSttusCodeNm() {
        return reqstSttusCodeNm;
    }

    public void setReqstSttusCodeNm(String reqstSttusCodeNm) {
        this.reqstSttusCodeNm = reqstSttusCodeNm;
    }

    public String getElctsctSttusCodeNm() {
        return elctsctSttusCodeNm;
    }

    public void setElctsctSttusCodeNm(String elctsctSttusCodeNm) {
        this.elctsctSttusCodeNm = elctsctSttusCodeNm;
    }

    public String getElctsctEmpnm() {
        return elctsctEmpnm;
    }

    public void setElctsctEmpnm(String elctsctEmpnm) {
        this.elctsctEmpnm = elctsctEmpnm;
    }
}
