package kr.co.dbvision.api.stm.bsc.stmbsc006.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 자동채번설정관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.02.27
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.27          디비비전              최초 생성
 * </pre>
 */

public class Stmbsc006 extends CommonVO {

    /* 관련테이블명 */
    private String relTblNm;
    /* 관련항목명 */
    private String relItemNm;
    /* 채번명칭 */
    private String numberingNm;
    /* 접두사사용여부 */
    private String prefixUseAt;
    /* 머리글 구분 코드 (C003) */
    private String prefixSeCode;
    /* 접두사명 */
    private String prefixNm;
    /* 년도사용여부 */
    private String yyUseAt;
    /* 년도 길이 코드 (C006) */
    private String yyLtCode;
    private String yyUseCodeNm;
    /* 월 사용 여부 */
    private String mtUseAt;
    /* 일자 사용여부 */
    private String deUseAt;
    /* 구분자 사용 여부 */
    private String seUseAt;
    /* 접미사 명 */
    private String suffixNm;
    /* 순번사용여부 */
    private String snUseAt;
    /* 순번길이 */
    private String snLt;
    /* 채번 형식 */
    private String numberingFom;
    /* 사용여부 */
    private String useAt;
    /* 수정 여부 */
    private String updtAt;
    /* 최종번호*/
    private String maxNumber;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmbsc006() {
        //
    }

    public Stmbsc006(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.relTblNm = StringExpression.nullConvert(egovMap.get("relTblNm"));
            this.relItemNm = StringExpression.nullConvert(egovMap.get("relItemNm"));
            this.numberingNm = StringExpression.nullConvert(egovMap.get("numberingNm"));
            this.prefixUseAt = StringExpression.nullConvert(egovMap.get("prefixUseAt"));
            this.prefixSeCode = StringExpression.nullConvert(egovMap.get("prefixSeCode"));
            this.prefixNm = StringExpression.nullConvert(egovMap.get("prefixNm"));
            this.yyUseAt = StringExpression.nullConvert(egovMap.get("yyUseAt"));
            this.yyLtCode = StringExpression.nullConvert(egovMap.get("yyLtCode"));
            this.mtUseAt = StringExpression.nullConvert(egovMap.get("mtUseAt"));
            this.deUseAt = StringExpression.nullConvert(egovMap.get("deUseAt"));
            this.suffixNm = StringExpression.nullConvert(egovMap.get("suffixNm"));
            this.snUseAt = StringExpression.nullConvert(egovMap.get("snUseAt"));
            this.snLt = StringExpression.nullConvert(egovMap.get("snLt"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.seUseAt = StringExpression.nullConvert(egovMap.get("seUseAt"));
            this.numberingFom = StringExpression.nullConvert(egovMap.get("numberingFom"));
            this.updtAt = StringExpression.nullConvert(egovMap.get("updtAt"));
            this.maxNumber = StringExpression.nullConvert(egovMap.get("maxNumber"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
//            this.newNumber = StringExpression.nullConvert(egovMap.get("newNumber"));
        }
    }

    public Stmbsc006(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.relTblNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_relTblNm")));
            this.relItemNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_relItemNm")));
            this.numberingNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_numberingNm")));
            this.prefixUseAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prefixUseAt")));
            this.prefixSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prefixSeCode")));
            this.prefixNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prefixNm")));
            this.yyUseAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_yyUseAt")));
            this.yyLtCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_yyLtCode")));
            this.mtUseAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mtUseAt")));
            this.deUseAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deUseAt")));
            this.seUseAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_seUseAt")));
            this.suffixNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_suffixNm")));
            this.snUseAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_snUseAt")));
            this.snLt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_snLt")));
            this.numberingFom = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_numberingFom")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.updtAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_updtAt")));
            this.maxNumber = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_maxNumber")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getRelTblNm() {
        return relTblNm;
    }
    public void setRelTblNm(String relTblNm) {
        this.relTblNm = relTblNm;
    }

    public String getRelItemNm() {
        return relItemNm;
    }
    public void setRelItemNm(String relItemNm) {
        this.relItemNm = relItemNm;
    }

    public String getNumberingNm() {
        return numberingNm;
    }
    public void setNumberingNm(String numberingNm) {
        this.numberingNm = numberingNm;
    }

    public String getPrefixUseAt() {
        return prefixUseAt;
    }
    public void setPrefixUseAt(String prefixUseAt) {
        this.prefixUseAt = prefixUseAt;
    }

    public String getPrefixSeCode() {
        return prefixSeCode;
    }
    public void setPrefixSeCode(String prefixSeCode) {
        this.prefixSeCode = prefixSeCode;
    }

    public String getPrefixNm() {
        return prefixNm;
    }
    public void setPrefixNm(String prefixNm) {
        this.prefixNm = prefixNm;
    }

    public String getYyUseAt() {
        return yyUseAt;
    }
    public void setYyUseAt(String yyUseAt) {
        this.yyUseAt = yyUseAt;
    }

    public String getYyLtCode() {
        return yyLtCode;
    }
    public void setYyLtCode(String yyLtCode) {
        this.yyLtCode = yyLtCode;
    }

    public String getMtUseAt() {
        return mtUseAt;
    }
    public void setMtUseAt(String mtUseAt) {
        this.mtUseAt = mtUseAt;
    }

    public String getDeUseAt() {
        return deUseAt;
    }
    public void setDeUseAt(String deUseAt) {
        this.deUseAt = deUseAt;
    }

    public String getSuffixNm() {
        return suffixNm;
    }
    public void setSuffixNm(String suffixNm) {
        this.suffixNm = suffixNm;
    }

    public String getSnUseAt() {
        return snUseAt;
    }
    public void setSnUseAt(String snUseAt) {
        this.snUseAt = snUseAt;
    }

    public String getSnLt() {
        return snLt;
    }
    public void setSnLt(String snLt) {
        this.snLt = snLt;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }
	public String getSeUseAt() {
		return seUseAt;
	}

	public void setSeUseAt(String seUseAt) {
		this.seUseAt = seUseAt;
	}

	public String getNumberingFom() {
		return numberingFom;
	}

	public void setNumberingFom(String numberingFom) {
		this.numberingFom = numberingFom;
	}
	public String getUpdtAt() {
		return updtAt;
	}

	public void setUpdtAt(String updtAt) {
		this.updtAt = updtAt;
	}    
	
	public String getMaxNumber() {
		return maxNumber;
	}

	public void setMaxNumber(String maxNumber) {
		this.maxNumber = maxNumber;
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

//	public String getNewNumber() {
//		return newNumber;
//	}
//
//	public void setNewNumber(String newNumber) {
//		this.newNumber = newNumber;
//	}





}
