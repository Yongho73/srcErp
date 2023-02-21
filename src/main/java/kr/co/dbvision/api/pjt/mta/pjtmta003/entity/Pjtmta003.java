package kr.co.dbvision.api.pjt.mta.pjtmta003.entity;

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

public class Pjtmta003 extends CommonVO {

    /* 프로젝트 순번 */
    private String projectSn;
    /* 요청 순번 */
    private String requstSn;
    /* 요청 일시 */
    private String requstDt;
    /* 요청 내용 */
    private String requstCn;
    /* 완료일자 */
    private String comptDe;
    /* 첨부파일 순번 */
    private String atchmnflSn;
    /* 작업자 사원번호 */
    private String opertorEmpno;
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
    /* 거래처명 */
    private String bcncNm;
    /* 프로젝트명 */
    private String projectNm;
    /* 사원번호 */
	private String empno;
    /* 사원명 */
    private String empNm;
    /* 보고년월 */
    private String reportYm;
    /* 보고시작일 */
    private String reportStrDt;
	/* 보고종료일 */
    private String reportEndDt;
    /* 차월계획 */
    private String nextMtReport;
    /* 이슈사항 */
    private String issueDesc;
	/* 미결업무 및 대책 */
    private String nonsolutDesc;
    /* 미처리 요청건수  */
    private String requstCount;
	/* 작성일 */
    private String writeDt;
    
    /* 출력여부 */
    private String printChk;
	/* 출력년월 */
    private String printYm;
	/* 승인여부 */
    private String comptConfmAt;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Pjtmta003() {
        //
    }

    public Pjtmta003(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.projectSn = StringExpression.nullConvert(egovMap.get("projectSn"));
            this.requstSn = StringExpression.nullConvert(egovMap.get("requstSn"));
            this.requstDt = StringExpression.nullConvert(egovMap.get("requstDt"));
            this.requstCn = StringExpression.nullConvert(egovMap.get("requstCn"));
            this.comptDe = StringExpression.nullConvert(egovMap.get("comptDe"));
            this.atchmnflSn = StringExpression.nullConvert(egovMap.get("atchmnflSn"));
            this.opertorEmpno = StringExpression.nullConvert(egovMap.get("opertorEmpno"));
            this.requstMenu = StringExpression.nullConvert(egovMap.get("requstMenu"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.bcncNm = StringExpression.nullConvert(egovMap.get("bcncNm"));
            this.projectNm = StringExpression.nullConvert(egovMap.get("projectNm"));
            this.reportYm = StringExpression.nullConvert(egovMap.get("reportYm"));
            this.reportStrDt = StringExpression.nullConvert(egovMap.get("reportStrDt"));
            this.reportEndDt = StringExpression.nullConvert(egovMap.get("reportEndDt"));
            this.nextMtReport = StringExpression.nullConvert(egovMap.get("nextMtReport"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.empNm = StringExpression.nullConvert(egovMap.get("empNm"));
            this.requstCount = StringExpression.nullConvert(egovMap.get("requstCount"));
            this.issueDesc = StringExpression.nullConvert(egovMap.get("issueDesc"));
            this.nonsolutDesc = StringExpression.nullConvert(egovMap.get("nonsolutDesc"));
            this.writeDt = StringExpression.nullConvert(egovMap.get("writeDt"));

            this.printChk = StringExpression.nullConvert(egovMap.get("printChk"));
            this.printYm = StringExpression.nullConvert(egovMap.get("printYm"));
            this.comptConfmAt = StringExpression.nullConvert(egovMap.get("comptConfmAt"));
        }
    }

    public Pjtmta003(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.projectSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_projectSn")));
            this.requstSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstSn")));
            this.requstDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstDt")));
            this.requstCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstCn")));
            this.comptDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_comptDe")));
            this.atchmnflSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflSn")));
            this.opertorEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_opertorEmpno")));
            this.requstMenu = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstMenu")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.reportYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reportYm")));
            this.reportStrDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reportStrDt")));
            this.reportEndDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reportEndDt")));
            this.nextMtReport = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nextMtReport")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.empNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empNm")));
            this.requstCount = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_requstCount")));
            this.issueDesc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_issueDesc")));
            this.nonsolutDesc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nonsolutDesc")));
            this.writeDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_writeDt")));
            
            this.printChk = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_printChk")));
            this.printYm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_printYm")));
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

	public String getProjectSn() {
        return projectSn;
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

    public String getRequstDt() {
        return requstDt;
    }
    public void setRequstDt(String requstDt) {
        this.requstDt = requstDt;
    }

    public String getRequstCn() {
        return requstCn;
    }
    public void setRequstCn(String requstCn) {
        this.requstCn = requstCn;
    }

    public String getComptDe() {
        return comptDe;
    }
    public void setComptDe(String comptDe) {
        this.comptDe = comptDe;
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

    public String getReportYm() {
        return reportYm;
    }

    public void setReportYm(String reportYm) {
        this.reportYm = reportYm;
    }

    public String getNextMtReport() {
        return nextMtReport;
    }

    public void setNextMtReport(String nextMtReport) {
        this.nextMtReport = nextMtReport;
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
    
    public String getEmpno() {
		return empno;
	}

	public void setEmpno(String empno) {
		this.empno = empno;
	}

	public String getEmpNm() {
		return empNm;
	}

	public void setEmpNm(String empNm) {
		this.empNm = empNm;
	}

	public String getRequstCount() {
		return requstCount;
	}

	public void setRequstCount(String requstCount) {
		this.requstCount = requstCount;
	}
    public String getReportStrDt() {
		return reportStrDt;
	}

	public void setReportStrDt(String reportStrDt) {
		this.reportStrDt = reportStrDt;
	}

	public String getReportEndDt() {
		return reportEndDt;
	}

	public void setReportEndDt(String reportEndDt) {
		this.reportEndDt = reportEndDt;
	}
    public String getIssueDesc() {
		return issueDesc;
	}

	public void setIssueDesc(String issueDesc) {
		this.issueDesc = issueDesc;
	}

	public String getNonsolutDesc() {
		return nonsolutDesc;
	}

	public void setNonsolutDesc(String nonsolutDesc) {
		this.nonsolutDesc = nonsolutDesc;
	}

    public String getWriteDt() {
		return writeDt;
	}

	public void setWriteDt(String writeDt) {
		this.writeDt = writeDt;
	}
	
    public String getPrintChk() {
		return printChk;
	}

	public void setPrintChk(String printChk) {
		this.printChk = printChk;
	}

	public String getPrintYm() {
		return printYm;
	}

	public void setPrintYm(String printYm) {
		this.printYm = printYm;
	}

	public String getComptConfmAt() {
		return comptConfmAt;
	}

	public void setComptConfmAt(String comptConfmAt) {
		this.comptConfmAt = comptConfmAt;
	}

}
