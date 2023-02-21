package kr.co.dbvision.api.mps.bsc.mpsbsc007.entity;

import java.util.ArrayList;

import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 호봉테이블등록관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.06.09
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.09          디비비전              최초 생성
 * </pre>
 */

public class Mpsbsc007 extends CommonVO {

    /* 적용 년도 */
    private String applcYm;
    /* 직급 코드 */
    private String clsfCode;
    /* 호봉 코드 */
    private String srclsCode;
    /* 금액 */
    private String amt;
  
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
    
    /* 비고 */
    private String rm;

    public Mpsbsc007() {
        //
    }

    public Mpsbsc007(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYm = StringExpression.nullConvert(egovMap.get("applcYm"));
            this.clsfCode = StringExpression.nullConvert(egovMap.get("clsfCode"));
            this.srclsCode = StringExpression.nullConvert(egovMap.get("srclsCode"));
            this.amt            = StringExpression.nullConvert(egovMap.get("amt"));          
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            
            this.rm = StringExpression.nullConvert(egovMap.get("rm")); 
        }
    }

    public Mpsbsc007(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYm")));
            this.clsfCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfCode")));
            this.srclsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_srclsCode")));
            this.amt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_amt")));                    
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }
    
    

    public String getRm() {
        return rm;
    }

    public void setRm(String rm) {
        this.rm = rm;
    }

    public String getApplcYm() {
        return applcYm;
    }
    public void setApplcYm(String applcYm) {
        this.applcYm = applcYm;
    }

    public String getClsfCode() {
        return clsfCode;
    }
    public void setClsfCode(String clsfCode) {
        this.clsfCode = clsfCode;
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

    public String getSrclsCode() {
        return srclsCode;
    }

    public void setSrclsCode(String srclsCode) {
        this.srclsCode = srclsCode;
    }

    public String getAmt() {
        return amt;
    }

    public void setAmt(String amt) {
        this.amt = amt;
    }    
}
