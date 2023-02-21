package kr.co.dbvision.api.mps.bsc.mpsbsc006.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 급여지급일자등록관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.13
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 * </pre>
 */

public class Mpsbsc006 extends CommonVO {

    /* 적용 년월 */
    private String applcYm;
    /* 적용 년월 */
    private String applcYy;
    /* 지급 순번 */
    private String pymntSn;
    /* 지급 일자 */
    private String pymntDe;
    /* 지급 내역 */
    private String pymntDtls;
    /* 급여항목유형 코드 */
    private String salarytyCode;
    /* 마감 여부 */
    private String closAt;
    /* 공개 여부 */
    private String othbcAt;
    /* 공개 일시 */
    private String othbcDt;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 직종 코드 */
    private String jssfcCode;
    /* 계좌 구분 코드 */
    private String acnutSeCode;
    
    private String belongYy;

    private String belongMm;
    
    private String pymntAt;
    
    private String salaryitemNm;
    
    private String salaryitemCode;
    
    private String salarytypeNm;
    
    private String salarytyCodeNm;
    
    private String pymntddcSeNm;
    
    private String salaryitemCode2;
    
    private String salaryitemNm2;
    
    private String chk;

    private String ch2;
    
    private String stddDe;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbsc006() {
        //
    }

    public Mpsbsc006(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.applcYm = StringExpression.nullConvert(egovMap.get("applcYm"));
            this.applcYy = StringExpression.nullConvert(egovMap.get("applcYy"));
            this.pymntSn = StringExpression.nullConvert(egovMap.get("pymntSn"));
            this.stddDe = StringExpression.nullConvert(egovMap.get("stddDe"));
            this.pymntDe = StringExpression.nullConvert(egovMap.get("pymntDe"));
            this.pymntDtls = StringExpression.nullConvert(egovMap.get("pymntDtls"));
            this.salarytyCode = StringExpression.nullConvert(egovMap.get("salarytyCode"));
            this.closAt = StringExpression.nullConvert(egovMap.get("closAt"));
            this.othbcAt = StringExpression.nullConvert(egovMap.get("othbcAt"));
            this.othbcDt = StringExpression.nullConvert(egovMap.get("othbcDt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.jssfcCode = StringExpression.nullConvert(egovMap.get("jssfcCode"));
            this.acnutSeCode = StringExpression.nullConvert(egovMap.get("acnutSeCode"));
            this.belongYy = StringExpression.nullConvert(egovMap.get("belongYy"));
            this.belongMm = StringExpression.nullConvert(egovMap.get("belongMm"));
            this.pymntAt = StringExpression.nullConvert(egovMap.get("pymntAt"));
            this.salaryitemNm = StringExpression.nullConvert(egovMap.get("salaryitemNm"));
            this.salaryitemCode = StringExpression.nullConvert(egovMap.get("salaryitemCode"));
            this.salarytypeNm = StringExpression.nullConvert(egovMap.get("salarytypeNm"));
            this.salarytyCodeNm = StringExpression.nullConvert(egovMap.get("salarytyCodeNm"));
            this.pymntddcSeNm = StringExpression.nullConvert(egovMap.get("pymntddcSeNm"));
            
            this.salaryitemCode2 = StringExpression.nullConvert(egovMap.get("salaryitemCode2"));
            this.salaryitemNm2 = StringExpression.nullConvert(egovMap.get("salaryitemNm2"));
            this.chk = StringExpression.nullConvert(egovMap.get("chk"));
            this.ch2 = StringExpression.nullConvert(egovMap.get("ch2"));
        }
    }

    public Mpsbsc006(EgovMapForNull egovMap, String dhxGridrowIds,String gubun) {
        super(egovMap);
        if(egovMap != null) {
            if (gubun =="2") {  //지급일자 
            	this.stddDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stddDe")));
                this.pymntDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntDe")));
                this.applcYm  = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYm")));
                //this.pymntDe = StringExpression.nullConvert(egovMap.get("pymntDe"));
                this.pymntDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntDtls")));
                this.pymntSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntSn")));
                this.closAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_closAt")));
                this.othbcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_othbcAt")));
                this.othbcDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_othbcDt")));
                this.salarytyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarytyCode")));
                this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
                this.jssfcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jssfcCode")));
                this.acnutSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acnutSeCode")));
            }else  if (gubun =="3") { //급여항목 
                this.salarytyCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarytyCodeNm")));
                this.salaryitemNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemNm")));
                this.pymntAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntAt")));
                this.salaryitemCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemCode")));
                this.salarytyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salarytyCode")));
                this.applcYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_applcYm")));
                this.pymntSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_pymntSn")));
                this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
                
                this.salaryitemCode2 = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemCode2")));
                this.salaryitemNm2 = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryitemNm2")));
                this.chk = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chk")));
                this.ch2 = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ch2")));
            }
        }
    }

    public String getApplcYm() {
        return applcYm;
    }
    public void setApplcYm(String applcYm) {
        this.applcYm = applcYm;
    }

    public String getApplcYy() {
        return applcYy;
    }

    public void setApplcYy(String applcYy) {
        this.applcYy = applcYy;
    }

    public String getPymntSn() {
        return pymntSn;
    }
    public void setPymntSn(String pymntSn) {
        this.pymntSn = pymntSn;
    }

    public String getPymntDe() {
        return pymntDe;
    }
    public void setPymntDe(String pymntDe) {
        this.pymntDe = pymntDe;
    }

    public String getPymntDtls() {
        return pymntDtls;
    }
    public void setPymntDtls(String pymntDtls) {
        this.pymntDtls = pymntDtls;
    }

    public String getSalarytyCode() {
        return salarytyCode;
    }
    public void setSalarytyCode(String salarytyCode) {
        this.salarytyCode = salarytyCode;
    }

    public String getClosAt() {
        return closAt;
    }
    public void setClosAt(String closAt) {
        this.closAt = closAt;
    }

    public String getOthbcAt() {
        return othbcAt;
    }
    public void setOthbcAt(String othbcAt) {
        this.othbcAt = othbcAt;
    }

    public String getOthbcDt() {
        return othbcDt;
    }
    public void setOthbcDt(String othbcDt) {
        this.othbcDt = othbcDt;
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

    public String getJssfcCode() {
        return jssfcCode;
    }
    public void setJssfcCode(String jssfcCode) {
        this.jssfcCode = jssfcCode;
    }

    public String getAcnutSeCode() {
        return acnutSeCode;
    }
    public void setAcnutSeCode(String acnutSeCode) {
        this.acnutSeCode = acnutSeCode;
    }

    public String getBelongYy() {
        return belongYy;
    }

    public void setBelongYy(String belongYy) {
        this.belongYy = belongYy;
    }

    public String getBelongMm() {
        return belongMm;
    }

    public void setBelongMm(String belongMm) {
        this.belongMm = belongMm;
    }

    public String getPymntAt() {
        return pymntAt;
    }

    public void setPymntAt(String pymntAt) {
        this.pymntAt = pymntAt;
    }

    public String getSalaryitemNm() {
        return salaryitemNm;
    }

    public void setSalaryitemNm(String salaryitemNm) {
        this.salaryitemNm = salaryitemNm;
    }

    public String getSalaryitemCode() {
        return salaryitemCode;
    }

    public void setSalaryitemCode(String salaryitemCode) {
        this.salaryitemCode = salaryitemCode;
    }

    public String getSalarytypeNm() {
        return salarytypeNm;
    }

    public void setSalarytypeNm(String salarytypeNm) {
        this.salarytypeNm = salarytypeNm;
    }

    public String getSalarytyCodeNm() {
        return salarytyCodeNm;
    }

    public void setSalarytyCodeNm(String salarytyCodeNm) {
        this.salarytyCodeNm = salarytyCodeNm;
    }

    public String getPymntddcSeNm() {
        return pymntddcSeNm;
    }

    public void setPymntddcSeNm(String pymntddcSeNm) {
        this.pymntddcSeNm = pymntddcSeNm;
    }

    public String getSalaryitemCode2() {
        return salaryitemCode2;
    }

    public void setSalaryitemCode2(String salaryitemCode2) {
        this.salaryitemCode2 = salaryitemCode2;
    }

    public String getSalaryitemNm2() {
        return salaryitemNm2;
    }

    public void setSalaryitemNm2(String salaryitemNm2) {
        this.salaryitemNm2 = salaryitemNm2;
    }

    
    public String getChk() {
        return chk;
    }

    public void setChk(String chk) {
        this.chk = chk;
    }

    public String getCh2() {
        return ch2;
    }

    public void setCh2(String ch2) {
        this.ch2 = ch2;
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

	public String getStddDe() {
		return stddDe;
	}

	public void setStddDe(String stddDe) {
		this.stddDe = stddDe;
	}
    
}
