package kr.co.dbvision.api.mps.cal.mpscal023.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 연차수당관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */

public class Mpscal023 extends CommonVO {

    /* 해당년도 */
    private String applcYy;
    /* 사원번호 */
    private String empno;
    /* 연차적용시작일: 연차의 산정대상이 되는 기간의 시작일. 통상 매년의 입사일 또는 1월 1일 */
    private String applcBeginDe;
    /* 연차적용종료일: 연차의 산정대상이 되는 기간의 종료일. 통상 매년 다음해의 입사전일 또는 12월 31일 */
    private String applcEndDe;
    /* 해당년도의 연차일수 */
    private String wrycDaycnt;
    /* 소요일(휴가일수, 반차인 경우는 0.5) */
    private String useDaycnt;
    /* 해당년도의 잔여일수 */
    private String remainderDaycnt;
    /* 권장일수 */
    private String recmndDaycnt;
    /* 정산일수 */
    private String excclcDaycnt;
    /* 신입발생일수 */
    private String nwmbOccrrncDaycnt;
    /* 신입사용일수 */
    private String nwmbUseDaycnt;
    /* 신입잔여일수 */
    private String nwmbRemainderDaycnt;
    /* 신입정산일수 */
    private String nwmbExcclcDaycnt;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 가감 일수 */
    private String adsbtrDaycnt;
    /* 가감 사유 */
    private String adsbtrResn;
    /* 근속 년수 */
    private String cnwkYcnt;
    /* 근속 월수 */
    private String cnwkMcnt;
    /* 근속 일수 */
    private String cnwkDcnt;
    /* 1년전 연차 사용일수 */
    private String onyrbfWrycUseDaycnt;
    /* 2년전 연차 사용일수 */
    private String twyrbfWrycUseDaycnt;
    /* 급여항목 코드 */
    
    private String applcYm;
    private String pymntSn;
    private String pymntDe;
    private String wrycAllwncAmt;
    private String odysgAmt;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpscal023() {
        //
    }

    public Mpscal023(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYy = StringExpression.nullConvert(egovMap.get("applcYy"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.applcBeginDe = StringExpression.nullConvert(egovMap.get("applcBeginDe"));
            this.applcEndDe = StringExpression.nullConvert(egovMap.get("applcEndDe"));
            this.wrycDaycnt = StringExpression.nullConvert(egovMap.get("wrycDaycnt"));
            this.useDaycnt = StringExpression.nullConvert(egovMap.get("useDaycnt"));
            this.remainderDaycnt = StringExpression.nullConvert(egovMap.get("remainderDaycnt"));
            this.recmndDaycnt = StringExpression.nullConvert(egovMap.get("recmndDaycnt"));
            this.excclcDaycnt = StringExpression.nullConvert(egovMap.get("excclcDaycnt"));
            this.nwmbOccrrncDaycnt = StringExpression.nullConvert(egovMap.get("nwmbOccrrncDaycnt"));
            this.nwmbUseDaycnt = StringExpression.nullConvert(egovMap.get("nwmbUseDaycnt"));
            this.nwmbRemainderDaycnt = StringExpression.nullConvert(egovMap.get("nwmbRemainderDaycnt"));
            this.nwmbExcclcDaycnt = StringExpression.nullConvert(egovMap.get("nwmbExcclcDaycnt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.adsbtrDaycnt = StringExpression.nullConvert(egovMap.get("adsbtrDaycnt"));
            this.adsbtrResn = StringExpression.nullConvert(egovMap.get("adsbtrResn"));
            this.cnwkYcnt = StringExpression.nullConvert(egovMap.get("cnwkYcnt"));
            this.cnwkMcnt = StringExpression.nullConvert(egovMap.get("cnwkMcnt"));
            this.cnwkDcnt = StringExpression.nullConvert(egovMap.get("cnwkDcnt"));
            this.onyrbfWrycUseDaycnt = StringExpression.nullConvert(egovMap.get("onyrbfWrycUseDaycnt"));
            this.twyrbfWrycUseDaycnt = StringExpression.nullConvert(egovMap.get("twyrbfWrycUseDaycnt"));
            this.applcYm = StringExpression.nullConvert(egovMap.get("applcYm"));
            this.pymntSn = StringExpression.nullConvert(egovMap.get("pymntSn"));
            this.pymntDe = StringExpression.nullConvert(egovMap.get("pymntDe"));
            this.wrycAllwncAmt = StringExpression.nullConvert(egovMap.get("wrycAllwncAmt"));
            this.odysgAmt = StringExpression.nullConvert(egovMap.get("odysgAmt"));
            
        }
    }

    public Mpscal023(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYy")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.applcBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcBeginDe")));
            this.applcEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcEndDe")));
            this.wrycDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycDaycnt")));
            this.useDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useDaycnt")));
            this.remainderDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_remainderDaycnt")));
            this.recmndDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_recmndDaycnt")));
            this.excclcDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_excclcDaycnt")));
            this.nwmbOccrrncDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nwmbOccrrncDaycnt")));
            this.nwmbUseDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nwmbUseDaycnt")));
            this.nwmbRemainderDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nwmbRemainderDaycnt")));
            this.nwmbExcclcDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nwmbExcclcDaycnt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.adsbtrDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_adsbtrDaycnt")));
            this.adsbtrResn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_adsbtrResn")));
            this.cnwkYcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkYcnt")));
            this.cnwkMcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkMcnt")));
            this.cnwkDcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkDcnt")));
            this.onyrbfWrycUseDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_onyrbfWrycUseDaycnt")));
            this.twyrbfWrycUseDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_twyrbfWrycUseDaycnt")));
            this.applcYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYm")));
            this.pymntSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntSn")));
            this.pymntDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntDe")));
            this.wrycAllwncAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycAllwncAmt")));
            this.odysgAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_odysgAmt")));
            
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getApplcYy() {
        return applcYy;
    }
    public void setApplcYy(String applcYy) {
        this.applcYy = applcYy;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getApplcBeginDe() {
        return applcBeginDe;
    }
    public void setApplcBeginDe(String applcBeginDe) {
        this.applcBeginDe = applcBeginDe;
    }

    public String getApplcEndDe() {
        return applcEndDe;
    }
    public void setApplcEndDe(String applcEndDe) {
        this.applcEndDe = applcEndDe;
    }

    public String getWrycDaycnt() {
        return wrycDaycnt;
    }
    public void setWrycDaycnt(String wrycDaycnt) {
        this.wrycDaycnt = wrycDaycnt;
    }

    public String getUseDaycnt() {
        return useDaycnt;
    }
    public void setUseDaycnt(String useDaycnt) {
        this.useDaycnt = useDaycnt;
    }

    public String getRemainderDaycnt() {
        return remainderDaycnt;
    }
    public void setRemainderDaycnt(String remainderDaycnt) {
        this.remainderDaycnt = remainderDaycnt;
    }

    public String getRecmndDaycnt() {
        return recmndDaycnt;
    }
    public void setRecmndDaycnt(String recmndDaycnt) {
        this.recmndDaycnt = recmndDaycnt;
    }

    public String getExcclcDaycnt() {
        return excclcDaycnt;
    }
    public void setExcclcDaycnt(String excclcDaycnt) {
        this.excclcDaycnt = excclcDaycnt;
    }

    public String getNwmbOccrrncDaycnt() {
        return nwmbOccrrncDaycnt;
    }
    public void setNwmbOccrrncDaycnt(String nwmbOccrrncDaycnt) {
        this.nwmbOccrrncDaycnt = nwmbOccrrncDaycnt;
    }

    public String getNwmbUseDaycnt() {
        return nwmbUseDaycnt;
    }
    public void setNwmbUseDaycnt(String nwmbUseDaycnt) {
        this.nwmbUseDaycnt = nwmbUseDaycnt;
    }

    public String getNwmbRemainderDaycnt() {
        return nwmbRemainderDaycnt;
    }
    public void setNwmbRemainderDaycnt(String nwmbRemainderDaycnt) {
        this.nwmbRemainderDaycnt = nwmbRemainderDaycnt;
    }

    public String getNwmbExcclcDaycnt() {
        return nwmbExcclcDaycnt;
    }
    public void setNwmbExcclcDaycnt(String nwmbExcclcDaycnt) {
        this.nwmbExcclcDaycnt = nwmbExcclcDaycnt;
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

    public String getAdsbtrDaycnt() {
        return adsbtrDaycnt;
    }
    public void setAdsbtrDaycnt(String adsbtrDaycnt) {
        this.adsbtrDaycnt = adsbtrDaycnt;
    }

    public String getAdsbtrResn() {
        return adsbtrResn;
    }
    public void setAdsbtrResn(String adsbtrResn) {
        this.adsbtrResn = adsbtrResn;
    }

    public String getCnwkYcnt() {
        return cnwkYcnt;
    }
    public void setCnwkYcnt(String cnwkYcnt) {
        this.cnwkYcnt = cnwkYcnt;
    }

    public String getCnwkMcnt() {
        return cnwkMcnt;
    }
    public void setCnwkMcnt(String cnwkMcnt) {
        this.cnwkMcnt = cnwkMcnt;
    }

    public String getCnwkDcnt() {
        return cnwkDcnt;
    }
    public void setCnwkDcnt(String cnwkDcnt) {
        this.cnwkDcnt = cnwkDcnt;
    }

    public String getOnyrbfWrycUseDaycnt() {
        return onyrbfWrycUseDaycnt;
    }
    public void setOnyrbfWrycUseDaycnt(String onyrbfWrycUseDaycnt) {
        this.onyrbfWrycUseDaycnt = onyrbfWrycUseDaycnt;
    }

    public String getTwyrbfWrycUseDaycnt() {
        return twyrbfWrycUseDaycnt;
    }
    public void setTwyrbfWrycUseDaycnt(String twyrbfWrycUseDaycnt) {
        this.twyrbfWrycUseDaycnt = twyrbfWrycUseDaycnt;
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

    public String getPymntDe() {
        return pymntDe;
    }

    public void setPymntDe(String pymntDe) {
        this.pymntDe = pymntDe;
    }

    public String getWrycAllwncAmt() {
        return wrycAllwncAmt;
    }

    public void setWrycAllwncAmt(String wrycAllwncAmt) {
        this.wrycAllwncAmt = wrycAllwncAmt;
    }

    public String getOdysgAmt() {
        return odysgAmt;
    }

    public void setOdysgAmt(String odysgAmt) {
        this.odysgAmt = odysgAmt;
    }
    
    
}
