package kr.co.dbvision.api.mhs.hrm.mhshrm007.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 학교코드관리에 관한 엔티티 클래스
 *
 * @author 디비비전
<<<<<<< HEAD
 * @since 2019.05.13
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.13          디비비전              최초 생성
=======
 * @since 2019.05.10
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.10          디비비전              최초 생성
>>>>>>> branch 'master' of ssh://git@112.171.126.71/second/git/repos/dbvision_xerp01
 *
 * </pre>
 */

public class Mhshrm007 extends CommonVO {

    /* 학교 코드 */
    private String schulCode;
    /* 학교 명 */
    private String schulNm;
    /* 지역 코드 */
    private String areaCode;
    /* 학교 구분 */
    private String schulSe;
    /* 우편번호 */
    private String zip;
    /* 주소 */
    private String adres;
    /* 전화번호 */
    private String telno;
    /* 팩스 전화번호 */
    private String faxTelno;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrm007() {
        //
    }

    public Mhshrm007(EgovMapForNull egovMap) {
        super(egovMap);
        this.schulCode = StringExpression.nullConvert(egovMap.get("schulCode"));
        this.schulNm = StringExpression.nullConvert(egovMap.get("schulNm"));
        this.areaCode = StringExpression.nullConvert(egovMap.get("areaCode"));
        this.schulSe = StringExpression.nullConvert(egovMap.get("schulSe"));
        this.zip = StringExpression.nullConvert(egovMap.get("zip"));
        this.adres = StringExpression.nullConvert(egovMap.get("adres"));
        this.telno = StringExpression.nullConvert(egovMap.get("telno"));
        this.faxTelno = StringExpression.nullConvert(egovMap.get("faxTelno"));
    }

    public String getSchulCode() {
        return schulCode;
    }
    public void setSchulCode(String schulCode) {
        this.schulCode = schulCode;
    }

    public String getSchulNm() {
        return schulNm;
    }
    public void setSchulNm(String schulNm) {
        this.schulNm = schulNm;
    }

    public String getAreaCode() {
        return areaCode;
    }
    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getSchulSe() {
        return schulSe;
    }
    public void setSchulSe(String schulSe) {
        this.schulSe = schulSe;
    }

    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getAdres() {
        return adres;
    }
    public void setAdres(String adres) {
        this.adres = adres;
    }

    public String getTelno() {
        return telno;
    }
    public void setTelno(String telno) {
        this.telno = telno;
    }

    public String getFaxTelno() {
        return faxTelno;
    }
    public void setFaxTelno(String faxTelno) {
        this.faxTelno = faxTelno;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
