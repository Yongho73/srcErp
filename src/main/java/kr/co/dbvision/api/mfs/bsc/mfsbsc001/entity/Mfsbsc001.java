package kr.co.dbvision.api.mfs.bsc.mfsbsc001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 계정과목관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.04.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.21          디비비전              최초 생성
 * </pre>
 */

public class Mfsbsc001 extends CommonVO {

    /* 계정코드 */
    private String acntCode;
    /* 계정명 */
    private String acntNm;
    /* 계정코드 */
    private String upperAcntCode;
    /* 사업장 코드 */
    private String bplcCode;
    /* 계정 약어명 */
    private String acntAbrvNm;
    /* 계정명_인쇄용 */
    private String outptAcntNm;
    /* 트리구조레벨 */
    private String treeLvl;
    /* 잔액표기위치구분 (좌우) */
    private String balanceMarklcSe;
    /* 재무제표_좌우표시(1:좌편, 2:우편, 3:양쪽)
 */
    private String lrSeCode;
    /* 계정구분 :자산,부채,자본,수익,비용 */
    private String acntSeCode;
    /* 전표기표사용여부 */
    private String slipBaltAt;
    /* 결산출력대상여부 */
    private String stacntTrgetAt;
    /* 은행코드(C010) */
    private String bankCode;
    /* 관리계좌 번호 */
    private String mgrtAcnutNo;
    /* 자금관리계정여부 */
    private String fundAcntAt;
    /* 원장관리여부 */
    private String ledgrMgrtAt;
    /* 공시계정여부 */
    private String pblntfAcntAt;
    /* 차감 여부 */
    private String minusAt;
    /* 사용여부 */
    private String useAt;
    /* 비고 */
    private String rm;
    
    /* 상위계정명 */
    private String upperAcntNm;    
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mfsbsc001() {
        //
    }

    public Mfsbsc001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.acntCode = StringExpression.nullConvert(egovMap.get("acntCode"));
            this.acntNm = StringExpression.nullConvert(egovMap.get("acntNm"));
            this.upperAcntCode = StringExpression.nullConvert(egovMap.get("upperAcntCode"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.acntAbrvNm = StringExpression.nullConvert(egovMap.get("acntAbrvNm"));
            this.outptAcntNm = StringExpression.nullConvert(egovMap.get("outptAcntNm"));
            this.treeLvl = StringExpression.nullConvert(egovMap.get("treeLvl"));
            this.balanceMarklcSe = StringExpression.nullConvert(egovMap.get("balanceMarklcSe"));
            this.lrSeCode = StringExpression.nullConvert(egovMap.get("lrSeCode"));
            this.acntSeCode = StringExpression.nullConvert(egovMap.get("acntSeCode"));
            this.slipBaltAt = StringExpression.nullConvert(egovMap.get("slipBaltAt"));
            this.stacntTrgetAt = StringExpression.nullConvert(egovMap.get("stacntTrgetAt"));
            this.bankCode = StringExpression.nullConvert(egovMap.get("bankCode"));
            this.mgrtAcnutNo = StringExpression.nullConvert(egovMap.get("mgrtAcnutNo"));
            this.fundAcntAt = StringExpression.nullConvert(egovMap.get("fundAcntAt"));
            this.ledgrMgrtAt = StringExpression.nullConvert(egovMap.get("ledgrMgrtAt"));
            this.pblntfAcntAt = StringExpression.nullConvert(egovMap.get("pblntfAcntAt"));
            this.minusAt = StringExpression.nullConvert(egovMap.get("minusAt"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.upperAcntNm = StringExpression.nullConvert(egovMap.get("upperAcntNm"));
        }
    }

    public Mfsbsc001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.acntCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.acntNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.upperAcntCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.acntAbrvNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.outptAcntNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.treeLvl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
            this.balanceMarklcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
            this.lrSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
            this.acntSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c11")));
            this.slipBaltAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c12")));
            this.stacntTrgetAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c13")));
            this.bankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c14")));
            this.mgrtAcnutNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c15")));
            this.fundAcntAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c16")));
            this.ledgrMgrtAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c17")));
            this.pblntfAcntAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c18")));
            this.minusAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c19")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c20")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c21")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getAcntCode() {
        return acntCode;
    }
    public void setAcntCode(String acntCode) {
        this.acntCode = acntCode;
    }

    public String getAcntNm() {
        return acntNm;
    }
    public void setAcntNm(String acntNm) {
        this.acntNm = acntNm;
    }

    public String getUpperAcntCode() {
        return upperAcntCode;
    }
    public void setUpperAcntCode(String upperAcntCode) {
        this.upperAcntCode = upperAcntCode;
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getAcntAbrvNm() {
        return acntAbrvNm;
    }
    public void setAcntAbrvNm(String acntAbrvNm) {
        this.acntAbrvNm = acntAbrvNm;
    }

    public String getOutptAcntNm() {
        return outptAcntNm;
    }
    public void setOutptAcntNm(String outptAcntNm) {
        this.outptAcntNm = outptAcntNm;
    }

    public String getTreeLvl() {
        return treeLvl;
    }
    public void setTreeLvl(String treeLvl) {
        this.treeLvl = treeLvl;
    }

    public String getBalanceMarklcSe() {
        return balanceMarklcSe;
    }
    public void setBalanceMarklcSe(String balanceMarklcSe) {
        this.balanceMarklcSe = balanceMarklcSe;
    }

    public String getLrSeCode() {
        return lrSeCode;
    }
    public void setLrSeCode(String lrSeCode) {
        this.lrSeCode = lrSeCode;
    }

    public String getAcntSeCode() {
        return acntSeCode;
    }
    public void setAcntSeCode(String acntSeCode) {
        this.acntSeCode = acntSeCode;
    }

    public String getSlipBaltAt() {
        return slipBaltAt;
    }
    public void setSlipBaltAt(String slipBaltAt) {
        this.slipBaltAt = slipBaltAt;
    }

    public String getStacntTrgetAt() {
        return stacntTrgetAt;
    }
    public void setStacntTrgetAt(String stacntTrgetAt) {
        this.stacntTrgetAt = stacntTrgetAt;
    }

    public String getBankCode() {
        return bankCode;
    }
    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getMgrtAcnutNo() {
        return mgrtAcnutNo;
    }
    public void setMgrtAcnutNo(String mgrtAcnutNo) {
        this.mgrtAcnutNo = mgrtAcnutNo;
    }

    public String getFundAcntAt() {
        return fundAcntAt;
    }
    public void setFundAcntAt(String fundAcntAt) {
        this.fundAcntAt = fundAcntAt;
    }

    public String getLedgrMgrtAt() {
        return ledgrMgrtAt;
    }
    public void setLedgrMgrtAt(String ledgrMgrtAt) {
        this.ledgrMgrtAt = ledgrMgrtAt;
    }

    public String getPblntfAcntAt() {
        return pblntfAcntAt;
    }
    public void setPblntfAcntAt(String pblntfAcntAt) {
        this.pblntfAcntAt = pblntfAcntAt;
    }

    public String getMinusAt() {
        return minusAt;
    }
    public void setMinusAt(String minusAt) {
        this.minusAt = minusAt;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
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

    public String getUpperAcntNm() {
        return upperAcntNm;
    }

    public void setUpperAcntNm(String upperAcntNm) {
        this.upperAcntNm = upperAcntNm;
    }
}
