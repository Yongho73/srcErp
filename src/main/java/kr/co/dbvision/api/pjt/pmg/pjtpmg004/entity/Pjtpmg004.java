package kr.co.dbvision.api.pjt.pmg.pjtpmg004.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 프로젝트별투입현황에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.01.15
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.15          디비비전              최초 생성
 *
 * </pre>
 */

public class Pjtpmg004 extends CommonVO {

    /* 인력 실적 순번 */
    private String hnfAcmsltSn;
    /* 실적 기준 일자 */
    private String acmsltStdrDe;
    /* 참여 M/M */
    private String partcptnManMonth;
    /* 기술 등급 */
    private String tchnlgyGrad;
    /* 참여자 명 */
    private String prtcpntNm;
    /* 역할 코드 */
    private String roleCode;
    /* 외부 용역 여부 */
    private String extrlServcAt;
    /* 참여자 사원번호 */
    private String partcptnEmpno;
    /* 산출물 순번 */
    private String outputSn;
    /* 프로젝트 순번 */
    private String projectSn;
    
    private String baseYear;
    
    private String projectNm;
    
    private String projectPmNm;
    
    private String projectDe;
    
    private String psum;
    
    private String c1;
    private String c2;
    private String c3;
    private String c4;
    private String c5;
    private String c6;
    private String c7;
    private String c8;
    private String c9;
    private String c10;
    private String c11;
    private String c12;
    
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Pjtpmg004() {
        //
    }

    public Pjtpmg004(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.hnfAcmsltSn = StringExpression.nullConvert(egovMap.get("hnfAcmsltSn"));
            this.acmsltStdrDe = StringExpression.nullConvert(egovMap.get("acmsltStdrDe"));
            this.partcptnManMonth = StringExpression.nullConvert(egovMap.get("partcptnManMonth"));
            this.tchnlgyGrad = StringExpression.nullConvert(egovMap.get("tchnlgyGrad"));
            this.prtcpntNm = StringExpression.nullConvert(egovMap.get("prtcpntNm"));
            this.roleCode = StringExpression.nullConvert(egovMap.get("roleCode"));
            this.extrlServcAt = StringExpression.nullConvert(egovMap.get("extrlServcAt"));
            this.partcptnEmpno = StringExpression.nullConvert(egovMap.get("partcptnEmpno"));
            this.outputSn = StringExpression.nullConvert(egovMap.get("outputSn"));
            this.projectSn = StringExpression.nullConvert(egovMap.get("projectSn"));
            this.baseYear = StringExpression.nullConvert(egovMap.get("baseYear"));
            this.projectNm = StringExpression.nullConvert(egovMap.get("projectNm"));
            this.projectPmNm = StringExpression.nullConvert(egovMap.get("projectPmNm"));
            this.projectDe = StringExpression.nullConvert(egovMap.get("projectDe"));
            this.psum = StringExpression.nullConvert(egovMap.get("psum"));
            this.c1 = StringExpression.nullConvert(egovMap.get("c1"));
            this.c2 = StringExpression.nullConvert(egovMap.get("c2"));
            this.c3 = StringExpression.nullConvert(egovMap.get("c3"));
            this.c4 = StringExpression.nullConvert(egovMap.get("c4"));
            this.c5 = StringExpression.nullConvert(egovMap.get("c5"));
            this.c6 = StringExpression.nullConvert(egovMap.get("c6"));
            this.c7 = StringExpression.nullConvert(egovMap.get("c7"));
            this.c8 = StringExpression.nullConvert(egovMap.get("c8"));
            this.c9 = StringExpression.nullConvert(egovMap.get("c9"));
            this.c10 = StringExpression.nullConvert(egovMap.get("c10"));
            this.c11 = StringExpression.nullConvert(egovMap.get("c11"));
            this.c12 = StringExpression.nullConvert(egovMap.get("c12"));
            
            
            
        }
    }

    public String getHnfAcmsltSn() {
        return hnfAcmsltSn;
    }
    public void setHnfAcmsltSn(String hnfAcmsltSn) {
        this.hnfAcmsltSn = hnfAcmsltSn;
    }

    public String getAcmsltStdrDe() {
        return acmsltStdrDe;
    }
    public void setAcmsltStdrDe(String acmsltStdrDe) {
        this.acmsltStdrDe = acmsltStdrDe;
    }

    public String getPartcptnManMonth() {
        return partcptnManMonth;
    }
    public void setPartcptnManMonth(String partcptnManMonth) {
        this.partcptnManMonth = partcptnManMonth;
    }

    public String getTchnlgyGrad() {
        return tchnlgyGrad;
    }
    public void setTchnlgyGrad(String tchnlgyGrad) {
        this.tchnlgyGrad = tchnlgyGrad;
    }

    public String getPrtcpntNm() {
        return prtcpntNm;
    }
    public void setPrtcpntNm(String prtcpntNm) {
        this.prtcpntNm = prtcpntNm;
    }

    public String getRoleCode() {
        return roleCode;
    }
    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public String getExtrlServcAt() {
        return extrlServcAt;
    }
    public void setExtrlServcAt(String extrlServcAt) {
        this.extrlServcAt = extrlServcAt;
    }

    public String getPartcptn자Empno() {
        return partcptnEmpno;
    }
    public void setPartcptn자Empno(String partcptn자Empno) {
        this.partcptnEmpno = partcptnEmpno;
    }

    public String getOutputSn() {
        return outputSn;
    }
    public void setOutputSn(String outputSn) {
        this.outputSn = outputSn;
    }

    public String getProjectSn() {
        return projectSn;
    }
    public void setProjectSn(String projectSn) {
        this.projectSn = projectSn;
    }

    public String getBaseYear() {
		return baseYear;
	}

	public void setBaseYear(String baseYear) {
		this.baseYear = baseYear;
	}

	public String getProjectNm() {
		return projectNm;
	}

	public void setProjectNm(String projectNm) {
		this.projectNm = projectNm;
	}

	public String getProjectPmNm() {
		return projectPmNm;
	}

	public void setProjectPmNm(String projectPmNm) {
		this.projectPmNm = projectPmNm;
	}

	public String getProjectDe() {
		return projectDe;
	}

	public void setProjectDe(String projectDe) {
		this.projectDe = projectDe;
	}

	public String getPsum() {
		return psum;
	}

	public void setPsum(String psum) {
		this.psum = psum;
	}

	public String getC1() {
		return c1;
	}

	public void setC1(String c1) {
		this.c1 = c1;
	}

	public String getC2() {
		return c2;
	}

	public void setC2(String c2) {
		this.c2 = c2;
	}

	public String getC3() {
		return c3;
	}

	public void setC3(String c3) {
		this.c3 = c3;
	}

	public String getC4() {
		return c4;
	}

	public void setC4(String c4) {
		this.c4 = c4;
	}

	public String getC5() {
		return c5;
	}

	public void setC5(String c5) {
		this.c5 = c5;
	}

	public String getC6() {
		return c6;
	}

	public void setC6(String c6) {
		this.c6 = c6;
	}

	public String getC7() {
		return c7;
	}

	public void setC7(String c7) {
		this.c7 = c7;
	}

	public String getC8() {
		return c8;
	}

	public void setC8(String c8) {
		this.c8 = c8;
	}

	public String getC9() {
		return c9;
	}

	public void setC9(String c9) {
		this.c9 = c9;
	}

	public String getC10() {
		return c10;
	}

	public void setC10(String c10) {
		this.c10 = c10;
	}

	public String getC11() {
		return c11;
	}

	public void setC11(String c11) {
		this.c11 = c11;
	}

	public String getC12() {
		return c12;
	}

	public void setC12(String c12) {
		this.c12 = c12;
	}

	public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
