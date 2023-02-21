

package kr.co.dbvision.api.ynd.yta.yndyta008.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;

/**
 * 사용자에 관한 엔티티 클래스
 *
 * @author  표준프레임워크센터
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        표준프레임워크센터          최초 생성
 *
 * </pre>
 */
public class Combo extends CommonVO {

	private String  code;            //코드값
	private String  codeDc;		//코드설명
	private String  codeEngNm;	//코드명(영문)
	private String  codeKorNm;	//코드명(한글)
	private String  codekindCode;	//코드종류 코드
	private String  dfltAt;		//디폴트
	private String  factor;		//팩터
	private String  ordr;		//출력순서
	private String  refer1Dc;	//참조값1
	private String  refer2Dc;	//참조값2
	private String  refer3Dc;	//참조값3
	private String  refer4Dc;	//참조값4
	private String  useAt;		//사용여부 

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

    public Combo() {
    	//
    }

    public Combo(EgovMapForNull egovMap) {
        super(egovMap);
        this.code         = StringExpression.nullConvert(egovMap.get("code"));
        this.codeDc       = StringExpression.nullConvert(egovMap.get("codeDc"));
        this.codeEngNm    = StringExpression.nullConvert(egovMap.get("codeEngNm"));
        this.codeKorNm    = StringExpression.nullConvert(egovMap.get("codeKorNm"));
        this.codekindCode = StringExpression.nullConvert(egovMap.get("codekindCode"));
        this.dfltAt       = StringExpression.nullConvert(egovMap.get("dfltAt"));
        this.factor       = StringExpression.nullConvert(egovMap.get("factor"));
        this.ordr         = StringExpression.nullConvert(egovMap.get("ordr"));
        this.refer1Dc     = StringExpression.nullConvert(egovMap.get("refer1Dc"));
        this.refer2Dc     = StringExpression.nullConvert(egovMap.get("refer2Dc"));
        this.refer3Dc     = StringExpression.nullConvert(egovMap.get("refer3Dc"));
        this.refer4Dc     = StringExpression.nullConvert(egovMap.get("refer4Dc"));
        this.useAt        = StringExpression.nullConvert(egovMap.get("useAt"));
    }

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCodeDc() {
		return codeDc;
	}

	public void setCodeDc(String codeDc) {
		this.codeDc = codeDc;
	}

	public String getCodeEngNm() {
		return codeEngNm;
	}

	public void setCodeEngNm(String codeEngNm) {
		this.codeEngNm = codeEngNm;
	}

	public String getCodeKorNm() {
		return codeKorNm;
	}

	public void setCodeKorNm(String codeKorNm) {
		this.codeKorNm = codeKorNm;
	}

	public String getCodekindCode() {
		return codekindCode;
	}

	public void setCodekindCode(String codekindCode) {
		this.codekindCode = codekindCode;
	}

	public String getDfltAt() {
		return dfltAt;
	}

	public void setDfltAt(String dfltAt) {
		this.dfltAt = dfltAt;
	}

	public String getFactor() {
		return factor;
	}

	public void setFactor(String factor) {
		this.factor = factor;
	}

	public String getOrdr() {
		return ordr;
	}

	public void setOrdr(String ordr) {
		this.ordr = ordr;
	}

	public String getRefer1Dc() {
		return refer1Dc;
	}

	public void setRefer1Dc(String refer1Dc) {
		this.refer1Dc = refer1Dc;
	}

	public String getRefer2Dc() {
		return refer2Dc;
	}

	public void setRefer2Dc(String refer2Dc) {
		this.refer2Dc = refer2Dc;
	}

	public String getRefer3Dc() {
		return refer3Dc;
	}

	public void setRefer3Dc(String refer3Dc) {
		this.refer3Dc = refer3Dc;
	}

	public String getRefer4Dc() {
		return refer4Dc;
	}

	public void setRefer4Dc(String refer4Dc) {
		this.refer4Dc = refer4Dc;
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
