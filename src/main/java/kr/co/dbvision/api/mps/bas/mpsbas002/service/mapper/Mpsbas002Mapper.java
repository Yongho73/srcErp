package kr.co.dbvision.api.mps.bas.mpsbas002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 사회보험율관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.12.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.12.16          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mpsbas002Mapper")
public interface Mpsbas002Mapper {
     /**
      * 사회보험율 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsSnlrcTariffList(EgovMapForNull paramMap);
      /**
       * 사회보험율 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsSnlrcTariff(EgovMapForNull paramMap);
      /**
       * 사회보험율 정보를 등록한다.
       * @param paramMap
       */
      public void insertMpsSnlrcTariff(EgovMapForNull paramMap);
      /**
       * 사회보험율 정보를 수정한다.
       * @param paramMap
       */
      public void updateMpsSnlrcTariff(EgovMapForNull paramMap);
      /**
       * 사회보험율 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsSnlrcTariff(EgovMapForNull paramMap);
}
