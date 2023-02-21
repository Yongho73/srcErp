package kr.co.dbvision.api.ets.bst.etsbst002.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 문서번호관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.03.27
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.27          디비비전              최초 생성
 * </pre>
 */

public class Etsbst002 extends CommonVO {

    /* 번호 설정 번호 */
    private String noSettingNo;
    /* 설정 코드 */
    private String settingCode;
    /* 입력 텍스트 */
    private String inputText;
    /* 적용 년도 */
    private String applcYy;
    /* 사용여부 */
    private String useAt;
    /* 제목 */
    private String tit;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Etsbst002() {
        //
    }

    public Etsbst002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.noSettingNo = StringExpression.nullConvert(egovMap.get("noSettingNo"));
            this.settingCode = StringExpression.nullConvert(egovMap.get("settingCode"));
            this.inputText = StringExpression.nullConvert(egovMap.get("inputText"));
            this.applcYy = StringExpression.nullConvert(egovMap.get("applcYy"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.tit = StringExpression.nullConvert(egovMap.get("tit"));
        }
    }

    public Etsbst002(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.noSettingNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.settingCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.inputText = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            this.applcYy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.tit = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c7")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getNoSettingNo() {
        return noSettingNo;
    }
    public void setNoSettingNo(String noSettingNo) {
        this.noSettingNo = noSettingNo;
    }

    public String getSettingCode() {
        return settingCode;
    }
    public void setSettingCode(String settingCode) {
        this.settingCode = settingCode;
    }

    public String getInputText() {
        return inputText;
    }
    public void setInputText(String inputText) {
        this.inputText = inputText;
    }

    public String getApplcYy() {
        return applcYy;
    }
    public void setApplcYy(String applcYy) {
        this.applcYy = applcYy;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getTit() {
        return tit;
    }
    public void setTit(String tit) {
        this.tit = tit;
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
}
