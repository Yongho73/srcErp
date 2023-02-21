package kr.co.dbvision.api.mps.bsc.mpsbsc005.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 개인별급여기준일괄등록관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.05.12
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.12          디비비전              최초 생성
 * </pre>
 */

public class Mpsbsc005 extends CommonVO {

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
    
    
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbsc005() {
        //
    }

    public Mpsbsc005(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.salarytyCode = StringExpression.nullConvert(egovMap.get("salarytyCode"));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get("salaryitemCode"));
            this.applcStdrSn = StringExpression.nullConvert(egovMap.get("applcStdrSn"));
            this.calcStdrSn = StringExpression.nullConvert(egovMap.get("calcStdrSn"));
            this.applcCode = StringExpression.nullConvert(egovMap.get("applcCode"));
            this.calcSe = StringExpression.nullConvert(egovMap.get("calcSe"));
            this.calcNomfrmDtls = StringExpression.nullConvert(egovMap.get("calcNomfrmDtls"));
            this.applcSe = StringExpression.nullConvert(egovMap.get("applcSe"));
            this.emplSeCode =   StringExpression.nullConvert(egovMap.get("emplSeCode"));
            this.applcStdrSe =  StringExpression.nullConvert(egovMap.get("applcStdrSe"));
            this.calcOrdr =     StringExpression.nullConvert(egovMap.get("calcOrdr"));
        }
    }

    public Mpsbsc005(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.salarytyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarytyCode")));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemCode")));
            this.applcStdrSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcStdrSn")));
            this.calcStdrSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcStdrSn")));
            this.applcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcCode")));
            this.calcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcSe")));
            this.calcNomfrmDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcNomfrmDtls")));
            this.applcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcSe")));
            this.emplSeCode =   StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_emplSeCode")));
            this.applcStdrSe =  StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcStdrSe")));
            this.calcOrdr =     StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcOrdr")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
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
