package kr.co.dbvision.api.stm.sys.stmsys007.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 전자결재환경관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.29
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.29)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.29          디비비전              최초 생성
 * </pre>
 */

public class Stmsys007 extends CommonVO {

    /* 사업장구분코드 기본 자리수는 4자리 */
    private String bplcCode;
    /*  */
    private String readng;
    /**/
    private String sealImg;
    /**/
    private String signMarkWay;
    
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

    public Stmsys007() {
        //
    }

    public Stmsys007(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.readng = StringExpression.nullConvert(egovMap.get("readng"));
            this.sealImg = StringExpression.nullConvert(egovMap.get("sealImg"));
            this.signMarkWay = StringExpression.nullConvert(egovMap.get("signMarkWay"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Stmsys007(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.readng = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_readng")));
            this.sealImg = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sealImg")));
            this.signMarkWay = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_signMarkWay")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getReadng() {
        return readng;
    }
    public void setReadng(String readng) {
        this.readng = readng;
    }

    public String getSealImg() {
        return sealImg;
    }
    public void setSealImg(String sealImg) {
        this.sealImg = sealImg;
    }

    public String getSignMarkWay() {
        return signMarkWay;
    }
    public void signMarkWay(String signMarkWay) {
        this.signMarkWay = signMarkWay;
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
