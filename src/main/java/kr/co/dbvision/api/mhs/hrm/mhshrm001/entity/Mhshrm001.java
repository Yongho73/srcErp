package kr.co.dbvision.api.mhs.hrm.mhshrm001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 사업장관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.05.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.14          디비비전              최초 생성
 *     2020.07.14          김하경                 컬럼 추가
 *
 * </pre>
 */

public class Mhshrm001 extends CommonVO {

    /* 사업장 코드 */
    private String bplcCode;
    /* 법인 코드 */
    private String corpCode;
    /* 사업장 한글 명 */
    private String bplcKorNm;
    /* 사업장 영문 명 */
    private String bplcEngNm;
    /* 사업자등록번호 */
    private String bizrno;
    /* 우편번호 */
    private String zip;
    /* 주소 */
    private String adres;
    /* 상세 주소 */
    private String detailAdres;
    /* 법정동 코드 */
    private String dongCode;
    /* 자본 금액 */
    private String capitalAmt;
    /* 설립 일자 */
    private String fondDe;
    /* 대표 명 */
    private String reprsntNm;
    /* 업종 */
    private String induty;
    /* 업태 */
    private String bizcnd;
    /* 전화번호 */
    private String telno;
    /* 팩스 번호 */
    private String faxNo;
    /* 회계 시작 일자 */
    private String accnutBeginDe;
    /* 의료보험조합 번호 */
    /*private String medunionNo;*/
    /* 의료보험조합 명 */
    /*private String medunionNm;*/
    /* 패스워드 */
    private String htaxPassword;
    /* 세무서 명 */
    private String taxofcNm;
    /* 세무서 코드 */
    private String taxofcCode;
    /* 지방세 관할기관 */
    private String lcltytaxCmptinst;
    /* 홈택스 ID */
    private String htaxId;
    /* 홈택스 계좌 번호 */
    private String htaxAcnutNo;
    /* 홈택스 은행 코드 */
    private String htaxBankCode;
    /* 홈택스 담당자 */
    private String htaxCharger;
    /* 홈택스 이메일 */
    private String htaxEmail;
    /* 홈택스 휴대폰번호 */
    private String htaxMbtlnum;
    /* 총괄 납부 여부 */
    private String smrizePayAt;
    /* 사업자 단위 과세 여부 */
    private String bsnmUnitTaxtAt;
    /* 총괄 납부 번호 */
    private String smrizePayNo;
    /* 과세 구분 */
    private String taxtSe;
    /* 사용 여부 */
    private String useAt;
    /* 결산 월 */
    private String stacntMt;
    /* 사업장 면적 */
    private String bplcArea;
    /* 지방세 관할기관 명 */
    private String lcltytaxCmptinstNm;
    
    /*법인등록번호 */
    private String jurirno;

    /* 홈택스 담당자 */
    private String htaxChargerNm;
    
    /* 사업장 코드(콤보용) */
    private String code;
    /* 사업장 코드 한글명(콤보용) */
    private String codeNm;
    /* 사업장 코드 영문명(콤보용) */
    private String codeEngNm;
    /* 사업장 코드 order */
    private String sortOrder;
    /* 사업장 코드 (콤보용)r */
    private String exceptCode;
    
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrm001() {
        //
    }

    public Mhshrm001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.corpCode = StringExpression.nullConvert(egovMap.get("corpCode"));
            this.bplcKorNm = StringExpression.nullConvert(egovMap.get("bplcKorNm"));
            this.bplcEngNm = StringExpression.nullConvert(egovMap.get("bplcEngNm"));
            this.bizrno = StringExpression.nullConvert(egovMap.get("bizrno"));
            this.zip = StringExpression.nullConvert(egovMap.get("zip"));
            this.adres = StringExpression.nullConvert(egovMap.get("adres"));
            this.detailAdres = StringExpression.nullConvert(egovMap.get("detailAdres"));
            this.dongCode = StringExpression.nullConvert(egovMap.get("dongCode"));
            this.capitalAmt = StringExpression.nullConvert(egovMap.get("capitalAmt"));
            this.fondDe = StringExpression.nullConvert(egovMap.get("fondDe"));
            this.reprsntNm = StringExpression.nullConvert(egovMap.get("reprsntNm"));
            this.induty = StringExpression.nullConvert(egovMap.get("induty"));
            this.bizcnd = StringExpression.nullConvert(egovMap.get("bizcnd"));
            this.telno = StringExpression.nullConvert(egovMap.get("telno"));
            this.faxNo = StringExpression.nullConvert(egovMap.get("faxNo"));
            this.accnutBeginDe = StringExpression.nullConvert(egovMap.get("accnutBeginDe"));
            /*this.medunionNo = StringExpression.nullConvert(egovMap.get("medunionNo"));
            this.medunionNm = StringExpression.nullConvert(egovMap.get("medunionNm"));*/
            this.htaxPassword = StringExpression.nullConvert(egovMap.get("htaxPassword"));
            this.taxofcNm = StringExpression.nullConvert(egovMap.get("taxofcNm"));
            this.taxofcCode = StringExpression.nullConvert(egovMap.get("taxofcCode"));
            this.lcltytaxCmptinst = StringExpression.nullConvert(egovMap.get("lcltytaxCmptinst"));
            this.htaxId = StringExpression.nullConvert(egovMap.get("htaxId"));
            this.htaxAcnutNo = StringExpression.nullConvert(egovMap.get("htaxAcnutNo"));
            this.htaxBankCode = StringExpression.nullConvert(egovMap.get("htaxBankCode"));
            this.htaxCharger = StringExpression.nullConvert(egovMap.get("htaxCharger"));
            this.htaxEmail = StringExpression.nullConvert(egovMap.get("htaxEmail"));
            this.htaxMbtlnum = StringExpression.nullConvert(egovMap.get("htaxMbtlnum"));
            this.smrizePayAt = StringExpression.nullConvert(egovMap.get("smrizePayAt"));
            this.bsnmUnitTaxtAt = StringExpression.nullConvert(egovMap.get("bsnmUnitTaxtAt"));
            this.smrizePayNo = StringExpression.nullConvert(egovMap.get("smrizePayNo"));
            this.taxtSe = StringExpression.nullConvert(egovMap.get("taxtSe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.stacntMt = StringExpression.nullConvert(egovMap.get("stacntMt"));
            this.bplcArea = StringExpression.nullConvert(egovMap.get("bplcArea"));
            this.lcltytaxCmptinstNm = StringExpression.nullConvert(egovMap.get("lcltytaxCmptinstNm"));
            this.jurirno = StringExpression.nullConvert(egovMap.get("jurirno"));
    
            this.code = StringExpression.nullConvert(egovMap.get("code"));
            this.codeNm = StringExpression.nullConvert(egovMap.get("codeNm"));
            this.codeEngNm = StringExpression.nullConvert(egovMap.get("codeEngNm"));
            this.sortOrder = StringExpression.nullConvert(egovMap.get("sortOrder"));
            this.exceptCode = StringExpression.nullConvert(egovMap.get("exceptCode"));
            
            this.htaxChargerNm = StringExpression.nullConvert(egovMap.get("htaxChargerNm"));
            
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }
    
    public Mhshrm001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.bplcKorNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcKorNm")));
            this.bplcEngNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcEngNm")));
            this.bizrno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bizrno")));
            this.jurirno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jurirno")));
            this.zip = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_zip")));
            this.adres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_adres")));
            this.detailAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_detailAdres")));
            this.dongCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dongCode")));
            this.capitalAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_capitalAmt")));
            this.fondDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fondDe")));
            this.reprsntNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reprsntNm")));
            this.induty = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_induty")));
            this.bizcnd = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bizcnd")));
            this.telno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_telno")));
            this.faxNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_faxNo")));
            this.accnutBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_accnutBeginDe")));
            this.taxofcNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxofcNm")));
            this.taxofcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxofcCode")));
            this.htaxBankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_htaxBankCode")));
            this.taxtSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxtSe")));
            this.lcltytaxCmptinst = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lcltytaxCmptinst")));
            this.lcltytaxCmptinstNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lcltytaxCmptinstNm")));
            this.bplcArea = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcArea")));
            this.htaxId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_htaxId")));
            this.htaxPassword = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_htaxPassword")));
            this.htaxAcnutNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_htaxAcnutNo")));
            this.htaxCharger = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_htaxCharger")));
            this.htaxEmail = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_htaxEmail")));
            this.htaxMbtlnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_htaxMbtlnum")));
            this.smrizePayNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_smrizePayNo")));
            this.smrizePayAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_smrizePayAt")));
            this.bsnmUnitTaxtAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsnmUnitTaxtAt")));
            this.stacntMt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stacntMt")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getCorpCode() {
        return corpCode;
    }
    public void setCorpCode(String corpCode) {
        this.corpCode = corpCode;
    }

    public String getBplcKorNm() {
        return bplcKorNm;
    }
    public void setBplcKorNm(String bplcKorNm) {
        this.bplcKorNm = bplcKorNm;
    }

    public String getBplcEngNm() {
        return bplcEngNm;
    }
    public void setBplcEngNm(String bplcEngNm) {
        this.bplcEngNm = bplcEngNm;
    }

    public String getBizrno() {
        return bizrno;
    }
    public void setBizrno(String bizrno) {
        this.bizrno = bizrno;
    }

    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getAdres() {
        return adres;
    }
    public void setAdres(String adres) {
        this.adres = adres;
    }

    public String getDetailAdres() {
        return detailAdres;
    }
    public void setDetailAdres(String detailAdres) {
        this.detailAdres = detailAdres;
    }

    public String getDongCode() {
        return dongCode;
    }
    public void setDongCode(String dongCode) {
        this.dongCode = dongCode;
    }

    public String getCapitalAmt() {
        return capitalAmt;
    }
    public void setCapitalAmt(String capitalAmt) {
        this.capitalAmt = capitalAmt;
    }

    public String getFondDe() {
        return fondDe;
    }
    public void setFondDe(String fondDe) {
        this.fondDe = fondDe;
    }

    public String getReprsntNm() {
        return reprsntNm;
    }
    public void setReprsntNm(String reprsntNm) {
        this.reprsntNm = reprsntNm;
    }

    public String getInduty() {
        return induty;
    }
    public void setInduty(String induty) {
        this.induty = induty;
    }

    public String getBizcnd() {
        return bizcnd;
    }
    public void setBizcnd(String bizcnd) {
        this.bizcnd = bizcnd;
    }

    public String getTelno() {
        return telno;
    }
    public void setTelno(String telno) {
        this.telno = telno;
    }

    public String getFaxNo() {
        return faxNo;
    }
    public void setFaxNo(String faxNo) {
        this.faxNo = faxNo;
    }

    public String getAccnutBeginDe() {
        return accnutBeginDe;
    }
    public void setAccnutBeginDe(String accnutBeginDe) {
        this.accnutBeginDe = accnutBeginDe;
    }
/*
    public String getMedunionNo() {
        return medunionNo;
    }
    public void setMedunionNo(String medunionNo) {
        this.medunionNo = medunionNo;
    }

    public String getMedunionNm() {
        return medunionNm;
    }
    public void setMedunionNm(String medunionNm) {
        this.medunionNm = medunionNm;
    }
*/
    public String getHtaxPassword() {
        return htaxPassword;
    }
    public void setHtaxPassword(String htaxPassword) {
        this.htaxPassword = htaxPassword;
    }

    public String getTaxofcNm() {
        return taxofcNm;
    }
    public void setTaxofcNm(String taxofcNm) {
        this.taxofcNm = taxofcNm;
    }

    public String getTaxofcCode() {
        return taxofcCode;
    }
    public void setTaxofcCode(String taxofcCode) {
        this.taxofcCode = taxofcCode;
    }

    public String getLcltytaxCmptinst() {
        return lcltytaxCmptinst;
    }
    public void setLcltytaxCmptinst(String lcltytaxCmptinst) {
        this.lcltytaxCmptinst = lcltytaxCmptinst;
    }

    public String getHtaxId() {
        return htaxId;
    }
    public void setHtaxId(String htaxId) {
        this.htaxId = htaxId;
    }

    public String getHtaxAcnutNo() {
        return htaxAcnutNo;
    }
    public void setHtaxAcnutNo(String htaxAcnutNo) {
        this.htaxAcnutNo = htaxAcnutNo;
    }

    public String getHtaxBankCode() {
        return htaxBankCode;
    }
    public void setHtaxBankCode(String htaxBankCode) {
        this.htaxBankCode = htaxBankCode;
    }

    public String getHtaxCharger() {
        return htaxCharger;
    }
    public void setHtaxCharger(String htaxCharger) {
        this.htaxCharger = htaxCharger;
    }

    public String getHtaxEmail() {
        return htaxEmail;
    }
    public void setHtaxEmail(String htaxEmail) {
        this.htaxEmail = htaxEmail;
    }

    public String getHtaxMbtlnum() {
        return htaxMbtlnum;
    }
    public void setHtaxMbtlnum(String htaxMbtlnum) {
        this.htaxMbtlnum = htaxMbtlnum;
    }

    public String getSmrizePayAt() {
        return smrizePayAt;
    }
    public void setSmrizePayAt(String smrizePayAt) {
        this.smrizePayAt = smrizePayAt;
    }

    public String getBsnmUnitTaxtAt() {
        return bsnmUnitTaxtAt;
    }
    public void setBsnmUnitTaxtAt(String bsnmUnitTaxtAt) {
        this.bsnmUnitTaxtAt = bsnmUnitTaxtAt;
    }

    public String getSmrizePayNo() {
        return smrizePayNo;
    }
    public void setSmrizePayNo(String smrizePayNo) {
        this.smrizePayNo = smrizePayNo;
    }

    public String getTaxtSe() {
        return taxtSe;
    }
    public void setTaxtSe(String taxtSe) {
        this.taxtSe = taxtSe;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getStacntMt() {
        return stacntMt;
    }
    public void setStacntMt(String stacntMt) {
        this.stacntMt = stacntMt;
    }

    public String getBplcArea() {
        return bplcArea;
    }
    public void setBplcArea(String bplcArea) {
        this.bplcArea = bplcArea;
    }

    public String getLcltytaxCmptinstNm() {
        return lcltytaxCmptinstNm;
    }
    public void setLcltytaxCmptinstNm(String lcltytaxCmptinstNm) {
        this.lcltytaxCmptinstNm = lcltytaxCmptinstNm;
    }
	public String getJurirno() {
		return jurirno;
	}

	public void setJurirno(String jurirno) {
		this.jurirno = jurirno;
	}
	
	public String getHtaxChargerNm() {
		return htaxChargerNm;
	}

	public void setHtaxChargerNm(String htaxChargerNm) {
		this.htaxChargerNm = htaxChargerNm;
	}
		
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
	public String getCodeNm() {
		return codeNm;
	}

	public void setCodeNm(String codeNm) {
		this.codeNm = codeNm;
	}
	
	public String getCodeEngNm() {
		return codeEngNm;
	}

	public void setCodeEngNm(String codeEngNm) {
		this.codeEngNm = codeEngNm;
	}
	
	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}
	
	public String getExceptCode() {
		return exceptCode;
	}

	public void setExceptCode(String exceptCode) {
		this.exceptCode = exceptCode;
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
