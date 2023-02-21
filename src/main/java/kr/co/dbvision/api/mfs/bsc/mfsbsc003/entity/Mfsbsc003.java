package kr.co.dbvision.api.mfs.bsc.mfsbsc003.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 금융계좌관리관리에 관한 엔티티 클래스
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
 * </pre>
 */

public class Mfsbsc003 extends CommonVO {

    /* 계좌번호 */
    private String acnutNo;
    /* 사업장 코드 */
    private String bplcCode;
    /* 예금종류 */
    private String dpstKind;
    /* 예금명 */
    private String dpstNm;
    /* 예금주명 */
    private String dpstrNm;
    /* 은행코드 */
    private String bankCode;
    /* 지점명 */
    private String bankNm;
    /* 은행 개설 지점 */
    private String estblBhf;
    /* 개설일자 */
    private String estblDe;
    /* 만기일자 */
    private String exprtnDe;
    /* 해지일자 */
    private String trmnatDe;
    /* 이자율 */
    private String intrRt;
    /* 주거래통장여부 */
    private String bassBnkbAt;
    /* 비고 */
    private String rm;
    /* 사용여부 */
    private String useAt;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mfsbsc003() {
        //
    }

    public Mfsbsc003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.acnutNo = StringExpression.nullConvert(egovMap.get("acnutNo"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.dpstKind = StringExpression.nullConvert(egovMap.get("dpstKind"));
            this.dpstNm = StringExpression.nullConvert(egovMap.get("dpstNm"));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get("dpstrNm"));
            this.bankCode = StringExpression.nullConvert(egovMap.get("bankCode"));
            this.bankNm = StringExpression.nullConvert(egovMap.get("bankNm"));
            this.estblBhf = StringExpression.nullConvert(egovMap.get("estblBhf"));
            this.estblDe = StringExpression.nullConvert(egovMap.get("estblDe"));
            this.exprtnDe = StringExpression.nullConvert(egovMap.get("exprtnDe"));
            this.trmnatDe = StringExpression.nullConvert(egovMap.get("trmnatDe"));
            this.intrRt = StringExpression.nullConvert(egovMap.get("intrRt"));
            this.bassBnkbAt = StringExpression.nullConvert(egovMap.get("bassBnkbAt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
        }
    }

    public Mfsbsc003(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.acnutNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.dpstKind = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            this.dpstNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.bankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.bankNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
            this.estblBhf = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
            this.estblDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
            this.exprtnDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c11")));
            this.trmnatDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c12")));
            this.intrRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c13")));
            this.bassBnkbAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c14")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c15")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c16")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getAcnutNo() {
        return acnutNo;
    }
    public void setAcnutNo(String acnutNo) {
        this.acnutNo = acnutNo;
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getDpstKind() {
        return dpstKind;
    }
    public void setDpstKind(String dpstKind) {
        this.dpstKind = dpstKind;
    }

    public String getDpstNm() {
        return dpstNm;
    }
    public void setDpstNm(String dpstNm) {
        this.dpstNm = dpstNm;
    }

    public String getDpstrNm() {
        return dpstrNm;
    }
    public void setDpstrNm(String dpstrNm) {
        this.dpstrNm = dpstrNm;
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

    public String getEstblBhf() {
        return estblBhf;
    }
    public void setEstblBhf(String estblBhf) {
        this.estblBhf = estblBhf;
    }

    public String getEstblDe() {
        return estblDe;
    }
    public void setEstblDe(String estblDe) {
        this.estblDe = estblDe;
    }

    public String getExprtnDe() {
        return exprtnDe;
    }
    public void setExprtnDe(String exprtnDe) {
        this.exprtnDe = exprtnDe;
    }

    public String getTrmnatDe() {
        return trmnatDe;
    }
    public void setTrmnatDe(String trmnatDe) {
        this.trmnatDe = trmnatDe;
    }

    public String getIntrRt() {
        return intrRt;
    }
    public void setIntrRt(String intrRt) {
        this.intrRt = intrRt;
    }

    public String getBassBnkbAt() {
        return bassBnkbAt;
    }
    public void setBassBnkbAt(String bassBnkbAt) {
        this.bassBnkbAt = bassBnkbAt;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
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
