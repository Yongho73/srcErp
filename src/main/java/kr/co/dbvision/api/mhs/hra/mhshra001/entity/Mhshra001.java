package kr.co.dbvision.api.mhs.hra.mhshra001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 인사발령관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.06.16
 * @version 1.0
 * @sourceGen version 2020.06.11.02 (2020.06.16)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.16          디비비전              최초 생성
 * </pre>
 */

public class Mhshra001 extends CommonVO {
    

    /* 발령번호 */
    private String gnfdNo;
    /* 전자결재 구분 순번 */
    private String elctsctSeSn;
    /* 사원번호 */
    private String empno;
    private String empNm;
    /* 발령코드 */
    private String gnfdCode;
    private String gnfdCodeNm;
    /* 발령을 시행할 일자를 기록 */
    private String gnfdDe;
    /* 발령시작일 */
    private String gnfdBeginDe;
    /* 발령종료일 */
    private String gnfdEndDe;
    /* 처리여부 */
    private String processAt;
    /* 변경전부서코드 */
    private String bfchgDeptCode;
    private String bfchgDeptCodeNm;
    /* 변경전직급코드 */
    private String bfchgClsfCode;
    /* 변경전직위코드 */
    private String bfchgOfcpsCode;
    /* 변경전직종코드 */
    private String bfchgJssfcCode;
    /* 변경전직렬코드 */
    private String bfchgJblnCode;
    /* 변경전호봉코드 */
    private String bfchgSrclsCode;
    /* 변경후 부서코드 */
    private String afchgDeptCode;
    /* 변경후 부서코드 */
    private String afchgDeptCodeNm;
    /* 변경후 직급코드 */
    private String afchgClsfCode;
    /* 변경후직위코드 */
    private String afchgOfcpsCode;
    /* 변경후직종코드 */
    private String afchgJssfcCode;
    /* 변경후직렬코드 */
    private String afchgJblnCode;
    /* 변경후호봉코드 */
    private String afchgSrclsCode;
    /* 변경전직책코드 */
    private String bfchgRspofcCode;
    /* 변경후 직책코드 */
    private String afchgRspofcCode;
    /* 겸임부서코드 */
    private String hdadptDeptCode;
    /* 겸임여부 */
    private String hdadptAt;
    /* 발령의 내용을 기록 */
    private String gnfdDtls;
    /* 전자결재문서번호 */
    private String elctsctDocNo;
    /* 결재상태코드 */
    private String elctsctSttusCode;
    private String elctsctSttusCodeNm;
    /* 전자결재 사원번호 */
    private String elctsctEmpno;
    /* 등록일자 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일자 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    
    private String korNm;
    private String deptCode;
    private String srclsCode;
    private String clsfCode;
    private String ofcpsCode;
    private String jssfcCode;
    private String rspofCode;
    private String jblnCode;
    
    private String deptNm;
    private String ecnyDe;
    private String nxttrmPromtDe;
    private String srclsCodeNm;
    
    private String clsfNm;
    private String ofcpsNm;
    private String rspofcNm;
    private String deptKorNm;
    private String jssfcCodeNm;
    private String jblnCodeNm;
    

    private String deptChangeAt;
    private String clsfChangeAt;
    private String ofcpsChangeAt;
    private String jssfcChangeAt;
    private String srclsChangeAt;
    private String rspofcChangeAt;
    
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshra001() {
        //
    }

    public Mhshra001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.gnfdNo = StringExpression.nullConvert(egovMap.get("gnfdNo"));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get("elctsctSeSn"));
            this.empno = StringExpression.nullConvert(egovMap.get("empno"));
            this.empNm = StringExpression.nullConvert(egovMap.get("empNm"));
            this.gnfdCode = StringExpression.nullConvert(egovMap.get("gnfdCode"));
            this.gnfdCodeNm = StringExpression.nullConvert(egovMap.get("gnfdCodeNm"));
            this.gnfdDe = StringExpression.nullConvert(egovMap.get("gnfdDe"));
            this.gnfdBeginDe = StringExpression.nullConvert(egovMap.get("gnfdBeginDe"));
            this.gnfdEndDe = StringExpression.nullConvert(egovMap.get("gnfdEndDe"));
            this.processAt = StringExpression.nullConvert(egovMap.get("processAt"));
            this.bfchgDeptCode = StringExpression.nullConvert(egovMap.get("bfchgDeptCode"));
            this.bfchgDeptCodeNm = StringExpression.nullConvert(egovMap.get("bfchgDeptCodeNm"));
            this.bfchgClsfCode = StringExpression.nullConvert(egovMap.get("bfchgClsfCode"));
            this.bfchgOfcpsCode = StringExpression.nullConvert(egovMap.get("bfchgOfcpsCode"));
            this.bfchgJssfcCode = StringExpression.nullConvert(egovMap.get("bfchgJssfcCode"));
            this.bfchgJblnCode = StringExpression.nullConvert(egovMap.get("bfchgJblnCode"));
            this.bfchgSrclsCode = StringExpression.nullConvert(egovMap.get("bfchgSrclsCode"));
            this.afchgDeptCode = StringExpression.nullConvert(egovMap.get("afchgDeptCode"));
            this.afchgDeptCodeNm = StringExpression.nullConvert(egovMap.get("afchgDeptCodeNm"));
            this.afchgClsfCode = StringExpression.nullConvert(egovMap.get("afchgClsfCode"));
            this.afchgOfcpsCode = StringExpression.nullConvert(egovMap.get("afchgOfcpsCode"));
            this.afchgJssfcCode = StringExpression.nullConvert(egovMap.get("afchgJssfcCode"));
            this.afchgJblnCode = StringExpression.nullConvert(egovMap.get("afchgJblnCode"));
            this.afchgSrclsCode = StringExpression.nullConvert(egovMap.get("afchgSrclsCode"));
            this.bfchgRspofcCode = StringExpression.nullConvert(egovMap.get("bfchgRspofcCode"));
            this.afchgRspofcCode = StringExpression.nullConvert(egovMap.get("afchgRspofcCode"));
            this.hdadptDeptCode = StringExpression.nullConvert(egovMap.get("hdadptDeptCode"));
            this.hdadptAt = StringExpression.nullConvert(egovMap.get("hdadptAt"));
            this.gnfdDtls = StringExpression.nullConvert(egovMap.get("gnfdDtls"));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get("elctsctDocNo"));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get("elctsctSttusCode"));
            this.elctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get("elctsctSttusCodeNm"));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get("elctsctEmpno"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.korNm = StringExpression.nullConvert(egovMap.get("korNm"));
            this.deptCode = StringExpression.nullConvert(egovMap.get("deptCode"));
            this.srclsCode = StringExpression.nullConvert(egovMap.get("srclsCode"));
            this.clsfCode = StringExpression.nullConvert(egovMap.get("clsfCode"));
            this.ofcpsCode = StringExpression.nullConvert(egovMap.get("ofcpsCode"));
            this.jssfcCode = StringExpression.nullConvert(egovMap.get("jssfcCode"));
            this.rspofCode = StringExpression.nullConvert(egovMap.get("rspofCode"));
            this.jblnCode = StringExpression.nullConvert(egovMap.get("jblnCode"));
            
            this.deptNm = StringExpression.nullConvert(egovMap.get("deptNm"));
            this.ecnyDe = StringExpression.nullConvert(egovMap.get("ecnyDe"));
            this.nxttrmPromtDe = StringExpression.nullConvert(egovMap.get("nxttrmPromtDe"));
            this.srclsCodeNm = StringExpression.nullConvert(egovMap.get("srclsCodeNm"));
            
            this.clsfNm = StringExpression.nullConvert(egovMap.get("clsfNm"));
            this.ofcpsNm = StringExpression.nullConvert(egovMap.get("ofcpsNm"));
            this.rspofcNm = StringExpression.nullConvert(egovMap.get("rspofcNm"));
            this.deptKorNm = StringExpression.nullConvert(egovMap.get("deptKorNm"));
            this.jssfcCodeNm = StringExpression.nullConvert(egovMap.get("jssfcCodeNm"));
            this.jblnCodeNm = StringExpression.nullConvert(egovMap.get("jblnCodeNm"));
            
            this.deptChangeAt = StringExpression.nullConvert(egovMap.get("deptChangeAt"));
            this.clsfChangeAt = StringExpression.nullConvert(egovMap.get("clsfChangeAt"));
            this.ofcpsChangeAt = StringExpression.nullConvert(egovMap.get("ofcpsChangeAt"));
            this.jssfcChangeAt = StringExpression.nullConvert(egovMap.get("jssfcChangeAt"));
            this.srclsChangeAt = StringExpression.nullConvert(egovMap.get("srclsChangeAt"));
            this.rspofcChangeAt = StringExpression.nullConvert(egovMap.get("rspofcChangeAt"));
        }
    }

    public Mhshra001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.gnfdNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_gnfdNo")));
            this.elctsctSeSn = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSeSn")));
            this.empno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empno")));
            this.empNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_empNm")));
            this.gnfdCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_gnfdCode")));
            this.gnfdCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_gnfdCodeNm")));
            this.gnfdDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_gnfdDe")));
            this.gnfdBeginDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_gnfdBeginDe")));
            this.gnfdEndDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_gnfdEndDe")));
            this.processAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_processAt")));
            this.bfchgDeptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfchgDeptCode")));
            this.bfchgDeptCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfchgDeptCodeNm")));
            this.bfchgClsfCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfchgClsfCode")));
            this.bfchgOfcpsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfchgOfcpsCode")));
            this.bfchgJssfcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfchgJssfcCode")));
            this.bfchgJblnCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfchgJblnCode")));
            this.bfchgSrclsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfchgSrclsCode")));
            this.afchgDeptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_afchgDeptCode")));
            this.afchgDeptCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_afchgDeptCodeNm")));
            this.afchgClsfCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_afchgClsfCode")));
            this.afchgOfcpsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_afchgOfcpsCode")));
            this.afchgJssfcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_afchgJssfcCode")));
            this.afchgJblnCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_afchgJblnCode")));
            this.afchgSrclsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_afchgSrclsCode")));
            this.bfchgRspofcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bfchgRspofcCode")));
            this.afchgRspofcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_afchgRspofcCode")));
            this.hdadptDeptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hdadptDeptCode")));
            this.hdadptAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_hdadptAt")));
            this.gnfdDtls = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_gnfdDtls")));
            this.elctsctDocNo = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctDocNo")));
            this.elctsctSttusCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCode")));
            this.elctsctSttusCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctSttusCodeNm")));
            this.elctsctEmpno = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_elctsctEmpno")));
           this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.korNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_korNm")));
            this.deptCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptCode")));
            this.srclsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_srclsCode")));
            this.clsfCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfCode")));
            this.ofcpsCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ofcpsCode")));
            this.jssfcCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jssfcCode")));
            this.rspofCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rspofCode")));
            this.jblnCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jblnCode")));

            this.deptNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptNm")));
            this.ecnyDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ecnyDe")));
            this.nxttrmPromtDe = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_nxttrmPromtDe")));
            this.srclsCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_srclsCodeNm")));
            
            this.clsfNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfNm")));
            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getGnfdNo() {
        return gnfdNo;
    }
    public void setGnfdNo(String gnfdNo) {
        this.gnfdNo = gnfdNo;
    }

    public String getElctsctSeSn() {
        return elctsctSeSn;
    }
    public void setElctsctSeSn(String elctsctSeSn) {
        this.elctsctSeSn = elctsctSeSn;
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

    public String getGnfdCode() {
        return gnfdCode;
    }
    public void setGnfdCode(String gnfdCode) {
        this.gnfdCode = gnfdCode;
    }

    public String getGnfdCodeNm() {
        return gnfdCodeNm;
    }
    public void setGnfdCodeNm(String gnfdCodeNm) {
        this.gnfdCodeNm = gnfdCodeNm;
    }

    public String getGnfdDe() {
        return gnfdDe;
    }
    public void setGnfdDe(String gnfdDe) {
        this.gnfdDe = gnfdDe;
    }

    public String getGnfdBeginDe() {
        return gnfdBeginDe;
    }
    public void setGnfdBeginDe(String gnfdBeginDe) {
        this.gnfdBeginDe = gnfdBeginDe;
    }

    public String getGnfdEndDe() {
        return gnfdEndDe;
    }
    public void setGnfdEndDe(String gnfdEndDe) {
        this.gnfdEndDe = gnfdEndDe;
    }

    public String getProcessAt() {
        return processAt;
    }
    public void setProcessAt(String processAt) {
        this.processAt = processAt;
    }

    public String getBfchgDeptCode() {
        return bfchgDeptCode;
    }
    public void setBfchgDeptCode(String bfchgDeptCode) {
        this.bfchgDeptCode = bfchgDeptCode;
    }

    public String getBfchgDeptCodeNm() {
        return bfchgDeptCodeNm;
    }
    public void setBfchgDeptCodeNm(String bfchgDeptCodeNm) {
        this.bfchgDeptCodeNm = bfchgDeptCodeNm;
    }

    public String getBfchgClsfCode() {
        return bfchgClsfCode;
    }
    public void setBfchgClsfCode(String bfchgClsfCode) {
        this.bfchgClsfCode = bfchgClsfCode;
    }

    public String getBfchgOfcpsCode() {
        return bfchgOfcpsCode;
    }
    public void setBfchgOfcpsCode(String bfchgOfcpsCode) {
        this.bfchgOfcpsCode = bfchgOfcpsCode;
    }

    public String getBfchgJssfcCode() {
        return bfchgJssfcCode;
    }
    public void setBfchgJssfcCode(String bfchgJssfcCode) {
        this.bfchgJssfcCode = bfchgJssfcCode;
    }

    public String getBfchgJblnCode() {
        return bfchgJblnCode;
    }
    public void setBfchgJblnCode(String bfchgJblnCode) {
        this.bfchgJblnCode = bfchgJblnCode;
    }

    public String getBfchgSrclsCode() {
        return bfchgSrclsCode;
    }
    public void setBfchgSrclsCode(String bfchgSrclsCode) {
        this.bfchgSrclsCode = bfchgSrclsCode;
    }

    public String getAfchgDeptCode() {
        return afchgDeptCode;
    }
    public void setAfchgDeptCode(String afchgDeptCode) {
        this.afchgDeptCode = afchgDeptCode;
    }

    public String getAfchgDeptCodeNm() {
        return afchgDeptCodeNm;
    }
    public void setAfchgDeptCodeNm(String afchgDeptCodeNm) {
        this.afchgDeptCodeNm = afchgDeptCodeNm;
    }

    public String getAfchgClsfCode() {
        return afchgClsfCode;
    }
    public void setAfchgClsfCode(String afchgClsfCode) {
        this.afchgClsfCode = afchgClsfCode;
    }

    public String getAfchgOfcpsCode() {
        return afchgOfcpsCode;
    }
    public void setAfchgOfcpsCode(String afchgOfcpsCode) {
        this.afchgOfcpsCode = afchgOfcpsCode;
    }

    public String getAfchgJssfcCode() {
        return afchgJssfcCode;
    }
    public void setAfchgJssfcCode(String afchgJssfcCode) {
        this.afchgJssfcCode = afchgJssfcCode;
    }

    public String getAfchgJblnCode() {
        return afchgJblnCode;
    }
    public void setAfchgJblnCode(String afchgJblnCode) {
        this.afchgJblnCode = afchgJblnCode;
    }

    public String getAfchgSrclsCode() {
        return afchgSrclsCode;
    }
    public void setAfchgSrclsCode(String afchgSrclsCode) {
        this.afchgSrclsCode = afchgSrclsCode;
    }

    public String getBfchgRspofcCode() {
        return bfchgRspofcCode;
    }
    public void setBfchgRspofcCode(String bfchgRspofcCode) {
        this.bfchgRspofcCode = bfchgRspofcCode;
    }

    public String getAfchgRspofcCode() {
        return afchgRspofcCode;
    }
    public void setAfchgRspofcCode(String afchgRspofcCode) {
        this.afchgRspofcCode = afchgRspofcCode;
    }

    public String getHdadptDeptCode() {
        return hdadptDeptCode;
    }
    public void setHdadptDeptCode(String hdadptDeptCode) {
        this.hdadptDeptCode = hdadptDeptCode;
    }

    public String getHdadptAt() {
        return hdadptAt;
    }
    public void setHdadptAt(String hdadptAt) {
        this.hdadptAt = hdadptAt;
    }

    public String getGnfdDtls() {
        return gnfdDtls;
    }
    public void setGnfdDtls(String gnfdDtls) {
        this.gnfdDtls = gnfdDtls;
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

    public String getElctsctSttusCodeNm() {
        return elctsctSttusCodeNm;
    }
    public void setElctsctSttusCodeNm(String elctsctSttusCodeNm) {
        this.elctsctSttusCodeNm = elctsctSttusCodeNm;
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
    
    public String getSrclsCode() {
        return srclsCode;
    }
    public void setSrclsCode(String srclsCode) {
        this.srclsCode = srclsCode;
    }
    
    public String getClsfCode() {
        return clsfCode;
    }
    public void setClsfCode(String clsfCode) {
        this.clsfCode = clsfCode;
    }
    
    public String getOfcpsCode() {
        return ofcpsCode;
    }
    public void setOfcpsCode(String ofcpsCode) {
        this.ofcpsCode = ofcpsCode;
    }
    
    public String getJssfcCode() {
        return jssfcCode;
    }
    public void setJssfcCode(String jssfcCode) {
        this.jssfcCode = jssfcCode;
    }
    
    public String getRspofCode() {
        return rspofCode;
    }
    public void setRspofCode(String rspofCode) {
        this.rspofCode = rspofCode;
    }
    
    public String getJblnCode() {
        return jblnCode;
    }
    public void setJblnCode(String jblnCode) {
        this.jblnCode = jblnCode;
    }
    
    
    
    

    
    public String getDeptNm() {
        return deptNm;
    }
    public void setDeptNm(String deptNm) {
        this.deptNm = deptNm;
    }
    
    public String getEcnyDe() {
        return ecnyDe;
    }
    public void setEcnyDe(String ecnyDe) {
        this.ecnyDe = ecnyDe;
    }
    
    public String getNxttrmPromtDe() {
        return nxttrmPromtDe;
    }
    public void setNxttrmPromtDe(String nxttrmPromtDe) {
        this.nxttrmPromtDe = nxttrmPromtDe;
    }
    
    public String getSrclsCodeNm() {
        return srclsCodeNm;
    }
    public void setSrclsCodeNm(String srclsCodeNm) {
        this.srclsCodeNm = srclsCodeNm;
    }
    

    
    public String getClsfNm() {
        return clsfNm;
    }
    public void setClsfNm(String clsfNm) {
        this.clsfNm = clsfNm;
    }
    
    public String getOfcpsNm() {
        return ofcpsNm;
    }
    public void setOfcpsNm(String ofcpsNm) {
        this.ofcpsNm = ofcpsNm;
    }
    
    public String getRspofcNm() {
        return rspofcNm;
    }
    public void setRspofcNm(String rspofcNm) {
        this.rspofcNm = rspofcNm;
    }
    
    public String getDeptKorNm() {
        return deptKorNm;
    }
    public void setDeptKorNm(String deptKorNm) {
        this.deptKorNm = deptKorNm;
    }
    
    public String getJssfcCodeNm() {
        return jssfcCodeNm;
    }
    public void setJssfcCodeNm(String jssfcCodeNm) {
        this.jssfcCodeNm = jssfcCodeNm;
    }
    
    public String getJblnCodeNm() {
        return jblnCodeNm;
    }
    public void setJblnCodeNm(String jblnCodeNm) {
        this.jblnCodeNm = jblnCodeNm;
    }

    
    public String getDeptChangeAt() {
        return deptChangeAt;
    }
    public void setDeptChangeAt(String deptChangeAt) {
        this.deptChangeAt = deptChangeAt;
    }
    
    public String getClsfChangeAt() {
        return clsfChangeAt;
    }
    public void setClsfChangeAt(String clsfChangeAt) {
        this.clsfChangeAt = clsfChangeAt;
    }
    
    public String getOfcpsChangeAt() {
        return ofcpsChangeAt;
    }
    public void setOfcpsChangeAt(String ofcpsChangeAt) {
        this.ofcpsChangeAt = ofcpsChangeAt;
    }
    
    public String getJssfcChangeAt() {
        return jssfcChangeAt;
    }
    public void setJssfcChangeAt(String jssfcChangeAt) {
        this.jssfcChangeAt = jssfcChangeAt;
    }
    
    public String getSrclsChangeAt() {
        return srclsChangeAt;
    }
    public void setSrclsChangeAt(String srclsChangeAt) {
        this.srclsChangeAt = srclsChangeAt;
    }
    
    public String getRspofcChangeAt() {
        return rspofcChangeAt;
    }
    public void setRspofcChangeAt(String rspofcChangeAt) {
        this.rspofcChangeAt = rspofcChangeAt;
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
