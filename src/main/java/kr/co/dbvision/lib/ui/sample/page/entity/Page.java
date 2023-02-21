package kr.co.dbvision.lib.ui.sample.page.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

public class Page extends CommonVO {

	/* 번호 */
    private int num;
	private String nm1;
	private String nm2;
	private String nm3;
	private int amt;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();


	public Page() {
		//
	}
	
	public Page(EgovMapForNull egovMap) {
		super(egovMap);
		if(egovMap.get("num") != null) {
        	this.num = (int) egovMap.get("num");
        }
        else {
        	this.num = 1;
        }
		this.nm1 = StringExpression.nullConvert(egovMap.get("nm1"));
		this.nm2 = StringExpression.nullConvert(egovMap.get("nm2"));
		this.nm3 = StringExpression.nullConvert(egovMap.get("nm3"));
		if(egovMap.get("amt") != null) {
        	this.amt = (int) egovMap.get("amt");
        }
        else {
        	this.amt = 1;
        }
	}

    public int getNum() {
        return num;
    }
    
    public void setNum(int num) {
        this.num = num;
    }

	public String getNm1() {
		return nm1;
	}

	public void setNm1(String nm1) {
		this.nm1 = nm1;
	}

	public String getNm2() {
		return nm2;
	}

	public void setNm2(String nm2) {
		this.nm2 = nm2;
	}


	public String getNm3() {
		return nm3;
	}

	public void setNm3(String nm3) {
		this.nm3 = nm3;
	}

	public int getAmt() {
		return amt;
	}

	public void setAmt(int amt) {
		this.amt = amt;
	}

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
