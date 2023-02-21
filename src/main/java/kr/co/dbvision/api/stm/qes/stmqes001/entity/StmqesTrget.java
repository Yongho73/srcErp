package kr.co.dbvision.api.stm.qes.stmqes001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 급여관리_계좌관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.09
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.09)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.09          디비비전              최초 생성
 * </pre>
 */

public class StmqesTrget extends CommonVO {
    /* 설문조사 코드*/
    private String qestnarCode;
    /* 설문조사 대상 순번*/
    private String qestnarTrgetSn;
    /* 대상구분 */
    private String trgetSe;
    /* 대상 ID*/
    private String trgterId;
    /* 등록일자 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일자 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public StmqesTrget() {
        //
    }

    public StmqesTrget(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.qestnarCode = StringExpression.nullConvert(egovMap.get("qestnarCode"));
            this.qestnarTrgetSn = StringExpression.nullConvert(egovMap.get("qestnarTrgetSn"));
            this.trgetSe = StringExpression.nullConvert(egovMap.get("trgetSe"));
            this.trgterId = StringExpression.nullConvert(egovMap.get("trgterId"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public StmqesTrget(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.qestnarCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarCode")));
            this.qestnarTrgetSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarTrgetSn")));
            this.trgetSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_trgetSe")));
            this.trgterId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_trgterId")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getQestnarCode() {
        return qestnarCode;
    }

    public void setQestnarCode(String qestnarCode) {
        this.qestnarCode = qestnarCode;
    }

    public String getQestnarTrgetSn() {
        return qestnarTrgetSn;
    }

    public void setQestnarTrgetSn(String qestnarTrgetSn) {
        this.qestnarTrgetSn = qestnarTrgetSn;
    }

    public String getTrgetSe() {
        return trgetSe;
    }

    public void setTrgetSe(String trgetSe) {
        this.trgetSe = trgetSe;
    }

    public String getTrgterId() {
        return trgterId;
    }

    public void setTrgterId(String trgterId) {
        this.trgterId = trgterId;
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
