package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;


/**
 * 인사기본 tab5 - 포상에 관한 엔티티 클래스
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

public class Mhshrb001_TAB5  extends CommonVO {
     /* 사원번호 */
     private String empno;
     /* 사원별 포상의 순번 */
     private String rwardSn;
     /* 상벌 코드 */
     private String rwdsCode;
     /* 상벌구분 코드 */
     private String rwdsSeCode;
     /* 포상의 종류를 구분 */
     private String rwardNm;
     /* 포상을 수여한 일자 */
     private String rwardDe;
     /* 포상을 실시한 기관 */
     private String rwardInsttNm;
     /* 포상금액 */
     private String rwardAmt;
     /* 포상내역 */
     private String rwardDtls;
     /* 첨부파일번호 */
     private String atchmnflNoEdit;
     /* 첨부파일번호 */
     private String atchmnflNo;
     
     /* DhtmlX Grid Status (insert, delete, update) */
     private String nativeeditorStatus;
     /* DB Rowdata (option) */
     private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

     public Mhshrb001_TAB5() {
         //
     }

     public Mhshrb001_TAB5(EgovMapForNull egovMap) {
         super(egovMap);
         if(egovMap != null) {
             this.empno = StringExpression.nullConvert(egovMap.get("empno"));
             this.rwardSn = StringExpression.nullConvert(egovMap.get("rwardSn"));
             this.rwdsCode = StringExpression.nullConvert(egovMap.get("rwdsCode"));
             this.rwdsSeCode = StringExpression.nullConvert(egovMap.get("rwdsSeCode"));
             this.rwardNm = StringExpression.nullConvert(egovMap.get("rwardNm"));
             this.rwardDe = StringExpression.nullConvert(egovMap.get("rwardDe"));
             this.rwardInsttNm = StringExpression.nullConvert(egovMap.get("rwardInsttNm"));
             this.rwardAmt = StringExpression.nullConvert(egovMap.get("rwardAmt"));
             this.rwardDtls = StringExpression.nullConvert(egovMap.get("rwardDtls"));
             this.atchmnflNoEdit = StringExpression.nullConvert(egovMap.get("atchmnflNoEdit"));
             this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
         }
     }
     
     public String getEmpno() {
         return empno;
     }
     public void setEmpno(String empno) {
         this.empno = empno;
     }

     public String getRwardSn() {
         return rwardSn;
     }
     public void setRwardSn(String rwardSn) {
         this.rwardSn = rwardSn;
     }

     public String getRwdsCode() {
         return rwdsCode;
     }
     public void setRwdsCode(String rwdsCode) {
         this.rwdsCode = rwdsCode;
     }

     public String getRwdsSeCode() {
         return rwdsSeCode;
     }
     public void setRwdsSeCode(String rwdsSeCode) {
         this.rwdsSeCode = rwdsSeCode;
     }

     public String getRwardNm() {
         return rwardNm;
     }
     public void setRwardNm(String rwardNm) {
         this.rwardNm = rwardNm;
     }

     public String getRwardDe() {
         return rwardDe;
     }
     public void setRwardDe(String rwardDe) {
         this.rwardDe = rwardDe;
     }

     public String getRwardInsttNm() {
         return rwardInsttNm;
     }
     public void setRwardInsttNm(String rwardInsttNm) {
         this.rwardInsttNm = rwardInsttNm;
     }

     public String getRwardAmt() {
         return rwardAmt;
     }
     public void setRwardAmt(String rwardAmt) {
         this.rwardAmt = rwardAmt;
     }

     public String getRwardDtls() {
         return rwardDtls;
     }
     public void setRwardDtls(String rwardDtls) {
         this.rwardDtls = rwardDtls;
     }

     public String getAtchmnflNoEdit() {
         return atchmnflNoEdit;
     }
     public void setAtchmnflNoEdit(String atchmnflNoEdit) {
         this.atchmnflNoEdit = atchmnflNoEdit;
     }

     public String getAtchmnflNo() {
         return atchmnflNo;
     }
     public void setAtchmnflNo(String atchmnflNo) {
         this.atchmnflNo = atchmnflNo;
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