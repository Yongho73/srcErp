package kr.co.dbvision.api.mhs.wfs.mhswfs001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.wfs.mhswfs001.entity.Mhswfs001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 학자금신청관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.30
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.30)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.30          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhswfs001Mapper")
public interface Mhswfs001Mapper {
     /**
      * 학자금신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhswfs001List(EgovMapForNull paramMap);
      /**
       * 학자금신청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhswfs001(EgovMapForNull paramMap);
      /**
       * 학자금신청 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhswfs001(Mhswfs001 entity);
      /**
       * 학자금신청 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhswfs001(Mhswfs001 entity);
}
