package kr.co.dbvision.api.mhs.hrd.mhshrd002.entity;

import java.util.ArrayList;

import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 휴가신청관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.06.04
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.04          디비비전              최초 생성
 * </pre>
 */

public class Mhshrd002 extends CommonVO {

    /* 사원번호 */
    private String empno;
    private String empNm;
    private String deptNm;
    /* 순번 */
    private String wrycReqstSn;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 연차구분코드 */
    private String wrycSeCode;
    private String wrycSeCodeNm;
    /* 신청일자(휴가신청일) */
    private String reqstDe;
    /* 신청사유 */
    private String reqstDtls;
    /* 소요일(휴가일수, 반차인 경우는 0.5) */
    private String wrycReqstDaycnt;
    /* 휴가중에 연락할수있는 연락처를 기록하는 항목 */
    private String emgncTelno;
    /* 휴가의 시작일 */
    private String wrycBeginFromTime;
    private String wrycBeginTime;
    private String wrycFromTime;
    /* 휴가의 종료일 */
    private String wrycEndToTime;
    private String wrycEndTime;
    private String wrycToTime;
    /* 직무대행자 */
    private String agentEmpno;
    private String agentEmpNm;
    /* 철회 여부 */
    private String wthdrawAt;
    /* 전자결재 문서 번호 */
    private String elctsctDocNo;
    /* 철회 전자결재 문서 번호 */
    private String wthdrawElctsctDocNo;
    /* 전자결재 상태 코드 */
    private String elctsctSttusCode;
    private String elctsctSttusCodeNm;
    /* 철회 전자결재 상태 코드 */
    private String wthdrawElctsctSttusCode;
    private String wthdrawElctsctSttusCodeNm;
    /* 전자결재 사원번호 */
    private String elctsctEmpno;
    /* 철회 전자결재 사원번호 */
    private String wthdrawElctsctEmpno;
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    private String regNm;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 등록자 코드 */
    private String userCode;
    

    /* 사용자 사번 */
    private String daycntEmpno;
    /* 사용자 부서 */
    private String userDeptNm;
    private String userDeptNo;
    /* 전체 연차 일수 */
    private String wrycDaycnt;
    /* 잔여 연차 일수 */
    private String remainderDaycnt;
    /* 권장 일수 */
    private String recmndDaycnt;
    /* 정산 일수 */
    private String excclcDaycnt;
    /* 사용자 이름 */
    private String userNm;
    /* 사용 연차 일수 */
    private String usingDaycnt;
    /* 사용 연차 일수 */
    private String useDaycnt;
    
    private String code;
    private String refer1Dc;
    
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrd002() {
        //
    }

    public Mhshrd002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.empNm = StringExpression.nullConvert(egovMap.get("empNm"));
            this.deptNm = StringExpression.nullConvert(egovMap.get("deptNm"));
            this.wrycReqstSn = StringExpression.nullConvert(egovMap.get("wrycReqstSn"));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.wrycSeCode = StringExpression.nullConvert(egovMap.get("wrycSeCode"));
            this.wrycSeCodeNm = StringExpression.nullConvert(egovMap.get("wrycSeCodeNm"));
            this.reqstDe = StringExpression.nullConvert(egovMap.get("reqstDe"));
            this.reqstDtls = StringExpression.nullConvert(egovMap.get("reqstDtls"));
            this.wrycReqstDaycnt = StringExpression.nullConvert(egovMap.get("wrycReqstDaycnt"));
            this.emgncTelno = StringExpression.nullConvert(egovMap.get("emgncTelno"));
            this.wrycBeginFromTime = StringExpression.nullConvert(egovMap.get("wrycBeginFromTime"));
            this.wrycEndToTime = StringExpression.nullConvert(egovMap.get("wrycEndToTime"));
            this.wrycBeginTime = StringExpression.nullConvert(egovMap.get("wrycBeginTime"));
            this.wrycEndTime = StringExpression.nullConvert(egovMap.get("wrycEndTime"));
            this.wrycFromTime = StringExpression.nullConvert(egovMap.get("wrycFromTime"));
            this.wrycToTime = StringExpression.nullConvert(egovMap.get("wrycToTime"));
            this.agentEmpno = StringExpression.nullConvert(egovMap.get("agentEmpno"));
            this.agentEmpNm = StringExpression.nullConvert(egovMap.get("agentEmpNm"));
            this.wthdrawAt = StringExpression.nullConvert(egovMap.get("wthdrawAt"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.wthdrawElctsctDocNo = StringExpression.nullConvert(egovMap.get("wthdrawElctsctDocNo"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get("elctsctSttusCodeNm"));
            this.wthdrawElctsctSttusCode = StringExpression.nullConvert(egovMap.get("wthdrawElctsctSttusCode"));
            this.wthdrawElctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get("wthdrawElctsctSttusCodeNm"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.wthdrawElctsctEmpno = StringExpression.nullConvert(egovMap.get("wthdrawElctsctEmpno"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.regId = StringExpression.nullConvert(egovMap.get("regNm"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.userCode = StringExpression.nullConvert(egovMap.get("userCode"));
            this.daycntEmpno = StringExpression.nullConvert(egovMap.get("daycntEmpno"));
            this.wrycDaycnt = StringExpression.nullConvert(egovMap.get("wrycDaycnt"));
            this.userDeptNm = StringExpression.nullConvert(egovMap.get("userDeptNm"));
            this.userDeptNo = StringExpression.nullConvert(egovMap.get("userDeptNo"));
            this.remainderDaycnt = StringExpression.nullConvert(egovMap.get("remainderDaycnt"));
            this.recmndDaycnt = StringExpression.nullConvert(egovMap.get("recmndDaycnt"));
            this.excclcDaycnt = StringExpression.nullConvert(egovMap.get("excclcDaycnt"));
            this.userNm = StringExpression.nullConvert(egovMap.get("userNm"));
            this.usingDaycnt = StringExpression.nullConvert(egovMap.get("usingDaycnt"));
            this.useDaycnt = StringExpression.nullConvert(egovMap.get("useDaycnt"));
            
            this.code = StringExpression.nullConvert(egovMap.get("code"));
            this.refer1Dc = StringExpression.nullConvert(egovMap.get("refer1Dc"));
        }
    }

    public Mhshrd002(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.empNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empNm")));
            this.deptNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptNm")));
            this.wrycReqstSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycReqstSn")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.wrycSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycSeCode")));
            this.wrycSeCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycSeCodeNm")));
            this.reqstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstDe")));
            this.reqstDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstDtls")));
            this.wrycReqstDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycReqstDaycnt")));
            this.emgncTelno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_emgncTelno")));
            this.wrycBeginTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycBeginTime")));
            this.wrycEndTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycEndTime")));
            this.wrycFromTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycFromTime")));
            this.wrycToTime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycToTime")));
            this.agentEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_agentEmpno")));
            this.agentEmpNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_agentEmpNm")));
            this.wthdrawAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wthdrawAt")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.wthdrawElctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wthdrawElctsctDocNo")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.wthdrawElctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wthdrawElctsctSttusCode")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.wthdrawElctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wthdrawElctsctEmpno")));
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.userCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_userCode")));
            this.daycntEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_daycntEmpno")));
            this.wrycDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_wrycDaycnt")));
            this.userDeptNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_userDeptNm")));
            this.userDeptNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_userDeptNo")));
            this.remainderDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_remainderDaycnt")));
            this.recmndDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_recmndDaycnt")));
            this.excclcDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_excclcDaycnt")));
            this.userNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_userNm")));
            this.usingDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_usingDaycnt")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
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

    public String getDeptNm() {
        return deptNm;
    }
    public void setDeptNm(String deptNm) {
        this.deptNm = deptNm;
    }

    public String getWrycReqstSn() {
        return wrycReqstSn;
    }
    public void setWrycReqstSn(String wrycReqstSn) {
        this.wrycReqstSn = wrycReqstSn;
    }

    public String getElctsctSeSn() {
        return elctsctSeSn;
    }
    public void setElctsctSeSn(String elctsctSeSn) {
        this.elctsctSeSn = elctsctSeSn;
    }

    public String getWrycSeCode() {
        return wrycSeCode;
    }
    public void setWrycSeCode(String wrycSeCode) {
        this.wrycSeCode = wrycSeCode;
    }

    public String getWrycSeCodeNm() {
        return wrycSeCodeNm;
    }
    public void setWrycSeCodeNm(String wrycSeCodeNm) {
        this.wrycSeCodeNm = wrycSeCodeNm;
    }

    public String getReqstDe() {
        return reqstDe;
    }
    public void setReqstDe(String reqstDe) {
        this.reqstDe = reqstDe;
    }

    public String getReqstDtls() {
        return reqstDtls;
    }
    public void setReqstDtls(String reqstDtls) {
        this.reqstDtls = reqstDtls;
    }

    public String getWrycReqstDaycnt() {
        return wrycReqstDaycnt;
    }
    public void setWrycReqstDaycnt(String wrycReqstDaycnt) {
        this.wrycReqstDaycnt = wrycReqstDaycnt;
    }

    public String getEmgncTelno() {
        return emgncTelno;
    }
    public void setEmgncTelno(String emgncTelno) {
        this.emgncTelno = emgncTelno;
    }

    public String getWrycBeginFromTime() {
        return wrycBeginFromTime;
    }
    public void setWrycBeginFromTime(String wrycBeginFromTime) {
        this.wrycBeginFromTime = wrycBeginFromTime;
    }

    public String getWrycEndToTime() {
        return wrycEndToTime;
    }
    public void setWrycEndToTime(String wrycEndToTime) {
        this.wrycEndToTime = wrycEndToTime;
    }

    public String getWrycBeginTime() {
        return wrycBeginTime;
    }
    public void setWrycBeginTime(String wrycBeginTime) {
        this.wrycBeginTime = wrycBeginTime;
    }

    public String getWrycEndTime() {
        return wrycEndTime;
    }
    public void setWrycEndTime(String wrycEndTime) {
        this.wrycEndTime = wrycEndTime;
    }

    public String getWrycFromTime() {
        return wrycFromTime;
    }
    public void setWrycFromTime(String wrycFromTime) {
        this.wrycFromTime = wrycFromTime;
    }

    public String getWrycToTime() {
        return wrycToTime;
    }
    public void setWrycToTime(String wrycToTime) {
        this.wrycToTime = wrycToTime;
    }

    public String getAgentEmpno() {
        return agentEmpno;
    }
    public void setAgentEmpno(String agentEmpno) {
        this.agentEmpno = agentEmpno;
    }

    public String getagentEmpNm() {
        return agentEmpNm;
    }
    public void setagentEmpNm(String agentEmpNm) {
        this.agentEmpNm = agentEmpNm;
    }

    public String getWthdrawAt() {
        return wthdrawAt;
    }
    public void setWthdrawAt(String wthdrawAt) {
        this.wthdrawAt = wthdrawAt;
    }

    public String getElctsctDocNo() {
        return elctsctDocNo;
    }
    public void setElctsctDocNo(String elctsctDocNo) {
        this.elctsctDocNo = elctsctDocNo;
    }

    public String getWthdrawElctsctDocNo() {
        return wthdrawElctsctDocNo;
    }
    public void setWthdrawElctsctDocNo(String wthdrawElctsctDocNo) {
        this.wthdrawElctsctDocNo = wthdrawElctsctDocNo;
    }

    public String getElctsctSttusCode() {
        return elctsctSttusCode;
    }
    public void setElctsctSttusCode(String elctsctSttusCode) {
        this.elctsctSttusCode = elctsctSttusCode;
    }

    public String getElctsctSttusCodeNm() {
        return elctsctSttusCodeNm;
    }
    public void setElctsctSttusCodeNm(String elctsctSttusCodeNm) {
        this.elctsctSttusCodeNm = elctsctSttusCodeNm;
    }

    public String getWthdrawElctsctSttusCode() {
        return wthdrawElctsctSttusCode;
    }
    public void setWthdrawElctsctSttusCode(String wthdrawElctsctSttusCode) {
        this.wthdrawElctsctSttusCode = wthdrawElctsctSttusCode;
    }

    public String getWthdrawElctsctSttusCodeNm() {
        return wthdrawElctsctSttusCodeNm;
    }
    public void setWthdrawElctsctSttusCodeNm(String wthdrawElctsctSttusCodeNm) {
        this.wthdrawElctsctSttusCodeNm = wthdrawElctsctSttusCodeNm;
    }

    public String getElctsctEmpno() {
        return elctsctEmpno;
    }
    public void setElctsctEmpno(String elctsctEmpno) {
        this.elctsctEmpno = elctsctEmpno;
    }

    public String getWthdrawElctsctEmpno() {
        return wthdrawElctsctEmpno;
    }
    public void setWthdrawElctsctEmpno(String wthdrawElctsctEmpno) {
        this.wthdrawElctsctEmpno = wthdrawElctsctEmpno;
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

    public String getRegNm() {
        return regNm;
    }
    public void setRegNm(String regNm) {
        this.regNm = regNm;
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

    public String getUserCode() {
        return userCode;
    }
    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getDaycntEmpno() {
        return daycntEmpno;
    }
    public void setDaycntEmpno(String daycntEmpno) {
        this.daycntEmpno = daycntEmpno;
    }

    public String getWrycDaycnt() {
        return wrycDaycnt;
    }
    public void setWrycDaycnt(String wrycDaycnt) {
        this.wrycDaycnt = wrycDaycnt;
    }

    public String getRemainderDaycnt() {
        return remainderDaycnt;
    }
    public void setRemainderDaycnt(String remainderDaycnt) {
        this.remainderDaycnt = remainderDaycnt;
    }

    public String getRecmndDaycnt() {
        return recmndDaycnt;
    }
    public void setRecmndDaycnt(String recmndDaycnt) {
        this.recmndDaycnt = recmndDaycnt;
    }

    public String getExcclcDaycnt() {
        return excclcDaycnt;
    }
    public void setExcclcDaycnt(String excclcDaycnt) {
        this.excclcDaycnt = excclcDaycnt;
    }

    public String getUserNm() {
        return userNm;
    }
    public void setUserNm(String userNm) {
        this.userNm = userNm;
    }

    public String getUserDeptNm() {
        return userDeptNm;
    }
    public void setUserDeptNm(String userDeptNm) {
        this.userDeptNm = userDeptNm;
    }

    public String getUserDeptNo() {
        return userDeptNo;
    }
    public void setUserDeptNo(String userDeptNo) {
        this.userDeptNo = userDeptNo;
    }

    public String getUsingDaycnt() {
        return usingDaycnt;
    }
    public void setUsingDaycnt(String usingDaycnt) {
        this.usingDaycnt = usingDaycnt;
    }
    
    public String getUseDaycnt() {
        return useDaycnt;
    }
    public void setUseDaycnt(String useDaycnt) {
        this.useDaycnt = useDaycnt;
    }
    

    
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    
    public String getRefer1Dc() {
        return refer1Dc;
    }
    public void setRefer1Dc(String refer1Dc) {
        this.refer1Dc = refer1Dc;
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
