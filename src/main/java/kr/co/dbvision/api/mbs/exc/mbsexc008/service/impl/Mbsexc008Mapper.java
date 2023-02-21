package kr.co.dbvision.api.mbs.exc.mbsexc008.service.impl;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 예실대비표에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.31
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.31          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mbsexc008Mapper")
public interface Mbsexc008Mapper {
     /**
      * 예실대비표 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMbsBugtcdList(EgovMapForNull paramMap);
      /**
       * 예실대비표 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMbsBugtcd(EgovMapForNull paramMap);
      /**
       * 예실대비표 정보를 등록한다.
       * @param paramMap
       */
      public void insertMbsBugtcd(EgovMapForNull paramMap);
      /**
       * 예실대비표 정보를 수정한다.
       * @param paramMap
       */
      public void updateMbsBugtcd(EgovMapForNull paramMap);
      /**
       * 예실대비표 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMbsBugtcd(EgovMapForNull paramMap);
}
