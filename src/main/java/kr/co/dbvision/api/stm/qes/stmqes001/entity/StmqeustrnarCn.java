package kr.co.dbvision.api.stm.qes.stmqes001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 급여관리_지급관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.09.07
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.07          디비비전              최초 생성
 * </pre>
 */

public class StmqeustrnarCn extends CommonVO {

    /* 설문조사 코드 : 자동채번 사용 */
    private String qestnarCode;
    /* 설문조사 내용 순번 */
    private String qestnarCnSn;
    /* 정렬 순번 */
    private String sortSn;
    /* 질의 사항 */
    private String qestnarCn;
    /* 답안 유형(C215, radio, select, check, 단답, 주관식) */
    private String aswperTy;
    /* 답안 수량 */
    private String aswperQty;
    /* 필수 답안 여부 : 답변이 필수인지 여부 */
    private String mustAswperAt;
    /* 선택 이유 확인 여부 : 선택 이유를 묻는 항목을 보일지 결정 */
    private String selResnConfirmAt;
    /* 등록 일시 */
    private String regDt;
    /* 등록 ID */
    private String regId;
    /* 수정 일시 */
    private String uptDt;
    /* 수정 ID */
    private String uptId;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    
    /* 답안 순번 */
    private String aswperSn;
    /* 답안 문자 : 설문 답안 */
    private String aswperChrctr;
    /* 기타 여부  : 기타 문자열 입력 여부 */
    private String etcAt;

    
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public StmqeustrnarCn() {
        //
    }

    public StmqeustrnarCn(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.qestnarCode = StringExpression.nullConvert(egovMap.get("qestnarCode"));
            this.qestnarCnSn = StringExpression.nullConvert(egovMap.get("qestnarCnSn"));
            this.sortSn = StringExpression.nullConvert(egovMap.get("sortSn"));
            this.qestnarCn = StringExpression.nullConvert(egovMap.get("qestnarCn"));
            this.aswperTy = StringExpression.nullConvert(egovMap.get("aswperTy"));
            this.aswperQty = StringExpression.nullConvert(egovMap.get("aswperQty"));
            this.mustAswperAt = StringExpression.nullConvert(egovMap.get("mustAswperAt"));
            this.selResnConfirmAt = StringExpression.nullConvert(egovMap.get("selResnConfirmAt"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            
            // 답안내용 
            this.aswperSn = StringExpression.nullConvert(egovMap.get("aswperSn"));
            this.aswperChrctr = StringExpression.nullConvert(egovMap.get("aswperChrctr"));
            this.etcAt = StringExpression.nullConvert(egovMap.get("etcAt"));
            
        }
    }

    public StmqeustrnarCn(EgovMapForNull egovMap, String dhxGridrowIds ,String gubun) {
        super(egovMap);
        if(egovMap != null && gubun == "1") {
            this.qestnarCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarCode")));
            this.qestnarCnSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarCnSn")));
            this.sortSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_sortSn")));
            this.qestnarCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarCn")));
            this.aswperTy = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_aswperTy")));
            this.aswperQty = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_aswperQty")));
            this.mustAswperAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_mustAswperAt")));
            this.selResnConfirmAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_selResnConfirmAt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        } else if(gubun =="2") {
            
            this.qestnarCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarCode")));
            this.qestnarCnSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_qestnarCnSn")));
            this.aswperSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_aswperSn")));
            this.aswperChrctr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_aswperChrctr")));
            this.etcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_etcAt")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getQestnarCode() {
        return qestnarCode;
    }
    public void setQestnarCode(String qestnarCode) {
        this.qestnarCode = qestnarCode;
    }

    public String getQestnarCnSn() {
        return qestnarCnSn;
    }
    public void setQestnarCnSn(String qestnarCnSn) {
        this.qestnarCnSn = qestnarCnSn;
    }

    public String getSortSn() {
        return sortSn;
    }
    public void setSortSn(String sortSn) {
        this.sortSn = sortSn;
    }

    public String getQestnarCn() {
        return qestnarCn;
    }
    public void setQestnarCn(String qestnarCn) {
        this.qestnarCn = qestnarCn;
    }

    public String getAswperTy() {
        return aswperTy;
    }
    public void setAswperTy(String aswperTy) {
        this.aswperTy = aswperTy;
    }

    public String getAswperQty() {
        return aswperQty;
    }
    public void setAswperQty(String aswperQty) {
        this.aswperQty = aswperQty;
    }

    public String getMustAswperAt() {
        return mustAswperAt;
    }
    public void setMustAswperAt(String mustAswperAt) {
        this.mustAswperAt = mustAswperAt;
    }

    public String getSelResnConfirmAt() {
        return selResnConfirmAt;
    }
    public void setSelResnConfirmAt(String selResnConfirmAt) {
        this.selResnConfirmAt = selResnConfirmAt;
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

    public String getAswperSn() {
        return aswperSn;
    }

    public void setAswperSn(String aswperSn) {
        this.aswperSn = aswperSn;
    }

    public String getAswperChrctr() {
        return aswperChrctr;
    }

    public void setAswperChrctr(String aswperChrctr) {
        this.aswperChrctr = aswperChrctr;
    }

    public String getEtcAt() {
        return etcAt;
    }

    public void setEtcAt(String etcAt) {
        this.etcAt = etcAt;
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
