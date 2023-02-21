package kr.co.dbvision.api.ets.fmg.etsfmg000.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;

/**
 * 양식항목관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2021.03.25
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.25          디비비전              최초 생성
 * </pre>
 */

public class Etsfmg000Item {

    /* 양식 순번 */
    private String raisSn;
    /* 양식 번호 */
    private String raisNo;
    /* 양식 항목수 */
    private String raisItemco;
    /* 항목명 */
    private String itemnm;
    /* 항목 형식 */
    private String itemFom;
    /* 항목 코드 */
    private String itemCode;
    /* 필수 여부 */
    private String mustAt;
    /* 사용 여부 */
    private String useAt;
    /* 항목 옵션 */
    private String itemOpt;
    /* 등록 ID */
    private String regId;
    /* 등록 일시 */
    private String regDt;
    /* 수정 ID */
    private String uptId;
    /* 수정 일시 */
    private String uptDt;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Etsfmg000Item() {
        //
    	Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
        String userId = StringExpression.nullConvert(sessionMap.get("userId"));
        this.regId = userId;
        this.uptId = userId;        
        System.out.println(String.format("%s:::[%s]", "regId", getRegId()));
        System.out.println(String.format("%s:::[%s]", "uptId", getUptId()));
    }

    public String getRaisSn() {
        return raisSn;
    }
    public void setRaisSn(String raisSn) {
        this.raisSn = raisSn;
    }

    public String getRaisNo() {
        return raisNo;
    }
    public void setRaisNo(String raisNo) {
        this.raisNo = raisNo;
    }

    public String getRaisItemco() {
        return raisItemco;
    }
    public void setRaisItemco(String raisItemco) {
        this.raisItemco = raisItemco;
    }

    public String getItemnm() {
        return itemnm;
    }
    public void setItemnm(String itemnm) {
        this.itemnm = itemnm;
    }

    public String getItemFom() {
        return itemFom;
    }
    public void setItemFom(String itemFom) {
        this.itemFom = itemFom;
    }

    public String getItemCode() {
        return itemCode;
    }
    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getMustAt() {
        return mustAt;
    }
    public void setMustAt(String mustAt) {
        this.mustAt = mustAt;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getItemOpt() {
        return itemOpt;
    }
    public void setItemOpt(String itemOpt) {
        this.itemOpt = itemOpt;
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

	public String getRegId() {
		return regId;
	}

	public void setRegId(String regId) {
		this.regId = regId;
	}

	public String getRegDt() {
		return regDt;
	}

	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}

	public String getUptId() {
		return uptId;
	}

	public void setUptId(String uptId) {
		this.uptId = uptId;
	}

	public String getUptDt() {
		return uptDt;
	}

	public void setUptDt(String uptDt) {
		this.uptDt = uptDt;
	}
}
