package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;


/**
 * 인사기본 tab9 - 자격에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.04.24
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.24          디비비전              최초 생성
 *
 * </pre>
 */

public class Mhshrb001_TAB9 extends CommonVO {
	
	/* 사원번호 */
    private String empno;
    /* 사원별 자격증의 순번을 기록 */
    private String crqfsSn;
    /* 사원별 자격증의 순번을 기록 */
    private int crqfsSnNew;
    
    /* 자격증코드번호 */
    private String crqfsCodeNo;
    /* 자격증명 */
    private String crqfsNm;
   
    /* 면허를 취득한 일자 */
    private String acqsDe;
    /* 유효일자 */
    private String validDe;
    /* 자격증 구분 */
    private String crqfsSe;
    /* 국가공인자격여부 */
    private String nationathriQualfAt;
    /* 면허의 고유 번호 */
    private String crqfsNo;
    /* 발급기관 */
    private String issuInsttNm;
    /* 국내외구분 */
    private String dmstcAt;
    /* 수당지급여부 */
    private String allwncPymntAt;
    /* 자격수당금액 */
    private String qualfAllwncAmt;
    /* 인사평가 반영 여부 */
    private String evlApplyAt;
    /* 인정점수 */
    private String recogScore;
    /* 비고 항목 */
    private String rm;
    /* 첨부파일번호 */
    private String atchmnflno;
    /* 첨부파일번호 */
    private String atchmnflnoEdit;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();
	
    public Mhshrb001_TAB9() {
        //
    }
 
    public Mhshrb001_TAB9(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap != null) {
	        if(egovMap.get("crqfsSnNew") != null) {
	        	this.crqfsSnNew = (int) egovMap.get("crqfsSnNew");
	        }
	        else {
	        	this.crqfsSnNew = 0;
	        }
	        
	        this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.crqfsSn = StringExpression.nullConvert(egovMap.get("crqfsSn"));
            this.crqfsCodeNo = StringExpression.nullConvert(egovMap.get("crqfsCodeNo"));
            this.crqfsNm = StringExpression.nullConvert(egovMap.get("crqfsNm"));
            this.acqsDe = StringExpression.nullConvert(egovMap.get("acqsDe"));
            this.validDe = StringExpression.nullConvert(egovMap.get("validDe"));
            this.crqfsSe = StringExpression.nullConvert(egovMap.get("crqfsSe"));
            this.nationathriQualfAt = StringExpression.nullConvert(egovMap.get("nationathriQualfAt"));
            this.crqfsNo = StringExpression.nullConvert(egovMap.get("crqfsNo"));
            this.issuInsttNm = StringExpression.nullConvert(egovMap.get("issuInsttNm"));
            this.dmstcAt = StringExpression.nullConvert(egovMap.get("dmstcAt"));
            this.allwncPymntAt = StringExpression.nullConvert(egovMap.get("allwncPymntAt"));
            this.qualfAllwncAmt = StringExpression.nullConvert(egovMap.get("qualfAllwncAmt"));
            this.evlApplyAt = StringExpression.nullConvert(egovMap.get("evlApplyAt"));
            this.recogScore = StringExpression.nullConvert(egovMap.get("recogScore"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.atchmnflno = StringExpression.nullConvert(egovMap.get("atchmnflno"));
            this.atchmnflnoEdit = StringExpression.nullConvert(egovMap.get("atchmnflnoEdit"));
		}
    }

 	public Mhshrb001_TAB9(EgovMapForNull egovMap, String dhxGridrowIds) {
	    super(egovMap);
	    if(egovMap != null) {
	    	this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.crqfsSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsSn")));
            this.crqfsSnNew = 0;
            this.crqfsCodeNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsCodeNo")));
            this.crqfsNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsNm")));
            this.acqsDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acqsDe")));
            this.validDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_validDe")));
            this.crqfsSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsSe")));
            this.nationathriQualfAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nationathriQualfAt")));
            this.crqfsNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsNo")));
            this.issuInsttNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issuInsttNm")));
            this.dmstcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dmstcAt")));
            this.allwncPymntAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_allwncPymntAt")));
            this.qualfAllwncAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qualfAllwncAmt")));
            this.evlApplyAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_evlApplyAt")));
            this.recogScore = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_recogScore")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.atchmnflno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflno")));
            this.atchmnflnoEdit = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflnoEdit")));
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
	    }
 	}

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getCrqfsSn() {
        return crqfsSn;
    }
    public void setCrqfsSn(String crqfsSn) {
        this.crqfsSn = crqfsSn;
    }

    public Integer getCrqfsSnNew() {
        return crqfsSnNew;
    }
    public void setCrqfsSnNew(Integer crqfsSnNew) {
        this.crqfsSnNew = crqfsSnNew;
    }

    public String getCrqfsCodeNo() {
        return crqfsCodeNo;
    }
    public void setCrqfsCodeNo(String crqfsCodeNo) {
        this.crqfsCodeNo = crqfsCodeNo;
    }

    public String getCrqfsNm() {
        return crqfsNm;
    }
    public void setCrqfsNm(String crqfsNm) {
        this.crqfsNm = crqfsNm;
    }

    public String getAcqsDe() {
        return acqsDe;
    }
    public void setAcqsDe(String acqsDe) {
        this.acqsDe = acqsDe;
    }

    public String getValidDe() {
        return validDe;
    }
    public void setValidDe(String validDe) {
        this.validDe = validDe;
    }

    public String getCrqfsSe() {
        return crqfsSe;
    }
    public void setCrqfsSe(String crqfsSe) {
        this.crqfsSe = crqfsSe;
    }

    public String getNationathriQualfAt() {
        return nationathriQualfAt;
    }
    public void setNationathriQualfAt(String nationathriQualfAt) {
        this.nationathriQualfAt = nationathriQualfAt;
    }

    public String getCrqfsNo() {
        return crqfsNo;
    }
    public void setCrqfsNo(String crqfsNo) {
        this.crqfsNo = crqfsNo;
    }

    public String getIssuInsttNm() {
        return issuInsttNm;
    }
    public void setIssuInsttNm(String issuInsttNm) {
        this.issuInsttNm = issuInsttNm;
    }

    public String getDmstcAt() {
        return dmstcAt;
    }
    public void setDmstcAt(String dmstcAt) {
        this.dmstcAt = dmstcAt;
    }

    public String getAllwncPymntAt() {
        return allwncPymntAt;
    }
    public void setAllwncPymntAt(String allwncPymntAt) {
        this.allwncPymntAt = allwncPymntAt;
    }

    public String getQualfAllwncAmt() {
        return qualfAllwncAmt;
    }
    public void setQualfAllwncAmt(String qualfAllwncAmt) {
        this.qualfAllwncAmt = qualfAllwncAmt;
    }

    public String getEvlApplyAt() {
        return evlApplyAt;
    }
    public void setEvlApplyAt(String evlApplyAt) {
        this.evlApplyAt = evlApplyAt;
    }

    public String getRecogScore() {
        return recogScore;
    }
    public void setRecogScore(String recogScore) {
        this.recogScore = recogScore;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
    }

    public String getAtchmnflno() {
        return atchmnflno;
    }
    public void setAtchmnflno(String atchmnflno) {
        this.atchmnflno = atchmnflno;
    }

    public String getAtchmnflnoEdit() {
        return atchmnflnoEdit;
    }
    public void setAtchmnflnoEdit(String atchmnflnoEdit) {
        this.atchmnflnoEdit = atchmnflnoEdit;
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
