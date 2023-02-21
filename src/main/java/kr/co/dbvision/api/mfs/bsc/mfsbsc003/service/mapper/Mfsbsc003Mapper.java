package kr.co.dbvision.api.mfs.bsc.mfsbsc003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 금융계좌관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.04.24
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.24          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mfsbsc003Mapper")
public interface Mfsbsc003Mapper {
     /**
      * 금융계좌 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMfsbsc003List(EgovMapForNull paramMap);
      /**
       * 금융계좌 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMfsbsc003(EgovMapForNull paramMap);
      /**
       * 금융계좌 정보를 등록한다.
       * @param paramMap
       */
      public void saveMfsbsc003(EgovMapForNull paramMap);
      /**
       * 금융계좌 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMfsbsc003(EgovMapForNull paramMap);
      
      /**
       * 주거래통장을 0으로 만든다 
     * @param paramMap
     */
    public void updateBassBnkbAtMfsbsc003(EgovMapForNull paramMap);
}
