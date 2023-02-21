package kr.co.dbvision.api.mfs.bsc.mfsbsc006.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 관리항목관리에 관한 엔티티 클래스
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

public class Mfsbsc006 extends CommonVO {

    /* 관리항목순번 */
    private String mgrtItemSn;
    /* 관리 항목 명 */
    private String mgrtItemNm;
    /* 입력구분 코드 (공통코드, 직접입력) */
    private String inputSeCode;
    /* 사용여부 */
    private String useAt;
    /* 비고 */
    private String rm;
    
    /**
     *공통코드 종류  
     */
    private String codekindCode;
    
    private String codekindNm;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mfsbsc006() {
        //
    }

    public Mfsbsc006(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.mgrtItemSn = StringExpression.nullConvert(egovMap.get("mgrtItemSn"));
            this.mgrtItemNm = StringExpression.nullConvert(egovMap.get("mgrtItemNm"));
            this.inputSeCode = StringExpression.nullConvert(egovMap.get("inputSeCode"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.codekindCode = StringExpression.nullConvert(egovMap.get("codekindCode"));
            this.codekindNm = StringExpression.nullConvert(egovMap.get("codekindNm"));
        }
    }

    public Mfsbsc006(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            //체크박스가 있을 경우 2번부터 
            this.mgrtItemSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.mgrtItemNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.inputSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            //this.codekindNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));           
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
            this.codekindCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getMgrtItemSn() {
        return mgrtItemSn;
    }
    public void setMgrtItemSn(String mgrtItemSn) {
        this.mgrtItemSn = mgrtItemSn;
    }

    public String getMgrtItemNm() {
        return mgrtItemNm;
    }
    public void setMgrtItemNm(String mgrtItemNm) {
        this.mgrtItemNm = mgrtItemNm;
    }

    public String getInputSeCode() {
        return inputSeCode;
    }
    public void setInputSeCode(String inputSeCode) {
        this.inputSeCode = inputSeCode;
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

    public String getCodekindCode() {
        return codekindCode;
    }

    public void setCodekindCode(String codekindCode) {
        this.codekindCode = codekindCode;
    }    
    public String getNativeeditorStatus() {
        return nativeeditorStatus;
    }

    public String getCodekindNm() {
        return codekindNm;
    }

    public void setCodekindNm(String codekindNm) {
        this.codekindNm = codekindNm;
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
