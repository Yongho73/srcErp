package kr.co.dbvision.api.pjt.osc.pjtosc001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 아웃소싱 인력현황관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2021.06.24
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.24          디비비전              최초 생성
 * </pre>
 */

public class Pjtosc001 extends CommonVO {

    /* 아웃소싱 사원번호 */
    private String outsrcEmpno;
    /* 성명 */
    private String nm;
    /* 소속 */
    private String deptCode;
    /* 주민등록번호 */
    private String ihidnum;
    /* 나이 */
    private String age;
    /* 성별구분 (공통코드:C286) */
    private String sexdstnSe;
    /* 직종 코드 */
    private String jssfcCode;
    /* 투입 가능 여부 */
    private String inptPosblAt;
    /* 경력 년수 */
    private String careerYcnt;
    /* 경력 월수 */
    private String careerMcnt;
    /* 기술 등급 코드 */
    private String tchnlgyGradCode;
    /* 자격증 취득  여부 */
    private String crqfsAt;
    /* 역할 코드 */
    private String roleCode;
    /* 최종 학력 코드 */
    private String lastAcdmcrCode;
    /* 희망 지역 코드 */
    private String hopeAreaCode;
    /* 이미지 구분 코드(평판) */
    private String imgSeCode;
    /* 이메일 */
    private String email;
    /* 전화번호 */
    private String telno;
    /* 휴대폰 번호 */
    private String hpNo;
    /* 우편번호 */
    private String zip;
    /* 주소 */
    private String adres;
    /* 상세 주소 */
    private String detailAdres;
    /* 비고 */
    private String rm;
    /* 등록 일시 */
    private String regDt;
    /* 등록 ID */
    private String regId;
    /* 수정 일시 */
    private String uptDt;
    /* 수정 ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Pjtosc001() {
        //
    }

    public Pjtosc001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.outsrcEmpno = StringExpression.nullConvert(egovMap.get("outsrcEmpno"));
            this.nm = StringExpression.nullConvert(egovMap.get("nm"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.ihidnum = StringExpression.nullConvert(egovMap.get("ihidnum"));
            this.age = StringExpression.nullConvert(egovMap.get("age"));
            this.sexdstnSe = StringExpression.nullConvert(egovMap.get("sexdstnSe"));
            this.jssfcCode = StringExpression.nullConvert(egovMap.get("jssfcCode"));
            this.inptPosblAt = StringExpression.nullConvert(egovMap.get("inptPosblAt"));
            this.careerYcnt = StringExpression.nullConvert(egovMap.get("careerYcnt"));
            this.careerMcnt = StringExpression.nullConvert(egovMap.get("careerMcnt"));
            this.tchnlgyGradCode = StringExpression.nullConvert(egovMap.get("tchnlgyGradCode"));
            this.crqfsAt = StringExpression.nullConvert(egovMap.get("crqfsAt"));
            this.roleCode = StringExpression.nullConvert(egovMap.get("roleCode"));
            this.lastAcdmcrCode = StringExpression.nullConvert(egovMap.get("lastAcdmcrCode"));
            this.hopeAreaCode = StringExpression.nullConvert(egovMap.get("hopeAreaCode"));
            this.imgSeCode = StringExpression.nullConvert(egovMap.get("imgSeCode"));
            this.email = StringExpression.nullConvert(egovMap.get("email"));
            this.telno = StringExpression.nullConvert(egovMap.get("telno"));
            this.hpNo = StringExpression.nullConvert(egovMap.get("hpNo"));
            this.zip = StringExpression.nullConvert(egovMap.get("zip"));
            this.adres = StringExpression.nullConvert(egovMap.get("adres"));
            this.detailAdres = StringExpression.nullConvert(egovMap.get("detailAdres"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Pjtosc001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.outsrcEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_outsrcEmpno")));
            this.nm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nm")));
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode")));
            this.ihidnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ihidnum")));
            this.age = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_age")));
            this.sexdstnSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sexdstnSe")));
            this.jssfcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jssfcCode")));
            this.inptPosblAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_inptPosblAt")));
            this.careerYcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerYcnt")));
            this.careerMcnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_careerMcnt")));
            this.tchnlgyGradCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_tchnlgyGradCode")));
            this.crqfsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_crqfsAt")));
            this.roleCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_roleCode")));
            this.lastAcdmcrCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lastAcdmcrCode")));
            this.hopeAreaCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hopeAreaCode")));
            this.imgSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_imgSeCode")));
            this.email = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_email")));
            this.telno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_telno")));
            this.hpNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hpNo")));
            this.zip = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_zip")));
            this.adres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_adres")));
            this.detailAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_detailAdres")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getOutsrcEmpno() {
        return outsrcEmpno;
    }
    public void setOutsrcEmpno(String outsrcEmpno) {
        this.outsrcEmpno = outsrcEmpno;
    }

    public String getNm() {
        return nm;
    }
    public void setNm(String nm) {
        this.nm = nm;
    }

    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getIhidnum() {
        return ihidnum;
    }
    public void setIhidnum(String ihidnum) {
        this.ihidnum = ihidnum;
    }

    public String getAge() {
        return age;
    }
    public void setAge(String age) {
        this.age = age;
    }

    public String getSexdstnSe() {
        return sexdstnSe;
    }
    public void setSexdstnSe(String sexdstnSe) {
        this.sexdstnSe = sexdstnSe;
    }

    public String getJssfcCode() {
        return jssfcCode;
    }
    public void setJssfcCode(String jssfcCode) {
        this.jssfcCode = jssfcCode;
    }

    public String getInptPosblAt() {
        return inptPosblAt;
    }
    public void setInptPosblAt(String inptPosblAt) {
        this.inptPosblAt = inptPosblAt;
    }

    public String getCareerYcnt() {
        return careerYcnt;
    }
    public void setCareerYcnt(String careerYcnt) {
        this.careerYcnt = careerYcnt;
    }

    public String getCareerMcnt() {
        return careerMcnt;
    }
    public void setCareerMcnt(String careerMcnt) {
        this.careerMcnt = careerMcnt;
    }

    public String getTchnlgyGradCode() {
        return tchnlgyGradCode;
    }
    public void setTchnlgyGradCode(String tchnlgyGradCode) {
        this.tchnlgyGradCode = tchnlgyGradCode;
    }

    public String getCrqfsAt() {
        return crqfsAt;
    }
    public void setCrqfsAt(String crqfsAt) {
        this.crqfsAt = crqfsAt;
    }

    public String getRoleCode() {
        return roleCode;
    }
    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public String getLastAcdmcrCode() {
        return lastAcdmcrCode;
    }
    public void setLastAcdmcrCode(String lastAcdmcrCode) {
        this.lastAcdmcrCode = lastAcdmcrCode;
    }

    public String getHopeAreaCode() {
        return hopeAreaCode;
    }
    public void setHopeAreaCode(String hopeAreaCode) {
        this.hopeAreaCode = hopeAreaCode;
    }

    public String getImgSeCode() {
        return imgSeCode;
    }
    public void setImgSeCode(String imgSeCode) {
        this.imgSeCode = imgSeCode;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelno() {
        return telno;
    }
    public void setTelno(String telno) {
        this.telno = telno;
    }

    public String getHpNo() {
        return hpNo;
    }
    public void setHpNo(String hpNo) {
        this.hpNo = hpNo;
    }

    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getAdres() {
        return adres;
    }
    public void setAdres(String adres) {
        this.adres = adres;
    }

    public String getDetailAdres() {
        return detailAdres;
    }
    public void setDetailAdres(String detailAdres) {
        this.detailAdres = detailAdres;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
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
