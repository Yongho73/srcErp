package kr.co.dbvision.api.mps.bsc.mpsbsc009.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc009.entity.Mpsbsc009;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 연봉계약관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.11          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsbsc009Mapper")
public interface Mpsbsc009Mapper {
     /**
      * 연봉계약 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsbsc009List(EgovMapForNull paramMap);
      /**
       * 연봉계약 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsbsc009(EgovMapForNull paramMap);
      /**
       * 연봉계약 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc009(Mpsbsc009 entity);
      /**
       * 연봉계약 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc009(Mpsbsc009 entity);
      
      
      public List<EgovMapForNull>  selectMpsbsc009MasterList(EgovMapForNull paramMap);
}
