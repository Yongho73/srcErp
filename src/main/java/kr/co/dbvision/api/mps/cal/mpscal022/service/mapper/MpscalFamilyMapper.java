package kr.co.dbvision.api.mps.cal.mpscal022.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.cal.mpscal022.entity.MpscalFamily;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 급여관리_가족관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.08
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.08)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.08          디비비전              최초 생성
 * </pre>
 */

@Mapper("MpscalFamilyMapper")
public interface MpscalFamilyMapper {
     /**
      * 급여_가족 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpscalFamilyList(EgovMapForNull paramMap);
      /**
       * 급여_가족 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscalFamily(EgovMapForNull paramMap);
      /**
       * 급여_가족 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscalFamily(MpscalFamily entity);
      /**
       * 급여_가족 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscalFamily(MpscalFamily entity);
}
