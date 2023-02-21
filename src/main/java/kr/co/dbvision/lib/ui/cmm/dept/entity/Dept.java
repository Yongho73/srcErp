package kr.co.dbvision.lib.ui.cmm.dept.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 부서팝업에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.05.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.21          디비비전              최초 생성
 *
 * </pre>
 */

public class Dept extends CommonVO {

    /* 사업장코드 */
    private String bplcCode;
    /* 조직코드 */
    private String orgnztCode;
    /* 부서코드 */
    private String deptCode;
    /* 상위 조직 코드 */
    private String upperOrgnztCode;
    /* 조직명 */
    private String orgnztNm;
    /* 조직 관리자 사원번호 */
    private String orgnztMngrEmpno;
    private String orgnztMngrEmpNm;
    /* 조직 구분 코드(C097) */
    private String orgnztSeCode;
    private String orgnztSeCodeNm;
    /* 조직계위(공통코드:C509) 결정권, 운영독립성에 의한 분류(본부, 센터, 부, 팀, ..) */
    private String orgnztLvl;
    /* 사용시작일자 */
    private String useBeginDe;
    /* 사용종료일자 */
    private String useEndDe;
    /* 사용 여부 */
    private String useAt;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    
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
    /* 사용시작일자 */
    private String deptUseBeginDe;
    /* 사용종료일자( 사용여부가 N이 입력될경우 종료일자가 들어가야함 */
    private String deptUseEndDe;
    /* 사용여부 */
    private String deptUseAt;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Dept() {
        //
    }

    public Dept(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.orgnztCode = StringExpression.nullConvert(egovMap.get("orgnztCode"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.upperOrgnztCode = StringExpression.nullConvert(egovMap.get("upperOrgnztCode"));
            this.orgnztNm = StringExpression.nullConvert(egovMap.get("orgnztNm"));
            this.orgnztMngrEmpno = StringExpression.nullConvert(egovMap.get("orgnztMngrEmpno"));
            this.orgnztMngrEmpNm = StringExpression.nullConvert(egovMap.get("orgnztMngrEmpNm"));
            this.orgnztSeCode = StringExpression.nullConvert(egovMap.get("orgnztSeCode"));
            this.orgnztSeCodeNm = StringExpression.nullConvert(egovMap.get("orgnztSeCodeNm"));
            this.orgnztLvl = StringExpression.nullConvert(egovMap.get("orgnztLvl"));
            this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
            this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            
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
            this.deptUseBeginDe = StringExpression.nullConvert(egovMap.get("deptUseBeginDe"));
            this.deptUseEndDe = StringExpression.nullConvert(egovMap.get("deptUseEndDe"));
            this.deptUseAt = StringExpression.nullConvert(egovMap.get("deptUseAt"));
        }
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getOrgnztCode() {
        return orgnztCode;
    }
    public void setOrgnztCode(String orgnztCode) {
        this.orgnztCode = orgnztCode;
    }

    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getUpperOrgnztCode() {
        return upperOrgnztCode;
    }
    public void setUpperOrgnztCode(String upperOrgnztCode) {
        this.upperOrgnztCode = upperOrgnztCode;
    }

    public String getOrgnztNm() {
        return orgnztNm;
    }
    public void setOrgnztNm(String orgnztNm) {
        this.orgnztNm = orgnztNm;
    }

    public String getOrgnztMngrEmpno() {
        return orgnztMngrEmpno;
    }
    public void setOrgnztMngrEmpno(String orgnztMngrEmpno) {
        this.orgnztMngrEmpno = orgnztMngrEmpno;
    }

    public String getOrgnztMngrEmpNm() {
        return orgnztMngrEmpNm;
    }
    public void setOrgnztMngrEmpNm(String orgnztMngrEmpNm) {
        this.orgnztMngrEmpNm = orgnztMngrEmpNm;
    }

    public String getOrgnztSeCode() {
        return orgnztSeCode;
    }
    public void setOrgnztSeCode(String orgnztSeCode) {
        this.orgnztSeCode = orgnztSeCode;
    }

    public String getOrgnztSeCodeNm() {
        return orgnztSeCodeNm;
    }
    public void setOrgnztSeCodeNm(String orgnztSeCodeNm) {
        this.orgnztSeCodeNm = orgnztSeCodeNm;
    }

    public String getOrgnztLvl() {
        return orgnztLvl;
    }
    public void setOrgnztLvl(String orgnztLvl) {
        this.orgnztLvl = orgnztLvl;
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

    public String getDeptUseBeginDe() {
        return deptUseBeginDe;
    }
    public void setDeptUseBeginDe(String deptUseBeginDe) {
        this.deptUseBeginDe = deptUseBeginDe;
    }

    public String getDeptUseEndDe() {
        return deptUseEndDe;
    }
    public void setDeptUseEndDe(String deptUseEndDe) {
        this.deptUseEndDe = deptUseEndDe;
    }

    public String getDeptUseAt() {
        return deptUseAt;
    }
    public void setDeptUseAt(String deptUseAt) {
        this.deptUseAt = deptUseAt;
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
