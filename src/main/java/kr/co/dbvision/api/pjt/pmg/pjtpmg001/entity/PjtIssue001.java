package kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 테스트관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.02.27
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.27          디비비전              최초 생성
 * </pre>
 */

public class PjtIssue001 extends CommonVO {

    /* 이슈 순번 */
    private String issueSn;
    /* 프로젝트 순번 */
    private String projectSn;
    /* 이슈 구분 */
    private String issueSe;
    /* 발생 일자 */
    private String occrrncDe;
    /* 이슈 명 */
    private String issueNm;
    /* 이슈 내용 */
    private String issueCn;
    /* 해결 대안 */
    private String solutAltrv;
    /* 완료 내용 */
    private String comptCn;
    /* 완료 일자 */
    private String comptDe;
    /* 이슈 관리자 */
    private String issueMngr;
    /* 첨부파일 순번 */
    private String atchmnflSn;
    /* 완료 여부 */
    private String comptAt;
    /* 첨부파일 */
    private String atchmnfl;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public PjtIssue001() {
        //
    }

    public PjtIssue001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.issueSn = StringExpression.nullConvert(egovMap.get("issueSn"));
            this.projectSn = StringExpression.nullConvert(egovMap.get("projectSn"));
            this.issueSe = StringExpression.nullConvert(egovMap.get("issueSe"));
            this.occrrncDe = StringExpression.nullConvert(egovMap.get("occrrncDe"));
            this.issueNm = StringExpression.nullConvert(egovMap.get("issueNm"));
            this.issueCn = StringExpression.nullConvert(egovMap.get("issueCn"));
            this.solutAltrv = StringExpression.nullConvert(egovMap.get("solutAltrv"));
            this.comptCn = StringExpression.nullConvert(egovMap.get("comptCn"));
            this.comptDe = StringExpression.nullConvert(egovMap.get("comptDe"));
            this.issueMngr = StringExpression.nullConvert(egovMap.get("issueMngr"));
            this.atchmnflSn = StringExpression.nullConvert(egovMap.get("atchmnflSn"));
            this.comptAt = StringExpression.nullConvert(egovMap.get("comptAt"));
            this.atchmnfl = StringExpression.nullConvert(egovMap.get("atchmnfl"));
        }
    }

    public PjtIssue001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.issueSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.projectSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.issueSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            this.occrrncDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.issueNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.issueCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.solutAltrv = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
            this.comptCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
            this.comptDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
            this.issueMngr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c11")));
            this.atchmnflSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c12")));
            this.comptAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c13")));
            this.atchmnfl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c14")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getIssueSn() {
        return issueSn;
    }
    public void setIssueSn(String issueSn) {
        this.issueSn = issueSn;
    }

    public String getProjectSn() {
        return projectSn;
    }
    public void setProjectSn(String projectSn) {
        this.projectSn = projectSn;
    }

    public String getIssueSe() {
        return issueSe;
    }
    public void setIssueSe(String issueSe) {
        this.issueSe = issueSe;
    }

    public String getOccrrncDe() {
        return occrrncDe;
    }
    public void setOccrrncDe(String occrrncDe) {
        this.occrrncDe = occrrncDe;
    }

    public String getIssueNm() {
        return issueNm;
    }
    public void setIssueNm(String issueNm) {
        this.issueNm = issueNm;
    }

    public String getIssueCn() {
        return issueCn;
    }
    public void setIssueCn(String issueCn) {
        this.issueCn = issueCn;
    }

    public String getSolutAltrv() {
        return solutAltrv;
    }
    public void setSolutAltrv(String solutAltrv) {
        this.solutAltrv = solutAltrv;
    }

    public String getComptCn() {
        return comptCn;
    }
    public void setComptCn(String comptCn) {
        this.comptCn = comptCn;
    }

    public String getComptDe() {
        return comptDe;
    }
    public void setComptDe(String comptDe) {
        this.comptDe = comptDe;
    }

    public String getIssueMngr() {
        return issueMngr;
    }
    public void setIssueMngr(String issueMngr) {
        this.issueMngr = issueMngr;
    }

    public String getAtchmnflSn() {
        return atchmnflSn;
    }
    public void setAtchmnflSn(String atchmnflSn) {
        this.atchmnflSn = atchmnflSn;
    }

    public String getComptAt() {
        return comptAt;
    }
    public void setComptAt(String comptAt) {
        this.comptAt = comptAt;
    }

    public String getAtchmnfl() {
        return atchmnfl;
    }
    public void setAtchmnfl(String atchmnfl) {
        this.atchmnfl = atchmnfl;
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
