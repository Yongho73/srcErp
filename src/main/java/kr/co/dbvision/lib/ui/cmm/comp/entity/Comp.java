package kr.co.dbvision.lib.ui.cmm.comp.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

public class Comp extends CommonVO {

	/* 번호 */
    private int num;
	private String bcncCode;
	private String bplcCode;
	private String bplcNm;
	private String bizrno;
	private String bcncNm;
	private String bcncSe;
	private String cprSe;
	private String induty;
	private String bizcnd;
	private String ceoNm;
	private String nltyCode;
	private String areaNm;
	private String postCode;
	private String adres;
	private String addr2;
	private String telno;
	private String faxNo;
	private String bankCode;
	private String bankNm;
	private String acnutNo;
	private String dpstrNm;
	private String homepage;
	private String purchsAt;
	private String saleofficAt;
	private String bcncscaleSe;
	private String taxtSe;
	private String bcncCn;
	private String fondDe;
	private String capitalAmt;
	private String yySaleAmt;
	private String emplCo;
	private String tradeNo;
	private String crncyCode;
	private String useAt;
	private String dsrprAt;
	private String womanAt;
	private String foreignAt;
	private String serhandicapAt;
	private String socialentrprsAt;
	private String dspsnStdAt;
	private String greenAt;
	private String technologyAt;
	private String reprsntNm;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();


	public Comp() {
		//
	}
	
	public Comp(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap.get("num") != null) {
        	this.num = (int) egovMap.get("num");
        }
        else {
        	this.num = 1;
        }
		this.bcncCode = StringExpression.nullConvert(egovMap.get("bcncCode"));
		this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
		this.bplcNm = StringExpression.nullConvert(egovMap.get("bplcNm"));
		this.bizrno = StringExpression.nullConvert(egovMap.get("bizrno"));
		this.bcncNm = StringExpression.nullConvert(egovMap.get("bcncNm"));
		this.bcncSe = StringExpression.nullConvert(egovMap.get("bcncSe"));
		this.cprSe = StringExpression.nullConvert(egovMap.get("cprSe"));
		this.induty = StringExpression.nullConvert(egovMap.get("induty"));
		this.bizcnd = StringExpression.nullConvert(egovMap.get("bizcnd"));
		this.ceoNm = StringExpression.nullConvert(egovMap.get("ceoNm"));
		this.nltyCode = StringExpression.nullConvert(egovMap.get("nltyCode"));
		this.areaNm = StringExpression.nullConvert(egovMap.get("areaNm"));
		this.postCode = StringExpression.nullConvert(egovMap.get("postCode"));
		this.adres = StringExpression.nullConvert(egovMap.get("adres"));
		this.addr2 = StringExpression.nullConvert(egovMap.get("addr2"));
		this.telno = StringExpression.nullConvert(egovMap.get("telno"));
		this.faxNo = StringExpression.nullConvert(egovMap.get("faxNo"));
		this.bankCode = StringExpression.nullConvert(egovMap.get("bankCode"));
		this.acnutNo = StringExpression.nullConvert(egovMap.get("acnutNo"));
		this.dpstrNm = StringExpression.nullConvert(egovMap.get("dpstrNm"));
		this.homepage = StringExpression.nullConvert(egovMap.get("homepage"));
		this.purchsAt = StringExpression.nullConvert(egovMap.get("purchsAt"));
		this.saleofficAt = StringExpression.nullConvert(egovMap.get("saleofficAt"));
		this.bcncscaleSe = StringExpression.nullConvert(egovMap.get("bcncscaleSe"));
		this.taxtSe = StringExpression.nullConvert(egovMap.get("taxtSe"));
		this.bcncCn = StringExpression.nullConvert(egovMap.get("bcncCn"));
		this.fondDe = StringExpression.nullConvert(egovMap.get("fondDe"));
		this.capitalAmt = StringExpression.nullConvert(egovMap.get("capitalAmt"));
		this.yySaleAmt = StringExpression.nullConvert(egovMap.get("yySaleAmt"));
		this.emplCo = StringExpression.nullConvert(egovMap.get("emplCo"));
		this.tradeNo = StringExpression.nullConvert(egovMap.get("tradeNo"));
		this.crncyCode = StringExpression.nullConvert(egovMap.get("crncyCode"));
		this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
		this.dsrprAt = StringExpression.nullConvert(egovMap.get("dsrprAt"));
		this.womanAt = StringExpression.nullConvert(egovMap.get("womanAt"));
		this.foreignAt = StringExpression.nullConvert(egovMap.get("foreignAt"));
		this.serhandicapAt = StringExpression.nullConvert(egovMap.get("serhandicapAt"));
		this.socialentrprsAt = StringExpression.nullConvert(egovMap.get("socialentrprsAt"));
		this.dspsnStdAt = StringExpression.nullConvert(egovMap.get("dspsnStdAt"));
		this.greenAt = StringExpression.nullConvert(egovMap.get("greenAt"));
		this.technologyAt = StringExpression.nullConvert(egovMap.get("technologyAt"));
		this.reprsntNm = StringExpression.nullConvert(egovMap.get("reprsntNm"));
	}

    public int getNum() {
        return num;
    }
    
    public void setNum(int num) {
        this.num = num;
    }

	public String getBcncCode() {
		return bcncCode;
	}

	public void setBcncCode(String bcncCode) {
		this.bcncCode = bcncCode;
	}

	public String getBplcCode() {
		return bplcCode;
	}

	public void setBplcCode(String bplcCode) {
		this.bplcCode = bplcCode;
	}

	public String getBplcNm() {
		return bplcNm;
	}

	public void setBplcNm(String bplcNm) {
		this.bplcNm = bplcNm;
	}

	public String getBizrno() {
		return bizrno;
	}

	public void setBizrno(String bizrno) {
		this.bizrno = bizrno;
	}

	public String getBcncNm() {
		return bcncNm;
	}

	public void setBcncNm(String bcncNm) {
		this.bcncNm = bcncNm;
	}

	public String getBcncSe() {
		return bcncSe;
	}

	public void setBcncSe(String bcncSe) {
		this.bcncSe = bcncSe;
	}

	public String getCprSe() {
		return cprSe;
	}

	public void setCprSe(String cprSe) {
		this.cprSe = cprSe;
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

	public String getCeoNm() {
		return ceoNm;
	}

	public void setCeoNm(String ceoNm) {
		this.ceoNm = ceoNm;
	}

	public String getNltyCode() {
		return nltyCode;
	}

	public void setNltyCode(String nltyCode) {
		this.nltyCode = nltyCode;
	}

	public String getAreaNm() {
		return areaNm;
	}

	public void setAreaNm(String areaNm) {
		this.areaNm = areaNm;
	}

	public String getPostCode() {
		return postCode;
	}

	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}

	public String getAdres() {
		return adres;
	}

	public void setAdres(String adres) {
		this.adres = adres;
	}

	public String getAddr2() {
		return addr2;
	}

	public void setAddr2(String addr2) {
		this.addr2 = addr2;
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

	public String getAcnutNo() {
		return acnutNo;
	}

	public void setAcnutNo(String acnutNo) {
		this.acnutNo = acnutNo;
	}

	public String getDpstrNm() {
		return dpstrNm;
	}

	public void setDpstrNm(String dpstrNm) {
		this.dpstrNm = dpstrNm;
	}

	public String getHomepage() {
		return homepage;
	}

	public void setHomepage(String homepage) {
		this.homepage = homepage;
	}

	public String getPurchsAt() {
		return purchsAt;
	}

	public void setPurchsAt(String purchsAt) {
		this.purchsAt = purchsAt;
	}

	public String getSaleofficAt() {
		return saleofficAt;
	}

	public void setSaleofficAt(String saleofficAt) {
		this.saleofficAt = saleofficAt;
	}

	public String getBcncscaleSe() {
		return bcncscaleSe;
	}

	public void setBcncscaleSe(String bcncscaleSe) {
		this.bcncscaleSe = bcncscaleSe;
	}

	public String getTaxtSe() {
		return taxtSe;
	}

	public void setTaxtSe(String taxtSe) {
		this.taxtSe = taxtSe;
	}

	public String getBcncCn() {
		return bcncCn;
	}

	public void setBcncCn(String bcncCn) {
		this.bcncCn = bcncCn;
	}

	public String getFondDe() {
		return fondDe;
	}

	public void setFondDe(String fondDe) {
		this.fondDe = fondDe;
	}

	public String getCapitalAmt() {
		return capitalAmt;
	}

	public void setCapitalAmt(String capitalAmt) {
		this.capitalAmt = capitalAmt;
	}

	public String getYySaleAmt() {
		return yySaleAmt;
	}

	public void setYySaleAmt(String yySaleAmt) {
		this.yySaleAmt = yySaleAmt;
	}

	public String getEmplCo() {
		return emplCo;
	}

	public void setEmplCo(String emplCo) {
		this.emplCo = emplCo;
	}

	public String getTradeNo() {
		return tradeNo;
	}

	public void setTradeNo(String tradeNo) {
		this.tradeNo = tradeNo;
	}

	public String getCrncyCode() {
		return crncyCode;
	}

	public void setCrncyCode(String crncyCode) {
		this.crncyCode = crncyCode;
	}

	public String getUseAt() {
		return useAt;
	}

	public void setUseAt(String useAt) {
		this.useAt = useAt;
	}

	public String getDsrprAt() {
		return dsrprAt;
	}

	public void setDsrprAt(String dsrprAt) {
		this.dsrprAt = dsrprAt;
	}

	public String getWomanAt() {
		return womanAt;
	}

	public void setWomanAt(String womanAt) {
		this.womanAt = womanAt;
	}

	public String getForeignAt() {
		return foreignAt;
	}

	public void setForeignAt(String foreignAt) {
		this.foreignAt = foreignAt;
	}

	public String getSerhandicapAt() {
		return serhandicapAt;
	}

	public void setSerhandicapAt(String serhandicapAt) {
		this.serhandicapAt = serhandicapAt;
	}

	public String getSocialentrprsAt() {
		return socialentrprsAt;
	}

	public void setSocialentrprsAt(String socialentrprsAt) {
		this.socialentrprsAt = socialentrprsAt;
	}

	public String getDspsnStdAt() {
		return dspsnStdAt;
	}

	public void setDspsnStdAt(String dspsnStdAt) {
		this.dspsnStdAt = dspsnStdAt;
	}

	public String getGreenAt() {
		return greenAt;
	}

	public void setGreenAt(String greenAt) {
		this.greenAt = greenAt;
	}

	public String getTechnologyAt() {
		return technologyAt;
	}

	public void setTechnologyAt(String technologyAt) {
		this.technologyAt = technologyAt;
	}
	
	public String getReprsntNm() {
        return reprsntNm;
    }

    public void setReprsntNm(String reprsntNm) {
        this.reprsntNm = reprsntNm;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
