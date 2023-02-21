package kr.co.dbvision.api.mps.cal.mpscal022.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 급여관리_지급관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.10
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.10          디비비전              최초 생성
 * </pre>
 */

public class MpscalStdr extends CommonVO {

    /* 급여유형코드(급여/상여/특별성과) */
    private String salarytyCode;
    /* 급여항목코드 */
    private String salaryitemCode;
    /* 적용기준순번 */
    private String applcStdrSn;
    /* 계산기준순번 */
    private String calcStdrSn;
    /* 적용코드 */
    private String applcCode;
    /* 계산구분코드(C430) 계산식|금액 */
    private String calcSe;
    /* 계산수식내역 */
    private String calcNomfrmDtls;
    /* 적용구분 */
    private String applcSe;
    
    /*사원구분코드*/
    private String emplSeCode;
    /* 적용기준구분 */
    private String applcStdrSe;
    /* 계산순서 */
    private String calcOrdr;
    
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

    public MpscalStdr() {
        //
    }

    public MpscalStdr(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.salarytyCode = StringExpression.nullConvert(egovMap.get("salarytyCode"));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get("salaryitemCode"));
            this.applcStdrSn = StringExpression.nullConvert(egovMap.get("applcStdrSn"));
            this.calcStdrSn = StringExpression.nullConvert(egovMap.get("calcStdrSn"));
            this.applcCode = StringExpression.nullConvert(egovMap.get("applcCode"));
            this.calcSe = StringExpression.nullConvert(egovMap.get("calcSe"));
            this.applcSe = StringExpression.nullConvert(egovMap.get("applcSe"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            
            this.calcNomfrmDtls = StringExpression.nullConvert(egovMap.get("calcNomfrmDtls"));
            this.emplSeCode =   StringExpression.nullConvert(egovMap.get("emplSeCode"));
            this.applcStdrSe =  StringExpression.nullConvert(egovMap.get("applcStdrSe"));
            this.calcOrdr =     StringExpression.nullConvert(egovMap.get("calcOrdr"));
        }
    }

    public MpscalStdr(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.salarytyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarytyCode")));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemCode")));
            this.applcStdrSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcStdrSn")));
            this.calcStdrSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcStdrSn")));
            this.applcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcCode")));
            this.calcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcSe")));
            this.applcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcSe")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            
            this.emplSeCode =   StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_emplSeCode")));
            this.calcNomfrmDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcNomfrmDtls")));
            this.applcStdrSe =  StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcStdrSe")));
            this.calcOrdr =     StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcOrdr")));
            
        }
    }

    public String getSalarytyCode() {
        return salarytyCode;
    }
    public void setSalarytyCode(String salarytyCode) {
        this.salarytyCode = salarytyCode;
    }

    public String getSalaryitemCode() {
        return salaryitemCode;
    }
    public void setSalaryitemCode(String salaryitemCode) {
        this.salaryitemCode = salaryitemCode;
    }

    public String getApplcStdrSn() {
        return applcStdrSn;
    }
    public void setApplcStdrSn(String applcStdrSn) {
        this.applcStdrSn = applcStdrSn;
    }

    public String getCalcStdrSn() {
        return calcStdrSn;
    }
    public void setCalcStdrSn(String calcStdrSn) {
        this.calcStdrSn = calcStdrSn;
    }

    public String getApplcCode() {
        return applcCode;
    }
    public void setApplcCode(String applcCode) {
        this.applcCode = applcCode;
    }

    public String getCalcSe() {
        return calcSe;
    }
    public void setCalcSe(String calcSe) {
        this.calcSe = calcSe;
    }

    public String getCalcNomfrmDtls() {
        return calcNomfrmDtls;
    }
    public void setCalcNomfrmDtls(String calcNomfrmDtls) {
        this.calcNomfrmDtls = calcNomfrmDtls;
    }

    public String getApplcSe() {
        return applcSe;
    }
    public void setApplcSe(String applcSe) {
        this.applcSe = applcSe;
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
    

    public String getEmplSeCode() {
        return emplSeCode;
    }

    public void setEmplSeCode(String emplSeCode) {
        this.emplSeCode = emplSeCode;
    }

    public String getApplcStdrSe() {
        return applcStdrSe;
    }

    public void setApplcStdrSe(String applcStdrSe) {
        this.applcStdrSe = applcStdrSe;
    }

    public String getCalcOrdr() {
        return calcOrdr;
    }

    public void setCalcOrdr(String calcOrdr) {
        this.calcOrdr = calcOrdr;
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
