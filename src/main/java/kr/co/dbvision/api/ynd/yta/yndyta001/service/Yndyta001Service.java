package kr.co.dbvision.api.ynd.yta.yndyta001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 연말정산자료초기화관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.02.29
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.29          디비비전              최초 생성
 * </pre>
 */

public interface Yndyta001Service {
	
	 /**
	  * 귀속년도 리스트 
	 * @param paramMap
	 * @return
	 * @throws Exceptions
	 */
	public JSONObject selectBelongYearList(EgovMapForNull paramMap) throws Exceptions;
	 
	 
	 /**
	  * 초기화 전 연말정산 여부 
	 * @param paramMap
	 * @return
	 */
	public JSONObject selectCntYndyta001(EgovMapForNull paramMap);
	 
	 /**
	  * 대상자 초기화 
	 * @param paramMap
	 * @return
	 */
	public JSONObject deleteAllYndyta001(EgovMapForNull paramMap);
     /**
      * 연말정산자료초기화 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchYndyta001(EgovMapForNull paramMap);
     /**
      * 연말정산자료초기화 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchYndyta001ForExcel(EgovMapForNull paramMap);
     /**
      * 연말정산자료초기화 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findYndyta001(EgovMapForNull paramMap);
     /**
      * 연말정산자료초기화 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveYndyta001(EgovMapForNull paramMap);
     /**
      * 연말정산자료초기화 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeYndyta001(EgovMapForNull paramMap);
 }
