package kr.co.dbvision.api.mhs.hrm.mhshrm011.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 인사발령코드관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */

public class Mhshrm011 extends CommonVO {

    /* 발령코드 */
    private String gnfdCode;
    /* 발령코드명 */
    private String gnfdCodeNm;
    /* 부서변경여부 */
    private String deptChangeAt;
    private String deptChangeAtNm;
    /* 직급변경여부 */
    private String clsfChangeAt;
    private String clsfChangeAtNm;
    /* 직위변경여부 */
    private String ofcpsChangeAt;
    private String ofcpsChangeAtNm;
    /* 직종변경여부 */
    private String jssfcChangeAt;
    private String jssfcChangeAtNm;
    /* 직렬변경여부 */
    private String jblnChangeAt;
    private String jblnChangeAtNm;
    /* 호봉변경여부 */
    private String srclsChangeAt;
    private String srclsChangeAtNm;
    /* 직책변경여부 */
    private String rspofcChangeAt;
    private String rspofcChangeAtNm;
    /* 근속 기간 산입 여부 */
    private String cnwkPdInclsAt;
    private String cnwkPdInclsAtNm;
    /* 출력순 */
    private String outptOrdr;
    /* 사용여부 */
    private String useAt;
    private String useAtNm;
    /* 비고 */
    private String rm;
    /* 등록일자 */
    private String regDt;
    /* 등록자ID */
    private String regId;
    /* 수정일자 */
    private String uptDt;
    /* 수정자ID */
    private String uptId;
    /* 코드 사용 */
    private String cnt;
    /* 코드 사용 */
    private String useCheck;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhshrm011() {
        //
    }

    public Mhshrm011(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.gnfdCode = StringExpression.nullConvert(egovMap.get("gnfdCode"));
            this.gnfdCodeNm = StringExpression.nullConvert(egovMap.get("gnfdCodeNm"));
            this.deptChangeAt = StringExpression.nullConvert(egovMap.get("deptChangeAt"));
            this.clsfChangeAt = StringExpression.nullConvert(egovMap.get("clsfChangeAt"));
            this.ofcpsChangeAt = StringExpression.nullConvert(egovMap.get("ofcpsChangeAt"));
            this.jssfcChangeAt = StringExpression.nullConvert(egovMap.get("jssfcChangeAt"));
            this.jblnChangeAt = StringExpression.nullConvert(egovMap.get("jblnChangeAt"));
            this.srclsChangeAt = StringExpression.nullConvert(egovMap.get("srclsChangeAt"));
            this.rspofcChangeAt = StringExpression.nullConvert(egovMap.get("rspofcChangeAt"));
            this.cnwkPdInclsAt = StringExpression.nullConvert(egovMap.get("cnwkPdInclsAt"));
            this.deptChangeAtNm = StringExpression.nullConvert(egovMap.get("deptChangeAtNm"));
            this.clsfChangeAtNm = StringExpression.nullConvert(egovMap.get("clsfChangeAtNm"));
            this.ofcpsChangeAtNm = StringExpression.nullConvert(egovMap.get("ofcpsChangeAtNm"));
            this.jssfcChangeAtNm = StringExpression.nullConvert(egovMap.get("jssfcChangeAtNm"));
            this.jblnChangeAtNm = StringExpression.nullConvert(egovMap.get("jblnChangeAtNm"));
            this.srclsChangeAtNm = StringExpression.nullConvert(egovMap.get("srclsChangeAtNm"));
            this.rspofcChangeAtNm = StringExpression.nullConvert(egovMap.get("rspofcChangeAtNm"));
            this.cnwkPdInclsAtNm = StringExpression.nullConvert(egovMap.get("cnwkPdInclsAtNm"));
            this.outptOrdr = StringExpression.nullConvert(egovMap.get("outptOrdr"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.useAtNm = StringExpression.nullConvert(egovMap.get("useAtNm"));
            this.rm = StringExpression.nullConvert(egovMap.get("rm"));
            this.regDt = StringExpression.nullConvert(egovMap.get("regDt"));
            this.regId = StringExpression.nullConvert(egovMap.get("regId"));
            this.uptDt = StringExpression.nullConvert(egovMap.get("uptDt"));
            this.uptId = StringExpression.nullConvert(egovMap.get("uptId"));
            this.cnt = StringExpression.nullConvert(egovMap.get("cnt"));
            this.useCheck = StringExpression.nullConvert(egovMap.get("useCheck"));
        }
    }

    public Mhshrm011(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.gnfdCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_gnfdCode")));
            this.gnfdCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_gnfdCodeNm")));
            this.deptChangeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_deptChangeAt")));
            this.clsfChangeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_clsfChangeAt")));
            this.ofcpsChangeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_ofcpsChangeAt")));
            this.jssfcChangeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jssfcChangeAt")));
            this.jblnChangeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_jblnChangeAt")));
            this.srclsChangeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_srclsChangeAt")));
            this.rspofcChangeAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rspofcChangeAt")));
            this.outptOrdr = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_outptOrdr")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.rm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_rm")));
//            this.regDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regDt")));
//            this.regId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_regId")));
//            this.uptDt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptDt")));
//            this.uptId = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_uptId")));
            this.cnwkPdInclsAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_cnwkPdInclsAt")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
            this.useCheck = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useCheck")));
        }
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

    public String getJblnChangeAt() {
        return jblnChangeAt;
    }
    public void setJblnChangeAt(String jblnChangeAt) {
        this.jblnChangeAt = jblnChangeAt;
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

    public String getOutptOrdr() {
        return outptOrdr;
    }
    public void setOutptOrdr(String outptOrdr) {
        this.outptOrdr = outptOrdr;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getRm() {
        return rm;
    }
    public void setRm(String rm) {
        this.rm = rm;
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

    public String getCnt() {
        return cnt;
    }
    public void setCnt(String cnt) {
        this.cnt = cnt;
    }

    public String getCnwkPdInclsAt() {
        return cnwkPdInclsAt;
    }
    public void setCnwkPdInclsAt(String cnwkPdInclsAt) {
        this.cnwkPdInclsAt = cnwkPdInclsAt;
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

    public String getUseCheck() {
        return useCheck;
    }
    public void setUseCheck(String useCheck) {
        this.useCheck = useCheck;
    }
}
