package kr.co.dbvision.api.mps.cal.mpscal010.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 초과근무수당관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.18
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.18)
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

public class Mpscal010 extends CommonVO {

    /* 근무년월 */
    private String workYm;
    /* 사원번호 */ 
    private String empno;
    /* 부서코드 */
    private String deptCode;
    /* 직급코드 */
    private String clsfCode;
    /* 시간외근무 시간 */
    private String ovtimeworkTime;
    /* 시간외근무수당 */
    private String ovtimeworkAllwnc;
    /* 생활임금시간외근무수당 */
    private String lvwageOvtimeworkAllwnc;
    /* 휴일근무 시간 */
    private String hvofWorkTime;
    /* 휴무 수당 */
    private String hvofAllwnc;
    /* 생활임금 휴무 수당 */
    private String lvwageHvofAllwnc;
    /* 야간 근무 시간 */
    private String nightWorkTime;
    /* 야간 근무 수당 */
    private String nightWorkAllwnc;
    /* 생활임금 야간 근무 수당 */
    private String lvwageNightWorkAllwnc;
    /* 대체휴무일수 */
    private String altHvofdayCo;
    /* 시간외 총금액 */
    private String ovtimeTotAmt;
    /* 적용 년월 */
    private String applcYm;
    /* 지급 순번 */
    private String pymntSn;
    /* 지급 일자 */
    private String pymntDe;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpscal010() {
        //
    }

    public Mpscal010(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.workYm = StringExpression.nullConvert(egovMap.get("workYm"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.clsfCode = StringExpression.nullConvert(egovMap.get("clsfCode"));
            this.ovtimeworkTime = StringExpression.nullConvert(egovMap.get("ovtimeworkTime"));
            this.ovtimeworkAllwnc = StringExpression.nullConvert(egovMap.get("ovtimeworkAllwnc"));
            this.lvwageOvtimeworkAllwnc = StringExpression.nullConvert(egovMap.get("lvwageOvtimeworkAllwnc"));
            this.hvofWorkTime = StringExpression.nullConvert(egovMap.get("hvofWorkTime"));
            this.hvofAllwnc = StringExpression.nullConvert(egovMap.get("hvofAllwnc"));
            this.lvwageHvofAllwnc = StringExpression.nullConvert(egovMap.get("lvwageHvofAllwnc"));
            this.nightWorkTime = StringExpression.nullConvert(egovMap.get("nightWorkTime"));
            this.nightWorkAllwnc = StringExpression.nullConvert(egovMap.get("nightWorkAllwnc"));
            this.lvwageNightWorkAllwnc = StringExpression.nullConvert(egovMap.get("lvwageNightWorkAllwnc"));
            this.altHvofdayCo = StringExpression.nullConvert(egovMap.get("altHvofdayCo"));
            this.ovtimeTotAmt = StringExpression.nullConvert(egovMap.get("ovtimeTotAmt"));
            this.applcYm = StringExpression.nullConvert(egovMap.get("applcYm"));
            this.pymntSn = StringExpression.nullConvert(egovMap.get("pymntSn"));
            this.pymntDe = StringExpression.nullConvert(egovMap.get("pymntDe"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Mpscal010(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.workYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workYm")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode")));
            this.clsfCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfCode")));
            this.ovtimeworkTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ovtimeworkTime")));
            this.ovtimeworkAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ovtimeworkAllwnc")));
            this.lvwageOvtimeworkAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lvwageOvtimeworkAllwnc")));
            this.hvofWorkTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hvofWorkTime")));
            this.hvofAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hvofAllwnc")));
            this.lvwageHvofAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lvwageHvofAllwnc")));
            this.nightWorkTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nightWorkTime")));
            this.nightWorkAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nightWorkAllwnc")));
            this.lvwageNightWorkAllwnc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lvwageNightWorkAllwnc")));
            this.altHvofdayCo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_altHvofdayCo")));
            this.ovtimeTotAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ovtimeTotAmt")));
            this.applcYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYm")));
            this.pymntSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntSn")));
            this.pymntDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntDe")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getWorkYm() {
        return workYm;
    }
    public void setWorkYm(String workYm) {
        this.workYm = workYm;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getClsfCode() {
        return clsfCode;
    }
    public void setClsfCode(String clsfCode) {
        this.clsfCode = clsfCode;
    }

    public String getOvtimeworkTime() {
        return ovtimeworkTime;
    }
    public void setOvtimeworkTime(String ovtimeworkTime) {
        this.ovtimeworkTime = ovtimeworkTime;
    }

    public String getOvtimeworkAllwnc() {
        return ovtimeworkAllwnc;
    }
    public void setOvtimeworkAllwnc(String ovtimeworkAllwnc) {
        this.ovtimeworkAllwnc = ovtimeworkAllwnc;
    }

    public String getLvwageOvtimeworkAllwnc() {
        return lvwageOvtimeworkAllwnc;
    }
    public void setLvwageOvtimeworkAllwnc(String lvwageOvtimeworkAllwnc) {
        this.lvwageOvtimeworkAllwnc = lvwageOvtimeworkAllwnc;
    }

    public String getHvofWorkTime() {
        return hvofWorkTime;
    }
    public void setHvofWorkTime(String hvofWorkTime) {
        this.hvofWorkTime = hvofWorkTime;
    }

    public String getHvofAllwnc() {
        return hvofAllwnc;
    }
    public void setHvofAllwnc(String hvofAllwnc) {
        this.hvofAllwnc = hvofAllwnc;
    }

    public String getLvwageHvofAllwnc() {
        return lvwageHvofAllwnc;
    }
    public void setLvwageHvofAllwnc(String lvwageHvofAllwnc) {
        this.lvwageHvofAllwnc = lvwageHvofAllwnc;
    }

    public String getNightWorkTime() {
        return nightWorkTime;
    }
    public void setNightWorkTime(String nightWorkTime) {
        this.nightWorkTime = nightWorkTime;
    }

    public String getNightWorkAllwnc() {
        return nightWorkAllwnc;
    }
    public void setNightWorkAllwnc(String nightWorkAllwnc) {
        this.nightWorkAllwnc = nightWorkAllwnc;
    }

    public String getLvwageNightWorkAllwnc() {
        return lvwageNightWorkAllwnc;
    }
    public void setLvwageNightWorkAllwnc(String lvwageNightWorkAllwnc) {
        this.lvwageNightWorkAllwnc = lvwageNightWorkAllwnc;
    }

    public String getAltHvofdayCo() {
        return altHvofdayCo;
    }
    public void setAltHvofdayCo(String altHvofdayCo) {
        this.altHvofdayCo = altHvofdayCo;
    }

    public String getOvtimeTotAmt() {
        return ovtimeTotAmt;
    }
    public void setOvtimeTotAmt(String ovtimeTotAmt) {
        this.ovtimeTotAmt = ovtimeTotAmt;
    }

    public String getApplcYm() {
        return applcYm;
    }
    public void setApplcYm(String applcYm) {
        this.applcYm = applcYm;
    }

    public String getPymntSn() {
        return pymntSn;
    }
    public void setPymntSn(String pymntSn) {
        this.pymntSn = pymntSn;
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

    public String getPymntDe() {
        return pymntDe;
    }

    public void setPymntDe(String pymntDe) {
        this.pymntDe = pymntDe;
    }
    
}
