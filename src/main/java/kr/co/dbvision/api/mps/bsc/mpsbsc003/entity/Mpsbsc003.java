package kr.co.dbvision.api.mps.bsc.mpsbsc003.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 월급여항목적용등록관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.03.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.03          디비비전              최초 생성
 * </pre>
 */

public class Mpsbsc003 extends CommonVO {

    /* 급여유형 코드 */
    private String salarytyCode;
    /* 급여항목 코드 */
    private String salaryitemCode;
    /* 적용 년월 */
    private String applcYm;
    /* 지급 여부 */
    private String pymntAt;
    
    private String salarytyCodeNm;
    
    private String salaryitemNm;
    
	/* 지급구분 */
    private String pymntddcSe;
    
    private String pymntddcSeNm;
    
    /*적용년도    */
    private String applcYy;
    /*기준월 */
    private String pymnt1At;
    private String pymnt2At;
    private String pymnt3At;
    private String pymnt4At;
    private String pymnt5At;
    private String pymnt6At;
    private String pymnt7At;
    private String pymnt8At;
    private String pymnt9At;
    private String pymnt10At;
    private String pymnt11At;
    private String pymnt12At;  
    
    private String nextYy;  
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbsc003() {
        //
    }

    public Mpsbsc003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.salarytyCode = StringExpression.nullConvert(egovMap.get("salarytyCode"));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get("salaryitemCode"));
            this.applcYm = StringExpression.nullConvert(egovMap.get("applcYm"));
            this.pymntAt = StringExpression.nullConvert(egovMap.get("pymntAt"));
            this.applcYy = StringExpression.nullConvert(egovMap.get("applcYy"));
            this.pymntddcSe = StringExpression.nullConvert(egovMap.get("pymntddcSe"));
            this.pymntddcSeNm = StringExpression.nullConvert(egovMap.get("pymntddcSeNm"));
            this.salarytyCodeNm = StringExpression.nullConvert(egovMap.get("salarytyCodeNm"));
            this.salaryitemNm = StringExpression.nullConvert(egovMap.get("salaryitemNm"));

            this.pymnt1At = StringExpression.nullConvert(egovMap.get("pymnt1At"));
            this.pymnt2At = StringExpression.nullConvert(egovMap.get("pymnt2At"));
            this.pymnt3At = StringExpression.nullConvert(egovMap.get("pymnt3At"));
            this.pymnt4At = StringExpression.nullConvert(egovMap.get("pymnt4At"));
            this.pymnt5At = StringExpression.nullConvert(egovMap.get("pymnt5At"));
            this.pymnt6At = StringExpression.nullConvert(egovMap.get("pymnt6At"));
            this.pymnt7At = StringExpression.nullConvert(egovMap.get("pymnt7At"));
            this.pymnt8At = StringExpression.nullConvert(egovMap.get("pymnt8At"));
            this.pymnt9At = StringExpression.nullConvert(egovMap.get("pymnt9At"));
            this.pymnt10At = StringExpression.nullConvert(egovMap.get("pymnt10At"));
            this.pymnt11At = StringExpression.nullConvert(egovMap.get("pymnt11At"));
            this.pymnt12At = StringExpression.nullConvert(egovMap.get("pymnt12At"));

        }
    }

    public Mpsbsc003(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.salarytyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c1")));
            this.salarytyCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.pymntddcSeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            this.salaryitemNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.pymnt1At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.pymnt2At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.pymnt3At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
            this.pymnt4At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
            this.pymnt5At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
            this.pymnt6At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c11")));
            this.pymnt7At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c12")));
            this.pymnt8At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c13")));
            this.pymnt9At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c14")));
            this.pymnt10At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c15")));
            this.pymnt11At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c16")));
            this.pymnt12At = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c17")));
            this.applcYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c18")));
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getSalarytyCode() {
        return salarytyCode;
    }
    public void setSalarytyCode(String salarytyCode) {
        this.salarytyCode = salarytyCode;
    }

    public String getSalaryitemCode() {
        return salaryitemCode;
    }
    public void setSalaryitemCode(String salaryitemCode) {
        this.salaryitemCode = salaryitemCode;
    }

    public String getApplcYm() {
        return applcYm;
    }
    public void setApplcYm(String applcYm) {
        this.applcYm = applcYm;
    }

    public String getPymntAt() {
        return pymntAt;
    }
    public void setPymntAt(String pymntAt) {
        this.pymntAt = pymntAt;
    }
	public String getSalarytyCodeNm() {
		return salarytyCodeNm;
	}

	public void setSalarytyCodeNm(String salarytyCodeNm) {
		this.salarytyCodeNm = salarytyCodeNm;
	}

	public String getSalaryitemNm() {
		return salaryitemNm;
	}

	public void setSalaryitemNm(String salaryitemNm) {
		this.salaryitemNm = salaryitemNm;
	}

	public String getPymntddcSe() {
		return pymntddcSe;
	}

	public void setPymntddcSe(String pymntddcSe) {
		this.pymntddcSe = pymntddcSe;
	}

	public String getPymntddcSeNm() {
		return pymntddcSeNm;
	}

	public void setPymntddcSeNm(String pymntddcSeNm) {
		this.pymntddcSeNm = pymntddcSeNm;
	}

	public String getApplcYy() {
		return applcYy;
	}

	public void setApplcYy(String applcYy) {
		this.applcYy = applcYy;
	}

	public String getPymnt1At() {
		return pymnt1At;
	}

	public void setPymnt1At(String pymnt1At) {
		this.pymnt1At = pymnt1At;
	}

	public String getPymnt2At() {
		return pymnt2At;
	}

	public void setPymnt2At(String pymnt2At) {
		this.pymnt2At = pymnt2At;
	}

	public String getPymnt3At() {
		return pymnt3At;
	}

	public void setPymnt3At(String pymnt3At) {
		this.pymnt3At = pymnt3At;
	}

	public String getPymnt4At() {
		return pymnt4At;
	}

	public void setPymnt4At(String pymnt4At) {
		this.pymnt4At = pymnt4At;
	}

	public String getPymnt5At() {
		return pymnt5At;
	}

	public void setPymnt5At(String pymnt5At) {
		this.pymnt5At = pymnt5At;
	}

	public String getPymnt6At() {
		return pymnt6At;
	}

	public void setPymnt6At(String pymnt6At) {
		this.pymnt6At = pymnt6At;
	}

	public String getPymnt7At() {
		return pymnt7At;
	}

	public void setPymnt7At(String pymnt7At) {
		this.pymnt7At = pymnt7At;
	}

	public String getPymnt8At() {
		return pymnt8At;
	}

	public void setPymnt8At(String pymnt8At) {
		this.pymnt8At = pymnt8At;
	}

	public String getPymnt9At() {
		return pymnt9At;
	}

	public void setPymnt9At(String pymnt9At) {
		this.pymnt9At = pymnt9At;
	}

	public String getPymnt10At() {
		return pymnt10At;
	}

	public void setPymnt10At(String pymnt10At) {
		this.pymnt10At = pymnt10At;
	}

	public String getPymnt11At() {
		return pymnt11At;
	}

	public void setPymnt11At(String pymnt11At) {
		this.pymnt11At = pymnt11At;
	}

	public String getPymnt12At() {
		return pymnt12At;
	}

	public void setPymnt12At(String pymnt12At) {
		this.pymnt12At = pymnt12At;
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

	public String getNextYy() {
		return nextYy;
	}

	public void setNextYy(String nextYy) {
		this.nextYy = nextYy;
	}

	
}
