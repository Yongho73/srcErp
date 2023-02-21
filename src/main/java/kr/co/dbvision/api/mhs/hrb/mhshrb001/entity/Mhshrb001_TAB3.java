package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;


/**
 * 인사기본 tab3 - 가족에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.03.02
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.03          디비비전              최초 생성
 *
 * </pre>
 */

public class Mhshrb001_TAB3  extends CommonVO {

	 private String  empno;            //사번
     private String  bplcCode;         //사업장코드
     
     /* 가족순번 */
     private String familySn;
     /* 가족코드 */
     private String familyCode;
     /* 연말정산 관계 코드 (C084) */
     private String yndexcclcRelateCode;
     /* 연말정산 대상 여부 */
     private String yndexcclcTrgetAt;
     /* 가족구성원의 이름을 기록하는 항목 */
     private String familyNm;
     /* 가족구성원의 주민등록번호를 기록하는 항목 */
     private String ihidnum;
     /* 가족구성원의 주민등록번호를 기록하는 항목 */
     private String ihidnumOl;
     /* 가족의 실제 생년월일 */
     private String brthdy;
     /* 동거여부 */
     private String livtgtAt;
     /* 갑근세계산여부 */
     private String suportAt;
     /* 수당지급여부 */
     private String allwncTrgetAt;
     /* 최종학력코드 (C016) */
     private String lscholSeCode;
     /* 직업 */
     private String occpNm;
     /* 직위 명 */
     private String ofcpsNm;
     /* 휴대전화 */
     private String mbtlnum;
     /* 장애인 여부 */
     private String dspsnAt;
     /* 장애인 번호 */
     private String dspsnNo;
     /* 장애인구분 1: 장애인복지법, 2:국가유공자, 3:중증장애인( C152) */
     private String dspsnSeCode;
     /* 중증 여부 */
     private String srsillAt;
     /* 직장명 */
     private String wrcNm;
     
     /* 가족순번 New*/
     private int familySnNew;
     
     /* DhtmlX Grid Status (insert, delete, update) */
     private String nativeeditorStatus;
	   
	 private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

	 public Mhshrb001_TAB3() {
	        //
	}
	 
	 public Mhshrb001_TAB3(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap != null) {
			this.empno				= StringExpression.nullConvert(egovMap.get("empno"));
			this.bplcCode           = StringExpression.nullConvert(egovMap.get("bplcCode"));
			
			this.familySn = StringExpression.nullConvert(egovMap.get("familySn"));
            this.familyCode = StringExpression.nullConvert(egovMap.get("familyCode"));
            this.yndexcclcRelateCode = StringExpression.nullConvert(egovMap.get("yndexcclcRelateCode"));
            this.yndexcclcTrgetAt = StringExpression.nullConvert(egovMap.get("yndexcclcTrgetAt"));
            this.familyNm = StringExpression.nullConvert(egovMap.get("familyNm"));
            this.ihidnum = StringExpression.nullConvert(egovMap.get("ihidnum"));
            this.ihidnumOl = StringExpression.nullConvert(egovMap.get("ihidnumOl"));
            this.brthdy = StringExpression.nullConvert(egovMap.get("brthdy"));
            this.livtgtAt = StringExpression.nullConvert(egovMap.get("livtgtAt"));
            this.suportAt = StringExpression.nullConvert(egovMap.get("suportAt"));
            this.allwncTrgetAt = StringExpression.nullConvert(egovMap.get("allwncTrgetAt"));
            this.lscholSeCode = StringExpression.nullConvert(egovMap.get("lscholSeCode"));
            this.occpNm = StringExpression.nullConvert(egovMap.get("occpNm"));
            this.ofcpsNm = StringExpression.nullConvert(egovMap.get("ofcpsNm"));
            this.mbtlnum = StringExpression.nullConvert(egovMap.get("mbtlnum"));
            this.dspsnAt = StringExpression.nullConvert(egovMap.get("dspsnAt"));
            this.dspsnNo = StringExpression.nullConvert(egovMap.get("dspsnNo"));
            this.dspsnSeCode = StringExpression.nullConvert(egovMap.get("dspsnSeCode"));
            this.srsillAt = StringExpression.nullConvert(egovMap.get("srsillAt"));
            this.wrcNm = StringExpression.nullConvert(egovMap.get("wrcNm"));
			if(egovMap.get("familySnNew") != null) {
            	this.familySnNew = (int) egovMap.get("familySnNew");
            }
            else {
            	this.familySnNew = 0;
            }
		}
	 }

	    public Mhshrb001_TAB3(EgovMapForNull egovMap, String dhxGridrowIds) {
	        super(egovMap);
	        if(egovMap != null) {
	        	this.familyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
	        	this.familyNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
	        	this.ihidnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
	            this.mbtlnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
	            this.livtgtAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
	            this.allwncTrgetAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
	            this.dspsnAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
	            this.dspsnSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
	            this.occpNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
	            this.wrcNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c11")));
	            this.ofcpsNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c12")));
	            this.yndexcclcTrgetAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c13")));
	            this.yndexcclcRelateCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c14")));
	            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c15")));
	            this.familySn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c16")));
	            this.suportAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c17")));
	            this.lscholSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c18")));
	            this.ihidnumOl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c19")));
	            this.familySnNew = 0;
	            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
	        }
	    }

		public String getEmpno() {
			return empno;
		}

		public void setEmpno(String empno) {
			this.empno = empno;
		}
	    
		public String getBplcCode() {
			return bplcCode;
		}
		public void setBplcCode(String bplcCode) {
			this.bplcCode = bplcCode;
		}
	 
	 
		public String getFamilySn() {
	        return familySn;
	    }
	    public void setFamilySn(String familySn) {
	        this.familySn = familySn;
	    }

	    public String getFamilyCode() {
	        return familyCode;
	    }
	    public void setFamilyCode(String familyCode) {
	        this.familyCode = familyCode;
	    }

	    public String getYndexcclcRelateCode() {
	        return yndexcclcRelateCode;
	    }
	    public void setYndexcclcRelateCode(String yndexcclcRelateCode) {
	        this.yndexcclcRelateCode = yndexcclcRelateCode;
	    }

	    public String getYndexcclcTrgetAt() {
	        return yndexcclcTrgetAt;
	    }
	    public void setYndexcclcTrgetAt(String yndexcclcTrgetAt) {
	        this.yndexcclcTrgetAt = yndexcclcTrgetAt;
	    }

	    public String getFamilyNm() {
	        return familyNm;
	    }
	    public void setFamilyNm(String familyNm) {
	        this.familyNm = familyNm;
	    }

	    public String getIhidnum() {
	        return ihidnum;
	    }
	    public void setIhidnum(String ihidnum) {
	        this.ihidnum = ihidnum;
	    }

	    public String getIhidnumOl() {
	        return ihidnumOl;
	    }
	    public void setIhidnumOl(String ihidnumOl) {
	        this.ihidnumOl = ihidnumOl;
	    }

	    public String getBrthdy() {
	        return brthdy;
	    }
	    public void setBrthdy(String brthdy) {
	        this.brthdy = brthdy;
	    }

	    public String getLivtgtAt() {
	        return livtgtAt;
	    }
	    public void setLivtgtAt(String livtgtAt) {
	        this.livtgtAt = livtgtAt;
	    }

	    public String getSuportAt() {
	        return suportAt;
	    }
	    public void setSuportAt(String suportAt) {
	        this.suportAt = suportAt;
	    }

	    public String getAllwncTrgetAt() {
	        return allwncTrgetAt;
	    }
	    public void setAllwncTrgetAt(String allwncTrgetAt) {
	        this.allwncTrgetAt = allwncTrgetAt;
	    }

	    public String getLscholSeCode() {
	        return lscholSeCode;
	    }
	    public void setLscholSeCode(String lscholSeCode) {
	        this.lscholSeCode = lscholSeCode;
	    }

	    public String getOccpNm() {
	        return occpNm;
	    }
	    public void setOccpNm(String occpNm) {
	        this.occpNm = occpNm;
	    }

	    public String getOfcpsNm() {
	        return ofcpsNm;
	    }
	    public void setOfcpsNm(String ofcpsNm) {
	        this.ofcpsNm = ofcpsNm;
	    }

	    public String getMbtlnum() {
	        return mbtlnum;
	    }
	    public void setMbtlnum(String mbtlnum) {
	        this.mbtlnum = mbtlnum;
	    }

	    public String getDspsnAt() {
	        return dspsnAt;
	    }
	    public void setDspsnAt(String dspsnAt) {
	        this.dspsnAt = dspsnAt;
	    }

	    public String getDspsnNo() {
	        return dspsnNo;
	    }
	    public void setDspsnNo(String dspsnNo) {
	        this.dspsnNo = dspsnNo;
	    }

	    public String getDspsnSeCode() {
	        return dspsnSeCode;
	    }
	    public void setDspsnSeCode(String dspsnSeCode) {
	        this.dspsnSeCode = dspsnSeCode;
	    }

	    public String getSrsillAt() {
	        return srsillAt;
	    }
	    public void setSrsillAt(String srsillAt) {
	        this.srsillAt = srsillAt;
	    }

	    public String getWrcNm() {
	        return wrcNm;
	    }
	    public void setWrcNm(String wrcNm) {
	        this.wrcNm = wrcNm;
	    }

	    public int getFamilySnNew() {
	        return familySnNew;
	    }
	    public void setFamilySnNew(int familySnNew) {
	        this.familySnNew = familySnNew;
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


	    @Override
	    public String toString() {
	        return "Mhshrb001_TAB3 [empno=" + empno + ", familySn=" + familySn + ", familyCode=" + familyCode + ", familyNm=" + familyNm
	                + ", ihidnum=" + ihidnum + ", brthdy=" + brthdy
	                + ", nativeeditorStatus=" + nativeeditorStatus + ", records=" + records + "]";
	    }
}
