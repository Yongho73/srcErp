package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;


/**
 * 인사기본 tab11 - 계좌에 관한 엔티티 클래스
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

public class Mhshrb001_TAB11 extends CommonVO {
	
	/* 사원번호 */
    private String empno;
    /* 계좌순번 */
    private String acnutSn;
    /* 계좌순번 */
    private int acnutSnNew;
    
    /* 계좌구분코드 */
    private String acnutSeCode;
    /* 은행코드 */
    private String bankCode;
    /* 은행명 */
    private String bankNm;
    /* 계좌번호 */
    private String acnutno;
    /* 예금주명 */
    private String dpstrNm;
    /* 시작일자 */
    private String beginDe;
    /* 종료일자 */
    private String endDe;
    /* 통장 첨부파일번호 */
    private String bnkbAtchmnflno;
    /* 통장 첨부파일번호 */
    private String bnkbAtchmnflnoEdit;
    /* 비고 */
    private String rm;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();
	
    public Mhshrb001_TAB11() {
        //
    }
 
    public Mhshrb001_TAB11(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap != null) {
	        if(egovMap.get("acnutSnNew") != null) {
	        	this.acnutSnNew = (int) egovMap.get("acnutSnNew");
	        }
	        else {
	        	this.acnutSnNew = 0;
	        }
	        
	        this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.acnutSn = StringExpression.nullConvert(egovMap.get("acnutSn"));
            this.acnutSeCode = StringExpression.nullConvert(egovMap.get("acnutSeCode"));
            this.bankCode = StringExpression.nullConvert(egovMap.get("bankCode"));
            this.bankNm = StringExpression.nullConvert(egovMap.get("bankNm"));
            this.acnutno = StringExpression.nullConvert(egovMap.get("acnutno"));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get("dpstrNm"));
            this.beginDe = StringExpression.nullConvert(egovMap.get("beginDe"));
            this.endDe = StringExpression.nullConvert(egovMap.get("endDe"));
            this.bnkbAtchmnflno = StringExpression.nullConvert(egovMap.get("bnkbAtchmnflno"));
            this.bnkbAtchmnflnoEdit = StringExpression.nullConvert(egovMap.get("bnkbAtchmnflnoEdit"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
		}
    }

 	public Mhshrb001_TAB11(EgovMapForNull egovMap, String dhxGridrowIds) {
	    super(egovMap);
	    if(egovMap != null) {
	    	this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.acnutSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutSn")));
            this.acnutSnNew = 0;
            this.acnutSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutSeCode")));
            this.bankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bankCode")));
            this.bankNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bankNm")));
            this.acnutno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutno")));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dpstrNm")));
            this.beginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_beginDe")));
            this.endDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_endDe")));
            this.bnkbAtchmnflno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bnkbAtchmnflno")));
            this.bnkbAtchmnflnoEdit = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bnkbAtchmnflnoEdit")));
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

    public String getAcnutSn() {
        return acnutSn;
    }
    public void setAcnutSn(String acnutSn) {
        this.acnutSn = acnutSn;
    }

    public Integer getAcnutSnNew() {
        return acnutSnNew;
    }
    public void setAcnutSnNew(Integer acnutSnNew) {
        this.acnutSnNew = acnutSnNew;
    }

    public String getAcnutSeCode() {
        return acnutSeCode;
    }
    public void setAcnutSeCode(String acnutSeCode) {
        this.acnutSeCode = acnutSeCode;
    }

    public String getBankCode() {
        return bankCode;
    }
    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankNm() {
        return bankNm;
    }
    public void setBankNm(String bankNm) {
        this.bankNm = bankNm;
    }

    public String getAcnutno() {
        return acnutno;
    }
    public void setAcnutno(String acnutno) {
        this.acnutno = acnutno;
    }

    public String getDpstrNm() {
        return dpstrNm;
    }
    public void setDpstrNm(String dpstrNm) {
        this.dpstrNm = dpstrNm;
    }

    public String getBeginDe() {
        return beginDe;
    }
    public void setBeginDe(String beginDe) {
        this.beginDe = beginDe;
    }

    public String getEndDe() {
        return endDe;
    }
    public void setEndDe(String endDe) {
        this.endDe = endDe;
    }

    public String getBnkbAtchmnflno() {
        return bnkbAtchmnflno;
    }
    public void setBnkbAtchmnflno(String bnkbAtchmnflno) {
        this.bnkbAtchmnflno = bnkbAtchmnflno;
    }

    public String getBnkbAtchmnflnoEdit() {
        return bnkbAtchmnflnoEdit;
    }
    public void setBnkbAtchmnflnoEdit(String bnkbAtchmnflnoEdit) {
        this.bnkbAtchmnflnoEdit = bnkbAtchmnflnoEdit;
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
