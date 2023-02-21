package kr.co.dbvision.api.pub.usr.pubusr001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 개인정보조회관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2021.05.28
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.05.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.05.28          디비비전              최초 생성
 * </pre>
 */

public class Pubusr001 extends CommonVO {

    /* 사원번호 */
    private String empno;
    /* 사업장구분코드 기본 자리수는 4자리 */
    private String bplcCode;
    /* 한글성명 */
    private String korNm;
    /* 영문명 */
    private String engNm;
    /* 한자명을 기록하는 항목 */
    private String chcrtNm;
    /* 직원구분(공통코드:C068) 정규직/무기계약직/계약직/인턴/파견 */
    private String emplSe;
    /* 입사구분 코드(C014) */
    private String ecnySeCode;
    /* 부서코드 */
    private String deptCode;
    /* 직원의 재직생태(공통코드 C278) 재직/퇴직 */
    private String hffsSe;
    /* 직원의 최초 입사일자를 기록하는 항목 */
    private String ecnyDe;
    /* 주민번호 (암호화 적용될경우 길이 더 늘어날수 있음) */
    private String ihidnum;
    /* 성별구분 (공통코드:C286) */
    private String sexdstnSe;
    /* 내외국인 1: 내국인, 9 외국인(C011) */
    private String natvfrgnSeCode;
    /* 국적코드(공통코드C122) */
    private String nltyCode;
    /* 호봉코드(숫자이면서 공통코드 C285) */
    private String srclsCode;
    /* 직급코드(MHS_CLSF_CODE) */
    private String clsfCode;
    /* 직위코드 */
    private String ofcpsCode;
    /* 직종코드 (MHS_JSSFC) */
    private String jssfcCode;
    /* 직무코드 */
    private String dtyCode;
    /* 직책코드 */
    private String rspofcCode;
    /* 직렬코드(C090) */
    private String jblnCode;
    /* 사원 주소지의 우편번호 */
    private String zip;
    /* 직원이 현재 거주하고 있는 주소지 */
    private String ownhomAdres;
    /* 직원이 현재 거주하고 있는 주소지의 상세 */
    private String ownhomDetailAdres;
    /* 현주소영문 */
    private String ownhomEngAdres;
    /* 집전화번호를 기록하는 항목. */
    private String ownhomTelno;
    /* 내선번호 */
    private String lxtnTelno;
    /* 휴대폰번호 */
    private String mbtlnum;
    /* 비상전화번호 */
    private String emgncTelno;
    /* e-메일주소 */
    private String email;
    /* 개인이메일주소 */
    private String indvdlEmail;
    /* 생년월일 (YYYYMMDD) */
    private String brthdy;
    /* 생일의 음양구 항목 C013 */
    private String slrcldAt;
    /* 결혼여부 */
    private String mrrgAt;
    /* 퇴직일자 */
    private String retireDe;
    /* 직원의 퇴직 사유(C154) */
    private String retireSe;
    /* 휴직구분코드(C190) */
    private String layoffSeCode;
    /* 사진첨부파일번호 */
    private String photoAtchmnflNo;
    /* 서명첨부파일번호 */
    private String signAtchmnflNo;
    /* 출납담당 여부(출납수당과 연관됨) */
    private String cashierAt;
    /* 겸임여부 */
    private String hdadptAt;
    /* 직원의 겸임 부서 */
    private String hdadptDeptCode;
    /* 파견부서코드 */
    private String dispDeptCode;
    /* 부서장 여부 */
    private String dprlrAt;
    /* 노조가입여부 */
    private String lbunSbscrbAt;
    /* 상조가입여부 */
    private String mutaidSbscrbAt;
    /* 파견근무여부 */
    private String dispWorkAt;
    /* 유연근무제여부 */
    private String flexbizAt;
    /* 육아기간 단축근무 여부 */
    private String babyShrtenWorkAt;
    /* 임금피크제 여부 */
    private String salpeakAt;
    /* 급여 책정 코드 (C067) */
    private String salaryAprpCode;
    /* 연봉제여부 */
    private String ansalsysAt;
    /* 수습시작일자 */
    private String apntcSdt;
    /* 수습종료일자 */
    private String apntcEdt;
    /* 소득세율코드(80, 100,120) */
    private String incmtaxrtCode;
    /* 급여지급여부 */
    private String salaryPymntAt;
    /* 퇴직연금종류코드 */
    private String retireAnntyKindCode;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 차기 승급 일자 */
    private String nxttrmPromtDe;
    /* 퇴직연금 가입일자 */
    private String retireAnntySbscrbDe;
    /* 퇴직 연금 예금명 */
    private String retireAnntyDpstnm;
    /* 퇴직 연금 은행 코드(C010) */
    private String retireAnntyBankCode;
    /* 퇴직 연금 계좌번호 */
    private String retireAnntyAcnutno;
    /* 휴직 대체 인력 여부 */
    private String layoffAltHnfAt;
    /* 무기계약직 전환 일자 : 계약직인 경우 */
    private String nonTmlmtCntrctChangeDe;
    /* 현직급임용일 */
    private String curClsfEmplmnday;
    /* 선임구분(C223) */
    private String seniorSe;
    /* 퇴직 연금 DC 가입 일자 */
    private String retireAnntyDcSbscrbDe;
    /* 최종승급일자 */
    private String lastPromtDe;
    /* NON 기한 계약 변경 일자 */
    private String nonTmlmtCnttkChangeDe;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Pubusr001() {
        //
    }

    public Pubusr001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.korNm = StringExpression.nullConvert(egovMap.get("korNm"));
            this.engNm = StringExpression.nullConvert(egovMap.get("engNm"));
            this.chcrtNm = StringExpression.nullConvert(egovMap.get("chcrtNm"));
            this.emplSe = StringExpression.nullConvert(egovMap.get("emplSe"));
            this.ecnySeCode = StringExpression.nullConvert(egovMap.get("ecnySeCode"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.hffsSe = StringExpression.nullConvert(egovMap.get("hffsSe"));
            this.ecnyDe = StringExpression.nullConvert(egovMap.get("ecnyDe"));
            this.ihidnum = StringExpression.nullConvert(egovMap.get("ihidnum"));
            this.sexdstnSe = StringExpression.nullConvert(egovMap.get("sexdstnSe"));
            this.natvfrgnSeCode = StringExpression.nullConvert(egovMap.get("natvfrgnSeCode"));
            this.nltyCode = StringExpression.nullConvert(egovMap.get("nltyCode"));
            this.srclsCode = StringExpression.nullConvert(egovMap.get("srclsCode"));
            this.clsfCode = StringExpression.nullConvert(egovMap.get("clsfCode"));
            this.ofcpsCode = StringExpression.nullConvert(egovMap.get("ofcpsCode"));
            this.jssfcCode = StringExpression.nullConvert(egovMap.get("jssfcCode"));
            this.dtyCode = StringExpression.nullConvert(egovMap.get("dtyCode"));
            this.rspofcCode = StringExpression.nullConvert(egovMap.get("rspofcCode"));
            this.jblnCode = StringExpression.nullConvert(egovMap.get("jblnCode"));
            this.zip = StringExpression.nullConvert(egovMap.get("zip"));
            this.ownhomAdres = StringExpression.nullConvert(egovMap.get("ownhomAdres"));
            this.ownhomDetailAdres = StringExpression.nullConvert(egovMap.get("ownhomDetailAdres"));
            this.ownhomEngAdres = StringExpression.nullConvert(egovMap.get("ownhomEngAdres"));
            this.ownhomTelno = StringExpression.nullConvert(egovMap.get("ownhomTelno"));
            this.lxtnTelno = StringExpression.nullConvert(egovMap.get("lxtnTelno"));
            this.mbtlnum = StringExpression.nullConvert(egovMap.get("mbtlnum"));
            this.emgncTelno = StringExpression.nullConvert(egovMap.get("emgncTelno"));
            this.email = StringExpression.nullConvert(egovMap.get("email"));
            this.indvdlEmail = StringExpression.nullConvert(egovMap.get("indvdlEmail"));
            this.brthdy = StringExpression.nullConvert(egovMap.get("brthdy"));
            this.slrcldAt = StringExpression.nullConvert(egovMap.get("slrcldAt"));
            this.mrrgAt = StringExpression.nullConvert(egovMap.get("mrrgAt"));
            this.retireDe = StringExpression.nullConvert(egovMap.get("retireDe"));
            this.retireSe = StringExpression.nullConvert(egovMap.get("retireSe"));
            this.layoffSeCode = StringExpression.nullConvert(egovMap.get("layoffSeCode"));
            this.photoAtchmnflNo = StringExpression.nullConvert(egovMap.get("photoAtchmnflNo"));
            this.signAtchmnflNo = StringExpression.nullConvert(egovMap.get("signAtchmnflNo"));
            this.cashierAt = StringExpression.nullConvert(egovMap.get("cashierAt"));
            this.hdadptAt = StringExpression.nullConvert(egovMap.get("hdadptAt"));
            this.hdadptDeptCode = StringExpression.nullConvert(egovMap.get("hdadptDeptCode"));
            this.dispDeptCode = StringExpression.nullConvert(egovMap.get("dispDeptCode"));
            this.dprlrAt = StringExpression.nullConvert(egovMap.get("dprlrAt"));
            this.lbunSbscrbAt = StringExpression.nullConvert(egovMap.get("lbunSbscrbAt"));
            this.mutaidSbscrbAt = StringExpression.nullConvert(egovMap.get("mutaidSbscrbAt"));
            this.dispWorkAt = StringExpression.nullConvert(egovMap.get("dispWorkAt"));
            this.flexbizAt = StringExpression.nullConvert(egovMap.get("flexbizAt"));
            this.babyShrtenWorkAt = StringExpression.nullConvert(egovMap.get("babyShrtenWorkAt"));
            this.salpeakAt = StringExpression.nullConvert(egovMap.get("salpeakAt"));
            this.salaryAprpCode = StringExpression.nullConvert(egovMap.get("salaryAprpCode"));
            this.ansalsysAt = StringExpression.nullConvert(egovMap.get("ansalsysAt"));
            this.apntcSdt = StringExpression.nullConvert(egovMap.get("apntcSdt"));
            this.apntcEdt = StringExpression.nullConvert(egovMap.get("apntcEdt"));
            this.incmtaxrtCode = StringExpression.nullConvert(egovMap.get("incmtaxrtCode"));
            this.salaryPymntAt = StringExpression.nullConvert(egovMap.get("salaryPymntAt"));
            this.retireAnntyKindCode = StringExpression.nullConvert(egovMap.get("retireAnntyKindCode"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.nxttrmPromtDe = StringExpression.nullConvert(egovMap.get("nxttrmPromtDe"));
            this.retireAnntySbscrbDe = StringExpression.nullConvert(egovMap.get("retireAnntySbscrbDe"));
            this.retireAnntyDpstnm = StringExpression.nullConvert(egovMap.get("retireAnntyDpstnm"));
            this.retireAnntyBankCode = StringExpression.nullConvert(egovMap.get("retireAnntyBankCode"));
            this.retireAnntyAcnutno = StringExpression.nullConvert(egovMap.get("retireAnntyAcnutno"));
            this.layoffAltHnfAt = StringExpression.nullConvert(egovMap.get("layoffAltHnfAt"));
            this.nonTmlmtCntrctChangeDe = StringExpression.nullConvert(egovMap.get("nonTmlmtCntrctChangeDe"));
            this.curClsfEmplmnday = StringExpression.nullConvert(egovMap.get("curClsfEmplmnday"));
            this.seniorSe = StringExpression.nullConvert(egovMap.get("seniorSe"));
            this.retireAnntyDcSbscrbDe = StringExpression.nullConvert(egovMap.get("retireAnntyDcSbscrbDe"));
            this.lastPromtDe = StringExpression.nullConvert(egovMap.get("lastPromtDe"));
            this.nonTmlmtCnttkChangeDe = StringExpression.nullConvert(egovMap.get("nonTmlmtCnttkChangeDe"));
        }
    }

    public Pubusr001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.korNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_korNm")));
            this.engNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_engNm")));
            this.chcrtNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chcrtNm")));
            this.emplSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_emplSe")));
            this.ecnySeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ecnySeCode")));
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode")));
            this.hffsSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hffsSe")));
            this.ecnyDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ecnyDe")));
            this.ihidnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ihidnum")));
            this.sexdstnSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sexdstnSe")));
            this.natvfrgnSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_natvfrgnSeCode")));
            this.nltyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nltyCode")));
            this.srclsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_srclsCode")));
            this.clsfCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfCode")));
            this.ofcpsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ofcpsCode")));
            this.jssfcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jssfcCode")));
            this.dtyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dtyCode")));
            this.rspofcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rspofcCode")));
            this.jblnCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jblnCode")));
            this.zip = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_zip")));
            this.ownhomAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ownhomAdres")));
            this.ownhomDetailAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ownhomDetailAdres")));
            this.ownhomEngAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ownhomEngAdres")));
            this.ownhomTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ownhomTelno")));
            this.lxtnTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lxtnTelno")));
            this.mbtlnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mbtlnum")));
            this.emgncTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_emgncTelno")));
            this.email = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_email")));
            this.indvdlEmail = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdlEmail")));
            this.brthdy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_brthdy")));
            this.slrcldAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_slrcldAt")));
            this.mrrgAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mrrgAt")));
            this.retireDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retireDe")));
            this.retireSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retireSe")));
            this.layoffSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffSeCode")));
            this.photoAtchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_photoAtchmnflNo")));
            this.signAtchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_signAtchmnflNo")));
            this.cashierAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cashierAt")));
            this.hdadptAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hdadptAt")));
            this.hdadptDeptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hdadptDeptCode")));
            this.dispDeptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dispDeptCode")));
            this.dprlrAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dprlrAt")));
            this.lbunSbscrbAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lbunSbscrbAt")));
            this.mutaidSbscrbAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mutaidSbscrbAt")));
            this.dispWorkAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dispWorkAt")));
            this.flexbizAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_flexbizAt")));
            this.babyShrtenWorkAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_babyShrtenWorkAt")));
            this.salpeakAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salpeakAt")));
            this.salaryAprpCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryAprpCode")));
            this.ansalsysAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ansalsysAt")));
            this.apntcSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_apntcSdt")));
            this.apntcEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_apntcEdt")));
            this.incmtaxrtCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_incmtaxrtCode")));
            this.salaryPymntAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_salaryPymntAt")));
            this.retireAnntyKindCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retireAnntyKindCode")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nxttrmPromtDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nxttrmPromtDe")));
            this.retireAnntySbscrbDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retireAnntySbscrbDe")));
            this.retireAnntyDpstnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retireAnntyDpstnm")));
            this.retireAnntyBankCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retireAnntyBankCode")));
            this.retireAnntyAcnutno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retireAnntyAcnutno")));
            this.layoffAltHnfAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_layoffAltHnfAt")));
            this.nonTmlmtCntrctChangeDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nonTmlmtCntrctChangeDe")));
            this.curClsfEmplmnday = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_curClsfEmplmnday")));
            this.seniorSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_seniorSe")));
            this.retireAnntyDcSbscrbDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_retireAnntyDcSbscrbDe")));
            this.lastPromtDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lastPromtDe")));
            this.nonTmlmtCnttkChangeDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nonTmlmtCnttkChangeDe")));
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

    public String getKorNm() {
        return korNm;
    }
    public void setKorNm(String korNm) {
        this.korNm = korNm;
    }

    public String getEngNm() {
        return engNm;
    }
    public void setEngNm(String engNm) {
        this.engNm = engNm;
    }

    public String getChcrtNm() {
        return chcrtNm;
    }
    public void setChcrtNm(String chcrtNm) {
        this.chcrtNm = chcrtNm;
    }

    public String getEmplSe() {
        return emplSe;
    }
    public void setEmplSe(String emplSe) {
        this.emplSe = emplSe;
    }

    public String getEcnySeCode() {
        return ecnySeCode;
    }
    public void setEcnySeCode(String ecnySeCode) {
        this.ecnySeCode = ecnySeCode;
    }

    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getHffsSe() {
        return hffsSe;
    }
    public void setHffsSe(String hffsSe) {
        this.hffsSe = hffsSe;
    }

    public String getEcnyDe() {
        return ecnyDe;
    }
    public void setEcnyDe(String ecnyDe) {
        this.ecnyDe = ecnyDe;
    }

    public String getIhidnum() {
        return ihidnum;
    }
    public void setIhidnum(String ihidnum) {
        this.ihidnum = ihidnum;
    }

    public String getSexdstnSe() {
        return sexdstnSe;
    }
    public void setSexdstnSe(String sexdstnSe) {
        this.sexdstnSe = sexdstnSe;
    }

    public String getNatvfrgnSeCode() {
        return natvfrgnSeCode;
    }
    public void setNatvfrgnSeCode(String natvfrgnSeCode) {
        this.natvfrgnSeCode = natvfrgnSeCode;
    }

    public String getNltyCode() {
        return nltyCode;
    }
    public void setNltyCode(String nltyCode) {
        this.nltyCode = nltyCode;
    }

    public String getSrclsCode() {
        return srclsCode;
    }
    public void setSrclsCode(String srclsCode) {
        this.srclsCode = srclsCode;
    }

    public String getClsfCode() {
        return clsfCode;
    }
    public void setClsfCode(String clsfCode) {
        this.clsfCode = clsfCode;
    }

    public String getOfcpsCode() {
        return ofcpsCode;
    }
    public void setOfcpsCode(String ofcpsCode) {
        this.ofcpsCode = ofcpsCode;
    }

    public String getJssfcCode() {
        return jssfcCode;
    }
    public void setJssfcCode(String jssfcCode) {
        this.jssfcCode = jssfcCode;
    }

    public String getDtyCode() {
        return dtyCode;
    }
    public void setDtyCode(String dtyCode) {
        this.dtyCode = dtyCode;
    }

    public String getRspofcCode() {
        return rspofcCode;
    }
    public void setRspofcCode(String rspofcCode) {
        this.rspofcCode = rspofcCode;
    }

    public String getJblnCode() {
        return jblnCode;
    }
    public void setJblnCode(String jblnCode) {
        this.jblnCode = jblnCode;
    }

    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getOwnhomAdres() {
        return ownhomAdres;
    }
    public void setOwnhomAdres(String ownhomAdres) {
        this.ownhomAdres = ownhomAdres;
    }

    public String getOwnhomDetailAdres() {
        return ownhomDetailAdres;
    }
    public void setOwnhomDetailAdres(String ownhomDetailAdres) {
        this.ownhomDetailAdres = ownhomDetailAdres;
    }

    public String getOwnhomEngAdres() {
        return ownhomEngAdres;
    }
    public void setOwnhomEngAdres(String ownhomEngAdres) {
        this.ownhomEngAdres = ownhomEngAdres;
    }

    public String getOwnhomTelno() {
        return ownhomTelno;
    }
    public void setOwnhomTelno(String ownhomTelno) {
        this.ownhomTelno = ownhomTelno;
    }

    public String getLxtnTelno() {
        return lxtnTelno;
    }
    public void setLxtnTelno(String lxtnTelno) {
        this.lxtnTelno = lxtnTelno;
    }

    public String getMbtlnum() {
        return mbtlnum;
    }
    public void setMbtlnum(String mbtlnum) {
        this.mbtlnum = mbtlnum;
    }

    public String getEmgncTelno() {
        return emgncTelno;
    }
    public void setEmgncTelno(String emgncTelno) {
        this.emgncTelno = emgncTelno;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getIndvdlEmail() {
        return indvdlEmail;
    }
    public void setIndvdlEmail(String indvdlEmail) {
        this.indvdlEmail = indvdlEmail;
    }

    public String getBrthdy() {
        return brthdy;
    }
    public void setBrthdy(String brthdy) {
        this.brthdy = brthdy;
    }

    public String getSlrcldAt() {
        return slrcldAt;
    }
    public void setSlrcldAt(String slrcldAt) {
        this.slrcldAt = slrcldAt;
    }

    public String getMrrgAt() {
        return mrrgAt;
    }
    public void setMrrgAt(String mrrgAt) {
        this.mrrgAt = mrrgAt;
    }

    public String getRetireDe() {
        return retireDe;
    }
    public void setRetireDe(String retireDe) {
        this.retireDe = retireDe;
    }

    public String getRetireSe() {
        return retireSe;
    }
    public void setRetireSe(String retireSe) {
        this.retireSe = retireSe;
    }

    public String getLayoffSeCode() {
        return layoffSeCode;
    }
    public void setLayoffSeCode(String layoffSeCode) {
        this.layoffSeCode = layoffSeCode;
    }

    public String getPhotoAtchmnflNo() {
        return photoAtchmnflNo;
    }
    public void setPhotoAtchmnflNo(String photoAtchmnflNo) {
        this.photoAtchmnflNo = photoAtchmnflNo;
    }

    public String getSignAtchmnflNo() {
        return signAtchmnflNo;
    }
    public void setSignAtchmnflNo(String signAtchmnflNo) {
        this.signAtchmnflNo = signAtchmnflNo;
    }

    public String getCashierAt() {
        return cashierAt;
    }
    public void setCashierAt(String cashierAt) {
        this.cashierAt = cashierAt;
    }

    public String getHdadptAt() {
        return hdadptAt;
    }
    public void setHdadptAt(String hdadptAt) {
        this.hdadptAt = hdadptAt;
    }

    public String getHdadptDeptCode() {
        return hdadptDeptCode;
    }
    public void setHdadptDeptCode(String hdadptDeptCode) {
        this.hdadptDeptCode = hdadptDeptCode;
    }

    public String getDispDeptCode() {
        return dispDeptCode;
    }
    public void setDispDeptCode(String dispDeptCode) {
        this.dispDeptCode = dispDeptCode;
    }

    public String getDprlrAt() {
        return dprlrAt;
    }
    public void setDprlrAt(String dprlrAt) {
        this.dprlrAt = dprlrAt;
    }

    public String getLbunSbscrbAt() {
        return lbunSbscrbAt;
    }
    public void setLbunSbscrbAt(String lbunSbscrbAt) {
        this.lbunSbscrbAt = lbunSbscrbAt;
    }

    public String getMutaidSbscrbAt() {
        return mutaidSbscrbAt;
    }
    public void setMutaidSbscrbAt(String mutaidSbscrbAt) {
        this.mutaidSbscrbAt = mutaidSbscrbAt;
    }

    public String getDispWorkAt() {
        return dispWorkAt;
    }
    public void setDispWorkAt(String dispWorkAt) {
        this.dispWorkAt = dispWorkAt;
    }

    public String getFlexbizAt() {
        return flexbizAt;
    }
    public void setFlexbizAt(String flexbizAt) {
        this.flexbizAt = flexbizAt;
    }

    public String getBabyShrtenWorkAt() {
        return babyShrtenWorkAt;
    }
    public void setBabyShrtenWorkAt(String babyShrtenWorkAt) {
        this.babyShrtenWorkAt = babyShrtenWorkAt;
    }

    public String getSalpeakAt() {
        return salpeakAt;
    }
    public void setSalpeakAt(String salpeakAt) {
        this.salpeakAt = salpeakAt;
    }

    public String getSalaryAprpCode() {
        return salaryAprpCode;
    }
    public void setSalaryAprpCode(String salaryAprpCode) {
        this.salaryAprpCode = salaryAprpCode;
    }

    public String getAnsalsysAt() {
        return ansalsysAt;
    }
    public void setAnsalsysAt(String ansalsysAt) {
        this.ansalsysAt = ansalsysAt;
    }

    public String getApntcSdt() {
        return apntcSdt;
    }
    public void setApntcSdt(String apntcSdt) {
        this.apntcSdt = apntcSdt;
    }

    public String getApntcEdt() {
        return apntcEdt;
    }
    public void setApntcEdt(String apntcEdt) {
        this.apntcEdt = apntcEdt;
    }

    public String getIncmtaxrtCode() {
        return incmtaxrtCode;
    }
    public void setIncmtaxrtCode(String incmtaxrtCode) {
        this.incmtaxrtCode = incmtaxrtCode;
    }

    public String getSalaryPymntAt() {
        return salaryPymntAt;
    }
    public void setSalaryPymntAt(String salaryPymntAt) {
        this.salaryPymntAt = salaryPymntAt;
    }

    public String getRetireAnntyKindCode() {
        return retireAnntyKindCode;
    }
    public void setRetireAnntyKindCode(String retireAnntyKindCode) {
        this.retireAnntyKindCode = retireAnntyKindCode;
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

    public String getNxttrmPromtDe() {
        return nxttrmPromtDe;
    }
    public void setNxttrmPromtDe(String nxttrmPromtDe) {
        this.nxttrmPromtDe = nxttrmPromtDe;
    }

    public String getRetireAnntySbscrbDe() {
        return retireAnntySbscrbDe;
    }
    public void setRetireAnntySbscrbDe(String retireAnntySbscrbDe) {
        this.retireAnntySbscrbDe = retireAnntySbscrbDe;
    }

    public String getRetireAnntyDpstnm() {
        return retireAnntyDpstnm;
    }
    public void setRetireAnntyDpstnm(String retireAnntyDpstnm) {
        this.retireAnntyDpstnm = retireAnntyDpstnm;
    }

    public String getRetireAnntyBankCode() {
        return retireAnntyBankCode;
    }
    public void setRetireAnntyBankCode(String retireAnntyBankCode) {
        this.retireAnntyBankCode = retireAnntyBankCode;
    }

    public String getRetireAnntyAcnutno() {
        return retireAnntyAcnutno;
    }
    public void setRetireAnntyAcnutno(String retireAnntyAcnutno) {
        this.retireAnntyAcnutno = retireAnntyAcnutno;
    }

    public String getLayoffAltHnfAt() {
        return layoffAltHnfAt;
    }
    public void setLayoffAltHnfAt(String layoffAltHnfAt) {
        this.layoffAltHnfAt = layoffAltHnfAt;
    }

    public String getNonTmlmtCntrctChangeDe() {
        return nonTmlmtCntrctChangeDe;
    }
    public void setNonTmlmtCntrctChangeDe(String nonTmlmtCntrctChangeDe) {
        this.nonTmlmtCntrctChangeDe = nonTmlmtCntrctChangeDe;
    }

    public String getCurClsfEmplmnday() {
        return curClsfEmplmnday;
    }
    public void setCurClsfEmplmnday(String curClsfEmplmnday) {
        this.curClsfEmplmnday = curClsfEmplmnday;
    }

    public String getSeniorSe() {
        return seniorSe;
    }
    public void setSeniorSe(String seniorSe) {
        this.seniorSe = seniorSe;
    }

    public String getRetireAnntyDcSbscrbDe() {
        return retireAnntyDcSbscrbDe;
    }
    public void setRetireAnntyDcSbscrbDe(String retireAnntyDcSbscrbDe) {
        this.retireAnntyDcSbscrbDe = retireAnntyDcSbscrbDe;
    }

    public String getLastPromtDe() {
        return lastPromtDe;
    }
    public void setLastPromtDe(String lastPromtDe) {
        this.lastPromtDe = lastPromtDe;
    }

    public String getNonTmlmtCnttkChangeDe() {
        return nonTmlmtCnttkChangeDe;
    }
    public void setNonTmlmtCnttkChangeDe(String nonTmlmtCnttkChangeDe) {
        this.nonTmlmtCnttkChangeDe = nonTmlmtCnttkChangeDe;
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
