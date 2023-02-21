package kr.co.dbvision.api.pub.usr.pubusr002.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 개인정보변경신청관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2021.06.01
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.01)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.01          디비비전              최초 생성
 * </pre>
 */

public class Pubusr002 extends CommonVO {

	/* 사원번호 */
    private String empno;
    private String empNm;
    /* 사용자 */
    private String passwordSettingMth;
    private String userPassword;
    /* 변경 신청 순번 */
    private String changeReqstSn;
    /* 신청 일자 */
    private String reqstDe;
    /* 변경 구분 */
    private String changeSe;
    private String changeSeNm;
    /* 첨부파일 번호 */
    private String atchmnflNo;
    /* 승인 상태 코드 */
    private String confmSttusCode;
    private String confmSttusCodeNm;
    /* 승인 일자 */
    private String confmDe;
    /* 승인 사원번호 */
    private String confmEmpno;
    /* 반려 사유 */
    private String returnResn;
    /* 등록 일시 */
    private String regDt;
    /* 등록 ID */
//    private String regId;
    /* 수정 일시 */
    private String uptDt;
    /* 수정 ID */
//    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();
       
    
    /* 변경전 변경후 구분 */
    private String bfchgAfchgSe;
    /* 한글 명 */
    private String bfKorNm;
    private String korNm;
    /* 영문 명 */
    private String bfEngNm;
    private String engNm;
    /* 한자 명 */
    private String bfChcrtNm;
    private String chcrtNm;
    /* 자택 우편번호 */
    private String zip;
    private String bfOwnhomZip;
    private String ownhomZip;
    /* 자택 주소 */
    private String bfOwnhomAdres;
    private String ownhomAdres;
    /* 자택 상세 주소 */
    private String bfOwnhomDetailAdres;
    private String ownhomDetailAdres;
    /* 자택 전화번호 */
    private String bfOwnhomTelno;
    private String ownhomTelno;
    /* 내선 전화번호 */
    private String bfLxtnTelno;
    private String lxtnTelno;
    /* 휴대폰번호 */
    private String bfMbtlnum;
    private String mbtlnum;
    /* 비상 전화번호 */
    private String bfEmgncTelno;
    private String emgncTelno;
    /* 이메일 */
    private String bfEmail;
    private String email;
    /* 개인 이메일 */
    private String bfIndvdlEmail;
    private String indvdlEmail;
    /* 생년월일 */
    private String bfBrthdy;
    private String brthdy;
    /* 양력 여부 */
    private String bfSlrcldAt;
    private String slrcldAt;
    /* 결혼 여부 */
    private String bfMrrgAt;
    private String mrrgAt;
    /* 결혼 일자 */
    private String bfMrrgDe;
    private String mrrgDe;
    /* 사진 첨부파일 번호 */
    private String bfPhotoAtchmnflNo;
    private String photoAtchmnflNo;
    /*변경이력용*/
    /*변경구분*/
    private String changeSeHist;
    /*변경메뉴ID*/
    private String changeMenuId;
    /*변경요청IP*/
    private String changeRequstIp;
    /*변경원인구분*/
    private String changeCauseSe;
    /*변경이력용*/

    public Pubusr002() {
        //
    }

    public Pubusr002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.empNm = StringExpression.nullConvert(egovMap.get("empNm"));
            this.userPassword = StringExpression.nullConvert(egovMap.get("userPassword"));
            this.passwordSettingMth = StringExpression.nullConvert(egovMap.get("passwordSettingMth"));
            this.changeReqstSn = StringExpression.nullConvert(egovMap.get("changeReqstSn"));
            this.reqstDe = StringExpression.nullConvert(egovMap.get("reqstDe"));
            this.changeSe = StringExpression.nullConvert(egovMap.get("changeSe"));
            this.changeSeNm = StringExpression.nullConvert(egovMap.get("changeSeNm"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.confmSttusCode = StringExpression.nullConvert(egovMap.get("confmSttusCode"));
            this.confmSttusCodeNm = StringExpression.nullConvert(egovMap.get("confmSttusCodeNm"));
            this.confmDe = StringExpression.nullConvert(egovMap.get("confmDe"));
            this.confmEmpno = StringExpression.nullConvert(egovMap.get("confmEmpno"));
            this.returnResn = StringExpression.nullConvert(egovMap.get("returnResn"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
//            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
//            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            
            this.bfchgAfchgSe = StringExpression.nullConvert(egovMap.get("bfchgAfchgSe"));
            this.korNm = StringExpression.nullConvert(egovMap.get("korNm"));
            this.engNm = StringExpression.nullConvert(egovMap.get("engNm"));
            this.chcrtNm = StringExpression.nullConvert(egovMap.get("chcrtNm"));
            this.zip = StringExpression.nullConvert(egovMap.get("zip"));
            this.ownhomZip = StringExpression.nullConvert(egovMap.get("ownhomZip"));
            this.ownhomAdres = StringExpression.nullConvert(egovMap.get("ownhomAdres"));
            this.ownhomDetailAdres = StringExpression.nullConvert(egovMap.get("ownhomDetailAdres"));
            this.ownhomTelno = StringExpression.nullConvert(egovMap.get("ownhomTelno"));
            this.lxtnTelno = StringExpression.nullConvert(egovMap.get("lxtnTelno"));
            this.mbtlnum = StringExpression.nullConvert(egovMap.get("mbtlnum"));
            this.emgncTelno = StringExpression.nullConvert(egovMap.get("emgncTelno"));
            this.email = StringExpression.nullConvert(egovMap.get("email"));
            this.indvdlEmail = StringExpression.nullConvert(egovMap.get("indvdlEmail"));
            this.brthdy = StringExpression.nullConvert(egovMap.get("brthdy"));
            this.slrcldAt = StringExpression.nullConvert(egovMap.get("slrcldAt"));
            this.mrrgAt = StringExpression.nullConvert(egovMap.get("mrrgAt"));
            this.mrrgDe = StringExpression.nullConvert(egovMap.get("mrrgDe"));
            this.photoAtchmnflNo = StringExpression.nullConvert(egovMap.get("photoAtchmnflNo"));
            
            this.bfKorNm = StringExpression.nullConvert(egovMap.get("bfKorNm"));
            this.bfEngNm = StringExpression.nullConvert(egovMap.get("bfEngNm"));
            this.bfChcrtNm = StringExpression.nullConvert(egovMap.get("bfChcrtNm"));
            this.bfOwnhomZip = StringExpression.nullConvert(egovMap.get("bfOwnhomZip"));
            this.bfOwnhomAdres = StringExpression.nullConvert(egovMap.get("bfOwnhomAdres"));
            this.bfOwnhomDetailAdres = StringExpression.nullConvert(egovMap.get("bfOwnhomDetailAdres"));
            this.bfOwnhomTelno = StringExpression.nullConvert(egovMap.get("bfOwnhomTelno"));
            this.bfLxtnTelno = StringExpression.nullConvert(egovMap.get("bfLxtnTelno"));
            this.bfMbtlnum = StringExpression.nullConvert(egovMap.get("bfMbtlnum"));
            this.bfEmgncTelno = StringExpression.nullConvert(egovMap.get("bfEmgncTelno"));
            this.bfEmail = StringExpression.nullConvert(egovMap.get("bfEmail"));
            this.bfIndvdlEmail = StringExpression.nullConvert(egovMap.get("bfIndvdlEmail"));
            this.bfBrthdy = StringExpression.nullConvert(egovMap.get("bfBrthdy"));
            this.bfSlrcldAt = StringExpression.nullConvert(egovMap.get("bfSlrcldAt"));
            this.bfMrrgAt = StringExpression.nullConvert(egovMap.get("bfMrrgAt"));
            this.bfMrrgDe = StringExpression.nullConvert(egovMap.get("bfMrrgDe"));
            this.bfPhotoAtchmnflNo = StringExpression.nullConvert(egovMap.get("bfPhotoAtchmnflNo"));
        }
    }

    public Pubusr002(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.userPassword = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_userPassword")));
            this.passwordSettingMth = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_passwordSettingMth")));
            this.changeReqstSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_changeReqstSn")));
            this.reqstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstDe")));
            this.changeSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_changeSe")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.confmSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmSttusCode")));
            this.confmSttusCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmSttusCodeNm")));
            this.confmDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmDe")));
            this.confmEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_confmEmpno")));
            this.returnResn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_returnResn")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
//            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
//            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            
            this.engNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_engNm")));
            this.chcrtNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_chcrtNm")));
            this.zip = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_zip")));
            this.ownhomAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ownhomAdres")));
            this.ownhomDetailAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ownhomDetailAdres")));
            this.ownhomTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ownhomTelno")));
            this.lxtnTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_lxtnTelno")));
            this.mbtlnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mbtlnum")));
            this.email = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_email")));
            this.indvdlEmail = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_indvdlEmail")));
            this.brthdy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_brthdy")));
            this.slrcldAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_slrcldAt")));
            this.mrrgAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mrrgAt")));
            this.photoAtchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_photoAtchmnflNo")));

            this.bfEngNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfEngNm")));
            this.bfChcrtNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfChcrtNm")));
            this.bfOwnhomAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfOwnhomAdres")));
            this.bfOwnhomDetailAdres = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfOwnhomDetailAdres")));
            this.bfOwnhomTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfOwnhomTelno")));
            this.bfLxtnTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfLxtnTelno")));
            this.bfMbtlnum = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfMbtlnum")));
            this.bfEmail = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfEmail")));
            this.bfIndvdlEmail = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfIndvdlEmail")));
            this.bfBrthdy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfBrthdy")));
            this.bfSlrcldAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfSlrcldAt")));
            this.bfMrrgAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfMrrgAt")));
            this.bfPhotoAtchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfPhotoAtchmnflNo")));
        }
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getEmpNm() {
        return empNm;
    }
    public void setEmpNm(String empNm) {
        this.empNm = empNm;
    }

    public String getUserPassword() {
        return userPassword;
    }
    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getPasswordSettingMth() {
        return passwordSettingMth;
    }
    public void setPasswordSettingMth(String passwordSettingMth) {
        this.passwordSettingMth = passwordSettingMth;
    }

    public String getChangeReqstSn() {
        return changeReqstSn;
    }
    public void setChangeReqstSn(String changeReqstSn) {
        this.changeReqstSn = changeReqstSn;
    }

    public String getReqstDe() {
        return reqstDe;
    }
    public void setReqstDe(String reqstDe) {
        this.reqstDe = reqstDe;
    }

    public String getChangeSe() {
        return changeSe;
    }
    public void setChangeSe(String changeSe) {
        this.changeSe = changeSe;
    }

    public String getAtchmnflNo() {
        return atchmnflNo;
    }
    public void setAtchmnflNo(String atchmnflNo) {
        this.atchmnflNo = atchmnflNo;
    }

    public String getConfmSttusCode() {
        return confmSttusCode;
    }
    public void setConfmSttusCode(String confmSttusCode) {
        this.confmSttusCode = confmSttusCode;
    }

    public String getConfmSttusCodeNm() {
        return confmSttusCodeNm;
    }
    public void setConfmSttusCodeNm(String confmSttusCodeNm) {
        this.confmSttusCodeNm = confmSttusCodeNm;
    }

    public String getConfmDe() {
        return confmDe;
    }
    public void setConfmDe(String confmDe) {
        this.confmDe = confmDe;
    }

    public String getConfmEmpno() {
        return confmEmpno;
    }
    public void setConfmEmpno(String confmEmpno) {
        this.confmEmpno = confmEmpno;
    }

    public String getReturnResn() {
        return returnResn;
    }
    public void setReturnResn(String returnResn) {
        this.returnResn = returnResn;
    }

    public String getRegDt() {
        return regDt;
    }
    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

//    public String getRegId() {
//        return regId;
//    }
//    public void setRegId(String regId) {
//        this.regId = regId;
//    }

    public String getUptDt() {
        return uptDt;
    }
    public void setUptDt(String uptDt) {
        this.uptDt = uptDt;
    }

//    public String getUptId() {
//        return uptId;
//    }
//    public void setUptId(String uptId) {
//        this.uptId = uptId;
//    }

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
    
    
    
    public String getEngNm() {
        return engNm;
    }
    public void setEngNm(String engNm) {
        this.engNm = engNm;
    }

    public String getChcrtNm() {
        return chcrtNm;
    }
    public void setChcrtNm(String chcrtNm) {
        this.chcrtNm = chcrtNm;
    }

    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getOwnhomAdres() {
        return ownhomAdres;
    }
    public void setOwnhomAdres(String ownhomAdres) {
        this.ownhomAdres = ownhomAdres;
    }

    public String getOwnhomDetailAdres() {
        return ownhomDetailAdres;
    }
    public void setOwnhomDetailAdres(String ownhomDetailAdres) {
        this.ownhomDetailAdres = ownhomDetailAdres;
    }

    public String getOwnhomTelno() {
        return ownhomTelno;
    }
    public void setOwnhomTelno(String ownhomTelno) {
        this.ownhomTelno = ownhomTelno;
    }

    public String getLxtnTelno() {
        return lxtnTelno;
    }
    public void setLxtnTelno(String lxtnTelno) {
        this.lxtnTelno = lxtnTelno;
    }

    public String getMbtlnum() {
        return mbtlnum;
    }
    public void setMbtlnum(String mbtlnum) {
        this.mbtlnum = mbtlnum;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getIndvdlEmail() {
        return indvdlEmail;
    }
    public void setIndvdlEmail(String indvdlEmail) {
        this.indvdlEmail = indvdlEmail;
    }

    public String getBrthdy() {
        return brthdy;
    }
    public void setBrthdy(String brthdy) {
        this.brthdy = brthdy;
    }

    public String getSlrcldAt() {
        return slrcldAt;
    }
    public void setSlrcldAt(String slrcldAt) {
        this.slrcldAt = slrcldAt;
    }

    public String getMrrgAt() {
        return mrrgAt;
    }
    public void setMrrgAt(String mrrgAt) {
        this.mrrgAt = mrrgAt;
    }

    public String getPhotoAtchmnflNo() {
        return photoAtchmnflNo;
    }
    public void setPhotoAtchmnflNo(String photoAtchmnflNo) {
        this.photoAtchmnflNo = photoAtchmnflNo;
    }
    
    
    
    public String getBfEngNm() {
        return bfEngNm;
    }
    public void setBfEngNm(String bfEngNm) {
        this.bfEngNm = bfEngNm;
    }

    public String getBfChcrtNm() {
        return bfChcrtNm;
    }
    public void setBfChcrtNm(String bfChcrtNm) {
        this.bfChcrtNm = bfChcrtNm;
    }

    public String getBfOwnhomZip() {
        return bfOwnhomZip;
    }
    public void setBfOwnhomZip(String bfOwnhomZip) {
        this.bfOwnhomZip = bfOwnhomZip;
    }

    public String getBfOwnhomAdres() {
        return bfOwnhomAdres;
    }
    public void setBfOwnhomAdres(String bfOwnhomAdres) {
        this.bfOwnhomAdres = bfOwnhomAdres;
    }

    public String getBfOwnhomDetailAdres() {
        return bfOwnhomDetailAdres;
    }
    public void setBfOwnhomDetailAdres(String bfOwnhomDetailAdres) {
        this.bfOwnhomDetailAdres = bfOwnhomDetailAdres;
    }

    public String getBfOwnhomTelno() {
        return bfOwnhomTelno;
    }
    public void setBfOwnhomTelno(String bfOwnhomTelno) {
        this.bfOwnhomTelno = bfOwnhomTelno;
    }

    public String getBfLxtnTelno() {
        return bfLxtnTelno;
    }
    public void setBfLxtnTelno(String bfLxtnTelno) {
        this.bfLxtnTelno = bfLxtnTelno;
    }

    public String getBfMbtlnum() {
        return bfMbtlnum;
    }
    public void setBfMbtlnum(String bfMbtlnum) {
        this.bfMbtlnum = bfMbtlnum;
    }

    public String getBfEmail() {
        return bfEmail;
    }
    public void setBfEmail(String bfEmail) {
        this.bfEmail = bfEmail;
    }

    public String getBfIndvdlEmail() {
        return bfIndvdlEmail;
    }
    public void setBfIndvdlEmail(String bfIndvdlEmail) {
        this.bfIndvdlEmail = bfIndvdlEmail;
    }

    public String getBfBrthdy() {
        return bfBrthdy;
    }
    public void setBfBrthdy(String bfBrthdy) {
        this.bfBrthdy = bfBrthdy;
    }

    public String getBfSlrcldAt() {
        return bfSlrcldAt;
    }
    public void setBfSlrcldAt(String bfSlrcldAt) {
        this.bfSlrcldAt = bfSlrcldAt;
    }

    public String getBfMrrgAt() {
        return bfMrrgAt;
    }
    public void setBfMrrgAt(String bfMrrgAt) {
        this.bfMrrgAt = bfMrrgAt;
    }

    public String getBfPhotoAtchmnflNo() {
        return bfPhotoAtchmnflNo;
    }
    public void setBfPhotoAtchmnflNo(String bfPhotoAtchmnflNo) {
        this.bfPhotoAtchmnflNo = bfPhotoAtchmnflNo;
    }
    

    public String getBfchgAfchgSe() {
        return bfchgAfchgSe;
    }
    public void setBfchgAfchgSe(String bfchgAfchgSe) {
        this.bfchgAfchgSe = bfchgAfchgSe;
    }/*변경이력용*/
    public String getChangeSeHist() {
        return changeSeHist;
    }
    public void setChangeSeHist(String changeSeHist) {
        this.changeSeHist = changeSeHist;
    }

    public String getChangeMenuId() {
        return changeMenuId;
    }
    public void setChangeMenuId(String changeMenuId) {
        this.changeMenuId = changeMenuId;
    }
    
    public String getChangeRequstIp() {
        return changeRequstIp;
    }
    public void setChangeRequstIp(String changeRequstIp) {
        this.changeRequstIp = changeRequstIp;
    }
    
    public String getChangeCauseSe() {
        return changeCauseSe;
    }
    public void setChangeCauseSe(String changeCauseSe) {
        this.changeCauseSe = changeCauseSe;
    }
    public String getChangeSeNm() {
        return changeSeNm;
    }

    public void setChangeSeNm(String changeSeNm) {
        this.changeSeNm = changeSeNm;
    }

    public String getBfKorNm() {
        return bfKorNm;
    }

    public void setBfKorNm(String bfKorNm) {
        this.bfKorNm = bfKorNm;
    }

    public String getKorNm() {
        return korNm;
    }

    public void setKorNm(String korNm) {
        this.korNm = korNm;
    }

    public String getOwnhomZip() {
        return ownhomZip;
    }

    public void setOwnhomZip(String ownhomZip) {
        this.ownhomZip = ownhomZip;
    }

    public String getBfEmgncTelno() {
        return bfEmgncTelno;
    }

    public void setBfEmgncTelno(String bfEmgncTelno) {
        this.bfEmgncTelno = bfEmgncTelno;
    }

    public String getEmgncTelno() {
        return emgncTelno;
    }

    public void setEmgncTelno(String emgncTelno) {
        this.emgncTelno = emgncTelno;
    }

    public String getBfMrrgDe() {
        return bfMrrgDe;
    }

    public void setBfMrrgDe(String bfMrrgDe) {
        this.bfMrrgDe = bfMrrgDe;
    }

    public String getMrrgDe() {
        return mrrgDe;
    }

    public void setMrrgDe(String mrrgDe) {
        this.mrrgDe = mrrgDe;
    }
    /*변경이력용*/

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Pubusr002 [empno=");
        builder.append(empno);
        builder.append(", empNm=");
        builder.append(empNm);
        builder.append(", passwordSettingMth=");
        builder.append(passwordSettingMth);
        builder.append(", userPassword=");
        builder.append(userPassword);
        builder.append(", changeReqstSn=");
        builder.append(changeReqstSn);
        builder.append(", reqstDe=");
        builder.append(reqstDe);
        builder.append(", changeSe=");
        builder.append(changeSe);
        builder.append(", changeSeNm=");
        builder.append(changeSeNm);
        builder.append(", atchmnflNo=");
        builder.append(atchmnflNo);
        builder.append(", confmSttusCode=");
        builder.append(confmSttusCode);
        builder.append(", confmSttusCodeNm=");
        builder.append(confmSttusCodeNm);
        builder.append(", confmDe=");
        builder.append(confmDe);
        builder.append(", confmEmpno=");
        builder.append(confmEmpno);
        builder.append(", returnResn=");
        builder.append(returnResn);
        builder.append(", regDt=");
        builder.append(regDt);
        builder.append(", uptDt=");
        builder.append(uptDt);
        builder.append(", nativeeditorStatus=");
        builder.append(nativeeditorStatus);
        builder.append(", records=");
        builder.append(records);
        builder.append(", bfchgAfchgSe=");
        builder.append(bfchgAfchgSe);
        builder.append(", bfKorNm=");
        builder.append(bfKorNm);
        builder.append(", korNm=");
        builder.append(korNm);
        builder.append(", bfEngNm=");
        builder.append(bfEngNm);
        builder.append(", engNm=");
        builder.append(engNm);
        builder.append(", bfChcrtNm=");
        builder.append(bfChcrtNm);
        builder.append(", chcrtNm=");
        builder.append(chcrtNm);
        builder.append(", zip=");
        builder.append(zip);
        builder.append(", bfOwnhomZip=");
        builder.append(bfOwnhomZip);
        builder.append(", ownhomZip=");
        builder.append(ownhomZip);
        builder.append(", bfOwnhomAdres=");
        builder.append(bfOwnhomAdres);
        builder.append(", ownhomAdres=");
        builder.append(ownhomAdres);
        builder.append(", bfOwnhomDetailAdres=");
        builder.append(bfOwnhomDetailAdres);
        builder.append(", ownhomDetailAdres=");
        builder.append(ownhomDetailAdres);
        builder.append(", bfOwnhomTelno=");
        builder.append(bfOwnhomTelno);
        builder.append(", ownhomTelno=");
        builder.append(ownhomTelno);
        builder.append(", bfLxtnTelno=");
        builder.append(bfLxtnTelno);
        builder.append(", lxtnTelno=");
        builder.append(lxtnTelno);
        builder.append(", bfMbtlnum=");
        builder.append(bfMbtlnum);
        builder.append(", mbtlnum=");
        builder.append(mbtlnum);
        builder.append(", bfEmgncTelno=");
        builder.append(bfEmgncTelno);
        builder.append(", emgncTelno=");
        builder.append(emgncTelno);
        builder.append(", bfEmail=");
        builder.append(bfEmail);
        builder.append(", email=");
        builder.append(email);
        builder.append(", bfIndvdlEmail=");
        builder.append(bfIndvdlEmail);
        builder.append(", indvdlEmail=");
        builder.append(indvdlEmail);
        builder.append(", bfBrthdy=");
        builder.append(bfBrthdy);
        builder.append(", brthdy=");
        builder.append(brthdy);
        builder.append(", bfSlrcldAt=");
        builder.append(bfSlrcldAt);
        builder.append(", slrcldAt=");
        builder.append(slrcldAt);
        builder.append(", bfMrrgAt=");
        builder.append(bfMrrgAt);
        builder.append(", mrrgAt=");
        builder.append(mrrgAt);
        builder.append(", bfMrrgDe=");
        builder.append(bfMrrgDe);
        builder.append(", mrrgDe=");
        builder.append(mrrgDe);
        builder.append(", bfPhotoAtchmnflNo=");
        builder.append(bfPhotoAtchmnflNo);
        builder.append(", photoAtchmnflNo=");
        builder.append(photoAtchmnflNo);
        builder.append(", changeSeHist=");
        builder.append(changeSeHist);
        builder.append(", changeMenuId=");
        builder.append(changeMenuId);
        builder.append(", changeRequstIp=");
        builder.append(changeRequstIp);
        builder.append(", changeCauseSe=");
        builder.append(changeCauseSe);
        builder.append("]");
        return builder.toString();
    }
}
