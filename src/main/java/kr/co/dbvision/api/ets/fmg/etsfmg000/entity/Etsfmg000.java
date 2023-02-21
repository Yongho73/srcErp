package kr.co.dbvision.api.ets.fmg.etsfmg000.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;

/**
 * 양식관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2021.03.18
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.18          디비비전              최초 생성
 * </pre>
 */

public class Etsfmg000 extends CommonVO {

    /* 양식 번호 */
    private String raisNo;
    /* 양식명 */
    private String raisnm;
    /* 양식 Html */
    private String raisHtml;
    /* 첨부파일 순번 */
    private String atchmnfl;
    /* 사용 여부 */
    private String useAt;
    /* 보존 기한 코드 */
    private String prsrvTmlmtCode;
    /* 웹 기안 여부 */
    private String webDrftAt;
    /* 문서 분류 코드 */
    private String docClsCode;
    /* 등록 ID */
    private String regId;
    /* 등록 일시 */
    private String regDt;
    /* 수정 ID */
    private String uptId;
    /* 수정 일시 */
    private String uptDt;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    
    private List<Etsfmg000Item> items = new ArrayList<Etsfmg000Item>();
    
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Etsfmg000() {
        //
    	Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
        String userId = StringExpression.nullConvert(sessionMap.get("userId"));
        this.regId = userId;
        this.uptId = userId;        
        System.out.println(String.format("%s:::[%s]", "regId", getRegId()));
        System.out.println(String.format("%s:::[%s]", "uptId", getUptId()));
    }

    public Etsfmg000(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.raisNo = StringExpression.nullConvert(egovMap.get("raisNo"));
            this.raisnm = StringExpression.nullConvert(egovMap.get("raisnm"));
            this.raisHtml = StringExpression.nullConvert(egovMap.get("raisHtml"));
            this.atchmnfl = StringExpression.nullConvert(egovMap.get("atchmnfl"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.prsrvTmlmtCode = StringExpression.nullConvert(egovMap.get("prsrvTmlmtCode"));
            this.webDrftAt = StringExpression.nullConvert(egovMap.get("webDrftAt"));
            this.docClsCode = StringExpression.nullConvert(egovMap.get("docClsCode"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
        }
    }

    public Etsfmg000(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.raisNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_raisNo")));
            this.raisnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_raisnm")));
            this.raisHtml = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_raisHtml")));
            this.atchmnfl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnfl")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.prsrvTmlmtCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prsrvTmlmtCode")));
            this.webDrftAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_webDrftAt")));
            this.docClsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_docClsCode")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getRaisNo() {
        return raisNo;
    }
    public void setRaisNo(String raisNo) {
        this.raisNo = raisNo;
    }

    public String getRaisnm() {
        return raisnm;
    }
    public void setRaisnm(String raisnm) {
        this.raisnm = raisnm;
    }

    public String getRaisHtml() {
        return raisHtml;
    }
    public void setRaisHtml(String raisHtml) {
        this.raisHtml = raisHtml;
    }

    public String getAtchmnfl() {
        return atchmnfl;
    }
    public void setAtchmnfl(String atchmnfl) {
        this.atchmnfl = atchmnfl;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getPrsrvTmlmtCode() {
        return prsrvTmlmtCode;
    }
    public void setPrsrvTmlmtCode(String prsrvTmlmtCode) {
        this.prsrvTmlmtCode = prsrvTmlmtCode;
    }

    public String getWebDrftAt() {
        return webDrftAt;
    }
    public void setWebDrftAt(String webDrftAt) {
        this.webDrftAt = webDrftAt;
    }

    public String getDocClsCode() {
        return docClsCode;
    }
    public void setDocClsCode(String docClsCode) {
        this.docClsCode = docClsCode;
    }

    public String getRegId() {
        return regId;
    }
    public void setRegId(String regId) {
        this.regId = regId;
    }

    public String getRegDt() {
        return regDt;
    }
    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getUptId() {
        return uptId;
    }
    public void setUptId(String uptId) {
        this.uptId = uptId;
    }

    public String getUptDt() {
        return uptDt;
    }
    public void setUptDt(String uptDt) {
        this.uptDt = uptDt;
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

	public List<Etsfmg000Item> getItems() {
		return items;
	}

	public void setItems(List<Etsfmg000Item> items) {
		this.items = items;
	}

	@Override
	public String toString() {
		return "Etsfmg000 [raisNo=" + raisNo + ", raisnm=" + raisnm + ", raisHtml=" + raisHtml + ", atchmnfl="
				+ atchmnfl + ", useAt=" + useAt + ", prsrvTmlmtCode=" + prsrvTmlmtCode + ", webDrftAt=" + webDrftAt
				+ ", docClsCode=" + docClsCode + ", regId=" + regId + ", regDt=" + regDt + ", uptId=" + uptId
				+ ", uptDt=" + uptDt + ", nativeeditorStatus=" + nativeeditorStatus + ", items=" + items.toString() + ", records="
				+ records + "]";
	}
}
