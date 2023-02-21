package kr.co.dbvision.api.pjt.pmg.pjtpmg003.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 프로젝트관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.01.15
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.15          디비비전              최초 생성
 *
 * </pre>
 */

public class Pjtpmg003 extends CommonVO {

    /* 프로젝트 순번 */
    private String projectSn;
    /* 프로젝트 명 */
    private String projectNm;
    /* 프로젝트 내용 */
    private String projectCn;
    /* 프로젝트 범위 */
    private String projectScope;
    /* 프로젝트 환경 */
    private String projectEnvrn;
    /* 프로젝트 지역 */
    private String projectArea;
    /* 프로젝트 PM 사원번호 */
    private String projectPmEmpno;
    /* 프로젝트 PM 명 */
    private String projectPmNm;
    /* 거래처 코드 */
    private String bcncCode;
    /* 거래처 담당자 코드 */
    private String bcncChargerCode;
    /* 프로젝트 시작 일자 */
    private String projectBeginDe;
    /* 프로젝트 종료 일자 */
    private String projectEndDe;
    /* 실제 시작 일자 */
    private String realBeginDe;
    /* 실제 종료 일자 */
    private String realEndDe;
    /* 계약 금액 */
    private String cntrctAmt;
    /* 부가세 포함 여부 */
    private String vatInclsAt;
    /* 무상 유지보수 월수 */
    private String grtsMntnceMcnt;
    /* 무상 유지보수 내용 */
    private String grtsMntnceCn;
    /* 프로젝트 구분 */
    private String projectSe;
    /* 완료 여부 */
    private String comptAt;
    /* 완료 일자 */
    private String comptDe;
    /* 업체 아이디 */
    private String entrpsId;
    /* 업체 패스워드 */
    private String entrpsPassword;
    /* 계약 유형 */
    private String cntrctTy;
    /* 등록 사원번호 */
    private String registEmpno;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Pjtpmg003() {
        //
    }

    public Pjtpmg003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.projectSn = StringExpression.nullConvert(egovMap.get("projectSn"));
            this.projectNm = StringExpression.nullConvert(egovMap.get("projectNm"));
            this.projectCn = StringExpression.nullConvert(egovMap.get("projectCn"));
            this.projectScope = StringExpression.nullConvert(egovMap.get("projectScope"));
            this.projectEnvrn = StringExpression.nullConvert(egovMap.get("projectEnvrn"));
            this.projectArea = StringExpression.nullConvert(egovMap.get("projectArea"));
            this.projectPmEmpno = StringExpression.nullConvert(egovMap.get("projectPmEmpno"));
            this.projectPmNm = StringExpression.nullConvert(egovMap.get("projectPmNm"));
            this.bcncCode = StringExpression.nullConvert(egovMap.get("bcncCode"));
            this.bcncChargerCode = StringExpression.nullConvert(egovMap.get("bcncChargerCode"));
            this.projectBeginDe = StringExpression.nullConvert(egovMap.get("projectBeginDe"));
            this.projectEndDe = StringExpression.nullConvert(egovMap.get("projectEndDe"));
            this.realBeginDe = StringExpression.nullConvert(egovMap.get("realBeginDe"));
            this.realEndDe = StringExpression.nullConvert(egovMap.get("realEndDe"));
            this.cntrctAmt = StringExpression.nullConvert(egovMap.get("cntrctAmt"));
            this.vatInclsAt = StringExpression.nullConvert(egovMap.get("vatInclsAt"));
            this.grtsMntnceMcnt = StringExpression.nullConvert(egovMap.get("grtsMntnceMcnt"));
            this.grtsMntnceCn = StringExpression.nullConvert(egovMap.get("grtsMntnceCn"));
            this.projectSe = StringExpression.nullConvert(egovMap.get("projectSe"));
            this.comptAt = StringExpression.nullConvert(egovMap.get("comptAt"));
            this.comptDe = StringExpression.nullConvert(egovMap.get("comptDe"));
            this.entrpsId = StringExpression.nullConvert(egovMap.get("entrpsId"));
            this.entrpsPassword = StringExpression.nullConvert(egovMap.get("entrpsPassword"));
            this.cntrctTy = StringExpression.nullConvert(egovMap.get("cntrctTy"));
            this.registEmpno = StringExpression.nullConvert(egovMap.get("registEmpno"));
        }
    }

    public String getProjectSn() {
        return projectSn;
    }
    public void setProjectSn(String projectSn) {
        this.projectSn = projectSn;
    }

    public String getProjectNm() {
        return projectNm;
    }
    public void setProjectNm(String projectNm) {
        this.projectNm = projectNm;
    }

    public String getProjectCn() {
        return projectCn;
    }
    public void setProjectCn(String projectCn) {
        this.projectCn = projectCn;
    }

    public String getProjectScope() {
        return projectScope;
    }
    public void setProjectScope(String projectScope) {
        this.projectScope = projectScope;
    }

    public String getProjectEnvrn() {
        return projectEnvrn;
    }
    public void setProjectEnvrn(String projectEnvrn) {
        this.projectEnvrn = projectEnvrn;
    }

    public String getProjectArea() {
        return projectArea;
    }
    public void setProjectArea(String projectArea) {
        this.projectArea = projectArea;
    }

    public String getProjectPmEmpno() {
        return projectPmEmpno;
    }
    public void setProjectPmEmpno(String projectPmEmpno) {
        this.projectPmEmpno = projectPmEmpno;
    }

    public String getProjectPmNm() {
        return projectPmNm;
    }
    public void setProjectPmNm(String projectPmNm) {
        this.projectPmNm = projectPmNm;
    }

    public String getBcncCode() {
        return bcncCode;
    }
    public void setBcncCode(String bcncCode) {
        this.bcncCode = bcncCode;
    }

    public String getBcncChargerCode() {
        return bcncChargerCode;
    }
    public void setBcncChargerCode(String bcncChargerCode) {
        this.bcncChargerCode = bcncChargerCode;
    }

    public String getProjectBeginDe() {
        return projectBeginDe;
    }
    public void setProjectBeginDe(String projectBeginDe) {
        this.projectBeginDe = projectBeginDe;
    }

    public String getProjectEndDe() {
        return projectEndDe;
    }
    public void setProjectEndDe(String projectEndDe) {
        this.projectEndDe = projectEndDe;
    }

    public String getRealBeginDe() {
        return realBeginDe;
    }
    public void setRealBeginDe(String realBeginDe) {
        this.realBeginDe = realBeginDe;
    }

    public String getRealEndDe() {
        return realEndDe;
    }
    public void setRealEndDe(String realEndDe) {
        this.realEndDe = realEndDe;
    }

    public String getCntrctAmt() {
        return cntrctAmt;
    }
    public void setCntrctAmt(String cntrctAmt) {
        this.cntrctAmt = cntrctAmt;
    }

    public String getVatInclsAt() {
        return vatInclsAt;
    }
    public void setVatInclsAt(String vatInclsAt) {
        this.vatInclsAt = vatInclsAt;
    }

    public String getGrtsMntnceMcnt() {
        return grtsMntnceMcnt;
    }
    public void setGrtsMntnceMcnt(String grtsMntnceMcnt) {
        this.grtsMntnceMcnt = grtsMntnceMcnt;
    }

    public String getGrtsMntnceCn() {
        return grtsMntnceCn;
    }
    public void setGrtsMntnceCn(String grtsMntnceCn) {
        this.grtsMntnceCn = grtsMntnceCn;
    }

    public String getProjectSe() {
        return projectSe;
    }
    public void setProjectSe(String projectSe) {
        this.projectSe = projectSe;
    }

    public String getComptAt() {
        return comptAt;
    }
    public void setComptAt(String comptAt) {
        this.comptAt = comptAt;
    }

    public String getComptDe() {
        return comptDe;
    }
    public void setComptDe(String comptDe) {
        this.comptDe = comptDe;
    }

    public String getEntrpsId() {
        return entrpsId;
    }
    public void setEntrpsId(String entrpsId) {
        this.entrpsId = entrpsId;
    }

    public String getEntrpsPassword() {
        return entrpsPassword;
    }
    public void setEntrpsPassword(String entrpsPassword) {
        this.entrpsPassword = entrpsPassword;
    }

    public String getCntrctTy() {
        return cntrctTy;
    }
    public void setCntrctTy(String cntrctTy) {
        this.cntrctTy = cntrctTy;
    }

    public String getRegistEmpno() {
        return registEmpno;
    }
    public void setRegistEmpno(String registEmpno) {
        this.registEmpno = registEmpno;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
