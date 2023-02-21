package kr.co.dbvision.api.mps.bsc.mpsbsc005.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc005.entity.Mpsbsc005;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 개인별급여기준일괄등록관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.05.12
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.12          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsbsc005Mapper")
public interface Mpsbsc005Mapper {
     /**
      * 개인별급여기준일괄등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsbsc005List(EgovMapForNull paramMap);
      /**
       * 개인별급여기준일괄등록 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsbsc005(EgovMapForNull paramMap);
      /**
       * 개인별급여기준일괄등록 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc005Applcs(Mpsbsc005 entity);
      /**
       * 개인별급여기준일괄등록 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc005Calc(Mpsbsc005 entity);
      /**
       * 개인별급여기준일괄등록 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc005Applcs(Mpsbsc005 entity);
      /**
       * 개인별급여기준일괄등록 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc005Calc(Mpsbsc005 entity);
}
