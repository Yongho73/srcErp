package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;


/**
 * 인사기본 tab6 - 징계에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.04.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.23          디비비전              최초 생성
 *
 * </pre>
 */

public class Mhshrb001_TAB6  extends CommonVO {
	/* 사원번호 */
    private String empno;
    /* 사원별 징계의 순번 */
    private String dscplSn;
    /* 상벌 코드 */
    private String rwdsCode;
    /* 징계일자 */
    private String dscplDe;
    /* 징계에 대한 내용을 기술 */
    private String dscplDtls;
    /* 파일번호 */
    private String fileNo;
    /* 징계시작일자 */
    private String dscplBeginDe;
    /* 징계종료일자 */
    private String dscplEndDe;
    /* 승진제한시작일자 */
    private String prmotLmttSdt;
    /* 승진제한종료일자 */
    private String prmotLmttEdt;
    /* 기타 비고사항을 기록관리하는 항목 */
    private String rm;
     
     /* DhtmlX Grid Status (insert, delete, update) */
     private String nativeeditorStatus;
     /* DB Rowdata (option) */
     private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

     public Mhshrb001_TAB6() {
         //
     }

     public Mhshrb001_TAB6(EgovMapForNull egovMap) {
         super(egovMap);
         if(egovMap != null) {
        	 this.empno = StringExpression.nullConvert(egovMap.get("empno"));
             this.dscplSn = StringExpression.nullConvert(egovMap.get("dscplSn"));
             this.rwdsCode = StringExpression.nullConvert(egovMap.get("rwdsCode"));
             this.dscplDe = StringExpression.nullConvert(egovMap.get("dscplDe"));
             this.dscplDtls = StringExpression.nullConvert(egovMap.get("dscplDtls"));
             this.fileNo = StringExpression.nullConvert(egovMap.get("fileNo"));
             this.dscplBeginDe = StringExpression.nullConvert(egovMap.get("dscplBeginDe"));
             this.dscplEndDe = StringExpression.nullConvert(egovMap.get("dscplEndDe"));
             this.prmotLmttSdt = StringExpression.nullConvert(egovMap.get("prmotLmttSdt"));
             this.prmotLmttEdt = StringExpression.nullConvert(egovMap.get("prmotLmttEdt"));
         }
     }
     
     public String getEmpno() {
         return empno;
     }
     public void setEmpno(String empno) {
         this.empno = empno;
     }

     public String getDscplSn() {
         return dscplSn;
     }
     public void setDscplSn(String dscplSn) {
         this.dscplSn = dscplSn;
     }

     public String getRwdsCode() {
         return rwdsCode;
     }
     public void setRwdsCode(String rwdsCode) {
         this.rwdsCode = rwdsCode;
     }

     public String getDscplDe() {
         return dscplDe;
     }
     public void setDscplDe(String dscplDe) {
         this.dscplDe = dscplDe;
     }

     public String getDscplDtls() {
         return dscplDtls;
     }
     public void setDscplDtls(String dscplDtls) {
         this.dscplDtls = dscplDtls;
     }

     public String getFileNo() {
         return fileNo;
     }
     public void setFileNo(String fileNo) {
         this.fileNo = fileNo;
     }

     public String getDscplBeginDe() {
         return dscplBeginDe;
     }
     public void setDscplBeginDe(String dscplBeginDe) {
         this.dscplBeginDe = dscplBeginDe;
     }

     public String getDscplEndDe() {
         return dscplEndDe;
     }
     public void setDscplEndDe(String dscplEndDe) {
         this.dscplEndDe = dscplEndDe;
     }

     public String getPrmotLmttSdt() {
         return prmotLmttSdt;
     }
     public void setPrmotLmttSdt(String prmotLmttSdt) {
         this.prmotLmttSdt = prmotLmttSdt;
     }

     public String getPrmotLmttEdt() {
         return prmotLmttEdt;
     }
     public void setPrmotLmttEdt(String prmotLmttEdt) {
         this.prmotLmttEdt = prmotLmttEdt;
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