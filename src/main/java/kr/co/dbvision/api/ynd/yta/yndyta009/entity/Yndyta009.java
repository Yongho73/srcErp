package kr.co.dbvision.api.ynd.yta.yndyta009.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 과세기준관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.09.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.09.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.04          디비비전              최초 생성
 * </pre>
 */

public class Yndyta009 extends CommonVO {

    /* 귀속연도 */
    private String belongYy;
    /* 일련번호 */
    private String serialNo;
    /* 한도 율 */
    private String lmtRt;
    /* 공제 하한 액 */
    private String taxtLwltAmt;
    /* 공제 상한 액 */
    private String taxtUplmtAmt;
    /* 기준 금액 */
    private String stdrAmt;
    /* 한도 금액(누진금액) */
    private String lmtAmt;
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

    public Yndyta009() {
        //
    }

    public Yndyta009(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.belongYy = StringExpression.nullConvert(egovMap.get("belongYy"));
            this.serialNo = StringExpression.nullConvert(egovMap.get("serialNo"));
            this.lmtRt = StringExpression.nullConvert(egovMap.get("lmtRt"));
            this.taxtLwltAmt = StringExpression.nullConvert(egovMap.get("taxtLwltAmt"));
            this.taxtUplmtAmt = StringExpression.nullConvert(egovMap.get("taxtUplmtAmt"));
            this.stdrAmt = StringExpression.nullConvert(egovMap.get("stdrAmt"));
            this.lmtAmt = StringExpression.nullConvert(egovMap.get("lmtAmt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Yndyta009(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.belongYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_belongYy")));
            this.serialNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_serialNo")));
            this.lmtRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lmtRt")));
            this.taxtLwltAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxtLwltAmt")));
            this.taxtUplmtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_taxtUplmtAmt")));
            this.stdrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stdrAmt")));
            this.lmtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lmtAmt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getBelongYy() {
        return belongYy;
    }
    public void setBelongYy(String belongYy) {
        this.belongYy = belongYy;
    }

    public String getSerialNo() {
        return serialNo;
    }
    public void setSerialNo(String serialNo) {
        this.serialNo = serialNo;
    }

    public String getLmtRt() {
        return lmtRt;
    }
    public void setLmtRt(String lmtRt) {
        this.lmtRt = lmtRt;
    }

    public String getTaxtLwltAmt() {
        return taxtLwltAmt;
    }
    public void setTaxtLwltAmt(String taxtLwltAmt) {
        this.taxtLwltAmt = taxtLwltAmt;
    }

    public String getTaxtUplmtAmt() {
        return taxtUplmtAmt;
    }
    public void setTaxtUplmtAmt(String taxtUplmtAmt) {
        this.taxtUplmtAmt = taxtUplmtAmt;
    }

    public String getStdrAmt() {
        return stdrAmt;
    }
    public void setStdrAmt(String stdrAmt) {
        this.stdrAmt = stdrAmt;
    }

    public String getLmtAmt() {
        return lmtAmt;
    }
    public void setLmtAmt(String lmtAmt) {
        this.lmtAmt = lmtAmt;
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
