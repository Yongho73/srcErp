package kr.co.dbvision.api.pub.edu.pubedu003.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 테스트관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2021.06.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.22          디비비전              최초 생성
 * </pre>
 */

public class Pubedu003 extends CommonVO {

    /* 코드종류 코드 */
    private String codekindCode;
    /* 코드종류명 */
    private String codekindNm;
    /* 코드길이 */
    private String codeLt;
    /* 시스템구분코드(업무영역) */
    private String sysSe;
    /* 코드설명 */
    private String codeDc;
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

    public Pubedu003() {
        //
    }

    public Pubedu003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.codekindCode = StringExpression.nullConvert(egovMap.get("codekindCode"));
            this.codekindNm = StringExpression.nullConvert(egovMap.get("codekindNm"));
            this.codeLt = StringExpression.nullConvert(egovMap.get("codeLt"));
            this.sysSe = StringExpression.nullConvert(egovMap.get("sysSe"));
            this.codeDc = StringExpression.nullConvert(egovMap.get("codeDc"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Pubedu003(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.codekindCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codekindCode")));
            this.codekindNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codekindNm")));
            this.codeLt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codeLt")));
            this.sysSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sysSe")));
            this.codeDc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codeDc")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getCodekindCode() {
        return codekindCode;
    }
    public void setCodekindCode(String codekindCode) {
        this.codekindCode = codekindCode;
    }

    public String getCodekindNm() {
        return codekindNm;
    }
    public void setCodekindNm(String codekindNm) {
        this.codekindNm = codekindNm;
    }

    public String getCodeLt() {
        return codeLt;
    }
    public void setCodeLt(String codeLt) {
        this.codeLt = codeLt;
    }

    public String getSysSe() {
        return sysSe;
    }
    public void setSysSe(String sysSe) {
        this.sysSe = sysSe;
    }

    public String getCodeDc() {
        return codeDc;
    }
    public void setCodeDc(String codeDc) {
        this.codeDc = codeDc;
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
