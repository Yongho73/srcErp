package kr.co.dbvision.api.mfs.bsc.mfsbsc004.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 법인카드관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.04.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.23          디비비전              최초 생성
 * </pre>
 */

public class Mfsbsc004 extends CommonVO {

    /* 카드번호 */
    private String cardNo;
    /* 사업장 코드 */
    private String bplcCode;
    /* 카드종류명 */
    private String cardNm;
    /* 카드 약칭 */
    private String cardAbrv;
    /* 카드발급기관 (카드사) */
    private String cardIssuInstt;
    /* 카드구분코드 */
    private String cardSe;
    /* 카드상세구분 */
    private String carddetailSe;
    /* 카드유효년월 */
    private String cardValidYm;
    /* 부서코드 */
    private String deptCode;
    /* 사원번호(소유자) */
    private String ownEmpno;
    /* 카드사용자 */
    private String useEmpno;
    /* 발급일자 */
    private String issuDe;
    /* 만기일자 */
    private String exprtnDe;
    /* 사용중지되면 폐기일자가 등록되야 됨 */
    private String discardDe;
    /* 결재일 */
    private String setleDay;
    /* 사용여부 */
    private String useAt;
    /* 은행코드 */
    private String bankCode;
    /* 출금계좌번호 */
    private String defrayAcnutNo;
    /* 카드CVC번호 */
    private String cvcNo;
    /* 한도금액 */
    private String lmtAmt;
    /* 한도금액2 */
    private String lmt2Amt;
    /* 비고 */
    private String rm;
    
    private String dashCardNo;
    private String cardNo1;
    private String cardNo2;
    private String cardNo3;
    private String cardNo4;

    private String deptNm;
    private String ownEmpnm;
    private String useEmpnm;
    
    
    
    
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mfsbsc004() {
        //
    }

    public Mfsbsc004(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.cardNo = StringExpression.nullConvert(egovMap.get("cardNo"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.cardNm = StringExpression.nullConvert(egovMap.get("cardNm"));
            this.cardAbrv = StringExpression.nullConvert(egovMap.get("cardAbrv"));
            this.cardIssuInstt = StringExpression.nullConvert(egovMap.get("cardIssuInstt"));
            this.cardSe = StringExpression.nullConvert(egovMap.get("cardSe"));
            this.carddetailSe = StringExpression.nullConvert(egovMap.get("carddetailSe"));
            this.cardValidYm = StringExpression.nullConvert(egovMap.get("cardValidYm"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.ownEmpno = StringExpression.nullConvert(egovMap.get("ownEmpno"));
            this.useEmpno = StringExpression.nullConvert(egovMap.get("useEmpno"));
            this.issuDe = StringExpression.nullConvert(egovMap.get("issuDe"));
            this.exprtnDe = StringExpression.nullConvert(egovMap.get("exprtnDe"));
            this.discardDe = StringExpression.nullConvert(egovMap.get("discardDe"));
            this.setleDay = StringExpression.nullConvert(egovMap.get("setleDay"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.bankCode = StringExpression.nullConvert(egovMap.get("bankCode"));
            this.defrayAcnutNo = StringExpression.nullConvert(egovMap.get("defrayAcnutNo"));
            this.cvcNo = StringExpression.nullConvert(egovMap.get("cvcNo"));
            this.lmtAmt = StringExpression.nullConvert(egovMap.get("lmtAmt"));
            this.lmt2Amt = StringExpression.nullConvert(egovMap.get("lmt2Amt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            
            this.dashCardNo = StringExpression.nullConvert(egovMap.get("dashCardNo"));
            this.cardNo1 = StringExpression.nullConvert(egovMap.get("cardNo1"));
            this.cardNo2 = StringExpression.nullConvert(egovMap.get("cardNo2"));
            this.cardNo3 = StringExpression.nullConvert(egovMap.get("cardNo3"));
            this.cardNo4 = StringExpression.nullConvert(egovMap.get("cardNo4"));
            this.deptNm = StringExpression.nullConvert(egovMap.get("deptNm"));
            this.ownEmpnm = StringExpression.nullConvert(egovMap.get("ownEmpnm"));
            this.useEmpnm = StringExpression.nullConvert(egovMap.get("useEmpnm"));
        }
    }

    public Mfsbsc004(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.cardNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.cardNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            this.cardAbrv = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.cardIssuInstt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.cardSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.carddetailSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
            this.cardValidYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
            this.ownEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c11")));
            this.useEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c12")));
            this.issuDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c13")));
            this.exprtnDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c14")));
            this.discardDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c15")));
            this.setleDay = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c16")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c17")));
            this.bankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c18")));
            this.defrayAcnutNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c19")));
            this.cvcNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c20")));
            this.lmtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c21")));
            this.lmt2Amt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c22")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c23")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getCardNo() {
        return cardNo;
    }
    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getCardNm() {
        return cardNm;
    }
    public void setCardNm(String cardNm) {
        this.cardNm = cardNm;
    }

    public String getCardAbrv() {
        return cardAbrv;
    }
    public void setCardAbrv(String cardAbrv) {
        this.cardAbrv = cardAbrv;
    }

    public String getCardIssuInstt() {
        return cardIssuInstt;
    }
    public void setCardIssuInstt(String cardIssuInstt) {
        this.cardIssuInstt = cardIssuInstt;
    }

    public String getCardSe() {
        return cardSe;
    }
    public void setCardSe(String cardSe) {
        this.cardSe = cardSe;
    }

    public String getCarddetailSe() {
        return carddetailSe;
    }
    public void setCarddetailSe(String carddetailSe) {
        this.carddetailSe = carddetailSe;
    }

    public String getCardValidYm() {
        return cardValidYm;
    }
    public void setCardValidYm(String cardValidYm) {
        this.cardValidYm = cardValidYm;
    }

    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getOwnEmpno() {
        return ownEmpno;
    }
    public void setOwnEmpno(String ownEmpno) {
        this.ownEmpno = ownEmpno;
    }

    public String getUseEmpno() {
        return useEmpno;
    }
    public void setUseEmpno(String useEmpno) {
        this.useEmpno = useEmpno;
    }

    public String getIssuDe() {
        return issuDe;
    }
    public void setIssuDe(String issuDe) {
        this.issuDe = issuDe;
    }

    public String getExprtnDe() {
        return exprtnDe;
    }
    public void setExprtnDe(String exprtnDe) {
        this.exprtnDe = exprtnDe;
    }

    public String getDiscardDe() {
        return discardDe;
    }
    public void setDiscardDe(String discardDe) {
        this.discardDe = discardDe;
    }

    public String getSetleDay() {
        return setleDay;
    }
    public void setSetleDay(String setleDay) {
        this.setleDay = setleDay;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getBankCode() {
        return bankCode;
    }
    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getDefrayAcnutNo() {
        return defrayAcnutNo;
    }
    public void setDefrayAcnutNo(String defrayAcnutNo) {
        this.defrayAcnutNo = defrayAcnutNo;
    }

    public String getCvcNo() {
        return cvcNo;
    }
    public void setCvcNo(String cvcNo) {
        this.cvcNo = cvcNo;
    }

    public String getLmtAmt() {
        return lmtAmt;
    }
    public void setLmtAmt(String lmtAmt) {
        this.lmtAmt = lmtAmt;
    }

    public String getLmt2Amt() {
        return lmt2Amt;
    }
    public void setLmt2Amt(String lmt2Amt) {
        this.lmt2Amt = lmt2Amt;
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

    public String getCardNo1() {
        return cardNo1;
    }

    public void setCardNo1(String cardNo1) {
        this.cardNo1 = cardNo1;
    }

    public String getCardNo2() {
        return cardNo2;
    }

    public void setCardNo2(String cardNo2) {
        this.cardNo2 = cardNo2;
    }

    public String getCardNo3() {
        return cardNo3;
    }

    public void setCardNo3(String cardNo3) {
        this.cardNo3 = cardNo3;
    }

    public String getCardNo4() {
        return cardNo4;
    }

    public void setCardNo4(String cardNo4) {
        this.cardNo4 = cardNo4;
    }

    public String getOwnEmpnm() {
        return ownEmpnm;
    }

    public void setOwnEmpnm(String ownEmpnm) {
        this.ownEmpnm = ownEmpnm;
    }

    public String getUseEmpnm() {
        return useEmpnm;
    }

    public void setUseEmpnm(String useEmpnm) {
        this.useEmpnm = useEmpnm;
    }

    public String getDeptNm() {
        return deptNm;
    }

    public void setDeptNm(String deptNm) {
        this.deptNm = deptNm;
    }

    public String getDashCardNo() {
        return dashCardNo;
    }

    public void setDashCardNo(String dashCardNo) {
        this.dashCardNo = dashCardNo;
    }
}
