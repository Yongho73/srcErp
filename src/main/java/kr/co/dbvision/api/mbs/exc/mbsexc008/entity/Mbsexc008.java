package kr.co.dbvision.api.mbs.exc.mbsexc008.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 예실대비표에 관한 엔티티 클래스
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

public class Mbsexc008 extends CommonVO {

    /* 예산 년도 */
    private String bugtYy;
    /* 예산 코드 */
    private String bugtCd;
    /* 법인 코드 */
    private String corpCd;
    /* 예산 구분 */
    private String bugtCls;
    /* 회계 구분 */
    private String accCls;
    /* 예산 명 */
    private String bugtNm;
    /* 관계정 명 */
    private String articleNm;
    /* 항목 명 */
    private String itemNm;
    /* 세항계정 명 */
    private String subitemNm;
    /* 목계정 명 */
    private String sectionNm;
    /* 세목계정 명 */
    private String subsectionNm;
    /* 세세목계정 명 */
    private String subsubsectionNm;
    /* 예산기표 여부 */
    private String bugtmarkYn;
    /* 예산통제 여부 */
    private String bugtctrlYn;
    /* 상위예산 코드 */
    private String upbugtCd;
    /* 사용 여부 */
    private String useYn;
    /* 상대 계정 코드 */
    private String offositionAcctCd;
    /* 매핑 코드 */
    private String mappingCd;
    /* 계정 코드 */
    private String acctCd;
    /* 이관 예산 코드 */
    private String oldBugtCd;
    /* 집계 여부 */
    private String smtnYn;
    /* 예산시작 일자 */
    private String startDt;
    /* 예산종료 일자 */
    private String endDt;
    /* 편성 기준 */
    private String makeupStd;
    /* 등록 일시 */
    private String regDate;
    /* 수정 일시 */
    private String uptDate;
    /* 국고보조여부(Y/N) */
    private String gukgo;
    /* 프린트 예산명 */
    private String printBugtNm;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mbsexc008() {
        //
    }

    public Mbsexc008(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.bugtYy = StringExpression.nullConvert(egovMap.get("bugtYy"));
            this.bugtCd = StringExpression.nullConvert(egovMap.get("bugtCd"));
            this.corpCd = StringExpression.nullConvert(egovMap.get("corpCd"));
            this.bugtCls = StringExpression.nullConvert(egovMap.get("bugtCls"));
            this.accCls = StringExpression.nullConvert(egovMap.get("accCls"));
            this.bugtNm = StringExpression.nullConvert(egovMap.get("bugtNm"));
            this.articleNm = StringExpression.nullConvert(egovMap.get("articleNm"));
            this.itemNm = StringExpression.nullConvert(egovMap.get("itemNm"));
            this.subitemNm = StringExpression.nullConvert(egovMap.get("subitemNm"));
            this.sectionNm = StringExpression.nullConvert(egovMap.get("sectionNm"));
            this.subsectionNm = StringExpression.nullConvert(egovMap.get("subsectionNm"));
            this.subsubsectionNm = StringExpression.nullConvert(egovMap.get("subsubsectionNm"));
            this.bugtmarkYn = StringExpression.nullConvert(egovMap.get("bugtmarkYn"));
            this.bugtctrlYn = StringExpression.nullConvert(egovMap.get("bugtctrlYn"));
            this.upbugtCd = StringExpression.nullConvert(egovMap.get("upbugtCd"));
            this.useYn = StringExpression.nullConvert(egovMap.get("useYn"));
            this.offositionAcctCd = StringExpression.nullConvert(egovMap.get("offositionAcctCd"));
            this.mappingCd = StringExpression.nullConvert(egovMap.get("mappingCd"));
            this.acctCd = StringExpression.nullConvert(egovMap.get("acctCd"));
            this.oldBugtCd = StringExpression.nullConvert(egovMap.get("oldBugtCd"));
            this.smtnYn = StringExpression.nullConvert(egovMap.get("smtnYn"));
            this.startDt = StringExpression.nullConvert(egovMap.get("startDt"));
            this.endDt = StringExpression.nullConvert(egovMap.get("endDt"));
            this.makeupStd = StringExpression.nullConvert(egovMap.get("makeupStd"));
            this.regDate = StringExpression.nullConvert(egovMap.get("regDate"));
            this.uptDate = StringExpression.nullConvert(egovMap.get("uptDate"));
            this.gukgo = StringExpression.nullConvert(egovMap.get("gukgo"));
            this.printBugtNm = StringExpression.nullConvert(egovMap.get("printBugtNm"));
        }
    }

    public String getBugtYy() {
        return bugtYy;
    }
    public void setBugtYy(String bugtYy) {
        this.bugtYy = bugtYy;
    }

    public String getBugtCd() {
        return bugtCd;
    }
    public void setBugtCd(String bugtCd) {
        this.bugtCd = bugtCd;
    }

    public String getCorpCd() {
        return corpCd;
    }
    public void setCorpCd(String corpCd) {
        this.corpCd = corpCd;
    }

    public String getBugtCls() {
        return bugtCls;
    }
    public void setBugtCls(String bugtCls) {
        this.bugtCls = bugtCls;
    }

    public String getAccCls() {
        return accCls;
    }
    public void setAccCls(String accCls) {
        this.accCls = accCls;
    }

    public String getBugtNm() {
        return bugtNm;
    }
    public void setBugtNm(String bugtNm) {
        this.bugtNm = bugtNm;
    }

    public String getArticleNm() {
        return articleNm;
    }
    public void setArticleNm(String articleNm) {
        this.articleNm = articleNm;
    }

    public String getItemNm() {
        return itemNm;
    }
    public void setItemNm(String itemNm) {
        this.itemNm = itemNm;
    }

    public String getSubitemNm() {
        return subitemNm;
    }
    public void setSubitemNm(String subitemNm) {
        this.subitemNm = subitemNm;
    }

    public String getSectionNm() {
        return sectionNm;
    }
    public void setSectionNm(String sectionNm) {
        this.sectionNm = sectionNm;
    }

    public String getSubsectionNm() {
        return subsectionNm;
    }
    public void setSubsectionNm(String subsectionNm) {
        this.subsectionNm = subsectionNm;
    }

    public String getSubsubsectionNm() {
        return subsubsectionNm;
    }
    public void setSubsubsectionNm(String subsubsectionNm) {
        this.subsubsectionNm = subsubsectionNm;
    }

    public String getBugtmarkYn() {
        return bugtmarkYn;
    }
    public void setBugtmarkYn(String bugtmarkYn) {
        this.bugtmarkYn = bugtmarkYn;
    }

    public String getBugtctrlYn() {
        return bugtctrlYn;
    }
    public void setBugtctrlYn(String bugtctrlYn) {
        this.bugtctrlYn = bugtctrlYn;
    }

    public String getUpbugtCd() {
        return upbugtCd;
    }
    public void setUpbugtCd(String upbugtCd) {
        this.upbugtCd = upbugtCd;
    }

    public String getUseYn() {
        return useYn;
    }
    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public String getOffositionAcctCd() {
        return offositionAcctCd;
    }
    public void setOffositionAcctCd(String offositionAcctCd) {
        this.offositionAcctCd = offositionAcctCd;
    }

    public String getMappingCd() {
        return mappingCd;
    }
    public void setMappingCd(String mappingCd) {
        this.mappingCd = mappingCd;
    }

    public String getAcctCd() {
        return acctCd;
    }
    public void setAcctCd(String acctCd) {
        this.acctCd = acctCd;
    }

    public String getOldBugtCd() {
        return oldBugtCd;
    }
    public void setOldBugtCd(String oldBugtCd) {
        this.oldBugtCd = oldBugtCd;
    }

    public String getSmtnYn() {
        return smtnYn;
    }
    public void setSmtnYn(String smtnYn) {
        this.smtnYn = smtnYn;
    }

    public String getStartDt() {
        return startDt;
    }
    public void setStartDt(String startDt) {
        this.startDt = startDt;
    }

    public String getEndDt() {
        return endDt;
    }
    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }

    public String getMakeupStd() {
        return makeupStd;
    }
    public void setMakeupStd(String makeupStd) {
        this.makeupStd = makeupStd;
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

    public String getGukgo() {
        return gukgo;
    }
    public void setGukgo(String gukgo) {
        this.gukgo = gukgo;
    }

    public String getPrintBugtNm() {
        return printBugtNm;
    }
    public void setPrintBugtNm(String printBugtNm) {
        this.printBugtNm = printBugtNm;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
