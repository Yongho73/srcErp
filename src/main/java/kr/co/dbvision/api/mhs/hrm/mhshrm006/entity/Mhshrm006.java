package kr.co.dbvision.api.mhs.hrm.mhshrm006.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 가족코드관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.04.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.23          디비비전              최초 생성
 * </pre>
 */

public class Mhshrm006 extends CommonVO {

    /* 가족코드 */
    private String familyCode;
    /* 가족관계명 */
    private String familyRelateNm;
    /* 가족 수당 금액 */
    private String familyAllwncAmt;
    /* 사용시작일자 */
    private String useBeginDe;
    /* 사용종료일자( 사용여부가 N이 입력될경우 종료일자가 들어가야함 */
    private String useEndDe;
    /* 사용여부 */
    private String useAt;
    /* 정렬순서 */
    private String sortOrdr;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();
    /* 사용여부 */
    private String useCheck;

    public Mhshrm006() {
        //
    }

    public Mhshrm006(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.familyCode = StringExpression.nullConvert(egovMap.get("familyCode"));
            this.familyRelateNm = StringExpression.nullConvert(egovMap.get("familyRelateNm"));
            this.familyAllwncAmt = StringExpression.nullConvert(egovMap.get("familyAllwncAmt"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.sortOrdr = StringExpression.nullConvert(egovMap.get("sortOrdr"));
            this.useCheck = StringExpression.nullConvert(egovMap.get("useCheck"));
        }
    }

    public Mhshrm006(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.familyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_familyCode")));
            this.familyRelateNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_familyRelateNm")));
            this.familyAllwncAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_familyAllwncAmt")));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useBeginDe")));
            this.useEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useEndDe")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.sortOrdr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sortOrdr")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            this.useCheck = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useCheck")));
        }
    }

    public String getFamilyCode() {
        return familyCode;
    }
    public void setFamilyCode(String familyCode) {
        this.familyCode = familyCode;
    }

    public String getFamilyRelateNm() {
        return familyRelateNm;
    }
    public void setFamilyRelateNm(String familyRelateNm) {
        this.familyRelateNm = familyRelateNm;
    }

    public String getFamilyAllwncAmt() {
        return familyAllwncAmt;
    }
    public void setFamilyAllwncAmt(String familyAllwncAmt) {
        this.familyAllwncAmt = familyAllwncAmt;
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
