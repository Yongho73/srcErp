package kr.co.dbvision.api.mps.cal.mpscal022.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc005.entity.Mpsbsc005;
import kr.co.dbvision.api.mps.cal.mpscal022.entity.MpscalStdr;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 급여관리_지급관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.10
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.10          디비비전              최초 생성
 * </pre>
 */

@Mapper("MpscalStdrMapper")
public interface MpscalStdrMapper {
     /**
      * 급여_지급 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpscalStdrList(EgovMapForNull paramMap);
      /**
       * 급여_지급 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscalStdr(EgovMapForNull paramMap);
      /**
       * 급여_지급 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscalStdr(MpscalStdr entity);
      /**
       * 급여_지급 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscalStdr(MpscalStdr entity);
      
      /**
       * 급여_지급 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscalStdrApplcs(MpscalStdr entity);
      /**
       * 급여_지급 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscalStdrCalc(MpscalStdr entity);
}
