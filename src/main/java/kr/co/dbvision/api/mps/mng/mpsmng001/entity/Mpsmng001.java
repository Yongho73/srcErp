package kr.co.dbvision.api.mps.mng.mpsmng001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 사용자에 관한 엔티티 클래스
 *
 * @author  표준프레임워크센터
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        표준프레임워크센터          최초 생성
 *
 * </pre>
 */
public class Mpsmng001 extends CommonVO {

	private String  salaryCd;		    //급여항목 코드     
	private String  salaryNm;		    //급여항목 이름     
	private String  paymentddtCls;		//지급공제 구분     
	private String  salaryDesc;		    //급여항목 내역     
	private String  retireamtobjYn;		//퇴직금액대상 여부  
	private String  basewageinclsYn;	//통상임금포함 여부  
	private String  avewageinclsYn;		//평균임금포함 여부  
	private String  ojtapplyYn;		    //수습적용 여부     
	private String  dhalfCalcYn;		//일할 계산 여부    
	private String  useSdt;			    //사용 시작일자     
	private String  dspOdr;			    //출력 순서       
	private String  useYn;			    //사용 여부       
	private String  accountNo;		   //계좌번호        
	private String  bugtMkYn;		    //예산편성대상여부   

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsmng001() {
    	//
    }

    public Mpsmng001(EgovMapForNull egovMap) {
        super(egovMap);
    	this.salaryCd	     = StringExpression.nullConvert(egovMap.get("salaryCd"));
    	this.salaryNm	     = StringExpression.nullConvert(egovMap.get("salaryNm"));
    	this.paymentddtCls	 = StringExpression.nullConvert(egovMap.get("paymentddtCls"));
    	this.salaryDesc	     = StringExpression.nullConvert(egovMap.get("salaryDesc"));
    	this.retireamtobjYn	 = StringExpression.nullConvert(egovMap.get("retireamtobjYn"));
    	this.basewageinclsYn = StringExpression.nullConvert(egovMap.get("basewageinclsYn"));
    	this.avewageinclsYn	 = StringExpression.nullConvert(egovMap.get("avewageinclsYn"));
    	this.ojtapplyYn	     = StringExpression.nullConvert(egovMap.get("ojtapplyYn"));
    	this.dhalfCalcYn	 = StringExpression.nullConvert(egovMap.get("dhalfCalcYn"));
    	this.useSdt		     = StringExpression.nullConvert(egovMap.get("useSdt"));
    	this.dspOdr		     = StringExpression.nullConvert(egovMap.get("dspOdr"));
    	this.useYn		     = StringExpression.nullConvert(egovMap.get("useYn"));
    	this.accountNo	     = StringExpression.nullConvert(egovMap.get("accountNo"));
    	this.bugtMkYn	     = StringExpression.nullConvert(egovMap.get("bugtMkYn"));
    }

	public String getSalaryCd() {
		return salaryCd;
	}

	public void setSalaryCd(String salaryCd) {
		this.salaryCd = salaryCd;
	}

	public String getSalaryNm() {
		return salaryNm;
	}

	public void setSalaryNm(String salaryNm) {
		this.salaryNm = salaryNm;
	}

	public String getPaymentddtCls() {
		return paymentddtCls;
	}

	public void setPaymentddtCls(String paymentddtCls) {
		this.paymentddtCls = paymentddtCls;
	}

	public String getSalaryDesc() {
		return salaryDesc;
	}

	public void setSalaryDesc(String salaryDesc) {
		this.salaryDesc = salaryDesc;
	}

	public String getRetireamtobjYn() {
		return retireamtobjYn;
	}

	public void setRetireamtobjYn(String retireamtobjYn) {
		this.retireamtobjYn = retireamtobjYn;
	}

	public String getBasewageinclsYn() {
		return basewageinclsYn;
	}

	public void setBasewageinclsYn(String basewageinclsYn) {
		this.basewageinclsYn = basewageinclsYn;
	}

	public String getAvewageinclsYn() {
		return avewageinclsYn;
	}

	public void setAvewageinclsYn(String avewageinclsYn) {
		this.avewageinclsYn = avewageinclsYn;
	}

	public String getOjtapplyYn() {
		return ojtapplyYn;
	}

	public void setOjtapplyYn(String ojtapplyYn) {
		this.ojtapplyYn = ojtapplyYn;
	}

	public String getDhalfCalcYn() {
		return dhalfCalcYn;
	}

	public void setDhalfCalcYn(String dhalfCalcYn) {
		this.dhalfCalcYn = dhalfCalcYn;
	}

	public String getUseSdt() {
		return useSdt;
	}

	public void setUseSdt(String useSdt) {
		this.useSdt = useSdt;
	}

	public String getDspOdr() {
		return dspOdr;
	}

	public void setDspOdr(String dspOdr) {
		this.dspOdr = dspOdr;
	}

	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public String getBugtMkYn() {
		return bugtMkYn;
	}

	public void setBugtMkYn(String bugtMkYn) {
		this.bugtMkYn = bugtMkYn;
	}

	public List<EgovMapForNull> getRecords() {
		return records;
	}

	public void setRecords(List<EgovMapForNull> records) {
		this.records = records;
	}

   
}
