package kr.co.dbvision.api.stm.mng.stmmng008.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 버튼관리에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2019.05.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.17          디비비전              최초 생성
 *
 * </pre>
 */

public class Stmmng008 extends CommonVO {

    /* 버튼 ID */
    private String btnId;
    /* 버튼 명 */
    private String btnNm;
    /* 버튼 설명 */
    private String btnDc;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Stmmng008() {
        //
    }

    public Stmmng008(EgovMapForNull egovMap) {
        super(egovMap);
        if(egovMap != null) {
            this.btnId = StringExpression.nullConvert(egovMap.get("btnId"));
            this.btnNm = StringExpression.nullConvert(egovMap.get("btnNm"));
            this.btnDc = StringExpression.nullConvert(egovMap.get("btnDc"));
        }
    }

    public String getBtnId() {
        return btnId;
    }
    public void setBtnId(String btnId) {
        this.btnId = btnId;
    }

    public String getBtnNm() {
        return btnNm;
    }
    public void setBtnNm(String btnNm) {
        this.btnNm = btnNm;
    }

    public String getBtnDc() {
        return btnDc;
    }
    public void setBtnDc(String btnDc) {
        this.btnDc = btnDc;
    }

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
