package kr.co.dbvision.api.stm.mng.stmmng001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 사용자관리에 관한 엔티티 클래스
 *
 * @author 디비비전
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
 *
 * </pre>
 */

public class Stmmng001 extends CommonVO {

    /* 사용자 ID */
    private String userId;
    /* 사원번호 */
    private String empno;
    /* 사용자 패스워드 */
    private String userPassword;
    /* 사용자 패스워드 */
    private String origPassword;
    /* 사용자 명 */
    private String userNm;
    /* 사용자IP */
    private String userIp;
    /* 사원 여부 */
    private String emplAt;
    /* 사용 여부 */
    private String useAt;
    /* 그룹 권한 */
    private String roleCode;
    /* 그룹 명 */
    private String roleNm;
    /* 권한부여방식 */
    private String authorSetting;
    /* DhtmlX Grid Status (insert, delete, update) */
    private String nativeeditorStatus;
    /* 패스워드 업데이트 */
    private String updatedPassword;
    /* DB Rowdata (option) */
    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmmng001() {
        //
    }

    public Stmmng001(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
	        this.userId        = StringExpression.nullConvert(egovMap.get("userId"));
	        this.empno         = StringExpression.nullConvert(egovMap.get("empno"));
	        this.userPassword  = StringExpression.nullConvert(egovMap.get("userPassword"));
	        this.origPassword  = StringExpression.nullConvert(egovMap.get("origPassword"));
	        this.userNm        = StringExpression.nullConvert(egovMap.get("userNm"));
	        this.userIp        = StringExpression.nullConvert(egovMap.get("userIp"));
	        this.emplAt        = StringExpression.nullConvert(egovMap.get("emplAt"));
	        this.useAt         = StringExpression.nullConvert(egovMap.get("useAt"));
	        this.roleCode      = StringExpression.nullConvert(egovMap.get("roleCode"));
	        this.roleNm        = StringExpression.nullConvert(egovMap.get("roleNm"));
	        this.authorSetting = StringExpression.nullConvert(egovMap.get("authorSetting"));
        }
    }
    
    public Stmmng001(EgovMapForNull egovMap, String dhxGridrowIds) {
        super(egovMap);
        if(egovMap != null) {
            this.userId        = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"userId")));
            this.empno         = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"empno")));
            this.userPassword  = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"userPassword")));
            this.origPassword  = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"origPassword")));
            this.userNm        = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"userNm")));
            this.userIp        = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"userIp")));
            this.emplAt        = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"emplAt")));
            this.useAt         = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"useAt")));
            this.roleCode      = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"roleCode")));
            this.roleNm        = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"roleNm")));
            this.authorSetting = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_"+"authorSetting")));            
            this.nativeeditorStatus = StringExpression.nullConvert(egovMap.get(StringExpression.toCamelCase(dhxGridrowIds+"_!nativeeditor_status")));
        }
    }

    public String getAuthorSetting() {
        return authorSetting;
    }

    public void setAuthorSetting(String authorSetting) {
        this.authorSetting = authorSetting;
    }

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmpno() {
        return empno;
    }
    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getUserPassword() {
        return userPassword;
    }
    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserNm() {
        return userNm;
    }
    public void setUserNm(String userNm) {
        this.userNm = userNm;
    }

    public String getUserIp() {
        return userIp;
    }
    public void setUserIp(String userIp) {
        this.userIp = userIp;
    }

    public String getEmplAt() {
        return emplAt;
    }
    public void setEmplAt(String emplAt) {
        this.emplAt = emplAt;
    }

    public String getUseAt() {
        return useAt;
    }
    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRoleNm() {
		return roleNm;
	}

	public void setRoleNm(String roleNm) {
		this.roleNm = roleNm;
	}

    public String getNativeeditorStatus() {
        return nativeeditorStatus;
    }

    public void setNativeeditorStatus(String nativeeditorStatus) {
        this.nativeeditorStatus = nativeeditorStatus;
    }

    public String getOrigPassword() {
        return origPassword;
    }

    public void setOrigPassword(String origPassword) {
        this.origPassword = origPassword;
    }

    public String getUpdatedPassword() {
        return updatedPassword;
    }

    public void setUpdatedPassword(String updatedPassword) {
        this.updatedPassword = updatedPassword;
    }
    
}
