package kr.co.dbvision.api.mps.cal.mpscal022.entity;

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

public class MpscalAcnut extends CommonVO {

    /* 사원번호 */
    private String empno;
    /* 계좌순번 */
    private String acnutSn;
    /* 계좌순번 */
    private int acnutSnNew;
    /* 계좌구분코드 */
    private String acnutSeCode;
    /* 은행코드 */
    private String bankCode;
    /* 은행명 */
    private String bankNm;
    /* 계좌번호 */
    private String acnutno;
    /* 예금주명 */
    private String dpstrNm;
    /* 시작일자 */
    private String beginDe;
    /* 종료일자 */
    private String endDe;
    /* 통장 첨부파일번호 */
    private String bnkbAtchmnflno;
    /* 비고 */
    private String rm;
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

    public MpscalAcnut() {
        //
    }

    public MpscalAcnut(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            if(egovMap.get("acnutSnNew") != null) {
                this.acnutSnNew = (int) egovMap.get("acnutSnNew");
            }
            else {
                this.acnutSnNew = 0;
            }
            
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.acnutSn = StringExpression.nullConvert(egovMap.get("acnutSn"));
            this.acnutSeCode = StringExpression.nullConvert(egovMap.get("acnutSeCode"));
            this.bankCode = StringExpression.nullConvert(egovMap.get("bankCode"));
            this.bankNm = StringExpression.nullConvert(egovMap.get("bankNm"));
            this.acnutno = StringExpression.nullConvert(egovMap.get("acnutno"));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get("dpstrNm"));
            this.beginDe = StringExpression.nullConvert(egovMap.get("beginDe"));
            this.endDe = StringExpression.nullConvert(egovMap.get("endDe"));
            this.bnkbAtchmnflno = StringExpression.nullConvert(egovMap.get("bnkbAtchmnflno"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public MpscalAcnut(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.acnutSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutSn")));
            this.acnutSnNew = 0;
            this.acnutSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutSeCode")));
            this.bankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bankCode")));
            this.bankNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bankNm")));
            this.acnutno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutno")));
            this.dpstrNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dpstrNm")));
            this.beginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_beginDe")));
            this.endDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_endDe")));
            this.bnkbAtchmnflno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bnkbAtchmnflno")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getAcnutSn() {
        return acnutSn;
    }
    public void setAcnutSn(String acnutSn) {
        this.acnutSn = acnutSn;
    }

    public Integer getAcnutSnNew() {
        return acnutSnNew;
    }
    public void setAcnutSnNew(Integer acnutSnNew) {
        this.acnutSnNew = acnutSnNew;
    }
    
    public String getAcnutSeCode() {
        return acnutSeCode;
    }
    public void setAcnutSeCode(String acnutSeCode) {
        this.acnutSeCode = acnutSeCode;
    }

    public String getBankCode() {
        return bankCode;
    }
    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankNm() {
        return bankNm;
    }
    public void setBankNm(String bankNm) {
        this.bankNm = bankNm;
    }

    public String getAcnutno() {
        return acnutno;
    }
    public void setAcnutno(String acnutno) {
        this.acnutno = acnutno;
    }

    public String getDpstrNm() {
        return dpstrNm;
    }
    public void setDpstrNm(String dpstrNm) {
        this.dpstrNm = dpstrNm;
    }

    public String getBeginDe() {
        return beginDe;
    }
    public void setBeginDe(String beginDe) {
        this.beginDe = beginDe;
    }

    public String getEndDe() {
        return endDe;
    }
    public void setEndDe(String endDe) {
        this.endDe = endDe;
    }

    public String getBnkbAtchmnflno() {
        return bnkbAtchmnflno;
    }
    public void setBnkbAtchmnflno(String bnkbAtchmnflno) {
        this.bnkbAtchmnflno = bnkbAtchmnflno;
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
