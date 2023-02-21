package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;


/**
 * 인사기본 tab12 - 어학(외국어)에 관한 엔티티 클래스
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

public class Mhshrb001_TAB12 extends CommonVO {
	
	/* 사원번호 */
    private String empno;
    /* 외국어순번 */
    private String fgggSn;
    /* 외국어순번 */
    private int fgggSnNew;
    
    /* 외국어구분코드 */
    private String fgggSeCode;
    /* 외국어시험명 */
    private String fgggTestNm;
    /* 외국어점수 */
    private String fgggScore;
    /* 외국어 등급 */
    private String fgggGradCode;
    /* 등급레벨 */
    private String gradLvl;
    /* 시행기관명 */
    private String opertninsttNm;
    /* 발급번호 */
    private String issuNo;
    /* 응시일자 */
    private String apyexmDe;
    /* 취득 일자 */
    private String acqsDe;
    /* 만료 일자 */
    private String endDe;
    /* 증명서 첨부파일 번호 */
    private String docAtchmnflNo;
    /* 증명서 첨부파일 번호 */
    private String docAtchmnflNoEdit;
    /* 비고 */
    private String rm;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();
	
    public Mhshrb001_TAB12() {
        //
    }
 
    public Mhshrb001_TAB12(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap != null) {
	        if(egovMap.get("fgggSnNew") != null) {
	        	this.fgggSnNew = (int) egovMap.get("fgggSnNew");
	        }
	        else {
	        	this.fgggSnNew = 0;
	        }
	        
	        this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.fgggSn = StringExpression.nullConvert(egovMap.get("fgggSn"));
            this.fgggSeCode = StringExpression.nullConvert(egovMap.get("fgggSeCode"));
            this.fgggTestNm = StringExpression.nullConvert(egovMap.get("fgggTestNm"));
            this.fgggScore = StringExpression.nullConvert(egovMap.get("fgggScore"));
            this.fgggGradCode = StringExpression.nullConvert(egovMap.get("fgggGradCode"));
            this.gradLvl = StringExpression.nullConvert(egovMap.get("gradLvl"));
            this.opertninsttNm = StringExpression.nullConvert(egovMap.get("opertninsttNm"));
            this.issuNo = StringExpression.nullConvert(egovMap.get("issuNo"));
            this.apyexmDe = StringExpression.nullConvert(egovMap.get("apyexmDe"));
            this.acqsDe = StringExpression.nullConvert(egovMap.get("acqsDe"));
            this.endDe = StringExpression.nullConvert(egovMap.get("endDe"));
            this.docAtchmnflNo = StringExpression.nullConvert(egovMap.get("docAtchmnflNo"));
            this.docAtchmnflNoEdit = StringExpression.nullConvert(egovMap.get("docAtchmnflNoEdit"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
		}
    }

 	public Mhshrb001_TAB12(EgovMapForNull egovMap, String dhxGridrowIds) {
	    super(egovMap);
	    if(egovMap != null) {
	    	this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.fgggSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fgggSn")));
            this.fgggSnNew = 0;
            this.fgggSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fgggSeCode")));
            this.fgggTestNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fgggTestNm")));
            this.fgggScore = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fgggScore")));
            this.fgggGradCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fgggGradCode")));
            this.gradLvl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_gradLvl")));
            this.opertninsttNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_opertninsttNm")));
            this.issuNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issuNo")));
            this.apyexmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_apyexmDe")));
            this.acqsDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acqsDe")));
            this.endDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_endDe")));
            this.docAtchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_docAtchmnflNo")));
            this.docAtchmnflNoEdit = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_docAtchmnflNoEdit")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
	    }
 	}

 	public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getFgggSn() {
        return fgggSn;
    }
    public void setFgggSn(String fgggSn) {
        this.fgggSn = fgggSn;
    }
    
    public Integer getFgggSnNew() {
        return fgggSnNew;
    }
    public void setFgggSnNew(Integer fgggSnNew) {
        this.fgggSnNew = fgggSnNew;
    }

    public String getFgggSeCode() {
        return fgggSeCode;
    }
    public void setFgggSeCode(String fgggSeCode) {
        this.fgggSeCode = fgggSeCode;
    }

    public String getFgggTestNm() {
        return fgggTestNm;
    }
    public void setFgggTestNm(String fgggTestNm) {
        this.fgggTestNm = fgggTestNm;
    }

    public String getFgggScore() {
        return fgggScore;
    }
    public void setFgggScore(String fgggScore) {
        this.fgggScore = fgggScore;
    }

    public String getFgggGradCode() {
        return fgggGradCode;
    }
    public void setFgggGradCode(String fgggGradCode) {
        this.fgggGradCode = fgggGradCode;
    }

    public String getGradLvl() {
        return gradLvl;
    }
    public void setGradLvl(String gradLvl) {
        this.gradLvl = gradLvl;
    }

    public String getOpertninsttNm() {
        return opertninsttNm;
    }
    public void setOpertninsttNm(String opertninsttNm) {
        this.opertninsttNm = opertninsttNm;
    }

    public String getIssuNo() {
        return issuNo;
    }
    public void setIssuNo(String issuNo) {
        this.issuNo = issuNo;
    }

    public String getApyexmDe() {
        return apyexmDe;
    }
    public void setApyexmDe(String apyexmDe) {
        this.apyexmDe = apyexmDe;
    }

    public String getAcqsDe() {
        return acqsDe;
    }
    public void setAcqsDe(String acqsDe) {
        this.acqsDe = acqsDe;
    }

    public String getEndDe() {
        return endDe;
    }
    public void setEndDe(String endDe) {
        this.endDe = endDe;
    }

    public String getDocAtchmnflNo() {
        return docAtchmnflNo;
    }
    public void setDocAtchmnflNo(String docAtchmnflNo) {
        this.docAtchmnflNo = docAtchmnflNo;
    }

    public String getDocAtchmnflNoEdit() {
        return docAtchmnflNoEdit;
    }
    public void setDocAtchmnflNoEdit(String docAtchmnflNoEdit) {
        this.docAtchmnflNoEdit = docAtchmnflNoEdit;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
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
