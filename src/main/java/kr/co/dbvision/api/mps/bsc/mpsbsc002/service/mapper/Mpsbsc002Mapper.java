package kr.co.dbvision.api.mps.bsc.mpsbsc002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc002.entity.Mpsbsc002;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 급여항목기준관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.07)
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

@Mapper("Mpsbsc002Mapper")
public interface Mpsbsc002Mapper {
    
    
    public List<EgovMapForNull> selectComboMpsbsc002List(EgovMapForNull paramMap);
     /**
      * 급여항목기준 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsbsc002List(EgovMapForNull paramMap);
      /**
       * 급여항목기준 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsbsc002(EgovMapForNull paramMap);
      /**
       * 급여항목기준 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc002(Mpsbsc002 entity);
      public void saveMpsbsc002ByApplcsStdr(Mpsbsc002 entity);
      /**
       * 급여항목기준 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc002ByApplcsStdr(Mpsbsc002 entity);
      public void deleteMpsbsc002(Mpsbsc002 entity);
      
}
