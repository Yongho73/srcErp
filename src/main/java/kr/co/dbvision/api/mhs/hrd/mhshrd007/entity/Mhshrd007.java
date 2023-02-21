package kr.co.dbvision.api.mhs.hrd.mhshrd007.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 근태기준설정관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.05.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.22          디비비전              최초 생성
 * </pre>
 */

public class Mhshrd007 extends CommonVO {

    /* 고용구분(사원구분) */
    private String laborSe;
    /* 급여구분(연봉/호봉) */
    private String salarySe;
    /* 귀속구분(전월/금월) */
    private String rversSe;
    /* 기본 근무 유형 코드 - MHS_WORKTY 의 WORK_TY_CODE */
    private String workTyCode;
    /* 시작일 */
    private String beginDe;
    /* 사용여부 */
    private String useAt;
    /* 순번 */
    private String sn;
    /* 기준 명 */
    private String stdrNm;
    /* 기준 명 */
    private String itemCode;
    /* 기준 명 */
    private String splitItem;
    /* 기준 명 */
    private String rm;
    /* 그눔 유형 코드 명 */
    private String workTyCodeNm;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrd007() {
        //
    }

    public Mhshrd007(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.laborSe = StringExpression.nullConvert(egovMap.get("laborSe"));
            this.salarySe = StringExpression.nullConvert(egovMap.get("salarySe"));
            this.rversSe = StringExpression.nullConvert(egovMap.get("rversSe"));
            this.workTyCode = StringExpression.nullConvert(egovMap.get("workTyCode"));
            this.beginDe = StringExpression.nullConvert(egovMap.get("beginDe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.sn = StringExpression.nullConvert(egovMap.get("sn"));
            this.stdrNm = StringExpression.nullConvert(egovMap.get("stdrNm"));
            this.itemCode = StringExpression.nullConvert(egovMap.get("itemCode"));
            this.splitItem = StringExpression.nullConvert(egovMap.get("splitItem"));
            this.workTyCodeNm = StringExpression.nullConvert(egovMap.get("workTyCodeNm"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
        }
    }

    public Mhshrd007(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.laborSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_laborSe")));
            this.salarySe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarySe")));
            this.rversSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rversSe")));
            this.workTyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workTyCode")));
            this.beginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_beginDe")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.sn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sn")));
            this.stdrNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stdrNm")));
            this.itemCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_itemCode")));
            this.splitItem = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_splitItem")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.workTyCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workTyCodeNm")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getLaborSe() {
        return laborSe;
    }
    public void setLaborSe(String laborSe) {
        this.laborSe = laborSe;
    }

    public String getSalarySe() {
        return salarySe;
    }
    public void setSalarySe(String salarySe) {
        this.salarySe = salarySe;
    }

    public String getRversSe() {
        return rversSe;
    }
    public void setRversSe(String rversSe) {
        this.rversSe = rversSe;
    }

    public String getWorkTyCode() {
        return workTyCode;
    }
    public void setWorkTyCode(String workTyCode) {
        this.workTyCode = workTyCode;
    }
    
    public String getbeginDe() {
        return beginDe;
    }
    public void setbeginDe(String beginDe) {
        this.beginDe = beginDe;
    }
    
    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getSn() {
        return sn;
    }
    public void setSn(String sn) {
        this.sn = sn;
    }
    
    public String getStdrNm() {
        return stdrNm;
    }
    public void setStdrNm(String stdrNm) {
        this.stdrNm = stdrNm;
    }
    
    public String getItemCode() {
        return itemCode;
    }
    public void seItemCode(String itemCode) {
        this.itemCode = itemCode;
    }
    
    public String getSqlitItem() {
        return splitItem;
    }
    public void setSqlitItem(String splitItem) {
        this.splitItem = splitItem;
    }
    
    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
    }
    
    public String getWorkTyCodeNm() {
        return workTyCodeNm;
    }
    public void setWorkTyCodeNm(String workTyCodeNm) {
        this.workTyCodeNm = workTyCodeNm;
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
