package kr.co.dbvision.api.mps.ern.mpsern008.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 소득자별소득현황관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.18
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.18          디비비전              최초 생성
 * </pre>
 */

public class Mpsern008 extends CommonVO {

    /* 증빙번호 */
    private String evidSn;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 소득자 번호 */
    private String earnerNo;
    /* 지급년월 */
    private String pymntYm;
    /* 결의 번호 */
    private String attrNo;
    /* 소득 종류코드 */
    private String incomeKindCode;
    /* 지급 금액 */
    private String pymntAmt;
    /* 필요 세율 */
    private String needRate;
    /* 필요 경비 */
    private String needExpens;
    /* 소득 금액 */
    private String incomeAmt;
    /* 소득세 율 */
    private String incmtaxRt;
    /* 소득세 */
    private String incmtax;
    /* 주민세 */
    private String residenttax;
    /* 법인세 */
    private String cprtax;
    /* 농특세 */
    private String agsptax;
    /* 실제지급금액 */
    private String realPymntAmt;
    /* 지급일자 */
    private String pymntDe;
    /* 지급사유내용 */
    private String pymntResnCn;
    /* 소득시작일자 */
    private String incomeSdt;
    /* 소득종료일자 */
    private String incomeEdt;
    /* 계좌번호 */
    private String acnutNo;
    /* 은행코드 */
    private String bankCode;
    /* 예금주명 */
    private String dpstrnm;
    /* 마감여부 */
    private String closAt;
    /* 신고여부 */
    private String sttemntAt;
    /* 전자결재 상태코드 */
    private String elctsctSttuscode;
    /* 전자결재 문서번호 */
    private String elctsctDocNo;
    /* 전자결재 사원번호 */
    private String elctsctEmpno;
    /* 등록 일시 */
    private String regDt;
    /* 등록 ID */
    private String regId;
    /* 수정 일시 */
    private String uptDt;
    /* 수정 ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsern008() {
        //
    }

    public Mpsern008(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.evidSn = StringExpression.nullConvert(egovMap.get("evidSn"));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.earnerNo = StringExpression.nullConvert(egovMap.get("earnerNo"));
            this.pymntYm = StringExpression.nullConvert(egovMap.get("pymntYm"));
            this.attrNo = StringExpression.nullConvert(egovMap.get("attrNo"));
            this.incomeKindCode = StringExpression.nullConvert(egovMap.get("incomeKindCode"));
            this.pymntAmt = StringExpression.nullConvert(egovMap.get("pymntAmt"));
            this.needRate = StringExpression.nullConvert(egovMap.get("needRate"));
            this.needExpens = StringExpression.nullConvert(egovMap.get("needExpens"));
            this.incomeAmt = StringExpression.nullConvert(egovMap.get("incomeAmt"));
            this.incmtaxRt = StringExpression.nullConvert(egovMap.get("incmtaxRt"));
            this.incmtax = StringExpression.nullConvert(egovMap.get("incmtax"));
            this.residenttax = StringExpression.nullConvert(egovMap.get("residenttax"));
            this.cprtax = StringExpression.nullConvert(egovMap.get("cprtax"));
            this.agsptax = StringExpression.nullConvert(egovMap.get("agsptax"));
            this.realPymntAmt = StringExpression.nullConvert(egovMap.get("realPymntAmt"));
            this.pymntDe = StringExpression.nullConvert(egovMap.get("pymntDe"));
            this.pymntResnCn = StringExpression.nullConvert(egovMap.get("pymntResnCn"));
            this.incomeSdt = StringExpression.nullConvert(egovMap.get("incomeSdt"));
            this.incomeEdt = StringExpression.nullConvert(egovMap.get("incomeEdt"));
            this.acnutNo = StringExpression.nullConvert(egovMap.get("acnutNo"));
            this.bankCode = StringExpression.nullConvert(egovMap.get("bankCode"));
            this.dpstrnm = StringExpression.nullConvert(egovMap.get("dpstrnm"));
            this.closAt = StringExpression.nullConvert(egovMap.get("closAt"));
            this.sttemntAt = StringExpression.nullConvert(egovMap.get("sttemntAt"));
            this.elctsctSttuscode = StringExpression.nullConvert(egovMap.get("elctsctSttuscode"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mpsern008(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.evidSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_evidSn")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.earnerNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_earnerNo")));
            this.pymntYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntYm")));
            this.attrNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_attrNo")));
            this.incomeKindCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incomeKindCode")));
            this.pymntAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntAmt")));
            this.needRate = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_needRate")));
            this.needExpens = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_needExpens")));
            this.incomeAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incomeAmt")));
            this.incmtaxRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incmtaxRt")));
            this.incmtax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incmtax")));
            this.residenttax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_residenttax")));
            this.cprtax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cprtax")));
            this.agsptax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_agsptax")));
            this.realPymntAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_realPymntAmt")));
            this.pymntDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntDe")));
            this.pymntResnCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntResnCn")));
            this.incomeSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incomeSdt")));
            this.incomeEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incomeEdt")));
            this.acnutNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutNo")));
            this.bankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bankCode")));
            this.dpstrnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dpstrnm")));
            this.closAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_closAt")));
            this.sttemntAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sttemntAt")));
            this.elctsctSttuscode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttuscode")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getEvidSn() {
        return evidSn;
    }
    public void setEvidSn(String evidSn) {
        this.evidSn = evidSn;
    }

    public String getElctsctSeSn() {
        return elctsctSeSn;
    }
    public void setElctsctSeSn(String elctsctSeSn) {
        this.elctsctSeSn = elctsctSeSn;
    }

    public String getEarnerNo() {
        return earnerNo;
    }
    public void setEarnerNo(String earnerNo) {
        this.earnerNo = earnerNo;
    }

    public String getPymntYm() {
        return pymntYm;
    }
    public void setPymntYm(String pymntYm) {
        this.pymntYm = pymntYm;
    }

    public String getAttrNo() {
        return attrNo;
    }
    public void setAttrNo(String attrNo) {
        this.attrNo = attrNo;
    }

    public String getIncomeKindCode() {
        return incomeKindCode;
    }
    public void setIncomeKindCode(String incomeKindCode) {
        this.incomeKindCode = incomeKindCode;
    }

    public String getPymntAmt() {
        return pymntAmt;
    }
    public void setPymntAmt(String pymntAmt) {
        this.pymntAmt = pymntAmt;
    }

    public String getNeedRate() {
        return needRate;
    }
    public void setNeedRate(String needRate) {
        this.needRate = needRate;
    }

    public String getNeedExpens() {
        return needExpens;
    }
    public void setNeedExpens(String needExpens) {
        this.needExpens = needExpens;
    }

    public String getIncomeAmt() {
        return incomeAmt;
    }
    public void setIncomeAmt(String incomeAmt) {
        this.incomeAmt = incomeAmt;
    }

    public String getIncmtaxRt() {
        return incmtaxRt;
    }
    public void setIncmtaxRt(String incmtaxRt) {
        this.incmtaxRt = incmtaxRt;
    }

    public String getIncmtax() {
        return incmtax;
    }
    public void setIncmtax(String incmtax) {
        this.incmtax = incmtax;
    }

    public String getResidenttax() {
        return residenttax;
    }
    public void setResidenttax(String residenttax) {
        this.residenttax = residenttax;
    }

    public String getCprtax() {
        return cprtax;
    }
    public void setCprtax(String cprtax) {
        this.cprtax = cprtax;
    }

    public String getAgsptax() {
        return agsptax;
    }
    public void setAgsptax(String agsptax) {
        this.agsptax = agsptax;
    }

    public String getRealPymntAmt() {
        return realPymntAmt;
    }
    public void setRealPymntAmt(String realPymntAmt) {
        this.realPymntAmt = realPymntAmt;
    }

    public String getPymntDe() {
        return pymntDe;
    }
    public void setPymntDe(String pymntDe) {
        this.pymntDe = pymntDe;
    }

    public String getPymntResnCn() {
        return pymntResnCn;
    }
    public void setPymntResnCn(String pymntResnCn) {
        this.pymntResnCn = pymntResnCn;
    }

    public String getIncomeSdt() {
        return incomeSdt;
    }
    public void setIncomeSdt(String incomeSdt) {
        this.incomeSdt = incomeSdt;
    }

    public String getIncomeEdt() {
        return incomeEdt;
    }
    public void setIncomeEdt(String incomeEdt) {
        this.incomeEdt = incomeEdt;
    }

    public String getAcnutNo() {
        return acnutNo;
    }
    public void setAcnutNo(String acnutNo) {
        this.acnutNo = acnutNo;
    }

    public String getBankCode() {
        return bankCode;
    }
    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getDpstrnm() {
        return dpstrnm;
    }
    public void setDpstrnm(String dpstrnm) {
        this.dpstrnm = dpstrnm;
    }

    public String getClosAt() {
        return closAt;
    }
    public void setClosAt(String closAt) {
        this.closAt = closAt;
    }

    public String getSttemntAt() {
        return sttemntAt;
    }
    public void setSttemntAt(String sttemntAt) {
        this.sttemntAt = sttemntAt;
    }

    public String getElctsctSttuscode() {
        return elctsctSttuscode;
    }
    public void setElctsctSttuscode(String elctsctSttuscode) {
        this.elctsctSttuscode = elctsctSttuscode;
    }

    public String getElctsctDocNo() {
        return elctsctDocNo;
    }
    public void setElctsctDocNo(String elctsctDocNo) {
        this.elctsctDocNo = elctsctDocNo;
    }

    public String getElctsctEmpno() {
        return elctsctEmpno;
    }
    public void setElctsctEmpno(String elctsctEmpno) {
        this.elctsctEmpno = elctsctEmpno;
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
