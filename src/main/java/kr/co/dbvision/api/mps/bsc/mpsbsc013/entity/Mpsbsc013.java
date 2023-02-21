package kr.co.dbvision.api.mps.bsc.mpsbsc013.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 사회보험요율관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.06.12
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.12          디비비전              최초 생성
 * </pre>
 */

public class Mpsbsc013 extends CommonVO {

    /* 적용 년도 */
    private String applcYy;
    /* 변경 일자 */
    private String changeDe;
    /* 생활임금 기준금액 */
    private String lvwageStdramt;
    /* 연차 수당 요율 */
    private String wrycAllwncTariff;
    /* 시간외 수당 요율 */
    private String ovtimeAllwncTariff;
    /* 휴근무 수당 요율 */
    private String hvofworkAllwncTariff;
    /* 야간근무 수당 요율 */
    private String nworkAllwncTariff;
    
    /* 국민연금 근로자 비율 */
    private String npnLabrrRt;
    /* 국민연금 사업자 비율 */
    private String npnBsnmRt;
    /* 국민연금 상한 금액 */
    private String npnUplmtAmt;
    /* 건강보험 근로자 비율 */
    private String hlthinsLabrrRt;
    /* 건강보험 사업자 비율 */
    private String hlthinsBsnmRt;
    /* 장기요양보험 건강보험 비율 */
    private String ltciHlthinsRt;
    /* 장기요양보험 근로자 비율 */
    private String ltciLabrrRt;
    /* 장기요양보험 사업자 비율 */
    private String ltciBsnmRt;
    /* 고용보험 근로자 비율 */
    private String episLabrrRt;
    /* 고용보험 사업자 비율 */
    private String episBsnmRt;
    /* 고용보험 부담금 (사업주 부담금외에 추가 부담금) */
    private String episAlotm;
    /* 산재보험 요율 */
    private String iaciTariff;
    /* 국민연금 하한 금액 */
    private String npnLwltAmt;
    /* 건강보험 하한 금액 */
    private String hlthinsLwltAmt;
    /* 건강보험 상한 금액 */
    private String hlthinsUplmtAmt;
    
    /* 퇴직일 포함 여부 */
    private String retiredayInclsAt;
    /* 월 기준 일수 */
    private String mtStdrDaycnt;
    /* 평균임금계산 구분 코드 */
    private String avrgwagecalcSeCode;
    /* 상여계산 구분 코드 */
    private String bnscalcSeCode;
    /* 퇴직계산 구분 코드 */
    private String retirecalcSeCode;
    
    /* 등록 일시 */
    private String regDt;
    /* 등록자 ID */
    private String regId;
    /* 수정 일시 */
    private String uptDt;
    /* 수정자 ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbsc013() {
        //
    }

    public Mpsbsc013(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYy = StringExpression.nullConvert(egovMap.get("applcYy"));
            this.changeDe = StringExpression.nullConvert(egovMap.get("changeDe"));
            this.lvwageStdramt = StringExpression.nullConvert(egovMap.get("lvwageStdramt"));
            this.wrycAllwncTariff = StringExpression.nullConvert(egovMap.get("wrycAllwncTariff"));
            this.ovtimeAllwncTariff = StringExpression.nullConvert(egovMap.get("ovtimeAllwncTariff"));
            this.hvofworkAllwncTariff = StringExpression.nullConvert(egovMap.get("hvofworkAllwncTariff"));
            this.nworkAllwncTariff = StringExpression.nullConvert(egovMap.get("nworkAllwncTariff"));
            
            this.npnLabrrRt = StringExpression.nullConvert(egovMap.get("npnLabrrRt"));
            this.npnBsnmRt = StringExpression.nullConvert(egovMap.get("npnBsnmRt"));
            this.npnUplmtAmt = StringExpression.nullConvert(egovMap.get("npnUplmtAmt"));
            this.hlthinsLabrrRt = StringExpression.nullConvert(egovMap.get("hlthinsLabrrRt"));
            this.hlthinsBsnmRt = StringExpression.nullConvert(egovMap.get("hlthinsBsnmRt"));
            this.ltciHlthinsRt = StringExpression.nullConvert(egovMap.get("ltciHlthinsRt"));
            this.ltciLabrrRt = StringExpression.nullConvert(egovMap.get("ltciLabrrRt"));
            this.ltciBsnmRt = StringExpression.nullConvert(egovMap.get("ltciBsnmRt"));
            this.episLabrrRt = StringExpression.nullConvert(egovMap.get("episLabrrRt"));
            this.episBsnmRt = StringExpression.nullConvert(egovMap.get("episBsnmRt"));
            this.episAlotm = StringExpression.nullConvert(egovMap.get("episAlotm"));
            this.iaciTariff = StringExpression.nullConvert(egovMap.get("iaciTariff"));
            this.npnLwltAmt = StringExpression.nullConvert(egovMap.get("npnLwltAmt"));
            this.hlthinsLwltAmt = StringExpression.nullConvert(egovMap.get("hlthinsLwltAmt"));
            this.hlthinsUplmtAmt = StringExpression.nullConvert(egovMap.get("hlthinsUplmtAmt"));
            
            this.retiredayInclsAt = StringExpression.nullConvert(egovMap.get("retiredayInclsAt"));
            this.mtStdrDaycnt = StringExpression.nullConvert(egovMap.get("mtStdrDaycnt"));
            this.avrgwagecalcSeCode = StringExpression.nullConvert(egovMap.get("avrgwagecalcSeCode"));
            this.bnscalcSeCode = StringExpression.nullConvert(egovMap.get("bnscalcSeCode"));
            this.retirecalcSeCode = StringExpression.nullConvert(egovMap.get("retirecalcSeCode"));
            
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mpsbsc013(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYy")));
            this.changeDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_changeDe")));
            this.lvwageStdramt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lvwageStdramt")));
            this.wrycAllwncTariff = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycAllwncTariff")));
            this.ovtimeAllwncTariff = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ovtimeAllwncTariff")));
            this.hvofworkAllwncTariff = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hvofworkAllwncTariff")));
            this.nworkAllwncTariff = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nworkAllwncTariff")));
            
            this.npnLabrrRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnLabrrRt")));
            this.npnBsnmRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnBsnmRt")));
            this.npnUplmtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnUplmtAmt")));
            this.hlthinsLabrrRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hlthinsLabrrRt")));
            this.hlthinsBsnmRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hlthinsBsnmRt")));
            this.ltciHlthinsRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ltciHlthinsRt")));
            this.ltciLabrrRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ltciLabrrRt")));
            this.ltciBsnmRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ltciBsnmRt")));
            this.episLabrrRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episLabrrRt")));
            this.episBsnmRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episBsnmRt")));
            this.episAlotm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episAlotm")));
            this.iaciTariff = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_iaciTariff")));
            this.npnLwltAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnLwltAmt")));
            this.hlthinsLwltAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hlthinsLwltAmt")));
            this.hlthinsUplmtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hlthinsUplmtAmt")));
            
            this.retiredayInclsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retiredayInclsAt")));
            this.mtStdrDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mtStdrDaycnt")));
            this.avrgwagecalcSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_avrgwagecalcSeCode")));
            this.bnscalcSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bnscalcSeCode")));
            this.retirecalcSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retirecalcSeCode")));
            
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getApplcYy() {
        return applcYy;
    }
    public void setApplcYy(String applcYy) {
        this.applcYy = applcYy;
    }

    public String getChangeDe() {
        return changeDe;
    }
    public void setChangeDe(String changeDe) {
        this.changeDe = changeDe;
    }

    public String getLvwageStdramt() {
        return lvwageStdramt;
    }
    public void setLvwageStdramt(String lvwageStdramt) {
        this.lvwageStdramt = lvwageStdramt;
    }

    public String getWrycAllwncTariff() {
        return wrycAllwncTariff;
    }
    public void setWrycAllwncTariff(String wrycAllwncTariff) {
        this.wrycAllwncTariff = wrycAllwncTariff;
    }

    public String getOvtimeAllwncTariff() {
        return ovtimeAllwncTariff;
    }
    public void setOvtimeAllwncTariff(String ovtimeAllwncTariff) {
        this.ovtimeAllwncTariff = ovtimeAllwncTariff;
    }

    public String getHvofworkAllwncTariff() {
        return hvofworkAllwncTariff;
    }
    public void setHvofworkAllwncTariff(String hvofworkAllwncTariff) {
        this.hvofworkAllwncTariff = hvofworkAllwncTariff;
    }

    public String getNworkAllwncTariff() {
        return nworkAllwncTariff;
    }
    public void setNworkAllwncTariff(String nworkAllwncTariff) {
        this.nworkAllwncTariff = nworkAllwncTariff;
    }
    
    

    public String getNpnLabrrRt() {
        return npnLabrrRt;
    }
    public void setNpnLabrrRt(String npnLabrrRt) {
        this.npnLabrrRt = npnLabrrRt;
    }

    public String getNpnBsnmRt() {
        return npnBsnmRt;
    }
    public void setNpnBsnmRt(String npnBsnmRt) {
        this.npnBsnmRt = npnBsnmRt;
    }

    public String getNpnUplmtAmt() {
        return npnUplmtAmt;
    }
    public void setNpnUplmtAmt(String npnUplmtAmt) {
        this.npnUplmtAmt = npnUplmtAmt;
    }

    public String getHlthinsLabrrRt() {
        return hlthinsLabrrRt;
    }
    public void setHlthinsLabrrRt(String hlthinsLabrrRt) {
        this.hlthinsLabrrRt = hlthinsLabrrRt;
    }

    public String getHlthinsBsnmRt() {
        return hlthinsBsnmRt;
    }
    public void setHlthinsBsnmRt(String hlthinsBsnmRt) {
        this.hlthinsBsnmRt = hlthinsBsnmRt;
    }

    public String getLtciHlthinsRt() {
        return ltciHlthinsRt;
    }
    public void setLtciHlthinsRt(String ltciHlthinsRt) {
        this.ltciHlthinsRt = ltciHlthinsRt;
    }

    public String getLtciLabrrRt() {
        return ltciLabrrRt;
    }
    public void setLtciLabrrRt(String ltciLabrrRt) {
        this.ltciLabrrRt = ltciLabrrRt;
    }

    public String getLtciBsnmRt() {
        return ltciBsnmRt;
    }
    public void setLtciBsnmRt(String ltciBsnmRt) {
        this.ltciBsnmRt = ltciBsnmRt;
    }

    public String getEpisLabrrRt() {
        return episLabrrRt;
    }
    public void setEpisLabrrRt(String episLabrrRt) {
        this.episLabrrRt = episLabrrRt;
    }

    public String getEpisBsnmRt() {
        return episBsnmRt;
    }
    public void setEpisBsnmRt(String episBsnmRt) {
        this.episBsnmRt = episBsnmRt;
    }

    public String getEpisAlotm() {
        return episAlotm;
    }
    public void setEpisAlotm(String episAlotm) {
        this.episAlotm = episAlotm;
    }

    public String getIaciTariff() {
        return iaciTariff;
    }
    public void setIaciTariff(String iaciTariff) {
        this.iaciTariff = iaciTariff;
    }

    public String getNpnLwltAmt() {
        return npnLwltAmt;
    }
    public void setNpnLwltAmt(String npnLwltAmt) {
        this.npnLwltAmt = npnLwltAmt;
    }

    public String getHlthinsLwltAmt() {
        return hlthinsLwltAmt;
    }
    public void setHlthinsLwltAmt(String hlthinsLwltAmt) {
        this.hlthinsLwltAmt = hlthinsLwltAmt;
    }

    public String getHlthinsUplmtAmt() {
        return hlthinsUplmtAmt;
    }
    public void setHlthinsUplmtAmt(String hlthinsUplmtAmt) {
        this.hlthinsUplmtAmt = hlthinsUplmtAmt;
    }
    
    
    


    public String getRetiredayInclsAt() {
        return retiredayInclsAt;
    }
    public void setRetiredayInclsAt(String retiredayInclsAt) {
        this.retiredayInclsAt = retiredayInclsAt;
    }

    public String getMtStdrDaycnt() {
        return mtStdrDaycnt;
    }
    public void setMtStdrDaycnt(String mtStdrDaycnt) {
        this.mtStdrDaycnt = mtStdrDaycnt;
    }

    public String getAvrgwagecalcSeCode() {
        return avrgwagecalcSeCode;
    }
    public void setAvrgwagecalcSeCode(String avrgwagecalcSeCode) {
        this.avrgwagecalcSeCode = avrgwagecalcSeCode;
    }

    public String getBnscalcSeCode() {
        return bnscalcSeCode;
    }
    public void setBnscalcSeCode(String bnscalcSeCode) {
        this.bnscalcSeCode = bnscalcSeCode;
    }

    public String getRetirecalcSeCode() {
        return retirecalcSeCode;
    }
    public void setRetirecalcSeCode(String retirecalcSeCode) {
        this.retirecalcSeCode = retirecalcSeCode;
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
