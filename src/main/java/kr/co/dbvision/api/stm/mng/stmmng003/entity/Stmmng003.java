package kr.co.dbvision.api.stm.mng.stmmng003.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 공통코드관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.22
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.22          디비비전              최초 생성
 * </pre>
 */

public class Stmmng003 extends CommonVO {

    /* 코드종류 코드 */
    private String codekindCode;
    private String codekind;
    /* 코드종류명 */
    private String codekindNm;
    /* 코드길이 */
    private String codeLt;
    /* 시스템구분코드(업무영역) */
    private String sysSe;
    /* 코드설명 */
    private String codeKindDc;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    
    /* 코드 */
    private String code;
    /* 코드명(한글) */
    private String codeKorNm;
    /* 코드명(영문) */
    private String codeEngNm;
    /* 코드설명 */
    private String codeDc;
    /* 정렬순서 */
    private String ordr;
    /* 사용여부 */
    private String useAt;
    /* 디폴트여부 */
    private String dfltAt;
    /* 팩터 */
    private String factor;
    /* 참조값1 */
    private String refer1Dc;
    /* 참조값2 */
    private String refer2Dc;
    /* 참조값3 */
    private String refer3Dc;
    /* 참조값4 */
    private String refer4Dc;
    /* 코드제3국 */
    private String codeThirdNm;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmmng003() {
        //
    }

    public Stmmng003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.codekindCode = StringExpression.nullConvert(egovMap.get("codekindCode"));
            this.codekind = StringExpression.nullConvert(egovMap.get("codekind"));
            this.codekindNm = StringExpression.nullConvert(egovMap.get("codekindNm"));
            this.codeLt = StringExpression.nullConvert(egovMap.get("codeLt"));
            this.sysSe = StringExpression.nullConvert(egovMap.get("sysSe"));
            this.codeKindDc = StringExpression.nullConvert(egovMap.get("codeKindDc"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            
            this.code = StringExpression.nullConvert(egovMap.get("code"));
            this.codeKorNm = StringExpression.nullConvert(egovMap.get("codeKorNm"));
            this.codeEngNm = StringExpression.nullConvert(egovMap.get("codeEngNm"));
            this.codeDc = StringExpression.nullConvert(egovMap.get("codeDc"));
            this.ordr = StringExpression.nullConvert(egovMap.get("ordr"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.dfltAt = StringExpression.nullConvert(egovMap.get("dfltAt"));
            this.factor = StringExpression.nullConvert(egovMap.get("factor"));
            this.refer1Dc = StringExpression.nullConvert(egovMap.get("refer1Dc"));
            this.refer2Dc = StringExpression.nullConvert(egovMap.get("refer2Dc"));
            this.refer3Dc = StringExpression.nullConvert(egovMap.get("refer3Dc"));
            this.refer4Dc = StringExpression.nullConvert(egovMap.get("refer4Dc"));
            this.codeThirdNm = StringExpression.nullConvert(egovMap.get("codeThirdNm"));
        }
    }

    public Stmmng003(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.codekindCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codekindCode")));
            this.codekind = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codekind")));
            this.codekindNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codekindNm")));
            this.codeLt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codeLt")));
            this.sysSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sysSe")));
            this.codeKindDc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codeKindDc")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            
            this.code = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_code")));
            this.codeKorNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codeKorNm")));
            this.codeEngNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codeEngNm")));
            this.codeDc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codeDc")));
            this.ordr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ordr")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.dfltAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dfltAt")));
            this.factor = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_factor")));
            this.refer1Dc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_refer1Dc")));
            this.refer2Dc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_refer2Dc")));
            this.refer3Dc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_refer3Dc")));
            this.refer4Dc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_refer4Dc")));
            this.codeThirdNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_codeThirdNm")));
            
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getCodekindCode() {
        return codekindCode;
    }
    public void setCodekindCode(String codekindCode) {
        this.codekindCode = codekindCode;
    }

    public String getCodekind() {
        return codekind;
    }
    public void setCodekind(String codekind) {
        this.codekind = codekind;
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

    public String getCodeKindDc() {
        return codeKindDc;
    }
    public void setCodeKindDc(String codeKindDc) {
        this.codeKindDc = codeKindDc;
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
    
    
    
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }

    public String getCodeKorNm() {
        return codeKorNm;
    }
    public void setCodeKorNm(String codeKorNm) {
        this.codeKorNm = codeKorNm;
    }

    public String getCodeEngNm() {
        return codeEngNm;
    }
    public void setCodeEngNm(String codeEngNm) {
        this.codeEngNm = codeEngNm;
    }

    public String getCodeDc() {
        return codeDc;
    }
    public void setCodeDc(String codeDc) {
        this.codeDc = codeDc;
    }

    public String getOrdr() {
        return ordr;
    }
    public void setOrdr(String ordr) {
        this.ordr = ordr;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getDfltAt() {
        return dfltAt;
    }
    public void setDfltAt(String dfltAt) {
        this.dfltAt = dfltAt;
    }

    public String getFactor() {
        return factor;
    }
    public void setFactor(String factor) {
        this.factor = factor;
    }

    public String getRefer1Dc() {
        return refer1Dc;
    }
    public void setRefer1Dc(String refer1Dc) {
        this.refer1Dc = refer1Dc;
    }

    public String getRefer2Dc() {
        return refer2Dc;
    }
    public void setRefer2Dc(String refer2Dc) {
        this.refer2Dc = refer2Dc;
    }

    public String getRefer3Dc() {
        return refer3Dc;
    }
    public void setRefer3Dc(String refer3Dc) {
        this.refer3Dc = refer3Dc;
    }

    public String getRefer4Dc() {
        return refer4Dc;
    }
    public void setRefer4Dc(String refer4Dc) {
        this.refer4Dc = refer4Dc;
    }

    public String getCodeThirdNm() {
        return codeThirdNm;
    }
    public void setCodeThirdNm(String codeThirdNm) {
        this.codeThirdNm = codeThirdNm;
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
