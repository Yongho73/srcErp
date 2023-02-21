package kr.co.dbvision.api.mfs.bsc.mfsbsc007.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 계정별 관리항목관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.04.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.22          디비비전              최초 생성
 * </pre>
 */

public class Mfsbsc007 extends CommonVO {

    /* 관리항목순번 */
    private String mgrtItemSn;
    /* 계정코드 */
    private String acntCode;
    /* 차변대변 구분 코드 */
    private String drcrSeCode;
    /* 필수 여부 */
    private String mustAt;
    /* 정렬 순서 */
    private String sortOrdr;
    /* 사용여부 */
    private String useAt;
    /* 비고 */
    private String rm;
    
    /*입력구분 */
    private String inputSeCode;
    
    private String mgrtItemNm;
    
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mfsbsc007() {
        //
    }

    public Mfsbsc007(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.mgrtItemSn = StringExpression.nullConvert(egovMap.get("mgrtItemSn"));
            this.acntCode = StringExpression.nullConvert(egovMap.get("acntCode"));
            this.drcrSeCode = StringExpression.nullConvert(egovMap.get("drcrSeCode"));
            this.mustAt = StringExpression.nullConvert(egovMap.get("mustAt"));
            this.sortOrdr = StringExpression.nullConvert(egovMap.get("sortOrdr"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.inputSeCode = StringExpression.nullConvert(egovMap.get("inputSeCode"));
            this.mgrtItemNm = StringExpression.nullConvert(egovMap.get("mgrtItemNm"));
        }
    }

    public Mfsbsc007(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.mgrtItemSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.mgrtItemNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.inputSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.drcrSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.mustAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.sortOrdr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
            this.acntCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c11")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            
            
        }
    }

    public String getMgrtItemSn() {
        return mgrtItemSn;
    }
    public void setMgrtItemSn(String mgrtItemSn) {
        this.mgrtItemSn = mgrtItemSn;
    }

    public String getAcntCode() {
        return acntCode;
    }
    public void setAcntCode(String acntCode) {
        this.acntCode = acntCode;
    }

    public String getDrcrSeCode() {
        return drcrSeCode;
    }
    public void setDrcrSeCode(String drcrSeCode) {
        this.drcrSeCode = drcrSeCode;
    }

    public String getMustAt() {
        return mustAt;
    }
    public void setMustAt(String mustAt) {
        this.mustAt = mustAt;
    }

    public String getSortOrdr() {
        return sortOrdr;
    }
    public void setSortOrdr(String sortOrdr) {
        this.sortOrdr = sortOrdr;
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

    public String getInputSeCode() {
        return inputSeCode;
    }

    public void setInputSeCode(String inputSeCode) {
        this.inputSeCode = inputSeCode;
    }

    public String getMgrtItemNm() {
        return mgrtItemNm;
    }

    public void setMgrtItemNm(String mgrtItemNm) {
        this.mgrtItemNm = mgrtItemNm;
    }
}
