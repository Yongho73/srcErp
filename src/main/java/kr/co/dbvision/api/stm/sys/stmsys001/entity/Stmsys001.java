package kr.co.dbvision.api.stm.sys.stmsys001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 시스템환경관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.03.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.16          디비비전              최초 생성
 * </pre>
 */

public class Stmsys001 extends CommonVO {

    /* 사업장구분코드 기본 자리수는 4자리 */
    private String bplcCode;
    /* 제품사용항목 */
    private String prductUseItem;
    /* 모듈사용항목 */
    private String moduleUseItem;
    /* 화면 스킨 구분 코드 */
    private String sknSeCode;
    /* 페이징단위 ( C133) */
    private String pgngUnit;
    /* 마스킹방법코드 */
    private String maskMthCode;
    /* 사원번호생성방법 (C129) */
    private String empnoEntMth;
    /* 언어구분코드 C131 */
    private String langSeCode;
    /* 다중로그인허용여부(0|1) */
    private String multiLoginPermAt;
    /* 소수점 처리 방법 C032 */
    private String dcmlpointProcessMth;
    /* 비밀번호설정방법(C136) */
    private String passwordSettingMth;
    /* 검색기간설정코드 C132 */
    private String searchPdSettingCode;
    /* 개인정보인증 방법( 예를 들어 급여명세서 확인시 주민번호앞자리, 뒷자리) */
    private String selfAuthMth;
    /* 비밀번호변경주기(C135) */
    private String passwordChangeCycle;
    /* 비밀번호 다음변경 허용 여부(0|1) */
    private String nextChangeAt;
    /* 급여소수점처리방법C032 */
    private String salaryDcmlpointProcessMth;
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

    public Stmsys001() {
        //
    }

    public Stmsys001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.prductUseItem = StringExpression.nullConvert(egovMap.get("prductUseItem"));
            this.moduleUseItem = StringExpression.nullConvert(egovMap.get("moduleUseItem"));
            this.sknSeCode = StringExpression.nullConvert(egovMap.get("sknSeCode"));
            this.pgngUnit = StringExpression.nullConvert(egovMap.get("pgngUnit"));
            this.maskMthCode = StringExpression.nullConvert(egovMap.get("maskMthCode"));
            this.empnoEntMth = StringExpression.nullConvert(egovMap.get("empnoEntMth"));
            this.langSeCode = StringExpression.nullConvert(egovMap.get("langSeCode"));
            this.multiLoginPermAt = StringExpression.nullConvert(egovMap.get("multiLoginPermAt"));
            this.dcmlpointProcessMth = StringExpression.nullConvert(egovMap.get("dcmlpointProcessMth"));
            this.passwordSettingMth = StringExpression.nullConvert(egovMap.get("passwordSettingMth"));
            this.searchPdSettingCode = StringExpression.nullConvert(egovMap.get("searchPdSettingCode"));
            this.selfAuthMth = StringExpression.nullConvert(egovMap.get("selfAuthMth"));
            this.passwordChangeCycle = StringExpression.nullConvert(egovMap.get("passwordChangeCycle"));
            this.nextChangeAt = StringExpression.nullConvert(egovMap.get("nextChangeAt"));
            this.salaryDcmlpointProcessMth = StringExpression.nullConvert(egovMap.get("salaryDcmlpointProcessMth"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Stmsys001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.prductUseItem = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prductUseItem")));
            this.moduleUseItem = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_moduleUseItem")));
            this.sknSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sknSeCode")));
            this.pgngUnit = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pgngUnit")));
            this.maskMthCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_maskMthCode")));
            this.empnoEntMth = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empnoEntMth")));
            this.langSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_langSeCode")));
            this.multiLoginPermAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_multiLoginPermAt")));
            this.dcmlpointProcessMth = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dcmlpointProcessMth")));
            this.passwordSettingMth = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_passwordSettingMth")));
            this.searchPdSettingCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_searchPdSettingCode")));
            this.selfAuthMth = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_selfAuthMth")));
            this.passwordChangeCycle = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_passwordChangeCycle")));
            this.nextChangeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nextChangeAt")));
            this.salaryDcmlpointProcessMth = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryDcmlpointProcessMth")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getPrductUseItem() {
        return prductUseItem;
    }
    public void setPrductUseItem(String prductUseItem) {
        this.prductUseItem = prductUseItem;
    }

    public String getModuleUseItem() {
        return moduleUseItem;
    }
    public void setModuleUseItem(String moduleUseItem) {
        this.moduleUseItem = moduleUseItem;
    }

    public String getSknSeCode() {
        return sknSeCode;
    }
    public void setSknSeCode(String sknSeCode) {
        this.sknSeCode = sknSeCode;
    }

    public String getPgngUnit() {
        return pgngUnit;
    }
    public void setPgngUnit(String pgngUnit) {
        this.pgngUnit = pgngUnit;
    }

    public String getMaskMthCode() {
        return maskMthCode;
    }
    public void setMaskMthCode(String maskMthCode) {
        this.maskMthCode = maskMthCode;
    }

    public String getEmpnoEntMth() {
        return empnoEntMth;
    }
    public void setEmpnoEntMth(String empnoEntMth) {
        this.empnoEntMth = empnoEntMth;
    }

    public String getLangSeCode() {
        return langSeCode;
    }
    public void setLangSeCode(String langSeCode) {
        this.langSeCode = langSeCode;
    }

    public String getMultiLoginPermAt() {
        return multiLoginPermAt;
    }
    public void setMultiLoginPermAt(String multiLoginPermAt) {
        this.multiLoginPermAt = multiLoginPermAt;
    }

    public String getDcmlpointProcessMth() {
        return dcmlpointProcessMth;
    }
    public void setDcmlpointProcessMth(String dcmlpointProcessMth) {
        this.dcmlpointProcessMth = dcmlpointProcessMth;
    }

    public String getPasswordSettingMth() {
        return passwordSettingMth;
    }
    public void setPasswordSettingMth(String passwordSettingMth) {
        this.passwordSettingMth = passwordSettingMth;
    }

    public String getSearchPdSettingCode() {
        return searchPdSettingCode;
    }
    public void setSearchPdSettingCode(String searchPdSettingCode) {
        this.searchPdSettingCode = searchPdSettingCode;
    }

    public String getSelfAuthMth() {
        return selfAuthMth;
    }
    public void setSelfAuthMth(String selfAuthMth) {
        this.selfAuthMth = selfAuthMth;
    }

    public String getPasswordChangeCycle() {
        return passwordChangeCycle;
    }
    public void setPasswordChangeCycle(String passwordChangeCycle) {
        this.passwordChangeCycle = passwordChangeCycle;
    }

    public String getNextChangeAt() {
        return nextChangeAt;
    }
    public void setNextChangeAt(String nextChangeAt) {
        this.nextChangeAt = nextChangeAt;
    }

    public String getSalaryDcmlpointProcessMth() {
        return salaryDcmlpointProcessMth;
    }
    public void setSalaryDcmlpointProcessMth(String salaryDcmlpointProcessMth) {
        this.salaryDcmlpointProcessMth = salaryDcmlpointProcessMth;
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
