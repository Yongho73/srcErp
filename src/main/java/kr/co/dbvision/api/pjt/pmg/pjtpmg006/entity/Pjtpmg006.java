package kr.co.dbvision.api.pjt.pmg.pjtpmg006.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 프로젝트예산집행현황관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2021.04.21
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.04.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.04.21          디비비전              최초 생성
 * </pre>
 */

public class Pjtpmg006 extends CommonVO {

    /* 프로젝트 순번 */
    private String projectSn;
    /* 예산 실적 순번 */
    private String bugtAcmsltSn;
    /* 계정 코드 */
    private String acntCode;
    /* 원가 유형 */
    private String prmpcTy;
    /* 예산 제목 */
    private String bugtTit;
    /* 사용 금액 */
    private String useAmt;
    /* 사용 적요 */
    private String useSummary;
    /* 예산 사용일시 */
    private String bugtUsedt;
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

    public Pjtpmg006() {
        //
    }

    public Pjtpmg006(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.projectSn = StringExpression.nullConvert(egovMap.get("projectSn"));
            this.bugtAcmsltSn = StringExpression.nullConvert(egovMap.get("bugtAcmsltSn"));
            this.acntCode = StringExpression.nullConvert(egovMap.get("acntCode"));
            this.prmpcTy = StringExpression.nullConvert(egovMap.get("prmpcTy"));
            this.bugtTit = StringExpression.nullConvert(egovMap.get("bugtTit"));
            this.useAmt = StringExpression.nullConvert(egovMap.get("useAmt"));
            this.useSummary = StringExpression.nullConvert(egovMap.get("useSummary"));
            this.bugtUsedt = StringExpression.nullConvert(egovMap.get("bugtUsedt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Pjtpmg006(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.projectSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_projectSn")));
            this.bugtAcmsltSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bugtAcmsltSn")));
            this.acntCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acntCode")));
            this.prmpcTy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prmpcTy")));
            this.bugtTit = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bugtTit")));
            this.useAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAmt")));
            this.useSummary = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useSummary")));
            this.bugtUsedt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bugtUsedt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getProjectSn() {
        return projectSn;
    }
    public void setProjectSn(String projectSn) {
        this.projectSn = projectSn;
    }

    public String getBugtAcmsltSn() {
        return bugtAcmsltSn;
    }
    public void setBugtAcmsltSn(String bugtAcmsltSn) {
        this.bugtAcmsltSn = bugtAcmsltSn;
    }

    public String getAcntCode() {
        return acntCode;
    }
    public void setAcntCode(String acntCode) {
        this.acntCode = acntCode;
    }

    public String getPrmpcTy() {
        return prmpcTy;
    }
    public void setPrmpcTy(String prmpcTy) {
        this.prmpcTy = prmpcTy;
    }

    public String getBugtTit() {
        return bugtTit;
    }
    public void setBugtTit(String bugtTit) {
        this.bugtTit = bugtTit;
    }

    public String getUseAmt() {
        return useAmt;
    }
    public void setUseAmt(String useAmt) {
        this.useAmt = useAmt;
    }

    public String getUseSummary() {
        return useSummary;
    }
    public void setUseSummary(String useSummary) {
        this.useSummary = useSummary;
    }

    public String getBugtUsedt() {
        return bugtUsedt;
    }
    public void setBugtUsedt(String bugtUsedt) {
        this.bugtUsedt = bugtUsedt;
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
