package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;


/**
 * 인사기본 tab2 - 신상정보에 관한 엔티티 클래스
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
 *     2020.03.02          디비비전              최초 생성
 *
 * </pre>
 */

public class Mhshrb001_TAB2  extends CommonVO {

	 private String  empno;            //사번
     private String  bplcCode;         //사업장코드
     
	 private String  height;           //신장   
	 private String  weight;           //체중
	 private String  blood;            //혈액형
	 private String  relgn;            //종교
	 private String  hobby;            //취미
	 private String  vehicleNo;        //소유차량번호
	 private String  socwkercode;      //사회적약자정보
	 private String  enstDe;           //입대일자
	 private String  dmblzDe;          //전역일자
	 private String  dmblzSeCode;      //전역구분
	 private String  msclSeCode;       //군별
	 private String  bnctrSeCode;      //병과
	 private String  clssTyCode;       //계급
	 private String  ssn;              //군번
	 private String  srvddtTy;         //병역자원구분 = 군필 유형
	 private String  incmpResnSeCode;  //미필사유
	 private String  rwdmrtTrgterAt;   //보훈대상
	 private String  rwdmrtSeCode;     //보훈종류
	 private String  familyrelateSe;   //보훈관계
	 private String  rwdmrtGrad;       //보훈등급
	 private String  rwdmrtNo;         //보훈번호
	 private String  dspsnAt;          //장애인정
	 private String  dspsnSe;          //장애구분
	 private String  troblGradSe;      //장애등급
	 private String  troblTyCode;      //장애유형
	   
	 private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

	 public Mhshrb001_TAB2() {
	        //
	}
	 
	 public Mhshrb001_TAB2(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap != null) {
			this.empno				= StringExpression.nullConvert(egovMap.get("empno"));
			this.bplcCode           = StringExpression.nullConvert(egovMap.get("bplcCode"));
			this.height             = StringExpression.nullConvert(egovMap.get("height"));		
			this.weight             = StringExpression.nullConvert(egovMap.get("weight"));	
			this.blood              = StringExpression.nullConvert(egovMap.get("blood"));	
			this.relgn              = StringExpression.nullConvert(egovMap.get("relgn"));	
			this.hobby              = StringExpression.nullConvert(egovMap.get("hobby"));
			this.vehicleNo          = StringExpression.nullConvert(egovMap.get("vehicleNo"));	
			this.socwkercode        = StringExpression.nullConvert(egovMap.get("socwkercode"));	
			this.enstDe             = StringExpression.nullConvert(egovMap.get("enstDe"));	
			this.dmblzDe            = StringExpression.nullConvert(egovMap.get("dmblzDe"));	
			this.dmblzSeCode        = StringExpression.nullConvert(egovMap.get("dmblzSeCode"));	 
			this.msclSeCode         = StringExpression.nullConvert(egovMap.get("msclSeCode"));
			this.bnctrSeCode	    = StringExpression.nullConvert(egovMap.get("bnctrSeCode"));
			this.clssTyCode	        = StringExpression.nullConvert(egovMap.get("clssTyCode"));
			this.ssn	            = StringExpression.nullConvert(egovMap.get("ssn"));
			this.srvddtTy	        = StringExpression.nullConvert(egovMap.get("srvddtTy"));
			this.incmpResnSeCode    = StringExpression.nullConvert(egovMap.get("incmpResnSeCode"));
			this.rwdmrtTrgterAt     = StringExpression.nullConvert(egovMap.get("rwdmrtTrgterAt"));
			this.rwdmrtSeCode       = StringExpression.nullConvert(egovMap.get("rwdmrtSeCode"));
			this.familyrelateSe     = StringExpression.nullConvert(egovMap.get("familyrelateSe"));
			this.rwdmrtGrad         = StringExpression.nullConvert(egovMap.get("rwdmrtGrad"));
			this.rwdmrtNo           = StringExpression.nullConvert(egovMap.get("rwdmrtNo"));
			this.dspsnAt            = StringExpression.nullConvert(egovMap.get("dspsnAt"));
			this.dspsnSe            = StringExpression.nullConvert(egovMap.get("dspsnSe"));
			this.troblGradSe        = StringExpression.nullConvert(egovMap.get("troblGradSe"));
			this.troblTyCode        = StringExpression.nullConvert(egovMap.get("troblTyCode"));
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
	 
	 
		public String getHeight() {
			return height;
		}

		public void setHeight(String height) {
			this.height = height;
		}

		public String getWeight() {
			return weight;
		}

		public void setWeight(String weight) {
			this.weight = weight;
		}

		public String getBlood() {
			return blood;
		}

		public void setBlood(String blood) {
			this.blood = blood;
		}

		public String getRelgn() {
			return relgn;
		}

		public void setRelgn(String relgn) {
			this.relgn = relgn;
		}

		public String getHobby() {
			return hobby;
		}

		public void setHobby(String hobby) {
			this.hobby = hobby;
		}

		public String getVehicleNo() {
			return vehicleNo;
		}

		public void setVehicleNo(String vehicleNo) {
			this.vehicleNo = vehicleNo;
		}

		public String getSocwkercode() {
			return socwkercode;
		}

		public void setSocwkercode(String socwkercode) {
			this.socwkercode = socwkercode;
		}

		public String getEnstDe() {
			return enstDe;
		}

		public void setEnstDe(String enstDe) {
			this.enstDe = enstDe;
		}

		public String getDmblzDe() {
			return dmblzDe;
		}

		public void setDmblzDe(String dmblzDe) {
			this.dmblzDe = dmblzDe;
		}

		public String getDmblzSeCode() {
			return dmblzSeCode;
		}

		public void setDmblzSeCode(String dmblzSeCode) {
			this.dmblzSeCode = dmblzSeCode;
		}

		public String getMsclSeCode() {
			return msclSeCode;
		}

		public void setMsclSeCode(String msclSeCode) {
			this.msclSeCode = msclSeCode;
		}

		public String getBnctrSeCode() {
			return bnctrSeCode;
		}
		public void setBnctrSeCode(String bnctrSeCode) {
			this.bnctrSeCode = bnctrSeCode;
		}

		public String getClssTyCode() {
			return clssTyCode;
		}
		public void setClssTyCode(String clssTyCode) {
			this.clssTyCode = clssTyCode;
		}

		public String getSsn() {
			return ssn;
		}
		public void setSsn(String ssn) {
			this.ssn = ssn;
		}

		public String getSrvddtTy() {
			return srvddtTy;
		}
		public void setSrvddtTy(String srvddtTy) {
			this.srvddtTy = srvddtTy;
		}

		public String getIncmpResnSeCode() {
			return incmpResnSeCode;
		}
		public void setIncmpResnSeCode(String incmpResnSeCode) {
			this.incmpResnSeCode = incmpResnSeCode;
		}

		public String getRwdmrtTrgterAt() {
			return rwdmrtTrgterAt;
		}
		public void setRwdmrtTrgterAt(String rwdmrtTrgterAt) {
			this.rwdmrtTrgterAt = rwdmrtTrgterAt;
		}

		public String getRwdmrtSeCode() {
			return rwdmrtSeCode;
		}
		public void setRwdmrtSeCode(String rwdmrtSeCode) {
			this.rwdmrtSeCode = rwdmrtSeCode;
		}

		public String getFamilyrelateSe() {
			return familyrelateSe;
		}
		public void setFamilyrelateSe(String familyrelateSe) {
			this.familyrelateSe = familyrelateSe;
		}

		public String getRwdmrtGrad() {
			return rwdmrtGrad;
		}
		public void setRwdmrtGrad(String rwdmrtGrad) {
			this.rwdmrtGrad = rwdmrtGrad;
		}

		public String getRwdmrtNo() {
			return rwdmrtNo;
		}
		public void setRwdmrtNo(String rwdmrtNo) {
			this.rwdmrtNo = rwdmrtNo;
		}

		public String getDspsnAt() {
			return dspsnAt;
		}
		public void setDspsnAt(String dspsnAt) {
			this.dspsnAt = dspsnAt;
		}

		public String getDspsnSe() {
			return dspsnSe;
		}
		public void setDspsnSe(String dspsnSe) {
			this.dspsnSe = dspsnSe;
		}

		public String getTroblGradSe() {
			return troblGradSe;
		}
		public void setTroblGradSe(String troblGradSe) {
			this.troblGradSe = troblGradSe;
		}

		public String getTroblTyCode() {
			return troblTyCode;
		}
		public void setTroblTyCode(String troblTyCode) {
			this.troblTyCode = troblTyCode;
		}
		
		

		public List<EgovMapForNull> getRecords() {
			return records;
		}

		public void setRecords(List<EgovMapForNull> records) {
			this.records = records;
		}
}
