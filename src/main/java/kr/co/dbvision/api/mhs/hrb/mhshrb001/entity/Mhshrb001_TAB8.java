package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;


/**
 * 인사기본 tab8 - 경력에 관한 엔티티 클래스
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

public class Mhshrb001_TAB8 extends CommonVO {
	
	/* 사원번호 */
    private String empno;
    /* 해당 사원의 경력의 순번 */
    private String careerSn;
    /* 해당 사원의 경력의 순번 */
    private int careerSnNew;
    
    /* 경력시작일자 */
    private String careerBeginDe;
    /* 다른 회사에서 근무한 기간의 종료일 */
    private String careerEndDe;
    /* 전 경력의 직장 명칭 */
    private String wrcNm;
    /* 부서명 */
    private String careerDeptNm;
    /* 경력직위명 */
    private String careerOfcpsNm;
    /* 경력담당업무 */
    private String careerJobDtls;
    /* 경력사원구분 */
    private String careerEmplSe;
    /* 퇴직사유 */
    private String retireDtls;
    /* 경력구분 */
    private String careerSe;
    /* 경력인정여부 */
    private String careerRecogAt;
    /* 경력 인정비율 */
    private String recogRt;
    /* 경력인정월수 */
    private String recogMcnt;
    /* 비고 */
    private String rm;
    /* 첨부파일번호 */
    private String atchmnflno;
    /* 첨부파일번호 */
    private String atchmnflnoEdit;
    
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();
	
    public Mhshrb001_TAB8() {
        //
    }
 
    public Mhshrb001_TAB8(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap != null) {
	        if(egovMap.get("careerSnNew") != null) {
	        	this.careerSnNew = (int) egovMap.get("careerSnNew");
	        }
	        else {
	        	this.careerSnNew = 0;
	        }
	        
	        this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.careerSn = StringExpression.nullConvert(egovMap.get("careerSn"));
            this.careerBeginDe = StringExpression.nullConvert(egovMap.get("careerBeginDe"));
            this.careerEndDe = StringExpression.nullConvert(egovMap.get("careerEndDe"));
            this.wrcNm = StringExpression.nullConvert(egovMap.get("wrcNm"));
            this.careerDeptNm = StringExpression.nullConvert(egovMap.get("careerDeptNm"));
            this.careerOfcpsNm = StringExpression.nullConvert(egovMap.get("careerOfcpsNm"));
            this.careerJobDtls = StringExpression.nullConvert(egovMap.get("careerJobDtls"));
            this.careerEmplSe = StringExpression.nullConvert(egovMap.get("careerEmplSe"));
            this.retireDtls = StringExpression.nullConvert(egovMap.get("retireDtls"));
            this.careerSe = StringExpression.nullConvert(egovMap.get("careerSe"));
            this.careerRecogAt = StringExpression.nullConvert(egovMap.get("careerRecogAt"));
            this.recogRt = StringExpression.nullConvert(egovMap.get("recogRt"));
            this.recogMcnt = StringExpression.nullConvert(egovMap.get("recogMcnt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.atchmnflno = StringExpression.nullConvert(egovMap.get("atchmnflno"));
            this.atchmnflnoEdit = StringExpression.nullConvert(egovMap.get("atchmnflnoEdit"));
		}
    }

 	public Mhshrb001_TAB8(EgovMapForNull egovMap, String dhxGridrowIds) {
	    super(egovMap);
	    if(egovMap != null) {
	    	this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.careerSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerSn")));
            this.careerSnNew = 0;            
            this.careerBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerBeginDe")));
            this.careerEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerEndDe")));
            this.wrcNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrcNm")));
            this.careerDeptNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerDeptNm")));
            this.careerOfcpsNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerOfcpsNm")));
            this.careerJobDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerJobDtls")));
            this.careerEmplSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerEmplSe")));
            this.retireDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retireDtls")));
            this.careerSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerSe")));
            this.careerRecogAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerRecogAt")));
            this.recogRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_recogRt")));
            this.recogMcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_recogMcnt")));
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

    public String getCareerSn() {
        return careerSn;
    }
    public void setCareerSn(String careerSn) {
        this.careerSn = careerSn;
    }

    public Integer getCareerSnNew() {
        return careerSnNew;
    }
    public void setCareerSnNew(Integer careerSnNew) {
        this.careerSnNew = careerSnNew;
    }

    public String getCareerBeginDe() {
        return careerBeginDe;
    }
    public void setCareerBeginDe(String careerBeginDe) {
        this.careerBeginDe = careerBeginDe;
    }

    public String getCareerEndDe() {
        return careerEndDe;
    }
    public void setCareerEndDe(String careerEndDe) {
        this.careerEndDe = careerEndDe;
    }

    public String getWrcNm() {
        return wrcNm;
    }
    public void setWrcNm(String wrcNm) {
        this.wrcNm = wrcNm;
    }

    public String getCareerDeptNm() {
        return careerDeptNm;
    }
    public void setCareerDeptNm(String careerDeptNm) {
        this.careerDeptNm = careerDeptNm;
    }

    public String getCareerOfcpsNm() {
        return careerOfcpsNm;
    }
    public void setCareerOfcpsNm(String careerOfcpsNm) {
        this.careerOfcpsNm = careerOfcpsNm;
    }

    public String getCareerJobDtls() {
        return careerJobDtls;
    }
    public void setCareerJobDtls(String careerJobDtls) {
        this.careerJobDtls = careerJobDtls;
    }

    public String getCareerEmplSe() {
        return careerEmplSe;
    }
    public void setCareerEmplSe(String careerEmplSe) {
        this.careerEmplSe = careerEmplSe;
    }

    public String getRetireDtls() {
        return retireDtls;
    }
    public void setRetireDtls(String retireDtls) {
        this.retireDtls = retireDtls;
    }

    public String getCareerSe() {
        return careerSe;
    }
    public void setCareerSe(String careerSe) {
        this.careerSe = careerSe;
    }

    public String getCareerRecogAt() {
        return careerRecogAt;
    }
    public void setCareerRecogAt(String careerRecogAt) {
        this.careerRecogAt = careerRecogAt;
    }

    public String getRecogRt() {
        return recogRt;
    }
    public void setRecogRt(String recogRt) {
        this.recogRt = recogRt;
    }

    public String getRecogMcnt() {
        return recogMcnt;
    }
    public void setRecogMcnt(String recogMcnt) {
        this.recogMcnt = recogMcnt;
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
