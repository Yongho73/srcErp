package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;


/**
 * 인사기본 tab4 - 발령관리에에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.03.09
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.09          디비비전              최초 생성
 *
 * </pre>
 */

public class Mhshrb001_TAB4  extends CommonVO {

	 private String  empno;            //사번
     private String  bplcCode;         //사업장코드
     
     /* 사원명 */
     private String empNm;
     /* 발령 일자 */
     private String gnfdDe;
     /* 발령 순번 */
     private String gnfdSn;
     /* 발령 번호 */
     private String gnfdNo;
     /* 발령 코드 */
     private String gnfdCode;
     /* 처리 여부 */
     private String processAt;
     
 	 /* 변경전 사업장 */
     private String bfchgBplc;
     /* 변경후 사업장*/
 	 private String afchgBplc;
 	
     /* 변경전 부서 코드 */
     private String bfchgDeptCode;
     /* 변경전 부서 코드명 */
     private String bfchgDeptNm;
     
     /* 변경전 상위 부서  코드 */
     private String bfchgUpperDeptCode;
     /* 변경전 상위 부서 명  */
     private String bfchgUpperDeptCodeNm;
     
     /* 변경전 직급 코드 */
     private String bfchgClsfCode;
     /* 변경전 직위 코드 */
     private String bfchgOfcpsCode;
     /* 변경전 직종 코드 */
     private String bfchgJssfcCode;
     /* 변경전 직렬 코드 */
     private String bfchgJblnCode;
     /* 변경전 호봉 코드 */
     private String bfchgSrclsCode;
     /* 변경전 직책 코드 */
     private String bfchgRspofcCode;
     
     /* 변경후 부서 코드 */
     private String afchgDeptCode;
     /* 변경후 부서 코드명 */
     private String afchgDeptNm;
     
     /* 변경후 상위 부서  코드 */
     private String afchgUpperDeptCode;
     /* 변경후 상위 부서 명  */
     private String afchgUpperDeptCodeNm;
     
     /* 변경후 직급 코드 */
     private String afchgClsfCode;
     /* 변경후 직위 코드 */
     private String afchgOfcpsCode;
     /* 변경후 직종 코드 */
     private String afchgJssfcCode;
     /* 변경후 직렬 코드 */
     private String afchgJblnCode;
     /* 변경후 호봉 코드 */
     private String afchgSrclsCode;
     /* 변경후 직책 코드 */
     private String afchgRspofcCode;
     
     /* 발령 시작 일자 */
     private String gnfdBeginDe;
     /* 발령 종료 일자 */
     private String gnfdEndDe;
     
     /* 겸임 부서 코드 */
     private String hdadptDeptCode;
     /* 겸임 부서 코드 */
     private String hdadptDeptNm;
     
 	 /* 변경 전  직무 코드 */
     private String bfchgDutyCode;
     /* 변경 후  직무 코드 */
     private String afchgDutyCode;
     
     
     /* 겸임 여부 */
     private String hdadptAt;
     
     
     /* 발령 내역 */
     private String gnfdDtls;
     /* 결재 코드 */
     private String sanctnCode;
     /* 결재 번호 */
     private String sanctnNo;
     
     /* DhtmlX Grid Status (insert, delete, update) */
     private String nativeeditorStatus;
	   
	 private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

	 public Mhshrb001_TAB4() {
	        //
	}
	 
	 public Mhshrb001_TAB4(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap != null) {
			this.empno				= StringExpression.nullConvert(egovMap.get("empno"));
			this.bplcCode           = StringExpression.nullConvert(egovMap.get("bplcCode"));
			
			this.empNm = StringExpression.nullConvert(egovMap.get("empNm"));
            
            this.gnfdDe = StringExpression.nullConvert(egovMap.get("gnfdDe"));
            this.gnfdSn = StringExpression.nullConvert(egovMap.get("gnfdSn"));
            this.gnfdNo = StringExpression.nullConvert(egovMap.get("gnfdNo"));
            this.gnfdCode = StringExpression.nullConvert(egovMap.get("gnfdCode"));
            this.processAt = StringExpression.nullConvert(egovMap.get("processAt"));
            this.bfchgBplc = StringExpression.nullConvert(egovMap.get("bfchgBplc"));
            this.afchgBplc = StringExpression.nullConvert(egovMap.get("afchgBplc"));
            this.bfchgDeptCode = StringExpression.nullConvert(egovMap.get("bfchgDeptCode"));
            this.bfchgDeptNm   = StringExpression.nullConvert(egovMap.get("bfchgDeptNm"));
            this.bfchgUpperDeptCode = StringExpression.nullConvert(egovMap.get("bfchgUpperDeptCode"));
            this.bfchgUpperDeptCodeNm   = StringExpression.nullConvert(egovMap.get("bfchgUpperDeptCodeNm"));
            this.bfchgClsfCode = StringExpression.nullConvert(egovMap.get("bfchgClsfCode"));
            this.bfchgOfcpsCode = StringExpression.nullConvert(egovMap.get("bfchgOfcpsCode"));
            this.bfchgJssfcCode = StringExpression.nullConvert(egovMap.get("bfchgJssfcCode"));
            this.bfchgJblnCode = StringExpression.nullConvert(egovMap.get("bfchgJblnCode"));
            this.bfchgSrclsCode = StringExpression.nullConvert(egovMap.get("bfchgSrclsCode"));
            this.bfchgRspofcCode = StringExpression.nullConvert(egovMap.get("bfchgRspofcCode"));
            
            this.afchgDeptCode = StringExpression.nullConvert(egovMap.get("afchgDeptCode"));
            this.afchgDeptNm = StringExpression.nullConvert(egovMap.get("afchgDeptNm"));
            this.afchgUpperDeptCode = StringExpression.nullConvert(egovMap.get("afchgUpperDeptCode"));
            this.afchgUpperDeptCodeNm = StringExpression.nullConvert(egovMap.get("afchgUpperDeptCodeNm"));
            this.afchgClsfCode = StringExpression.nullConvert(egovMap.get("afchgClsfCode"));
            this.afchgOfcpsCode = StringExpression.nullConvert(egovMap.get("afchgOfcpsCode"));
            this.afchgJssfcCode = StringExpression.nullConvert(egovMap.get("afchgJssfcCode"));
            this.afchgJblnCode = StringExpression.nullConvert(egovMap.get("afchgJblnCode"));
            this.afchgSrclsCode = StringExpression.nullConvert(egovMap.get("afchgSrclsCode"));
            this.afchgRspofcCode = StringExpression.nullConvert(egovMap.get("afchgRspofcCode"));
            
            this.gnfdBeginDe = StringExpression.nullConvert(egovMap.get("gnfdBeginDe"));
            this.gnfdEndDe = StringExpression.nullConvert(egovMap.get("gnfdEndDe"));
            this.hdadptDeptCode = StringExpression.nullConvert(egovMap.get("hdadptDeptCode"));
            this.hdadptDeptNm = StringExpression.nullConvert(egovMap.get("hdadptDeptNm"));
            this.bfchgDutyCode = StringExpression.nullConvert(egovMap.get("bfchgDutyCode"));
            this.afchgDutyCode = StringExpression.nullConvert(egovMap.get("afchgDutyCode"));
            
            this.hdadptAt = StringExpression.nullConvert(egovMap.get("hdadptAt"));
            this.gnfdDtls = StringExpression.nullConvert(egovMap.get("gnfdDtls"));
            this.sanctnCode = StringExpression.nullConvert(egovMap.get("sanctnCode"));
            this.sanctnNo = StringExpression.nullConvert(egovMap.get("sanctnNo"));
		}
	 }

	    public Mhshrb001_TAB4(EgovMapForNull egovMap, String dhxGridrowIds) {
	        super(egovMap);
	        if(egovMap != null) {
	        	/*
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
	            */
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
	 
	 
		public String getGnfdDe() {
	        return gnfdDe;
	    }
	    public void setGnfdDe(String gnfdDe) {
	        this.gnfdDe = gnfdDe;
	    }

	    public String getGnfdSn() {
	        return gnfdSn;
	    }
	    public void setGnfdSn(String gnfdSn) {
	        this.gnfdSn = gnfdSn;
	    }

	    public String getGnfdNo() {
	        return gnfdNo;
	    }
	    public void setGnfdNo(String gnfdNo) {
	        this.gnfdNo = gnfdNo;
	    }

	    public String getGnfdCode() {
	        return gnfdCode;
	    }
	    public void setGnfdCode(String gnfdCode) {
	        this.gnfdCode = gnfdCode;
	    }

	    public String getProcessAt() {
	        return processAt;
	    }
	    public void setProcessAt(String processAt) {
	        this.processAt = processAt;
	    }
	    
	    public String getBfchgBplc() {
			return bfchgBplc;
		}

		public void setBfchgBplc(String bfchgBplc) {
			this.bfchgBplc = bfchgBplc;
		}

		public String getAfchgBplc() {
			return afchgBplc;
		}

		public void setAfchgBplc(String afchgBplc) {
			this.afchgBplc = afchgBplc;
		}

	    public String getBfchgDeptCode() {
	        return bfchgDeptCode;
	    }
	    public void setBfchgDeptCode(String bfchgDeptCode) {
	        this.bfchgDeptCode = bfchgDeptCode;
	    }

		public String getBfchgDeptNm() {
			return bfchgDeptNm;
		}

		public void setBfchgDeptNm(String bfchgDeptNm) {
			this.bfchgDeptNm = bfchgDeptNm;
		}
	    
	    public String getBfchgUpperDeptCode() {
	        return bfchgUpperDeptCode;
	    }
	    public void setBfchgUpperDeptCode(String bfchgUpperDeptCode) {
	        this.bfchgUpperDeptCode = bfchgUpperDeptCode;
	    }

		public String getBfchgUpperDeptCodeNm() {
			return bfchgUpperDeptCodeNm;
		}

		public void setBfchgUpperDeptCodeNm(String bfchgUpperDeptCodeNm) {
			this.bfchgUpperDeptCodeNm = bfchgUpperDeptCodeNm;
		}
	    
	    public String getBfchgClsfCode() {
	        return bfchgClsfCode;
	    }
	    public void setBfchgClsfCode(String bfchgClsfCode) {
	        this.bfchgClsfCode = bfchgClsfCode;
	    }

	    public String getBfchgOfcpsCode() {
	        return bfchgOfcpsCode;
	    }
	    public void setBfchgOfcpsCode(String bfchgOfcpsCode) {
	        this.bfchgOfcpsCode = bfchgOfcpsCode;
	    }

	    public String getBfchgJssfcCode() {
	        return bfchgJssfcCode;
	    }
	    public void setBfchgJssfcCode(String bfchgJssfcCode) {
	        this.bfchgJssfcCode = bfchgJssfcCode;
	    }

	    public String getBfchgJblnCode() {
	        return bfchgJblnCode;
	    }
	    public void setBfchgJblnCode(String bfchgJblnCode) {
	        this.bfchgJblnCode = bfchgJblnCode;
	    }

	    public String getBfchgSrclsCode() {
	        return bfchgSrclsCode;
	    }
	    public void setBfchgSrclsCode(String bfchgSrclsCode) {
	        this.bfchgSrclsCode = bfchgSrclsCode;
	    }

	    public String getBfchgRspofcCode() {
	        return bfchgRspofcCode;
	    }
	    public void setBfchgRspofcCode(String bfchgRspofcCode) {
	        this.bfchgRspofcCode = bfchgRspofcCode;
	    }
	    
	    public String getAfchgDeptCode() {
	        return afchgDeptCode;
	    }
	    public void setAfchgDeptCode(String afchgDeptCode) {
	        this.afchgDeptCode = afchgDeptCode;
	    }

		public String getAfchgDeptNm() {
			return afchgDeptNm;
		}

		public void setAfchgDeptNm(String afchgDeptNm) {
			this.afchgDeptNm = afchgDeptNm;
		}
	    
	    public String getAfchgUpperDeptCode() {
	        return afchgUpperDeptCode;
	    }
	    public void setAfchgUpperDeptCode(String afchgUpperDeptCode) {
	        this.afchgUpperDeptCode = afchgUpperDeptCode;
	    }

		public String getAfchgUpperDeptCodeNm() {
			return afchgUpperDeptCodeNm;
		}

		public void setAfchgUpperDeptCodeNm(String afchgUpperDeptCodeNm) {
			this.afchgUpperDeptCodeNm = afchgUpperDeptCodeNm;
		}
		
	    public String getAfchgClsfCode() {
	        return afchgClsfCode;
	    }
	    public void setAfchgClsfCode(String afchgClsfCode) {
	        this.afchgClsfCode = afchgClsfCode;
	    }

	    public String getAfchgOfcpsCode() {
	        return afchgOfcpsCode;
	    }
	    public void setAfchgOfcpsCode(String afchgOfcpsCode) {
	        this.afchgOfcpsCode = afchgOfcpsCode;
	    }

	    public String getAfchgJssfcCode() {
	        return afchgJssfcCode;
	    }
	    public void setAfchgJssfcCode(String afchgJssfcCode) {
	        this.afchgJssfcCode = afchgJssfcCode;
	    }

	    public String getAfchgJblnCode() {
	        return afchgJblnCode;
	    }
	    public void setAfchgJblnCode(String afchgJblnCode) {
	        this.afchgJblnCode = afchgJblnCode;
	    }

	    public String getAfchgSrclsCode() {
	        return afchgSrclsCode;
	    }
	    public void setAfchgSrclsCode(String afchgSrclsCode) {
	        this.afchgSrclsCode = afchgSrclsCode;
	    }

	    public String getAfchgRspofcCode() {
	        return afchgRspofcCode;
	    }
	    public void setAfchgRspofcCode(String afchgRspofcCode) {
	        this.afchgRspofcCode = afchgRspofcCode;
	    }

	    public String getGnfdBeginDe() {
	        return gnfdBeginDe;
	    }
	    public void setGnfdBeginDe(String gnfdBeginDe) {
	        this.gnfdBeginDe = gnfdBeginDe;
	    }

	    public String getGnfdEndDe() {
	        return gnfdEndDe;
	    }
	    public void setGnfdEndDe(String gnfdEndDe) {
	        this.gnfdEndDe = gnfdEndDe;
	    }

	    public String getHdadptDeptCode() {
	        return hdadptDeptCode;
	    }
	    public void setHdadptDeptCode(String hdadptDeptCode) {
	        this.hdadptDeptCode = hdadptDeptCode;
	    }

	    public String getHdadptAt() {
	        return hdadptAt;
	    }
	    public void setHdadptAt(String hdadptAt) {
	        this.hdadptAt = hdadptAt;
	    }

	    public String getGnfdDtls() {
	        return gnfdDtls;
	    }
	    public void setGnfdDtls(String gnfdDtls) {
	        this.gnfdDtls = gnfdDtls;
	    }

	    public String getBfchgDutyCode() {
	  		return bfchgDutyCode;
	  	}

	  	public void setBfchgDutyCode(String bfchgDutyCode) {
	  		this.bfchgDutyCode = bfchgDutyCode;
	  	}

	  	public String getAfchgDutyCode() {
	  		return afchgDutyCode;
	  	}

	  	public void setAfchgDutyCode(String afchgDutyCode) {
	  		this.afchgDutyCode = afchgDutyCode;
	  	}
	  	
	    public String getSanctnCode() {
	        return sanctnCode;
	    }
	    public void setSanctnCode(String sanctnCode) {
	        this.sanctnCode = sanctnCode;
	    }

	    public String getSanctnNo() {
	        return sanctnNo;
	    }
	    public void setSanctnNo(String sanctnNo) {
	        this.sanctnNo = sanctnNo;
	    }

		public String getHdadptDeptNm() {
			return hdadptDeptNm;
		}

		public void setHdadptDeptNm(String hdadptDeptNm) {
			this.hdadptDeptNm = hdadptDeptNm;
		}

		public String getEmpNm() {
			return empNm;
		}

		public void setEmpNm(String empNm) {
			this.empNm = empNm;
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
	        return "Mhshrb001_TAB3 [empno=" + empno + ", empNm=" + empNm + ", gnfdDe=" + gnfdDe + ", gnfdSn=" + gnfdSn + ", gnfdNo=" + gnfdNo
	                + ", gnfdCode=" + gnfdCode + ", afchgDeptCode=" + afchgDeptCode + ", afchgClsfCode=" + afchgClsfCode + ", afchgOfcpsCode=" + afchgOfcpsCode
	                + ", nativeeditorStatus=" + nativeeditorStatus + ", records=" + records + "]";
	    }
}