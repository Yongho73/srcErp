package kr.co.dbvision.api.stm.mng.stmmng011.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 프로그램개선요청관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.03          디비비전              최초 생성
 * </pre>
 */

public class Stmmng011 extends CommonVO {

    /* 개선요청일련번 */
    private String imprvmrequstSn;
    /* 업무분류코드(C001) */
    private String jobClsCode;
    /* 요청구분코드(C100) */
    private String requstSeCode;
    /* 진행상태코드(C099) */
    private String progrsSttusCode;
    /* 우선 순위 C923 */
    private String priorRank;
    /* 프로그램ID */
    private String progrmId;
    /* 프로그명 */
    private String progrmNm;
    /* 요청자 */
    private String rqester;
    /* 요청일자 */
    private String requstDe;
    /* 처리예정일자 */
    private String processPdt;
    /* 확인일자 */
    private String confirmDe;
    /* 접수일 */
    private String rceptDe;
    /* 완료일 */
    private String comptDe;
    /* 담당 */
    private String charger;
    /* 첨부파일번호 */
    private String atchmnflNo;
    /* 요청사 */
    private String requstDesc;
    /* 처리내 */
    private String processCn;
    /* 등록일자 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일자 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 기각 사유 코드(C194) */
    private String dsmsslResnCode;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmmng011() {
        //
    }

    public Stmmng011(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.imprvmrequstSn = StringExpression.nullConvert(egovMap.get("imprvmrequstSn"));
            this.jobClsCode = StringExpression.nullConvert(egovMap.get("jobClsCode"));
            this.requstSeCode = StringExpression.nullConvert(egovMap.get("requstSeCode"));
            this.progrsSttusCode = StringExpression.nullConvert(egovMap.get("progrsSttusCode"));
            this.priorRank = StringExpression.nullConvert(egovMap.get("priorRank"));
            this.progrmId = StringExpression.nullConvert(egovMap.get("progrmId"));
            this.progrmNm = StringExpression.nullConvert(egovMap.get("progrmNm"));
            this.rqester = StringExpression.nullConvert(egovMap.get("rqester"));
            this.requstDe = StringExpression.nullConvert(egovMap.get("requstDe"));
            this.processPdt = StringExpression.nullConvert(egovMap.get("processPdt"));
            this.confirmDe = StringExpression.nullConvert(egovMap.get("confirmDe"));
            this.rceptDe = StringExpression.nullConvert(egovMap.get("rceptDe"));
            this.comptDe = StringExpression.nullConvert(egovMap.get("comptDe"));
            this.charger = StringExpression.nullConvert(egovMap.get("charger"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.requstDesc = StringExpression.nullConvert(egovMap.get("requstDesc"));
            this.processCn = StringExpression.nullConvert(egovMap.get("processCn"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.dsmsslResnCode = StringExpression.nullConvert(egovMap.get("dsmsslResnCode"));
        }
    }

    public Stmmng011(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.imprvmrequstSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_imprvmrequstSn")));
            this.jobClsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jobClsCode")));
            this.requstSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstSeCode")));
            this.progrsSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_progrsSttusCode")));
            this.priorRank = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_priorRank")));
            this.progrmId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_progrmId")));
            this.progrmNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_progrmNm")));
            this.rqester = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rqester")));
            this.requstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstDe")));
            this.processPdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_processPdt")));
            this.confirmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confirmDe")));
            this.rceptDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rceptDe")));
            this.comptDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_comptDe")));
            this.charger = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_charger")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.requstDesc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstDesc")));
            this.processCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_processCn")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.dsmsslResnCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dsmsslResnCode")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getImprvmrequstSn() {
        return imprvmrequstSn;
    }
    public void setImprvmrequstSn(String imprvmrequstSn) {
        this.imprvmrequstSn = imprvmrequstSn;
    }

    public String getJobClsCode() {
        return jobClsCode;
    }
    public void setJobClsCode(String jobClsCode) {
        this.jobClsCode = jobClsCode;
    }

    public String getRequstSeCode() {
        return requstSeCode;
    }
    public void setRequstSeCode(String requstSeCode) {
        this.requstSeCode = requstSeCode;
    }

    public String getProgrsSttusCode() {
        return progrsSttusCode;
    }
    public void setProgrsSttusCode(String progrsSttusCode) {
        this.progrsSttusCode = progrsSttusCode;
    }

    public String getPriorRank() {
        return priorRank;
    }
    public void setPriorRank(String priorRank) {
        this.priorRank = priorRank;
    }

    public String getProgrmId() {
        return progrmId;
    }
    public void setProgrmId(String progrmId) {
        this.progrmId = progrmId;
    }

    public String getProgrmNm() {
        return progrmNm;
    }
    public void setProgrmNm(String progrmNm) {
        this.progrmNm = progrmNm;
    }

    public String getRqester() {
        return rqester;
    }
    public void setRqester(String rqester) {
        this.rqester = rqester;
    }

    public String getRequstDe() {
        return requstDe;
    }
    public void setRequstDe(String requstDe) {
        this.requstDe = requstDe;
    }

    public String getProcessPdt() {
        return processPdt;
    }
    public void setProcessPdt(String processPdt) {
        this.processPdt = processPdt;
    }

    public String getConfirmDe() {
        return confirmDe;
    }
    public void setConfirmDe(String confirmDe) {
        this.confirmDe = confirmDe;
    }

    public String getRceptDe() {
        return rceptDe;
    }
    public void setRceptDe(String rceptDe) {
        this.rceptDe = rceptDe;
    }

    public String getComptDe() {
        return comptDe;
    }
    public void setComptDe(String comptDe) {
        this.comptDe = comptDe;
    }

    public String getCharger() {
        return charger;
    }
    public void setCharger(String charger) {
        this.charger = charger;
    }

    public String getAtchmnflNo() {
        return atchmnflNo;
    }
    public void setAtchmnflNo(String atchmnflNo) {
        this.atchmnflNo = atchmnflNo;
    }

    public String getRequstDesc() {
        return requstDesc;
    }
    public void setRequstDesc(String requstDesc) {
        this.requstDesc = requstDesc;
    }

    public String getProcessCn() {
        return processCn;
    }
    public void setProcessCn(String processCn) {
        this.processCn = processCn;
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

    public String getDsmsslResnCode() {
        return dsmsslResnCode;
    }
    public void setDsmsslResnCode(String dsmsslResnCode) {
        this.dsmsslResnCode = dsmsslResnCode;
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
