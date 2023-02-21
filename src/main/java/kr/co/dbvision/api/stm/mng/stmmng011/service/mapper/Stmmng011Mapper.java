package kr.co.dbvision.api.stm.mng.stmmng011.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.mng.stmmng011.entity.Stmmng011;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 프로그램개선요청관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.03          디비비전              최초 생성
 * </pre>
 */

@Mapper("Stmmng011Mapper")
public interface Stmmng011Mapper {
     /**
      * 프로그램개선요청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmmng011List(EgovMapForNull paramMap);
      /**
       * 프로그램개선요청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmmng011(EgovMapForNull paramMap);
      /**
       * 프로그램개선요청 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmmng011(Stmmng011 entity);
      /**
       * 프로그램개선요청 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmmng011(Stmmng011 entity);
      /**
       * 프로그램개선요청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmPrgRequst(EgovMapForNull paramMap);
      /**
       * 프로그램개선요청 정보를 등록한다.
       * @param paramMap
       */
      public void insertStmPrgRequst(EgovMapForNull paramMap);
      /**
       * 프로그램개선요청 정보를 수정한다.
       * @param paramMap
       */
      public void updateStmPrgRequst(EgovMapForNull paramMap);
      /**
       * 프로그램개선요청 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmPrgRequst(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectMenuList(EgovMapForNull paramMap);
}
