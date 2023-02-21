package kr.co.dbvision.api.mhs.hrb.mhshrb001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 인사기본에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.05.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.22          디비비전              최초 생성
 *
 * </pre>
 */

public class Mhshrb001 extends CommonVO {

	/* 번호 */
    private int num;
    /* 사원번호 */
    private String empno;
    /* 원 사원번호 */
    private String olEmpno;
    /* 한글 명 */
    private String korNm;
    /* 영문 명 */
    private String engNm;
    /* 부서 코드 */
    private String deptCode;
    /* 부서 명 */
    private String deptCodeNm;
    /* 한자 명 */
    private String chcrtNm;
    /* 입사 일자 */
    private String ecnyDe;
    /* 퇴직 일자 */
    private String retireDe;
    /* 주민등록번호 */
    private String ihidnum;
    /* 국적 코드 */
    private String nltyCode;
    /* 국적 코드 명 */
    private String nltyCodeNm;
    /* 직종 코드 */
    private String jssfcCode;
    /* 직종 코드 명 */
    private String jssfcCodeNm;
    /* 호봉 코드 */
    private String srclsCode;
    /* 직급 코드 */
    private String clsfCode;
    /* 직급 코드 명 */
    private String clsfCodeNm;
    /* 직위 코드 */
    private String ofcpsCode;
    /* 직위 코드 명 */
    private String ofcpsCodeNm;
    /* 직무 코드 */
    private String dtyCode;
    /* 직무 코드 명 */
    private String dtyCodeNm;
    /* 직책 코드 */
    private String rspofcCode;
    /* 직책 코드 명 */
    private String rspofcCodeNm;
    
	/* 우편번호 */
    private String zip;
    /* 자택 주소 */
    private String ownhomAdres;
    /* 자택 상세 주소 */
    private String ownhomDetailAdres;
    /* 자택 영문 주소 */
    private String ownhomEngAdres;
    /* 자택 전화번호 */
    private String ownhomTelno;
    /* 내선 전화번호 */
    private String lxtnTelno;
    /* 휴대폰번호 */
    private String mbtlnum;
    /* 비상전화번호 */
    private String emgncTelno;
    /* 이메일 */
    private String email;
    /* 개인 이메일 */
    private String indvdlEmail;
    /* 생년월일 */
    private String brthdy;
    /* 양력 여부 */
    private String slrcldAt;
    /* 결혼 여부 */
    private String mrrgAt;
    /* 결혼 여부 명 */
    private String mrrgAtNm;
    
    /* 상위 부서 코드 */
    private String upperDeptCode;
    /* 상위 부서 명 */
    private String upperDeptCodeNm;
    /* 겸임 부서 코드 */
    private String hdadptDeptCode;
    /* 겸임 부서 명 */
    private String hdadptDeptCodeNm;
    /* 파견 부서 코드 */
    private String dispDeptCode;
    /* 파견 부서 명 */
    private String dispDeptCodeNm;
    
    /* 사원 구분 */
    private String emplSe;
    /* 사원 구분 명 */
    private String emplSeNm;
    /* 재직 구분 */
    private String hffsSe;
    /* 재직 구분 명 */
    private String hffsSeNm;
    /* 퇴직 구분 */
    private String retireSe;
    /* 퇴직 구분 명 */
    private String retireSeNm;
    /* 성별 구분 */
    private String sexdstnSe;
    /* 성별 구분 명 */
    private String sexdstnSeNm;
    /* 채용 구분 - 삭제 */
    private String empnmSe;
    /* 채용 구분 명 - 삭제 */
    private String empnmSeNm;

    /* 등록일 */
    private String regDt;
    /* 등록자 */
    private String regId;
    /* 수정일 */
    private String uptDt;
    /* 수정자 */
    private String uptId;
    /* 등록자 명 */
    private String regNm;
    /* 수정자 명 */
    private String uptNm;

    /* 사진파일경로번호 */
    private String photoAtchmnflNo;
    /* 싸인파일경로번호 */
    private String signAtchmnflNo;
    /* 출납담당 여부 */
    private String cashierAt;
    /* 겸임 여부 */
    private String hdadptAt;
    /* 부서장 여부 */
    private String dprlrAt;
    /* 노조 가입 여부 */
    private String lbunSbscrbAt;
    /* 노조 가입 여부 명 */
    private String lbunSbscrbAtNm;
    /* 상조 가입 여부 */
    private String mutaidSbscrbAt;
    /* 파견 근무 여부 */
    private String dispWorkbAt;
    /* 내외국인 구분 코드 */
    private String natvfrgnSeCode;
    /* 내외국인 구분 코드 명 */
    private String natvfrgnSeCodeNm;
    /* 입사 구분 코드 */
    private String ecnySeCode;
    /* 입사 구분 코드 명 */
    private String ecnySeCodeNm;
    /* 사업장코드 */
    private String bplcCode;
    /* 사업장코드 명 */
    private String bplcCodeNm;
    /* 임금피크제 여부 */
    private String salpeakAt;
    /* 유연근무제 여부 */
    private String flexbizAt;
    /* 연봉제 여부 */
    private String ansalsysAt;
    /* 육아 단축 근무 여부 */
    private String babyShrtenWorkAt;
    /* 급여 책정 코드 */
    private String salaryAprpCode;
    /* 급여 책정 코드 명 */
    private String salaryAprpCodeNm;
    
    /* 결혼 일자 */
    private String mrrgDe;
    /* 직렬 코드 */
    private String jblnCode;
    /* 직렬 코드 명 */
    private String jblnCodeNm;
    /* 수습 시작일자 */
    private String apntcSdt;
    /* 수습 종료일자 */
    private String apntcEdt;
    /* 소득세율 코드 */
    private String incmtaxrtCode;
    /* 소득세율 코드 명 */
    private String incmtaxrtCodeNm;
    
    /*최종학력*/
    private String lastAcdncrCode;
    /*최종학교*/
    private String lastSchulNm;
    /*최종승급일*/
    private String lastPromtDe;
    /*최종승호일*/
    private String lastSalclsupDe;
    /*휴직구분*/
    private String layoffSeCode;
    /* 본적 우편번호 */
    private String bornZip;
    /* 본적 주소 */
    private String bornAdres;
    /* 본적 상세 주소 */
    private String bornDetailadres;
    /* 급여지급 */
    private String salaryPymntAt;
    /* 퇴직금중간정산일자 */
    private String retireExcclcDe;
    /* 퇴직연금 */
    private String retireAnntyKindCode;
    /* 현직급 임명일 */
    private String curClsfEmplmnday;

    private int colspan;
    private int rowspan;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrb001() {
        //
    }

    public Mhshrb001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
        	if(egovMap.get("num") != null) {
            	this.num = (int) egovMap.get("num");
            }
            else {
            	this.num = 1;
            }
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.olEmpno = StringExpression.nullConvert(egovMap.get("olEmpno"));
            this.korNm = StringExpression.nullConvert(egovMap.get("korNm"));
            this.engNm = StringExpression.nullConvert(egovMap.get("engNm"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.deptCodeNm = StringExpression.nullConvert(egovMap.get("deptCodeNm"));
            this.chcrtNm = StringExpression.nullConvert(egovMap.get("chcrtNm"));
            this.ecnyDe = StringExpression.nullConvert(egovMap.get("ecnyDe"));
            this.retireDe = StringExpression.nullConvert(egovMap.get("retireDe"));
            this.ihidnum = StringExpression.nullConvert(egovMap.get("ihidnum"));
            this.nltyCode = StringExpression.nullConvert(egovMap.get("nltyCode"));
            this.nltyCodeNm = StringExpression.nullConvert(egovMap.get("nltyCodeNm"));
            this.jssfcCode = StringExpression.nullConvert(egovMap.get("jssfcCode"));
            this.jssfcCodeNm = StringExpression.nullConvert(egovMap.get("jssfcCodeNm"));
            this.srclsCode = StringExpression.nullConvert(egovMap.get("srclsCode"));
            this.clsfCode = StringExpression.nullConvert(egovMap.get("clsfCode"));
            this.clsfCodeNm = StringExpression.nullConvert(egovMap.get("clsfCodeNm"));
            this.ofcpsCode = StringExpression.nullConvert(egovMap.get("ofcpsCode"));
            this.ofcpsCodeNm = StringExpression.nullConvert(egovMap.get("ofcpsCodeNm"));
            this.dtyCode = StringExpression.nullConvert(egovMap.get("dtyCode"));
            this.dtyCodeNm = StringExpression.nullConvert(egovMap.get("dtyCodeNm"));
            this.rspofcCode = StringExpression.nullConvert(egovMap.get("rspofcCode"));
            this.rspofcCodeNm = StringExpression.nullConvert(egovMap.get("rspofcCodeNm"));

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
            this.mrrgAtNm = StringExpression.nullConvert(egovMap.get("mrrgAtNm"));
            this.hdadptDeptCode = StringExpression.nullConvert(egovMap.get("hdadptDeptCode"));
            this.hdadptDeptCodeNm = StringExpression.nullConvert(egovMap.get("hdadptDeptCodeNm"));
            this.dispDeptCode = StringExpression.nullConvert(egovMap.get("dispDeptCode"));
            this.dispDeptCodeNm = StringExpression.nullConvert(egovMap.get("dispDeptCodeNm"));
            this.upperDeptCode = StringExpression.nullConvert(egovMap.get("upperDeptCode"));
            this.upperDeptCodeNm = StringExpression.nullConvert(egovMap.get("upperDeptCodeNm"));
            
            this.emplSe = StringExpression.nullConvert(egovMap.get("emplSe"));
            this.emplSeNm = StringExpression.nullConvert(egovMap.get("emplSeNm"));
            this.hffsSe = StringExpression.nullConvert(egovMap.get("hffsSe"));
            this.hffsSeNm = StringExpression.nullConvert(egovMap.get("hffsSeNm"));
            this.retireSe = StringExpression.nullConvert(egovMap.get("retireSe"));
            this.retireSeNm = StringExpression.nullConvert(egovMap.get("retireSeNm"));
            this.sexdstnSe = StringExpression.nullConvert(egovMap.get("sexdstnSe"));
            this.sexdstnSeNm = StringExpression.nullConvert(egovMap.get("sexdstnSeNm"));
            this.empnmSe = StringExpression.nullConvert(egovMap.get("empnmSe"));
            this.empnmSeNm = StringExpression.nullConvert(egovMap.get("empnmSeNm"));
            
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.regNm = StringExpression.nullConvert(egovMap.get("regNm"));
            this.uptNm = StringExpression.nullConvert(egovMap.get("uptNm"));

            this.photoAtchmnflNo = StringExpression.nullConvert(egovMap.get("photoAtchmnflNo"));
            this.signAtchmnflNo = StringExpression.nullConvert(egovMap.get("signAtchmnflNo"));
            this.cashierAt = StringExpression.nullConvert(egovMap.get("cashierAt"));
            this.hdadptAt = StringExpression.nullConvert(egovMap.get("hdadptAt"));
            this.dprlrAt = StringExpression.nullConvert(egovMap.get("dprlrAt"));
            this.lbunSbscrbAt = StringExpression.nullConvert(egovMap.get("lbunSbscrbAt"));
            this.lbunSbscrbAtNm = StringExpression.nullConvert(egovMap.get("lbunSbscrbAtNm"));
            this.mutaidSbscrbAt = StringExpression.nullConvert(egovMap.get("mutaidSbscrbAt"));
            this.dispWorkbAt = StringExpression.nullConvert(egovMap.get("dispWorkbAt"));
            this.natvfrgnSeCode = StringExpression.nullConvert(egovMap.get("natvfrgnSeCode"));
            this.natvfrgnSeCodeNm = StringExpression.nullConvert(egovMap.get("natvfrgnSeCodeNm"));
            this.ecnySeCode = StringExpression.nullConvert(egovMap.get("ecnySeCode"));
            this.ecnySeCodeNm = StringExpression.nullConvert(egovMap.get("ecnySeCodeNm"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.bplcCodeNm = StringExpression.nullConvert(egovMap.get("bplcCodeNm"));
            this.salpeakAt = StringExpression.nullConvert(egovMap.get("salpeakAt"));
            this.flexbizAt = StringExpression.nullConvert(egovMap.get("flexbizAt"));
            this.ansalsysAt = StringExpression.nullConvert(egovMap.get("ansalsysAt"));
            this.babyShrtenWorkAt = StringExpression.nullConvert(egovMap.get("babyShrtenWorkAt"));
            this.salaryAprpCode = StringExpression.nullConvert(egovMap.get("salaryAprpCode"));
            this.salaryAprpCodeNm = StringExpression.nullConvert(egovMap.get("salaryAprpCodeNm"));
            
            this.mrrgDe = StringExpression.nullConvert(egovMap.get("mrrgDe"));
            this.jblnCode = StringExpression.nullConvert(egovMap.get("jblnCode"));
            this.jblnCodeNm = StringExpression.nullConvert(egovMap.get("jblnCodeNm"));
            this.apntcSdt = StringExpression.nullConvert(egovMap.get("apntcSdt"));
            this.apntcEdt = StringExpression.nullConvert(egovMap.get("apntcEdt"));
            this.incmtaxrtCode = StringExpression.nullConvert(egovMap.get("incmtaxrtCode"));
            this.incmtaxrtCodeNm = StringExpression.nullConvert(egovMap.get("incmtaxrtCodeNm"));
            
            this.lastAcdncrCode = StringExpression.nullConvert(egovMap.get("lastAcdncrCode"));
            this.lastSchulNm = StringExpression.nullConvert(egovMap.get("lastSchulNm"));
            this.lastPromtDe = StringExpression.nullConvert(egovMap.get("lastPromtDe"));
            this.lastSalclsupDe = StringExpression.nullConvert(egovMap.get("lastSalclsupDe"));
            this.layoffSeCode = StringExpression.nullConvert(egovMap.get("layoffSeCode"));
            this.bornZip = StringExpression.nullConvert(egovMap.get("bornZip"));
            this.bornAdres = StringExpression.nullConvert(egovMap.get("bornAdres"));
            this.bornDetailadres = StringExpression.nullConvert(egovMap.get("bornDetailadres"));
            this.salaryPymntAt = StringExpression.nullConvert(egovMap.get("salaryPymntAt"));
            this.retireExcclcDe = StringExpression.nullConvert(egovMap.get("retireExcclcDe"));
            this.retireAnntyKindCode = StringExpression.nullConvert(egovMap.get("retireAnntyKindCode"));
            this.curClsfEmplmnday = StringExpression.nullConvert(egovMap.get("curClsfEmplmnday"));
            
            if(egovMap.get("colspan") != null) {
            	this.colspan = (int) egovMap.get("colspan");
            }
            else {
            	this.colspan = 0;
            }            
            if(egovMap.get("rowspan") != null) {
            	this.rowspan = (int) egovMap.get("rowspan");
            }
            else {
            	this.rowspan = 0;
            }
        }
    }

    public int getNum() {
        return num;
    }
    public void setNum(int num) {
        this.num = num;
    }
    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }
    public String getOlEmpno() {
        return olEmpno;
    }
    public void setOlEmpno(String olEmpno) {
        this.olEmpno = olEmpno;
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

    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getDeptCodeNm() {
		return deptCodeNm;
	}
	public void setDeptCodeNm(String deptCodeNm) {
		this.deptCodeNm = deptCodeNm;
	}  
    
    public String getChcrtNm() {
        return chcrtNm;
    }
    public void setChcrtNm(String chcrtNm) {
        this.chcrtNm = chcrtNm;
    }

    public String getEcnyDe() {
        return ecnyDe;
    }
    public void setEcnyDe(String ecnyDe) {
        this.ecnyDe = ecnyDe;
    }

    public String getRetireDe() {
        return retireDe;
    }
    public void setRetireDe(String retireDe) {
        this.retireDe = retireDe;
    }

    public String getIhidnum() {
        return ihidnum;
    }
    public void setIhidnum(String ihidnum) {
        this.ihidnum = ihidnum;
    }

    public String getNltyCode() {
        return nltyCode;
    }
    public void setNltyCode(String nltyCode) {
        this.nltyCode = nltyCode;
    }

    public String getNltyCodeNm() {
        return nltyCodeNm;
    }
    public void setNltyCodeNm(String nltyCodeNm) {
        this.nltyCodeNm = nltyCodeNm;
    }

    public String getJssfcCode() {
        return jssfcCode;
    }
    public void setJssfcCode(String jssfcCode) {
        this.jssfcCode = jssfcCode;
    }

    public String getJssfcCodeNm() {
        return jssfcCodeNm;
    }
    public void setJssfcCodeNm(String jssfcCodeNm) {
        this.jssfcCodeNm = jssfcCodeNm;
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

    public String getClsfCodeNm() {
        return clsfCodeNm;
    }
    public void setClsfCodeNm(String clsfCodeNm) {
        this.clsfCodeNm = clsfCodeNm;
    }

    public String getOfcpsCode() {
        return ofcpsCode;
    }
    public void setOfcpsCode(String ofcpsCode) {
        this.ofcpsCode = ofcpsCode;
    }

    public String getOfcpsCodeNm() {
        return ofcpsCodeNm;
    }
    public void setOfcpsCodeNm(String ofcpsCodeNm) {
        this.ofcpsCodeNm = ofcpsCodeNm;
    }

    public String getDtyCode() {
        return dtyCode;
    }
    public void setDtyCode(String dtyCode) {
        this.dtyCode = dtyCode;
    }
    public String getDtyCodeNm() {
        return dtyCodeNm;
    }
    public void setDtyCodeNm(String dtyCodeNm) {
        this.dtyCodeNm = dtyCodeNm;
    }

    public String getRspofcCode() {
        return rspofcCode;
    }
    public void setRspofcCode(String rspofcCode) {
        this.rspofcCode = rspofcCode;
    }

    public String getRspofcCodeNm() {
        return rspofcCodeNm;
    }
    public void setRspofcCodeNm(String rspofcCodeNm) {
        this.rspofcCodeNm = rspofcCodeNm;
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

    public String getMrrgAtNm() {
        return mrrgAtNm;
    }
    public void setMrrgAtNm(String mrrgAtNm) {
        this.mrrgAtNm = mrrgAtNm;
    }

    public String getHdadptDeptCode() {
        return hdadptDeptCode;
    }
    public void setHdadptDeptCode(String hdadptDeptCode) {
        this.hdadptDeptCode = hdadptDeptCode;
    }
    public String getHdadptDeptCodeNm() {
        return hdadptDeptCodeNm;
    }
    public void setHdadptDeptCodeNm(String hdadptDeptCodeNm) {
        this.hdadptDeptCodeNm = hdadptDeptCodeNm;
    }

    public String getDispDeptCode() {
        return dispDeptCode;
    }
    public void setDispDeptCode(String dispDeptCode) {
        this.dispDeptCode = dispDeptCode;
    }
    public String getDispDeptCodeNm() {
        return dispDeptCodeNm;
    }
    public void setDispDeptCodeNm(String dispDeptCodeNm) {
        this.dispDeptCodeNm = dispDeptCodeNm;
    }

    public String getUpperDeptCode() {
        return upperDeptCode;
    }
    public void setUpperDeptCode(String upperDeptCode) {
        this.upperDeptCode = upperDeptCode;
    }
    public String getUpperDeptCodeNm() {
        return upperDeptCodeNm;
    }
    public void setUpperDeptCodeNm(String upperDeptCodeNm) {
        this.upperDeptCodeNm = upperDeptCodeNm;
    }
    
    public String getEmplSe() {
        return emplSe;
    }
    public void setEmplSe(String emplSe) {
        this.emplSe = emplSe;
    }
    public String getEmplSeNm() {
        return emplSeNm;
    }
    public void setEmplSeNm(String emplSeNm) {
        this.emplSeNm = emplSeNm;
    }

    public String getHffsSe() {
        return hffsSe;
    }
    public void setHffsSe(String hffsSe) {
        this.hffsSe = hffsSe;
    }
    public String getHffsSeNm() {
        return hffsSeNm;
    }
    public void setHffsSeNm(String hffsSeNm) {
        this.hffsSeNm = hffsSeNm;
    }

    public String getRetireSe() {
        return retireSe;
    }
    public void setRetireSe(String retireSe) {
        this.retireSe = retireSe;
    }
    public String getRetireSeNm() {
        return retireSeNm;
    }
    public void setRetireSeNm(String retireSeNm) {
        this.retireSeNm = retireSeNm;
    }

    public String getSexdstnSe() {
        return sexdstnSe;
    }
    public void setSexdstnSe(String sexdstnSe) {
        this.sexdstnSe = sexdstnSe;
    }
    public String getSexdstnSeNm() {
        return sexdstnSeNm;
    }
    public void setSexdstnSeNm(String sexdstnSeNm) {
        this.sexdstnSeNm = sexdstnSeNm;
    }

    public String getEmpnmSe() {
        return empnmSe;
    }
    public void setEmpnmSe(String empnmSe) {
        this.empnmSe = empnmSe;
    }
    public String getEmpnmSeNm() {
        return empnmSeNm;
    }
    public void setEmpnmSeNm(String empnmSeNm) {
        this.empnmSeNm = empnmSeNm;
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
	public String getRegNm() {
		return regNm;
	}
	public void setRegNm(String regNm) {
		this.regNm = regNm;
	}
	public String getUptNm() {
		return uptNm;
	}
	public void setUptNm(String uptNm) {
		this.uptNm = uptNm;
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
	public String getLbunSbscrbAtNm() {
		return lbunSbscrbAtNm;
	}
	public void setLbunSbscrbAtNm(String lbunSbscrbAtNm) {
		this.lbunSbscrbAtNm = lbunSbscrbAtNm;
	}
	public String getMutaidSbscrbAt() {
		return mutaidSbscrbAt;
	}
	public void setMutaidSbscrbAt(String mutaidSbscrbAt) {
		this.mutaidSbscrbAt = mutaidSbscrbAt;
	}
	public String getDispWorkbAt() {
		return dispWorkbAt;
	}
	public void setDispWorkbAt(String dispWorkbAt) {
		this.dispWorkbAt = dispWorkbAt;
	}
	public String getNatvfrgnSeCode() {
		return natvfrgnSeCode;
	}
	public void setNatvfrgnSeCode(String natvfrgnSeCode) {
		this.natvfrgnSeCode = natvfrgnSeCode;
	}
	public String getNatvfrgnSeCodeNm() {
		return natvfrgnSeCodeNm;
	}
	public void setNatvfrgnSeCodeNm(String natvfrgnSeCodeNm) {
		this.natvfrgnSeCodeNm = natvfrgnSeCodeNm;
	}
	public String getEcnySeCode() {
		return ecnySeCode;
	}
	public void setEcnySeCode(String ecnySeCode) {
		this.ecnySeCode = ecnySeCode;
	}
	public String getEcnySeCodeNm() {
		return ecnySeCodeNm;
	}
	public void setEcnySeCodeNm(String ecnySeCodeNm) {
		this.ecnySeCodeNm = ecnySeCodeNm;
	}
    
	public String getBplcCode() {
		return bplcCode;
	}
	public void setBplcCode(String bplcCode) {
		this.bplcCode = bplcCode;
	}
	public String getBplcCodeNm() {
		return bplcCodeNm;
	}
	public void setBplcCodeNm(String bplcCodeNm) {
		this.bplcCodeNm = bplcCodeNm;
	}
	public String getSalpeakAt() {
		return salpeakAt;
	}
	public void setSalpeakAt(String salpeakAt) {
		this.salpeakAt = salpeakAt;
	}
	public String getFlexbizAt() {
		return flexbizAt;
	}
	public void setFlexbizAt(String flexbizAt) {
		this.flexbizAt = flexbizAt;
	}
	public String getAnsalsysAt() {
		return ansalsysAt;
	}
	public void setAnsalsysAt(String ansalsysAt) {
		this.ansalsysAt = ansalsysAt;
	}

	public String getBabyShrtenWorkAt() {
		return babyShrtenWorkAt;
	}
	public void setBabyShrtenWorkAt(String babyShrtenWorkAt) {
		this.babyShrtenWorkAt = babyShrtenWorkAt;
	}
	
	public String getSalaryAprpCode() {
		return salaryAprpCode;
	}
	public void setSalaryAprpCode(String salaryAprpCode) {
		this.salaryAprpCode = salaryAprpCode;
	}
	public String getSalaryAprpCodeNm() {
		return salaryAprpCodeNm;
	}
	public void setSalaryAprpCodeNm(String salaryAprpCodeNm) {
		this.salaryAprpCodeNm = salaryAprpCodeNm;
	}
	
    public String getMrrgDe() {
        return mrrgDe;
    }
    public void setMrrgDe(String mrrgDe) {
        this.mrrgDe = mrrgDe;
    }

	public String getJblnCode() {
        return jblnCode;
    }
    public void setJblnCode(String jblnCode) {
        this.jblnCode = jblnCode;
    }
	public String getJblnCodeNm() {
        return jblnCodeNm;
    }
    public void setJblnCodeNm(String jblnCodeNm) {
        this.jblnCodeNm = jblnCodeNm;
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
	public String getIncmtaxrtCodeNm() {
        return incmtaxrtCodeNm;
    }
    public void setIncmtaxrtCodeNm(String incmtaxrtCodeNm) {
        this.incmtaxrtCodeNm = incmtaxrtCodeNm;
    }
    

	public String getLastAcdncrCode() {
        return lastAcdncrCode;
    }
    public void setLastAcdncrCode(String lastAcdncrCode) {
        this.lastAcdncrCode = lastAcdncrCode;
    }
    
	public String getLastSchulNm() {
        return lastSchulNm;
    }
    public void setLastSchulNm(String lastSchulNm) {
        this.lastSchulNm = lastSchulNm;
    }
    
	public String getLastPromtDe() {
        return lastPromtDe;
    }
    public void setLastPromtDe(String lastPromtDe) {
        this.lastPromtDe = lastPromtDe;
    }
    
	public String getLastSalclsupDe() {
        return lastSalclsupDe;
    }
    public void setLastSalclsupDe(String lastSalclsupDe) {
        this.lastSalclsupDe = lastSalclsupDe;
    }
    
	public String getLayoffSeCode() {
        return layoffSeCode;
    }
    public void setLayoffSeCode(String layoffSeCode) {
        this.layoffSeCode = layoffSeCode;
    }
    
	public String getBornZip() {
        return bornZip;
    }
    public void setBornZip(String bornZip) {
        this.bornZip = bornZip;
    }
    
	public String getBornAdres() {
        return bornAdres;
    }
    public void setBornAdres(String bornAdres) {
        this.bornAdres = bornAdres;
    }
    
	public String getBornDetailadres() {
        return bornDetailadres;
    }
    public void setBornDetailadres(String bornDetailadres) {
        this.bornDetailadres = bornDetailadres;
    }
    
	public String getSalaryPymntAt() {
        return salaryPymntAt;
    }
    public void setSalaryPymntAt(String salaryPymntAt) {
        this.salaryPymntAt = salaryPymntAt;
    }
    
	public String getRetireExcclcDe() {
        return retireExcclcDe;
    }
    public void setRetireExcclcDe(String retireExcclcDe) {
        this.retireExcclcDe = retireExcclcDe;
    }
    
	public String getRetireAnntyKindCode() {
        return retireAnntyKindCode;
    }
    public void setRetireAnntyKindCode(String retireAnntyKindCode) {
        this.retireAnntyKindCode = retireAnntyKindCode;
    }
    

	public int getColspan() {
        return colspan;
    }
    public void setColspan(int colspan) {
        this.colspan = colspan;
    }

	public int getRowspan() {
        return rowspan;
    }
    public void setRowspan(int rowspan) {
        this.rowspan = rowspan;
    }
    
    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }

	public String getCurClsfEmplmnday() {
		return curClsfEmplmnday;
	}

	public void setCurClsfEmplmnday(String curClsfEmplmnday) {
		this.curClsfEmplmnday = curClsfEmplmnday;
	}
    
    

}
