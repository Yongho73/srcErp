package kr.co.dbvision.api.pub.usr.pubusr001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.usr.pubusr001.entity.Pubusr001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 개인정보조회관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.05.28
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.05.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.05.28          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pubusr001Mapper")
public interface Pubusr001Mapper {
     /**
      * 개인정보조회 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubusr001List(EgovMapForNull paramMap);
      /**
       * 개인정보조회 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPubusr001(EgovMapForNull paramMap);
      /**
       * 개인정보조회 정보를 등록한다.
       * @param paramMap
       */
      public void savePubusr001(Pubusr001 entity);
      /**
       * 개인정보조회 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePubusr001(Pubusr001 entity);
}
