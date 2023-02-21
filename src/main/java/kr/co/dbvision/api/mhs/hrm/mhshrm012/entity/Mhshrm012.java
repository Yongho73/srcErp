package kr.co.dbvision.api.mhs.hrm.mhshrm012.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 상벌코드관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */

public class Mhshrm012 extends CommonVO {

    /* 상벌 코드 */
    private String rwdsCode;
    /* 상벌 구분코드(C023) */
    private String rwdsSeCode;
    private String rwdsSeCodeNm;
    /* 상벌 코드명 */
    private String rwdsCodeNm;
    /* 사용시작일자 */
    private String useBeginDe;
    /* 사용종료일자( 사용여부가 N이 입력될경우 종료일자가 들어가야함 */
    private String useEndDe;
    /* 징계 규모(경중)(C211) */
    private String dscplScale;
    private String dscplScaleNm;
    /* 승진 제한 기간(개월) */
    private String prmotLmttPd;
    /* 감봉 기간(개월) */
    private String slyrdPd;
    /* 감봉 비율(%) */
    private String slyrdRt;
    /* 징계 금액 */
    private String dscplAmt;
    /* 사용여부 */
    private String useAt;
    private String useAtNm;
    /* 기타 비고사항을 기록관리하는 항목 */
    private String rm;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 사용여부 체크 */
    private String useCheck;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrm012() {
        //
    }

    public Mhshrm012(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.rwdsCode = StringExpression.nullConvert(egovMap.get("rwdsCode"));
            this.rwdsSeCode = StringExpression.nullConvert(egovMap.get("rwdsSeCode"));
            this.rwdsSeCodeNm = StringExpression.nullConvert(egovMap.get("rwdsSeCodeNm"));
            this.rwdsCodeNm = StringExpression.nullConvert(egovMap.get("rwdsCodeNm"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.dscplScale = StringExpression.nullConvert(egovMap.get("dscplScale"));
            this.dscplScaleNm = StringExpression.nullConvert(egovMap.get("dscplScaleNm"));
            this.prmotLmttPd = StringExpression.nullConvert(egovMap.get("prmotLmttPd"));
            this.slyrdPd = StringExpression.nullConvert(egovMap.get("slyrdPd"));
            this.slyrdRt = StringExpression.nullConvert(egovMap.get("slyrdRt"));
            this.dscplAmt = StringExpression.nullConvert(egovMap.get("dscplAmt"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.useAtNm = StringExpression.nullConvert(egovMap.get("useAtNm"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.useCheck = StringExpression.nullConvert(egovMap.get("useCheck"));
        }
    }

    public Mhshrm012(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.rwdsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rwdsCode")));
            this.rwdsSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rwdsSeCode")));
            this.rwdsCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rwdsCodeNm")));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useBeginDe")));
            this.useEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useEndDe")));
            this.dscplScale = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dscplScale")));
            this.prmotLmttPd = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prmotLmttPd")));
            this.slyrdPd = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_slyrdPd")));
            this.slyrdRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_slyrdRt")));
            this.dscplAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dscplAmt")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            this.useCheck = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useCheck")));
        }
    }

    public String getRwdsCode() {
        return rwdsCode;
    }
    public void setRwdsCode(String rwdsCode) {
        this.rwdsCode = rwdsCode;
    }

    public String getRwdsSeCode() {
        return rwdsSeCode;
    }
    public void setRwdsSeCode(String rwdsSeCode) {
        this.rwdsSeCode = rwdsSeCode;
    }

    public String getRwdsCodeNm() {
        return rwdsCodeNm;
    }
    public void setRwdsCodeNm(String rwdsCodeNm) {
        this.rwdsCodeNm = rwdsCodeNm;
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

    public String getDscplScale() {
        return dscplScale;
    }
    public void setDscplScale(String dscplScale) {
        this.dscplScale = dscplScale;
    }

    public String getPrmotLmttPd() {
        return prmotLmttPd;
    }
    public void setPrmotLmttPd(String prmotLmttPd) {
        this.prmotLmttPd = prmotLmttPd;
    }

    public String getSlyrdPd() {
        return slyrdPd;
    }
    public void setSlyrdPd(String slyrdPd) {
        this.slyrdPd = slyrdPd;
    }

    public String getSlyrdRt() {
        return slyrdRt;
    }
    public void setSlyrdRt(String slyrdRt) {
        this.slyrdRt = slyrdRt;
    }

    public String getDscplAmt() {
        return dscplAmt;
    }
    public void setDscplAmt(String dscplAmt) {
        this.dscplAmt = dscplAmt;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
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

    public String getUseCheck() {
        return useCheck;
    }
    public void setUseCheck(String useCheck) {
        this.useCheck = useCheck;
    }
}
