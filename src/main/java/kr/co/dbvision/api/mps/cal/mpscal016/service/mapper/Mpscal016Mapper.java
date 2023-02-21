package kr.co.dbvision.api.mps.cal.mpscal016.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.cal.mpscal016.entity.Mpscal016;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 급여일괄등록관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.07
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.07          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpscal016Mapper")
public interface Mpscal016Mapper {
     /**
      * 급여일괄등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpscal016List(EgovMapForNull paramMap);
      /**
       * 급여일괄등록 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscal016(EgovMapForNull paramMap);
      /**
       * 급여일괄등록 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscal016(Mpscal016 entity);
      /**
       * 급여일괄등록 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscal016(Mpscal016 entity);
      
      public List<EgovMapForNull> selectpopMpscal016(EgovMapForNull paramMap);
      /**
       * 엑셀 데이터를 검사한다.
       * @param paramMap
       */
      public List<EgovMapForNull> checkDataMpscal016(EgovMapForNull paramMap);
}
