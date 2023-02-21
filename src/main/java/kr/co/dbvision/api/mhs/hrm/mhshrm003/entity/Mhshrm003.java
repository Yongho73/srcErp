package kr.co.dbvision.api.mhs.hrm.mhshrm003.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 조직코드관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.20
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.20)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.20          디비비전              최초 생성
 * </pre>
 */

public class Mhshrm003 extends CommonVO {

    /* 조직코드 */
    private String orgnztCode;
    /* 부서코드 */
    private String deptCode;
    /* 상위 조직 코드 */
    private String upperOrgnztCode;
    /* 조직명 */
    private String orgnztNm;
    /* 조직 관리자 사원번호 */
    private String orgnztMngrEmpno;
    private String orgnztMngrEmpNm;
    /* 조직 구분 코드(C097) */
    private String orgnztSeCode;
    /* 조직계위(공통코드:C509) 결정권, 운영독립성에 의한 분류(본부, 센터, 부, 팀, ..) */
    private String orgnztLvl;
    /* 사용시작일자 */
    private String useBeginDe;
    /* 사용종료일자 */
    private String useEndDe;
    /* 사용 여부 */
    private String useAt;
    private String useAtNm;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    private String regNm;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 사용여부 확인 */
    private String useCheck;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrm003() {
        //
    }

    public Mhshrm003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.orgnztCode = StringExpression.nullConvert(egovMap.get("orgnztCode"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.upperOrgnztCode = StringExpression.nullConvert(egovMap.get("upperOrgnztCode"));
            this.orgnztNm = StringExpression.nullConvert(egovMap.get("orgnztNm"));
            this.orgnztMngrEmpno = StringExpression.nullConvert(egovMap.get("orgnztMngrEmpno"));
            this.orgnztMngrEmpNm = StringExpression.nullConvert(egovMap.get("orgnztMngrEmpNm"));
            this.orgnztSeCode = StringExpression.nullConvert(egovMap.get("orgnztSeCode"));
            this.orgnztLvl = StringExpression.nullConvert(egovMap.get("orgnztLvl"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.useAtNm = StringExpression.nullConvert(egovMap.get("useAtNm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.regNm = StringExpression.nullConvert(egovMap.get("regNm"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.useCheck = StringExpression.nullConvert(egovMap.get("useCheck"));
        }
    }

    public Mhshrm003(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.orgnztCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_orgnztCode")));
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode")));
            this.upperOrgnztCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_upperOrgnztCode")));
            this.orgnztNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_orgnztNm")));
            this.orgnztMngrEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_orgnztMngrEmpno")));
            this.orgnztSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_orgnztSeCode")));
            this.orgnztLvl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_orgnztLvl")));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useBeginDe")));
            this.useEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useEndDe")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.useCheck = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useCheck")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getOrgnztCode() {
        return orgnztCode;
    }
    public void setOrgnztCode(String orgnztCode) {
        this.orgnztCode = orgnztCode;
    }

    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getUpperOrgnztCode() {
        return upperOrgnztCode;
    }
    public void setUpperOrgnztCode(String upperOrgnztCode) {
        this.upperOrgnztCode = upperOrgnztCode;
    }

    public String getOrgnztNm() {
        return orgnztNm;
    }
    public void setOrgnztNm(String orgnztNm) {
        this.orgnztNm = orgnztNm;
    }

    public String getOrgnztMngrEmpno() {
        return orgnztMngrEmpno;
    }
    public void setOrgnztMngrEmpno(String orgnztMngrEmpno) {
        this.orgnztMngrEmpno = orgnztMngrEmpno;
    }

    public String getOrgnztSeCode() {
        return orgnztSeCode;
    }
    public void setOrgnztSeCode(String orgnztSeCode) {
        this.orgnztSeCode = orgnztSeCode;
    }

    public String getOrgnztLvl() {
        return orgnztLvl;
    }
    public void setOrgnztLvl(String orgnztLvl) {
        this.orgnztLvl = orgnztLvl;
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

    public String getUseCheck() {
        return useCheck;
    }
    public void setUseCheck(String useCheck) {
        this.useCheck = useCheck;
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
