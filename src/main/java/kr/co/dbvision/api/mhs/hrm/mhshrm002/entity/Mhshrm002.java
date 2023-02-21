package kr.co.dbvision.api.mhs.hrm.mhshrm002.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 부서코드등록관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */

public class Mhshrm002 extends CommonVO {

    /* 부서코드 */
    private String deptCode;
    /* 사업장구분코드 기본 자리수는 4자리 */
    private String bplcCode;
    /* 부서 종류 코드 */
    private String deptKindCode;
    /* 부서한글명 */
    private String deptKorNm;
    /* 부서 영문명 */
    private String deptEngNm;
    /* 부서약어:그룹웨어에서 사용 */
    private String deptAbrv;
    /* 정렬순서 */
    private String sortOrdr;
    /* 부서전화번호 */
    private String deptTelno;
    /* 부서팩스번호 */
    private String deptFaxTelno;
    /* 부서이메일 -부서별로 전자세금계산서수취시 사 */
    private String deptEmail;
    /* 부서장 사원번호 */
    private String dprlrEmpno;
    private String dprlrEmpNm;
    /* 예산 사용 부서 */
    private String bugtUseDept;
    private String bugtUseDeptNm;
    /* 사용시작일자 */
    private String useBeginDe;
    /* 사용종료일자( 사용여부가 N이 입력될경우 종료일자가 들어가야함 */
    private String useEndDe;
    /* 사용여부 */
    private String useAt;
    private String useAtNm;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 사용여부 확인 */
    private String useCheck;
    private String useCheck2;
    private String useCheck3;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrm002() {
        //
    }

    public Mhshrm002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.deptKindCode = StringExpression.nullConvert(egovMap.get("deptKindCode"));
            this.deptKorNm = StringExpression.nullConvert(egovMap.get("deptKorNm"));
            this.deptEngNm = StringExpression.nullConvert(egovMap.get("deptEngNm"));
            this.deptAbrv = StringExpression.nullConvert(egovMap.get("deptAbrv"));
            this.sortOrdr = StringExpression.nullConvert(egovMap.get("sortOrdr"));
            this.deptTelno = StringExpression.nullConvert(egovMap.get("deptTelno"));
            this.deptFaxTelno = StringExpression.nullConvert(egovMap.get("deptFaxTelno"));
            this.deptEmail = StringExpression.nullConvert(egovMap.get("deptEmail"));
            this.dprlrEmpno = StringExpression.nullConvert(egovMap.get("dprlrEmpno"));
            this.dprlrEmpNm = StringExpression.nullConvert(egovMap.get("dprlrEmpNm"));
            this.bugtUseDept = StringExpression.nullConvert(egovMap.get("bugtUseDept"));
            this.bugtUseDeptNm = StringExpression.nullConvert(egovMap.get("bugtUseDeptNm"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.useAtNm = StringExpression.nullConvert(egovMap.get("useAtNm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.useCheck = StringExpression.nullConvert(egovMap.get("useCheck"));
            this.useCheck2 = StringExpression.nullConvert(egovMap.get("useCheck2"));
            this.useCheck3 = StringExpression.nullConvert(egovMap.get("useCheck3"));
        }
    }

    public Mhshrm002(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.deptKindCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptKindCode")));
            this.deptKorNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptKorNm")));
            this.deptEngNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptEngNm")));
            this.deptAbrv = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptAbrv")));
            this.sortOrdr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sortOrdr")));
            this.deptTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptTelno")));
            this.deptFaxTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptFaxTelno")));
            this.deptEmail = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptEmail")));
            this.dprlrEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dprlrEmpno")));
            this.bugtUseDept = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bugtUseDept")));
            this.bugtUseDeptNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bugtUseDeptNm")));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useBeginDe")));
            this.useEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useEndDe")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            
            this.useCheck = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useCheck")));
            this.useCheck2 = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useCheck2")));
            this.useCheck3 = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useCheck3")));
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getDeptKindCode() {
        return deptKindCode;
    }
    public void setDeptKindCode(String deptKindCode) {
        this.deptKindCode = deptKindCode;
    }

    public String getDeptKorNm() {
        return deptKorNm;
    }
    public void setDeptKorNm(String deptKorNm) {
        this.deptKorNm = deptKorNm;
    }

    public String getDeptEngNm() {
        return deptEngNm;
    }
    public void setDeptEngNm(String deptEngNm) {
        this.deptEngNm = deptEngNm;
    }

    public String getDeptAbrv() {
        return deptAbrv;
    }
    public void setDeptAbrv(String deptAbrv) {
        this.deptAbrv = deptAbrv;
    }

    public String getSortOrdr() {
        return sortOrdr;
    }
    public void setSortOrdr(String sortOrdr) {
        this.sortOrdr = sortOrdr;
    }

    public String getDeptTelno() {
        return deptTelno;
    }
    public void setDeptTelno(String deptTelno) {
        this.deptTelno = deptTelno;
    }

    public String getDeptFaxTelno() {
        return deptFaxTelno;
    }
    public void setDeptFaxTelno(String deptFaxTelno) {
        this.deptFaxTelno = deptFaxTelno;
    }

    public String getDeptEmail() {
        return deptEmail;
    }
    public void setDeptEmail(String deptEmail) {
        this.deptEmail = deptEmail;
    }

    public String getDprlrEmpno() {
        return dprlrEmpno;
    }
    public void setDprlrEmpno(String dprlrEmpno) {
        this.dprlrEmpno = dprlrEmpno;
    }
    
    public String getDprlrEmpNm() {
        return dprlrEmpNm;
    }
    public void setDprlrEmpNm(String dprlrEmpNm) {
        this.dprlrEmpNm = dprlrEmpNm;
    }

    public String getBugtUseDept() {
        return bugtUseDept;
    }
    public void setBugtUseDept(String bugtUseDept) {
        this.bugtUseDept = bugtUseDept;
    }

    public String getBugtUseDeptNm() {
        return bugtUseDeptNm;
    }
    public void setBugtUseDeptNm(String bugtUseDeptNm) {
        this.bugtUseDeptNm = bugtUseDeptNm;
    }

    public String getUseBeginDe() {
        return useBeginDe;
    }
    public void setUseBeginDe(String useBeginDe) {
        this.useBeginDe = useBeginDe;
    }

    public String getUseEndDe() {
        return useEndDe;
    }
    public void setUseEndDe(String useEndDe) {
        this.useEndDe = useEndDe;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
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
    
    

    public String getUseCheck() {
        return useCheck;
    }
    public void setUseCheck(String useCheck) {
        this.useCheck = useCheck;
    }

    public String getUseCheck2() {
        return useCheck2;
    }
    public void setUseCheck2(String useCheck2) {
        this.useCheck2 = useCheck2;
    }

    public String getUseCheck3() {
        return useCheck3;
    }
    public void setUseCheck3(String useCheck3) {
        this.useCheck3 = useCheck3;
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
