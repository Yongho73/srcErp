package kr.co.dbvision.api.mhs.hrm.mhshrm008.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 부서팝업에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.06.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.06.03          디비비전              최초 생성
 *
 * </pre>
 */

public class Mhshrm008 extends CommonVO {

    /* 부서 코드 */
    private String deptCode;
    /* 부서 한글 명 */
    private String deptKorNm;
    /* 부서 영문 명 */
    private String deptEngNm;
    /* 부서 약어 */
    private String deptAbrv;
    /* 사업장 코드 */
    private String bplcCode;
    /* 상위 부서 코드 */
    private String upperDeptCode;
    /* 부서 레벨 */
    private String deptLvl;
    /* 조직 레벨 */
    private String orgnztLvl;
    /* 부서 전화번호 */
    private String deptTelno;
    /* 부서 FAX 전화번호 */
    private String deptFaxTelno;
    /* 사용 시작 일자 */
    private String useBeginDe;
    /* 사용 여부 */
    private String useAt;
    /* 부서 구분 */
    private String deptSe;
    /* 출력 순서 */
    private String outptOrdr;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrm008() {
        //
    }

    public Mhshrm008(EgovMapForNull egovMap) {
        super(egovMap);
        this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
        this.deptKorNm = StringExpression.nullConvert(egovMap.get("deptKorNm"));
        this.deptEngNm = StringExpression.nullConvert(egovMap.get("deptEngNm"));
        this.deptAbrv = StringExpression.nullConvert(egovMap.get("deptAbrv"));
        this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
        this.upperDeptCode = StringExpression.nullConvert(egovMap.get("upperDeptCode"));
        this.deptLvl = StringExpression.nullConvert(egovMap.get("deptLvl"));
        this.orgnztLvl = StringExpression.nullConvert(egovMap.get("orgnztLvl"));
        this.deptTelno = StringExpression.nullConvert(egovMap.get("deptTelno"));
        this.deptFaxTelno = StringExpression.nullConvert(egovMap.get("deptFaxTelno"));
        this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
        this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
        this.deptSe = StringExpression.nullConvert(egovMap.get("deptSe"));
        this.outptOrdr = StringExpression.nullConvert(egovMap.get("outptOrdr"));
    }

    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
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

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getUpperDeptCode() {
        return upperDeptCode;
    }
    public void setUpperDeptCode(String upperDeptCode) {
        this.upperDeptCode = upperDeptCode;
    }

    public String getDeptLvl() {
        return deptLvl;
    }
    public void setDeptLvl(String deptLvl) {
        this.deptLvl = deptLvl;
    }

    public String getOrgnztLvl() {
        return orgnztLvl;
    }
    public void setOrgnztLvl(String orgnztLvl) {
        this.orgnztLvl = orgnztLvl;
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

    public String getUseBeginDe() {
        return useBeginDe;
    }
    public void setUseBeginDe(String useBeginDe) {
        this.useBeginDe = useBeginDe;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getDeptSe() {
        return deptSe;
    }
    public void setDeptSe(String deptSe) {
        this.deptSe = deptSe;
    }

    public String getOutptOrdr() {
        return outptOrdr;
    }
    public void setOutptOrdr(String outptOrdr) {
        this.outptOrdr = outptOrdr;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
