package kr.co.dbvision.api.mps.bsc.mpsbsc012.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 근로소득 간이세액표관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.04.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.03          디비비전              최초 생성
 * </pre>
 */

public class Mpsbsc012 extends CommonVO {

    /* 적용 년도 */
    private String applcYy;
    /* 적용할 세액의 월소득하한액(금액 이상 적용)  */
    private String lwltAmt;
    /* 적용할 세액의 월소득상한액(금액 미만 적용) */
    private String uplmtAmt;
    /* 적용시작년월 */
    private String applcBeginYm;
    /* 적용종료년월 */
    private String applcEndYm;
    /* 가족1인세액 */
    private String fam1Tax;
    /* 가족2인세액 */
    private String fam2Tax;
    /* 가족3인세액 */
    private String fam3Tax;
    /* 가족4인세액 */
    private String fam4Tax;
    /* 가족5인세액 */
    private String fam5Tax;
    /* 가족6인세액 */
    private String fam6Tax;
    /* 가족7일세액 */
    private String fam7Tax;
    /* 가족8인세액 */
    private String fam8Tax;
    /* 가족9인세액 */
    private String fam9Tax;
    /* 가족10인세액 */
    private String fam10Tax;
    /* 가족11일세액 */
    private String fam11Tax;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbsc012() {
        //
    }

    public Mpsbsc012(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYy = StringExpression.nullConvert(egovMap.get("applcYy"));
            this.lwltAmt = StringExpression.nullConvert(egovMap.get("lwltAmt"));
            this.uplmtAmt = StringExpression.nullConvert(egovMap.get("uplmtAmt"));
            this.applcBeginYm = StringExpression.nullConvert(egovMap.get("applcBeginYm"));
            this.applcEndYm = StringExpression.nullConvert(egovMap.get("applcEndYm"));
            this.fam1Tax = StringExpression.nullConvert(egovMap.get("fam1Tax"));
            this.fam2Tax = StringExpression.nullConvert(egovMap.get("fam2Tax"));
            this.fam3Tax = StringExpression.nullConvert(egovMap.get("fam3Tax"));
            this.fam4Tax = StringExpression.nullConvert(egovMap.get("fam4Tax"));
            this.fam5Tax = StringExpression.nullConvert(egovMap.get("fam5Tax"));
            this.fam6Tax = StringExpression.nullConvert(egovMap.get("fam6Tax"));
            this.fam7Tax = StringExpression.nullConvert(egovMap.get("fam7Tax"));
            this.fam8Tax = StringExpression.nullConvert(egovMap.get("fam8Tax"));
            this.fam9Tax = StringExpression.nullConvert(egovMap.get("fam9Tax"));
            this.fam10Tax = StringExpression.nullConvert(egovMap.get("fam10Tax"));
            this.fam11Tax = StringExpression.nullConvert(egovMap.get("fam11Tax"));
        }
    }

    public Mpsbsc012(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYy")));
            this.lwltAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lwltAmt")));
            this.uplmtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uplmtAmt")));
            this.applcBeginYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcBeginYm")));
            this.applcEndYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcEndYm")));
            this.fam1Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam1Tax")));
            this.fam2Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam2Tax")));
            this.fam3Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam3Tax")));
            this.fam4Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam4Tax")));
            this.fam5Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam5Tax")));
            this.fam6Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam6Tax")));
            this.fam7Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam7Tax")));
            this.fam8Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam8Tax")));
            this.fam9Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam9Tax")));
            this.fam10Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam10Tax")));
            this.fam11Tax = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fam11Tax")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getApplcYy() {
        return applcYy;
    }
    public void setApplcYy(String applcYy) {
        this.applcYy = applcYy;
    }

    public String getLwltAmt() {
        return lwltAmt;
    }
    public void setLwltAmt(String lwltAmt) {
        this.lwltAmt = lwltAmt;
    }

    public String getUplmtAmt() {
        return uplmtAmt;
    }
    public void setUplmtAmt(String uplmtAmt) {
        this.uplmtAmt = uplmtAmt;
    }

    public String getApplcBeginYm() {
        return applcBeginYm;
    }
    public void setApplcBeginYm(String applcBeginYm) {
        this.applcBeginYm = applcBeginYm;
    }

    public String getApplcEndYm() {
        return applcEndYm;
    }
    public void setApplcEndYm(String applcEndYm) {
        this.applcEndYm = applcEndYm;
    }

    public String getFam1Tax() {
        return fam1Tax;
    }
    public void setFam1Tax(String fam1Tax) {
        this.fam1Tax = fam1Tax;
    }

    public String getFam2Tax() {
        return fam2Tax;
    }
    public void setFam2Tax(String fam2Tax) {
        this.fam2Tax = fam2Tax;
    }

    public String getFam3Tax() {
        return fam3Tax;
    }
    public void setFam3Tax(String fam3Tax) {
        this.fam3Tax = fam3Tax;
    }

    public String getFam4Tax() {
        return fam4Tax;
    }
    public void setFam4Tax(String fam4Tax) {
        this.fam4Tax = fam4Tax;
    }

    public String getFam5Tax() {
        return fam5Tax;
    }
    public void setFam5Tax(String fam5Tax) {
        this.fam5Tax = fam5Tax;
    }

    public String getFam6Tax() {
        return fam6Tax;
    }
    public void setFam6Tax(String fam6Tax) {
        this.fam6Tax = fam6Tax;
    }

    public String getFam7Tax() {
        return fam7Tax;
    }
    public void setFam7Tax(String fam7Tax) {
        this.fam7Tax = fam7Tax;
    }

    public String getFam8Tax() {
        return fam8Tax;
    }
    public void setFam8Tax(String fam8Tax) {
        this.fam8Tax = fam8Tax;
    }

    public String getFam9Tax() {
        return fam9Tax;
    }
    public void setFam9Tax(String fam9Tax) {
        this.fam9Tax = fam9Tax;
    }

    public String getFam10Tax() {
        return fam10Tax;
    }
    public void setFam10Tax(String fam10Tax) {
        this.fam10Tax = fam10Tax;
    }

    public String getFam11Tax() {
        return fam11Tax;
    }
    public void setFam11Tax(String fam11Tax) {
        this.fam11Tax = fam11Tax;
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
