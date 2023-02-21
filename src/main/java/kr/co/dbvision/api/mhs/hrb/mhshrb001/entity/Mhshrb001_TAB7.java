package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;


/**
 * 인사기본 tab4 - 학력에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.06.10
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.06.10          디비비전              최초 생성
 *
 * </pre>
 */

public class Mhshrb001_TAB7  extends CommonVO {

	/* 사원번호 */
    private String empno;
    /* 개인별 학력기록의 순번을 기록하는 항목 */
    private String acdmcrSn;
    /* 개인별 학력기록의 순번을 기록하는 항목 */
    private int acdmcrSnNew;
    /* 학교명 */
    private String schulNm;
    /* 직원이 학교에 입학한 일자를 기록하는 항목 */
    private String entschDe;
    /* 직원이 학교를 졸업한 일자를 기록하는 항목 */
    private String grdtnDe;
    /* 전공 */
    private String majorNm;
    /* 부전공 */
    private String minorNm;
    /* 학위코드(C022) */
    private String dgriCode;
    /* 지역코드(공통코드:C079) */
    private String areaCode;
    /* 졸업구분(공통코드:C287 */
    private String grdtnSeCode;
    /* 학력코드(공통코드C016) */
    private String acdmcrSeCode;
    /* 해당 학력이 직원의 최종학력인지를 확인하는 항목 */
    private String lastAcdmcrAt;
    /* 주야 구분 여부 */
    private String dghtSeAt;
    /* 졸업증명서 파일첨부 */
    private String grdtnFilenoEdit;
    /* 졸업증명서 파일첨부 */
    private String grdtnFileno;
    /* 기타 비고사항을 기록관리하는 항목 */
    private String rm;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

	 public Mhshrb001_TAB7() {
	        //
	}
	 
	 public Mhshrb001_TAB7(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap != null) {
			this.empno = StringExpression.nullConvert(egovMap.get("empno"));
			this.acdmcrSn = StringExpression.nullConvert(egovMap.get("acdmcrSn"));
            if(egovMap.get("acdmcrSnNew") != null) {
            	this.acdmcrSnNew = (int) egovMap.get("acdmcrSnNew");
            }
            else {
            	this.acdmcrSnNew = 0;
            }
            
            this.schulNm = StringExpression.nullConvert(egovMap.get("schulNm"));
            this.entschDe = StringExpression.nullConvert(egovMap.get("entschDe"));
            this.grdtnDe = StringExpression.nullConvert(egovMap.get("grdtnDe"));
            this.majorNm = StringExpression.nullConvert(egovMap.get("majorNm"));
            this.minorNm = StringExpression.nullConvert(egovMap.get("minorNm"));
            this.dgriCode = StringExpression.nullConvert(egovMap.get("dgriCode"));
            this.areaCode = StringExpression.nullConvert(egovMap.get("areaCode"));
            this.grdtnSeCode = StringExpression.nullConvert(egovMap.get("grdtnSeCode"));
            this.acdmcrSeCode = StringExpression.nullConvert(egovMap.get("acdmcrSeCode"));
            this.lastAcdmcrAt = StringExpression.nullConvert(egovMap.get("lastAcdmcrAt"));
            this.dghtSeAt = StringExpression.nullConvert(egovMap.get("dghtSeAt"));
            this.grdtnFilenoEdit = StringExpression.nullConvert(egovMap.get("grdtnFilenoEdit"));
            this.grdtnFileno = StringExpression.nullConvert(egovMap.get("grdtnFileno"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
		}
	 }

    public Mhshrb001_TAB7(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.acdmcrSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acdmcrSn")));
            this.acdmcrSnNew = 0;
            this.schulNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_schulNm")));
            this.entschDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_entschDe")));
            this.grdtnDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_grdtnDe")));
            this.majorNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_majorNm")));
            this.minorNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_minorNm")));
            this.dgriCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dgriCode")));
            this.areaCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_areaCode")));
            this.grdtnSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_grdtnSeCode")));
            this.acdmcrSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_acdmcrSeCode")));
            this.lastAcdmcrAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lastAcdmcrAt")));
            this.dghtSeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dghtSeAt")));
            this.grdtnFilenoEdit = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_grdtnFilenoEdit")));
            this.grdtnFileno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_grdtnFileno")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }
	 
	 
    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getAcdmcrSn() {
        return acdmcrSn;
    }
    public void setAcdmcrSn(String acdmcrSn) {
        this.acdmcrSn = acdmcrSn;
    }

    public Integer getAcdmcrSnNew() {
        return acdmcrSnNew;
    }
    public void setAcdmcrSnNew(Integer acdmcrSnNew) {
        this.acdmcrSnNew = acdmcrSnNew;
    }

    public String getSchulNm() {
        return schulNm;
    }
    public void setSchulNm(String schulNm) {
        this.schulNm = schulNm;
    }

    public String getEntschDe() {
        return entschDe;
    }
    public void setEntschDe(String entschDe) {
        this.entschDe = entschDe;
    }

    public String getGrdtnDe() {
        return grdtnDe;
    }
    public void setGrdtnDe(String grdtnDe) {
        this.grdtnDe = grdtnDe;
    }

    public String getMajorNm() {
        return majorNm;
    }
    public void setMajorNm(String majorNm) {
        this.majorNm = majorNm;
    }

    public String getMinorNm() {
        return minorNm;
    }
    public void setMinorNm(String minorNm) {
        this.minorNm = minorNm;
    }

    public String getDgriCode() {
        return dgriCode;
    }
    public void setDgriCode(String dgriCode) {
        this.dgriCode = dgriCode;
    }

    public String getAreaCode() {
        return areaCode;
    }
    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getGrdtnSeCode() {
        return grdtnSeCode;
    }
    public void setGrdtnSeCode(String grdtnSeCode) {
        this.grdtnSeCode = grdtnSeCode;
    }

    public String getAcdmcrSeCode() {
        return acdmcrSeCode;
    }
    public void setAcdmcrSeCode(String acdmcrSeCode) {
        this.acdmcrSeCode = acdmcrSeCode;
    }

    public String getLastAcdmcrAt() {
        return lastAcdmcrAt;
    }
    public void setLastAcdmcrAt(String lastAcdmcrAt) {
        this.lastAcdmcrAt = lastAcdmcrAt;
    }

    public String getDghtSeAt() {
        return dghtSeAt;
    }
    public void setDghtSeAt(String dghtSeAt) {
        this.dghtSeAt = dghtSeAt;
    }

    public String getGrdtnFileno() {
        return grdtnFileno;
    }
    public void setGrdtnFileno(String grdtnFileno) {
        this.grdtnFileno = grdtnFileno;
    }

    public String getGrdtnFilenoEdit() {
        return grdtnFilenoEdit;
    }
    public void setGrdtnFilenoEdit(String grdtnFilenoEdit) {
        this.grdtnFilenoEdit = grdtnFilenoEdit;
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
