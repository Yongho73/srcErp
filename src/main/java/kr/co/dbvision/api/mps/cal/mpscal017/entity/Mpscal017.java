package kr.co.dbvision.api.mps.cal.mpscal017.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 급여마감관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.03
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.03          디비비전              최초 생성
 * </pre>
 */

public class Mpscal017 extends CommonVO {

    /* 적용 년월 */
    private String applcYm;
    /* 지급 순번 */
    private String pymntSn;
    /* 지급 일자 */
    private String pymntDe;
    /* 지급 내역 */
    private String pymntDtls;
    /* 마감 여부 */
    private String closAt;
    /* 공개 여부 */
    private String othbcAt;
    /* 공개 일시 */
    private String othbcDt;
    
    private String belongYy;

    private String belongMm;
    
    private String salarytyCode;
    
    private String salaryitemNm;
     
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpscal017() {
        //
    }

    public Mpscal017(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYm = StringExpression.nullConvert(egovMap.get("applcYm"));
            this.pymntSn = StringExpression.nullConvert(egovMap.get("pymntSn"));
            this.pymntDe = StringExpression.nullConvert(egovMap.get("pymntDe"));
            this.pymntDtls = StringExpression.nullConvert(egovMap.get("pymntDtls"));
            this.closAt = StringExpression.nullConvert(egovMap.get("closAt"));
            this.othbcAt = StringExpression.nullConvert(egovMap.get("othbcAt"));
            this.othbcDt = StringExpression.nullConvert(egovMap.get("othbcDt"));
            this.belongYy = StringExpression.nullConvert(egovMap.get("belongYy"));
            this.belongMm = StringExpression.nullConvert(egovMap.get("belongMm"));
            this.salarytyCode = StringExpression.nullConvert(egovMap.get("salarytyCode"));
            this.salaryitemNm = StringExpression.nullConvert(egovMap.get("salaryitemNm"));
        }
    }

    public Mpscal017(EgovMapForNull egovMap, String dhxGridrowIds,String gubun) {
        super(egovMap);
        if(egovMap != null) {
            if (gubun =="2") {  //지급일자 
                this.pymntDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntDe")));
                this.applcYm  = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYm")));
                this.pymntDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntDtls")));
                this.pymntSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntSn")));
                this.closAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_closAt")));
                this.salarytyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarytyCode")));
                this.othbcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_othbcAt")));
                this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            }
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

    public String getPymntDe() {
        return pymntDe;
    }
    public void setPymntDe(String pymntDe) {
        this.pymntDe = pymntDe;
    }

    public String getPymntDtls() {
        return pymntDtls;
    }
    public void setPymntDtls(String pymntDtls) {
        this.pymntDtls = pymntDtls;
    }

    public String getClosAt() {
        return closAt;
    }
    public void setClosAt(String closAt) {
        this.closAt = closAt;
    }

    public String getOthbcAt() {
        return othbcAt;
    }
    public void setOthbcAt(String othbcAt) {
        this.othbcAt = othbcAt;
    }

    public String getOthbcDt() {
        return othbcDt;
    }
    public void setOthbcDt(String othbcDt) {
        this.othbcDt = othbcDt;
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

    public String getBelongYy() {
        return belongYy;
    }

    public void setBelongYy(String belongYy) {
        this.belongYy = belongYy;
    }

    public String getBelongMm() {
        return belongMm;
    }

    public void setBelongMm(String belongMm) {
        this.belongMm = belongMm;
    }

    public String getSalarytyCode() {
        return salarytyCode;
    }

    public void setSalarytyCode(String salarytyCode) {
        this.salarytyCode = salarytyCode;
    }

    public String getSalaryitemNm() {
        return salaryitemNm;
    }

    public void setSalaryitemNm(String salaryitemNm) {
        this.salaryitemNm = salaryitemNm;
    }

}