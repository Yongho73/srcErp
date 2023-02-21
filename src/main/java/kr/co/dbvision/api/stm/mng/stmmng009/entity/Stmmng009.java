package kr.co.dbvision.api.stm.mng.stmmng009.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 다국어관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.28
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.28          디비비전              최초 생성
 * </pre>
 */

public class Stmmng009 extends CommonVO {

    /* 사전ID */
    private String dicaryId;
    /* 프로그램ID */
    private String progrmId;
    /* 영어 */
    private String eng;
    /* 레이블 */
    private String labl;
    /* 한글 */
    private String kor;
    /* 제3국 */
    private String third;
    /* 중복확인체크 */
    private String checkDicaryId;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmmng009() {
        //
    }

    public Stmmng009(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.dicaryId = StringExpression.nullConvert(egovMap.get("dicaryId"));
            this.progrmId = StringExpression.nullConvert(egovMap.get("progrmId"));
            this.eng = StringExpression.nullConvert(egovMap.get("eng"));
            this.labl = StringExpression.nullConvert(egovMap.get("labl"));
            this.kor = StringExpression.nullConvert(egovMap.get("kor"));
            this.third = StringExpression.nullConvert(egovMap.get("third"));
            this.checkDicaryId = StringExpression.nullConvert(egovMap.get("checkDicaryId"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
        }
    }

    public Stmmng009(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.dicaryId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dicaryId")));
            this.progrmId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_progrmId")));
            this.eng = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_eng")));
            this.labl = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_labl")));
            this.kor = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_kor")));
            this.third = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_third")));
            this.checkDicaryId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_checkDicaryId")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getDicaryId() {
        return dicaryId;
    }
    public void setDicaryId(String dicaryId) {
        this.dicaryId = dicaryId;
    }

    public String getProgrmId() {
        return progrmId;
    }
    public void setProgrmId(String progrmId) {
        this.progrmId = progrmId;
    }

    public String getEng() {
        return eng;
    }
    public void setEng(String eng) {
        this.eng = eng;
    }

    public String getLabl() {
        return labl;
    }
    public void setLabl(String labl) {
        this.labl = labl;
    }

    public String getKor() {
        return kor;
    }
    public void setKor(String kor) {
        this.kor = kor;
    }

    public String getThird() {
        return third;
    }
    public void setThird(String third) {
        this.third = third;
    }

    public String getCheckDicaryId() {
        return checkDicaryId;
    }
    public void setCheckDicaryId(String checkDicaryId) {
        this.checkDicaryId = checkDicaryId;
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
