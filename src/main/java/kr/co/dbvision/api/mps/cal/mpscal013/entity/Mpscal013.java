package kr.co.dbvision.api.mps.cal.mpscal013.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 급여대상자생성관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.06.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.17          디비비전              최초 생성
 * </pre>
 */

public class Mpscal013 extends CommonVO {

    /* 적용 년월 */
    private String applcYm;
    /* 지급 순번 */
    private String pymntSn;
    /* 사원번호 */
    private String empno;
    /* 직원구분코드 */
    private String empSeCode;
    /* 계좌번호 */
    private String acnutNo;
    /* 은행코드 */
    private String bankCode;
    /* 예금주명 */
    private String dpstrNm;
    /* 사업장코드 */
    private String bplcCode;
    /* 부서코드 */
    private String deptCode;
    /* 직급코드 */
    private String clsfCode;
    /* 직책코드 */
    private String rspofcCode;
    /* 직무코드 */
    private String dtyCode;
    /* 호봉코드 */
    private String srclsCode;
    /* 직종코드 */
    private String jssfcCode;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    
    private String korNm; 

    private String acnutSeCode;
    
    // 전월복사 때문에 Yy 필요
    private String applcYy;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpscal013() {
        //
    }

    public Mpscal013(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYm = StringExpression.nullConvert(egovMap.get("applcYm"));
            this.pymntSn = StringExpression.nullConvert(egovMap.get("pymntSn"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.empSeCode = StringExpression.nullConvert(egovMap.get("empSeCode"));
            this.acnutNo = StringExpression.nullConvert(egovMap.get("acnutNo"));
            this.bankCode = StringExpression.nullConvert(egovMap.get("bankCode"));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get("dpstrNm"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.clsfCode = StringExpression.nullConvert(egovMap.get("clsfCode"));
            this.rspofcCode = StringExpression.nullConvert(egovMap.get("rspofcCode"));
            this.dtyCode = StringExpression.nullConvert(egovMap.get("dtyCode"));
            this.srclsCode = StringExpression.nullConvert(egovMap.get("srclsCode"));
            this.jssfcCode = StringExpression.nullConvert(egovMap.get("jssfcCode"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            
            this.uptDt = StringExpression.nullConvert(egovMap.get("korNm"));
            this.acnutSeCode = StringExpression.nullConvert(egovMap.get("acnutSeCode"));
            
            this.applcYy = StringExpression.nullConvert(egovMap.get("applcYy"));
            
        }
    }

    public Mpscal013(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYm")));
            this.pymntSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntSn")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.empSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empSeCode")));
            this.acnutNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutNo")));
            this.bankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bankCode")));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dpstrNm")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode")));
            this.clsfCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfCode")));
            this.rspofcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rspofcCode")));
            this.dtyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dtyCode")));
            this.srclsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_srclsCode")));
            this.jssfcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jssfcCode")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
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

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getEmpSeCode() {
        return empSeCode;
    }
    public void setEmpSeCode(String empSeCode) {
        this.empSeCode = empSeCode;
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

    public String getDpstrNm() {
        return dpstrNm;
    }
    public void setDpstrNm(String dpstrNm) {
        this.dpstrNm = dpstrNm;
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
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

    public String getRspofcCode() {
        return rspofcCode;
    }
    public void setRspofcCode(String rspofcCode) {
        this.rspofcCode = rspofcCode;
    }

    public String getDtyCode() {
        return dtyCode;
    }
    public void setDtyCode(String dtyCode) {
        this.dtyCode = dtyCode;
    }

    public String getSrclsCode() {
        return srclsCode;
    }
    public void setSrclsCode(String srclsCode) {
        this.srclsCode = srclsCode;
    }

    public String getJssfcCode() {
        return jssfcCode;
    }
    public void setJssfcCode(String jssfcCode) {
        this.jssfcCode = jssfcCode;
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

    public String getKorNm() {
        return korNm;
    }

    public void setKorNm(String korNm) {
        this.korNm = korNm;
    }

    
    public String getAcnutSeCode() {
        return acnutSeCode;
    }

    public void setAcnutSeCode(String acnutSeCode) {
        this.acnutSeCode = acnutSeCode;
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

    public String getApplcYy() {
        return applcYy;
    }

    public void setApplcYy(String applcYy) {
        this.applcYy = applcYy;
    }
    
}
