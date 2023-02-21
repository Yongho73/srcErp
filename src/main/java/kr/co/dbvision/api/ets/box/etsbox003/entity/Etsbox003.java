package kr.co.dbvision.api.ets.box.etsbox003.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 공람문서관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2021.03.26
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.26)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.26          디비비전              최초 생성
 * </pre>
 */

public class Etsbox003 extends CommonVO {

    /* 결재 번호 */
    private String sanctnNo;
    /* 양식 번호 */
    private String raisNo;
    /* 문서 제목 */
    private String docTit;
    /* 기안자 사원번호 */
    private String drafterEmpno;
    /* 기안 요청일시 */
    private String drftRequstdt;
    /* 문서 번호 */
    private String docNo;
    /* 기안 일시  */
    private String drftDe;
    /* 결재 완료일시 */
    private String sanctnComptdt;
    /* 등록 ID */
    private String regId;
    /* 등록 일시 */
    private String regDt;
    /* 수정 ID */
    private String uptId;
    /* 수정 일시 */
    private String uptDt;
    /* 긴급 결재 여부 */
    private String emrgncySanctnAt;
    /* 결재 요약 */
    private String sanctnSumry;
    /* 첨부파일 */
    private String atchmnfl;
    /* 문서 상태 코드 */
    private String docSttusCode;
    /* 공개 구분 코드 */
    private String othbcSeCode;
    /* 문서함 번호 */
    private String dbxNo;
    /* 기안자 부서 코드 */
    private String drafterDeptCode;
    /* 결재 유형 코드 */
    private String sanctnTyCode;
    /* 비공개 사유 코드 */
    private String ctothbcResnCode;
    /* 기록물철 코드 */
    private String dcmnCode;
    /* 열람 권한 코드 */
    private String readngAuthorCode;
    /* 문서 보존 기한 코드 */
    private String docPrsrvTmlmtCode;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Etsbox003() {
        //
    }

    public Etsbox003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.sanctnNo = StringExpression.nullConvert(egovMap.get("sanctnNo"));
            this.raisNo = StringExpression.nullConvert(egovMap.get("raisNo"));
            this.docTit = StringExpression.nullConvert(egovMap.get("docTit"));
            this.drafterEmpno = StringExpression.nullConvert(egovMap.get("drafterEmpno"));
            this.drftRequstdt = StringExpression.nullConvert(egovMap.get("drftRequstdt"));
            this.docNo = StringExpression.nullConvert(egovMap.get("docNo"));
            this.drftDe = StringExpression.nullConvert(egovMap.get("drftDe"));
            this.sanctnComptdt = StringExpression.nullConvert(egovMap.get("sanctnComptdt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.emrgncySanctnAt = StringExpression.nullConvert(egovMap.get("emrgncySanctnAt"));
            this.sanctnSumry = StringExpression.nullConvert(egovMap.get("sanctnSumry"));
            this.atchmnfl = StringExpression.nullConvert(egovMap.get("atchmnfl"));
            this.docSttusCode = StringExpression.nullConvert(egovMap.get("docSttusCode"));
            this.othbcSeCode = StringExpression.nullConvert(egovMap.get("othbcSeCode"));
            this.dbxNo = StringExpression.nullConvert(egovMap.get("dbxNo"));
            this.drafterDeptCode = StringExpression.nullConvert(egovMap.get("drafterDeptCode"));
            this.sanctnTyCode = StringExpression.nullConvert(egovMap.get("sanctnTyCode"));
            this.ctothbcResnCode = StringExpression.nullConvert(egovMap.get("ctothbcResnCode"));
            this.dcmnCode = StringExpression.nullConvert(egovMap.get("dcmnCode"));
            this.readngAuthorCode = StringExpression.nullConvert(egovMap.get("readngAuthorCode"));
            this.docPrsrvTmlmtCode = StringExpression.nullConvert(egovMap.get("docPrsrvTmlmtCode"));
        }
    }

    public Etsbox003(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.sanctnNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sanctnNo")));
            this.raisNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_raisNo")));
            this.docTit = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_docTit")));
            this.drafterEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_drafterEmpno")));
            this.drftRequstdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_drftRequstdt")));
            this.docNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_docNo")));
            this.drftDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_drftDe")));
            this.sanctnComptdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sanctnComptdt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.emrgncySanctnAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_emrgncySanctnAt")));
            this.sanctnSumry = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sanctnSumry")));
            this.atchmnfl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnfl")));
            this.docSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_docSttusCode")));
            this.othbcSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_othbcSeCode")));
            this.dbxNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dbxNo")));
            this.drafterDeptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_drafterDeptCode")));
            this.sanctnTyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sanctnTyCode")));
            this.ctothbcResnCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ctothbcResnCode")));
            this.dcmnCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dcmnCode")));
            this.readngAuthorCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_readngAuthorCode")));
            this.docPrsrvTmlmtCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_docPrsrvTmlmtCode")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getSanctnNo() {
        return sanctnNo;
    }
    public void setSanctnNo(String sanctnNo) {
        this.sanctnNo = sanctnNo;
    }

    public String getRaisNo() {
        return raisNo;
    }
    public void setRaisNo(String raisNo) {
        this.raisNo = raisNo;
    }

    public String getDocTit() {
        return docTit;
    }
    public void setDocTit(String docTit) {
        this.docTit = docTit;
    }

    public String getDrafterEmpno() {
        return drafterEmpno;
    }
    public void setDrafterEmpno(String drafterEmpno) {
        this.drafterEmpno = drafterEmpno;
    }

    public String getDrftRequstdt() {
        return drftRequstdt;
    }
    public void setDrftRequstdt(String drftRequstdt) {
        this.drftRequstdt = drftRequstdt;
    }

    public String getDocNo() {
        return docNo;
    }
    public void setDocNo(String docNo) {
        this.docNo = docNo;
    }

    public String getDrftDe() {
        return drftDe;
    }
    public void setDrftDe(String drftDe) {
        this.drftDe = drftDe;
    }

    public String getSanctnComptdt() {
        return sanctnComptdt;
    }
    public void setSanctnComptdt(String sanctnComptdt) {
        this.sanctnComptdt = sanctnComptdt;
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

    public String getEmrgncySanctnAt() {
        return emrgncySanctnAt;
    }
    public void setEmrgncySanctnAt(String emrgncySanctnAt) {
        this.emrgncySanctnAt = emrgncySanctnAt;
    }

    public String getSanctnSumry() {
        return sanctnSumry;
    }
    public void setSanctnSumry(String sanctnSumry) {
        this.sanctnSumry = sanctnSumry;
    }

    public String getAtchmnfl() {
        return atchmnfl;
    }
    public void setAtchmnfl(String atchmnfl) {
        this.atchmnfl = atchmnfl;
    }

    public String getDocSttusCode() {
        return docSttusCode;
    }
    public void setDocSttusCode(String docSttusCode) {
        this.docSttusCode = docSttusCode;
    }

    public String getOthbcSeCode() {
        return othbcSeCode;
    }
    public void setOthbcSeCode(String othbcSeCode) {
        this.othbcSeCode = othbcSeCode;
    }

    public String getDbxNo() {
        return dbxNo;
    }
    public void setDbxNo(String dbxNo) {
        this.dbxNo = dbxNo;
    }

    public String getDrafterDeptCode() {
        return drafterDeptCode;
    }
    public void setDrafterDeptCode(String drafterDeptCode) {
        this.drafterDeptCode = drafterDeptCode;
    }

    public String getSanctnTyCode() {
        return sanctnTyCode;
    }
    public void setSanctnTyCode(String sanctnTyCode) {
        this.sanctnTyCode = sanctnTyCode;
    }

    public String getCtothbcResnCode() {
        return ctothbcResnCode;
    }
    public void setCtothbcResnCode(String ctothbcResnCode) {
        this.ctothbcResnCode = ctothbcResnCode;
    }

    public String getDcmnCode() {
        return dcmnCode;
    }
    public void setDcmnCode(String dcmnCode) {
        this.dcmnCode = dcmnCode;
    }

    public String getReadngAuthorCode() {
        return readngAuthorCode;
    }
    public void setReadngAuthorCode(String readngAuthorCode) {
        this.readngAuthorCode = readngAuthorCode;
    }

    public String getDocPrsrvTmlmtCode() {
        return docPrsrvTmlmtCode;
    }
    public void setDocPrsrvTmlmtCode(String docPrsrvTmlmtCode) {
        this.docPrsrvTmlmtCode = docPrsrvTmlmtCode;
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
