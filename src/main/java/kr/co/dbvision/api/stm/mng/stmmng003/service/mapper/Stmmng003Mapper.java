package kr.co.dbvision.api.stm.mng.stmmng003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.mng.stmmng003.entity.Stmmng003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 공통코드관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.22
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.22          디비비전              최초 생성
 * </pre>
 */

@Mapper("Stmmng003Mapper")
public interface Stmmng003Mapper {
     /**
      * 공통코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmmng003List(EgovMapForNull paramMap);
      /**
       * 공통코드 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmmng003(EgovMapForNull paramMap);
      /**
       * 공통코드 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmmng003(Stmmng003 entity);
      /**
       * 공통코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmmng003(Stmmng003 entity);
      public void deleteCodeKindStmmng003(Stmmng003 entity);
      /**
       * 코드 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectCodeStmmng003List(EgovMapForNull paramMap);
       /**
        * 코드 상세내용을 조회한다.
        * @param paramMap
        * @return
        */
       public EgovMapForNull selectCodeStmmng003(EgovMapForNull paramMap);
      /**
       * 코드 정보를 등록한다.
       * @param paramMap
       */
      public void saveCodeStmmng003(Stmmng003 entity);
      /**
       * 코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteCodeStmmng003(Stmmng003 entity);
      
      public List<EgovMapForNull> selectStmCodeListAll(EgovMapForNull paramMap);
}
