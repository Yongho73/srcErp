package kr.co.dbvision.api.pub.wks.pubwks013.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 출장복명관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.07.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.07          디비비전              최초 생성
 * </pre>
 */

public class Pubwks013 extends CommonVO {

    /* 출장번호 */
    private String bsrpNo;
    /* 복사 FLAG */
    private String copyFlag;
    /* 사업장 코드 */
    private String bplcCode;
    /* 사업장  */
    private String bplcCodeNm;
    /* 신청일자 */
    private String reqstDe;
    /* 신청자 */
    private String reqstEmpNm;
    /* 출장 명 */
    private String bsrpNm;
    /* 출장 목적 */
    private String bsrpPurps;
    /* 출장구분코드(C024) */
    private String bsrpSeCode;
    /* 출장구분 */
    private String bsrpSeNm;
    /* 신청 사원 번호 */
    private String reqstEmpno;
    /* 직무 대행 사원번호 */
    private String dtyVrscEmpno;
    /* 출장 시작일자 */
    private String bsrpSdt;
    /* 출장 종료일자 */
    private String bsrpEdt;
    /* 출장 시작시간 */
    private String bsrpShr;
    /* 출장 종료시간 */
    private String bsrpEhr;
    /* 숙박 */
    private String stayng;
    /* 숙박 일수 */
    private String stayngDaycnt;
    /* 예산코드 */
    private String bugtCode;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 전자문서 번호 */
    private String elctsctDocNo;
    /* 전재결재 상태 */
    private String elctsctSttusCode;
    /* 전재결재 상태이름 */
    private String elctsctSttusCodeNm;    
    /* 전자결재 사원번호 */
    private String elctsctEmpno;
    /* 정산전자문서 번호 */
    private String excclcElctsctDocNo;
    /* 정산전재결재 상태 */
    private String excclcElctsctSttusCode;
    /* 정산전재결재 상태이름 */
    private String excclcElctsctSttusCodeNm;    
    /* 정산전자결재 사원번호 */
    private String excclcElctsctEmpno;
    /* 교통구분 */
    private String trnsportSeCodeNm;
    /* 교통구분 코드 */
    private String trnsportSeCode;
    /* 출장지 */
    private String bsrpCity;
    /* 직급코드 */
    private String clsfCode;
    
    /* 출장 상세 부분 */
    
    /* 출장 사원 번호 */
    private String bsrpEmpno;
    /* 출장 방문처 */
    private String visitOfficNm;
    /* 방문 내용 */
    private String visitCn;
    /* 일비용 */
    private String dayAmt;
    /* 식대 */
    private String cgffdAmt;
    /* 숙박료 */
    private String stayngAmt;
    /* 교통비 */
    private String trnsportAmt;
    /* 현지교통비(일비) */
    private String localTrnsportAmt;
    
    /* 출장 정산 부분 */
    
    /* 출장 정산 순번 */
    private String bsrpExcclcSn;
    /* 정산 전자결재순번 */
    private String excclcSn;
    /* 정산 일자 */
    private String bsrpDe;
    /* 교통 구분 */
    private String trnsportCode;
    /* 정산 숙박 비용 */
    private String excclcStayngAmt;
    /* 첨부파일번호 */
    private String atchmnflNo;
    /* 춥랄지 */
    private String startCity;
    /* 목적지 */
    private String purpsCity;
    /* 교통 코드*/
    private String transportCode;
    /* 출장 인원 */
    private String bsrpEmpCnt;
    /* 출장자 이름*/
    private String bsrpEmpnm;
    /* 출장자 사원번호*/
    private String bsrpEmplNo;
    
    /* 등록일시 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일시 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    
    /* 사용자 사번 */
    private String empno;
    /* 사용자 이름 */
    private String korNm;
    /* 사용자 부서번호 */
    private String deptCode;
    /* 사용자 부서이름 */
    private String deptNm;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Pubwks013() {
        //
    }

    public Pubwks013(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.bsrpNo = StringExpression.nullConvert(egovMap.get("bsrpNo"));
            this.copyFlag = StringExpression.nullConvert(egovMap.get("copyFlag"));
            this.bplcCode = StringExpression.nullConvert(egovMap.get("bplcCode"));
            this.reqstDe = StringExpression.nullConvert(egovMap.get("reqstDe"));
            this.bsrpNm = StringExpression.nullConvert(egovMap.get("bsrpNm"));
            this.bsrpPurps = StringExpression.nullConvert(egovMap.get("bsrpPurps"));
            this.bsrpSeCode = StringExpression.nullConvert(egovMap.get("bsrpSeCode"));
            this.bsrpSeNm = StringExpression.nullConvert(egovMap.get("bsrpSeNm"));
            this.reqstEmpno = StringExpression.nullConvert(egovMap.get("reqstEmpno"));
            this.dtyVrscEmpno = StringExpression.nullConvert(egovMap.get("dtyVrscEmpno"));
            this.bsrpSdt = StringExpression.nullConvert(egovMap.get("bsrpSdt"));
            this.bsrpEdt = StringExpression.nullConvert(egovMap.get("bsrpEdt"));
            this.stayng = StringExpression.nullConvert(egovMap.get("stayng"));
            this.stayngDaycnt = StringExpression.nullConvert(egovMap.get("stayngDaycnt"));
            this.bugtCode = StringExpression.nullConvert(egovMap.get("bugtCode"));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get("elctsctSttusCodeNm"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.excclcElctsctDocNo = StringExpression.nullConvert(egovMap.get("excclcElctsctDocNo"));
            this.excclcElctsctSttusCode = StringExpression.nullConvert(egovMap.get("excclcElctsctSttusCode"));
            this.excclcElctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get("excclcElctsctSttusCodeNm"));
            this.excclcElctsctEmpno = StringExpression.nullConvert(egovMap.get("excclcElctsctEmpno"));
            
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.reqstEmpNm = StringExpression.nullConvert(egovMap.get("reqstEmpNm"));
            this.bsrpCity = StringExpression.nullConvert(egovMap.get("bsrpCity"));
            
            this.bsrpEmpno = StringExpression.nullConvert(egovMap.get("bsrpEmpno"));
            this.visitOfficNm = StringExpression.nullConvert(egovMap.get("visitOfficNm"));
            this.visitCn = StringExpression.nullConvert(egovMap.get("visitCn"));
            this.dayAmt = StringExpression.nullConvert(egovMap.get("dayAmt"));
            this.cgffdAmt = StringExpression.nullConvert(egovMap.get("cgffdAmt"));
            this.stayngAmt = StringExpression.nullConvert(egovMap.get("stayngAmt"));
            this.trnsportAmt = StringExpression.nullConvert(egovMap.get("trnsportAmt"));
            this.localTrnsportAmt = StringExpression.nullConvert(egovMap.get("localTrnsportAmt"));

            this.bsrpShr = StringExpression.nullConvert(egovMap.get("bsrpShr"));
            this.bsrpEhr = StringExpression.nullConvert(egovMap.get("bsrpEhr"));
            this.trnsportSeCodeNm = StringExpression.nullConvert(egovMap.get("trnsportSeCodeNm"));
            this.trnsportSeCode = StringExpression.nullConvert(egovMap.get("trnsportSeCode"));
            this.bsrpEmpCnt = StringExpression.nullConvert(egovMap.get("bsrpEmpCnt"));
            this.bsrpEmpnm = StringExpression.nullConvert(egovMap.get("bsrpEmpnm"));
            this.bsrpEmplNo = StringExpression.nullConvert(egovMap.get("bsrpEmplNo"));

            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.korNm = StringExpression.nullConvert(egovMap.get("korNm"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.deptNm = StringExpression.nullConvert(egovMap.get("deptNm"));
            this.clsfCode = StringExpression.nullConvert(egovMap.get("clsfCode"));
            
            this.bsrpExcclcSn = StringExpression.nullConvert(egovMap.get("bsrpExcclcSn"));
            this.excclcSn = StringExpression.nullConvert(egovMap.get("excclcSn"));
            this.bsrpDe = StringExpression.nullConvert(egovMap.get("bsrpDe"));
            this.trnsportCode = StringExpression.nullConvert(egovMap.get("trnsportCode"));
            this.excclcStayngAmt = StringExpression.nullConvert(egovMap.get("excclcStayngAmt"));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get("atchmnflNo"));
            
            this.startCity = StringExpression.nullConvert(egovMap.get("startCity"));
            this.purpsCity = StringExpression.nullConvert(egovMap.get("purpsCity"));
            this.transportCode = StringExpression.nullConvert(egovMap.get("transportCode"));

        }
    }

    public Pubwks013(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.bsrpNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpNo")));
            this.copyFlag = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_copyFlag")));
            this.bplcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bplcCode")));
            this.reqstDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstDe")));
            this.bsrpNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpNm")));
            this.bsrpPurps = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpPurps")));
            this.bsrpSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpSeCode")));
            this.bsrpSeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpSeNm")));
            this.reqstEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstEmpno")));
            this.dtyVrscEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dtyVrscEmpno")));
            this.bsrpSdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpSdt")));
            this.bsrpEdt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpEdt")));
            this.stayng = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stayng")));
            this.stayngDaycnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stayngDaycnt")));
            this.bugtCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bugtCode")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.elctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCodeNm")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
            this.excclcElctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_excclcElctsctDocNo")));
            this.excclcElctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_excclcElctsctSttusCode")));
            this.excclcElctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_excclcElctsctSttusCodeNm")));
            this.excclcElctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_excclcElctsctEmpno")));
            
            
            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));

            this.bsrpEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpEmpno")));
            this.visitOfficNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_visitOfficNm")));     
            this.visitCn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_visitCn")));
            this.dayAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dayAmt")));
            this.cgffdAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cgffdAmt")));
            this.stayngAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_stayngAmt")));
            this.trnsportAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_trnsportAmt")));
            this.localTrnsportAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_localTrnsportAmt")));
            this.reqstEmpNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_reqstEmpNm")));
            this.bsrpCity = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpCity")));
            
            this.bsrpShr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpShr")));
            this.bsrpEhr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpEhr")));
            this.trnsportSeCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_trnsportSeCodeNm")));
            this.trnsportSeCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_trnsportSeCode")));

            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.korNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_korNm")));
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode")));
            this.deptNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptNm")));

            this.bsrpExcclcSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpExcclcSn")));
            this.excclcSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_excclcSn")));
            this.bsrpDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpDe")));
            this.trnsportCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_trnsportCode")));
            this.excclcStayngAmt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_excclcStayngAmt")));
            this.atchmnflNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_atchmnflNo")));

            this.startCity = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_startCity")));
            this.purpsCity = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_purpsCity")));
            this.transportCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_transportCode")));
            this.bsrpEmpCnt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpEmpCnt")));
            this.bsrpEmpnm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpEmpnm")));
            this.bsrpEmplNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bsrpEmplNo")));

        }
    }

    public String getBsrpNo() {
        return bsrpNo;
    }
    public void setBsrpNo(String bsrpNo) {
        this.bsrpNo = bsrpNo;
    }

    public String getBplcCode() {
        return bplcCode;
    }
    public void setBplcCode(String bplcCode) {
        this.bplcCode = bplcCode;
    }

    public String getReqstDe() {
        return reqstDe;
    }
    public void setReqstDe(String reqstDe) {
        this.reqstDe = reqstDe;
    }

    public String getBsrpNm() {
        return bsrpNm;
    }
    public void setBsrpNm(String bsrpNm) {
        this.bsrpNm = bsrpNm;
    }

    public String getBsrpPurps() {
        return bsrpPurps;
    }
    public void setBsrpPurps(String bsrpPurps) {
        this.bsrpPurps = bsrpPurps;
    }

    public String getBsrpSeCode() {
        return bsrpSeCode;
    }
    public void setBsrpSeCode(String bsrpSeCode) {
        this.bsrpSeCode = bsrpSeCode;
    }

    public String getReqstEmpno() {
        return reqstEmpno;
    }
    public void setReqstEmpno(String reqstEmpno) {
        this.reqstEmpno = reqstEmpno;
    }

    public String getDtyVrscEmpno() {
        return dtyVrscEmpno;
    }
    public void setDtyVrscEmpno(String dtyVrscEmpno) {
        this.dtyVrscEmpno = dtyVrscEmpno;
    }

    public String getBsrpSdt() {
        return bsrpSdt;
    }
    public void setBsrpSdt(String bsrpSdt) {
        this.bsrpSdt = bsrpSdt;
    }

    public String getBsrpEdt() {
        return bsrpEdt;
    }
    public void setBsrpEdt(String bsrpEdt) {
        this.bsrpEdt = bsrpEdt;
    }

    public String getStayng() {
        return stayng;
    }
    public void setStayng(String stayng) {
        this.stayng = stayng;
    }

    public String getStayngDaycnt() {
        return stayngDaycnt;
    }
    public void setStayngDaycnt(String stayngDaycnt) {
        this.stayngDaycnt = stayngDaycnt;
    }

    public String getBugtCode() {
        return bugtCode;
    }
    public void setBugtCode(String bugtCode) {
        this.bugtCode = bugtCode;
    }

    public String getElctsctDocNo() {
        return elctsctDocNo;
    }
    public void setElctsctDocNo(String elctsctDocNo) {
        this.elctsctDocNo = elctsctDocNo;
    }

    public String getElctsctSttusCode() {
        return elctsctSttusCode;
    }
    public void setElctsctSttusCode(String elctsctSttusCode) {
        this.elctsctSttusCode = elctsctSttusCode;
    }

    public String getElctsctEmpno() {
        return elctsctEmpno;
    }
    public void setElctsctEmpno(String elctsctEmpno) {
        this.elctsctEmpno = elctsctEmpno;
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

    public String getEmpno() {
        return empno;
    }

    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getKorNm() {
        return korNm;
    }

    public void setKorNm(String korNm) {
        this.korNm = korNm;
    }

    public String getDeptCode() {
        return deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getDeptNm() {
        return deptNm;
    }

    public void setDeptNm(String deptNm) {
        this.deptNm = deptNm;
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

    public String getBsrpSeNm() {
        return bsrpSeNm;
    }

    public void setBsrpSeNm(String bsrpSeNm) {
        this.bsrpSeNm = bsrpSeNm;
    }

    public String getBplcCodeNm() {
        return bplcCodeNm;
    }

    public void setBplcCodeNm(String bplcCodeNm) {
        this.bplcCodeNm = bplcCodeNm;
    }

    public String getReqstEmpNm() {
        return reqstEmpNm;
    }

    public void setReqstEmpNm(String reqstEmpNm) {
        this.reqstEmpNm = reqstEmpNm;
    }

    public String getElctsctSttusCodeNm() {
        return elctsctSttusCodeNm;
    }

    public void setElctsctSttusCodeNm(String elctsctSttusCodeNm) {
        this.elctsctSttusCodeNm = elctsctSttusCodeNm;
    }

    public String getBsrpEmpno() {
        return bsrpEmpno;
    }

    public void setBsrpEmpno(String bsrpEmpno) {
        this.bsrpEmpno = bsrpEmpno;
    }

    public String getVisitOfficNm() {
        return visitOfficNm;
    }

    public void setVisitOfficNm(String visitOfficNm) {
        this.visitOfficNm = visitOfficNm;
    }

    public String getVisitCn() {
        return visitCn;
    }

    public void setVisitCn(String visitCn) {
        this.visitCn = visitCn;
    }

    public String getDayAmt() {
        return dayAmt;
    }

    public void setDayAmt(String dayAmt) {
        this.dayAmt = dayAmt;
    }

    public String getCgffdAmt() {
        return cgffdAmt;
    }

    public void setCgffdAmt(String cgffdAmt) {
        this.cgffdAmt = cgffdAmt;
    }

    public String getStayngAmt() {
        return stayngAmt;
    }

    public void setStayngAmt(String stayngAmt) {
        this.stayngAmt = stayngAmt;
    }

    public String getTrnsportAmt() {
        return trnsportAmt;
    }

    public void setTrnsportAmt(String trnsportAmt) {
        this.trnsportAmt = trnsportAmt;
    }

    public String getLocalTrnsportAmt() {
        return localTrnsportAmt;
    }

    public void setLocalTrnsportAmt(String localTrnsportAmt) {
        this.localTrnsportAmt = localTrnsportAmt;
    }

    public String getBsrpShr() {
        return bsrpShr;
    }

    public void setBsrpShr(String bsrpShr) {
        this.bsrpShr = bsrpShr;
    }

    public String getBsrpEhr() {
        return bsrpEhr;
    }

    public void setBsrpEhr(String bsrpEhr) {
        this.bsrpEhr = bsrpEhr;
    }

    public String getTrnsportSeCodeNm() {
        return trnsportSeCodeNm;
    }

    public void setTrnsportSeCodeNm(String trnsportSeCodeNm) {
        this.trnsportSeCodeNm = trnsportSeCodeNm;
    }

    public String getTrnsportSeCode() {
        return trnsportSeCode;
    }

    public void setTrnsportSeCode(String trnsportSeCode) {
        this.trnsportSeCode = trnsportSeCode;
    }

    public String getBsrpCity() {
        return bsrpCity;
    }

    public void setBsrpCity(String bsrpCity) {
        this.bsrpCity = bsrpCity;
    }

    public String getClsfCode() {
        return clsfCode;
    }

    public void setClsfCode(String clsfCode) {
        this.clsfCode = clsfCode;
    }

    public String getBsrpExcclcSn() {
        return bsrpExcclcSn;
    }

    public void setBsrpExcclcSn(String bsrpExcclcSn) {
        this.bsrpExcclcSn = bsrpExcclcSn;
    }

    public String getBsrpDe() {
        return bsrpDe;
    }

    public void setBsrpDe(String bsrpDe) {
        this.bsrpDe = bsrpDe;
    }

    public String getExcclcStayngAmt() {
        return excclcStayngAmt;
    }

    public void setExcclcStayngAmt(String excclcStayngAmt) {
        this.excclcStayngAmt = excclcStayngAmt;
    }

    public String getAtchmnflNo() {
        return atchmnflNo;
    }

    public void setAtchmnflNo(String atchmnflNo) {
        this.atchmnflNo = atchmnflNo;
    }

    public String getStartCity() {
        return startCity;
    }

    public void setStartCity(String startCity) {
        this.startCity = startCity;
    }

    public String getPurpsCity() {
        return purpsCity;
    }

    public void setPurpsCity(String purpsCity) {
        this.purpsCity = purpsCity;
    }

    public String getTransportCode() {
        return transportCode;
    }

    public void setTransportCode(String transportCode) {
        this.transportCode = transportCode;
    }

    public String getBsrpEmpCnt() {
        return bsrpEmpCnt;
    }

    public void setBsrpEmpCnt(String bsrpEmpCnt) {
        this.bsrpEmpCnt = bsrpEmpCnt;
    }

    public String getBsrpEmpnm() {
        return bsrpEmpnm;
    }

    public void setBsrpEmpnm(String bsrpEmpnm) {
        this.bsrpEmpnm = bsrpEmpnm;
    }

    public String getExcclcElctsctDocNo() {
        return excclcElctsctDocNo;
    }

    public void setExcclcElctsctDocNo(String excclcElctsctDocNo) {
        this.excclcElctsctDocNo = excclcElctsctDocNo;
    }

    public String getExcclcElctsctSttusCode() {
        return excclcElctsctSttusCode;
    }

    public void setExcclcElctsctSttusCode(String excclcElctsctSttusCode) {
        this.excclcElctsctSttusCode = excclcElctsctSttusCode;
    }

    public String getExcclcElctsctSttusCodeNm() {
        return excclcElctsctSttusCodeNm;
    }

    public void setExcclcElctsctSttusCodeNm(String excclcElctsctSttusCodeNm) {
        this.excclcElctsctSttusCodeNm = excclcElctsctSttusCodeNm;
    }

    public String getExcclcElctsctEmpno() {
        return excclcElctsctEmpno;
    }

    public void setExcclcElctsctEmpno(String excclcElctsctEmpno) {
        this.excclcElctsctEmpno = excclcElctsctEmpno;
    }

    public String getElctsctSeSn() {
        return elctsctSeSn;
    }

    public void setElctsctSeSn(String elctsctSeSn) {
        this.elctsctSeSn = elctsctSeSn;
    }

    public String getTrnsportCode() {
        return trnsportCode;
    }

    public void setTrnsportCode(String trnsportCode) {
        this.trnsportCode = trnsportCode;
    }

    public String getExcclcSn() {
        return excclcSn;
    }

    public void setExcclcSn(String excclcSn) {
        this.excclcSn = excclcSn;
    }

    public String getBsrpEmplNo() {
        return bsrpEmplNo;
    }

    public void setBsrpEmplNo(String bsrpEmplNo) {
        this.bsrpEmplNo = bsrpEmplNo;
    }

    public String getCopyFlag() {
        return copyFlag;
    }

    public void setCopyFlag(String copyFlag) {
        this.copyFlag = copyFlag;
    }
}
