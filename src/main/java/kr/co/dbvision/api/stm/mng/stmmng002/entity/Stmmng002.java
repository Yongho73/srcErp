package kr.co.dbvision.api.stm.mng.stmmng002.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 메뉴관리에 관한 엔티티 클래스
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

public class Stmmng002 extends CommonVO {

    /* 메뉴 ID */
    private String menuId;
    /* 상위 메뉴 ID */
    private String upperMenuId;
    /* 메뉴 명 */
    private String menuNm;
    /* 순서 */
    private String ordr;
    /* 메뉴 구분 */
    private String menuSe;
    /* 메뉴 설명 */
    private String menuDc;
    /* 메뉴 사용 여부 */
    private String menuUseAt;
    /* 패키지명 */
    private String pckageNm;
    /* 서브패키지명 */
    private String subPackageId;
    /* 프로그램 ID */
    private String progrmId;
    /* 관련테이블명 */
    private String relTableName;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmmng002() {
        //
    }

    public Stmmng002(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.menuId = StringExpression.nullConvert(egovMap.get("menuId"));
            this.upperMenuId = StringExpression.nullConvert(egovMap.get("upperMenuId"));
            this.menuNm = StringExpression.nullConvert(egovMap.get("menuNm"));
            this.ordr = StringExpression.nullConvert(egovMap.get("ordr"));
            this.menuSe = StringExpression.nullConvert(egovMap.get("menuSe"));
            this.menuDc = StringExpression.nullConvert(egovMap.get("menuDc"));
            this.menuUseAt = StringExpression.nullConvert(egovMap.get("menuUseAt"));
            this.pckageNm = StringExpression.nullConvert(egovMap.get("pckageNm"));
            this.subPackageId = StringExpression.nullConvert(egovMap.get("subPackageId"));
            this.progrmId = StringExpression.nullConvert(egovMap.get("progrmId"));
            this.relTableName = StringExpression.nullConvert(egovMap.get("relTableName"));
        }
    }

    public String getMenuId() {
        return menuId;
    }
    public void setMenuId(String menuId) {
        this.menuId = menuId;
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

    public String getOrdr() {
        return ordr;
    }
    public void setOrdr(String ordr) {
        this.ordr = ordr;
    }

    public String getMenuSe() {
        return menuSe;
    }
    public void setMenuSe(String menuSe) {
        this.menuSe = menuSe;
    }

    public String getMenuDc() {
        return menuDc;
    }
    public void setMenuDc(String menuDc) {
        this.menuDc = menuDc;
    }

    public String getMenuUseAt() {
        return menuUseAt;
    }
    public void setMenuUseAt(String menuUseAt) {
        this.menuUseAt = menuUseAt;
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

    public String getRelTableName() {
        return relTableName;
    }
    public void setRelTableName(String relTableName) {
        this.relTableName = relTableName;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
