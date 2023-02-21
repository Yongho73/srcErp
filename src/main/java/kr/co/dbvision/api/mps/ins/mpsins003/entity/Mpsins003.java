package kr.co.dbvision.api.mps.ins.mpsins003.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 사회보험 자격취득관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.04          디비비전              최초 생성
 * </pre>
 */

public class Mpsins003 extends CommonVO {

    /* 신고일자 */
    private String sttemntDe;
    /* 사원번호 */
    private String empno;
    /* 국민연금취득일자 */
    private String npnAcqsDe;
    /* 건강보험취득일자 */
    private String hlthinsAcqsDe;
    /* 고용보험 취득 일자 */
    private String episAcqsDe;
    /* 국민연금 여부 */
    private String npnAt;
    /* 건강보험 여부 */
    private String hlthinsAt;
    /* 고용보험 여부 */
    private String episAt;
    /* 산재보험 여부 */
    private String iaciAt;
    /* 처리 여부 */
    private String processAt;
    /* 보수월액국민연금 금액 */
    private String marmNpnAmt;
    /* 국민연금 근로자 금액 */
    private String npnLabrrAmt;
    /* 국민연금 사업주 금액 */
    private String npnBprprrAmt;
    /* 보수월액건강보험 금액 */
    private String marmHisrAmt;
    /* 건강 근로자 금액 */
    private String healthLabrrAmt;
    /* 건강 사업주 금액 */
    private String healthBprprrAmt;
    /* 요양 근로자 금액 */
    private String rcperLabrrAmt;
    /* 요양 사업주 금액 */
    private String rcperBprprrAmt;
    /* 보수월액고용보험 금액 */
    private String marmEpisAmt;
    /* 고용 근로자 금액 */
    private String laborLabrrAmt;
    /* 고용 사업주 금액 */
    private String laborBprprrAmt;
    /* 고용 안정 금액 */
    private String laborStableAmt;
    /* 산재보험 사업주 금액 */
    private String iaciBprprrAmt;
    /* 보수월액 전년도 금액 */
    private String mnthlyAmtBeyearAmt;
    /* 보수월액 월 */
    private String mnthlyAmtMt;
    /* 장기요양보험감면 여부 */
    private String ltciRdcxptAt;
    /* 국민연금 유예 여부 */
    private String npnPostpneAt;
    /* 건강보험 유예 여부 */
    private String hlthinsPostpneAt;
    /* 고용보험 유예 여부 */
    private String episPostpneAt;
    /* 산재보험 유예 여부 */
    private String iaciPostpneAt;
    /* 무급 기산 일자 */
    private String unpaidRecknDe;
    /* 납부 재개 일자 */
    private String payReDe;
    /* 월소득 금액 */
    private String mtincomeAmt;
    /* 미신고 사유 내용 */
    private String mondeclResnCn;
    /* 유예 사유 내용 */
    private String postpneResnCn;
    /* 유예 시작일자 */
    private String postpneSdt;
    /* 유예 종료일자 */
    private String postpneEdt;
    /* 유예 해지일자 */
    private String postpneTrmnatde;
    /* 변경전 내용 */
    private String bfchgCn;
    /* 변경후 내용 */
    private String afchgCn;
    /* 보험 취소 번호 */
    private String insrncCancelNo;
    /* 납부유예 구분 코드 */
    private String paypostpneSeCode;
    /* 변경 구분 코드 */
    private String changeSeCode;
    /* 변경 보험 코드 */
    private String changeInsrncCode;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 상실신고일자 */
    private String lostSttemntDe;
    /* 국민연금상실일자 */
    private String npnLostDe;
    /* 건강보험상실일자 */
    private String hlthinsLostDe;
    /* 고용보험상실일자 */
    private String episLostDe;
    /* 상실처리여부 */
    private String lostProcessAt;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsins003() {
        //
    }

    public Mpsins003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.sttemntDe = StringExpression.nullConvert(egovMap.get("sttemntDe"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.npnAcqsDe = StringExpression.nullConvert(egovMap.get("npnAcqsDe"));
            this.hlthinsAcqsDe = StringExpression.nullConvert(egovMap.get("hlthinsAcqsDe"));
            this.episAcqsDe = StringExpression.nullConvert(egovMap.get("episAcqsDe"));
            this.npnAt = StringExpression.nullConvert(egovMap.get("npnAt"));
            this.hlthinsAt = StringExpression.nullConvert(egovMap.get("hlthinsAt"));
            this.episAt = StringExpression.nullConvert(egovMap.get("episAt"));
            this.iaciAt = StringExpression.nullConvert(egovMap.get("iaciAt"));
            this.processAt = StringExpression.nullConvert(egovMap.get("processAt"));
            this.marmNpnAmt = StringExpression.nullConvert(egovMap.get("marmNpnAmt"));
            this.npnLabrrAmt = StringExpression.nullConvert(egovMap.get("npnLabrrAmt"));
            this.npnBprprrAmt = StringExpression.nullConvert(egovMap.get("npnBprprrAmt"));
            this.marmHisrAmt = StringExpression.nullConvert(egovMap.get("marmHisrAmt"));
            this.healthLabrrAmt = StringExpression.nullConvert(egovMap.get("healthLabrrAmt"));
            this.healthBprprrAmt = StringExpression.nullConvert(egovMap.get("healthBprprrAmt"));
            this.rcperLabrrAmt = StringExpression.nullConvert(egovMap.get("rcperLabrrAmt"));
            this.rcperBprprrAmt = StringExpression.nullConvert(egovMap.get("rcperBprprrAmt"));
            this.marmEpisAmt = StringExpression.nullConvert(egovMap.get("marmEpisAmt"));
            this.laborLabrrAmt = StringExpression.nullConvert(egovMap.get("laborLabrrAmt"));
            this.laborBprprrAmt = StringExpression.nullConvert(egovMap.get("laborBprprrAmt"));
            this.laborStableAmt = StringExpression.nullConvert(egovMap.get("laborStableAmt"));
            this.iaciBprprrAmt = StringExpression.nullConvert(egovMap.get("iaciBprprrAmt"));
            this.mnthlyAmtBeyearAmt = StringExpression.nullConvert(egovMap.get("mnthlyAmtBeyearAmt"));
            this.mnthlyAmtMt = StringExpression.nullConvert(egovMap.get("mnthlyAmtMt"));
            this.ltciRdcxptAt = StringExpression.nullConvert(egovMap.get("ltciRdcxptAt"));
            this.npnPostpneAt = StringExpression.nullConvert(egovMap.get("npnPostpneAt"));
            this.hlthinsPostpneAt = StringExpression.nullConvert(egovMap.get("hlthinsPostpneAt"));
            this.episPostpneAt = StringExpression.nullConvert(egovMap.get("episPostpneAt"));
            this.iaciPostpneAt = StringExpression.nullConvert(egovMap.get("iaciPostpneAt"));
            this.unpaidRecknDe = StringExpression.nullConvert(egovMap.get("unpaidRecknDe"));
            this.payReDe = StringExpression.nullConvert(egovMap.get("payReDe"));
            this.mtincomeAmt = StringExpression.nullConvert(egovMap.get("mtincomeAmt"));
            this.mondeclResnCn = StringExpression.nullConvert(egovMap.get("mondeclResnCn"));
            this.postpneResnCn = StringExpression.nullConvert(egovMap.get("postpneResnCn"));
            this.postpneSdt = StringExpression.nullConvert(egovMap.get("postpneSdt"));
            this.postpneEdt = StringExpression.nullConvert(egovMap.get("postpneEdt"));
            this.postpneTrmnatde = StringExpression.nullConvert(egovMap.get("postpneTrmnatde"));
            this.bfchgCn = StringExpression.nullConvert(egovMap.get("bfchgCn"));
            this.afchgCn = StringExpression.nullConvert(egovMap.get("afchgCn"));
            this.insrncCancelNo = StringExpression.nullConvert(egovMap.get("insrncCancelNo"));
            this.paypostpneSeCode = StringExpression.nullConvert(egovMap.get("paypostpneSeCode"));
            this.changeSeCode = StringExpression.nullConvert(egovMap.get("changeSeCode"));
            this.changeInsrncCode = StringExpression.nullConvert(egovMap.get("changeInsrncCode"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.lostSttemntDe = StringExpression.nullConvert(egovMap.get("lostSttemntDe"));
            this.npnLostDe = StringExpression.nullConvert(egovMap.get("npnLostDe"));
            this.hlthinsLostDe = StringExpression.nullConvert(egovMap.get("hlthinsLostDe"));
            this.episLostDe = StringExpression.nullConvert(egovMap.get("episLostDe"));
            this.lostProcessAt = StringExpression.nullConvert(egovMap.get("lostProcessAt"));
        }
    }

    public Mpsins003(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.sttemntDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sttemntDe")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.npnAcqsDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnAcqsDe")));
            this.hlthinsAcqsDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hlthinsAcqsDe")));
            this.episAcqsDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episAcqsDe")));
            this.npnAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnAt")));
            this.hlthinsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hlthinsAt")));
            this.episAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episAt")));
            this.iaciAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_iaciAt")));
            this.processAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_processAt")));
            this.marmNpnAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_marmNpnAmt")));
            this.npnLabrrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnLabrrAmt")));
            this.npnBprprrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnBprprrAmt")));
            this.marmHisrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_marmHisrAmt")));
            this.healthLabrrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_healthLabrrAmt")));
            this.healthBprprrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_healthBprprrAmt")));
            this.rcperLabrrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rcperLabrrAmt")));
            this.rcperBprprrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rcperBprprrAmt")));
            this.marmEpisAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_marmEpisAmt")));
            this.laborLabrrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_laborLabrrAmt")));
            this.laborBprprrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_laborBprprrAmt")));
            this.laborStableAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_laborStableAmt")));
            this.iaciBprprrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_iaciBprprrAmt")));
            this.mnthlyAmtBeyearAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mnthlyAmtBeyearAmt")));
            this.mnthlyAmtMt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mnthlyAmtMt")));
            this.ltciRdcxptAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ltciRdcxptAt")));
            this.npnPostpneAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnPostpneAt")));
            this.hlthinsPostpneAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hlthinsPostpneAt")));
            this.episPostpneAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episPostpneAt")));
            this.iaciPostpneAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_iaciPostpneAt")));
            this.unpaidRecknDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_unpaidRecknDe")));
            this.payReDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_payReDe")));
            this.mtincomeAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mtincomeAmt")));
            this.mondeclResnCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mondeclResnCn")));
            this.postpneResnCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_postpneResnCn")));
            this.postpneSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_postpneSdt")));
            this.postpneEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_postpneEdt")));
            this.postpneTrmnatde = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_postpneTrmnatde")));
            this.bfchgCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfchgCn")));
            this.afchgCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_afchgCn")));
            this.insrncCancelNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_insrncCancelNo")));
            this.paypostpneSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_paypostpneSeCode")));
            this.changeSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_changeSeCode")));
            this.changeInsrncCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_changeInsrncCode")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.lostSttemntDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lostSttemntDe")));
            this.npnLostDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_npnLostDe")));
            this.hlthinsLostDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hlthinsLostDe")));
            this.episLostDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_episLostDe")));
            this.lostProcessAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lostProcessAt")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getSttemntDe() {
        return sttemntDe;
    }
    public void setSttemntDe(String sttemntDe) {
        this.sttemntDe = sttemntDe;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getNpnAcqsDe() {
        return npnAcqsDe;
    }
    public void setNpnAcqsDe(String npnAcqsDe) {
        this.npnAcqsDe = npnAcqsDe;
    }

    public String getHlthinsAcqsDe() {
        return hlthinsAcqsDe;
    }
    public void setHlthinsAcqsDe(String hlthinsAcqsDe) {
        this.hlthinsAcqsDe = hlthinsAcqsDe;
    }

    public String getEpisAcqsDe() {
        return episAcqsDe;
    }
    public void setEpisAcqsDe(String episAcqsDe) {
        this.episAcqsDe = episAcqsDe;
    }

    public String getNpnAt() {
        return npnAt;
    }
    public void setNpnAt(String npnAt) {
        this.npnAt = npnAt;
    }

    public String getHlthinsAt() {
        return hlthinsAt;
    }
    public void setHlthinsAt(String hlthinsAt) {
        this.hlthinsAt = hlthinsAt;
    }

    public String getEpisAt() {
        return episAt;
    }
    public void setEpisAt(String episAt) {
        this.episAt = episAt;
    }

    public String getIaciAt() {
        return iaciAt;
    }
    public void setIaciAt(String iaciAt) {
        this.iaciAt = iaciAt;
    }

    public String getProcessAt() {
        return processAt;
    }
    public void setProcessAt(String processAt) {
        this.processAt = processAt;
    }

    public String getMarmNpnAmt() {
        return marmNpnAmt;
    }
    public void setMarmNpnAmt(String marmNpnAmt) {
        this.marmNpnAmt = marmNpnAmt;
    }

    public String getNpnLabrrAmt() {
        return npnLabrrAmt;
    }
    public void setNpnLabrrAmt(String npnLabrrAmt) {
        this.npnLabrrAmt = npnLabrrAmt;
    }

    public String getNpnBprprrAmt() {
        return npnBprprrAmt;
    }
    public void setNpnBprprrAmt(String npnBprprrAmt) {
        this.npnBprprrAmt = npnBprprrAmt;
    }

    public String getMarmHisrAmt() {
        return marmHisrAmt;
    }
    public void setMarmHisrAmt(String marmHisrAmt) {
        this.marmHisrAmt = marmHisrAmt;
    }

    public String getHealthLabrrAmt() {
        return healthLabrrAmt;
    }
    public void setHealthLabrrAmt(String healthLabrrAmt) {
        this.healthLabrrAmt = healthLabrrAmt;
    }

    public String getHealthBprprrAmt() {
        return healthBprprrAmt;
    }
    public void setHealthBprprrAmt(String healthBprprrAmt) {
        this.healthBprprrAmt = healthBprprrAmt;
    }

    public String getRcperLabrrAmt() {
        return rcperLabrrAmt;
    }
    public void setRcperLabrrAmt(String rcperLabrrAmt) {
        this.rcperLabrrAmt = rcperLabrrAmt;
    }

    public String getRcperBprprrAmt() {
        return rcperBprprrAmt;
    }
    public void setRcperBprprrAmt(String rcperBprprrAmt) {
        this.rcperBprprrAmt = rcperBprprrAmt;
    }

    public String getMarmEpisAmt() {
        return marmEpisAmt;
    }
    public void setMarmEpisAmt(String marmEpisAmt) {
        this.marmEpisAmt = marmEpisAmt;
    }

    public String getLaborLabrrAmt() {
        return laborLabrrAmt;
    }
    public void setLaborLabrrAmt(String laborLabrrAmt) {
        this.laborLabrrAmt = laborLabrrAmt;
    }

    public String getLaborBprprrAmt() {
        return laborBprprrAmt;
    }
    public void setLaborBprprrAmt(String laborBprprrAmt) {
        this.laborBprprrAmt = laborBprprrAmt;
    }

    public String getLaborStableAmt() {
        return laborStableAmt;
    }
    public void setLaborStableAmt(String laborStableAmt) {
        this.laborStableAmt = laborStableAmt;
    }

    public String getIaciBprprrAmt() {
        return iaciBprprrAmt;
    }
    public void setIaciBprprrAmt(String iaciBprprrAmt) {
        this.iaciBprprrAmt = iaciBprprrAmt;
    }

    public String getMnthlyAmtBeyearAmt() {
        return mnthlyAmtBeyearAmt;
    }
    public void setMnthlyAmtBeyearAmt(String mnthlyAmtBeyearAmt) {
        this.mnthlyAmtBeyearAmt = mnthlyAmtBeyearAmt;
    }

    public String getMnthlyAmtMt() {
        return mnthlyAmtMt;
    }
    public void setMnthlyAmtMt(String mnthlyAmtMt) {
        this.mnthlyAmtMt = mnthlyAmtMt;
    }

    public String getLtciRdcxptAt() {
        return ltciRdcxptAt;
    }
    public void setLtciRdcxptAt(String ltciRdcxptAt) {
        this.ltciRdcxptAt = ltciRdcxptAt;
    }

    public String getNpnPostpneAt() {
        return npnPostpneAt;
    }
    public void setNpnPostpneAt(String npnPostpneAt) {
        this.npnPostpneAt = npnPostpneAt;
    }

    public String getHlthinsPostpneAt() {
        return hlthinsPostpneAt;
    }
    public void setHlthinsPostpneAt(String hlthinsPostpneAt) {
        this.hlthinsPostpneAt = hlthinsPostpneAt;
    }

    public String getEpisPostpneAt() {
        return episPostpneAt;
    }
    public void setEpisPostpneAt(String episPostpneAt) {
        this.episPostpneAt = episPostpneAt;
    }

    public String getIaciPostpneAt() {
        return iaciPostpneAt;
    }
    public void setIaciPostpneAt(String iaciPostpneAt) {
        this.iaciPostpneAt = iaciPostpneAt;
    }

    public String getUnpaidRecknDe() {
        return unpaidRecknDe;
    }
    public void setUnpaidRecknDe(String unpaidRecknDe) {
        this.unpaidRecknDe = unpaidRecknDe;
    }

    public String getPayReDe() {
        return payReDe;
    }
    public void setPayReDe(String payReDe) {
        this.payReDe = payReDe;
    }

    public String getMtincomeAmt() {
        return mtincomeAmt;
    }
    public void setMtincomeAmt(String mtincomeAmt) {
        this.mtincomeAmt = mtincomeAmt;
    }

    public String getMondeclResnCn() {
        return mondeclResnCn;
    }
    public void setMondeclResnCn(String mondeclResnCn) {
        this.mondeclResnCn = mondeclResnCn;
    }

    public String getPostpneResnCn() {
        return postpneResnCn;
    }
    public void setPostpneResnCn(String postpneResnCn) {
        this.postpneResnCn = postpneResnCn;
    }

    public String getPostpneSdt() {
        return postpneSdt;
    }
    public void setPostpneSdt(String postpneSdt) {
        this.postpneSdt = postpneSdt;
    }

    public String getPostpneEdt() {
        return postpneEdt;
    }
    public void setPostpneEdt(String postpneEdt) {
        this.postpneEdt = postpneEdt;
    }

    public String getPostpneTrmnatde() {
        return postpneTrmnatde;
    }
    public void setPostpneTrmnatde(String postpneTrmnatde) {
        this.postpneTrmnatde = postpneTrmnatde;
    }

    public String getBfchgCn() {
        return bfchgCn;
    }
    public void setBfchgCn(String bfchgCn) {
        this.bfchgCn = bfchgCn;
    }

    public String getAfchgCn() {
        return afchgCn;
    }
    public void setAfchgCn(String afchgCn) {
        this.afchgCn = afchgCn;
    }

    public String getInsrncCancelNo() {
        return insrncCancelNo;
    }
    public void setInsrncCancelNo(String insrncCancelNo) {
        this.insrncCancelNo = insrncCancelNo;
    }

    public String getPaypostpneSeCode() {
        return paypostpneSeCode;
    }
    public void setPaypostpneSeCode(String paypostpneSeCode) {
        this.paypostpneSeCode = paypostpneSeCode;
    }

    public String getChangeSeCode() {
        return changeSeCode;
    }
    public void setChangeSeCode(String changeSeCode) {
        this.changeSeCode = changeSeCode;
    }

    public String getChangeInsrncCode() {
        return changeInsrncCode;
    }
    public void setChangeInsrncCode(String changeInsrncCode) {
        this.changeInsrncCode = changeInsrncCode;
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

    public String getLostSttemntDe() {
        return lostSttemntDe;
    }
    public void setLostSttemntDe(String lostSttemntDe) {
        this.lostSttemntDe = lostSttemntDe;
    }

    public String getNpnLostDe() {
        return npnLostDe;
    }
    public void setNpnLostDe(String npnLostDe) {
        this.npnLostDe = npnLostDe;
    }

    public String getHlthinsLostDe() {
        return hlthinsLostDe;
    }
    public void setHlthinsLostDe(String hlthinsLostDe) {
        this.hlthinsLostDe = hlthinsLostDe;
    }

    public String getEpisLostDe() {
        return episLostDe;
    }
    public void setEpisLostDe(String episLostDe) {
        this.episLostDe = episLostDe;
    }

    public String getLostProcessAt() {
        return lostProcessAt;
    }
    public void setLostProcessAt(String lostProcessAt) {
        this.lostProcessAt = lostProcessAt;
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
