package kr.co.dbvision.api.mhs.flx.mhsflx001.entity;

import java.util.ArrayList;
import java.util.List;
import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 근무유형관리관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2020.05.19
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.19          디비비전              최초 생성
 * </pre>
 */

public class Mhsflx001 extends CommonVO {

    /* 근무 유형 코드 */
    private String workTyCode;
    /* 근무 유형 코드 명 */
    private String workTyCodeNm;
    /* 사용 여부 */
    private String useAt;
    private String useAtNm;
    /* 기본 유형 여부 */
    private String bassTyAt;
    private String bassTyAtNm;
    /* 산정 기간 : 1주,2주,1개월,2개월,3개  C183(탄력적2이내),C184(탄력적3개월이내),C185(선택적) */
    private String calcPd;
    /* 선택적 근로시간제 : CORE TIME 적용 여부 */
    private String coreTimeApplcAt;
    private String coreTimeApplcAtNm;
    /* 재량   근로시간제 : 출근 확인 여부 */
    private String attendConfirmAt;
    private String attendConfirmAtNm;
    /* 재량   근로시간제 : 1일 인정 근무시간 */
    private String dayRecogWorktime;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Mhsflx001() {
        //
    }

    public Mhsflx001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.workTyCode = StringExpression.nullConvert(egovMap.get("workTyCode"));
            this.workTyCodeNm = StringExpression.nullConvert(egovMap.get("workTyCodeNm"));
            this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
            this.useAtNm = StringExpression.nullConvert(egovMap.get("useAtNm"));
            this.bassTyAt = StringExpression.nullConvert(egovMap.get("bassTyAt"));
            this.bassTyAtNm = StringExpression.nullConvert(egovMap.get("bassTyAtNm"));
            this.calcPd = StringExpression.nullConvert(egovMap.get("calcPd"));
            this.coreTimeApplcAt = StringExpression.nullConvert(egovMap.get("coreTimeApplcAt"));
            this.attendConfirmAt = StringExpression.nullConvert(egovMap.get("attendConfirmAt"));
            this.coreTimeApplcAtNm = StringExpression.nullConvert(egovMap.get("coreTimeApplcAtNm"));
            this.attendConfirmAtNm = StringExpression.nullConvert(egovMap.get("attendConfirmAtNm"));
            this.dayRecogWorktime = StringExpression.nullConvert(egovMap.get("dayRecogWorktime"));
        }
    }

    public Mhsflx001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.workTyCode = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workTyCode")));
            this.workTyCodeNm = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_workTyCodeNm")));
            this.useAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_useAt")));
            this.bassTyAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_bassTyAt")));
            this.calcPd = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_calcPd")));
            this.coreTimeApplcAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_coreTimeApplcAt")));
            this.attendConfirmAt = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_attendConfirmAt")));
            this.dayRecogWorktime = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_dayRecogWorktime")));
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getWorkTyCode() {
        return workTyCode;
    }
    public void setWorkTyCode(String workTyCode) {
        this.workTyCode = workTyCode;
    }

    public String getWorkTyCodeNm() {
        return workTyCodeNm;
    }
    public void setWorkTyCodeNm(String workTyCodeNm) {
        this.workTyCodeNm = workTyCodeNm;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public String getBassTyAt() {
        return bassTyAt;
    }
    public void setBassTyAt(String bassTyAt) {
        this.bassTyAt = bassTyAt;
    }

    public String getCalcPd() {
        return calcPd;
    }
    public void setCalcPd(String calcPd) {
        this.calcPd = calcPd;
    }

    public String getCoreTimeApplcAt() {
        return coreTimeApplcAt;
    }
    public void setCoreTimeApplcAt(String coreTimeApplcAt) {
        this.coreTimeApplcAt = coreTimeApplcAt;
    }

    public String getAttendConfirmAt() {
        return attendConfirmAt;
    }
    public void setAttendConfirmAt(String attendConfirmAt) {
        this.attendConfirmAt = attendConfirmAt;
    }

    public String getDayRecogWorktime() {
        return dayRecogWorktime;
    }
    public void setDayRecogWorktime(String dayRecogWorktime) {
        this.dayRecogWorktime = dayRecogWorktime;
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
