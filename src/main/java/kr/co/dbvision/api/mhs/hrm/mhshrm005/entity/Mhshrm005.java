package kr.co.dbvision.api.mhs.hrm.mhshrm005.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 부서조직관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.04.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.21          디비비전              최초 생성
 * </pre>
 */

public class Mhshrm005 extends CommonVO {

    /* 조직코드 */
    private String orgnztCode;
    /* 조직명 */
    private String orgnztNm;
    /* 부서코드 */
    private String deptCode;
    /* 부서명  */
    private String deptKorNm;
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

    public Mhshrm005() {
        //
    }

    public Mhshrm005(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.orgnztCode = StringExpression.nullConvert(egovMap.get("orgnztCode"));
            this.orgnztNm = StringExpression.nullConvert(egovMap.get("orgnztNm"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.deptKorNm = StringExpression.nullConvert(egovMap.get("deptKorNm"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.sortOrdr = StringExpression.nullConvert(egovMap.get("sortOrdr"));
        }
    }

    public Mhshrm005(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.orgnztCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_orgnztCode")));
            this.orgnztNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_orgnztNm")));
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode")));
            this.deptKorNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptKorNm")));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useBeginDe")));
            this.useEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useEndDe")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.sortOrdr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sortOrdr")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getOrgnztCode() {
        return orgnztCode;
    }
    public void setOrgnztCode(String orgnztCode) {
        this.orgnztCode = orgnztCode;
    }

    public String getOrgnztNm() {
        return orgnztNm;
    }
    public void setOrgnztNm(String orgnztNm) {
        this.orgnztNm = orgnztNm;
    }

    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getDeptKorNm() {
        return deptKorNm;
    }
    public void setDeptKorNm(String deptKorNm) {
        this.deptKorNm = deptKorNm;
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
}
