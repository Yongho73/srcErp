package kr.co.dbvision.api.stm.not.stmnot001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * ERP게시판관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.21
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.21          디비비전              최초 생성
 * </pre>
 */

public class Stmnot001 extends CommonVO {

    /* 공지 ID */
    private String noticeId;
    /* 공지 종류 공통코드(C195) */
    private String noticeKind;
    /* 공지대상구분(C198) */
    private String noticeTrgetSe;
    /* 공지 제목 */
    private String noticeTit;
    /* 공지 내용 */
    private String noticeCn;
    /* 작성자 ID */
    private String writerId;
    private String writerNm;
    /* 첨부파일 번호 */
    private String atchmnflNo;
    private String atchmnflNoYN;
    /* OPEN 여부 */
    private String openAt;
    private String openAtNm;
    /* 조회 수 */
    private String inqireCo;
    /* 삭제 여부 - 삭제는 안하고 삭제 여부만 1로 변 */
    private String deleteAt;
    /* 삭제 ID */
    private String deleteId;
    /* 삭제 일시 */
    private String deleteDt;
    /* 등록 일시 */
    private String regDt;
    /* 등록 ID */
//    private String regId;
    /* 수정 일시 */
    private String uptDt;
    /* 수정 ID */
//    private String uptId;
    

    /* SN */
    private String noticeIdSn;
    /* 공지 대상 ID - 사용자ID 또는 부서ID 또는 그권한ID */
    private String noticeTrgetId;
    private String noticeTrgetIdNm;
    
    /* 사원 대상자 */
    private String trgetEmpCnt;
    private String trgetEmpNm;
    /* 사원 대상자 */
    private String trgetDeptCnt;
    private String trgetDeptNm;
    /* 사원 대상자 */
    private String trgetGroupCnt;
    private String trgetGroupNm;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmnot001() {
        //
    }

    public Stmnot001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.noticeId = StringExpression.nullConvert(egovMap.get("noticeId"));
            this.noticeKind = StringExpression.nullConvert(egovMap.get("noticeKind"));
            this.noticeTrgetSe = StringExpression.nullConvert(egovMap.get("noticeTrgetSe"));
            this.noticeTit = StringExpression.nullConvert(egovMap.get("noticeTit"));
            this.noticeCn = StringExpression.nullConvert(egovMap.get("noticeCn"));
            this.writerId = StringExpression.nullConvert(egovMap.get("writerId"));
            this.writerNm = StringExpression.nullConvert(egovMap.get("writerNm"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            this.atchmnflNoYN = StringExpression.nullConvert(egovMap.get("atchmnflNoYN"));
            this.openAt = StringExpression.nullConvert(egovMap.get("openAt"));
            this.openAtNm = StringExpression.nullConvert(egovMap.get("openAtNm"));
            this.inqireCo = StringExpression.nullConvert(egovMap.get("inqireCo"));
            this.deleteAt = StringExpression.nullConvert(egovMap.get("deleteAt"));
            this.deleteId = StringExpression.nullConvert(egovMap.get("deleteId"));
            this.deleteDt = StringExpression.nullConvert(egovMap.get("deleteDt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
//            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
//            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            
            this.noticeIdSn = StringExpression.nullConvert(egovMap.get("noticeIdSn"));
            this.noticeTrgetId = StringExpression.nullConvert(egovMap.get("noticeTrgetId"));
            this.noticeTrgetIdNm = StringExpression.nullConvert(egovMap.get("noticeTrgetIdNm"));
            
            this.trgetEmpCnt = StringExpression.nullConvert(egovMap.get("trgetEmpCnt"));
            this.trgetEmpNm = StringExpression.nullConvert(egovMap.get("trgetEmpNm"));
            this.trgetDeptCnt = StringExpression.nullConvert(egovMap.get("trgetDeptCnt"));
            this.trgetDeptNm = StringExpression.nullConvert(egovMap.get("trgetDeptNm"));
            this.trgetGroupCnt = StringExpression.nullConvert(egovMap.get("trgetGroupCnt"));
            this.trgetGroupNm = StringExpression.nullConvert(egovMap.get("trgetGroupNm"));
        }
    }

    public Stmnot001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.noticeId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_noticeId")));
            this.noticeKind = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_noticeKind")));
            this.noticeTrgetSe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_noticeTrgetSe")));
            this.noticeTit = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_noticeTit")));
            this.noticeCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_noticeCn")));
            this.writerId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_writerId")));
            this.writerNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_writerNm")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));
            this.openAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_openAt")));
            this.openAtNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_openAtNm")));
            this.inqireCo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_inqireCo")));
            this.deleteAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deleteAt")));
            this.deleteId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deleteId")));
            this.deleteDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deleteDt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
//            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
//            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            

            this.noticeIdSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_noticeIdSn")));
            this.noticeTrgetId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_noticeTrgetId")));
            this.noticeTrgetIdNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_noticeTrgetIdNm")));
        }
    }

    public String getNoticeId() {
        return noticeId;
    }
    public void setNoticeId(String noticeId) {
        this.noticeId = noticeId;
    }

    public String getNoticeKind() {
        return noticeKind;
    }
    public void setNoticeKind(String noticeKind) {
        this.noticeKind = noticeKind;
    }

    public String getNoticeTrgetSe() {
        return noticeTrgetSe;
    }
    public void setNoticeTrgetSe(String noticeTrgetSe) {
        this.noticeTrgetSe = noticeTrgetSe;
    }

    public String getNoticeTit() {
        return noticeTit;
    }
    public void setNoticeTit(String noticeTit) {
        this.noticeTit = noticeTit;
    }

    public String getNoticeCn() {
        return noticeCn;
    }
    public void setNoticeCn(String noticeCn) {
        this.noticeCn = noticeCn;
    }

    public String getWriterId() {
        return writerId;
    }
    public void setWriterId(String writerId) {
        this.writerId = writerId;
    }

    public String getWriterNm() {
        return writerNm;
    }
    public void setWriterNm(String writerNm) {
        this.writerNm = writerNm;
    }

    public String getAtchmnflNo() {
        return atchmnflNo;
    }
    public void setAtchmnflNo(String atchmnflNo) {
        this.atchmnflNo = atchmnflNo;
    }

    public String getAtchmnflNoYN() {
        return atchmnflNoYN;
    }
    public void setAtchmnflNoYN(String atchmnflNoYN) {
        this.atchmnflNoYN = atchmnflNoYN;
    }

    public String getOpenAt() {
        return openAt;
    }
    public void setOpenAt(String openAt) {
        this.openAt = openAt;
    }

    public String getOpenAtNm() {
        return openAtNm;
    }
    public void setOpenAtNm(String openAtNm) {
        this.openAtNm = openAtNm;
    }

    public String getInqireCo() {
        return inqireCo;
    }
    public void setInqireCo(String inqireCo) {
        this.inqireCo = inqireCo;
    }

    public String getDeleteAt() {
        return deleteAt;
    }
    public void setDeleteAt(String deleteAt) {
        this.deleteAt = deleteAt;
    }

    public String getDeleteId() {
        return deleteId;
    }
    public void setDeleteId(String deleteId) {
        this.deleteId = deleteId;
    }

    public String getDeleteDt() {
        return deleteDt;
    }
    public void setDeleteDt(String deleteDt) {
        this.deleteDt = deleteDt;
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
    


    public String getNoticeIdSn() {
        return noticeIdSn;
    }
    public void setNoticeIdSn(String noticeIdSn) {
        this.noticeIdSn = noticeIdSn;
    }

    public String getNoticeTrgetId() {
        return noticeTrgetId;
    }
    public void setNoticeTrgetId(String noticeTrgetId) {
        this.noticeTrgetId = noticeTrgetId;
    }

    public String getNoticeTrgetIdNm() {
        return noticeTrgetIdNm;
    }
    public void setNoticeTrgetIdNm(String noticeTrgetIdNm) {
        this.noticeTrgetIdNm = noticeTrgetIdNm;
    }
}
