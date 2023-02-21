package kr.co.dbvision.api.stm.mng.stmmng007.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 프로그램ID  관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.02.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.22          디비비전              최초 생성
 *
 * </pre>
 */

public class Stmmng007 extends CommonVO {

    /* 프로그램ID */
    private String progrmId;
    /* 프로그명 */
    private String progrmNm;
    /* 설명 */
    private String progrmDc;
    /* 메뉴코드 */
    private String menuId;
    /* 경로 */
    private String url;
    /* 파일명 */
    private String fileNm;
    /* 패키지 */
    private String pckageNm;
    /* 서브 패키지 아이디 */
    private String subPckageId;
    /* 관련테이블 */
    private String relTblNm;
    /* 사용여부 */
    private String useAt;
    
    private String subjectNm;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmmng007() {
        //
    }

    public Stmmng007(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.progrmId = StringExpression.nullConvert(egovMap.get("progrmId"));
            this.progrmNm = StringExpression.nullConvert(egovMap.get("progrmNm"));
            this.progrmDc = StringExpression.nullConvert(egovMap.get("progrmDc"));
            this.menuId = StringExpression.nullConvert(egovMap.get("menuId"));
            this.url = StringExpression.nullConvert(egovMap.get("url"));
            this.fileNm = StringExpression.nullConvert(egovMap.get("fileNm"));
            this.pckageNm = StringExpression.nullConvert(egovMap.get("pckageNm"));
            this.subPckageId = StringExpression.nullConvert(egovMap.get("subPckageId"));
            this.relTblNm = StringExpression.nullConvert(egovMap.get("relTblNm"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.subjectNm = StringExpression.nullConvert(egovMap.get("subjectNm"));
        }
    }

    public Stmmng007(EgovMapForNull egovMap, String dhxGridrowIds, String old) {
        super(egovMap);
        if(egovMap != null) {
            this.progrmId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.progrmNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.progrmDc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            this.menuId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.url = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.fileNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.pckageNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
            this.subPckageId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
            this.relTblNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c11")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }
    
    public Stmmng007(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.progrmId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_progrmId")));
            this.progrmNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_progrmNm")));
            this.progrmDc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_progrmDc")));
            this.menuId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_menuId")));
            this.url = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_url")));
            this.fileNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_fileNm")));
            this.pckageNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pckageNm")));
            this.subPckageId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_subPckageId")));
            this.relTblNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_relTblNm")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getProgrmId() {
        return progrmId;
    }
    public void setProgrmId(String progrmId) {
        this.progrmId = progrmId;
    }

    public String getProgrmNm() {
        return progrmNm;
    }
    public void setProgrmNm(String progrmNm) {
        this.progrmNm = progrmNm;
    }

    public String getProgrmDc() {
        return progrmDc;
    }
    public void setProgrmDc(String progrmDc) {
        this.progrmDc = progrmDc;
    }

    public String getMenuId() {
        return menuId;
    }
    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }

    public String getFileNm() {
        return fileNm;
    }
    public void setFileNm(String fileNm) {
        this.fileNm = fileNm;
    }

    public String getPckageNm() {
        return pckageNm;
    }
    public void setPckageNm(String pckageNm) {
        this.pckageNm = pckageNm;
    }

    public String getSubPckageId() {
        return subPckageId;
    }
    public void setSubPckageId(String subPckageId) {
        this.subPckageId = subPckageId;
    }

    public String getRelTblNm() {
        return relTblNm;
    }
    public void setRelTblNm(String relTblNm) {
        this.relTblNm = relTblNm;
    }
    
    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
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

    public String getSubjectNm() {
        return subjectNm;
    }

    public void setSubjectNm(String subjectNm) {
        this.subjectNm = subjectNm;
    }
}
