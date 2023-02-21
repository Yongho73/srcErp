package kr.co.dbvision.api.pjt.mta.pjtmta001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 유지보수요청관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.06
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.06          디비비전              최초 생성
 * </pre>
 */

public class Pjtmta001 extends CommonVO {

    /* 프로젝트 순번 */
    private String projectSn;
    /* 프로젝트 명 */
    private String projectNm;
	/* 거래처 명 */
    private String bcncNm;
    /* 프로젝트 진행상태 */
    private String comptAt;
    /* 요청 순번 */
    private String requstSn;
    /* 요청 단계 */
    private String requstStep;
    /* 요청 일시 */
    private String requstDt;
    /* 요청자 부서 */
    private String rqesterDept;
    /* 요청자 전화번호 */
    private String rqesterTelno;
    /* 요청자 이메일 */
    private String rqesterEmail;
    /* 완료 요청 일시 */
    private String comptRequstDt;
    /* 요청 내용 */
    private String requstCn;
    /* 우선 순위 */
    private String priorRank;
    /* 요청 유형 */
    private String requstTy;
    /* 지시자 사원번호 */
    private String drctrEmpno;
    /* 완료일자 */
    private String comptDe;
    /* 지시 내용 */
    private String drctCn;
    /* 첨부파일 순번 */
    private String atchmnflSn;
    /* 작업자 사원번호 */
    private String opertorEmpno;
    /* 작업 유형 */
    private String opertTy;
    /* 승인자 성명 */
    private String confmerNm;
    /* 완료 승인 일시 */
    private String comptConfmDt;
    /* 승인 의견 */
    private String confmOpn;
    /* 만족도 코드 */
    private String stsfdgCode;
    /* 완료 승인 여부 */
    private String comptConfmAt;
    /* 유지보수 요청 메뉴 */
    private String requstMenu;
    /* 등록 일시 */
    private String regDt;
    /* 등록 ID */
    private String regId;
    /* 수정 일시 */
    private String uptDt;
    /* 수정 ID */
    private String uptId;
    
    private String rqester;
    
    private String drctrNm;
    
    private String opertorNm;
    
    private String opertBeginDt;
    
    private String opertEndDt;
    
    private String opertCn;
    
    private String registEmpno;
    
    private String registNm;
    
    /* 프로젝트 담당 PM 사번 */
    private String projectPmEmpno;
    /* 프로젝트 담당 PM 이름 */
    private String projectPmNm;
    /* 프로젝트 참여자 사번 */
    private String prtcpntEmpno;
    /* 프로젝트 참여자 이름 */
    private String prtcpntNm;
    /* 프로젝트 담당자 연락처 */
    private String chargerCttpc;
    /* 프로젝트 담당자 이름 */
    private String bcncChargerNm;

	/* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Pjtmta001() {
        //
    }

    public Pjtmta001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.projectSn = StringExpression.nullConvert(egovMap.get("projectSn"));
            this.requstSn = StringExpression.nullConvert(egovMap.get("requstSn"));
            this.requstStep = StringExpression.nullConvert(egovMap.get("requstStep"));
            this.requstDt = StringExpression.nullConvert(egovMap.get("requstDt"));
            this.rqesterDept = StringExpression.nullConvert(egovMap.get("rqesterDept"));
            this.rqesterTelno = StringExpression.nullConvert(egovMap.get("rqesterTelno"));
            this.rqesterEmail = StringExpression.nullConvert(egovMap.get("rqesterEmail"));
            this.comptRequstDt = StringExpression.nullConvert(egovMap.get("comptRequstDt"));
            this.requstCn = StringExpression.nullConvert(egovMap.get("requstCn"));
            this.priorRank = StringExpression.nullConvert(egovMap.get("priorRank"));
            this.requstTy = StringExpression.nullConvert(egovMap.get("requstTy"));
            this.drctrEmpno = StringExpression.nullConvert(egovMap.get("drctrEmpno"));
            this.comptDe = StringExpression.nullConvert(egovMap.get("comptDe"));
            this.drctCn = StringExpression.nullConvert(egovMap.get("drctCn"));
            this.atchmnflSn = StringExpression.nullConvert(egovMap.get("atchmnflSn"));
            this.opertorEmpno = StringExpression.nullConvert(egovMap.get("opertorEmpno"));
            this.opertTy = StringExpression.nullConvert(egovMap.get("opertTy"));
            this.confmerNm = StringExpression.nullConvert(egovMap.get("confmerNm"));
            this.comptConfmDt = StringExpression.nullConvert(egovMap.get("comptConfmDt"));
            this.confmOpn = StringExpression.nullConvert(egovMap.get("confmOpn"));
            this.stsfdgCode = StringExpression.nullConvert(egovMap.get("stsfdgCode"));
            this.comptConfmAt = StringExpression.nullConvert(egovMap.get("comptConfmAt"));
            this.requstMenu = StringExpression.nullConvert(egovMap.get("requstMenu"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.rqester = StringExpression.nullConvert(egovMap.get("rqester"));
            this.bcncNm = StringExpression.nullConvert(egovMap.get("bcncNm"));
            this.projectNm = StringExpression.nullConvert(egovMap.get("projectNm"));
            this.drctrNm = StringExpression.nullConvert(egovMap.get("drctrNm"));
            this.opertorNm = StringExpression.nullConvert(egovMap.get("opertorNm"));
            this.opertBeginDt = StringExpression.nullConvert(egovMap.get("opertBeginDt"));
            this.opertEndDt = StringExpression.nullConvert(egovMap.get("opertEndDt"));
            this.opertCn = StringExpression.nullConvert(egovMap.get("opertCn"));
            this.registEmpno = StringExpression.nullConvert(egovMap.get("registEmpno"));
            this.registNm = StringExpression.nullConvert(egovMap.get("registNm"));
            this.projectPmEmpno = StringExpression.nullConvert(egovMap.get("projectPmEmpno"));
            this.projectPmNm = StringExpression.nullConvert(egovMap.get("projectPmNm"));
            this.prtcpntEmpno = StringExpression.nullConvert(egovMap.get("prtcpntEmpno"));
            this.prtcpntNm = StringExpression.nullConvert(egovMap.get("prtcpntNm"));
            this.bcncChargerNm = StringExpression.nullConvert(egovMap.get("bcncChargerNm"));
            this.chargerCttpc = StringExpression.nullConvert(egovMap.get("chargerCttpc"));
        }
    }

    public Pjtmta001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.projectSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_projectSn")));
            this.requstSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstSn")));
            this.requstStep = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstStep")));
            this.requstDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstDt")));
            this.rqesterDept = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rqesterDept")));
            this.rqesterTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rqesterTelno")));
            this.rqesterEmail = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rqesterEmail")));
            this.comptRequstDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_comptRequstDt")));
            this.requstCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstCn")));
            this.priorRank = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_priorRank")));
            this.requstTy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstTy")));
            this.drctrEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_drctrEmpno")));
            this.comptDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_comptDe")));
            this.drctCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_drctCn")));
            this.atchmnflSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflSn")));
            this.opertorEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_opertorEmpno")));
            this.opertTy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_opertTy")));
            this.confmerNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmerNm")));
            this.comptConfmDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_comptConfmDt")));
            this.confmOpn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmOpn")));
            this.stsfdgCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stsfdgCode")));
            this.comptConfmAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_comptConfmAt")));
            this.requstMenu = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstMenu")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.rqester = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rqester")));
            
            this.projectPmEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_projectPmEmpno")));
            this.projectPmNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_projectPmNm")));
            this.prtcpntEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prtcpntEmpno")));
            this.prtcpntNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_prtcpntNm")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            
            this.bcncChargerNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bcncChargerNm")));
            this.chargerCttpc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chargerCttpc")));
        }
    }

    public void setProjectSn(String projectSn) {
        this.projectSn = projectSn;
    }

    public String getRequstSn() {
        return requstSn;
    }
    public void setRequstSn(String requstSn) {
        this.requstSn = requstSn;
    }

    public String getRequstStep() {
        return requstStep;
    }
    public void setRequstStep(String requstStep) {
        this.requstStep = requstStep;
    }

    public String getRequstDt() {
        return requstDt;
    }
    public void setRequstDt(String requstDt) {
        this.requstDt = requstDt;
    }

    public String getRqesterDept() {
        return rqesterDept;
    }
    public void setRqesterDept(String rqesterDept) {
        this.rqesterDept = rqesterDept;
    }

    public String getRqesterTelno() {
        return rqesterTelno;
    }
    public void setRqesterTelno(String rqesterTelno) {
        this.rqesterTelno = rqesterTelno;
    }

    public String getRqesterEmail() {
        return rqesterEmail;
    }
    public void setRqesterEmail(String rqesterEmail) {
        this.rqesterEmail = rqesterEmail;
    }

    public String getComptRequstDt() {
        return comptRequstDt;
    }
    public void setComptRequstDt(String comptRequstDt) {
        this.comptRequstDt = comptRequstDt;
    }

    public String getRequstCn() {
        return requstCn;
    }
    public void setRequstCn(String requstCn) {
        this.requstCn = requstCn;
    }

    public String getPriorRank() {
        return priorRank;
    }
    public void setPriorRank(String priorRank) {
        this.priorRank = priorRank;
    }

    public String getRequstTy() {
        return requstTy;
    }
    public void setRequstTy(String requstTy) {
        this.requstTy = requstTy;
    }

    public String getDrctrEmpno() {
        return drctrEmpno;
    }
    public void setDrctrEmpno(String drctrEmpno) {
        this.drctrEmpno = drctrEmpno;
    }

    public String getComptDe() {
        return comptDe;
    }
    public void setComptDe(String comptDe) {
        this.comptDe = comptDe;
    }

    public String getDrctCn() {
        return drctCn;
    }
    public void setDrctCn(String drctCn) {
        this.drctCn = drctCn;
    }

    public String getAtchmnflSn() {
        return atchmnflSn;
    }
    public void setAtchmnflSn(String atchmnflSn) {
        this.atchmnflSn = atchmnflSn;
    }

    public String getOpertorEmpno() {
        return opertorEmpno;
    }
    public void setOpertorEmpno(String opertorEmpno) {
        this.opertorEmpno = opertorEmpno;
    }

    public String getOpertTy() {
        return opertTy;
    }
    public void setOpertTy(String opertTy) {
        this.opertTy = opertTy;
    }

    public String getConfmerNm() {
        return confmerNm;
    }
    public void setConfmerNm(String confmerNm) {
        this.confmerNm = confmerNm;
    }

    public String getComptConfmDt() {
        return comptConfmDt;
    }
    public void setComptConfmDt(String comptConfmDt) {
        this.comptConfmDt = comptConfmDt;
    }

    public String getConfmOpn() {
        return confmOpn;
    }
    public void setConfmOpn(String confmOpn) {
        this.confmOpn = confmOpn;
    }

    public String getStsfdgCode() {
        return stsfdgCode;
    }
    public void setStsfdgCode(String stsfdgCode) {
        this.stsfdgCode = stsfdgCode;
    }

    public String getComptConfmAt() {
        return comptConfmAt;
    }
    public void setComptConfmAt(String comptConfmAt) {
        this.comptConfmAt = comptConfmAt;
    }

    public String getRequstMenu() {
        return requstMenu;
    }
    public void setRequstMenu(String requstMenu) {
        this.requstMenu = requstMenu;
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

    public String getRqester() {
        return rqester;
    }

    public void setRqester(String rqester) {
        this.rqester = rqester;
    }

    public String getBcncNm() {
        return bcncNm;
    }

    public void setBcncNm(String bcncNm) {
        this.bcncNm = bcncNm;
    }

    public String getProjectNm() {
        return projectNm;
    }

    public void setProjectNm(String projectNm) {
        this.projectNm = projectNm;
    }

    public String getDrctrNm() {
        return drctrNm;
    }

    public void setDrctrNm(String drctrNm) {
        this.drctrNm = drctrNm;
    }

    public String getOpertorNm() {
        return opertorNm;
    }

    public void setOpertorNm(String opertorNm) {
        this.opertorNm = opertorNm;
    }

    public String getOpertBeginDt() {
        return opertBeginDt;
    }

    public void setOpertBeginDt(String opertBeginDt) {
        this.opertBeginDt = opertBeginDt;
    }

    public String getOpertEndDt() {
        return opertEndDt;
    }

    public void setOpertEndDt(String opertEndDt) {
        this.opertEndDt = opertEndDt;
    }

    public String getOpertCn() {
        return opertCn;
    }

    public void setOpertCn(String opertCn) {
        this.opertCn = opertCn;
    }

    public String getRegistEmpno() {
        return registEmpno;
    }

    public void setRegistEmpno(String registEmpno) {
        this.registEmpno = registEmpno;
    }

    public String getRegistNm() {
        return registNm;
    }

    public void setRegistNm(String registNm) {
        this.registNm = registNm;
    }

    public String getPrtcpntEmpno() {
        return prtcpntEmpno;
    }

    public void setPrtcpntEmpno(String prtcpntEmpno) {
        this.prtcpntEmpno = prtcpntEmpno;
    }

    public String getPrtcpntNm() {
        return prtcpntNm;
    }

    public void setPrtcpntNm(String prtcpntNm) {
        this.prtcpntNm = prtcpntNm;
    }
    
    public String getComptAt() {
		return comptAt;
	}

	public void setComptAt(String comptAt) {
		this.comptAt = comptAt;
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

	public String getProjectSn() {
        return projectSn;
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
    
    public String getChargerCttpc() {
		return chargerCttpc;
	}

	public void setChargerCttpc(String chargerCttpc) {
		this.chargerCttpc = chargerCttpc;
	}

	public String getBcncChargerNm() {
		return bcncChargerNm;
	}

	public void setBcncChargerNm(String bcncChargerNm) {
		this.bcncChargerNm = bcncChargerNm;
	}
    
}
