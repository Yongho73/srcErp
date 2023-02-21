package kr.co.dbvision.api.mtx.bsc.mtxbsc002.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 소득자관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.06
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.06          디비비전              최초 생성
 * </pre>
 */

public class Mtxbsc002 extends CommonVO {

    /* 소득자번호(규칙에 의한 일련번호 생성) */
    private String earnerNo;
    /* 사업장코드 */
    private String bplcCode;
    /* 소득자구분(C046) */
    private String earnerSeCode;
    /* 소득유형코드 C060 */
    private String earnerTyCode;
    /* 소득자성명 */
    private String earnerNm;
    /* 소득자주민번호(외국인번호) */
    private String ihidnum;
    /* 소득자사업자번호(사업소득자경우) */
    private String bizrno;
    /* 내외국인여부 */
    private String frgnrAt;
    /* 거주지국코드C122 */
    private String nltyCode;
    /* 거주여부C031 */
    private String liveSeCode;
    /* 우편번호 */
    private String postCode;
    /* 기본 주소 */
    private String bassAdres;
    /* 상세 주소 */
    private String detailAdres;
    /* 계좌번호 */
    private String acnutNo;
    /* 은행코드 */
    private String bankCode;
    /* 예금주 */
    private String dpstrNm;
    /* 거래처 */
    private String bcncNm;
    /* 직위명 */
    private String ofcpsNm;
    /* 직종 */
    private String jssfc;
    /* 연락처 */
    private String cttpc;
    /* 휴대폰번호 */
    private String mbtlnum;
    /* 비고 */
    private String rm;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mtxbsc002() {
        //
    }

    public Mtxbsc002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.earnerNo = StringExpression.nullConvert(egovMap.get("earnerNo"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.earnerSeCode = StringExpression.nullConvert(egovMap.get("earnerSeCode"));
            this.earnerTyCode = StringExpression.nullConvert(egovMap.get("earnerTyCode"));
            this.earnerNm = StringExpression.nullConvert(egovMap.get("earnerNm"));
            this.ihidnum = StringExpression.nullConvert(egovMap.get("ihidnum"));
            this.bizrno = StringExpression.nullConvert(egovMap.get("bizrno"));
            this.frgnrAt = StringExpression.nullConvert(egovMap.get("frgnrAt"));
            this.nltyCode = StringExpression.nullConvert(egovMap.get("nltyCode"));
            this.liveSeCode = StringExpression.nullConvert(egovMap.get("liveSeCode"));
            this.postCode = StringExpression.nullConvert(egovMap.get("postCode"));
            this.bassAdres = StringExpression.nullConvert(egovMap.get("bassAdres"));
            this.detailAdres = StringExpression.nullConvert(egovMap.get("detailAdres"));
            this.acnutNo = StringExpression.nullConvert(egovMap.get("acnutNo"));
            this.bankCode = StringExpression.nullConvert(egovMap.get("bankCode"));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get("dpstrNm"));
            this.bcncNm = StringExpression.nullConvert(egovMap.get("bcncNm"));
            this.ofcpsNm = StringExpression.nullConvert(egovMap.get("ofcpsNm"));
            this.jssfc = StringExpression.nullConvert(egovMap.get("jssfc"));
            this.cttpc = StringExpression.nullConvert(egovMap.get("cttpc"));
            this.mbtlnum = StringExpression.nullConvert(egovMap.get("mbtlnum"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
        }
    }

    public Mtxbsc002(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.earnerNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_earnerNo")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.earnerSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_earnerSeCode")));
            this.earnerTyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_earnerTyCode")));
            this.earnerNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_earnerNm")));
            this.ihidnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ihidnum")));
            this.bizrno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bizrno")));
            this.frgnrAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_frgnrAt")));
            this.nltyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nltyCode")));
            this.liveSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_liveSeCode")));
            this.postCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_postCode")));
            this.bassAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bassAdres")));
            this.detailAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_detailAdres")));
            this.acnutNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutNo")));
            this.bankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bankCode")));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dpstrNm")));
            this.bcncNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncNm")));
            this.ofcpsNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ofcpsNm")));
            this.jssfc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jssfc")));
            this.cttpc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cttpc")));
            this.mbtlnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mbtlnum")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getEarnerNo() {
        return earnerNo;
    }
    public void setEarnerNo(String earnerNo) {
        this.earnerNo = earnerNo;
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getEarnerSeCode() {
        return earnerSeCode;
    }
    public void setEarnerSeCode(String earnerSeCode) {
        this.earnerSeCode = earnerSeCode;
    }

    public String getEarnerTyCode() {
        return earnerTyCode;
    }
    public void setEarnerTyCode(String earnerTyCode) {
        this.earnerTyCode = earnerTyCode;
    }

    public String getEarnerNm() {
        return earnerNm;
    }
    public void setEarnerNm(String earnerNm) {
        this.earnerNm = earnerNm;
    }

    public String getIhidnum() {
        return ihidnum;
    }
    public void setIhidnum(String ihidnum) {
        this.ihidnum = ihidnum;
    }

    public String getBizrno() {
        return bizrno;
    }
    public void setBizrno(String bizrno) {
        this.bizrno = bizrno;
    }

    public String getFrgnrAt() {
        return frgnrAt;
    }
    public void setFrgnrAt(String frgnrAt) {
        this.frgnrAt = frgnrAt;
    }

    public String getNltyCode() {
        return nltyCode;
    }
    public void setNltyCode(String nltyCode) {
        this.nltyCode = nltyCode;
    }

    public String getLiveSeCode() {
        return liveSeCode;
    }
    public void setLiveSeCode(String liveSeCode) {
        this.liveSeCode = liveSeCode;
    }

    public String getPostCode() {
        return postCode;
    }
    public void setPostCode(String postCode) {
        this.postCode = postCode;
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

    public String getAcnutNo() {
        return acnutNo;
    }
    public void setAcnutNo(String acnutNo) {
        this.acnutNo = acnutNo;
    }

    public String getBankCode() {
        return bankCode;
    }
    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getDpstrNm() {
        return dpstrNm;
    }
    public void setDpstrNm(String dpstrNm) {
        this.dpstrNm = dpstrNm;
    }

    public String getBcncNm() {
        return bcncNm;
    }
    public void setBcncNm(String bcncNm) {
        this.bcncNm = bcncNm;
    }

    public String getOfcpsNm() {
        return ofcpsNm;
    }
    public void setOfcpsNm(String ofcpsNm) {
        this.ofcpsNm = ofcpsNm;
    }

    public String getJssfc() {
        return jssfc;
    }
    public void setJssfc(String jssfc) {
        this.jssfc = jssfc;
    }

    public String getCttpc() {
        return cttpc;
    }
    public void setCttpc(String cttpc) {
        this.cttpc = cttpc;
    }

    public String getMbtlnum() {
        return mbtlnum;
    }
    public void setMbtlnum(String mbtlnum) {
        this.mbtlnum = mbtlnum;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
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
