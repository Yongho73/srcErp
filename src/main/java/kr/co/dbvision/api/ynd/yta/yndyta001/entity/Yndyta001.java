package kr.co.dbvision.api.ynd.yta.yndyta001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 연말정산자료초기화관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.02.29
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.29          디비비전              최초 생성
 * </pre>
 */

public class Yndyta001 extends CommonVO {

    /* 직원의 개인번호를 관리하기위한 항목 */
    private String empno;
    /* 귀속년도 */
    private String belongYy;
    /* 정산년월 13월이면 연말정산이고, 그외 월은 중도퇴사 연말정산 */
    private String calcYm;
    /* 성명 */
    private String korNm;
    /* 주민등록번호 */
    private String ihidnum;
    /* 근무 시작일자 */
    private String workSdt;
    /* 근로소득 발생기간으로 귀속종료일 항목 */
    private String workEdt;
    /* 인적공제 변동 여부 Y:전년과 동일 N: 변동 */
    private String humanddcChangeAt;
    /* 사업장 코드 */
    private String bplcCode;
    /* 감면 시작일 */
    private String rdcxptBgnde;
    /* 감면 종료일 */
    private String rdcxptEndde;
    /* 공무원연금금액(32 공적연금 보험료) */
    private String pubpensionAmt;
    /* 군인연금금액(32 공적연금 보험료) */
    private String sopensionAmt;
    /* 사립학교교직원연금금액(32 공적연금 보험료) */
    private String pspensionAmt;
    /* 별정우체국연금금액(32 공적연금 보험료) */
    private String popensionAmt;
    /* 기본 급여 금액 */
    private String bassSalaryAmt;
    /* 상여금 */
    private String bnsAmt;
    /* 인정상여 금액 */
    private String constBnsAmt;
    /* 국민연금 금액 */
    private String npnAmt;
    /* 고용보험 금액 */
    private String emplyminsrncAmt;
    /* 건강보험 금액 */
    private String hlthinsAmt;
    /* 소득세 */
    private String incmtax;
    /* 지방소득세 */
    private String lcltyincmtax;
    /* 농특세 */
    private String agsptax;
    /* 국외 근로 수당 */
    private String outnatnLaborAllwnc;
    /* 야간 근로 수당 */
    private String nightLaborAllwnc;
    /* 출산보육 수당 */
    private String chldbrthAllwnc;
    /* 연구 비 */
    private String researchCt;
    /* 비과세 학자금 금액 */
    private String taxxmptSchxpnAmt;
    /* 취재 수당 */
    private String sbjslctAllwnc;
    /* 벽지 수당 */
    private String bsecludedAllwnc;
    /* 이주 수당 */
    private String movingAllwnc;
    /* 식대 금액 */
    private String cgffdAmt;
    /* 위원 수당 */
    private String cmitAllwnc;
    /* 일숙직 비 */
    private String daynhtcCt;
    /* 자가운전보조금 */
    private String pvtcarsbsidy;
    /* 우리사주조합 인출금 */
    private String eswrsDrtAmt;
    /* 임원퇴직소득한도초과액 */
    private String exctvRetireIncomeLmt;
    /* 기관별로 과세가 부여되는 수당금액) */
    private String etcAllwncAmt;
    /* 주식매수선택권 행사이익 */
    private String stockOptionPrft;
    /* 직무발명:  보상금 한도 300만원 */
    private String inthRwmny;
    /* 육아휴직급여, 선전후 휴가 급여, 공무원의 유악휴직수당,육아기근로시간 단축급여 */
    private String babylayoffAllwnc;
    /* 처우 개선비 1: 보육교사 ,2,사립유치원,3전공의 수련보조수 */
    private String tretImprvmct;
    
    private int cnt ;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Yndyta001() {
        //
    }

    public Yndyta001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.belongYy = StringExpression.nullConvert(egovMap.get("belongYy"));
            this.calcYm = StringExpression.nullConvert(egovMap.get("calcYm"));
            this.korNm = StringExpression.nullConvert(egovMap.get("korNm"));
            this.ihidnum = StringExpression.nullConvert(egovMap.get("ihidnum"));
            this.workSdt = StringExpression.nullConvert(egovMap.get("workSdt"));
            this.workEdt = StringExpression.nullConvert(egovMap.get("workEdt"));
            this.humanddcChangeAt = StringExpression.nullConvert(egovMap.get("humanddcChangeAt"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.rdcxptBgnde = StringExpression.nullConvert(egovMap.get("rdcxptBgnde"));
            this.rdcxptEndde = StringExpression.nullConvert(egovMap.get("rdcxptEndde"));
            this.pubpensionAmt = StringExpression.nullConvert(egovMap.get("pubpensionAmt"));
            this.sopensionAmt = StringExpression.nullConvert(egovMap.get("sopensionAmt"));
            this.pspensionAmt = StringExpression.nullConvert(egovMap.get("pspensionAmt"));
            this.popensionAmt = StringExpression.nullConvert(egovMap.get("popensionAmt"));
            this.bassSalaryAmt = StringExpression.nullConvert(egovMap.get("bassSalaryAmt"));
            this.bnsAmt = StringExpression.nullConvert(egovMap.get("bnsAmt"));
            this.constBnsAmt = StringExpression.nullConvert(egovMap.get("constBnsAmt"));
            this.npnAmt = StringExpression.nullConvert(egovMap.get("npnAmt"));
            this.emplyminsrncAmt = StringExpression.nullConvert(egovMap.get("emplyminsrncAmt"));
            this.hlthinsAmt = StringExpression.nullConvert(egovMap.get("hlthinsAmt"));
            this.incmtax = StringExpression.nullConvert(egovMap.get("incmtax"));
            this.lcltyincmtax = StringExpression.nullConvert(egovMap.get("lcltyincmtax"));
            this.agsptax = StringExpression.nullConvert(egovMap.get("agsptax"));
            this.outnatnLaborAllwnc = StringExpression.nullConvert(egovMap.get("outnatnLaborAllwnc"));
            this.nightLaborAllwnc = StringExpression.nullConvert(egovMap.get("nightLaborAllwnc"));
            this.chldbrthAllwnc = StringExpression.nullConvert(egovMap.get("chldbrthAllwnc"));
            this.researchCt = StringExpression.nullConvert(egovMap.get("researchCt"));
            this.taxxmptSchxpnAmt = StringExpression.nullConvert(egovMap.get("taxxmptSchxpnAmt"));
            this.sbjslctAllwnc = StringExpression.nullConvert(egovMap.get("sbjslctAllwnc"));
            this.bsecludedAllwnc = StringExpression.nullConvert(egovMap.get("bsecludedAllwnc"));
            this.movingAllwnc = StringExpression.nullConvert(egovMap.get("movingAllwnc"));
            this.cgffdAmt = StringExpression.nullConvert(egovMap.get("cgffdAmt"));
            this.cmitAllwnc = StringExpression.nullConvert(egovMap.get("cmitAllwnc"));
            this.daynhtcCt = StringExpression.nullConvert(egovMap.get("daynhtcCt"));
            this.pvtcarsbsidy = StringExpression.nullConvert(egovMap.get("pvtcarsbsidy"));
            this.eswrsDrtAmt = StringExpression.nullConvert(egovMap.get("eswrsDrtAmt"));
            this.exctvRetireIncomeLmt = StringExpression.nullConvert(egovMap.get("exctvRetireIncomeLmt"));
            this.etcAllwncAmt = StringExpression.nullConvert(egovMap.get("etcAllwncAmt"));
            this.stockOptionPrft = StringExpression.nullConvert(egovMap.get("stockOptionPrft"));
            this.inthRwmny = StringExpression.nullConvert(egovMap.get("inthRwmny"));
            this.babylayoffAllwnc = StringExpression.nullConvert(egovMap.get("babylayoffAllwnc"));
            this.tretImprvmct = StringExpression.nullConvert(egovMap.get("tretImprvmct"));
            this.cnt = StringExpression.zeroConvert(egovMap.get("cnt"));
        }
    }

    public Yndyta001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.belongYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.calcYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            this.korNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.ihidnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.workSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.workEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
            this.humanddcChangeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
            this.rdcxptBgnde = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c11")));
            this.rdcxptEndde = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c12")));
            this.pubpensionAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c13")));
            this.sopensionAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c14")));
            this.pspensionAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c15")));
            this.popensionAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c16")));
            this.bassSalaryAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c17")));
            this.bnsAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c18")));
            this.constBnsAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c19")));
            this.npnAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c20")));
            this.emplyminsrncAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c21")));
            this.hlthinsAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c22")));
            this.incmtax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c23")));
            this.lcltyincmtax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c24")));
            this.agsptax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c25")));
            this.outnatnLaborAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c26")));
            this.nightLaborAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c27")));
            this.chldbrthAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c28")));
            this.researchCt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c29")));
            this.taxxmptSchxpnAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c30")));
            this.sbjslctAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c31")));
            this.bsecludedAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c32")));
            this.movingAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c33")));
            this.cgffdAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c34")));
            this.cmitAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c35")));
            this.daynhtcCt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c36")));
            this.pvtcarsbsidy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c37")));
            this.eswrsDrtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c38")));
            this.exctvRetireIncomeLmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c39")));
            this.etcAllwncAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c40")));
            this.stockOptionPrft = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c41")));
            this.inthRwmny = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c42")));
            this.babylayoffAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c43")));
            this.tretImprvmct = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c44")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getBelongYy() {
        return belongYy;
    }
    public void setBelongYy(String belongYy) {
        this.belongYy = belongYy;
    }

    public String getCalcYm() {
        return calcYm;
    }
    public void setCalcYm(String calcYm) {
        this.calcYm = calcYm;
    }

    public String getKorNm() {
        return korNm;
    }
    public void setKorNm(String korNm) {
        this.korNm = korNm;
    }

    public String getIhidnum() {
        return ihidnum;
    }
    public void setIhidnum(String ihidnum) {
        this.ihidnum = ihidnum;
    }

    public String getWorkSdt() {
        return workSdt;
    }
    public void setWorkSdt(String workSdt) {
        this.workSdt = workSdt;
    }

    public String getWorkEdt() {
        return workEdt;
    }
    public void setWorkEdt(String workEdt) {
        this.workEdt = workEdt;
    }

    public String getHumanddcChangeAt() {
        return humanddcChangeAt;
    }
    public void setHumanddcChangeAt(String humanddcChangeAt) {
        this.humanddcChangeAt = humanddcChangeAt;
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getRdcxptBgnde() {
        return rdcxptBgnde;
    }
    public void setRdcxptBgnde(String rdcxptBgnde) {
        this.rdcxptBgnde = rdcxptBgnde;
    }

    public String getRdcxptEndde() {
        return rdcxptEndde;
    }
    public void setRdcxptEndde(String rdcxptEndde) {
        this.rdcxptEndde = rdcxptEndde;
    }

    public String getPubpensionAmt() {
        return pubpensionAmt;
    }
    public void setPubpensionAmt(String pubpensionAmt) {
        this.pubpensionAmt = pubpensionAmt;
    }

    public String getSopensionAmt() {
        return sopensionAmt;
    }
    public void setSopensionAmt(String sopensionAmt) {
        this.sopensionAmt = sopensionAmt;
    }

    public String getPspensionAmt() {
        return pspensionAmt;
    }
    public void setPspensionAmt(String pspensionAmt) {
        this.pspensionAmt = pspensionAmt;
    }

    public String getPopensionAmt() {
        return popensionAmt;
    }
    public void setPopensionAmt(String popensionAmt) {
        this.popensionAmt = popensionAmt;
    }

    public String getBassSalaryAmt() {
        return bassSalaryAmt;
    }
    public void setBassSalaryAmt(String bassSalaryAmt) {
        this.bassSalaryAmt = bassSalaryAmt;
    }

    public String getBnsAmt() {
        return bnsAmt;
    }
    public void setBnsAmt(String bnsAmt) {
        this.bnsAmt = bnsAmt;
    }

    public String getConstBnsAmt() {
        return constBnsAmt;
    }
    public void setConstBnsAmt(String constBnsAmt) {
        this.constBnsAmt = constBnsAmt;
    }

    public String getNpnAmt() {
        return npnAmt;
    }
    public void setNpnAmt(String npnAmt) {
        this.npnAmt = npnAmt;
    }

    public String getEmplyminsrncAmt() {
        return emplyminsrncAmt;
    }
    public void setEmplyminsrncAmt(String emplyminsrncAmt) {
        this.emplyminsrncAmt = emplyminsrncAmt;
    }

    public String getHlthinsAmt() {
        return hlthinsAmt;
    }
    public void setHlthinsAmt(String hlthinsAmt) {
        this.hlthinsAmt = hlthinsAmt;
    }

    public String getIncmtax() {
        return incmtax;
    }
    public void setIncmtax(String incmtax) {
        this.incmtax = incmtax;
    }

    public String getLcltyincmtax() {
        return lcltyincmtax;
    }
    public void setLcltyincmtax(String lcltyincmtax) {
        this.lcltyincmtax = lcltyincmtax;
    }

    public String getAgsptax() {
        return agsptax;
    }
    public void setAgsptax(String agsptax) {
        this.agsptax = agsptax;
    }

    public String getOutnatnLaborAllwnc() {
        return outnatnLaborAllwnc;
    }
    public void setOutnatnLaborAllwnc(String outnatnLaborAllwnc) {
        this.outnatnLaborAllwnc = outnatnLaborAllwnc;
    }

    public String getNightLaborAllwnc() {
        return nightLaborAllwnc;
    }
    public void setNightLaborAllwnc(String nightLaborAllwnc) {
        this.nightLaborAllwnc = nightLaborAllwnc;
    }

    public String getChldbrthAllwnc() {
        return chldbrthAllwnc;
    }
    public void setChldbrthAllwnc(String chldbrthAllwnc) {
        this.chldbrthAllwnc = chldbrthAllwnc;
    }

    public String getResearchCt() {
        return researchCt;
    }
    public void setResearchCt(String researchCt) {
        this.researchCt = researchCt;
    }

    public String getTaxxmptSchxpnAmt() {
        return taxxmptSchxpnAmt;
    }
    public void setTaxxmptSchxpnAmt(String taxxmptSchxpnAmt) {
        this.taxxmptSchxpnAmt = taxxmptSchxpnAmt;
    }

    public String getSbjslctAllwnc() {
        return sbjslctAllwnc;
    }
    public void setSbjslctAllwnc(String sbjslctAllwnc) {
        this.sbjslctAllwnc = sbjslctAllwnc;
    }

    public String getBsecludedAllwnc() {
        return bsecludedAllwnc;
    }
    public void setBsecludedAllwnc(String bsecludedAllwnc) {
        this.bsecludedAllwnc = bsecludedAllwnc;
    }

    public String getMovingAllwnc() {
        return movingAllwnc;
    }
    public void setMovingAllwnc(String movingAllwnc) {
        this.movingAllwnc = movingAllwnc;
    }

    public String getCgffdAmt() {
        return cgffdAmt;
    }
    public void setCgffdAmt(String cgffdAmt) {
        this.cgffdAmt = cgffdAmt;
    }

    public String getCmitAllwnc() {
        return cmitAllwnc;
    }
    public void setCmitAllwnc(String cmitAllwnc) {
        this.cmitAllwnc = cmitAllwnc;
    }

    public String getDaynhtcCt() {
        return daynhtcCt;
    }
    public void setDaynhtcCt(String daynhtcCt) {
        this.daynhtcCt = daynhtcCt;
    }

    public String getPvtcarsbsidy() {
        return pvtcarsbsidy;
    }
    public void setPvtcarsbsidy(String pvtcarsbsidy) {
        this.pvtcarsbsidy = pvtcarsbsidy;
    }

    public String getEswrsDrtAmt() {
        return eswrsDrtAmt;
    }
    public void setEswrsDrtAmt(String eswrsDrtAmt) {
        this.eswrsDrtAmt = eswrsDrtAmt;
    }

    public String getExctvRetireIncomeLmt() {
        return exctvRetireIncomeLmt;
    }
    public void setExctvRetireIncomeLmt(String exctvRetireIncomeLmt) {
        this.exctvRetireIncomeLmt = exctvRetireIncomeLmt;
    }

    public String getEtcAllwncAmt() {
        return etcAllwncAmt;
    }
    public void setEtcAllwncAmt(String etcAllwncAmt) {
        this.etcAllwncAmt = etcAllwncAmt;
    }

    public String getStockOptionPrft() {
        return stockOptionPrft;
    }
    public void setStockOptionPrft(String stockOptionPrft) {
        this.stockOptionPrft = stockOptionPrft;
    }

    public String getInthRwmny() {
        return inthRwmny;
    }
    public void setInthRwmny(String inthRwmny) {
        this.inthRwmny = inthRwmny;
    }

    public String getBabylayoffAllwnc() {
        return babylayoffAllwnc;
    }
    public void setBabylayoffAllwnc(String babylayoffAllwnc) {
        this.babylayoffAllwnc = babylayoffAllwnc;
    }

    public String getTretImprvmct() {
        return tretImprvmct;
    }
    public void setTretImprvmct(String tretImprvmct) {
        this.tretImprvmct = tretImprvmct;
    }
	public int getCnt() {
		return cnt;
	}

	public void setCnt(int cnt) {
		this.cnt = cnt;
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
