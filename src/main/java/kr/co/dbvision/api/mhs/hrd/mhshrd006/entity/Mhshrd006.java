package kr.co.dbvision.api.mhs.hrd.mhshrd006.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 휴직신청관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.05.31
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.31          디비비전              최초 생성
 * </pre>
 */

public class Mhshrd006 extends CommonVO {

    /* 사용자 사원번호 */
    private String userNm;
    private String userId;
    /* 복사 FLAG */
    private String copyFlag;
    /* 휴직번호 */
    private String layoffNo;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 사원번호 */
    private String empno;
    private String korNm;
    /* 신청일자 */
    private String reqstDe;
    /* 휴직시작일자 */
    private String layoffBeginDe;
    /* 휴직종료일자 */
    private String layoffEndDe;
    /* 휴직일수 */
    private String layoffDaycnt;
    /* 휴직내역 */
    private String layoffDtls;
    /* 연장휴직번호 */
    private String extnLayoffNo;
    /* 휴직구분코드(C190) */
    private String layoffSeCode;
    private String layoffSeCodeNm;
    /* 근속기간포함여부 */
    private String cnwkpdInclsAt;
    /* 첨부파일번호 */
    private String atchmnflNo;
    /* 전자결재문서번호 */
    private String elctsctDocNo;
    /* 결재상태코드 */
    private String elctsctSttusCode;
    private String elctsctSttusCodeNm;
    /* 전자결재 사원번호 */
    private String elctsctEmpno;
    /* 부서명 */
    private String deptNm;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 등록자 이름 */
    private String uptNm;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrd006() {
        //
    }

    public Mhshrd006(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.userNm = StringExpression.nullConvert(egovMap.get("userNm"));
            this.userId = StringExpression.nullConvert(egovMap.get("userId"));
            
            this.copyFlag = StringExpression.nullConvert(egovMap.get("copyFlag"));
            this.layoffNo = StringExpression.nullConvert(egovMap.get("layoffNo"));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.reqstDe = StringExpression.nullConvert(egovMap.get("reqstDe"));
            this.layoffBeginDe = StringExpression.nullConvert(egovMap.get("layoffBeginDe"));
            this.layoffEndDe = StringExpression.nullConvert(egovMap.get("layoffEndDe"));
            this.layoffDaycnt = StringExpression.nullConvert(egovMap.get("layoffDaycnt"));
            this.layoffDtls = StringExpression.nullConvert(egovMap.get("layoffDtls"));
            this.extnLayoffNo = StringExpression.nullConvert(egovMap.get("extnLayoffNo"));
            this.layoffSeCode = StringExpression.nullConvert(egovMap.get("layoffSeCode"));
            this.layoffSeCodeNm = StringExpression.nullConvert(egovMap.get("layoffSeCodeNm"));
            this.cnwkpdInclsAt = StringExpression.nullConvert(egovMap.get("cnwkpdInclsAt"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get("elctsctSttusCodeNm"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.deptNm = StringExpression.nullConvert(egovMap.get("deptNm"));
            this.korNm = StringExpression.nullConvert(egovMap.get("korNm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.uptNm = StringExpression.nullConvert(egovMap.get("uptNm"));
        }
    }

    public Mhshrd006(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.userNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_userNm")));
            this.userId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_userId")));
            
            this.copyFlag = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_copyFlag")));
            this.layoffNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffNo")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.reqstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstDe")));
            this.layoffBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffBeginDe")));
            this.layoffEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffEndDe")));
            this.layoffDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffDaycnt")));
            this.layoffDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffDtls")));
            this.extnLayoffNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_extnLayoffNo")));
            this.layoffSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffSeCode")));
            this.layoffSeCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffSeCodeNm")));
            this.cnwkpdInclsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkpdInclsAt")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.deptNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptNm")));
            this.korNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_korNm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.uptNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptNm")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getUserNm() {
        return userNm;
    }
    public void setUserNm(String userNm) {
        this.userNm = userNm;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getLayoffNo() {
        return layoffNo;
    }
    public void setLayoffNo(String layoffNo) {
        this.layoffNo = layoffNo;
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

    public String getReqstDe() {
        return reqstDe;
    }
    public void setReqstDe(String reqstDe) {
        this.reqstDe = reqstDe;
    }

    public String getLayoffBeginDe() {
        return layoffBeginDe;
    }
    public void setLayoffBeginDe(String layoffBeginDe) {
        this.layoffBeginDe = layoffBeginDe;
    }

    public String getLayoffEndDe() {
        return layoffEndDe;
    }
    public void setLayoffEndDe(String layoffEndDe) {
        this.layoffEndDe = layoffEndDe;
    }

    public String getLayoffDaycnt() {
        return layoffDaycnt;
    }
    public void setLayoffDaycnt(String layoffDaycnt) {
        this.layoffDaycnt = layoffDaycnt;
    }

    public String getLayoffDtls() {
        return layoffDtls;
    }
    public void setLayoffDtls(String layoffDtls) {
        this.layoffDtls = layoffDtls;
    }

    public String getExtnLayoffNo() {
        return extnLayoffNo;
    }
    public void setExtnLayoffNo(String extnLayoffNo) {
        this.extnLayoffNo = extnLayoffNo;
    }

    public String getLayoffSeCode() {
        return layoffSeCode;
    }
    public void setLayoffSeCode(String layoffSeCode) {
        this.layoffSeCode = layoffSeCode;
    }

    public String getLayoffSeCodeNm() {
        return layoffSeCodeNm;
    }
    public void setLayoffSeCodeNm(String layoffSeCodeNm) {
        this.layoffSeCodeNm = layoffSeCodeNm;
    }

    public String getCnwkpdInclsAt() {
        return cnwkpdInclsAt;
    }
    public void setCnwkpdInclsAt(String cnwkpdInclsAt) {
        this.cnwkpdInclsAt = cnwkpdInclsAt;
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

    public String getElctsctSttusCodeNm() {
        return elctsctSttusCodeNm;
    }
    public void setElctsctSttusCodeNm(String elctsctSttusCodeNm) {
        this.elctsctSttusCodeNm = elctsctSttusCodeNm;
    }

    public String getElctsctEmpno() {
        return elctsctEmpno;
    }
    public void setElctsctEmpno(String elctsctEmpno) {
        this.elctsctEmpno = elctsctEmpno;
    }

    public String getDeptKorNm() {
        return deptNm;
    }
    public void setDeptKorNm(String deptNm) {
        this.deptNm = deptNm;
    }

    public String getKorNm() {
        return korNm;
    }
    public void setKorNm(String korNm) {
        this.korNm = korNm;
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

    public String getUptNm() {
        return uptNm;
    }
    public void setUptNm(String uptNm) {
        this.uptNm = uptNm;
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

    public String getCopyFlag() {
        return copyFlag;
    }

    public void setCopyFlag(String copyFlag) {
        this.copyFlag = copyFlag;
    }
}