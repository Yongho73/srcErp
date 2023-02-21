package kr.co.dbvision.api.mhs.hrm.mhshrm004.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 직급코드관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.26
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.26)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.26          디비비전              최초 생성
 * </pre>
 */

public class Mhshrm004 extends CommonVO {

    /* 직급코드 */
    private String clsfCode;
    /* 직급 */
    private String clsfNm;
    /* 직급출력명 */
    private String clsfOutptNm;
    /* 사용시작일자 */
    private String useBeginDe;
    /* 사용종료일자( 사용여부가 N이 입력될경우
종료일자가 들어가야함 */
    private String useEndDe;
    /* 사용여부 */
    private String useAt;
    /* 정렬순서 */
    private String sortOrdr;
    /* 직급 교육 이수 학점 */
    private String clsfEduFinishPnt;
    /* 급여책정구분(C067) */
    private String salaryAprpSe;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 사용여부 확인 */
    private String useCheck;
    /* 승진 제한 기간(년) */
    private String prmotLmttPd;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrm004() {
        //
    }

    public Mhshrm004(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.clsfCode = StringExpression.nullConvert(egovMap.get("clsfCode"));
            this.clsfNm = StringExpression.nullConvert(egovMap.get("clsfNm"));
            this.clsfOutptNm = StringExpression.nullConvert(egovMap.get("clsfOutptNm"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.sortOrdr = StringExpression.nullConvert(egovMap.get("sortOrdr"));
            this.clsfEduFinishPnt = StringExpression.nullConvert(egovMap.get("clsfEduFinishPnt"));
            this.salaryAprpSe = StringExpression.nullConvert(egovMap.get("salaryAprpSe"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.useCheck = StringExpression.nullConvert(egovMap.get("useCheck"));
            this.prmotLmttPd = StringExpression.nullConvert(egovMap.get("prmotLmttPd"));
        }
    }

    public Mhshrm004(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.clsfCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfCode")));
            this.clsfNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfNm")));
            this.clsfOutptNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfOutptNm")));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useBeginDe")));
            this.useEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useEndDe")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.sortOrdr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sortOrdr")));
            this.clsfEduFinishPnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfEduFinishPnt")));
            this.salaryAprpSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryAprpSe")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.useCheck = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useCheck")));
            this.prmotLmttPd = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prmotLmttPd")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getClsfCode() {
        return clsfCode;
    }
    public void setClsfCode(String clsfCode) {
        this.clsfCode = clsfCode;
    }

    public String getClsfNm() {
        return clsfNm;
    }
    public void setClsfNm(String clsfNm) {
        this.clsfNm = clsfNm;
    }

    public String getClsfOutptNm() {
        return clsfOutptNm;
    }
    public void setClsfOutptNm(String clsfOutptNm) {
        this.clsfOutptNm = clsfOutptNm;
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

    public String getSortOrdr() {
        return sortOrdr;
    }
    public void setSortOrdr(String sortOrdr) {
        this.sortOrdr = sortOrdr;
    }

    public String getClsfEduFinishPnt() {
        return clsfEduFinishPnt;
    }
    public void setClsfEduFinishPnt(String clsfEduFinishPnt) {
        this.clsfEduFinishPnt = clsfEduFinishPnt;
    }

    public String getSalaryAprpSe() {
        return salaryAprpSe;
    }
    public void setSalaryAprpSe(String salaryAprpSe) {
        this.salaryAprpSe = salaryAprpSe;
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

    public String getPrmotLmttPd() {
        return prmotLmttPd;
    }
    public void setPrmotLmttPd(String prmotLmttPd) {
        this.prmotLmttPd = prmotLmttPd;
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
