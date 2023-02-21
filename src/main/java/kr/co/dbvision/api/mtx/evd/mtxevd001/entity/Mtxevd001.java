package kr.co.dbvision.api.mtx.evd.mtxevd001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 세금계산서(매입/매출)관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.05.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.22          디비비전              최초 생성
 * </pre>
 */

public class Mtxevd001 extends CommonVO {

    /* 세금계산서번호 */
    private String taxbillNo;
    /* 사업장코드 */
    private String bplcCode;
    /* 사업구분코드(일반:임대) */
    private String bsnsSeCode;
    /* 매입매출구분C035 */
    private String pursaleSeCode;
    /* 신고 구분C177  1기 2기 구분 */
    private String sttemntSeCode;
    /* 신고유형코드 C044 예정|확정 */
    private String sttemntTyCode;
    /* 증빙구분코드 C038 세금계산서, 계산서 */
    private String evidSeCode;
    /* 발행구분 C174(영수: 청구) */
    private String isuSeCode;
    /* 세액공제여부 */
    private String taxDdcAt;
    /* 공제구분코드 C036 */
    private String ddcSeCode;
    /* 매입세액불공제사유 :C040 */
    private String exTaxDedCode;
    /* 매입유형구분C042 고정자산 , 일반 */
    private String purchsTyCode;
    /* 매출유형코드 */
    private String saleTyCode;
    /* 전자증빙여부 (전자:종이) C041 */
    private String elctrnevidSeCode;
    /* 전자세금계산서번호 */
    private String elctrnTaxbillNo;
    /* 작성일자 */
    private String billWriteDe;
    /* 계산서발행일자 */
    private String billIsuDe;
    /* 국세청 전송일자 */
    private String ntxTrnsmisDe;
    /* 계산서발행여부 */
    private String billIsuAt;
    /* 승인구분C002 */
    private String confmSeCode;
    /* 공급금액 */
    private String splpcAmt;
    /* 부가세 금액 */
    private String vatAmt;
    /* 부가세 대급금 */
    private String vatpa;
    /* 부가세대급금 조정금액 */
    private String vatpaMdatAmt;
    /* 공급대가금액 */
    private String amtSuplAmt;
    /* 기타금액 */
    private String etcAmt;
    /* 할인율 */
    private String dscntRt;
    /* 안분율 */
    private String prpdvsRt;
    /* 공란수 */
    private String blankCo;
    /* 작성부서코드 */
    private String writeDeptCode;
    /* 작성자 */
    private String writeEmpno;
    /* 거래처코드 */
    private String bcncCode;
    /* 거래처명 */
    private String bcncNm;
    /* 업종 */
    private String induty;
    /* 사업장의 종목을 기록하는 항목 */
    private String bizcnd;
    /* 사업자등록번호 */
    private String bizrno;
    /* 주민등록번호 */
    private String ihidnum;
    /* 지불구분코드   C175 */
    private String pymntSeCode;
    /* 대표자명 */
    private String reprsntNm;
    /* 담당자명 */
    private String chargerNm;
    /* 담당자이메일 */
    private String chargerEmail;
    /* 담당자 전화번호 */
    private String chargerTelno;
    /* 전자세금계산서 지연전송여부 */
    private String delaytrnsmisAt;
    /* 예정신고누락분여부 */
    private String predRptMissAt;
    /* 주류세금계산서여부 */
    private String liquorAt;
    /* 입력구분C179(전자발행, 직접등록) */
    private String inputSeCode;
    /* 담당자확인여부 */
    private String chargerConfirmAt;
    /* 발행상태값 국세청 발행상태값 */
    private String isuSttusCode;
    /* 발행내용 */
    private String isuResultCn;
    /* 발급기관사업자번호 */
    private String issuInsttBizrno;
    /* 결의서 번호 */
    private String anactNo;
    /* 결의서 순번 */
    private String anactSn;
    /* 회계전표일자 */
    private String anactDe;
    /* 첨부파일번호 */
    private String atchmnflNo;
    /* 비고 */
    private String rm;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    
    
    /* 품목순번 */
    private String itemSn;
    /* 품명 */
    private String prdnm;
    /* 규격 */
    private String specNm;
    /* 수량 */
    private String qty;
    /* 단위구분코드C093 */
    private String unitSeCode;
    /* 단위 가격 */
    private String unitPrice;
    /* 증가 금액 */
    private String incrsAmt;
    /* 감소 금액 */
    private String dcrsAmt;
    /* 비고 */
    /* DhtmlX Grid Status (insert, delete, update) */

    
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mtxevd001() {
        //
    }

    public Mtxevd001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.taxbillNo = StringExpression.nullConvert(egovMap.get("taxbillNo"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.bsnsSeCode = StringExpression.nullConvert(egovMap.get("bsnsSeCode"));
            this.pursaleSeCode = StringExpression.nullConvert(egovMap.get("pursaleSeCode"));
            this.sttemntSeCode = StringExpression.nullConvert(egovMap.get("sttemntSeCode"));
            this.sttemntTyCode = StringExpression.nullConvert(egovMap.get("sttemntTyCode"));
            this.evidSeCode = StringExpression.nullConvert(egovMap.get("evidSeCode"));
            this.isuSeCode = StringExpression.nullConvert(egovMap.get("isuSeCode"));
            this.taxDdcAt = StringExpression.nullConvert(egovMap.get("taxDdcAt"));
            this.ddcSeCode = StringExpression.nullConvert(egovMap.get("ddcSeCode"));
            this.exTaxDedCode = StringExpression.nullConvert(egovMap.get("exTaxDedCode"));
            this.purchsTyCode = StringExpression.nullConvert(egovMap.get("purchsTyCode"));
            this.saleTyCode = StringExpression.nullConvert(egovMap.get("saleTyCode"));
            this.elctrnevidSeCode = StringExpression.nullConvert(egovMap.get("elctrnevidSeCode"));
            this.elctrnTaxbillNo = StringExpression.nullConvert(egovMap.get("elctrnTaxbillNo"));
            this.billWriteDe = StringExpression.nullConvert(egovMap.get("billWriteDe"));
            this.billIsuDe = StringExpression.nullConvert(egovMap.get("billIsuDe"));
            this.ntxTrnsmisDe = StringExpression.nullConvert(egovMap.get("ntxTrnsmisDe"));
            this.billIsuAt = StringExpression.nullConvert(egovMap.get("billIsuAt"));
            this.confmSeCode = StringExpression.nullConvert(egovMap.get("confmSeCode"));
            this.splpcAmt = StringExpression.nullConvert(egovMap.get("splpcAmt"));
            this.vatAmt = StringExpression.nullConvert(egovMap.get("vatAmt"));
            this.vatpa = StringExpression.nullConvert(egovMap.get("vatpa"));
            this.vatpaMdatAmt = StringExpression.nullConvert(egovMap.get("vatpaMdatAmt"));
            this.amtSuplAmt = StringExpression.nullConvert(egovMap.get("amtSuplAmt"));
            this.etcAmt = StringExpression.nullConvert(egovMap.get("etcAmt"));
            this.dscntRt = StringExpression.nullConvert(egovMap.get("dscntRt"));
            this.prpdvsRt = StringExpression.nullConvert(egovMap.get("prpdvsRt"));
            this.blankCo = StringExpression.nullConvert(egovMap.get("blankCo"));
            this.writeDeptCode = StringExpression.nullConvert(egovMap.get("writeDeptCode"));
            this.writeEmpno = StringExpression.nullConvert(egovMap.get("writeEmpno"));
            this.bcncCode = StringExpression.nullConvert(egovMap.get("bcncCode"));
            this.bcncNm = StringExpression.nullConvert(egovMap.get("bcncNm"));
            this.induty = StringExpression.nullConvert(egovMap.get("induty"));
            this.bizcnd = StringExpression.nullConvert(egovMap.get("bizcnd"));
            this.bizrno = StringExpression.nullConvert(egovMap.get("bizrno"));
            this.ihidnum = StringExpression.nullConvert(egovMap.get("ihidnum"));
            this.pymntSeCode = StringExpression.nullConvert(egovMap.get("pymntSeCode"));
            this.reprsntNm = StringExpression.nullConvert(egovMap.get("reprsntNm"));
            this.chargerNm = StringExpression.nullConvert(egovMap.get("chargerNm"));
            this.chargerEmail = StringExpression.nullConvert(egovMap.get("chargerEmail"));
            this.chargerTelno = StringExpression.nullConvert(egovMap.get("chargerTelno"));
            this.delaytrnsmisAt = StringExpression.nullConvert(egovMap.get("delaytrnsmisAt"));
            this.predRptMissAt = StringExpression.nullConvert(egovMap.get("predRptMissAt"));
            this.liquorAt = StringExpression.nullConvert(egovMap.get("liquorAt"));
            this.inputSeCode = StringExpression.nullConvert(egovMap.get("inputSeCode"));
            this.chargerConfirmAt = StringExpression.nullConvert(egovMap.get("chargerConfirmAt"));
            this.isuSttusCode = StringExpression.nullConvert(egovMap.get("isuSttusCode"));
            this.isuResultCn = StringExpression.nullConvert(egovMap.get("isuResultCn"));
            this.issuInsttBizrno = StringExpression.nullConvert(egovMap.get("issuInsttBizrno"));
            this.anactNo = StringExpression.nullConvert(egovMap.get("anactNo"));
            this.anactSn = StringExpression.nullConvert(egovMap.get("anactSn"));
            this.anactDe = StringExpression.nullConvert(egovMap.get("anactDe"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            
            
            this.itemSn = StringExpression.nullConvert(egovMap.get("itemSn"));
            this.prdnm = StringExpression.nullConvert(egovMap.get("prdnm"));
            this.specNm = StringExpression.nullConvert(egovMap.get("specNm"));
            this.qty = StringExpression.nullConvert(egovMap.get("qty"));
            this.unitSeCode = StringExpression.nullConvert(egovMap.get("unitSeCode"));
            this.unitPrice = StringExpression.nullConvert(egovMap.get("unitPrice"));
            this.dscntRt = StringExpression.nullConvert(egovMap.get("dscntRt"));
            this.incrsAmt = StringExpression.nullConvert(egovMap.get("incrsAmt"));
            this.dcrsAmt = StringExpression.nullConvert(egovMap.get("dcrsAmt"));
        }
    }

    public Mtxevd001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.taxbillNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxbillNo")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.bsnsSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsnsSeCode")));
            this.pursaleSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pursaleSeCode")));
            this.sttemntSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sttemntSeCode")));
            this.sttemntTyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sttemntTyCode")));
            this.evidSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_evidSeCode")));
            this.isuSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_isuSeCode")));
            this.taxDdcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxDdcAt")));
            this.ddcSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ddcSeCode")));
            this.exTaxDedCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_exTaxDedCode")));
            this.purchsTyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_purchsTyCode")));
            this.saleTyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_saleTyCode")));
            this.elctrnevidSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctrnevidSeCode")));
            this.elctrnTaxbillNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctrnTaxbillNo")));
            this.billWriteDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_billWriteDe")));
            this.billIsuDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_billIsuDe")));
            this.ntxTrnsmisDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ntxTrnsmisDe")));
            this.billIsuAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_billIsuAt")));
            this.confmSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmSeCode")));
            this.splpcAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_splpcAmt")));
            this.vatAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_vatAmt")));
            this.vatpa = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_vatpa")));
            this.vatpaMdatAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_vatpaMdatAmt")));
            this.amtSuplAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_amtSuplAmt")));
            this.etcAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_etcAmt")));
            this.dscntRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dscntRt")));
            this.prpdvsRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prpdvsRt")));
            this.blankCo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_blankCo")));
            this.writeDeptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_writeDeptCode")));
            this.writeEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_writeEmpno")));
            this.bcncCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncCode")));
            this.bcncNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncNm")));
            this.induty = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_induty")));
            this.bizcnd = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bizcnd")));
            this.bizrno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bizrno")));
            this.ihidnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ihidnum")));
            this.pymntSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntSeCode")));
            this.reprsntNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reprsntNm")));
            this.chargerNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerNm")));
            this.chargerEmail = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerEmail")));
            this.chargerTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerTelno")));
            this.delaytrnsmisAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_delaytrnsmisAt")));
            this.predRptMissAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_predRptMissAt")));
            this.liquorAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_liquorAt")));
            this.inputSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_inputSeCode")));
            this.chargerConfirmAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerConfirmAt")));
            this.isuSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_isuSttusCode")));
            this.isuResultCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_isuResultCn")));
            this.issuInsttBizrno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issuInsttBizrno")));
            this.anactNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_anactNo")));
            this.anactSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_anactSn")));
            this.anactDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_anactDe")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            
            this.itemSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_itemSn")));
            this.prdnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prdnm")));
            this.specNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_specNm")));
            this.qty = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qty")));
            this.unitSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_unitSeCode")));
            this.unitPrice = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_unitPrice")));
            this.dscntRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dscntRt")));
            this.incrsAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incrsAmt")));
            this.dcrsAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dcrsAmt")));
        }
    }

    public String getTaxbillNo() {
        return taxbillNo;
    }
    public void setTaxbillNo(String taxbillNo) {
        this.taxbillNo = taxbillNo;
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getBsnsSeCode() {
        return bsnsSeCode;
    }
    public void setBsnsSeCode(String bsnsSeCode) {
        this.bsnsSeCode = bsnsSeCode;
    }

    public String getPursaleSeCode() {
        return pursaleSeCode;
    }
    public void setPursaleSeCode(String pursaleSeCode) {
        this.pursaleSeCode = pursaleSeCode;
    }

    public String getSttemntSeCode() {
        return sttemntSeCode;
    }
    public void setSttemntSeCode(String sttemntSeCode) {
        this.sttemntSeCode = sttemntSeCode;
    }

    public String getSttemntTyCode() {
        return sttemntTyCode;
    }
    public void setSttemntTyCode(String sttemntTyCode) {
        this.sttemntTyCode = sttemntTyCode;
    }

    public String getEvidSeCode() {
        return evidSeCode;
    }
    public void setEvidSeCode(String evidSeCode) {
        this.evidSeCode = evidSeCode;
    }

    public String getIsuSeCode() {
        return isuSeCode;
    }
    public void setIsuSeCode(String isuSeCode) {
        this.isuSeCode = isuSeCode;
    }

    public String getTaxDdcAt() {
        return taxDdcAt;
    }
    public void setTaxDdcAt(String taxDdcAt) {
        this.taxDdcAt = taxDdcAt;
    }

    public String getDdcSeCode() {
        return ddcSeCode;
    }
    public void setDdcSeCode(String ddcSeCode) {
        this.ddcSeCode = ddcSeCode;
    }

    public String getExTaxDedCode() {
        return exTaxDedCode;
    }
    public void setExTaxDedCode(String exTaxDedCode) {
        this.exTaxDedCode = exTaxDedCode;
    }

    public String getPurchsTyCode() {
        return purchsTyCode;
    }
    public void setPurchsTyCode(String purchsTyCode) {
        this.purchsTyCode = purchsTyCode;
    }

    public String getSaleTyCode() {
        return saleTyCode;
    }
    public void setSaleTyCode(String saleTyCode) {
        this.saleTyCode = saleTyCode;
    }

    public String getElctrnevidSeCode() {
        return elctrnevidSeCode;
    }
    public void setElctrnevidSeCode(String elctrnevidSeCode) {
        this.elctrnevidSeCode = elctrnevidSeCode;
    }

    public String getElctrnTaxbillNo() {
        return elctrnTaxbillNo;
    }
    public void setElctrnTaxbillNo(String elctrnTaxbillNo) {
        this.elctrnTaxbillNo = elctrnTaxbillNo;
    }

    public String getBillWriteDe() {
        return billWriteDe;
    }
    public void setBillWriteDe(String billWriteDe) {
        this.billWriteDe = billWriteDe;
    }

    public String getBillIsuDe() {
        return billIsuDe;
    }
    public void setBillIsuDe(String billIsuDe) {
        this.billIsuDe = billIsuDe;
    }

    public String getNtxTrnsmisDe() {
        return ntxTrnsmisDe;
    }
    public void setNtxTrnsmisDe(String ntxTrnsmisDe) {
        this.ntxTrnsmisDe = ntxTrnsmisDe;
    }

    public String getBillIsuAt() {
        return billIsuAt;
    }
    public void setBillIsuAt(String billIsuAt) {
        this.billIsuAt = billIsuAt;
    }

    public String getConfmSeCode() {
        return confmSeCode;
    }
    public void setConfmSeCode(String confmSeCode) {
        this.confmSeCode = confmSeCode;
    }

    public String getSplpcAmt() {
        return splpcAmt;
    }
    public void setSplpcAmt(String splpcAmt) {
        this.splpcAmt = splpcAmt;
    }

    public String getVatAmt() {
        return vatAmt;
    }
    public void setVatAmt(String vatAmt) {
        this.vatAmt = vatAmt;
    }

    public String getVatpa() {
        return vatpa;
    }
    public void setVatpa(String vatpa) {
        this.vatpa = vatpa;
    }

    public String getVatpaMdatAmt() {
        return vatpaMdatAmt;
    }
    public void setVatpaMdatAmt(String vatpaMdatAmt) {
        this.vatpaMdatAmt = vatpaMdatAmt;
    }

    public String getAmtSuplAmt() {
        return amtSuplAmt;
    }
    public void setAmtSuplAmt(String amtSuplAmt) {
        this.amtSuplAmt = amtSuplAmt;
    }

    public String getEtcAmt() {
        return etcAmt;
    }
    public void setEtcAmt(String etcAmt) {
        this.etcAmt = etcAmt;
    }

    public String getDscntRt() {
        return dscntRt;
    }
    public void setDscntRt(String dscntRt) {
        this.dscntRt = dscntRt;
    }

    public String getPrpdvsRt() {
        return prpdvsRt;
    }
    public void setPrpdvsRt(String prpdvsRt) {
        this.prpdvsRt = prpdvsRt;
    }

    public String getBlankCo() {
        return blankCo;
    }
    public void setBlankCo(String blankCo) {
        this.blankCo = blankCo;
    }

    public String getWriteDeptCode() {
        return writeDeptCode;
    }
    public void setWriteDeptCode(String writeDeptCode) {
        this.writeDeptCode = writeDeptCode;
    }

    public String getWriteEmpno() {
        return writeEmpno;
    }
    public void setWriteEmpno(String writeEmpno) {
        this.writeEmpno = writeEmpno;
    }

    public String getBcncCode() {
        return bcncCode;
    }
    public void setBcncCode(String bcncCode) {
        this.bcncCode = bcncCode;
    }

    public String getBcncNm() {
        return bcncNm;
    }
    public void setBcncNm(String bcncNm) {
        this.bcncNm = bcncNm;
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

    public String getBizrno() {
        return bizrno;
    }
    public void setBizrno(String bizrno) {
        this.bizrno = bizrno;
    }

    public String getIhidnum() {
        return ihidnum;
    }
    public void setIhidnum(String ihidnum) {
        this.ihidnum = ihidnum;
    }

    public String getPymntSeCode() {
        return pymntSeCode;
    }
    public void setPymntSeCode(String pymntSeCode) {
        this.pymntSeCode = pymntSeCode;
    }

    public String getReprsntNm() {
        return reprsntNm;
    }
    public void setReprsntNm(String reprsntNm) {
        this.reprsntNm = reprsntNm;
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

    public String getDelaytrnsmisAt() {
        return delaytrnsmisAt;
    }
    public void setDelaytrnsmisAt(String delaytrnsmisAt) {
        this.delaytrnsmisAt = delaytrnsmisAt;
    }

    public String getPredRptMissAt() {
        return predRptMissAt;
    }
    public void setPredRptMissAt(String predRptMissAt) {
        this.predRptMissAt = predRptMissAt;
    }

    public String getLiquorAt() {
        return liquorAt;
    }
    public void setLiquorAt(String liquorAt) {
        this.liquorAt = liquorAt;
    }

    public String getInputSeCode() {
        return inputSeCode;
    }
    public void setInputSeCode(String inputSeCode) {
        this.inputSeCode = inputSeCode;
    }

    public String getChargerConfirmAt() {
        return chargerConfirmAt;
    }
    public void setChargerConfirmAt(String chargerConfirmAt) {
        this.chargerConfirmAt = chargerConfirmAt;
    }

    public String getIsuSttusCode() {
        return isuSttusCode;
    }
    public void setIsuSttusCode(String isuSttusCode) {
        this.isuSttusCode = isuSttusCode;
    }

    public String getIsuResultCn() {
        return isuResultCn;
    }
    public void setIsuResultCn(String isuResultCn) {
        this.isuResultCn = isuResultCn;
    }

    public String getIssuInsttBizrno() {
        return issuInsttBizrno;
    }
    public void setIssuInsttBizrno(String issuInsttBizrno) {
        this.issuInsttBizrno = issuInsttBizrno;
    }

    public String getAnactNo() {
        return anactNo;
    }
    public void setAnactNo(String anactNo) {
        this.anactNo = anactNo;
    }

    public String getAnactSn() {
        return anactSn;
    }
    public void setAnactSn(String anactSn) {
        this.anactSn = anactSn;
    }

    public String getAnactDe() {
        return anactDe;
    }
    public void setAnactDe(String anactDe) {
        this.anactDe = anactDe;
    }

    public String getAtchmnflNo() {
        return atchmnflNo;
    }
    public void setAtchmnflNo(String atchmnflNo) {
        this.atchmnflNo = atchmnflNo;
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

    public String getItemSn() {
        return itemSn;
    }

    public void setItemSn(String itemSn) {
        this.itemSn = itemSn;
    }

    public String getPrdnm() {
        return prdnm;
    }

    public void setPrdnm(String prdnm) {
        this.prdnm = prdnm;
    }

    public String getSpecNm() {
        return specNm;
    }

    public void setSpecNm(String specNm) {
        this.specNm = specNm;
    }

    public String getQty() {
        return qty;
    }

    public void setQty(String qty) {
        this.qty = qty;
    }

    public String getUnitSeCode() {
        return unitSeCode;
    }

    public void setUnitSeCode(String unitSeCode) {
        this.unitSeCode = unitSeCode;
    }

    public String getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(String unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getIncrsAmt() {
        return incrsAmt;
    }

    public void setIncrsAmt(String incrsAmt) {
        this.incrsAmt = incrsAmt;
    }

    public String getDcrsAmt() {
        return dcrsAmt;
    }

    public void setDcrsAmt(String dcrsAmt) {
        this.dcrsAmt = dcrsAmt;
    }
    
    
}
