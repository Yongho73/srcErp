package kr.co.dbvision.api.mhs.wks.mhswks007.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 휴직신청관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.05.15
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.15          디비비전              최초 생성
 * </pre>
 */

public class Mhswks007 extends CommonVO {

    /* 휴직번호 */
    private String layoffNo;
    /* 사원번호 */
    private String empno;
    /* 신청일자 */
    private String reqstDe;
    /* 휴직시작일자 */
    private String layoffBeginDe;
    /* 휴직종료일자 */
    private String layoffEndDe;
    /* 휴직일수 */
    private String layoffDaycnt;
    /* 휴직내역 */
    private String layoffDtls;
    /* 연장휴직번호 */
    private String extnLayoffNo;
    /* 휴직구분코드(C190) */
    private String layoffSeCode;
    /* 근속기간포함여부 */
    private String cnwkpdInclsAt;
    /* 첨부파일번호 */
    private String atchmnflNo;
    /* 전자결재문서번호 */
    private String sanctnDocNo;
    /* 전자결재상태코드 */
    private String sanctnSttusCode;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhswks007() {
        //
    }

    public Mhswks007(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.layoffNo = StringExpression.nullConvert(egovMap.get("layoffNo"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.reqstDe = StringExpression.nullConvert(egovMap.get("reqstDe"));
            this.layoffBeginDe = StringExpression.nullConvert(egovMap.get("layoffBeginDe"));
            this.layoffEndDe = StringExpression.nullConvert(egovMap.get("layoffEndDe"));
            this.layoffDaycnt = StringExpression.nullConvert(egovMap.get("layoffDaycnt"));
            this.layoffDtls = StringExpression.nullConvert(egovMap.get("layoffDtls"));
            this.extnLayoffNo = StringExpression.nullConvert(egovMap.get("extnLayoffNo"));
            this.layoffSeCode = StringExpression.nullConvert(egovMap.get("layoffSeCode"));
            this.cnwkpdInclsAt = StringExpression.nullConvert(egovMap.get("cnwkpdInclsAt"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.sanctnDocNo = StringExpression.nullConvert(egovMap.get("sanctnDocNo"));
            this.sanctnSttusCode = StringExpression.nullConvert(egovMap.get("sanctnSttusCode"));
        }
    }

    public Mhswks007(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.layoffNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffNo")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.reqstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstDe")));
            this.layoffBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffBeginDe")));
            this.layoffEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffEndDe")));
            this.layoffDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffDaycnt")));
            this.layoffDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffDtls")));
            this.extnLayoffNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_extnLayoffNo")));
            this.layoffSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffSeCode")));
            this.cnwkpdInclsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkpdInclsAt")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.sanctnDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sanctnDocNo")));
            this.sanctnSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sanctnSttusCode")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getLayoffNo() {
        return layoffNo;
    }
    public void setLayoffNo(String layoffNo) {
        this.layoffNo = layoffNo;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getReqstDe() {
        return reqstDe;
    }
    public void setReqstDe(String reqstDe) {
        this.reqstDe = reqstDe;
    }

    public String getLayoffBeginDe() {
        return layoffBeginDe;
    }
    public void setLayoffBeginDe(String layoffBeginDe) {
        this.layoffBeginDe = layoffBeginDe;
    }

    public String getLayoffEndDe() {
        return layoffEndDe;
    }
    public void setLayoffEndDe(String layoffEndDe) {
        this.layoffEndDe = layoffEndDe;
    }

    public String getLayoffDaycnt() {
        return layoffDaycnt;
    }
    public void setLayoffDaycnt(String layoffDaycnt) {
        this.layoffDaycnt = layoffDaycnt;
    }

    public String getLayoffDtls() {
        return layoffDtls;
    }
    public void setLayoffDtls(String layoffDtls) {
        this.layoffDtls = layoffDtls;
    }

    public String getExtnLayoffNo() {
        return extnLayoffNo;
    }
    public void setExtnLayoffNo(String extnLayoffNo) {
        this.extnLayoffNo = extnLayoffNo;
    }

    public String getLayoffSeCode() {
        return layoffSeCode;
    }
    public void setLayoffSeCode(String layoffSeCode) {
        this.layoffSeCode = layoffSeCode;
    }

    public String getCnwkpdInclsAt() {
        return cnwkpdInclsAt;
    }
    public void setCnwkpdInclsAt(String cnwkpdInclsAt) {
        this.cnwkpdInclsAt = cnwkpdInclsAt;
    }

    public String getAtchmnflNo() {
        return atchmnflNo;
    }
    public void setAtchmnflNo(String atchmnflNo) {
        this.atchmnflNo = atchmnflNo;
    }

    public String getSanctnDocNo() {
        return sanctnDocNo;
    }
    public void setSanctnDocNo(String sanctnDocNo) {
        this.sanctnDocNo = sanctnDocNo;
    }

    public String getSanctnSttusCode() {
        return sanctnSttusCode;
    }
    public void setSanctnSttusCode(String sanctnSttusCode) {
        this.sanctnSttusCode = sanctnSttusCode;
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
