package kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 프로젝트현황에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.01.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.14          디비비전              최초 생성
 *
 * </pre>
 */

public class Pjtpmg001 extends CommonVO {

    /* 프로젝트 순번 */
    private String projectSn;
    /* 프로젝트 명 */
    private String projectNm;
    /* 프로젝트 내용 */
    private String projectCn;
    /* 프로젝트 범위 */
    private String projectScope;
    /* 프로젝트 환경 */
    private String projectEnvrn;
    /* 프로젝트 지역 */
    private String projectArea;
    /* 프로젝트 PM 사원번호 */
    private String projectPmEmpno;
    /* 프로젝트 PM 명 */
    private String projectPmNm;
    /* 거래처 코드 */
    private String bcncCode;
    /* 거래처 담당자 코드 */
    private String bcncChargerCode;
    /* 프로젝트 시작 일자 */
    private String projectBeginDe;
    /* 프로젝트 종료 일자 */
    private String projectEndDe;
    /* 실제 시작 일자 */
    private String realBeginDe;
    /* 실제 종료 일자 */
    private String realEndDe;
    /* 계약 금액 */
    private String cntrctAmt;
    /* 부가세 포함 여부 */
    private String vatInclsAt;
    /* 무상 유지보수 월수 */
    private String grtsMntnceMcnt;
    /* 무상 유지보수 내용 */
    private String grtsMntnceCn;
    /* 프로젝트 구분 */
    private String projectSe;
    /* 완료 여부 */
    private String comptAt;
    /* 완료 일자 */
    private String comptDe;
    /* 업체 아이디 */
    private String entrpsId;
    /* 업체 패스워드 */
    private String entrpsPassword;
    /* 계약 유형 */
    private String cntrctTy;
    /* 등록 사원번호 */
    private String registEmpno;

    private String bcncNm;
    
    private String projectDe;
    
    private String manRate;
    
    private String prodRate;
    
    private String chargerNm;
    
    private String chargerCttpc;
    
    private String userNm;
    
    private String prtcpntNm;
    
    private String searchSregDt;
    
    private String searchEregDt;
    
    private String basisDtList;
    
    private String columnList;
    
    private String hnfRate;
    
    private String bugtRate;
    
    private String outputRate;
    
    private String cntrctDe;
    
    private String chargerOfcps;
    
    private String chargerMbtlnum;
    
    private String chargerEmail;
    
    private String chargerTelno;
    
    private String cntrctCn;
    
    private String cntrctBeginDe;
    
    private String cntrctEndDe;
    
    private String ccpySn;
    
    private String jobDe;
    
    private String projectUrl;
    
    private String bcncChargerNm;

    /**
     * 실적등록여부 
     */
    private String acmsltCnt;
    
    private String newApprvEmpno1;
    private String newApprvDe1;
    private String newApprvEmpno2;
    private String newApprvDe2;
    private String endApprvEmpno1;
    private String endApprvDe1;
    private String endApprvEmpno2;
    private String endApprvDe2;
    private String newApprvNm1;
    private String newApprvNm2;
    private String endApprvNm1;
    private String endApprvNm2;
    private String newApprvAt1;
    private String newApprvAt2;
    private String endApprvAt1;
    private String endApprvAt2;
    private String newApprvRspofc1;
    private String newApprvRspofc2;
    private String endApprvRspofc1;
    private String endApprvRspofc2;
    private String newApprvMail1;
    private String newApprvMail2;
    private String endApprvMail1;
    private String endApprvMail2;
    
    private String completeCn1;
    private String completeCn2;
    private String completeCn3;
    private String completeCn4;
    private String apprverCn1;
    private String apprverCn2;
    
    private String hnfPlanCnt;
    private String bugtPlanCnt;
    private String outputCnt;
    private String hngAcmsltCnt;
    private String bugtAcmlstCnt;
    
    private String repairSn;
    private String repairSe;
    private String repairIem;
    private String repairCn;
    private String repairBeginDe;
    private String repairEndDe;
    private String repairPsitn;
    private String repairChargerNm;
    private String repairChargerCttpc;
    private String repairDe;
    
    /*유지보수 요청 팝업*/
    private String popupUrl;

	private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Pjtpmg001() {
        //
    }

    public Pjtpmg001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.projectSn = StringExpression.nullConvert(egovMap.get("projectSn"));
            this.projectNm = StringExpression.nullConvert(egovMap.get("projectNm"));
            this.projectCn = StringExpression.nullConvert(egovMap.get("projectCn"));
            this.projectScope = StringExpression.nullConvert(egovMap.get("projectScope"));
            this.projectEnvrn = StringExpression.nullConvert(egovMap.get("projectEnvrn"));
            this.projectArea = StringExpression.nullConvert(egovMap.get("projectArea"));
            this.projectPmEmpno = StringExpression.nullConvert(egovMap.get("projectPmEmpno"));
            this.projectPmNm = StringExpression.nullConvert(egovMap.get("projectPmNm"));
            this.bcncCode = StringExpression.nullConvert(egovMap.get("bcncCode"));
            this.bcncChargerCode = StringExpression.nullConvert(egovMap.get("bcncChargerCode"));
            this.projectBeginDe = StringExpression.nullConvert(egovMap.get("projectBeginDe"));
            this.projectEndDe = StringExpression.nullConvert(egovMap.get("projectEndDe"));
            this.realBeginDe = StringExpression.nullConvert(egovMap.get("realBeginDe"));
            this.realEndDe = StringExpression.nullConvert(egovMap.get("realEndDe"));
            this.cntrctAmt = StringExpression.nullConvert(egovMap.get("cntrctAmt"));
            this.vatInclsAt = StringExpression.nullConvert(egovMap.get("vatInclsAt"));
            this.grtsMntnceMcnt = StringExpression.nullConvert(egovMap.get("grtsMntnceMcnt"));
            this.grtsMntnceCn = StringExpression.nullConvert(egovMap.get("grtsMntnceCn"));
            this.projectSe = StringExpression.nullConvert(egovMap.get("projectSe"));
            this.comptAt = StringExpression.nullConvert(egovMap.get("comptAt"));
            this.comptDe = StringExpression.nullConvert(egovMap.get("comptDe"));
            this.entrpsId = StringExpression.nullConvert(egovMap.get("entrpsId"));
            this.entrpsPassword = StringExpression.nullConvert(egovMap.get("entrpsPassword"));
            this.cntrctTy = StringExpression.nullConvert(egovMap.get("cntrctTy"));
            this.registEmpno = StringExpression.nullConvert(egovMap.get("registEmpno"));
            this.bcncNm = StringExpression.nullConvert(egovMap.get("bcncNm"));
            this.projectDe = StringExpression.nullConvert(egovMap.get("projectDe"));
            this.manRate = StringExpression.nullConvert(egovMap.get("manRate"));
            this.prodRate = StringExpression.nullConvert(egovMap.get("prodRate"));
            this.chargerNm = StringExpression.nullConvert(egovMap.get("chargerNm"));
            this.chargerCttpc = StringExpression.nullConvert(egovMap.get("chargerCttpc"));
            this.userNm = StringExpression.nullConvert(egovMap.get("userNm"));
            this.prtcpntNm = StringExpression.nullConvert(egovMap.get("prtcpntNm"));
            this.searchSregDt = StringExpression.nullConvert(egovMap.get("searchSregDt"));
            this.searchEregDt = StringExpression.nullConvert(egovMap.get("searchEregDt"));
            this.basisDtList = StringExpression.nullConvert(egovMap.get("basisDtList"));
            this.columnList = StringExpression.nullConvert(egovMap.get("columnList"));
            this.hnfRate = StringExpression.nullConvert(egovMap.get("hnfRate"));
            this.bugtRate = StringExpression.nullConvert(egovMap.get("bugtRate"));
            this.outputRate = StringExpression.nullConvert(egovMap.get("outputRate"));
            this.cntrctDe = StringExpression.nullConvert(egovMap.get("cntrctDe"));
            this.chargerOfcps = StringExpression.nullConvert(egovMap.get("chargerOfcps"));
            this.chargerMbtlnum = StringExpression.nullConvert(egovMap.get("chargerMbtlnum"));
            this.chargerEmail = StringExpression.nullConvert(egovMap.get("chargerEmail"));
            this.chargerTelno = StringExpression.nullConvert(egovMap.get("chargerTelno"));
            this.cntrctCn = StringExpression.nullConvert(egovMap.get("cntrctCn"));
            this.cntrctBeginDe = StringExpression.nullConvert(egovMap.get("cntrctBeginDe"));
            this.cntrctEndDe = StringExpression.nullConvert(egovMap.get("cntrctEndDe"));
            this.ccpySn = StringExpression.nullConvert(egovMap.get("ccpySn"));
            this.bcncChargerNm = StringExpression.nullConvert(egovMap.get("bcncChargerNm"));
            this.acmsltCnt = StringExpression.nullConvert(egovMap.get("acmsltCnt"));
            this.jobDe = StringExpression.nullConvert(egovMap.get("jobDe"));
            this.newApprvEmpno1 = StringExpression.nullConvert(egovMap.get("newApprvEmpno1"));
            this.newApprvDe1 = StringExpression.nullConvert(egovMap.get("newApprvDe1"));
            this.newApprvEmpno2 = StringExpression.nullConvert(egovMap.get("newApprvEmpno2"));
            this.newApprvDe2 = StringExpression.nullConvert(egovMap.get("newApprvDe2"));
            this.projectUrl = StringExpression.nullConvert(egovMap.get("projectUrl"));
            this.endApprvEmpno1 = StringExpression.nullConvert(egovMap.get("endApprvEmpno1"));
            this.endApprvDe1 = StringExpression.nullConvert(egovMap.get("endApprvDe1"));
            this.endApprvEmpno2 = StringExpression.nullConvert(egovMap.get("endApprvEmpno2"));
            this.endApprvDe2 = StringExpression.nullConvert(egovMap.get("endApprvDe2"));
            this.newApprvNm1 = StringExpression.nullConvert(egovMap.get("newApprvNm1"));
            this.newApprvNm2 = StringExpression.nullConvert(egovMap.get("newApprvNm2"));
            this.endApprvNm1 = StringExpression.nullConvert(egovMap.get("endApprvNm1"));
            this.endApprvNm2 = StringExpression.nullConvert(egovMap.get("endApprvNm2"));
            this.newApprvAt1 = StringExpression.nullConvert(egovMap.get("newApprvAt1"));
            this.newApprvAt2 = StringExpression.nullConvert(egovMap.get("newApprvAt2"));
            this.endApprvAt1 = StringExpression.nullConvert(egovMap.get("endApprvAt1"));
            this.endApprvAt2 = StringExpression.nullConvert(egovMap.get("endApprvAt2"));
            this.newApprvRspofc1 = StringExpression.nullConvert(egovMap.get("newApprvRspofc1"));
            this.newApprvRspofc2 = StringExpression.nullConvert(egovMap.get("newApprvRspofc2"));
            this.endApprvRspofc1 = StringExpression.nullConvert(egovMap.get("endApprvRspofc1"));
            this.endApprvRspofc2 = StringExpression.nullConvert(egovMap.get("endApprvRspofc2"));
            this.newApprvMail1 = StringExpression.nullConvert(egovMap.get("newApprvMail1"));
            this.newApprvMail2 = StringExpression.nullConvert(egovMap.get("newApprvMail2"));
            this.endApprvMail1 = StringExpression.nullConvert(egovMap.get("endApprvMail1"));
            this.endApprvMail2 = StringExpression.nullConvert(egovMap.get("endApprvMail2"));
            
            this.completeCn1 = StringExpression.nullConvert(egovMap.get("completeCn1"));
            this.completeCn2 = StringExpression.nullConvert(egovMap.get("completeCn2"));
            this.completeCn3 = StringExpression.nullConvert(egovMap.get("completeCn3"));
            this.completeCn4 = StringExpression.nullConvert(egovMap.get("completeCn4"));
            this.apprverCn1 = StringExpression.nullConvert(egovMap.get("apprverCn1"));
            this.apprverCn2 = StringExpression.nullConvert(egovMap.get("apprverCn2"));
            
            this.hnfPlanCnt = StringExpression.nullConvert(egovMap.get("hnfPlanCnt"));
            this.bugtPlanCnt = StringExpression.nullConvert(egovMap.get("bugtPlanCnt"));
            this.outputCnt = StringExpression.nullConvert(egovMap.get("outputCnt"));
            this.hngAcmsltCnt = StringExpression.nullConvert(egovMap.get("hngAcmsltCnt"));
            this.bugtAcmlstCnt = StringExpression.nullConvert(egovMap.get("bugtAcmlstCnt"));
            
            this.repairSn = StringExpression.nullConvert(egovMap.get("repairSn"));
            this.repairSe = StringExpression.nullConvert(egovMap.get("repairSe"));
            this.repairIem = StringExpression.nullConvert(egovMap.get("repairIem"));
            this.repairCn = StringExpression.nullConvert(egovMap.get("repairCn"));
            this.repairBeginDe = StringExpression.nullConvert(egovMap.get("repairBeginDe"));
            this.repairEndDe = StringExpression.nullConvert(egovMap.get("repairEndDe"));
            this.repairPsitn = StringExpression.nullConvert(egovMap.get("repairPsitn"));
            this.repairChargerNm = StringExpression.nullConvert(egovMap.get("repairChargerNm"));
            this.repairChargerCttpc = StringExpression.nullConvert(egovMap.get("repairChargerCttpc"));
            this.repairDe = StringExpression.nullConvert(egovMap.get("repairDe"));
        }
    }    
    
    private String outputCn;
    private String planDaycnt;
    private String progrsRt;
    private String atchmnfl;
    private String outputSn;
    private String nativeeditorStatus;
    
    public Pjtpmg001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            
            this.outputCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            this.planDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.progrsRt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));            
            this.comptAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.atchmnfl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));            
            this.projectSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
            this.outputSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c11")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }
    
 
    

    public String getOutputCn() {
        return outputCn;
    }

    public void setOutputCn(String outputCn) {
        this.outputCn = outputCn;
    }

    public String getPlanDaycnt() {
        return planDaycnt;
    }

    public void setPlanDaycnt(String planDaycnt) {
        this.planDaycnt = planDaycnt;
    }

    public String getProgrsRt() {
        return progrsRt;
    }

    public void setProgrsRt(String progrsRt) {
        this.progrsRt = progrsRt;
    }

    public String getAtchmnfl() {
        return atchmnfl;
    }

    public void setAtchmnfl(String atchmnfl) {
        this.atchmnfl = atchmnfl;
    }

    public String getOutputSn() {
        return outputSn;
    }

    public void setOutputSn(String outputSn) {
        this.outputSn = outputSn;
    }

    public String getNativeeditorStatus() {
        return nativeeditorStatus;
    }

    public void setNativeeditorStatus(String nativeeditorStatus) {
        this.nativeeditorStatus = nativeeditorStatus;
    }

    public String getProjectSn() {
        return projectSn;
    }
    public void setProjectSn(String projectSn) {
        this.projectSn = projectSn;
    }

    public String getProjectNm() {
        return projectNm;
    }
    public void setProjectNm(String projectNm) {
        this.projectNm = projectNm;
    }

    public String getProjectCn() {
        return projectCn;
    }
    public void setProjectCn(String projectCn) {
        this.projectCn = projectCn;
    }

    public String getProjectScope() {
        return projectScope;
    }
    public void setProjectScope(String projectScope) {
        this.projectScope = projectScope;
    }

    public String getProjectEnvrn() {
        return projectEnvrn;
    }
    public void setProjectEnvrn(String projectEnvrn) {
        this.projectEnvrn = projectEnvrn;
    }

    public String getProjectArea() {
        return projectArea;
    }
    public void setProjectArea(String projectArea) {
        this.projectArea = projectArea;
    }

    public String getProjectPmEmpno() {
        return projectPmEmpno;
    }
    public void setProjectPmEmpno(String projectPmEmpno) {
        this.projectPmEmpno = projectPmEmpno;
    }

    public String getProjectPmNm() {
        return projectPmNm;
    }
    public void setProjectPmNm(String projectPmNm) {
        this.projectPmNm = projectPmNm;
    }

    public String getBcncCode() {
        return bcncCode;
    }
    public void setBcncCode(String bcncCode) {
        this.bcncCode = bcncCode;
    }

    public String getBcncChargerCode() {
        return bcncChargerCode;
    }
    public void setBcncChargerCode(String bcncChargerCode) {
        this.bcncChargerCode = bcncChargerCode;
    }

    public String getProjectBeginDe() {
        return projectBeginDe;
    }
    public void setProjectBeginDe(String projectBeginDe) {
        this.projectBeginDe = projectBeginDe;
    }

    public String getProjectEndDe() {
        return projectEndDe;
    }
    public void setProjectEndDe(String projectEndDe) {
        this.projectEndDe = projectEndDe;
    }

    public String getRealBeginDe() {
        return realBeginDe;
    }
    public void setRealBeginDe(String realBeginDe) {
        this.realBeginDe = realBeginDe;
    }

    public String getRealEndDe() {
        return realEndDe;
    }
    public void setRealEndDe(String realEndDe) {
        this.realEndDe = realEndDe;
    }

    public String getCntrctAmt() {
        return cntrctAmt;
    }
    public void setCntrctAmt(String cntrctAmt) {
        this.cntrctAmt = cntrctAmt;
    }

    public String getVatInclsAt() {
        return vatInclsAt;
    }
    public void setVatInclsAt(String vatInclsAt) {
        this.vatInclsAt = vatInclsAt;
    }

    public String getGrtsMntnceMcnt() {
        return grtsMntnceMcnt;
    }
    public void setGrtsMntnceMcnt(String grtsMntnceMcnt) {
        this.grtsMntnceMcnt = grtsMntnceMcnt;
    }

    public String getGrtsMntnceCn() {
        return grtsMntnceCn;
    }
    public void setGrtsMntnceCn(String grtsMntnceCn) {
        this.grtsMntnceCn = grtsMntnceCn;
    }

    public String getProjectSe() {
        return projectSe;
    }
    public void setProjectSe(String projectSe) {
        this.projectSe = projectSe;
    }

    public String getComptAt() {
        return comptAt;
    }
    public void setComptAt(String comptAt) {
        this.comptAt = comptAt;
    }

    public String getComptDe() {
        return comptDe;
    }
    public void setComptDe(String comptDe) {
        this.comptDe = comptDe;
    }

    public String getEntrpsId() {
        return entrpsId;
    }
    public void setEntrpsId(String entrpsId) {
        this.entrpsId = entrpsId;
    }

    public String getEntrpsPassword() {
        return entrpsPassword;
    }
    public void setEntrpsPassword(String entrpsPassword) {
        this.entrpsPassword = entrpsPassword;
    }

    public String getCntrctTy() {
        return cntrctTy;
    }
    public void setCntrctTy(String cntrctTy) {
        this.cntrctTy = cntrctTy;
    }

    public String getRegistEmpno() {
        return registEmpno;
    }
    public void setRegistEmpno(String registEmpno) {
        this.registEmpno = registEmpno;
    }

    public String getBcncNm() {
		return bcncNm;
	}

	public void setBcncNm(String bcncNm) {
		this.bcncNm = bcncNm;
	}

	public String getProjectDe() {
		return projectDe;
	}

	public void setProjectDe(String projectDe) {
		this.projectDe = projectDe;
	}

	public String getManRate() {
		return manRate;
	}

	public void setManRate(String manRate) {
		this.manRate = manRate;
	}

	public String getProdRate() {
		return prodRate;
	}

	public void setProdRate(String prodRate) {
		this.prodRate = prodRate;
	}

	public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }

	public String getChargerNm() {
		return chargerNm;
	}

	public void setChargerNm(String chargerNm) {
		this.chargerNm = chargerNm;
	}

	public String getChargerCttpc() {
		return chargerCttpc;
	}

	public void setChargerCttpc(String chargerCttpc) {
		this.chargerCttpc = chargerCttpc;
	}

	public String getUserNm() {
		return userNm;
	}

    public void setUserNm(String userNm) {
		this.userNm = userNm;
	}
    
    public String getJobDe() {
        return jobDe;
    }

    public void setJobDe(String jobDe) {
        this.jobDe = jobDe;
    }

	public String getPrtcpntNm() {
		return prtcpntNm;
	}

	public void setPrtcpntNm(String prtcpntNm) {
		this.prtcpntNm = prtcpntNm;
	}

	public String getSearchSregDt() {
		return searchSregDt;
	}

	public void setSearchSregDt(String searchSregDt) {
		this.searchSregDt = searchSregDt;
	}

	public String getSearchEregDt() {
		return searchEregDt;
	}

	public void setSearchEregDt(String searchEregDt) {
		this.searchEregDt = searchEregDt;
	}

	public String getBasisDtList() {
		return basisDtList;
	}

	public void setBasisDtList(String basisDtList) {
		this.basisDtList = basisDtList;
	}

	public String getColumnList() {
		return columnList;
	}

	public void setColumnList(String columnList) {
		this.columnList = columnList;
	}

	public String getHnfRate() {
		return hnfRate;
	}

	public void setHnfRate(String hnfRate) {
		this.hnfRate = hnfRate;
	}

	public String getBugtRate() {
		return bugtRate;
	}

	public void setBugtRate(String bugtRate) {
		this.bugtRate = bugtRate;
	}

	public String getOutputRate() {
		return outputRate;
	}

	public void setOutputRate(String outputRate) {
		this.outputRate = outputRate;
	}

	public String getCntrctDe() {
		return cntrctDe;
	}

	public void setCntrctDe(String cntrctDe) {
		this.cntrctDe = cntrctDe;
	}

	public String getChargerOfcps() {
		return chargerOfcps;
	}

	public void setChargerOfcps(String chargerOfcps) {
		this.chargerOfcps = chargerOfcps;
	}

	public String getChargerMbtlnum() {
		return chargerMbtlnum;
	}

	public void setChargerMbtlnum(String chargerMbtlnum) {
		this.chargerMbtlnum = chargerMbtlnum;
	}

	public String getChargerEmail() {
		return chargerEmail;
	}

	public void setChargerEmail(String chargerEmail) {
		this.chargerEmail = chargerEmail;
	}

	public String getChargerTelno() {
		return chargerTelno;
	}

	public void setChargerTelno(String chargerTelno) {
		this.chargerTelno = chargerTelno;
	}

	public String getCntrctCn() {
		return cntrctCn;
	}

	public void setCntrctCn(String cntrctCn) {
		this.cntrctCn = cntrctCn;
	}

	public String getCntrctBeginDe() {
		return cntrctBeginDe;
	}

	public void setCntrctBeginDe(String cntrctBeginDe) {
		this.cntrctBeginDe = cntrctBeginDe;
	}

	public String getCntrctEndDe() {
		return cntrctEndDe;
	}

	public void setCntrctEndDe(String cntrctEndDe) {
		this.cntrctEndDe = cntrctEndDe;
	}

	public String getCcpySn() {
		return ccpySn;
	}

	public void setCcpySn(String ccpySn) {
		this.ccpySn = ccpySn;
	}

	public String getBcncChargerNm() {
		return bcncChargerNm;
	}

	public void setBcncChargerNm(String bcncChargerNm) {
		this.bcncChargerNm = bcncChargerNm;
	}
    public String getAcmsltCnt() {
        return acmsltCnt;
    }

    public void setAcmsltCnt(String acmsltCnt) {
        this.acmsltCnt = acmsltCnt;
    }

    public String getProjectUrl() {
        return projectUrl;
    }

    public void setProjectUrl(String projectUrl) {
        this.projectUrl = projectUrl;
    }

    public String getNewApprvEmpno1() {
        return newApprvEmpno1;
    }

    public void setNewApprvEmpno1(String newApprvEmpno1) {
        this.newApprvEmpno1 = newApprvEmpno1;
    }

    public String getNewApprvDe1() {
        return newApprvDe1;
    }

    public void setNewApprvDe1(String newApprvDe1) {
        this.newApprvDe1 = newApprvDe1;
    }

    public String getNewApprvEmpno2() {
        return newApprvEmpno2;
    }

    public void setNewApprvEmpno2(String newApprvEmpno2) {
        this.newApprvEmpno2 = newApprvEmpno2;
    }

    public String getNewApprvDe2() {
        return newApprvDe2;
    }

    public void setNewApprvDe2(String newApprvDe2) {
        this.newApprvDe2 = newApprvDe2;
    }

    public String getCompleteCn1() {
        return completeCn1;
    }

    public void setCompleteCn1(String completeCn1) {
        this.completeCn1 = completeCn1;
    }

    public String getCompleteCn2() {
        return completeCn2;
    }

    public void setCompleteCn2(String completeCn2) {
        this.completeCn2 = completeCn2;
    }

    public String getCompleteCn3() {
        return completeCn3;
    }

    public void setCompleteCn3(String completeCn3) {
        this.completeCn3 = completeCn3;
    }

    public String getCompleteCn4() {
        return completeCn4;
    }

    public void setCompleteCn4(String completeCn4) {
        this.completeCn4 = completeCn4;
    }

    public String getEndApprvEmpno1() {
        return endApprvEmpno1;
    }

    public void setEndApprvEmpno1(String endApprvEmpno1) {
        this.endApprvEmpno1 = endApprvEmpno1;
    }

    public String getEndApprvDe1() {
        return endApprvDe1;
    }

    public void setEndApprvDe1(String endApprvDe1) {
        this.endApprvDe1 = endApprvDe1;
    }

    public String getEndApprvEmpno2() {
        return endApprvEmpno2;
    }

    public void setEndApprvEmpno2(String endApprvEmpno2) {
        this.endApprvEmpno2 = endApprvEmpno2;
    }

    public String getEndApprvDe2() {
        return endApprvDe2;
    }

    public void setEndApprvDe2(String endApprvDe2) {
        this.endApprvDe2 = endApprvDe2;
    }

    public String getHnfPlanCnt() {
        return hnfPlanCnt;
    }

    public void setHnfPlanCnt(String hnfPlanCnt) {
        this.hnfPlanCnt = hnfPlanCnt;
    }

    public String getBugtPlanCnt() {
        return bugtPlanCnt;
    }

    public void setBugtPlanCnt(String bugtPlanCnt) {
        this.bugtPlanCnt = bugtPlanCnt;
    }

    public String getOutputCnt() {
        return outputCnt;
    }

    public void setOutputCnt(String outputCnt) {
        this.outputCnt = outputCnt;
    }

    public String getHngAcmsltCnt() {
        return hngAcmsltCnt;
    }

    public void setHngAcmsltCnt(String hngAcmsltCnt) {
        this.hngAcmsltCnt = hngAcmsltCnt;
    }

    public String getBugtAcmlstCnt() {
        return bugtAcmlstCnt;
    }

    public void setBugtAcmlstCnt(String bugtAcmlstCnt) {
        this.bugtAcmlstCnt = bugtAcmlstCnt;
    }

    public String getRepairSn() {
        return repairSn;
    }

    public void setRepairSn(String repairSn) {
        this.repairSn = repairSn;
    }

    public String getRepairSe() {
        return repairSe;
    }

    public void setRepairSe(String repairSe) {
        this.repairSe = repairSe;
    }

    public String getRepairIem() {
        return repairIem;
    }

    public void setRepairIem(String repairIem) {
        this.repairIem = repairIem;
    }

    public String getRepairCn() {
        return repairCn;
    }

    public void setRepairCn(String repairCn) {
        this.repairCn = repairCn;
    }

    public String getRepairBeginDe() {
        return repairBeginDe;
    }

    public void setRepairBeginDe(String repairBeginDe) {
        this.repairBeginDe = repairBeginDe;
    }

    public String getRepairEndDe() {
        return repairEndDe;
    }

    public void setRepairEndDe(String repairEndDe) {
        this.repairEndDe = repairEndDe;
    }

    public String getRepairPsitn() {
        return repairPsitn;
    }

    public void setRepairPsitn(String repairPsitn) {
        this.repairPsitn = repairPsitn;
    }

    public String getRepairChargerNm() {
        return repairChargerNm;
    }

    public void setRepairChargerNm(String repairChargerNm) {
        this.repairChargerNm = repairChargerNm;
    }

    public String getRepairChargerCttpc() {
        return repairChargerCttpc;
    }

    public void setRepairChargerCttpc(String repairChargerCttpc) {
        this.repairChargerCttpc = repairChargerCttpc;
    }

    public String getRepairDe() {
        return repairDe;
    }

    public void setRepairDe(String repairDe) {
        this.repairDe = repairDe;
    }

    public String getApprverCn1() {
        return apprverCn1;
    }

    public void setApprverCn1(String apprverCn1) {
        this.apprverCn1 = apprverCn1;
    }

    public String getApprverCn2() {
        return apprverCn2;
    }

    public void setApprverCn2(String apprverCn2) {
        this.apprverCn2 = apprverCn2;
    }

    public String getNewApprvNm1() {
        return newApprvNm1;
    }

    public void setNewApprvNm1(String newApprvNm1) {
        this.newApprvNm1 = newApprvNm1;
    }

    public String getNewApprvNm2() {
        return newApprvNm2;
    }

    public void setNewApprvNm2(String newApprvNm2) {
        this.newApprvNm2 = newApprvNm2;
    }

    public String getEndApprvNm1() {
        return endApprvNm1;
    }

    public void setEndApprvNm1(String endApprvNm1) {
        this.endApprvNm1 = endApprvNm1;
    }

    public String getEndApprvNm2() {
        return endApprvNm2;
    }

    public void setEndApprvNm2(String endApprvNm2) {
        this.endApprvNm2 = endApprvNm2;
    }

    public String getNewApprvAt1() {
        return newApprvAt1;
    }

    public void setNewApprvAt1(String newApprvAt1) {
        this.newApprvAt1 = newApprvAt1;
    }

    public String getNewApprvAt2() {
        return newApprvAt2;
    }

    public void setNewApprvAt2(String newApprvAt2) {
        this.newApprvAt2 = newApprvAt2;
    }

    public String getEndApprvAt1() {
        return endApprvAt1;
    }

    public void setEndApprvAt1(String endApprvAt1) {
        this.endApprvAt1 = endApprvAt1;
    }

    public String getEndApprvAt2() {
        return endApprvAt2;
    }

    public void setEndApprvAt2(String endApprvAt2) {
        this.endApprvAt2 = endApprvAt2;
    }

    public String getNewApprvRspofc1() {
        return newApprvRspofc1;
    }

    public void setNewApprvRspofc1(String newApprvRspofc1) {
        this.newApprvRspofc1 = newApprvRspofc1;
    }

    public String getNewApprvRspofc2() {
        return newApprvRspofc2;
    }

    public void setNewApprvRspofc2(String newApprvRspofc2) {
        this.newApprvRspofc2 = newApprvRspofc2;
    }

    public String getEndApprvRspofc1() {
        return endApprvRspofc1;
    }

    public void setEndApprvRspofc1(String endApprvRspofc1) {
        this.endApprvRspofc1 = endApprvRspofc1;
    }

    public String getEndApprvRspofc2() {
        return endApprvRspofc2;
    }

    public void setEndApprvRspofc2(String endApprvRspofc2) {
        this.endApprvRspofc2 = endApprvRspofc2;
    }

    public String getNewApprvMail1() {
		return newApprvMail1;
	}

	public void setNewApprvMail1(String newApprvMail1) {
		this.newApprvMail1 = newApprvMail1;
	}

	public String getNewApprvMail2() {
		return newApprvMail2;
	}

	public void setNewApprvMail2(String newApprvMail2) {
		this.newApprvMail2 = newApprvMail2;
	}

	public String getEndApprvMail1() {
		return endApprvMail1;
	}

	public void setEndApprvMail1(String endApprvMail1) {
		this.endApprvMail1 = endApprvMail1;
	}

	public String getEndApprvMail2() {
		return endApprvMail2;
	}

	public void setEndApprvMail2(String endApprvMail2) {
		this.endApprvMail2 = endApprvMail2;
	}

	public String getPopupUrl() {
		return popupUrl;
	}

	public void setPopupUrl(String popupUrl) {
		this.popupUrl = popupUrl;
	}

    @Override
    public String toString() {
        return "Pjtpmg001 [projectSn=" + projectSn + ", projectNm=" + projectNm + ", projectCn=" + projectCn
                + ", projectScope=" + projectScope + ", projectEnvrn=" + projectEnvrn + ", projectArea=" + projectArea
                + ", projectPmEmpno=" + projectPmEmpno + ", projectPmNm=" + projectPmNm + ", bcncCode=" + bcncCode
                + ", bcncChargerCode=" + bcncChargerCode + ", projectBeginDe=" + projectBeginDe + ", projectEndDe="
                + projectEndDe + ", realBeginDe=" + realBeginDe + ", realEndDe=" + realEndDe + ", cntrctAmt="
                + cntrctAmt + ", vatInclsAt=" + vatInclsAt + ", grtsMntnceMcnt=" + grtsMntnceMcnt + ", grtsMntnceCn="
                + grtsMntnceCn + ", projectSe=" + projectSe + ", comptAt=" + comptAt + ", comptDe=" + comptDe
                + ", entrpsId=" + entrpsId + ", entrpsPassword=" + entrpsPassword + ", cntrctTy=" + cntrctTy
                + ", registEmpno=" + registEmpno + ", bcncNm=" + bcncNm + ", projectDe=" + projectDe + ", manRate="
                + manRate + ", prodRate=" + prodRate + ", chargerNm=" + chargerNm + ", chargerCttpc=" + chargerCttpc
                + ", userNm=" + userNm + ", prtcpntNm=" + prtcpntNm + ", searchSregDt=" + searchSregDt
                + ", searchEregDt=" + searchEregDt + ", basisDtList=" + basisDtList + ", columnList=" + columnList
                + ", hnfRate=" + hnfRate + ", bugtRate=" + bugtRate + ", outputRate=" + outputRate + ", cntrctDe="
                + cntrctDe + ", chargerOfcps=" + chargerOfcps + ", chargerMbtlnum=" + chargerMbtlnum + ", chargerEmail="
                + chargerEmail + ", chargerTelno=" + chargerTelno + ", cntrctCn=" + cntrctCn + ", cntrctBeginDe="
                + cntrctBeginDe + ", cntrctEndDe=" + cntrctEndDe + ", ccpySn=" + ccpySn + ", jobDe=" + jobDe
                + ", projectUrl=" + projectUrl + ", bcncChargerNm=" + bcncChargerNm + ", acmsltCnt=" + acmsltCnt
                + ", newApprvEmpno1=" + newApprvEmpno1 + ", newApprvDe1=" + newApprvDe1 + ", newApprvEmpno2="
                + newApprvEmpno2 + ", newApprvDe2=" + newApprvDe2 + ", endApprvEmpno1=" + endApprvEmpno1
                + ", endApprvDe1=" + endApprvDe1 + ", endApprvEmpno2=" + endApprvEmpno2 + ", endApprvDe2=" + endApprvDe2
                + ", newApprvNm1=" + newApprvNm1 + ", newApprvNm2=" + newApprvNm2 + ", endApprvNm1=" + endApprvNm1
                + ", endApprvNm2=" + endApprvNm2 + ", newApprvAt1=" + newApprvAt1 + ", newApprvAt2=" + newApprvAt2
                + ", endApprvAt1=" + endApprvAt1 + ", endApprvAt2=" + endApprvAt2 + ", newApprvRspofc1="
                + newApprvRspofc1 + ", newApprvRspofc2=" + newApprvRspofc2 + ", endApprvRspofc1=" + endApprvRspofc1
                + ", endApprvRspofc2=" + endApprvRspofc2 + ", completeCn1=" + completeCn1 + ", completeCn2="
                + completeCn2 + ", completeCn3=" + completeCn3 + ", completeCn4=" + completeCn4 + ", apprverCn1="
                + apprverCn1 + ", apprverCn2=" + apprverCn2 + ", hnfPlanCnt=" + hnfPlanCnt + ", bugtPlanCnt="
                + bugtPlanCnt + ", outputCnt=" + outputCnt + ", hngAcmsltCnt=" + hngAcmsltCnt + ", bugtAcmlstCnt="
                + bugtAcmlstCnt + ", repairSn=" + repairSn + ", repairSe=" + repairSe + ", repairIem=" + repairIem
                + ", repairCn=" + repairCn + ", repairBeginDe=" + repairBeginDe + ", repairEndDe=" + repairEndDe
                + ", repairPsitn=" + repairPsitn + ", repairChargerNm=" + repairChargerNm + ", repairChargerCttpc="
                + repairChargerCttpc + ", repairDe=" + repairDe + ", records=" + records + ", outputCn=" + outputCn
                + ", planDaycnt=" + planDaycnt + ", progrsRt=" + progrsRt + ", atchmnfl=" + atchmnfl + ", outputSn="
                + outputSn + ", nativeeditorStatus=" + nativeeditorStatus + "]";
    }
    
    
    
}
