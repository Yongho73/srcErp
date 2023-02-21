package kr.co.dbvision.api.ynd.yta.yndyta001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 연말정산자료초기화관리에 관한 매퍼 클래스
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

@Mapper("Yndyta001Mapper")
public interface Yndyta001Mapper {
	
	
	
	 /**
	  * 귀속년도 리스트
	 * @param paramMap
	 * @return
	 */
	 public List<EgovMapForNull> selectBelongYearList(EgovMapForNull paramMap);
	 
	 /**
	  * 정산년월 리스트  
	 * @param paramMap
	 * @return
	 */
	public List<EgovMapForNull> selectCalcYmList(EgovMapForNull paramMap);
	

	 /**
	  * 초기화 전 정산여부 체크 
	 * @param paramMap
	 * @return
	 */
	public int selectCntYndyta001(EgovMapForNull paramMap);	
	 /**
	  * 대상자 초기화
	 * @param paramMap
	 */
	public void deleteAllYndyta001(EgovMapForNull paramMap);
	 
     /**
      * 연말정산자료초기화 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectYndyta001List(EgovMapForNull paramMap);
      /**
       * 연말정산자료초기화 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectYndyta001(EgovMapForNull paramMap);
      /**
       * 연말정산자료초기화 정보를 등록한다.
       * @param paramMap
       */
      public void saveYndyta001(EgovMapForNull paramMap);
      /**
       * 연말정산자료초기화 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteYndyta001(EgovMapForNull paramMap);
}
