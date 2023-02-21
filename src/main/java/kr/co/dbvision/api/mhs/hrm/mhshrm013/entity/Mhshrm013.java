package kr.co.dbvision.api.mhs.hrm.mhshrm013.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 근태코드관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.04          디비비전              최초 생성
 * </pre>
 */

public class Mhshrm013 extends CommonVO {

    /* 근태코드 */
    private String dclzcode;
    /* 근태코드 명 */
    private String dclzcodeNm;
    /* 결근 구분코드 */
    private String absencSeCode;
    /* 휴가구분코드 */
    private String vacSeCode;
    /* 유무급여부 */
    private String enncamtAt;
    /* 등록일자 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일자 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 사용 여부 */
    private String useAt;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrm013() {
        //
    }

    public Mhshrm013(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.dclzcode = StringExpression.nullConvert(egovMap.get("dclzcode"));
            this.dclzcodeNm = StringExpression.nullConvert(egovMap.get("dclzcodeNm"));
            this.absencSeCode = StringExpression.nullConvert(egovMap.get("absencSeCode"));
            this.vacSeCode = StringExpression.nullConvert(egovMap.get("vacSeCode"));
            this.enncamtAt = StringExpression.nullConvert(egovMap.get("enncamtAt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
        }
    }

    public Mhshrm013(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.dclzcode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dclzcode")));
            this.dclzcodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dclzcodeNm")));
            this.absencSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_absencSeCode")));
            this.vacSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_vacSeCode")));
            this.enncamtAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_enncamtAt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getDclzcode() {
        return dclzcode;
    }
    public void setDclzcode(String dclzcode) {
        this.dclzcode = dclzcode;
    }

    public String getDclzcodeNm() {
        return dclzcodeNm;
    }
    public void setDclzcodeNm(String dclzcodeNm) {
        this.dclzcodeNm = dclzcodeNm;
    }

    public String getAbsencSeCode() {
        return absencSeCode;
    }
    public void setAbsencSeCode(String absencSeCode) {
        this.absencSeCode = absencSeCode;
    }

    public String getVacSeCode() {
        return vacSeCode;
    }
    public void setVacSeCode(String vacSeCode) {
        this.vacSeCode = vacSeCode;
    }

    public String getEnncamtAt() {
        return enncamtAt;
    }
    public void setEnncamtAt(String enncamtAt) {
        this.enncamtAt = enncamtAt;
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

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
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
