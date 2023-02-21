package kr.co.dbvision.api.ynd.yta.yndyta008.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 근로소득세액기준관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.09.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.09.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.03          디비비전              최초 생성
 * </pre>
 */

public class Yndyta008 extends CommonVO {

    /* 귀속연도 */
    private String belongYy;
    /* 일련번호 */
    private String serialNo;
    /* 공제 하한 액 */
    private String ddcLwltAmt;
    /* 공제 상한 액 */
    private String ddcUplmtAmt;
    /* 기준 금액 */
    private String stdrAmt;
    /* 한도 금액 */
    private String lmtAmt;
    /* 한도 율 */
    private String lmtRt;
    /* 비고 */
    private String rm;
    /* 등록일시 */
    private String regDt;
    /* 수정일시 */
    private String uptDt;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Yndyta008() {
        //
    }

    public Yndyta008(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.belongYy = StringExpression.nullConvert(egovMap.get("belongYy"));
            this.serialNo = StringExpression.nullConvert(egovMap.get("serialNo"));
            this.ddcLwltAmt = StringExpression.nullConvert(egovMap.get("ddcLwltAmt"));
            this.ddcUplmtAmt = StringExpression.nullConvert(egovMap.get("ddcUplmtAmt"));
            this.stdrAmt = StringExpression.nullConvert(egovMap.get("stdrAmt"));
            this.lmtAmt = StringExpression.nullConvert(egovMap.get("lmtAmt"));
            this.lmtRt = StringExpression.nullConvert(egovMap.get("lmtRt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
        }
    }

    public Yndyta008(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.belongYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_belongYy")));
            this.serialNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_serialNo")));
            this.ddcLwltAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ddcLwltAmt")));
            this.ddcUplmtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ddcUplmtAmt")));
            this.stdrAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stdrAmt")));
            this.lmtAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lmtAmt")));
            this.lmtRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lmtRt")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
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

    public String getDdcLwltAmt() {
        return ddcLwltAmt;
    }
    public void setDdcLwltAmt(String ddcLwltAmt) {
        this.ddcLwltAmt = ddcLwltAmt;
    }

    public String getDdcUplmtAmt() {
        return ddcUplmtAmt;
    }
    public void setDdcUplmtAmt(String ddcUplmtAmt) {
        this.ddcUplmtAmt = ddcUplmtAmt;
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

    public String getLmtRt() {
        return lmtRt;
    }
    public void setLmtRt(String lmtRt) {
        this.lmtRt = lmtRt;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
    }

    public String getRegDt() {
        return regDt;
    }
    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getUptDt() {
        return uptDt;
    }
    public void setUptDt(String uptDt) {
        this.uptDt = uptDt;
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
