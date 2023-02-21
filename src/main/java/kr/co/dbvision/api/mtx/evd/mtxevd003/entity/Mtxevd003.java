package kr.co.dbvision.api.mtx.evd.mtxevd003.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 법인카드 증빙관리에 관한 엔티티 클래스
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

public class Mtxevd003 extends CommonVO {

    /* 카드 증빙 번호 */
    private String cardEvidNo;
    /* 카드번호 */
    private String cardNo;
    /* 카드승인번호 */
    private String useConfmNo;
    /* 사업장코드 */
    private String bplcCode;
    /* 사업장코드 명 */
    private String bplcCodeNm;
    /* 사용자부서코드 */
    private String userDeptCode;
    /* 사용자 사원번호 */
    private String userEmpno;
    /* 사용일자 */
    private String useDe;
    /* 사용 금액 */
    private String useAmt;
    /* 전표발행금액 */
    private String slipIsuAmt;
    /* 할인금액 */
    private String dscntAmt;
    /* 승인 금액 */
    private String confmAmt;
    /* 공급금액 */
    private String supplyAmt;
    /* 부가세 금액 */
    private String vatAmt;
    /* 승인일자 */
    private String confmDe;
    /* 승인시각 */
    private String confmTm;
    /* 사업자구분코드 C017 */
    private String bsnmSeCode;
    /* 거래처명 */
    private String bcncNm;
    /* 업태 */
    private String bizcnd;
    /* 업종(종목) */
    private String induty;
    /* 사용 내역 */
    private String useDtls;
    /* 결의서 번호 */
    private String anactNo;
    /* 적격증빙여부 */
    private String properEvidAt;
    /* 작성구분코드 (전자|수기) */
    private String writeSeCode;
    /* 첨부파일 번호 */
    private String atchmnflNo;
    /* 비고 */
    private String rm;
    
    private String dashCardNo;
    private String cardNo1;
    private String cardNo2;
    private String cardNo3;
    private String cardNo4;

    private String deptNm;
    private String ownEmpnm;
    private String useEmpnm;
    
    
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

    public Mtxevd003() {
        //
    }

    public Mtxevd003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.cardEvidNo = StringExpression.nullConvert(egovMap.get("cardEvidNo"));
            this.cardNo = StringExpression.nullConvert(egovMap.get("cardNo"));
            this.useConfmNo = StringExpression.nullConvert(egovMap.get("useConfmNo"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.userDeptCode = StringExpression.nullConvert(egovMap.get("userDeptCode"));
            this.userEmpno = StringExpression.nullConvert(egovMap.get("userEmpno"));
            this.useDe = StringExpression.nullConvert(egovMap.get("useDe"));
            this.useAmt = StringExpression.nullConvert(egovMap.get("useAmt"));
            this.slipIsuAmt = StringExpression.nullConvert(egovMap.get("slipIsuAmt"));
            this.dscntAmt = StringExpression.nullConvert(egovMap.get("dscntAmt"));
            this.confmAmt = StringExpression.nullConvert(egovMap.get("confmAmt"));
            this.supplyAmt = StringExpression.nullConvert(egovMap.get("supplyAmt"));
            this.vatAmt = StringExpression.nullConvert(egovMap.get("vatAmt"));
            this.confmDe = StringExpression.nullConvert(egovMap.get("confmDe"));
            this.confmTm = StringExpression.nullConvert(egovMap.get("confmTm"));
            this.bsnmSeCode = StringExpression.nullConvert(egovMap.get("bsnmSeCode"));
            this.bcncNm = StringExpression.nullConvert(egovMap.get("bcncNm"));
            this.bizcnd = StringExpression.nullConvert(egovMap.get("bizcnd"));
            this.induty = StringExpression.nullConvert(egovMap.get("induty"));
            this.useDtls = StringExpression.nullConvert(egovMap.get("useDtls"));
            this.anactNo = StringExpression.nullConvert(egovMap.get("anactNo"));
            this.properEvidAt = StringExpression.nullConvert(egovMap.get("properEvidAt"));
            this.writeSeCode = StringExpression.nullConvert(egovMap.get("writeSeCode"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            
            this.dashCardNo = StringExpression.nullConvert(egovMap.get("dashCardNo"));
            this.cardNo1 = StringExpression.nullConvert(egovMap.get("cardNo1"));
            this.cardNo2 = StringExpression.nullConvert(egovMap.get("cardNo2"));
            this.cardNo3 = StringExpression.nullConvert(egovMap.get("cardNo3"));
            this.cardNo4 = StringExpression.nullConvert(egovMap.get("cardNo4"));
            this.deptNm = StringExpression.nullConvert(egovMap.get("deptNm"));
            this.ownEmpnm = StringExpression.nullConvert(egovMap.get("ownEmpnm"));
            this.useEmpnm = StringExpression.nullConvert(egovMap.get("useEmpnm"));
            
            
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.bplcCodeNm = StringExpression.nullConvert(egovMap.get("bplcCodeNm"));
        }
    }

    public Mtxevd003(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.cardEvidNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cardEvidNo")));
            this.cardNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cardNo")));
            this.useConfmNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useConfmNo")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.userDeptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_userDeptCode")));
            this.userEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_userEmpno")));
            this.useDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useDe")));
            this.useAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAmt")));
            this.slipIsuAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_slipIsuAmt")));
            this.dscntAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dscntAmt")));
            this.confmAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmAmt")));
            this.supplyAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_supplyAmt")));
            this.vatAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_vatAmt")));
            this.confmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmDe")));
            this.confmTm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmTm")));
            this.bsnmSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsnmSeCode")));
            this.bcncNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncNm")));
            this.bizcnd = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bizcnd")));
            this.induty = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_induty")));
            this.useDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useDtls")));
            this.anactNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_anactNo")));
            this.properEvidAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_properEvidAt")));
            this.writeSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_writeSeCode")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getCardEvidNo() {
        return cardEvidNo;
    }
    public void setCardEvidNo(String cardEvidNo) {
        this.cardEvidNo = cardEvidNo;
    }

    public String getCardNo() {
        return cardNo;
    }
    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getUseConfmNo() {
        return useConfmNo;
    }
    public void setUseConfmNo(String useConfmNo) {
        this.useConfmNo = useConfmNo;
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getUserDeptCode() {
        return userDeptCode;
    }
    public void setUserDeptCode(String userDeptCode) {
        this.userDeptCode = userDeptCode;
    }

    public String getUserEmpno() {
        return userEmpno;
    }
    public void setUserEmpno(String userEmpno) {
        this.userEmpno = userEmpno;
    }

    public String getUseDe() {
        return useDe;
    }
    public void setUseDe(String useDe) {
        this.useDe = useDe;
    }

    public String getUseAmt() {
        return useAmt;
    }
    public void setUseAmt(String useAmt) {
        this.useAmt = useAmt;
    }

    public String getSlipIsuAmt() {
        return slipIsuAmt;
    }
    public void setSlipIsuAmt(String slipIsuAmt) {
        this.slipIsuAmt = slipIsuAmt;
    }

    public String getDscntAmt() {
        return dscntAmt;
    }
    public void setDscntAmt(String dscntAmt) {
        this.dscntAmt = dscntAmt;
    }

    public String getConfmAmt() {
        return confmAmt;
    }
    public void setConfmAmt(String confmAmt) {
        this.confmAmt = confmAmt;
    }

    public String getSupplyAmt() {
        return supplyAmt;
    }
    public void setSupplyAmt(String supplyAmt) {
        this.supplyAmt = supplyAmt;
    }

    public String getVatAmt() {
        return vatAmt;
    }
    public void setVatAmt(String vatAmt) {
        this.vatAmt = vatAmt;
    }

    public String getConfmDe() {
        return confmDe;
    }
    public void setConfmDe(String confmDe) {
        this.confmDe = confmDe;
    }

    public String getConfmTm() {
        return confmTm;
    }
    public void setConfmTm(String confmTm) {
        this.confmTm = confmTm;
    }

    public String getBsnmSeCode() {
        return bsnmSeCode;
    }
    public void setBsnmSeCode(String bsnmSeCode) {
        this.bsnmSeCode = bsnmSeCode;
    }

    public String getBcncNm() {
        return bcncNm;
    }
    public void setBcncNm(String bcncNm) {
        this.bcncNm = bcncNm;
    }

    public String getBizcnd() {
        return bizcnd;
    }
    public void setBizcnd(String bizcnd) {
        this.bizcnd = bizcnd;
    }

    public String getInduty() {
        return induty;
    }
    public void setInduty(String induty) {
        this.induty = induty;
    }

    public String getUseDtls() {
        return useDtls;
    }
    public void setUseDtls(String useDtls) {
        this.useDtls = useDtls;
    }

    public String getAnactNo() {
        return anactNo;
    }
    public void setAnactNo(String anactNo) {
        this.anactNo = anactNo;
    }

    public String getProperEvidAt() {
        return properEvidAt;
    }
    public void setProperEvidAt(String properEvidAt) {
        this.properEvidAt = properEvidAt;
    }

    public String getWriteSeCode() {
        return writeSeCode;
    }
    public void setWriteSeCode(String writeSeCode) {
        this.writeSeCode = writeSeCode;
    }

    public String getAtchmnflNo() {
        return atchmnflNo;
    }
    public void setAtchmnflNo(String atchmnflNo) {
        this.atchmnflNo = atchmnflNo;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
    }
    
    public String getDashCardNo() {
        return dashCardNo;
    }

    public void setDashCardNo(String dashCardNo) {
        this.dashCardNo = dashCardNo;
    }

    public String getCardNo1() {
        return cardNo1;
    }

    public void setCardNo1(String cardNo1) {
        this.cardNo1 = cardNo1;
    }

    public String getCardNo2() {
        return cardNo2;
    }

    public void setCardNo2(String cardNo2) {
        this.cardNo2 = cardNo2;
    }

    public String getCardNo3() {
        return cardNo3;
    }

    public void setCardNo3(String cardNo3) {
        this.cardNo3 = cardNo3;
    }

    public String getCardNo4() {
        return cardNo4;
    }

    public void setCardNo4(String cardNo4) {
        this.cardNo4 = cardNo4;
    }

    public String getDeptNm() {
        return deptNm;
    }

    public void setDeptNm(String deptNm) {
        this.deptNm = deptNm;
    }

    public String getOwnEmpnm() {
        return ownEmpnm;
    }

    public void setOwnEmpnm(String ownEmpnm) {
        this.ownEmpnm = ownEmpnm;
    }

    public String getUseEmpnm() {
        return useEmpnm;
    }

    public void setUseEmpnm(String useEmpnm) {
        this.useEmpnm = useEmpnm;
    }

    public String getBplcCodeNm() {
        return bplcCodeNm;
    }
    public void setBplcCodeNm(String bplcCodeNm) {
        this.bplcCodeNm = bplcCodeNm;
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