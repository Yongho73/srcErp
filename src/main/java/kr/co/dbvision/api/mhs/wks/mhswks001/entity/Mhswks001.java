package kr.co.dbvision.api.mhs.wks.mhswks001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 근태기준설정(근태관리)관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.05.19
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.19          디비비전              최초 생성
 * </pre>
 */

public class Mhswks001 extends CommonVO {

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
    /* 근태발생기준 */
    /* 순번 */
    private String sn;
    /* 기준 명 */
    private String stdrNm;
    /* 항목 코드 */
    private String itemCode;
    /* 별도 항목 */
    private String rms;
    /* 비고 */
    private String rm;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhswks001() {
        //
    }

    public Mhswks001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.laborSe = StringExpression.nullConvert(egovMap.get("laborSe"));
            this.salarySe = StringExpression.nullConvert(egovMap.get("salarySe"));
            this.rversSe = StringExpression.nullConvert(egovMap.get("rversSe"));
            this.workTyCode = StringExpression.nullConvert(egovMap.get("workTyCode"));
            this.beginDe = StringExpression.nullConvert(egovMap.get("beginDe"));
            
            this.sn = StringExpression.nullConvert(egovMap.get("sn"));
            this.itemCode = StringExpression.nullConvert(egovMap.get("itemCode"));
            this.stdrNm = StringExpression.nullConvert(egovMap.get("stdrNm"));
            this.rms = StringExpression.nullConvert(egovMap.get("rms"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
        }
    }

    public Mhswks001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.laborSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_laborSe")));
            this.salarySe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarySe")));
            this.rversSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rversSe")));
            this.workTyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workTyCode")));
            this.beginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_beginDe")));
            
            this.sn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"sn")));
            this.itemCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"itemCode")));
            this.stdrNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"stdrNm")));
            this.rms = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"rms")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"rm")));
            
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

    public String getBeginDe() {
        return beginDe;
    }
    public void setBeginDe(String beginDe) {
        this.beginDe = beginDe;
    }
    
    
    
    public String getSn() {
        return sn;
    }
    public void setSn(String sn) {
        this.sn = sn;
    }
    
    public String getItemCode() {
        return itemCode;
    }
    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }
    
    public String getStdNm() {
        return stdrNm;
    }
    public void setStdNm(String stdrNm) {
        this.stdrNm = stdrNm;
    }
    
    public String getRms() {
        return rms;
    }
    public void setRms(String rms) {
        this.rms = rms;
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
}
