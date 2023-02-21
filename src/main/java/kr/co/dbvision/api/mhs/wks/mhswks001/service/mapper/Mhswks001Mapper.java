package kr.co.dbvision.api.mhs.wks.mhswks001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.wks.mhswks001.entity.Mhswks001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 근태기준설정(근태관리)관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.05.19
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.19          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhswks001Mapper")
public interface Mhswks001Mapper {
     /**
      * 근태기준설정(근태) 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhswks001List(EgovMapForNull paramMap);
      /**
       * 근태기준설정(근태) 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhswks001(EgovMapForNull paramMap);
      /**
       * 근태기준설정(근태) 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhswks001(Mhswks001 entity);
      /**
       * 근태기준설정(근태) 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhswks001(Mhswks001 entity);
}
