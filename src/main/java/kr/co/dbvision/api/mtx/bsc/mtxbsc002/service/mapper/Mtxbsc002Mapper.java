package kr.co.dbvision.api.mtx.bsc.mtxbsc002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mtx.bsc.mtxbsc002.entity.Mtxbsc002;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 소득자관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.06
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.06          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mtxbsc002Mapper")
public interface Mtxbsc002Mapper {
     /**
      * 소득자 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMtxbsc002List(EgovMapForNull paramMap);
      /**
       * 소득자 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMtxbsc002(EgovMapForNull paramMap);
      /**
       * 소득자 정보를 등록한다.
       * @param paramMap
       */
      public void saveMtxbsc002(Mtxbsc002 entity);
      /**
       * 소득자 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMtxbsc002(Mtxbsc002 entity);
      /**
       * 소득자 정보 페이징 토탈 카운트를 조회한다.
       * @param paramMap
       * @return
       */
       public int selectMtxbsc002TotalRecordCount(EgovMapForNull paramMap);
      /**
       * 소득자 정보 해당가 데이터의 몇번째 페이지인지 구하기
       * @param paramMap
       * @return
       */
       public int selectMtxbsc002ListAllInPage(EgovMapForNull paramMap);
      /**
       * 소득자 정보 페이징 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMtxbsc002ListPaging(EgovMapForNull paramMap);
}
