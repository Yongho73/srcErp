package kr.co.dbvision.api.mfs.bsc.mfsbsc002.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 거래처관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.03.10
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.10          디비비전              최초 생성
 * </pre>
 */

public class Mfsbsc002 extends CommonVO {

    /* 거래처 코드 */
    private String bcncCode;
    /* 사업장 코드 */
    private String bplcCode;
    /* 사업자등록번호 */
    private String bizrno;
    /* 거래처 명 */
    private String bcncNm;
    /* 거래처 구분 */
    private String bcncSe;
    /* 법인 구분 */
    private String cprSe;
    /* 업종 */
    private String induty;
    /* 업태 */
    private String bizcnd;
    /* 대표자 명 */
    private String ceoNm;
    /* 국적 코드 */
    private String nltyCode;
    /* 지역 명 */
    private String areaNm;
    /* 우편 코드 */
    private String postCode;
    /* 주소 */
    private String adres;
    /* 주소상세 */
    private String addr2;
    /* 전화번호 */
    private String telno;
    /* 팩스 번호 */
    private String faxNo;
    /* 은행 코드 */
    private String bankCode;
    /* 계좌 번호 */
    private String acnutNo;
    /* 예금주 명 */
    private String dpstrNm;
    /* HOMEPAGE */
    private String homepage;
    /* 매입 여부 */
    private String purchsAt;
    /* 매출처 여부 */
    private String saleofficAt;
    /* 거래처규모 구분 */
    private String bcncscaleSe;
    /* 과세 구분 */
    private String taxtSe;
    /* 거래처 내용 */
    private String bcncCn;
    /* 설립 일자 */
    private String fondDe;
    /* 자본 금액 */
    private String capitalAmt;
    /* 년 매출 금액 */
    private String yySaleAmt;
    /* 사원 수 */
    private String emplCo;
    /* 무역업등록 번호 */
    private String tradeNo;
    /* 통화 코드 */
    private String crncyCode;
    /* 사용 여부 */
    private String useAt;
    /* 장애인기업 여부 */
    private String dsrprAt;
    /* 여성대표기업 여부 */
    private String womanAt;
    /* 외자기업 여부 */
    private String foreignAt;
    /* 중증장애인기업 여부 */
    private String serhandicapAt;
    /* 사회적기업 여부 */
    private String socialentrprsAt;
    /* 장애자 표준 여부 */
    private String dspsnStdAt;
    /* 녹색제품 여부 */
    private String greenAt;
    /* 기술개발제품 여부 */
    private String technologyAt;
    /* 지역코드 */
    private String areaCode;
    /* 담당자명 */
    private String chargerNm;
    /* 담당자이메일 */
    private String chargerEmail;
    /* 담당자 전화번호 */
    private String chargerTelno;
    /* 담당자부서 */
    private String chargerDept;
    /* 담당자 직위 */
    private String chargerOfcps;
    
    private String atchmnflNo;
    
    private String reprsntNm;
    
    /* 등록일 */
    private String regDt;
    /* 등록자 */
    private String regId;
    /* 수정일 */
    private String uptDt;
    /* 수정자 */
    private String uptId;
    

    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mfsbsc002() {
        //
    }

    public Mfsbsc002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.bcncCode = StringExpression.nullConvert(egovMap.get("bcncCode"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
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
            this.areaCode = StringExpression.nullConvert(egovMap.get("areaCode"));
            this.chargerNm = StringExpression.nullConvert(egovMap.get("chargerNm"));
            this.chargerEmail = StringExpression.nullConvert(egovMap.get("chargerEmail"));
            this.chargerTelno = StringExpression.nullConvert(egovMap.get("chargerTelno"));
            this.chargerDept = StringExpression.nullConvert(egovMap.get("chargerDept"));
            this.chargerOfcps = StringExpression.nullConvert(egovMap.get("chargerOfcps"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.reprsntNm = StringExpression.nullConvert(egovMap.get("reprsntNm"));
            
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            
        }
    }

    public Mfsbsc002(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.bcncCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncCode")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.bizrno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bizrno")));
            this.bcncNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncNm")));
            this.bcncSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncSe")));
            this.cprSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cprSe")));
            this.induty = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_induty")));
            this.bizcnd = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bizcnd")));
            this.ceoNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ceoNm")));
            this.nltyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nltyCode")));
            this.areaNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_areaNm")));
            this.postCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_postCode")));
            this.adres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_adres")));
            this.addr2 = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_addr2")));
            this.telno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_telno")));
            this.faxNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_faxNo")));
            this.bankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bankCode")));
            this.acnutNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutNo")));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dpstrNm")));
            this.homepage = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_homepage")));
            this.purchsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_purchsAt")));
            this.saleofficAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_saleofficAt")));
            this.bcncscaleSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncscaleSe")));
            this.taxtSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxtSe")));
            this.bcncCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncCn")));
            this.fondDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fondDe")));
            this.capitalAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_capitalAmt")));
            this.yySaleAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_yySaleAmt")));
            this.emplCo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_emplCo")));
            this.tradeNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_tradeNo")));
            this.crncyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crncyCode")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.dsrprAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dsrprAt")));
            this.womanAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_womanAt")));
            this.foreignAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_foreignAt")));
            this.serhandicapAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_serhandicapAt")));
            this.socialentrprsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_socialentrprsAt")));
            this.dspsnStdAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dspsnStdAt")));
            this.greenAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_greenAt")));
            this.technologyAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_technologyAt")));
            this.areaCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_areaCode")));
            this.chargerNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerNm")));
            this.chargerEmail = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerEmail")));
            this.chargerTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerTelno")));
            this.chargerDept = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerDept")));
            this.chargerOfcps = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerOfcps")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.reprsntNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reprsntNm")));
            
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
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

    public String getAreaCode() {
        return areaCode;
    }
    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getChargerNm() {
        return chargerNm;
    }
    public void setChargerNm(String chargerNm) {
        this.chargerNm = chargerNm;
    }

    public String getChargerEmail() {
        return chargerEmail;
    }
    public void setChargerEmail(String chargerEmail) {
        this.chargerEmail = chargerEmail;
    }

    public String getChargerTelno() {
        return chargerTelno;
    }
    public void setChargerTelno(String chargerTelno) {
        this.chargerTelno = chargerTelno;
    }

    public String getChargerDept() {
        return chargerDept;
    }
    public void setChargerDept(String chargerDept) {
        this.chargerDept = chargerDept;
    }

    public String getChargerOfcps() {
        return chargerOfcps;
    }
    public void setChargerOfcps(String chargerOfcps) {
        this.chargerOfcps = chargerOfcps;
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

	public String getAtchmnflNo() {
		return atchmnflNo;
	}

	public void setAtchmnflNo(String atchmnflNo) {
		this.atchmnflNo = atchmnflNo;
	}

    public String getReprsntNm() {
        return reprsntNm;
    }

    public void setReprsntNm(String reprsntNm) {
        this.reprsntNm = reprsntNm;
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


}
