package kr.co.dbvision.api.mhs.hrd.mhshrd001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 연차일수관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.10
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.08.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.10          디비비전              최초 생성
 * </pre>
 */

public class Mhshrd001 extends CommonVO {

    /* 해당년도 */
    private String applcYy;
    /* 사원번호 */
    private String empno;
    /* 사원이름 */
    private String empnm;
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
    /* 재직구분 */
    private String hffsSe;
    /* 입사 시작일자 */
    private String ecnySde;
    /* 입사 종료일자 (퇴사일자) */
    private String ecnyEde;
    /* 입사 일자 */
    private String ecnyDe;
    /* 근속 연수*/
    private String serviceOfYear;
    /* 근속 월수*/
    private String serviceOfMonth;
    /* 근속 일수*/
    private String serviceOfDate;
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
    /* 기산 일자 */
    private String valueDate;
    
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
    
    /* 차기년도 연차 생성 - FLAG 값 */
    private String nextYearFlag;
    
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();
    
    public Mhshrd001() {
        //
    }

    public Mhshrd001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYy = StringExpression.nullConvert(egovMap.get("applcYy"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.empnm = StringExpression.nullConvert(egovMap.get("empnm"));
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
            this.hffsSe = StringExpression.nullConvert(egovMap.get("hffsSe"));
            this.ecnySde = StringExpression.nullConvert(egovMap.get("ecnySde"));
            this.ecnyEde = StringExpression.nullConvert(egovMap.get("ecnyEde"));
            this.ecnyDe = StringExpression.nullConvert(egovMap.get("ecnyDe"));
            this.serviceOfYear = StringExpression.nullConvert(egovMap.get("serviceOfYear"));
            this.serviceOfMonth = StringExpression.nullConvert(egovMap.get("serviceOfMonth"));
            this.serviceOfDate = StringExpression.nullConvert(egovMap.get("serviceOfDate"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.adsbtrDaycnt = StringExpression.nullConvert(egovMap.get("adsbtrDaycnt"));
            this.adsbtrResn = StringExpression.nullConvert(egovMap.get("adsbtrResn"));
            this.valueDate = StringExpression.nullConvert(egovMap.get("valueDate"));
            this.cnwkYcnt = StringExpression.nullConvert(egovMap.get("cnwkYcnt"));
            this.cnwkMcnt = StringExpression.nullConvert(egovMap.get("cnwkMcnt"));
            this.cnwkDcnt = StringExpression.nullConvert(egovMap.get("cnwkDcnt"));
            this.onyrbfWrycUseDaycnt = StringExpression.nullConvert(egovMap.get("onyrbfWrycUseDaycnt"));
            this.twyrbfWrycUseDaycnt = StringExpression.nullConvert(egovMap.get("twyrbfWrycUseDaycnt"));
            this.nextYearFlag = StringExpression.nullConvert(egovMap.get("nextYearFlag"));
        }
    }

    public Mhshrd001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYy")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.empnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empnm")));
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
            this.hffsSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hffsSe")));
            this.ecnySde = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ecnySde")));
            this.ecnyEde = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ecnyEde")));
            this.ecnyDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ecnyDe")));
            this.serviceOfYear = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_serviceOfYear")));
            this.serviceOfMonth = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_serviceOfMonth")));
            this.serviceOfDate = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_serviceOfDate")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.adsbtrDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_adsbtrDaycnt")));
            this.adsbtrResn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_adsbtrResn")));
            this.valueDate = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_valueDate")));
            this.cnwkYcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkYcnt")));
            this.cnwkMcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkMcnt")));
            this.cnwkDcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkDcnt")));
            this.onyrbfWrycUseDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_onyrbfWrycUseDaycnt")));
            this.twyrbfWrycUseDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_twyrbfWrycUseDaycnt")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            this.nextYearFlag = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nextYearFlag")));
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

    public String getHffsSe() {
        return hffsSe;
    }

    public void setHffsSe(String hffsSe) {
        this.hffsSe = hffsSe;
    }

    public String getEcnySde() {
        return ecnySde;
    }

    public void setEcnySde(String ecnySde) {
        this.ecnySde = ecnySde;
    }

    public String getEcnyEde() {
        return ecnyEde;
    }

    public void setEcnyEde(String ecnyEde) {
        this.ecnyEde = ecnyEde;
    }

    public String getEmpnm() {
        return empnm;
    }

    public void setEmpnm(String empnm) {
        this.empnm = empnm;
    }

    public String getEcnyDe() {
        return ecnyDe;
    }

    public void setEcnyDe(String ecnyDe) {
        this.ecnyDe = ecnyDe;
    }

    public String getServiceOfYear() {
        return serviceOfYear;
    }

    public void setServiceOfYear(String serviceOfYear) {
        this.serviceOfYear = serviceOfYear;
    }

    public String getServiceOfMonth() {
        return serviceOfMonth;
    }

    public void setServiceOfMonth(String serviceOfMonth) {
        this.serviceOfMonth = serviceOfMonth;
    }

    public String getServiceOfDate() {
        return serviceOfDate;
    }

    public void setServiceOfDate(String serviceOfDate) {
        this.serviceOfDate = serviceOfDate;
    }

    public String getValueDate() {
        return valueDate;
    }

    public void setValueDate(String valueDate) {
        this.valueDate = valueDate;
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

    public String getNextYearFlag() {
        return nextYearFlag;
    }

    public void setNextYearFlag(String nextYearFlag) {
        this.nextYearFlag = nextYearFlag;
    }
}
