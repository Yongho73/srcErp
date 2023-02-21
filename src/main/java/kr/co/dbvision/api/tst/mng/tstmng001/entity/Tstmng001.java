package kr.co.dbvision.api.tst.mng.tstmng001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 테스트관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.04.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.16          디비비전              최초 생성
 * </pre>
 */

public class Tstmng001 extends CommonVO {

    /* 한글 약어 명 */
    private String korAbrvNm;
    /* 영문 약어 명 */
    private String engAbrvNm;
    /* 도메인 여부 */
    private String domnAt;
    /* 영문 설명 */
    private String engDc;
    /* 한글 설명 */
    private String korDc;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Tstmng001() {
        //
    }

    public Tstmng001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.korAbrvNm = StringExpression.nullConvert(egovMap.get("korAbrvNm"));
            this.engAbrvNm = StringExpression.nullConvert(egovMap.get("engAbrvNm"));
            this.domnAt = StringExpression.nullConvert(egovMap.get("domnAt"));
            this.engDc = StringExpression.nullConvert(egovMap.get("engDc"));
            this.korDc = StringExpression.nullConvert(egovMap.get("korDc"));
        }
    }

    public Tstmng001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.korAbrvNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c2")));
            this.engAbrvNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c3")));
            this.domnAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c4")));
            this.engDc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c5")));
            this.korDc = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_c6")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getKorAbrvNm() {
        return korAbrvNm;
    }
    public void setKorAbrvNm(String korAbrvNm) {
        this.korAbrvNm = korAbrvNm;
    }

    public String getEngAbrvNm() {
        return engAbrvNm;
    }
    public void setEngAbrvNm(String engAbrvNm) {
        this.engAbrvNm = engAbrvNm;
    }

    public String getDomnAt() {
        return domnAt;
    }
    public void setDomnAt(String domnAt) {
        this.domnAt = domnAt;
    }

    public String getEngDc() {
        return engDc;
    }
    public void setEngDc(String engDc) {
        this.engDc = engDc;
    }

    public String getKorDc() {
        return korDc;
    }
    public void setKorDc(String korDc) {
        this.korDc = korDc;
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
