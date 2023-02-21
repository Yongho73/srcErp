package kr.co.dbvision.api.mta.mat.mtamat001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 유지보수요청에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.12.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.12.16          디비비전              최초 생성
 *
 * </pre>
 */

public class Mtamat001 extends CommonVO {

    /* 프로젝트 번호 */
    private String projectNo;
    /* 요청 번호 */
    private String requstNo;
    /* 요청 단계 */
    private String requstStep;
    /* 요청 일자 */
    private String requstDt;
    /* 요청자 부서 */
    private String requstDept;
    /* 요청자 전화 */
    private String requstTelno;
    /* 요청자 이메일 */
    private String requstEmail;
    /* 완료 요구 일시 */
    private String comptRequstDt;
    /* 요청 내용 */
    private String requstCn;
    /* 우선 순위 */
    private String priorTy;
    /* 요청 유형 */
    private String requstTy;
    /* 지시자 사원번호 */
    private String drctrEmpno;
    /* 지시 내용 */
    private String drctCn;
    /* 첨부파일 */
    private String atchmnfl;
    
    private String atchmnflList;
    /* 작업자 사원번호 */
    private String opertorEmpno;
    /* 작업 유형 */
    private String opertTy;
    /* 승인자 성명 */
    private String confmerNm;
    /* 완료 승인 일시 */
    private String comptConfmDt;
    /* 완료 승인 여부 */
    private String comptConfmAt;
    /* 승인 의견 */
    private String confmOpn;
    /* 만족도 수준 */
    private String stsfdgLevel;
    
    private String rnum;
    
    private String compNm;
    
    private String empNm;
    
    private String drctrEmpNm;
    
    private String opertorEmpNm;
    
    private String opertBeginDt;
    
    private String opertEndDt;
    
    private String opertCn;
    
    private String opertSn;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mtamat001() {
        //
    }

    public Mtamat001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.projectNo = StringExpression.nullConvert(egovMap.get("projectNo"));
            this.requstNo = StringExpression.nullConvert(egovMap.get("requstNo"));
            this.requstStep = StringExpression.nullConvert(egovMap.get("requstStep"));
            this.requstDt = StringExpression.nullConvert(egovMap.get("requstDt"));
            this.requstDept = StringExpression.nullConvert(egovMap.get("requstDept"));
            this.requstTelno = StringExpression.nullConvert(egovMap.get("requstTelno"));
            this.requstEmail = StringExpression.nullConvert(egovMap.get("requstEmail"));
            this.comptRequstDt = StringExpression.nullConvert(egovMap.get("comptRequstDt"));
            this.requstCn = StringExpression.nullConvert(egovMap.get("requstCn"));
            this.priorTy = StringExpression.nullConvert(egovMap.get("priorTy"));
            this.requstTy = StringExpression.nullConvert(egovMap.get("requstTy"));
            this.drctrEmpno = StringExpression.nullConvert(egovMap.get("drctrEmpno"));
            this.drctrEmpNm = StringExpression.nullConvert(egovMap.get("drctrEmpNm"));
            this.drctCn = StringExpression.nullConvert(egovMap.get("drctCn"));
            this.atchmnfl = StringExpression.nullConvert(egovMap.get("atchmnfl"));
            this.atchmnflList = StringExpression.nullConvert(egovMap.get("atchmnflList"));
            this.opertorEmpno = StringExpression.nullConvert(egovMap.get("opertorEmpno"));
            this.opertorEmpNm = StringExpression.nullConvert(egovMap.get("opertorEmpNm"));
            this.opertTy = StringExpression.nullConvert(egovMap.get("opertTy"));
            this.confmerNm = StringExpression.nullConvert(egovMap.get("confmerNm"));
            this.comptConfmDt = StringExpression.nullConvert(egovMap.get("comptConfmDt"));
            this.comptConfmAt = StringExpression.nullConvert(egovMap.get("comptConfmAt"));
            this.confmOpn = StringExpression.nullConvert(egovMap.get("confmOpn"));
            this.stsfdgLevel = StringExpression.nullConvert(egovMap.get("stsfdgLevel"));
            this.rnum = StringExpression.nullConvert(egovMap.get("rnum"));
            this.compNm = StringExpression.nullConvert(egovMap.get("compNm"));
            this.empNm = StringExpression.nullConvert(egovMap.get("empNm"));
            this.opertBeginDt = StringExpression.nullConvert(egovMap.get("opertBeginDt"));
            this.opertEndDt = StringExpression.nullConvert(egovMap.get("opertEndDt"));
            this.opertCn = StringExpression.nullConvert(egovMap.get("opertCn"));
            this.opertSn = StringExpression.nullConvert(egovMap.get("opertSn"));
        }
    }

    public String getProjectNo() {
        return projectNo;
    }
    public void setProjectNo(String projectNo) {
        this.projectNo = projectNo;
    }

    public String getRequstNo() {
        return requstNo;
    }
    public void setRequstNo(String requstNo) {
        this.requstNo = requstNo;
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

    public String getRequstDept() {
        return requstDept;
    }
    public void setRequstDept(String requstDept) {
        this.requstDept = requstDept;
    }

    public String getRequstTelno() {
        return requstTelno;
    }
    public void setRequstTelno(String requstTelno) {
        this.requstTelno = requstTelno;
    }

    public String getRequstEmail() {
        return requstEmail;
    }
    public void setRequstEmail(String requstEmail) {
        this.requstEmail = requstEmail;
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

    public String getPriorTy() {
        return priorTy;
    }
    public void setPriorTy(String priorTy) {
        this.priorTy = priorTy;
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

    public String getDrctCn() {
        return drctCn;
    }
    public void setDrctCn(String drctCn) {
        this.drctCn = drctCn;
    }

    public String getAtchmnfl() {
        return atchmnfl;
    }
    public void setAtchmnfl(String atchmnfl) {
        this.atchmnfl = atchmnfl;
    }  

    public String getAtchmnflList() {
		return atchmnflList;
	}

	public void setAtchmnflList(String atchmnflList) {
		this.atchmnflList = atchmnflList;
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

    public String getComptConfmAt() {
        return comptConfmAt;
    }
    public void setComptConfmAt(String comptConfmAt) {
        this.comptConfmAt = comptConfmAt;
    }

    public String getConfmOpn() {
        return confmOpn;
    }
    public void setConfmOpn(String confmOpn) {
        this.confmOpn = confmOpn;
    }

    public String getStsfdgLevel() {
        return stsfdgLevel;
    }
    public void setStsfdgLevel(String stsfdgLevel) {
        this.stsfdgLevel = stsfdgLevel;
    }

    public String getCompNm() {
		return compNm;
	}

	public void setCompNm(String compNm) {
		this.compNm = compNm;
	}
	
	public String getRnum() {
		return rnum;
	}

	public void setRnum(String rnum) {
		this.rnum = rnum;
	}

	public String getEmpNm() {
		return empNm;
	}

	public void setEmpNm(String empNm) {
		this.empNm = empNm;
	}

	public String getDrctrEmpNm() {
		return drctrEmpNm;
	}

	public void setDrctrEmpNm(String drctrEmpNm) {
		this.drctrEmpNm = drctrEmpNm;
	}

	public String getOpertorEmpNm() {
		return opertorEmpNm;
	}

	public void setOpertorEmpNm(String opertorEmpNm) {
		this.opertorEmpNm = opertorEmpNm;
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

	public String getOpertSn() {
		return opertSn;
	}

	public void setOpertSn(String opertSn) {
		this.opertSn = opertSn;
	}

	public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
