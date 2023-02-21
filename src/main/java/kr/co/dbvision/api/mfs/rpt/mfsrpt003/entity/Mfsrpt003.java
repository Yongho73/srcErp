package kr.co.dbvision.api.mfs.rpt.mfsrpt003.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 출장결의서에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.05.31
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.31          디비비전              최초 생성
 *
 * </pre>
 */

public class Mfsrpt003 extends CommonVO {

    /* 계정 전표 번호 */
    private String acctSlipNo;
    /* 사업장 코드 */
    private String bizplcCd;
    /* 회계 구분 */
    private String accCls;
    /* 부서 코드 */
    private String deptCd;
    /* 전표작성자 */
    private String makeEmpNo;
    /* 확인 사원 번호 */
    private String confirmEmpNo;
    /* 전표 일자 */
    private String slipDt;
    /* 전표 유형 코드 */
    private String slipTypeCd;
    /* 전표작성 일자 */
    private String slipmakeDt;
    /* 전표작성 부서 코드 */
    private String slipmakeDeptCd;
    /* 금액 */
    private String amt;
    /* 전표 수정불가 여부 */
    private String slipModifyYn;
    /* 전표 승인 일자 */
    private String slipApprDt;
    /* 전표 확정 일자 */
    private String slipFixDt;
    /* 적요 사항 */
    private String summaryDesc;
    /* 전표 자동기표 코드 */
    private String slipAutoCd;
    /* 결재 코드 */
    private String signCd;
    /* 결재 일시 */
    private String signDate;
    /* 결재 사원 번호 */
    private String signEmpNo;
    /* 결재 번호 */
    private String signNo;
    /* 회계결재 코드 */
    private String accsignCd;
    /* 회계결재 일시 */
    private String accsignDate;
    /* 회계결재 사원 번호 */
    private String accsignEmpNo;
    /* 회계결재 번호 */
    private String accsignNo;
    /* 회계 사원 번호 */
    private String accEmpNo;
    /* 승인 사원 번호 */
    private String apprEmpNo;
    /* 전표 상태 코드 */
    private String slipStatusCd;
    /* 수지 구분 */
    private String profitCls;
    /* 실 전표 번호 */
    private String realSlipNo;
    /* 청구결재 코드 */
    private String reqsignCd;
    /* 청구결재 번호 */
    private String reqsignNo;
    /* 원인행위결재 코드 */
    private String causeactsignCd;
    /* 원인행위결재 번호 */
    private String causeactsignNo;
    /* 회계 전표 결재 코드 */
    private String accSlipSignCd;
    /* 회계 전표 결재 번호 */
    private String accSlipSignNo;
    /* 회계 전표 결재 일시 */
    private String accSlipSignDate;
    /* 회계확정 일자 */
    private String accfixDt;
    /* 회계확정 번호 */
    private String accfixNo;
    /* 회계확정 사원 번호 */
    private String accfixEmpNo;
    /* 비고 */
    private String bigo;
    /* 지급 구분 */
    private String paymentCls;
    /* 상세적 */
    private String description;
    /* 신청 사원 번호 */
    private String reqEmpNo;
    /* 등록 일시 */
    private String regDate;
    /* 수정 일시 */
    private String uptDate;
    /* 등록 구분 */
    private String regCls;
    /* 예산 금액 */
    private String bugtAmt;
    /* 잔액 금액 */
    private String balanceAmt;
    /* 여입전결의서번호 */
    private String crdSlipNo;
    
    private String bugtCd;
    private String bugtNm;
    
    private String crAcctNm;
    private String drAcctNm;
    
    private String crAcctCd;
    private String drAcctCd;
    
    private String corpCd;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mfsrpt003() {
        //
    }

    public Mfsrpt003(EgovMapForNull egovMap) {
        super(egovMap);
        this.acctSlipNo = StringExpression.nullConvert(egovMap.get("acctSlipNo"));
        this.bizplcCd = StringExpression.nullConvert(egovMap.get("bizplcCd"));
        this.accCls = StringExpression.nullConvert(egovMap.get("accCls"));
        this.deptCd = StringExpression.nullConvert(egovMap.get("deptCd"));
        this.makeEmpNo = StringExpression.nullConvert(egovMap.get("makeEmpNo"));
        this.confirmEmpNo = StringExpression.nullConvert(egovMap.get("confirmEmpNo"));
        this.slipDt = StringExpression.nullConvert(egovMap.get("slipDt"));
        this.slipTypeCd = StringExpression.nullConvert(egovMap.get("slipTypeCd"));
        this.slipmakeDt = StringExpression.nullConvert(egovMap.get("slipmakeDt"));
        this.slipmakeDeptCd = StringExpression.nullConvert(egovMap.get("slipmakeDeptCd"));
        this.amt = StringExpression.nullConvert(egovMap.get("amt"));
        this.slipModifyYn = StringExpression.nullConvert(egovMap.get("slipModifyYn"));
        this.slipApprDt = StringExpression.nullConvert(egovMap.get("slipApprDt"));
        this.slipFixDt = StringExpression.nullConvert(egovMap.get("slipFixDt"));
        this.summaryDesc = StringExpression.nullConvert(egovMap.get("summaryDesc"));
        this.slipAutoCd = StringExpression.nullConvert(egovMap.get("slipAutoCd"));
        this.signCd = StringExpression.nullConvert(egovMap.get("signCd"));
        this.signDate = StringExpression.nullConvert(egovMap.get("signDate"));
        this.signEmpNo = StringExpression.nullConvert(egovMap.get("signEmpNo"));
        this.signNo = StringExpression.nullConvert(egovMap.get("signNo"));
        this.accsignCd = StringExpression.nullConvert(egovMap.get("accsignCd"));
        this.accsignDate = StringExpression.nullConvert(egovMap.get("accsignDate"));
        this.accsignEmpNo = StringExpression.nullConvert(egovMap.get("accsignEmpNo"));
        this.accsignNo = StringExpression.nullConvert(egovMap.get("accsignNo"));
        this.accEmpNo = StringExpression.nullConvert(egovMap.get("accEmpNo"));
        this.apprEmpNo = StringExpression.nullConvert(egovMap.get("apprEmpNo"));
        this.slipStatusCd = StringExpression.nullConvert(egovMap.get("slipStatusCd"));
        this.profitCls = StringExpression.nullConvert(egovMap.get("profitCls"));
        this.realSlipNo = StringExpression.nullConvert(egovMap.get("realSlipNo"));
        this.reqsignCd = StringExpression.nullConvert(egovMap.get("reqsignCd"));
        this.reqsignNo = StringExpression.nullConvert(egovMap.get("reqsignNo"));
        this.causeactsignCd = StringExpression.nullConvert(egovMap.get("causeactsignCd"));
        this.causeactsignNo = StringExpression.nullConvert(egovMap.get("causeactsignNo"));
        this.accSlipSignCd = StringExpression.nullConvert(egovMap.get("accSlipSignCd"));
        this.accSlipSignNo = StringExpression.nullConvert(egovMap.get("accSlipSignNo"));
        this.accSlipSignDate = StringExpression.nullConvert(egovMap.get("accSlipSignDate"));
        this.accfixDt = StringExpression.nullConvert(egovMap.get("accfixDt"));
        this.accfixNo = StringExpression.nullConvert(egovMap.get("accfixNo"));
        this.accfixEmpNo = StringExpression.nullConvert(egovMap.get("accfixEmpNo"));
        this.bigo = StringExpression.nullConvert(egovMap.get("bigo"));
        this.paymentCls = StringExpression.nullConvert(egovMap.get("paymentCls"));
        this.description = StringExpression.nullConvert(egovMap.get("description"));
        this.reqEmpNo = StringExpression.nullConvert(egovMap.get("reqEmpNo"));
        this.regDate = StringExpression.nullConvert(egovMap.get("regDate"));
        this.uptDate = StringExpression.nullConvert(egovMap.get("uptDate"));
        this.regCls = StringExpression.nullConvert(egovMap.get("regCls"));
        this.bugtAmt = StringExpression.nullConvert(egovMap.get("bugtAmt"));
        this.balanceAmt = StringExpression.nullConvert(egovMap.get("balanceAmt"));
        this.crdSlipNo = StringExpression.nullConvert(egovMap.get("crdSlipNo"));
        this.bugtCd = StringExpression.nullConvert(egovMap.get("bugtCd"));
        this.bugtNm = StringExpression.nullConvert(egovMap.get("bugtNm"));
        this.crAcctCd  = StringExpression.nullConvert(egovMap.get("crAcctCd"));
        this.drAcctCd  = StringExpression.nullConvert(egovMap.get("drAcctCd"));
        this.crAcctNm  =  StringExpression.nullConvert(egovMap.get("crAcctNm"));
        this.drAcctNm  =  StringExpression.nullConvert(egovMap.get("drAcctNm"));
        this.corpCd    = StringExpression.nullConvert(egovMap.get("corpCd"));
    }

    public String getAcctSlipNo() {
        return acctSlipNo;
    }
    public void setAcctSlipNo(String acctSlipNo) {
        this.acctSlipNo = acctSlipNo;
    }

    public String getBizplcCd() {
        return bizplcCd;
    }
    public void setBizplcCd(String bizplcCd) {
        this.bizplcCd = bizplcCd;
    }

    public String getAccCls() {
        return accCls;
    }
    public void setAccCls(String accCls) {
        this.accCls = accCls;
    }

    public String getDeptCd() {
        return deptCd;
    }
    public void setDeptCd(String deptCd) {
        this.deptCd = deptCd;
    }

    public String getMakeEmpNo() {
        return makeEmpNo;
    }
    public void setMakeEmpNo(String makeEmpNo) {
        this.makeEmpNo = makeEmpNo;
    }

    public String getConfirmEmpNo() {
        return confirmEmpNo;
    }
    public void setConfirmEmpNo(String confirmEmpNo) {
        this.confirmEmpNo = confirmEmpNo;
    }

    public String getSlipDt() {
        return slipDt;
    }
    public void setSlipDt(String slipDt) {
        this.slipDt = slipDt;
    }

    public String getSlipTypeCd() {
        return slipTypeCd;
    }
    public void setSlipTypeCd(String slipTypeCd) {
        this.slipTypeCd = slipTypeCd;
    }

    public String getSlipmakeDt() {
        return slipmakeDt;
    }
    public void setSlipmakeDt(String slipmakeDt) {
        this.slipmakeDt = slipmakeDt;
    }

    public String getSlipmakeDeptCd() {
        return slipmakeDeptCd;
    }
    public void setSlipmakeDeptCd(String slipmakeDeptCd) {
        this.slipmakeDeptCd = slipmakeDeptCd;
    }

    public String getAmt() {
        return amt;
    }
    public void setAmt(String amt) {
        this.amt = amt;
    }

    public String getSlipModifyYn() {
        return slipModifyYn;
    }
    public void setSlipModifyYn(String slipModifyYn) {
        this.slipModifyYn = slipModifyYn;
    }

    public String getSlipApprDt() {
        return slipApprDt;
    }
    public void setSlipApprDt(String slipApprDt) {
        this.slipApprDt = slipApprDt;
    }

    public String getSlipFixDt() {
        return slipFixDt;
    }
    public void setSlipFixDt(String slipFixDt) {
        this.slipFixDt = slipFixDt;
    }

    public String getSummaryDesc() {
        return summaryDesc;
    }
    public void setSummaryDesc(String summaryDesc) {
        this.summaryDesc = summaryDesc;
    }

    public String getSlipAutoCd() {
        return slipAutoCd;
    }
    public void setSlipAutoCd(String slipAutoCd) {
        this.slipAutoCd = slipAutoCd;
    }

    public String getSignCd() {
        return signCd;
    }
    public void setSignCd(String signCd) {
        this.signCd = signCd;
    }

    public String getSignDate() {
        return signDate;
    }
    public void setSignDate(String signDate) {
        this.signDate = signDate;
    }

    public String getSignEmpNo() {
        return signEmpNo;
    }
    public void setSignEmpNo(String signEmpNo) {
        this.signEmpNo = signEmpNo;
    }

    public String getSignNo() {
        return signNo;
    }
    public void setSignNo(String signNo) {
        this.signNo = signNo;
    }

    public String getAccsignCd() {
        return accsignCd;
    }
    public void setAccsignCd(String accsignCd) {
        this.accsignCd = accsignCd;
    }

    public String getAccsignDate() {
        return accsignDate;
    }
    public void setAccsignDate(String accsignDate) {
        this.accsignDate = accsignDate;
    }

    public String getAccsignEmpNo() {
        return accsignEmpNo;
    }
    public void setAccsignEmpNo(String accsignEmpNo) {
        this.accsignEmpNo = accsignEmpNo;
    }

    public String getAccsignNo() {
        return accsignNo;
    }
    public void setAccsignNo(String accsignNo) {
        this.accsignNo = accsignNo;
    }

    public String getAccEmpNo() {
        return accEmpNo;
    }
    public void setAccEmpNo(String accEmpNo) {
        this.accEmpNo = accEmpNo;
    }

    public String getApprEmpNo() {
        return apprEmpNo;
    }
    public void setApprEmpNo(String apprEmpNo) {
        this.apprEmpNo = apprEmpNo;
    }

    public String getSlipStatusCd() {
        return slipStatusCd;
    }
    public void setSlipStatusCd(String slipStatusCd) {
        this.slipStatusCd = slipStatusCd;
    }

    public String getProfitCls() {
        return profitCls;
    }
    public void setProfitCls(String profitCls) {
        this.profitCls = profitCls;
    }

    public String getRealSlipNo() {
        return realSlipNo;
    }
    public void setRealSlipNo(String realSlipNo) {
        this.realSlipNo = realSlipNo;
    }

    public String getReqsignCd() {
        return reqsignCd;
    }
    public void setReqsignCd(String reqsignCd) {
        this.reqsignCd = reqsignCd;
    }

    public String getReqsignNo() {
        return reqsignNo;
    }
    public void setReqsignNo(String reqsignNo) {
        this.reqsignNo = reqsignNo;
    }

    public String getCauseactsignCd() {
        return causeactsignCd;
    }
    public void setCauseactsignCd(String causeactsignCd) {
        this.causeactsignCd = causeactsignCd;
    }

    public String getCauseactsignNo() {
        return causeactsignNo;
    }
    public void setCauseactsignNo(String causeactsignNo) {
        this.causeactsignNo = causeactsignNo;
    }

    public String getAccSlipSignCd() {
        return accSlipSignCd;
    }
    public void setAccSlipSignCd(String accSlipSignCd) {
        this.accSlipSignCd = accSlipSignCd;
    }

    public String getAccSlipSignNo() {
        return accSlipSignNo;
    }
    public void setAccSlipSignNo(String accSlipSignNo) {
        this.accSlipSignNo = accSlipSignNo;
    }

    public String getAccSlipSignDate() {
        return accSlipSignDate;
    }
    public void setAccSlipSignDate(String accSlipSignDate) {
        this.accSlipSignDate = accSlipSignDate;
    }

    public String getAccfixDt() {
        return accfixDt;
    }
    public void setAccfixDt(String accfixDt) {
        this.accfixDt = accfixDt;
    }

    public String getAccfixNo() {
        return accfixNo;
    }
    public void setAccfixNo(String accfixNo) {
        this.accfixNo = accfixNo;
    }

    public String getAccfixEmpNo() {
        return accfixEmpNo;
    }
    public void setAccfixEmpNo(String accfixEmpNo) {
        this.accfixEmpNo = accfixEmpNo;
    }

    public String getBigo() {
        return bigo;
    }
    public void setBigo(String bigo) {
        this.bigo = bigo;
    }

    public String getPaymentCls() {
        return paymentCls;
    }
    public void setPaymentCls(String paymentCls) {
        this.paymentCls = paymentCls;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getReqEmpNo() {
        return reqEmpNo;
    }
    public void setReqEmpNo(String reqEmpNo) {
        this.reqEmpNo = reqEmpNo;
    }

    public String getRegDate() {
        return regDate;
    }
    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public String getUptDate() {
        return uptDate;
    }
    public void setUptDate(String uptDate) {
        this.uptDate = uptDate;
    }

    public String getRegCls() {
        return regCls;
    }
    public void setRegCls(String regCls) {
        this.regCls = regCls;
    }

    public String getBugtAmt() {
        return bugtAmt;
    }
    public void setBugtAmt(String bugtAmt) {
        this.bugtAmt = bugtAmt;
    }

    public String getBalanceAmt() {
        return balanceAmt;
    }
    public void setBalanceAmt(String balanceAmt) {
        this.balanceAmt = balanceAmt;
    }

    public String getCrdSlipNo() {
        return crdSlipNo;
    }
    public void setCrdSlipNo(String crdSlipNo) {
        this.crdSlipNo = crdSlipNo;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }

	public String getBugtCd() {
		return bugtCd;
	}

	public void setBugtCd(String bugtCd) {
		this.bugtCd = bugtCd;
	}

	public String getBugtNm() {
		return bugtNm;
	}

	public void setBugtNm(String bugtNm) {
		this.bugtNm = bugtNm;
	}

	public String getCrAcctNm() {
		return crAcctNm;
	}

	public void setCrAcctNm(String crAcctNm) {
		this.crAcctNm = crAcctNm;
	}

	public String getDrAcctNm() {
		return drAcctNm;
	}

	public void setDrAcctNm(String drAcctNm) {
		this.drAcctNm = drAcctNm;
	}

	public String getCrAcctCd() {
		return crAcctCd;
	}

	public void setCrAcctCd(String crAcctCd) {
		this.crAcctCd = crAcctCd;
	}

	public String getDrAcctCd() {
		return drAcctCd;
	}

	public void setDrAcctCd(String drAcctCd) {
		this.drAcctCd = drAcctCd;
	}

	public String getCorpCd() {
		return corpCd;
	}

	public void setCorpCd(String corpCd) {
		this.corpCd = corpCd;
	}
    
}
