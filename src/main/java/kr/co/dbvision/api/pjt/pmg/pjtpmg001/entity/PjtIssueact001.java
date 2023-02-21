package kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 테스트관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.02.27
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.27          디비비전              최초 생성
 * </pre>
 */

public class PjtIssueact001 extends CommonVO {

    /* 프로젝트 순번 */
    private String projectSn;
    /* 이슈 순번 */
    private String issueSn;
    /* 활동 순번 */
    private String actSn;
    /* 활동 일시 */
    private String actDe;
    /* 활동 내용 */
    private String actCn;
    /* 활동자 */
    private String actor;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public PjtIssueact001() {
        //
    }

    public PjtIssueact001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.projectSn = StringExpression.nullConvert(egovMap.get("projectSn"));
            this.issueSn = StringExpression.nullConvert(egovMap.get("issueSn"));
            this.actSn = StringExpression.nullConvert(egovMap.get("actSn"));
            this.actDe = StringExpression.nullConvert(egovMap.get("actDe"));
            this.actCn = StringExpression.nullConvert(egovMap.get("actCn"));
            this.actor = StringExpression.nullConvert(egovMap.get("actor"));
        }
    }

    public PjtIssueact001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {              
            this.actDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.actCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.projectSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.issueSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c8")));
            this.actSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c9")));
            this.actor = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c10")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getProjectSn() {
        return projectSn;
    }
    public void setProjectSn(String projectSn) {
        this.projectSn = projectSn;
    }

    public String getIssueSn() {
        return issueSn;
    }
    public void setIssueSn(String issueSn) {
        this.issueSn = issueSn;
    }

    public String getActSn() {
        return actSn;
    }
    public void setActSn(String actSn) {
        this.actSn = actSn;
    }

    public String getActDe() {
        return actDe;
    }
    public void setActDe(String actDe) {
        this.actDe = actDe;
    }

    public String getActCn() {
        return actCn;
    }
    public void setActCn(String actCn) {
        this.actCn = actCn;
    }

    public String getActor() {
        return actor;
    }
    public void setActor(String actor) {
        this.actor = actor;
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

	@Override
	public String toString() {
		return "PjtIssueact001 [projectSn=" + projectSn + ", issueSn=" + issueSn + ", actSn=" + actSn + ", actDe="
				+ actDe + ", actCn=" + actCn + ", actor=" + actor + ", nativeeditorStatus=" + nativeeditorStatus
				+ ", records=" + records + "]";
	}
    
    
}
