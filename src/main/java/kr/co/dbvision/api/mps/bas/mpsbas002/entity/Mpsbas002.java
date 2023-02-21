package kr.co.dbvision.api.mps.bas.mpsbas002.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 사회보험율관리에 관한 엔티티 클래스
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

public class Mpsbas002 extends CommonVO {

    /* 변경 일자 */
    private String changeDe;
    /* 국민연금 근로자 비율 */
    private String npnLabrrRt;
    /* 국민연금 사업자 비율 */
    private String npnBsnmRt;
    /* 국민연금 하한 금액 */
    private String npnLwltAmt;
    /* 국민연금 상한 금액 */
    private String npnUplmtAmt;
    /* 건강보험 근로자 비율 */
    private String hlthinsLabrrRt;
    /* 건강보험 사업자 비율 */
    private String hlthinsBsnmRt;
    /* 장기요양보험 건강보험 비율 */
    private String ltciHlthinsRt;
    /* 장기요양보험 근로자 비율 */
    private String ltciLabrrRt;
    /* 장기요양보험 사업자 비율 */
    private String ltciBsnmRt;
    /* 고용보험 근로자 비율 */
    private String emplyminsrncLabrrRt;
    /* 고용보험 사업자 비율 */
    private String emplyminsrncBsnmRt;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mpsbas002() {
        //
    }

    public Mpsbas002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.changeDe = StringExpression.nullConvert(egovMap.get("changeDe"));
            this.npnLabrrRt = StringExpression.nullConvert(egovMap.get("npnLabrrRt"));
            this.npnBsnmRt = StringExpression.nullConvert(egovMap.get("npnBsnmRt"));
            this.npnLwltAmt = StringExpression.nullConvert(egovMap.get("npnLwltAmt"));
            this.npnUplmtAmt = StringExpression.nullConvert(egovMap.get("npnUplmtAmt"));
            this.hlthinsLabrrRt = StringExpression.nullConvert(egovMap.get("hlthinsLabrrRt"));
            this.hlthinsBsnmRt = StringExpression.nullConvert(egovMap.get("hlthinsBsnmRt"));
            this.ltciHlthinsRt = StringExpression.nullConvert(egovMap.get("ltciHlthinsRt"));
            this.ltciLabrrRt = StringExpression.nullConvert(egovMap.get("ltciLabrrRt"));
            this.ltciBsnmRt = StringExpression.nullConvert(egovMap.get("ltciBsnmRt"));
            this.emplyminsrncLabrrRt = StringExpression.nullConvert(egovMap.get("emplyminsrncLabrrRt"));
            this.emplyminsrncBsnmRt = StringExpression.nullConvert(egovMap.get("emplyminsrncBsnmRt"));
        }
    }

    public String getChangeDe() {
        return changeDe;
    }
    public void setChangeDe(String changeDe) {
        this.changeDe = changeDe;
    }

    public String getNpnLabrrRt() {
        return npnLabrrRt;
    }
    public void setNpnLabrrRt(String npnLabrrRt) {
        this.npnLabrrRt = npnLabrrRt;
    }

    public String getNpnBsnmRt() {
        return npnBsnmRt;
    }
    public void setNpnBsnmRt(String npnBsnmRt) {
        this.npnBsnmRt = npnBsnmRt;
    }

    public String getNpnLwltAmt() {
        return npnLwltAmt;
    }
    public void setNpnLwltAmt(String npnLwltAmt) {
        this.npnLwltAmt = npnLwltAmt;
    }

    public String getNpnUplmtAmt() {
        return npnUplmtAmt;
    }
    public void setNpnUplmtAmt(String npnUplmtAmt) {
        this.npnUplmtAmt = npnUplmtAmt;
    }

    public String getHlthinsLabrrRt() {
        return hlthinsLabrrRt;
    }
    public void setHlthinsLabrrRt(String hlthinsLabrrRt) {
        this.hlthinsLabrrRt = hlthinsLabrrRt;
    }

    public String getHlthinsBsnmRt() {
        return hlthinsBsnmRt;
    }
    public void setHlthinsBsnmRt(String hlthinsBsnmRt) {
        this.hlthinsBsnmRt = hlthinsBsnmRt;
    }

    public String getLtciHlthinsRt() {
        return ltciHlthinsRt;
    }
    public void setLtciHlthinsRt(String ltciHlthinsRt) {
        this.ltciHlthinsRt = ltciHlthinsRt;
    }

    public String getLtciLabrrRt() {
        return ltciLabrrRt;
    }
    public void setLtciLabrrRt(String ltciLabrrRt) {
        this.ltciLabrrRt = ltciLabrrRt;
    }

    public String getLtciBsnmRt() {
        return ltciBsnmRt;
    }
    public void setLtciBsnmRt(String ltciBsnmRt) {
        this.ltciBsnmRt = ltciBsnmRt;
    }

    public String getEmplyminsrncLabrrRt() {
        return emplyminsrncLabrrRt;
    }
    public void setEmplyminsrncLabrrRt(String emplyminsrncLabrrRt) {
        this.emplyminsrncLabrrRt = emplyminsrncLabrrRt;
    }

    public String getEmplyminsrncBsnmRt() {
        return emplyminsrncBsnmRt;
    }
    public void setEmplyminsrncBsnmRt(String emplyminsrncBsnmRt) {
        this.emplyminsrncBsnmRt = emplyminsrncBsnmRt;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
