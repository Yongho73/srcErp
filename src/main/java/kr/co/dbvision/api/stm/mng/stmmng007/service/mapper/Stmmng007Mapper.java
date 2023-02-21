package kr.co.dbvision.api.stm.mng.stmmng007.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.api.stm.mng.stmmng007.entity.Stmmng007;

/**
 * 프로그램ID  관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.02.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.22          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Stmmng007Mapper")
public interface Stmmng007Mapper {
     /**
      * 페이징 토탈 카운트
      * @param paramMap
      * @return
      */
     public int selectStmProgrmListAllCnt(EgovMapForNull paramMap);      
     /**
      * 페이징 토탈 카운트 중 페이지 구하기
      * @param paramMap
      * @return
      */
     public int selectStmProgrmListAllInPage(EgovMapForNull paramMap);
     /**
      * 프로그램ID 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmProgrmList(EgovMapForNull paramMap);      
      /**
       * 프로그램ID 목록을 조회한다.(페이징)
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectStmProgrmListPaging(EgovMapForNull paramMap);
      /**
       * 프로그램ID   상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmProgrm(EgovMapForNull paramMap);
      /**
       * 프로그램ID   정보를 등록한다.
       * @param paramMap
       */
      public void saveStmProgrm(EgovMapForNull paramMap);
      /**
       * 프로그램ID   정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmProgrm(EgovMapForNull paramMap);
      /**
       * 프로그램ID   정보를 등록한다.
       * @param paramMap
       */
      public void saveStmProgrmNew(Stmmng007 entity);
      /**
       * 프로그램ID   정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmProgrmNew(Stmmng007 entity);      
      /**
       * 프로그램ID 정보를 삭제하기 전에 사용 내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectProgrmIdUseChk(Stmmng007 entity);
}
