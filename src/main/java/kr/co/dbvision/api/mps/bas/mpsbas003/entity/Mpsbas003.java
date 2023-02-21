package kr.co.dbvision.api.mps.bas.mpsbas003.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 근로소득 간이세액표에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.05.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.11          디비비전              최초 생성
 *
 * </pre>
 */

public class Mpsbas003 extends CommonVO {

    /* 적용 시작 년월 */
    private String applcBeginYm;
    /* 하한 금액 */
    private String lwltAmt;
    /* 상한 금액 */
    private String uplmtAmt;
    /* 적용 종료 년월 */
    private String applcEndYm;
    /* 가족1 세액 */
    private String family1Tax;
    /* 가족2 세액 */
    private String family2Tax;
    /* 가족3 세액 */
    private String family3Tax;
    /* 가족4 세액 */
    private String family4Tax;
    /* 가족5 세액 */
    private String family5Tax;
    /* 가족6 세액 */
    private String family6Tax;
    /* 가족7 세액 */
    private String family7Tax;
    /* 가족8 세액 */
    private String family8Tax;
    /* 가족9 세액 */
    private String family9Tax;
    /* 가족10 세액 */
    private String family10Tax;
    /* 가족11 세액 */
    private String family11Tax;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbas003() {
        //
    }

    public Mpsbas003(EgovMapForNull egovMap) {
        super(egovMap);
        this.applcBeginYm = StringExpression.nullConvert(egovMap.get("applcBeginYm"));
        this.lwltAmt = StringExpression.nullConvert(egovMap.get("lwltAmt"));
        this.uplmtAmt = StringExpression.nullConvert(egovMap.get("uplmtAmt"));
        this.applcEndYm = StringExpression.nullConvert(egovMap.get("applcEndYm"));
        this.family1Tax = StringExpression.nullConvert(egovMap.get("family1Tax"));
        this.family2Tax = StringExpression.nullConvert(egovMap.get("family2Tax"));
        this.family3Tax = StringExpression.nullConvert(egovMap.get("family3Tax"));
        this.family4Tax = StringExpression.nullConvert(egovMap.get("family4Tax"));
        this.family5Tax = StringExpression.nullConvert(egovMap.get("family5Tax"));
        this.family6Tax = StringExpression.nullConvert(egovMap.get("family6Tax"));
        this.family7Tax = StringExpression.nullConvert(egovMap.get("family7Tax"));
        this.family8Tax = StringExpression.nullConvert(egovMap.get("family8Tax"));
        this.family9Tax = StringExpression.nullConvert(egovMap.get("family9Tax"));
        this.family10Tax = StringExpression.nullConvert(egovMap.get("family10Tax"));
        this.family11Tax = StringExpression.nullConvert(egovMap.get("family11Tax"));
    }

    public String getApplcBeginYm() {
        return applcBeginYm;
    }
    public void setApplcBeginYm(String applcBeginYm) {
        this.applcBeginYm = applcBeginYm;
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

    public String getApplcEndYm() {
        return applcEndYm;
    }
    public void setApplcEndYm(String applcEndYm) {
        this.applcEndYm = applcEndYm;
    }

    public String getFamily1Tax() {
        return family1Tax;
    }
    public void setFamily1Tax(String family1Tax) {
        this.family1Tax = family1Tax;
    }

    public String getFamily2Tax() {
        return family2Tax;
    }
    public void setFamily2Tax(String family2Tax) {
        this.family2Tax = family2Tax;
    }

    public String getFamily3Tax() {
        return family3Tax;
    }
    public void setFamily3Tax(String family3Tax) {
        this.family3Tax = family3Tax;
    }

    public String getFamily4Tax() {
        return family4Tax;
    }
    public void setFamily4Tax(String family4Tax) {
        this.family4Tax = family4Tax;
    }

    public String getFamily5Tax() {
        return family5Tax;
    }
    public void setFamily5Tax(String family5Tax) {
        this.family5Tax = family5Tax;
    }

    public String getFamily6Tax() {
        return family6Tax;
    }
    public void setFamily6Tax(String family6Tax) {
        this.family6Tax = family6Tax;
    }

    public String getFamily7Tax() {
        return family7Tax;
    }
    public void setFamily7Tax(String family7Tax) {
        this.family7Tax = family7Tax;
    }

    public String getFamily8Tax() {
        return family8Tax;
    }
    public void setFamily8Tax(String family8Tax) {
        this.family8Tax = family8Tax;
    }

    public String getFamily9Tax() {
        return family9Tax;
    }
    public void setFamily9Tax(String family9Tax) {
        this.family9Tax = family9Tax;
    }

    public String getFamily10Tax() {
        return family10Tax;
    }
    public void setFamily10Tax(String family10Tax) {
        this.family10Tax = family10Tax;
    }

    public String getFamily11Tax() {
        return family11Tax;
    }
    public void setFamily11Tax(String family11Tax) {
        this.family11Tax = family11Tax;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
