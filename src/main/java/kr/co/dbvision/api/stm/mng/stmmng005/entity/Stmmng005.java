package kr.co.dbvision.api.stm.mng.stmmng005.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 그룹권한등록에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.05.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.16          디비비전              최초 생성
 *
 * </pre>
 */

public class Stmmng005 extends CommonVO {

    /* 역할 코드 */
    private String roleCode;
    /* 역할 명 */
    private String roleNm;
    /* 사용 여부 */
    private String useAt;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmmng005() {
        //
    }

    public Stmmng005(EgovMapForNull egovMap) {    	
    	super(egovMap);    	
    	if(egovMap != null) {
    		this.roleCode = StringExpression.nullConvert(egovMap.get("roleCode"));
    		this.roleNm = StringExpression.nullConvert(egovMap.get("roleNm"));
    		this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
    	}
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
}
