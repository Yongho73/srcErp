package kr.co.dbvision.api.mps.bsc.mpsbsc007.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc007.entity.Mpsbsc007;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 호봉테이블등록관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.09
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.09          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsbsc007Mapper")
public interface Mpsbsc007Mapper {
     /**
      * 호봉테이블등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsbsc007List(EgovMapForNull paramMap);
      /**
       * 호봉테이블등록 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsbsc007(EgovMapForNull paramMap);
      /**
       * 호봉테이블등록 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc007(Mpsbsc007 entity);
      /**
       * 호봉테이블등록 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc007(Mpsbsc007 entity);
      
      
      
      public List<EgovMapForNull> selectMpsbsc007MasterList(EgovMapForNull paramMap);
      
      //직급데이터 조회
      public List<EgovMapForNull> selectMpsbsc007ClsfCodeList(EgovMapForNull paramMap);
      
      public EgovMapForNull selectMpsbsc007Master(EgovMapForNull paramMap);
      
      
      public void saveMpsbsc007Master(Mpsbsc007 entity);
      
      public void saveMpsbsc007Detail(Mpsbsc007 entity);
      
      public void copyMpsbsc007(Mpsbsc007 entity);
      
      public void deleteMpsbsc007All(Mpsbsc007 entity);
      
      public void deleteMpsbsc007Master(Mpsbsc007 entity);
      
}
