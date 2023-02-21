package kr.co.dbvision.api.stm.cmm.stmcmm001.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.StringSecurity;

/**
 * 로그인에 관한 엔티티 클래스
 *
 * @author  디비비전
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        디비비전          최초 생성
 *
 * </pre>
 */
public class Stmcmm001 extends CommonVO {

	private String userId;
	private String userNm;
	private String userKey;
	private String userIp;
	private String deptCd;
	private String deptNm;
	private String clsfCode;
	private String upMenuCd;
	private String lastLogin;
	private String empno;
	private String bplcCode;
	private String otherSessionCloseAt;
	
	private String upMenuId;
	private String subMenuId;
	
	private List<EgovMapForNull> userMenu = new ArrayList<EgovMapForNull>();
	private List<EgovMapForNull> userTopMenu = new ArrayList<EgovMapForNull>();
	private List<EgovMapForNull> userLeftMenu = new ArrayList<EgovMapForNull>();
	private List<EgovMapForNull> userDept = new ArrayList<EgovMapForNull>();

	public Stmcmm001() {

	}

	public Stmcmm001(EgovMapForNull paramMap) {
		super(paramMap);
		this.userId = StringExpression.nullConvert(paramMap.get("userId"));
		this.userKey = StringExpression.nullConvert(paramMap.get("userKey"));
		this.lastLogin = StringExpression.nullConvert(paramMap.get("lastLogin"));
		this.empno = StringExpression.nullConvert(paramMap.get("empno"));
		this.bplcCode = StringExpression.nullConvert(paramMap.get("bplcCode"));
	}

	public List<EgovMapForNull> getUserMenu() {
        return userMenu;
    }

    public void setUserMenu(List<EgovMapForNull> userMenu) {
        this.userMenu = userMenu;
    }

    public Stmcmm001(String userId, String userKey) throws Exception {
		this.userId = userId;
		this.userKey = StringSecurity.encrypt(userKey);
	}

	public static Stmcmm001 newInstance(String userId, String userKey) throws Exception {
		Stmcmm001 entity = new Stmcmm001(userId, userKey);
		return entity;
	}
	
	public String getOtherSessionCloseAt() {
        return otherSessionCloseAt;
    }

    public void setOtherSessionCloseAt(String otherSessionCloseAt) {
        this.otherSessionCloseAt = otherSessionCloseAt;
    }

    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserNm() {
		return userNm;
	}

	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}

	public String getUserKey() {
		return userKey;
	}

	public void setUserKey(String userKey) {
		this.userKey = userKey;
	}

	public String getUserIp() {
		return userIp;
	}

	public void setUserIp(String userIp) {
		this.userIp = userIp;
	}

	public String getDeptCd() {
		return deptCd;
	}

	public void setDeptCd(String deptCd) {
		this.deptCd = deptCd;
	}

	public String getDeptNm() {
		return deptNm;
	}

	public void setDeptNm(String deptNm) {
		this.deptNm = deptNm;
	}

	public String getUpMenuCd() {
		return upMenuCd;
	}

	public void setUpMenuCd(String upMenuCd) {
		this.upMenuCd = upMenuCd;
	}

	public String getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(String lastLogin) {
		this.lastLogin = lastLogin;
	}

	public List<EgovMapForNull> getUserTopMenu() {
		return userTopMenu;
	}

	public void setUserTopMenu(List<EgovMapForNull> userTopMenu) {
		this.userTopMenu = userTopMenu;
	}

	public List<EgovMapForNull> getUserLeftMenu() {
		return userLeftMenu;
	}

	public void setUserLeftMenu(List<EgovMapForNull> userLeftMenu) {
		this.userLeftMenu = userLeftMenu;
	}

	public List<EgovMapForNull> getUserDept() {
		return userDept;
	}

	public void setUserDept(List<EgovMapForNull> userDept) {
		this.userDept = userDept;
	}

	public String getEmpno() {
		return empno;
	}

	public void setEmpno(String empno) {
		this.empno = empno;
	}

	public String getBplcCode() {
		return bplcCode;
	}

	public void setBplcCode(String bplcCode) {
		this.bplcCode = bplcCode;
	}

    public String getClsfCode() {
        return clsfCode;
    }

    public void setClsfCode(String clsfCode) {
        this.clsfCode = clsfCode;
    }

	public String getUpMenuId() {
		return upMenuId;
	}

	public void setUpMenuId(String upMenuId) {
		this.upMenuId = upMenuId;
	}

	public String getSubMenuId() {
		return subMenuId;
	}

	public void setSubMenuId(String subMenuId) {
		this.subMenuId = subMenuId;
	}
}
