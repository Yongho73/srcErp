package kr.co.dbvision.api.stm.mng.stmmng013.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 명함관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.31
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.31)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.31          디비비전              최초 생성
 * </pre>
 */

public class Stmmng013 extends CommonVO {

    /* 고객번호 */
    private String custNo;
    /* 고객성명 */
    private String custNm;
    /* 직급 */
    private String clsf;
    /* 회사부서 */
    private String cmpnyDept;
    /* 집전화번호 */
    private String homeTelno;
    /* 회사전화번호 */
    private String cmpnyTelno;
    /* 휴대폰번호 */
    private String mbtlnum;
    /* 이메일 */
    private String email;
    /* 우편번호 */
    private String zip;
    /* 기본주소 */
    private String bassAdres;
    /* 상세주소 */
    private String detailAdres;
    /* 거래처코드 */
    private String bcncCode;
    private String bcncCodeNm;
    private String bcncAt;
    /* 거래처 주 담당자 여부 */
    private String bcncChargerAt;
    /* 비고 */
    private String rm;
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

    public Stmmng013() {
        //
    }

    public Stmmng013(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.custNo = StringExpression.nullConvert(egovMap.get("custNo"));
            this.custNm = StringExpression.nullConvert(egovMap.get("custNm"));
            this.clsf = StringExpression.nullConvert(egovMap.get("clsf"));
            this.cmpnyDept = StringExpression.nullConvert(egovMap.get("cmpnyDept"));
            this.homeTelno = StringExpression.nullConvert(egovMap.get("homeTelno"));
            this.cmpnyTelno = StringExpression.nullConvert(egovMap.get("cmpnyTelno"));
            this.mbtlnum = StringExpression.nullConvert(egovMap.get("mbtlnum"));
            this.email = StringExpression.nullConvert(egovMap.get("email"));
            this.zip = StringExpression.nullConvert(egovMap.get("zip"));
            this.bassAdres = StringExpression.nullConvert(egovMap.get("bassAdres"));
            this.detailAdres = StringExpression.nullConvert(egovMap.get("detailAdres"));
            this.bcncCode = StringExpression.nullConvert(egovMap.get("bcncCode"));
            this.bcncCodeNm = StringExpression.nullConvert(egovMap.get("bcncCodeNm"));
            this.bcncAt = StringExpression.nullConvert(egovMap.get("bcncAt"));
            this.bcncChargerAt = StringExpression.nullConvert(egovMap.get("bcncChargerAt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Stmmng013(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.custNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_custNo")));
            this.custNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_custNm")));
            this.clsf = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsf")));
            this.cmpnyDept = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cmpnyDept")));
            this.homeTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_homeTelno")));
            this.cmpnyTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cmpnyTelno")));
            this.mbtlnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mbtlnum")));
            this.email = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_email")));
            this.zip = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_zip")));
            this.bassAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bassAdres")));
            this.detailAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_detailAdres")));
            this.bcncCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncCode")));
            this.bcncCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncCodeNm")));
            this.bcncChargerAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncChargerAt")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getCustNo() {
        return custNo;
    }
    public void setCustNo(String custNo) {
        this.custNo = custNo;
    }

    public String getCustNm() {
        return custNm;
    }
    public void setCustNm(String custNm) {
        this.custNm = custNm;
    }

    public String getClsf() {
        return clsf;
    }
    public void setClsf(String clsf) {
        this.clsf = clsf;
    }

    public String getCmpnyDept() {
        return cmpnyDept;
    }
    public void setCmpnyDept(String cmpnyDept) {
        this.cmpnyDept = cmpnyDept;
    }

    public String getHomeTelno() {
        return homeTelno;
    }
    public void setHomeTelno(String homeTelno) {
        this.homeTelno = homeTelno;
    }

    public String getCmpnyTelno() {
        return cmpnyTelno;
    }
    public void setCmpnyTelno(String cmpnyTelno) {
        this.cmpnyTelno = cmpnyTelno;
    }

    public String getMbtlnum() {
        return mbtlnum;
    }
    public void setMbtlnum(String mbtlnum) {
        this.mbtlnum = mbtlnum;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getBassAdres() {
        return bassAdres;
    }
    public void setBassAdres(String bassAdres) {
        this.bassAdres = bassAdres;
    }

    public String getDetailAdres() {
        return detailAdres;
    }
    public void setDetailAdres(String detailAdres) {
        this.detailAdres = detailAdres;
    }

    public String getBcncCode() {
        return bcncCode;
    }
    public void setBcncCode(String bcncCode) {
        this.bcncCode = bcncCode;
    }

    public String getBcncCodeNm() {
        return bcncCodeNm;
    }
    public void setBcncCodeNm(String bcncCodeNm) {
        this.bcncCodeNm = bcncCodeNm;
    }

    public String getBcncAt() {
        return bcncAt;
    }
    public void setBcncAt(String bcncAt) {
        this.bcncAt = bcncAt;
    }

    public String getBcncChargerAt() {
        return bcncChargerAt;
    }
    public void setBcncChargerAt(String bcncChargerAt) {
        this.bcncChargerAt = bcncChargerAt;
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
