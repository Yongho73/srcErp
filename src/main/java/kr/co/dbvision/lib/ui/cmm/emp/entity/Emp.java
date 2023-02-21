package kr.co.dbvision.lib.ui.cmm.emp.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 직원팝업에 관한 엔티티 클래스
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

public class Emp extends CommonVO {

	/* 번호 */
    private int num;
    /* 사원번호 */
    private String empno;
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
    /* 이메일 */
    private String email;
    /* 생년월일 */
    private String brthdy;
    /* 양력 여부 */
    private String slrcldAt;
    /* 결혼 여부 */
    private String mrrgAt;
    /* 결혼 여부 명 */
    private String mrrgAtNm;
    /* 겸임 부서 코드 */
    private String hdadptDeptCode;
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
    /* 채용 구분 */
    private String empnmSe;
    /* 채용 구분 명 */
    private String empnmSeNm;
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
    
    
    /* 조직코드 */
    private String orgnztCode;
    /* 상위 조직 코드 */
    private String upperOrgnztCode;
    /* 조직명 */
    private String orgnztNm;
    /* 조직 관리자 사원번호 */
    private String orgnztMngrEmpno;
    private String orgnztMngrEmpNm;
    /* 조직 구분 코드(C097) */
    private String orgnztSeCode;
    /* 사용종료일자 */
    private String useEndDe;
    /* 사용 여부 */
    private String useAt;
    private String useAtNm;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    private String regNm;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 사용여부 확인 */
    private String useCheck;
    
    
    /* 부서 약어 */
    private String deptAbrv;
    /* 상위 부서 코드 */
    private String upperDeptCode;
    /* 상위 부서 명 */
    private String upperDeptNm;
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
    /* 부서 구분 */
    private String deptSe;
    /* 출력 순서 */
    private String sortOrdr;
    /* 상위부서 존재 여부 */
    private String upperDeptAt;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Emp() {
        //
    }

    public Emp(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap.get("num") != null) {
        	this.num = (int) egovMap.get("num");
        }
        else {
        	this.num = 1;
        }
        this.empno = StringExpression.nullConvert(egovMap.get("empno"));
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
        this.rspofcCode = StringExpression.nullConvert(egovMap.get("rspofcCode"));
        this.rspofcCodeNm = StringExpression.nullConvert(egovMap.get("rspofcCodeNm"));

        this.zip = StringExpression.nullConvert(egovMap.get("zip"));
        this.ownhomAdres = StringExpression.nullConvert(egovMap.get("ownhomAdres"));
        this.ownhomDetailAdres = StringExpression.nullConvert(egovMap.get("ownhomDetailAdres"));
        this.ownhomEngAdres = StringExpression.nullConvert(egovMap.get("ownhomEngAdres"));
        this.ownhomTelno = StringExpression.nullConvert(egovMap.get("ownhomTelno"));
        this.lxtnTelno = StringExpression.nullConvert(egovMap.get("lxtnTelno"));
        this.mbtlnum = StringExpression.nullConvert(egovMap.get("mbtlnum"));
        this.email = StringExpression.nullConvert(egovMap.get("email"));
        this.brthdy = StringExpression.nullConvert(egovMap.get("brthdy"));
        this.slrcldAt = StringExpression.nullConvert(egovMap.get("slrcldAt"));
        this.mrrgAt = StringExpression.nullConvert(egovMap.get("mrrgAt"));
        this.mrrgAtNm = StringExpression.nullConvert(egovMap.get("mrrgAtNm"));
        this.hdadptDeptCode = StringExpression.nullConvert(egovMap.get("hdadptDeptCode"));
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

        this.orgnztCode = StringExpression.nullConvert(egovMap.get("orgnztCode"));
        this.upperOrgnztCode = StringExpression.nullConvert(egovMap.get("upperOrgnztCode"));
        this.orgnztNm = StringExpression.nullConvert(egovMap.get("orgnztNm"));
        this.orgnztMngrEmpno = StringExpression.nullConvert(egovMap.get("orgnztMngrEmpno"));
        this.orgnztMngrEmpNm = StringExpression.nullConvert(egovMap.get("orgnztMngrEmpNm"));
        this.orgnztSeCode = StringExpression.nullConvert(egovMap.get("orgnztSeCode"));
        this.orgnztLvl = StringExpression.nullConvert(egovMap.get("orgnztLvl"));
        this.useBeginDe = StringExpression.nullConvert(egovMap.get("useBeginDe"));
        this.useEndDe = StringExpression.nullConvert(egovMap.get("useEndDe"));
        this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
        this.useAtNm = StringExpression.nullConvert(egovMap.get("useAtNm"));
        this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
        this.regId = StringExpression.nullConvert(egovMap.get("regId"));
        this.regNm = StringExpression.nullConvert(egovMap.get("regNm"));
        this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
        this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        this.useCheck = StringExpression.nullConvert(egovMap.get("useCheck"));
        

        this.deptAbrv = StringExpression.nullConvert(egovMap.get("deptAbrv"));
        this.upperDeptCode = StringExpression.nullConvert(egovMap.get("upperDeptCode"));
        this.upperDeptNm = StringExpression.nullConvert(egovMap.get("upperDeptNm"));
        this.deptLvl = StringExpression.nullConvert(egovMap.get("deptLvl"));
        this.deptTelno = StringExpression.nullConvert(egovMap.get("deptTelno"));
        this.deptFaxTelno = StringExpression.nullConvert(egovMap.get("deptFaxTelno"));
        this.deptSe = StringExpression.nullConvert(egovMap.get("deptSe"));
        this.sortOrdr = StringExpression.nullConvert(egovMap.get("sortOrdr"));
        this.upperDeptAt = StringExpression.nullConvert(egovMap.get("upperDeptAt"));

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

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
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

    public String getOrgnztCode() {
        return orgnztCode;
    }
    public void setOrgnztCode(String orgnztCode) {
        this.orgnztCode = orgnztCode;
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

    public String getOrgnztSeCode() {
        return orgnztSeCode;
    }
    public void setOrgnztSeCode(String orgnztSeCode) {
        this.orgnztSeCode = orgnztSeCode;
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

    public String getUseCheck() {
        return useCheck;
    }
    public void setUseCheck(String useCheck) {
        this.useCheck = useCheck;
    }
    


    

    public String getDeptAbrv() {
        return deptAbrv;
    }
    public void setDeptAbrv(String deptAbrv) {
        this.deptAbrv = deptAbrv;
    }

    public String getUpperDeptCode() {
        return upperDeptCode;
    }
    public void setUpperDeptCode(String upperDeptCode) {
        this.upperDeptCode = upperDeptCode;
    }

    public String getUpperDeptNm() {
        return upperDeptNm;
    }
    public void setUpperDeptNm(String upperDeptNm) {
        this.upperDeptNm = upperDeptNm;
    }

    public String getDeptLvl() {
        return deptLvl;
    }
    public void setDeptLvl(String deptLvl) {
        this.deptLvl = deptLvl;
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

    public String getDeptSe() {
        return deptSe;
    }
    public void setDeptSe(String deptSe) {
        this.deptSe = deptSe;
    }

    public String getSortOrdr() {
        return sortOrdr;
    }
    public void setSortOrdr(String sortOrdr) {
        this.sortOrdr = sortOrdr;
    }

    public String getUpperDeptAt() {
        return upperDeptAt;
    }
    public void setUpperDeptAt(String upperDeptAt) {
        this.upperDeptAt = upperDeptAt;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }

}
