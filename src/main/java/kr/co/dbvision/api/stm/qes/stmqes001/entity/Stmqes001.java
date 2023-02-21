package kr.co.dbvision.api.stm.qes.stmqes001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 설문관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.09.04
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.04)
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

public class Stmqes001 extends CommonVO {

    /* 설문조사 코드 : 자동채번 사용 */
    private String qestnarCode;
    /* 설문조사 명칭 */
    private String qestnarNm;
    /* 사용 여부 */
    private String useAt;
    /* 설문조사 시작일자 */
    private String qestnarSdt;
    /* 설문조사 종료일자 */
    private String qestnarEdt;
    /* 비고 */
    private String rm;
    /* 수정 가능 여부 : 1=수정불 */
    private String updtPosblAt;
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

    public Stmqes001() {
        //
    }

    public Stmqes001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.qestnarCode = StringExpression.nullConvert(egovMap.get("qestnarCode"));
            this.qestnarNm = StringExpression.nullConvert(egovMap.get("qestnarNm"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.qestnarSdt = StringExpression.nullConvert(egovMap.get("qestnarSdt"));
            this.qestnarEdt = StringExpression.nullConvert(egovMap.get("qestnarEdt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.updtPosblAt = StringExpression.nullConvert(egovMap.get("updtPosblAt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Stmqes001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.qestnarCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarCode")));
            this.qestnarNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarNm")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.qestnarSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarSdt")));
            this.qestnarEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarEdt")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.updtPosblAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_updtPosblAt")));
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

    public String getQestnarNm() {
        return qestnarNm;
    }
    public void setQestnarNm(String qestnarNm) {
        this.qestnarNm = qestnarNm;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getQestnarSdt() {
        return qestnarSdt;
    }
    public void setQestnarSdt(String qestnarSdt) {
        this.qestnarSdt = qestnarSdt;
    }

    public String getQestnarEdt() {
        return qestnarEdt;
    }
    public void setQestnarEdt(String qestnarEdt) {
        this.qestnarEdt = qestnarEdt;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
    }

    public String getUpdtPosblAt() {
        return updtPosblAt;
    }
    public void setUpdtPosblAt(String updtPosblAt) {
        this.updtPosblAt = updtPosblAt;
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
