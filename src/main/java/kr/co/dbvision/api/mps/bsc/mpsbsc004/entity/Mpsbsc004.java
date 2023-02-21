package kr.co.dbvision.api.mps.bsc.mpsbsc004.entity;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 금액기준등록관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.03.05
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.05          디비비전              최초 생성
 * </pre>
 */

public class Mpsbsc004 extends CommonVO {

    /* 급여유형코드(급여/상여/특별성과) */
    private String salarytyCode;
    /* 급여항목 코드 */
    private String salaryitemCode;
    /* 적용 기준 순번 */
    private String applcStdrSn;
    /* 적용 기준 구분 */
    private String applcStdrSe;
    /* 계산 순서 */
    private String calcOrdr;
     
    private String salarytyCodeNm;
    
    private String pymntddcSeNm;
    
    private String salaryitemCodeNm;
    
    private String useAt;
    
    private String salaryitemNm;
    
    /*적용기준 */
    private String applcStdrSeNm;
    
    private String calcSe;
    
    private String calcSeNm;
    
    private String calcNomfrmDtls;
    
    private String calcNomfrmDc;
    
    
    private String calcNomfrm;
    
    private String disOrder;
    
    private String emplSeCode;
    
    private String emplSeCodeNm;
    
    private String calcStdrSn;
    
    private String applcCode;
    
    private String applyNm;
    
    private String applcSe;
    
    private String cnwkPdBeginYcnt;    
    private String cnwkPdBeginSeCode;
    private String cnwkPdEndYcnt;
    private String cnwkPdEndSeCode;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbsc004() {
        //
    }

    public Mpsbsc004(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.salarytyCode = StringExpression.nullConvert(egovMap.get("salarytyCode"));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get("salaryitemCode"));
            this.salarytyCodeNm = StringExpression.nullConvert(egovMap.get("salarytyCodeNm"));
            this.pymntddcSeNm = StringExpression.nullConvert(egovMap.get("pymntddcSeNm"));
            this.salaryitemCodeNm = StringExpression.nullConvert(egovMap.get("salaryitemCodeNm"));
            this.salaryitemNm = StringExpression.nullConvert(egovMap.get("salaryitemNm"));
            this.applcStdrSn = StringExpression.nullConvert(egovMap.get("applcStdrSn"));
            this.applcStdrSe = StringExpression.nullConvert(egovMap.get("applcStdrSe"));
            this.applcStdrSeNm = StringExpression.nullConvert(egovMap.get("applcStdrSeNm"));
            this.calcOrdr = StringExpression.nullConvert(egovMap.get("calcOrdr"));
            this.calcSe = StringExpression.nullConvert(egovMap.get("calcSe"));
            this.calcSeNm = StringExpression.nullConvert(egovMap.get("calcSeNm"));
            this.calcNomfrmDtls = StringExpression.nullConvert(egovMap.get("calcNomfrmDtls"));
            this.calcNomfrmDc = StringExpression.nullConvert(egovMap.get("calcNomfrmDc"));
            this.calcNomfrm = StringExpression.nullConvert(egovMap.get("calcNomfrm"));
            this.disOrder = StringExpression.nullConvert(egovMap.get("disOrder"));
            this.emplSeCode = StringExpression.nullConvert(egovMap.get("emplSeCode"));
            this.emplSeCodeNm = StringExpression.nullConvert(egovMap.get("emplSeCodeNm"));
            this.calcStdrSn = StringExpression.nullConvert(egovMap.get("calcStdrSn"));
            this.applcCode = StringExpression.nullConvert(egovMap.get("applcCode"));
            this.applyNm = StringExpression.nullConvert(egovMap.get("applyNm"));
            this.applcSe = StringExpression.nullConvert(egovMap.get("applcSe"));
            this.cnwkPdBeginYcnt = StringExpression.nullConvert(egovMap.get("cnwkPdBeginYcnt"));
            this.cnwkPdBeginSeCode = StringExpression.nullConvert(egovMap.get("cnwkPdBeginSeCode"));
            this.cnwkPdEndYcnt = StringExpression.nullConvert(egovMap.get("cnwkPdEndYcnt"));
            this.cnwkPdEndSeCode = StringExpression.nullConvert(egovMap.get("cnwkPdEndSeCode"));            
        }
    }

    public Mpsbsc004(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.salarytyCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarytyCodeNm")));
            this.salaryitemNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemNm")));
            this.pymntddcSeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntddcSeNm")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.salarytyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarytyCode")));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemCode")));
            this.applcStdrSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcStdrSn")));
            this.emplSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_emplSeCode")));
            this.applcStdrSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcStdrSe")));
            this.applcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcCode")));
            this.calcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcSe")));
            this.applcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcSe")));
            this.calcOrdr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcOrdr")));
            this.calcNomfrmDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcNomfrmDtls")));
            this.calcNomfrm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcNomfrm")));
            this.calcStdrSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcStdrSn")));
            this.cnwkPdBeginYcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkPdBeginYcnt")));
            this.cnwkPdBeginSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkPdBeginSeCode")));
            this.cnwkPdEndYcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkPdEndYcnt")));
            this.cnwkPdEndSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkPdEndSeCode")));                        
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

    public String getApplcStdrSn() {
        return applcStdrSn;
    }
    public void setApplcStdrSn(String applcStdrSn) {
        this.applcStdrSn = applcStdrSn;
    }

    public String getApplcStdrSe() {
        return applcStdrSe;
    }
    public void setApplcStdrSe(String applcStdrSe) {
        this.applcStdrSe = applcStdrSe;
    }

    public String getCalcOrdr() {
        return calcOrdr;
    }
    public void setCalcOrdr(String calcOrdr) {
        this.calcOrdr = calcOrdr;
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

	public String getSalarytyCodeNm() {
		return salarytyCodeNm;
	}

	public void setSalarytyCodeNm(String salarytyCodeNm) {
		this.salarytyCodeNm = salarytyCodeNm;
	}

	public String getPymntddcSeNm() {
		return pymntddcSeNm;
	}

	public void setPymntddcSeNm(String pymntddcSeNm) {
		this.pymntddcSeNm = pymntddcSeNm;
	}

	public String getSalaryitemCodeNm() {
		return salaryitemCodeNm;
	}

	public void setSalaryitemCodeNm(String salaryitemCodeNm) {
		this.salaryitemCodeNm = salaryitemCodeNm;
	}

	public String getUseAt() {
		return useAt;
	}

	public void setUseAt(String useAt) {
		this.useAt = useAt;
	}

	public String getSalaryitemNm() {
		return salaryitemNm;
	}

	public void setSalaryitemNm(String salaryitemNm) {
		this.salaryitemNm = salaryitemNm;
	}

	public String getApplcStdrSeNm() {
		return applcStdrSeNm;
	}

	public void setApplcStdrSeNm(String applcStdrSeNm) {
		this.applcStdrSeNm = applcStdrSeNm;
	}

	public String getCalcSe() {
		return calcSe;
	}

	public void setCalcSe(String calcSe) {
		this.calcSe = calcSe;
	}

	public String getCalcSeNm() {
		return calcSeNm;
	}

	public void setCalcSeNm(String calcSeNm) {
		this.calcSeNm = calcSeNm;
	}

	public String getCalcNomfrmDtls() {
		return calcNomfrmDtls;
	}

	public void setCalcNomfrmDtls(String calcNomfrmDtls) {
		this.calcNomfrmDtls = calcNomfrmDtls;
	}

	public String getDisOrder() {
		return disOrder;
	}

	public void setDisOrder(String disOrder) {
		this.disOrder = disOrder;
	}

	public String getCalcNomfrmDc() {
		return calcNomfrmDc;
	}

	public void setCalcNomfrmDc(String calcNomfrmDc) {
		this.calcNomfrmDc = calcNomfrmDc;
	}

	public String getEmplSeCode() {
		return emplSeCode;
	}

	public void setEmplSeCode(String emplSeCode) {
		this.emplSeCode = emplSeCode;
	}

	public String getEmplSeCodeNm() {
		return emplSeCodeNm;
	}

	public void setEmplSeCodeNm(String emplSeCodeNm) {
		this.emplSeCodeNm = emplSeCodeNm;
	}

    public String getCalcStdrSn() {
        return calcStdrSn;
    }

    public void setCalcStdrSn(String calcStdrSn) {
        this.calcStdrSn = calcStdrSn;
    }
  
    @Override
    public String toString(){
       return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

    public String getApplcCode() {
        return applcCode;
    }

    public void setApplcCode(String applcCode) {
        this.applcCode = applcCode;
    }

    public String getApplyNm() {
        return applyNm;
    }

    public void setApplyNm(String applyNm) {
        this.applyNm = applyNm;
    }

    public String getApplcSe() {
        return applcSe;
    }

    public void setApplcSe(String applcSe) {
        this.applcSe = applcSe;
    }

    public String getCnwkPdBeginYcnt() {
        return cnwkPdBeginYcnt;
    }

    public void setCnwkPdBeginYcnt(String cnwkPdBeginYcnt) {
        this.cnwkPdBeginYcnt = cnwkPdBeginYcnt;
    }

    public String getCnwkPdBeginSeCode() {
        return cnwkPdBeginSeCode;
    }

    public void setCnwkPdBeginSeCode(String cnwkPdBeginSeCode) {
        this.cnwkPdBeginSeCode = cnwkPdBeginSeCode;
    }

    public String getCnwkPdEndYcnt() {
        return cnwkPdEndYcnt;
    }

    public void setCnwkPdEndYcnt(String cnwkPdEndYcnt) {
        this.cnwkPdEndYcnt = cnwkPdEndYcnt;
    }

    public String getCnwkPdEndSeCode() {
        return cnwkPdEndSeCode;
    }

    public void setCnwkPdEndSeCode(String cnwkPdEndSeCode) {
        this.cnwkPdEndSeCode = cnwkPdEndSeCode;
    }

    public String getCalcNomfrm() {
        return calcNomfrm;
    }

    public void setCalcNomfrm(String calcNomfrm) {
        this.calcNomfrm = calcNomfrm;
    }
    
}
