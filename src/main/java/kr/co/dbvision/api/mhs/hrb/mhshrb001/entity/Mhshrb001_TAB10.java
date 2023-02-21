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

public class Mhshrb001_TAB10 extends CommonVO {
	
	/* 사원번호 */
    private String empno;
    /* 교육과정에 대한 종류를 코드로 기록하기위한 항목 */
    private String educourseCode;
    /* 교육과정명 */
    private String educourseNm;
    /* 교육예정시작일을 기록하는 항목 */
    private String eduBeginPrearngeDe;
    /* 교육예정종료일을 기록하는 항목 */
    private String eduEndPrearngeDe;
    /* 교육시작일을 기록하는 항목 */
    private String eduBeginDe;
    /* 교육종료일을 기록하는 항목 */
    private String eduEndDe;
    /* 강연교육,해외연수의경우 교육연수명 또는 간략한 내용을 기록하는 항목 */
    private String eduNm;
    /* 교육기관 혹은 연수기관명을 기록하는 항목 */
    private String eduInsttNm;
    /* 교육총비용을 기록하는 항목 */
    private String toteduCt;
    /* 교육비중 노동부에서지원받는 금액을 기록하는 항목[현재 교육비의 70%를 지원받는다] */
    private String extrlSbsidyAmt;
    /* 교육비중 노동부에서 지원받는 금액을 제외한 나머지금액을 회사에서 지원하는데 이를 기록하는 항목 */
    private String sportAmt;
    /* 교육근거내역 */
    private String eduBasisDtls;
    /* 국내외 교육을 구분하는 항목. */
    private String dmstcAt;
    /* 영업 및 구매의 지역별 분석 자료에 사용된다. */
    private String nationCode;
    /* 회계전표를 유일하게 식별할 수 있는 번호를 기록하는 항목 */
    private String slipNo;
    /* 전표순 */
    private String slipSn;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();
	
    public Mhshrb001_TAB10() {
        //
    }
 
    public Mhshrb001_TAB10(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap != null) {
			this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.educourseCode = StringExpression.nullConvert(egovMap.get("educourseCode"));
            this.educourseNm = StringExpression.nullConvert(egovMap.get("educourseNm"));
            this.eduBeginPrearngeDe = StringExpression.nullConvert(egovMap.get("eduBeginPrearngeDe"));
            this.eduEndPrearngeDe = StringExpression.nullConvert(egovMap.get("eduEndPrearngeDe"));
            this.eduBeginDe = StringExpression.nullConvert(egovMap.get("eduBeginDe"));
            this.eduEndDe = StringExpression.nullConvert(egovMap.get("eduEndDe"));
            this.eduNm = StringExpression.nullConvert(egovMap.get("eduNm"));
            this.eduInsttNm = StringExpression.nullConvert(egovMap.get("eduInsttNm"));
            this.toteduCt = StringExpression.nullConvert(egovMap.get("toteduCt"));
            this.extrlSbsidyAmt = StringExpression.nullConvert(egovMap.get("extrlSbsidyAmt"));
            this.sportAmt = StringExpression.nullConvert(egovMap.get("sportAmt"));
            this.eduBasisDtls = StringExpression.nullConvert(egovMap.get("eduBasisDtls"));
            this.dmstcAt = StringExpression.nullConvert(egovMap.get("dmstcAt"));
            this.nationCode = StringExpression.nullConvert(egovMap.get("nationCode"));
            this.slipNo = StringExpression.nullConvert(egovMap.get("slipNo"));
            this.slipSn = StringExpression.nullConvert(egovMap.get("slipSn"));
		}
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getEducourseCode() {
        return educourseCode;
    }
    public void setEducourseCode(String educourseCode) {
        this.educourseCode = educourseCode;
    }

    public String getEducourseNm() {
        return educourseNm;
    }
    public void setEducourseNm(String educourseNm) {
        this.educourseNm = educourseNm;
    }

    public String getEduBeginPrearngeDe() {
        return eduBeginPrearngeDe;
    }
    public void setEduBeginPrearngeDe(String eduBeginPrearngeDe) {
        this.eduBeginPrearngeDe = eduBeginPrearngeDe;
    }

    public String getEduEndPrearngeDe() {
        return eduEndPrearngeDe;
    }
    public void setEduEndPrearngeDe(String eduEndPrearngeDe) {
        this.eduEndPrearngeDe = eduEndPrearngeDe;
    }

    public String getEduBeginDe() {
        return eduBeginDe;
    }
    public void setEduBeginDe(String eduBeginDe) {
        this.eduBeginDe = eduBeginDe;
    }

    public String getEduEndDe() {
        return eduEndDe;
    }
    public void setEduEndDe(String eduEndDe) {
        this.eduEndDe = eduEndDe;
    }

    public String getEduNm() {
        return eduNm;
    }
    public void setEduNm(String eduNm) {
        this.eduNm = eduNm;
    }

    public String getEduInsttNm() {
        return eduInsttNm;
    }
    public void setEduInsttNm(String eduInsttNm) {
        this.eduInsttNm = eduInsttNm;
    }

    public String getToteduCt() {
        return toteduCt;
    }
    public void setToteduCt(String toteduCt) {
        this.toteduCt = toteduCt;
    }

    public String getExtrlSbsidyAmt() {
        return extrlSbsidyAmt;
    }
    public void setExtrlSbsidyAmt(String extrlSbsidyAmt) {
        this.extrlSbsidyAmt = extrlSbsidyAmt;
    }

    public String getSportAmt() {
        return sportAmt;
    }
    public void setSportAmt(String sportAmt) {
        this.sportAmt = sportAmt;
    }

    public String getEduBasisDtls() {
        return eduBasisDtls;
    }
    public void setEduBasisDtls(String eduBasisDtls) {
        this.eduBasisDtls = eduBasisDtls;
    }

    public String getDmstcAt() {
        return dmstcAt;
    }
    public void setDmstcAt(String dmstcAt) {
        this.dmstcAt = dmstcAt;
    }

    public String getNationCode() {
        return nationCode;
    }
    public void setNationCode(String nationCode) {
        this.nationCode = nationCode;
    }

    public String getSlipNo() {
        return slipNo;
    }
    public void setSlipNo(String slipNo) {
        this.slipNo = slipNo;
    }

    public String getSlipSn() {
        return slipSn;
    }
    public void setSlipSn(String slipSn) {
        this.slipSn = slipSn;
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
