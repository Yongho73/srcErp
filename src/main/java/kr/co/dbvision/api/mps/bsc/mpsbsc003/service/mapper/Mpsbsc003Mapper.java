package kr.co.dbvision.api.mps.bsc.mpsbsc003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc003.entity.Mpsbsc003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 월급여항목적용등록관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.03.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.03          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsbsc003Mapper")
public interface Mpsbsc003Mapper {
	
	public List<EgovMapForNull> selectComboYearMpsbsc003List(EgovMapForNull paramMap);
     /**
      * 월급여항목적용등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsbsc003List(EgovMapForNull paramMap);
      
      
      public void saveCopyMpsbsc003(EgovMapForNull paramMap);
      
      public void deleteAllMpsbsc003(EgovMapForNull paramMap);      
      
      /**
       * 월급여항목적용등록 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsbsc003(EgovMapForNull paramMap);
      /**
       * GRIDD 월급여항목적용등록 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc003(Mpsbsc003 paramMap);
      /**
       * 월급여항목적용등록 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc003(EgovMapForNull paramMap);
      

}
