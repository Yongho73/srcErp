package kr.co.dbvision.api.mhs.hrd.mhshrd008.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrd.mhshrd008.entity.Mhshrd008;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 근태시간코드관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.08
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.08          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrd008Mapper")
public interface Mhshrd008Mapper {
     /**
      * 근태시간코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrd008List(EgovMapForNull paramMap);
      /**
       * 근태시간코드 목록을 조회한다.
       * 데이터 확인용
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> searchMhshrd008List();
      /**
       * 근태시간코드 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrd008(EgovMapForNull paramMap);
      /**
       * 근태시간코드 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrd008(Mhshrd008 entity);
      /**
       * 근태시간코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrd008(Mhshrd008 entity);
      /**
       * 근태시간코드의 모든 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrd008All(Mhshrd008 entity);
      /**
       * 법인카드 페이징 토탈 카운트를 조회한다.
       * @param paramMap
       * @return
       */
       public int selectMhshrd008Count(EgovMapForNull paramMap);
}
