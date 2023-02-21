package kr.co.dbvision.api.stm.mng.stmmng004.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 그룹권한관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.05.16
 * @version 1.0
 * @see
 *
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.16          디비비전              최초 생성
 *
 *      </pre>
 */

public class Stmmng004 extends CommonVO {

	/* 역할 코드 */
	private String roleCode;
	/* 메뉴 ID */
	private String menuId;
	/* 메뉴 ID들 */
	private String menuIds;
	/* 조회 권한 여부 */
	private String inqireAuthorAt;
	/* 등록 권한 여부 */
	private String registAuthorAt;
	/* 수정 권한 여부 */
	private String updtAuthorAt;
	/* 삭제 권한 여부 */
	private String deleteAuthorAt;
	/* 인쇄 권한 여부 */
	private String prntngAuthorAt;
	/* 엑셀 권한 여부 */
	private String excelAuthorAt;
	/* 데이터 권한 구분 */
	private String dataAuthorSe;
	/* 상위메뉴 */
	private String upperMenuId;
	/* 메뉴명 */
	private String menuNm;
	/* 메뉴구분 */
	private String menuSe;
	/* 정렬순서 */
	private String ordr;
	/* 패키지 */
	private String pckageNm;
	/* 서브패키지 */
	private String subPackageId;
	/* 프로그램ID */
	private String progrmId;
	/* 역활명 */
	private String roleNm;
	/* 삭제여부 */
	private String useAt;

	private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

	public Stmmng004() {
		//
	}

	public Stmmng004(EgovMapForNull egovMap) {
		super(egovMap);
		if (egovMap != null) {
			this.menuIds = StringExpression.nullConvert(egovMap.get("menuIds"));
			this.roleCode = StringExpression.nullConvert(egovMap.get("roleCode"));
			this.menuId = StringExpression.nullConvert(egovMap.get("menuId"));
			this.inqireAuthorAt = StringExpression.nullConvert(egovMap.get("inqireAuthorAt"));
			this.registAuthorAt = StringExpression.nullConvert(egovMap.get("registAuthorAt"));
			this.updtAuthorAt = StringExpression.nullConvert(egovMap.get("updtAuthorAt"));
			this.deleteAuthorAt = StringExpression.nullConvert(egovMap.get("deleteAuthorAt"));
			this.prntngAuthorAt = StringExpression.nullConvert(egovMap.get("prntngAuthorAt"));
			this.excelAuthorAt = StringExpression.nullConvert(egovMap.get("excelAuthorAt"));
			this.dataAuthorSe = StringExpression.nullConvert(egovMap.get("dataAuthorSe"));
			this.roleNm = StringExpression.nullConvert(egovMap.get("roleNm"));
			this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
			this.menuNm = StringExpression.nullConvert(egovMap.get("menuNm"));
			this.menuSe = StringExpression.nullConvert(egovMap.get("menuSe"));
			this.ordr = StringExpression.nullConvert(egovMap.get("ordr"));
			this.pckageNm = StringExpression.nullConvert(egovMap.get("pckageNm"));
			this.subPackageId = StringExpression.nullConvert(egovMap.get("subPackageId"));
			this.progrmId = StringExpression.nullConvert(egovMap.get("progrmId"));
		}
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public String getInqireAuthorAt() {
		return inqireAuthorAt;
	}

	public void setInqireAuthorAt(String inqireAuthorAt) {
		this.inqireAuthorAt = inqireAuthorAt;
	}

	public String getRegistAuthorAt() {
		return registAuthorAt;
	}

	public void setRegistAuthorAt(String registAuthorAt) {
		this.registAuthorAt = registAuthorAt;
	}

	public String getUpdtAuthorAt() {
		return updtAuthorAt;
	}

	public void setUpdtAuthorAt(String updtAuthorAt) {
		this.updtAuthorAt = updtAuthorAt;
	}

	public String getDeleteAuthorAt() {
		return deleteAuthorAt;
	}

	public void setDeleteAuthorAt(String deleteAuthorAt) {
		this.deleteAuthorAt = deleteAuthorAt;
	}

	public String getPrntngAuthorAt() {
		return prntngAuthorAt;
	}

	public void setPrntngAuthorAt(String prntngAuthorAt) {
		this.prntngAuthorAt = prntngAuthorAt;
	}

	public String getExcelAuthorAt() {
		return excelAuthorAt;
	}

	public void setExcelAuthorAt(String excelAuthorAt) {
		this.excelAuthorAt = excelAuthorAt;
	}

	public String getDataAuthorSe() {
		return dataAuthorSe;
	}

	public void setDataAuthorSe(String dataAuthorSe) {
		this.dataAuthorSe = dataAuthorSe;
	}

	public List<EgovMapForNull> getRecords() {
		return records;
	}

	public void setRecords(List<EgovMapForNull> records) {
		this.records = records;
	}

	public String getMenuIds() {
		return menuIds;
	}

	public void setMenuIds(String menuIds) {
		this.menuIds = menuIds;
	}

	public String getUpperMenuId() {
		return upperMenuId;
	}

	public void setUpperMenuId(String upperMenuId) {
		this.upperMenuId = upperMenuId;
	}

	public String getMenuNm() {
		return menuNm;
	}

	public void setMenuNm(String menuNm) {
		this.menuNm = menuNm;
	}

	public String getMenuSe() {
		return menuSe;
	}

	public void setMenuSe(String menuSe) {
		this.menuSe = menuSe;
	}

	public String getOrdr() {
		return ordr;
	}

	public void setOrdr(String ordr) {
		this.ordr = ordr;
	}

	public String getPckageNm() {
		return pckageNm;
	}

	public void setPckageNm(String pckageNm) {
		this.pckageNm = pckageNm;
	}

	public String getSubPackageId() {
		return subPackageId;
	}

	public void setSubPackageId(String subPackageId) {
		this.subPackageId = subPackageId;
	}

	public String getProgrmId() {
		return progrmId;
	}

	public void setProgrmId(String progrmId) {
		this.progrmId = progrmId;
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
}
