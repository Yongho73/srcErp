package kr.co.dbvision.api.mps.bsc.mpsbsc001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 급여항목관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.28
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.28          디비비전              최초 생성
 * </pre>
 */

public class Mpsbsc001 extends CommonVO {

    /* 급여항목코드 */
    private String salaryitemCode;
    /* 급여항목 */
    private String salaryitemNm;
    /* 지급공제구분(지급/공제) C064 */
    private String pymntddcSe;
    private String pymntddcSeNm;
    /* 급여대상구분 C249 */
    private String salaryApplcSe;
    private String salaryApplcSeNm;
    /* 급여항목내역 */
    private String salaryitemDtls;
    /* 사용시작일 */
    private String useBeginDe;
    /* 사용종료일 */
    private String useEndDe;
    /* 사용여부 */
    private String useAt;
    /* 출력순서 */
    private String outptOrdr;
    /* 통상임금포함 여부 */
    private String odysgInclsAt;
    /* 평균임금포함 여부 */
    private String avrgwageInclsAt;
    /* 수습적용 여부 */
    private String apntcApplcAt;
    /* 일할 계산 여부 */
    private String asyyCalcAt;
    /* 계정과목코드 */
    private String acntCd;
    /* 계산적용여부 -급여계산식 사용시 노출되는 급여항목 */
    private String calcApplcAt;
    /* 등록일시 */
    private String regDt;
    /* 수정일시 */
    private String uptDt;
    /* 예산 코드 */
    private String bugtCode;
    /* 중복확인 체크 */
    private String checkDup;
    /* 대상구분 */
    private String kindSe;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbsc001() {
        //
    }

    public Mpsbsc001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get("salaryitemCode"));
            this.salaryitemNm = StringExpression.nullConvert(egovMap.get("salaryitemNm"));
            this.pymntddcSe = StringExpression.nullConvert(egovMap.get("pymntddcSe"));
            this.pymntddcSeNm = StringExpression.nullConvert(egovMap.get("pymntddcSeNm"));
            this.salaryApplcSe = StringExpression.nullConvert(egovMap.get("salaryApplcSe"));
            this.salaryApplcSeNm = StringExpression.nullConvert(egovMap.get("salaryApplcSeNm"));
            this.salaryitemDtls = StringExpression.nullConvert(egovMap.get("salaryitemDtls"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.outptOrdr = StringExpression.nullConvert(egovMap.get("outptOrdr"));
            this.odysgInclsAt = StringExpression.nullConvert(egovMap.get("odysgInclsAt"));
            this.avrgwageInclsAt = StringExpression.nullConvert(egovMap.get("avrgwageInclsAt"));
            this.apntcApplcAt = StringExpression.nullConvert(egovMap.get("apntcApplcAt"));
            this.asyyCalcAt = StringExpression.nullConvert(egovMap.get("asyyCalcAt"));
            this.acntCd = StringExpression.nullConvert(egovMap.get("acntCd"));
            this.calcApplcAt = StringExpression.nullConvert(egovMap.get("calcApplcAt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.bugtCode = StringExpression.nullConvert(egovMap.get("bugtCode"));
            this.checkDup = StringExpression.nullConvert(egovMap.get("checkDup"));
            this.kindSe = StringExpression.nullConvert(egovMap.get("kindSe"));
        }
    }

    public Mpsbsc001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemCode")));
            this.salaryitemNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemNm")));
            this.pymntddcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntddcSe")));
            this.salaryApplcSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryApplcSe")));
            this.salaryitemDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemDtls")));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useBeginDe")));
            this.useEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useEndDe")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.outptOrdr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_outptOrdr")));
            this.odysgInclsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_odysgInclsAt")));
            this.avrgwageInclsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_avrgwageInclsAt")));
            this.apntcApplcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_apntcApplcAt")));
            this.asyyCalcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_asyyCalcAt")));
            this.acntCd = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acntCd")));
            this.calcApplcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcApplcAt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.bugtCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bugtCode")));
            this.kindSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_kindSe")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getSalaryitemCode() {
        return salaryitemCode;
    }
    public void setSalaryitemCode(String salaryitemCode) {
        this.salaryitemCode = salaryitemCode;
    }

    public String getSalaryitemNm() {
        return salaryitemNm;
    }
    public void setSalaryitemNm(String salaryitemNm) {
        this.salaryitemNm = salaryitemNm;
    }

    public String getPymntddcSe() {
        return pymntddcSe;
    }
    public void setPymntddcSe(String pymntddcSe) {
        this.pymntddcSe = pymntddcSe;
    }

    public String getSalaryitemDtls() {
        return salaryitemDtls;
    }
    public void setSalaryitemDtls(String salaryitemDtls) {
        this.salaryitemDtls = salaryitemDtls;
    }

    public String getSalaryApplcSe() {
        return salaryApplcSe;
    }
    public void setSalaryApplcSe(String salaryApplcSe) {
        this.salaryApplcSe = salaryApplcSe;
    }

    public String getSalaryApplcSeNm() {
        return salaryApplcSeNm;
    }
    public void setSalaryApplcSeNm(String salaryApplcSeNm) {
        this.salaryApplcSeNm = salaryApplcSeNm;
    }

    public String getUseBeginDe() {
        return useBeginDe;
    }
    public void setUseBeginDe(String useBeginDe) {
        this.useBeginDe = useBeginDe;
    }

    public String getUseEndDe() {
        return useEndDe;
    }
    public void setUseEndDe(String useEndDe) {
        this.useEndDe = useEndDe;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getOutptOrdr() {
        return outptOrdr;
    }
    public void setOutptOrdr(String outptOrdr) {
        this.outptOrdr = outptOrdr;
    }

    public String getOdysgInclsAt() {
        return odysgInclsAt;
    }
    public void setOdysgInclsAt(String odysgInclsAt) {
        this.odysgInclsAt = odysgInclsAt;
    }

    public String getAvrgwageInclsAt() {
        return avrgwageInclsAt;
    }
    public void setAvrgwageInclsAt(String avrgwageInclsAt) {
        this.avrgwageInclsAt = avrgwageInclsAt;
    }

    public String getApntcApplcAt() {
        return apntcApplcAt;
    }
    public void setApntcApplcAt(String apntcApplcAt) {
        this.apntcApplcAt = apntcApplcAt;
    }

    public String getAsyyCalcAt() {
        return asyyCalcAt;
    }
    public void setAsyyCalcAt(String asyyCalcAt) {
        this.asyyCalcAt = asyyCalcAt;
    }

    public String getAcntCd() {
        return acntCd;
    }
    public void setAcntCd(String acntCd) {
        this.acntCd = acntCd;
    }

    public String getCalcApplcAt() {
        return calcApplcAt;
    }
    public void setCalcApplcAt(String calcApplcAt) {
        this.calcApplcAt = calcApplcAt;
    }

    public String getRegDt() {
        return regDt;
    }
    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getUptDt() {
        return uptDt;
    }
    public void setUptDt(String uptDt) {
        this.uptDt = uptDt;
    }

    public String getBugtCode() {
        return bugtCode;
    }
    public void setBugtCode(String bugtCode) {
        this.bugtCode = bugtCode;
    }

    public String getKindSe() {
        return kindSe;
    }
    public void setKindSe(String kindSe) {
        this.kindSe = kindSe;
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
