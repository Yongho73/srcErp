package kr.co.dbvision.api.stm.mng.stmmng006.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 사용자권한관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.05.14
 * @version 1.0
 * @see
 *
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.14          디비비전              최초 생성
 *
 *      </pre>
 */

public class Stmmng006 extends CommonVO {

	private String menuIds;
	private String userId;
	private String userNm;
	private String useAt;
	private String upperMenuId;
	private String menuId;
	private String menuNm;
	private String menuSe;
	private String ordr;
	private String pckageNm;
	private String subPackageId;
	private String progrmId;
	private String inqireAuthorAt;
	private String registAuthorAt;
	private String updtAuthorAt;
	private String deleteAuthorAt;
	private String prntngAuthorAt;
	private String excelAuthorAt;
	private String dataAuthorSe;

	private String deptNm;
	private String useAtNm;	
	
	private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

	public Stmmng006() {
		//
	}

	public Stmmng006(EgovMapForNull egovMap) {
		super(egovMap);
		this.menuIds = StringExpression.nullConvert(egovMap.get("menuIds"));
		this.userId = StringExpression.nullConvert(egovMap.get("userId"));
		this.userNm = StringExpression.nullConvert(egovMap.get("userNm"));
		this.useAt = StringExpression.nullConvert(egovMap.get("useAt"));
		this.upperMenuId = StringExpression.nullConvert(egovMap.get("upperMenuId"));
		this.menuId = StringExpression.nullConvert(egovMap.get("menuId"));
		this.menuNm = StringExpression.nullConvert(egovMap.get("menuNm"));
		this.menuSe = StringExpression.nullConvert(egovMap.get("menuSe"));
		this.ordr = StringExpression.nullConvert(egovMap.get("ordr"));
		this.pckageNm = StringExpression.nullConvert(egovMap.get("pckageNm"));
		this.subPackageId = StringExpression.nullConvert(egovMap.get("subPackageId"));
		this.progrmId = StringExpression.nullConvert(egovMap.get("progrmId	"));
		this.inqireAuthorAt = StringExpression.nullConvert(egovMap.get("inqireAuthorAt"));
		this.registAuthorAt = StringExpression.nullConvert(egovMap.get("registAuthorAt"));
		this.updtAuthorAt = StringExpression.nullConvert(egovMap.get("updtAuthorAt"));
		this.deleteAuthorAt = StringExpression.nullConvert(egovMap.get("deleteAuthorAt"));
		this.prntngAuthorAt = StringExpression.nullConvert(egovMap.get("prntngAuthorAt"));
		this.excelAuthorAt = StringExpression.nullConvert(egovMap.get("excelAuthorAt"));
		this.dataAuthorSe = StringExpression.nullConvert(egovMap.get("dataAuthorSe"));
		this.deptNm = StringExpression.nullConvert(egovMap.get("deptNm"));
		this.useAtNm = StringExpression.nullConvert(egovMap.get("useAtNm"));
	}

	public String getMenuIds() {
		return menuIds;
	}

	public void setMenuIds(String menuIds) {
		this.menuIds = menuIds;
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

	public String getUseAt() {
		return useAt;
	}

	public void setUseAt(String useAt) {
		this.useAt = useAt;
	}

	public String getUpperMenuId() {
		return upperMenuId;
	}

	public void setUpperMenuId(String upperMenuId) {
		this.upperMenuId = upperMenuId;
	}

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
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

	public String getDeptNm() {
		return deptNm;
	}

	public void setDeptNm(String deptNm) {
		this.deptNm = deptNm;
	}

	public String getUseAtNm() {
		return useAtNm;
	}

	public void setUseAtNm(String useAtNm) {
		this.useAtNm = useAtNm;
	}
	
	public List<EgovMapForNull> getRecords() {
		return records;
	}

	public void setRecords(List<EgovMapForNull> records) {
		this.records = records;
	}


}
