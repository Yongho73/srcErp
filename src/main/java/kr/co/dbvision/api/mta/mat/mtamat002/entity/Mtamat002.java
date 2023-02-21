package kr.co.dbvision.api.mta.mat.mtamat002.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 유지보수요청요약에 관한 엔티티 클래스
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

public class Mtamat002 extends CommonVO {

    /* 프로젝트 번호 */
    private String projectNo;
    /* 거래처 이름 */
    private String compNm;
    /* 요청 건수 */
    private String reqCnt;
    /* 해결 건수 */
    private String clearCnt;
    /* 미해결 건수 */
    private String unclearCnt;
    /* 승인 건수 */
    private String compCnt;
    /* 요청자 이메일 */
    private String prgsRt;
    /* 완료 요구 일시 */
    private String periodCnt;
    
    private String payperiodRt;
    
    private String totalperiod;
    /* 요청 내용 */
    private String avgComp;
    /* 우선 순위 */
    private String avgConfm;
    
    private String rnum;
   
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mtamat002() {
        //
    }

    public Mtamat002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.projectNo = StringExpression.nullConvert(egovMap.get("projectNo"));
            this.compNm = StringExpression.nullConvert(egovMap.get("compNm"));
            this.reqCnt = StringExpression.nullConvert(egovMap.get("reqCnt"));
            this.clearCnt = StringExpression.nullConvert(egovMap.get("clearCnt"));
            this.unclearCnt = StringExpression.nullConvert(egovMap.get("unclearCnt"));
            this.compCnt = StringExpression.nullConvert(egovMap.get("compCnt"));
            this.prgsRt = StringExpression.nullConvert(egovMap.get("prgsRt"));
            this.payperiodRt = StringExpression.nullConvert(egovMap.get("payperiodRt"));
            this.avgComp = StringExpression.nullConvert(egovMap.get("avgComp"));
            this.avgConfm = StringExpression.nullConvert(egovMap.get("avgConfm"));
            this.periodCnt = StringExpression.nullConvert(egovMap.get("periodCnt"));
            this.totalperiod = StringExpression.nullConvert(egovMap.get("periodCnt"));
            this.rnum = StringExpression.nullConvert(egovMap.get("rnum"));
        }
    }
    
    public String getProjectNo() {
		return projectNo;
	}

	public void setProjectNo(String projectNo) {
		this.projectNo = projectNo;
	}

	public String getCompNm() {
		return compNm;
	}

	public void setCompNm(String compNm) {
		this.compNm = compNm;
	}

	public String getReqCnt() {
		return reqCnt;
	}

	public void setReqCnt(String reqCnt) {
		this.reqCnt = reqCnt;
	}

	public String getClearCnt() {
		return clearCnt;
	}

	public void setClearCnt(String clearCnt) {
		this.clearCnt = clearCnt;
	}

	public String getUnclearCnt() {
		return unclearCnt;
	}

	public void setUnclearCnt(String unclearCnt) {
		this.unclearCnt = unclearCnt;
	}

	public String getCompCnt() {
		return compCnt;
	}

	public void setCompCnt(String compCnt) {
		this.compCnt = compCnt;
	}

	public String getPrgsRt() {
		return prgsRt;
	}

	public void setPrgsRt(String prgsRt) {
		this.prgsRt = prgsRt;
	}

	public String getPeriodCnt() {
		return periodCnt;
	}

	public void setPeriodCnt(String periodCnt) {
		this.periodCnt = periodCnt;
	}
	
	public String getTotalperiod() {
        return totalperiod;
    }

    public void setTotalperiod(String totalperiod) {
        this.totalperiod = totalperiod;
    }

	public String getPayperiodRt() {
		return payperiodRt;
	}

	public void setPayperiodRt(String payperiodRt) {
		this.payperiodRt = payperiodRt;
	}

	public String getAvgComp() {
		return avgComp;
	}

	public void setAvgComp(String avgComp) {
		this.avgComp = avgComp;
	}

	public String getAvgConfm() {
		return avgConfm;
	}

	public void setAvgConfm(String avgConfm) {
		this.avgConfm = avgConfm;
	}
	
	public String getRnum() {
		return rnum;
	}

	public void setRnum(String rnum) {
		this.rnum = rnum;
	}

	public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
